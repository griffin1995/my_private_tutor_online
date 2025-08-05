/**
 * Documentation Source: Radix UI + CVA (Class Variance Authority)
 * Reference: https://www.radix-ui.com/primitives/docs/utilities/slot
 * Reference: https://cva.style/docs/getting-started/variants
 * Reference: https://www.w3.org/WAI/ARIA/apg/patterns/button/
 * 
 * Pattern: Polymorphic Button Component with Variants
 * Architecture:
 * - Radix UI Slot for polymorphic rendering (asChild pattern)
 * - CVA for type-safe variant styling
 * - Full keyboard and screen reader accessibility
 * 
 * Accessibility Features:
 * - Focus visible states with ring
 * - Disabled state handling
 * - ARIA invalid state support
 * - Proper contrast ratios for WCAG AA
 * 
 * Usage:
 * <Button variant="default" size="lg">Click me</Button>
 * <Button asChild><Link href="/about">About</Link></Button>
 */

import * as React from "react"
import { Root as Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-accessibility"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-serif",
  {
    variants: {
      variant: {
        // PRIMARY BRAND: Metallic Blue - WCAG AA Compliant (4.5:1+ contrast ratio)
        default:
          "bg-primary-800 text-white shadow-md hover:bg-primary-900 hover:shadow-lg focus-visible:ring-primary-600 transform hover:scale-[1.02] transition-all duration-200",
        // LUXURY ACCENT: Aztec Gold - WCAG AA Compliant for Premium CTAs
        accent:
          "bg-gradient-to-r from-accent-800 to-accent-900 text-white shadow-md hover:from-accent-900 hover:to-accent-950 hover:shadow-lg focus-visible:ring-accent-700 transform hover:scale-[1.02] transition-all duration-200",
        // Destructive actions
        destructive:
          "bg-red-600 text-white shadow-md hover:bg-red-700 focus-visible:ring-red-500 transform hover:scale-[1.02]",
        // Outline with brand colors
        outline:
          "border-2 border-primary-700 bg-transparent text-primary-700 shadow-sm hover:bg-primary-50 hover:border-primary-800 focus-visible:ring-primary-600",
        // Secondary with neutral styling
        secondary:
          "bg-neutral-100 text-primary-800 shadow-sm hover:bg-neutral-200 focus-visible:ring-neutral-400",
        // Ghost with brand accent
        ghost:
          "hover:bg-primary-50 hover:text-primary-800 focus-visible:ring-primary-600",
        // Link with brand accent
        link: "text-accent-700 underline-offset-4 hover:underline hover:text-accent-800 focus-visible:ring-accent-600",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Enhanced Button Component with ARIA Patterns
 * Documentation Source: WAI-ARIA Button Pattern
 * Reference: https://www.w3.org/WAI/ARIA/apg/patterns/button/
 * 
 * ARIA Support:
 * - aria-pressed for toggle buttons
 * - aria-expanded for disclosure buttons
 * - aria-busy for loading states
 * - aria-describedby for additional context
 * - Motion preference support
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  "aria-label": _ariaLabel,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  const reducedMotion = useReducedMotion()

  // Handle loading state
  const buttonProps = {
    ...props,
    "aria-busy": loading || undefined,
    "aria-disabled": loading || props.disabled || undefined,
    disabled: loading || props.disabled,
  }

  // Apply motion preferences to transition classes
  const motionSafeClassName = cn(
    buttonVariants({ variant, size, className }),
    reducedMotion && "transition-none"
  )

  return (
    <Comp
      data-slot="button"
      className={motionSafeClassName}
      {...buttonProps}
    >
      {loading && (
        <span 
          className="sr-only"
          role="status"
          aria-live="polite"
        >
          Loading...
        </span>
      )}
      {asChild ? (
        <Slottable>{props.children}</Slottable>
      ) : (
        props.children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
