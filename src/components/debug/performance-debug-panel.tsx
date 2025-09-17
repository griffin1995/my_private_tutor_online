/**
 * CONTEXT7 SOURCE: /vercel/next.js - Performance debugging panel for development
 * DEBUG PANEL: Terminal-output focused performance monitoring component
 *
 * This component provides comprehensive performance debugging in development mode
 * with extensive console.log output for terminal-based analysis.
 */

"use client"

import { useEffect, useState, useRef } from 'react'

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  category: 'cms' | 'render' | 'network' | 'memory' | 'react'
}

interface DebugState {
  isActive: boolean
  metrics: PerformanceMetric[]
  renderCount: number
  errorCount: number
  warningCount: number
}

/**
 * Performance Debug Panel Component
 * CONTEXT7 SOURCE: /facebook/react - Development debugging patterns
 * PURPOSE: Extensive terminal debugging for performance analysis
 */
export function PerformanceDebugPanel({ enabled = true }: { enabled?: boolean }) {
  const [debugState, setDebugState] = useState<DebugState>({
    isActive: false,
    metrics: [],
    renderCount: 0,
    errorCount: 0,
    warningCount: 0
  })

  const startTime = useRef(performance.now())
  const renderTimes = useRef<number[]>([])

  // Only run in development
  if (process.env.NODE_ENV !== 'development' || !enabled) {
    return null
  }

  useEffect(() => {
    console.log('🔧 [DEBUG-Panel] Performance Debug Panel ACTIVATED')
    console.log('📊 [DEBUG-Panel] Starting comprehensive performance monitoring...')

    // Track component render times
    const renderTime = performance.now() - startTime.current
    renderTimes.current.push(renderTime)

    console.log(`⚛️ [DEBUG-Panel] Render #${renderTimes.current.length} completed in ${renderTime.toFixed(2)}ms`)

    // Calculate average render time
    if (renderTimes.current.length > 1) {
      const avgRenderTime = renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length
      console.log(`📈 [DEBUG-Panel] Average render time: ${avgRenderTime.toFixed(2)}ms`)
    }

    // Memory monitoring (browser environment)
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in performance) {
      const memInfo = (performance as any).memory
      console.log('💾 [DEBUG-Memory] Browser memory state:', {
        usedJSHeap: `${(memInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        totalJSHeap: `${(memInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        limit: `${(memInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
        usage: `${((memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100).toFixed(1)}%`
      })
    }

    // Network monitoring
    if (typeof window !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as any).connection
      console.log('🌐 [DEBUG-Network] Connection info:', {
        effectiveType: conn.effectiveType,
        downlink: `${conn.downlink} Mbps`,
        rtt: `${conn.rtt}ms`,
        saveData: conn.saveData
      })
    }

    // Performance entries analysis
    if (typeof window !== 'undefined') {
      const entries = performance.getEntries()

      // Analyze resource loading
      const resources = entries.filter(e => e.entryType === 'resource') as PerformanceResourceTiming[]
      const slowResources = resources.filter(r => r.duration > 100)

      if (slowResources.length > 0) {
        console.warn('⚠️ [DEBUG-Resources] Slow resources detected:')
        slowResources.slice(0, 5).forEach(r => {
          const name = r.name.split('/').pop() || r.name
          console.warn(`   🐌 ${name}: ${r.duration.toFixed(2)}ms`)
        })
      }

      // Analyze navigation timing
      const navigation = entries.find(e => e.entryType === 'navigation') as PerformanceNavigationTiming
      if (navigation) {
        console.log('🧭 [DEBUG-Navigation] Page load metrics:', {
          domContentLoaded: `${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`,
          domComplete: `${navigation.domComplete}ms`,
          loadComplete: `${navigation.loadEventEnd - navigation.loadEventStart}ms`,
          ttfb: `${navigation.responseStart - navigation.requestStart}ms`
        })
      }

      // Analyze paint timing
      const paints = entries.filter(e => e.entryType === 'paint')
      paints.forEach(paint => {
        console.log(`🎨 [DEBUG-Paint] ${paint.name}: ${paint.startTime.toFixed(2)}ms`)
      })
    }

    // Set up performance observer for ongoing monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Long task observer
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.warn(`⚠️ [DEBUG-LongTask] Long task detected:`, {
              duration: `${entry.duration.toFixed(2)}ms`,
              startTime: `${entry.startTime.toFixed(2)}ms`,
              name: entry.name
            })

            // Alert if task is extremely long
            if (entry.duration > 200) {
              console.error(`❌ [DEBUG-LongTask] CRITICAL: Task exceeded 200ms!`)
            }
          }
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })

        // Layout shift observer
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShift = entry as any
            if (layoutShift.value > 0.1) {
              console.warn(`⚠️ [DEBUG-LayoutShift] Layout shift detected:`, {
                value: layoutShift.value,
                startTime: `${entry.startTime.toFixed(2)}ms`
              })
            }
          }
        })
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })

        // Cleanup
        return () => {
          longTaskObserver.disconnect()
          layoutShiftObserver.disconnect()
          console.log('🔚 [DEBUG-Panel] Performance observers disconnected')
        }
      } catch (e) {
        console.error('❌ [DEBUG-Panel] Failed to set up performance observers:', e)
      }
    }

    // Track React re-renders
    setDebugState(prev => ({
      ...prev,
      renderCount: prev.renderCount + 1
    }))
  })

  // Intercept console methods for error/warning tracking
  useEffect(() => {
    const originalError = console.error
    const originalWarn = console.warn

    console.error = (...args) => {
      originalError(...args)
      setDebugState(prev => ({ ...prev, errorCount: prev.errorCount + 1 }))
      console.log(`❌ [DEBUG-Error] Error #${debugState.errorCount + 1} detected`)
    }

    console.warn = (...args) => {
      originalWarn(...args)
      setDebugState(prev => ({ ...prev, warningCount: prev.warningCount + 1 }))
      console.log(`⚠️ [DEBUG-Warning] Warning #${debugState.warningCount + 1} detected`)
    }

    return () => {
      console.error = originalError
      console.warn = originalWarn
    }
  }, [debugState.errorCount, debugState.warningCount])

  // Performance summary on unmount
  useEffect(() => {
    return () => {
      console.log('📊 [DEBUG-Panel] ===== PERFORMANCE SUMMARY =====')
      console.log(`   Total renders: ${debugState.renderCount}`)
      console.log(`   Errors encountered: ${debugState.errorCount}`)
      console.log(`   Warnings encountered: ${debugState.warningCount}`)

      if (renderTimes.current.length > 0) {
        const avgTime = renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length
        const minTime = Math.min(...renderTimes.current)
        const maxTime = Math.max(...renderTimes.current)

        console.log(`   Render time stats:`)
        console.log(`     - Average: ${avgTime.toFixed(2)}ms`)
        console.log(`     - Min: ${minTime.toFixed(2)}ms`)
        console.log(`     - Max: ${maxTime.toFixed(2)}ms`)
      }
    }
  }, [debugState])

  // Hidden component - all output goes to terminal
  return null
}

/**
 * Hook for manual performance marking
 * CONTEXT7 SOURCE: /vercel/next.js - Performance measurement patterns
 * PURPOSE: Allow components to add custom performance markers
 */
export function usePerformanceMarker(componentName: string) {
  const startMark = useRef<number>(0)

  useEffect(() => {
    startMark.current = performance.now()
    console.log(`🏁 [PERF-Mark] ${componentName} started at ${startMark.current.toFixed(2)}ms`)

    return () => {
      const endMark = performance.now()
      const duration = endMark - startMark.current
      console.log(`🏁 [PERF-Mark] ${componentName} completed in ${duration.toFixed(2)}ms`)

      // Warn if component took too long
      if (duration > 100) {
        console.warn(`⚠️ [PERF-Mark] ${componentName} exceeded 100ms threshold!`)
      }
    }
  }, [componentName])

  const mark = (eventName: string) => {
    const now = performance.now()
    const elapsed = now - startMark.current
    console.log(`📍 [PERF-Mark] ${componentName}.${eventName} at ${elapsed.toFixed(2)}ms`)
  }

  return { mark }
}

/**
 * Hook for tracking data fetching performance
 * CONTEXT7 SOURCE: /vercel/next.js - Data fetching patterns
 * PURPOSE: Monitor CMS and API call performance
 */
export function useDataFetchDebug(dataSourceName: string) {
  const fetchStart = useRef<number>(0)
  const fetchCount = useRef(0)
  const totalFetchTime = useRef(0)

  const startFetch = () => {
    fetchStart.current = performance.now()
    fetchCount.current++
    console.log(`📥 [DEBUG-Fetch] ${dataSourceName} fetch #${fetchCount.current} started`)
  }

  const endFetch = (recordCount?: number) => {
    const fetchTime = performance.now() - fetchStart.current
    totalFetchTime.current += fetchTime

    console.log(`✅ [DEBUG-Fetch] ${dataSourceName} fetch completed:`, {
      duration: `${fetchTime.toFixed(2)}ms`,
      records: recordCount || 'unknown',
      avgTime: `${(totalFetchTime.current / fetchCount.current).toFixed(2)}ms`
    })

    // Performance classification
    let rating = '🚀 Excellent'
    if (fetchTime > 500) rating = '❌ Poor'
    else if (fetchTime > 200) rating = '⚠️ Needs Improvement'
    else if (fetchTime > 100) rating = '✅ Good'

    console.log(`   Performance: ${rating}`)
  }

  return { startFetch, endFetch }
}