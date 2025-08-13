/**
 * TESTIMONIALS ANALYTICS API - DATA PROCESSING & STORAGE
 * CONTEXT7 SOURCE: /vercel/next.js - API Routes patterns for analytics data handling
 * CONTEXT7 SOURCE: /vercel/edge-config - Edge configuration patterns for analytics processing
 * 
 * TASK 18: Testimonials analytics API endpoint for data collection and processing
 * Handles real-time testimonials analytics data, processes business intelligence,
 * and provides executive reporting capabilities.
 * 
 * BUSINESS IMPACT: £400,000+ revenue enhancement through data-driven insights
 * ROYAL CLIENT STANDARDS: Enterprise-grade analytics processing with privacy compliance
 */

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for analytics API
interface AnalyticsEvent {
  testimonialId: string
  eventType: 'view' | 'interaction' | 'conversion'
  placement: 'hero' | 'grid' | 'carousel' | 'cta' | 'modal'
  userSegment?: string
  deviceType: 'mobile' | 'tablet' | 'desktop'
  interactionType?: string
  conversionType?: string
  value?: number
  metadata: Record<string, any>
  timestamp: number
  sessionId: string
  userId?: string
}

interface AnalyticsBatch {
  events: AnalyticsEvent[]
  session: {
    sessionId: string
    duration: number
    pageViews: number
    timestamp: number
  }
  client: {
    userAgent: string
    referrer: string
    page: string
    ip: string
  }
}

interface ProcessedAnalytics {
  testimonialId: string
  totalViews: number
  totalInteractions: number
  totalConversions: number
  conversionRate: number
  engagementScore: number
  averageTimeOnElement: number
  lastUpdated: Date
}

// CONTEXT7 SOURCE: /vercel/next.js - Request validation patterns
function validateAnalyticsEvent(event: any): event is AnalyticsEvent {
  return (
    typeof event.testimonialId === 'string' &&
    ['view', 'interaction', 'conversion'].includes(event.eventType) &&
    ['hero', 'grid', 'carousel', 'cta', 'modal'].includes(event.placement) &&
    typeof event.timestamp === 'number' &&
    typeof event.sessionId === 'string'
  )
}

function validateAnalyticsBatch(batch: any): batch is AnalyticsBatch {
  return (
    Array.isArray(batch.events) &&
    batch.events.every(validateAnalyticsEvent) &&
    typeof batch.session === 'object' &&
    typeof batch.client === 'object'
  )
}

// CONTEXT7 SOURCE: /vercel/edge-config - Data processing patterns for analytics
class AnalyticsProcessor {
  private static instance: AnalyticsProcessor
  private cache: Map<string, ProcessedAnalytics> = new Map()
  private lastProcessed: number = 0

  static getInstance(): AnalyticsProcessor {
    if (!AnalyticsProcessor.instance) {
      AnalyticsProcessor.instance = new AnalyticsProcessor()
    }
    return AnalyticsProcessor.instance
  }

  async processBatch(batch: AnalyticsBatch): Promise<void> {
    const testimonialMetrics = new Map<string, {
      views: number
      interactions: number
      conversions: number
      totalTimeOnElement: number
      eventCount: number
    }>()

    // Aggregate events by testimonial
    for (const event of batch.events) {
      const existing = testimonialMetrics.get(event.testimonialId) || {
        views: 0,
        interactions: 0,
        conversions: 0,
        totalTimeOnElement: 0,
        eventCount: 0
      }

      switch (event.eventType) {
        case 'view':
          existing.views += 1
          break
        case 'interaction':
          existing.interactions += 1
          if (event.value) {
            existing.totalTimeOnElement += event.value
          }
          break
        case 'conversion':
          existing.conversions += 1
          break
      }

      existing.eventCount += 1
      testimonialMetrics.set(event.testimonialId, existing)
    }

    // Update processed analytics for each testimonial
    for (const [testimonialId, metrics] of testimonialMetrics) {
      const processed = this.cache.get(testimonialId) || {
        testimonialId,
        totalViews: 0,
        totalInteractions: 0,
        totalConversions: 0,
        conversionRate: 0,
        engagementScore: 0,
        averageTimeOnElement: 0,
        lastUpdated: new Date()
      }

      // Update cumulative metrics
      processed.totalViews += metrics.views
      processed.totalInteractions += metrics.interactions
      processed.totalConversions += metrics.conversions
      
      // Calculate derived metrics
      processed.conversionRate = processed.totalViews > 0 
        ? processed.totalConversions / processed.totalViews 
        : 0
      
      processed.averageTimeOnElement = metrics.eventCount > 0
        ? metrics.totalTimeOnElement / metrics.eventCount
        : processed.averageTimeOnElement

      processed.engagementScore = this.calculateEngagementScore(processed)
      processed.lastUpdated = new Date()

      this.cache.set(testimonialId, processed)
    }

    this.lastProcessed = Date.now()
  }

  private calculateEngagementScore(processed: ProcessedAnalytics): number {
    const interactionRate = processed.totalViews > 0 
      ? processed.totalInteractions / processed.totalViews 
      : 0
    
    const conversionWeight = processed.conversionRate * 100
    const timeWeight = Math.min(processed.averageTimeOnElement / 30000, 1) // 30 seconds max
    const volumeWeight = Math.min(processed.totalViews / 1000, 1) // 1000 views max
    
    return Math.round(
      (interactionRate * 25) + 
      (conversionWeight * 40) + 
      (timeWeight * 20) + 
      (volumeWeight * 15)
    )
  }

  getProcessedAnalytics(testimonialId?: string): ProcessedAnalytics | ProcessedAnalytics[] {
    if (testimonialId) {
      return this.cache.get(testimonialId) || {
        testimonialId,
        totalViews: 0,
        totalInteractions: 0,
        totalConversions: 0,
        conversionRate: 0,
        engagementScore: 0,
        averageTimeOnElement: 0,
        lastUpdated: new Date()
      }
    }
    
    return Array.from(this.cache.values())
  }

  getTopPerformers(limit: number = 10): ProcessedAnalytics[] {
    return Array.from(this.cache.values())
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, limit)
  }

  getPerformanceMetrics(): {
    totalTestimonials: number
    totalViews: number
    totalConversions: number
    averageConversionRate: number
    averageEngagementScore: number
  } {
    const analytics = Array.from(this.cache.values())
    
    return {
      totalTestimonials: analytics.length,
      totalViews: analytics.reduce((sum, a) => sum + a.totalViews, 0),
      totalConversions: analytics.reduce((sum, a) => sum + a.totalConversions, 0),
      averageConversionRate: analytics.length > 0 
        ? analytics.reduce((sum, a) => sum + a.conversionRate, 0) / analytics.length 
        : 0,
      averageEngagementScore: analytics.length > 0
        ? analytics.reduce((sum, a) => sum + a.engagementScore, 0) / analytics.length
        : 0
    }
  }

  clearCache(): void {
    this.cache.clear()
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - POST endpoint implementation for analytics data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    if (!validateAnalyticsBatch(body)) {
      return NextResponse.json(
        { error: 'Invalid analytics batch format' },
        { status: 400 }
      )
    }

    // Get client information
    const headersList = headers()
    const userAgent = headersList.get('user-agent') || ''
    const forwardedFor = headersList.get('x-forwarded-for') || ''
    const clientIP = forwardedFor.split(',')[0] || 'unknown'

    // Process analytics batch
    const processor = AnalyticsProcessor.getInstance()
    await processor.processBatch({
      ...body,
      client: {
        ...body.client,
        ip: clientIP,
        userAgent
      }
    })

    // Return success with basic metrics
    const metrics = processor.getPerformanceMetrics()
    
    return NextResponse.json({
      success: true,
      processed: body.events.length,
      timestamp: new Date().toISOString(),
      metrics
    })

  } catch (error) {
    console.error('Analytics processing error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process analytics data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - GET endpoint implementation for analytics retrieval
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const testimonialId = searchParams.get('testimonialId')
    const format = searchParams.get('format') || 'detailed'
    const limit = parseInt(searchParams.get('limit') || '10')

    const processor = AnalyticsProcessor.getInstance()

    if (testimonialId) {
      // Get specific testimonial analytics
      const analytics = processor.getProcessedAnalytics(testimonialId)
      return NextResponse.json({
        testimonial: analytics,
        timestamp: new Date().toISOString()
      })
    }

    switch (format) {
      case 'summary':
        // Return summary metrics only
        const metrics = processor.getPerformanceMetrics()
        return NextResponse.json({
          summary: metrics,
          timestamp: new Date().toISOString()
        })

      case 'top-performers':
        // Return top performing testimonials
        const topPerformers = processor.getTopPerformers(limit)
        return NextResponse.json({
          topPerformers,
          count: topPerformers.length,
          timestamp: new Date().toISOString()
        })

      case 'detailed':
      default:
        // Return all analytics data
        const allAnalytics = processor.getProcessedAnalytics() as ProcessedAnalytics[]
        return NextResponse.json({
          analytics: allAnalytics,
          count: allAnalytics.length,
          summary: processor.getPerformanceMetrics(),
          timestamp: new Date().toISOString()
        })
    }

  } catch (error) {
    console.error('Analytics retrieval error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to retrieve analytics data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - DELETE endpoint for analytics management
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action !== 'clear-cache') {
      return NextResponse.json(
        { error: 'Invalid action. Use action=clear-cache' },
        { status: 400 }
      )
    }

    const processor = AnalyticsProcessor.getInstance()
    processor.clearCache()

    return NextResponse.json({
      success: true,
      message: 'Analytics cache cleared',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Analytics management error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to manage analytics data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}