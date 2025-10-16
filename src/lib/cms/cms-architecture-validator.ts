import { promises as fs } from 'fs';
import { join, relative } from 'path';
export interface CMSArchitectureViolation {
	file: string;
	line: number;
	column: number;
	type:
		| 'ASYNC_FUNCTION'
		| 'PROMISE_RETURN'
		| 'USESTATE_STATIC'
		| 'USEEFFECT_CMS'
		| 'AWAIT_EXPRESSION';
	message: string;
	severity: 'error' | 'warning';
	context: string;
}
export interface CMSValidationResult {
	isValid: boolean;
	violations: CMSArchitectureViolation[];
	filesScanned: number;
	violationsCount: number;
	buildShouldFail: boolean;
}
export class CMSArchitectureValidator {
	private readonly cmsFilePaths: string[] = [
		'src/lib/cms',
		'src/content',
		'src/components',
		'src/app',
	];
	private readonly forbiddenPatterns = {
		ASYNC_FUNCTION: /\b(async\s+function|async\s*\(|const\s+\w+\s*=\s*async)/g,
		PROMISE_RETURN: /:\s*Promise<[^>]*>/g,
		AWAIT_EXPRESSION: /\bawait\s+/g,
		USESTATE_STATIC: /const\s*\[\s*\w+\s*,\s*\w+\s*\]\s*=\s*useState/g,
		USEEFFECT_CMS: /useEffect\s*\(/g,
		PROMISE_ALL: /Promise\.(all|allSettled|race|any)/g,
		DYNAMIC_IMPORT: /import\s*\(/g,
	};
	public async validateCMSArchitecture(): Promise<CMSValidationResult> {
		const violations: CMSArchitectureViolation[] = [];
		let filesScanned = 0;
		try {
			for (const basePath of this.cmsFilePaths) {
				const files = await this.scanDirectory(basePath);
				for (const file of files) {
					if (this.isCMSRelevantFile(file)) {
						filesScanned++;
						const fileViolations = await this.validateFile(file);
						violations.push(...fileViolations);
					}
				}
			}
			const buildShouldFail = violations.some((v) => v.severity === 'error');
			return {
				isValid: violations.length === 0,
				violations,
				filesScanned,
				violationsCount: violations.length,
				buildShouldFail,
			};
		} catch (error) {
			console.error('CMS Architecture Validation Error:', error);
			return {
				isValid: false,
				violations: [
					{
						file: 'validation-system',
						line: 0,
						column: 0,
						type: 'ASYNC_FUNCTION',
						message: `Validation system error: ${error}`,
						severity: 'error',
						context: 'System Error',
					},
				],
				filesScanned: 0,
				violationsCount: 1,
				buildShouldFail: true,
			};
		}
	}
	private async scanDirectory(dirPath: string): Promise<string[]> {
		const files: string[] = [];
		try {
			const entries = await fs.readdir(dirPath, {
				withFileTypes: true,
			});
			for (const entry of entries) {
				const fullPath = join(dirPath, entry.name);
				if (entry.isDirectory() && !this.isIgnoredDirectory(entry.name)) {
					const subFiles = await this.scanDirectory(fullPath);
					files.push(...subFiles);
				} else if (entry.isFile()) {
					files.push(fullPath);
				}
			}
		} catch (error) {
			console.warn(`Directory ${dirPath} not found, skipping validation`);
		}
		return files;
	}
	private isCMSRelevantFile(filePath: string): boolean {
		const cmsPatterns = [
			/\/cms\/.*\.(ts|tsx)$/,
			/\/content\/.*\.json$/,
			/cms-.*\.(ts|tsx)$/,
			/page\.(ts|tsx)$/,
			/layout\.(ts|tsx)$/,
		];
		return cmsPatterns.some((pattern) => pattern.test(filePath));
	}
	private async validateFile(
		filePath: string,
	): Promise<CMSArchitectureViolation[]> {
		const violations: CMSArchitectureViolation[] = [];
		try {
			const content = await fs.readFile(filePath, 'utf-8');
			const lines = content.split('\n');
			for (const [patternType, regex] of Object.entries(this.forbiddenPatterns)) {
				let match;
				const globalRegex = new RegExp(regex.source, 'g');
				while ((match = globalRegex.exec(content)) !== null) {
					const lineNumber = this.getLineNumber(content, match.index);
					const column = this.getColumnNumber(content, match.index, lineNumber);
					violations.push({
						file: relative(process.cwd(), filePath),
						line: lineNumber,
						column: column,
						type: patternType as CMSArchitectureViolation['type'],
						message: this.getViolationMessage(patternType, match[0]),
						severity: this.getViolationSeverity(patternType),
						context: lines[lineNumber - 1]?.trim() || match[0],
					});
				}
			}
		} catch (error) {
			violations.push({
				file: relative(process.cwd(), filePath),
				line: 0,
				column: 0,
				type: 'ASYNC_FUNCTION',
				message: `File read error: ${error}`,
				severity: 'warning',
				context: 'File System Error',
			});
		}
		return violations;
	}
	private getLineNumber(content: string, index: number): number {
		return content.substring(0, index).split('\n').length;
	}
	private getColumnNumber(
		content: string,
		index: number,
		lineNumber: number,
	): number {
		const lines = content.split('\n');
		const lineStart = content.indexOf(lines[lineNumber - 1]);
		return index - lineStart + 1;
	}
	private getViolationMessage(patternType: string, matchedText: string): string {
		const messages = {
			ASYNC_FUNCTION: `CRITICAL CMS VIOLATION: Async function detected '${matchedText}'. Use synchronous patterns only. August 2025 failure prevention.`,
			PROMISE_RETURN: `CRITICAL CMS VIOLATION: Promise return type detected '${matchedText}'. Return data directly without Promise wrapper.`,
			AWAIT_EXPRESSION: `CRITICAL CMS VIOLATION: Await expression detected '${matchedText}'. Use synchronous data access only.`,
			USESTATE_STATIC: `CRITICAL CMS VIOLATION: useState for static content detected '${matchedText}'. Use direct function calls only.`,
			USEEFFECT_CMS: `CRITICAL CMS VIOLATION: useEffect for CMS data detected '${matchedText}'. Use synchronous CMS functions only.`,
			PROMISE_ALL: `CRITICAL CMS VIOLATION: Promise utility detected '${matchedText}'. Use synchronous data patterns only.`,
			DYNAMIC_IMPORT: `CRITICAL CMS VIOLATION: Dynamic import detected '${matchedText}'. Use direct JSON imports only.`,
		};
		return (
			messages[patternType as keyof typeof messages] ||
			`Unknown CMS violation: ${matchedText}`
		);
	}
	private getViolationSeverity(patternType: string): 'error' | 'warning' {
		const criticalPatterns = [
			'ASYNC_FUNCTION',
			'PROMISE_RETURN',
			'AWAIT_EXPRESSION',
			'USESTATE_STATIC',
			'USEEFFECT_CMS',
		];
		return criticalPatterns.includes(patternType) ? 'error' : 'warning';
	}
	private isIgnoredDirectory(dirName: string): boolean {
		const ignoredDirs = [
			'node_modules',
			'.next',
			'.git',
			'dist',
			'build',
			'out',
			'__tests__',
			'.vercel',
		];
		return ignoredDirs.includes(dirName);
	}
	public async validateAndReport(): Promise<void> {
		console.log('\n🔍 CMS Architecture Validation Starting...\n');
		const result = await this.validateCMSArchitecture();
		if (result.violations.length === 0) {
			console.log('✅ CMS Architecture Validation PASSED');
			console.log(`   Scanned ${result.filesScanned} files`);
			console.log('   Synchronous architecture integrity maintained');
			console.log('   August 2025 failure patterns: NONE DETECTED\n');
			return;
		}
		console.log('❌ CMS Architecture Validation FAILED');
		console.log(`   Scanned ${result.filesScanned} files`);
		console.log(`   Found ${result.violationsCount} violations\n`);
		const errors = result.violations.filter((v) => v.severity === 'error');
		const warnings = result.violations.filter((v) => v.severity === 'warning');
		if (errors.length > 0) {
			console.log('🚨 CRITICAL ERRORS (Build will fail):');
			errors.forEach((violation) => {
				console.log(`   ${violation.file}:${violation.line}:${violation.column}`);
				console.log(`   ${violation.message}`);
				console.log(`   Context: ${violation.context}`);
				console.log('');
			});
		}
		if (warnings.length > 0) {
			console.log('⚠️  WARNINGS:');
			warnings.forEach((violation) => {
				console.log(`   ${violation.file}:${violation.line}:${violation.column}`);
				console.log(`   ${violation.message}`);
				console.log('');
			});
		}
		if (result.buildShouldFail) {
			console.log(
				'🛑 BUILD TERMINATED: Critical CMS architecture violations detected.',
			);
			console.log('   Fix all CRITICAL ERRORS above before deployment.');
			console.log(
				'   Synchronous CMS architecture is MANDATORY for homepage stability.\n',
			);
			process.exit(1);
		}
	}
}
export class CMSArchitectureValidationPlugin {
	constructor() {}
	apply(compiler: any) {
		compiler.hooks.beforeCompile.tapAsync(
			'CMSArchitectureValidationPlugin',
			async (params: any, callback: any) => {
				try {
					const validator = new CMSArchitectureValidator();
					await validator.validateAndReport();
					callback();
				} catch (error) {
					console.error('CMS Architecture Validation Plugin Error:', error);
					callback(error);
				}
			},
		);
	}
}
export default new CMSArchitectureValidator();
