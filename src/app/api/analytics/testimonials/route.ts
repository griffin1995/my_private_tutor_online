import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
interface AnalyticsEvent {
	testimonialId: string;
	eventType: 'view' | 'interaction' | 'conversion';
	placement: 'hero' | 'grid' | 'carousel' | 'cta' | 'modal';
	userSegment?: string;
	deviceType: 'mobile' | 'tablet' | 'desktop';
	interactionType?: string;
	conversionType?: string;
	value?: number;
	metadata: Record<string, any>;
	timestamp: number;
	sessionId: string;
	userId?: string;
}
interface AnalyticsBatch {
	events: AnalyticsEvent[];
	session: {
		sessionId: string;
		duration: number;
		pageViews: number;
		timestamp: number;
	};
	client: {
		userAgent: string;
		referrer: string;
		page: string;
		ip: string;
	};
}
interface ProcessedAnalytics {
	testimonialId: string;
	totalViews: number;
	totalInteractions: number;
	totalConversions: number;
	conversionRate: number;
	engagementScore: number;
	averageTimeOnElement: number;
	lastUpdated: Date;
}
function validateAnalyticsEvent(event: any): event is AnalyticsEvent {
	return (
		typeof event.testimonialId === 'string' &&
		['view', 'interaction', 'conversion'].includes(event.eventType) &&
		['hero', 'grid', 'carousel', 'cta', 'modal'].includes(event.placement) &&
		typeof event.timestamp === 'number' &&
		typeof event.sessionId === 'string'
	);
}
function validateAnalyticsBatch(batch: any): batch is AnalyticsBatch {
	return (
		Array.isArray(batch.events) &&
		batch.events.every(validateAnalyticsEvent) &&
		typeof batch.session === 'object' &&
		typeof batch.client === 'object'
	);
}
class AnalyticsProcessor {
	private static instance: AnalyticsProcessor;
	private cache: Map<string, ProcessedAnalytics> = new Map();
	private lastProcessed: number = 0;
	static getInstance(): AnalyticsProcessor {
		if (!AnalyticsProcessor.instance) {
			AnalyticsProcessor.instance = new AnalyticsProcessor();
		}
		return AnalyticsProcessor.instance;
	}
	async processBatch(batch: AnalyticsBatch): Promise<void> {
		const testimonialMetrics = new Map<
			string,
			{
				views: number;
				interactions: number;
				conversions: number;
				totalTimeOnElement: number;
				eventCount: number;
			}
		>();
		for (const event of batch.events) {
			const existing = testimonialMetrics.get(event.testimonialId) || {
				views: 0,
				interactions: 0,
				conversions: 0,
				totalTimeOnElement: 0,
				eventCount: 0,
			};
			switch (event.eventType) {
				case 'view':
					existing.views += 1;
					break;
				case 'interaction':
					existing.interactions += 1;
					if (event.value) {
						existing.totalTimeOnElement += event.value;
					}
					break;
				case 'conversion':
					existing.conversions += 1;
					break;
			}
			existing.eventCount += 1;
			testimonialMetrics.set(event.testimonialId, existing);
		}
		for (const [testimonialId, metrics] of testimonialMetrics) {
			const processed = this.cache.get(testimonialId) || {
				testimonialId,
				totalViews: 0,
				totalInteractions: 0,
				totalConversions: 0,
				conversionRate: 0,
				engagementScore: 0,
				averageTimeOnElement: 0,
				lastUpdated: new Date(),
			};
			processed.totalViews += metrics.views;
			processed.totalInteractions += metrics.interactions;
			processed.totalConversions += metrics.conversions;
			processed.conversionRate =
				processed.totalViews > 0 ?
					processed.totalConversions / processed.totalViews
				:	0;
			processed.averageTimeOnElement =
				metrics.eventCount > 0 ?
					metrics.totalTimeOnElement / metrics.eventCount
				:	processed.averageTimeOnElement;
			processed.engagementScore = this.calculateEngagementScore(processed);
			processed.lastUpdated = new Date();
			this.cache.set(testimonialId, processed);
		}
		this.lastProcessed = Date.now();
	}
	private calculateEngagementScore(processed: ProcessedAnalytics): number {
		const interactionRate =
			processed.totalViews > 0 ?
				processed.totalInteractions / processed.totalViews
			:	0;
		const conversionWeight = processed.conversionRate * 100;
		const timeWeight = Math.min(processed.averageTimeOnElement / 30000, 1);
		const volumeWeight = Math.min(processed.totalViews / 1000, 1);
		return Math.round(
			interactionRate * 25 +
				conversionWeight * 40 +
				timeWeight * 20 +
				volumeWeight * 15,
		);
	}
	getProcessedAnalytics(
		testimonialId?: string,
	): ProcessedAnalytics | ProcessedAnalytics[] {
		if (testimonialId) {
			return (
				this.cache.get(testimonialId) || {
					testimonialId,
					totalViews: 0,
					totalInteractions: 0,
					totalConversions: 0,
					conversionRate: 0,
					engagementScore: 0,
					averageTimeOnElement: 0,
					lastUpdated: new Date(),
				}
			);
		}
		return Array.from(this.cache.values());
	}
	getTopPerformers(limit: number = 10): ProcessedAnalytics[] {
		return Array.from(this.cache.values())
			.sort((a, b) => b.engagementScore - a.engagementScore)
			.slice(0, limit);
	}
	getPerformanceMetrics(): {
		totalTestimonials: number;
		totalViews: number;
		totalConversions: number;
		averageConversionRate: number;
		averageEngagementScore: number;
	} {
		const analytics = Array.from(this.cache.values());
		return {
			totalTestimonials: analytics.length,
			totalViews: analytics.reduce((sum, a) => sum + a.totalViews, 0),
			totalConversions: analytics.reduce((sum, a) => sum + a.totalConversions, 0),
			averageConversionRate:
				analytics.length > 0 ?
					analytics.reduce((sum, a) => sum + a.conversionRate, 0) / analytics.length
				:	0,
			averageEngagementScore:
				analytics.length > 0 ?
					analytics.reduce((sum, a) => sum + a.engagementScore, 0) / analytics.length
				:	0,
		};
	}
	clearCache(): void {
		this.cache.clear();
	}
}
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		if (!validateAnalyticsBatch(body)) {
			return NextResponse.json(
				{
					error: 'Invalid analytics batch format',
				},
				{
					status: 400,
				},
			);
		}
		const headersList = await headers();
		const userAgent = headersList.get('user-agent') || '';
		const forwardedFor = headersList.get('x-forwarded-for') || '';
		const clientIP = forwardedFor.split(',')[0] || 'unknown';
		const processor = AnalyticsProcessor.getInstance();
		await processor.processBatch({
			...body,
			client: {
				...body.client,
				ip: clientIP,
				userAgent,
			},
		});
		const metrics = processor.getPerformanceMetrics();
		return NextResponse.json({
			success: true,
			processed: body.events.length,
			timestamp: new Date().toISOString(),
			metrics,
		});
	} catch (error) {
		console.error('Analytics processing error:', error);
		return NextResponse.json(
			{
				error: 'Failed to process analytics data',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{
				status: 500,
			},
		);
	}
}
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const testimonialId = searchParams.get('testimonialId');
		const format = searchParams.get('format') || 'detailed';
		const limit = parseInt(searchParams.get('limit') || '10');
		const processor = AnalyticsProcessor.getInstance();
		if (testimonialId) {
			const analytics = processor.getProcessedAnalytics(testimonialId);
			return NextResponse.json({
				testimonial: analytics,
				timestamp: new Date().toISOString(),
			});
		}
		switch (format) {
			case 'summary':
				const metrics = processor.getPerformanceMetrics();
				return NextResponse.json({
					summary: metrics,
					timestamp: new Date().toISOString(),
				});
			case 'top-performers':
				const topPerformers = processor.getTopPerformers(limit);
				return NextResponse.json({
					topPerformers,
					count: topPerformers.length,
					timestamp: new Date().toISOString(),
				});
			case 'detailed':
			default:
				const allAnalytics =
					processor.getProcessedAnalytics() as ProcessedAnalytics[];
				return NextResponse.json({
					analytics: allAnalytics,
					count: allAnalytics.length,
					summary: processor.getPerformanceMetrics(),
					timestamp: new Date().toISOString(),
				});
		}
	} catch (error) {
		console.error('Analytics retrieval error:', error);
		return NextResponse.json(
			{
				error: 'Failed to retrieve analytics data',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{
				status: 500,
			},
		);
	}
}
export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const action = searchParams.get('action');
		if (action !== 'clear-cache') {
			return NextResponse.json(
				{
					error: 'Invalid action. Use action=clear-cache',
				},
				{
					status: 400,
				},
			);
		}
		const processor = AnalyticsProcessor.getInstance();
		processor.clearCache();
		return NextResponse.json({
			success: true,
			message: 'Analytics cache cleared',
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error('Analytics management error:', error);
		return NextResponse.json(
			{
				error: 'Failed to manage analytics data',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{
				status: 500,
			},
		);
	}
}
