/**
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with aspect-video for video thumbnails
 * VIDEO THUMBNAIL FEATURE: Official Next.js documentation recommends explicit width/height for remote images
 * 
 * CONTEXT7 SOURCE: /lucide-icons/lucide - Play and CreditCard icons for video thumbnail functionality
 * VIDEO BUTTON LOGIC: Official Lucide documentation recommends semantic icon usage for user actions
 *
 * VideoThumbnailTopCard Component - Video Thumbnail Positioned at Top
 * This component displays video thumbnails at the TOP of the card before any content,
 * providing immediate visual engagement perfect for UCAS styling and video-first content.
 * 
 * Key Features:
 * - Video thumbnail at TOP with 16:9 aspect ratio (TOP positioning)
 * - Interactive play button overlay with hover effects
 * - Smart button behavior for free/paid content
 * - Duration and price badges positioned on thumbnail
 * - "Most Popular" badge at optimal top-5 position
 * - Perfect spacing and visual hierarchy preserved
 * - Full rounded corners (rounded-t-2xl) for top positioning
 */

"use client"

import { ArrowRight, Check, Star, Play, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// CMS DATA SOURCE: Service data will be provided via props from CMS

interface ServiceFeature {
  feature: string
  included?: boolean
}

interface VideoThumbnailTopCardProps {
  title: string
  description: string
  icon: string
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
  thumbnailUrl: string // Required for this component
  videoUrl?: string
  paymentUrl?: string
}

export function VideoThumbnailTopCard({
  title,
  description,
  icon,
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
  paymentUrl
}: VideoThumbnailTopCardProps) {

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

  const iconContainerClasses = {
    standard: 'w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colours duration-300',
    premium: 'w-16 h-16 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center mb-6 group-hover:from-accent-500 group-hover:to-accent-600 transition-all duration-300 shadow-lg',
    royal: 'w-20 h-20 rounded-full bg-gradient-to-br from-royal-500 to-royal-600 flex items-center justify-center mb-6 group-hover:from-royal-600 group-hover:to-royal-700 transition-all duration-300 shadow-xl ring-4 ring-royal-200'
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

  // Icon emoji to component mapping for better accessibility
  const getIconDisplay = (iconString: string) => {
    const iconSize = variant === 'royal' ? 'text-3xl' : variant === 'premium' ? 'text-2xl' : 'text-xl'
    return (
      <span 
        className={cn('text-white', iconSize)} 
        role="img" 
        aria-label={`${title} service icon`}
      >
        {iconString}
      </span>
    )
  }

  // CONTEXT7 SOURCE: /lucide-icons/lucide - Play and CreditCard icons for video thumbnail functionality
  // VIDEO BUTTON LOGIC: Official Lucide documentation recommends semantic icon usage for user actions
  const isVideoFree = Boolean(videoUrl && !paymentUrl)
  const handleVideoClick = () => {
    if (isVideoFree && videoUrl) {
      // Handle free video playbook
      window.open(videoUrl, '_blank')
    } else if (paymentUrl) {
      // Handle payment flow
      window.open(paymentUrl, '_blank')
    }
  }

  return (
    <div className={cn(containerClasses[variant], className)} role="article">
      
      {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with aspect-video ratio for professional video thumbnails */}
      {/* VIDEO THUMBNAIL SECTION: Official Next.js Image documentation for responsive video thumbnail display */}
      {/* POSITIONING: Thumbnail at TOP of card - this is the defining feature of VideoThumbnailTopCard */}
      <div className="relative group cursor-pointer" onClick={handleVideoClick}>
        <div className="aspect-video relative overflow-hidden rounded-t-2xl">
          <Image
            src={thumbnailUrl}
            alt={`${title} video thumbnail`}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              {isVideoFree ? (
                <>
                  <Play className="w-6 h-6 text-primary-900 fill-current" />
                  <span className="sr-only">Watch Free Video</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-6 h-6 text-primary-900" />
                  <span className="sr-only">Purchase to Watch</span>
                </>
              )}
            </div>
          </div>
          
          {/* Duration Badge - Top Right */}
          {duration && (
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded text-sm font-medium">
              {duration}
            </div>
          )}
          
          {/* Free/Paid Badge - Top Left */}
          <div className="absolute top-4 left-4">
            {isVideoFree ? (
              <Badge className="bg-green-600 text-white border-0 shadow-lg">
                Free
              </Badge>
            ) : (
              <Badge className="bg-accent-500 text-white border-0 shadow-lg">
                {priceRange || 'Premium'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* "Most Popular" Badge - Positioned at top-5 for optimal display (CLIENT APPROVED) */}
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

        {/* Icon */}
        <div className={cn(iconContainerClasses[variant])}>
          {getIconDisplay(icon)}
        </div>

        {/* Title */}
        <h3 className={cn(titleClasses[variant])}>
          {title}
        </h3>

        {/* Description */}
        <p className={cn(descriptionClasses[variant])}>
          {description}
        </p>

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
          className={cn(buttonVariants[variant], 'group')}
          onClick={onCTAClick}
          aria-label={`${ctaText} for ${title}`}
        >
          {ctaText}
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  )
}

// Component variants for storybook/documentation
export type VideoThumbnailTopCardVariant = 'standard' | 'premium' | 'royal'