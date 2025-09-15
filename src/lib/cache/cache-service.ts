/**
 * CONTEXT7 SOURCE: /redis/node-redis - Application cache service layer
 * MULTI-AGENT CONSENSUS: Performance-Engineer approved caching strategy for £548K optimization
 * CONTEXT7 SOURCE: /redis/node-redis - Cache-aside pattern implementation
 * IMPLEMENTATION: Royal client performance standards with intelligent cache management
 */

import RedisCache, { CACHE_KEYS } from './redis-client'
import { prisma } from '../database/connection-pool'

// CONTEXT7 SOURCE: /redis/node-redis - Cache configuration for different data types
// PERFORMANCE STRATEGY: Optimized TTL values for various content types
const CACHE_TTL = {
  USER_DATA: 1800, // 30 minutes
  CMS_CONTENT: 3600, // 1 hour
  STATIC_DATA: 86400, // 24 hours
  SEARCH_RESULTS: 900, // 15 minutes
  ANALYTICS: 300, // 5 minutes
  SESSION_DATA: 7200, // 2 hours
} as const

// CONTEXT7 SOURCE: /redis/node-redis - Cache service with fallback to database
// CACHE-ASIDE PATTERN: Intelligent caching with database fallback for reliability
export class CacheService {
  // CONTEXT7 SOURCE: /redis/node-redis - Generic cache-aside implementation
  // PERFORMANCE OPTIMIZATION: Universal caching pattern for any data type
  public static async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 3600 // 1 hour default
  ): Promise<T> {
    try {
      // Try to get from cache first
      const cached = await RedisCache.get<T>(key)
      if (cached !== null) {
        return cached
      }

      // Cache miss - fetch from source
      const data = await fetcher()

      // Store in cache for next time
      await RedisCache.set(key, data, ttl)

      return data
    } catch (error) {
      console.error(`🚨 Cache service error for key ${key}:`, error)
      // Fallback to direct fetch if cache fails
      return fetcher()
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - User profile caching
  // USER DATA OPTIMIZATION: Fast user profile retrieval for royal client experience
  public static async getUserProfile(userId: string) {
    return CacheService.getOrSet(
      CACHE_KEYS.USER_PROFILE(userId),
      async () => {
        return prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            preferences: true,
            createdAt: true,
            updatedAt: true,
          }
        })
      },
      CACHE_TTL.USER_DATA
    )
  }

  // CONTEXT7 SOURCE: /redis/node-redis - CMS content caching
  // CONTENT OPTIMIZATION: High-performance content delivery for premium service
  public static async getCMSContent(contentType: string) {
    return CacheService.getOrSet(
      CACHE_KEYS.CMS_CONTENT(contentType),
      async () => {
        // Fetch from CMS content system
        const { getCMSContent } = await import('@/lib/cms/cms-content')
        return getCMSContent()
      },
      CACHE_TTL.CMS_CONTENT
    )
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Featured testimonials caching
  // SOCIAL PROOF OPTIMIZATION: Fast testimonial loading for conversion optimization
  public static async getFeaturedTestimonials() {
    return CacheService.getOrSet(
      CACHE_KEYS.TESTIMONIALS,
      async () => {
        return prisma.testimonial.findMany({
          where: { featured: true, published: true },
          select: {
            id: true,
            title: true,
            content: true,
            author: true,
            rating: true,
            createdAt: true,
          },
          orderBy: { priority: 'desc' },
          take: 10
        })
      },
      CACHE_TTL.STATIC_DATA
    )
  }

  // CONTEXT7 SOURCE: /redis/node-redis - FAQ data caching
  // HELP CONTENT OPTIMIZATION: Instant FAQ access for customer support
  public static async getFAQData(category?: string) {
    const cacheKey = category
      ? CACHE_KEYS.FAQ_DATA(`category:${category}`)
      : CACHE_KEYS.FAQ_DATA('all')

    return CacheService.getOrSet(
      cacheKey,
      async () => {
        return prisma.faq.findMany({
          where: category ? { category } : { published: true },
          select: {
            id: true,
            question: true,
            answer: true,
            category: true,
            priority: true,
            helpful: true,
            createdAt: true,
          },
          orderBy: { priority: 'desc' }
        })
      },
      CACHE_TTL.STATIC_DATA
    )
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Search results caching
  // SEARCH OPTIMIZATION: Fast search results for improved user experience
  public static async getSearchResults(query: string, limit: number = 10) {
    const cacheKey = CACHE_KEYS.SEARCH_RESULTS(`${query}:${limit}`)

    return CacheService.getOrSet(
      cacheKey,
      async () => {
        // Implement search logic here
        return prisma.$queryRaw`
          SELECT id, title, content, type, url
          FROM searchable_content
          WHERE to_tsvector('english', title || ' ' || content) @@ plainto_tsquery('english', ${query})
          ORDER BY ts_rank(to_tsvector('english', title || ' ' || content), plainto_tsquery('english', ${query})) DESC
          LIMIT ${limit}
        `
      },
      CACHE_TTL.SEARCH_RESULTS
    )
  }

  // CONTEXT7 SOURCE: /redis/node-redis - API response caching
  // API OPTIMIZATION: Cache expensive API responses for royal client performance
  public static async cacheAPIResponse<T>(
    endpoint: string,
    params: Record<string, any>,
    fetcher: () => Promise<T>,
    ttl: number = 3600 // 1 hour default
  ): Promise<T> {
    const paramsString = JSON.stringify(params)
    const cacheKey = CACHE_KEYS.API_RESPONSE(endpoint, paramsString)

    return CacheService.getOrSet(cacheKey, fetcher, ttl)
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Page-level caching
  // PAGE OPTIMIZATION: Full page caching for static content delivery
  public static async cachePage(
    path: string,
    content: string,
    ttl: number = CACHE_TTL.STATIC_DATA
  ): Promise<void> {
    const cacheKey = CACHE_KEYS.PAGE_CACHE(path)
    await RedisCache.set(cacheKey, content, ttl)
  }

  public static async getCachedPage(path: string): Promise<string | null> {
    const cacheKey = CACHE_KEYS.PAGE_CACHE(path)
    return RedisCache.get<string>(cacheKey)
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Session management caching
  // SESSION OPTIMIZATION: Fast session storage for authenticated users
  public static async setUserSession(
    sessionId: string,
    sessionData: any,
    ttl: number = CACHE_TTL.SESSION_DATA
  ): Promise<void> {
    const cacheKey = CACHE_KEYS.USER_SESSIONS(sessionId)
    await RedisCache.set(cacheKey, sessionData, ttl)
  }

  public static async getUserSession(sessionId: string): Promise<any | null> {
    const cacheKey = CACHE_KEYS.USER_SESSIONS(sessionId)
    return RedisCache.get(cacheKey)
  }

  public static async clearUserSession(sessionId: string): Promise<void> {
    const cacheKey = CACHE_KEYS.USER_SESSIONS(sessionId)
    await RedisCache.del(cacheKey)
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Cache invalidation strategies
  // CACHE MANAGEMENT: Intelligent cache invalidation for data consistency
  public static async invalidateUserCache(userId: string): Promise<void> {
    await Promise.all([
      RedisCache.del(CACHE_KEYS.USER_PROFILE(userId)),
      RedisCache.del(CACHE_KEYS.USER_PREFERENCES(userId)),
    ])
    console.log(`🧹 Invalidated cache for user: ${userId}`)
  }

  public static async invalidateContentCache(): Promise<void> {
    await Promise.all([
      RedisCache.delPattern('cms:*'),
      RedisCache.delPattern('faq:*'),
      RedisCache.del(CACHE_KEYS.TESTIMONIALS),
    ])
    console.log('🧹 Invalidated content cache')
  }

  public static async invalidateSearchCache(): Promise<void> {
    await RedisCache.delPattern('search:*')
    console.log('🧹 Invalidated search cache')
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Analytics caching
  // METRICS OPTIMIZATION: Fast analytics data for business intelligence dashboards
  public static async cacheAnalytics(
    metric: string,
    date: string,
    data: any,
    ttl: number = CACHE_TTL.ANALYTICS
  ): Promise<void> {
    const cacheKey = CACHE_KEYS.ANALYTICS(metric, date)
    await RedisCache.set(cacheKey, data, ttl)
  }

  public static async getAnalytics(metric: string, date: string): Promise<any | null> {
    const cacheKey = CACHE_KEYS.ANALYTICS(metric, date)
    return RedisCache.get(cacheKey)
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Performance metrics caching
  // MONITORING OPTIMIZATION: Cache performance data for real-time dashboards
  public static async updatePerformanceMetrics(metrics: any): Promise<void> {
    await RedisCache.set(
      CACHE_KEYS.PERFORMANCE_METRICS,
      {
        ...metrics,
        timestamp: new Date().toISOString(),
      },
      CACHE_TTL.ANALYTICS
    )
  }

  public static async getPerformanceMetrics(): Promise<any | null> {
    return RedisCache.get(CACHE_KEYS.PERFORMANCE_METRICS)
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Cache warming for optimal performance
  // PROACTIVE OPTIMIZATION: Warm frequently accessed data for royal client experience
  public static async warmCriticalCache(): Promise<void> {
    console.log('🔥 Starting critical cache warming...')

    try {
      await Promise.all([
        // Warm CMS content
        CacheService.getCMSContent('homepage'),
        CacheService.getCMSContent('services'),

        // Warm testimonials
        CacheService.getFeaturedTestimonials(),

        // Warm FAQ data
        CacheService.getFAQData(),
        CacheService.getFAQData('general'),

        // Warm popular search results
        CacheService.getSearchResults('tutoring'),
        CacheService.getSearchResults('oxbridge'),
        CacheService.getSearchResults('11+'),
      ])

      console.log('✅ Critical cache warming completed')
    } catch (error) {
      console.error('🚨 Cache warming failed:', error)
    }
  }

  // CONTEXT7 SOURCE: /redis/node-redis - Cache health monitoring
  // MONITORING: Cache performance health check for system reliability
  public static async getHealthStatus() {
    try {
      const [redisMetrics, testWrite, testRead] = await Promise.all([
        RedisCache.getMetrics(),
        RedisCache.set('health:test', Date.now(), 60),
        RedisCache.get('health:test')
      ])

      return {
        status: 'healthy',
        redis: {
          connected: true,
          metrics: redisMetrics,
          writeTest: testWrite,
          readTest: testRead !== null,
        },
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
    }
  }
}

export default CacheService