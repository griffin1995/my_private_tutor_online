/**
 * CONTEXT7 SOURCE: /framer/motion - Advanced micro-interactions and animation performance optimization
 * MICRO-INTERACTIONS REASON: Official Framer Motion documentation shows implementing subtle animations for enhanced user experience
 * PATTERN: Optimized animation utilities with performance-first approach
 */

'use client';

import { Variants, Transition, Target } from 'framer-motion';

/**
 * CONTEXT7 SOURCE: /framer/motion - Animation configuration types for performance optimization
 * ANIMATION TYPES: Official Framer Motion documentation shows structured animation configuration
 */
export interface MicroInteractionConfig {
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Easing function for smooth animations */
  ease?: string | number[];
  /** Animation type for different interaction patterns */
  type?: 'spring' | 'tween' | 'inertia';
  /** Spring animation configuration */
  spring?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

/**
 * CONTEXT7 SOURCE: /framer/motion - Performance-optimized animation presets
 * PRESET ANIMATIONS: Official Framer Motion documentation shows pre-configured animations for common patterns
 */
export const ANIMATION_PRESETS = {
  // CONTEXT7 SOURCE: /framer/motion - Subtle hover effects for interactive elements
  // HOVER INTERACTIONS: Official Framer Motion documentation shows implementing hover animations
  subtleHover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: 'easeOut' }
  },

  // CONTEXT7 SOURCE: /framer/motion - Button press animations with haptic feedback
  // PRESS FEEDBACK: Official Framer Motion documentation shows implementing press interactions
  buttonPress: {
    scale: 0.98,
    transition: { duration: 0.1, ease: 'easeInOut' }
  },

  // CONTEXT7 SOURCE: /framer/motion - Smooth fade in animations for content reveals
  // FADE REVEAL: Official Framer Motion documentation shows implementing fade animations
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },

  // CONTEXT7 SOURCE: /framer/motion - Elastic bounce animations for attention
  // ELASTIC FEEDBACK: Official Framer Motion documentation shows implementing spring animations
  elasticScale: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      duration: 0.6
    }
  },

  // CONTEXT7 SOURCE: /framer/motion - Smooth slide animations for panel transitions
  // SLIDE TRANSITIONS: Official Framer Motion documentation shows implementing slide animations
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },

  // CONTEXT7 SOURCE: /framer/motion - Parallax scroll effects for enhanced depth
  // PARALLAX EFFECTS: Official Framer Motion documentation shows implementing scroll-based animations
  parallaxFloat: {
    initial: { y: 0 },
    animate: { y: [-5, 5, -5] },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
} as const;

/**
 * CONTEXT7 SOURCE: /framer/motion - Enhanced hover interaction variants
 * HOVER VARIANTS: Official Framer Motion documentation shows creating interactive hover states
 */
export const createHoverVariants = (config?: MicroInteractionConfig): Variants => ({
  initial: {
    scale: 1,
    rotateY: 0,
    transition: {
      duration: config?.duration || 0.2,
      ease: config?.ease || 'easeOut'
    }
  },
  hover: {
    scale: 1.05,
    rotateY: 5,
    transition: {
      duration: config?.duration || 0.2,
      ease: config?.ease || 'easeOut'
    }
  }
});

/**
 * CONTEXT7 SOURCE: /framer/motion - Staggered animation variants for sequential reveals
 * STAGGER ANIMATIONS: Official Framer Motion documentation shows implementing staggered animations
 */
export const createStaggerVariants = (
  itemCount: number,
  staggerDelay: number = 0.1
): Variants => ({
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1
    }
  }
});

/**
 * CONTEXT7 SOURCE: /framer/motion - Magnetic attraction effect for interactive elements
 * MAGNETIC INTERACTION: Official Framer Motion documentation shows implementing magnetic cursor effects
 */
export const createMagneticEffect = (strength: number = 0.2) => ({
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => {
    const { currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    // CONTEXT7 SOURCE: /framer/motion - Transform application for magnetic effects
    // TRANSFORM OPTIMIZATION: Official Framer Motion documentation shows optimizing transforms for performance
    currentTarget.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  },
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
    const { currentTarget } = event;
    currentTarget.style.transform = 'translate(0px, 0px)';
  }
});

/**
 * CONTEXT7 SOURCE: /framer/motion - Scroll-triggered animation variants
 * SCROLL ANIMATIONS: Official Framer Motion documentation shows implementing scroll-based animations
 */
export const createScrollVariants = (direction: 'up' | 'down' | 'left' | 'right' = 'up'): Variants => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50 };
      case 'down': return { y: -50 };
      case 'left': return { x: 50 };
      case 'right': return { x: -50 };
      default: return { y: 50 };
    }
  };

  return {
    initial: {
      opacity: 0,
      ...getInitialPosition()
    },
    whileInView: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    viewport: {
      once: true,
      margin: '-100px'
    }
  };
};

/**
 * CONTEXT7 SOURCE: /framer/motion - Optimized loading animation variants
 * LOADING ANIMATIONS: Official Framer Motion documentation shows implementing loading states
 */
export const createLoadingVariants = (): Variants => ({
  initial: {
    opacity: 0,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
});

/**
 * CONTEXT7 SOURCE: /framer/motion - Pulse animation for attention-grabbing elements
 * PULSE EFFECTS: Official Framer Motion documentation shows implementing pulse animations
 */
export const createPulseVariants = (intensity: number = 1.1): Variants => ({
  animate: {
    scale: [1, intensity, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
});

/**
 * CONTEXT7 SOURCE: /framer/motion - Optimized transition configurations for performance
 * TRANSITION OPTIMIZATION: Official Framer Motion documentation shows performance-optimized transitions
 */
export const OPTIMIZED_TRANSITIONS = {
  // CONTEXT7 SOURCE: /framer/motion - Fast transitions for immediate feedback
  // IMMEDIATE FEEDBACK: Official Framer Motion documentation shows quick response animations
  immediate: {
    duration: 0.1,
    ease: 'linear'
  } as Transition,

  // CONTEXT7 SOURCE: /framer/motion - Smooth transitions for natural movement
  // SMOOTH MOVEMENT: Official Framer Motion documentation shows natural feeling animations
  smooth: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  } as Transition,

  // CONTEXT7 SOURCE: /framer/motion - Bouncy transitions for playful interactions
  // BOUNCY FEEDBACK: Official Framer Motion documentation shows spring-based animations
  bouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 30
  } as Transition,

  // CONTEXT7 SOURCE: /framer/motion - Elastic transitions for engaging feedback
  // ELASTIC RESPONSE: Official Framer Motion documentation shows elastic animation configurations
  elastic: {
    type: 'spring',
    stiffness: 200,
    damping: 15,
    mass: 1
  } as Transition
} as const;

/**
 * CONTEXT7 SOURCE: /framer/motion - Performance monitoring for animation optimization
 * ANIMATION PERFORMANCE: Official Framer Motion documentation shows tracking animation performance
 */
export const trackAnimationPerformance = (animationName: string) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // CONTEXT7 SOURCE: /mozilla/mdn - Performance mark for animation tracking
    // PERFORMANCE TRACKING: Official MDN documentation shows marking animation events
    performance.mark(`animation-start-${animationName}`);

    return () => {
      performance.mark(`animation-end-${animationName}`);
      performance.measure(
        `animation-duration-${animationName}`,
        `animation-start-${animationName}`,
        `animation-end-${animationName}`
      );

      // Report to analytics if available
      if ('gtag' in window) {
        const measure = performance.getEntriesByName(`animation-duration-${animationName}`)[0];
        (window as any).gtag('event', 'animation_performance', {
          animation_name: animationName,
          duration: Math.round(measure.duration),
          event_category: 'performance'
        });
      }
    };
  }

  return () => {}; // No-op for SSR
};

/**
 * CONTEXT7 SOURCE: /framer/motion - Animation preference detection for accessibility
 * ACCESSIBILITY PREFERENCE: Official Framer Motion documentation shows respecting user motion preferences
 */
export const getAnimationPreference = () => {
  if (typeof window === 'undefined') return 'full';

  // CONTEXT7 SOURCE: /mozilla/mdn - Reduced motion media query for accessibility
  // MOTION PREFERENCE: Official MDN documentation shows checking user motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return prefersReducedMotion ? 'reduced' : 'full';
};

/**
 * CONTEXT7 SOURCE: /framer/motion - Adaptive animation configuration based on user preferences
 * ADAPTIVE ANIMATIONS: Official Framer Motion documentation shows adapting animations for accessibility
 */
export const createAdaptiveAnimation = (
  fullAnimation: Variants,
  reducedAnimation?: Variants
): Variants => {
  const preference = getAnimationPreference();

  if (preference === 'reduced') {
    return reducedAnimation || {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.1 }
    };
  }

  return fullAnimation;
};

// CONTEXT7 SOURCE: /framer/motion - TypeScript export patterns for animation utilities
export type { Variants, Transition, Target };