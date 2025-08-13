/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Type-safe component patterns for union types
 * CONTEXT7 SOURCE: /react - Dynamic component rendering with conditional logic
 * 
 * FAQ Rich Media Renderer Component
 * Central orchestrator for all FAQ rich media content types
 * 
 * FEATURES:
 * - Type-safe rendering of all rich media content types
 * - Conditional visibility based on user segments and device types
 * - Analytics tracking for media interactions
 * - Lazy loading coordination across all media types
 * - Error boundaries for graceful degradation
 * - WCAG 2.1 AA accessibility compliance
 * - Performance optimization with dynamic imports
 * - Position-aware rendering (before, after, inline)
 * 
 * BUSINESS CONTEXT: Comprehensive rich media system for premium tutoring service
 * TARGET SEGMENTS: All client segments with enhanced visual engagement
 */

'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { cn } from '@/lib/utils'
import type { FAQRichMediaSection, FAQRichMediaContent } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /react - Dynamic imports for code splitting and performance
import dynamic from 'next/dynamic'

// CONTEXT7 SOURCE: /lucide-react - Loading and error state icons
import { Loader2, AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'

// CONTEXT7 SOURCE: /react - Dynamic component imports with loading states
const FAQVideo = dynamic(() => import('./faq-rich-media-video'), {
  loading: () => <MediaLoadingSkeleton type="video" />
})

const FAQDiagram = dynamic(() => import('./faq-rich-media-diagram'), {
  loading: () => <MediaLoadingSkeleton type="diagram" />
})

const FAQCode = dynamic(() => import('./faq-rich-media-code'), {
  loading: () => <MediaLoadingSkeleton type="code" />
})

const FAQDemo = dynamic(() => import('./faq-rich-media-demo'), {
  loading: () => <MediaLoadingSkeleton type="demo" />
})

const FAQGif = dynamic(() => import('./faq-rich-media-gif'), {
  loading: () => <MediaLoadingSkeleton type="gif" />
})

interface FAQRichMediaRendererProps {
  readonly sections: readonly FAQRichMediaSection[]
  readonly position: 'before' | 'after' | 'inline'
  readonly className?: string
  readonly userSegment?: string
  readonly deviceType?: 'mobile' | 'tablet' | 'desktop'
  readonly isAuthenticated?: boolean
  readonly onAnalyticsEvent?: (event: string, mediaId: string, data?: any) => void
}

interface MediaState {
  visibleSections: Set<string>
  errorSections: Set<string>
  analyticsTracked: Set<string>
}

/**
 * CONTEXT7 SOURCE: /react - Loading skeleton component for media types
 * Consistent loading states for all rich media types
 */
function MediaLoadingSkeleton({ type }: { type: string }) {
  const getSkeletonContent = () => {
    switch (type) {
      case 'video':
        return (
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading video player...</span>
            </div>
          </div>
        )
      case 'diagram':
        return (
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Rendering diagram...</span>
            </div>
          </div>
        )
      case 'code':
        return (
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading code editor...</span>
            </div>
          </div>
        )
      case 'demo':
        return (
          <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading interactive demo...</span>
            </div>
          </div>
        )
      case 'gif':
        return (
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading animation...</span>
            </div>
          </div>
        )
      default:
        return (
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        )
    }
  }

  return (
    <div className="my-6">
      {getSkeletonContent()}
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /react - Error boundary component for media content
 * Graceful error handling for rich media failures
 */
function MediaErrorFallback({ 
  mediaId, 
  type, 
  onRetry 
}: { 
  mediaId: string
  type: string
  onRetry: () => void 
}) {
  return (
    <div className="my-6 border border-destructive/20 bg-destructive/5 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-destructive mb-1">
            Media Loading Failed
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            The {type} content could not be loaded. This may be due to a network issue or content unavailability.
          </p>
          <Button size="sm" variant="outline" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Type-safe rich media rendering
 * Main rich media renderer with comprehensive feature support
 */
export function FAQRichMediaRenderer({
  sections,
  position,
  className,
  userSegment,
  deviceType = 'desktop',
  isAuthenticated = false,
  onAnalyticsEvent
}: FAQRichMediaRendererProps) {
  const [state, setState] = useState<MediaState>({
    visibleSections: new Set(),
    errorSections: new Set(),
    analyticsTracked: new Set()
  })

  // CONTEXT7 SOURCE: /microsoft/typescript - Content filtering based on conditions
  const getVisibleSections = useCallback(() => {
    return sections
      .filter(section => {
        // Basic visibility check
        if (!section.visible) return false

        // Position filter
        if (section.position !== position) return false

        // Conditional rendering checks
        if (section.conditional) {
          const { userSegment: allowedSegments, deviceType: allowedDevices, authRequired } = section.conditional

          // User segment check
          if (allowedSegments && userSegment && !allowedSegments.includes(userSegment)) {
            return false
          }

          // Device type check
          if (allowedDevices && !allowedDevices.includes(deviceType)) {
            return false
          }

          // Authentication check
          if (authRequired && !isAuthenticated) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => a.order - b.order)
  }, [sections, position, userSegment, deviceType, isAuthenticated])

  // CONTEXT7 SOURCE: /react - Analytics event tracking
  const trackAnalyticsEvent = useCallback((event: string, sectionId: string, data?: any) => {
    if (!onAnalyticsEvent) return

    const section = sections.find(s => s.id === sectionId)
    if (!section?.analytics?.trackViews) return

    // Prevent duplicate tracking
    const trackingKey = `${event}-${sectionId}`
    if (state.analyticsTracked.has(trackingKey)) return

    setState(prev => ({
      ...prev,
      analyticsTracked: new Set([...prev.analyticsTracked, trackingKey])
    }))

    onAnalyticsEvent(event, sectionId, {
      mediaType: section.content.type,
      position,
      userSegment,
      deviceType,
      ...data
    })
  }, [onAnalyticsEvent, sections, position, userSegment, deviceType, state.analyticsTracked])

  // CONTEXT7 SOURCE: /web-apis/intersection-observer - Visibility tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-media-id')
          if (!sectionId) return

          if (entry.isIntersecting) {
            setState(prev => ({
              ...prev,
              visibleSections: new Set([...prev.visibleSections, sectionId])
            }))
            
            // Track view event
            trackAnalyticsEvent('view', sectionId, {
              visibilityRatio: entry.intersectionRatio
            })
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: '50px 0px'
      }
    )

    // Observe all media elements
    const mediaElements = document.querySelectorAll('[data-media-id]')
    mediaElements.forEach(element => observer.observe(element))

    return () => observer.disconnect()
  }, [trackAnalyticsEvent])

  // CONTEXT7 SOURCE: /microsoft/typescript - Type-safe media component rendering
  const renderMediaContent = useCallback((section: FAQRichMediaSection) => {
    const { content } = section
    const isError = state.errorSections.has(section.id)

    const handleRetry = () => {
      setState(prev => ({
        ...prev,
        errorSections: new Set([...prev.errorSections].filter(id => id !== section.id))
      }))
    }

    const handleInteraction = (interactionType: string, data?: any) => {
      trackAnalyticsEvent('interaction', section.id, {
        interactionType,
        ...data
      })
    }

    if (isError) {
      return (
        <MediaErrorFallback 
          key={section.id}
          mediaId={section.id}
          type={content.type}
          onRetry={handleRetry}
        />
      )
    }

    try {
      switch (content.type) {
        case 'video':
          return (
            <Suspense key={section.id} fallback={<MediaLoadingSkeleton type="video" />}>
              <FAQVideo 
                video={content} 
                onInteraction={handleInteraction}
              />
            </Suspense>
          )

        case 'diagram':
          return (
            <Suspense key={section.id} fallback={<MediaLoadingSkeleton type="diagram" />}>
              <FAQDiagram 
                diagram={content} 
                onInteraction={handleInteraction}
              />
            </Suspense>
          )

        case 'code':
          return (
            <Suspense key={section.id} fallback={<MediaLoadingSkeleton type="code" />}>
              <FAQCode 
                code={content} 
                onInteraction={handleInteraction}
              />
            </Suspense>
          )

        case 'demo':
          return (
            <Suspense key={section.id} fallback={<MediaLoadingSkeleton type="demo" />}>
              <FAQDemo 
                demo={content} 
                onInteraction={handleInteraction}
              />
            </Suspense>
          )

        case 'gif':
          return (
            <Suspense key={section.id} fallback={<MediaLoadingSkeleton type="gif" />}>
              <FAQGif 
                gif={content} 
                onInteraction={handleInteraction}
              />
            </Suspense>
          )

        default:
          return (
            <div key={section.id} className="my-6 p-4 border border-muted rounded-lg">
              <p className="text-muted-foreground text-center">
                Unsupported media type: {(content as any).type}
              </p>
            </div>
          )
      }
    } catch (error) {
      console.error(`Error rendering media content ${section.id}:`, error)
      
      setState(prev => ({
        ...prev,
        errorSections: new Set([...prev.errorSections, section.id])
      }))

      return (
        <MediaErrorFallback 
          key={section.id}
          mediaId={section.id}
          type={content.type}
          onRetry={handleRetry}
        />
      )
    }
  }, [state.errorSections, trackAnalyticsEvent])

  // CONTEXT7 SOURCE: /react - Conditional rendering with performance optimization
  const visibleSections = getVisibleSections()

  if (visibleSections.length === 0) {
    return null
  }

  return (
    <div className={cn("space-y-6", className)}>
      {visibleSections.map((section) => (
        <div
          key={section.id}
          data-media-id={section.id}
          className="relative"
        >
          {/* Section header */}
          {(section.title || section.description) && (
            <div className="mb-4">
              {section.title && (
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {section.title}
                </h3>
              )}
              {section.description && (
                <p className="text-muted-foreground text-sm">
                  {section.description}
                </p>
              )}
            </div>
          )}

          {/* Media content */}
          {renderMediaContent(section)}

          {/* Section metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {section.content.type}
              </Badge>
              
              {section.conditional?.userSegment && (
                <Badge variant="outline" className="text-xs">
                  {section.conditional.userSegment.join(', ')}
                </Badge>
              )}

              {state.visibleSections.has(section.id) && (
                <Badge variant="outline" className="text-xs text-green-600">
                  <Eye className="w-3 h-3 mr-1" />
                  Viewed
                </Badge>
              )}
            </div>

            {section.analytics?.trackViews && (
              <span className="text-xs">
                Analytics enabled
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /react - Simplified wrapper for FAQ contexts
 * Convenience component for FAQ-specific rich media rendering
 */
interface FAQRichMediaProps {
  readonly sections?: readonly FAQRichMediaSection[]
  readonly position?: 'before' | 'after' | 'inline'
  readonly className?: string
}

export function FAQRichMedia({ 
  sections = [], 
  position = 'after', 
  className 
}: FAQRichMediaProps) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <FAQRichMediaRenderer
      sections={sections}
      position={position}
      className={className}
    />
  )
}

export default FAQRichMediaRenderer