// CONTEXT7 SOURCE: /vercel/next.js - Component architecture optimization patterns
// CONTEXT7 SOURCE: /facebook/react - Component composition patterns
// CONTEXT7 SOURCE: /microsoft/typescript - Component props types interfaces generics
// Phase 2 Core Optimization: Consolidated Button Component

'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// Button variant configuration using class-variance-authority
const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gold-600 text-white hover:bg-gold-700 focus-visible:ring-gold-600',
        secondary: 'bg-navy-800 text-white hover:bg-navy-900 focus-visible:ring-navy-800',
        outline: 'border border-gray-300 bg-white hover:bg-gray-50 focus-visible:ring-gray-400',
        ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
        success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600',
        link: 'text-gold-600 underline-offset-4 hover:underline hover:text-gold-700',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 text-base',
        xl: 'h-12 px-10 text-lg',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

// TypeScript interface for Button props
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Loading state for async operations
  isLoading?: boolean;
  // Icon to display before text
  leftIcon?: React.ReactNode;
  // Icon to display after text
  rightIcon?: React.ReactNode;
  // Custom loading spinner component
  loadingSpinner?: React.ReactNode;
  // Accessibility label
  ariaLabel?: string;
}

/**
 * Consolidated Button component for Phase 2 optimization
 * Replaces multiple button implementations across the codebase
 * Provides consistent styling and behavior with TypeScript type safety
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      leftIcon,
      rightIcon,
      loadingSpinner,
      ariaLabel,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Default loading spinner
    const defaultSpinner = (
      <svg
        className="animate-spin h-4 w-4"
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
    );

    const spinner = loadingSpinner || defaultSpinner;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && <span className="mr-2">{spinner}</span>}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Export additional button variant components for specific use cases
export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'icon', ...props }, ref) => {
    return <Button ref={ref} size={size} {...props} />;
  }
);

IconButton.displayName = 'IconButton';

export const LinkButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'link', ...props }, ref) => {
    return <Button ref={ref} variant={variant} {...props} />;
  }
);

LinkButton.displayName = 'LinkButton';

export const SubmitButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = 'submit', ...props }, ref) => {
    return <Button ref={ref} type={type} {...props} />;
  }
);

SubmitButton.displayName = 'SubmitButton';