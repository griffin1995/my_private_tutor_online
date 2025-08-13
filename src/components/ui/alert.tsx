/**
 * CONTEXT7 SOURCE: /radix-ui/primitives - Alert Dialog and accessibility patterns
 * IMPLEMENTATION REASON: Official Radix UI documentation for accessible alert components
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Utility classes for alert styling
 * IMPLEMENTATION REASON: Official Tailwind CSS documentation for component styling patterns
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// CONTEXT7 SOURCE: /vercel/next.js - Component variant system with CVA
// ALERT VARIANTS: Using class-variance-authority for consistent alert styling
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning:
          "border-yellow-500/50 text-yellow-700 bg-yellow-50 dark:border-yellow-500 dark:text-yellow-400 dark:bg-yellow-950/20",
        success:
          "border-green-500/50 text-green-700 bg-green-50 dark:border-green-500 dark:text-green-400 dark:bg-green-950/20",
        info:
          "border-blue-500/50 text-blue-700 bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:bg-blue-950/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// CONTEXT7 SOURCE: /radix-ui/primitives - Alert component interface
// ALERT PROPS: Official Radix UI patterns for component prop interfaces
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

// CONTEXT7 SOURCE: /radix-ui/primitives - Alert title component pattern
// ALERT TITLE: Official Radix UI documentation for alert heading structure
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

// CONTEXT7 SOURCE: /radix-ui/primitives - Alert description component pattern
// ALERT DESCRIPTION: Official Radix UI documentation for alert content structure
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }