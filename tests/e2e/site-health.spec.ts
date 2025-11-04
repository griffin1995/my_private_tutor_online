import { test, expect } from '@playwright/test';
import { XMLParser } from 'fast-xml-parser';

interface SitemapEntry {
	loc: string;
	lastmod?: string;
	changefreq?: string;
	priority?: string;
}

interface SitemapData {
	urlset: {
		url: SitemapEntry[];
	};
}

async function getSitemapUrls(baseUrl: string): Promise<string[]> {
	try {
		const sitemapUrl = `${baseUrl}/sitemap.xml`;
		const response = await fetch(sitemapUrl);

		if (!response.ok) {
			console.warn(`Could not fetch sitemap from ${sitemapUrl}, using fallback URLs`);
			return getFallbackUrls(baseUrl);
		}

		const xmlText = await response.text();
		const parser = new XMLParser();
		const sitemapData = parser.parse(xmlText) as SitemapData;

		if (!sitemapData.urlset?.url) {
			console.warn('Invalid sitemap structure, using fallback URLs');
			return getFallbackUrls(baseUrl);
		}

		return sitemapData.urlset.url.map(entry => entry.loc);
	} catch (error) {
		console.warn(`Error parsing sitemap: ${error}, using fallback URLs`);
		return getFallbackUrls(baseUrl);
	}
}

function getFallbackUrls(baseUrl: string): string[] {
	return [
		`${baseUrl}`,
		`${baseUrl}/about`,
		`${baseUrl}/testimonials`,
		`${baseUrl}/video-masterclasses`,
		`${baseUrl}/subject-tuition`,
		`${baseUrl}/how-it-works`,
		`${baseUrl}/resources`,
	];
}

test.describe('Site Health Check', () => {
	let urls: string[];

	test.beforeAll(async ({ baseURL }) => {
		if (!baseURL) {
			throw new Error('Base URL not configured');
		}
		urls = await getSitemapUrls(baseURL);
		console.log(`Found ${urls.length} URLs to test:`, urls);
	});

	for (let i = 0; i < 20; i++) { // Pre-allocate slots for dynamic tests
		test(`Page health check ${i + 1}`, async ({ page, baseURL }) => {
			if (i >= urls.length) {
				test.skip('No more URLs to test');
			}

			const url = urls[i];
			const errors: string[] = [];
			const warnings: string[] = [];

			// Setup error listeners
			page.on('console', msg => {
				if (msg.type() === 'error') {
					errors.push(`Console Error: ${msg.text()}`);
				} else if (msg.type() === 'warning' && msg.text().includes('404')) {
					warnings.push(`Console Warning: ${msg.text()}`);
				}
			});

			page.on('pageerror', error => {
				errors.push(`Page Error: ${error.message}`);
			});

			page.on('requestfailed', request => {
				const url = request.url();
				const failure = request.failure();
				// Only report critical failures, ignore some common non-critical ones
				if (!url.includes('favicon.ico') && !url.includes('apple-touch-icon') && !url.includes('analytics')) {
					errors.push(`Failed Request: ${url} (${failure?.errorText || 'Unknown error'})`);
				}
			});

			// Navigate to page
			console.log(`Testing: ${url}`);
			await page.goto(url, {
				waitUntil: 'networkidle',
				timeout: 30000
			});

			// Wait for React/Next.js to fully render and hydrate
			await page.waitForLoadState('domcontentloaded');
			await page.waitForTimeout(3000); // Allow time for dynamic content

			// Basic page checks
			const pageTitle = await page.title();
			expect(pageTitle).toBeTruthy();
			expect(pageTitle).not.toContain('404');
			expect(pageTitle).not.toContain('Error');
			expect(pageTitle).not.toContain('Page Not Found');

			// Check for essential elements
			const bodyElement = await page.locator('body').count();
			expect(bodyElement).toBe(1);

			// Check response status
			const response = await page.request.get(url);
			expect(response.status()).toBe(200);

			// Report accumulated errors and warnings
			if (warnings.length > 0) {
				console.warn(`Warnings for ${url}:`, warnings);
			}

			if (errors.length > 0) {
				console.error(`Errors for ${url}:`, errors);
				expect(errors).toHaveLength(0); // This will fail the test with error details
			}

			console.log(`✅ ${url} - All checks passed`);
		});
	}

	test('Site-wide accessibility check', async ({ page, baseURL }) => {
		if (!baseURL || urls.length === 0) {
			test.skip('No URLs to test for accessibility');
		}

		// Test accessibility on key pages only (to avoid timeout)
		const keyPages = urls.slice(0, 5);

		for (const url of keyPages) {
			await page.goto(url, { waitUntil: 'networkidle' });
			await page.waitForTimeout(2000);

			// Basic accessibility checks
			const images = await page.locator('img').all();
			for (const img of images) {
				const alt = await img.getAttribute('alt');
				const src = await img.getAttribute('src');
				if (src && !src.includes('icon') && !src.includes('logo')) {
					expect(alt).toBeTruthy(); // Images should have alt text
				}
			}

			// Check for heading hierarchy
			const h1Count = await page.locator('h1').count();
			expect(h1Count).toBeGreaterThanOrEqual(1); // Should have at least one h1
			expect(h1Count).toBeLessThanOrEqual(2); // Should not have too many h1s

			console.log(`✅ Accessibility check passed for ${url}`);
		}
	});
});