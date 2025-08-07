/**
 * CONTEXT7 SOURCE: /vercel/next.js - Service layer demonstration patterns
 * CONTEXT7 SOURCE: /reactjs/react.dev - React cache function usage examples
 * 
 * CMSService Demonstration - Complete usage examples
 * 
 * This file demonstrates all major features of the CMSService:
 * - Content retrieval with type safety
 * - Image asset management
 * - Caching and performance monitoring
 * - Error handling and validation
 * - Development tools and debugging
 */

import { cmsService, createCMSService, type CacheStats, type PerformanceMetrics } from './cms-service'

/**
 * Demonstration of basic content retrieval
 */
export function demonstrateContentRetrieval() {
  console.log('🔍 CMSService Content Retrieval Demo')
  console.log('=====================================')
  
  // Get core site content
  const header = cmsService.getSiteHeader()
  console.log('✅ Site Header:', {
    siteName: header.siteName,
    navigationCount: header.navigation.length
  })
  
  const hero = cmsService.getHeroContent()
  console.log('✅ Hero Content:', {
    title: hero.title,
    buttonsCount: hero.ctaButtons.length
  })
  
  const testimonials = cmsService.getTestimonials()
  console.log('✅ Testimonials:', {
    count: testimonials.length,
    firstAuthor: testimonials[0]?.author
  })
  
  const services = cmsService.getServices()
  console.log('✅ Services:', {
    count: services.length,
    firstService: services[0]?.title
  })
}

/**
 * Demonstration of image asset management
 */
export function demonstrateImageAssets() {
  console.log('\n🖼️  CMSService Image Assets Demo')
  console.log('=================================')
  
  // Get core branding images
  const logo = cmsService.getMainLogo()
  console.log('✅ Main Logo:', {
    src: logo.src,
    dimensions: `${logo.width}x${logo.height}`,
    priority: logo.priority
  })
  
  const logoWhite = cmsService.getMainLogoWhite()
  console.log('✅ White Logo:', {
    src: logoWhite.src,
    forTransparent: true
  })
  
  const heroImage = cmsService.getHeroImage()
  console.log('✅ Hero Image:', {
    src: heroImage.src,
    alt: heroImage.alt
  })
  
  // Get institution logos for credibility
  const institutions = cmsService.getInstitutionLogos()
  const institutionCount = Object.keys(institutions).length
  console.log('✅ Institution Logos:', {
    count: institutionCount,
    examples: Object.keys(institutions).slice(0, 3)
  })
  
  // Get optimized image props
  const optimizedProps = cmsService.getOptimizedImageProps(logo, '(max-width: 768px) 150px, 200px')
  console.log('✅ Optimized Props:', {
    loading: optimizedProps.loading,
    sizes: optimizedProps.sizes
  })
}

/**
 * Demonstration of caching and performance features
 */
export function demonstrateCachingPerformance() {
  console.log('\n⚡ CMSService Caching & Performance Demo')
  console.log('=======================================')
  
  // Clear cache to start fresh
  cmsService.clearCache()
  console.log('🗑️  Cache cleared')
  
  // Enable performance monitoring
  cmsService.updateConfig({
    development: {
      enableDebugLogging: true,
      logPerformanceMetrics: true
    }
  })
  console.log('📊 Performance monitoring enabled')
  
  // Perform multiple operations to generate cache statistics
  const startTime = performance.now()
  
  // First calls (cache misses)
  cmsService.getSiteHeader()
  cmsService.getHeroContent()
  cmsService.getMainLogo()
  cmsService.getTestimonials()
  
  const midTime = performance.now()
  
  // Second calls (cache hits)
  cmsService.getSiteHeader()
  cmsService.getHeroContent()
  cmsService.getMainLogo()
  cmsService.getTestimonials()
  
  const endTime = performance.now()
  
  // Get cache statistics
  const stats: CacheStats = cmsService.getCacheStats()
  console.log('📈 Cache Statistics:', {
    hits: stats.hits,
    misses: stats.misses,
    hitRate: `${stats.hitRate}%`,
    cacheSize: stats.size
  })
  
  // Get performance metrics
  const metrics: readonly PerformanceMetrics[] = cmsService.getPerformanceMetrics()
  console.log('⏱️  Performance Metrics:', {
    totalOperations: metrics.length,
    firstCallTime: `${(midTime - startTime).toFixed(2)}ms`,
    secondCallTime: `${(endTime - midTime).toFixed(2)}ms`
  })
  
  // Get detailed cache debug info
  const debugInfo = cmsService.getCacheDebugInfo()
  console.log('🔧 Cache Debug Info:', {
    entries: debugInfo.entries.length,
    exampleEntry: debugInfo.entries[0] ? {
      key: debugInfo.entries[0].key,
      age: `${debugInfo.entries[0].age}ms`,
      expired: debugInfo.entries[0].expired
    } : null
  })
}

/**
 * Demonstration of validation and error handling
 */
export function demonstrateValidationErrorHandling() {
  console.log('\n✅ CMSService Validation & Error Handling Demo')
  console.log('==============================================')
  
  // Validate content structure
  const structureValid = cmsService.validateContentStructure()
  console.log('🏗️  Content Structure Valid:', structureValid)
  
  // Validate specific content
  const hero = cmsService.getHeroContent()
  const validation = cmsService.validateContent(hero)
  console.log('🔍 Hero Content Validation:', {
    isValid: validation.isValid,
    errorsCount: validation.errors.length,
    warningsCount: validation.warnings.length
  })
  
  // Validate image accessibility
  const logo = cmsService.getMainLogo()
  const imageValid = cmsService.validateImageAccessibility(logo)
  console.log('♿ Image Accessibility Valid:', imageValid)
  
  // Test with invalid content
  const invalidValidation = cmsService.validateContent(null)
  console.log('❌ Invalid Content Test:', {
    isValid: invalidValidation.isValid,
    hasErrors: invalidValidation.errors.length > 0
  })
  
  // Test with empty content
  const emptyValidation = cmsService.validateContent({})
  console.log('⚠️  Empty Content Test:', {
    isValid: emptyValidation.isValid,
    hasWarnings: emptyValidation.warnings.length > 0
  })
}

/**
 * Demonstration of utility functions
 */
export function demonstrateUtilities() {
  console.log('\n🛠️  CMSService Utilities Demo')
  console.log('============================')
  
  // Responsive image sizes
  const responsiveSizes = cmsService.generateResponsiveSizes(800)
  console.log('📱 Responsive Sizes:', responsiveSizes)
  
  // Generate srcset
  const srcSet = cmsService.generateSrcSet('/image.jpg', {
    small: 400,
    medium: 800,
    large: 1200
  })
  console.log('🖼️  Generated SrcSet:', srcSet)
  
  // British English formatting
  const americanText = 'We organize color-coded centers for your favorite license requirements'
  const britishText = cmsService.formatBritishEnglish(americanText)
  console.log('🇬🇧 British English:', {
    original: americanText,
    formatted: britishText
  })
  
  // Copyright text
  const copyright = cmsService.getCopyrightText()
  console.log('©️  Copyright:', copyright)
  
  // Critical images for preloading
  const criticalImages = cmsService.getCriticalImages()
  console.log('⚡ Critical Images:', {
    count: criticalImages.length,
    examples: criticalImages.slice(0, 2).map(img => ({
      src: img.src,
      priority: img.priority
    }))
  })
}

/**
 * Demonstration of advanced features
 */
export function demonstrateAdvancedFeatures() {
  console.log('\n🚀 CMSService Advanced Features Demo')
  console.log('====================================')
  
  // Create custom service with different configuration
  const customService = createCMSService({
    cache: {
      ttl: 30000, // 30 seconds
      maxEntries: 50,
      enableDebug: true
    },
    validation: {
      enableValidation: true,
      throwOnValidationError: false
    }
  })
  
  const customConfig = customService.getConfig()
  console.log('⚙️  Custom Service Config:', {
    cacheTTL: `${customConfig.cache.ttl}ms`,
    maxEntries: customConfig.cache.maxEntries,
    validationEnabled: customConfig.validation.enableValidation
  })
  
  // Background video support
  const brandVideo = cmsService.getBackgroundVideo('brandStatement')
  console.log('🎬 Background Video:', {
    src: brandVideo.src,
    title: brandVideo.title,
    hasFallback: !!brandVideo.fallback
  })
  
  const allVideos = cmsService.getBackgroundVideos()
  const videoKeys = Object.keys(allVideos)
  console.log('🎥 All Background Videos:', {
    count: videoKeys.length,
    keys: videoKeys
  })
  
  // Unified contact data
  const contact = cmsService.getUnifiedContact()
  console.log('📞 Unified Contact:', {
    primaryEmail: contact.primary.primaryEmail,
    primaryPhone: contact.primary.phone,
    hasLandingInfo: !!contact.landingInfo,
    hasFaqInfo: !!contact.faq,
    hasQuoteFormInfo: !!contact.quoteForm
  })
}

/**
 * Run complete demonstration
 */
export function runCompleteDemo() {
  console.log('🎯 Complete CMSService Demonstration')
  console.log('===================================\n')
  
  try {
    demonstrateContentRetrieval()
    demonstrateImageAssets()
    demonstrateCachingPerformance()
    demonstrateValidationErrorHandling()
    demonstrateUtilities()
    demonstrateAdvancedFeatures()
    
    console.log('\n🎉 Demo completed successfully!')
    console.log('=====================================')
    
    // Final service health check
    const finalStats = cmsService.getCacheStats()
    const finalConfig = cmsService.getConfig()
    
    console.log('📊 Final Service Status:', {
      cacheSize: finalStats.size,
      hitRate: `${finalStats.hitRate}%`,
      debugEnabled: finalConfig.development.enableDebugLogging,
      validationEnabled: finalConfig.validation.enableValidation
    })
    
  } catch (error) {
    console.error('❌ Demo failed:', error)
  }
}

/**
 * Export demo runner for external use
 */
export default runCompleteDemo

// Run demo if file is executed directly (for Node.js environments)
if (typeof require !== 'undefined' && require.main === module) {
  runCompleteDemo()
}