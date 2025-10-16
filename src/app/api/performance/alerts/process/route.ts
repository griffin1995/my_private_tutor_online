import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
export const runtime = 'edge';
const AlertEventSchema = z.object({
	type: z.literal('performance_alert'),
	correlationId: z.string(),
	requestId: z.string(),
	timestamp: z.number(),
	alert: z.object({
		metric: z.string(),
		value: z.number(),
		threshold: z.number(),
		severity: z.enum(['low', 'medium', 'high', 'critical']),
		url: z.string().url(),
		sessionId: z.string(),
		userAgent: z.string(),
		ip: z.string(),
		country: z.string(),
	}),
	context: z.object({
		userType: z.enum(['premium', 'standard', 'royal']),
		pageType: z.string(),
		deviceType: z.enum(['mobile', 'desktop', 'tablet']),
	}),
});
interface AlertEvent {
	type: 'performance_alert';
	correlationId: string;
	requestId: string;
	timestamp: number;
	alert: {
		metric: string;
		value: number;
		threshold: number;
		severity: 'low' | 'medium' | 'high' | 'critical';
		url: string;
		sessionId: string;
		userAgent: string;
		ip: string;
		country: string;
	};
	context: {
		userType: 'premium' | 'standard' | 'royal';
		pageType: string;
		deviceType: 'mobile' | 'desktop' | 'tablet';
	};
}
enum AlertPriority {
	CRITICAL = 1,
	HIGH = 2,
	MEDIUM = 3,
	LOW = 4,
}
const ALERT_CHANNELS = {
	SLACK: process.env.SLACK_PERFORMANCE_WEBHOOK,
	TEAMS: process.env.TEAMS_PERFORMANCE_WEBHOOK,
	EMAIL: process.env.ALERT_EMAIL || 'performance@myprivatetutoronline.com',
};
export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const correlationId = request.headers.get('x-correlation-id') || 'unknown';
		const requestId = request.headers.get('x-request-id') || correlationId;
		const body = await request.json();
		const validationResult = AlertEventSchema.safeParse(body);
		if (!validationResult.success) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid alert event payload',
					validation_errors: validationResult.error.issues,
					correlationId,
				},
				{
					status: 400,
				},
			);
		}
		const alertEvent: AlertEvent = validationResult.data;
		const priority = determineAlertPriority(alertEvent);
		const processingResult = await processAlert(alertEvent, priority, {
			correlationId,
			requestId,
			timestamp: Date.now(),
		});
		if (
			alertEvent.context.userType === 'royal' &&
			alertEvent.alert.severity === 'critical'
		) {
			await escalateRoyalClientAlert(alertEvent, correlationId);
		}
		const response = NextResponse.json({
			success: true,
			alertId: `alert_${requestId}`,
			priority: AlertPriority[priority],
			processed: processingResult.channelsNotified,
			correlationId,
			requestId,
			timestamp: Date.now(),
		});
		response.headers.set('X-Processed-By', 'edge-function');
		response.headers.set('X-Processing-Location', 'edge');
		response.headers.set('X-Correlation-ID', correlationId);
		response.headers.set('X-Request-ID', requestId);
		return response;
	} catch (error) {
		console.error('Edge alert processing error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Alert processing failed',
				correlationId: request.headers.get('x-correlation-id') || 'unknown',
				timestamp: Date.now(),
			},
			{
				status: 500,
			},
		);
	}
}
function determineAlertPriority(alertEvent: AlertEvent): AlertPriority {
	const { severity } = alertEvent.alert;
	const { userType } = alertEvent.context;
	if (userType === 'royal') {
		return severity === 'critical' ? AlertPriority.CRITICAL : AlertPriority.HIGH;
	}
	if (userType === 'premium') {
		switch (severity) {
			case 'critical':
				return AlertPriority.CRITICAL;
			case 'high':
				return AlertPriority.HIGH;
			case 'medium':
				return AlertPriority.MEDIUM;
			default:
				return AlertPriority.LOW;
		}
	}
	switch (severity) {
		case 'critical':
			return AlertPriority.HIGH;
		case 'high':
			return AlertPriority.MEDIUM;
		case 'medium':
			return AlertPriority.LOW;
		default:
			return AlertPriority.LOW;
	}
}
async function processAlert(
	alertEvent: AlertEvent,
	priority: AlertPriority,
	context: {
		correlationId: string;
		requestId: string;
		timestamp: number;
	},
): Promise<{
	channelsNotified: number;
	channels: string[];
}> {
	const notifications: Promise<boolean>[] = [];
	const channels: string[] = [];
	const shouldNotifySlack = priority <= AlertPriority.HIGH;
	const shouldNotifyTeams = priority <= AlertPriority.MEDIUM;
	const shouldNotifyEmail = priority <= AlertPriority.LOW;
	if (shouldNotifySlack && ALERT_CHANNELS.SLACK) {
		notifications.push(notifySlack(alertEvent, context));
		channels.push('slack');
	}
	if (shouldNotifyTeams && ALERT_CHANNELS.TEAMS) {
		notifications.push(notifyTeams(alertEvent, context));
		channels.push('teams');
	}
	if (shouldNotifyEmail) {
		notifications.push(notifyEmail(alertEvent, context));
		channels.push('email');
	}
	const results = await Promise.allSettled(notifications);
	const successfulNotifications = results.filter(
		(r) => r.status === 'fulfilled' && r.value,
	).length;
	return {
		channelsNotified: successfulNotifications,
		channels,
	};
}
async function notifySlack(
	alertEvent: AlertEvent,
	context: {
		correlationId: string;
		requestId: string;
		timestamp: number;
	},
): Promise<boolean> {
	try {
		if (!ALERT_CHANNELS.SLACK) return false;
		const slackPayload = {
			text: `🚨 Performance Alert - ${alertEvent.alert.severity.toUpperCase()}`,
			blocks: [
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: `*Performance Alert*\n*Metric:* ${alertEvent.alert.metric}\n*Value:* ${alertEvent.alert.value}\n*Threshold:* ${alertEvent.alert.threshold}\n*URL:* ${alertEvent.alert.url}`,
					},
				},
				{
					type: 'context',
					elements: [
						{
							type: 'mrkdwn',
							text: `Correlation: ${context.correlationId} | User Type: ${alertEvent.context.userType} | ${new Date().toISOString()}`,
						},
					],
				},
			],
		};
		const response = await fetch(ALERT_CHANNELS.SLACK, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(slackPayload),
		});
		return response.ok;
	} catch (error) {
		console.error('Slack notification failed:', error);
		return false;
	}
}
async function notifyTeams(
	alertEvent: AlertEvent,
	context: {
		correlationId: string;
		requestId: string;
		timestamp: number;
	},
): Promise<boolean> {
	try {
		if (!ALERT_CHANNELS.TEAMS) return false;
		const teamsPayload = {
			'@type': 'MessageCard',
			'@context': 'https://schema.org/extensions',
			summary: `Performance Alert - ${alertEvent.alert.severity.toUpperCase()}`,
			themeColor: alertEvent.alert.severity === 'critical' ? 'FF0000' : 'FFA500',
			sections: [
				{
					activityTitle: 'Performance Alert Triggered',
					activitySubtitle: `Metric: ${alertEvent.alert.metric}`,
					facts: [
						{
							name: 'Value',
							value: alertEvent.alert.value.toString(),
						},
						{
							name: 'Threshold',
							value: alertEvent.alert.threshold.toString(),
						},
						{
							name: 'URL',
							value: alertEvent.alert.url,
						},
						{
							name: 'User Type',
							value: alertEvent.context.userType,
						},
						{
							name: 'Correlation ID',
							value: context.correlationId,
						},
					],
				},
			],
		};
		const response = await fetch(ALERT_CHANNELS.TEAMS, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(teamsPayload),
		});
		return response.ok;
	} catch (error) {
		console.error('Teams notification failed:', error);
		return false;
	}
}
async function notifyEmail(
	alertEvent: AlertEvent,
	context: {
		correlationId: string;
		requestId: string;
		timestamp: number;
	},
): Promise<boolean> {
	console.log(`Email notification queued for ${ALERT_CHANNELS.EMAIL}:`, {
		subject: `Performance Alert - ${alertEvent.alert.severity.toUpperCase()}`,
		correlationId: context.correlationId,
		metric: alertEvent.alert.metric,
		value: alertEvent.alert.value,
	});
	return true;
}
async function escalateRoyalClientAlert(
	alertEvent: AlertEvent,
	correlationId: string,
): Promise<void> {
	console.warn(`🚨 ROYAL CLIENT CRITICAL ALERT 🚨`, {
		correlationId,
		metric: alertEvent.alert.metric,
		value: alertEvent.alert.value,
		url: alertEvent.alert.url,
		timestamp: new Date().toISOString(),
	});
}
