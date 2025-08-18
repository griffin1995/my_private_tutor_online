"use client"

// CONTEXT7 SOURCE: /facebook/react - React functional components with TypeScript interfaces
// IMPLEMENTATION REASON: Official React documentation patterns for TypeScript component definitions
// CONTEXT7 SOURCE: /grx7/framer-motion - motion.div animation patterns and transition configurations
// ANIMATION REASON: Official Framer Motion documentation for continuous loop animations and motion components
// CONTEXT7 SOURCE: /grx7/framer-motion - Synchronized scroll indicator for unified animation movement
// SYNCHRONIZATION UPGRADE: Using SynchronizedScrollIndicator for perfect text and line animation unity

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SynchronizedScrollIndicator } from '@/components/ui/synchronized-scroll-indicator'

// CONTEXT7 SOURCE: /facebook/react - TypeScript interface definitions for component props
// INTERFACE REASON: Official React TypeScript documentation for proper prop typing
// CONTEXT7 SOURCE: /facebook/react - TypeScript union types for component prop variations
// DECORATIVE VARIATION REASON: Official React TypeScript documentation for defining prop variants
interface SimpleHeroProps {
  backgroundImage: string
  h1: string
  h2: string
  className?: string
  decorativeStyle?: 'lines' | 'dots' | 'none'
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Infinite animation loop patterns and transition timing
// ANIMATION REASON: Official Framer Motion documentation for continuous repeat animations with precise timing
// CONTEXT7 SOURCE: /grx7/framer-motion - Synchronized scroll indicator replaces individual animation variants
// SYNCHRONIZATION UPGRADE: Removing separate animation variants in favor of unified synchronized component
export function SimpleHero({ backgroundImage, h1, h2, className, decorativeStyle = 'lines' }: SimpleHeroProps) {

  return (
    <section
      className={cn(
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full viewport dimensions and positioning
        // VIEWPORT REASON: Official Tailwind CSS documentation for 100vh/100vw full-screen layouts
        "relative h-screen w-screen overflow-hidden",
        className
      )}
      role="banner"
      aria-label="Hero section"
    >
      {/* Background Image with Overlay */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background image positioning and object-fit
      /* BACKGROUND REASON: Official Tailwind CSS documentation for responsive background images */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />
      
      {/* Dark overlay for text readability */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Semi-transparent overlay patterns
      /* OVERLAY REASON: Official Tailwind CSS documentation for creating readable text over images */}
      <div 
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
      />

      {/* Content Container */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox centering and z-index stacking
      /* LAYOUT REASON: Official Tailwind CSS documentation for centering content with proper stacking */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        
        {/* Text Content */}
        <div className="max-w-4xl mx-auto">
          {/* H2 - Extra Small Text with Decorative Elements */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scale and responsive text sizing
          /* TYPOGRAPHY REASON: Official Tailwind CSS documentation for consistent text hierarchy */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox alignment and decorative pseudo-elements
          /* DECORATIVE REASON: Official Tailwind CSS documentation for creating decorative line elements with flexbox */}
          <div className="flex items-center justify-center gap-4 mb-2">
            {/* Left decorative element */}
            {decorativeStyle === 'lines' && (
              <div className="hidden sm:block w-8 md:w-12 h-px bg-white/60" aria-hidden="true" />
            )}
            {decorativeStyle === 'dots' && (
              <div className="hidden sm:flex items-center gap-1" aria-hidden="true">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <div className="w-1 h-1 rounded-full bg-white/40" />
                <div className="w-0.5 h-0.5 rounded-full bg-white/30" />
              </div>
            )}
            
            <h2 className="text-sm md:text-base font-serif text-white/90 tracking-wide uppercase whitespace-nowrap">
              {h2}
            </h2>
            
            {/* Right decorative element */}
            {decorativeStyle === 'lines' && (
              <div className="hidden sm:block w-8 md:w-12 h-px bg-white/60" aria-hidden="true" />
            )}
            {decorativeStyle === 'dots' && (
              <div className="hidden sm:flex items-center gap-1" aria-hidden="true">
                <div className="w-0.5 h-0.5 rounded-full bg-white/30" />
                <div className="w-1 h-1 rounded-full bg-white/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              </div>
            )}
          </div>
          
          {/* H1 - Large Center Text */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Large display text and responsive scaling
          /* HEADING REASON: Official Tailwind CSS documentation for hero heading typography */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Margin spacing utilities for tight text coupling
          /* SPACING REFINEMENT: Official Tailwind CSS documentation for reducing space between related typography elements */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight drop-shadow-lg mt-2">
            {h1}
          </h1>
        </div>

        {/* Synchronized Scroll Indicator */}
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Unified synchronized scroll animation component
        /* SYNCHRONIZATION UPGRADE: Official Framer Motion documentation ensures text and line move as one unit */}
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Perfect animation unity with shared variants
        /* UNIFIED ANIMATION REASON: Synchronized component eliminates animation timing discrepancies between elements */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <SynchronizedScrollIndicator 
            text="SCROLL"
            className="!relative !left-0 !bottom-0 !transform-none [&_span]:!text-white/80 [&_span]:!tracking-widest [&_span]:!uppercase [&_div]:!bg-white/60"
            show={true}
            speed={0.8}
            distance={30}
          />
        </div>
      </div>
    </section>
  )
}

// CONTEXT7 SOURCE: /facebook/react - TypeScript type exports for component reusability
// EXPORT REASON: Official React TypeScript documentation for exporting component types
export type { SimpleHeroProps }