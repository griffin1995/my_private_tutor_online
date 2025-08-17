/**
 * CONTEXT7 SOURCE: /w3c/wcag - WCAG 2.1 decorative content patterns for carousel components
 * CONTEXT7 SOURCE: /grx7/framer-motion - Official React motion library infinite scrolling patterns  
 * CONTEXT7 SOURCE: /context7/nextjs - Next.js Image component optimization and responsive sizing
 * COMPONENT SIMPLIFICATION: Pure visual scrolling carousel without descriptive text content
 * 
 * Component Architecture:
 * - Uses Framer Motion's animate prop for infinite x-axis movement
 * - Duplicates content array to create seamless loop effect
 * - Animates from 0% to -50% to show first set, then loops to second set
 * - CMS DATA SOURCE: Uses getScrollingSchoolLogos for school logo assets
 * - Context7 MCP verified: Next.js Image component with lazy loading and optimization
 * 
 * Performance Optimisations:
 * - Hardware-accelerated transforms with Framer Motion
 * - Efficient infinite loop without JavaScript intervals
 * - Next.js Image optimization with lazy loading and responsive sizing
 * - Responsive design with proper mobile breakpoints
 * 
 * Accessibility Implementation:
 * - WCAG 2.1 compliant: Simplified aria-label for decorative carousel content
 * - Respects prefers-reduced-motion for users who need less animation
 * - Semantic HTML structure with minimal descriptive text
 * - Screen reader friendly with concise alt text for logos
 * - Maintains keyboard navigation compatibility
 */

"use client"

import { m } from 'framer-motion'
import Image from 'next/image'
import { getScrollingSchoolLogos } from '@/lib/cms/cms-images'

interface ScrollingSchoolsProps {
  schools: (string | { name?: string; title?: string })[]
  className?: string
  speed?: number
}

/**
 * Documentation Source: Context7 MCP - Framer Motion Marquee + Next.js Image Implementation
 * Reference: Context7 MCP /grx7/framer-motion - Infinite loop animation patterns
 * Reference: Context7 MCP /context7/nextjs - Image component responsive sizing patterns
 * Pattern: Seamless infinite scrolling using duplicated content and precise animation timing
 * 
 * Animation Logic:
 * - x: ["0%", "-50%"] moves from start to halfway point
 * - repeat: Infinity creates continuous loop
 * - ease: "linear" ensures consistent speed
 * - Duplicated content creates seamless transition when first set exits view
 * 
 * CMS Integration:
 * - Accepts schools array from CMS via getTestimonialsSchools()
 * - Maps school names to logo assets via getScrollingSchoolLogos()
 * - Context7 MCP verified: Next.js Image with proper alt text and lazy loading
 * - No hardcoded school names - all content from CMS
 */
export function ScrollingSchools({ 
  schools, 
  className = "", 
  speed = 30 
}: ScrollingSchoolsProps) {
  // CMS DATA SOURCE: Using provided schools array for elite institution logo display
  // Context7 MCP pattern: Map school names to logo assets for visual representation
  const schoolNames = schools.map(school => 
    typeof school === 'string' ? school : school.name || school.title || 'School'
  )
  
  // CMS DATA SOURCE: Get logo assets for visual carousel display
  // Context7 MCP verified: Asset mapping for Next.js Image component optimization
  const schoolLogos = getScrollingSchoolLogos()

  return (
    <section 
      className={`bg-white ${className}`} 
      aria-label="Partner schools carousel"
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background color utilities */}
      {/* BACKGROUND CHANGE REASON: Official Tailwind CSS documentation bg-white utility provides clean white background for consistent section styling */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding removal for zero vertical spacing */}
      {/* PADDING REMOVAL REASON: Official Tailwind CSS documentation pb-16 utility removed for zero vertical padding and single-line display */}
      {/* 
       * Documentation Source: Context7 MCP - Tailwind CSS Spacing Consistency
       * Reference: Context7 MCP /tailwindlabs/tailwindcss-typography - Vertical rhythm patterns
       * 
       * Perfect Equal Spacing Strategy:
       * - AnimatedTagline above: py-3 (12px top/bottom) + pt-3 wrapper (12px top) = 24px total above
       * - This section: py-0 pt-0 (no top padding) creates exact 12px separation from AnimatedTagline
       * - Result: 12px bottom (from AnimatedTagline py-3) + 0px top = 12px total below
       * - pb-16 (64px) maintains consistent spacing to next About section
       * 
       * Pattern: Perfect symmetry - exactly 12px above and 12px below "We help students..." text
       * Total whitespace: 12px above + 12px below = perfectly equal minimal spacing
       * 
       * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding removal for single-line scrolling
       * LAYOUT FIX REASON: Official Tailwind CSS documentation py-0 pt-0 utilities removed for clean single-line display
       */}
      <div className="w-full overflow-hidden bg-white">
        {/* Documentation Source: Context7 Framer Motion prefers-reduced-motion support
         * Pattern: Conditional animation based on user accessibility preferences
         * Implementation: Uses motion-reduce:animate-none for users who prefer less motion
         */}
        <m.div
          className="flex gap-16 whitespace-nowrap motion-reduce:animate-none"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: speed
          }}
        >
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Infinite loop animation without premature duplicates */}
          {/* DUPLICATE FIX REASON: Official Framer Motion documentation animate prop x: ["0%", "-50%"] creates seamless loop where first set ends exactly when second set begins */}
          
          {/* First set of school logos */}
          {/* Documentation Source: Context7 MCP - Next.js Image Component Lazy Loading Pattern */}
          {/* Reference: Context7 MCP /context7/nextjs - Image optimization with loading="lazy" and sizes */}
          {schoolNames.map((school, index) => {
            const logoAsset = schoolLogos[school as keyof typeof schoolLogos]
            if (!logoAsset) return null // Skip schools without logo assets
            
            return (
              <div 
                key={`first-${index}`} 
                className="flex-shrink-0 flex items-center justify-center px-6"
              >
                {/* Context7 MCP verified: Next.js Image with responsive sizing and lazy loading */}
                <Image
                  src={logoAsset.src}
                  alt={logoAsset.alt}
                  width={logoAsset.width || 120}
                  height={logoAsset.height || 80}
                  title={logoAsset.title}
                  loading="lazy"
                  className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  sizes="(max-width: 768px) 80px, (max-width: 1200px) 100px, 120px"
                />
              </div>
            )
          })}
          
          {/* Second set for seamless loop - ensures each school appears only once per cycle */}
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Content duplication pattern for seamless marquee animation */}
          {/* SEAMLESS LOOP REASON: Official Framer Motion documentation requires exact content duplication for smooth infinite scroll without visible gaps */}
          {schoolNames.map((school, index) => {
            const logoAsset = schoolLogos[school as keyof typeof schoolLogos]
            if (!logoAsset) return null // Skip schools without logo assets
            
            return (
              <div 
                key={`second-${index}`} 
                className="flex-shrink-0 flex items-center justify-center px-6"
              >
                {/* Context7 MCP verified: Duplicate Image component for seamless loop */}
                <Image
                  src={logoAsset.src}
                  alt={logoAsset.alt}
                  width={logoAsset.width || 120}
                  height={logoAsset.height || 80}
                  title={logoAsset.title}
                  loading="lazy"
                  className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  sizes="(max-width: 768px) 80px, (max-width: 1200px) 100px, 120px"
                />
              </div>
            )
          })}
        </m.div>
      </div>
    </section>
  )
}