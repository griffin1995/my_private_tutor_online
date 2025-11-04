import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
	test('Homepage loads within performance thresholds', async ({ page }) => {
		// Navigate and measure performance
		const startTime = Date.now();
		await page.goto('/', { waitUntil: 'networkidle' });
		const loadTime = Date.now() - startTime;

		// Performance thresholds (in milliseconds)
		expect(loadTime).toBeLessThan(5000); // Page should load in under 5 seconds

		// Check Core Web Vitals via JavaScript
		const webVitals = await page.evaluate(() => {
			return new Promise((resolve) => {
				const metrics = {};

				// Get performance entries
				const paintEntries = performance.getEntriesByType('paint');
				const navigationEntries = performance.getEntriesByType('navigation');

				// First Contentful Paint
				const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
				if (fcp) {
					metrics.fcp = fcp.startTime;
				}

				// First Paint
				const fp = paintEntries.find(entry => entry.name === 'first-paint');
				if (fp) {
					metrics.fp = fp.startTime;
				}

				// Navigation timing
				if (navigationEntries.length > 0) {
					const nav = navigationEntries[0];
					metrics.domContentLoaded = nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart;
					metrics.loadComplete = nav.loadEventEnd - nav.loadEventStart;
				}

				resolve(metrics);
			});
		});

		console.log('Performance metrics:', webVitals);

		// Verify key performance metrics
		if (webVitals.fcp) {
			expect(webVitals.fcp).toBeLessThan(3000); // FCP should be under 3 seconds
		}
	});

	test('Video components load without blocking', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });

		// Check that page is interactive before video loads
		const heroSection = page.locator('[data-testid="hero-section"], section').first();
		await expect(heroSection).toBeVisible({ timeout: 5000 });

		// Verify video thumbnail is visible
		const videoThumbnail = page.locator('img[alt*="video"], img[src*="video-thumbnails"]').first();
		if (await videoThumbnail.count() > 0) {
			await expect(videoThumbnail).toBeVisible({ timeout: 10000 });
		}
	});

	test('Navigation responsiveness', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });

		// Test navigation links load quickly
		const navLinks = page.locator('nav a, [data-navigation] a').all();
		const links = await navLinks;

		for (const link of links.slice(0, 3)) { // Test first 3 nav links
			const href = await link.getAttribute('href');
			if (href && href.startsWith('/') && href !== '/') {
				const startTime = Date.now();
				await link.click();
				await page.waitForLoadState('domcontentloaded');
				const navTime = Date.now() - startTime;

				expect(navTime).toBeLessThan(3000); // Navigation should be under 3 seconds
				console.log(`Navigation to ${href}: ${navTime}ms`);

				// Go back for next test
				await page.goBack();
				await page.waitForLoadState('domcontentloaded');
			}
		}
	});

	test('Image optimization check', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });

		// Check that images are optimized
		const images = await page.locator('img').all();

		for (const img of images.slice(0, 10)) { // Check first 10 images
			const src = await img.getAttribute('src');
			const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
			const naturalHeight = await img.evaluate(el => (el as HTMLImageElement).naturalHeight);

			if (src && naturalWidth && naturalHeight) {
				// Check for reasonable image dimensions
				expect(naturalWidth).toBeLessThan(3000); // No images should be wider than 3000px
				expect(naturalHeight).toBeLessThan(3000); // No images should be taller than 3000px

				// Check for modern image formats or Next.js optimization
				const isOptimized = src.includes('_next/image') ||
								  src.includes('.webp') ||
								  src.includes('.avif') ||
								  src.includes('w=') || // Next.js image optimization query param
								  src.includes('q=');   // Next.js quality param

				if (!src.includes('icon') && !src.includes('logo')) {
					expect(isOptimized).toBeTruthy(); // Images should be optimized
				}
			}
		}
	});
});