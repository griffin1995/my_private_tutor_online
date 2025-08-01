/**
 * Documentation Source: WCAG 2.1 Guidelines + MDN Media Queries
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
 * Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 * 
 * Pattern: React Hook for Motion Preference Detection
 * Architecture:
 * - Detects user's motion preference setting
 * - Returns boolean for conditional animations
 * - Handles server-side rendering safely
 * - Includes proper cleanup for listeners
 * 
 * WCAG Compliance:
 * - SC 2.3.3 Animation from Interactions (Level AAA)
 * - Respects prefers-reduced-motion: reduce setting
 * - Provides fallback for better user experience
 * 
 * Usage Example:
 * ```tsx
 * const shouldReduceMotion = useReducedMotion()
 * return (
 *   <motion.div
 *     animate={shouldReduceMotion ? {} : { x: 100 }}
 *     transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
 *   >
 *     Content
 *   </motion.div>
 * )
 * ```
 */

import { useState, useEffect } from 'react'

/**
 * Custom hook to detect user's motion preferences
 * @returns boolean - true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  // Default to true for accessibility-first approach
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window === 'undefined') {
      return
    }

    // Create media query for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Set initial state
    setPrefersReducedMotion(mediaQuery.matches)

    // Handler for media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Add event listener for preference changes
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Hook variant that returns motion configuration object
 * Useful for direct integration with Framer Motion
 */
export function useMotionConfig() {
  const shouldReduceMotion = useReducedMotion()
  
  return {
    shouldReduceMotion,
    // Framer Motion configuration
    transition: shouldReduceMotion 
      ? { duration: 0, ease: 'linear' }
      : { duration: 0.3, ease: 'easeOut' },
    // Animation variants
    variants: {
      initial: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
      animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
      exit: shouldReduceMotion ? {} : { opacity: 0, y: -20 }
    }
  }
}

/**
 * Higher-order component for wrapping components with motion preferences
 */
export function withReducedMotion<T extends object>(
  Component: React.ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    const shouldReduceMotion = useReducedMotion()
    
    return (
      <Component 
        {...props} 
        shouldReduceMotion={shouldReduceMotion}
      />
    )
  }
}