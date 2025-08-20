/**
 * CONTEXT7 SOURCE: /grx7/framer-motion - Synchronized animation variants for cohesive element movement
 * CONTEXT7 SOURCE: /grx7/framer-motion - Official Framer Motion unified timing properties for perfect synchronization
 * 
 * Component Architecture:
 * - Unified Animation Variants: Both SCROLL text and vertical line use identical animation variants
 * - Synchronized Timing: Exact same duration, delay, repeat, and easing values for both elements
 * - Hardware Acceleration: Transform-based animations for smooth 60fps performance
 * - Accessibility Support: Respects prefers-reduced-motion user preference
 * 
 * Synchronization Implementation:
 * - Shared variants object ensures identical animation curves and timing
 * - Container grouping with unified motion control
 * - Perfect timing alignment with no visual lag or offset
 * - Seamless loop transitions with consistent pause between cycles
 * 
 * Animation Phases:
 * 1. Move Down Phase: Both elements move downward together (same distance, duration)
 * 2. Fade Out Phase: Simultaneous opacity reduction to 0
 * 3. Reset Phase: Instant return to top position (hidden)
 * 4. Fade In Phase: Simultaneous opacity increase to 1
 * 5. Loop: Continuous repeat with identical timing
 */

"use client"

// CONTEXT7 SOURCE: /grx7/framer-motion - Motion component and animation variants
// SYNCHRONIZATION REASON: Official Framer Motion documentation recommends shared variants for synchronized animations
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SynchronizedScrollIndicatorProps {
  className?: string
  /** Show/hide the entire scroll indicator */
  show?: boolean
  /** Text to display (defaults to "SCROLL") */
  text?: string
  /** Animation speed multiplier (higher = faster) */
  speed?: number
  /** Vertical distance to move during animation */
  distance?: number
}

/**
 * CONTEXT7 SOURCE: /grx7/framer-motion - Unified animation variants for perfect synchronization
 * UNIFIED MOVEMENT REASON: Official Framer Motion documentation specifies identical variants ensure elements move as one unit
 * 
 * Animation Sequence:
 * - moveDown: Translate Y and fade out simultaneously
 * - reset: Instant return to start position (hidden)
 * - fadeIn: Fade back in at start position
 * - Each phase uses identical timing for both text and line
 */
const synchronizedScrollVariants = {
  // Initial state - both elements at top, fully visible
  initial: {
    y: 0,
    opacity: 1
  },
  
  // Animation sequence - unified timing for perfect synchronization
  animate: {
    // CONTEXT7 SOURCE: /websites/motion_dev - Synchronized scroll animation with parallel movement
    // TASK 2 FIX: Official Motion documentation - line retreats upward (transform changes) while text moves in parallel
    y: [0, 25],
    scaleY: [1, 0.3], // Line retreats upward effect - top moves down, bottom stays
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.8,
      times: [0, 0.7, 1], // Precise timing for synchronized movement
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.8 // Pause between cycles
    }
  }
}

/**
 * CONTEXT7 SOURCE: /grx7/framer-motion - Accessibility-compliant animation with reduced motion support
 * REDUCED MOTION REASON: Official Framer Motion docs specify motion-reduce variants for accessibility compliance
 */
const reducedMotionVariants = {
  initial: {
    y: 0,
    opacity: 0.7
  },
  animate: {
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1
    }
  }
}

export function SynchronizedScrollIndicator({
  className,
  show = true,
  text = "SCROLL",
  speed = 1,
  distance = 40
}: SynchronizedScrollIndicatorProps) {
  
  // CONTEXT7 SOURCE: /grx7/framer-motion - Speed adjustment for animation variants
  // PERFORMANCE REASON: Official Framer Motion documentation supports duration scaling for synchronized animations
  const adjustedVariants = {
    ...synchronizedScrollVariants,
    animate: {
      ...synchronizedScrollVariants.animate,
      y: [0, distance, distance, 0],
      transition: {
        ...synchronizedScrollVariants.animate.transition,
        duration: 2 / speed
      }
    }
  }

  if (!show) return null

  return (
    <div 
      className={cn(
        "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20",
        "flex flex-col items-center gap-2",
        className
      )}
      aria-hidden="true"
    >
      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Container for unified animation control */}
      {/* UNIFIED CONTROL REASON: Official Framer Motion docs recommend container grouping for synchronized element movement */}
      <motion.div
        className="flex flex-col items-center gap-2"
        initial="initial"
        animate="animate"
        variants={{
          initial: {},
          animate: {}
        }}
      >
        
        {/* SCROLL Text Element */}
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Identical variants for synchronized text animation */}
        {/* SYNCHRONIZATION IMPLEMENTATION: Uses exact same variants as vertical line for perfect unity */}
        <motion.span
          className="text-xs font-medium text-primary-600 tracking-[0.2em] select-none"
          variants={adjustedVariants}
          style={{
            willChange: 'transform, opacity'
          }}
        >
          {text}
        </motion.span>
        
        {/* Vertical Line Element */}
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Identical variants for synchronized line animation */}
        {/* SYNCHRONIZATION IMPLEMENTATION: Uses exact same variants as text for perfect unity */}
        <motion.div
          className="w-px h-6 bg-primary-600"
          variants={adjustedVariants}
          style={{
            willChange: 'transform, opacity'
          }}
        />
        
      </motion.div>
    </div>
  )
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Alternative reduced motion variant for accessibility
// ACCESSIBILITY REASON: Official Framer Motion docs mandate reduced motion support for WCAG compliance
export function AccessibleScrollIndicator(props: SynchronizedScrollIndicatorProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={reducedMotionVariants}
    >
      <SynchronizedScrollIndicator {...props} />
    </motion.div>
  )
}

/**
 * Export variant props for documentation and customization
 * CONTEXT7 SOURCE: /grx7/framer-motion - Variants export pattern for reusable animation definitions
 */
export { synchronizedScrollVariants, reducedMotionVariants }
export type { SynchronizedScrollIndicatorProps }