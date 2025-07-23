"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface InteractiveHoverButtonProps {
  text: string
  className?: string
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-fit transition-transform duration-300 active:scale-95",
        className
      )}
      {...props}
    >
      <span className="relative z-10 block overflow-hidden rounded-lg border-2 border-primary-900 bg-white px-5 py-3 font-medium leading-tight text-primary-900 transition-colors duration-500 group-hover:text-white">
        <span className="absolute left-0 top-0 h-0 w-0 rounded bg-primary-900 transition-all duration-500 group-hover:h-full group-hover:w-full"></span>
        <span className="relative flex items-center gap-2">
          {text}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </span>
      <span className="absolute -bottom-1 -right-1 z-0 h-full w-full rounded-lg bg-primary-900 transition-all duration-500 group-hover:-bottom-0 group-hover:-right-0"></span>
    </button>
  )
})
InteractiveHoverButton.displayName = "InteractiveHoverButton"

export { InteractiveHoverButton }