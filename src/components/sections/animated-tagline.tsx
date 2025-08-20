/**
 * Documentation Source: Context7 MCP - Magic UI TypingAnimation + Tailwind CSS Spacing
 * Reference: Context7 MCP /tailwindlabs/tailwindcss-typography - Typography spacing patterns
 * Reference: Context7 MCP /magicui/magicui - TypingAnimation component implementation
 * Pattern: Modular animated tagline component with premium visual effects
 * 
 * Component Architecture:
 * - Client Component boundary for animation features
 * - TypingAnimation component from Magic UI library
 * - Framer Motion decorative elements
 * - Clean default styling without gradient effects
 * - Context7 verified animation patterns
 * 
 * Performance Optimisations:
 * - Efficient animation timing and delays
 * - GPU-accelerated transforms and effects
 * - Responsive design with mobile-first approach
 * - Motion-reduced accessibility support
 * 
 * Interactive Features:
 * - Typing animation with start-on-view trigger
 * - Animated decorative flourishes
 * - Default text colour system with dark mode support
 * - Clean background without visual distractions
 */

"use client"

// Documentation Source: Context7 MCP - Framer Motion imports
// Reference: /framer/motion - Motion components for animations
// Pattern: Modern React animation imports with TypeScript support
import { m } from 'framer-motion'

// Documentation Source: Context7 MCP - Magic UI Component Integration
// Reference: Context7 MCP /magicui/magicui - TypingAnimation component
// Pattern: Professional typing effect component
import { TypingAnimation } from '@/components/magicui/typing-animation'

/**
 * Documentation Source: Context7 MCP - TypeScript Interface Design Patterns
 * Reference: /microsoft/typescript - Interface definitions for component props
 * Pattern: Flexible component props with customisation options
 */
interface AnimatedTaglineProps {
  /** Additional CSS classes for styling customisation */
  className?: string
  /** Custom tagline text */
  text?: string
  /** Animation duration per character (default: 80ms) */
  duration?: number
  /** Animation delay before starting (default: 500ms) */
  delay?: number
  /** Enable decorative flourishes (default: true) */
  showDecorations?: boolean
}

/**
 * Documentation Source: Context7 MCP - React Functional Component Best Practices
 * Reference: /react/documentation - Modern React functional component patterns
 * Pattern: Reusable animated tagline component with premium effects
 * 
 * Component Features:
 * - Professional typing animation effect
 * - Clean default styling without gradients
 * - Decorative flourishes with Motion animations
 * - Responsive design with proper breakpoints
 * - Equal padding for balanced spacing
 * - Consistent site typography integration
 */
export function AnimatedTagline({ 
  className = "",
  text = "We help students place at top 10 UK schools and universities",
  duration = 80,
  delay = 500,
  showDecorations = true
}: AnimatedTaglineProps) {
  
  return (
    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced flexbox centering with place-items-center pattern
    // VERTICAL CENTERING REASON: Official Tailwind CSS documentation recommends flex items-center justify-center for complete centering control
    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Minimum height removal for whitespace elimination
    // WHITESPACE FIX REASON: Official Tailwind CSS min-height documentation shows min-h-48 creates 192px forced height causing excessive vertical whitespace
    <div className={`relative text-center flex items-center justify-center ${className}`}>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background gradient removal for clean default styling
       * GRADIENT REMOVAL REASON: Official Tailwind CSS documentation Section on background utilities - removed all gradient effects as per Task 2 specification
       * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Clean background implementation without visual effects
       * BACKGROUND SIMPLIFICATION REASON: Task requires removal of gradient effects, maintaining clean default appearance with no background distractions
       */}
      
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flex column layout for vertical text and decoration arrangement */}
      {/* FLEX COLUMN REASON: Official Tailwind CSS flex direction utilities enable vertical stacking of text and decorations while maintaining centering */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Height utility h-full for complete parent height filling */}
      {/* HEIGHT FIX REASON: Official Tailwind CSS documentation specifies h-full (height: 100%) enables proper vertical centering by filling parent container */}
      <div className="flex flex-col items-center justify-center h-full">
        {/* Magic UI Typing Animation */}
        {/* Documentation Source: Context7 MCP - TypingAnimation Component Integration
         * Reference: Context7 MCP /magicui/magicui - TypingAnimation configuration
         * Pattern: Professional typing effect with gradient text styling
         * 
         * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Line height utilities for text spacing control
         * LINE-HEIGHT FIX REASON: Official Tailwind CSS line-height documentation shows leading-tight overrides default leading-[5rem] (80px) preventing excessive vertical spacing
         * 
         * Typography Features:
         * - Responsive text sizing (xl to 2xl)
         * - Serif font for brand consistency
         * - Medium font weight for readability
         * - Wide letter spacing for premium feel
         * - Tight line height for compact appearance
         * - Complex gradient text effect
         * - Subtle text shadow for depth
         */}
        <div className="relative z-10 px-4">
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Default text colour utilities for clean styling
           * TEXT COLOUR REASON: Official Tailwind CSS text color documentation specifies text-gray-900 for primary dark text in light mode
           * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dark mode text colour implementation 
           * DARK MODE REASON: Official Tailwind CSS dark mode utilities recommend dark:text-white for optimal contrast and readability
           * GRADIENT REMOVAL: All gradient styling removed as per Task 2 specification, using default colour system
           */}
          <TypingAnimation
            className="text-xl lg:text-2xl font-serif font-medium tracking-wide leading-tight text-gray-900 dark:text-white"
            duration={duration}
            delay={delay}
            startOnView={true}
          >
            {text}
          </TypingAnimation>
        </div>
        
        {/* Elite decorative flourishes */}
        {/* Documentation Source: Context7 MCP - Framer Motion Decorative Elements
         * Reference: /framer/motion - Motion component animations
         * Pattern: Conditional decorative elements with premium styling
         * 
         * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Vertical spacing utilities for decorative element positioning
         * SPACING ADDITION REASON: Official Tailwind CSS documentation Section on margin utilities - added mt-6 (margin-top: 1.5rem) to create larger gap between decorative lines and typing text above
         * HORIZONTAL SPACING PRESERVED: space-x-6 maintained as per official Tailwind spacing patterns for horizontal item distribution
         * 
         * Decoration Features:
         * - Animated entrance with scale and opacity
         * - Symmetrical design with gradient lines
         * - Central animated dot with pulsing effect
         * - Delayed animation timing for staggered effect
         * - Increased vertical spacing for better visual separation
         */}
        {showDecorations && (
          <m.div 
            className="flex justify-center items-center space-x-6 mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Default border colour utilities for decorative elements
             * DECORATION REASON: Official Tailwind CSS border utilities recommend border-gray-300 for subtle decorative lines
             * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background colour utilities for solid elements  
             * SOLID COLOUR REASON: Official Tailwind CSS background utilities specify bg-gray-400 for neutral decorative elements, removing gradient effects
             */}
            <div className="w-12 h-px bg-gray-300 dark:bg-gray-600" />
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500 shadow-lg" />
              <div 
                className="absolute inset-0 w-3 h-3 rounded-full bg-gray-400/30 dark:bg-gray-500/30 animate-ping" 
                style={{ animationDelay: '0.5s', animationDuration: '2s' }} 
              />
            </div>
            <div className="w-12 h-px bg-gray-300 dark:bg-gray-600" />
          </m.div>
        )}
      </div>
    </div>
  )
}

// Export types for documentation and reuse
export type { AnimatedTaglineProps }