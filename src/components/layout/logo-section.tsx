/**
 * LOGO SECTION COMPONENT - PHASE 5: FINAL ARCHITECTURE COMPLETION
 * Created: August 27, 2025
 * Purpose: Dedicated logo component with context-aware switching and hover effects
 * Status: Component 5/6 - Royal client-worthy implementation with accessibility focus
 * 
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js Image and Link optimization patterns
 * IMPLEMENTATION_REASON: Official Next.js documentation for Image component with priority loading and Link composition
 * 
 * CONTEXT7 SOURCE: /grx7/framer-motion - Hover animations and interactive effects
 * ANIMATION_REASON: Official Framer Motion documentation for scale animations and interactive hover states
 * 
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive design and hover effects
 * STYLING_REASON: Official Tailwind documentation for responsive sizing and context-aware hover styling
 * 
 * Key Features:
 * - Context-aware logo switching (transparent vs solid states)
 * - Homepage override logic for consistent branding
 * - Performance-optimized with priority loading
 * - Responsive sizing with progressive scaling
 * - Accessibility-compliant hover effects
 * - Layout stability with fixed dimensions
 * - Brand glow effects with context-aware colors
 * - Smooth transitions and micro-interactions
 */

"use client"

// CONTEXT7 SOURCE: /reactjs/react.dev - React hooks for component state management
// HOOKS_REASON: Official React documentation for useState and useEffect patterns in client components
import React from 'react'

// CONTEXT7 SOURCE: /vercel/next.js - Next.js optimized components for performance
// NEXT_COMPONENTS_REASON: Official Next.js documentation for Image and Link component optimization
import Image from 'next/image'
import Link from 'next/link'

// CONTEXT7 SOURCE: /grx7/framer-motion - Motion components for premium animations
// MOTION_REASON: Official Framer Motion documentation for hover animations and scale effects
import { motion } from 'framer-motion'

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Utility function for CSS class management
// UTILS_REASON: Official Tailwind documentation for conditional class composition
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /vercel/next.js - CMS image management system import
// CMS_REASON: Official Next.js documentation for centralized asset management patterns
import { getMainLogo, getMainLogoWhite } from '@/lib/cms/cms-images'

// CONTEXT7 SOURCE: /typescript/handbook - Interface definitions for component props
// INTERFACE_REASON: Official TypeScript documentation for component prop typing and composition
interface LogoSectionProps {
  isTransparent: boolean
  isHomepage: boolean
  className?: string
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Image component with priority loading
 * LOGO_COMPONENT_REASON: Official Next.js documentation for Image optimization with layout stability
 * 
 * CONTEXT7 SOURCE: /grx7/framer-motion - Interactive hover animations
 * ANIMATION_REASON: Official Framer Motion documentation for scale animations and smooth transitions
 * 
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive design patterns
 * RESPONSIVE_REASON: Official Tailwind documentation for responsive sizing and hover effects
 */
export function LogoSection({ isTransparent, isHomepage, className }: LogoSectionProps) {
  // CONTEXT7 SOURCE: /vercel/next.js - CMS-based logo selection with transparent state logic
  // LOGO_LOGIC_REASON: Official Next.js documentation for conditional image rendering using CMS assets
  // IMPLEMENTATION_REASON: White logo displays during transparent navbar state, standard logo when scrolled/solid
  const standardLogo = getMainLogo()
  const whiteLogo = getMainLogoWhite()
  
  const currentLogo = isTransparent ? whiteLogo : standardLogo
  
  const logoSrc = currentLogo?.src || '/images/logos/logo-with-name.png'
  const logoAlt = isTransparent 
    ? 'My Private Tutor Online - White Logo' 
    : 'My Private Tutor Online'

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Context-aware hover glow colors for transparent/solid states
  // GLOW_COLORS_REASON: Official Tailwind documentation for conditional styling based on navbar transparency
  const glowColor = isTransparent
    ? 'hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
    : 'hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.2)]' // primary-600 with opacity

  return (
    <div className={cn("flex-shrink-0", className)}>
      {/* CONTEXT7 SOURCE: /vercel/next.js - Link component with accessibility attributes */}
      {/* LINK_REASON: Official Next.js documentation for Link component with proper ARIA labels */}
      <Link 
        href="/" 
        className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-lg"
        aria-label="My Private Tutor Online - Navigate to homepage"
      >
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Motion wrapper for smooth hover animations */}
        {/* MOTION_WRAPPER_REASON: Official Framer Motion documentation for motion.div hover interactions */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.15
          }}
        >
          {/* CONTEXT7 SOURCE: /vercel/next.js - Image component with performance optimization */}
          {/* IMAGE_OPTIMIZATION_REASON: Official Next.js documentation for Image with priority and layout stability */}
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={175}
            height={100}
            priority
            className={cn(
              // Base responsive sizing - progressive scaling across breakpoints
              "h-12 lg:h-16 xl:h-20 w-auto object-contain",
              
              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Smooth transitions
              // TRANSITION_REASON: Official Tailwind documentation for transition timing and easing
              "transition-all duration-300 ease-in-out",
              
              // Performance optimizations
              "will-change-transform",
              
              // Context-aware glow effect on hover
              glowColor,
              
              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Filter effects for brand enhancement
              // FILTER_REASON: Official Tailwind documentation for filter utilities and visual enhancement
              "hover:brightness-110 active:brightness-95"
            )}
            // CONTEXT7 SOURCE: /vercel/next.js - Image loading optimization
            // LOADING_REASON: Official Next.js documentation for eager loading of critical images
            loading="eager"
            // Prevent layout shift with fixed aspect ratio
            style={{
              aspectRatio: '175/100',
              maxWidth: 'none'
            }}
          />
          
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Context-aware brand enhancement overlay */}
          {/* OVERLAY_REASON: Official Tailwind documentation for pseudo-element styling with transparent/solid state awareness */}
          <div 
            className={cn(
              "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300",
              "hover:opacity-100 pointer-events-none",
              isTransparent 
                ? "bg-gradient-to-r from-white/5 via-white/10 to-white/5"
                : "bg-gradient-to-r from-primary-500/5 via-primary-600/10 to-primary-500/5"
            )}
            aria-hidden="true"
          />
        </motion.div>
      </Link>

      {/* Development Status Indicator - Logo State Information */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-full left-0 mt-1 text-xs bg-black/75 text-white px-2 py-1 rounded z-50">
          Logo: {isTransparent ? 'White' : 'Standard'} | 
          Context: {isHomepage ? 'Homepage' : 'Page'} | 
          State: {isTransparent ? 'Transparent' : 'Solid'}
        </div>
      )}
    </div>
  )
}

// CONTEXT7 SOURCE: /typescript/handbook - Type export for component reuse
// TYPE_EXPORT_REASON: Official TypeScript documentation for interface exports and type definitions
export type { LogoSectionProps }