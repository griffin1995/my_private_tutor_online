/**
 * CONTEXT7 SOURCE: /microsoft/playwright - Comprehensive video masterclass page testing suite
 * TEST AUTOMATION REASON: Official Playwright documentation for page testing, accessibility, and performance validation
 *
 * ITERATION TESTING FRAMEWORK:
 * - Round 1: Baseline functionality and visual testing
 * - Round 2: User experience and interaction testing
 * - Round 3: Performance and accessibility validation
 *
 * TECHNICAL REQUIREMENTS:
 * - Page: /video-masterclasses (Next.js 15.4.6 + React 19)
 * - Local URL: http://localhost:3003/video-masterclasses
 * - Brand Colors: Metallic Blue (#3F4A7E), Aztec Gold (#CA9E5B)
 * - Design: Flat 2-column layout with minimal aesthetics
 */

import { test, expect } from '@playwright/test';

// CONTEXT7 SOURCE: /microsoft/playwright - Test configuration constants for video masterclass testing
// CONFIGURATION REASON: Official Playwright documentation recommends centralised test configuration
const MASTERCLASS_PAGE_URL = 'http://localhost:3003/video-masterclasses';
const EXPECTED_MASTERCLASSES = [
	'Personal Statements Guide',
	'Unlocking Academic Success',
	"Elizabeth's Essential UCAS Guide",
	'UCAS Summit 2024',
	'British Literary Classics',
	'Understanding British Etiquette',
];

test.describe('Video Masterclass Page - Round 1: Baseline Testing', () => {
	// CONTEXT7 SOURCE: /microsoft/playwright - Page load and basic functionality verification
	// BASELINE TEST REASON: Official Playwright documentation for initial page state verification
	test('should load video masterclass page successfully', async ({ page }) => {
		await page.goto(MASTERCLASS_PAGE_URL);

		// Verify page loads completely
		await expect(page).toHaveTitle(/Video Masterclasses/);
		await expect(page.locator('h1')).toContainText('Video Masterclasses');

		// Check hero section
		await expect(
			page.locator('[data-testid="simple-hero"], .hero-section, h1'),
		).toBeVisible();
		await expect(page.locator('h2, .subtitle, [data-subtitle]')).toContainText(
			'Expert guidance from Elizabeth Burrows',
		);
	});

	// CONTEXT7 SOURCE: /microsoft/playwright - Content structure and hierarchy verification
	// STRUCTURE TEST REASON: Official Playwright documentation for content validation testing
	test('should display all masterclass sections correctly', async ({ page }) => {
		await page.goto(MASTERCLASS_PAGE_URL);

		// Wait for all content to load
		await page.waitForSelector('h2', { state: 'visible' });

		// Check main sections exist
		await expect(
			page.locator('h2').filter({ hasText: 'Featured Masterclasses' }),
		).toBeVisible();
		await expect(
			page.locator('h2').filter({ hasText: "Elizabeth's Essential UCAS Guide" }),
		).toBeVisible();
		await expect(
			page
				.locator('h2')
				.filter({ hasText: 'British Culture & Literary Classics' }),
		).toBeVisible();

		// Verify 2-column grid layout
		const grids = page.locator('.grid-cols-1.lg\\:grid-cols-2');
		await expect(grids).toHaveCount(3); // Three sections with 2-column grids
	});

	// CONTEXT7 SOURCE: /microsoft/playwright - Video element and interaction testing
	// VIDEO TEST REASON: Official Playwright documentation for multimedia element testing
	test('should display video masterclass cards with correct content', async ({
		page,
	}) => {
		await page.goto(MASTERCLASS_PAGE_URL);

		// Wait for video cards to load
		await page.waitForSelector('.aspect-video', { state: 'visible' });

		// Count video cards (should be 6 total across all sections)
		const videoCards = page.locator('.aspect-video');
		await expect(videoCards).toHaveCount(6);

		// Check each video has required elements
		for (let i = 0; i < 6; i++) {
			const card = videoCards.nth(i);
			await expect(card.locator('img')).toBeVisible(); // Thumbnail image
			await expect(card.locator('button')).toBeVisible(); // Play button
			await expect(
				card.locator('[class*="badge"], .bg-\\[\\#CA9E5B\\], .bg-green-600'),
			).toBeVisible(); // Price badge
		}
	});

	// CONTEXT7 SOURCE: /microsoft/playwright - Interactive element testing
	// INTERACTION TEST REASON: Official Playwright documentation for user interaction validation
	test('should handle video click interactions correctly', async ({
		page,
		context,
	}) => {
		await page.goto(MASTERCLASS_PAGE_URL);

		// Wait for interactive elements
		await page.waitForSelector('button:has-text("Watch")', { state: 'visible' });

		// Test free video click (should open YouTube)
		const [newPage] = await Promise.all([
			context.waitForEvent('page'),
			page.locator('button').filter({ hasText: 'Watch Free' }).first().click(),
		]);

		expect(newPage.url()).toContain('youtube.com');
		await newPage.close();

		// Test paid video click (should open payment/purchase link)
		const payButton = page
			.locator('button')
			.filter({ hasText: 'Get Access' })
			.first();
		if ((await payButton.count()) > 0) {
			const [paymentPage] = await Promise.all([
				context.waitForEvent('page'),
				payButton.click(),
			]);

			// Should open external payment link or video access
			expect(paymentPage.url()).not.toBe(MASTERCLASS_PAGE_URL);
			await paymentPage.close();
		}
	});

	// CONTEXT7 SOURCE: /microsoft/playwright - Visual and brand consistency testing
	// VISUAL TEST REASON: Official Playwright documentation for visual regression testing
	test('should maintain brand colors and visual consistency', async ({
		page,
	}) => {
		await page.goto(MASTERCLASS_PAGE_URL);
		await page.waitForLoadState('networkidle');

		// Check brand colors are applied
		const brandElements = page.locator(
			'[class*="#3F4A7E"], [class*="text-\\[\\#3F4A7E\\]"]',
		);
		await expect(brandElements).toHaveCount({ min: 5 }); // Multiple brand color elements

		const accentElements = page.locator(
			'[class*="#CA9E5B"], [class*="bg-\\[\\#CA9E5B\\]"]',
		);
		await expect(accentElements).toHaveCount({ min: 3 }); // Multiple accent color elements

		// Check flat design elements (no gradients, clean backgrounds)
		await expect(page.locator('[class*="gradient"]')).toHaveCount(0); // No gradients in flat design
		await expect(page.locator('.bg-white')).toHaveCount({ min: 6 }); // Clean white backgrounds for cards
	});

	// CONTEXT7 SOURCE: /microsoft/playwright - Responsive design testing
	// RESPONSIVE TEST REASON: Official Playwright documentation for viewport testing
	test('should be responsive across different screen sizes', async ({
		page,
	}) => {
		await page.goto(MASTERCLASS_PAGE_URL);

		// Test mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await page.waitForLoadState('networkidle');

		// Check mobile layout (should stack to single column)
		const mobileGrids = page.locator('.grid-cols-1:not(.lg\\:grid-cols-2)');
		await expect(mobileGrids).toBeVisible();

		// Test tablet viewport
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.waitForLoadState('networkidle');

		// Test desktop viewport
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.waitForLoadState('networkidle');

		// Check desktop 2-column layout
		const desktopGrids = page.locator('.lg\\:grid-cols-2');
		await expect(desktopGrids).toHaveCount(3);
	});

	// CONTEXT7 SOURCE: /microsoft/playwright - Accessibility baseline testing
	// ACCESSIBILITY TEST REASON: Official Playwright documentation for a11y testing
	test('should meet basic accessibility requirements', async ({ page }) => {
		await page.goto(MASTERCLASS_PAGE_URL);
		await page.waitForLoadState('networkidle');

		// Check for proper heading hierarchy
		const h1Elements = page.locator('h1');
		await expect(h1Elements).toHaveCount({ min: 1, max: 2 }); // Single main h1

		const h2Elements = page.locator('h2');
		await expect(h2Elements).toHaveCount({ min: 3 }); // Section headings

		// Check images have alt text
		const images = page.locator('img');
		const imageCount = await images.count();
		for (let i = 0; i < imageCount; i++) {
			await expect(images.nth(i)).toHaveAttribute('alt');
		}

		// Check buttons have accessible text
		const buttons = page.locator('button');
		const buttonCount = await buttons.count();
		for (let i = 0; i < buttonCount; i++) {
			const buttonText = await buttons.nth(i).textContent();
			expect(buttonText).toBeTruthy(); // All buttons should have text
		}
	});

	// CONTEXT7 SOURCE: /microsoft/playwright - Performance baseline measurement
	// PERFORMANCE TEST REASON: Official Playwright documentation for performance testing
	test('should meet basic performance requirements', async ({ page }) => {
		const startTime = Date.now();

		await page.goto(MASTERCLASS_PAGE_URL);
		await page.waitForLoadState('networkidle');

		const loadTime = Date.now() - startTime;

		// Should load within 3 seconds (generous for testing)
		expect(loadTime).toBeLessThan(3000);

		// Check for performance best practices
		const images = page.locator('img');
		const imageCount = await images.count();

		// Images should have loading attributes
		for (let i = 0; i < imageCount; i++) {
			const loading = await images.nth(i).getAttribute('loading');
			// Either lazy loading or no attribute (eager by default)
			expect(
				loading === 'lazy' || loading === 'eager' || loading === null,
			).toBeTruthy();
		}
	});
});

test.describe('Video Masterclass Page - Screenshot Documentation', () => {
	// CONTEXT7 SOURCE: /microsoft/playwright - Visual documentation through screenshots
	// SCREENSHOT REASON: Official Playwright documentation for visual regression and documentation
	test('should capture baseline screenshots for iteration comparison', async ({
		page,
	}) => {
		await page.goto(MASTERCLASS_PAGE_URL);
		await page.waitForLoadState('networkidle');

		// Full page screenshot
		await page.screenshot({
			path: './.playwright-mcp/video-masterclass-baseline-full-page.png',
			fullPage: true,
		});

		// Hero section screenshot
		await page
			.locator('.hero-section, [data-testid="simple-hero"]')
			.first()
			.screenshot({
				path: './.playwright-mcp/video-masterclass-baseline-hero.png',
			});

		// Featured masterclasses section
		await page
			.locator('h2')
			.filter({ hasText: 'Featured Masterclasses' })
			.locator('..')
			.screenshot({
				path: './.playwright-mcp/video-masterclass-baseline-featured.png',
			});

		// UCAS guide section
		await page
			.locator('h2')
			.filter({ hasText: "Elizabeth's Essential UCAS Guide" })
			.locator('..')
			.screenshot({
				path: './.playwright-mcp/video-masterclass-baseline-ucas.png',
			});

		// British culture section
		await page
			.locator('h2')
			.filter({ hasText: 'British Culture & Literary Classics' })
			.locator('..')
			.screenshot({
				path: './.playwright-mcp/video-masterclass-baseline-culture.png',
			});

		// Individual video card
		await page.locator('.aspect-video').first().locator('..').screenshot({
			path: './.playwright-mcp/video-masterclass-baseline-card.png',
		});
	});

	// CONTEXT7 SOURCE: /microsoft/playwright - Responsive screenshots for different viewports
	// RESPONSIVE DOCUMENTATION REASON: Official Playwright documentation for viewport testing
	test('should capture responsive screenshots', async ({ page }) => {
		await page.goto(MASTERCLASS_PAGE_URL);

		// Mobile screenshot
		await page.setViewportSize({ width: 375, height: 667 });
		await page.waitForLoadState('networkidle');
		await page.screenshot({
			path: './.playwright-mcp/video-masterclass-baseline-mobile.png',
			fullPage: true,
		});

		// Tablet screenshot
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.waitForLoadState('networkidle');
		await page.screenshot({
			path: './.playwright-mcp/video-masterclass-baseline-tablet.png',
			fullPage: true,
		});

		// Desktop screenshot
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.waitForLoadState('networkidle');
		await page.screenshot({
			path: './.playwright-mcp/video-masterclass-baseline-desktop.png',
			fullPage: true,
		});
	});
});
