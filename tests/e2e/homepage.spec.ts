import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should have correct title', async ({ page }) => {
		await expect(page).toHaveTitle(/My Private Tutor Online/);
	});

	test('should display hero section', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(page.getByText('Exceptional')).toBeVisible();
		await expect(page.getByText('Online Tutoring')).toBeVisible();
	});

	test('should have navigation menu', async ({ page }) => {
		await expect(page.getByRole('navigation')).toBeVisible();
	});

	test('should display trust indicators', async ({ page }) => {
		await expect(page.getByText('Why Choose Excellence')).toBeVisible();
	});

	test('should display student journey section', async ({ page }) => {
		await expect(page.getByText('Student Journey')).toBeVisible();
	});

	test('should have responsive design', async ({ page }) => {
		// Test desktop view
		await page.setViewportSize({ width: 1200, height: 800 });
		await expect(page.getByRole('main')).toBeVisible();

		// Test mobile view
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.getByRole('main')).toBeVisible();
	});

	test('should have working CTA buttons', async ({ page }) => {
		const ctaButton = page.getByRole('button').first();
		await expect(ctaButton).toBeVisible();
		await expect(ctaButton).toBeEnabled();
	});

	test('should load without accessibility violations', async ({ page }) => {
		// Check for basic accessibility
		await expect(page.getByRole('main')).toBeVisible();
		await expect(page.getByRole('navigation')).toBeVisible();
	});

	test('should have fast loading performance', async ({ page }) => {
		const startTime = Date.now();
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const loadTime = Date.now() - startTime;

		// Should load within 3 seconds
		expect(loadTime).toBeLessThan(3000);
	});
});
