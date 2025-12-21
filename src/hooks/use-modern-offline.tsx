'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

interface NetworkStatus {
	isOnline: boolean;
	wasOffline: boolean;
	connectionQuality: 'fast' | 'slow' | 'poor' | 'unknown';
	lastOnline: Date | null;
}

interface SyncQueueItem {
	id: string;
	type: string;
	data: any;
	timestamp: number;
	retries: number;
}

interface ModernOfflineState {
	networkStatus: NetworkStatus;
	syncPending: boolean;
	syncQueueSize: number;
	cacheSize: number;
	serviceWorkerReady: boolean;
}

interface ModernOfflineActions {
	queueForSync: (type: string, data: any) => Promise<void>;
	clearCache: () => Promise<void>;
	refreshCache: () => Promise<void>;
	registerServiceWorker: () => Promise<void>;
}

interface UseModernOfflineReturn {
	state: ModernOfflineState;
	actions: ModernOfflineActions;
}

export function useModernOffline(): UseModernOfflineReturn {
	const queryClient = useQueryClient();
	const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
		isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
		wasOffline: false,
		connectionQuality: 'unknown',
		lastOnline: null,
	});
	const [serviceWorkerReady, setServiceWorkerReady] = useState(false);

	// Check service worker registration status
	const { data: swRegistration } = useQuery({
		queryKey: ['service-worker-status'],
		queryFn: async () => {
			if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
				return null;
			}
			try {
				const registration = await navigator.serviceWorker.getRegistration();
				return registration;
			} catch (error) {
				console.warn('Service Worker not available:', error);
				return null;
			}
		},
		staleTime: 60000, // Check every minute
	});

	// Get sync queue from localStorage
	const { data: syncQueue = [] } = useQuery({
		queryKey: ['sync-queue'],
		queryFn: (): SyncQueueItem[] => {
			if (typeof localStorage === 'undefined') return [];
			try {
				const stored = localStorage.getItem('offline_sync_queue');
				return stored ? JSON.parse(stored) : [];
			} catch (error) {
				console.warn('Failed to parse sync queue:', error);
				return [];
			}
		},
		refetchInterval: 5000, // Check every 5 seconds
	});

	// Queue mutation for offline sync
	const queueMutation = useMutation({
		mutationFn: async ({ type, data }: { type: string; data: any }) => {
			const syncItem: SyncQueueItem = {
				id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
				type,
				data,
				timestamp: Date.now(),
				retries: 0,
			};

			const currentQueue = JSON.parse(
				localStorage.getItem('offline_sync_queue') || '[]'
			);
			currentQueue.push(syncItem);
			localStorage.setItem('offline_sync_queue', JSON.stringify(currentQueue));

			// Trigger service worker sync if available
			if (swRegistration && 'sync' in swRegistration) {
				try {
					await swRegistration.sync.register('faq-sync');
				} catch (error) {
					console.warn('Background sync registration failed:', error);
				}
			}

			// Invalidate sync queue query to update UI
			queryClient.invalidateQueries({ queryKey: ['sync-queue'] });
		},
	});

	// Clear cache mutation
	const clearCacheMutation = useMutation({
		mutationFn: async () => {
			// Clear React Query cache
			queryClient.clear();

			// Clear service worker caches
			if ('caches' in window) {
				const cacheNames = await caches.keys();
				await Promise.all(cacheNames.map((name) => caches.delete(name)));
			}

			// Clear localStorage
			if (typeof localStorage !== 'undefined') {
				localStorage.removeItem('offline_sync_queue');
			}
		},
	});

	// Refresh cache mutation
	const refreshCacheMutation = useMutation({
		mutationFn: async () => {
			// Invalidate all queries to refresh from network
			await queryClient.invalidateQueries();

			// Refetch critical data
			await queryClient.refetchQueries({ queryKey: ['faq'] });
			await queryClient.refetchQueries({ queryKey: ['faq-categories'] });
		},
	});

	// Monitor network status
	useEffect(() => {
		if (typeof navigator === 'undefined') return;

		const updateNetworkStatus = () => {
			const isOnline = navigator.onLine;
			const wasOffline = !isOnline && networkStatus.isOnline;

			setNetworkStatus(prev => ({
				...prev,
				isOnline,
				wasOffline,
				lastOnline: isOnline ? new Date() : prev.lastOnline,
			}));

			// Process sync queue when coming back online
			if (isOnline && wasOffline && swRegistration) {
				swRegistration.sync.register('faq-sync').catch(console.warn);
			}
		};

		// Monitor connection quality
		const updateConnectionQuality = () => {
			if ('connection' in navigator) {
				const connection = (navigator as any).connection;
				let quality: 'fast' | 'slow' | 'poor' | 'unknown' = 'unknown';

				if (connection?.effectiveType) {
					switch (connection.effectiveType) {
						case '4g':
							quality = 'fast';
							break;
						case '3g':
							quality = 'slow';
							break;
						case '2g':
						case 'slow-2g':
							quality = 'poor';
							break;
						default:
							quality = 'unknown';
					}
				}

				setNetworkStatus(prev => ({ ...prev, connectionQuality: quality }));
			}
		};

		// Set up event listeners
		window.addEventListener('online', updateNetworkStatus);
		window.addEventListener('offline', updateNetworkStatus);

		if ('connection' in navigator) {
			const connection = (navigator as any).connection;
			connection?.addEventListener('change', updateConnectionQuality);
			updateConnectionQuality(); // Initial check
		}

		updateNetworkStatus(); // Initial check

		return () => {
			window.removeEventListener('online', updateNetworkStatus);
			window.removeEventListener('offline', updateNetworkStatus);
			if ('connection' in navigator) {
				const connection = (navigator as any).connection;
				connection?.removeEventListener('change', updateConnectionQuality);
			}
		};
	}, [networkStatus.isOnline, swRegistration]);

	// Monitor service worker readiness
	useEffect(() => {
		setServiceWorkerReady(!!swRegistration);
	}, [swRegistration]);

	// Register service worker
	const registerServiceWorker = useCallback(async () => {
		if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
			throw new Error('Service Worker not supported');
		}

		try {
			const registration = await navigator.serviceWorker.register('/sw.js');
			console.log('Service Worker registered:', registration);

			// Update service worker query
			queryClient.invalidateQueries({ queryKey: ['service-worker-status'] });
		} catch (error) {
			console.error('Service Worker registration failed:', error);
			throw error;
		}
	}, [queryClient]);

	// Calculate cache size
	const getCacheSize = useCallback(async (): Promise<number> => {
		if (typeof navigator === 'undefined' || !('storage' in navigator)) {
			return 0;
		}

		try {
			const estimate = await navigator.storage.estimate();
			return estimate.usage || 0;
		} catch (error) {
			console.warn('Failed to get storage estimate:', error);
			return 0;
		}
	}, []);

	const [cacheSize, setCacheSize] = useState(0);

	useEffect(() => {
		getCacheSize().then(setCacheSize);
		const interval = setInterval(() => {
			getCacheSize().then(setCacheSize);
		}, 30000); // Update every 30 seconds

		return () => clearInterval(interval);
	}, [getCacheSize]);

	const state: ModernOfflineState = {
		networkStatus,
		syncPending: queueMutation.isPending || syncQueue.length > 0,
		syncQueueSize: syncQueue.length,
		cacheSize,
		serviceWorkerReady,
	};

	const actions: ModernOfflineActions = {
		queueForSync: async (type: string, data: any) => {
			await queueMutation.mutateAsync({ type, data });
		},
		clearCache: async () => {
			await clearCacheMutation.mutateAsync();
		},
		refreshCache: async () => {
			await refreshCacheMutation.mutateAsync();
		},
		registerServiceWorker,
	};

	return { state, actions };
}