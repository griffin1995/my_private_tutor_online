// Core Web Vitals tracking implementation
// CLAUDE.md rule 21: Performance targets - LCP <2.5s, FID <100ms, CLS <0.1

import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals'

// Performance thresholds based on CLAUDE.md rule 21
export const PERFORMANCE_THRESHOLDS = {
  LCP: 2500,   // Largest Contentful Paint: <2.5s
  FID: 100,    // First Input Delay: <100ms
  CLS: 0.1,    // Cumulative Layout Shift: <0.1
  FCP: 1800,   // First Contentful Paint: <1.8s
  TTFB: 600    // Time to First Byte: <600ms
} as const

export type MetricName = keyof typeof PERFORMANCE_THRESHOLDS

export interface WebVitalsData {
  name: MetricName
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: string
  timestamp: number
  url: string
  userAgent: string
}

// Rate performance based on thresholds
function rateMetric(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = PERFORMANCE_THRESHOLDS[name]
  
  switch (name) {
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor'
    case 'FID':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor'
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor'
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor'
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor'
    default:
      return 'good'
  }
}

// Convert Web Vitals metric to our format
function formatMetric(metric: Metric): WebVitalsData {
  return {
    name: metric.name as MetricName,
    value: metric.value,
    rating: rateMetric(metric.name as MetricName, metric.value),
    delta: metric.delta,
    id: metric.id,
    navigationType: (metric as any).navigationType || 'navigate',
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent
  }
}

// Analytics integration interface
export interface AnalyticsProvider {
  trackWebVital: (data: WebVitalsData) => void
  trackPerformanceMetric: (name: string, value: number, attributes?: Record<string, any>) => void
}

// Console logger for development
const consoleAnalytics: AnalyticsProvider = {
  trackWebVital: (data) => {
    console.log(`📊 Web Vital: ${data.name}`, {
      value: data.value,
      rating: data.rating,
      threshold: PERFORMANCE_THRESHOLDS[data.name],
      url: data.url
    })
  },
  trackPerformanceMetric: (name, value, attributes) => {
    console.log(`⚡ Performance: ${name}`, { value, ...attributes })
  }
}

// Vercel Analytics integration
const vercelAnalytics: AnalyticsProvider = {
  trackWebVital: (data) => {
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', 'Web Vital', {
        name: data.name,
        value: data.value,
        rating: data.rating
      })
    }
  },
  trackPerformanceMetric: (name, value, attributes) => {
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', 'Performance', {
        metric: name,
        value,
        ...attributes
      })
    }
  }
}

// Sentry performance integration
const sentryAnalytics: AnalyticsProvider = {
  trackWebVital: (data) => {
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.addBreadcrumb({
        category: 'web-vitals',
        message: `${data.name}: ${data.value}`,
        level: data.rating === 'poor' ? 'error' : data.rating === 'needs-improvement' ? 'warning' : 'info',
        data: {
          name: data.name,
          value: data.value,
          rating: data.rating,
          threshold: PERFORMANCE_THRESHOLDS[data.name]
        }
      })
      
      if (data.rating === 'poor') {
        (window as any).Sentry.captureMessage(`Poor ${data.name} performance: ${data.value}`, 'warning')
      }
    }
  },
  trackPerformanceMetric: (name, value, attributes) => {
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.addBreadcrumb({
        category: 'performance',
        message: `${name}: ${value}`,
        data: { name, value, ...attributes }
      })
    }
  }
}

// Combined analytics provider
class WebVitalsTracker {
  private providers: AnalyticsProvider[] = []
  private metrics: Map<MetricName, WebVitalsData> = new Map()

  constructor() {
    // Add providers based on environment
    if (process.env.NODE_ENV === 'development') {
      this.providers.push(consoleAnalytics)
    }
    
    // Always add Vercel Analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.providers.push(vercelAnalytics)
    }
    
    // Add Sentry if available
    this.providers.push(sentryAnalytics)
  }

  private handleMetric = (metric: Metric) => {
    const data = formatMetric(metric)
    this.metrics.set(data.name, data)
    
    // Send to all providers
    this.providers.forEach(provider => {
      provider.trackWebVital(data)
    })
    
    // Store in sessionStorage for debugging
    if (typeof window !== 'undefined') {
      const existingMetrics = JSON.parse(sessionStorage.getItem('webVitals') || '{}')
      existingMetrics[data.name] = data
      sessionStorage.setItem('webVitals', JSON.stringify(existingMetrics))
    }
  }

  // Initialize tracking
  init() {
    if (typeof window === 'undefined') return

    // Track Core Web Vitals
    getCLS(this.handleMetric)
    getFID(this.handleMetric)
    getFCP(this.handleMetric)
    getLCP(this.handleMetric)
    getTTFB(this.handleMetric)
    
    // Track additional performance metrics
    this.trackNavigationTiming()
    this.trackResourceTiming()
    this.trackMemoryUsage()
  }

  private trackNavigationTiming() {
    if (typeof window === 'undefined' || !window.performance) return

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        const metrics = {
          'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
          'TCP Connection': navigation.connectEnd - navigation.connectStart,
          'TLS Handshake': navigation.connectEnd - navigation.secureConnectionStart,
          'Request': navigation.responseStart - navigation.requestStart,
          'Response': navigation.responseEnd - navigation.responseStart,
          'DOM Processing': navigation.domContentLoadedEventStart - navigation.responseEnd,
          'Resource Loading': navigation.loadEventStart - navigation.domContentLoadedEventEnd
        }

        Object.entries(metrics).forEach(([name, value]) => {
          if (value > 0) {
            this.providers.forEach(provider => {
              provider.trackPerformanceMetric(name, value, { type: 'navigation' })
            })
          }
        })
      }
    })
  }

  private trackResourceTiming() {
    if (typeof window === 'undefined') return

    // Track resource loading performance
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const resource = entry as PerformanceResourceTiming
        
        // Focus on key resources
        if (resource.name.includes('.js') || 
            resource.name.includes('.css') || 
            resource.name.includes('.woff') ||
            resource.name.includes('.jpg') ||
            resource.name.includes('.png') ||
            resource.name.includes('.avif')) {
          
          const loadTime = resource.responseEnd - resource.startTime
          const resourceType = this.getResourceType(resource.name)
          
          this.providers.forEach(provider => {
            provider.trackPerformanceMetric('Resource Load Time', loadTime, {
              type: resourceType,
              url: resource.name,
              size: resource.transferSize
            })
          })
        }
      })
    })

    observer.observe({ entryTypes: ['resource'] })
  }

  private trackMemoryUsage() {
    if (typeof window === 'undefined' || !(performance as any).memory) return

    const trackMemory = () => {
      const memory = (performance as any).memory
      
      this.providers.forEach(provider => {
        provider.trackPerformanceMetric('Memory Usage', memory.usedJSHeapSize, {
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
          utilization: memory.usedJSHeapSize / memory.jsHeapSizeLimit
        })
      })
    }

    // Track memory usage every 30 seconds
    trackMemory()
    setInterval(trackMemory, 30000)
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'javascript'
    if (url.includes('.css')) return 'stylesheet'
    if (url.includes('.woff') || url.includes('.ttf')) return 'font'
    if (url.includes('.jpg') || url.includes('.png') || url.includes('.avif') || url.includes('.webp')) return 'image'
    return 'other'
  }

  // Get current metrics
  getMetrics(): Record<MetricName, WebVitalsData> {
    return Object.fromEntries(this.metrics) as Record<MetricName, WebVitalsData>
  }

  // Get performance summary
  getSummary() {
    const metrics = this.getMetrics()
    
    return {
      overall: this.getOverallRating(metrics),
      metrics,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : ''
    }
  }

  private getOverallRating(metrics: Record<MetricName, WebVitalsData>): 'good' | 'needs-improvement' | 'poor' {
    const ratings = Object.values(metrics).map(m => m.rating)
    
    if (ratings.includes('poor')) return 'poor'
    if (ratings.includes('needs-improvement')) return 'needs-improvement'
    return 'good'
  }
}

// Export singleton instance
export const webVitalsTracker = new WebVitalsTracker()

// Initialize tracking when module is imported
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => webVitalsTracker.init())
  } else {
    webVitalsTracker.init()
  }
}

export default webVitalsTracker