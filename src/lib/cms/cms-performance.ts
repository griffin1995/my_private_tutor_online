import { cache } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TestimonialsPageContent } from './testimonials-cms-manager';
export interface PerformanceMetrics {
	readonly loadTime: number;
	readonly cacheHitRate: number;
	readonly bundleSize: number;
	readonly renderTime: number;
	readonly contentSize: number;
	readonly optimizationScore: number;
	readonly timestamp: number;
}
export interface CacheEntry<T = any> {
	readonly data: T;
	readonly timestamp: number;
	readonly expiry: number;
	readonly accessCount: number;
	readonly lastAccessed: number;
	readonly size: number;
}
export interface PerformanceConfig {
	readonly cacheExpiry: number;
	readonly maxCacheSize: number;
	readonly preloadThreshold: number;
	readonly lazyLoadThreshold: number;
	readonly compressionEnabled: boolean;
	readonly metricsEnabled: boolean;
}
const DEFAULT_PERFORMANCE_CONFIG: PerformanceConfig = {
	cacheExpiry: 15 * 60 * 1000,
	maxCacheSize: 5 * 1024 * 1024,
	preloadThreshold: 2000,
	lazyLoadThreshold: 500,
	compressionEnabled: true,
	metricsEnabled: true,
};
interface PerformanceStore {
	cache: Map<string, CacheEntry>;
	metrics: PerformanceMetrics[];
	config: PerformanceConfig;
	setCache: <T>(key: string, data: T, customExpiry?: number) => void;
	getCache: <T>(key: string) => T | null;
	clearCache: (key?: string) => void;
	getCacheStats: () => {
		size: number;
		entries: number;
		hitRate: number;
		totalSize: number;
	};
	recordMetric: (metric: PerformanceMetrics) => void;
	getAverageMetrics: (timeWindow?: number) => PerformanceMetrics | null;
	clearMetrics: () => void;
	updateConfig: (config: Partial<PerformanceConfig>) => void;
}
const usePerformanceStore = create<PerformanceStore>()(
	persist(
		(set, get) => ({
			cache: new Map(),
			metrics: [],
			config: DEFAULT_PERFORMANCE_CONFIG,
			setCache: <T>(key: string, data: T, customExpiry?: number) => {
				const now = Date.now();
				const config = get().config;
				const expiry = now + (customExpiry || config.cacheExpiry);
				const size = calculateDataSize(data);
				const entry: CacheEntry<T> = {
					data,
					timestamp: now,
					expiry,
					accessCount: 0,
					lastAccessed: now,
					size,
				};
				set((state) => {
					const newCache = new Map(state.cache);
					let totalSize = size;
					for (const [, value] of newCache) {
						totalSize += value.size;
					}
					while (totalSize > config.maxCacheSize && newCache.size > 0) {
						const oldestKey = findOldestCacheEntry(newCache);
						if (oldestKey) {
							const removedEntry = newCache.get(oldestKey);
							if (removedEntry) {
								totalSize -= removedEntry.size;
							}
							newCache.delete(oldestKey);
						} else {
							break;
						}
					}
					newCache.set(key, entry);
					return {
						cache: newCache,
					};
				});
			},
			getCache: <T>(key: string): T | null => {
				const cache = get().cache;
				const entry = cache.get(key) as CacheEntry<T> | undefined;
				if (!entry) return null;
				const now = Date.now();
				if (now > entry.expiry) {
					set((state) => {
						const newCache = new Map(state.cache);
						newCache.delete(key);
						return {
							cache: newCache,
						};
					});
					return null;
				}
				set((state) => {
					const newCache = new Map(state.cache);
					const updatedEntry = {
						...entry,
						accessCount: entry.accessCount + 1,
						lastAccessed: now,
					};
					newCache.set(key, updatedEntry);
					return {
						cache: newCache,
					};
				});
				return entry.data;
			},
			clearCache: (key?: string) => {
				set((state) => {
					if (key) {
						const newCache = new Map(state.cache);
						newCache.delete(key);
						return {
							cache: newCache,
						};
					} else {
						return {
							cache: new Map(),
						};
					}
				});
			},
			getCacheStats: () => {
				const cache = get().cache;
				let totalHits = 0;
				let totalAccesses = 0;
				let totalSize = 0;
				for (const [, entry] of cache) {
					totalHits += entry.accessCount;
					totalAccesses += entry.accessCount > 0 ? 1 : 0;
					totalSize += entry.size;
				}
				return {
					size: cache.size,
					entries: cache.size,
					hitRate: totalAccesses > 0 ? totalHits / totalAccesses : 0,
					totalSize,
				};
			},
			recordMetric: (metric: PerformanceMetrics) => {
				set((state) => {
					const newMetrics = [...state.metrics, metric];
					return {
						metrics: newMetrics.slice(-100),
					};
				});
			},
			getAverageMetrics: (
				timeWindow = 5 * 60 * 1000,
			): PerformanceMetrics | null => {
				const now = Date.now();
				const metrics = get().metrics.filter(
					(m) => now - m.timestamp <= timeWindow,
				);
				if (metrics.length === 0) return null;
				const avg = metrics.reduce(
					(acc, m) => ({
						loadTime: acc.loadTime + m.loadTime,
						cacheHitRate: acc.cacheHitRate + m.cacheHitRate,
						bundleSize: acc.bundleSize + m.bundleSize,
						renderTime: acc.renderTime + m.renderTime,
						contentSize: acc.contentSize + m.contentSize,
						optimizationScore: acc.optimizationScore + m.optimizationScore,
						timestamp: Math.max(acc.timestamp, m.timestamp),
					}),
					{
						loadTime: 0,
						cacheHitRate: 0,
						bundleSize: 0,
						renderTime: 0,
						contentSize: 0,
						optimizationScore: 0,
						timestamp: 0,
					},
				);
				const count = metrics.length;
				return {
					loadTime: avg.loadTime / count,
					cacheHitRate: avg.cacheHitRate / count,
					bundleSize: avg.bundleSize / count,
					renderTime: avg.renderTime / count,
					contentSize: avg.contentSize / count,
					optimizationScore: avg.optimizationScore / count,
					timestamp: avg.timestamp,
				};
			},
			clearMetrics: () => {
				set({
					metrics: [],
				});
			},
			updateConfig: (configUpdate: Partial<PerformanceConfig>) => {
				set((state) => ({
					config: {
						...state.config,
						...configUpdate,
					},
				}));
			},
		}),
		{
			name: 'cms-performance-storage',
			partialize: (state) => ({
				metrics: state.metrics.slice(-10),
				config: state.config,
			}),
		},
	),
);
export class CMSPerformanceManager {
	private store = usePerformanceStore;
	public getCachedContent = cache(
		<T>(
			key: string,
			fetcher: () => T | Promise<T>,
			expiry?: number,
		): Promise<T> => {
			return this.withPerformanceTracking(`cache-${key}`, async () => {
				const startTime = performance.now();
				const cached = this.store.getState().getCache<T>(key);
				if (cached) {
					return cached;
				}
				const data = await Promise.resolve(fetcher());
				const loadTime = performance.now() - startTime;
				this.store.getState().setCache(key, data, expiry);
				this.recordCacheMetric(key, loadTime, false);
				return data;
			});
		},
	);
	public async preloadContent(
		sections: Array<{
			key: string;
			fetcher: () => any | Promise<any>;
			priority?: 'high' | 'low';
		}>,
	): Promise<void> {
		const startTime = performance.now();
		const sortedSections = sections.sort(
			(a, b) => (a.priority === 'high' ? 0 : 1) - (b.priority === 'high' ? 0 : 1),
		);
		const highPriority = sortedSections.filter((s) => s.priority === 'high');
		const lowPriority = sortedSections.filter((s) => s.priority !== 'high');
		if (highPriority.length > 0) {
			await Promise.all(
				highPriority.map((section) =>
					this.getCachedContent(section.key, section.fetcher),
				),
			);
		}
		if (lowPriority.length > 0) {
			setTimeout(() => {
				Promise.all(
					lowPriority.map((section) =>
						this.getCachedContent(section.key, section.fetcher),
					),
				);
			}, 100);
		}
		const preloadTime = performance.now() - startTime;
		this.recordMetric({
			loadTime: preloadTime,
			cacheHitRate: this.getCacheHitRate(),
			bundleSize: 0,
			renderTime: 0,
			contentSize: 0,
			optimizationScore:
				preloadTime < 200 ? 100 : Math.max(0, 100 - preloadTime / 5),
			timestamp: Date.now(),
		});
	}
	public createLazyLoader<T>(
		key: string,
		fetcher: () => T | Promise<T>,
		options: {
			threshold?: number;
			rootMargin?: string;
			enabled?: boolean;
		} = {},
	) {
		const { threshold = 0.1, rootMargin = '0px', enabled = true } = options;
		if (!enabled || typeof IntersectionObserver === 'undefined') {
			return fetcher;
		}
		return () => {
			return new Promise<T>((resolve, reject) => {
				const cached = this.store.getState().getCache<T>(key);
				if (cached) {
					resolve(cached);
					return;
				}
				const observer = new IntersectionObserver(
					async (entries) => {
						const entry = entries[0];
						if (entry.isIntersecting) {
							observer.disconnect();
							try {
								const data = await this.getCachedContent(key, fetcher);
								resolve(data);
							} catch (error) {
								reject(error);
							}
						}
					},
					{
						threshold,
						rootMargin,
					},
				);
				this.getCachedContent(key, fetcher).then(resolve).catch(reject);
			});
		};
	}
	public optimizeContent<T>(content: T): T {
		if (!content) return content;
		if (typeof content === 'object' && content !== null) {
			return this.compressContent(content as any) as T;
		}
		return content;
	}
	public getPerformanceMetrics(): PerformanceMetrics | null {
		return this.store.getState().getAverageMetrics();
	}
	public getCacheStats() {
		return this.store.getState().getCacheStats();
	}
	public clearCache(key?: string): void {
		this.store.getState().clearCache(key);
	}
	public updateConfig(config: Partial<PerformanceConfig>): void {
		this.store.getState().updateConfig(config);
	}
	private async withPerformanceTracking<T>(
		operation: string,
		fn: () => Promise<T>,
	): Promise<T> {
		const startTime = performance.now();
		try {
			const result = await fn();
			const duration = performance.now() - startTime;
			this.recordMetric({
				loadTime: duration,
				cacheHitRate: this.getCacheHitRate(),
				bundleSize: calculateDataSize(result),
				renderTime: 0,
				contentSize: calculateDataSize(result),
				optimizationScore: duration < 100 ? 100 : Math.max(0, 100 - duration / 10),
				timestamp: Date.now(),
			});
			return result;
		} catch (error) {
			const duration = performance.now() - startTime;
			this.recordMetric({
				loadTime: duration,
				cacheHitRate: this.getCacheHitRate(),
				bundleSize: 0,
				renderTime: 0,
				contentSize: 0,
				optimizationScore: 0,
				timestamp: Date.now(),
			});
			throw error;
		}
	}
	private recordMetric(metric: PerformanceMetrics): void {
		const config = this.store.getState().config;
		if (config.metricsEnabled) {
			this.store.getState().recordMetric(metric);
		}
	}
	private recordCacheMetric(key: string, loadTime: number, hit: boolean): void {
		this.recordMetric({
			loadTime,
			cacheHitRate: hit ? 1 : 0,
			bundleSize: 0,
			renderTime: 0,
			contentSize: 0,
			optimizationScore: loadTime < 50 ? 100 : Math.max(0, 100 - loadTime / 5),
			timestamp: Date.now(),
		});
	}
	private getCacheHitRate(): number {
		return this.store.getState().getCacheStats().hitRate;
	}
	private compressContent(content: any): any {
		if (!this.store.getState().config.compressionEnabled) {
			return content;
		}
		if (Array.isArray(content)) {
			return content.map((item) => this.compressContent(item));
		}
		if (typeof content === 'object' && content !== null) {
			const optimized: any = {};
			for (const [key, value] of Object.entries(content)) {
				if (value !== undefined) {
					optimized[key] = this.compressContent(value);
				}
			}
			return optimized;
		}
		return content;
	}
}
function calculateDataSize(data: any): number {
	try {
		return new Blob([JSON.stringify(data)]).size;
	} catch {
		return 0;
	}
}
function findOldestCacheEntry(cache: Map<string, CacheEntry>): string | null {
	let oldestKey: string | null = null;
	let oldestTime = Date.now();
	for (const [key, entry] of cache) {
		if (entry.lastAccessed < oldestTime) {
			oldestTime = entry.lastAccessed;
			oldestKey = key;
		}
	}
	return oldestKey;
}
export const cmsPerformanceManager = new CMSPerformanceManager();
export { usePerformanceStore };
export function useCMSPerformance() {
	const store = usePerformanceStore();
	return {
		manager: cmsPerformanceManager,
		metrics: store.getAverageMetrics(),
		cacheStats: store.getCacheStats(),
		config: store.config,
		updateConfig: store.updateConfig,
		clearCache: store.clearCache,
	};
}
