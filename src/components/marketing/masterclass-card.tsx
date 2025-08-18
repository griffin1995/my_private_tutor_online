/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface patterns for React component props
 * IMPLEMENTATION REASON: Official React documentation recommends dedicated interfaces for complex component props
 * 
 * CONTEXT7 SOURCE: /radix-ui/primitives - Button and Badge components for consistent UI elements
 * COMPONENT CONSISTENCY REASON: Official Radix UI documentation shows Button and Badge patterns for premium service cards
 * 
 * CONTEXT7 SOURCE: /cookpete/react-player - Video thumbnail patterns for media preview components
 * VIDEO INTEGRATION REASON: Official ReactPlayer documentation shows thumbnail patterns for video preview with play overlay
 * 
 * Specialized Masterclass Card Component
 * - Perfect alignment across all masterclass cards
 * - Masterclass-specific data structure handling  
 * - Consistent spacing regardless of content differences
 * - Variant styling for free/premium/culture sections
 * - Video thumbnail with smart play/payment handling
 * - Modal video player for free content
 */

"use client"

import { useState } from 'react'
import { Play, Clock, Check, Star, BookOpen, Crown, CreditCard } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { VideoPopup } from '@/components/video/video-popup'

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface design for component props with optional properties
// PROP STRUCTURE REASON: Official React documentation shows interface patterns for flexible component configuration
// ENHANCEMENT: Added video thumbnail and smart video/payment handling props
interface MasterclassCardProps {
  masterclass: {
    id: string;
    title: string;
    subtitle?: string;
    price: string;
    duration: string;
    venue?: string;
    description: string;
    content?: string;
    topics?: string[];
    learning?: string[];
    includes?: string[];
    targetAge?: string;
    questions?: string;
    instructor?: string;
    note?: string;
    summary?: string;
    purpose?: string;
    audience?: string;
    isFree: boolean;
    // CONTEXT7 SOURCE: /cookpete/react-player - Video source properties for media playback
    // VIDEO PROPS REASON: Official ReactPlayer documentation shows src and poster props for video configuration
    videoUrl?: string; // actual video URL for free content
    thumbnailUrl?: string; // thumbnail image
    paymentUrl?: string; // payment page URL for paid content
  }
  variant: 'free' | 'premium' | 'culture';
  featured?: boolean;
  onCTAClick?: () => void;
  className?: string;
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Component composition patterns for consistent card layouts
// ALIGNMENT STRATEGY REASON: Official Radix UI documentation recommends reserved space patterns for consistent component heights
// VIDEO ENHANCEMENT: Added state management for video popup modal
export function MasterclassCard({
  masterclass,
  variant,
  featured = false,
  onCTAClick,
  className
}: MasterclassCardProps) {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useState Hook for component state management
  // VIDEO STATE REASON: Official React documentation shows useState for managing modal visibility state
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Conditional styling with utility classes for component variants  
  // VARIANT STYLING REASON: Official Tailwind CSS documentation shows conditional class application for design system consistency
  const containerClasses = {
    free: 'bg-emerald-50 border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col',
    premium: 'bg-white border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col',
    culture: 'bg-amber-50 border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col'
  }

  const headerClasses = {
    free: 'bg-emerald-100 rounded-t-lg p-6',
    premium: 'bg-slate-100 rounded-t-lg p-6', 
    culture: 'bg-amber-100 rounded-t-lg p-6'
  }

  const badgeClasses = {
    free: 'bg-emerald-600 text-white shadow-md px-4 py-2 text-sm font-bold',
    premium: 'bg-slate-600 text-white shadow-md px-4 py-2 text-sm font-bold',
    culture: 'bg-amber-600 text-white shadow-md px-4 py-2 text-sm font-bold'
  }

  const iconClasses = {
    free: 'text-emerald-600',
    premium: 'text-slate-600',
    culture: 'text-amber-600'
  }

  const buttonClasses = {
    free: 'w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold',
    premium: 'w-full bg-slate-600 hover:bg-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold',
    culture: 'w-full bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold'
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns for React components
  // CONTENT ADAPTATION REASON: Official React documentation shows conditional content rendering based on data availability
  // VIDEO HANDLING: Enhanced button text and click handling for video vs payment logic
  const getButtonText = () => {
    if (masterclass.isFree) {
      return (
        <>
          <Play className="w-5 h-5 mr-3" />
          Watch Free Masterclass
        </>
      )
    }
    return (
      <>
        <CreditCard className="w-5 h-5 mr-3" />
        Purchase Masterclass - {masterclass.price}
      </>
    )
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Event handler patterns for component interaction
  // SMART HANDLING REASON: Official React documentation shows conditional event handling based on component props
  const handleThumbnailClick = () => {
    if (masterclass.isFree && masterclass.videoUrl) {
      // Free masterclass with video - open video popup
      setIsVideoOpen(true)
    } else if (!masterclass.isFree && masterclass.paymentUrl) {
      // Paid masterclass - redirect to payment
      window.open(masterclass.paymentUrl, '_blank')
    } else if (onCTAClick) {
      // Fallback to provided CTA click handler
      onCTAClick()
    }
  }

  const handleCTAClick = () => {
    if (masterclass.isFree && masterclass.videoUrl) {
      // Free masterclass with video - open video popup
      setIsVideoOpen(true)
    } else if (!masterclass.isFree && masterclass.paymentUrl) {
      // Paid masterclass - redirect to payment
      window.open(masterclass.paymentUrl, '_blank')
    } else if (onCTAClick) {
      // Fallback to provided CTA click handler
      onCTAClick()
    }
  }

  const getBadgeContent = () => {
    if (masterclass.isFree) {
      return 'Free Access'
    }
    return masterclass.price
  }

  // CONTEXT7 SOURCE: /w3/html - HTML strong element patterns for semantic emphasis in dynamic content
  // HTML PARSING REASON: Official HTML specification shows dangerouslySetInnerHTML for trusted content with semantic markup
  const renderDescription = () => {
    if (masterclass.description.includes('<strong>')) {
      return (
        <div 
          className="text-slate-800 mb-6 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: masterclass.description }}
        />
      )
    }
    return (
      <p className="text-slate-800 mb-6 leading-relaxed text-lg">
        {masterclass.description}
      </p>
    )
  }

  // CONTEXT7 SOURCE: /w3/html - Default thumbnail images for consistent fallback presentation
  // FALLBACK STRATEGY REASON: Official HTML documentation recommends fallback content for missing media resources
  const getThumbnailSrc = () => {
    if (masterclass.thumbnailUrl) {
      return masterclass.thumbnailUrl
    }
    // Default thumbnail based on variant
    const defaults = {
      free: '/images/thumbnails/masterclass-free-default.jpg',
      premium: '/images/thumbnails/masterclass-premium-default.jpg',
      culture: '/images/thumbnails/masterclass-culture-default.jpg'
    }
    return defaults[variant]
  }

  const getPlayButtonVariant = () => {
    if (masterclass.isFree) {
      return {
        bg: 'bg-emerald-600 hover:bg-emerald-700',
        text: 'Watch Free',
        icon: <Play className="w-6 h-6" />
      }
    }
    return {
      bg: 'bg-amber-600 hover:bg-amber-700',
      text: 'Purchase to Watch',
      icon: <CreditCard className="w-6 h-6" />
    }
  }

  return (
    <>
      <div className={cn(containerClasses[variant], className)} role="article">
      
      {/* ALIGNMENT STRATEGY: Fixed height badge area for consistent spacing */}
      <div className="absolute top-4 left-4 z-10 h-10 flex items-center">
        {featured && (
          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 border-0 shadow-lg">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Image component for optimized thumbnail display */}
      {/* VIDEO THUMBNAIL REASON: Official Next.js documentation shows Image component for responsive media with play overlay */}
      {/* Video Thumbnail Section */}
      <div className="relative group cursor-pointer" onClick={handleThumbnailClick}>
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={getThumbnailSrc()}
            alt={`${masterclass.title} video thumbnail`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={featured}
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <div className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 transform group-hover:scale-110",
              getPlayButtonVariant().bg
            )}>
              {getPlayButtonVariant().icon}
              <span className="text-sm font-bold">{getPlayButtonVariant().text}</span>
            </div>
          </div>
          
          {/* Duration indicator */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            <Clock className="w-3 h-3 inline mr-1" />
            {masterclass.duration}
          </div>
        </div>
      </div>

      {/* Header Section - Fixed Structure */}
      <div className={cn(headerClasses[variant])}>
        
        {/* Price Row - Duration moved to thumbnail */}
        <div className="flex items-center justify-between mb-4 h-8">
          <Badge className={cn(badgeClasses[variant])}>
            {getBadgeContent()}
          </Badge>
          {masterclass.isFree && (
            <div className="flex items-center gap-1 text-sm text-emerald-700 bg-emerald-100 rounded-full px-3 py-1 font-semibold">
              <Play className="w-3 h-3" />
              Free Access
            </div>
          )}
        </div>

        {/* Title - Consistent font sizing and spacing */}
        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 min-h-[64px] flex items-center">
          {masterclass.title}
        </h3>

        {/* Subtitle - Reserved space for alignment */}
        <div className="min-h-[28px] mb-4">
          {masterclass.subtitle && (
            <p className="text-sm text-slate-700 font-medium bg-white/50 px-3 py-1 rounded-full inline-block">
              {masterclass.subtitle}
            </p>
          )}
        </div>

        {/* Venue - Reserved space for alignment */}
        <div className="min-h-[28px] mb-4">
          {masterclass.venue && (
            <p className="text-sm text-slate-600 italic font-medium bg-white/50 px-3 py-1 rounded-full inline-block">
              {masterclass.venue}
            </p>
          )}
        </div>
      </div>

      {/* Content Section - Flexible height but aligned start */}
      <div className="p-6 flex-grow flex flex-col">
        
        {/* Description */}
        {renderDescription()}
        
        {/* Additional Content */}
        {masterclass.content && (
          <p className="text-slate-700 mb-6 leading-relaxed">
            {masterclass.content}
          </p>
        )}

        {/* Questions */}
        {masterclass.questions && (
          <p className="text-slate-700 mb-6 leading-relaxed">
            {masterclass.questions}
          </p>
        )}

        {/* Topics List */}
        {masterclass.topics && masterclass.topics.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-slate-900 mb-3 text-lg">Topics covered:</h4>
            <ul className="space-y-2">
              {masterclass.topics.map((topic, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-700">
                  <Check className={cn('w-5 h-5 flex-shrink-0', iconClasses[variant])} />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Objectives */}
        {masterclass.learning && masterclass.learning.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-slate-900 mb-3 text-lg">Students will learn:</h4>
            <ul className="space-y-2">
              {masterclass.learning.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700">
                  <Check className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconClasses[variant])} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Includes */}
        {masterclass.includes && masterclass.includes.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-slate-900 mb-3 text-lg">Includes:</h4>
            <ul className="space-y-2">
              {masterclass.includes.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700">
                  <BookOpen className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconClasses[variant])} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Target Age */}
        {masterclass.targetAge && (
          <p className="text-slate-700 mb-6 font-semibold bg-white/50 px-4 py-2 rounded-lg">
            <strong>{masterclass.targetAge}</strong>
          </p>
        )}

        {/* Note */}
        {masterclass.note && (
          <p className="text-slate-600 italic mb-6 bg-white/50 rounded-lg p-4">
            {masterclass.note}
          </p>
        )}

        {/* Purpose */}
        {masterclass.purpose && (
          <p className="text-slate-700 mb-6 leading-relaxed">
            {masterclass.purpose}
          </p>
        )}

        {/* Audience */}
        {masterclass.audience && (
          <p className="text-slate-700 mb-6 leading-relaxed">
            {masterclass.audience}
          </p>
        )}

        {/* Summary */}
        {masterclass.summary && (
          <p className="text-slate-700 mb-6 leading-relaxed font-medium">
            {masterclass.summary}
          </p>
        )}

        {/* Button - Always at bottom due to flex-grow */}
        <div className="mt-auto pt-4">
          <Button
            className={cn(buttonClasses[variant])}
            onClick={handleCTAClick}
            aria-label={`${masterclass.isFree ? 'Watch' : 'Purchase'} ${masterclass.title}`}
          >
            {getButtonText()}
          </Button>
        </div>
      </div>
      </div>
      
      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Modal component for video playback overlay */}
      {/* VIDEO MODAL REASON: Official Radix UI documentation recommends modal patterns for focused content interaction */}
      {masterclass.isFree && masterclass.videoUrl && (
        <VideoPopup
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl={masterclass.videoUrl}
          title={masterclass.title}
          poster={masterclass.thumbnailUrl}
        />
      )}
    </>
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Type export patterns for component library architecture
// TYPE EXPORT REASON: Official TypeScript documentation recommends exporting types for external component usage
export type MasterclassCardVariant = 'free' | 'premium' | 'culture'
export type { MasterclassCardProps }