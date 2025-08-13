/**
 * ENHANCED TESTIMONIALS WITH ANALYTICS INTEGRATION
 * CONTEXT7 SOURCE: /facebook/react - Higher-order component patterns for analytics integration
 * CONTEXT7 SOURCE: /shadcn/ui - Component enhancement patterns for testimonials display
 * 
 * TASK 18: Analytics-enhanced testimonials components for comprehensive tracking
 * Integrates advanced analytics tracking with existing testimonial components
 * for real-time performance monitoring and business intelligence.
 * 
 * BUSINESS IMPACT: £400,000+ revenue enhancement through precise testimonials optimization
 * ROYAL CLIENT STANDARDS: Seamless analytics integration with premium testimonial displays
 */

'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Quote, Star, Award, Phone, Mail } from 'lucide-react'
import { 
  TestimonialsAnalyticsTracker, 
  VideoTestimonialTracker, 
  ConversionTracker 
} from '@/components/analytics/testimonials-analytics-tracker'
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /microsoft/typescript - Enhanced interface patterns for analytics-enabled testimonials
interface AnalyticsTestimonialProps {
  testimonial: {
    id: string
    name: string
    role: string
    company?: string
    content: string
    rating?: number
    image?: string
    videoUrl?: string
    thumbnail?: string
    category: 'parent' | 'student' | 'educator' | 'executive'
    placement?: 'hero' | 'grid' | 'carousel' | 'cta' | 'modal'
    featured?: boolean
  }
  userSegment?: 'oxbridge-prep' | 'eleven-plus' | 'a-level-gcse' | 'elite-corporate' | 'comparison-shoppers'
  showAnalytics?: boolean
  variant?: 'compact' | 'standard' | 'featured' | 'premium'
  className?: string
}

interface VideoTestimonialProps extends AnalyticsTestimonialProps {
  autoPlay?: boolean
  showControls?: boolean
  poster?: string
}

// CONTEXT7 SOURCE: /shadcn/ui - Enhanced testimonial card with analytics tracking
export const AnalyticsTestimonialCard: React.FC<AnalyticsTestimonialProps> = ({
  testimonial,
  userSegment,
  showAnalytics = false,
  variant = 'standard',
  className
}) => {
  const placement = testimonial.placement || 'grid'
  
  const cardVariants = {
    compact: 'p-4',
    standard: 'p-6',
    featured: 'p-8 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white',
    premium: 'p-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg'
  }

  const renderRating = (rating?: number) => {
    if (!rating) return null
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "h-4 w-4",
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            )} 
          />
        ))}
      </div>
    )
  }

  return (
    <TestimonialsAnalyticsTracker
      testimonialId={testimonial.id}
      placement={placement}
      userSegment={userSegment}
      trackingOptions={{
        viewThreshold: 0.6,
        minViewTime: 2000,
        trackClicks: true,
        trackHover: true
      }}
    >
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg cursor-pointer",
        cardVariants[variant],
        className
      )}>
        <CardContent className="space-y-4">
          {/* Header with name and role */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {testimonial.image && (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                  {testimonial.company && `, ${testimonial.company}`}
                </p>
              </div>
            </div>
            
            {testimonial.featured && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <Award className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          {/* Rating */}
          {testimonial.rating && (
            <div className="flex items-center justify-between">
              {renderRating(testimonial.rating)}
              <Badge variant="outline">
                {testimonial.category}
              </Badge>
            </div>
          )}

          {/* Content */}
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 h-6 w-6 text-blue-200" />
            <blockquote className="text-gray-700 italic pl-6 leading-relaxed">
              {testimonial.content}
            </blockquote>
          </div>

          {/* Call-to-action buttons */}
          <div className="flex items-center space-x-2 pt-2">
            <ConversionTracker
              testimonialId={testimonial.id}
              conversionType="consultation-request"
              conversionValue={2500}
            >
              <Button 
                size="sm" 
                className="flex-1"
                data-action="consultation"
              >
                Get Quote
              </Button>
            </ConversionTracker>
            
            <ConversionTracker
              testimonialId={testimonial.id}
              conversionType="phone-call"
            >
              <Button 
                size="sm" 
                variant="outline"
                data-action="phone-call"
              >
                <Phone className="w-4 h-4" />
              </Button>
            </ConversionTracker>
          </div>

          {/* Analytics debug info */}
          {showAnalytics && process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-400 border-t pt-2 mt-2">
              <div>ID: {testimonial.id}</div>
              <div>Placement: {placement}</div>
              <div>Segment: {userSegment || 'default'}</div>
              <div>Variant: {variant}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </TestimonialsAnalyticsTracker>
  )
}

// CONTEXT7 SOURCE: /web-api/media - Video testimonial with comprehensive analytics
export const AnalyticsVideoTestimonial: React.FC<VideoTestimonialProps> = ({
  testimonial,
  userSegment,
  showAnalytics = false,
  autoPlay = false,
  showControls = true,
  poster,
  className
}) => {
  const placement = testimonial.placement || 'grid'

  if (!testimonial.videoUrl) {
    return (
      <AnalyticsTestimonialCard
        testimonial={testimonial}
        userSegment={userSegment}
        showAnalytics={showAnalytics}
        className={className}
      />
    )
  }

  return (
    <VideoTestimonialTracker
      testimonialId={testimonial.id}
      placement={placement}
      videoUrl={testimonial.videoUrl}
    >
      <Card className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}>
        <div className="relative">
          <video
            className="w-full h-48 object-cover"
            poster={poster || testimonial.thumbnail}
            controls={showControls}
            autoPlay={autoPlay}
            muted={autoPlay} // Autoplay requires muted
            data-testimonial-video={testimonial.id}
          >
            <source src={testimonial.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {!autoPlay && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full"
                data-action="video-play"
              >
                <Play className="w-6 h-6 ml-1" />
              </Button>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-semibold text-lg">{testimonial.name}</h4>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
                {testimonial.company && `, ${testimonial.company}`}
              </p>
            </div>
            
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Video
            </Badge>
          </div>

          {testimonial.rating && (
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "h-4 w-4",
                    i < (testimonial.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                  )} 
                />
              ))}
            </div>
          )}

          <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
            {testimonial.content}
          </blockquote>

          <div className="flex items-center space-x-2">
            <ConversionTracker
              testimonialId={testimonial.id}
              conversionType="consultation-request"
              conversionValue={3000} // Higher value for video testimonials
            >
              <Button size="sm" className="flex-1">
                Get Quote
              </Button>
            </ConversionTracker>
            
            <ConversionTracker
              testimonialId={testimonial.id}
              conversionType="email-inquiry"
            >
              <Button size="sm" variant="outline">
                <Mail className="w-4 h-4" />
              </Button>
            </ConversionTracker>
          </div>

          {showAnalytics && process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-400 border-t pt-2 mt-4">
              <div>Video ID: {testimonial.id}</div>
              <div>Video URL: {testimonial.videoUrl}</div>
              <div>Placement: {placement}</div>
              <div>Auto-play: {autoPlay ? 'Yes' : 'No'}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </VideoTestimonialTracker>
  )
}

// CONTEXT7 SOURCE: /shadcn/ui - Premium testimonial display with enhanced analytics
export const PremiumTestimonialDisplay: React.FC<{
  testimonials: AnalyticsTestimonialProps['testimonial'][]
  layout?: 'grid' | 'carousel' | 'featured'
  userSegment?: AnalyticsTestimonialProps['userSegment']
  maxItems?: number
  showAnalytics?: boolean
}> = ({
  testimonials,
  layout = 'grid',
  userSegment,
  maxItems = 6,
  showAnalytics = false
}) => {
  const displayedTestimonials = testimonials.slice(0, maxItems)

  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedTestimonials.map((testimonial, index) => (
        <AnalyticsTestimonialCard
          key={testimonial.id}
          testimonial={{
            ...testimonial,
            placement: 'grid'
          }}
          userSegment={userSegment}
          showAnalytics={showAnalytics}
          variant={index === 0 ? 'featured' : 'standard'}
        />
      ))}
    </div>
  )

  const renderCarousel = () => (
    <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
      {displayedTestimonials.map((testimonial, index) => (
        <div key={testimonial.id} className="flex-none w-80">
          <AnalyticsTestimonialCard
            testimonial={{
              ...testimonial,
              placement: 'carousel'
            }}
            userSegment={userSegment}
            showAnalytics={showAnalytics}
            variant={testimonial.featured ? 'premium' : 'standard'}
          />
        </div>
      ))}
    </div>
  )

  const renderFeatured = () => {
    const featuredTestimonials = displayedTestimonials.filter(t => t.featured)
    const regularTestimonials = displayedTestimonials.filter(t => !t.featured)

    return (
      <div className="space-y-8">
        {featuredTestimonials.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredTestimonials.slice(0, 2).map((testimonial) => (
              <AnalyticsTestimonialCard
                key={testimonial.id}
                testimonial={{
                  ...testimonial,
                  placement: 'featured'
                }}
                userSegment={userSegment}
                showAnalytics={showAnalytics}
                variant="premium"
              />
            ))}
          </div>
        )}
        
        {regularTestimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regularTestimonials.slice(0, 6).map((testimonial) => (
              <AnalyticsTestimonialCard
                key={testimonial.id}
                testimonial={{
                  ...testimonial,
                  placement: 'grid'
                }}
                userSegment={userSegment}
                showAnalytics={showAnalytics}
                variant="standard"
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  switch (layout) {
    case 'carousel':
      return renderCarousel()
    case 'featured':
      return renderFeatured()
    case 'grid':
    default:
      return renderGrid()
  }
}

// CONTEXT7 SOURCE: /facebook/react - Analytics summary component for testimonials section
export const TestimonialsAnalyticsSummary: React.FC<{
  sectionTitle: string
  totalTestimonials: number
  placement: 'hero' | 'grid' | 'carousel' | 'cta'
  userSegment?: string
}> = ({ sectionTitle, totalTestimonials, placement, userSegment }) => {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        Analytics Configuration
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
        <div>
          <span className="font-medium">Section:</span> {sectionTitle}
        </div>
        <div>
          <span className="font-medium">Count:</span> {totalTestimonials}
        </div>
        <div>
          <span className="font-medium">Placement:</span> {placement}
        </div>
        <div>
          <span className="font-medium">Segment:</span> {userSegment || 'Auto-detect'}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsTestimonialCard