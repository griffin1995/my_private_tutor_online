import { getEnterpriseMonitoring } from './enterprise-monitoring';
import { webVitalsTracker } from '@/lib/performance/web-vitals';
import { PERFORMANCE_CONFIG } from '../../../performance.config';
import * as Sentry from '@sentry/nextjs';
interface PerformanceAlertRule {
	id: string;
	name: string;
	description: string;
	enabled: boolean;
	conditions: {
		metric:
			| 'LCP'
			| 'FID'
			| 'CLS'
			| 'FCP'
			| 'TTFB'
			| 'bundle-size'
			| 'lighthouse-score'
			| 'error-rate';
		operator:
			| 'greater-than'
			| 'less-than'
			| 'equals'
			| 'not-equals'
			| 'percentage-change';
		threshold: number;
		duration?: number;
		comparison?: 'absolute' | 'percentage' | 'baseline';
	};
	severity: 'critical' | 'warning' | 'info';
	frequency: 'immediate' | 'once-per-hour' | 'once-per-day' | 'rate-limited';
	rateLimit?: number;
	notifications: {
		email: boolean;
		slack: boolean;
		sms: boolean;
		webhook: boolean;
		dashboard: boolean;
	};
	businessImpact: 'high' | 'medium' | 'low';
	tags: string[];
	autoResolve?: {
		enabled: boolean;
		thresholdMet: boolean;
		timeDelay: number;
	};
}
interface AlertState {
	id: string;
	ruleId: string;
	status: 'active' | 'resolved' | 'suppressed' | 'acknowledged';
	triggeredAt: Date;
	resolvedAt?: Date;
	acknowledgedAt?: Date;
	acknowledgedBy?: string;
	triggerValue: number;
	threshold: number;
	metric: string;
	escalationLevel: 0 | 1 | 2 | 3;
	lastEscalatedAt?: Date;
	suppressedUntil?: Date;
	suppressionReason?: string;
	metadata: {
		url?: string;
		userAgent?: string;
		sessionId?: string;
		userId?: string;
		buildVersion?: string;
		environment: string;
	};
}
interface PerformanceBaseline {
	metric: string;
	baseline: number;
	confidenceInterval: {
		lower: number;
		upper: number;
	};
	sampleSize: number;
	lastUpdated: Date;
	history: {
		timestamp: Date;
		value: number;
	}[];
	trend: {
		direction: 'improving' | 'degrading' | 'stable';
		changeRate: number;
		significance: number;
	};
}
export class PerformanceAlertingSystem {
	private enterpriseMonitoring = getEnterpriseMonitoring();
	private alertRules: Map<string, PerformanceAlertRule> = new Map();
	private activeAlerts: Map<string, AlertState> = new Map();
	private alertHistory: AlertState[] = [];
	private performanceBaselines: Map<string, PerformanceBaseline> = new Map();
	private alertCounts: Map<
		string,
		{
			count: number;
			windowStart: Date;
		}
	> = new Map();
	private monitoringInterval: NodeJS.Timeout | null = null;
	private baselineUpdateInterval: NodeJS.Timeout | null = null;
	constructor() {
		this.initializeDefaultRules();
		this.startMonitoring();
		this.startBaselineUpdates();
	}
	private initializeDefaultRules(): void {
		const defaultRules: PerformanceAlertRule[] = [
			{
				id: 'lcp-critical',
				name: 'Largest Contentful Paint Critical',
				description: 'LCP exceeds critical threshold for royal client standards',
				enabled: true,
				conditions: {
					metric: 'LCP',
					operator: 'greater-than',
					threshold: PERFORMANCE_CONFIG.webVitals.LCP.poor,
					duration: 60,
					comparison: 'absolute',
				},
				severity: 'critical',
				frequency: 'immediate',
				notifications: {
					email: true,
					slack: true,
					sms: true,
					webhook: true,
					dashboard: true,
				},
				businessImpact: 'high',
				tags: ['web-vitals', 'lcp', 'user-experience'],
				autoResolve: {
					enabled: true,
					thresholdMet: true,
					timeDelay: 300,
				},
			},
			{
				id: 'cls-regression',
				name: 'Cumulative Layout Shift Regression',
				description: 'CLS has regressed beyond acceptable limits',
				enabled: true,
				conditions: {
					metric: 'CLS',
					operator: 'greater-than',
					threshold: PERFORMANCE_CONFIG.webVitals.CLS.needsImprovement,
					duration: 120,
					comparison: 'absolute',
				},
				severity: 'warning',
				frequency: 'once-per-hour',
				rateLimit: 3,
				notifications: {
					email: true,
					slack: true,
					sms: false,
					webhook: true,
					dashboard: true,
				},
				businessImpact: 'medium',
				tags: ['web-vitals', 'cls', 'layout-stability'],
				autoResolve: {
					enabled: true,
					thresholdMet: true,
					timeDelay: 600,
				},
			},
			{
				id: 'bundle-size-exceeded',
				name: 'JavaScript Bundle Size Exceeded',
				description: 'JavaScript bundle size exceeds performance budget',
				enabled: true,
				conditions: {
					metric: 'bundle-size',
					operator: 'greater-than',
					threshold: PERFORMANCE_CONFIG.resources.javascript.total,
					comparison: 'absolute',
				},
				severity: 'warning',
				frequency: 'once-per-day',
				notifications: {
					email: true,
					slack: true,
					sms: false,
					webhook: false,
					dashboard: true,
				},
				businessImpact: 'medium',
				tags: ['bundle-size', 'performance-budget'],
				autoResolve: {
					enabled: false,
					thresholdMet: false,
					timeDelay: 0,
				},
			},
			{
				id: 'lighthouse-performance-drop',
				name: 'Lighthouse Performance Score Drop',
				description: 'Lighthouse performance score has dropped significantly',
				enabled: true,
				conditions: {
					metric: 'lighthouse-score',
					operator: 'less-than',
					threshold: PERFORMANCE_CONFIG.testing.lighthouse.performance,
					duration: 300,
					comparison: 'absolute',
				},
				severity: 'critical',
				frequency: 'immediate',
				notifications: {
					email: true,
					slack: true,
					sms: true,
					webhook: true,
					dashboard: true,
				},
				businessImpact: 'high',
				tags: ['lighthouse', 'performance-score', 'regression'],
				autoResolve: {
					enabled: true,
					thresholdMet: true,
					timeDelay: 900,
				},
			},
			{
				id: 'error-rate-spike',
				name: 'JavaScript Error Rate Spike',
				description: 'JavaScript error rate has spiked above normal levels',
				enabled: true,
				conditions: {
					metric: 'error-rate',
					operator: 'percentage-change',
					threshold: 50,
					duration: 180,
					comparison: 'baseline',
				},
				severity: 'critical',
				frequency: 'immediate',
				notifications: {
					email: true,
					slack: true,
					sms: true,
					webhook: true,
					dashboard: true,
				},
				businessImpact: 'high',
				tags: ['errors', 'javascript', 'spike'],
				autoResolve: {
					enabled: true,
					thresholdMet: true,
					timeDelay: 600,
				},
			},
		];
		defaultRules.forEach((rule) => {
			this.alertRules.set(rule.id, rule);
		});
	}
	private startMonitoring(): void {
		this.monitoringInterval = setInterval(async () => {
			try {
				await this.checkAlertConditions();
				await this.processEscalations();
				await this.processAutoResolutions();
			} catch (error) {
				console.error('Performance monitoring failed:', error);
				Sentry.captureException(error, {
					tags: {
						component: 'performance-alerting',
						operation: 'monitoring',
					},
				});
			}
		}, 30000);
	}
	private startBaselineUpdates(): void {
		this.baselineUpdateInterval = setInterval(async () => {
			try {
				await this.updatePerformanceBaselines();
			} catch (error) {
				console.error('Baseline update failed:', error);
			}
		}, 3600000);
		this.updatePerformanceBaselines().catch(console.error);
	}
	private async checkAlertConditions(): Promise<void> {
		const webVitalsMetrics = webVitalsTracker.getMetrics();
		const systemStatus = await this.enterpriseMonitoring.getSystemStatus();
		for (const rule of this.alertRules.values()) {
			if (!rule.enabled) continue;
			try {
				const shouldTrigger = await this.evaluateCondition(
					rule,
					webVitalsMetrics,
					systemStatus,
				);
				if (shouldTrigger) {
					await this.triggerAlert(rule, webVitalsMetrics, systemStatus);
				}
			} catch (error) {
				console.error(`Failed to evaluate rule ${rule.id}:`, error);
			}
		}
	}
	private async evaluateCondition(
		rule: PerformanceAlertRule,
		webVitalsMetrics: any,
		systemStatus: any,
	): Promise<boolean> {
		const { metric, operator, threshold, comparison } = rule.conditions;
		let currentValue: number = 0;
		switch (metric) {
			case 'LCP':
				currentValue = webVitalsMetrics.LCP?.value || 0;
				break;
			case 'FID':
				currentValue = webVitalsMetrics.FID?.value || 0;
				break;
			case 'CLS':
				currentValue = webVitalsMetrics.CLS?.value || 0;
				break;
			case 'FCP':
				currentValue = webVitalsMetrics.FCP?.value || 0;
				break;
			case 'TTFB':
				currentValue = webVitalsMetrics.TTFB?.value || 0;
				break;
			case 'bundle-size':
				currentValue = await this.getCurrentBundleSize();
				break;
			case 'lighthouse-score':
				currentValue = await this.getCurrentLighthouseScore();
				break;
			case 'error-rate':
				currentValue = await this.getCurrentErrorRate();
				break;
			default:
				return false;
		}
		if (comparison === 'baseline') {
			const baseline = this.performanceBaselines.get(metric);
			if (!baseline) return false;
			if (operator === 'percentage-change') {
				const percentageChange =
					((currentValue - baseline.baseline) / baseline.baseline) * 100;
				return Math.abs(percentageChange) > threshold;
			}
		}
		switch (operator) {
			case 'greater-than':
				return currentValue > threshold;
			case 'less-than':
				return currentValue < threshold;
			case 'equals':
				return Math.abs(currentValue - threshold) < 0.01;
			case 'not-equals':
				return Math.abs(currentValue - threshold) >= 0.01;
			default:
				return false;
		}
	}
	private async triggerAlert(
		rule: PerformanceAlertRule,
		webVitalsMetrics: any,
		systemStatus: any,
	): Promise<void> {
		const existingAlert = Array.from(this.activeAlerts.values()).find(
			(alert) => alert.ruleId === rule.id && alert.status === 'active',
		);
		if (existingAlert) {
			await this.updateExistingAlert(
				existingAlert,
				rule,
				webVitalsMetrics,
				systemStatus,
			);
			return;
		}
		if (!this.isWithinRateLimit(rule)) {
			console.log(`Alert ${rule.id} rate limited`);
			return;
		}
		const alertId = `alert_${rule.id}_${Date.now()}`;
		const currentValue = await this.getCurrentMetricValue(
			rule.conditions.metric,
			webVitalsMetrics,
			systemStatus,
		);
		const newAlert: AlertState = {
			id: alertId,
			ruleId: rule.id,
			status: 'active',
			triggeredAt: new Date(),
			triggerValue: currentValue,
			threshold: rule.conditions.threshold,
			metric: rule.conditions.metric,
			escalationLevel: 0,
			metadata: {
				url: typeof window !== 'undefined' ? window.location.href : '',
				userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
				environment: process.env.NODE_ENV || 'development',
				buildVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
			},
		};
		this.activeAlerts.set(alertId, newAlert);
		this.alertHistory.push(newAlert);
		this.updateRateLimit(rule);
		await this.sendAlertNotifications(rule, newAlert, 'triggered');
		Sentry.captureMessage(`Performance Alert: ${rule.name}`, {
			level: rule.severity === 'critical' ? 'error' : 'warning',
			tags: {
				alertRule: rule.id,
				metric: rule.conditions.metric,
				severity: rule.severity,
				businessImpact: rule.businessImpact,
			},
			extra: {
				alertId,
				currentValue,
				threshold: rule.conditions.threshold,
				rule,
			},
		});
		console.log(`🚨 Performance Alert Triggered: ${rule.name}`, {
			alertId,
			metric: rule.conditions.metric,
			currentValue,
			threshold: rule.conditions.threshold,
			severity: rule.severity,
		});
	}
	private async sendAlertNotifications(
		rule: PerformanceAlertRule,
		alert: AlertState,
		type: 'triggered' | 'resolved' | 'escalated',
	): Promise<void> {
		const notificationData = {
			rule,
			alert,
			type,
			timestamp: new Date().toISOString(),
			url: alert.metadata.url,
			environment: alert.metadata.environment,
		};
		await this.enterpriseMonitoring.triggerAlert(
			`performance_${type}_${rule.conditions.metric}`,
			rule.severity,
			notificationData,
		);
	}
	private async processEscalations(): Promise<void> {
		const now = new Date();
		for (const alert of this.activeAlerts.values()) {
			if (alert.status !== 'active') continue;
			const rule = this.alertRules.get(alert.ruleId);
			if (!rule) continue;
			const alertAge = now.getTime() - alert.triggeredAt.getTime();
			const escalationThresholds = [0, 3600000, 14400000, 86400000];
			for (
				let level = alert.escalationLevel + 1;
				level < escalationThresholds.length;
				level++
			) {
				if (alertAge >= escalationThresholds[level]) {
					alert.escalationLevel = level as 0 | 1 | 2 | 3;
					alert.lastEscalatedAt = now;
					await this.sendAlertNotifications(rule, alert, 'escalated');
					console.log(`🔺 Alert Escalated: ${alert.id} to level ${level}`);
					break;
				}
			}
		}
	}
	private async processAutoResolutions(): Promise<void> {
		const webVitalsMetrics = webVitalsTracker.getMetrics();
		const systemStatus = await this.enterpriseMonitoring.getSystemStatus();
		for (const alert of this.activeAlerts.values()) {
			if (alert.status !== 'active') continue;
			const rule = this.alertRules.get(alert.ruleId);
			if (!rule?.autoResolve?.enabled) continue;
			const shouldResolve = await this.shouldAutoResolve(
				rule,
				alert,
				webVitalsMetrics,
				systemStatus,
			);
			if (shouldResolve) {
				await this.resolveAlert(alert.id, 'auto-resolved');
			}
		}
	}
	private async shouldAutoResolve(
		rule: PerformanceAlertRule,
		alert: AlertState,
		webVitalsMetrics: any,
		systemStatus: any,
	): Promise<boolean> {
		if (!rule.autoResolve?.thresholdMet) return false;
		const currentValue = await this.getCurrentMetricValue(
			rule.conditions.metric,
			webVitalsMetrics,
			systemStatus,
		);
		const thresholdMet = await this.evaluateResolutionCondition(
			rule,
			currentValue,
		);
		if (!thresholdMet) return false;
		const now = new Date();
		const timeSinceGood = now.getTime() - alert.triggeredAt.getTime();
		return timeSinceGood >= rule.autoResolve.timeDelay * 1000;
	}
	private async evaluateResolutionCondition(
		rule: PerformanceAlertRule,
		currentValue: number,
	): Promise<boolean> {
		const { operator, threshold } = rule.conditions;
		switch (operator) {
			case 'greater-than':
				return currentValue <= threshold;
			case 'less-than':
				return currentValue >= threshold;
			case 'equals':
				return Math.abs(currentValue - threshold) >= 0.01;
			case 'not-equals':
				return Math.abs(currentValue - threshold) < 0.01;
			default:
				return false;
		}
	}
	private async updatePerformanceBaselines(): Promise<void> {
		const webVitalsMetrics = webVitalsTracker.getMetrics();
		const metrics = ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'];
		const { getCMSProperty } = await import('@/lib/cms/cms-utils');
		for (const metric of metrics) {
			const metricData = getCMSProperty(webVitalsMetrics, metric);
			const value = metricData?.value;
			if (value === undefined) continue;
			let baseline = this.performanceBaselines.get(metric);
			if (!baseline) {
				baseline = {
					metric,
					baseline: value,
					confidenceInterval: {
						lower: value * 0.9,
						upper: value * 1.1,
					},
					sampleSize: 1,
					lastUpdated: new Date(),
					history: [
						{
							timestamp: new Date(),
							value,
						},
					],
					trend: {
						direction: 'stable',
						changeRate: 0,
						significance: 0,
					},
				};
			} else {
				const alpha = 0.1;
				baseline.baseline = baseline.baseline * (1 - alpha) + value * alpha;
				baseline.sampleSize += 1;
				baseline.lastUpdated = new Date();
				baseline.history.push({
					timestamp: new Date(),
					value,
				});
				if (baseline.history.length > 1000) {
					baseline.history = baseline.history.slice(-1000);
				}
				this.updateBaselineStatistics(baseline);
			}
			this.performanceBaselines.set(metric, baseline);
		}
	}
	private updateBaselineStatistics(baseline: PerformanceBaseline): void {
		const values = baseline.history.map((point) => point.value);
		const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
		const variance =
			values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
			values.length;
		const stdDev = Math.sqrt(variance);
		baseline.confidenceInterval = {
			lower: mean - 1.96 * stdDev,
			upper: mean + 1.96 * stdDev,
		};
		if (baseline.history.length >= 10) {
			const recent = baseline.history.slice(-10);
			const older = baseline.history.slice(-20, -10);
			if (older.length > 0) {
				const recentMean =
					recent.reduce((sum, point) => sum + point.value, 0) / recent.length;
				const olderMean =
					older.reduce((sum, point) => sum + point.value, 0) / older.length;
				const changeRate = ((recentMean - olderMean) / olderMean) * 100;
				baseline.trend = {
					direction:
						Math.abs(changeRate) < 5 ? 'stable'
						: changeRate > 0 ? 'degrading'
						: 'improving',
					changeRate: Math.abs(changeRate),
					significance: Math.min(baseline.sampleSize / 100, 1),
				};
			}
		}
	}
	private async getCurrentMetricValue(
		metric: string,
		webVitalsMetrics: any,
		systemStatus: any,
	): Promise<number> {
		switch (metric) {
			case 'LCP':
				return webVitalsMetrics.LCP?.value || 0;
			case 'FID':
				return webVitalsMetrics.FID?.value || 0;
			case 'CLS':
				return webVitalsMetrics.CLS?.value || 0;
			case 'FCP':
				return webVitalsMetrics.FCP?.value || 0;
			case 'TTFB':
				return webVitalsMetrics.TTFB?.value || 0;
			case 'bundle-size':
				return await this.getCurrentBundleSize();
			case 'lighthouse-score':
				return await this.getCurrentLighthouseScore();
			case 'error-rate':
				return await this.getCurrentErrorRate();
			default:
				return 0;
		}
	}
	private async getCurrentBundleSize(): Promise<number> {
		if (typeof window === 'undefined') return 0;
		try {
			const resources = performance.getEntriesByType(
				'resource',
			) as PerformanceResourceTiming[];
			return resources
				.filter((resource) => resource.name.includes('.js'))
				.reduce((total, resource) => total + (resource.transferSize || 0), 0);
		} catch {
			return 0;
		}
	}
	private async getCurrentLighthouseScore(): Promise<number> {
		return 85;
	}
	private async getCurrentErrorRate(): Promise<number> {
		return 0.5;
	}
	private isWithinRateLimit(rule: PerformanceAlertRule): boolean {
		if (rule.frequency === 'immediate') return true;
		const now = new Date();
		const rateKey = rule.id;
		const rateData = this.alertCounts.get(rateKey);
		if (!rateData) return true;
		const hoursSinceWindow =
			(now.getTime() - rateData.windowStart.getTime()) / 3600000;
		if (hoursSinceWindow >= 1) {
			this.alertCounts.delete(rateKey);
			return true;
		}
		const maxAlerts = rule.rateLimit || 1;
		return rateData.count < maxAlerts;
	}
	private updateRateLimit(rule: PerformanceAlertRule): void {
		const now = new Date();
		const rateKey = rule.id;
		const rateData = this.alertCounts.get(rateKey);
		if (!rateData) {
			this.alertCounts.set(rateKey, {
				count: 1,
				windowStart: now,
			});
		} else {
			rateData.count += 1;
		}
	}
	private async updateExistingAlert(
		alert: AlertState,
		rule: PerformanceAlertRule,
		webVitalsMetrics: any,
		systemStatus: any,
	): Promise<void> {
		alert.triggerValue = await this.getCurrentMetricValue(
			rule.conditions.metric,
			webVitalsMetrics,
			systemStatus,
		);
		const now = new Date();
		const alertAge = now.getTime() - alert.triggeredAt.getTime();
		if (rule.conditions.duration && alertAge >= rule.conditions.duration * 1000) {
			console.log(`Alert ${alert.id} duration threshold met`);
		}
	}
	public async resolveAlert(alertId: string, reason?: string): Promise<boolean> {
		const alert = this.activeAlerts.get(alertId);
		if (!alert) return false;
		alert.status = 'resolved';
		alert.resolvedAt = new Date();
		const rule = this.alertRules.get(alert.ruleId);
		if (rule) {
			await this.sendAlertNotifications(rule, alert, 'resolved');
		}
		console.log(`✅ Alert Resolved: ${alertId}`, {
			reason,
		});
		return true;
	}
	public async acknowledgeAlert(
		alertId: string,
		acknowledgedBy: string,
	): Promise<boolean> {
		const alert = this.activeAlerts.get(alertId);
		if (!alert) return false;
		alert.status = 'acknowledged';
		alert.acknowledgedAt = new Date();
		alert.acknowledgedBy = acknowledgedBy;
		console.log(`ℹ️ Alert Acknowledged: ${alertId} by ${acknowledgedBy}`);
		return true;
	}
	public async suppressAlert(
		alertId: string,
		durationMinutes: number,
		reason: string,
	): Promise<boolean> {
		const alert = this.activeAlerts.get(alertId);
		if (!alert) return false;
		alert.status = 'suppressed';
		alert.suppressedUntil = new Date(Date.now() + durationMinutes * 60000);
		alert.suppressionReason = reason;
		console.log(`🔇 Alert Suppressed: ${alertId} for ${durationMinutes} minutes`);
		return true;
	}
	public getActiveAlerts(): AlertState[] {
		return Array.from(this.activeAlerts.values());
	}
	public getAlertHistory(hours: number = 24): AlertState[] {
		const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
		return this.alertHistory.filter((alert) => alert.triggeredAt > cutoff);
	}
	public getPerformanceBaselines(): Map<string, PerformanceBaseline> {
		return new Map(this.performanceBaselines);
	}
	public addCustomRule(rule: PerformanceAlertRule): void {
		this.alertRules.set(rule.id, rule);
	}
	public removeRule(ruleId: string): boolean {
		return this.alertRules.delete(ruleId);
	}
	public updateRule(
		ruleId: string,
		updates: Partial<PerformanceAlertRule>,
	): boolean {
		const rule = this.alertRules.get(ruleId);
		if (!rule) return false;
		Object.assign(rule, updates);
		return true;
	}
	public getAlertRules(): PerformanceAlertRule[] {
		return Array.from(this.alertRules.values());
	}
	public getAlertStatistics() {
		const activeAlerts = this.getActiveAlerts();
		const history = this.getAlertHistory();
		return {
			active: {
				total: activeAlerts.length,
				critical: activeAlerts.filter((alert) => {
					const rule = this.alertRules.get(alert.ruleId);
					return rule?.severity === 'critical';
				}).length,
				warning: activeAlerts.filter((alert) => {
					const rule = this.alertRules.get(alert.ruleId);
					return rule?.severity === 'warning';
				}).length,
			},
			history: {
				total: history.length,
				resolved: history.filter((alert) => alert.status === 'resolved').length,
				averageResolutionTime: this.calculateAverageResolutionTime(history),
			},
			rules: {
				total: this.alertRules.size,
				enabled: Array.from(this.alertRules.values()).filter((rule) => rule.enabled)
					.length,
				disabled: Array.from(this.alertRules.values()).filter(
					(rule) => !rule.enabled,
				).length,
			},
		};
	}
	private calculateAverageResolutionTime(alerts: AlertState[]): number {
		const resolvedAlerts = alerts.filter((alert) => alert.resolvedAt);
		if (resolvedAlerts.length === 0) return 0;
		const totalResolutionTime = resolvedAlerts.reduce((sum, alert) => {
			const resolutionTime =
				alert.resolvedAt!.getTime() - alert.triggeredAt.getTime();
			return sum + resolutionTime;
		}, 0);
		return totalResolutionTime / resolvedAlerts.length / 60000;
	}
	public destroy(): void {
		if (this.monitoringInterval) {
			clearInterval(this.monitoringInterval);
			this.monitoringInterval = null;
		}
		if (this.baselineUpdateInterval) {
			clearInterval(this.baselineUpdateInterval);
			this.baselineUpdateInterval = null;
		}
	}
}
let alertingSystemInstance: PerformanceAlertingSystem | null = null;
export const getPerformanceAlertingSystem = (): PerformanceAlertingSystem => {
	if (!alertingSystemInstance) {
		alertingSystemInstance = new PerformanceAlertingSystem();
	}
	return alertingSystemInstance;
};
export type { PerformanceAlertRule, AlertState, PerformanceBaseline };
export default PerformanceAlertingSystem;
