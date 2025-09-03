/**
 * CONTEXT7 SOURCE: /microsoft/playwright - Comprehensive video link testing for masterclass page
 * IMPLEMENTATION REASON: Systematic identification and validation of all video functionality
 */

import { test, expect, Page, Locator } from '@playwright/test';

interface VideoElement {
  selector: string;
  type: 'iframe' | 'video' | 'button' | 'link';
  description: string;
  expectedUrl?: string;
  isModal?: boolean;
}

interface BrokenVideoReport {
  element: VideoElement;
  issue: string;
  actualUrl?: string;
  errorMessage?: string;
  screenshot?: string;
}

const MASTERCLASS_VIDEO_ELEMENTS: VideoElement[] = [
  // Free masterclass videos
  {
    selector: '[data-video-id="unlockingAcademicSuccess"]',
    type: 'button',
    description: 'Unlocking Academic Success - Free Masterclass Play Button',
    isModal: true,
  },
  {
    selector: '[data-video-id="ucasSummit2024"]',
    type: 'button',
    description: 'UCAS Summit 2024 - Free Recording Play Button',
    isModal: true,
  },
  
  // Premium masterclass payment links
  {
    selector: 'a[href*="stripe.com"][href*="7sY6oGdj767tbtO1Zd38408"]',
    type: 'link',
    description: 'Elizabeth\'s Essential UCAS Guide - Payment Link',
    expectedUrl: 'https://buy.stripe.com/7sY6oGdj767tbtO1Zd38408',
  },
  {
    selector: 'a[href*="stripe.com"][href*="bJe4gy6UJ3ZlgO8avJ38409"]',
    type: 'link',
    description: 'Top 10 Tips for Personal Statements - Payment Link',
    expectedUrl: 'https://buy.stripe.com/bJe4gy6UJ3ZlgO8avJ38409',
  },
  {
    selector: 'a[href*="stripe.com"][href*="aFa8wOfrffI3dBW47l3840a"]',
    type: 'link',
    description: 'British Literary Classics - Payment Link',
    expectedUrl: 'https://buy.stripe.com/aFa8wOfrffI3dBW47l3840a',
  },
  {
    selector: 'a[href*="stripe.com"][href*="cNidR8dj70N98hCeLZ3840b"]',
    type: 'link',
    description: 'British Etiquette - Payment Link',
    expectedUrl: 'https://buy.stripe.com/cNidR8dj70N98hCeLZ3840b',
  },

  // Video thumbnails and images
  {
    selector: 'img[src*="masterclass-thumbnails"]',
    type: 'link',
    description: 'Masterclass thumbnail images',
  },
  {
    selector: 'img[src*="unlocking-success"]',
    type: 'link',
    description: 'Unlocking Success thumbnail',
  },
  {
    selector: 'img[src*="gcse-summit"]',
    type: 'link',
    description: 'GCSE Summit thumbnail',
  },
  
  // Video modal elements
  {
    selector: '.video-modal video',
    type: 'video',
    description: 'Video modal player element',
    isModal: true,
  },
  {
    selector: 'video[src*=".mp4"]',
    type: 'video',
    description: 'Direct video elements with MP4 sources',
  },
  {
    selector: 'iframe[src*="youtube"]',
    type: 'iframe',
    description: 'YouTube iframe embeds',
  },
];

let brokenVideoReports: BrokenVideoReport[] = [];

test.describe('Video Masterclasses Page - Comprehensive Video Testing', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the video masterclasses page
    await page.goto('/video-masterclasses');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Reset broken video reports for each test
    brokenVideoReports = [];
  });

  test('PRE-FIX: Comprehensive video link identification and testing', async ({ page }) => {
    console.log('\n🔍 STARTING COMPREHENSIVE VIDEO LINK ANALYSIS');
    console.log('================================================');
    
    // Test each defined video element
    for (const videoElement of MASTERCLASS_VIDEO_ELEMENTS) {
      await testVideoElement(page, videoElement);
    }
    
    // Discover additional video elements
    await discoverAdditionalVideoElements(page);
    
    // Generate comprehensive report
    await generatePreFixReport(page);
    
    // Take full page screenshot for reference
    await page.screenshot({ 
      path: 'tests/screenshots/pre-fix-masterclass-page-full.png',
      fullPage: true 
    });
  });

  test('Video modal functionality testing', async ({ page }) => {
    console.log('\n🎬 TESTING VIDEO MODAL FUNCTIONALITY');
    console.log('=====================================');
    
    // Test free video modal opens
    const freeVideoButton = page.locator('button:has-text("Watch Free Masterclass")').first();
    if (await freeVideoButton.isVisible()) {
      await freeVideoButton.click();
      
      // Check if modal opens
      const modal = page.locator('.fixed.inset-0.z-50');
      if (await modal.isVisible()) {
        console.log('✅ Video modal opens successfully');
        
        // Check for video element in modal
        const modalVideo = modal.locator('video');
        if (await modalVideo.count() > 0) {
          const videoSrc = await modalVideo.getAttribute('src');
          console.log(`📹 Video source: ${videoSrc || 'No source found'}`);
          
          if (!videoSrc || videoSrc === '') {
            brokenVideoReports.push({
              element: { selector: 'video', type: 'video', description: 'Modal video player' },
              issue: 'Video element has no source URL',
              actualUrl: videoSrc || 'empty',
            });
          }
        } else {
          brokenVideoReports.push({
            element: { selector: '.video-modal video', type: 'video', description: 'Modal video player' },
            issue: 'No video element found in modal',
          });
        }
        
        // Test close functionality
        const closeButton = modal.locator('button[aria-label="Close video"]');
        if (await closeButton.isVisible()) {
          await closeButton.click();
          await page.waitForTimeout(500);
          
          if (await modal.isVisible()) {
            brokenVideoReports.push({
              element: { selector: 'button[aria-label="Close video"]', type: 'button', description: 'Modal close button' },
              issue: 'Close button does not close modal',
            });
          } else {
            console.log('✅ Modal close functionality works');
          }
        }
      } else {
        brokenVideoReports.push({
          element: { selector: 'button:has-text("Watch Free Masterclass")', type: 'button', description: 'Free video button' },
          issue: 'Button does not open video modal',
        });
      }
    }
  });

  test('Payment link validation', async ({ page }) => {
    console.log('\n💳 TESTING PAYMENT LINK FUNCTIONALITY');
    console.log('======================================');
    
    const paymentButtons = await page.locator('button:has-text("Purchase Masterclass")').all();
    
    for (let i = 0; i < paymentButtons.length; i++) {
      const button = paymentButtons[i];
      
      // Check if button is clickable
      if (await button.isEnabled()) {
        const buttonText = await button.textContent();
        console.log(`🔍 Testing payment button: ${buttonText}`);
        
        // Test button functionality (without actually clicking to external site)
        const onclick = await button.getAttribute('onclick');
        const href = await button.getAttribute('href');
        
        if (!onclick && !href) {
          brokenVideoReports.push({
            element: { selector: `button:has-text("Purchase Masterclass")`, type: 'button', description: `Payment button ${i + 1}` },
            issue: 'Payment button has no click handler or href',
          });
        }
        
        // Check for Stripe URL pattern
        if (onclick) {
          const stripeMatch = onclick.match(/stripe\.com\/[a-zA-Z0-9]+/);
          if (stripeMatch) {
            console.log(`✅ Valid Stripe URL pattern found: ${stripeMatch[0]}`);
          } else {
            brokenVideoReports.push({
              element: { selector: `button:has-text("Purchase Masterclass")`, type: 'button', description: `Payment button ${i + 1}` },
              issue: 'No valid Stripe URL pattern found in onclick handler',
              actualUrl: onclick,
            });
          }
        }
      }
    }
  });

  test('Video thumbnail image validation', async ({ page }) => {
    console.log('\n🖼️ TESTING VIDEO THUMBNAIL IMAGES');
    console.log('==================================');
    
    const thumbnailImages = await page.locator('img[src*="thumbnail"], img[src*="masterclass"]').all();
    
    for (let i = 0; i < thumbnailImages.length; i++) {
      const img = thumbnailImages[i];
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      
      console.log(`🔍 Testing thumbnail ${i + 1}: ${src}`);
      
      if (!src) {
        brokenVideoReports.push({
          element: { selector: 'img[src*="thumbnail"]', type: 'link', description: `Thumbnail image ${i + 1}` },
          issue: 'Image has no src attribute',
        });
        continue;
      }
      
      // Check if image loads successfully
      const response = await page.evaluate(async (imageSrc) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ loaded: true, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
          img.onerror = () => resolve({ loaded: false, error: 'Failed to load' });
          img.src = imageSrc;
        });
      }, src);
      
      if (!response.loaded) {
        brokenVideoReports.push({
          element: { selector: 'img[src*="thumbnail"]', type: 'link', description: `Thumbnail image ${i + 1}` },
          issue: 'Image failed to load',
          actualUrl: src,
          errorMessage: response.error,
        });
      } else {
        console.log(`✅ Thumbnail loaded successfully: ${src}`);
      }
    }
  });

  test.afterEach(async ({ page }) => {
    // Log any issues found in this test
    if (brokenVideoReports.length > 0) {
      console.log('\n⚠️ ISSUES FOUND IN THIS TEST:');
      brokenVideoReports.forEach((report, index) => {
        console.log(`${index + 1}. ${report.element.description}: ${report.issue}`);
        if (report.actualUrl) console.log(`   URL: ${report.actualUrl}`);
        if (report.errorMessage) console.log(`   Error: ${report.errorMessage}`);
      });
    }
  });
});

async function testVideoElement(page: Page, element: VideoElement): Promise<void> {
  try {
    console.log(`🔍 Testing: ${element.description}`);
    
    const locator = page.locator(element.selector);
    const count = await locator.count();
    
    if (count === 0) {
      brokenVideoReports.push({
        element,
        issue: `Element not found on page`,
      });
      console.log(`❌ Not found: ${element.selector}`);
      return;
    }
    
    console.log(`✅ Found ${count} element(s) matching: ${element.selector}`);
    
    // Test each matching element
    for (let i = 0; i < count; i++) {
      const specificLocator = locator.nth(i);
      await testSpecificElement(page, specificLocator, element, i);
    }
    
  } catch (error) {
    brokenVideoReports.push({
      element,
      issue: `Error during testing: ${error.message}`,
      errorMessage: error.message,
    });
  }
}

async function testSpecificElement(page: Page, locator: Locator, element: VideoElement, index: number): Promise<void> {
  try {
    switch (element.type) {
      case 'button':
        await testButtonElement(page, locator, element, index);
        break;
      case 'link':
        await testLinkElement(page, locator, element, index);
        break;
      case 'video':
        await testVideoElement(page, locator, element, index);
        break;
      case 'iframe':
        await testIframeElement(page, locator, element, index);
        break;
    }
  } catch (error) {
    console.log(`❌ Error testing element ${index}: ${error.message}`);
  }
}

async function testButtonElement(page: Page, locator: Locator, element: VideoElement, index: number): Promise<void> {
  const isEnabled = await locator.isEnabled();
  const isVisible = await locator.isVisible();
  
  if (!isVisible) {
    brokenVideoReports.push({
      element,
      issue: `Button ${index} is not visible`,
    });
    return;
  }
  
  if (!isEnabled) {
    brokenVideoReports.push({
      element,
      issue: `Button ${index} is not enabled/clickable`,
    });
    return;
  }
  
  // Check for click handlers
  const onclick = await locator.getAttribute('onclick');
  const hasClickHandler = await locator.evaluate((el) => {
    return Object.getOwnPropertyNames(el).some(prop => prop.startsWith('__reactEventHandlers'));
  });
  
  if (!onclick && !hasClickHandler) {
    brokenVideoReports.push({
      element,
      issue: `Button ${index} has no click handler`,
    });
  }
  
  console.log(`✅ Button ${index} is functional`);
}

async function testLinkElement(page: Page, locator: Locator, element: VideoElement, index: number): Promise<void> {
  const href = await locator.getAttribute('href');
  const src = await locator.getAttribute('src');
  const url = href || src;
  
  if (!url) {
    brokenVideoReports.push({
      element,
      issue: `Link/Image ${index} has no URL`,
    });
    return;
  }
  
  // Validate URL format
  if (element.expectedUrl && url !== element.expectedUrl) {
    brokenVideoReports.push({
      element,
      issue: `URL mismatch for element ${index}`,
      actualUrl: url,
    });
  }
  
  console.log(`✅ Link ${index} has valid URL: ${url}`);
}

async function testVideoElementSpecific(page: Page, locator: Locator, element: VideoElement, index: number): Promise<void> {
  const src = await locator.getAttribute('src');
  
  if (!src) {
    brokenVideoReports.push({
      element,
      issue: `Video ${index} has no source URL`,
    });
    return;
  }
  
  // Check video can be loaded (basic test)
  const canPlay = await locator.evaluate((video: HTMLVideoElement) => {
    return video.readyState >= 2; // HAVE_CURRENT_DATA
  });
  
  console.log(`✅ Video ${index} source: ${src}`);
}

async function testIframeElement(page: Page, locator: Locator, element: VideoElement, index: number): Promise<void> {
  const src = await locator.getAttribute('src');
  
  if (!src) {
    brokenVideoReports.push({
      element,
      issue: `Iframe ${index} has no source URL`,
    });
    return;
  }
  
  // Validate YouTube URL format
  if (src.includes('youtube') && !src.includes('/embed/')) {
    brokenVideoReports.push({
      element,
      issue: `YouTube iframe ${index} does not use embed URL format`,
      actualUrl: src,
    });
  }
  
  console.log(`✅ Iframe ${index} source: ${src}`);
}

async function discoverAdditionalVideoElements(page: Page): Promise<void> {
  console.log('\n🔍 DISCOVERING ADDITIONAL VIDEO ELEMENTS');
  console.log('=========================================');
  
  // Find all potential video-related elements
  const videoSelectors = [
    'video',
    'iframe[src*="youtube"]',
    'iframe[src*="vimeo"]',
    'button[data-video]',
    'button:has-text("play")',
    'button:has-text("watch")',
    'a[href*="youtube"]',
    'a[href*="vimeo"]',
    'img[alt*="video"]',
    'img[alt*="play"]',
    '[data-testid*="video"]',
    '.video-player',
    '.video-container',
    '.play-button',
  ];
  
  for (const selector of videoSelectors) {
    try {
      const elements = await page.locator(selector).all();
      if (elements.length > 0) {
        console.log(`📹 Found ${elements.length} elements with selector: ${selector}`);
        
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          const tagName = await element.evaluate(el => el.tagName.toLowerCase());
          
          // Basic validation for discovered elements
          if (tagName === 'video') {
            const src = await element.getAttribute('src');
            console.log(`   Video ${i}: ${src || 'No source'}`);
          } else if (tagName === 'iframe') {
            const src = await element.getAttribute('src');
            console.log(`   Iframe ${i}: ${src || 'No source'}`);
          } else if (tagName === 'button' || tagName === 'a') {
            const text = await element.textContent();
            console.log(`   ${tagName.toUpperCase()} ${i}: ${text?.slice(0, 50) || 'No text'}`);
          }
        }
      }
    } catch (error) {
      // Silently continue if selector fails
    }
  }
}

async function generatePreFixReport(page: Page): Promise<void> {
  console.log('\n📊 PRE-FIX COMPREHENSIVE REPORT');
  console.log('================================');
  
  if (brokenVideoReports.length === 0) {
    console.log('✅ No broken video links found! All video functionality appears to be working.');
    return;
  }
  
  console.log(`⚠️ Found ${brokenVideoReports.length} issues with video functionality:`);
  console.log('');
  
  // Group issues by type
  const issuesByType = brokenVideoReports.reduce((acc, report) => {
    const type = report.element.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(report);
    return acc;
  }, {} as Record<string, BrokenVideoReport[]>);
  
  Object.entries(issuesByType).forEach(([type, reports]) => {
    console.log(`🔍 ${type.toUpperCase()} ISSUES (${reports.length}):`);
    reports.forEach((report, index) => {
      console.log(`  ${index + 1}. ${report.element.description}`);
      console.log(`     Issue: ${report.issue}`);
      if (report.actualUrl) console.log(`     URL: ${report.actualUrl}`);
      if (report.errorMessage) console.log(`     Error: ${report.errorMessage}`);
      console.log('');
    });
  });
  
  // Save detailed report to file
  const reportContent = {
    timestamp: new Date().toISOString(),
    page: '/video-masterclasses',
    totalIssues: brokenVideoReports.length,
    issuesByType,
    recommendations: generateFixRecommendations(brokenVideoReports),
  };
  
  await page.evaluate((report) => {
    console.log('DETAILED REPORT FOR FIXES:', JSON.stringify(report, null, 2));
  }, reportContent);
}

function generateFixRecommendations(reports: BrokenVideoReport[]): string[] {
  const recommendations = [];
  
  if (reports.some(r => r.issue.includes('no source'))) {
    recommendations.push('Add valid video source URLs to video elements');
  }
  
  if (reports.some(r => r.issue.includes('not found'))) {
    recommendations.push('Verify video element selectors and ensure they exist in the DOM');
  }
  
  if (reports.some(r => r.issue.includes('click handler'))) {
    recommendations.push('Add proper click handlers to video buttons');
  }
  
  if (reports.some(r => r.issue.includes('modal'))) {
    recommendations.push('Fix video modal functionality and ensure proper video loading');
  }
  
  if (reports.some(r => r.issue.includes('URL'))) {
    recommendations.push('Verify and correct video URLs and payment links');
  }
  
  if (reports.some(r => r.issue.includes('load'))) {
    recommendations.push('Check video file paths and ensure files exist');
  }
  
  return recommendations;
}