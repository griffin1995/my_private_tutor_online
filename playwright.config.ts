import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for My Private Tutor Online
 *
 * Enhanced configuration for modern e2e testing with:
 * - Accessibility testing (@axe-core/playwright)
 * - Performance monitoring (web-vitals)
 * - Comprehensive reporting and tracing
 * - Mobile-first responsive testing
 */
export default defineConfig({
	testDir: './tests',

	// Test execution configuration
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,

	// Enhanced timeout configuration for comprehensive tests
	timeout: 60 * 1000, // 60 seconds for individual tests
	expect: {
		timeout: 10 * 1000, // 10 seconds for expect assertions
	},

	// Comprehensive reporting for different stakeholders
	reporter: [
		['html', {
			outputFolder: 'playwright-report',
			open: process.env.CI ? 'never' : 'on-failure'
		}],
		['json', { outputFile: 'test-results/results.json' }],
		['junit', { outputFile: 'test-results/junit.xml' }],
		// Add list reporter for CI/CD pipeline feedback
		['list'],
		// Add GitHub Actions reporter for CI integration
		...(process.env.CI ? [['github' as const]] : []),
	],

	// Enhanced global test configuration
	use: {
		// Base URL configuration for different environments
		baseURL: process.env.CI
			? 'https://www.myprivatetutoronline.com'
			: 'http://localhost:3000',

		// Enhanced debugging and tracing
		trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',

		// Action and navigation timeouts for stability
		actionTimeout: 15 * 1000, // 15 seconds for actions
		navigationTimeout: 30 * 1000, // 30 seconds for navigation

		// Enhanced browser context for modern web features
		ignoreHTTPSErrors: true,
		acceptDownloads: true,

		// User agent for consistent testing
		userAgent: 'MyPrivateTutorOnline-E2E-Tests/1.0',

		// Viewport configuration (mobile-first)
		viewport: { width: 1280, height: 720 },

		// Network configuration for performance testing
		launchOptions: {
			slowMo: process.env.CI ? 0 : 50, // Slow down for local debugging
		},
	},

	// Enhanced project configuration for comprehensive testing
	projects: [
		// Desktop browsers with performance monitoring
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				// Enhanced Chrome flags for performance testing
				launchOptions: {
					args: [
						'--enable-web-bluetooth',
						'--enable-features=VaapiVideoDecoder',
						'--disable-features=TranslateUI',
						'--disable-ipc-flooding-protection',
					],
				},
			},
			testMatch: ['**/*.spec.ts'],
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
			testMatch: ['**/*.spec.ts'],
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
			testMatch: ['**/*.spec.ts'],
		},

		// Mobile testing with responsive design validation
		{
			name: 'mobile-chrome',
			use: {
				...devices['Pixel 5'],
				// Mobile-specific configuration
				isMobile: true,
				hasTouch: true,
			},
			testMatch: ['**/*.spec.ts'],
		},
		{
			name: 'mobile-safari',
			use: {
				...devices['iPhone 12'],
				// iOS-specific configuration
				isMobile: true,
				hasTouch: true,
			},
			testMatch: ['**/*.spec.ts'],
		},

		// Accessibility-focused testing project
		{
			name: 'accessibility',
			use: {
				...devices['Desktop Chrome'],
				// Enhanced for accessibility testing
				reducedMotion: 'reduce',
				forcedColors: 'active',
			},
			testMatch: ['**/accessibility.spec.ts'],
		},

		// Performance-focused testing project
		{
			name: 'performance',
			use: {
				...devices['Desktop Chrome'],
				// Performance testing optimisation
				viewport: { width: 1920, height: 1080 },
			},
			testMatch: ['**/performance.spec.ts'],
		},
	],

	// Enhanced web server configuration
	webServer: process.env.CI ? undefined : {
		command: 'npm run dev',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
		// Enhanced startup validation
		cwd: process.cwd(),
		env: {
			NODE_ENV: 'test',
		},
	},

	// Global setup and teardown for enhanced testing
	globalSetup: undefined, // Can be added for database seeding, etc.
	globalTeardown: undefined, // Can be added for cleanup

	// Test output directory organisation
	outputDir: 'test-results/',

	// Enhanced metadata for test organisation
	metadata: {
		testType: 'e2e',
		framework: 'next.js',
		version: '15.3.4',
		browser: 'multi',
		platform: process.platform,
	},
});