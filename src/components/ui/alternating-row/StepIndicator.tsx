'use client';

/**
 * STEP INDICATOR COMPONENT
 *
 * Dedicated component for numbered step indicators, addressing the semantic mismatch
 * of using Badge component for step numbering. Provides better accessibility and styling.
 *
 * @author Claude Code Implementation
 * @version 1.0.0 - November 2025
 */

import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  /** Step number to display */
  number: number;
  /** Visual variant */
  variant?: 'default' | 'outline' | 'ghost';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom CSS classes */
  className?: string;
  /** ARIA label override */
  'aria-label'?: string;
}

/**
 * Semantic step indicator component designed specifically for numbered sequences
 * Uses proper semantic HTML and ARIA attributes for step-based content
 */
const StepIndicator = memo<StepIndicatorProps>(({
  number,
  variant = 'default',
  size = 'md',
  className,
  'aria-label': ariaLabel,
}) => {
  // Size configuration
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 @md:w-10 @md:h-10 text-sm @md:text-base',
    lg: 'w-10 h-10 @md:w-12 @md:h-12 text-base @md:text-lg',
  };

  // Variant configuration - clean minimal styling
  const variantClasses = {
    default: 'bg-accent text-white',
    outline: 'border border-accent text-accent bg-transparent',
    ghost: 'text-accent bg-accent/10',
  };

  return (
    <div
      className={cn(
        // Base step indicator styles - clean minimal design
        'inline-flex items-center justify-center',
        'font-semibold',
        'shrink-0',
        // Size classes
        sizeClasses[size],
        // Variant classes
        variantClasses[variant],
        // Custom classes
        className
      )}
      role="img"
      aria-label={ariaLabel || `${number}`}
    >
      {number}
    </div>
  );
});

StepIndicator.displayName = 'StepIndicator';

export { StepIndicator };
export type { StepIndicatorProps };