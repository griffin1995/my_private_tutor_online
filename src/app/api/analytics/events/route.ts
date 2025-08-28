// CONTEXT7 SOURCE: /vercel/next.js - API Route for business analytics event collection
// BUSINESS ANALYTICS REASON: Server-side endpoint for custom event tracking and analysis
// CONTEXT7 SOURCE: /vercel/next.js - POST request handling with event aggregation
// IMPLEMENTATION: Premium tutoring service analytics with conversion tracking

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Business analytics event interface
interface BusinessAnalyticsEvent {
  event: string;
  category: 'engagement' | 'conversion' | 'navigation' | 'error' | 'performance';
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, string | number | boolean>;
  timestamp: number;
  sessionId: string;
  pageUrl: string;
  userId?: string;
}

// Session summary interface
interface SessionSummary {
  sessionId: string;
  duration: number;
  pageViews: number;
  eventCount: number;
  events: BusinessAnalyticsEvent[];
}

// Analytics payload interface
interface AnalyticsPayload {
  events: BusinessAnalyticsEvent[];
  session: SessionSummary;
  timestamp: number;
}

// Event processing configuration
const EVENT_CONFIG = {
  // Important conversion events
  CONVERSION_EVENTS: [
    'inquiry_form_submit',
    'inquiry_form_success',
    'bootcamp_register_complete',
    'phone_call_click',
    'email_click',
  ],
  
  // Engagement scoring weights
  ENGAGEMENT_WEIGHTS: {
    page_view: 1,
    section_view: 2,
    service_tier_view: 3,
    video_play: 5,
    video_complete: 10,
    testimonial_view: 3,
    royal_endorsement_view: 4,
    inquiry_form_start: 8,
    inquiry_form_submit: 15,
    bootcamp_register_complete: 20,
  },
  
  // Session quality thresholds
  QUALITY_THRESHOLDS: {
    MIN_SESSION_DURATION: 30 * 1000,      // 30 seconds
    MIN_PAGE_VIEWS: 2,
    MIN_ENGAGEMENT_EVENTS: 3,
    HIGH_VALUE_DURATION: 5 * 60 * 1000,   // 5 minutes
  },
} as const;

// CONTEXT7 SOURCE: /vercel/next.js - POST endpoint for analytics events processing
export async function POST(request: NextRequest) {
  try {
    const payload: AnalyticsPayload = await request.json();
    
    // Validate payload
    if (!payload.events || !payload.session || !payload.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields: events, session, timestamp' },
        { status: 400 }
      );
    }
    
    // Get request context
    const headersList = await headers();
    const clientIP = headersList.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const country = headersList.get('x-vercel-ip-country') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    
    // Process and enrich events
    const processedEvents = payload.events.map(event => ({
      ...event,
      clientIP,
      country,
      userAgent,
      processingTimestamp: Date.now(),
    }));
    
    // Analyze session data
    const sessionAnalysis = analyzeSession(payload.session, processedEvents);
    
    // Extract business insights
    const businessInsights = extractBusinessInsights(processedEvents);
    
    // Store events (in production, this would go to analytics database)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Business Analytics]', {
        sessionId: payload.session.sessionId,
        eventCount: payload.events.length,
        sessionDuration: payload.session.duration,
        analysis: sessionAnalysis,
        insights: businessInsights,
      });
    }
    
    // Send to external analytics services
    await Promise.allSettled([
      sendToAnalyticsServices(processedEvents, sessionAnalysis),
      updateConversionTracking(processedEvents),
      updateEngagementScoring(payload.session, processedEvents),
    ]);
    
    return NextResponse.json({
      success: true,
      processed: {
        events: payload.events.length,
        sessionId: payload.session.sessionId,
      },
      analysis: sessionAnalysis,
      insights: businessInsights,
      timestamp: Date.now(),
    });
    
  } catch (error) {
    console.error('[Analytics API] Error processing events:', error);
    
    return NextResponse.json(
      { error: 'Failed to process analytics events' },
      { status: 500 }
    );
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - GET endpoint for analytics insights retrieval
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('sessionId');
    const timeRange = url.searchParams.get('timeRange') || '24h';
    const metric = url.searchParams.get('metric') || 'all';
    
    // Mock analytics data for development
    // In production, query from analytics database
    const mockData = {
      timeRange,
      metric,
      conversions: {
        inquiries: { count: 23, rate: 0.12, trend: '+15%' },
        bootcamp_registrations: { count: 8, rate: 0.04, trend: '+8%' },
        phone_calls: { count: 15, rate: 0.08, trend: '+22%' },
      },
      engagement: {
        avgSessionDuration: 4.2 * 60 * 1000, // 4.2 minutes
        avgPageViews: 3.8,
        bounceRate: 0.35,
        returnVisitorRate: 0.28,
      },
      topPages: [
        { page: '/', views: 1250, conversionRate: 0.15 },
        { page: '/services', views: 890, conversionRate: 0.22 },
        { page: '/bootcamps', views: 456, conversionRate: 0.18 },
        { page: '/about', views: 378, conversionRate: 0.05 },
      ],
      performance: {
        avgLoadTime: 1.2,
        coreWebVitalsScore: 95,
        userSatisfactionIndex: 0.88,
      },
      timestamp: Date.now(),
    };
    
    if (sessionId) {
      mockData.sessionId = sessionId;
    }
    
    return NextResponse.json(mockData);
    
  } catch (error) {
    console.error('[Analytics API] Error retrieving insights:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve analytics insights' },
      { status: 500 }
    );
  }
}

// Analyze session data for insights
function analyzeSession(session: SessionSummary, events: any[]) {
  const { duration, pageViews, eventCount } = session;
  
  const analysis = {
    quality: 'low' as 'low' | 'medium' | 'high',
    engagementScore: 0,
    conversionPotential: 'low' as 'low' | 'medium' | 'high',
    behaviorPattern: 'explorer' as 'explorer' | 'researcher' | 'converter' | 'bouncer',
    insights: [] as string[],
  };
  
  // Calculate engagement score
  let engagementScore = 0;
  events.forEach(event => {
    const weight = EVENT_CONFIG.ENGAGEMENT_WEIGHTS[event.event as keyof typeof EVENT_CONFIG.ENGAGEMENT_WEIGHTS] || 1;
    engagementScore += weight;
  });
  analysis.engagementScore = engagementScore;
  
  // Determine session quality
  if (duration >= EVENT_CONFIG.QUALITY_THRESHOLDS.HIGH_VALUE_DURATION) {
    analysis.quality = 'high';
    analysis.insights.push('High-value session with extended engagement');
  } else if (
    duration >= EVENT_CONFIG.QUALITY_THRESHOLDS.MIN_SESSION_DURATION &&
    pageViews >= EVENT_CONFIG.QUALITY_THRESHOLDS.MIN_PAGE_VIEWS
  ) {
    analysis.quality = 'medium';
  } else {
    analysis.quality = 'low';
    if (duration < EVENT_CONFIG.QUALITY_THRESHOLDS.MIN_SESSION_DURATION) {
      analysis.insights.push('Short session duration may indicate bounce');
    }
  }
  
  // Determine conversion potential
  const conversionEvents = events.filter(e => EVENT_CONFIG.CONVERSION_EVENTS.includes(e.event));
  if (conversionEvents.length > 0) {
    analysis.conversionPotential = 'high';
    analysis.insights.push('Session includes conversion events');
  } else if (engagementScore > 20) {
    analysis.conversionPotential = 'medium';
    analysis.insights.push('High engagement suggests conversion potential');
  }
  
  // Determine behavior pattern
  if (conversionEvents.length > 0) {
    analysis.behaviorPattern = 'converter';
  } else if (pageViews > 4 && events.filter(e => e.category === 'engagement').length > 5) {
    analysis.behaviorPattern = 'researcher';
  } else if (pageViews > 2) {
    analysis.behaviorPattern = 'explorer';
  } else {
    analysis.behaviorPattern = 'bouncer';
  }
  
  return analysis;
}

// Extract business insights from events
function extractBusinessInsights(events: any[]) {
  const insights = {
    popularServices: {} as Record<string, number>,
    conversionFunnel: {
      awareness: 0,
      interest: 0,
      consideration: 0,
      intent: 0,
      purchase: 0,
    },
    errorPatterns: [] as string[],
    deviceInsights: [] as string[],
  };
  
  events.forEach(event => {
    // Track service tier popularity
    if (event.event === 'service_tier_view' && event.metadata?.tier) {
      const tier = event.metadata.tier as string;
      insights.popularServices[tier] = (insights.popularServices[tier] || 0) + 1;
    }
    
    // Map events to conversion funnel
    switch (event.event) {
      case 'page_view':
        insights.conversionFunnel.awareness++;
        break;
      case 'service_tier_view':
      case 'testimonial_view':
        insights.conversionFunnel.interest++;
        break;
      case 'video_play':
      case 'bootcamp_view':
        insights.conversionFunnel.consideration++;
        break;
      case 'inquiry_form_start':
        insights.conversionFunnel.intent++;
        break;
      case 'inquiry_form_submit':
      case 'bootcamp_register_complete':
        insights.conversionFunnel.purchase++;
        break;
    }
    
    // Track error patterns
    if (event.category === 'error') {
      insights.errorPatterns.push(event.event);
    }
  });
  
  return insights;
}

// Send events to external analytics services
async function sendToAnalyticsServices(events: any[], sessionAnalysis: any) {
  try {
    // Send to external monitoring service
    if (process.env['ANALYTICS_WEBHOOK_URL']) {
      await fetch(process.env['ANALYTICS_WEBHOOK_URL'], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env['ANALYTICS_API_KEY']}`,
        },
        body: JSON.stringify({
          service: 'my-private-tutor-online',
          environment: process.env.NODE_ENV,
          events,
          analysis: sessionAnalysis,
          timestamp: Date.now(),
        }),
      });
    }
  } catch (error) {
    console.error('[Analytics] Failed to send to external service:', error);
  }
}

// Update conversion tracking
async function updateConversionTracking(events: any[]) {
  const conversions = events.filter(e => EVENT_CONFIG.CONVERSION_EVENTS.includes(e.event));
  
  if (conversions.length > 0) {
    // In production, update conversion tracking database
    console.log('[Conversion Tracking] New conversions:', conversions.length);
  }
}

// Update engagement scoring
async function updateEngagementScoring(session: SessionSummary, events: any[]) {
  let totalScore = 0;
  
  events.forEach(event => {
    const weight = EVENT_CONFIG.ENGAGEMENT_WEIGHTS[event.event as keyof typeof EVENT_CONFIG.ENGAGEMENT_WEIGHTS] || 1;
    totalScore += weight;
  });
  
  // Factor in session duration
  const durationBonus = Math.min(session.duration / (5 * 60 * 1000), 1) * 10; // Max 10 points for 5+ minute session
  totalScore += durationBonus;
  
  // In production, update user engagement score
  console.log('[Engagement Scoring] Session score:', Math.round(totalScore));
}

// CONTEXT7 SOURCE: /vercel/next.js - CORS handling for analytics endpoints
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}