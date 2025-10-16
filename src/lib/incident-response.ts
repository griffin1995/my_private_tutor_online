import { SecurityEvent } from '@/middleware/security';
import {
	realTimeThreatAnalyzer,
	ThreatScoringModel,
} from './security-analytics';
export enum IncidentSeverity {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
	CRITICAL = 'critical',
}
export enum IncidentStatus {
	OPEN = 'open',
	IN_PROGRESS = 'in_progress',
	CONTAINED = 'contained',
	RESOLVED = 'resolved',
	ESCALATED = 'escalated',
}
export enum ResponseAction {
	MONITOR = 'monitor',
	ALERT = 'alert',
	BLOCK_IP = 'block_ip',
	RATE_LIMIT = 'rate_limit',
	CHALLENGE = 'challenge',
	LOCKDOWN = 'lockdown',
	ESCALATE = 'escalate',
	NOTIFY_ADMIN = 'notify_admin',
}
export interface Incident {
	id: string;
	timestamp: Date;
	severity: IncidentSeverity;
	status: IncidentStatus;
	source: string;
	type: string;
	description: string;
	events: SecurityEvent[];
	threatScore: number;
	actionsTaken: ResponseAction[];
	containmentTime?: Date;
	resolutionTime?: Date;
	escalatedTo?: string;
	notes: string[];
}
interface ResponsePlaybook {
	incidentType: string;
	severity: IncidentSeverity;
	actions: ResponseAction[];
	escalationThreshold: number;
	autoResolveTime: number;
}
export class IncidentResponseOrchestrator {
	private incidents: Map<string, Incident> = new Map();
	private blockedIPs: Set<string> = new Set();
	private rateLimitedIPs: Map<
		string,
		{
			limit: number;
			until: Date;
		}
	> = new Map();
	private playbooks: Map<string, ResponsePlaybook> = new Map();
	constructor() {
		this.initializePlaybooks();
		this.startAutoResolutionService();
	}
	private initializePlaybooks(): void {
		this.playbooks.set('sql_injection', {
			incidentType: 'sql_injection',
			severity: IncidentSeverity.CRITICAL,
			actions: [
				ResponseAction.BLOCK_IP,
				ResponseAction.ALERT,
				ResponseAction.NOTIFY_ADMIN,
				ResponseAction.ESCALATE,
			],
			escalationThreshold: 0.8,
			autoResolveTime: 0,
		});
		this.playbooks.set('xss_attack', {
			incidentType: 'xss_attack',
			severity: IncidentSeverity.HIGH,
			actions: [
				ResponseAction.BLOCK_IP,
				ResponseAction.ALERT,
				ResponseAction.NOTIFY_ADMIN,
			],
			escalationThreshold: 0.7,
			autoResolveTime: 60,
		});
		this.playbooks.set('brute_force', {
			incidentType: 'brute_force',
			severity: IncidentSeverity.HIGH,
			actions: [
				ResponseAction.RATE_LIMIT,
				ResponseAction.CHALLENGE,
				ResponseAction.ALERT,
			],
			escalationThreshold: 0.7,
			autoResolveTime: 30,
		});
		this.playbooks.set('rate_limit', {
			incidentType: 'rate_limit',
			severity: IncidentSeverity.MEDIUM,
			actions: [ResponseAction.RATE_LIMIT, ResponseAction.MONITOR],
			escalationThreshold: 0.5,
			autoResolveTime: 15,
		});
		this.playbooks.set('suspicious_activity', {
			incidentType: 'suspicious_activity',
			severity: IncidentSeverity.MEDIUM,
			actions: [ResponseAction.MONITOR, ResponseAction.ALERT],
			escalationThreshold: 0.6,
			autoResolveTime: 30,
		});
		this.playbooks.set('directory_traversal', {
			incidentType: 'directory_traversal',
			severity: IncidentSeverity.HIGH,
			actions: [
				ResponseAction.BLOCK_IP,
				ResponseAction.ALERT,
				ResponseAction.NOTIFY_ADMIN,
			],
			escalationThreshold: 0.7,
			autoResolveTime: 60,
		});
		this.playbooks.set('command_injection', {
			incidentType: 'command_injection',
			severity: IncidentSeverity.CRITICAL,
			actions: [
				ResponseAction.BLOCK_IP,
				ResponseAction.LOCKDOWN,
				ResponseAction.NOTIFY_ADMIN,
				ResponseAction.ESCALATE,
			],
			escalationThreshold: 0.9,
			autoResolveTime: 0,
		});
	}
	public async handleSecurityEvent(event: SecurityEvent): Promise<{
		incidentId?: string;
		actions: ResponseAction[];
		blocked: boolean;
	}> {
		const threatAnalysis = await realTimeThreatAnalyzer.processEvent(event);
		if (this.blockedIPs.has(event.clientIp)) {
			return {
				actions: [ResponseAction.BLOCK_IP],
				blocked: true,
			};
		}
		const rateLimited = this.checkRateLimit(event.clientIp);
		if (rateLimited) {
			return {
				actions: [ResponseAction.RATE_LIMIT],
				blocked: false,
			};
		}
		if (threatAnalysis.threatLevel > 0.4) {
			const incident = this.createOrUpdateIncident(event, threatAnalysis);
			const actions = await this.executeResponseActions(incident, threatAnalysis);
			return {
				incidentId: incident.id,
				actions,
				blocked: actions.includes(ResponseAction.BLOCK_IP),
			};
		}
		return {
			actions: [ResponseAction.MONITOR],
			blocked: false,
		};
	}
	private createOrUpdateIncident(
		event: SecurityEvent,
		threatAnalysis: any,
	): Incident {
		const existingIncident = this.findExistingIncident(
			event.clientIp,
			event.type,
		);
		if (existingIncident) {
			existingIncident.events.push(event);
			existingIncident.threatScore = Math.max(
				existingIncident.threatScore,
				threatAnalysis.threatLevel,
			);
			if (
				threatAnalysis.threatLevel > 0.8 &&
				existingIncident.status !== IncidentStatus.ESCALATED
			) {
				existingIncident.status = IncidentStatus.ESCALATED;
				existingIncident.escalatedTo = 'security-team';
			}
			return existingIncident;
		}
		const severity = this.determineSeverity(threatAnalysis.threatLevel);
		const incident: Incident = {
			id: this.generateIncidentId(),
			timestamp: new Date(),
			severity,
			status: IncidentStatus.OPEN,
			source: event.clientIp,
			type: this.determineIncidentType(event, threatAnalysis),
			description: this.generateIncidentDescription(event, threatAnalysis),
			events: [event],
			threatScore: threatAnalysis.threatLevel,
			actionsTaken: [],
			notes: threatAnalysis.details.recommendations || [],
		};
		this.incidents.set(incident.id, incident);
		return incident;
	}
	private async executeResponseActions(
		incident: Incident,
		threatAnalysis: any,
	): Promise<ResponseAction[]> {
		const playbook = this.getPlaybook(incident.type);
		const actions: ResponseAction[] = [];
		for (const action of playbook.actions) {
			const executed = await this.executeAction(action, incident);
			if (executed) {
				actions.push(action);
				incident.actionsTaken.push(action);
			}
		}
		if (threatAnalysis.threatLevel >= playbook.escalationThreshold) {
			await this.escalateIncident(incident);
			actions.push(ResponseAction.ESCALATE);
		}
		if (
			actions.includes(ResponseAction.BLOCK_IP) ||
			actions.includes(ResponseAction.LOCKDOWN)
		) {
			incident.status = IncidentStatus.CONTAINED;
			incident.containmentTime = new Date();
		} else {
			incident.status = IncidentStatus.IN_PROGRESS;
		}
		return actions;
	}
	private async executeAction(
		action: ResponseAction,
		incident: Incident,
	): Promise<boolean> {
		try {
			switch (action) {
				case ResponseAction.BLOCK_IP:
					this.blockIP(incident.source, incident.severity);
					return true;
				case ResponseAction.RATE_LIMIT:
					this.applyRateLimit(incident.source, incident.severity);
					return true;
				case ResponseAction.ALERT:
					await this.sendAlert(incident);
					return true;
				case ResponseAction.NOTIFY_ADMIN:
					await this.notifyAdmin(incident);
					return true;
				case ResponseAction.CHALLENGE:
					return true;
				case ResponseAction.LOCKDOWN:
					await this.triggerLockdown(incident);
					return true;
				case ResponseAction.MONITOR:
					return true;
				case ResponseAction.ESCALATE:
					await this.escalateIncident(incident);
					return true;
				default:
					return false;
			}
		} catch (error) {
			console.error(`Failed to execute action ${action}:`, error);
			return false;
		}
	}
	private blockIP(ip: string, severity: IncidentSeverity): void {
		this.blockedIPs.add(ip);
		const unblockMinutes =
			severity === IncidentSeverity.CRITICAL ? 1440
			: severity === IncidentSeverity.HIGH ? 360
			: severity === IncidentSeverity.MEDIUM ? 60
			: 15;
		setTimeout(
			() => {
				this.blockedIPs.delete(ip);
			},
			unblockMinutes * 60 * 1000,
		);
	}
	private applyRateLimit(ip: string, severity: IncidentSeverity): void {
		const limit =
			severity === IncidentSeverity.HIGH ? 5
			: severity === IncidentSeverity.MEDIUM ? 10
			: 20;
		const until = new Date(Date.now() + 15 * 60 * 1000);
		this.rateLimitedIPs.set(ip, {
			limit,
			until,
		});
	}
	private checkRateLimit(ip: string): boolean {
		const rateLimit = this.rateLimitedIPs.get(ip);
		if (!rateLimit) return false;
		if (new Date() > rateLimit.until) {
			this.rateLimitedIPs.delete(ip);
			return false;
		}
		return true;
	}
	private async sendAlert(incident: Incident): Promise<void> {
		console.log('[SECURITY ALERT]', {
			id: incident.id,
			severity: incident.severity,
			type: incident.type,
			source: incident.source,
			threatScore: incident.threatScore,
			description: incident.description,
		});
	}
	private async notifyAdmin(incident: Incident): Promise<void> {
		console.log('[ADMIN NOTIFICATION]', {
			id: incident.id,
			severity: incident.severity,
			type: incident.type,
			source: incident.source,
			message: `Critical security incident requires immediate attention`,
			actionRequired: true,
		});
	}
	private async triggerLockdown(incident: Incident): Promise<void> {
		console.log('[SYSTEM LOCKDOWN]', {
			triggeredBy: incident.id,
			reason: incident.description,
			affectedSystems: ['authentication', 'api', 'admin'],
			duration: '15 minutes',
		});
	}
	private async escalateIncident(incident: Incident): Promise<void> {
		incident.status = IncidentStatus.ESCALATED;
		incident.escalatedTo = 'security-team';
		console.log('[INCIDENT ESCALATION]', {
			id: incident.id,
			escalatedTo: 'security-team',
			priority: 'P1',
			requiresImmedateAction: true,
		});
	}
	private startAutoResolutionService(): void {
		setInterval(() => {
			const now = new Date();
			this.incidents.forEach((incident) => {
				if (incident.status === IncidentStatus.RESOLVED) return;
				const playbook = this.getPlaybook(incident.type);
				if (playbook.autoResolveTime === 0) return;
				const minutesSince =
					(now.getTime() - incident.timestamp.getTime()) / (1000 * 60);
				if (minutesSince > playbook.autoResolveTime) {
					const recentEvents = incident.events.filter((e) => {
						const eventMinutes =
							(now.getTime() - e.timestamp.getTime()) / (1000 * 60);
						return eventMinutes < 5;
					});
					if (recentEvents.length === 0) {
						incident.status = IncidentStatus.RESOLVED;
						incident.resolutionTime = now;
						incident.notes.push('Auto-resolved due to inactivity');
						if (incident.actionsTaken.includes(ResponseAction.BLOCK_IP)) {
							this.blockedIPs.delete(incident.source);
						}
					}
				}
			});
			this.incidents.forEach((incident, id) => {
				if (
					incident.status === IncidentStatus.RESOLVED &&
					incident.resolutionTime
				) {
					const daysSince =
						(now.getTime() - incident.resolutionTime.getTime()) /
						(1000 * 60 * 60 * 24);
					if (daysSince > 7) {
						this.incidents.delete(id);
					}
				}
			});
		}, 60000);
	}
	private findExistingIncident(source: string, type: string): Incident | null {
		for (const incident of this.incidents.values()) {
			if (
				incident.source === source &&
				incident.type === type &&
				incident.status !== IncidentStatus.RESOLVED
			) {
				return incident;
			}
		}
		return null;
	}
	private getPlaybook(incidentType: string): ResponsePlaybook {
		return (
			this.playbooks.get(incidentType) || {
				incidentType: 'unknown',
				severity: IncidentSeverity.LOW,
				actions: [ResponseAction.MONITOR],
				escalationThreshold: 0.9,
				autoResolveTime: 60,
			}
		);
	}
	private determineSeverity(threatScore: number): IncidentSeverity {
		if (threatScore > 0.8) return IncidentSeverity.CRITICAL;
		if (threatScore > 0.6) return IncidentSeverity.HIGH;
		if (threatScore > 0.4) return IncidentSeverity.MEDIUM;
		return IncidentSeverity.LOW;
	}
	private determineIncidentType(event: SecurityEvent, analysis: any): string {
		if (analysis.details.patterns && analysis.details.patterns.length > 0) {
			return analysis.details.patterns[0].name;
		}
		return event.type;
	}
	private generateIncidentDescription(
		event: SecurityEvent,
		analysis: any,
	): string {
		const patterns =
			analysis.details.patterns?.map((p: any) => p.name).join(', ') || 'unknown';
		return `Security incident detected from ${event.clientIp} - Type: ${event.type}, Patterns: ${patterns}, Threat Score: ${analysis.threatLevel.toFixed(2)}`;
	}
	private generateIncidentId(): string {
		const timestamp = Date.now().toString(36);
		const random = Math.random().toString(36).substring(2, 7);
		return `INC-${timestamp}-${random}`.toUpperCase();
	}
	public getIncidentStatistics(): {
		total: number;
		open: number;
		contained: number;
		resolved: number;
		escalated: number;
		critical: number;
		blockedIPs: number;
		rateLimitedIPs: number;
	} {
		const stats = {
			total: this.incidents.size,
			open: 0,
			contained: 0,
			resolved: 0,
			escalated: 0,
			critical: 0,
			blockedIPs: this.blockedIPs.size,
			rateLimitedIPs: this.rateLimitedIPs.size,
		};
		this.incidents.forEach((incident) => {
			switch (incident.status) {
				case IncidentStatus.OPEN:
					stats.open++;
					break;
				case IncidentStatus.CONTAINED:
					stats.contained++;
					break;
				case IncidentStatus.RESOLVED:
					stats.resolved++;
					break;
				case IncidentStatus.ESCALATED:
					stats.escalated++;
					break;
			}
			if (incident.severity === IncidentSeverity.CRITICAL) {
				stats.critical++;
			}
		});
		return stats;
	}
	public getActiveIncidents(): Incident[] {
		return Array.from(this.incidents.values())
			.filter((i) => i.status !== IncidentStatus.RESOLVED)
			.sort((a, b) => b.threatScore - a.threatScore);
	}
}
export const incidentResponseOrchestrator = new IncidentResponseOrchestrator();
