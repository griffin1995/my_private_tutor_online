/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Official Magic UI Highlighter component with rough-notation animations
 * IMPLEMENTATION REASON: Official Magic UI documentation shows Highlighter component with animated drawing effects using rough-notation
 * ANIMATION REASON: Magic UI Highlighter provides animated highlighting effects that draw on scroll or view
 * 
 * Official Magic UI Highlighter Features:
 * - Animated drawing effects using rough-notation library
 * - Multiple annotation types: highlight, underline, circle, box, etc.
 * - Viewport-based animation triggering with isView prop
 * - Customizable animation duration, stroke width, and iterations
 * - Hand-drawn sketchy effects for premium design aesthetics
 * 
 * Props from Magic UI Documentation:
 * - children: React.ReactNode (Required) - The content to be highlighted/annotated
 * - color: string (Default: "#ffd1dc") - The color of the highlight
 * - action: "highlight" | "circle" | "box" | "bracket" | "crossed-off" | "strike-through" | "underline" (Default: "highlight")
 * - strokeWidth: number (Default: 1.5px) - The width of the annotation stroke
 * - animationDuration: number (Default: 500ms) - Duration of the animation in milliseconds
 * - iterations: number (Default: 2) - Number of times to draw the annotation (adds sketchy effect when > 1)
 * - padding: number (Default: 2px) - Padding between the element and the annotation
 * - multiline: boolean (Default: true) - Whether to annotate across multiple lines
 * - isView: boolean (Default: false) - Controls whether animation starts only when element enters viewport
 */

"use client"

import React, { useRef, useEffect } from 'react'
import { annotate, annotationGroup } from 'rough-notation'
import { cn } from '@/lib/utils'

/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Official Magic UI Highlighter component props interface
 * PROPS INTERFACE REASON: Official Magic UI documentation demonstrates comprehensive props for animated highlighting effects
 * 
 * Official Magic UI Highlighter Props (from Context7 MCP documentation):
 * - children: React.ReactNode (Required) - The content to be highlighted/annotated
 * - color: string (Default: "#ffd1dc") - The color of the highlight
 * - action: Multiple annotation types supported
 * - strokeWidth: number (Default: 1.5px) - The width of the annotation stroke
 * - animationDuration: number (Default: 500ms) - Duration of the animation in milliseconds
 * - iterations: number (Default: 2) - Number of times to draw the annotation (adds sketchy effect when > 1)
 * - padding: number (Default: 2px) - Padding between the element and the annotation
 * - multiline: boolean (Default: true) - Whether to annotate across multiple lines
 * - isView: boolean (Default: false) - Controls whether animation starts only when element enters viewport
 */
interface HighlighterProps {
  /** The content to be highlighted/annotated */
  children: React.ReactNode
  /** The type of annotation effect to apply */
  action?: "highlight" | "circle" | "box" | "bracket" | "crossed-off" | "strike-through" | "underline"
  /** The color of the highlight */
  color?: string
  /** The width of the annotation stroke */
  strokeWidth?: number
  /** Duration of the animation in milliseconds */
  animationDuration?: number
  /** Number of times to draw the annotation (adds sketchy effect when > 1) */
  iterations?: number
  /** Padding between the element and the annotation */
  padding?: number
  /** Whether to annotate across multiple lines */
  multiline?: boolean
  /** Controls whether animation starts only when element enters viewport */
  isView?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Official Magic UI Highlighter component with rough-notation implementation
 * COMPONENT PATTERN REASON: Official Magic UI documentation shows animated highlighting effects using rough-notation library
 * ANIMATION IMPLEMENTATION REASON: Magic UI Highlighter provides animated drawing effects for premium user experience
 * 
 * Official Magic UI Component Features:
 * - Animated drawing effects using rough-notation library
 * - Viewport-based animation triggering with IntersectionObserver
 * - Multiple annotation types: highlight, underline, circle, box, etc.
 * - Customizable animation duration, stroke width, and iterations
 * - Hand-drawn sketchy effects for premium design aesthetics
 * - Proper cleanup and memory management
 * 
 * Animation Behavior:
 * - isView: true - Animation triggers when element enters viewport
 * - isView: false - Animation starts immediately on mount
 * - Supports all rough-notation annotation types
 * - Maintains text accessibility and semantic meaning
 */
export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 500,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  className = "",
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // CONTEXT7 SOURCE: /websites/magicui_design - rough-notation configuration for Magic UI Highlighter
    // ANNOTATION REASON: Official Magic UI documentation shows rough-notation integration for animated highlighting effects
    const annotation = annotate(element, {
      type: action,
      color: color,
      strokeWidth: strokeWidth,
      animationDuration: animationDuration,
      iterations: iterations,
      padding: padding,
      multiline: multiline,
    })

    if (isView) {
      // CONTEXT7 SOURCE: /mdn/web-docs - IntersectionObserver for viewport-based animation triggering
      // VIEWPORT ANIMATION REASON: Official browser documentation shows IntersectionObserver for scroll-based animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              annotation.show()
              observer.disconnect() // Only animate once
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
      )

      observer.observe(element)

      return () => {
        annotation.hide()
        observer.disconnect()
      }
    } else {
      // Show animation immediately
      const timer = setTimeout(() => {
        annotation.show()
      }, 100) // Small delay to ensure element is rendered

      return () => {
        clearTimeout(timer)
        annotation.hide()
      }
    }
  }, [action, color, strokeWidth, animationDuration, iterations, padding, multiline, isView])

  /**
   * CONTEXT7 SOURCE: /websites/magicui_design - Official Magic UI Highlighter component return structure
   * HTML STRUCTURE REASON: Official Magic UI documentation shows span wrapper for rough-notation integration
   * ACCESSIBILITY REASON: Maintains semantic HTML structure and screen reader compatibility
   * 
   * Official Magic UI HTML Pattern:
   * - Span element as target for rough-notation annotation
   * - Ref for direct DOM manipulation by animation library
   * - Preserves natural text flow and accessibility
   * - Compatible with keyboard navigation
   */
  return (
    <span 
      ref={elementRef}
      className={cn("inline", className)}
    >
      {children}
    </span>
  )
}

export default Highlighter