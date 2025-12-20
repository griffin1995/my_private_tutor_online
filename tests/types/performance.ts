/**
 * Performance Testing Types - Web Vitals Integration
 *
 * Type definitions for Core Web Vitals and performance monitoring
 */

// Core Web Vitals metrics from web-vitals package
export interface WebVitalsMetrics {
  /** Largest Contentful Paint - measures loading performance */
  lcp: number | null;

  /** Interaction to Next Paint - measures interactivity */
  inp: number | null;

  /** Cumulative Layout Shift - measures visual stability */
  cls: number | null;

  /** First Contentful Paint - measures perceived loading speed */
  fcp: number | null;

  /** Time to First Byte - measures server responsiveness */
  ttfb: number | null;
}

// Performance thresholds based on Google's Core Web Vitals
export interface PerformanceThresholds {
  lcp: { good: number; needsImprovement: number; poor: number };
  inp: { good: number; needsImprovement: number; poor: number };
  cls: { good: number; needsImprovement: number; poor: number };
  fcp: { good: number; needsImprovement: number; poor: number };
  ttfb: { good: number; needsImprovement: number; poor: number };
}

// Default performance thresholds (in milliseconds, except CLS which is unitless)
export const DEFAULT_PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
  lcp: { good: 2500, needsImprovement: 4000, poor: 4000 },
  inp: { good: 200, needsImprovement: 500, poor: 500 },
  cls: { good: 0.1, needsImprovement: 0.25, poor: 0.25 },
  fcp: { good: 1800, needsImprovement: 3000, poor: 3000 },
  ttfb: { good: 800, needsImprovement: 1800, poor: 1800 }
};

// Asset performance metrics
export interface AssetTiming {
  url: string;
  resourceType: string;
  duration: number;
  size?: number;
  status: number;
}

// Page-specific performance data
export interface PagePerformanceMetrics {
  url: string;
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  interactionToNextPaint?: number;
  timeToFirstByte?: number;
  assetsCount: number;
  webVitals: Partial<WebVitalsMetrics>;
}

// Performance budget configuration
export interface PerformanceBudget {
  maxPageLoadTime: number;
  maxAssetLoadTime: number;
  maxImageSize: number;
  maxJavaScriptSize: number;
  maxCSSSize: number;
  maxFontSize: number;
}

// Default performance budget
export const DEFAULT_PERFORMANCE_BUDGET: PerformanceBudget = {
  maxPageLoadTime: 3000,     // 3 seconds
  maxAssetLoadTime: 2000,    // 2 seconds
  maxImageSize: 1024 * 1024, // 1MB
  maxJavaScriptSize: 512 * 1024, // 512KB
  maxCSSSize: 256 * 1024,    // 256KB
  maxFontSize: 100 * 1024    // 100KB
};

// Performance test result
export interface PerformanceTestResult {
  timestamp: string;
  baseUrl: string;
  summary: {
    slowAssets: number;
    failedAssets: number;
    pagesChecked: number;
    avgLoadTime: number;
    totalIssues: number;
    passedThresholds: number;
    failedThresholds: number;
  };
  metrics: {
    slowAssets: AssetTiming[];
    failedAssets: AssetTiming[];
    pageMetrics: PagePerformanceMetrics[];
  };
  budget: PerformanceBudget;
  thresholds: PerformanceThresholds;
}

// Web Vitals rating
export type WebVitalsRating = 'good' | 'needs-improvement' | 'poor';

// Helper function to get rating for a metric
export function getMetricRating(
  metricName: keyof PerformanceThresholds,
  value: number,
  thresholds: PerformanceThresholds = DEFAULT_PERFORMANCE_THRESHOLDS
): WebVitalsRating {
  const threshold = thresholds[metricName];

  if (value <= threshold.good) {
    return 'good';
  } else if (value <= threshold.needsImprovement) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
}

// Web Vitals metric data structure (matches web-vitals package)
export interface WebVitalsMetric {
  name: 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';
  value: number;
  rating: WebVitalsRating;
  delta: number;
  id: string;
  entries: PerformanceEntry[];
  navigationType: 'navigate' | 'reload' | 'back-forward' | 'back-forward-cache' | 'prerender' | 'restore';
}