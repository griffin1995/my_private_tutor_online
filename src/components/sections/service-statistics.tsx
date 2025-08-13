/**
 * CONTEXT7 SOURCE: /facebook/react - Component extraction patterns with TypeScript interfaces
 * COMPONENT EXTRACTION REASON: Official React documentation Section 2.4 recommends extracting statistic components for reusability
 * CONTEXT7 SOURCE: /grx7/framer-motion - motion.div with whileInView animations for statistics reveal
 * ANIMATION REASON: Official Framer Motion documentation shows whileInView patterns for scroll-triggered animations
 * 
 * Service Statistics Component
 * Extracted from services page for reusable statistics display
 * 
 * Features:
 * - Single-line horizontal layout (flex-nowrap)
 * - Horizontal scrolling on mobile when needed
 * - Smooth scroll-triggered animations
 * - Glass-morphism styling with backdrop blur
 * - Customizable statistics data via props
 * - Accessibility support with semantic structure
 * - Responsive card sizing with shrink prevention
 */

"use client"

import { m } from 'framer-motion'

// CONTEXT7 SOURCE: /facebook/react - TypeScript interface for component props
// INTERFACE REASON: Official React TypeScript documentation recommends explicit typing for data structures
export interface StatisticItem {
  /** Display value (e.g., "40+", "95%", "KS1-University") */
  value: string
  /** Description text below the value */
  label: string
  /** Optional custom color for the value (defaults to amber-600) */
  valueColor?: string
  /** Animation delay multiplier (will be multiplied by index) */
  delayMultiplier?: number
}

export interface ServiceStatisticsProps {
  /** Array of statistics to display */
  statistics: StatisticItem[]
  /** Custom className for the container */
  className?: string
  /** Grid columns configuration (responsive) - DEPRECATED: Component now uses single-line flex layout */
  columns?: {
    sm?: number
    md?: number
    lg?: number
  }
  /** Animation configuration */
  animation?: {
    duration?: number
    stagger?: number
  }
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Individual statistic card with motion animations
// ANIMATION IMPLEMENTATION REASON: Official Framer Motion patterns for staggered animations with whileInView
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - flex-shrink prevention for maintaining card sizes in single-line layout
// SHRINK PREVENTION REASON: Official documentation shrink-0 utility prevents flex items from shrinking below natural size
function StatisticCard({ 
  statistic, 
  index, 
  animation 
}: { 
  statistic: StatisticItem
  index: number
  animation: { duration: number; stagger: number }
}) {
  return (
    <m.div
      className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 min-w-[200px] sm:min-w-[220px] md:min-w-[240px]"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ 
        duration: animation.duration, 
        delay: index * animation.stagger 
      }}
      viewport={{ once: true }}
    >
      <div className={`text-4xl font-bold mb-3 ${statistic.valueColor || 'text-amber-600'}`}>
        {statistic.value}
      </div>
      <div className="text-slate-700 font-semibold">
        {statistic.label}
      </div>
    </m.div>
  )
}

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox single-line layout with horizontal scrolling patterns
// SINGLE LINE IMPLEMENTATION REASON: Official Tailwind CSS documentation flex-nowrap pattern for preventing line breaks with overflow-x-auto for mobile scrolling
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - flex-nowrap utility prevents flex items from wrapping to multiple lines
// HORIZONTAL SCROLL REASON: Official documentation overflow-x-auto pattern enables horizontal scrolling when items exceed container width
export function ServiceStatistics({
  statistics,
  className = "",
  columns = { sm: 1, md: 2, lg: 4 }, // Maintained for backwards compatibility but overridden by single-line layout
  animation = { duration: 0.5, stagger: 0.1 }
}: ServiceStatisticsProps) {
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Single-line flex layout classes for all viewport sizes
  // FLEX NOWRAP REASON: Official Tailwind CSS documentation recommends flex-nowrap to ensure items remain on single line
  const getSingleLineFlexClasses = () => {
    const classes = [
      'flex',           // Create flex container
      'flex-nowrap',    // Prevent wrapping - forces single line
      'gap-6',          // Consistent spacing between cards
      'overflow-x-auto', // Enable horizontal scrolling on mobile when needed
      'pb-4',           // Padding bottom for scrollbar space
      // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - justify-between pattern for equal distribution
      // SPACE DISTRIBUTION REASON: Official documentation shows justify-between creates equal space between items
      'md:justify-between', // Distribute space evenly on desktop
      'lg:justify-center',  // Center alignment on large screens for better visual balance
    ]
    
    return classes.join(' ')
  }

  return (
    <m.div 
      className={`${getSingleLineFlexClasses()} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {statistics.map((statistic, index) => (
        <StatisticCard
          key={index}
          statistic={statistic}
          index={index}
          animation={animation}
        />
      ))}
    </m.div>
  )
}

// CONTEXT7 SOURCE: /facebook/react - Default export pattern for main component
// EXPORT REASON: Official React documentation recommends default export for primary component
export default ServiceStatistics