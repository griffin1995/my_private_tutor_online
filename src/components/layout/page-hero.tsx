"use client"

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
// CMS DATA SOURCE: Context7 MCP - Removed HeroVideoDialog import
// Reference: Custom video modal implementation in individual components
// Pattern: Simplified PageHero without automatic video dialog

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

  // Documentation Source: Context7 Tailwind CSS - Viewport units and full-screen layout patterns
  // Reference: /tailwindlabs/tailwindcss.com - height: 100vh for full viewport coverage
  // Pattern: Responsive height classes optimized for fixed header overlay layouts
  const sizeClasses = {
    sm: 'min-h-[400px] py-16',
    md: 'min-h-[500px] py-20',
    lg: 'min-h-[600px] py-24',
    xl: 'min-h-[700px] py-32',
    // Documentation Source: Context7 Tailwind CSS - Full viewport hero with fixed header integration
    // Reference: /tailwindlabs/tailwindcss.com - h-screen: height: 100vh
    // 
    // Critical Implementation for Fixed Header Layouts:
    // - h-screen: height: 100vh - Takes full viewport height from top to bottom
    // - w-full: width: 100% - Spans complete viewport width
    // - overflow-hidden: Prevents content spillover and maintains clean edges
    // 
    // How it integrates with fixed header:
    // 1. Hero starts at viewport top (y=0) - no gap above hero content  
    // 2. Fixed header overlays transparently on top of hero
    // 3. Hero content is positioned to be visible under transparent header
    // 4. When user scrolls, header becomes opaque for readability
    // 
    // This eliminates the white space gap issue because:
    // - No vertical offset or margin pushing hero down
    // - Header doesn't affect document flow (position: fixed)
    // - Hero immediately fills viewport from top edge
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
            {/* Single column content layout - no automatic video dialog */}
            {/* CMS DATA SOURCE: Context7 MCP - Simplified PageHero layout */}
            {/* Reference: Single column design for custom video modal implementations */}
            {/* Pattern: Clean content container without automatic video components */}
            <div className="w-full">
              {children}
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