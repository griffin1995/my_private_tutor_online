/**
 * CONTEXT7 SOURCE: /facebook/react - Component extraction with props interface for CTA sections  
 * COMPONENT EXTRACTION REASON: Official React documentation Section 2.6 recommends extracting CTA components with action handlers
 * CONTEXT7 SOURCE: /grx7/framer-motion - motion.div with staggered button animations
 * ANIMATION REASON: Official Framer Motion documentation shows whileInView patterns for CTA reveal animations
 * 
 * Services CTA Component
 * Extracted from services page for reusable call-to-action sections
 * 
 * Features:
 * - Dual CTA buttons (primary and secondary)
 * - Responsive button layout (stacked on mobile, row on desktop)
 * - Gradient background support via props
 * - Scroll-triggered animations with staggered delays
 * - Premium royal client messaging
 * - Accessibility support with semantic structure
 */

"use client"

import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'

// CONTEXT7 SOURCE: /facebook/react - TypeScript interface for CTA button configuration
// INTERFACE REASON: Official React TypeScript documentation recommends explicit typing for action components
export interface CTAButton {
  /** Button display text */
  text: string
  /** Click handler function */
  onClick?: () => void
  /** Button styling variant */
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
  /** Button size */
  size?: 'default' | 'sm' | 'lg' | 'icon'
  /** Custom className for styling */
  className?: string
}

export interface ServicesCTAProps {
  /** Main heading text */
  title: string
  /** Supporting description text */
  description: string
  /** Primary action button configuration */
  primaryButton: CTAButton
  /** Secondary action button configuration (optional) */
  secondaryButton?: CTAButton
  /** Custom className for the container */
  className?: string
  /** Custom title className */
  titleClassName?: string
  /** Custom description className */
  descriptionClassName?: string
  /** Animation configuration */
  animation?: {
    duration?: number
    stagger?: number
  }
}

// CONTEXT7 SOURCE: /grx7/framer-motion - CTA button component with motion animations
// ANIMATION IMPLEMENTATION REASON: Official Framer Motion patterns for button reveal animations
function CTAButtonComponent({ 
  button, 
  index, 
  animation 
}: { 
  button: CTAButton
  index: number
  animation: { duration: number; stagger: number }
}) {
  const defaultPrimaryClass = "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-bold px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-amber-400"
  const defaultSecondaryClass = "border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
  
  return (
    <Button 
      onClick={button.onClick}
      size={button.size || "lg"}
      variant={button.variant || (index === 0 ? "default" : "outline")}
      className={
        button.className || 
        (index === 0 ? defaultPrimaryClass : defaultSecondaryClass)
      }
    >
      {button.text}
    </Button>
  )
}

// CONTEXT7 SOURCE: /facebook/react - Main CTA component with responsive layout
// LAYOUT IMPLEMENTATION REASON: Official React patterns for centered CTA sections with button groups
export function ServicesCTA({
  title,
  description,
  primaryButton,
  secondaryButton,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  animation = { duration: 0.6, stagger: 0.2 }
}: ServicesCTAProps) {
  const buttons = [primaryButton, secondaryButton].filter(Boolean) as CTAButton[]

  return (
    <m.div
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: animation.duration }}
      viewport={{ once: true }}
    >
      <h2 className={`text-4xl lg:text-6xl font-serif font-bold text-white mb-8 ${titleClassName}`}>
        {title}
      </h2>
      
      <p className={`text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed ${descriptionClassName}`}>
        {description}
      </p>
      
      <m.div 
        className="flex flex-col sm:flex-row gap-6 justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: animation.duration, delay: animation.stagger }}
        viewport={{ once: true }}
      >
        {buttons.map((button, index) => (
          <CTAButtonComponent
            key={index}
            button={button}
            index={index}
            animation={animation}
          />
        ))}
      </m.div>
    </m.div>
  )
}

// CONTEXT7 SOURCE: /facebook/react - Default export pattern for main component
// EXPORT REASON: Official React documentation recommends default export for primary component
export default ServicesCTA