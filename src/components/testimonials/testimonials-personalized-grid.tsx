/**
 * PERSONALIZED TESTIMONIALS GRID COMPONENT - TASK 14 IMPLEMENTATION
 * CONTEXT7 SOURCE: /facebook/react - Component architecture patterns with hooks
 * CONTEXT7 SOURCE: /framer/motion - Animation patterns for enhanced user experience
 * 
 * TASK 14: AI-powered personalized testimonials grid component
 * Displays dynamically personalized testimonials with intelligent ranking and adaptive UI
 * 
 * BUSINESS CONTEXT: £70,000+ revenue opportunity through relevant social proof
 * INTEGRATION: Uses personalization engine, A/B testing, and behavioral analytics
 * PERFORMANCE: Optimized rendering with lazy loading and intelligent caching
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Context7 MCP documentation patterns for all implementations
 * - Integration with existing design system and components
 * - Enterprise-grade performance and accessibility compliance
 * - British English terminology and premium service quality
 */

'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Star, Users, Award, Clock, Share2, Heart, ExternalLink } from 'lucide-react'
import { 
  useTestimonialsPersonalization,
  usePersonalizedTestimonials,
  usePersonalizationPerformance
} from './testimonials-personalization-provider'
import { useTestimonialsVariant } from './testimonials-ab-testing-provider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { TestimonialMatch } from '@/lib/ai/testimonials-personalization-engine'

interface PersonalizedTestimonialsGridProps {
  className?: string
  maxDisplayed?: number
  enableInteractions?: boolean
  showPersonalizationInsights?: boolean
  debugMode?: boolean
}

// CONTEXT7 SOURCE: /facebook/react - Component implementation with personalization integration
export default function PersonalizedTestimonialsGrid({
  className = '',
  maxDisplayed = 6,
  enableInteractions = true,
  showPersonalizationInsights = false,
  debugMode = false
}: PersonalizedTestimonialsGridProps) {
  // Personalization hooks
  const { 
    trackTestimonialInteraction,
    sessionContext,
    refreshPersonalization,
    isPersonalizing 
  } = useTestimonialsPersonalization()
  
  const { 
    primary, 
    secondary, 
    fallback, 
    isLoading, 
    error,
    isEmpty 
  } = usePersonalizedTestimonials()
  
  const performanceMetrics = usePersonalizationPerformance()
  
  // A/B testing integration
  const { configuration, trackInteraction } = useTestimonialsVariant('testimonials-grid')
  
  // Component state
  const [displayedTestimonials, setDisplayedTestimonials] = useState<TestimonialMatch[]>([])
  const [viewedTestimonials, setViewedTestimonials] = useState<Set<string>>(new Set())
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<string>>(new Set())
  const [interactionCounts, setInteractionCounts] = useState<Record<string, number>>({})
  
  // Refs for intersection observation
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { threshold: 0.1, once: false })
  
  // CONTEXT7 SOURCE: /framer/motion - Animation variants for testimonial cards
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  // Combine and prioritize testimonials based on personalization
  const combinedTestimonials = useMemo(() => {
    const combined = [
      ...primary.slice(0, Math.ceil(maxDisplayed * 0.6)),
      ...secondary.slice(0, Math.ceil(maxDisplayed * 0.3)),
      ...fallback.slice(0, Math.floor(maxDisplayed * 0.1))
    ].slice(0, maxDisplayed)
    
    return combined
  }, [primary, secondary, fallback, maxDisplayed])

  useEffect(() => {
    setDisplayedTestimonials(combinedTestimonials)
  }, [combinedTestimonials])

  // Track testimonial views when they come into viewport
  useEffect(() => {
    if (isInView && displayedTestimonials.length > 0) {
      displayedTestimonials.forEach((testimonialMatch) => {
        const testimonialId = generateTestimonialId(testimonialMatch)
        if (!viewedTestimonials.has(testimonialId)) {
          trackTestimonialView(testimonialId, testimonialMatch)
          setViewedTestimonials(prev => new Set(prev).add(testimonialId))
        }
      })
    }
  }, [isInView, displayedTestimonials])

  const trackTestimonialView = useCallback((testimonialId: string, testimonialMatch: TestimonialMatch) => {
    if (!enableInteractions) return
    
    trackTestimonialInteraction(testimonialId, 'view', 1)
    
    // Track A/B testing interaction
    trackInteraction('testimonial_view', {
      testimonialId,
      confidence: testimonialMatch.confidenceScore,
      priority: testimonialMatch.priority
    })
    
    if (debugMode) {
      console.log('[Personalized Grid] Testimonial viewed:', testimonialId)
    }
  }, [enableInteractions, trackTestimonialInteraction, trackInteraction, debugMode])

  const handleTestimonialClick = useCallback((testimonialMatch: TestimonialMatch) => {
    const testimonialId = generateTestimonialId(testimonialMatch)
    
    if (enableInteractions) {
      // Track click interaction
      trackTestimonialInteraction(testimonialId, 'click', 1)
      
      // Update interaction count
      setInteractionCounts(prev => ({
        ...prev,
        [testimonialId]: (prev[testimonialId] || 0) + 1
      }))
      
      // Track A/B testing conversion
      trackInteraction('testimonial_click', {
        testimonialId,
        confidence: testimonialMatch.confidenceScore
      })
    }
    
    if (debugMode) {
      console.log('[Personalized Grid] Testimonial clicked:', testimonialId)
    }
  }, [enableInteractions, trackTestimonialInteraction, trackInteraction, debugMode])

  const handleTestimonialExpand = useCallback((testimonialMatch: TestimonialMatch) => {
    const testimonialId = generateTestimonialId(testimonialMatch)
    
    setExpandedTestimonials(prev => {
      const newSet = new Set(prev)
      if (newSet.has(testimonialId)) {
        newSet.delete(testimonialId)
      } else {
        newSet.add(testimonialId)
        
        if (enableInteractions) {
          trackTestimonialInteraction(testimonialId, 'expand', 1)
        }
      }
      return newSet
    })
  }, [enableInteractions, trackTestimonialInteraction])

  const handleTestimonialShare = useCallback((testimonialMatch: TestimonialMatch) => {
    const testimonialId = generateTestimonialId(testimonialMatch)
    
    if (enableInteractions) {
      trackTestimonialInteraction(testimonialId, 'share', 2) // Higher value for sharing
    }
    
    // Create shareable content
    const shareText = `"${testimonialMatch.testimonial.quote}" - ${testimonialMatch.testimonial.author}`
    const shareUrl = `${window.location.origin}?testimonial=${testimonialId}`
    
    if (navigator.share) {
      navigator.share({
        title: 'My Private Tutor Online - Testimonial',
        text: shareText,
        url: shareUrl
      })
    } else {
      // Fallback to clipboard
      navigator.clipboard?.writeText(`${shareText} ${shareUrl}`)
    }
  }, [enableInteractions, trackTestimonialInteraction])

  // Loading state
  if (isLoading && displayedTestimonials.length === 0) {
    return (
      <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                <div className="h-4 bg-slate-200 rounded w-3/5"></div>
                <div className="h-8 bg-slate-200 rounded w-1/2 mt-4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-slate-600 mb-4">
          We're personalizing your testimonials experience. Please wait a moment.
        </div>
        <Button 
          onClick={refreshPersonalization}
          variant="outline"
          disabled={isPersonalizing}
        >
          {isPersonalizing ? 'Refreshing...' : 'Refresh Testimonials'}
        </Button>
      </div>
    )
  }

  // Empty state
  if (isEmpty) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-slate-600 mb-4">
          We're learning about your preferences to show you the most relevant testimonials.
        </div>
        <Button onClick={refreshPersonalization} variant="outline">
          Load Testimonials
        </Button>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className}>
      {/* Personalization Insights (Debug Mode) */}
      {showPersonalizationInsights && debugMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <h3 className="font-semibold text-blue-900 mb-2">Personalisation Insights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-600">Processing Time:</span>
              <div className="font-mono">{performanceMetrics.processingTime}ms</div>
            </div>
            <div>
              <span className="text-blue-600">Confidence:</span>
              <div className="font-mono">{(performanceMetrics.confidence * 100).toFixed(1)}%</div>
            </div>
            <div>
              <span className="text-blue-600">Cache Hit Rate:</span>
              <div className="font-mono">{(performanceMetrics.cacheHitRate * 100).toFixed(1)}%</div>
            </div>
            <div>
              <span className="text-blue-600">Session Duration:</span>
              <div className="font-mono">{Math.round(performanceMetrics.sessionDuration / 1000)}s</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Testimonials Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {displayedTestimonials.map((testimonialMatch, index) => {
            const testimonial = testimonialMatch.testimonial
            const testimonialId = generateTestimonialId(testimonialMatch)
            const isExpanded = expandedTestimonials.has(testimonialId)
            const interactionCount = interactionCounts[testimonialId] || 0
            
            return (
              <motion.div
                key={testimonialId}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                layout
                className="group relative"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-lg border-slate-200">
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Priority Badge */}
                    {testimonialMatch.priority === 'primary' && (
                      <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                        Recommended
                      </Badge>
                    )}
                    
                    {/* Confidence Indicator (Debug) */}
                    {debugMode && (
                      <div className="absolute top-2 left-2 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {(testimonialMatch.confidenceScore * 100).toFixed(0)}%
                      </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className={`text-slate-700 leading-relaxed mb-4 flex-grow ${
                      !isExpanded && testimonial.quote.length > 150 ? 'line-clamp-4' : ''
                    }`}>
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Expand Button for Long Quotes */}
                    {testimonial.quote.length > 150 && (
                      <button
                        onClick={() => handleTestimonialExpand(testimonialMatch)}
                        className="text-sm text-blue-600 hover:text-blue-800 mb-3 text-left transition-colors"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    )}

                    {/* Author and Details */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <cite className="font-semibold text-slate-900 not-italic">
                            {testimonial.author}
                          </cite>
                          {testimonial.role && (
                            <p className="text-sm text-slate-600">{testimonial.role}</p>
                          )}
                        </div>
                        
                        {testimonial.verified && (
                          <Badge variant="outline" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>

                      {/* Subject and Grade */}
                      {(testimonial.subject || testimonial.grade) && (
                        <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
                          {testimonial.subject && (
                            <span className="bg-slate-100 px-2 py-1 rounded">{testimonial.subject}</span>
                          )}
                          {testimonial.grade && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{testimonial.grade}</span>
                          )}
                        </div>
                      )}

                      {/* Result */}
                      {testimonial.result && (
                        <p className="text-sm text-slate-600 mb-3">
                          <strong>Result:</strong> {testimonial.result}
                        </p>
                      )}

                      {/* Interaction Buttons */}
                      {enableInteractions && (
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTestimonialClick(testimonialMatch)}
                              className="text-slate-600 hover:text-slate-900"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              {interactionCount || 'Like'}
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTestimonialShare(testimonialMatch)}
                              className="text-slate-600 hover:text-slate-900"
                            >
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                          </div>
                          
                          {testimonial.location && (
                            <span className="text-xs text-slate-500">{testimonial.location}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Load More Button */}
      {displayedTestimonials.length >= maxDisplayed && (
        <div className="text-center mt-8">
          <Button
            onClick={refreshPersonalization}
            variant="outline"
            disabled={isPersonalizing}
            className="min-w-[200px]"
          >
            {isPersonalizing ? 'Loading...' : 'Refresh Recommendations'}
          </Button>
        </div>
      )}
    </div>
  )
}

// CONTEXT7 SOURCE: /davidwells/analytics - Utility functions for tracking and identification
function generateTestimonialId(testimonialMatch: TestimonialMatch): string {
  const testimonial = testimonialMatch.testimonial
  return `${testimonial.author.replace(/\s+/g, '-').toLowerCase()}-${testimonial.quote.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`
}

// Export additional utility components for integration
export { generateTestimonialId }