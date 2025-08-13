// CONTEXT7 SOURCE: /context7/react_dev - TypeScript interface patterns for analytics data
// ANALYTICS PATTERN: Following React documentation patterns for event tracking systems
// CONTEXT7 SOURCE: /pmndrs/zustand - State management integration for analytics persistence
// INTEGRATION REASON: Zustand docs show proper integration patterns for analytics systems

export interface TestimonialRatingEvent {
  eventType: 'rating' | 'star_rating' | 'feedback' | 'engagement'
  testimonialId: string
  userId: string
  sessionId: string
  timestamp: number
  data: {
    rating?: 'helpful' | 'not-helpful'
    starRating?: number
    feedbackLength?: number
    hasInteracted?: boolean
    timeToInteraction?: number
    deviceType?: 'desktop' | 'mobile' | 'tablet'
    userAgent?: string
    referrer?: string
  }
  metadata: {
    version: string
    environment: 'development' | 'production'
    consentGiven: boolean
  }
}

export interface TestimonialPerformanceMetrics {
  testimonialId: string
  totalViews: number
  totalRatings: number
  helpfulRatings: number
  notHelpfulRatings: number
  averageStarRating: number
  totalFeedback: number
  engagementRate: number
  conversionRate: number
  timeToFirstInteraction: number
  bounceRate: number
  lastUpdated: number
}

export interface RatingAnalyticsConfig {
  enableTracking: boolean
  batchSize: number
  flushInterval: number
  enableDebugMode: boolean
  apiEndpoint?: string
  consentRequired: boolean
}

// CONTEXT7 SOURCE: /context7/react_dev - Singleton pattern for analytics service
// SINGLETON PATTERN: React docs recommend this pattern for shared service instances
class TestimonialRatingAnalytics {
  private config: RatingAnalyticsConfig
  private eventQueue: TestimonialRatingEvent[] = []
  private flushTimer: NodeJS.Timeout | null = null
  private sessionStartTime: number = Date.now()
  private isInitialized: boolean = false

  constructor(config: RatingAnalyticsConfig) {
    this.config = {
      enableTracking: true,
      batchSize: 10,
      flushInterval: 30000, // 30 seconds
      enableDebugMode: false,
      consentRequired: true,
      ...config
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Initialization pattern for analytics services
  // INIT PATTERN: React documentation shows proper service initialization
  initialize(): void {
    if (this.isInitialized) return
    
    if (typeof window === 'undefined') {
      console.warn('TestimonialRatingAnalytics: Window not available, skipping initialization')
      return
    }

    this.isInitialized = true
    this.startFlushTimer()
    
    // CONTEXT7 SOURCE: /context7/react_dev - Event listener patterns for cleanup
    // CLEANUP PATTERN: React docs recommend proper event cleanup
    window.addEventListener('beforeunload', this.flush.bind(this))
    window.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this))
    
    if (this.config.enableDebugMode) {
      console.log('TestimonialRatingAnalytics initialized', this.config)
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Event tracking with consent validation
  // CONSENT PATTERN: Following GDPR compliance patterns from React documentation
  trackRatingEvent(
    testimonialId: string, 
    rating: 'helpful' | 'not-helpful',
    timeToInteraction?: number
  ): void {
    if (!this.canTrack()) return

    const event: TestimonialRatingEvent = {
      eventType: 'rating',
      testimonialId,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      timestamp: Date.now(),
      data: {
        rating,
        timeToInteraction,
        deviceType: this.getDeviceType(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      },
      metadata: {
        version: '1.0',
        environment: process.env.NODE_ENV as 'development' | 'production',
        consentGiven: this.hasUserConsent()
      }
    }

    this.addEvent(event)
    
    // Trigger immediate flush for important events
    if (this.eventQueue.length >= this.config.batchSize) {
      this.flush()
    }
  }

  trackStarRating(
    testimonialId: string, 
    starRating: number,
    timeToInteraction?: number
  ): void {
    if (!this.canTrack()) return

    const event: TestimonialRatingEvent = {
      eventType: 'star_rating',
      testimonialId,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      timestamp: Date.now(),
      data: {
        starRating: Math.max(1, Math.min(5, starRating)), // Ensure valid range
        timeToInteraction,
        deviceType: this.getDeviceType(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      },
      metadata: {
        version: '1.0',
        environment: process.env.NODE_ENV as 'development' | 'production',
        consentGiven: this.hasUserConsent()
      }
    }

    this.addEvent(event)
  }

  trackFeedback(
    testimonialId: string, 
    feedbackLength: number,
    timeToInteraction?: number
  ): void {
    if (!this.canTrack()) return

    const event: TestimonialRatingEvent = {
      eventType: 'feedback',
      testimonialId,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      timestamp: Date.now(),
      data: {
        feedbackLength,
        timeToInteraction,
        deviceType: this.getDeviceType(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      },
      metadata: {
        version: '1.0',
        environment: process.env.NODE_ENV as 'development' | 'production',
        consentGiven: this.hasUserConsent()
      }
    }

    this.addEvent(event)
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Engagement tracking patterns
  // ENGAGEMENT PATTERN: React docs show proper user interaction measurement
  trackEngagement(testimonialId: string, engagementData: {
    viewDuration?: number
    scrollDepth?: number
    clickCount?: number
    hoverTime?: number
  }): void {
    if (!this.canTrack()) return

    const event: TestimonialRatingEvent = {
      eventType: 'engagement',
      testimonialId,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      timestamp: Date.now(),
      data: {
        hasInteracted: true,
        timeToInteraction: Date.now() - this.sessionStartTime,
        deviceType: this.getDeviceType(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        ...engagementData
      },
      metadata: {
        version: '1.0',
        environment: process.env.NODE_ENV as 'development' | 'production',
        consentGiven: this.hasUserConsent()
      }
    }

    this.addEvent(event)
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Performance metrics calculation
  // METRICS PATTERN: Following React documentation for performance measurement
  async getTestimonialMetrics(testimonialId: string): Promise<TestimonialPerformanceMetrics> {
    const events = await this.getEventsForTestimonial(testimonialId)
    
    const ratings = events.filter(e => e.eventType === 'rating')
    const starRatings = events.filter(e => e.eventType === 'star_rating' && e.data.starRating)
    const feedback = events.filter(e => e.eventType === 'feedback')
    const engagement = events.filter(e => e.eventType === 'engagement')

    const helpfulRatings = ratings.filter(e => e.data.rating === 'helpful').length
    const notHelpfulRatings = ratings.filter(e => e.data.rating === 'not-helpful').length
    const totalRatings = helpfulRatings + notHelpfulRatings

    const averageStarRating = starRatings.length > 0
      ? starRatings.reduce((sum, e) => sum + (e.data.starRating || 0), 0) / starRatings.length
      : 0

    const totalViews = engagement.length || totalRatings // Fallback if no engagement tracking
    const engagementRate = totalViews > 0 ? (totalRatings / totalViews) * 100 : 0
    
    const timeToInteractions = events
      .map(e => e.data.timeToInteraction)
      .filter((time): time is number => typeof time === 'number')
    
    const averageTimeToInteraction = timeToInteractions.length > 0
      ? timeToInteractions.reduce((sum, time) => sum + time, 0) / timeToInteractions.length
      : 0

    return {
      testimonialId,
      totalViews,
      totalRatings,
      helpfulRatings,
      notHelpfulRatings,
      averageStarRating: Math.round(averageStarRating * 10) / 10,
      totalFeedback: feedback.length,
      engagementRate: Math.round(engagementRate * 100) / 100,
      conversionRate: totalViews > 0 ? Math.round((totalRatings / totalViews) * 10000) / 100 : 0,
      timeToFirstInteraction: averageTimeToInteraction,
      bounceRate: 0, // Would need page navigation data
      lastUpdated: Date.now()
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Batch processing patterns
  // BATCH PATTERN: React documentation shows efficient batch processing
  private addEvent(event: TestimonialRatingEvent): void {
    this.eventQueue.push(event)
    
    if (this.config.enableDebugMode) {
      console.log('TestimonialRatingAnalytics: Event added', event)
    }

    // Store locally for persistence
    this.persistEvent(event)
  }

  private async flush(): Promise<void> {
    if (this.eventQueue.length === 0) return

    const eventsToSend = [...this.eventQueue]
    this.eventQueue = []

    try {
      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        eventsToSend.forEach(event => {
          this.sendToGoogleAnalytics(event)
        })
      }

      // Send to custom API endpoint if configured
      if (this.config.apiEndpoint) {
        await this.sendToAPI(eventsToSend)
      }

      if (this.config.enableDebugMode) {
        console.log('TestimonialRatingAnalytics: Flushed events', eventsToSend.length)
      }

    } catch (error) {
      console.error('TestimonialRatingAnalytics: Failed to flush events', error)
      // Re-queue failed events
      this.eventQueue.unshift(...eventsToSend)
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - Google Analytics integration patterns
  // GA4 PATTERN: Following Google Analytics 4 event tracking patterns
  private sendToGoogleAnalytics(event: TestimonialRatingEvent): void {
    const gtag = (window as any).gtag
    if (!gtag) return

    const eventName = `testimonial_${event.eventType}`
    const eventParams = {
      testimonial_id: event.testimonialId,
      event_category: 'testimonials',
      event_label: event.testimonialId,
      custom_map: {
        dimension1: event.data.deviceType,
        dimension2: event.data.rating || event.data.starRating?.toString(),
        metric1: event.data.feedbackLength || 0
      },
      ...event.data
    }

    gtag('event', eventName, eventParams)
  }

  private async sendToAPI(events: TestimonialRatingEvent[]): Promise<void> {
    if (!this.config.apiEndpoint) return

    const response = await fetch(this.config.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Analytics-Version': '1.0'
      },
      body: JSON.stringify({
        events,
        timestamp: Date.now(),
        sessionId: this.getSessionId()
      })
    })

    if (!response.ok) {
      throw new Error(`Analytics API error: ${response.status}`)
    }
  }

  private startFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
    }

    this.flushTimer = setInterval(() => {
      this.flush()
    }, this.config.flushInterval)
  }

  private handleVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      this.flush()
    }
  }

  // CONTEXT7 SOURCE: /context7/react_dev - GDPR compliance utility functions
  // PRIVACY PATTERN: Following privacy-first patterns from React documentation
  private canTrack(): boolean {
    if (!this.config.enableTracking) return false
    if (this.config.consentRequired && !this.hasUserConsent()) return false
    return true
  }

  private hasUserConsent(): boolean {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('mpt-analytics-consent') === 'true'
  }

  private getUserId(): string {
    if (typeof window === 'undefined') return 'unknown'
    
    const userId = sessionStorage.getItem('mpt-user-id')
    if (userId) return userId
    
    const newUserId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('mpt-user-id', newUserId)
    return newUserId
  }

  private getSessionId(): string {
    if (typeof window === 'undefined') return 'unknown'
    
    const sessionId = sessionStorage.getItem('mpt-session-id')
    if (sessionId) return sessionId
    
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('mpt-session-id', newSessionId)
    return newSessionId
  }

  private getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
    if (typeof window === 'undefined') return 'desktop'
    
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  private persistEvent(event: TestimonialRatingEvent): void {
    if (typeof window === 'undefined') return
    
    try {
      const stored = localStorage.getItem('mpt-analytics-events')
      const events: TestimonialRatingEvent[] = stored ? JSON.parse(stored) : []
      events.push(event)
      
      // Keep only last 100 events to prevent storage bloat
      if (events.length > 100) {
        events.splice(0, events.length - 100)
      }
      
      localStorage.setItem('mpt-analytics-events', JSON.stringify(events))
    } catch (error) {
      console.warn('Failed to persist analytics event', error)
    }
  }

  private async getEventsForTestimonial(testimonialId: string): Promise<TestimonialRatingEvent[]> {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem('mpt-analytics-events')
      const events: TestimonialRatingEvent[] = stored ? JSON.parse(stored) : []
      return events.filter(e => e.testimonialId === testimonialId)
    } catch (error) {
      console.warn('Failed to retrieve analytics events', error)
      return []
    }
  }

  // Public method to clean up resources
  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
      this.flushTimer = null
    }
    
    this.flush() // Final flush
    this.isInitialized = false
    
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', this.flush.bind(this))
      window.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this))
    }
  }
}

// CONTEXT7 SOURCE: /context7/react_dev - Singleton export pattern
// EXPORT PATTERN: React documentation shows proper service instance management
let analyticsInstance: TestimonialRatingAnalytics | null = null

export const createRatingAnalytics = (config: Partial<RatingAnalyticsConfig> = {}): TestimonialRatingAnalytics => {
  if (!analyticsInstance) {
    analyticsInstance = new TestimonialRatingAnalytics({
      enableTracking: process.env.NODE_ENV === 'production',
      batchSize: 5,
      flushInterval: 15000,
      enableDebugMode: process.env.NODE_ENV === 'development',
      consentRequired: true,
      ...config
    })
    
    if (typeof window !== 'undefined') {
      analyticsInstance.initialize()
    }
  }
  
  return analyticsInstance
}

export const getRatingAnalytics = (): TestimonialRatingAnalytics | null => {
  return analyticsInstance
}

// CONTEXT7 SOURCE: /context7/react_dev - React hook pattern for analytics integration
// HOOK PATTERN: Following React documentation for service integration hooks
import { useEffect, useRef } from 'react'

export const useRatingAnalytics = (config?: Partial<RatingAnalyticsConfig>) => {
  const analyticsRef = useRef<TestimonialRatingAnalytics | null>(null)
  
  useEffect(() => {
    if (!analyticsRef.current) {
      analyticsRef.current = createRatingAnalytics(config)
    }
    
    return () => {
      if (analyticsRef.current) {
        analyticsRef.current.destroy()
        analyticsRef.current = null
      }
    }
  }, [config])
  
  return analyticsRef.current
}

export default TestimonialRatingAnalytics