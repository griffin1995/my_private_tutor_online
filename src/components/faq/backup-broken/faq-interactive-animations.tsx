/**
 * CONTEXT7 SOURCE: /context7/motion_dev - Comprehensive interactive animation system for FAQ components
 * TASK 18 IMPLEMENTATION: Advanced animation patterns with gesture support and loading skeletons
 * 
 * FAQ Interactive Animations - Premium Animation System
 * Comprehensive animation system providing sophisticated interactions across the FAQ interface
 * 
 * BUSINESS CONTEXT: Royal client quality standards with premium interaction patterns
 * ANIMATION FEATURES: Stagger effects, gesture interactions, loading states, and smooth transitions
 * PERFORMANCE TARGET: 60fps animations with GPU acceleration and reduced motion support
 * 
 * FEATURES IMPLEMENTED:
 * - Stagger animations for list items with sequential reveals
 * - Smooth height transitions for accordion expansions
 * - Gesture-based interactions for mobile touch interfaces
 * - Loading skeletons with shimmer effects
 * - Hover animations with scale and shadow effects
 * - Touch feedback with haptic-like visual responses
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content via centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: Context7 source citations
 * - Rule 25: British English throughout
 */

"use client"

import React from 'react'
// CONTEXT7 SOURCE: /context7/motion_dev - Advanced animation patterns with stagger effects and gesture-based interactions
// TASK 18 REASON: Official Motion documentation recommends comprehensive animation system for premium user interactions
import { 
  m, 
  AnimatePresence, 
  useAnimation, 
  useMotionValue, 
  useTransform,
  useInView,
  useDragControls,
  useSpring
} from 'framer-motion'
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  MousePointer, 
  Hand,
  Touch,
  Smartphone,
  Monitor,
  Zap,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /context7/motion_dev - Advanced animation variant patterns
// ANIMATION VARIANTS: Comprehensive animation patterns for premium FAQ interactions
const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
    rotateX: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 300,
      damping: 25,
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Stagger container patterns for sequential reveals
// STAGGER CONTAINER: Orchestrated parent-child animation sequences
const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
      when: "beforeChildren"
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Interactive item animations with gesture support
// INTERACTIVE ITEMS: Premium hover and tap interactions with spring physics
const interactiveItemVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderColor: "rgba(148, 163, 184, 0.3)"
  },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    borderColor: "rgba(59, 130, 246, 0.5)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: 0.3
    }
  },
  tap: {
    scale: 0.97,
    y: -2,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 30,
      duration: 0.1
    }
  },
  drag: {
    scale: 1.05,
    rotate: 2,
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
    zIndex: 50,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Accordion animation patterns for height-aware transitions
// ACCORDION ANIMATIONS: Smooth height transitions with content fade-in sequences
const accordionVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: {
      height: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98]
      },
      opacity: {
        duration: 0.25,
        ease: "easeInOut"
      },
      padding: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  },
  expanded: {
    height: "auto",
    opacity: 1,
    paddingTop: "1rem",
    paddingBottom: "1rem",
    transition: {
      height: {
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98]
      },
      opacity: {
        duration: 0.35,
        delay: 0.15,
        ease: "easeInOut"
      },
      padding: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Loading skeleton animations with shimmer effects
// SHIMMER LOADING: Advanced loading states with gradient animations
const skeletonShimmerVariants = {
  loading: {
    background: [
      "linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)",
      "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 75%, #f0f0f0 100%)",
      "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  },
  loaded: {
    background: "transparent",
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Gesture animation patterns for touch interfaces
// GESTURE ANIMATIONS: Touch-based interactions with visual feedback
const gestureResponseVariants = {
  idle: {
    scale: 1,
    rotate: 0,
    borderColor: "rgba(148, 163, 184, 0.3)"
  },
  swipeLeft: {
    x: -100,
    scale: 0.9,
    rotate: -5,
    borderColor: "rgba(239, 68, 68, 0.5)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  swipeRight: {
    x: 100,
    scale: 0.9,
    rotate: 5,
    borderColor: "rgba(34, 197, 94, 0.5)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  return: {
    x: 0,
    scale: 1,
    rotate: 0,
    borderColor: "rgba(148, 163, 184, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: 0.5
    }
  }
}

interface FAQInteractiveAnimationsProps {
  children: React.ReactNode
  animationType?: 'fadeInUp' | 'stagger' | 'accordion' | 'skeleton' | 'gesture'
  delay?: number
  className?: string
  enableGestures?: boolean
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onHover?: (isHovering: boolean) => void
  onTap?: () => void
  isLoading?: boolean
  dragConstraints?: { left: number; right: number; top: number; bottom: number }
}

/**
 * FAQ Interactive Animations Component
 * CONTEXT7 SOURCE: /context7/motion_dev - Comprehensive animation wrapper for FAQ components
 * PREMIUM ANIMATIONS: Advanced interaction patterns with gesture support and performance optimization
 */
export function FAQInteractiveAnimations({
  children,
  animationType = 'fadeInUp',
  delay = 0,
  className = '',
  enableGestures = true,
  onSwipeLeft,
  onSwipeRight,
  onHover,
  onTap,
  isLoading = false,
  dragConstraints
}: FAQInteractiveAnimationsProps) {
  // CONTEXT7 SOURCE: /context7/motion_dev - Animation state management
  // ANIMATION STATE: Track interaction states for complex animations
  const [isHovered, setIsHovered] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const [gestureState, setGestureState] = React.useState<'idle' | 'swipeLeft' | 'swipeRight' | 'return'>('idle')
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Motion values for fluid interactions
  // MOTION VALUES: Smooth tracking for drag and gesture interactions
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const dragControls = useDragControls()
  
  // Transform values for visual feedback
  const scale = useTransform(x, [-100, 0, 100], [0.9, 1, 0.9])
  const rotate = useTransform(x, [-100, 0, 100], [-5, 0, 5])
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5])
  
  // Spring animations for smooth returns
  const springX = useSpring(x, { stiffness: 400, damping: 25 })
  const springY = useSpring(y, { stiffness: 400, damping: 25 })
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Intersection observer for scroll-triggered animations
  // SCROLL ANIMATIONS: Trigger animations when components enter viewport
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const controls = useAnimation()
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Drag interaction handlers
  // GESTURE HANDLERS: Process drag and swipe gestures with visual feedback
  const handleDragStart = () => {
    setIsDragging(true)
  }
  
  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false)
    const { offset, velocity } = info
    
    // CONTEXT7 SOURCE: /context7/motion_dev - Swipe gesture detection patterns
    // SWIPE DETECTION: Recognize swipe gestures based on velocity and distance
    if (Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500) {
      if (offset.x < 0 && onSwipeLeft) {
        setGestureState('swipeLeft')
        onSwipeLeft()
        setTimeout(() => setGestureState('return'), 300)
      } else if (offset.x > 0 && onSwipeRight) {
        setGestureState('swipeRight')
        onSwipeRight()
        setTimeout(() => setGestureState('return'), 300)
      }
    }
    
    // Return to original position
    x.set(0)
    y.set(0)
  }
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Hover interaction management
  // HOVER MANAGEMENT: Sophisticated hover state tracking with callbacks
  const handleHoverStart = () => {
    setIsHovered(true)
    onHover?.(true)
  }
  
  const handleHoverEnd = () => {
    setIsHovered(false)
    onHover?.(false)
  }
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Tap interaction with haptic-like feedback
  // TAP HANDLING: Process tap interactions with visual confirmation
  const handleTap = () => {
    onTap?.()
    // Visual tap confirmation
    controls.start({
      scale: [1, 0.95, 1.05, 1],
      transition: { duration: 0.3, ease: "easeInOut" }
    })
  }
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Animation orchestration based on viewport
  // SCROLL ORCHESTRATION: Trigger animations when components enter view
  React.useEffect(() => {
    if (isInView && !isLoading) {
      controls.start('visible')
    }
  }, [isInView, isLoading, controls])
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Animation variant selection
  // VARIANT SELECTION: Choose appropriate animation pattern based on type
  const getAnimationVariants = () => {
    switch (animationType) {
      case 'stagger':
        return staggerContainerVariants
      case 'accordion':
        return accordionVariants
      case 'skeleton':
        return skeletonShimmerVariants
      case 'gesture':
        return gestureResponseVariants
      default:
        return fadeInUpVariants
    }
  }
  
  const variants = getAnimationVariants()
  
  // Loading state with skeleton animation
  if (isLoading && animationType === 'skeleton') {
    return (
      <m.div
        ref={ref}
        className={cn("animate-pulse", className)}
        variants={skeletonShimmerVariants}
        animate="loading"
      >
        <div className="space-y-3">
          <m.div className="h-4 rounded-lg" variants={skeletonShimmerVariants} />
          <m.div className="h-4 rounded-lg w-3/4" variants={skeletonShimmerVariants} />
          <m.div className="h-4 rounded-lg w-1/2" variants={skeletonShimmerVariants} />
        </div>
      </m.div>
    )
  }
  
  return (
    <m.div
      ref={ref}
      className={cn("relative", className)}
      variants={variants}
      initial="hidden"
      animate={isInView ? (isLoading ? 'loading' : 'visible') : 'hidden'}
      whileHover={!isDragging ? "hover" : undefined}
      whileTap="tap"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onTap={handleTap}
      // CONTEXT7 SOURCE: /context7/motion_dev - Conditional gesture support
      // GESTURE SUPPORT: Enable drag interactions when gestures are enabled
      drag={enableGestures}
      dragControls={enableGestures ? dragControls : undefined}
      dragConstraints={dragConstraints}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      dragElastic={0.2}
      dragMomentum={false}
      style={{
        x: enableGestures ? springX : 0,
        y: enableGestures ? springY : 0,
        scale: enableGestures ? scale : 1,
        rotate: enableGestures ? rotate : 0,
        opacity: enableGestures ? opacity : 1,
      }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* CONTEXT7 SOURCE: /context7/motion_dev - Gesture indicators for touch interfaces */}
      {/* TOUCH INDICATORS: Visual cues for gesture-enabled elements */}
      {enableGestures && (isHovered || isDragging) && (
        <AnimatePresence>
          <m.div
            className="absolute -top-2 -right-2 bg-accent-500 text-white rounded-full p-1 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Hand className="w-3 h-3" />
          </m.div>
        </AnimatePresence>
      )}
      
      {/* CONTEXT7 SOURCE: /context7/motion_dev - Drag state visual feedback */}
      {/* DRAG FEEDBACK: Visual indication during drag interactions */}
      {isDragging && (
        <m.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-green-500/10 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      
      {children}
    </m.div>
  )
}

/**
 * FAQ Stagger Container - Orchestrated list animations
 * CONTEXT7 SOURCE: /context7/motion_dev - Stagger container patterns for list items
 * STAGGER ANIMATIONS: Sequential reveals with customizable timing
 */
export function FAQStaggerContainer({ 
  children, 
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
}) {
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
            when: "beforeChildren"
          }
        }
      }}
      initial="hidden"
      animate="visible"
    >
      {children}
    </m.div>
  )
}

/**
 * FAQ Interactive Button - Enhanced button with premium animations
 * CONTEXT7 SOURCE: /context7/motion_dev - Interactive button patterns with gesture support
 * PREMIUM BUTTONS: Advanced button interactions with haptic-like feedback
 */
export function FAQInteractiveButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  isLoading = false
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  className?: string
  disabled?: boolean
  isLoading?: boolean
}) {
  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: variant === "primary" 
        ? "0 4px 8px rgba(59, 130, 246, 0.2)" 
        : "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    hover: {
      scale: 1.05,
      boxShadow: variant === "primary" 
        ? "0 8px 16px rgba(59, 130, 246, 0.3)" 
        : "0 4px 8px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    },
    loading: {
      scale: 1.02,
      boxShadow: [
        variant === "primary" 
          ? "0 4px 8px rgba(59, 130, 246, 0.2)" 
          : "0 2px 4px rgba(0, 0, 0, 0.1)",
        variant === "primary" 
          ? "0 8px 16px rgba(59, 130, 246, 0.4)" 
          : "0 4px 8px rgba(0, 0, 0, 0.2)",
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
  
  return (
    <m.button
      className={cn(
        "relative px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2",
        {
          "bg-accent-600 text-white hover:bg-accent-700": variant === "primary",
          "bg-slate-100 text-slate-700 hover:bg-slate-200": variant === "secondary", 
          "bg-transparent text-accent-600 hover:bg-accent-50": variant === "ghost"
        },
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      variants={buttonVariants}
      initial="idle"
      animate={isLoading ? "loading" : "idle"}
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <m.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-4 h-4" />
        </m.div>
      )}
      {children}
    </m.button>
  )
}

/**
 * FAQ Loading Skeleton - Advanced loading states
 * CONTEXT7 SOURCE: /context7/motion_dev - Loading skeleton patterns with shimmer effects
 * SKELETON LOADING: Sophisticated loading states with animated gradients
 */
export function FAQLoadingSkeleton({
  variant = "card",
  className = ""
}: {
  variant?: "card" | "list" | "search" | "accordion"
  className?: string
}) {
  const skeletonElements = {
    card: (
      <div className="space-y-4">
        <m.div className="h-6 rounded-lg w-3/4" variants={skeletonShimmerVariants} />
        <m.div className="h-4 rounded w-full" variants={skeletonShimmerVariants} />
        <m.div className="h-4 rounded w-2/3" variants={skeletonShimmerVariants} />
        <div className="flex space-x-2 mt-4">
          <m.div className="h-6 rounded-full w-16" variants={skeletonShimmerVariants} />
          <m.div className="h-6 rounded-full w-20" variants={skeletonShimmerVariants} />
        </div>
      </div>
    ),
    list: (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <m.div className="h-10 w-10 rounded-full" variants={skeletonShimmerVariants} />
            <div className="flex-1 space-y-2">
              <m.div className="h-4 rounded w-3/4" variants={skeletonShimmerVariants} />
              <m.div className="h-3 rounded w-1/2" variants={skeletonShimmerVariants} />
            </div>
          </div>
        ))}
      </div>
    ),
    search: (
      <div className="space-y-4">
        <m.div className="h-12 rounded-xl w-full" variants={skeletonShimmerVariants} />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <m.div key={i} className="h-10 rounded-lg" variants={skeletonShimmerVariants} />
          ))}
        </div>
      </div>
    ),
    accordion: (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <m.div className="h-5 rounded w-4/5 mb-2" variants={skeletonShimmerVariants} />
            <m.div className="h-3 rounded w-full" variants={skeletonShimmerVariants} />
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <m.div
      className={cn("animate-pulse", className)}
      variants={skeletonShimmerVariants}
      animate="loading"
    >
      {skeletonElements[variant]}
    </m.div>
  )
}

export default FAQInteractiveAnimations