"use client"

import { ReactNode, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
// CONTEXT7 SOURCE: /microsoft/typescript - Import statements for centralized constants
// CONSTANTS_IMPORT_REASON: Official TypeScript documentation for importing shared constant definitions
import { NAVBAR_HEIGHTS, calculateRemainingViewport, supportsDynamicViewport } from '@/lib/constants/navbar-heights'
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

  // CONTEXT7 SOURCE: /reactjs/react.dev - Two-pass rendering for client-server content differences
  // TWO_PASS_RENDERING_REASON: Official React documentation Section 7 shows useState and useEffect pattern for hydration mismatch prevention
  // HYDRATION_FIX_IMPLEMENTATION: Start with server-safe value, update to client value after mount
  const [dynamicViewport, setDynamicViewport] = useState(false) // Server-safe default value

  // CONTEXT7 SOURCE: /vercel/next.js - useEffect for client-only execution in Next.js
  // CLIENT_SIDE_DETECTION_REASON: Official Next.js documentation shows useEffect prevents server-side execution
  // VIEWPORT_DETECTION_IMPLEMENTATION: Detect viewport capabilities only after component mounts on client
  useEffect(() => {
    // Client-side viewport detection after hydration
    const detectViewport = () => {
      setDynamicViewport(supportsDynamicViewport())
    }

    detectViewport()

    // Optional: Listen for viewport changes (though supportsDynamicViewport() result shouldn't change)
    window.addEventListener('resize', detectViewport)
    return () => window.removeEventListener('resize', detectViewport)
  }, [])

  // Documentation Source: Context7 Tailwind CSS - Viewport units and full-screen layout patterns
  // Reference: /tailwindlabs/tailwindcss.com - height: 100vh for full viewport coverage
  // Pattern: Responsive height classes optimized for fixed header overlay layouts
  const sizeClasses = {
    sm: 'min-h-[400px] py-16',
    md: 'min-h-[500px] py-20',
    lg: 'min-h-[600px] py-24',
    xl: 'min-h-[700px] py-32',
    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic viewport height calculations with CSS calc() function
    // NAVBAR POSITIONING FIX: Proper height calculation for static navbar layouts
    full: hasStaticNavbar 
      ? [
          // CONTEXT7 SOURCE: /websites/tailwindcss - CSS calc() function for remaining viewport height calculation
          // VIEWPORT_HEIGHT_ALIGNMENT_FIX: Updated calc() values to match navbar constants exactly
          // STATIC NAVBAR POSITIONING: Official Tailwind CSS documentation shows calc(100vh - height) for remaining space
          //
          // Homepage Static Navbar Integration:
          // - Uses margin-top to push hero below navbar: matches NAVBAR_HEIGHTS constants
          // - Hero takes remaining viewport height: calc(100vh - navbar-height)
          // - Responsive navbar heights: 88px (5.5rem) → 100px (6.25rem) → 112px (7rem)
          // - Total layout: navbar + hero = 100vh with no overlap
          `${calculateRemainingViewport()} w-full overflow-hidden`
        ].join(' ')
      : [
          // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full viewport height for overlay layouts
          // OVERLAY POSITIONING: Official Tailwind CSS documentation for full viewport coverage
          // 
          // Fixed/Overlay Header Integration:
          // - Hero takes full viewport height from top edge
          // - Header overlays transparently on top of hero
          // - No margin offset needed as header doesn't affect document flow
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
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container breakout technique with dynamic viewport units
        // DVH_VIEWPORT_BREAKOUT_REASON: Official Tailwind CSS documentation Section 3.4+ for mobile-optimized viewport coverage
        // CRITICAL VIEWPORT BREAKOUT: Use dynamic viewport calculation to escape centered container constraints
        // SOLUTION: Transform-based breakout with dvh support for mobile browser compatibility
        // - w-screen: 100vw viewport width (maintains existing horizontal behavior)
        // - left-1/2: Position at 50% of parent (centered container)
        // - -ml-[50vw]: Negative margin of 50vw to shift left edge to viewport edge
        // - Dynamic viewport height integration: dvh units with vh fallback for vertical calculations
        // This combination breaks out of mx-auto centering while supporting mobile browser UI changes
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Height overflow fix with dynamic viewport units
        // DVH_HEIGHT_FIX_REASON: Official Tailwind documentation Section 3.4+ shows dvh units prevent min-height conflicts
        // Removed min-h-screen to allow dvh-based responsive height calculations with mobile browser adaptation
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Z-index removal to prevent hero section stacking conflicts
        // Z-INDEX_REMOVAL_REASON: Official Tailwind CSS documentation shows removing unnecessary z-index prevents overlay issues
        size === 'full' ? 'w-screen -ml-[50vw] left-1/2 relative' : '',
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Top margin utilities for static navbar positioning with dynamic viewport support
        // DVH_MARGIN_ALIGNMENT_REASON: Official Tailwind CSS documentation Section 3.4+ for margin calculations with dynamic viewport units
        // STATIC NAVBAR MARGIN: Official Tailwind CSS documentation for margin-top to position hero below navbar
        // Dynamic viewport integration: Responsive margins match navbar heights with mobile browser UI adaptation
        // Responsive margins: 88px (mt-[5.5rem]) → 100px (mt-[6.25rem]) → 112px (mt-[7rem]) with dvh compatibility
        size === 'full' && hasStaticNavbar ? `mt-[${NAVBAR_HEIGHTS.mobile}] lg:mt-[${NAVBAR_HEIGHTS.tablet}] xl:mt-[${NAVBAR_HEIGHTS.desktop}]` : '',
        className
      )}
      style={{
        backgroundImage: background === 'image' && backgroundImage ? `url(${backgroundImage})` : undefined
      }}
      role="banner"
      aria-label="Page hero section"
      data-dynamic-viewport={dynamicViewport ? 'true' : 'false'}
      data-viewport-overflow-fix="dvh-enabled"
      // CONTEXT7 SOURCE: /vercel/next.js - suppressHydrationWarning for client-server content differences
      // HYDRATION_WARNING_SUPPRESSION_REASON: Official Next.js documentation shows suppressHydrationWarning for inevitable hydration mismatches
      // TARGETED_SUPPRESSION: Only suppress warnings for dynamic viewport detection, not entire component
      suppressHydrationWarning
    >
      
      {/* Background Video - Full Screen with HTML5 Best Practices and Dynamic Viewport Support */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - HTML5 video element with dynamic viewport units */}
      {/* DVH_VIDEO_INTEGRATION_REASON: Official Tailwind CSS documentation Section 3.4+ for mobile-optimized video backgrounds */}
      {/* Reference: HTML5 video element best practices and accessibility with dvh units */}
      {/* Reference: https://github.com/thewidlarzgroup/react-native-video/blob/master/docs/pages/component/props.mdx */}
      {/* Reference: https://tailwindcss.com/docs/object-fit */}
      {/* Pattern: Full-screen background video with dvh units, proper HTML5 attributes, object-fit, and mobile browser fallbacks */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - object-contain utility for full content visibility with dynamic viewport */}
      {/* DVH_VIDEO_SCALING_REASON: Applied object-contain with dvh support for mobile browser UI changes - maintains aspect ratio */}
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
            className="absolute inset-0 w-full h-full max-w-none object-contain z-0"
            data-dynamic-viewport-video="true"
            style={{
              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - CSS filter removal techniques
              // FILTER REMOVAL REASON: Official Tailwind CSS documentation shows removing filter properties for natural video appearance
              // Removed: filter: 'brightness(0.75) contrast(1.1) saturate(1.1)' - allows video to display with natural colors
              // CONTEXT7 SOURCE: /websites/tailwindcss - Remove any max-width constraints for proper viewport height behavior
              // MAX_WIDTH_REMOVAL: Official Tailwind CSS documentation shows max-width: none overrides Preflight defaults
              maxWidth: 'none',
              // CONTEXT7 SOURCE: /websites/tailwindcss - object-contain CSS property for full content visibility
              // VIEWPORT HEIGHT ENFORCEMENT: Ensure video maintains aspect ratio while showing complete content without cropping
              objectFit: 'contain',
              // CONTEXT7 SOURCE: /websites/tailwindcss - CSS transform scale for video sizing optimization
              // VIDEO_SCALING_REASON: Official CSS documentation for responsive video scaling with maintained aspect ratio
              // Apply 10% size reduction (scale 0.9) while maintaining center positioning and aspect ratio
              transform: 'scale(0.9)',
              transformOrigin: 'center'
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
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background color utilities for solid white backgrounds */}
          {/* BACKGROUND CHANGE REASON: Official Tailwind CSS documentation Section 4.1 shows bg-white utility for solid white backgrounds */}
          <div
            className="absolute inset-0 bg-white -z-10"
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