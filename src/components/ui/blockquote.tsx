// CONTEXT7 SOURCE: Custom Blockquote Component - Replacing Flowbite Blockquote
// Advanced TypeScript implementation with semantic HTML and @layer base styling
// Part of Phase 2 Bundle Optimization: Flowbite React Replacement

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react';

// ============================================================================
// ADVANCED TYPESCRIPT TYPES FOR TYPE-SAFE BLOCKQUOTE COMPONENT
// ============================================================================

// Discriminated union for blockquote variants
type BlockquoteVariant = 'default' | 'testimonial' | 'mission' | 'quote' | 'featured';

// Conditional type for cite requirements
type BlockquoteCiteProps<T extends boolean> =
  T extends true
    ? { cite: ReactNode; author?: ReactNode; role?: ReactNode; showCite: true }
    : { cite?: ReactNode; author?: ReactNode; role?: ReactNode; showCite?: false };

// Template literal type for styling
type BlockquoteSize = 'sm' | 'md' | 'lg' | 'xl';
type BlockquoteAlignment = 'left' | 'center' | 'right';

// Base props interface with conditional typing
interface BaseBlockquoteProps extends Omit<ComponentPropsWithoutRef<'blockquote'>, 'cite'> {
  readonly variant?: BlockquoteVariant;
  readonly size?: BlockquoteSize;
  readonly alignment?: BlockquoteAlignment;
  readonly showQuoteIcon?: boolean;
  readonly iconPosition?: 'top' | 'side';
  readonly children: ReactNode;
}

// Combined props with conditional cite typing
type BlockquoteProps<T extends boolean = false> = BaseBlockquoteProps & BlockquoteCiteProps<T>;

// Utility type for variant styling
type BlockquoteVariantStyles = {
  readonly [K in BlockquoteVariant]: {
    readonly container: string;
    readonly quote: string;
    readonly cite: string;
  };
};

// ============================================================================
// VARIANT STYLING CONFIGURATION (USING CSS VARIABLES FROM GLOBALS.CSS)
// ============================================================================

const blockquoteVariantStyles: BlockquoteVariantStyles = {
  default: {
    container: 'border-l-4 border-neutral-300 pl-4',
    quote: 'text-neutral-700 italic',
    cite: 'text-neutral-600 mt-2 text-sm',
  },
  testimonial: {
    container: 'bg-neutral-50 rounded-lg p-6 border border-neutral-200',
    quote: 'text-neutral-800 font-medium',
    cite: 'text-neutral-600 mt-3',
  },
  mission: {
    container: 'bg-primary-50 rounded-xl p-8 border border-primary-100',
    quote: 'text-primary-800 italic text-lg',
    cite: 'text-primary-600 mt-4',
  },
  quote: {
    container: 'relative',
    quote: 'text-neutral-700 italic text-lg leading-relaxed',
    cite: 'text-neutral-600 mt-3 text-base',
  },
  featured: {
    container: 'bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-200',
    quote: 'text-primary-900 font-medium text-xl leading-relaxed',
    cite: 'text-primary-700 mt-4',
  },
} as const;

// Size configuration
const sizeConfig = {
  sm: {
    quote: 'text-sm',
    cite: 'text-xs',
    icon: 'w-4 h-4',
    padding: 'p-3',
  },
  md: {
    quote: 'text-base',
    cite: 'text-sm',
    icon: 'w-6 h-6',
    padding: 'p-4',
  },
  lg: {
    quote: 'text-lg',
    cite: 'text-base',
    icon: 'w-8 h-8',
    padding: 'p-6',
  },
  xl: {
    quote: 'text-xl',
    cite: 'text-lg',
    icon: 'w-10 h-10',
    padding: 'p-8',
  },
} as const;

// Alignment configuration
const alignmentConfig = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

// ============================================================================
// QUOTE ICON COMPONENT
// ============================================================================

interface QuoteIconProps {
  readonly size: BlockquoteSize;
  readonly position: 'top' | 'side';
  readonly className?: string;
}

const QuoteIcon = React.memo<QuoteIconProps>(({ size, position, className }) => {
  const iconSize = sizeConfig[size].icon;

  return (
    <svg
      className={cn(
        iconSize,
        'fill-current',
        position === 'top' && 'mx-auto mb-4',
        position === 'side' && 'absolute -top-2 -left-2',
        className
      )}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 14"
    >
      <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
    </svg>
  );
});

QuoteIcon.displayName = 'QuoteIcon';

// ============================================================================
// CITATION COMPONENT WITH AVATAR SUPPORT
// ============================================================================

interface CitationProps {
  readonly cite?: ReactNode;
  readonly author?: ReactNode;
  readonly role?: ReactNode;
  readonly avatar?: string;
  readonly className?: string;
}

const Citation = React.memo<CitationProps>(({ cite, author, role, avatar, className }) => {
  if (!cite && !author) return null;

  return (
    <figcaption className={cn('flex items-center justify-center gap-3', className)}>
      {avatar && (
        <img
          src={avatar}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
          loading="lazy"
        />
      )}

      <div className="flex items-center divide-x-2 divide-current opacity-60">
        {author && <cite className="pr-3 not-italic font-medium">{author}</cite>}
        {role && <cite className="pl-3 not-italic opacity-80">{role}</cite>}
        {cite && !author && <cite className="not-italic">{cite}</cite>}
      </div>
    </figcaption>
  );
});

Citation.displayName = 'Citation';

// ============================================================================
// MAIN BLOCKQUOTE COMPONENT WITH GENERIC TYPE SUPPORT
// ============================================================================

export const Blockquote = React.forwardRef<
  ElementRef<'blockquote'>,
  BlockquoteProps
>(({
  children,
  variant = 'default',
  size = 'md',
  alignment = 'left',
  showQuoteIcon = false,
  iconPosition = 'top',
  cite,
  author,
  role,
  showCite,
  className,
  ...props
}, ref) => {
  const variantStyles = blockquoteVariantStyles[variant];
  const sizeStyles = sizeConfig[size];
  const alignmentStyles = alignmentConfig[alignment];

  return (
    <figure className={cn('not-prose', alignment === 'center' && 'mx-auto')}>
      <blockquote
        ref={ref}
        className={cn(
          'relative',
          variantStyles.container,
          alignmentStyles,
          className
        )}
        {...props}
      >
        {/* Quote Icon */}
        {showQuoteIcon && (
          <QuoteIcon
            size={size}
            position={iconPosition}
            className={variant === 'mission' ? 'text-primary-600' : 'text-neutral-400'}
          />
        )}

        {/* Quote Content */}
        <div className={cn(
          variantStyles.quote,
          sizeStyles.quote,
          iconPosition === 'side' && showQuoteIcon && 'ml-8'
        )}>
          {children}
        </div>
      </blockquote>

      {/* Citation */}
      {(showCite || cite || author) && (
        <Citation
          cite={cite}
          author={author}
          role={role}
          className={cn(variantStyles.cite, sizeStyles.cite)}
        />
      )}
    </figure>
  );
});

Blockquote.displayName = 'Blockquote';

// ============================================================================
// CONVENIENCE COMPONENTS FOR COMMON USE CASES
// ============================================================================

export const TestimonialQuote = React.forwardRef<
  ElementRef<'blockquote'>,
  Omit<BlockquoteProps<true>, 'variant' | 'showQuoteIcon'>
>(({ children, showCite, author, role, ...props }, ref) => (
  <Blockquote
    ref={ref}
    variant="testimonial"
    showQuoteIcon={true}
    iconPosition="top"
    showCite={showCite}
    author={author}
    role={role}
    {...props}
  >
    {children}
  </Blockquote>
));

TestimonialQuote.displayName = 'TestimonialQuote';

export const MissionQuote = React.forwardRef<
  ElementRef<'blockquote'>,
  Omit<BlockquoteProps<true>, 'variant' | 'showQuoteIcon'>
>(({ children, showCite, author, role, ...props }, ref) => (
  <Blockquote
    ref={ref}
    variant="mission"
    showQuoteIcon={true}
    iconPosition="top"
    alignment="center"
    showCite={showCite}
    author={author}
    role={role}
    {...props}
  >
    {children}
  </Blockquote>
));

MissionQuote.displayName = 'MissionQuote';

export const FeatureQuote = React.forwardRef<
  ElementRef<'blockquote'>,
  Omit<BlockquoteProps, 'variant' | 'showQuoteIcon'>
>(({ children, ...props }, ref) => (
  <Blockquote
    ref={ref}
    variant="featured"
    showQuoteIcon={true}
    iconPosition="top"
    alignment="center"
    size="lg"
    {...props}
  >
    {children}
  </Blockquote>
));

FeatureQuote.displayName = 'FeatureQuote';

// ============================================================================
// TYPE EXPORTS FOR EXTERNAL USE
// ============================================================================

export type {
  BlockquoteProps,
  BlockquoteVariant,
  BlockquoteSize,
  BlockquoteAlignment,
};

// Default export for compatibility
export default Blockquote;