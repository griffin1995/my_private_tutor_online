'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
	offlineStrategies,
	NetworkStatus,
	SyncQueueItem,
} from '@/lib/offline/offline-strategies';
import { cacheManager } from '@/lib/offline/cache-manager';
export interface OfflineState {
	isOnline: boolean;
	wasOffline: boolean;
	connectionQuality: 'fast' | 'slow' | 'poor' | 'unknown';
	networkType: string;
	lastOnline: Date | null;
	syncPending: boolean;
	syncQueueSize: number;
	cacheSize: number;
	dataFreshness: 'fresh' | 'stale' | 'unknown';
}
export interface OfflineOptions {
	enablePersistence?: boolean;
	enableSyncQueue?: boolean;
	enableConnectionMonitoring?: boolean;
	syncInterval?: number;
	cacheRefreshInterval?: number;
	onOnline?: () => void;
	onOffline?: () => void;
	onSyncComplete?: (results: any[]) => void;
	onSyncError?: (error: Error) => void;
}
export interface OfflineActions {
	queueForSync: (action: string, data: any) => Promise<string>;
	forcSync: () => Promise<void>;
	clearCache: (cacheKey?: string) => Promise<boolean>;
	refreshCache: () => Promise<void>;
	checkDataFreshness: () => Promise<'fresh' | 'stale' | 'unknown'>;
	preloadContent: () => Promise<void>;
	getNetworkInfo: () => NetworkStatus;
	getCacheStats: () => any;
}
export interface UseOfflineReturn {
	state: OfflineState;
	actions: OfflineActions;
}
export function useOffline(options: OfflineOptions = {}): UseOfflineReturn {
	const {
		enablePersistence = true,
		enableSyncQueue = true,
		enableConnectionMonitoring = true,
		syncInterval = 30000,
		cacheRefreshInterval = 300000,
		onOnline,
		onOffline,
		onSyncComplete,
		onSyncError,
	} = options;
	const [state, setState] = useState<OfflineState>({
		isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
		wasOffline: false,
		connectionQuality: 'unknown',
		networkType: 'unknown',
		lastOnline: null,
		syncPending: false,
		syncQueueSize: 0,
		cacheSize: 0,
		dataFreshness: 'unknown',
	});
	const syncIntervalRef = useRef<NodeJS.Timeout>();
	const cacheRefreshIntervalRef = useRef<NodeJS.Timeout>();
	const lastSyncAttempt = useRef<number>(0);
	const eventListenersAttached = useRef<boolean>(false);
	const updateNetworkStatus = useCallback(() => {
		const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
		const networkStatus = offlineStrategies.getNetworkStatus();
		let connectionQuality: 'fast' | 'slow' | 'poor' | 'unknown' = 'unknown';
		if (networkStatus.effectiveType) {
			switch (networkStatus.effectiveType) {
				case '4g':
					connectionQuality = 'fast';
					break;
				case '3g':
					connectionQuality = 'slow';
					break;
				case '2g':
				case 'slow-2g':
					connectionQuality = 'poor';
					break;
				default:
					connectionQuality = 'unknown';
			}
		}
		setState((prevState) => ({
			...prevState,
			isOnline,
			wasOffline: !isOnline && prevState.isOnline,
			connectionQuality,
			networkType: networkStatus.effectiveType || 'unknown',
			lastOnline: isOnline ? new Date() : prevState.lastOnline,
		}));
		if (isOnline && !state.isOnline) {
			onOnline?.();
			handleOnlineTransition();
		} else if (!isOnline && state.isOnline) {
			onOffline?.();
		}
	}, [state.isOnline, onOnline, onOffline]);
	const updateSyncStatus = useCallback(async () => {
		try {
			const syncQueue = await getSyncQueueSize();
			const isPending = syncQueue > 0;
			setState((prevState) => ({
				...prevState,
				syncPending: isPending,
				syncQueueSize: syncQueue,
			}));
		} catch (error) {
			console.warn('Failed to update sync status:', error);
		}
	}, []);
	const updateCacheStats = useCallback(async () => {
		try {
			const stats = cacheManager.getStats();
			const totalSize = Array.from(stats as Map<string, any>).reduce(
				(total, [, stat]) => total + stat.totalSize,
				0,
			);
			setState((prevState) => ({
				...prevState,
				cacheSize: totalSize,
			}));
		} catch (error) {
			console.warn('Failed to update cache stats:', error);
		}
	}, []);
	const handleOnlineTransition = useCallback(async () => {
		if (!enableSyncQueue) return;
		const now = Date.now();
		if (now - lastSyncAttempt.current < 5000) return;
		lastSyncAttempt.current = now;
		try {
			setState((prevState) => ({
				...prevState,
				syncPending: true,
			}));
			await offlineStrategies.processSyncQueue();
			const results = await getSyncResults();
			onSyncComplete?.(results);
			await refreshCache();
		} catch (error) {
			console.error('Sync failed during online transition:', error);
			onSyncError?.(error as Error);
		} finally {
			setState((prevState) => ({
				...prevState,
				syncPending: false,
			}));
			updateSyncStatus();
		}
	}, [enableSyncQueue, onSyncComplete, onSyncError, updateSyncStatus]);
	const checkDataFreshness = useCallback(async (): Promise<
		'fresh' | 'stale' | 'unknown'
	> => {
		try {
			const faqCacheEntry = await cacheManager.get(
				'FAQ_CONTENT',
				'/faq/categories',
			);
			if (!faqCacheEntry) {
				return 'unknown';
			}
			const ageInHours = (Date.now() - faqCacheEntry.timestamp) / (1000 * 60 * 60);
			const freshness =
				ageInHours < 1 ? 'fresh'
				: ageInHours < 24 ? 'stale'
				: 'unknown';
			setState((prevState) => ({
				...prevState,
				dataFreshness: freshness,
			}));
			return freshness;
		} catch (error) {
			console.warn('Failed to check data freshness:', error);
			return 'unknown';
		}
	}, []);
	const actions: OfflineActions = {
		queueForSync: useCallback(
			async (action: string, data: any) => {
				if (!enableSyncQueue) {
					throw new Error('Sync queue is disabled');
				}
				const syncId = await offlineStrategies.queueForSync(action, data);
				updateSyncStatus();
				return syncId;
			},
			[enableSyncQueue, updateSyncStatus],
		),
		forceSync: useCallback(async () => {
			if (!state.isOnline) {
				throw new Error('Cannot sync while offline');
			}
			setState((prevState) => ({
				...prevState,
				syncPending: true,
			}));
			try {
				await offlineStrategies.processSyncQueue();
				const results = await getSyncResults();
				onSyncComplete?.(results);
			} catch (error) {
				onSyncError?.(error as Error);
				throw error;
			} finally {
				setState((prevState) => ({
					...prevState,
					syncPending: false,
				}));
				updateSyncStatus();
			}
		}, [state.isOnline, onSyncComplete, onSyncError, updateSyncStatus]),
		clearCache: useCallback(
			async (cacheKey?: string) => {
				const success = await cacheManager.clear(cacheKey);
				if (success) {
					updateCacheStats();
					setState((prevState) => ({
						...prevState,
						dataFreshness: 'unknown',
					}));
				}
				return success;
			},
			[updateCacheStats],
		),
		refreshCache: useCallback(async () => {
			try {
				await offlineStrategies.preloadFAQContent();
				updateCacheStats();
				checkDataFreshness();
			} catch (error) {
				console.error('Cache refresh failed:', error);
				throw error;
			}
		}, [updateCacheStats, checkDataFreshness]),
		checkDataFreshness,
		preloadContent: useCallback(async () => {
			await offlineStrategies.preloadFAQContent();
			updateCacheStats();
		}, [updateCacheStats]),
		getNetworkInfo: useCallback(() => {
			return offlineStrategies.getNetworkStatus();
		}, []),
		getCacheStats: useCallback(() => {
			return cacheManager.getStats();
		}, []),
	};
	useEffect(() => {
		if (typeof window !== 'undefined') {
			cacheManager.initializeCaches().catch((error) => {
				console.error('Failed to initialize caches:', error);
			});
		}
		if (
			enableConnectionMonitoring &&
			!eventListenersAttached.current &&
			typeof window !== 'undefined'
		) {
			window.addEventListener('online', updateNetworkStatus);
			window.addEventListener('offline', updateNetworkStatus);
			if (typeof navigator !== 'undefined' && 'connection' in navigator) {
				const connection = (navigator as any).connection;
				connection?.addEventListener('change', updateNetworkStatus);
			}
			eventListenersAttached.current = true;
		}
		if (enableSyncQueue && state.isOnline) {
			syncIntervalRef.current = setInterval(() => {
				if (state.isOnline && !state.syncPending) {
					offlineStrategies.processSyncQueue().catch((error) => {
						console.warn('Scheduled sync failed:', error);
					});
				}
			}, syncInterval);
		}
		cacheRefreshIntervalRef.current = setInterval(() => {
			updateCacheStats();
			checkDataFreshness();
		}, cacheRefreshInterval);
		updateNetworkStatus();
		updateSyncStatus();
		updateCacheStats();
		checkDataFreshness();
		return () => {
			if (syncIntervalRef.current) {
				clearInterval(syncIntervalRef.current);
			}
			if (cacheRefreshIntervalRef.current) {
				clearInterval(cacheRefreshIntervalRef.current);
			}
		};
	}, [
		enableConnectionMonitoring,
		enableSyncQueue,
		state.isOnline,
		state.syncPending,
		syncInterval,
		cacheRefreshInterval,
		updateNetworkStatus,
		updateSyncStatus,
		updateCacheStats,
		checkDataFreshness,
	]);
	useEffect(() => {
		return () => {
			if (eventListenersAttached.current && typeof window !== 'undefined') {
				window.removeEventListener('online', updateNetworkStatus);
				window.removeEventListener('offline', updateNetworkStatus);
				if (typeof navigator !== 'undefined' && 'connection' in navigator) {
					const connection = (navigator as any).connection;
					connection?.removeEventListener('change', updateNetworkStatus);
				}
				eventListenersAttached.current = false;
			}
		};
	}, [updateNetworkStatus]);
	return {
		state,
		actions,
	};
}
async function getSyncQueueSize(): Promise<number> {
	try {
		const stored = localStorage.getItem('offline_sync_queue');
		if (stored) {
			const queue: SyncQueueItem[] = JSON.parse(stored);
			return queue.length;
		}
		return 0;
	} catch {
		return 0;
	}
}
async function getSyncResults(): Promise<any[]> {
	try {
		const stored = localStorage.getItem('offline_sync_results');
		if (stored) {
			return JSON.parse(stored);
		}
		return [];
	} catch {
		return [];
	}
}
async function refreshCache(): Promise<void> {
	await offlineStrategies.preloadFAQContent();
}
