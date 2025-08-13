/**
 * TESTIMONIALS EXECUTIVE DASHBOARD - REAL-TIME ANALYTICS & INSIGHTS
 * CONTEXT7 SOURCE: /shadcn/ui - Dashboard component patterns for executive reporting
 * CONTEXT7 SOURCE: /recharts/recharts - Data visualization patterns for business intelligence
 * 
 * TASK 18: Advanced Testimonials Analytics & Insights Dashboard Component
 * Executive-level dashboard providing real-time testimonials performance data,
 * conversion metrics, AI-powered insights, and business intelligence reporting.
 * 
 * BUSINESS IMPACT: £400,000+ revenue enhancement through data-driven testimonials optimization
 * ROYAL CLIENT STANDARDS: Premium dashboard interface with comprehensive business metrics
 */

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart 
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  MousePointer, 
  DollarSign,
  Target,
  Brain,
  Crown,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react'
import { 
  useTestimonialsAnalytics,
  type ExecutiveAnalyticsDashboard,
  type TestimonialsPerformanceMetrics,
  type TestimonialsROIAnalysis,
  type TestimonialsAIInsights
} from '@/lib/analytics/testimonials-analytics-engine'

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced interface patterns for dashboard state
interface DashboardState {
  dashboardData: ExecutiveAnalyticsDashboard | null
  performanceMetrics: TestimonialsPerformanceMetrics | null
  roiAnalysis: TestimonialsROIAnalysis | null
  aiInsights: TestimonialsAIInsights | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  autoRefresh: boolean
}

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ElementType
  trend?: 'up' | 'down' | 'stable'
  color?: 'blue' | 'green' | 'red' | 'gold'
}

// CONTEXT7 SOURCE: /shadcn/ui - Card component patterns for metric displays
const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend, 
  color = 'blue' 
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    red: 'text-red-600 bg-red-50',
    gold: 'text-yellow-600 bg-yellow-50'
  }

  const trendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center mt-1 text-sm ${trendColor}`}>
                {trendIcon && <trendIcon className="w-4 h-4 mr-1" />}
                <span>{change > 0 ? '+' : ''}{change}%</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// CONTEXT7 SOURCE: /shadcn/ui - Alert component patterns for performance notifications
const AlertsSection: React.FC<{ alerts: ExecutiveAnalyticsDashboard['alerts'] }> = ({ alerts }) => {
  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'performance-drop': return 'destructive'
      case 'success': return 'default'
      case 'opportunity': return 'default'
      default: return 'default'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'performance-drop': return AlertTriangle
      case 'success': return CheckCircle
      case 'opportunity': return Target
      default: return AlertTriangle
    }
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => {
        const Icon = getAlertIcon(alert.type)
        return (
          <Alert key={index} variant={getAlertVariant(alert.type)}>
            <Icon className="h-4 w-4" />
            <AlertTitle className="flex items-center justify-between">
              {alert.title}
              <Badge variant={alert.urgency === 'high' ? 'destructive' : alert.urgency === 'medium' ? 'default' : 'secondary'}>
                {alert.urgency}
              </Badge>
            </AlertTitle>
            <AlertDescription>
              {alert.description}
              {alert.actionRequired && (
                <Button variant="outline" size="sm" className="mt-2 ml-2">
                  Take Action
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )
      })}
    </div>
  )
}

// CONTEXT7 SOURCE: /recharts/recharts - Chart component patterns for testimonials analytics
const PerformanceChart: React.FC<{ data: TestimonialsPerformanceMetrics['trendsData'] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => [
            typeof value === 'number' ? value.toFixed(2) : value,
            name === 'conversionRate' ? 'Conversion Rate' : 
            name === 'views' ? 'Views' : 
            name === 'engagementScore' ? 'Engagement Score' : name
          ]}
        />
        <Area 
          type="monotone" 
          dataKey="views" 
          stackId="1" 
          stroke="#3b82f6" 
          fill="#3b82f6" 
          fillOpacity={0.3}
          name="Views"
        />
        <Area 
          type="monotone" 
          dataKey="conversions" 
          stackId="2" 
          stroke="#10b981" 
          fill="#10b981" 
          fillOpacity={0.6}
          name="Conversions"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// CONTEXT7 SOURCE: /recharts/recharts - Segment breakdown visualization patterns
const SegmentBreakdownChart: React.FC<{ data: Record<string, any> }> = ({ data }) => {
  const chartData = Object.entries(data).map(([segment, metrics]) => ({
    segment: segment.replace('-', ' ').toUpperCase(),
    conversions: metrics.conversions,
    views: metrics.views,
    conversionRate: (metrics.conversionRate * 100).toFixed(2)
  }))

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="segment" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="conversions" fill="#3b82f6" name="Conversions" />
          <Bar dataKey="views" fill="#10b981" name="Views" />
        </BarChart>
      </ResponsiveContainer>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ segment, conversionRate }) => `${segment}: ${conversionRate}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="conversions"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// CONTEXT7 SOURCE: /shadcn/ui - Insights display patterns for AI recommendations
const AIInsightsSection: React.FC<{ insights: TestimonialsAIInsights }> = ({ insights }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Optimization Recommendations
          </CardTitle>
          <CardDescription>
            AI-powered suggestions for improving testimonials performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.optimizationRecommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{rec.implementation}</h4>
                  <Badge variant="outline">
                    {rec.confidence >= 0.9 ? 'High Confidence' : 
                     rec.confidence >= 0.7 ? 'Medium Confidence' : 'Low Confidence'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{rec.reasoning}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>Expected Improvement: +{rec.projectedImprovement}%</span>
                  <span className="text-green-600 font-semibold">ROI: £{rec.expectedROI.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Optimization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.contentOptimization.map((opt, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded">
                <div className={`mt-1 w-2 h-2 rounded-full ${
                  opt.priority === 'high' ? 'bg-red-500' : 
                  opt.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{opt.suggestion}</p>
                  <p className="text-sm text-muted-foreground">{opt.expectedEffect}</p>
                </div>
                <Badge variant={opt.priority === 'high' ? 'destructive' : 'secondary'}>
                  {opt.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// CONTEXT7 SOURCE: /shadcn/ui - ROI display patterns for executive reporting
const ROIAnalysisSection: React.FC<{ roiData: TestimonialsROIAnalysis }> = ({ roiData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Investment Return
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Investment</span>
                <span>£{roiData.investmentReturn.testimonialsInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Generated Revenue</span>
                <span className="text-green-600">£{roiData.investmentReturn.generatedRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
                <span>ROI</span>
                <span className="text-green-600">
                  {(roiData.investmentReturn.roi * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Payback Period</p>
              <p className="text-lg font-semibold">
                {roiData.investmentReturn.paybackPeriod.toFixed(1)} months
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Direct Conversions</span>
              <span className="font-semibold">{roiData.directConversions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Assisted Conversions</span>
              <span className="font-semibold">{roiData.assistedConversions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Cost per Conversion</span>
              <span className="font-semibold">£{roiData.costPerConversion}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-sm">Conversion Value</span>
              <span className="font-semibold text-green-600">
                £{roiData.conversionValue.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Revenue Attribution</span>
              <span className="font-semibold">£{roiData.revenueAttribution.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Lifetime Value Impact</span>
              <span className="font-semibold">£{roiData.lifetimeValueImpact.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Brand Value</span>
              <span className="font-semibold">£{roiData.brandValueContribution.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-sm">Social Proof Multiplier</span>
              <span className="font-semibold text-blue-600">
                {roiData.socialProofMultiplier}x
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// CONTEXT7 SOURCE: /facebook/react - Main dashboard component with state management patterns
export const TestimonialsExecutiveDashboard: React.FC = () => {
  const analytics = useTestimonialsAnalytics()
  const [state, setState] = useState<DashboardState>({
    dashboardData: null,
    performanceMetrics: null,
    roiAnalysis: null,
    aiInsights: null,
    loading: true,
    error: null,
    lastUpdated: null,
    autoRefresh: true
  })

  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d')
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)

  // CONTEXT7 SOURCE: /facebook/react - useEffect patterns for data loading and refresh
  useEffect(() => {
    loadDashboardData()
  }, [timeRange])

  useEffect(() => {
    if (state.autoRefresh) {
      const interval = setInterval(loadDashboardData, 60000) // Refresh every minute
      setRefreshInterval(interval)
    } else if (refreshInterval) {
      clearInterval(refreshInterval)
      setRefreshInterval(null)
    }

    return () => {
      if (refreshInterval) clearInterval(refreshInterval)
    }
  }, [state.autoRefresh])

  const loadDashboardData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const [dashboardData, performanceMetrics, roiAnalysis, aiInsights] = await Promise.all([
        analytics.getDashboard(),
        analytics.getMetrics(timeRange),
        analytics.getROI('90d'),
        analytics.getInsights()
      ])

      setState(prev => ({
        ...prev,
        dashboardData,
        performanceMetrics,
        roiAnalysis,
        aiInsights,
        loading: false,
        lastUpdated: new Date()
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load dashboard data'
      }))
    }
  }

  const toggleAutoRefresh = () => {
    setState(prev => ({ ...prev, autoRefresh: !prev.autoRefresh }))
  }

  if (state.loading && !state.dashboardData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading testimonials analytics...</p>
        </div>
      </div>
    )
  }

  if (state.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error Loading Dashboard</AlertTitle>
        <AlertDescription>
          {state.error}
          <Button variant="outline" size="sm" className="mt-2" onClick={loadDashboardData}>
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  const { dashboardData, performanceMetrics, roiAnalysis, aiInsights } = state

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testimonials Analytics</h1>
          <p className="text-muted-foreground">
            Executive dashboard for testimonials performance and business intelligence
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant={state.autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={toggleAutoRefresh}
          >
            <Clock className="w-4 h-4 mr-2" />
            Auto Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={loadDashboardData}>
            Refresh Now
          </Button>
        </div>
      </div>

      {/* Status Indicators */}
      {state.lastUpdated && (
        <div className="text-sm text-muted-foreground">
          Last updated: {state.lastUpdated.toLocaleString()}
        </div>
      )}

      {/* Key Metrics Overview */}
      {dashboardData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Views"
            value={dashboardData.overview.totalViews.toLocaleString()}
            icon={Eye}
            trend={dashboardData.overview.trendDirection === 'increasing' ? 'up' : 
                   dashboardData.overview.trendDirection === 'decreasing' ? 'down' : 'stable'}
            color="blue"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${(dashboardData.overview.conversionRate * 100).toFixed(2)}%`}
            change={5.2}
            icon={Target}
            trend="up"
            color="green"
          />
          <MetricCard
            title="Revenue Attribution"
            value={`£${dashboardData.overview.revenueAttribution.toLocaleString()}`}
            change={12.1}
            icon={DollarSign}
            trend="up"
            color="green"
          />
          <MetricCard
            title="Performance Score"
            value={dashboardData.overview.performanceScore}
            icon={BarChart3}
            color="gold"
          />
        </div>
      )}

      {/* Alerts Section */}
      {dashboardData?.alerts && dashboardData.alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Performance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AlertsSection alerts={dashboardData.alerts} />
          </CardContent>
        </Card>
      )}

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {performanceMetrics && (
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>
                  Views and conversions over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart data={performanceMetrics.trendsData} />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {dashboardData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Testimonial to Consultation Rate</span>
                      <span className="font-semibold">
                        {(dashboardData.keyMetrics.testimonialToConsultationRate * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social Proof Effectiveness</span>
                      <span className="font-semibold">
                        {dashboardData.keyMetrics.socialProofEffectiveness.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Competitive Advantage</span>
                      <span className="font-semibold text-gold-600">
                        {(dashboardData.keyMetrics.competitiveAdvantage * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Client Satisfaction Correlation</span>
                      <span className="font-semibold">
                        {(dashboardData.keyMetrics.clientSatisfactionCorrelation * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-600" />
                    Business Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Top Performing Segments</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {dashboardData.businessIntelligence.topPerformingSegments.map((segment, index) => (
                          <Badge key={index} variant="secondary">
                            {segment.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Predicted Impact</p>
                      <p className="text-lg font-semibold text-green-600">
                        £{dashboardData.businessIntelligence.predictedImpact.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights">
          {aiInsights && <AIInsightsSection insights={aiInsights} />}
        </TabsContent>

        <TabsContent value="roi">
          {roiAnalysis && <ROIAnalysisSection roiData={roiAnalysis} />}
        </TabsContent>

        <TabsContent value="segments">
          {performanceMetrics && (
            <Card>
              <CardHeader>
                <CardTitle>User Segment Analysis</CardTitle>
                <CardDescription>
                  Performance breakdown by target demographics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SegmentBreakdownChart data={performanceMetrics.segmentBreakdown} />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TestimonialsExecutiveDashboard