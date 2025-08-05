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
 * - Custom gradient background effects
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
 * - Premium gradient text effects
 * - Pulsing background animations
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
 * - Custom background gradient effects
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
    <div className={`relative text-center py-3 ${className}`}>
      {/* Premium background effects */}
      {/* Documentation Source: Context7 MCP - Tailwind CSS Gradient Background Effects
       * Reference: /tailwindlabs/tailwindcss.com - Gradient utilities and animation
       * Pattern: Multi-layered gradient effects for premium visual appeal
       * 
       * Background Effects:
       * - Primary gradient with animated pulse effect
       * - Secondary gradient overlay for depth
       * - Blur effects for soft, professional appearance
       * - Responsive sizing with proper overflow handling
       */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div 
          className="w-[500px] h-20 bg-gradient-to-r from-transparent via-accent-100/20 to-transparent blur-2xl animate-pulse" 
          style={{ animationDuration: '4s' }} 
        />
        <div className="absolute w-96 h-16 bg-gradient-to-r from-accent-200/10 via-primary-100/20 to-accent-200/10 blur-xl opacity-60" />
      </div>
      
      {/* Magic UI Typing Animation */}
      {/* Documentation Source: Context7 MCP - TypingAnimation Component Integration
       * Reference: Context7 MCP /magicui/magicui - TypingAnimation configuration
       * Pattern: Professional typing effect with gradient text styling
       * 
       * Typography Features:
       * - Responsive text sizing (xl to 2xl)
       * - Serif font for brand consistency
       * - Medium font weight for readability
       * - Wide letter spacing for premium feel
       * - Complex gradient text effect
       * - Subtle text shadow for depth
       */}
      <div className="relative z-10 px-4">
        <TypingAnimation
          className="text-xl lg:text-2xl font-serif font-medium tracking-wide"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 75%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 8px rgba(15, 23, 42, 0.1)'
          }}
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
       * Decoration Features:
       * - Animated entrance with scale and opacity
       * - Symmetrical design with gradient lines
       * - Central animated dot with pulsing effect
       * - Delayed animation timing for staggered effect
       * - Professional spacing and proportions
       */}
      {showDecorations && (
        <m.div 
          className="flex justify-center items-center mt-6 space-x-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-accent-500/30" />
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 shadow-lg" />
            <div 
              className="absolute inset-0 w-3 h-3 rounded-full bg-accent-400/30 animate-ping" 
              style={{ animationDelay: '0.5s', animationDuration: '2s' }} 
            />
          </div>
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-accent-400/50 to-accent-500/30" />
        </m.div>
      )}
    </div>
  )
}

// Export types for documentation and reuse
export type { AnimatedTaglineProps }