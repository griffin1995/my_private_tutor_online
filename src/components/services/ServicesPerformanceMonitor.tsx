/**
 * CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring patterns
 * IMPLEMENTATION REASON: Official Next.js documentation for Core Web Vitals tracking
 * 
 * Services Page Performance Monitor
 * Tracks and reports performance metrics specific to the Services page
 */

"use client"

import { useEffect, useCallback, useRef } from 'react'
import { webVitalsTracker } from '@/lib/performance/web-vitals'

// CONTEXT7 SOURCE: /vercel/next.js - Performance Observer API usage
// IMPLEMENTATION REASON: Official Next.js documentation for performance monitoring
interface PerformanceMetrics {
  globeLoadTime?: number
  chartsLoadTime?: number
  accordionInteractionTime?: number
  totalBundleSize?: number
  interactionLatency?: number
  scrollPerformance?: number
}

export function ServicesPerformanceMonitor() {
  const metricsRef = useRef<PerformanceMetrics>({})
  const observerRef = useRef<PerformanceObserver | null>(null)

  // CONTEXT7 SOURCE: /vercel/next.js - Component-specific performance tracking
  // IMPLEMENTATION REASON: Official Next.js patterns for monitoring component performance
  const measureComponentLoad = useCallback((componentName: string, startTime: number) => {
    const loadTime = performance.now() - startTime
    
    // Track component-specific load times
    switch (componentName) {
      case 'globe':
        metricsRef.current.globeLoadTime = loadTime
        break
      case 'charts':
        metricsRef.current.chartsLoadTime = loadTime
        break
      case 'accordion':
        metricsRef.current.accordionInteractionTime = loadTime
        break
    }

    // Report to analytics if load time exceeds threshold
    if (loadTime > 1000) {
      console.warn(`Slow component load: ${componentName} took ${loadTime.toFixed(2)}ms`)
      
      // Send to analytics
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', 'Slow Component Load', {
          component: componentName,
          loadTime: Math.round(loadTime),
          page: 'services'
        })
      }
    }
  }, [])

  // CONTEXT7 SOURCE: /vercel/next.js - Interaction tracking
  // IMPLEMENTATION REASON: Official Next.js documentation for INP (Interaction to Next Paint) monitoring
  const trackInteraction = useCallback((interactionType: string) => {
    const startTime = performance.now()
    
    requestAnimationFrame(() => {
      const interactionTime = performance.now() - startTime
      metricsRef.current.interactionLatency = interactionTime

      // Report slow interactions
      if (interactionTime > 200) {
        console.warn(`Slow interaction: ${interactionType} took ${interactionTime.toFixed(2)}ms`)
        
        if (typeof window !== 'undefined' && (window as any).va) {
          (window as any).va('track', 'Slow Interaction', {
            type: interactionType,
            latency: Math.round(interactionTime),
            page: 'services'
          })
        }
      }
    })
  }, [])

  // CONTEXT7 SOURCE: /vercel/next.js - Bundle size monitoring
  // IMPLEMENTATION REASON: Official Next.js patterns for tracking resource loading
  const monitorBundleSize = useCallback(() => {
    if (typeof window === 'undefined' || !window.performance) return

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    let totalSize = 0
    const criticalResources: { name: string; size: number }[] = []

    resources.forEach(resource => {
      if (resource.name.includes('/services') || 
          resource.name.includes('mui') || 
          resource.name.includes('ant') ||
          resource.name.includes('cobe')) {
        
        const size = resource.transferSize || 0
        totalSize += size
        
        if (size > 50000) { // 50KB threshold
          criticalResources.push({
            name: resource.name.split('/').pop() || resource.name,
            size: size
          })
        }
      }
    })

    metricsRef.current.totalBundleSize = totalSize

    // Report large bundles
    if (totalSize > 500000) { // 500KB threshold
      console.warn(`Large bundle size for Services page: ${(totalSize / 1024).toFixed(2)}KB`)
      
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', 'Large Bundle', {
          totalSize: Math.round(totalSize / 1024),
          criticalResources: criticalResources.length,
          page: 'services'
        })
      }
    }
  }, [])

  // CONTEXT7 SOURCE: /vercel/next.js - Scroll performance monitoring
  // IMPLEMENTATION REASON: Official Next.js patterns for tracking scroll-triggered animations
  const monitorScrollPerformance = useCallback(() => {
    let lastScrollTime = 0
    let scrollFrameCount = 0
    let totalScrollTime = 0

    const handleScroll = () => {
      const now = performance.now()
      if (lastScrollTime) {
        const frameDuration = now - lastScrollTime
        totalScrollTime += frameDuration
        scrollFrameCount++

        // Calculate average FPS during scroll
        if (scrollFrameCount % 60 === 0) {
          const avgFrameTime = totalScrollTime / scrollFrameCount
          const fps = 1000 / avgFrameTime

          if (fps < 30) {
            console.warn(`Poor scroll performance: ${fps.toFixed(1)} FPS`)
            
            if (typeof window !== 'undefined' && (window as any).va) {
              (window as any).va('track', 'Poor Scroll Performance', {
                fps: Math.round(fps),
                page: 'services'
              })
            }
          }

          // Reset counters
          scrollFrameCount = 0
          totalScrollTime = 0
        }
      }
      lastScrollTime = now
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // CONTEXT7 SOURCE: /vercel/next.js - Performance budget enforcement
  // IMPLEMENTATION REASON: Official Next.js documentation for performance budget monitoring
  const enforcePerformanceBudgets = useCallback(() => {
    const budgets = {
      LCP: 2500,      // 2.5s
      INP: 200,       // 200ms
      CLS: 0.1,       // 0.1
      bundleSize: 500000,  // 500KB
      componentLoad: 1000  // 1s per component
    }

    // Get current metrics
    const vitals = webVitalsTracker.getSummary()
    const violations: string[] = []

    // Check Core Web Vitals
    Object.entries(vitals.metrics).forEach(([metric, data]) => {
      const budget = budgets[metric as keyof typeof budgets]
      if (budget && data.value > budget) {
        violations.push(`${metric}: ${data.value} (budget: ${budget})`)
      }
    })

    // Check bundle size
    if (metricsRef.current.totalBundleSize && metricsRef.current.totalBundleSize > budgets.bundleSize) {
      violations.push(`Bundle size: ${metricsRef.current.totalBundleSize} (budget: ${budgets.bundleSize})`)
    }

    // Check component load times
    if (metricsRef.current.globeLoadTime && metricsRef.current.globeLoadTime > budgets.componentLoad) {
      violations.push(`Globe load: ${metricsRef.current.globeLoadTime}ms (budget: ${budgets.componentLoad}ms)`)
    }

    // Report violations
    if (violations.length > 0) {
      console.error('Performance budget violations:', violations)
      
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', 'Performance Budget Violation', {
          violations: violations.length,
          details: violations.join(', '),
          page: 'services'
        })
      }
    }
  }, [])

  useEffect(() => {
    // Start monitoring
    monitorBundleSize()
    const scrollCleanup = monitorScrollPerformance()

    // Set up Performance Observer for long tasks
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        observerRef.current = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) { // Long task threshold
              console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`)
              
              if (typeof window !== 'undefined' && (window as any).va) {
                (window as any).va('track', 'Long Task', {
                  duration: Math.round(entry.duration),
                  page: 'services'
                })
              }
            }
          })
        })

        observerRef.current.observe({ entryTypes: ['longtask'] })
      } catch (e) {
        // Long task observer not supported
      }
    }

    // Check performance budgets after page load
    if (document.readyState === 'complete') {
      setTimeout(enforcePerformanceBudgets, 2000)
    } else {
      window.addEventListener('load', () => {
        setTimeout(enforcePerformanceBudgets, 2000)
      })
    }

    // Cleanup
    return () => {
      scrollCleanup()
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [monitorBundleSize, monitorScrollPerformance, enforcePerformanceBudgets])

  // Expose tracking methods for components to use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).servicesPerformance = {
        measureComponentLoad,
        trackInteraction
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).servicesPerformance
      }
    }
  }, [measureComponentLoad, trackInteraction])

  return null // This is a monitoring component, no UI
}