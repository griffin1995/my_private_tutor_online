/**
 * CONTEXT7 SOURCE: /vercel/next.js - Core code splitting utilities
 * MULTI-AGENT CONSENSUS: Performance-Engineer approved code splitting for £548K optimization
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic imports and lazy loading strategies
 * IMPLEMENTATION: Royal client performance standards with essential code splitting
 */

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// CONTEXT7 SOURCE: /vercel/next.js - Component priority levels for loading optimization
// BUNDLE OPTIMIZATION: Priority-based component loading for performance
export const COMPONENT_PRIORITIES = {
  CRITICAL: 0, // Above-the-fold, immediate load
  HIGH: 1, // Important but not critical
  MEDIUM: 2, // Secondary content
  LOW: 3, // Below-the-fold, lazy load
  DEFERRED: 4, // Load on interaction
} as const

// CONTEXT7 SOURCE: /vercel/next.js - Core code splitting manager
// PERFORMANCE STRATEGY: Essential dynamic component creation utilities
export class CodeSplittingManager {
  // CONTEXT7 SOURCE: /vercel/next.js - Dynamic component loading with priority
  // COMPONENT OPTIMIZATION: Smart dynamic imports with minimal configuration
  public static createDynamicComponent<T = {}>(
    importFn: () => Promise<{ default: ComponentType<T> }>,
    options: {
      priority?: keyof typeof COMPONENT_PRIORITIES
      ssr?: boolean
      preload?: boolean
    } = {}
  ) {
    const {
      priority = 'MEDIUM',
      ssr = true,
      preload = false
    } = options

    // CONTEXT7 SOURCE: /vercel/next.js - Dynamic import with configuration
    const DynamicComponent = dynamic(importFn, {
      ssr,
    })

    // CONTEXT7 SOURCE: /vercel/next.js - Component preloading strategy
    // PERFORMANCE OPTIMIZATION: Intelligent preloading based on priority
    if (preload && typeof window !== 'undefined') {
      // Preload high-priority components
      if (COMPONENT_PRIORITIES[priority] <= COMPONENT_PRIORITIES.HIGH) {
        importFn().catch(error => {
          console.warn('⚠️ Component preload failed:', error)
        })
      }
    }

    return DynamicComponent
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring for code splitting
  // MONITORING INTEGRATION: Track code splitting performance for optimization
  public static trackComponentLoad(
    componentName: string,
    loadTime: number,
    cacheHit: boolean
  ): void {
    try {
      const metrics = {
        component: componentName,
        loadTime,
        cacheHit,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server'
      }

      // Log performance metrics
      console.log('⚡ Component Load Metrics:', metrics)

      // Send to analytics endpoint
      if (typeof window !== 'undefined') {
        fetch('/api/analytics/component-performance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(metrics)
        }).catch(() => {
          // Silently fail if analytics endpoint is unavailable
        })
      }
    } catch (error) {
      console.warn('⚠️ Component performance tracking failed:', error)
    }
  }
}

export default CodeSplittingManager