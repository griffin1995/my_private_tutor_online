'use client';

import { useEffect, useCallback, useRef } from 'react';
import { webVitalsTracker } from '@/lib/performance/web-vitals';
interface PerformanceMetrics {
	globeLoadTime?: number;
	chartsLoadTime?: number;
	accordionInteractionTime?: number;
	totalBundleSize?: number;
	interactionLatency?: number;
	scrollPerformance?: number;
}
export function ServicesPerformanceMonitor() {
	const metricsRef = useRef<PerformanceMetrics>({});
	const observerRef = useRef<PerformanceObserver | null>(null);
	const measureComponentLoad = useCallback(
		(componentName: string, startTime: number) => {
			const loadTime = performance.now() - startTime;
			switch (componentName) {
				case 'globe':
					metricsRef.current.globeLoadTime = loadTime;
					break;
				case 'charts':
					metricsRef.current.chartsLoadTime = loadTime;
					break;
				case 'accordion':
					metricsRef.current.accordionInteractionTime = loadTime;
					break;
			}
			if (loadTime > 1000) {
				console.warn(
					`Slow component load: ${componentName} took ${loadTime.toFixed(2)}ms`,
				);
				if (typeof window !== 'undefined' && (window as any).va) {
					(window as any).va('track', 'Slow Component Load', {
						component: componentName,
						loadTime: Math.round(loadTime),
						page: 'services',
					});
				}
			}
		},
		[],
	);
	const trackInteraction = useCallback((interactionType: string) => {
		const startTime = performance.now();
		requestAnimationFrame(() => {
			const interactionTime = performance.now() - startTime;
			metricsRef.current.interactionLatency = interactionTime;
			if (interactionTime > 200) {
				console.warn(
					`Slow interaction: ${interactionType} took ${interactionTime.toFixed(2)}ms`,
				);
				if (typeof window !== 'undefined' && (window as any).va) {
					(window as any).va('track', 'Slow Interaction', {
						type: interactionType,
						latency: Math.round(interactionTime),
						page: 'services',
					});
				}
			}
		});
	}, []);
	const monitorBundleSize = useCallback(() => {
		if (typeof window === 'undefined' || !window.performance) return;
		const resources = performance.getEntriesByType(
			'resource',
		) as PerformanceResourceTiming[];
		let totalSize = 0;
		const criticalResources: {
			name: string;
			size: number;
		}[] = [];
		resources.forEach((resource) => {
			if (
				resource.name.includes('/services') ||
				resource.name.includes('mui') ||
				resource.name.includes('ant') ||
				resource.name.includes('cobe')
			) {
				const size = resource.transferSize || 0;
				totalSize += size;
				if (size > 50000) {
					criticalResources.push({
						name: resource.name.split('/').pop() || resource.name,
						size: size,
					});
				}
			}
		});
		metricsRef.current.totalBundleSize = totalSize;
		if (totalSize > 500000) {
			console.warn(
				`Large bundle size for Services page: ${(totalSize / 1024).toFixed(2)}KB`,
			);
			if (typeof window !== 'undefined' && (window as any).va) {
				(window as any).va('track', 'Large Bundle', {
					totalSize: Math.round(totalSize / 1024),
					criticalResources: criticalResources.length,
					page: 'services',
				});
			}
		}
	}, []);
	const monitorScrollPerformance = useCallback(() => {
		let lastScrollTime = 0;
		let scrollFrameCount = 0;
		let totalScrollTime = 0;
		const handleScroll = () => {
			const now = performance.now();
			if (lastScrollTime) {
				const frameDuration = now - lastScrollTime;
				totalScrollTime += frameDuration;
				scrollFrameCount++;
				if (scrollFrameCount % 60 === 0) {
					const avgFrameTime = totalScrollTime / scrollFrameCount;
					const fps = 1000 / avgFrameTime;
					if (fps < 30) {
						console.warn(`Poor scroll performance: ${fps.toFixed(1)} FPS`);
						if (typeof window !== 'undefined' && (window as any).va) {
							(window as any).va('track', 'Poor Scroll Performance', {
								fps: Math.round(fps),
								page: 'services',
							});
						}
					}
					scrollFrameCount = 0;
					totalScrollTime = 0;
				}
			}
			lastScrollTime = now;
		};
		window.addEventListener('scroll', handleScroll, {
			passive: true,
		});
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	const enforcePerformanceBudgets = useCallback(() => {
		const budgets = {
			LCP: 2500,
			INP: 200,
			CLS: 0.1,
			bundleSize: 500000,
			componentLoad: 1000,
		};
		const vitals = webVitalsTracker.getSummary();
		const violations: string[] = [];
		Object.entries(vitals.metrics).forEach(([metric, data]) => {
			const budget = budgets[metric as keyof typeof budgets];
			if (budget && data.value > budget) {
				violations.push(`${metric}: ${data.value} (budget: ${budget})`);
			}
		});
		if (
			metricsRef.current.totalBundleSize &&
			metricsRef.current.totalBundleSize > budgets.bundleSize
		) {
			violations.push(
				`Bundle size: ${metricsRef.current.totalBundleSize} (budget: ${budgets.bundleSize})`,
			);
		}
		if (
			metricsRef.current.globeLoadTime &&
			metricsRef.current.globeLoadTime > budgets.componentLoad
		) {
			violations.push(
				`Globe load: ${metricsRef.current.globeLoadTime}ms (budget: ${budgets.componentLoad}ms)`,
			);
		}
		if (violations.length > 0) {
			console.error('Performance budget violations:', violations);
			if (typeof window !== 'undefined' && (window as any).va) {
				(window as any).va('track', 'Performance Budget Violation', {
					violations: violations.length,
					details: violations.join(', '),
					page: 'services',
				});
			}
		}
	}, []);
	useEffect(() => {
		monitorBundleSize();
		const scrollCleanup = monitorScrollPerformance();
		if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
			try {
				observerRef.current = new PerformanceObserver((list) => {
					list.getEntries().forEach((entry) => {
						if (entry.duration > 50) {
							console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
							if (typeof window !== 'undefined' && (window as any).va) {
								(window as any).va('track', 'Long Task', {
									duration: Math.round(entry.duration),
									page: 'services',
								});
							}
						}
					});
				});
				observerRef.current.observe({
					entryTypes: ['longtask'],
				});
			} catch (e) {}
		}
		if (document.readyState === 'complete') {
			setTimeout(enforcePerformanceBudgets, 2000);
		} else {
			window.addEventListener('load', () => {
				setTimeout(enforcePerformanceBudgets, 2000);
			});
		}
		return () => {
			scrollCleanup();
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [monitorBundleSize, monitorScrollPerformance, enforcePerformanceBudgets]);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			(window as any).servicesPerformance = {
				measureComponentLoad,
				trackInteraction,
			};
		}
		return () => {
			if (typeof window !== 'undefined') {
				delete (window as any).servicesPerformance;
			}
		};
	}, [measureComponentLoad, trackInteraction]);
	return null;
}
