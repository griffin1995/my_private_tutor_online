// CONTEXT7 SOURCE: /microsoft/typescript - Performance regression detection and build monitoring
// IMPLEMENTATION REASON: Phase 3 automated error prevention with comprehensive performance monitoring

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

// CONTEXT7 SOURCE: /microsoft/typescript - Performance benchmark interfaces
export interface PerformanceBenchmark {
  timestamp: Date;
  buildTime: number;
  typeCheckTime: number;
  bundleSize: number;
  memoryUsage: number;
  cpuUsage: number;
  cacheHitRate: number;
  incrementalBuildTime?: number;
  fullBuildTime?: number;
  commit?: string;
  branch?: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Regression detection configuration
export interface RegressionDetectorConfig {
  enabled: boolean;
  benchmarkInterval: number; // milliseconds
  regressionThreshold: {
    buildTime: number; // percentage increase
    typeCheckTime: number;
    bundleSize: number;
    memoryUsage: number;
  };
  alertThreshold: {
    consecutiveRegressions: number;
    severityMultiplier: number;
  };
  historicalDataPoints: number;
  logFilePath: string;
  notificationWebhook?: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Regression analysis result
export interface RegressionAnalysis {
  hasRegression: boolean;
  regressionType: 'none' | 'minor' | 'major' | 'critical';
  metrics: {
    buildTime: RegressionMetric;
    typeCheckTime: RegressionMetric;
    bundleSize: RegressionMetric;
    memoryUsage: RegressionMetric;
  };
  overallScore: number;
  recommendations: string[];
  alertLevel: 'info' | 'warning' | 'critical';
}

// CONTEXT7 SOURCE: /microsoft/typescript - Individual metric regression data
export interface RegressionMetric {
  current: number;
  baseline: number;
  change: number; // percentage
  status: 'improved' | 'stable' | 'regressed';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// CONTEXT7 SOURCE: /microsoft/typescript - Build monitoring data
export interface BuildMonitoringData {
  buildId: string;
  timestamp: Date;
  success: boolean;
  duration: number;
  stages: BuildStage[];
  errors: BuildError[];
  warnings: BuildWarning[];
  metrics: BuildMetrics;
  environment: BuildEnvironment;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Build stage information
export interface BuildStage {
  name: string;
  startTime: number;
  endTime: number;
  duration: number;
  success: boolean;
  errors: string[];
  outputs: string[];
}

// CONTEXT7 SOURCE: /microsoft/typescript - Build error details
export interface BuildError {
  type: 'typescript' | 'webpack' | 'next' | 'system';
  code?: string | number;
  message: string;
  file?: string;
  line?: number;
  column?: number;
  severity: 'error' | 'warning';
}

// CONTEXT7 SOURCE: /microsoft/typescript - Build warning details
export interface BuildWarning {
  type: string;
  message: string;
  file?: string;
  suggestion?: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Build metrics
export interface BuildMetrics {
  totalFiles: number;
  typescriptFiles: number;
  processedFiles: number;
  cacheHits: number;
  cacheMisses: number;
  memoryPeak: number;
  cpuAverage: number;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Build environment
export interface BuildEnvironment {
  nodeVersion: string;
  npmVersion: string;
  typescriptVersion: string;
  nextVersion: string;
  os: string;
  arch: string;
  ci: boolean;
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Performance regression detection system
 * Monitors build performance and detects regressions automatically
 */
export class PerformanceRegressionDetector {
  private config: RegressionDetectorConfig;
  private benchmarks: PerformanceBenchmark[] = [];
  private buildHistory: BuildMonitoringData[] = [];
  private isMonitoring = false;
  private monitoringInterval?: NodeJS.Timeout;

  constructor(config?: Partial<RegressionDetectorConfig>) {
    // CONTEXT7 SOURCE: /microsoft/typescript - Default regression detection configuration
    this.config = {
      enabled: true,
      benchmarkInterval: 300000, // 5 minutes
      regressionThreshold: {
        buildTime: 20, // 20% increase
        typeCheckTime: 25, // 25% increase
        bundleSize: 10, // 10% increase
        memoryUsage: 30 // 30% increase
      },
      alertThreshold: {
        consecutiveRegressions: 3,
        severityMultiplier: 1.5
      },
      historicalDataPoints: 100,
      logFilePath: './logs/performance-regression.log',
      ...config
    };

    this.loadHistoricalData();
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Start performance monitoring
   */
  public async startMonitoring(): Promise<void> {
    if (this.isMonitoring) {
      console.log('Performance regression monitoring already active');
      return;
    }

    console.log('🔍 Starting performance regression monitoring...');
    this.isMonitoring = true;

    // Initial benchmark
    await this.runPerformanceBenchmark();

    // Setup interval monitoring
    this.monitoringInterval = setInterval(async () => {
      if (this.config.enabled) {
        await this.runPerformanceBenchmark();
      }
    }, this.config.benchmarkInterval);

    console.log(`✅ Performance monitoring started (interval: ${this.config.benchmarkInterval}ms)`);
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Stop performance monitoring
   */
  public stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }
    this.isMonitoring = false;
    console.log('⏹️ Performance regression monitoring stopped');
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Run comprehensive performance benchmark
   */
  public async runPerformanceBenchmark(): Promise<PerformanceBenchmark> {
    console.log('📊 Running performance benchmark...');

    const startTime = Date.now();
    let buildTime = 0;
    let typeCheckTime = 0;
    let bundleSize = 0;
    let incrementalBuildTime = 0;
    let fullBuildTime = 0;

    try {
      // Measure TypeScript type checking time
      const typeCheckStart = Date.now();
      await execAsync('npx tsc --noEmit --incremental', { timeout: 120000 });
      typeCheckTime = Date.now() - typeCheckStart;

      // Measure incremental build time
      const incrementalStart = Date.now();
      await execAsync('npm run build:fast', { timeout: 180000 });
      incrementalBuildTime = Date.now() - incrementalStart;
      buildTime = incrementalBuildTime;

      // Measure full build time (clean build)
      await execAsync('npm run clean:full', { timeout: 60000 });
      const fullBuildStart = Date.now();
      await execAsync('npm run build:fast', { timeout: 300000 });
      fullBuildTime = Date.now() - fullBuildStart;

      // Get bundle size
      bundleSize = await this.getBundleSize();

    } catch (error: any) {
      console.error('Performance benchmark failed:', error.message);
      buildTime = Date.now() - startTime; // Use total time as fallback
    }

    // Get system metrics
    const systemMetrics = await this.getSystemMetrics();

    // Get Git information
    const gitInfo = await this.getGitInfo();

    const benchmark: PerformanceBenchmark = {
      timestamp: new Date(),
      buildTime,
      typeCheckTime,
      bundleSize,
      memoryUsage: systemMetrics.memoryUsage,
      cpuUsage: systemMetrics.cpuUsage,
      cacheHitRate: systemMetrics.cacheHitRate,
      incrementalBuildTime,
      fullBuildTime,
      commit: gitInfo.commit,
      branch: gitInfo.branch
    };

    // Add to benchmarks
    this.benchmarks.push(benchmark);

    // Keep only recent benchmarks
    this.benchmarks = this.benchmarks.slice(-this.config.historicalDataPoints);

    // Analyze for regressions
    const analysis = this.analyzeRegression(benchmark);

    // Log benchmark and analysis
    await this.logBenchmark(benchmark, analysis);

    // Send alerts if needed
    if (analysis.hasRegression && analysis.alertLevel !== 'info') {
      await this.sendRegressionAlert(benchmark, analysis);
    }

    console.log(`✅ Performance benchmark completed in ${Date.now() - startTime}ms`);
    return benchmark;
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Monitor specific build
   */
  public async monitorBuild(buildCommand: string): Promise<BuildMonitoringData> {
    const buildId = `build-${Date.now()}`;
    const startTime = Date.now();

    console.log(`🔧 Monitoring build: ${buildCommand}`);

    const buildData: BuildMonitoringData = {
      buildId,
      timestamp: new Date(),
      success: false,
      duration: 0,
      stages: [],
      errors: [],
      warnings: [],
      metrics: {
        totalFiles: 0,
        typescriptFiles: 0,
        processedFiles: 0,
        cacheHits: 0,
        cacheMisses: 0,
        memoryPeak: 0,
        cpuAverage: 0
      },
      environment: await this.getBuildEnvironment()
    };

    try {
      // Monitor TypeScript compilation stage
      const tsStageStart = Date.now();
      try {
        const { stdout: tsOutput, stderr: tsErrors } = await execAsync(
          'npx tsc --noEmit --listFiles --extendedDiagnostics',
          { timeout: 120000 }
        );

        buildData.stages.push({
          name: 'TypeScript Compilation',
          startTime: tsStageStart,
          endTime: Date.now(),
          duration: Date.now() - tsStageStart,
          success: true,
          errors: [],
          outputs: [tsOutput]
        });

        // Parse TypeScript metrics
        buildData.metrics = this.parseTypeScriptMetrics(tsOutput);

      } catch (tsError: any) {
        buildData.stages.push({
          name: 'TypeScript Compilation',
          startTime: tsStageStart,
          endTime: Date.now(),
          duration: Date.now() - tsStageStart,
          success: false,
          errors: [tsError.message],
          outputs: []
        });

        buildData.errors.push(...this.parseTypeScriptErrors(tsError.stdout || tsError.stderr || ''));
      }

      // Monitor Next.js build stage
      const nextStageStart = Date.now();
      try {
        const { stdout: nextOutput, stderr: nextErrors } = await execAsync(
          buildCommand,
          { timeout: 300000 }
        );

        buildData.stages.push({
          name: 'Next.js Build',
          startTime: nextStageStart,
          endTime: Date.now(),
          duration: Date.now() - nextStageStart,
          success: true,
          errors: [],
          outputs: [nextOutput]
        });

        buildData.success = true;

      } catch (nextError: any) {
        buildData.stages.push({
          name: 'Next.js Build',
          startTime: nextStageStart,
          endTime: Date.now(),
          duration: Date.now() - nextStageStart,
          success: false,
          errors: [nextError.message],
          outputs: []
        });

        buildData.errors.push(...this.parseNextjsErrors(nextError.stdout || nextError.stderr || ''));
      }

      buildData.duration = Date.now() - startTime;

      // Add to build history
      this.buildHistory.push(buildData);
      this.buildHistory = this.buildHistory.slice(-50); // Keep last 50 builds

      return buildData;

    } catch (error: any) {
      buildData.duration = Date.now() - startTime;
      buildData.errors.push({
        type: 'system',
        message: error.message,
        severity: 'error'
      });

      return buildData;
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Analyze performance regression
   */
  private analyzeRegression(current: PerformanceBenchmark): RegressionAnalysis {
    if (this.benchmarks.length < 5) {
      // Not enough data for meaningful analysis
      return {
        hasRegression: false,
        regressionType: 'none',
        metrics: {
          buildTime: this.createMetric(current.buildTime, current.buildTime, 0, 'stable'),
          typeCheckTime: this.createMetric(current.typeCheckTime, current.typeCheckTime, 0, 'stable'),
          bundleSize: this.createMetric(current.bundleSize, current.bundleSize, 0, 'stable'),
          memoryUsage: this.createMetric(current.memoryUsage, current.memoryUsage, 0, 'stable')
        },
        overallScore: 100,
        recommendations: [],
        alertLevel: 'info'
      };
    }

    // Calculate baseline from recent data (excluding current)
    const recentBenchmarks = this.benchmarks.slice(-10, -1);
    const baseline = this.calculateBaseline(recentBenchmarks);

    // Analyze each metric
    const buildTimeMetric = this.analyzeMetric(
      current.buildTime,
      baseline.buildTime,
      this.config.regressionThreshold.buildTime
    );

    const typeCheckMetric = this.analyzeMetric(
      current.typeCheckTime,
      baseline.typeCheckTime,
      this.config.regressionThreshold.typeCheckTime
    );

    const bundleSizeMetric = this.analyzeMetric(
      current.bundleSize,
      baseline.bundleSize,
      this.config.regressionThreshold.bundleSize
    );

    const memoryMetric = this.analyzeMetric(
      current.memoryUsage,
      baseline.memoryUsage,
      this.config.regressionThreshold.memoryUsage
    );

    // Determine overall regression status
    const metrics = [buildTimeMetric, typeCheckMetric, bundleSizeMetric, memoryMetric];
    const regressionCount = metrics.filter(m => m.status === 'regressed').length;
    const criticalCount = metrics.filter(m => m.severity === 'critical').length;
    const highCount = metrics.filter(m => m.severity === 'high').length;

    let regressionType: 'none' | 'minor' | 'major' | 'critical' = 'none';
    let alertLevel: 'info' | 'warning' | 'critical' = 'info';

    if (criticalCount > 0) {
      regressionType = 'critical';
      alertLevel = 'critical';
    } else if (highCount > 1 || regressionCount > 2) {
      regressionType = 'major';
      alertLevel = 'critical';
    } else if (regressionCount > 0) {
      regressionType = 'minor';
      alertLevel = 'warning';
    }

    // Calculate overall score
    const scores = metrics.map(m => this.getMetricScore(m));
    const overallScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    // Generate recommendations
    const recommendations = this.generateRecommendations(metrics);

    return {
      hasRegression: regressionCount > 0,
      regressionType,
      metrics: {
        buildTime: buildTimeMetric,
        typeCheckTime: typeCheckMetric,
        bundleSize: bundleSizeMetric,
        memoryUsage: memoryMetric
      },
      overallScore,
      recommendations,
      alertLevel
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Analyze individual metric
   */
  private analyzeMetric(current: number, baseline: number, threshold: number): RegressionMetric {
    const change = baseline > 0 ? ((current - baseline) / baseline) * 100 : 0;

    let status: 'improved' | 'stable' | 'regressed' = 'stable';
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

    if (change > threshold) {
      status = 'regressed';
      if (change > threshold * 2) {
        severity = 'critical';
      } else if (change > threshold * 1.5) {
        severity = 'high';
      } else {
        severity = 'medium';
      }
    } else if (change < -threshold / 2) {
      status = 'improved';
    }

    return {
      current,
      baseline,
      change,
      status,
      severity
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Create metric helper
   */
  private createMetric(
    current: number,
    baseline: number,
    change: number,
    status: 'improved' | 'stable' | 'regressed'
  ): RegressionMetric {
    return {
      current,
      baseline,
      change,
      status,
      severity: 'low'
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Calculate baseline metrics
   */
  private calculateBaseline(benchmarks: PerformanceBenchmark[]) {
    const sum = benchmarks.reduce(
      (acc, b) => ({
        buildTime: acc.buildTime + b.buildTime,
        typeCheckTime: acc.typeCheckTime + b.typeCheckTime,
        bundleSize: acc.bundleSize + b.bundleSize,
        memoryUsage: acc.memoryUsage + b.memoryUsage
      }),
      { buildTime: 0, typeCheckTime: 0, bundleSize: 0, memoryUsage: 0 }
    );

    const count = benchmarks.length;
    return {
      buildTime: sum.buildTime / count,
      typeCheckTime: sum.typeCheckTime / count,
      bundleSize: sum.bundleSize / count,
      memoryUsage: sum.memoryUsage / count
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Get metric score
   */
  private getMetricScore(metric: RegressionMetric): number {
    if (metric.status === 'improved') return 110;
    if (metric.status === 'stable') return 100;

    // Regression scoring
    switch (metric.severity) {
      case 'critical': return 40;
      case 'high': return 60;
      case 'medium': return 75;
      case 'low': return 85;
      default: return 100;
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Generate performance recommendations
   */
  private generateRecommendations(metrics: RegressionMetric[]): string[] {
    const recommendations: string[] = [];

    const [buildTime, typeCheck, bundleSize, memory] = metrics;

    if (buildTime.status === 'regressed') {
      recommendations.push('Optimize build configuration and enable incremental compilation');
      if (buildTime.severity === 'critical') {
        recommendations.push('Consider build parallelization and cache optimization');
      }
    }

    if (typeCheck.status === 'regressed') {
      recommendations.push('Review TypeScript configuration for performance optimizations');
      recommendations.push('Enable skipLibCheck and skipDefaultLibCheck for faster compilation');
    }

    if (bundleSize.status === 'regressed') {
      recommendations.push('Analyze bundle composition and implement code splitting');
      recommendations.push('Review dependencies and remove unused packages');
    }

    if (memory.status === 'regressed') {
      recommendations.push('Monitor memory leaks in build process');
      recommendations.push('Consider increasing Node.js heap size for large projects');
    }

    return recommendations;
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Get bundle size
   */
  private async getBundleSize(): Promise<number> {
    try {
      const clientStatsPath = '.next/analyze/client.json';
      const exists = await fs.access(clientStatsPath).then(() => true).catch(() => false);

      if (exists) {
        const statsData = await fs.readFile(clientStatsPath, 'utf-8');
        const stats = JSON.parse(statsData);
        return stats.parsedSize || 0;
      }

      // Fallback: estimate from .next directory
      const nextDir = '.next';
      const nextExists = await fs.access(nextDir).then(() => true).catch(() => false);

      if (nextExists) {
        const stats = await fs.stat(nextDir);
        return stats.size || 0;
      }

      return 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Get system metrics
   */
  private async getSystemMetrics(): Promise<{
    memoryUsage: number;
    cpuUsage: number;
    cacheHitRate: number;
  }> {
    try {
      // Get memory usage
      const memoryUsage = process.memoryUsage().heapUsed;

      // Simple CPU usage approximation
      const cpuUsage = process.cpuUsage();
      const cpuPercent = (cpuUsage.user + cpuUsage.system) / 1000000; // Convert to percentage

      // Cache hit rate approximation (based on build artifacts)
      let cacheHitRate = 0;
      try {
        const tsBuildInfoExists = await fs.access('.tsbuildinfo').then(() => true).catch(() => false);
        const nextCacheExists = await fs.access('.next/cache').then(() => true).catch(() => false);
        cacheHitRate = (tsBuildInfoExists ? 50 : 0) + (nextCacheExists ? 50 : 0);
      } catch (error) {
        // Ignore cache check errors
      }

      return {
        memoryUsage,
        cpuUsage: cpuPercent,
        cacheHitRate
      };
    } catch (error) {
      return {
        memoryUsage: 0,
        cpuUsage: 0,
        cacheHitRate: 0
      };
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Get Git information
   */
  private async getGitInfo(): Promise<{ commit: string; branch: string }> {
    try {
      const { stdout: commit } = await execAsync('git rev-parse HEAD');
      const { stdout: branch } = await execAsync('git rev-parse --abbrev-ref HEAD');

      return {
        commit: commit.trim(),
        branch: branch.trim()
      };
    } catch (error) {
      return {
        commit: 'unknown',
        branch: 'unknown'
      };
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Get build environment information
   */
  private async getBuildEnvironment(): Promise<BuildEnvironment> {
    try {
      const { stdout: nodeVersion } = await execAsync('node --version');
      const { stdout: npmVersion } = await execAsync('npm --version');

      // Get package versions
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf-8'));
      const typescriptVersion = packageJson.devDependencies?.typescript || packageJson.dependencies?.typescript || 'unknown';
      const nextVersion = packageJson.dependencies?.next || 'unknown';

      return {
        nodeVersion: nodeVersion.trim(),
        npmVersion: npmVersion.trim(),
        typescriptVersion,
        nextVersion,
        os: process.platform,
        arch: process.arch,
        ci: !!process.env.CI
      };
    } catch (error) {
      return {
        nodeVersion: 'unknown',
        npmVersion: 'unknown',
        typescriptVersion: 'unknown',
        nextVersion: 'unknown',
        os: process.platform,
        arch: process.arch,
        ci: false
      };
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Parse TypeScript metrics
   */
  private parseTypeScriptMetrics(output: string): BuildMetrics {
    const metrics: BuildMetrics = {
      totalFiles: 0,
      typescriptFiles: 0,
      processedFiles: 0,
      cacheHits: 0,
      cacheMisses: 0,
      memoryPeak: 0,
      cpuAverage: 0
    };

    // Parse file counts from TypeScript output
    const fileLines = output.split('\n').filter(line => line.includes('.ts') || line.includes('.tsx'));
    metrics.typescriptFiles = fileLines.length;
    metrics.totalFiles = fileLines.length;
    metrics.processedFiles = fileLines.length;

    // Parse diagnostics information
    const diagnosticsMatch = output.match(/Files:\s+(\d+)/);
    if (diagnosticsMatch) {
      metrics.totalFiles = parseInt(diagnosticsMatch[1], 10);
    }

    return metrics;
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Parse TypeScript errors
   */
  private parseTypeScriptErrors(output: string): BuildError[] {
    const errors: BuildError[] = [];
    const lines = output.split('\n');

    for (const line of lines) {
      const errorMatch = line.match(/^(.+?)\((\d+),(\d+)\): (error|warning) TS(\d+): (.+)$/);
      if (errorMatch) {
        const [, file, lineNum, column, severity, code, message] = errorMatch;
        errors.push({
          type: 'typescript',
          code: parseInt(code, 10),
          message: message.trim(),
          file: file.trim(),
          line: parseInt(lineNum, 10),
          column: parseInt(column, 10),
          severity: severity as 'error' | 'warning'
        });
      }
    }

    return errors;
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Parse Next.js errors
   */
  private parseNextjsErrors(output: string): BuildError[] {
    const errors: BuildError[] = [];
    const lines = output.split('\n');

    for (const line of lines) {
      if (line.includes('error') || line.includes('Error')) {
        errors.push({
          type: 'next',
          message: line.trim(),
          severity: 'error'
        });
      }
    }

    return errors;
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Log benchmark results
   */
  private async logBenchmark(
    benchmark: PerformanceBenchmark,
    analysis: RegressionAnalysis
  ): Promise<void> {
    const logEntry = {
      timestamp: benchmark.timestamp.toISOString(),
      benchmark,
      analysis
    };

    try {
      const logDir = path.dirname(this.config.logFilePath);
      await fs.mkdir(logDir, { recursive: true });

      await fs.appendFile(
        this.config.logFilePath,
        JSON.stringify(logEntry) + '\n'
      );
    } catch (error) {
      console.error('Failed to log benchmark:', error);
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Send regression alert
   */
  private async sendRegressionAlert(
    benchmark: PerformanceBenchmark,
    analysis: RegressionAnalysis
  ): Promise<void> {
    const alert = {
      type: 'performance_regression',
      severity: analysis.alertLevel,
      timestamp: new Date().toISOString(),
      benchmark,
      analysis,
      message: `Performance regression detected: ${analysis.regressionType} (Score: ${analysis.overallScore.toFixed(1)})`
    };

    console.log(`🚨 Performance Regression Alert:`, alert);

    // Send webhook if configured
    if (this.config.notificationWebhook) {
      try {
        await fetch(this.config.notificationWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alert)
        });
      } catch (error) {
        console.error('Failed to send regression alert:', error);
      }
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Load historical benchmark data
   */
  private async loadHistoricalData(): Promise<void> {
    try {
      const exists = await fs.access(this.config.logFilePath).then(() => true).catch(() => false);
      if (!exists) return;

      const logData = await fs.readFile(this.config.logFilePath, 'utf-8');
      const lines = logData.trim().split('\n');

      this.benchmarks = lines
        .slice(-this.config.historicalDataPoints)
        .map(line => {
          try {
            const entry = JSON.parse(line);
            return entry.benchmark;
          } catch (error) {
            return null;
          }
        })
        .filter(Boolean);

      console.log(`📊 Loaded ${this.benchmarks.length} historical benchmarks`);
    } catch (error) {
      console.log('No historical benchmark data found');
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Get performance status
   */
  public getPerformanceStatus(): {
    isMonitoring: boolean;
    latestBenchmark?: PerformanceBenchmark;
    recentBenchmarks: PerformanceBenchmark[];
    buildHistory: BuildMonitoringData[];
    regressionSummary: {
      totalRegressions: number;
      criticalRegressions: number;
      recentTrend: 'improving' | 'stable' | 'degrading';
    };
  } {
    const recentAnalyses = this.benchmarks.slice(-10).map(b => this.analyzeRegression(b));
    const regressions = recentAnalyses.filter(a => a.hasRegression);
    const criticalRegressions = recentAnalyses.filter(a => a.regressionType === 'critical');

    let recentTrend: 'improving' | 'stable' | 'degrading' = 'stable';
    if (recentAnalyses.length >= 3) {
      const recentScores = recentAnalyses.slice(-3).map(a => a.overallScore);
      const avgRecent = recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length;
      const prevScores = recentAnalyses.slice(-6, -3).map(a => a.overallScore);

      if (prevScores.length > 0) {
        const avgPrev = prevScores.reduce((sum, score) => sum + score, 0) / prevScores.length;
        if (avgRecent > avgPrev + 5) recentTrend = 'improving';
        else if (avgRecent < avgPrev - 5) recentTrend = 'degrading';
      }
    }

    return {
      isMonitoring: this.isMonitoring,
      latestBenchmark: this.benchmarks[this.benchmarks.length - 1],
      recentBenchmarks: this.benchmarks.slice(-10),
      buildHistory: this.buildHistory.slice(-10),
      regressionSummary: {
        totalRegressions: regressions.length,
        criticalRegressions: criticalRegressions.length,
        recentTrend
      }
    };
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Export performance monitoring types
export type {
  PerformanceBenchmark,
  RegressionDetectorConfig,
  RegressionAnalysis,
  RegressionMetric,
  BuildMonitoringData,
  BuildStage,
  BuildError,
  BuildWarning,
  BuildMetrics,
  BuildEnvironment
};