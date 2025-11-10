#!/usr/bin/env node

/**
 * CRITICAL: Comprehensive React codebase health analysis
 * CONTEXT7 SOURCE: React documentation - Common errors and best practices
 *
 * This script performs automated analysis of React code to detect:
 * - Invalid children patterns
 * - Hook rule violations
 * - Prop type mismatches
 * - Component lifecycle errors
 * - Performance issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

/**
 * Color codes for terminal output
 */
const colors = {
	reset: '\x1b[0m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	cyan: '\x1b[36m',
	bold: '\x1b[1m',
};

function log(message, color = 'reset') {
	console.log(`${colors[color]}${message}${colors.reset}`);
}

function section(title) {
	console.log('\n' + '='.repeat(60));
	log(title, 'bold');
	console.log('='.repeat(60));
}

/**
 * Read all React files in project
 */
function getReactFiles() {
	const files = [];
	const srcDir = path.join(projectRoot, 'src');

	function walkDir(dir) {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory() && !entry.name.startsWith('.')) {
				walkDir(fullPath);
			} else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
				files.push(fullPath);
			}
		}
	}

	walkDir(srcDir);
	return files;
}

/**
 * Analyse file for common React errors
 */
function analyseReactFile(filePath) {
	const content = fs.readFileSync(filePath, 'utf-8');
	const issues = [];
	const lines = content.split('\n');

	// Pattern 1: Invalid children objects
	const objectChildPattern = /\{[a-zA-Z_]\w*\}/g;
	lines.forEach((line, idx) => {
		// Detect likely object children
		if (
			line.includes('</') &&
			(line.match(/{[a-zA-Z_]\w*}/) || line.includes('{...')) &&
			!line.includes('JSON.stringify') &&
			!line.includes('toString')
		) {
			// This is a heuristic - may have false positives
			if (line.match(/{[a-zA-Z_]\w*}/)) {
				issues.push({
					type: 'POTENTIAL_INVALID_CHILDREN',
					severity: 'warn',
					line: idx + 1,
					code: line.trim(),
					message:
						'Potential invalid object as JSX child - verify object has no properties or use JSON.stringify',
				});
			}
		}
	});

	// Pattern 2: useState/useEffect in static CMS files
	if (
		filePath.includes('cms') ||
		filePath.includes('content') ||
		filePath.includes('page.tsx')
	) {
		if (content.includes('useState') || content.includes('useEffect')) {
			issues.push({
				type: 'STATIC_CONTENT_WITH_STATE',
				severity: 'error',
				message:
					'CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic',
			});
		}
	}

	// Pattern 3: Async functions in JSX rendering
	const asyncRenderPattern = /async\s+\w+\s*\([^)]*\)\s*{[^}]*<\w+/;
	if (asyncRenderPattern.test(content)) {
		issues.push({
			type: 'ASYNC_RENDER_FUNCTION',
			severity: 'error',
			message: 'Async function used for rendering - promises cannot be rendered directly',
		});
	}

	// Pattern 4: Promise children
	if (
		content.match(/<[A-Z]\w+>.*Promise\./)
	) {
		issues.push({
			type: 'PROMISE_CHILD',
			severity: 'error',
			message: 'Promise passed as JSX child - use useEffect and state instead',
		});
	}

	// Pattern 5: Missing React import (should not apply to modern React)
	if (
		content.includes('</') &&
		!content.includes("import React") &&
		!content.includes("from 'react'") &&
		!content.includes('from "react"')
	) {
		// This is okay in modern Next.js with new JSX transform
		// Only flag if it's not using "use client" directive
		if (!content.includes("'use client'") && !content.includes('"use client"')) {
			issues.push({
				type: 'MISSING_REACT_IMPORT',
				severity: 'info',
				message: 'Consider explicit React import for clarity in non-client components',
			});
		}
	}

	// Pattern 6: Hook usage outside client component
	if (
		(content.includes('useState') ||
			content.includes('useEffect') ||
			content.includes('useContext')) &&
		!content.includes("'use client'") &&
		!content.includes('"use client"')
	) {
		issues.push({
			type: 'HOOK_OUTSIDE_CLIENT_COMPONENT',
			severity: 'error',
			message: 'Hooks used outside client component - add "use client" directive',
		});
	}

	// Pattern 7: Conditional hook calls
	const conditionalPattern = /if\s*\([^)]*\)\s*{[^}]*use[A-Z]\w+/;
	if (conditionalPattern.test(content)) {
		issues.push({
			type: 'CONDITIONAL_HOOK_CALL',
			severity: 'error',
			message: 'Hooks called conditionally - violates Rules of Hooks',
		});
	}

	// Pattern 8: Missing key prop in lists
	lines.forEach((line, idx) => {
		if (
			line.includes('.map(') &&
			!line.includes('key=') &&
			lines[idx + 1] &&
			lines[idx + 1].includes('<')
		) {
			issues.push({
				type: 'MISSING_KEY_PROP',
				severity: 'warn',
				line: idx + 1,
				message: 'Array map without key prop - performance impact',
			});
		}
	});

	return issues;
}

/**
 * Run TypeScript compiler check
 */
function runTypeScriptCheck() {
	log('Running TypeScript compilation check...', 'cyan');
	try {
		const result = execSync(`cd "${projectRoot}" && npm run typecheck 2>&1`, {
			encoding: 'utf-8',
		});
		const lines = result.split('\n').filter((l) => l.trim());
		const errorCount = (result.match(/error TS\d+/g) || []).length;
		const warningCount = (result.match(/warning TS\d+/g) || []).length;

		return {
			success: !result.includes('error'),
			errorCount,
			warningCount,
			output: lines.slice(0, 20), // First 20 lines
		};
	} catch (error) {
		return {
			success: false,
			errorCount: 1,
			warningCount: 0,
			output: [error.message],
		};
	}
}

/**
 * Run ESLint check
 */
function runESLintCheck() {
	log('Running ESLint analysis...', 'cyan');
	try {
		const result = execSync(`cd "${projectRoot}" && npm run lint 2>&1`, {
			encoding: 'utf-8',
		});
		const errorCount = (result.match(/error/gi) || []).length;
		const warningCount = (result.match(/warning/gi) || []).length;

		return {
			success: errorCount === 0,
			errorCount,
			warningCount,
			output: result.split('\n').slice(0, 20),
		};
	} catch (error) {
		return {
			success: false,
			errorCount: 1,
			warningCount: 0,
			output: [error.message || 'ESLint check failed'],
		};
	}
}

/**
 * Build project and capture warnings
 */
function runBuildCheck() {
	log('Running Next.js build check (this may take a moment)...', 'cyan');
	try {
		const result = execSync(`cd "${projectRoot}" && npm run build 2>&1`, {
			encoding: 'utf-8',
			maxBuffer: 10 * 1024 * 1024, // 10MB buffer
		});

		const buildWarnings = result.match(/⚠[^\n]*/g) || [];
		const buildErrors = result.match(/✘[^\n]*/g) || [];
		const reactErrors = result.match(/Objects are not valid as a React child/g) || [];

		return {
			success: result.includes('Compiled successfully'),
			warnings: buildWarnings.length,
			errors: buildErrors.length,
			reactErrors: reactErrors.length,
			output: result.split('\n').filter((l) => l.includes('error') || l.includes('warning')).slice(0, 20),
		};
	} catch (error) {
		return {
			success: false,
			warnings: 0,
			errors: 1,
			reactErrors: 0,
			output: [error.message || 'Build check failed'],
		};
	}
}

/**
 * Analyse bundle size
 */
function analyseBundleSize() {
	log('Analysing bundle size...', 'cyan');
	try {
		const nextDir = path.join(projectRoot, '.next', 'static');
		if (!fs.existsSync(nextDir)) {
			return { totalSize: 0, files: [] };
		}

		const files = [];
		function walkDir(dir, base = '') {
			const entries = fs.readdirSync(dir);
			for (const entry of entries) {
				const fullPath = path.join(dir, entry);
				const stat = fs.statSync(fullPath);
				if (stat.isDirectory()) {
					walkDir(fullPath, path.join(base, entry));
				} else {
					files.push({
						path: path.join(base, entry),
						size: stat.size,
					});
				}
			}
		}

		walkDir(nextDir);
		const totalSize = files.reduce((sum, f) => sum + f.size, 0);
		const sorted = files.sort((a, b) => b.size - a.size).slice(0, 10);

		return { totalSize, files: sorted };
	} catch (error) {
		return { totalSize: 0, files: [], error: error.message };
	}
}

/**
 * Generate comprehensive report
 */
function generateReport() {
	section('REACT HEALTH ANALYSIS REPORT');

	// File analysis
	section('FILE-LEVEL ANALYSIS');
	const files = getReactFiles();
	log(`Scanning ${files.length} React files...`, 'cyan');

	const allIssues = [];
	const fileIssues = new Map();

	for (const file of files) {
		const issues = analyseReactFile(file);
		if (issues.length > 0) {
			fileIssues.set(file, issues);
			allIssues.push(...issues);
		}
	}

	if (allIssues.length === 0) {
		log('✓ No potential React issues detected in source files', 'green');
	} else {
		log(`✗ Found ${allIssues.length} potential issues`, 'red');
		for (const [file, issues] of fileIssues) {
			const relPath = path.relative(projectRoot, file);
			log(`\n  ${relPath}:`, 'yellow');
			for (const issue of issues) {
				const lineInfo = issue.line ? ` (line ${issue.line})` : '';
				log(`    [${issue.type}]${lineInfo}: ${issue.message}`, 'yellow');
				if (issue.code) {
					log(`      ${issue.code}`, 'reset');
				}
			}
		}
	}

	// TypeScript check
	section('TYPESCRIPT COMPILATION');
	const tsResult = runTypeScriptCheck();
	if (tsResult.success) {
		log(`✓ TypeScript compilation successful`, 'green');
	} else {
		log(
			`✗ TypeScript errors: ${tsResult.errorCount}, Warnings: ${tsResult.warningCount}`,
			'red'
		);
		tsResult.output.slice(0, 10).forEach((line) => log(`  ${line}`, 'reset'));
	}

	// ESLint check
	section('ESLINT ANALYSIS');
	const eslintResult = runESLintCheck();
	if (eslintResult.success) {
		log(`✓ ESLint: No errors found`, 'green');
	} else {
		log(
			`✗ ESLint issues - Errors: ${eslintResult.errorCount}, Warnings: ${eslintResult.warningCount}`,
			'red'
		);
		eslintResult.output.slice(0, 10).forEach((line) => {
			if (line.trim()) log(`  ${line}`, 'reset');
		});
	}

	// Build check
	section('NEXT.JS BUILD ANALYSIS');
	const buildResult = runBuildCheck();
	if (buildResult.success) {
		log(`✓ Build completed successfully`, 'green');
		log(`  Warnings: ${buildResult.warnings}`, 'cyan');
		log(`  React-specific errors: ${buildResult.reactErrors}`, 'cyan');
	} else {
		log(`✗ Build issues detected`, 'red');
		log(`  Errors: ${buildResult.errors}, Warnings: ${buildResult.warnings}`, 'reset');
		log(`  React errors: ${buildResult.reactErrors}`, 'reset');
		buildResult.output.slice(0, 5).forEach((line) => {
			if (line.trim()) log(`  ${line}`, 'reset');
		});
	}

	// Bundle analysis
	section('BUNDLE SIZE ANALYSIS');
	const bundleResult = analyseBundleSize();
	if (bundleResult.totalSize > 0) {
		const sizeMB = (bundleResult.totalSize / 1024 / 1024).toFixed(2);
		log(`Total bundle size: ${sizeMB} MB`, 'cyan');
		log(`\nLargest files:`, 'yellow');
		bundleResult.files.forEach((file) => {
			const sizeKB = (file.size / 1024).toFixed(2);
			log(`  ${file.path}: ${sizeKB} KB`, 'reset');
		});
	}

	// Summary
	section('SUMMARY');
	const totalIssues = allIssues.length;
	const errorCount = allIssues.filter((i) => i.severity === 'error').length;
	const warningCount = allIssues.filter((i) => i.severity === 'warn').length;

	log(`Total issues found: ${totalIssues}`, totalIssues === 0 ? 'green' : 'yellow');
	log(`  Errors: ${errorCount}`, errorCount > 0 ? 'red' : 'green');
	log(`  Warnings: ${warningCount}`, warningCount > 0 ? 'yellow' : 'green');
	log(`\nFiles scanned: ${files.length}`, 'cyan');

	// Recommendations
	section('RECOMMENDATIONS');
	if (errorCount > 0) {
		log('HIGH PRIORITY: Address React errors', 'red');
		allIssues.filter((i) => i.severity === 'error').slice(0, 5).forEach((issue) => {
			log(`  • ${issue.type}: ${issue.message}`, 'red');
		});
	}

	if (warningCount > 0) {
		log('Medium priority: Address warnings for optimal performance', 'yellow');
		allIssues.filter((i) => i.severity === 'warn').slice(0, 5).forEach((issue) => {
			log(`  • ${issue.type}: ${issue.message}`, 'yellow');
		});
	}

	if (buildResult.reactErrors > 0) {
		log(
			'\nCRITICAL: React-specific errors detected during build - these must be fixed',
			'red'
		);
		log('Common cause: "Objects are not valid as a React child"', 'red');
		log('Solution: Verify all JSX children are valid React elements, strings, or numbers', 'reset');
	}

	// Save report
	const reportData = {
		timestamp: new Date().toISOString(),
		summary: {
			totalIssues,
			errorCount,
			warningCount,
			filesScanned: files.length,
		},
		fileAnalysis: Object.fromEntries(
			Array.from(fileIssues.entries()).map(([file, issues]) => [
				path.relative(projectRoot, file),
				issues,
			])
		),
		typeScriptCheck: tsResult,
		eslintCheck: eslintResult,
		buildCheck: buildResult,
		bundleSize: bundleResult,
	};

	const reportPath = path.join(projectRoot, 'REACT_HEALTH_ANALYSIS_REPORT.json');
	fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
	log(`\nDetailed report saved to: ${reportPath}`, 'green');
}

generateReport();
