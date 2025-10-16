import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Design System Audit', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('validates primary brand colors', async ({ page }) => {
		// Extract brand colors used on page
		const brandColors = await page.evaluate(() => {
			const elements = document.querySelectorAll('*');
			const colors = new Set<string>();
			elements.forEach((el) => {
				const style = getComputedStyle(el);
				if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
					colors.add(style.backgroundColor);
				}
				if (style.color) {
					colors.add(style.color);
				}
			});
			return Array.from(colors);
		});

		console.log('Brand colors found:', brandColors);
		expect(brandColors.length).toBeLessThan(25); // Enforce palette limit
	});

	test('validates typography consistency', async ({ page }) => {
		const fonts = await page.evaluate(() => {
			const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
			const fontData: Array<{
				tag: string;
				fontFamily: string;
				fontSize: string;
				fontWeight: string;
			}> = [];
			elements.forEach((el) => {
				const style = getComputedStyle(el);
				fontData.push({
					tag: el.tagName.toLowerCase(),
					fontFamily: style.fontFamily,
					fontSize: style.fontSize,
					fontWeight: style.fontWeight,
				});
			});
			return fontData;
		});

		console.log('Typography data:', fonts);

		// Validate primary font family usage
		const primaryFonts = fonts.filter((f) => f.fontFamily.includes('Inter'));
		expect(primaryFonts.length).toBeGreaterThan(0);
	});

	test('validates WCAG 2.1 AA compliance', async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2aa', 'wcag21aa'])
			.analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
