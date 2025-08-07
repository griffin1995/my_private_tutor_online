/**
 * CONTEXT7 SOURCE: /vercel/next.js - Server Components caching patterns and service layer architecture
 * CONTEXT7 SOURCE: /reactjs/react.dev - React cache function for memoizing data requests and singleton patterns
 * 
 * CMSService - Comprehensive unified data access layer for My Private Tutor Online
 * 
 * Architecture Pattern: Singleton Service Layer with Type-Safe Data Access
 * Performance Optimization: React cache() integration for all data operations
 * Error Handling: Comprehensive validation and fallback mechanisms
 * 
 * Design Decisions:
 * - Singleton pattern ensures single instance across application
 * - Generic methods provide type-safe content access
 * - Built-in caching with TTL for performance optimization
 * - Content validation and sanitization for data integrity
 * - Development tools and debugging capabilities
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content must use centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: CMS comment requirement
 * - Rule 25: Structured data management
 */

// CONTEXT7 SOURCE: /reactjs/react.dev - React cache function for memoizing expensive computations
// CONTEXT7 SOURCE: /vercel/next.js - Server Components caching patterns for performance optimization
import { cache } from 'react'

// CONTEXT7 SOURCE: /microsoft/typescript - Module import patterns for comprehensive type access
// CMS DATA SOURCE: Import all existing CMS functions and types for unified service access
import type {
  // Core content types
  BaseCMSContent,
  CMSResponse,
  UnifiedContactData,
  SiteHeader,
  HeroContent,
  TrustIndicator,
  Testimonial,
  Service,
  Statistic,
  FooterContent,
  HowItWorksContent,
  FAQContent,
  AboutContent,
  TestimonialsContent,
  QuoteFormContent,
  FormContent,
  QuoteContent,
  CTASection,
  SiteConfig,
  ContactDetails,
  BusinessDetails,
  PricingInfo,
  NavigationItem,
  // Image asset types
  ImageAsset,
  VideoAsset,
  BackgroundVideoAsset,
  ResponsiveImageSizes,
  InstitutionLogo,
  TeamMemberImage,
  MediaLogo
} from './cms-content'

// Import all existing CMS functions to be wrapped in the service
import {
  // Content functions
  getSiteHeader,
  getHeroContent,
  getTrustIndicators,
  getTestimonials,
  getServices,
  getResultsStatistics,
  getUnifiedContact,
  getFooterContent,
  getBusinessContent,
  getAboutContent,
  getMainNavigation,
  getSiteBranding,
  getHowItWorksContent,
  getFAQContent,
  getTestimonialsContent,
  getQuotes,
  getFounderQuote,
  getRoyalTestimonial,
  getQuoteFormContent,
  getCTAContent,
  getFormContent,
  getSiteConfig,
  getContactDetails,
  getBusinessDetails,
  getPricingInfo,
  validateContentStructure,
  formatBritishEnglish,
  getCopyrightText
} from './cms-content'

import {
  // Image functions
  getMainLogo,
  getMainLogoWhite,
  getFooterLogo,
  getInstitutionLogos,
  getScrollingSchoolLogos,
  getMediaImages,
  getTutorImages,
  getVideoContent,
  getMarketingAssets,
  getHeroImage,
  getIntroVideo,
  getTeamImages,
  getTestimonialImages,
  getVideoPlaceholders,
  getBackgroundVideo,
  getBackgroundVideos,
  getStudentImages,
  getFallbackImage,
  getAvatarPlaceholder,
  generateResponsiveSizes,
  generateSrcSet,
  getOptimizedImageProps,
  validateImageAccessibility,
  getCriticalImages
} from './cms-images'

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for service configuration
// CONTEXT7 SOURCE: /microsoft/typescript - Generic type constraints for flexible data access
/**
 * Cache configuration interface for performance optimization
 */
export interface CacheConfig {
  readonly ttl: number // Time to live in milliseconds
  readonly maxEntries: number // Maximum cache entries
  readonly enableDebug: boolean // Enable cache debugging
}

/**
 * Cache statistics for performance monitoring
 */
export interface CacheStats {
  readonly hits: number
  readonly misses: number
  readonly size: number
  readonly hitRate: number
}

/**
 * Service configuration interface
 */
export interface CMSServiceConfig {
  readonly cache: CacheConfig
  readonly validation: {
    readonly enableValidation: boolean
    readonly throwOnValidationError: boolean
  }
  readonly development: {
    readonly enableDebugLogging: boolean
    readonly logPerformanceMetrics: boolean
  }
}

/**
 * Content validation result interface
 */
export interface ValidationResult<T> {
  readonly isValid: boolean
  readonly data: T
  readonly errors: readonly string[]
  readonly warnings: readonly string[]
}

/**
 * Performance metrics for monitoring
 */
export interface PerformanceMetrics {
  readonly functionName: string
  readonly executionTime: number
  readonly cacheHit: boolean
  readonly timestamp: number
}

// CONTEXT7 SOURCE: /microsoft/typescript - Class design patterns for singleton implementation
// CONTEXT7 SOURCE: /reactjs/react.dev - Service layer patterns with React cache integration
/**
 * CMSService - Unified, type-safe data access layer for all CMS operations
 * 
 * Features:
 * - Singleton pattern for single instance across application
 * - Generic methods with full TypeScript support
 * - Built-in caching with React cache() integration
 * - Comprehensive error handling and validation
 * - Performance monitoring and debugging tools
 * - Content sanitization and validation
 */
export class CMSService {
  // CONTEXT7 SOURCE: /microsoft/typescript - Singleton pattern implementation with private constructor
  private static instance: CMSService
  private cache: Map<string, { data: unknown; timestamp: number; ttl: number }> = new Map()
  private cacheStats: { hits: number; misses: number } = { hits: 0, misses: 0 }
  private performanceMetrics: PerformanceMetrics[] = []

  // Default service configuration
  private config: CMSServiceConfig = {
    cache: {
      ttl: 5 * 60 * 1000, // 5 minutes default TTL
      maxEntries: 100,
      enableDebug: process.env.NODE_ENV === 'development'
    },
    validation: {
      enableValidation: true,
      throwOnValidationError: false
    },
    development: {
      enableDebugLogging: process.env.NODE_ENV === 'development',
      logPerformanceMetrics: process.env.NODE_ENV === 'development'
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Private constructor for singleton pattern
  private constructor(config?: Partial<CMSServiceConfig>) {
    if (config) {
      this.config = { ...this.config, ...config }
    }
    this.initializeService()
  }

  /**
   * Get singleton instance of CMSService
   * CONTEXT7 SOURCE: /microsoft/typescript - Singleton getInstance pattern
   */
  public static getInstance(config?: Partial<CMSServiceConfig>): CMSService {
    if (!CMSService.instance) {
      CMSService.instance = new CMSService(config)
    }
    return CMSService.instance
  }

  /**
   * Initialize service with validation and setup
   * CONTEXT7 SOURCE: /microsoft/typescript - Service initialization patterns
   */
  private initializeService(): void {
    if (this.config.development.enableDebugLogging) {
      console.log('🚀 CMSService initialized with configuration:', {
        cacheEnabled: true,
        validationEnabled: this.config.validation.enableValidation,
        debugMode: this.config.development.enableDebugLogging
      })
    }

    // Validate content structure on initialization
    if (this.config.validation.enableValidation) {
      const isValid = validateContentStructure()
      if (!isValid && this.config.validation.throwOnValidationError) {
        throw new Error('CMS content structure validation failed')
      }
    }
  }

  // ========================================================================================
  // GENERIC DATA ACCESS METHODS - Type-safe content retrieval with caching
  // ========================================================================================

  /**
   * Generic method to get cached content with type safety
   * CONTEXT7 SOURCE: /microsoft/typescript - Generic method patterns with type constraints
   * CONTEXT7 SOURCE: /reactjs/react.dev - Memoization patterns for data access
   */
  private getCachedContent<T>(
    key: string,
    fetcher: () => T,
    ttl?: number
  ): ValidationResult<T> {
    const startTime = performance.now()
    let cacheHit = false

    try {
      // Check cache first
      const cached = this.cache.get(key)
      const now = Date.now()
      
      if (cached && (now - cached.timestamp) < (ttl || cached.ttl)) {
        this.cacheStats.hits++
        cacheHit = true
        
        const result: ValidationResult<T> = {
          isValid: true,
          data: cached.data as T,
          errors: [],
          warnings: []
        }
        
        this.recordPerformance(key, performance.now() - startTime, cacheHit)
        return result
      }

      // Cache miss - fetch fresh data
      this.cacheStats.misses++
      const data = fetcher()
      
      // Validate data if validation is enabled
      const validationResult = this.validateContent(data)
      
      // Cache the data
      this.cache.set(key, {
        data,
        timestamp: now,
        ttl: ttl || this.config.cache.ttl
      })
      
      // Enforce cache size limit
      this.enforceMaxCacheSize()
      
      const result: ValidationResult<T> = {
        isValid: validationResult.isValid,
        data,
        errors: validationResult.errors,
        warnings: validationResult.warnings
      }
      
      this.recordPerformance(key, performance.now() - startTime, cacheHit)
      return result

    } catch (error) {
      this.recordPerformance(key, performance.now() - startTime, cacheHit)
      
      return {
        isValid: false,
        data: {} as T,
        errors: [`Failed to fetch content for key "${key}": ${error}`],
        warnings: []
      }
    }
  }

  /**
   * Generic content getter with automatic error handling
   * CONTEXT7 SOURCE: /microsoft/typescript - Generic method with error handling patterns
   */
  public getContent<T>(key: string, fetcher: () => T, fallback?: T): T {
    const result = this.getCachedContent(key, fetcher)
    
    if (!result.isValid) {
      if (this.config.development.enableDebugLogging) {
        console.warn(`CMS content validation failed for key "${key}":`, result.errors)
      }
      
      if (fallback !== undefined) {
        return fallback
      }
    }
    
    return result.data
  }

  // ========================================================================================
  // CONTENT ACCESS METHODS - Typed wrappers for all CMS content
  // ========================================================================================

  /**
   * Get site header content with caching
   * CONTEXT7 SOURCE: /reactjs/react.dev - cache() integration for React Server Components
   * CMS DATA SOURCE: Using getSiteHeader for navigation and branding
   */
  public getSiteHeader = cache((): SiteHeader => {
    return this.getContent('site-header', getSiteHeader, {
      siteName: 'My Private Tutor Online',
      logo: '/images/logos/logo-with-name.png',
      navigation: []
    })
  })

  /**
   * Get hero section content with caching
   * CMS DATA SOURCE: Using getHeroContent for homepage hero section
   */
  public getHeroContent = cache((): HeroContent => {
    return this.getContent('hero-content', getHeroContent, {
      title: 'Premium Private Tutoring',
      subtitle: 'Excellence in Education',
      description: 'Professional tutoring services',
      image: '/images/hero/child_book_and_laptop.avif',
      imageAlt: 'Student learning',
      ctaButtons: []
    })
  })

  /**
   * Get trust indicators for credibility section
   * CMS DATA SOURCE: Using getTrustIndicators for social proof
   */
  public getTrustIndicators = cache((): TrustIndicator[] => {
    return this.getContent('trust-indicators', getTrustIndicators, [])
  })

  /**
   * Get testimonials for social proof
   * CMS DATA SOURCE: Using getTestimonials for customer testimonials
   */
  public getTestimonials = cache((): Testimonial[] => {
    return this.getContent('testimonials', getTestimonials, [])
  })

  /**
   * Get services offered by the tutoring company
   * CMS DATA SOURCE: Using getServices for service listings
   */
  public getServices = cache((): readonly Service[] => {
    return this.getContent('services', getServices, [])
  })

  /**
   * Get academic results statistics
   * CMS DATA SOURCE: Using getResultsStatistics for performance metrics
   */
  public getResultsStatistics = cache((): Statistic[] => {
    return this.getContent('results-statistics', getResultsStatistics, [])
  })

  /**
   * Get unified contact data from all sources
   * CMS DATA SOURCE: Using getUnifiedContact for consolidated contact information
   */
  public getUnifiedContact = cache((): UnifiedContactData => {
    return this.getContent('unified-contact', getUnifiedContact)
  })

  /**
   * Get footer content including links and company information
   * CMS DATA SOURCE: Using getFooterContent for site footer
   */
  public getFooterContent = cache((): FooterContent => {
    return this.getContent('footer-content', getFooterContent, {
      companyName: 'My Private Tutor Online',
      description: 'Premium tutoring services',
      sections: []
    })
  })

  /**
   * Get business content for about/company pages
   * CMS DATA SOURCE: Using getBusinessContent for company information
   */
  public getBusinessContent = cache(() => {
    return this.getContent('business-content', getBusinessContent, {
      companyName: 'My Private Tutor Online',
      founded: '2010',
      heritage: '15 years of educational excellence'
    })
  })

  /**
   * Get about page content
   * CMS DATA SOURCE: Using getAboutContent for about page information
   */
  public getAboutContent = cache((): AboutContent => {
    return this.getContent('about-content', getAboutContent)
  })

  /**
   * Get main navigation items
   * CMS DATA SOURCE: Using getMainNavigation for primary navigation
   */
  public getMainNavigation = cache((): NavigationItem[] => {
    return this.getContent('main-navigation', getMainNavigation, [])
  })

  /**
   * Get site branding information
   * CMS DATA SOURCE: Using getSiteBranding for brand elements
   */
  public getSiteBranding = cache(() => {
    return this.getContent('site-branding', getSiteBranding, {
      siteName: 'My Private Tutor Online',
      logo: '/images/logos/logo-with-name.png',
      companyName: 'My Private Tutor Online',
      description: 'Premium tutoring services'
    })
  })

  /**
   * Get How It Works content
   * CMS DATA SOURCE: Using getHowItWorksContent for process explanation
   */
  public getHowItWorksContent = cache((): HowItWorksContent => {
    return this.getContent('how-it-works-content', getHowItWorksContent)
  })

  /**
   * Get FAQ content
   * CMS DATA SOURCE: Using getFAQContent for frequently asked questions
   */
  public getFAQContent = cache((): FAQContent => {
    return this.getContent('faq-content', getFAQContent)
  })

  /**
   * Get testimonials page content
   * CMS DATA SOURCE: Using getTestimonialsContent for testimonials page
   */
  public getTestimonialsContent = cache((): TestimonialsContent => {
    return this.getContent('testimonials-content', getTestimonialsContent)
  })

  /**
   * Get quotes for quote sections
   * CMS DATA SOURCE: Using getQuotes for quote components
   */
  public getQuotes = cache((): QuoteContent => {
    return this.getContent('quotes-content', getQuotes)
  })

  /**
   * Get founder quote
   * CMS DATA SOURCE: Using getFounderQuote for Elizabeth Burrows testimonial
   */
  public getFounderQuote = cache(() => {
    return this.getContent('founder-quote', getFounderQuote)
  })

  /**
   * Get royal testimonial
   * CMS DATA SOURCE: Using getRoyalTestimonial for premium service showcase
   */
  public getRoyalTestimonial = cache(() => {
    return this.getContent('royal-testimonial', getRoyalTestimonial)
  })

  /**
   * Get quote form content
   * CMS DATA SOURCE: Using getQuoteFormContent for quote request form
   */
  public getQuoteFormContent = cache((): QuoteFormContent => {
    return this.getContent('quote-form-content', getQuoteFormContent)
  })

  /**
   * Get CTA section content
   * CMS DATA SOURCE: Using getCTAContent for call-to-action components
   */
  public getCTAContent = cache((): CTASection => {
    return this.getContent('cta-content', getCTAContent)
  })

  /**
   * Get form content for all form components
   * CMS DATA SOURCE: Using getFormContent for form-related content
   */
  public getFormContent = cache((): FormContent => {
    return this.getContent('form-content', getFormContent)
  })

  /**
   * Get site configuration settings
   * CMS DATA SOURCE: Using getSiteConfig for site configuration
   */
  public getSiteConfig = cache((): SiteConfig => {
    return this.getContent('site-config', getSiteConfig)
  })

  /**
   * Get contact details from settings
   * CMS DATA SOURCE: Using getContactDetails for contact information
   */
  public getContactDetails = cache((): ContactDetails => {
    return this.getContent('contact-details', getContactDetails)
  })

  /**
   * Get business details and qualifications
   * CMS DATA SOURCE: Using getBusinessDetails for business information
   */
  public getBusinessDetails = cache((): BusinessDetails => {
    return this.getContent('business-details', getBusinessDetails)
  })

  /**
   * Get pricing information
   * CMS DATA SOURCE: Using getPricingInfo for pricing details
   */
  public getPricingInfo = cache((): PricingInfo => {
    return this.getContent('pricing-info', getPricingInfo)
  })

  // ========================================================================================
  // IMAGE ACCESS METHODS - Typed wrappers for all CMS images
  // ========================================================================================

  /**
   * Get main site logo
   * CMS DATA SOURCE: Using getMainLogo for header logo
   */
  public getMainLogo = cache((): ImageAsset => {
    return this.getContent('main-logo', getMainLogo, {
      src: '/images/logos/logo-with-name.png',
      alt: 'My Private Tutor Online',
      width: 200,
      height: 80,
      loading: 'eager' as const,
      priority: true
    })
  })

  /**
   * Get white variant of main logo
   * CMS DATA SOURCE: Using getMainLogoWhite for transparent header
   */
  public getMainLogoWhite = cache((): ImageAsset => {
    return this.getContent('main-logo-white', getMainLogoWhite, {
      src: '/images/logos/logo-with-name-white.png',
      alt: 'My Private Tutor Online',
      width: 200,
      height: 80,
      loading: 'eager' as const,
      priority: true
    })
  })

  /**
   * Get footer logo
   * CMS DATA SOURCE: Using getFooterLogo for footer branding
   */
  public getFooterLogo = cache((): ImageAsset => {
    return this.getContent('footer-logo', getFooterLogo)
  })

  /**
   * Get all institution logos
   * CMS DATA SOURCE: Using getInstitutionLogos for credibility logos
   */
  public getInstitutionLogos = cache(() => {
    return this.getContent('institution-logos', getInstitutionLogos, {})
  })

  /**
   * Get school logos for scrolling carousel
   * CMS DATA SOURCE: Using getScrollingSchoolLogos for carousel display
   */
  public getScrollingSchoolLogos = cache(() => {
    return this.getContent('scrolling-school-logos', getScrollingSchoolLogos, {})
  })

  /**
   * Get media recognition images
   * CMS DATA SOURCE: Using getMediaImages for press and media logos
   */
  public getMediaImages = cache(() => {
    return this.getContent('media-images', getMediaImages, {})
  })

  /**
   * Get tutor profile images
   * CMS DATA SOURCE: Using getTutorImages for tutor profile photos
   */
  public getTutorImages = cache(() => {
    return this.getContent('tutor-images', getTutorImages, {})
  })

  /**
   * Get video testimonial content
   * CMS DATA SOURCE: Using getVideoContent for testimonial videos
   */
  public getVideoContent = cache(() => {
    return this.getContent('video-content', getVideoContent, {})
  })

  /**
   * Get marketing assets and materials
   * CMS DATA SOURCE: Using getMarketingAssets for promotional materials
   */
  public getMarketingAssets = cache(() => {
    return this.getContent('marketing-assets', getMarketingAssets, {})
  })

  /**
   * Get hero section image
   * CMS DATA SOURCE: Using getHeroImage for hero section
   */
  public getHeroImage = cache((): ImageAsset => {
    return this.getContent('hero-image', getHeroImage)
  })

  /**
   * Get intro video asset
   * CMS DATA SOURCE: Using getIntroVideo for introduction video
   */
  public getIntroVideo = cache((): ImageAsset => {
    return this.getContent('intro-video', getIntroVideo)
  })

  /**
   * Get team member images
   * CMS DATA SOURCE: Using getTeamImages for team member photos
   */
  public getTeamImages = cache(() => {
    return this.getContent('team-images', getTeamImages, {})
  })

  /**
   * Get testimonial images
   * CMS DATA SOURCE: Using getTestimonialImages for testimonial photos
   */
  public getTestimonialImages = cache(() => {
    return this.getContent('testimonial-images', getTestimonialImages, {})
  })

  /**
   * Get video placeholder images
   * CMS DATA SOURCE: Using getVideoPlaceholders for video thumbnails
   */
  public getVideoPlaceholders = cache(() => {
    return this.getContent('video-placeholders', getVideoPlaceholders, {})
  })

  /**
   * Get background video for video-text effects
   * CMS DATA SOURCE: Using getBackgroundVideo for video-text components
   */
  public getBackgroundVideo = cache((videoKey: string): BackgroundVideoAsset => {
    return this.getContent(`background-video-${videoKey}`, () => getBackgroundVideo(videoKey as any))
  })

  /**
   * Get all background videos
   * CMS DATA SOURCE: Using getBackgroundVideos for complete video inventory
   */
  public getBackgroundVideos = cache(() => {
    return this.getContent('background-videos', getBackgroundVideos, {})
  })

  /**
   * Get student images for results section
   * CMS DATA SOURCE: Using getStudentImages for results section photos
   */
  public getStudentImages = cache(() => {
    return this.getContent('student-images', getStudentImages, {})
  })

  /**
   * Get fallback image for missing assets
   * CMS DATA SOURCE: Using getFallbackImage for missing images
   */
  public getFallbackImage = cache((): ImageAsset => {
    return this.getContent('fallback-image', getFallbackImage, {
      src: '/images/placeholder.svg',
      alt: 'Placeholder image',
      width: 400,
      height: 300,
      loading: 'lazy' as const
    })
  })

  /**
   * Get avatar placeholder for testimonials
   * CMS DATA SOURCE: Using getAvatarPlaceholder for missing avatars
   */
  public getAvatarPlaceholder = cache((): ImageAsset => {
    return this.getContent('avatar-placeholder', getAvatarPlaceholder)
  })

  // ========================================================================================
  // UTILITY METHODS - Content processing and optimization
  // ========================================================================================

  /**
   * Generate responsive image sizes
   * CONTEXT7 SOURCE: /microsoft/typescript - Utility function patterns with type safety
   */
  public generateResponsiveSizes(baseWidth: number): ResponsiveImageSizes {
    return generateResponsiveSizes(baseWidth)
  }

  /**
   * Generate srcset for responsive images
   */
  public generateSrcSet(src: string, sizes: Record<string, number>): string {
    return generateSrcSet(src, sizes)
  }

  /**
   * Get optimized image props for Next.js Image component
   */
  public getOptimizedImageProps(image: ImageAsset, customSizes?: string) {
    return getOptimizedImageProps(image, customSizes)
  }

  /**
   * Format text to use British English spellings
   */
  public formatBritishEnglish(text: string): string {
    return formatBritishEnglish(text)
  }

  /**
   * Get formatted copyright text with current year
   */
  public getCopyrightText(): string {
    return getCopyrightText()
  }

  /**
   * Get critical images for preloading
   */
  public getCriticalImages = cache((): readonly ImageAsset[] => {
    return this.getContent('critical-images', getCriticalImages, [])
  })

  // ========================================================================================
  // VALIDATION AND CONTENT INTEGRITY - Data validation and error handling
  // ========================================================================================

  /**
   * Validate content structure and integrity
   * CONTEXT7 SOURCE: /microsoft/typescript - Generic validation patterns
   */
  public validateContent<T>(content: T): ValidationResult<T> {
    const errors: string[] = []
    const warnings: string[] = []

    try {
      // Basic content existence check
      if (!content) {
        errors.push('Content is null or undefined')
        return { isValid: false, data: content, errors, warnings }
      }

      // Type-specific validations
      if (typeof content === 'object' && content !== null) {
        // Check for empty objects
        if (Object.keys(content).length === 0) {
          warnings.push('Content object is empty')
        }

        // Image asset validation
        if ('src' in content && 'alt' in content) {
          const imageAsset = content as unknown as ImageAsset
          if (!validateImageAccessibility(imageAsset)) {
            warnings.push('Image accessibility validation failed')
          }
        }
      }

      return {
        isValid: errors.length === 0,
        data: content,
        errors,
        warnings
      }

    } catch (error) {
      errors.push(`Validation error: ${error}`)
      return { isValid: false, data: content, errors, warnings }
    }
  }

  /**
   * Validate overall content structure
   */
  public validateContentStructure(): boolean {
    return validateContentStructure()
  }

  /**
   * Validate image accessibility requirements
   */
  public validateImageAccessibility(image: ImageAsset): boolean {
    return validateImageAccessibility(image)
  }

  // ========================================================================================
  // CACHE MANAGEMENT - Performance optimization and monitoring
  // ========================================================================================

  /**
   * Clear all cached data
   * CONTEXT7 SOURCE: /microsoft/typescript - Cache management patterns
   */
  public clearCache(): void {
    this.cache.clear()
    this.cacheStats = { hits: 0, misses: 0 }
    
    if (this.config.development.enableDebugLogging) {
      console.log('🗑️  CMSService cache cleared')
    }
  }

  /**
   * Clear specific cached entry
   */
  public clearCacheEntry(key: string): boolean {
    const deleted = this.cache.delete(key)
    
    if (this.config.development.enableDebugLogging && deleted) {
      console.log(`🗑️  Cache entry cleared: ${key}`)
    }
    
    return deleted
  }

  /**
   * Get cache statistics for monitoring
   */
  public getCacheStats(): CacheStats {
    const totalRequests = this.cacheStats.hits + this.cacheStats.misses
    const hitRate = totalRequests > 0 ? (this.cacheStats.hits / totalRequests) * 100 : 0

    return {
      hits: this.cacheStats.hits,
      misses: this.cacheStats.misses,
      size: this.cache.size,
      hitRate: Math.round(hitRate * 100) / 100
    }
  }

  /**
   * Get performance metrics for analysis
   */
  public getPerformanceMetrics(): readonly PerformanceMetrics[] {
    return [...this.performanceMetrics]
  }

  /**
   * Clear performance metrics
   */
  public clearPerformanceMetrics(): void {
    this.performanceMetrics = []
  }

  // ========================================================================================
  // DEVELOPMENT TOOLS - Debugging and monitoring utilities
  // ========================================================================================

  /**
   * Enable or disable debug logging
   */
  public setDebugLogging(enabled: boolean): void {
    this.config.development.enableDebugLogging = enabled
  }

  /**
   * Get current service configuration
   */
  public getConfig(): CMSServiceConfig {
    return { ...this.config }
  }

  /**
   * Update service configuration
   */
  public updateConfig(config: Partial<CMSServiceConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Get detailed cache information for debugging
   */
  public getCacheDebugInfo(): {
    readonly entries: Array<{
      readonly key: string
      readonly timestamp: number
      readonly ttl: number
      readonly age: number
      readonly expired: boolean
    }>
    readonly stats: CacheStats
  } {
    const now = Date.now()
    const entries = Array.from(this.cache.entries()).map(([key, value]) => ({
      key,
      timestamp: value.timestamp,
      ttl: value.ttl,
      age: now - value.timestamp,
      expired: (now - value.timestamp) > value.ttl
    }))

    return {
      entries,
      stats: this.getCacheStats()
    }
  }

  // ========================================================================================
  // PRIVATE HELPER METHODS - Internal service utilities
  // ========================================================================================

  /**
   * Record performance metrics
   */
  private recordPerformance(
    functionName: string,
    executionTime: number,
    cacheHit: boolean
  ): void {
    if (!this.config.development.logPerformanceMetrics) {
      return
    }

    const metric: PerformanceMetrics = {
      functionName,
      executionTime,
      cacheHit,
      timestamp: Date.now()
    }

    this.performanceMetrics.push(metric)

    // Keep only last 100 metrics to prevent memory leaks
    if (this.performanceMetrics.length > 100) {
      this.performanceMetrics = this.performanceMetrics.slice(-100)
    }

    if (this.config.development.enableDebugLogging && executionTime > 10) {
      console.log(
        `⚡ CMS ${functionName}: ${executionTime.toFixed(2)}ms ${cacheHit ? '(cached)' : '(fresh)'}`
      )
    }
  }

  /**
   * Enforce maximum cache size
   */
  private enforceMaxCacheSize(): void {
    if (this.cache.size <= this.config.cache.maxEntries) {
      return
    }

    // Remove oldest entries
    const entries = Array.from(this.cache.entries())
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp)
    
    const entriesToRemove = this.cache.size - this.config.cache.maxEntries
    for (let i = 0; i < entriesToRemove; i++) {
      this.cache.delete(entries[i][0])
    }

    if (this.config.development.enableDebugLogging) {
      console.log(`🧹 Cache size limit enforced: removed ${entriesToRemove} entries`)
    }
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Module export patterns for singleton service
// Export singleton instance factory for consistent usage
export const createCMSService = (config?: Partial<CMSServiceConfig>): CMSService => {
  return CMSService.getInstance(config)
}

// Export default singleton instance
export const cmsService = CMSService.getInstance()

// Export service class for advanced usage
export default CMSService