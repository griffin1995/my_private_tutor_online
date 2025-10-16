import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
interface PerformanceMetricsPayload {
	sessionId: string;
	metrics: Array<{
		id: string;
		name: string;
		delta: number;
		entries: PerformanceEntry[];
		navigationType: string;
		rating: 'good' | 'needs-improvement' | 'poor';
		value: number;
	}>;
	customEvents: Array<{
		event: string;
		value?: number;
		metadata?: Record<string, string | number | boolean>;
		timestamp: number;
	}>;
	timestamp: number;
	url: string;
	userAgent: string;
	viewport: {
		width: number;
		height: number;
	};
	connection: {
		effectiveType?: string;
		downlink?: number;
		rtt?: number;
		saveData?: boolean;
	} | null;
}
export async function POST(request: NextRequest) {
	try {
		const hasBody =
			request.headers.get('content-length') !== '0' &&
			request.headers.get('content-type')?.includes('application/json');
		if (!hasBody) {
			return NextResponse.json(
				{
					error: 'Request body is required',
					message: 'Performance metrics data must be provided in JSON format',
				},
				{
					status: 400,
				},
			);
		}
		let payload: PerformanceMetricsPayload;
		try {
			const body = await request.text();
			if (!body.trim()) {
				return NextResponse.json(
					{
						error: 'Empty request body',
						message: 'Request body cannot be empty for performance metrics',
					},
					{
						status: 400,
					},
				);
			}
			payload = JSON.parse(body);
		} catch (parseError) {
			console.error('[Performance API] JSON parsing error:', parseError);
			return NextResponse.json(
				{
					error: 'Invalid JSON format',
					message: 'Request body must be valid JSON',
					details:
						parseError instanceof Error ?
							parseError.message
						:	'Unknown parsing error',
				},
				{
					status: 400,
				},
			);
		}
		if (!payload.sessionId || !payload.timestamp) {
			return NextResponse.json(
				{
					error: 'Missing required fields: sessionId, timestamp',
				},
				{
					status: 400,
				},
			);
		}
		const headersList = await headers();
		const clientIP =
			headersList.get('x-forwarded-for') ||
			headersList.get('x-real-ip') ||
			'unknown';
		const country = headersList.get('x-vercel-ip-country') || 'unknown';
		const region = headersList.get('x-vercel-ip-country-region') || 'unknown';
		const enrichedPayload = {
			...payload,
			serverTimestamp: Date.now(),
			clientIP: clientIP.split(',')[0].trim(),
			geoLocation: {
				country,
				region,
			},
			processingDelay: Date.now() - payload.timestamp,
		};
		const analysisResults = analyzeMetrics(enrichedPayload);
		if (process.env.NODE_ENV === 'development') {
			console.log('[Performance Metrics]', {
				sessionId: payload.sessionId,
				url: payload.url,
				metricsCount: payload.metrics.length,
				customEventsCount: payload.customEvents.length,
				analysis: analysisResults,
			});
		}
		await Promise.allSettled([
			sendToVercelAnalytics(enrichedPayload),
			sendToMonitoringService(enrichedPayload),
		]);
		return NextResponse.json({
			success: true,
			sessionId: payload.sessionId,
			processed: {
				metrics: payload.metrics.length,
				customEvents: payload.customEvents.length,
			},
			analysis: analysisResults,
			timestamp: Date.now(),
		});
	} catch (error) {
		console.error('[Performance API] Error processing metrics:', {
			error: error instanceof Error ? error.message : 'Unknown error',
			stack: error instanceof Error ? error.stack : undefined,
			timestamp: new Date().toISOString(),
			requestUrl: request.url,
			requestMethod: request.method,
			userAgent: request.headers.get('user-agent'),
		});
		let statusCode = 500;
		let errorMessage = 'Internal server error';
		let errorDetails: string | undefined;
		if (error instanceof SyntaxError) {
			statusCode = 400;
			errorMessage = 'Invalid request format';
			errorDetails = 'Request body must be valid JSON';
		} else if (error instanceof TypeError) {
			statusCode = 400;
			errorMessage = 'Invalid request data structure';
			errorDetails = error.message;
		} else if (error instanceof Error && error.message.includes('network')) {
			statusCode = 503;
			errorMessage = 'External service unavailable';
			errorDetails = 'Unable to process metrics due to external service issues';
		}
		return NextResponse.json(
			{
				error: errorMessage,
				message: error instanceof Error ? error.message : 'Unknown error occurred',
				details: errorDetails,
				timestamp: new Date().toISOString(),
				requestId: crypto.randomUUID(),
			},
			{
				status: statusCode,
			},
		);
	}
}
export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const sessionId = url.searchParams.get('sessionId');
		const timeRange = url.searchParams.get('timeRange') || '1h';
		const mockData = {
			sessionId,
			timeRange,
			metrics: {
				LCP: {
					value: 1250,
					rating: 'good',
					samples: 45,
				},
				INP: {
					value: 89,
					rating: 'good',
					samples: 42,
				},
				CLS: {
					value: 0.05,
					rating: 'good',
					samples: 38,
				},
				FCP: {
					value: 800,
					rating: 'good',
					samples: 44,
				},
				TTFB: {
					value: 320,
					rating: 'good',
					samples: 45,
				},
			},
			trends: {
				improving: ['LCP', 'FCP'],
				stable: ['CLS'],
				declining: [],
			},
			timestamp: Date.now(),
		};
		return NextResponse.json(mockData);
	} catch (error) {
		console.error('[Performance API] Error retrieving metrics:', {
			error: error instanceof Error ? error.message : 'Unknown error',
			stack: error instanceof Error ? error.stack : undefined,
			timestamp: new Date().toISOString(),
			requestUrl: request.url,
		});
		return NextResponse.json(
			{
				error: 'Failed to retrieve metrics',
				message: error instanceof Error ? error.message : 'Unknown error occurred',
				timestamp: new Date().toISOString(),
				requestId: crypto.randomUUID(),
			},
			{
				status: 500,
			},
		);
	}
}
function analyzeMetrics(
	payload: PerformanceMetricsPayload & {
		serverTimestamp: number;
	},
) {
	const analysis = {
		overallRating: 'good' as 'good' | 'needs-improvement' | 'poor',
		criticalIssues: [] as string[],
		recommendations: [] as string[],
		budgetViolations: [] as string[],
		performanceScore: 100,
	};
	payload.metrics.forEach((metric) => {
		if (metric.rating === 'poor') {
			analysis.criticalIssues.push(
				`${metric.name} is performing poorly: ${metric.value}`,
			);
			analysis.performanceScore -= 20;
			analysis.overallRating = 'poor';
		} else if (metric.rating === 'needs-improvement') {
			analysis.recommendations.push(
				`${metric.name} could be optimized: ${metric.value}`,
			);
			analysis.performanceScore -= 10;
			if (analysis.overallRating === 'good') {
				analysis.overallRating = 'needs-improvement';
			}
		}
		if (metric.name === 'LCP' && metric.value > 2500) {
			analysis.criticalIssues.push('LCP exceeds premium service threshold');
		}
		if (metric.name === 'CLS' && metric.value > 0.1) {
			analysis.criticalIssues.push(
				'Layout shifts detected - affects user experience',
			);
		}
		if (metric.name === 'INP' && metric.value > 200) {
			analysis.criticalIssues.push(
				'Interaction delays detected - affects responsiveness',
			);
		}
	});
	payload.customEvents.forEach((event) => {
		if (event.event === 'performance_budget_violation') {
			analysis.budgetViolations.push(
				(event.metadata?.violations as string) || 'Unknown violation',
			);
		}
		if (event.event === 'resource_budget_violation') {
			analysis.budgetViolations.push(
				`${event.metadata?.type} budget exceeded: ${event.value} bytes`,
			);
		}
	});
	if (
		payload.connection?.effectiveType === '2g' ||
		payload.connection?.effectiveType === 'slow-2g'
	) {
		analysis.recommendations.push(
			'Optimize for slow connections - consider reducing resource sizes',
		);
	}
	if (payload.connection?.saveData) {
		analysis.recommendations.push(
			'User has data saver enabled - prioritize essential content',
		);
	}
	if (payload.viewport.width < 768) {
		analysis.recommendations.push(
			'Mobile viewport detected - ensure mobile optimization',
		);
	}
	return analysis;
}
async function sendToVercelAnalytics(payload: PerformanceMetricsPayload) {
	try {
		if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV) {
			console.log('[Vercel Analytics] Metrics sent:', payload.sessionId);
		}
	} catch (error) {
		console.error('[Vercel Analytics] Failed to send metrics:', error);
	}
}
async function sendToMonitoringService(payload: PerformanceMetricsPayload) {
	try {
		if (process.env.MONITORING_WEBHOOK_URL) {
			await fetch(process.env.MONITORING_WEBHOOK_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.MONITORING_API_KEY}`,
				},
				body: JSON.stringify({
					service: 'my-private-tutor-online',
					environment: process.env.NODE_ENV,
					metrics: payload,
					timestamp: Date.now(),
				}),
			});
		}
	} catch (error) {
		console.error('[Monitoring Service] Failed to send metrics:', error);
	}
}
export async function OPTIONS(request: NextRequest) {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		},
	});
}
