// CONTEXT7 SOURCE: /websites/nextjs - Client component patterns for real-time dashboards
// CONTEXT7 SOURCE: /datadog/browser-sdk - Real-time monitoring dashboard components
// IMPLEMENTATION REASON: Executive-level business analytics dashboard for royal client insights

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Crown, 
  DollarSign, 
  Users, 
  Target, 
  AlertTriangle,
  BarChart3,
  Activity,
  Clock,
  Trophy
} from 'lucide-react';
import { performanceMonitor } from '@/lib/monitoring/performance-monitoring';
import { revenueIntelligence } from '@/lib/monitoring/revenue-intelligence';

interface DashboardMetrics {
  revenueOpportunity: number;
  royalClientScore: number;
  conversionRate: number;
  performanceScore: number;
  criticalAlerts: number;
  activeLeads: number;
  projectedMonthly: number;
  projectedAnnual: number;
}

interface RealTimeData {
  timestamp: number;
  metrics: DashboardMetrics;
  alerts: any[];
  leadScoring: any;
  funnelData: any;
}

const BusinessIntelligenceDashboard: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // CONTEXT7 SOURCE: /websites/nextjs - useEffect patterns for real-time data
  const fetchDashboardData = useCallback(async () => {
    try {
      // Get performance metrics
      const perfMetrics = performanceMonitor.getCurrentPerformanceMetrics();
      const perfSummary = performanceMonitor.getPerformanceSummary();
      
      // Get revenue intelligence
      const leadScore = revenueIntelligence.getCurrentLeadScore();
      const royalMetrics = revenueIntelligence.getRoyalClientMetrics();
      const projection = revenueIntelligence.getRevenueProjection();
      const funnelData = revenueIntelligence.getFunnelAnalysis();
      
      // Calculate composite metrics
      const metrics: DashboardMetrics = {
        revenueOpportunity: royalMetrics.totalOpportunity,
        royalClientScore: leadScore.score,
        conversionRate: royalMetrics.conversionRate,
        performanceScore: perfSummary.averagePerformance === 'excellent' ? 95 : 
                         perfSummary.averagePerformance === 'good' ? 85 :
                         perfSummary.averagePerformance === 'needs-improvement' ? 65 : 45,
        criticalAlerts: perfSummary.criticalAlerts,
        activeLeads: 1, // Current session
        projectedMonthly: projection.monthly,
        projectedAnnual: projection.annual
      };

      const dashboardData: RealTimeData = {
        timestamp: Date.now(),
        metrics,
        alerts: perfMetrics.alerts.filter(a => a.severity === 'poor'),
        leadScoring: leadScore,
        funnelData
      };

      setRealTimeData(dashboardData);
      setIsLoading(false);
    } catch (error) {
      console.error('Dashboard data fetch failed:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();

    let refreshInterval: NodeJS.Timeout;
    if (autoRefresh) {
      refreshInterval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    }

    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [fetchDashboardData, autoRefresh]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (score >= 90) return 'default';
    if (score >= 75) return 'secondary';
    if (score >= 60) return 'outline';
    return 'destructive';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-muted-foreground">Loading Royal Client Intelligence...</p>
        </div>
      </div>
    );
  }

  if (!realTimeData) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <p>Unable to load dashboard data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { metrics, alerts, leadScoring, funnelData } = realTimeData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Business Intelligence Dashboard</h1>
          <p className="text-muted-foreground">
            Royal client monitoring and £400,000+ revenue opportunity tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={autoRefresh ? 'default' : 'outline'}>
            <Activity className="w-3 h-3 mr-1" />
            {autoRefresh ? 'Live' : 'Paused'}
          </Badge>
          <button 
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Toggle Auto-refresh
          </button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Crown className="w-4 h-4 mr-2 text-yellow-600" />
              Revenue Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {formatCurrency(metrics.revenueOpportunity)}
            </div>
            <p className="text-xs text-muted-foreground">
              Current session value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="w-4 h-4 mr-2 text-blue-600" />
              Royal Client Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(metrics.royalClientScore)}`}>
              {metrics.royalClientScore}/100
            </div>
            <Badge variant={getScoreBadgeVariant(metrics.royalClientScore)} className="text-xs">
              {leadScoring.classification.charAt(0).toUpperCase() + leadScoring.classification.slice(1)}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {metrics.conversionRate.toFixed(1)}%
            </div>
            <Progress value={metrics.conversionRate} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="w-4 h-4 mr-2 text-purple-600" />
              Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(metrics.performanceScore)}`}>
              {metrics.performanceScore}
            </div>
            {metrics.criticalAlerts > 0 && (
              <Badge variant="destructive" className="text-xs">
                {metrics.criticalAlerts} Critical
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Intelligence</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="royal">Royal Clients</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Revenue Projections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Immediate</span>
                  <span className="font-semibold">{formatCurrency(leadScoring.revenueProjection)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly</span>
                  <span className="font-semibold">{formatCurrency(metrics.projectedMonthly)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Annual</span>
                  <span className="font-semibold text-green-600">{formatCurrency(metrics.projectedAnnual)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">£400k Target Progress</span>
                    <span className="text-sm font-semibold">
                      {((metrics.projectedAnnual / 400000) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={(metrics.projectedAnnual / 400000) * 100} 
                    className="h-2 mt-2" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Lead Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Page Value</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(leadScoring.factors.pageValue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Time on Site</span>
                    <span className="text-sm font-medium">
                      {Math.round(leadScoring.factors.timeOnSite)}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Premium Actions</span>
                    <span className="text-sm font-medium">
                      {leadScoring.factors.premiumActions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Device Quality</span>
                    <span className="text-sm font-medium">
                      {leadScoring.factors.deviceQuality}/70
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                  Performance Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {alerts.length === 0 ? (
                  <div className="text-center text-muted-foreground py-4">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p>Excellent performance - no critical alerts</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {alerts.slice(0, 5).map((alert, index) => (
                      <div key={index} className="p-2 bg-red-50 rounded border-l-4 border-red-400">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-red-800">{alert.metric}</span>
                          <Badge variant="destructive">{alert.severity}</Badge>
                        </div>
                        <p className="text-sm text-red-600">
                          Value: {alert.value}ms (Threshold: {alert.threshold}ms)
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-amber-600" />
                  Real-Time Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Overall Performance</span>
                      <span className="text-sm font-medium">{metrics.performanceScore}%</span>
                    </div>
                    <Progress value={metrics.performanceScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Royal Client Experience</span>
                      <span className="text-sm font-medium">
                        {metrics.performanceScore >= 85 ? 'Excellent' : 
                         metrics.performanceScore >= 70 ? 'Good' : 
                         'Needs Improvement'}
                      </span>
                    </div>
                    <Progress value={metrics.performanceScore} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(funnelData.stages).map(([stage, count]) => (
                  <div key={stage} className="flex items-center space-x-4">
                    <div className="w-24 text-sm font-medium capitalize">
                      {stage.replace('_', ' ')}
                    </div>
                    <div className="flex-1">
                      <Progress value={(count as number) * 25} className="h-3" />
                    </div>
                    <div className="w-12 text-sm text-right">
                      {count}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="royal" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-yellow-600" />
                  Royal Client Classification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-yellow-600">
                    {leadScoring.classification === 'royal' ? '👑' : 
                     leadScoring.classification === 'platinum' ? '💎' : 
                     leadScoring.classification === 'gold' ? '🥇' : 
                     leadScoring.classification === 'silver' ? '🥈' : '🥉'}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold capitalize">
                      {leadScoring.classification} Client
                    </h3>
                    <p className="text-muted-foreground">
                      Score: {leadScoring.score}/100
                    </p>
                  </div>
                  <Badge 
                    variant={leadScoring.classification === 'royal' ? 'default' : 'secondary'}
                    className="text-sm"
                  >
                    Revenue Projection: {formatCurrency(leadScoring.revenueProjection)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Premium Service Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Oxbridge Interest</span>
                    <Badge variant="outline">
                      {revenueIntelligence.getRoyalClientMetrics().premiumEngagement.oxbridgeInteractions}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Private School Prep</span>
                    <Badge variant="outline">
                      {revenueIntelligence.getRoyalClientMetrics().premiumEngagement.privateSchoolEnquiries}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Executive Contacts</span>
                    <Badge variant="outline">
                      {revenueIntelligence.getRoyalClientMetrics().premiumEngagement.executiveContacts}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Consultation Requests</span>
                    <Badge variant="outline">
                      {revenueIntelligence.getRoyalClientMetrics().premiumEngagement.consultationRequests}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div>
              Last updated: {new Date(realTimeData.timestamp).toLocaleTimeString()}
            </div>
            <div className="flex items-center space-x-4">
              <span>Session ID: {leadScoring.id.slice(-8)}</span>
              <Badge variant="outline">
                £400,000+ Revenue Opportunity Tracking
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessIntelligenceDashboard;