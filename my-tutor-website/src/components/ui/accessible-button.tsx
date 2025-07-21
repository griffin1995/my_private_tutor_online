"use client"

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { handleKeyboardNavigation, KEYBOARD_KEYS } from '@/lib/accessibility'

// WCAG 2.1 AA compliant button component with proper ARIA support

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
  {
    variants: {
      variant: {
        default: "bg-primary-900 text-white hover:bg-primary-800 focus-visible:ring-primary-500",
        destructive: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
        outline: "border border-primary-300 bg-white hover:bg-primary-50 hover:text-primary-900 focus-visible:ring-primary-500",
        secondary: "bg-primary-100 text-primary-900 hover:bg-primary-200 focus-visible:ring-primary-500",
        ghost: "hover:bg-primary-100 hover:text-primary-900 focus-visible:ring-primary-500",
        link: "text-primary-900 underline-offset-4 hover:underline focus-visible:ring-primary-500",
        premium: "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-gold focus-visible:ring-accent-500",
        royal: "bg-gradient-to-r from-royal-500 to-royal-600 hover:from-royal-600 hover:to-royal-700 text-white shadow-royal focus-visible:ring-royal-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface AccessibleButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  ariaLabel?: string
  ariaDescribedBy?: string
  ariaExpanded?: boolean
  ariaPressed?: boolean
  role?: 'button' | 'tab' | 'menuitem' | 'option'
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    loadingText = 'Loading...',
    icon,
    iconPosition = 'left',
    children,
    disabled,
    onClick,
    onKeyDown,
    ariaLabel,
    ariaDescribedBy,
    ariaExpanded,
    ariaPressed,
    role = 'button',
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const isDisabled = disabled || loading

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return
      onClick?.(event)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled) return
      
      // Handle space key activation for better accessibility
      handleKeyboardNavigation(event.nativeEvent, {
        onSpace: () => {
          if (onClick) {
            onClick(event as any)
          }
        },
        onEnter: () => {
          if (onClick) {
            onClick(event as any)
          }
        }
      })

      onKeyDown?.(event)
    }

    const buttonContent = (
      <>
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {icon && iconPosition === 'left' && !loading && (
          <span className="mr-2" aria-hidden="true">
            {icon}
          </span>
        )}
        
        {loading ? loadingText : children}
        
        {icon && iconPosition === 'right' && !loading && (
          <span className="ml-2" aria-hidden="true">
            {icon}
          </span>
        )}
      </>
    )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={role}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressed}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        {...props}
      >
        {buttonContent}
      </Comp>
    )
  }
)

AccessibleButton.displayName = "AccessibleButton"

export { AccessibleButton, buttonVariants }
export type { AccessibleButtonProps }