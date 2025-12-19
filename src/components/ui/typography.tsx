/*
CONTEXT7 SOURCE: /joe-bell/cva - Class Variance Authority for type-safe component variants
IMPLEMENTATION REASON: Semantic typography component system bridging design tokens to component usage
ENHANCEMENT: 2025 industry standard semantic design token integration with CVA
*/

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import React from 'react';

/**
 * Semantic Typography Component Variants
 *
 * Maps semantic typography tokens to Tailwind classes with type-safe variants.
 * Supports the 3-tier semantic token hierarchy: Primitive → Semantic → Component
 */
const typographyVariants = cva('', {
  variants: {
    semantic: {
      // Display variants (H1) - Hero/Landing pages
      'display-hero': 'text-semantic-display-hero font-heading font-bold',
      'display-page': 'text-semantic-display-page font-heading font-bold',

      // Heading variants (H2) - Major content sections
      'heading-primary': 'text-semantic-heading-primary font-heading font-bold',
      'heading-secondary': 'text-semantic-heading-secondary font-heading font-bold',

      // Title variants (H3) - Cards, widgets, smaller sections
      'title-large': 'text-semantic-title-large font-heading font-bold',
      'title-medium': 'text-semantic-title-medium font-heading font-bold',
      'title-small': 'text-semantic-title-small font-heading font-bold',

      // Body variants - Content and descriptions
      'body-large': 'text-semantic-body-large font-body leading-relaxed',
      'body-default': 'text-semantic-body-default font-body leading-relaxed',
      'body-small': 'text-semantic-body-small font-body leading-relaxed',

      // Caption variants - Labels, metadata, utility text
      'caption-large': 'text-semantic-caption-large font-body',
      'caption-default': 'text-semantic-caption-default font-body',
      'caption-small': 'text-semantic-caption-small font-body',
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
      muted: 'opacity-70',
      subtle: 'opacity-60',
      disabled: 'opacity-50',
    }
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
    // Emphasis combinations for accessibility
    {
      semantic: ['caption-large', 'caption-default', 'caption-small'],
      emphasis: 'muted',
      class: 'text-semantic-text-muted opacity-80'
    },
    {
      semantic: ['body-large', 'body-default', 'body-small'],
      emphasis: 'subtle',
      class: 'text-semantic-text-secondary'
    }
  ],
  defaultVariants: {
    semantic: 'body-default',
    alignment: 'left',
    responsive: false,
    emphasis: 'normal',
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
 * Provides type-safe access to the semantic typography system.
 *
 * @example
 * ```tsx
 * <Typography semantic="heading-primary" as="h2" alignment="center">
 *   Section Title
 * </Typography>
 *
 * <Typography semantic="body-large" responsive>
 *   Feature description with fluid scaling
 * </Typography>
 * ```
 */
export function Typography({
  className,
  semantic,
  alignment,
  responsive,
  emphasis,
  as: Component = 'p',
  children,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(typographyVariants({ semantic, alignment, responsive, emphasis }), className)}
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
  children,
  className,
  ...props
}: DisplayTextProps) {
  return (
    <Typography
      as="h1"
      semantic={`display-${variant}` as any}
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
  children,
  className,
  ...props
}: HeadingTextProps) {
  const Component = level === 2 ? 'h2' : 'h3';
  return (
    <Typography
      as={Component}
      semantic={`heading-${variant}` as any}
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
  children,
  className,
  ...props
}: TitleTextProps) {
  const componentMap = { 3: 'h3' as const, 4: 'h4' as const, 5: 'h5' as const };
  return (
    <Typography
      as={componentMap[level]}
      semantic={`title-${variant}` as any}
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
  children,
  className,
  ...props
}: BodyTextProps) {
  return (
    <Typography
      as={Component}
      semantic={`body-${variant}` as any}
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
  children,
  className,
  ...props
}: CaptionTextProps) {
  return (
    <Typography
      as={Component}
      semantic={`caption-${variant}` as any}
      className={cn('text-semantic-text-muted', className)}
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
      {...props}
    >
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
 */
export type SemanticVariant = NonNullable<VariantProps<typeof typographyVariants>['semantic']>;
export type AlignmentVariant = NonNullable<VariantProps<typeof typographyVariants>['alignment']>;
export type EmphasisVariant = NonNullable<VariantProps<typeof typographyVariants>['emphasis']>;

/**
 * Default export for convenience
 */
export default Typography;