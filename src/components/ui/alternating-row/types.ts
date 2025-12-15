/**
 * ALTERNATING ROW COMPONENT TYPES
 *
 * Advanced TypeScript interfaces for the alternating row component system.
 * Follows 2025 best practices with discriminated unions, strict type safety,
 * and future Payload CMS compatibility.
 *
 * @author Claude Code Implementation
 * @version 1.0.0 - November 2025
 */

import type { LucideIcon } from 'lucide-react';
import type { ReactNode, ComponentType } from 'react';
import React from 'react';

/**
 * Image configuration with Next.js optimization support
 * Designed for future Payload CMS media field integration
 */
interface AlternatingRowImage {
  /** Image source URL or path */
  src: string;
  /** Required alt text for accessibility (WCAG 2025) */
  alt: string;
  /** Image width for Next.js optimization */
  width?: number;
  /** Image height for Next.js optimization */
  height?: number;
  /** Priority loading for above-the-fold images (LCP optimization) */
  priority?: boolean;
  /** Responsive image sizes hint for Next.js */
  sizes?: string;
  /** Custom CSS classes for image styling */
  className?: string;
}

/**
 * Icon configuration with type safety
 * Supports both Lucide icons and custom icon components
 */
export type AlternatingRowIcon = LucideIcon | ComponentType<{ className?: string }>;

/**
 * Layout variant discriminated union
 * Ensures type-safe image positioning
 */
type AlternatingRowVariant = 'left' | 'right';

/**
 * Container query configuration
 * Enables responsive behavior based on container size
 */
interface ContainerConfig {
  /** Enable container queries (default: true) */
  enabled?: boolean;
  /** Container name for targeted queries */
  name?: string;
}

/**
 * Card wrapper configuration for enhanced styling
 * Enables shadcn/ui Card component integration
 */
interface CardConfig {
  /** Enable Card wrapper (default: false) */
  enabled?: boolean;
  /** Card variant style */
  variant?: 'default' | 'elevated' | 'outline';
  /** Card padding override */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Core props for the AlternatingRow component
 * Uses discriminated unions for type safety
 */
export interface AlternatingRowProps {
  /** Unique identifier for the row (CMS compatibility) */
  id?: string;
  /** Image position - determines layout direction */
  variant: AlternatingRowVariant;
  /** Optional numbered badge for sequenced content */
  number?: number;
  /** Optional icon component for visual hierarchy */
  icon?: AlternatingRowIcon;
  /** Image configuration with optimization settings */
  image: AlternatingRowImage;
  /** Child components (header, description, bullets) */
  children: ReactNode;
  /** Container query configuration */
  container?: ContainerConfig;
  /** Card wrapper configuration for enhanced styling */
  card?: CardConfig;
  /** Custom CSS classes with Tailwind utilities */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Additional data attributes */
  [key: `data-${string}`]: string | number | boolean | undefined;
}

/**
 * Props for the AlternatingRowHeader component
 */
export interface AlternatingRowHeaderProps {
  /** Heading text content */
  children: ReactNode;
  /** Semantic heading level (h1-h6) */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Optional icon to display beside heading text */
  icon?: AlternatingRowIcon;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Props for the AlternatingRowDescription component
 */
export interface AlternatingRowDescriptionProps {
  /** Description text content */
  children: ReactNode;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Individual bullet point configuration
 */
export interface BulletPoint {
  /** Unique identifier */
  id: string;
  /** Bullet text content */
  text: string;
  /** Optional icon for the bullet */
  icon?: AlternatingRowIcon;
  /** Custom styling */
  className?: string;
}

/**
 * Props for the AlternatingRowBullets component
 */
export interface AlternatingRowBulletsProps {
  /** Array of bullet point configurations */
  items: BulletPoint[] | string[];
  /** Custom list styling */
  variant?: 'default' | 'numbered' | 'icons';
  /** Custom CSS classes */
  className?: string;
}

/**
 * Props for the AlternatingLayout container component
 */
export interface AlternatingLayoutProps {
  /** Child AlternatingRow components */
  children: ReactNode;
  /** Layout spacing configuration */
  spacing?: 'tight' | 'normal' | 'loose';
  /** Container query behavior */
  containerType?: 'normal' | 'container-queries';
  /** Maximum width constraint with automatic padding control */
  maxWidth?: 'container' | 'full' | 'none';
  /** Show separators between rows */
  showSeparators?: boolean;
  /** Separator configuration */
  separatorConfig?: {
    /** Separator variant */
    variant?: 'default' | 'dashed' | 'dotted';
    /** Separator spacing */
    spacing?: 'sm' | 'md' | 'lg';
    /** Separator width as percentage */
    width?: number;
  };
  /** Custom CSS classes */
  className?: string;
}

/**
 * CMS-ready data structure for future Payload integration
 * Matches the component prop structure for seamless integration
 */
interface CMSAlternatingRowData {
  /** Unique CMS record ID */
  id: string;
  /** Layout variant */
  variant: AlternatingRowVariant;
  /** Optional sequence number */
  number?: number;
  /** Icon identifier for dynamic loading */
  icon?: string;
  /** CMS media field structure */
  image: {
    /** Media field URL */
    url: string;
    /** Alt text from CMS */
    alt: string;
    /** Image dimensions from CMS */
    width: number;
    height: number;
    /** Filename for debugging */
    filename?: string;
  };
  /** Rich text heading */
  heading: string;
  /** Rich text description (supports markdown) */
  description: string;
  /** Array of bullet points */
  bullets?: Array<{
    id: string;
    text: string;
    icon?: string;
  }>;
  /** CMS timestamps */
  createdAt: string;
  updatedAt: string;
  /** Publication status */
  _status?: 'draft' | 'published';
}

/**
 * Type guard for checking if data is from CMS
 */
function isCMSData(data: unknown): data is CMSAlternatingRowData {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'string' &&
    typeof data.heading === 'string' &&
    typeof data.image?.url === 'string'
  );
}

/**
 * Transform CMS data to component props
 * Enables seamless integration with future Payload CMS
 */
function transformCMSData(data: CMSAlternatingRowData): Omit<AlternatingRowProps, 'children'> {
  return {
    id: data.id,
    variant: data.variant,
    number: data.number,
    // Icon transformation would happen here with dynamic imports
    image: {
      src: data.image.url,
      alt: data.image.alt,
      width: data.image.width,
      height: data.image.height,
      priority: data.number === 1, // First item gets priority
    },
    'data-cms-id': data.id,
    'data-status': data._status,
  };
}

/**
 * Utility type for extracting variant-specific props
 */
type VariantProps<T extends AlternatingRowVariant> = AlternatingRowProps & {
  variant: T;
};

/**
 * Utility type for creating strongly-typed bullet configurations
 */
type TypedBulletPoints<T extends readonly string[]> = {
  readonly [K in keyof T]: BulletPoint & { text: T[K] };
};

/**
 * Helper type for component ref forwarding
 * Uses specific HTMLDivElement instead of generic HTMLElement for proper type compatibility
 */
export type AlternatingRowRef = HTMLDivElement;

/**
 * Component with displayName property for type-safe component identification
 */
interface ComponentWithDisplayName {
  displayName?: string;
}

/**
 * React element with properly typed displayName for component type checking
 */
type ReactElementWithDisplayName = React.ReactElement & {
  type: ComponentWithDisplayName;
};

/**
 * Type predicate function for checking if a React node is an AlternatingRowHeader
 * @param child - React node to check
 * @returns Type-safe predicate confirming AlternatingRowHeader component
 */
export function isAlternatingRowHeader(
  child: React.ReactNode
): child is React.ReactElement<AlternatingRowHeaderProps> {
  return (
    React.isValidElement(child) &&
    typeof child.type === 'object' &&
    child.type !== null &&
    'displayName' in child.type &&
    (child.type as ComponentWithDisplayName).displayName === 'AlternatingRowHeader'
  );
}

/**
 * Event handler types for interactive functionality
 */
interface AlternatingRowEventHandlers {
  /** Click handler for the entire row */
  onRowClick?: (id: string) => void;
  /** Image click handler */
  onImageClick?: (src: string) => void;
  /** Bullet click handler */
  onBulletClick?: (bulletId: string) => void;
}

/**
 * Performance optimization configuration
 */
interface PerformanceConfig {
  /** Enable React.memo optimization */
  memoized?: boolean;
  /** Enable lazy loading for images */
  lazyLoad?: boolean;
  /** Preload strategy for images */
  preload?: 'none' | 'metadata' | 'auto';
}

/**
 * Accessibility configuration
 */
interface A11yConfig {
  /** Screen reader description */
  description?: string;
  /** Landmark role */
  role?: 'article' | 'section' | 'region';
  /** Tab index for keyboard navigation */
  tabIndex?: number;
}

/**
 * Complete configuration interface combining all optional configs
 */
interface AlternatingRowConfig extends PerformanceConfig, A11yConfig {
  container?: ContainerConfig;
  events?: AlternatingRowEventHandlers;
}