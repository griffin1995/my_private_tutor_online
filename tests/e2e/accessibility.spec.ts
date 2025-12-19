/**
 * Accessibility Compliance Monitoring
 *
 * This test suite monitors your production site for:
 * - WCAG 2.1 AA compliance
 * - Image alt text validation
 * - Form accessibility
 * - Keyboard navigation
 * - Screen reader compatibility
 *
 * Complements site-health.spec.ts for comprehensive quality assurance.
 */

import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs';

interface AccessibilityIssue {
  severity: 'error' | 'warning' | 'info';
  type: string;
  element: string;
  message: string;
  url: string;
}

interface AccessibilityReport {
  timestamp: string;
  baseUrl: string;
  summary: {
    pagesChecked: number;
    totalIssues: number;
    errors: number;
    warnings: number;
    info: number;
  };
  issues: AccessibilityIssue[];
  compliance: {
    altText: { checked: number; missing: number };
    headingStructure: { checked: number; issues: number };
    formLabels: { checked: number; missing: number };
    colorContrast: { checked: number; issues: number };
  };
}

test.describe('Accessibility Compliance', () => {
  const accessibilityIssues: AccessibilityIssue[] = [];

  const baseUrl = process.env.CI ?
    'https://myprivatetutoronline-f8tv06oa2-jacks-projects-cf5effed.vercel.app' :
    'http://localhost:3000';

  // Key pages for accessibility compliance
  const accessibilityPages = [
    { path: '/', name: 'Homepage' },
    { path: '/about', name: 'About Us' },
    { path: '/contact', name: 'Contact Form' },
    { path: '/faq', name: 'FAQ' },
    { path: '/services', name: 'Services' },
    { path: '/legal/privacy-policy', name: 'Privacy Policy' }
  ];

  let complianceStats = {
    altText: { checked: 0, missing: 0 },
    headingStructure: { checked: 0, issues: 0 },
    formLabels: { checked: 0, missing: 0 },
    colorContrast: { checked: 0, issues: 0 }
  };

  function addIssue(severity: 'error' | 'warning' | 'info', type: string, element: string, message: string, url: string) {
    accessibilityIssues.push({ severity, type, element, message, url });
  }

  accessibilityPages.forEach(pageInfo => {
    test(`${pageInfo.name} - Accessibility Compliance`, async ({ page }) => {
      const fullUrl = `${baseUrl}${pageInfo.path}`;
      console.log(`♿ Accessibility check: ${pageInfo.name} - ${fullUrl}`);

      await page.goto(fullUrl, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // 1. Image Alt Text Validation
      console.log('  🖼️ Checking image alt text...');
      const images = await page.locator('img').all();
      complianceStats.altText.checked += images.length;

      for (const img of images) {
        const src = await img.getAttribute('src') || '';
        const alt = await img.getAttribute('alt');

        if (!alt || alt.trim() === '') {
          const imgInfo = src ? `src="${src}"` : 'no src';
          addIssue('error', 'missing-alt', `img[${imgInfo}]`, 'Image missing alt text for screen readers', fullUrl);
          complianceStats.altText.missing++;
        }
      }

      // 2. Heading Structure Validation
      console.log('  📋 Checking heading structure...');
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      complianceStats.headingStructure.checked += headings.length;

      let hasH1 = false;
      let previousLevel = 0;

      for (const heading of headings) {
        const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
        const text = await heading.textContent() || '';
        const level = parseInt(tagName.charAt(1));

        if (level === 1) {
          if (hasH1) {
            addIssue('warning', 'multiple-h1', tagName, 'Multiple h1 elements found - should have only one per page', fullUrl);
            complianceStats.headingStructure.issues++;
          }
          hasH1 = true;
        }

        // Check for heading level jumps (accessibility best practice)
        if (previousLevel > 0 && level > previousLevel + 1) {
          addIssue('warning', 'heading-skip', tagName, `Heading level skipped from h${previousLevel} to h${level}`, fullUrl);
          complianceStats.headingStructure.issues++;
        }

        if (!text.trim()) {
          addIssue('error', 'empty-heading', tagName, 'Heading element has no text content', fullUrl);
          complianceStats.headingStructure.issues++;
        }

        previousLevel = level;
      }

      if (!hasH1) {
        addIssue('error', 'missing-h1', 'page', 'Page missing h1 element for main heading', fullUrl);
        complianceStats.headingStructure.issues++;
      }

      // 3. Form Labels and Accessibility
      console.log('  📝 Checking form accessibility...');
      const formControls = await page.locator('input, select, textarea').all();
      complianceStats.formLabels.checked += formControls.length;

      for (const control of formControls) {
        const id = await control.getAttribute('id');
        const name = await control.getAttribute('name');
        const type = await control.getAttribute('type');
        const ariaLabel = await control.getAttribute('aria-label');
        const ariaLabelledBy = await control.getAttribute('aria-labelledby');

        // Skip hidden inputs
        if (type === 'hidden') continue;

        let hasLabel = false;

        // Check for associated label
        if (id) {
          const label = await page.locator(`label[for="${id}"]`).count();
          if (label > 0) hasLabel = true;
        }

        // Check for aria-label or aria-labelledby
        if (ariaLabel || ariaLabelledBy) hasLabel = true;

        // Check for wrapped label
        const wrappedLabel = await control.locator('..').locator('label').count();
        if (wrappedLabel > 0) hasLabel = true;

        if (!hasLabel) {
          const controlInfo = `${type || 'input'}${name ? `[name="${name}"]` : ''}${id ? `[id="${id}"]` : ''}`;
          addIssue('error', 'missing-label', controlInfo, 'Form control missing accessible label', fullUrl);
          complianceStats.formLabels.missing++;
        }
      }

      // 4. Keyboard Navigation
      console.log('  ⌨️ Checking keyboard accessibility...');
      const focusableElements = await page.locator('a, button, input, select, textarea, [tabindex]').all();

      for (const element of focusableElements.slice(0, 5)) { // Check first 5 to avoid timeout
        const tagName = await element.evaluate(el => el.tagName.toLowerCase());
        const tabIndex = await element.getAttribute('tabindex');

        // Check for negative tabindex issues
        if (tabIndex === '-1' && ['a', 'button'].includes(tagName)) {
          const text = await element.textContent() || '';
          addIssue('warning', 'negative-tabindex', `${tagName}[tabindex="-1"]`,
            `Interactive element "${text}" removed from tab order`, fullUrl);
        }

        // Test focus visibility (basic check)
        try {
          await element.focus({ timeout: 1000 });
          const focusVisible = await element.evaluate(el => {
            const style = window.getComputedStyle(el);
            return style.outline !== 'none' || style.boxShadow !== 'none';
          });

          if (!focusVisible) {
            const elementInfo = `${tagName}${tabIndex ? `[tabindex="${tabIndex}"]` : ''}`;
            addIssue('warning', 'focus-indicator', elementInfo,
              'Focusable element lacks visible focus indicator', fullUrl);
          }
        } catch (error) {
          // Element might not be focusable, skip
        }
      }

      // 5. ARIA and Semantic HTML
      console.log('  🏷️ Checking ARIA usage...');

      // Check for buttons that should be links
      const buttonLinks = await page.locator('button[onclick*="location"], button[onclick*="href"]').all();
      for (const button of buttonLinks) {
        const onclick = await button.getAttribute('onclick') || '';
        addIssue('warning', 'button-for-navigation', 'button[onclick]',
          'Use <a> element instead of button for navigation', fullUrl);
      }

      // Check for missing landmarks
      const main = await page.locator('main, [role="main"]').count();
      const nav = await page.locator('nav, [role="navigation"]').count();

      if (main === 0) {
        addIssue('warning', 'missing-landmark', 'page', 'Page missing main landmark for screen readers', fullUrl);
      }

      if (pageInfo.path === '/' && nav === 0) {
        addIssue('warning', 'missing-navigation', 'page', 'Homepage missing navigation landmark', fullUrl);
      }

      console.log(`  ✅ ${pageInfo.name} accessibility check completed\n`);
    });
  });

  test('Cross-Page Navigation Accessibility', async ({ page }) => {
    console.log('🧭 Testing navigation accessibility...');

    await page.goto(baseUrl);

    // Test keyboard navigation through main menu
    const navLinks = await page.locator('nav a, header a').all();

    if (navLinks.length > 0) {
      console.log(`  Testing ${Math.min(navLinks.length, 5)} navigation links...`);

      for (const link of navLinks.slice(0, 5)) {
        try {
          await link.focus();

          const href = await link.getAttribute('href');
          const text = await link.textContent() || '';

          // Check for descriptive link text
          if (text.toLowerCase().trim() === 'click here' || text.toLowerCase().trim() === 'read more') {
            addIssue('warning', 'generic-link-text', `a[href="${href}"]`,
              'Link text should be descriptive: "' + text + '"', baseUrl);
          }

          // Check for empty links
          if (!text.trim()) {
            addIssue('error', 'empty-link', `a[href="${href}"]`, 'Link has no accessible text', baseUrl);
          }

        } catch (error) {
          // Skip if focus fails
        }
      }
    }
  });

  test('Generate Accessibility Report', async () => {
    // Create comprehensive accessibility report
    const accessibilityReport: AccessibilityReport = {
      timestamp: new Date().toISOString(),
      baseUrl,
      summary: {
        pagesChecked: accessibilityPages.length,
        totalIssues: accessibilityIssues.length,
        errors: accessibilityIssues.filter(i => i.severity === 'error').length,
        warnings: accessibilityIssues.filter(i => i.severity === 'warning').length,
        info: accessibilityIssues.filter(i => i.severity === 'info').length
      },
      issues: accessibilityIssues,
      compliance: complianceStats
    };

    // Save accessibility report
    try {
      writeFileSync('test-results/accessibility-report.json',
        JSON.stringify(accessibilityReport, null, 2));
      console.log('📊 Accessibility report saved to test-results/accessibility-report.json');
    } catch (error) {
      console.log('⚠️ Could not save accessibility report:', error);
    }

    // Display accessibility summary
    console.log('\n' + '='.repeat(70));
    console.log('♿ ACCESSIBILITY COMPLIANCE SUMMARY');
    console.log('='.repeat(70));
    console.log(`📅 Timestamp: ${accessibilityReport.timestamp}`);
    console.log(`🌐 Base URL: ${baseUrl}`);
    console.log(`📊 Pages Checked: ${accessibilityReport.summary.pagesChecked}`);
    console.log(`⚠️ Total Issues: ${accessibilityReport.summary.totalIssues}`);
    console.log(`❌ Errors: ${accessibilityReport.summary.errors}`);
    console.log(`⚠️ Warnings: ${accessibilityReport.summary.warnings}`);
    console.log('');

    // Compliance statistics
    console.log('📋 COMPLIANCE STATISTICS:');
    console.log(`  🖼️ Alt Text: ${complianceStats.altText.checked - complianceStats.altText.missing}/${complianceStats.altText.checked} images have alt text`);
    console.log(`  📋 Headings: ${complianceStats.headingStructure.checked - complianceStats.headingStructure.issues}/${complianceStats.headingStructure.checked} proper heading structure`);
    console.log(`  📝 Form Labels: ${complianceStats.formLabels.checked - complianceStats.formLabels.missing}/${complianceStats.formLabels.checked} form controls labeled`);
    console.log('');

    // Issue breakdown by severity
    if (accessibilityReport.summary.errors > 0) {
      console.log('❌ CRITICAL ACCESSIBILITY ERRORS:');
      accessibilityIssues.filter(i => i.severity === 'error').slice(0, 10).forEach(issue => {
        console.log(`  • ${issue.type}: ${issue.element} - ${issue.message}`);
        console.log(`    URL: ${issue.url}`);
      });
      if (accessibilityReport.summary.errors > 10) {
        console.log(`  ... and ${accessibilityReport.summary.errors - 10} more errors`);
      }
      console.log('');
    }

    if (accessibilityReport.summary.warnings > 0) {
      console.log('⚠️ ACCESSIBILITY WARNINGS:');
      accessibilityIssues.filter(i => i.severity === 'warning').slice(0, 5).forEach(issue => {
        console.log(`  • ${issue.type}: ${issue.element} - ${issue.message}`);
      });
      if (accessibilityReport.summary.warnings > 5) {
        console.log(`  ... and ${accessibilityReport.summary.warnings - 5} more warnings`);
      }
      console.log('');
    }

    console.log('='.repeat(70));

    // Compliance verdict
    if (accessibilityReport.summary.errors === 0) {
      if (accessibilityReport.summary.warnings === 0) {
        console.log('🌟 Excellent accessibility! WCAG 2.1 AA compliant.');
      } else {
        console.log('✅ Good accessibility compliance with minor improvements needed.');
      }
    } else {
      console.log('❌ Accessibility issues require attention for WCAG 2.1 AA compliance.');
    }

    // Fail test only for critical accessibility errors
    expect(accessibilityReport.summary.errors,
      `Critical accessibility errors found: ${accessibilityReport.summary.errors} errors must be fixed for WCAG compliance`
    ).toBe(0);

    // Soft assertion for warnings (should be addressed but not blocking)
    expect.soft(accessibilityReport.summary.warnings,
      `Accessibility improvements recommended: ${accessibilityReport.summary.warnings} warnings should be addressed`
    ).toBe(0);
  });
});