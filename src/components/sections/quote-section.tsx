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
  button
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

  return (
    <section className={`${spacingClasses} ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
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
            &ldquo;{quote}&rdquo;
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