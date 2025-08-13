/**
 * TESTIMONIALS PERSONALIZATION PROVIDER - TASK 14 IMPLEMENTATION
 * CONTEXT7 SOURCE: /facebook/react - Context Provider patterns for state management
 * CONTEXT7 SOURCE: /davidwells/analytics - Real-time analytics integration patterns
 * 
 * TASK 14: Dynamic testimonials personalization provider component
 * Integrates AI personalization engine with React components for real-time testimonial adaptation
 * 
 * BUSINESS CONTEXT: £70,000+ revenue opportunity through personalized social proof
 * INTEGRATION: Builds on Task 9 categorization and Task 13 A/B testing frameworks
 * PERFORMANCE: <50ms personalization response with intelligent caching
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Context7 MCP documentation patterns for all implementations
 * - Integration with existing A/B testing infrastructure
 * - Enterprise-grade performance and privacy compliance
 * - British English terminology and premium service quality
 */

'use client'

import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback, 
  useMemo,
  useRef
} from 'react'
import { testimonialsPersonalizationEngine } from '@/lib/ai/testimonials-personalization-engine'
import { behavioralAnalytics } from '@/lib/analytics/behavioral-analytics'
import { useABTesting } from '@/components/testimonials/testimonials-ab-testing-provider'
import type { Testimonial } from '@/lib/cms/cms-content'
import type { 
  PersonalizationResult,
  VisitorBehaviorData
} from '@/lib/ai/testimonials-personalization-engine'
import type { SessionContext } from '@/lib/analytics/behavioral-analytics'

// CONTEXT7 SOURCE: /facebook/react - Context interface patterns for personalization
interface PersonalizationContextValue {
  // Personalization state
  personalizedTestimonials: PersonalizationResult | null
  isPersonalizing: boolean
  personalizationError: string | null
  
  // Session and behavior tracking
  sessionContext: SessionContext | null
  behaviorData: VisitorBehaviorData | null
  
  // Personalization controls
  refreshPersonalization: () => Promise<void>
  trackTestimonialInteraction: (testimonialId: string, interactionType: string, value?: number) => void
  trackUserPreference: (preference: Record<string, any>) => void
  
  // Performance and analytics
  personalizationMetrics: {
    processingTime: number
    confidence: number
    cacheHitRate: number
  }
  
  // Privacy and consent
  updateConsentLevel: (level: 'minimal' | 'standard' | 'full') => void
  exportUserData: () => Promise<any>
  deleteUserData: () => Promise<void>
}

// CONTEXT7 SOURCE: /facebook/react - Context creation patterns
const PersonalizationContext = createContext<PersonalizationContextValue | null>(null)

interface PersonalizationProviderProps {
  children: React.ReactNode
  testimonials: Testimonial[]
  userId?: string
  initialConsentLevel?: 'minimal' | 'standard' | 'full'
  enableRealTimeUpdates?: boolean
  debugMode?: boolean
}

// CONTEXT7 SOURCE: /facebook/react - Provider component implementation patterns
export function TestimonialsPersonalizationProvider({
  children,
  testimonials,
  userId,
  initialConsentLevel = 'standard',
  enableRealTimeUpdates = true,
  debugMode = false
}: PersonalizationProviderProps) {
  // State management
  const [personalizedTestimonials, setPersonalizedTestimonials] = useState<PersonalizationResult | null>(null)
  const [isPersonalizing, setIsPersonalizing] = useState(false)
  const [personalizationError, setPersonalizationError] = useState<string | null>(null)
  const [sessionContext, setSessionContext] = useState<SessionContext | null>(null)
  const [behaviorData, setBehaviorData] = useState<VisitorBehaviorData | null>(null)
  const [consentLevel, setConsentLevel] = useState(initialConsentLevel)
  
  // Refs for tracking
  const sessionIdRef = useRef<string>()
  const personalizationTimeoutRef = useRef<NodeJS.Timeout>()
  const behaviorUpdateUnsubscribeRef = useRef<(() => void)>()
  
  // A/B testing integration
  const { 
    getVariantForComponent, 
    trackConversion, 
    trackInteraction 
  } = useABTesting()

  // CONTEXT7 SOURCE: /facebook/react - Effect hooks for initialization
  useEffect(() => {
    initializePersonalizationSession()
    return () => cleanup()
  }, [userId, consentLevel])

  // CONTEXT7 SOURCE: /davidwells/analytics - Real-time behavior tracking integration
  useEffect(() => {
    if (enableRealTimeUpdates && sessionContext?.consentGiven) {
      setupRealTimeBehaviorTracking()
    }
    return () => {
      behaviorUpdateUnsubscribeRef.current?.()
    }
  }, [sessionContext, enableRealTimeUpdates])

  const initializePersonalizationSession = useCallback(async () => {
    try {
      // Generate session ID
      const sessionId = generateSessionId()
      sessionIdRef.current = sessionId
      
      // CONTEXT7 SOURCE: /davidwells/analytics - Session initialization patterns
      const session = behavioralAnalytics.initializeSession(
        sessionId,
        userId,
        consentLevel
      )
      setSessionContext(session)
      
      // Track initial page view
      behavioralAnalytics.trackPageView(sessionId, {
        path: window.location.pathname,
        title: document.title,
        category: 'testimonials'
      })
      
      // Initialize behavior data
      const initialBehaviorData = behavioralAnalytics.getBehaviorData(sessionId)
      if (initialBehaviorData) {
        setBehaviorData(initialBehaviorData)
        
        // Perform initial personalization
        await performPersonalization(initialBehaviorData)
      }
      
      if (debugMode) {
        console.log('[Personalization] Session initialized:', sessionId)
      }
    } catch (error) {
      console.error('[Personalization] Failed to initialize session:', error)
      setPersonalizationError('Failed to initialize personalization system')
    }
  }, [userId, consentLevel, debugMode])

  const setupRealTimeBehaviorTracking = useCallback(() => {
    if (!sessionIdRef.current) return
    
    // CONTEXT7 SOURCE: /davidwells/analytics - Real-time behavior monitoring patterns
    const unsubscribe = behavioralAnalytics.subscribeToBehaviorUpdates((data) => {
      setBehaviorData(data)
      
      // Debounced personalization update
      if (personalizationTimeoutRef.current) {
        clearTimeout(personalizationTimeoutRef.current)
      }
      
      personalizationTimeoutRef.current = setTimeout(() => {
        performPersonalization(data)
      }, 500) // 500ms debounce
    })
    
    behaviorUpdateUnsubscribeRef.current = unsubscribe
    
    // Setup mouse and scroll tracking
    setupInteractionTracking()
  }, [])

  const setupInteractionTracking = useCallback(() => {
    if (!sessionIdRef.current) return
    
    // CONTEXT7 SOURCE: /davidwells/analytics - DOM interaction tracking patterns
    const sessionId = sessionIdRef.current
    
    // Mouse movement tracking (throttled)
    let mouseTrackingTimeout: NodeJS.Timeout
    const handleMouseMove = (event: MouseEvent) => {
      if (mouseTrackingTimeout) return
      
      mouseTrackingTimeout = setTimeout(() => {
        behavioralAnalytics.trackEvent(sessionId, {
          eventType: 'hover',
          eventData: { metadata: { mouseMove: true } },
          coordinates: { x: event.clientX, y: event.clientY }
        })
        mouseTrackingTimeout = null as any
      }, 1000)
    }
    
    // Scroll tracking (throttled)
    let scrollTrackingTimeout: NodeJS.Timeout
    const handleScroll = () => {
      if (scrollTrackingTimeout) return
      
      scrollTrackingTimeout = setTimeout(() => {
        const scrollDepth = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        behavioralAnalytics.trackScrollBehavior(sessionId, {
          scrollDepth: Math.round(scrollDepth),
          maxScroll: Math.round(scrollDepth),
          scrollVelocity: 1,
          direction: 'down'
        })
        scrollTrackingTimeout = null as any
      }, 200)
    }
    
    // Click tracking
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const element = target.tagName.toLowerCase() + (target.className ? `.${target.className.replace(/\s+/g, '.')}` : '')
      
      behavioralAnalytics.trackEvent(sessionId, {
        eventType: 'click',
        eventData: {
          element,
          coordinates: { x: event.clientX, y: event.clientY }
        }
      })
    }
    
    // Attach event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick, { passive: true })
    
    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const performPersonalization = useCallback(async (behaviorData: VisitorBehaviorData) => {
    if (!behaviorData || isPersonalizing) return
    
    setIsPersonalizing(true)
    setPersonalizationError(null)
    
    try {
      // Get A/B testing variant if applicable
      const variant = getVariantForComponent('testimonials-grid')
      
      // CONTEXT7 SOURCE: /tensorflow/tfjs - AI personalization with performance tracking
      const startTime = performance.now()
      const result = await testimonialsPersonalizationEngine.personalizeTestimonials(
        behaviorData,
        testimonials,
        6, // max results
        variant || undefined
      )
      
      setPersonalizedTestimonials(result)
      
      // Track personalization performance
      if (debugMode) {
        console.log('[Personalization] Generated recommendations:', {
          processingTime: result.processingTimeMs,
          confidence: result.overallConfidence,
          primaryCount: result.primaryTestimonials.length,
          secondaryCount: result.secondaryTestimonials.length
        })
      }
      
      // Track A/B testing interaction if variant is active
      if (variant) {
        trackInteraction('testimonials-grid', 'personalization_generated', {
          confidence: result.overallConfidence,
          processingTime: result.processingTimeMs
        })
      }
      
    } catch (error) {
      console.error('[Personalization] Failed to generate recommendations:', error)
      setPersonalizationError('Failed to generate personalized recommendations')
    } finally {
      setIsPersonalizing(false)
    }
  }, [testimonials, isPersonalizing, getVariantForComponent, trackInteraction, debugMode])

  const refreshPersonalization = useCallback(async () => {
    if (behaviorData) {
      await performPersonalization(behaviorData)
    }
  }, [behaviorData, performPersonalization])

  const trackTestimonialInteraction = useCallback((
    testimonialId: string,
    interactionType: string,
    value: number = 1
  ) => {
    if (!sessionIdRef.current) return
    
    // CONTEXT7 SOURCE: /davidwells/analytics - Content interaction tracking
    behavioralAnalytics.trackTestimonialInteraction(sessionIdRef.current, {
      testimonialId,
      interactionType: interactionType as any,
      duration: interactionType === 'view' ? value : undefined
    })
    
    // Learn from interaction for future personalization
    testimonialsPersonalizationEngine.learnFromInteraction(
      sessionIdRef.current,
      testimonialId,
      interactionType as any,
      value
    )
    
    // Track conversion if applicable
    if (interactionType === 'click' || interactionType === 'share') {
      trackConversion('testimonial_interaction', value, {
        testimonialId,
        interactionType
      })
    }
    
    if (debugMode) {
      console.log('[Personalization] Tracked interaction:', {
        testimonialId,
        interactionType,
        value
      })
    }
  }, [trackConversion, debugMode])

  const trackUserPreference = useCallback((preference: Record<string, any>) => {
    if (!sessionIdRef.current) return
    
    // Track preference data for future personalization
    behavioralAnalytics.trackEvent(sessionIdRef.current, {
      eventType: 'form_interaction',
      eventData: {
        value: 'user_preference',
        metadata: preference
      },
      element: 'preference-form'
    })
  }, [])

  const updateConsentLevel = useCallback(async (level: 'minimal' | 'standard' | 'full') => {
    setConsentLevel(level)
    
    if (sessionIdRef.current) {
      // Reinitialize session with new consent level
      const session = behavioralAnalytics.initializeSession(
        sessionIdRef.current,
        userId,
        level
      )
      setSessionContext(session)
      
      // Clear data if consent is reduced
      if (level === 'minimal') {
        setBehaviorData(null)
        setPersonalizedTestimonials(null)
      }
    }
  }, [userId])

  const exportUserData = useCallback(async () => {
    if (!sessionIdRef.current) return null
    
    // Export user data for GDPR compliance
    return {
      sessionId: sessionIdRef.current,
      behaviorData: behaviorData,
      personalizedTestimonials: personalizedTestimonials,
      sessionContext: sessionContext,
      consentLevel: consentLevel
    }
  }, [behaviorData, personalizedTestimonials, sessionContext, consentLevel])

  const deleteUserData = useCallback(async () => {
    if (!sessionIdRef.current) return
    
    // Clear all user data for GDPR compliance
    behavioralAnalytics.clearSessionData(sessionIdRef.current)
    testimonialsPersonalizationEngine.clearSessionData(sessionIdRef.current)
    
    setBehaviorData(null)
    setPersonalizedTestimonials(null)
    setSessionContext(null)
    
    if (debugMode) {
      console.log('[Personalization] User data deleted')
    }
  }, [debugMode])

  const cleanup = useCallback(() => {
    if (personalizationTimeoutRef.current) {
      clearTimeout(personalizationTimeoutRef.current)
    }
    behaviorUpdateUnsubscribeRef.current?.()
  }, [])

  // CONTEXT7 SOURCE: /facebook/react - Memoized context value patterns
  const contextValue = useMemo<PersonalizationContextValue>(() => {
    const metrics = personalizedTestimonials ? {
      processingTime: personalizedTestimonials.processingTimeMs,
      confidence: personalizedTestimonials.overallConfidence,
      cacheHitRate: personalizedTestimonials.cacheHitRate
    } : {
      processingTime: 0,
      confidence: 0,
      cacheHitRate: 0
    }
    
    return {
      personalizedTestimonials,
      isPersonalizing,
      personalizationError,
      sessionContext,
      behaviorData,
      refreshPersonalization,
      trackTestimonialInteraction,
      trackUserPreference,
      personalizationMetrics: metrics,
      updateConsentLevel,
      exportUserData,
      deleteUserData
    }
  }, [
    personalizedTestimonials,
    isPersonalizing,
    personalizationError,
    sessionContext,
    behaviorData,
    refreshPersonalization,
    trackTestimonialInteraction,
    trackUserPreference,
    updateConsentLevel,
    exportUserData,
    deleteUserData
  ])

  return (
    <PersonalizationContext.Provider value={contextValue}>
      {children}
    </PersonalizationContext.Provider>
  )
}

// CONTEXT7 SOURCE: /facebook/react - Custom hook patterns for context consumption
export function useTestimonialsPersonalization() {
  const context = useContext(PersonalizationContext)
  if (!context) {
    throw new Error('useTestimonialsPersonalization must be used within a TestimonialsPersonalizationProvider')
  }
  return context
}

// CONTEXT7 SOURCE: /facebook/react - Specialized hook patterns
export function usePersonalizedTestimonials() {
  const { personalizedTestimonials, isPersonalizing, personalizationError } = useTestimonialsPersonalization()
  
  const primaryTestimonials = personalizedTestimonials?.primaryTestimonials || []
  const secondaryTestimonials = personalizedTestimonials?.secondaryTestimonials || []
  const fallbackTestimonials = personalizedTestimonials?.fallbackTestimonials || []
  
  return {
    primary: primaryTestimonials,
    secondary: secondaryTestimonials,
    fallback: fallbackTestimonials,
    isLoading: isPersonalizing,
    error: personalizationError,
    isEmpty: primaryTestimonials.length === 0 && secondaryTestimonials.length === 0
  }
}

// CONTEXT7 SOURCE: /facebook/react - Performance monitoring hook patterns
export function usePersonalizationPerformance() {
  const { personalizationMetrics, behaviorData } = useTestimonialsPersonalization()
  
  return {
    ...personalizationMetrics,
    sessionDuration: behaviorData?.sessionDuration || 0,
    pageViews: behaviorData?.pageViews.length || 0,
    interactions: behaviorData?.clickEvents.length || 0
  }
}

// Helper function for generating session IDs
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Higher-order component for automatic personalization integration
export function withPersonalization<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const WithPersonalizationComponent = (props: P) => {
    const personalization = useTestimonialsPersonalization()
    
    // Enhanced props with personalization data
    const enhancedProps = {
      ...props,
      personalization
    } as P & { personalization: PersonalizationContextValue }
    
    return <WrappedComponent {...enhancedProps} />
  }
  
  WithPersonalizationComponent.displayName = `withPersonalization(${WrappedComponent.displayName || WrappedComponent.name})`
  
  return WithPersonalizationComponent
}