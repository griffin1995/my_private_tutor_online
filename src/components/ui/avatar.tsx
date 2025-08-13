/**
 * CONTEXT7 SOURCE: /radix-ui/primitives - Avatar component with fallback handling
 * IMPLEMENTATION REASON: Official Radix UI documentation for accessible avatar components
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Utility classes for avatar styling
 * IMPLEMENTATION REASON: Official Tailwind CSS documentation for responsive avatar design
 */

"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

// CONTEXT7 SOURCE: /radix-ui/primitives - Avatar root component
// AVATAR ROOT: Official Radix UI avatar container with customization
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

// CONTEXT7 SOURCE: /radix-ui/primitives - Avatar image component
// AVATAR IMAGE: Official Radix UI avatar image with loading states
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

// CONTEXT7 SOURCE: /radix-ui/primitives - Avatar fallback component
// AVATAR FALLBACK: Official Radix UI avatar fallback display
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }