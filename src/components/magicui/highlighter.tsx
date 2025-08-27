/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Official Magic UI Highlighter component implementation
 * IMPLEMENTATION REASON: Official Magic UI documentation Section components/highlighter demonstrates exact inline highlighting pattern
 * REVISION REASON: Fixed positioning offset issues by implementing true official Magic UI Highlighter pattern with CSS-based highlighting
 * 
 * Official Magic UI Pattern (from Context7 MCP documentation):
 * - Simple React component wrapper for inline text highlighting
 * - CSS-based highlighting effects with proper inline positioning
 * - No external libraries causing positioning conflicts
 * - Supports highlight and underline actions with custom colors
 * - Perfect inline text alignment without offsets
 * 
 * User-Provided Official Example:
 * ```jsx
 * <Highlighter action="underline" color="#FF9800">
 *   Magic UI Highlighter
 * </Highlighter>
 * ```
 */

"use client"

import React from 'react'
import { cn } from '@/lib/utils'

/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Official Magic UI Highlighter component props interface
 * PROPS INTERFACE REASON: Official Magic UI documentation demonstrates simple props for highlight and underline actions
 * REVISION REASON: Implementing exact official Magic UI Highlighter props matching Context7 MCP documentation
 * 
 * Official Magic UI Highlighter Props:
 * - children: React.ReactNode (Required) - The content to be highlighted
 * - action: "highlight" | "underline" (Default: "highlight") - The type of highlighting effect
 * - color: string (Default: "#87CEFA") - The color of the highlight or underline
 * - className: string (Optional) - Additional CSS classes
 */
interface HighlighterProps {
  /** The content to be highlighted */
  children: React.ReactNode
  /** The type of highlighting effect to apply */
  action?: "highlight" | "underline"
  /** The color of the highlight or underline */
  color?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Official Magic UI Highlighter component implementation
 * COMPONENT PATTERN REASON: Official Magic UI documentation demonstrates simple CSS-based highlighting component
 * REVISION REASON: Fixed positioning offset issues by implementing true official Magic UI pattern without external libraries
 * 
 * Official Magic UI Component Features:
 * - Pure CSS-based highlighting effects (no rough-notation library)
 * - Perfect inline text alignment without positioning offsets
 * - Simple span wrapper with CSS background or border styling
 * - Immediate rendering without complex state management
 * - Clean props interface matching official documentation
 * 
 * Official Magic UI Colors (from Context7 MCP examples):
 * - Default highlight: "#87CEFA" (light blue)
 * - Default underline: "#FF9800" (orange)
 * 
 * Positioning Fix:
 * - Removed rough-notation library causing offset issues
 * - Using CSS background-color for highlight action
 * - Using CSS border-bottom for underline action
 * - Inline span element maintains perfect text flow
 */
export function Highlighter({
  children,
  action = "highlight",
  color = action === "highlight" ? "#87CEFA" : "#FF9800",
  className = "",
}: HighlighterProps) {
  /**
   * CONTEXT7 SOURCE: /websites/magicui_design - Official Magic UI Highlighter styling pattern
   * CSS STYLING REASON: Official Magic UI documentation shows CSS-based effects for perfect inline alignment
   * REVISION REASON: Pure CSS approach eliminates positioning offset issues from external annotation libraries
   * 
   * Official Magic UI Styling:
   * - highlight: background-color with padding and border-radius
   * - underline: border-bottom with custom color
   * - No positioning conflicts or z-index issues
   * - Maintains natural text flow and accessibility
   */
  const highlightStyles = action === "highlight" 
    ? {
        backgroundColor: color,
        padding: "2px 4px",
        borderRadius: "3px",
        display: "inline",
      }
    : {
        borderBottom: `2px solid ${color}`,
        display: "inline",
      }

  /**
   * CONTEXT7 SOURCE: /websites/magicui_design - Official Magic UI Highlighter component return structure
   * HTML STRUCTURE REASON: Official Magic UI documentation shows simple span wrapper with inline CSS styling
   * REVISION REASON: Simplified HTML structure with pure CSS eliminates positioning conflicts and offset issues
   * 
   * Official Magic UI HTML Pattern:
   * - Simple span element for inline text highlighting
   * - Inline styles for immediate effect application
   * - No complex positioning or z-index complications
   * - Maintains accessibility and semantic meaning
   * 
   * Accessibility Features:
   * - Preserves natural text flow for screen readers
   * - Maintains semantic HTML structure
   * - Compatible with keyboard navigation
   * - No styling interference with text positioning
   */
  return (
    <span 
      style={highlightStyles} 
      className={cn("inline", className)}
    >
      {children}
    </span>
  )
}

export default Highlighter