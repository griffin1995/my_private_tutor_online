/**
 * CONTEXT7 SOURCE: /magicui/design - Highlighter component implementation with rough-notation library
 * IMPLEMENTATION REASON: Official Magic UI documentation demonstrates annotation-based highlighting with configurable styles
 * CONTEXT7 SOURCE: /rough-notation/annotation - useRef and useEffect patterns for dynamic annotation rendering
 * ANIMATION REASON: Official rough-notation documentation specifies animation lifecycle with cleanup patterns
 * 
 * Component Architecture:
 * - TypeScript interface for comprehensive configuration options
 * - useRef hook for DOM element targeting
 * - useEffect with dependency array for dynamic re-rendering
 * - Cleanup function to prevent memory leaks
 * - Brand color integration for premium tutoring service
 * 
 * Magic UI Pattern:
 * - Supports multiple annotation types (highlight, underline, box, circle, etc.)
 * - Configurable color, stroke width, and animation properties
 * - Minimal inline styling with Tailwind CSS classes
 * - Responsive design considerations for text highlighting
 */

"use client"

import React, { useRef, useEffect, useState } from 'react'
import { annotate } from 'rough-notation'

/**
 * CONTEXT7 SOURCE: /rough-notation/annotation - TypeScript interface for annotation configuration
 * TYPE DEFINITION REASON: Official rough-notation documentation defines comprehensive annotation action types
 * CONTEXT7 SOURCE: /magicui/design - Props interface pattern for flexible component configuration
 * PROPS PATTERN REASON: Magic UI components follow standardized props interface with sensible defaults
 * 
 * Annotation Types:
 * - highlight: Background highlight effect (primary use case)
 * - underline: Underline annotation for emphasis
 * - box: Border box around text
 * - circle: Circular annotation around text
 * - strike-through: Line through text
 * - crossed-off: Cross-out effect
 * - bracket: Bracket notation around text
 */
type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  /** Content to be highlighted - supports text and React nodes */
  children: React.ReactNode
  /** Type of annotation effect to apply */
  action?: AnnotationAction
  /** Color for the annotation - supports CSS color values */
  color?: string
  /** Width of the annotation stroke */
  strokeWidth?: number
  /** Duration of the animation in milliseconds */
  animationDuration?: number
  /** Number of animation iterations */
  iterations?: number
  /** Padding around the annotation */
  padding?: number
  /** Whether to support multiline text highlighting */
  multiline?: boolean
}

/**
 * CONTEXT7 SOURCE: /rough-notation/annotation - React component with useRef and useEffect patterns
 * COMPONENT PATTERN REASON: Official rough-notation documentation demonstrates DOM element targeting with refs
 * CONTEXT7 SOURCE: /magicui/design - Functional component with props destructuring and default values
 * DEFAULTS REASON: Magic UI components provide sensible defaults for immediate usability
 * 
 * Component Features:
 * - Dynamic annotation creation and cleanup
 * - Responsive to prop changes via useEffect dependencies
 * - Memory leak prevention with cleanup function
 * - Brand color integration (gold accent for premium service)
 * - Accessibility-friendly with semantic HTML structure
 * 
 * Default Configuration:
 * - action: "highlight" for primary highlighting use case
 * - color: "#eab308" (gold accent matching brand colors)
 * - strokeWidth: 2 for visibility without overwhelming text
 * - animationDuration: 800ms for smooth, premium feel
 * - iterations: 1 for clean, professional appearance
 * - padding: 4 for appropriate spacing around text
 * - multiline: true for flexible text content support
 */
export function Highlighter({
  children,
  action = "highlight",
  color = "#eab308", // Gold accent from brand colors
  strokeWidth = 2,
  animationDuration = 800,
  iterations = 1,
  padding = 4,
  multiline = true,
}: HighlighterProps) {
  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - useRef hook for DOM element references
   * REF PATTERN REASON: React documentation demonstrates useRef for direct DOM manipulation
   * CONTEXT7 SOURCE: /rough-notation/annotation - Element targeting pattern for annotation library
   * TARGETING REASON: rough-notation requires direct DOM element access for annotation creation
   */
  const elementRef = useRef<HTMLSpanElement>(null)
  
  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - useState hook for component state management
   * STATE REASON: React documentation shows useState for managing component visibility state
   * CONTEXT7 SOURCE: /web-apis/intersection-observer - Scroll-triggered animation patterns
   * SCROLL TRIGGER REASON: Intersection Observer API enables performance-optimized scroll-based animations
   */
  const [isVisible, setIsVisible] = useState(false)

  /**
   * CONTEXT7 SOURCE: /web-apis/intersection-observer - Intersection Observer for scroll-triggered animations
   * OBSERVER PATTERN REASON: Web APIs documentation demonstrates Intersection Observer for performance-optimized scroll detection
   * CONTEXT7 SOURCE: /reactjs/react.dev - useEffect cleanup pattern for event listeners
   * CLEANUP REASON: React documentation emphasizes proper cleanup of observers and event listeners
   */
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(element) // Stop observing once triggered
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of element is visible
        rootMargin: '0px 0px -50px 0px' // Slight delay for better user experience
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  /**
   * CONTEXT7 SOURCE: /reactjs/react.dev - useEffect hook with dependency array for side effects
   * EFFECT PATTERN REASON: React documentation shows useEffect for DOM manipulation and cleanup
   * CONTEXT7 SOURCE: /rough-notation/annotation - Annotation lifecycle management patterns
   * LIFECYCLE REASON: Official rough-notation docs specify annotation creation, show, and cleanup sequence
   * 
   * Scroll-Triggered Animation:
   * - Only creates and shows annotation when element becomes visible
   * - Prevents premature animation execution before user scrolls to content
   * - Provides visual feedback during scroll interaction
   * 
   * Effect Dependencies:
   * - isVisible state triggers annotation creation when element enters viewport
   * - All annotation configuration props for dynamic updates
   * - Prevents stale annotation instances with outdated configuration
   */
  useEffect(() => {
    const element = elementRef.current
    if (element && isVisible) {
      // Create annotation with current configuration
      const annotation = annotate(element, {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      })

      // Show annotation immediately when visible (no delay needed for scroll-triggered)
      annotation.show()

      // Cleanup function to remove annotation
      return () => {
        if (annotation) {
          annotation.remove()
        }
      }
    }
  }, [
    isVisible,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  /**
   * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Utility classes for layout and styling
   * STYLING REASON: Tailwind documentation shows minimal styling approach for component foundations
   * CONTEXT7 SOURCE: /magicui/design - Semantic HTML structure with accessibility considerations
   * SEMANTICS REASON: Magic UI components maintain semantic HTML with proper element selection
   * 
   * HTML Structure:
   * - span element for inline text highlighting
   * - relative positioning for annotation overlay compatibility
   * - inline-block display for proper text flow
   * - bg-transparent to prevent background conflicts with annotation
   * 
   * Accessibility Features:
   * - Maintains text flow for screen readers
   * - Preserves semantic meaning of highlighted content
   * - Compatible with keyboard navigation
   */
  return (
    <span 
      ref={elementRef} 
      className="relative inline-block bg-transparent"
      style={{ 
        position: 'relative',
        zIndex: 1,
        background: 'transparent'
      }}
    >
      {children}
    </span>
  )
}

export default Highlighter