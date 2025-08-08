// CONTEXT7 SOURCE: /vercel/next.js - Custom hook for performance monitoring integration
// PERFORMANCE MONITORING REASON: Reusable hook for component-level performance tracking
// CONTEXT7 SOURCE: /vercel/next.js - React hooks pattern with performance measurement
// IMPLEMENTATION: Royal client service performance monitoring at component level

'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { webVitalsTracker } from '@/lib/performance/web-vitals';
import { businessAnalytics, TutoringEvents } from '@/lib/analytics/business-analytics';
import { PERFORMANCE_CONFIG } from '../performance.config';

// Performance monitoring options
interface PerformanceMonitoringOptions {
  // Component identification
  componentName: string;
  trackRender?: boolean;
  trackInteractions?: boolean;
  trackErrors?: boolean;
  
  // Business metrics
  businessContext?: {
    category?: 'service' | 'inquiry' | 'bootcamp' | 'content';
    tier?: string;
    value?: number;
  };
  
  // Performance budgets
  renderBudget?: number; // milliseconds
  interactionBudget?: number; // milliseconds
  memoryBudget?: number; // bytes
  
  // Alert thresholds
  alertOnSlowRender?: boolean;
  alertOnMemoryLeak?: boolean;
  alertOnErrors?: boolean;
}

// Performance metrics interface
interface PerformanceMetrics {
  renderTime: number;
  interactionTime: number;
  memoryUsage: number;
  errorCount: number;
  lastUpdate: Date;
}

// Performance hook return type
interface PerformanceMonitoringReturn {
  metrics: PerformanceMetrics;
  isLoading: boolean;
  
  // Manual tracking methods
  trackRender: (startTime?: number) => void;
  trackInteraction: (interactionType: string, startTime?: number) => void;
  trackError: (error: Error, context?: Record<string, any>) => void;
  trackBusinessEvent: (event: TutoringEvents | string, metadata?: Record<string, any>) => void;
  
  // Performance utilities
  measurePerformance: <T>(
    operation: () => T | Promise<T>,
    operationName: string
  ) => Promise<T>;
  
  checkBudgets: () => {
    render: boolean;
    interaction: boolean;
    memory: boolean;
  };
  
  getPerformanceReport: () => {
    component: string;
    metrics: PerformanceMetrics;
    budgetStatus: Record<string, boolean>;
    recommendations: string[];
  };
}

// CONTEXT7 SOURCE: /vercel/next.js - Custom hook for comprehensive performance monitoring
export function usePerformanceMonitoring(
  options: PerformanceMonitoringOptions
): PerformanceMonitoringReturn {
  const {
    componentName,
    trackRender = true,
    trackInteractions = true,
    trackErrors = true,
    businessContext,
    renderBudget = 16, // 16ms budget for 60fps
    interactionBudget = 100, // 100ms interaction budget
    memoryBudget = 50 * 1024 * 1024, // 50MB memory budget
    alertOnSlowRender = true,
    alertOnMemoryLeak = true,
    alertOnErrors = true,
  } = options;
  
  // State for metrics tracking
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    interactionTime: 0,
    memoryUsage: 0,
    errorCount: 0,
    lastUpdate: new Date(),
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs for tracking
  const renderStartTime = useRef<number>(0);
  const interactionStartTime = useRef<number>(0);
  const errorCount = useRef<number>(0);
  const memoryBaseline = useRef<number>(0);
  
  // Performance observer refs
  const renderObserver = useRef<PerformanceObserver | null>(null);
  const memoryObserver = useRef<NodeJS.Timeout | null>(null);
  
  // CONTEXT7 SOURCE: /vercel/next.js - Component render time tracking
  const trackRender = useCallback((startTime?: number) => {
    if (!trackRender) return;
    
    const now = performance.now();
    const renderTime = startTime ? now - startTime : now - renderStartTime.current;
    
    setMetrics(prev => ({
      ...prev,
      renderTime,
      lastUpdate: new Date(),
    }));
    
    // Check render budget
    if (renderTime > renderBudget && alertOnSlowRender) {
      console.warn(`[Performance] ${componentName} render exceeded budget: ${renderTime.toFixed(2)}ms > ${renderBudget}ms`);
      
      // Track performance issue
      businessAnalytics.track('performance_issue', {
        category: 'performance',
        action: 'slow_render',
        label: componentName,
        value: renderTime,
        metadata: {
          component: componentName,
          renderTime,
          budget: renderBudget,
          exceeded: renderTime - renderBudget,
        },
      });
    }
    
    // Send to performance tracking
    if (typeof window !== 'undefined' && window.performance) {
      performance.mark(`${componentName}_render_end`);
      performance.measure(
        `${componentName}_render`,
        `${componentName}_render_start`,
        `${componentName}_render_end`
      );
    }
  }, [componentName, renderBudget, alertOnSlowRender, trackRender]);
  
  // CONTEXT7 SOURCE: /vercel/next.js - User interaction performance tracking
  const trackInteraction = useCallback((interactionType: string, startTime?: number) => {
    if (!trackInteractions) return;
    
    const now = performance.now();
    const interactionTime = startTime ? now - startTime : now - interactionStartTime.current;
    
    setMetrics(prev => ({
      ...prev,
      interactionTime,
      lastUpdate: new Date(),
    }));
    
    // Check interaction budget
    if (interactionTime > interactionBudget) {
      console.warn(`[Performance] ${componentName} ${interactionType} exceeded budget: ${interactionTime.toFixed(2)}ms > ${interactionBudget}ms`);
      
      // Track slow interaction
      businessAnalytics.track('slow_interaction', {
        category: 'performance',
        action: 'slow_interaction',
        label: `${componentName}_${interactionType}`,
        value: interactionTime,
        metadata: {
          component: componentName,
          interactionType,
          interactionTime,
          budget: interactionBudget,
        },
      });
    }
    
    // Track business interaction if context provided
    if (businessContext) {
      businessAnalytics.track(`${interactionType}_interaction`, {
        category: 'engagement',
        action: interactionType,
        label: componentName,
        value: businessContext.value,
        metadata: {
          component: componentName,
          interactionType,
          tier: businessContext.tier,
          category: businessContext.category,
        },
      });
    }
  }, [componentName, interactionBudget, trackInteractions, businessContext]);
  
  // CONTEXT7 SOURCE: /vercel/next.js - Error tracking with component context
  const trackError = useCallback((error: Error, context?: Record<string, any>) => {
    if (!trackErrors) return;
    
    errorCount.current += 1;
    
    setMetrics(prev => ({
      ...prev,
      errorCount: errorCount.current,
      lastUpdate: new Date(),
    }));
    
    // Send error to analytics
    businessAnalytics.trackError(error.message, {
      component: componentName,
      stack: error.stack,
      ...context,
    });
    
    // Alert on errors if enabled
    if (alertOnErrors) {
      console.error(`[Performance] ${componentName} error:`, error);
    }
  }, [componentName, trackErrors, alertOnErrors]);
  
  // CONTEXT7 SOURCE: /vercel/next.js - Business event tracking integration
  const trackBusinessEvent = useCallback((event: TutoringEvents | string, metadata?: Record<string, any>) => {
    return businessAnalytics.track(event, {
      category: businessContext?.category === 'service' ? 'engagement' : 'conversion',
      action: event,
      label: componentName,
      value: businessContext?.value,
      metadata: {
        component: componentName,
        tier: businessContext?.tier,
        category: businessContext?.category,
        ...metadata,
      },
    });
  }, [componentName, businessContext]);
  
  // CONTEXT7 SOURCE: /vercel/next.js - Performance measurement utility
  const measurePerformance = useCallback(async <T>(
    operation: () => T | Promise<T>,
    operationName: string
  ): Promise<T> => {
    const startTime = performance.now();
    const startMark = `${componentName}_${operationName}_start`;
    const endMark = `${componentName}_${operationName}_end`;
    
    performance.mark(startMark);
    
    try {
      const result = await operation();
      
      performance.mark(endMark);
      performance.measure(`${componentName}_${operationName}`, startMark, endMark);
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Log performance measurement
      console.log(`[Performance] ${componentName}.${operationName}: ${duration.toFixed(2)}ms`);
      
      return result;
    } catch (error) {
      performance.mark(endMark);
      trackError(error as Error, { operation: operationName });
      throw error;
    }
  }, [componentName, trackError]);
  
  // Check performance budgets
  const checkBudgets = useCallback(() => {
    return {
      render: metrics.renderTime <= renderBudget,
      interaction: metrics.interactionTime <= interactionBudget,
      memory: metrics.memoryUsage <= memoryBudget,
    };
  }, [metrics, renderBudget, interactionBudget, memoryBudget]);
  
  // Generate performance report
  const getPerformanceReport = useCallback(() => {
    const budgetStatus = checkBudgets();
    const recommendations: string[] = [];
    
    if (!budgetStatus.render) {
      recommendations.push(`Optimize render performance - current: ${metrics.renderTime.toFixed(2)}ms, budget: ${renderBudget}ms`);
    }
    
    if (!budgetStatus.interaction) {
      recommendations.push(`Improve interaction responsiveness - current: ${metrics.interactionTime.toFixed(2)}ms, budget: ${interactionBudget}ms`);
    }
    
    if (!budgetStatus.memory) {
      recommendations.push(`Reduce memory usage - current: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB, budget: ${(memoryBudget / 1024 / 1024).toFixed(2)}MB`);
    }
    
    if (metrics.errorCount > 0) {
      recommendations.push(`Fix component errors - ${metrics.errorCount} errors detected`);
    }
    
    return {
      component: componentName,
      metrics,
      budgetStatus,
      recommendations,
    };
  }, [componentName, metrics, checkBudgets, renderBudget, interactionBudget, memoryBudget]);
  
  // Initialize performance monitoring
  useEffect(() => {
    // Set up render performance tracking
    if (trackRender) {
      renderStartTime.current = performance.now();
      performance.mark(`${componentName}_render_start`);
      
      // Track component mount
      trackBusinessEvent('component_mount', {
        componentName,
        mountTime: Date.now(),
      });
    }
    
    // Set up memory monitoring
    if (typeof window !== 'undefined' && (performance as any).memory) {
      memoryBaseline.current = (performance as any).memory.usedJSHeapSize;
      
      memoryObserver.current = setInterval(() => {
        const currentMemory = (performance as any).memory.usedJSHeapSize;
        const memoryDelta = currentMemory - memoryBaseline.current;
        
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memoryDelta,
          lastUpdate: new Date(),
        }));
        
        // Check for memory leaks
        if (memoryDelta > memoryBudget && alertOnMemoryLeak) {
          console.warn(`[Performance] ${componentName} potential memory leak: ${(memoryDelta / 1024 / 1024).toFixed(2)}MB`);
          
          businessAnalytics.track('memory_leak', {
            category: 'performance',
            action: 'memory_leak',
            label: componentName,
            value: memoryDelta,
            metadata: {
              component: componentName,
              memoryUsage: memoryDelta,
              budget: memoryBudget,
            },
          });
        }
      }, 5000); // Check every 5 seconds
    }
    
    // Set up performance observer for component-specific entries
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      renderObserver.current = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes(componentName)) {
            console.log(`[Performance Observer] ${entry.name}: ${entry.duration.toFixed(2)}ms`);
          }
        }
      });
      
      renderObserver.current.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
    }
    
    setIsLoading(false);
    
    // Cleanup function
    return () => {
      if (memoryObserver.current) {
        clearInterval(memoryObserver.current);
      }
      
      if (renderObserver.current) {
        renderObserver.current.disconnect();
      }
      
      // Track component unmount
      if (trackRender) {
        trackBusinessEvent('component_unmount', {
          componentName,
          unmountTime: Date.now(),
          sessionDuration: Date.now() - renderStartTime.current,
        });
      }
    };
  }, [componentName, trackRender, memoryBudget, alertOnMemoryLeak, trackBusinessEvent]);
  
  // Track render completion when component updates
  useEffect(() => {
    if (trackRender && !isLoading) {
      trackRender();
    }
  }, [trackRender, isLoading]);
  
  return {
    metrics,
    isLoading,
    trackRender,
    trackInteraction,
    trackError,
    trackBusinessEvent,
    measurePerformance,
    checkBudgets,
    getPerformanceReport,
  };
}

// Export performance monitoring utilities
export const performanceMonitoringUtils = {
  // Create component-specific performance tracker
  createTracker: (componentName: string, options?: Partial<PerformanceMonitoringOptions>) => {
    return usePerformanceMonitoring({
      componentName,
      ...options,
    });
  },
  
  // Measure async operations
  measureAsync: async <T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<{ result: T; duration: number }> => {
    const startTime = performance.now();
    const result = await operation();
    const duration = performance.now() - startTime;
    
    console.log(`[Performance] ${operationName}: ${duration.toFixed(2)}ms`);
    
    return { result, duration };
  },
  
  // Check Core Web Vitals compliance
  checkWebVitalsCompliance: () => {
    const metrics = webVitalsTracker.getMetrics();
    const summary = webVitalsTracker.getSummary();
    
    return {
      compliant: summary.overall === 'good',
      metrics,
      summary,
      recommendations: Object.entries(metrics)
        .filter(([_, metric]) => metric.rating !== 'good')
        .map(([name, metric]) => `Improve ${name}: ${metric.value} (rating: ${metric.rating})`),
    };
  },
  
  // Generate performance budget report
  generateBudgetReport: () => {
    const config = PERFORMANCE_CONFIG;
    return {
      webVitals: config.webVitals,
      resources: config.resources,
      network: config.network,
      testing: config.testing,
      environment: config.environment[process.env.NODE_ENV as keyof typeof config.environment] || config.environment.development,
    };
  },
};

export default usePerformanceMonitoring;