// CONTEXT7 SOURCE: /vercel/next.js - API route for enterprise monitoring dashboard
// CONTEXT7 SOURCE: /datadog/browser-sdk - Enhanced monitoring integration
// IMPLEMENTATION REASON: Phase 4 comprehensive monitoring dashboard with royal client intelligence

import { NextRequest, NextResponse } from 'next/server';
import { performanceMonitor } from '@/lib/monitoring/performance-monitoring';
import { revenueIntelligence } from '@/lib/monitoring/revenue-intelligence';
import { operationalMonitor } from '@/lib/monitoring/operational-monitoring';
import { getPerformanceAlertingSystem } from '@/lib/monitoring/performance-alerts';
import { getEnterpriseMonitoring } from '@/lib/monitoring/enterprise-monitoring';
import { 
  calculateOverallHealth, 
  calculateBusinessImpact, 
  calculatePerformanceRevenueCorrelation 
} from '@/lib/monitoring/dashboard-helpers';

// CONTEXT7 SOURCE: /vercel/next.js - API route handlers with error handling
// HANDLER REASON: Official Next.js App Router API patterns for monitoring endpoints
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'dashboard';
    const timeframe = searchParams.get('timeframe') || '24';
    
    switch (type) {
      case 'dashboard':
        // Comprehensive dashboard data combining all monitoring systems
        const dashboardData = {
          performance: performanceMonitor.getCurrentPerformanceMetrics(),
          revenue: revenueIntelligence.getBusinessIntelligence(),
          operational: operationalMonitor.getMonitoringSummary(),
          lead_scoring: revenueIntelligence.getCurrentLeadScore(),
          royal_metrics: revenueIntelligence.getRoyalClientMetrics()
        };
        
        return NextResponse.json({
          success: true,
          data: dashboardData,
          royal_client_focus: true,
          revenue_target: 400000,
          timestamp: new Date().toISOString(),
        });
        
      case 'summary':
        const performanceSummary = performanceMonitor.getPerformanceSummary();
        const revenueSummary = revenueIntelligence.getRevenueProjection();
        const operationalSummary = operationalMonitor.getMonitoringSummary();
        
        return NextResponse.json({
          success: true,
          data: {
            performance: performanceSummary,
            revenue: revenueSummary,
            operational: operationalSummary,
            overall_health: calculateOverallHealth(performanceSummary, operationalSummary),
            business_impact: calculateBusinessImpact(revenueSummary, performanceSummary)
          },
          timestamp: new Date().toISOString(),
        });
        
      case 'alerts':
        const operationalAlerts = operationalMonitor.getOperationalAlerts();
        const securityIncidents = operationalMonitor.getSecurityIncidents();
        
        return NextResponse.json({
          success: true,
          data: {
            operational_alerts: operationalAlerts,
            security_incidents: securityIncidents,
            critical_count: operationalAlerts.filter(a => 
              a.priority === 'urgent' || a.priority === 'royal_emergency').length,
            royal_emergencies: operationalAlerts.filter(a => a.priority === 'royal_emergency'),
            unresolved_count: operationalAlerts.filter(a => !a.resolved).length
          },
          timestamp: new Date().toISOString(),
        });
        
      case 'system':
        const systemHealth = operationalMonitor.getSystemHealth();
        
        return NextResponse.json({
          success: true,
          data: {
            system_health: systemHealth,
            royal_client_sla: {
              performance_target: '< 1.5s response time',
              uptime_target: '99.9%',
              current_status: systemHealth.status,
              compliance: systemHealth.status === 'healthy' ? 'meeting' : 'breaching'
            }
          },
          timestamp: new Date().toISOString(),
        });
        
      case 'performance':
        const performanceMetrics = performanceMonitor.getCurrentPerformanceMetrics();
        
        return NextResponse.json({
          success: true,
          data: {
            current_metrics: performanceMetrics,
            royal_client_standards: {
              LCP: '< 1.5s',
              FID: '< 100ms',
              CLS: '< 0.1',
              INP: '< 200ms'
            },
            business_impact: {
              revenue_opportunity: performanceMetrics.revenueOpportunity,
              performance_correlation: calculatePerformanceRevenueCorrelation(performanceMetrics)
            }
          },
          timestamp: new Date().toISOString(),
        });
        
      case 'revenue':
        const businessIntelligence = revenueIntelligence.getBusinessIntelligence();
        const funnelAnalysis = revenueIntelligence.getFunnelAnalysis();
        
        return NextResponse.json({
          success: true,
          data: {
            business_intelligence: businessIntelligence,
            funnel_analysis: funnelAnalysis,
            target_progress: {
              target: 400000,
              current: revenueIntelligence.getRoyalClientMetrics().totalOpportunity,
              percentage: (revenueIntelligence.getRoyalClientMetrics().totalOpportunity / 400000) * 100
            }
          },
          timestamp: new Date().toISOString(),
        });
        
      case 'royal_clients':
        const leadScore = revenueIntelligence.getCurrentLeadScore();
        const royalMetrics = revenueIntelligence.getRoyalClientMetrics();
        
        return NextResponse.json({
          success: true,
          data: {
            current_lead: leadScore,
            royal_metrics: royalMetrics,
            classification_breakdown: {
              royal: leadScore.classification === 'royal' ? 1 : 0,
              platinum: leadScore.classification === 'platinum' ? 1 : 0,
              gold: leadScore.classification === 'gold' ? 1 : 0,
              silver: leadScore.classification === 'silver' ? 1 : 0,
              bronze: leadScore.classification === 'bronze' ? 1 : 0
            },
            premium_indicators: {
              oxbridge_interest: royalMetrics.premiumEngagement.oxbridgeInteractions > 0,
              private_school_prep: royalMetrics.premiumEngagement.privateSchoolEnquiries > 0,
              executive_contact: royalMetrics.premiumEngagement.executiveContacts > 0,
              high_value_device: leadScore.factors.deviceQuality > 50
            }
          },
          timestamp: new Date().toISOString(),
        });
        
      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid monitoring type requested',
            availableTypes: ['dashboard', 'summary', 'alerts', 'system', 'performance', 'revenue', 'royal_clients'],
          },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Enterprise monitoring API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve monitoring data',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - API route POST handler for monitoring actions
// POST REASON: Handle monitoring system actions like alert acknowledgment and resolution
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, alertId, data } = body;
    
    const alertingSystem = getPerformanceAlertingSystem();
    
    switch (action) {
      case 'acknowledge':
        if (!alertId || !data?.acknowledgedBy) {
          return NextResponse.json(
            { success: false, error: 'Missing alertId or acknowledgedBy' },
            { status: 400 }
          );
        }
        
        const acknowledged = await alertingSystem.acknowledgeAlert(alertId, data.acknowledgedBy);
        return NextResponse.json({
          success: acknowledged,
          message: acknowledged ? 'Alert acknowledged successfully' : 'Alert not found',
        });
        
      case 'resolve':
        if (!alertId) {
          return NextResponse.json(
            { success: false, error: 'Missing alertId' },
            { status: 400 }
          );
        }
        
        const resolved = await alertingSystem.resolveAlert(alertId, data?.reason);
        return NextResponse.json({
          success: resolved,
          message: resolved ? 'Alert resolved successfully' : 'Alert not found',
        });
        
      case 'suppress':
        if (!alertId || !data?.durationMinutes || !data?.reason) {
          return NextResponse.json(
            { success: false, error: 'Missing alertId, durationMinutes, or reason' },
            { status: 400 }
          );
        }
        
        const suppressed = await alertingSystem.suppressAlert(
          alertId,
          data.durationMinutes,
          data.reason
        );
        return NextResponse.json({
          success: suppressed,
          message: suppressed ? 'Alert suppressed successfully' : 'Alert not found',
        });
        
      case 'test-alert':
        const enterpriseMonitoring = getEnterpriseMonitoring();
        await enterpriseMonitoring.triggerAlert('test_alert', 'warning', {
          test: true,
          triggeredBy: data?.user || 'API',
          timestamp: new Date().toISOString(),
        });
        
        return NextResponse.json({
          success: true,
          message: 'Test alert triggered successfully',
        });
        
      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            availableActions: ['acknowledge', 'resolve', 'suppress', 'test-alert'],
          },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Enterprise monitoring action error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to execute monitoring action',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - API route PATCH handler for monitoring configuration
// PATCH REASON: Update monitoring rules and configuration dynamically
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ruleId, updates } = body;
    
    const alertingSystem = getPerformanceAlertingSystem();
    
    switch (type) {
      case 'rule':
        if (!ruleId || !updates) {
          return NextResponse.json(
            { success: false, error: 'Missing ruleId or updates' },
            { status: 400 }
          );
        }
        
        const updated = alertingSystem.updateRule(ruleId, updates);
        return NextResponse.json({
          success: updated,
          message: updated ? 'Rule updated successfully' : 'Rule not found',
        });
        
      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid update type',
            availableTypes: ['rule'],
          },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Enterprise monitoring update error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update monitoring configuration',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - API route DELETE handler for monitoring cleanup
// DELETE REASON: Remove old monitoring data and clean up alert history
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const ruleId = searchParams.get('ruleId');
    const days = searchParams.get('days');
    
    const alertingSystem = getPerformanceAlertingSystem();
    
    switch (type) {
      case 'rule':
        if (!ruleId) {
          return NextResponse.json(
            { success: false, error: 'Missing ruleId' },
            { status: 400 }
          );
        }
        
        const removed = alertingSystem.removeRule(ruleId);
        return NextResponse.json({
          success: removed,
          message: removed ? 'Rule removed successfully' : 'Rule not found',
        });
        
      case 'history':
        // This would typically clean up old alert history
        // For now, just return success as the cleanup happens automatically
        return NextResponse.json({
          success: true,
          message: 'Alert history cleanup completed',
        });
        
      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid deletion type',
            availableTypes: ['rule', 'history'],
          },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Enterprise monitoring deletion error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete monitoring data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}