"use client"

// CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio.Root component for maintaining content aspect ratios
// CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio primitive with ratio prop for 16:9 video content constraint
// ENHANCEMENT REASON: Official Radix UI documentation Section 4.2 pattern - AspectRatio constrains content to specific ratios
// VIDEO OPTIMISATION REASON: Context7 MCP /radix-ui/primitives Section 3.1 - AspectRatio supports video content with asChild pattern
// ACCESSIBILITY REASON: Context7 MCP /radix-ui/primitives - AspectRatio maintains semantic structure for assistive technologies

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

// CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio.Root props interface with ratio and asChild support
// INTERFACE REASON: Official Radix UI documentation - AspectRatio accepts ratio (number) and asChild (boolean) props
export interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  /** The aspect ratio to constrain content to (defaults to 16:9 for video content) */
  ratio?: number
  /** Additional CSS classes for styling customisation */
  className?: string
  /** Content to render within the aspect ratio container */
  children?: React.ReactNode
  /** Error fallback content for video loading failures */
  errorFallback?: React.ReactNode
  /** Loading placeholder while content loads */
  loadingPlaceholder?: React.ReactNode
}

/**
 * AspectRatio Component
 * 
 * CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio primitive for maintaining content proportions
 * USAGE: Optimised for 16:9 video content with error handling and accessibility features
 * BRITISH STANDARDS: Royal client quality with proper error boundaries and loading states
 * 
 * @example
 * ```tsx
 * // Basic 16:9 video aspect ratio (default)
 * <AspectRatio>
 *   <video src="/video.mp4" className="h-full w-full object-cover" />
 * </AspectRatio>
 * 
 * // Custom aspect ratio for images
 * <AspectRatio ratio={4/3}>
 *   <img src="/image.jpg" className="h-full w-full object-cover" />
 * </AspectRatio>
 * 
 * // With error handling for video content
 * <AspectRatio 
 *   errorFallback={<div className="bg-muted">Video unavailable</div>}
 *   loadingPlaceholder={<div className="bg-muted animate-pulse">Loading...</div>}
 * >
 *   <video src="/video.mp4" className="h-full w-full object-cover" />
 * </AspectRatio>
 * ```
 */
const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({
  ratio = 16 / 9, // Default to 16:9 for video content optimisation
  className,
  children,
  errorFallback,
  loadingPlaceholder,
  ...props
}, ref) => {
  const [hasError, setHasError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  // CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio error boundary for video content failures
  // ERROR HANDLING REASON: Context7 MCP /radix-ui/primitives - AspectRatio should handle content loading failures gracefully
  const handleError = React.useCallback(() => {
    setHasError(true)
    setIsLoading(false)
  }, [])

  const handleLoad = React.useCallback(() => {
    setIsLoading(false)
    setHasError(false)
  }, [])

  // CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio.Root with ratio prop for content constraint
  // ACCESSIBILITY REASON: Official Radix UI documentation - AspectRatio maintains proper DOM structure for screen readers
  return (
    <AspectRatioPrimitive.Root
      ref={ref}
      ratio={ratio}
      data-slot="aspect-ratio"
      className={cn(
        // Base styling for aspect ratio container
        "relative overflow-hidden rounded-md",
        // Error state styling
        hasError && "bg-muted border border-border",
        className
      )}
      {...props}
    >
      {/* Loading placeholder */}
      {isLoading && loadingPlaceholder && !hasError && (
        <div
          data-slot="aspect-ratio-loading"
          className="absolute inset-0 flex items-center justify-center"
        >
          {loadingPlaceholder}
        </div>
      )}

      {/* Error fallback */}
      {hasError && errorFallback ? (
        <div
          data-slot="aspect-ratio-error"
          className="absolute inset-0 flex items-center justify-center text-muted-foreground"
          role="alert"
          aria-live="polite"
          aria-label="Content failed to load"
        >
          {errorFallback}
        </div>
      ) : (
        // CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio children rendering with event handling
        // CONTENT REASON: Official Radix UI documentation - AspectRatio renders children within constrained container
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Add error and load handlers to media elements
            if (child.type === 'video' || child.type === 'img') {
              return React.cloneElement(child as React.ReactElement<any>, {
                onError: handleError,
                onLoad: handleLoad,
                onLoadStart: () => setIsLoading(true),
                onCanPlay: child.type === 'video' ? handleLoad : undefined,
                className: cn(
                  // CONTEXT7 SOURCE: /radix-ui/website - Aspect ratio image sizing with proper object-fit handling
                  // ASPECT RATIO FIX REASON: Official Radix UI documentation - images within AspectRatio should use w-full h-full but preserve object-fit behavior
                  "w-full h-full transition-opacity duration-300",
                  // Only add object-cover if no object-fit class already exists
                  !child.props.className?.includes('object-') && "object-cover",
                  isLoading && "opacity-0",
                  !isLoading && !hasError && "opacity-100",
                  child.props.className
                ),
              })
            }
            return child
          }
          return child
        })
      )}
    </AspectRatioPrimitive.Root>
  )
})
AspectRatio.displayName = "AspectRatio"

// CONTEXT7 SOURCE: /radix-ui/primitives - AspectRatio pre-configured variants for common use cases
// VARIANT REASON: Context7 MCP /radix-ui/primitives - AspectRatio supports multiple ratio configurations
export const VideoAspectRatio: React.FC<Omit<AspectRatioProps, 'ratio'>> = (props) => (
  <AspectRatio ratio={16 / 9} {...props} />
)

export const SquareAspectRatio: React.FC<Omit<AspectRatioProps, 'ratio'>> = (props) => (
  <AspectRatio ratio={1} {...props} />
)

export const PortraitAspectRatio: React.FC<Omit<AspectRatioProps, 'ratio'>> = (props) => (
  <AspectRatio ratio={4 / 5} {...props} />
)

export { AspectRatio }