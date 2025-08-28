/**
 * CONTEXT7 SOURCE: /facebook/react - React hooks for offline state management
 * OFFLINE HOOK: Comprehensive offline status monitoring and management for FAQ system
 * 
 * useOffline Hook - Royal Client Offline Experience
 * Features:
 * - Real-time network status monitoring
 * - Connection quality detection
 * - Automatic sync queue management
 * - Offline mode indicators
 * - Data freshness tracking
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { offlineStrategies, NetworkStatus, SyncQueueItem } from '@/lib/offline/offline-strategies';
import { cacheManager } from '@/lib/offline/cache-manager';

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for offline hook
// TYPE SAFETY: Complete interfaces for offline state and configuration
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

// CONTEXT7 SOURCE: /facebook/react - Custom hook implementation for offline management
// OFFLINE HOOK: Comprehensive offline state management with royal client standards
export function useOffline(options: OfflineOptions = {}): UseOfflineReturn {
  const {
    enablePersistence = true,
    enableSyncQueue = true,
    enableConnectionMonitoring = true,
    syncInterval = 30000, // 30 seconds
    cacheRefreshInterval = 300000, // 5 minutes
    onOnline,
    onOffline,
    onSyncComplete,
    onSyncError
  } = options;

  // CONTEXT7 SOURCE: /facebook/react - State management for offline functionality
  // STATE MANAGEMENT: Comprehensive offline state tracking
  const [state, setState] = useState<OfflineState>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    wasOffline: false,
    connectionQuality: 'unknown',
    networkType: 'unknown',
    lastOnline: null,
    syncPending: false,
    syncQueueSize: 0,
    cacheSize: 0,
    dataFreshness: 'unknown'
  });

  // CONTEXT7 SOURCE: /facebook/react - Refs for interval management
  // REF MANAGEMENT: Stable references for intervals and event handlers
  const syncIntervalRef = useRef<NodeJS.Timeout>();
  const cacheRefreshIntervalRef = useRef<NodeJS.Timeout>();
  const lastSyncAttempt = useRef<number>(0);
  const eventListenersAttached = useRef<boolean>(false);

  // CONTEXT7 SOURCE: /facebook/react - Network status monitoring with connection quality
  // NETWORK MONITORING: Real-time connection status and quality assessment
  const updateNetworkStatus = useCallback(() => {
    // CONTEXT7 SOURCE: /vercel/next.js - Client-side only navigator check for SSR compatibility
    // SSR COMPATIBILITY: Ensure navigator is available (client-side only)
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

    setState(prevState => ({
      ...prevState,
      isOnline,
      wasOffline: !isOnline && prevState.isOnline,
      connectionQuality,
      networkType: networkStatus.effectiveType || 'unknown',
      lastOnline: isOnline ? new Date() : prevState.lastOnline
    }));

    // Trigger callbacks
    if (isOnline && !state.isOnline) {
      onOnline?.();
      handleOnlineTransition();
    } else if (!isOnline && state.isOnline) {
      onOffline?.();
    }
  }, [state.isOnline, onOnline, onOffline]);

  // CONTEXT7 SOURCE: /facebook/react - Sync queue management
  // SYNC MANAGEMENT: Handle background synchronization of offline actions
  const updateSyncStatus = useCallback(async () => {
    try {
      const syncQueue = await getSyncQueueSize();
      const isPending = syncQueue > 0;
      
      setState(prevState => ({
        ...prevState,
        syncPending: isPending,
        syncQueueSize: syncQueue
      }));
    } catch (error) {
      console.warn('Failed to update sync status:', error);
    }
  }, []);

  // CONTEXT7 SOURCE: /facebook/react - Cache statistics monitoring
  // CACHE MONITORING: Track cache size and data freshness
  const updateCacheStats = useCallback(async () => {
    try {
      const stats = cacheManager.getStats();
      const totalSize = Array.from(stats as Map<string, any>).reduce(
        (total, [, stat]) => total + stat.totalSize,
        0
      );
      
      setState(prevState => ({
        ...prevState,
        cacheSize: totalSize
      }));
    } catch (error) {
      console.warn('Failed to update cache stats:', error);
    }
  }, []);

  // CONTEXT7 SOURCE: /facebook/react - Online transition handling
  // ONLINE TRANSITION: Handle return to online state with sync processing
  const handleOnlineTransition = useCallback(async () => {
    if (!enableSyncQueue) return;
    
    const now = Date.now();
    // Prevent too frequent sync attempts
    if (now - lastSyncAttempt.current < 5000) return;
    
    lastSyncAttempt.current = now;
    
    try {
      setState(prevState => ({ ...prevState, syncPending: true }));
      
      await offlineStrategies.processSyncQueue();
      
      const results = await getSyncResults();
      onSyncComplete?.(results);
      
      // Refresh cache after successful sync
      await refreshCache();
      
    } catch (error) {
      console.error('Sync failed during online transition:', error);
      onSyncError?.(error as Error);
    } finally {
      setState(prevState => ({ ...prevState, syncPending: false }));
      updateSyncStatus();
    }
  }, [enableSyncQueue, onSyncComplete, onSyncError, updateSyncStatus]);

  // CONTEXT7 SOURCE: /facebook/react - Data freshness checking
  // FRESHNESS CHECK: Determine if cached data is still current
  const checkDataFreshness = useCallback(async (): Promise<'fresh' | 'stale' | 'unknown'> => {
    try {
      const faqCacheEntry = await cacheManager.get('FAQ_CONTENT', '/faq/categories');
      if (!faqCacheEntry) {
        return 'unknown';
      }
      
      const ageInHours = (Date.now() - faqCacheEntry.timestamp) / (1000 * 60 * 60);
      const freshness = ageInHours < 1 ? 'fresh' : ageInHours < 24 ? 'stale' : 'unknown';
      
      setState(prevState => ({ ...prevState, dataFreshness: freshness }));
      return freshness;
    } catch (error) {
      console.warn('Failed to check data freshness:', error);
      return 'unknown';
    }
  }, []);

  // CONTEXT7 SOURCE: /facebook/react - Actions implementation for offline management
  // ACTIONS: User-callable functions for offline management
  const actions: OfflineActions = {
    // CONTEXT7 SOURCE: /facebook/react - Queue action for background sync
    queueForSync: useCallback(async (action: string, data: any) => {
      if (!enableSyncQueue) {
        throw new Error('Sync queue is disabled');
      }
      
      const syncId = await offlineStrategies.queueForSync(action, data);
      updateSyncStatus();
      return syncId;
    }, [enableSyncQueue, updateSyncStatus]),

    // CONTEXT7 SOURCE: /facebook/react - Force immediate sync
    forceSync: useCallback(async () => {
      if (!state.isOnline) {
        throw new Error('Cannot sync while offline');
      }
      
      setState(prevState => ({ ...prevState, syncPending: true }));
      
      try {
        await offlineStrategies.processSyncQueue();
        const results = await getSyncResults();
        onSyncComplete?.(results);
      } catch (error) {
        onSyncError?.(error as Error);
        throw error;
      } finally {
        setState(prevState => ({ ...prevState, syncPending: false }));
        updateSyncStatus();
      }
    }, [state.isOnline, onSyncComplete, onSyncError, updateSyncStatus]),

    // CONTEXT7 SOURCE: /facebook/react - Clear cache functionality
    clearCache: useCallback(async (cacheKey?: string) => {
      const success = await cacheManager.clear(cacheKey);
      if (success) {
        updateCacheStats();
        setState(prevState => ({ ...prevState, dataFreshness: 'unknown' }));
      }
      return success;
    }, [updateCacheStats]),

    // CONTEXT7 SOURCE: /facebook/react - Cache refresh functionality
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

    // CONTEXT7 SOURCE: /facebook/react - Data freshness checking
    checkDataFreshness,

    // CONTEXT7 SOURCE: /facebook/react - Content preloading
    preloadContent: useCallback(async () => {
      await offlineStrategies.preloadFAQContent();
      updateCacheStats();
    }, [updateCacheStats]),

    // CONTEXT7 SOURCE: /facebook/react - Network information getter
    getNetworkInfo: useCallback(() => {
      return offlineStrategies.getNetworkStatus();
    }, []),

    // CONTEXT7 SOURCE: /facebook/react - Cache statistics getter
    getCacheStats: useCallback(() => {
      return cacheManager.getStats();
    }, [])
  };

  // CONTEXT7 SOURCE: /facebook/react - Effect for initialization and cleanup
  // INITIALIZATION: Set up event listeners and intervals
  useEffect(() => {
    // CONTEXT7 SOURCE: /vercel/next.js - Client-side only check for SSR compatibility
    // SSR GUARD: Skip cache initialization during server-side rendering
    if (typeof window !== 'undefined') {
      // Initialize cache manager only on client-side
      cacheManager.initializeCaches().catch(error => {
        console.error('Failed to initialize caches:', error);
      });
    }

    // Set up event listeners for network status
    // CONTEXT7 SOURCE: /vercel/next.js - Client-side only window check for SSR compatibility
    // SSR COMPATIBILITY: Ensure window is available (client-side only)
    if (enableConnectionMonitoring && !eventListenersAttached.current && typeof window !== 'undefined') {
      window.addEventListener('online', updateNetworkStatus);
      window.addEventListener('offline', updateNetworkStatus);
      
      // Set up connection monitoring if available
      // CONTEXT7 SOURCE: /vercel/next.js - Client-side only navigator connection check
      // SSR COMPATIBILITY: Ensure navigator and connection API available (client-side only)
      if (typeof navigator !== 'undefined' && 'connection' in navigator) {
        const connection = (navigator as any).connection;
        connection?.addEventListener('change', updateNetworkStatus);
      }
      
      eventListenersAttached.current = true;
    }

    // Set up sync interval
    if (enableSyncQueue && state.isOnline) {
      syncIntervalRef.current = setInterval(() => {
        if (state.isOnline && !state.syncPending) {
          offlineStrategies.processSyncQueue().catch(error => {
            console.warn('Scheduled sync failed:', error);
          });
        }
      }, syncInterval);
    }

    // Set up cache refresh interval
    cacheRefreshIntervalRef.current = setInterval(() => {
      updateCacheStats();
      checkDataFreshness();
    }, cacheRefreshInterval);

    // Initial status updates
    updateNetworkStatus();
    updateSyncStatus();
    updateCacheStats();
    checkDataFreshness();

    // Cleanup function
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
    checkDataFreshness
  ]);

  // CONTEXT7 SOURCE: /facebook/react - Cleanup effect for event listeners
  // CLEANUP: Remove event listeners on unmount
  useEffect(() => {
    return () => {
      // CONTEXT7 SOURCE: /vercel/next.js - Client-side only window cleanup for SSR compatibility
      // SSR COMPATIBILITY: Ensure window is available for event listener cleanup
      if (eventListenersAttached.current && typeof window !== 'undefined') {
        window.removeEventListener('online', updateNetworkStatus);
        window.removeEventListener('offline', updateNetworkStatus);
        
        // CONTEXT7 SOURCE: /vercel/next.js - Client-side only navigator connection cleanup
        // SSR COMPATIBILITY: Ensure navigator and connection API available for cleanup
        if (typeof navigator !== 'undefined' && 'connection' in navigator) {
          const connection = (navigator as any).connection;
          connection?.removeEventListener('change', updateNetworkStatus);
        }
        
        eventListenersAttached.current = false;
      }
    };
  }, [updateNetworkStatus]);

  return { state, actions };
}

// CONTEXT7 SOURCE: /facebook/react - Helper functions for offline functionality
// HELPER FUNCTIONS: Utility functions for offline state management

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
  // Return results of last sync operation
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
  // Refresh critical FAQ content
  await offlineStrategies.preloadFAQContent();
}