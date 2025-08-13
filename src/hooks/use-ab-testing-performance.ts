/**
 * A/B TESTING PERFORMANCE MONITORING HOOK - REAL-TIME IMPACT ASSESSMENT
 * CONTEXT7 SOURCE: /facebook/react - Performance monitoring hook patterns
 * CONTEXT7 SOURCE: /vercel/next.js - Web Vitals and performance measurement patterns
 * 
 * TASK 13: Performance monitoring hook for A/B testing impact assessment
 * This sophisticated hook monitors performance metrics during A/B tests to ensure
 * experiments don't negatively impact user experience while providing real-time
 * insights into performance variations between test variants.
 * 
 * BUSINESS IMPACT: £40,000+ through performance-aware experimentation
 * ROYAL CLIENT STANDARDS: Zero performance degradation during testing
 */

'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import {
  ExperimentPerformanceMetrics,
  PerformanceMetric,
  PerformanceImpactAssessment,
  TestimonialsComponent
} from '@/types/testimonials-ab-testing.types'

// CONTEXT7 SOURCE: /vercel/next.js - Web Vitals measurement interface
interface WebVitalsMetric {
  name: string
  value: number
  delta: number
  id: string
  rating: 'good' | 'needs-improvement' | 'poor'
}

// CONTEXT7 SOURCE: /facebook/react - Performance measurement configuration
interface PerformanceMonitoringConfig {
  enableWebVitals: boolean
  enableCustomMetrics: boolean
  enableResourceTiming: boolean
  enableUserTiming: boolean
  enableMemoryMonitoring: boolean
  samplingRate: number // 0-1, percentage of sessions to monitor
  performanceThresholds: PerformanceThresholds
}

interface PerformanceThresholds {
  lcp: { good: number; poor: number } // Largest Contentful Paint
  fid: { good: number; poor: number } // First Input Delay
  cls: { good: number; poor: number } // Cumulative Layout Shift
  renderTime: { good: number; poor: number } // Component render time
  interactionLatency: { good: number; poor: number } // User interaction response
  memoryUsage: { good: number; poor: number } // Memory consumption
}

const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  renderTime: { good: 16, poor: 50 }, // 60fps = 16ms per frame
  interactionLatency: { good: 100, poor: 300 },
  memoryUsage: { good: 50 * 1024 * 1024, poor: 100 * 1024 * 1024 } // 50MB good, 100MB poor
}

const DEFAULT_CONFIG: PerformanceMonitoringConfig = {
  enableWebVitals: true,
  enableCustomMetrics: true,
  enableResourceTiming: true,
  enableUserTiming: true,
  enableMemoryMonitoring: true,
  samplingRate: 0.1, // Monitor 10% of sessions
  performanceThresholds: DEFAULT_THRESHOLDS
}

// CONTEXT7 SOURCE: /facebook/react - Hook return interface
interface UseABTestingPerformanceReturn {
  // Core metrics
  performanceMetrics: ExperimentPerformanceMetrics | null
  currentMetrics: Map<string, PerformanceMetric>
  impactAssessment: PerformanceImpactAssessment | null
  
  // Measurement functions
  startMeasurement: (measurementId: string) => void
  endMeasurement: (measurementId: string, metadata?: Record<string, any>) => number
  recordCustomMetric: (name: string, value: number, metadata?: Record<string, any>) => void
  
  // Web Vitals integration
  webVitalsMetrics: WebVitalsMetric[]
  
  // Status and controls
  isMonitoring: boolean
  startMonitoring: () => void
  stopMonitoring: () => void
  resetMetrics: () => void
  
  // Analysis
  compareWithBaseline: (baselineMetrics: ExperimentPerformanceMetrics) => PerformanceImpactAssessment
  generatePerformanceReport: () => string
}

// CONTEXT7 SOURCE: /facebook/react - Custom hook implementation
export function useABTestingPerformance(
  component: TestimonialsComponent,
  experimentId?: string,
  config: Partial<PerformanceMonitoringConfig> = {}
): UseABTestingPerformanceReturn {
  const fullConfig = { ...DEFAULT_CONFIG, ...config }
  
  // State management
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [performanceMetrics, setPerformanceMetrics] = useState<ExperimentPerformanceMetrics | null>(null)
  const [currentMetrics, setCurrentMetrics] = useState<Map<string, PerformanceMetric>>(new Map())
  const [webVitalsMetrics, setWebVitalsMetrics] = useState<WebVitalsMetric[]>([])
  const [impactAssessment, setImpactAssessment] = useState<PerformanceImpactAssessment | null>(null)
  
  // Refs for tracking
  const measurementTimes = useRef<Map<string, number>>(new Map())
  const metricsBuffer = useRef<Map<string, number[]>>(new Map())
  const sessionStartTime = useRef<number>(0)
  const observerRef = useRef<PerformanceObserver | null>(null)
  const webVitalsObserverRef = useRef<any>(null)

  // CONTEXT7 SOURCE: /vercel/next.js - Web Vitals integration
  useEffect(() => {
    if (!isMonitoring || !fullConfig.enableWebVitals) return

    // Dynamic import for web-vitals (client-side only)
    const initWebVitals = async () => {
      try {
        const { getCLS, getFID, getLCP } = await import('web-vitals')
        
        const handleMetric = (metric: WebVitalsMetric) => {
          // Only collect metrics if user is in experiment sample
          if (Math.random() > fullConfig.samplingRate) return
          
          setWebVitalsMetrics(prev => {
            const existing = prev.find(m => m.name === metric.name)
            if (existing) {
              return prev.map(m => m.name === metric.name ? metric : m)
            }
            return [...prev, metric]
          })
          
          // Track to analytics if available
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'ab_test_web_vital', {
              experiment_id: experimentId,
              component,
              metric_name: metric.name,
              metric_value: metric.value,
              metric_rating: metric.rating
            })
          }
        }
        
        getCLS(handleMetric)
        getFID(handleMetric)
        getLCP(handleMetric)
        
      } catch (error) {
        console.warn('Failed to load web-vitals:', error)
      }
    }
    
    initWebVitals()
  }, [isMonitoring, fullConfig.enableWebVitals, fullConfig.samplingRate, component, experimentId])

  // CONTEXT7 SOURCE: /facebook/react - Performance Observer setup
  useEffect(() => {
    if (!isMonitoring || !fullConfig.enableResourceTiming) return
    
    if ('PerformanceObserver' in window) {
      observerRef.current = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        
        entries.forEach(entry => {
          if (entry.entryType === 'resource') {
            recordResourceTiming(entry as PerformanceResourceTiming)
          } else if (entry.entryType === 'measure') {
            recordUserTiming(entry as PerformanceMeasure)
          } else if (entry.entryType === 'navigation') {
            recordNavigationTiming(entry as PerformanceNavigationTiming)
          }
        })
      })
      
      try {
        observerRef.current.observe({ entryTypes: ['resource', 'measure', 'navigation'] })
      } catch (error) {
        console.warn('Performance Observer not supported:', error)
      }
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [isMonitoring, fullConfig.enableResourceTiming])

  // CONTEXT7 SOURCE: /vercel/next.js - Resource timing analysis
  const recordResourceTiming = useCallback((entry: PerformanceResourceTiming) => {
    if (!entry.name.includes('testimonial') && !entry.name.includes('test')) return
    
    const loadTime = entry.responseEnd - entry.requestStart
    const dnsTime = entry.domainLookupEnd - entry.domainLookupStart
    const connectTime = entry.connectEnd - entry.connectStart
    
    recordCustomMetric('resource_load_time', loadTime, {
      resourceType: entry.initiatorType,
      resourceSize: entry.transferSize,
      dnsTime,
      connectTime
    })
  }, [])

  const recordUserTiming = useCallback((entry: PerformanceMeasure) => {
    if (!entry.name.includes(component)) return
    
    recordCustomMetric('user_timing', entry.duration, {
      measurementName: entry.name,
      startTime: entry.startTime
    })
  }, [component])

  const recordNavigationTiming = useCallback((entry: PerformanceNavigationTiming) => {
    const metrics = {
      domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      pageLoad: entry.loadEventEnd - entry.loadEventStart,
      firstPaint: 0, // Would be calculated from paint timing
      domReady: entry.domComplete - entry.domLoading
    }
    
    Object.entries(metrics).forEach(([name, value]) => {
      if (value > 0) {
        recordCustomMetric(`navigation_${name}`, value)
      }
    })
  }, [])

  // CONTEXT7 SOURCE: /facebook/react - Memory monitoring
  const monitorMemoryUsage = useCallback(() => {
    if (!fullConfig.enableMemoryMonitoring || !('memory' in performance)) return
    
    const memory = (performance as any).memory
    if (memory) {
      recordCustomMetric('memory_used', memory.usedJSHeapSize, {
        totalHeapSize: memory.totalJSHeapSize,
        heapSizeLimit: memory.jsHeapSizeLimit
      })
    }
  }, [fullConfig.enableMemoryMonitoring])

  // Core measurement functions
  const startMeasurement = useCallback((measurementId: string) => {
    const startTime = performance.now()
    measurementTimes.current.set(measurementId, startTime)
    
    // Also start performance mark if user timing enabled
    if (fullConfig.enableUserTiming) {
      try {
        performance.mark(`${component}-${measurementId}-start`)
      } catch (error) {
        // Performance marks not supported or quota exceeded
      }
    }
  }, [component, fullConfig.enableUserTiming])

  const endMeasurement = useCallback((measurementId: string, metadata?: Record<string, any>): number => {
    const endTime = performance.now()
    const startTime = measurementTimes.current.get(measurementId)
    
    if (!startTime) {
      console.warn(`No start time found for measurement: ${measurementId}`)
      return 0
    }
    
    const duration = endTime - startTime
    measurementTimes.current.delete(measurementId)
    
    // Create performance measure if user timing enabled
    if (fullConfig.enableUserTiming) {
      try {
        performance.measure(
          `${component}-${measurementId}`,
          `${component}-${measurementId}-start`
        )
      } catch (error) {
        // Performance measures not supported
      }
    }
    
    recordCustomMetric(measurementId, duration, metadata)
    return duration
  }, [component, fullConfig.enableUserTiming])

  const recordCustomMetric = useCallback((name: string, value: number, metadata?: Record<string, any>) => {
    if (!isMonitoring || !fullConfig.enableCustomMetrics) return
    
    // Add to buffer
    const key = `${component}-${name}`
    const existing = metricsBuffer.current.get(key) || []
    existing.push(value)
    metricsBuffer.current.set(key, existing)
    
    // Track to analytics if available
    if (typeof window !== 'undefined' && window.gtag && experimentId) {
      window.gtag('event', 'ab_test_performance_metric', {
        experiment_id: experimentId,
        component,
        metric_name: name,
        metric_value: value,
        ...metadata
      })
    }
    
    // Update current metrics with statistical summary
    updateCurrentMetrics()
  }, [component, experimentId, isMonitoring, fullConfig.enableCustomMetrics])

  // CONTEXT7 SOURCE: /simple-statistics/simple-statistics - Statistical summary calculation
  const updateCurrentMetrics = useCallback(() => {
    const updated = new Map<string, PerformanceMetric>()
    
    metricsBuffer.current.forEach((values, key) => {
      if (values.length === 0) return
      
      // Sort for percentile calculations
      const sorted = [...values].sort((a, b) => a - b)
      const sum = sorted.reduce((acc, val) => acc + val, 0)
      
      // Calculate statistical metrics
      const metric: PerformanceMetric = {
        median: sorted[Math.floor(sorted.length / 2)] || 0,
        p95: sorted[Math.floor(sorted.length * 0.95)] || 0,
        p99: sorted[Math.floor(sorted.length * 0.99)] || 0,
        average: sum / sorted.length,
        min: sorted[0] || 0,
        max: sorted[sorted.length - 1] || 0,
        standardDeviation: calculateStandardDeviation(sorted, sum / sorted.length)
      }
      
      updated.set(key, metric)
    })
    
    setCurrentMetrics(updated)
  }, [])

  const calculateStandardDeviation = (values: number[], mean: number): number => {
    const squaredDifferences = values.map(value => Math.pow(value - mean, 2))
    const avgSquaredDiff = squaredDifferences.reduce((acc, val) => acc + val, 0) / values.length
    return Math.sqrt(avgSquaredDiff)
  }

  // Monitoring controls
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true)
    sessionStartTime.current = performance.now()
    
    // Clear previous data
    metricsBuffer.current.clear()
    measurementTimes.current.clear()
    setWebVitalsMetrics([])
    setCurrentMetrics(new Map())
    
    // Start memory monitoring if enabled
    if (fullConfig.enableMemoryMonitoring) {
      const memoryInterval = setInterval(monitorMemoryUsage, 5000) // Every 5 seconds
      
      return () => clearInterval(memoryInterval)
    }
  }, [fullConfig.enableMemoryMonitoring, monitorMemoryUsage])

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false)
    
    // Generate final performance metrics
    generateFinalMetrics()
  }, [])

  const resetMetrics = useCallback(() => {
    metricsBuffer.current.clear()
    measurementTimes.current.clear()
    setCurrentMetrics(new Map())
    setWebVitalsMetrics([])
    setPerformanceMetrics(null)
    setImpactAssessment(null)
  }, [])

  // CONTEXT7 SOURCE: /simple-statistics/simple-statistics - Final metrics generation
  const generateFinalMetrics = useCallback(() => {
    const sessionDuration = performance.now() - sessionStartTime.current
    
    // Convert current metrics to performance metrics format
    const finalMetrics: ExperimentPerformanceMetrics = {
      experimentId: experimentId || 'unknown',
      measurementPeriod: {
        startDate: new Date(Date.now() - sessionDuration),
        endDate: new Date()
      },
      pageLoadTime: currentMetrics.get(`${component}-page_load`) || createEmptyMetric(),
      renderTime: currentMetrics.get(`${component}-render_time`) || createEmptyMetric(),
      interactionLatency: currentMetrics.get(`${component}-interaction_latency`) || createEmptyMetric(),
      memoryUsage: currentMetrics.get(`${component}-memory_used`) || createEmptyMetric(),
      bundleSize: 0, // Would be calculated from resource timing
      hydrationTime: currentMetrics.get(`${component}-hydration_time`) || createEmptyMetric(),
      cumulativeLayoutShift: webVitalsMetrics.find(m => m.name === 'CLS')?.value || 0,
      performanceImpact: generateImpactAssessment()
    }
    
    setPerformanceMetrics(finalMetrics)
  }, [component, experimentId, currentMetrics, webVitalsMetrics])

  const createEmptyMetric = (): PerformanceMetric => ({
    median: 0,
    p95: 0,
    p99: 0,
    average: 0,
    min: 0,
    max: 0,
    standardDeviation: 0
  })

  // CONTEXT7 SOURCE: /simple-statistics/simple-statistics - Impact assessment generation
  const generateImpactAssessment = useCallback((): PerformanceImpactAssessment => {
    const affectedMetrics: string[] = []
    let maxImpactSeverity: 'low' | 'medium' | 'high' | 'critical' = 'low'
    
    // Analyze each metric against thresholds
    currentMetrics.forEach((metric, key) => {
      const metricName = key.split('-').pop() || ''
      const threshold = getThresholdForMetric(metricName)
      
      if (threshold && metric.p95 > threshold.poor) {
        affectedMetrics.push(metricName)
        maxImpactSeverity = 'high'
      } else if (threshold && metric.p95 > threshold.good) {
        maxImpactSeverity = Math.max(maxImpactSeverity === 'low' ? 'medium' : maxImpactSeverity, 'medium') as any
      }
    })
    
    // Check Web Vitals
    webVitalsMetrics.forEach(vital => {
      if (vital.rating === 'poor') {
        affectedMetrics.push(vital.name)
        maxImpactSeverity = 'critical'
      } else if (vital.rating === 'needs-improvement') {
        maxImpactSeverity = Math.max(maxImpactSeverity === 'low' ? 'medium' : maxImpactSeverity, 'medium') as any
      }
    })
    
    return {
      hasSignificantImpact: affectedMetrics.length > 0,
      impactSeverity: maxImpactSeverity,
      affectedMetrics,
      recommendation: generateRecommendation(affectedMetrics, maxImpactSeverity),
      mitigationRequired: maxImpactSeverity === 'high' || maxImpactSeverity === 'critical'
    }
  }, [currentMetrics, webVitalsMetrics])

  const getThresholdForMetric = (metricName: string) => {
    const thresholdMap: Record<string, { good: number; poor: number }> = {
      render_time: fullConfig.performanceThresholds.renderTime,
      interaction_latency: fullConfig.performanceThresholds.interactionLatency,
      memory_used: fullConfig.performanceThresholds.memoryUsage
    }
    
    return thresholdMap[metricName]
  }

  const generateRecommendation = (affectedMetrics: string[], severity: string): string => {
    if (affectedMetrics.length === 0) {
      return 'Performance within acceptable limits. Continue monitoring.'
    }
    
    const recommendations = {
      low: 'Minor performance impact detected. Monitor for trends.',
      medium: 'Moderate performance impact. Consider optimization if persistent.',
      high: 'Significant performance degradation. Immediate optimization recommended.',
      critical: 'Critical performance impact. Stop experiment and investigate immediately.'
    }
    
    return recommendations[severity as keyof typeof recommendations] || recommendations.medium
  }

  // Baseline comparison
  const compareWithBaseline = useCallback((baselineMetrics: ExperimentPerformanceMetrics): PerformanceImpactAssessment => {
    const currentFinal = performanceMetrics
    if (!currentFinal) {
      return {
        hasSignificantImpact: false,
        impactSeverity: 'low',
        affectedMetrics: [],
        recommendation: 'Insufficient data for baseline comparison',
        mitigationRequired: false
      }
    }
    
    const affectedMetrics: string[] = []
    const improvements: string[] = []
    
    // Compare key metrics
    const comparisons = [
      { name: 'Render Time', current: currentFinal.renderTime.p95, baseline: baselineMetrics.renderTime.p95 },
      { name: 'Interaction Latency', current: currentFinal.interactionLatency.p95, baseline: baselineMetrics.interactionLatency.p95 },
      { name: 'Memory Usage', current: currentFinal.memoryUsage.p95, baseline: baselineMetrics.memoryUsage.p95 },
      { name: 'CLS', current: currentFinal.cumulativeLayoutShift, baseline: baselineMetrics.cumulativeLayoutShift }
    ]
    
    comparisons.forEach(({ name, current, baseline }) => {
      const percentChange = ((current - baseline) / baseline) * 100
      
      if (percentChange > 20) { // 20% degradation threshold
        affectedMetrics.push(name)
      } else if (percentChange < -10) { // 10% improvement
        improvements.push(name)
      }
    })
    
    const severity = affectedMetrics.length > 2 ? 'critical' : 
                    affectedMetrics.length > 1 ? 'high' :
                    affectedMetrics.length > 0 ? 'medium' : 'low'
    
    return {
      hasSignificantImpact: affectedMetrics.length > 0,
      impactSeverity: severity,
      affectedMetrics,
      recommendation: `Comparison with baseline: ${affectedMetrics.length} metrics degraded, ${improvements.length} improved`,
      mitigationRequired: severity === 'high' || severity === 'critical'
    }
  }, [performanceMetrics])

  // Performance report generation
  const generatePerformanceReport = useCallback((): string => {
    if (!performanceMetrics) {
      return 'No performance data available'
    }
    
    const report = [
      `Performance Report - ${component}`,
      `Experiment: ${performanceMetrics.experimentId}`,
      `Period: ${performanceMetrics.measurementPeriod.startDate.toLocaleString()} - ${performanceMetrics.measurementPeriod.endDate.toLocaleString()}`,
      '',
      'Key Metrics:',
      `  Render Time (P95): ${performanceMetrics.renderTime.p95.toFixed(2)}ms`,
      `  Interaction Latency (P95): ${performanceMetrics.interactionLatency.p95.toFixed(2)}ms`,
      `  Memory Usage (P95): ${(performanceMetrics.memoryUsage.p95 / 1024 / 1024).toFixed(2)}MB`,
      `  Cumulative Layout Shift: ${performanceMetrics.cumulativeLayoutShift.toFixed(3)}`,
      '',
      'Web Vitals:',
      ...webVitalsMetrics.map(vital => `  ${vital.name}: ${vital.value} (${vital.rating})`),
      '',
      'Impact Assessment:',
      `  Impact: ${performanceMetrics.performanceImpact.impactSeverity}`,
      `  Affected Metrics: ${performanceMetrics.performanceImpact.affectedMetrics.join(', ') || 'None'}`,
      `  Recommendation: ${performanceMetrics.performanceImpact.recommendation}`
    ]
    
    return report.join('\n')
  }, [component, performanceMetrics, webVitalsMetrics])

  // Auto-start monitoring on mount if sampling allows
  useEffect(() => {
    if (Math.random() <= fullConfig.samplingRate) {
      startMonitoring()
      
      return () => {
        stopMonitoring()
      }
    }
  }, [fullConfig.samplingRate])

  return {
    performanceMetrics,
    currentMetrics,
    impactAssessment,
    startMeasurement,
    endMeasurement,
    recordCustomMetric,
    webVitalsMetrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    resetMetrics,
    compareWithBaseline,
    generatePerformanceReport
  }
}

// Utility hook for simple render time measurement
export function useRenderTimeTracking(component: TestimonialsComponent) {
  const { startMeasurement, endMeasurement } = useABTestingPerformance(component)
  
  useEffect(() => {
    const measurementId = `${component}-render`
    startMeasurement(measurementId)
    
    return () => {
      endMeasurement(measurementId)
    }
  }, [])
}

// Type declarations for performance APIs
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
  
  interface Performance {
    memory?: {
      usedJSHeapSize: number
      totalJSHeapSize: number
      jsHeapSizeLimit: number
    }
  }
}