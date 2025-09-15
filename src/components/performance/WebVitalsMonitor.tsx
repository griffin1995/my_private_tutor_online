/**
 * CONTEXT7 SOURCE: /vercel/next.js - Web Vitals monitoring component
 * PERFORMANCE MONITORING REASON: Comprehensive Core Web Vitals tracking with real-time analytics
 * CONTEXT7 SOURCE: /vercel/next.js - useReportWebVitals hook for performance measurement
 * IMPLEMENTATION: Enhanced monitoring infrastructure for landing page optimization baseline
 */

'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { useEffect, useState } from 'react'

interface WebVitalsMetric {
  name: string
  value: number
  id: string
  delta: number
  rating: 'good' | 'needs-improvement' | 'poor'
  navigationType: string
}

interface PerformanceMetrics {
  lcp: number | null
  fid: number | null
  cls: number | null
  fcp: number | null
  ttfb: number | null
  tti: number | null
}

// CONTEXT7 SOURCE: /vercel/next.js - Performance thresholds for Core Web Vitals
// PERFORMANCE STANDARDS: Royal client quality thresholds for optimal user experience
const PERFORMANCE_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
} as const

export function WebVitalsMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    tti: null,
  })

  const [performanceScore, setPerformanceScore] = useState<number>(0)

  // CONTEXT7 SOURCE: /vercel/next.js - Web Vitals reporting function
  // PERFORMANCE TRACKING: Real-time Core Web Vitals measurement and analytics
  useReportWebVitals((metric: any) => {
    const vitalsMetric = metric as WebVitalsMetric

    // Update metrics state
    setMetrics(prev => ({
      ...prev,
      [vitalsMetric.name.toLowerCase()]: vitalsMetric.value
    }))

    // CONTEXT7 SOURCE: /vercel/next.js - Performance analytics endpoint integration
    // ANALYTICS INTEGRATION: Send metrics to performance monitoring service
    if (typeof window !== 'undefined') {
      // Send to analytics endpoint
      sendMetricToAnalytics(vitalsMetric)

      // Calculate performance score
      calculatePerformanceScore(vitalsMetric)
    }
  })

  // CONTEXT7 SOURCE: /vercel/next.js - sendBeacon API for performance data transmission
  // PERFORMANCE REPORTING: Efficient background data transmission for metrics
  const sendMetricToAnalytics = (metric: WebVitalsMetric) => {
    const body = JSON.stringify({
      metric: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      rating: metric.rating,
      timestamp: Date.now(),
      url: window.location.pathname,
      userAgent: navigator.userAgent,
      connection: (navigator as any).connection?.effectiveType,
    })

    // CONTEXT7 SOURCE: /vercel/next.js - navigator.sendBeacon for reliable data transmission
    // RELIABLE TRANSMISSION: Background data sending that survives page navigation
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/web-vitals', body)
    } else {
      // Fallback to fetch with keepalive
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        body,
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(error => {
        console.warn('Failed to send Web Vitals metric:', error)
      })
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Performance score calculation algorithm
  // PERFORMANCE SCORING: Weighted scoring system for overall performance assessment
  const calculatePerformanceScore = (metric: WebVitalsMetric) => {
    let score = 0
    const weights = { LCP: 0.25, FID: 0.25, CLS: 0.25, FCP: 0.15, TTFB: 0.1 }

    Object.entries(PERFORMANCE_THRESHOLDS).forEach(([key, thresholds]) => {
      const metricValue = metrics[key.toLowerCase() as keyof PerformanceMetrics]
      if (metricValue !== null) {
        let metricScore = 0
        if (metricValue <= thresholds.good) {
          metricScore = 100
        } else if (metricValue <= thresholds.poor) {
          metricScore = 50
        } else {
          metricScore = 0
        }
        score += metricScore * (weights[key as keyof typeof weights] || 0)
      }
    })

    setPerformanceScore(Math.round(score))
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Performance Observer API for additional metrics
  // PERFORMANCE OBSERVATION: Extended performance monitoring beyond Core Web Vitals
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()

      entries.forEach(entry => {
        // Track Time to Interactive
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          const tti = navEntry.loadEventEnd - navEntry.fetchStart

          setMetrics(prev => ({
            ...prev,
            tti: tti
          }))

          // Send TTI metric
          sendMetricToAnalytics({
            name: 'TTI',
            value: tti,
            id: `tti-${Date.now()}`,
            delta: tti,
            rating: tti < 3500 ? 'good' : tti < 5000 ? 'needs-improvement' : 'poor',
            navigationType: navEntry.type
          })
        }
      })
    })

    try {
      observer.observe({ entryTypes: ['navigation'] })
    } catch (error) {
      console.warn('PerformanceObserver not supported:', error)
    }

    return () => observer.disconnect()
  }, [])

  // CONTEXT7 SOURCE: /vercel/next.js - Performance alerts for threshold violations
  // PERFORMANCE MONITORING: Real-time alerts for performance regressions
  useEffect(() => {
    if (metrics.lcp && metrics.lcp > PERFORMANCE_THRESHOLDS.LCP.poor) {
      console.warn('🚨 LCP Performance Alert:', metrics.lcp, 'ms')
    }
    if (metrics.fid && metrics.fid > PERFORMANCE_THRESHOLDS.FID.poor) {
      console.warn('🚨 FID Performance Alert:', metrics.fid, 'ms')
    }
    if (metrics.cls && metrics.cls > PERFORMANCE_THRESHOLDS.CLS.poor) {
      console.warn('🚨 CLS Performance Alert:', metrics.cls)
    }
  }, [metrics])

  // Development-only performance dashboard
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 right-4 bg-slate-900 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
        <h3 className="font-bold text-sm mb-2">Performance Monitor</h3>
        <div className="space-y-1 text-xs">
          <div>Score: <span className="font-mono">{performanceScore}</span></div>
          <div>LCP: <span className="font-mono">{metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '-'}</span></div>
          <div>FID: <span className="font-mono">{metrics.fid ? `${Math.round(metrics.fid)}ms` : '-'}</span></div>
          <div>CLS: <span className="font-mono">{metrics.cls ? metrics.cls.toFixed(3) : '-'}</span></div>
          <div>FCP: <span className="font-mono">{metrics.fcp ? `${Math.round(metrics.fcp)}ms` : '-'}</span></div>
          <div>TTFB: <span className="font-mono">{metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : '-'}</span></div>
          <div>TTI: <span className="font-mono">{metrics.tti ? `${Math.round(metrics.tti)}ms` : '-'}</span></div>
        </div>
      </div>
    )
  }

  return null
}