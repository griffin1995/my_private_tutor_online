#!/usr/bin/env node

/**
 * Performance Baseline Measurement Script
 * Comprehensive performance metrics collection for My Private Tutor Online
 * 
 * CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring and optimization patterns
 * PURPOSE: Establish baseline metrics for Phase 1 of performance optimization
 */

const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Performance thresholds (based on Google's Core Web Vitals)
const thresholds = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
  FID: { good: 100, poor: 300 },   // First Input Delay (ms)
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte (ms)
  INP: { good: 200, poor: 500 },   // Interaction to Next Paint (ms)
  buildTime: { good: 30000, poor: 60000 }, // Build time (ms)
  bundleSize: { good: 250, poor: 500 }, // Bundle size (KB)
};

class PerformanceBaseline {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      environment: {
        node: process.version,
        platform: process.platform,
        arch: process.arch,
        cpus: require('os').cpus().length,
        memory: Math.round(require('os').totalmem() / 1024 / 1024 / 1024) + 'GB',
      },
      buildMetrics: {},
      bundleAnalysis: {},
      runtimeMetrics: {},
      componentMetrics: {},
      recommendations: [],
    };
  }

  log(message, type = 'info') {
    const typeColors = {
      info: colors.blue,
      success: colors.green,
      warning: colors.yellow,
      error: colors.red,
      header: colors.magenta,
    };
    
    const color = typeColors[type] || colors.reset;
    console.log(`${color}${colors.bright}${message}${colors.reset}`);
  }

  async measureBuildPerformance() {
    this.log('\n📊 Measuring Build Performance...', 'header');
    
    try {
      // Clean build cache
      this.log('Cleaning build cache...', 'info');
      execSync('npm run clean', { stdio: 'inherit' });
      
      // Measure build time
      this.log('Running production build...', 'info');
      const startTime = Date.now();
      
      const buildOutput = execSync('npm run build 2>&1', { 
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      });
      
      const buildTime = Date.now() - startTime;
      
      // Parse build output for metrics
      const routes = buildOutput.match(/○\s+.*?(?=\s+\d)/g) || [];
      const staticRoutes = routes.filter(r => r.includes('○')).length;
      const dynamicRoutes = routes.filter(r => r.includes('λ')).length;
      const staticDataRoutes = routes.filter(r => r.includes('●')).length;
      
      // Extract bundle sizes
      const firstLoadMatch = buildOutput.match(/First Load JS.*?(\d+(?:\.\d+)?)\s*(kB|MB)/);
      const firstLoadSize = firstLoadMatch ? 
        parseFloat(firstLoadMatch[1]) * (firstLoadMatch[2] === 'MB' ? 1024 : 1) : 0;
      
      this.results.buildMetrics = {
        buildTime,
        buildTimeFormatted: `${(buildTime / 1000).toFixed(2)}s`,
        totalRoutes: routes.length,
        staticRoutes,
        dynamicRoutes,
        staticDataRoutes,
        firstLoadJS: firstLoadSize,
        rating: this.getRating(buildTime, thresholds.buildTime),
      };
      
      this.log(`✅ Build completed in ${this.results.buildMetrics.buildTimeFormatted}`, 'success');
      this.log(`   Total routes: ${routes.length}`, 'info');
      this.log(`   First Load JS: ${firstLoadSize.toFixed(2)} kB`, 'info');
      
    } catch (error) {
      this.log(`❌ Build measurement failed: ${error.message}`, 'error');
      this.results.buildMetrics.error = error.message;
    }
  }

  async analyzeBundles() {
    this.log('\n📦 Analyzing Bundle Sizes...', 'header');
    
    try {
      // Get .next directory stats
      const nextDir = path.join(process.cwd(), '.next');
      
      if (!fs.existsSync(nextDir)) {
        throw new Error('.next directory not found. Run build first.');
      }
      
      // Analyze static assets
      const staticDir = path.join(nextDir, 'static');
      const bundles = this.getDirectorySize(staticDir);
      
      // Analyze chunks
      const chunksDir = path.join(staticDir, 'chunks');
      const chunks = fs.existsSync(chunksDir) ? 
        fs.readdirSync(chunksDir).map(file => ({
          name: file,
          size: fs.statSync(path.join(chunksDir, file)).size / 1024,
        })).sort((a, b) => b.size - a.size) : [];
      
      // Find largest chunks
      const largestChunks = chunks.slice(0, 10);
      
      this.results.bundleAnalysis = {
        totalStaticSize: bundles,
        totalStaticSizeFormatted: `${bundles.toFixed(2)} kB`,
        chunksCount: chunks.length,
        largestChunks: largestChunks.map(c => ({
          ...c,
          sizeFormatted: `${c.size.toFixed(2)} kB`,
        })),
        averageChunkSize: chunks.length > 0 ? 
          chunks.reduce((sum, c) => sum + c.size, 0) / chunks.length : 0,
      };
      
      this.log(`✅ Bundle analysis complete`, 'success');
      this.log(`   Total static size: ${this.results.bundleAnalysis.totalStaticSizeFormatted}`, 'info');
      this.log(`   Number of chunks: ${chunks.length}`, 'info');
      
      // Warn about large chunks
      const largeChunks = chunks.filter(c => c.size > 50);
      if (largeChunks.length > 0) {
        this.log(`⚠️  Found ${largeChunks.length} chunks larger than 50kB`, 'warning');
        this.results.recommendations.push({
          type: 'bundle-size',
          priority: 'high',
          message: `${largeChunks.length} chunks exceed 50kB. Consider code splitting or dynamic imports.`,
        });
      }
      
    } catch (error) {
      this.log(`❌ Bundle analysis failed: ${error.message}`, 'error');
      this.results.bundleAnalysis.error = error.message;
    }
  }

  async measureComponentPerformance() {
    this.log('\n🧩 Analyzing Component Performance...', 'header');
    
    try {
      // Analyze homepage components
      const componentsToAnalyze = [
        'hero-section',
        'three-pillars',
        'testimonials',
        'about-section',
        'contact-form',
        'video-player',
      ];
      
      const componentMetrics = {};
      
      // Check component file sizes
      const componentsDir = path.join(process.cwd(), 'src', 'components');
      
      for (const component of componentsToAnalyze) {
        const possiblePaths = [
          path.join(componentsDir, 'sections', `${component}.tsx`),
          path.join(componentsDir, 'home', `${component}.tsx`),
          path.join(componentsDir, `${component}.tsx`),
        ];
        
        for (const componentPath of possiblePaths) {
          if (fs.existsSync(componentPath)) {
            const stats = fs.statSync(componentPath);
            const content = fs.readFileSync(componentPath, 'utf8');
            
            componentMetrics[component] = {
              fileSize: (stats.size / 1024).toFixed(2) + ' kB',
              lines: content.split('\n').length,
              hasLazyLoad: content.includes('dynamic(') || content.includes('lazy('),
              hasOptimizedImages: content.includes('Image') && content.includes('next/image'),
              usesFramerMotion: content.includes('framer-motion'),
              complexity: this.calculateComplexity(content),
            };
            
            break;
          }
        }
      }
      
      this.results.componentMetrics = componentMetrics;
      
      this.log(`✅ Component analysis complete`, 'success');
      
      // Recommendations based on component analysis
      Object.entries(componentMetrics).forEach(([name, metrics]) => {
        if (!metrics.hasLazyLoad && metrics.complexity > 50) {
          this.results.recommendations.push({
            type: 'component-optimization',
            priority: 'medium',
            message: `Component '${name}' has high complexity (${metrics.complexity}) but no lazy loading.`,
          });
        }
        
        if (metrics.usesFramerMotion && !metrics.hasLazyLoad) {
          this.results.recommendations.push({
            type: 'animation-optimization',
            priority: 'high',
            message: `Component '${name}' uses Framer Motion but is not lazy loaded.`,
          });
        }
      });
      
    } catch (error) {
      this.log(`❌ Component analysis failed: ${error.message}`, 'error');
      this.results.componentMetrics.error = error.message;
    }
  }

  async checkPerformanceBudgets() {
    this.log('\n💰 Checking Performance Budgets...', 'header');
    
    const budgets = {
      firstLoadJS: 250, // kB
      totalBundleSize: 1000, // kB
      buildTime: 30, // seconds
      largestChunk: 100, // kB
    };
    
    const violations = [];
    
    // Check First Load JS
    if (this.results.buildMetrics.firstLoadJS > budgets.firstLoadJS) {
      violations.push({
        metric: 'First Load JS',
        budget: budgets.firstLoadJS,
        actual: this.results.buildMetrics.firstLoadJS,
        exceeded: ((this.results.buildMetrics.firstLoadJS - budgets.firstLoadJS) / budgets.firstLoadJS * 100).toFixed(1),
      });
    }
    
    // Check build time
    const buildTimeSeconds = this.results.buildMetrics.buildTime / 1000;
    if (buildTimeSeconds > budgets.buildTime) {
      violations.push({
        metric: 'Build Time',
        budget: budgets.buildTime,
        actual: buildTimeSeconds,
        exceeded: ((buildTimeSeconds - budgets.buildTime) / budgets.buildTime * 100).toFixed(1),
      });
    }
    
    // Check largest chunk
    if (this.results.bundleAnalysis.largestChunks?.[0]) {
      const largestChunkSize = this.results.bundleAnalysis.largestChunks[0].size;
      if (largestChunkSize > budgets.largestChunk) {
        violations.push({
          metric: 'Largest Chunk',
          budget: budgets.largestChunk,
          actual: largestChunkSize,
          exceeded: ((largestChunkSize - budgets.largestChunk) / budgets.largestChunk * 100).toFixed(1),
        });
      }
    }
    
    this.results.budgetViolations = violations;
    
    if (violations.length === 0) {
      this.log(`✅ All performance budgets met!`, 'success');
    } else {
      this.log(`⚠️  ${violations.length} budget violations found:`, 'warning');
      violations.forEach(v => {
        this.log(`   ${v.metric}: ${v.actual} (budget: ${v.budget}, +${v.exceeded}%)`, 'warning');
      });
    }
  }

  // Helper methods
  getDirectorySize(dir) {
    if (!fs.existsSync(dir)) return 0;
    
    let totalSize = 0;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        totalSize += this.getDirectorySize(filePath);
      } else {
        totalSize += stats.size;
      }
    });
    
    return totalSize / 1024; // Return in kB
  }

  calculateComplexity(content) {
    // Simple complexity score based on various factors
    let score = 0;
    
    // Count hooks
    const hookMatches = content.match(/use[A-Z]\w+/g) || [];
    score += hookMatches.length * 5;
    
    // Count state variables
    const stateMatches = content.match(/useState|useReducer/g) || [];
    score += stateMatches.length * 10;
    
    // Count effects
    const effectMatches = content.match(/useEffect|useLayoutEffect/g) || [];
    score += effectMatches.length * 15;
    
    // Count conditional renders
    const conditionalMatches = content.match(/\?.*?:/g) || [];
    score += conditionalMatches.length * 2;
    
    // Count map operations
    const mapMatches = content.match(/\.map\(/g) || [];
    score += mapMatches.length * 5;
    
    return score;
  }

  getRating(value, threshold) {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  async generateReport() {
    this.log('\n📝 Generating Performance Report...', 'header');
    
    // Generate summary
    const summary = {
      ...this.results,
      summary: {
        buildPerformance: this.results.buildMetrics.rating || 'unknown',
        bundleSize: this.results.buildMetrics.firstLoadJS < thresholds.bundleSize.good ? 'good' : 
                   this.results.buildMetrics.firstLoadJS < thresholds.bundleSize.poor ? 'needs-improvement' : 'poor',
        recommendations: this.results.recommendations.length,
        budgetViolations: this.results.budgetViolations?.length || 0,
      },
    };
    
    // Save to file
    const reportPath = path.join(process.cwd(), 'performance-baseline.json');
    fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
    
    this.log(`\n✅ Performance baseline report saved to: ${reportPath}`, 'success');
    
    // Print summary
    this.log('\n📊 PERFORMANCE BASELINE SUMMARY', 'header');
    this.log('================================', 'header');
    
    this.log('\nBuild Metrics:', 'info');
    this.log(`  Build Time: ${this.results.buildMetrics.buildTimeFormatted} (${this.results.buildMetrics.rating})`, 
      this.results.buildMetrics.rating === 'good' ? 'success' : 'warning');
    this.log(`  First Load JS: ${this.results.buildMetrics.firstLoadJS?.toFixed(2)} kB`, 'info');
    this.log(`  Total Routes: ${this.results.buildMetrics.totalRoutes}`, 'info');
    
    this.log('\nBundle Analysis:', 'info');
    this.log(`  Total Static Size: ${this.results.bundleAnalysis.totalStaticSizeFormatted}`, 'info');
    this.log(`  Number of Chunks: ${this.results.bundleAnalysis.chunksCount}`, 'info');
    
    if (this.results.recommendations.length > 0) {
      this.log('\n⚠️  Recommendations:', 'warning');
      this.results.recommendations.forEach((rec, i) => {
        this.log(`  ${i + 1}. [${rec.priority.toUpperCase()}] ${rec.message}`, 'warning');
      });
    }
    
    if (this.results.budgetViolations?.length > 0) {
      this.log('\n❌ Budget Violations:', 'error');
      this.results.budgetViolations.forEach(v => {
        this.log(`  ${v.metric}: ${v.actual} (exceeded by ${v.exceeded}%)`, 'error');
      });
    }
    
    return summary;
  }

  async run() {
    this.log(`${colors.bright}${colors.cyan}
╔════════════════════════════════════════════════════════╗
║     MY PRIVATE TUTOR ONLINE - PERFORMANCE BASELINE    ║
║                    Phase 1 Analysis                    ║
╚════════════════════════════════════════════════════════╝
${colors.reset}`);
    
    try {
      await this.measureBuildPerformance();
      await this.analyzeBundles();
      await this.measureComponentPerformance();
      await this.checkPerformanceBudgets();
      await this.generateReport();
      
      this.log('\n✨ Performance baseline measurement complete!', 'success');
      
    } catch (error) {
      this.log(`\n❌ Fatal error: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run the baseline measurement
if (require.main === module) {
  const baseline = new PerformanceBaseline();
  baseline.run().catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
}

module.exports = PerformanceBaseline;