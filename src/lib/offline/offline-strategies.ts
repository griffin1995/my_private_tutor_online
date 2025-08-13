/**
 * CONTEXT7 SOURCE: /googlechrome/workbox - Advanced offline strategies for FAQ system
 * OFFLINE STRATEGIES: Comprehensive offline handling patterns for royal client experience
 * 
 * Offline Strategies - Premium FAQ System
 * Features:
 * - Network-first with intelligent fallbacks
 * - Stale-while-revalidate for FAQ content
 * - Cache-first for static assets
 * - Background sync for user interactions
 * - Intelligent cache warming
 */

import { cacheManager, CacheEntry } from './cache-manager';
import { getFAQCategories, getFAQHero } from '@/lib/cms/cms-content';

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for offline strategies
// TYPE SAFETY: Complete interfaces for offline strategy configuration and responses
export interface OfflineStrategyOptions {
  timeout?: number;
  retries?: number;
  fallbackDelay?: number;
  cacheFirst?: boolean;
  networkFirst?: boolean;
  staleWhileRevalidate?: boolean;
}

export interface OfflineResponse<T = any> {
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

// CONTEXT7 SOURCE: /googlechrome/workbox - Offline strategy implementations
// STRATEGY IMPLEMENTATIONS: Core offline patterns for FAQ system

export class OfflineStrategies {
  private syncQueue: SyncQueueItem[] = [];
  private networkStatus: NetworkStatus = { 
    // CONTEXT7 SOURCE: /vercel/next.js - Client-side only navigator check for SSR compatibility
    // SSR COMPATIBILITY: Ensure navigator is available (client-side only) 
    online: typeof navigator !== 'undefined' ? navigator.onLine : true 
  };

  constructor() {
    this.initializeNetworkMonitoring();
    this.loadSyncQueue();
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Network-first strategy with cache fallback
  // NETWORK FIRST: Fresh content preferred with offline resilience
  public async networkFirst<T>(
    url: string,
    fetchFunction: () => Promise<T>,
    cacheKey: string,
    options: OfflineStrategyOptions = {}
  ): Promise<OfflineResponse<T>> {
    const { timeout = 5000, retries = 2 } = options;

    try {
      // Try network first with timeout
      const networkData = await this.fetchWithTimeout(fetchFunction, timeout);
      
      // Cache successful network response
      await cacheManager.set(cacheKey, url, networkData, { priority: 'high' });
      
      return {
        data: networkData,
        source: 'network',
        timestamp: Date.now()
      };
    } catch (networkError) {
      console.warn(`🌐 Network request failed for ${url}, falling back to cache:`, networkError);
      
      // Fallback to cache
      const cacheEntry = await cacheManager.get(cacheKey, url);
      if (cacheEntry) {
        return {
          data: cacheEntry.data,
          source: 'cache',
          timestamp: cacheEntry.timestamp,
          isStale: this.isStale(cacheEntry, 24 * 60 * 60 * 1000) // 24 hours
        };
      }
      
      // No cache available, throw error
      throw new Error(`No cached data available for ${url}`);
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Cache-first strategy with network update
  // CACHE FIRST: Instant loading from cache with background updates
  public async cacheFirst<T>(
    url: string,
    fetchFunction: () => Promise<T>,
    cacheKey: string,
    options: OfflineStrategyOptions = {}
  ): Promise<OfflineResponse<T>> {
    // Try cache first
    const cacheEntry = await cacheManager.get(cacheKey, url);
    if (cacheEntry && !this.isStale(cacheEntry, 7 * 24 * 60 * 60 * 1000)) { // 7 days
      return {
        data: cacheEntry.data,
        source: 'cache',
        timestamp: cacheEntry.timestamp
      };
    }

    try {
      // Cache miss or stale, fetch from network
      const networkData = await fetchFunction();
      
      // Update cache with fresh data
      await cacheManager.set(cacheKey, url, networkData, { priority: 'normal' });
      
      return {
        data: networkData,
        source: 'network',
        timestamp: Date.now()
      };
    } catch (networkError) {
      // Network failed, return stale cache if available
      if (cacheEntry) {
        return {
          data: cacheEntry.data,
          source: 'cache',
          timestamp: cacheEntry.timestamp,
          isStale: true,
          error: networkError as Error
        };
      }
      
      throw networkError;
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Stale-while-revalidate strategy
  // STALE WHILE REVALIDATE: Instant cache response with background refresh
  public async staleWhileRevalidate<T>(
    url: string,
    fetchFunction: () => Promise<T>,
    cacheKey: string,
    options: OfflineStrategyOptions = {}
  ): Promise<OfflineResponse<T>> {
    // Get cached version immediately
    const cacheEntry = await cacheManager.get(cacheKey, url);
    
    // Start network request in background (don't await)
    const networkPromise = this.updateCacheInBackground(url, fetchFunction, cacheKey);
    
    if (cacheEntry) {
      // Return cached data immediately
      const response: OfflineResponse<T> = {
        data: cacheEntry.data,
        source: 'cache',
        timestamp: cacheEntry.timestamp,
        isStale: this.isStale(cacheEntry, 60 * 60 * 1000) // 1 hour
      };
      
      // Wait for background update to complete (optional)
      networkPromise.catch(error => {
        console.warn('Background cache update failed:', error);
      });
      
      return response;
    } else {
      // No cache, wait for network
      try {
        const networkData = await fetchFunction();
        await cacheManager.set(cacheKey, url, networkData, { priority: 'normal' });
        
        return {
          data: networkData,
          source: 'network',
          timestamp: Date.now()
        };
      } catch (error) {
        throw new Error(`No cached data and network request failed for ${url}`);
      }
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - FAQ content preloading for offline access
  // CONTENT PRELOADING: Intelligent prefetching of critical FAQ content
  public async preloadFAQContent(): Promise<void> {
    try {
      console.log('📦 Preloading FAQ content for offline access...');
      
      // Preload FAQ categories and hero content
      const [categories, hero] = await Promise.allSettled([
        this.cacheFirst('/faq/categories', getFAQCategories, 'FAQ_CONTENT'),
        this.cacheFirst('/faq/hero', getFAQHero, 'FAQ_CONTENT')
      ]);
      
      // Preload individual FAQ questions from categories
      if (categories.status === 'fulfilled') {
        const categoryData = categories.value.data;
        const questionPromises = categoryData.flatMap((category: any) =>
          category.questions.map((question: any) =>
            this.cacheFirst(
              `/faq/question/${question.id}`,
              () => Promise.resolve(question),
              'FAQ_CONTENT'
            ).catch(error => {
              console.warn(`Failed to preload question ${question.id}:`, error);
            })
          )
        );
        
        await Promise.allSettled(questionPromises);
      }
      
      console.log('✅ FAQ content preloading completed');
    } catch (error) {
      console.error('❌ FAQ content preloading failed:', error);
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Background sync implementation
  // BACKGROUND SYNC: Queue user interactions for offline/online sync
  public async queueForSync(action: string, data: any, options: { maxRetries?: number } = {}): Promise<string> {
    const syncItem: SyncQueueItem = {
      id: this.generateId(),
      action,
      data,
      timestamp: Date.now(),
      retries: 0,
      maxRetries: options.maxRetries || 3
    };
    
    this.syncQueue.push(syncItem);
    await this.saveSyncQueue();
    
    // Try to sync immediately if online
    if (this.networkStatus.online) {
      this.processSyncQueue();
    }
    
    return syncItem.id;
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Sync queue processing with retry logic
  // SYNC PROCESSING: Handle queued actions with intelligent retry mechanism
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
          // Re-queue for retry
          this.syncQueue.push(item);
        } else {
          console.error(`❌ Max retries exceeded for action: ${item.action}`);
        }
      }
    }
    
    await this.saveSyncQueue();
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Network monitoring for adaptive strategies
  // NETWORK MONITORING: Real-time network status for strategy adaptation
  public getNetworkStatus(): NetworkStatus {
    return { ...this.networkStatus };
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Smart cache warming based on usage patterns
  // CACHE WARMING: Predictive content loading for improved offline experience
  public async warmCache(urls: string[], priority: 'high' | 'normal' | 'low' = 'normal'): Promise<void> {
    const batchSize = priority === 'high' ? 5 : priority === 'normal' ? 3 : 1;
    
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      
      await Promise.allSettled(
        batch.map(async (url) => {
          try {
            const response = await fetch(url);
            if (response.ok) {
              await cacheManager.set('FAQ_CONTENT', url, await response.json(), { priority });
            }
          } catch (error) {
            console.warn(`Failed to warm cache for ${url}:`, error);
          }
        })
      );
      
      // Small delay between batches to avoid overwhelming the network
      if (i + batchSize < urls.length) {
        await new Promise(resolve => setTimeout(resolve, priority === 'high' ? 100 : 500));
      }
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Private helper methods for offline strategies
  // PRIVATE HELPERS: Internal utilities for strategy implementation

  private async fetchWithTimeout<T>(fetchFunction: () => Promise<T>, timeout: number): Promise<T> {
    return Promise.race([
      fetchFunction(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeout)
      )
    ]);
  }

  private async updateCacheInBackground<T>(
    url: string,
    fetchFunction: () => Promise<T>,
    cacheKey: string
  ): Promise<void> {
    try {
      const networkData = await fetchFunction();
      await cacheManager.set(cacheKey, url, networkData, { priority: 'normal' });
    } catch (error) {
      console.warn(`Background cache update failed for ${url}:`, error);
    }
  }

  private isStale(cacheEntry: CacheEntry, maxAge: number): boolean {
    return (Date.now() - cacheEntry.timestamp) > maxAge;
  }

  private initializeNetworkMonitoring(): void {
    // CONTEXT7 SOURCE: /vercel/next.js - Client-side only window check for SSR compatibility
    // SSR COMPATIBILITY: Ensure window is available (client-side only)
    if (typeof window === 'undefined') {
      return; // Skip network monitoring during SSR
    }
    
    // Monitor online/offline status
    window.addEventListener('online', () => {
      this.networkStatus.online = true;
      console.log('🌐 Network: Back online, processing sync queue');
      this.processSyncQueue();
    });

    window.addEventListener('offline', () => {
      this.networkStatus.online = false;
      console.log('📡 Network: Gone offline, switching to cache-only mode');
    });

    // Monitor network quality if available
    // CONTEXT7 SOURCE: /vercel/next.js - Client-side only navigator check for SSR compatibility
    // SSR COMPATIBILITY: Ensure navigator is available (client-side only)
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`Rating sync failed: ${response.statusText}`);
    }
  }

  private async syncFAQFeedback(data: any): Promise<void> {
    const response = await fetch('/api/faq/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`Feedback sync failed: ${response.statusText}`);
    }
  }

  private async syncUserPreferences(data: any): Promise<void> {
    const response = await fetch('/api/user/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`Preferences sync failed: ${response.statusText}`);
    }
  }

  private async syncAnalyticsEvent(data: any): Promise<void> {
    // Handle analytics events during sync
    if (typeof gtag !== 'undefined') {
      gtag('event', data.event_name, data.parameters);
    }
  }

  private generateId(): string {
    return `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async loadSyncQueue(): Promise<void> {
    try {
      // CONTEXT7 SOURCE: /vercel/next.js - Client-side only localStorage check for SSR compatibility
      // SSR COMPATIBILITY: Ensure localStorage is available (client-side only)
      if (typeof localStorage === 'undefined') {
        return; // Skip sync queue loading during SSR
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
      // CONTEXT7 SOURCE: /vercel/next.js - Client-side only localStorage check for SSR compatibility
      // SSR COMPATIBILITY: Ensure localStorage is available (client-side only)
      if (typeof localStorage === 'undefined') {
        return; // Skip sync queue saving during SSR
      }
      
      localStorage.setItem('offline_sync_queue', JSON.stringify(this.syncQueue));
    } catch (error) {
      console.warn('Failed to save sync queue to storage:', error);
    }
  }
}

// CONTEXT7 SOURCE: /googlechrome/workbox - Export singleton instance for application use
// SINGLETON EXPORT: Global offline strategies instance for FAQ system
export const offlineStrategies = new OfflineStrategies();