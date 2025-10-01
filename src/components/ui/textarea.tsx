// CONTEXT7 SOURCE: /reactjs/react.dev - forwardRef pattern for form controls
// IMPLEMENTATION REASON: Official React documentation for accessible textarea components

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Textarea Component with Accessibility Support
 *
 * CONTEXT7 SOURCE: /reactjs/react.dev - forwardRef API for DOM elements
 * Pattern: Native textarea enhancement with ref forwarding
 * - Direct access to DOM element for focus management
 * - Preserves all native textarea behaviors
 * - Compatible with form libraries via ref
 *
 * Styling Features:
 * - Consistent border and focus states
 * - Disabled state styling
 * - Responsive padding and sizing
 * - Theme-aware text colors
 */

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }