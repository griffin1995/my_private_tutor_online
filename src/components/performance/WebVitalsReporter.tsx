'use client';

// CONTEXT7 SOURCE: /vercel/next.js - useReportWebVitals hook for Core Web Vitals tracking
// PERFORMANCE MONITORING REASON: Official Next.js Web Vitals API for real user monitoring
// CONTEXT7 SOURCE: /vercel/next.js - Client component pattern for performance tracking
// IMPLEMENTATION: Royal client-worthy performance monitoring with comprehensive metrics

import { useReportWebVitals } from 'next/web-vitals';
import { useEffect, useCallback, useRef } from 'react';
import { webVitalsTracker, type WebVitalsData, PERFORMANCE_THRESHOLDS } from '@/lib/performance/web-vitals';

// CONTEXT7 SOURCE: /vercel/next.js - Metric interface from Web Vitals API
// DOCUMENTATION: Official Next.js metric object structure for performance tracking
interface NextWebVitalsMetric {
  id: string;
  name: string;
  delta: number;
  entries: PerformanceEntry[];
  navigationType: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  value: number;
}

// Performance budget configuration
const PERFORMANCE_BUDGETS = {
  // Bundle size budgets (in KB)
  javascriptBudget: 300,
  cssBudget: 100,
  imageBudget: 500,
  totalPageWeight: 1000,
  
  // Time-based budgets (in ms)
  timeToInteractive: 3000,
  firstMeaningfulPaint: 2000,
  speedIndex: 3000,
  
  // Count-based budgets
  maxRequests: 50,
  maxDomNodes: 1500,
  maxListeners: 100,
} as const;

// Track custom events for business metrics
interface CustomEventData {
  event: string;
  value?: number;
  metadata?: Record<string, string | number | boolean>;
  timestamp: number;
}

export function WebVitalsReporter() {
  const metricsBuffer = useRef<NextWebVitalsMetric[]>([]);
  const customEventsBuffer = useRef<CustomEventData[]>([]);
  const reportingInterval = useRef<NodeJS.Timeout>();
  const sessionId = useRef<string>('');

  // CONTEXT7 SOURCE: /vercel/next.js - useReportWebVitals callback pattern
  // IMPLEMENTATION: Comprehensive Web Vitals tracking with buffering for efficiency
  useReportWebVitals((metric) => {
    // Buffer metrics for batch reporting
    metricsBuffer.current.push(metric as NextWebVitalsMetric);
    
    // Process metric immediately for critical issues
    if (metric.rating === 'poor') {
      handlePoorPerformance(metric as NextWebVitalsMetric);
    }
    
    // Check performance budgets
    checkPerformanceBudgets(metric as NextWebVitalsMetric);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });
    }
  });

  // Handle poor performance metrics
  const handlePoorPerformance = useCallback((metric: NextWebVitalsMetric) => {
    // CONTEXT7 SOURCE: /vercel/next.js - Error reporting for performance issues
    // IMPLEMENTATION: Alert system for royal client service standards
    const alert = {
      metric: metric.name,
      value: metric.value,
      threshold: PERFORMANCE_THRESHOLDS[metric.name as keyof typeof PERFORMANCE_THRESHOLDS],
      rating: metric.rating,
      url: window.location.href,
      timestamp: Date.now(),
      sessionId: sessionId.current,
      userAgent: navigator.userAgent,
    };
    
    // Send performance alert to monitoring endpoint
    fetch('/api/performance/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert),
    }).catch(err => console.error('Failed to send performance alert:', err));
  }, []);

  // Check performance budgets
  const checkPerformanceBudgets = useCallback((metric: NextWebVitalsMetric) => {
    // CONTEXT7 SOURCE: /vercel/next.js - Performance budget enforcement
    // IMPLEMENTATION: Automated budget violation detection for premium service
    const violations: string[] = [];
    
    // Check time-based metrics against budgets
    switch (metric.name) {
      case 'LCP':
        if (metric.value > PERFORMANCE_BUDGETS.firstMeaningfulPaint) {
          violations.push(`LCP exceeded budget: ${metric.value}ms > ${PERFORMANCE_BUDGETS.firstMeaningfulPaint}ms`);
        }
        break;
      case 'FID':
      case 'INP':
        if (metric.value > 100) {
          violations.push(`Interaction delay exceeded: ${metric.value}ms > 100ms`);
        }
        break;
      case 'CLS':
        if (metric.value > 0.1) {
          violations.push(`Layout shift exceeded: ${metric.value} > 0.1`);
        }
        break;
      case 'TTFB':
        if (metric.value > 600) {
          violations.push(`Server response slow: ${metric.value}ms > 600ms`);
        }
        break;
    }
    
    // Report violations
    if (violations.length > 0) {
      customEventsBuffer.current.push({
        event: 'performance_budget_violation',
        value: metric.value,
        metadata: {
          metric: metric.name,
          violations: violations.join(', '),
        },
        timestamp: Date.now(),
      });
    }
  }, []);

  // Track custom business events
  const trackCustomEvent = useCallback((event: string, value?: number, metadata?: Record<string, string | number | boolean>) => {
    customEventsBuffer.current.push({
      event,
      value,
      metadata,
      timestamp: Date.now(),
    });
  }, []);

  // Batch report metrics to analytics endpoint
  const reportMetrics = useCallback(async () => {
    // CONTEXT7 SOURCE: /vercel/next.js - Batch reporting pattern for efficiency
    // IMPLEMENTATION: Optimized metric reporting to reduce network overhead
    if (metricsBuffer.current.length === 0 && customEventsBuffer.current.length === 0) {
      return;
    }
    
    const payload = {
      sessionId: sessionId.current,
      metrics: [...metricsBuffer.current],
      customEvents: [...customEventsBuffer.current],
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      connection: getConnectionInfo(),
    };
    
    // Clear buffers
    metricsBuffer.current = [];
    customEventsBuffer.current = [];
    
    // Send to analytics endpoint
    try {
      await fetch('/api/performance/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Failed to report metrics:', error);
    }
  }, []);

  // Get connection information
  const getConnectionInfo = () => {
    // CONTEXT7 SOURCE: /vercel/next.js - Network Information API integration
    // IMPLEMENTATION: Connection-aware performance monitoring
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      return {
        effectiveType: conn?.effectiveType,
        downlink: conn?.downlink,
        rtt: conn?.rtt,
        saveData: conn?.saveData,
      };
    }
    return null;
  };

  // Initialize performance monitoring
  useEffect(() => {
    // Generate session ID
    sessionId.current = `perf_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    // Track page load performance
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        trackCustomEvent('page_load', navigation.loadEventEnd - navigation.fetchStart, {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          domInteractive: navigation.domInteractive - navigation.fetchStart,
          transferSize: navigation.transferSize,
          encodedBodySize: navigation.encodedBodySize,
          decodedBodySize: navigation.decodedBodySize,
        });
      }
    }
    
    // Track resource performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          
          // Check resource budget violations
          if (resource.name.includes('.js') && resource.transferSize > PERFORMANCE_BUDGETS.javascriptBudget * 1024) {
            trackCustomEvent('resource_budget_violation', resource.transferSize, {
              type: 'javascript',
              url: resource.name,
              budget: PERFORMANCE_BUDGETS.javascriptBudget,
            });
          }
          
          if (resource.name.includes('.css') && resource.transferSize > PERFORMANCE_BUDGETS.cssBudget * 1024) {
            trackCustomEvent('resource_budget_violation', resource.transferSize, {
              type: 'css',
              url: resource.name,
              budget: PERFORMANCE_BUDGETS.cssBudget,
            });
          }
        }
      }
    });
    
    try {
      observer.observe({ entryTypes: ['resource', 'navigation', 'paint', 'largest-contentful-paint'] });
    } catch (e) {
      // Some entry types might not be supported
      console.warn('Some performance entry types not supported:', e);
    }
    
    // Set up periodic reporting
    reportingInterval.current = setInterval(reportMetrics, 10000); // Report every 10 seconds
    
    // Report on page unload
    const handleUnload = () => {
      reportMetrics();
    };
    
    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);
    
    // Track business metrics
    trackTutoringMetrics();
    
    return () => {
      if (reportingInterval.current) {
        clearInterval(reportingInterval.current);
      }
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
      observer.disconnect();
    };
  }, [reportMetrics, trackCustomEvent]);

  // Track tutoring-specific business metrics
  const trackTutoringMetrics = () => {
    // CONTEXT7 SOURCE: /vercel/next.js - Custom event tracking for business metrics
    // IMPLEMENTATION: Premium tutoring service conversion tracking
    
    // Track inquiry form interactions
    document.addEventListener('submit', (e) => {
      const target = e.target as HTMLFormElement;
      if (target.dataset.formType === 'inquiry') {
        trackCustomEvent('inquiry_form_submit', 1, {
          formId: target.id,
          formType: target.dataset.formType,
        });
      }
    });
    
    // Track bootcamp registrations
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.dataset.trackEvent === 'bootcamp_registration') {
        trackCustomEvent('bootcamp_registration_click', 1, {
          bootcampType: target.dataset.bootcampType || 'unknown',
          tier: target.dataset.tier || 'unknown',
        });
      }
    });
    
    // Track service tier selections
    const trackServiceTierView = () => {
      const serviceTiers = document.querySelectorAll('[data-service-tier]');
      serviceTiers.forEach((tier) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              trackCustomEvent('service_tier_view', 1, {
                tier: (entry.target as HTMLElement).dataset.serviceTier || 'unknown',
              });
              observer.unobserve(entry.target);
            }
          });
        });
        observer.observe(tier);
      });
    };
    
    // Initialize tracking when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', trackServiceTierView);
    } else {
      trackServiceTierView();
    }
  };

  // Component doesn't render anything
  return null;
}

// Export performance utilities
export const performanceUtils = {
  // Measure component render time
  measureRenderTime: (componentName: string) => {
    const startMark = `${componentName}_render_start`;
    const endMark = `${componentName}_render_end`;
    const measureName = `${componentName}_render`;
    
    return {
      start: () => performance.mark(startMark),
      end: () => {
        performance.mark(endMark);
        performance.measure(measureName, startMark, endMark);
        const measure = performance.getEntriesByName(measureName)[0];
        if (measure) {
          console.log(`[Performance] ${componentName} rendered in ${measure.duration.toFixed(2)}ms`);
        }
      },
    };
  },
  
  // Check if performance budget is exceeded
  checkBudget: (metric: string, value: number, budget: number): boolean => {
    const exceeded = value > budget;
    if (exceeded) {
      console.warn(`[Performance Budget] ${metric} exceeded: ${value} > ${budget}`);
    }
    return exceeded;
  },
  
  // Get performance summary
  getPerformanceSummary: () => {
    const entries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!entries) return null;
    
    return {
      dns: entries.domainLookupEnd - entries.domainLookupStart,
      tcp: entries.connectEnd - entries.connectStart,
      request: entries.responseStart - entries.requestStart,
      response: entries.responseEnd - entries.responseStart,
      dom: entries.domComplete - entries.responseEnd,
      load: entries.loadEventEnd - entries.loadEventStart,
      total: entries.loadEventEnd - entries.fetchStart,
    };
  },
};