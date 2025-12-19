import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

/**
 * Local Testing Configuration for Site Health Monitoring
 *
 * This configuration extends the base Playwright config for local development testing.
 * Use this when you want to test the broken link detection against your local dev server.
 *
 * Usage:
 *   npm run dev (in one terminal)
 *   npm run health:local (in another terminal)
 */

export default defineConfig({
  ...baseConfig,

  // Override base URL for local testing
  use: {
    ...baseConfig.use,
    baseURL: 'http://localhost:3000',

    // Faster timeouts for local testing
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  // Local development specific settings
  workers: 2, // Fewer workers for local testing
  retries: 1, // Fewer retries for faster feedback

  // Enhanced local reporting
  reporter: [
    ['html', { outputFolder: 'playwright-report-local' }],
    ['json', { outputFile: 'test-results/results-local.json' }],
    ['list', { printSteps: true }], // More verbose output for debugging
  ],

  // Ensure local server is running
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true, // Don't start if already running
    timeout: 120 * 1000,
  },

  // Test specific configurations for local development
  projects: [
    {
      name: 'local-chromium',
      use: {
        ...baseConfig.projects?.[0]?.use,
        // Local specific browser settings
        headless: false, // Show browser for debugging
        launchOptions: {
          slowMo: 50,    // Slow down actions for visibility (placed in launchOptions)
        },
      },
    },
    // Only test Chromium locally for faster feedback
  ],
});