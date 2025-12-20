/**
 * Modern E2E Test Fixtures - 2025 Patterns
 *
 * Provides enhanced Playwright test setup with:
 * - Page Object Model integration
 * - Accessibility testing via axe-core
 * - Performance monitoring via web-vitals
 * - Type-safe fixtures and reusable patterns
 */

import { test as base, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AppPage } from '../pages/app-page';
import type { WebVitalsMetrics } from '../types/performance';

// Define our custom fixture types
type TestFixtures = {
  appPage: AppPage;
  accessibilityChecker: AxeBuilder;
  performanceMonitor: WebVitalsMetrics;
};

// Extend base test with our custom fixtures
export const test = base.extend<TestFixtures>({
  // App Page fixture - provides Page Object Model
  appPage: async ({ page }, use) => {
    const appPage = new AppPage(page);
    await use(appPage);
  },

  // Accessibility Checker fixture - provides axe-core integration
  accessibilityChecker: async ({ page }, use) => {
    const axeBuilder = new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('[aria-hidden="true"]')
      .exclude('.skip-accessibility');

    await use(axeBuilder);
  },

  // Performance Monitor fixture - provides web-vitals integration
  performanceMonitor: async ({ page }, use) => {
    const metrics: WebVitalsMetrics = {
      lcp: null,
      inp: null,
      cls: null,
      fcp: null,
      ttfb: null
    };

    // Inject web-vitals script and collect metrics
    await page.addInitScript(() => {
      // This will be populated with actual web-vitals integration
      window.webVitalsMetrics = {};
    });

    await use(metrics);
  },
});

export { expect } from '@playwright/test';

// Helper functions for common test patterns
export class TestHelpers {
  /**
   * Checks WCAG 2.1 AA compliance for the current page
   */
  static async checkAccessibility(axeBuilder: AxeBuilder): Promise<void> {
    const accessibilityScanResults = await axeBuilder.analyze();

    expect(accessibilityScanResults.violations,
      `Accessibility violations found:\n${accessibilityScanResults.violations
        .map(v => `- ${v.id}: ${v.description}`)
        .join('\n')}`
    ).toHaveLength(0);
  }

  /**
   * Validates Core Web Vitals are within acceptable thresholds
   */
  static async checkPerformanceBudget(
    metrics: WebVitalsMetrics,
    thresholds = {
      lcp: 2500, // Good: ≤ 2.5s
      inp: 200,  // Good: ≤ 200ms
      cls: 0.1,  // Good: ≤ 0.1
      fcp: 1800, // Good: ≤ 1.8s
      ttfb: 800  // Good: ≤ 800ms
    }
  ): Promise<void> {
    if (metrics.lcp !== null) {
      expect(metrics.lcp, `LCP should be ≤ ${thresholds.lcp}ms`).toBeLessThanOrEqual(thresholds.lcp);
    }
    if (metrics.inp !== null) {
      expect(metrics.inp, `INP should be ≤ ${thresholds.inp}ms`).toBeLessThanOrEqual(thresholds.inp);
    }
    if (metrics.cls !== null) {
      expect(metrics.cls, `CLS should be ≤ ${thresholds.cls}`).toBeLessThanOrEqual(thresholds.cls);
    }
    if (metrics.fcp !== null) {
      expect(metrics.fcp, `FCP should be ≤ ${thresholds.fcp}ms`).toBeLessThanOrEqual(thresholds.fcp);
    }
    if (metrics.ttfb !== null) {
      expect(metrics.ttfb, `TTFB should be ≤ ${thresholds.ttfb}ms`).toBeLessThanOrEqual(thresholds.ttfb);
    }
  }
}

// Environment-specific configuration
export const getBaseURL = (): string => {
  if (process.env.CI) {
    return process.env.BASE_URL || 'https://www.myprivatetutoronline.com';
  }
  return 'http://localhost:3000';
};

// Critical pages configuration
export const CRITICAL_PAGES = [
  { path: '/', name: 'Homepage', priority: 'high' },
  { path: '/about', name: 'About Us', priority: 'high' },
  { path: '/contact', name: 'Contact', priority: 'high' },
  { path: '/services', name: 'Services', priority: 'medium' },
  { path: '/subject-tuition', name: 'Subject Tuition', priority: 'medium' },
  { path: '/how-it-works', name: 'How It Works', priority: 'medium' },
  { path: '/testimonials', name: 'Testimonials', priority: 'medium' },
  { path: '/expert-educators', name: 'Expert Educators', priority: 'low' },
  { path: '/faq', name: 'FAQ', priority: 'low' },
  { path: '/meet-our-tutors', name: 'Meet Our Tutors', priority: 'low' },
  { path: '/video-masterclasses', name: 'Video Masterclasses', priority: 'low' },
  { path: '/11-plus-bootcamps', name: '11+ Bootcamps', priority: 'low' },
  { path: '/exam-papers', name: 'Exam Papers', priority: 'low' },
  { path: '/legal/privacy-policy', name: 'Privacy Policy', priority: 'low' },
  { path: '/legal/terms-of-service', name: 'Terms of Service', priority: 'low' },
  { path: '/legal/cookie-policy', name: 'Cookie Policy', priority: 'low' },
  { path: '/legal/booking-policy', name: 'Booking Policy', priority: 'low' },
] as const;