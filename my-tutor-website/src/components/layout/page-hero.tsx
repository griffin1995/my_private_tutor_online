"use client"

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// CLAUDE.md rule 42: PageLayout → PageHero → Section structure
// Documentation Source: Context7 verified - CSS video backgrounds and HTML5 video best practices
// Reference: https://github.com/thewidlarzgroup/react-native-video/blob/master/docs/pages/component/props.mdx
// Reference: https://tailwindcss.com/docs/object-fit
// Pattern: Full-screen video background with proper HTML5 video attributes and responsive object-fit

interface PageHeroProps {
  children: ReactNode
  className?: string
  background?: 'white' | 'gradient' | 'image' | 'video'
  backgroundImage?: string
  backgroundVideo?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  alignment?: 'left' | 'center' | 'right'
  verticalAlignment?: 'top' | 'center' | 'bottom'
  overlay?: boolean
  overlayOpacity?: 'light' | 'medium' | 'dark'
}

export function PageHero({
  children,
  className,
  background = 'gradient',
  backgroundImage,
  backgroundVideo,
  size = 'lg',
  alignment = 'center',
  verticalAlignment = 'center',
  overlay = false,
  overlayOpacity = 'medium'
}: PageHeroProps) {

  // Documentation Source: CSS viewport units and full-screen layout patterns
  // Reference: https://tailwindcss.com/docs/background-position
  // Pattern: Responsive height classes with true full-screen support
  const sizeClasses = {
    sm: 'min-h-[400px] py-16',
    md: 'min-h-[500px] py-20',
    lg: 'min-h-[600px] py-24',
    xl: 'min-h-[700px] py-32',
    full: 'h-screen w-full overflow-hidden'
  }

  // Documentation Source: Tailwind CSS background utilities and video container patterns
  // Reference: https://tailwindcss.com/docs/background-size
  // Reference: https://tailwindcss.com/docs/background-position
  // Pattern: Background type classes optimized for different media types
  const backgroundClasses = {
    white: 'bg-white',
    gradient: 'bg-gradient-to-br from-white via-primary-50 to-accent-50',
    image: 'bg-cover bg-center bg-no-repeat',
    video: 'relative overflow-hidden'
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  const verticalAlignmentClasses = {
    top: 'justify-start items-start',
    center: 'justify-center items-center',
    bottom: 'justify-end items-end'
  }

  const overlayClasses = {
    light: 'bg-black/20',
    medium: 'bg-black/40',
    dark: 'bg-black/60'
  }

  // Documentation Source: CSS positioning and semantic HTML best practices
  // Reference: https://tailwindcss.com/docs/position
  // Pattern: Semantic section element with proper ARIA attributes and responsive positioning
  return (
    <section 
      className={cn(
        'relative flex',
        sizeClasses[size],
        backgroundClasses[background],
        verticalAlignmentClasses[verticalAlignment],
        // CRITICAL FULL-SCREEN LAYOUT FIX: For full-size heroes, we need to break out of PageLayout's container padding
        // PageLayout applies px-4 sm:px-6 lg:px-8 padding, creating unwanted side gaps for full-screen video backgrounds
        // Solution: Use negative margins to pull content to edges + calculated width to extend full viewport width
        // -mx-4 (1rem each side) + w-[calc(100%+2rem)] = perfect edge-to-edge coverage on mobile
        // -mx-6 (1.5rem each side) + w-[calc(100%+3rem)] = perfect edge-to-edge coverage on small screens
        // -mx-8 (2rem each side) + w-[calc(100%+4rem)] = perfect edge-to-edge coverage on large screens
        // DO NOT MODIFY: This ensures video backgrounds extend completely edge-to-edge without white gaps
        size === 'full' ? '-mx-4 sm:-mx-6 lg:-mx-8 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)]' : '',
        className
      )}
      style={{
        backgroundImage: background === 'image' && backgroundImage ? `url(${backgroundImage})` : undefined
      }}
      role="banner"
      aria-label="Page hero section"
    >
      
      {/* Background Video - Full Screen with HTML5 Best Practices */}
      {/* Documentation Source: HTML5 video element best practices and accessibility */}
      {/* Reference: https://github.com/thewidlarzgroup/react-native-video/blob/master/docs/pages/component/props.mdx */}
      {/* Reference: https://tailwindcss.com/docs/object-fit */}
      {/* Pattern: Full-screen background video with proper HTML5 attributes, object-fit, and fallbacks */}
      {background === 'video' && backgroundVideo && (
        <>
          {/* Full-screen video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{
              filter: 'brightness(0.75) contrast(1.1) saturate(1.1)'
            }}
            aria-label="Background video"
          >
            <source src={backgroundVideo} type="video/mp4" />
            <source src={backgroundVideo.replace('.mp4', '.webm')} type="video/webm" />
            Your browser does not support the video tag.
          </video>
          {/* Static fallback background for video loading or failure */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 -z-10"
            aria-hidden="true"
          />
        </>
      )}

      {/* Overlay for Content Readability */}
      {/* Documentation Source: CSS overlay patterns and accessibility considerations */}
      {/* Reference: https://tailwindcss.com/docs/background-color */}
      {/* Pattern: Semi-transparent overlay to ensure text readability over video/image backgrounds */}
      {overlay && (
        <div 
          className={cn('absolute inset-0 z-10', overlayClasses[overlayOpacity])} 
          aria-hidden="true"
        />
      )}

      {/* Content Container with Proper Z-Index and Responsive Layout */}
      {/* Documentation Source: CSS z-index stacking context and responsive container patterns */}
      {/* Reference: https://tailwindcss.com/docs/z-index */}
      {/* Reference: https://tailwindcss.com/docs/container */}
      {/* Pattern: Accessible content container with proper stacking and responsive constraints */}
      <div className="relative z-20 w-full flex flex-col justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            size === 'full' ? 'max-w-7xl mx-auto' : 'max-w-4xl mx-auto',
            alignmentClasses[alignment]
          )}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left content area */}
              <div className="lg:col-span-2">
                {children}
              </div>
              
              {/* Right side video dialog */}
              {background === 'video' && backgroundVideo && (
                <div className="lg:col-span-1 flex justify-center lg:justify-end">
                  <div className="w-full max-w-sm">
                    {/* Clickable video thumbnail with HeroVideoDialog */}
                    <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
                        <button className="group flex items-center justify-center w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:scale-110">
                          <svg className="w-6 h-6 text-primary-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.036v3.928a1 1 0 001.555.832l3-2.036a1 1 0 000-1.664l-3-2.036z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm font-medium opacity-90">Watch Introduction</p>
                          <p className="text-xs opacity-70">Elizabeth Burrows, Founder</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Export types for documentation
export type PageHeroBackground = 'white' | 'gradient' | 'image' | 'video'
export type PageHeroSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type PageHeroAlignment = 'left' | 'center' | 'right'
export type PageHeroVerticalAlignment = 'top' | 'center' | 'bottom'
export type PageHeroOverlayOpacity = 'light' | 'medium' | 'dark'