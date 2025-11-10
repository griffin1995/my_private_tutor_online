'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
interface WebVitalsMetric {
	id: string;
	name: string;
	value: number;
	rating?: 'good' | 'needs-improvement' | 'poor';
	delta?: number;
	entries?: any[];
}
const PERFORMANCE_TARGETS = {
	LCP: {
		target: 1800,
		warning: 2500,
	},
	FID: {
		target: 80,
		warning: 100,
	},
	CLS: {
		target: 0.08,
		warning: 0.1,
	},
	FCP: {
		target: 1000,
		warning: 1800,
	},
	TTFB: {
		target: 600,
		warning: 800,
	},
	INP: {
		target: 200,
		warning: 500,
	},
};
export function WebVitals() {
	const pathname = usePathname();
	const metricsBuffer = useRef<WebVitalsMetric[]>([]);
	const reportTimer = useRef<NodeJS.Timeout>();
	useReportWebVitals((metric) => {
		if (!pathname.includes('/testimonials')) return;
		const enhancedMetric = {
			...metric,
			page: pathname,
			timestamp: new Date().toISOString(),
			target: PERFORMANCE_TARGETS[metric.name as keyof typeof PERFORMANCE_TARGETS],
		};
		if (enhancedMetric.target) {
			if (metric.value <= enhancedMetric.target.target) {
				enhancedMetric.rating = 'good';
			} else if (metric.value <= enhancedMetric.target.warning) {
				enhancedMetric.rating = 'needs-improvement';
			} else {
				enhancedMetric.rating = 'poor';
			}
		}
		if (process.env.NODE_ENV === 'development') {
			const emoji =
				enhancedMetric.rating === 'good' ? '✅'
				: enhancedMetric.rating === 'needs-improvement' ? '⚠️'
				: '❌';
			console.log(
				`${emoji} [Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}ms`,
				`(Target: ${enhancedMetric.target?.target}ms)`,
				enhancedMetric,
			);
		}
		metricsBuffer.current.push(enhancedMetric);
		if (metricsBuffer.current.length >= 10) {
			sendMetrics();
		} else {
			if (reportTimer.current) {
				clearTimeout(reportTimer.current);
			}
			reportTimer.current = setTimeout(sendMetrics, 5000);
		}
	});
	const sendMetrics = () => {
		if (metricsBuffer.current.length === 0) return;
		const metrics = [...metricsBuffer.current];
		metricsBuffer.current = [];
		// Note: Analytics endpoint integration prepared but not yet active
		// const body = JSON.stringify({
		// 	metrics,
		// 	page: pathname,
		// 	timestamp: new Date().toISOString(),
		// 	phase: 'performance-phase-1',
		// });
		if (process.env.NODE_ENV === 'development') {
			console.table(
				metrics.map((m) => ({
					metric: m.name,
					value: `${m.value.toFixed(2)}ms`,
					rating: m.rating,
					target: 'N/A',
				})),
			);
		}
		if (typeof window !== 'undefined') {
			const storedMetrics = JSON.parse(
				localStorage.getItem('webVitalsMetrics') || '[]',
			);
			storedMetrics.push(...metrics);
			if (storedMetrics.length > 50) {
				storedMetrics.splice(0, storedMetrics.length - 50);
			}
			localStorage.setItem('webVitalsMetrics', JSON.stringify(storedMetrics));
		}
	};
	useEffect(() => {
		return () => {
			if (reportTimer.current) {
				clearTimeout(reportTimer.current);
			}
			sendMetrics();
		};
	}, [pathname]);
	return null;
}
export function useWebVitalsMetrics() {
	if (typeof window === 'undefined') return [];
	const stored = localStorage.getItem('webVitalsMetrics');
	return stored ? JSON.parse(stored) : [];
}
