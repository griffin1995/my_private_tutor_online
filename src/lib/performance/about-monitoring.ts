'use client';

import {
	getCachePerformanceMonitor,
	type CachePerformanceMetrics,
} from './cache-monitoring';
interface AboutSectionMetrics {
	lcp?: number;
	fid?: number;
	cls?: number;
	tti?: number;
	mountTime?: number;
	animationTime?: number;
	imageLoadTime?: number;
	videoLoadTime?: number;
	cacheMetrics?: CachePerformanceMetrics;
}
class AboutSectionPerformanceMonitor {
	private metrics: AboutSectionMetrics = {};
	private startTime: number;
	private observers: PerformanceObserver[] = [];
	private cacheMonitor: any;
	constructor() {
		this.startTime = performance.now();
		this.initializeObservers();
		this.initializeCacheMonitoring();
	}
	private initializeCacheMonitoring(): void {
		try {
			this.cacheMonitor = getCachePerformanceMonitor();
		} catch (error) {
			if (process.env.NODE_ENV === 'development') {
				console.warn('Cache monitoring initialization failed:', error);
			}
		}
	}
	private initializeObservers(): void {
		if (typeof window === 'undefined') return;
		try {
			const lcpObserver = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				const lastEntry = entries[entries.length - 1] as any;
				if (lastEntry?.element?.closest('#about')) {
					this.metrics.lcp = lastEntry.startTime;
					this.reportMetric('lcp', lastEntry.startTime);
				}
			});
			lcpObserver.observe({
				entryTypes: ['largest-contentful-paint'],
			});
			this.observers.push(lcpObserver);
			const fidObserver = new PerformanceObserver((list) => {
				list.getEntries().forEach((entry: any) => {
					if (entry.target?.closest('#about')) {
						this.metrics.fid = entry.processingStart - entry.startTime;
						this.reportMetric('fid', this.metrics.fid);
					}
				});
			});
			fidObserver.observe({
				entryTypes: ['first-input'],
			});
			this.observers.push(fidObserver);
			let clsValue = 0;
			const clsObserver = new PerformanceObserver((list) => {
				list.getEntries().forEach((entry: any) => {
					if (
						!entry.hadRecentInput &&
						entry.sources?.some((source: any) => source.node?.closest('#about'))
					) {
						clsValue += entry.value;
						this.metrics.cls = clsValue;
						this.reportMetric('cls', clsValue);
					}
				});
			});
			clsObserver.observe({
				entryTypes: ['layout-shift'],
			});
			this.observers.push(clsObserver);
		} catch (error) {
			if (process.env.NODE_ENV === 'development') {
				console.warn('Performance monitoring not available:', error);
			}
		}
	}
	markComponentMount(): void {
		const mountTime = performance.now() - this.startTime;
		this.metrics.mountTime = mountTime;
		performance.mark('about-section-mounted');
		this.reportMetric('mount-time', mountTime);
	}
	markAnimationComplete(): void {
		const animationTime = performance.now() - this.startTime;
		this.metrics.animationTime = animationTime;
		performance.mark('about-section-animated');
		this.reportMetric('animation-time', animationTime);
	}
	markImageLoaded(): void {
		const imageLoadTime = performance.now() - this.startTime;
		this.metrics.imageLoadTime = imageLoadTime;
		performance.mark('about-section-image-loaded');
		this.reportMetric('image-load-time', imageLoadTime);
	}
	markVideoLoaded(): void {
		const videoLoadTime = performance.now() - this.startTime;
		this.metrics.videoLoadTime = videoLoadTime;
		performance.mark('about-section-video-loaded');
		this.reportMetric('video-load-time', videoLoadTime);
	}
	private reportMetric(metric: string, value: number): void {
		if (typeof window !== 'undefined' && (window as any).gtag) {
			(window as any).gtag('event', 'about_section_performance', {
				metric_name: metric,
				metric_value: Math.round(value),
				section_id: 'about',
			});
		}
		if (process.env.NODE_ENV === 'development') {
			console.log(`About Section ${metric}:`, `${Math.round(value)}ms`);
		}
	}
	getMetricsSummary(): AboutSectionMetrics {
		const summary = {
			...this.metrics,
		};
		if (this.cacheMonitor) {
			try {
				summary.cacheMetrics = this.cacheMonitor.getMetrics();
			} catch (error) {
				if (process.env.NODE_ENV === 'development') {
					console.warn('Cache metrics retrieval failed:', error);
				}
			}
		}
		return summary;
	}
	cleanup(): void {
		this.observers.forEach((observer) => {
			try {
				observer.disconnect();
			} catch (error) {
				if (process.env.NODE_ENV === 'development') {
					console.warn('Error disconnecting observer:', error);
				}
			}
		});
		this.observers = [];
	}
}
let aboutSectionMonitor: AboutSectionPerformanceMonitor | null = null;
export const getAboutSectionMonitor = (): AboutSectionPerformanceMonitor => {
	if (!aboutSectionMonitor) {
		aboutSectionMonitor = new AboutSectionPerformanceMonitor();
	}
	return aboutSectionMonitor;
};
export const useAboutSectionPerformance = () => {
	if (typeof window === 'undefined') return null;
	return {
		monitor: getAboutSectionMonitor(),
		markMount: () => getAboutSectionMonitor().markComponentMount(),
		markAnimationComplete: () => getAboutSectionMonitor().markAnimationComplete(),
		markImageLoaded: () => getAboutSectionMonitor().markImageLoaded(),
		markVideoLoaded: () => getAboutSectionMonitor().markVideoLoaded(),
		getMetrics: () => getAboutSectionMonitor().getMetricsSummary(),
	};
};
export type { AboutSectionMetrics };
