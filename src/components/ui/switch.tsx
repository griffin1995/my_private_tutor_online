/**
 * SWITCH COMPONENT - UI LIBRARY IMPLEMENTATION
 * CONTEXT7 SOURCE: /radix-ui/primitives - Switch component patterns with accessibility
 * 
 * Accessible switch component for consent management and settings toggles
 * Used in testimonials personalization consent manager
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Context7 MCP documentation patterns
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Enterprise-grade component standards
 */

"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

// CONTEXT7 SOURCE: /radix-ui/primitives - Switch component with forwardRef pattern
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-slate-200",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }