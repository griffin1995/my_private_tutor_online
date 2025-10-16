import * as Sentry from '@sentry/nextjs';
import { webVitalsTracker } from '@/lib/performance/web-vitals';
import { businessAnalytics } from '@/lib/analytics/business-analytics';
import { PERFORMANCE_CONFIG } from '../../../performance.config';
import { createInfrastructureMonitor } from '@/lib/infrastructure/monitoring';
import {
	AlertData,
	AlertSeverity,
	AlertType,
	ErrorContext,
	NotificationConfiguration,
	SystemStatus,
	InfrastructureMonitor,
} from './types';
interface EnterpriseAlertConfig {
	critical: {
		siteDowntime: boolean;
		formSubmissionFailures: number;
		coreWebVitalsDegradation: number;
		buildFailures: boolean;
	};
	warning: {
		performanceBudgetViolations: boolean;
		errorRateIncrease: number;
		slowPageLoads: number;
		assetLoadingFailures: boolean;
	};
	businessMetrics: {
		conversionFunnelDrops: number;
		revenueFormFailures: number;
		clientEngagementDrop: number;
	};
	slaThresholds: {
		uptimeRequired: number;
		responseTimeMax: number;
		errorRateMax: number;
		performanceScoreMin: number;
	};
}
interface PerformanceBudgetMonitor {
	webVitals: {
		LCP: {
			current: number;
			budget: number;
			status: 'good' | 'warning' | 'critical';
		};
		FID: {
			current: number;
			budget: number;
			status: 'good' | 'warning' | 'critical';
		};
		CLS: {
			current: number;
			budget: number;
			status: 'good' | 'warning' | 'critical';
		};
		FCP: {
			current: number;
			budget: number;
			status: 'good' | 'warning' | 'critical';
		};
		TTFB: {
			current: number;
			budget: number;
			status: 'good' | 'warning' | 'critical';
		};
	};
	resourceBudgets: {
		javascriptSize: {
			current: number;
			budget: number;
			status: 'good' | 'warning' | 'critical';
		};
		cssSize: {
			current: number;
			budget: number;
			status: 'good' | 'warning' | 'critical';
		};
		imageSize: {
			current: number;
			budget: number;
			status: 'good' | 'warning' | 'critical';
		};
		totalPageWeight: {
			current: number;
			budget: number;
			status: 'good' | 'warning' | 'critical';
		};
	};
	networkBudgets: {
		httpRequests: {
			current: number;
			budget: number;
			status: 'good' | 'warning' | 'critical';
		};
		thirdPartyRequests: {
			current: number;
			budget: number;
			status: 'good' | 'warning' | 'critical';
		};
	};
}
interface RealUserMonitoringData {
	sessionMetrics: {
		totalSessions: number;
		bounceRate: number;
		averageSessionDuration: number;
		conversionRate: number;
	};
	userJourneyMetrics: {
		funnelCompletionRate: number;
		dropOffPoints: string[];
		averageTimeToConversion: number;
		revenueImpact: number;
	};
	errorMetrics: {
		jsErrorRate: number;
		apiFailureRate: number;
		formSubmissionErrors: number;
		paymentProcessingErrors: number;
	};
	geographicMetrics: {
		regionPerformance: Record<string, number>;
		deviceTypePerformance: Record<string, number>;
		networkConditionImpact: Record<string, number>;
	};
}
interface AlertNotificationChannels {
	email: {
		enabled: boolean;
		recipients: string[];
		templates: {
			critical: string;
			warning: string;
			recovery: string;
		};
	};
	slack: {
		enabled: boolean;
		webhookUrl: string;
		channels: {
			critical: string;
			warnings: string;
			performance: string;
		};
	};
	sms: {
		enabled: boolean;
		recipients: string[];
		provider: 'twilio' | 'aws-sns';
	};
	webhook: {
		enabled: boolean;
		endpoints: string[];
		authentication: {
			type: 'bearer' | 'basic';
			credentials: string;
		};
	};
}
export class EnterpriseMonitoringSystem {
	private alertConfig: EnterpriseAlertConfig;
	private notificationChannels: AlertNotificationChannels;
	private infrastructureMonitor: InfrastructureMonitor | null = null;
	private performanceBudgetMonitor: PerformanceBudgetMonitor | null = null;
	private realUserMonitoring: RealUserMonitoringData | null = null;
	private activeAlerts: Map<
		string,
		{
			timestamp: Date;
			severity: 'critical' | 'warning';
			resolved: boolean;
		}
	> = new Map();
	private alertHistory: Array<{
		id: string;
		timestamp: Date;
		type: string;
		severity: string;
		resolved: boolean;
		resolutionTime?: number;
	}> = [];
	constructor(
		alertConfig: EnterpriseAlertConfig,
		notificationChannels: AlertNotificationChannels,
	) {
		this.alertConfig = alertConfig;
		this.notificationChannels = notificationChannels;
		this.initializeSentryMonitoring();
		try {
			this.infrastructureMonitor = createInfrastructureMonitor();
		} catch (error) {
			console.warn('Infrastructure monitor initialization failed:', error);
		}
		this.startContinuousMonitoring();
	}
	private initializeSentryMonitoring(): void {
		if (typeof window !== 'undefined') {
			Sentry.init({
				dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
				integrations: [
					new Sentry.BrowserTracing({
						tracePropagationTargets: [
							'localhost',
							process.env.NEXT_PUBLIC_SITE_URL || 'myprivatetutoronline.com',
						],
					}),
					new Sentry.Replay(),
				],
				tracesSampleRate: PERFORMANCE_CONFIG.integrations.sentry.tracesSampleRate,
				environment: process.env.NODE_ENV,
				beforeSend(event) {
					if (process.env.NODE_ENV === 'production' && event.level === 'warning') {
						return null;
					}
					return event;
				},
				beforeSendTransaction(transaction) {
					transaction.setTag('business.service', 'premium-tutoring');
					transaction.setTag('business.tier', 'royal-client');
					return transaction;
				},
			});
		}
	}
	async checkPerformanceBudgets(): Promise<PerformanceBudgetMonitor> {
		const webVitalsMetrics = webVitalsTracker.getMetrics();
		const config = PERFORMANCE_CONFIG.webVitals;
		const performanceBudget: PerformanceBudgetMonitor = {
			webVitals: {
				LCP: {
					current: webVitalsMetrics.LCP?.value || 0,
					budget: config.LCP.good,
					status: this.getMetricStatus(
						webVitalsMetrics.LCP?.value || 0,
						config.LCP.good,
						config.LCP.poor,
					),
				},
				FID: {
					current: webVitalsMetrics.FID?.value || 0,
					budget: config.FID.good,
					status: this.getMetricStatus(
						webVitalsMetrics.FID?.value || 0,
						config.FID.good,
						config.FID.poor,
					),
				},
				CLS: {
					current: webVitalsMetrics.CLS?.value || 0,
					budget: config.CLS.good,
					status: this.getMetricStatus(
						webVitalsMetrics.CLS?.value || 0,
						config.CLS.good,
						config.CLS.poor,
					),
				},
				FCP: {
					current: webVitalsMetrics.FCP?.value || 0,
					budget: config.FCP.good,
					status: this.getMetricStatus(
						webVitalsMetrics.FCP?.value || 0,
						config.FCP.good,
						config.FCP.poor,
					),
				},
				TTFB: {
					current: webVitalsMetrics.TTFB?.value || 0,
					budget: config.TTFB.good,
					status: this.getMetricStatus(
						webVitalsMetrics.TTFB?.value || 0,
						config.TTFB.good,
						config.TTFB.poor,
					),
				},
			},
			resourceBudgets: {
				javascriptSize: {
					current: await this.getCurrentResourceSize('script'),
					budget: PERFORMANCE_CONFIG.resources.javascript.total,
					status: 'good',
				},
				cssSize: {
					current: await this.getCurrentResourceSize('stylesheet'),
					budget: PERFORMANCE_CONFIG.resources.css.total,
					status: 'good',
				},
				imageSize: {
					current: await this.getCurrentResourceSize('image'),
					budget: PERFORMANCE_CONFIG.resources.images.totalPerPage,
					status: 'good',
				},
				totalPageWeight: {
					current: await this.getCurrentPageWeight(),
					budget: PERFORMANCE_CONFIG.resources.totalPageWeight.homepage,
					status: 'good',
				},
			},
			networkBudgets: {
				httpRequests: {
					current: await this.getCurrentRequestCount(),
					budget: PERFORMANCE_CONFIG.network.httpRequests.homepage,
					status: 'good',
				},
				thirdPartyRequests: {
					current: await this.getCurrentThirdPartyRequestCount(),
					budget: PERFORMANCE_CONFIG.network.thirdPartyRequests,
					status: 'good',
				},
			},
		};
		performanceBudget.resourceBudgets.javascriptSize.status =
			this.getBudgetStatus(
				performanceBudget.resourceBudgets.javascriptSize.current,
				performanceBudget.resourceBudgets.javascriptSize.budget,
			);
		performanceBudget.resourceBudgets.cssSize.status = this.getBudgetStatus(
			performanceBudget.resourceBudgets.cssSize.current,
			performanceBudget.resourceBudgets.cssSize.budget,
		);
		performanceBudget.resourceBudgets.imageSize.status = this.getBudgetStatus(
			performanceBudget.resourceBudgets.imageSize.current,
			performanceBudget.resourceBudgets.imageSize.budget,
		);
		performanceBudget.resourceBudgets.totalPageWeight.status =
			this.getBudgetStatus(
				performanceBudget.resourceBudgets.totalPageWeight.current,
				performanceBudget.resourceBudgets.totalPageWeight.budget,
			);
		performanceBudget.networkBudgets.httpRequests.status = this.getBudgetStatus(
			performanceBudget.networkBudgets.httpRequests.current,
			performanceBudget.networkBudgets.httpRequests.budget,
		);
		performanceBudget.networkBudgets.thirdPartyRequests.status =
			this.getBudgetStatus(
				performanceBudget.networkBudgets.thirdPartyRequests.current,
				performanceBudget.networkBudgets.thirdPartyRequests.budget,
			);
		this.performanceBudgetMonitor = performanceBudget;
		await this.checkBudgetViolations(performanceBudget);
		return performanceBudget;
	}
	async collectRealUserMonitoringData(): Promise<RealUserMonitoringData> {
		const businessMetrics = await businessAnalytics.getBusinessMetrics();
		const rumData: RealUserMonitoringData = {
			sessionMetrics: {
				totalSessions: businessMetrics.sessionCount || 0,
				bounceRate: businessMetrics.bounceRate || 0,
				averageSessionDuration: businessMetrics.averageSessionDuration || 0,
				conversionRate: businessMetrics.conversionRate || 0,
			},
			userJourneyMetrics: {
				funnelCompletionRate: businessMetrics.funnelCompletionRate || 0,
				dropOffPoints: businessMetrics.dropOffPoints || [],
				averageTimeToConversion: businessMetrics.averageTimeToConversion || 0,
				revenueImpact: businessMetrics.revenueImpact || 0,
			},
			errorMetrics: {
				jsErrorRate: businessMetrics.jsErrorRate || 0,
				apiFailureRate: businessMetrics.apiFailureRate || 0,
				formSubmissionErrors: businessMetrics.formSubmissionErrors || 0,
				paymentProcessingErrors: businessMetrics.paymentProcessingErrors || 0,
			},
			geographicMetrics: {
				regionPerformance: businessMetrics.regionPerformance || {},
				deviceTypePerformance: businessMetrics.deviceTypePerformance || {},
				networkConditionImpact: businessMetrics.networkConditionImpact || {},
			},
		};
		this.realUserMonitoring = rumData;
		await this.checkBusinessMetricViolations(rumData);
		return rumData;
	}
	async triggerAlert(
		alertType: string,
		severity: 'critical' | 'warning',
		data: AlertData,
	): Promise<void> {
		const alertId = `${alertType}_${Date.now()}`;
		const timestamp = new Date();
		this.activeAlerts.set(alertId, {
			timestamp,
			severity,
			resolved: false,
		});
		this.alertHistory.push({
			id: alertId,
			timestamp,
			type: alertType,
			severity,
			resolved: false,
		});
		Sentry.captureMessage(`Enterprise Alert: ${alertType}`, {
			level: severity === 'critical' ? 'error' : 'warning',
			tags: {
				alertType,
				severity,
				system: 'enterprise-monitoring',
			},
			extra: {
				alertData: data,
				alertId,
			},
		});
		await this.sendNotifications(alertType, severity, data, alertId);
		console.log(
			`🚨 Enterprise Alert [${severity.toUpperCase()}]: ${alertType}`,
			data,
		);
	}
	private async sendNotifications(
		alertType: string,
		severity: 'critical' | 'warning',
		data: AlertData,
		alertId: string,
	): Promise<void> {
		const promises: Promise<void>[] = [];
		if (this.notificationChannels.email.enabled) {
			promises.push(
				this.sendEmailNotification(alertType, severity, data, alertId),
			);
		}
		if (this.notificationChannels.slack.enabled) {
			promises.push(
				this.sendSlackNotification(alertType, severity, data, alertId),
			);
		}
		if (this.notificationChannels.sms.enabled && severity === 'critical') {
			promises.push(this.sendSMSNotification(alertType, severity, data, alertId));
		}
		if (this.notificationChannels.webhook.enabled) {
			promises.push(
				this.sendWebhookNotification(alertType, severity, data, alertId),
			);
		}
		await Promise.allSettled(promises);
	}
	private async sendEmailNotification(
		alertType: string,
		severity: 'critical' | 'warning',
		data: AlertData,
		alertId: string,
	): Promise<void> {
		try {
			const template =
				severity === 'critical' ?
					this.notificationChannels.email.templates.critical
				:	this.notificationChannels.email.templates.warning;
			const emailBody = this.formatEmailAlert(alertType, severity, data, template);
			console.log(`📧 Email Alert [${severity}]: ${alertType}`, {
				recipients: this.notificationChannels.email.recipients,
				subject: `Royal Client Service Alert: ${alertType}`,
				body: emailBody,
			});
		} catch (error) {
			console.error('Failed to send email notification:', error);
		}
	}
	private async sendSlackNotification(
		alertType: string,
		severity: 'critical' | 'warning',
		data: AlertData,
		alertId: string,
	): Promise<void> {
		try {
			const channel =
				severity === 'critical' ?
					this.notificationChannels.slack.channels.critical
				:	this.notificationChannels.slack.channels.warnings;
			const slackMessage = {
				channel,
				text: `🚨 Enterprise Alert: ${alertType}`,
				attachments: [
					{
						color: severity === 'critical' ? 'danger' : 'warning',
						fields: [
							{
								title: 'Alert Type',
								value: alertType,
								short: true,
							},
							{
								title: 'Severity',
								value: severity.toUpperCase(),
								short: true,
							},
							{
								title: 'Alert ID',
								value: alertId,
								short: true,
							},
							{
								title: 'Timestamp',
								value: new Date().toISOString(),
								short: true,
							},
						],
						footer: 'My Private Tutor Online - Enterprise Monitoring',
						ts: Math.floor(Date.now() / 1000),
					},
				],
			};
			await fetch(this.notificationChannels.slack.webhookUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(slackMessage),
			});
		} catch (error) {
			console.error('Failed to send Slack notification:', error);
		}
	}
	private async sendSMSNotification(
		alertType: string,
		severity: 'critical' | 'warning',
		data: AlertData,
		alertId: string,
	): Promise<void> {
		try {
			const message = `🚨 CRITICAL ALERT: ${alertType} - My Private Tutor Online. Alert ID: ${alertId}. Immediate attention required.`;
			console.log(`📱 SMS Alert [${severity}]: ${alertType}`, {
				recipients: this.notificationChannels.sms.recipients,
				message,
			});
		} catch (error) {
			console.error('Failed to send SMS notification:', error);
		}
	}
	private async sendWebhookNotification(
		alertType: string,
		severity: 'critical' | 'warning',
		data: AlertData,
		alertId: string,
	): Promise<void> {
		try {
			const payload = {
				alertId,
				alertType,
				severity,
				timestamp: new Date().toISOString(),
				data,
				source: 'my-private-tutor-online',
				environment: process.env.NODE_ENV,
			};
			const headers: Record<string, string> = {
				'Content-Type': 'application/json',
			};
			if (this.notificationChannels.webhook.authentication.type === 'bearer') {
				headers['Authorization'] =
					`Bearer ${this.notificationChannels.webhook.authentication.credentials}`;
			} else if (
				this.notificationChannels.webhook.authentication.type === 'basic'
			) {
				headers['Authorization'] =
					`Basic ${this.notificationChannels.webhook.authentication.credentials}`;
			}
			const promises = this.notificationChannels.webhook.endpoints.map(
				(endpoint) =>
					fetch(endpoint, {
						method: 'POST',
						headers,
						body: JSON.stringify(payload),
					}),
			);
			await Promise.allSettled(promises);
		} catch (error) {
			console.error('Failed to send webhook notification:', error);
		}
	}
	private startContinuousMonitoring(): void {
		setInterval(async () => {
			try {
				await this.checkPerformanceBudgets();
			} catch (error) {
				console.error('Performance budget monitoring failed:', error);
			}
		}, 30000);
		setInterval(async () => {
			try {
				await this.collectRealUserMonitoringData();
			} catch (error) {
				console.error('Real user monitoring failed:', error);
			}
		}, 60000);
		if (this.infrastructureMonitor) {
			setInterval(async () => {
				try {
					await this.infrastructureMonitor.getApplicationHealth();
				} catch (error) {
					console.error('Infrastructure monitoring failed:', error);
				}
			}, 300000);
		}
		setInterval(() => {
			this.cleanupResolvedAlerts();
		}, 3600000);
	}
	private async checkBudgetViolations(
		budget: PerformanceBudgetMonitor,
	): Promise<void> {
		const violations: string[] = [];
		Object.entries(budget.webVitals).forEach(([metric, data]) => {
			if (data.status === 'critical') {
				violations.push(
					`${metric}: ${data.current} exceeds critical threshold ${data.budget}`,
				);
			}
		});
		Object.entries(budget.resourceBudgets).forEach(([resource, data]) => {
			if (data.status === 'critical') {
				violations.push(
					`${resource}: ${(data.current / 1024).toFixed(2)}KB exceeds budget ${(data.budget / 1024).toFixed(2)}KB`,
				);
			}
		});
		Object.entries(budget.networkBudgets).forEach(([network, data]) => {
			if (data.status === 'critical') {
				violations.push(
					`${network}: ${data.current} exceeds budget ${data.budget}`,
				);
			}
		});
		if (violations.length > 0) {
			await this.triggerAlert('performance_budget_violation', 'critical', {
				violations,
				budget,
				timestamp: new Date().toISOString(),
			});
		}
	}
	private async checkBusinessMetricViolations(
		rumData: RealUserMonitoringData,
	): Promise<void> {
		const violations: string[] = [];
		if (
			rumData.userJourneyMetrics.funnelCompletionRate <
			100 - this.alertConfig.businessMetrics.conversionFunnelDrops
		) {
			violations.push(
				`Conversion funnel completion rate dropped to ${rumData.userJourneyMetrics.funnelCompletionRate}%`,
			);
		}
		if (
			rumData.errorMetrics.formSubmissionErrors >
			this.alertConfig.businessMetrics.revenueFormFailures
		) {
			violations.push(
				`Form submission error rate: ${rumData.errorMetrics.formSubmissionErrors}%`,
			);
		}
		if (
			rumData.sessionMetrics.bounceRate >
			this.alertConfig.businessMetrics.clientEngagementDrop
		) {
			violations.push(
				`Bounce rate increased to ${rumData.sessionMetrics.bounceRate}%`,
			);
		}
		if (violations.length > 0) {
			await this.triggerAlert('business_metrics_violation', 'critical', {
				violations,
				rumData,
				timestamp: new Date().toISOString(),
			});
		}
	}
	private getMetricStatus(
		current: number,
		good: number,
		poor: number,
	): 'good' | 'warning' | 'critical' {
		if (current <= good) return 'good';
		if (current <= poor) return 'warning';
		return 'critical';
	}
	private getBudgetStatus(
		current: number,
		budget: number,
	): 'good' | 'warning' | 'critical' {
		const percentage = (current / budget) * 100;
		if (percentage <= 80) return 'good';
		if (percentage <= 100) return 'warning';
		return 'critical';
	}
	private async getCurrentResourceSize(type: string): Promise<number> {
		if (typeof window === 'undefined') return 0;
		try {
			const resources = performance.getEntriesByType(
				'resource',
			) as PerformanceResourceTiming[];
			return resources
				.filter((resource) => {
					if (type === 'script') return resource.name.includes('.js');
					if (type === 'stylesheet') return resource.name.includes('.css');
					if (type === 'image')
						return /\.(jpg|jpeg|png|gif|webp|svg)/.test(resource.name);
					return false;
				})
				.reduce((total, resource) => total + (resource.transferSize || 0), 0);
		} catch {
			return 0;
		}
	}
	private async getCurrentPageWeight(): Promise<number> {
		if (typeof window === 'undefined') return 0;
		try {
			const resources = performance.getEntriesByType(
				'resource',
			) as PerformanceResourceTiming[];
			return resources.reduce(
				(total, resource) => total + (resource.transferSize || 0),
				0,
			);
		} catch {
			return 0;
		}
	}
	private async getCurrentRequestCount(): Promise<number> {
		if (typeof window === 'undefined') return 0;
		try {
			return performance.getEntriesByType('resource').length;
		} catch {
			return 0;
		}
	}
	private async getCurrentThirdPartyRequestCount(): Promise<number> {
		if (typeof window === 'undefined') return 0;
		try {
			const currentDomain = window.location.hostname;
			const resources = performance.getEntriesByType(
				'resource',
			) as PerformanceResourceTiming[];
			return resources.filter((resource) => {
				try {
					const resourceDomain = new URL(resource.name).hostname;
					return resourceDomain !== currentDomain;
				} catch {
					return false;
				}
			}).length;
		} catch {
			return 0;
		}
	}
	private formatEmailAlert(
		alertType: string,
		severity: string,
		data: AlertData,
		template: string,
	): string {
		return `
      <h2>🚨 ${severity.toUpperCase()} Alert: ${alertType}</h2>
      <p><strong>Service:</strong> My Private Tutor Online</p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      <p><strong>Alert Data:</strong></p>
      <pre>${JSON.stringify(data, null, 2)}</pre>
      <p>This alert requires immediate attention to maintain royal client service standards.</p>
    `;
	}
	private cleanupResolvedAlerts(): void {
		const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
		for (const [alertId, alert] of this.activeAlerts.entries()) {
			if (alert.resolved && alert.timestamp < cutoff) {
				this.activeAlerts.delete(alertId);
			}
		}
		if (this.alertHistory.length > 1000) {
			this.alertHistory = this.alertHistory.slice(-1000);
		}
	}
	public async getSystemStatus() {
		return {
			performanceBudgets: this.performanceBudgetMonitor,
			realUserMonitoring: this.realUserMonitoring,
			activeAlerts: Array.from(this.activeAlerts.entries()).map(([id, alert]) => ({
				id,
				...alert,
			})),
			alertHistory: this.alertHistory.slice(-50),
			systemHealth: {
				monitoring: true,
				alerting: true,
				notifications: {
					email: this.notificationChannels.email.enabled,
					slack: this.notificationChannels.slack.enabled,
					sms: this.notificationChannels.sms.enabled,
					webhook: this.notificationChannels.webhook.enabled,
				},
			},
		};
	}
	public async resolveAlert(alertId: string): Promise<boolean> {
		const alert = this.activeAlerts.get(alertId);
		if (!alert) return false;
		alert.resolved = true;
		const historyEntry = this.alertHistory.find((entry) => entry.id === alertId);
		if (historyEntry) {
			historyEntry.resolved = true;
			historyEntry.resolutionTime = Date.now() - alert.timestamp.getTime();
		}
		return true;
	}
	public getPerformanceReport() {
		return {
			budgetCompliance: this.performanceBudgetMonitor,
			webVitalsStatus: webVitalsTracker.getSummary(),
			businessMetrics: this.realUserMonitoring,
			recommendations: this.generatePerformanceRecommendations(),
		};
	}
	private generatePerformanceRecommendations(): string[] {
		const recommendations: string[] = [];
		if (this.performanceBudgetMonitor) {
			if (this.performanceBudgetMonitor.webVitals.LCP.status !== 'good') {
				recommendations.push(
					'Optimize Largest Contentful Paint: Consider image optimization, server response times, and resource loading priorities',
				);
			}
			if (this.performanceBudgetMonitor.webVitals.CLS.status !== 'good') {
				recommendations.push(
					'Improve Cumulative Layout Shift: Add size attributes to images and ensure proper loading states',
				);
			}
			if (
				this.performanceBudgetMonitor.resourceBudgets.javascriptSize.status ===
				'critical'
			) {
				recommendations.push(
					'Reduce JavaScript bundle size: Consider code splitting and removing unused dependencies',
				);
			}
			if (
				this.performanceBudgetMonitor.networkBudgets.httpRequests.status ===
				'critical'
			) {
				recommendations.push(
					'Reduce HTTP requests: Combine resources and optimize asset loading strategy',
				);
			}
		}
		return recommendations;
	}
}
export const createEnterpriseMonitoringConfig = (): {
	alertConfig: EnterpriseAlertConfig;
	notificationChannels: AlertNotificationChannels;
} => {
	const alertConfig: EnterpriseAlertConfig = {
		critical: {
			siteDowntime: true,
			formSubmissionFailures: 5,
			coreWebVitalsDegradation: 20,
			buildFailures: true,
		},
		warning: {
			performanceBudgetViolations: true,
			errorRateIncrease: 2,
			slowPageLoads: 3000,
			assetLoadingFailures: true,
		},
		businessMetrics: {
			conversionFunnelDrops: 15,
			revenueFormFailures: 3,
			clientEngagementDrop: 25,
		},
		slaThresholds: {
			uptimeRequired: 99.9,
			responseTimeMax: 2000,
			errorRateMax: 1,
			performanceScoreMin: 90,
		},
	};
	const notificationChannels: AlertNotificationChannels = {
		email: {
			enabled: !!process.env.ALERT_EMAIL_ENABLED,
			recipients: process.env.ALERT_EMAIL_RECIPIENTS?.split(',') || [],
			templates: {
				critical: 'critical-alert-template',
				warning: 'warning-alert-template',
				recovery: 'recovery-alert-template',
			},
		},
		slack: {
			enabled: !!process.env.SLACK_WEBHOOK_URL,
			webhookUrl: process.env.SLACK_WEBHOOK_URL || '',
			channels: {
				critical: '#critical-alerts',
				warnings: '#warnings',
				performance: '#performance-monitoring',
			},
		},
		sms: {
			enabled: !!process.env.SMS_ALERTS_ENABLED,
			recipients: process.env.SMS_ALERT_RECIPIENTS?.split(',') || [],
			provider: 'twilio',
		},
		webhook: {
			enabled: !!process.env.WEBHOOK_ALERTS_ENABLED,
			endpoints: process.env.WEBHOOK_ALERT_ENDPOINTS?.split(',') || [],
			authentication: {
				type: 'bearer',
				credentials: process.env.WEBHOOK_AUTH_TOKEN || '',
			},
		},
	};
	return {
		alertConfig,
		notificationChannels,
	};
};
let enterpriseMonitoringInstance: EnterpriseMonitoringSystem | null = null;
export const getEnterpriseMonitoring = (): EnterpriseMonitoringSystem => {
	if (!enterpriseMonitoringInstance) {
		const { alertConfig, notificationChannels } =
			createEnterpriseMonitoringConfig();
		enterpriseMonitoringInstance = new EnterpriseMonitoringSystem(
			alertConfig,
			notificationChannels,
		);
	}
	return enterpriseMonitoringInstance;
};
export default EnterpriseMonitoringSystem;
