/**
 * Documentation Source: HTML Input Element + WCAG 2.1 AA
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html
 * 
 * Pattern: Accessible Input Component with Validation States
 * Architecture:
 * - Native HTML input element
 * - WCAG 2.1 AA compliant focus management
 * - Validation state indicators
 * - File input styling
 * 
 * Accessibility Features:
 * - Focus visible ring indicators
 * - ARIA invalid state support
 * - High contrast ratios
 * - Disabled state handling
 * - Screen reader friendly
 * 
 * Design System:
 * - Consistent height and padding
 * - Theme-aware color system
 * - Shadow and border styling
 */

import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
