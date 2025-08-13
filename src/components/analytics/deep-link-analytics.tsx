/**
 * CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Deep link analytics tracking
 * ANALYTICS INTEGRATION: Comprehensive tracking for mobile app deep linking performance
 * 
 * Deep Link Analytics Component
 * Tracks Universal Links, App Links, and PWA deep link usage for revenue optimization
 */

'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { useDeepLinkHandler } from '@/lib/deep-linking/deep-link-handler'
import { detectPlatform, type DeepLinkAnalytics } from '@/lib/deep-linking/url-patterns'

// CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Analytics configuration interface
// ANALYTICS CONFIG: Deep link tracking configuration for GA4 and business intelligence
export interface DeepLinkAnalyticsConfig {
  enableGA4?: boolean
  enableCustomEvents?: boolean
  enablePerformanceTracking?: boolean
  enableConversionTracking?: boolean
  revenueOpportunity?: number
  conversionGoals?: ('consultation' | 'contact' | 'phone' | 'enquiry')[]
  debugMode?: boolean
  customDimensions?: Record<string, string | number>
}

export interface DeepLinkAnalyticsProps {
  config: DeepLinkAnalyticsConfig
  onAnalyticsEvent?: (event: DeepLinkAnalytics & { eventType: string }) => void
  className?: string
}

/**
 * CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Deep link analytics tracking component
 * REVENUE TRACKING: Track deep link performance for £381,600+ revenue opportunity
 */
export function DeepLinkAnalytics({
  config,
  onAnalyticsEvent,
  className = ''
}: DeepLinkAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { state, utilities } = useDeepLinkHandler()
  
  const sessionStart = useRef<number>(Date.now())
  const deepLinkEvents = useRef<DeepLinkAnalytics[]>([])
  const performanceMetrics = useRef<{
    loadTime: number
    renderTime: number
    interactionTime: number
    conversionTime?: number
  }>({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0
  })

  const {
    enableGA4 = true,
    enableCustomEvents = true,
    enablePerformanceTracking = true,
    enableConversionTracking = true,
    revenueOpportunity = 150,
    conversionGoals = ['consultation', 'contact', 'phone', 'enquiry'],
    debugMode = false,
    customDimensions = {}
  } = config

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 event tracking for deep links
  // GA4 INTEGRATION: Track deep link events with custom parameters and revenue attribution
  const trackGA4Event = useCallback((
    eventName: string,
    parameters: Record<string, any>
  ) => {
    if (!enableGA4 || typeof window === 'undefined' || !(window as any).gtag) return

    const enhancedParameters = {
      // Standard GA4 parameters
      event_category: 'FAQ Deep Linking',
      event_label: state.pattern || 'unknown',
      
      // Deep link specific parameters
      deep_link_pattern: state.pattern,
      deep_link_platform: state.platform,
      deep_link_category: state.params.categoryId,
      deep_link_question: state.params.questionId,
      deep_link_search: state.params.searchQuery,
      deep_link_theme: state.params.theme,
      deep_link_source: state.params.source,
      
      // Revenue and conversion tracking
      revenue_opportunity: revenueOpportunity,
      conversion_potential: calculateConversionPotential(),
      
      // Performance metrics
      load_time: performanceMetrics.current.loadTime,
      render_time: performanceMetrics.current.renderTime,
      interaction_time: performanceMetrics.current.interactionTime,
      
      // Session and user context
      session_duration: Date.now() - sessionStart.current,
      user_agent: navigator.userAgent,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      
      // Custom dimensions
      ...customDimensions,
      
      // Event specific parameters
      ...parameters
    };

    (window as any).gtag('event', eventName, enhancedParameters)

    if (debugMode) {
      console.log('GA4 Deep Link Event:', eventName, enhancedParameters)
    }
  }, [state, revenueOpportunity, customDimensions, enableGA4, debugMode])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Conversion potential calculation
  // CONVERSION ANALYSIS: Calculate conversion potential based on deep link context
  const calculateConversionPotential = useCallback((): number => {
    let score = 0.1 // Base conversion rate

    // Category-based scoring
    if (state.params.categoryId) {
      const highIntentCategories = ['pricing', 'booking', 'academic', 'oxbridge']
      if (highIntentCategories.includes(state.params.categoryId)) {
        score += 0.3
      }
    }

    // Search query scoring
    if (state.params.searchQuery) {
      const highIntentKeywords = ['price', 'cost', 'book', 'schedule', 'tutor', 'lesson']
      const query = state.params.searchQuery.toLowerCase()
      const keywordMatches = highIntentKeywords.filter(keyword => query.includes(keyword))
      score += keywordMatches.length * 0.1
    }

    // Platform scoring
    if (state.platform === 'ios' || state.platform === 'android') {
      score += 0.2 // Mobile users more likely to convert
    }

    // Source scoring
    if (state.params.source === 'universal_link' || state.params.source === 'app_link') {
      score += 0.15 // Direct deep links indicate higher intent
    }

    return Math.min(score, 1.0) // Cap at 100%
  }, [state])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Performance metrics tracking
  // PERFORMANCE TRACKING: Monitor deep link loading and interaction performance
  const trackPerformanceMetrics = useCallback(() => {
    if (!enablePerformanceTracking) return

    // Measure load time
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        performanceMetrics.current.loadTime = navigation.loadEventEnd - navigation.loadEventStart
      }
    }

    // Measure render time
    const renderStart = performance.now()
    requestAnimationFrame(() => {
      performanceMetrics.current.renderTime = performance.now() - renderStart
    })

    // Track Time to Interactive (TTI)
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure' && entry.name === 'first-input-delay') {
            performanceMetrics.current.interactionTime = entry.duration
          }
        }
      })
      observer.observe({ entryTypes: ['measure'] })
    }
  }, [enablePerformanceTracking])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Deep link event tracking
  // EVENT TRACKING: Comprehensive deep link usage tracking
  const trackDeepLinkEvent = useCallback((
    eventType: 'access' | 'navigation' | 'search' | 'share' | 'conversion',
    additionalData: Record<string, any> = {}
  ) => {
    const analyticsEvent: DeepLinkAnalytics & { eventType: string } = {
      pattern: state.pattern || 'unknown',
      params: state.params,
      platform: state.platform,
      timestamp: Date.now(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      conversionGoal: determineConversionGoal(),
      eventType
    }

    // Store event for session analysis
    deepLinkEvents.current.push(analyticsEvent)

    // Track with GA4
    if (enableGA4) {
      trackGA4Event(`deep_link_${eventType}`, {
        ...additionalData,
        event_timestamp: analyticsEvent.timestamp,
        conversion_goal: analyticsEvent.conversionGoal
      })
    }

    // Custom event callback
    if (onAnalyticsEvent) {
      onAnalyticsEvent(analyticsEvent)
    }

    // Debug logging
    if (debugMode) {
      console.log('Deep Link Event Tracked:', analyticsEvent)
    }
  }, [state, enableGA4, trackGA4Event, onAnalyticsEvent, debugMode])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Conversion goal determination
  // CONVERSION LOGIC: Determine appropriate conversion goal based on deep link context
  const determineConversionGoal = useCallback((): 'consultation' | 'contact' | 'phone' | 'enquiry' => {
    // Contact-related patterns
    if (state.pattern === 'faq_contact' || state.params.categoryId === 'contact') {
      return 'contact'
    }
    
    // High-intent categories
    if (state.params.categoryId && ['pricing', 'booking', 'academic', 'oxbridge'].includes(state.params.categoryId)) {
      return 'consultation'
    }
    
    // Search queries indicating high intent
    if (state.params.searchQuery) {
      const highIntentKeywords = ['price', 'cost', 'book', 'schedule', 'oxbridge', 'tutor', 'lesson']
      const query = state.params.searchQuery.toLowerCase()
      if (highIntentKeywords.some(keyword => query.includes(keyword))) {
        return 'consultation'
      }
    }
    
    return 'enquiry'
  }, [state])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Session analysis tracking
  // SESSION ANALYSIS: Track complete deep link session for funnel analysis
  const trackSessionAnalysis = useCallback(() => {
    const sessionData = {
      session_start: sessionStart.current,
      session_duration: Date.now() - sessionStart.current,
      total_events: deepLinkEvents.current.length,
      event_types: [...new Set(deepLinkEvents.current.map(e => (e as any).eventType))],
      unique_patterns: [...new Set(deepLinkEvents.current.map(e => e.pattern))],
      conversion_potential: calculateConversionPotential(),
      performance_metrics: performanceMetrics.current
    }

    if (enableGA4) {
      trackGA4Event('deep_link_session_analysis', sessionData)
    }

    if (debugMode) {
      console.log('Deep Link Session Analysis:', sessionData)
    }
  }, [calculateConversionPotential, enableGA4, trackGA4Event, debugMode])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Deep link access tracking
  // ACCESS TRACKING: Track when deep links are accessed
  useEffect(() => {
    if (state.isDeepLink && state.pattern) {
      trackDeepLinkEvent('access', {
        initial_load: true,
        pattern_matched: state.pattern,
        has_category: !!state.params.categoryId,
        has_question: !!state.params.questionId,
        has_search: !!state.params.searchQuery
      })
    }
  }, [state.isDeepLink, state.pattern, trackDeepLinkEvent])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Navigation tracking
  // NAVIGATION TRACKING: Track navigation events within FAQ deep links
  useEffect(() => {
    if (state.isDeepLink) {
      trackDeepLinkEvent('navigation', {
        pathname,
        search_params: Object.fromEntries(searchParams.entries()),
        navigation_type: 'spa_routing'
      })
    }
  }, [pathname, searchParams, state.isDeepLink, trackDeepLinkEvent])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Performance monitoring setup
  // PERFORMANCE SETUP: Initialize performance tracking
  useEffect(() => {
    trackPerformanceMetrics()
  }, [trackPerformanceMetrics])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Session cleanup and analysis
  // CLEANUP: Perform session analysis on component unmount
  useEffect(() => {
    return () => {
      if (deepLinkEvents.current.length > 0) {
        trackSessionAnalysis()
      }
    }
  }, [trackSessionAnalysis])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Conversion tracking setup
  // CONVERSION TRACKING: Monitor for conversion events
  useEffect(() => {
    if (!enableConversionTracking) return

    const handleConversionEvent = (event: CustomEvent) => {
      const { conversionType, value, additionalData } = event.detail

      if (conversionGoals.includes(conversionType)) {
        trackDeepLinkEvent('conversion', {
          conversion_type: conversionType,
          conversion_value: value || revenueOpportunity,
          conversion_time: Date.now() - sessionStart.current,
          ...additionalData
        })

        // Track conversion time
        performanceMetrics.current.conversionTime = Date.now() - sessionStart.current
      }
    }

    window.addEventListener('faq-conversion', handleConversionEvent as EventListener)
    return () => window.removeEventListener('faq-conversion', handleConversionEvent as EventListener)
  }, [enableConversionTracking, conversionGoals, revenueOpportunity, trackDeepLinkEvent])

  // No visual component - pure analytics tracking
  return null
}

// CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Conversion event helper
// CONVERSION HELPER: Utility function to trigger conversion tracking
export function triggerConversionEvent(
  conversionType: 'consultation' | 'contact' | 'phone' | 'enquiry',
  value?: number,
  additionalData?: Record<string, any>
) {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('faq-conversion', {
      detail: {
        conversionType,
        value,
        additionalData
      }
    })
    window.dispatchEvent(event)
  }
}