// CONTEXT7 SOURCE: /reactjs/react.dev - Component composition with className props
// IMPLEMENTATION REASON: Official React documentation for loading state components

import { cn } from "@/lib/utils"

/**
 * Skeleton Loading Component
 *
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component patterns for loading states
 * Pattern: Placeholder component for content loading
 * - Animated pulse effect for visual feedback
 * - Flexible sizing through className
 * - Consistent styling with design system
 *
 * Accessibility:
 * - Semantic div element for screen readers
 * - Animation respects motion preferences
 * - Background color provides visual hierarchy
 */

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }