// CONTEXT7 SOURCE: /eslint/eslint - Custom ESLint configuration for CMS architecture protection
// CMS MONITORING REASON: Prevent async pattern introduction that caused August 2025 homepage failures
// SYNCHRONOUS ARCHITECTURE PROTECTION: Zero tolerance for async CMS patterns

module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'@typescript-eslint/recommended',
		'next/core-web-vitals',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['@typescript-eslint', 'react', 'react-hooks'],
	rules: {
		// CONTEXT7 SOURCE: /eslint/eslint - Standard TypeScript and React rules
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-explicit-any': 'warn',
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',

		// CRITICAL CMS ARCHITECTURE PROTECTION RULES
		// CONTEXT7 SOURCE: /eslint/eslint - Custom rule configuration for async pattern detection
		// SYNCHRONOUS ARCHITECTURE REASON: Prevent August 2025 homepage failure recurrence

		// Forbid async functions in CMS-related files
		'no-restricted-syntax': [
			'error',
			{
				selector: 'FunctionDeclaration[async=true]',
				message:
					'CRITICAL CMS VIOLATION: Async functions forbidden in CMS files. Use synchronous patterns only. August 2025 failure prevention.',
			},
			{
				selector: 'ArrowFunctionExpression[async=true]',
				message:
					'CRITICAL CMS VIOLATION: Async arrow functions forbidden in CMS files. Use synchronous patterns only.',
			},
			{
				selector: 'MethodDefinition[value.async=true]',
				message:
					'CRITICAL CMS VIOLATION: Async methods forbidden in CMS files. Use synchronous patterns only.',
			},
			{
				selector: 'Property[method=true][value.async=true]',
				message:
					'CRITICAL CMS VIOLATION: Async object methods forbidden in CMS files. Use synchronous patterns only.',
			},
		],

		// Forbid Promise return types in CMS functions
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: true,
				checksConditionals: true,
			},
		],

		// Forbid await keywords in CMS files
		'no-restricted-globals': [
			'error',
			{
				name: 'await',
				message:
					'CRITICAL CMS VIOLATION: await keyword forbidden in CMS files. Use synchronous data access only.',
			},
		],

		// Forbid useState/useEffect for static content
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						group: ['react'],
						importNames: ['useState', 'useEffect'],
						message:
							'CRITICAL CMS VIOLATION: useState/useEffect forbidden for static CMS content. Use direct function calls only.',
					},
				],
			},
		],
	},
	overrides: [
		{
			// CONTEXT7 SOURCE: /eslint/eslint - File-specific rule configuration
			// CMS FILE PROTECTION REASON: Extra strict rules for CMS architecture files
			files: [
				'src/lib/cms/**/*.ts',
				'src/lib/cms/**/*.tsx',
				'src/content/**/*.json',
				'src/components/**/cms-*.tsx',
				'src/app/**/page.tsx',
			],
			rules: {
				// MAXIMUM PROTECTION FOR CMS FILES
				'no-restricted-syntax': [
					'error',
					{
						selector: 'CallExpression[callee.name="useState"]',
						message:
							'CRITICAL CMS VIOLATION: useState forbidden for static CMS content. Causes August 2025 failure pattern.',
					},
					{
						selector: 'CallExpression[callee.name="useEffect"]',
						message:
							'CRITICAL CMS VIOLATION: useEffect forbidden for CMS data loading. Use direct function calls only.',
					},
					{
						selector:
							'CallExpression[callee.type="MemberExpression"][callee.object.name="Promise"]',
						message:
							'CRITICAL CMS VIOLATION: Promise methods forbidden in CMS files. Use synchronous patterns only.',
					},
					{
						selector: 'AwaitExpression',
						message:
							'CRITICAL CMS VIOLATION: await expressions forbidden in CMS files. Use synchronous data access.',
					},
					{
						selector: 'TSTypeReference[typeName.name="Promise"]',
						message:
							'CRITICAL CMS VIOLATION: Promise return types forbidden in CMS functions. Return data directly.',
					},
					{
						selector:
							'ImportDeclaration[source.value="react"][specifiers.0.imported.name="useState"]',
						message:
							'CRITICAL CMS VIOLATION: useState import forbidden in CMS files. Use synchronous architecture.',
					},
					{
						selector:
							'ImportDeclaration[source.value="react"][specifiers.0.imported.name="useEffect"]',
						message:
							'CRITICAL CMS VIOLATION: useEffect import forbidden in CMS files. Use direct function calls.',
					},
				],

				// CONTEXT7 SOURCE: /eslint/eslint - Enhanced error reporting for CMS violations
				'prefer-const': 'error',
				'no-var': 'error',
				'@typescript-eslint/explicit-function-return-type': [
					'error',
					{
						allowExpressions: false,
						allowTypedFunctionExpressions: false,
						allowHigherOrderFunctions: false,
					},
				],
			},
		},
	],
	ignorePatterns: [
		'node_modules/',
		'.next/',
		'out/',
		'dist/',
		'*.config.js',
		'*.config.ts',
	],
};
