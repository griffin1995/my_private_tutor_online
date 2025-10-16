import { NextRequest, NextResponse } from 'next/server';
interface PerformanceHistoryEntry {
	timestamp: string;
	responseTime: number;
	cacheHitRate: number;
	databaseLatency: number;
	memoryUsage: number;
	cpuUsage: number;
	activeUsers: number;
	pageViews: number;
	conversionRate: number;
	revenueImpact: number;
}
export async function GET(request: NextRequest) {
	try {
		const startTime = Date.now();
		const { searchParams } = new URL(request.url);
		const hours = parseInt(searchParams.get('hours') || '24', 10);
		const resolution = searchParams.get('resolution') || 'hourly';
		const metrics = searchParams.get('metrics')?.split(',') || ['all'];
		const historyData = generateHistoricalData(hours, resolution);
		const totalTime = Date.now() - startTime;
		const response = {
			timestamp: new Date().toISOString(),
			status: 'success',
			dataPoints: historyData.length,
			timeRange: {
				hours,
				resolution,
				from: historyData[0]?.timestamp,
				to: historyData[historyData.length - 1]?.timestamp,
			},
			data: historyData,
			performance: {
				queryTime: totalTime,
				cacheHit: false,
				dataSource: 'generated',
			},
			summary: calculatePerformanceSummary(historyData),
		};
		return NextResponse.json(response, {
			headers: {
				'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
				'X-Performance-Time': `${totalTime}ms`,
				'X-Data-Points': historyData.length.toString(),
			},
		});
	} catch (error) {
		console.error('🚨 Performance history API error:', error);
		return NextResponse.json(
			{
				timestamp: new Date().toISOString(),
				status: 'error',
				error: error instanceof Error ? error.message : 'Unknown error',
				data: [],
			},
			{
				status: 500,
			},
		);
	}
}
function generateHistoricalData(
	hours: number,
	resolution: string,
): PerformanceHistoryEntry[] {
	const data: PerformanceHistoryEntry[] = [];
	const now = new Date();
	let intervalMs: number;
	let dataPoints: number;
	switch (resolution) {
		case 'minute':
			intervalMs = 60 * 1000;
			dataPoints = hours * 60;
			break;
		case 'hourly':
			intervalMs = 60 * 60 * 1000;
			dataPoints = hours;
			break;
		case 'daily':
			intervalMs = 24 * 60 * 60 * 1000;
			dataPoints = Math.ceil(hours / 24);
			break;
		default:
			intervalMs = 60 * 60 * 1000;
			dataPoints = hours;
	}
	dataPoints = Math.min(dataPoints, 168);
	for (let i = dataPoints - 1; i >= 0; i--) {
		const timestamp = new Date(now.getTime() - i * intervalMs);
		const hourOfDay = timestamp.getHours();
		const dayOfWeek = timestamp.getDay();
		const isBusinessHours =
			dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay <= 18;
		const trafficMultiplier = isBusinessHours ? 1.5 : 0.7;
		const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
		const weekendMultiplier = isWeekend ? 0.6 : 1.0;
		const baseLoad = trafficMultiplier * weekendMultiplier;
		const entry: PerformanceHistoryEntry = {
			timestamp: timestamp.toISOString(),
			responseTime: 180 + baseLoad * 100 + Math.random() * 120,
			cacheHitRate: Math.max(80, 95 - baseLoad * 5 + Math.random() * 8),
			databaseLatency: 45 + baseLoad * 30 + Math.random() * 50,
			memoryUsage: Math.min(85, 55 + baseLoad * 15 + Math.random() * 10),
			cpuUsage: Math.min(90, 25 + baseLoad * 25 + Math.random() * 20),
			activeUsers: Math.round(
				(100 + baseLoad * 150 + Math.random() * 50) * weekendMultiplier,
			),
			pageViews: Math.round(
				(500 + baseLoad * 800 + Math.random() * 300) * weekendMultiplier,
			),
			conversionRate: Math.max(
				2.5,
				3.5 + (isBusinessHours ? 0.5 : -0.3) + Math.random() * 1.5,
			),
			revenueImpact: Math.round(
				(8000 + baseLoad * 4000 + Math.random() * 3000) * weekendMultiplier,
			),
		};
		data.push(entry);
	}
	return data;
}
function calculatePerformanceSummary(data: PerformanceHistoryEntry[]) {
	if (data.length === 0) {
		return {
			averageResponseTime: 0,
			averageCacheHitRate: 0,
			totalPageViews: 0,
			totalRevenue: 0,
			performanceTrend: 'stable',
		};
	}
	const avgResponseTime =
		data.reduce((sum, entry) => sum + entry.responseTime, 0) / data.length;
	const avgCacheHitRate =
		data.reduce((sum, entry) => sum + entry.cacheHitRate, 0) / data.length;
	const totalPageViews = data.reduce((sum, entry) => sum + entry.pageViews, 0);
	const totalRevenue = data.reduce((sum, entry) => sum + entry.revenueImpact, 0);
	const performanceTrend = calculateTrend(
		data.map((entry) => entry.responseTime),
	);
	const conversionTrend = calculateTrend(
		data.map((entry) => entry.conversionRate),
	);
	return {
		averageResponseTime: Math.round(avgResponseTime),
		averageCacheHitRate: Math.round(avgCacheHitRate * 10) / 10,
		totalPageViews: Math.round(totalPageViews),
		totalRevenue: Math.round(totalRevenue),
		performanceTrend,
		conversionTrend,
		peakHour: findPeakHour(data),
		optimalPerformanceWindow: findOptimalWindow(data),
		businessImpact: {
			optimizationValue: Math.round(totalRevenue * 0.15),
			projectedMonthlySavings: Math.round(avgResponseTime < 250 ? 15000 : 8000),
			riskMitigation:
				avgResponseTime < 300 ? 'low'
				: avgResponseTime < 500 ? 'medium'
				: 'high',
		},
	};
}
function calculateTrend(
	values: number[],
): 'improving' | 'declining' | 'stable' {
	if (values.length < 2) return 'stable';
	const n = values.length;
	const x = Array.from(
		{
			length: n,
		},
		(_, i) => i,
	);
	const sumX = x.reduce((a, b) => a + b, 0);
	const sumY = values.reduce((a, b) => a + b, 0);
	const sumXY = x.reduce((sum, xi, i) => sum + xi * values[i], 0);
	const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
	const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
	if (Math.abs(slope) < 0.1) return 'stable';
	return slope > 0 ? 'declining' : 'improving';
}
function findPeakHour(data: PerformanceHistoryEntry[]): number {
	const hourlyData = new Map<number, number>();
	data.forEach((entry) => {
		const hour = new Date(entry.timestamp).getHours();
		const pageViews = entry.pageViews;
		hourlyData.set(hour, (hourlyData.get(hour) || 0) + pageViews);
	});
	let peakHour = 0;
	let maxViews = 0;
	for (const [hour, views] of hourlyData) {
		if (views > maxViews) {
			maxViews = views;
			peakHour = hour;
		}
	}
	return peakHour;
}
function findOptimalWindow(data: PerformanceHistoryEntry[]): {
	start: number;
	end: number;
} {
	const hourlyPerformance = new Map<number, number[]>();
	data.forEach((entry) => {
		const hour = new Date(entry.timestamp).getHours();
		if (!hourlyPerformance.has(hour)) {
			hourlyPerformance.set(hour, []);
		}
		hourlyPerformance.get(hour)!.push(entry.responseTime);
	});
	let bestHour = 0;
	let bestAvgResponseTime = Infinity;
	for (const [hour, responseTimes] of hourlyPerformance) {
		const avgResponseTime =
			responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
		if (avgResponseTime < bestAvgResponseTime) {
			bestAvgResponseTime = avgResponseTime;
			bestHour = hour;
		}
	}
	return {
		start: bestHour,
		end: (bestHour + 2) % 24,
	};
}
