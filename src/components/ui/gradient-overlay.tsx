/**
 * Documentation Source: Context7 MCP - React Component Development
 * Reference: /reactjs/react.dev - Functional components with TypeScript interfaces
 * Reference: /tailwindlabs/tailwindcss.com - Gradient backgrounds and responsive design
 * Reference: /grx7/framer-motion - Gradient animations and transitions
 * 
 * GradientOverlay Component - Premium Background Enhancement
 * 
 * Purpose:
 * - Creates sophisticated gradient overlays for sections
 * - Enhances visual depth and luxury brand positioning
 * - Provides flexible directional gradient options
 * - Supports responsive height adjustments
 * 
 * Features:
 * - Multiple gradient directions (top, bottom, left, right, radial)
 * - Customizable color transitions
 * - Responsive height adjustments
 * - Animation support with Framer Motion
 * - Accessibility-compliant implementation
 * 
 * Usage Examples:
 * <GradientOverlay direction="top" from="primary-900" to="transparent" />
 * <GradientOverlay direction="radial" from="accent-500/20" to="transparent" height="h-32" />
 * <GradientOverlay direction="bottom" colors={["primary-900", "accent-600", "transparent"]} />
 */

"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'

// Documentation Source: Context7 MCP - TypeScript Interface Definitions
// Reference: /reactjs/react.dev - Component props typing patterns
interface GradientOverlayProps {
  /** Gradient direction */
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' | 'radial' | 'conic'
  /** Starting color (Tailwind CSS class) */
  from?: string
  /** Ending color (Tailwind CSS class) */
  to?: string
  /** Via color for 3-color gradients (Tailwind CSS class) */
  via?: string
  /** Multiple colors for complex gradients */
  colors?: string[]
  /** Height class (Tailwind CSS) */
  height?: string
  /** Width class (Tailwind CSS) */
  width?: string
  /** Custom CSS classes */
  className?: string
  /** Enable animation */
  animate?: boolean
  /** Opacity level */
  opacity?: number
  /** Blend mode */
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light'
  /** Position within parent */
  position?: 'absolute' | 'relative' | 'fixed'
  /** Z-index */
  zIndex?: number
}

// Documentation Source: Context7 MCP - Gradient Direction Mapping
// Reference: /tailwindlabs/tailwindcss.com - Background gradient utilities
const gradientDirections = {
  top: 'bg-gradient-to-t',
  bottom: 'bg-gradient-to-b',
  left: 'bg-gradient-to-l',
  right: 'bg-gradient-to-r',
  'top-right': 'bg-gradient-to-tr',
  'bottom-right': 'bg-gradient-to-br',
  'top-left': 'bg-gradient-to-tl',
  'bottom-left': 'bg-gradient-to-bl',
  radial: 'bg-radial-gradient',
  conic: 'bg-conic-gradient'
}

// Documentation Source: Context7 MCP - Framer Motion Animation Variants
// Reference: /grx7/framer-motion - Gradient animation patterns
const animationVariants = {
  hidden: { 
    opacity: 0,
    scale: 1.1,
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: "easeOut",
    }
  }
}

/**
 * GradientOverlay Component
 * 
 * Documentation Source: Context7 MCP - React Functional Component Pattern
 * Reference: /reactjs/react.dev - Component composition and conditional rendering
 */
export const GradientOverlay: React.FC<GradientOverlayProps> = ({
  direction = 'top',
  from = 'primary-900',
  to = 'transparent',
  via,
  colors,
  height = 'h-24',
  width = 'w-full',
  className = '',
  animate = false,
  opacity = 1,
  blendMode = 'normal',
  position = 'absolute',
  zIndex = 10
}) => {
  // Documentation Source: Context7 MCP - Dynamic Class Generation
  // Reference: /tailwindlabs/tailwindcss.com - Conditional class application
  const gradientDirection = gradientDirections[direction] || gradientDirections.top
  
  // Build gradient classes dynamically
  let gradientClasses = gradientDirection
  
  if (colors && colors.length > 0) {
    // Use custom colors array
    gradientClasses += ` from-${colors[0]}`
    if (colors.length > 2) {
      gradientClasses += ` via-${colors[1]} to-${colors[2]}`
    } else if (colors.length === 2) {
      gradientClasses += ` to-${colors[1]}`
    }
  } else {
    // Use from/via/to pattern
    gradientClasses += ` from-${from}`
    if (via) {
      gradientClasses += ` via-${via}`
    }
    gradientClasses += ` to-${to}`
  }

  // Documentation Source: Context7 MCP - Tailwind CSS Class Composition
  // Reference: /tailwindlabs/tailwindcss.com - Responsive utilities and positioning
  const baseClasses = `
    ${position}
    ${width}
    ${height}
    ${gradientClasses}
    pointer-events-none
    ${blendMode !== 'normal' ? `mix-blend-${blendMode}` : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  const Component = animate ? motion.div : 'div'
  const animationProps = animate ? {
    variants: animationVariants,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.3 }
  } : {}

  return (
    <Component
      className={baseClasses}
      style={{ 
        opacity,
        zIndex
      }}
      {...animationProps}
    />
  )
}

// Documentation Source: Context7 MCP - Component Export Pattern
// Reference: /reactjs/react.dev - Default and named exports
export default GradientOverlay