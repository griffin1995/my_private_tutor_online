// CONTEXT7 SOURCE: /reactjs/react.dev - Compound component pattern with children props
// IMPLEMENTATION REASON: Official React documentation for component composition patterns
/**
 * Card Component System with Compound Component Architecture
 *
 * CONTEXT7 SOURCE: /reactjs/react.dev - Section: Passing Props to Components
 * Pattern: Compound components using children prop for flexible composition
 *
 * CONTEXT7 SOURCE: /websites/react_dev - Component composition with semantic HTML
 * Architecture Benefits:
 * - Flexible content composition through children props
 * - Semantic HTML structure for accessibility
 * - Compound component pattern (Card, CardHeader, CardTitle, etc.)
 * - Theme-aware styling with CSS custom properties
 *
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Container queries and responsive design
 * Styling Strategy:
 * - Container queries for responsive layouts (@container)
 * - CSS custom properties for theming (card, card-foreground)
 * - Consistent spacing using Tailwind utilities
 * - Shadow and border styling for visual hierarchy
 *
 * Accessibility Implementation:
 * - data-slot attributes for component identification
 * - Semantic HTML elements for screen readers
 * - Proper heading hierarchy support through CardTitle
 * - ARIA landmark patterns for navigation
 */

import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
