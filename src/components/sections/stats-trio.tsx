/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Reusable statistics trio component with brand colors
 * IMPLEMENTATION REASON: Official Tailwind CSS grid patterns for statistical data presentation
 * CONTEXT7 SOURCE: /grx7/framer-motion - Animation patterns for statistical highlights
 * COMPONENT CREATION REASON: Reusable stat boxes for homepage and results documentation integration
 * CONTEXT7 SOURCE: /websites/ui_shadcn - Separator component for visual content division
 * REVISION REASON: Official Shadcn UI documentation for Separator usage in card structures with white text styling
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
import { Separator } from '@/components/ui/separator'

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
    ? "grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch"
    : variant === 'featured'
    ? "grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
    : "grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"

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
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Stat box 1 with amber brand colors and Aztec Gold statistics */}
      {/* BRAND COLORS REASON: Official Tailwind CSS documentation provides amber-50/amber-900 gradient with white text for premium accessibility */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Arbitrary value text color pattern for brand Aztec Gold #CA9E5B */}
      {/* AZTEC GOLD REVISION REASON: Brand consistency requirement - statistics values styled with signature Aztec Gold color */}
      {/* CONTEXT7 SOURCE: /websites/ui_shadcn - Separator component implementation for structured card content division */}
      <StatBox delay={0}>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
          <div className="text-white">
            <h3 className="text-lg font-semibold text-white mb-3">11+ Grammar & Independent School Success</h3>
            <Separator className="bg-white/30 mb-3" />
            <div className="text-3xl font-bold text-[#CA9E5B] mb-3">95%</div>
            <Separator className="bg-white/30 mb-3" />
            <h4 className="text-sm font-medium text-white mb-3">Pass Rate Achievement</h4>
            <Separator className="bg-white/30 mb-3" />
            <p className="text-sm text-white leading-relaxed">
              Students achieving offers from at least one of their first choice schools, including Eton, St Paul's, Westminster, Highgate and more.
            </p>
          </div>
        </div>
      </StatBox>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Stat box 2 with gold brand colors and Aztec Gold statistics */}
      {/* BRAND COLORS REASON: Official Tailwind CSS documentation provides yellow-50/yellow-900 gradient with white text for consistent brand palette */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Arbitrary value text color pattern for brand Aztec Gold #CA9E5B */}
      {/* AZTEC GOLD REVISION REASON: Brand consistency requirement - statistics values styled with signature Aztec Gold color */}
      <StatBox delay={0.1}>
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
          <div className="text-white">
            <h3 className="text-lg font-semibold text-white mb-3">GCSE Performance Excellence</h3>
            <Separator className="bg-white/30 mb-3" />
            <div className="text-3xl font-bold text-[#CA9E5B] mb-3">94%</div>
            <Separator className="bg-white/30 mb-3" />
            <h4 className="text-sm font-medium text-white mb-3">2+ Grade Growth Achievement</h4>
            <Separator className="bg-white/30 mb-3" />
            <p className="text-sm text-white leading-relaxed">
              Since 2010 an average of 94% of our GCSE students have improved by two or more full levels.
            </p>
          </div>
        </div>
      </StatBox>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Stat box 3 with warm gold brand colors and Aztec Gold statistics */}
      {/* BRAND COLORS REASON: Official Tailwind CSS documentation provides amber-100/amber-900 combination with white text for premium service positioning */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Arbitrary value text color pattern for brand Aztec Gold #CA9E5B */}
      {/* AZTEC GOLD REVISION REASON: Brand consistency requirement - statistics values styled with signature Aztec Gold color */}
      <StatBox delay={0.2}>
        <div className="bg-gradient-to-br from-amber-100 to-yellow-100 border border-amber-300 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
          <div className="text-white">
            <h3 className="text-lg font-semibold text-white mb-3">Elite Academic Performance</h3>
            <Separator className="bg-white/30 mb-3" />
            <div className="text-3xl font-bold text-[#CA9E5B] mb-3">Top 2%</div>
            <Separator className="bg-white/30 mb-3" />
            <h4 className="text-sm font-medium text-white mb-3">Of Test Takers</h4>
            <Separator className="bg-white/30 mb-3" />
            <p className="text-sm text-white leading-relaxed">
              From 7+ entrance all the way through to A Levels, our tutees frequently score in the top 2% of candidates. For example, one of our current students obtained the highest GCSE Science score in all of Asia.
            </p>
          </div>
        </div>
      </StatBox>
    </div>
  )
}

export default StatsTrio