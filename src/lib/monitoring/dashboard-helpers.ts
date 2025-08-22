// CONTEXT7 SOURCE: /websites/nextjs - Business intelligence helper functions
// IMPLEMENTATION REASON: Phase 4 monitoring dashboard calculation utilities

export function calculateOverallHealth(performanceSummary: any, operationalSummary: any): string {
  const performanceScore = performanceSummary.averagePerformance === 'excellent' ? 100 : 
                          performanceSummary.averagePerformance === 'good' ? 85 :
                          performanceSummary.averagePerformance === 'needs-improvement' ? 65 : 45;
  
  const operationalScore = operationalSummary.systemHealth.status === 'healthy' ? 100 :
                          operationalSummary.systemHealth.status === 'degraded' ? 70 :
                          operationalSummary.systemHealth.status === 'critical' ? 40 : 10;
  
  const overallScore = (performanceScore + operationalScore) / 2;
  
  if (overallScore >= 90) return 'excellent';
  if (overallScore >= 75) return 'good';
  if (overallScore >= 60) return 'fair';
  return 'poor';
}

export function calculateBusinessImpact(revenueSummary: any, performanceSummary: any): any {
  const baseRevenue = revenueSummary.immediate || 0;
  
  // Performance impacts revenue
  let performanceMultiplier = 1.0;
  if (performanceSummary.averagePerformance === 'excellent') performanceMultiplier = 1.2;
  else if (performanceSummary.averagePerformance === 'good') performanceMultiplier = 1.1;
  else if (performanceSummary.averagePerformance === 'needs-improvement') performanceMultiplier = 0.9;
  else performanceMultiplier = 0.7;
  
  return {
    revenue_at_risk: performanceMultiplier < 1.0 ? baseRevenue * (1 - performanceMultiplier) : 0,
    revenue_opportunity: baseRevenue * performanceMultiplier,
    performance_impact: Math.round((performanceMultiplier - 1) * 100),
    royal_client_risk: performanceSummary.criticalAlerts > 0 ? 'high' : 'low'
  };
}

export function calculatePerformanceRevenueCorrelation(performanceMetrics: any): number {
  // Simple correlation: better performance = higher revenue opportunity
  const revenueOpportunity = performanceMetrics.revenueOpportunity || 0;
  const alertCount = performanceMetrics.alerts?.length || 0;
  
  // Base correlation, reduced by performance issues
  let correlation = 0.8;
  correlation -= (alertCount * 0.1);
  
  return Math.max(0, Math.min(1, correlation));
}