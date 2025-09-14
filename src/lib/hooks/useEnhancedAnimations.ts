/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Custom React hooks for animation management
 * CUSTOM HOOKS REASON: Official React documentation shows creating reusable hooks for complex state management
 * PATTERN: Enhanced animation hook with performance monitoring and user preference detection
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView, useAnimation, AnimationControls } from 'framer-motion';
import {
  getAnimationPreference,
  trackAnimationPerformance,
  OPTIMIZED_TRANSITIONS,
  type MicroInteractionConfig
} from '@/lib/animations/micro-interactions';

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface for hook configuration
 * INTERFACE DESIGN: Official React documentation shows structured hook configuration patterns
 */
interface EnhancedAnimationOptions {
  /** Threshold for intersection observer */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Whether to animate only once */
  once?: boolean;
  /** Custom animation name for performance tracking */
  trackingName?: string;
  /** Enable micro-interactions */
  enableMicroInteractions?: boolean;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Return type for enhanced animation hook
 * HOOK RETURN TYPE: Official React documentation shows defining comprehensive return types for hooks
 */
interface EnhancedAnimationResult {
  /** Ref to attach to animated element */
  ref: React.RefObject<HTMLElement>;
  /** Animation controls */
  controls: AnimationControls;
  /** Whether element is in view */
  inView: boolean;
  /** Animation preference (full/reduced) */
  animationPreference: 'full' | 'reduced';
  /** Trigger animation manually */
  triggerAnimation: () => void;
  /** Reset animation state */
  resetAnimation: () => void;
  /** Performance tracking cleanup function */
  cleanupTracking: () => void;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Enhanced animation hook with performance monitoring
 * ANIMATION HOOK: Official React documentation shows creating hooks for complex animation logic
 */
export const useEnhancedAnimations = (
  options: EnhancedAnimationOptions = {}
): EnhancedAnimationResult => {
  const {
    threshold = 0.1,
    rootMargin = '-50px',
    delay = 0,
    once = true,
    trackingName = 'generic-animation',
    enableMicroInteractions = true
  } = options;

  // CONTEXT7 SOURCE: /reactjs/react.dev - useRef for DOM element reference
  // REF MANAGEMENT: Official React documentation shows using refs for DOM access
  const ref = useRef<HTMLElement>(null);

  // CONTEXT7 SOURCE: /framer/motion - Animation controls for programmatic animation
  // ANIMATION CONTROLS: Official Framer Motion documentation shows using animation controls
  const controls = useAnimation();

  // CONTEXT7 SOURCE: /framer/motion - Intersection observer hook for scroll animations
  // SCROLL DETECTION: Official Framer Motion documentation shows using intersection observer
  const inView = useInView(ref, {
    threshold,
    rootMargin,
    once
  });

  // CONTEXT7 SOURCE: /reactjs/react.dev - useState for animation preference tracking
  // STATE MANAGEMENT: Official React documentation shows managing component state
  const [animationPreference, setAnimationPreference] = useState<'full' | 'reduced'>('full');
  const [trackingCleanup, setTrackingCleanup] = useState<(() => void) | null>(null);

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for animation preference detection
  // PREFERENCE DETECTION: Official React documentation shows using useEffect for side effects
  useEffect(() => {
    const preference = getAnimationPreference();
    setAnimationPreference(preference);

    // CONTEXT7 SOURCE: /mozilla/mdn - Media query change listener for dynamic preference updates
    // DYNAMIC PREFERENCES: Official MDN documentation shows listening for media query changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setAnimationPreference(getAnimationPreference());
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // CONTEXT7 SOURCE: /reactjs/react.dev - useCallback for performance optimization
  // CALLBACK OPTIMIZATION: Official React documentation shows optimizing callbacks with useCallback
  const triggerAnimation = useCallback(() => {
    if (!ref.current) return;

    // CONTEXT7 SOURCE: /framer/motion - Performance tracking for animation start
    // ANIMATION TRACKING: Official Framer Motion documentation shows tracking animation performance
    const cleanup = trackAnimationPerformance(trackingName);
    setTrackingCleanup(() => cleanup);

    // CONTEXT7 SOURCE: /framer/motion - Animation execution with preference consideration
    // ADAPTIVE ANIMATION: Official Framer Motion documentation shows adapting animations based on preferences
    if (animationPreference === 'reduced') {
      controls.start({
        opacity: 1,
        transition: OPTIMIZED_TRANSITIONS.immediate
      });
    } else {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          ...OPTIMIZED_TRANSITIONS.smooth,
          delay
        }
      });
    }
  }, [controls, animationPreference, delay, trackingName]);

  // CONTEXT7 SOURCE: /reactjs/react.dev - useCallback for animation reset functionality
  // RESET CALLBACK: Official React documentation shows creating callback functions for state reset
  const resetAnimation = useCallback(() => {
    if (animationPreference === 'reduced') {
      controls.set({
        opacity: 0
      });
    } else {
      controls.set({
        opacity: 0,
        y: 20,
        scale: 0.95
      });
    }
  }, [controls, animationPreference]);

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for scroll-triggered animations
  // SCROLL ANIMATION: Official React documentation shows using useEffect for external triggers
  useEffect(() => {
    if (inView) {
      triggerAnimation();
    }
  }, [inView, triggerAnimation]);

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for micro-interaction setup
  // MICRO-INTERACTIONS: Official React documentation shows setting up event listeners
  useEffect(() => {
    if (!enableMicroInteractions || !ref.current) return;

    const element = ref.current;

    // CONTEXT7 SOURCE: /framer/motion - Hover micro-interactions
    // HOVER EFFECTS: Official Framer Motion documentation shows implementing hover animations
    const handleMouseEnter = () => {
      if (animationPreference === 'full') {
        controls.start({
          scale: 1.02,
          transition: OPTIMIZED_TRANSITIONS.immediate
        });
      }
    };

    const handleMouseLeave = () => {
      if (animationPreference === 'full') {
        controls.start({
          scale: 1,
          transition: OPTIMIZED_TRANSITIONS.immediate
        });
      }
    };

    // CONTEXT7 SOURCE: /framer/motion - Focus micro-interactions for accessibility
    // FOCUS EFFECTS: Official Framer Motion documentation shows implementing focus animations
    const handleFocus = () => {
      if (animationPreference === 'full') {
        controls.start({
          boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
          transition: OPTIMIZED_TRANSITIONS.immediate
        });
      }
    };

    const handleBlur = () => {
      controls.start({
        boxShadow: '0 0 0 0px rgba(59, 130, 246, 0)',
        transition: OPTIMIZED_TRANSITIONS.immediate
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, [controls, animationPreference, enableMicroInteractions]);

  // CONTEXT7 SOURCE: /reactjs/react.dev - Cleanup function for performance tracking
  // CLEANUP MANAGEMENT: Official React documentation shows managing cleanup functions
  const cleanupTracking = useCallback(() => {
    if (trackingCleanup) {
      trackingCleanup();
      setTrackingCleanup(null);
    }
  }, [trackingCleanup]);

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for component unmount cleanup
  // UNMOUNT CLEANUP: Official React documentation shows cleanup on component unmount
  useEffect(() => {
    return () => {
      cleanupTracking();
    };
  }, [cleanupTracking]);

  return {
    ref,
    controls,
    inView,
    animationPreference,
    triggerAnimation,
    resetAnimation,
    cleanupTracking
  };
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Specialized hook for staggered animations
 * STAGGER HOOK: Official React documentation shows creating specialized hooks for complex animations
 */
export const useStaggeredAnimations = (
  itemCount: number,
  staggerDelay: number = 0.1,
  options: EnhancedAnimationOptions = {}
) => {
  const controls = useAnimation();
  const [animationPreference] = useState(() => getAnimationPreference());

  // CONTEXT7 SOURCE: /reactjs/react.dev - useCallback for staggered animation trigger
  // STAGGER CALLBACK: Official React documentation shows optimizing complex callback functions
  const triggerStaggered = useCallback(async () => {
    const trackingCleanup = trackAnimationPerformance(`staggered-${itemCount}-items`);

    try {
      if (animationPreference === 'reduced') {
        await controls.start({
          opacity: 1,
          transition: OPTIMIZED_TRANSITIONS.immediate
        });
      } else {
        await controls.start({
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: options.delay || 0,
            ...OPTIMIZED_TRANSITIONS.smooth
          }
        });
      }
    } finally {
      trackingCleanup();
    }
  }, [controls, animationPreference, itemCount, staggerDelay, options.delay]);

  return {
    controls,
    triggerStaggered,
    animationPreference
  };
};

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript export patterns for hook utilities
export type { EnhancedAnimationOptions, EnhancedAnimationResult };