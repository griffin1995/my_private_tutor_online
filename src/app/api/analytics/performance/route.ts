import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
const PerformanceMetricSchema = z.object({
	id: z.string(),
	name: z.string(),
	value: z.number(),
	rating: z.enum(['good', 'needs-improvement', 'poor']),
	delta: z.number(),
	entries: z.array(z.any()),
	timestamp: z.number(),
	url: z.string().url(),
	userAgent: z.string(),
	connectionType: z.string().optional(),
	effectiveType: z.string().optional(),
	faqComponent: z.string().optional(),
	userType: z.enum(['royal', 'standard', 'accessibility']).optional(),
	searchQuery: z.string().optional(),
	categoryAccessed: z.string().optional(),
	assistiveTech: z.boolean().optional(),
	themeMode: z.enum(['light', 'dark', 'high_contrast']).optional(),
	offlineMode: z.boolean().optional(),
	voiceSearchUsed: z.boolean().optional(),
});
const PerformancePayloadSchema = z.object({
	sessionId: z.string(),
	userType: z.enum(['royal', 'standard', 'accessibility']),
	timestamp: z.number(),
	metrics: z.array(PerformanceMetricSchema),
	metadata: z.object({
		url: z.string().url(),
		userAgent: z.string(),
		connectionType: z.string().optional(),
		effectiveType: z.string().optional(),
	}),
});
interface PerformanceStorage {
	store(sessionId: string, metrics: any[]): Promise<void>;
	getMetrics(sessionId: string): Promise<any[]>;
	getAggregatedMetrics(userType: string, timeRange: string): Promise<any>;
}
class InMemoryPerformanceStorage implements PerformanceStorage {
	private storage = new Map<string, any[]>();
	async store(sessionId: string, metrics: any[]): Promise<void> {
		const existing = this.storage.get(sessionId) || [];
		this.storage.set(sessionId, [...existing, ...metrics]);
		if (process.env.NODE_ENV === 'development') {
			console.log(
				`[Performance Storage] Stored ${metrics.length} metrics for session ${sessionId}`,
			);
		}
	}
	async getMetrics(sessionId: string): Promise<any[]> {
		return this.storage.get(sessionId) || [];
	}
	async getAggregatedMetrics(userType: string, _timeRange: string): Promise<any> {
		const allMetrics: any[] = [];
		for (const metrics of this.storage.values()) {
			allMetrics.push(...metrics.filter((m) => m.userType === userType));
		}
		return this.aggregateMetrics(allMetrics);
	}
	private aggregateMetrics(metrics: any[]): any {
		if (metrics.length === 0) {
			return {
				count: 0,
				averages: {},
				ratings: {},
			};
		}
		const metricsByName = metrics.reduce(
			(acc, metric) => {
				if (!acc[metric.name]) {
					acc[metric.name] = [];
				}
				acc[metric.name].push(metric);
				return acc;
			},
			{} as Record<string, any[]>,
		);
		const aggregated = {
			count: metrics.length,
			averages: {} as Record<string, number>,
			ratings: {} as Record<string, Record<string, number>>,
			performance_summary: {} as Record<string, any>,
		};
		for (const [metricName, metricList] of Object.entries(metricsByName)) {
			const metricArray = metricList as Array<{ value: number; rating: string }>;
			const totalValue = metricArray.reduce(
				(sum: number, m: { value: number }) => sum + m.value,
				0,
			);
			aggregated.averages[metricName] = totalValue / metricArray.length;
			const ratings = metricArray.reduce(
				(acc: Record<string, number>, m: { rating: string }) => {
					acc[m.rating] = (acc[m.rating] || 0) + 1;
					return acc;
				},
				{} as Record<string, number>,
			);
			aggregated.ratings[metricName] = ratings;
			aggregated.performance_summary[metricName] = {
				count: metricArray.length,
				average: aggregated.averages[metricName],
				min: Math.min(...metricArray.map((m: { value: number }) => m.value)),
				max: Math.max(...metricArray.map((m: { value: number }) => m.value)),
				p95: this.calculatePercentile(
					metricArray.map((m: { value: number }) => m.value),
					95,
				),
				good_ratio: (ratings['good'] || 0) / metricArray.length,
				poor_ratio: (ratings['poor'] || 0) / metricArray.length,
			};
		}
		return aggregated;
	}
	private calculatePercentile(values: number[], percentile: number): number {
		const sorted = values.sort((a, b) => a - b);
		const index = Math.ceil((percentile / 100) * sorted.length) - 1;
		const safeIndex = Math.max(0, index);
		const value = sorted[safeIndex];
		return value !== undefined ? value : 0;
	}
}
const performanceStorage: PerformanceStorage = new InMemoryPerformanceStorage();
class PerformanceAlertSystem {
	private static readonly ROYAL_CLIENT_SLA_THRESHOLDS = {
		FCP: 1000,
		LCP: 1500,
		FID: 50,
		CLS: 0.05,
		FAQ_SEARCH_RESPONSE: 100,
		FAQ_THEME_TOGGLE: 200,
	};
	static checkForAlerts(metrics: any[], userType: string): any[] {
		const alerts: any[] = [];
		if (userType !== 'royal') {
			return alerts;
		}
		for (const metric of metrics) {
			const threshold =
				this.ROYAL_CLIENT_SLA_THRESHOLDS[
					metric.name as keyof typeof this.ROYAL_CLIENT_SLA_THRESHOLDS
				];
			if (threshold && metric.value > threshold) {
				alerts.push({
					type: 'sla_violation',
					metric: metric.name,
					threshold: threshold,
					actual: metric.value,
					userType: userType,
					timestamp: metric.timestamp,
					url: metric.url,
					severity: this.getSeverity(metric.value, threshold),
				});
			}
		}
		return alerts;
	}
	private static getSeverity(
		actual: number,
		threshold: number,
	): 'medium' | 'high' | 'critical' {
		const ratio = actual / threshold;
		if (ratio > 3) return 'critical';
		if (ratio > 2) return 'high';
		return 'medium';
	}
	static async sendAlerts(alerts: any[]): Promise<void> {
		if (alerts.length === 0) return;
		try {
			for (const alert of alerts) {
				if (process.env.NODE_ENV === 'development') {
					console.warn(
						`[FAQ Performance Alert] ${alert.severity.toUpperCase()}: ${alert.metric} exceeded ${alert.threshold}ms with ${alert.actual}ms for royal client`,
					);
				}
				if (process.env.NODE_ENV === 'production') {
					await fetch(process.env['MONITORING_WEBHOOK_URL'] || '', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							alert_type: 'royal_client_sla_violation',
							service: 'faq_system',
							...alert,
						}),
					}).catch((error) => {
						if (process.env.NODE_ENV === 'development') {
							console.error(
								'[Performance Alert] Failed to send monitoring alert:',
								error,
							);
						}
					});
				}
			}
		} catch (error) {
			if (process.env.NODE_ENV === 'development') {
				console.error('[Performance Alert System] Failed to send alerts:', error);
			}
		}
	}
}
export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const correlationId = request.headers.get('x-correlation-id') || 'unknown';
		const performanceContextHeader = request.headers.get('x-performance-context');
		let performanceContext: { requestId?: string } | null = null;
		if (performanceContextHeader) {
			try {
				performanceContext = JSON.parse(performanceContextHeader) as { requestId?: string };
			} catch (e) {
				console.warn('Failed to parse performance context:', e);
			}
		}
		const body = await request.json();
		const validatedPayload = PerformancePayloadSchema.parse(body);
		const { sessionId, userType, metrics } = validatedPayload;
		const enrichedMetrics = metrics.map((metric) => ({
			...metric,
			correlationId,
			requestId: performanceContext?.requestId || correlationId,
			processingTimestamp: Date.now(),
			serverTimestamp: Date.now(),
			userType: userType,
			sessionId: sessionId,
			origin: request.headers.get('origin') || '',
			referer: request.headers.get('referer') || '',
			'user-agent': request.headers.get('user-agent') || '',
		}));
		await performanceStorage.store(sessionId, enrichedMetrics);
		const alerts = PerformanceAlertSystem.checkForAlerts(
			enrichedMetrics,
			userType,
		);
		if (alerts.length > 0) {
			await PerformanceAlertSystem.sendAlerts(alerts);
		}
		if (process.env.NODE_ENV === 'development') {
			console.log(
				`[FAQ Performance Analytics] Processed ${metrics.length} metrics for ${userType} client (session: ${sessionId})`,
			);
		}
		const criticalMetrics = enrichedMetrics.filter((m) => m.rating === 'poor');
		if (criticalMetrics.length > 0 && process.env.NODE_ENV === 'development') {
			console.warn(
				`[FAQ Performance Analytics] ${criticalMetrics.length} poor performance metrics detected for ${userType} client`,
			);
		}
		const response = NextResponse.json({
			success: true,
			processed: metrics.length,
			alerts: alerts.length,
			sessionId: sessionId,
			timestamp: Date.now(),
			correlationId: correlationId,
		});
		response.headers.set('X-Correlation-ID', correlationId);
		if (performanceContext?.requestId) {
			response.headers.set('X-Request-ID', performanceContext.requestId);
		}
		return response;
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error(
				'[FAQ Performance Analytics] Error processing performance data:',
				error,
			);
		}
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid performance data format',
					details: error.errors,
				},
				{
					status: 400,
				},
			);
		}
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to process performance data',
			},
			{
				status: 500,
			},
		);
	}
}
export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(request.url);
		const sessionId = searchParams.get('sessionId');
		const userType = searchParams.get('userType') as
			| 'royal'
			| 'standard'
			| 'accessibility'
			| null;
		const timeRange = searchParams.get('timeRange') || '24h';
		const aggregated = searchParams.get('aggregated') === 'true';
		if (sessionId && !aggregated) {
			const metrics = await performanceStorage.getMetrics(sessionId);
			return NextResponse.json({
				sessionId,
				metrics,
				count: metrics.length,
				timestamp: Date.now(),
			});
		}
		if (aggregated && userType) {
			const aggregatedMetrics = await performanceStorage.getAggregatedMetrics(
				userType,
				timeRange,
			);
			return NextResponse.json({
				userType,
				timeRange,
				aggregated: aggregatedMetrics,
				royal_client_performance:
					userType === 'royal' ?
						{
							sla_compliance: calculateSLACompliance(aggregatedMetrics),
							critical_issues: identifyCriticalIssues(aggregatedMetrics),
						}
					:	undefined,
				timestamp: Date.now(),
			});
		}
		return NextResponse.json({
			status: 'active',
			monitoring: 'faq_system_performance',
			endpoints: {
				store_metrics: 'POST /api/analytics/performance',
				get_session: 'GET /api/analytics/performance?sessionId=<id>',
				get_aggregated:
					'GET /api/analytics/performance?aggregated=true&userType=<type>',
			},
			supported_user_types: ['royal', 'standard', 'accessibility'],
			supported_metrics: [
				'FCP',
				'LCP',
				'FID',
				'CLS',
				'TTFB',
				'INP',
				'FAQ_SEARCH_RESPONSE',
				'FAQ_THEME_TOGGLE',
				'FAQ_VOICE_SEARCH',
				'FAQ_OFFLINE_SYNC',
				'FAQ_ACCESSIBILITY_NAVIGATION',
			],
			timestamp: Date.now(),
		});
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error(
				'[FAQ Performance Analytics] Error retrieving performance data:',
				error,
			);
		}
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to retrieve performance data',
			},
			{
				status: 500,
			},
		);
	}
}
function calculateSLACompliance(aggregatedMetrics: any): any {
	const slaMetrics = ['FCP', 'LCP', 'FID', 'CLS', 'FAQ_SEARCH_RESPONSE'];
	const compliance: Record<string, number> = {};
	for (const metric of slaMetrics) {
		const summary = aggregatedMetrics.performance_summary?.[metric];
		if (summary) {
			compliance[metric] = summary.good_ratio || 0;
		}
	}
	const overallCompliance =
		Object.values(compliance).reduce((sum, val) => sum + val, 0) /
		Object.keys(compliance).length;
	return {
		overall: overallCompliance,
		by_metric: compliance,
		meets_royal_sla: overallCompliance >= 0.95,
	};
}
function identifyCriticalIssues(aggregatedMetrics: any): any[] {
	const criticalIssues: any[] = [];
	for (const [metricName, summary] of Object.entries(
		aggregatedMetrics.performance_summary || {},
	)) {
		const s = summary as any;
		if (s.poor_ratio > 0.05) {
			criticalIssues.push({
				metric: metricName,
				issue: 'high_poor_performance_ratio',
				poor_ratio: s.poor_ratio,
				severity: s.poor_ratio > 0.2 ? 'critical' : 'high',
			});
		}
		if (s.p95 > getP95Threshold(metricName)) {
			criticalIssues.push({
				metric: metricName,
				issue: 'p95_threshold_exceeded',
				p95_value: s.p95,
				threshold: getP95Threshold(metricName),
				severity: 'medium',
			});
		}
	}
	return criticalIssues;
}
function getP95Threshold(metricName: string): number {
	const thresholds: Record<string, number> = {
		FCP: 1800,
		LCP: 2500,
		FID: 100,
		CLS: 0.1,
		FAQ_SEARCH_RESPONSE: 200,
		FAQ_THEME_TOGGLE: 400,
		FAQ_VOICE_SEARCH: 3000,
		FAQ_OFFLINE_SYNC: 5000,
		FAQ_ACCESSIBILITY_NAVIGATION: 300,
	};
	return thresholds[metricName] || 1000;
}
