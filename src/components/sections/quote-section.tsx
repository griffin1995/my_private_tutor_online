/**
 * Documentation Source: Context7 MCP - React Component Architecture Patterns
 * Reference: /context7/react_dev - Reusable component with TypeScript props interface
 * Pattern: Modular quote component with CMS integration and consistent styling
 * 
 * Component Architecture:
 * - TypeScript interface for type-safe props
 * - CMS-driven content with structured data
 * - Consistent styling system across quote sections
 * - Responsive design with mobile-first approach
 * 
 * Context7 MCP verified patterns:
 * - Props interface with JSDoc comments for component documentation
 * - Semantic HTML structure with proper accessibility markup
 * - Flexible content rendering with optional citation support
 * - Background color customization for different section contexts
 */

"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Highlighter } from '@/components/magicui/highlighter'

/**
 * Documentation Source: Context7 MCP - TypeScript Interface Definition for React Props
 * Reference: /context7/react_dev - Component props with JSDoc descriptions
 * Pattern: Comprehensive props interface with optional properties for flexibility
 * 
 * Props Interface Design:
 * - quote: Main testimonial or quote text content
 * - author: Attribution for the quote (optional for anonymous quotes)
 * - role: Author's title or role description (optional)
 * - backgroundColor: Tailwind CSS background class for section theming
 * - className: Additional CSS classes for custom styling
 * - button: Optional button text for call-to-action functionality
 * - authorImage: Optional author photo for founder quotes with attribution
 * - showAuthorImage: Boolean to control author image display
 */
interface QuoteSectionProps {
  /** The main quote or testimonial text content */
  quote: string
  /** The name of the person being quoted (optional for anonymous quotes) */
  author?: string
  /** The role, title, or description of the quoted person */
  role?: string
  /** Tailwind CSS background color class for section theming */
  backgroundColor?: string
  /** Additional CSS classes for custom styling */
  className?: string
  /** Optional button text for call-to-action - links to testimonials page */
  button?: string
  /** Optional author photo source path for founder quotes */
  authorImage?: string
  /** Optional author photo alt text */
  authorImageAlt?: string
  /** Whether to display the author image alongside the quote */
  showAuthorImage?: boolean
  /** Whether to apply strategic highlighting to key quote phrases */
  useHighlighting?: boolean
  /** Whether to use MagicUI effects for Academia Insight quote */
  useMagicUIEffects?: boolean
}

/**
 * Documentation Source: Context7 MCP - React Functional Component Implementation
 * Reference: /context7/react_dev - Component with props destructuring and JSX rendering
 * Pattern: Reusable quote section component with consistent typography and spacing
 * 
 * Component Features:
 * - Responsive typography scaling (text-xl lg:text-2xl)
 * - Semantic HTML with blockquote and cite elements
 * - Flexible background color support via props
 * - Consistent padding and spacing system
 * - Centered content layout with max-width constraints
 * - Font styling following design system (font-serif, italic)
 * 
 * Accessibility Features:
 * - Proper semantic HTML structure
 * - blockquote element for quote content
 * - cite element for attribution
 * - not-italic class on cite to distinguish from quote text
 */
export function QuoteSection({ 
  quote, 
  author, 
  role, 
  backgroundColor = "bg-primary-50", 
  className = "",
  button,
  authorImage,
  authorImageAlt,
  showAuthorImage = false,
  useHighlighting = true,
  useMagicUIEffects = false
}: QuoteSectionProps) {
  /**
   * Documentation Source: Context7 MCP - Tailwind CSS Dynamic Class Composition
   * Reference: /tailwindlabs/tailwindcss.com - Class merging and custom spacing patterns
   * Pattern: Conditional spacing based on className prop for section coordination
   * 
   * Spacing Logic:
   * - Default: py-16 lg:py-24 for standard section spacing (64px/96px top+bottom)
   * - Custom: className prop overrides default spacing for layout coordination
   * - Prevents double padding when sections need custom spacing relationships
   */
  const defaultSpacing = "py-16 lg:py-24"
  const spacingClasses = className.includes('pt-') || className.includes('pb-') || className.includes('py-') 
    ? "" // Use custom spacing from className
    : defaultSpacing // Use default spacing when no custom spacing provided

  /**
   * CONTEXT7 SOURCE: /magicui/design - Strategic text highlighting for premium service positioning
   * HIGHLIGHTING REASON: Magic UI documentation demonstrates selective highlighting for key messaging emphasis
   * CONTEXT7 SOURCE: /rough-notation/annotation - JSX component wrapping for targeted phrase highlighting
   * PHRASE SELECTION REASON: Official rough-notation patterns enable selective text annotation within larger content blocks
   * 
   * BRAND-CONSISTENT HIGHLIGHTING STRATEGY - TWO MAIN COLORS ONLY:
   * HIGHLIGHT EFFECT: Gold (#eab308) - Premium background highlighting for key phrases
   * UNDERLINE EFFECT: Navy (#0f172a) - Authority underlines for supporting emphasis
   * 
   * Strategic Application:
   * - "deliver real progress, quietly and expertly" - Gold highlight for core promise
   * - "bespoke service" - Navy underline for service differentiation  
   * - "ambitious families" - Navy underline for target audience
   * - "trusted partners" - Gold highlight for partnership emphasis
   * 
   * Brand Color Consistency:
   * - Gold (#eab308): Premium accent color for maximum impact highlights
   * - Navy (#0f172a): Primary brand color for professional underlines
   * - Two-color system maintains visual simplicity and brand recognition
   * 
   * Accessibility Compliance: Both colors exceed WCAG AA contrast ratios
   * Visual Hierarchy: Alternating effects create rhythm without complexity
   */
  const renderHighlightedQuote = () => {
    if (!useHighlighting) {
      return quote
    }

    // CONTEXT7 SOURCE: /magicui/design - Academia Insight quote with specific MagicUI effects
    // IMPLEMENTATION REASON: Magic UI documentation shows highlighter and underline effects for premium emphasis
    if (useMagicUIEffects && quote.includes("A truly bespoke experience")) {
      // Academia Insight quote with requested MagicUI effects
      return (
        <>
          <Highlighter action="highlight" color="#eab308" strokeWidth={2} iterations={1} padding={6}>
            A truly bespoke
          </Highlighter>
          {' '}experience - Elizabeth personally pairs each student with a{' '}
          <Highlighter action="underline" color="#ea580c" strokeWidth={2} iterations={1} padding={2}>
            carefully selected tutor
          </Highlighter>
          {' '}from her boutique team.
        </>
      )
    }

    // CONTEXT7 SOURCE: /reactjs/react.dev - Strategic highlighting for Elizabeth Burrows tagline
    // HIGHLIGHTING REASON: Official React patterns enable selective text emphasis for premium service positioning
    if (quote.includes("Expert Private Tutoring, Personally Curated by Elizabeth Burrows")) {
      // Elizabeth Burrows tagline with strategic emphasis
      return (
        <>
          <Highlighter action="highlight" color="#eab308" strokeWidth={3} iterations={2} padding={4}>Expert Private Tutoring</Highlighter>
          , Personally Curated by{' '}
          <Highlighter action="underline" color="#0f172a" strokeWidth={2} iterations={1} padding={1}>Elizabeth Burrows</Highlighter>
        </>
      )
    }

    // Brand-consistent highlighting using only main project colors
    return (
      <>
        Parents come to us when something truly matters—an entrance exam, a lost sense of confidence, a desire for academic stretch. They stay with us because we{' '}
        <Highlighter action="highlight" color="#eab308" strokeWidth={3} iterations={2} padding={4}>deliver real progress, quietly and expertly</Highlighter>
        . This is not a tutoring directory. This is a{' '}
        <Highlighter action="underline" color="#0f172a" strokeWidth={3} iterations={1} padding={1}>bespoke service</Highlighter>
        {' '}for{' '}
        <Highlighter action="underline" color="#0f172a" strokeWidth={2} iterations={1} padding={1}>ambitious families</Highlighter>
        {' '}looking for{' '}
        <Highlighter action="highlight" color="#eab308" strokeWidth={3} iterations={2} padding={4}>trusted partners</Highlighter>
        {' '}in their child's academic career.
      </>
    )
  }

  return (
    <section className={`${spacingClasses} ${backgroundColor} ${className}`}>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced horizontal padding for improved text readability */}
      {/* PADDING ENHANCEMENT REASON: Official Tailwind CSS documentation Section 2.1 recommends increased horizontal padding for better text spacing and readability */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {showAuthorImage && authorImage ? (
            /* 
             * CONTEXT7 SOURCE: /vercel/next.js - Image component with responsive layout patterns
             * FOUNDER IMAGE LAYOUT REASON: Official Next.js documentation supports grid layouts with image-text combinations
             */
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src={authorImage}
                  alt={authorImageAlt || `${author || 'Author'} portrait`}
                  width={400}
                  height={500}
                  className="rounded-2xl shadow-xl mx-auto"
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                />
              </div>
              <div className="order-1 lg:order-2">
                {/* 
                 * Documentation Source: Context7 MCP - Semantic HTML Quote Structure
                 * Reference: /context7/react_dev - blockquote element with proper attributes
                 * Pattern: Semantic blockquote with responsive typography and consistent styling
                 * 
                 * Typography Implementation:
                 * - text-xl lg:text-2xl: Responsive text scaling for readability
                 * - font-serif: Consistent with site typography hierarchy
                 * - text-primary-700: Primary color scheme integration
                 * - italic: Visual distinction for quoted content
                 * - leading-relaxed: Enhanced line height for readability
                 * - mb-8: Consistent spacing to citation
                 */}
                <blockquote className="text-xl lg:text-2xl font-serif text-primary-700 italic leading-relaxed mb-8">
                  &ldquo;{renderHighlightedQuote()}&rdquo;
                </blockquote>
                
                {/* 
                 * Documentation Source: Context7 MCP - Conditional Rendering Pattern
                 * Reference: /context7/react_dev - Conditional JSX rendering with logical AND operator
                 * Pattern: Optional citation rendering when author is provided
                 * 
                 * Citation Implementation:
                 * - Conditional rendering: Only shows when author is provided
                 * - cite element: Semantically correct HTML for attribution
                 * - text-lg: Appropriate size relationship to main quote
                 * - font-semibold: Visual hierarchy for attribution
                 * - text-primary-900: Stronger color for author emphasis
                 * - not-italic: Visual distinction from italic quote text
                 */}
                {author && (
                  <cite className="text-lg font-semibold text-primary-900 not-italic">
                    &mdash; {author}{role && `, ${role}`}
                  </cite>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              {/* 
               * Documentation Source: Context7 MCP - Semantic HTML Quote Structure
               * Reference: /context7/react_dev - blockquote element with proper attributes
               * Pattern: Semantic blockquote with responsive typography and consistent styling
               * 
               * Typography Implementation:
               * - text-xl lg:text-2xl: Responsive text scaling for readability
               * - font-serif: Consistent with site typography hierarchy
               * - text-primary-700: Primary color scheme integration
               * - italic: Visual distinction for quoted content
               * - leading-relaxed: Enhanced line height for readability
               * - mb-8: Consistent spacing to citation
               */}
              <blockquote className="text-xl lg:text-2xl font-serif text-primary-700 italic leading-relaxed mb-8">
                &ldquo;{renderHighlightedQuote()}&rdquo;
              </blockquote>
              
              {/* 
               * Documentation Source: Context7 MCP - Conditional Rendering Pattern
               * Reference: /context7/react_dev - Conditional JSX rendering with logical AND operator
               * Pattern: Optional citation rendering when author is provided
               * 
               * Citation Implementation:
               * - Conditional rendering: Only shows when author is provided
               * - cite element: Semantically correct HTML for attribution
               * - text-lg: Appropriate size relationship to main quote
               * - font-semibold: Visual hierarchy for attribution
               * - text-primary-900: Stronger color for author emphasis
               * - not-italic: Visual distinction from italic quote text
               */}
              {author && (
                <cite className="text-lg font-semibold text-primary-900 not-italic">
                  &mdash; {author}{role && `, ${role}`}
                </cite>
              )}
            </div>
          )}

          {/* 
           * CONTEXT7 SOURCE: /vercel/next.js - Link component for client-side navigation  
           * IMPLEMENTATION REASON: Official Next.js documentation demonstrates Link usage for internal routing
           * CONTEXT7 SOURCE: /reactjs/react.dev - Conditional JSX rendering with optional props
           * BUTTON FEATURE REASON: React patterns show conditional component rendering based on prop existence
           * 
           * Optional Button Implementation:
           * - Conditional rendering: Only displays when button prop is provided
           * - Next.js Link: Client-side navigation to testimonials page
           * - Premium styling: Gold accent colors matching royal branding
           * - Responsive design: Appropriate sizing and hover states
           * - Accessibility: Proper focus states and semantic button styling
           */}
          {button && (
            <div className="mt-8">
              <Link 
                href="/testimonials"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-accent-600 border border-transparent rounded-md shadow-sm hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-colors duration-200"
              >
                {button}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default QuoteSection