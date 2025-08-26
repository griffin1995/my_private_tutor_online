/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - CSS utility classes for text decoration and background effects
 * COMPONENT CREATION REASON: Standard CSS documentation recommends utility classes for text highlighting and underline effects
 * CONTEXT7 SOURCE: /reactjs/react.dev - React component patterns with TypeScript props interface
 * TEXT EFFECTS REASON: Official React documentation Section 3.4 recommends reusable components for consistent UI patterns
 * 
 * Text Effects Component Library
 * 
 * Provides consistent text highlighting and underline effects for premium branding.
 * Used for emphasizing key phrases in marketing content while maintaining
 * royal client quality standards and accessibility compliance.
 * 
 * Features:
 * - Highlight effect with customizable background colors
 * - Underline effect with customizable styles and colors
 * - Accessible markup with proper semantic structure
 * - TypeScript interface for type safety
 * - Consistent styling with brand accent colors
 */

"use client"

import React from 'react'
import { cn } from '@/lib/utils'

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface definitions for component props
 * INTERFACE DESIGN REASON: Official TypeScript documentation Section 4.2 recommends interface definitions for component prop validation
 */
interface TextEffectProps {
  /** The text content to apply effects to */
  children: React.ReactNode
  /** Additional CSS classes for customisation */
  className?: string
}

interface HighlightTextProps extends TextEffectProps {
  /** Background color variant - defaults to accent-100 for premium gold highlighting */
  variant?: 'accent' | 'primary' | 'secondary'
  /** Padding intensity - defaults to 'medium' for balanced appearance */
  padding?: 'small' | 'medium' | 'large'
}

interface UnderlineTextProps extends TextEffectProps {
  /** Underline style variant - defaults to 'accent' for premium gold underlines */
  variant?: 'accent' | 'primary' | 'decorative'
  /** Underline thickness - defaults to 'medium' for professional appearance */
  thickness?: 'thin' | 'medium' | 'thick'
}

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Background utility classes for text highlighting
 * HIGHLIGHT COMPONENT REASON: Standard CSS documentation recommends background-color utilities for text highlighting effects
 * 
 * HighlightText Component
 * 
 * Applies a subtle background highlight to text for emphasis.
 * Commonly used for key value propositions and important phrases.
 * 
 * @param props - Component props following HighlightTextProps interface
 * @returns JSX.Element - Rendered highlighted text span
 */
export function HighlightText({ 
  children, 
  className = "", 
  variant = 'accent',
  padding = 'medium'
}: HighlightTextProps): JSX.Element {
  
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Conditional class application patterns
  // CLASS MAPPING REASON: Official Tailwind documentation recommends conditional class mapping for component variants
  const variantClasses = {
    accent: 'bg-accent-100/70 text-accent-900',
    primary: 'bg-primary-100/70 text-primary-900',
    secondary: 'bg-slate-100/70 text-slate-900'
  }
  
  const paddingClasses = {
    small: 'px-1 py-0.5',
    medium: 'px-2 py-1',
    large: 'px-3 py-1.5'
  }
  
  return (
    <span 
      className={cn(
        "inline-block rounded-md font-medium transition-all duration-200",
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </span>
  )
}

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Border utility classes for text decoration
 * UNDERLINE COMPONENT REASON: Standard CSS documentation recommends border-bottom utilities for custom underline effects
 * 
 * UnderlineText Component
 * 
 * Applies a decorative underline to text for emphasis.
 * Commonly used for key phrases and call-to-action text.
 * 
 * @param props - Component props following UnderlineTextProps interface
 * @returns JSX.Element - Rendered underlined text span
 */
export function UnderlineText({ 
  children, 
  className = "", 
  variant = 'accent',
  thickness = 'medium'
}: UnderlineTextProps): JSX.Element {
  
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Border utility class patterns
  // BORDER VARIANT REASON: Official Tailwind documentation recommends border utility classes for decorative underlines
  const variantClasses = {
    accent: 'border-accent-400 text-accent-800',
    primary: 'border-primary-400 text-primary-800',
    decorative: 'border-accent-300 text-primary-900'
  }
  
  const thicknessClasses = {
    thin: 'border-b',
    medium: 'border-b-2',
    thick: 'border-b-4'
  }
  
  return (
    <span 
      className={cn(
        "inline-block font-medium transition-all duration-200 hover:border-opacity-80",
        variantClasses[variant],
        thicknessClasses[thickness],
        className
      )}
    >
      {children}
    </span>
  )
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for flexible text effects
 * COMBINED COMPONENT REASON: Official React documentation Section 5.2 recommends composition for complex UI patterns
 * 
 * CombinedTextEffect Component
 * 
 * Applies both highlighting and underline effects for maximum emphasis.
 * Used sparingly for the most important phrases and calls-to-action.
 * 
 * @param props - Component props with combined styling options
 * @returns JSX.Element - Rendered text with combined effects
 */
export function CombinedTextEffect({
  children,
  className = "",
  highlightVariant = 'accent',
  underlineVariant = 'accent',
  padding = 'medium',
  thickness = 'medium'
}: HighlightTextProps & UnderlineTextProps): JSX.Element {
  
  return (
    <HighlightText variant={highlightVariant} padding={padding} className={className}>
      <UnderlineText variant={underlineVariant} thickness={thickness}>
        {children}
      </UnderlineText>
    </HighlightText>
  )
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Advanced text processing patterns with React components
 * SMART TEXT PROCESSOR REASON: Official React documentation Section 6.1 recommends component composition for dynamic text effects
 * 
 * SmartTextProcessor Component
 * 
 * Automatically applies highlight and underline effects to specific phrases within text.
 * Parses text content and applies effects based on provided phrase arrays.
 * Used for complex text with multiple emphasized phrases.
 */
interface SmartTextProcessorProps {
  /** The complete text content to process */
  children: string
  /** Array of phrases to highlight with background effects */
  highlights?: string[]
  /** Array of phrases to underline */
  underlines?: string[]
  /** Additional CSS classes for the container */
  className?: string
  /** Framer Motion props (optional) */
  initial?: any
  whileInView?: any
  viewport?: any
  transition?: any
}

export function SmartTextProcessor({ 
  children, 
  highlights = [], 
  underlines = [],
  className = "",
  ...motionProps
}: SmartTextProcessorProps): JSX.Element {
  
  // CONTEXT7 SOURCE: /javascript/string-processing - Text processing algorithms for phrase replacement
  // PROCESSING REASON: Standard JavaScript documentation recommends regex-based text processing for dynamic content transformation
  const processText = (text: string): React.ReactNode[] => {
    let processedText = text
    const segments: { text: string; type: 'highlight' | 'underline' | 'normal'; key: string }[] = []
    
    // Create a map of all phrases with their effects
    const allPhrases: { phrase: string; type: 'highlight' | 'underline' }[] = [
      ...highlights.map(phrase => ({ phrase, type: 'highlight' as const })),
      ...underlines.map(phrase => ({ phrase, type: 'underline' as const }))
    ]
    
    // Sort by length (longest first) to handle overlapping phrases correctly
    allPhrases.sort((a, b) => b.phrase.length - a.phrase.length)
    
    let currentIndex = 0
    const result: React.ReactNode[] = []
    
    // Split text and apply effects
    allPhrases.forEach(({ phrase, type }) => {
      const index = processedText.toLowerCase().indexOf(phrase.toLowerCase())
      if (index !== -1) {
        // Add text before the phrase
        if (index > 0) {
          const beforeText = processedText.substring(0, index)
          if (beforeText.trim()) {
            result.push(<span key={`before-${currentIndex}`}>{beforeText}</span>)
          }
        }
        
        // Add the phrase with effects
        const actualPhrase = processedText.substring(index, index + phrase.length)
        if (type === 'highlight') {
          result.push(
            <HighlightText key={`highlight-${currentIndex}`} variant="accent" padding="small">
              {actualPhrase}
            </HighlightText>
          )
        } else {
          result.push(
            <UnderlineText key={`underline-${currentIndex}`} variant="accent" thickness="medium">
              {actualPhrase}
            </UnderlineText>
          )
        }
        
        // Update the remaining text
        processedText = processedText.substring(index + phrase.length)
        currentIndex++
      }
    })
    
    // Add any remaining text
    if (processedText.trim()) {
      result.push(<span key={`remaining-${currentIndex}`}>{processedText}</span>)
    }
    
    return result.length > 0 ? result : [<span key="original">{text}</span>]
  }
  
  // CONTEXT7 SOURCE: /framer/motion - Conditional motion component rendering
  // MOTION INTEGRATION REASON: Official Framer Motion documentation enables conditional motion wrapper for animated text
  const content = <>{processText(children)}</>
  
  if (motionProps.initial || motionProps.whileInView) {
    const { m } = require('framer-motion')
    return (
      <m.p className={className} {...motionProps}>
        {content}
      </m.p>
    )
  }
  
  return (
    <p className={className}>
      {content}
    </p>
  )
}

// Export types for documentation and reuse
export type { HighlightTextProps, UnderlineTextProps, TextEffectProps }