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
;

// TypeScript Types
export type {
  // Core component props
  
  
  
  
  

  // Data structures
  
  
  
  

  // Utility types
  
  
  

  // CMS integration types
  

  // Advanced configuration types
  
  
  
  

  // Utility types for advanced usage
  
  
} from './types';

// Utility functions
;

// StepIndicator types
;


/**
 * Convenience exports for common usage patterns
 */

// Re-export with cleaner naming for common use cases
;

/**
 * Component composition helpers
 */
const AlternatingRowComponents = {
  Row: AlternatingRow,
  Header: AlternatingRowHeader,
  Description: AlternatingRowDescription,
  Bullets: AlternatingRowBullets,
  Layout: AlternatingLayout,
} as const;

/**
 * Version information
 */
const VERSION = '1.0.0';
const BUILD_DATE = '2025-11-21';
const FEATURE_SET = [
  'Container Queries',
  'TypeScript 5.8+',
  'WCAG 2025 Compliance',
  'Next.js Image Optimization',
  'CMS Integration Ready',
  'Performance Optimized',
] as const;