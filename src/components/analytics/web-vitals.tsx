/**
 * WEB VITALS MONITORING COMPONENT
 * 
 * CONTEXT7 SOURCE: /vercel/next.js - Web Vitals monitoring with useReportWebVitals hook
 * PERFORMANCE PHASE 1: Implementing Web Vitals tracking for testimonials optimization
 * 
 * Monitors Core Web Vitals metrics:
 * - LCP (Largest Contentful Paint) - Target: <1.8s
 * - FID (First Input Delay) - Target: <80ms
 * - CLS (Cumulative Layout Shift) - Target: <0.08
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 * - INP (Interaction to Next Paint)
 */

'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// CONTEXT7 SOURCE: /microsoft/typescript - Explicit type definitions for Web Vitals
interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  entries?: any[];
}

// Performance targets from PERFORMANCE_PHASE1.md
const PERFORMANCE_TARGETS = {
  LCP: { target: 1800, warning: 2500 }, // 1.8s target
  FID: { target: 80, warning: 100 },    // 80ms target
  CLS: { target: 0.08, warning: 0.1 },  // 0.08 target
  FCP: { target: 1000, warning: 1800 },
  TTFB: { target: 600, warning: 800 },
  INP: { target: 200, warning: 500 }
};

export function WebVitals() {
  const pathname = usePathname();
  const metricsBuffer = useRef<WebVitalsMetric[]>([]);
  const reportTimer = useRef<NodeJS.Timeout>();

  // CONTEXT7 SOURCE: /vercel/next.js - useReportWebVitals hook for performance monitoring
  useReportWebVitals((metric) => {
    // Only track testimonials page for now (Phase 1 focus)
    if (!pathname.includes('/testimonials')) return;

    // Enhanced metric processing with performance targets
    const enhancedMetric = {
      ...metric,
      page: pathname,
      timestamp: new Date().toISOString(),
      target: PERFORMANCE_TARGETS[metric.name as keyof typeof PERFORMANCE_TARGETS]
    };

    // Determine rating based on targets
    if (enhancedMetric.target) {
      if (metric.value <= enhancedMetric.target.target) {
        enhancedMetric.rating = 'good';
      } else if (metric.value <= enhancedMetric.target.warning) {
        enhancedMetric.rating = 'needs-improvement';
      } else {
        enhancedMetric.rating = 'poor';
      }
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const emoji = enhancedMetric.rating === 'good' ? '✅' : 
                    enhancedMetric.rating === 'needs-improvement' ? '⚠️' : '❌';
      
      console.log(
        `${emoji} [Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}ms`,
        `(Target: ${enhancedMetric.target?.target}ms)`,
        enhancedMetric
      );
    }

    // Buffer metrics for batch reporting
    metricsBuffer.current.push(enhancedMetric);

    // CONTEXT7 SOURCE: /vercel/next.js - Send metrics to analytics endpoint
    // Batch send after 5 seconds or 10 metrics
    if (metricsBuffer.current.length >= 10) {
      sendMetrics();
    } else {
      // Clear existing timer
      if (reportTimer.current) {
        clearTimeout(reportTimer.current);
      }
      
      // Set new timer for batch send
      reportTimer.current = setTimeout(sendMetrics, 5000);
    }
  });

  // Send metrics to analytics endpoint
  const sendMetrics = () => {
    if (metricsBuffer.current.length === 0) return;

    const metrics = [...metricsBuffer.current];
    metricsBuffer.current = [];

    // CONTEXT7 SOURCE: /vercel/next.js - navigator.sendBeacon for efficient background transmission
    const body = JSON.stringify({
      metrics,
      page: pathname,
      timestamp: new Date().toISOString(),
      phase: 'performance-phase-1'
    });

    // Log locally for now (Phase 1 - measurement only)
    if (process.env.NODE_ENV === 'development') {
      console.table(metrics.map(m => ({
        metric: m.name,
        value: `${m.value.toFixed(2)}ms`,
        rating: m.rating,
        target: `${m.target?.target}ms`
      })));
    }

    // Future: Send to analytics endpoint
    // const url = '/api/analytics/web-vitals';
    // if (navigator.sendBeacon) {
    //   navigator.sendBeacon(url, body);
    // } else {
    //   fetch(url, { body, method: 'POST', keepalive: true });
    // }

    // Store in localStorage for persistence (development)
    if (typeof window !== 'undefined') {
      const storedMetrics = JSON.parse(
        localStorage.getItem('webVitalsMetrics') || '[]'
      );
      storedMetrics.push(...metrics);
      
      // Keep only last 50 metrics
      if (storedMetrics.length > 50) {
        storedMetrics.splice(0, storedMetrics.length - 50);
      }
      
      localStorage.setItem('webVitalsMetrics', JSON.stringify(storedMetrics));
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (reportTimer.current) {
        clearTimeout(reportTimer.current);
      }
      // Send any remaining metrics
      sendMetrics();
    };
  }, [pathname]);

  // Component renders nothing (monitoring only)
  return null;
}

/**
 * Hook to retrieve stored Web Vitals metrics
 * Useful for debugging and performance analysis
 */
export function useWebVitalsMetrics() {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('webVitalsMetrics');
  return stored ? JSON.parse(stored) : [];
}