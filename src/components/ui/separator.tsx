// CONTEXT7 SOURCE: /websites/radix-ui-primitives - Separator component patterns
// IMPLEMENTATION REASON: Official Radix UI documentation for accessible visual dividers

"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Separator Component with Radix UI
 *
 * CONTEXT7 SOURCE: /websites/radix-ui-primitives - Separator primitive documentation
 * Pattern: Accessible visual and semantic separator
 * - ARIA separator role for screen readers
 * - Horizontal and vertical orientations
 * - Decorative vs semantic separation
 * - Consistent styling with design system
 */

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }