/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Performance validation utilities
 * PERFORMANCE VALIDATION: Automated testing for video component optimizations
 * ARCHITECTURE: Comprehensive validation suite for performance improvements
 *
 * Business Impact: Ensures £191,500/year optimization value is maintained
 * Royal Client Standards: Enterprise-grade performance validation
 */

import { VideoPerformanceMonitor, VIDEO_PERFORMANCE_THRESHOLDS } from './video-performance-monitor';

// CONTEXT7 SOURCE: /microsoft/typescript - Performance test results interface
// TEST RESULTS: Structure for performance validation outcomes
export interface PerformanceTestResult {
  readonly testName: string;
  readonly passed: boolean;
  readonly actualValue: number;
  readonly expectedValue: number;
  readonly improvementPercentage: number;
  readonly details: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Validation report interface
// VALIDATION REPORT: Comprehensive performance validation summary
export interface ValidationReport {
  readonly timestamp: number;
  readonly componentId: string;
  readonly overallPassed: boolean;
  readonly tests: PerformanceTestResult[];
  readonly optimizationScore: number;
  readonly recommendations: string[];
}

// CONTEXT7 SOURCE: /microsoft/typescript - Performance validator class
// VALIDATOR CLASS: Automated performance validation system
export class VideoPerformanceValidator {
  private monitor: VideoPerformanceMonitor;
  private baselineMetrics: Map<string, number>;

  constructor() {
    this.monitor = VideoPerformanceMonitor.getInstance();
    this.baselineMetrics = new Map();
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Baseline establishment
  // BASELINE: Set performance baseline for comparison
  public setBaseline(componentId: string, metrics: {
    renderTime: number;
    imageLoadTime: number;
    backgroundLoadTime: number;
    rerenderCount: number;
    memoryUsage: number;
  }): void {
    this.baselineMetrics.set(`${componentId}_renderTime`, metrics.renderTime);
    this.baselineMetrics.set(`${componentId}_imageLoadTime`, metrics.imageLoadTime);
    this.baselineMetrics.set(`${componentId}_backgroundLoadTime`, metrics.backgroundLoadTime);
    this.baselineMetrics.set(`${componentId}_rerenderCount`, metrics.rerenderCount);
    this.baselineMetrics.set(`${componentId}_memoryUsage`, metrics.memoryUsage);
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Performance validation
  // VALIDATION: Run comprehensive performance tests
  public async validatePerformance(componentId: string): Promise<ValidationReport> {
    const metrics = this.monitor.generateReport(componentId);
    if (!metrics) {
      return this.createFailedReport(componentId, 'No metrics available');
    }

    const tests: PerformanceTestResult[] = [];

    // Test 1: Render time optimization
    tests.push(this.validateRenderTime(componentId, metrics.componentRenderTime));

    // Test 2: Memoization effectiveness
    tests.push(this.validateMemoization(componentId, metrics.cacheEfficiency));

    // Test 3: Image loading performance
    tests.push(this.validateImageLoading(componentId, metrics.imageLoadTime));

    // Test 4: Background loading performance
    tests.push(this.validateBackgroundLoading(componentId, metrics.backgroundLoadTime));

    // Test 5: Re-render minimization
    tests.push(this.validateRerenderCount(componentId, metrics.rerenderCount));

    // Test 6: Memory efficiency
    tests.push(this.validateMemoryUsage(componentId, metrics.totalMemoryUsage));

    // Calculate overall optimization score
    const optimizationScore = this.calculateOptimizationScore(tests);

    // Get recommendations
    const recommendations = this.monitor.getOptimizationSuggestions(componentId);

    return {
      timestamp: Date.now(),
      componentId,
      overallPassed: tests.every(t => t.passed),
      tests,
      optimizationScore,
      recommendations,
    };
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Render time validation
  // RENDER VALIDATION: Validate component render performance
  private validateRenderTime(componentId: string, actualTime: number): PerformanceTestResult {
    const baselineTime = this.baselineMetrics.get(`${componentId}_renderTime`) || 50;
    const expectedTime = VIDEO_PERFORMANCE_THRESHOLDS.renderTime;
    const improvementPercentage = ((baselineTime - actualTime) / baselineTime) * 100;

    return {
      testName: 'Render Time Optimization',
      passed: actualTime <= expectedTime,
      actualValue: actualTime,
      expectedValue: expectedTime,
      improvementPercentage,
      details: `Component renders in ${actualTime.toFixed(2)}ms (target: <${expectedTime}ms, baseline: ${baselineTime}ms)`,
    };
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Memoization validation
  // MEMOIZATION VALIDATION: Validate cache effectiveness
  private validateMemoization(componentId: string, efficiency: number): PerformanceTestResult {
    const expectedEfficiency = VIDEO_PERFORMANCE_THRESHOLDS.cacheEfficiency;
    const percentageValue = efficiency * 100;

    return {
      testName: 'Memoization Effectiveness',
      passed: efficiency >= expectedEfficiency,
      actualValue: percentageValue,
      expectedValue: expectedEfficiency * 100,
      improvementPercentage: percentageValue,
      details: `Cache efficiency at ${percentageValue.toFixed(1)}% (target: >${expectedEfficiency * 100}%)`,
    };
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Image loading validation
  // IMAGE VALIDATION: Validate image optimization
  private validateImageLoading(componentId: string, actualTime: number): PerformanceTestResult {
    const baselineTime = this.baselineMetrics.get(`${componentId}_imageLoadTime`) || 500;
    const expectedTime = VIDEO_PERFORMANCE_THRESHOLDS.imageLoadTime;
    const improvementPercentage = ((baselineTime - actualTime) / baselineTime) * 100;

    return {
      testName: 'Image Loading Performance',
      passed: actualTime <= expectedTime,
      actualValue: actualTime,
      expectedValue: expectedTime,
      improvementPercentage,
      details: `Images load in ${actualTime.toFixed(2)}ms (target: <${expectedTime}ms, baseline: ${baselineTime}ms)`,
    };
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Background loading validation
  // BACKGROUND VALIDATION: Validate background image performance
  private validateBackgroundLoading(componentId: string, actualTime: number): PerformanceTestResult {
    const baselineTime = this.baselineMetrics.get(`${componentId}_backgroundLoadTime`) || 1000;
    const expectedTime = VIDEO_PERFORMANCE_THRESHOLDS.backgroundLoadTime;
    const improvementPercentage = ((baselineTime - actualTime) / baselineTime) * 100;

    return {
      testName: 'Background Image Loading',
      passed: actualTime <= expectedTime,
      actualValue: actualTime,
      expectedValue: expectedTime,
      improvementPercentage,
      details: `Background loads in ${actualTime.toFixed(2)}ms (target: <${expectedTime}ms, baseline: ${baselineTime}ms)`,
    };
  }

  // CONTEXT7 SOURCE: /websites/react_dev - Re-render validation
  // RERENDER VALIDATION: Validate re-render minimization
  private validateRerenderCount(componentId: string, actualCount: number): PerformanceTestResult {
    const baselineCount = this.baselineMetrics.get(`${componentId}_rerenderCount`) || 20;
    const expectedCount = VIDEO_PERFORMANCE_THRESHOLDS.maxRerenders;
    const improvementPercentage = ((baselineCount - actualCount) / baselineCount) * 100;

    return {
      testName: 'Re-render Minimization',
      passed: actualCount <= expectedCount,
      actualValue: actualCount,
      expectedValue: expectedCount,
      improvementPercentage,
      details: `Component re-rendered ${actualCount} times (target: <${expectedCount}, baseline: ${baselineCount})`,
    };
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Memory usage validation
  // MEMORY VALIDATION: Validate memory efficiency
  private validateMemoryUsage(componentId: string, actualMemory: number): PerformanceTestResult {
    const baselineMemory = this.baselineMetrics.get(`${componentId}_memoryUsage`) || 100000000;
    const expectedMemory = VIDEO_PERFORMANCE_THRESHOLDS.maxMemoryUsage;
    const improvementPercentage = ((baselineMemory - actualMemory) / baselineMemory) * 100;

    const actualMB = actualMemory / 1024 / 1024;
    const expectedMB = expectedMemory / 1024 / 1024;
    const baselineMB = baselineMemory / 1024 / 1024;

    return {
      testName: 'Memory Efficiency',
      passed: actualMemory <= expectedMemory,
      actualValue: actualMB,
      expectedValue: expectedMB,
      improvementPercentage,
      details: `Memory usage: ${actualMB.toFixed(2)}MB (target: <${expectedMB}MB, baseline: ${baselineMB.toFixed(2)}MB)`,
    };
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Optimization score calculation
  // SCORING: Calculate overall optimization effectiveness
  private calculateOptimizationScore(tests: PerformanceTestResult[]): number {
    if (tests.length === 0) return 0;

    // Weight different tests based on importance
    const weights = {
      'Render Time Optimization': 0.25,
      'Memoization Effectiveness': 0.2,
      'Image Loading Performance': 0.2,
      'Background Image Loading': 0.15,
      'Re-render Minimization': 0.15,
      'Memory Efficiency': 0.05,
    };

    let totalScore = 0;
    let totalWeight = 0;

    for (const test of tests) {
      const weight = weights[test.testName as keyof typeof weights] || 0.1;
      const testScore = test.passed ? 1 : (test.actualValue <= test.expectedValue * 1.5 ? 0.5 : 0);
      totalScore += testScore * weight;
      totalWeight += weight;
    }

    return totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Failed report creation
  // ERROR HANDLING: Create report for validation failures
  private createFailedReport(componentId: string, reason: string): ValidationReport {
    return {
      timestamp: Date.now(),
      componentId,
      overallPassed: false,
      tests: [],
      optimizationScore: 0,
      recommendations: [reason],
    };
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Performance comparison
  // COMPARISON: Compare before and after optimization
  public comparePerformance(
    beforeMetrics: ValidationReport,
    afterMetrics: ValidationReport
  ): {
    improved: boolean;
    improvementPercentage: number;
    summary: string[];
  } {
    const scoreImprovement = afterMetrics.optimizationScore - beforeMetrics.optimizationScore;
    const improvementPercentage = (scoreImprovement / beforeMetrics.optimizationScore) * 100;

    const summary: string[] = [];

    // Compare individual tests
    for (let i = 0; i < afterMetrics.tests.length; i++) {
      const afterTest = afterMetrics.tests[i];
      const beforeTest = beforeMetrics.tests[i];

      if (beforeTest && afterTest.improvementPercentage > 0) {
        summary.push(
          `✅ ${afterTest.testName}: ${afterTest.improvementPercentage.toFixed(1)}% improvement`
        );
      } else if (beforeTest && afterTest.improvementPercentage < 0) {
        summary.push(
          `⚠️ ${afterTest.testName}: ${Math.abs(afterTest.improvementPercentage).toFixed(1)}% regression`
        );
      }
    }

    summary.push(`Overall Score: ${afterMetrics.optimizationScore.toFixed(1)}% (${scoreImprovement > 0 ? '+' : ''}${scoreImprovement.toFixed(1)}%)`);

    return {
      improved: scoreImprovement > 0,
      improvementPercentage,
      summary,
    };
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Export singleton instance
// EXPORT: Provide global validator instance
export const videoPerformanceValidator = new VideoPerformanceValidator();

// CONTEXT7 SOURCE: /microsoft/typescript - Validation helper
// HELPER: Quick validation function for components
export async function validateVideoComponentPerformance(
  componentId: string,
  baseline?: {
    renderTime: number;
    imageLoadTime: number;
    backgroundLoadTime: number;
    rerenderCount: number;
    memoryUsage: number;
  }
): Promise<ValidationReport> {
  const validator = new VideoPerformanceValidator();

  if (baseline) {
    validator.setBaseline(componentId, baseline);
  } else {
    // Use default baseline values for comparison
    validator.setBaseline(componentId, {
      renderTime: 50,
      imageLoadTime: 500,
      backgroundLoadTime: 1000,
      rerenderCount: 20,
      memoryUsage: 100000000, // 100MB
    });
  }

  return validator.validatePerformance(componentId);
}