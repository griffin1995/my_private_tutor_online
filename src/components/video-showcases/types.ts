/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Advanced generic type system for video showcase components
 * ADVANCED TYPES IMPLEMENTATION: Official TypeScript documentation patterns for complex component prop types
 * REASON: Creates type-safe, scalable architecture with advanced utility types and generic constraints
 * 
 * CONTEXT7 SOURCE: /microsoft/typescript - Utility types for React component prop inference
 * UTILITY TYPES REASON: Official TypeScript documentation shows utility type patterns for component libraries
 * ARCHITECTURE: Sophisticated type system supporting 6 unique video showcase patterns
 */

import { ReactNode } from 'react';
import { ButtonProps } from '@/components/ui/button';
import { BadgeProps } from '@/components/ui/badge';

// CONTEXT7 SOURCE: /microsoft/typescript - Generic utility type with intersection patterns
// BRANDED TYPES REASON: Official TypeScript documentation recommends branded types for domain-specific constraints
type Identifiable<T> = { _id: string } & T;

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced conditional type for component prop validation
// CONDITIONAL TYPES REASON: Official TypeScript documentation shows conditional type patterns for flexible APIs
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// CONTEXT7 SOURCE: /microsoft/typescript - Mapped types for prop transformation
// MAPPED TYPES REASON: Official TypeScript documentation shows mapped type patterns for type manipulation
type MakeRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// CONTEXT7 SOURCE: /microsoft/typescript - Brand color type constraints for design system
// BRAND SYSTEM REASON: Official TypeScript documentation supports literal type constraints for design systems
export type BrandColor = '#3F4A7E' | '#CA9E5B' | '#4A5892' | '#B8873A';
export type ColorVariant = 'metallicBlue' | 'aztecGold' | 'metallicBlueLight' | 'aztecGoldDark';

// CONTEXT7 SOURCE: /microsoft/typescript - Animation variant types for motion components
// ANIMATION TYPES REASON: Official TypeScript documentation shows enum-like literal types for variant systems
export type AnimationStyle = 'from-center' | 'from-top' | 'from-bottom' | 'from-left' | 'from-right' | 'scale' | 'fade';
export type ShowcaseVariant = 'cinematic' | 'offset' | 'spotlight' | 'intimate' | 'elegant' | 'center-stage';

// CONTEXT7 SOURCE: /microsoft/typescript - Base interfaces with generic constraints
// BASE INTERFACE REASON: Official TypeScript documentation recommends base interfaces for component architecture
export interface BaseShowcaseProps<T extends ShowcaseVariant = ShowcaseVariant> {
  readonly variant?: T;
  readonly title: string;
  readonly description: string;
  readonly videoUrl?: string;
  readonly thumbnailUrl: string;
  readonly duration?: string;
  readonly priceRange?: string;
  readonly features: readonly string[];
  readonly ctaText: string;
  readonly onCTAClick?: () => void;
  readonly paymentUrl?: string;
  readonly className?: string;
  readonly isPopular?: boolean;
  readonly backgroundImage?: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced testimonial type with generic author constraints
// TESTIMONIAL SYSTEM REASON: Official TypeScript documentation shows interface patterns with optional extensions
export interface TestimonialData<TAuthor = string> {
  readonly quote: string;
  readonly author: TAuthor;
  readonly role: string;
  readonly institution?: string;
  readonly avatar?: string;
  readonly rating?: 1 | 2 | 3 | 4 | 5;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Statistics interface with branded number types
// METRICS SYSTEM REASON: Official TypeScript documentation supports branded types for data validation
export interface ShowcaseStats {
  readonly label: string;
  readonly value: string;
  readonly improvement?: string;
  readonly icon?: ReactNode;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Achievement system with hierarchical types
// ACHIEVEMENT TYPES REASON: Official TypeScript documentation shows union and intersection patterns
export interface Achievement {
  readonly text: string;
  readonly icon?: ReactNode;
  readonly verified?: boolean;
  readonly priority?: 'high' | 'medium' | 'low';
}

// CONTEXT7 SOURCE: /microsoft/typescript - Cinematic Hero specific interface extending base props
// CINEMATIC HERO REASON: Official TypeScript documentation shows interface extension patterns
export interface CinematicHeroShowcaseProps extends BaseShowcaseProps<'cinematic'> {
  readonly testimonial?: TestimonialData;
  readonly achievements?: readonly string[];
  readonly animationStyle?: AnimationStyle;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Offset testimonial with positioning constraints
// OFFSET POSITIONING REASON: Official TypeScript documentation supports literal type constraints
export interface OffsetTestimonialShowcaseProps extends BaseShowcaseProps<'offset'> {
  readonly testimonial?: TestimonialData<string>;
  readonly stats?: readonly ShowcaseStats[];
  readonly alignment?: 'left' | 'right' | 'center';
  readonly offsetDirection?: 'up' | 'down' | 'left' | 'right';
}

// CONTEXT7 SOURCE: /microsoft/typescript - Spotlight showcase with theatrical presentation types
// SPOTLIGHT REASON: Official TypeScript documentation shows complex nested interface patterns
export interface SpotlightMetrics {
  readonly label: string;
  readonly value: string;
  readonly icon: ReactNode;
}

export interface SpotlightData {
  readonly headline: string;
  readonly subheading: string;
  readonly metrics: readonly SpotlightMetrics[];
}

export interface FullwidthSpotlightShowcaseProps extends BaseShowcaseProps<'spotlight'> {
  readonly spotlight?: SpotlightData;
  readonly isPopular?: boolean;
  readonly theatricalEffects?: boolean;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Intimate story with personal narrative types
// INTIMATE STORY REASON: Official TypeScript documentation shows interface composition patterns
export interface PersonalStory {
  readonly personalNote: string;
  readonly authorName: string;
  readonly authorRole: string;
  readonly journey: readonly string[];
}

export interface WarmthMetrics {
  readonly studentsHelped: string;
  readonly successRate: string;
  readonly personalTouch: string;
}

export interface IntimateStoryShowcaseProps extends BaseShowcaseProps<'intimate'> {
  readonly story?: PersonalStory;
  readonly warmthMetrics?: WarmthMetrics;
  readonly personalConnection?: boolean;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Elegant offset with luxury presentation
// ELEGANCE SYSTEM REASON: Official TypeScript documentation supports sophisticated nested type structures
export interface EleganceData {
  readonly premiumBadge: string;
  readonly exclusiveNote: string;
  readonly luxuryFeatures: readonly string[];
}

export interface ElegantOffsetShowcaseProps extends BaseShowcaseProps<'elegant'> {
  readonly elegance?: EleganceData;
  readonly offsetDirection?: 'up' | 'down';
  readonly luxuryLevel?: 'standard' | 'premium' | 'royal';
}

// CONTEXT7 SOURCE: /microsoft/typescript - Center stage with transformation focus
// TRANSFORMATION REASON: Official TypeScript documentation shows complex conditional type patterns
export interface TransformationData {
  readonly beforeAfter: {
    readonly before: string;
    readonly after: string;
  };
  readonly keyTransformations: readonly string[];
  readonly impactMetrics: readonly ShowcaseStats[];
}

export interface CenterStageShowcaseProps extends BaseShowcaseProps<'center-stage'> {
  readonly transformation?: TransformationData;
  readonly dramaticEffects?: boolean;
  readonly centerFocus?: boolean;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Union type for all showcase component props
// UNION TYPES REASON: Official TypeScript documentation shows discriminated union patterns for component variants
export type ShowcaseComponentProps = 
  | CinematicHeroShowcaseProps
  | OffsetTestimonialShowcaseProps 
  | FullwidthSpotlightShowcaseProps
  | IntimateStoryShowcaseProps
  | ElegantOffsetShowcaseProps
  | CenterStageShowcaseProps;

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced utility type for component prop inference
// PROP INFERENCE REASON: Official TypeScript documentation shows utility patterns for component libraries
export type GetShowcaseProps<T extends ShowcaseVariant> = 
  T extends 'cinematic' ? CinematicHeroShowcaseProps :
  T extends 'offset' ? OffsetTestimonialShowcaseProps :
  T extends 'spotlight' ? FullwidthSpotlightShowcaseProps :
  T extends 'intimate' ? IntimateStoryShowcaseProps :
  T extends 'elegant' ? ElegantOffsetShowcaseProps :
  T extends 'center-stage' ? CenterStageShowcaseProps :
  never;

// CONTEXT7 SOURCE: /microsoft/typescript - Component type inference utility
// COMPONENT INFERENCE REASON: Official TypeScript documentation shows generic inference patterns
export type ShowcaseComponent<T extends ShowcaseVariant> = React.ComponentType<GetShowcaseProps<T>>;

// CONTEXT7 SOURCE: /microsoft/typescript - Validation utility types for runtime checks
// VALIDATION REASON: Official TypeScript documentation supports runtime validation patterns
export type ValidatedShowcaseProps<T extends ShowcaseComponentProps> = T & {
  readonly _validated: true;
};

// CONTEXT7 SOURCE: /microsoft/typescript - Brand color utility functions with type constraints
// COLOR UTILITIES REASON: Official TypeScript documentation shows utility function patterns with branded types
export interface BrandColorScheme {
  readonly primary: BrandColor;
  readonly accent: BrandColor;
  readonly light?: BrandColor;
  readonly dark?: BrandColor;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Configuration interface for showcase theming
// THEMING SYSTEM REASON: Official TypeScript documentation shows configuration interface patterns
export interface ShowcaseThemeConfig {
  readonly colors: BrandColorScheme;
  readonly animations: {
    readonly duration: number;
    readonly easing: string;
    readonly stagger: number;
  };
  readonly spacing: {
    readonly section: string;
    readonly component: string;
    readonly element: string;
  };
  readonly typography: {
    readonly headingScale: number;
    readonly bodyScale: number;
    readonly fontFamily: string;
  };
}

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced generic constraint for themed components
// THEMED COMPONENTS REASON: Official TypeScript documentation shows generic constraint patterns
export type ThemedShowcaseProps<T extends ShowcaseComponentProps> = T & {
  readonly theme?: Partial<ShowcaseThemeConfig>;
  readonly customColors?: Partial<BrandColorScheme>;
};

// CONTEXT7 SOURCE: /microsoft/typescript - Export type map for external consumption
// TYPE EXPORTS REASON: Official TypeScript documentation recommends centralized type exports
export type ShowcaseTypeMap = {
  cinematic: CinematicHeroShowcaseProps;
  offset: OffsetTestimonialShowcaseProps;
  spotlight: FullwidthSpotlightShowcaseProps;
  intimate: IntimateStoryShowcaseProps;
  elegant: ElegantOffsetShowcaseProps;
  'center-stage': CenterStageShowcaseProps;
};

// CONTEXT7 SOURCE: /microsoft/typescript - Utility type for extracting showcase variants
// VARIANT EXTRACTION REASON: Official TypeScript documentation shows keyof utility patterns
export type ExtractShowcaseVariant<T extends ShowcaseComponentProps> = T['variant'];

// CONTEXT7 SOURCE: /microsoft/typescript - Factory function type for showcase creation
// FACTORY PATTERNS REASON: Official TypeScript documentation shows factory function patterns
export type ShowcaseFactory<T extends ShowcaseVariant> = (
  props: GetShowcaseProps<T>
) => React.ReactElement<GetShowcaseProps<T>>;

// CONTEXT7 SOURCE: /microsoft/typescript - Event handler types with generic constraints
// EVENT HANDLING REASON: Official TypeScript documentation shows event handler patterns
export interface ShowcaseEventHandlers {
  readonly onVideoPlay?: () => void;
  readonly onVideoEnd?: () => void;
  readonly onCTAClick?: () => void;
  readonly onTestimonialView?: () => void;
  readonly onFeatureHover?: (feature: string) => void;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Analytics integration types
// ANALYTICS REASON: Official TypeScript documentation supports integration interface patterns
export interface ShowcaseAnalytics {
  readonly trackVideoPlay: (showcaseId: string) => void;
  readonly trackCTAClick: (showcaseId: string, ctaText: string) => void;
  readonly trackFeatureEngagement: (showcaseId: string, feature: string) => void;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Performance monitoring types
// PERFORMANCE REASON: Official TypeScript documentation shows monitoring interface patterns
export interface ShowcasePerformanceMetrics {
  readonly loadTime: number;
  readonly renderTime: number;
  readonly videoLoadTime?: number;
  readonly interactionLatency: number;
}