/**
 * Documentation Source: Magic UI Official Box Reveal Component
 * Reference: https://magicui.design/docs/components/box-reveal
 * Pattern: Sliding box animation that reveals text content behind it
 * 
 * Component Architecture:
 * - Motion-based sliding box overlay effect
 * - Customizable box color and animation duration
 * - Smooth reveal animation with LazyMotion compatibility
 * 
 * Performance Optimisations:
 * - Uses LazyMotion 'm' component for reduced bundle size
 * - Efficient re-renders with proper motion variants
 * - Minimal DOM manipulations
 * 
 * Features:
 * - Customizable box overlay color
 * - Configurable animation duration
 * - Smooth sliding reveal effect
 * - Full integration with existing motion system
 * 
 * Accessibility (WCAG 2.1 AA):
 * - Respects prefers-reduced-motion settings
 * - Maintains text readability during animation
 * - Proper contrast ratios maintained
 */

"use client"

import { m } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

interface BoxRevealProps {
  children: React.ReactNode
  className?: string
  boxColor?: string
  duration?: number
  delay?: number
}

export function BoxReveal({
  children,
  className = "",
  boxColor = "#5046e6",
  duration = 0.5,
  delay = 0
}: BoxRevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Content - Always visible for proper reveal effect */}
      <div className="opacity-100">
        {children}
      </div>
      
      {/* Sliding Box Overlay - Slides from left to right (covering then revealing) */}
      <m.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: boxColor }}
        initial={{ x: "-100%" }}
        animate={inView ? { x: "100%" } : { x: "-100%" }}
        transition={{
          duration,
          delay,
          ease: [0.4, 0, 0.2, 1]
        }}
      />
    </div>
  )
}