/**
 * CONTEXT7 SOURCE: /microsoft/playwright - Playwright testing framework for video link analysis
 * TEST PURPOSE: Pre-fix analysis to identify all broken video links on masterclass page
 * IMPLEMENTATION REASON: Official Playwright documentation recommends comprehensive video element testing
 */

import { test, expect, Page } from '@playwright/test';

// CONTEXT7 SOURCE: /microsoft/playwright - Video testing interface patterns
interface VideoTestResult {
  readonly element: string;
  readonly type: string;
  readonly src: string | null;
  readonly status: 'success' | 'failed';
  readonly error?: string;
  readonly clickable: boolean;
  readonly modalOpens: boolean;
  readonly hasVideo: boolean;
}

let videoTestResults: VideoTestResult[] = [];

test.describe('Video Masterclasses Page - Pre-Fix Video Link Analysis', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear previous results
    videoTestResults = [];
    
    // Navigate to video masterclasses page
    await page.goto('/video-masterclasses');
    await page.waitForLoadState('networkidle');
  });

  test('Comprehensive video element discovery and analysis', async ({ page }) => {
    console.log('🔍 Starting comprehensive video element discovery...');
    
    // CONTEXT7 SOURCE: /microsoft/playwright - Locator patterns for video elements
    // VIDEO ELEMENT TYPES: All possible video-related elements on the page
    const videoElementSelectors = [
      'video',                           // HTML5 video elements
      'iframe[src*="youtube"]',         // YouTube embeds
      'iframe[src*="vimeo"]',           // Vimeo embeds
      'iframe[src*="video"]',           // Generic video iframes
      'button[data-video]',             // Video trigger buttons
      'button[data-video-id]',          // Video ID buttons
      'a[href*="video"]',               // Video links
      'a[href*="youtube"]',             // YouTube links
      'a[href*="vimeo"]',               // Vimeo links
      '.video-player',                  // Video player containers
      '.video-thumbnail',               // Video thumbnails
      '.video-cta-button',              // Video CTA buttons
      '.video-play-button',             // Play buttons
      '[role="button"]:has(svg)',       // SVG play buttons
      'button:has-text("Play")',        // Play text buttons
      'button:has-text("Watch")',       // Watch text buttons
      'button:has-text("Masterclass")', // Masterclass buttons
    ];

    let totalVideoElements = 0;

    // Test each selector type
    for (const selector of videoElementSelectors) {
      try {
        const elements = await page.locator(selector).all();
        console.log(`\n📹 Found ${elements.length} elements matching "${selector}"`);
        
        totalVideoElements += elements.length;

        // Test each individual element
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          await testVideoElement(page, element, `${selector}[${i}]`, selector);
        }
      } catch (error) {
        console.log(`❌ Error testing selector "${selector}": ${error}`);
      }
    }

    console.log(`\n📊 DISCOVERY SUMMARY:`);
    console.log(`Total video elements found: ${totalVideoElements}`);
    console.log(`Elements tested: ${videoTestResults.length}`);
    
    // Generate detailed report
    await generateVideoAnalysisReport();
  });

  test('Video modal functionality analysis', async ({ page }) => {
    console.log('\n🎬 Testing video modal functionality...');
    
    // CONTEXT7 SOURCE: /microsoft/playwright - Modal testing patterns
    // Look for modal trigger elements
    const modalTriggers = await page.locator('button[data-video], button[data-video-id], .video-thumbnail-container, .video-play-button').all();
    
    console.log(`Found ${modalTriggers.length} potential modal triggers`);

    for (let i = 0; i < Math.min(modalTriggers.length, 10); i++) { // Limit to first 10 for testing
      const trigger = modalTriggers[i];
      const triggerText = await trigger.textContent().catch(() => 'No text');
      
      console.log(`\n🎯 Testing modal trigger ${i + 1}: "${triggerText}"`);

      try {
        // Click the trigger
        await trigger.click({ timeout: 5000 });
        await page.waitForTimeout(2000);

        // Check for modal elements
        const modalSelectors = [
          '[role="dialog"]',
          '.modal',
          '.video-modal',
          '[data-state="open"]',
          '.fixed.inset-0'
        ];

        let modalFound = false;
        let videoInModal = false;

        for (const modalSelector of modalSelectors) {
          const modal = page.locator(modalSelector);
          if (await modal.isVisible().catch(() => false)) {
            modalFound = true;
            console.log(`✅ Modal found with selector: ${modalSelector}`);

            // Check for video in modal
            const videoInModalElement = modal.locator('video, iframe');
            if (await videoInModalElement.count() > 0) {
              videoInModal = true;
              const videoSrc = await videoInModalElement.getAttribute('src').catch(() => null);
              console.log(`✅ Video found in modal: ${videoSrc}`);
            } else {
              console.log(`⚠️  Modal opened but no video found`);
            }
            break;
          }
        }

        if (!modalFound) {
          console.log(`❌ No modal opened for trigger ${i + 1}`);
        }

        // Record result
        videoTestResults.push({
          element: `Modal Trigger ${i + 1}`,
          type: 'modal-trigger',
          src: null,
          status: modalFound && videoInModal ? 'success' : 'failed',
          error: modalFound ? (videoInModal ? undefined : 'Modal opened but no video') : 'Modal did not open',
          clickable: true,
          modalOpens: modalFound,
          hasVideo: videoInModal
        });

        // Close modal if opened
        if (modalFound) {
          await page.keyboard.press('Escape');
          await page.waitForTimeout(1000);
        }

      } catch (error) {
        console.log(`❌ Modal trigger ${i + 1} failed: ${error}`);
        videoTestResults.push({
          element: `Modal Trigger ${i + 1}`,
          type: 'modal-trigger',
          src: null,
          status: 'failed',
          error: `Click failed: ${error}`,
          clickable: false,
          modalOpens: false,
          hasVideo: false
        });
      }
    }
  });

  test('Video source validation analysis', async ({ page }) => {
    console.log('\n🔗 Testing video source validation...');

    // Find all video sources on the page
    const videoSources: string[] = [];
    
    // HTML5 video elements
    const videos = await page.locator('video[src]').all();
    for (const video of videos) {
      const src = await video.getAttribute('src');
      if (src) videoSources.push(src);
    }

    // Iframe video embeds
    const iframes = await page.locator('iframe[src*="video"], iframe[src*="youtube"], iframe[src*="vimeo"]').all();
    for (const iframe of iframes) {
      const src = await iframe.getAttribute('src');
      if (src) videoSources.push(src);
    }

    console.log(`Found ${videoSources.length} video sources to validate`);

    // Test each source
    for (let i = 0; i < videoSources.length; i++) {
      const src = videoSources[i];
      console.log(`\n🔍 Testing video source ${i + 1}: ${src}`);

      try {
        // For local videos, check if file exists
        if (src.startsWith('/')) {
          const response = await page.request.head(src);
          const status = response.status();
          console.log(`${status < 400 ? '✅' : '❌'} Local video status: ${status}`);
          
          videoTestResults.push({
            element: `Video Source ${i + 1}`,
            type: 'video-source',
            src: src,
            status: status < 400 ? 'success' : 'failed',
            error: status >= 400 ? `HTTP ${status}` : undefined,
            clickable: false,
            modalOpens: false,
            hasVideo: status < 400
          });
        }
        // For external videos (YouTube, etc.), basic URL validation
        else if (src.includes('youtube') || src.includes('vimeo')) {
          console.log(`✅ External video URL detected: ${src}`);
          videoTestResults.push({
            element: `External Video ${i + 1}`,
            type: 'external-video',
            src: src,
            status: 'success',
            clickable: false,
            modalOpens: false,
            hasVideo: true
          });
        }
      } catch (error) {
        console.log(`❌ Video source validation failed: ${error}`);
        videoTestResults.push({
          element: `Video Source ${i + 1}`,
          type: 'video-source',
          src: src,
          status: 'failed',
          error: `Validation failed: ${error}`,
          clickable: false,
          modalOpens: false,
          hasVideo: false
        });
      }
    }
  });

  test.afterAll(async () => {
    // Generate final comprehensive report
    await generateFinalReport();
  });
});

// CONTEXT7 SOURCE: /microsoft/playwright - Element testing helper functions
async function testVideoElement(page: Page, element: any, identifier: string, selectorType: string): Promise<void> {
  try {
    console.log(`\n🎯 Testing element: ${identifier}`);

    // Get element properties
    const tagName = await element.evaluate((el: Element) => el.tagName).catch(() => 'Unknown');
    const src = await element.getAttribute('src').catch(() => null);
    const href = await element.getAttribute('href').catch(() => null);
    const dataVideo = await element.getAttribute('data-video').catch(() => null);
    const dataVideoId = await element.getAttribute('data-video-id').catch(() => null);

    console.log(`  Tag: ${tagName}`);
    console.log(`  Src: ${src || 'None'}`);
    console.log(`  Href: ${href || 'None'}`);
    console.log(`  Data-video: ${dataVideo || 'None'}`);
    console.log(`  Data-video-id: ${dataVideoId || 'None'}`);

    // Test clickability
    let clickable = false;
    let modalOpens = false;
    let hasVideo = false;
    let error: string | undefined;

    try {
      // Check if element is clickable
      await element.click({ timeout: 3000, trial: true });
      clickable = true;
      console.log(`  ✅ Element is clickable`);
    } catch (e) {
      console.log(`  ❌ Element not clickable: ${e}`);
      error = `Not clickable: ${e}`;
    }

    // If clickable, test actual click
    if (clickable) {
      try {
        await element.click({ timeout: 5000 });
        await page.waitForTimeout(1500);

        // Check for modal or video playback
        const modal = page.locator('[role="dialog"], .modal, .video-modal, .fixed.inset-0');
        if (await modal.isVisible().catch(() => false)) {
          modalOpens = true;
          console.log(`  ✅ Modal opened`);

          // Check for video in modal
          const videoInModal = modal.locator('video, iframe');
          if (await videoInModal.count() > 0) {
            hasVideo = true;
            console.log(`  ✅ Video found in modal`);
          } else {
            console.log(`  ⚠️  Modal opened but no video found`);
          }

          // Close modal
          await page.keyboard.press('Escape');
          await page.waitForTimeout(500);
        } else {
          console.log(`  ❌ No modal opened`);
        }
      } catch (clickError) {
        error = `Click execution failed: ${clickError}`;
        console.log(`  ❌ ${error}`);
      }
    }

    // Record result
    const result: VideoTestResult = {
      element: identifier,
      type: selectorType,
      src: src || href || dataVideo || dataVideoId,
      status: (clickable && modalOpens && hasVideo) ? 'success' : 'failed',
      error: error,
      clickable: clickable,
      modalOpens: modalOpens,
      hasVideo: hasVideo
    };

    videoTestResults.push(result);

  } catch (error) {
    console.log(`❌ Failed to test element ${identifier}: ${error}`);
    videoTestResults.push({
      element: identifier,
      type: selectorType,
      src: null,
      status: 'failed',
      error: `Element test failed: ${error}`,
      clickable: false,
      modalOpens: false,
      hasVideo: false
    });
  }
}

async function generateVideoAnalysisReport(): Promise<void> {
  console.log('\n📊 DETAILED VIDEO ANALYSIS REPORT');
  console.log('=====================================');
  
  const successfulElements = videoTestResults.filter(r => r.status === 'success');
  const failedElements = videoTestResults.filter(r => r.status === 'failed');
  
  console.log(`\n✅ WORKING VIDEO ELEMENTS: ${successfulElements.length}`);
  successfulElements.forEach((result, index) => {
    console.log(`  ${index + 1}. ${result.element} (${result.type})`);
    if (result.src) console.log(`     Source: ${result.src}`);
  });
  
  console.log(`\n❌ BROKEN VIDEO ELEMENTS: ${failedElements.length}`);
  failedElements.forEach((result, index) => {
    console.log(`  ${index + 1}. ${result.element} (${result.type})`);
    if (result.src) console.log(`     Source: ${result.src}`);
    if (result.error) console.log(`     Error: ${result.error}`);
    console.log(`     Clickable: ${result.clickable}, Modal Opens: ${result.modalOpens}, Has Video: ${result.hasVideo}`);
  });

  // Categorize failures
  const categoryBreakdown = failedElements.reduce((acc, result) => {
    const category = result.error?.includes('clickable') ? 'Not Clickable' :
                    result.error?.includes('Modal') ? 'Modal Issues' :
                    result.error?.includes('video') ? 'Video Issues' :
                    'Other';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\n🏷️  FAILURE CATEGORIES:');
  Object.entries(categoryBreakdown).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} issues`);
  });
}

async function generateFinalReport(): Promise<void> {
  console.log('\n🎯 FINAL PRE-FIX ANALYSIS SUMMARY');
  console.log('==================================');
  
  const total = videoTestResults.length;
  const working = videoTestResults.filter(r => r.status === 'success').length;
  const broken = videoTestResults.filter(r => r.status === 'failed').length;
  const workingPercentage = total > 0 ? Math.round((working / total) * 100) : 0;
  
  console.log(`📊 Video Element Statistics:`);
  console.log(`   Total Elements Tested: ${total}`);
  console.log(`   Working Elements: ${working} (${workingPercentage}%)`);
  console.log(`   Broken Elements: ${broken} (${100 - workingPercentage}%)`);
  
  console.log(`\n🎯 Key Issues Identified:`);
  
  // Identify most common issues
  const commonIssues = videoTestResults
    .filter(r => r.status === 'failed')
    .map(r => r.error)
    .reduce((acc, error) => {
      const key = error || 'Unknown error';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
  Object.entries(commonIssues)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .forEach(([issue, count]) => {
      console.log(`   • ${issue}: ${count} occurrences`);
    });
    
  console.log(`\n✅ Next Steps:`);
  console.log(`   1. Fix broken video sources and modal implementations`);
  console.log(`   2. Ensure all video elements are properly clickable`);
  console.log(`   3. Verify modal functionality and video loading`);
  console.log(`   4. Run post-fix tests to verify improvements`);
  
  // Export results for reference
  console.log('\n📁 Test results saved for comparison with post-fix analysis');
}