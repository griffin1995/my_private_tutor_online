'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { useEffect, useState } from 'react';
type MetricName =
	| 'FCP'
	| 'LCP'
	| 'CLS'
	| 'FID'
	| 'TTFB'
	| 'INP'
	| 'Next.js-hydration'
	| 'Next.js-route-change-to-render'
	| 'Next.js-render';
interface Phase1Metrics {
	buildTime: number;
	typeErrorCount: number;
	bundleSize: number;
	hotReloadTime: number;
	memoryUsage: number;
}
interface WebVitalMetric {
	name: MetricName;
	value: number;
	rating?: 'good' | 'needs-improvement' | 'poor';
	timestamp: number;
}
const metricsStore: WebVitalMetric[] = [];
export function WebVitals() {
	const [, setIsMonitoring] = useState(false);
	useReportWebVitals((metric) => {
		const timestamp = Date.now();
		let rating: 'good' | 'needs-improvement' | 'poor' | undefined;
		switch (metric.name) {
			case 'FCP':
				rating =
					metric.value < 1800 ? 'good'
					: metric.value < 3000 ? 'needs-improvement'
					: 'poor';
				break;
			case 'LCP':
				rating =
					metric.value < 2500 ? 'good'
					: metric.value < 4000 ? 'needs-improvement'
					: 'poor';
				break;
			case 'CLS':
				rating =
					metric.value < 0.1 ? 'good'
					: metric.value < 0.25 ? 'needs-improvement'
					: 'poor';
				break;
			case 'FID':
				rating =
					metric.value < 100 ? 'good'
					: metric.value < 300 ? 'needs-improvement'
					: 'poor';
				break;
			case 'TTFB':
				rating =
					metric.value < 800 ? 'good'
					: metric.value < 1800 ? 'needs-improvement'
					: 'poor';
				break;
			case 'INP':
				rating =
					metric.value < 200 ? 'good'
					: metric.value < 500 ? 'needs-improvement'
					: 'poor';
				break;
			default:
				rating = undefined;
				break;
		}
		const metricData: WebVitalMetric = {
			name: metric.name as MetricName,
			value: metric.value,
			rating: rating as 'good' | 'needs-improvement' | 'poor' | undefined,
			timestamp,
		};
		metricsStore.push(metricData);
		if (metricsStore.length > 100) {
			metricsStore.shift();
		}
		if (process.env.NODE_ENV === 'development') {
			console.log('[Performance Metric]', {
				name: metric.name,
				value: metric.value,
				rating,
				id: metric.id,
				navigationType: metric.navigationType,
			});
		}
		if (typeof window !== 'undefined' && window.navigator?.sendBeacon) {
			const analyticsEnabled = false;
			if (analyticsEnabled) {
				const body = JSON.stringify(metricData);
				const url = '/api/analytics/metrics';
				window.navigator.sendBeacon(url, body);
			}
		}
	});
	useEffect(() => {
		setIsMonitoring(true);
		if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
			const startTime = performance.now();
			const observer = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry instanceof PerformanceNavigationTiming) {
						console.log(
							'[Navigation Performance] Time to Interactive:',
							entry.loadEventEnd - startTime,
						);
					}
				}
			});
			observer.observe({
				entryTypes: ['navigation'],
			});
			return () => observer.disconnect();
		}
	}, []);
	if (typeof window !== 'undefined') {
		(window as unknown as { __PERFORMANCE_METRICS__: WebVitalMetric[] }).__PERFORMANCE_METRICS__ = metricsStore;
	}
	return null;
}
export function getPerformanceMetrics(): WebVitalMetric[] {
	if (typeof window !== 'undefined') {
		return (window as unknown as { __PERFORMANCE_METRICS__?: WebVitalMetric[] }).__PERFORMANCE_METRICS__ || [];
	}
	return [];
}
export function trackBuildMetrics(metrics: Partial<Phase1Metrics>) {
	if (typeof window !== 'undefined') {
		(window as unknown as { __BUILD_METRICS__?: Phase1Metrics }).__BUILD_METRICS__ = {
			...((window as unknown as { __BUILD_METRICS__?: Phase1Metrics }).__BUILD_METRICS__ || {}),
			...metrics,
			timestamp: Date.now(),
		};
	}
}
export function getBuildMetrics(): Phase1Metrics | null {
	if (typeof window !== 'undefined') {
		return (window as unknown as { __BUILD_METRICS__?: Phase1Metrics }).__BUILD_METRICS__ || null;
	}
	return null;
}
