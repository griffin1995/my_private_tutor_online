/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Performance monitoring and crash prevention utilities
 * CRITICAL SAFETY: Prevents infinite re-render loops and system resource exhaustion
 * PURPOSE: Real-time detection and prevention of catastrophic performance failures
 */

import React, { useEffect, useRef, useCallback } from 'react';

// Performance thresholds based on crash analysis
const PERFORMANCE_THRESHOLDS = {
  MAX_RENDERS_PER_SECOND: 50,
  MAX_MEMORY_USAGE_PERCENT: 75,
  MAX_RENDER_TIME_MS: 100,
  MAX_COMPONENT_INSTANCES: 1000,
  CRITICAL_FPS: 10,
  WARNING_FPS: 30,
} as const;

/**
 * Hook to detect and prevent infinite re-render loops
 * Throws error if render count exceeds safety threshold
 */
export const useRenderGuard = (componentName: string) => {
  const renderCount = useRef(0);
  const lastResetTime = useRef(Date.now());
  const renderTimestamps = useRef<number[]>([]);

  useEffect(() => {
    const now = Date.now();
    renderCount.current++;
    renderTimestamps.current.push(now);

    // Keep only last 100 timestamps for analysis
    if (renderTimestamps.current.length > 100) {
      renderTimestamps.current.shift();
    }

    // Calculate renders per second
    const oneSecondAgo = now - 1000;
    const recentRenders = renderTimestamps.current.filter(t => t > oneSecondAgo);
    const rendersPerSecond = recentRenders.length;

    // CRITICAL: Detect runaway rendering
    if (rendersPerSecond > PERFORMANCE_THRESHOLDS.MAX_RENDERS_PER_SECOND) {
      const errorMessage = `🔴 CRITICAL: Infinite re-render loop detected in ${componentName}! ` +
        `${rendersPerSecond} renders/second exceeds safety threshold of ${PERFORMANCE_THRESHOLDS.MAX_RENDERS_PER_SECOND}`;

      console.error(errorMessage, {
        componentName,
        rendersPerSecond,
        totalRenders: renderCount.current,
        timestamps: renderTimestamps.current.slice(-10),
      });

      // Throw error to break the loop
      throw new Error(errorMessage);
    }

    // Warning for high render rate
    if (rendersPerSecond > PERFORMANCE_THRESHOLDS.MAX_RENDERS_PER_SECOND / 2) {
      console.warn(`⚠️ Performance Warning: ${componentName} rendering ${rendersPerSecond} times/second`);
    }

    // Reset counter every 10 seconds
    if (now - lastResetTime.current > 10000) {
      renderCount.current = 0;
      lastResetTime.current = now;
      renderTimestamps.current = [];
    }
  });
};

/**
 * Hook to monitor memory usage and prevent exhaustion
 * Triggers cleanup when memory threshold is exceeded
 */
export const useMemoryGuard = (onMemoryWarning?: () => void) => {
  const lastWarningTime = useRef(0);

  useEffect(() => {
    // Check if Performance Memory API is available
    if (!performance.memory) {
      console.info('Memory monitoring not available in this browser');
      return;
    }

    const checkMemory = () => {
      const { usedJSHeapSize, jsHeapSizeLimit } = performance.memory;
      const usagePercent = (usedJSHeapSize / jsHeapSizeLimit) * 100;

      // Critical memory threshold
      if (usagePercent > PERFORMANCE_THRESHOLDS.MAX_MEMORY_USAGE_PERCENT) {
        const now = Date.now();

        // Throttle warnings to once per 5 seconds
        if (now - lastWarningTime.current > 5000) {
          lastWarningTime.current = now;

          console.error('🔴 CRITICAL: Memory usage exceeded safety threshold!', {
            usagePercent: usagePercent.toFixed(1),
            usedMB: (usedJSHeapSize / 1024 / 1024).toFixed(1),
            limitMB: (jsHeapSizeLimit / 1024 / 1024).toFixed(1),
          });

          // Trigger cleanup callback if provided
          onMemoryWarning?.();

          // Force garbage collection if available (Chrome with --enable-precise-memory-info)
          if ((global as any).gc) {
            console.info('Triggering garbage collection...');
            (global as any).gc();
          }
        }
      }

      // Warning threshold at 60%
      if (usagePercent > 60 && usagePercent <= PERFORMANCE_THRESHOLDS.MAX_MEMORY_USAGE_PERCENT) {
        console.warn(`⚠️ Memory Warning: ${usagePercent.toFixed(1)}% heap used`);
      }
    };

    // Check memory every 3 seconds
    const interval = setInterval(checkMemory, 3000);

    // Initial check
    checkMemory();

    return () => clearInterval(interval);
  }, [onMemoryWarning]);
};

/**
 * Hook to monitor frame rate and detect performance degradation
 */
export const useFPSMonitor = (componentName: string) => {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsHistory = useRef<number[]>([]);

  useEffect(() => {
    let animationId: number;

    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime.current;

      // Calculate FPS every second
      if (deltaTime >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / deltaTime);
        fpsHistory.current.push(fps);

        // Keep only last 10 FPS measurements
        if (fpsHistory.current.length > 10) {
          fpsHistory.current.shift();
        }

        // Check for critical FPS drop
        if (fps < PERFORMANCE_THRESHOLDS.CRITICAL_FPS) {
          console.error(`🔴 CRITICAL: Frame rate critically low in ${componentName}!`, {
            fps,
            history: fpsHistory.current,
          });
        } else if (fps < PERFORMANCE_THRESHOLDS.WARNING_FPS) {
          console.warn(`⚠️ Performance: Low frame rate in ${componentName}: ${fps} FPS`);
        }

        // Reset counters
        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => cancelAnimationFrame(animationId);
  }, [componentName]);
};

/**
 * Hook to detect and prevent circular dependencies in useCallback/useMemo
 */
export const useDependencyGuard = (
  hookName: string,
  dependencies: React.DependencyList,
  componentName: string
) => {
  const previousDeps = useRef<React.DependencyList>();
  const changeCount = useRef(0);
  const lastChangeTime = useRef(Date.now());

  useEffect(() => {
    if (previousDeps.current) {
      const hasChanged = dependencies.some(
        (dep, i) => dep !== previousDeps.current![i]
      );

      if (hasChanged) {
        changeCount.current++;
        const now = Date.now();
        const timeSinceLastChange = now - lastChangeTime.current;
        lastChangeTime.current = now;

        // Detect rapid dependency changes (potential circular dependency)
        if (timeSinceLastChange < 100 && changeCount.current > 5) {
          console.error(
            `🔴 CRITICAL: Potential circular dependency detected in ${componentName}.${hookName}!`,
            {
              changeCount: changeCount.current,
              timeSinceLastChange,
              currentDeps: dependencies,
              previousDeps: previousDeps.current,
            }
          );
        }

        // Reset counter after 1 second of stability
        setTimeout(() => {
          changeCount.current = 0;
        }, 1000);
      }
    }

    previousDeps.current = [...dependencies];
  }, dependencies);
};

/**
 * Performance monitoring component wrapper
 * Provides comprehensive crash prevention for high-risk components
 */
export function withPerformanceGuard<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return React.forwardRef<any, P>((props, ref) => {
    // Enable all guards
    useRenderGuard(componentName);
    useMemoryGuard();
    useFPSMonitor(componentName);

    // Render component with monitoring
    return React.createElement(Component, { ...props, ref });
  });
}

/**
 * Emergency cleanup function for critical memory situations
 */
export const emergencyCleanup = () => {
  console.warn('🚨 Initiating emergency cleanup...');

  // Clear all timeouts and intervals
  const highestTimeoutId = setTimeout(() => {}, 0);
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }

  // Cancel all animation frames
  const highestAnimationId = requestAnimationFrame(() => {});
  for (let i = 0; i < highestAnimationId; i++) {
    cancelAnimationFrame(i);
  }

  // Clear console to free memory
  if (console.clear) {
    console.clear();
  }

  // Dispatch custom event for components to clean up
  window.dispatchEvent(new CustomEvent('emergency-cleanup'));

  console.info('✅ Emergency cleanup completed');
};

/**
 * Performance metrics collector for analysis
 */
export class PerformanceMetricsCollector {
  private metrics: Map<string, any[]> = new Map();
  private startTime: number = performance.now();

  record(category: string, value: any) {
    if (!this.metrics.has(category)) {
      this.metrics.set(category, []);
    }
    this.metrics.get(category)!.push({
      value,
      timestamp: performance.now() - this.startTime,
    });
  }

  getReport() {
    const report: Record<string, any> = {};

    this.metrics.forEach((values, category) => {
      if (values.length === 0) return;

      // Calculate statistics
      const numbers = values
        .map(v => typeof v.value === 'number' ? v.value : 0)
        .filter(v => v > 0);

      if (numbers.length > 0) {
        report[category] = {
          count: values.length,
          average: numbers.reduce((a, b) => a + b, 0) / numbers.length,
          min: Math.min(...numbers),
          max: Math.max(...numbers),
          last: values[values.length - 1].value,
        };
      }
    });

    return report;
  }

  reset() {
    this.metrics.clear();
    this.startTime = performance.now();
  }
}

// Global performance collector instance
export const globalMetrics = new PerformanceMetricsCollector();

// Export types
export type PerformanceThresholds = typeof PERFORMANCE_THRESHOLDS;