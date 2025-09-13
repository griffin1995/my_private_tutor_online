'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { useEffect, useCallback } from 'react';

// CONTEXT7 SOURCE: /vercel/next.js - Web Vitals reporting with useReportWebVitals hook
// IMPLEMENTATION REASON: Official Next.js pattern for capturing Core Web Vitals metrics

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  entries?: PerformanceEntry[];
  navigationType?: 'navigate' | 'reload' | 'back_forward' | 'prerender';
}

interface PerformanceData {
  timestamp: string;
  url: string;
  userAgent: string;
  connection?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
  };
  metrics: {
    [key: string]: {
      value: number;
      rating?: string;
      id: string;
    };
  };
}

export function PerformanceMonitor() {
  // CONTEXT7 SOURCE: /vercel/next.js - useReportWebVitals hook for Web Vitals collection
  // PERFORMANCE MONITORING REASON: Official Next.js pattern for real-time performance metrics
  
  const sendMetrics = useCallback((data: PerformanceData) => {
    // Store metrics locally for baseline analysis
    if (typeof window !== 'undefined') {
      const existingMetrics = localStorage.getItem('performance-metrics');
      const metrics = existingMetrics ? JSON.parse(existingMetrics) : [];
      metrics.push(data);
      
      // Keep only last 100 entries to prevent localStorage overflow
      if (metrics.length > 100) {
        metrics.shift();
      }
      
      localStorage.setItem('performance-metrics', JSON.stringify(metrics));
      
      // Log to console in development for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metric:', data);
      }
      
      // Send to analytics endpoint if configured
      if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
        // Use sendBeacon for efficient background transmission
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT,
            JSON.stringify(data)
          );
        } else {
          // Fallback to fetch with keepalive
          fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(data),
            keepalive: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }).catch((error) => {
            console.error('Failed to send metrics:', error);
          });
        }
      }
    }
  }, []);

  useReportWebVitals((metric: WebVitalsMetric) => {
    // CONTEXT7 SOURCE: /vercel/next.js - Web Vitals metric handling pattern
    // METRICS COLLECTION REASON: Capture all Core Web Vitals and custom Next.js metrics
    
    const performanceData: PerformanceData = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: {
        [metric.name]: {
          value: metric.name === 'CLS' ? metric.value * 1000 : metric.value,
          rating: metric.rating,
          id: metric.id,
        },
      },
    };
    
    // Add connection information if available
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      performanceData.connection = {
        effectiveType: conn?.effectiveType,
        downlink: conn?.downlink,
        rtt: conn?.rtt,
      };
    }
    
    // Handle different metric types
    switch (metric.name) {
      case 'FCP': // First Contentful Paint
      case 'LCP': // Largest Contentful Paint
      case 'CLS': // Cumulative Layout Shift
      case 'FID': // First Input Delay
      case 'TTFB': // Time to First Byte
      case 'INP': // Interaction to Next Paint
        // Core Web Vitals
        sendMetrics(performanceData);
        break;
      
      case 'Next.js-hydration':
      case 'Next.js-route-change-to-render':
      case 'Next.js-render':
        // Next.js custom metrics
        sendMetrics(performanceData);
        break;
      
      default:
        // Any other custom metrics
        if (process.env.NODE_ENV === 'development') {
          console.log('Unknown metric:', metric.name, metric);
        }
        break;
    }
  });
  
  // Monitor page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Page is being hidden, send any pending metrics
        const metrics = localStorage.getItem('performance-metrics');
        if (metrics && process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
          navigator.sendBeacon?.(
            process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT + '/batch',
            metrics
          );
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // Monitor performance observer for additional metrics
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Observe long tasks
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              // Task took longer than 50ms
              const data: PerformanceData = {
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent,
                metrics: {
                  'long-task': {
                    value: entry.duration,
                    id: `lt-${Date.now()}`,
                  },
                },
              };
              sendMetrics(data);
            }
          }
        });
        
        // Start observing if supported
        if (PerformanceObserver.supportedEntryTypes?.includes('longtask')) {
          longTaskObserver.observe({ entryTypes: ['longtask'] });
          
          return () => {
            longTaskObserver.disconnect();
          };
        }
      } catch (error) {
        console.error('Failed to setup PerformanceObserver:', error);
      }
    }
  }, [sendMetrics]);
  
  // This component doesn't render anything
  return null;
}

// Export utility function to get current metrics
export function getCurrentMetrics(): PerformanceData[] {
  if (typeof window === 'undefined') return [];
  
  const metrics = localStorage.getItem('performance-metrics');
  return metrics ? JSON.parse(metrics) : [];
}

// Export utility function to clear metrics
export function clearMetrics(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('performance-metrics');
  }
}

// Export utility function to get metrics summary
export function getMetricsSummary() {
  const metrics = getCurrentMetrics();
  if (metrics.length === 0) return null;
  
  const summary: Record<string, { avg: number; min: number; max: number; count: number }> = {};
  
  metrics.forEach((data) => {
    Object.entries(data.metrics).forEach(([name, metric]) => {
      if (!summary[name]) {
        summary[name] = {
          avg: 0,
          min: Infinity,
          max: -Infinity,
          count: 0,
        };
      }
      
      summary[name].count++;
      summary[name].min = Math.min(summary[name].min, metric.value);
      summary[name].max = Math.max(summary[name].max, metric.value);
      summary[name].avg += metric.value;
    });
  });
  
  // Calculate averages
  Object.keys(summary).forEach((name) => {
    summary[name].avg = summary[name].avg / summary[name].count;
  });
  
  return summary;
}