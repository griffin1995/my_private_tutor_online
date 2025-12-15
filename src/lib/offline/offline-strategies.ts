import { cacheManager, type CacheEntry } from './cache-manager';
import { getFAQCategories, getFAQHero } from '@/lib/cms/cms-content';
interface OfflineStrategyOptions {
	timeout?: number;
	retries?: number;
	fallbackDelay?: number;
	cacheFirst?: boolean;
	networkFirst?: boolean;
	staleWhileRevalidate?: boolean;
}
interface OfflineResponse<T = any> {
	data: T;
	source: 'cache' | 'network' | 'fallback';
	timestamp: number;
	isStale?: boolean;
	error?: Error;
}
export interface NetworkStatus {
	online: boolean;
	effectiveType?: string;
	downlink?: number;
	rtt?: number;
	saveData?: boolean;
}
export interface SyncQueueItem {
	id: string;
	action: string;
	data: any;
	timestamp: number;
	retries: number;
	maxRetries: number;
}
class OfflineStrategies {
	private syncQueue: SyncQueueItem[] = [];
	private networkStatus: NetworkStatus = {
		online: typeof navigator !== 'undefined' ? navigator.onLine : true,
	};
	constructor() {
		this.initializeNetworkMonitoring();
		this.loadSyncQueue();
	}
	public async networkFirst<T>(
		url: string,
		fetchFunction: () => Promise<T>,
		cacheKey: string,
		options: OfflineStrategyOptions = {},
	): Promise<OfflineResponse<T>> {
		const { timeout = 5000, retries = 2 } = options;
		try {
			const networkData = await this.fetchWithTimeout(fetchFunction, timeout);
			await cacheManager.set(cacheKey, url, networkData, {
				priority: 'high',
			});
			return {
				data: networkData,
				source: 'network',
				timestamp: Date.now(),
			};
		} catch (networkError) {
			console.warn(
				`🌐 Network request failed for ${url}, falling back to cache:`,
				networkError,
			);
			const cacheEntry = await cacheManager.get(cacheKey, url);
			if (cacheEntry) {
				return {
					data: cacheEntry.data,
					source: 'cache',
					timestamp: cacheEntry.timestamp,
					isStale: this.isStale(cacheEntry, 24 * 60 * 60 * 1000),
				};
			}
			throw new Error(`No cached data available for ${url}`);
		}
	}
	public async cacheFirst<T>(
		url: string,
		fetchFunction: () => Promise<T>,
		cacheKey: string,
		options: OfflineStrategyOptions = {},
	): Promise<OfflineResponse<T>> {
		const cacheEntry = await cacheManager.get(cacheKey, url);
		if (cacheEntry && !this.isStale(cacheEntry, 7 * 24 * 60 * 60 * 1000)) {
			return {
				data: cacheEntry.data,
				source: 'cache',
				timestamp: cacheEntry.timestamp,
			};
		}
		try {
			const networkData = await fetchFunction();
			await cacheManager.set(cacheKey, url, networkData, {
				priority: 'normal',
			});
			return {
				data: networkData,
				source: 'network',
				timestamp: Date.now(),
			};
		} catch (networkError) {
			if (cacheEntry) {
				return {
					data: cacheEntry.data,
					source: 'cache',
					timestamp: cacheEntry.timestamp,
					isStale: true,
					error: networkError as Error,
				};
			}
			throw networkError;
		}
	}
	public async staleWhileRevalidate<T>(
		url: string,
		fetchFunction: () => Promise<T>,
		cacheKey: string,
		options: OfflineStrategyOptions = {},
	): Promise<OfflineResponse<T>> {
		const cacheEntry = await cacheManager.get(cacheKey, url);
		const networkPromise = this.updateCacheInBackground(
			url,
			fetchFunction,
			cacheKey,
		);
		if (cacheEntry) {
			const response: OfflineResponse<T> = {
				data: cacheEntry.data,
				source: 'cache',
				timestamp: cacheEntry.timestamp,
				isStale: this.isStale(cacheEntry, 60 * 60 * 1000),
			};
			networkPromise.catch((error) => {
				console.warn('Background cache update failed:', error);
			});
			return response;
		} else {
			try {
				const networkData = await fetchFunction();
				await cacheManager.set(cacheKey, url, networkData, {
					priority: 'normal',
				});
				return {
					data: networkData,
					source: 'network',
					timestamp: Date.now(),
				};
			} catch (error) {
				throw new Error(`No cached data and network request failed for ${url}`);
			}
		}
	}
	public async preloadFAQContent(): Promise<void> {
		try {
			console.log('📦 Preloading FAQ content for offline access...');
			const [categories, hero] = await Promise.allSettled([
				this.cacheFirst('/faq/categories', getFAQCategories, 'FAQ_CONTENT'),
				this.cacheFirst('/faq/hero', getFAQHero, 'FAQ_CONTENT'),
			]);
			if (categories.status === 'fulfilled') {
				const categoryData = categories.value.data;
				const questionPromises = categoryData.flatMap((category: any) =>
					category.questions.map((question: any) =>
						this.cacheFirst(
							`/faq/question/${question.id}`,
							() => Promise.resolve(question),
							'FAQ_CONTENT',
						).catch((error) => {
							console.warn(`Failed to preload question ${question.id}:`, error);
						}),
					),
				);
				await Promise.allSettled(questionPromises);
			}
			console.log('✅ FAQ content preloading completed');
		} catch (error) {
			console.error('❌ FAQ content preloading failed:', error);
		}
	}
	public async queueForSync(
		action: string,
		data: any,
		options: {
			maxRetries?: number;
		} = {},
	): Promise<string> {
		const syncItem: SyncQueueItem = {
			id: this.generateId(),
			action,
			data,
			timestamp: Date.now(),
			retries: 0,
			maxRetries: options.maxRetries || 3,
		};
		this.syncQueue.push(syncItem);
		await this.saveSyncQueue();
		if (this.networkStatus.online) {
			this.processSyncQueue();
		}
		return syncItem.id;
	}
	public async processSyncQueue(): Promise<void> {
		if (!this.networkStatus.online || this.syncQueue.length === 0) {
			return;
		}
		console.log(`🔄 Processing ${this.syncQueue.length} items in sync queue`);
		const itemsToProcess = [...this.syncQueue];
		this.syncQueue = [];
		for (const item of itemsToProcess) {
			try {
				await this.processsyncItem(item);
				console.log(`✅ Sync completed for action: ${item.action}`);
			} catch (error) {
				console.warn(`⚠️ Sync failed for action: ${item.action}`, error);
				item.retries++;
				if (item.retries < item.maxRetries) {
					this.syncQueue.push(item);
				} else {
					console.error(`❌ Max retries exceeded for action: ${item.action}`);
				}
			}
		}
		await this.saveSyncQueue();
	}
	public getNetworkStatus(): NetworkStatus {
		return {
			...this.networkStatus,
		};
	}
	public async warmCache(
		urls: string[],
		priority: 'high' | 'normal' | 'low' = 'normal',
	): Promise<void> {
		const batchSize =
			priority === 'high' ? 5
			: priority === 'normal' ? 3
			: 1;
		for (let i = 0; i < urls.length; i += batchSize) {
			const batch = urls.slice(i, i + batchSize);
			await Promise.allSettled(
				batch.map(async (url) => {
					try {
						const response = await fetch(url);
						if (response.ok) {
							await cacheManager.set('FAQ_CONTENT', url, await response.json(), {
								priority,
							});
						}
					} catch (error) {
						console.warn(`Failed to warm cache for ${url}:`, error);
					}
				}),
			);
			if (i + batchSize < urls.length) {
				await new Promise((resolve) =>
					setTimeout(resolve, priority === 'high' ? 100 : 500),
				);
			}
		}
	}
	private async fetchWithTimeout<T>(
		fetchFunction: () => Promise<T>,
		timeout: number,
	): Promise<T> {
		return Promise.race([
			fetchFunction(),
			new Promise<never>((_, reject) =>
				setTimeout(() => reject(new Error('Request timeout')), timeout),
			),
		]);
	}
	private async updateCacheInBackground<T>(
		url: string,
		fetchFunction: () => Promise<T>,
		cacheKey: string,
	): Promise<void> {
		try {
			const networkData = await fetchFunction();
			await cacheManager.set(cacheKey, url, networkData, {
				priority: 'normal',
			});
		} catch (error) {
			console.warn(`Background cache update failed for ${url}:`, error);
		}
	}
	private isStale(cacheEntry: CacheEntry, maxAge: number): boolean {
		return Date.now() - cacheEntry.timestamp > maxAge;
	}
	private initializeNetworkMonitoring(): void {
		if (typeof window === 'undefined') {
			return;
		}
		window.addEventListener('online', () => {
			this.networkStatus.online = true;
			console.log('🌐 Network: Back online, processing sync queue');
			this.processSyncQueue();
		});
		window.addEventListener('offline', () => {
			this.networkStatus.online = false;
			console.log('📡 Network: Gone offline, switching to cache-only mode');
		});
		if (typeof navigator !== 'undefined' && 'connection' in navigator) {
			const connection = (navigator as any).connection;
			const updateConnectionInfo = () => {
				this.networkStatus.effectiveType = connection.effectiveType;
				this.networkStatus.downlink = connection.downlink;
				this.networkStatus.rtt = connection.rtt;
				this.networkStatus.saveData = connection.saveData;
			};
			updateConnectionInfo();
			connection.addEventListener('change', updateConnectionInfo);
		}
	}
	private async processyncItem(item: SyncQueueItem): Promise<void> {
		switch (item.action) {
			case 'faq_rating':
				await this.syncFAQRating(item.data);
				break;
			case 'faq_feedback':
				await this.syncFAQFeedback(item.data);
				break;
			case 'user_preferences':
				await this.syncUserPreferences(item.data);
				break;
			case 'analytics_event':
				await this.syncAnalyticsEvent(item.data);
				break;
			default:
				throw new Error(`Unknown sync action: ${item.action}`);
		}
	}
	private async syncFAQRating(data: any): Promise<void> {
		const response = await fetch('/api/faq/rating', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error(`Rating sync failed: ${response.statusText}`);
		}
	}
	private async syncFAQFeedback(data: any): Promise<void> {
		const response = await fetch('/api/faq/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error(`Feedback sync failed: ${response.statusText}`);
		}
	}
	private async syncUserPreferences(data: any): Promise<void> {
		const response = await fetch('/api/user/preferences', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error(`Preferences sync failed: ${response.statusText}`);
		}
	}
	private async syncAnalyticsEvent(data: any): Promise<void> {
		if (typeof gtag !== 'undefined') {
			gtag('event', data.event_name, data.parameters);
		}
	}
	private generateId(): string {
		return `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}
	private async loadSyncQueue(): Promise<void> {
		try {
			if (typeof localStorage === 'undefined') {
				return;
			}
			const stored = localStorage.getItem('offline_sync_queue');
			if (stored) {
				this.syncQueue = JSON.parse(stored);
			}
		} catch (error) {
			console.warn('Failed to load sync queue from storage:', error);
			this.syncQueue = [];
		}
	}
	private async saveSyncQueue(): Promise<void> {
		try {
			if (typeof localStorage === 'undefined') {
				return;
			}
			localStorage.setItem('offline_sync_queue', JSON.stringify(this.syncQueue));
		} catch (error) {
			console.warn('Failed to save sync queue to storage:', error);
		}
	}
}
export const offlineStrategies = new OfflineStrategies();
