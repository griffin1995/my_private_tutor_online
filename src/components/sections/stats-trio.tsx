/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Reusable statistics trio component with brand colors
 * IMPLEMENTATION REASON: Official Tailwind CSS grid patterns for statistical data presentation
 * CONTEXT7 SOURCE: /grx7/framer-motion - Animation patterns for statistical highlights
 * COMPONENT CREATION REASON: Reusable stat boxes for homepage and results documentation integration
 * 
 * Statistics Trio Component - Premium Academic Results Display
 * Displays three key performance metrics with branded styling:
 * - 95% pass rate for grammar and independent schools
 * - 94% grade growth at GCSE level (2+ levels improvement)
 * - Top 2% test performance across all academic levels
 * 
 * Target Audience Impact:
 * - Oxbridge Prep: University admission success rates and academic achievement
 * - 11+ Parents: Grammar school success and structured improvement metrics
 * - Elite Corporate: Quantifiable ROI and performance excellence
 * - Results-Focused: Concrete evidence of educational outcomes
 */

"use client"

import { m } from 'framer-motion'

// CONTEXT7 SOURCE: /microsoft/typescript - Interface definition for stats trio props
// PROPS INTERFACE REASON: Official TypeScript patterns for component configuration and customization
export interface StatsTrioProps {
  readonly className?: string
  readonly showAnimation?: boolean
  readonly variant?: 'default' | 'compact' | 'featured'
}

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Main stats trio component with responsive grid layout
// COMPONENT IMPLEMENTATION REASON: Official Tailwind CSS grid-cols-1 md:grid-cols-3 pattern for responsive statistics display
export function StatsTrio({
  className = "",
  showAnimation = true,
  variant = 'default'
}: StatsTrioProps) {
  const containerClasses = variant === 'compact' 
    ? "grid grid-cols-1 md:grid-cols-3 gap-4"
    : variant === 'featured'
    ? "grid grid-cols-1 lg:grid-cols-3 gap-8"
    : "grid grid-cols-1 md:grid-cols-3 gap-6"

  const StatBox = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    if (showAnimation) {
      return (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="transition-all duration-300"
        >
          {children}
        </m.div>
      )
    }
    return <div>{children}</div>
  }

  return (
    <div className={`${containerClasses} ${className}`}>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Stat box 1 with amber brand colors */}
      {/* BRAND COLORS REASON: Official Tailwind CSS documentation provides amber-50/amber-900 gradient for premium gold aesthetic */}
      <StatBox delay={0}>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="text-3xl font-bold text-amber-900 mb-2">95%</div>
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Pass rate 11+ grammar and independent school success.</strong> Students achieving offers from at least one of their first choice schools, including Eton, St Paul's, Westminster, Highgate and more.
          </p>
        </div>
      </StatBox>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Stat box 2 with gold brand colors */}
      {/* BRAND COLORS REASON: Official Tailwind CSS documentation provides yellow-50/yellow-900 gradient for consistent brand palette */}
      <StatBox delay={0.1}>
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="text-3xl font-bold text-yellow-900 mb-2">94%</div>
          <p className="text-sm text-yellow-800 leading-relaxed">
            <strong>2+ grade growth at GCSE.</strong> Since 2010 an average of 94% of our GCSE students have improved by two or more full levels.
          </p>
        </div>
      </StatBox>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Stat box 3 with warm gold brand colors */}
      {/* BRAND COLORS REASON: Official Tailwind CSS documentation provides amber-100/amber-900 combination for premium service positioning */}
      <StatBox delay={0.2}>
        <div className="bg-gradient-to-br from-amber-100 to-yellow-100 border border-amber-300 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="text-3xl font-bold text-amber-900 mb-2">Top 2%</div>
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Of test takers.</strong> From 7+ entrance all the way through to A Levels, our tutees frequently score in the top 2% of candidates. For example, one of our current students obtained the highest GCSE Science score in all of Asia.
          </p>
        </div>
      </StatBox>
    </div>
  )
}

export default StatsTrio