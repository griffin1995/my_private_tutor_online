// CONTEXT7 SOURCE: /emilkowalski/sonner - Toast notification library for React
// IMPLEMENTATION REASON: Production-ready toast notifications with accessibility

"use client"

import { Toaster as Sonner } from "sonner"

/**
 * Toast Notification Component using Sonner
 *
 * CONTEXT7 SOURCE: /emilkowalski/sonner - Modern toast notification library
 * Pattern: Accessible and performant notification system
 * - ARIA live regions for screen reader announcements
 * - Stacking and positioning management
 * - Auto-dismiss with pause on hover
 * - Swipe gestures on mobile devices
 *
 * Features:
 * - Promise-based API for async operations
 * - Custom rendering with className
 * - Theme-aware styling
 * - Keyboard navigation support
 *
 * Styling:
 * - Tailwind classes for consistent design
 * - Group modifiers for state-based styles
 * - Shadow and border customization
 */

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }