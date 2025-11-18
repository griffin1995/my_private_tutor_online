#!/usr/bin/env node

/**
 * Record videos of all pages at all viewport sizes
 * Automatically discovers all Next.js routes
 */

const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Viewport configurations
const viewports = [
  { name: 'mobile_360x800', width: 360, height: 800 },
  { name: 'iphone14_390x844', width: 390, height: 844 },
  { name: 'mobile_landscape_640x767', width: 640, height: 767 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  { name: 'laptop_small_1024x768', width: 1024, height: 768 },
  { name: 'laptop_large_1366x768', width: 1366, height: 768 },
  { name: 'desktop_1920x1080', width: 1920, height: 1080 }
];

// Auto-discover all Next.js pages
function discoverPages() {
  const baseUrl = 'https://myprivatetutoronline-ilfdqtxrl-jacks-projects-cf5effed.vercel.app';
  const appDir = path.join(__dirname, 'src/app');

  // Find all page.tsx/ts/jsx/js files
  const findCmd = `find "${appDir}" -type f \\( -name "page.tsx" -o -name "page.ts" -o -name "page.jsx" -o -name "page.js" \\)`;
  const pageFiles = execSync(findCmd, { encoding: 'utf-8' }).trim().split('\n');

  const pages = [];

  pageFiles.forEach(filePath => {
    // Skip dynamic routes (those with [...] or [slug])
    if (filePath.includes('[')) return;

    // Get relative path from app directory
    const relativePath = path.relative(appDir, path.dirname(filePath));

    // Convert to URL path
    let urlPath = relativePath === '.' ? '' : '/' + relativePath;

    // Create readable name
    let name = relativePath === '.' ? 'Homepage' :
                relativePath.split('/').map(segment =>
                  segment.split('-').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join('_')
                ).join('_');

    pages.push({
      name,
      url: baseUrl + urlPath
    });
  });

  // Sort by URL for consistent ordering
  pages.sort((a, b) => a.url.localeCompare(b.url));

  return pages;
}

// Output directory
const outputDir = path.join(__dirname, 'videos');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Smooth scroll function - scrolls to bottom once and stops
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      const distance = 80; // pixels to scroll each step
      const delay = 80; // ms between scrolls (slower for better viewing)
      let scrollHeight = document.documentElement.scrollHeight;

      const timer = setInterval(() => {
        // Recalculate scroll height in case content loaded dynamically
        scrollHeight = document.documentElement.scrollHeight;
        const currentScroll = window.pageYOffset;

        window.scrollBy(0, distance);

        // Check if we've reached the bottom
        if (currentScroll + window.innerHeight >= scrollHeight - 10) {
          clearInterval(timer);
          // Wait at bottom before ending
          setTimeout(resolve, 2000);
        }
      }, delay);
    });
  });
}

// Record single video
async function recordVideo(browser, page, viewport, outputPath) {
  console.log(`   📹 Recording: ${path.basename(outputPath)}`);

  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 2 // High quality
  });

  // Scroll to top before starting recording
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  const recorder = new PuppeteerScreenRecorder(page, {
    followNewTab: false,
    fps: 30,
    videoFrame: {
      width: viewport.width,
      height: viewport.height,
    },
    videoCrf: 18, // Quality: 0-51, lower = better (18 is visually lossless)
    // No aspectRatio - use actual viewport dimensions
  });

  await recorder.start(outputPath);

  // Wait for page load and any animations (and ensure we're at top)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Ensure we're at the top before scrolling
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  await new Promise(resolve => setTimeout(resolve, 1000));

  // Smooth scroll through entire page
  await autoScroll(page);

  // Wait at the end before stopping
  await new Promise(resolve => setTimeout(resolve, 2000));

  await recorder.stop();
}

// Main execution
async function main() {
  console.log('🔍 Discovering pages...\n');
  const pages = discoverPages();

  console.log('🎬 Starting video recording...\n');
  console.log(`📊 Configuration:`);
  console.log(`   - Pages: ${pages.length}`);
  console.log(`   - Viewports: ${viewports.length}`);
  console.log(`   - Total videos: ${pages.length * viewports.length}`);
  console.log(`   - Output: ${outputDir}\n`);

  console.log(`📄 Pages to record:`);
  pages.forEach((p, i) => console.log(`   ${i + 1}. ${p.name} (${p.url})`));
  console.log('');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  let completed = 0;
  const total = pages.length * viewports.length;

  for (const pageConfig of pages) {
    console.log(`\n📄 ${pageConfig.name}`);

    const page = await browser.newPage();

    try {
      await page.goto(pageConfig.url, { waitUntil: 'networkidle2', timeout: 60000 });

      for (const viewport of viewports) {
        const filename = `${pageConfig.name}_${viewport.name}.mp4`;
        const outputPath = path.join(outputDir, filename);

        try {
          await recordVideo(browser, page, viewport, outputPath);
          completed++;
          console.log(`   ✅ Completed (${completed}/${total})`);
        } catch (error) {
          console.error(`   ❌ Error recording ${viewport.name}: ${error.message}`);
        }
      }
    } catch (error) {
      console.error(`   ❌ Error loading page: ${error.message}`);
    }

    await page.close();
  }

  await browser.close();

  console.log(`\n✅ All done! ${completed}/${total} videos created`);
  console.log(`📁 Videos saved to: ${outputDir}`);
}

main().catch(console.error);
