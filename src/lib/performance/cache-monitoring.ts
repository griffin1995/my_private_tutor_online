'use client';

interface CachePerformanceMetrics {
	totalCacheHits: number;
	totalCacheMisses: number;
	hitRate: number;
	averageCacheResponseTime: number;
	averageNetworkResponseTime: number;
	serviceWorkerActive: boolean;
	cacheStorageUsage: number;
	performanceImprovement: number;
}
interface CacheEvent {
	type:
		| 'image-cache-hit'
		| 'image-network-success'
		| 'api-cache-fallback'
		| 'api-network-success'
		| 'general-cache-hit'
		| 'general-network-success'
		| 'preload-complete';
	url: string;
	timestamp: number;
	responseTime?: number;
	cacheVersion?: string;
}
class CachePerformanceMonitor {
	private events: CacheEvent[] = [];
	private metrics: CachePerformanceMetrics;
	private eventListeners: (() => void)[] = [];
	constructor() {
		this.metrics = this.initializeMetrics();
		this.setupEventListeners();
	}
	private initializeMetrics(): CachePerformanceMetrics {
		return {
			totalCacheHits: 0,
			totalCacheMisses: 0,
			hitRate: 0,
			averageCacheResponseTime: 0,
			averageNetworkResponseTime: 0,
			serviceWorkerActive: false,
			cacheStorageUsage: 0,
			performanceImprovement: 0,
		};
	}
	private setupEventListeners(): void {
		if (typeof window === 'undefined') return;
		const handleSWMessage = (event: MessageEvent) => {
			if (event.data?.type === 'CACHE_PERFORMANCE') {
				this.recordCacheEvent(event.data.payload);
			}
		};
		const handleSWActivation = (event: CustomEvent) => {
			this.metrics.serviceWorkerActive = true;
			this.calculateMetrics();
		};
		navigator.serviceWorker?.addEventListener('message', handleSWMessage);
		window.addEventListener(
			'sw-about-activated',
			handleSWActivation as EventListener,
		);
		this.eventListeners.push(
			() =>
				navigator.serviceWorker?.removeEventListener('message', handleSWMessage),
			() =>
				window.removeEventListener(
					'sw-about-activated',
					handleSWActivation as EventListener,
				),
		);
	}
	public recordCacheEvent(eventData: Partial<CacheEvent>): void {
		const event: CacheEvent = {
			type: eventData.type || 'general-cache-hit',
			url: eventData.url || '',
			timestamp: eventData.timestamp || Date.now(),
			responseTime: eventData.responseTime,
			cacheVersion: eventData.cacheVersion,
		};
		this.events.push(event);
		this.calculateMetrics();
		if (this.events.length > 1000) {
			this.events = this.events.slice(-500);
		}
	}
	private calculateMetrics(): void {
		const recentEvents = this.events.slice(-100);
		const cacheHits = recentEvents.filter(
			(e) => e.type.includes('cache-hit') || e.type.includes('cache-fallback'),
		).length;
		const networkRequests = recentEvents.filter((e) =>
			e.type.includes('network-success'),
		).length;
		this.metrics.totalCacheHits = cacheHits;
		this.metrics.totalCacheMisses = networkRequests;
		this.metrics.hitRate =
			recentEvents.length > 0 ? (cacheHits / recentEvents.length) * 100 : 0;
		const cacheEvents = recentEvents.filter((e) => e.type.includes('cache'));
		const networkEvents = recentEvents.filter((e) => e.type.includes('network'));
		if (cacheEvents.length > 0) {
			this.metrics.averageCacheResponseTime =
				cacheEvents.reduce((sum, e) => sum + (e.responseTime || 0), 0) /
				cacheEvents.length;
		}
		if (networkEvents.length > 0) {
			this.metrics.averageNetworkResponseTime =
				networkEvents.reduce((sum, e) => sum + (e.responseTime || 0), 0) /
				networkEvents.length;
		}
		if (
			this.metrics.averageNetworkResponseTime > 0 &&
			this.metrics.averageCacheResponseTime > 0
		) {
			this.metrics.performanceImprovement =
				((this.metrics.averageNetworkResponseTime -
					this.metrics.averageCacheResponseTime) /
					this.metrics.averageNetworkResponseTime) *
				100;
		}
	}
	public async updateStorageUsage(): Promise<void> {
		try {
			if ('storage' in navigator && 'estimate' in navigator.storage) {
				const estimate = await navigator.storage.estimate();
				this.metrics.cacheStorageUsage = estimate.usage || 0;
			}
		} catch (error) {
			if (process.env.NODE_ENV === 'development') {
				console.warn('Storage estimation failed:', error);
			}
		}
	}
	public getMetrics(): CachePerformanceMetrics {
		return {
			...this.metrics,
		};
	}
	public generatePerformanceSummary(): string {
		const metrics = this.getMetrics();
		return `Cache Performance Summary:
• Hit Rate: ${metrics.hitRate.toFixed(1)}%
• Cache Hits: ${metrics.totalCacheHits}
• Network Requests: ${metrics.totalCacheMisses}
• Cache Response Time: ${metrics.averageCacheResponseTime.toFixed(0)}ms
• Network Response Time: ${metrics.averageNetworkResponseTime.toFixed(0)}ms
• Performance Improvement: ${metrics.performanceImprovement.toFixed(1)}%
• Service Worker: ${metrics.serviceWorkerActive ? 'Active' : 'Inactive'}
• Storage Usage: ${(metrics.cacheStorageUsage / 1024 / 1024).toFixed(1)}MB`;
	}
	public cleanup(): void {
		this.eventListeners.forEach((cleanup) => cleanup());
		this.eventListeners = [];
		this.events = [];
	}
}
let cacheMonitorInstance: CachePerformanceMonitor | null = null;
export const getCachePerformanceMonitor = (): CachePerformanceMonitor => {
	if (!cacheMonitorInstance) {
		cacheMonitorInstance = new CachePerformanceMonitor();
	}
	return cacheMonitorInstance;
};
export const useCachePerformance = () => {
	if (typeof window === 'undefined') return null;
	const monitor = getCachePerformanceMonitor();
	return {
		monitor,
		getMetrics: () => monitor.getMetrics(),
		updateStorageUsage: () => monitor.updateStorageUsage(),
		generateSummary: () => monitor.generatePerformanceSummary(),
	};
};
export type { CachePerformanceMetrics, CacheEvent };
