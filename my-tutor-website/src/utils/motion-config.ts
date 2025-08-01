/**
 * Documentation Source: Framer Motion + WCAG 2.1 Guidelines
 * Reference: https://www.framer.com/motion/guide-accessibility/
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
 * 
 * Pattern: Motion Configuration Utility
 * Architecture:
 * - Centralised motion configuration for consistent animations
 * - Accessibility-first approach with reduced motion support
 * - Reusable animation variants for common UI patterns
 * - TypeScript interfaces for type safety
 * 
 * WCAG Compliance:
 * - Respects prefers-reduced-motion media query
 * - Provides non-animated fallbacks
 * - Maintains functionality without animations
 * 
 * Usage:
 * ```tsx
 * import { createMotionVariants, getMotionConfig } from '@/utils/motion-config'
 * 
 * const variants = createMotionVariants('fadeInUp', shouldReduceMotion)
 * const config = getMotionConfig(shouldReduceMotion)
 * ```
 */

export interface MotionConfig {
  duration: number
  ease: string | number[]
  stiffness?: number
  damping?: number
  mass?: number
}

export interface AnimationVariants {
  initial: object
  animate: object
  exit?: object
  hover?: object
  tap?: object
}

/**
 * Base motion configuration respecting user preferences
 */
export function getMotionConfig(shouldReduceMotion: boolean): MotionConfig {
  if (shouldReduceMotion) {
    return {
      duration: 0,
      ease: 'linear'
    }
  }

  return {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
    stiffness: 100,
    damping: 15,
    mass: 1
  }
}

/**
 * Pre-configured animation variants for common patterns
 */
export const animationVariants = {
  // Fade animations
  fadeIn: (shouldReduceMotion: boolean): AnimationVariants => ({
    initial: shouldReduceMotion ? {} : { opacity: 0 },
    animate: shouldReduceMotion ? {} : { opacity: 1 },
    exit: shouldReduceMotion ? {} : { opacity: 0 }
  }),

  fadeInUp: (shouldReduceMotion: boolean): AnimationVariants => ({
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    exit: shouldReduceMotion ? {} : { opacity: 0, y: -20 }
  }),

  fadeInDown: (shouldReduceMotion: boolean): AnimationVariants => ({
    initial: shouldReduceMotion ? {} : { opacity: 0, y: -20 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    exit: shouldReduceMotion ? {} : { opacity: 0, y: 20 }
  }),

  fadeInLeft: (shouldReduceMotion: boolean): AnimationVariants => ({
    initial: shouldReduceMotion ? {} : { opacity: 0, x: -20 },
    animate: shouldReduceMotion ? {} : { opacity: 1, x: 0 },
    exit: shouldReduceMotion ? {} : { opacity: 0, x: 20 }
  }),

  fadeInRight: (shouldReduceMotion: boolean): AnimationVariants => ({
    initial: shouldReduceMotion ? {} : { opacity: 0, x: 20 },
    animate: shouldReduceMotion ? {} : { opacity: 1, x: 0 },
    exit: shouldReduceMotion ? {} : { opacity: 0, x: -20 }
  }),

  // Scale animations
  scaleIn: (shouldReduceMotion: boolean): AnimationVariants => ({
    initial: shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 },
    animate: shouldReduceMotion ? {} : { opacity: 1, scale: 1 },
    exit: shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }
  }),

  scaleOut: (shouldReduceMotion: boolean): AnimationVariants => ({
    initial: shouldReduceMotion ? {} : { opacity: 0, scale: 1.1 },
    animate: shouldReduceMotion ? {} : { opacity: 1, scale: 1 },
    exit: shouldReduceMotion ? {} : { opacity: 0, scale: 1.1 }
  }),

  // Button animations
  buttonHover: (shouldReduceMotion: boolean): AnimationVariants => ({
    initial: {},
    animate: {},
    hover: shouldReduceMotion ? {} : { scale: 1.02, y: -2 },
    tap: shouldReduceMotion ? {} : { scale: 0.98 }
  }),

  // Card animations
  cardHover: (shouldReduceMotion: boolean): AnimationVariants => ({
    initial: {},
    animate: {},
    hover: shouldReduceMotion ? {} : { 
      scale: 1.02, 
      y: -4,
      transition: { duration: 0.2 }
    }
  }),

  // Stagger container
  staggerContainer: (shouldReduceMotion: boolean): AnimationVariants => ({
    initial: {},
    animate: shouldReduceMotion ? {} : {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }),

  // Page transitions
  pageTransition: (shouldReduceMotion: boolean): AnimationVariants => ({
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    animate: shouldReduceMotion ? {} : { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: shouldReduceMotion ? {} : { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  })
}

/**
 * Create animation variants based on animation type and motion preference
 */
export function createMotionVariants(
  animationType: keyof typeof animationVariants,
  shouldReduceMotion: boolean
): AnimationVariants {
  return animationVariants[animationType](shouldReduceMotion)
}

/**
 * Transition presets for different animation speeds
 */
export const transitionPresets = {
  fast: (shouldReduceMotion: boolean) => shouldReduceMotion 
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
    
  normal: (shouldReduceMotion: boolean) => shouldReduceMotion 
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    
  slow: (shouldReduceMotion: boolean) => shouldReduceMotion 
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    
  spring: (shouldReduceMotion: boolean) => shouldReduceMotion 
    ? { duration: 0 }
    : { type: 'spring', stiffness: 100, damping: 15, mass: 1 },
    
  bounce: (shouldReduceMotion: boolean) => shouldReduceMotion 
    ? { duration: 0 }
    : { type: 'spring', stiffness: 200, damping: 8, mass: 1 }
}

/**
 * Higher-order function to create motion-aware components
 */
export function withMotionProps<T extends object>(
  baseProps: T,
  motionProps: object,
  shouldReduceMotion: boolean
): T {
  if (shouldReduceMotion) {
    return baseProps
  }
  
  return {
    ...baseProps,
    ...motionProps
  }
}

/**
 * Utility to conditionally apply animations
 */
export function conditionalAnimation<T>(
  animatedProps: T,
  staticProps: T,
  shouldReduceMotion: boolean
): T {
  return shouldReduceMotion ? staticProps : animatedProps
}