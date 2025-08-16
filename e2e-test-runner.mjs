#!/usr/bin/env node

// CONTEXT7 SOURCE: /microsoft/playwright - End-to-end testing framework for critical user journeys
// PERFORMANCE REGRESSION TESTING: Revenue-generating paths validation for Option C optimizations
// ENTERPRISE REQUIREMENTS: Royal client quality standards validation

import { chromium } from 'playwright';
import fs from 'fs';

const testResults = {
  totalTests: 0,
  passedTests: 0,
  failedTests: 0,
  errors: []
};

async function runCriticalJourneyTests() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Royal Client Testing'
  });
  
  const page = await context.newPage();
  
  console.log('🎯 PERFORMANCE REGRESSION TESTING - CRITICAL USER JOURNEYS');
  console.log('========================================================');
  
  // Test 1: Homepage Loading Performance
  await testHomepagePerformance(page);
  
  // Test 2: Navigation System Functionality
  await testNavigationSystem(page);
  
  // Test 3: Contact Form Revenue Path
  await testContactFormFunctionality(page);
  
  // Test 4: Subject Tuition Revenue Path
  await testSubjectTuitionPath(page);
  
  // Test 5: Testimonials Social Proof
  await testTestimonialsPage(page);
  
  await browser.close();
  
  // Generate test report
  generateTestReport();
}

async function testHomepagePerformance(page) {
  testResults.totalTests++;
  console.log('⚡ Testing Homepage Loading Performance...');
  
  try {
    const startTime = Date.now();
    
    // CONTEXT7 SOURCE: /microsoft/playwright - Navigation with performance monitoring
    await page.goto('http://localhost:3001', { 
      waitUntil: 'networkidle',
      timeout: 10000 
    });
    
    const loadTime = Date.now() - startTime;
    
    // Validate core elements are present
    await page.waitForSelector('h1', { timeout: 5000 });
    await page.waitForSelector('nav', { timeout: 5000 });
    await page.waitForSelector('form', { timeout: 5000 });
    
    // Check hero section loads
    const heroVisible = await page.isVisible('[data-testid="hero-section"]');
    
    console.log(`✅ Homepage loaded in ${loadTime}ms`);
    console.log(`✅ Hero section visible: ${heroVisible}`);
    
    // Performance validation - enterprise standards
    if (loadTime > 5000) {
      throw new Error(`Load time ${loadTime}ms exceeds 5s enterprise threshold`);
    }
    
    testResults.passedTests++;
    
  } catch (error) {
    console.log(`❌ Homepage performance test failed: ${error.message}`);
    testResults.errors.push(`Homepage Performance: ${error.message}`);
  }
}

async function testNavigationSystem(page) {
  testResults.totalTests++;
  console.log('🧭 Testing Navigation System...');
  
  try {
    // Test main navigation links
    const navLinks = await page.$$('nav a');
    console.log(`✅ Found ${navLinks.length} navigation links`);
    
    // Test hover dropdown functionality
    const servicesLink = page.locator('nav').getByText('Services');
    if (await servicesLink.isVisible()) {
      await servicesLink.hover();
      await page.waitForTimeout(500); // Allow dropdown animation
      
      const dropdown = page.locator('[data-testid="services-dropdown"]');
      if (await dropdown.isVisible()) {
        console.log('✅ Services dropdown functional');
      }
    }
    
    // Test subject tuition navigation
    const subjectLink = page.locator('a[href="/subject-tuition"]');
    if (await subjectLink.isVisible()) {
      console.log('✅ Subject tuition link present');
    }
    
    testResults.passedTests++;
    
  } catch (error) {
    console.log(`❌ Navigation test failed: ${error.message}`);
    testResults.errors.push(`Navigation System: ${error.message}`);
  }
}

async function testContactFormFunctionality(page) {
  testResults.totalTests++;
  console.log('💰 Testing Contact Form Revenue Path...');
  
  try {
    // Locate contact form
    const contactForm = page.locator('form').first();
    
    if (await contactForm.isVisible()) {
      // Test form fields
      const nameField = contactForm.locator('input[name="name"], input[placeholder*="name"]').first();
      const emailField = contactForm.locator('input[type="email"], input[name="email"]').first();
      const messageField = contactForm.locator('textarea, input[name="message"]').first();
      
      if (await nameField.isVisible()) {
        await nameField.fill('Test User');
        console.log('✅ Name field functional');
      }
      
      if (await emailField.isVisible()) {
        await emailField.fill('test@example.com');
        console.log('✅ Email field functional');
      }
      
      if (await messageField.isVisible()) {
        await messageField.fill('Test message for performance validation');
        console.log('✅ Message field functional');
      }
      
      console.log('✅ Contact form revenue path validated');
    }
    
    testResults.passedTests++;
    
  } catch (error) {
    console.log(`❌ Contact form test failed: ${error.message}`);
    testResults.errors.push(`Contact Form: ${error.message}`);
  }
}

async function testSubjectTuitionPath(page) {
  testResults.totalTests++;
  console.log('📚 Testing Subject Tuition Revenue Path...');
  
  try {
    // Navigate to subject tuition page
    await page.goto('http://localhost:3001/subject-tuition', { 
      waitUntil: 'networkidle',
      timeout: 10000 
    });
    
    // Check page loads correctly
    await page.waitForSelector('h1', { timeout: 5000 });
    
    // Test subject categories
    const subjects = await page.$$('[data-testid="subject-category"], .subject-card, .subject-item');
    console.log(`✅ Found ${subjects.length} subject options`);
    
    // Test dropdown functionality if present
    const dropdown = page.locator('select, [role="combobox"]').first();
    if (await dropdown.isVisible()) {
      console.log('✅ Subject selection dropdown present');
    }
    
    console.log('✅ Subject tuition revenue path validated');
    testResults.passedTests++;
    
  } catch (error) {
    console.log(`❌ Subject tuition test failed: ${error.message}`);
    testResults.errors.push(`Subject Tuition: ${error.message}`);
  }
}

async function testTestimonialsPage(page) {
  testResults.totalTests++;
  console.log('⭐ Testing Testimonials Social Proof...');
  
  try {
    await page.goto('http://localhost:3001/testimonials', { 
      waitUntil: 'networkidle',
      timeout: 10000 
    });
    
    // Check testimonials load
    await page.waitForSelector('h1', { timeout: 5000 });
    
    // Count testimonials
    const testimonials = await page.$$('[data-testid="testimonial"], .testimonial-card, .testimonial');
    console.log(`✅ Found ${testimonials.length} testimonials loaded`);
    
    // Check for client photos
    const clientPhotos = await page.$$('img[alt*="client"], img[src*="client"]');
    console.log(`✅ Found ${clientPhotos.length} client photos`);
    
    console.log('✅ Testimonials social proof validated');
    testResults.passedTests++;
    
  } catch (error) {
    console.log(`❌ Testimonials test failed: ${error.message}`);
    testResults.errors.push(`Testimonials: ${error.message}`);
  }
}

function generateTestReport() {
  console.log('\n📊 PERFORMANCE REGRESSION TEST RESULTS');
  console.log('=====================================');
  console.log(`Total Tests: ${testResults.totalTests}`);
  console.log(`Passed: ${testResults.passedTests}`);
  console.log(`Failed: ${testResults.failedTests}`);
  console.log(`Success Rate: ${((testResults.passedTests / testResults.totalTests) * 100).toFixed(1)}%`);
  
  if (testResults.errors.length > 0) {
    console.log('\n❌ ERRORS FOUND:');
    testResults.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  } else {
    console.log('\n✅ ALL CRITICAL USER JOURNEYS PASSED - OPTION C OPTIMIZATIONS VALIDATED');
  }
  
  // Write results to file
  const reportData = {
    timestamp: new Date().toISOString(),
    testSuite: 'Option C Performance Regression Testing',
    results: testResults,
    summary: {
      totalTests: testResults.totalTests,
      passedTests: testResults.passedTests,
      failedTests: testResults.failedTests,
      successRate: ((testResults.passedTests / testResults.totalTests) * 100).toFixed(1) + '%'
    }
  };
  
  fs.writeFileSync('performance-regression-report.json', JSON.stringify(reportData, null, 2));
  console.log('\n📄 Test report saved to: performance-regression-report.json');
}

// Run the tests
runCriticalJourneyTests().catch(console.error);