"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface InteractiveHoverButtonProps {
  text: string
  className?: string
  onClick?: () => void
  variant?: 'default' | 'blue'
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text, className, variant = 'default', ...props }, ref) => {
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Color variant patterns for interactive button styling
  // BLUE VARIANT REASON: Official Tailwind CSS documentation Section 4.3 demonstrates blue color schemes for secondary actions
  const variantClasses = {
    default: "border-primary-900 text-primary-900 bg-primary-900",
    blue: "border-blue-600 text-blue-600 bg-blue-600"
  }
  
  const colors = variantClasses[variant]
  const [borderColor, textColor, bgColor] = colors.split(' ')
  
  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex h-12 items-center justify-center transition-transform duration-300 active:scale-95",
        className
      )}
      {...props}
    >
      <span className={cn(
        "relative z-10 block overflow-hidden rounded-lg border-2 bg-white px-6 py-3 font-medium leading-tight transition-colours duration-500 group-hover:text-white",
        borderColor,
        textColor
      )}>
        <span className={cn(
          "absolute left-0 top-0 h-0 w-0 rounded transition-all duration-500 group-hover:h-full group-hover:w-full",
          bgColor
        )}></span>
        <span className="relative flex items-center gap-2">
          {text}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </span>
      <span className={cn(
        "absolute -bottom-1 -right-1 z-0 h-full w-full rounded-lg transition-all duration-500 group-hover:-bottom-0 group-hover:-right-0",
        bgColor
      )}></span>
    </button>
  )
})
InteractiveHoverButton.displayName = "InteractiveHoverButton"

export { InteractiveHoverButton }