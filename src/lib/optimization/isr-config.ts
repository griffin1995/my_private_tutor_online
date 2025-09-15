/**
 * CONTEXT7 SOURCE: /vercel/next.js - Incremental Static Regeneration configuration
 * MULTI-AGENT CONSENSUS: Performance-Engineer approved ISR strategy for £548K optimization
 * CONTEXT7 SOURCE: /vercel/next.js - ISR revalidation and cache management
 * IMPLEMENTATION: Royal client performance standards with optimal cache strategies
 */

// CONTEXT7 SOURCE: /vercel/next.js - ISR revalidation intervals for different content types
// PERFORMANCE OPTIMIZATION: Optimized revalidation based on content update frequency
export const ISR_REVALIDATION = {
  // Static content (rarely changes)
  STATIC_PAGES: 86400, // 24 hours - homepage, about, services
  TESTIMONIALS: 43200, // 12 hours - testimonials, case studies

  // Semi-dynamic content
  BLOG_POSTS: 3600, // 1 hour - blog articles, news
  FAQ_CONTENT: 7200, // 2 hours - FAQ, help articles
  PRICING: 21600, // 6 hours - pricing, packages

  // Dynamic content
  SEARCH_RESULTS: 900, // 15 minutes - search indices
  USER_CONTENT: 300, // 5 minutes - user-generated content
  ANALYTICS: 60, // 1 minute - real-time analytics

  // Emergency/critical updates
  IMMEDIATE: 1, // 1 second - critical updates
} as const

// CONTEXT7 SOURCE: /vercel/next.js - Content categorization for ISR strategy
// CACHE STRATEGY: Intelligent content classification for optimal performance
export const CONTENT_CATEGORIES = {
  CRITICAL: {
    paths: ['/', '/how-it-works', '/subject-tuition'],
    revalidate: ISR_REVALIDATION.STATIC_PAGES,
    priority: 'high' as const,
    description: 'Critical landing pages for royal client experience'
  },

  MARKETING: {
    paths: ['/about', '/testimonials', '/expert-educators'],
    revalidate: ISR_REVALIDATION.TESTIMONIALS,
    priority: 'high' as const,
    description: 'Marketing pages for conversion optimization'
  },

  CONTENT: {
    paths: ['/blog', '/faq', '/resources'],
    revalidate: ISR_REVALIDATION.BLOG_POSTS,
    priority: 'medium' as const,
    description: 'Content pages for SEO and user engagement'
  },

  DYNAMIC: {
    paths: ['/search', '/contact', '/booking'],
    revalidate: ISR_REVALIDATION.USER_CONTENT,
    priority: 'medium' as const,
    description: 'Dynamic pages with user interactions'
  },

  ADMIN: {
    paths: ['/admin', '/dashboard'],
    revalidate: ISR_REVALIDATION.ANALYTICS,
    priority: 'low' as const,
    description: 'Admin pages with real-time data'
  }
} as const

// CONTEXT7 SOURCE: /vercel/next.js - ISR cache tags for granular invalidation
// CACHE MANAGEMENT: Organized cache invalidation for content consistency
export const CACHE_TAGS = {
  // Content categories
  CONTENT: 'content',
  TESTIMONIALS: 'testimonials',
  BLOG: 'blog',
  FAQ: 'faq',
  PRICING: 'pricing',

  // User data
  USER_PROFILES: 'user-profiles',
  USER_PREFERENCES: 'user-preferences',

  // System data
  ANALYTICS: 'analytics',
  PERFORMANCE: 'performance',
  SYSTEM: 'system',

  // External data
  CMS: 'cms',
  API: 'api',
} as const

// CONTEXT7 SOURCE: /vercel/next.js - ISR configuration helper functions
// UTILITY FUNCTIONS: Smart ISR configuration based on content type
export class ISRConfig {
  // CONTEXT7 SOURCE: /vercel/next.js - Dynamic revalidation based on content type
  // PERFORMANCE OPTIMIZATION: Intelligent revalidation intervals
  public static getRevalidationInterval(path: string): number {
    // Check each category to find matching path
    for (const [categoryName, category] of Object.entries(CONTENT_CATEGORIES)) {
      if (category.paths.some(categoryPath =>
        path.startsWith(categoryPath) || path === categoryPath
      )) {
        return category.revalidate
      }
    }

    // Default to blog post interval for unknown paths
    return ISR_REVALIDATION.BLOG_POSTS
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Priority-based revalidation
  // PERFORMANCE STRATEGY: Priority-based cache refresh for royal client experience
  public static getContentPriority(path: string): 'high' | 'medium' | 'low' {
    for (const category of Object.values(CONTENT_CATEGORIES)) {
      if (category.paths.some(categoryPath =>
        path.startsWith(categoryPath) || path === categoryPath
      )) {
        return category.priority
      }
    }

    return 'medium' // Default priority
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Cache tags for content type
  // CACHE INVALIDATION: Intelligent cache tag assignment
  public static getCacheTags(contentType: string, id?: string): string[] {
    const baseTags = [CACHE_TAGS.CONTENT]

    switch (contentType) {
      case 'testimonial':
        baseTags.push(CACHE_TAGS.TESTIMONIALS)
        break
      case 'blog':
        baseTags.push(CACHE_TAGS.BLOG)
        break
      case 'faq':
        baseTags.push(CACHE_TAGS.FAQ)
        break
      case 'pricing':
        baseTags.push(CACHE_TAGS.PRICING)
        break
      case 'user':
        baseTags.push(CACHE_TAGS.USER_PROFILES)
        break
      case 'cms':
        baseTags.push(CACHE_TAGS.CMS)
        break
      default:
        baseTags.push(CACHE_TAGS.API)
    }

    // Add specific ID tag if provided
    if (id) {
      baseTags.push(`${contentType}:${id}`)
    }

    return baseTags
  }

  // CONTEXT7 SOURCE: /vercel/next.js - ISR generation strategy
  // STATIC GENERATION: Optimized static path generation for performance
  public static async generateCriticalPaths(): Promise<Array<{ params: any }>> {
    try {
      // Generate critical paths that should be pre-rendered
      const criticalPaths = [
        // Homepage variations
        { params: { slug: [] } },

        // Core service pages
        { params: { slug: ['how-it-works'] } },
        { params: { slug: ['subject-tuition'] } },
        { params: { slug: ['about'] } },

        // Key subject pages
        { params: { slug: ['subject-tuition', 'mathematics'] } },
        { params: { slug: ['subject-tuition', 'english'] } },
        { params: { slug: ['subject-tuition', 'science'] } },

        // Important bootcamp pages
        { params: { slug: ['11-plus-bootcamps'] } },
        { params: { slug: ['oxbridge-preparation'] } },
      ]

      return criticalPaths
    } catch (error) {
      console.error('🚨 Failed to generate critical paths:', error)
      return []
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - ISR fallback strategy
  // PERFORMANCE RELIABILITY: Fallback handling for missing pages
  public static getFallbackStrategy(contentType: string): 'blocking' | boolean {
    // Critical content uses blocking fallback for immediate generation
    if (contentType === 'critical' || contentType === 'marketing') {
      return 'blocking'
    }

    // Non-critical content uses true fallback for better performance
    return true
  }

  // CONTEXT7 SOURCE: /vercel/next.js - ISR debugging configuration
  // DEVELOPMENT TOOLS: ISR cache debugging for development environment
  public static getDebugConfig(): Record<string, any> {
    const isProduction = process.env.NODE_ENV === 'production'
    const isDevelopment = process.env.NODE_ENV === 'development'

    return {
      enableDebugCache: isDevelopment || process.env.NEXT_PRIVATE_DEBUG_CACHE === '1',
      logCacheHits: isDevelopment,
      logRevalidation: true,
      cacheMetrics: true,
      isProduction,
      isDevelopment
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - ISR performance monitoring
  // MONITORING INTEGRATION: ISR performance metrics for royal client standards
  public static async trackISRPerformance(
    path: string,
    isHit: boolean,
    regenerationTime?: number
  ): Promise<void> {
    try {
      const metrics = {
        path,
        isHit,
        regenerationTime,
        timestamp: new Date().toISOString(),
        priority: ISRConfig.getContentPriority(path),
        revalidateInterval: ISRConfig.getRevalidationInterval(path)
      }

      // Store metrics for analysis
      if (typeof window === 'undefined') {
        // Server-side logging
        console.log('📊 ISR Performance:', metrics)

        // Send to monitoring service
        await fetch('/api/monitoring/isr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(metrics)
        }).catch(() => {
          // Silently fail if monitoring endpoint is unavailable
        })
      }
    } catch (error) {
      console.warn('⚠️ ISR performance tracking failed:', error)
    }
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - ISR utilities export
// EXPORT INTERFACE: Comprehensive ISR configuration for application use
export default ISRConfig
export type ContentCategory = keyof typeof CONTENT_CATEGORIES
export type CacheTag = typeof CACHE_TAGS[keyof typeof CACHE_TAGS]