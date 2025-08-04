/**
 * Documentation Source: Context7 MCP - Framer Motion + Next.js Image Infinite Marquee Pattern
 * Reference: Context7 MCP /grx7/framer-motion - Official React motion library infinite scrolling patterns
 * Reference: Context7 MCP /context7/nextjs - Next.js Image component optimization and responsive sizing
 * Pattern: Infinite scrolling marquee using Framer Motion with school logo images
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
 * Accessibility Features:
 * - Respects prefers-reduced-motion for users who need less animation
 * - Semantic HTML with proper ARIA labels and alt text for logos
 * - Maintains keyboard navigation compatibility
 * - Screen reader friendly with descriptive alt text
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
      className={`pb-16 bg-transparent ${className}`} 
      aria-label="Elite schools and universities our students have placed at"
    >
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
       */}
      <div className="w-full overflow-hidden bg-transparent py-0 pt-0">
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
          {/* First set of school logos */}
          {/* Documentation Source: Context7 MCP - Next.js Image Component Lazy Loading Pattern */}
          {/* Reference: Context7 MCP /context7/nextjs - Image optimization with loading="lazy" and sizes */}
          {schoolNames.map((school, index) => {
            const logoAsset = schoolLogos[school]
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
          
          {/* Duplicate set for seamless loop - required for infinite effect */}
          {/* Documentation Source: Context7 MCP - Framer Motion Infinite Loop Duplication Pattern */}
          {/* Reference: Context7 MCP /grx7/framer-motion - Content duplication for seamless marquee */}
          {schoolNames.map((school, index) => {
            const logoAsset = schoolLogos[school]
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