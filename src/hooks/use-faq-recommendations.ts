/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Custom hooks patterns for complex state management
 * HOOK REASON: Official React documentation recommends custom hooks for complex ML integration
 * 
 * FAQ Recommendations Hook - React Integration for ML-Powered Recommendations
 * Features:
 * - TF-IDF recommendation engine integration
 * - User behaviour tracking and analytics
 * - Client segmentation for personalisation  
 * - A/B testing framework integration
 * - Performance monitoring and caching
 */

"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { FAQQuestion, FAQCategory } from '@/lib/types'
import { 
  FAQRecommendationEngine, 
  RecommendationResult, 
  ClientSegment, 
  RecommendationConfig 
} from '@/lib/faq-recommendation-engine'
import { 
  FAQABTestingManager,
  ExperimentConfig,
  RecommendationVariant 
} from '@/lib/faq-ab-testing'

// CONTEXT7 SOURCE: /reactjs/react.dev - Hook interface patterns for comprehensive state management
// HOOK INTERFACE: Complete interface for recommendation hook configuration
export interface UseFAQRecommendationsConfig {
  readonly sessionId: string
  readonly clientSegment: ClientSegment
  readonly entryPoint: 'direct' | 'search' | 'internal_link' | 'social' | 'email'
  readonly enableAnalytics?: boolean
  readonly enableABTesting?: boolean
  readonly experimentId?: string
  readonly maxRecommendations?: number
  readonly debugMode?: boolean
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Hook return type patterns for ML integration
// RETURN TYPE: Comprehensive return interface for recommendation functionality
export interface UseFAQRecommendationsReturn {
  // Core recommendation functionality
  readonly recommendations: RecommendationResult[]
  readonly relatedQuestions: RecommendationResult[]
  readonly popularInCategory: RecommendationResult[]
  
  // State management
  readonly isLoading: boolean
  readonly error: string | null
  readonly isInitialized: boolean
  
  // User interaction tracking
  readonly trackQuestionView: (questionId: string, timeSpent: number) => void
  readonly trackSearchQuery: (query: string) => void
  readonly trackRecommendationClick: (questionId: string) => void
  readonly trackRecommendationView: (questionId: string) => void
  
  // Recommendation generation
  readonly generateRecommendations: (question: FAQQuestion) => Promise<RecommendationResult[]>
  readonly getRelatedQuestions: (questionId: string, maxResults?: number) => RecommendationResult[]
  readonly getPopularInCategory: (categoryId: string, excludeIds?: string[], maxResults?: number) => RecommendationResult[]
  
  // A/B testing
  readonly currentVariant: string | null
  readonly abTestingMetrics: Record<string, any> | null
  
  // Performance metrics
  readonly performanceStats: {
    readonly avgResponseTime: number
    readonly totalQueries: number
    readonly cacheHitRate: number
    readonly lastUpdateTime: Date | null
  }
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Performance monitoring for ML operations
 * PERFORMANCE TRACKING: Monitor recommendation generation performance
 */
interface PerformanceTracker {
  totalQueries: number
  totalResponseTime: number
  cacheHits: number
  cacheMisses: number
  lastUpdateTime: Date | null
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Main recommendation hook implementation
 * RECOMMENDATION HOOK: Complete React hook for FAQ recommendation system
 */
export function useFAQRecommendations(
  categories: FAQCategory[],
  config: UseFAQRecommendationsConfig
): UseFAQRecommendationsReturn {
  // CONTEXT7 SOURCE: /reactjs/react.dev - State management patterns for complex ML systems
  // STATE MANAGEMENT: Comprehensive state for recommendation system
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([])
  const [relatedQuestions, setRelatedQuestions] = useState<RecommendationResult[]>([])
  const [popularInCategory, setPopularInCategory] = useState<RecommendationResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [currentVariant, setCurrentVariant] = useState<string | null>(null)
  const [abTestingMetrics, setABTestingMetrics] = useState<Record<string, any> | null>(null)

  // CONTEXT7 SOURCE: /reactjs/react.dev - Ref patterns for singleton instances
  // INSTANCE MANAGEMENT: Singleton instances for recommendation engines
  const engineRef = useRef<FAQRecommendationEngine | null>(null)
  const abTestingRef = useRef<FAQABTestingManager | null>(null)
  const performanceRef = useRef<PerformanceTracker>({
    totalQueries: 0,
    totalResponseTime: 0,
    cacheHits: 0,
    cacheMisses: 0,
    lastUpdateTime: null
  })

  // CONTEXT7 SOURCE: /reactjs/react.dev - Cache management for performance optimization
  // RECOMMENDATION CACHE: LRU-style cache for recommendation results
  const cacheRef = useRef<Map<string, { data: RecommendationResult[], timestamp: number }>>(new Map())
  const CACHE_TTL = 5 * 60 * 1000 // 5 minutes cache TTL

  // CONTEXT7 SOURCE: /reactjs/react.dev - Memoized configuration for optimization
  // CONFIG MEMOIZATION: Optimize recommendation engine configuration
  const engineConfig = useMemo((): RecommendationConfig => ({
    maxRecommendations: config.maxRecommendations || 5,
    similarityThreshold: 0.1,
    behaviourWeight: 0.4,
    contentWeight: 0.6,
    segmentWeight: 0.3,
    enablePersonalization: config.enableAnalytics !== false,
    enableABTesting: config.enableABTesting || false,
    debugMode: config.debugMode || process.env.NODE_ENV === 'development'
  }), [config])

  // CONTEXT7 SOURCE: /reactjs/react.dev - A/B testing initialization effect
  // AB TESTING SETUP: Initialize A/B testing if enabled
  useEffect(() => {
    if (config.enableABTesting && config.experimentId && !abTestingRef.current) {
      abTestingRef.current = new FAQABTestingManager()
      
      // Default A/B test configuration for recommendations
      const experimentConfig: ExperimentConfig = {
        id: config.experimentId,
        name: 'FAQ Recommendation Algorithm Test',
        description: 'Compare different recommendation strategies',
        startDate: new Date(),
        minSampleSize: 100,
        significanceLevel: 0.05,
        powerLevel: 0.8,
        primaryMetric: 'conversionRate',
        isActive: true,
        variants: [
          {
            id: 'control',
            name: 'Content-Heavy Recommendations',
            description: 'Emphasize content similarity',
            config: { ...engineConfig, contentWeight: 0.8, behaviourWeight: 0.2 },
            weight: 0.5,
            isActive: true
          },
          {
            id: 'behaviour',
            name: 'Behaviour-Heavy Recommendations', 
            description: 'Emphasize user behaviour',
            config: { ...engineConfig, contentWeight: 0.3, behaviourWeight: 0.7 },
            weight: 0.5,
            isActive: true
          }
        ] as RecommendationVariant[]
      }

      try {
        abTestingRef.current.createExperiment(experimentConfig)
        
        // Assign user to variant
        const variant = abTestingRef.current.assignUserToVariant(
          config.sessionId,
          config.sessionId,
          config.experimentId
        )
        setCurrentVariant(variant)
        
        if (config.debugMode) {
          console.log(`User assigned to A/B test variant: ${variant}`)
        }
      } catch (error) {
        console.error('Failed to initialize A/B testing:', error)
      }
    }
  }, [config.enableABTesting, config.experimentId, config.sessionId, engineConfig, config.debugMode])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Engine initialization effect
  // ENGINE INITIALIZATION: Setup recommendation engine with categories
  useEffect(() => {
    const initializeEngine = async () => {
      try {
        setIsLoading(true)
        setError(null)

        if (!engineRef.current) {
          engineRef.current = new FAQRecommendationEngine()
        }

        // Initialize with categories and configuration
        engineRef.current.initialize(categories, engineConfig)
        
        // Initialize user session
        engineRef.current.initializeUserSession(
          config.sessionId,
          config.clientSegment,
          config.entryPoint
        )

        setIsInitialized(true)
        
        if (config.debugMode) {
          console.log('FAQ Recommendation Engine initialized successfully')
        }

      } catch (err) {
        console.error('Failed to initialize recommendation engine:', err)
        setError('Unable to initialize recommendation system. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    if (categories.length > 0) {
      initializeEngine()
    }
  }, [categories, engineConfig, config])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Performance monitoring utility
  // PERFORMANCE TRACKING: Track recommendation generation performance
  const trackPerformance = useCallback((startTime: number, cacheHit: boolean = false) => {
    const endTime = Date.now()
    const responseTime = endTime - startTime
    
    performanceRef.current.totalQueries++
    performanceRef.current.totalResponseTime += responseTime
    performanceRef.current.lastUpdateTime = new Date()
    
    if (cacheHit) {
      performanceRef.current.cacheHits++
    } else {
      performanceRef.current.cacheMisses++
    }
  }, [])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Cache management utility
  // CACHE UTILITIES: Manage recommendation result caching
  const getCachedRecommendations = useCallback((key: string): RecommendationResult[] | null => {
    const cached = cacheRef.current.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data
    }
    cacheRef.current.delete(key) // Remove expired cache
    return null
  }, [])

  const setCachedRecommendations = useCallback((key: string, data: RecommendationResult[]) => {
    cacheRef.current.set(key, { data, timestamp: Date.now() })
    
    // Simple LRU: remove oldest entries if cache gets too large
    if (cacheRef.current.size > 100) {
      const firstKey = cacheRef.current.keys().next().value
      cacheRef.current.delete(firstKey)
    }
  }, [])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Core recommendation generation function
  // RECOMMENDATION GENERATION: Main function to generate recommendations with caching
  const generateRecommendations = useCallback(async (question: FAQQuestion): Promise<RecommendationResult[]> => {
    if (!isInitialized || !engineRef.current) {
      return []
    }

    const startTime = Date.now()
    const cacheKey = `recommendations:${question.id}:${config.sessionId}`
    
    // Check cache first
    const cachedResults = getCachedRecommendations(cacheKey)
    if (cachedResults) {
      trackPerformance(startTime, true)
      setRecommendations(cachedResults)
      return cachedResults
    }

    try {
      let results: RecommendationResult[]

      // Use A/B testing if enabled
      if (config.enableABTesting && config.experimentId && abTestingRef.current) {
        results = abTestingRef.current.generateRecommendationsForUser(
          config.sessionId,
          config.sessionId,
          config.experimentId,
          question,
          categories
        ) || []
      } else {
        // Standard recommendation generation
        results = engineRef.current.generateRecommendations(
          question,
          config.sessionId,
          engineConfig
        )
      }

      // Cache results
      setCachedRecommendations(cacheKey, results)
      setRecommendations(results)
      trackPerformance(startTime, false)

      return results
    } catch (error) {
      console.error('Failed to generate recommendations:', error)
      trackPerformance(startTime, false)
      return []
    }
  }, [isInitialized, config, categories, engineConfig, getCachedRecommendations, setCachedRecommendations, trackPerformance])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Related questions generation
  // RELATED QUESTIONS: Get content-similar questions
  const getRelatedQuestions = useCallback((questionId: string, maxResults: number = 4): RecommendationResult[] => {
    if (!isInitialized || !engineRef.current) {
      return []
    }

    const cacheKey = `related:${questionId}:${maxResults}`
    const cachedResults = getCachedRecommendations(cacheKey)
    
    if (cachedResults) {
      return cachedResults
    }

    const results = engineRef.current.getRelatedQuestions(questionId, maxResults)
    setCachedRecommendations(cacheKey, results)
    
    return results
  }, [isInitialized, getCachedRecommendations, setCachedRecommendations])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Popular category questions
  // CATEGORY POPULARITY: Get most popular questions in category
  const getPopularInCategory = useCallback((
    categoryId: string, 
    excludeIds: string[] = [], 
    maxResults: number = 5
  ): RecommendationResult[] => {
    if (!isInitialized || !engineRef.current) {
      return []
    }

    const cacheKey = `popular:${categoryId}:${excludeIds.join(',')}:${maxResults}`
    const cachedResults = getCachedRecommendations(cacheKey)
    
    if (cachedResults) {
      return cachedResults
    }

    const results = engineRef.current.getPopularInCategory(categoryId, excludeIds, maxResults)
    setCachedRecommendations(cacheKey, results)
    
    return results
  }, [isInitialized, getCachedRecommendations, setCachedRecommendations])

  // CONTEXT7 SOURCE: /reactjs/react.dev - User behaviour tracking functions
  // BEHAVIOUR TRACKING: Track user interactions for personalization
  const trackQuestionView = useCallback((questionId: string, timeSpent: number) => {
    if (config.enableAnalytics && engineRef.current) {
      engineRef.current.trackQuestionView(config.sessionId, questionId, timeSpent)
    }
  }, [config.enableAnalytics, config.sessionId])

  const trackSearchQuery = useCallback((query: string) => {
    if (config.enableAnalytics && engineRef.current) {
      engineRef.current.trackSearchQuery(config.sessionId, query)
    }
  }, [config.enableAnalytics, config.sessionId])

  const trackRecommendationClick = useCallback((questionId: string) => {
    if (config.enableAnalytics && engineRef.current) {
      engineRef.current.trackRecommendationClick(config.sessionId, questionId)
    }
    
    // Track A/B test metrics if enabled
    if (config.enableABTesting && config.experimentId && currentVariant && abTestingRef.current) {
      abTestingRef.current.recordRecommendationClick(config.experimentId, currentVariant)
    }
  }, [config.enableAnalytics, config.enableABTesting, config.experimentId, config.sessionId, currentVariant])

  const trackRecommendationView = useCallback((questionId: string) => {
    if (config.enableAnalytics && engineRef.current) {
      engineRef.current.trackQuestionView(config.sessionId, questionId, 0)
    }
    
    // Track A/B test metrics if enabled
    if (config.enableABTesting && config.experimentId && currentVariant && abTestingRef.current) {
      abTestingRef.current.recordRecommendationView(config.experimentId, currentVariant, 1)
    }
  }, [config.enableAnalytics, config.enableABTesting, config.experimentId, config.sessionId, currentVariant])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Performance metrics computation
  // PERFORMANCE STATS: Compute performance statistics
  const performanceStats = useMemo(() => {
    const { totalQueries, totalResponseTime, cacheHits, cacheMisses, lastUpdateTime } = performanceRef.current
    
    return {
      avgResponseTime: totalQueries > 0 ? totalResponseTime / totalQueries : 0,
      totalQueries,
      cacheHitRate: (cacheHits + cacheMisses) > 0 ? cacheHits / (cacheHits + cacheMisses) : 0,
      lastUpdateTime
    }
  }, [recommendations, relatedQuestions, popularInCategory]) // Trigger recalculation on data updates

  // CONTEXT7 SOURCE: /reactjs/react.dev - A/B testing metrics retrieval
  // AB TESTING METRICS: Get current experiment metrics
  useEffect(() => {
    if (config.enableABTesting && config.experimentId && abTestingRef.current) {
      const metrics = abTestingRef.current.getExperimentMetrics(config.experimentId)
      setABTestingMetrics(Object.fromEntries(metrics))
    }
  }, [config.enableABTesting, config.experimentId, currentVariant])

  return {
    // Core recommendation data
    recommendations,
    relatedQuestions,
    popularInCategory,
    
    // State
    isLoading,
    error,
    isInitialized,
    
    // User interaction tracking
    trackQuestionView,
    trackSearchQuery,
    trackRecommendationClick,
    trackRecommendationView,
    
    // Recommendation generation
    generateRecommendations,
    getRelatedQuestions,
    getPopularInCategory,
    
    // A/B testing
    currentVariant,
    abTestingMetrics,
    
    // Performance monitoring
    performanceStats
  }
}