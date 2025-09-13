#!/usr/bin/env node

/**
 * ROLLBACK CRITERIA CHECK SCRIPT
 * 
 * CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring and rollback automation
 * PERFORMANCE PHASE 1: Automated rollback based on defined criteria
 * 
 * Checks for performance regressions and triggers rollback if needed
 * Based on criteria from PERFORMANCE_PHASE1.md and PERFORMANCE_AGREEMENT_FINAL.md
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rollback triggers from PERFORMANCE_AGREEMENT_FINAL.md
const ROLLBACK_TRIGGERS = {
  buildFailure: true,
  bundleSizeIncrease: 10,    // 10% max increase
  performanceRegression: 20,  // 20% max regression
  cmsAsyncDetected: true,     // CRITICAL - Protects synchronous architecture
  buildTimeIncrease: 10      // 10% max increase
};

// Performance budget from PERFORMANCE_PHASE1.md
const PERFORMANCE_BUDGET = {
  firstLoadJS: 250 * 1024,   // 250KB
  buildTime: 30000,          // 30s
  bundleSizeGrowth: 5        // 5% max per phase
};

class RollbackChecker {
  constructor() {
    this.hasViolations = false;
    this.violations = [];
    this.baseline = null;
    this.current = null;
  }

  loadBaseline() {
    try {
      const baselinePath = path.join(__dirname, 'performance-baseline.json');
      if (fs.existsSync(baselinePath)) {
        this.baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
        console.log('✅ Baseline metrics loaded');
        return true;
      } else {
        console.error('❌ No baseline metrics found. Run performance-audit.js first.');
        return false;
      }
    } catch (error) {
      console.error('❌ Error loading baseline:', error.message);
      return false;
    }
  }

  loadCurrentMetrics() {
    try {
      const metricsPath = path.join(__dirname, '..', 'performance-report.json');
      if (fs.existsSync(metricsPath)) {
        this.current = JSON.parse(fs.readFileSync(metricsPath, 'utf-8'));
        console.log('✅ Current metrics loaded');
        return true;
      } else {
        console.error('❌ No current metrics found. Run performance-audit.js first.');
        return false;
      }
    } catch (error) {
      console.error('❌ Error loading current metrics:', error.message);
      return false;
    }
  }

  checkBuildTime() {
    if (!this.baseline?.metrics?.build || !this.current?.metrics?.build) return;

    const baselineTime = this.baseline.metrics.build.time;
    const currentTime = this.current.metrics.build.time;
    const increase = ((currentTime - baselineTime) / baselineTime) * 100;

    console.log(`\n📊 Build Time Check:`);
    console.log(`   Baseline: ${baselineTime}ms`);
    console.log(`   Current: ${currentTime}ms`);
    console.log(`   Change: ${increase.toFixed(2)}%`);

    if (increase > ROLLBACK_TRIGGERS.buildTimeIncrease) {
      this.violations.push({
        type: 'BUILD_TIME',
        message: `Build time increased by ${increase.toFixed(2)}% (max: ${ROLLBACK_TRIGGERS.buildTimeIncrease}%)`,
        severity: 'high'
      });
      this.hasViolations = true;
      console.log(`   ❌ VIOLATION: Exceeds ${ROLLBACK_TRIGGERS.buildTimeIncrease}% threshold`);
    } else {
      console.log(`   ✅ Within threshold`);
    }
  }

  checkBundleSize() {
    if (!this.baseline?.metrics?.bundles || !this.current?.metrics?.bundles) return;

    const baselineSize = this.baseline.metrics.bundles.total;
    const currentSize = this.current.metrics.bundles.total;
    const increase = ((currentSize - baselineSize) / baselineSize) * 100;

    console.log(`\n📦 Bundle Size Check:`);
    console.log(`   Baseline: ${(baselineSize / 1024).toFixed(2)}KB`);
    console.log(`   Current: ${(currentSize / 1024).toFixed(2)}KB`);
    console.log(`   Change: ${increase.toFixed(2)}%`);

    if (increase > ROLLBACK_TRIGGERS.bundleSizeIncrease) {
      this.violations.push({
        type: 'BUNDLE_SIZE',
        message: `Bundle size increased by ${increase.toFixed(2)}% (max: ${ROLLBACK_TRIGGERS.bundleSizeIncrease}%)`,
        severity: 'high'
      });
      this.hasViolations = true;
      console.log(`   ❌ VIOLATION: Exceeds ${ROLLBACK_TRIGGERS.bundleSizeIncrease}% threshold`);
    } else if (increase > PERFORMANCE_BUDGET.bundleSizeGrowth) {
      console.log(`   ⚠️ WARNING: Exceeds Phase 1 budget of ${PERFORMANCE_BUDGET.bundleSizeGrowth}%`);
    } else {
      console.log(`   ✅ Within threshold`);
    }
  }

  checkCMSArchitecture() {
    console.log(`\n🏗️ CMS Architecture Check:`);
    
    // Check for async patterns in CMS files
    const cmsPath = path.join(__dirname, '..', 'src', 'lib', 'cms', 'cms-content.ts');
    if (fs.existsSync(cmsPath)) {
      const content = fs.readFileSync(cmsPath, 'utf-8');
      
      // Critical patterns that indicate async CMS
      const asyncPatterns = [
        /export\s+const\s+\w+\s*=\s*async/g,
        /Promise</g,
        /\.then\(/g,
        /await\s+/g,
        /useState\s*\(\s*null\s*\)/g,
        /useEffect\s*\(\s*\(\s*\)\s*=>/g
      ];

      let asyncDetected = false;
      for (const pattern of asyncPatterns) {
        if (pattern.test(content)) {
          asyncDetected = true;
          this.violations.push({
            type: 'CMS_ASYNC',
            message: `Async pattern detected: ${pattern.source}`,
            severity: 'critical'
          });
        }
      }

      if (asyncDetected) {
        this.hasViolations = true;
        console.log(`   ❌ CRITICAL: Async patterns detected in CMS`);
      } else {
        console.log(`   ✅ Synchronous architecture verified`);
      }
    }
  }

  checkPerformanceMetrics() {
    if (!this.baseline?.metrics?.runtime || !this.current?.metrics?.runtime) return;

    console.log(`\n⚡ Runtime Performance Check:`);
    
    for (const [route, baselineMetrics] of Object.entries(this.baseline.metrics.runtime)) {
      const currentMetrics = this.current.metrics.runtime[route];
      if (!currentMetrics) continue;

      const baselineTime = baselineMetrics.loadTime;
      const currentTime = currentMetrics.loadTime;
      const regression = ((currentTime - baselineTime) / baselineTime) * 100;

      console.log(`   ${route}:`);
      console.log(`      Baseline: ${baselineTime}ms`);
      console.log(`      Current: ${currentTime}ms`);
      console.log(`      Change: ${regression.toFixed(2)}%`);

      if (regression > ROLLBACK_TRIGGERS.performanceRegression) {
        this.violations.push({
          type: 'PERFORMANCE',
          message: `Route ${route} regressed by ${regression.toFixed(2)}% (max: ${ROLLBACK_TRIGGERS.performanceRegression}%)`,
          severity: 'medium'
        });
        console.log(`      ❌ Regression exceeds threshold`);
      } else {
        console.log(`      ✅ Within threshold`);
      }
    }
  }

  executeRollback() {
    console.log('\n🔄 EXECUTING ROLLBACK...');
    
    try {
      // Save current state for debugging
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const backupPath = path.join(__dirname, `rollback-${timestamp}.json`);
      fs.writeFileSync(backupPath, JSON.stringify({
        violations: this.violations,
        baseline: this.baseline,
        current: this.current
      }, null, 2));
      console.log(`📁 Violations saved to ${backupPath}`);

      // Git rollback
      console.log('🔙 Rolling back to previous commit...');
      execSync('git stash', { stdio: 'inherit' });
      execSync('git checkout HEAD~1', { stdio: 'inherit' });
      
      console.log('✅ Rollback completed');
      console.log('⚠️ Manual review required before proceeding');
      
      return true;
    } catch (error) {
      console.error('❌ Rollback failed:', error.message);
      console.error('⚠️ Manual intervention required');
      return false;
    }
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('ROLLBACK CRITERIA CHECK REPORT');
    console.log('='.repeat(60));
    
    if (this.hasViolations) {
      console.log('\n❌ VIOLATIONS DETECTED:');
      
      const critical = this.violations.filter(v => v.severity === 'critical');
      const high = this.violations.filter(v => v.severity === 'high');
      const medium = this.violations.filter(v => v.severity === 'medium');
      
      if (critical.length > 0) {
        console.log('\n🚨 CRITICAL:');
        critical.forEach(v => console.log(`   - ${v.message}`));
      }
      
      if (high.length > 0) {
        console.log('\n⚠️ HIGH:');
        high.forEach(v => console.log(`   - ${v.message}`));
      }
      
      if (medium.length > 0) {
        console.log('\n⚡ MEDIUM:');
        medium.forEach(v => console.log(`   - ${v.message}`));
      }
      
      console.log('\n' + '='.repeat(60));
      
      // Determine if automatic rollback is needed
      const needsRollback = critical.length > 0 || high.length > 1;
      
      if (needsRollback) {
        console.log('🔴 AUTOMATIC ROLLBACK REQUIRED');
        
        if (process.argv.includes('--auto-rollback')) {
          this.executeRollback();
        } else {
          console.log('💡 Run with --auto-rollback flag to execute rollback');
          process.exit(1);
        }
      } else {
        console.log('🟡 MANUAL REVIEW RECOMMENDED');
        console.log('   Violations detected but below automatic rollback threshold');
      }
    } else {
      console.log('\n✅ ALL CHECKS PASSED');
      console.log('   No violations detected');
      console.log('   Safe to proceed with deployment');
    }
    
    console.log('\n' + '='.repeat(60));
  }

  async run() {
    console.log('🚀 Starting Rollback Criteria Check\n');
    
    // Load metrics
    if (!this.loadBaseline()) {
      console.log('\n💡 Creating baseline from current metrics...');
      
      // Copy current to baseline if no baseline exists
      const currentPath = path.join(__dirname, '..', 'performance-report.json');
      const baselinePath = path.join(__dirname, 'performance-baseline.json');
      
      if (fs.existsSync(currentPath)) {
        fs.copyFileSync(currentPath, baselinePath);
        console.log('✅ Baseline created from current metrics');
        console.log('⚠️ Run again after making changes to check for regressions');
        return;
      } else {
        console.error('❌ No metrics available. Run performance-audit.js first.');
        process.exit(1);
      }
    }
    
    if (!this.loadCurrentMetrics()) {
      process.exit(1);
    }
    
    // Run checks
    this.checkBuildTime();
    this.checkBundleSize();
    this.checkCMSArchitecture();
    this.checkPerformanceMetrics();
    
    // Generate report
    this.generateReport();
  }
}

// Run if called directly
if (require.main === module) {
  const checker = new RollbackChecker();
  checker.run().catch(console.error);
}

module.exports = RollbackChecker;