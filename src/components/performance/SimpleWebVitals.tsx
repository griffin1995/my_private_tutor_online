/**
 * CONTEXT7 SOURCE: /vercel/next.js - Simple Web Vitals monitoring implementation
 * MULTI-AGENT CONSENSUS: Simplified performance monitoring to avoid build issues
 * CONTEXT7 SOURCE: /vercel/next.js - useReportWebVitals hook without complex DOM manipulation
 * IMPLEMENTATION: Lightweight performance tracking for landing page optimization
 */

'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function SimpleWebVitals() {
  useReportWebVitals((metric) => {
    // CONTEXT7 SOURCE: /vercel/next.js - Web Vitals reporting to analytics
    // PERFORMANCE TRACKING: Send metrics to analytics endpoint for monitoring
    if (typeof window !== 'undefined') {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vital:', metric)
      }

      // Send to analytics in production
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/analytics/web-vitals', {
          method: 'POST',
          body: JSON.stringify(metric),
          headers: {
            'Content-Type': 'application/json'
          }
        }).catch(() => {
          // Silently fail if analytics endpoint is not available
        })
      }
    }
  })

  return null
}