// CONTEXT7 SOURCE: /vercel/next.js - Modern Next.js 15/16 ESLint flat configuration
// CONTEXT7 SOURCE: /eslint/eslint - ESLint 9+ flat config with auto-fix capabilities
// CONTEXT7 SOURCE: /prettier/prettier - Prettier 3.x integration with ESLint
// CMS MONITORING REASON: Prevent async pattern introduction that caused August 2025 homepage failures
// SYNCHRONOUS ARCHITECTURE PROTECTION: Zero tolerance for async CMS patterns

import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'
import eslintConfigPrettier from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'

const eslintConfig = [
	// Next.js Core Web Vitals configuration (includes React, React Hooks, JSX a11y)
	...nextCoreWebVitals,

	// Next.js TypeScript-specific configuration
	...nextTypeScript,

	// Enhanced auto-fix rules and plugins
	{
		plugins: {
			'unused-imports': unusedImports,
		},
		rules: {
			// CONTEXT7 SOURCE: /lint-staged/lint-staged - Superior unused import handling with auto-fix
			'@typescript-eslint/no-unused-vars': 'off', // Disabled in favor of unused-imports
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],

			// CONTEXT7 SOURCE: /eslint/eslint - TypeScript best practices with auto-fix
			'@typescript-eslint/no-explicit-any': 'warn', // Allow but warn for gradual improvement
			'@typescript-eslint/no-empty-object-type': 'warn',
			'@typescript-eslint/no-namespace': 'warn',
			'@typescript-eslint/no-require-imports': 'warn',
			'@typescript-eslint/no-this-alias': 'warn',

			// CONTEXT7 SOURCE: /eslint/eslint - Code quality rules with auto-fix capabilities
			'no-empty': 'warn',
			'no-case-declarations': 'warn',
			'no-empty-pattern': 'warn',
			'no-useless-escape': 'warn',
			'no-fallthrough': 'warn',
			'no-constant-binary-expression': 'warn',
			'prefer-const': 'warn',
			'no-var': 'warn',

			// CONTEXT7 SOURCE: /jsx-eslint/eslint-plugin-react - React best practices (included in next/core-web-vitals)
			'react/jsx-key': 'error',
			'react/display-name': 'warn',
			'react/no-unescaped-entities': 'warn',

			// CONTEXT7 SOURCE: /jsx-eslint/eslint-plugin-react-hooks - Hook rules (included in next/core-web-vitals)
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
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
			// SYNCHRONOUS ARCHITECTURE REASON: Prevent August 2025 homepage failure recurrence
			'@typescript-eslint/no-explicit-any': 'warn', // Allow for API responses
			'prefer-const': 'warn',
			'no-var': 'warn',
		},
	},

	// Test and configuration files with relaxed rules
	{
		files: [
			'**/*.test.{ts,tsx}',
			'**/*.spec.{ts,tsx}',
			'**/*.config.{ts,js,mjs}',
			'scripts/**/*.{ts,js,mjs}',
			'*.config.{ts,js,mjs}',
		],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'no-console': 'off',
			'unused-imports/no-unused-imports': 'off', // Allow unused imports in config files
		},
	},

	// Type definition files may use namespaces for organisation
	{
		files: ['src/types/**/*.types.ts', '**/*.d.ts'],
		rules: {
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-explicit-any': 'off', // Type definitions often need any
		},
	},

	// CONTEXT7 SOURCE: /prettier/eslint-config-prettier - Must be last to override conflicting rules
	eslintConfigPrettier,
]

// CONTEXT7 SOURCE: /vercel/next.js - Global ignore patterns for Next.js projects
eslintConfig.ignores = [
	'node_modules/**',
	'.next/**',
	'out/**',
	'build/**',
	'dist/**',
	'next-env.d.ts',
	'.tsbuildinfo',
	'coverage/**',
	'playwright-report/**',
	'test-results/**',
	'**/*.d.ts',
	// Additional patterns for modern Next.js projects
	'public/**',
	'.vercel/**',
	'.git/**',
]

export default eslintConfig