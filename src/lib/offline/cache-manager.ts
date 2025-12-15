interface CacheConfig {
	name: string;
	version: string;
	maxEntries: number;
	maxAgeSeconds: number;
	strategy: 'cache-first' | 'network-first' | 'stale-while-revalidate';
}
export interface CacheEntry {
	url: string;
	data: any;
	timestamp: number;
	version: string;
	size: number;
}
interface CacheStats {
	totalSize: number;
	entryCount: number;
	lastAccessed: number;
	hitRate: number;
	missRate: number;
}
interface OfflineCacheManifest {
	faqCategories: CacheEntry[];
	faqQuestions: CacheEntry[];
	searchIndex: CacheEntry[];
	userPreferences: CacheEntry[];
	assets: CacheEntry[];
}
const CACHE_CONFIGS: Record<string, CacheConfig> = {
	FAQ_CONTENT: {
		name: 'faq-content-v1',
		version: '1.0.0',
		maxEntries: 500,
		maxAgeSeconds: 7 * 24 * 60 * 60,
		strategy: 'stale-while-revalidate',
	},
	FAQ_SEARCH: {
		name: 'faq-search-v1',
		version: '1.0.0',
		maxEntries: 100,
		maxAgeSeconds: 24 * 60 * 60,
		strategy: 'cache-first',
	},
	FAQ_ASSETS: {
		name: 'faq-assets-v1',
		version: '1.0.0',
		maxEntries: 1000,
		maxAgeSeconds: 30 * 24 * 60 * 60,
		strategy: 'cache-first',
	},
	USER_PREFS: {
		name: 'user-preferences-v1',
		version: '1.0.0',
		maxEntries: 50,
		maxAgeSeconds: 365 * 24 * 60 * 60,
		strategy: 'cache-first',
	},
};
export class CacheManager {
	private static instance: CacheManager;
	private caches: Map<string, Cache> = new Map();
	private stats: Map<string, CacheStats> = new Map();
	private constructor() {
		this.initializeStats();
	}
	public static getInstance(): CacheManager {
		if (!CacheManager.instance) {
			CacheManager.instance = new CacheManager();
		}
		return CacheManager.instance;
	}
	public async initializeCaches(): Promise<void> {
		try {
			if (typeof caches === 'undefined') {
				console.warn(
					'Cache API not available during SSR - skipping cache initialization',
				);
				return;
			}
			for (const [key, config] of Object.entries(CACHE_CONFIGS)) {
				const cache = await caches.open(config.name);
				this.caches.set(key, cache);
				if (!this.stats.has(key)) {
					this.stats.set(key, {
						totalSize: 0,
						entryCount: 0,
						lastAccessed: Date.now(),
						hitRate: 0,
						missRate: 0,
					});
				}
			}
			await this.cleanupOldCaches();
			console.log('📦 Cache Manager: All caches initialized successfully');
		} catch (error) {
			console.error('❌ Cache Manager: Failed to initialize caches:', error);
			throw new Error('Cache initialization failed');
		}
	}
	public async set(
		cacheKey: string,
		url: string,
		data: any,
		options: {
			compress?: boolean;
			priority?: 'high' | 'normal' | 'low';
		} = {},
	): Promise<boolean> {
		try {
			const config = CACHE_CONFIGS[cacheKey];
			if (!config) {
				throw new Error(`Cache configuration not found for: ${cacheKey}`);
			}
			const cache = this.caches.get(cacheKey);
			if (!cache) {
				await this.initializeCaches();
				return this.set(cacheKey, url, data, options);
			}
			const cacheEntry: CacheEntry = {
				url,
				data,
				timestamp: Date.now(),
				version: config.version,
				size: this.calculateSize(data),
			};
			const response = new Response(JSON.stringify(cacheEntry), {
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': `max-age=${config.maxAgeSeconds}`,
					'X-Cache-Version': config.version,
					'X-Cache-Priority': options.priority || 'normal',
					'X-Cache-Timestamp': cacheEntry.timestamp.toString(),
				},
			});
			await cache.put(url, response);
			this.updateStats(cacheKey, 'set', cacheEntry.size);
			await this.enforceQuotas(cacheKey);
			return true;
		} catch (error) {
			console.error(
				`❌ Cache Manager: Failed to set cache entry for ${url}:`,
				error,
			);
			return false;
		}
	}
	public async get(cacheKey: string, url: string): Promise<CacheEntry | null> {
		try {
			const config = CACHE_CONFIGS[cacheKey];
			if (!config) {
				return null;
			}
			const cache = this.caches.get(cacheKey);
			if (!cache) {
				await this.initializeCaches();
				return this.get(cacheKey, url);
			}
			const response = await cache.match(url);
			if (!response) {
				this.updateStats(cacheKey, 'miss', 0);
				return null;
			}
			const cacheEntry: CacheEntry = await response.json();
			const isExpired =
				Date.now() - cacheEntry.timestamp > config.maxAgeSeconds * 1000;
			const isVersionMismatch = cacheEntry.version !== config.version;
			if (isExpired || isVersionMismatch) {
				await cache.delete(url);
				this.updateStats(cacheKey, 'expired', -cacheEntry.size);
				return null;
			}
			this.updateStats(cacheKey, 'hit', 0);
			return cacheEntry;
		} catch (error) {
			console.error(
				`❌ Cache Manager: Failed to get cache entry for ${url}:`,
				error,
			);
			this.updateStats(cacheKey, 'miss', 0);
			return null;
		}
	}
	public async delete(cacheKey: string, url: string): Promise<boolean> {
		try {
			const cache = this.caches.get(cacheKey);
			if (!cache) {
				return false;
			}
			const success = await cache.delete(url);
			if (success) {
				this.updateStats(cacheKey, 'delete', 0);
			}
			return success;
		} catch (error) {
			console.error(
				`❌ Cache Manager: Failed to delete cache entry for ${url}:`,
				error,
			);
			return false;
		}
	}
	public async clear(cacheKey?: string): Promise<boolean> {
		try {
			if (cacheKey) {
				const cache = this.caches.get(cacheKey);
				if (cache) {
					const keys = await cache.keys();
					await Promise.all(keys.map((key) => cache.delete(key)));
					this.resetStats(cacheKey);
					console.log(`🧹 Cache Manager: Cleared cache ${cacheKey}`);
				}
			} else {
				for (const [key, cache] of this.caches.entries()) {
					const keys = await cache.keys();
					await Promise.all(keys.map((key) => cache.delete(key)));
					this.resetStats(key);
				}
				console.log('🧹 Cache Manager: Cleared all caches');
			}
			return true;
		} catch (error) {
			console.error('❌ Cache Manager: Failed to clear cache:', error);
			return false;
		}
	}
	public async getStorageEstimate(): Promise<StorageEstimate> {
		try {
			if ('storage' in navigator && 'estimate' in navigator.storage) {
				return await navigator.storage.estimate();
			}
			return {
				usage: 0,
				quota: 50 * 1024 * 1024,
			};
		} catch (error) {
			console.error('❌ Cache Manager: Failed to get storage estimate:', error);
			return {
				usage: 0,
				quota: 0,
			};
		}
	}
	public getStats(cacheKey?: string): CacheStats | Map<string, CacheStats> {
		if (cacheKey) {
			return (
				this.stats.get(cacheKey) || {
					totalSize: 0,
					entryCount: 0,
					lastAccessed: 0,
					hitRate: 0,
					missRate: 0,
				}
			);
		}
		return new Map(this.stats);
	}
	public async maintenance(): Promise<void> {
		try {
			console.log('🔧 Cache Manager: Starting maintenance routine');
			await this.cleanupExpiredEntries();
			for (const cacheKey of Object.keys(CACHE_CONFIGS)) {
				await this.enforceQuotas(cacheKey);
			}
			await this.updateAllStats();
			console.log('✅ Cache Manager: Maintenance completed');
		} catch (error) {
			console.error('❌ Cache Manager: Maintenance failed:', error);
		}
	}
	private initializeStats(): void {
		for (const key of Object.keys(CACHE_CONFIGS)) {
			this.stats.set(key, {
				totalSize: 0,
				entryCount: 0,
				lastAccessed: Date.now(),
				hitRate: 0,
				missRate: 0,
			});
		}
	}
	private updateStats(
		cacheKey: string,
		operation: 'hit' | 'miss' | 'set' | 'delete' | 'expired',
		sizeChange: number,
	): void {
		const stats = this.stats.get(cacheKey);
		if (!stats) return;
		stats.lastAccessed = Date.now();
		stats.totalSize += sizeChange;
		switch (operation) {
			case 'hit':
				stats.hitRate = stats.hitRate * 0.9 + 1 * 0.1;
				break;
			case 'miss':
				stats.missRate = stats.missRate * 0.9 + 1 * 0.1;
				break;
			case 'set':
				stats.entryCount += 1;
				break;
			case 'delete':
			case 'expired':
				stats.entryCount = Math.max(0, stats.entryCount - 1);
				break;
		}
		this.stats.set(cacheKey, stats);
	}
	private resetStats(cacheKey: string): void {
		this.stats.set(cacheKey, {
			totalSize: 0,
			entryCount: 0,
			lastAccessed: Date.now(),
			hitRate: 0,
			missRate: 0,
		});
	}
	private calculateSize(data: any): number {
		try {
			return new Blob([JSON.stringify(data)]).size;
		} catch {
			return JSON.stringify(data).length * 2;
		}
	}
	private async cleanupOldCaches(): Promise<void> {
		const cacheNames = await caches.keys();
		const currentCacheNames = Object.values(CACHE_CONFIGS).map(
			(config) => config.name,
		);
		const oldCaches = cacheNames.filter(
			(name) => !currentCacheNames.includes(name),
		);
		await Promise.all(oldCaches.map((cacheName) => caches.delete(cacheName)));
		if (oldCaches.length > 0) {
			console.log(`🧹 Cache Manager: Cleaned up ${oldCaches.length} old cache(s)`);
		}
	}
	private async cleanupExpiredEntries(): Promise<void> {
		for (const [cacheKey, cache] of this.caches.entries()) {
			const config = CACHE_CONFIGS[cacheKey];
			if (!config) continue;
			const keys = await cache.keys();
			const now = Date.now();
			for (const request of keys) {
				const response = await cache.match(request);
				if (!response) continue;
				try {
					const cacheEntry: CacheEntry = await response.json();
					const isExpired = now - cacheEntry.timestamp > config.maxAgeSeconds * 1000;
					if (isExpired) {
						await cache.delete(request);
						this.updateStats(cacheKey, 'expired', -cacheEntry.size);
					}
				} catch {
					await cache.delete(request);
				}
			}
		}
	}
	private async enforceQuotas(cacheKey: string): Promise<void> {
		const config = CACHE_CONFIGS[cacheKey];
		const cache = this.caches.get(cacheKey);
		if (!config || !cache) return;
		const keys = await cache.keys();
		if (keys.length <= config.maxEntries) return;
		const entries: Array<{
			request: Request;
			timestamp: number;
		}> = [];
		for (const request of keys) {
			const response = await cache.match(request);
			if (response) {
				try {
					const cacheEntry: CacheEntry = await response.json();
					entries.push({
						request,
						timestamp: cacheEntry.timestamp,
					});
				} catch {
					entries.push({
						request,
						timestamp: 0,
					});
				}
			}
		}
		entries.sort((a, b) => a.timestamp - b.timestamp);
		const entriesToRemove = entries.slice(0, entries.length - config.maxEntries);
		for (const entry of entriesToRemove) {
			await cache.delete(entry.request);
			this.updateStats(cacheKey, 'delete', 0);
		}
	}
	private async updateAllStats(): Promise<void> {
		for (const [cacheKey, cache] of this.caches.entries()) {
			const keys = await cache.keys();
			let totalSize = 0;
			for (const request of keys) {
				const response = await cache.match(request);
				if (response) {
					try {
						const cacheEntry: CacheEntry = await response.json();
						totalSize += cacheEntry.size;
					} catch {}
				}
			}
			const stats = this.stats.get(cacheKey);
			if (stats) {
				stats.totalSize = totalSize;
				stats.entryCount = keys.length;
				this.stats.set(cacheKey, stats);
			}
		}
	}
}
export const cacheManager = CacheManager.getInstance();
