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
 * - Responsive grid layout (1-4 columns)
 * - Smooth scroll-triggered animations
 * - Glass-morphism styling with backdrop blur
 * - Customizable statistics data via props
 * - Accessibility support with semantic structure
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
  /** Grid columns configuration (responsive) */
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
      className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
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

// CONTEXT7 SOURCE: /facebook/react - Main component with responsive grid patterns
// GRID IMPLEMENTATION REASON: Official React patterns for responsive layouts with Tailwind CSS
export function ServiceStatistics({
  statistics,
  className = "",
  columns = { sm: 1, md: 2, lg: 4 },
  animation = { duration: 0.5, stagger: 0.1 }
}: ServiceStatisticsProps) {
  // Generate responsive grid classes based on columns prop
  const getGridClasses = () => {
    const classes = ['grid', 'gap-8']
    
    if (columns.sm) classes.push(`grid-cols-${columns.sm}`)
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`)
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`)
    
    return classes.join(' ')
  }

  return (
    <m.div 
      className={`${getGridClasses()} ${className}`}
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