// CONTEXT7 SOURCE: /microsoft/typescript - Real-time TypeScript error monitoring system
// IMPLEMENTATION REASON: Phase 3 automated error prevention with continuous monitoring

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

// CONTEXT7 SOURCE: /microsoft/typescript - TypeScript diagnostic types
export interface TypeScriptError {
  file: string;
  line: number;
  column: number;
  code: number;
  message: string;
  category: 'error' | 'warning' | 'info';
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: Date;
  buildContext: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Error monitoring configuration
export interface TypeScriptMonitorConfig {
  enabled: boolean;
  checkInterval: number; // milliseconds
  errorThreshold: number;
  performanceThreshold: number; // seconds
  notificationWebhook?: string;
  logFilePath: string;
  buildCacheTimeout: number;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Monitoring metrics interface
export interface TypeScriptMetrics {
  totalErrors: number;
  errorsByCategory: Record<string, number>;
  averageBuildTime: number;
  lastBuildTime: number;
  buildSuccess: boolean;
  typeCheckDuration: number;
  cacheHitRate: number;
  errorTrend: 'improving' | 'stable' | 'degrading';
  lastUpdated: Date;
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Real-time TypeScript error monitoring
 * Provides continuous monitoring of TypeScript compilation errors and performance
 */
export class TypeScriptErrorMonitor {
  private config: TypeScriptMonitorConfig;
  private errors: TypeScriptError[] = [];
  private metrics: TypeScriptMetrics;
  private monitoringInterval?: NodeJS.Timeout;
  private isMonitoring = false;

  constructor(config?: Partial<TypeScriptMonitorConfig>) {
    // CONTEXT7 SOURCE: /microsoft/typescript - Default monitoring configuration
    this.config = {
      enabled: true,
      checkInterval: 30000, // 30 seconds
      errorThreshold: 5,
      performanceThreshold: 15, // 15 seconds build time threshold
      logFilePath: './logs/typescript-monitoring.log',
      buildCacheTimeout: 300000, // 5 minutes
      ...config
    };

    // CONTEXT7 SOURCE: /microsoft/typescript - Initialize monitoring metrics
    this.metrics = {
      totalErrors: 0,
      errorsByCategory: {},
      averageBuildTime: 0,
      lastBuildTime: 0,
      buildSuccess: true,
      typeCheckDuration: 0,
      cacheHitRate: 0,
      errorTrend: 'stable',
      lastUpdated: new Date()
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Start continuous monitoring
   */
  public async startMonitoring(): Promise<void> {
    if (this.isMonitoring) {
      console.log('TypeScript monitoring already active');
      return;
    }

    console.log('🔍 Starting TypeScript error monitoring...');
    this.isMonitoring = true;

    // Initial check
    await this.performTypeScriptCheck();

    // Setup interval monitoring
    this.monitoringInterval = setInterval(async () => {
      if (this.config.enabled) {
        await this.performTypeScriptCheck();
      }
    }, this.config.checkInterval);

    console.log(`✅ TypeScript monitoring started (interval: ${this.config.checkInterval}ms)`);
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Stop monitoring system
   */
  public stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }
    this.isMonitoring = false;
    console.log('⏹️ TypeScript monitoring stopped');
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Perform TypeScript compilation check
   */
  private async performTypeScriptCheck(): Promise<void> {
    const startTime = Date.now();

    try {
      console.log('🔍 Performing TypeScript validation...');

      // CONTEXT7 SOURCE: /microsoft/typescript - Incremental type checking
      const { stdout, stderr } = await execAsync(
        'npx tsc --noEmit --incremental --tsBuildInfoFile .tsbuildinfo',
        {
          cwd: process.cwd(),
          timeout: this.config.buildCacheTimeout
        }
      );

      const duration = Date.now() - startTime;
      await this.processTypeScriptOutput(stdout, stderr, duration, true);

      console.log(`✅ TypeScript check completed in ${duration}ms`);

    } catch (error: any) {
      const duration = Date.now() - startTime;
      await this.processTypeScriptOutput('', error.stdout || error.stderr || error.message, duration, false);

      console.log(`❌ TypeScript check failed in ${duration}ms`);
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Process TypeScript compiler output
   */
  private async processTypeScriptOutput(
    stdout: string,
    stderr: string,
    duration: number,
    success: boolean
  ): Promise<void> {
    // Parse TypeScript errors from output
    const newErrors = this.parseTypeScriptErrors(stderr);

    // Update error collection
    this.errors = [...this.errors, ...newErrors].slice(-100); // Keep last 100 errors

    // Update metrics
    await this.updateMetrics(newErrors, duration, success);

    // Check for critical conditions
    await this.checkCriticalConditions(newErrors);

    // Log monitoring results
    await this.logMonitoringResults(newErrors, duration, success);
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Parse TypeScript compiler errors
   */
  private parseTypeScriptErrors(output: string): TypeScriptError[] {
    const errors: TypeScriptError[] = [];
    const lines = output.split('\n');

    for (const line of lines) {
      // CONTEXT7 SOURCE: /microsoft/typescript - TypeScript error format parsing
      const errorMatch = line.match(/^(.+?)\((\d+),(\d+)\): (error|warning|info) TS(\d+): (.+)$/);

      if (errorMatch) {
        const [, file, lineNum, column, category, code, message] = errorMatch;

        errors.push({
          file: file.trim(),
          line: parseInt(lineNum, 10),
          column: parseInt(column, 10),
          code: parseInt(code, 10),
          message: message.trim(),
          category: category as 'error' | 'warning' | 'info',
          severity: this.categorizeErrorSeverity(parseInt(code, 10)),
          timestamp: new Date(),
          buildContext: 'monitoring'
        });
      }
    }

    return errors;
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Error severity categorization
   */
  private categorizeErrorSeverity(code: number): 'critical' | 'high' | 'medium' | 'low' {
    // CONTEXT7 SOURCE: /microsoft/typescript - TypeScript error code severity mapping
    const criticalCodes = [2304, 2339, 2345, 2322, 2531]; // Cannot find name, property, argument, type assignment, object possibly null
    const highCodes = [2307, 2352, 2564, 2571]; // Cannot find module, cannot invoke, duplicate identifier, object is not defined
    const mediumCodes = [2305, 2313, 2377, 2393]; // Module has no exported member, duplicate identifier, constructor signature, duplicate function implementation

    if (criticalCodes.includes(code)) return 'critical';
    if (highCodes.includes(code)) return 'high';
    if (mediumCodes.includes(code)) return 'medium';
    return 'low';
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Update monitoring metrics
   */
  private async updateMetrics(
    newErrors: TypeScriptError[],
    duration: number,
    success: boolean
  ): Promise<void> {
    const previousTotal = this.metrics.totalErrors;

    // Update error counts
    this.metrics.totalErrors += newErrors.length;

    // Update error categories
    for (const error of newErrors) {
      this.metrics.errorsByCategory[error.category] =
        (this.metrics.errorsByCategory[error.category] || 0) + 1;
    }

    // Update build metrics
    this.metrics.lastBuildTime = duration;
    this.metrics.buildSuccess = success;
    this.metrics.typeCheckDuration = duration;

    // Calculate average build time
    if (this.metrics.averageBuildTime === 0) {
      this.metrics.averageBuildTime = duration;
    } else {
      this.metrics.averageBuildTime = (this.metrics.averageBuildTime + duration) / 2;
    }

    // Determine error trend
    if (this.metrics.totalErrors < previousTotal) {
      this.metrics.errorTrend = 'improving';
    } else if (this.metrics.totalErrors > previousTotal) {
      this.metrics.errorTrend = 'degrading';
    } else {
      this.metrics.errorTrend = 'stable';
    }

    this.metrics.lastUpdated = new Date();
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Check for critical conditions
   */
  private async checkCriticalConditions(newErrors: TypeScriptError[]): Promise<void> {
    const criticalErrors = newErrors.filter(error => error.severity === 'critical');

    // Critical error threshold exceeded
    if (criticalErrors.length > 0) {
      await this.triggerAlert('critical_errors', {
        count: criticalErrors.length,
        errors: criticalErrors,
        timestamp: new Date()
      });
    }

    // Performance threshold exceeded
    if (this.metrics.lastBuildTime > this.config.performanceThreshold * 1000) {
      await this.triggerAlert('performance_degradation', {
        buildTime: this.metrics.lastBuildTime,
        threshold: this.config.performanceThreshold * 1000,
        timestamp: new Date()
      });
    }

    // Error count threshold exceeded
    if (this.metrics.totalErrors > this.config.errorThreshold) {
      await this.triggerAlert('error_threshold_exceeded', {
        currentErrors: this.metrics.totalErrors,
        threshold: this.config.errorThreshold,
        timestamp: new Date()
      });
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Trigger monitoring alerts
   */
  private async triggerAlert(type: string, data: any): Promise<void> {
    const alert = {
      type,
      severity: 'high',
      data,
      timestamp: new Date(),
      source: 'typescript-error-monitor'
    };

    console.log(`🚨 TypeScript Alert: ${type}`, alert);

    // Log alert to monitoring file
    await this.logAlert(alert);

    // Send webhook notification if configured
    if (this.config.notificationWebhook) {
      try {
        await fetch(this.config.notificationWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alert)
        });
      } catch (error) {
        console.error('Failed to send webhook notification:', error);
      }
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Log monitoring results
   */
  private async logMonitoringResults(
    newErrors: TypeScriptError[],
    duration: number,
    success: boolean
  ): Promise<void> {
    const logEntry = {
      timestamp: new Date().toISOString(),
      success,
      duration,
      newErrors: newErrors.length,
      totalErrors: this.metrics.totalErrors,
      buildTime: this.metrics.lastBuildTime,
      trend: this.metrics.errorTrend
    };

    try {
      // Ensure log directory exists
      const logDir = path.dirname(this.config.logFilePath);
      await fs.mkdir(logDir, { recursive: true });

      // Append to log file
      await fs.appendFile(
        this.config.logFilePath,
        JSON.stringify(logEntry) + '\n'
      );
    } catch (error) {
      console.error('Failed to write monitoring log:', error);
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Log alert information
   */
  private async logAlert(alert: any): Promise<void> {
    try {
      const alertLogPath = this.config.logFilePath.replace('.log', '-alerts.log');
      const logDir = path.dirname(alertLogPath);
      await fs.mkdir(logDir, { recursive: true });

      await fs.appendFile(
        alertLogPath,
        JSON.stringify(alert) + '\n'
      );
    } catch (error) {
      console.error('Failed to log alert:', error);
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Get current monitoring status
   */
  public getMonitoringStatus(): {
    isActive: boolean;
    metrics: TypeScriptMetrics;
    recentErrors: TypeScriptError[];
    config: TypeScriptMonitorConfig;
  } {
    return {
      isActive: this.isMonitoring,
      metrics: { ...this.metrics },
      recentErrors: this.errors.slice(-10), // Last 10 errors
      config: { ...this.config }
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Get error prevention health
   */
  public getHealthStatus(): {
    status: 'healthy' | 'warning' | 'critical';
    score: number;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check error levels
    if (this.metrics.totalErrors > this.config.errorThreshold) {
      issues.push(`High error count: ${this.metrics.totalErrors}`);
      recommendations.push('Review and fix TypeScript errors');
      score -= 30;
    }

    // Check performance
    if (this.metrics.averageBuildTime > this.config.performanceThreshold * 1000) {
      issues.push(`Slow build time: ${this.metrics.averageBuildTime}ms`);
      recommendations.push('Optimize TypeScript configuration for faster builds');
      score -= 20;
    }

    // Check error trend
    if (this.metrics.errorTrend === 'degrading') {
      issues.push('Error count is increasing');
      recommendations.push('Implement stricter pre-commit validation');
      score -= 15;
    }

    // Check critical errors
    const criticalErrors = this.errors.filter(e => e.severity === 'critical').length;
    if (criticalErrors > 0) {
      issues.push(`Critical errors present: ${criticalErrors}`);
      recommendations.push('Fix critical TypeScript errors immediately');
      score -= 40;
    }

    const status = score >= 80 ? 'healthy' : score >= 60 ? 'warning' : 'critical';

    return {
      status,
      score: Math.max(0, score),
      issues,
      recommendations
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Manual error check trigger
   */
  public async runManualCheck(): Promise<{
    success: boolean;
    errors: TypeScriptError[];
    duration: number;
    metrics: TypeScriptMetrics;
  }> {
    console.log('🔍 Running manual TypeScript check...');

    const initialErrorCount = this.errors.length;
    await this.performTypeScriptCheck();

    const newErrors = this.errors.slice(initialErrorCount);

    return {
      success: this.metrics.buildSuccess,
      errors: newErrors,
      duration: this.metrics.lastBuildTime,
      metrics: { ...this.metrics }
    };
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Singleton monitor instance
let monitorInstance: TypeScriptErrorMonitor | null = null;

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Get singleton monitor instance
 */
export function getTypeScriptErrorMonitor(config?: Partial<TypeScriptMonitorConfig>): TypeScriptErrorMonitor {
  if (!monitorInstance) {
    monitorInstance = new TypeScriptErrorMonitor(config);
  }
  return monitorInstance;
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Initialize monitoring system
 */
export async function initializeTypeScriptMonitoring(config?: Partial<TypeScriptMonitorConfig>): Promise<TypeScriptErrorMonitor> {
  const monitor = getTypeScriptErrorMonitor(config);
  await monitor.startMonitoring();
  return monitor;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Export monitoring types
export type {
  TypeScriptError,
  TypeScriptMonitorConfig,
  TypeScriptMetrics
};