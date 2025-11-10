import { NextRequest, NextResponse } from 'next/server';
interface ErrorReportRequest {
	errors: Array<{
		errorId: string;
		timestamp: number;
		category: string;
		severity: string;
		component: string;
		message: string;
		stack?: string;
		context?: Record<string, any>;
		userAgent: string;
		url: string;
		userId?: string;
		sessionId: string;
		buildVersion: string;
		environment: string;
		clientType: string;
		businessImpact: string;
		recoveryAttempts: number;
		recoverySuccess: boolean;
		fallbackUsed: boolean;
		userJourney: string[];
		performanceMetrics?: {
			timeToError: number;
			timeToRecovery?: number;
			memoryUsage?: number;
			cpuUsage?: number;
		};
		faqContext?: {
			searchQuery?: string;
			categoryId?: string;
			questionId?: string;
			filters?: Record<string, any>;
			searchResults?: any[];
			userType?: string;
			feature?: string;
		};
		fallbackMode?: string;
		alternatives?: string[];
		priority?: string;
	}>;
	metrics: {
		totalErrors: number;
		errorsByCategory: Record<string, number>;
		errorsBySeverity: Record<string, number>;
		errorsByComponent: Record<string, number>;
		errorsByUserType: Record<string, number>;
		recoverySuccessRate: number;
		fallbackUsageRate: number;
		averageRecoveryTime: number;
		businessImpactMetrics: {
			revenueAffected: number;
			conversionsLost: number;
			sessionAbandonment: number;
			supportTicketsCreated: number;
		};
		performanceMetrics: {
			errorRate: number;
			errorRateByEndpoint: Record<string, number>;
			timeToFirstError: number;
			errorFrequency: Record<string, number>;
		};
		userExperience: {
			userFrustrationIndex: number;
			taskCompletionImpact: number;
			featureAvailabilityRate: number;
		};
	};
	session: {
		id: string;
		startTime: number;
		userAgent: string;
		url: string;
		userJourney: string[];
	};
	timestamp: number;
	urgent?: boolean;
	environment: string;
	buildVersion: string;
}
interface ErrorReportResponse {
	success: boolean;
	errorId?: string;
	processingTime: number;
	actions?: {
		alertsSent: number;
		ticketsCreated: number;
		escalations: number;
	};
	message?: string;
	recommendations?: string[];
}
export async function POST(
	request: NextRequest,
): Promise<NextResponse<ErrorReportResponse>> {
	const startTime = Date.now();
	try {
		const errorReport: ErrorReportRequest = await request.json();
		if (
			!errorReport.errors ||
			!Array.isArray(errorReport.errors) ||
			errorReport.errors.length === 0
		) {
			return NextResponse.json(
				{
					success: false,
					processingTime: Date.now() - startTime,
					message: 'Invalid error report: no errors provided',
				},
				{
					status: 400,
				},
			);
		}
		const actions = {
			alertsSent: 0,
			ticketsCreated: 0,
			escalations: 0,
		};
		const recommendations: string[] = [];
		for (const error of errorReport.errors) {
			if (error.severity === 'critical') {
				await handleCriticalError(error, errorReport);
				actions.alertsSent++;
			}
			if (error.clientType === 'royal' || error.priority === 'royal_client') {
				await handleRoyalClientError(error, errorReport);
				actions.ticketsCreated++;
			}
			if (error.businessImpact === 'revenue_critical') {
				await handleRevenueImpact(error, errorReport);
				actions.escalations++;
			}
			const errorRecommendations = generateRecommendations(error, errorReport);
			recommendations.push(...errorRecommendations);
		}
		await storeErrorData(errorReport);
		await updateErrorMetrics(errorReport);
		if (errorReport.environment === 'production') {
			await sendToMonitoringServices(errorReport);
		}
		const processingTime = Date.now() - startTime;
		console.log(
			`Processed ${errorReport.errors.length} errors in ${processingTime}ms`,
			{
				critical: errorReport.errors.filter((e) => e.severity === 'critical')
					.length,
				royal: errorReport.errors.filter((e) => e.clientType === 'royal').length,
				revenue: errorReport.errors.filter(
					(e) => e.businessImpact === 'revenue_critical',
				).length,
			},
		);
		return NextResponse.json({
			success: true,
			errorId: errorReport.errors[0]?.errorId,
			processingTime,
			actions:
				actions.alertsSent || actions.ticketsCreated || actions.escalations ?
					actions
				:	undefined,
			recommendations:
				recommendations.length > 0 ?
					Array.from(new Set(recommendations))
				:	undefined,
		});
	} catch (error) {
		console.error('Error processing error report:', error);
		return NextResponse.json(
			{
				success: false,
				processingTime: Date.now() - startTime,
				message: 'Internal server error while processing error report',
			},
			{
				status: 500,
			},
		);
	}
}
async function handleCriticalError(
	error: any,
	report: ErrorReportRequest,
): Promise<void> {
	try {
		await sendAlert({
			type: 'critical',
			title: `Critical FAQ Error: ${error.component}`,
			message: error.message,
			error,
			report,
			urgency: 'high',
		});
		console.error('CRITICAL ERROR ALERT:', {
			errorId: error.errorId,
			component: error.component,
			message: error.message,
			clientType: error.clientType,
			businessImpact: error.businessImpact,
			url: error.url,
			timestamp: new Date(error.timestamp).toISOString(),
		});
		if (error.clientType === 'royal') {
			await escalateToManagement({
				error,
				report,
				reason: 'Critical error affecting royal client',
			});
		}
	} catch (alertError) {
		console.error('Failed to handle critical error:', alertError);
	}
}
async function handleRoyalClientError(
	error: any,
	report: ErrorReportRequest,
): Promise<void> {
	try {
		await createSupportTicket({
			priority: 'urgent',
			title: `Royal Client FAQ Issue: ${error.component}`,
			description: `Error affecting royal client experience in FAQ system`,
			error,
			report,
			clientType: 'royal',
			assignTo: 'premium-support-team',
		});
		await notifyClientSuccess({
			error,
			report,
			clientType: 'royal',
			action: 'proactive_outreach',
		});
		console.warn('ROYAL CLIENT ERROR:', {
			errorId: error.errorId,
			component: error.component,
			message: error.message,
			sessionId: error.sessionId,
			url: error.url,
			faqContext: error.faqContext,
		});
	} catch (ticketError) {
		console.error('Failed to handle royal client error:', ticketError);
	}
}
async function handleRevenueImpact(
	error: any,
	report: ErrorReportRequest,
): Promise<void> {
	try {
		const revenueImpact = calculateRevenueImpact(error, report);
		await escalateToBusiness({
			error,
			report,
			revenueImpact,
			reason: 'Revenue-critical error detected',
		});
		await triggerRevenueProtection({
			error,
			report,
			impact: revenueImpact,
		});
		console.warn('REVENUE IMPACT ALERT:', {
			errorId: error.errorId,
			component: error.component,
			estimatedImpact: revenueImpact,
			affectedClients: report.metrics.errorsByUserType,
			recoveryStatus: error.recoverySuccess,
		});
	} catch (revenueError) {
		console.error('Failed to handle revenue impact:', revenueError);
	}
}
function generateRecommendations(
	error: any,
	report: ErrorReportRequest,
): string[] {
	const recommendations: string[] = [];
	if (error.category === 'search') {
		if (
			error.faqContext?.searchQuery &&
			report.metrics.errorsByCategory.search > 5
		) {
			recommendations.push('Consider implementing search query optimization');
		}
		if (!error.fallbackUsed) {
			recommendations.push(
				'Enable search fallback mechanisms for better user experience',
			);
		}
	}
	if (error.category === 'voice') {
		recommendations.push(
			'Implement browser compatibility checks for voice search',
		);
		if (!error.fallbackUsed) {
			recommendations.push('Add text search fallback for voice search failures');
		}
	}
	if (error.category === 'network') {
		recommendations.push(
			'Implement offline-first architecture for better resilience',
		);
		recommendations.push('Consider service worker for cached content delivery');
	}
	if (error.performanceMetrics?.timeToError < 5000) {
		recommendations.push('Investigate early error patterns in user sessions');
	}
	if (error.businessImpact === 'revenue_critical' && !error.recoverySuccess) {
		recommendations.push(
			'Implement enhanced recovery mechanisms for revenue-critical paths',
		);
	}
	return recommendations;
}
async function storeErrorData(report: ErrorReportRequest): Promise<void> {
	try {
		const errorSummary = {
			timestamp: new Date().toISOString(),
			totalErrors: report.errors.length,
			criticalErrors: report.errors.filter((e) => e.severity === 'critical')
				.length,
			royalClientErrors: report.errors.filter((e) => e.clientType === 'royal')
				.length,
			revenueImpactErrors: report.errors.filter(
				(e) => e.businessImpact === 'revenue_critical',
			).length,
			recoverySuccessRate: report.metrics.recoverySuccessRate,
			environment: report.environment,
		};
		console.log('Error data stored:', errorSummary);
	} catch (storageError) {
		console.error('Failed to store error data:', storageError);
	}
}
async function updateErrorMetrics(report: ErrorReportRequest): Promise<void> {
	try {
		const metricsUpdate = {
			timestamp: new Date().toISOString(),
			errorRate: report.metrics.performanceMetrics.errorRate,
			recoveryRate: report.metrics.recoverySuccessRate,
			fallbackRate: report.metrics.fallbackUsageRate,
			userFrustration: report.metrics.userExperience.userFrustrationIndex,
			revenueImpact: report.metrics.businessImpactMetrics.revenueAffected,
		};
		console.log('Metrics updated:', metricsUpdate);
	} catch (metricsError) {
		console.error('Failed to update metrics:', metricsError);
	}
}
async function sendAlert(alert: any): Promise<void> {
	console.log('Alert sent:', alert.title, alert.urgency);
}
async function createSupportTicket(ticket: any): Promise<void> {
	console.log('Support ticket created:', ticket.title, ticket.priority);
}
async function notifyClientSuccess(notification: any): Promise<void> {
	console.log('Client success notified:', notification.clientType);
}
async function escalateToManagement(escalation: any): Promise<void> {
	console.log('Escalated to management:', escalation.reason);
}
async function escalateToBusiness(escalation: any): Promise<void> {
	console.log('Escalated to business:', escalation.revenueImpact);
}
async function triggerRevenueProtection(protection: any): Promise<void> {
	console.log('Revenue protection triggered:', protection.impact);
}
async function sendToMonitoringServices(
	report: ErrorReportRequest,
): Promise<void> {
	console.log('Sent to monitoring services:', report.errors.length, 'errors');
}
function calculateRevenueImpact(
	error: any,
	report: ErrorReportRequest,
): number {
	let impact = 0;
	if (error.clientType === 'royal') {
		impact += 5000;
	} else if (error.clientType === 'standard') {
		impact += 1000;
	} else {
		impact += 100;
	}
	const errorFrequency = report.metrics.errorsByCategory[error.category] || 1;
	impact *= Math.min(errorFrequency, 10);
	return Math.round(impact);
}
