// CONTEXT7 SOURCE: /websites/radix-ui-primitives - Label component for form accessibility
// IMPLEMENTATION REASON: Official Radix UI documentation for accessible label patterns

"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

/**
 * Label Component with Radix UI Primitive
 *
 * CONTEXT7 SOURCE: /websites/radix-ui-primitives - Label component documentation
 * Pattern: Accessible label implementation using Radix UI Label primitive
 * - Associates labels with form controls via htmlFor attribute
 * - Supports nested control patterns for implicit association
 * - Provides accessibility features through ARIA attributes
 *
 * CONTEXT7 SOURCE: /websites/radix-ui-primitives - Form accessibility patterns
 * Features:
 * - Automatic screen reader announcement
 * - Keyboard navigation support
 * - Proper focus management
 * - Disabled state handling
 *
 * Styling Implementation:
 * - Uses data-slot for component identification
 * - Responsive to peer and group states
 * - Handles disabled states gracefully
 * - Maintains consistent typography
 */

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
