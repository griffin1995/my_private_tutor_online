// CONTEXT7 SOURCE: /microsoft/typescript - Standardized content interfaces for consistent data structure
// STANDARDIZATION REASON: Official TypeScript documentation for interface design and type safety

export interface StandardizedContent {
  // Core content fields
  readonly title: string;                    // Main heading
  readonly description: string;              // Main body text
  readonly subtitle?: string;                // Secondary heading
  readonly secondaryDescription?: string;    // Secondary body text
  readonly bulletPoints?: readonly string[]; // List items

  // Layout fields
  readonly backgroundColor?: 'white' | 'gray-50';
  readonly className?: string;

  // Metadata
  readonly id: string;
  readonly sectionType: 'heading-text' | 'video-grid';
}

export interface StandardizedHeadingContent extends StandardizedContent {
  readonly sectionType: 'heading-text';
}

export interface StandardizedVideoContent extends StandardizedContent {
  readonly sectionType: 'video-grid';
  readonly videos: readonly StandardizedVideoMasterclass[];
}

export interface StandardizedVideoMasterclass {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly bulletPoints?: readonly string[];
  readonly youtubeUrl: string | null;
  readonly thumbnailImage: string;
  readonly backgroundImage: string;
  readonly isPaid: boolean;
  readonly purchaseLink?: string;
}

// Helper functions for creating standardized content
export function createHeadingTextSection(
  id: string,
  title: string,
  description: string,
  subtitle?: string,
  secondaryDescription?: string,
  backgroundColor?: 'white' | 'gray-50',
  className?: string
): StandardizedHeadingContent {
  return {
    id,
    title,
    description,
    subtitle,
    secondaryDescription,
    backgroundColor,
    className,
    sectionType: 'heading-text'
  };
}

export function createVideoGridSection(
  id: string,
  videos: readonly StandardizedVideoMasterclass[],
  className?: string
): StandardizedVideoContent {
  return {
    id,
    title: '', // Videos don't have section-level titles
    description: '', // Videos don't have section-level descriptions
    videos,
    className,
    sectionType: 'video-grid'
  };
}