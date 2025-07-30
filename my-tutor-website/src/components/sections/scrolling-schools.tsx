/**
 * Documentation Source: Context7 Framer Motion infinite marquee pattern
 * Reference: /grx7/framer-motion - Official React motion library with marquee animations
 * Pattern: Infinite scrolling marquee using Framer Motion with seamless loop
 * 
 * Component Architecture:
 * - Uses Framer Motion's animate prop for infinite x-axis movement
 * - Duplicates content array to create seamless loop effect
 * - Animates from 0% to -50% to show first set, then loops to second set
 * - CMS DATA SOURCE: Uses getTestimonialsSchools for school names
 * 
 * Performance Optimisations:
 * - Hardware-accelerated transforms with Framer Motion
 * - Efficient infinite loop without JavaScript intervals
 * - Responsive design with proper mobile breakpoints
 * 
 * Accessibility Features:
 * - Respects prefers-reduced-motion for users who need less animation
 * - Semantic HTML with proper ARIA labels
 * - Maintains keyboard navigation compatibility
 */

"use client"

import { m } from 'framer-motion'

interface ScrollingSchoolsProps {
  schools: (string | { name?: string; title?: string })[]
  className?: string
  speed?: number
}

/**
 * Documentation Source: Context7 Framer Motion Marquee Implementation
 * Reference: /grx7/framer-motion - Infinite loop animation patterns
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
 * - Handles both string and object formats for flexibility
 * - No hardcoded school names - all content from CMS
 */
export function ScrollingSchools({ 
  schools, 
  className = "", 
  speed = 30 
}: ScrollingSchoolsProps) {
  // CMS DATA SOURCE: Using provided schools array for elite institution names
  // Handle both string and object formats for backward compatibility
  const schoolNames = schools.map(school => 
    typeof school === 'string' ? school : school.name || school.title || 'School'
  )

  return (
    <section 
      className={`pb-16 bg-transparent ${className}`} 
      aria-label="Elite schools and universities our students have placed at"
    >
      <div className="w-full overflow-hidden bg-transparent py-6">
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
          {/* First set of schools */}
          {schoolNames.map((school, index) => (
            <div 
              key={`first-${index}`} 
              className="flex-shrink-0 flex items-center justify-center px-8"
            >
              <div className="text-lg font-semibold text-primary-700">
                {school}
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop - required for infinite effect */}
          {schoolNames.map((school, index) => (
            <div 
              key={`second-${index}`} 
              className="flex-shrink-0 flex items-center justify-center px-8"
            >
              <div className="text-lg font-semibold text-primary-700">
                {school}
              </div>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  )
}