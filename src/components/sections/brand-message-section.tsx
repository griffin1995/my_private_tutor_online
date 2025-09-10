/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Official Magic UI Highlighter component integration
 * IMPLEMENTATION REASON: Official Magic UI documentation Section highlighter demonstrates text highlighting for brand messaging
 * REVISION REASON: Replaced broken QuoteSection with MagicUI Highlighter exclusive implementation for consistent brand messaging
 * 
 * Official Magic UI Pattern (from Context7 MCP documentation):
 * - Strategic text highlighting using Highlighter component with action and color props
 * - Semantic HTML structure with blockquote and cite elements
 * - Brand-consistent highlighting for key messaging across all pages
 * - Consistent section padding and styling for unified page layout
 * 
 * Brand Message Strategy:
 * - Gold highlights (#CA9E5B): Premium value propositions and key benefits
 * - Navy underlines (#0f172a): Supporting emphasis and professional credibility
 * - Strategic placement: 2-3 highlights maximum per message for visual clarity
 * - Royal client standards: Sophisticated, subtle, premium positioning
 */

"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HighlightedQuote } from '@/components/ui/highlighted-quote'

/**
 * CONTEXT7 SOURCE: /websites/magicui_design - TypeScript interface for brand message component props
 * PROPS INTERFACE REASON: Official Magic UI documentation demonstrates component props structure for text highlighting
 * REVISION REASON: Maintaining backward compatibility with previous QuoteSection while using MagicUI Highlighter exclusively
 * 
 * Props Interface Design:
 * - quote: Main brand message or testimonial text content
 * - author: Optional attribution for founder quotes or testimonials
 * - role: Optional author title or role description
 * - backgroundColor: Tailwind CSS background class for section theming
 * - className: Additional CSS classes for custom styling
 * - button: Optional button text for call-to-action functionality
 * - authorImage: Optional author photo for founder messages
 * - showAuthorImage: Boolean to control author image display
 * - useHighlighting: Whether to apply strategic MagicUI highlighting
 */
interface BrandMessageSectionProps {
  /** The main brand message or quote text content */
  quote: string
  /** The name of the person being quoted (optional for anonymous messages) */
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
  /** Whether to apply strategic MagicUI highlighting to key phrases */
  useHighlighting?: boolean
}

/**
 * CONTEXT7 SOURCE: /websites/magicui_design - React functional component implementation with Magic UI Highlighter
 * COMPONENT PATTERN REASON: Official Magic UI documentation demonstrates text highlighting component for brand messaging
 * REVISION REASON: Brand message section with MagicUI Highlighter exclusive implementation for consistent styling
 * 
 * Component Features:
 * - Responsive typography scaling (text-xl lg:text-2xl)
 * - Semantic HTML with blockquote and cite elements
 * - Strategic MagicUI highlighting for key brand messages
 * - Consistent padding and spacing system across all pages
 * - Centered content layout with max-width constraints
 * - Font styling following design system (font-serif, italic)
 * 
 * Accessibility Features:
 * - Proper semantic HTML structure
 * - blockquote element for brand message content
 * - cite element for attribution
 * - not-italic class on cite to distinguish from quote text
 */
export function BrandMessageSection({ 
  quote, 
  author, 
  role, 
  backgroundColor = "bg-primary-50", 
  className = "",
  button,
  authorImage,
  authorImageAlt,
  showAuthorImage = false,
  useHighlighting = true
}: BrandMessageSectionProps) {
  /**
   * CONTEXT7 SOURCE: /websites/magicui_design - Tailwind CSS dynamic class composition for section spacing
   * SPACING LOGIC REASON: Official Tailwind documentation demonstrates conditional spacing for layout coordination
   * REVISION REASON: Consistent section spacing across all pages while allowing custom spacing overrides
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
    <div className={`${spacingClasses} ${backgroundColor} ${className}`}>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Simplified container with single max-width constraint */}
      {/* CONTAINER SIMPLIFICATION REASON: Official Tailwind CSS documentation Section max-width demonstrates single container pattern to eliminate nested container issues */}
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          {showAuthorImage && authorImage ? (
            /* 
             * CONTEXT7 SOURCE: /vercel/next.js - Image component with responsive grid layout patterns
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
                 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Reusable quote component for clean architecture
                 * COMPONENT EXTRACTION REASON: Official React documentation demonstrates component extraction for eliminating duplication
                 */}
                <HighlightedQuote
                  quote={quote}
                  author={author}
                  role={role}
                  useHighlighting={useHighlighting}
                />
              </div>
            </div>
          ) : (
            <div className="text-center">
              {/* 
               * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Reusable quote component for clean architecture
               * COMPONENT EXTRACTION REASON: Official React documentation demonstrates component extraction for eliminating duplication
               */}
              <HighlightedQuote
                quote={quote}
                author={author}
                role={role}
                useHighlighting={useHighlighting}
              />
            </div>
          )}

          {/* 
           * CONTEXT7 SOURCE: /vercel/next.js - Link component for client-side navigation with conditional rendering
           * BUTTON FEATURE REASON: Official Next.js documentation demonstrates Link usage for internal routing
           * REVISION REASON: Optional call-to-action button maintained from original QuoteSection functionality
           * 
           * Optional Button Implementation:
           * - Conditional rendering: Only displays when button prop is provided
           * - Next.js Link: Client-side navigation to testimonials page
           * - Premium styling: Accent colors matching royal branding
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
  )
}

export default BrandMessageSection