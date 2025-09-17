// CONTEXT7 SOURCE: /vercel/next.js - Web Vitals performance monitoring
// Phase 1 Implementation: Performance monitoring baseline establishment

'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { useEffect, useState } from 'react'

type MetricName = 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP' |
  'Next.js-hydration' | 'Next.js-route-change-to-render' | 'Next.js-render'

interface Phase1Metrics {
  buildTime: number;          // Maintain <15s target
  typeErrorCount: number;     // Track TypeScript-Pro progress
  bundleSize: number;         // Baseline for Phase 2 optimization
  hotReloadTime: number;      // Developer experience metric
  memoryUsage: number;        // Resource utilization tracking
}

interface WebVitalMetric {
  name: MetricName;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

// Store metrics in memory for dashboard display
const metricsStore: WebVitalMetric[] = []

export function WebVitals() {
  const [isMonitoring, setIsMonitoring] = useState(false)

  useReportWebVitals((metric) => {
    // CONTEXT7 SOURCE: /vercel/next.js - Handle specific Web Vitals metrics
    const timestamp = Date.now()

    // Calculate rating based on Web Vitals thresholds
    let rating: 'good' | 'needs-improvement' | 'poor' | undefined

    switch (metric.name) {
      case 'FCP': // First Contentful Paint
        rating = metric.value < 1800 ? 'good' :
                metric.value < 3000 ? 'needs-improvement' : 'poor'
        break
      case 'LCP': // Largest Contentful Paint
        rating = metric.value < 2500 ? 'good' :
                metric.value < 4000 ? 'needs-improvement' : 'poor'
        break
      case 'CLS': // Cumulative Layout Shift
        rating = metric.value < 0.1 ? 'good' :
                metric.value < 0.25 ? 'needs-improvement' : 'poor'
        break
      case 'FID': // First Input Delay
        rating = metric.value < 100 ? 'good' :
                metric.value < 300 ? 'needs-improvement' : 'poor'
        break
      case 'TTFB': // Time to First Byte
        rating = metric.value < 800 ? 'good' :
                metric.value < 1800 ? 'needs-improvement' : 'poor'
        break
      case 'INP': // Interaction to Next Paint
        rating = metric.value < 200 ? 'good' :
                metric.value < 500 ? 'needs-improvement' : 'poor'
        break
    }

    const metricData: WebVitalMetric = {
      name: metric.name as MetricName,
      value: metric.value,
      rating,
      timestamp
    }

    // Store in memory for dashboard
    metricsStore.push(metricData)

    // Keep only last 100 metrics to prevent memory growth
    if (metricsStore.length > 100) {
      metricsStore.shift()
    }

    // Log to console for development monitoring
    if (process.env.NODE_ENV === 'development') {
      console.log('[Performance Metric]', {
        name: metric.name,
        value: metric.value,
        rating,
        id: metric.id,
        navigationType: metric.navigationType
      })
    }

    // CONTEXT7 SOURCE: /vercel/next.js - Send to analytics endpoint
    // Prepare for future analytics integration
    if (typeof window !== 'undefined' && window.navigator?.sendBeacon) {
      const analyticsEnabled = false // Will enable in Phase 2
      if (analyticsEnabled) {
        const body = JSON.stringify(metricData)
        const url = '/api/analytics/metrics'
        window.navigator.sendBeacon(url, body)
      }
    }
  })

  useEffect(() => {
    setIsMonitoring(true)

    // CONTEXT7 SOURCE: /vercel/next.js - Performance Observer for navigation
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const startTime = performance.now()

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry instanceof PerformanceNavigationTiming) {
            console.log('[Navigation Performance] Time to Interactive:',
              entry.loadEventEnd - startTime)
          }
        }
      })

      observer.observe({ entryTypes: ['navigation'] })

      return () => observer.disconnect()
    }
  }, [])

  // Export metrics for dashboard consumption
  if (typeof window !== 'undefined') {
    (window as any).__PERFORMANCE_METRICS__ = metricsStore
  }

  return null // No visual component, just monitoring
}

// Export metrics getter for dashboard
export function getPerformanceMetrics(): WebVitalMetric[] {
  if (typeof window !== 'undefined') {
    return (window as any).__PERFORMANCE_METRICS__ || []
  }
  return []
}

// Phase 1 specific monitoring utilities
export function trackBuildMetrics(metrics: Partial<Phase1Metrics>) {
  if (typeof window !== 'undefined') {
    (window as any).__BUILD_METRICS__ = {
      ...(window as any).__BUILD_METRICS__ || {},
      ...metrics,
      timestamp: Date.now()
    }
  }
}

export function getBuildMetrics(): Phase1Metrics | null {
  if (typeof window !== 'undefined') {
    return (window as any).__BUILD_METRICS__ || null
  }
  return null
}