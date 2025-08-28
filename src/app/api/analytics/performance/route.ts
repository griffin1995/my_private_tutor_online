// CONTEXT7 SOURCE: /vercel/next.js - Next.js API route for performance analytics collection
// IMPLEMENTATION REASON: Official Next.js App Router pattern for handling performance data collection

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// CONTEXT7 SOURCE: /vercel/next.js - Performance metrics validation schema
// VALIDATION REASON: Ensure incoming performance data meets expected structure for analysis
const PerformanceMetricSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.number(),
  rating: z.enum(['good', 'needs-improvement', 'poor']),
  delta: z.number(),
  entries: z.array(z.any()),
  timestamp: z.number(),
  url: z.string().url(),
  userAgent: z.string(),
  connectionType: z.string().optional(),
  effectiveType: z.string().optional(),
  faqComponent: z.string().optional(),
  userType: z.enum(['royal', 'standard', 'accessibility']).optional(),
  searchQuery: z.string().optional(),
  categoryAccessed: z.string().optional(),
  assistiveTech: z.boolean().optional(),
  themeMode: z.enum(['light', 'dark', 'high_contrast']).optional(),
  offlineMode: z.boolean().optional(),
  voiceSearchUsed: z.boolean().optional(),
});

const PerformancePayloadSchema = z.object({
  sessionId: z.string(),
  userType: z.enum(['royal', 'standard', 'accessibility']),
  timestamp: z.number(),
  metrics: z.array(PerformanceMetricSchema),
  metadata: z.object({
    url: z.string().url(),
    userAgent: z.string(),
    connectionType: z.string().optional(),
    effectiveType: z.string().optional(),
  }),
});

// CONTEXT7 SOURCE: /vercel/next.js - Performance data storage interface
// STORAGE REASON: Abstract performance data persistence for different storage backends
interface PerformanceStorage {
  store(sessionId: string, metrics: any[]): Promise<void>;
  getMetrics(sessionId: string): Promise<any[]>;
  getAggregatedMetrics(userType: string, timeRange: string): Promise<any>;
}

// CONTEXT7 SOURCE: /vercel/next.js - In-memory performance storage for development
// MEMORY STORAGE REASON: Simple storage solution for development and testing environments
class InMemoryPerformanceStorage implements PerformanceStorage {
  private storage = new Map<string, any[]>();
  
  async store(sessionId: string, metrics: any[]): Promise<void> {
    const existing = this.storage.get(sessionId) || [];
    this.storage.set(sessionId, [...existing, ...metrics]);
    
    // Log for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance Storage] Stored ${metrics.length} metrics for session ${sessionId}`);
    }
  }
  
  async getMetrics(sessionId: string): Promise<any[]> {
    return this.storage.get(sessionId) || [];
  }
  
  async getAggregatedMetrics(userType: string, timeRange: string): Promise<any> {
    const allMetrics: any[] = [];
    
    for (const metrics of this.storage.values()) {
      allMetrics.push(...metrics.filter(m => m.userType === userType));
    }
    
    return this.aggregateMetrics(allMetrics);
  }
  
  private aggregateMetrics(metrics: any[]): any {
    if (metrics.length === 0) {
      return { count: 0, averages: {}, ratings: {} };
    }
    
    const metricsByName = metrics.reduce((acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = [];
      }
      acc[metric.name].push(metric);
      return acc;
    }, {} as Record<string, any[]>);
    
    const aggregated = {
      count: metrics.length,
      averages: {} as Record<string, number>,
      ratings: {} as Record<string, Record<string, number>>,
      performance_summary: {} as Record<string, any>,
    };
    
    for (const [metricName, metricList] of Object.entries(metricsByName)) {
      // Calculate averages
      const totalValue = metricList.reduce((sum, m) => sum + m.value, 0);
      aggregated.averages[metricName] = totalValue / metricList.length;
      
      // Calculate rating distribution
      const ratings = metricList.reduce((acc, m) => {
        acc[m.rating] = (acc[m.rating] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      aggregated.ratings[metricName] = ratings;
      
      // Performance summary
      aggregated.performance_summary[metricName] = {
        count: metricList.length,
        average: aggregated.averages[metricName],
        min: Math.min(...metricList.map(m => m.value)),
        max: Math.max(...metricList.map(m => m.value)),
        p95: this.calculatePercentile(metricList.map(m => m.value), 95),
        good_ratio: (ratings.good || 0) / metricList.length,
        poor_ratio: (ratings.poor || 0) / metricList.length,
      };
    }
    
    return aggregated;
  }
  
  private calculatePercentile(values: number[], percentile: number): number {
    const sorted = values.sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Performance storage instance
// INSTANCE REASON: Singleton storage instance for FAQ performance data
const performanceStorage: PerformanceStorage = new InMemoryPerformanceStorage();

// CONTEXT7 SOURCE: /vercel/next.js - Performance alerting system
// ALERTING REASON: Monitor performance issues and trigger alerts for royal client SLA violations
class PerformanceAlertSystem {
  private static readonly ROYAL_CLIENT_SLA_THRESHOLDS = {
    FCP: 1000,  // 1 second for First Contentful Paint
    LCP: 1500,  // 1.5 seconds for Largest Contentful Paint
    FID: 50,    // 50ms for First Input Delay
    CLS: 0.05,  // 0.05 for Cumulative Layout Shift
    FAQ_SEARCH_RESPONSE: 100, // 100ms for FAQ search
    FAQ_THEME_TOGGLE: 200,    // 200ms for theme toggle
  };
  
  static checkForAlerts(metrics: any[], userType: string): any[] {
    const alerts: any[] = [];
    
    if (userType !== 'royal') {
      return alerts; // Only alert for royal client SLA violations
    }
    
    for (const metric of metrics) {
      const threshold = this.ROYAL_CLIENT_SLA_THRESHOLDS[metric.name as keyof typeof this.ROYAL_CLIENT_SLA_THRESHOLDS];
      
      if (threshold && metric.value > threshold) {
        alerts.push({
          type: 'sla_violation',
          metric: metric.name,
          threshold: threshold,
          actual: metric.value,
          userType: userType,
          timestamp: metric.timestamp,
          url: metric.url,
          severity: this.getSeverity(metric.value, threshold),
        });
      }
    }
    
    return alerts;
  }
  
  private static getSeverity(actual: number, threshold: number): 'medium' | 'high' | 'critical' {
    const ratio = actual / threshold;
    if (ratio > 3) return 'critical';
    if (ratio > 2) return 'high';
    return 'medium';
  }
  
  static async sendAlerts(alerts: any[]): Promise<void> {
    if (alerts.length === 0) return;
    
    // CONTEXT7 SOURCE: /vercel/next.js - Alert notification system
    // NOTIFICATION REASON: Immediate notification of royal client performance issues
    try {
      for (const alert of alerts) {
        console.warn(`[FAQ Performance Alert] ${alert.severity.toUpperCase()}: ${alert.metric} exceeded ${alert.threshold}ms with ${alert.actual}ms for royal client`);
        
        // In production, this would integrate with monitoring systems like:
        // - Slack notifications
        // - Email alerts  
        // - PagerDuty incidents
        // - Custom monitoring dashboards
        
        if (process.env.NODE_ENV === 'production') {
          // Example integration with external monitoring
          await fetch(process.env['MONITORING_WEBHOOK_URL'] || '', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              alert_type: 'royal_client_sla_violation',
              service: 'faq_system',
              ...alert,
            }),
          }).catch(error => {
            console.error('[Performance Alert] Failed to send monitoring alert:', error);
          });
        }
      }
    } catch (error) {
      console.error('[Performance Alert System] Failed to send alerts:', error);
    }
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Performance analytics POST endpoint
// POST REASON: Accept and process performance metrics from FAQ system monitoring
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // CONTEXT7 SOURCE: /vercel/next.js - Request validation and parsing
    // VALIDATION REASON: Ensure performance data integrity before processing
    const body = await request.json();
    const validatedPayload = PerformancePayloadSchema.parse(body);
    
    const { sessionId, userType, metrics, metadata } = validatedPayload;
    
    // CONTEXT7 SOURCE: /vercel/next.js - Performance data enrichment
    // ENRICHMENT REASON: Add server-side context to performance metrics
    const enrichedMetrics = metrics.map(metric => ({
      ...metric,
      serverTimestamp: Date.now(),
      userType: userType,
      sessionId: sessionId,
      // Add request context
      origin: request.headers.get('origin') || '',
      referer: request.headers.get('referer') || '',
      'user-agent': request.headers.get('user-agent') || '',
    }));
    
    // CONTEXT7 SOURCE: /vercel/next.js - Performance data storage
    // STORAGE REASON: Persist performance metrics for analysis and monitoring
    await performanceStorage.store(sessionId, enrichedMetrics);
    
    // CONTEXT7 SOURCE: /vercel/next.js - Performance alerting
    // ALERTING REASON: Check for royal client SLA violations and trigger alerts
    const alerts = PerformanceAlertSystem.checkForAlerts(enrichedMetrics, userType);
    if (alerts.length > 0) {
      await PerformanceAlertSystem.sendAlerts(alerts);
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Performance analytics logging
    // LOGGING REASON: Track FAQ performance patterns for optimization
    console.log(`[FAQ Performance Analytics] Processed ${metrics.length} metrics for ${userType} client (session: ${sessionId})`);
    
    // Log critical performance issues
    const criticalMetrics = enrichedMetrics.filter(m => m.rating === 'poor');
    if (criticalMetrics.length > 0) {
      console.warn(`[FAQ Performance Analytics] ${criticalMetrics.length} poor performance metrics detected for ${userType} client`);
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Success response
    // RESPONSE REASON: Confirm successful performance data processing
    return NextResponse.json({
      success: true,
      processed: metrics.length,
      alerts: alerts.length,
      sessionId: sessionId,
      timestamp: Date.now(),
    });
    
  } catch (error) {
    console.error('[FAQ Performance Analytics] Error processing performance data:', error);
    
    // CONTEXT7 SOURCE: /vercel/next.js - Error response handling
    // ERROR HANDLING REASON: Graceful error handling for performance monitoring
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid performance data format',
        details: error.errors,
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process performance data',
    }, { status: 500 });
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Performance analytics GET endpoint
// GET REASON: Retrieve performance metrics and aggregated analytics for dashboard
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const userType = searchParams.get('userType') as 'royal' | 'standard' | 'accessibility' | null;
    const timeRange = searchParams.get('timeRange') || '24h';
    const aggregated = searchParams.get('aggregated') === 'true';
    
    // CONTEXT7 SOURCE: /vercel/next.js - Session-specific metrics retrieval
    // SESSION REASON: Get performance metrics for specific user sessions
    if (sessionId && !aggregated) {
      const metrics = await performanceStorage.getMetrics(sessionId);
      return NextResponse.json({
        sessionId,
        metrics,
        count: metrics.length,
        timestamp: Date.now(),
      });
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Aggregated performance analytics
    // AGGREGATION REASON: Provide performance insights across user types and time periods
    if (aggregated && userType) {
      const aggregatedMetrics = await performanceStorage.getAggregatedMetrics(userType, timeRange);
      
      return NextResponse.json({
        userType,
        timeRange,
        aggregated: aggregatedMetrics,
        royal_client_performance: userType === 'royal' ? {
          sla_compliance: this.calculateSLACompliance(aggregatedMetrics),
          critical_issues: this.identifyCriticalIssues(aggregatedMetrics),
        } : undefined,
        timestamp: Date.now(),
      });
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring status
    // STATUS REASON: Provide FAQ performance monitoring system status
    return NextResponse.json({
      status: 'active',
      monitoring: 'faq_system_performance',
      endpoints: {
        store_metrics: 'POST /api/analytics/performance',
        get_session: 'GET /api/analytics/performance?sessionId=<id>',
        get_aggregated: 'GET /api/analytics/performance?aggregated=true&userType=<type>',
      },
      supported_user_types: ['royal', 'standard', 'accessibility'],
      supported_metrics: [
        'FCP', 'LCP', 'FID', 'CLS', 'TTFB', 'INP',
        'FAQ_SEARCH_RESPONSE', 'FAQ_THEME_TOGGLE', 'FAQ_VOICE_SEARCH',
        'FAQ_OFFLINE_SYNC', 'FAQ_ACCESSIBILITY_NAVIGATION'
      ],
      timestamp: Date.now(),
    });
    
  } catch (error) {
    console.error('[FAQ Performance Analytics] Error retrieving performance data:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve performance data',
    }, { status: 500 });
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - SLA compliance calculation helper
// SLA REASON: Calculate royal client SLA compliance metrics for monitoring dashboard
function calculateSLACompliance(aggregatedMetrics: any): any {
  const slaMetrics = ['FCP', 'LCP', 'FID', 'CLS', 'FAQ_SEARCH_RESPONSE'];
  const compliance: Record<string, number> = {};
  
  for (const metric of slaMetrics) {
    const summary = aggregatedMetrics.performance_summary?.[metric];
    if (summary) {
      compliance[metric] = summary.good_ratio || 0;
    }
  }
  
  const overallCompliance = Object.values(compliance).reduce((sum, val) => sum + val, 0) / Object.keys(compliance).length;
  
  return {
    overall: overallCompliance,
    by_metric: compliance,
    meets_royal_sla: overallCompliance >= 0.95, // 95% compliance required for royal clients
  };
}

// CONTEXT7 SOURCE: /vercel/next.js - Critical performance issue identification
// CRITICAL ISSUES REASON: Identify performance problems requiring immediate attention
function identifyCriticalIssues(aggregatedMetrics: any): any[] {
  const criticalIssues: any[] = [];
  
  for (const [metricName, summary] of Object.entries(aggregatedMetrics.performance_summary || {})) {
    const s = summary as any;
    
    if (s.poor_ratio > 0.05) { // More than 5% poor performance
      criticalIssues.push({
        metric: metricName,
        issue: 'high_poor_performance_ratio',
        poor_ratio: s.poor_ratio,
        severity: s.poor_ratio > 0.2 ? 'critical' : 'high',
      });
    }
    
    if (s.p95 > getP95Threshold(metricName)) {
      criticalIssues.push({
        metric: metricName,
        issue: 'p95_threshold_exceeded',
        p95_value: s.p95,
        threshold: getP95Threshold(metricName),
        severity: 'medium',
      });
    }
  }
  
  return criticalIssues;
}

// CONTEXT7 SOURCE: /vercel/next.js - P95 threshold configuration
// THRESHOLD REASON: Define 95th percentile performance thresholds for FAQ system
function getP95Threshold(metricName: string): number {
  const thresholds: Record<string, number> = {
    'FCP': 1800,
    'LCP': 2500,
    'FID': 100,
    'CLS': 0.1,
    'FAQ_SEARCH_RESPONSE': 200,
    'FAQ_THEME_TOGGLE': 400,
    'FAQ_VOICE_SEARCH': 3000,
    'FAQ_OFFLINE_SYNC': 5000,
    'FAQ_ACCESSIBILITY_NAVIGATION': 300,
  };
  
  return thresholds[metricName] || 1000; // Default 1s threshold
}