/**
 * CONTEXT7 SOURCE: /facebook/react - Component extraction with props interface patterns
 * COMPONENT EXTRACTION REASON: Official React documentation Section 2.5 recommends extracting preview components with CTA integration
 * CONTEXT7 SOURCE: /grx7/framer-motion - motion.div and motion.li with staggered animations
 * ANIMATION REASON: Official Framer Motion documentation shows whileInView patterns with staggered list animations
 * 
 * Homeschooling Preview Component
 * Extracted from services page for homeschooling service promotion
 * 
 * Features:
 * - Two-column responsive layout
 * - Animated feature list with bullet points
 * - CTA button with gradient styling
 * - Decorative visual element with icon
 * - Scroll-triggered animations with staggered delays
 * - Royal client premium positioning
 */

"use client"

import { m } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

// CONTEXT7 SOURCE: /facebook/react - TypeScript interface for component data structure
// INTERFACE REASON: Official React TypeScript documentation recommends explicit typing for feature lists
export interface HomeschoolingFeature {
  /** Feature text to display */
  text: string
  /** Animation delay offset for this feature */
  delay?: number
}

export interface HomeschoolingPreviewProps {
  /** Main heading text */
  title: string
  /** Descriptive paragraph text */
  description: string
  /** Array of features to highlight */
  features: HomeschoolingFeature[]
  /** CTA button text */
  buttonText: string
  /** CTA button click handler */
  onButtonClick?: () => void
  /** Icon component to display in visual element */
  icon: React.ReactElement<LucideIcon>
  /** Custom className for styling */
  className?: string
  /** Custom button styling */
  buttonClassName?: string
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Feature list item with motion animations
// ANIMATION IMPLEMENTATION REASON: Official Framer Motion patterns for list item animations with x-axis movement
function FeatureItem({ feature, index }: { feature: HomeschoolingFeature; index: number }) {
  return (
    <m.li 
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: feature.delay || (index * 0.1 + 0.1) }}
      viewport={{ once: true }}
    >
      <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
      <span className="text-slate-700 text-lg">{feature.text}</span>
    </m.li>
  )
}

// CONTEXT7 SOURCE: /facebook/react - Main component with responsive grid layout
// LAYOUT IMPLEMENTATION REASON: Official React patterns for two-column responsive layouts with Tailwind CSS
export function HomeschoolingPreview({
  title,
  description,
  features,
  buttonText,
  onButtonClick,
  icon,
  className = "",
  buttonClassName = ""
}: HomeschoolingPreviewProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${className}`}>
      {/* Content Column */}
      <m.div
        className="space-y-8"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900">
          {title}
        </h2>
        
        <p className="text-xl text-slate-700 leading-relaxed">
          {description}
        </p>
        
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </ul>
        
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button 
            onClick={onButtonClick}
            className={`bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg ${buttonClassName}`}
          >
            {buttonText}
          </Button>
        </m.div>
      </m.div>
      
      {/* Visual Column */}
      <m.div
        className="relative"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 rounded-3xl flex items-center justify-center shadow-2xl border border-amber-200">
          <div className="w-32 h-32 text-amber-600">
            {icon}
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-20" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15" />
      </m.div>
    </div>
  )
}

// CONTEXT7 SOURCE: /facebook/react - Default export pattern for main component
// EXPORT REASON: Official React documentation recommends default export for primary component
export default HomeschoolingPreview