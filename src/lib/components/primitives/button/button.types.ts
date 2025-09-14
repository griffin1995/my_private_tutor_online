/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface patterns for component props
 * TYPE DEFINITION REASON: Official TypeScript documentation Section 2.1 for interface composition
 */

import type { VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes, ReactNode } from "react"

// Base button variants for CVA
export const buttonVariants = {
  variant: {
    // Core variants
    default: "default",
    accent: "accent",
    destructive: "destructive",
    outline: "outline",
    secondary: "secondary",
    ghost: "ghost",
    link: "link",
    // Special effect variants (consolidated from magic UI)
    shiny: "shiny",
    animated: "animated",
    hover: "hover",
  },
  size: {
    default: "default",
    sm: "sm",
    lg: "lg",
    xl: "xl",
    icon: "icon",
  },
  // New: Animation variants
  animation: {
    none: "none",
    shimmer: "shimmer",
    pulse: "pulse",
    bounce: "bounce",
  },
} as const

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Core props
  asChild?: boolean
  loading?: boolean

  // Animation props (consolidated from multiple components)
  animation?: keyof typeof buttonVariants.animation
  animationDuration?: number

  // Icon props
  leftIcon?: ReactNode
  rightIcon?: ReactNode

  // Accessibility props
  "aria-pressed"?: boolean
  "aria-expanded"?: boolean
  "aria-busy"?: boolean
  "aria-describedby"?: string

  // Visual props (consolidated from royal/testimonial buttons)
  gradient?: boolean
  glow?: boolean

  // Navigation props (from navigation-button)
  href?: string
  external?: boolean
}

export interface ButtonGroupProps {
  children: ReactNode
  orientation?: "horizontal" | "vertical"
  spacing?: "tight" | "normal" | "loose"
  className?: string
}

export interface ButtonLoadingState {
  isLoading: boolean
  loadingText?: string
  spinner?: ReactNode
}

// Type guards for different button types
export const isLinkButton = (props: ButtonProps): boolean => {
  return Boolean(props.href) || props.variant === "link"
}

export const isIconButton = (props: ButtonProps): boolean => {
  return props.size === "icon"
}

export const hasAnimation = (props: ButtonProps): boolean => {
  return props.animation !== "none" && props.animation !== undefined
}