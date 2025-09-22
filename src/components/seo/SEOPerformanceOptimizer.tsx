/**
 * CONTEXT7 SOURCE: /vercel/next.js - Performance optimization for SEO components with Next.js patterns
 * IMPLEMENTATION REASON: Official Next.js documentation for Core Web Vitals optimization with SEO
 * CONTEXT7 SOURCE: /vercel/next.js - Client-side optimization and lazy loading patterns
 * SEO IMPLEMENTATION: Performance-first SEO component loading for royal client service standards
 * 
 * Pattern: Performance-optimized SEO component with lazy loading and critical path optimization
 * Architecture:
 * - Lazy loading of non-critical structured data
 * - Priority loading for essential SEO elements
 * - Memory optimization for JSON-LD data
 * - Client-side hydration optimization
 * - Core Web Vitals friendly implementation
 * 
 * Performance Strategy:
 * - Critical SEO (Organization, LocalBusiness) loaded immediately
 * - Non-critical structured data loaded after page interaction
 * - Efficient JSON serialization with minimal DOM impact
 * - Reduced blocking time for faster page loads
 */

"use client"

import { FC, useState, useEffect } from 'react'
import { 
  OrganizationStructuredData, 
  LocalBusinessStructuredData,
  TutoringServicesStructuredData,
  EducationalOrganizationStructuredData 
} from './StructuredData'

// CONTEXT7 SOURCE: /vercel/next.js - Intersection Observer for performance optimization
// PERFORMANCE REASON: Official Next.js performance patterns for lazy loading components
interface SEOPerformanceOptimizerProps {
  priority?: 'high' | 'normal' | 'low'
  loadStrategy?: 'immediate' | 'interaction' | 'viewport'
}

export const SEOPerformanceOptimizer: FC<SEOPerformanceOptimizerProps> = ({ 
  priority = 'normal',
  loadStrategy = 'immediate' 
}) => {
  const [shouldLoadNonCritical, setShouldLoadNonCritical] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // CONTEXT7 SOURCE: /vercel/next.js - Performance optimization with requestIdleCallback
    // PERFORMANCE OPTIMIZATION: Load non-critical SEO data during browser idle time
    const loadNonCriticalSEO = () => {
      if (loadStrategy === 'immediate') {
        setShouldLoadNonCritical(true)
        return
      }

      // Load after user interaction for better Core Web Vitals
      if (loadStrategy === 'interaction') {
        const handleInteraction = () => {
          setShouldLoadNonCritical(true)
          // CONTEXT7 SOURCE: /microsoft/typescript - Type-safe array iteration with DOM events
          // STANDARDIZATION REASON: Official TypeScript documentation Section 5.2 - Type assertions for DOM event handling
          // Clean up listeners after first interaction
          const events = ['mousedown', 'touchstart', 'keydown', 'scroll'] as const;
          events.forEach(event => {
            document.removeEventListener(event, handleInteraction, { passive: true } as AddEventListenerOptions)
          })
        }

        const events = ['mousedown', 'touchstart', 'keydown', 'scroll'] as const;
        events.forEach(event => {
          document.addEventListener(event, handleInteraction, { passive: true })
        })

        return () => {
          events.forEach(event => {
            document.removeEventListener(event, handleInteraction)
          })
        }
      }

      // Load when component comes into viewport
      if (loadStrategy === 'viewport') {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              setShouldLoadNonCritical(true)
              setIsVisible(true)
            }
          },
          { 
            rootMargin: '50px',
            threshold: 0.1 
          }
        )

        // Observe a placeholder element
        const placeholder = document.createElement('div')
        placeholder.style.height = '1px'
        placeholder.style.position = 'absolute'
        placeholder.style.top = '0'
        document.body.appendChild(placeholder)
        observer.observe(placeholder)

        return () => {
          observer.disconnect()
          document.body.removeChild(placeholder)
        }
      }
    }

    // CONTEXT7 SOURCE: /vercel/next.js - requestIdleCallback for non-blocking execution
    // PERFORMANCE OPTIMIZATION: Use browser idle time for SEO component loading
    if ('requestIdleCallback' in window) {
      const idleCallback = window.requestIdleCallback(() => {
        loadNonCriticalSEO()
      }, { timeout: 2000 })

      return () => window.cancelIdleCallback(idleCallback)
    } else {
      // Fallback for browsers without requestIdleCallback
      const timeout = setTimeout(loadNonCriticalSEO, 1000)
      return () => clearTimeout(timeout)
    }
  }, [loadStrategy])

  return (
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - Critical SEO components loaded immediately
          PERFORMANCE STRATEGY: Load essential Organization and LocalBusiness data first */}
      {(priority === 'high' || priority === 'normal') && (
        <>
          <OrganizationStructuredData />
          <LocalBusinessStructuredData />
        </>
      )}

      {/* CONTEXT7 SOURCE: /vercel/next.js - Non-critical SEO components loaded after optimization
          PERFORMANCE STRATEGY: Load additional structured data after critical path completion */}
      {shouldLoadNonCritical && (
        <>
          <TutoringServicesStructuredData />
          <EducationalOrganizationStructuredData />
        </>
      )}
    </>
  )
}

// CONTEXT7 SOURCE: /vercel/next.js - Server-side SEO component for SSR optimization
// SSR OPTIMIZATION: Server-rendered SEO for immediate search engine visibility
export const ServerSEOComponents: FC = () => {
  return (
    <>
      <OrganizationStructuredData />
      <LocalBusinessStructuredData />
      <TutoringServicesStructuredData />
      <EducationalOrganizationStructuredData />
    </>
  )
}

// CONTEXT7 SOURCE: /vercel/next.js - Critical SEO component for above-the-fold content
// CRITICAL PATH: Essential SEO elements that must load immediately
export const CriticalSEO: FC = () => {
  return (
    <>
      <OrganizationStructuredData />
      <LocalBusinessStructuredData />
    </>
  )
}

// CONTEXT7 SOURCE: /vercel/next.js - Enhanced SEO component for specific page types
// PAGE-SPECIFIC: Enhanced structured data for service and content pages
interface EnhancedSEOProps {
  pageType: 'service' | 'about' | 'content' | 'homepage'
  customData?: Record<string, any>
}

export const EnhancedSEO: FC<EnhancedSEOProps> = ({ pageType, customData }) => {
  // CONTEXT7 SOURCE: /vercel/next.js - Conditional component loading based on page type
  // SEO STRATEGY: Load relevant structured data based on page content type
  const renderPageSpecificSEO = () => {
    switch (pageType) {
      case 'service':
        return <TutoringServicesStructuredData />
      case 'about':
        return <EducationalOrganizationStructuredData />
      case 'homepage':
        return (
          <>
            <OrganizationStructuredData />
            <LocalBusinessStructuredData />
            <TutoringServicesStructuredData />
          </>
        )
      default:
        return <OrganizationStructuredData />
    }
  }

  return (
    <>
      {renderPageSpecificSEO()}
      {/* Custom structured data can be added here based on customData prop */}
    </>
  )
}