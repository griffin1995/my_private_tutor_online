/**
 * CONTEXT7 SOURCE: /microsoft/playwright - Quick video link analysis for masterclass page
 * TEST PURPOSE: Focused analysis of video functionality issues
 * IMPLEMENTATION REASON: Faster testing approach to identify specific video problems
 */

import { test, expect } from '@playwright/test';

test.describe('Video Masterclasses - Quick Video Link Analysis', () => {
	test('Identify video elements and test basic functionality', async ({
		page,
	}) => {
		// Navigate to video masterclasses page
		await page.goto('http://localhost:3001/video-masterclasses');
		await page.waitForLoadState('networkidle');

		console.log('🔍 Analyzing video elements on masterclass page...');

		// Check for video thumbnail containers
		const videoThumbnails = await page
			.locator('.video-thumbnail-container')
			.all();
		console.log(`Found ${videoThumbnails.length} video thumbnail containers`);

		// Check for play buttons
		const playButtons = await page
			.locator('.video-play-button, button:has(svg)')
			.all();
		console.log(`Found ${playButtons.length} play buttons`);

		// Check for CTA buttons
		const ctaButtons = await page
			.locator(
				'.video-cta-button, button:has-text("Purchase"), button:has-text("Watch")',
			)
			.all();
		console.log(`Found ${ctaButtons.length} CTA buttons`);

		// Check for modal dialogs
		const modals = await page.locator('[role="dialog"], .modal').all();
		console.log(`Found ${modals.length} modal elements (should be 0 initially)`);

		// Test first video thumbnail if available
		if (videoThumbnails.length > 0) {
			console.log('\n🎬 Testing first video thumbnail...');
			const firstThumbnail = videoThumbnails[0];

			try {
				await firstThumbnail.click({ timeout: 5000 });
				await page.waitForTimeout(2000);

				// Check if modal opened
				const openModal = await page
					.locator('[role="dialog"]:visible, .modal:visible')
					.first();
				const modalVisible = await openModal.isVisible().catch(() => false);

				console.log(`Modal opened: ${modalVisible}`);

				if (modalVisible) {
					// Check for video in modal
					const videoInModal = await openModal.locator('video, iframe').count();
					console.log(`Videos in modal: ${videoInModal}`);

					// Check video sources
					const videoElement = openModal.locator('video').first();
					if ((await videoElement.count()) > 0) {
						const videoSrc = await videoElement.getAttribute('src');
						console.log(`Video source: ${videoSrc}`);

						// Test if video source exists
						if (videoSrc && videoSrc.startsWith('/')) {
							try {
								const response = await page.request.head(videoSrc);
								console.log(`Video file status: ${response.status()}`);
							} catch (error) {
								console.log(`❌ Video file check failed: ${error}`);
							}
						}
					}

					// Close modal
					await page.keyboard.press('Escape');
				}
			} catch (error) {
				console.log(`❌ Video thumbnail click failed: ${error}`);
			}
		}

		// Test purchase buttons
		if (ctaButtons.length > 0) {
			console.log('\n💰 Testing purchase/CTA buttons...');

			for (let i = 0; i < Math.min(ctaButtons.length, 3); i++) {
				const button = ctaButtons[i];
				const buttonText = await button.textContent();

				console.log(`Testing button: "${buttonText}"`);

				try {
					// Check if button is clickable
					await button.click({ timeout: 3000, trial: true });
					console.log(`✅ Button "${buttonText}" is clickable`);
				} catch (error) {
					console.log(`❌ Button "${buttonText}" not clickable: ${error}`);
				}
			}
		}

		// Check for JavaScript console errors
		const consoleMessages: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				consoleMessages.push(msg.text());
			}
		});

		// Wait a bit more to catch any console errors
		await page.waitForTimeout(3000);

		if (consoleMessages.length > 0) {
			console.log('\n⚠️  Console errors detected:');
			consoleMessages.forEach((msg, index) => {
				console.log(`  ${index + 1}. ${msg}`);
			});
		} else {
			console.log('\n✅ No console errors detected');
		}

		// Summary
		console.log('\n📊 QUICK ANALYSIS SUMMARY:');
		console.log(`Video thumbnails: ${videoThumbnails.length}`);
		console.log(`Play buttons: ${playButtons.length}`);
		console.log(`CTA buttons: ${ctaButtons.length}`);
		console.log(`Console errors: ${consoleMessages.length}`);
	});

	test('Check specific video sources in CMS', async ({ page }) => {
		console.log('🔍 Checking video sources defined in CMS...');

		await page.goto('http://localhost:3001/video-masterclasses');
		await page.waitForLoadState('networkidle');

		// Check for video elements with src attributes
		const videoElements = await page.locator('video[src]').all();
		console.log(
			`Found ${videoElements.length} video elements with src attributes`,
		);

		for (let i = 0; i < videoElements.length; i++) {
			const video = videoElements[i];
			const src = await video.getAttribute('src');
			console.log(`\nVideo ${i + 1} source: ${src}`);

			if (src && src.startsWith('/')) {
				try {
					const response = await page.request.head(src);
					const status = response.status();
					console.log(`  Status: ${status} ${status < 400 ? '✅' : '❌'}`);
				} catch (error) {
					console.log(`  ❌ Request failed: ${error}`);
				}
			}
		}

		// Check for iframe video embeds
		const iframes = await page
			.locator('iframe[src*="video"], iframe[src*="youtube"]')
			.all();
		console.log(`\nFound ${iframes.length} iframe video embeds`);

		for (let i = 0; i < iframes.length; i++) {
			const iframe = iframes[i];
			const src = await iframe.getAttribute('src');
			console.log(`Iframe ${i + 1} source: ${src}`);
		}
	});

	test('Test video modal state management', async ({ page }) => {
		console.log('🎬 Testing video modal state management...');

		await page.goto('http://localhost:3001/video-masterclasses');
		await page.waitForLoadState('networkidle');

		// Look for video modal state variables
		const hasVideoModalState = await page.evaluate(() => {
			// Check if React state exists for video modal
			const reactFiber =
				(window as any).React ||
				(document.querySelector('#__next') as any)?._reactInternalInstance;
			return !!reactFiber;
		});

		console.log(`React detected: ${hasVideoModalState}`);

		// Check for video modal elements in DOM
		const modalElements = await page
			.locator('.fixed.inset-0, [role="dialog"]')
			.all();
		console.log(`Modal elements in DOM: ${modalElements.length}`);

		// Check for video loading states
		const loadingElements = await page
			.locator('.animate-pulse, .loading, .spinner')
			.all();
		console.log(`Loading elements: ${loadingElements.length}`);

		// Test escape key functionality
		console.log('\nTesting escape key modal close...');
		await page.keyboard.press('Escape');
		await page.waitForTimeout(1000);

		const visibleModals = await page.locator('[role="dialog"]:visible').count();
		console.log(`Visible modals after Escape: ${visibleModals}`);
	});
});
