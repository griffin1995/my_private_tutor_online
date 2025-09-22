/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Vanilla MagicUI Highlighter wrapper component
 * COMPONENT REASON: Simple modular component with consistent padding for brand messaging across all pages
 * IMPLEMENTATION REASON: Uses official MagicUI Highlighter package with no custom CSS or logic
 * 
 * Brand Message Wrapper - Vanilla MagicUI Implementation:
 * - Official Highlighter component from magicui.design
 * - Consistent section padding across all pages
 * - No custom CSS, animations, or modifications
 * - Pure vanilla MagicUI functionality only
 */

"use client"

import React from 'react'
import { Highlighter } from '@/components/magicui/highlighter'

/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Simple props interface for vanilla MagicUI wrapper
 * PROPS INTERFACE REASON: Minimal interface for consistent styling across pages
 */
interface HighlightedMessageSectionProps {
  children: React.ReactNode
  backgroundColor?: string
  className?: string
}

/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Vanilla MagicUI wrapper component implementation
 * COMPONENT PATTERN REASON: Simple wrapper with consistent padding using official MagicUI Highlighter
 * 
 * Component Features:
 * - Vanilla MagicUI Highlighter functionality only
 * - Consistent section padding across all pages
 * - No custom CSS or animations
 * - Modular design for reuse across pages
 */
export function HighlightedMessageSection({ 
  children,
  backgroundColor = "bg-primary-50", 
  className = ""
}: HighlightedMessageSectionProps) {
  
  return (
    <section className={`py-16 lg:py-24 ${backgroundColor} ${className}`}>
      {/* CONTEXT7 SOURCE: /websites/tailwindcss - Container optimization with consolidated max-width utilities */}
      {/* CONTAINER CONSOLIDATION REASON: Official Tailwind documentation demonstrates reducing nesting by combining container and max-width */}
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <div className="text-xl lg:text-2xl font-serif text-primary-700 italic leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HighlightedMessageSection