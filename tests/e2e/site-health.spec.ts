/**
 * Site Health Monitoring - Broken Link & Asset Detection
 *
 * This test suite monitors your production site for:
 * - Broken internal links (404s, 500s, etc.)
 * - Missing images, CSS, and JavaScript assets
 * - Network-level failures (timeouts, DNS issues)
 * - JavaScript runtime errors
 *
 * Integrates with GitHub Actions for automated monitoring and CI/CD quality gates.
 */

import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs';

interface BrokenLink {
  url: string;
  status: number;
  sourceUrl: string;
  resourceType: string;
  element?: string;
}

interface FailedRequest {
  url: string;
  sourceUrl: string;
  resourceType: string;
  error: string;
}

interface HealthReport {
  timestamp: string;
  baseUrl: string;
  summary: {
    brokenLinks: number;
    failedRequests: number;
    jsErrors: number;
    pagesChecked: number;
    totalIssues: number;
  };
  issues: {
    brokenLinks: BrokenLink[];
    failedRequests: FailedRequest[];
    jsErrors: string[];
  };
  pageResults: Array<{
    url: string;
    status: number;
    loadTime: number;
    issues: number;
  }>;
}

test.describe('Site Health Monitoring', () => {
  const brokenLinks: BrokenLink[] = [];
  const failedRequests: FailedRequest[] = [];
  const jsErrors: string[] = [];
  const pageResults: Array<{
    url: string;
    status: number;
    loadTime: number;
    issues: number;
  }> = [];

  // Production URL from your Playwright config
  const baseUrl = process.env.CI ?
    'https://myprivatetutoronline-f8tv06oa2-jacks-projects-cf5effed.vercel.app' :
    'http://localhost:3000';

  // Critical pages based on your app structure
  const criticalPages = [
    { path: '/', name: 'Homepage' },
    { path: '/about', name: 'About Us' },
    { path: '/contact', name: 'Contact' },
    { path: '/services', name: 'Services' },
    { path: '/subject-tuition', name: 'Subject Tuition' },
    { path: '/how-it-works', name: 'How It Works' },
    { path: '/testimonials', name: 'Testimonials' },
    { path: '/expert-educators', name: 'Expert Educators' },
    { path: '/faq', name: 'FAQ' },
    { path: '/meet-our-tutors', name: 'Meet Our Tutors' },
    { path: '/video-masterclasses', name: 'Video Masterclasses' },
    { path: '/11-plus-bootcamps', name: '11+ Bootcamps' },
    { path: '/exam-papers', name: 'Exam Papers' },
    { path: '/legal/privacy-policy', name: 'Privacy Policy' },
    { path: '/legal/terms-of-service', name: 'Terms of Service' },
    { path: '/legal/cookie-policy', name: 'Cookie Policy' },
    { path: '/legal/booking-policy', name: 'Booking Policy' }
  ];

  test.beforeEach(async ({ page }) => {
    // Monitor network failures (timeouts, DNS failures, connection issues)
    page.on('requestfailed', (request) => {
      const failure = request.failure();
      if (failure) {
        failedRequests.push({
          url: request.url(),
          sourceUrl: page.url(),
          resourceType: request.resourceType(),
          error: failure.errorText
        });
      }
    });

    // Monitor HTTP error responses (404s, 500s, etc.)
    page.on('response', (response) => {
      if (response.status() >= 400) {
        brokenLinks.push({
          url: response.url(),
          status: response.status(),
          sourceUrl: page.url(),
          resourceType: response.request().resourceType()
        });
      }
    });

    // Monitor JavaScript errors
    page.on('pageerror', (error) => {
      jsErrors.push(`${page.url()}: ${error.message}`);
    });
  });

  // Test each critical page for broken content
  criticalPages.forEach(pageInfo => {
    test(`${pageInfo.name} (${pageInfo.path}) - Link & Asset Health Check`, async ({ page }) => {
      const fullUrl = `${baseUrl}${pageInfo.path}`;
      const startTime = Date.now();
      let pageIssues = 0;

      console.log(`🔍 Checking: ${pageInfo.name} - ${fullUrl}`);

      // Navigate to page with extended timeout for production
      const response = await page.goto(fullUrl, {
        waitUntil: 'networkidle',
        timeout: 45000
      });

      const loadTime = Date.now() - startTime;
      const pageStatus = response?.status() || 0;

      // Basic page load verification
      expect.soft(pageStatus, `${pageInfo.name} page should load successfully`).toBe(200);

      // Extract and validate internal links
      const links = await page.locator('a[href]').all();
      console.log(`  📎 Found ${links.length} links to check`);

      for (const link of links) {
        const href = await link.getAttribute('href');
        if (href && (href.startsWith('/') || href.startsWith(baseUrl))) {
          try {
            // Construct full URL for internal links
            const linkUrl = href.startsWith('/') ? `${baseUrl}${href}` : href;

            // Test internal links with HEAD request for efficiency
            const linkResponse = await page.request.head(linkUrl);

            if (linkResponse.status() >= 400) {
              const linkText = await link.textContent() || 'No text';
              console.log(`    ❌ Broken link: ${linkResponse.status()} ${href} ("${linkText}")`);
              pageIssues++;

              expect.soft(linkResponse.status(),
                `Internal link "${linkText}" (${href}) from ${pageInfo.name} should not be broken`
              ).toBeLessThan(400);
            } else {
              console.log(`    ✅ Link OK: ${href}`);
            }
          } catch (error) {
            console.log(`    ⚠️ Link check failed: ${href} - ${error}`);
            pageIssues++;
          }
        }
      }

      // Verify critical images load and are visible
      const images = await page.locator('img[src]').all();
      console.log(`  🖼️ Found ${images.length} images to verify`);

      for (const img of images) {
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt') || 'No alt text';

        if (src) {
          try {
            await expect.soft(img,
              `Image "${alt}" (${src}) on ${pageInfo.name} should be visible`
            ).toBeVisible({ timeout: 10000 });

            // Check if image actually loaded (not broken)
            const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);

            expect.soft(naturalWidth,
              `Image "${alt}" (${src}) should load with valid dimensions`
            ).toBeGreaterThan(0);

            if (naturalWidth > 0) {
              console.log(`    ✅ Image OK: ${src}`);
            } else {
              console.log(`    ❌ Image failed to load: ${src}`);
              pageIssues++;
            }
          } catch (error) {
            console.log(`    ⚠️ Image check failed: ${src} - ${error}`);
            pageIssues++;
          }
        }
      }

      // Verify page-specific elements load
      if (pageInfo.path === '/') {
        // Homepage specific checks
        await expect.soft(page.locator('h1'), 'Homepage should have main heading').toBeVisible();
        await expect.soft(page.locator('nav'), 'Homepage should have navigation').toBeVisible();
      }

      if (pageInfo.path === '/contact') {
        // Contact page specific checks
        await expect.soft(page.locator('form, [data-testid*="contact"]'),
          'Contact page should have contact form').toBeVisible();
      }

      // Record page results
      pageResults.push({
        url: fullUrl,
        status: pageStatus,
        loadTime,
        issues: pageIssues
      });

      console.log(`  ✅ Completed ${pageInfo.name} - ${pageIssues} issues found (${loadTime}ms)\n`);
    });
  });

  test('Cross-Site Link Validation', async ({ page }) => {
    console.log('🔗 Testing cross-site navigation and link consistency...');

    // Test navigation from homepage to key pages
    await page.goto(baseUrl);

    // Test main navigation links work
    const navLinks = await page.locator('nav a, header a').all();

    for (const navLink of navLinks) {
      const href = await navLink.getAttribute('href');
      const linkText = await navLink.textContent() || 'Navigation link';

      if (href && href.startsWith('/') && href !== '#') {
        try {
          const response = await page.request.head(`${baseUrl}${href}`);
          expect.soft(response.status(),
            `Navigation link "${linkText}" (${href}) should be accessible`
          ).toBeLessThan(400);
        } catch (error) {
          console.log(`❌ Navigation link failed: ${href} - ${error}`);
        }
      }
    }
  });

  test('Generate Health Report & Summary', async () => {
    // Create comprehensive health report
    const healthReport: HealthReport = {
      timestamp: new Date().toISOString(),
      baseUrl,
      summary: {
        brokenLinks: brokenLinks.length,
        failedRequests: failedRequests.length,
        jsErrors: jsErrors.length,
        pagesChecked: criticalPages.length,
        totalIssues: brokenLinks.length + failedRequests.length + jsErrors.length
      },
      issues: {
        brokenLinks,
        failedRequests,
        jsErrors
      },
      pageResults
    };

    // Save detailed report for GitHub Actions artifacts
    try {
      writeFileSync('test-results/health-report.json',
        JSON.stringify(healthReport, null, 2));
      console.log('📊 Health report saved to test-results/health-report.json');
    } catch (error) {
      console.log('⚠️ Could not save health report:', error);
    }

    // Display comprehensive summary
    console.log('\n' + '='.repeat(70));
    console.log('🏥 SITE HEALTH MONITORING SUMMARY');
    console.log('='.repeat(70));
    console.log(`📅 Timestamp: ${healthReport.timestamp}`);
    console.log(`🌐 Base URL: ${baseUrl}`);
    console.log(`📊 Pages Checked: ${healthReport.summary.pagesChecked}`);
    console.log(`⚠️ Total Issues: ${healthReport.summary.totalIssues}`);
    console.log('');

    if (brokenLinks.length > 0) {
      console.log('❌ BROKEN LINKS DETECTED:');
      const groupedByStatus = brokenLinks.reduce((acc, link) => {
        acc[link.status] = acc[link.status] || [];
        acc[link.status].push(link);
        return acc;
      }, {} as Record<number, BrokenLink[]>);

      Object.keys(groupedByStatus).forEach(status => {
        console.log(`\n  ${status} Status Code:`);
        groupedByStatus[parseInt(status)].forEach(link => {
          console.log(`    • ${link.resourceType}: ${link.url}`);
          console.log(`      Found on: ${link.sourceUrl}`);
        });
      });
      console.log('');
    }

    if (failedRequests.length > 0) {
      console.log('❌ NETWORK FAILURES DETECTED:');
      failedRequests.forEach(req => {
        console.log(`  • ${req.resourceType}: ${req.url}`);
        console.log(`    Error: ${req.error}`);
        console.log(`    Found on: ${req.sourceUrl}`);
      });
      console.log('');
    }

    if (jsErrors.length > 0) {
      console.log('❌ JAVASCRIPT ERRORS DETECTED:');
      jsErrors.forEach(error => {
        console.log(`  • ${error}`);
      });
      console.log('');
    }

    // Show page-by-page results
    if (pageResults.length > 0) {
      console.log('📄 PAGE-BY-PAGE RESULTS:');
      pageResults.forEach(result => {
        const status = result.status === 200 ? '✅' : '❌';
        const issues = result.issues > 0 ? `(${result.issues} issues)` : '';
        console.log(`  ${status} ${result.url} - ${result.loadTime}ms ${issues}`);
      });
    }

    console.log('='.repeat(70));

    if (healthReport.summary.totalIssues === 0) {
      console.log('🎉 All checks passed! Your site is healthy.');
    } else {
      console.log(`⚠️ Found ${healthReport.summary.totalIssues} issues requiring attention.`);
    }

    // Fail test if any critical issues found
    expect(healthReport.summary.totalIssues,
      `Site health check failed: ${healthReport.summary.brokenLinks} broken links, ${healthReport.summary.failedRequests} failed requests, ${healthReport.summary.jsErrors} JS errors`
    ).toBe(0);
  });
});