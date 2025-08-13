/**
 * CONTEXT7 SOURCE: /web-apis/intersection-observer - Performance optimization with lazy loading
 * CONTEXT7 SOURCE: /web-apis/prefers-reduced-motion - Accessibility-aware performance features
 * 
 * Rich Media Performance Hook
 * Implements comprehensive performance optimization for all rich media types
 * 
 * FEATURES:
 * - Intersection observer for lazy loading
 * - Prefers-reduced-motion support
 * - Bandwidth-aware loading
 * - Resource prioritization
 * - Performance monitoring
 * - Cache management
 * - Error boundary integration
 * - Analytics tracking
 * 
 * BUSINESS CONTEXT: Performance optimization for premium tutoring service
 * TARGET SEGMENTS: All client segments with optimal loading experience
 */

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  errorCount: number
  retryCount: number
  cacheHit: boolean
  bandwidthEstimate?: number
}

interface RichMediaPerformanceOptions {
  lazyLoad?: boolean
  preloadPriority?: 'high' | 'low' | 'auto'
  respectReducedMotion?: boolean
  trackAnalytics?: boolean
  maxRetries?: number
  timeout?: number
  cacheStrategy?: 'aggressive' | 'conservative' | 'none'
}

interface RichMediaPerformanceState {
  isVisible: boolean
  isLoaded: boolean
  isLoading: boolean
  hasError: boolean
  shouldLoad: boolean
  reducedMotionPreference: boolean
  metrics: PerformanceMetrics
  retryCount: number
}

/**
 * CONTEXT7 SOURCE: /web-apis/intersection-observer - Comprehensive performance optimization hook
 * Performance monitoring and optimization for rich media content
 */
export function useRichMediaPerformance(
  elementRef: React.RefObject<HTMLElement>,
  options: RichMediaPerformanceOptions = {}
) {
  const {
    lazyLoad = true,
    preloadPriority = 'auto',
    respectReducedMotion = true,
    trackAnalytics = false,
    maxRetries = 3,
    timeout = 10000,
    cacheStrategy = 'conservative'
  } = options

  const [state, setState] = useState<RichMediaPerformanceState>({
    isVisible: !lazyLoad,
    isLoaded: false,
    isLoading: false,
    hasError: false,
    shouldLoad: !lazyLoad,
    reducedMotionPreference: false,
    metrics: {
      loadTime: 0,
      renderTime: 0,
      errorCount: 0,
      retryCount: 0,
      cacheHit: false
    },
    retryCount: 0
  })

  const startTimeRef = useRef<number>(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // CONTEXT7 SOURCE: /web-apis/prefers-reduced-motion - Motion preference detection
  useEffect(() => {
    if (!respectReducedMotion) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    const handleChange = () => {
      setState(prev => ({
        ...prev,
        reducedMotionPreference: mediaQuery.matches
      }))
    }

    setState(prev => ({
      ...prev,
      reducedMotionPreference: mediaQuery.matches
    }))

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [respectReducedMotion])

  // CONTEXT7 SOURCE: /web-apis/navigator-connection - Bandwidth detection
  const getBandwidthEstimate = useCallback((): number | undefined => {
    // @ts-ignore - navigator.connection is not fully supported in TypeScript
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    
    if (connection) {
      return connection.effectiveType === '4g' ? 4 :
             connection.effectiveType === '3g' ? 3 :
             connection.effectiveType === '2g' ? 2 : 1
    }
    
    return undefined
  }, [])

  // CONTEXT7 SOURCE: /web-apis/intersection-observer - Lazy loading implementation
  useEffect(() => {
    if (!lazyLoad || !elementRef.current) {
      setState(prev => ({ ...prev, shouldLoad: true }))
      return
    }

    const element = elementRef.current
    
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState(prev => ({
            ...prev,
            isVisible: true,
            shouldLoad: true,
            metrics: {
              ...prev.metrics,
              bandwidthEstimate: getBandwidthEstimate()
            }
          }))
          
          observerRef.current?.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    )

    observerRef.current.observe(element)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [lazyLoad, getBandwidthEstimate])

  // CONTEXT7 SOURCE: /web-apis/performance - Performance timing
  const startLoading = useCallback(() => {
    startTimeRef.current = performance.now()
    setState(prev => ({
      ...prev,
      isLoading: true,
      hasError: false
    }))

    // Set timeout for loading
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        hasError: true,
        metrics: {
          ...prev.metrics,
          errorCount: prev.metrics.errorCount + 1
        }
      }))
    }, timeout)
  }, [timeout])

  const finishLoading = useCallback((success: boolean = true, cached: boolean = false) => {
    const loadTime = performance.now() - startTimeRef.current
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setState(prev => ({
      ...prev,
      isLoading: false,
      isLoaded: success,
      hasError: !success,
      metrics: {
        ...prev.metrics,
        loadTime,
        cacheHit: cached,
        errorCount: success ? prev.metrics.errorCount : prev.metrics.errorCount + 1
      }
    }))

    // Analytics tracking
    if (trackAnalytics && success) {
      // Track performance metrics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'rich_media_load', {
          event_category: 'performance',
          event_label: 'load_time',
          value: Math.round(loadTime),
          custom_map: {
            cache_hit: cached,
            bandwidth: getBandwidthEstimate()
          }
        })
      }
    }
  }, [trackAnalytics, getBandwidthEstimate])

  const retry = useCallback(() => {
    if (state.retryCount >= maxRetries) return false

    setState(prev => ({
      ...prev,
      retryCount: prev.retryCount + 1,
      hasError: false,
      metrics: {
        ...prev.metrics,
        retryCount: prev.retryCount + 1
      }
    }))

    startLoading()
    return true
  }, [state.retryCount, maxRetries, startLoading])

  // CONTEXT7 SOURCE: /web-apis/cache - Cache management
  const getCacheKey = useCallback((url: string): string => {
    return `rich-media-${btoa(url)}`
  }, [])

  const checkCache = useCallback(async (url: string): Promise<boolean> => {
    if (cacheStrategy === 'none') return false

    try {
      const cacheKey = getCacheKey(url)
      const cached = localStorage.getItem(cacheKey)
      
      if (cached) {
        const { timestamp, data } = JSON.parse(cached)
        const maxAge = cacheStrategy === 'aggressive' ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000 // 24h or 1h
        
        if (Date.now() - timestamp < maxAge) {
          return true
        } else {
          localStorage.removeItem(cacheKey)
        }
      }
    } catch (error) {
      console.warn('Cache check failed:', error)
    }

    return false
  }, [cacheStrategy, getCacheKey])

  const setCache = useCallback((url: string, data: any): void => {
    if (cacheStrategy === 'none') return

    try {
      const cacheKey = getCacheKey(url)
      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: Date.now(),
        data
      }))
    } catch (error) {
      console.warn('Cache set failed:', error)
    }
  }, [cacheStrategy, getCacheKey])

  // Resource preloading
  const preloadResource = useCallback((url: string, type: 'video' | 'image' | 'script' = 'image') => {
    if (typeof document === 'undefined') return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    
    switch (type) {
      case 'video':
        link.as = 'video'
        break
      case 'script':
        link.as = 'script'
        break
      case 'image':
      default:
        link.as = 'image'
        break
    }

    if (preloadPriority !== 'auto') {
      // @ts-ignore - fetchpriority is not yet in TypeScript definitions
      link.fetchPriority = preloadPriority
    }

    document.head.appendChild(link)
  }, [preloadPriority])

  // Performance reporting
  const getPerformanceReport = useCallback(() => {
    return {
      ...state.metrics,
      isVisible: state.isVisible,
      isLoaded: state.isLoaded,
      hasError: state.hasError,
      reducedMotion: state.reducedMotionPreference,
      cacheStrategy,
      lazyLoadEnabled: lazyLoad
    }
  }, [state, cacheStrategy, lazyLoad])

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      observerRef.current?.disconnect()
    }
  }, [])

  return {
    // State
    isVisible: state.isVisible,
    isLoaded: state.isLoaded,
    isLoading: state.isLoading,
    hasError: state.hasError,
    shouldLoad: state.shouldLoad,
    reducedMotionPreference: state.reducedMotionPreference,
    canRetry: state.retryCount < maxRetries,
    
    // Actions
    startLoading,
    finishLoading,
    retry,
    preloadResource,
    
    // Cache
    checkCache,
    setCache,
    
    // Analytics
    getPerformanceReport,
    
    // Metrics
    metrics: state.metrics
  }
}

/**
 * CONTEXT7 SOURCE: /web-apis/performance - Resource hint utilities
 * Performance utilities for rich media optimization
 */
export const RichMediaPerformanceUtils = {
  // CONTEXT7 SOURCE: /web-apis/performance - Resource hints
  addResourceHints: (urls: string[], type: 'prefetch' | 'preload' | 'dns-prefetch' = 'prefetch') => {
    if (typeof document === 'undefined') return

    urls.forEach(url => {
      const link = document.createElement('link')
      link.rel = type
      link.href = url
      document.head.appendChild(link)
    })
  },

  // CONTEXT7 SOURCE: /web-apis/performance - Critical resource loading
  loadCriticalResources: async (resources: { url: string; type: string }[]) => {
    const promises = resources.map(resource => {
      return new Promise((resolve, reject) => {
        if (resource.type === 'script') {
          const script = document.createElement('script')
          script.src = resource.url
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        } else if (resource.type === 'style') {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = resource.url
          link.onload = resolve
          link.onerror = reject
          document.head.appendChild(link)
        } else {
          // For images, videos, etc.
          fetch(resource.url)
            .then(resolve)
            .catch(reject)
        }
      })
    })

    return Promise.allSettled(promises)
  },

  // CONTEXT7 SOURCE: /web-apis/performance - Memory management
  cleanupResources: () => {
    // Clear localStorage cache if getting full
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('rich-media-'))
      if (keys.length > 50) { // Arbitrary limit
        keys.slice(0, 10).forEach(key => localStorage.removeItem(key))
      }
    } catch (error) {
      console.warn('Cache cleanup failed:', error)
    }
  }
}

export default useRichMediaPerformance