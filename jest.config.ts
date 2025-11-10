import type { Config } from 'jest';

/**
 * Jest Configuration for My Private Tutor Online
 * CONTEXT7 SOURCE: /jestjs/jest - Recommended Next.js testing patterns
 *
 * Setup includes:
 * - TypeScript support via ts-jest
 * - jsdom test environment for React components
 * - Path alias resolution (@/*)
 * - Coverage thresholds (80% general, 100% critical paths)
 * - Test organization by feature
 */

const config: Config = {
	// TypeScript preset
	preset: 'ts-jest',

	// Test environment for React component testing
	testEnvironment: 'jsdom',

	// Root directories for test discovery
	roots: ['<rootDir>/src', '<rootDir>/tests'],

	// Module paths for imports
	modulePaths: ['<rootDir>'],

	// Map TypeScript path aliases
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},

	// Global setup/teardown
	setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],

	// Test file patterns
	testMatch: [
		'<rootDir>/tests/unit/**/*.test.ts',
		'<rootDir>/tests/unit/**/*.test.tsx',
		'<rootDir>/tests/integration/**/*.test.ts',
		'<rootDir>/tests/integration/**/*.test.tsx',
	],

	// Exclude patterns
	testPathIgnorePatterns: [
		'/node_modules/',
		'/.next/',
		'/dist/',
	],

	// Coverage collection
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/*.d.ts',
		'!src/**/*.stories.tsx',
		'!src/payload.config.ts',
		'!src/design-tokens/**/*',
		'!src/providers/**/*',
	],

	// Coverage thresholds
	// CRITICAL: 100% for security-sensitive modules
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
		// SECURITY-CRITICAL: Rate limiting, CSRF, input validation
		'./src/middleware/security.ts': {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
		// CMS-CRITICAL: Homepage depends entirely on this module
		'./src/lib/cms/cms-content.ts': {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
		// REVENUE-CRITICAL: Contact form is primary lead generation
		'./src/app/api/contact/route.ts': {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},

	// Transform files
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: {
					jsx: 'react-jsx',
					esModuleInterop: true,
					allowSyntheticDefaultImports: true,
				},
			},
		],
	},

	// Module file extensions
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

	// Verbose output
	verbose: true,

	// Test timeout
	testTimeout: 10000,

	// Max workers for parallel test execution
	// Recommendation: 4 for CI/CD, auto for local development
	maxWorkers: process.env.CI ? 2 : '50%',

	// Show coverage summary
	coverageReporters: [
		'text',
		'text-summary',
		'html',
		'json',
		'lcov',
		'cobertura',
	],

	// Coverage directory
	coverageDirectory: '<rootDir>/coverage',

	// Clear mocks between tests
	clearMocks: true,

	// Restore mocks between tests
	restoreMocks: true,

	// Reset mocks between tests
	resetMocks: true,
};

export default config;
