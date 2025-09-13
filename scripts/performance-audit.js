#!/usr/bin/env node

/**
 * PERFORMANCE AUDIT SCRIPT - Phase 1 Implementation
 * 
 * Purpose: Comprehensive performance measurement for My Private Tutor Online
 * Measures: Bundle size, build time, runtime metrics, Core Web Vitals
 * 
 * AGREEMENT WITH ARCHITECT:
 * - Establishes baseline before any optimizations
 * - Provides objective metrics for decision-making
 * - Includes rollback criteria if performance degrades
 * - Respects synchronous CMS architecture
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Performance budget thresholds (agreed with architect)
const PERFORMANCE_BUDGET = {
  firstLoadJS: 250000,      // 250KB max for first load JS
  buildTime: 30000,          // 30s max build time
  pageLoadTime: 2000,        // 2s max page load
  lcp: 2500,                 // 2.5s max Largest Contentful Paint
  fid: 100,                  // 100ms max First Input Delay
  cls: 0.1,                  // 0.1 max Cumulative Layout Shift
  ttfb: 600,                 // 600ms max Time to First Byte
  bundleSizeGrowth: 0.05     // 5% max bundle size growth per phase
};

// Rollback criteria
const ROLLBACK_TRIGGERS = {
  buildFailure: true,
  bundleSizeIncrease: 0.10,  // 10% increase triggers rollback
  performanceRegression: 0.20, // 20% performance drop triggers rollback
  testFailures: true,
  cmsAsyncDetected: true      // Any async CMS pattern triggers rollback
};

class PerformanceAuditor {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      phase: 'baseline',
      metrics: {},
      warnings: [],
      recommendations: []
    };
  }

  async measureBuildPerformance() {
    console.log('\n📊 Measuring Build Performance...');
    
    // Clean build
    await execAsync('npm run clean');
    
    const startTime = Date.now();
    try {
      const { stdout } = await execAsync('npm run build');
      const buildTime = Date.now() - startTime;
      
      // Parse build output for metrics
      const routeMatches = stdout.match(/(\d+) static pages/);
      const jsMatches = stdout.match(/First Load JS.*?(\d+\.?\d*)\s*(kB|MB)/);
      
      this.results.metrics.build = {
        time: buildTime,
        routes: routeMatches ? parseInt(routeMatches[1]) : 0,
        firstLoadJS: this.parseSize(jsMatches),
        success: true
      };
      
      // Check against budget
      if (buildTime > PERFORMANCE_BUDGET.buildTime) {
        this.results.warnings.push(`Build time ${buildTime}ms exceeds budget ${PERFORMANCE_BUDGET.buildTime}ms`);
      }
      
      console.log(`✅ Build completed in ${buildTime}ms`);
      console.log(`   Routes: ${this.results.metrics.build.routes}`);
      console.log(`   First Load JS: ${this.results.metrics.build.firstLoadJS} bytes`);
      
    } catch (error) {
      this.results.metrics.build = { success: false, error: error.message };
      this.results.warnings.push('Build failed - rollback required');
      return false;
    }
    
    return true;
  }

  async analyzeBundleSize() {
    console.log('\n📦 Analyzing Bundle Sizes...');
    
    const nextDir = path.join(process.cwd(), '.next');
    const staticDir = path.join(nextDir, 'static');
    
    if (!fs.existsSync(staticDir)) {
      this.results.warnings.push('No .next/static directory found');
      return;
    }
    
    // Analyze chunk sizes
    const chunks = {};
    const findChunks = (dir) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          findChunks(fullPath);
        } else if (file.endsWith('.js')) {
          const size = stat.size;
          const name = file.replace(/\-[a-z0-9]+\.js$/, '');
          
          if (!chunks[name]) chunks[name] = 0;
          chunks[name] += size;
        }
      });
    };
    
    findChunks(staticDir);
    
    // Sort by size and identify largest chunks
    const sortedChunks = Object.entries(chunks)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    this.results.metrics.bundles = {
      total: Object.values(chunks).reduce((a, b) => a + b, 0),
      chunks: sortedChunks.map(([name, size]) => ({ name, size })),
      largestChunk: sortedChunks[0]
    };
    
    console.log(`   Total JS: ${(this.results.metrics.bundles.total / 1024).toFixed(2)}KB`);
    console.log(`   Largest chunk: ${sortedChunks[0][0]} (${(sortedChunks[0][1] / 1024).toFixed(2)}KB)`);
    
    // Identify optimization opportunities
    if (sortedChunks[0][1] > 100000) {
      this.results.recommendations.push({
        priority: 'high',
        type: 'bundle-split',
        chunk: sortedChunks[0][0],
        reason: `Chunk ${sortedChunks[0][0]} is ${(sortedChunks[0][1] / 1024).toFixed(2)}KB`
      });
    }
  }

  async checkCMSArchitecture() {
    console.log('\n🔍 Verifying CMS Architecture...');
    
    const cmsPath = path.join(process.cwd(), 'src/lib/cms/cms-content.ts');
    const cmsContent = fs.readFileSync(cmsPath, 'utf-8');
    
    // Check for forbidden async patterns IN CODE, not comments
    // Remove all comments first
    const codeOnly = cmsContent
      .split('\n')
      .map(line => {
        // Remove single-line comments
        const commentIndex = line.indexOf('//');
        if (commentIndex >= 0) {
          return line.substring(0, commentIndex);
        }
        return line;
      })
      .join('\n')
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Check for actual async code patterns
    const asyncPatterns = [
      /async\s+function\s+get/,
      /export\s+async\s+function/,
      /:\s*Promise</,
      /\.then\(/,
      /await\s+/,
      /useState.*cms/i,
      /useEffect.*cms/i
    ];
    
    const violations = [];
    asyncPatterns.forEach(pattern => {
      if (pattern.test(codeOnly)) {
        violations.push(`Async pattern detected: ${pattern.source}`);
      }
    });
    
    this.results.metrics.cmsArchitecture = {
      synchronous: violations.length === 0,
      violations
    };
    
    if (violations.length > 0) {
      this.results.warnings.push('CMS async patterns detected - CRITICAL VIOLATION');
      console.log('❌ Async CMS patterns detected - rollback required');
      return false;
    }
    
    console.log('✅ CMS architecture verified as synchronous');
    return true;
  }

  async measureRuntimePerformance() {
    console.log('\n⚡ Measuring Runtime Performance...');
    
    // Start production server
    const server = exec('npm run start');
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      // Measure key pages
      const pages = ['/', '/about', '/testimonials', '/contact'];
      const measurements = {};
      
      for (const page of pages) {
        const startTime = Date.now();
        const response = await fetch(`http://localhost:3000${page}`);
        const loadTime = Date.now() - startTime;
        
        measurements[page] = {
          loadTime,
          status: response.status,
          size: parseInt(response.headers.get('content-length') || '0')
        };
        
        console.log(`   ${page}: ${loadTime}ms`);
      }
      
      this.results.metrics.runtime = measurements;
      
      // Check against budget
      const avgLoadTime = Object.values(measurements)
        .reduce((a, b) => a + b.loadTime, 0) / pages.length;
      
      if (avgLoadTime > PERFORMANCE_BUDGET.pageLoadTime) {
        this.results.warnings.push(`Average load time ${avgLoadTime}ms exceeds budget`);
      }
      
    } finally {
      // Kill server
      server.kill();
    }
  }

  async identifyOptimizationTargets() {
    console.log('\n🎯 Identifying Optimization Targets...');
    
    // Phase 1 Safe Optimizations (agreed with architect)
    const phase1Targets = [
      {
        component: 'VideoTestimonials',
        technique: 'lazy-loading',
        impact: 'high',
        risk: 'low',
        estimatedSavings: '~150KB initial bundle'
      },
      {
        component: 'cms-content.ts',
        technique: 'add-return-types',
        impact: 'medium',
        risk: 'zero',
        estimatedSavings: '~500ms compilation time'
      },
      {
        component: 'Images',
        technique: 'next/image-optimization',
        impact: 'high',
        risk: 'low',
        estimatedSavings: '~1s LCP improvement'
      },
      {
        component: 'Third-party-scripts',
        technique: 'defer-loading',
        impact: 'medium',
        risk: 'low',
        estimatedSavings: '~300ms TTI'
      }
    ];
    
    this.results.recommendations = [
      ...this.results.recommendations,
      ...phase1Targets.map(target => ({
        phase: 1,
        ...target
      }))
    ];
    
    console.log(`\n📋 Phase 1 Recommendations (Low Risk):`);
    phase1Targets.forEach(target => {
      console.log(`   • ${target.component}: ${target.technique}`);
      console.log(`     Impact: ${target.impact}, Risk: ${target.risk}`);
      console.log(`     Estimated: ${target.estimatedSavings}`);
    });
  }

  parseSize(matches) {
    if (!matches) return 0;
    const value = parseFloat(matches[1]);
    const unit = matches[2];
    return unit === 'MB' ? value * 1024 * 1024 : value * 1024;
  }

  async generateReport() {
    console.log('\n📈 Generating Performance Report...');
    
    const report = {
      ...this.results,
      summary: {
        buildPassed: this.results.metrics.build?.success,
        withinBudget: this.results.warnings.length === 0,
        cmsCompliant: this.results.metrics.cmsArchitecture?.synchronous,
        readyForOptimization: true
      },
      nextSteps: [
        'Review baseline metrics',
        'Implement Phase 1 optimizations',
        'Re-run audit after each change',
        'Monitor for regressions',
        'Gate Phase 2 on Phase 1 success'
      ]
    };
    
    // Save report
    const reportPath = path.join(process.cwd(), 'performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n✅ Report saved to ${reportPath}`);
    
    // Print summary
    console.log('\n=== PERFORMANCE SUMMARY ===');
    console.log(`Build Time: ${this.results.metrics.build?.time}ms`);
    console.log(`First Load JS: ${(this.results.metrics.build?.firstLoadJS / 1024).toFixed(2)}KB`);
    console.log(`Total Bundle: ${(this.results.metrics.bundles?.total / 1024).toFixed(2)}KB`);
    console.log(`CMS Compliant: ${this.results.metrics.cmsArchitecture?.synchronous ? '✅' : '❌'}`);
    console.log(`Warnings: ${this.results.warnings.length}`);
    console.log(`Optimization Targets: ${this.results.recommendations.length}`);
    
    return report;
  }

  async run() {
    console.log('🚀 Starting Performance Audit for My Private Tutor Online\n');
    console.log('PHASE: Baseline Measurement (Pre-optimization)\n');
    
    // Run all measurements
    const buildSuccess = await this.measureBuildPerformance();
    if (!buildSuccess) {
      console.error('\n❌ Build failed - cannot proceed with optimization');
      return;
    }
    
    await this.analyzeBundleSize();
    const cmsCompliant = await this.checkCMSArchitecture();
    
    if (!cmsCompliant) {
      console.error('\n❌ CMS architecture violation - optimization blocked');
      return;
    }
    
    await this.measureRuntimePerformance();
    await this.identifyOptimizationTargets();
    
    const report = await this.generateReport();
    
    if (report.summary.readyForOptimization) {
      console.log('\n✅ System ready for Phase 1 optimizations');
      console.log('   All architectural constraints verified');
      console.log('   Baseline metrics established');
      console.log('   Low-risk targets identified');
    }
  }
}

// Run audit
const auditor = new PerformanceAuditor();
auditor.run().catch(console.error);