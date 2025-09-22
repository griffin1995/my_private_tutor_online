/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Performance monitoring utilities
 * PERFORMANCE MONITORING: Video component performance tracking and optimization metrics
 * ARCHITECTURE: Enterprise-grade performance monitoring for video sections
 *
 * Business Impact: Ensures optimal video loading and rendering performance
 * Royal Client Standards: Premium performance metrics for video content
 */

// CONTEXT7 SOURCE: /websites/react_dev - Performance measurement patterns
// PERFORMANCE METRICS: Core Web Vitals and custom video metrics
export interface VideoPerformanceMetrics {
  readonly componentRenderTime: number;
  readonly memoizationHits: number;
  readonly imageLoadTime: number;
  readonly backgroundLoadTime: number;
  readonly totalMemoryUsage: number;
  readonly rerenderCount: number;
  readonly cacheEfficiency: number;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Performance monitoring class
// MONITORING CLASS: Track video component performance metrics
export class VideoPerformanceMonitor {
  private static instance: VideoPerformanceMonitor;
  private metrics: Map<string, VideoPerformanceMetrics>;
  private renderStartTimes: Map<string, number>;
  private memoizationCache: Map<string, number>;

  private constructor() {
    this.metrics = new Map();
    this.renderStartTimes = new Map();
    this.memoizationCache = new Map();
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Singleton pattern
  // SINGLETON: Ensure single instance for consistent monitoring
  public static getInstance(): VideoPerformanceMonitor {
    if (!VideoPerformanceMonitor.instance) {
      VideoPerformanceMonitor.instance = new VideoPerformanceMonitor();
    }
    return VideoPerformanceMonitor.instance;
  }

  // CONTEXT7 SOURCE: /websites/react_dev - Performance timing
  // TIMING: Start render performance measurement
  public startRenderMeasurement(componentId: string): void {
    this.renderStartTimes.set(componentId, performance.now());
  }

  // CONTEXT7 SOURCE: /websites/react_dev - Performance calculation
  // MEASUREMENT: Complete render measurement and store metrics
  public endRenderMeasurement(componentId: string): number {
    const startTime = this.renderStartTimes.get(componentId);
    if (!startTime) {
      console.warn(`No start time found for component: ${componentId}`);
      return 0;
    }

    const renderTime = performance.now() - startTime;
    this.updateMetrics(componentId, { componentRenderTime: renderTime });
    this.renderStartTimes.delete(componentId);

    return renderTime;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Memoization tracking
  // CACHE TRACKING: Monitor memoization effectiveness
  public trackMemoizationHit(componentId: string): void {
    const currentHits = this.memoizationCache.get(componentId) || 0;
    this.memoizationCache.set(componentId, currentHits + 1);
    this.updateMetrics(componentId, { memoizationHits: currentHits + 1 });
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Image performance monitoring
  // IMAGE METRICS: Track image loading performance
  public trackImageLoad(componentId: string, loadTime: number): void {
    this.updateMetrics(componentId, { imageLoadTime: loadTime });
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Background image monitoring
  // BACKGROUND METRICS: Track background image performance
  public trackBackgroundLoad(componentId: string, loadTime: number): void {
    this.updateMetrics(componentId, { backgroundLoadTime: loadTime });
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Memory usage tracking
  // MEMORY MONITORING: Track component memory consumption
  public trackMemoryUsage(componentId: string): void {
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory;
      const usedMemory = memoryInfo.usedJSHeapSize;
      this.updateMetrics(componentId, { totalMemoryUsage: usedMemory });
    }
  }

  // CONTEXT7 SOURCE: /websites/react_dev - Re-render tracking
  // RENDER TRACKING: Count component re-renders
  public trackRerender(componentId: string): void {
    const currentMetrics = this.metrics.get(componentId);
    const currentCount = currentMetrics?.rerenderCount || 0;
    this.updateMetrics(componentId, { rerenderCount: currentCount + 1 });
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Cache efficiency calculation
  // EFFICIENCY METRICS: Calculate cache effectiveness
  public calculateCacheEfficiency(componentId: string): number {
    const metrics = this.metrics.get(componentId);
    if (!metrics) return 0;

    const { memoizationHits = 0, rerenderCount = 0 } = metrics;
    const totalRenders = rerenderCount + 1; // Include initial render
    const efficiency = memoizationHits / totalRenders;

    this.updateMetrics(componentId, { cacheEfficiency: efficiency });
    return efficiency;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Metrics update helper
  // UPDATE HELPER: Safely update component metrics
  private updateMetrics(componentId: string, updates: Partial<VideoPerformanceMetrics>): void {
    const currentMetrics = this.metrics.get(componentId) || {
      componentRenderTime: 0,
      memoizationHits: 0,
      imageLoadTime: 0,
      backgroundLoadTime: 0,
      totalMemoryUsage: 0,
      rerenderCount: 0,
      cacheEfficiency: 0,
    };

    this.metrics.set(componentId, { ...currentMetrics, ...updates });
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Performance report generation
  // REPORTING: Generate comprehensive performance report
  public generateReport(componentId: string): VideoPerformanceMetrics | null {
    const metrics = this.metrics.get(componentId);
    if (!metrics) {
      console.warn(`No metrics found for component: ${componentId}`);
      return null;
    }

    // Calculate final efficiency
    this.calculateCacheEfficiency(componentId);

    return this.metrics.get(componentId)!;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Performance thresholds
  // VALIDATION: Check if performance meets targets
  public validatePerformance(componentId: string): {
    passed: boolean;
    issues: string[];
  } {
    const metrics = this.metrics.get(componentId);
    if (!metrics) {
      return { passed: false, issues: ['No metrics available'] };
    }

    const issues: string[] = [];

    // Check render time (target: < 16ms for 60fps)
    if (metrics.componentRenderTime > 16) {
      issues.push(`Render time ${metrics.componentRenderTime.toFixed(2)}ms exceeds 16ms target`);
    }

    // Check image load time (target: < 200ms)
    if (metrics.imageLoadTime > 200) {
      issues.push(`Image load time ${metrics.imageLoadTime.toFixed(2)}ms exceeds 200ms target`);
    }

    // Check cache efficiency (target: > 0.7 or 70%)
    if (metrics.cacheEfficiency < 0.7) {
      issues.push(`Cache efficiency ${(metrics.cacheEfficiency * 100).toFixed(1)}% below 70% target`);
    }

    // Check re-render count (warning at > 10 unnecessary re-renders)
    if (metrics.rerenderCount > 10) {
      issues.push(`High re-render count: ${metrics.rerenderCount}`);
    }

    return {
      passed: issues.length === 0,
      issues,
    };
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Performance optimization suggestions
  // OPTIMIZATION: Provide actionable performance improvements
  public getOptimizationSuggestions(componentId: string): string[] {
    const metrics = this.metrics.get(componentId);
    if (!metrics) return ['No metrics available for optimization analysis'];

    const suggestions: string[] = [];

    if (metrics.componentRenderTime > 16) {
      suggestions.push('Consider splitting complex calculations into smaller useMemo blocks');
      suggestions.push('Review component complexity and consider code splitting');
    }

    if (metrics.imageLoadTime > 200) {
      suggestions.push('Implement image preloading for critical images');
      suggestions.push('Consider using smaller image formats or progressive loading');
      suggestions.push('Add priority={true} to above-fold images');
    }

    if (metrics.backgroundLoadTime > 500) {
      suggestions.push('Optimize background image size and format');
      suggestions.push('Consider lazy loading background images below the fold');
      suggestions.push('Use CSS gradient fallbacks while images load');
    }

    if (metrics.cacheEfficiency < 0.7) {
      suggestions.push('Review useMemo dependencies for stability');
      suggestions.push('Consider useCallback for event handlers');
      suggestions.push('Check for object/array recreation in render');
    }

    if (metrics.rerenderCount > 10) {
      suggestions.push('Implement React.memo with custom comparison');
      suggestions.push('Review parent component for unnecessary state updates');
      suggestions.push('Consider moving state closer to where it is needed');
    }

    if (metrics.totalMemoryUsage > 50000000) { // 50MB
      suggestions.push('Review for memory leaks in useEffect cleanup');
      suggestions.push('Consider virtualizing long lists');
      suggestions.push('Optimize image sizes and implement lazy loading');
    }

    return suggestions.length > 0 ? suggestions : ['Performance is within acceptable thresholds'];
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Clear metrics
  // CLEANUP: Reset metrics for a component
  public clearMetrics(componentId: string): void {
    this.metrics.delete(componentId);
    this.renderStartTimes.delete(componentId);
    this.memoizationCache.delete(componentId);
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Export all metrics
  // EXPORT: Get all tracked metrics for analysis
  public exportAllMetrics(): Map<string, VideoPerformanceMetrics> {
    return new Map(this.metrics);
  }
}

// CONTEXT7 SOURCE: /websites/react_dev - React hook for performance monitoring
// REACT HOOK: Custom hook for component performance tracking
export function useVideoPerformanceMonitor(componentId: string) {
  const monitor = VideoPerformanceMonitor.getInstance();

  return {
    startMeasurement: () => monitor.startRenderMeasurement(componentId),
    endMeasurement: () => monitor.endRenderMeasurement(componentId),
    trackMemoizationHit: () => monitor.trackMemoizationHit(componentId),
    trackImageLoad: (loadTime: number) => monitor.trackImageLoad(componentId, loadTime),
    trackBackgroundLoad: (loadTime: number) => monitor.trackBackgroundLoad(componentId, loadTime),
    trackMemoryUsage: () => monitor.trackMemoryUsage(componentId),
    trackRerender: () => monitor.trackRerender(componentId),
    generateReport: () => monitor.generateReport(componentId),
    validatePerformance: () => monitor.validatePerformance(componentId),
    getOptimizationSuggestions: () => monitor.getOptimizationSuggestions(componentId),
    clearMetrics: () => monitor.clearMetrics(componentId),
  };
}

// CONTEXT7 SOURCE: /microsoft/typescript - Performance thresholds
// THRESHOLDS: Export performance targets for external validation
export const VIDEO_PERFORMANCE_THRESHOLDS = {
  renderTime: 16, // ms (60fps target)
  imageLoadTime: 200, // ms
  backgroundLoadTime: 500, // ms
  cacheEfficiency: 0.7, // 70%
  maxRerenders: 10,
  maxMemoryUsage: 50000000, // 50MB
} as const;