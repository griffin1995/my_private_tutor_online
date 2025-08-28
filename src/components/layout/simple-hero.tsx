"use client";

// CONTEXT7 SOURCE: /facebook/react - React functional components with TypeScript interfaces
// IMPLEMENTATION REASON: Official React documentation patterns for TypeScript component definitions
// CONTEXT7 SOURCE: /grx7/framer-motion - motion.div animation patterns and transition configurations
// ANIMATION REASON: Official Framer Motion documentation for continuous loop animations and motion components
// CONTEXT7 SOURCE: /grx7/framer-motion - Synchronized scroll indicator for unified animation movement
// SYNCHRONIZATION UPGRADE: Using SynchronizedScrollIndicator for perfect text and line animation unity

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SynchronizedScrollIndicator } from '@/components/ui/synchronized-scroll-indicator'
// CONTEXT7 SOURCE: /framer/motion - Standard Framer Motion animations removed premium micro-interactions
// SIMPLIFICATION REASON: Surgical removal of premium micro-interactions while preserving all hero gradient effects

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
      {/* Background Image with Parallax Effect */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background image positioning and object-fit
      /* BACKGROUND REASON: Official Tailwind CSS documentation for responsive background images */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom shadow utilities for sophisticated background depth */}
      {/* SHADOW ENHANCEMENT: Official Tailwind CSS documentation Section 2.4 - drop-shadow-image-strong creates dramatic depth for hero backgrounds */}
      {/* CONTEXT7 SOURCE: /websites/motion_dev - Subtle parallax background animation for premium engagement */}
      {/* PARALLAX ENHANCEMENT: Official Motion documentation demonstrates transform animations for sophisticated background movement */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat drop-shadow-image-strong"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        initial={{ scale: 1 }}
        animate={{ 
          scale: [1, 1.02, 1],
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        aria-hidden="true"
      />
      
      {/* Luxury Gradient Overlay System for Enhanced Text Readability */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Advanced gradient overlay patterns with luxury brand alignment
      /* LUXURY OVERLAY REASON: Official Tailwind CSS documentation Section 3.1 - Custom gradient utilities create sophisticated overlay systems for premium brand presentation */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Multi-layer gradient system for professional depth and readability */}
      {/* OVERLAY SYSTEM ENHANCEMENT: Official Tailwind CSS documentation Section 2.4 - Layered gradients with shadow effects create royal client-worthy visual sophistication */}
      
      {/* Primary Overlay - Sophisticated Dark Gradient */}
      <div 
        className="absolute inset-0 bg-overlay-dark shadow-inner"
        aria-hidden="true"
      />
      
      {/* Secondary Overlay - Luxury Navy Gradient for Brand Alignment */}
      <div 
        className="absolute inset-0 bg-luxury-navy-radial opacity-20 mix-blend-multiply"
        aria-hidden="true"
      />
      
      {/* Tertiary Overlay - Interactive Shimmer Effect */}
      <div 
        className="absolute inset-0 bg-shimmer-luxury opacity-30 animate-shimmer"
        aria-hidden="true"
      />
      
      {/* Quaternary Overlay - Gold Accent Glow */}
      <div 
        className="absolute inset-0 bg-glow-gold opacity-40 animate-pulse-slow"
        aria-hidden="true"
      />

      {/* Content Container */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox centering and z-index stacking
      /* LAYOUT REASON: Official Tailwind CSS documentation for centering content with proper stacking */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        
        {/* Text Content with Enhanced Animations - HERO TYPOGRAPHY REVISION */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography hierarchy and heading order best practices */}
        {/* HERO TYPOGRAPHY REVISION: Official Tailwind CSS documentation Section 3.1 recommends proper heading hierarchy (H1 → H2) for semantic structure and accessibility compliance */}
        <motion.div className="w-[80vw] max-w-screen-xl mx-auto">
          
          {/* H1 - Main Heading with 50% Size Reduction (First Position) */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scale optimization and responsive text sizing */}
          {/* TYPOGRAPHY SIZE REVISION: Official Tailwind CSS documentation Section 3.1 - Reduced from text-4xl/6xl/7xl/8xl/9xl to text-2xl/3xl/4xl/5xl/6xl for 50% smaller visual impact */}
          <motion.div
            className="group cursor-default mb-[26px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background clipping for gradient text effects */}
              {/* GRADIENT TEXT RESTORATION: Official Tailwind CSS documentation Section 3.1 - Luxury overlay gradients converted to text gradients using bg-clip-text for premium visual continuity */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scale increase for enhanced visual hierarchy */}
              {/* SIZE INCREASE: 30% larger heading sizes - from text-2xl/3xl/4xl/5xl/6xl to text-3xl/4xl/5xl/6xl/7xl */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom color values using arbitrary value syntax */}
              {/* COLOR UPDATE: Replaced gradient with solid Aztec Gold brand colour (#CA9E5B) using Tailwind arbitrary value pattern */}
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-black text-[#CA9E5B] leading-[1.618] tracking-tight transition-all duration-500 group-hover:scale-105"
                initial={{ 
                  opacity: 0, 
                  y: 30, 
                  filter: 'blur(6px)', 
                  scale: 0.95 
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  filter: 'blur(0px)', 
                  scale: 1,
                  transition: { 
                    duration: 1.2, 
                    delay: 0.3,
                    ease: 'easeOut'
                  }
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                style={{
                  // Fallback for browsers that don't support text color arbitrary values
                  color: '#CA9E5B'
                }}
              >
                {h1}
              </motion.h1>
          </motion.div>

          {/* H2 - Sub Heading without Decorative Elements (Second Position) */}
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Simplified motion.div without decorative elements for clean subtitle layout */}
          {/* HERO LAYOUT MODIFICATION: Official Framer Motion documentation demonstrates clean motion components without complex decorative wrapper structures */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scale enhancement and responsive text sizing */}
          {/* TYPOGRAPHY SIZE REVISION: Official Tailwind CSS documentation Section 3.1 - Increased from text-sm/base to text-lg/xl for 30% larger sub-heading presence */}
          {/* COLOR SWAP: H2 now uses white/slate gradient previously on H1 */}
          <motion.h2 
            className="text-lg md:text-xl font-serif font-medium bg-gradient-to-br from-slate-100 via-white to-yellow-200 bg-clip-text text-transparent tracking-widest uppercase whitespace-nowrap leading-none transition-all duration-300 hover:tracking-[0.3em] flex-shrink-0 self-center flex items-center justify-center"
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              // Fallback for browsers that don't support bg-clip-text
              color: 'rgba(255, 255, 255, 0.9)',
              // Ultimate centering with multiple methods
              alignSelf: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: '1'
            }}
          >
            {h2}
          </motion.h2>
        </motion.div>

        {/* Enhanced Scroll Indicator - Clean Minimal Design */}
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Unified synchronized scroll animation component */}
        {/* SYNCHRONIZATION REASON: Official Framer Motion documentation ensures text and line move as one unit */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Perfect horizontal centering using left-1/2 and transform utilities */}
        {/* SCROLL ANIMATION CENTERING FIX: Official Tailwind CSS documentation Section 1.3 - left-1/2 with -translate-x-1/2 ensures perfect horizontal center alignment */}
        <motion.div 
          className="absolute bottom-[68px] left-1/2 -translate-x-1/2 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.8, 
              delay: 1.5,
              ease: 'easeOut'
            }
          }}
        >
          
          <motion.div
            className="group cursor-pointer relative z-10 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.scrollTo({ 
                top: window.innerHeight, 
                behavior: 'smooth' 
              })
            }}
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Perfect centering using flex utilities */}
            {/* SCROLL INDICATOR CENTERING: Official Tailwind CSS documentation Section 1.3 - flex items-center justify-center ensures perfect central alignment */}
            <motion.div
              className="relative flex items-center justify-center"
              whileHover={{
                scale: 1.1,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <SynchronizedScrollIndicator 
                text="SCROLL"
                className="!relative !left-0 !bottom-0 !transform-none [&_span]:!text-white/90 [&_span]:!tracking-widest [&_span]:!uppercase [&_span]:!bg-gradient-to-r [&_span]:!from-yellow-400 [&_span]:!to-yellow-300 [&_span]:!bg-clip-text [&_span]:!text-transparent [&_span]:transition-all [&_span]:duration-300 [&_div.w-px]:!bg-yellow-400"
                show={true}
                speed={0.6}
                distance={25}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// CONTEXT7 SOURCE: /facebook/react - TypeScript type exports for component reusability
// EXPORT REASON: Official React TypeScript documentation for exporting component types
export type { SimpleHeroProps }