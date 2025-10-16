import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
interface PerformanceAlert {
	metric: string;
	value: number;
	threshold: number;
	rating: 'good' | 'needs-improvement' | 'poor';
	url: string;
	timestamp: number;
	sessionId: string;
	userAgent: string;
}
enum AlertSeverity {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
	CRITICAL = 'critical',
}
const ALERT_CONFIG = {
	CRITICAL_THRESHOLDS: {
		LCP: 4000,
		INP: 500,
		CLS: 0.25,
		FCP: 3000,
		TTFB: 1000,
	},
	RATE_LIMIT: {
		MAX_ALERTS_PER_MINUTE: 5,
		MAX_ALERTS_PER_HOUR: 20,
	},
	CHANNELS: {
		EMAIL: process.env.ALERT_EMAIL || 'performance@myprivatetutoronline.com',
		SLACK_WEBHOOK: process.env.SLACK_PERFORMANCE_WEBHOOK,
		TEAMS_WEBHOOK: process.env.TEAMS_PERFORMANCE_WEBHOOK,
	},
} as const;
const alertCache = new Map<
	string,
	{
		count: number;
		lastAlert: number;
	}
>();
function determineUserType(
	userAgent: string,
	context: any,
): 'premium' | 'standard' | 'royal' {
	if (context?.country === 'GB' && userAgent.includes('Safari')) {
		return 'royal';
	}
	return 'standard';
}
function extractPageType(url: string): string {
	if (url.includes('/faq')) return 'faq';
	if (url.includes('/admin')) return 'admin';
	if (url.includes('/booking')) return 'booking';
	return 'general';
}
function extractDeviceType(userAgent: string): 'mobile' | 'desktop' | 'tablet' {
	if (/Mobile|Android|iPhone/i.test(userAgent)) return 'mobile';
	if (/iPad|Tablet/i.test(userAgent)) return 'tablet';
	return 'desktop';
}
export async function POST(request: NextRequest) {
	try {
		const correlationId = request.headers.get('x-correlation-id') || 'unknown';
		const performanceContextHeader = request.headers.get('x-performance-context');
		let performanceContext = null;
		if (performanceContextHeader) {
			try {
				performanceContext = JSON.parse(performanceContextHeader);
			} catch (e) {
				console.warn('Failed to parse performance context:', e);
			}
		}
		const alert: PerformanceAlert = await request.json();
		if (!alert.metric || !alert.value || !alert.sessionId) {
			return NextResponse.json(
				{
					error: 'Missing required alert fields',
				},
				{
					status: 400,
				},
			);
		}
		const headersList = await headers();
		const clientIP =
			headersList.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
		const country = headersList.get('x-vercel-ip-country') || 'unknown';
		const severity = determineAlertSeverity(alert);
		const rateLimitKey = `${clientIP}-${alert.metric}`;
		const now = Date.now();
		const alertHistory = alertCache.get(rateLimitKey) || {
			count: 0,
			lastAlert: 0,
		};
		if (now - alertHistory.lastAlert > 3600000) {
			alertHistory.count = 0;
		}
		const minutesSinceLastAlert = (now - alertHistory.lastAlert) / 60000;
		if (
			minutesSinceLastAlert < 1 &&
			alertHistory.count >= ALERT_CONFIG.RATE_LIMIT.MAX_ALERTS_PER_MINUTE
		) {
			return NextResponse.json({
				success: false,
				error: 'Rate limit exceeded',
				retryAfter: 60 - Math.floor(minutesSinceLastAlert),
			});
		}
		alertCache.set(rateLimitKey, {
			count: alertHistory.count + 1,
			lastAlert: now,
		});
		const enrichedAlert = {
			...alert,
			severity,
			clientIP,
			country,
			detectedAt: new Date().toISOString(),
			alertId: generateAlertId(alert),
		};
		await processAlert(enrichedAlert, correlationId, performanceContext);
		if (process.env.NODE_ENV === 'development') {
			const alertLog = {
				alertId: enrichedAlert.alertId,
				metric: alert.metric,
				value: alert.value,
				severity,
				url: alert.url,
			};
		}
		return NextResponse.json({
			success: true,
			alertId: enrichedAlert.alertId,
			severity,
			processed: true,
			timestamp: Date.now(),
		});
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('[Performance Alert API] Error:', error);
		}
		return NextResponse.json(
			{
				error: 'Failed to process performance alert',
			},
			{
				status: 500,
			},
		);
	}
}
export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const severity = url.searchParams.get('severity') as AlertSeverity | null;
		const timeRange = url.searchParams.get('timeRange') || '24h';
		const limit = parseInt(url.searchParams.get('limit') || '50');
		const mockAlerts = generateMockAlertHistory(severity, timeRange, limit);
		return NextResponse.json({
			alerts: mockAlerts,
			total: mockAlerts.length,
			timeRange,
			severity,
			timestamp: Date.now(),
		});
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('[Performance Alert API] Error retrieving alerts:', error);
		}
		return NextResponse.json(
			{
				error: 'Failed to retrieve alerts',
			},
			{
				status: 500,
			},
		);
	}
}
function determineAlertSeverity(alert: PerformanceAlert): AlertSeverity {
	const { metric, value, rating } = alert;
	if (rating === 'poor') {
		const threshold =
			ALERT_CONFIG.CRITICAL_THRESHOLDS[
				metric as keyof typeof ALERT_CONFIG.CRITICAL_THRESHOLDS
			];
		if (threshold && value > threshold) {
			return AlertSeverity.CRITICAL;
		}
		return AlertSeverity.HIGH;
	}
	if (rating === 'needs-improvement') {
		return AlertSeverity.MEDIUM;
	}
	return AlertSeverity.LOW;
}
async function processAlert(
	alert: PerformanceAlert & {
		severity: AlertSeverity;
		alertId: string;
	},
	correlationId: string,
	context: any,
) {
	try {
		const alertEvent = {
			type: 'performance_alert',
			correlationId,
			requestId: alert.alertId,
			timestamp: Date.now(),
			alert: {
				metric: alert.metric,
				value: alert.value,
				threshold: alert.threshold,
				severity: alert.severity.toLowerCase(),
				url: alert.url,
				sessionId: alert.sessionId,
				userAgent: alert.userAgent,
				ip: context?.ip || 'unknown',
				country: context?.country || 'unknown',
			},
			context: {
				userType: determineUserType(alert.userAgent, context),
				pageType: extractPageType(alert.url),
				deviceType: extractDeviceType(alert.userAgent),
			},
		};
		const edgeResponse = await fetch('/api/performance/alerts/process', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Correlation-ID': correlationId,
				'X-Request-ID': alert.alertId,
			},
			body: JSON.stringify(alertEvent),
		});
		if (!edgeResponse.ok) {
			console.error(
				'Edge Function processing failed, falling back to legacy processing',
			);
			return legacyProcessAlert(alert);
		}
		const result = await edgeResponse.json();
		return result;
	} catch (error) {
		console.error('Event-driven processing failed, using fallback:', error);
		return legacyProcessAlert(alert);
	}
}
async function legacyProcessAlert(
	alert: PerformanceAlert & {
		severity: AlertSeverity;
		alertId: string;
	},
) {
	const { severity } = alert;
	if (severity === AlertSeverity.CRITICAL) {
		await Promise.allSettled([
			sendEmailAlert(alert),
			sendSlackAlert(alert),
			sendTeamsAlert(alert),
		]);
	} else if (severity === AlertSeverity.HIGH) {
		await Promise.allSettled([sendSlackAlert(alert), sendTeamsAlert(alert)]);
	} else {
		await logAlertForAnalysis(alert);
	}
	await storeAlert(alert);
}
async function sendEmailAlert(
	alert: PerformanceAlert & {
		severity: AlertSeverity;
		alertId: string;
	},
) {
	try {
		if (process.env.RESEND_API_KEY) {
			const emailPayload = {
				to: ALERT_CONFIG.CHANNELS.EMAIL,
				subject: `🚨 Critical Performance Alert - ${alert.metric}`,
				html: generateEmailTemplate(alert),
			};
			if (process.env.NODE_ENV === 'development') {
			}
		}
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('[Email Alert] Failed to send:', error);
		}
	}
}
async function sendSlackAlert(
	alert: PerformanceAlert & {
		severity: AlertSeverity;
		alertId: string;
	},
) {
	try {
		if (ALERT_CONFIG.CHANNELS.SLACK_WEBHOOK) {
			const slackPayload = {
				text: `Performance Alert: ${alert.metric}`,
				attachments: [
					{
						color: getAlertColor(alert.severity),
						fields: [
							{
								title: 'Metric',
								value: alert.metric,
								short: true,
							},
							{
								title: 'Value',
								value: `${alert.value}${getMetricUnit(alert.metric)}`,
								short: true,
							},
							{
								title: 'Severity',
								value: alert.severity.toUpperCase(),
								short: true,
							},
							{
								title: 'URL',
								value: alert.url,
								short: false,
							},
							{
								title: 'Session',
								value: alert.sessionId,
								short: true,
							},
							{
								title: 'Alert ID',
								value: alert.alertId,
								short: true,
							},
						],
						ts: Math.floor(alert.timestamp / 1000),
					},
				],
			};
			await fetch(ALERT_CONFIG.CHANNELS.SLACK_WEBHOOK, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(slackPayload),
			});
			if (process.env.NODE_ENV === 'development') {
			}
		}
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('[Slack Alert] Failed to send:', error);
		}
	}
}
async function sendTeamsAlert(
	alert: PerformanceAlert & {
		severity: AlertSeverity;
		alertId: string;
	},
) {
	try {
		if (ALERT_CONFIG.CHANNELS.TEAMS_WEBHOOK) {
			const teamsPayload = {
				'@type': 'MessageCard',
				'@context': 'https://schema.org/extensions',
				summary: `Performance Alert: ${alert.metric}`,
				themeColor: getAlertColor(alert.severity),
				sections: [
					{
						activityTitle: `🚨 Performance Alert - ${alert.severity.toUpperCase()}`,
						activitySubtitle: `${alert.metric} performance issue detected`,
						facts: [
							{
								name: 'Metric',
								value: alert.metric,
							},
							{
								name: 'Value',
								value: `${alert.value}${getMetricUnit(alert.metric)}`,
							},
							{
								name: 'URL',
								value: alert.url,
							},
							{
								name: 'Session ID',
								value: alert.sessionId,
							},
							{
								name: 'Alert ID',
								value: alert.alertId,
							},
							{
								name: 'Timestamp',
								value: new Date(alert.timestamp).toISOString(),
							},
						],
					},
				],
			};
			await fetch(ALERT_CONFIG.CHANNELS.TEAMS_WEBHOOK, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(teamsPayload),
			});
			if (process.env.NODE_ENV === 'development') {
			}
		}
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('[Teams Alert] Failed to send:', error);
		}
	}
}
async function logAlertForAnalysis(
	alert: PerformanceAlert & {
		severity: AlertSeverity;
		alertId: string;
	},
) {
	if (process.env.NODE_ENV === 'development') {
		const logData = {
			alertId: alert.alertId,
			metric: alert.metric,
			value: alert.value,
			severity: alert.severity,
			timestamp: alert.timestamp,
		};
	}
}
async function storeAlert(
	alert: PerformanceAlert & {
		severity: AlertSeverity;
		alertId: string;
	},
) {
	if (process.env.NODE_ENV === 'development') {
	}
}
function generateAlertId(alert: PerformanceAlert): string {
	const timestamp = Date.now();
	const hash = Buffer.from(`${alert.sessionId}-${alert.metric}-${timestamp}`)
		.toString('base64')
		.slice(0, 8);
	return `alert_${timestamp}_${hash}`;
}
function getAlertColor(severity: AlertSeverity): string {
	const colors = {
		[AlertSeverity.CRITICAL]: '#DC2626',
		[AlertSeverity.HIGH]: '#EA580C',
		[AlertSeverity.MEDIUM]: '#CA8A04',
		[AlertSeverity.LOW]: '#16A34A',
	};
	return colors[severity];
}
function getMetricUnit(metric: string): string {
	if (metric === 'CLS') return '';
	return 'ms';
}
function generateEmailTemplate(
	alert: PerformanceAlert & {
		severity: AlertSeverity;
		alertId: string;
	},
): string {
	return `
    <h2>🚨 Critical Performance Alert</h2>
    <p><strong>My Private Tutor Online</strong> has detected a performance issue that requires immediate attention.</p>
    
    <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Alert ID:</td><td style="padding: 8px; border: 1px solid #ddd;">${alert.alertId}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Metric:</td><td style="padding: 8px; border: 1px solid #ddd;">${alert.metric}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Value:</td><td style="padding: 8px; border: 1px solid #ddd;">${alert.value}${getMetricUnit(alert.metric)}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Threshold:</td><td style="padding: 8px; border: 1px solid #ddd;">${alert.threshold}${getMetricUnit(alert.metric)}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Severity:</td><td style="padding: 8px; border: 1px solid #ddd; color: ${getAlertColor(alert.severity)};">${alert.severity.toUpperCase()}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">URL:</td><td style="padding: 8px; border: 1px solid #ddd;"><a href="${alert.url}">${alert.url}</a></td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Time:</td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(alert.timestamp).toISOString()}</td></tr>
    </table>
    
    <p><strong>Impact:</strong> This performance issue may affect the premium user experience expected by our royal clients.</p>
    <p><strong>Action Required:</strong> Please investigate and resolve this issue promptly to maintain service quality.</p>
  `;
}
function generateMockAlertHistory(
	severity: AlertSeverity | null,
	timeRange: string,
	limit: number,
) {
	return Array.from(
		{
			length: Math.min(limit, 10),
		},
		(_, i) => ({
			alertId: `alert_${Date.now() - i * 3600000}_mock${i}`,
			metric: ['LCP', 'INP', 'CLS', 'FCP', 'TTFB'][i % 5],
			value: 2000 + Math.random() * 3000,
			severity:
				severity ||
				['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
			timestamp: Date.now() - i * 3600000,
			resolved: Math.random() > 0.7,
		}),
	);
}
