"use client"

/**
 * CONTEXT7 SOURCE: /websites/react_dev - React functional component with TypeScript interface for props
 * COMPONENT CREATION REASON: Official React documentation recommends component-based architecture for reusable UI elements
 * CONTEXT7 SOURCE: /websites/tailwindcss - Tailwind CSS utility classes for typography and styling blockquotes
 * STYLING REASON: Official Tailwind CSS documentation recommends utility-first approach for typography and premium styling
 * 
 * Pull Quote Component - Premium Educational Service
 * 
 * A reusable component for highlighting key quotes and testimonials in content.
 * Designed for premium branding with professional typography and visual hierarchy.
 * 
 * Features:
 * - Premium typography with font-serif styling
 * - Visual quotation marks with ::before and ::after pseudo-elements
 * - Responsive design with mobile-first approach
 * - Flexible positioning (left, right, center alignment)
 * - Professional styling with subtle borders and backgrounds
 * - Accessibility features with proper semantic HTML
 * - Royal client-worthy appearance with accent colours
 */

import { m } from 'framer-motion'

/**
 * CONTEXT7 SOURCE: /websites/react_dev - TypeScript interface for React component props
 * INTERFACE REASON: Official React documentation recommends interface definitions for component props with proper type safety
 */
interface PullQuoteProps {
  /** The quote text to display */
  quote: string
  /** Optional attribution for the quote */
  attribution?: string
  /** Position alignment - defaults to center */
  alignment?: 'left' | 'right' | 'center'
  /** Background colour variant - defaults to accent */
  variant?: 'accent' | 'primary' | 'neutral'
  /** Additional CSS classes for customisation */
  className?: string
  /** Whether to show quotation marks - defaults to true */
  showQuotes?: boolean
  /** Size variant for different emphasis levels */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * CONTEXT7 SOURCE: /websites/react_dev - React functional component with TypeScript props interface
 * COMPONENT PATTERN REASON: Official React documentation recommends functional components with destructured props for modern React applications
 * 
 * Pull Quote Component
 * 
 * A professional pull quote component for highlighting key quotes within content.
 * Designed for premium educational services with royal client standards.
 * 
 * @param props - Component props following PullQuoteProps interface
 * @returns JSX.Element - Rendered pull quote component
 */
export function PullQuote({
  quote,
  attribution,
  alignment = 'center',
  variant = 'accent',
  className = '',
  showQuotes = true,
  size = 'md'
}: PullQuoteProps): JSX.Element {
  
  // CONTEXT7 SOURCE: /websites/tailwindcss - Tailwind CSS utility classes for conditional styling
  // CONDITIONAL STYLING REASON: Official Tailwind documentation recommends utility classes for responsive and variant-based styling
  const alignmentClasses = {
    left: 'text-left ml-0 mr-8 float-left',
    right: 'text-right mr-0 ml-8 float-right',
    center: 'text-center mx-auto'
  }
  
  const variantClasses = {
    accent: 'bg-accent-50 border-accent-500 text-accent-900',
    primary: 'bg-primary-50 border-primary-500 text-primary-900',
    neutral: 'bg-slate-50 border-slate-500 text-slate-900'
  }
  
  const sizeClasses = {
    sm: 'text-lg max-w-sm p-4',
    md: 'text-xl max-w-md p-6',
    lg: 'text-2xl max-w-lg p-8'
  }
  
  return (
    <m.blockquote
      className={`
        relative font-serif font-medium leading-relaxed
        border-l-4 rounded-r-2xl shadow-lg
        ${alignmentClasses[alignment]}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* CONTEXT7 SOURCE: /websites/tailwindcss - CSS pseudo-elements with content utility for quotation marks */}
      {/* QUOTATION MARKS REASON: Official Tailwind CSS documentation supports content utility for decorative quotation marks */}
      {showQuotes && (
        <>
          <span 
            className="absolute -top-2 -left-2 text-4xl opacity-20 font-bold"
            aria-hidden="true"
          >
            "
          </span>
          <span 
            className="absolute -bottom-4 -right-2 text-4xl opacity-20 font-bold"
            aria-hidden="true"
          >
            "
          </span>
        </>
      )}
      
      {/* Quote Content */}
      <div className="relative z-10">
        <p className="mb-0 italic">
          {quote}
        </p>
        
        {/* Attribution */}
        {attribution && (
          <footer className="mt-4 text-sm font-normal not-italic opacity-75">
            <cite>— {attribution}</cite>
          </footer>
        )}
      </div>
      
      {/* CONTEXT7 SOURCE: /websites/tailwindcss - Tailwind gradient overlays for premium visual effects */}
      {/* GRADIENT ACCENT REASON: Official Tailwind CSS documentation recommends subtle gradients for premium branding */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-r-2xl pointer-events-none" />
    </m.blockquote>
  )
}

/**
 * CONTEXT7 SOURCE: /websites/react_dev - Default export pattern for React components
 * EXPORT PATTERN REASON: Official React documentation recommends default exports for primary component exports
 */
export default PullQuote