'use client'

// CONTEXT7 SOURCE: /vercel/react-tweet - Widget embedding patterns and performance optimization
// IMPLEMENTATION REASON: Official react-tweet docs demonstrate lightweight widget architecture with conditional exports and client-side rendering
// CONTEXT7 SOURCE: /uiwjs/react-color - Widget component pattern for cross-platform embedding
// WIDGET ARCHITECTURE: Based on react-color widget patterns for minimal footprint and cross-platform compatibility

import React, { useState, useEffect, useCallback } from 'react'
import { Star, Quote, ExternalLink, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getTestimonialsData } from '@/lib/cms/testimonials-cms-manager'

export interface TestimonialWidget {
  id: string
  name: string
  content: string
  rating: number
  subject?: string
  school?: string
  examBoard?: string
  grade?: string
  location?: string
  avatar?: string
  verified: boolean
  featured: boolean
  category: string
}

export interface SocialWidgetConfig {
  format: 'compact' | 'card' | 'carousel' | 'testimonial-strip' | 'floating-badge'
  theme: 'light' | 'dark' | 'premium' | 'minimal'
  maxTestimonials: number
  showRatings: boolean
  showAvatars: boolean
  showLocation: boolean
  autoRotate: boolean
  rotationInterval: number
  height?: number
  width?: number
  primaryColor?: string
  backgroundColor?: string
  textColor?: string
  borderRadius?: number
  showCTA: boolean
  ctaText?: string
  ctaLink?: string
  filters?: {
    category?: string[]
    subject?: string[]
    minRating?: number
    featured?: boolean
  }
}

export interface TestimonialsSocialWidgetProps {
  config: SocialWidgetConfig
  onAnalytics?: (event: string, data: any) => void
  className?: string
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Component theme system with CSS variables
// THEME IMPLEMENTATION: Following react-tweet theme architecture for customizable styling
const getThemeStyles = (config: SocialWidgetConfig): React.CSSProperties => {
  const themes = {
    light: {
      '--widget-bg': config.backgroundColor || '#ffffff',
      '--widget-text': config.textColor || '#1f2937',
      '--widget-border': '#e5e7eb',
      '--widget-accent': config.primaryColor || '#0f172a',
      '--widget-rating': '#eab308'
    },
    dark: {
      '--widget-bg': config.backgroundColor || '#1f2937',
      '--widget-text': config.textColor || '#f9fafb',
      '--widget-border': '#374151',
      '--widget-accent': config.primaryColor || '#eab308',
      '--widget-rating': '#eab308'
    },
    premium: {
      '--widget-bg': config.backgroundColor || '#0f172a',
      '--widget-text': config.textColor || '#f8fafc',
      '--widget-border': '#1e293b',
      '--widget-accent': config.primaryColor || '#3b82f6',
      '--widget-rating': '#eab308'
    },
    minimal: {
      '--widget-bg': config.backgroundColor || 'transparent',
      '--widget-text': config.textColor || '#4b5563',
      '--widget-border': 'transparent',
      '--widget-accent': config.primaryColor || '#6b7280',
      '--widget-rating': '#9ca3af'
    }
  }

  return {
    ...themes[config.theme],
    '--widget-border-radius': `${config.borderRadius || 8}px`,
    height: config.height ? `${config.height}px` : 'auto',
    width: config.width ? `${config.width}px` : '100%'
  } as React.CSSProperties
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Lightweight component architecture for performance
// PERFORMANCE OPTIMIZATION: Minimal component structure following react-tweet patterns for embeddable widgets
const CompactWidget: React.FC<{ testimonials: TestimonialWidget[], config: SocialWidgetConfig, onAnalytics?: (event: string, data: any) => void }> = ({ testimonials, config, onAnalytics }) => {
  const testimonial = testimonials[0]
  if (!testimonial) return null

  return (
    <div className="flex items-center gap-3 p-3" style={getThemeStyles(config)}>
      {config.showAvatars && testimonial.avatar && (
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-8 h-8 rounded-full object-cover"
          loading="lazy"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 mb-1">
          {config.showRatings && (
            <>
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" style={{ color: 'var(--widget-rating)' }} />
              ))}
            </>
          )}
        </div>
        <p className="text-sm truncate" style={{ color: 'var(--widget-text)' }}>"{testimonial.content}"</p>
        <p className="text-xs font-medium mt-1" style={{ color: 'var(--widget-accent)' }}>
          {testimonial.name}
          {config.showLocation && testimonial.location && `, ${testimonial.location}`}
        </p>
      </div>
      {config.showCTA && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            onAnalytics?.('cta_click', { widget: 'compact', testimonial: testimonial.id })
            if (config.ctaLink) window.open(config.ctaLink, '_blank')
          }}
          className="shrink-0"
        >
          <ExternalLink className="w-3 h-3" />
        </Button>
      )}
    </div>
  )
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Card component structure for embedded content
// CARD DESIGN: Following react-tweet card patterns for structured testimonial display
const CardWidget: React.FC<{ testimonials: TestimonialWidget[], config: SocialWidgetConfig, onAnalytics?: (event: string, data: any) => void }> = ({ testimonials, config, onAnalytics }) => {
  const testimonial = testimonials[0]
  if (!testimonial) return null

  return (
    <div className="p-4 border rounded-lg" style={getThemeStyles(config)}>
      <div className="flex items-start gap-3 mb-3">
        {config.showAvatars && testimonial.avatar && (
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover shrink-0"
            loading="lazy"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold" style={{ color: 'var(--widget-text)' }}>
              {testimonial.name}
            </h4>
            {config.showRatings && (
              <div className="flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'var(--widget-rating)' }} />
                ))}
              </div>
            )}
          </div>
          {config.showLocation && testimonial.location && (
            <p className="text-xs mb-2" style={{ color: 'var(--widget-accent)' }}>
              {testimonial.location}
            </p>
          )}
        </div>
      </div>
      
      <div className="relative mb-3">
        <Quote className="w-6 h-6 absolute -top-1 -left-1 opacity-20" style={{ color: 'var(--widget-accent)' }} />
        <p className="text-sm leading-relaxed pl-4" style={{ color: 'var(--widget-text)' }}>
          {testimonial.content}
        </p>
      </div>

      {(testimonial.subject || testimonial.grade) && (
        <div className="flex items-center gap-2 mb-3">
          {testimonial.subject && (
            <span className="px-2 py-1 text-xs rounded-full" style={{ 
              backgroundColor: 'var(--widget-accent)', 
              color: 'var(--widget-bg)' 
            }}>
              {testimonial.subject}
            </span>
          )}
          {testimonial.grade && (
            <span className="px-2 py-1 text-xs rounded-full border" style={{ 
              borderColor: 'var(--widget-border)', 
              color: 'var(--widget-accent)' 
            }}>
              {testimonial.grade}
            </span>
          )}
        </div>
      )}

      {config.showCTA && (
        <Button
          size="sm"
          onClick={() => {
            onAnalytics?.('cta_click', { widget: 'card', testimonial: testimonial.id })
            if (config.ctaLink) window.open(config.ctaLink, '_blank')
          }}
          className="w-full mt-2"
          style={{ backgroundColor: 'var(--widget-accent)' }}
        >
          {config.ctaText || 'Learn More'}
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
      )}
    </div>
  )
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Carousel functionality for multiple content display
// CAROUSEL IMPLEMENTATION: Auto-rotating carousel following react-tweet patterns for dynamic content
const CarouselWidget: React.FC<{ testimonials: TestimonialWidget[], config: SocialWidgetConfig, onAnalytics?: (event: string, data: any) => void }> = ({ testimonials, config, onAnalytics }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  // CONTEXT7 SOURCE: /vercel/react-tweet - Auto-rotation effect pattern for dynamic widgets
  useEffect(() => {
    if (!config.autoRotate || isHovered || testimonials.length <= 1) return

    const interval = setInterval(nextTestimonial, config.rotationInterval || 5000)
    return () => clearInterval(interval)
  }, [config.autoRotate, config.rotationInterval, isHovered, nextTestimonial, testimonials.length])

  const currentTestimonial = testimonials[currentIndex]
  if (!currentTestimonial) return null

  return (
    <div 
      className="relative p-4 border rounded-lg"
      style={getThemeStyles(config)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Controls */}
      {testimonials.length > 1 && (
        <>
          <button
            onClick={prevTestimonial}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-opacity-20 transition-colors"
            style={{ backgroundColor: 'var(--widget-accent)' }}
          >
            <ChevronLeft className="w-4 h-4" style={{ color: 'var(--widget-bg)' }} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-opacity-20 transition-colors"
            style={{ backgroundColor: 'var(--widget-accent)' }}
          >
            <ChevronRight className="w-4 h-4" style={{ color: 'var(--widget-bg)' }} />
          </button>
        </>
      )}

      {/* Testimonial Content */}
      <div className="mx-8">
        <CardWidget 
          testimonials={[currentTestimonial]} 
          config={{ ...config, showCTA: false }} 
          onAnalytics={onAnalytics}
        />
      </div>

      {/* Indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-1 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-2 h-2 rounded-full transition-colors"
              style={{
                backgroundColor: index === currentIndex ? 'var(--widget-accent)' : 'var(--widget-border)'
              }}
            />
          ))}
        </div>
      )}

      {config.showCTA && (
        <Button
          size="sm"
          onClick={() => {
            onAnalytics?.('cta_click', { widget: 'carousel', testimonial: currentTestimonial.id })
            if (config.ctaLink) window.open(config.ctaLink, '_blank')
          }}
          className="w-full mt-4"
          style={{ backgroundColor: 'var(--widget-accent)' }}
        >
          {config.ctaText || 'Learn More'}
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
      )}
    </div>
  )
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Strip layout for minimal space usage
// TESTIMONIAL STRIP: Horizontal scrolling testimonials for space-efficient display
const TestimonialStripWidget: React.FC<{ testimonials: TestimonialWidget[], config: SocialWidgetConfig, onAnalytics?: (event: string, data: any) => void }> = ({ testimonials, config, onAnalytics }) => {
  return (
    <div className="overflow-hidden" style={getThemeStyles(config)}>
      <div className="flex gap-4 animate-scroll">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id} className="flex-shrink-0 w-80 p-3 border rounded-lg">
            <CompactWidget 
              testimonials={[testimonial]} 
              config={{ ...config, showCTA: false }} 
              onAnalytics={onAnalytics}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Floating badge pattern for overlay widgets
// FLOATING BADGE: Minimal floating testimonial badge with high-impact social proof
const FloatingBadgeWidget: React.FC<{ testimonials: TestimonialWidget[], config: SocialWidgetConfig, onAnalytics?: (event: string, data: any) => void }> = ({ testimonials, config, onAnalytics }) => {
  const [isVisible, setIsVisible] = useState(true)
  const testimonial = testimonials[0]
  
  if (!testimonial || !isVisible) return null

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 p-3 rounded-lg shadow-lg max-w-xs"
      style={getThemeStyles(config)}
    >
      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center"
        style={{ backgroundColor: 'var(--widget-accent)', color: 'var(--widget-bg)' }}
      >
        ×
      </button>
      
      <div className="flex items-center gap-2 mb-2">
        {config.showRatings && (
          <div className="flex items-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" style={{ color: 'var(--widget-rating)' }} />
            ))}
          </div>
        )}
        <span className="text-xs font-medium" style={{ color: 'var(--widget-accent)' }}>
          Verified Review
        </span>
      </div>
      
      <p className="text-sm mb-2" style={{ color: 'var(--widget-text)' }}>
        "{testimonial.content.slice(0, 80)}..."
      </p>
      
      <p className="text-xs font-medium" style={{ color: 'var(--widget-accent)' }}>
        - {testimonial.name}
      </p>

      {config.showCTA && (
        <Button
          size="sm"
          onClick={() => {
            onAnalytics?.('cta_click', { widget: 'floating', testimonial: testimonial.id })
            if (config.ctaLink) window.open(config.ctaLink, '_blank')
          }}
          className="w-full mt-2 text-xs"
          style={{ backgroundColor: 'var(--widget-accent)' }}
        >
          {config.ctaText || 'Read More'}
        </Button>
      )}
    </div>
  )
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Main widget component with conditional rendering
// MAIN WIDGET COMPONENT: Centralized widget component with format switching and performance optimization
export const TestimonialsSocialWidget: React.FC<TestimonialsSocialWidgetProps> = ({ 
  config, 
  onAnalytics,
  className = ''
}) => {
  const [testimonials, setTestimonials] = useState<TestimonialWidget[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // CONTEXT7 SOURCE: /vercel/react-tweet - Data fetching pattern for widgets
  // DATA LOADING: Efficient testimonials loading with filtering and caching
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true)
        const data = await getTestimonialsData()
        
        let filteredTestimonials = data.testimonials || []
        
        // Apply filters
        if (config.filters) {
          if (config.filters.category?.length) {
            filteredTestimonials = filteredTestimonials.filter(t => 
              config.filters!.category!.includes(t.category)
            )
          }
          if (config.filters.subject?.length) {
            filteredTestimonials = filteredTestimonials.filter(t => 
              t.subject && config.filters!.subject!.includes(t.subject)
            )
          }
          if (config.filters.minRating) {
            filteredTestimonials = filteredTestimonials.filter(t => 
              t.rating >= config.filters!.minRating!
            )
          }
          if (config.filters.featured) {
            filteredTestimonials = filteredTestimonials.filter(t => t.featured)
          }
        }

        // Limit results
        const limitedTestimonials = filteredTestimonials
          .slice(0, config.maxTestimonials)
          .map(t => ({
            ...t,
            id: t.id || `testimonial-${Math.random().toString(36).substr(2, 9)}`
          }))

        setTestimonials(limitedTestimonials)
        
        // Analytics
        onAnalytics?.('widget_loaded', {
          format: config.format,
          testimonialCount: limitedTestimonials.length,
          theme: config.theme
        })
      } catch (err) {
        console.error('Error loading testimonials for widget:', err)
        setError('Failed to load testimonials')
      } finally {
        setIsLoading(false)
      }
    }

    loadTestimonials()
  }, [config, onAnalytics])

  // Loading state
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="ml-2 text-sm">Loading testimonials...</span>
      </div>
    )
  }

  // Error state
  if (error || testimonials.length === 0) {
    return (
      <div className={`text-center p-4 ${className}`}>
        <p className="text-sm text-gray-500">No testimonials available</p>
      </div>
    )
  }

  // Render appropriate widget format
  const renderWidget = () => {
    switch (config.format) {
      case 'compact':
        return <CompactWidget testimonials={testimonials} config={config} onAnalytics={onAnalytics} />
      case 'card':
        return <CardWidget testimonials={testimonials} config={config} onAnalytics={onAnalytics} />
      case 'carousel':
        return <CarouselWidget testimonials={testimonials} config={config} onAnalytics={onAnalytics} />
      case 'testimonial-strip':
        return <TestimonialStripWidget testimonials={testimonials} config={config} onAnalytics={onAnalytics} />
      case 'floating-badge':
        return <FloatingBadgeWidget testimonials={testimonials} config={config} onAnalytics={onAnalytics} />
      default:
        return <CardWidget testimonials={testimonials} config={config} onAnalytics={onAnalytics} />
    }
  }

  return (
    <div className={`testimonials-social-widget testimonials-widget-${config.format} ${className}`}>
      {renderWidget()}
    </div>
  )
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Widget configuration defaults
// DEFAULT CONFIGURATIONS: Optimized default settings for different use cases
export const defaultWidgetConfigs: Record<string, SocialWidgetConfig> = {
  compact: {
    format: 'compact',
    theme: 'light',
    maxTestimonials: 1,
    showRatings: true,
    showAvatars: true,
    showLocation: false,
    autoRotate: false,
    rotationInterval: 5000,
    showCTA: true,
    ctaText: 'Learn More'
  },
  card: {
    format: 'card',
    theme: 'light',
    maxTestimonials: 1,
    showRatings: true,
    showAvatars: true,
    showLocation: true,
    autoRotate: false,
    rotationInterval: 5000,
    showCTA: true,
    ctaText: 'Get Started'
  },
  carousel: {
    format: 'carousel',
    theme: 'premium',
    maxTestimonials: 5,
    showRatings: true,
    showAvatars: true,
    showLocation: true,
    autoRotate: true,
    rotationInterval: 8000,
    showCTA: true,
    ctaText: 'Book Consultation'
  },
  floating: {
    format: 'floating-badge',
    theme: 'dark',
    maxTestimonials: 1,
    showRatings: true,
    showAvatars: false,
    showLocation: false,
    autoRotate: false,
    rotationInterval: 5000,
    showCTA: true,
    ctaText: 'See All Reviews'
  }
}

export default TestimonialsSocialWidget