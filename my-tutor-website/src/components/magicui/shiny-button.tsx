/**
 * Documentation Source: Magic UI + React 18 forwardRef
 * Reference: https://react.dev/reference/react/forwardRef
 * Reference: https://tailwindcss.com/docs/animation#customizing-your-theme
 * Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient
 * 
 * Pattern: Animated Button Component with Shimmer Effect
 * Architecture:
 * - forwardRef for proper ref handling
 * - CSS linear gradient animation
 * - Custom Tailwind animation (animate-shimmer)
 * - Focus ring for accessibility
 * 
 * Features:
 * - Shimmer animation effect
 * - Gold gradient background
 * - WCAG focus indicators
 * - Customizable styling via className
 * 
 * Animation:
 * - CSS-based shimmer effect
 * - Background gradient movement
 * - Smooth transitions
 */

"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface ShinyButtonProps {
  text: string
  className?: string
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ text, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "animate-shimmer inline-flex h-12 items-center justify-center rounded-md border border-accent-600 bg-[linear-gradient(110deg,#eab308,45%,#fbbf24,55%,#eab308)] bg-[length:200%_100%] px-6 font-medium text-white transition-colours focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-white shadow-lg",
          className
        )}
        {...props}
      >
        {text}
      </button>
    )
  }
)
ShinyButton.displayName = "ShinyButton"

export { ShinyButton }