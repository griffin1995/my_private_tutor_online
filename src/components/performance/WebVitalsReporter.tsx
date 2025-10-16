'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { useEffect, useCallback, useRef } from 'react';
import {
	webVitalsTracker,
	type WebVitalsData,
	PERFORMANCE_THRESHOLDS,
} from '@/lib/performance/web-vitals';
interface NextWebVitalsMetric {
	id: string;
	name: string;
	delta: number;
	entries: PerformanceEntry[];
	navigationType: string;
	rating: 'good' | 'needs-improvement' | 'poor';
	value: number;
}
const PERFORMANCE_BUDGETS = {
	javascriptBudget: 300,
	cssBudget: 100,
	imageBudget: 500,
	totalPageWeight: 1000,
	timeToInteractive: 3000,
	firstMeaningfulPaint: 2000,
	speedIndex: 3000,
	maxRequests: 50,
	maxDomNodes: 1500,
	maxListeners: 100,
} as const;
interface CustomEventData {
	event: string;
	value?: number;
	metadata?: Record<string, string | number | boolean>;
	timestamp: number;
}
export function WebVitalsReporter() {
	const metricsBuffer = useRef<NextWebVitalsMetric[]>([]);
	const customEventsBuffer = useRef<CustomEventData[]>([]);
	const reportingInterval = useRef<NodeJS.Timeout>();
	const sessionId = useRef<string>('');
	useReportWebVitals((metric) => {
		metricsBuffer.current.push(metric as NextWebVitalsMetric);
		if (metric.rating === 'poor') {
			handlePoorPerformance(metric as NextWebVitalsMetric);
		}
		checkPerformanceBudgets(metric as NextWebVitalsMetric);
		if (process.env.NODE_ENV === 'development') {
			console.log('[Web Vitals]', {
				name: metric.name,
				value: metric.value,
				rating: metric.rating,
				delta: metric.delta,
				id: metric.id,
			});
		}
	});
	const handlePoorPerformance = useCallback((metric: NextWebVitalsMetric) => {
		const alert = {
			metric: metric.name,
			value: metric.value,
			threshold:
				PERFORMANCE_THRESHOLDS[metric.name as keyof typeof PERFORMANCE_THRESHOLDS],
			rating: metric.rating,
			url: window.location.href,
			timestamp: Date.now(),
			sessionId: sessionId.current,
			userAgent: navigator.userAgent,
		};
		fetch('/api/performance/alerts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(alert),
		}).catch((err) => console.error('Failed to send performance alert:', err));
	}, []);
	const checkPerformanceBudgets = useCallback((metric: NextWebVitalsMetric) => {
		const violations: string[] = [];
		switch (metric.name) {
			case 'LCP':
				if (metric.value > PERFORMANCE_BUDGETS.firstMeaningfulPaint) {
					violations.push(
						`LCP exceeded budget: ${metric.value}ms > ${PERFORMANCE_BUDGETS.firstMeaningfulPaint}ms`,
					);
				}
				break;
			case 'FID':
			case 'INP':
				if (metric.value > 100) {
					violations.push(`Interaction delay exceeded: ${metric.value}ms > 100ms`);
				}
				break;
			case 'CLS':
				if (metric.value > 0.1) {
					violations.push(`Layout shift exceeded: ${metric.value} > 0.1`);
				}
				break;
			case 'TTFB':
				if (metric.value > 600) {
					violations.push(`Server response slow: ${metric.value}ms > 600ms`);
				}
				break;
		}
		if (violations.length > 0) {
			customEventsBuffer.current.push({
				event: 'performance_budget_violation',
				value: metric.value,
				metadata: {
					metric: metric.name,
					violations: violations.join(', '),
				},
				timestamp: Date.now(),
			});
		}
	}, []);
	const trackCustomEvent = useCallback(
		(
			event: string,
			value?: number,
			metadata?: Record<string, string | number | boolean>,
		) => {
			customEventsBuffer.current.push({
				event,
				value,
				metadata,
				timestamp: Date.now(),
			});
		},
		[],
	);
	const reportMetrics = useCallback(async () => {
		if (
			metricsBuffer.current.length === 0 &&
			customEventsBuffer.current.length === 0
		) {
			return;
		}
		const payload = {
			sessionId: sessionId.current,
			metrics: [...metricsBuffer.current],
			customEvents: [...customEventsBuffer.current],
			timestamp: Date.now(),
			url: window.location.href,
			userAgent: navigator.userAgent,
			viewport: {
				width: window.innerWidth,
				height: window.innerHeight,
			},
			connection: getConnectionInfo(),
		};
		metricsBuffer.current = [];
		customEventsBuffer.current = [];
		try {
			await fetch('/api/performance/metrics', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
		} catch (error) {
			console.error('Failed to report metrics:', error);
		}
	}, []);
	const getConnectionInfo = () => {
		if ('connection' in navigator) {
			const conn = (navigator as any).connection;
			return {
				effectiveType: conn?.effectiveType,
				downlink: conn?.downlink,
				rtt: conn?.rtt,
				saveData: conn?.saveData,
			};
		}
		return null;
	};
	useEffect(() => {
		sessionId.current = `perf_${Date.now()}_${Math.random().toString(36).substring(2)}`;
		if (typeof window !== 'undefined' && window.performance) {
			const navigation = performance.getEntriesByType(
				'navigation',
			)[0] as PerformanceNavigationTiming;
			if (navigation) {
				trackCustomEvent(
					'page_load',
					navigation.loadEventEnd - navigation.fetchStart,
					{
						domContentLoaded:
							navigation.domContentLoadedEventEnd - navigation.fetchStart,
						domInteractive: navigation.domInteractive - navigation.fetchStart,
						transferSize: navigation.transferSize,
						encodedBodySize: navigation.encodedBodySize,
						decodedBodySize: navigation.decodedBodySize,
					},
				);
			}
		}
		const observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (entry.entryType === 'resource') {
					const resource = entry as PerformanceResourceTiming;
					if (
						resource.name.includes('.js') &&
						resource.transferSize > PERFORMANCE_BUDGETS.javascriptBudget * 1024
					) {
						trackCustomEvent('resource_budget_violation', resource.transferSize, {
							type: 'javascript',
							url: resource.name,
							budget: PERFORMANCE_BUDGETS.javascriptBudget,
						});
					}
					if (
						resource.name.includes('.css') &&
						resource.transferSize > PERFORMANCE_BUDGETS.cssBudget * 1024
					) {
						trackCustomEvent('resource_budget_violation', resource.transferSize, {
							type: 'css',
							url: resource.name,
							budget: PERFORMANCE_BUDGETS.cssBudget,
						});
					}
				}
			}
		});
		try {
			observer.observe({
				entryTypes: ['resource', 'navigation', 'paint', 'largest-contentful-paint'],
			});
		} catch (e) {
			console.warn('Some performance entry types not supported:', e);
		}
		reportingInterval.current = setInterval(reportMetrics, 10000);
		const handleUnload = () => {
			reportMetrics();
		};
		window.addEventListener('beforeunload', handleUnload);
		window.addEventListener('pagehide', handleUnload);
		trackTutoringMetrics();
		return () => {
			if (reportingInterval.current) {
				clearInterval(reportingInterval.current);
			}
			window.removeEventListener('beforeunload', handleUnload);
			window.removeEventListener('pagehide', handleUnload);
			observer.disconnect();
		};
	}, [reportMetrics, trackCustomEvent]);
	const trackTutoringMetrics = () => {
		document.addEventListener('submit', (e) => {
			const target = e.target as HTMLFormElement;
			if (target.dataset.formType === 'inquiry') {
				trackCustomEvent('inquiry_form_submit', 1, {
					formId: target.id,
					formType: target.dataset.formType,
				});
			}
		});
		document.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.dataset.trackEvent === 'bootcamp_registration') {
				trackCustomEvent('bootcamp_registration_click', 1, {
					bootcampType: target.dataset.bootcampType || 'unknown',
					tier: target.dataset.tier || 'unknown',
				});
			}
		});
		const trackServiceTierView = () => {
			const serviceTiers = document.querySelectorAll('[data-service-tier]');
			serviceTiers.forEach((tier) => {
				const observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							trackCustomEvent('service_tier_view', 1, {
								tier: (entry.target as HTMLElement).dataset.serviceTier || 'unknown',
							});
							observer.unobserve(entry.target);
						}
					});
				});
				observer.observe(tier);
			});
		};
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', trackServiceTierView);
		} else {
			trackServiceTierView();
		}
	};
	return null;
}
export const performanceUtils = {
	measureRenderTime: (componentName: string) => {
		const startMark = `${componentName}_render_start`;
		const endMark = `${componentName}_render_end`;
		const measureName = `${componentName}_render`;
		return {
			start: () => performance.mark(startMark),
			end: () => {
				performance.mark(endMark);
				performance.measure(measureName, startMark, endMark);
				const measure = performance.getEntriesByName(measureName)[0];
				if (measure) {
					console.log(
						`[Performance] ${componentName} rendered in ${measure.duration.toFixed(2)}ms`,
					);
				}
			},
		};
	},
	checkBudget: (metric: string, value: number, budget: number): boolean => {
		const exceeded = value > budget;
		if (exceeded) {
			console.warn(
				`[Performance Budget] ${metric} exceeded: ${value} > ${budget}`,
			);
		}
		return exceeded;
	},
	getPerformanceSummary: () => {
		const entries = performance.getEntriesByType(
			'navigation',
		)[0] as PerformanceNavigationTiming;
		if (!entries) return null;
		return {
			dns: entries.domainLookupEnd - entries.domainLookupStart,
			tcp: entries.connectEnd - entries.connectStart,
			request: entries.responseStart - entries.requestStart,
			response: entries.responseEnd - entries.responseStart,
			dom: entries.domComplete - entries.responseEnd,
			load: entries.loadEventEnd - entries.loadEventStart,
			total: entries.loadEventEnd - entries.fetchStart,
		};
	},
};
