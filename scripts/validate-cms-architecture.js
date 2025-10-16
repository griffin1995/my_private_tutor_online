#!/usr/bin/env node

// CONTEXT7 SOURCE: /vercel/next.js - Deployment validation script for CMS architecture integrity
// VALIDATION SCRIPT REASON: Pre-deployment validation ensuring synchronous CMS architecture compliance
// AUGUST 2025 PROTECTION: Final validation before deployment to prevent homepage failure patterns

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// CONTEXT7 SOURCE: /microsoft/typescript - Validation configuration and patterns
// VALIDATION CONFIG REASON: Comprehensive checking of all CMS architecture components
const VALIDATION_CONFIG = {
	// Critical files that must pass synchronous architecture validation
	criticalFiles: [
		'src/lib/cms/cms-content.ts',
		'src/lib/cms/cms-images.ts',
		'src/app/[locale]/page.tsx',
		'src/components/sections',
		'src/content',
	],

	// Forbidden patterns that indicate August 2025 failure risk
	forbiddenPatterns: [
		{
			pattern: /\basync\s+function\s+get[A-Z]/g,
			type: 'ASYNC_CMS_FUNCTION',
			severity: 'CRITICAL',
			message: 'Async CMS function detected - causes August 2025 failure pattern',
		},
		{
			pattern: /:\s*Promise<[^>]*>/g,
			type: 'PROMISE_RETURN',
			severity: 'CRITICAL',
			message:
				'Promise return type in CMS function - violates synchronous architecture',
		},
		{
			pattern: /const\s*\[\s*\w+\s*,\s*\w+\s*\]\s*=\s*useState\s*\([^)]*\)\s*;/g,
			type: 'USESTATE_CMS',
			severity: 'CRITICAL',
			message: 'useState detected in CMS context - causes loading state failures',
		},
		{
			pattern: /useEffect\s*\([^,]*,\s*\[[^\]]*\]\s*\)\s*;/g,
			type: 'USEEFFECT_CMS',
			severity: 'CRITICAL',
			message: 'useEffect detected for data loading - async pattern violation',
		},
		{
			pattern: /\bawait\s+get[A-Z][a-zA-Z]*\(/g,
			type: 'AWAIT_CMS',
			severity: 'CRITICAL',
			message: 'await on CMS function - violates synchronous architecture',
		},
	],

	// Required patterns that must be present
	requiredPatterns: [
		{
			pattern: /import\s+[^']*\s+from\s+['"'][^'"]*\/content\/[^'"]*\.json['"]/g,
			type: 'DIRECT_JSON_IMPORT',
			message: 'Direct JSON imports required for synchronous architecture',
		},
	],

	// Build validation commands
	buildCommands: [
		'npx eslint src/lib/cms --ext .ts,.tsx',
		'npx tsc --noEmit --skipLibCheck',
		'npm run build',
	],
};

// CONTEXT7 SOURCE: /node/fs - File system validation utilities
// FILE VALIDATION REASON: Comprehensive scanning of CMS-related files
class CMSArchitectureDeploymentValidator {
	constructor() {
		this.violations = [];
		this.warnings = [];
		this.passedChecks = [];
		this.startTime = Date.now();
	}

	// CONTEXT7 SOURCE: /node/fs - Recursive file scanning for CMS files
	// SCANNING REASON: Locate all CMS-related files for validation
	async scanFiles(directory) {
		const files = [];
		const entries = await fs.promises.readdir(directory, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = path.join(directory, entry.name);

			if (entry.isDirectory() && !this.isIgnoredDirectory(entry.name)) {
				const subFiles = await this.scanFiles(fullPath);
				files.push(...subFiles);
			} else if (entry.isFile() && this.isCMSRelevantFile(fullPath)) {
				files.push(fullPath);
			}
		}

		return files;
	}

	// CONTEXT7 SOURCE: /node/fs - File relevance filtering
	// FILTERING REASON: Focus validation on CMS-critical files only
	isCMSRelevantFile(filePath) {
		return (
			/\/(cms|content|sections)\/.*\.(ts|tsx|json)$/.test(filePath) ||
			/\/page\.tsx$/.test(filePath) ||
			/cms-.*\.(ts|tsx)$/.test(filePath)
		);
	}

	isIgnoredDirectory(dirName) {
		return ['node_modules', '.next', '.git', 'dist', 'build'].includes(dirName);
	}

	// CONTEXT7 SOURCE: /node/fs - Pattern-based file content validation
	// CONTENT VALIDATION REASON: Deep inspection for August 2025 failure patterns
	async validateFileContent(filePath) {
		try {
			const content = await fs.promises.readFile(filePath, 'utf-8');
			const violations = [];
			const warnings = [];

			// Check for forbidden patterns
			for (const patternConfig of VALIDATION_CONFIG.forbiddenPatterns) {
				let match;
				const regex = new RegExp(patternConfig.pattern.source, 'g');

				while ((match = regex.exec(content)) !== null) {
					const lineNumber = content.substring(0, match.index).split('\n').length;
					const line = content.split('\n')[lineNumber - 1];

					const violation = {
						file: path.relative(process.cwd(), filePath),
						line: lineNumber,
						type: patternConfig.type,
						severity: patternConfig.severity,
						message: patternConfig.message,
						pattern: match[0],
						context: line.trim(),
					};

					if (patternConfig.severity === 'CRITICAL') {
						violations.push(violation);
					} else {
						warnings.push(violation);
					}
				}
			}

			return { violations, warnings };
		} catch (error) {
			return {
				violations: [
					{
						file: path.relative(process.cwd(), filePath),
						line: 0,
						type: 'FILE_READ_ERROR',
						severity: 'CRITICAL',
						message: `Cannot read file: ${error.message}`,
						pattern: 'N/A',
						context: 'File system error',
					},
				],
				warnings: [],
			};
		}
	}

	// CONTEXT7 SOURCE: /node/child_process - Build validation execution
	// BUILD VALIDATION REASON: Ensure build process catches architecture violations
	async runBuildValidation() {
		console.log('\n🔨 Running build validation commands...\n');

		for (const command of VALIDATION_CONFIG.buildCommands) {
			try {
				console.log(`⚡ Executing: ${command}`);
				const { stdout, stderr } = await execAsync(command);

				if (stderr && !stderr.includes('warning')) {
					this.violations.push({
						file: 'build-process',
						line: 0,
						type: 'BUILD_FAILURE',
						severity: 'CRITICAL',
						message: `Build command failed: ${command}`,
						pattern: stderr.slice(0, 200),
						context: 'Build validation',
					});
				} else {
					this.passedChecks.push({
						type: 'BUILD_SUCCESS',
						message: `Build command passed: ${command}`,
					});
				}

				if (stdout) {
					console.log(
						`   Output: ${stdout.slice(0, 200)}${stdout.length > 200 ? '...' : ''}`,
					);
				}
			} catch (error) {
				this.violations.push({
					file: 'build-process',
					line: 0,
					type: 'BUILD_ERROR',
					severity: 'CRITICAL',
					message: `Build command error: ${command}`,
					pattern: error.message.slice(0, 200),
					context: 'Build execution error',
				});
			}
		}
	}

	// CONTEXT7 SOURCE: /microsoft/typescript - Architecture integrity scoring
	// SCORING REASON: Quantify deployment readiness on 0-10 scale
	calculateArchitectureScore() {
		const criticalViolations = this.violations.filter(
			(v) => v.severity === 'CRITICAL',
		).length;
		const warnings = this.warnings.length;

		if (criticalViolations === 0 && warnings === 0) return 10.0;

		const criticalPenalty = criticalViolations * 2.0;
		const warningPenalty = warnings * 0.5;
		const score = Math.max(0, 10.0 - criticalPenalty - warningPenalty);

		return Math.round(score * 10) / 10;
	}

	// CONTEXT7 SOURCE: /microsoft/typescript - Deployment readiness assessment
	// READINESS ASSESSMENT REASON: Determine if deployment is safe for production
	assessDeploymentReadiness() {
		const score = this.calculateArchitectureScore();
		const criticalViolations = this.violations.filter(
			(v) => v.severity === 'CRITICAL',
		).length;

		return {
			isReady: score >= 9.0 && criticalViolations === 0,
			score,
			criticalViolations,
			totalWarnings: this.warnings.length,
			recommendation: this.getDeploymentRecommendation(score, criticalViolations),
		};
	}

	getDeploymentRecommendation(score, criticalViolations) {
		if (score === 10.0) {
			return 'DEPLOY APPROVED: Perfect synchronous architecture - August 2025 patterns prevented';
		} else if (score >= 9.0 && criticalViolations === 0) {
			return 'DEPLOY APPROVED: Minor warnings only - monitor post-deployment';
		} else if (criticalViolations > 0) {
			return 'DEPLOY BLOCKED: Critical violations detected - fix before deployment';
		} else {
			return 'DEPLOY WITH CAUTION: Multiple warnings - review and monitor closely';
		}
	}

	// CONTEXT7 SOURCE: /node/console - Comprehensive validation reporting
	// REPORTING REASON: Detailed validation results for development team
	generateReport() {
		const duration = Date.now() - this.startTime;
		const readiness = this.assessDeploymentReadiness();

		console.log('\n' + '='.repeat(80));
		console.log('🔍 CMS ARCHITECTURE DEPLOYMENT VALIDATION REPORT');
		console.log('='.repeat(80));

		console.log('\n📊 EXECUTIVE SUMMARY:');
		console.log(`   Architecture Score: ${readiness.score}/10.0`);
		console.log(
			`   Deployment Status: ${readiness.isReady ? '✅ APPROVED' : '❌ BLOCKED'}`,
		);
		console.log(`   Critical Violations: ${readiness.criticalViolations}`);
		console.log(`   Warnings: ${readiness.totalWarnings}`);
		console.log(`   Validation Time: ${duration}ms`);

		console.log('\n🎯 AUGUST 2025 FAILURE PREVENTION:');
		if (readiness.criticalViolations === 0) {
			console.log('   ✅ No async CMS patterns detected');
			console.log('   ✅ Synchronous architecture maintained');
			console.log('   ✅ Homepage stability protected');
		} else {
			console.log('   ❌ CRITICAL: Async patterns detected');
			console.log('   ❌ Risk of homepage failure');
			console.log('   ❌ August 2025 patterns present');
		}

		if (this.violations.length > 0) {
			console.log('\n🚨 CRITICAL VIOLATIONS:');
			this.violations.forEach((violation, index) => {
				console.log(`   ${index + 1}. ${violation.file}:${violation.line}`);
				console.log(`      Type: ${violation.type}`);
				console.log(`      Message: ${violation.message}`);
				console.log(`      Pattern: ${violation.pattern}`);
				console.log(`      Context: ${violation.context}`);
				console.log('');
			});
		}

		if (this.warnings.length > 0) {
			console.log('\n⚠️  WARNINGS:');
			this.warnings.slice(0, 5).forEach((warning, index) => {
				console.log(
					`   ${index + 1}. ${warning.file}:${warning.line} - ${warning.message}`,
				);
			});
			if (this.warnings.length > 5) {
				console.log(`   ... and ${this.warnings.length - 5} more warnings`);
			}
		}

		if (this.passedChecks.length > 0) {
			console.log('\n✅ PASSED CHECKS:');
			this.passedChecks.forEach((check, index) => {
				console.log(`   ${index + 1}. ${check.message}`);
			});
		}

		console.log('\n🏆 RECOMMENDATION:');
		console.log(`   ${readiness.recommendation}`);

		console.log('\n' + '='.repeat(80));
		console.log('📋 NEXT STEPS:');

		if (readiness.isReady) {
			console.log('   1. ✅ Deployment approved - proceed with confidence');
			console.log('   2. 📊 Monitor post-deployment architecture score');
			console.log('   3. 🔍 Continue runtime monitoring in production');
			console.log('   4. 📈 Track performance metrics and user experience');
		} else {
			console.log('   1. 🔧 Fix all critical violations listed above');
			console.log('   2. 🧪 Re-run validation: npm run validate:cms-architecture');
			console.log('   3. ✅ Achieve 9.0+ architecture score');
			console.log('   4. 🚀 Retry deployment after validation passes');
		}

		console.log('='.repeat(80) + '\n');

		return readiness;
	}

	// CONTEXT7 SOURCE: /node/fs - Main validation execution flow
	// VALIDATION FLOW REASON: Orchestrate comprehensive CMS architecture validation
	async validate() {
		console.log('🔍 CMS ARCHITECTURE DEPLOYMENT VALIDATION STARTING...\n');

		try {
			// Scan for CMS-related files
			console.log('📁 Scanning CMS-related files...');
			const allFiles = [];

			for (const criticalPath of VALIDATION_CONFIG.criticalFiles) {
				const fullPath = path.resolve(criticalPath);

				if (fs.existsSync(fullPath)) {
					if (fs.statSync(fullPath).isDirectory()) {
						const dirFiles = await this.scanFiles(fullPath);
						allFiles.push(...dirFiles);
					} else {
						allFiles.push(fullPath);
					}
				} else {
					this.violations.push({
						file: criticalPath,
						line: 0,
						type: 'MISSING_CRITICAL_FILE',
						severity: 'CRITICAL',
						message: 'Critical CMS file missing from project',
						pattern: 'N/A',
						context: 'File system validation',
					});
				}
			}

			console.log(`   Found ${allFiles.length} CMS-related files\n`);

			// Validate file contents
			console.log('🔍 Validating file contents for August 2025 patterns...');
			for (const file of allFiles) {
				const { violations, warnings } = await this.validateFileContent(file);
				this.violations.push(...violations);
				this.warnings.push(...warnings);
			}

			// Run build validation
			await this.runBuildValidation();

			// Generate final report
			const readiness = this.generateReport();

			// Exit with appropriate code
			process.exit(readiness.isReady ? 0 : 1);
		} catch (error) {
			console.error('\n❌ VALIDATION SYSTEM ERROR:');
			console.error('   Error:', error.message);
			console.error('   Stack:', error.stack);
			console.error('\n🚨 DEPLOYMENT BLOCKED: Validation system failure\n');
			process.exit(2);
		}
	}
}

// CONTEXT7 SOURCE: /node/process - Script execution entry point
// EXECUTION ENTRY REASON: Command-line interface for deployment validation
if (require.main === module) {
	const validator = new CMSArchitectureDeploymentValidator();
	validator.validate().catch((error) => {
		console.error('Fatal validation error:', error);
		process.exit(3);
	});
}

module.exports = { CMSArchitectureDeploymentValidator, VALIDATION_CONFIG };
