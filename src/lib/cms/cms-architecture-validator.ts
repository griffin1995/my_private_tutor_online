// CONTEXT7 SOURCE: /vercel/next.js - Build-time validation plugin for webpack
// CMS ARCHITECTURE PROTECTION REASON: Prevent async pattern introduction during build time
// SYNCHRONOUS ARCHITECTURE VALIDATION: Automated detection of August 2025 failure patterns

import { promises as fs } from 'fs';
import { join, relative } from 'path';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface definitions for validation results
// VALIDATION TYPES REASON: Strongly typed validation reporting for build process
export interface CMSArchitectureViolation {
  file: string;
  line: number;
  column: number;
  type: 'ASYNC_FUNCTION' | 'PROMISE_RETURN' | 'USESTATE_STATIC' | 'USEEFFECT_CMS' | 'AWAIT_EXPRESSION';
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

// CONTEXT7 SOURCE: /microsoft/typescript - Class-based validator for comprehensive CMS architecture checking
// ARCHITECTURE PROTECTION REASON: Systematic validation of synchronous CMS patterns
export class CMSArchitectureValidator {
  private readonly cmsFilePaths: string[] = [
    'src/lib/cms',
    'src/content',
    'src/components',
    'src/app'
  ];

  private readonly forbiddenPatterns = {
    // CONTEXT7 SOURCE: /microsoft/typescript - Regex patterns for async detection
    // PATTERN DETECTION REASON: Identify exact patterns that caused August 2025 failures
    ASYNC_FUNCTION: /\b(async\s+function|async\s*\(|const\s+\w+\s*=\s*async)/g,
    PROMISE_RETURN: /:\s*Promise<[^>]*>/g,
    AWAIT_EXPRESSION: /\bawait\s+/g,
    USESTATE_STATIC: /const\s*\[\s*\w+\s*,\s*\w+\s*\]\s*=\s*useState/g,
    USEEFFECT_CMS: /useEffect\s*\(/g,
    PROMISE_ALL: /Promise\.(all|allSettled|race|any)/g,
    DYNAMIC_IMPORT: /import\s*\(/g,
  };

  // CONTEXT7 SOURCE: /vercel/next.js - Build-time file scanning for CMS files
  // SCANNING REASON: Comprehensive detection of all CMS-related files during build
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

      const buildShouldFail = violations.some(v => v.severity === 'error');

      return {
        isValid: violations.length === 0,
        violations,
        filesScanned,
        violationsCount: violations.length,
        buildShouldFail
      };

    } catch (error) {
      // CONTEXT7 SOURCE: /microsoft/typescript - Error handling for validation process
      console.error('CMS Architecture Validation Error:', error);
      return {
        isValid: false,
        violations: [{
          file: 'validation-system',
          line: 0,
          column: 0,
          type: 'ASYNC_FUNCTION',
          message: `Validation system error: ${error}`,
          severity: 'error',
          context: 'System Error'
        }],
        filesScanned: 0,
        violationsCount: 1,
        buildShouldFail: true
      };
    }
  }

  // CONTEXT7 SOURCE: /node/fs - Recursive directory scanning for file discovery
  // FILE DISCOVERY REASON: Locate all CMS-related files for comprehensive validation
  private async scanDirectory(dirPath: string): Promise<string[]> {
    const files: string[] = [];

    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });

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
      // Directory doesn't exist, skip silently
      console.warn(`Directory ${dirPath} not found, skipping validation`);
    }

    return files;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - File type checking for CMS validation scope
  // SCOPE FILTERING REASON: Focus validation on CMS-critical files only
  private isCMSRelevantFile(filePath: string): boolean {
    const cmsPatterns = [
      /\/cms\/.*\.(ts|tsx)$/,
      /\/content\/.*\.json$/,
      /cms-.*\.(ts|tsx)$/,
      /page\.(ts|tsx)$/,
      /layout\.(ts|tsx)$/,
    ];

    return cmsPatterns.some(pattern => pattern.test(filePath));
  }

  // CONTEXT7 SOURCE: /node/fs - File content analysis for pattern detection
  // CONTENT ANALYSIS REASON: Deep inspection of file contents for async patterns
  private async validateFile(filePath: string): Promise<CMSArchitectureViolation[]> {
    const violations: CMSArchitectureViolation[] = [];

    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n');

      // CONTEXT7 SOURCE: /microsoft/typescript - Pattern matching for violation detection
      // VIOLATION DETECTION REASON: Identify exact code patterns that cause architecture failures
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
            context: lines[lineNumber - 1]?.trim() || match[0]
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
        context: 'File System Error'
      });
    }

    return violations;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Utility functions for position tracking
  // POSITION TRACKING REASON: Accurate line/column reporting for developer debugging
  private getLineNumber(content: string, index: number): number {
    return content.substring(0, index).split('\n').length;
  }

  private getColumnNumber(content: string, index: number, lineNumber: number): number {
    const lines = content.split('\n');
    const lineStart = content.indexOf(lines[lineNumber - 1]);
    return index - lineStart + 1;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Message generation for specific violation types
  // ERROR MESSAGING REASON: Clear, actionable error messages for developers
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

    return messages[patternType as keyof typeof messages] || `Unknown CMS violation: ${matchedText}`;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Severity classification for violation types
  // SEVERITY CLASSIFICATION REASON: Distinguish between build-breaking errors and warnings
  private getViolationSeverity(patternType: string): 'error' | 'warning' {
    const criticalPatterns = [
      'ASYNC_FUNCTION',
      'PROMISE_RETURN',
      'AWAIT_EXPRESSION',
      'USESTATE_STATIC',
      'USEEFFECT_CMS'
    ];

    return criticalPatterns.includes(patternType) ? 'error' : 'warning';
  }

  // CONTEXT7 SOURCE: /node/fs - Directory filtering for validation scope
  // DIRECTORY FILTERING REASON: Skip irrelevant directories to improve validation performance
  private isIgnoredDirectory(dirName: string): boolean {
    const ignoredDirs = [
      'node_modules',
      '.next',
      '.git',
      'dist',
      'build',
      'out',
      '__tests__',
      '.vercel'
    ];

    return ignoredDirs.includes(dirName);
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Build integration method for webpack plugin
  // BUILD INTEGRATION REASON: Seamless integration with Next.js build process
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

    // CONTEXT7 SOURCE: /vercel/next.js - Error reporting for build process
    // ERROR REPORTING REASON: Clear, actionable violation reports for developers
    console.log('❌ CMS Architecture Validation FAILED');
    console.log(`   Scanned ${result.filesScanned} files`);
    console.log(`   Found ${result.violationsCount} violations\n`);

    // Group violations by severity
    const errors = result.violations.filter(v => v.severity === 'error');
    const warnings = result.violations.filter(v => v.severity === 'warning');

    if (errors.length > 0) {
      console.log('🚨 CRITICAL ERRORS (Build will fail):');
      errors.forEach(violation => {
        console.log(`   ${violation.file}:${violation.line}:${violation.column}`);
        console.log(`   ${violation.message}`);
        console.log(`   Context: ${violation.context}`);
        console.log('');
      });
    }

    if (warnings.length > 0) {
      console.log('⚠️  WARNINGS:');
      warnings.forEach(violation => {
        console.log(`   ${violation.file}:${violation.line}:${violation.column}`);
        console.log(`   ${violation.message}`);
        console.log('');
      });
    }

    if (result.buildShouldFail) {
      console.log('🛑 BUILD TERMINATED: Critical CMS architecture violations detected.');
      console.log('   Fix all CRITICAL ERRORS above before deployment.');
      console.log('   Synchronous CMS architecture is MANDATORY for homepage stability.\n');

      // CONTEXT7 SOURCE: /vercel/next.js - Build failure integration
      // BUILD TERMINATION REASON: Prevent deployment of architecturally unsound code
      process.exit(1);
    }
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Webpack plugin integration for build-time validation
// WEBPACK INTEGRATION REASON: Automatic validation during Next.js build process
export class CMSArchitectureValidationPlugin {
  constructor() {}

  // CONTEXT7 SOURCE: /webpack/webpack - Plugin apply method for webpack integration
  // PLUGIN APPLICATION REASON: Hook into webpack build process for automatic validation
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
      }
    );
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Export default validator instance
// DEFAULT EXPORT REASON: Convenient access to validator for manual testing
export default new CMSArchitectureValidator();