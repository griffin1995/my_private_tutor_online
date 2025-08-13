/**
 * CONTEXT7 SOURCE: /vercel/next.js - Web Vitals and performance monitoring
 * PERFORMANCE MONITORING: Real-time performance metrics for FAQ system
 */

"use client"

import React, { useEffect, useState, useCallback, memo } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Activity, Zap, Clock, TrendingUp, AlertCircle } from 'lucide-react'

interface PerformanceMetrics {
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  fcp: number | null // First Contentful Paint
  ttfb: number | null // Time to First Byte
  bundleSize: number | null
  memoryUsage: number | null
  renderCount: number
  searchLatency: number[]
  cacheHitRate: number
}

interface FAQPerformanceMonitorProps {
  enabled?: boolean
  showInProduction?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  compact?: boolean
  thresholds?: {
    lcp?: number
    fid?: number
    cls?: number
    searchLatency?: number
  }
}

// CONTEXT7 SOURCE: /context7/react_dev - React.memo for performance optimization
// PERFORMANCE: Memoize monitor component to prevent re-renders
export const FAQPerformanceMonitor = memo(function FAQPerformanceMonitor({
  enabled = true,
  showInProduction = false,
  position = 'bottom-right',
  compact = false,
  thresholds = {
    lcp: 2500,
    fid: 100,
    cls: 0.1,
    searchLatency: 300
  }
}: FAQPerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    bundleSize: null,
    memoryUsage: null,
    renderCount: 0,
    searchLatency: [],
    cacheHitRate: 0
  })
  const [isVisible, setIsVisible] = useState(false)
  const [hasIssues, setHasIssues] = useState(false)

  // CONTEXT7 SOURCE: /vercel/next.js - Web Vitals API integration
  // PERFORMANCE: Monitor Core Web Vitals
  useEffect(() => {
    if (!enabled) return
    if (!showInProduction && process.env.NODE_ENV === 'production') return

    // Monitor Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // LCP Observer
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          setMetrics(prev => ({ ...prev, lcp: lastEntry.renderTime || lastEntry.loadTime }))
        })
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

        // FCP Observer
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
          if (fcpEntry) {
            setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }))
          }
        })
        fcpObserver.observe({ type: 'paint', buffered: true })

        // CLS Observer
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
              setMetrics(prev => ({ ...prev, cls: clsValue }))
            }
          }
        })
        clsObserver.observe({ type: 'layout-shift', buffered: true })

        // FID Observer
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as any
          if (entries.length > 0) {
            setMetrics(prev => ({ ...prev, fid: entries[0].processingStart - entries[0].startTime }))
          }
        })
        fidObserver.observe({ type: 'first-input', buffered: true })

        // Navigation Timing
        const navigationEntry = performance.getEntriesByType('navigation')[0] as any
        if (navigationEntry) {
          setMetrics(prev => ({
            ...prev,
            ttfb: navigationEntry.responseStart - navigationEntry.requestStart
          }))
        }

        return () => {
          lcpObserver.disconnect()
          fcpObserver.disconnect()
          clsObserver.disconnect()
          fidObserver.disconnect()
        }
      } catch (error) {
        console.warn('Performance monitoring error:', error)
      }
    }
  }, [enabled, showInProduction])

  // CONTEXT7 SOURCE: /vercel/next.js - Memory usage monitoring
  // PERFORMANCE: Track memory consumption
  useEffect(() => {
    if (!enabled) return
    if (!showInProduction && process.env.NODE_ENV === 'production') return

    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        const usedMemoryMB = Math.round(memory.usedJSHeapSize / 1048576)
        setMetrics(prev => ({ ...prev, memoryUsage: usedMemoryMB }))
      }
    }

    checkMemory()
    const interval = setInterval(checkMemory, 5000)
    return () => clearInterval(interval)
  }, [enabled, showInProduction])

  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for performance tracking
  // PERFORMANCE: Track search latency
  const trackSearchLatency = useCallback((latency: number) => {
    setMetrics(prev => ({
      ...prev,
      searchLatency: [...prev.searchLatency.slice(-9), latency]
    }))
  }, [])

  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for render tracking
  // PERFORMANCE: Track component render count
  const trackRender = useCallback(() => {
    setMetrics(prev => ({ ...prev, renderCount: prev.renderCount + 1 }))
  }, [])

  // Check for performance issues
  useEffect(() => {
    const issues = 
      (metrics.lcp && metrics.lcp > thresholds.lcp!) ||
      (metrics.fid && metrics.fid > thresholds.fid!) ||
      (metrics.cls && metrics.cls > thresholds.cls!) ||
      (metrics.searchLatency.length > 0 && 
       metrics.searchLatency.some(l => l > thresholds.searchLatency!))
    
    setHasIssues(!!issues)
  }, [metrics, thresholds])

  // Calculate average search latency
  const avgSearchLatency = metrics.searchLatency.length > 0
    ? Math.round(metrics.searchLatency.reduce((a, b) => a + b, 0) / metrics.searchLatency.length)
    : 0

  // Position classes
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  }

  // Metric status color
  const getMetricColor = (value: number | null, threshold: number) => {
    if (value === null) return 'text-slate-400'
    if (value <= threshold * 0.5) return 'text-green-600'
    if (value <= threshold) return 'text-amber-600'
    return 'text-red-600'
  }

  if (!enabled) return null
  if (!showInProduction && process.env.NODE_ENV === 'production') return null

  // Expose tracking functions globally for other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__faqPerformance = {
        trackSearchLatency,
        trackRender
      }
    }
  }, [trackSearchLatency, trackRender])

  return (
    <>
      {/* Toggle Button */}
      <m.button
        onClick={() => setIsVisible(!isVisible)}
        className={`
          fixed ${positionClasses[position]} z-[9999]
          w-12 h-12 rounded-full shadow-lg
          ${hasIssues ? 'bg-red-500 animate-pulse' : 'bg-slate-800'}
          text-white flex items-center justify-center
          hover:scale-110 transition-transform
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle performance monitor"
      >
        {hasIssues ? (
          <AlertCircle className="w-5 h-5" />
        ) : (
          <Activity className="w-5 h-5" />
        )}
      </m.button>

      {/* Performance Panel */}
      <AnimatePresence>
        {isVisible && (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`
              fixed ${positionClasses[position]} z-[9998]
              ${compact ? 'w-64' : 'w-80'}
              bg-white border border-slate-200 rounded-xl shadow-2xl
              p-4 space-y-3
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Performance Monitor
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Close monitor"
              >
                ×
              </button>
            </div>

            {/* Core Web Vitals */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-slate-600 uppercase">Core Web Vitals</h4>
              
              {/* LCP */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">LCP</span>
                <span className={`text-sm font-mono ${getMetricColor(metrics.lcp, thresholds.lcp!)}`}>
                  {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '--'}
                </span>
              </div>

              {/* FID */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">FID</span>
                <span className={`text-sm font-mono ${getMetricColor(metrics.fid, thresholds.fid!)}`}>
                  {metrics.fid ? `${Math.round(metrics.fid)}ms` : '--'}
                </span>
              </div>

              {/* CLS */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">CLS</span>
                <span className={`text-sm font-mono ${getMetricColor(metrics.cls, thresholds.cls!)}`}>
                  {metrics.cls ? metrics.cls.toFixed(3) : '--'}
                </span>
              </div>
            </div>

            {/* Additional Metrics */}
            {!compact && (
              <div className="space-y-2 border-t border-slate-200 pt-2">
                <h4 className="text-xs font-medium text-slate-600 uppercase">Additional Metrics</h4>
                
                {/* FCP */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">FCP</span>
                  <span className="text-sm font-mono text-slate-700">
                    {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : '--'}
                  </span>
                </div>

                {/* TTFB */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">TTFB</span>
                  <span className="text-sm font-mono text-slate-700">
                    {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : '--'}
                  </span>
                </div>

                {/* Memory */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Memory</span>
                  <span className="text-sm font-mono text-slate-700">
                    {metrics.memoryUsage ? `${metrics.memoryUsage}MB` : '--'}
                  </span>
                </div>

                {/* Search Latency */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Search</span>
                  <span className={`text-sm font-mono ${getMetricColor(avgSearchLatency, thresholds.searchLatency!)}`}>
                    {avgSearchLatency > 0 ? `${avgSearchLatency}ms` : '--'}
                  </span>
                </div>

                {/* Render Count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Renders</span>
                  <span className="text-sm font-mono text-slate-700">
                    {metrics.renderCount}
                  </span>
                </div>
              </div>
            )}

            {/* Performance Score */}
            <div className="border-t border-slate-200 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Score</span>
                <div className="flex items-center gap-2">
                  {hasIssues ? (
                    <span className="text-sm font-medium text-red-600">Needs Improvement</span>
                  ) : (
                    <span className="text-sm font-medium text-green-600">Good</span>
                  )}
                  {hasIssues ? (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  ) : (
                    <Zap className="w-4 h-4 text-green-600" />
                  )}
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
})