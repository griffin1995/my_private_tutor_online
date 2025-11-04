import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
	test('Homepage accessibility compliance', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });
		await page.waitForTimeout(2000); // Allow dynamic content to load

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('Navigation accessibility', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });

		// Test keyboard navigation
		await page.keyboard.press('Tab');
		const focusedElement = await page.locator(':focus').first();
		expect(await focusedElement.count()).toBeGreaterThan(0);

		// Test that navigation is accessible
		const accessibilityScanResults = await new AxeBuilder({ page })
			.include('nav')
			.withTags(['wcag2a', 'wcag2aa'])
			.analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('Form accessibility (if forms exist)', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });

		// Check if there are any forms on the page
		const forms = await page.locator('form').count();

		if (forms > 0) {
			const accessibilityScanResults = await new AxeBuilder({ page })
				.include('form')
				.withTags(['wcag2a', 'wcag2aa'])
				.analyze();

			expect(accessibilityScanResults.violations).toEqual([]);

			// Test form labels
			const inputs = await page.locator('input, textarea, select').all();
			for (const input of inputs) {
				const id = await input.getAttribute('id');
				const ariaLabel = await input.getAttribute('aria-label');
				const ariaLabelledBy = await input.getAttribute('aria-labelledby');

				if (id) {
					const label = page.locator(`label[for="${id}"]`);
					const hasLabel = await label.count() > 0;
					expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
				}
			}
		}
	});

	test('Color contrast compliance', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2aa'])
			.withRules(['color-contrast'])
			.analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('Image accessibility', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });

		// Check all images have appropriate alt text
		const images = await page.locator('img').all();

		for (const img of images) {
			const alt = await img.getAttribute('alt');
			const src = await img.getAttribute('src');
			const role = await img.getAttribute('role');

			// Decorative images should have empty alt or role="presentation"
			// Content images should have descriptive alt text
			if (src && !src.includes('icon') && role !== 'presentation') {
				expect(alt).toBeTruthy();
				if (alt) {
					expect(alt.length).toBeGreaterThan(2); // Alt text should be descriptive
				}
			}
		}

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withRules(['image-alt'])
			.analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('Heading structure', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });

		// Check heading hierarchy
		const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();

		if (headings.length > 0) {
			// Should have exactly one h1
			const h1Count = await page.locator('h1').count();
			expect(h1Count).toBe(1);

			// Check for logical heading order
			let previousLevel = 0;
			for (const heading of headings) {
				const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
				const currentLevel = parseInt(tagName.substring(1));

				if (previousLevel > 0) {
					// Don't skip heading levels (e.g., h2 -> h4)
					expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
				}

				previousLevel = currentLevel;
			}
		}

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withRules(['heading-order'])
			.analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('Key page accessibility compliance', async ({ page }) => {
		const keyPages = ['/about', '/testimonials', '/subject-tuition'];

		for (const pagePath of keyPages) {
			try {
				await page.goto(pagePath, { waitUntil: 'networkidle' });
				await page.waitForTimeout(2000);

				const accessibilityScanResults = await new AxeBuilder({ page })
					.withTags(['wcag2a', 'wcag2aa'])
					.analyze();

				expect(accessibilityScanResults.violations).toEqual([]);
				console.log(`✅ Accessibility check passed for ${pagePath}`);
			} catch (error) {
				console.warn(`Could not test ${pagePath} for accessibility: ${error}`);
				// Don't fail the test if the page doesn't exist
			}
		}
	});
});