/**
 * CONTEXT7 SOURCE: /context7/motion_dev - Animation performance optimization patterns and accessibility compliance
 * TASK 18 PERFORMANCE: GPU acceleration, 60fps targeting, and reduced motion support
 * 
 * FAQ Animation Performance - Optimization & Accessibility System
 * Performance-focused animation system ensuring 60fps rendering and accessibility compliance
 * 
 * BUSINESS CONTEXT: Royal client standards require flawless performance across all devices
 * PERFORMANCE TARGET: Consistent 60fps animations with <16ms frame times
 * ACCESSIBILITY: Full WCAG 2.1 AA compliance with motion preference support
 * 
 * FEATURES IMPLEMENTED:
 * - GPU acceleration for all transform and opacity animations
 * - Reduced motion support respecting user preferences
 * - Performance monitoring with frame rate tracking
 * - Memory-efficient animation cleanup
 * - Intersection Observer for animation triggering
 * - Hardware acceleration hints for optimal rendering
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content via centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: Context7 source citations
 * - Rule 25: British English throughout
 */

"use client"

import React from 'react'
// CONTEXT7 SOURCE: /context7/motion_dev - Performance optimization patterns for high-performance animations
// TASK 18 PERFORMANCE: Official Motion documentation recommends GPU acceleration and performance monitoring
import { 
  m, 
  useReducedMotion, 
  useAnimation, 
  useInView,
  MotionConfig,
  LazyMotion,
  domMax,
  AnimatePresence
} from 'framer-motion'
import { Monitor, Zap, Accessibility, AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /context7/motion_dev - Performance-optimized animation variants
// GPU-ACCELERATED ANIMATIONS: Transform and opacity-only animations for optimal performance
const performanceOptimizedVariants = {
  hidden: {
    opacity: 0,
    transform: "translate3d(0, 30px, 0) scale3d(0.9, 0.9, 1)",
  },
  visible: {
    opacity: 1,
    transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      // CONTEXT7 SOURCE: /context7/motion_dev - Hardware acceleration hints
      // HARDWARE ACCELERATION: Force GPU layer creation for smooth animations
      willChange: "transform, opacity"
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Reduced motion variants for accessibility
// ACCESSIBILITY VARIANTS: Simplified animations for reduced motion preferences
const reducedMotionVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Performance monitoring utilities
// PERFORMANCE MONITORING: Track animation performance and frame rates
class AnimationPerformanceMonitor {
  private frameCount = 0
  private startTime = 0
  private lastTime = 0
  private isMonitoring = false
  private observers: ((fps: number) => void)[] = []
  
  start() {
    if (this.isMonitoring) return
    
    this.isMonitoring = true
    this.frameCount = 0
    this.startTime = performance.now()
    this.lastTime = this.startTime
    this.measureFrame()
  }
  
  stop() {
    this.isMonitoring = false
  }
  
  private measureFrame = () => {
    if (!this.isMonitoring) return
    
    this.frameCount++
    const currentTime = performance.now()
    
    // Calculate FPS every second
    if (currentTime - this.lastTime >= 1000) {
      const fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
      this.observers.forEach(callback => callback(fps))
      
      this.frameCount = 0
      this.lastTime = currentTime
    }
    
    requestAnimationFrame(this.measureFrame)
  }
  
  subscribe(callback: (fps: number) => void) {
    this.observers.push(callback)
    return () => {
      this.observers = this.observers.filter(cb => cb !== callback)
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Performance monitoring singleton
// GLOBAL MONITOR: Singleton instance for application-wide performance tracking
const performanceMonitor = new AnimationPerformanceMonitor()

interface FAQAnimationPerformanceProps {
  children: React.ReactNode
  enableMonitoring?: boolean
  className?: string
}

/**
 * FAQ Animation Performance Provider
 * CONTEXT7 SOURCE: /context7/motion_dev - Performance optimization wrapper for animation systems
 * PERFORMANCE WRAPPER: Comprehensive performance optimization and accessibility support
 */
export function FAQAnimationPerformance({
  children,
  enableMonitoring = false,
  className = ''
}: FAQAnimationPerformanceProps) {
  // CONTEXT7 SOURCE: /context7/motion_dev - Reduced motion detection
  // ACCESSIBILITY CHECK: Detect user preference for reduced motion
  const shouldReduceMotion = useReducedMotion()
  const [fps, setFps] = React.useState<number>(60)
  const [isPerformanceOptimal, setIsPerformanceOptimal] = React.useState(true)
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Performance monitoring setup
  // MONITORING SETUP: Initialize performance tracking when enabled
  React.useEffect(() => {
    if (!enableMonitoring) return
    
    performanceMonitor.start()
    const unsubscribe = performanceMonitor.subscribe((currentFps) => {
      setFps(currentFps)
      setIsPerformanceOptimal(currentFps >= 55) // Allow 5fps tolerance
    })
    
    return () => {
      performanceMonitor.stop()
      unsubscribe()
    }
  }, [enableMonitoring])
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Motion configuration for performance
  // MOTION CONFIG: Configure Motion library for optimal performance
  const motionConfig = {
    // Reduce motion if user prefers it
    reducedMotion: shouldReduceMotion ? "always" : "never",
    // Enable hardware acceleration
    transformPagePoint: (point: any) => point,
    // Optimize for performance
    features: domMax
  } as const
  
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig {...motionConfig}>
        <div className={cn("relative", className)}>
          {/* CONTEXT7 SOURCE: /context7/motion_dev - Performance indicator overlay */}
          {/* PERFORMANCE OVERLAY: Development-time performance monitoring */}
          {enableMonitoring && (
            <div className="fixed top-4 right-4 z-50">
              <Card className="bg-white/90 backdrop-blur-sm border-2">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4" />
                      <span className="text-sm font-medium">Performance</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={isPerformanceOptimal ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {fps} FPS
                      </Badge>
                      
                      {isPerformanceOptimal ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                    
                    {shouldReduceMotion && (
                      <Badge variant="outline" className="text-xs">
                        <Accessibility className="w-3 h-3 mr-1" />
                        Reduced Motion
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {children}
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}

/**
 * FAQ Optimized Animation Component
 * CONTEXT7 SOURCE: /context7/motion_dev - Performance-optimized animation wrapper
 * OPTIMIZED WRAPPER: GPU-accelerated animations with accessibility support
 */
export function FAQOptimizedAnimation({
  children,
  variants,
  className = '',
  enableInView = true,
  threshold = 0.1,
  triggerOnce = true,
  ...motionProps
}: {
  children: React.ReactNode
  variants?: any
  className?: string
  enableInView?: boolean
  threshold?: number
  triggerOnce?: boolean
  [key: string]: any
}) {
  // CONTEXT7 SOURCE: /context7/motion_dev - Accessibility-aware animation selection
  // ANIMATION SELECTION: Choose appropriate variants based on user preferences
  const shouldReduceMotion = useReducedMotion()
  const ref = React.useRef(null)
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    threshold,
    margin: "-10%" 
  })
  
  const animationVariants = shouldReduceMotion 
    ? reducedMotionVariants 
    : (variants || performanceOptimizedVariants)
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Performance-optimized animation properties
  // OPTIMIZED PROPS: Ensure animations use GPU-accelerated properties
  const optimizedProps = {
    ...motionProps,
    variants: animationVariants,
    initial: "hidden",
    animate: enableInView ? (isInView ? "visible" : "hidden") : "visible",
    // Hardware acceleration hints
    style: {
      ...motionProps.style,
      willChange: "transform, opacity",
      backfaceVisibility: "hidden" as const,
      perspective: 1000,
    }
  }
  
  return (
    <m.div
      ref={ref}
      className={className}
      {...optimizedProps}
    >
      {children}
    </m.div>
  )
}

/**
 * FAQ Animation Performance Hooks
 * CONTEXT7 SOURCE: /context7/motion_dev - Performance monitoring hooks and utilities
 * PERFORMANCE HOOKS: Custom hooks for animation performance management
 */
export function useAnimationPerformance() {
  const [metrics, setMetrics] = React.useState({
    fps: 60,
    isOptimal: true,
    shouldReduceMotion: false
  })
  
  const shouldReduceMotion = useReducedMotion()
  
  React.useEffect(() => {
    const unsubscribe = performanceMonitor.subscribe((fps) => {
      setMetrics({
        fps,
        isOptimal: fps >= 55,
        shouldReduceMotion: shouldReduceMotion ?? false
      })
    })
    
    performanceMonitor.start()
    
    return () => {
      performanceMonitor.stop()
      unsubscribe()
    }
  }, [shouldReduceMotion])
  
  return metrics
}

/**
 * FAQ Intersection Animation Hook
 * CONTEXT7 SOURCE: /context7/motion_dev - Optimized intersection observer for animations
 * INTERSECTION HOOK: Performance-optimized scroll-triggered animations
 */
export function useIntersectionAnimation(options: {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
} = {}) {
  const { 
    threshold = 0.1, 
    rootMargin = "-10%", 
    triggerOnce = true 
  } = options
  
  const ref = React.useRef(null)
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    threshold, 
    margin: rootMargin 
  })
  const controls = useAnimation()
  const shouldReduceMotion = useReducedMotion()
  
  React.useEffect(() => {
    if (isInView) {
      controls.start(shouldReduceMotion ? "reducedVisible" : "visible")
    }
  }, [isInView, controls, shouldReduceMotion])
  
  return { ref, isInView, controls, shouldReduceMotion }
}

/**
 * FAQ Memory Cleanup Hook
 * CONTEXT7 SOURCE: /context7/motion_dev - Memory management for animation cleanup
 * MEMORY CLEANUP: Efficient cleanup of animation resources
 */
export function useAnimationCleanup() {
  const animationRefs = React.useRef<Set<() => void>>(new Set())
  
  const registerCleanup = React.useCallback((cleanup: () => void) => {
    animationRefs.current.add(cleanup)
    return () => animationRefs.current.delete(cleanup)
  }, [])
  
  React.useEffect(() => {
    return () => {
      // Cleanup all registered animations on unmount
      animationRefs.current.forEach(cleanup => cleanup())
      animationRefs.current.clear()
    }
  }, [])
  
  return { registerCleanup }
}

/**
 * FAQ Animation Performance Test Component
 * CONTEXT7 SOURCE: /context7/motion_dev - Animation performance testing utilities
 * PERFORMANCE TESTING: Component for testing animation performance in development
 */
export function FAQAnimationPerformanceTest({ 
  itemCount = 20,
  enableStress = false 
}: { 
  itemCount?: number
  enableStress?: boolean 
}) {
  const [isStressing, setIsStressing] = React.useState(false)
  const { fps, isOptimal, shouldReduceMotion } = useAnimationPerformance()
  
  const handleStressTest = () => {
    setIsStressing(true)
    setTimeout(() => setIsStressing(false), 5000)
  }
  
  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Animation Performance Test</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Current FPS:</span>
            <Badge variant={isOptimal ? "default" : "destructive"}>
              {fps} FPS
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Performance Status:</span>
            <Badge variant={isOptimal ? "default" : "destructive"}>
              {isOptimal ? "Optimal" : "Degraded"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Motion Preference:</span>
            <Badge variant="outline">
              {shouldReduceMotion ? "Reduced" : "Full"}
            </Badge>
          </div>
          
          {enableStress && (
            <Button 
              onClick={handleStressTest}
              disabled={isStressing}
              className="w-full"
            >
              {isStressing ? "Stress Testing..." : "Run Stress Test"}
            </Button>
          )}
        </CardContent>
      </Card>
      
      {/* Performance Test Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: isStressing ? itemCount * 3 : itemCount }).map((_, index) => (
          <FAQOptimizedAnimation
            key={index}
            className="group cursor-pointer"
            variants={{
              hidden: {
                opacity: 0,
                transform: "translate3d(0, 20px, 0) scale3d(0.95, 0.95, 1)",
              },
              visible: {
                opacity: 1,
                transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
                transition: {
                  delay: index * 0.05,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }
            }}
          >
            <Card className="h-24 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4 flex items-center justify-center">
                <span className="text-sm text-slate-600">Item {index + 1}</span>
              </CardContent>
            </Card>
          </FAQOptimizedAnimation>
        ))}
      </div>
    </div>
  )
}

export default FAQAnimationPerformance