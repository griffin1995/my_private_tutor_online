// CONTEXT7 SOURCE: /microsoft/typescript - Error prevention dashboard with comprehensive metrics
// IMPLEMENTATION REASON: Phase 3 automated error prevention with real-time monitoring dashboard

import { TypeScriptErrorMonitor, TypeScriptError, TypeScriptMetrics } from './typescript-error-monitor';
import { AutomatedRecoverySystem, RecoveryResult } from './automated-recovery';
import fs from 'fs/promises';
import path from 'path';

// CONTEXT7 SOURCE: /microsoft/typescript - Dashboard data interfaces
export interface DashboardMetrics {
  overview: OverviewMetrics;
  typeScript: TypeScriptDashboardData;
  performance: PerformanceMetrics;
  recovery: RecoveryMetrics;
  trends: TrendAnalysis;
  alerts: AlertSummary;
  health: HealthStatus;
  recommendations: Recommendation[];
}

// CONTEXT7 SOURCE: /microsoft/typescript - Overview metrics interface
export interface OverviewMetrics {
  totalErrors: number;
  criticalErrors: number;
  errorRate: number;
  buildSuccessRate: number;
  averageBuildTime: number;
  uptime: number;
  lastUpdate: Date;
  preventionEffectiveness: number; // percentage
}

// CONTEXT7 SOURCE: /microsoft/typescript - TypeScript dashboard data
export interface TypeScriptDashboardData {
  currentErrors: TypeScriptError[];
  errorsByCategory: Record<string, number>;
  errorsBySeverity: Record<string, number>;
  errorsByFile: Record<string, number>;
  buildMetrics: TypeScriptMetrics;
  compilationHistory: CompilationHistoryEntry[];
  typeCheckPerformance: PerformanceEntry[];
}

// CONTEXT7 SOURCE: /microsoft/typescript - Performance metrics interface
export interface PerformanceMetrics {
  buildTime: {
    current: number;
    average: number;
    trend: 'improving' | 'stable' | 'degrading';
    budget: number;
    budgetUtilization: number;
  };
  bundleSize: {
    current: number;
    trend: 'decreasing' | 'stable' | 'increasing';
    budget: number;
    budgetUtilization: number;
  };
  typeCheckDuration: {
    incremental: number;
    full: number;
    average: number;
  };
  cacheEfficiency: {
    hitRate: number;
    missRate: number;
    totalHits: number;
    totalMisses: number;
  };
}

// CONTEXT7 SOURCE: /microsoft/typescript - Recovery metrics
export interface RecoveryMetrics {
  totalRecoveries: number;
  successfulRecoveries: number;
  successRate: number;
  averageRecoveryTime: number;
  strategiesUsed: Record<string, number>;
  recentRecoveries: RecoveryResult[];
  manualInterventionsRequired: number;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Trend analysis interface
export interface TrendAnalysis {
  errorTrend: {
    direction: 'improving' | 'stable' | 'degrading';
    changeRate: number;
    projectedErrors: number;
  };
  performanceTrend: {
    buildTimeChange: number;
    efficiencyChange: number;
    prediction: 'improving' | 'stable' | 'degrading';
  };
  qualityTrend: {
    codeQualityScore: number;
    typesCoverage: number;
    maintainabilityIndex: number;
  };
}

// CONTEXT7 SOURCE: /microsoft/typescript - Alert summary
export interface AlertSummary {
  activeAlerts: Alert[];
  alertHistory: Alert[];
  alertsByType: Record<string, number>;
  criticalAlerts: number;
  warningAlerts: number;
  infoAlerts: number;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Health status interface
export interface HealthStatus {
  overall: 'healthy' | 'warning' | 'critical';
  score: number;
  components: {
    typescript: ComponentHealth;
    build: ComponentHealth;
    performance: ComponentHealth;
    recovery: ComponentHealth;
  };
  uptime: number;
  availability: number;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Component health
export interface ComponentHealth {
  status: 'healthy' | 'warning' | 'critical';
  score: number;
  issues: string[];
  lastCheck: Date;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Alert interface
export interface Alert {
  id: string;
  type: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  resolved: boolean;
  resolvedAt?: Date;
  data?: any;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Recommendation interface
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'performance' | 'quality' | 'maintenance' | 'security';
  impact: string;
  effort: 'low' | 'medium' | 'high';
  actionItems: string[];
}

// CONTEXT7 SOURCE: /microsoft/typescript - Supporting interfaces
export interface CompilationHistoryEntry {
  timestamp: Date;
  success: boolean;
  duration: number;
  errorCount: number;
  warnings: number;
}

export interface PerformanceEntry {
  timestamp: Date;
  operation: string;
  duration: number;
  success: boolean;
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Error prevention dashboard system
 * Provides comprehensive monitoring and analytics for TypeScript error prevention
 */
export class ErrorPreventionDashboard {
  private monitor: TypeScriptErrorMonitor;
  private recovery: AutomatedRecoverySystem;
  private dashboardData: DashboardMetrics;
  private alerts: Alert[] = [];
  private compilationHistory: CompilationHistoryEntry[] = [];
  private performanceHistory: PerformanceEntry[] = [];
  private startTime: Date;

  constructor(
    monitor: TypeScriptErrorMonitor,
    recovery: AutomatedRecoverySystem
  ) {
    this.monitor = monitor;
    this.recovery = recovery;
    this.startTime = new Date();

    // Initialize dashboard data
    this.dashboardData = this.initializeDashboardData();

    // Start periodic updates
    this.startPeriodicUpdates();
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Initialize dashboard data structure
   */
  private initializeDashboardData(): DashboardMetrics {
    return {
      overview: {
        totalErrors: 0,
        criticalErrors: 0,
        errorRate: 0,
        buildSuccessRate: 100,
        averageBuildTime: 0,
        uptime: 0,
        lastUpdate: new Date(),
        preventionEffectiveness: 95
      },
      typeScript: {
        currentErrors: [],
        errorsByCategory: {},
        errorsBySeverity: {},
        errorsByFile: {},
        buildMetrics: {
          totalErrors: 0,
          errorsByCategory: {},
          averageBuildTime: 0,
          lastBuildTime: 0,
          buildSuccess: true,
          typeCheckDuration: 0,
          cacheHitRate: 0,
          errorTrend: 'stable',
          lastUpdated: new Date()
        },
        compilationHistory: [],
        typeCheckPerformance: []
      },
      performance: {
        buildTime: {
          current: 0,
          average: 0,
          trend: 'stable',
          budget: 15000, // 15 seconds
          budgetUtilization: 0
        },
        bundleSize: {
          current: 0,
          trend: 'stable',
          budget: 153600, // 150KB
          budgetUtilization: 0
        },
        typeCheckDuration: {
          incremental: 0,
          full: 0,
          average: 0
        },
        cacheEfficiency: {
          hitRate: 0,
          missRate: 0,
          totalHits: 0,
          totalMisses: 0
        }
      },
      recovery: {
        totalRecoveries: 0,
        successfulRecoveries: 0,
        successRate: 0,
        averageRecoveryTime: 0,
        strategiesUsed: {},
        recentRecoveries: [],
        manualInterventionsRequired: 0
      },
      trends: {
        errorTrend: {
          direction: 'stable',
          changeRate: 0,
          projectedErrors: 0
        },
        performanceTrend: {
          buildTimeChange: 0,
          efficiencyChange: 0,
          prediction: 'stable'
        },
        qualityTrend: {
          codeQualityScore: 85,
          typesCoverage: 95,
          maintainabilityIndex: 80
        }
      },
      alerts: {
        activeAlerts: [],
        alertHistory: [],
        alertsByType: {},
        criticalAlerts: 0,
        warningAlerts: 0,
        infoAlerts: 0
      },
      health: {
        overall: 'healthy',
        score: 95,
        components: {
          typescript: {
            status: 'healthy',
            score: 95,
            issues: [],
            lastCheck: new Date()
          },
          build: {
            status: 'healthy',
            score: 95,
            issues: [],
            lastCheck: new Date()
          },
          performance: {
            status: 'healthy',
            score: 95,
            issues: [],
            lastCheck: new Date()
          },
          recovery: {
            status: 'healthy',
            score: 95,
            issues: [],
            lastCheck: new Date()
          }
        },
        uptime: 0,
        availability: 100
      },
      recommendations: []
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Start periodic dashboard updates
   */
  private startPeriodicUpdates(): void {
    // Update dashboard every 30 seconds
    setInterval(async () => {
      await this.updateDashboardData();
    }, 30000);

    // Generate recommendations every 5 minutes
    setInterval(async () => {
      await this.generateRecommendations();
    }, 300000);
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Update all dashboard data
   */
  public async updateDashboardData(): Promise<void> {
    try {
      const monitorStatus = this.monitor.getMonitoringStatus();
      const recoveryStatus = this.recovery.getRecoveryStatus();

      // Update overview metrics
      this.updateOverviewMetrics(monitorStatus);

      // Update TypeScript metrics
      this.updateTypeScriptMetrics(monitorStatus);

      // Update performance metrics
      await this.updatePerformanceMetrics(monitorStatus);

      // Update recovery metrics
      this.updateRecoveryMetrics(recoveryStatus);

      // Update trends
      this.updateTrendAnalysis();

      // Update health status
      this.updateHealthStatus();

      // Update alerts
      this.updateAlerts();

      this.dashboardData.overview.lastUpdate = new Date();

    } catch (error) {
      console.error('Failed to update dashboard data:', error);
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Update overview metrics
   */
  private updateOverviewMetrics(monitorStatus: any): void {
    const metrics = monitorStatus.metrics;

    this.dashboardData.overview.totalErrors = metrics.totalErrors;
    this.dashboardData.overview.criticalErrors = monitorStatus.recentErrors
      .filter((e: TypeScriptError) => e.severity === 'critical').length;

    // Calculate error rate (errors per hour)
    const uptimeHours = (Date.now() - this.startTime.getTime()) / (1000 * 60 * 60);
    this.dashboardData.overview.errorRate = uptimeHours > 0 ? metrics.totalErrors / uptimeHours : 0;

    // Calculate build success rate
    const totalBuilds = this.compilationHistory.length;
    const successfulBuilds = this.compilationHistory.filter(h => h.success).length;
    this.dashboardData.overview.buildSuccessRate = totalBuilds > 0 ? (successfulBuilds / totalBuilds) * 100 : 100;

    this.dashboardData.overview.averageBuildTime = metrics.averageBuildTime;
    this.dashboardData.overview.uptime = Date.now() - this.startTime.getTime();

    // Calculate prevention effectiveness
    const expectedErrors = this.estimateExpectedErrors();
    const actualErrors = metrics.totalErrors;
    this.dashboardData.overview.preventionEffectiveness = Math.max(0,
      100 - ((actualErrors / Math.max(expectedErrors, 1)) * 100)
    );
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Update TypeScript metrics
   */
  private updateTypeScriptMetrics(monitorStatus: any): void {
    const metrics = monitorStatus.metrics;
    const errors = monitorStatus.recentErrors;

    this.dashboardData.typeScript.currentErrors = errors;
    this.dashboardData.typeScript.buildMetrics = metrics;

    // Group errors by category
    this.dashboardData.typeScript.errorsByCategory = errors.reduce((acc: any, error: TypeScriptError) => {
      acc[error.category] = (acc[error.category] || 0) + 1;
      return acc;
    }, {});

    // Group errors by severity
    this.dashboardData.typeScript.errorsBySeverity = errors.reduce((acc: any, error: TypeScriptError) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {});

    // Group errors by file
    this.dashboardData.typeScript.errorsByFile = errors.reduce((acc: any, error: TypeScriptError) => {
      const fileName = path.basename(error.file);
      acc[fileName] = (acc[fileName] || 0) + 1;
      return acc;
    }, {});

    // Update compilation history
    this.compilationHistory.push({
      timestamp: new Date(),
      success: metrics.buildSuccess,
      duration: metrics.lastBuildTime,
      errorCount: errors.length,
      warnings: errors.filter((e: TypeScriptError) => e.category === 'warning').length
    });

    // Keep only last 100 entries
    this.compilationHistory = this.compilationHistory.slice(-100);
    this.dashboardData.typeScript.compilationHistory = this.compilationHistory;
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Update performance metrics
   */
  private async updatePerformanceMetrics(monitorStatus: any): Promise<void> {
    const metrics = monitorStatus.metrics;

    // Update build time metrics
    this.dashboardData.performance.buildTime.current = metrics.lastBuildTime;
    this.dashboardData.performance.buildTime.average = metrics.averageBuildTime;
    this.dashboardData.performance.buildTime.budgetUtilization =
      (metrics.lastBuildTime / this.dashboardData.performance.buildTime.budget) * 100;

    // Update type check duration
    this.dashboardData.performance.typeCheckDuration.average = metrics.typeCheckDuration;

    // Update cache efficiency
    this.dashboardData.performance.cacheEfficiency.hitRate = metrics.cacheHitRate;

    // Analyze build time trend
    if (this.compilationHistory.length >= 5) {
      const recentBuilds = this.compilationHistory.slice(-5);
      const earlyBuilds = this.compilationHistory.slice(-10, -5);

      if (earlyBuilds.length > 0) {
        const recentAvg = recentBuilds.reduce((sum, b) => sum + b.duration, 0) / recentBuilds.length;
        const earlyAvg = earlyBuilds.reduce((sum, b) => sum + b.duration, 0) / earlyBuilds.length;

        if (recentAvg < earlyAvg * 0.9) {
          this.dashboardData.performance.buildTime.trend = 'improving';
        } else if (recentAvg > earlyAvg * 1.1) {
          this.dashboardData.performance.buildTime.trend = 'degrading';
        } else {
          this.dashboardData.performance.buildTime.trend = 'stable';
        }
      }
    }

    // Get bundle size (if available)
    try {
      const bundleAnalysis = await this.getBundleSize();
      if (bundleAnalysis) {
        this.dashboardData.performance.bundleSize.current = bundleAnalysis.size;
        this.dashboardData.performance.bundleSize.budgetUtilization =
          (bundleAnalysis.size / this.dashboardData.performance.bundleSize.budget) * 100;
      }
    } catch (error) {
      // Bundle analysis not available
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Update recovery metrics
   */
  private updateRecoveryMetrics(recoveryStatus: any): void {
    const history = recoveryStatus.recoveryHistory || [];

    this.dashboardData.recovery.totalRecoveries = history.length;
    this.dashboardData.recovery.successfulRecoveries = history.filter((r: RecoveryResult) => r.success).length;
    this.dashboardData.recovery.successRate = history.length > 0
      ? (this.dashboardData.recovery.successfulRecoveries / history.length) * 100
      : 0;

    // Calculate average recovery time
    const successfulRecoveries = history.filter((r: RecoveryResult) => r.success);
    this.dashboardData.recovery.averageRecoveryTime = successfulRecoveries.length > 0
      ? successfulRecoveries.reduce((sum: number, r: RecoveryResult) => sum + r.duration, 0) / successfulRecoveries.length
      : 0;

    // Count strategies used
    this.dashboardData.recovery.strategiesUsed = history.reduce((acc: any, r: RecoveryResult) => {
      acc[r.strategy] = (acc[r.strategy] || 0) + 1;
      return acc;
    }, {});

    // Recent recoveries
    this.dashboardData.recovery.recentRecoveries = history.slice(-10);

    // Manual interventions required
    this.dashboardData.recovery.manualInterventionsRequired =
      history.filter((r: RecoveryResult) => r.requiresManualIntervention).length;
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Update trend analysis
   */
  private updateTrendAnalysis(): void {
    // Error trend analysis
    if (this.compilationHistory.length >= 10) {
      const recent = this.compilationHistory.slice(-5);
      const previous = this.compilationHistory.slice(-10, -5);

      const recentErrorAvg = recent.reduce((sum, h) => sum + h.errorCount, 0) / recent.length;
      const previousErrorAvg = previous.reduce((sum, h) => sum + h.errorCount, 0) / previous.length;

      if (recentErrorAvg < previousErrorAvg * 0.8) {
        this.dashboardData.trends.errorTrend.direction = 'improving';
        this.dashboardData.trends.errorTrend.changeRate = ((previousErrorAvg - recentErrorAvg) / previousErrorAvg) * 100;
      } else if (recentErrorAvg > previousErrorAvg * 1.2) {
        this.dashboardData.trends.errorTrend.direction = 'degrading';
        this.dashboardData.trends.errorTrend.changeRate = ((recentErrorAvg - previousErrorAvg) / previousErrorAvg) * 100;
      } else {
        this.dashboardData.trends.errorTrend.direction = 'stable';
        this.dashboardData.trends.errorTrend.changeRate = 0;
      }

      // Project future errors
      this.dashboardData.trends.errorTrend.projectedErrors = Math.max(0,
        recentErrorAvg + (this.dashboardData.trends.errorTrend.changeRate / 100) * recentErrorAvg
      );
    }

    // Performance trend analysis
    if (this.compilationHistory.length >= 10) {
      const recent = this.compilationHistory.slice(-5);
      const previous = this.compilationHistory.slice(-10, -5);

      const recentBuildAvg = recent.reduce((sum, h) => sum + h.duration, 0) / recent.length;
      const previousBuildAvg = previous.reduce((sum, h) => sum + h.duration, 0) / previous.length;

      this.dashboardData.trends.performanceTrend.buildTimeChange =
        ((recentBuildAvg - previousBuildAvg) / previousBuildAvg) * 100;

      if (recentBuildAvg < previousBuildAvg * 0.9) {
        this.dashboardData.trends.performanceTrend.prediction = 'improving';
      } else if (recentBuildAvg > previousBuildAvg * 1.1) {
        this.dashboardData.trends.performanceTrend.prediction = 'degrading';
      } else {
        this.dashboardData.trends.performanceTrend.prediction = 'stable';
      }
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Update health status
   */
  private updateHealthStatus(): void {
    // Calculate component health scores
    const typescript = this.calculateTypeScriptHealth();
    const build = this.calculateBuildHealth();
    const performance = this.calculatePerformanceHealth();
    const recovery = this.calculateRecoveryHealth();

    this.dashboardData.health.components = {
      typescript,
      build,
      performance,
      recovery
    };

    // Calculate overall health
    const scores = [typescript.score, build.score, performance.score, recovery.score];
    this.dashboardData.health.score = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    if (this.dashboardData.health.score >= 80) {
      this.dashboardData.health.overall = 'healthy';
    } else if (this.dashboardData.health.score >= 60) {
      this.dashboardData.health.overall = 'warning';
    } else {
      this.dashboardData.health.overall = 'critical';
    }

    // Update uptime and availability
    this.dashboardData.health.uptime = Date.now() - this.startTime.getTime();
    this.dashboardData.health.availability = this.dashboardData.overview.buildSuccessRate;
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Calculate TypeScript health
   */
  private calculateTypeScriptHealth(): ComponentHealth {
    const errors = this.dashboardData.typeScript.currentErrors;
    const criticalErrors = errors.filter(e => e.severity === 'critical').length;
    const totalErrors = errors.length;

    let score = 100;
    const issues: string[] = [];

    if (criticalErrors > 0) {
      score -= criticalErrors * 20;
      issues.push(`${criticalErrors} critical TypeScript errors`);
    }

    if (totalErrors > 10) {
      score -= (totalErrors - 10) * 2;
      issues.push(`High error count: ${totalErrors} errors`);
    }

    const status = score >= 80 ? 'healthy' : score >= 60 ? 'warning' : 'critical';

    return {
      status,
      score: Math.max(0, score),
      issues,
      lastCheck: new Date()
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Calculate build health
   */
  private calculateBuildHealth(): ComponentHealth {
    const successRate = this.dashboardData.overview.buildSuccessRate;
    const averageBuildTime = this.dashboardData.performance.buildTime.average;
    const budget = this.dashboardData.performance.buildTime.budget;

    let score = 100;
    const issues: string[] = [];

    if (successRate < 95) {
      score -= (95 - successRate) * 2;
      issues.push(`Low build success rate: ${successRate.toFixed(1)}%`);
    }

    if (averageBuildTime > budget) {
      score -= ((averageBuildTime - budget) / budget) * 50;
      issues.push(`Build time exceeds budget: ${averageBuildTime}ms > ${budget}ms`);
    }

    const status = score >= 80 ? 'healthy' : score >= 60 ? 'warning' : 'critical';

    return {
      status,
      score: Math.max(0, score),
      issues,
      lastCheck: new Date()
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Calculate performance health
   */
  private calculatePerformanceHealth(): ComponentHealth {
    const buildTimeUtilization = this.dashboardData.performance.buildTime.budgetUtilization;
    const bundleSizeUtilization = this.dashboardData.performance.bundleSize.budgetUtilization;
    const cacheHitRate = this.dashboardData.performance.cacheEfficiency.hitRate;

    let score = 100;
    const issues: string[] = [];

    if (buildTimeUtilization > 100) {
      score -= (buildTimeUtilization - 100) * 0.5;
      issues.push(`Build time over budget: ${buildTimeUtilization.toFixed(1)}%`);
    }

    if (bundleSizeUtilization > 100) {
      score -= (bundleSizeUtilization - 100) * 0.3;
      issues.push(`Bundle size over budget: ${bundleSizeUtilization.toFixed(1)}%`);
    }

    if (cacheHitRate < 70) {
      score -= (70 - cacheHitRate) * 0.5;
      issues.push(`Low cache hit rate: ${cacheHitRate.toFixed(1)}%`);
    }

    const status = score >= 80 ? 'healthy' : score >= 60 ? 'warning' : 'critical';

    return {
      status,
      score: Math.max(0, score),
      issues,
      lastCheck: new Date()
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Calculate recovery health
   */
  private calculateRecoveryHealth(): ComponentHealth {
    const successRate = this.dashboardData.recovery.successRate;
    const manualInterventions = this.dashboardData.recovery.manualInterventionsRequired;
    const totalRecoveries = this.dashboardData.recovery.totalRecoveries;

    let score = 100;
    const issues: string[] = [];

    if (totalRecoveries > 0) {
      if (successRate < 80) {
        score -= (80 - successRate) * 1.5;
        issues.push(`Low recovery success rate: ${successRate.toFixed(1)}%`);
      }

      const manualInterventionRate = (manualInterventions / totalRecoveries) * 100;
      if (manualInterventionRate > 50) {
        score -= (manualInterventionRate - 50) * 0.5;
        issues.push(`High manual intervention rate: ${manualInterventionRate.toFixed(1)}%`);
      }
    }

    const status = score >= 80 ? 'healthy' : score >= 60 ? 'warning' : 'critical';

    return {
      status,
      score: Math.max(0, score),
      issues,
      lastCheck: new Date()
    };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Update alerts
   */
  private updateAlerts(): void {
    // Process active alerts from health components
    const newAlerts: Alert[] = [];

    // TypeScript alerts
    if (this.dashboardData.health.components.typescript.status === 'critical') {
      newAlerts.push({
        id: `ts-critical-${Date.now()}`,
        type: 'typescript_critical',
        severity: 'critical',
        message: 'Critical TypeScript errors detected',
        timestamp: new Date(),
        resolved: false,
        data: this.dashboardData.typeScript.currentErrors.filter(e => e.severity === 'critical')
      });
    }

    // Performance alerts
    if (this.dashboardData.performance.buildTime.budgetUtilization > 100) {
      newAlerts.push({
        id: `perf-buildtime-${Date.now()}`,
        type: 'performance_budget_exceeded',
        severity: 'warning',
        message: 'Build time budget exceeded',
        timestamp: new Date(),
        resolved: false,
        data: {
          current: this.dashboardData.performance.buildTime.current,
          budget: this.dashboardData.performance.buildTime.budget,
          utilization: this.dashboardData.performance.buildTime.budgetUtilization
        }
      });
    }

    // Add new alerts
    for (const alert of newAlerts) {
      // Check if similar alert already exists
      const existingAlert = this.alerts.find(a =>
        a.type === alert.type && !a.resolved
      );

      if (!existingAlert) {
        this.alerts.push(alert);
      }
    }

    // Update alert summary
    this.dashboardData.alerts.activeAlerts = this.alerts.filter(a => !a.resolved);
    this.dashboardData.alerts.alertHistory = [...this.alerts];

    this.dashboardData.alerts.criticalAlerts = this.alerts.filter(a =>
      a.severity === 'critical' && !a.resolved
    ).length;

    this.dashboardData.alerts.warningAlerts = this.alerts.filter(a =>
      a.severity === 'warning' && !a.resolved
    ).length;

    this.dashboardData.alerts.infoAlerts = this.alerts.filter(a =>
      a.severity === 'info' && !a.resolved
    ).length;

    // Group alerts by type
    this.dashboardData.alerts.alertsByType = this.alerts.reduce((acc, alert) => {
      acc[alert.type] = (acc[alert.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Generate recommendations
   */
  public async generateRecommendations(): Promise<void> {
    const recommendations: Recommendation[] = [];

    // TypeScript recommendations
    if (this.dashboardData.typeScript.currentErrors.length > 5) {
      recommendations.push({
        id: 'ts-error-reduction',
        title: 'Reduce TypeScript Errors',
        description: `You have ${this.dashboardData.typeScript.currentErrors.length} TypeScript errors. Focus on critical and high-severity errors first.`,
        priority: 'high',
        category: 'quality',
        impact: 'Improves code quality and prevents runtime errors',
        effort: 'medium',
        actionItems: [
          'Fix critical TypeScript errors immediately',
          'Set up stricter pre-commit hooks',
          'Review and update type definitions',
          'Enable stricter TypeScript compiler options'
        ]
      });
    }

    // Performance recommendations
    if (this.dashboardData.performance.buildTime.budgetUtilization > 80) {
      recommendations.push({
        id: 'build-performance',
        title: 'Optimize Build Performance',
        description: `Build time is using ${this.dashboardData.performance.buildTime.budgetUtilization.toFixed(1)}% of budget. Consider optimization.`,
        priority: 'medium',
        category: 'performance',
        impact: 'Faster development cycles and CI/CD pipeline',
        effort: 'medium',
        actionItems: [
          'Enable TypeScript incremental compilation',
          'Optimize tsconfig.json for faster builds',
          'Review and remove unused dependencies',
          'Configure build caching strategies'
        ]
      });
    }

    // Cache efficiency recommendations
    if (this.dashboardData.performance.cacheEfficiency.hitRate < 70) {
      recommendations.push({
        id: 'cache-optimization',
        title: 'Improve Cache Efficiency',
        description: `Cache hit rate is ${this.dashboardData.performance.cacheEfficiency.hitRate.toFixed(1)}%. Optimizing cache usage can improve build times.`,
        priority: 'medium',
        category: 'performance',
        impact: 'Significantly faster subsequent builds',
        effort: 'low',
        actionItems: [
          'Review TypeScript incremental build configuration',
          'Optimize Next.js build cache settings',
          'Configure proper .gitignore for build artifacts',
          'Set up CI/CD cache strategies'
        ]
      });
    }

    // Recovery recommendations
    if (this.dashboardData.recovery.successRate < 80 && this.dashboardData.recovery.totalRecoveries > 0) {
      recommendations.push({
        id: 'recovery-improvement',
        title: 'Improve Recovery Success Rate',
        description: `Recovery success rate is ${this.dashboardData.recovery.successRate.toFixed(1)}%. Enhance automated recovery capabilities.`,
        priority: 'high',
        category: 'maintenance',
        impact: 'Reduced downtime and manual intervention',
        effort: 'high',
        actionItems: [
          'Review and enhance recovery strategies',
          'Implement additional error detection patterns',
          'Create comprehensive backup and rollback procedures',
          'Add more granular error categorization'
        ]
      });
    }

    this.dashboardData.recommendations = recommendations;
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Get bundle size
   */
  private async getBundleSize(): Promise<{ size: number } | null> {
    try {
      const clientStatsPath = '.next/analyze/client.json';
      const statsData = await fs.readFile(clientStatsPath, 'utf-8');
      const stats = JSON.parse(statsData);
      return { size: stats.parsedSize || 0 };
    } catch (error) {
      return null;
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Estimate expected errors
   */
  private estimateExpectedErrors(): number {
    // This is a simplified estimation - in practice, you'd use historical data
    const codeBaseSize = 1000; // Estimate based on file count
    const complexityFactor = 0.02; // 2% error rate for complex TypeScript projects
    return Math.ceil(codeBaseSize * complexityFactor);
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Get current dashboard data
   */
  public getDashboardData(): DashboardMetrics {
    return { ...this.dashboardData };
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Export dashboard data
   */
  public async exportDashboardData(filePath: string): Promise<void> {
    try {
      const exportData = {
        generatedAt: new Date().toISOString(),
        version: '1.0.0',
        data: this.dashboardData
      };

      await fs.writeFile(filePath, JSON.stringify(exportData, null, 2));
      console.log(`✅ Dashboard data exported to ${filePath}`);
    } catch (error) {
      console.error('Failed to export dashboard data:', error);
      throw error;
    }
  }

  /**
   * CONTEXT7 SOURCE: /microsoft/typescript - Resolve alert
   */
  public resolveAlert(alertId: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert && !alert.resolved) {
      alert.resolved = true;
      alert.resolvedAt = new Date();
      return true;
    }
    return false;
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Export dashboard types
export type {
  DashboardMetrics,
  OverviewMetrics,
  TypeScriptDashboardData,
  PerformanceMetrics,
  RecoveryMetrics,
  TrendAnalysis,
  AlertSummary,
  HealthStatus,
  ComponentHealth,
  Alert,
  Recommendation,
  CompilationHistoryEntry,
  PerformanceEntry
};