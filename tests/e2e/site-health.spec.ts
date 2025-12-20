/**
 * Site Health & Reliability Testing - 2025 Edition
 *
 * Modern site health monitoring using:
 * - Page Object Model patterns for maintainability
 * - Comprehensive broken link detection
 * - Asset integrity validation
 * - Network resilience testing
 * - Production-ready error handling
 */

import { test, expect, TestHelpers, CRITICAL_PAGES, getBaseURL } from '../fixtures/base-test';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

interface BrokenLink {
  url: string;
  status: number;
  sourceUrl: string;
  resourceType: string;
  element?: string;
  linkText?: string;
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
    healthScore: number;
    criticalIssues: number;
  };
  issues: {
    brokenLinks: BrokenLink[];
    failedRequests: FailedRequest[];
    jsErrors: string[];
  };
  pageResults: Array<{
    url: string;
    name: string;
    status: number;
    loadTime: number;
    issues: number;
    healthRating: 'excellent' | 'good' | 'needs-attention' | 'critical';
  }>;
  networkResilience: {
    connectivityTests: number;
    failedConnections: number;
    averageResponseTime: number;
  };
}

test.describe('Site Health & Reliability Monitoring', () => {
  let healthReport: HealthReport;
  const brokenLinks: BrokenLink[] = [];
  const failedRequests: FailedRequest[] = [];
  const jsErrors: string[] = [];
  const pageResults: Array<{
    url: string;
    name: string;
    status: number;
    loadTime: number;
    issues: number;
    healthRating: 'excellent' | 'good' | 'needs-attention' | 'critical';
  }> = [];

  test.beforeAll(async () => {
    // Initialize health report
    healthReport = {
      timestamp: new Date().toISOString(),
      baseUrl: getBaseURL(),
      summary: {
        brokenLinks: 0,
        failedRequests: 0,
        jsErrors: 0,
        pagesChecked: 0,
        totalIssues: 0,
        healthScore: 100,
        criticalIssues: 0
      },
      issues: {
        brokenLinks: [],
        failedRequests: [],
        jsErrors: []
      },
      pageResults: [],
      networkResilience: {
        connectivityTests: 0,
        failedConnections: 0,
        averageResponseTime: 0
      }
    };

    // Ensure results directory exists
    mkdirSync('test-results', { recursive: true });
  });

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

  // Test each critical page for comprehensive health
  for (const pageInfo of CRITICAL_PAGES) {
    test(`${pageInfo.name} (${pageInfo.path}) - Comprehensive Health Check`, async ({ appPage }) => {
      const fullUrl = `${getBaseURL()}${pageInfo.path}`;
      console.log(`🔍 Health check: ${pageInfo.name} - ${fullUrl}`);

      const startTime = Date.now();
      let pageIssues = 0;

      // Navigate with extended timeout and error handling
      try {
        const response = await appPage.goto(pageInfo.path, {
          waitUntil: 'networkidle',
          timeout: 45000
        });

        const loadTime = Date.now() - startTime;
        const pageStatus = response?.status() || 0;

        // Basic page load verification
        expect.soft(pageStatus, `${pageInfo.name} should load successfully`).toBe(200);

        // Wait for page to be ready for testing
        await appPage.waitForPageReady();

        // Verify page structure
        await appPage.verifyHeadingStructure();
        await appPage.verifyNavigation();

        // Test internal link integrity
        pageIssues += await testInternalLinkIntegrity(appPage, pageInfo.name);

        // Test image loading and optimization
        pageIssues += await testImageIntegrity(appPage, pageInfo.name);

        // Test critical asset loading
        pageIssues += await testCriticalAssets(appPage, pageInfo.name);

        // Page-specific health checks
        if (pageInfo.priority === 'high') {
          pageIssues += await performCriticalPageChecks(appPage, pageInfo);
        }

        // Determine health rating
        const healthRating = getPageHealthRating(pageIssues, loadTime);

        // Record page results
        const pageResult = {
          url: fullUrl,
          name: pageInfo.name,
          status: pageStatus,
          loadTime,
          issues: pageIssues,
          healthRating
        };

        pageResults.push(pageResult);
        healthReport.summary.pagesChecked++;

        console.log(`  ✅ ${pageInfo.name} health check completed:`);
        console.log(`    Status: ${pageStatus} | Load Time: ${loadTime}ms`);
        console.log(`    Issues: ${pageIssues} | Rating: ${healthRating.toUpperCase()}`);
        console.log('');

      } catch (error) {
        console.log(`  ❌ ${pageInfo.name} health check failed: ${error}`);
        pageIssues += 10; // Major penalty for complete failure

        pageResults.push({
          url: fullUrl,
          name: pageInfo.name,
          status: 0,
          loadTime: Date.now() - startTime,
          issues: pageIssues,
          healthRating: 'critical'
        });
      }
    });
  }

  test('Cross-Site Navigation Integrity', async ({ appPage }) => {
    console.log('🔗 Testing cross-site navigation integrity...');

    // Start from homepage
    await appPage.goto('/');
    await appPage.waitForPageReady();

    // Test main navigation functionality
    const navigationTests = await testNavigationIntegrity(appPage);

    console.log(`  📊 Navigation test results:`);
    console.log(`    Total links tested: ${navigationTests.totalTested}`);
    console.log(`    Working links: ${navigationTests.working}`);
    console.log(`    Broken links: ${navigationTests.broken}`);

    // Navigation should be highly reliable
    expect.soft(navigationTests.broken, 'Navigation links should be reliable').toBeLessThan(3);
  });

  test('API Endpoint Health Check', async ({ appPage }) => {
    console.log('🌐 Testing API endpoint health...');

    // Test critical API endpoints
    const apiEndpoints = [
      '/api/health',
      '/api/contact',
      '/api/newsletter',
      // Add other critical API endpoints
    ];

    let workingEndpoints = 0;
    let failedEndpoints = 0;

    for (const endpoint of apiEndpoints) {
      try {
        const response = await appPage.page.request.get(`${getBaseURL()}${endpoint}`, {
          timeout: 10000
        });

        if (response.status() < 400) {
          workingEndpoints++;
          console.log(`    ✅ ${endpoint}: ${response.status()}`);
        } else {
          failedEndpoints++;
          console.log(`    ❌ ${endpoint}: ${response.status()}`);
        }
      } catch (error) {
        failedEndpoints++;
        console.log(`    ❌ ${endpoint}: Failed to connect`);
      }
    }

    healthReport.networkResilience.connectivityTests = apiEndpoints.length;
    healthReport.networkResilience.failedConnections = failedEndpoints;

    console.log(`  📊 API Health: ${workingEndpoints}/${apiEndpoints.length} endpoints working`);

    // Soft assertion for API health
    expect.soft(failedEndpoints, 'Critical API endpoints should be accessible').toBe(0);
  });

  test('Mobile Responsiveness & Health', async ({ appPage }) => {
    console.log('📱 Testing mobile responsiveness and health...');

    // Test critical pages on mobile
    const mobileViewport = { width: 390, height: 844 }; // iPhone 14
    await appPage.page.setViewportSize(mobileViewport);

    for (const pageInfo of CRITICAL_PAGES.slice(0, 3)) { // Test first 3 pages
      console.log(`  📱 Testing ${pageInfo.name} on mobile...`);

      const startTime = Date.now();
      await appPage.goto(pageInfo.path);
      await appPage.waitForPageReady();
      const loadTime = Date.now() - startTime;

      // Mobile-specific checks
      await testMobileNavigation(appPage);
      await testMobileTouchTargets(appPage);
      await testMobileImageOptimization(appPage);

      console.log(`    Load time: ${loadTime}ms`);

      // Mobile performance should be reasonable
      expect.soft(loadTime, `${pageInfo.name} mobile load should be acceptable`)
        .toBeLessThan(8000); // 8 seconds for mobile
    }
  });

  test('Security Headers & HTTPS Health', async ({ appPage }) => {
    console.log('🔒 Testing security headers and HTTPS health...');

    await appPage.goto('/');

    // Get response headers
    const response = await appPage.page.goto(getBaseURL());
    const headers = response?.headers() || {};

    // Check for security headers
    const securityChecks = {
      'Content-Security-Policy': !!headers['content-security-policy'],
      'X-Frame-Options': !!headers['x-frame-options'],
      'X-Content-Type-Options': !!headers['x-content-type-options'],
      'Referrer-Policy': !!headers['referrer-policy'],
      'Permissions-Policy': !!headers['permissions-policy']
    };

    console.log('  🔐 Security Headers:');
    Object.entries(securityChecks).forEach(([header, present]) => {
      const status = present ? '✅' : '⚠️';
      console.log(`    ${status} ${header}: ${present ? 'Present' : 'Missing'}`);
    });

    // Check HTTPS enforcement
    const isHTTPS = getBaseURL().startsWith('https://');
    console.log(`  🔒 HTTPS Enforcement: ${isHTTPS ? '✅ Enabled' : '❌ Disabled'}`);

    // Soft assertions for security
    expect.soft(isHTTPS, 'Site should enforce HTTPS in production').toBe(true);
  });

  test('Generate Comprehensive Health Report', async () => {
    // Finalize health report
    healthReport.issues.brokenLinks = brokenLinks;
    healthReport.issues.failedRequests = failedRequests;
    healthReport.issues.jsErrors = jsErrors;
    healthReport.pageResults = pageResults;

    // Calculate summary statistics
    healthReport.summary.brokenLinks = brokenLinks.length;
    healthReport.summary.failedRequests = failedRequests.length;
    healthReport.summary.jsErrors = jsErrors.length;
    healthReport.summary.totalIssues = brokenLinks.length + failedRequests.length + jsErrors.length;

    // Calculate health score (0-100)
    healthReport.summary.healthScore = calculateHealthScore(healthReport);

    // Count critical issues
    healthReport.summary.criticalIssues = pageResults.filter(p => p.healthRating === 'critical').length;

    // Calculate average response time
    if (pageResults.length > 0) {
      healthReport.networkResilience.averageResponseTime = Math.round(
        pageResults.reduce((sum, page) => sum + page.loadTime, 0) / pageResults.length
      );
    }

    // Save comprehensive JSON report
    const reportPath = join('test-results', 'health-report.json');
    writeFileSync(reportPath, JSON.stringify(healthReport, null, 2));

    // Generate HTML health report
    await generateHTMLHealthReport(healthReport);

    // Display comprehensive health summary
    console.log('\n' + '='.repeat(80));
    console.log('🏥 SITE HEALTH & RELIABILITY SUMMARY');
    console.log('='.repeat(80));
    console.log(`📅 Timestamp: ${healthReport.timestamp}`);
    console.log(`🌐 Base URL: ${healthReport.baseUrl}`);
    console.log(`📊 Pages Checked: ${healthReport.summary.pagesChecked}`);
    console.log(`🏥 Health Score: ${healthReport.summary.healthScore}/100`);
    console.log(`⚠️ Total Issues: ${healthReport.summary.totalIssues}`);
    console.log(`❌ Critical Issues: ${healthReport.summary.criticalIssues}`);
    console.log(`⏱️ Avg Response: ${healthReport.networkResilience.averageResponseTime}ms`);
    console.log('');

    // Issue breakdown
    if (healthReport.summary.brokenLinks > 0) {
      console.log(`🔗 BROKEN LINKS: ${healthReport.summary.brokenLinks}`);
      brokenLinks.slice(0, 5).forEach(link => {
        console.log(`  • ${link.status} ${link.resourceType}: ${link.url}`);
      });
      if (brokenLinks.length > 5) {
        console.log(`  ... and ${brokenLinks.length - 5} more`);
      }
      console.log('');
    }

    if (healthReport.summary.failedRequests > 0) {
      console.log(`❌ NETWORK FAILURES: ${healthReport.summary.failedRequests}`);
      failedRequests.slice(0, 5).forEach(req => {
        console.log(`  • ${req.resourceType}: ${req.error} - ${req.url}`);
      });
      if (failedRequests.length > 5) {
        console.log(`  ... and ${failedRequests.length - 5} more`);
      }
      console.log('');
    }

    if (healthReport.summary.jsErrors > 0) {
      console.log(`🐛 JAVASCRIPT ERRORS: ${healthReport.summary.jsErrors}`);
      jsErrors.slice(0, 3).forEach(error => {
        console.log(`  • ${error}`);
      });
      if (jsErrors.length > 3) {
        console.log(`  ... and ${jsErrors.length - 3} more`);
      }
      console.log('');
    }

    // Page-by-page health breakdown
    console.log('📄 PAGE HEALTH BREAKDOWN:');
    pageResults.forEach(page => {
      const status = page.healthRating === 'excellent' ? '🌟' :
                    page.healthRating === 'good' ? '✅' :
                    page.healthRating === 'needs-attention' ? '⚠️' : '❌';

      console.log(`  ${status} ${page.name}: ${page.healthRating.toUpperCase()}`);
      console.log(`      Status: ${page.status} | Load: ${page.loadTime}ms | Issues: ${page.issues}`);
    });

    console.log('');
    console.log('📊 REPORTS GENERATED:');
    console.log(`  • JSON Report: ${reportPath}`);
    console.log(`  • HTML Report: test-results/health-report.html`);
    console.log('='.repeat(80));

    // Final health verdict
    if (healthReport.summary.healthScore >= 95) {
      console.log('🌟 EXCELLENT! Your site is in outstanding health.');
    } else if (healthReport.summary.healthScore >= 85) {
      console.log('✅ Good site health with minor optimizations needed.');
    } else if (healthReport.summary.healthScore >= 70) {
      console.log('⚠️ Site health needs attention. Address key issues.');
    } else {
      console.log('❌ Critical site health issues require immediate attention.');
    }

    // Assertions
    expect.soft(healthReport.summary.totalIssues,
      `Site health issues found: ${healthReport.summary.brokenLinks} broken links, ${healthReport.summary.failedRequests} failed requests, ${healthReport.summary.jsErrors} JS errors`
    ).toBeLessThan(10);

    expect.soft(healthReport.summary.criticalIssues,
      `Critical page failures: ${healthReport.summary.criticalIssues} pages in critical state`
    ).toBe(0);

    expect.soft(healthReport.summary.healthScore,
      `Site health score should be good: ${healthReport.summary.healthScore}/100`
    ).toBeGreaterThanOrEqual(70);

    // Hard fail only for critical health issues
    expect(healthReport.summary.criticalIssues,
      `Critical site health failures: ${healthReport.summary.criticalIssues} critical issues`
    ).toBe(0);
  });
});

// Test internal link integrity
async function testInternalLinkIntegrity(appPage: any, pageName: string): Promise<number> {
  console.log(`  🔗 Testing internal links for ${pageName}...`);

  const links = await appPage.page.locator('a[href^="/"], a[href^="' + getBaseURL() + '"]').all();
  let issueCount = 0;

  console.log(`    Found ${links.length} internal links to test`);

  for (const link of links.slice(0, 20)) { // Test first 20 links
    try {
      const href = await link.getAttribute('href');
      const linkText = (await link.textContent())?.trim() || 'No text';

      if (!href) continue;

      // Construct full URL for internal links
      const linkUrl = href.startsWith('/') ? `${getBaseURL()}${href}` : href;

      // Skip anchor links and javascript links
      if (href.startsWith('#') || href.startsWith('javascript:')) continue;

      // Test internal links with HEAD request for efficiency
      const response = await appPage.page.request.head(linkUrl, { timeout: 10000 });

      if (response.status() >= 400) {
        console.log(`    ❌ Broken: ${response.status()} ${href} ("${linkText}")`);
        issueCount++;

        // Add detailed broken link info
        brokenLinks.push({
          url: href,
          status: response.status(),
          sourceUrl: appPage.page.url(),
          resourceType: 'document',
          element: 'a',
          linkText
        });
      }
    } catch (error) {
      console.log(`    ⚠️ Link test failed: ${error}`);
      issueCount++;
    }
  }

  console.log(`    Link integrity: ${issueCount} issues found`);
  return issueCount;
}

// Test image integrity and optimization
async function testImageIntegrity(appPage: any, pageName: string): Promise<number> {
  console.log(`  🖼️ Testing image integrity for ${pageName}...`);

  const images = await appPage.page.locator('img[src]').all();
  let issueCount = 0;

  console.log(`    Found ${images.length} images to verify`);

  for (const img of images.slice(0, 15)) { // Test first 15 images
    try {
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt') || 'No alt text';

      if (!src) continue;

      // Verify image loads and has dimensions
      await expect.soft(img, `Image "${alt}" should be visible`).toBeVisible({ timeout: 5000 });

      const dimensions = await img.evaluate((el: HTMLImageElement) => ({
        naturalWidth: el.naturalWidth,
        naturalHeight: el.naturalHeight,
        displayWidth: el.width,
        displayHeight: el.height
      }));

      if (dimensions.naturalWidth === 0) {
        console.log(`    ❌ Failed to load: ${src}`);
        issueCount++;
      } else {
        // Check for severely oversized images (performance issue)
        if (dimensions.naturalWidth > dimensions.displayWidth * 2) {
          console.log(`    ⚠️ Oversized: ${src} (${dimensions.naturalWidth}x${dimensions.naturalHeight} → ${dimensions.displayWidth}x${dimensions.displayHeight})`);
          issueCount++;
        }
      }
    } catch (error) {
      console.log(`    ⚠️ Image test failed: ${error}`);
      issueCount++;
    }
  }

  console.log(`    Image integrity: ${issueCount} issues found`);
  return issueCount;
}

// Test critical assets (CSS, JS, fonts)
async function testCriticalAssets(appPage: any, pageName: string): Promise<number> {
  console.log(`  📦 Testing critical assets for ${pageName}...`);

  let issueCount = 0;

  // Test stylesheets
  const stylesheets = await appPage.page.locator('link[rel="stylesheet"]').all();
  for (const stylesheet of stylesheets.slice(0, 5)) { // Test first 5
    const href = await stylesheet.getAttribute('href');
    if (href) {
      try {
        const response = await appPage.page.request.head(href.startsWith('/') ? `${getBaseURL()}${href}` : href);
        if (response.status() >= 400) {
          console.log(`    ❌ CSS failed: ${response.status()} ${href}`);
          issueCount++;
        }
      } catch (error) {
        console.log(`    ⚠️ CSS test failed: ${href}`);
        issueCount++;
      }
    }
  }

  // Test external scripts (skip inline)
  const scripts = await appPage.page.locator('script[src]').all();
  for (const script of scripts.slice(0, 5)) { // Test first 5
    const src = await script.getAttribute('src');
    if (src && !src.includes('googleapis.com') && !src.includes('vercel.live')) {
      try {
        const response = await appPage.page.request.head(src.startsWith('/') ? `${getBaseURL()}${src}` : src);
        if (response.status() >= 400) {
          console.log(`    ❌ JS failed: ${response.status()} ${src}`);
          issueCount++;
        }
      } catch (error) {
        console.log(`    ⚠️ JS test failed: ${src}`);
        issueCount++;
      }
    }
  }

  console.log(`    Critical assets: ${issueCount} issues found`);
  return issueCount;
}

// Perform critical page-specific checks
async function performCriticalPageChecks(appPage: any, pageInfo: any): Promise<number> {
  console.log(`  🎯 Critical checks for ${pageInfo.name}...`);

  let issueCount = 0;

  // Homepage-specific checks
  if (pageInfo.path === '/') {
    const hasMainHeading = await appPage.page.locator('h1').count() > 0;
    const hasNavigation = await appPage.page.locator('nav').count() > 0;
    const hasCTA = await appPage.page.locator('button, a[href*="contact"], a[href*="book"]').count() > 0;

    if (!hasMainHeading) {
      console.log(`    ❌ Missing main heading (h1)`);
      issueCount++;
    }
    if (!hasNavigation) {
      console.log(`    ❌ Missing navigation`);
      issueCount++;
    }
    if (!hasCTA) {
      console.log(`    ❌ Missing call-to-action`);
      issueCount++;
    }
  }

  // Contact page-specific checks
  if (pageInfo.path === '/contact') {
    const hasForm = await appPage.page.locator('form').count() > 0;
    const hasEmail = await appPage.page.locator('[href^="mailto:"]').count() > 0;

    if (!hasForm && !hasEmail) {
      console.log(`    ❌ Missing contact method`);
      issueCount++;
    }
  }

  // Services page-specific checks
  if (pageInfo.path === '/services') {
    const hasServiceList = await appPage.page.locator('ul, ol, .service, .services').count() > 0;

    if (!hasServiceList) {
      console.log(`    ❌ Missing service information`);
      issueCount++;
    }
  }

  console.log(`    Critical checks: ${issueCount} issues found`);
  return issueCount;
}

// Test navigation integrity
async function testNavigationIntegrity(appPage: any) {
  const navLinks = await appPage.page.locator('nav a, header a').all();
  let working = 0;
  let broken = 0;

  for (const link of navLinks.slice(0, 10)) { // Test first 10 nav links
    try {
      const href = await link.getAttribute('href');
      if (href && href.startsWith('/') && href !== '#') {
        const response = await appPage.page.request.head(`${getBaseURL()}${href}`, { timeout: 5000 });
        if (response.status() < 400) {
          working++;
        } else {
          broken++;
        }
      }
    } catch (error) {
      broken++;
    }
  }

  return { totalTested: working + broken, working, broken };
}

// Test mobile navigation
async function testMobileNavigation(appPage: any) {
  // Check for mobile menu toggle
  const mobileMenuButton = appPage.page.locator('button[aria-label*="menu"], .hamburger, .mobile-menu-toggle');
  const hasMobileMenu = await mobileMenuButton.count() > 0;

  if (hasMobileMenu) {
    await mobileMenuButton.first().click();
    // Check if mobile menu opened
    const mobileNav = appPage.page.locator('nav[aria-expanded="true"], .mobile-menu.open, nav.open');
    await expect.soft(mobileNav.first()).toBeVisible({ timeout: 2000 });
  }
}

// Test mobile touch targets
async function testMobileTouchTargets(appPage: any) {
  const buttons = await appPage.page.locator('button, a').all();

  for (const button of buttons.slice(0, 10)) { // Test first 10
    const box = await button.boundingBox();
    if (box && (box.width < 44 || box.height < 44)) {
      console.log(`    ⚠️ Small touch target: ${box.width}x${box.height}px`);
    }
  }
}

// Test mobile image optimization
async function testMobileImageOptimization(appPage: any) {
  const images = await appPage.page.locator('img').all();

  for (const img of images.slice(0, 5)) { // Test first 5
    const src = await img.getAttribute('src');
    if (src && src.includes('?') && (src.includes('w=') || src.includes('width='))) {
      // Image has responsive parameters
      console.log(`    ✅ Responsive image: ${src}`);
    }
  }
}

// Get page health rating
function getPageHealthRating(issues: number, loadTime: number): 'excellent' | 'good' | 'needs-attention' | 'critical' {
  if (issues === 0 && loadTime < 2000) return 'excellent';
  if (issues <= 2 && loadTime < 5000) return 'good';
  if (issues <= 5 && loadTime < 10000) return 'needs-attention';
  return 'critical';
}

// Calculate overall health score
function calculateHealthScore(report: HealthReport): number {
  let score = 100;

  // Deduct points for issues
  score -= report.summary.brokenLinks * 5;      // -5 points per broken link
  score -= report.summary.failedRequests * 3;  // -3 points per failed request
  score -= report.summary.jsErrors * 2;        // -2 points per JS error

  // Deduct points for slow pages
  const slowPages = report.pageResults.filter(p => p.loadTime > 5000).length;
  score -= slowPages * 10; // -10 points per slow page

  // Deduct points for critical issues
  score -= report.summary.criticalIssues * 20; // -20 points per critical page

  return Math.max(0, Math.min(100, score));
}

// Generate HTML health report
async function generateHTMLHealthReport(report: HealthReport) {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Site Health & Reliability Report</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .summary { background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; }
    .excellent { color: #15803d; background: #f0fdf4; }
    .good { color: #059669; background: #ecfdf5; }
    .needs-attention { color: #ea580c; background: #fffbeb; }
    .critical { color: #dc2626; background: #fef2f2; }
    .health-card { border: 1px solid #e5e7eb; border-radius: 6px; padding: 1rem; margin: 1rem 0; }
    .score-circle { display: inline-block; width: 60px; height: 60px; border-radius: 50%; text-align: center; line-height: 60px; color: white; font-weight: bold; }
    .score-excellent { background: #15803d; }
    .score-good { background: #059669; }
    .score-needs-attention { background: #ea580c; }
    .score-critical { background: #dc2626; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { text-align: left; padding: 0.75rem; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; }
  </style>
</head>
<body>
  <h1>Site Health & Reliability Report</h1>

  <div class="summary">
    <h2>Health Overview</h2>
    <div style="display: flex; align-items: center; margin: 1rem 0;">
      <div class="score-circle score-${report.summary.healthScore >= 95 ? 'excellent' : report.summary.healthScore >= 85 ? 'good' : report.summary.healthScore >= 70 ? 'needs-attention' : 'critical'}">${report.summary.healthScore}</div>
      <div style="margin-left: 1rem;">
        <h3 style="margin: 0;">Overall Health Score: ${report.summary.healthScore}/100</h3>
        <p style="margin: 0.5rem 0;"><strong>Generated:</strong> ${report.timestamp}</p>
        <p style="margin: 0;"><strong>Base URL:</strong> ${report.baseUrl}</p>
      </div>
    </div>

    <table>
      <tr><th>Metric</th><th>Count</th></tr>
      <tr><td>Pages Checked</td><td>${report.summary.pagesChecked}</td></tr>
      <tr><td>Total Issues</td><td>${report.summary.totalIssues}</td></tr>
      <tr><td>Critical Issues</td><td class="critical">${report.summary.criticalIssues}</td></tr>
      <tr><td>Broken Links</td><td>${report.summary.brokenLinks}</td></tr>
      <tr><td>Failed Requests</td><td>${report.summary.failedRequests}</td></tr>
      <tr><td>JavaScript Errors</td><td>${report.summary.jsErrors}</td></tr>
      <tr><td>Avg Response Time</td><td>${report.networkResilience.averageResponseTime}ms</td></tr>
    </table>
  </div>

  <h2>Page Health Results</h2>
  ${report.pageResults.map(page => `
    <div class="health-card ${page.healthRating}">
      <h3>${page.name}</h3>
      <p><strong>URL:</strong> <a href="${page.url}">${page.url}</a></p>
      <p><strong>Status:</strong> ${page.status} | <strong>Load Time:</strong> ${page.loadTime}ms</p>
      <p><strong>Health Rating:</strong> ${page.healthRating.toUpperCase()} | <strong>Issues:</strong> ${page.issues}</p>
    </div>
  `).join('')}

  <h2>Issue Breakdown</h2>
  ${report.issues.brokenLinks.length > 0 ? `
    <div class="health-card">
      <h3>Broken Links (${report.issues.brokenLinks.length})</h3>
      ${report.issues.brokenLinks.slice(0, 10).map(link => `
        <p><strong>${link.status}</strong> ${link.resourceType}: ${link.url}</p>
      `).join('')}
      ${report.issues.brokenLinks.length > 10 ? `<p>... and ${report.issues.brokenLinks.length - 10} more</p>` : ''}
    </div>
  ` : ''}

  ${report.issues.failedRequests.length > 0 ? `
    <div class="health-card">
      <h3>Failed Requests (${report.issues.failedRequests.length})</h3>
      ${report.issues.failedRequests.slice(0, 10).map(req => `
        <p><strong>${req.resourceType}</strong>: ${req.error} - ${req.url}</p>
      `).join('')}
      ${report.issues.failedRequests.length > 10 ? `<p>... and ${report.issues.failedRequests.length - 10} more</p>` : ''}
    </div>
  ` : ''}

  <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb; text-align: center;">
    <p>Generated by Playwright Site Health Monitoring | ${new Date().toISOString()}</p>
  </footer>
</body>
</html>`;

  writeFileSync('test-results/health-report.html', htmlContent);
}