#!/usr/bin/env node

// CONTEXT7 SOURCE: /node.js/api - Node.js script execution patterns for automated testing
// QA Validation Script for CLIENT_FEEDBACK_WEBSITE_REVISIONS.md implementation

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
}

const log = (message, color = 'white') => {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

const logSection = (title) => {
  console.log('\n' + '='.repeat(60))
  log(`  ${title}`, 'cyan')
  console.log('='.repeat(60))
}

const logSubsection = (title) => {
  console.log('\n' + '-'.repeat(40))
  log(`${title}`, 'blue')
  console.log('-'.repeat(40))
}

// Test execution helper
const runCommand = (command, description) => {
  log(`🔄 ${description}...`, 'yellow')
  try {
    const output = execSync(command, { 
      stdio: 'pipe',
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    })
    log(`✅ ${description} - PASSED`, 'green')
    return { success: true, output }
  } catch (error) {
    log(`❌ ${description} - FAILED`, 'red')
    log(`Error: ${error.message}`, 'red')
    return { success: false, error: error.message, output: error.stdout }
  }
}

// Main QA validation function
async function runQAValidation() {
  logSection('MY PRIVATE TUTOR ONLINE - QA VALIDATION')
  log('CLIENT_FEEDBACK_WEBSITE_REVISIONS.md Implementation Testing', 'magenta')
  log('Royal Client Standards - Monday Delivery Validation', 'magenta')
  
  const results = {
    critical: [],
    functional: [],
    performance: [],
    accessibility: [],
    overall: { passed: 0, failed: 0 }
  }
  
  // Tier 1: Critical Revenue Protection Tests
  logSection('TIER 1: CRITICAL TESTS - REVENUE PROTECTION')
  
  logSubsection('Stripe Payment Integration Validation')
  const stripeTest = runCommand(
    'npx playwright test tests/critical/stripe-payment-validation.test.ts --reporter=line',
    'Stripe Payment Links Validation'
  )
  results.critical.push({ name: 'Stripe Payments', ...stripeTest })
  
  logSubsection('Navigation System Compliance')
  const navTest = runCommand(
    'npx playwright test tests/critical/navigation-validation.test.ts --reporter=line',
    'Navigation Menu Reordering Validation'
  )
  results.critical.push({ name: 'Navigation System', ...navTest })
  
  logSubsection('Content Accuracy Verification')
  const contentTest = runCommand(
    'npx playwright test tests/critical/content-accuracy-validation.test.ts --reporter=line',
    'Beth\\'s Copy Requirements Validation'
  )
  results.critical.push({ name: 'Content Accuracy', ...contentTest })
  
  // Tier 2: Functional Testing
  logSection('TIER 2: FUNCTIONAL TESTS')
  
  logSubsection('Critical User Journeys')
  const journeyTest = runCommand(
    'npx playwright test tests/e2e/critical-user-journeys.spec.ts --reporter=line',
    'Royal Client User Journey Validation'
  )
  results.functional.push({ name: 'User Journeys', ...journeyTest })
  
  logSubsection('Homepage Functionality')
  const homepageTest = runCommand(
    'npx playwright test tests/e2e/homepage.spec.ts --reporter=line',
    'Homepage Core Functionality'
  )
  results.functional.push({ name: 'Homepage', ...homepageTest })
  
  // Tier 3: Performance Testing
  logSection('TIER 3: PERFORMANCE VALIDATION')
  
  logSubsection('Load Time and Core Web Vitals')
  const perfTest = runCommand(
    'npx playwright test tests/integration/performance.test.ts --reporter=line',
    'Performance Regression Prevention'
  )
  results.performance.push({ name: 'Performance', ...perfTest })
  
  logSubsection('Build Performance Validation')
  const buildStart = Date.now()
  const buildTest = runCommand(
    'npm run build',
    'Build Time Validation (<25s target)'
  )
  const buildTime = (Date.now() - buildStart) / 1000
  
  if (buildTest.success) {
    if (buildTime < 25) {
      log(`⚡ Build completed in ${buildTime.toFixed(1)}s (target: <25s)`, 'green')
      results.performance.push({ name: 'Build Time', success: true, buildTime })
    } else {
      log(`⚠️ Build took ${buildTime.toFixed(1)}s (exceeds 25s target)`, 'yellow')
      results.performance.push({ name: 'Build Time', success: false, buildTime })
    }
  } else {
    results.performance.push({ name: 'Build Time', success: false })
  }
  
  // Tier 4: Accessibility Testing
  logSection('TIER 4: ACCESSIBILITY COMPLIANCE')
  
  logSubsection('Basic Accessibility Validation')
  const a11yTest = runCommand(
    'npx playwright test tests/e2e/accessibility.spec.ts --reporter=line',
    'WCAG 2.1 AA Compliance Check'
  )
  results.accessibility.push({ name: 'Accessibility', ...a11yTest })
  
  // Unit Tests (if they exist)
  logSubsection('Unit Test Suite')
  const unitTest = runCommand(
    'npm test -- --passWithNoTests',
    'Component and Logic Unit Tests'
  )
  results.functional.push({ name: 'Unit Tests', ...unitTest })
  
  // Generate Results Summary
  logSection('QA VALIDATION RESULTS SUMMARY')
  
  const allTests = [
    ...results.critical,
    ...results.functional,
    ...results.performance,
    ...results.accessibility
  ]
  
  const passedTests = allTests.filter(t => t.success).length
  const failedTests = allTests.filter(t => !t.success).length
  const totalTests = allTests.length
  
  results.overall = { passed: passedTests, failed: failedTests, total: totalTests }
  
  // Critical Tests Results
  logSubsection('CRITICAL TESTS (MUST PASS)')
  results.critical.forEach(test => {
    const status = test.success ? '✅ PASS' : '❌ FAIL'
    const color = test.success ? 'green' : 'red'
    log(`  ${test.name}: ${status}`, color)
  })
  
  // Functional Tests Results
  logSubsection('FUNCTIONAL TESTS')
  results.functional.forEach(test => {
    const status = test.success ? '✅ PASS' : '❌ FAIL'
    const color = test.success ? 'green' : 'red'
    log(`  ${test.name}: ${status}`, color)
  })
  
  // Performance Tests Results
  logSubsection('PERFORMANCE TESTS')
  results.performance.forEach(test => {
    const status = test.success ? '✅ PASS' : '❌ FAIL'
    const color = test.success ? 'green' : 'red'
    log(`  ${test.name}: ${status}`, color)
    if (test.buildTime) {
      log(`    Build Time: ${test.buildTime.toFixed(1)}s`, color)
    }
  })
  
  // Accessibility Tests Results
  logSubsection('ACCESSIBILITY TESTS')
  results.accessibility.forEach(test => {
    const status = test.success ? '✅ PASS' : '❌ FAIL'
    const color = test.success ? 'green' : 'red'
    log(`  ${test.name}: ${status}`, color)
  })
  
  // Overall Summary
  logSection('DELIVERY READINESS ASSESSMENT')
  
  const criticalPassed = results.critical.every(t => t.success)
  const criticalPassRate = (results.critical.filter(t => t.success).length / results.critical.length) * 100
  const overallPassRate = (passedTests / totalTests) * 100
  
  log(`📊 Test Summary:`, 'cyan')
  log(`   Total Tests: ${totalTests}`, 'white')
  log(`   Passed: ${passedTests}`, 'green')
  log(`   Failed: ${failedTests}`, failedTests > 0 ? 'red' : 'green')
  log(`   Pass Rate: ${overallPassRate.toFixed(1)}%`, overallPassRate >= 90 ? 'green' : 'yellow')
  
  log(`\n🎯 Critical Tests Pass Rate: ${criticalPassRate.toFixed(1)}%`, criticalPassed ? 'green' : 'red')
  
  // Go/No-Go Decision
  logSection('GO/NO-GO DECISION')
  
  if (criticalPassed && overallPassRate >= 85) {
    log(`🚀 GO FOR DELIVERY`, 'green')
    log(`✅ All critical tests passed`, 'green')
    log(`✅ Overall quality meets royal client standards`, 'green')
    log(`✅ Ready for Monday delivery to Beth`, 'green')
  } else if (criticalPassed && overallPassRate >= 75) {
    log(`⚠️ CONDITIONAL GO`, 'yellow')
    log(`✅ Critical tests passed - revenue protected`, 'green')
    log(`⚠️ Some functional issues detected - address if time permits`, 'yellow')
    log(`✅ Acceptable for Monday delivery with caveats`, 'yellow')
  } else {
    log(`🛑 NO-GO - DELIVERY BLOCKED`, 'red')
    if (!criticalPassed) {
      log(`❌ Critical tests failed - revenue at risk`, 'red')
      log(`🚨 MUST fix critical issues before delivery`, 'red')
    }
    if (overallPassRate < 75) {
      log(`❌ Quality below royal client standards`, 'red')
      log(`📋 Address failing tests before delivery`, 'red')
    }
  }
  
  // Next Steps
  logSection('RECOMMENDED NEXT STEPS')
  
  if (failedTests > 0) {
    log(`📋 Failed Tests to Address:`, 'yellow')
    allTests.filter(t => !t.success).forEach(test => {
      log(`   • ${test.name}`, 'red')
    })
  }
  
  log(`\n🔄 Re-run validation: node scripts/run-qa-validation.js`, 'cyan')
  log(`📊 Detailed reports: Check playwright-report/ directory`, 'cyan')
  log(`🎯 Focus on critical tests if delivery is imminent`, 'cyan')
  
  // Save results to file
  const resultsFile = path.join(__dirname, '..', 'qa-validation-results.json')
  fs.writeFileSync(resultsFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    results,
    summary: {
      total: totalTests,
      passed: passedTests,
      failed: failedTests,
      passRate: overallPassRate,
      criticalPassRate,
      deliveryReady: criticalPassed && overallPassRate >= 85
    }
  }, null, 2))
  
  log(`\n💾 Results saved to: qa-validation-results.json`, 'blue')
  
  // Exit with appropriate code
  process.exit(criticalPassed ? 0 : 1)
}

// Handle script execution
if (require.main === module) {
  // Check if required directories exist
  const requiredDirs = ['tests/critical', 'tests/e2e', 'tests/integration']
  const missingDirs = requiredDirs.filter(dir => !fs.existsSync(dir))
  
  if (missingDirs.length > 0) {
    log(`❌ Missing test directories: ${missingDirs.join(', ')}`, 'red')
    log(`📁 Ensure all test files are properly organized`, 'yellow')
    process.exit(1)
  }
  
  // Check if Playwright is installed
  try {
    execSync('npx playwright --version', { stdio: 'pipe' })
  } catch (error) {
    log(`❌ Playwright not found. Install with: npm install @playwright/test`, 'red')
    process.exit(1)
  }
  
  // Run validation
  runQAValidation().catch(error => {
    log(`💥 Validation script failed: ${error.message}`, 'red')
    process.exit(1)
  })
}

module.exports = { runQAValidation }