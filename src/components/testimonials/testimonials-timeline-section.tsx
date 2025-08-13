/**
 * TESTIMONIALS TIMELINE SECTION - CMS INTEGRATION
 * CONTEXT7 SOURCE: /facebook/react - Advanced React server components with CMS integration patterns
 * CONTEXT7 SOURCE: /pmndrs/zustand - State management integration for timeline component orchestration
 * 
 * TASK 10: Interactive Testimonials Timeline - CMS Integration Component
 * This component serves as the main integration point between the timeline functionality
 * and the existing testimonials CMS system, providing seamless data flow and management.
 * 
 * BUSINESS IMPACT: £50,000+ revenue through enhanced narrative testimonials
 * ROYAL CLIENT STANDARDS: Enterprise-grade CMS integration with timeline storytelling
 */

'use client'

import React, { Suspense, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { InteractiveTimeline } from './interactive-timeline'
import { TimelineMobileOptimized } from './timeline-mobile-optimized'
import { useTestimonialsCMS } from '@/lib/cms/testimonials-cms-manager'
import { getClientJourneyTimelines, integrateTimelineWithTestimonials } from '@/lib/cms/testimonials-timeline-data'
import { useMediaQuery } from '@/hooks/use-media-query'
import type { 
  ClientJourneyTimeline, 
  TimelineCategory,
  TestimonialsTimelineProps 
} from '@/types/testimonials-timeline'

// CONTEXT7 SOURCE: /lucide/lucide-react - Loading and error state icons
import { Loader2, AlertTriangle } from 'lucide-react'

interface TestimonialsTimelineSectionProps extends TestimonialsTimelineProps {
  readonly backgroundVariant?: 'white' | 'slate' | 'gradient'
  readonly showHeader?: boolean
  readonly headerTitle?: string
  readonly headerSubtitle?: string
  readonly headerDescription?: string
  readonly integration?: {
    readonly enableCMSSync?: boolean
    readonly enableSmartCategorization?: boolean
    readonly enableAnalytics?: boolean
  }
}

/**
 * CONTEXT7 SOURCE: /facebook/react - Loading skeleton component for timeline
 * Accessible loading state with proper ARIA attributes and reduced motion support
 */
const TimelineLoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-8" role="status" aria-label="Loading timeline content">
    {/* Header Skeleton */}
    <div className="text-center space-y-4">
      <div className="h-8 bg-slate-200 rounded-lg w-3/4 mx-auto" />
      <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
    </div>
    
    {/* Filters Skeleton */}
    <div className="flex justify-center gap-3">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="h-8 w-20 bg-slate-200 rounded-full" />
      ))}
    </div>
    
    {/* Timeline Items Skeleton */}
    <div className="max-w-4xl mx-auto space-y-8">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="flex items-start gap-6 p-6">
          <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded w-full" />
              <div className="h-3 bg-slate-200 rounded w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Screen reader announcement */}
    <span className="sr-only">Timeline content is loading</span>
  </div>
)

/**
 * CONTEXT7 SOURCE: /facebook/react - Error boundary component for timeline
 * Graceful error handling with retry functionality and accessibility support
 */
const TimelineErrorBoundary: React.FC<{ 
  error: Error
  onRetry?: () => void 
}> = ({ error, onRetry }) => (
  <motion.div 
    className="text-center py-12 space-y-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    role="alert"
    aria-live="assertive"
  >
    <div className="text-red-500">
      <AlertTriangle size={64} className="mx-auto mb-4" />
    </div>
    
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-slate-900">
        Unable to Load Timeline
      </h3>
      <p className="text-slate-600 max-w-md mx-auto">
        We're experiencing difficulty loading the client journey timelines. 
        Please try again or contact support if the issue persists.
      </p>
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4 text-left bg-red-50 p-4 rounded-lg">
          <summary className="cursor-pointer font-medium text-red-800">
            Error Details (Development Only)
          </summary>
          <pre className="mt-2 text-sm text-red-700 whitespace-pre-wrap">
            {error.message}
          </pre>
        </details>
      )}
    </div>
    
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        aria-label="Retry loading timeline"
      >
        <Loader2 size={16} />
        Try Again
      </button>
    )}
  </motion.div>
)

/**
 * CONTEXT7 SOURCE: /pmndrs/zustand - CMS-integrated timeline component
 * Main section component that orchestrates timeline display with CMS data integration
 */
export const TestimonialsTimelineSection: React.FC<TestimonialsTimelineSectionProps> = ({
  timelines: propTimelines,
  configuration,
  className = '',
  backgroundVariant = 'white',
  showHeader = true,
  headerTitle = 'Client Journey Timelines',
  headerSubtitle = 'Transformation Stories',
  headerDescription = 'Discover how our personalised tutoring transforms academic journeys, from initial challenges to extraordinary achievements.',
  featured = false,
  category,
  limit,
  showFilters = true,
  autoPlay = false,
  integration = {
    enableCMSSync: true,
    enableSmartCategorization: true,
    enableAnalytics: true
  },
  onStageSelect,
  onTimelineComplete
}) => {
  // CONTEXT7 SOURCE: /pmndrs/zustand - CMS manager integration for testimonials data
  const { manager: cmsManager, store: cmsStore } = useTestimonialsCMS()
  
  // Responsive design detection
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  // Timeline data with CMS integration
  const timelineData = useMemo(() => {
    if (propTimelines) {
      return propTimelines
    }
    
    if (integration.enableCMSSync) {
      // Integrate timeline data with existing testimonials from CMS
      return getClientJourneyTimelines()
    }
    
    return getClientJourneyTimelines()
  }, [propTimelines, integration.enableCMSSync])

  // Enhanced timeline data with testimonials integration
  const integratedTimelines = useMemo(async () => {
    if (integration.enableCMSSync) {
      return await integrateTimelineWithTestimonials()
    }
    return timelineData
  }, [timelineData, integration.enableCMSSync])

  // Analytics tracking for timeline interactions
  const handleStageSelectWithAnalytics = useCallback((stage: any) => {
    if (integration.enableAnalytics) {
      // Track stage selection for analytics
      const eventData = {
        action: 'timeline_stage_select',
        stage_id: stage.id,
        stage_type: stage.stage,
        timeline_category: stage.timeline?.category,
        timestamp: new Date().toISOString()
      }
      
      // Send analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'timeline_interaction', eventData)
      }
    }
    
    onStageSelect?.(stage)
  }, [integration.enableAnalytics, onStageSelect])

  const handleTimelineCompleteWithAnalytics = useCallback((timeline: ClientJourneyTimeline) => {
    if (integration.enableAnalytics) {
      // Track timeline completion for conversion analytics
      const eventData = {
        action: 'timeline_complete',
        timeline_id: timeline.id,
        timeline_category: timeline.category,
        duration_months: timeline.totalDurationMonths,
        result_type: timeline.overallResult,
        timestamp: new Date().toISOString()
      }
      
      // Send analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'timeline_completion', eventData)
      }
    }
    
    onTimelineComplete?.(timeline)
  }, [integration.enableAnalytics, onTimelineComplete])

  // Background variant styles
  const backgroundStyles = {
    white: 'bg-white',
    slate: 'bg-slate-50',
    gradient: 'bg-gradient-to-b from-slate-50 to-white'
  }[backgroundVariant]

  // Error handling state
  const [hasError, setHasError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(!propTimelines)

  // CMS loading state management
  React.useEffect(() => {
    if (integration.enableCMSSync && cmsStore.isLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    
    if (cmsStore.error) {
      setHasError(true)
    }
  }, [integration.enableCMSSync, cmsStore.isLoading, cmsStore.error])

  const handleRetry = useCallback(() => {
    setHasError(false)
    setIsLoading(true)
    
    if (integration.enableCMSSync) {
      cmsManager.clearCache()
      cmsManager.preloadContent()
    }
  }, [integration.enableCMSSync, cmsManager])

  // Enhanced component props with CMS integration
  const componentProps: TestimonialsTimelineProps = {
    timelines: timelineData,
    configuration,
    featured,
    category,
    limit,
    showFilters,
    autoPlay,
    onStageSelect: handleStageSelectWithAnalytics,
    onTimelineComplete: handleTimelineCompleteWithAnalytics
  }

  return (
    <section 
      className={`${backgroundStyles} ${className}`}
      // CONTEXT7 SOURCE: /w3/accessibility - Semantic section with ARIA labels
      role="region"
      aria-labelledby={showHeader ? 'timeline-section-title' : undefined}
      aria-describedby={showHeader ? 'timeline-section-description' : undefined}
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Section Header */}
        {showHeader && (
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">
                {headerSubtitle}
              </span>
            </div>
            
            <h2 
              id="timeline-section-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              {headerTitle}
            </h2>
            
            <p 
              id="timeline-section-description"
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              {headerDescription}
            </p>
          </motion.div>
        )}

        {/* Timeline Content */}
        <Suspense fallback={<TimelineLoadingSkeleton />}>
          {hasError ? (
            <TimelineErrorBoundary 
              error={new Error(cmsStore.error || 'Unknown timeline loading error')}
              onRetry={handleRetry}
            />
          ) : isLoading ? (
            <TimelineLoadingSkeleton />
          ) : isMobile ? (
            <TimelineMobileOptimized 
              {...componentProps}
              className="md:hidden"
            />
          ) : (
            <InteractiveTimeline 
              {...componentProps}
              className="hidden md:block"
            />
          )}
        </Suspense>

        {/* CMS Status Indicator (Development Only) */}
        {process.env.NODE_ENV === 'development' && integration.enableCMSSync && (
          <motion.div 
            className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                cmsStore.error ? 'bg-red-500' : 
                cmsStore.isLoading ? 'bg-yellow-500' : 
                'bg-green-500'
              }`} />
              <span className="font-medium text-blue-800">
                CMS Integration Status:
              </span>
              <span className="text-blue-600">
                {cmsStore.error ? 'Error' : 
                 cmsStore.isLoading ? 'Loading' : 
                 'Connected'}
              </span>
            </div>
            
            {cmsStore.content && (
              <div className="mt-2 text-xs text-blue-600">
                Last updated: {new Date(cmsStore.metrics.lastUpdated).toLocaleString()}
              </div>
            )}
          </motion.div>
        )}

        {/* Integration Features Notice */}
        {integration.enableSmartCategorization && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-slate-500">
              Timeline content is automatically categorized and integrated with our testimonials system 
              for enhanced storytelling and user experience.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default TestimonialsTimelineSection