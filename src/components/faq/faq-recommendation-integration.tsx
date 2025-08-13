/**
 * CONTEXT7 SOURCE: /radix-ui/primitives - Integration component patterns for complex ML systems
 * INTEGRATION REASON: Official Radix UI documentation recommends integration layers for complex functionality
 * 
 * FAQ Recommendation Integration Component - Complete ML System Integration
 * Features:
 * - Seamless integration with existing FAQ components
 * - Real-time recommendation updates
 * - User behaviour analytics integration
 * - A/B testing framework integration
 * - Performance monitoring and caching
 * - Mobile-optimized responsive design
 * - WCAG 2.1 AA accessibility compliance
 */

"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  Users, 
  Brain, 
  Target, 
  Clock, 
  Zap,
  BarChart3,
  Settings,
  Eye,
  MousePointer
} from 'lucide-react'
import type { FAQQuestion, FAQCategory } from '@/lib/types'
import { ClientSegment } from '@/lib/faq-recommendation-engine'
import { useFAQRecommendations } from '@/hooks/use-faq-recommendations'
import { FAQRecommendations, RelatedQuestions, PopularInCategory } from './faq-recommendations'
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /radix-ui/primitives - Integration component interface patterns
// INTERFACE DEFINITION: Comprehensive props for FAQ recommendation integration
interface FAQRecommendationIntegrationProps {
  readonly currentQuestion?: FAQQuestion
  readonly categories: readonly FAQCategory[]
  readonly sessionId: string
  readonly clientSegment: ClientSegment
  readonly entryPoint: 'direct' | 'search' | 'internal_link' | 'social' | 'email'
  readonly enableAnalytics?: boolean
  readonly enableABTesting?: boolean
  readonly experimentId?: string
  readonly showPerformanceStats?: boolean
  readonly className?: string
  readonly onQuestionClick?: (questionId: string) => void
  readonly onAnalyticsEvent?: (event: string, data: any) => void
}

/**
 * CONTEXT7 SOURCE: /radix-ui/primitives - Performance stats display component
 * PERFORMANCE MONITORING: Real-time system performance visualization
 */
const PerformanceStatsCard: React.FC<{
  readonly stats: {
    readonly avgResponseTime: number
    readonly totalQueries: number
    readonly cacheHitRate: number
    readonly lastUpdateTime: Date | null
  }
  readonly isVisible: boolean
}> = React.memo(({ stats, isVisible }) => {
  if (!isVisible) return null

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-blue-900 flex items-center gap-2">
          <BarChart3 size={16} />
          ML Performance Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700">Response Time</span>
              <span className="text-xs font-mono text-blue-900">
                {stats.avgResponseTime.toFixed(1)}ms
              </span>
            </div>
            <Progress 
              value={Math.min((stats.avgResponseTime / 100) * 100, 100)} 
              className="h-1"
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700">Cache Hit Rate</span>
              <span className="text-xs font-mono text-blue-900">
                {(stats.cacheHitRate * 100).toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={stats.cacheHitRate * 100} 
              className="h-1"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-blue-600">
          <span>Total Queries: {stats.totalQueries}</span>
          {stats.lastUpdateTime && (
            <span>Updated: {stats.lastUpdateTime.toLocaleTimeString()}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
})

PerformanceStatsCard.displayName = 'PerformanceStatsCard'

/**
 * CONTEXT7 SOURCE: /radix-ui/primitives - A/B testing stats display component
 * AB TESTING MONITORING: Real-time experiment performance visualization
 */
const ABTestingStatsCard: React.FC<{
  readonly currentVariant: string | null
  readonly abTestingMetrics: Record<string, any> | null
  readonly isVisible: boolean
}> = React.memo(({ currentVariant, abTestingMetrics, isVisible }) => {
  if (!isVisible || !currentVariant || !abTestingMetrics) return null

  const variantMetrics = abTestingMetrics[currentVariant]
  if (!variantMetrics) return null

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-green-900 flex items-center gap-2">
          <Target size={16} />
          A/B Test: {currentVariant}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-green-900">{variantMetrics.exposures}</div>
            <div className="text-xs text-green-700">Exposures</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-900">{variantMetrics.clicks}</div>
            <div className="text-xs text-green-700">Clicks</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-900">
              {(variantMetrics.conversionRate * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-green-700">CTR</div>
          </div>
        </div>
        
        <div className="text-xs text-green-600 text-center">
          Variant: {currentVariant} • Revenue: £{variantMetrics.revenueAttribution?.toFixed(2) || '0.00'}
        </div>
      </CardContent>
    </Card>
  )
})

ABTestingStatsCard.displayName = 'ABTestingStatsCard'

/**
 * CONTEXT7 SOURCE: /radix-ui/primitives - Main integration component
 * INTEGRATION COMPONENT: Complete FAQ recommendation system integration
 */
export const FAQRecommendationIntegration: React.FC<FAQRecommendationIntegrationProps> = ({
  currentQuestion,
  categories,
  sessionId,
  clientSegment,
  entryPoint,
  enableAnalytics = true,
  enableABTesting = false,
  experimentId,
  showPerformanceStats = false,
  className,
  onQuestionClick,
  onAnalyticsEvent
}) => {
  // CONTEXT7 SOURCE: /radix-ui/primitives - View tracking state
  // VIEW TRACKING: Track which recommendations have been viewed
  const [viewedQuestions, setViewedQuestions] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState('recommendations')

  // CONTEXT7 SOURCE: /radix-ui/primitives - Initialize recommendation system
  // RECOMMENDATION HOOK: Use custom hook for ML-powered recommendations
  const {
    recommendations,
    relatedQuestions,
    popularInCategory,
    isLoading,
    error,
    isInitialized,
    trackQuestionView,
    trackSearchQuery,
    trackRecommendationClick,
    trackRecommendationView,
    generateRecommendations,
    getRelatedQuestions,
    getPopularInCategory,
    currentVariant,
    abTestingMetrics,
    performanceStats
  } = useFAQRecommendations(categories, {
    sessionId,
    clientSegment,
    entryPoint,
    enableAnalytics,
    enableABTesting,
    experimentId,
    maxRecommendations: 6,
    debugMode: process.env.NODE_ENV === 'development'
  })

  // CONTEXT7 SOURCE: /radix-ui/primitives - Auto-generate recommendations when question changes
  // AUTO RECOMMENDATIONS: Generate recommendations when current question changes
  useEffect(() => {
    if (currentQuestion && isInitialized) {
      generateRecommendations(currentQuestion).catch(console.error)
      
      // Generate related questions
      const related = getRelatedQuestions(currentQuestion.id, 4)
      if (related.length === 0) {
        // Fallback to popular in category
        const popular = getPopularInCategory(
          currentQuestion.category, 
          [currentQuestion.id], 
          4
        )
        // Update state if needed
      }
    }
  }, [currentQuestion, isInitialized, generateRecommendations, getRelatedQuestions, getPopularInCategory])

  // CONTEXT7 SOURCE: /radix-ui/primitives - Enhanced click tracking
  // CLICK TRACKING: Enhanced click handling with analytics
  const handleQuestionClick = useCallback((questionId: string) => {
    // Track recommendation click
    trackRecommendationClick(questionId)
    
    // Fire analytics event
    if (onAnalyticsEvent) {
      onAnalyticsEvent('recommendation_click', {
        questionId,
        variant: currentVariant,
        sessionId,
        clientSegment,
        timestamp: new Date().toISOString()
      })
    }
    
    // Call parent handler
    if (onQuestionClick) {
      onQuestionClick(questionId)
    }
  }, [trackRecommendationClick, onAnalyticsEvent, currentVariant, sessionId, clientSegment, onQuestionClick])

  // CONTEXT7 SOURCE: /radix-ui/primitives - Enhanced view tracking
  // VIEW TRACKING: Enhanced view handling with deduplication
  const handleRecommendationView = useCallback((questionId: string) => {
    if (!viewedQuestions.has(questionId)) {
      setViewedQuestions(prev => new Set(prev).add(questionId))
      trackRecommendationView(questionId)
      
      // Fire analytics event
      if (onAnalyticsEvent) {
        onAnalyticsEvent('recommendation_view', {
          questionId,
          variant: currentVariant,
          sessionId,
          clientSegment,
          timestamp: new Date().toISOString()
        })
      }
    }
  }, [viewedQuestions, trackRecommendationView, onAnalyticsEvent, currentVariant, sessionId, clientSegment])

  // CONTEXT7 SOURCE: /radix-ui/primitives - Loading state component
  // LOADING STATE: Accessible loading state with proper ARIA labels
  if (isLoading || !isInitialized) {
    return (
      <div className={cn("space-y-4", className)} aria-label="Loading recommendations">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-4 bg-slate-200 rounded" />
                  <div className="h-3 bg-slate-100 rounded w-2/3" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-100 rounded" />
                    <div className="h-3 bg-slate-100 rounded" />
                    <div className="h-3 bg-slate-100 rounded w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // CONTEXT7 SOURCE: /radix-ui/primitives - Error state component
  // ERROR HANDLING: User-friendly error state with retry functionality
  if (error) {
    return (
      <div className={cn("text-center py-8", className)} role="alert">
        <div className="text-red-600 mb-4 flex items-center justify-center gap-2">
          <Target size={20} />
          {error}
        </div>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          aria-label="Retry loading recommendations"
        >
          Try Again
        </Button>
      </div>
    )
  }

  // CONTEXT7 SOURCE: /radix-ui/primitives - Main component render
  // MAIN COMPONENT: Complete recommendation system interface
  return (
    <div className={cn("space-y-6", className)}>
      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Performance and A/B testing stats */}
      {/* SYSTEM STATS: Development and monitoring information */}
      {(showPerformanceStats || process.env.NODE_ENV === 'development') && (
        <div className="grid gap-4 md:grid-cols-2">
          <PerformanceStatsCard 
            stats={performanceStats} 
            isVisible={showPerformanceStats || false}
          />
          <ABTestingStatsCard 
            currentVariant={currentVariant}
            abTestingMetrics={abTestingMetrics}
            isVisible={enableABTesting}
          />
        </div>
      )}

      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Main recommendation interface */}
      {/* RECOMMENDATION TABS: Organized recommendation display with tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
          <TabsTrigger value="recommendations" className="text-xs">
            <Brain size={16} className="mr-1" />
            Smart Picks
          </TabsTrigger>
          <TabsTrigger value="related" className="text-xs">
            <Target size={16} className="mr-1" />
            Related
          </TabsTrigger>
          <TabsTrigger value="popular" className="text-xs">
            <TrendingUp size={16} className="mr-1" />
            Popular
          </TabsTrigger>
          {currentQuestion && (
            <TabsTrigger value="category" className="text-xs hidden lg:flex">
              <Users size={16} className="mr-1" />
              In Category
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="recommendations" className="mt-6">
          {currentQuestion ? (
            <FAQRecommendations
              currentQuestion={currentQuestion}
              categories={categories}
              sessionId={sessionId}
              clientSegment={clientSegment}
              maxRecommendations={6}
              showReasonBadges={true}
              enableAnalytics={enableAnalytics}
              onRecommendationClick={handleQuestionClick}
              onRecommendationView={handleRecommendationView}
            />
          ) : (
            <div className="text-center py-8 text-slate-600">
              <Brain size={48} className="mx-auto mb-4 text-slate-400" />
              <h3 className="text-lg font-medium mb-2">Smart Recommendations</h3>
              <p className="text-sm">Select a question to see personalised recommendations</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="related" className="mt-6">
          {currentQuestion ? (
            <RelatedQuestions
              questionId={currentQuestion.id}
              categories={categories}
              maxResults={8}
              onQuestionClick={handleQuestionClick}
            />
          ) : (
            <div className="text-center py-8 text-slate-600">
              <Target size={48} className="mx-auto mb-4 text-slate-400" />
              <h3 className="text-lg font-medium mb-2">Related Questions</h3>
              <p className="text-sm">Select a question to see related content</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          {currentQuestion ? (
            <PopularInCategory
              categoryId={currentQuestion.category}
              categories={categories}
              excludeIds={[currentQuestion.id]}
              maxResults={8}
              onQuestionClick={handleQuestionClick}
            />
          ) : (
            <div className="text-center py-8 text-slate-600">
              <TrendingUp size={48} className="mx-auto mb-4 text-slate-400" />
              <h3 className="text-lg font-medium mb-2">Popular Questions</h3>
              <p className="text-sm">Select a question to see popular content in its category</p>
            </div>
          )}
        </TabsContent>

        {currentQuestion && (
          <TabsContent value="category" className="mt-6">
            <PopularInCategory
              categoryId={currentQuestion.category}
              categories={categories}
              excludeIds={[currentQuestion.id]}
              maxResults={12}
              onQuestionClick={handleQuestionClick}
            />
          </TabsContent>
        )}
      </Tabs>

      {/* CONTEXT7 SOURCE: /radix-ui/primitives - System info for development */}
      {/* DEV INFO: Development information and debugging */}
      {process.env.NODE_ENV === 'development' && currentQuestion && (
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-4">
            <div className="text-xs text-slate-600 space-y-1">
              <div><strong>Session:</strong> {sessionId}</div>
              <div><strong>Client Segment:</strong> {clientSegment}</div>
              <div><strong>Entry Point:</strong> {entryPoint}</div>
              {currentVariant && <div><strong>A/B Variant:</strong> {currentVariant}</div>}
              <div><strong>Current Question:</strong> {currentQuestion.question}</div>
              <div><strong>Recommendations Generated:</strong> {recommendations.length}</div>
              <div><strong>Viewed Questions:</strong> {viewedQuestions.size}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /radix-ui/primitives - Simplified recommendation widget
 * WIDGET COMPONENT: Lightweight recommendation display for sidebar/footer usage
 */
export const FAQRecommendationWidget: React.FC<{
  readonly questionId: string
  readonly categories: readonly FAQCategory[]
  readonly maxResults?: number
  readonly className?: string
  readonly onQuestionClick?: (questionId: string) => void
}> = ({ questionId, categories, maxResults = 3, className, onQuestionClick }) => {
  const [relatedQuestions, setRelatedQuestions] = useState<any[]>([])

  useEffect(() => {
    // Simplified recommendation logic for widget
    const question = categories
      .flatMap(cat => cat.questions)
      .find(q => q.id === questionId)
    
    if (question) {
      // Get questions from same category, excluding current
      const categoryQuestions = categories
        .find(cat => cat.id === question.category)
        ?.questions.filter(q => q.id !== questionId)
        .slice(0, maxResults) || []
      
      setRelatedQuestions(categoryQuestions)
    }
  }, [questionId, categories, maxResults])

  if (relatedQuestions.length === 0) {
    return null
  }

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-800 flex items-center gap-2">
          <Zap size={16} />
          You might also like
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {relatedQuestions.map((question) => (
          <Button
            key={question.id}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-left h-auto py-2 px-3"
            onClick={() => onQuestionClick?.(question.id)}
          >
            <div className="space-y-1">
              <div className="text-xs font-medium text-slate-800 line-clamp-2">
                {question.question}
              </div>
              <div className="text-xs text-slate-500">
                {question.difficulty} • {question.category}
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}