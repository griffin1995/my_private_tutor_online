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

// CONTEXT7 SOURCE: /reactjs/react.dev - React cache function for memoizing data requests
// CONTEXT7 SOURCE: /vercel/next.js - Server Components caching patterns for performance optimization
// PERFORMANCE OPTIMIZATION: React cache() implementation for top 10 most-used CMS functions
import { cache } from 'react'
import landingPageContent from '@/content/landing-page.json'
import businessContent from '@/content/business-content.json'
import aboutContent from '@/content/about.json'
import testimonialsContent from '@/content/testimonials.json'
import howItWorksContent from '@/content/how-it-works.json'
import faqContent from '@/content/faq.json'
import quoteFormContent from '@/content/quote-form.json'
import formContent from '@/content/form-content.json'
import siteSettings from '@/content/settings.json'

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for return type safety
// CONTEXT7 SOURCE: /microsoft/typescript - Generic type constraints for reusable components
// COMPREHENSIVE TYPE SYSTEM: Complete TypeScript interfaces for all CMS return types

// ========================================================================================
// CORE CONTENT TYPE DEFINITIONS - Comprehensive TypeScript Interfaces
// ========================================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Type export patterns for external consumption
// TYPE EXPORTS: All CMS interfaces available for external components and libraries
export type {
  BaseCMSContent,
  CMSResponse,
  NavigationItem,
  SiteHeader,
  HeroContent,
  TrustIndicator,
  TrustIndicatorsSection,
  StudentJourneyStep,
  StudentJourneySection,
  Testimonial,
  TestimonialsSection,
  ServiceFeature,
  Service,
  ServicesSection,
  Statistic,
  ResultsSection,
  FooterLink,
  FooterSection,
  FooterContent,
  HowItWorksStep,
  HowItWorksContent,
  TutorTier,
  TutorTiersSection,
  CTAButton,
  CTASection,
  NewsletterFormContent,
  ConsultationFormContent,
  CommonFormContent,
  FooterFormContent,
  FormContent,
  FAQQuestion,
  FAQCategory,
  FAQContent,
  ContactAddress,
  ContactDetails,
  ContactSection,
  SiteConfig,
  BusinessDetails,
  PricingInfo,
  QuoteFormField,
  QuoteFormOption,
  QuoteFormSection,
  QuoteFormMessages,
  QuoteFormContent,
  UnifiedContactData,
  AboutContent,
  TestimonialsContent,
  QuoteContent
}

/**
 * Base interface for all CMS content with common metadata
 * @template T - Content data type
 */
export interface BaseCMSContent<T = unknown> {
  readonly content: T
  readonly timestamp?: string
  readonly version?: string
}

/**
 * Generic CMS response wrapper for type-safe content access
 * @template T - The content type being returned
 */
export interface CMSResponse<T> {
  readonly data: T
  readonly success: boolean
  readonly error?: string
}

// Navigation and Header Types
export interface NavigationItem {
  readonly label: string
  readonly href: string
}

export interface SiteHeader {
  readonly siteName: string
  readonly logo: string
  readonly navigation: readonly NavigationItem[]
  readonly ctaButton?: {
    readonly text: string
    readonly href: string
  }
}

// Hero Section Types
export interface HeroContent {
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly image: string
  readonly imageAlt: string
  readonly ctaButtons: readonly {
    readonly text: string
    readonly href: string
    readonly variant: 'primary' | 'secondary'
  }[]
  readonly playButton?: {
    readonly enabled: boolean
    readonly videoUrl?: string
  }
}

// Trust and Credibility Types
export interface TrustIndicator {
  readonly icon: string
  readonly title: string
  readonly subtitle?: string
  readonly description: string
}

export interface TrustIndicatorsSection {
  readonly title: string
  readonly subtitle?: string
  readonly indicators: readonly TrustIndicator[]
}

// Student Journey and Process Types
export interface StudentJourneyStep {
  readonly step: string
  readonly title: string
  readonly icon: string
  readonly description: string
  readonly duration: string
}

export interface StudentJourneySection {
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly steps: readonly StudentJourneyStep[]
}

// Testimonial and Social Proof Types
export interface Testimonial {
  readonly quote: string
  readonly author: string
  readonly role: string
  readonly avatar: string
  readonly rating: number
  readonly verified?: boolean
  readonly date?: string
  readonly location?: string
}

export interface TestimonialsSection {
  readonly title: string
  readonly subtitle: string
  readonly testimonials: readonly Testimonial[]
  readonly showRatings?: boolean
}

// Service and Features Types
export interface ServiceFeature {
  readonly feature: string
}

export interface Service {
  readonly title: string
  readonly description: string
  readonly icon: string
  readonly features: readonly ServiceFeature[]
  readonly ctaText: string
  readonly ctaLink: string
  readonly price?: {
    readonly from: string
    readonly currency: string
  }
}

export interface ServicesSection {
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly services: readonly Service[]
}

// Statistics and Results Types
export interface Statistic {
  readonly number: string
  readonly label: string
  readonly description: string
  readonly icon: string
  readonly imageKey?: string
  readonly trend?: 'up' | 'down' | 'stable'
  readonly period?: string
}

export interface ResultsSection {
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly statistics: readonly Statistic[]
  readonly backgroundImage?: string
}

// Footer and Navigation Types
export interface FooterLink {
  readonly label: string
  readonly href: string
  readonly external?: boolean
}

export interface FooterSection {
  readonly title: string
  readonly links: readonly FooterLink[]
}

export interface FooterContent {
  readonly companyName: string
  readonly description: string
  readonly sections: readonly FooterSection[]
  readonly socialLinks?: readonly {
    readonly platform: string
    readonly url: string
    readonly icon: string
  }[]
  readonly copyright?: string
  readonly legalLinks?: readonly FooterLink[]
}

// How It Works and Process Types
export interface HowItWorksStep {
  readonly number: string
  readonly title: string
  readonly description: string
  readonly features: readonly string[]
  readonly icon: string
}

export interface HowItWorksContent {
  readonly hero: {
    readonly title: string
    readonly subtitle: string
    readonly description: string
    readonly backgroundImage?: string
  }
  readonly steps: readonly HowItWorksStep[]
  readonly benefits: readonly string[]
  readonly cta: {
    readonly title: string
    readonly description: string
    readonly button: {
      readonly text: string
      readonly href: string
    }
  }
}

// Tutor and Teaching Types
export interface TutorTier {
  readonly tier: string
  readonly description: string
  readonly bestFor: string
  readonly pricePoint: string
  readonly qualifications?: readonly string[]
  readonly experience?: string
}

export interface TutorTiersSection {
  readonly title: string
  readonly subtitle: string
  readonly tiers: readonly TutorTier[]
}

// Call-to-Action Types
export interface CTAButton {
  readonly text: string
  readonly type: 'primary' | 'secondary' | 'outline'
  readonly href: string
  readonly external?: boolean
  readonly trackingId?: string
}

export interface CTASection {
  readonly title: string
  readonly brandStatement: string
  readonly description: string
  readonly primaryButtonText: string
  readonly secondaryButtonText: string
  readonly siteName: string
  readonly showVideo?: boolean
  readonly videoHeight?: string
  readonly backgroundColor?: string
}

// Form Content Types
export interface NewsletterFormContent {
  readonly title: string
  readonly description: string
  readonly successMessage: string
  readonly buttonText: string
  readonly fields: {
    readonly firstName: {
      readonly label: string
      readonly placeholder: string
    }
    readonly email: {
      readonly label: string
      readonly placeholder: string
    }
  }
}

export interface ConsultationFormContent {
  readonly fields: {
    readonly parentName: {
      readonly placeholder: string
    }
    readonly studentName: {
      readonly placeholder: string
    }
    readonly academicLevel: {
      readonly selectValue: string
    }
    readonly timescale: {
      readonly selectValue: string
    }
    readonly requirements: {
      readonly placeholder: string
    }
    readonly contactMethod: {
      readonly selectValue: string
    }
    readonly serviceLevel: {
      readonly selectValue: string
    }
  }
  readonly ariaLabels: {
    readonly academicLevel: string
    readonly timescale: string
    readonly contactMethod: string
    readonly serviceLevel: string
  }
}

export interface CommonFormContent {
  readonly loadingText: string
  readonly submitText: string
  readonly processingText: string
  readonly successText: string
  readonly errorText: string
}

export interface FooterFormContent {
  readonly newsletter: {
    readonly placeholder: string
  }
}

export interface FormContent {
  readonly newsletter: NewsletterFormContent
  readonly consultation: ConsultationFormContent
  readonly common: CommonFormContent
  readonly footer: FooterFormContent
}

// FAQ and Help Types
export interface FAQQuestion {
  readonly question: string
  readonly answer: string
  readonly tags?: readonly string[]
  readonly priority?: number
}

export interface FAQCategory {
  readonly title: string
  readonly icon: string
  readonly questions: readonly FAQQuestion[]
  readonly description?: string
}

export interface FAQContent {
  readonly hero: {
    readonly title: string
    readonly subtitle: string
    readonly description: string
  }
  readonly categories: readonly FAQCategory[]
  readonly contact: {
    readonly title: string
    readonly description: string
    readonly phone?: string
    readonly email?: string
  }
}

// Contact and Address Types
export interface ContactAddress {
  readonly line1: string
  readonly line2: string
  readonly city: string
  readonly postcode: string
  readonly country: string
}

export interface ContactDetails {
  readonly primaryEmail: string
  readonly phone: string
  readonly address: ContactAddress
  readonly alternativeEmail?: string
  readonly whatsapp?: string
  readonly businessHours?: {
    readonly weekdays: string
    readonly weekends?: string
    readonly timezone: string
  }
}

export interface ContactSection {
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly contactInfo: ContactDetails
  readonly socialLinks?: readonly {
    readonly platform: string
    readonly url: string
    readonly icon: string
  }[]
}

// Site Configuration Types
export interface SiteConfig {
  readonly name: string
  readonly tagline: string
  readonly domain: string
  readonly foundedYear: string
  readonly heritage: string
  readonly description?: string
  readonly keywords?: readonly string[]
  readonly locale?: string
  readonly timezone?: string
}

export interface BusinessDetails {
  readonly registrationNumber?: string
  readonly vatNumber?: string
  readonly insuranceDetails?: {
    readonly provider: string
    readonly policyNumber: string
    readonly expiryDate: string
  }
  readonly qualifications: readonly {
    readonly title: string
    readonly institution: string
    readonly year: string
    readonly verified: boolean
  }[]
}

export interface PricingInfo {
  readonly currency: string
  readonly vatIncluded: boolean
  readonly tiers: readonly {
    readonly name: string
    readonly hourlyRate: {
      readonly from: number
      readonly to?: number
    }
    readonly description: string
    readonly includes: readonly string[]
  }[]
  readonly discounts?: readonly {
    readonly type: string
    readonly percentage: number
    readonly description: string
  }[]
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for form configuration
// CONTEXT7 SOURCE: /microsoft/typescript - Union types and generic constraints for form handling
// Quote Form and Configuration Types
export interface QuoteFormField {
  readonly id: string
  readonly label: string
  readonly placeholder: string
  readonly type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  readonly required: boolean
  readonly validation?: {
    readonly message: string
    readonly pattern?: string
    readonly minLength?: number
    readonly maxLength?: number
  }
  readonly options?: readonly QuoteFormOption[]
  readonly conditional?: {
    readonly dependsOn: string
    readonly showWhen: string | readonly string[]
  }
}

export interface QuoteFormOption {
  readonly value: string
  readonly label: string
  readonly description?: string
}

export interface QuoteFormSection {
  readonly title: string
  readonly description: string
  readonly fields: readonly QuoteFormField[]
  readonly order: number
}

export interface QuoteFormMessages {
  readonly success: {
    readonly title: string
    readonly message: string
  }
  readonly error: {
    readonly title: string
    readonly message: string
  }
  readonly validation: {
    readonly required: string
    readonly email: string
    readonly phone: string
    readonly minLength: string
    readonly maxLength: string
  }
}

export interface QuoteFormContent {
  readonly hero: {
    readonly title: string
    readonly subtitle: string
    readonly description: string
    readonly backgroundImage?: string
  }
  readonly form: {
    readonly title: string
    readonly description: string
    readonly sections: readonly QuoteFormSection[]
    readonly submitButton: {
      readonly text: string
      readonly loadingText: string
    }
    readonly privacyNotice?: string
  }
  readonly messages: QuoteFormMessages
  readonly contact: {
    readonly title: string
    readonly description: string
    readonly phone: string
    readonly email: string
  }
}

// CMS Functions for content retrieval

/**
 * Get site header content including navigation (CACHED - #6 most used: 4 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() prevents redundant function calls
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.header for site header
 */
export const getSiteHeader = cache((): SiteHeader => {
  return landingPageContent.header
})

/**
 * Get hero section content (CACHED - #9 most used: 4 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for automatic result caching
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.hero for hero section
 */
export const getHeroContent = cache((): HeroContent => {
  return landingPageContent.hero
})

/**
 * Get trust indicators for credibility section (CACHED - #3 most used: 6 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() memoizes return values for same inputs
 * CMS DATA SOURCE: Using landingPageContent.trustIndicators for social proof
 */
export const getTrustIndicators = cache((): TrustIndicator[] => {
  return landingPageContent.trustIndicators.indicators
})

/**
 * Get student journey steps for process explanation
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.studentJourney for process steps
 */
export const getStudentJourney = (): StudentJourneySection => {
  return landingPageContent.studentJourney
}

/**
 * Get testimonials for social proof (CACHED - #1 most used: 13 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for memoizing function results across component renders
 * CMS DATA SOURCE: Using landingPageContent.testimonials for customer testimonials
 */
export const getTestimonials = cache((): Testimonial[] => {
  return landingPageContent.testimonials.testimonials
})

/**
 * Get services offered by the tutoring company
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations
 * CMS DATA SOURCE: Using landingPageContent.services for service listings
 */
export const getServices = (): readonly Service[] => {
  return landingPageContent.services.services
}

/**
 * Get who we support information
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.whoWeSupport for support areas
 */
export const getWhoWeSupport = (): {
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly categories: readonly {
    readonly title: string
    readonly description: string
    readonly icon: string
    readonly imageKey: string
  }[]
} => {
  return landingPageContent.whoWeSupport
}

/**
 * Get academic results statistics (CACHED - honorable mention: 3 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() avoids redundant computations
 * CMS DATA SOURCE: Using landingPageContent.results for performance metrics
 */
export const getResultsStatistics = cache((): Statistic[] => {
  return landingPageContent.results.statistics
})

// CONTEXT7 SOURCE: /microsoft/typescript - Interface implementation patterns for data consolidation
// CONTEXT7 SOURCE: /microsoft/typescript - Generic type constraints for unified data access
// Unified Data Access Types
export interface UnifiedContactData {
  readonly primary: ContactDetails // Settings contact data (phone, email, address)
  readonly landing: ContactSection // Landing page contact section
  readonly landingInfo: ContactDetails // Subset contact info
  readonly faq: {
    readonly title: string
    readonly description: string
    readonly phone?: string
    readonly email?: string
  } // FAQ contact section  
  readonly quoteForm: {
    readonly title: string
    readonly description: string
    readonly phone: string
    readonly email: string
  } // Quote form contact
}

// Content Page Types
export interface AboutContent {
  readonly hero: {
    readonly title: string
    readonly subtitle: string
    readonly description: string
    readonly image?: string
    readonly imageAlt?: string
  }
  readonly ourEthos: {
    readonly title: string
    readonly subtitle: string
    readonly description: string
    readonly mainContent: {
      readonly introduction: string
      readonly philosophy: string
    }
    readonly sections: readonly {
      readonly title: string
      readonly content: string
    }[]
    readonly results: {
      readonly title: string
      readonly statistics: readonly Statistic[]
    }
    readonly conclusion: string
  }
  readonly story: {
    readonly title: string
    readonly sections: readonly {
      readonly title: string
      readonly content: string
      readonly image?: string
    }[]
  }
  readonly team: {
    readonly title: string
    readonly description: string
    readonly members: readonly {
      readonly name: string
      readonly role: string
      readonly bio: string
      readonly image: string
      readonly qualifications?: readonly string[]
    }[]
  }
}

export interface TestimonialsContent {
  readonly hero: {
    readonly title: string
    readonly subtitle: string
    readonly description: string
  }
  readonly mainContent: {
    readonly intro: string
    readonly callToAction: string
  }
  readonly recentTestimonials: readonly Testimonial[]
  readonly schools?: readonly {
    readonly name: string
    readonly logo: string
    readonly testimonialCount: number
  }[]
}

// Quote and Brand Statement Types
export interface QuoteContent {
  readonly founderQuote: {
    readonly quote: string
    readonly author: string
    readonly role: string
    readonly image: string
    readonly signature?: string
  }
  readonly royalTestimonial: {
    readonly quote: string
    readonly author: string
    readonly title: string
    readonly crest?: string
    readonly verified: boolean
  }
}

/**
 * Get unified contact data from all sources (CACHED - #5 most used: 5 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for expensive computation memoization
 * CONTEXT7 SOURCE: /microsoft/typescript - Centralized data access with TypeScript interfaces
 * CMS DATA SOURCE: Consolidates contact data from settings, landing-page, faq, and quote-form
 * REPLACES: getContactContent, getContactInfo, getContactDetails, getFAQContact, getQuoteFormContact
 */
export const getUnifiedContact = cache((): UnifiedContactData => {
  return {
    primary: siteSettings.contact,
    landing: landingPageContent.contact,
    landingInfo: landingPageContent.contact.contactInfo,
    faq: faqContent.contact,
    quoteForm: quoteFormContent.contact
  }
})

/**
 * Get contact section content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.contact for contact information
 * @deprecated Use getUnifiedContact().landing instead
 */
export const getContactContent = (): ContactSection => {
  return landingPageContent.contact
}

/**
 * Get footer content including links and company information (CACHED - #10 most used: 4 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() eliminates duplicate work for same data
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for cached functions
 * CMS DATA SOURCE: Using landingPageContent.footer for site footer
 */
export const getFooterContent = cache((): FooterContent => {
  return landingPageContent.footer
})

/**
 * Get business content for about/company pages
 * CONTEXT7 SOURCE: /microsoft/typescript - Error handling with explicit return types
 * CMS DATA SOURCE: Using businessContent for company information
 */
export const getBusinessContent = (): {
  readonly companyName: string
  readonly founded: string
  readonly heritage: string
  readonly [key: string]: unknown
} => {
  try {
    return businessContent
  } catch (error) {
    // Business content fallback used
    return {
      companyName: 'My Private Tutor Online',
      founded: '2010',
      heritage: '15 years of educational excellence'
    }
  }
}

/**
 * Get about page content
 * CONTEXT7 SOURCE: /microsoft/typescript - Error handling with comprehensive return types
 * CMS DATA SOURCE: Using aboutContent for about page information
 */
export const getAboutContent = (): AboutContent => {
  try {
    return aboutContent
  } catch (error) {
    // About content fallback used
    return {
      hero: {
        title: 'About My Private Tutor Online',
        subtitle: 'Excellence in private tutoring since 2010',
        description: 'Professional tutoring services with personalised approach',
        image: '/images/placeholder.svg',
        imageAlt: 'About My Private Tutor Online'
      },
      ourEthos: {
        title: 'Our Ethos',
        subtitle: 'Excellence in Education',
        description: 'Personalised tutoring approach',
        mainContent: {
          introduction: 'We provide exceptional tutoring services',
          philosophy: 'Every student deserves personalised attention'
        },
        sections: [],
        results: {
          title: 'Our Results',
          statistics: []
        },
        conclusion: 'Excellence in private tutoring since 2010'
      },
      story: {
        title: 'Our Story',
        sections: []
      },
      team: {
        title: 'Our Team',
        description: 'Meet our expert educators',
        members: []
      }
    }
  }
}

// Utility functions for content manipulation

/**
 * Get navigation items for main menu (CACHED - honorable mention: 3 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() memoizes function return values
 * CMS DATA SOURCE: Using landingPageContent.header.navigation for main navigation
 */
export const getMainNavigation = cache((): NavigationItem[] => {
  return landingPageContent.header.navigation
})

/**
 * Get site branding information (CACHED - #7 most used: 4 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() stores computation results in cache
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using landingPageContent.header for branding
 */
export const getSiteBranding = cache((): {
  readonly siteName: string
  readonly logo: string
  readonly companyName: string
  readonly description: string
} => {
  return {
    siteName: landingPageContent.header.siteName,
    logo: landingPageContent.header.logo,
    companyName: landingPageContent.footer.companyName,
    description: landingPageContent.footer.description
  }
})

/**
 * Get contact information across the site
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for deprecated functions
 * CMS DATA SOURCE: Using landingPageContent.contact.contactInfo for contact details
 * @deprecated Use getUnifiedContact().landingInfo instead
 */
export const getContactInfo = (): ContactDetails => {
  return landingPageContent.contact.contactInfo
}

/**
 * Get How It Works page content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using howItWorksContent for how it works page information
 */
export const getHowItWorksContent = (): HowItWorksContent => {
  return howItWorksContent
}

/**
 * Get How It Works hero section
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using howItWorksContent.hero for hero section
 */
export const getHowItWorksHero = (): {
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly backgroundImage?: string
} => {
  return howItWorksContent.hero
}

/**
 * Get How It Works process steps
 * CMS DATA SOURCE: Using howItWorksContent.steps for process steps
 */
export const getHowItWorksSteps = (): HowItWorksStep[] => {
  return howItWorksContent.steps
}

/**
 * Get tutor tier information
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations with readonly
 * CMS DATA SOURCE: Using howItWorksContent.tutorTiers for tutor tier details
 */
export const getTutorTiers = (): readonly TutorTier[] => {
  return howItWorksContent.tutorTiers
}

/**
 * Get How It Works benefits
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations with readonly
 * CMS DATA SOURCE: Using howItWorksContent.benefits for service benefits
 */
export const getHowItWorksBenefits = (): readonly string[] => {
  return howItWorksContent.benefits
}

/**
 * Get How It Works CTA section
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using howItWorksContent.cta for call to action
 */
export const getHowItWorksCTA = (): {
  readonly title: string
  readonly description: string
  readonly button: {
    readonly text: string
    readonly href: string
  }
} => {
  return howItWorksContent.cta
}

/**
 * Get FAQ page content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using faqContent for FAQ page information
 */
export const getFAQContent = (): FAQContent => {
  return faqContent
}

/**
 * Get FAQ hero section
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using faqContent.hero for hero section
 */
export const getFAQHero = (): {
  readonly title: string
  readonly subtitle: string
  readonly description: string
} => {
  return faqContent.hero
}

/**
 * Get FAQ categories and questions
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations with readonly
 * CMS DATA SOURCE: Using faqContent.categories for FAQ categories
 */
export const getFAQCategories = (): readonly FAQCategory[] => {
  return faqContent.categories
}

/**
 * Get FAQ contact section
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type for deprecated functions
 * CMS DATA SOURCE: Using faqContent.contact for contact CTA
 * @deprecated Use getUnifiedContact().faq instead
 */
export const getFAQContact = (): {
  readonly title: string
  readonly description: string
  readonly phone?: string
  readonly email?: string
} => {
  return faqContent.contact
}

/**
 * Get site configuration settings
 * CMS DATA SOURCE: Using siteSettings.siteConfig for site configuration
 */
export const getSiteConfig = (): SiteConfig => {
  return siteSettings.siteConfig
}

/**
 * Get contact details from settings
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type for interface conformance
 * CMS DATA SOURCE: Using siteSettings.contact for contact information
 * @deprecated Use getUnifiedContact().primary instead
 */
export const getContactDetails = (): ContactDetails => {
  return siteSettings.contact
}

/**
 * Get business details and qualifications
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using siteSettings for business information
 */
export const getBusinessDetails = (): BusinessDetails => {
  return siteSettings.businessDetails
}

/**
 * Get pricing information
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using siteSettings.pricing for pricing details
 */
export const getPricingInfo = (): PricingInfo => {
  return siteSettings.pricing
}

/**
 * Get qualifications and success rates
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using siteSettings.qualifications for credentials
 */
export const getQualifications = (): {
  readonly [key: string]: unknown
} => {
  return siteSettings.qualifications
}

// British English content formatting utilities

/**
 * Format text to use British English spellings
 */
export const formatBritishEnglish = (text: string): string => {
  return text
    .replace(/\borganiz/g, 'organis')
    .replace(/\bcolor/g, 'colour')
    .replace(/\bcenter/g, 'centre')
    .replace(/\bfavorite/g, 'favourite')
    .replace(/\blicense/g, 'licence')
}

/**
 * Get formatted copyright text with current year
 * Uses consistent year during SSR to prevent hydration issues
 */
export const getCopyrightText = (): string => {
  // Always use 2025 for consistency during SSR/SSG builds
  const currentYear = 2025
  return `© ${currentYear} My Private Tutor Online. All rights reserved.`
}

// Content validation utilities

/**
 * Validate that required content fields are present
 * CONTEXT7 SOURCE: /microsoft/typescript - Function return type annotations for validation
 * @returns boolean indicating if all required fields are present
 */
export const validateContentStructure = (): boolean => {
  const requiredFields: readonly string[] = [
    'header.siteName',
    'hero.title',
    'services.services',
    'contact.contactInfo'
  ]
  
  const missingFields: string[] = []
  
  requiredFields.forEach(field => {
    const keys = field.split('.')
    let current: Record<string, unknown> = landingPageContent as Record<string, unknown>
    
    for (const key of keys) {
      if (!current || !current[key]) {
        missingFields.push(field)
        break
      }
      current = current[key] as Record<string, unknown>
    }
  })
  
  if (missingFields.length > 0) {
    // Missing required content fields detected
    return false
  }
  
  return true
}

/**
 * Get testimonials page content
 * CONTEXT7 SOURCE: /microsoft/typescript - Error handling with comprehensive return types
 * CMS DATA SOURCE: Using testimonialsContent for testimonials page
 */
export const getTestimonialsContent = (): TestimonialsContent => {
  try {
    return testimonialsContent
  } catch (error) {
    // Testimonials content fallback used
    return {
      hero: {
        title: 'Testimonials',
        subtitle: 'What families say about us',
        description: 'Read about our families\' experiences'
      },
      mainContent: {
        intro: '',
        callToAction: ''
      },
      recentTestimonials: []
    }
  }
}

/**
 * Get testimonials page hero content
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using testimonialsContent.hero for testimonials hero
 */
export const getTestimonialsHero = (): {
  readonly title: string
  readonly subtitle: string
  readonly description: string
} => {
  return testimonialsContent.hero
}

/**
 * Get quotes for quote sections throughout the site
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.quotes for quote components
 */
export const getQuotes = (): QuoteContent => {
  return landingPageContent.quotes
}

/**
 * Get founder quote for Elizabeth Burrows testimonial section
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using landingPageContent.quotes.founderQuote
 */
export const getFounderQuote = (): {
  readonly quote: string
  readonly author: string
  readonly role: string
  readonly image: string
  readonly signature?: string
} => {
  return landingPageContent.quotes.founderQuote
}

/**
 * Get royal testimonial for premium service showcase
 * CONTEXT7 SOURCE: /microsoft/typescript - Object literal return type annotations
 * CMS DATA SOURCE: Using landingPageContent.quotes.royalTestimonial
 */
export const getRoyalTestimonial = (): {
  readonly quote: string
  readonly author: string
  readonly title: string
  readonly crest?: string
  readonly verified: boolean
} => {
  return landingPageContent.quotes.royalTestimonial
}

/**
 * Get recent testimonials for display
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations with readonly
 * CMS DATA SOURCE: Using testimonialsContent.recentTestimonials for testimonials
 */
export const getRecentTestimonials = (): readonly Testimonial[] => {
  return testimonialsContent.recentTestimonials
}

/**
 * Get schools list for testimonials page (CACHED - #2 most used: 7 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() for preventing redundant data access
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations for cached functions
 * CMS DATA SOURCE: Using testimonialsContent.schools for school shields
 */
export const getTestimonialsSchools = cache((): readonly {
  readonly name: string
  readonly logo: string
  readonly testimonialCount: number
}[] => {
  return testimonialsContent.schools
})

// CONTEXT7 SOURCE: /microsoft/typescript - Interface implementation patterns
// CMS Functions for quote form content retrieval

/**
 * Get quote form page content
 * CMS DATA SOURCE: Using quoteFormContent for quote request form
 */
export const getQuoteFormContent = (): QuoteFormContent => {
  return quoteFormContent
}

/**
 * Get quote form hero section
 * CMS DATA SOURCE: Using quoteFormContent.hero for form hero section
 */
export const getQuoteFormHero = () => {
  return quoteFormContent.hero
}

/**
 * Get quote form configuration
 * CMS DATA SOURCE: Using quoteFormContent.form for form fields and sections
 */
export const getQuoteFormConfig = () => {
  return quoteFormContent.form
}

/**
 * Get quote form validation messages
 * CMS DATA SOURCE: Using quoteFormContent.messages for form validation
 */
export const getQuoteFormMessages = (): QuoteFormMessages => {
  return quoteFormContent.messages
}

/**
 * Get quote form contact information
 * CMS DATA SOURCE: Using quoteFormContent.contact for contact details
 * @deprecated Use getUnifiedContact().quoteForm instead
 */
export const getQuoteFormContact = () => {
  return quoteFormContent.contact
}

/**
 * Get form field options for specific field types
 * CMS DATA SOURCE: Extract field options from quoteFormContent form configuration
 */
export const getFormFieldOptions = (fieldId: string): QuoteFormOption[] => {
  const form = quoteFormContent.form
  for (const section of form.sections) {
    const field = section.fields.find(f => f.id === fieldId)
    if (field && field.options) {
      return field.options
    }
  }
  return []
}

/**
 * Get subject options for quote form
 * CMS DATA SOURCE: Extract subject options from form configuration
 */
export const getSubjectOptions = (): QuoteFormOption[] => {
  return getFormFieldOptions('subject')
}

/**
 * Get education level options for quote form
 * CMS DATA SOURCE: Extract education level options from form configuration
 */
export const getEducationLevelOptions = (): QuoteFormOption[] => {
  return getFormFieldOptions('educationLevel')
}

/**
 * Get "how did you hear about us" options for quote form
 * CMS DATA SOURCE: Extract referral source options from form configuration
 */
export const getHowDidYouHearOptions = (): readonly QuoteFormOption[] => {
  return getFormFieldOptions('howDidYouHear')
}

/**
 * Get CTA section content for call-to-action components
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using landingPageContent.cta for call-to-action section content
 */
export const getCTAContent = (): CTASection => {
  return landingPageContent.cta
}

/**
 * Get form content for all form components
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using formContent for all form-related content
 */
export const getFormContent = (): FormContent => {
  return formContent
}

/**
 * Get newsletter form content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using formContent.newsletter for newsletter signup forms
 */
export const getNewsletterFormContent = (): NewsletterFormContent => {
  return formContent.newsletter
}

/**
 * Get consultation form content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using formContent.consultation for consultation booking forms
 */
export const getConsultationFormContent = (): ConsultationFormContent => {
  return formContent.consultation
}

/**
 * Get common form content (loading states, buttons, etc.)
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using formContent.common for shared form elements
 */
export const getCommonFormContent = (): CommonFormContent => {
  return formContent.common
}

/**
 * Get footer form content
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using formContent.footer for footer-specific forms
 */
export const getFooterFormContent = (): FooterFormContent => {
  return formContent.footer
}

// Context7 MCP Documentation Source: /microsoft/typescript
// Reference: ESLint import/no-anonymous-default-export rule
// Purpose: Export named object instead of anonymous object for better debugging
const CMSContent = {
  landing: landingPageContent,
  getSiteHeader,
  getHeroContent,
  getTrustIndicators,
  getStudentJourney,
  getTestimonials,
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
  getFAQContact,
  getSiteConfig,
  getContactDetails,
  getBusinessDetails,
  getPricingInfo,
  getQualifications,
  formatBritishEnglish,
  getCopyrightText,
  validateContentStructure,
  getTestimonialsContent,
  getTestimonialsHero,
  getRecentTestimonials,
  getTestimonialsSchools,
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
  getFormContent,
  getNewsletterFormContent,
  getConsultationFormContent,
  getCommonFormContent,
  getFooterFormContent
}

export default CMSContent