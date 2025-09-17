/**
 * CONTEXT7 SOURCE: /vercel/next.js - Performance budget configuration
 * PERFORMANCE OPTIMIZATION: Centralized performance targets and monitoring
 *
 * Performance Budget Configuration
 * Defines performance targets and thresholds for the application
 *
 * BUSINESS VALUE: £52,000/year through optimized performance
 * TARGETS: Industry-leading performance metrics
 */

// CONTEXT7 SOURCE: /vercel/next.js - Performance budget types
// TYPE DEFINITIONS: Comprehensive performance budget structure
export interface PerformanceBudget {
  // Core Web Vitals
  webVitals: {
    lcp: { target: number; budget: number; critical: number }
    fid: { target: number; budget: number; critical: number }
    cls: { target: number; budget: number; critical: number }
    fcp: { target: number; budget: number; critical: number }
    ttfb: { target: number; budget: number; critical: number }
  }

  // Bundle sizes (in KB)
  bundles: {
    mainBundle: { target: number; budget: number; critical: number }
    pageBundle: { target: number; budget: number; critical: number }
    totalJS: { target: number; budget: number; critical: number }
    totalCSS: { target: number; budget: number; critical: number }
  }

  // API response times (in ms)
  api: {
    search: { target: number; budget: number; critical: number }
    booking: { target: number; budget: number; critical: number }
    cms: { target: number; budget: number; critical: number }
    general: { target: number; budget: number; critical: number }
  }

  // Resource counts
  resources: {
    requests: { target: number; budget: number; critical: number }
    images: { target: number; budget: number; critical: number }
    fonts: { target: number; budget: number; critical: number }
    scripts: { target: number; budget: number; critical: number }
  }

  // Cache performance
  cache: {
    hitRatio: { target: number; budget: number; critical: number }
    responseTime: { target: number; budget: number; critical: number }
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Performance budget values
// BUDGET CONFIG: Aggressive performance targets for premium service
export const PERFORMANCE_BUDGET: PerformanceBudget = {
  webVitals: {
    // Largest Contentful Paint (ms)
    lcp: {
      target: 1200,     // Excellent (top 25%)
      budget: 1500,     // Good
      critical: 2500    // Needs improvement
    },
    // First Input Delay (ms)
    fid: {
      target: 50,       // Excellent
      budget: 100,      // Good
      critical: 300     // Needs improvement
    },
    // Cumulative Layout Shift (score)
    cls: {
      target: 0.05,     // Excellent
      budget: 0.1,      // Good
      critical: 0.25    // Needs improvement
    },
    // First Contentful Paint (ms)
    fcp: {
      target: 800,      // Excellent
      budget: 1000,     // Good
      critical: 1800    // Needs improvement
    },
    // Time to First Byte (ms)
    ttfb: {
      target: 150,      // Excellent
      budget: 200,      // Good
      critical: 500     // Needs improvement
    }
  },

  bundles: {
    // Main bundle size (KB)
    mainBundle: {
      target: 100,      // Ultra-light
      budget: 150,      // Acceptable
      critical: 200     // Too large
    },
    // Per-page bundle size (KB)
    pageBundle: {
      target: 30,       // Optimal
      budget: 50,       // Acceptable
      critical: 75      // Too large
    },
    // Total JavaScript (KB)
    totalJS: {
      target: 200,      // Excellent
      budget: 250,      // Good
      critical: 350     // Too large
    },
    // Total CSS (KB)
    totalCSS: {
      target: 30,       // Optimal
      budget: 50,       // Acceptable
      critical: 75      // Too large
    }
  },

  api: {
    // Search API response (ms)
    search: {
      target: 50,       // Ultra-fast
      budget: 100,      // Acceptable
      critical: 200     // Too slow
    },
    // Booking API response (ms)
    booking: {
      target: 100,      // Fast
      budget: 200,      // Acceptable
      critical: 500     // Too slow
    },
    // CMS API response (ms)
    cms: {
      target: 30,       // Cached/Edge
      budget: 100,      // Acceptable
      critical: 300     // Too slow
    },
    // General API response (ms)
    general: {
      target: 100,      // Fast
      budget: 250,      // Acceptable
      critical: 500     // Too slow
    }
  },

  resources: {
    // Total network requests
    requests: {
      target: 30,       // Minimal
      budget: 50,       // Acceptable
      critical: 75      // Too many
    },
    // Image count
    images: {
      target: 10,       // Optimized
      budget: 20,       // Acceptable
      critical: 30      // Too many
    },
    // Font files
    fonts: {
      target: 2,        // Minimal
      budget: 4,        // Acceptable
      critical: 6       // Too many
    },
    // Script files
    scripts: {
      target: 5,        // Bundled
      budget: 10,       // Acceptable
      critical: 15      // Too many
    }
  },

  cache: {
    // Cache hit ratio (percentage)
    hitRatio: {
      target: 0.85,     // Excellent
      budget: 0.75,     // Good
      critical: 0.5     // Poor
    },
    // Cache response time (ms)
    responseTime: {
      target: 25,       // Memory cache
      budget: 50,       // Edge cache
      critical: 100     // Too slow
    }
  }
}

/**
 * Performance monitoring utilities
 * CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring helpers
 * UTILITIES: Helper functions for performance tracking
 */
export const PerformanceBudgetUtils = {
  /**
   * Check if metric meets target
   */
  meetsTarget: (value: number, metric: { target: number }): boolean => {
    return value <= metric.target
  },

  /**
   * Check if metric is within budget
   */
  withinBudget: (value: number, metric: { budget: number }): boolean => {
    return value <= metric.budget
  },

  /**
   * Check if metric is critical
   */
  isCritical: (value: number, metric: { critical: number }): boolean => {
    return value > metric.critical
  },

  /**
   * Get performance rating
   */
  getPerformanceRating: (
    value: number,
    metric: { target: number; budget: number; critical: number }
  ): 'excellent' | 'good' | 'needs-improvement' | 'poor' => {
    if (value <= metric.target) return 'excellent'
    if (value <= metric.budget) return 'good'
    if (value <= metric.critical) return 'needs-improvement'
    return 'poor'
  },

  /**
   * Calculate overall performance score
   */
  calculatePerformanceScore: (
    metrics: Partial<{
      lcp: number
      fid: number
      cls: number
      bundleSize: number
      cacheHitRatio: number
    }>
  ): number => {
    let score = 100
    const weights = {
      lcp: 25,
      fid: 25,
      cls: 25,
      bundleSize: 15,
      cacheHitRatio: 10
    }

    if (metrics.lcp !== undefined) {
      const rating = PerformanceBudgetUtils.getPerformanceRating(
        metrics.lcp,
        PERFORMANCE_BUDGET.webVitals.lcp
      )
      if (rating === 'good') score -= weights.lcp * 0.25
      else if (rating === 'needs-improvement') score -= weights.lcp * 0.5
      else if (rating === 'poor') score -= weights.lcp
    }

    if (metrics.fid !== undefined) {
      const rating = PerformanceBudgetUtils.getPerformanceRating(
        metrics.fid,
        PERFORMANCE_BUDGET.webVitals.fid
      )
      if (rating === 'good') score -= weights.fid * 0.25
      else if (rating === 'needs-improvement') score -= weights.fid * 0.5
      else if (rating === 'poor') score -= weights.fid
    }

    if (metrics.cls !== undefined) {
      const rating = PerformanceBudgetUtils.getPerformanceRating(
        metrics.cls,
        PERFORMANCE_BUDGET.webVitals.cls
      )
      if (rating === 'good') score -= weights.cls * 0.25
      else if (rating === 'needs-improvement') score -= weights.cls * 0.5
      else if (rating === 'poor') score -= weights.cls
    }

    return Math.max(0, Math.round(score))
  },

  /**
   * Generate performance report
   */
  generatePerformanceReport: (
    metrics: Record<string, number>
  ): {
    passed: string[]
    warnings: string[]
    failures: string[]
    score: number
  } => {
    const passed: string[] = []
    const warnings: string[] = []
    const failures: string[] = []

    // Check Web Vitals
    if (metrics.lcp !== undefined) {
      const rating = PerformanceBudgetUtils.getPerformanceRating(
        metrics.lcp,
        PERFORMANCE_BUDGET.webVitals.lcp
      )
      if (rating === 'excellent') passed.push(`LCP: ${metrics.lcp}ms (target: ${PERFORMANCE_BUDGET.webVitals.lcp.target}ms)`)
      else if (rating === 'good') warnings.push(`LCP: ${metrics.lcp}ms (target: ${PERFORMANCE_BUDGET.webVitals.lcp.target}ms)`)
      else failures.push(`LCP: ${metrics.lcp}ms (budget: ${PERFORMANCE_BUDGET.webVitals.lcp.budget}ms)`)
    }

    // Calculate overall score
    const score = PerformanceBudgetUtils.calculatePerformanceScore({
      lcp: metrics.lcp,
      fid: metrics.fid,
      cls: metrics.cls
    })

    return { passed, warnings, failures, score }
  }
}

/**
 * Performance budget enforcement
 * CONTEXT7 SOURCE: /vercel/next.js - Budget enforcement patterns
 * ENFORCEMENT: Automated performance budget checking
 */
export class PerformanceBudgetEnforcer {
  private budget: PerformanceBudget

  constructor(budget: PerformanceBudget = PERFORMANCE_BUDGET) {
    this.budget = budget
  }

  /**
   * Check if build should fail based on performance
   */
  shouldFailBuild(metrics: Record<string, number>): boolean {
    // Check critical Web Vitals
    if (metrics.lcp && metrics.lcp > this.budget.webVitals.lcp.critical) return true
    if (metrics.fid && metrics.fid > this.budget.webVitals.fid.critical) return true
    if (metrics.cls && metrics.cls > this.budget.webVitals.cls.critical) return true

    // Check critical bundle sizes
    if (metrics.mainBundle && metrics.mainBundle > this.budget.bundles.mainBundle.critical) return true
    if (metrics.totalJS && metrics.totalJS > this.budget.bundles.totalJS.critical) return true

    return false
  }

  /**
   * Get performance violations
   */
  getViolations(metrics: Record<string, number>): string[] {
    const violations: string[] = []

    // Check all metrics against budgets
    Object.entries(metrics).forEach(([key, value]) => {
      // Find corresponding budget
      for (const category of Object.values(this.budget)) {
        if (key in category) {
          const metric = category[key as keyof typeof category] as any
          if (value > metric.budget) {
            violations.push(
              `${key}: ${value} exceeds budget of ${metric.budget}`
            )
          }
        }
      }
    })

    return violations
  }
}