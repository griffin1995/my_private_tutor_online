/**
 * CONTEXT7 SOURCE: /w3c/wcag - WCAG 2.1 Animation from Interactions guidelines
 * ACCESSIBILITY REASON: WCAG documentation for respecting user motion preferences
 * CONTEXT7 SOURCE: /mdn/web-docs - Media queries for prefers-reduced-motion
 * MEDIA QUERY REASON: MDN documentation for detecting motion preferences
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

// CONTEXT7 SOURCE: /facebook/react - React hooks for state and side effects
// HOOKS REASON: React documentation for useState and useEffect patterns
import React, { useState, useEffect } from 'react'

/**
 * CONTEXT7 SOURCE: /facebook/react - Custom hook pattern with use prefix
 * CUSTOM HOOK REASON: React documentation for creating reusable logic hooks
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
 * CONTEXT7 SOURCE: /framer/motion - Framer Motion configuration patterns
 * MOTION CONFIG REASON: Framer Motion documentation for animation configuration
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
 *
 * CONTEXT7 SOURCE: /facebook/react - Higher-order component pattern in TypeScript
 * HOC PATTERN REASON: React documentation for HOC prop injection patterns
 * 
 * Pattern: HOC with additional props injection
 * This HOC injects a shouldReduceMotion prop into the wrapped component
 */
export function withReducedMotion<T extends { shouldReduceMotion?: boolean }>(
  Component: React.ComponentType<T>
) {
  return function WrappedComponent(props: Omit<T, 'shouldReduceMotion'>) {
    const shouldReduceMotion = useReducedMotion()
    
    return (
      <Component 
        {...(props as T)} 
        shouldReduceMotion={shouldReduceMotion}
      />
    )
  }
}