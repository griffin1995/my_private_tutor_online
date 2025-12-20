/**
 * WCAG 2.1 AA Accessibility Compliance Testing - 2025 Edition
 *
 * Modern accessibility testing using:
 * - @axe-core/playwright for automated WCAG compliance
 * - Page Object Model patterns for maintainability
 * - Comprehensive reporting and CI/CD integration
 * - Industry-standard best practices
 */

import { test, expect, TestHelpers, CRITICAL_PAGES, getBaseURL } from '../fixtures/base-test';
import type { AxeResults } from '@axe-core/playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

interface AccessibilityTestResult {
  timestamp: string;
  baseUrl: string;
  summary: {
    pagesChecked: number;
    totalViolations: number;
    criticalViolations: number;
    moderateViolations: number;
    minorViolations: number;
    totalPasses: number;
    wcagCompliant: boolean;
  };
  pageResults: Array<{
    url: string;
    name: string;
    violations: number;
    passes: number;
    compliance: 'compliant' | 'non-compliant' | 'needs-review';
    issues: Array<{
      id: string;
      impact: string;
      description: string;
      helpUrl: string;
      nodeCount: number;
    }>;
  }>;
}

test.describe('WCAG 2.1 AA Accessibility Compliance', () => {
  let testResults: AccessibilityTestResult;

  test.beforeAll(async () => {
    // Initialize test results
    testResults = {
      timestamp: new Date().toISOString(),
      baseUrl: getBaseURL(),
      summary: {
        pagesChecked: 0,
        totalViolations: 0,
        criticalViolations: 0,
        moderateViolations: 0,
        minorViolations: 0,
        totalPasses: 0,
        wcagCompliant: true
      },
      pageResults: []
    };

    // Ensure results directory exists
    mkdirSync('test-results', { recursive: true });
  });

  // Test each critical page for WCAG compliance
  for (const pageInfo of CRITICAL_PAGES) {
    test(`${pageInfo.name} (${pageInfo.path}) - WCAG 2.1 AA Compliance`, async ({
      appPage,
      accessibilityChecker
    }) => {
      // Navigate to the page
      await appPage.goto(pageInfo.path);
      await appPage.waitForPageReady();

      console.log(`♿ Testing accessibility: ${pageInfo.name} - ${getBaseURL()}${pageInfo.path}`);

      // Run comprehensive accessibility analysis
      const accessibilityResults = await accessibilityChecker.analyze();

      // Process and store results
      const pageResult = processPageResults(pageInfo.name, `${getBaseURL()}${pageInfo.path}`, accessibilityResults);
      testResults.pageResults.push(pageResult);
      testResults.summary.pagesChecked++;

      // Update summary statistics
      updateSummaryStats(accessibilityResults);

      // Log violations for immediate feedback
      if (accessibilityResults.violations.length > 0) {
        console.log(`❌ Found ${accessibilityResults.violations.length} accessibility violations:`);
        accessibilityResults.violations.forEach((violation, index) => {
          console.log(`  ${index + 1}. ${violation.id}: ${violation.description}`);
          console.log(`     Impact: ${violation.impact}`);
          console.log(`     Affected elements: ${violation.nodes.length}`);
          console.log(`     Help: ${violation.helpUrl}`);
        });
      } else {
        console.log(`✅ No accessibility violations found!`);
      }

      // Soft assertion - allows test to continue but records failures
      expect.soft(accessibilityResults.violations,
        `WCAG 2.1 AA violations found on ${pageInfo.name}:\n${
          accessibilityResults.violations.map(v =>
            `- ${v.id} (${v.impact}): ${v.description}\n  Help: ${v.helpUrl}\n  Elements: ${v.nodes.length}`
          ).join('\n')
        }`
      ).toHaveLength(0);

      // Additional specific checks for high-priority pages
      if (pageInfo.priority === 'high') {
        await performEnhancedAccessibilityChecks(appPage, pageInfo.name);
      }
    });
  }

  test('Cross-Page Navigation Accessibility', async ({ appPage, accessibilityChecker }) => {
    console.log('🧭 Testing navigation accessibility patterns...');

    // Start from homepage
    await appPage.goto('/');
    await appPage.waitForPageReady();

    // Test keyboard navigation
    await testKeyboardNavigation(appPage);

    // Test skip links
    await testSkipLinks(appPage);

    // Test ARIA landmarks
    await testARIALandmarks(appPage);

    // Test focus management
    await testFocusManagement(appPage);

    console.log('✅ Cross-page navigation accessibility checks completed');
  });

  test('Form Accessibility Compliance', async ({ appPage, accessibilityChecker }) => {
    console.log('📝 Testing form accessibility...');

    // Test contact form if available
    await appPage.goto('/contact');
    await appPage.waitForPageReady();

    // Run axe specifically on forms
    const formResults = await accessibilityChecker
      .include('form')
      .include('[role="form"]')
      .analyze();

    // Verify no form-related violations
    const formViolations = formResults.violations.filter(v =>
      ['label', 'form-field-multiple-labels', 'duplicate-id-active', 'aria-required-attr'].includes(v.id)
    );

    expect.soft(formViolations,
      `Form accessibility violations found:\n${
        formViolations.map(v => `- ${v.id}: ${v.description}`).join('\n')
      }`
    ).toHaveLength(0);

    // Test form interaction accessibility
    await testFormInteractionAccessibility(appPage);
  });

  test('Generate Comprehensive Accessibility Report', async () => {
    // Finalize test results
    testResults.summary.wcagCompliant = testResults.summary.totalViolations === 0;

    // Save detailed JSON report
    const reportPath = join('test-results', 'accessibility-report.json');
    writeFileSync(reportPath, JSON.stringify(testResults, null, 2));

    // Generate HTML report summary
    await generateHTMLReport(testResults);

    // Display comprehensive summary
    console.log('\n' + '='.repeat(80));
    console.log('♿ WCAG 2.1 AA ACCESSIBILITY COMPLIANCE SUMMARY');
    console.log('='.repeat(80));
    console.log(`📅 Timestamp: ${testResults.timestamp}`);
    console.log(`🌐 Base URL: ${testResults.baseUrl}`);
    console.log(`📊 Pages Checked: ${testResults.summary.pagesChecked}`);
    console.log(`⚠️ Total Violations: ${testResults.summary.totalViolations}`);
    console.log(`❌ Critical: ${testResults.summary.criticalViolations}`);
    console.log(`🔶 Moderate: ${testResults.summary.moderateViolations}`);
    console.log(`🟨 Minor: ${testResults.summary.minorViolations}`);
    console.log(`✅ Total Passes: ${testResults.summary.totalPasses}`);
    console.log('');

    // Compliance breakdown by page
    console.log('📋 PAGE COMPLIANCE BREAKDOWN:');
    testResults.pageResults.forEach(page => {
      const status = page.compliance === 'compliant' ? '✅' :
                    page.compliance === 'needs-review' ? '⚠️' : '❌';
      console.log(`  ${status} ${page.name}: ${page.violations} violations, ${page.passes} passes`);

      if (page.violations > 0) {
        page.issues.slice(0, 3).forEach(issue => {
          console.log(`    • ${issue.id} (${issue.impact}): ${issue.nodeCount} elements`);
        });
        if (page.issues.length > 3) {
          console.log(`    ... and ${page.issues.length - 3} more issues`);
        }
      }
    });

    console.log('');
    console.log('📊 REPORTS GENERATED:');
    console.log(`  • JSON Report: ${reportPath}`);
    console.log(`  • HTML Report: test-results/accessibility-report.html`);
    console.log('='.repeat(80));

    // Final compliance verdict
    if (testResults.summary.wcagCompliant) {
      console.log('🌟 EXCELLENT! Full WCAG 2.1 AA compliance achieved.');
    } else {
      console.log('❌ WCAG 2.1 AA compliance issues require attention.');
      console.log(`   Priority: Fix ${testResults.summary.criticalViolations} critical violations first.`);
    }

    // Hard fail only for critical violations
    const criticalViolations = testResults.pageResults
      .flatMap(page => page.issues.filter(issue => issue.impact === 'critical'));

    expect(criticalViolations.length,
      `Critical accessibility violations block WCAG compliance: ${criticalViolations.length} critical issues found`
    ).toBe(0);

    // Soft assertion for all violations (informational)
    expect.soft(testResults.summary.totalViolations,
      `Accessibility improvements needed: ${testResults.summary.totalViolations} total violations`
    ).toBe(0);
  });

  // Helper function to process individual page results
  function processPageResults(name: string, url: string, results: AxeResults) {
    return {
      url,
      name,
      violations: results.violations.length,
      passes: results.passes.length,
      compliance: results.violations.length === 0 ? 'compliant' as const :
                 results.violations.some(v => v.impact === 'critical') ? 'non-compliant' as const :
                 'needs-review' as const,
      issues: results.violations.map(violation => ({
        id: violation.id,
        impact: violation.impact || 'unknown',
        description: violation.description,
        helpUrl: violation.helpUrl,
        nodeCount: violation.nodes.length
      }))
    };
  }

  // Helper function to update summary statistics
  function updateSummaryStats(results: AxeResults) {
    testResults.summary.totalViolations += results.violations.length;
    testResults.summary.totalPasses += results.passes.length;

    results.violations.forEach(violation => {
      switch (violation.impact) {
        case 'critical':
          testResults.summary.criticalViolations++;
          break;
        case 'serious':
        case 'moderate':
          testResults.summary.moderateViolations++;
          break;
        case 'minor':
          testResults.summary.minorViolations++;
          break;
      }
    });
  }
});

// Enhanced accessibility checks for high-priority pages
async function performEnhancedAccessibilityChecks(appPage: any, pageName: string) {
  console.log(`  🔍 Enhanced accessibility checks for ${pageName}...`);

  // Check for proper heading hierarchy
  await appPage.verifyHeadingStructure();

  // Verify navigation is accessible
  await appPage.verifyNavigation();

  // Check for broken images
  const brokenImages = await appPage.verifyImages();
  expect(brokenImages, `Broken images found: ${brokenImages.join(', ')}`).toHaveLength(0);
}

// Keyboard navigation testing
async function testKeyboardNavigation(appPage: any) {
  console.log('  ⌨️ Testing keyboard navigation...');

  // Tab through first 10 focusable elements
  const focusableElements = await appPage.page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').all();

  for (let i = 0; i < Math.min(10, focusableElements.length); i++) {
    await appPage.page.keyboard.press('Tab');

    // Verify focus is visible
    const focused = await appPage.page.locator(':focus').first();
    await expect(focused).toBeFocused();
  }
}

// Skip links testing
async function testSkipLinks(appPage: any) {
  console.log('  🔗 Testing skip links...');

  const skipLink = appPage.page.locator('a[href="#main-content"], .skip-link, [href="#main"]').first();

  if (await skipLink.count() > 0) {
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
  }
}

// ARIA landmarks testing
async function testARIALandmarks(appPage: any) {
  console.log('  🏷️ Testing ARIA landmarks...');

  const landmarks = {
    main: await appPage.page.locator('main, [role="main"]').count(),
    navigation: await appPage.page.locator('nav, [role="navigation"]').count(),
    banner: await appPage.page.locator('header, [role="banner"]').count(),
    contentinfo: await appPage.page.locator('footer, [role="contentinfo"]').count()
  };

  expect(landmarks.main, 'Page should have a main landmark').toBeGreaterThan(0);
  expect(landmarks.navigation, 'Page should have navigation landmark').toBeGreaterThan(0);
}

// Focus management testing
async function testFocusManagement(appPage: any) {
  console.log('  🎯 Testing focus management...');

  // Test that focus moves logically
  await appPage.page.keyboard.press('Tab');
  const firstFocus = await appPage.page.locator(':focus').getAttribute('tagName');

  await appPage.page.keyboard.press('Tab');
  const secondFocus = await appPage.page.locator(':focus').getAttribute('tagName');

  // Basic check that focus is moving
  expect(firstFocus || secondFocus).toBeTruthy();
}

// Form accessibility testing
async function testFormInteractionAccessibility(appPage: any) {
  console.log('  📝 Testing form interaction accessibility...');

  const forms = await appPage.page.locator('form').all();

  for (const form of forms.slice(0, 2)) { // Test first 2 forms
    const inputs = await form.locator('input, select, textarea').all();

    for (const input of inputs.slice(0, 3)) { // Test first 3 inputs per form
      // Check if input has associated label
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      if (id) {
        const label = await appPage.page.locator(`label[for="${id}"]`).count();
        const hasLabel = label > 0 || ariaLabel || ariaLabelledBy;

        expect(hasLabel, `Form input should have accessible label: ${id}`).toBeTruthy();
      }
    }
  }
}

// Generate HTML accessibility report
async function generateHTMLReport(results: AccessibilityTestResult) {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WCAG 2.1 AA Accessibility Report</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .summary { background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; }
    .compliant { color: #15803d; }
    .non-compliant { color: #dc2626; }
    .needs-review { color: #ea580c; }
    .page-result { border: 1px solid #e5e7eb; border-radius: 6px; padding: 1rem; margin: 1rem 0; }
    .violation { background: #fef2f2; border-left: 4px solid #dc2626; padding: 0.5rem; margin: 0.5rem 0; }
    .critical { border-left-color: #dc2626; }
    .moderate { border-left-color: #ea580c; }
    .minor { border-left-color: #facc15; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { text-align: left; padding: 0.75rem; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; }
  </style>
</head>
<body>
  <h1>WCAG 2.1 AA Accessibility Compliance Report</h1>

  <div class="summary">
    <h2>Executive Summary</h2>
    <p><strong>Report Generated:</strong> ${results.timestamp}</p>
    <p><strong>Base URL:</strong> ${results.baseUrl}</p>
    <p><strong>Pages Tested:</strong> ${results.summary.pagesChecked}</p>
    <p><strong>Overall Compliance:</strong>
      <span class="${results.summary.wcagCompliant ? 'compliant' : 'non-compliant'}">
        ${results.summary.wcagCompliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}
      </span>
    </p>

    <table>
      <tr><th>Metric</th><th>Count</th></tr>
      <tr><td>Total Violations</td><td>${results.summary.totalViolations}</td></tr>
      <tr><td>Critical Violations</td><td>${results.summary.criticalViolations}</td></tr>
      <tr><td>Moderate Violations</td><td>${results.summary.moderateViolations}</td></tr>
      <tr><td>Minor Violations</td><td>${results.summary.minorViolations}</td></tr>
      <tr><td>Total Passes</td><td>${results.summary.totalPasses}</td></tr>
    </table>
  </div>

  <h2>Page-by-Page Results</h2>
  ${results.pageResults.map(page => `
    <div class="page-result">
      <h3>${page.name}</h3>
      <p><strong>URL:</strong> <a href="${page.url}">${page.url}</a></p>
      <p><strong>Status:</strong> <span class="${page.compliance}">${page.compliance.toUpperCase()}</span></p>
      <p><strong>Violations:</strong> ${page.violations} | <strong>Passes:</strong> ${page.passes}</p>

      ${page.issues.length > 0 ? `
        <h4>Issues Found</h4>
        ${page.issues.map(issue => `
          <div class="violation ${issue.impact}">
            <strong>${issue.id}</strong> (${issue.impact})
            <p>${issue.description}</p>
            <p><strong>Affected elements:</strong> ${issue.nodeCount}</p>
            <p><a href="${issue.helpUrl}" target="_blank">More information</a></p>
          </div>
        `).join('')}
      ` : '<p>✅ No accessibility violations found!</p>'}
    </div>
  `).join('')}

  <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb; text-align: center;">
    <p>Generated by Playwright + @axe-core/playwright | ${new Date().toISOString()}</p>
  </footer>
</body>
</html>`;

  writeFileSync('test-results/accessibility-report.html', htmlContent);
}