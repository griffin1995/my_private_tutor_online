/**
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with aspect-video for video thumbnails
 * VIDEO THUMBNAIL FEATURE: Official Next.js documentation recommends explicit width/height for remote images
 * 
 * CONTEXT7 SOURCE: /lucide-icons/lucide - Play and CreditCard icons for video thumbnail functionality
 * VIDEO BUTTON LOGIC: Official Lucide documentation recommends semantic icon usage for user actions
 *
 * VideoThumbnailMidCard Component - Video Thumbnail Positioned in Middle
 * This component displays video thumbnails BETWEEN the description and duration sections,
 * providing optimal content flow for services where context comes before video preview.
 * 
 * Key Features:
 * - Video thumbnail positioned between description and duration (MIDDLE positioning)
 * - Interactive play button overlay with hover effects
 * - Smart button behavior for free/paid content
 * - Duration and price badges positioned on thumbnail
 * - "Most Popular" badge at optimal top-5 position
 * - Perfect spacing and visual hierarchy preserved
 * - Smaller rounded corners (rounded-xl) for embedded positioning
 */

"use client"

import { ArrowRight, Check, Star, Play, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { useState, useCallback, useRef, useEffect } from 'react'
import '@/styles/video-focus-styles.css'

// CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Intersection Observer for lazy loading and performance optimization
// PERFORMANCE ENHANCEMENT: Official react-intersection-observer documentation recommends triggerOnce and rootMargin for optimal video thumbnail loading

// CMS DATA SOURCE: Service data will be provided via props from CMS

interface ServiceFeature {
  feature: string
  included?: boolean
}

interface VideoThumbnailMidCardProps {
  title: string
  description: string
  features: ServiceFeature[]
  ctaText: string
  ctaLink: string
  className?: string
  variant?: 'standard' | 'premium' | 'royal'
  popular?: boolean
  priceRange?: string
  duration?: string
  onCTAClick?: () => void
  // CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with aspect-video for video thumbnails
  // VIDEO THUMBNAIL FEATURE: Official Next.js documentation recommends explicit width/height for remote images
  thumbnailUrl?: string // Optional for this component variant
  videoUrl?: string
  paymentUrl?: string
  // CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Performance optimization props
  // LAZY LOADING FEATURE: Official documentation recommends optional loading configuration for video thumbnails
  enableLazyLoading?: boolean
  gridIndex?: number // For keyboard navigation
  onKeyNavigation?: (direction: 'left' | 'right' | 'up' | 'down', currentIndex: number) => void
}

export function VideoThumbnailMidCard({
  title,
  description,
  features,
  ctaText,
  ctaLink,
  className,
  variant = 'standard',
  popular = false,
  priceRange,
  duration,
  onCTAClick,
  thumbnailUrl,
  videoUrl,
  paymentUrl,
  enableLazyLoading = true,
  gridIndex,
  onKeyNavigation
}: VideoThumbnailMidCardProps) {

  // CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - useInView hook for performance optimization
  // LAZY LOADING IMPLEMENTATION: Official documentation recommends triggerOnce and rootMargin for video thumbnails
  const { ref: intersectionRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
    skip: !enableLazyLoading || !thumbnailUrl
  })

  // CONTEXT7 SOURCE: /reactjs/react.dev - useState for loading state management
  // LOADING STATE REASON: Official React documentation recommends loading states for better user experience
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - useRef for keyboard navigation focus management
  // FOCUS MANAGEMENT REASON: Official React documentation recommends useRef for programmatic focus control
  const cardRef = useRef<HTMLDivElement>(null)
  
  // CONTEXT7 SOURCE: /w3c/wcag - Focus management for keyboard navigation
  // FOCUS ENHANCEMENT: Official WCAG documentation recommends programmatic focus for accessibility
  useEffect(() => {
    if (cardRef.current && gridIndex !== undefined) {
      const handleFocus = () => {
        cardRef.current?.setAttribute('data-navigation-focus', 'true')
      }
      
      const handleBlur = () => {
        cardRef.current?.setAttribute('data-navigation-focus', 'false')
      }
      
      cardRef.current.addEventListener('focus', handleFocus)
      cardRef.current.addEventListener('blur', handleBlur)
      
      return () => {
        cardRef.current?.removeEventListener('focus', handleFocus)
        cardRef.current?.removeEventListener('blur', handleBlur)
      }
    }
  }, [gridIndex])

  const containerClasses = {
    standard: 'bg-white rounded-2xl shadow-md hover:shadow-lg border border-primary-100 overflow-hidden group transition-all duration-300 h-full flex flex-col',
    premium: 'bg-gradient-to-br from-white to-accent-50 rounded-2xl shadow-premium hover:shadow-gold border border-accent-200 overflow-hidden group transition-all duration-500 transform hover:-translate-y-1 h-full flex flex-col',
    royal: 'bg-gradient-to-br from-white via-royal-50 to-royal-100 rounded-2xl shadow-royal hover:shadow-2xl border-2 border-royal-200 overflow-hidden group transition-all duration-500 transform hover:-translate-y-2 relative h-full flex flex-col'
  }

  const headerClasses = {
    standard: 'pt-12 px-6 pb-4 relative',
    premium: 'pt-12 px-8 pb-6 relative',
    royal: 'pt-12 px-8 pb-6 relative'
  }


  const titleClasses = {
    standard: 'font-serif text-xl font-bold text-primary-900 mb-3 group-hover:text-primary-700 transition-colours duration-300',
    premium: 'font-serif text-2xl font-bold text-primary-900 mb-4 group-hover:text-accent-700 transition-colours duration-300',
    royal: 'font-serif text-2xl font-bold text-primary-900 mb-4 group-hover:text-royal-700 transition-colours duration-300'
  }

  const descriptionClasses = {
    standard: 'text-primary-600 leading-relaxed mb-6',
    premium: 'text-primary-600 leading-relaxed mb-8 text-lg',
    royal: 'text-primary-600 leading-relaxed mb-8 text-lg'
  }

  const featureListClasses = {
    standard: 'px-6 pb-6 space-y-3 flex-grow',
    premium: 'px-8 pb-8 space-y-4 flex-grow',
    royal: 'px-8 pb-8 space-y-4 flex-grow'
  }

  const footerClasses = {
    standard: 'px-6 pb-6 pt-4 border-t border-primary-100 mt-auto',
    premium: 'px-8 pb-8 pt-6 border-t border-accent-200 mt-auto',
    royal: 'px-8 pb-8 pt-6 border-t border-royal-200 mt-auto'
  }

  const buttonVariants = {
    standard: 'w-full bg-primary-900 hover:bg-primary-800 text-white',
    premium: 'w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-gold',
    royal: 'w-full bg-gradient-to-r from-royal-500 to-royal-600 hover:from-royal-600 hover:to-royal-700 text-white shadow-royal'
  }


  // CONTEXT7 SOURCE: /lucide-icons/lucide - Play and CreditCard icons for video thumbnail functionality
  // VIDEO BUTTON LOGIC: Official Lucide documentation recommends semantic icon usage for user actions
  const isVideoFree = Boolean(videoUrl && !paymentUrl)
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - useCallback for performance optimization
  // PERFORMANCE REASON: Official React documentation recommends useCallback for event handlers to prevent unnecessary re-renders
  const handleVideoClick = useCallback(() => {
    if (!thumbnailUrl) return // No video available
    
    setIsLoading(true)
    
    setTimeout(() => {
      if (isVideoFree && videoUrl) {
        // Handle free video playback
        window.open(videoUrl, '_blank')
      } else if (paymentUrl) {
        // Handle payment flow
        window.open(paymentUrl, '_blank')
      }
      setIsLoading(false)
    }, 300) // Brief loading state for user feedback
  }, [isVideoFree, videoUrl, paymentUrl, thumbnailUrl])

  // CONTEXT7 SOURCE: /w3c/wcag - Keyboard navigation for accessibility compliance
  // ACCESSIBILITY REASON: Official WCAG documentation recommends arrow key navigation for grid-based content
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!onKeyNavigation || gridIndex === undefined) return
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        onKeyNavigation('left', gridIndex)
        break
      case 'ArrowRight':
        event.preventDefault()
        onKeyNavigation('right', gridIndex)
        break
      case 'ArrowUp':
        event.preventDefault()
        onKeyNavigation('up', gridIndex)
        break
      case 'ArrowDown':
        event.preventDefault()
        onKeyNavigation('down', gridIndex)
        break
      case 'Enter':
      case ' ':
        if (thumbnailUrl) {
          event.preventDefault()
          handleVideoClick()
        }
        break
    }
  }, [onKeyNavigation, gridIndex, handleVideoClick, thumbnailUrl])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Image loading handler for better UX
  // LOADING HANDLER REASON: Official React documentation recommends onLoad handlers for image loading states
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true)
  }, [])

  return (
    <div 
      ref={cardRef}
      className={cn(containerClasses[variant], className, 'video-thumbnail-card')} 
      role="article"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${title} ${thumbnailUrl ? 'video thumbnail' : 'content card'}. ${isVideoFree ? 'Free access' : priceRange || 'Premium content'}. Duration: ${duration || 'Not specified'}.`}
      data-grid-index={gridIndex}
    >
      
      {/* "Most Popular" Badge - Positioned at top-5 for optimal display */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10">
        {popular && (
          <Badge className="bg-gradient-to-r from-accent-500 to-accent-600 text-white border-0 shadow-lg">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        )}
      </div>

      {/* Header */}
      <div className={cn(headerClasses[variant])}>
        
        {/* Price Range - Always takes space for alignment */}
        <div className="flex justify-between items-center mb-4 h-8">
          {priceRange && (
            <>
              <span className="text-primary-500 text-sm font-medium">From</span>
              <span className="font-serif text-2xl font-bold text-primary-900">
                {priceRange}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className={cn(titleClasses[variant])}>
          {title}
        </h3>

        {/* Description */}
        <p className={cn(descriptionClasses[variant])}>
          {description}
        </p>

        {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with aspect-video ratio for professional video thumbnails */}
        {/* VIDEO THUMBNAIL SECTION: Positioned between description and duration for optimal content flow */}
        {/* POSITIONING: Thumbnail in MIDDLE of card - this is the defining feature of VideoThumbnailMidCard */}
        {thumbnailUrl && (
          <div 
            ref={intersectionRef}
            className="relative group cursor-pointer mb-6 video-thumbnail-container" 
            onClick={handleVideoClick}
            role="button"
            tabIndex={-1}
            aria-label={`Play video: ${title}`}
          >
            <div className="aspect-video relative overflow-hidden rounded-xl">
              {/* CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Lazy loading skeleton for performance */}
              {/* SKELETON LOADING REASON: Official intersection observer documentation recommends skeleton states for better perceived performance */}
              {enableLazyLoading && !inView ? (
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse rounded-xl" />
              ) : (
                <>
                  <Image
                    src={thumbnailUrl}
                    alt={`${title} video thumbnail`}
                    width={400}
                    height={225}
                    className={cn(
                      "w-full h-full object-cover group-hover:scale-105 transition-all duration-300",
                      !isImageLoaded && "opacity-0",
                      isImageLoaded && "opacity-100"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    priority={!enableLazyLoading}
                    onLoad={handleImageLoad}
                  />
                  
                  {/* Loading skeleton overlay */}
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />
                  )}
                </>
              )}
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              
              {/* Play Button - Enhanced with loading state */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={cn(
                  "bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-lg video-play-button",
                  isLoading && "animate-pulse scale-95"
                )}>
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-primary-900 border-t-transparent rounded-full animate-spin" />
                      <span className="sr-only">Loading video...</span>
                    </>
                  ) : isVideoFree ? (
                    <>
                      <Play className="w-6 h-6 text-primary-900 fill-current" />
                      <span className="sr-only">Watch Free Video - Press Enter or Space to play</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-6 h-6 text-primary-900" />
                      <span className="sr-only">Purchase to Watch - Press Enter or Space to continue</span>
                    </>
                  )}
                </div>
              </div>
              
              {/* Duration Badge - Top Right */}
              {duration && (
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded text-sm font-medium">
                  {duration}
                </div>
              )}
              
              {/* Free/Paid Badge - Top Left */}
              <div className="absolute top-3 left-3">
                {isVideoFree ? (
                  <Badge className="bg-green-600 text-white border-0 shadow-lg text-xs">
                    Free
                  </Badge>
                ) : (
                  <Badge className="bg-accent-500 text-white border-0 shadow-lg text-xs">
                    {priceRange || 'Premium'}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Duration - Always takes space for alignment */}
        <div className="min-h-[28px] mb-2">
          {duration && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 rounded-full text-primary-700 text-sm font-medium">
              <span className="w-2 h-2 bg-primary-500 rounded-full" />
              {duration}
            </div>
          )}
        </div>
      </div>

      {/* Features List */}
      <div className={cn(featureListClasses[variant])}>
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Check 
                className={cn(
                  'w-5 h-5',
                  variant === 'royal' ? 'text-royal-500' : 
                  variant === 'premium' ? 'text-accent-500' : 
                  'text-primary-500'
                )} 
              />
            </div>
            <span className="text-primary-700 leading-relaxed">
              {feature.feature}
            </span>
          </div>
        ))}
      </div>

      {/* Footer with CTA */}
      <div className={cn(footerClasses[variant])}>
        <Button
          className={cn(buttonVariants[variant], 'group video-cta-button')}
          onClick={onCTAClick}
          aria-label={`${ctaText} for ${title}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {ctaText}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

// Component variants for storybook/documentation
export type VideoThumbnailMidCardVariant = 'standard' | 'premium' | 'royal'