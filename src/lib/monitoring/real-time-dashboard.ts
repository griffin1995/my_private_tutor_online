// CONTEXT7 SOURCE: /getsentry/sentry-docs - Real-time monitoring dashboard integration
// DASHBOARD REASON: Royal client visibility into system performance and health
// CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Performance metrics dashboard
// IMPLEMENTATION: Executive dashboard for £400k+ revenue monitoring

import { getEnterpriseMonitoring } from './enterprise-monitoring';
import { webVitalsTracker } from '@/lib/performance/web-vitals';
import { businessAnalytics } from '@/lib/analytics/business-analytics';
import { PERFORMANCE_CONFIG } from '../../../performance.config';

// CONTEXT7 SOURCE: /getsentry/sentry-docs - Real-time monitoring dashboard data structure
// DASHBOARD REASON: Comprehensive dashboard for royal client service monitoring
interface DashboardMetrics {
  // System Health Overview
  systemHealth: {
    status: 'healthy' | 'degraded' | 'critical';
    uptime: number;
    lastUpdated: string;
    issues: string[];
  };
  
  // Performance Metrics
  performance: {
    webVitals: {
      LCP: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable' };
      FID: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable' };
      CLS: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable' };
      FCP: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable' };
      TTFB: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable' };
    };
    lighthouseScore: {
      performance: number;
      accessibility: number;
      bestPractices: number;
      seo: number;
      timestamp: string;
    };
    budgetCompliance: {
      javascript: { usage: number; budget: number; status: 'good' | 'warning' | 'critical' };
      css: { usage: number; budget: number; status: 'good' | 'warning' | 'critical' };
      images: { usage: number; budget: number; status: 'good' | 'warning' | 'critical' };
      totalSize: { usage: number; budget: number; status: 'good' | 'warning' | 'critical' };
    };
  };
  
  // Business Metrics
  business: {
    revenue: {
      daily: number;
      weekly: number;
      monthly: number;
      trend: 'up' | 'down' | 'stable';
    };
    conversions: {
      inquiries: { count: number; rate: number; trend: 'up' | 'down' | 'stable' };
      bookings: { count: number; rate: number; trend: 'up' | 'down' | 'stable' };
      completions: { count: number; rate: number; trend: 'up' | 'down' | 'stable' };
    };
    userEngagement: {
      sessions: number;
      bounceRate: number;
      averageSessionDuration: number;
      pageViews: number;
    };
    errorRates: {
      javascript: number;
      api: number;
      forms: number;
      payment: number;
    };
  };
  
  // Infrastructure Health
  infrastructure: {
    database: {
      status: 'up' | 'down' | 'degraded';
      responseTime: number;
      connections: number;
      errorRate: number;
    };
    api: {
      status: 'up' | 'down' | 'degraded';
      responseTime: number;
      throughput: number;
      errorRate: number;
    };
    cdn: {
      status: 'up' | 'down' | 'degraded';
      hitRate: number;
      bandwidth: number;
    };
    deployment: {
      status: 'success' | 'failed' | 'in-progress';
      lastDeployment: string;
      buildTime: number;
      version: string;
    };
  };
  
  // Alerts and Monitoring
  alerts: {
    active: Array<{
      id: string;
      type: string;
      severity: 'critical' | 'warning';
      timestamp: string;
      description: string;
    }>;
    resolved: Array<{
      id: string;
      type: string;
      severity: 'critical' | 'warning';
      resolvedAt: string;
      resolutionTime: number;
    }>;
    counts: {
      critical: number;
      warning: number;
      total: number;
    };
  };
  
  // Geographic Performance
  geographic: {
    regions: Record<string, {
      responseTime: number;
      errorRate: number;
      userCount: number;
      revenue: number;
    }>;
    devices: Record<string, {
      usage: number;
      performance: number;
      conversionRate: number;
    }>;
  };
}

// CONTEXT7 SOURCE: /getsentry/sentry-docs - Real-time data streaming interface
// STREAMING REASON: Live updates for royal client service monitoring
interface DashboardSubscription {
  id: string;
  callback: (metrics: DashboardMetrics) => void;
  filters?: {
    metrics?: string[];
    severity?: ('critical' | 'warning')[];
    businessOnly?: boolean;
  };
}

/**
 * CONTEXT7 SOURCE: /getsentry/sentry-docs - Real-time monitoring dashboard
 * DASHBOARD REASON: Executive visibility into royal client service performance
 */
export class RealTimeMonitoringDashboard {
  private enterpriseMonitoring = getEnterpriseMonitoring();
  private subscriptions: Map<string, DashboardSubscription> = new Map();
  private currentMetrics: DashboardMetrics | null = null;
  private updateInterval: NodeJS.Timeout | null = null;
  private metricsHistory: DashboardMetrics[] = [];
  
  constructor() {
    this.startRealTimeUpdates();
  }
  
  // CONTEXT7 SOURCE: /getsentry/sentry-docs - Real-time metrics collection
  // METRICS REASON: Comprehensive performance and business metrics for monitoring
  async collectDashboardMetrics(): Promise<DashboardMetrics> {
    try {
      // Get system status from enterprise monitoring
      const systemStatus = await this.enterpriseMonitoring.getSystemStatus();
      
      // Get Web Vitals metrics
      const webVitalsMetrics = webVitalsTracker.getMetrics();
      const webVitalsSummary = webVitalsTracker.getSummary();
      
      // Get business analytics
      const businessMetrics = await businessAnalytics.getBusinessMetrics();
      
      // Calculate system health status
      const systemHealthStatus = this.calculateSystemHealthStatus(systemStatus);
      
      const dashboardMetrics: DashboardMetrics = {
        systemHealth: {
          status: systemHealthStatus.status,
          uptime: systemHealthStatus.uptime,
          lastUpdated: new Date().toISOString(),
          issues: systemHealthStatus.issues,
        },
        
        performance: {
          webVitals: {
            LCP: {
              value: webVitalsMetrics.LCP?.value || 0,
              rating: webVitalsMetrics.LCP?.rating || 'poor',
              trend: this.calculateTrend('LCP', webVitalsMetrics.LCP?.value || 0),
            },
            FID: {
              value: webVitalsMetrics.FID?.value || 0,
              rating: webVitalsMetrics.FID?.rating || 'poor',
              trend: this.calculateTrend('FID', webVitalsMetrics.FID?.value || 0),
            },
            CLS: {
              value: webVitalsMetrics.CLS?.value || 0,
              rating: webVitalsMetrics.CLS?.rating || 'poor',
              trend: this.calculateTrend('CLS', webVitalsMetrics.CLS?.value || 0),
            },
            FCP: {
              value: webVitalsMetrics.FCP?.value || 0,
              rating: webVitalsMetrics.FCP?.rating || 'poor',
              trend: this.calculateTrend('FCP', webVitalsMetrics.FCP?.value || 0),
            },
            TTFB: {
              value: webVitalsMetrics.TTFB?.value || 0,
              rating: webVitalsMetrics.TTFB?.rating || 'poor',
              trend: this.calculateTrend('TTFB', webVitalsMetrics.TTFB?.value || 0),
            },
          },
          
          lighthouseScore: {
            performance: businessMetrics.lighthouseScores?.performance || 0,
            accessibility: businessMetrics.lighthouseScores?.accessibility || 0,
            bestPractices: businessMetrics.lighthouseScores?.bestPractices || 0,
            seo: businessMetrics.lighthouseScores?.seo || 0,
            timestamp: new Date().toISOString(),
          },
          
          budgetCompliance: {
            javascript: {
              usage: systemStatus.performanceBudgets?.resourceBudgets?.javascriptSize?.current || 0,
              budget: PERFORMANCE_CONFIG.resources.javascript.total,
              status: systemStatus.performanceBudgets?.resourceBudgets?.javascriptSize?.status || 'good',
            },
            css: {
              usage: systemStatus.performanceBudgets?.resourceBudgets?.cssSize?.current || 0,
              budget: PERFORMANCE_CONFIG.resources.css.total,
              status: systemStatus.performanceBudgets?.resourceBudgets?.cssSize?.status || 'good',
            },
            images: {
              usage: systemStatus.performanceBudgets?.resourceBudgets?.imageSize?.current || 0,
              budget: PERFORMANCE_CONFIG.resources.images.totalPerPage,
              status: systemStatus.performanceBudgets?.resourceBudgets?.imageSize?.status || 'good',
            },
            totalSize: {
              usage: systemStatus.performanceBudgets?.resourceBudgets?.totalPageWeight?.current || 0,
              budget: PERFORMANCE_CONFIG.resources.totalPageWeight.homepage,
              status: systemStatus.performanceBudgets?.resourceBudgets?.totalPageWeight?.status || 'good',
            },
          },
        },
        
        business: {
          revenue: {
            daily: businessMetrics.revenue?.daily || 0,
            weekly: businessMetrics.revenue?.weekly || 0,
            monthly: businessMetrics.revenue?.monthly || 0,
            trend: this.calculateTrend('revenue', businessMetrics.revenue?.daily || 0),
          },
          conversions: {
            inquiries: {
              count: businessMetrics.conversions?.inquiries || 0,
              rate: businessMetrics.conversionRates?.inquiry || 0,
              trend: this.calculateTrend('inquiries', businessMetrics.conversions?.inquiries || 0),
            },
            bookings: {
              count: businessMetrics.conversions?.bookings || 0,
              rate: businessMetrics.conversionRates?.booking || 0,
              trend: this.calculateTrend('bookings', businessMetrics.conversions?.bookings || 0),
            },
            completions: {
              count: businessMetrics.conversions?.completions || 0,
              rate: businessMetrics.conversionRates?.completion || 0,
              trend: this.calculateTrend('completions', businessMetrics.conversions?.completions || 0),
            },
          },
          userEngagement: {
            sessions: businessMetrics.sessionCount || 0,
            bounceRate: businessMetrics.bounceRate || 0,
            averageSessionDuration: businessMetrics.averageSessionDuration || 0,
            pageViews: businessMetrics.pageViews || 0,
          },
          errorRates: {
            javascript: businessMetrics.jsErrorRate || 0,
            api: businessMetrics.apiFailureRate || 0,
            forms: businessMetrics.formSubmissionErrors || 0,
            payment: businessMetrics.paymentProcessingErrors || 0,
          },
        },
        
        infrastructure: {
          database: {
            status: this.mapInfrastructureStatus(systemStatus.systemHealth?.monitoring),
            responseTime: businessMetrics.databaseResponseTime || 0,
            connections: businessMetrics.databaseConnections || 0,
            errorRate: businessMetrics.databaseErrorRate || 0,
          },
          api: {
            status: this.mapInfrastructureStatus(systemStatus.systemHealth?.monitoring),
            responseTime: businessMetrics.apiResponseTime || 0,
            throughput: businessMetrics.apiThroughput || 0,
            errorRate: businessMetrics.apiFailureRate || 0,
          },
          cdn: {
            status: 'up',
            hitRate: businessMetrics.cdnHitRate || 0,
            bandwidth: businessMetrics.cdnBandwidth || 0,
          },
          deployment: {
            status: businessMetrics.lastDeploymentStatus || 'success',
            lastDeployment: businessMetrics.lastDeploymentTime || new Date().toISOString(),
            buildTime: businessMetrics.lastBuildTime || 0,
            version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
          },
        },
        
        alerts: {
          active: systemStatus.activeAlerts?.map(alert => ({
            id: alert.id,
            type: 'performance', // Default type
            severity: alert.severity,
            timestamp: alert.timestamp.toISOString(),
            description: `Alert: ${alert.id}`,
          })) || [],
          resolved: systemStatus.alertHistory?.filter(alert => alert.resolved).map(alert => ({
            id: alert.id,
            type: alert.type,
            severity: alert.severity as 'critical' | 'warning',
            resolvedAt: new Date().toISOString(),
            resolutionTime: alert.resolutionTime || 0,
          })) || [],
          counts: {
            critical: systemStatus.activeAlerts?.filter(alert => alert.severity === 'critical').length || 0,
            warning: systemStatus.activeAlerts?.filter(alert => alert.severity === 'warning').length || 0,
            total: systemStatus.activeAlerts?.length || 0,
          },
        },
        
        geographic: {
          regions: businessMetrics.regionPerformance || {},
          devices: businessMetrics.deviceTypePerformance || {},
        },
      };
      
      // Store current metrics and add to history
      this.currentMetrics = dashboardMetrics;
      this.addToHistory(dashboardMetrics);
      
      // Notify subscribers
      this.notifySubscribers(dashboardMetrics);
      
      return dashboardMetrics;
      
    } catch (error) {
      console.error('Failed to collect dashboard metrics:', error);
      
      // Return fallback metrics
      const fallbackMetrics: DashboardMetrics = this.createFallbackMetrics();
      return fallbackMetrics;
    }
  }
  
  // Subscribe to real-time updates
  subscribe(callback: (metrics: DashboardMetrics) => void, filters?: DashboardSubscription['filters']): string {
    const subscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.subscriptions.set(subscriptionId, {
      id: subscriptionId,
      callback,
      filters,
    });
    
    // Send current metrics immediately if available
    if (this.currentMetrics) {
      callback(this.currentMetrics);
    }
    
    return subscriptionId;
  }
  
  // Unsubscribe from updates
  unsubscribe(subscriptionId: string): boolean {
    return this.subscriptions.delete(subscriptionId);
  }
  
  // Get current metrics
  getCurrentMetrics(): DashboardMetrics | null {
    return this.currentMetrics;
  }
  
  // Get metrics history
  getMetricsHistory(hours: number = 24): DashboardMetrics[] {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.metricsHistory.filter(metrics => 
      new Date(metrics.systemHealth.lastUpdated) > cutoff
    );
  }
  
  // Get performance summary
  getPerformanceSummary() {
    if (!this.currentMetrics) return null;
    
    const metrics = this.currentMetrics;
    const webVitalsCount = Object.values(metrics.performance.webVitals).filter(metric => metric.rating === 'good').length;
    const budgetCompliance = Object.values(metrics.performance.budgetCompliance).filter(budget => budget.status === 'good').length;
    
    return {
      overall: {
        status: metrics.systemHealth.status,
        score: Math.round((webVitalsCount / 5 + budgetCompliance / 4) * 50), // Out of 100
      },
      webVitals: {
        goodMetrics: webVitalsCount,
        totalMetrics: 5,
        compliance: Math.round((webVitalsCount / 5) * 100),
      },
      budgets: {
        compliantBudgets: budgetCompliance,
        totalBudgets: 4,
        compliance: Math.round((budgetCompliance / 4) * 100),
      },
      business: {
        conversionHealth: this.calculateConversionHealth(metrics.business.conversions),
        errorHealth: this.calculateErrorHealth(metrics.business.errorRates),
        engagementHealth: this.calculateEngagementHealth(metrics.business.userEngagement),
      },
    };
  }
  
  // Get alert summary
  getAlertSummary() {
    if (!this.currentMetrics) return null;
    
    const alerts = this.currentMetrics.alerts;
    const last24Hours = this.metricsHistory.slice(-24); // Last 24 data points
    
    return {
      current: alerts.counts,
      trends: {
        critical: this.calculateAlertTrend(last24Hours, 'critical'),
        warning: this.calculateAlertTrend(last24Hours, 'warning'),
      },
      mttr: this.calculateMeanTimeToResolution(alerts.resolved),
      topIssues: this.getTopAlertTypes(last24Hours),
    };
  }
  
  // Start real-time updates
  private startRealTimeUpdates(): void {
    // Update every 30 seconds
    this.updateInterval = setInterval(async () => {
      try {
        await this.collectDashboardMetrics();
      } catch (error) {
        console.error('Real-time update failed:', error);
      }
    }, 30000);
    
    // Initial collection
    this.collectDashboardMetrics().catch(console.error);
  }
  
  // Stop real-time updates
  public stopRealTimeUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
  
  // Notify all subscribers
  private notifySubscribers(metrics: DashboardMetrics): void {
    for (const subscription of this.subscriptions.values()) {
      try {
        // Apply filters if specified
        const filteredMetrics = this.applyFilters(metrics, subscription.filters);
        subscription.callback(filteredMetrics);
      } catch (error) {
        console.error(`Failed to notify subscriber ${subscription.id}:`, error);
      }
    }
  }
  
  // Apply subscription filters
  private applyFilters(metrics: DashboardMetrics, filters?: DashboardSubscription['filters']): DashboardMetrics {
    if (!filters) return metrics;
    
    // Create a copy of metrics to filter
    const filteredMetrics = { ...metrics };
    
    // Filter by business metrics only
    if (filters.businessOnly) {
      return {
        systemHealth: filteredMetrics.systemHealth,
        business: filteredMetrics.business,
        alerts: filteredMetrics.alerts,
      } as DashboardMetrics;
    }
    
    // Filter alerts by severity
    if (filters.severity) {
      filteredMetrics.alerts.active = filteredMetrics.alerts.active.filter(
        alert => filters.severity!.includes(alert.severity)
      );
    }
    
    return filteredMetrics;
  }
  
  // Calculate system health status
  private calculateSystemHealthStatus(systemStatus: any): {
    status: 'healthy' | 'degraded' | 'critical';
    uptime: number;
    issues: string[];
  } {
    const issues: string[] = [];
    let status: 'healthy' | 'degraded' | 'critical' = 'healthy';
    
    // Check active alerts
    if (systemStatus.activeAlerts?.length > 0) {
      const criticalAlerts = systemStatus.activeAlerts.filter((alert: any) => alert.severity === 'critical');
      if (criticalAlerts.length > 0) {
        status = 'critical';
        issues.push(`${criticalAlerts.length} critical alerts active`);
      } else {
        status = 'degraded';
        issues.push(`${systemStatus.activeAlerts.length} warning alerts active`);
      }
    }
    
    // Check performance budget violations
    if (systemStatus.performanceBudgets) {
      const violations = Object.values(systemStatus.performanceBudgets.resourceBudgets || {})
        .filter((budget: any) => budget.status === 'critical');
      if (violations.length > 0) {
        status = status === 'critical' ? 'critical' : 'degraded';
        issues.push(`${violations.length} performance budget violations`);
      }
    }
    
    return {
      status,
      uptime: 99.9, // Calculate actual uptime from monitoring data
      issues,
    };
  }
  
  // Calculate metric trend
  private calculateTrend(metric: string, currentValue: number): 'up' | 'down' | 'stable' {
    if (this.metricsHistory.length < 2) return 'stable';
    
    const previousMetrics = this.metricsHistory[this.metricsHistory.length - 2];
    let previousValue = 0;
    
    // Extract previous value based on metric type
    switch (metric) {
      case 'LCP':
        previousValue = previousMetrics.performance.webVitals.LCP.value;
        break;
      case 'FID':
        previousValue = previousMetrics.performance.webVitals.FID.value;
        break;
      case 'CLS':
        previousValue = previousMetrics.performance.webVitals.CLS.value;
        break;
      case 'FCP':
        previousValue = previousMetrics.performance.webVitals.FCP.value;
        break;
      case 'TTFB':
        previousValue = previousMetrics.performance.webVitals.TTFB.value;
        break;
      case 'revenue':
        previousValue = previousMetrics.business.revenue.daily;
        break;
      case 'inquiries':
        previousValue = previousMetrics.business.conversions.inquiries.count;
        break;
      case 'bookings':
        previousValue = previousMetrics.business.conversions.bookings.count;
        break;
      case 'completions':
        previousValue = previousMetrics.business.conversions.completions.count;
        break;
      default:
        return 'stable';
    }
    
    const changePercent = ((currentValue - previousValue) / previousValue) * 100;
    
    if (Math.abs(changePercent) < 5) return 'stable';
    return changePercent > 0 ? 'up' : 'down';
  }
  
  // Map infrastructure status
  private mapInfrastructureStatus(monitoring: boolean | undefined): 'up' | 'down' | 'degraded' {
    if (monitoring === undefined) return 'down';
    return monitoring ? 'up' : 'degraded';
  }
  
  // Add metrics to history
  private addToHistory(metrics: DashboardMetrics): void {
    this.metricsHistory.push(metrics);
    
    // Keep only last 48 hours of data (assuming 30-second intervals)
    const maxEntries = 48 * 60 * 2; // 48 hours * 60 minutes * 2 (30-second intervals)
    if (this.metricsHistory.length > maxEntries) {
      this.metricsHistory = this.metricsHistory.slice(-maxEntries);
    }
  }
  
  // Create fallback metrics when collection fails
  private createFallbackMetrics(): DashboardMetrics {
    return {
      systemHealth: {
        status: 'degraded',
        uptime: 0,
        lastUpdated: new Date().toISOString(),
        issues: ['Metrics collection failed'],
      },
      performance: {
        webVitals: {
          LCP: { value: 0, rating: 'poor', trend: 'stable' },
          FID: { value: 0, rating: 'poor', trend: 'stable' },
          CLS: { value: 0, rating: 'poor', trend: 'stable' },
          FCP: { value: 0, rating: 'poor', trend: 'stable' },
          TTFB: { value: 0, rating: 'poor', trend: 'stable' },
        },
        lighthouseScore: {
          performance: 0,
          accessibility: 0,
          bestPractices: 0,
          seo: 0,
          timestamp: new Date().toISOString(),
        },
        budgetCompliance: {
          javascript: { usage: 0, budget: 0, status: 'critical' },
          css: { usage: 0, budget: 0, status: 'critical' },
          images: { usage: 0, budget: 0, status: 'critical' },
          totalSize: { usage: 0, budget: 0, status: 'critical' },
        },
      },
      business: {
        revenue: { daily: 0, weekly: 0, monthly: 0, trend: 'stable' },
        conversions: {
          inquiries: { count: 0, rate: 0, trend: 'stable' },
          bookings: { count: 0, rate: 0, trend: 'stable' },
          completions: { count: 0, rate: 0, trend: 'stable' },
        },
        userEngagement: {
          sessions: 0,
          bounceRate: 0,
          averageSessionDuration: 0,
          pageViews: 0,
        },
        errorRates: {
          javascript: 0,
          api: 0,
          forms: 0,
          payment: 0,
        },
      },
      infrastructure: {
        database: { status: 'down', responseTime: 0, connections: 0, errorRate: 0 },
        api: { status: 'down', responseTime: 0, throughput: 0, errorRate: 0 },
        cdn: { status: 'down', hitRate: 0, bandwidth: 0 },
        deployment: {
          status: 'failed',
          lastDeployment: new Date().toISOString(),
          buildTime: 0,
          version: '0.0.0',
        },
      },
      alerts: {
        active: [],
        resolved: [],
        counts: { critical: 0, warning: 0, total: 0 },
      },
      geographic: {
        regions: {},
        devices: {},
      },
    };
  }
  
  // Calculate business health metrics
  private calculateConversionHealth(conversions: DashboardMetrics['business']['conversions']): number {
    const inquiryHealth = Math.min(conversions.inquiries.rate / 10, 1); // 10% target
    const bookingHealth = Math.min(conversions.bookings.rate / 5, 1); // 5% target
    const completionHealth = Math.min(conversions.completions.rate / 80, 1); // 80% target
    
    return Math.round((inquiryHealth + bookingHealth + completionHealth) * 33.33);
  }
  
  private calculateErrorHealth(errorRates: DashboardMetrics['business']['errorRates']): number {
    const maxErrorRate = Math.max(
      errorRates.javascript,
      errorRates.api,
      errorRates.forms,
      errorRates.payment
    );
    
    // Lower error rate = better health
    return Math.max(0, Math.round(100 - (maxErrorRate * 10)));
  }
  
  private calculateEngagementHealth(engagement: DashboardMetrics['business']['userEngagement']): number {
    const bounceRateHealth = Math.max(0, 100 - engagement.bounceRate); // Lower bounce rate = better
    const sessionDurationHealth = Math.min(engagement.averageSessionDuration / 300, 1) * 100; // 5 min target
    
    return Math.round((bounceRateHealth + sessionDurationHealth) / 2);
  }
  
  private calculateAlertTrend(history: DashboardMetrics[], severity: 'critical' | 'warning'): 'up' | 'down' | 'stable' {
    if (history.length < 2) return 'stable';
    
    const recent = history.slice(-12); // Last 12 data points
    const alertCounts = recent.map(metrics => 
      severity === 'critical' ? metrics.alerts.counts.critical : metrics.alerts.counts.warning
    );
    
    const firstHalf = alertCounts.slice(0, Math.floor(alertCounts.length / 2));
    const secondHalf = alertCounts.slice(Math.floor(alertCounts.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, count) => sum + count, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, count) => sum + count, 0) / secondHalf.length;
    
    const changePercent = ((secondAvg - firstAvg) / (firstAvg || 1)) * 100;
    
    if (Math.abs(changePercent) < 10) return 'stable';
    return changePercent > 0 ? 'up' : 'down';
  }
  
  private calculateMeanTimeToResolution(resolvedAlerts: DashboardMetrics['alerts']['resolved']): number {
    if (resolvedAlerts.length === 0) return 0;
    
    const totalResolutionTime = resolvedAlerts.reduce((sum, alert) => sum + alert.resolutionTime, 0);
    return Math.round(totalResolutionTime / resolvedAlerts.length / 60000); // Convert to minutes
  }
  
  private getTopAlertTypes(history: DashboardMetrics[]): Array<{ type: string; count: number }> {
    const alertTypeCounts: Record<string, number> = {};
    
    history.forEach(metrics => {
      metrics.alerts.active.forEach(alert => {
        alertTypeCounts[alert.type] = (alertTypeCounts[alert.type] || 0) + 1;
      });
    });
    
    return Object.entries(alertTypeCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }
}

// Export singleton instance
let dashboardInstance: RealTimeMonitoringDashboard | null = null;

export const getRealTimeMonitoringDashboard = (): RealTimeMonitoringDashboard => {
  if (!dashboardInstance) {
    dashboardInstance = new RealTimeMonitoringDashboard();
  }
  return dashboardInstance;
};

// Export types for use in components
export type { DashboardMetrics, DashboardSubscription };

export default RealTimeMonitoringDashboard;