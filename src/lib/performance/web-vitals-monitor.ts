// CONTEXT7 SOURCE: /vercel/next.js - Web Vitals monitoring implementation
// PERFORMANCE OPTIMIZATION REASON: Phase 3 Real User Monitoring for production performance tracking

import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

interface WebVitalsConfig {
  endpoint?: string;
  sampleRate?: number;
  debug?: boolean;
  thresholds?: {
    CLS?: number;
    FCP?: number;
    FID?: number;
    INP?: number;
    LCP?: number;
    TTFB?: number;
  };
}

// CONTEXT7 SOURCE: /vercel/next.js - Performance thresholds for green zone metrics
const DEFAULT_THRESHOLDS = {
  CLS: 0.1, // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  FID: 100, // First Input Delay (ms)
  INP: 200, // Interaction to Next Paint (ms)
  LCP: 2500, // Largest Contentful Paint (ms)
  TTFB: 800, // Time to First Byte (ms)
};

class WebVitalsMonitor {
  private config: Required<WebVitalsConfig>;
  private metrics: Map<string, Metric> = new Map();
  private reportQueue: Metric[] = [];
  private isReporting = false;

  constructor(config: WebVitalsConfig = {}) {
    this.config = {
      endpoint: config.endpoint || '/api/performance/vitals',
      sampleRate: config.sampleRate || 1.0,
      debug: config.debug || false,
      thresholds: { ...DEFAULT_THRESHOLDS, ...config.thresholds },
    };
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Initialize Web Vitals monitoring
  public init(): void {
    if (typeof window === 'undefined') return;

    // Check sampling rate
    if (Math.random() > this.config.sampleRate) return;

    // Register Web Vitals handlers
    onCLS(this.handleMetric.bind(this));
    onFCP(this.handleMetric.bind(this));
    onFID(this.handleMetric.bind(this));
    onINP(this.handleMetric.bind(this));
    onLCP(this.handleMetric.bind(this));
    onTTFB(this.handleMetric.bind(this));

    // Report on page unload
    if ('sendBeacon' in navigator) {
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.flush();
        }
      });
    }

    // Periodic reporting
    setInterval(() => this.flush(), 30000); // Every 30 seconds
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Handle individual metric updates
  private handleMetric(metric: Metric): void {
    this.metrics.set(metric.name, metric);
    this.reportQueue.push(metric);

    // Check threshold violations
    const threshold = this.config.thresholds[metric.name as keyof typeof DEFAULT_THRESHOLDS];
    if (threshold && metric.value > threshold) {
      this.logWarning(metric);
    }

    if (this.config.debug) {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value,
        metric.rating || this.getRating(metric));
    }

    // Report immediately if queue is large
    if (this.reportQueue.length >= 10) {
      this.flush();
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Calculate metric rating
  private getRating(metric: Metric): 'good' | 'needs-improvement' | 'poor' {
    const { name, value } = metric;
    const threshold = this.config.thresholds[name as keyof typeof DEFAULT_THRESHOLDS];

    if (!threshold) return 'good';

    // Good, Needs Improvement, Poor thresholds
    const thresholds: Record<string, [number, number]> = {
      CLS: [0.1, 0.25],
      FCP: [1800, 3000],
      FID: [100, 300],
      INP: [200, 500],
      LCP: [2500, 4000],
      TTFB: [800, 1800],
    };

    const [good, poor] = thresholds[name] || [threshold, threshold * 2];

    if (value <= good) return 'good';
    if (value <= poor) return 'needs-improvement';
    return 'poor';
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Log performance warnings
  private logWarning(metric: Metric): void {
    const rating = this.getRating(metric);
    console.warn(
      `[Web Vitals Warning] ${metric.name} is ${rating}: ${metric.value.toFixed(2)}`,
      `(threshold: ${this.config.thresholds[metric.name as keyof typeof DEFAULT_THRESHOLDS]})`
    );
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Send metrics to monitoring endpoint
  private async flush(): Promise<void> {
    if (this.isReporting || this.reportQueue.length === 0) return;

    this.isReporting = true;
    const batch = [...this.reportQueue];
    this.reportQueue = [];

    try {
      const payload = {
        metrics: batch.map(metric => ({
          name: metric.name,
          value: metric.value,
          rating: metric.rating || this.getRating(metric),
          delta: metric.delta,
          id: metric.id,
          navigationType: metric.navigationType,
          timestamp: Date.now(),
        })),
        page: {
          url: window.location.href,
          pathname: window.location.pathname,
          referrer: document.referrer,
        },
        device: {
          userAgent: navigator.userAgent,
          connection: (navigator as any).connection?.effectiveType,
          deviceMemory: (navigator as any).deviceMemory,
          hardwareConcurrency: navigator.hardwareConcurrency,
        },
      };

      // Use sendBeacon for reliability
      if ('sendBeacon' in navigator && document.visibilityState === 'hidden') {
        navigator.sendBeacon(this.config.endpoint, JSON.stringify(payload));
      } else {
        await fetch(this.config.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('[Web Vitals] Failed to report metrics:', error);
      }
    } finally {
      this.isReporting = false;
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Get current metrics snapshot
  public getMetrics(): Record<string, Metric> {
    return Object.fromEntries(this.metrics);
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Get performance score
  public getScore(): number {
    const weights = {
      CLS: 0.15,
      FCP: 0.10,
      FID: 0.10,
      INP: 0.15,
      LCP: 0.25,
      TTFB: 0.25,
    };

    let totalScore = 0;
    let totalWeight = 0;

    for (const [name, weight] of Object.entries(weights)) {
      const metric = this.metrics.get(name);
      if (metric) {
        const rating = this.getRating(metric);
        const score = rating === 'good' ? 100 : rating === 'needs-improvement' ? 50 : 0;
        totalScore += score * weight;
        totalWeight += weight;
      }
    }

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Export singleton instance
export const webVitalsMonitor = new WebVitalsMonitor({
  debug: process.env.NODE_ENV === 'development',
  sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% sampling in production
});

// CONTEXT7 SOURCE: /vercel/next.js - Convenience export for Next.js integration
export function reportWebVitals(metric: Metric): void {
  webVitalsMonitor['handleMetric'](metric);
}

export default webVitalsMonitor;