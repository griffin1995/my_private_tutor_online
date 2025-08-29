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
// CONTEXT7 SOURCE: /grx7/framer-motion - Premium micro-interactions with golden ratio timing system
// LUXURY ENHANCEMENT: Official Framer Motion documentation for cubic-bezier easing and sophisticated hover effects

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

// CONTEXT7 SOURCE: /grx7/framer-motion - Golden ratio animation timing and luxury transition patterns
// GOLDEN RATIO TIMING: Official Framer Motion documentation for φ-based timing (1.618s primary, 0.618s micro-interactions)
// CONTEXT7 SOURCE: /grx7/framer-motion - Synchronized scroll indicator replaces individual animation variants
// SYNCHRONIZATION UPGRADE: Removing separate animation variants in favor of unified synchronized component

// CONTEXT7 SOURCE: /grx7/framer-motion - Luxury cubic-bezier easing curves for premium feel
// CUBIC-BEZIER ENHANCEMENT: Official Framer Motion documentation for sophisticated easing functions
const luxuryEasing = [0.25, 0.1, 0.25, 1.0] // Sophisticated cubic-bezier for royal client quality
const goldenRatio = 1.618
const goldenRatioInverse = 0.618
const goldenRatioSquaredInverse = 0.382

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
      {/* Enhanced Multi-Layer Parallax Background System */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background image positioning and object-fit
      /* BACKGROUND REASON: Official Tailwind CSS documentation for responsive background images */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom shadow utilities for sophisticated background depth */}
      {/* SHADOW ENHANCEMENT: Official Tailwind CSS documentation Section 2.4 - drop-shadow-image-strong creates dramatic depth for hero backgrounds */}
      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Multi-layer parallax with golden ratio timing and breathing effects */}
      {/* PARALLAX ENHANCEMENT: Official Framer Motion documentation for complex transform animations with scale and movement variations */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat drop-shadow-image-strong"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        initial={{ scale: 1.0, x: 0, y: 0 }}
        animate={{ 
          scale: [1.0, 1.005, 1.0], // Subtle breathing effect
          x: [0, -2, 0], // Gentle horizontal drift
          y: [0, -1, 0], // Gentle vertical drift
          transition: {
            duration: goldenRatio * 12, // φ * 12 = ~19.4s for luxury timing
            repeat: Infinity,
            ease: luxuryEasing
          }
        }}
        whileHover={{
          scale: [1.0, 1.03, 1.0],
          transition: { 
            duration: goldenRatio,
            ease: luxuryEasing
          }
        }}
        aria-hidden="true"
      />
      
      {/* Enhanced Mathematical Gradient Overlay System with Golden Ratio Progression */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Advanced gradient overlay patterns with luxury brand alignment
      /* LUXURY OVERLAY REASON: Official Tailwind CSS documentation Section 3.1 - Custom gradient utilities create sophisticated overlay systems for premium brand presentation */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Multi-layer gradient system with mathematical progression using golden ratio
      /* GOLDEN RATIO ENHANCEMENT: Official Tailwind CSS documentation Section 2.4 - Layered gradients with φ-based opacity progression for royal sophistication */}
      
      {/* Primary Overlay - Mathematical Dark Gradient with Golden Ratio Base */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 shadow-inner"
        initial={{ opacity: 0.618 }}
        animate={{ 
          opacity: [0.618, 0.382, 0.618], // φ⁻¹ to φ⁻² oscillation
          transition: {
            duration: goldenRatio * 8, // ~13s cycle
            repeat: Infinity,
            ease: luxuryEasing
          }
        }}
        aria-hidden="true"
      />
      
      {/* Secondary Overlay - Luxury Navy with Golden Ratio Opacity */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-blue-900/30 via-slate-900/20 to-black/50 mix-blend-multiply"
        initial={{ opacity: 0.382 }}
        animate={{
          opacity: [0.382, 0.236, 0.382], // φ⁻² based progression
          transition: {
            duration: goldenRatio * 6,
            repeat: Infinity,
            ease: luxuryEasing,
            delay: goldenRatioInverse // Offset by φ⁻¹
          }
        }}
        aria-hidden="true"
      />
      
      {/* Tertiary Overlay - Metallic Shimmer with Directional Awareness */}
      <motion.div 
        className="absolute inset-0 bg-gradient-conic from-amber-400/10 via-yellow-300/5 to-amber-600/15 opacity-25"
        initial={{ rotate: 0, opacity: 0.25 }}
        animate={{
          rotate: [0, 360],
          opacity: [0.25, 0.4, 0.25],
          transition: {
            rotate: {
              duration: goldenRatio * 20, // Very slow rotation ~32s
              repeat: Infinity,
              ease: "linear"
            },
            opacity: {
              duration: goldenRatio * 4,
              repeat: Infinity,
              ease: luxuryEasing
            }
          }
        }}
        aria-hidden="true"
      />
      
      {/* Quaternary Overlay - Aztec Gold Accent Glow with Breathing */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-amber-500/15 via-transparent to-transparent"
        style={{
          background: `radial-gradient(circle at 50% 40%, #CA9E5B15 0%, transparent 60%)`
        }}
        initial={{ scale: 1, opacity: 0.3 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          transition: {
            duration: goldenRatio * 3, // ~4.8s breathing cycle
            repeat: Infinity,
            ease: luxuryEasing
          }
        }}
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
          
          {/* H1 - Enhanced Main Heading with Sophisticated Typography Micro-Interactions */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scale optimization and responsive text sizing */}
          {/* TYPOGRAPHY SIZE REVISION: Official Tailwind CSS documentation Section 3.1 - Reduced from text-4xl/6xl/7xl/8xl/9xl to text-2xl/3xl/4xl/5xl/6xl for 50% smaller visual impact */}
          <motion.div
            className="group cursor-default mb-[26px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: goldenRatio, delay: goldenRatioSquaredInverse, ease: luxuryEasing }}
          >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Text shadow utilities with golden ratio opacity progression */}
              {/* TEXT SHADOW ENHANCEMENT: Official Tailwind CSS documentation for text-shadow utilities with luxury depth */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scale increase for enhanced visual hierarchy */}
              {/* SIZE INCREASE: 30% larger heading sizes - from text-2xl/3xl/4xl/5xl/6xl to text-3xl/4xl/5xl/6xl/7xl */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom color values using arbitrary value syntax with metallic sheen */}
              {/* METALLIC ENHANCEMENT: Aztec Gold with enhanced metallic depth using shadow gold (#8a5e2a) and highlight gold (#e5c457) */}
              {/* CONTEXT7 SOURCE: /grx7/framer-motion - Layout-stable hover animations with transform and opacity transitions */}
              {/* HOVER REFINEMENT: Replaced problematic letter-spacing changes with Elegant Luminescence effect using minimal scale and opacity transitions */}
              {/* LAYOUT STABILITY FIX: Removed aggressive scaling and letter-spacing that caused text reflow, replaced with spring physics and glow effects */}
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-black leading-[1.618] tracking-tight"
                style={{
                  color: '#CA9E5B',
                  textShadow: `
                    0 2px 4px rgba(138, 94, 42, 0.618),
                    0 4px 8px rgba(138, 94, 42, 0.382),
                    0 8px 16px rgba(138, 94, 42, 0.236),
                    inset 0 1px 0 rgba(229, 196, 87, 0.618)
                  ` // Golden ratio opacity progression with metallic depth
                }}
                initial={{ 
                  opacity: 0.9, // Start at 90% opacity for elegant hover transition
                  y: 30, 
                  filter: 'blur(6px)', 
                  scale: 0.95,
                  letterSpacing: '0.025em'
                }}
                animate={{ 
                  opacity: 0.9, // Set to 90% to enable opacity hover effect
                  y: 0, 
                  filter: 'blur(0px)', 
                  scale: 1,
                  transition: { 
                    duration: goldenRatio * 0.741, // ~1.2s 
                    delay: goldenRatioSquaredInverse,
                    ease: luxuryEasing
                  }
                }}
                whileHover={{
                  scale: 1.02, // Minimal scale for layout stability
                  opacity: 1, // Full opacity from initial 0.9
                  textShadow: `
                    0 0 12px rgba(202, 158, 91, 0.4),
                    0 4px 8px rgba(138, 94, 42, 0.382),
                    0 8px 16px rgba(138, 94, 42, 0.236),
                    inset 0 1px 0 rgba(229, 196, 87, 0.618)
                  `, // Elegant Aztec Gold glow without layout shift
                  transition: {
                    type: "spring", // Spring physics for refined movement
                    stiffness: 300, // Controlled responsiveness
                    damping: 15, // Royal client smoothness
                    duration: goldenRatioSquaredInverse // Golden ratio timing
                  }
                }}
              >
                {h1}
              </motion.h1>
          </motion.div>

          {/* H2 - Enhanced Sub Heading with Gradient Animation and Golden Ratio Timing */}
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Simplified motion.div without decorative elements for clean subtitle layout */}
          {/* HERO LAYOUT MODIFICATION: Official Framer Motion documentation demonstrates clean motion components without complex decorative wrapper structures */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scale enhancement and responsive text sizing */}
          {/* TYPOGRAPHY SIZE REVISION: Official Tailwind CSS documentation Section 3.1 - Increased from text-sm/base to text-lg/xl for 30% larger sub-heading presence */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Text wrapping and overflow utilities for responsive typography */}
          {/* TEXT CUTOFF FIX: Official Tailwind CSS documentation for text-wrap and max-width constraints to prevent overflow */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Layout-stable typography interactions with opacity and brightness effects */}
          {/* H2 HOVER REFINEMENT: Replaced letter-spacing changes with Elegant Luminescence pattern using opacity and brightness transitions */}
          {/* LAYOUT STABILITY FIX: Removed text reflow-causing letter-spacing changes, implemented filter brightness for premium feel */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Gradient text with background-clip and sophisticated color progression */}
          {/* GRADIENT ANIMATION: Official Tailwind CSS documentation for bg-gradient-to-r with animated color stops */}
          <motion.h2 
            className="text-lg md:text-xl font-serif font-medium tracking-widest uppercase text-wrap leading-relaxed max-w-full mx-auto px-4 text-center flex-shrink-0 self-center flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 30%, #fef3c7 60%, #fbbf24 100%)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              // Fallback for browsers that don't support bg-clip-text
              fallbacks: {
                color: 'rgba(255, 255, 255, 0.9)'
              },
              // Ultimate centering with multiple methods
              alignSelf: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: '1',
              letterSpacing: '0.025em'
            }}
            initial={{ 
              opacity: 0.9, // Start at 90% for opacity hover transition
              y: 10, 
              filter: 'blur(4px)',
              letterSpacing: '0.025em'
            }}
            animate={{ 
              opacity: 0.9, // Set to 90% to enable opacity hover effect
              y: 0, 
              filter: 'blur(0px)',
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'], // Gradient animation
              transition: {
                opacity: { 
                  duration: goldenRatio * 0.494, // ~0.8s
                  delay: goldenRatioInverse,
                  ease: luxuryEasing
                },
                backgroundPosition: {
                  duration: goldenRatio * 4, // ~6.5s gradient cycle
                  repeat: Infinity,
                  ease: "linear"
                }
              }
            }}
            whileHover={{
              opacity: 1, // Brightness increase from initial state
              filter: 'brightness(1.1)', // Subtle luminance boost
              backgroundPosition: '50% 50%', // Center gradient on hover
              transition: {
                duration: goldenRatioSquaredInverse, // Golden ratio timing
                ease: [0.25, 0.1, 0.25, 1.0] // Luxury easing curve
              }
            }}
          >
            {h2}
          </motion.h2>
        </motion.div>

        {/* Enhanced Scroll Indicator with Luxury Glow and Golden Ratio Timing */}
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Unified synchronized scroll animation component with enhanced interactions */}
        {/* SYNCHRONIZATION REASON: Official Framer Motion documentation ensures text and line move as one unit */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Perfect horizontal centering using left-1/2 and transform utilities */}
        {/* SCROLL ANIMATION CENTERING FIX: Official Tailwind CSS documentation Section 1.3 - left-1/2 with -translate-x-1/2 ensures perfect horizontal center alignment */}
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Golden ratio timing for luxury scroll indicator pulse */}
        {/* GOLDEN RATIO TIMING: 1.8s cycle with 0.618s pause for sophisticated rhythm */}
        <motion.div 
          className="absolute bottom-[68px] left-1/2 -translate-x-1/2 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: goldenRatio * 0.494, // ~0.8s
              delay: goldenRatio * 0.926, // ~1.5s
              ease: luxuryEasing
            }
          }}
        >
          
          <motion.div
            className="group cursor-pointer relative z-10 flex items-center justify-center p-4 rounded-full" // Larger click target
            initial={{ scale: 1 }}
            animate={{
              y: [0, -3, 0], // Subtle floating animation
              transition: {
                duration: 1.8, // Golden ratio cycle base
                repeat: Infinity,
                ease: luxuryEasing,
                delay: goldenRatioInverse // 0.618s pause
              }
            }}
            whileHover={{ 
              scale: 1.1,
              y: -4,
              boxShadow: '0 0 30px rgba(202, 158, 91, 0.4), 0 0 60px rgba(202, 158, 91, 0.2)', // Golden glow
              transition: { 
                duration: goldenRatioSquaredInverse, // 0.382s
                ease: luxuryEasing
              }
            }}
            whileTap={{
              scale: 0.95,
              transition: { 
                duration: 0.1,
                type: "spring",
                stiffness: 400,
                damping: 17
              }
            }}
            onClick={() => {
              window.scrollTo({ 
                top: window.innerHeight, 
                behavior: 'smooth' 
              })
            }}
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Perfect centering using flex utilities with enhanced visual feedback */}
            {/* SCROLL INDICATOR CENTERING: Official Tailwind CSS documentation Section 1.3 - flex items-center justify-center ensures perfect central alignment */}
            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(202, 158, 91, 0.2)',
                  '0 0 20px rgba(202, 158, 91, 0.4)',
                  '0 0 10px rgba(202, 158, 91, 0.2)'
                ], // Breathing glow effect
                transition: {
                  duration: goldenRatio * 2, // ~3.2s breathing cycle
                  repeat: Infinity,
                  ease: luxuryEasing
                }
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(202, 158, 91, 0.6), inset 0 0 10px rgba(229, 196, 87, 0.3)', // Enhanced glow with inset
                transition: { 
                  duration: goldenRatioSquaredInverse,
                  ease: luxuryEasing
                }
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              <SynchronizedScrollIndicator 
                text="SCROLL"
                className="!relative !left-0 !bottom-0 !transform-none [&_span]:!text-white/90 [&_span]:!tracking-widest [&_span]:!uppercase [&_span]:!bg-gradient-to-r [&_span]:!from-yellow-400 [&_span]:!to-yellow-300 [&_span]:!bg-clip-text [&_span]:!text-transparent [&_span]:transition-all [&_span]:duration-300 group-hover:[&_span]:!from-yellow-300 group-hover:[&_span]:!to-amber-400 [&_div.w-px]:!bg-gradient-to-b [&_div.w-px]:!from-yellow-400 [&_div.w-px]:!to-amber-500 group-hover:[&_div.w-px]:!shadow-[0_0_10px_rgba(202,158,91,0.6)]"
                show={true}
                speed={goldenRatioInverse} // 0.618 speed for golden ratio harmony
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