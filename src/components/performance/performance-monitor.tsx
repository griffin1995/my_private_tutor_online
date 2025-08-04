/**
 * Performance Monitor - Core Web Vitals Tracking
 * 
 * Monitors and reports performance metrics for premium tutoring service
 * Tracks bundle size, loading times, and user experience metrics
 * Ensures compliance with performance budget requirements
 * 
 * Target Metrics:
 * - Bundle Size: <150kB (down from 230kB)
 * - LCP: <1.5s (premium user experience)
 * - FID: <100ms (responsive interactions)
 * - CLS: <0.1 (stable layout)
 * 
 * British English: optimisation, behaviour, colour maintained
 */

'use client'

import { useEffect, useState } from 'react'
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

interface PerformanceMetrics {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
  bundleSize?: number
  timestamp: number
}

interface PerformanceMonitorProps {
  enabled?: boolean
  reportToAnalytics?: boolean
  showDebugInfo?: boolean
}

export function PerformanceMonitor({ 
  enabled = process.env.NODE_ENV === 'development',
  reportToAnalytics = true,
  showDebugInfo = false 
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    timestamp: Date.now()
  })
  const [bundleAnalysis, setBundleAnalysis] = useState<{
    totalSize: number
    gzippedSize: number
    chunkCount: number
  } | null>(null)

  useEffect(() => {
    if (!enabled) return

    // Track Core Web Vitals
    const trackMetrics = () => {
      getCLS((metric) => {
        setMetrics(prev => ({ ...prev, cls: metric.value }))
        if (reportToAnalytics) {
          reportMetric('CLS', metric.value, metric.value > 0.1 ? 'poor' : metric.value > 0.05 ? 'needs-improvement' : 'good')
        }
      })

      getFID((metric) => {
        setMetrics(prev => ({ ...prev, fid: metric.value }))
        if (reportToAnalytics) {
          reportMetric('FID', metric.value, metric.value > 100 ? 'poor' : metric.value > 50 ? 'needs-improvement' : 'good')
        }
      })

      getFCP((metric) => {
        setMetrics(prev => ({ ...prev, fcp: metric.value }))
        if (reportToAnalytics) {
          reportMetric('FCP', metric.value, metric.value > 3000 ? 'poor' : metric.value > 1800 ? 'needs-improvement' : 'good')
        }
      })

      getLCP((metric) => {
        setMetrics(prev => ({ ...prev, lcp: metric.value }))
        if (reportToAnalytics) {
          reportMetric('LCP', metric.value, metric.value > 2500 ? 'poor' : metric.value > 1500 ? 'needs-improvement' : 'good')
        }
      })

      getTTFB((metric) => {
        setMetrics(prev => ({ ...prev, ttfb: metric.value }))
        if (reportToAnalytics) {
          reportMetric('TTFB', metric.value, metric.value > 800 ? 'poor' : metric.value > 200 ? 'needs-improvement' : 'good')
        }
      })
    }

    // Analyze bundle size from performance navigation
    const analyzeBundleSize = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
        const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
        
        if (navigationEntries.length > 0) {
          const nav = navigationEntries[0]
          const totalTransferSize = resourceEntries
            .filter(entry => entry.name.includes('/_next/static/'))
            .reduce((total, entry) => total + (entry.transferSize || 0), 0)
          
          setBundleAnalysis({
            totalSize: totalTransferSize,
            gzippedSize: Math.round(totalTransferSize * 0.7), // Estimate gzipped size
            chunkCount: resourceEntries.filter(entry => entry.name.includes('.js')).length
          })

          // Report bundle size performance
          if (reportToAnalytics) {
            const bundleSizeKB = Math.round(totalTransferSize / 1024)
            reportMetric('Bundle Size', bundleSizeKB, bundleSizeKB > 200 ? 'poor' : bundleSizeKB > 150 ? 'needs-improvement' : 'good')
          }
        }
      }
    }

    // Initialize tracking
    trackMetrics()
    
    // Analyze bundle after page load
    if (document.readyState === 'complete') {
      analyzeBundleSize()
    } else {
      window.addEventListener('load', analyzeBundleSize)
    }

    return () => {
      window.removeEventListener('load', analyzeBundleSize)
    }
  }, [enabled, reportToAnalytics])

  // Report metrics to analytics service
  const reportMetric = (name: string, value: number, rating: 'good' | 'needs-improvement' | 'poor') => {
    // Send to Vercel Analytics if available
    if (typeof window !== 'undefined' && 'va' in window) {
      (window as any).va('track', 'Web Vital', {
        name,
        value: Math.round(value),
        rating,
        url: window.location.pathname
      })
    }

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎯 Performance Metric: ${name}`, {
        value: Math.round(value),
        rating,
        target: getTargetValue(name),
        status: getPerformanceStatus(name, value)
      })
    }
  }

  // Get target values for each metric
  const getTargetValue = (metric: string): string => {
    const targets: Record<string, string> = {
      'LCP': '<1.5s (Premium)',
      'FID': '<100ms',
      'CLS': '<0.1',
      'FCP': '<1.8s',
      'TTFB': '<200ms',
      'Bundle Size': '<150kB'
    }
    return targets[metric] || 'N/A'
  }

  // Determine performance status
  const getPerformanceStatus = (metric: string, value: number): string => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      'LCP': { good: 1500, poor: 2500 },
      'FID': { good: 50, poor: 100 },
      'CLS': { good: 0.05, poor: 0.1 },
      'FCP': { good: 1800, poor: 3000 },
      'TTFB': { good: 200, poor: 800 },
      'Bundle Size': { good: 150, poor: 200 }
    }

    const threshold = thresholds[metric]
    if (!threshold) return 'Unknown'

    if (value <= threshold.good) return '✅ Excellent'
    if (value <= threshold.poor) return '⚠️ Needs Improvement'
    return '❌ Poor'
  }

  // Only render debug info in development
  if (!showDebugInfo || process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono max-w-sm z-50">
      <div className="mb-2 font-bold text-green-400">🚀 Performance Monitor</div>
      
      <div className="space-y-1">
        {metrics.lcp && (
          <div className="flex justify-between">
            <span>LCP:</span>
            <span className={metrics.lcp <= 1500 ? 'text-green-400' : metrics.lcp <= 2500 ? 'text-yellow-400' : 'text-red-400'}>
              {Math.round(metrics.lcp)}ms
            </span>
          </div>
        )}
        
        {metrics.fid && (
          <div className="flex justify-between">
            <span>FID:</span>
            <span className={metrics.fid <= 50 ? 'text-green-400' : metrics.fid <= 100 ? 'text-yellow-400' : 'text-red-400'}>
              {Math.round(metrics.fid)}ms
            </span>
          </div>
        )}
        
        {metrics.cls && (
          <div className="flex justify-between">
            <span>CLS:</span>
            <span className={metrics.cls <= 0.05 ? 'text-green-400' : metrics.cls <= 0.1 ? 'text-yellow-400' : 'text-red-400'}>
              {metrics.cls.toFixed(3)}
            </span>
          </div>
        )}

        {bundleAnalysis && (
          <div className="border-t border-gray-600 pt-2 mt-2">
            <div className="flex justify-between">
              <span>Bundle:</span>
              <span className={bundleAnalysis.totalSize <= 150000 ? 'text-green-400' : bundleAnalysis.totalSize <= 200000 ? 'text-yellow-400' : 'text-red-400'}>
                {Math.round(bundleAnalysis.totalSize / 1024)}kB
              </span>
            </div>
            <div className="flex justify-between">
              <span>Chunks:</span>
              <span className="text-blue-400">{bundleAnalysis.chunkCount}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-600 text-gray-400">
        Target: &lt;150kB, LCP &lt;1.5s
      </div>
    </div>
  )
}

export default PerformanceMonitor