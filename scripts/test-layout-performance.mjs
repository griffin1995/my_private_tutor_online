#!/usr/bin/env node

/**
 * CONTEXT7 SOURCE: /websites/web.dev - Layout Performance Testing Script
 * TESTING_REASON: Validate layout optimizations across different viewport sizes
 */

import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test configurations for different breakpoints
const BREAKPOINTS = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Wide', width: 1920, height: 1080 }
];

// Performance metrics thresholds
const THRESHOLDS = {
  layoutShift: 0.1,  // Good CLS threshold
  largestContentfulPaint: 2500,  // Good LCP threshold (ms)
  firstContentfulPaint: 1800,  // Good FCP threshold (ms)
  reflows: 10,  // Maximum acceptable reflows
  thrashingScore: 0.5  // Maximum acceptable thrashing score
};

async function testLayoutPerformance() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];

  for (const breakpoint of BREAKPOINTS) {
    console.log(`\n🔍 Testing ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})...`);

    const page = await browser.newPage();
    await page.setViewport({
      width: breakpoint.width,
      height: breakpoint.height
    });

    // Enable performance monitoring
    await page.evaluateOnNewDocument(() => {
      window.__LAYOUT_METRICS = {
        reflows: 0,
        repaints: 0,
        shifts: []
      };

      // Override certain methods to track reflows/repaints
      const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
      Element.prototype.getBoundingClientRect = function() {
        window.__LAYOUT_METRICS.reflows++;
        return originalGetBoundingClientRect.call(this);
      };

      // Track layout shifts
      if (window.PerformanceObserver) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              window.__LAYOUT_METRICS.shifts.push({
                value: entry.value,
                time: entry.startTime
              });
            }
          }
        });

        try {
          observer.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('Layout shift tracking not supported');
        }
      }
    });

    // Navigate to the homepage
    const startTime = Date.now();
    await page.goto('http://localhost:3000/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for hero section to be visible
    await page.waitForSelector('#hero-premium-tutoring-landing-combined', {
      visible: true,
      timeout: 10000
    });

    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const entries = performance.getEntriesByType('paint');
      const fcpEntry = entries.find(e => e.name === 'first-contentful-paint');

      const largestContentfulPaint = performance.getEntriesByType('largest-contentful-paint')[0];

      // Calculate cumulative layout shift
      const cumulativeLayoutShift = window.__LAYOUT_METRICS.shifts.reduce(
        (sum, shift) => sum + shift.value,
        0
      );

      // Check hero section dimensions
      const heroSection = document.getElementById('hero-premium-tutoring-landing-combined');
      const heroRect = heroSection?.getBoundingClientRect();

      // Check if content is cut off
      const viewportHeight = window.innerHeight;
      const heroHeight = heroRect?.height || 0;
      const heroTop = heroRect?.top || 0;
      const heroBottom = heroTop + heroHeight;

      // Check flexbox children
      const flexChildren = heroSection?.querySelectorAll('[class*="flex-"]') || [];
      const childrenHeights = Array.from(flexChildren).map(child => {
        const rect = child.getBoundingClientRect();
        return {
          height: rect.height,
          top: rect.top,
          bottom: rect.bottom,
          isVisible: rect.bottom <= viewportHeight
        };
      });

      return {
        firstContentfulPaint: fcpEntry?.startTime || 0,
        largestContentfulPaint: largestContentfulPaint?.startTime || 0,
        cumulativeLayoutShift,
        reflows: window.__LAYOUT_METRICS.reflows,
        repaints: window.__LAYOUT_METRICS.repaints,
        heroSection: {
          height: heroHeight,
          top: heroTop,
          bottom: heroBottom,
          exceedsViewport: heroBottom > viewportHeight,
          viewportHeight
        },
        flexChildren: childrenHeights
      };
    });

    const loadTime = Date.now() - startTime;

    // Calculate thrashing score
    const thrashingScore = metrics.reflows > 0
      ? (metrics.reflows / loadTime) * 1000
      : 0;

    // Determine pass/fail status
    const issues = [];
    if (metrics.cumulativeLayoutShift > THRESHOLDS.layoutShift) {
      issues.push(`CLS too high: ${metrics.cumulativeLayoutShift.toFixed(3)} (threshold: ${THRESHOLDS.layoutShift})`);
    }
    if (metrics.largestContentfulPaint > THRESHOLDS.largestContentfulPaint) {
      issues.push(`LCP too slow: ${metrics.largestContentfulPaint.toFixed(0)}ms (threshold: ${THRESHOLDS.largestContentfulPaint}ms)`);
    }
    if (metrics.reflows > THRESHOLDS.reflows) {
      issues.push(`Too many reflows: ${metrics.reflows} (threshold: ${THRESHOLDS.reflows})`);
    }
    if (thrashingScore > THRESHOLDS.thrashingScore) {
      issues.push(`Layout thrashing detected: ${thrashingScore.toFixed(3)} (threshold: ${THRESHOLDS.thrashingScore})`);
    }
    if (metrics.heroSection.exceedsViewport) {
      issues.push(`Hero section exceeds viewport: ${metrics.heroSection.bottom}px > ${metrics.heroSection.viewportHeight}px`);
    }

    // Check if all flex children are visible
    const hiddenChildren = metrics.flexChildren.filter(child => !child.isVisible);
    if (hiddenChildren.length > 0) {
      issues.push(`${hiddenChildren.length} flex children are cut off or hidden`);
    }

    const result = {
      breakpoint: breakpoint.name,
      viewport: `${breakpoint.width}x${breakpoint.height}`,
      metrics: {
        FCP: `${metrics.firstContentfulPaint.toFixed(0)}ms`,
        LCP: `${metrics.largestContentfulPaint.toFixed(0)}ms`,
        CLS: metrics.cumulativeLayoutShift.toFixed(3),
        reflows: metrics.reflows,
        thrashingScore: thrashingScore.toFixed(3),
        loadTime: `${loadTime}ms`
      },
      heroSection: {
        height: `${metrics.heroSection.height.toFixed(0)}px`,
        exceedsViewport: metrics.heroSection.exceedsViewport,
        flexChildrenVisible: `${metrics.flexChildren.length - hiddenChildren.length}/${metrics.flexChildren.length}`
      },
      status: issues.length === 0 ? '✅ PASS' : '❌ FAIL',
      issues
    };

    results.push(result);

    // Take screenshot for visual validation
    await page.screenshot({
      path: path.join(__dirname, `../test-results/layout-${breakpoint.name.toLowerCase()}.png`),
      fullPage: false
    });

    await page.close();
  }

  await browser.close();

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      passed: results.filter(r => r.status.includes('PASS')).length,
      failed: results.filter(r => r.status.includes('FAIL')).length
    },
    thresholds: THRESHOLDS,
    results
  };

  // Save report
  const reportDir = path.join(__dirname, '../test-results');
  await fs.mkdir(reportDir, { recursive: true });
  await fs.writeFile(
    path.join(reportDir, 'layout-performance-report.json'),
    JSON.stringify(report, null, 2)
  );

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 LAYOUT PERFORMANCE TEST RESULTS');
  console.log('='.repeat(60));

  for (const result of results) {
    console.log(`\n${result.status} ${result.breakpoint} (${result.viewport})`);
    console.log('  Metrics:');
    console.log(`    - FCP: ${result.metrics.FCP}`);
    console.log(`    - LCP: ${result.metrics.LCP}`);
    console.log(`    - CLS: ${result.metrics.CLS}`);
    console.log(`    - Reflows: ${result.metrics.reflows}`);
    console.log(`    - Thrashing Score: ${result.metrics.thrashingScore}`);
    console.log(`    - Hero Height: ${result.heroSection.height}`);
    console.log(`    - Flex Children Visible: ${result.heroSection.flexChildrenVisible}`);

    if (result.issues.length > 0) {
      console.log('  Issues:');
      result.issues.forEach(issue => {
        console.log(`    ⚠️  ${issue}`);
      });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`SUMMARY: ${report.summary.passed}/${report.summary.total} tests passed`);
  console.log('='.repeat(60));

  // Exit with appropriate code
  process.exit(report.summary.failed > 0 ? 1 : 0);
}

// Run the test
testLayoutPerformance().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});