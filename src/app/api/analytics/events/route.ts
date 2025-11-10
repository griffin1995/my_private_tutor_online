import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
interface BusinessAnalyticsEvent {
	event: string;
	category: 'engagement' | 'conversion' | 'navigation' | 'error' | 'performance';
	action: string;
	label?: string;
	value?: number;
	metadata?: Record<string, string | number | boolean>;
	timestamp: number;
	sessionId: string;
	pageUrl: string;
	userId?: string;
}
interface SessionSummary {
	sessionId: string;
	duration: number;
	pageViews: number;
	eventCount: number;
	events: BusinessAnalyticsEvent[];
}
interface AnalyticsPayload {
	events: BusinessAnalyticsEvent[];
	session: SessionSummary;
	timestamp: number;
}
const EVENT_CONFIG = {
	CONVERSION_EVENTS: [
		'inquiry_form_submit',
		'inquiry_form_success',
		'bootcamp_register_complete',
		'phone_call_click',
		'email_click',
	],
	ENGAGEMENT_WEIGHTS: {
		page_view: 1,
		section_view: 2,
		service_tier_view: 3,
		video_play: 5,
		video_complete: 10,
		testimonial_view: 3,
		royal_endorsement_view: 4,
		inquiry_form_start: 8,
		inquiry_form_submit: 15,
		bootcamp_register_complete: 20,
	},
	QUALITY_THRESHOLDS: {
		MIN_SESSION_DURATION: 30 * 1000,
		MIN_PAGE_VIEWS: 2,
		MIN_ENGAGEMENT_EVENTS: 3,
		HIGH_VALUE_DURATION: 5 * 60 * 1000,
	},
} as const;
export async function POST(request: NextRequest) {
	try {
		const payload: AnalyticsPayload = await request.json();
		if (!payload.events || !payload.session || !payload.timestamp) {
			return NextResponse.json(
				{
					error: 'Missing required fields: events, session, timestamp',
				},
				{
					status: 400,
				},
			);
		}
		const headersList = await headers();
		const forwardedFor = headersList.get('x-forwarded-for');
		const clientIP =
			forwardedFor ? forwardedFor.split(',')[0]?.trim() || 'unknown' : 'unknown';
		const country = headersList.get('x-vercel-ip-country') || 'unknown';
		const userAgent = headersList.get('user-agent') || 'unknown';
		const processedEvents = payload.events.map((event) => ({
			...event,
			clientIP,
			country,
			userAgent,
			processingTimestamp: Date.now(),
		}));
		const sessionAnalysis = analyzeSession(payload.session, processedEvents);
		const businessInsights = extractBusinessInsights(processedEvents);
		if (process.env.NODE_ENV === 'development') {
			console.log('[Business Analytics]', {
				sessionId: payload.session.sessionId,
				eventCount: payload.events.length,
				sessionDuration: payload.session.duration,
				analysis: sessionAnalysis,
				insights: businessInsights,
			});
		}
		await Promise.allSettled([
			sendToAnalyticsServices(processedEvents, sessionAnalysis),
			updateConversionTracking(processedEvents),
			updateEngagementScoring(payload.session, processedEvents),
		]);
		return NextResponse.json({
			success: true,
			processed: {
				events: payload.events.length,
				sessionId: payload.session.sessionId,
			},
			analysis: sessionAnalysis,
			insights: businessInsights,
			timestamp: Date.now(),
		});
	} catch (error) {
		console.error('[Analytics API] Error processing events:', error);
		return NextResponse.json(
			{
				error: 'Failed to process analytics events',
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
		const sessionId = url.searchParams.get('sessionId');
		const timeRange = url.searchParams.get('timeRange') || '24h';
		const metric = url.searchParams.get('metric') || 'all';
		const mockData: {
			timeRange: string;
			metric: string;
			conversions: {
				inquiries: { count: number; rate: number; trend: string };
				bootcamp_registrations: { count: number; rate: number; trend: string };
				phone_calls: { count: number; rate: number; trend: string };
			};
			engagement: {
				avgSessionDuration: number;
				avgPageViews: number;
				bounceRate: number;
				returnVisitorRate: number;
			};
			topPages: Array<{ page: string; views: number; conversionRate: number }>;
			performance: {
				avgLoadTime: number;
				coreWebVitalsScore: number;
				userSatisfactionIndex: number;
			};
			timestamp: number;
			sessionId?: string;
		} = {
			timeRange,
			metric,
			conversions: {
				inquiries: {
					count: 23,
					rate: 0.12,
					trend: '+15%',
				},
				bootcamp_registrations: {
					count: 8,
					rate: 0.04,
					trend: '+8%',
				},
				phone_calls: {
					count: 15,
					rate: 0.08,
					trend: '+22%',
				},
			},
			engagement: {
				avgSessionDuration: 4.2 * 60 * 1000,
				avgPageViews: 3.8,
				bounceRate: 0.35,
				returnVisitorRate: 0.28,
			},
			topPages: [
				{
					page: '/',
					views: 1250,
					conversionRate: 0.15,
				},
				{
					page: '/services',
					views: 890,
					conversionRate: 0.22,
				},
				{
					page: '/bootcamps',
					views: 456,
					conversionRate: 0.18,
				},
				{
					page: '/about',
					views: 378,
					conversionRate: 0.05,
				},
			],
			performance: {
				avgLoadTime: 1.2,
				coreWebVitalsScore: 95,
				userSatisfactionIndex: 0.88,
			},
			timestamp: Date.now(),
		};
		if (sessionId) {
			mockData.sessionId = sessionId;
		}
		return NextResponse.json(mockData);
	} catch (error) {
		console.error('[Analytics API] Error retrieving insights:', error);
		return NextResponse.json(
			{
				error: 'Failed to retrieve analytics insights',
			},
			{
				status: 500,
			},
		);
	}
}
function analyzeSession(session: SessionSummary, events: any[]) {
	const { duration, pageViews } = session;
	const analysis = {
		quality: 'low' as 'low' | 'medium' | 'high',
		engagementScore: 0,
		conversionPotential: 'low' as 'low' | 'medium' | 'high',
		behaviorPattern: 'explorer' as
			| 'explorer'
			| 'researcher'
			| 'converter'
			| 'bouncer',
		insights: [] as string[],
	};
	let engagementScore = 0;
	events.forEach((event) => {
		const weight =
			EVENT_CONFIG.ENGAGEMENT_WEIGHTS[
				event.event as keyof typeof EVENT_CONFIG.ENGAGEMENT_WEIGHTS
			] || 1;
		engagementScore += weight;
	});
	analysis.engagementScore = engagementScore;
	if (duration >= EVENT_CONFIG.QUALITY_THRESHOLDS.HIGH_VALUE_DURATION) {
		analysis.quality = 'high';
		analysis.insights.push('High-value session with extended engagement');
	} else if (
		duration >= EVENT_CONFIG.QUALITY_THRESHOLDS.MIN_SESSION_DURATION &&
		pageViews >= EVENT_CONFIG.QUALITY_THRESHOLDS.MIN_PAGE_VIEWS
	) {
		analysis.quality = 'medium';
	} else {
		analysis.quality = 'low';
		if (duration < EVENT_CONFIG.QUALITY_THRESHOLDS.MIN_SESSION_DURATION) {
			analysis.insights.push('Short session duration may indicate bounce');
		}
	}
	const conversionEvents = events.filter((e) =>
		EVENT_CONFIG.CONVERSION_EVENTS.includes(e.event),
	);
	if (conversionEvents.length > 0) {
		analysis.conversionPotential = 'high';
		analysis.insights.push('Session includes conversion events');
	} else if (engagementScore > 20) {
		analysis.conversionPotential = 'medium';
		analysis.insights.push('High engagement suggests conversion potential');
	}
	if (conversionEvents.length > 0) {
		analysis.behaviorPattern = 'converter';
	} else if (
		pageViews > 4 &&
		events.filter((e) => e.category === 'engagement').length > 5
	) {
		analysis.behaviorPattern = 'researcher';
	} else if (pageViews > 2) {
		analysis.behaviorPattern = 'explorer';
	} else {
		analysis.behaviorPattern = 'bouncer';
	}
	return analysis;
}
function extractBusinessInsights(events: any[]) {
	const insights = {
		popularServices: {} as Record<string, number>,
		conversionFunnel: {
			awareness: 0,
			interest: 0,
			consideration: 0,
			intent: 0,
			purchase: 0,
		},
		errorPatterns: [] as string[],
		deviceInsights: [] as string[],
	};
	events.forEach((event) => {
		if (event.event === 'service_tier_view' && event.metadata?.tier) {
			const tier = event.metadata.tier as string;
			insights.popularServices[tier] = (insights.popularServices[tier] || 0) + 1;
		}
		switch (event.event) {
			case 'page_view':
				insights.conversionFunnel.awareness++;
				break;
			case 'service_tier_view':
			case 'testimonial_view':
				insights.conversionFunnel.interest++;
				break;
			case 'video_play':
			case 'bootcamp_view':
				insights.conversionFunnel.consideration++;
				break;
			case 'inquiry_form_start':
				insights.conversionFunnel.intent++;
				break;
			case 'inquiry_form_submit':
			case 'bootcamp_register_complete':
				insights.conversionFunnel.purchase++;
				break;
		}
		if (event.category === 'error') {
			insights.errorPatterns.push(event.event);
		}
	});
	return insights;
}
async function sendToAnalyticsServices(events: any[], sessionAnalysis: any) {
	try {
		if (process.env['ANALYTICS_WEBHOOK_URL']) {
			await fetch(process.env['ANALYTICS_WEBHOOK_URL'], {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env['ANALYTICS_API_KEY']}`,
				},
				body: JSON.stringify({
					service: 'my-private-tutor-online',
					environment: process.env.NODE_ENV,
					events,
					analysis: sessionAnalysis,
					timestamp: Date.now(),
				}),
			});
		}
	} catch (error) {
		console.error('[Analytics] Failed to send to external service:', error);
	}
}
async function updateConversionTracking(events: any[]) {
	const conversions = events.filter((e) =>
		EVENT_CONFIG.CONVERSION_EVENTS.includes(e.event),
	);
	if (conversions.length > 0) {
		console.log('[Conversion Tracking] New conversions:', conversions.length);
	}
}
async function updateEngagementScoring(session: SessionSummary, events: any[]) {
	let totalScore = 0;
	events.forEach((event) => {
		const weight =
			EVENT_CONFIG.ENGAGEMENT_WEIGHTS[
				event.event as keyof typeof EVENT_CONFIG.ENGAGEMENT_WEIGHTS
			] || 1;
		totalScore += weight;
	});
	const durationBonus = Math.min(session.duration / (5 * 60 * 1000), 1) * 10;
	totalScore += durationBonus;
	console.log('[Engagement Scoring] Session score:', Math.round(totalScore));
}
export async function OPTIONS(_request: NextRequest) {
	return new NextResponse(null, {
		status: 200,
		headers: {
			// CORS handled by middleware,
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	});
}
