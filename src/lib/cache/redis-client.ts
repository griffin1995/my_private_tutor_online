/**
 * CONTEXT7 SOURCE: /redis/node-redis - Redis client configuration for performance caching
 * MULTI-AGENT CONSENSUS: Backend-Optimizer approved caching strategy for £548K value protection
 * CONTEXT7 SOURCE: /redis/node-redis - Connection pooling and performance optimization
 * IMPLEMENTATION: Enterprise-grade Redis caching for royal client performance standards
 */

import { createClient, RedisClientType } from 'redis'

// CONTEXT7 SOURCE: /redis/node-redis - Redis configuration for optimal performance
// CACHE OPTIMIZATION: Premium service caching thresholds and timeouts
const REDIS_CONFIG = {
  // Connection settings
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  keepAlive: true,

  // Performance settings
  commandTimeout: 5000, // 5 second command timeout
  connectTimeout: 10000, // 10 second connection timeout

  // Cache TTL settings (in seconds)
  defaultTTL: 3600, // 1 hour default
  shortTTL: 300, // 5 minutes for dynamic content
  longTTL: 86400, // 24 hours for static content
  permanentTTL: 604800, // 7 days for semi-permanent data
} as const

// CONTEXT7 SOURCE: /redis/node-redis - Cache key patterns for organized data management
// NAMESPACE ORGANIZATION: Structured cache keys for royal client data organization
export const CACHE_KEYS = {
  // User data caching
  USER_PROFILE: (userId: string) => `user:profile:${userId}`,
  USER_PREFERENCES: (userId: string) => `user:preferences:${userId}`,
  USER_SESSIONS: (sessionId: string) => `session:${sessionId}`,

  // Content caching
  CMS_CONTENT: (contentId: string) => `cms:content:${contentId}`,
  FAQ_DATA: (faqId: string) => `faq:${faqId}`,
  TESTIMONIALS: 'testimonials:featured',

  // Performance caching
  API_RESPONSE: (endpoint: string, params: string) => `api:${endpoint}:${params}`,
  PAGE_CACHE: (path: string) => `page:${path}`,
  SEARCH_RESULTS: (query: string) => `search:${query}`,

  // Business metrics
  ANALYTICS: (metric: string, date: string) => `analytics:${metric}:${date}`,
  PERFORMANCE_METRICS: 'performance:metrics',

  // Rate limiting
  RATE_LIMIT: (identifier: string) => `rate_limit:${identifier}`,
} as const

// CONTEXT7 SOURCE: /redis/node-redis - Global Redis client management
// SINGLETON PATTERN: Single Redis instance for connection efficiency
declare global {
  var __redis: RedisClientType | undefined
}

// CONTEXT7 SOURCE: /redis/node-redis - Redis client factory with error handling
// CONNECTION MANAGEMENT: Robust Redis client with automatic reconnection
export class RedisCache {
  private static instance: RedisClientType
  private static connectionPromise: Promise<RedisClientType> | null = null

  // CONTEXT7 SOURCE: /redis/node-redis - Singleton pattern for Redis client
  // PERFORMANCE OPTIMIZATION: Single client instance with connection pooling
  public static async getInstance(): Promise<RedisClientType> {
    if (RedisCache.instance && RedisCache.instance.isOpen) {
      return RedisCache.instance
    }

    if (RedisCache.connectionPromise) {
      return RedisCache.connectionPromise
    }

    RedisCache.connectionPromise = RedisCache.createClient()
    RedisCache.instance = await RedisCache.connectionPromise
    RedisCache.connectionPromise = null

    return RedisCache.instance
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Redis client creation with configuration
  // CLIENT SETUP: Enhanced Redis client with performance optimizations
  private static async createClient(): Promise<RedisClientType> {
    const client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      socket: {
        connectTimeout: REDIS_CONFIG.connectTimeout,
        commandTimeout: REDIS_CONFIG.commandTimeout,
        keepAlive: REDIS_CONFIG.keepAlive,
        reconnectStrategy: (retries) => {
          // CONTEXT7 SOURCE: /redis/node-redis - Exponential backoff reconnection
          // RELIABILITY: Robust reconnection for continuous service
          if (retries > 10) {
            console.error('🚨 Redis: Max reconnection attempts reached')
            return false
          }
          return Math.min(retries * 100, 3000) // Max 3 second delay
        },
      },
    })

    // CONTEXT7 SOURCE: /redis/node-redis - Event listeners for monitoring
    // ERROR HANDLING: Comprehensive error tracking for royal client standards
    client.on('error', (err) => {
      console.error('🚨 Redis Client Error:', err)
    })

    client.on('connect', () => {
      console.log('📊 Redis connected successfully')
    })

    client.on('reconnecting', () => {
      console.log('🔄 Redis reconnecting...')
    })

    client.on('ready', () => {
      console.log('✅ Redis client ready')
    })

    try {
      await client.connect()
      console.log('🚀 Redis connection established')

      // Global reference for development
      if (process.env.NODE_ENV !== 'production') {
        globalThis.__redis = client
      }

      return client
    } catch (error) {
      console.error('💥 Failed to connect to Redis:', error)
      throw error
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Enhanced set operation with TTL
  // CACHE OPERATIONS: High-performance caching with automatic expiration
  public static async set(
    key: string,
    value: any,
    ttl: number = REDIS_CONFIG.defaultTTL
  ): Promise<boolean> {
    try {
      const client = await RedisCache.getInstance()
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value)

      // CONTEXT7 SOURCE: /redis/node-redis - SET with EX for TTL
      await client.setEx(key, ttl, serializedValue)
      return true
    } catch (error) {
      console.error(`🚨 Redis SET error for key ${key}:`, error)
      return false
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Enhanced get operation with JSON parsing
  // CACHE RETRIEVAL: Intelligent data retrieval with type preservation
  public static async get<T = any>(key: string): Promise<T | null> {
    try {
      const client = await RedisCache.getInstance()
      const value = await client.get(key)

      if (value === null) {
        return null
      }

      // CONTEXT7 SOURCE: /redis/node-redis - Intelligent JSON parsing
      // DATA HANDLING: Safe JSON parsing with fallback to string
      try {
        return JSON.parse(value) as T
      } catch {
        return value as T
      }
    } catch (error) {
      console.error(`🚨 Redis GET error for key ${key}:`, error)
      return null
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Multi-key operations for efficiency
  // BATCH OPERATIONS: Efficient multi-key retrieval for performance
  public static async mGet<T = any>(keys: string[]): Promise<(T | null)[]> {
    try {
      const client = await RedisCache.getInstance()
      const values = await client.mGet(keys)

      return values.map(value => {
        if (value === null) return null
        try {
          return JSON.parse(value) as T
        } catch {
          return value as T
        }
      })
    } catch (error) {
      console.error('🚨 Redis MGET error:', error)
      return keys.map(() => null)
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Cache invalidation operations
  // CACHE MANAGEMENT: Efficient cache invalidation for data consistency
  public static async del(key: string | string[]): Promise<boolean> {
    try {
      const client = await RedisCache.getInstance()
      const keys = Array.isArray(key) ? key : [key]
      await client.del(keys)
      return true
    } catch (error) {
      console.error('🚨 Redis DEL error:', error)
      return false
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Pattern-based cache invalidation
  // BULK OPERATIONS: Efficient pattern-based cache clearing
  public static async delPattern(pattern: string): Promise<number> {
    try {
      const client = await RedisCache.getInstance()
      let deletedCount = 0

      // CONTEXT7 SOURCE: /redis/node-redis - SCAN iterator for safe pattern deletion
      for await (const keys of client.scanIterator({ MATCH: pattern, COUNT: 100 })) {
        if (keys.length > 0) {
          await client.del(keys)
          deletedCount += keys.length
        }
      }

      console.log(`🧹 Deleted ${deletedCount} keys matching pattern: ${pattern}`)
      return deletedCount
    } catch (error) {
      console.error(`🚨 Redis pattern deletion error for ${pattern}:`, error)
      return 0
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Cache existence check
  // PERFORMANCE OPTIMIZATION: Quick existence check without data retrieval
  public static async exists(key: string): Promise<boolean> {
    try {
      const client = await RedisCache.getInstance()
      const result = await client.exists(key)
      return result === 1
    } catch (error) {
      console.error(`🚨 Redis EXISTS error for key ${key}:`, error)
      return false
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - TTL management
  // CACHE LIFECYCLE: Dynamic TTL management for optimal cache utilization
  public static async ttl(key: string): Promise<number> {
    try {
      const client = await RedisCache.getInstance()
      return await client.ttl(key)
    } catch (error) {
      console.error(`🚨 Redis TTL error for key ${key}:`, error)
      return -1
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Cache warming utilities
  // PERFORMANCE STRATEGY: Proactive cache warming for royal client experience
  public static async warmCache(entries: Array<{ key: string; value: any; ttl?: number }>): Promise<void> {
    try {
      const client = await RedisCache.getInstance()

      // CONTEXT7 SOURCE: /redis/node-redis - Pipeline for batch operations
      const pipeline = client.multi()

      entries.forEach(({ key, value, ttl = REDIS_CONFIG.defaultTTL }) => {
        const serializedValue = typeof value === 'string' ? value : JSON.stringify(value)
        pipeline.setEx(key, ttl, serializedValue)
      })

      await pipeline.exec()
      console.log(`🔥 Cache warmed with ${entries.length} entries`)
    } catch (error) {
      console.error('🚨 Cache warming error:', error)
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Performance metrics collection
  // MONITORING: Cache performance metrics for business intelligence
  public static async getMetrics() {
    try {
      const client = await RedisCache.getInstance()
      const info = await client.info('memory')
      const stats = await client.info('stats')

      return {
        memory: {
          used: info.match(/used_memory:(\d+)/)?.[1] || '0',
          peak: info.match(/used_memory_peak:(\d+)/)?.[1] || '0',
          overhead: info.match(/used_memory_overhead:(\d+)/)?.[1] || '0',
        },
        stats: {
          commands_processed: stats.match(/total_commands_processed:(\d+)/)?.[1] || '0',
          connections_received: stats.match(/total_connections_received:(\d+)/)?.[1] || '0',
          keyspace_hits: stats.match(/keyspace_hits:(\d+)/)?.[1] || '0',
          keyspace_misses: stats.match(/keyspace_misses:(\d+)/)?.[1] || '0',
        },
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error('🚨 Redis metrics error:', error)
      return null
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Graceful disconnection
  // RESOURCE MANAGEMENT: Clean disconnection for application shutdown
  public static async disconnect(): Promise<void> {
    if (RedisCache.instance && RedisCache.instance.isOpen) {
      await RedisCache.instance.disconnect()
      console.log('📊 Redis client disconnected')
    }
  }
}

// CONTEXT7 SOURCE: /redis/node-redis - Graceful shutdown handling
// PRODUCTION OPTIMIZATION: Ensure clean disconnection on process termination
if (typeof process !== 'undefined') {
  process.on('beforeExit', async () => {
    await RedisCache.disconnect()
  })

  process.on('SIGINT', async () => {
    await RedisCache.disconnect()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    await RedisCache.disconnect()
    process.exit(0)
  })
}

// Export the cache instance and utilities
export default RedisCache