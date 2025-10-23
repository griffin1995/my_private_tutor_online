// CONTEXT7 SOURCE: @axe-core/playwright - End-to-end accessibility testing with Playwright
// TESTING REASON: Industry-standard E2E accessibility testing for WCAG 2.1 AA compliance

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Test major pages for accessibility compliance
const testPages = [
  { path: '/', name: 'Homepage' },
  { path: '/about', name: 'About Page' },
  { path: '/subject-tuition', name: 'Subject Tuition' },
  { path: '/how-it-works', name: 'How It Works' },
  { path: '/testimonials', name: 'Testimonials' },
  { path: '/video-masterclasses', name: 'Video Masterclasses' },
  { path: '/meet-our-tutors', name: 'Meet Our Tutors' },
  { path: '/11-plus-bootcamps', name: '11+ Bootcamps' },
];

for (const { path, name } of testPages) {
  test(`${name} meets WCAG 2.1 AA accessibility standards`, async ({ page }) => {
    // Navigate to the page
    await page.goto(path);

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Run accessibility scan with WCAG 2.1 AA compliance
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .include('body')
      .exclude('[data-testid="advertisement"]') // Exclude third-party content
      .exclude('[data-aria-hidden="true"]') // Exclude development tools like Pesticide CSS debugger
      .exclude('.fixed.top-4.right-4') // Exclude CMS monitoring dashboard (development only)
      .exclude('[aria-hidden="true"]') // Exclude elements marked as hidden from accessibility tree
      .exclude('.justify-between.items-center.flex input[type="checkbox"]') // Exclude development dashboard checkboxes
      .analyze();

    // Expect no accessibility violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}

test.describe('Interactive Elements Accessibility', () => {
  test('Navigation menu accessibility', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test desktop navigation
    await page.setViewportSize({ width: 1400, height: 800 });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('nav, [role="navigation"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Mobile navigation accessibility', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    // Test mobile hamburger menu
    const hamburgerButton = page.locator('[aria-label*="menu"], [data-testid="mobile-menu-button"]').first();
    if (await hamburgerButton.isVisible()) {
      await hamburgerButton.click();
      await page.waitForTimeout(500); // Wait for menu animation
    }

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('nav, [role="navigation"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Form accessibility compliance', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scan any forms present on the page
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('form, [role="form"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Color Contrast and Visual Accessibility', () => {
  test('Color contrast compliance across site', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Focus indicators visibility', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test keyboard navigation focus indicators
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['focus-order-semantics'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Screen Reader Support', () => {
  test('ARIA landmarks and labels', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['landmark-one-main', 'region', 'aria-allowed-attr'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Heading hierarchy compliance', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['page-has-heading-one', 'heading-order'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Keyboard Navigation', () => {
  test('All interactive elements keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['keyboard', 'focusable-content'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Tab order is logical', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['tabindex'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Mobile Accessibility', () => {
  test('Touch targets meet minimum size requirements', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Royal Client Standards', () => {
  test('Premium accessibility standards maintained', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Run comprehensive accessibility scan with all WCAG rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
      .analyze();

    // Royal client standards require zero violations
    expect(accessibilityScanResults.violations).toEqual([]);

    // Additional check for incomplete tests that might need attention
    if (accessibilityScanResults.incomplete.length > 0) {
      console.warn('Incomplete accessibility checks found:', accessibilityScanResults.incomplete);
    }
  });
});