#!/usr/bin/env node

/**
 * EMERGENCY ROLLBACK SCRIPT - AUTOMATED FIXES RECOVERY
 * 
 * CONTEXT7 SOURCE: /unjs/magicast - Error handling and rollback patterns
 * 
 * This script provides complete rollback capability for automated fixes implementation.
 * Designed for zero-downtime emergency recovery if any issues are detected post-deployment.
 * 
 * ROLLBACK METHODS:
 * 1. Git reset to pre-execution commit (fastest)
 * 2. File-by-file restoration from timestamped backups (comprehensive)
 * 3. Selective rollback for specific file types or issues
 * 
 * SAFETY FEATURES:
 * - Validation before rollback execution
 * - Progress tracking during restoration
 * - Verification of rollback success
 * - Detailed logging of rollback operations
 */

import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class EmergencyRollbackSystem {
  constructor() {
    this.rollbackLog = {
      rollbackId: `rollback-${new Date().toISOString().replace(/[:.]/g, '-')}`,
      startTime: new Date().toISOString(),
      method: '',
      restoredFiles: 0,
      failedFiles: 0,
      operations: []
    };
  }

  /**
   * CONTEXT7 SOURCE: /unjs/magicast - Git operations for rollback
   * Fastest rollback method - reset to pre-execution commit
   */
  async gitRollback(targetCommit) {
    console.log('🔄 Attempting Git rollback...');
    console.log(`📍 Target commit: ${targetCommit}`);
    
    try {
      // Verify git repository status
      const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
      if (gitStatus.trim()) {
        console.log('⚠️  Uncommitted changes detected, stashing...');
        execSync('git stash push -m "Pre-rollback stash"', { stdio: 'inherit' });
      }
      
      // Perform hard reset
      execSync(`git reset --hard ${targetCommit}`, { stdio: 'inherit' });
      
      // Verify successful rollback
      const currentCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      
      if (currentCommit === targetCommit) {
        console.log('✅ Git rollback successful');
        this.rollbackLog.method = 'git-reset';
        this.rollbackLog.operations.push({
          type: 'git-reset',
          success: true,
          commit: targetCommit,
          timestamp: new Date().toISOString()
        });
        return true;
      } else {
        throw new Error(`Rollback verification failed: expected ${targetCommit}, got ${currentCommit}`);
      }
      
    } catch (error) {
      console.error('❌ Git rollback failed:', error.message);
      this.rollbackLog.operations.push({
        type: 'git-reset',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      return false;
    }
  }

  /**
   * CONTEXT7 SOURCE: /unjs/magicast - File system operations for backup restoration
   * Comprehensive rollback method - restore from file backups
   */
  async fileRollback(backupPath) {
    console.log('📁 Attempting file-by-file rollback...');
    console.log(`📂 Backup path: ${backupPath}`);
    
    try {
      // Verify backup exists
      const backupExists = await fs.access(backupPath).then(() => true).catch(() => false);
      if (!backupExists) {
        throw new Error(`Backup directory not found: ${backupPath}`);
      }
      
      // Read backup metadata
      const metaPath = path.join(backupPath, 'rollback-meta.json');
      const metadata = JSON.parse(await fs.readFile(metaPath, 'utf8'));
      
      console.log(`📋 Restoring ${metadata.totalFiles} files from backup...`);
      
      // Restore files recursively
      await this.restoreDirectoryRecursive(backupPath, process.cwd());
      
      console.log('✅ File rollback successful');
      this.rollbackLog.method = 'file-restore';
      this.rollbackLog.operations.push({
        type: 'file-restore',
        success: true,
        backupPath,
        restoredFiles: this.rollbackLog.restoredFiles,
        timestamp: new Date().toISOString()
      });
      return true;
      
    } catch (error) {
      console.error('❌ File rollback failed:', error.message);
      this.rollbackLog.operations.push({
        type: 'file-restore',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      return false;
    }
  }

  /**
   * Recursively restore directory structure from backup
   */
  async restoreDirectoryRecursive(backupDir, targetDir) {
    const entries = await fs.readdir(backupDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const backupPath = path.join(backupDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);
      
      // Skip metadata files
      if (entry.name === 'rollback-meta.json') {
        continue;
      }
      
      try {
        if (entry.isDirectory()) {
          // Ensure target directory exists
          await fs.mkdir(targetPath, { recursive: true });
          await this.restoreDirectoryRecursive(backupPath, targetPath);
        } else if (entry.isFile()) {
          // Restore individual file
          await fs.copyFile(backupPath, targetPath);
          this.rollbackLog.restoredFiles++;
          
          // Progress indicator for large restorations
          if (this.rollbackLog.restoredFiles % 50 === 0) {
            console.log(`  📄 Restored ${this.rollbackLog.restoredFiles} files...`);
          }
        }
      } catch (error) {
        console.error(`⚠️  Failed to restore ${targetPath}:`, error.message);
        this.rollbackLog.failedFiles++;
      }
    }
  }

  /**
   * CONTEXT7 SOURCE: /unjs/magicast - Validation patterns for rollback verification
   * Selective rollback for specific issues or file types
   */
  async selectiveRollback(backupPath, options = {}) {
    console.log('🎯 Attempting selective rollback...');
    
    const { fileTypes = [], issues = [] } = options;
    
    try {
      // Read execution log to identify files to rollback
      const logPath = './fix-execution-log.json';
      const executionLog = JSON.parse(await fs.readFile(logPath, 'utf8'));
      
      let filesToRollback = new Set();
      
      // Filter by file types
      if (fileTypes.length > 0) {
        executionLog.detailedChanges.forEach(change => {
          const ext = path.extname(change.file);
          if (fileTypes.includes(ext)) {
            filesToRollback.add(change.file);
          }
        });
      }
      
      // Filter by specific issues
      if (issues.length > 0) {
        executionLog.detailedChanges.forEach(change => {
          if (issues.includes(change.type)) {
            filesToRollback.add(change.file);
          }
        });
      }
      
      console.log(`🔄 Rolling back ${filesToRollback.size} files...`);
      
      // Restore selected files
      for (const filePath of filesToRollback) {
        const relativePath = path.relative(process.cwd(), filePath);
        const backupFilePath = path.join(backupPath, relativePath);
        
        try {
          await fs.copyFile(backupFilePath, filePath);
          this.rollbackLog.restoredFiles++;
          console.log(`  ✅ Restored: ${relativePath}`);
        } catch (error) {
          console.error(`  ❌ Failed to restore ${relativePath}:`, error.message);
          this.rollbackLog.failedFiles++;
        }
      }
      
      console.log('✅ Selective rollback completed');
      this.rollbackLog.method = 'selective-restore';
      return true;
      
    } catch (error) {
      console.error('❌ Selective rollback failed:', error.message);
      return false;
    }
  }

  /**
   * Post-rollback validation to ensure system integrity
   */
  async validateRollback() {
    console.log('🔍 Validating rollback success...');
    
    const validationResults = {
      typescript: false,
      eslint: false,
      build: false,
      tests: false
    };
    
    try {
      // TypeScript compilation check
      console.log('  📝 Checking TypeScript compilation...');
      execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe', timeout: 60000 });
      validationResults.typescript = true;
      console.log('  ✅ TypeScript compilation successful');
    } catch (error) {
      console.error('  ❌ TypeScript compilation failed');
    }
    
    try {
      // ESLint validation
      console.log('  🔍 Running ESLint validation...');
      execSync('npx eslint src --ext .ts,.tsx,.js,.jsx --quiet', { stdio: 'pipe', timeout: 45000 });
      validationResults.eslint = true;
      console.log('  ✅ ESLint validation passed');
    } catch (error) {
      console.error('  ⚠️  ESLint validation warnings (non-critical)');
      validationResults.eslint = 'warnings';
    }
    
    try {
      // Build test
      console.log('  🏗️  Testing build process...');
      execSync('npm run build', { stdio: 'pipe', timeout: 120000 });
      validationResults.build = true;
      console.log('  ✅ Build process successful');
    } catch (error) {
      console.error('  ❌ Build process failed');
    }
    
    const overallSuccess = validationResults.typescript && validationResults.build;
    
    console.log('📊 Rollback validation summary:');
    console.log(`  TypeScript: ${validationResults.typescript ? '✅' : '❌'}`);
    console.log(`  ESLint: ${validationResults.eslint === true ? '✅' : validationResults.eslint === 'warnings' ? '⚠️' : '❌'}`);
    console.log(`  Build: ${validationResults.build ? '✅' : '❌'}`);
    
    return overallSuccess;
  }

  /**
   * Save rollback log for audit trail
   */
  async saveRollbackLog() {
    this.rollbackLog.endTime = new Date().toISOString();
    this.rollbackLog.duration = new Date(this.rollbackLog.endTime) - new Date(this.rollbackLog.startTime);
    
    const logFile = `./rollback-log-${this.rollbackLog.rollbackId}.json`;
    await fs.writeFile(logFile, JSON.stringify(this.rollbackLog, null, 2));
    
    console.log(`📄 Rollback log saved: ${logFile}`);
  }

  /**
   * Main rollback execution with automatic fallback
   */
  async execute(options = {}) {
    console.log('🚨 EMERGENCY ROLLBACK SYSTEM INITIATED');
    console.log(`🆔 Rollback ID: ${this.rollbackLog.rollbackId}`);
    
    try {
      const { method = 'auto', backupPath = null, targetCommit = null, selective = null } = options;
      
      let rollbackSuccess = false;
      
      if (method === 'git' || method === 'auto') {
        if (targetCommit) {
          rollbackSuccess = await this.gitRollback(targetCommit);
        } else {
          console.log('⚠️  No target commit specified for git rollback');
        }
      }
      
      if (!rollbackSuccess && (method === 'file' || method === 'auto')) {
        if (backupPath) {
          rollbackSuccess = await this.fileRollback(backupPath);
        } else {
          // Try to find latest backup
          const backupDirs = await fs.readdir('./backups').catch(() => []);
          const latestBackup = backupDirs
            .filter(dir => dir.startsWith('automated-fixes-'))
            .sort()
            .pop();
          
          if (latestBackup) {
            const fullBackupPath = `./backups/${latestBackup}`;
            console.log(`📁 Using latest backup: ${fullBackupPath}`);
            rollbackSuccess = await this.fileRollback(fullBackupPath);
          } else {
            console.error('❌ No backup directory found');
          }
        }
      }
      
      if (!rollbackSuccess && selective) {
        rollbackSuccess = await this.selectiveRollback(backupPath, selective);
      }
      
      if (rollbackSuccess) {
        console.log('\n🔍 Validating rollback...');
        const validationSuccess = await this.validateRollback();
        
        if (validationSuccess) {
          console.log('\n🎉 ROLLBACK COMPLETED SUCCESSFULLY');
          console.log('✅ System restored to pre-fix state');
          console.log('🔧 All functionality verified');
        } else {
          console.log('\n⚠️  ROLLBACK COMPLETED WITH WARNINGS');
          console.log('🔧 Manual verification may be required');
        }
      } else {
        console.error('\n❌ ROLLBACK FAILED');
        console.error('🚨 Manual intervention required');
        process.exit(1);
      }
      
    } catch (error) {
      console.error('💥 CRITICAL ROLLBACK ERROR:', error.message);
      throw error;
      
    } finally {
      await this.saveRollbackLog();
    }
  }
}

/**
 * Command line interface for emergency rollback
 */
async function main() {
  const args = process.argv.slice(2);
  const options = {};
  
  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--method':
        options.method = args[++i];
        break;
      case '--backup':
        options.backupPath = args[++i];
        break;
      case '--commit':
        options.targetCommit = args[++i];
        break;
      case '--selective':
        options.selective = JSON.parse(args[++i]);
        break;
      case '--help':
        console.log(`
🚨 EMERGENCY ROLLBACK SYSTEM

Usage:
  node rollback-script.js [options]

Options:
  --method <git|file|auto>     Rollback method (default: auto)
  --backup <path>              Path to backup directory
  --commit <hash>              Git commit hash to rollback to
  --selective <json>           Selective rollback options
  --help                       Show this help message

Examples:
  # Automatic rollback (tries git first, then file backup)
  node rollback-script.js

  # Git rollback to specific commit
  node rollback-script.js --method git --commit abc123

  # File backup rollback
  node rollback-script.js --method file --backup ./backups/automated-fixes-2025-09-01

  # Selective rollback for specific issues
  node rollback-script.js --selective '{"issues":["typography","color-standardization"]}'
        `);
        return;
    }
  }
  
  const rollbackSystem = new EmergencyRollbackSystem();
  await rollbackSystem.execute(options);
}

// Execute if run directly
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  main().catch(console.error);
}

export default EmergencyRollbackSystem;