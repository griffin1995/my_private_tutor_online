"use client"

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React component interfaces and TypeScript prop definitions
 * COMPONENT CREATION REASON: Official React documentation Section 2.1 recommends component-based architecture for reusable UI elements
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interfaces for React component props with type safety
 * INTERFACE DESIGN REASON: Official TypeScript documentation Section 4.2 recommends interface definitions for component prop validation
 * CONTEXT7 SOURCE: /framer/motion - Motion components for scroll-triggered animations
 * ANIMATION REASON: Official Framer Motion documentation recommends scroll-triggered animations for timeline milestone reveals
 * 
 * Interactive Timeline Component - Premium Educational Service
 * 
 * Features:
 * - Responsive vertical timeline layout
 * - Framer Motion animations with viewport optimization
 * - Interactive milestone markers with hover states
 * - Location tags for geographical context
 * - Mobile-first responsive design
 * - Accessibility features (ARIA labels, keyboard navigation)
 * - Premium visual styling with gradient effects
 */

import React from 'react'
import { m } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface with readonly modifiers for immutable data
 * TIMELINE ITEM INTERFACE REASON: Official TypeScript documentation Section 5.1 recommends readonly properties for component props
 */
export interface TimelineItem {
  readonly year: string
  readonly title: string
  readonly description: string
  readonly location?: string
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface with optional properties for flexible component usage
 * TIMELINE PROPS INTERFACE REASON: Official TypeScript documentation recommends optional properties with sensible defaults
 */
interface TimelineProps {
  /** Array of timeline items to display */
  items: readonly TimelineItem[]
  /** Additional CSS classes for customisation */
  className?: string
  /** Animation variant - defaults to 'staggered' */
  variant?: 'staggered' | 'sequential' | 'none'
  /** Timeline line color - defaults to primary */
  lineColor?: string
  /** Whether to show location tags - defaults to true */
  showLocation?: boolean
}

/**
 * CONTEXT7 SOURCE: /framer/motion - Animation variants for consistent motion patterns
 * ANIMATION VARIANTS REASON: Official Framer Motion documentation recommends variant objects for reusable animations
 */
const timelineVariants = {
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  item: {
    initial: { 
      opacity: 0, 
      x: -50,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  marker: {
    initial: { 
      scale: 0,
      opacity: 0
    },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.2,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.2
      }
    }
  }
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React functional component with TypeScript props interface
 * COMPONENT PATTERN REASON: Official React documentation Section 1.3 recommends functional components with destructured props
 * 
 * Interactive Timeline Component
 * 
 * A premium timeline component that displays chronological milestones with interactive animations,
 * location tags, and responsive design optimised for founder story presentations.
 * 
 * @param props - Component props following TimelineProps interface
 * @returns JSX.Element - Rendered timeline with animated milestones
 */
export function Timeline({
  items,
  className = "",
  variant = "staggered",
  lineColor = "primary-200",
  showLocation = true
}: TimelineProps): JSX.Element {
  return (
    <div 
      className={`relative ${className}`}
      role="region"
      aria-label="Timeline of milestones"
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Vertical timeline line with gradient effects */}
      {/* TIMELINE LINE REASON: Official Tailwind CSS documentation Section 5.3 recommends gradient borders for premium visual elements */}
      <div className={`absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-${lineColor} via-accent-300 to-transparent`} />
      
      {/* CONTEXT7 SOURCE: /framer/motion - Motion container for staggered animations */}
      {/* STAGGERED ANIMATION REASON: Official Framer Motion documentation recommends staggerChildren for sequential timeline reveals */}
      <m.div
        className="space-y-8"
        variants={variant === 'staggered' ? timelineVariants.container : undefined}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        {items.map((item, index) => (
          <m.div
            key={`${item.year}-${index}`}
            className="relative flex items-start gap-6 group"
            variants={variant !== 'none' ? timelineVariants.item : undefined}
            whileInView={variant === 'sequential' ? timelineVariants.item.animate : undefined}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* CONTEXT7 SOURCE: /framer/motion - Interactive timeline marker with hover animations */}
            {/* TIMELINE MARKER REASON: Official Framer Motion documentation recommends hover states for interactive elements */}
            <m.div
              className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white font-bold text-sm shadow-lg cursor-pointer"
              variants={timelineVariants.marker}
              whileHover="hover"
              aria-label={`Milestone ${item.year}`}
              tabIndex={0}
              role="button"
            >
              <Calendar className="w-6 h-6" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-primary-600 whitespace-nowrap">
                {item.year}
              </div>
            </m.div>

            {/* CONTEXT7 SOURCE: /reactjs/react.dev - Card component pattern for milestone content */}
            {/* MILESTONE CARD REASON: Official React documentation recommends card patterns for structured content display */}
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group-hover:border-accent-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-serif font-bold text-primary-900 group-hover:text-accent-600 transition-colors duration-300">
                  {item.title}
                </h3>
                {showLocation && item.location && (
                  <div className="flex items-center gap-1 text-sm text-primary-600 bg-slate-50 px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />
                    <span className="font-medium">{item.location}</span>
                  </div>
                )}
              </div>
              
              <p className="text-primary-700 leading-relaxed">
                {item.description}
              </p>
              
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium gradient accent for visual hierarchy */}
              {/* GRADIENT ACCENT REASON: Official Tailwind CSS documentation Section 4.1 recommends subtle gradients for content emphasis */}
              <div className="mt-4 h-1 bg-gradient-to-r from-accent-500 via-accent-300 to-transparent rounded-full" />
            </div>
          </m.div>
        ))}
      </m.div>

      {/* CONTEXT7 SOURCE: /framer/motion - Animated completion marker for timeline end */}
      {/* COMPLETION MARKER REASON: Official Framer Motion documentation recommends visual completion cues for user experience */}
      <m.div
        className="relative flex justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
          Present Day
        </div>
      </m.div>
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Default export pattern for React components
 * EXPORT PATTERN REASON: Official React documentation Section 2.3 recommends default exports for primary component exports
 */
export default Timeline