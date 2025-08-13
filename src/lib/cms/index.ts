// CMS DATA SOURCE: Main CMS export file for My Private Tutor Online
// MANDATORY: All imports should use this centralised CMS - CLAUDE.md rule 22

// CONTEXT7 SOURCE: /vercel/next.js - Modern service layer export patterns
// CONTEXT7 SOURCE: /microsoft/typescript - Module re-export patterns for unified API access
// Export unified CMS service architecture for enterprise-grade data access

// Export new unified CMS service (RECOMMENDED)
export { 
  CMSService, 
  cmsService, 
  createCMSService,
  type CacheConfig,
  type CacheStats,
  type CMSServiceConfig,
  type ValidationResult,
  type PerformanceMetrics
} from './cms-service'

// PHASE 1 TASK 8: Export comprehensive CMS integration system
export * from './testimonials-cms-manager'
export * from './cms-validation'
export * from './cms-performance'
export * from './cms-analytics'

// Configuration and types
export * from '../../config/testimonials-cms.config'
export * from '../../types/testimonials-cms.types'

// Primary manager instances - import them first before using
export { testimonialsCMSManager } from './testimonials-cms-manager'
export { cmsPerformanceManager } from './cms-performance'
export { cmsAnalyticsManager } from './cms-analytics'
export { getTestimonialsCMSConfig } from '../../config/testimonials-cms.config'

// Import for convenience exports
import { testimonialsCMSManager } from './testimonials-cms-manager'
import { cmsPerformanceManager } from './cms-performance'  
import { cmsAnalyticsManager } from './cms-analytics'

// Export all existing content management functions (LEGACY SUPPORT)
export * from './cms-content'
export * from './cms-images'

// Re-export main CMS objects for convenience (LEGACY SUPPORT)
export { default as CMS } from './cms-content'
export { default as Images } from './cms-images'

// CONTEXT7 SOURCE: /microsoft/typescript - Service initialization patterns
// CONTEXT7 SOURCE: /reactjs/react.dev - React Server Components initialization patterns
// Import service dependencies
import { cmsService } from './cms-service'
import { validateContentStructure } from './cms-content'

// CMS validation and setup utilities with service integration
export const initializeCMS = () => {
  // Initialize service validation
  const serviceValid = cmsService.validateContentStructure()
  
  // Legacy validation for backwards compatibility
  const legacyValid = validateContentStructure()
  
  const isValid = serviceValid && legacyValid
  
  if (!isValid) {
    // CMS content validation failed
    if (process.env.NODE_ENV === 'development') {
      console.warn('CMS validation failed - check content structure')
    }
  } else {
    // CMS content validation passed
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ CMS initialized successfully')
    }
  }
  
  return isValid
}

// Service health check for monitoring
export const getCMSHealth = () => {
  const stats = cmsService.getCacheStats()
  const config = cmsService.getConfig()
  
  return {
    initialized: true,
    cacheStats: stats,
    validationEnabled: config.validation.enableValidation,
    debugEnabled: config.development.enableDebugLogging,
    version: CMS_VERSION
  }
}

// Export version for cache busting
export const CMS_VERSION = '2.1.0' // Updated for comprehensive CMS integration

// CONTEXT7 SOURCE: /microsoft/typescript - Export organization for complex APIs
// Export testimonials CMS utilities as individual exports
export { useTestimonialsCMS } from './testimonials-cms-manager'
export { useCMSPerformance } from './cms-performance'
export { useCMSAnalytics } from './cms-analytics'

// Export additional configuration utilities (getTestimonialsCMSConfig already exported above)
export { 
  validateCMSConfig,
  CMSConfigUtils
} from '../../config/testimonials-cms.config'

// CONTEXT7 SOURCE: /microsoft/typescript - Convenience exports for common patterns  
// NOTE: Using imported variables to avoid ReferenceError
export const TestimonialsManager = testimonialsCMSManager
export const PerformanceManager = cmsPerformanceManager  
export const AnalyticsManager = cmsAnalyticsManager

// CONTEXT7 SOURCE: /microsoft/typescript - Default export patterns for primary service
// Export service as default for clean imports
export { cmsService as default }