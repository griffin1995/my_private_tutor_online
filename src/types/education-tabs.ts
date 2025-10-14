/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface definitions for education tab CMS data
 * INTERFACE REASON: Official TypeScript documentation for type-safe data structure definitions
 *
 * Education Level Tab Content Types
 * Centralized type definitions for standardized tab content system
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Readonly properties for immutable data structures
// READONLY REASON: Official TypeScript documentation for enforcing data immutability in CMS content

/**
 * Video asset for subsection cards
 * Uses HeroVideoDialog component for display
 */
export interface VideoAsset {
  readonly id: string;
  readonly youtubeUrl: string;
  readonly thumbnailSrc: string;
  readonly thumbnailAlt: string;
  readonly isFree: boolean;
}

/**
 * Subsection card content
 * Each card displays heading, body text, and optional multiple videos
 */
export interface SubsectionCard {
  readonly id: string;
  readonly heading: string;
  readonly mainTextBody: string;
  readonly videos?: ReadonlyArray<VideoAsset>; // Optional, can have multiple videos
}

/**
 * Call out / key point
 * Highlighted information boxes (typically 3 per education level)
 */
export interface CallOut {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: 'award' | 'users' | 'school' | 'trending-up' | 'shield' | 'check-circle';
}

/**
 * Complete education level tab content structure
 */
export interface EducationLevelTabContent {
  readonly id: string;
  readonly title: string; // Used in tab bar only
  readonly mainDescription: string; // Intro paragraph
  readonly subsections: ReadonlyArray<SubsectionCard>; // 0-N cards
  readonly callOuts: ReadonlyArray<CallOut>; // Typically 3
  readonly testimonialIds: ReadonlyArray<string>; // IDs to filter testimonials from CMS
}
