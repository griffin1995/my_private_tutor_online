import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';
type MonitoringType =
	| 'dashboard'
	| 'summary'
	| 'alerts'
	| 'system'
	| 'performance'
	| 'history';
const loadMonitoringModule = async (type: MonitoringType) => {
	switch (type) {
		case 'dashboard':
			const { getDashboardMetrics } = await import(
				'@/lib/monitoring/optimized/dashboard-metrics'
			);
			return getDashboardMetrics();
		case 'summary':
			const { getPerformanceSummary } = await import(
				'@/lib/monitoring/optimized/performance-summary'
			);
			return getPerformanceSummary();
		case 'alerts':
			const { getAlertData } = await import(
				'@/lib/monitoring/optimized/alert-data'
			);
			return getAlertData();
		case 'system':
			const { getSystemStatus } = await import(
				'@/lib/monitoring/optimized/system-status'
			);
			return getSystemStatus();
		case 'performance':
			const { getPerformanceReport } = await import(
				'@/lib/monitoring/optimized/performance-report'
			);
			return getPerformanceReport();
		case 'history':
			const { getMetricsHistory } = await import(
				'@/lib/monitoring/optimized/metrics-history'
			);
			return getMetricsHistory();
		default:
			throw new Error(`Invalid monitoring type: ${type}`);
	}
};
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const type = (searchParams.get('type') || 'dashboard') as MonitoringType;
		const timeframe = searchParams.get('timeframe') || '24';
		const startTime = performance.now();
		const data = await loadMonitoringModule(type);
		const processingTime = performance.now() - startTime;
		return NextResponse.json(
			{
				success: true,
				data,
				metadata: {
					type,
					timeframe,
					processingTime: `${processingTime.toFixed(2)}ms`,
					timestamp: new Date().toISOString(),
					bundleOptimized: true,
				},
			},
			{
				headers: {
					'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
					'X-Performance-Optimized': 'true',
				},
			},
		);
	} catch (error) {
		console.error('Optimized monitoring API error:', error);
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				timestamp: new Date().toISOString(),
			},
			{
				status: 500,
			},
		);
	}
}
export async function OPTIONS(request: NextRequest) {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': '86400',
		},
	});
}
