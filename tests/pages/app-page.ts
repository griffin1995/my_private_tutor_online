/**
 * AppPage - Main Page Object Model for My Private Tutor Online
 *
 * Provides reusable methods for interacting with common page elements
 * and performing actions across the application.
 */

import type { Page, Locator, Response } from '@playwright/test';
import { expect } from '@playwright/test';
import { getBaseURL } from '../fixtures/base-test';

export class AppPage {
  readonly page: Page;

  // Common locators across all pages
  readonly navigation: Locator;
  readonly mainContent: Locator;
  readonly header: Locator;
  readonly footer: Locator;
  readonly skipLink: Locator;

  // Navigation elements
  readonly homeLink: Locator;
  readonly aboutLink: Locator;
  readonly servicesLink: Locator;
  readonly contactLink: Locator;
  readonly hamburgerMenu: Locator;

  // Common buttons
  readonly ctaButton: Locator;
  readonly bookConsultationButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Common page elements
    this.navigation = page.locator('nav, [role="navigation"]').first();
    this.mainContent = page.locator('main, [role="main"]').first();
    this.header = page.locator('header');
    this.footer = page.locator('footer');
    this.skipLink = page.locator('[href="#main-content"], .skip-link');

    // Navigation links
    this.homeLink = page.locator('nav a[href="/"], header a[href="/"]');
    this.aboutLink = page.locator('nav a[href="/about"], header a[href="/about"]');
    this.servicesLink = page.locator('nav a[href="/services"], header a[href="/services"]');
    this.contactLink = page.locator('nav a[href="/contact"], header a[href="/contact"]');
    this.hamburgerMenu = page.locator('button[aria-label*="menu"], .hamburger, .mobile-menu-toggle');

    // Common buttons
    this.ctaButton = page.locator('[data-testid="cta-button"], .cta-button');
    this.bookConsultationButton = page.locator('[data-testid="book-consultation"], button:has-text("Book"), a:has-text("Book")');
  }

  /**
   * Navigate to a specific page path
   */
  async goto(path: string = '/', options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle'; timeout?: number }): Promise<Response | null> {
    const fullUrl = `${getBaseURL()}${path}`;

    const response = await this.page.goto(fullUrl, {
      waitUntil: 'networkidle',
      timeout: 45000,
      ...options
    });

    // Verify page loaded successfully
    if (response && response.status() !== 200) {
      throw new Error(`Page failed to load: ${response.status()} ${response.statusText()}`);
    }

    return response;
  }

  /**
   * Wait for page to be ready for testing
   */
  async waitForPageReady(): Promise<void> {
    // Wait for critical elements to be present
    await expect(this.mainContent).toBeVisible({ timeout: 10000 });

    // Wait for any loading spinners to disappear
    await this.page.waitForLoadState('networkidle');

    // Wait for any animations to complete
    await this.page.waitForTimeout(100);
  }

  /**
   * Check if navigation is visible and functional
   */
  async verifyNavigation(): Promise<void> {
    await expect(this.navigation).toBeVisible();

    // On mobile, check if hamburger menu is visible
    const isMobile = await this.page.viewportSize().then(size => size && size.width < 1400);

    if (isMobile) {
      await expect(this.hamburgerMenu).toBeVisible();
    } else {
      await expect(this.homeLink).toBeVisible();
      await expect(this.aboutLink).toBeVisible();
      await expect(this.servicesLink).toBeVisible();
      await expect(this.contactLink).toBeVisible();
    }
  }

  /**
   * Verify page has proper heading structure
   */
  async verifyHeadingStructure(): Promise<void> {
    // Check for h1
    const h1Count = await this.page.locator('h1').count();
    expect(h1Count, 'Page should have exactly one h1 element').toBe(1);

    // Verify h1 has text content
    const h1Text = await this.page.locator('h1').first().textContent();
    expect(h1Text?.trim(), 'H1 should have text content').not.toBe('');
  }

  /**
   * Check for broken images
   */
  async verifyImages(): Promise<string[]> {
    const images = await this.page.locator('img[src]').all();
    const brokenImages: string[] = [];

    for (const img of images) {
      const src = await img.getAttribute('src');
      if (!src) continue;

      // Check if image loaded successfully
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);

      if (naturalWidth === 0) {
        brokenImages.push(src);
      }
    }

    return brokenImages;
  }

  /**
   * Test internal link accessibility
   */
  async testInternalLinks(maxLinks: number = 10): Promise<void> {
    const links = await this.page.locator('a[href^="/"], a[href^="' + getBaseURL() + '"]').all();
    const linksToTest = links.slice(0, maxLinks);

    for (const link of linksToTest) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();

      if (!href) continue;

      // Check if link has accessible text
      expect(text?.trim(), `Link ${href} should have accessible text`).not.toBe('');

      // Verify link is focusable
      await expect(link, `Link ${href} should be focusable`).toBeFocused({ timeout: 1000 });
    }
  }

  /**
   * Fill and submit contact form (if present)
   */
  async fillContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
  }): Promise<void> {
    const form = this.page.locator('form');

    if (await form.count() === 0) {
      throw new Error('Contact form not found on this page');
    }

    // Fill form fields
    await this.page.locator('input[name="name"], input[id="name"], #name').fill(data.name);
    await this.page.locator('input[name="email"], input[id="email"], #email').fill(data.email);
    await this.page.locator('input[name="subject"], input[id="subject"], #subject').fill(data.subject);
    await this.page.locator('textarea[name="message"], textarea[id="message"], #message').fill(data.message);

    if (data.phone) {
      await this.page.locator('input[name="phone"], input[id="phone"], #phone').fill(data.phone);
    }

    // Submit form
    await this.page.locator('button[type="submit"], input[type="submit"]').click();
  }

  /**
   * Search for content (if search functionality exists)
   */
  async search(query: string): Promise<void> {
    const searchInput = this.page.locator('input[type="search"], input[placeholder*="search"], #search');

    if (await searchInput.count() > 0) {
      await searchInput.fill(query);
      await searchInput.press('Enter');

      // Wait for search results
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Get page performance metrics
   */
  async getPerformanceMetrics(): Promise<{
    domContentLoaded: number;
    loadComplete: number;
    firstContentfulPaint?: number;
    resourceCount: number;
  }> {
    return await this.page.evaluate(() => {
      const perf = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');

      return {
        domContentLoaded: perf.domContentLoadedEventEnd - perf.startTime,
        loadComplete: perf.loadEventEnd - perf.startTime,
        firstContentfulPaint: paintEntries.find(p => p.name === 'first-contentful-paint')?.startTime,
        resourceCount: performance.getEntriesByType('resource').length
      };
    });
  }

  /**
   * Take a screenshot with timestamp for debugging
   */
  async screenshot(name?: string): Promise<Buffer> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = name ? `${name}-${timestamp}` : `screenshot-${timestamp}`;

    return await this.page.screenshot({
      path: `test-results/screenshots/${filename}.png`,
      fullPage: true
    });
  }
}