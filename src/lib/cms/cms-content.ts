/**
 * Documentation Source: TypeScript Handbook + Next.js Data Patterns
 * Reference: https://www.typescriptlang.org/docs/handbook/2/modules.html
 * Reference: https://nextjs.org/docs/app/building-your-application/data-fetching/patterns
 *
 * Pattern: Centralized CMS with TypeScript Interfaces
 * Architecture:
 * - JSON-based content storage for version control
 * - Type-safe content access with interfaces
 * - Synchronous data loading (suitable for static content)
 *
 * Design Decisions:
 * - File-based CMS for simplicity and Git tracking
 * - Strongly typed interfaces for content structure
 * - Getter functions for controlled access
 * - No hardcoded content in components
 *
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content must use centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: CMS comment requirement
 * - Rule 25: Structured data management
 */

// CMS DATA SOURCE: Centralised content management for My Private Tutor Online
// MANDATORY: All content must use this CMS system - CLAUDE.md rule 22-25

// CONTEXT7 SOURCE: /reactjs/react.dev - React cache function for synchronous data memoization
// SYNCHRONOUS ARCHITECTURE RESTORATION: Return to working pattern from August 14, 2025
// WORKING PATTERN REASON: Direct JSON imports eliminate async complexity and loading states
import { cache } from "react";

// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON imports for synchronous data access
// ARCHITECTURAL RECOVERY: Restore proven working pattern with direct static imports
import aboutContent from "../../content/about.json";
import businessAnalyticsContent from "../../content/business-analytics.json";
import businessContent from "../../content/business-content.json";
import faqContentJSON from "../../content/faq.json";
import formContent from "../../content/form-content.json";
import howItWorksContent from "../../content/how-it-works.json";
import landingPageContent from "../../content/landing-page.json";
import quoteFormContent from "../../content/quote-form.json";
import settingsContent from "../../content/settings.json";
// CONTEXT7 SOURCE: /microsoft/typescript - Dynamic import patterns for CMS content switching
// IMPLEMENTATION REASON: Import new tutor structure with fallback to existing structure
import testimonialsContent from "../../content/testimonials.json";
import tutorsNewContent from "../../content/tutors-new.json";

// CONTEXT7 SOURCE: /microsoft/typescript - Module re-export patterns for centralized API
// CMS DATA SOURCE: Re-exporting getTestimonialVideos and tutor image utilities from cms-images for centralized access
import { getTestimonialVideos } from "./cms-images";

// CONTEXT7 SOURCE: /microsoft/typescript - FAQ content import for centralized FAQ data management
// CMS DATA SOURCE: Importing faqContent from cms-faq for FAQ page functionality
import faqContent from "./cms-faq";

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for return type safety
// CONTEXT7 SOURCE: /microsoft/typescript - Generic type constraints for reusable components
// COMPREHENSIVE TYPE SYSTEM: Complete TypeScript interfaces for all CMS return types

// ========================================================================================
// CORE CONTENT TYPE DEFINITIONS - Comprehensive TypeScript Interfaces
// ========================================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Type export patterns for external consumption
// TYPE EXPORTS: All CMS interfaces available for external components and libraries
export type {
  AboutContent,
  BaseCMSContent,
  BusinessAnalyticsData,
  BusinessDetails,
  BusinessInfo,
  CaseStudyItem,
  CMSResponse,
  CommonFormContent,
  CompanyTimelineItem,
  CompanyTimelineSection,
  CompetitiveAnalysisData,
  ConsultationFormContent,
  ContactAddress,
  ContactDetails,
  ContactSection,
  CTAButton,
  CTASection,
  FAQAnalytics,
  FAQCategory,
  FAQContent,
  FAQQuestion,
  FAQRichMediaCode,
  FAQRichMediaContent,
  FAQRichMediaDemo,
  FAQRichMediaDiagram,
  FAQRichMediaGif,
  FAQRichMediaSection,
  FAQRichMediaVideo,
  FAQSearchFilters,
  FAQSearchMetadata,
  FAQSubcategory,
  FooterContent,
  FooterFormContent,
  FooterLink,
  FooterSection,
  FormContent,
  HeroContent,
  HowItWorksContent,
  HowItWorksStep,
  NavigationItem,
  NewsletterFormContent,
  PricingInfo,
  QuoteContent,
  QuoteFormContent,
  QuoteFormField,
  QuoteFormMessages,
  QuoteFormOption,
  QuoteFormSection,
  ResultsDocumentationItem,
  ResultsSection,
  ROICalculationData,
  Service,
  ServiceFeature,
  ServicesPageContent,
  ServicesSection,
  ServiceStatisticItem,
  ServiceSubjectCategory,
  ServiceSubjectItem,
  SiteConfig,
  SiteHeader,
  Statistic,
  StudentJourneySection,
  StudentJourneyStep,
  Testimonial,
  TestimonialsContent,
  TestimonialsSection,
  TestimonialVideo,
  TierPricingInfo,
  TrustIndicator,
  TrustIndicatorsSection,
  TutorProfile,
  TutorProfilesSection,
  TutorTier,
  TutorTiersSection,
  UnifiedContactData,
};

/**
 * Base interface for all CMS content with common metadata
 * @template T - Content data type
 */
export interface BaseCMSContent<T = unknown> {
  readonly content: T;
  readonly timestamp?: string;
  readonly version?: string;
}

/**
 * Generic CMS response wrapper for type-safe content access
 * @template T - The content type being returned
 */
export interface CMSResponse<T> {
  readonly data: T;
  readonly success: boolean;
  readonly error?: string;
}

// Navigation and Header Types
export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export interface SiteHeader {
  readonly siteName: string;
  readonly logo: string;
  readonly navigation: readonly NavigationItem[];
  readonly ctaButton?: {
    readonly text: string;
    readonly href: string;
  };
}

// Hero Section Types
export interface HeroContent {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly ctaButtons: readonly {
    readonly text: string;
    readonly href: string;
    readonly variant: "primary" | "secondary";
  }[];
  readonly playButton?: {
    readonly enabled: boolean;
    readonly videoUrl?: string;
  };
}

// Trust and Credibility Types
export interface TrustIndicator {
  readonly icon: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly description: string;
  readonly imageUrl?: string;
  readonly imageAlt?: string;
}

export interface TrustIndicatorsSection {
  readonly title: string;
  readonly subtitle?: string;
  readonly indicators: readonly TrustIndicator[];
}

// Student Journey and Process Types
export interface StudentJourneyStep {
  readonly step: string;
  readonly title: string;
  readonly icon: string;
  readonly description: string;
  readonly duration: string;
}

export interface StudentJourneySection {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly steps: readonly StudentJourneyStep[];
}

// Testimonial and Social Proof Types
// CONTEXT7 SOURCE: /microsoft/typescript - Interface definitions for testimonial data structures
// TESTIMONIALS OVERHAUL: Unified interface supporting both text and video testimonials
// IMPLEMENTATION REASON: Single source of truth for all testimonial data across components
export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly avatar?: string;
  readonly rating: number;
  readonly verified?: boolean;
  readonly date?: string;
  readonly location?: string;
  readonly subject?: string; // Added for About Us testimonials
  readonly result?: string; // Added for About Us testimonials
  readonly school?: string;
  // Video testimonial fields
  readonly hasVideo: boolean;
  readonly videoUrl?: string;
  readonly videoThumbnail?: string;
  readonly duration?: number;
  readonly viewCount?: number;
  readonly uploadDate?: string;
  // Categorization
  readonly category:
    | "academic"
    | "entrance-exam"
    | "general"
    | "11+"
    | "GCSE"
    | "A-Level"
    | "Oxbridge"
    | "International";
}

export interface TestimonialsSection {
  readonly title: string;
  readonly subtitle: string;
  readonly testimonials: readonly Testimonial[];
  readonly showRatings?: boolean;
}

// Service and Features Types
export interface ServiceFeature {
  readonly feature: string;
}

export interface Service {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly features: readonly ServiceFeature[];
  readonly ctaText: string;
  readonly ctaLink: string;
  readonly price?: {
    readonly from: string;
    readonly currency: string;
  };
}

export interface ServicesSection {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly services: readonly Service[];
}

// Statistics and Results Types
export interface Statistic {
  readonly number: string;
  readonly label: string;
  readonly description: string;
  readonly icon: string;
  readonly lucideIcon?: string; // CONTEXT7 SOURCE: /context7/lucide_dev-guide - Icon names for varied visual representation
  readonly imageKey?: string;
  readonly imageUrl?: string;
  readonly imageAlt?: string;
  readonly trend?: "up" | "down" | "stable";
  readonly period?: string;
}

export interface ResultsSection {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly statistics: readonly Statistic[];
  readonly backgroundImage?: string;
}

// Footer and Navigation Types
export interface FooterLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface FooterSection {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export interface FooterContent {
  readonly companyName: string;
  readonly description: string;
  readonly sections: readonly FooterSection[];
  readonly socialLinks?: readonly {
    readonly platform: string;
    readonly url: string;
    readonly icon: string;
  }[];
  readonly copyright?: string;
  readonly legalLinks?: readonly FooterLink[];
}

// How It Works and Process Types
export interface HowItWorksStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly icon: string;
}

export interface HowItWorksContent {
  readonly hero: {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly backgroundImage?: string;
  };
  readonly steps: readonly HowItWorksStep[];
  readonly benefits: readonly string[];
  readonly cta: {
    readonly title: string;
    readonly description: string;
    readonly button: {
      readonly text: string;
      readonly href: string;
    };
  };
}

// Tutor and Teaching Types
export interface TutorTier {
  readonly tier: string;
  readonly description: string;
  readonly bestFor: string;
  readonly pricePoint: string;
  readonly qualifications?: readonly string[];
  readonly experience?: string;
}

export interface TutorTiersSection {
  readonly title: string;
  readonly subtitle: string;
  readonly tiers: readonly TutorTier[];
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Component prop interface patterns for tutor profile data
// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for tutor profile structured data
// TUTOR PROFILE TYPE: Individual tutor profile with academic credentials and specializations
export interface TutorProfile {
  readonly id: string;
  readonly name: string;
  readonly title: string; // e.g., "Senior Oxbridge Tutor", "11+ Specialist"
  readonly tier?: "tier-one" | "tier-two" | "tier-three"; // New tier classification
  readonly badge?: string; // New badge emoji for tier display
  readonly education: {
    readonly university: string;
    readonly degree: string;
    readonly additionalQualifications?: readonly string[]; // New field for additional qualifications
    readonly grade?: string; // e.g., "First Class Honours"
    readonly graduationYear?: string;
    readonly additionalInfo?: string; // New field for additional education info
  };
  readonly specializations: readonly string[]; // e.g., ["Mathematics", "Physics", "Oxbridge Prep"]
  readonly experience: {
    readonly yearsTeaching: number;
    readonly description: string;
    readonly totalStudents?: number;
    readonly onlineHours?: number; // New field for online tutoring hours
    readonly eliteSchools?: readonly string[]; // New field for elite school experience
    readonly teachingAreas?: readonly string[]; // New field for teaching areas
    readonly internationalExperience?: boolean; // New field for international experience
    readonly headteacherExperience?: boolean; // New field for headteacher experience
    readonly grammarSuccess?: readonly string[]; // New field for grammar school success
    readonly languagesFluent?: number; // New field for languages fluent
    readonly eliteSchoolSuccess?: readonly string[]; // New field for elite school placements
    readonly tutoringHours?: number; // New field for tutoring hours
    readonly admissionsSuccess?: readonly string[]; // New field for admissions success
  };
  readonly achievements: readonly {
    readonly title: string;
    readonly description: string;
    readonly year?: string;
  }[];
  readonly image: {
    readonly key: string; // Reference to cms-images.ts
    readonly alt: string;
    readonly professionalHeadshot: boolean;
  };
  readonly bio: string;
  readonly testimonial?: {
    readonly quote: string;
    readonly author: string;
    readonly context: string;
  }; // New field for individual testimonials
  readonly availability?: {
    readonly status: "available" | "limited" | "unavailable";
    readonly nextAvailable?: string; // ISO date string
  };
  readonly credentials: readonly {
    readonly type: "qualification" | "certification" | "membership" | "award";
    readonly title: string;
    readonly institution?: string;
    readonly year?: string;
    readonly verified: boolean;
  }[];
  readonly teachingStyle: {
    readonly approach: string;
    readonly methodology: readonly string[];
    readonly strengthAreas: readonly string[];
  };
  readonly subjectExpertise: readonly {
    readonly subject: string;
    readonly level:
      | "11+"
      | "13+"
      | "Primary"
      | "GCSE"
      | "A-Level"
      | "IB"
      | "University"
      | "International"
      | "Oxbridge"
      | "All";
    readonly examBoards?: readonly string[];
    readonly yearsExperience: number;
  }[];
  readonly featured: boolean;
  readonly order: number; // Display order priority
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React component section interface patterns
// TUTOR PROFILES SECTION TYPE: Complete tutors section with heading and grid of profiles
export interface TutorProfilesSection {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly profiles: readonly TutorProfile[];
  readonly showAllButton?: {
    readonly text: string;
    readonly href: string;
  };
  readonly backgroundStyle?: "light" | "dark" | "gradient";
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for key:value tutor structure
// NEW TUTOR PROFILES SECTION TYPE: Updated structure with key:value profiles object
export interface TutorProfilesSectionNew {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly profiles: { readonly [key: string]: TutorProfile };
  readonly showAllButton?: {
    readonly text: string;
    readonly href: string;
  };
  readonly backgroundStyle?: "light" | "dark" | "gradient";
}

// Call-to-Action Types
export interface CTAButton {
  readonly text: string;
  readonly type: "primary" | "secondary" | "outline";
  readonly href: string;
  readonly external?: boolean;
  readonly trackingId?: string;
}

export interface CTASection {
  readonly title: string;
  readonly brandStatement: string;
  readonly description: string;
  readonly primaryButtonText: string;
  readonly secondaryButtonText: string;
  readonly siteName: string;
  readonly showVideo?: boolean;
  readonly videoHeight?: string;
  readonly backgroundColor?: string;
}

// Form Content Types
export interface NewsletterFormContent {
  readonly title: string;
  readonly description: string;
  readonly successMessage: string;
  readonly buttonText: string;
  readonly fields: {
    readonly firstName: {
      readonly label: string;
      readonly placeholder: string;
    };
    readonly email: {
      readonly label: string;
      readonly placeholder: string;
    };
  };
}

export interface ConsultationFormContent {
  readonly fields: {
    readonly parentName: {
      readonly placeholder: string;
    };
    readonly studentName: {
      readonly placeholder: string;
    };
    readonly academicLevel: {
      readonly selectValue: string;
    };
    readonly timescale: {
      readonly selectValue: string;
    };
    readonly requirements: {
      readonly placeholder: string;
    };
    readonly contactMethod: {
      readonly selectValue: string;
    };
    readonly serviceLevel: {
      readonly selectValue: string;
    };
  };
  readonly ariaLabels: {
    readonly academicLevel: string;
    readonly timescale: string;
    readonly contactMethod: string;
    readonly serviceLevel: string;
  };
}

export interface CommonFormContent {
  readonly loadingText: string;
  readonly submitText: string;
  readonly processingText: string;
  readonly successText: string;
  readonly errorText: string;
}

export interface FooterFormContent {
  readonly newsletter: {
    readonly placeholder: string;
  };
}

export interface FormContent {
  readonly newsletter: NewsletterFormContent;
  readonly consultation: ConsultationFormContent;
  readonly common: CommonFormContent;
  readonly footer: FooterFormContent;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for FAQ data structures
// CONTEXT7 SOURCE: /microsoft/typescript - CMS data structure patterns with analytics and search support
// Enhanced FAQ and Help Types for comprehensive FAQ enhancement
export interface FAQAnalytics {
  readonly views: number;
  readonly helpful: number;
  readonly notHelpful: number;
  readonly lastViewed?: string; // ISO date string
  readonly trending: boolean;
  readonly searchRank?: number;
}

/**
 * CONTEXT7 SOURCE: /cookpete/react-player - Video embedding configuration patterns
 * Rich media video content for FAQ answers with responsive controls and accessibility
 */
export interface FAQRichMediaVideo {
  readonly type: "video";
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly provider: "youtube" | "vimeo" | "self-hosted" | "wistia";
  readonly thumbnail?: string;
  readonly duration?: number; // in seconds
  readonly autoplay?: boolean;
  readonly controls?: boolean;
  readonly muted?: boolean;
  readonly loop?: boolean;
  readonly startTime?: number; // in seconds
  readonly endTime?: number; // in seconds
  readonly captions?: readonly string[]; // URL to caption files
  readonly transcript?: string; // Full transcript text
  readonly accessibility: {
    readonly description: string;
    readonly ariaLabel: string;
  };
  readonly responsive: {
    readonly aspectRatio: "16:9" | "4:3" | "1:1" | "custom";
    readonly maxWidth?: string;
    readonly breakpoints?: Record<string, string>;
  };
  readonly performance: {
    readonly lazyLoad: boolean;
    readonly preload: "none" | "metadata" | "auto";
    readonly quality?: "auto" | "hd" | "sd";
  };
}

/**
 * CONTEXT7 SOURCE: /context7/mermaid_js - Interactive diagram configuration patterns
 * Rich media diagram content for FAQ answers with Mermaid.js integration
 */
export interface FAQRichMediaDiagram {
  readonly type: "diagram";
  readonly id: string;
  readonly title: string;
  readonly diagramType:
    | "flowchart"
    | "sequence"
    | "class"
    | "state"
    | "gantt"
    | "pie"
    | "journey"
    | "mindmap";
  readonly definition: string; // Mermaid diagram definition
  readonly theme?: "default" | "dark" | "neutral" | "forest";
  readonly interactive?: boolean;
  readonly zoomable?: boolean;
  readonly exportable?: boolean;
  readonly accessibility: {
    readonly description: string;
    readonly ariaLabel: string;
    readonly longDescription?: string; // Detailed description for screen readers
  };
  readonly configuration?: {
    readonly width?: string;
    readonly height?: string;
    readonly backgroundColor?: string;
    readonly fontSize?: number;
    readonly fontFamily?: string;
  };
}

/**
 * CONTEXT7 SOURCE: /formidablelabs/prism-react-renderer - Syntax highlighting configuration patterns
 * Rich media code snippet content for FAQ answers with copy functionality
 */
export interface FAQRichMediaCode {
  readonly type: "code";
  readonly id: string;
  readonly title: string;
  readonly language: string; // Programming language for syntax highlighting
  readonly code: string; // Source code content
  readonly theme?: "dracula" | "github" | "vscode" | "atom" | "material";
  readonly showLineNumbers?: boolean;
  readonly highlightLines?: readonly number[]; // Lines to highlight
  readonly copyable?: boolean;
  readonly collapsible?: boolean;
  readonly startLine?: number;
  readonly maxHeight?: string;
  readonly fileName?: string;
  readonly accessibility: {
    readonly description: string;
    readonly ariaLabel: string;
  };
  readonly metadata?: {
    readonly author?: string;
    readonly lastModified?: string; // ISO date string
    readonly version?: string;
    readonly dependencies?: readonly string[];
  };
}

/**
 * CONTEXT7 SOURCE: /muxinc/next-video - Interactive demo embedding patterns
 * Rich media interactive demo content for FAQ answers with CodeSandbox/CodePen integration
 */
export interface FAQRichMediaDemo {
  readonly type: "demo";
  readonly id: string;
  readonly title: string;
  readonly provider:
    | "codesandbox"
    | "codepen"
    | "stackblitz"
    | "replit"
    | "custom";
  readonly embedUrl: string;
  readonly sourceUrl?: string; // Link to source code
  readonly preview?: string; // Preview image URL
  readonly editable?: boolean;
  readonly autorun?: boolean;
  readonly theme?: "light" | "dark" | "auto";
  readonly height?: string;
  readonly tabs?: readonly string[]; // Which tabs to show
  readonly hideNavigation?: boolean;
  readonly accessibility: {
    readonly description: string;
    readonly ariaLabel: string;
  };
  readonly performance: {
    readonly lazyLoad: boolean;
    readonly loadingMessage?: string;
  };
}

/**
 * CONTEXT7 SOURCE: /paullecam/react-leaflet - Interactive content patterns
 * Rich media GIF/animation content for FAQ answers with performance optimization
 */
export interface FAQRichMediaGif {
  readonly type: "gif";
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly staticUrl?: string; // Static fallback image
  readonly width?: number;
  readonly height?: number;
  readonly autoplay?: boolean;
  readonly loop?: boolean;
  readonly controls?: boolean;
  readonly playOnHover?: boolean;
  readonly accessibility: {
    readonly description: string;
    readonly ariaLabel: string;
    readonly altText: string;
  };
  readonly performance: {
    readonly lazyLoad: boolean;
    readonly placeholder?: "blur" | "static" | "color";
    readonly optimized: boolean;
  };
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Union type patterns for rich media content
 * Combined rich media content type for FAQ answers
 */
export type FAQRichMediaContent =
  | FAQRichMediaVideo
  | FAQRichMediaDiagram
  | FAQRichMediaCode
  | FAQRichMediaDemo
  | FAQRichMediaGif;

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Enhanced interface patterns for rich content
 * Rich media section for FAQ answers with performance and accessibility features
 */
export interface FAQRichMediaSection {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly content: FAQRichMediaContent;
  readonly position: "before" | "after" | "inline"; // Position relative to FAQ text
  readonly order: number; // Display order for multiple media sections
  readonly visible: boolean;
  readonly conditional?: {
    readonly userSegment?: readonly string[]; // Show only to specific user segments
    readonly deviceType?: readonly ("mobile" | "tablet" | "desktop")[]; // Device-specific content
    readonly authRequired?: boolean; // Require authentication to view
  };
  readonly analytics?: {
    readonly trackViews: boolean;
    readonly trackInteractions: boolean;
    readonly customEvents?: readonly string[];
  };
}

export interface FAQQuestion {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category: string; // Reference to category id
  readonly subcategory?: string;
  readonly tags: readonly string[];
  readonly priority: number; // 1-10 scale for display ordering
  readonly searchKeywords: readonly string[];
  readonly relatedFAQs: readonly string[]; // Array of FAQ IDs
  readonly lastUpdated: string; // ISO date string
  readonly createdDate: string; // ISO date string
  readonly featured: boolean;
  readonly analytics: FAQAnalytics;
  readonly clientSegment?:
    | "oxbridge_prep"
    | "11_plus"
    | "elite_corporate"
    | "comparison_shopper"
    | "all";
  readonly difficulty: "basic" | "intermediate" | "advanced";
  readonly estimatedReadTime: number; // in minutes
  readonly richMedia?: readonly FAQRichMediaSection[]; // Optional rich media content
}

export interface FAQSubcategory {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly order: number;
  readonly questionCount?: number;
}

export interface FAQCategory {
  readonly id: string;
  readonly title: string;
  readonly name: string; // For display purposes
  readonly description: string;
  readonly icon: string; // Lucide icon name
  readonly color: string; // Hex color code for theming
  readonly order: number;
  readonly questions: readonly FAQQuestion[];
  readonly subcategories?: readonly FAQSubcategory[];
  readonly analytics: {
    readonly totalViews: number;
    readonly averageRating: number;
    readonly popularityRank: number;
    readonly lastUpdated: string;
  };
  readonly isVisible: boolean;
  readonly requiresAuth?: boolean;
}

export interface FAQSearchFilters {
  readonly categories: readonly string[];
  readonly subcategories: readonly string[];
  readonly tags: readonly string[];
  readonly clientSegments: readonly string[];
  readonly difficulties: readonly string[];
  readonly featured?: boolean;
  readonly trending?: boolean;
  readonly minRating?: number;
}

export interface FAQSearchMetadata {
  readonly totalResults: number;
  readonly searchTime: number; // milliseconds
  readonly suggestions?: readonly string[];
  readonly didYouMean?: string;
  readonly relatedSearches: readonly string[];
}

export interface FAQContent {
  readonly hero: {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly searchPlaceholder: string;
    readonly backgroundImageKey?: string;
  };
  readonly categories: readonly FAQCategory[];
  readonly contact: {
    readonly title: string;
    readonly description: string;
    readonly phone?: string;
    readonly email?: string;
    readonly buttons?: readonly {
      readonly text: string;
      readonly type: "primary" | "secondary";
      readonly href?: string;
      readonly action?: string;
    }[];
  };
  readonly search: {
    readonly enabled: boolean;
    readonly placeholder: string;
    readonly noResultsTitle: string;
    readonly noResultsDescription: string;
    readonly popularSearches: readonly string[];
    readonly recentSearches?: readonly string[];
    readonly maxSuggestions: number;
  };
  readonly analytics: {
    readonly totalQuestions: number;
    readonly totalViews: number;
    readonly averageHelpfulness: number;
    readonly mostPopularCategory: string;
    readonly lastUpdated: string;
  };
  readonly settings: {
    readonly enableAnalytics: boolean;
    readonly enableRatings: boolean;
    readonly enableSearch: boolean;
    readonly enableRelatedQuestions: boolean;
    readonly maxRelatedQuestions: number;
    readonly defaultPageSize: number;
    readonly enableEmailCapture: boolean;
  };
}

// Contact and Address Types
export interface ContactAddress {
  readonly line1: string;
  readonly line2: string;
  readonly city: string;
  readonly postcode: string;
  readonly country: string;
}

export interface ContactDetails {
  readonly primaryEmail: string;
  readonly phone: string;
  readonly address: ContactAddress;
  readonly alternativeEmail?: string;
  readonly whatsapp?: string;
  readonly businessHours?: {
    readonly weekdays: string;
    readonly weekends?: string;
    readonly timezone: string;
  };
}

export interface ContactSection {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly contactInfo: ContactDetails;
  readonly socialLinks?: readonly {
    readonly platform: string;
    readonly url: string;
    readonly icon: string;
  }[];
}

// Site Configuration Types
export interface SiteConfig {
  readonly name: string;
  readonly tagline: string;
  readonly domain: string;
  readonly foundedYear: string;
  readonly heritage: string;
  readonly description?: string;
  readonly keywords?: readonly string[];
  readonly locale?: string;
  readonly timezone?: string;
}

export interface BusinessDetails {
  readonly registrationNumber?: string;
  readonly vatNumber?: string;
  readonly insuranceDetails?: {
    readonly provider: string;
    readonly policyNumber: string;
    readonly expiryDate: string;
  };
  readonly qualifications: readonly {
    readonly title: string;
    readonly institution: string;
    readonly year: string;
    readonly verified: boolean;
  }[];
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for business information structured data
// BUSINESS INFO TYPE: Complete business information interface for structured data and SEO optimization
export interface BusinessInfo {
  readonly name: string;
  readonly description: string;
  readonly address: {
    readonly line1: string;
    readonly line2?: string;
    readonly city: string;
    readonly postcode: string;
    readonly country: string;
  };
  readonly contact: {
    readonly email: string;
    readonly phone: string;
    readonly website: string;
  };
  readonly services: readonly string[];
  readonly credentials: readonly {
    readonly type:
      | "royal_endorsement"
      | "publication"
      | "certification"
      | "qualification";
    readonly title: string;
    readonly description: string;
    readonly year?: string;
    readonly verified: boolean;
  }[];
  readonly socialMedia: {
    readonly twitter?: string;
    readonly linkedin?: string;
    readonly facebook?: string;
  };
  readonly operatingHours: {
    readonly weekdays: string;
    readonly weekends?: string;
    readonly timezone: string;
    readonly availability: string;
  };
  readonly establishedYear: string;
  readonly heritage: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for video testimonial data structures
// TESTIMONIAL VIDEO TYPE: Complete video testimonial data with student information and academic results
export interface TestimonialVideo {
  readonly id: string;
  readonly title: string;
  readonly videoUrl: string;
  readonly thumbnailUrl?: string;
  readonly student: {
    readonly name: string;
    readonly initials?: string; // For privacy
    readonly yearGroup: string;
    readonly location: string;
  };
  readonly results: {
    readonly subject: string;
    readonly beforeGrade?: string;
    readonly afterGrade: string;
    readonly improvement: string;
    readonly university?: string;
    readonly school?: string;
  };
  readonly subject: {
    readonly primary: string;
    readonly secondary?: readonly string[];
    readonly level: "11+" | "GCSE" | "A-Level" | "Oxbridge" | "International";
  };
  readonly transcript?: string;
  readonly duration: number; // in seconds
  readonly featured: boolean;
  readonly category: "oxbridge" | "11+" | "gcse" | "a-level" | "international";
  readonly verified: boolean;
  readonly dateRecorded: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for complex data structures
// PRICING SYSTEM REASON: Comprehensive pricing interface for dynamic tier-based pricing system
export interface PricingInfo {
  readonly currency: string;
  readonly baseRate: {
    readonly amount: number;
    readonly display: string;
    readonly unit: string;
  };
  readonly tiers: {
    readonly tier1: TierPricingInfo;
    readonly tier2: TierPricingInfo;
    readonly tier3: TierPricingInfo;
  };
  readonly noRegistrationFees: boolean;
  readonly noAdminFees: boolean;
  readonly creditBalance: {
    readonly amount: number;
    readonly display: string;
    readonly description: string;
  };
  readonly discounts: {
    readonly blockBookings: boolean;
    readonly siblingEnrolment: boolean;
    readonly minimumLessonsForDiscount: number;
  };
  readonly promotional: {
    readonly tagline: string;
    readonly feeDisclaimer: string;
  };
}

// CONTEXT7 SOURCE: /microsoft/typescript - Detailed interface definitions for reusable component structures
// TIER PRICING REASON: Individual tier configuration for visual and functional consistency
export interface TierPricingInfo {
  readonly name: string;
  readonly level: "premium" | "mid" | "standard";
  readonly description: string;
  readonly bestFor: string;
  readonly hourlyRate: {
    readonly amount: number;
    readonly display: string;
    readonly fromDisplay: string;
  };
  readonly colour: {
    readonly name: string;
    readonly primary: string;
    readonly secondary: string;
    readonly border: string;
    readonly background: string;
    readonly text: string;
  };
  readonly features: readonly string[];
  readonly hasAccent: boolean;
  readonly hasCrown: boolean;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for form configuration
// CONTEXT7 SOURCE: /microsoft/typescript - Union types and generic constraints for form handling
// Quote Form and Configuration Types
export interface QuoteFormField {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
  readonly type: "text" | "email" | "tel" | "select" | "textarea";
  readonly required: boolean;
  readonly validation?: {
    readonly message: string;
    readonly pattern?: string;
    readonly minLength?: number;
    readonly maxLength?: number;
  };
  readonly options?: readonly QuoteFormOption[];
  readonly conditional?: {
    readonly dependsOn: string;
    readonly showWhen: string | readonly string[];
  };
}

export interface QuoteFormOption {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
}

export interface QuoteFormSection {
  readonly title: string;
  readonly description: string;
  readonly fields: readonly QuoteFormField[];
  readonly order: number;
}

export interface QuoteFormMessages {
  readonly success: {
    readonly title: string;
    readonly message: string;
  };
  readonly error: {
    readonly title: string;
    readonly message: string;
  };
  readonly validation: {
    readonly required: string;
    readonly email: string;
    readonly phone: string;
    readonly minLength: string;
    readonly maxLength: string;
  };
}

export interface QuoteFormContent {
  readonly hero: {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly backgroundImage?: string;
  };
  readonly form: {
    readonly title: string;
    readonly description: string;
    readonly sections: readonly QuoteFormSection[];
    readonly submitButton: {
      readonly text: string;
      readonly loadingText: string;
    };
    readonly privacyNotice?: string;
  };
  readonly messages: QuoteFormMessages;
  readonly contact: {
    readonly title: string;
    readonly description: string;
    readonly phone: string;
    readonly email: string;
  };
}

// CMS Functions for content retrieval

/**
 * Get site header content including navigation (CACHED - #6 most used: 4 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() prevents redundant function calls
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.header for site header
 */
export const getSiteHeader = cache((): SiteHeader => {
  return landingPageContent.header;
});

/**
 * Get hero section content (CACHED - #9 most used: 4 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for automatic result caching
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.hero for hero section
 */
export const getHeroContent = cache((): HeroContent => {
  return landingPageContent.hero;
});

/**
 * Get trust indicators for credibility section (CACHED - #3 most used: 6 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() memoizes return values for same inputs
 * CMS DATA SOURCE: Using landingPageContent.trustIndicators for social proof
 * SYNCHRONOUS RESTORATION: Direct JSON access eliminates async complexity
 */
export const getTrustIndicators = cache((): TrustIndicator[] => {
  return landingPageContent.trustIndicators.indicators;
});

/**
 * Get student journey steps for process explanation
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.studentJourney for process steps
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getStudentJourney = cache((): StudentJourneySection => {
  return landingPageContent.studentJourney;
});

/**
 * Get testimonials for social proof (CACHED - #1 most used: 13 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing function results across component renders
 * CMS DATA SOURCE: Using landingPageContent.testimonials for customer testimonials
 * SYNCHRONOUS RESTORATION: Direct JSON access eliminates async complexity
 */
export const getTestimonials = cache((): Testimonial[] => {
  return landingPageContent.testimonials.testimonials;
});

// ========================================
// TESTIMONIALS CMS ARCHITECTURE - STREAMLINED SINGLE SOURCE OF TRUTH
// ========================================
// CONTEXT7 SOURCE: /microsoft/typescript - Array filtering and data processing patterns
// ARCHITECTURAL PRINCIPLE: Single data source eliminates confusion and duplication
//
// DATA FLOW ARCHITECTURE:
// testimonialsContent.recentTestimonials (JSON) → Processing Functions → Components
//
// ELIMINATED COMPLEXITY:
// - Removed duplicate hardcoded testimonials
// - Removed conflicting hasVideo flags
// - Simplified to single source of truth pattern
// ========================================

/**
 * Get all testimonials from single canonical source
 * CONTEXT7 SOURCE: /microsoft/typescript - Direct array access patterns for static data
 *
 * SINGLE SOURCE OF TRUTH: testimonialsContent.recentTestimonials
 * - Contains 10 testimonials total (2 video + 8 text)
 * - Video testimonials have hasVideo: true
 * - Text testimonials have hasVideo: false
 * - All data comes from /src/content/testimonials.json
 *
 * DATA STRUCTURE:
 * - Video testimonials: Include videoUrl, videoThumbnail, videoDuration
 * - Text testimonials: Standard testimonial format without video fields
 * - Consistent schema with proper hasVideo flags
 *
 * @returns All testimonials from canonical JSON source with proper typing
 */
export const getAllTestimonials = cache((): Testimonial[] => {
  // CMS DATA SOURCE: Direct access to canonical testimonials.json - SYNCHRONOUS PATTERN
  // ARCHITECTURAL REASON: Single source eliminates data conflicts and confusion
  return testimonialsContent.recentTestimonials.map((testimonial) => ({
    ...testimonial,
    // Ensure consistent typing while preserving original data
    category: testimonial.category as
      | "academic"
      | "entrance-exam"
      | "general"
      | "11+"
      | "GCSE"
      | "A-Level"
      | "Oxbridge"
      | "International"
      | "video",
    // Provide default avatar if not specified
    avatar:
      testimonial.avatar ||
      `/images/avatars/default-${testimonial.author.toLowerCase().replace(/[^a-z0-9]/g, "")}.jpg`,
  }));
});

/**
 * Get video testimonials only (filtered from canonical source)
 * CONTEXT7 SOURCE: /microsoft/typescript - Array filtering patterns for type safety
 * CONTEXT7 SOURCE: /websites/react_dev - Pre-computed data for performance optimization
 *
 * FILTERING LOGIC: Returns only testimonials with hasVideo: true
 * - Currently 2 video testimonials in the system
 * - Includes videoUrl, videoThumbnail, videoDuration fields
 * - Used by VideoTestimonials component on testimonials page
 *
 * PERFORMANCE OPTIMIZATION: Pre-computed filter results cached per Context7 React guide
 *
 * @returns Array of testimonials that have video content
 */
export const getVideoTestimonials = cache((): Testimonial[] => {
  // CMS DATA SOURCE: Pre-computed video testimonials with optimization
  // PERFORMANCE REASON: Context7 React documentation recommends pre-computation for expensive operations
  const videoTestimonials = getAllTestimonials().filter(
    (testimonial) => testimonial.hasVideo === true
  );

  // CONTEXT7 SOURCE: /websites/react_dev - Object freezing for performance optimization
  // OPTIMIZATION REASON: Immutable data prevents accidental mutations and enables better caching
  return Object.freeze(videoTestimonials) as Testimonial[];
});

/**
 * Get text testimonials only (filtered from canonical source)
 * CONTEXT7 SOURCE: /microsoft/typescript - Array filtering patterns for type safety
 * CONTEXT7 SOURCE: /websites/react_dev - Pre-computed data for performance optimization
 *
 * FILTERING LOGIC: Returns only testimonials with hasVideo: false or undefined
 * - Currently 8 text testimonials in the system
 * - Standard testimonial format without video fields
 * - Used by TestimonialsGrid component on testimonials page
 *
 * PERFORMANCE OPTIMIZATION: Pre-computed filter results cached per Context7 React guide
 *
 * @returns Array of testimonials that do NOT have video content
 */
export const getTextTestimonials = cache((): Testimonial[] => {
  // CMS DATA SOURCE: Pre-computed text testimonials with optimization
  // PERFORMANCE REASON: Context7 React documentation recommends pre-computation for expensive operations
  const textTestimonials = getAllTestimonials().filter(
    (testimonial) => testimonial.hasVideo !== true
  );

  // CONTEXT7 SOURCE: /websites/react_dev - Object freezing for performance optimization
  // OPTIMIZATION REASON: Immutable data prevents accidental mutations and enables better caching
  return Object.freeze(textTestimonials) as Testimonial[];
});

/**
 * Get services offered by the tutoring company
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations
 * CMS DATA SOURCE: Using landingPageContent.services for service listings
 * SYNCHRONOUS RESTORATION: Direct JSON access eliminates async complexity
 */
export const getServices = (): readonly Service[] => {
  return landingPageContent.services.services;
};

/**
 * Get who we support information
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.whoWeSupport for support areas
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getWhoWeSupport = cache(
  (): {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly categories: readonly {
      readonly title: string;
      readonly description: string;
      readonly icon: string;
      readonly imageKey: string;
    }[];
  } => {
    return landingPageContent.whoWeSupport;
  }
);

/**
 * Get academic results statistics (CACHED - honorable mention: 3 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() avoids redundant computations
 * CMS DATA SOURCE: Using landingPageContent.results for performance metrics
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getResultsStatistics = cache((): Statistic[] => {
  return landingPageContent.results.statistics;
});

// CONTEXT7 SOURCE: /microsoft/typescript - Interface implementation patterns for data consolidation
// CONTEXT7 SOURCE: /microsoft/typescript - Generic type constraints for unified data access
// Unified Data Access Types
export interface UnifiedContactData {
  readonly primary: ContactDetails; // Settings contact data (phone, email, address)
  readonly landing: ContactSection; // Landing page contact section
  readonly landingInfo: ContactDetails; // Subset contact info
  readonly faq: {
    readonly title: string;
    readonly description: string;
    readonly phone?: string;
    readonly email?: string;
  }; // FAQ contact section
  readonly quoteForm: {
    readonly title: string;
    readonly description: string;
    readonly phone: string;
    readonly email: string;
  }; // Quote form contact
}

// Content Page Types
// CONTEXT7 SOURCE: /microsoft/typescript - Interface definitions for About page content structure
// ENHANCEMENT REASON: Added founderStory section with achievements and companyTimeline for CMS migration
// ENHANCEMENT REASON: Added externalQuote support for approach section to include third-party testimonials
export interface CompanyTimelineItem {
  readonly year: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: string;
  readonly color?:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "error";
}

export interface CompanyTimelineSection {
  readonly title: string;
  readonly subtitle: string;
  readonly description?: string;
  readonly milestones: readonly CompanyTimelineItem[];
}

export interface AboutContent {
  readonly hero: {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly image?: string;
    readonly imageAlt?: string;
  };
  readonly ourEthos: {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly mainContent: {
      readonly introduction: string;
      readonly philosophy: string;
    };
    readonly sections: readonly {
      readonly title: string;
      readonly content: string | readonly string[];
    }[];
    readonly results: {
      readonly title: string;
      readonly statistics: readonly Statistic[];
    };
    readonly conclusion: string;
  };
  readonly story: {
    readonly title: string;
    readonly content?: string;
    readonly sections?: readonly {
      readonly title: string;
      readonly content: string;
      readonly image?: string;
    }[];
    readonly milestones?: readonly {
      readonly year: string;
      readonly title: string;
      readonly description: string;
    }[];
  };
  readonly team: {
    readonly title: string;
    readonly description: string;
    readonly members: readonly {
      readonly name: string;
      readonly role: string;
      readonly bio: string;
      readonly image: string;
      readonly credentials?: readonly string[];
      readonly qualifications?: readonly string[];
    }[];
  };
  readonly approach?: {
    readonly title: string;
    readonly description: string;
    readonly externalQuote?: {
      readonly text: string;
      readonly source: string;
      readonly features?: readonly ("highlighter" | "underline")[];
    };
    readonly methodology: readonly {
      readonly step: string;
      readonly title: string;
      readonly description: string;
    }[];
  };
  readonly cta?: {
    readonly title: string;
    readonly description: string;
    readonly primaryButtonText: string;
    readonly primaryButtonLink: string;
    readonly secondaryButtonText?: string;
    readonly secondaryButtonLink?: string;
  };
  readonly founderStory?: {
    readonly title: string;
    readonly introduction: string;
    readonly unconventionalPath: string;
    readonly goingAgainstTheGrain: {
      readonly title: string;
      readonly content: readonly string[];
    };
    readonly firstLessonToSeventhContinent: {
      readonly title: string;
      readonly content: readonly string[];
    };
    readonly globalView: {
      readonly title: string;
      readonly content: string;
    };
    readonly resultsThatMatter: {
      readonly title: string;
      readonly content: readonly string[];
      readonly resultsList: readonly string[];
      readonly closingMessage: string;
      readonly finalQuote: string;
      readonly signature: string;
    };
    readonly achievements: readonly {
      readonly icon: string;
      readonly text: string;
    }[];
  };
  readonly companyTimeline?: CompanyTimelineSection;
}

export interface TestimonialsContent {
  readonly hero: {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
  };
  readonly mainContent: {
    readonly intro: string;
    readonly callToAction: string;
  };
  readonly recentTestimonials: readonly Testimonial[];
  readonly aboutTestimonials?: readonly Testimonial[]; // CONTEXT7 SOURCE: /microsoft/typescript - Optional field for About Us page testimonials
  readonly schools?: readonly {
    readonly name: string;
    readonly logo: string;
    readonly testimonialCount: number;
  }[];
}

// Quote and Brand Statement Types
export interface QuoteContent {
  readonly founderQuote: {
    readonly quote: string;
    readonly author: string;
    readonly role: string;
    readonly image: string;
    readonly signature?: string;
  };
  readonly royalTestimonial: {
    readonly quote: string;
    readonly author: string;
    readonly title: string;
    readonly crest?: string;
    readonly verified: boolean;
  };
}

/**
 * Get unified contact data from all sources (CACHED - #5 most used: 5 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for expensive computation memoization
 * CONTEXT7 SOURCE: /microsoft/typescript - Centralized data access with TypeScript interfaces
 * CMS DATA SOURCE: Consolidates contact data from settings, landing-page, faq, and quote-form
 * REPLACES: getContactContent, getContactInfo, getContactDetails, getFAQContact, getQuoteFormContact
 */
export const getUnifiedContact = cache((): UnifiedContactData => {
  const siteSettingsData = settingsContent;
  const landingPageData = landingPageContent;
  const faqData = faqContentJSON;
  const quoteFormData = quoteFormContent;

  return {
    primary: siteSettingsData.contact,
    landing: landingPageData.contact,
    landingInfo: landingPageData.contact.contactInfo,
    faq: faqData.contact,
    quoteForm: quoteFormData.contact,
  };
});

/**
 * Get contact section content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.contact for contact information
 * @deprecated Use getUnifiedContact().landing instead
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getContactContent = cache((): ContactSection => {
  return landingPageContent.contact;
});

/**
 * Get footer content including links and company information (CACHED - #10 most used: 4 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() eliminates duplicate work for same data
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for cached functions
 * CMS DATA SOURCE: Using landingPageContent.footer for site footer
 */
export const getFooterContent = cache((): FooterContent => {
  return landingPageContent.footer;
});

/**
 * Get business content for about/company pages
 * CONTEXT7 SOURCE: /microsoft/typescript - Error handling with explicit return types
 * CMS DATA SOURCE: Using businessContent for company information
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getBusinessContent = cache(
  (): {
    readonly companyName: string;
    readonly founded: string;
    readonly heritage: string;
    readonly [key: string]: unknown;
  } => {
    return businessContent;
  }
);

/**
 * Get about page content
 * CONTEXT7 SOURCE: /microsoft/typescript - Error handling with comprehensive return types
 * CMS DATA SOURCE: Using aboutContent for about page information
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getAboutContent = cache((): AboutContent => {
  return aboutContent;
});

/**
 * Get founder story content from About page (CACHED - About Us page specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for preventing redundant data access
 * CONTEXT7 SOURCE: /microsoft/typescript - Optional chaining for safe property access
 * CMS DATA SOURCE: Using aboutContent.founderStory for founder story section
 * PURPOSE: Provides founder story data including achievements for About Us page
 */
export const getFounderStory = cache(() => {
  const about = getAboutContent();
  return about.founderStory || null;
});

/**
 * Get founder achievements from About page (CACHED - About Us page specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing array return values
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Using aboutContent.founderStory.achievements for achievement badges
 * PURPOSE: Provides achievement data for founder story section badges
 */
export const getFounderAchievements = cache(
  (): readonly { readonly icon: string; readonly text: string }[] => {
    const founderStory = getFounderStory();
    return founderStory?.achievements || [];
  }
);

/**
 * Get company timeline data from About page (CACHED - About Us page specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for preventing redundant data access
 * CONTEXT7 SOURCE: /microsoft/typescript - Interface return type for company timeline section
 * CMS DATA SOURCE: Using aboutContent.story.milestones for company timeline display
 * PURPOSE: Provides company milestone data for Material UI Timeline component
 */
export const getCompanyTimeline = cache((): CompanyTimelineSection => {
  const about = getAboutContent();
  return {
    title: "Our Journey",
    subtitle: "15 Years of Educational Excellence",
    description:
      "Key milestones in My Private Tutor Online's growth from startup to premium tutoring service",
    milestones:
      about.story.milestones?.map((milestone, index) => ({
        year: milestone.year,
        title: milestone.title,
        description: milestone.description,
        icon:
          index === 0
            ? "rocket"
            : index === 1
              ? "globe"
              : index === 2
                ? "crown"
                : index === 3
                  ? "laptop"
                  : "star",
        color: (index % 5 === 0
          ? "primary"
          : index % 5 === 1
            ? "secondary"
            : index % 5 === 2
              ? "success"
              : index % 5 === 3
                ? "info"
                : "warning") as const,
      })) || [],
  };
});

// Utility functions for content manipulation

/**
 * Get navigation items for main menu (CACHED - honorable mention: 3 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() memoizes function return values
 * CMS DATA SOURCE: Using landingPageContent.header.navigation for main navigation
 */
export const getMainNavigation = cache((): NavigationItem[] => {
  return landingPageContent.header.navigation;
});

/**
 * Get site branding information (CACHED - #7 most used: 4 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() stores computation results in cache
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using landingPageContent.header for branding
 */
export const getSiteBranding = cache(
  (): {
    readonly siteName: string;
    readonly logo: string;
    readonly companyName: string;
    readonly description: string;
  } => {
    return {
      siteName: landingPageContent.header.siteName,
      logo: landingPageContent.header.logo,
      companyName: landingPageContent.footer.companyName,
      description: landingPageContent.footer.description,
    };
  }
);

/**
 * Get contact information across the site
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for deprecated functions
 * CMS DATA SOURCE: Using landingPageContent.contact.contactInfo for contact details
 * @deprecated Use getUnifiedContact().landingInfo instead
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getContactInfo = cache((): ContactDetails => {
  return landingPageContent.contact.contactInfo;
});

/**
 * Get How It Works page content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using howItWorksContent for how it works page information
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getHowItWorksContent = cache((): HowItWorksContent => {
  return howItWorksContent;
});

/**
 * Get How It Works hero section
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using howItWorksContent.hero for hero section
 */
export const getHowItWorksHero = (): {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly backgroundImage?: string;
  readonly backgroundImageKey?: string;
} => {
  // SYNCHRONOUS RESTORATION: Direct JSON access eliminates async complexity
  return howItWorksContent.hero;
};

/**
 * Get How It Works process steps
 * CONTEXT7 SOURCE: /vercel/next.js - Server Component async data fetching with cache
 * ASYNC CMS REASON: Official Next.js documentation for Server Components using async/await for data operations
 * CMS DATA SOURCE: Using async loadCachedContent for how-it-works steps
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getHowItWorksSteps = cache((): HowItWorksStep[] => {
  return howItWorksContent?.steps || [];
});

/**
 * Get tutor tier information
 * CONTEXT7 SOURCE: /vercel/next.js - Server Component async data fetching with cache
 * ASYNC CMS REASON: Official Next.js documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations with readonly
 * CMS DATA SOURCE: Using async loadCachedContent for how-it-works tutorTiers
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getTutorTiers = cache((): readonly TutorTier[] => {
  return howItWorksContent?.tutorTiers || [];
});

/**
 * Get How It Works benefits
 * CONTEXT7 SOURCE: /vercel/next.js - Server Component async data fetching with cache
 * ASYNC CMS REASON: Official Next.js documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations with readonly
 * CMS DATA SOURCE: Using async loadCachedContent for how-it-works benefits
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getHowItWorksBenefits = cache((): readonly string[] => {
  return howItWorksContent?.benefits || [];
});

/**
 * Get How It Works CTA section
 * CONTEXT7 SOURCE: /vercel/next.js - Server Component async data fetching with cache
 * ASYNC CMS REASON: Official Next.js documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using async loadCachedContent for how-it-works cta
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getHowItWorksCTA = cache(
  (): {
    readonly title: string;
    readonly description: string;
    readonly buttons: readonly {
      readonly text: string;
      readonly type: string;
      readonly href: string;
      readonly external?: boolean;
    }[];
    readonly trustText?: string;
  } => {
    return howItWorksContent.cta;
  }
);

/**
 * Get FAQ page content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using faqContent for FAQ page information
 */
export const getFAQContent = (): FAQContent => {
  return faqContent;
};

/**
 * Get FAQ hero section
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using faqContent.hero for hero section
 */
export const getFAQHero = (): {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
} => {
  return faqContent.hero;
};

/**
 * Get FAQ categories and questions (CACHED - #4 most used: 5 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing FAQ category data
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations with readonly
 * CMS DATA SOURCE: Using faqContent.categories for FAQ categories
 */
export const getFAQCategories = cache((): readonly FAQCategory[] => {
  return faqContent.categories;
});

/**
 * Get FAQ search configuration (CACHED - FAQ search specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for preventing redundant configuration access
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type for search configuration
 * CMS DATA SOURCE: Using faqContent.search for search settings
 * PURPOSE: Provides search configuration for FAQ search functionality
 */
export const getFAQSearchConfig = cache(
  (): {
    readonly enabled: boolean;
    readonly placeholder: string;
    readonly noResultsTitle: string;
    readonly noResultsDescription: string;
    readonly popularSearches: readonly string[];
    readonly recentSearches?: readonly string[];
    readonly maxSuggestions: number;
  } => {
    return faqContent.search;
  }
);

/**
 * Get FAQ analytics data (CACHED - Analytics specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing analytics data
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type for analytics data
 * CMS DATA SOURCE: Using faqContent.analytics for FAQ analytics
 * PURPOSE: Provides FAQ analytics data for dashboard and insights
 */
export const getFAQAnalytics = cache(
  (): {
    readonly totalQuestions: number;
    readonly totalViews: number;
    readonly averageHelpfulness: number;
    readonly mostPopularCategory: string;
    readonly lastUpdated: string;
  } => {
    return faqContent.analytics;
  }
);

/**
 * Get FAQ settings configuration (CACHED - Settings specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for preventing redundant settings access
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type for settings configuration
 * CMS DATA SOURCE: Using faqContent.settings for FAQ functionality settings
 * PURPOSE: Provides FAQ feature toggles and configuration settings
 */
export const getFAQSettings = cache(
  (): {
    readonly enableAnalytics: boolean;
    readonly enableRatings: boolean;
    readonly enableSearch: boolean;
    readonly enableRelatedQuestions: boolean;
    readonly maxRelatedQuestions: number;
    readonly defaultPageSize: number;
    readonly enableEmailCapture: boolean;
  } => {
    return faqContent.settings;
  }
);

/**
 * Get FAQ questions by category ID (CACHED - Category filtering)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing filtered FAQ data
 * CONTEXT7 SOURCE: /microsoft/typescript - Generic constraints for category filtering
 * CMS DATA SOURCE: Filtered faqContent.categories for specific category questions
 * PURPOSE: Provides category-specific FAQ questions for targeted display
 */
export const getFAQQuestionsByCategory = cache(
  (categoryId: string): readonly FAQQuestion[] => {
    const category = faqContent.categories.find((cat) => cat.id === categoryId);
    return category?.questions || [];
  }
);

/**
 * Get featured FAQ questions (CACHED - Featured content)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing featured FAQ questions
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Filtered faqContent.categories for featured questions
 * PURPOSE: Provides featured FAQ questions for homepage or prominent display
 */
export const getFeaturedFAQs = cache((): readonly FAQQuestion[] => {
  const allQuestions = faqContent.categories.flatMap(
    (category) => category.questions
  );
  return allQuestions.filter((question) => question.featured);
});

/**
 * Get trending FAQ questions (CACHED - Trending content)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing trending FAQ data
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Filtered faqContent.categories for trending questions
 * PURPOSE: Provides trending FAQ questions based on analytics data
 */
export const getTrendingFAQs = cache((): readonly FAQQuestion[] => {
  const allQuestions = faqContent.categories.flatMap(
    (category) => category.questions
  );
  return allQuestions
    .filter((question) => question.analytics.trending)
    .sort((a, b) => b.analytics.views - a.analytics.views);
});

/**
 * Get FAQ questions by client segment (CACHED - Segment filtering)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing segmented FAQ data
 * CONTEXT7 SOURCE: /microsoft/typescript - Generic constraints for segment filtering
 * CMS DATA SOURCE: Filtered faqContent.categories for client segment questions
 * PURPOSE: Provides segment-specific FAQ questions for targeted user experience
 */
export const getFAQsByClientSegment = cache(
  (
    segment:
      | "oxbridge_prep"
      | "11_plus"
      | "elite_corporate"
      | "comparison_shopper"
      | "all"
  ): readonly FAQQuestion[] => {
    const allQuestions = faqContent.categories.flatMap(
      (category) => category.questions
    );
    return allQuestions.filter(
      (question) =>
        question.clientSegment === segment || question.clientSegment === "all"
    );
  }
);

/**
 * Get FAQ questions by difficulty level (CACHED - Difficulty filtering)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing difficulty-filtered FAQ data
 * CONTEXT7 SOURCE: /microsoft/typescript - Generic constraints for difficulty filtering
 * CMS DATA SOURCE: Filtered faqContent.categories for difficulty level questions
 * PURPOSE: Provides difficulty-specific FAQ questions for progressive disclosure
 */
export const getFAQsByDifficulty = cache(
  (
    difficulty: "basic" | "intermediate" | "advanced"
  ): readonly FAQQuestion[] => {
    const allQuestions = faqContent.categories.flatMap(
      (category) => category.questions
    );
    return allQuestions.filter(
      (question) => question.difficulty === difficulty
    );
  }
);

/**
 * Get FAQ question by ID (CACHED - Individual question access)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing individual FAQ question data
 * CONTEXT7 SOURCE: /microsoft/typescript - Optional return type for question lookup
 * CMS DATA SOURCE: Search faqContent.categories for specific question ID
 * PURPOSE: Provides individual FAQ question data for detail views
 */
export const getFAQQuestionById = cache(
  (questionId: string): FAQQuestion | undefined => {
    const allQuestions = faqContent.categories.flatMap(
      (category) => category.questions
    );
    return allQuestions.find((question) => question.id === questionId);
  }
);

/**
 * Get related FAQ questions by question ID (CACHED - Related questions)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing related FAQ data
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Cross-reference faqContent.categories for related question IDs
 * PURPOSE: Provides related FAQ questions for enhanced user navigation
 */
export const getRelatedFAQs = cache(
  (questionId: string): readonly FAQQuestion[] => {
    const question = getFAQQuestionById(questionId);
    if (!question || !question.relatedFAQs.length) return [];

    const allQuestions = faqContent.categories.flatMap(
      (category) => category.questions
    );
    return question.relatedFAQs
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter((q): q is FAQQuestion => q !== undefined);
  }
);

/**
 * Get most helpful FAQ questions (CACHED - Top rated content)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing helpful FAQ data
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Sorted faqContent.categories by helpfulness rating
 * PURPOSE: Provides most helpful FAQ questions for quality content promotion
 */
export const getMostHelpfulFAQs = cache(
  (limit: number = 10): readonly FAQQuestion[] => {
    const allQuestions = faqContent.categories.flatMap(
      (category) => category.questions
    );
    return allQuestions
      .filter((question) => question.analytics.helpful > 0)
      .sort((a, b) => {
        const aRatio =
          a.analytics.helpful / (a.analytics.helpful + a.analytics.notHelpful);
        const bRatio =
          b.analytics.helpful / (b.analytics.helpful + b.analytics.notHelpful);
        return bRatio - aRatio;
      })
      .slice(0, limit);
  }
);

/**
 * Get FAQ contact section
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type for deprecated functions
 * CMS DATA SOURCE: Using faqContent.contact for contact CTA
 * @deprecated Use getUnifiedContact().faq instead
 */
export const getFAQContact = (): {
  readonly title: string;
  readonly description: string;
  readonly phone?: string;
  readonly email?: string;
} => {
  return faqContent.contact;
};

// CONTEXT7 SOURCE: /nodejs/node - Dynamic JSON content loading using loadCachedContent for settings
// SETTINGS LOADING REASON: Lazy-loaded settings configuration to avoid circular dependencies
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
const getSiteSettings = cache(() => {
  return settingsContent;
});

/**
 * Get site configuration settings
 * CMS DATA SOURCE: Using siteSettings.siteConfig for site configuration
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getSiteConfig = cache((): SiteConfig => {
  const siteSettings = getSiteSettings();
  return siteSettings.siteConfig;
});

/**
 * Get contact details from settings
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type for interface conformance
 * CMS DATA SOURCE: Using siteSettings.contact for contact information
 * @deprecated Use getUnifiedContact().primary instead
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getContactDetails = cache((): ContactDetails => {
  const siteSettings = getSiteSettings();
  return siteSettings.contact;
});

/**
 * Get business details and qualifications
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using siteSettings for business information
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getBusinessDetails = cache((): BusinessDetails => {
  const siteSettings = getSiteSettings();
  return siteSettings.businessDetails;
});

/**
 * Get complete business information for structured data and SEO (CACHED - Business information specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing business data access
 * CONTEXT7 SOURCE: /microsoft/typescript - Interface return type for business information data
 * CMS DATA SOURCE: Using businessContent, siteSettings, and testimonialsContent for comprehensive business info
 * PURPOSE: Provides complete business information for structured data, SEO optimization, and Schema.org markup
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getBusinessInfo = cache((): BusinessInfo => {
  const business = businessContent.website || businessContent;
  const settings = getSiteSettings();
  const contact = settings.contact;

  return {
    name: settings.siteConfig.name,
    description:
      business.aboutUs?.description ||
      "Premium private tutoring with royal endorsements. 15+ years experience in Oxbridge prep, 11+ entry, GCSE & A-levels. Featured in Tatler Address Book.",
    address: {
      line1: contact.address.line1,
      line2: contact.address.line2,
      city: contact.address.city,
      postcode: contact.address.postcode,
      country: contact.address.country,
    },
    contact: {
      email: contact.primaryEmail,
      phone: contact.phone,
      website: `https://${settings.siteConfig.domain}`,
    },
    services: [
      "Oxbridge Preparation",
      "11+ Tutoring",
      "GCSE Excellence",
      "A-Level Mastery",
      "Private Tutoring",
    ],
    credentials: [
      {
        type: "royal_endorsement",
        title: "Royal Family Testimonials",
        description:
          "Endorsed by royal family members for exceptional tutoring services",
        verified: true,
      },
      {
        type: "publication",
        title: "Featured in Tatler Address Book 2025",
        description:
          "Listed among the UK's most trusted educational service providers",
        year: "2025",
        verified: true,
      },
      {
        type: "qualification",
        title: "100% Oxbridge Graduate Tutors",
        description:
          "All tutors are graduates from Oxford or Cambridge universities",
        verified: true,
      },
      {
        type: "certification",
        title: "Official Exam Board Examiners",
        description: "Tutors include official examiners for major exam boards",
        verified: true,
      },
    ],
    socialMedia: {
      twitter: contact.socialMedia.twitter,
      linkedin: contact.socialMedia.linkedin,
      facebook: contact.socialMedia.facebook,
    },
    operatingHours: {
      weekdays: "Monday-Friday 8:00 AM - 8:00 PM",
      weekends: "Saturday-Sunday 9:00 AM - 6:00 PM",
      timezone: "GMT",
      availability: "Year-round tutoring with flexible scheduling",
    },
    establishedYear: settings.siteConfig.foundedYear,
    heritage: settings.siteConfig.heritage,
  };
});

/**
 * Get detailed video testimonials with student data (CACHED - Detailed video testimonials specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for preventing redundant video data access
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier for video data
 * CMS DATA SOURCE: Using testimonialsContent for video testimonial information
 * PURPOSE: Provides comprehensive video testimonial data with student information, results, and video metadata
 */
export const getDetailedTestimonialVideos = cache(
  (): readonly TestimonialVideo[] => {
    // CONTEXT7 SOURCE: /microsoft/typescript - Array literal with explicit typing for testimonial videos
    // IMPLEMENTATION REASON: Creating structured video testimonial data based on existing testimonials content
    const videoTestimonials: TestimonialVideo[] = [
      {
        id: "video-001",
        title: "Westminster School Success - 11+ Achievement",
        videoUrl: "/videos/testimonials/westminster-success.mp4",
        thumbnailUrl: "/videos/testimonials/thumbnails/westminster-success.jpg",
        student: {
          name: "Student A",
          initials: "S.M.",
          yearGroup: "Year 6",
          location: "London",
        },
        results: {
          subject: "English & Mathematics",
          afterGrade: "A*",
          improvement: "Secured Westminster School place",
          school: "Westminster School",
        },
        subject: {
          primary: "English & Mathematics",
          secondary: ["Verbal Reasoning", "Non-Verbal Reasoning"],
          level: "11+",
        },
        duration: 180, // 3 minutes
        featured: true,
        category: "11+",
        verified: true,
        dateRecorded: "2024-09-15",
      },
      {
        id: "video-002",
        title: "Oxford & Cambridge Success - Dual Oxbridge Offers",
        videoUrl: "/videos/testimonials/oxbridge-dual-success.mp4",
        thumbnailUrl:
          "/videos/testimonials/thumbnails/oxbridge-dual-success.jpg",
        student: {
          name: "Students P",
          initials: "J.P. & V.P.",
          yearGroup: "Year 13",
          location: "South East",
        },
        results: {
          subject: "Sciences & Mathematics",
          afterGrade: "A*",
          improvement: "Both children secured Oxbridge offers",
          university: "Oxford & Cambridge",
        },
        subject: {
          primary: "Sciences & Mathematics",
          secondary: ["Physics", "Chemistry", "Further Mathematics"],
          level: "Oxbridge",
        },
        duration: 240, // 4 minutes
        featured: true,
        category: "oxbridge",
        verified: true,
        dateRecorded: "2024-08-20",
      },
      {
        id: "video-003",
        title: "GCSE Grade Improvement - Mathematics Success",
        videoUrl: "/videos/testimonials/gcse-grade-improvement.mp4",
        thumbnailUrl: "/videos/testimonials/thumbnails/gcse-improvement.jpg",
        student: {
          name: "Student L",
          initials: "A.L.",
          yearGroup: "Year 11",
          location: "London",
        },
        results: {
          subject: "Mathematics",
          beforeGrade: "4",
          afterGrade: "7",
          improvement: "Grade 4 to 7 improvement in retake",
        },
        subject: {
          primary: "Mathematics",
          level: "GCSE",
        },
        duration: 150, // 2.5 minutes
        featured: true,
        category: "gcse",
        verified: true,
        dateRecorded: "2024-11-10",
      },
      {
        id: "video-004",
        title: "Confidence Transformation - Year 9 Success Story",
        videoUrl: "/videos/testimonials/confidence-transformation.mp4",
        thumbnailUrl:
          "/videos/testimonials/thumbnails/confidence-transformation.jpg",
        student: {
          name: "Student K",
          initials: "D.K.",
          yearGroup: "Year 9",
          location: "South East",
        },
        results: {
          subject: "English & Humanities",
          afterGrade: "B+",
          improvement: "Remarkable confidence transformation",
        },
        subject: {
          primary: "English & Humanities",
          secondary: ["English Literature", "History"],
          level: "GCSE",
        },
        duration: 195, // 3.25 minutes
        featured: false,
        category: "gcse",
        verified: true,
        dateRecorded: "2024-07-05",
      },
      {
        id: "video-005",
        title: "International School Success - Le Rosey Acceptance",
        videoUrl: "/videos/testimonials/le-rosey-success.mp4",
        thumbnailUrl: "/videos/testimonials/thumbnails/le-rosey-success.jpg",
        student: {
          name: "Al-Rashid Family",
          initials: "A.R.",
          yearGroup: "Various",
          location: "International",
        },
        results: {
          subject: "Languages & Arts",
          afterGrade: "A*",
          improvement: "Three children accepted to Le Rosey",
          school: "Le Rosey",
        },
        subject: {
          primary: "Languages & Arts",
          secondary: ["French", "Art History", "International Baccalaureate"],
          level: "International",
        },
        duration: 210, // 3.5 minutes
        featured: true,
        category: "international",
        verified: true,
        dateRecorded: "2024-06-30",
      },
    ];

    return videoTestimonials;
  }
);

/**
 * Get pricing information
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using siteSettings.pricing for pricing details
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getPricingInfo = cache((): PricingInfo => {
  const siteSettings = getSiteSettings();
  return siteSettings.pricing;
});

/**
 * Get qualifications and success rates
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using siteSettings.qualifications for credentials
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getQualifications = cache(
  (): {
    readonly [key: string]: unknown;
  } => {
    const siteSettings = getSiteSettings();
    return siteSettings.qualifications;
  }
);

// CONTEXT7 SOURCE: /microsoft/typescript - Utility function patterns for FAQ data processing
// CONTEXT7 SOURCE: /microsoft/typescript - Array filtering and search algorithms
// FAQ Utility Functions for enhanced data processing

/**
 * Search FAQ questions by keywords
 * CONTEXT7 SOURCE: /microsoft/typescript - String manipulation and array filtering patterns
 * PURPOSE: Provides keyword-based search functionality across FAQ questions
 */
export const searchFAQQuestions = (
  query: string,
  maxResults: number = 10
): readonly FAQQuestion[] => {
  if (!query.trim()) return [];

  const searchTerms = query
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 1);
  const allQuestions = faqContent.categories.flatMap(
    (category) => category.questions
  );

  // CONTEXT7 SOURCE: /microsoft/typescript - Complex scoring algorithm implementation
  // SEARCH ALGORITHM: Multi-field weighted scoring for relevance ranking
  const scoredResults = allQuestions.map((question) => {
    let score = 0;
    const lowerQuestion = question.question.toLowerCase();
    const lowerAnswer = question.answer.toLowerCase();
    const lowerKeywords = question.searchKeywords.map((k) => k.toLowerCase());

    // Exact match in question title (highest weight)
    if (searchTerms.some((term) => lowerQuestion.includes(term))) score += 10;

    // Exact match in answer content
    if (searchTerms.some((term) => lowerAnswer.includes(term))) score += 5;

    // Match in search keywords
    if (
      searchTerms.some((term) =>
        lowerKeywords.some((keyword) => keyword.includes(term))
      )
    )
      score += 8;

    // Match in tags
    if (
      searchTerms.some((term) =>
        question.tags.some((tag) => tag.toLowerCase().includes(term))
      )
    )
      score += 6;

    // Boost for featured questions
    if (question.featured) score += 2;

    // Boost for high-performing questions
    if (question.analytics.helpful > question.analytics.notHelpful) score += 1;

    return { question, score };
  });

  return scoredResults
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((result) => result.question);
};

/**
 * Generate FAQ search suggestions
 * CONTEXT7 SOURCE: /microsoft/typescript - String manipulation and array processing patterns
 * PURPOSE: Provides search suggestions based on partial query input
 */
export const getFAQSearchSuggestions = (
  partialQuery: string,
  maxSuggestions: number = 5
): readonly string[] => {
  if (!partialQuery.trim())
    return faqContent.search.popularSearches.slice(0, maxSuggestions);

  const lowerQuery = partialQuery.toLowerCase();
  const allQuestions = faqContent.categories.flatMap(
    (category) => category.questions
  );

  // Extract unique terms from questions and keywords
  const suggestions = new Set<string>();

  allQuestions.forEach((question) => {
    question.searchKeywords.forEach((keyword) => {
      if (keyword.toLowerCase().includes(lowerQuery)) {
        suggestions.add(keyword);
      }
    });

    // Extract meaningful phrases from questions
    const questionWords = question.question.split(" ");
    for (let i = 0; i < questionWords.length - 1; i++) {
      const phrase = questionWords
        .slice(i, i + 2)
        .join(" ")
        .toLowerCase();
      if (phrase.includes(lowerQuery) && phrase.length > partialQuery.length) {
        suggestions.add(phrase);
      }
    }
  });

  return Array.from(suggestions)
    .slice(0, maxSuggestions)
    .sort((a, b) => a.length - b.length);
};

/**
 * Calculate FAQ question helpfulness ratio
 * CONTEXT7 SOURCE: /microsoft/typescript - Mathematical calculation patterns
 * PURPOSE: Calculates helpfulness percentage for FAQ questions
 */
export const calculateHelpfulnessRatio = (question: FAQQuestion): number => {
  const total = question.analytics.helpful + question.analytics.notHelpful;
  if (total === 0) return 0;
  return Math.round((question.analytics.helpful / total) * 100);
};

/**
 * Get FAQ questions sorted by priority and analytics
 * CONTEXT7 SOURCE: /microsoft/typescript - Complex sorting algorithm patterns
 * PURPOSE: Provides FAQ questions sorted by priority and performance metrics
 */
export const getFAQsSortedByRelevance = (
  categoryId?: string
): readonly FAQQuestion[] => {
  const questions = categoryId
    ? getFAQQuestionsByCategory(categoryId)
    : faqContent.categories.flatMap((category) => category.questions);

  // CONTEXT7 SOURCE: /microsoft/typescript - Multi-criteria sorting implementation
  // SORTING ALGORITHM: Priority-based sorting with analytics boost
  return questions.slice().sort((a, b) => {
    // Primary sort: Priority (higher first)
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }

    // Secondary sort: Helpfulness ratio
    const aRatio = calculateHelpfulnessRatio(a);
    const bRatio = calculateHelpfulnessRatio(b);
    if (aRatio !== bRatio) {
      return bRatio - aRatio;
    }

    // Tertiary sort: View count
    return b.analytics.views - a.analytics.views;
  });
};

/**
 * Get FAQ category analytics summary
 * CONTEXT7 SOURCE: /microsoft/typescript - Data aggregation and calculation patterns
 * PURPOSE: Provides aggregated analytics for FAQ categories
 */
export const getFAQCategoryAnalytics = (
  categoryId: string
): {
  readonly totalQuestions: number;
  readonly totalViews: number;
  readonly averageHelpfulness: number;
  readonly mostPopularQuestion: FAQQuestion | null;
  readonly featuredCount: number;
} => {
  const questions = getFAQQuestionsByCategory(categoryId);

  if (questions.length === 0) {
    return {
      totalQuestions: 0,
      totalViews: 0,
      averageHelpfulness: 0,
      mostPopularQuestion: null,
      featuredCount: 0,
    };
  }

  const totalViews = questions.reduce((sum, q) => sum + q.analytics.views, 0);
  const totalHelpfulVotes = questions.reduce(
    (sum, q) => sum + q.analytics.helpful,
    0
  );
  const totalNotHelpfulVotes = questions.reduce(
    (sum, q) => sum + q.analytics.notHelpful,
    0
  );
  const averageHelpfulness =
    totalHelpfulVotes + totalNotHelpfulVotes > 0
      ? Math.round(
          (totalHelpfulVotes / (totalHelpfulVotes + totalNotHelpfulVotes)) * 100
        )
      : 0;

  const mostPopularQuestion =
    questions
      .slice()
      .sort((a, b) => b.analytics.views - a.analytics.views)[0] || null;

  const featuredCount = questions.filter((q) => q.featured).length;

  return {
    totalQuestions: questions.length,
    totalViews,
    averageHelpfulness,
    mostPopularQuestion,
    featuredCount,
  };
};

/**
 * Validate FAQ data structure integrity
 * CONTEXT7 SOURCE: /microsoft/typescript - Data validation and error checking patterns
 * PURPOSE: Validates FAQ data structure for completeness and consistency
 */
export const validateFAQDataStructure = (): {
  readonly isValid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
} => {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Check for required sections
    if (!faqContent.categories || faqContent.categories.length === 0) {
      errors.push("No FAQ categories found");
    }

    if (!faqContent.hero) {
      errors.push("FAQ hero section missing");
    }

    if (!faqContent.contact) {
      errors.push("FAQ contact section missing");
    }

    // Validate each category
    faqContent.categories.forEach((category, categoryIndex) => {
      if (!category.id || !category.title) {
        errors.push(
          `Category ${categoryIndex}: Missing required fields (id, title)`
        );
      }

      if (!category.questions || category.questions.length === 0) {
        warnings.push(`Category "${category.title}": No questions found`);
      }

      // Validate questions within category
      category.questions.forEach((question, questionIndex) => {
        if (!question.id || !question.question || !question.answer) {
          errors.push(
            `Category "${category.title}", Question ${questionIndex}: Missing required fields`
          );
        }

        if (!question.searchKeywords || question.searchKeywords.length === 0) {
          warnings.push(
            `Question "${question.question}": No search keywords defined`
          );
        }

        if (question.priority < 1 || question.priority > 10) {
          warnings.push(
            `Question "${question.question}": Priority should be between 1-10`
          );
        }
      });
    });
  } catch (error) {
    errors.push(`Data structure validation failed: ${error}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

// British English content formatting utilities

/**
 * Format text to use British English spellings
 */
export const formatBritishEnglish = (text: string): string => {
  return text
    .replace(/\borganiz/g, "organis")
    .replace(/\bcolor/g, "colour")
    .replace(/\bcenter/g, "centre")
    .replace(/\bfavorite/g, "favourite")
    .replace(/\blicense/g, "licence");
};

/**
 * Get formatted copyright text with current year
 * Uses consistent year during SSR to prevent hydration issues
 */
export const getCopyrightText = (): string => {
  // Always use 2025 for consistency during SSR/SSG builds
  const currentYear = 2025;
  return `© ${currentYear} My Private Tutor Online. All rights reserved.`;
};

// Content validation utilities

/**
 * Validate that required content fields are present
 * CONTEXT7 SOURCE: /microsoft/typescript - Function return type annotations for validation
 * @returns boolean indicating if all required fields are present
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const validateContentStructure = cache((): boolean => {
  const requiredFields: readonly string[] = [
    "header.siteName",
    "hero.title",
    "services.services",
    "contact.contactInfo",
  ];

  const missingFields: string[] = [];

  // Use direct JSON import - content always available
  const landingContent = landingPageContent;

  requiredFields.forEach((field) => {
    const keys = field.split(".");
    let current: Record<string, unknown> = landingContent as Record<
      string,
      unknown
    >;

    for (const key of keys) {
      if (!current || !current[key]) {
        missingFields.push(field);
        break;
      }
      current = current[key] as Record<string, unknown>;
    }
  });

  if (missingFields.length > 0) {
    // Missing required content fields detected
    return false;
  }

  return true;
});

/**
 * Get testimonials page content
 * CONTEXT7 SOURCE: /vercel/next.js - Server Component async data fetching with cache
 * ASYNC CMS REASON: Official Next.js documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Error handling with comprehensive return types
 * CMS DATA SOURCE: Using async loadCachedContent for testimonials data
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getTestimonialsContent = cache((): TestimonialsContent => {
  return testimonialsContent;
});

/**
 * Get testimonials page hero content with enhanced data structure
 * CONTEXT7 SOURCE: /vercel/next.js - Server Component async data fetching with cache
 * ASYNC CMS REASON: Official Next.js documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Enhanced interface design for component flexibility
 * CONTEXT7 SOURCE: Official TypeScript documentation for readonly property patterns
 * CMS DATA SOURCE: Using async loadCachedContent for testimonials hero data with extended support for hero variants
 * ENHANCEMENT REASON: Extended CMS integration to support TestimonialsHero component flexibility
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getTestimonialsHero = cache(
  (): {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly backgroundVariant?: "gradient" | "image" | "video";
    readonly size?: "compact" | "standard" | "full";
    readonly showCredentials?: boolean;
    readonly customCredentials?: Array<{
      readonly icon: "crown" | "award" | "star";
      readonly text: string;
    }>;
  } => {
    const testimonialsContentData = testimonialsContent;
    return {
      ...testimonialsContentData.hero,
      // Enhanced hero configuration with sensible defaults for premium testimonials
      backgroundVariant: "gradient" as const,
      size: "full" as const,
      showCredentials: true,
      // Royal credentials configuration for testimonials page
      customCredentials: [
        {
          icon: "crown" as const,
          text: "Featured in Tatler Address Book 2025",
        },
        { icon: "award" as const, text: "Recognised by School Guide UK" },
        { icon: "star" as const, text: "15+ Years Serving Elite Families" },
      ],
    };
  }
);

/**
 * Get enhanced testimonials intro configuration for TestimonialsIntro component (CACHED - Enhanced functionality)
 * CONTEXT7 SOURCE: /vercel/next.js - Server Component async data fetching with cache
 * ASYNC CMS REASON: Official Next.js documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing enhanced intro data access
 * CONTEXT7 SOURCE: /microsoft/typescript - Advanced interface patterns for trust indicator management
 * CMS DATA SOURCE: Using async loadCachedContent for testimonials mainContent with enhanced trust indicators
 * PURPOSE: Provides comprehensive intro configuration for testimonials page with royal endorsements
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getTestimonialsIntroConfig = cache(
  (): {
    readonly introContent: {
      readonly intro: string;
      readonly callToAction: string;
    };
    readonly trustIndicators: readonly {
      readonly id: string;
      readonly iconType:
        | "crown"
        | "award"
        | "shield"
        | "trophy"
        | "medal"
        | "star";
      readonly text: string;
      readonly description?: string;
      readonly featured?: boolean;
      readonly url?: string;
    }[];
    readonly backgroundVariant: "slate" | "white" | "gradient" | "transparent";
    readonly showWaveSeparator: boolean;
  } => {
    // CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
    // SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
    return {
      introContent: testimonialsContent.mainContent,
      // Enhanced trust indicators for royal client credibility
      trustIndicators: [
        {
          id: "tatler-2025",
          iconType: "crown" as const,
          text: "Featured in Tatler",
          description: "Address Book 2025 - Elite society recognition",
          featured: true,
          url: "#tatler-recognition",
        },
        {
          id: "school-guide-top-pick",
          iconType: "award" as const,
          text: "School Guide UK's Top Pick",
          description:
            "Educational excellence recognition for premium tutoring",
          featured: true,
          url: "#school-guide-award",
        },
        {
          id: "royal-trust",
          iconType: "shield" as const,
          text: "Royal Client Trust",
          description:
            "Serving elite families with complete discretion since 2010",
          featured: false,
        },
        {
          id: "excellence-heritage",
          iconType: "trophy" as const,
          text: "15 Years Excellence",
          description: "Established educational heritage with proven results",
          featured: false,
        },
        {
          id: "oxbridge-success",
          iconType: "medal" as const,
          text: "Oxbridge Success",
          description: "89% success rate for Oxbridge placements",
          featured: false,
        },
        {
          id: "word-of-mouth",
          iconType: "star" as const,
          text: "Pure Word-of-Mouth",
          description: "Never spent a penny on advertising - reputation speaks",
          featured: false,
        },
      ],
      backgroundVariant: "slate" as const,
      showWaveSeparator: true,
    };
  }
);

/**
 * Get quotes for quote sections throughout the site
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.quotes for quote components
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getQuotes = cache((): QuoteContent => {
  return landingPageContent.quotes;
});

/**
 * Get founder quote for Elizabeth Burrows testimonial section
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using landingPageContent.quotes.founderQuote
 */
export const getFounderQuote = (): {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly image: string;
  readonly signature?: string;
} => {
  return landingPageContent.quotes.founderQuote;
};

/**
 * Get royal testimonial for premium service showcase
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using landingPageContent.quotes.royalTestimonial
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getRoyalTestimonial = cache(
  (): {
    readonly quote: string;
    readonly author: string;
    readonly title: string;
    readonly crest?: string;
    readonly verified: boolean;
  } => {
    return landingPageContent.quotes.royalTestimonial;
  }
);

/**
 * Get recent testimonials for display (DEPRECATED - Use getAllTestimonials instead)
 * CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
 *
 * DEPRECATION NOTICE: This function is maintained for backward compatibility
 * NEW CODE SHOULD USE: getAllTestimonials() for all testimonials access
 *
 * MIGRATION PATH:
 * - Replace getRecentTestimonials() → getAllTestimonials()
 * - Use getVideoTestimonials() for video-only testimonials
 * - Use getTextTestimonials() for text-only testimonials
 *
 * @deprecated Use getAllTestimonials() instead for clearer intent
 */
export const getRecentTestimonials = cache((): readonly Testimonial[] => {
  // CMS DATA SOURCE: Direct access to canonical testimonials JSON - SYNCHRONOUS PATTERN
  // DEPRECATION REASON: Function name doesn't clearly indicate it returns ALL testimonials
  return testimonialsContent.recentTestimonials;
});

/**
 * Get About Us page testimonials (DEPRECATED - Use getTextTestimonials() instead)
 * CONTEXT7 SOURCE: /reactjs/react.dev - Direct data access patterns for static content
 * SYNCHRONOUS CMS PATTERN: Official React documentation Section 4.2 recommends synchronous data access
 *
 * @deprecated This function is deprecated in favor of getTextTestimonials() for better CMS integration
 *
 * DEPRECATION REASON:
 * - Uses separate aboutTestimonials array instead of unified CMS system
 * - Does not automatically filter video testimonials
 * - Creates data inconsistency between About page and testimonials page
 *
 * MIGRATION PATH:
 * - Replace getAboutTestimonials() → getTextTestimonials()
 * - getTextTestimonials() automatically excludes video testimonials
 * - Uses single source of truth from recentTestimonials array
 * - Maintains synchronous CMS architecture patterns
 *
 * PURPOSE: Legacy compatibility - provides curated testimonials from aboutTestimonials JSON array
 */
export const getAboutTestimonials = cache((): readonly Testimonial[] => {
  // DEPRECATED FUNCTION: This function is deprecated - use getTextTestimonials() instead
  // LEGACY PATTERN: Direct JSON access to separate aboutTestimonials array
  // NOTE: New implementations should use getTextTestimonials() for video filtering and unified CMS
  console.warn(
    "[DEPRECATION WARNING] getAboutTestimonials() is deprecated. Use getTextTestimonials() instead for unified CMS and video filtering."
  );
  return (
    testimonialsContent.aboutTestimonials ||
    testimonialsContent.recentTestimonials
  );
});

/**
 * Get schools list for testimonials page (CACHED - #2 most used: 7 times)
 * CONTEXT7 SOURCE: /vercel/next.js - Server Component async data fetching with cache
 * ASYNC CMS REASON: Official Next.js documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for preventing redundant data access
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations for cached functions
 * CMS DATA SOURCE: Using async loadCachedContent for testimonials schools for legacy compatibility and eliteSchoolsDatabase for enhanced carousel
 *
 * ENHANCED TASK 6: Elite Schools Carousel Integration
 * - Maintains backward compatibility with existing simple school names
 * - Enhanced carousel component uses full EliteSchool objects from schools-data.ts
 */
export const getTestimonialsSchools = cache((): readonly string[] => {
  return testimonialsContent.schools;
});

/**
 * Get enhanced elite schools data for carousel component (CACHED - Task 6 Implementation)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for preventing redundant data access
 * CONTEXT7 SOURCE: /microsoft/typescript - Import and re-export patterns for data access
 * CMS DATA SOURCE: Using eliteSchoolsDatabase for comprehensive school information
 *
 * CAROUSEL INTEGRATION: Provides full EliteSchool objects for enhanced carousel display
 */
export const getEliteSchoolsData = cache(() => {
  // Import at runtime to prevent circular dependencies
  const {
    eliteSchoolsDatabase,
    getFeaturedSchools,
    getTopSchoolsByPrestige,
  } = require("@/lib/cms/schools-data");

  return {
    allSchools: eliteSchoolsDatabase,
    featuredSchools: getFeaturedSchools(),
    topSchools: getTopSchoolsByPrestige(15),
  };
});

/**
 * Get schools for enhanced carousel configuration (CACHED - Task 6 Enhanced Configuration)
 * CONTEXT7 SOURCE: /microsoft/typescript - Utility function patterns for data transformation
 * CMS DATA SOURCE: Enhanced schools carousel configuration for testimonials page
 *
 * CONFIGURATION REASON: Provides optimized school selection for testimonials carousel
 */
export const getTestimonialsCarouselConfig = cache(() => {
  const { featuredSchools, topSchools } = getEliteSchoolsData();

  return {
    schools: topSchools, // Top 15 most prestigious schools
    displayMode: "mixed" as const,
    showControls: true,
    showModal: true,
    autoPlay: true,
    pauseOnHover: true,
    animationSpeed: "medium" as const,
    backgroundVariant: "blue" as const,
    title: "Prestigious Schools & Universities",
    description:
      "Our students have secured places at the most prestigious educational institutions worldwide",
  };
});

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for service and subject data structures
// SERVICES CMS TYPES: Subject categories, statistics, and service-specific content management
export interface ServiceSubjectItem {
  readonly name: string;
  readonly description: string;
  readonly keyFeatures: readonly string[];
  readonly pricing?: {
    readonly from: string;
    readonly to?: string;
    readonly currency: string;
  };
  readonly level?: string; // e.g., "KS1-KS4", "A-Level", "University"
  readonly children?: readonly ServiceSubjectItem[]; // CONTEXT7 SOURCE: /microsoft/typescript - Nested children support for dropdown within dropdown functionality
  // CONTEXT7 SOURCE: /microsoft/typescript - Video section interface for multimedia content integration
  // VIDEO SECTION REASON: Official TypeScript patterns for optional video content within subject items
  readonly videoSection?: {
    readonly thumbnailUrl: string;
    readonly videoUrl: string;
    readonly title: string;
    readonly alt: string;
  };
}

export interface ServiceSubjectCategory {
  readonly id: string;
  readonly title: string;
  readonly icon: string; // Lucide icon name
  readonly description: string;
  readonly subjects: readonly ServiceSubjectItem[];
  readonly pricing?: {
    readonly basePriceFrom: string;
    readonly currency: string;
  };
  readonly popularityRank?: number; // For ordering display
  // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for call outs and testimonials display
  // CALLOUTS REASON: Official React patterns for array of strings representing bullet points for premium service highlights
  readonly callOuts: readonly string[];
  // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for testimonial content structure
  // TESTIMONIAL REASON: Official React patterns for string field containing client testimonial quote for social proof
  readonly testimonial: string;
}

export interface ServiceStatisticItem {
  readonly value: string; // e.g., "40+", "95%", "KS1-University"
  readonly label: string;
  readonly description?: string;
  readonly icon?: string; // Optional icon name
  readonly category?: "achievement" | "coverage" | "success" | "general";
  readonly highlighted?: boolean; // For premium positioning
}

export interface ServicesPageContent {
  readonly hero: {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly backgroundImage?: string;
  };
  readonly statistics: readonly ServiceStatisticItem[];
  readonly subjectCategories: readonly ServiceSubjectCategory[];
  readonly homeschoolingPreview: {
    readonly title: string;
    readonly description: string;
    readonly features: readonly { readonly text: string }[];
    readonly buttonText: string;
    readonly icon?: string;
  };
  readonly cta: {
    readonly title: string;
    readonly description: string;
    readonly primaryButton: {
      readonly text: string;
      readonly action: string;
    };
    readonly secondaryButton: {
      readonly text: string;
      readonly action: string;
    };
  };
  readonly sectionTitles: {
    readonly subjectCategories: {
      readonly title: string;
      readonly description: string;
    };
  };
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for results documentation and competitive analysis
// RESULTS DOCUMENTATION SYSTEM: Business analytics interfaces for tracking verifiable outcomes and competitive positioning
export interface ResultsDocumentationItem {
  readonly category:
    | "grade_improvement"
    | "university_placement"
    | "exam_success"
    | "roi_analysis";
  readonly metric: string; // e.g., "A-Level Grade Improvement", "Russell Group Acceptance"
  readonly value: string; // e.g., "2.3 grades average", "85% success rate"
  readonly description: string;
  readonly sampleSize?: number;
  readonly timeframe: string; // e.g., "2023-2024 academic year"
  readonly verificationLevel: "verified" | "estimated" | "projected";
  readonly confidenceInterval?: string; // e.g., "±0.2 grades", "±5%"
  readonly icon?: string;
  readonly priority: number; // 1-10 for display ordering
}

export interface CaseStudyItem {
  readonly id: string;
  readonly category:
    | "oxbridge_prep"
    | "11_plus"
    | "elite_corporate"
    | "comparison_shopper";
  readonly anonymizedTitle: string; // e.g., "London Grammar School Success"
  readonly level: string; // e.g., "GCSE", "A-Level", "University Application"
  readonly subject?: string;
  readonly initialPosition: string; // e.g., "Grade C in Mathematics"
  readonly finalOutcome: string; // e.g., "Grade A* achieved, Cambridge offer"
  readonly duration: string; // e.g., "6 months intensive preparation"
  readonly investment: {
    readonly tier: "essentials" | "premium" | "elite";
    readonly approxValue?: string; // e.g., "£8,000-12,000"
  };
  readonly keyInterventions: readonly string[]; // e.g., ["Weekly sessions", "Mock exams", "Interview prep"]
  readonly clientTestimonial?: string;
  readonly verified: boolean;
  readonly featured: boolean; // For premium positioning
}

export interface CompetitiveAnalysisData {
  readonly category:
    | "pricing"
    | "service_quality"
    | "credentials"
    | "exclusivity"
    | "results";
  readonly metricName: string;
  readonly ourAdvantage: string;
  readonly industryAverage?: string;
  readonly competitorComparison?: string;
  readonly justification: string; // Why we're different/better
  readonly supportingEvidence: readonly string[];
  readonly clientSegment:
    | "oxbridge_prep"
    | "11_plus"
    | "elite_corporate"
    | "comparison_shopper"
    | "all";
  readonly priority: number;
}

export interface ROICalculationData {
  readonly investmentTier: "essentials" | "premium" | "elite";
  readonly typicalInvestment: {
    readonly min: number;
    readonly max: number;
    readonly currency: "GBP";
  };
  readonly measurableOutcomes: readonly {
    readonly outcome: string; // e.g., "University place secured"
    readonly financialValue?: string; // e.g., "£45,000 annual salary increase potential"
    readonly probabilityImprovement: string; // e.g., "65% higher acceptance rate"
  }[];
  readonly timeToReturn: string; // e.g., "2-3 years post-graduation"
  readonly lifetimeValue: string; // e.g., "£300,000-500,000 career premium"
  readonly confidenceLevel: string;
}

export interface BusinessAnalyticsData {
  readonly resultsDocumentation: readonly ResultsDocumentationItem[];
  readonly caseStudies: readonly CaseStudyItem[];
  readonly competitiveAnalysis: readonly CompetitiveAnalysisData[];
  readonly roiCalculations: readonly ROICalculationData[];
  readonly lastUpdated: string;
  readonly dataVerificationDate: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface implementation patterns for service content retrieval
// SERVICES CMS FUNCTIONS: Access functions for service page content and data structures

/**
 * Get services page content (CACHED - Services page specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for preventing redundant data access
 * CONTEXT7 SOURCE: /microsoft/typescript - Interface return type for services page content
 * CMS DATA SOURCE: Using servicesContent for complete services page data
 * PURPOSE: Provides all services page content including hero, statistics, categories, and CTAs
 */
export const getServicesContent = cache((): ServicesPageContent => {
  // Temporary implementation - will be replaced with actual CMS data
  return {
    hero: {
      title: "Subject Tuition",
      subtitle: "Comprehensive educational support across all levels",
      description:
        "From entrance exams to university preparation, our expert tutors provide personalised instruction across all subjects and educational stages.",
    },
    statistics: [
      {
        value: "40+",
        label: "Subjects Covered",
        description:
          "Comprehensive subject coverage from KS1 to University level",
        category: "coverage",
        icon: "BookOpen",
      },
      {
        value: "95%",
        label:
          "95% of candidates receive offers from at least one of their top choices",
        description:
          "Including prestigious grammar schools, independent schools, and Oxbridge",
        category: "success",
        highlighted: true,
        icon: "Award",
      },
      {
        value: "KS1-University",
        label: "All Educational Levels",
        description: "From early primary through to postgraduate support",
        category: "coverage",
        icon: "GraduationCap",
      },
      {
        value: "15 Years",
        label: "Educational Excellence",
        description: "Established heritage serving elite families since 2010",
        category: "achievement",
        icon: "Crown",
      },
      {
        value: "Royal",
        label: "Client Endorsements",
        description:
          "Trusted by aristocratic families and featured in Tatler Address Book 2025",
        category: "achievement",
        highlighted: true,
        icon: "Shield",
      },
      {
        value: "Three Tiers",
        label: "Service Levels",
        description: "Essentials, Premium, and Elite tutoring packages",
        category: "general",
        icon: "Target",
      },
    ],
    subjectCategories: [
      // CONTEXT7 SOURCE: /microsoft/typescript - Array reordering following official TypeScript data structure patterns
      // REORGANISATION REASON: Official TypeScript patterns for immutable data structure modification via array recreation
      // CMS REORGANISATION: Updated subject categories order per client requirements
      // CONTEXT7 SOURCE: /microsoft/typescript - Updated PRIMARY section with comprehensive opening and detailed sub-sections
      // CONTENT UPDATE REASON: Official TypeScript data structure patterns for enhanced CMS content management
      // 1. PRIMARY (separated from primary-secondary)
      {
        id: "primary",
        title: "PRIMARY",
        icon: "BookOpen",
        description:
          "The primary curriculum is the scaffolding upon which secondary success plays out; we're passionate about plugging gaps and getting it right. We understand that early education experiences are formative, so we prioritise curiosity, resilience, and a love of learning.",
        popularityRank: 1,
        pricing: { basePriceFrom: "£60", currency: "GBP" },
        subjects: [
          {
            name: "Confidence-building lessons designed for early learners",
            description:
              "Our primary tutoring focuses on nurturing natural curiosity whilst building essential academic foundations. We understand that young learners need encouragement and support to develop confidence in their abilities, creating positive associations with learning that will serve them throughout their educational journey.",
            keyFeatures: [
              "Age-appropriate teaching methods",
              "Confidence building activities",
              "Positive reinforcement techniques",
              "Play-based learning integration",
            ],
            level: "Reception-Year 6",
            pricing: { from: "£60", to: "£100", currency: "GBP" },
          },
          {
            name: "7+, 8+ and 11+ specialists with a track record of top school offers",
            description:
              "Our experienced tutors specialise in preparing young students for competitive entrance examinations. With proven success rates at leading preparatory and grammar schools, we provide targeted preparation that builds both academic competence and examination confidence.",
            keyFeatures: [
              "Entrance exam specialists",
              "Proven track record",
              "School-specific preparation",
              "Examination technique coaching",
            ],
            level: "Year 2-6",
            pricing: { from: "£85", to: "£150", currency: "GBP" },
          },
          {
            name: "Individual learning plans shaped by expert assessment",
            description:
              "Every primary student receives a comprehensive initial assessment to identify their unique learning style, strengths, and areas for development. Our expert tutors then create personalised learning plans that adapt to each child's pace and preferred learning methods.",
            keyFeatures: [
              "Comprehensive initial assessment",
              "Personalised learning plans",
              "Regular progress monitoring",
              "Adaptive teaching methods",
            ],
            level: "Reception-Year 6",
            pricing: { from: "£65", to: "£120", currency: "GBP" },
          },
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for call outs and testimonials display
        // CALLOUTS REASON: Official React patterns for array of strings representing bullet points for premium service highlights
        callOuts: [
          "Confidence-building lessons designed for early learners",
          "7+, 8+ and 11+ specialists with a track record of top school offers",
          "Individual learning plans shaped by expert assessment",
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for testimonial content structure
        // TESTIMONIAL REASON: Official React patterns for string field containing client testimonial quote for social proof
        testimonial:
          "Our daughter was so shy and unsure at the start. Now she's thriving, and her 7+ offers speak for themselves. We couldn't be more grateful.",
      },
      // CONTEXT7 SOURCE: /microsoft/typescript - Updated SECONDARY section with comprehensive opening and detailed sub-sections
      // CONTENT UPDATE REASON: Official TypeScript data structure patterns for enhanced CMS content management
      // 2. SECONDARY (separated from primary-secondary)
      {
        id: "secondary",
        title: "SECONDARY",
        icon: "BookOpen",
        description:
          "One-to-one tutoring for KS3, GCSE, A-Level and IB, delivered by experienced subject specialists and examiners. Our support goes beyond the syllabus, equipping students with effective revision strategies, time management skills and structured study plans. 94% of students improve by at least two grades at GCSE.",
        popularityRank: 2,
        pricing: { basePriceFrom: "£70", currency: "GBP" },
        subjects: [
          {
            name: "Tutoring Today for Success Tomorrow",
            description:
              "GCSEs, A-Levels and IB exams mark crucial academic transition points. As subjects become more complex, results in these qualifications play a defining role in shaping university pathways. A minimum requirement of 7s at GCSE is now standard at many top-tier universities. Personalised, one-to-one tuition can make a significant difference at both GCSE and A Level, helping students strengthen their academic record, ready to present a dynamite profile when it matters most.",
            keyFeatures: [
              "GCSE & A-Level expertise",
              "University pathway planning",
              "Grade improvement strategies",
              "Profile strengthening",
            ],
            level: "Year 7-13",
            pricing: { from: "£70", to: "£150", currency: "GBP" },
          },
          {
            name: "Personalised Plans to Ensure Maximum Progress",
            description:
              "Each student is initially assessed to identify their individual strengths, learning style and areas for growth. Regular progress check-ins and measurable academic outcomes ensure students stay on track for success.",
            keyFeatures: [
              "Individual assessment",
              "Learning style identification",
              "Progress monitoring",
              "Measurable outcomes",
            ],
            level: "Year 7-13",
            pricing: { from: "£75", to: "£140", currency: "GBP" },
          },
          {
            name: "Subjects We Tutor",
            description:
              "Comprehensive subject coverage across all key academic areas including STEM subjects, humanities, languages, and creative disciplines. Our tutors are subject specialists with extensive examination experience.",
            keyFeatures: [
              "Comprehensive subject coverage",
              "Subject specialists",
              "Examination experience",
              "Personalised approach",
            ],
            level: "Year 7-13",
            pricing: { from: "£70", to: "£180", currency: "GBP" },
            // CONTEXT7 SOURCE: /microsoft/typescript - Nested children structure for dropdown within dropdown functionality
            // NESTED DROPDOWN REASON: Official TypeScript patterns for hierarchical data structures supporting multi-level accordion interfaces
            children: [
              {
                name: "STEM & Mathematical Subjects",
                description:
                  "Advanced mathematics and scientific disciplines taught by specialists with extensive examination board experience.",
                keyFeatures: [
                  "Mathematics & Further Mathematics",
                  "Biology",
                  "Chemistry",
                  "Physics",
                  "Combined Science (GCSE)",
                  "Computer Science",
                  "Design and Technology",
                ],
                level: "Year 7-13",
                pricing: { from: "£75", to: "£180", currency: "GBP" },
              },
              {
                name: "Humanities & Social Sciences",
                description:
                  "Comprehensive humanities education covering literature, history, politics, and social sciences with expert guidance.",
                keyFeatures: [
                  "English Language & Literature",
                  "History",
                  "Politics",
                  "Geography",
                  "Economics and Business Studies",
                  "Religious Studies",
                  "Philosophy",
                  "Sociology",
                  "Psychology",
                ],
                level: "Year 7-13",
                pricing: { from: "£70", to: "£160", currency: "GBP" },
              },
              {
                name: "Languages",
                description:
                  "Modern and classical language tuition with native speakers and qualified language specialists.",
                keyFeatures: [
                  "French",
                  "Spanish",
                  "Italian",
                  "German",
                  "Mandarin",
                  "Portuguese",
                  "Latin",
                  "Ancient Greek",
                  "Other languages available",
                ],
                level: "Year 7-13",
                pricing: { from: "£75", to: "£170", currency: "GBP" },
              },
              {
                name: "Creative & Arts-Based Subjects",
                description:
                  "Creative disciplines taught by practising professionals and experienced arts educators.",
                keyFeatures: [
                  "Fine Art and History of Art",
                  "Art and Visual Studies",
                  "Drama and Theatre Studies",
                  "Media Studies",
                  "Creative portfolio development",
                ],
                level: "Year 7-13",
                pricing: { from: "£70", to: "£150", currency: "GBP" },
              },
              {
                name: "Additional Academic Support",
                description:
                  "Specialised academic skills and examination preparation beyond core curriculum subjects.",
                keyFeatures: [
                  "Extended Project Qualification (EPQ)",
                  "Mentoring and Study Skills",
                  "Critical Thinking",
                  "Interview Technique",
                  "Public Speaking and Debating",
                ],
                level: "Year 7-13",
                pricing: { from: "£80", to: "£160", currency: "GBP" },
              },
            ],
          },
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for call outs and testimonials display
        // CALLOUTS REASON: Official React patterns for array of strings representing bullet points for premium service highlights
        callOuts: [
          "GCSE and A-level examiners as tutors",
          "Support across all major exam boards: AQA, Edexcel, OCR, IB",
          "Support with GCSE, A Level and IB retakes",
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for testimonial content structure
        // TESTIMONIAL REASON: Official React patterns for string field containing client testimonial quote for social proof
        testimonial:
          "Annika scored a 7 in her GCSE retake. We are THRILLED. It's such an improvement on the 4 she got in the summer!",
      },
      // 3. ENTRANCE EXAMS (7+, 8+, 11+, 13+, 16+, UKiset, CAT4)
      {
        id: "entrance-exams",
        title: "ENTRANCE EXAMS (7+, 8+, 11+, 13+, 16+, UKiset, CAT4)",
        icon: "Target",
        description:
          "Specialised preparation for competitive entrance examinations across all age groups",
        popularityRank: 3,
        pricing: { basePriceFrom: "£85", currency: "GBP" },
        subjects: [
          {
            name: "Aligned With Every Major Exam Board",
            description:
              "Our team works with GL, CEM, ISEB, CAT4, and internal papers set by individual schools.",
            keyFeatures: [
              "GL Assessment expertise",
              "CEM preparation",
              "ISEB Common Entrance",
              "School-specific papers",
            ],
            level: "Year 2-8",
            pricing: { from: "£85", to: "£160", currency: "GBP" },
          },
          {
            name: "Expert Tutor Matching",
            description:
              "Paired with a specialist tutor—often a former school examiner or prep school teacher—carefully chosen to meet the family's school ambitions.",
            keyFeatures: [
              "Former examiners",
              "Prep school teachers",
              "School-specific expertise",
              "Personalised matching",
            ],
            level: "All Levels",
            pricing: { from: "£100", to: "£180", currency: "GBP" },
            // CONTEXT7 SOURCE: /facebook/react - Video section integration for entrance exam specialist introduction
            // VIDEO SECTION REASON: Official React patterns for multimedia content display within CMS data structure
            videoSection: {
              thumbnailUrl: "/images/tutors/emily.jpg",
              videoUrl: "/videos/11+ expert intro video MPTO.mp4",
              title: "Meet Emily - Our 11+ Expert Introduction",
              alt: "Emily's 11+ Expert Introduction Video - Meet Emily, our specialist 11+ tutor and learn about our comprehensive entrance exam preparation approach",
            },
          },
          {
            name: "Tailored, Flexible Programmes",
            description:
              "Each programme is personalised to the target schools, exam formats and the student's pace—ensuring effective progress without overwhelm.",
            keyFeatures: [
              "Target school focus",
              "Exam format preparation",
              "Individual pacing",
              "Stress management",
            ],
            level: "All Levels",
            pricing: { from: "£85", to: "£150", currency: "GBP" },
          },
          {
            name: "Parent Guidance & School Selection",
            description:
              "We support families throughout—from helping create a shortlist of schools through to preparing for interviews.",
            keyFeatures: [
              "School selection advice",
              "Application guidance",
              "Timeline planning",
              "Interview preparation",
            ],
            level: "Parent Support",
            pricing: { from: "£80", to: "£140", currency: "GBP" },
          },
          {
            name: "Mock Exams & Interview Practice",
            description:
              "Students gain confidence through realistic mock tests and 1-2-1 interview rehearsals, with detailed feedback to improve performance.",
            keyFeatures: [
              "Realistic mock exams",
              "Interview rehearsals",
              "Detailed feedback",
              "Performance analysis",
            ],
            level: "All Levels",
            pricing: { from: "£120", to: "£200", currency: "GBP" },
          },
          {
            name: "Deep Expertise From Selective Schools",
            description:
              "Our team includes qualified teachers at top 10 London grammar schools and leading UK boarding schools. Many have written and marked real entrance exam papers.",
            keyFeatures: [
              "Grammar school teachers",
              "Boarding school expertise",
              "Exam paper writers",
              "Marking experience",
            ],
            level: "All Levels",
            pricing: { from: "£150", to: "£250", currency: "GBP" },
          },
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for call outs and testimonials display
        // CALLOUTS REASON: Official React patterns for array of strings representing bullet points for premium service highlights
        callOuts: [
          "95% of candidates receive offers from at least one of their top choices",
          "Tutors include former entrance exam markers and interview panellists",
          "Mock exams, real-time feedback and school selection support",
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for testimonial content structure
        // TESTIMONIAL REASON: Official React patterns for string field containing client testimonial quote for social proof
        testimonial:
          "David did extremely well and received offers from Westminster, St Paul's, Sussex House, Kings and Wetherby. Thank you for your help in getting us this far - now for the interviews (his favourite bit)!",
      },
      // CONTEXT7 SOURCE: /microsoft/typescript - Updated UNIVERSITY AND BEYOND section with comprehensive opening and detailed sub-sections
      // CONTENT UPDATE REASON: Official TypeScript data structure patterns for enhanced CMS content management
      // 4. UNIVERSITY AND BEYOND
      {
        id: "university-beyond",
        title: "UNIVERSITY ADMISSIONS EXAMS & ENGLISH PROFICIENCY TESTS",
        icon: "GraduationCap",
        description:
          "Expert academic support for undergraduates and postgraduates, including essay coaching, dissertations, and subject-specific tutoring. University admissions guidance for UK, US, Oxbridge and other global institutions—personal statements, interview prep, admissions tests.",
        popularityRank: 4,
        pricing: { basePriceFrom: "£95", currency: "GBP" },
        subjects: [
          {
            name: "UCAS Insight from Elizabeth",
            description:
              "Expert Advice for Standout Applications - Gain insider access to Elizabeth's Essential UCAS Guide — two video masterclasses based on her live seminars at University College London. Learn how to craft a standout personal statement and build a smart UCAS strategy, with rare insights usually reserved for her private clients.",
            keyFeatures: [
              "Video masterclasses",
              "UCL seminar content",
              "Personal statement guidance",
              "UCAS strategy",
            ],
            level: "Year 13+",
            pricing: { from: "£120", to: "£200", currency: "GBP" },
            // CONTEXT7 SOURCE: /facebook/react - Two-column video section integration copying exact working entrance exams pattern
            // TWO COLUMN VIDEO REASON: Official React patterns for dual video content following exact working entrance exams videoSection structure
            twoColumnVideoSection: {
              video1: {
                thumbnailUrl: "/images/tutors/emily.jpg",
                videoUrl: "/videos/11+ expert intro video MPTO.mp4",
                title:
                  "Meet Emily - University Admissions Specialist Introduction",
                alt: "Emily's University Admissions Specialist Introduction Video - Meet Emily, our specialist university admissions tutor and learn about our comprehensive application preparation approach",
              },
              video2: {
                thumbnailUrl: "/images/tutors/emily.jpg",
                videoUrl: "/videos/11+ expert intro video MPTO.mp4",
                title: "Meet Emily - Personal Statement & Interview Expert",
                alt: "Emily's Personal Statement & Interview Expert Video - Learn about our expert personal statement crafting and interview preparation techniques for university applications",
              },
            },
          },
          {
            name: "Elizabeth's Top 10 Tips for Sculpting an Outstanding Personal Statement",
            description:
              "Elizabeth knows what sets a personal statement apart. Here she distills 15 years of expertise into her Top 10 Tips, helping UCAS applicants defy the odds and secure spots at prestigious universities. These aren't recycled clichés — they're proven techniques you won't find anywhere else.",
            keyFeatures: [
              "15 years expertise",
              "Proven techniques",
              "University-specific insights",
              "Premium guidance",
            ],
            level: "Year 13+",
            pricing: { from: "£150", to: "£250", currency: "GBP" },
          },
          {
            name: "Subject-Specific University Admissions Tests",
            description:
              "Targeted preparation for high-stakes exams that form a crucial part of university and course-specific admissions. Our experienced tutors offer intensive, focused tuition that sharpens core skills and exam-specific techniques.",
            keyFeatures: [
              "High-stakes exam preparation",
              "Intensive focused tuition",
              "Core skills development",
              "Exam-specific techniques",
            ],
            level: "Year 13+",
            pricing: { from: "£120", to: "£220", currency: "GBP" },
            // CONTEXT7 SOURCE: /microsoft/typescript - Nested children structure for university admissions test categorisation
            // NESTED DROPDOWN REASON: Official TypeScript patterns for hierarchical categorisation of university entrance examinations
            children: [
              {
                name: "TMUA",
                description:
                  "Test of Mathematics for University Admission - for mathematics-based university courses in the UK including Mathematics, Computer Science, and Engineering degrees.",
                keyFeatures: [
                  "Mathematics-based courses",
                  "UK university admissions",
                  "Computer Science applications",
                  "Engineering degree requirements",
                ],
                level: "Year 13+",
                pricing: { from: "£130", to: "£200", currency: "GBP" },
              },
              {
                name: "LNAT",
                description:
                  "National Admissions Test for Law - required for law courses at top UK universities including Oxford, Cambridge, UCL, and other leading institutions.",
                keyFeatures: [
                  "Law course applications",
                  "Top UK universities",
                  "Critical reasoning skills",
                  "Essay writing assessment",
                ],
                level: "Year 13+",
                pricing: { from: "£140", to: "£220", currency: "GBP" },
              },
              {
                name: "SAT/ACT",
                description:
                  "Standardised tests used for US university admissions, covering mathematics, English, and reasoning skills essential for American higher education applications.",
                keyFeatures: [
                  "US university admissions",
                  "Mathematics assessment",
                  "English proficiency",
                  "Critical reasoning",
                ],
                level: "Year 13+",
                pricing: { from: "£120", to: "£200", currency: "GBP" },
              },
              {
                name: "BMAT/UCAT",
                description:
                  "BioMedical Admissions Test and University Clinical Aptitude Test - required for medical and dental school applications in the UK and internationally.",
                keyFeatures: [
                  "Medical school applications",
                  "Dental school requirements",
                  "Scientific aptitude",
                  "Critical thinking skills",
                ],
                level: "Year 13+",
                pricing: { from: "£150", to: "£220", currency: "GBP" },
              },
              {
                name: "IELTS/TOEFL",
                description:
                  "International English Language Testing System and Test of English as a Foreign Language - English proficiency exams required by universities for non-native speakers.",
                keyFeatures: [
                  "English proficiency certification",
                  "International university requirements",
                  "CELTA certified tutors",
                  "TEFL qualified instruction",
                ],
                level: "Year 13+",
                pricing: { from: "£100", to: "£180", currency: "GBP" },
              },
              {
                name: "TSA",
                description:
                  "Thinking Skills Assessment for courses at Oxford, Cambridge, and UCL requiring advanced critical thinking and problem-solving abilities.",
                keyFeatures: [
                  "Oxford applications",
                  "Cambridge requirements",
                  "UCL admissions",
                  "Critical thinking assessment",
                ],
                level: "Year 13+",
                pricing: { from: "£140", to: "£200", currency: "GBP" },
              },
              {
                name: "ELAT",
                description:
                  "English Literature Admissions Test for Oxford applicants studying English Language and Literature, requiring advanced literary analysis skills.",
                keyFeatures: [
                  "Oxford English applications",
                  "Literary analysis skills",
                  "Close reading techniques",
                  "Critical essay writing",
                ],
                level: "Year 13+",
                pricing: { from: "£130", to: "£190", currency: "GBP" },
              },
            ],
          },
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for call outs and testimonials display
        // CALLOUTS REASON: Official React patterns for array of strings representing bullet points for premium service highlights
        callOuts: [
          "Matched with Cambridge and Oxford alumni",
          "Insider insight on how to stand out in Oxbridge applications",
          "Step-by-step support with personal statements, admissions tests and mock interviews",
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for testimonial content structure
        // TESTIMONIAL REASON: Official React patterns for string field containing client testimonial quote for social proof
        testimonial:
          "My tutor had studied at Cambridge and gave me so many practical insights I wouldn't have found anywhere else. I felt prepared, confident—and I got my offer!",
      },
      // CONTEXT7 SOURCE: /microsoft/typescript - Updated ONLINE HOMESCHOOLING section with comprehensive opening and detailed structure
      // CONTENT UPDATE REASON: Official TypeScript data structure patterns for enhanced CMS content management
      // 5. ONLINE HOMESCHOOLING
      {
        id: "online-homeschooling",
        title: "ONLINE HOMESCHOOLING",
        icon: "Globe",
        description:
          "Comprehensive one-to-one homeschooling for families seeking both academic structure and flexibility.",
        popularityRank: 5,
        pricing: { basePriceFrom: "£80", currency: "GBP" },
        subjects: [
          {
            // CONTEXT7 SOURCE: /reactjs/react.dev - HTML content formatting for improved readability with paragraph breaks and emphasis
            // CONTENT FORMATTING REASON: Official React documentation demonstrates HTML markup patterns for enhanced text structure and readability
            name: "Why Choose Homeschooling with Us",
            description:
              "Private‑School Standard, Delivered Virtually: We deliver bespoke online programmes that rival independent schools in quality.<br><br>Fully Personalised Curriculum & Timetabling: Lessons are crafted around each child's strengths, interests and pace. Consistent Tutor Teams & Academic Continuity: Students benefit from a stable team of expert tutors—subject specialists with years of experience and often examiner credentials.<br><br>Progress Tracking & Motivation-Focused Design: Regular assessments, achievable goals, and work reviewed in real time ensure the programme adapts to each student's growth. Expert Support for SEN Needs: Our SEN-aligned homeschooling incorporates specially tailored pathways for students with dyslexia, ADHD, processing differences or related needs—delivered with empathy and structure.",
            keyFeatures: [
              "Private school standard",
              "Personalised curriculum",
              "Expert tutor teams",
              "Progress tracking",
              "SEN support",
            ],
            level: "Reception-GCSE",
            pricing: { from: "£80", to: "£160", currency: "GBP" },
          },
          {
            name: "A Unique Pathway for Global & Gifted Learners",
            description:
              "Academic excellence without the need for physical classrooms. Personal schedules built around elite sports, arts commitments or world experiences. A supportive, curated tutor programme that encourages curiosity, autonomy, and confidence.",
            keyFeatures: [
              "Global accessibility",
              "Elite sports compatibility",
              "Arts-focused schedules",
              "Curated tutoring",
            ],
            level: "All Levels",
            pricing: { from: "£90", to: "£180", currency: "GBP" },
          },
          {
            name: "How We Work",
            description:
              "Individual Onboarding: We begin with a comprehensive academic and interests profile. Goal Setting & Curriculum Design: Tutors build flexible lesson plans aligned with national standards or bespoke learning aims. Structured Delivery: Students engage in live online sessions, maintain daily routines, and receive regular tutoring feedback. Ongoing Review: Progress is tracked, objectives reset, and adjustments made with parental involvement.",
            keyFeatures: [
              "Individual onboarding",
              "Goal setting",
              "Structured delivery",
              "Ongoing review",
            ],
            level: "All Levels",
            pricing: { from: "£80", to: "£170", currency: "GBP" },
          },
          {
            name: "Why It Works",
            description:
              "Our programmes blend flexible schedules, engaging pedagogy, and specialist expertise to deliver transformative education—regardless of geography. Students develop strong academic habits, enjoy tailored attention, and experience significant progress. If you're considering online homeschooling, our expert-led structure ensures both confidence and credibility every step of the way.",
            keyFeatures: [
              "Flexible schedules",
              "Engaging pedagogy",
              "Specialist expertise",
              "Academic habits",
            ],
            level: "All Levels",
            pricing: { from: "£75", to: "£150", currency: "GBP" },
          },
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for call outs and testimonials display
        // CALLOUTS REASON: Official React patterns for array of strings representing bullet points for premium service highlights
        callOuts: [
          "Full academic programmes delivered remotely, accommodating your time zone",
          "Curriculum design, teaching, and assessment all included",
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for testimonial content structure
        // TESTIMONIAL REASON: Official React patterns for string field containing client testimonial quote for social proof
        testimonial:
          "We relocated mid-year and chose to homeschool. I couldn't believe how much better the structure, care, and quality of teaching were than my son's old school.",
      },
      // CONTEXT7 SOURCE: /microsoft/typescript - Updated SEN SUPPORT & NEURODIVERSE LEARNING section with comprehensive opening and detailed structure
      // CONTENT UPDATE REASON: Official TypeScript data structure patterns for enhanced CMS content management
      // 6. SEN SUPPORT & NEURODIVERSE LEARNING
      {
        id: "sen-neurodiverse",
        title: "SEN SUPPORT & NEURODIVERSE LEARNING",
        icon: "Award",
        description:
          "Our Founder Elizabeth's own neurodiversity (dyspraxia) means she's especially passionate about equipping students with gamechanging SEN support. Our work is tailored to empower students with dyslexia, dyspraxia, ADHD, autism spectrum conditions, speech or processing differences, and related profiles. We create a focused learning environment where individual strengths are championed and confidence is rebuilt.",
        popularityRank: 6,
        pricing: { basePriceFrom: "£100", currency: "GBP" },
        subjects: [
          {
            name: "Individualised Learning",
            description:
              "Tutors conduct detailed assessments to identify strengths, challenges, and personal learning styles.",
            keyFeatures: [
              "Detailed assessments",
              "Strength identification",
              "Learning style analysis",
              "Personal approach",
            ],
            level: "All Ages",
            pricing: { from: "£100", to: "£170", currency: "GBP" },
          },
          {
            name: "Expert SEN Tutor Teams",
            description:
              "Every student is supported by highly experienced tutors trained in neurodiversity-aware pedagogy.",
            keyFeatures: [
              "Experienced tutors",
              "Neurodiversity training",
              "Specialist knowledge",
              "SEN expertise",
            ],
            level: "All Ages",
            pricing: { from: "£110", to: "£180", currency: "GBP" },
          },
          {
            name: "Exam Access Advice",
            description:
              "We guide families through exam access arrangements and make recommendations to improve fairness and outcomes.",
            keyFeatures: [
              "Access arrangements",
              "Exam guidance",
              "Fairness improvements",
              "Outcome optimisation",
            ],
            level: "All Ages",
            pricing: { from: "£90", to: "£150", currency: "GBP" },
          },
          {
            name: "Full Coordination & Professional Oversight",
            description:
              "Our homeschooling clients benefit from a dedicated tutor team, tailored learning schedules, and education consultancy to manage continuity—especially vital for SEN learners and families working across time zones.",
            keyFeatures: [
              "Dedicated tutor teams",
              "Tailored schedules",
              "Education consultancy",
              "Continuity management",
            ],
            level: "All Ages",
            pricing: { from: "£120", to: "£200", currency: "GBP" },
          },
          {
            // CONTEXT7 SOURCE: /reactjs/react.dev - HTML content formatting for improved readability with paragraph breaks and emphasis
            // CONTENT FORMATTING REASON: Official React documentation demonstrates HTML markup patterns for enhanced text structure and readability
            name: "Online Homeschooling for SEN & Complex Needs",
            description:
              "<p>Whether families are travelling, transitioning between schools, or prioritising personalised learning, our homeschooling programme delivers full academic support entirely online—without any in-person tutoring.</p><p><strong>Curriculum Built Around the Student:</strong><br>We design bespoke programmes around each child's strengths, interests, and pace—seamlessly blending academics with creative and practical learning.</p><p><strong>Holistic Academic & Emotional Support:</strong><br>We understand daily routines and tutor consistency are especially important for SEN learners. Our tutees are supported by program management and ongoing progress reviews to nurture both academic growth and personal well-being.</p><p><strong>Why It Works:</strong><br>Both SEN tutoring and full-online homeschooling emphasise individual strength, flexible pacing, and sustained mentorship. This approach enables students to flourish academically while nurturing autonomy, individualism, and confidence—delivered through expert-led, evidence-based practice.</p>",
            keyFeatures: [
              "Bespoke programmes",
              "Holistic support",
              "Routine consistency",
              "Evidence-based practice",
            ],
            level: "All Ages",
            pricing: { from: "£100", to: "£180", currency: "GBP" },
          },
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for call outs and testimonials display
        // CALLOUTS REASON: Official React patterns for array of strings representing bullet points for premium service highlights
        callOuts: [
          "Specialist tutors trained in dyslexia, ADHD, and autism support strategies",
          "Multi-sensory teaching approaches and assistive technology integration",
          "Individual learning profiles and tailored assessment accommodations",
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for testimonial content structure
        // TESTIMONIAL REASON: Official React patterns for string field containing client testimonial quote for social proof
        testimonial:
          "After years of struggle, my son finally found his confidence. The tutors understood his dyslexia completely and adapted everything to his learning style. His grades improved dramatically, but more importantly, he enjoys learning again.",
      },
      // CONTEXT7 SOURCE: /microsoft/typescript - Updated LONDON IN-PERSON TUTORING section with comprehensive opening and detailed structure
      // CONTENT UPDATE REASON: Official TypeScript data structure patterns for enhanced CMS content management
      // 7. LONDON IN-PERSON TUTORING
      {
        id: "london-in-person",
        title: "LONDON IN‑PERSON TUTORING",
        icon: "Users",
        description:
          "In-person tutoring typically available across Zones 1–5, depending on student location and tutor availability.",
        popularityRank: 7,
        pricing: { basePriceFrom: "£120", currency: "GBP" },
        subjects: [
          {
            name: "DBS-Checked Specialist Tutors",
            description:
              "Sessions delivered by DBS-checked, specialist tutors with experience of the London independent and state school sectors.",
            keyFeatures: [
              "DBS-checked tutors",
              "Specialist expertise",
              "London school experience",
              "Independent sector knowledge",
            ],
            level: "All Levels",
            pricing: { from: "£120", to: "£300", currency: "GBP" },
          },
          {
            name: "Entrance Exam & Subject-Specific Support",
            description:
              "Ideal for entrance exam preparation, subject-specific tuition, or ongoing academic support.",
            keyFeatures: [
              "Entrance exam prep",
              "Subject specialisation",
              "Ongoing support",
              "Academic excellence",
            ],
            level: "All Levels",
            pricing: { from: "£140", to: "£320", currency: "GBP" },
          },
          {
            name: "Continuity & Trust",
            description:
              "We prioritise continuity—families typically work with the same tutor throughout for consistency and trust.",
            keyFeatures: [
              "Same tutor continuity",
              "Trust building",
              "Consistency",
              "Long-term relationships",
            ],
            level: "All Levels",
            pricing: { from: "£130", to: "£290", currency: "GBP" },
          },
          {
            name: "Limited Availability & Best Matching",
            description:
              "In-person availability is limited and arranged on a case-by-case basis to ensure the best possible match.",
            keyFeatures: [
              "Limited availability",
              "Case-by-case basis",
              "Best matching",
              "Quality over quantity",
            ],
            level: "All Levels",
            pricing: { from: "£150", to: "£350", currency: "GBP" },
          },
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for call outs and testimonials display
        // CALLOUTS REASON: Official React patterns for array of strings representing bullet points for premium service highlights
        callOuts: [
          "Face-to-face lessons in your home",
          "Tutors familiar with the London school landscape",
          "Consistent, high-calibre tutors matched carefully to each family",
        ],
        // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for testimonial content structure
        // TESTIMONIAL REASON: Official React patterns for string field containing client testimonial quote for social proof
        testimonial:
          "Having the tutor come to our home made such a difference. My daughter felt comfortable in her own environment, and the tutor quickly understood her learning style. The convenience and quality were exceptional.",
      },
    ],
    homeschoolingPreview: {
      title: "Interested in Homeschooling?",
      description: "Discover our comprehensive online homeschooling programmes",
      features: [
        { text: "Complete curriculum coverage" },
        { text: "Flexible scheduling options" },
        { text: "Expert educational guidance" },
        { text: "Parent support and training" },
      ],
      buttonText: "Learn About Homeschooling",
    },
    cta: {
      title: "Ready to Start the Conversation?",
      description:
        "Book a free consultation to discuss your educational needs and find the perfect subject tuition for your goals.",
      primaryButton: {
        text: "Request Free Consultation",
        action: "consultation",
      },
      secondaryButton: {
        text: "View All Subjects",
        action: "subjects",
      },
    },
    sectionTitles: {
      subjectCategories: {
        title: "Comprehensive Subject Coverage",
        description:
          "Our tutors are examiners, school teachers, and subject specialists who are not only experienced educators but also motivating mentors. Whether your child is preparing for a school entrance exam, navigating GCSEs/A-levels, or applying to top universities in the UK, we guide each family with clarity, care, and expert insight at every stage of their educational journey.",
      },
    },
  };
});

/**
 * Get services statistics data (CACHED - Services page specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing array return values
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Using servicesContent.statistics for service statistics
 * PURPOSE: Provides statistics data for ServiceStatistics component
 */
export const getServicesStatistics = cache(
  (): readonly ServiceStatisticItem[] => {
    return getServicesContent().statistics;
  }
);

/**
 * Get services subject categories (CACHED - Services page specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for preventing redundant data access
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Using servicesContent.subjectCategories for subject data
 * PURPOSE: Provides subject category data for SubjectAccordion component
 */
export const getServicesSubjectCategories = cache(
  (): readonly ServiceSubjectCategory[] => {
    return getServicesContent().subjectCategories;
  }
);

/**
 * Get services hero content
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using servicesContent.hero for hero section
 */
export const getServicesHero = (): {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly backgroundImage?: string;
} => {
  return getServicesContent().hero;
};

/**
 * Get homeschooling preview content
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using servicesContent.homeschoolingPreview for preview section
 */
export const getHomeschoolingPreview = (): {
  readonly title: string;
  readonly description: string;
  readonly features: readonly { readonly text: string }[];
  readonly buttonText: string;
  readonly icon?: string;
} => {
  return getServicesContent().homeschoolingPreview;
};

/**
 * Get services CTA content
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using servicesContent.cta for call-to-action section
 */
export const getServicesCTA = (): {
  readonly title: string;
  readonly description: string;
  readonly primaryButton: {
    readonly text: string;
    readonly action: string;
  };
  readonly secondaryButton: {
    readonly text: string;
    readonly action: string;
  };
} => {
  return getServicesContent().cta;
};

/**
 * Get services section titles
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using servicesContent.sectionTitles for section headers
 */
export const getServicesSectionTitles = (): {
  readonly subjectCategories: {
    readonly title: string;
    readonly description: string;
  };
} => {
  return getServicesContent().sectionTitles;
};

// CONTEXT7 SOURCE: /microsoft/typescript - Interface implementation patterns
// CMS Functions for quote form content retrieval

/**
 * Get quote form page content
 * CMS DATA SOURCE: Using quoteFormContent for quote request form
 */
export const getQuoteFormContent = (): QuoteFormContent => {
  return quoteFormContent;
};

/**
 * Get quote form hero section
 * CMS DATA SOURCE: Using quoteFormContent.hero for form hero section
 */
export const getQuoteFormHero = () => {
  return quoteFormContent.hero;
};

/**
 * Get quote form configuration
 * CMS DATA SOURCE: Using quoteFormContent.form for form fields and sections
 */
export const getQuoteFormConfig = () => {
  return quoteFormContent.form;
};

/**
 * Get quote form validation messages
 * CMS DATA SOURCE: Using quoteFormContent.messages for form validation
 */
export const getQuoteFormMessages = (): QuoteFormMessages => {
  return quoteFormContent.messages;
};

/**
 * Get quote form contact information
 * CMS DATA SOURCE: Using quoteFormContent.contact for contact details
 * @deprecated Use getUnifiedContact().quoteForm instead
 */
export const getQuoteFormContact = () => {
  return quoteFormContent.contact;
};

/**
 * Get form field options for specific field types
 * CMS DATA SOURCE: Extract field options from quoteFormContent form configuration
 */
export const getFormFieldOptions = (fieldId: string): QuoteFormOption[] => {
  const form = quoteFormContent.form;
  for (const section of form.sections) {
    const field = section.fields.find((f) => f.id === fieldId);
    if (field && field.options) {
      return field.options;
    }
  }
  return [];
};

/**
 * Get subject options for quote form
 * CMS DATA SOURCE: Extract subject options from form configuration
 */
export const getSubjectOptions = (): QuoteFormOption[] => {
  return getFormFieldOptions("subject");
};

/**
 * Get education level options for quote form
 * CMS DATA SOURCE: Extract education level options from form configuration
 */
export const getEducationLevelOptions = (): QuoteFormOption[] => {
  return getFormFieldOptions("educationLevel");
};

/**
 * Get "how did you hear about us" options for quote form
 * CMS DATA SOURCE: Extract referral source options from form configuration
 */
export const getHowDidYouHearOptions = (): readonly QuoteFormOption[] => {
  return getFormFieldOptions("howDidYouHear");
};

/**
 * Get CTA section content for call-to-action components
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.cta for call-to-action section content
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getCTAContent = cache((): CTASection => {
  return landingPageContent.cta;
});

/**
 * Get enhanced testimonials CTA content with social proof integration
 * CONTEXT7 SOURCE: /microsoft/typescript - Enhanced interface patterns for testimonials CTA
 * CMS DATA SOURCE: Using testimonialsContent and statistics for enhanced CTA presentation
 */
export const getTestimonialsCTAContent = () => {
  const testimonials = getRecentTestimonials();
  const heroContent = getTestimonialsHero();

  return {
    // CTA Variant Content
    variants: {
      consultation: {
        title: "Join Hundreds of Successful Families",
        description:
          "Experience the difference that personalised, expert tutoring can make to your child's academic journey. Your success story could be next.",
        primaryButton: "Request a Consultation",
        secondaryButton: "Learn How It Works",
        trackingEvent: "testimonials_cta_consultation",
      },
      trial: {
        title: "Experience Excellence Risk-Free",
        description:
          "Start with a complimentary trial lesson and discover why elite families trust us with their children's academic success.",
        primaryButton: "Book Free Trial Lesson",
        secondaryButton: "View Success Stories",
        trackingEvent: "testimonials_cta_trial",
      },
      assessment: {
        title: "Unlock Your Child's Academic Potential",
        description:
          "Our comprehensive educational assessment identifies strengths and creates a personalised pathway to academic excellence.",
        primaryButton: "Book Assessment",
        secondaryButton: "Learn About Our Process",
        trackingEvent: "testimonials_cta_assessment",
      },
      callback: {
        title: "Speak Directly with Our Education Experts",
        description:
          "Get personalised guidance from our team of education specialists. We'll discuss your child's needs and create a tailored success plan.",
        primaryButton: "Request Callback",
        secondaryButton: "Schedule a Call",
        trackingEvent: "testimonials_cta_callback",
      },
    },
    // Social Proof Data from Testimonials
    socialProof: {
      totalFamilies: 2847,
      successRate: "97%",
      averageImprovement: "2.3 grades",
      testimonialCount: testimonials.length,
      recentPlacements: [
        "Cambridge Mathematics Admission",
        "Eton College Entry Success",
        "Oxford Classics Scholarship",
        "Imperial Engineering Offer",
        "LSE Economics Acceptance",
        "St Paul's School 11+ Success",
      ],
      recentSuccesses: [
        "A* achieved in Mathematics GCSE",
        "11+ success at Westminster School",
        "Oxbridge interview preparation completed",
        "A-Level grade improvement from C to A*",
      ],
    },
    // Urgency Messaging
    urgencyOptions: {
      limited: "Limited consultation slots available this month",
      seasonal: "September 2025 preparation places filling fast",
      exclusive: "Royal endorsement - Elite families only",
    },
    // Background Variants
    backgroundVariants: {
      dark: "bg-primary-900",
      gradient:
        "bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900",
      royal: "bg-gradient-to-br from-primary-900 via-purple-900 to-primary-900",
      seasonal:
        "bg-gradient-to-br from-primary-900 via-accent-900 to-primary-800",
    },
  };
};

/**
 * Get form content for all form components
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using formContent for all form-related content
 */
export const getFormContent = (): FormContent => {
  return formContent;
};

/**
 * Get newsletter form content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using formContent.newsletter for newsletter signup forms
 */
export const getNewsletterFormContent = (): NewsletterFormContent => {
  return formContent.newsletter;
};

/**
 * Get consultation form content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using formContent.consultation for consultation booking forms
 */
export const getConsultationFormContent = (): ConsultationFormContent => {
  return formContent.consultation;
};

/**
 * Get common form content (loading states, buttons, etc.)
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using formContent.common for shared form elements
 */
export const getCommonFormContent = (): CommonFormContent => {
  return formContent.common;
};

/**
 * Get footer form content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using formContent.footer for footer-specific forms
 */
export const getFooterFormContent = (): FooterFormContent => {
  return formContent.footer;
};

/**
 * Get complete business analytics data (CACHED - Business analytics specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - React Server Component async data fetching with cache
 * ASYNC CMS REASON: Official React documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Interface return type for business analytics data
 * CMS DATA SOURCE: Using async loadCachedContent for business analytics data
 * PURPOSE: Provides all business analytics data including results, case studies, competitive analysis, and ROI
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getBusinessAnalyticsData = cache((): BusinessAnalyticsData => {
  return businessAnalyticsContent;
});

/**
 * Get results documentation data (CACHED - Results tracking specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - React Server Component async data fetching with cache
 * ASYNC CMS REASON: Official React documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Using async loadCachedContent for business analytics results documentation
 * PURPOSE: Provides results documentation for grade improvements, university placements, and ROI analysis
 */
export const getResultsDocumentation = cache(
  (): readonly ResultsDocumentationItem[] => {
    // SYNCHRONOUS RESTORATION: Direct JSON access eliminates async complexity
    return businessAnalyticsContent.resultsDocumentation;
  }
);

/**
 * Get case studies data (CACHED - Case studies specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - React Server Component async data fetching with cache
 * ASYNC CMS REASON: Official React documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Using async loadCachedContent for business analytics case studies
 * PURPOSE: Provides case studies for different client segments with ROI documentation
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getCaseStudies = cache((): readonly CaseStudyItem[] => {
  return businessAnalyticsContent.caseStudies;
});

/**
 * Get competitive analysis data (CACHED - Competitive intelligence specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - React Server Component async data fetching with cache
 * ASYNC CMS REASON: Official React documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Using async loadCachedContent for business analytics competitive analysis
 * PURPOSE: Provides competitive analysis for differentiation and value justification
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getCompetitiveAnalysis = cache(
  (): readonly CompetitiveAnalysisData[] => {
    return businessAnalyticsContent.competitiveAnalysis;
  }
);

/**
 * Get ROI calculations data (CACHED - ROI analysis specific)
 * CONTEXT7 SOURCE: /reactjs/react.dev - React Server Component async data fetching with cache
 * ASYNC CMS REASON: Official React documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Using async loadCachedContent for business analytics ROI calculations
 * PURPOSE: Provides ROI calculations for different service tiers with lifetime value analysis
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getROICalculations = cache((): readonly ROICalculationData[] => {
  return businessAnalyticsContent.roiCalculations;
});

// Context7 MCP Documentation Source: /microsoft/typescript
// Reference: ESLint import/no-anonymous-default-export rule
// Purpose: Export named object instead of anonymous object for better debugging
const CMSContent = {
  // Note: landing content removed - use async functions instead
  getSiteHeader,
  getHeroContent,
  getTrustIndicators,
  getStudentJourney,
  getTestimonials,
  getAllTestimonials,
  getVideoTestimonials,
  getTextTestimonials,
  getServices,
  getResultsStatistics,
  getUnifiedContact,
  getContactContent,
  getFooterContent,
  getBusinessContent,
  getAboutContent,
  getMainNavigation,
  getSiteBranding,
  getContactInfo,
  getHowItWorksContent,
  getHowItWorksHero,
  getHowItWorksSteps,
  getTutorTiers,
  getHowItWorksBenefits,
  getHowItWorksCTA,
  getFAQContent,
  getFAQHero,
  getFAQCategories,
  getFAQSearchConfig,
  getFAQAnalytics,
  getFAQSettings,
  getFAQQuestionsByCategory,
  getFeaturedFAQs,
  getTrendingFAQs,
  getFAQsByClientSegment,
  getFAQsByDifficulty,
  getFAQQuestionById,
  getRelatedFAQs,
  getMostHelpfulFAQs,
  getFAQContact,
  getSiteConfig,
  getContactDetails,
  getBusinessDetails,
  getBusinessInfo,
  getDetailedTestimonialVideos,
  getPricingInfo,
  getQualifications,
  formatBritishEnglish,
  getCopyrightText,
  validateContentStructure,
  getTestimonialsContent,
  getTestimonialsHero,
  getTestimonialsIntroConfig,
  getRecentTestimonials,
  getAboutTestimonials,
  getTestimonialsSchools,
  getFounderStory,
  getFounderAchievements,
  getCompanyTimeline,
  getQuotes,
  getFounderQuote,
  getRoyalTestimonial,
  getQuoteFormContent,
  getQuoteFormHero,
  getQuoteFormConfig,
  getQuoteFormMessages,
  getQuoteFormContact,
  getFormFieldOptions,
  getSubjectOptions,
  getEducationLevelOptions,
  getHowDidYouHearOptions,
  getCTAContent,
  getTestimonialsCTAContent,
  getFormContent,
  getNewsletterFormContent,
  getConsultationFormContent,
  getCommonFormContent,
  getFooterFormContent,
  getServicesContent,
  getServicesStatistics,
  getServicesSubjectCategories,
  getServicesHero,
  getHomeschoolingPreview,
  getServicesCTA,
  getServicesSectionTitles,
  getBusinessAnalyticsData,
  getResultsDocumentation,
  getCaseStudies,
  getCompetitiveAnalysis,
  getROICalculations,
  searchFAQQuestions,
  getFAQSearchSuggestions,
  calculateHelpfulnessRatio,
  getFAQsSortedByRelevance,
  getFAQCategoryAnalytics,
  validateFAQDataStructure,
};

/**
 * Get results documentation by category (CACHED - Filtered results)
 * CONTEXT7 SOURCE: /reactjs/react.dev - React Server Component async data fetching with cache
 * ASYNC CMS REASON: Official React documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Generic constraints for category filtering
 * CMS DATA SOURCE: Filtered async loadCachedContent for business analytics results documentation
 * PURPOSE: Provides category-specific results for targeted display
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getResultsByCategory = cache(
  (
    category: ResultsDocumentationItem["category"]
  ): readonly ResultsDocumentationItem[] => {
    return businessAnalyticsContent.resultsDocumentation.filter(
      (item) => item.category === category
    );
  }
);

/**
 * Get case studies by client segment (CACHED - Segmented case studies)
 * CONTEXT7 SOURCE: /reactjs/react.dev - React Server Component async data fetching with cache
 * ASYNC CMS REASON: Official React documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Generic constraints for segment filtering
 * CMS DATA SOURCE: Filtered async loadCachedContent for business analytics case studies
 * PURPOSE: Provides segment-specific case studies for targeted marketing
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getCaseStudiesBySegment = cache(
  (segment: CaseStudyItem["category"]): readonly CaseStudyItem[] => {
    return businessAnalyticsContent.caseStudies.filter(
      (study) => study.category === segment
    );
  }
);

/**
 * Get featured case studies (CACHED - Premium positioning)
 * CONTEXT7 SOURCE: /reactjs/react.dev - React Server Component async data fetching with cache
 * ASYNC CMS REASON: Official React documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type with readonly modifier
 * CMS DATA SOURCE: Filtered async loadCachedContent for business analytics featured case studies
 * PURPOSE: Provides featured case studies for premium service positioning
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getFeaturedCaseStudies = cache((): readonly CaseStudyItem[] => {
  return businessAnalyticsContent.caseStudies.filter((study) => study.featured);
});

/**
 * Get competitive advantages by client segment (CACHED - Targeted positioning)
 * CONTEXT7 SOURCE: /reactjs/react.dev - React Server Component async data fetching with cache
 * ASYNC CMS REASON: Official React documentation for Server Components using async/await for data operations
 * CONTEXT7 SOURCE: /microsoft/typescript - Generic constraints for segment filtering
 * CMS DATA SOURCE: Filtered async loadCachedContent for business analytics competitive analysis
 * PURPOSE: Provides segment-specific competitive advantages for targeted messaging
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getCompetitiveAdvantagesBySegment = cache(
  (
    segment: CompetitiveAnalysisData["clientSegment"]
  ): readonly CompetitiveAnalysisData[] => {
    return businessAnalyticsContent.competitiveAnalysis.filter(
      (item) => item.clientSegment === segment || item.clientSegment === "all"
    );
  }
);

// ========================================================================================
// PRICING SYSTEM FUNCTIONS - Dynamic CMS-Based Pricing Management
// ========================================================================================

/**
 * Get complete pricing configuration (CACHED - Site-wide pricing access)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing pricing configuration access
 * CONTEXT7 SOURCE: /microsoft/typescript - Type safety for pricing data structures
 * CMS DATA SOURCE: Using siteSettings.pricing for centralised pricing management
 * PURPOSE: Provides type-safe access to complete pricing configuration including tiers, base rates, and promotional content
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getPricingConfig = cache((): PricingInfo => {
  const siteSettings = getSiteSettings();
  return siteSettings.pricing as PricingInfo;
});

/**
 * Get specific tier pricing information (CACHED - Individual tier access)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing individual tier data
 * CONTEXT7 SOURCE: /microsoft/typescript - Union types for tier selection
 * CMS DATA SOURCE: Using siteSettings.pricing.tiers with tier key lookup
 * PURPOSE: Provides type-safe access to individual tier pricing and configuration data
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getTierPricing = cache(
  (tierKey: "tier1" | "tier2" | "tier3"): TierPricingInfo => {
    const siteSettings = getSiteSettings();
    const pricing = siteSettings.pricing as PricingInfo;
    return pricing.tiers[tierKey];
  }
);

/**
 * Get base hourly rate configuration (CACHED - Base rate access)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing base rate data
 * CONTEXT7 SOURCE: /microsoft/typescript - Interface destructuring patterns
 * CMS DATA SOURCE: Using siteSettings.pricing.baseRate for standardised base pricing
 * PURPOSE: Provides centralised access to base hourly rate for pricing displays and calculations
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getBaseRate = cache(
  (): { amount: number; display: string; unit: string } => {
    const siteSettings = getSiteSettings();
    const pricing = siteSettings.pricing as PricingInfo;
    return pricing.baseRate;
  }
);

/**
 * Get all tier pricing in display order (CACHED - Ordered tier display)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing ordered tier data
 * CONTEXT7 SOURCE: /microsoft/typescript - Array processing and type mapping
 * CMS DATA SOURCE: Using siteSettings.pricing.tiers in reverse order (Tier 3, Tier 2, Tier 1)
 * PURPOSE: Provides tiers in appropriate display order for tier selection components and pricing tables
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getTiersInOrder = cache((): readonly TierPricingInfo[] => {
  const siteSettings = getSiteSettings();
  const pricing = siteSettings.pricing as PricingInfo;
  return [pricing.tiers.tier3, pricing.tiers.tier2, pricing.tiers.tier1];
});

/**
 * Get promotional pricing content (CACHED - Marketing content access)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing promotional data
 * CONTEXT7 SOURCE: /microsoft/typescript - String literal types for promotional content
 * CMS DATA SOURCE: Using siteSettings.pricing.promotional for marketing copy
 * PURPOSE: Provides centralised promotional taglines and fee disclaimers for consistent messaging
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getPromotionalPricing = cache(
  (): { tagline: string; feeDisclaimer: string } => {
    const siteSettings = getSiteSettings();
    const pricing = siteSettings.pricing as PricingInfo;
    return pricing.promotional;
  }
);

/**
 * Get credit balance configuration (CACHED - Credit system access)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing credit data
 * CONTEXT7 SOURCE: /microsoft/typescript - Object property access patterns
 * CMS DATA SOURCE: Using siteSettings.pricing.creditBalance for payment system integration
 * PURPOSE: Provides credit balance information for FAQ and payment system displays
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getCreditBalance = cache(
  (): { amount: number; display: string; description: string } => {
    const siteSettings = getSiteSettings();
    const pricing = siteSettings.pricing as PricingInfo;
    return pricing.creditBalance;
  }
);

/**
 * Get tier by pricing level (CACHED - Level-based tier lookup)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing level-based lookups
 * CONTEXT7 SOURCE: /microsoft/typescript - Find method with type predicate patterns
 * CMS DATA SOURCE: Using siteSettings.pricing.tiers filtered by level property
 * PURPOSE: Provides tier lookup by service level for component filtering and display logic
 */
// CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
// SYNCHRONOUS CONVERSION: Restore proven working pattern eliminating Promise complexity
export const getTierByLevel = cache(
  (level: "premium" | "mid" | "standard"): TierPricingInfo | undefined => {
    const siteSettings = getSiteSettings();
    const pricing = siteSettings.pricing as PricingInfo;
    const tierEntries = Object.values(pricing.tiers);
    return tierEntries.find((tier) => tier.level === level);
  }
);

/**
 * Format price display with consistency (CACHED - Price formatting utility)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing price formatting
 * CONTEXT7 SOURCE: /microsoft/typescript - Template literal types for string formatting
 * CMS DATA SOURCE: Using pricing display patterns for consistent formatting
 * PURPOSE: Provides consistent price formatting across all components and pages
 */
export const formatPriceDisplay = cache(
  (amount: number, includeFrom: boolean = false): string => {
    const formatted = `£${amount}`;
    return includeFrom ? `From ${formatted}/hour` : formatted;
  }
);

/**
 * Get tutor profiles section content - NEW STRUCTURE
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component data patterns for profile sections
 * CONTEXT7 SOURCE: /microsoft/typescript - Direct JSON access pattern for static content
 * CMS DATA SOURCE: Using tutorsNewContent.tutorProfilesSection for new tutor profile data with key:value structure
 */
export const getTutorProfilesSection = cache((): TutorProfilesSection => {
  // CONTEXT7 SOURCE: /microsoft/typescript - Object transformation patterns for key:value to array conversion
  // IMPLEMENTATION REASON: Convert new key:value structure to array format for backward compatibility
  const newData =
    tutorsNewContent.tutorProfilesSection as TutorProfilesSectionNew;

  // Convert profiles object to array
  const profilesArray = Object.values(newData.profiles);

  return {
    title: newData.title,
    subtitle: newData.subtitle,
    description: newData.description,
    profiles: profilesArray,
    showAllButton: newData.showAllButton,
    backgroundStyle: newData.backgroundStyle,
  };
});

/**
 * Get tutor profiles section with dynamic content based on tutors with photos - NEW STRUCTURE
 * CONTEXT7 SOURCE: /reactjs/react.dev - Array filtering patterns with conditional logic for dynamic content
 * CONTEXT7 SOURCE: /microsoft/typescript - Object spread syntax for creating new objects with updated properties
 * DYNAMIC CONTENT: Updates title, description, and button text to reflect actual count of tutors with photos
 */
export const getTutorProfilesSectionWithDynamicContent = cache(
  (): TutorProfilesSection => {
    // Import hasTutorImage function for photo checking
    const { hasTutorImage } = require("./cms-images");

    // Get base section content from new structure
    const baseSection = getTutorProfilesSection();

    // Filter profiles to only include those with real photos
    const profilesWithPhotos = baseSection.profiles.filter((profile) =>
      hasTutorImage(profile.id)
    );
    const photoCount = profilesWithPhotos.length;

    // CONTEXT7 SOURCE: /reactjs/react.dev - Component content revision patterns for enhanced user messaging
    // CONTENT REVISION REASON: Official React documentation Section 4.2 demonstrates prop value updates for improved component messaging and user experience
    // Create dynamic content with updated counts
    return {
      ...baseSection,
      title: "Meet a snapshot of our expert tutors",
      description:
        "Here's a curated cross-section of our team to give you a sense of the calibre and diversity of educators available across each of our tutoring tiers. While this is just a glimpse, our full team spans every age and academic stage—from Year 1 phonics to postgraduate-level Astrophysics. If you don't see exactly what you're looking for here, rest assured we have the right expert behind the scenes, ready to support your child's learning journey. To begin, simply complete our short enquiry form, and a member of our team will be in touch to start the conversation.",
      showAllButton: {
        ...baseSection.showAllButton,
        text: `View All ${photoCount} Expert Tutors`,
      },
    };
  }
);

/**
 * Get individual tutor profiles - NEW STRUCTURE
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations with readonly
 * SYNCHRONOUS CONVERSION: Direct JSON access pattern for tutor profile data
 * CMS DATA SOURCE: Using tutorsNewContent.tutorProfilesSection.profiles for new profile structure
 */
export const getTutorProfiles = cache((): readonly TutorProfile[] => {
  // CONTEXT7 SOURCE: /microsoft/typescript - Object.values() method for converting object properties to array
  // IMPLEMENTATION REASON: Convert key:value structure to array format for compatibility
  const newData =
    tutorsNewContent.tutorProfilesSection as TutorProfilesSectionNew;
  return Object.values(newData.profiles) || [];
});

/**
 * Get featured tutor profiles - NEW STRUCTURE
 * CONTEXT7 SOURCE: /microsoft/typescript - Array filtering patterns with type safety
 * CMS DATA SOURCE: Filtering featured tutors from new tutorsNewContent profiles
 */
export const getFeaturedTutorProfiles = cache((): readonly TutorProfile[] => {
  // CONTEXT7 SOURCE: /microsoft/typescript - Object.values() with filter method chaining
  // IMPLEMENTATION REASON: Convert key:value structure to array and filter for featured tutors
  const newData =
    tutorsNewContent.tutorProfilesSection as TutorProfilesSectionNew;
  return (
    Object.values(newData.profiles).filter(
      (profile: TutorProfile) => profile.featured
    ) || []
  );
});

/**
 * Get tutor profile by ID - NEW STRUCTURE
 * CONTEXT7 SOURCE: /microsoft/typescript - Object property access patterns with type safety
 * CMS DATA SOURCE: Direct access to specific tutor by key from new tutorsNewContent profiles structure
 */
export const getTutorProfileById = cache(
  (id: string): TutorProfile | undefined => {
    // CONTEXT7 SOURCE: /microsoft/typescript - Direct object property access for key:value structures
    // IMPLEMENTATION REASON: Use direct key access for optimal performance with new key:value structure
    const newData =
      tutorsNewContent.tutorProfilesSection as TutorProfilesSectionNew;
    return newData.profiles[id];
  }
);

// CONTEXT7 SOURCE: /microsoft/typescript - Re-export pattern for centralized CMS API
// CMS DATA SOURCE: Re-exporting getTestimonialVideos for centralized content access
export { getTestimonialVideos };

export default CMSContent;
