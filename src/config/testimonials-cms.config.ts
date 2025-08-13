/**
 * TESTIMONIALS CMS CONFIGURATION
 * CONTEXT7 SOURCE: /microsoft/typescript - Configuration patterns for enterprise systems
 * CONTEXT7 SOURCE: /microsoft/typescript - Type-safe configuration management
 * 
 * PHASE 1 TASK 8: Centralized configuration for comprehensive CMS integration
 * Provides unified configuration for all CMS components, ensuring consistent
 * behavior across the testimonials management system.
 * 
 * BUSINESS IMPACT: Centralized control enables rapid optimization for £400,000+ revenue
 * ROYAL STANDARDS: Enterprise-grade configuration management for elite service
 */

import type { PerformanceConfig } from '@/lib/cms/cms-performance'
import type { TestimonialsPageContent } from '@/lib/cms/testimonials-cms-manager'

// CONTEXT7 SOURCE: /microsoft/typescript - Comprehensive configuration interface
export interface TestimonialsCMSConfig {
  readonly performance: PerformanceConfig
  readonly validation: ValidationConfig
  readonly analytics: AnalyticsConfig
  readonly admin: AdminConfig
  readonly content: ContentConfig
}

export interface ValidationConfig {
  readonly strictMode: boolean
  readonly autofix: boolean
  readonly businessRulesEnabled: boolean
  readonly minimumTestimonialLength: number
  readonly maximumTestimonialLength: number
  readonly requiredFields: readonly string[]
  readonly warningThresholds: {
    readonly lowRating: number
    readonly shortQuote: number
    readonly longQuote: number
  }
}

export interface AnalyticsConfig {
  readonly trackingEnabled: boolean
  readonly privacyMode: boolean
  readonly dataRetentionDays: number
  readonly batchSize: number
  readonly flushInterval: number
  readonly insightsEnabled: boolean
  readonly revenueTracking: boolean
  readonly performanceMonitoring: boolean
}

export interface AdminConfig {
  readonly autoSave: boolean
  readonly autoSaveInterval: number
  readonly previewMode: boolean
  readonly backupEnabled: boolean
  readonly backupInterval: number
  readonly accessControl: {
    readonly requireAuth: boolean
    readonly allowedRoles: readonly string[]
  }
  readonly ui: {
    readonly theme: 'light' | 'dark' | 'auto'
    readonly compactMode: boolean
    readonly showMetrics: boolean
    readonly showInsights: boolean
  }
}

export interface ContentConfig {
  readonly defaultValues: Partial<TestimonialsPageContent>
  readonly contentSources: {
    readonly enabledSources: readonly string[]
    readonly fallbackBehavior: 'error' | 'default' | 'cache'
  }
  readonly optimization: {
    readonly imageCompression: boolean
    readonly videoOptimization: boolean
    readonly contentMinification: boolean
  }
  readonly localization: {
    readonly defaultLocale: string
    readonly supportedLocales: readonly string[]
    readonly fallbackLocale: string
  }
}

// Default configuration for production deployment
export const DEFAULT_TESTIMONIALS_CMS_CONFIG: TestimonialsCMSConfig = {
  performance: {
    cacheExpiry: 15 * 60 * 1000, // 15 minutes
    maxCacheSize: 5 * 1024 * 1024, // 5MB
    preloadThreshold: 2000, // 2 seconds
    lazyLoadThreshold: 500, // 500 pixels
    compressionEnabled: true,
    metricsEnabled: true
  },

  validation: {
    strictMode: true,
    autofix: false,
    businessRulesEnabled: true,
    minimumTestimonialLength: 50,
    maximumTestimonialLength: 500,
    requiredFields: ['quote', 'author', 'role', 'rating'],
    warningThresholds: {
      lowRating: 4,
      shortQuote: 50,
      longQuote: 500
    }
  },

  analytics: {
    trackingEnabled: true,
    privacyMode: false,
    dataRetentionDays: 90,
    batchSize: 50,
    flushInterval: 30000, // 30 seconds
    insightsEnabled: true,
    revenueTracking: true,
    performanceMonitoring: true
  },

  admin: {
    autoSave: true,
    autoSaveInterval: 30000, // 30 seconds
    previewMode: true,
    backupEnabled: true,
    backupInterval: 60 * 60 * 1000, // 1 hour
    accessControl: {
      requireAuth: true,
      allowedRoles: ['admin', 'content_manager', 'editor']
    },
    ui: {
      theme: 'light',
      compactMode: false,
      showMetrics: true,
      showInsights: true
    }
  },

  content: {
    defaultValues: {
      hero: {
        title: 'What Our Families Say',
        subtitle: 'Real experiences from our premium tutoring community',
        description: 'Discover how My Private Tutor Online has transformed educational journeys for families across the UK',
        backgroundVariant: 'gradient',
        size: 'standard',
        showCredentials: true
      },
      cta: {
        title: 'Ready to Join Our Success Stories?',
        description: 'Experience the premium tutoring that creates these amazing testimonials',
        primaryButton: {
          text: 'Get Your Free Consultation',
          href: '/contact',
          variant: 'premium'
        },
        backgroundVariant: 'gradient'
      }
    },
    contentSources: {
      enabledSources: ['cms', 'api', 'static'],
      fallbackBehavior: 'cache'
    },
    optimization: {
      imageCompression: true,
      videoOptimization: true,
      contentMinification: false // Preserve readability in production
    },
    localization: {
      defaultLocale: 'en-GB',
      supportedLocales: ['en-GB', 'en-US'],
      fallbackLocale: 'en-GB'
    }
  }
}

// Development configuration with relaxed constraints
export const DEVELOPMENT_TESTIMONIALS_CMS_CONFIG: TestimonialsCMSConfig = {
  ...DEFAULT_TESTIMONIALS_CMS_CONFIG,
  
  performance: {
    ...DEFAULT_TESTIMONIALS_CMS_CONFIG.performance,
    cacheExpiry: 5 * 60 * 1000, // 5 minutes for faster development
    metricsEnabled: false // Reduce console noise
  },
  
  validation: {
    ...DEFAULT_TESTIMONIALS_CMS_CONFIG.validation,
    strictMode: false,
    autofix: true,
    businessRulesEnabled: false // Allow development flexibility
  },
  
  analytics: {
    ...DEFAULT_TESTIMONIALS_CMS_CONFIG.analytics,
    trackingEnabled: false, // No tracking in development
    privacyMode: true
  },
  
  admin: {
    ...DEFAULT_TESTIMONIALS_CMS_CONFIG.admin,
    accessControl: {
      requireAuth: false,
      allowedRoles: ['*'] // Allow all roles in development
    },
    autoSaveInterval: 10000 // More frequent saves for development
  }
}

// Testing configuration for automated tests
export const TESTING_TESTIMONIALS_CMS_CONFIG: TestimonialsCMSConfig = {
  ...DEFAULT_TESTIMONIALS_CMS_CONFIG,
  
  performance: {
    ...DEFAULT_TESTIMONIALS_CMS_CONFIG.performance,
    cacheExpiry: 1000, // 1 second for fast tests
    maxCacheSize: 1024 * 1024, // 1MB
    metricsEnabled: false
  },
  
  validation: {
    ...DEFAULT_TESTIMONIALS_CMS_CONFIG.validation,
    strictMode: true,
    businessRulesEnabled: true // Ensure validation works in tests
  },
  
  analytics: {
    ...DEFAULT_TESTIMONIALS_CMS_CONFIG.analytics,
    trackingEnabled: false,
    dataRetentionDays: 1,
    batchSize: 10,
    flushInterval: 1000
  },
  
  admin: {
    ...DEFAULT_TESTIMONIALS_CMS_CONFIG.admin,
    autoSave: false,
    backupEnabled: false,
    accessControl: {
      requireAuth: false,
      allowedRoles: ['*']
    }
  }
}

// Environment-based configuration selector
export function getTestimonialsCMSConfig(): TestimonialsCMSConfig {
  const environment = process.env.NODE_ENV

  switch (environment) {
    case 'development':
      return DEVELOPMENT_TESTIMONIALS_CMS_CONFIG
    case 'test':
      return TESTING_TESTIMONIALS_CMS_CONFIG
    case 'production':
    default:
      return DEFAULT_TESTIMONIALS_CMS_CONFIG
  }
}

// Configuration validation
export function validateCMSConfig(config: TestimonialsCMSConfig): {
  valid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []

  // Performance validation
  if (config.performance.cacheExpiry < 1000) {
    warnings.push('Cache expiry is very low, may impact performance')
  }
  if (config.performance.maxCacheSize > 10 * 1024 * 1024) {
    warnings.push('Cache size is very large, may impact memory usage')
  }

  // Validation configuration checks
  if (config.validation.minimumTestimonialLength < 10) {
    errors.push('Minimum testimonial length too short for meaningful content')
  }
  if (config.validation.maximumTestimonialLength > 1000) {
    warnings.push('Maximum testimonial length may impact readability')
  }

  // Analytics configuration checks
  if (config.analytics.dataRetentionDays > 365) {
    warnings.push('Data retention period is very long, consider privacy implications')
  }
  if (config.analytics.batchSize > 1000) {
    warnings.push('Large batch size may impact performance')
  }

  // Admin configuration checks
  if (config.admin.autoSaveInterval < 10000) {
    warnings.push('Auto-save interval is very frequent, may impact performance')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

// Configuration utilities
export const CMSConfigUtils = {
  /**
   * Merge configurations with deep merge
   */
  mergeConfig(
    base: TestimonialsCMSConfig, 
    override: Partial<TestimonialsCMSConfig>
  ): TestimonialsCMSConfig {
    return {
      performance: { ...base.performance, ...override.performance },
      validation: { ...base.validation, ...override.validation },
      analytics: { ...base.analytics, ...override.analytics },
      admin: { ...base.admin, ...override.admin },
      content: { ...base.content, ...override.content }
    }
  },

  /**
   * Get configuration for specific feature
   */
  getFeatureConfig<K extends keyof TestimonialsCMSConfig>(
    config: TestimonialsCMSConfig, 
    feature: K
  ): TestimonialsCMSConfig[K] {
    return config[feature]
  },

  /**
   * Check if feature is enabled
   */
  isFeatureEnabled(config: TestimonialsCMSConfig, feature: string): boolean {
    switch (feature) {
      case 'analytics':
        return config.analytics.trackingEnabled
      case 'validation':
        return config.validation.strictMode
      case 'admin':
        return config.admin.accessControl.requireAuth
      case 'performance':
        return config.performance.metricsEnabled
      default:
        return false
    }
  },

  /**
   * Get performance budget based on configuration
   */
  getPerformanceBudget(config: TestimonialsCMSConfig): {
    loadTime: number
    cacheSize: number
    renderTime: number
  } {
    return {
      loadTime: config.performance.preloadThreshold,
      cacheSize: config.performance.maxCacheSize,
      renderTime: 100 // Default render time budget
    }
  }
}

// Export default configuration
export default DEFAULT_TESTIMONIALS_CMS_CONFIG