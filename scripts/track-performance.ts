#!/usr/bin/env node

// CONTEXT7 SOURCE: /vercel/next.js - Build performance tracking for Phase 1 monitoring
// PERFORMANCE MONITORING REASON: Establish baseline metrics for Symphony Approach™ optimization

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

interface BuildMetrics {
  timestamp: number;
  buildTime: number;
  buildSuccess: boolean;
  typeErrorCount: number;
  bundleSize: number;
  routeCount: number;
  memoryUsage: number;
  errors: string[];
}

interface PerformanceReport {
  baseline: BuildMetrics;
  current: BuildMetrics;
  improvements: {
    buildTime: number;
    typeErrors: number;
    bundleSize: number;
    memoryUsage: number;
  };
  recommendations: string[];
}

class PerformanceTracker {
  private metricsFile = path.join(process.cwd(), '.performance-metrics.json');

  async trackBuild(): Promise<BuildMetrics> {
    console.log('🚀 Starting performance tracking for build...');

    const startTime = Date.now();
    const startMemory = process.memoryUsage().heapUsed;

    const metrics: BuildMetrics = {
      timestamp: Date.now(),
      buildTime: 0,
      buildSuccess: false,
      typeErrorCount: 0,
      bundleSize: 0,
      routeCount: 0,
      memoryUsage: 0,
      errors: []
    };

    try {
      // Run the build
      const { stdout, stderr } = await execAsync('npm run build 2>&1');
      const buildOutput = stdout + stderr;

      // Calculate build time
      metrics.buildTime = (Date.now() - startTime) / 1000;
      metrics.buildSuccess = !buildOutput.includes('Build error occurred');

      // Extract TypeScript errors
      const typeErrorMatches = buildOutput.match(/Type error:/g);
      metrics.typeErrorCount = typeErrorMatches ? typeErrorMatches.length : 0;

      // Extract route count
      const routeMatch = buildOutput.match(/Generating static pages \((\d+)\/(\d+)\)/);
      if (routeMatch) {
        metrics.routeCount = parseInt(routeMatch[2], 10);
      }

      // Calculate memory usage
      metrics.memoryUsage = (process.memoryUsage().heapUsed - startMemory) / 1024 / 1024;

      // Analyze bundle size if build succeeded
      if (metrics.buildSuccess) {
        await this.analyzeBundleSize(metrics);
      }

      // Extract any errors
      if (buildOutput.includes('Error:')) {
        const errorLines = buildOutput.split('\n').filter(line =>
          line.includes('Error:') || line.includes('error')
        );
        metrics.errors = errorLines.slice(0, 5); // Keep first 5 errors
      }

      console.log(`✅ Build completed in ${metrics.buildTime.toFixed(2)}s`);

    } catch (error) {
      console.error('❌ Build failed:', error);
      metrics.errors = [error.message || 'Unknown error'];
    }

    await this.saveMetrics(metrics);
    return metrics;
  }

  private async analyzeBundleSize(metrics: BuildMetrics): Promise<void> {
    try {
      const buildDir = path.join(process.cwd(), '.next');
      const { stdout } = await execAsync(`du -sk ${buildDir}`);
      const sizeKB = parseInt(stdout.split('\t')[0], 10);
      metrics.bundleSize = sizeKB;
    } catch (error) {
      console.warn('Could not analyze bundle size:', error.message);
    }
  }

  private async saveMetrics(metrics: BuildMetrics): Promise<void> {
    try {
      let existingData = { history: [], baseline: null };

      try {
        const data = await fs.readFile(this.metricsFile, 'utf-8');
        existingData = JSON.parse(data);
      } catch {
        // File doesn't exist yet
      }

      existingData.history.push(metrics);

      // Keep only last 50 entries
      if (existingData.history.length > 50) {
        existingData.history = existingData.history.slice(-50);
      }

      // Set baseline if not exists
      if (!existingData.baseline) {
        existingData.baseline = metrics;
      }

      await fs.writeFile(this.metricsFile, JSON.stringify(existingData, null, 2));
      console.log('📊 Metrics saved to .performance-metrics.json');
    } catch (error) {
      console.error('Failed to save metrics:', error);
    }
  }

  async generateReport(): Promise<PerformanceReport> {
    try {
      const data = await fs.readFile(this.metricsFile, 'utf-8');
      const { history, baseline } = JSON.parse(data);

      if (!history.length) {
        throw new Error('No metrics data available');
      }

      const current = history[history.length - 1];
      const baselineMetrics = baseline || history[0];

      const report: PerformanceReport = {
        baseline: baselineMetrics,
        current,
        improvements: {
          buildTime: ((baselineMetrics.buildTime - current.buildTime) / baselineMetrics.buildTime) * 100,
          typeErrors: baselineMetrics.typeErrorCount - current.typeErrorCount,
          bundleSize: ((baselineMetrics.bundleSize - current.bundleSize) / baselineMetrics.bundleSize) * 100,
          memoryUsage: ((baselineMetrics.memoryUsage - current.memoryUsage) / baselineMetrics.memoryUsage) * 100
        },
        recommendations: []
      };

      // Generate recommendations
      if (current.buildTime > 15) {
        report.recommendations.push('⚠️ Build time exceeds 15s target - consider optimizing webpack configuration');
      }

      if (current.typeErrorCount > 0) {
        report.recommendations.push(`🔧 Fix ${current.typeErrorCount} TypeScript errors to improve build performance`);
      }

      if (current.bundleSize > 150000) { // 150MB
        report.recommendations.push('📦 Bundle size exceeds 150MB - enable code splitting and tree shaking');
      }

      if (current.memoryUsage > 1000) { // 1GB
        report.recommendations.push('💾 High memory usage detected - consider memory optimization');
      }

      return report;
    } catch (error) {
      console.error('Failed to generate report:', error);
      throw error;
    }
  }

  async printReport(): Promise<void> {
    try {
      const report = await this.generateReport();

      console.log('\n' + '='.repeat(60));
      console.log('📈 PERFORMANCE MONITORING REPORT - PHASE 1');
      console.log('='.repeat(60));

      console.log('\n📊 Current Metrics:');
      console.log(`  Build Time: ${report.current.buildTime.toFixed(2)}s`);
      console.log(`  TypeScript Errors: ${report.current.typeErrorCount}`);
      console.log(`  Bundle Size: ${(report.current.bundleSize / 1024).toFixed(2)}MB`);
      console.log(`  Memory Usage: ${report.current.memoryUsage.toFixed(2)}MB`);
      console.log(`  Routes: ${report.current.routeCount}`);

      console.log('\n📉 Improvements from Baseline:');
      console.log(`  Build Time: ${report.improvements.buildTime > 0 ? '+' : ''}${report.improvements.buildTime.toFixed(1)}%`);
      console.log(`  TypeScript Errors: ${report.improvements.typeErrors > 0 ? '-' : '+'}${Math.abs(report.improvements.typeErrors)}`);
      console.log(`  Bundle Size: ${report.improvements.bundleSize > 0 ? '-' : '+'}${Math.abs(report.improvements.bundleSize).toFixed(1)}%`);
      console.log(`  Memory Usage: ${report.improvements.memoryUsage > 0 ? '-' : '+'}${Math.abs(report.improvements.memoryUsage).toFixed(1)}%`);

      if (report.recommendations.length > 0) {
        console.log('\n💡 Recommendations:');
        report.recommendations.forEach(rec => console.log(`  ${rec}`));
      }

      console.log('\n' + '='.repeat(60));
      console.log('💰 Projected Annual Value: £157,000');
      console.log('🎯 Phase 1 Target: <15s build time with 0 TypeScript errors');
      console.log('='.repeat(60) + '\n');

    } catch (error) {
      console.error('Could not print report:', error.message);
    }
  }
}

// CLI execution
async function main() {
  const tracker = new PerformanceTracker();
  const command = process.argv[2];

  switch (command) {
    case 'track':
      await tracker.trackBuild();
      await tracker.printReport();
      break;

    case 'report':
      await tracker.printReport();
      break;

    case 'analyze':
      console.log('Running bundle analyzer...');
      await execAsync('ANALYZE=true npm run build');
      console.log('Bundle analyzer report generated');
      break;

    default:
      console.log('Performance Tracking Tool - Phase 1 Monitoring');
      console.log('\nUsage:');
      console.log('  npx tsx scripts/track-performance.ts track    - Track build and show report');
      console.log('  npx tsx scripts/track-performance.ts report   - Show latest report');
      console.log('  npx tsx scripts/track-performance.ts analyze  - Run bundle analyzer');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { PerformanceTracker, BuildMetrics, PerformanceReport };