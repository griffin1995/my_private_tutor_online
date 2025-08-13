/**
 * CONTEXT7 SOURCE: /vercel/analytics - Vercel Analytics patterns for conversion tracking
 * CONTEXT7 SOURCE: /microsoft/typescript - Type-safe analytics event patterns
 * CONTEXT7 SOURCE: /reactjs/react.dev - Analytics integration patterns for React applications
 * 
 * ANALYTICS CREATION REASON: Task 7 CTA enhancement - Performance tracking for conversion optimization
 * TRACKING REASON: Official analytics documentation recommends CTA performance monitoring
 * CONVERSION OPTIMIZATION: Context7 MCP patterns for data-driven CTA improvements
 * 
 * Pattern: CTA Performance Analytics Tracking System
 * Architecture:
 * - Type-safe event tracking for all CTA interactions
 * - A/B testing performance measurement
 * - Conversion funnel analytics
 * - Social proof effectiveness tracking
 * - Royal client conversion monitoring
 * 
 * Features:
 * - CTA impression tracking
 * - Click-through rate monitoring
 * - Variant performance comparison
 * - Social proof engagement metrics
 * - Conversion funnel analysis
 * - Time-to-conversion tracking
 * - Royal client segment analytics
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Interface patterns for analytics event typing
interface CTATrackingEvent {
  event: string
  variant: 'consultation' | 'trial' | 'assessment' | 'callback'
  urgency?: 'none' | 'limited' | 'seasonal' | 'exclusive'
  socialProofShown: boolean
  buttonStyle: 'shiny' | 'interactive' | 'royal' | 'premium'
  timestamp: number
  sessionId?: string
  userId?: string
  properties?: Record<string, any>
}

interface CTAImpressionEvent extends CTATrackingEvent {
  event: 'cta_impression'
  viewportPosition: 'above_fold' | 'below_fold'
  timeToView: number
  scrollDepth: number
}

interface CTAClickEvent extends CTATrackingEvent {
  event: 'cta_click'
  buttonType: 'primary' | 'secondary'
  clickPosition: { x: number; y: number }
  timeOnPage: number
}

interface CTASocialProofEvent extends CTATrackingEvent {
  event: 'social_proof_view'
  proofType: 'testimonials' | 'compact' | 'detailed' | 'minimal'
  statisticsShown: string[]
  engagementTime: number
}

interface CTAConversionEvent extends CTATrackingEvent {
  event: 'cta_conversion'
  conversionType: 'form_submit' | 'booking_complete' | 'consultation_scheduled'
  timeToConversion: number
  touchpoints: string[]
  revenue?: number
}

// CONTEXT7 SOURCE: /vercel/analytics - Analytics service integration patterns
class CTAAnalytics {
  private isEnabled: boolean = false
  private sessionStartTime: number = Date.now()
  private impressions: Map<string, CTAImpressionEvent> = new Map()
  private clicks: Map<string, CTAClickEvent[]> = new Map()
  private conversions: Map<string, CTAConversionEvent[]> = new Map()

  constructor() {
    this.initializeAnalytics()
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Component lifecycle patterns for analytics initialization
  private initializeAnalytics() {
    // Initialize analytics only in browser environment
    if (typeof window !== 'undefined') {
      this.isEnabled = true
      this.setupEventListeners()
    }
  }

  private setupEventListeners() {
    // Track page visibility changes for accurate session tracking
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.sessionStartTime = Date.now()
      }
    })
  }

  // CONTEXT7 SOURCE: /vercel/analytics - Event tracking patterns for user interactions
  /**
   * Track CTA impression when it becomes visible
   */
  trackCTAImpression(data: {
    variant: CTATrackingEvent['variant']
    urgency?: CTATrackingEvent['urgency']
    socialProofShown: boolean
    buttonStyle: CTATrackingEvent['buttonStyle']
    element: HTMLElement
  }) {
    if (!this.isEnabled) return

    const rect = data.element.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const scrollDepth = Math.round((window.scrollY / document.body.scrollHeight) * 100)
    
    const impressionEvent: CTAImpressionEvent = {
      event: 'cta_impression',
      variant: data.variant,
      urgency: data.urgency || 'none',
      socialProofShown: data.socialProofShown,
      buttonStyle: data.buttonStyle,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      viewportPosition: rect.top < viewportHeight ? 'above_fold' : 'below_fold',
      timeToView: Date.now() - this.sessionStartTime,
      scrollDepth
    }

    this.impressions.set(`${data.variant}_${Date.now()}`, impressionEvent)
    this.sendEvent(impressionEvent)
  }

  /**
   * Track CTA button clicks with detailed interaction data
   */
  trackCTAClick(data: {
    variant: CTATrackingEvent['variant']
    urgency?: CTATrackingEvent['urgency']
    socialProofShown: boolean
    buttonStyle: CTATrackingEvent['buttonStyle']
    buttonType: 'primary' | 'secondary'
    clickEvent: MouseEvent
  }) {
    if (!this.isEnabled) return

    const clickEvent: CTAClickEvent = {
      event: 'cta_click',
      variant: data.variant,
      urgency: data.urgency || 'none',
      socialProofShown: data.socialProofShown,
      buttonStyle: data.buttonStyle,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      buttonType: data.buttonType,
      clickPosition: { x: data.clickEvent.clientX, y: data.clickEvent.clientY },
      timeOnPage: Date.now() - this.sessionStartTime
    }

    const variantKey = data.variant
    if (!this.clicks.has(variantKey)) {
      this.clicks.set(variantKey, [])
    }
    this.clicks.get(variantKey)!.push(clickEvent)
    this.sendEvent(clickEvent)
  }

  /**
   * Track social proof engagement and viewing patterns
   */
  trackSocialProofView(data: {
    variant: CTATrackingEvent['variant']
    proofType: 'testimonials' | 'compact' | 'detailed' | 'minimal'
    statisticsShown: string[]
    engagementTime: number
  }) {
    if (!this.isEnabled) return

    const socialProofEvent: CTASocialProofEvent = {
      event: 'social_proof_view',
      variant: data.variant,
      socialProofShown: true,
      buttonStyle: 'shiny', // Default, will be overridden by actual CTA
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      proofType: data.proofType,
      statisticsShown: data.statisticsShown,
      engagementTime: data.engagementTime
    }

    this.sendEvent(socialProofEvent)
  }

  /**
   * Track successful conversions with revenue attribution
   */
  trackCTAConversion(data: {
    variant: CTATrackingEvent['variant']
    urgency?: CTATrackingEvent['urgency'] 
    socialProofShown: boolean
    buttonStyle: CTATrackingEvent['buttonStyle']
    conversionType: 'form_submit' | 'booking_complete' | 'consultation_scheduled'
    touchpoints: string[]
    revenue?: number
  }) {
    if (!this.isEnabled) return

    const conversionEvent: CTAConversionEvent = {
      event: 'cta_conversion',
      variant: data.variant,
      urgency: data.urgency || 'none',
      socialProofShown: data.socialProofShown,
      buttonStyle: data.buttonStyle,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      conversionType: data.conversionType,
      timeToConversion: Date.now() - this.sessionStartTime,
      touchpoints: data.touchpoints,
      revenue: data.revenue
    }

    const variantKey = data.variant
    if (!this.conversions.has(variantKey)) {
      this.conversions.set(variantKey, [])
    }
    this.conversions.get(variantKey)!.push(conversionEvent)
    this.sendEvent(conversionEvent)
  }

  /**
   * Get performance analytics for CTA variants
   */
  getCTAPerformance() {
    const performance: Record<string, any> = {}
    
    for (const [variant, impressionEvent] of this.impressions) {
      const variantKey = impressionEvent.variant
      if (!performance[variantKey]) {
        performance[variantKey] = {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          ctr: 0,
          conversionRate: 0,
          revenue: 0
        }
      }
      performance[variantKey].impressions++
    }

    for (const [variant, clickEvents] of this.clicks) {
      if (!performance[variant]) {
        performance[variant] = {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          ctr: 0,
          conversionRate: 0,
          revenue: 0
        }
      }
      performance[variant].clicks = clickEvents.length
    }

    for (const [variant, conversionEvents] of this.conversions) {
      if (performance[variant]) {
        performance[variant].conversions = conversionEvents.length
        performance[variant].revenue = conversionEvents.reduce((sum, event) => 
          sum + (event.revenue || 0), 0
        )
      }
    }

    // Calculate rates
    Object.keys(performance).forEach(variant => {
      const data = performance[variant]
      data.ctr = data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0
      data.conversionRate = data.clicks > 0 ? (data.conversions / data.clicks) * 100 : 0
    })

    return performance
  }

  // CONTEXT7 SOURCE: /vercel/analytics - Event transmission patterns for analytics services
  private sendEvent(event: CTATrackingEvent | CTAImpressionEvent | CTAClickEvent | CTASocialProofEvent | CTAConversionEvent) {
    // Send to analytics service (e.g., Vercel Analytics, Google Analytics, etc.)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.event, {
        cta_variant: event.variant,
        cta_urgency: event.urgency,
        social_proof_shown: event.socialProofShown,
        button_style: event.buttonStyle,
        session_id: event.sessionId,
        ...event.properties
      })
    }

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('CTA Analytics Event:', event)
    }
  }

  private getSessionId(): string {
    // Generate or retrieve session ID
    if (typeof window === 'undefined') return 'server'
    
    let sessionId = sessionStorage.getItem('cta_session_id')
    if (!sessionId) {
      sessionId = `cta_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('cta_session_id', sessionId)
    }
    return sessionId
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Singleton pattern for analytics service
export const ctaAnalytics = new CTAAnalytics()

// Export types for component usage
export type {
  CTATrackingEvent,
  CTAImpressionEvent,
  CTAClickEvent,
  CTASocialProofEvent,
  CTAConversionEvent
}