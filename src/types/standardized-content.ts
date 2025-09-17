// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for standardized content structure
// IMPLEMENTATION REASON: Official TypeScript documentation for interface creation with optional properties and readonly arrays

/**
 * Standardized Content Data Interface
 *
 * This interface normalizes all content variations across TwoRowHeadingTextSection
 * and VideoMasterclassGrid components into consistent, specific data fields.
 *
 * Maintains exact visual output while providing better data organization.
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Interface definition with optional properties for flexible content structure
// INTERFACE DESIGN REASON: Official TypeScript documentation for optional properties and readonly arrays for immutable data

export interface StandardizedContentSection {
  // Primary content fields
  readonly title: string;
  readonly description: string;

  // Secondary content fields (optional)
  readonly subtitle?: string;
  readonly secondaryDescription?: string;

  // Structured content
  readonly bulletPoints?: readonly string[];

  // Visual/layout fields
  readonly backgroundColor?: 'white' | 'gray-50';
  readonly className?: string;

  // Section metadata
  readonly sectionType: 'heading-text' | 'video-grid';
  readonly id: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Array type definition with readonly modifier for immutable content collections
// ARRAY DESIGN REASON: Official TypeScript documentation for readonly arrays preventing accidental mutations

export interface StandardizedPageContent {
  readonly pageTitle: string;
  readonly heroImage: string;
  readonly sections: readonly StandardizedContentSection[];
}

// CONTEXT7 SOURCE: /microsoft/typescript - Utility type creation for content mapping between existing and new structures
// MAPPING UTILITIES REASON: Official TypeScript documentation for type transformations and utility types

/**
 * Content Field Mapping Utilities
 *
 * These utilities help map existing content formats to the standardized structure:
 *
 * TwoRowHeadingTextSection mapping:
 * - headingOne → title
 * - paragraphOne → description
 * - headingTwo → subtitle
 * - paragraphTwo → secondaryDescription
 *
 * VideoMasterclass mapping:
 * - title → title
 * - description → description
 * - bulletPoints → bulletPoints
 */

export type ContentFieldMapping = {
  // TwoRowHeadingTextSection fields
  headingOne: string;        // Maps to: title
  paragraphOne: string;      // Maps to: description
  headingTwo: string;        // Maps to: subtitle (if not empty)
  paragraphTwo: string;      // Maps to: secondaryDescription (if not empty)

  // VideoMasterclass fields
  videoTitle: string;        // Maps to: title
  videoDescription: string;  // Maps to: description
  videoBulletPoints: readonly string[]; // Maps to: bulletPoints
};

// CONTEXT7 SOURCE: /microsoft/typescript - Type guard functions for runtime type checking and content validation
// TYPE GUARDS REASON: Official TypeScript documentation for type narrowing and runtime validation patterns

export function isHeadingTextContent(section: StandardizedContentSection): boolean {
  return section.sectionType === 'heading-text';
}

export function isVideoGridContent(section: StandardizedContentSection): boolean {
  return section.sectionType === 'video-grid';
}

// CONTEXT7 SOURCE: /microsoft/typescript - Helper function with typed parameters for content transformation
// TRANSFORMATION HELPERS REASON: Official TypeScript documentation for function overloads and parameter typing

export function createHeadingTextSection(
  title: string,
  description: string,
  subtitle?: string,
  secondaryDescription?: string,
  backgroundColor: 'white' | 'gray-50' = 'white'
): StandardizedContentSection {
  return {
    title,
    description,
    subtitle: subtitle || undefined,
    secondaryDescription: secondaryDescription || undefined,
    backgroundColor,
    sectionType: 'heading-text',
    id: `heading-${title.toLowerCase().replace(/\s+/g, '-')}`,
    className: 'py-16'
  };
}

export function createVideoGridSection(
  title: string,
  description: string,
  bulletPoints?: readonly string[]
): StandardizedContentSection {
  return {
    title,
    description,
    bulletPoints,
    sectionType: 'video-grid',
    id: `video-${title.toLowerCase().replace(/\s+/g, '-')}`,
    className: 'py-16'
  };
}