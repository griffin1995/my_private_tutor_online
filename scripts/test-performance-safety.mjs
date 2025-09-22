#!/usr/bin/env node

/**
 * Performance Safety Test Script
 * Tests for infinite loops, memory leaks, and performance regressions
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEST_URL = 'http://localhost:3000/new-page';
const TEST_DURATION = 30000; // 30 seconds
const MAX_MEMORY_MB = 500; // Max allowed memory growth
const MAX_RENDERS_PER_SECOND = 50;
const MIN_FPS = 30;

// Console colors
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

class PerformanceTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.metrics = {
      renders: [],
      memory: [],
      fps: [],
      errors: [],
      warnings: [],
    };
  }

  async setup() {
    console.log(`${colors.blue}Setting up browser...${colors.reset}`);

    this.browser = await chromium.launch({
      headless: false, // Run with UI to monitor visually
      args: [
        '--enable-precise-memory-info',
        '--disable-dev-shm-usage',
        '--no-sandbox',
      ],
    });

    const context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });

    this.page = await context.newPage();

    // Capture console messages
    this.page.on('console', msg => {
      const text = msg.text();
      const type = msg.type();

      if (type === 'error') {
        this.metrics.errors.push({
          text,
          timestamp: Date.now(),
        });

        // Check for critical errors
        if (text.includes('Infinite re-render') || text.includes('CRITICAL')) {
          console.error(`${colors.red}🔴 CRITICAL ERROR DETECTED: ${text}${colors.reset}`);
          this.handleCriticalError(text);
        }
      } else if (type === 'warning') {
        this.metrics.warnings.push({
          text,
          timestamp: Date.now(),
        });
      }
    });

    // Monitor page crashes
    this.page.on('crash', () => {
      console.error(`${colors.red}🔴 PAGE CRASHED!${colors.reset}`);
      this.handlePageCrash();
    });
  }

  async testPerformance() {
    console.log(`${colors.blue}Starting performance test...${colors.reset}`);
    console.log(`Testing URL: ${TEST_URL}`);
    console.log(`Duration: ${TEST_DURATION / 1000} seconds\n`);

    try {
      // Navigate to page
      await this.page.goto(TEST_URL, {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });

      // Inject performance monitoring
      await this.injectPerformanceMonitor();

      // Start collecting metrics
      const metricsInterval = setInterval(async () => {
        await this.collectMetrics();
      }, 1000); // Collect every second

      // Simulate user interactions
      await this.simulateUserInteractions();

      // Wait for test duration
      await new Promise(resolve => setTimeout(resolve, TEST_DURATION));

      // Stop collecting
      clearInterval(metricsInterval);

      // Generate report
      return this.generateReport();

    } catch (error) {
      console.error(`${colors.red}Test failed: ${error.message}${colors.reset}`);
      return {
        passed: false,
        error: error.message,
      };
    }
  }

  async injectPerformanceMonitor() {
    await this.page.evaluate(() => {
      window.__performanceMetrics = {
        renderCount: 0,
        lastRenderTime: Date.now(),
        renderTimestamps: [],
      };

      // Override React's render tracking
      const originalUseEffect = window.React?.useEffect;
      if (originalUseEffect) {
        window.React.useEffect = function(...args) {
          window.__performanceMetrics.renderCount++;
          window.__performanceMetrics.renderTimestamps.push(Date.now());
          return originalUseEffect.apply(this, args);
        };
      }

      // Monitor FPS
      let lastTime = performance.now();
      let frameCount = 0;

      const measureFPS = () => {
        frameCount++;
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;

        if (deltaTime >= 1000) {
          window.__performanceMetrics.currentFPS = Math.round((frameCount * 1000) / deltaTime);
          frameCount = 0;
          lastTime = currentTime;
        }

        requestAnimationFrame(measureFPS);
      };

      requestAnimationFrame(measureFPS);
    });
  }

  async collectMetrics() {
    try {
      const metrics = await this.page.evaluate(() => {
        const perfMetrics = window.__performanceMetrics || {};
        const memory = performance.memory ? {
          usedJSHeapSize: performance.memory.usedJSHeapSize / 1024 / 1024, // Convert to MB
          totalJSHeapSize: performance.memory.totalJSHeapSize / 1024 / 1024,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit / 1024 / 1024,
        } : null;

        // Calculate renders per second
        const now = Date.now();
        const oneSecondAgo = now - 1000;
        const recentRenders = (perfMetrics.renderTimestamps || [])
          .filter(t => t > oneSecondAgo).length;

        return {
          memory,
          renderCount: perfMetrics.renderCount || 0,
          rendersPerSecond: recentRenders,
          fps: perfMetrics.currentFPS || 0,
          timestamp: now,
        };
      });

      // Store metrics
      if (metrics.memory) {
        this.metrics.memory.push(metrics.memory);
      }
      this.metrics.renders.push({
        count: metrics.renderCount,
        perSecond: metrics.rendersPerSecond,
        timestamp: metrics.timestamp,
      });
      this.metrics.fps.push(metrics.fps);

      // Real-time monitoring output
      this.printRealTimeMetrics(metrics);

      // Check for critical issues
      this.checkCriticalThresholds(metrics);

    } catch (error) {
      console.warn(`Failed to collect metrics: ${error.message}`);
    }
  }

  async simulateUserInteractions() {
    console.log(`${colors.yellow}Simulating user interactions...${colors.reset}`);

    try {
      // Click accordion items sequentially
      const accordionSelectors = [
        '[value="primary-school"]',
        '[value="secondary-school"]',
        '[value="entrance-exams"]',
        '[value="university-admissions"]',
      ];

      for (const selector of accordionSelectors) {
        const element = await this.page.$(selector);
        if (element) {
          await element.click();
          await this.page.waitForTimeout(2000); // Wait for animation
        }
      }

      // Scroll interactions
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });

      await this.page.waitForTimeout(1000);

      await this.page.evaluate(() => {
        window.scrollTo(0, 0);
      });

    } catch (error) {
      console.warn(`Interaction simulation error: ${error.message}`);
    }
  }

  printRealTimeMetrics(metrics) {
    const memoryUsage = metrics.memory
      ? `${metrics.memory.usedJSHeapSize.toFixed(1)}MB`
      : 'N/A';

    const rendersPerSecond = metrics.rendersPerSecond;
    const fps = metrics.fps;

    // Color code based on thresholds
    let renderColor = colors.green;
    if (rendersPerSecond > MAX_RENDERS_PER_SECOND) {
      renderColor = colors.red;
    } else if (rendersPerSecond > MAX_RENDERS_PER_SECOND / 2) {
      renderColor = colors.yellow;
    }

    let fpsColor = colors.green;
    if (fps < MIN_FPS && fps > 0) {
      fpsColor = colors.red;
    } else if (fps < MIN_FPS * 1.5 && fps > 0) {
      fpsColor = colors.yellow;
    }

    process.stdout.write(
      `\r${colors.blue}Metrics:${colors.reset} ` +
      `Memory: ${memoryUsage} | ` +
      `${renderColor}Renders/sec: ${rendersPerSecond}${colors.reset} | ` +
      `${fpsColor}FPS: ${fps}${colors.reset}    `
    );
  }

  checkCriticalThresholds(metrics) {
    // Check for runaway rendering
    if (metrics.rendersPerSecond > MAX_RENDERS_PER_SECOND) {
      throw new Error(
        `Infinite re-render detected! ${metrics.rendersPerSecond} renders/second`
      );
    }

    // Check memory growth
    if (this.metrics.memory.length > 5) {
      const initialMemory = this.metrics.memory[0].usedJSHeapSize;
      const currentMemory = metrics.memory.usedJSHeapSize;
      const growth = currentMemory - initialMemory;

      if (growth > MAX_MEMORY_MB) {
        throw new Error(
          `Excessive memory growth! ${growth.toFixed(1)}MB increase`
        );
      }
    }
  }

  handleCriticalError(errorText) {
    console.log(`\n${colors.red}Stopping test due to critical error${colors.reset}`);
    this.generateReport();
    process.exit(1);
  }

  handlePageCrash() {
    console.log(`\n${colors.red}Page crashed - test failed${colors.reset}`);
    this.generateReport();
    process.exit(1);
  }

  generateReport() {
    console.log(`\n\n${colors.blue}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.blue}PERFORMANCE TEST REPORT${colors.reset}`);
    console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);

    // Memory analysis
    if (this.metrics.memory.length > 0) {
      const initialMemory = this.metrics.memory[0].usedJSHeapSize;
      const finalMemory = this.metrics.memory[this.metrics.memory.length - 1].usedJSHeapSize;
      const memoryGrowth = finalMemory - initialMemory;
      const memoryGrowthPercent = (memoryGrowth / initialMemory) * 100;

      console.log(`${colors.yellow}📊 Memory Usage:${colors.reset}`);
      console.log(`  Initial: ${initialMemory.toFixed(1)}MB`);
      console.log(`  Final: ${finalMemory.toFixed(1)}MB`);
      console.log(`  Growth: ${memoryGrowth.toFixed(1)}MB (${memoryGrowthPercent.toFixed(1)}%)`);

      const memoryPassed = memoryGrowth < MAX_MEMORY_MB;
      console.log(`  Status: ${memoryPassed ? colors.green + '✅ PASS' : colors.red + '❌ FAIL'}${colors.reset}\n`);
    }

    // Render performance
    if (this.metrics.renders.length > 0) {
      const maxRenders = Math.max(...this.metrics.renders.map(r => r.perSecond));
      const avgRenders = this.metrics.renders.reduce((sum, r) => sum + r.perSecond, 0) / this.metrics.renders.length;

      console.log(`${colors.yellow}🔄 Render Performance:${colors.reset}`);
      console.log(`  Max renders/sec: ${maxRenders}`);
      console.log(`  Avg renders/sec: ${avgRenders.toFixed(1)}`);

      const renderPassed = maxRenders < MAX_RENDERS_PER_SECOND;
      console.log(`  Status: ${renderPassed ? colors.green + '✅ PASS' : colors.red + '❌ FAIL'}${colors.reset}\n`);
    }

    // FPS analysis
    if (this.metrics.fps.length > 0) {
      const validFPS = this.metrics.fps.filter(f => f > 0);
      if (validFPS.length > 0) {
        const minFPS = Math.min(...validFPS);
        const avgFPS = validFPS.reduce((sum, f) => sum + f, 0) / validFPS.length;

        console.log(`${colors.yellow}🎯 Frame Rate:${colors.reset}`);
        console.log(`  Min FPS: ${minFPS}`);
        console.log(`  Avg FPS: ${avgFPS.toFixed(1)}`);

        const fpsPassed = minFPS >= MIN_FPS;
        console.log(`  Status: ${fpsPassed ? colors.green + '✅ PASS' : colors.red + '❌ FAIL'}${colors.reset}\n`);
      }
    }

    // Errors and warnings
    console.log(`${colors.yellow}⚠️  Issues Found:${colors.reset}`);
    console.log(`  Errors: ${this.metrics.errors.length}`);
    console.log(`  Warnings: ${this.metrics.warnings.length}`);

    if (this.metrics.errors.length > 0) {
      console.log(`\n${colors.red}Errors:${colors.reset}`);
      this.metrics.errors.slice(0, 5).forEach(e => {
        console.log(`  - ${e.text.substring(0, 100)}`);
      });
    }

    // Overall result
    const allTestsPassed =
      this.metrics.errors.length === 0 &&
      (this.metrics.memory.length === 0 || this.metrics.memory[this.metrics.memory.length - 1].usedJSHeapSize - this.metrics.memory[0].usedJSHeapSize < MAX_MEMORY_MB) &&
      (this.metrics.renders.length === 0 || Math.max(...this.metrics.renders.map(r => r.perSecond)) < MAX_RENDERS_PER_SECOND);

    console.log(`\n${colors.blue}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.yellow}OVERALL RESULT: ${allTestsPassed ? colors.green + '✅ ALL TESTS PASSED' : colors.red + '❌ TESTS FAILED'}${colors.reset}`);
    console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);

    return {
      passed: allTestsPassed,
      metrics: this.metrics,
    };
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Main execution
async function main() {
  console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.blue}PERFORMANCE SAFETY TESTING${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);

  const tester = new PerformanceTester();

  try {
    await tester.setup();
    const result = await tester.testPerformance();

    // Save report to file
    const reportPath = join(__dirname, '..', 'performance-test-results.json');
    await fs.writeFile(reportPath, JSON.stringify(result, null, 2));
    console.log(`Report saved to: ${reportPath}`);

    process.exit(result.passed ? 0 : 1);

  } catch (error) {
    console.error(`${colors.red}Test execution failed: ${error.message}${colors.reset}`);
    process.exit(1);

  } finally {
    await tester.cleanup();
  }
}

// Run the test
main().catch(console.error);