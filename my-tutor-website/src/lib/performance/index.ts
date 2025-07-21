// Performance monitoring exports
export { webVitalsTracker, PERFORMANCE_THRESHOLDS } from './web-vitals'
export type { WebVitalsData, MetricName, AnalyticsProvider } from './web-vitals'

// Re-export web-vitals library for direct usage
export { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'
export type { Metric } from 'web-vitals'

// Performance utilities
export const performanceUtils = {
  // Format milliseconds for display
  formatMs: (ms: number): string => {
    if (ms < 1000) return `${Math.round(ms)}ms`
    return `${(ms / 1000).toFixed(1)}s`
  },

  // Format bytes for display
  formatBytes: (bytes: number): string => {
    if (bytes === 0) return '0B'
    
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))}${sizes[i]}`
  },

  // Get performance grade
  getGrade: (rating: 'good' | 'needs-improvement' | 'poor'): string => {
    switch (rating) {
      case 'good': return 'A'
      case 'needs-improvement': return 'B'
      case 'poor': return 'C'
      default: return 'N/A'
    }
  },

  // Calculate overall performance score (0-100)
  calculateScore: (metrics: Record<string, { rating: string }>): number => {
    const ratings = Object.values(metrics).map(m => m.rating)
    const goodCount = ratings.filter(r => r === 'good').length
    const improvementCount = ratings.filter(r => r === 'needs-improvement').length
    const poorCount = ratings.filter(r => r === 'poor').length
    const total = ratings.length

    if (total === 0) return 100

    // Weight scoring: good = 100, needs-improvement = 70, poor = 30
    const score = (goodCount * 100 + improvementCount * 70 + poorCount * 30) / total
    return Math.round(score)
  }
}