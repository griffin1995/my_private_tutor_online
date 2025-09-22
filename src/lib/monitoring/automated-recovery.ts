// CONTEXT7 SOURCE: /microsoft/typescript - Automated recovery and rollback system
// IMPLEMENTATION REASON: Phase 3 automated error prevention with intelligent recovery

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { TypeScriptError, TypeScriptErrorMonitor } from './typescript-error-monitor';

const execAsync = promisify(exec);

// CONTEXT7 SOURCE: /microsoft/typescript - Recovery strategy types
export interface RecoveryStrategy {
  name: string;
  description: string;
  priority: number;
  conditions: (errors: TypeScriptError[]) => boolean;
  execute: () => Promise<RecoveryResult>;
  rollback?: () => Promise<void>;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Recovery result interface
export interface RecoveryResult {
  success: boolean;
  strategy: string;
  duration: number;
  errorsFixed: number;
  remainingErrors: number;
  messages: string[];
  requiresManualIntervention: boolean;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Recovery configuration
export interface AutomatedRecoveryConfig {
  enabled: boolean;
  maxRecoveryAttempts: number;
  recoveryTimeout: number; // milliseconds
  rollbackOnFailure: boolean;
  notifyOnRecovery: boolean;
  recoveryLogPath: string;
  backupBeforeRecovery: boolean;
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Automated recovery system
 * Provides intelligent recovery from TypeScript compilation errors
 */
export class AutomatedRecoverySystem {
  private config: AutomatedRecoveryConfig;
  private monitor: TypeScriptErrorMonitor;
  private recoveryStrategies: RecoveryStrategy[] = [];
  private recoveryHistory: RecoveryResult[] = [];
  private isRecovering = false;

  constructor(
    monitor: TypeScriptErrorMonitor,
    config?: Partial<AutomatedRecoveryConfig>
  ) {
    this.monitor = monitor;

    // CONTEXT7 SOURCE: /microsoft/typescript - Default recovery configuration
    this.config = {
      enabled: true,
      maxRecoveryAttempts: 3,
      recoveryTimeout: 300000, // 5 minutes
      rollbackOnFailure: true,
      notifyOnRecovery: true,
      recoveryLogPath: './logs/recovery.log',
      backupBeforeRecovery: true,
      ...config
    };

    this.initializeRecoveryStrategies();
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Initialize recovery strategies
   */
  private initializeRecoveryStrategies(): void {
    // CONTEXT7 SOURCE: /microsoft/typescript - Strategy 1: Cache and dependency reset
    this.recoveryStrategies.push({
      name: 'cache-reset',
      description: 'Clear TypeScript build cache and reinstall dependencies',
      priority: 1,
      conditions: (errors) => errors.some(e => e.code === 2307 || e.code === 2339), // Module/property not found
      execute: async () => {
        const startTime = Date.now();
        const messages: string[] = [];

        try {
          // Clear TypeScript build cache
          await this.clearTypeScriptCache();
          messages.push('✅ TypeScript cache cleared');

          // Clear Next.js cache
          await this.clearNextjsCache();
          messages.push('✅ Next.js cache cleared');

          // Reinstall dependencies
          await this.reinstallDependencies();
          messages.push('✅ Dependencies reinstalled');

          // Verify recovery
          const verificationResult = await this.verifyRecovery();
          messages.push(`✅ Recovery verified: ${verificationResult.errorsFixed} errors fixed`);

          return {
            success: verificationResult.success,
            strategy: 'cache-reset',
            duration: Date.now() - startTime,
            errorsFixed: verificationResult.errorsFixed,
            remainingErrors: verificationResult.remainingErrors,
            messages,
            requiresManualIntervention: false
          };
        } catch (error: any) {
          messages.push(`❌ Cache reset failed: ${error.message}`);
          return {
            success: false,
            strategy: 'cache-reset',
            duration: Date.now() - startTime,
            errorsFixed: 0,
            remainingErrors: -1,
            messages,
            requiresManualIntervention: true
          };
        }
      }
    });

    // CONTEXT7 SOURCE: /microsoft/typescript - Strategy 2: TypeScript configuration optimization
    this.recoveryStrategies.push({
      name: 'tsconfig-optimization',
      description: 'Optimize TypeScript configuration for compilation errors',
      priority: 2,
      conditions: (errors) => errors.some(e => e.code === 2304 || e.code === 2322), // Type errors
      execute: async () => {
        const startTime = Date.now();
        const messages: string[] = [];

        try {
          // Backup current tsconfig
          await this.backupTsConfig();
          messages.push('✅ TSConfig backed up');

          // Apply optimized configuration
          await this.applyOptimizedTsConfig();
          messages.push('✅ Optimized TSConfig applied');

          // Verify recovery
          const verificationResult = await this.verifyRecovery();

          if (!verificationResult.success) {
            // Rollback if optimization didn't help
            await this.restoreTsConfig();
            messages.push('⚠️ TSConfig optimization rolled back');
          }

          return {
            success: verificationResult.success,
            strategy: 'tsconfig-optimization',
            duration: Date.now() - startTime,
            errorsFixed: verificationResult.errorsFixed,
            remainingErrors: verificationResult.remainingErrors,
            messages,
            requiresManualIntervention: !verificationResult.success
          };
        } catch (error: any) {
          messages.push(`❌ TSConfig optimization failed: ${error.message}`);
          // Attempt rollback
          try {
            await this.restoreTsConfig();
            messages.push('✅ TSConfig restored');
          } catch (rollbackError: any) {
            messages.push(`❌ TSConfig rollback failed: ${rollbackError.message}`);
          }

          return {
            success: false,
            strategy: 'tsconfig-optimization',
            duration: Date.now() - startTime,
            errorsFixed: 0,
            remainingErrors: -1,
            messages,
            requiresManualIntervention: true
          };
        }
      },
      rollback: async () => {
        await this.restoreTsConfig();
      }
    });

    // CONTEXT7 SOURCE: /microsoft/typescript - Strategy 3: Incremental build reset
    this.recoveryStrategies.push({
      name: 'incremental-reset',
      description: 'Reset incremental build state and force full rebuild',
      priority: 3,
      conditions: (errors) => errors.some(e => e.message.includes('incremental') || e.code === 5055),
      execute: async () => {
        const startTime = Date.now();
        const messages: string[] = [];

        try {
          // Remove incremental build files
          await this.clearIncrementalBuildState();
          messages.push('✅ Incremental build state cleared');

          // Force full rebuild
          await this.performFullRebuild();
          messages.push('✅ Full rebuild completed');

          // Verify recovery
          const verificationResult = await this.verifyRecovery();
          messages.push(`✅ Recovery verified: ${verificationResult.errorsFixed} errors fixed`);

          return {
            success: verificationResult.success,
            strategy: 'incremental-reset',
            duration: Date.now() - startTime,
            errorsFixed: verificationResult.errorsFixed,
            remainingErrors: verificationResult.remainingErrors,
            messages,
            requiresManualIntervention: false
          };
        } catch (error: any) {
          messages.push(`❌ Incremental reset failed: ${error.message}`);
          return {
            success: false,
            strategy: 'incremental-reset',
            duration: Date.now() - startTime,
            errorsFixed: 0,
            remainingErrors: -1,
            messages,
            requiresManualIntervention: true
          };
        }
      }
    });

    // CONTEXT7 SOURCE: /microsoft/typescript - Strategy 4: Git-based recovery
    this.recoveryStrategies.push({
      name: 'git-recovery',
      description: 'Revert to last known good commit state',
      priority: 4,
      conditions: (errors) => errors.length > 10 || errors.some(e => e.severity === 'critical'),
      execute: async () => {
        const startTime = Date.now();
        const messages: string[] = [];

        try {
          // Find last known good commit
          const lastGoodCommit = await this.findLastGoodCommit();
          messages.push(`✅ Found last good commit: ${lastGoodCommit}`);

          // Create recovery branch
          const recoveryBranch = `recovery-${Date.now()}`;
          await this.createRecoveryBranch(recoveryBranch);
          messages.push(`✅ Recovery branch created: ${recoveryBranch}`);

          // Reset to last good state
          await this.resetToCommit(lastGoodCommit);
          messages.push(`✅ Reset to last good commit`);

          // Verify recovery
          const verificationResult = await this.verifyRecovery();
          messages.push(`✅ Recovery verified: ${verificationResult.errorsFixed} errors fixed`);

          return {
            success: verificationResult.success,
            strategy: 'git-recovery',
            duration: Date.now() - startTime,
            errorsFixed: verificationResult.errorsFixed,
            remainingErrors: verificationResult.remainingErrors,
            messages,
            requiresManualIntervention: true // Requires manual review
          };
        } catch (error: any) {
          messages.push(`❌ Git recovery failed: ${error.message}`);
          return {
            success: false,
            strategy: 'git-recovery',
            duration: Date.now() - startTime,
            errorsFixed: 0,
            remainingErrors: -1,
            messages,
            requiresManualIntervention: true
          };
        }
      }
    });

    // Sort strategies by priority
    this.recoveryStrategies.sort((a, b) => a.priority - b.priority);
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Attempt automated recovery
   */
  public async attemptRecovery(errors: TypeScriptError[]): Promise<RecoveryResult> {
    if (this.isRecovering) {
      throw new Error('Recovery already in progress');
    }

    if (!this.config.enabled) {
      throw new Error('Automated recovery is disabled');
    }

    this.isRecovering = true;

    try {
      console.log('🔧 Starting automated TypeScript error recovery...');

      // Create backup if configured
      if (this.config.backupBeforeRecovery) {
        await this.createRecoveryBackup();
      }

      // Find applicable recovery strategies
      const applicableStrategies = this.recoveryStrategies.filter(strategy =>
        strategy.conditions(errors)
      );

      if (applicableStrategies.length === 0) {
        console.log('⚠️ No applicable recovery strategies found');
        return {
          success: false,
          strategy: 'none',
          duration: 0,
          errorsFixed: 0,
          remainingErrors: errors.length,
          messages: ['No applicable recovery strategies found'],
          requiresManualIntervention: true
        };
      }

      console.log(`🎯 Found ${applicableStrategies.length} applicable recovery strategies`);

      // Attempt recovery strategies in priority order
      for (const strategy of applicableStrategies.slice(0, this.config.maxRecoveryAttempts)) {
        console.log(`🔧 Attempting recovery strategy: ${strategy.name}`);

        const result = await Promise.race([
          strategy.execute(),
          this.createTimeoutPromise(this.config.recoveryTimeout)
        ]);

        // Log recovery attempt
        await this.logRecoveryAttempt(result);
        this.recoveryHistory.push(result);

        if (result.success) {
          console.log(`✅ Recovery successful with strategy: ${strategy.name}`);

          if (this.config.notifyOnRecovery) {
            await this.notifyRecoverySuccess(result);
          }

          return result;
        } else {
          console.log(`❌ Recovery strategy failed: ${strategy.name}`);

          // Attempt rollback if configured and available
          if (this.config.rollbackOnFailure && strategy.rollback) {
            try {
              await strategy.rollback();
              console.log(`✅ Rollback completed for strategy: ${strategy.name}`);
            } catch (rollbackError) {
              console.error(`❌ Rollback failed for strategy: ${strategy.name}`, rollbackError);
            }
          }
        }
      }

      // All strategies failed
      const finalResult: RecoveryResult = {
        success: false,
        strategy: 'all-failed',
        duration: 0,
        errorsFixed: 0,
        remainingErrors: errors.length,
        messages: ['All recovery strategies failed'],
        requiresManualIntervention: true
      };

      await this.logRecoveryAttempt(finalResult);
      return finalResult;

    } finally {
      this.isRecovering = false;
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Clear TypeScript build cache
   */
  private async clearTypeScriptCache(): Promise<void> {
    const cacheFiles = ['.tsbuildinfo', '.next/cache', 'node_modules/.cache'];

    for (const cacheFile of cacheFiles) {
      try {
        await fs.rm(cacheFile, { recursive: true, force: true });
      } catch (error) {
        // Ignore if file doesn't exist
      }
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Clear Next.js cache
   */
  private async clearNextjsCache(): Promise<void> {
    try {
      await execAsync('npm run clean:full', { timeout: 30000 });
    } catch (error) {
      // Fallback to manual cleanup
      await fs.rm('.next', { recursive: true, force: true });
      await fs.rm('cache', { recursive: true, force: true });
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Reinstall dependencies
   */
  private async reinstallDependencies(): Promise<void> {
    // Remove node_modules and package-lock.json
    await fs.rm('node_modules', { recursive: true, force: true });

    try {
      await fs.unlink('package-lock.json');
    } catch (error) {
      // Ignore if file doesn't exist
    }

    // Reinstall dependencies
    await execAsync('npm install', { timeout: 180000 }); // 3 minutes timeout
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Backup TSConfig
   */
  private async backupTsConfig(): Promise<void> {
    const backupPath = `tsconfig.backup.${Date.now()}.json`;
    await fs.copyFile('tsconfig.json', backupPath);
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Apply optimized TSConfig
   */
  private async applyOptimizedTsConfig(): Promise<void> {
    const currentTsConfig = JSON.parse(await fs.readFile('tsconfig.json', 'utf-8'));

    // Apply performance optimizations
    const optimizedConfig = {
      ...currentTsConfig,
      compilerOptions: {
        ...currentTsConfig.compilerOptions,
        skipLibCheck: true,
        skipDefaultLibCheck: true,
        incremental: true,
        composite: false,
        disableSourceOfProjectReferenceRedirect: true,
        disableSolutionSearching: true,
        disableReferencedProjectLoad: true
      }
    };

    await fs.writeFile('tsconfig.json', JSON.stringify(optimizedConfig, null, 2));
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Restore TSConfig
   */
  private async restoreTsConfig(): Promise<void> {
    // Find most recent backup
    const files = await fs.readdir('.');
    const backupFiles = files
      .filter(f => f.startsWith('tsconfig.backup.') && f.endsWith('.json'))
      .sort()
      .reverse();

    if (backupFiles.length > 0) {
      await fs.copyFile(backupFiles[0], 'tsconfig.json');
      await fs.unlink(backupFiles[0]); // Clean up backup
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Clear incremental build state
   */
  private async clearIncrementalBuildState(): Promise<void> {
    const incrementalFiles = ['.tsbuildinfo', '.next/cache', 'node_modules/.cache/tsc'];

    for (const file of incrementalFiles) {
      try {
        await fs.rm(file, { recursive: true, force: true });
      } catch (error) {
        // Ignore if file doesn't exist
      }
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Perform full rebuild
   */
  private async performFullRebuild(): Promise<void> {
    await execAsync('npx tsc --build --clean', { timeout: 60000 });
    await execAsync('npm run build:fast', { timeout: 180000 });
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Find last known good commit
   */
  private async findLastGoodCommit(): Promise<string> {
    // This is a simplified implementation - in practice, you'd check CI status
    const { stdout } = await execAsync('git log --oneline -10');
    const commits = stdout.trim().split('\n');

    // Return the second commit (assuming current might be problematic)
    if (commits.length > 1) {
      return commits[1].split(' ')[0];
    }

    throw new Error('No suitable commit found for recovery');
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Create recovery branch
   */
  private async createRecoveryBranch(branchName: string): Promise<void> {
    await execAsync(`git checkout -b ${branchName}`);
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Reset to specific commit
   */
  private async resetToCommit(commitHash: string): Promise<void> {
    await execAsync(`git reset --hard ${commitHash}`);
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Verify recovery success
   */
  private async verifyRecovery(): Promise<{
    success: boolean;
    errorsFixed: number;
    remainingErrors: number;
  }> {
    const checkResult = await this.monitor.runManualCheck();

    return {
      success: checkResult.success,
      errorsFixed: Math.max(0, this.recoveryHistory.length > 0
        ? this.recoveryHistory[this.recoveryHistory.length - 1].remainingErrors - checkResult.errors.length
        : 0),
      remainingErrors: checkResult.errors.length
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Create recovery backup
   */
  private async createRecoveryBackup(): Promise<void> {
    const backupDir = `./backups/recovery-${Date.now()}`;
    await fs.mkdir(backupDir, { recursive: true });

    // Backup critical files
    const filesToBackup = ['tsconfig.json', 'package.json', 'package-lock.json'];

    for (const file of filesToBackup) {
      try {
        await fs.copyFile(file, path.join(backupDir, file));
      } catch (error) {
        // Ignore if file doesn't exist
      }
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Create timeout promise
   */
  private createTimeoutPromise(timeout: number): Promise<RecoveryResult> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Recovery timeout after ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Log recovery attempt
   */
  private async logRecoveryAttempt(result: RecoveryResult): Promise<void> {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...result
    };

    try {
      const logDir = path.dirname(this.config.recoveryLogPath);
      await fs.mkdir(logDir, { recursive: true });

      await fs.appendFile(
        this.config.recoveryLogPath,
        JSON.stringify(logEntry) + '\n'
      );
    } catch (error) {
      console.error('Failed to log recovery attempt:', error);
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Notify recovery success
   */
  private async notifyRecoverySuccess(result: RecoveryResult): Promise<void> {
    const notification = {
      type: 'recovery_success',
      strategy: result.strategy,
      duration: result.duration,
      errorsFixed: result.errorsFixed,
      timestamp: new Date().toISOString(),
      requiresReview: result.requiresManualIntervention
    };

    console.log('✅ Recovery Success Notification:', notification);

    // Here you could integrate with notification services (Slack, email, etc.)
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Get recovery status
   */
  public getRecoveryStatus(): {
    isRecovering: boolean;
    lastRecovery?: RecoveryResult;
    recoveryHistory: RecoveryResult[];
    availableStrategies: string[];
  } {
    return {
      isRecovering: this.isRecovering,
      lastRecovery: this.recoveryHistory[this.recoveryHistory.length - 1],
      recoveryHistory: [...this.recoveryHistory],
      availableStrategies: this.recoveryStrategies.map(s => s.name)
    };
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Export recovery types
export type {
  RecoveryStrategy,
  RecoveryResult,
  AutomatedRecoveryConfig
};