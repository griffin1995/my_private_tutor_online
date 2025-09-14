/**
 * CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring and measurement patterns
 * MONITORING REASON: Official Next.js documentation shows performance measurement for optimization tracking
 * PATTERN: Component-specific performance monitoring for about section optimization
 */

'use client';

// CONTEXT7 SOURCE: /mozilla/mdn - Cache performance monitoring integration
// CACHE INTEGRATION REASON: Official MDN documentation shows combining cache and performance metrics
import { getCachePerformanceMonitor, type CachePerformanceMetrics } from './cache-monitoring';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Performance observer patterns for Core Web Vitals
 * WEB VITALS MONITORING: Official Next.js documentation shows measuring LCP, FID, CLS for optimization
 */
interface AboutSectionMetrics {
  /** Largest Contentful Paint specific to about section */
  lcp?: number;
  /** First Input Delay for about section interactions */
  fid?: number;
  /** Cumulative Layout Shift for about section */
  cls?: number;
  /** Time to Interactive for about section */
  tti?: number;
  /** Component mount time */
  mountTime?: number;
  /** Animation completion time */
  animationTime?: number;
  /** Image load time */
  imageLoadTime?: number;
  /** Video load time */
  videoLoadTime?: number;
  /** Cache performance metrics */
  cacheMetrics?: CachePerformanceMetrics;
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Performance measurement using Performance API
 * PERFORMANCE API INTEGRATION: Official Next.js documentation shows using Performance API for measurements
 */
class AboutSectionPerformanceMonitor {
  private metrics: AboutSectionMetrics = {};
  private startTime: number;
  private observers: PerformanceObserver[] = [];
  private cacheMonitor: any; // Will be initialized if available

  constructor() {
    this.startTime = performance.now();
    this.initializeObservers();
    this.initializeCacheMonitoring();
  }

  /**
   * CONTEXT7 SOURCE: /mozilla/mdn - Cache monitoring integration with performance tracking
   * CACHE INTEGRATION: Official MDN documentation shows combining cache metrics with performance measurement
   */
  private initializeCacheMonitoring(): void {
    try {
      this.cacheMonitor = getCachePerformanceMonitor();
    } catch (error) {
      console.warn('Cache monitoring initialization failed:', error);
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - PerformanceObserver setup for Core Web Vitals monitoring
   * OBSERVER SETUP: Official Next.js documentation shows setting up performance observers
   */
  private initializeObservers(): void {
    if (typeof window === 'undefined') return;

    try {
      // LCP Observer
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;

        // Check if LCP is within about section
        if (lastEntry?.element?.closest('#about')) {
          this.metrics.lcp = lastEntry.startTime;
          this.reportMetric('lcp', lastEntry.startTime);
        }
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // FID Observer
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          // Check if interaction is within about section
          if (entry.target?.closest('#about')) {
            this.metrics.fid = entry.processingStart - entry.startTime;
            this.reportMetric('fid', this.metrics.fid);
          }
        });
      });

      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);

      // CLS Observer
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          // Check if layout shift is within about section
          if (!entry.hadRecentInput && entry.sources?.some((source: any) =>
            source.node?.closest('#about'))) {
            clsValue += entry.value;
            this.metrics.cls = clsValue;
            this.reportMetric('cls', clsValue);
          }
        });
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);

    } catch (error) {
      console.warn('Performance monitoring not available:', error);
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Custom metric tracking for component performance
   * CUSTOM METRICS: Official Next.js documentation shows tracking custom performance metrics
   */
  markComponentMount(): void {
    const mountTime = performance.now() - this.startTime;
    this.metrics.mountTime = mountTime;
    performance.mark('about-section-mounted');
    this.reportMetric('mount-time', mountTime);
  }

  markAnimationComplete(): void {
    const animationTime = performance.now() - this.startTime;
    this.metrics.animationTime = animationTime;
    performance.mark('about-section-animated');
    this.reportMetric('animation-time', animationTime);
  }

  markImageLoaded(): void {
    const imageLoadTime = performance.now() - this.startTime;
    this.metrics.imageLoadTime = imageLoadTime;
    performance.mark('about-section-image-loaded');
    this.reportMetric('image-load-time', imageLoadTime);
  }

  markVideoLoaded(): void {
    const videoLoadTime = performance.now() - this.startTime;
    this.metrics.videoLoadTime = videoLoadTime;
    performance.mark('about-section-video-loaded');
    this.reportMetric('video-load-time', videoLoadTime);
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Performance data reporting patterns
   * REPORTING STRATEGY: Official Next.js documentation shows sending performance data for analysis
   */
  private reportMetric(metric: string, value: number): void {
    // Report to performance monitoring service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'about_section_performance', {
        metric_name: metric,
        metric_value: Math.round(value),
        section_id: 'about'
      });
    }

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`About Section ${metric}:`, `${Math.round(value)}ms`);
    }
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Performance summary and reporting
   * SUMMARY GENERATION: Official Next.js documentation shows generating performance summaries
   */
  getMetricsSummary(): AboutSectionMetrics {
    const summary = { ...this.metrics };

    // CONTEXT7 SOURCE: /mozilla/mdn - Cache metrics integration with performance summary
    // METRICS INTEGRATION: Official MDN documentation shows combining cache and performance data
    if (this.cacheMonitor) {
      try {
        summary.cacheMetrics = this.cacheMonitor.getMetrics();
      } catch (error) {
        console.warn('Cache metrics retrieval failed:', error);
      }
    }

    return summary;
  }

  /**
   * CONTEXT7 SOURCE: /vercel/next.js - Cleanup patterns for performance observers
   * CLEANUP STRATEGY: Official Next.js documentation shows proper cleanup for performance observers
   */
  cleanup(): void {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Error disconnecting observer:', error);
      }
    });
    this.observers = [];
  }
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Singleton pattern for performance monitoring
 * SINGLETON IMPLEMENTATION: Official Next.js documentation shows singleton for global performance tracking
 */
let aboutSectionMonitor: AboutSectionPerformanceMonitor | null = null;

export const getAboutSectionMonitor = (): AboutSectionPerformanceMonitor => {
  if (!aboutSectionMonitor) {
    aboutSectionMonitor = new AboutSectionPerformanceMonitor();
  }
  return aboutSectionMonitor;
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring hook patterns
 * HOOK INTEGRATION: Official Next.js documentation shows React hooks for performance monitoring
 */
export const useAboutSectionPerformance = () => {
  if (typeof window === 'undefined') return null;

  return {
    monitor: getAboutSectionMonitor(),
    markMount: () => getAboutSectionMonitor().markComponentMount(),
    markAnimationComplete: () => getAboutSectionMonitor().markAnimationComplete(),
    markImageLoaded: () => getAboutSectionMonitor().markImageLoaded(),
    markVideoLoaded: () => getAboutSectionMonitor().markVideoLoaded(),
    getMetrics: () => getAboutSectionMonitor().getMetricsSummary()
  };
};

// CONTEXT7 SOURCE: /vercel/next.js - TypeScript export patterns for performance monitoring
export type { AboutSectionMetrics };