/**
 * CMS ANALYTICS INTEGRATION
 * CONTEXT7 SOURCE: /facebook/react - Analytics patterns for performance tracking
 * CONTEXT7 SOURCE: /pmndrs/zustand - Store patterns for analytics state management
 * CONTEXT7 SOURCE: /colinhacks/zod - Schema validation for analytics data
 * 
 * PHASE 1 TASK 8: Content performance tracking and optimization insights
 * Provides comprehensive analytics for testimonials content performance,
 * enabling data-driven optimization for £400,000+ revenue opportunity.
 * 
 * BUSINESS IMPACT: Performance insights drive conversion optimization
 * ROYAL STANDARDS: Enterprise-grade analytics for elite service delivery
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { z } from 'zod'

// CONTEXT7 SOURCE: /colinhacks/zod - Analytics data schemas for validation
const ContentInteractionSchema = z.object({
  contentId: z.string(),
  contentType: z.enum(['hero', 'testimonial', 'video', 'school', 'cta']),
  interactionType: z.enum(['view', 'click', 'scroll', 'hover', 'share']),
  timestamp: z.number(),
  userId: z.string().optional(),
  sessionId: z.string(),
  duration: z.number().optional(),
  metadata: z.record(z.unknown()).optional()
})

const ConversionEventSchema = z.object({
  eventType: z.enum(['quote_request', 'contact_form', 'phone_call', 'email_inquiry']),
  contentSource: z.string(), // Which content led to conversion
  timestamp: z.number(),
  sessionId: z.string(),
  value: z.number().optional(), // Estimated revenue value
  metadata: z.record(z.unknown()).optional()
})

const PerformanceMetricSchema = z.object({
  contentId: z.string(),
  contentType: z.string(),
  metric: z.enum(['load_time', 'render_time', 'interaction_rate', 'conversion_rate', 'bounce_rate']),
  value: z.number(),
  timestamp: z.number(),
  sessionId: z.string()
})

// CONTEXT7 SOURCE: /microsoft/typescript - Analytics interfaces for comprehensive tracking
export interface ContentInteraction {
  readonly contentId: string
  readonly contentType: 'hero' | 'testimonial' | 'video' | 'school' | 'cta'
  readonly interactionType: 'view' | 'click' | 'scroll' | 'hover' | 'share'
  readonly timestamp: number
  readonly userId?: string
  readonly sessionId: string
  readonly duration?: number
  readonly metadata?: Record<string, unknown>
}

export interface ConversionEvent {
  readonly eventType: 'quote_request' | 'contact_form' | 'phone_call' | 'email_inquiry'
  readonly contentSource: string
  readonly timestamp: number
  readonly sessionId: string
  readonly value?: number
  readonly metadata?: Record<string, unknown>
}

export interface PerformanceMetric {
  readonly contentId: string
  readonly contentType: string
  readonly metric: 'load_time' | 'render_time' | 'interaction_rate' | 'conversion_rate' | 'bounce_rate'
  readonly value: number
  readonly timestamp: number
  readonly sessionId: string
}

export interface ContentAnalytics {
  readonly contentId: string
  readonly contentType: string
  readonly views: number
  readonly interactions: number
  readonly conversions: number
  readonly averageEngagementTime: number
  readonly bounceRate: number
  readonly conversionRate: number
  readonly revenueAttribution: number
  readonly lastUpdated: number
}

export interface AnalyticsInsight {
  readonly type: 'optimization' | 'warning' | 'success' | 'info'
  readonly title: string
  readonly description: string
  readonly contentId?: string
  readonly actionable: boolean
  readonly priority: 'high' | 'medium' | 'low'
  readonly estimatedImpact?: {
    readonly metric: string
    readonly change: string
    readonly confidence: number
  }
}

// CONTEXT7 SOURCE: /pmndrs/zustand - Analytics store for tracking state
interface AnalyticsStore {
  // Analytics data
  interactions: ContentInteraction[]
  conversions: ConversionEvent[]
  performanceMetrics: PerformanceMetric[]
  contentAnalytics: Map<string, ContentAnalytics>
  
  // Session tracking
  currentSessionId: string
  sessionStartTime: number
  
  // Analytics configuration
  trackingEnabled: boolean
  privacyMode: boolean
  batchSize: number
  flushInterval: number
  
  // Actions
  trackInteraction: (interaction: Omit<ContentInteraction, 'timestamp' | 'sessionId'>) => void
  trackConversion: (conversion: Omit<ConversionEvent, 'timestamp' | 'sessionId'>) => void
  trackPerformance: (metric: Omit<PerformanceMetric, 'timestamp' | 'sessionId'>) => void
  
  // Analytics queries
  getContentAnalytics: (contentId: string) => ContentAnalytics | null
  getTopPerformingContent: (contentType?: string, limit?: number) => ContentAnalytics[]
  getConversionFunnel: () => {
    views: number
    interactions: number
    conversions: number
    revenue: number
  }
  
  // Insights generation
  generateInsights: () => AnalyticsInsight[]
  
  // Data management
  clearAnalytics: () => void
  exportAnalytics: () => string
  setConfiguration: (config: Partial<{
    trackingEnabled: boolean
    privacyMode: boolean
    batchSize: number
    flushInterval: number
  }>) => void
}

// CONTEXT7 SOURCE: /pmndrs/zustand - Analytics store implementation with persistence
const useAnalyticsStore = create<AnalyticsStore>()(
  persist(
    (set, get) => ({
      // Initial state
      interactions: [],
      conversions: [],
      performanceMetrics: [],
      contentAnalytics: new Map(),
      currentSessionId: generateSessionId(),
      sessionStartTime: Date.now(),
      trackingEnabled: true,
      privacyMode: false,
      batchSize: 50,
      flushInterval: 30000, // 30 seconds

      // Track content interaction
      trackInteraction: (interaction) => {
        const state = get()
        if (!state.trackingEnabled) return

        const fullInteraction: ContentInteraction = {
          ...interaction,
          timestamp: Date.now(),
          sessionId: state.currentSessionId
        }

        // Validate interaction data
        try {
          ContentInteractionSchema.parse(fullInteraction)
        } catch (error) {
          console.warn('Invalid interaction data:', error)
          return
        }

        set(state => ({
          interactions: [...state.interactions.slice(-state.batchSize + 1), fullInteraction]
        }))

        // Update content analytics
        get().updateContentAnalytics(fullInteraction.contentId, 'interaction')
      },

      // Track conversion event
      trackConversion: (conversion) => {
        const state = get()
        if (!state.trackingEnabled) return

        const fullConversion: ConversionEvent = {
          ...conversion,
          timestamp: Date.now(),
          sessionId: state.currentSessionId
        }

        // Validate conversion data
        try {
          ConversionEventSchema.parse(fullConversion)
        } catch (error) {
          console.warn('Invalid conversion data:', error)
          return
        }

        set(state => ({
          conversions: [...state.conversions.slice(-state.batchSize + 1), fullConversion]
        }))

        // Update content analytics
        get().updateContentAnalytics(fullConversion.contentSource, 'conversion', fullConversion.value)
      },

      // Track performance metric
      trackPerformance: (metric) => {
        const state = get()
        if (!state.trackingEnabled) return

        const fullMetric: PerformanceMetric = {
          ...metric,
          timestamp: Date.now(),
          sessionId: state.currentSessionId
        }

        // Validate metric data
        try {
          PerformanceMetricSchema.parse(fullMetric)
        } catch (error) {
          console.warn('Invalid performance metric:', error)
          return
        }

        set(state => ({
          performanceMetrics: [...state.performanceMetrics.slice(-state.batchSize + 1), fullMetric]
        }))

        // Update content analytics
        get().updateContentAnalytics(fullMetric.contentId, 'performance', fullMetric.value)
      },

      // Get analytics for specific content
      getContentAnalytics: (contentId: string) => {
        const state = get()
        return state.contentAnalytics.get(contentId) || null
      },

      // Get top performing content
      getTopPerformingContent: (contentType?: string, limit = 10) => {
        const state = get()
        let analytics = Array.from(state.contentAnalytics.values())
        
        if (contentType) {
          analytics = analytics.filter(a => a.contentType === contentType)
        }
        
        return analytics
          .sort((a, b) => b.conversionRate - a.conversionRate)
          .slice(0, limit)
      },

      // Get conversion funnel data
      getConversionFunnel: () => {
        const state = get()
        const totalViews = state.interactions.filter(i => i.interactionType === 'view').length
        const totalInteractions = state.interactions.length
        const totalConversions = state.conversions.length
        const totalRevenue = state.conversions.reduce((sum, c) => sum + (c.value || 0), 0)

        return {
          views: totalViews,
          interactions: totalInteractions,
          conversions: totalConversions,
          revenue: totalRevenue
        }
      },

      // Generate actionable insights
      generateInsights: () => {
        const state = get()
        const insights: AnalyticsInsight[] = []
        const analytics = Array.from(state.contentAnalytics.values())

        // Low performing content insights
        const lowPerformingContent = analytics.filter(a => a.conversionRate < 0.02 && a.views > 100)
        lowPerformingContent.forEach(content => {
          insights.push({
            type: 'optimization',
            title: `Low Conversion Rate for ${content.contentType}`,
            description: `Content "${content.contentId}" has ${(content.conversionRate * 100).toFixed(1)}% conversion rate. Consider A/B testing or content revision.`,
            contentId: content.contentId,
            actionable: true,
            priority: 'high',
            estimatedImpact: {
              metric: 'conversion_rate',
              change: '+25%',
              confidence: 0.7
            }
          })
        })

        // High bounce rate insights
        const highBounceContent = analytics.filter(a => a.bounceRate > 0.7)
        highBounceContent.forEach(content => {
          insights.push({
            type: 'warning',
            title: `High Bounce Rate for ${content.contentType}`,
            description: `Content "${content.contentId}" has ${(content.bounceRate * 100).toFixed(1)}% bounce rate. Users may not find it engaging.`,
            contentId: content.contentId,
            actionable: true,
            priority: 'medium'
          })
        })

        // Success insights for high performers
        const topPerformers = analytics
          .sort((a, b) => b.conversionRate - a.conversionRate)
          .slice(0, 3)
        
        topPerformers.forEach(content => {
          if (content.conversionRate > 0.05) {
            insights.push({
              type: 'success',
              title: `High Converting ${content.contentType}`,
              description: `Content "${content.contentId}" has excellent ${(content.conversionRate * 100).toFixed(1)}% conversion rate. Consider promoting this content more.`,
              contentId: content.contentId,
              actionable: true,
              priority: 'low'
            })
          }
        })

        // Revenue insights
        const totalRevenue = state.conversions.reduce((sum, c) => sum + (c.value || 0), 0)
        if (totalRevenue > 10000) {
          insights.push({
            type: 'success',
            title: 'Strong Revenue Performance',
            description: `Testimonials content has generated £${totalRevenue.toLocaleString()} in attributed revenue.`,
            actionable: false,
            priority: 'low'
          })
        }

        return insights.sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        })
      },

      // Clear all analytics data
      clearAnalytics: () => {
        set({
          interactions: [],
          conversions: [],
          performanceMetrics: [],
          contentAnalytics: new Map(),
          currentSessionId: generateSessionId(),
          sessionStartTime: Date.now()
        })
      },

      // Export analytics data
      exportAnalytics: () => {
        const state = get()
        return JSON.stringify({
          interactions: state.interactions,
          conversions: state.conversions,
          performanceMetrics: state.performanceMetrics,
          contentAnalytics: Object.fromEntries(state.contentAnalytics),
          sessionInfo: {
            sessionId: state.currentSessionId,
            startTime: state.sessionStartTime,
            duration: Date.now() - state.sessionStartTime
          },
          exportTimestamp: Date.now()
        }, null, 2)
      },

      // Update analytics configuration
      setConfiguration: (config) => {
        set(state => ({
          trackingEnabled: config.trackingEnabled ?? state.trackingEnabled,
          privacyMode: config.privacyMode ?? state.privacyMode,
          batchSize: config.batchSize ?? state.batchSize,
          flushInterval: config.flushInterval ?? state.flushInterval
        }))
      },

      // Helper method to update content analytics
      updateContentAnalytics: (contentId: string, updateType: 'interaction' | 'conversion' | 'performance', value?: number) => {
        set(state => {
          const newAnalytics = new Map(state.contentAnalytics)
          const existing = newAnalytics.get(contentId) || {
            contentId,
            contentType: 'unknown',
            views: 0,
            interactions: 0,
            conversions: 0,
            averageEngagementTime: 0,
            bounceRate: 0,
            conversionRate: 0,
            revenueAttribution: 0,
            lastUpdated: Date.now()
          }

          const updated = { ...existing, lastUpdated: Date.now() }

          switch (updateType) {
            case 'interaction':
              updated.interactions += 1
              if (state.interactions.some(i => i.contentId === contentId && i.interactionType === 'view')) {
                updated.views += 1
              }
              break
            case 'conversion':
              updated.conversions += 1
              updated.revenueAttribution += value || 0
              break
            case 'performance':
              // Update performance-related metrics
              break
          }

          // Recalculate rates
          if (updated.views > 0) {
            updated.conversionRate = updated.conversions / updated.views
            updated.bounceRate = Math.max(0, (updated.views - updated.interactions) / updated.views)
          }

          newAnalytics.set(contentId, updated)
          return { contentAnalytics: newAnalytics }
        })
      }
    }),
    {
      name: 'cms-analytics-storage',
      partialize: state => ({
        interactions: state.interactions.slice(-100), // Keep recent interactions
        conversions: state.conversions.slice(-50), // Keep recent conversions
        contentAnalytics: Object.fromEntries(state.contentAnalytics) // Convert Map for persistence
      })
    }
  )
)

/**
 * CONTEXT7 SOURCE: /facebook/react - Analytics manager for comprehensive tracking
 */
export class CMSAnalyticsManager {
  private store = useAnalyticsStore

  /**
   * Track content interaction
   */
  public trackInteraction(
    contentId: string,
    contentType: ContentInteraction['contentType'],
    interactionType: ContentInteraction['interactionType'],
    metadata?: Record<string, unknown>
  ): void {
    this.store.getState().trackInteraction({
      contentId,
      contentType,
      interactionType,
      metadata
    })
  }

  /**
   * Track conversion event
   */
  public trackConversion(
    eventType: ConversionEvent['eventType'],
    contentSource: string,
    value?: number,
    metadata?: Record<string, unknown>
  ): void {
    this.store.getState().trackConversion({
      eventType,
      contentSource,
      value,
      metadata
    })
  }

  /**
   * Track performance metric
   */
  public trackPerformance(
    contentId: string,
    contentType: string,
    metric: PerformanceMetric['metric'],
    value: number
  ): void {
    this.store.getState().trackPerformance({
      contentId,
      contentType,
      metric,
      value
    })
  }

  /**
   * Get comprehensive analytics dashboard data
   */
  public getDashboardData() {
    const state = this.store.getState()
    const funnel = state.getConversionFunnel()
    const insights = state.generateInsights()
    const topContent = state.getTopPerformingContent(undefined, 5)

    return {
      funnel,
      insights,
      topContent,
      totalSessions: new Set(state.interactions.map(i => i.sessionId)).size,
      avgSessionDuration: this.calculateAverageSessionDuration(),
      revenueGrowth: this.calculateRevenueGrowth()
    }
  }

  /**
   * Generate optimization recommendations
   */
  public getOptimizationRecommendations(): AnalyticsInsight[] {
    return this.store.getState().generateInsights()
  }

  /**
   * Export analytics data
   */
  public exportData(): string {
    return this.store.getState().exportAnalytics()
  }

  /**
   * Configure analytics tracking
   */
  public configure(config: Parameters<AnalyticsStore['setConfiguration']>[0]): void {
    this.store.getState().setConfiguration(config)
  }

  // Private helper methods
  private calculateAverageSessionDuration(): number {
    const state = this.store.getState()
    const sessionDurations = new Map<string, number>()
    
    state.interactions.forEach(interaction => {
      if (interaction.duration) {
        sessionDurations.set(interaction.sessionId, 
          (sessionDurations.get(interaction.sessionId) || 0) + interaction.duration
        )
      }
    })

    const durations = Array.from(sessionDurations.values())
    return durations.length > 0 ? durations.reduce((sum, d) => sum + d, 0) / durations.length : 0
  }

  private calculateRevenueGrowth(): number {
    const state = this.store.getState()
    const now = Date.now()
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000)
    const sixtyDaysAgo = now - (60 * 24 * 60 * 60 * 1000)

    const recentRevenue = state.conversions
      .filter(c => c.timestamp > thirtyDaysAgo)
      .reduce((sum, c) => sum + (c.value || 0), 0)

    const previousRevenue = state.conversions
      .filter(c => c.timestamp > sixtyDaysAgo && c.timestamp <= thirtyDaysAgo)
      .reduce((sum, c) => sum + (c.value || 0), 0)

    return previousRevenue > 0 ? ((recentRevenue - previousRevenue) / previousRevenue) * 100 : 0
  }
}

// Utility functions
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Export singleton instance
export const cmsAnalyticsManager = new CMSAnalyticsManager()

// Export store hook for React components
export { useAnalyticsStore }

/**
 * React hook for analytics in components
 * CONTEXT7 SOURCE: /facebook/react - Custom hooks for component integration
 */
export function useCMSAnalytics() {
  const store = useAnalyticsStore()
  
  return {
    manager: cmsAnalyticsManager,
    trackInteraction: store.trackInteraction,
    trackConversion: store.trackConversion,
    trackPerformance: store.trackPerformance,
    getDashboardData: () => cmsAnalyticsManager.getDashboardData(),
    getInsights: store.generateInsights,
    isTrackingEnabled: store.trackingEnabled,
    configure: store.setConfiguration
  }
}