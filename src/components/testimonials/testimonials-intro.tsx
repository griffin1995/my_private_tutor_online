/**
 * CONTEXT7 SOURCE: /websites/react_dev - React functional component patterns with TypeScript interfaces
 * SIMPLIFICATION REASON: Component simplified to plain text only, removing all animations and effects per user requirements
 * 
 * Component: TestimonialsIntro
 * Purpose: Simple testimonials page introduction with plain text content
 * Features:
 * - Basic responsive text layout
 * - Simple typography without effects
 * - Clean, minimal presentation
 * - Standard container spacing
 * 
 * Business Context: Simplified presentation for testimonials section
 * Quality Standards: Clean, accessible text component following React patterns
 */

"use client"

import React from 'react'

// CONTEXT7 SOURCE: /websites/react_dev - TypeScript interface patterns for component props
// INTERFACE REASON: Official React documentation recommends explicit prop interfaces for type safety
interface TestimonialsIntroProps {
  /** Additional CSS classes for styling customization */
  readonly className?: string
}

/**
 * CONTEXT7 SOURCE: /websites/react_dev - React functional component with TypeScript props destructuring
 * COMPONENT ARCHITECTURE REASON: Official React patterns for props destructuring and default values
 * 
 * TestimonialsIntro: Simple introduction component for testimonials pages
 * 
 * @param props - Component configuration options
 * @returns JSX.Element - Rendered testimonials introduction section
 */
export function TestimonialsIntro({
  className = ''
}: TestimonialsIntroProps) {
  
  return (
    <section className={`py-12 lg:py-16 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* CONTEXT7 SOURCE: /websites/react_dev - Basic text content structure */}
          {/* IMPLEMENTATION REASON: Official React documentation patterns for simple text components */}
          <div className="space-y-6">
            {/* Primary content paragraphs */}
            <div className="space-y-4">
              <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
                Since 2010, My Private Tutor Online has helped hundreds of students achieve their academic goals.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                We're proud to say we've never spent a penny on marketing or paid advertising — our tutors are consistently in demand through personal word-of-mouth referrals alone.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                Here's what a selection of families have to say about their experience with us. We are always happy to share references for specific tutors upon request.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

// CONTEXT7 SOURCE: /context7/react_dev - Component export patterns for modular architecture
// EXPORT PATTERN REASON: React module patterns recommend both named and default exports for flexibility
export default TestimonialsIntro

/**
 * USAGE EXAMPLES:
 * 
 * // Basic usage with CMS content
 * <TestimonialsIntro introContent={getTestimonialsContent().mainContent} />
 * 
 * // Custom background with specific trust indicators
 * <TestimonialsIntro 
 *   backgroundVariant="gradient"
 *   trustIndicators={customTrustIndicators}
 *   animationDelay={0.2}
 * />
 * 
 * // Minimal version without trust indicators
 * <TestimonialsIntro 
 *   backgroundVariant="white"
 *   showTrustIndicators={false}
 *   showWaveSeparator={false}
 * />
 * 
 * // Enhanced version with custom styling
 * <TestimonialsIntro 
 *   backgroundVariant="slate"
 *   className="custom-intro-styles"
 *   trustIndicators={royalEndorsements}
 * />
 */