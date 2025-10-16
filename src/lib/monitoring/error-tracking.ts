import type {
	ErrorAnalyticsData,
	ErrorTrackingMetrics,
	ErrorMonitoringConfig,
	ClientType,
} from '../error-handling/types';
import {
	getErrorSeverity,
	getErrorCategory,
	getBusinessImpact,
	sanitiseErrorContext,
} from '../../components/error-boundary/utils';
const DEFAULT_CONFIG: ErrorMonitoringConfig = {
	enabled: true,
	environment: (process.env.NODE_ENV as any) || 'development',
	sampleRate: 1.0,
	enableConsoleLogging: process.env.NODE_ENV === 'development',
	enablePerformanceTracking: true,
	enableUserTracking: true,
	enableBreadcrumbs: true,
	maxReportsPerSession: 50,
	reportingDelay: 1000,
	excludeErrors: [
		'ResizeObserver loop limit exceeded',
		'Script error.',
		'Non-Error promise rejection captured',
	],
	includeContext: true,
	privacy: {
		scrubSensitiveData: true,
		excludePersonalInfo: true,
		hashUserIdentifiers: false,
	},
};
interface ErrorTrackingState {
	metrics: ErrorTrackingMetrics;
	recentErrors: ErrorAnalyticsData[];
	userJourney: string[];
	sessionStartTime: number;
	lastErrorTime: number;
	errorQueue: ErrorAnalyticsData[];
	reportingPaused: boolean;
}
export class ErrorTrackingService {
	private config: ErrorMonitoringConfig;
	private state: ErrorTrackingState;
	private reportingTimer: NodeJS.Timeout | null = null;
	private performanceObserver: PerformanceObserver | null = null;
	constructor(config: Partial<ErrorMonitoringConfig> = {}) {
		this.config = {
			...DEFAULT_CONFIG,
			...config,
		};
		this.state = {
			metrics: this.initializeMetrics(),
			recentErrors: [],
			userJourney: [],
			sessionStartTime: Date.now(),
			lastErrorTime: 0,
			errorQueue: [],
			reportingPaused: false,
		};
		this.initialize();
	}
	private initialize(): void {
		if (!this.config.enabled || typeof window === 'undefined') return;
		this.setupGlobalErrorHandlers();
		if (this.config.enablePerformanceTracking) {
			this.initializePerformanceTracking();
		}
		this.startReporting();
		this.trackPageNavigation();
	}
	private initializeMetrics(): ErrorTrackingMetrics {
		return {
			totalErrors: 0,
			errorsByCategory: {},
			errorsBySeverity: {
				low: 0,
				medium: 0,
				high: 0,
				critical: 0,
			},
			errorsByComponent: {},
			errorsByUserType: {
				royal: 0,
				standard: 0,
				visitor: 0,
			},
			recoverySuccessRate: 0,
			fallbackUsageRate: 0,
			averageRecoveryTime: 0,
			businessImpactMetrics: {
				revenueAffected: 0,
				conversionsLost: 0,
				sessionAbandonment: 0,
				supportTicketsCreated: 0,
			},
			performanceMetrics: {
				errorRate: 0,
				errorRateByEndpoint: {},
				timeToFirstError: 0,
				errorFrequency: {},
			},
			userExperience: {
				userFrustrationIndex: 0,
				taskCompletionImpact: 0,
				featureAvailabilityRate: 100,
			},
		};
	}
	public trackError(
		error: Error,
		context?: any,
		component?: string,
		severity?: string,
	): void {
		if (!this.config.enabled || this.shouldExcludeError(error)) return;
		const errorData = this.createErrorAnalytics(
			error,
			context,
			component,
			severity,
		);
		this.updateMetrics(errorData);
		this.state.recentErrors.push(errorData);
		this.state.errorQueue.push(errorData);
		if (this.state.recentErrors.length > 100) {
			this.state.recentErrors = this.state.recentErrors.slice(-50);
		}
		if (this.config.enableConsoleLogging) {
			this.logErrorToConsole(errorData);
		}
		if (errorData.severity === 'critical') {
			this.handleCriticalError(errorData);
		}
		if (errorData.clientType === 'royal') {
			this.handleRoyalClientError(errorData);
		}
		this.state.lastErrorTime = Date.now();
	}
	private createErrorAnalytics(
		error: Error,
		context?: any,
		component?: string,
		severity?: string,
	): ErrorAnalyticsData {
		const timestamp = Date.now();
		const category = getErrorCategory(error);
		const errorSeverity = severity || getErrorSeverity(error);
		const businessImpact = getBusinessImpact(error, context);
		const clientType = this.getClientType();
		return {
			errorId: `error_${timestamp}_${Math.random().toString(36).substring(2)}`,
			timestamp,
			category,
			severity: errorSeverity,
			component: component || 'Unknown',
			message: error.message,
			stack: error.stack,
			context: context ? sanitiseErrorContext(context) : undefined,
			userAgent: navigator.userAgent,
			url: window.location.href,
			userId: this.getUserId(),
			sessionId: this.getSessionId(),
			buildVersion: this.getBuildVersion(),
			environment: this.config.environment,
			clientType,
			businessImpact,
			recoveryAttempts: context?.recoveryAttempts || 0,
			recoverySuccess: context?.recoverySuccess || false,
			fallbackUsed: context?.fallbackUsed || false,
			userJourney: [...this.state.userJourney],
			performanceMetrics: {
				timeToError: timestamp - this.state.sessionStartTime,
				timeToRecovery: context?.timeToRecovery,
				memoryUsage: this.getMemoryUsage(),
				cpuUsage: this.getCPUUsage(),
			},
		};
	}
	private updateMetrics(errorData: ErrorAnalyticsData): void {
		const { metrics } = this.state;
		metrics.totalErrors++;
		metrics.errorsByCategory[errorData.category] =
			(metrics.errorsByCategory[errorData.category] || 0) + 1;
		metrics.errorsBySeverity[
			errorData.severity as keyof typeof metrics.errorsBySeverity
		]++;
		metrics.errorsByComponent[errorData.component] =
			(metrics.errorsByComponent[errorData.component] || 0) + 1;
		metrics.errorsByUserType[
			errorData.clientType as keyof typeof metrics.errorsByUserType
		]++;
		if (errorData.recoveryAttempts > 0) {
			const totalRecoveryAttempts = this.state.recentErrors.filter(
				(e) => e.recoveryAttempts > 0,
			).length;
			const successfulRecoveries = this.state.recentErrors.filter(
				(e) => e.recoverySuccess,
			).length;
			metrics.recoverySuccessRate =
				totalRecoveryAttempts > 0 ?
					(successfulRecoveries / totalRecoveryAttempts) * 100
				:	0;
		}
		if (errorData.fallbackUsed) {
			const totalErrors = metrics.totalErrors;
			const fallbackUsage = this.state.recentErrors.filter(
				(e) => e.fallbackUsed,
			).length;
			metrics.fallbackUsageRate = (fallbackUsage / totalErrors) * 100;
		}
		if (
			errorData.businessImpact === 'revenue_critical' ||
			errorData.businessImpact === 'high'
		) {
			metrics.businessImpactMetrics.revenueAffected++;
			if (errorData.clientType === 'royal') {
				metrics.businessImpactMetrics.conversionsLost += 2;
			} else {
				metrics.businessImpactMetrics.conversionsLost++;
			}
		}
		const currentErrorRate =
			(metrics.totalErrors / (Date.now() - this.state.sessionStartTime)) * 1000;
		metrics.performanceMetrics.errorRate = currentErrorRate;
		if (metrics.performanceMetrics.timeToFirstError === 0) {
			metrics.performanceMetrics.timeToFirstError =
				errorData.performanceMetrics?.timeToError || 0;
		}
		this.updateUserExperienceMetrics(errorData);
	}
	private updateUserExperienceMetrics(errorData: ErrorAnalyticsData): void {
		const { metrics } = this.state;
		const frustrationFactors = {
			critical: 25,
			high: 15,
			medium: 8,
			low: 3,
		};
		const frustrationIncrease =
			frustrationFactors[errorData.severity as keyof typeof frustrationFactors] ||
			5;
		metrics.userExperience.userFrustrationIndex = Math.min(
			100,
			metrics.userExperience.userFrustrationIndex + frustrationIncrease,
		);
		if (['search', 'booking', 'payment'].includes(errorData.category)) {
			metrics.userExperience.taskCompletionImpact += 10;
		}
		const affectedFeatures = this.getAffectedFeatures(errorData);
		const totalFeatures = 10;
		const unavailableFeatures = new Set(
			this.state.recentErrors
				.filter((e) => Date.now() - e.timestamp < 300000)
				.map((e) => this.getAffectedFeatures(e))
				.flat(),
		).size;
		metrics.userExperience.featureAvailabilityRate = Math.max(
			0,
			((totalFeatures - unavailableFeatures) / totalFeatures) * 100,
		);
	}
	private async handleCriticalError(
		errorData: ErrorAnalyticsData,
	): Promise<void> {
		try {
			await this.sendErrorReport([errorData], true);
		} catch (reportingError) {
			console.error('Failed to report critical error:', reportingError);
		}
		this.triggerAlert({
			type: 'critical_error',
			message: `Critical error in ${errorData.component}: ${errorData.message}`,
			data: errorData,
		});
	}
	private async handleRoyalClientError(
		errorData: ErrorAnalyticsData,
	): Promise<void> {
		try {
			await this.sendErrorReport(
				[
					{
						...errorData,
						priority: 'royal_client',
					},
				],
				true,
			);
		} catch (reportingError) {
			console.error('Failed to report royal client error:', reportingError);
		}
		this.createSupportTicket(errorData);
	}
	private setupGlobalErrorHandlers(): void {
		window.addEventListener('error', (event) => {
			this.trackError(
				event.error || new Error(event.message),
				{
					source: event.filename,
					lineno: event.lineno,
					colno: event.colno,
					stack: event.error?.stack,
				},
				'GlobalErrorHandler',
			);
		});
		window.addEventListener('unhandledrejection', (event) => {
			const error =
				event.reason instanceof Error ?
					event.reason
				:	new Error(String(event.reason));
			this.trackError(
				error,
				{
					type: 'unhandled_promise_rejection',
				},
				'PromiseRejectionHandler',
			);
		});
	}
	private initializePerformanceTracking(): void {
		if ('PerformanceObserver' in window) {
			this.performanceObserver = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				entries.forEach((entry) => {
					if (entry.entryType === 'longtask') {
						this.state.userJourney.push(`longtask_${Math.round(entry.duration)}ms`);
					}
					if (entry.entryType === 'navigation') {
						const navEntry = entry as PerformanceNavigationTiming;
						this.state.userJourney.push(
							`page_load_${Math.round(navEntry.loadEventEnd)}ms`,
						);
					}
				});
			});
			try {
				this.performanceObserver.observe({
					type: 'longtask',
					buffered: true,
				});
				this.performanceObserver.observe({
					type: 'navigation',
					buffered: true,
				});
			} catch (e) {
				console.warn('Performance observer failed to initialize:', e);
			}
		}
	}
	private trackPageNavigation(): void {
		let lastUrl = window.location.href;
		this.state.userJourney.push(`page_${window.location.pathname}`);
		setInterval(() => {
			const currentUrl = window.location.href;
			if (currentUrl !== lastUrl) {
				lastUrl = currentUrl;
				this.state.userJourney.push(`navigate_${window.location.pathname}`);
				if (this.state.userJourney.length > 20) {
					this.state.userJourney = this.state.userJourney.slice(-15);
				}
			}
		}, 1000);
	}
	private startReporting(): void {
		if (this.reportingTimer) {
			clearInterval(this.reportingTimer);
		}
		this.reportingTimer = setInterval(() => {
			if (this.state.errorQueue.length > 0 && !this.state.reportingPaused) {
				const errorsToReport = [...this.state.errorQueue];
				this.state.errorQueue = [];
				this.sendErrorReport(errorsToReport).catch((error) => {
					console.error('Failed to send error report:', error);
					this.state.errorQueue.unshift(...errorsToReport);
				});
			}
		}, this.config.reportingDelay);
	}
	private async sendErrorReport(
		errors: ErrorAnalyticsData[],
		urgent = false,
	): Promise<void> {
		if (!this.config.apiEndpoint && this.config.environment === 'production') {
			this.config.apiEndpoint = '/api/errors';
		}
		const endpoint = this.config.apiEndpoint || '/api/errors';
		const payload = {
			errors,
			metrics: this.state.metrics,
			session: {
				id: this.getSessionId(),
				startTime: this.state.sessionStartTime,
				userAgent: navigator.userAgent,
				url: window.location.href,
				userJourney: this.state.userJourney,
			},
			timestamp: Date.now(),
			urgent,
			environment: this.config.environment,
			buildVersion: this.getBuildVersion(),
		};
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(this.config.apiKey && {
					Authorization: `Bearer ${this.config.apiKey}`,
				}),
			},
			body: JSON.stringify(payload),
		});
		if (!response.ok) {
			throw new Error(
				`Error reporting failed: ${response.status} ${response.statusText}`,
			);
		}
	}
	private shouldExcludeError(error: Error): boolean {
		return this.config.excludeErrors.some((excludePattern) =>
			error.message.includes(excludePattern),
		);
	}
	private getClientType(): ClientType {
		if (typeof window !== 'undefined') {
			const clientType = localStorage.getItem('clientType');
			if (clientType === 'royal' || clientType === 'standard') {
				return clientType as ClientType;
			}
		}
		return 'visitor';
	}
	private getUserId(): string | undefined {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('userId') || undefined;
		}
		return undefined;
	}
	private getSessionId(): string {
		if (typeof window !== 'undefined' && window.sessionStorage) {
			let sessionId = sessionStorage.getItem('errorTrackingSessionId');
			if (!sessionId) {
				sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
				sessionStorage.setItem('errorTrackingSessionId', sessionId);
			}
			return sessionId;
		}
		return 'server_session';
	}
	private getBuildVersion(): string {
		return process.env.NEXT_PUBLIC_BUILD_VERSION || '1.0.0';
	}
	private getMemoryUsage(): number {
		if ('memory' in performance) {
			return (performance as any).memory.usedJSHeapSize;
		}
		return 0;
	}
	private getCPUUsage(): number {
		return 0;
	}
	private getAffectedFeatures(errorData: ErrorAnalyticsData): string[] {
		const featureMap: Record<string, string[]> = {
			search: ['basic-search', 'advanced-search', 'voice-search', 'visual-search'],
			voice: ['voice-search', 'voice-navigation'],
			visual: ['visual-search', 'image-upload'],
			theme: ['dark-mode', 'theme-switching'],
			analytics: ['usage-tracking', 'recommendations'],
		};
		return featureMap[errorData.category] || [];
	}
	private logErrorToConsole(errorData: ErrorAnalyticsData): void {
		const style =
			errorData.severity === 'critical' ? 'color: red; font-weight: bold;'
			: errorData.severity === 'high' ? 'color: orange; font-weight: bold;'
			: 'color: #666;';
		console.group(`%c🚨 Error Tracked: ${errorData.component}`, style);
		console.error('Error:', errorData.message);
		console.info('Category:', errorData.category);
		console.info('Severity:', errorData.severity);
		console.info('Client Type:', errorData.clientType);
		if (errorData.context) {
			console.info('Context:', errorData.context);
		}
		console.groupEnd();
	}
	private async triggerAlert(alert: {
		type: string;
		message: string;
		data: any;
	}): Promise<void> {
		console.warn('ALERT:', alert.message);
	}
	private async createSupportTicket(
		errorData: ErrorAnalyticsData,
	): Promise<void> {
		console.info(
			'Support ticket would be created for royal client error:',
			errorData.errorId,
		);
	}
	public getMetrics(): ErrorTrackingMetrics {
		return {
			...this.state.metrics,
		};
	}
	public getRecentErrors(): ErrorAnalyticsData[] {
		return [...this.state.recentErrors];
	}
	public pauseReporting(): void {
		this.state.reportingPaused = true;
	}
	public resumeReporting(): void {
		this.state.reportingPaused = false;
	}
	public clearErrors(): void {
		this.state.recentErrors = [];
		this.state.errorQueue = [];
		this.state.metrics = this.initializeMetrics();
	}
	public destroy(): void {
		if (this.reportingTimer) {
			clearInterval(this.reportingTimer);
			this.reportingTimer = null;
		}
		if (this.performanceObserver) {
			this.performanceObserver.disconnect();
			this.performanceObserver = null;
		}
	}
}
let globalErrorTracker: ErrorTrackingService | null = null;
export function getErrorTracker(
	config?: Partial<ErrorMonitoringConfig>,
): ErrorTrackingService {
	if (!globalErrorTracker) {
		globalErrorTracker = new ErrorTrackingService(config);
	}
	return globalErrorTracker;
}
