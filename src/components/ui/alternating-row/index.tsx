/**
 * ALTERNATING ROW COMPONENT SYSTEM - PUBLIC EXPORTS
 *
 * Modern React component library for 50/50 image-text layouts with advanced
 * TypeScript patterns, container queries, and WCAG 2025 compliance.
 *
 * @author Claude Code Implementation
 * @version 1.0.0 - November 2025
 */

// Core Components
export { AlternatingRow } from './AlternatingRow';
export { AlternatingRowHeader } from './AlternatingRowHeader';
export { AlternatingRowDescription } from './AlternatingRowDescription';
export { AlternatingRowBullets } from './AlternatingRowBullets';
export { AlternatingLayout } from './AlternatingLayout';
export { StepIndicator } from './StepIndicator';

// TypeScript Types
export type {
  // Core component props
  AlternatingRowProps,
  AlternatingRowHeaderProps,
  AlternatingRowDescriptionProps,
  AlternatingRowBulletsProps,
  AlternatingLayoutProps,

  // Data structures
  AlternatingRowImage,
  BulletPoint,
  ContainerConfig,
  CardConfig,

  // Utility types
  AlternatingRowVariant,
  AlternatingRowIcon,
  AlternatingRowRef,

  // CMS integration types
  CMSAlternatingRowData,

  // Advanced configuration types
  AlternatingRowEventHandlers,
  PerformanceConfig,
  A11yConfig,
  AlternatingRowConfig,

  // Utility types for advanced usage
  VariantProps,
  TypedBulletPoints,
} from './types';

// Utility functions
export {
  isCMSData,
  transformCMSData,
} from './types';

// StepIndicator types
export type { StepIndicatorProps } from './StepIndicator';


/**
 * Convenience exports for common usage patterns
 */

// Re-export with cleaner naming for common use cases
export {
  AlternatingRow as Row,
  AlternatingRowHeader as Header,
  AlternatingRowDescription as Description,
  AlternatingRowBullets as Bullets,
  AlternatingLayout as Layout,
} from './index';

/**
 * Component composition helpers
 */
export const AlternatingRowComponents = {
  Row: AlternatingRow,
  Header: AlternatingRowHeader,
  Description: AlternatingRowDescription,
  Bullets: AlternatingRowBullets,
  Layout: AlternatingLayout,
} as const;

/**
 * Version information
 */
export const VERSION = '1.0.0';
export const BUILD_DATE = '2025-11-21';
export const FEATURE_SET = [
  'Container Queries',
  'TypeScript 5.8+',
  'WCAG 2025 Compliance',
  'Next.js Image Optimization',
  'CMS Integration Ready',
  'Performance Optimized',
] as const;