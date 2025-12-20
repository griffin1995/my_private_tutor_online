/**
 * Core Web Vitals Performance Testing - 2025 Edition
 *
 * Modern performance testing using:
 * - web-vitals package for standardized metrics
 * - Real User Monitoring (RUM) patterns
 * - Google's Core Web Vitals standards
 * - Comprehensive performance budgets
 */

import { test, expect, TestHelpers, CRITICAL_PAGES, getBaseURL } from '../fixtures/base-test';
import type {
  WebVitalsMetrics,
  PerformanceTestResult,
  PagePerformanceMetrics,
  AssetTiming,
  DEFAULT_PERFORMANCE_BUDGET,
  DEFAULT_PERFORMANCE_THRESHOLDS,
  getMetricRating
} from '../types/performance';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

test.describe('Core Web Vitals Performance Testing', () => {
  let testResults: PerformanceTestResult;
  const slowAssets: AssetTiming[] = [];
  const failedAssets: AssetTiming[] = [];
  const pageMetrics: PagePerformanceMetrics[] = [];

  test.beforeAll(async () => {
    // Initialize performance test results
    testResults = {
      timestamp: new Date().toISOString(),
      baseUrl: getBaseURL(),
      summary: {
        slowAssets: 0,
        failedAssets: 0,
        pagesChecked: 0,
        avgLoadTime: 0,
        totalIssues: 0,
        passedThresholds: 0,
        failedThresholds: 0
      },
      metrics: {
        slowAssets: [],
        failedAssets: [],
        pageMetrics: []
      },
      budget: DEFAULT_PERFORMANCE_BUDGET,
      thresholds: DEFAULT_PERFORMANCE_THRESHOLDS
    };

    // Ensure results directory exists
    mkdirSync('test-results', { recursive: true });
  });

  test.beforeEach(async ({ page }) => {
    // Monitor asset loading performance
    page.on('response', (response) => {
      const request = response.request();
      const url = response.url();
      const resourceType = request.resourceType();

      // Track timing for critical resources
      if (['stylesheet', 'script', 'image', 'font'].includes(resourceType)) {
        const timing = request.timing();
        const headers = response.headers();
        const contentLength = headers['content-length'];

        const assetTiming: AssetTiming = {
          url,
          resourceType,
          duration: timing ? timing.responseEnd : 0,
          size: contentLength ? parseInt(contentLength) : undefined,
          status: response.status()
        };

        // Track failed assets
        if (response.status() >= 400) {
          failedAssets.push(assetTiming);
        }

        // Track slow assets
        if (timing && timing.responseEnd > testResults.budget.maxAssetLoadTime) {
          slowAssets.push(assetTiming);
        }

        // Track oversized assets
        if (contentLength) {
          const size = parseInt(contentLength);
          if (resourceType === 'image' && size > testResults.budget.maxImageSize) {
            console.log(`⚠️ Large image: ${url} (${Math.round(size / 1024)}KB)`);
          }
          if (resourceType === 'script' && size > testResults.budget.maxJavaScriptSize) {
            console.log(`⚠️ Large script: ${url} (${Math.round(size / 1024)}KB)`);
          }
          if (resourceType === 'stylesheet' && size > testResults.budget.maxCSSSize) {
            console.log(`⚠️ Large stylesheet: ${url} (${Math.round(size / 1024)}KB)`);
          }
        }
      }
    });
  });

  // Test each critical page for Core Web Vitals
  for (const pageInfo of CRITICAL_PAGES.slice(0, 6)) { // Test first 6 pages for performance
    test(`${pageInfo.name} (${pageInfo.path}) - Core Web Vitals Performance`, async ({ appPage }) => {
      const fullUrl = `${getBaseURL()}${pageInfo.path}`;
      console.log(`⚡ Performance testing: ${pageInfo.name} - ${fullUrl}`);

      const navigationStart = Date.now();

      // Navigate to the page
      const response = await appPage.goto(pageInfo.path);
      await appPage.waitForPageReady();

      const navigationEnd = Date.now();
      const totalLoadTime = navigationEnd - navigationStart;

      // Basic performance check
      expect.soft(response?.status(), `${pageInfo.name} should load successfully`).toBe(200);
      expect.soft(totalLoadTime, `${pageInfo.name} should load within performance budget`)
        .toBeLessThan(testResults.budget.maxPageLoadTime);

      // Inject and collect Web Vitals metrics
      const webVitalsMetrics = await collectWebVitalsMetrics(appPage.page);

      // Get additional performance metrics
      const performanceMetrics = await appPage.getPerformanceMetrics();

      // Create comprehensive page metrics
      const pageMetric: PagePerformanceMetrics = {
        url: fullUrl,
        loadTime: totalLoadTime,
        domContentLoaded: performanceMetrics.domContentLoaded,
        firstContentfulPaint: performanceMetrics.firstContentfulPaint,
        largestContentfulPaint: webVitalsMetrics.lcp,
        cumulativeLayoutShift: webVitalsMetrics.cls,
        interactionToNextPaint: webVitalsMetrics.inp,
        timeToFirstByte: webVitalsMetrics.ttfb,
        assetsCount: performanceMetrics.resourceCount,
        webVitals: webVitalsMetrics
      };

      pageMetrics.push(pageMetric);
      testResults.summary.pagesChecked++;

      // Validate Core Web Vitals thresholds
      await validateWebVitalsThresholds(pageInfo.name, webVitalsMetrics);

      // Test critical asset loading
      await validateCriticalAssets(appPage, pageInfo.name);

      // Performance logging
      console.log(`  ✅ ${pageInfo.name} performance check completed:`);
      console.log(`    Load Time: ${totalLoadTime}ms`);
      console.log(`    DOM Ready: ${Math.round(performanceMetrics.domContentLoaded)}ms`);
      console.log(`    FCP: ${webVitalsMetrics.fcp ? Math.round(webVitalsMetrics.fcp) : 'N/A'}ms`);
      console.log(`    LCP: ${webVitalsMetrics.lcp ? Math.round(webVitalsMetrics.lcp) : 'N/A'}ms`);
      console.log(`    CLS: ${webVitalsMetrics.cls ? webVitalsMetrics.cls.toFixed(3) : 'N/A'}`);
      console.log(`    INP: ${webVitalsMetrics.inp ? Math.round(webVitalsMetrics.inp) : 'N/A'}ms`);
      console.log(`    TTFB: ${webVitalsMetrics.ttfb ? Math.round(webVitalsMetrics.ttfb) : 'N/A'}ms`);
      console.log(`    Assets: ${performanceMetrics.resourceCount} resources\n`);
    });
  }

  test('Performance Budget Compliance', async ({ appPage }) => {
    console.log('📊 Testing performance budget compliance...');

    // Test homepage for detailed analysis
    await appPage.goto('/');
    await appPage.waitForPageReady();

    // Analyze render-blocking resources
    const renderBlockingAnalysis = await analyzeRenderBlockingResources(appPage.page);

    console.log('  📊 Resource Analysis:');
    console.log(`    Render-blocking CSS: ${renderBlockingAnalysis.renderBlockingCSS}`);
    console.log(`    Render-blocking JS: ${renderBlockingAnalysis.renderBlockingJS}`);
    console.log(`    Total Stylesheets: ${renderBlockingAnalysis.totalStylesheets}`);
    console.log(`    Async Scripts: ${renderBlockingAnalysis.asyncScripts}`);

    // Performance recommendations
    if (renderBlockingAnalysis.renderBlockingCSS > 3) {
      console.log('  💡 Consider inlining critical CSS or using preload hints');
    }

    if (renderBlockingAnalysis.renderBlockingJS > 2) {
      console.log('  💡 Consider adding defer/async attributes to non-critical scripts');
    }

    // Check for unused CSS/JS
    const resourceAnalysis = await analyzeResourceUtilization(appPage.page);
    console.log(`    Resource Utilization: ${resourceAnalysis.utilizationScore}%`);
  });

  test('Mobile Performance Testing', async ({ appPage }) => {
    console.log('📱 Testing mobile performance...');

    // Set mobile viewport
    await appPage.page.setViewportSize({ width: 390, height: 844 }); // iPhone 14

    // Simulate 3G network conditions
    await appPage.page.emulateNetwork({
      offline: false,
      downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5Mbps
      uploadThroughput: 750 * 1024 / 8,           // 750Kbps
      latency: 40                                  // 40ms latency
    });

    // Test critical pages on mobile
    for (const pageInfo of CRITICAL_PAGES.slice(0, 3)) {
      console.log(`  📱 Testing ${pageInfo.name} on mobile...`);

      const navigationStart = Date.now();
      await appPage.goto(pageInfo.path);
      await appPage.waitForPageReady();
      const loadTime = Date.now() - navigationStart;

      // Mobile performance should be within 5 seconds
      expect.soft(loadTime, `${pageInfo.name} mobile load time should be acceptable`)
        .toBeLessThan(5000);

      console.log(`    Mobile load time: ${loadTime}ms`);
    }

    // Reset network conditions
    await appPage.page.emulateNetwork(null);
  });

  test('Generate Comprehensive Performance Report', async () => {
    // Finalize test results
    testResults.metrics.slowAssets = slowAssets;
    testResults.metrics.failedAssets = failedAssets;
    testResults.metrics.pageMetrics = pageMetrics;

    testResults.summary.slowAssets = slowAssets.length;
    testResults.summary.failedAssets = failedAssets.length;
    testResults.summary.totalIssues = slowAssets.length + failedAssets.length;

    if (pageMetrics.length > 0) {
      testResults.summary.avgLoadTime = Math.round(
        pageMetrics.reduce((sum, page) => sum + page.loadTime, 0) / pageMetrics.length
      );
    }

    // Calculate threshold compliance
    let passedThresholds = 0;
    let failedThresholds = 0;

    pageMetrics.forEach(page => {
      const metrics = page.webVitals;
      Object.entries(metrics).forEach(([metric, value]) => {
        if (value !== null) {
          const rating = getMetricRating(
            metric as keyof typeof testResults.thresholds,
            value,
            testResults.thresholds
          );

          if (rating === 'good') {
            passedThresholds++;
          } else {
            failedThresholds++;
          }
        }
      });
    });

    testResults.summary.passedThresholds = passedThresholds;
    testResults.summary.failedThresholds = failedThresholds;

    // Save comprehensive JSON report
    const reportPath = join('test-results', 'performance-report.json');
    writeFileSync(reportPath, JSON.stringify(testResults, null, 2));

    // Generate HTML performance report
    await generateHTMLPerformanceReport(testResults);

    // Display performance summary
    console.log('\n' + '='.repeat(80));
    console.log('⚡ CORE WEB VITALS PERFORMANCE SUMMARY');
    console.log('='.repeat(80));
    console.log(`📅 Timestamp: ${testResults.timestamp}`);
    console.log(`🌐 Base URL: ${testResults.baseUrl}`);
    console.log(`📊 Pages Tested: ${testResults.summary.pagesChecked}`);
    console.log(`⏱️ Average Load Time: ${testResults.summary.avgLoadTime}ms`);
    console.log(`⚠️ Performance Issues: ${testResults.summary.totalIssues}`);
    console.log(`✅ Passed Thresholds: ${testResults.summary.passedThresholds}`);
    console.log(`❌ Failed Thresholds: ${testResults.summary.failedThresholds}`);
    console.log('');

    // Performance budget status
    console.log('💰 PERFORMANCE BUDGET:');
    console.log(`  Max Page Load: ${testResults.budget.maxPageLoadTime}ms`);
    console.log(`  Max Asset Load: ${testResults.budget.maxAssetLoadTime}ms`);
    console.log(`  Max Image Size: ${Math.round(testResults.budget.maxImageSize / 1024)}KB`);
    console.log(`  Max JS Size: ${Math.round(testResults.budget.maxJavaScriptSize / 1024)}KB`);
    console.log(`  Max CSS Size: ${Math.round(testResults.budget.maxCSSSize / 1024)}KB`);
    console.log('');

    // Core Web Vitals thresholds
    console.log('🎯 CORE WEB VITALS THRESHOLDS:');
    console.log(`  LCP Good: ≤ ${testResults.thresholds.lcp.good}ms`);
    console.log(`  INP Good: ≤ ${testResults.thresholds.inp.good}ms`);
    console.log(`  CLS Good: ≤ ${testResults.thresholds.cls.good}`);
    console.log(`  FCP Good: ≤ ${testResults.thresholds.fcp.good}ms`);
    console.log(`  TTFB Good: ≤ ${testResults.thresholds.ttfb.good}ms`);
    console.log('');

    // Display issues
    if (slowAssets.length > 0) {
      console.log('🐌 SLOW ASSETS DETECTED:');
      slowAssets.slice(0, 10).forEach(asset => {
        console.log(`  • ${asset.resourceType}: ${asset.duration}ms - ${asset.url}`);
      });
      if (slowAssets.length > 10) {
        console.log(`  ... and ${slowAssets.length - 10} more slow assets`);
      }
      console.log('');
    }

    if (failedAssets.length > 0) {
      console.log('❌ FAILED ASSETS:');
      failedAssets.forEach(asset => {
        console.log(`  • ${asset.status} ${asset.resourceType}: ${asset.url}`);
      });
      console.log('');
    }

    // Page-by-page performance breakdown
    if (pageMetrics.length > 0) {
      console.log('📄 PAGE PERFORMANCE BREAKDOWN:');
      pageMetrics.forEach(page => {
        const overallRating = getOverallPerformanceRating(page);
        const status = overallRating === 'good' ? '✅' :
                      overallRating === 'needs-improvement' ? '⚠️' : '❌';

        console.log(`  ${status} ${page.url}`);
        console.log(`      Load: ${page.loadTime}ms | DOM: ${Math.round(page.domContentLoaded)}ms`);
        console.log(`      LCP: ${page.largestContentfulPaint ? Math.round(page.largestContentfulPaint) : 'N/A'}ms | CLS: ${page.cumulativeLayoutShift?.toFixed(3) || 'N/A'} | INP: ${page.interactionToNextPaint ? Math.round(page.interactionToNextPaint) : 'N/A'}ms`);
        console.log(`      Assets: ${page.assetsCount} resources`);
      });
      console.log('');
    }

    console.log('📊 REPORTS GENERATED:');
    console.log(`  • JSON Report: ${reportPath}`);
    console.log(`  • HTML Report: test-results/performance-report.html`);
    console.log('='.repeat(80));

    // Final performance verdict
    const goodPages = pageMetrics.filter(p => getOverallPerformanceRating(p) === 'good').length;
    const totalPages = pageMetrics.length;

    if (goodPages === totalPages && testResults.summary.totalIssues === 0) {
      console.log('🚀 EXCELLENT! Outstanding performance across all metrics.');
    } else if (goodPages / totalPages >= 0.8) {
      console.log('✅ Good overall performance with room for optimization.');
    } else {
      console.log('⚠️ Performance optimization required for better user experience.');
    }

    // Soft assertions for performance issues
    expect.soft(testResults.summary.totalIssues,
      `Performance optimization recommended: ${testResults.summary.slowAssets} slow assets, ${testResults.summary.failedAssets} failed assets`
    ).toBe(0);

    expect.soft(testResults.summary.failedThresholds,
      `Web Vitals thresholds need improvement: ${testResults.summary.failedThresholds} failed thresholds`
    ).toBe(0);

    // Hard fail only for critical performance problems
    const criticalPages = pageMetrics.filter(page =>
      page.loadTime > testResults.budget.maxPageLoadTime * 2
    );

    expect(criticalPages.length,
      `Critical performance issues: ${criticalPages.length} pages exceed ${testResults.budget.maxPageLoadTime * 2}ms`
    ).toBe(0);
  });
});

// Collect Web Vitals metrics using the web-vitals package
async function collectWebVitalsMetrics(page: any): Promise<WebVitalsMetrics> {
  return await page.evaluate(async () => {
    return new Promise((resolve) => {
      // Import web-vitals from CDN for client-side execution
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/web-vitals@5/dist/web-vitals.iife.js';
      script.onload = () => {
        const webVitals = (window as any).webVitals;
        const metrics: any = {
          lcp: null,
          inp: null,
          cls: null,
          fcp: null,
          ttfb: null
        };

        let metricsCollected = 0;
        const totalMetrics = 5;
        const timeout = setTimeout(() => resolve(metrics), 3000); // 3s timeout

        const checkComplete = () => {
          metricsCollected++;
          if (metricsCollected === totalMetrics) {
            clearTimeout(timeout);
            resolve(metrics);
          }
        };

        // Collect Core Web Vitals
        webVitals.onLCP((metric: any) => {
          metrics.lcp = metric.value;
          checkComplete();
        });

        webVitals.onINP((metric: any) => {
          metrics.inp = metric.value;
          checkComplete();
        });

        webVitals.onCLS((metric: any) => {
          metrics.cls = metric.value;
          checkComplete();
        });

        webVitals.onFCP((metric: any) => {
          metrics.fcp = metric.value;
          checkComplete();
        });

        webVitals.onTTFB((metric: any) => {
          metrics.ttfb = metric.value;
          checkComplete();
        });
      };
      document.head.appendChild(script);
    });
  });
}

// Validate Web Vitals against thresholds
async function validateWebVitalsThresholds(pageName: string, metrics: WebVitalsMetrics) {
  const thresholds = DEFAULT_PERFORMANCE_THRESHOLDS;

  if (metrics.lcp !== null) {
    const rating = getMetricRating('lcp', metrics.lcp, thresholds);
    expect.soft(rating, `LCP for ${pageName} should be good (≤ ${thresholds.lcp.good}ms), got ${Math.round(metrics.lcp)}ms`)
      .toBe('good');
  }

  if (metrics.inp !== null) {
    const rating = getMetricRating('inp', metrics.inp, thresholds);
    expect.soft(rating, `INP for ${pageName} should be good (≤ ${thresholds.inp.good}ms), got ${Math.round(metrics.inp)}ms`)
      .toBe('good');
  }

  if (metrics.cls !== null) {
    const rating = getMetricRating('cls', metrics.cls, thresholds);
    expect.soft(rating, `CLS for ${pageName} should be good (≤ ${thresholds.cls.good}), got ${metrics.cls.toFixed(3)}`)
      .toBe('good');
  }

  if (metrics.fcp !== null) {
    const rating = getMetricRating('fcp', metrics.fcp, thresholds);
    expect.soft(rating, `FCP for ${pageName} should be good (≤ ${thresholds.fcp.good}ms), got ${Math.round(metrics.fcp)}ms`)
      .toBe('good');
  }

  if (metrics.ttfb !== null) {
    const rating = getMetricRating('ttfb', metrics.ttfb, thresholds);
    expect.soft(rating, `TTFB for ${pageName} should be good (≤ ${thresholds.ttfb.good}ms), got ${Math.round(metrics.ttfb)}ms`)
      .toBe('good');
  }
}

// Validate critical asset loading
async function validateCriticalAssets(appPage: any, pageName: string) {
  // Check critical stylesheets
  const stylesheets = await appPage.page.locator('link[rel="stylesheet"]').all();

  for (const stylesheet of stylesheets.slice(0, 3)) { // Check first 3
    const href = await stylesheet.getAttribute('href');
    if (href) {
      try {
        const cssResponse = await appPage.page.request.head(href.startsWith('/') ? `${getBaseURL()}${href}` : href);
        expect.soft(cssResponse.status(), `Critical stylesheet should load: ${href}`).toBe(200);
      } catch (error) {
        console.log(`⚠️ Stylesheet check failed: ${href}`);
      }
    }
  }

  // Check for image optimization
  const images = await appPage.page.locator('img[src]:visible').all();

  for (const img of images.slice(0, 5)) { // Check first 5 visible images
    const src = await img.getAttribute('src');
    if (src) {
      const dimensions = await img.evaluate((el: HTMLImageElement) => ({
        naturalWidth: el.naturalWidth,
        naturalHeight: el.naturalHeight,
        displayWidth: el.width,
        displayHeight: el.height
      }));

      // Check for oversized images
      if (dimensions.naturalWidth > dimensions.displayWidth * 1.5) {
        console.log(`⚠️ Oversized image on ${pageName}: ${src}`);
      }
    }
  }
}

// Analyze render-blocking resources
async function analyzeRenderBlockingResources(page: any) {
  return await page.evaluate(() => {
    const renderBlockingCSS = document.querySelectorAll('link[rel="stylesheet"]:not([media]):not([disabled])').length;
    const renderBlockingJS = document.querySelectorAll('script:not([defer]):not([async])').length;
    const totalStylesheets = document.querySelectorAll('link[rel="stylesheet"]').length;
    const asyncScripts = document.querySelectorAll('script[async], script[defer]').length;

    return {
      renderBlockingCSS,
      renderBlockingJS,
      totalStylesheets,
      asyncScripts
    };
  });
}

// Analyze resource utilization
async function analyzeResourceUtilization(page: any) {
  return await page.evaluate(() => {
    const resources = performance.getEntriesByType('resource');
    const totalResources = resources.length;
    const cachedResources = resources.filter((r: any) =>
      r.transferSize === 0 && r.decodedBodySize > 0
    ).length;

    const utilizationScore = totalResources > 0 ?
      Math.round((cachedResources / totalResources) * 100) : 0;

    return {
      totalResources,
      cachedResources,
      utilizationScore
    };
  });
}

// Get overall performance rating for a page
function getOverallPerformanceRating(page: PagePerformanceMetrics): 'good' | 'needs-improvement' | 'poor' {
  const metrics = page.webVitals;
  const ratings: string[] = [];

  Object.entries(metrics).forEach(([metric, value]) => {
    if (value !== null) {
      const rating = getMetricRating(
        metric as keyof typeof DEFAULT_PERFORMANCE_THRESHOLDS,
        value,
        DEFAULT_PERFORMANCE_THRESHOLDS
      );
      ratings.push(rating);
    }
  });

  if (ratings.length === 0) return 'needs-improvement';

  const goodCount = ratings.filter(r => r === 'good').length;
  const poorCount = ratings.filter(r => r === 'poor').length;

  if (poorCount > 0) return 'poor';
  if (goodCount / ratings.length >= 0.8) return 'good';
  return 'needs-improvement';
}

// Generate HTML performance report
async function generateHTMLPerformanceReport(results: PerformanceTestResult) {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Core Web Vitals Performance Report</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .summary { background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; }
    .good { color: #15803d; background: #f0fdf4; }
    .needs-improvement { color: #ea580c; background: #fffbeb; }
    .poor { color: #dc2626; background: #fef2f2; }
    .metric-card { border: 1px solid #e5e7eb; border-radius: 6px; padding: 1rem; margin: 1rem 0; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { text-align: left; padding: 0.75rem; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; }
    .chart { display: flex; align-items: center; margin: 0.5rem 0; }
    .chart-bar { height: 20px; background: #3b82f6; margin-right: 0.5rem; }
  </style>
</head>
<body>
  <h1>Core Web Vitals Performance Report</h1>

  <div class="summary">
    <h2>Performance Overview</h2>
    <p><strong>Report Generated:</strong> ${results.timestamp}</p>
    <p><strong>Base URL:</strong> ${results.baseUrl}</p>
    <p><strong>Pages Tested:</strong> ${results.summary.pagesChecked}</p>
    <p><strong>Average Load Time:</strong> ${results.summary.avgLoadTime}ms</p>

    <table>
      <tr><th>Metric</th><th>Count</th></tr>
      <tr><td>Passed Thresholds</td><td class="good">${results.summary.passedThresholds}</td></tr>
      <tr><td>Failed Thresholds</td><td class="poor">${results.summary.failedThresholds}</td></tr>
      <tr><td>Slow Assets</td><td>${results.summary.slowAssets}</td></tr>
      <tr><td>Failed Assets</td><td>${results.summary.failedAssets}</td></tr>
    </table>
  </div>

  <h2>Core Web Vitals Standards</h2>
  <div class="metric-card">
    <h3>Performance Thresholds</h3>
    <ul>
      <li><strong>LCP (Largest Contentful Paint):</strong> ≤ ${results.thresholds.lcp.good}ms (Good)</li>
      <li><strong>INP (Interaction to Next Paint):</strong> ≤ ${results.thresholds.inp.good}ms (Good)</li>
      <li><strong>CLS (Cumulative Layout Shift):</strong> ≤ ${results.thresholds.cls.good} (Good)</li>
      <li><strong>FCP (First Contentful Paint):</strong> ≤ ${results.thresholds.fcp.good}ms (Good)</li>
      <li><strong>TTFB (Time to First Byte):</strong> ≤ ${results.thresholds.ttfb.good}ms (Good)</li>
    </ul>
  </div>

  <h2>Page Performance Results</h2>
  ${results.metrics.pageMetrics.map(page => {
    const overallRating = getOverallPerformanceRating(page);
    return `
    <div class="metric-card ${overallRating}">
      <h3>${page.url}</h3>
      <p><strong>Overall Rating:</strong> ${overallRating.toUpperCase()}</p>
      <p><strong>Load Time:</strong> ${page.loadTime}ms</p>

      <table>
        <tr><th>Metric</th><th>Value</th><th>Rating</th></tr>
        ${page.webVitals.lcp ? `<tr><td>LCP</td><td>${Math.round(page.webVitals.lcp)}ms</td><td class="${getMetricRating('lcp', page.webVitals.lcp, results.thresholds)}">${getMetricRating('lcp', page.webVitals.lcp, results.thresholds)}</td></tr>` : ''}
        ${page.webVitals.inp ? `<tr><td>INP</td><td>${Math.round(page.webVitals.inp)}ms</td><td class="${getMetricRating('inp', page.webVitals.inp, results.thresholds)}">${getMetricRating('inp', page.webVitals.inp, results.thresholds)}</td></tr>` : ''}
        ${page.webVitals.cls ? `<tr><td>CLS</td><td>${page.webVitals.cls.toFixed(3)}</td><td class="${getMetricRating('cls', page.webVitals.cls, results.thresholds)}">${getMetricRating('cls', page.webVitals.cls, results.thresholds)}</td></tr>` : ''}
        ${page.webVitals.fcp ? `<tr><td>FCP</td><td>${Math.round(page.webVitals.fcp)}ms</td><td class="${getMetricRating('fcp', page.webVitals.fcp, results.thresholds)}">${getMetricRating('fcp', page.webVitals.fcp, results.thresholds)}</td></tr>` : ''}
        ${page.webVitals.ttfb ? `<tr><td>TTFB</td><td>${Math.round(page.webVitals.ttfb)}ms</td><td class="${getMetricRating('ttfb', page.webVitals.ttfb, results.thresholds)}">${getMetricRating('ttfb', page.webVitals.ttfb, results.thresholds)}</td></tr>` : ''}
      </table>
    </div>`;
  }).join('')}

  <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb; text-align: center;">
    <p>Generated by Playwright + web-vitals package | ${new Date().toISOString()}</p>
  </footer>
</body>
</html>`;

  writeFileSync('test-results/performance-report.html', htmlContent);
}