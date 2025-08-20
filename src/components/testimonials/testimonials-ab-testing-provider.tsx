/**
 * TESTIMONIALS A/B TESTING PROVIDER - EXPERIMENT CONTEXT & VARIANT MANAGEMENT
 * CONTEXT7 SOURCE: /posthog/posthog - Feature flag provider patterns for experiment management
 * CONTEXT7 SOURCE: /facebook/react - Context API patterns for state management
 * 
 * TASK 13: A/B testing provider component for seamless experiment integration
 * This provider component wraps testimonial components to enable A/B testing
 * with automatic variant assignment, conversion tracking, and performance monitoring.
 * 
 * BUSINESS IMPACT: £40,000+ through optimized testimonial experiences
 * ROYAL CLIENT STANDARDS: Invisible testing with premium user experience
 */

'use client'

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { ABTestingEngine, defaultABTestConfig } from '@/lib/analytics/ab-testing-engine'
import {
  ABTestExperiment,
  ExperimentVariant,
  VariantConfiguration,
  ABTestAnalysis,
  ExperimentExecutiveSummary,
  TestimonialsComponent
} from '@/types/testimonials-ab-testing.types'

// CONTEXT7 SOURCE: /facebook/react - Context interface patterns for type safety
interface ABTestContextValue {
  // Experiment management
  getVariantForComponent: (component: TestimonialsComponent) => ExperimentVariant | null
  getVariantConfiguration: (component: TestimonialsComponent) => VariantConfiguration
  isInExperiment: (component: TestimonialsComponent) => boolean
  
  // Event tracking
  trackConversion: (eventType: string, value?: number, metadata?: Record<string, any>) => void
  trackInteraction: (component: TestimonialsComponent, interactionType: string, metadata?: Record<string, any>) => void
  
  // Analysis and reporting
  getExperimentAnalysis: (experimentId: string) => ABTestAnalysis | null
  getExecutiveSummary: (experimentId: string) => ExperimentExecutiveSummary | null
  
  // Performance monitoring
  reportPerformanceMetric: (component: TestimonialsComponent, metricName: string, value: number) => void
  
  // State
  activeExperiments: ABTestExperiment[]
  userVariantAssignments: Map<string, string>
  isLoading: boolean
}

// CONTEXT7 SOURCE: /facebook/react - Context creation patterns
const ABTestContext = createContext<ABTestContextValue | null>(null)

interface ABTestProviderProps {
  children: React.ReactNode
  userId: string
  userAttributes?: Record<string, any>
  config?: Partial<typeof defaultABTestConfig>
  enableAnalytics?: boolean
  enablePerformanceMonitoring?: boolean
}

// CONTEXT7 SOURCE: /facebook/react - Context provider implementation patterns
export function TestimonialsABTestingProvider({
  children,
  userId,
  userAttributes = {},
  config = {},
  enableAnalytics = true,
  enablePerformanceMonitoring = true
}: ABTestProviderProps) {
  const [abTestEngine] = useState(() => new ABTestingEngine({ ...defaultABTestConfig, ...config }))
  const [activeExperiments, setActiveExperiments] = useState<ABTestExperiment[]>([])
  const [userVariantAssignments, setUserVariantAssignments] = useState<Map<string, string>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [performanceMetrics] = useState<Map<string, number[]>>(new Map())

  // CONTEXT7 SOURCE: /facebook/react - Effect hook patterns for initialization
  useEffect(() => {
    initializeExperiments()
  }, [userId])

  const initializeExperiments = useCallback(async () => {
    setIsLoading(true)
    
    try {
      // Load active experiments (in real implementation, this would fetch from API)
      const experiments = await loadActiveExperiments()
      setActiveExperiments(experiments)
      
      // Assign user to variants for each experiment
      const assignments = new Map<string, string>()
      
      for (const experiment of experiments) {
        if (experiment.status === 'running') {
          const variantId = abTestEngine.assignParticipantToVariant(
            experiment.id,
            userId,
            userAttributes
          )
          
          if (variantId) {
            assignments.set(experiment.component, variantId)
            
            // Track assignment if analytics enabled
            if (enableAnalytics) {
              trackAssignmentEvent(experiment.id, variantId)
            }
          }
        }
      }
      
      setUserVariantAssignments(assignments)
      
    } catch (error) {
      console.error('Failed to initialize A/B testing:', error)
    } finally {
      setIsLoading(false)
    }
  }, [userId, userAttributes, abTestEngine, enableAnalytics])

  // Mock function - in real implementation, would fetch from API
  const loadActiveExperiments = async (): Promise<ABTestExperiment[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return [
      {
        id: 'testimonials-hero-layout-test',
        name: 'Testimonials Hero Layout Optimization',
        description: 'Testing different layouts for testimonials hero section',
        status: 'running',
        type: 'conversion_optimization',
        component: 'testimonials-hero',
        variants: [
          {
            id: 'control-centered',
            name: 'Centered Layout (Control)',
            description: 'Current centered hero layout',
            isControl: true,
            trafficWeight: 50,
            enabled: true,
            configuration: {
              testimonialsHero: {
                layout: 'centered',
                headline: 'What Our Elite Families Say',
                ctaText: 'Book Your Consultation',
                ctaVariant: 'primary'
              }
            }
          },
          {
            id: 'treatment-left-aligned',
            name: 'Left-Aligned Layout (Treatment)',
            description: 'Left-aligned hero layout with enhanced CTA',
            isControl: false,
            trafficWeight: 50,
            enabled: true,
            configuration: {
              testimonialsHero: {
                layout: 'left-aligned',
                headline: 'Elite Families Trust Our Expertise',
                ctaText: 'Start Your Journey',
                ctaVariant: 'secondary'
              }
            }
          }
        ],
        trafficAllocation: 80, // 80% of users included
        primaryMetric: 'conversion_rate',
        secondaryMetrics: ['click_through_rate', 'time_on_page'],
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Started 7 days ago
        minimumDetectableEffect: 0.05,
        statisticalPowerTarget: 0.8,
        significanceLevel: 0.05,
        metadata: {
          createdBy: 'Product Team',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          lastModifiedBy: 'Product Team',
          lastModifiedAt: new Date(),
          tags: ['testimonials', 'conversion', 'hero'],
          businessObjective: 'Increase consultation bookings from testimonials page',
          hypothesis: 'Left-aligned layout with action-oriented headline will increase conversion rates',
          successCriteria: [
            'Achieve minimum 5% improvement in conversion rate',
            'Maintain or improve time on page',
            'Statistical significance with 95% confidence'
          ],
          riskAssessment: 'Low risk - layout change only',
          stakeholders: ['Product Team', 'Marketing Team', 'Executive Team']
        }
      },
      {
        id: 'testimonials-grid-display-test',
        name: 'Testimonials Grid Card Design Test',
        description: 'Testing different card designs for testimonials grid',
        status: 'running',
        type: 'engagement_optimization',
        component: 'testimonials-grid',
        variants: [
          {
            id: 'control-minimal',
            name: 'Minimal Cards (Control)',
            description: 'Current minimal card design',
            isControl: true,
            trafficWeight: 33,
            enabled: true,
            configuration: {
              testimonialsGrid: {
                cardDesign: 'minimal',
                showRatings: true,
                showVerificationBadges: false,
                columns: 3
              }
            }
          },
          {
            id: 'treatment-detailed',
            name: 'Detailed Cards (Treatment A)',
            description: 'Enhanced cards with more information',
            isControl: false,
            trafficWeight: 33,
            enabled: true,
            configuration: {
              testimonialsGrid: {
                cardDesign: 'detailed',
                showRatings: true,
                showVerificationBadges: true,
                columns: 2
              }
            }
          },
          {
            id: 'treatment-premium',
            name: 'Premium Cards (Treatment B)',
            description: 'Premium design with enhanced visuals',
            isControl: false,
            trafficWeight: 34,
            enabled: true,
            configuration: {
              testimonialsGrid: {
                cardDesign: 'premium',
                showRatings: true,
                showVerificationBadges: true,
                columns: 2,
                animation: 'fade'
              }
            }
          }
        ],
        trafficAllocation: 60, // 60% of users included
        primaryMetric: 'engagement_rate',
        secondaryMetrics: ['testimonial_interaction_rate', 'scroll_depth'],
        startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Started 3 days ago
        minimumDetectableEffect: 0.03,
        statisticalPowerTarget: 0.8,
        significanceLevel: 0.05,
        metadata: {
          createdBy: 'UX Team',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          lastModifiedBy: 'UX Team',
          lastModifiedAt: new Date(),
          tags: ['testimonials', 'engagement', 'cards'],
          businessObjective: 'Increase user engagement with testimonials content',
          hypothesis: 'More detailed cards will increase user engagement and time spent reading testimonials',
          successCriteria: [
            'Achieve minimum 3% improvement in engagement rate',
            'Increase testimonial interaction rate',
            'Maintain performance metrics'
          ],
          riskAssessment: 'Low risk - visual enhancement only',
          stakeholders: ['UX Team', 'Product Team']
        }
      }
    ]
  }

  // CONTEXT7 SOURCE: /posthog/posthog - Event tracking implementation patterns
  const trackAssignmentEvent = useCallback((experimentId: string, variantId: string) => {
    if (!enableAnalytics) return
    
    // Track assignment event to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_assignment', {
        experiment_id: experimentId,
        variant_id: variantId,
        user_id: userId
      })
    }
    
    // Also track to Vercel Analytics if available
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', 'AB Test Assignment', {
        experiment: experimentId,
        variant: variantId
      })
    }
  }, [enableAnalytics, userId])

  const trackConversion = useCallback((eventType: string, value?: number, metadata?: Record<string, any>) => {
    if (!enableAnalytics) return

    // Track conversion across all active experiments user is part of
    userVariantAssignments.forEach((variantId, component) => {
      const experiment = activeExperiments.find(exp => exp.component === component)
      if (experiment) {
        abTestEngine.trackConversionEvent(experiment.id, userId, eventType, value)
        
        // Track to external analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'ab_test_conversion', {
            experiment_id: experiment.id,
            variant_id: variantId,
            event_type: eventType,
            value: value,
            ...metadata
          })
        }
      }
    })
  }, [enableAnalytics, userVariantAssignments, activeExperiments, abTestEngine, userId])

  const trackInteraction = useCallback((
    component: TestimonialsComponent, 
    interactionType: string, 
    metadata?: Record<string, any>
  ) => {
    if (!enableAnalytics) return

    const variantId = userVariantAssignments.get(component)
    const experiment = activeExperiments.find(exp => exp.component === component)
    
    if (experiment && variantId) {
      // Track interaction event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ab_test_interaction', {
          experiment_id: experiment.id,
          variant_id: variantId,
          component,
          interaction_type: interactionType,
          ...metadata
        })
      }
    }
  }, [enableAnalytics, userVariantAssignments, activeExperiments])

  const reportPerformanceMetric = useCallback((
    component: TestimonialsComponent,
    metricName: string,
    value: number
  ) => {
    if (!enablePerformanceMonitoring) return

    const key = `${component}:${metricName}`
    const existing = performanceMetrics.get(key) || []
    existing.push(value)
    performanceMetrics.set(key, existing)

    // Report to performance monitoring if configured
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', 'AB Test Performance', {
        component,
        metric: metricName,
        value
      })
    }
  }, [enablePerformanceMonitoring, performanceMetrics])

  // CONTEXT7 SOURCE: /facebook/react - Memoized context value patterns
  const contextValue = useMemo<ABTestContextValue>(() => {
    const getVariantForComponent = (component: TestimonialsComponent): ExperimentVariant | null => {
      const variantId = userVariantAssignments.get(component)
      if (!variantId) return null

      const experiment = activeExperiments.find(exp => exp.component === component)
      if (!experiment) return null

      return experiment.variants.find(variant => variant.id === variantId) || null
    }

    const getVariantConfiguration = (component: TestimonialsComponent): VariantConfiguration => {
      const variant = getVariantForComponent(component)
      return variant?.configuration || {}
    }

    const isInExperiment = (component: TestimonialsComponent): boolean => {
      return userVariantAssignments.has(component)
    }

    const getExperimentAnalysis = (experimentId: string): ABTestAnalysis | null => {
      return abTestEngine.analyzeExperiment(experimentId)
    }

    const getExecutiveSummary = (experimentId: string): ExperimentExecutiveSummary | null => {
      return abTestEngine.generateExecutiveSummary(experimentId)
    }

    return {
      getVariantForComponent,
      getVariantConfiguration,
      isInExperiment,
      trackConversion,
      trackInteraction,
      getExperimentAnalysis,
      getExecutiveSummary,
      reportPerformanceMetric,
      activeExperiments,
      userVariantAssignments,
      isLoading
    }
  }, [
    userVariantAssignments,
    activeExperiments,
    trackConversion,
    trackInteraction,
    reportPerformanceMetric,
    abTestEngine,
    isLoading
  ])

  return (
    <ABTestContext.Provider value={contextValue}>
      {children}
    </ABTestContext.Provider>
  )
}

// CONTEXT7 SOURCE: /facebook/react - Custom hook patterns for context consumption
export function useABTesting() {
  const context = useContext(ABTestContext)
  if (!context) {
    throw new Error('useABTesting must be used within a TestimonialsABTestingProvider')
  }
  return context
}

// CONTEXT7 SOURCE: /facebook/react - Component-specific hook patterns
export function useTestimonialsVariant(component: TestimonialsComponent) {
  const { getVariantForComponent, getVariantConfiguration, isInExperiment, trackInteraction } = useABTesting()
  
  const variant = getVariantForComponent(component)
  const configuration = getVariantConfiguration(component)
  const inExperiment = isInExperiment(component)
  
  const trackComponentInteraction = useCallback((interactionType: string, metadata?: Record<string, any>) => {
    trackInteraction(component, interactionType, metadata)
  }, [component, trackInteraction])
  
  return {
    variant,
    configuration,
    inExperiment,
    trackInteraction: trackComponentInteraction
  }
}

// CONTEXT7 SOURCE: /facebook/react - Performance monitoring hook patterns
export function useABTestPerformanceMonitoring(component: TestimonialsComponent) {
  const { reportPerformanceMetric } = useABTesting()
  
  const measureRenderTime = useCallback((startTime: number) => {
    const renderTime = performance.now() - startTime
    reportPerformanceMetric(component, 'render_time', renderTime)
  }, [component, reportPerformanceMetric])
  
  const measureInteractionLatency = useCallback((startTime: number) => {
    const latency = performance.now() - startTime
    reportPerformanceMetric(component, 'interaction_latency', latency)
  }, [component, reportPerformanceMetric])
  
  const reportCustomMetric = useCallback((metricName: string, value: number) => {
    reportPerformanceMetric(component, metricName, value)
  }, [component, reportPerformanceMetric])
  
  return {
    measureRenderTime,
    measureInteractionLatency,
    reportCustomMetric
  }
}

// Higher-order component for automatic A/B testing integration
export function withABTesting<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  component: TestimonialsComponent
) {
  const WithABTestingComponent = (props: P) => {
    const { configuration, trackInteraction } = useTestimonialsVariant(component)
    const { measureRenderTime } = useABTestPerformanceMonitoring(component)
    
    useEffect(() => {
      const startTime = performance.now()
      return () => {
        measureRenderTime(startTime)
      }
    }, [])
    
    // Enhanced props with A/B testing configuration
    const enhancedProps = {
      ...props,
      abTestConfig: configuration,
      onABTestInteraction: trackInteraction
    } as P & { abTestConfig: VariantConfiguration; onABTestInteraction: (type: string, meta?: any) => void }
    
    return <WrappedComponent {...enhancedProps} />
  }
  
  WithABTestingComponent.displayName = `withABTesting(${WrappedComponent.displayName || WrappedComponent.name})`
  
  return WithABTestingComponent
}

// Type declarations for external analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    va?: {
      track: (event: string, properties?: Record<string, any>) => void
    }
  }
}