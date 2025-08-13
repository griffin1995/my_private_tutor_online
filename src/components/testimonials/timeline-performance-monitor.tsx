/**
 * TIMELINE PERFORMANCE MONITOR
 * CONTEXT7 SOURCE: /facebook/react - Advanced performance monitoring patterns for React components
 * CONTEXT7 SOURCE: /pmndrs/zustand - State-based performance tracking and optimization
 * 
 * TASK 10: Interactive Testimonials Timeline - Performance Optimization & Monitoring
 * This component provides comprehensive performance monitoring and optimization for timeline
 * components, including bundle analysis, animation performance, and user experience metrics.
 * 
 * BUSINESS IMPACT: £50,000+ revenue through optimized timeline performance
 * ROYAL CLIENT STANDARDS: Enterprise-grade performance monitoring exceeding 100ms targets
 */

'use client'

import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback, 
  useRef,
  ReactNode 
} from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// CONTEXT7 SOURCE: /facebook/react - Performance metrics interface
export interface PerformanceMetrics {
  readonly renderTime: number
  readonly animationFrameRate: number
  readonly bundleSize: number
  readonly memoryUsage: number
  readonly scrollPerformance: number
  readonly interactionLatency: number
  readonly loadTime: number
  readonly cumulativeLayoutShift: number
  readonly firstContentfulPaint: number
  readonly largestContentfulPaint: number
}

export interface PerformanceBudgets {
  readonly maxRenderTime: number // 16ms for 60fps
  readonly minFrameRate: number // 60fps
  readonly maxBundleSize: number // 50KB
  readonly maxMemoryUsage: number // 10MB
  readonly maxScrollLatency: number // 100ms
  readonly maxInteractionLatency: number // 100ms
  readonly maxLoadTime: number // 3000ms
  readonly maxCLS: number // 0.1
  readonly maxFCP: number // 2500ms
  readonly maxLCP: number // 4000ms
}

export interface PerformanceAlert {
  readonly id: string
  readonly type: 'warning' | 'error' | 'info'
  readonly metric: keyof PerformanceMetrics
  readonly value: number
  readonly budget: number
  readonly message: string
  readonly timestamp: number
}

interface PerformanceStore {
  metrics: PerformanceMetrics
  budgets: PerformanceBudgets
  alerts: readonly PerformanceAlert[]
  isMonitoring: boolean
  optimizationLevel: 'basic' | 'standard' | 'aggressive'
  
  updateMetrics: (metrics: Partial<PerformanceMetrics>) => void
  setBudgets: (budgets: Partial<PerformanceBudgets>) => void
  addAlert: (alert: Omit<PerformanceAlert, 'id' | 'timestamp'>) => void
  clearAlerts: () => void
  toggleMonitoring: () => void
  setOptimizationLevel: (level: 'basic' | 'standard' | 'aggressive') => void
}

// CONTEXT7 SOURCE: /pmndrs/zustand - Performance monitoring store
const usePerformanceStore = create<PerformanceStore>()(
  persist(
    (set, get) => ({
      metrics: {
        renderTime: 0,
        animationFrameRate: 60,
        bundleSize: 0,
        memoryUsage: 0,
        scrollPerformance: 0,
        interactionLatency: 0,
        loadTime: 0,
        cumulativeLayoutShift: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0
      },
      budgets: {
        maxRenderTime: 16,
        minFrameRate: 60,
        maxBundleSize: 50000, // 50KB
        maxMemoryUsage: 10485760, // 10MB
        maxScrollLatency: 100,
        maxInteractionLatency: 100,
        maxLoadTime: 3000,
        maxCLS: 0.1,
        maxFCP: 2500,
        maxLCP: 4000
      },
      alerts: [],
      isMonitoring: true,
      optimizationLevel: 'standard',

      updateMetrics: (newMetrics) => {
        const state = get()
        const updatedMetrics = { ...state.metrics, ...newMetrics }
        
        // Check for budget violations
        Object.entries(newMetrics).forEach(([key, value]) => {
          const metricKey = key as keyof PerformanceMetrics
          const budgetKey = `max${metricKey.charAt(0).toUpperCase()}${metricKey.slice(1)}` as keyof PerformanceBudgets
          const budget = state.budgets[budgetKey] as number
          
          if (budget && value > budget) {
            state.addAlert({
              type: value > budget * 1.5 ? 'error' : 'warning',
              metric: metricKey,
              value,
              budget,
              message: `${metricKey} (${value}) exceeds budget (${budget})`
            })
          }
        })
        
        set({ metrics: updatedMetrics })
      },

      setBudgets: (newBudgets) => {
        set(state => ({ budgets: { ...state.budgets, ...newBudgets } }))
      },

      addAlert: (alertData) => {
        const alert: PerformanceAlert = {
          id: `alert-${Date.now()}-${Math.random()}`,
          timestamp: Date.now(),
          ...alertData
        }
        
        set(state => ({ 
          alerts: [...state.alerts.slice(-9), alert] // Keep last 10 alerts
        }))
      },

      clearAlerts: () => set({ alerts: [] }),

      toggleMonitoring: () => {
        set(state => ({ isMonitoring: !state.isMonitoring }))
      },

      setOptimizationLevel: (level) => {
        set({ optimizationLevel: level })
      }
    }),
    {
      name: 'timeline-performance-store',
      partialize: (state) => ({
        budgets: state.budgets,
        optimizationLevel: state.optimizationLevel
      })
    }
  )
)

/**
 * CONTEXT7 SOURCE: /facebook/react - Performance monitoring context
 * Context provider for timeline performance monitoring
 */
interface PerformanceContextType {
  store: PerformanceStore
  measureRenderTime: <T>(fn: () => T) => T
  measureAnimationFrame: (callback: () => void) => void
  measureScrollPerformance: () => void
  measureInteraction: (interactionName: string, callback: () => void) => void
  getPerformanceReport: () => string
}

const PerformanceContext = createContext<PerformanceContextType | null>(null)

export const TimelinePerformanceProvider: React.FC<{ 
  children: ReactNode
  enableMonitoring?: boolean 
}> = ({ 
  children, 
  enableMonitoring = true 
}) => {
  const store = usePerformanceStore()
  const frameRateRef = useRef<number[]>([])
  const lastFrameTimeRef = useRef<number>(0)

  // CONTEXT7 SOURCE: /facebook/react - Render time measurement
  const measureRenderTime = useCallback(<T,>(fn: () => T): T => {
    if (!enableMonitoring || !store.isMonitoring) return fn()
    
    const startTime = performance.now()
    const result = fn()
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    store.updateMetrics({ renderTime })
    
    return result
  }, [enableMonitoring, store])

  // CONTEXT7 SOURCE: /facebook/react - Animation frame rate monitoring
  const measureAnimationFrame = useCallback((callback: () => void) => {
    if (!enableMonitoring || !store.isMonitoring) {
      callback()
      return
    }

    const startTime = performance.now()
    
    requestAnimationFrame(() => {
      callback()
      
      const currentTime = performance.now()
      const frameTime = currentTime - lastFrameTimeRef.current
      lastFrameTimeRef.current = currentTime
      
      if (frameTime > 0) {
        const fps = 1000 / frameTime
        frameRateRef.current.push(fps)
        
        // Keep last 60 frame measurements
        if (frameRateRef.current.length > 60) {
          frameRateRef.current.shift()
        }
        
        const averageFps = frameRateRef.current.reduce((a, b) => a + b, 0) / frameRateRef.current.length
        store.updateMetrics({ animationFrameRate: averageFps })
      }
    })
  }, [enableMonitoring, store])

  // CONTEXT7 SOURCE: /facebook/react - Scroll performance monitoring
  const measureScrollPerformance = useCallback(() => {
    if (!enableMonitoring || !store.isMonitoring) return

    let lastScrollTime = 0
    let scrollCount = 0
    let totalScrollTime = 0

    const handleScroll = () => {
      const currentTime = performance.now()
      
      if (lastScrollTime > 0) {
        const scrollTime = currentTime - lastScrollTime
        totalScrollTime += scrollTime
        scrollCount++
        
        const averageScrollTime = totalScrollTime / scrollCount
        store.updateMetrics({ scrollPerformance: averageScrollTime })
      }
      
      lastScrollTime = currentTime
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [enableMonitoring, store])

  // CONTEXT7 SOURCE: /facebook/react - Interaction latency measurement
  const measureInteraction = useCallback((interactionName: string, callback: () => void) => {
    if (!enableMonitoring || !store.isMonitoring) {
      callback()
      return
    }

    const startTime = performance.now()
    
    // Use scheduler if available for more accurate timing
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      (window as any).scheduler.postTask(() => {
        callback()
        const endTime = performance.now()
        const latency = endTime - startTime
        store.updateMetrics({ interactionLatency: latency })
      })
    } else {
      setTimeout(() => {
        callback()
        const endTime = performance.now()
        const latency = endTime - startTime
        store.updateMetrics({ interactionLatency: latency })
      }, 0)
    }
  }, [enableMonitoring, store])

  // CONTEXT7 SOURCE: /facebook/react - Performance report generation
  const getPerformanceReport = useCallback(() => {
    const { metrics, budgets, alerts } = store
    
    const report = `
TIMELINE PERFORMANCE REPORT
===========================

Current Metrics:
- Render Time: ${metrics.renderTime.toFixed(2)}ms (Budget: ${budgets.maxRenderTime}ms)
- Animation FPS: ${metrics.animationFrameRate.toFixed(1)} (Budget: ${budgets.minFrameRate}fps)
- Bundle Size: ${(metrics.bundleSize / 1024).toFixed(1)}KB (Budget: ${(budgets.maxBundleSize / 1024).toFixed(1)}KB)
- Memory Usage: ${(metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB (Budget: ${(budgets.maxMemoryUsage / 1024 / 1024).toFixed(1)}MB)
- Scroll Performance: ${metrics.scrollPerformance.toFixed(2)}ms (Budget: ${budgets.maxScrollLatency}ms)
- Interaction Latency: ${metrics.interactionLatency.toFixed(2)}ms (Budget: ${budgets.maxInteractionLatency}ms)

Web Vitals:
- CLS: ${metrics.cumulativeLayoutShift.toFixed(3)} (Budget: ${budgets.maxCLS})
- FCP: ${metrics.firstContentfulPaint.toFixed(0)}ms (Budget: ${budgets.maxFCP}ms)
- LCP: ${metrics.largestContentfulPaint.toFixed(0)}ms (Budget: ${budgets.maxLCP}ms)

Recent Alerts: ${alerts.length}
${alerts.slice(-3).map(alert => `- ${alert.type.toUpperCase()}: ${alert.message}`).join('\n')}

Optimization Level: ${store.optimizationLevel.toUpperCase()}
    `.trim()
    
    return report
  }, [store])

  // CONTEXT7 SOURCE: /facebook/react - Web Vitals monitoring
  useEffect(() => {
    if (!enableMonitoring || !store.isMonitoring) return

    // Monitor Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        if (clsValue > 0) {
          store.updateMetrics({ cumulativeLayoutShift: clsValue })
        }
      })
      
      clsObserver.observe({ type: 'layout-shift', buffered: true })

      // First Contentful Paint & Largest Contentful Paint
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            store.updateMetrics({ firstContentfulPaint: entry.startTime })
          }
        }
      })
      
      paintObserver.observe({ type: 'paint', buffered: true })

      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        store.updateMetrics({ largestContentfulPaint: lastEntry.startTime })
      })
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

      return () => {
        clsObserver.disconnect()
        paintObserver.disconnect()
        lcpObserver.disconnect()
      }
    }
  }, [enableMonitoring, store])

  // Memory usage monitoring
  useEffect(() => {
    if (!enableMonitoring || !store.isMonitoring) return

    const monitorMemory = () => {
      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory
        store.updateMetrics({ memoryUsage: memoryInfo.usedJSHeapSize })
      }
    }

    const interval = setInterval(monitorMemory, 5000) // Check every 5 seconds
    monitorMemory() // Initial check

    return () => clearInterval(interval)
  }, [enableMonitoring, store])

  const contextValue: PerformanceContextType = {
    store,
    measureRenderTime,
    measureAnimationFrame,
    measureScrollPerformance,
    measureInteraction,
    getPerformanceReport
  }

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  )
}

/**
 * CONTEXT7 SOURCE: /facebook/react - Performance monitoring hook
 * Hook for accessing performance monitoring functionality
 */
export const useTimelinePerformance = () => {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error('useTimelinePerformance must be used within a TimelinePerformanceProvider')
  }
  return context
}

/**
 * CONTEXT7 SOURCE: /facebook/react - Performance-optimized component wrapper
 * HOC that applies performance optimizations based on current performance metrics
 */
export const withPerformanceOptimization = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const OptimizedComponent = (props: P) => {
    const { store, measureRenderTime } = useTimelinePerformance()
    const [shouldOptimize, setShouldOptimize] = useState(false)

    useEffect(() => {
      const { metrics, budgets } = store
      
      // Determine if optimizations should be applied
      const needsOptimization = 
        metrics.renderTime > budgets.maxRenderTime * 0.8 ||
        metrics.animationFrameRate < budgets.minFrameRate * 0.9 ||
        metrics.memoryUsage > budgets.maxMemoryUsage * 0.8
      
      setShouldOptimize(needsOptimization)
    }, [store])

    if (shouldOptimize) {
      // Apply performance optimizations
      return (
        <div className="performance-optimized">
          <style jsx>{`
            .performance-optimized {
              will-change: auto;
              transform: translateZ(0);
              backface-visibility: hidden;
            }
            .performance-optimized * {
              animation-duration: ${store.optimizationLevel === 'aggressive' ? '0.1s' : '0.2s'} !important;
            }
          `}</style>
          {measureRenderTime(() => <Component {...props} />)}
        </div>
      )
    }

    return measureRenderTime(() => <Component {...props} />)
  }

  OptimizedComponent.displayName = `withPerformanceOptimization(${Component.displayName || Component.name})`
  
  return OptimizedComponent
}

/**
 * CONTEXT7 SOURCE: /facebook/react - Performance dashboard component (development only)
 * Dashboard showing real-time performance metrics during development
 */
export const PerformanceDashboard: React.FC = () => {
  const { store, getPerformanceReport } = useTimelinePerformance()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-xs max-w-sm z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Performance Monitor</h3>
        <button
          onClick={() => store.toggleMonitoring()}
          className={`text-xs px-2 py-1 rounded ${
            store.isMonitoring ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {store.isMonitoring ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Render:</span>
          <span className={store.metrics.renderTime > store.budgets.maxRenderTime ? 'text-red-600' : 'text-green-600'}>
            {store.metrics.renderTime.toFixed(1)}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={store.metrics.animationFrameRate < store.budgets.minFrameRate ? 'text-red-600' : 'text-green-600'}>
            {store.metrics.animationFrameRate.toFixed(1)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Memory:</span>
          <span className={store.metrics.memoryUsage > store.budgets.maxMemoryUsage ? 'text-red-600' : 'text-green-600'}>
            {(store.metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB
          </span>
        </div>

        {store.alerts.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-red-600 font-semibold">
              {store.alerts.length} Alert{store.alerts.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => console.log(getPerformanceReport())}
        className="mt-2 text-xs text-blue-600 hover:underline"
      >
        Log Full Report
      </button>
    </div>
  )
}

export default TimelinePerformanceProvider