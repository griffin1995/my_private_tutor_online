/*
IMPLEMENTATION REASON: Gradual migration from manual class composition to semantic token system
ENHANCEMENT: 2025 industry standard semantic design token migration patterns
CONTEXT7 SOURCE: Design system migration best practices for systematic token adoption
*/

/**
 * Legacy to Semantic Token Migration Utilities
 *
 * This module provides systematic migration from existing typography patterns
 * to the new semantic design token system. Enables gradual adoption without
 * breaking existing components.
 */

import type { SemanticVariant } from '@/components/ui/typography';

/**
 * Legacy Typography Pattern Mappings
 *
 * Maps existing class combinations found in the codebase to semantic tokens.
 * Based on the typography audit findings and successful patterns identified.
 */
export const legacyToSemanticMapping = {
  // H1/Display patterns - Hero sections and page titles
  'text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4': 'semantic-heading-primary text-semantic-text-primary mb-4',
  'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white uppercase tracking-wider drop-shadow-lg': 'semantic-display-hero text-white uppercase tracking-wider drop-shadow-lg',

  // H2/Section patterns - Main section headers (successful patterns from Services page)
  'text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4': 'semantic-heading-primary text-semantic-text-primary mb-4',
  'text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-primary-900 text-center mb-6': 'semantic-heading-primary text-semantic-text-primary text-center mb-6',

  // H3/Title patterns - Component titles (from card analysis)
  'text-xl font-bold text-primary-900 mb-4 text-center': 'semantic-title-large text-semantic-text-primary mb-4 text-center',
  'text-lg md:text-xl lg:text-2xl font-bold text-primary-900': 'semantic-title-large text-semantic-text-primary',
  'text-xl font-bold text-primary-900 mb-4': 'semantic-title-large text-semantic-text-primary mb-4',

  // Body text patterns - Content descriptions
  'text-xl text-primary-700 max-w-3xl mx-auto': 'semantic-body-large text-semantic-text-body max-w-3xl mx-auto',
  'text-base md:text-lg leading-relaxed text-primary-700 mb-4': 'semantic-body-large text-semantic-text-body mb-4',
  'text-base md:text-lg leading-relaxed text-primary-700 mt-4': 'semantic-body-large text-semantic-text-body mt-4',

  // Color token mappings - Standard color patterns
  'text-primary-700': 'text-semantic-text-secondary',
  'text-primary-900': 'text-semantic-text-primary',
  'text-accent-600': 'text-semantic-text-accent',
  'text-primary-base': 'text-semantic-text-secondary',

  // Button color mappings - Interactive elements
  'bg-accent-500': 'bg-semantic-action-secondary',
  'bg-accent-500 hover:bg-accent-600': 'bg-semantic-action-secondary hover:bg-semantic-action-secondary-hover',
  'bg-primary-500': 'bg-semantic-action-primary',
  'bg-primary-500 hover:bg-primary-600': 'bg-semantic-action-primary hover:bg-semantic-action-primary-hover',

  // Caption/Small text patterns
  'text-sm text-gray-600': 'semantic-caption-default text-semantic-text-muted',
  'text-xs text-gray-500': 'semantic-caption-small text-semantic-text-muted',

  // Responsive patterns - Progressive scaling without decreases
  'text-2xl md:text-3xl lg:text-4xl xl:text-5xl': 'semantic-heading-responsive',
  'text-balance text-2xl font-semibold sm:text-3xl md:text-4xl mb-4': 'semantic-heading-primary text-semantic-text-primary mb-4',
} as const;

/**
 * Class Name Migration Utility
 *
 * Transforms legacy class names to semantic token equivalents.
 * Supports both single classes and complex class combinations.
 */
export function migrateClassNames(className: string): string {
  let result = className.trim();

  // Apply mappings in order of specificity (longer patterns first)
  const sortedMappings = Object.entries(legacyToSemanticMapping)
    .sort(([a], [b]) => b.length - a.length);

  for (const [legacy, semantic] of sortedMappings) {
    result = result.replace(new RegExp(legacy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), semantic);
  }

  return result;
}

/**
 * Component Pattern Detection
 *
 * Identifies typography patterns to suggest appropriate semantic variants.
 */
export function detectSemanticVariant(className: string): SemanticVariant | null {
  const normalizedClassName = className.toLowerCase().trim();

  // Display text detection (H1, hero sections)
  if (normalizedClassName.includes('text-7xl') ||
      normalizedClassName.includes('text-6xl') ||
      (normalizedClassName.includes('text-5xl') && normalizedClassName.includes('hero'))) {
    return 'display-hero';
  }

  if ((normalizedClassName.includes('text-5xl') || normalizedClassName.includes('text-4xl')) &&
      !normalizedClassName.includes('hero')) {
    return 'display-page';
  }

  // Heading detection (H2, section headers)
  if ((normalizedClassName.includes('text-4xl') || normalizedClassName.includes('text-3xl')) &&
      normalizedClassName.includes('font-bold')) {
    return 'heading-primary';
  }

  if ((normalizedClassName.includes('text-3xl') || normalizedClassName.includes('text-2xl')) &&
      normalizedClassName.includes('font-bold')) {
    return 'heading-secondary';
  }

  // Title detection (H3, component titles)
  if ((normalizedClassName.includes('text-2xl') || normalizedClassName.includes('text-xl')) &&
      normalizedClassName.includes('font-bold')) {
    return 'title-large';
  }

  if (normalizedClassName.includes('text-lg') && normalizedClassName.includes('font-bold')) {
    return 'title-medium';
  }

  if ((normalizedClassName.includes('text-base') || normalizedClassName.includes('text-sm')) &&
      normalizedClassName.includes('font-bold')) {
    return 'title-small';
  }

  // Body text detection
  if (normalizedClassName.includes('text-xl') && !normalizedClassName.includes('font-bold')) {
    return 'body-large';
  }

  if ((normalizedClassName.includes('text-lg') || normalizedClassName.includes('text-base')) &&
      !normalizedClassName.includes('font-bold')) {
    return 'body-default';
  }

  if (normalizedClassName.includes('text-sm') && !normalizedClassName.includes('font-bold')) {
    return 'body-small';
  }

  // Caption detection
  if (normalizedClassName.includes('text-xs')) {
    return 'caption-small';
  }

  return null;
}

/**
 * Migration Component Props Generator
 *
 * Generates semantic component props from legacy class names.
 */
interface SemanticProps {
  semantic: SemanticVariant;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  responsive?: boolean;
  emphasis?: 'normal' | 'muted' | 'subtle' | 'disabled';
  className?: string;
}

export function generateSemanticProps(legacyClassName: string): SemanticProps | null {
  const variant = detectSemanticVariant(legacyClassName);
  if (!variant) return null;

  const props: SemanticProps = {
    semantic: variant,
  };

  // Detect alignment
  if (legacyClassName.includes('text-center')) {
    props.alignment = 'center';
  } else if (legacyClassName.includes('text-right')) {
    props.alignment = 'right';
  } else if (legacyClassName.includes('text-justify')) {
    props.alignment = 'justify';
  }

  // Detect responsive patterns
  if (legacyClassName.includes('md:') || legacyClassName.includes('lg:') ||
      legacyClassName.includes('xl:') || legacyClassName.includes('clamp(')) {
    props.responsive = true;
  }

  // Detect emphasis levels
  if (legacyClassName.includes('opacity-70') || legacyClassName.includes('text-gray-600')) {
    props.emphasis = 'muted';
  } else if (legacyClassName.includes('opacity-60') || legacyClassName.includes('text-gray-500')) {
    props.emphasis = 'subtle';
  } else if (legacyClassName.includes('opacity-50') || legacyClassName.includes('text-gray-400')) {
    props.emphasis = 'disabled';
  }

  // Extract remaining classes that don't have semantic equivalents
  const semanticClasses = ['font-bold', 'font-semibold', 'text-primary-900', 'text-primary-700',
                          'text-center', 'text-right', 'text-justify', 'text-xl', 'text-lg',
                          'text-base', 'text-sm', 'text-xs', 'text-2xl', 'text-3xl', 'text-4xl',
                          'text-5xl', 'text-6xl', 'text-7xl', 'md:text-', 'lg:text-', 'xl:text-'];

  const remainingClasses = legacyClassName
    .split(' ')
    .filter(cls => !semanticClasses.some(semantic => cls.includes(semantic)))
    .join(' ')
    .trim();

  if (remainingClasses) {
    props.className = remainingClasses;
  }

  return props;
}

/**
 * Migration Report Generator
 *
 * Analyzes components and generates migration suggestions.
 */
interface MigrationSuggestion {
  originalClassName: string;
  suggestedComponent: 'DisplayText' | 'HeadingText' | 'TitleText' | 'BodyText' | 'CaptionText' | 'Typography';
  suggestedProps: SemanticProps;
  confidence: 'high' | 'medium' | 'low';
  notes?: string;
}

export function analyzeMigration(className: string): MigrationSuggestion | null {
  const props = generateSemanticProps(className);
  if (!props) return null;

  const { semantic } = props;

  let component: MigrationSuggestion['suggestedComponent'] = 'Typography';
  let confidence: MigrationSuggestion['confidence'] = 'medium';

  // Suggest specific semantic components based on variant
  if (semantic.startsWith('display-')) {
    component = 'DisplayText';
    confidence = 'high';
  } else if (semantic.startsWith('heading-')) {
    component = 'HeadingText';
    confidence = 'high';
  } else if (semantic.startsWith('title-')) {
    component = 'TitleText';
    confidence = 'high';
  } else if (semantic.startsWith('body-')) {
    component = 'BodyText';
    confidence = 'high';
  } else if (semantic.startsWith('caption-')) {
    component = 'CaptionText';
    confidence = 'high';
  }

  return {
    originalClassName: className,
    suggestedComponent: component,
    suggestedProps: props,
    confidence,
    notes: confidence === 'low' ? 'Manual review recommended - complex class combination' : undefined,
  };
}

/**
 * Batch Migration Utility
 *
 * Processes multiple class names and generates comprehensive migration report.
 */
export function batchMigrationAnalysis(classNames: string[]): MigrationSuggestion[] {
  return classNames
    .map(className => analyzeMigration(className))
    .filter((suggestion): suggestion is MigrationSuggestion => suggestion !== null);
}

/**
 * Migration Code Generator
 *
 * Generates TypeScript/TSX code for semantic components.
 */
export function generateMigrationCode(suggestion: MigrationSuggestion): string {
  const { suggestedComponent, suggestedProps } = suggestion;
  const { semantic, alignment, responsive, emphasis, className } = suggestedProps;

  const props = [];

  if (suggestedComponent === 'DisplayText') {
    props.push(`variant="${semantic.replace('display-', '')}"`);
  } else if (suggestedComponent === 'HeadingText') {
    props.push(`variant="${semantic.replace('heading-', '')}"`);
  } else if (suggestedComponent === 'TitleText') {
    props.push(`variant="${semantic.replace('title-', '')}"`);
  } else if (suggestedComponent === 'BodyText') {
    props.push(`variant="${semantic.replace('body-', '')}"`);
  } else if (suggestedComponent === 'CaptionText') {
    props.push(`variant="${semantic.replace('caption-', '')}"`);
  } else {
    props.push(`semantic="${semantic}"`);
  }

  if (alignment && alignment !== 'left') {
    props.push(`alignment="${alignment}"`);
  }

  if (responsive) {
    props.push('responsive');
  }

  if (emphasis && emphasis !== 'normal') {
    props.push(`emphasis="${emphasis}"`);
  }

  if (className) {
    props.push(`className="${className}"`);
  }

  const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';

  return `<${suggestedComponent}${propsString}>\n  {content}\n</${suggestedComponent}>`;
}

/**
 * Type exports for external usage
 */
export type { MigrationSuggestion, SemanticProps };

/**
 * Validation utilities
 */
export function validateSemanticMigration(originalClassName: string, semanticClassName: string): boolean {
  // Basic validation to ensure semantic migration maintains visual appearance
  const hasResponsive = originalClassName.includes('md:') || originalClassName.includes('lg:');
  const hasSemanticResponsive = semanticClassName.includes('responsive') ||
                                semanticClassName.includes('semantic-heading-responsive') ||
                                semanticClassName.includes('semantic-display-responsive');

  if (hasResponsive && !hasSemanticResponsive) {
    console.warn('Migration may lose responsive behavior:', originalClassName);
    return false;
  }

  return true;
}

/**
 * Default export provides the main migration function
 */
export default migrateClassNames;