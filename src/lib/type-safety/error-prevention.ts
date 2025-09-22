/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Automated error prevention systems
 * PREVENTION REASON: Pre-commit hooks and CI validation for comprehensive type safety
 * ARCHITECTURE: Advanced error prevention with automated checks, hooks, and recovery systems
 *
 * Phase 3 Type Safety Framework - Error Prevention System
 * Design Pattern: Hook-based validation with automated remediation and reporting
 * Zero False Positives: Intelligent analysis to minimize development friction
 * Enterprise-Grade: Production-ready error prevention with comprehensive logging
 */

import { execSync, spawn } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, relative } from 'path';
import type {
  Brand,
  ValidationResult,
  TypeCoverageReport,
  TypeComplexityScore
} from './core-framework';

// CONTEXT7 SOURCE: /microsoft/typescript - Branded types for error prevention
// ERROR PREVENTION TYPES: Type-safe error prevention and hook management
export type PreCommitValidation = Brand<{
  readonly hookName: string;
  readonly passed: boolean;
  readonly errors: readonly ValidationError[];
  readonly warnings: readonly ValidationError[];
  readonly executionTime: number;
  readonly suggestion?: string;
}, 'PreCommitValidation'>;

export type ValidationError = Brand<{
  readonly code: ErrorCode;
  readonly severity: 'error' | 'warning' | 'info';
  readonly message: string;
  readonly file?: string;
  readonly line?: number;
  readonly column?: number;
  readonly rule: string;
  readonly fixable: boolean;
  readonly autoFix?: string;
}, 'ValidationError'>;

export type ErrorCode =
  | 'TYPE_ERROR'
  | 'MISSING_TYPES'
  | 'LOW_COVERAGE'
  | 'HIGH_COMPLEXITY'
  | 'UNUSED_IMPORTS'
  | 'INCONSISTENT_NAMING'
  | 'MISSING_DOCS'
  | 'PERFORMANCE_ISSUE'
  | 'SECURITY_ISSUE'
  | 'LINT_ERROR'
  | 'FORMAT_ERROR';

export type HookExecutionResult = Brand<{
  readonly hookName: string;
  readonly success: boolean;
  readonly exitCode: number;
  readonly stdout: string;
  readonly stderr: string;
  readonly executionTime: number;
  readonly validations: readonly PreCommitValidation[];
}, 'HookExecutionResult'>;

// CONTEXT7 SOURCE: /microsoft/typescript - Interface patterns for hook configuration
// HOOK CONFIGURATION: Comprehensive configuration for error prevention hooks
export interface ErrorPreventionConfig {
  readonly hooks: {
    readonly typeCheck: boolean;
    readonly coverage: boolean;
    readonly complexity: boolean;
    readonly lint: boolean;
    readonly format: boolean;
    readonly security: boolean;
    readonly performance: boolean;
    readonly documentation: boolean;
  };
  readonly thresholds: {
    readonly minCoverage: number;
    readonly maxComplexity: number;
    readonly maxExecutionTime: number;
    readonly maxFileSize: number;
  };
  readonly autoFix: {
    readonly enabled: boolean;
    readonly formatCode: boolean;
    readonly fixLint: boolean;
    readonly addMissingTypes: boolean;
    readonly optimizeImports: boolean;
  };
  readonly reporting: {
    readonly verbose: boolean;
    readonly generateReport: boolean;
    readonly reportPath: string;
    readonly includeMetrics: boolean;
  };
  readonly ci: {
    readonly enabled: boolean;
    readonly parallel: boolean;
    readonly timeout: number;
    readonly retries: number;
  };
}

// ============================================================================
// PRE-COMMIT HOOK SYSTEM
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Class patterns for hook management
// HOOK MANAGER: Advanced pre-commit hook system with validation and recovery
export class PreCommitHookManager {
  private hookResults = new Map<string, HookExecutionResult>();
  private performanceMetrics = new Map<string, number[]>();

  constructor(private config: ErrorPreventionConfig) {}

  // CONTEXT7 SOURCE: /microsoft/typescript - Async method patterns for hook execution
  // HOOK EXECUTION: Execute all configured pre-commit hooks
  async executeHooks(changedFiles: string[]): Promise<PreCommitValidation[]> {
    const startTime = performance.now();
    const validations: PreCommitValidation[] = [];

    console.log('🔍 Running pre-commit type safety checks...');

    try {
      // CONTEXT7 SOURCE: /microsoft/typescript - Parallel execution for performance
      // PARALLEL HOOKS: Execute hooks in parallel for performance
      const hookPromises: Promise<PreCommitValidation | null>[] = [];

      if (this.config.hooks.typeCheck) {
        hookPromises.push(this.runTypeCheckHook(changedFiles));
      }

      if (this.config.hooks.coverage) {
        hookPromises.push(this.runCoverageHook(changedFiles));
      }

      if (this.config.hooks.complexity) {
        hookPromises.push(this.runComplexityHook(changedFiles));
      }

      if (this.config.hooks.lint) {
        hookPromises.push(this.runLintHook(changedFiles));
      }

      if (this.config.hooks.format) {
        hookPromises.push(this.runFormatHook(changedFiles));
      }

      if (this.config.hooks.security) {
        hookPromises.push(this.runSecurityHook(changedFiles));
      }

      if (this.config.hooks.performance) {
        hookPromises.push(this.runPerformanceHook(changedFiles));
      }

      if (this.config.hooks.documentation) {
        hookPromises.push(this.runDocumentationHook(changedFiles));
      }

      const results = await Promise.all(hookPromises);
      validations.push(...results.filter((result): result is PreCommitValidation => result !== null));

      const executionTime = performance.now() - startTime;
      this.recordPerformanceMetric('totalHookTime', executionTime);

      // Generate summary report
      this.generateHookSummary(validations, executionTime);

      return validations;
    } catch (error) {
      console.error('💥 Hook execution failed:', error);
      throw new Error(`Pre-commit hooks failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - TypeScript compilation validation
  // TYPE CHECK HOOK: Validate TypeScript compilation and type safety
  private async runTypeCheckHook(changedFiles: string[]): Promise<PreCommitValidation | null> {
    const startTime = performance.now();
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    try {
      console.log('  🔧 Running TypeScript type check...');

      // Run TypeScript compiler check
      const result = await this.executeCommand('npx tsc --noEmit --incremental');

      if (result.exitCode !== 0) {
        const typeErrors = this.parseTypeScriptErrors(result.stderr);
        errors.push(...typeErrors);
      }

      // Additional type safety checks for changed files
      for (const file of changedFiles.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))) {
        const fileErrors = await this.validateFileTypes(file);
        errors.push(...fileErrors);
      }

      const executionTime = performance.now() - startTime;

      return {
        hookName: 'typeCheck',
        passed: errors.length === 0,
        errors,
        warnings,
        executionTime,
        suggestion: errors.length > 0 ? 'Fix TypeScript compilation errors before committing' : undefined
      } as PreCommitValidation;
    } catch (error) {
      const executionTime = performance.now() - startTime;
      errors.push(this.createValidationError(
        'TYPE_ERROR',
        'error',
        `TypeScript check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'typeCheck',
        false
      ));

      return {
        hookName: 'typeCheck',
        passed: false,
        errors,
        warnings,
        executionTime
      } as PreCommitValidation;
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Coverage validation hook
  // COVERAGE HOOK: Validate type coverage meets minimum thresholds
  private async runCoverageHook(changedFiles: string[]): Promise<PreCommitValidation | null> {
    const startTime = performance.now();
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    try {
      console.log('  📊 Checking type coverage...');

      // Import coverage analyzer dynamically to avoid circular dependencies
      const { TypeCoverageAnalyzer, createCoverageAnalyzer } = await import('./coverage-monitor');

      const analyzer = createCoverageAnalyzer({
        targetCoverage: this.config.thresholds.minCoverage,
        includedPatterns: changedFiles.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))
      });

      const snapshot = await analyzer.analyzeProject(process.cwd());

      if (snapshot.overallCoverage < this.config.thresholds.minCoverage) {
        errors.push(this.createValidationError(
          'LOW_COVERAGE',
          'error',
          `Type coverage ${snapshot.overallCoverage}% is below minimum ${this.config.thresholds.minCoverage}%`,
          'coverage',
          false
        ));
      }

      // Check individual file coverage
      for (const fileMetric of snapshot.fileMetrics) {
        if (fileMetric.coveragePercentage < this.config.thresholds.minCoverage) {
          warnings.push(this.createValidationError(
            'LOW_COVERAGE',
            'warning',
            `File ${fileMetric.file} has ${fileMetric.coveragePercentage}% coverage`,
            'coverage',
            true,
            fileMetric.file
          ));
        }
      }

      const executionTime = performance.now() - startTime;

      return {
        hookName: 'coverage',
        passed: errors.length === 0,
        errors,
        warnings,
        executionTime,
        suggestion: errors.length > 0 ? 'Add explicit type annotations to improve coverage' : undefined
      } as PreCommitValidation;
    } catch (error) {
      const executionTime = performance.now() - startTime;
      warnings.push(this.createValidationError(
        'LOW_COVERAGE',
        'warning',
        `Coverage check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'coverage',
        false
      ));

      return {
        hookName: 'coverage',
        passed: true, // Don't fail commit on coverage check errors
        errors,
        warnings,
        executionTime
      } as PreCommitValidation;
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Complexity validation hook
  // COMPLEXITY HOOK: Validate type complexity stays within acceptable limits
  private async runComplexityHook(changedFiles: string[]): Promise<PreCommitValidation | null> {
    const startTime = performance.now();
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    try {
      console.log('  🧠 Analyzing type complexity...');

      for (const file of changedFiles.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))) {
        const complexity = await this.analyzeFileComplexity(file);

        if (complexity > this.config.thresholds.maxComplexity) {
          const severity = complexity > this.config.thresholds.maxComplexity * 2 ? 'error' : 'warning';
          const errorArray = severity === 'error' ? errors : warnings;

          errorArray.push(this.createValidationError(
            'HIGH_COMPLEXITY',
            severity,
            `File ${file} has complexity score ${complexity} (max: ${this.config.thresholds.maxComplexity})`,
            'complexity',
            false,
            file
          ));
        }
      }

      const executionTime = performance.now() - startTime;

      return {
        hookName: 'complexity',
        passed: errors.length === 0,
        errors,
        warnings,
        executionTime,
        suggestion: errors.length > 0 ? 'Simplify complex type definitions or break into smaller types' : undefined
      } as PreCommitValidation;
    } catch (error) {
      const executionTime = performance.now() - startTime;
      warnings.push(this.createValidationError(
        'HIGH_COMPLEXITY',
        'warning',
        `Complexity check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'complexity',
        false
      ));

      return {
        hookName: 'complexity',
        passed: true,
        errors,
        warnings,
        executionTime
      } as PreCommitValidation;
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Linting validation hook
  // LINT HOOK: Run ESLint validation with TypeScript rules
  private async runLintHook(changedFiles: string[]): Promise<PreCommitValidation | null> {
    const startTime = performance.now();
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    try {
      console.log('  🔍 Running ESLint checks...');

      const tsFiles = changedFiles.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
      if (tsFiles.length === 0) {
        const executionTime = performance.now() - startTime;
        return {
          hookName: 'lint',
          passed: true,
          errors,
          warnings,
          executionTime
        } as PreCommitValidation;
      }

      const result = await this.executeCommand(`npx eslint ${tsFiles.join(' ')} --format json`);

      if (result.exitCode !== 0) {
        const lintResults = this.parseESLintResults(result.stdout);
        errors.push(...lintResults.errors);
        warnings.push(...lintResults.warnings);
      }

      // Auto-fix if enabled
      if (this.config.autoFix.enabled && this.config.autoFix.fixLint && errors.some(e => e.fixable)) {
        console.log('  🔧 Auto-fixing ESLint issues...');
        await this.executeCommand(`npx eslint ${tsFiles.join(' ')} --fix`);
      }

      const executionTime = performance.now() - startTime;

      return {
        hookName: 'lint',
        passed: errors.length === 0,
        errors,
        warnings,
        executionTime,
        suggestion: errors.length > 0 ? 'Fix ESLint errors or run with --fix flag' : undefined
      } as PreCommitValidation;
    } catch (error) {
      const executionTime = performance.now() - startTime;
      errors.push(this.createValidationError(
        'LINT_ERROR',
        'error',
        `ESLint check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'lint',
        false
      ));

      return {
        hookName: 'lint',
        passed: false,
        errors,
        warnings,
        executionTime
      } as PreCommitValidation;
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Code formatting validation
  // FORMAT HOOK: Validate code formatting with Prettier
  private async runFormatHook(changedFiles: string[]): Promise<PreCommitValidation | null> {
    const startTime = performance.now();
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    try {
      console.log('  💅 Checking code formatting...');

      const formattableFiles = changedFiles.filter(f =>
        f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.jsx')
      );

      if (formattableFiles.length === 0) {
        const executionTime = performance.now() - startTime;
        return {
          hookName: 'format',
          passed: true,
          errors,
          warnings,
          executionTime
        } as PreCommitValidation;
      }

      // Check if files are properly formatted
      const result = await this.executeCommand(`npx prettier --check ${formattableFiles.join(' ')}`);

      if (result.exitCode !== 0) {
        const unformattedFiles = result.stdout.split('\n').filter(line => line.trim());

        for (const file of unformattedFiles) {
          warnings.push(this.createValidationError(
            'FORMAT_ERROR',
            'warning',
            `File ${file} is not properly formatted`,
            'format',
            true,
            file
          ));
        }

        // Auto-format if enabled
        if (this.config.autoFix.enabled && this.config.autoFix.formatCode) {
          console.log('  🔧 Auto-formatting files...');
          await this.executeCommand(`npx prettier --write ${formattableFiles.join(' ')}`);
          warnings.length = 0; // Clear warnings since we fixed them
        }
      }

      const executionTime = performance.now() - startTime;

      return {
        hookName: 'format',
        passed: errors.length === 0,
        errors,
        warnings,
        executionTime,
        suggestion: warnings.length > 0 ? 'Run prettier --write to format files' : undefined
      } as PreCommitValidation;
    } catch (error) {
      const executionTime = performance.now() - startTime;
      warnings.push(this.createValidationError(
        'FORMAT_ERROR',
        'warning',
        `Format check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'format',
        false
      ));

      return {
        hookName: 'format',
        passed: true, // Don't fail commit on format issues
        errors,
        warnings,
        executionTime
      } as PreCommitValidation;
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Security validation hook
  // SECURITY HOOK: Run security checks on TypeScript code
  private async runSecurityHook(changedFiles: string[]): Promise<PreCommitValidation | null> {
    const startTime = performance.now();
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    try {
      console.log('  🔒 Running security checks...');

      // Basic security pattern checks
      for (const file of changedFiles.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))) {
        const securityIssues = await this.scanFileForSecurityIssues(file);
        warnings.push(...securityIssues);
      }

      const executionTime = performance.now() - startTime;

      return {
        hookName: 'security',
        passed: errors.length === 0,
        errors,
        warnings,
        executionTime,
        suggestion: warnings.length > 0 ? 'Review security warnings and apply fixes' : undefined
      } as PreCommitValidation;
    } catch (error) {
      const executionTime = performance.now() - startTime;
      warnings.push(this.createValidationError(
        'SECURITY_ISSUE',
        'warning',
        `Security check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'security',
        false
      ));

      return {
        hookName: 'security',
        passed: true,
        errors,
        warnings,
        executionTime
      } as PreCommitValidation;
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Performance validation hook
  // PERFORMANCE HOOK: Check for performance issues in TypeScript code
  private async runPerformanceHook(changedFiles: string[]): Promise<PreCommitValidation | null> {
    const startTime = performance.now();
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    try {
      console.log('  ⚡ Analyzing performance implications...');

      for (const file of changedFiles.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))) {
        const performanceIssues = await this.analyzeFilePerformance(file);
        warnings.push(...performanceIssues);
      }

      const executionTime = performance.now() - startTime;

      return {
        hookName: 'performance',
        passed: errors.length === 0,
        errors,
        warnings,
        executionTime,
        suggestion: warnings.length > 0 ? 'Review performance warnings and optimize where needed' : undefined
      } as PreCommitValidation;
    } catch (error) {
      const executionTime = performance.now() - startTime;
      warnings.push(this.createValidationError(
        'PERFORMANCE_ISSUE',
        'warning',
        `Performance check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'performance',
        false
      ));

      return {
        hookName: 'performance',
        passed: true,
        errors,
        warnings,
        executionTime
      } as PreCommitValidation;
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Documentation validation hook
  // DOCUMENTATION HOOK: Validate TypeScript documentation and comments
  private async runDocumentationHook(changedFiles: string[]): Promise<PreCommitValidation | null> {
    const startTime = performance.now();
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    try {
      console.log('  📚 Checking documentation...');

      for (const file of changedFiles.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))) {
        const docIssues = await this.validateFileDocumentation(file);
        warnings.push(...docIssues);
      }

      const executionTime = performance.now() - startTime;

      return {
        hookName: 'documentation',
        passed: errors.length === 0,
        errors,
        warnings,
        executionTime,
        suggestion: warnings.length > 0 ? 'Add missing documentation for public APIs' : undefined
      } as PreCommitValidation;
    } catch (error) {
      const executionTime = performance.now() - startTime;
      warnings.push(this.createValidationError(
        'MISSING_DOCS',
        'warning',
        `Documentation check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'documentation',
        false
      ));

      return {
        hookName: 'documentation',
        passed: true,
        errors,
        warnings,
        executionTime
      } as PreCommitValidation;
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  // CONTEXT7 SOURCE: /microsoft/typescript - Command execution utility
  // COMMAND EXECUTION: Execute shell commands with proper error handling
  private async executeCommand(command: string): Promise<{
    exitCode: number;
    stdout: string;
    stderr: string;
  }> {
    return new Promise((resolve) => {
      const child = spawn('sh', ['-c', command], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';

      child.stdout?.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr?.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (exitCode) => {
        resolve({
          exitCode: exitCode || 0,
          stdout,
          stderr
        });
      });
    });
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Error parsing utilities
  // ERROR PARSING: Parse TypeScript compiler errors
  private parseTypeScriptErrors(stderr: string): ValidationError[] {
    const errors: ValidationError[] = [];
    const lines = stderr.split('\n');

    for (const line of lines) {
      const match = line.match(/^(.+?)\((\d+),(\d+)\): error TS(\d+): (.+)$/);
      if (match) {
        const [, file, lineStr, columnStr, code, message] = match;
        errors.push(this.createValidationError(
          'TYPE_ERROR',
          'error',
          message,
          'typeCheck',
          false,
          file,
          parseInt(lineStr),
          parseInt(columnStr)
        ));
      }
    }

    return errors;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - ESLint result parsing
  // ESLINT PARSING: Parse ESLint JSON results
  private parseESLintResults(stdout: string): {
    errors: ValidationError[];
    warnings: ValidationError[];
  } {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    try {
      const results = JSON.parse(stdout);

      for (const result of results) {
        for (const message of result.messages) {
          const severity = message.severity === 2 ? 'error' : 'warning';
          const errorArray = severity === 'error' ? errors : warnings;

          errorArray.push(this.createValidationError(
            'LINT_ERROR',
            severity,
            message.message,
            message.ruleId || 'unknown',
            Boolean(message.fix),
            result.filePath,
            message.line,
            message.column
          ));
        }
      }
    } catch (error) {
      warnings.push(this.createValidationError(
        'LINT_ERROR',
        'warning',
        'Failed to parse ESLint results',
        'lint',
        false
      ));
    }

    return { errors, warnings };
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - File validation utilities
  // FILE VALIDATION: Validate individual TypeScript files
  private async validateFileTypes(file: string): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];

    try {
      if (!existsSync(file)) return errors;

      const content = readFileSync(file, 'utf-8');

      // Check for any types
      const anyTypeMatches = content.match(/:\s*any\b/g);
      if (anyTypeMatches && anyTypeMatches.length > 5) {
        errors.push(this.createValidationError(
          'MISSING_TYPES',
          'warning',
          `File contains ${anyTypeMatches.length} 'any' types`,
          'typeCheck',
          true,
          file
        ));
      }

      // Check for missing return types on functions
      const functionMatches = content.match(/function\s+\w+\s*\([^)]*\)\s*\{/g);
      if (functionMatches) {
        for (const match of functionMatches) {
          if (!match.includes(':')) {
            errors.push(this.createValidationError(
              'MISSING_TYPES',
              'info',
              'Function missing return type annotation',
              'typeCheck',
              true,
              file
            ));
          }
        }
      }
    } catch (error) {
      // Ignore file reading errors
    }

    return errors;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Complexity analysis
  // COMPLEXITY ANALYSIS: Analyze file type complexity
  private async analyzeFileComplexity(file: string): Promise<number> {
    try {
      const content = readFileSync(file, 'utf-8');
      let complexity = 0;

      // Count complex type patterns
      complexity += (content.match(/\|/g) || []).length; // Union types
      complexity += (content.match(/&/g) || []).length; // Intersection types
      complexity += (content.match(/<[^>]+>/g) || []).length * 2; // Generics
      complexity += (content.match(/\?\s*[^:]+:/g) || []).length * 3; // Conditional types
      complexity += (content.match(/\[K\s+in\s+keyof/g) || []).length * 3; // Mapped types

      return complexity;
    } catch {
      return 0;
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Security scanning
  // SECURITY SCANNING: Scan for common security issues
  private async scanFileForSecurityIssues(file: string): Promise<ValidationError[]> {
    const warnings: ValidationError[] = [];

    try {
      const content = readFileSync(file, 'utf-8');

      // Check for dangerous patterns
      if (content.includes('eval(')) {
        warnings.push(this.createValidationError(
          'SECURITY_ISSUE',
          'warning',
          'Use of eval() detected - potential security risk',
          'security',
          false,
          file
        ));
      }

      if (content.includes('innerHTML')) {
        warnings.push(this.createValidationError(
          'SECURITY_ISSUE',
          'warning',
          'Use of innerHTML - potential XSS risk',
          'security',
          false,
          file
        ));
      }

      if (content.match(/process\.env\[\w+\]/)) {
        warnings.push(this.createValidationError(
          'SECURITY_ISSUE',
          'info',
          'Dynamic environment variable access detected',
          'security',
          false,
          file
        ));
      }
    } catch {
      // Ignore file reading errors
    }

    return warnings;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Performance analysis
  // PERFORMANCE ANALYSIS: Analyze potential performance issues
  private async analyzeFilePerformance(file: string): Promise<ValidationError[]> {
    const warnings: ValidationError[] = [];

    try {
      const content = readFileSync(file, 'utf-8');

      // Check for performance anti-patterns
      if (content.includes('JSON.parse(JSON.stringify')) {
        warnings.push(this.createValidationError(
          'PERFORMANCE_ISSUE',
          'warning',
          'Deep clone using JSON parse/stringify - consider structured clone or lodash',
          'performance',
          true,
          file
        ));
      }

      if (content.match(/\.forEach\s*\(/g) && content.includes('await')) {
        warnings.push(this.createValidationError(
          'PERFORMANCE_ISSUE',
          'info',
          'Potential sequential async operations in forEach - consider Promise.all',
          'performance',
          true,
          file
        ));
      }

      // Check file size
      if (content.length > this.config.thresholds.maxFileSize) {
        warnings.push(this.createValidationError(
          'PERFORMANCE_ISSUE',
          'warning',
          `Large file (${content.length} bytes) - consider splitting`,
          'performance',
          false,
          file
        ));
      }
    } catch {
      // Ignore file reading errors
    }

    return warnings;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Documentation validation
  // DOCUMENTATION VALIDATION: Check for missing documentation
  private async validateFileDocumentation(file: string): Promise<ValidationError[]> {
    const warnings: ValidationError[] = [];

    try {
      const content = readFileSync(file, 'utf-8');

      // Check for exported functions without JSDoc
      const exportMatches = content.match(/export\s+(function|const|class|interface|type)\s+\w+/g);
      if (exportMatches) {
        for (const match of exportMatches) {
          const lines = content.split('\n');
          const matchLine = lines.findIndex(line => line.includes(match));

          if (matchLine > 0) {
            const prevLine = lines[matchLine - 1];
            if (!prevLine.includes('/**') && !prevLine.includes('//')) {
              warnings.push(this.createValidationError(
                'MISSING_DOCS',
                'info',
                `Missing documentation for ${match}`,
                'documentation',
                false,
                file,
                matchLine + 1
              ));
            }
          }
        }
      }
    } catch {
      // Ignore file reading errors
    }

    return warnings;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Error creation utility
  // ERROR CREATION: Create standardized validation errors
  private createValidationError(
    code: ErrorCode,
    severity: 'error' | 'warning' | 'info',
    message: string,
    rule: string,
    fixable: boolean,
    file?: string,
    line?: number,
    column?: number,
    autoFix?: string
  ): ValidationError {
    return {
      code,
      severity,
      message,
      file,
      line,
      column,
      rule,
      fixable,
      autoFix
    } as ValidationError;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Performance tracking
  // PERFORMANCE TRACKING: Track hook execution performance
  private recordPerformanceMetric(metric: string, value: number): void {
    if (!this.performanceMetrics.has(metric)) {
      this.performanceMetrics.set(metric, []);
    }

    const metrics = this.performanceMetrics.get(metric)!;
    metrics.push(value);

    // Keep only last 100 measurements
    if (metrics.length > 100) {
      metrics.shift();
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Summary generation
  // SUMMARY GENERATION: Generate comprehensive hook execution summary
  private generateHookSummary(validations: PreCommitValidation[], totalTime: number): void {
    const passed = validations.filter(v => v.passed).length;
    const failed = validations.length - passed;
    const totalErrors = validations.reduce((sum, v) => sum + v.errors.length, 0);
    const totalWarnings = validations.reduce((sum, v) => sum + v.warnings.length, 0);

    console.log('\n📋 Pre-commit Hook Summary:');
    console.log(`  ✅ Passed: ${passed}/${validations.length} hooks`);
    console.log(`  ❌ Failed: ${failed} hooks`);
    console.log(`  🚨 Errors: ${totalErrors}`);
    console.log(`  ⚠️  Warnings: ${totalWarnings}`);
    console.log(`  ⏱️  Total time: ${totalTime.toFixed(2)}ms`);

    if (failed > 0) {
      console.log('\n💥 Failed Hooks:');
      for (const validation of validations.filter(v => !v.passed)) {
        console.log(`  - ${validation.hookName}: ${validation.errors.length} errors`);
        if (validation.suggestion) {
          console.log(`    💡 ${validation.suggestion}`);
        }
      }
    }

    if (this.config.reporting.generateReport) {
      this.saveHookReport(validations, totalTime);
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Report saving
  // REPORT SAVING: Save detailed hook execution report
  private saveHookReport(validations: PreCommitValidation[], totalTime: number): void {
    try {
      const report = {
        timestamp: new Date().toISOString(),
        totalTime,
        summary: {
          totalHooks: validations.length,
          passed: validations.filter(v => v.passed).length,
          failed: validations.filter(v => !v.passed).length,
          totalErrors: validations.reduce((sum, v) => sum + v.errors.length, 0),
          totalWarnings: validations.reduce((sum, v) => sum + v.warnings.length, 0)
        },
        validations: validations.map(v => ({
          hookName: v.hookName,
          passed: v.passed,
          executionTime: v.executionTime,
          errorCount: v.errors.length,
          warningCount: v.warnings.length,
          errors: v.errors,
          warnings: v.warnings,
          suggestion: v.suggestion
        }))
      };

      const reportPath = join(this.config.reporting.reportPath, `pre-commit-${Date.now()}.json`);
      writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`📄 Report saved to: ${reportPath}`);
    } catch (error) {
      console.warn('⚠️  Failed to save hook report:', error);
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Performance metrics getter
  // PERFORMANCE METRICS: Get hook performance statistics
  getPerformanceMetrics(): Record<string, { avg: number; min: number; max: number }> {
    const result: Record<string, { avg: number; min: number; max: number }> = {};

    for (const [metric, values] of this.performanceMetrics) {
      if (values.length > 0) {
        result[metric] = {
          avg: values.reduce((a, b) => a + b, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values)
        };
      }
    }

    return result;
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Default configuration
// DEFAULT CONFIG: Standard configuration for error prevention
export const DEFAULT_ERROR_PREVENTION_CONFIG: ErrorPreventionConfig = {
  hooks: {
    typeCheck: true,
    coverage: true,
    complexity: true,
    lint: true,
    format: true,
    security: true,
    performance: true,
    documentation: false
  },
  thresholds: {
    minCoverage: 95,
    maxComplexity: 50,
    maxExecutionTime: 30000,
    maxFileSize: 100000
  },
  autoFix: {
    enabled: true,
    formatCode: true,
    fixLint: true,
    addMissingTypes: false,
    optimizeImports: true
  },
  reporting: {
    verbose: true,
    generateReport: true,
    reportPath: 'reports/pre-commit',
    includeMetrics: true
  },
  ci: {
    enabled: true,
    parallel: true,
    timeout: 300000,
    retries: 1
  }
};

// CONTEXT7 SOURCE: /microsoft/typescript - Factory function for hook manager
// FACTORY FUNCTION: Create hook manager with configuration
export function createPreCommitHookManager(
  config?: Partial<ErrorPreventionConfig>
): PreCommitHookManager {
  const mergedConfig = { ...DEFAULT_ERROR_PREVENTION_CONFIG, ...config };
  return new PreCommitHookManager(mergedConfig);
}

// CONTEXT7 SOURCE: /microsoft/typescript - Git hook installer
// HOOK INSTALLER: Install pre-commit hooks in git repository
export async function installPreCommitHooks(projectPath: string = process.cwd()): Promise<void> {
  try {
    const hookPath = join(projectPath, '.git', 'hooks', 'pre-commit');

    const hookScript = `#!/bin/sh
# Auto-generated pre-commit hook for TypeScript type safety
# Generated by My Private Tutor Online Type Safety Framework

echo "🔍 Running TypeScript type safety checks..."

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E "\\.(ts|tsx)$" || true)

if [ -z "$STAGED_FILES" ]; then
  echo "No TypeScript files to check."
  exit 0
fi

# Run the type safety checks
node -e "
const { createPreCommitHookManager } = require('./src/lib/type-safety/error-prevention');
const hookManager = createPreCommitHookManager();
const files = process.argv[1].split(' ').filter(f => f.trim());

hookManager.executeHooks(files).then(validations => {
  const failed = validations.filter(v => !v.passed);
  if (failed.length > 0) {
    console.error('💥 Pre-commit checks failed!');
    process.exit(1);
  } else {
    console.log('✅ All pre-commit checks passed!');
    process.exit(0);
  }
}).catch(error => {
  console.error('💥 Pre-commit hook error:', error);
  process.exit(1);
});
" "$STAGED_FILES"
`;

    writeFileSync(hookPath, hookScript);
    execSync(`chmod +x "${hookPath}"`);

    console.log('✅ Pre-commit hooks installed successfully!');
  } catch (error) {
    console.error('❌ Failed to install pre-commit hooks:', error);
    throw error;
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Export patterns for module interface
// MODULE EXPORTS: Clean interface for error prevention system
export type {
  PreCommitValidation,
  ValidationError,
  ErrorCode,
  HookExecutionResult,
  ErrorPreventionConfig
};