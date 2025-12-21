// CONTEXT7 SOURCE: /lint-staged/lint-staged - Modern 2024-2025 lint-staged configuration
// CONTEXT7 SOURCE: /vercel/next.js - Next.js optimized lint-staged patterns
// CONTEXT7 SOURCE: /prettier/prettier - Prettier 3.x integration with lint-staged

import path from 'path'

// CONTEXT7 SOURCE: /vercel/next.js - Advanced ESLint configuration for Next.js projects
// Build ESLint command for Next.js with proper file handling
const buildEslintCommand = (filenames) =>
	`eslint --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(' ')}`

// CONTEXT7 SOURCE: /prettier/prettier - Prettier formatting with ignore-unknown for safety
const buildPrettierCommand = (filenames) =>
	`prettier --write ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(' ')}`

// CONTEXT7 SOURCE: /lint-staged/lint-staged - Modern lint-staged configuration for 2024-2025
export default {
	// JavaScript and TypeScript files - Full auto-fix workflow
	'*.{js,jsx,ts,tsx}': [buildEslintCommand, buildPrettierCommand],

	// JSON, CSS, Markdown - Prettier formatting only
	'*.{json,css,scss,md,mdx}': [buildPrettierCommand],

	// Package.json - Special handling to avoid breaking package manager locks
	'package.json': ['prettier --write'],

	// Configuration files - Prettier only (avoid ESLint conflicts)
	'*.{yml,yaml}': ['prettier --write'],

	// TypeScript config files - Type check after formatting
	'tsconfig*.json': [
		'prettier --write',
		// Note: tsc --noEmit runs on all files, not just staged ones
		// This is intentional to catch type errors from changes
		() => 'tsc --noEmit',
	],
}
