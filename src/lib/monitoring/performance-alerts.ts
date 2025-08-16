// CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Performance budget alerting system
// ALERT REASON: Automated performance regression detection and alerting
// CONTEXT7 SOURCE: /getsentry/sentry-docs - Error and performance alerting integration
// IMPLEMENTATION: Comprehensive alerting for royal client service standards

import { getEnterpriseMonitoring } from './enterprise-monitoring';
import { webVitalsTracker } from '@/lib/performance/web-vitals';
import { PERFORMANCE_CONFIG } from '../../../performance.config';
import * as Sentry from '@sentry/nextjs';

// CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Performance budget alert configuration
// BUDGET REASON: Automated alerts prevent performance regressions
interface PerformanceAlertRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  
  // Alert conditions
  conditions: {
    metric: 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB' | 'bundle-size' | 'lighthouse-score' | 'error-rate';
    operator: 'greater-than' | 'less-than' | 'equals' | 'not-equals' | 'percentage-change';
    threshold: number;
    duration?: number; // How long condition must persist (in seconds)
    comparison?: 'absolute' | 'percentage' | 'baseline';
  };
  
  // Alert configuration
  severity: 'critical' | 'warning' | 'info';
  frequency: 'immediate' | 'once-per-hour' | 'once-per-day' | 'rate-limited';
  rateLimit?: number; // Max alerts per hour
  
  // Notification settings
  notifications: {
    email: boolean;
    slack: boolean;
    sms: boolean;
    webhook: boolean;
    dashboard: boolean;
  };
  
  // Business context
  businessImpact: 'high' | 'medium' | 'low';
  tags: string[];
  
  // Auto-resolution
  autoResolve?: {
    enabled: boolean;
    thresholdMet: boolean; // Resolve when metric returns to good state
    timeDelay: number; // Wait X seconds before auto-resolving
  };
}

// CONTEXT7 SOURCE: /getsentry/sentry-docs - Alert state management
// STATE REASON: Track alert lifecycle for proper escalation and resolution
interface AlertState {
  id: string;
  ruleId: string;
  status: 'active' | 'resolved' | 'suppressed' | 'acknowledged';
  
  // Alert details
  triggeredAt: Date;
  resolvedAt?: Date;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
  
  // Trigger information
  triggerValue: number;
  threshold: number;
  metric: string;
  
  // Escalation
  escalationLevel: 0 | 1 | 2 | 3; // 0=initial, 1=hour, 2=4hours, 3=24hours
  lastEscalatedAt?: Date;
  
  // Suppression
  suppressedUntil?: Date;
  suppressionReason?: string;
  
  // Metadata
  metadata: {
    url?: string;
    userAgent?: string;
    sessionId?: string;
    userId?: string;
    buildVersion?: string;
    environment: string;
  };
}

// CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Performance baseline tracking
// BASELINE REASON: Compare current performance against historical baselines
interface PerformanceBaseline {
  metric: string;
  baseline: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  sampleSize: number;
  lastUpdated: Date;
  
  // Historical data
  history: {
    timestamp: Date;
    value: number;
  }[];
  
  // Trend analysis
  trend: {
    direction: 'improving' | 'degrading' | 'stable';
    changeRate: number; // percentage change per day
    significance: number; // statistical significance (0-1)
  };
}

/**
 * CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Performance alerting system
 * ALERT REASON: Proactive performance monitoring with intelligent alerting
 */
export class PerformanceAlertingSystem {
  private enterpriseMonitoring = getEnterpriseMonitoring();
  private alertRules: Map<string, PerformanceAlertRule> = new Map();
  private activeAlerts: Map<string, AlertState> = new Map();
  private alertHistory: AlertState[] = [];
  private performanceBaselines: Map<string, PerformanceBaseline> = new Map();
  
  // Rate limiting
  private alertCounts: Map<string, { count: number; windowStart: Date }> = new Map();
  
  // Monitoring intervals
  private monitoringInterval: NodeJS.Timeout | null = null;
  private baselineUpdateInterval: NodeJS.Timeout | null = null;
  
  constructor() {
    this.initializeDefaultRules();
    this.startMonitoring();
    this.startBaselineUpdates();
  }
  
  // CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Default performance alert rules
  // RULES REASON: Comprehensive coverage of critical performance metrics
  private initializeDefaultRules(): void {
    const defaultRules: PerformanceAlertRule[] = [
      {
        id: 'lcp-critical',
        name: 'Largest Contentful Paint Critical',
        description: 'LCP exceeds critical threshold for royal client standards',
        enabled: true,
        conditions: {
          metric: 'LCP',
          operator: 'greater-than',
          threshold: PERFORMANCE_CONFIG.webVitals.LCP.poor,
          duration: 60, // Must persist for 1 minute
          comparison: 'absolute',
        },
        severity: 'critical',
        frequency: 'immediate',
        notifications: {
          email: true,
          slack: true,
          sms: true,
          webhook: true,
          dashboard: true,
        },
        businessImpact: 'high',
        tags: ['web-vitals', 'lcp', 'user-experience'],
        autoResolve: {
          enabled: true,
          thresholdMet: true,
          timeDelay: 300, // 5 minutes
        },
      },
      
      {
        id: 'cls-regression',
        name: 'Cumulative Layout Shift Regression',
        description: 'CLS has regressed beyond acceptable limits',
        enabled: true,
        conditions: {
          metric: 'CLS',
          operator: 'greater-than',
          threshold: PERFORMANCE_CONFIG.webVitals.CLS.needsImprovement,
          duration: 120,
          comparison: 'absolute',
        },
        severity: 'warning',
        frequency: 'once-per-hour',
        rateLimit: 3,
        notifications: {
          email: true,
          slack: true,
          sms: false,
          webhook: true,
          dashboard: true,
        },
        businessImpact: 'medium',
        tags: ['web-vitals', 'cls', 'layout-stability'],
        autoResolve: {
          enabled: true,
          thresholdMet: true,
          timeDelay: 600, // 10 minutes
        },
      },
      
      {
        id: 'bundle-size-exceeded',
        name: 'JavaScript Bundle Size Exceeded',
        description: 'JavaScript bundle size exceeds performance budget',
        enabled: true,
        conditions: {
          metric: 'bundle-size',
          operator: 'greater-than',
          threshold: PERFORMANCE_CONFIG.resources.javascript.total,
          comparison: 'absolute',
        },
        severity: 'warning',
        frequency: 'once-per-day',
        notifications: {
          email: true,
          slack: true,
          sms: false,
          webhook: false,
          dashboard: true,
        },
        businessImpact: 'medium',
        tags: ['bundle-size', 'performance-budget'],
        autoResolve: {
          enabled: false,
          thresholdMet: false,
          timeDelay: 0,
        },
      },
      
      {
        id: 'lighthouse-performance-drop',
        name: 'Lighthouse Performance Score Drop',
        description: 'Lighthouse performance score has dropped significantly',
        enabled: true,
        conditions: {
          metric: 'lighthouse-score',
          operator: 'less-than',
          threshold: PERFORMANCE_CONFIG.testing.lighthouse.performance,
          duration: 300, // 5 minutes
          comparison: 'absolute',
        },
        severity: 'critical',
        frequency: 'immediate',
        notifications: {
          email: true,
          slack: true,
          sms: true,
          webhook: true,
          dashboard: true,
        },
        businessImpact: 'high',
        tags: ['lighthouse', 'performance-score', 'regression'],
        autoResolve: {
          enabled: true,
          thresholdMet: true,
          timeDelay: 900, // 15 minutes
        },
      },
      
      {
        id: 'error-rate-spike',
        name: 'JavaScript Error Rate Spike',
        description: 'JavaScript error rate has spiked above normal levels',
        enabled: true,
        conditions: {
          metric: 'error-rate',
          operator: 'percentage-change',
          threshold: 50, // 50% increase from baseline
          duration: 180, // 3 minutes
          comparison: 'baseline',
        },
        severity: 'critical',
        frequency: 'immediate',
        notifications: {
          email: true,
          slack: true,
          sms: true,
          webhook: true,
          dashboard: true,
        },
        businessImpact: 'high',
        tags: ['errors', 'javascript', 'spike'],
        autoResolve: {
          enabled: true,
          thresholdMet: true,
          timeDelay: 600, // 10 minutes
        },
      },
    ];
    
    defaultRules.forEach(rule => {
      this.alertRules.set(rule.id, rule);
    });
  }
  
  // CONTEXT7 SOURCE: /getsentry/sentry-docs - Performance monitoring and alerting
  // MONITORING REASON: Continuous monitoring for proactive issue detection
  private startMonitoring(): void {
    // Monitor every 30 seconds
    this.monitoringInterval = setInterval(async () => {
      try {
        await this.checkAlertConditions();
        await this.processEscalations();
        await this.processAutoResolutions();
      } catch (error) {
        console.error('Performance monitoring failed:', error);
        
        // CONTEXT7 SOURCE: /getsentry/sentry-docs - Error reporting integration
        Sentry.captureException(error, {
          tags: {
            component: 'performance-alerting',
            operation: 'monitoring',
          },
        });
      }
    }, 30000);
  }
  
  // Start baseline updates (every hour)
  private startBaselineUpdates(): void {
    this.baselineUpdateInterval = setInterval(async () => {
      try {
        await this.updatePerformanceBaselines();
      } catch (error) {
        console.error('Baseline update failed:', error);
      }
    }, 3600000); // 1 hour
    
    // Initial baseline update
    this.updatePerformanceBaselines().catch(console.error);
  }
  
  // CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Alert condition evaluation
  // EVALUATION REASON: Comprehensive condition checking for all performance metrics
  private async checkAlertConditions(): Promise<void> {
    const webVitalsMetrics = webVitalsTracker.getMetrics();
    const systemStatus = await this.enterpriseMonitoring.getSystemStatus();
    
    for (const rule of this.alertRules.values()) {
      if (!rule.enabled) continue;
      
      try {
        const shouldTrigger = await this.evaluateCondition(rule, webVitalsMetrics, systemStatus);
        
        if (shouldTrigger) {
          await this.triggerAlert(rule, webVitalsMetrics, systemStatus);
        }
      } catch (error) {
        console.error(`Failed to evaluate rule ${rule.id}:`, error);
      }
    }
  }
  
  // Evaluate individual alert condition
  private async evaluateCondition(
    rule: PerformanceAlertRule,
    webVitalsMetrics: any,
    systemStatus: any
  ): Promise<boolean> {
    const { metric, operator, threshold, comparison } = rule.conditions;
    
    let currentValue: number = 0;
    
    // Get current metric value
    switch (metric) {
      case 'LCP':
        currentValue = webVitalsMetrics.LCP?.value || 0;
        break;
      case 'FID':
        currentValue = webVitalsMetrics.FID?.value || 0;
        break;
      case 'CLS':
        currentValue = webVitalsMetrics.CLS?.value || 0;
        break;
      case 'FCP':
        currentValue = webVitalsMetrics.FCP?.value || 0;
        break;
      case 'TTFB':
        currentValue = webVitalsMetrics.TTFB?.value || 0;
        break;
      case 'bundle-size':
        currentValue = await this.getCurrentBundleSize();
        break;
      case 'lighthouse-score':
        currentValue = await this.getCurrentLighthouseScore();
        break;
      case 'error-rate':
        currentValue = await this.getCurrentErrorRate();
        break;
      default:
        return false;
    }
    
    // Handle baseline comparison
    if (comparison === 'baseline') {
      const baseline = this.performanceBaselines.get(metric);
      if (!baseline) return false;
      
      if (operator === 'percentage-change') {
        const percentageChange = ((currentValue - baseline.baseline) / baseline.baseline) * 100;
        return Math.abs(percentageChange) > threshold;
      }
    }
    
    // Handle absolute and percentage comparisons
    switch (operator) {
      case 'greater-than':
        return currentValue > threshold;
      case 'less-than':
        return currentValue < threshold;
      case 'equals':
        return Math.abs(currentValue - threshold) < 0.01;
      case 'not-equals':
        return Math.abs(currentValue - threshold) >= 0.01;
      default:
        return false;
    }
  }
  
  // CONTEXT7 SOURCE: /getsentry/sentry-docs - Alert triggering and notification
  // TRIGGER REASON: Intelligent alert triggering with rate limiting and deduplication
  private async triggerAlert(
    rule: PerformanceAlertRule,
    webVitalsMetrics: any,
    systemStatus: any
  ): Promise<void> {
    // Check for existing active alert
    const existingAlert = Array.from(this.activeAlerts.values())
      .find(alert => alert.ruleId === rule.id && alert.status === 'active');
    
    if (existingAlert) {
      // Update existing alert
      await this.updateExistingAlert(existingAlert, rule, webVitalsMetrics, systemStatus);
      return;
    }
    
    // Check rate limiting
    if (!this.isWithinRateLimit(rule)) {
      console.log(`Alert ${rule.id} rate limited`);
      return;
    }
    
    // Create new alert
    const alertId = `alert_${rule.id}_${Date.now()}`;
    const currentValue = await this.getCurrentMetricValue(rule.conditions.metric, webVitalsMetrics, systemStatus);
    
    const newAlert: AlertState = {
      id: alertId,
      ruleId: rule.id,
      status: 'active',
      triggeredAt: new Date(),
      triggerValue: currentValue,
      threshold: rule.conditions.threshold,
      metric: rule.conditions.metric,
      escalationLevel: 0,
      metadata: {
        url: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        environment: process.env.NODE_ENV || 'development',
        buildVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      },
    };
    
    this.activeAlerts.set(alertId, newAlert);
    this.alertHistory.push(newAlert);
    
    // Update rate limiting
    this.updateRateLimit(rule);
    
    // Send notifications
    await this.sendAlertNotifications(rule, newAlert, 'triggered');
    
    // CONTEXT7 SOURCE: /getsentry/sentry-docs - Sentry alert integration
    Sentry.captureMessage(`Performance Alert: ${rule.name}`, {
      level: rule.severity === 'critical' ? 'error' : 'warning',
      tags: {
        alertRule: rule.id,
        metric: rule.conditions.metric,
        severity: rule.severity,
        businessImpact: rule.businessImpact,
      },
      extra: {
        alertId,
        currentValue,
        threshold: rule.conditions.threshold,
        rule,
      },
    });
    
    console.log(`🚨 Performance Alert Triggered: ${rule.name}`, {
      alertId,
      metric: rule.conditions.metric,
      currentValue,
      threshold: rule.conditions.threshold,
      severity: rule.severity,
    });
  }
  
  // Send alert notifications through configured channels
  private async sendAlertNotifications(
    rule: PerformanceAlertRule,
    alert: AlertState,
    type: 'triggered' | 'resolved' | 'escalated'
  ): Promise<void> {
    const notificationData = {
      rule,
      alert,
      type,
      timestamp: new Date().toISOString(),
      url: alert.metadata.url,
      environment: alert.metadata.environment,
    };
    
    // Use enterprise monitoring for notifications
    await this.enterpriseMonitoring.triggerAlert(
      `performance_${type}_${rule.conditions.metric}`,
      rule.severity,
      notificationData
    );
  }
  
  // Process alert escalations
  private async processEscalations(): Promise<void> {
    const now = new Date();
    
    for (const alert of this.activeAlerts.values()) {
      if (alert.status !== 'active') continue;
      
      const rule = this.alertRules.get(alert.ruleId);
      if (!rule) continue;
      
      const alertAge = now.getTime() - alert.triggeredAt.getTime();
      const escalationThresholds = [0, 3600000, 14400000, 86400000]; // 0, 1h, 4h, 24h
      
      for (let level = alert.escalationLevel + 1; level < escalationThresholds.length; level++) {
        if (alertAge >= escalationThresholds[level]) {
          alert.escalationLevel = level as 0 | 1 | 2 | 3;
          alert.lastEscalatedAt = now;
          
          await this.sendAlertNotifications(rule, alert, 'escalated');
          
          console.log(`🔺 Alert Escalated: ${alert.id} to level ${level}`);
          break;
        }
      }
    }
  }
  
  // Process auto-resolutions
  private async processAutoResolutions(): Promise<void> {
    const webVitalsMetrics = webVitalsTracker.getMetrics();
    const systemStatus = await this.enterpriseMonitoring.getSystemStatus();
    
    for (const alert of this.activeAlerts.values()) {
      if (alert.status !== 'active') continue;
      
      const rule = this.alertRules.get(alert.ruleId);
      if (!rule?.autoResolve?.enabled) continue;
      
      const shouldResolve = await this.shouldAutoResolve(rule, alert, webVitalsMetrics, systemStatus);
      
      if (shouldResolve) {
        await this.resolveAlert(alert.id, 'auto-resolved');
      }
    }
  }
  
  // Check if alert should be auto-resolved
  private async shouldAutoResolve(
    rule: PerformanceAlertRule,
    alert: AlertState,
    webVitalsMetrics: any,
    systemStatus: any
  ): Promise<boolean> {
    if (!rule.autoResolve?.thresholdMet) return false;
    
    const currentValue = await this.getCurrentMetricValue(rule.conditions.metric, webVitalsMetrics, systemStatus);
    const thresholdMet = await this.evaluateResolutionCondition(rule, currentValue);
    
    if (!thresholdMet) return false;
    
    // Check time delay
    const now = new Date();
    const timeSinceGood = now.getTime() - alert.triggeredAt.getTime();
    
    return timeSinceGood >= (rule.autoResolve.timeDelay * 1000);
  }
  
  // Evaluate resolution condition (opposite of trigger condition)
  private async evaluateResolutionCondition(rule: PerformanceAlertRule, currentValue: number): Promise<boolean> {
    const { operator, threshold } = rule.conditions;
    
    // Resolution condition is opposite of trigger condition
    switch (operator) {
      case 'greater-than':
        return currentValue <= threshold;
      case 'less-than':
        return currentValue >= threshold;
      case 'equals':
        return Math.abs(currentValue - threshold) >= 0.01;
      case 'not-equals':
        return Math.abs(currentValue - threshold) < 0.01;
      default:
        return false;
    }
  }
  
  // Update performance baselines
  private async updatePerformanceBaselines(): Promise<void> {
    const webVitalsMetrics = webVitalsTracker.getMetrics();
    const metrics = ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'];
    
    for (const metric of metrics) {
      const value = webVitalsMetrics[metric]?.value;
      if (value === undefined) continue;
      
      let baseline = this.performanceBaselines.get(metric);
      
      if (!baseline) {
        baseline = {
          metric,
          baseline: value,
          confidenceInterval: { lower: value * 0.9, upper: value * 1.1 },
          sampleSize: 1,
          lastUpdated: new Date(),
          history: [{ timestamp: new Date(), value }],
          trend: { direction: 'stable', changeRate: 0, significance: 0 },
        };
      } else {
        // Update baseline using moving average
        const alpha = 0.1; // Smoothing factor
        baseline.baseline = baseline.baseline * (1 - alpha) + value * alpha;
        baseline.sampleSize += 1;
        baseline.lastUpdated = new Date();
        baseline.history.push({ timestamp: new Date(), value });
        
        // Keep only last 1000 data points
        if (baseline.history.length > 1000) {
          baseline.history = baseline.history.slice(-1000);
        }
        
        // Update confidence interval and trend
        this.updateBaselineStatistics(baseline);
      }
      
      this.performanceBaselines.set(metric, baseline);
    }
  }
  
  // Update baseline statistics
  private updateBaselineStatistics(baseline: PerformanceBaseline): void {
    const values = baseline.history.map(point => point.value);
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    
    // Update confidence interval (95%)
    baseline.confidenceInterval = {
      lower: mean - 1.96 * stdDev,
      upper: mean + 1.96 * stdDev,
    };
    
    // Calculate trend
    if (baseline.history.length >= 10) {
      const recent = baseline.history.slice(-10);
      const older = baseline.history.slice(-20, -10);
      
      if (older.length > 0) {
        const recentMean = recent.reduce((sum, point) => sum + point.value, 0) / recent.length;
        const olderMean = older.reduce((sum, point) => sum + point.value, 0) / older.length;
        
        const changeRate = ((recentMean - olderMean) / olderMean) * 100;
        
        baseline.trend = {
          direction: Math.abs(changeRate) < 5 ? 'stable' : changeRate > 0 ? 'degrading' : 'improving',
          changeRate: Math.abs(changeRate),
          significance: Math.min(baseline.sampleSize / 100, 1), // 0-1 scale
        };
      }
    }
  }
  
  // Helper methods
  private async getCurrentMetricValue(metric: string, webVitalsMetrics: any, systemStatus: any): Promise<number> {
    switch (metric) {
      case 'LCP':
        return webVitalsMetrics.LCP?.value || 0;
      case 'FID':
        return webVitalsMetrics.FID?.value || 0;
      case 'CLS':
        return webVitalsMetrics.CLS?.value || 0;
      case 'FCP':
        return webVitalsMetrics.FCP?.value || 0;
      case 'TTFB':
        return webVitalsMetrics.TTFB?.value || 0;
      case 'bundle-size':
        return await this.getCurrentBundleSize();
      case 'lighthouse-score':
        return await this.getCurrentLighthouseScore();
      case 'error-rate':
        return await this.getCurrentErrorRate();
      default:
        return 0;
    }
  }
  
  private async getCurrentBundleSize(): Promise<number> {
    if (typeof window === 'undefined') return 0;
    
    try {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return resources
        .filter(resource => resource.name.includes('.js'))
        .reduce((total, resource) => total + (resource.transferSize || 0), 0);
    } catch {
      return 0;
    }
  }
  
  private async getCurrentLighthouseScore(): Promise<number> {
    // This would typically come from a recent Lighthouse audit
    // For now, return a mock score
    return 85;
  }
  
  private async getCurrentErrorRate(): Promise<number> {
    // This would come from error tracking system
    // For now, return a mock rate
    return 0.5;
  }
  
  private isWithinRateLimit(rule: PerformanceAlertRule): boolean {
    if (rule.frequency === 'immediate') return true;
    
    const now = new Date();
    const rateKey = rule.id;
    const rateData = this.alertCounts.get(rateKey);
    
    if (!rateData) return true;
    
    const hoursSinceWindow = (now.getTime() - rateData.windowStart.getTime()) / 3600000;
    
    if (hoursSinceWindow >= 1) {
      // Reset window
      this.alertCounts.delete(rateKey);
      return true;
    }
    
    const maxAlerts = rule.rateLimit || 1;
    return rateData.count < maxAlerts;
  }
  
  private updateRateLimit(rule: PerformanceAlertRule): void {
    const now = new Date();
    const rateKey = rule.id;
    const rateData = this.alertCounts.get(rateKey);
    
    if (!rateData) {
      this.alertCounts.set(rateKey, {
        count: 1,
        windowStart: now,
      });
    } else {
      rateData.count += 1;
    }
  }
  
  private async updateExistingAlert(
    alert: AlertState,
    rule: PerformanceAlertRule,
    webVitalsMetrics: any,
    systemStatus: any
  ): Promise<void> {
    // Update trigger value
    alert.triggerValue = await this.getCurrentMetricValue(rule.conditions.metric, webVitalsMetrics, systemStatus);
    
    // Check if we need to escalate
    const now = new Date();
    const alertAge = now.getTime() - alert.triggeredAt.getTime();
    
    if (rule.conditions.duration && alertAge >= rule.conditions.duration * 1000) {
      // Alert has persisted for required duration
      console.log(`Alert ${alert.id} duration threshold met`);
    }
  }
  
  // Public API methods
  public async resolveAlert(alertId: string, reason?: string): Promise<boolean> {
    const alert = this.activeAlerts.get(alertId);
    if (!alert) return false;
    
    alert.status = 'resolved';
    alert.resolvedAt = new Date();
    
    const rule = this.alertRules.get(alert.ruleId);
    if (rule) {
      await this.sendAlertNotifications(rule, alert, 'resolved');
    }
    
    console.log(`✅ Alert Resolved: ${alertId}`, { reason });
    return true;
  }
  
  public async acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<boolean> {
    const alert = this.activeAlerts.get(alertId);
    if (!alert) return false;
    
    alert.status = 'acknowledged';
    alert.acknowledgedAt = new Date();
    alert.acknowledgedBy = acknowledgedBy;
    
    console.log(`ℹ️ Alert Acknowledged: ${alertId} by ${acknowledgedBy}`);
    return true;
  }
  
  public async suppressAlert(alertId: string, durationMinutes: number, reason: string): Promise<boolean> {
    const alert = this.activeAlerts.get(alertId);
    if (!alert) return false;
    
    alert.status = 'suppressed';
    alert.suppressedUntil = new Date(Date.now() + durationMinutes * 60000);
    alert.suppressionReason = reason;
    
    console.log(`🔇 Alert Suppressed: ${alertId} for ${durationMinutes} minutes`);
    return true;
  }
  
  public getActiveAlerts(): AlertState[] {
    return Array.from(this.activeAlerts.values());
  }
  
  public getAlertHistory(hours: number = 24): AlertState[] {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.alertHistory.filter(alert => alert.triggeredAt > cutoff);
  }
  
  public getPerformanceBaselines(): Map<string, PerformanceBaseline> {
    return new Map(this.performanceBaselines);
  }
  
  public addCustomRule(rule: PerformanceAlertRule): void {
    this.alertRules.set(rule.id, rule);
  }
  
  public removeRule(ruleId: string): boolean {
    return this.alertRules.delete(ruleId);
  }
  
  public updateRule(ruleId: string, updates: Partial<PerformanceAlertRule>): boolean {
    const rule = this.alertRules.get(ruleId);
    if (!rule) return false;
    
    Object.assign(rule, updates);
    return true;
  }
  
  public getAlertRules(): PerformanceAlertRule[] {
    return Array.from(this.alertRules.values());
  }
  
  public getAlertStatistics() {
    const activeAlerts = this.getActiveAlerts();
    const history = this.getAlertHistory();
    
    return {
      active: {
        total: activeAlerts.length,
        critical: activeAlerts.filter(alert => {
          const rule = this.alertRules.get(alert.ruleId);
          return rule?.severity === 'critical';
        }).length,
        warning: activeAlerts.filter(alert => {
          const rule = this.alertRules.get(alert.ruleId);
          return rule?.severity === 'warning';
        }).length,
      },
      history: {
        total: history.length,
        resolved: history.filter(alert => alert.status === 'resolved').length,
        averageResolutionTime: this.calculateAverageResolutionTime(history),
      },
      rules: {
        total: this.alertRules.size,
        enabled: Array.from(this.alertRules.values()).filter(rule => rule.enabled).length,
        disabled: Array.from(this.alertRules.values()).filter(rule => !rule.enabled).length,
      },
    };
  }
  
  private calculateAverageResolutionTime(alerts: AlertState[]): number {
    const resolvedAlerts = alerts.filter(alert => alert.resolvedAt);
    if (resolvedAlerts.length === 0) return 0;
    
    const totalResolutionTime = resolvedAlerts.reduce((sum, alert) => {
      const resolutionTime = alert.resolvedAt!.getTime() - alert.triggeredAt.getTime();
      return sum + resolutionTime;
    }, 0);
    
    return totalResolutionTime / resolvedAlerts.length / 60000; // Convert to minutes
  }
  
  public destroy(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    if (this.baselineUpdateInterval) {
      clearInterval(this.baselineUpdateInterval);
      this.baselineUpdateInterval = null;
    }
  }
}

// Export singleton instance
let alertingSystemInstance: PerformanceAlertingSystem | null = null;

export const getPerformanceAlertingSystem = (): PerformanceAlertingSystem => {
  if (!alertingSystemInstance) {
    alertingSystemInstance = new PerformanceAlertingSystem();
  }
  return alertingSystemInstance;
};

// Export types
export type { PerformanceAlertRule, AlertState, PerformanceBaseline };

export default PerformanceAlertingSystem;