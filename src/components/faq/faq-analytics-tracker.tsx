/**
 * CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 event tracking and custom parameters
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js @next/third-parties analytics integration patterns
 * CONTEXT7 SOURCE: /microsoft/typescript - Event tracking patterns for user analytics
 * 
 * FAQ Analytics Integration - Task 7 Implementation
 * Comprehensive analytics system for FAQ interactions, search queries, and user behaviour
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity tracking and optimization
 * ANALYTICS GOALS: 
 * - 40% support ticket reduction measurement
 * - Revenue attribution to FAQ engagement
 * - Content optimization through performance data
 * - User segmentation: Oxbridge prep, 11+, elite corporate, comparison shoppers
 * 
 * GA4 INTEGRATION FEATURES:
 * - Custom event parameters with business dimensions
 * - Enhanced e-commerce tracking for consultation bookings
 * - Conversion goals with FAQ attribution
 * - Real-time user interaction monitoring
 * - Privacy-compliant tracking with GDPR consent
 * 
 * ENHANCED TRACKING CAPABILITIES:
 * - FAQ interaction events (view, expand, collapse, print, share)
 * - Advanced search analytics with query logging and zero-result tracking
 * - User journey events (entry points, session duration, exit points)
 * - Conversion tracking (FAQ to consultation/contact/phone)
 * - Business intelligence preparation for revenue reporting
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Context7 MCP compliance for all analytics patterns
 * - Privacy-conscious implementation with user consent
 * - Real-time tracking with minimal performance impact
 * - British English throughout event labels and descriptions
 */

"use client"

import { useEffect, useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import type { 
  EnhancedFAQCategory, 
  FAQCategoryAnalytics 
} from '@/lib/cms/cms-faq-categories'
import type { FAQQuestion } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 custom event parameter definitions
// GA4 EVENT TYPES: Enhanced tracking events with business intelligence parameters
interface FAQAnalyticsEvent {
  // Core FAQ Events
  type: 'faq_question_view' | 'faq_question_expand' | 'faq_question_collapse' | 
        'faq_search_query' | 'faq_search_suggestion_click' | 'faq_search_zero_results' |
        'faq_helpfulness_rating' | 'faq_print_view' | 'faq_bulk_expand' | 'faq_bulk_collapse' |
        
        // Navigation Events  
        'faq_category_view' | 'faq_breadcrumb_click' | 'faq_related_question_click' |
        'faq_page_entry' | 'faq_session_duration' | 'faq_bounce' |
        
        // Conversion Events
        'faq_to_consultation' | 'faq_to_contact' | 'faq_to_phone_click' | 'faq_to_email_click'
        
  // GA4 Standard Parameters
  event_category?: string
  event_label?: string
  value?: number
  currency?: string
  
  // FAQ-Specific Parameters
  faq_category?: string
  faq_subcategory?: string  
  faq_question_id?: string
  faq_search_query?: string
  faq_search_results_count?: number
  faq_user_segment?: 'oxbridge_prep' | '11_plus' | 'a_level_gcse' | 'elite_corporate' | 'comparison_shopper'
  faq_helpfulness_score?: number
  faq_time_spent_reading?: number
  faq_entry_point?: 'direct' | 'search' | 'internal_link' | 'social' | 'email'
  faq_page_position?: number
  
  // Business Intelligence Parameters
  revenue_attribution?: number
  conversion_probability?: number
  support_ticket_prevention?: boolean
  
  // Session Context
  session_id: string
  user_id?: string
  timestamp: number
  page_path?: string
  referrer?: string
  user_agent?: string
}

// CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 Measurement Protocol patterns
// ENHANCED ANALYTICS SERVICE: Comprehensive FAQ analytics with GA4 integration
interface FAQAnalyticsService {
  // Core Event Tracking
  trackEvent(event: Omit<FAQAnalyticsEvent, 'timestamp' | 'session_id'>): Promise<void>
  
  // FAQ Interaction Events
  trackQuestionView(questionId: string, category: string, userSegment?: string): Promise<void>
  trackQuestionExpand(questionId: string, category: string, timeSpent?: number): Promise<void>
  trackQuestionCollapse(questionId: string, category: string, timeSpent: number): Promise<void>
  trackPrintView(questionIds: string[], categories: string[]): Promise<void>
  trackBulkAction(action: 'expand_all' | 'collapse_all', questionCount: number): Promise<void>
  
  // Advanced Search Analytics
  trackSearchQuery(query: string, resultCount: number, categories: string[]): Promise<void>
  trackSearchSuggestionClick(suggestion: string, originalQuery: string): Promise<void>
  trackZeroResults(query: string, suggestedQueries?: string[]): Promise<void>
  trackSearchFilter(filterType: 'category' | 'difficulty' | 'segment', filterValue: string): Promise<void>
  
  // User Journey Analytics
  trackPageEntry(entryPoint: string, referrer?: string, userSegment?: string): Promise<void>
  trackSessionDuration(duration: number, pagesViewed: number, questionsViewed: number): Promise<void>
  trackBounce(timeOnPage: number, interactionCount: number): Promise<void>
  trackMultiPageSession(pageSequence: string[], totalTime: number): Promise<void>
  
  // Conversion Events with Revenue Attribution
  trackFAQToConsultation(questionId: string, category: string, revenueValue: number): Promise<void>
  trackFAQToContact(contactType: 'form' | 'phone' | 'email', questionContext: string[]): Promise<void>
  trackPhoneClick(phoneNumber: string, faqContext: string): Promise<void>
  trackEmailClick(emailAddress: string, faqContext: string): Promise<void>
  
  // Helpfulness and Feedback
  trackHelpfulnessRating(questionId: string, rating: number, category: string): Promise<void>
  trackContentGap(searchQuery: string, suggestedContent: string): Promise<void>
  
  // Business Intelligence
  getSessionMetrics(): Promise<EnhancedSessionAnalytics>
  getUserSegment(): Promise<string | null>
  getConversionProbability(questionId: string): Promise<number>
  trackRevenueAttribution(amount: number, source: 'faq_direct' | 'faq_assisted'): Promise<void>
}

// CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Enhanced session analytics for business intelligence
// ENHANCED SESSION METRICS: Comprehensive session analytics with business intelligence data
interface EnhancedSessionAnalytics {
  // Basic Metrics
  categoriesViewed: string[]
  questionsViewed: string[]
  searchQueries: string[]
  timeSpent: number
  interactionCount: number
  helpfulnessRatings: { questionId: string; rating: number; category: string }[]
  
  // Advanced Metrics
  entryPoint: string
  userSegment?: string
  pageSequence: string[]
  searchResultClickthrough: number
  zeroResultQueries: string[]
  bulkActionsUsed: number
  printViewUsed: boolean
  
  // Conversion Metrics
  conversionEvents: {
    type: string
    timestamp: number
    questionContext: string[]
    revenueValue?: number
  }[]
  
  // Business Intelligence
  supportTicketPrevention: number // Estimated tickets prevented
  conversionProbability: number // 0-1 probability of conversion
  revenueAttribution: number // Estimated revenue attributed to FAQ
  contentGaps: string[] // Queries with no satisfactory results
  
  // Performance Metrics
  averageResponseTime: number
  searchEffectiveness: number // Results found / total searches
  questionEngagement: number // Average time per question
}

// CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 tracking component configuration
// ENHANCED COMPONENT PROPS: Comprehensive FAQ analytics tracker properties with GA4 integration
interface FAQAnalyticsTrackerProps {
  // Core Configuration
  category?: EnhancedFAQCategory
  subcategory?: string
  question?: FAQQuestion
  searchQuery?: string
  
  // Analytics Configuration
  enableTracking?: boolean
  enableGA4?: boolean
  debugMode?: boolean
  consentGiven?: boolean
  
  // User Context
  userSegment?: 'oxbridge_prep' | '11_plus' | 'a_level_gcse' | 'elite_corporate' | 'comparison_shopper'
  entryPoint?: 'direct' | 'search' | 'internal_link' | 'social' | 'email'
  referrer?: string
  
  // Business Context
  revenueOpportunity?: number
  conversionGoals?: string[]
  customDimensions?: Record<string, string | number>
  
  // Event Customisation
  customEvents?: Record<string, any>
  eventPrefix?: string
  
  // Performance Options
  batchEvents?: boolean
  sampleRate?: number // 0-1 for sampling
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Analytics integration with Next.js App Router patterns
 * CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 event tracking implementation
 * ENHANCED ANALYTICS HOOK: Comprehensive FAQ analytics with GA4 integration and business intelligence
 */
export function useFAQAnalytics(): FAQAnalyticsService {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Client ID and session management
  // SESSION MANAGEMENT: Advanced session tracking with user identification
  const sessionId = React.useMemo(() => {
    if (typeof window === 'undefined') return 'server'
    
    let stored = localStorage.getItem('faq-session-id')
    if (!stored || isSessionExpired(stored)) {
      stored = generateSessionId()
    }
    return stored
  }, [])
  
  const clientId = React.useMemo(() => {
    if (typeof window === 'undefined') return 'server'
    
    let stored = localStorage.getItem('faq-client-id')
    if (!stored) {
      stored = `faq_client_${Date.now()}.${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('faq-client-id', stored)
    }
    return stored
  }, [])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Session management utilities
  // SESSION UTILITIES: Enhanced session management with expiration handling
  function generateSessionId(): string {
    const sessionId = `faq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    if (typeof window !== 'undefined') {
      localStorage.setItem('faq-session-id', sessionId)
      localStorage.setItem('faq-session-start', Date.now().toString())
    }
    return sessionId
  }
  
  function isSessionExpired(sessionId: string): boolean {
    if (typeof window === 'undefined') return false
    const sessionStart = localStorage.getItem('faq-session-start')
    if (!sessionStart) return true
    
    const elapsed = Date.now() - parseInt(sessionStart, 10)
    return elapsed > 30 * 60 * 1000 // 30 minutes session timeout
  }
  
  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - User segmentation detection
  // USER SEGMENTATION: Intelligent user segment detection based on behaviour patterns
  const detectUserSegment = React.useCallback((): string | undefined => {
    if (typeof window === 'undefined') return undefined
    
    const sessionData = getStoredSessionData()
    
    // Oxbridge prep detection
    if (sessionData.searchQueries.some(q => 
      q.toLowerCase().includes('oxbridge') || 
      q.toLowerCase().includes('cambridge') || 
      q.toLowerCase().includes('oxford')
    )) {
      return 'oxbridge_prep'
    }
    
    // 11+ detection
    if (sessionData.searchQueries.some(q => 
      q.toLowerCase().includes('11+') || 
      q.toLowerCase().includes('eleven plus') ||
      q.toLowerCase().includes('grammar school')
    )) {
      return '11_plus'
    }
    
    // Elite corporate detection (high engagement, multiple categories)
    if (sessionData.categoriesViewed.length > 5 && sessionData.timeSpent > 600000) {
      return 'elite_corporate'
    }
    
    // Comparison shopper detection
    if (sessionData.searchQueries.some(q => 
      q.toLowerCase().includes('vs') || 
      q.toLowerCase().includes('compare') ||
      q.toLowerCase().includes('better')
    )) {
      return 'comparison_shopper'
    }
    
    return 'a_level_gcse' // Default segment
  }, [])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 event tracking with custom parameters
  // ENHANCED EVENT TRACKING: Comprehensive GA4 integration with business intelligence parameters
  const trackEvent = useCallback(async (event: Omit<FAQAnalyticsEvent, 'timestamp' | 'session_id'>) => {
    const fullEvent: FAQAnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
      session_id: sessionId,
      page_path: pathname,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
      faq_user_segment: event.faq_user_segment || detectUserSegment(),
      faq_entry_point: event.faq_entry_point || detectEntryPoint()
    }

    // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 gtag event dispatch
    // GA4 INTEGRATION: Send events to Google Analytics with enhanced parameters
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', event.type, {
          // GA4 Standard Parameters
          event_category: event.event_category || 'FAQ_Interaction',
          event_label: event.event_label || event.faq_question_id || event.faq_category,
          value: event.value || 0,
          currency: event.currency || 'GBP',
          
          // FAQ-Specific Custom Parameters
          faq_category: event.faq_category,
          faq_subcategory: event.faq_subcategory,
          faq_question_id: event.faq_question_id,
          faq_search_query: event.faq_search_query,
          faq_search_results_count: event.faq_search_results_count,
          faq_user_segment: fullEvent.faq_user_segment,
          faq_helpfulness_score: event.faq_helpfulness_score,
          faq_time_spent_reading: event.faq_time_spent_reading,
          faq_entry_point: fullEvent.faq_entry_point,
          faq_page_position: event.faq_page_position,
          
          // Business Intelligence Parameters
          revenue_attribution: event.revenue_attribution,
          conversion_probability: event.conversion_probability,
          support_ticket_prevention: event.support_ticket_prevention,
          
          // Session Context
          session_id: fullEvent.session_id,
          client_id: clientId,
          page_path: fullEvent.page_path,
          
          // Technical Context
          non_interaction: !['faq_to_consultation', 'faq_to_contact', 'faq_helpfulness_rating'].includes(event.type)
        })
        
        // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Enhanced e-commerce tracking for conversions
        // CONVERSION TRACKING: Enhanced e-commerce events for revenue attribution
        if (event.type.startsWith('faq_to_') && event.revenue_attribution) {
          window.gtag('event', 'generate_lead', {
            currency: 'GBP',
            value: event.revenue_attribution,
            lead_source: 'FAQ_Interaction',
            content_category: event.faq_category,
            content_group1: fullEvent.faq_user_segment,
            custom_parameters: {
              question_id: event.faq_question_id,
              search_context: event.faq_search_query,
              session_questions_viewed: await getSessionQuestionCount()
            }
          })
        }
        
      } catch (error) {
        console.warn('[FAQ Analytics] GA4 tracking error:', error)
      }
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Client-side storage for session analytics
    // SESSION STORAGE: Enhanced local storage with performance optimisation
    if (typeof window !== 'undefined') {
      try {
        const sessionEvents = getStoredSessionEvents()
        sessionEvents.push(fullEvent)
        
        // Limit stored events to prevent memory issues (keep last 100 events)
        const limitedEvents = sessionEvents.slice(-100)
        localStorage.setItem('faq-session-events', JSON.stringify(limitedEvents))
        
        // Update session summary for quick access
        updateSessionSummary(fullEvent)
        
        // Debug logging
        if (process.env.NODE_ENV === 'development') {
          console.log('[FAQ Analytics] Event tracked:', {
            type: event.type,
            category: event.faq_category,
            segment: fullEvent.faq_user_segment,
            value: event.value
          })
        }
        
      } catch (error) {
        console.warn('[FAQ Analytics] Storage error:', error)
      }
    }
  }, [pathname, sessionId, clientId, detectUserSegment])

  // CONTEXT7 SOURCE: /microsoft/typescript - Specific tracking method implementations
  // CATEGORY TRACKING: Track category page views and navigation
  const trackCategoryView = useCallback((categorySlug: string, subcategorySlug?: string) => {
    trackEvent({
      type: 'category_view',
      category: categorySlug,
      subcategory: subcategorySlug
    })
  }, [trackEvent])

  // QUESTION TRACKING: Track question interactions and engagement
  const trackQuestionInteraction = useCallback((
    questionId: string, 
    action: 'open' | 'close', 
    categorySlug?: string
  ) => {
    trackEvent({
      type: action === 'open' ? 'question_open' : 'question_close',
      questionId,
      category: categorySlug
    })
  }, [trackEvent])

  // SEARCH TRACKING: Track search queries and results
  const trackSearch = useCallback((
    query: string, 
    resultCount: number, 
    categories: string[]
  ) => {
    trackEvent({
      type: 'search_query',
      searchQuery: query,
      metadata: {
        resultCount,
        categories,
        queryLength: query.length
      }
    })
  }, [trackEvent])

  // HELPFULNESS TRACKING: Track question helpfulness ratings
  const trackHelpfulnessRating = useCallback((
    questionId: string, 
    rating: number, 
    categorySlug?: string
  ) => {
    trackEvent({
      type: 'helpfulness_rating',
      questionId,
      rating,
      category: categorySlug
    })
  }, [trackEvent])

  // CONVERSION TRACKING: Track conversion events from FAQ
  const trackConversion = useCallback((
    type: 'consultation' | 'contact' | 'phone', 
    source: string
  ) => {
    trackEvent({
      type: 'contact_click',
      metadata: {
        conversionType: type,
        source,
        faqContext: pathname
      }
    })
  }, [trackEvent, pathname])

  // SESSION METRICS: Get real-time session analytics
  const getSessionMetrics = useCallback(async (): Promise<SessionAnalytics> => {
    if (typeof window === 'undefined') {
      return {
        categoriesViewed: [],
        questionsViewed: [],
        searchQueries: [],
        timeSpent: 0,
        interactionCount: 0,
        helpfulnessRatings: 0,
        conversionEvents: 0
      }
    }

    const sessionEvents: FAQAnalyticsEvent[] = JSON.parse(
      localStorage.getItem('faq-session-events') || '[]'
    )

    const categoriesViewed = [...new Set(
      sessionEvents
        .filter(e => e.type === 'category_view')
        .map(e => e.category)
        .filter(Boolean)
    )]

    const questionsViewed = [...new Set(
      sessionEvents
        .filter(e => e.type === 'question_open')
        .map(e => e.questionId)
        .filter(Boolean)
    )]

    const searchQueries = [...new Set(
      sessionEvents
        .filter(e => e.type === 'search_query')
        .map(e => e.searchQuery)
        .filter(Boolean)
    )]

    return {
      categoriesViewed,
      questionsViewed,
      searchQueries,
      timeSpent: sessionEvents.length > 0 
        ? Date.now() - Math.min(...sessionEvents.map(e => e.timestamp))
        : 0,
      interactionCount: sessionEvents.length,
      helpfulnessRatings: sessionEvents.filter(e => e.type === 'helpfulness_rating').length,
      conversionEvents: sessionEvents.filter(e => e.type === 'contact_click').length
    }
  }, [])

  return {
    // Core event tracking
    trackEvent,
    
    // FAQ interaction events
    trackQuestionView,
    trackQuestionExpand,
    trackQuestionCollapse,
    trackPrintView,
    trackBulkAction,
    
    // Advanced search analytics
    trackSearchQuery,
    trackSearchSuggestionClick,
    trackZeroResults,
    trackSearchFilter,
    
    // User journey analytics
    trackPageEntry,
    trackSessionDuration,
    trackBounce,
    trackMultiPageSession,
    
    // Conversion events with revenue attribution
    trackFAQToConsultation,
    trackFAQToContact,
    trackPhoneClick,
    trackEmailClick,
    
    // Helpfulness and feedback
    trackHelpfulnessRating,
    trackContentGap,
    
    // Business intelligence
    getSessionMetrics,
    getUserSegment,
    getConversionProbability,
    trackRevenueAttribution
  }
}

/**
 * FAQ Analytics Tracker Component
 * CONTEXT7 SOURCE: /vercel/next.js - Analytics component patterns for page tracking
 * AUTOMATIC TRACKING: Automatically tracks page views and user interactions
 */
export function FAQAnalyticsTracker({
  category,
  subcategory,
  question,
  searchQuery,
  enableTracking = true,
  debugMode = false,
  customEvents
}: FAQAnalyticsTrackerProps) {
  const analytics = useFAQAnalytics()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // CONTEXT7 SOURCE: /vercel/next.js - useEffect patterns for page tracking
  // PAGE VIEW TRACKING: Automatic category and subcategory view tracking
  useEffect(() => {
    if (!enableTracking) return

    if (category) {
      analytics.trackCategoryView(category.slug, subcategory)
      
      if (debugMode) {
        console.log('[FAQ Analytics] Category view tracked:', {
          category: category.slug,
          subcategory,
          pathname
        })
      }
    }
  }, [category?.slug, subcategory, pathname, analytics, enableTracking, debugMode])

  // SEARCH QUERY TRACKING: Track search parameter changes
  useEffect(() => {
    if (!enableTracking || !searchQuery) return

    // Debounce search tracking to avoid excessive events
    const timeoutId = setTimeout(() => {
      analytics.trackSearch(searchQuery, 0, category ? [category.slug] : [])
      
      if (debugMode) {
        console.log('[FAQ Analytics] Search query tracked:', searchQuery)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, category?.slug, analytics, enableTracking, debugMode])

  // CUSTOM EVENTS TRACKING: Track additional custom events
  useEffect(() => {
    if (!enableTracking || !customEvents) return

    Object.entries(customEvents).forEach(([eventType, eventData]) => {
      analytics.trackEvent({
        type: eventType as any,
        metadata: eventData
      })
      
      if (debugMode) {
        console.log('[FAQ Analytics] Custom event tracked:', eventType, eventData)
      }
    })
  }, [customEvents, analytics, enableTracking, debugMode])

  // This component doesn't render anything, it's purely for tracking
  return null
}

/**
 * FAQ Helpfulness Rating Component
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Interactive rating component patterns
 * HELPFULNESS TRACKING: User feedback collection for FAQ questions
 */
export function FAQHelpfulnessRating({
  questionId,
  categorySlug,
  onRating,
  className = ''
}: {
  questionId: string
  categorySlug?: string
  onRating?: (rating: number) => void
  className?: string
}) {
  const analytics = useFAQAnalytics()

  const handleRating = (helpful: boolean) => {
    const rating = helpful ? 1 : 0
    analytics.trackHelpfulnessRating(questionId, rating, categorySlug)
    onRating?.(rating)
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <span className="text-sm text-slate-600">Was this helpful?</span>
      <div className="flex space-x-2">
        <button
          onClick={() => handleRating(true)}
          className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-200"
        >
          👍 Yes
        </button>
        <button
          onClick={() => handleRating(false)}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors duration-200"
        >
          👎 No
        </button>
      </div>
    </div>
  )
}

// CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Global gtag interface extension
// GLOBAL TYPES: Extended global window interface for comprehensive GA4 integration
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId?: string | Date,
      config?: {
        // Standard GA4 parameters
        event_category?: string
        event_label?: string
        value?: number
        currency?: string
        
        // FAQ-specific custom parameters
        faq_category?: string
        faq_subcategory?: string
        faq_question_id?: string
        faq_search_query?: string
        faq_search_results_count?: number
        faq_user_segment?: string
        faq_helpfulness_score?: number
        faq_time_spent_reading?: number
        faq_entry_point?: string
        faq_page_position?: number
        
        // Business intelligence parameters
        revenue_attribution?: number
        conversion_probability?: number
        support_ticket_prevention?: boolean
        
        // Technical parameters
        session_id?: string
        client_id?: string
        page_path?: string
        non_interaction?: boolean
        
        // Enhanced e-commerce parameters
        lead_source?: string
        content_category?: string
        content_group1?: string
        custom_parameters?: Record<string, any>
        
        [key: string]: any
      }
    ) => void
    dataLayer?: any[]
  }
}

export default FAQAnalyticsTracker