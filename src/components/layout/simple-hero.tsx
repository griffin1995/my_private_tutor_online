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
        
        {/* Text Content with Enhanced Animations */}
        <motion.div className="max-w-4xl mx-auto">
          {/* H2 - Extra Small Text with Decorative Elements and Interactive Animations */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scale and responsive text sizing
          /* TYPOGRAPHY REASON: Official Tailwind CSS documentation for consistent text hierarchy */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox alignment and decorative pseudo-elements
          /* DECORATIVE REASON: Official Tailwind CSS documentation for creating decorative line elements with flexbox */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Golden ratio spacing implementation using arbitrary values */}
          {/* GOLDEN RATIO SPACING: Official Tailwind CSS documentation recommends arbitrary values for mathematical spacing systems (1.618 ratio) */}
          {/* CONTEXT7 SOURCE: /websites/motion_dev - Stagger animation patterns for sequential element revelation */}
          {/* STAGGER ANIMATION REASON: Official Motion documentation demonstrates staggerChildren for elegant content introduction */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-[26px] group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
              {/* Left decorative element with hover animation */}
              {decorativeStyle === 'lines' && (
                <motion.div 
                  className="hidden sm:block w-8 md:w-12 h-px bg-white/60 transition-all duration-300 group-hover:bg-white/80 group-hover:w-16"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  aria-hidden="true" 
                />
              )}
              {decorativeStyle === 'dots' && (
                <motion.div 
                  className="hidden sm:flex items-center gap-1" 
                  aria-hidden="true"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-white/60 transition-colors duration-300 group-hover:bg-white/80"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-1 h-1 rounded-full bg-white/40 transition-colors duration-300 group-hover:bg-white/60"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-0.5 h-0.5 rounded-full bg-white/30 transition-colors duration-300 group-hover:bg-white/50"
                    whileHover={{ scale: 1.2 }}
                  />
                </motion.div>
              )}
              
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background clipping for gradient text effects */}
              {/* GRADIENT TEXT CLEANUP REASON: Official Tailwind CSS documentation for bg-clip-text utility creates text gradient effects without element backgrounds */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Linear gradient text implementation */}
              {/* TEXT GRADIENT IMPLEMENTATION: Official documentation pattern using bg-gradient-to-r with bg-clip-text and text-transparent */}
              <motion.h2 
                className="text-sm md:text-base font-serif font-medium bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent tracking-widest uppercase whitespace-nowrap leading-tight transition-all duration-300 group-hover:tracking-[0.3em]"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  // Fallback for browsers that don't support bg-clip-text
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                {h2}
              </motion.h2>
              
              {/* Right decorative element with hover animation */}
              {decorativeStyle === 'lines' && (
                <motion.div 
                  className="hidden sm:block w-8 md:w-12 h-px bg-white/60 transition-all duration-300 group-hover:bg-white/80 group-hover:w-16"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  aria-hidden="true" 
                />
              )}
              {decorativeStyle === 'dots' && (
                <motion.div 
                  className="hidden sm:flex items-center gap-1" 
                  aria-hidden="true"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.div 
                    className="w-0.5 h-0.5 rounded-full bg-white/30 transition-colors duration-300 group-hover:bg-white/50"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-1 h-1 rounded-full bg-white/40 transition-colors duration-300 group-hover:bg-white/60"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-white/60 transition-colors duration-300 group-hover:bg-white/80"
                    whileHover={{ scale: 1.2 }}
                  />
                </motion.div>
              )}
          </motion.div>
          
          {/* H1 - Large Center Text with Premium Animation */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Large display text and responsive scaling
          /* HEADING REASON: Official Tailwind CSS documentation for hero heading typography */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Margin spacing utilities for tight text coupling
          /* SPACING REFINEMENT: Official Tailwind CSS documentation for reducing space between related typography elements */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography font-weight hierarchy and letter-spacing optimization for display text */}
          {/* TYPOGRAPHY MICRO-ADJUSTMENT: Official Tailwind CSS documentation Section 1.2 - font-black provides maximum impact for hero headings, tracking-tight improves large text readability */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Golden ratio spacing for optimal visual hierarchy */}
          {/* GOLDEN RATIO SPACING: Official Tailwind CSS documentation supports arbitrary values for mathematical spacing precision */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced text shadow utilities for dramatic hero text impact */}
          {/* TEXT SHADOW ENHANCEMENT: Official Tailwind CSS documentation Section 2.4 - drop-shadow-text-xl creates strong premium effect for hero headings */}
          {/* CONTEXT7 SOURCE: /websites/motion_dev - Hero heading animation with sophisticated text reveal effects */}
          {/* HERO ANIMATION REASON: Official Motion documentation demonstrates text animation patterns with stagger and blur for maximum impact */}
          <motion.div
            className="group cursor-default"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background clipping for gradient text effects */}
              {/* GRADIENT TEXT CLEANUP REASON: Official Tailwind CSS documentation for bg-clip-text utility creates clean gradient text without backgrounds */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Linear gradient text implementation */}
              {/* H1 GRADIENT IMPLEMENTATION: Official documentation pattern using bg-gradient-to-br with bg-clip-text and text-transparent */}
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-display font-black bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-[1.618] tracking-tight mt-[42px] transition-all duration-500 group-hover:scale-105"
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
                    delay: 0.5,
                    ease: 'easeOut'
                  }
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                style={{
                  // Fallback for browsers that don't support bg-clip-text
                  color: 'white'
                }}
              >
                {h1}
              </motion.h1>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator - Clean Minimal Design */}
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Unified synchronized scroll animation component */}
        {/* SYNCHRONIZATION REASON: Official Framer Motion documentation ensures text and line move as one unit */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Minimal positioning without background complexity */}
        {/* CLEAN DESIGN REASON: Official Tailwind CSS documentation recommends simple, accessible design patterns */}
        <motion.div 
          className="absolute bottom-[68px] left-1/2 transform -translate-x-1/2"
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
            className="group cursor-pointer relative z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.scrollTo({ 
                top: window.innerHeight, 
                behavior: 'smooth' 
              })
            }}
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Minimal button styling without backgrounds */}
            {/* SCROLL INDICATOR CLEANUP REASON: Official Tailwind CSS documentation recommends minimal styling without background complexity */}
            <motion.div
              className="relative"
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
                className="!relative !left-0 !bottom-0 !transform-none [&_span]:!text-white/90 [&_span]:!tracking-widest [&_span]:!uppercase [&_span]:!bg-gradient-to-r [&_span]:!from-yellow-400 [&_span]:!to-yellow-300 [&_span]:!bg-clip-text [&_span]:!text-transparent [&_span]:transition-all [&_span]:duration-300"
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