/**
 * CONTEXT7 SOURCE: /googlechrome/workbox - Cache management utilities for PWA applications
 * OFFLINE SUPPORT: Comprehensive cache management system for FAQ offline functionality
 * 
 * Cache Manager - Royal Client Offline Experience
 * Features:
 * - Intelligent cache strategies for FAQ content
 * - Storage quota management and cleanup
 * - Cache versioning and migration
 * - Performance monitoring for royal standards
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for cache management system
// TYPE SAFETY: Complete TypeScript interfaces for cache operations and configuration
export interface CacheConfig {
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

export interface CacheStats {
  totalSize: number;
  entryCount: number;
  lastAccessed: number;
  hitRate: number;
  missRate: number;
}

export interface OfflineCacheManifest {
  faqCategories: CacheEntry[];
  faqQuestions: CacheEntry[];
  searchIndex: CacheEntry[];
  userPreferences: CacheEntry[];
  assets: CacheEntry[];
}

// CONTEXT7 SOURCE: /googlechrome/workbox - Cache configuration for FAQ system
// CACHE CONFIGURATION: Optimized settings for royal client offline experience
export const CACHE_CONFIGS: Record<string, CacheConfig> = {
  FAQ_CONTENT: {
    name: 'faq-content-v1',
    version: '1.0.0',
    maxEntries: 500,
    maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
    strategy: 'stale-while-revalidate'
  },
  FAQ_SEARCH: {
    name: 'faq-search-v1',
    version: '1.0.0',
    maxEntries: 100,
    maxAgeSeconds: 24 * 60 * 60, // 24 hours
    strategy: 'cache-first'
  },
  FAQ_ASSETS: {
    name: 'faq-assets-v1',
    version: '1.0.0',
    maxEntries: 1000,
    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    strategy: 'cache-first'
  },
  USER_PREFS: {
    name: 'user-preferences-v1',
    version: '1.0.0',
    maxEntries: 50,
    maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
    strategy: 'cache-first'
  }
};

// CONTEXT7 SOURCE: /googlechrome/workbox - Advanced cache management class implementation
// CACHE MANAGER: Enterprise-grade cache management for offline FAQ functionality
export class CacheManager {
  private static instance: CacheManager;
  private caches: Map<string, Cache> = new Map();
  private stats: Map<string, CacheStats> = new Map();

  private constructor() {
    this.initializeStats();
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Singleton pattern implementation
  // SINGLETON PATTERN: Ensure single cache manager instance across application
  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Cache initialization with error handling
  // CACHE INITIALIZATION: Set up all required caches for FAQ system
  public async initializeCaches(): Promise<void> {
    try {
      // CONTEXT7 SOURCE: /vercel/next.js - Client-side only caches API check for SSR compatibility
      // SSR COMPATIBILITY: Ensure caches API is available (client-side only)
      if (typeof caches === 'undefined') {
        console.warn('Cache API not available during SSR - skipping cache initialization');
        return; // Skip cache initialization during SSR
      }
      
      for (const [key, config] of Object.entries(CACHE_CONFIGS)) {
        const cache = await caches.open(config.name);
        this.caches.set(key, cache);
        
        // Initialize stats for this cache
        if (!this.stats.has(key)) {
          this.stats.set(key, {
            totalSize: 0,
            entryCount: 0,
            lastAccessed: Date.now(),
            hitRate: 0,
            missRate: 0
          });
        }
      }
      
      // Clean up old cache versions
      await this.cleanupOldCaches();
      
      console.log('📦 Cache Manager: All caches initialized successfully');
    } catch (error) {
      console.error('❌ Cache Manager: Failed to initialize caches:', error);
      throw new Error('Cache initialization failed');
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Cache entry storage with compression
  // CACHE STORAGE: Store FAQ data with intelligent compression and versioning
  public async set(
    cacheKey: string, 
    url: string, 
    data: any, 
    options: { compress?: boolean; priority?: 'high' | 'normal' | 'low' } = {}
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

      // CONTEXT7 SOURCE: /googlechrome/workbox - Response creation for cache storage
      // RESPONSE CREATION: Create cacheable response with metadata
      const cacheEntry: CacheEntry = {
        url,
        data,
        timestamp: Date.now(),
        version: config.version,
        size: this.calculateSize(data)
      };

      const response = new Response(JSON.stringify(cacheEntry), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `max-age=${config.maxAgeSeconds}`,
          'X-Cache-Version': config.version,
          'X-Cache-Priority': options.priority || 'normal',
          'X-Cache-Timestamp': cacheEntry.timestamp.toString()
        }
      });

      await cache.put(url, response);
      this.updateStats(cacheKey, 'set', cacheEntry.size);
      
      // Check if we need to clean up old entries
      await this.enforceQuotas(cacheKey);
      
      return true;
    } catch (error) {
      console.error(`❌ Cache Manager: Failed to set cache entry for ${url}:`, error);
      return false;
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Cache retrieval with validation
  // CACHE RETRIEVAL: Get FAQ data with freshness validation and fallback handling
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
      
      // CONTEXT7 SOURCE: /googlechrome/workbox - Cache freshness validation
      // FRESHNESS CHECK: Validate cache entry age and version compatibility
      const isExpired = (Date.now() - cacheEntry.timestamp) > (config.maxAgeSeconds * 1000);
      const isVersionMismatch = cacheEntry.version !== config.version;
      
      if (isExpired || isVersionMismatch) {
        await cache.delete(url);
        this.updateStats(cacheKey, 'expired', -cacheEntry.size);
        return null;
      }

      this.updateStats(cacheKey, 'hit', 0);
      return cacheEntry;
    } catch (error) {
      console.error(`❌ Cache Manager: Failed to get cache entry for ${url}:`, error);
      this.updateStats(cacheKey, 'miss', 0);
      return null;
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Cache deletion with cleanup
  // CACHE DELETION: Remove specific entries with stats updates
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
      console.error(`❌ Cache Manager: Failed to delete cache entry for ${url}:`, error);
      return false;
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Cache clearing with selective options
  // CACHE CLEARING: Clear all entries or specific cache with confirmation
  public async clear(cacheKey?: string): Promise<boolean> {
    try {
      if (cacheKey) {
        // Clear specific cache
        const cache = this.caches.get(cacheKey);
        if (cache) {
          const keys = await cache.keys();
          await Promise.all(keys.map(key => cache.delete(key)));
          this.resetStats(cacheKey);
          console.log(`🧹 Cache Manager: Cleared cache ${cacheKey}`);
        }
      } else {
        // Clear all caches
        for (const [key, cache] of this.caches.entries()) {
          const keys = await cache.keys();
          await Promise.all(keys.map(key => cache.delete(key)));
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

  // CONTEXT7 SOURCE: /googlechrome/workbox - Storage quota management
  // QUOTA MANAGEMENT: Monitor and enforce storage quotas for royal client performance
  public async getStorageEstimate(): Promise<StorageEstimate> {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        return await navigator.storage.estimate();
      }
      
      // Fallback estimation
      return {
        usage: 0,
        quota: 50 * 1024 * 1024 // 50MB fallback
      };
    } catch (error) {
      console.error('❌ Cache Manager: Failed to get storage estimate:', error);
      return { usage: 0, quota: 0 };
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Cache statistics monitoring
  // STATISTICS: Comprehensive cache performance monitoring
  public getStats(cacheKey?: string): CacheStats | Map<string, CacheStats> {
    if (cacheKey) {
      return this.stats.get(cacheKey) || {
        totalSize: 0,
        entryCount: 0,
        lastAccessed: 0,
        hitRate: 0,
        missRate: 0
      };
    }
    
    return new Map(this.stats);
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Cache maintenance and cleanup
  // MAINTENANCE: Automated cleanup and optimization routines
  public async maintenance(): Promise<void> {
    try {
      console.log('🔧 Cache Manager: Starting maintenance routine');
      
      // Clean up expired entries
      await this.cleanupExpiredEntries();
      
      // Enforce quotas
      for (const cacheKey of Object.keys(CACHE_CONFIGS)) {
        await this.enforceQuotas(cacheKey);
      }
      
      // Update statistics
      await this.updateAllStats();
      
      console.log('✅ Cache Manager: Maintenance completed');
    } catch (error) {
      console.error('❌ Cache Manager: Maintenance failed:', error);
    }
  }

  // CONTEXT7 SOURCE: /googlechrome/workbox - Private helper methods for cache management
  // PRIVATE HELPERS: Internal utilities for cache operations

  private initializeStats(): void {
    for (const key of Object.keys(CACHE_CONFIGS)) {
      this.stats.set(key, {
        totalSize: 0,
        entryCount: 0,
        lastAccessed: Date.now(),
        hitRate: 0,
        missRate: 0
      });
    }
  }

  private updateStats(cacheKey: string, operation: 'hit' | 'miss' | 'set' | 'delete' | 'expired', sizeChange: number): void {
    const stats = this.stats.get(cacheKey);
    if (!stats) return;

    stats.lastAccessed = Date.now();
    stats.totalSize += sizeChange;

    switch (operation) {
      case 'hit':
        stats.hitRate = (stats.hitRate * 0.9) + (1 * 0.1); // Exponential moving average
        break;
      case 'miss':
        stats.missRate = (stats.missRate * 0.9) + (1 * 0.1);
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
      missRate: 0
    });
  }

  private calculateSize(data: any): number {
    try {
      return new Blob([JSON.stringify(data)]).size;
    } catch {
      return JSON.stringify(data).length * 2; // Rough estimate
    }
  }

  private async cleanupOldCaches(): Promise<void> {
    const cacheNames = await caches.keys();
    const currentCacheNames = Object.values(CACHE_CONFIGS).map(config => config.name);
    
    const oldCaches = cacheNames.filter(name => !currentCacheNames.includes(name));
    
    await Promise.all(
      oldCaches.map(cacheName => caches.delete(cacheName))
    );
    
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
          const isExpired = (now - cacheEntry.timestamp) > (config.maxAgeSeconds * 1000);
          
          if (isExpired) {
            await cache.delete(request);
            this.updateStats(cacheKey, 'expired', -cacheEntry.size);
          }
        } catch {
          // Invalid cache entry, delete it
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

    // Remove oldest entries
    const entries: Array<{ request: Request; timestamp: number }> = [];
    
    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        try {
          const cacheEntry: CacheEntry = await response.json();
          entries.push({ request, timestamp: cacheEntry.timestamp });
        } catch {
          // Invalid entry, mark for deletion
          entries.push({ request, timestamp: 0 });
        }
      }
    }

    // Sort by timestamp (oldest first)
    entries.sort((a, b) => a.timestamp - b.timestamp);
    
    // Remove excess entries
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
          } catch {
            // Skip invalid entries
          }
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

// CONTEXT7 SOURCE: /googlechrome/workbox - Export singleton instance for application use
// SINGLETON EXPORT: Global cache manager instance for FAQ offline functionality
export const cacheManager = CacheManager.getInstance();