// CONTEXT7 SOURCE: /websites/nextjs - API route for business intelligence data
// IMPLEMENTATION REASON: Revenue tracking and business analytics endpoint for £400,000+ opportunity

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Revenue intelligence data validation schema
const LeadScoringSchema = z.object({
  id: z.string(),
  score: z.number().min(0).max(100),
  timestamp: z.number(),
  factors: z.object({
    pageValue: z.number(),
    timeOnSite: z.number(),
    engagementLevel: z.number(),
    premiumActions: z.number(),
    deviceQuality: z.number(),
    geographicIndicator: z.number(),
    behavioralSignals: z.number()
  }),
  classification: z.enum(['bronze', 'silver', 'gold', 'platinum', 'royal']),
  revenueProjection: z.number()
});

const RoyalClientMetricsSchema = z.object({
  totalOpportunity: z.number(),
  projectedRevenue: z.number(),
  conversionRate: z.number(),
  averageClientValue: z.number(),
  premiumEngagement: z.object({
    oxbridgeInteractions: z.number(),
    privateSchoolEnquiries: z.number(),
    executiveContacts: z.number(),
    consultationRequests: z.number()
  }),
  serviceMetrics: z.object({
    oneToOneBookings: z.number(),
    groupSessionInterest: z.number(),
    intensiveCourseEnquiries: z.number(),
    examPreparationRequests: z.number()
  })
});

const RevenueDataSchema = z.object({
  type: z.string(),
  data: z.any(),
  leadScore: LeadScoringSchema,
  royalMetrics: RoyalClientMetricsSchema,
  timestamp: z.number(),
  revenueOpportunity: z.number()
});

interface RevenueStorage {
  storeLeadData(leadId: string, data: any): Promise<void>;
  getLeadData(leadId: string): Promise<any>;
  getRevenueMetrics(timeRange: string): Promise<any>;
  updateConversionFunnel(stage: string, data: any): Promise<void>;
}

class InMemoryRevenueStorage implements RevenueStorage {
  private leadStorage = new Map<string, any>();
  private revenueMetrics = new Map<string, any>();
  private conversionFunnel: any[] = [];

  async storeLeadData(leadId: string, data: any): Promise<void> {
    const existing = this.leadStorage.get(leadId) || [];
    this.leadStorage.set(leadId, [...existing, data]);
    
    // Update revenue metrics
    this.updateRevenueMetrics(data);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Revenue Storage] Stored data for lead ${leadId}, opportunity: £${data.revenueOpportunity}`);
    }
  }

  async getLeadData(leadId: string): Promise<any> {
    return this.leadStorage.get(leadId) || [];
  }

  async getRevenueMetrics(timeRange: string): Promise<any> {
    const totalOpportunity = Array.from(this.leadStorage.values())
      .flat()
      .reduce((sum, data) => sum + (data.revenueOpportunity || 0), 0);

    const royalClients = Array.from(this.leadStorage.values())
      .flat()
      .filter(data => data.leadScore?.classification === 'royal').length;

    const conversionData = this.analyzeConversionFunnel();

    return {
      totalOpportunity,
      royalClients,
      activeLeads: this.leadStorage.size,
      conversionData,
      targetProgress: (totalOpportunity / 400000) * 100, // £400k target
      averageLeadValue: this.leadStorage.size > 0 ? totalOpportunity / this.leadStorage.size : 0
    };
  }

  async updateConversionFunnel(stage: string, data: any): Promise<void> {
    this.conversionFunnel.push({
      stage,
      timestamp: Date.now(),
      data
    });
    
    // Keep only last 1000 entries
    if (this.conversionFunnel.length > 1000) {
      this.conversionFunnel = this.conversionFunnel.slice(-1000);
    }
  }

  private updateRevenueMetrics(data: any): void {
    const timestamp = new Date().toISOString().split('T')[0]; // Daily key
    const existing = this.revenueMetrics.get(timestamp) || {
      totalRevenue: 0,
      leadCount: 0,
      royalLeads: 0,
      conversionEvents: 0
    };

    existing.totalRevenue += data.revenueOpportunity || 0;
    existing.leadCount += 1;
    
    if (data.leadScore?.classification === 'royal') {
      existing.royalLeads += 1;
    }

    this.revenueMetrics.set(timestamp, existing);
  }

  private analyzeConversionFunnel(): any {
    const stages = this.conversionFunnel.reduce((acc, item) => {
      acc[item.stage] = (acc[item.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const stageOrder = ['awareness', 'interest', 'consideration', 'intent', 'booking', 'royal_client'];
    const conversionRates: Record<string, number> = {};
    
    for (let i = 0; i < stageOrder.length - 1; i++) {
      const current = stages[stageOrder[i]] || 0;
      const next = stages[stageOrder[i + 1]] || 0;
      conversionRates[`${stageOrder[i]}_to_${stageOrder[i + 1]}`] = current > 0 ? (next / current) * 100 : 0;
    }

    return { stages, conversionRates };
  }
}

const revenueStorage: RevenueStorage = new InMemoryRevenueStorage();

class BusinessIntelligenceProcessor {
  static async processRevenueData(data: any): Promise<any> {
    const insights = {
      leadQuality: this.assessLeadQuality(data.leadScore),
      revenueProjection: this.calculateRevenueProjection(data),
      royalClientPotential: this.assessRoyalClientPotential(data),
      actionableInsights: this.generateActionableInsights(data)
    };

    return insights;
  }

  private static assessLeadQuality(leadScore: any): string {
    if (leadScore.score >= 90) return 'exceptional';
    if (leadScore.score >= 75) return 'high';
    if (leadScore.score >= 60) return 'medium';
    if (leadScore.score >= 40) return 'low';
    return 'very_low';
  }

  private static calculateRevenueProjection(data: any): any {
    const baseValue = data.revenueOpportunity;
    const confidence = Math.min(95, data.leadScore.score * 1.2);
    
    return {
      immediate: baseValue,
      monthly: baseValue * 1.5, // Account for additional services
      annual: baseValue * 2.2,  // Account for renewals and referrals
      confidence: confidence
    };
  }

  private static assessRoyalClientPotential(data: any): boolean {
    const indicators = [
      data.leadScore.classification === 'royal',
      data.royalMetrics.premiumEngagement.oxbridgeInteractions > 0,
      data.leadScore.factors.deviceQuality > 50,
      data.leadScore.factors.pageValue > 10000
    ];

    return indicators.filter(Boolean).length >= 3;
  }

  private static generateActionableInsights(data: any): string[] {
    const insights: string[] = [];
    
    if (data.leadScore.score >= 80) {
      insights.push('High-priority lead - immediate follow-up recommended');
    }
    
    if (data.royalMetrics.premiumEngagement.oxbridgeInteractions > 0) {
      insights.push('Oxbridge interest detected - showcase elite tutors');
    }
    
    if (data.leadScore.factors.timeOnSite > 300) {
      insights.push('Extended engagement - send personalized consultation offer');
    }
    
    if (data.revenueOpportunity > 25000) {
      insights.push('High-value opportunity - assign senior sales specialist');
    }

    return insights;
  }
}

// CONTEXT7 SOURCE: /websites/nextjs - Revenue analytics POST endpoint
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = RevenueDataSchema.parse(body);
    
    const { leadScore, royalMetrics, revenueOpportunity } = validatedData;
    
    // Store lead data
    await revenueStorage.storeLeadData(leadScore.id, validatedData);
    
    // Update conversion funnel if it's a funnel event
    if (validatedData.type === 'funnel_stage') {
      await revenueStorage.updateConversionFunnel(validatedData.data.stage, validatedData.data);
    }
    
    // Process business intelligence
    const businessInsights = await BusinessIntelligenceProcessor.processRevenueData(validatedData);
    
    // Check for high-priority opportunities
    await checkHighPriorityOpportunities(validatedData, businessInsights);
    
    // Log revenue intelligence
    console.log(`[Revenue Intelligence] Lead ${leadScore.id}: £${revenueOpportunity} opportunity, ${leadScore.classification} classification`);
    
    if (businessInsights.royalClientPotential) {
      console.log(`[Revenue Intelligence] 👑 Royal Client Potential Detected: ${leadScore.id}`);
    }

    return NextResponse.json({
      success: true,
      leadId: leadScore.id,
      revenueOpportunity,
      classification: leadScore.classification,
      businessInsights,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('[Revenue Analytics] Error processing revenue data:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid revenue data format',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process revenue data'
    }, { status: 500 });
  }
}

// CONTEXT7 SOURCE: /websites/nextjs - Revenue analytics GET endpoint  
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');
    const timeRange = searchParams.get('timeRange') || '24h';
    const dashboard = searchParams.get('dashboard') === 'true';
    
    // Get specific lead data
    if (leadId && !dashboard) {
      const leadData = await revenueStorage.getLeadData(leadId);
      return NextResponse.json({
        leadId,
        data: leadData,
        count: leadData.length,
        timestamp: Date.now()
      });
    }
    
    // Get dashboard analytics
    if (dashboard) {
      const revenueMetrics = await revenueStorage.getRevenueMetrics(timeRange);
      
      return NextResponse.json({
        timeRange,
        metrics: revenueMetrics,
        performance: {
          target_progress: revenueMetrics.targetProgress,
          target_amount: 400000,
          current_opportunity: revenueMetrics.totalOpportunity,
          royal_clients: revenueMetrics.royalClients,
          conversion_analysis: revenueMetrics.conversionData
        },
        timestamp: Date.now()
      });
    }
    
    // Get system status
    return NextResponse.json({
      status: 'active',
      monitoring: 'revenue_intelligence_system',
      endpoints: {
        store_revenue: 'POST /api/analytics/revenue',
        get_lead: 'GET /api/analytics/revenue?leadId=<id>',
        get_dashboard: 'GET /api/analytics/revenue?dashboard=true'
      },
      revenue_target: '£400,000+',
      supported_classifications: ['bronze', 'silver', 'gold', 'platinum', 'royal'],
      tracking: {
        lead_scoring: 'active',
        conversion_funnel: 'active',
        royal_client_identification: 'active',
        business_intelligence: 'active'
      },
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('[Revenue Analytics] Error retrieving revenue data:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve revenue data'
    }, { status: 500 });
  }
}

async function checkHighPriorityOpportunities(data: any, insights: any): Promise<void> {
  const { leadScore, revenueOpportunity } = data;
  
  // High-priority opportunity thresholds
  const isHighPriority = 
    leadScore.score >= 85 ||
    revenueOpportunity >= 30000 ||
    leadScore.classification === 'royal' ||
    insights.royalClientPotential;
  
  if (isHighPriority) {
    const alert = {
      type: 'HIGH_PRIORITY_OPPORTUNITY',
      leadId: leadScore.id,
      score: leadScore.score,
      classification: leadScore.classification,
      revenueOpportunity,
      royalClientPotential: insights.royalClientPotential,
      actionableInsights: insights.actionableInsights,
      timestamp: Date.now(),
      urgency: leadScore.classification === 'royal' ? 'immediate' : 'high'
    };
    
    console.log('🚨 HIGH-PRIORITY REVENUE OPPORTUNITY 🚨', alert);
    
    // In production, send to sales team notification system
    try {
      // Example webhook to sales system
      if (process.env.SALES_WEBHOOK_URL) {
        await fetch(process.env.SALES_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alert)
        });
      }
    } catch (error) {
      console.error('[Revenue Alert] Failed to send high-priority alert:', error);
    }
  }
}