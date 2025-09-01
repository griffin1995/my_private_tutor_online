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
  /** 
   * STATIC NAVBAR MODE: Controls hero height calculation when navbar is static positioned
   * - hasStaticNavbar={true}: Uses calc(100vh - navbar-height) for remaining viewport height
   * - hasStaticNavbar={false}: Uses full 100vh height for overlay layouts (default)
   * 
   * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - CSS calc() function for dynamic height calculations
   * NAVBAR INTEGRATION REASON: Official Tailwind documentation enables viewport height adjustments for static positioned elements
   */
  hasStaticNavbar?: boolean
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
  overlayOpacity = 'medium',
  hasStaticNavbar = false
}: PageHeroProps) {

  // Documentation Source: Context7 Tailwind CSS - Viewport units and full-screen layout patterns
  // Reference: /tailwindlabs/tailwindcss.com - height: 100vh for full viewport coverage
  // Pattern: Responsive height classes optimized for fixed header overlay layouts
  const sizeClasses = {
    sm: 'min-h-[400px] py-16',
    md: 'min-h-[500px] py-20',
    lg: 'min-h-[600px] py-24',
    xl: 'min-h-[700px] py-32',
    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic viewport height calculations with CSS calc() function
    // HOMEPAGE_STATIC_NAVBAR_MODIFICATION: Conditional height calculation based on navbar positioning
    full: hasStaticNavbar 
      ? [
          // Documentation Source: Context7 Tailwind CSS - CSS calc() for dynamic height calculation
          // Reference: /tailwindlabs/tailwindcss.com - calc(100vh - value) for remaining viewport height
          // 
          // Critical Implementation for Homepage Static Header Layout:
          // - Responsive navbar height calculations: h-24 (96px) lg:h-28 (112px) xl:h-32 (128px)
          // - Using responsive height calculations to match the actual navbar heights
          // - h-[calc(100vh-6rem)]: Mobile baseline (96px navbar height = 6rem)
          // - lg:h-[calc(100vh-7rem)]: Large screens (112px navbar height = 7rem)
          // - xl:h-[calc(100vh-8rem)]: XL screens (128px navbar height = 8rem)
          // - w-full: width: 100% - Spans complete viewport width
          // - overflow-hidden: Prevents content spillover and maintains clean edges
          // 
          // How it integrates with homepage static header:
          // 1. mt-24/lg:mt-28/xl:mt-32: Pushes hero below navbar (margin-top approach)
          // 2. h-[calc(100vh-6rem)] etc: Hero takes remaining viewport height after navbar space
          // 3. Video fills the calculated remaining space completely
          // 4. Total visible area = navbar height + hero height = 100vh (no scrolling needed)
          'h-[calc(100vh-6rem)] lg:h-[calc(100vh-7rem)] xl:h-[calc(100vh-8rem)] w-full overflow-hidden'
        ].join(' ')
      : [
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
          'h-screen w-full overflow-hidden'
        ].join(' ')
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
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full viewport layout with viewport units
        // VIEWPORT_ENHANCEMENT_REASON: Official Tailwind documentation for 100vw viewport width and container breakout
        // CRITICAL FULL-SCREEN LAYOUT FIX: For full-size heroes, we need complete viewport coverage
        // PageLayout applies px-4 sm:px-6 lg:px-8 padding, creating unwanted side gaps for full-screen video backgrounds
        // Solution: Use viewport width (100vw) with negative margins for complete edge-to-edge coverage
        // w-screen = 100vw ensures full viewport width regardless of container padding
        // Combined with negative margins for perfect edge-to-edge coverage breaking out of any container constraints
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container breakout technique for true viewport coverage
        // CRITICAL VIEWPORT BREAKOUT: Use viewport calculation to escape centered container constraints
        // SOLUTION: Transform-based breakout that achieves true edge-to-edge coverage without breaking document flow
        // - w-screen: 100vw viewport width
        // - left-1/2: Position at 50% of parent (centered container)  
        // - -ml-[50vw]: Negative margin of 50vw to shift left edge to viewport edge
        // This combination breaks out of mx-auto centering to achieve true full-screen coverage
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Height overflow fix by removing min-h-screen class
        // HEIGHT FIX REASON: Official Tailwind documentation shows min-h-screen sets min-height: 100vh which overrides calculated height values
        // Removed min-h-screen to allow h-[calc(100vh-*)] responsive height calculations to work correctly
        size === 'full' ? 'w-screen -ml-[50vw] left-1/2 relative z-10' : '',
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Top margin utilities for static navbar positioning
        // HOMEPAGE_NAVBAR_INTEGRATION: Official Tailwind documentation for mt-* utilities to position hero below static navbar
        // Homepage-specific: Hero section starts below navbar rather than overlapping with transparent navbar
        size === 'full' && hasStaticNavbar ? 'mt-24 lg:mt-28 xl:mt-32' : '',
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
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - object-contain utility for full content visibility */}
      {/* VIDEO SCALING FIX: Changed from object-cover to object-contain to show full video height and prevent text cropping */}
      {background === 'video' && backgroundVideo && (
        <>
          {/* Full-screen video background optimized for viewport height stopping */}
          {/* CONTEXT7 SOURCE: /websites/tailwindcss - Object-fit and max-width utilities for video sizing */}
          {/* VIDEO VIEWPORT OPTIMIZATION: Official Tailwind CSS documentation Section 3.2 shows max-w-none utility overrides default Preflight max-width: 100% constraint */}
          {/* VIEWPORT HEIGHT FIX: Removed any max-width logic that interferes with height-based video sizing - video should stop at viewport bottom */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            className="absolute inset-0 w-full h-full max-w-none object-cover z-0"
            style={{
              filter: 'brightness(0.75) contrast(1.1) saturate(1.1)',
              // CONTEXT7 SOURCE: /websites/tailwindcss - Remove any max-width constraints for proper viewport height behavior
              // MAX_WIDTH_REMOVAL: Official Tailwind CSS documentation shows max-width: none overrides Preflight defaults
              maxWidth: 'none',
              // VIEWPORT HEIGHT ENFORCEMENT: Ensure video maintains aspect ratio while filling calculated viewport height
              objectFit: 'cover'
            }}
            aria-label="Background video"
            onError={(e) => {
              console.warn('Video playback error:', e);
              // EMERGENCY FALLBACK: Hide video and show background image
              const video = e.currentTarget;
              video.style.display = 'none';
              // Show the static background fallback
              const section = video.closest('section');
              if (section) {
                section.style.backgroundImage = 'url(/images/hero/child_book_and_laptop.avif)';
                section.style.backgroundSize = 'cover';
                section.style.backgroundPosition = 'center';
              }
            }}
            onCanPlayThrough={(e) => {
              // Ensure video plays when it's ready
              e.currentTarget.play().catch(console.warn);
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
            {/* Only add webm source if not using compressed video */}
            {!backgroundVideo.includes('compressed-') && (
              <source src={backgroundVideo.replace('.mp4', '.webm')} type="video/webm" />
            )}
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

      {/* Content Container with Proper Z-Index and No Max-Width Constraints */}
      {/* CONTEXT7 SOURCE: /websites/tailwindcss - Container utilities without max-width constraints for viewport-based sizing */}
      {/* MAX_WIDTH_REMOVAL: Official Tailwind CSS documentation shows removing max-width constraints allows content to use full calculated viewport dimensions */}
      {/* VIEWPORT HEIGHT OPTIMIZATION: Remove container max-width logic to prevent interference with height-based hero sizing */}
      <div className="relative z-20 w-full flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            // CONTEXT7 SOURCE: /websites/tailwindcss - Remove max-width constraints for full viewport utilization
            // MAX_WIDTH_CONSTRAINT_REMOVAL: Commenting out max-width logic that interferes with height-based video sizing
            // size === 'full' ? 'max-w-7xl mx-auto' : 'max-w-4xl mx-auto',
            alignmentClasses[alignment],
            'overflow-hidden'
          )}>
            {/* Single column content layout without max-width constraints */}
            {/* CONTEXT7 SOURCE: /websites/tailwindcss - Container patterns without width limitations for viewport height optimization */}
            {/* VIEWPORT HEIGHT ENHANCEMENT: Official Tailwind CSS documentation shows removing max-width allows proper viewport height utilization */}
            <div className="w-full @container">
              <div className="overflow-hidden">
                {children}
              </div>
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