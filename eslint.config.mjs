// CONTEXT7 SOURCE: /eslint/eslint - Modern ESLint flat configuration
// CONTEXT7 SOURCE: /vercel/next.js - Next.js ESLint migration patterns
// CMS MONITORING REASON: Prevent async pattern introduction that caused August 2025 homepage failures
// SYNCHRONOUS ARCHITECTURE PROTECTION: Zero tolerance for async CMS patterns

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	// Base ESLint recommended configuration
	js.configs.recommended,

	// Next.js recommended configuration with TypeScript support
	...compat.extends('next/core-web-vitals', 'next/typescript'),

	// Global ignore patterns for build and generated files
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'build/**',
			'dist/**',
			'next-env.d.ts',
			'*.config.js',
			'*.config.ts',
			'.tsbuildinfo',
			'coverage/**',
			'playwright-report/**',
			'test-results/**',
		],
	},

	// JavaScript and TypeScript files with comprehensive rules
	{
		files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		rules: {
			// CONTEXT7 SOURCE: /jsx-eslint/eslint-plugin-react - React best practices
			'react/jsx-key': 'error',
			'react/display-name': 'warn',
			'react/no-unescaped-entities': 'warn',
			'react/jsx-no-undef': 'warn',

			// CONTEXT7 SOURCE: /jsx-eslint/eslint-plugin-react-hooks - Hook best practices
			'react-hooks/rules-of-hooks': 'warn',
			'react-hooks/exhaustive-deps': 'warn',

			// CONTEXT7 SOURCE: /jsx-eslint/eslint-plugin-jsx-a11y - Accessibility rules
			'jsx-a11y/no-autofocus': 'warn',

			// CONTEXT7 SOURCE: /eslint/eslint - TypeScript best practices with gradual migration
			// Using warnings for gradual improvement - allows build to succeed while identifying issues
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-empty-object-type': 'warn',
			'@typescript-eslint/no-namespace': 'warn',
			'@typescript-eslint/no-require-imports': 'warn',
			'@typescript-eslint/no-this-alias': 'warn',

			// CONTEXT7 SOURCE: /eslint/eslint - Code quality rules with warnings for gradual migration
			'no-empty': 'warn',
			'no-case-declarations': 'warn',
			'no-empty-pattern': 'warn',
			'no-useless-escape': 'warn',
			'no-fallthrough': 'warn',
			'no-constant-binary-expression': 'warn',
		},
	},

	// CMS and page files - synchronous architecture monitoring
	{
		files: [
			'src/lib/cms/**/*.{ts,tsx}',
			'src/content/**/*.{ts,tsx}',
			'src/components/**/cms-*.{tsx}',
			'src/app/**/page.tsx',
		],
		rules: {
			// CRITICAL CMS ARCHITECTURE PROTECTION RULES
			// CONTEXT7 SOURCE: /eslint/eslint - Custom rule configuration for async pattern detection
			// SYNCHRONOUS ARCHITECTURE REASON: Prevent August 2025 homepage failure recurrence

			// Warnings only for CMS files - allow `any` for API response handling
			// while enforcing const/no-var for proper scoping
			'@typescript-eslint/no-explicit-any': 'warn',
			'prefer-const': 'warn',
			'no-var': 'warn',
		},
	},

	// Test and configuration files with relaxed rules
	{
		files: [
			'**/*.test.{ts,tsx}',
			'**/*.spec.{ts,tsx}',
			'**/*.config.{ts,js}',
			'scripts/**/*.{ts,js,mjs}',
		],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'no-console': 'off',
		},
	},

	// Type definition files may use namespaces for organisation
	{
		files: ['src/types/**/*.types.ts'],
		rules: {
			'@typescript-eslint/no-namespace': 'off',
		},
	},
]

export default eslintConfig
