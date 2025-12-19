import { NextRequest, NextResponse } from 'next/server';
import { clientSuccessAnalytics } from '@/lib/analytics/client-success-analytics';
import { businessAnalytics } from '@/lib/analytics/business-analytics';
// Next.js 15: API route with real-time analytics needs dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0 // Disable caching for real-time data
export async function GET(request: NextRequest) {
	const startTime = performance.now();
	try {
		await businessAnalytics.track('api_client_success_metrics', {
			category: 'engagement',
			action: 'api_request',
			label: 'client_success_dashboard',
			metadata: {
				userAgent: request.headers.get('user-agent') || 'unknown',
				timestamp: Date.now(),
			},
		});
		const { searchParams } = new URL(request.url);
		const timeRange = searchParams.get('timeRange') || '30d';
		const category = searchParams.get('category') || 'all';
		const format = searchParams.get('format') || 'json';
		const includeRealTime = searchParams.get('realTime') === 'true';
		const insights = await clientSuccessAnalytics.generateInsights();
		let realTimeMetrics = null;
		if (includeRealTime) {
			realTimeMetrics = await clientSuccessAnalytics.getRealTimeMetrics();
		}
		const processingTime = performance.now() - startTime;
		const responseData = {
			success: true,
			data: {
				insights,
				realTimeMetrics,
				metadata: {
					timeRange,
					category,
					processingTimeMs: Math.round(processingTime),
					timestamp: new Date().toISOString(),
					cacheStatus: 'fresh',
				},
			},
		};
		if (format === 'csv') {
			const csvData = await clientSuccessAnalytics.exportAnalyticsData('csv');
			return new NextResponse(csvData, {
				status: 200,
				headers: {
					'Content-Type': 'text/csv',
					'Content-Disposition': `attachment; filename="client-success-metrics-${new Date().toISOString().split('T')[0]}.csv"`,
					'Cache-Control': 'no-cache, no-store, must-revalidate',
					Pragma: 'no-cache',
					Expires: '0',
				},
			});
		}
		return NextResponse.json(responseData, {
			status: 200,
			headers: {
				'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
				'Content-Type': 'application/json',
				'X-Processing-Time': `${Math.round(processingTime)}ms`,
				'X-Cache-Status': 'fresh',
			},
		});
	} catch (error) {
		console.error('Client Success Analytics API Error:', error);
		await businessAnalytics.track('api_error', {
			category: 'error',
			action: 'api_error',
			label: 'client_success_analytics',
			metadata: {
				error: error instanceof Error ? error.message : 'Unknown error',
				stack:
					error instanceof Error ?
						error.stack || 'No stack trace available'
					:	'No stack trace available',
				processingTime: performance.now() - startTime,
			},
		});
		return NextResponse.json(
			{
				success: false,
				error: {
					message: 'Failed to generate client success metrics',
					code: 'ANALYTICS_ERROR',
					timestamp: new Date().toISOString(),
				},
			},
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
				},
			},
		);
	}
}
export async function POST(request: NextRequest) {
	const startTime = performance.now();
	try {
		const body = await request.json();
		const { action, parameters } = body;
		await businessAnalytics.track('api_client_success_update', {
			category: 'conversion',
			action: 'api_post_request',
			label: `client_success_${action}`,
			metadata: {
				action,
				parameters: JSON.stringify(parameters),
			},
		});
		let result = null;
		switch (action) {
			case 'refresh':
				clientSuccessAnalytics.clearCache();
				result = await clientSuccessAnalytics.generateInsights();
				break;
			case 'export':
				const format = parameters?.format || 'json';
				result = await clientSuccessAnalytics.exportAnalyticsData(format);
				break;
			default:
				throw new Error(`Unknown action: ${action}`);
		}
		const processingTime = performance.now() - startTime;
		return NextResponse.json(
			{
				success: true,
				data: result,
				metadata: {
					action,
					processingTimeMs: Math.round(processingTime),
					timestamp: new Date().toISOString(),
				},
			},
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'X-Processing-Time': `${Math.round(processingTime)}ms`,
				},
			},
		);
	} catch (error) {
		console.error('Client Success Analytics POST Error:', error);
		await businessAnalytics.track('api_error', {
			category: 'error',
			action: 'api_post_error',
			label: 'client_success_analytics',
			metadata: {
				error: error instanceof Error ? error.message : 'Unknown error',
				processingTime: performance.now() - startTime,
			},
		});
		return NextResponse.json(
			{
				success: false,
				error: {
					message:
						error instanceof Error ? error.message : 'Request processing failed',
					code: 'UPDATE_ERROR',
					timestamp: new Date().toISOString(),
				},
			},
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	}
}
export async function OPTIONS(_request: NextRequest) {
	return new NextResponse(null, {
		status: 200,
		headers: {
			// CORS handled by middleware,
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			'Access-Control-Max-Age': '86400',
		},
	});
}
