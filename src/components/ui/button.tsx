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
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
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
