/*
CONTEXT7 SOURCE: /joe-bell/cva - Class Variance Authority for type-safe component variants
IMPLEMENTATION REASON: Semantic typography component system bridging design tokens to component usage
ENHANCEMENT: 2025 industry standard semantic design token integration with CVA
*/

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import React from 'react';

/**
 * CONTEXT7 SOURCE: /joe-bell/cva - Enhanced CVA Typography with Comprehensive Color System
 * ENHANCEMENT REASON: 2025 industry standards for semantic color variants with type safety
 * COLOR INTEGRATION: Full semantic color system leveraging CSS-first design tokens
 *
 * Semantic Typography Component Variants
 *
 * Maps semantic typography tokens to Tailwind classes with type-safe variants.
 * Supports the 3-tier semantic token hierarchy: Primitive → Semantic → Component
 * Enhanced with comprehensive color variants for complete design system coverage.
 */
const typographyVariants = cva('transition-colors duration-200', {
  variants: {
    semantic: {
      // Display variants (H1) - Hero/Landing pages
      'display-hero': 'text-semantic-display-hero font-heading font-bold',
      'display-page': 'text-semantic-display-page font-heading font-bold',

      // Heading variants (H2) - Major content sections
      'heading-primary': 'text-semantic-heading-primary font-heading font-bold',
      'heading-secondary': 'text-semantic-heading-secondary font-heading font-bold',

      // Title variants (H3) - Cards, widgets, smaller sections
      'title-large': 'text-semantic-title-large font-heading font-semibold',
      'title-medium': 'text-semantic-title-medium font-heading font-semibold',
      'title-small': 'text-semantic-title-small font-heading font-semibold',

      // Body variants - Content and descriptions
      'body-large': 'text-semantic-body-large font-body leading-relaxed',
      'body-default': 'text-semantic-body-default font-body leading-normal',
      'body-small': 'text-semantic-body-small font-body leading-normal',

      // Caption variants - Labels, metadata, utility text
      'caption-large': 'text-semantic-caption-large font-body font-medium',
      'caption-default': 'text-semantic-caption-default font-body font-medium',
      'caption-small': 'text-semantic-caption-small font-body font-medium',
    },
    color: {
      // Primary brand colors - Navy palette
      primary: 'text-primary-700', // Main brand navy
      'primary-light': 'text-primary-500',
      'primary-dark': 'text-primary-900',
      'primary-muted': 'text-primary-400',

      // Secondary/Accent brand colors - Gold palette
      secondary: 'text-accent-600', // Main brand gold
      'secondary-light': 'text-accent-400',
      'secondary-dark': 'text-accent-800',
      'secondary-muted': 'text-accent-500',

      // Neutral colors - Greyscale hierarchy
      neutral: 'text-neutral-800', // Primary body text
      'neutral-light': 'text-neutral-600',
      'neutral-muted': 'text-neutral-500',
      'neutral-subtle': 'text-neutral-400',

      // Semantic feedback colors
      success: 'text-success',
      error: 'text-error',
      warning: 'text-warning',
      info: 'text-info',

      // Interactive states
      inherit: 'text-inherit', // Inherit from parent
      current: 'text-current', // Use currentColor

      // Legacy compatibility
      muted: 'text-neutral-600',
      body: 'text-neutral-800',
      heading: 'text-primary-700',
    },
    alignment: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    responsive: {
      true: '', // Custom responsive handling for fluid typography
      false: '',
    },
    emphasis: {
      normal: '',
      muted: 'opacity-80',
      subtle: 'opacity-70',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      inherit: '', // Use semantic default
    },
  },
  compoundVariants: [
    // Responsive semantic variants with fluid typography
    {
      semantic: 'display-hero',
      responsive: true,
      class: 'text-semantic-display-responsive'
    },
    {
      semantic: ['heading-primary', 'heading-secondary'],
      responsive: true,
      class: 'text-semantic-heading-responsive'
    },
    {
      semantic: ['body-large', 'body-default', 'body-small'],
      responsive: true,
      class: 'text-semantic-body-responsive'
    },

    // Semantic color combinations for brand consistency
    {
      semantic: ['display-hero', 'display-page'],
      color: 'primary',
      class: 'text-primary-900' // Stronger contrast for large text
    },
    {
      semantic: ['heading-primary', 'heading-secondary'],
      color: 'primary',
      class: 'text-primary-800'
    },
    {
      semantic: ['title-large', 'title-medium', 'title-small'],
      color: 'primary',
      class: 'text-primary-700'
    },

    // Accent color combinations
    {
      semantic: ['display-hero', 'display-page'],
      color: 'secondary',
      class: 'text-accent-700' // Stronger contrast for large gold text
    },
    {
      semantic: ['heading-primary', 'heading-secondary'],
      color: 'secondary',
      class: 'text-accent-700'
    },
    {
      semantic: ['title-large', 'title-medium', 'title-small'],
      color: 'secondary',
      class: 'text-accent-600'
    },

    // Body text optimizations
    {
      semantic: ['body-large', 'body-default', 'body-small'],
      color: 'neutral',
      class: 'text-neutral-800'
    },
    {
      semantic: ['body-large', 'body-default', 'body-small'],
      color: 'muted',
      class: 'text-neutral-600'
    },

    // Caption text optimizations
    {
      semantic: ['caption-large', 'caption-default', 'caption-small'],
      color: 'neutral',
      class: 'text-neutral-700'
    },
    {
      semantic: ['caption-large', 'caption-default', 'caption-small'],
      color: 'muted',
      class: 'text-neutral-500'
    },

    // Emphasis combinations for accessibility
    {
      color: ['success', 'error', 'warning', 'info'],
      emphasis: 'muted',
      class: 'opacity-85'
    },
    {
      color: ['neutral-subtle', 'neutral-muted'],
      emphasis: 'disabled',
      class: 'opacity-40'
    },

    // Interactive state enhancements
    {
      color: 'primary',
      emphasis: 'normal',
      class: 'hover:text-primary-600 active:text-primary-800 focus:text-primary-600'
    },
    {
      color: 'secondary',
      emphasis: 'normal',
      class: 'hover:text-accent-500 active:text-accent-700 focus:text-accent-500'
    },
  ],
  defaultVariants: {
    semantic: 'body-default',
    color: 'neutral',
    alignment: 'left',
    responsive: false,
    emphasis: 'normal',
    weight: 'inherit',
  },
});

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'section' | 'article';
  children: React.ReactNode;
}

/**
 * Typography Component
 *
 * A flexible, semantic typography component that bridges design tokens to component usage.
 * Provides type-safe access to the semantic typography system with comprehensive color variants.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Typography semantic="heading-primary" as="h2" alignment="center">
 *   Section Title
 * </Typography>
 *
 * // With color variants
 * <Typography semantic="heading-primary" color="primary" as="h2">
 *   Navy Brand Heading
 * </Typography>
 *
 * <Typography semantic="body-large" color="secondary" responsive>
 *   Gold accent feature description with fluid scaling
 * </Typography>
 *
 * // Interactive states
 * <Typography semantic="title-medium" color="primary" emphasis="muted">
 *   Muted interactive title
 * </Typography>
 *
 * // Custom weight override
 * <Typography semantic="body-default" color="neutral" weight="semibold">
 *   Bold body text
 * </Typography>
 * ```
 */
export function Typography({
  className,
  semantic,
  color,
  alignment,
  responsive,
  emphasis,
  weight,
  as: Component = 'p',
  children,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        typographyVariants({ semantic, color, alignment, responsive, emphasis, weight }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Semantic Typography Components
 *
 * Pre-configured components for common use cases with semantic HTML elements.
 * Provides both flexibility and semantic correctness.
 */

interface DisplayTextProps extends Omit<TypographyProps, 'as' | 'semantic'> {
  variant?: 'hero' | 'page';
}

export function DisplayText({
  variant = 'hero',
  color = 'primary',
  children,
  className,
  ...props
}: DisplayTextProps) {
  return (
    <Typography
      as="h1"
      semantic={`display-${variant}` as any}
      color={color}
      className={cn('mb-6', className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

interface HeadingTextProps extends Omit<TypographyProps, 'as' | 'semantic'> {
  variant?: 'primary' | 'secondary';
  level?: 2 | 3;
}

export function HeadingText({
  variant = 'primary',
  level = 2,
  color = 'primary',
  children,
  className,
  ...props
}: HeadingTextProps) {
  const Component = level === 2 ? 'h2' : 'h3';
  return (
    <Typography
      as={Component}
      semantic={`heading-${variant}` as any}
      color={color}
      className={cn('mb-4', className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

interface TitleTextProps extends Omit<TypographyProps, 'as' | 'semantic'> {
  variant?: 'large' | 'medium' | 'small';
  level?: 3 | 4 | 5;
}

export function TitleText({
  variant = 'large',
  level = 3,
  color = 'neutral',
  children,
  className,
  ...props
}: TitleTextProps) {
  const componentMap = { 3: 'h3' as const, 4: 'h4' as const, 5: 'h5' as const };
  return (
    <Typography
      as={componentMap[level]}
      semantic={`title-${variant}` as any}
      color={color}
      className={cn('mb-3', className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

interface BodyTextProps extends Omit<TypographyProps, 'as' | 'semantic'> {
  variant?: 'large' | 'default' | 'small';
  as?: 'p' | 'span' | 'div';
}

export function BodyText({
  variant = 'default',
  as: Component = 'p',
  color = 'neutral',
  children,
  className,
  ...props
}: BodyTextProps) {
  return (
    <Typography
      as={Component}
      semantic={`body-${variant}` as any}
      color={color}
      className={cn('mb-4 last:mb-0', className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

interface CaptionTextProps extends Omit<TypographyProps, 'as' | 'semantic'> {
  variant?: 'large' | 'default' | 'small';
  as?: 'span' | 'div' | 'small';
}

export function CaptionText({
  variant = 'default',
  as: Component = 'span',
  color = 'muted',
  children,
  className,
  ...props
}: CaptionTextProps) {
  return (
    <Typography
      as={Component}
      semantic={`caption-${variant}` as any}
      color={color}
      className={className}
      {...props}
    >
      {children}
    </Typography>
  );
}

/**
 * Legacy Migration Helper Components
 *
 * These components help migrate from manual class composition to semantic components.
 * Map common patterns to semantic equivalents.
 */

interface LegacyHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}

/**
 * @deprecated Use DisplayText or HeadingText instead
 */
export function LegacyHeading({ level, children, className, ...props }: LegacyHeadingProps) {
  const semanticMapping = {
    1: 'display-hero' as const,
    2: 'heading-primary' as const,
    3: 'title-large' as const,
    4: 'title-medium' as const,
  };

  const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';

  return (
    <Typography
      as={Component}
      semantic={semanticMapping[level]}
      className={className}
      {...props}>
      {children}
    </Typography>
  );
}

/**
 * Type exports for external usage
 */
export type { TypographyProps, DisplayTextProps, HeadingTextProps, TitleTextProps, BodyTextProps, CaptionTextProps };

/**
 * Variant types for programmatic access
 *
 * Use these types when you need to programmatically work with typography variants,
 * such as in configuration objects, design system documentation, or runtime variant selection.
 *
 * @example
 * ```tsx
 * const headingColor: ColorVariant = 'primary';
 * const textWeight: WeightVariant = 'semibold';
 *
 * <Typography semantic="heading-primary" color={headingColor} weight={textWeight}>
 *   Dynamic Typography
 * </Typography>
 * ```
 */
export type SemanticVariant = NonNullable<VariantProps<typeof typographyVariants>['semantic']>;
export type ColorVariant = NonNullable<VariantProps<typeof typographyVariants>['color']>;
export type AlignmentVariant = NonNullable<VariantProps<typeof typographyVariants>['alignment']>;
export type EmphasisVariant = NonNullable<VariantProps<typeof typographyVariants>['emphasis']>;
export type WeightVariant = NonNullable<VariantProps<typeof typographyVariants>['weight']>;

/**
 * Compound variant types for advanced usage
 *
 * These types represent the full variant combinations possible with the typography system.
 * Useful for design system tooling and advanced component composition.
 */
export type TypographyVariants = VariantProps<typeof typographyVariants>;

/**
 * Default export for convenience
 */
export default Typography;