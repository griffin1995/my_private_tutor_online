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

import landingPageContent from '@/content/landing-page.json'
import businessContent from '@/content/business-content.json'
import aboutContent from '@/content/about.json'
import testimonialsContent from '@/content/testimonials.json'
import howItWorksContent from '@/content/how-it-works.json'
import faqContent from '@/content/faq.json'
import siteSettings from '@/content/settings.json'

// TypeScript interfaces for content structure
export interface NavigationItem {
  label: string
  href: string
}

export interface TrustIndicator {
  icon: string
  title: string
  subtitle?: string
  description: string
}

export interface StudentJourneyStep {
  step: string
  title: string
  icon: string
  description: string
  duration: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  avatar: string
  rating: number
}

export interface ServiceFeature {
  feature: string
}

export interface Service {
  title: string
  description: string
  icon: string
  features: ServiceFeature[]
  ctaText: string
  ctaLink: string
}

export interface Statistic {
  number: string
  label: string
  description: string
  icon: string
  imageKey?: string
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface HowItWorksStep {
  number: string
  title: string
  description: string
  features: string[]
  icon: string
}

export interface TutorTier {
  tier: string
  description: string
  bestFor: string
  pricePoint: string
}

export interface CTAButton {
  text: string
  type: string
  href: string
}

export interface FAQQuestion {
  question: string
  answer: string
}

export interface FAQCategory {
  title: string
  icon: string
  questions: FAQQuestion[]
}

export interface ContactDetails {
  primaryEmail: string
  phone: string
  address: {
    line1: string
    line2: string
    city: string
    postcode: string
    country: string
  }
}

export interface SiteConfig {
  name: string
  tagline: string
  domain: string
  foundedYear: string
  heritage: string
}

// CMS Functions for content retrieval

/**
 * Get site header content including navigation
 * CMS DATA SOURCE: Using landingPageContent.header for site header
 */
export const getSiteHeader = () => {
  return landingPageContent.header
}

/**
 * Get hero section content
 * CMS DATA SOURCE: Using landingPageContent.hero for hero section
 */
export const getHeroContent = () => {
  return landingPageContent.hero
}

/**
 * Get trust indicators for credibility section
 * CMS DATA SOURCE: Using landingPageContent.trustIndicators for social proof
 */
export const getTrustIndicators = (): TrustIndicator[] => {
  return landingPageContent.trustIndicators.indicators
}

/**
 * Get student journey steps for process explanation
 * CMS DATA SOURCE: Using landingPageContent.studentJourney for process steps
 */
export const getStudentJourney = () => {
  return landingPageContent.studentJourney
}

/**
 * Get testimonials for social proof
 * CMS DATA SOURCE: Using landingPageContent.testimonials for customer testimonials
 */
export const getTestimonials = (): Testimonial[] => {
  return landingPageContent.testimonials.testimonials
}

/**
 * Get services offered by the tutoring company
 * CMS DATA SOURCE: Using landingPageContent.services for service listings
 */
export const getServices = (): Service[] => {
  return landingPageContent.services.services
}

/**
 * Get who we support information
 * CMS DATA SOURCE: Using landingPageContent.whoWeSupport for support areas
 */
export const getWhoWeSupport = () => {
  return landingPageContent.whoWeSupport
}

/**
 * Get academic results statistics
 * CMS DATA SOURCE: Using landingPageContent.results for performance metrics
 */
export const getResultsStatistics = (): Statistic[] => {
  return landingPageContent.results.statistics
}

/**
 * Get contact section content
 * CMS DATA SOURCE: Using landingPageContent.contact for contact information
 */
export const getContactContent = () => {
  return landingPageContent.contact
}

/**
 * Get footer content including links and company information
 * CMS DATA SOURCE: Using landingPageContent.footer for site footer
 */
export const getFooterContent = () => {
  return landingPageContent.footer
}

/**
 * Get business content for about/company pages
 * CMS DATA SOURCE: Using businessContent for company information
 */
export const getBusinessContent = () => {
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
 * CMS DATA SOURCE: Using aboutContent for about page information
 */
export const getAboutContent = () => {
  try {
    return aboutContent
  } catch (error) {
    // About content fallback used
    return {
      title: 'About My Private Tutor Online',
      description: 'Excellence in private tutoring since 2010'
    }
  }
}

// Utility functions for content manipulation

/**
 * Get navigation items for main menu
 * CMS DATA SOURCE: Using landingPageContent.header.navigation for main navigation
 */
export const getMainNavigation = (): NavigationItem[] => {
  return landingPageContent.header.navigation
}

/**
 * Get site branding information
 * CMS DATA SOURCE: Using landingPageContent.header for branding
 */
export const getSiteBranding = () => {
  return {
    siteName: landingPageContent.header.siteName,
    logo: landingPageContent.header.logo,
    companyName: landingPageContent.footer.companyName,
    description: landingPageContent.footer.description
  }
}

/**
 * Get contact information across the site
 * CMS DATA SOURCE: Using landingPageContent.contact.contactInfo for contact details
 */
export const getContactInfo = () => {
  return landingPageContent.contact.contactInfo
}

/**
 * Get How It Works page content
 * CMS DATA SOURCE: Using howItWorksContent for how it works page information
 */
export const getHowItWorksContent = () => {
  return howItWorksContent
}

/**
 * Get How It Works hero section
 * CMS DATA SOURCE: Using howItWorksContent.hero for hero section
 */
export const getHowItWorksHero = () => {
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
 * CMS DATA SOURCE: Using howItWorksContent.tutorTiers for tutor tier details
 */
export const getTutorTiers = (): TutorTier[] => {
  return howItWorksContent.tutorTiers
}

/**
 * Get How It Works benefits
 * CMS DATA SOURCE: Using howItWorksContent.benefits for service benefits
 */
export const getHowItWorksBenefits = (): string[] => {
  return howItWorksContent.benefits
}

/**
 * Get How It Works CTA section
 * CMS DATA SOURCE: Using howItWorksContent.cta for call to action
 */
export const getHowItWorksCTA = () => {
  return howItWorksContent.cta
}

/**
 * Get FAQ page content
 * CMS DATA SOURCE: Using faqContent for FAQ page information
 */
export const getFAQContent = () => {
  return faqContent
}

/**
 * Get FAQ hero section
 * CMS DATA SOURCE: Using faqContent.hero for hero section
 */
export const getFAQHero = () => {
  return faqContent.hero
}

/**
 * Get FAQ categories and questions
 * CMS DATA SOURCE: Using faqContent.categories for FAQ categories
 */
export const getFAQCategories = (): FAQCategory[] => {
  return faqContent.categories
}

/**
 * Get FAQ contact section
 * CMS DATA SOURCE: Using faqContent.contact for contact CTA
 */
export const getFAQContact = () => {
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
 * CMS DATA SOURCE: Using siteSettings.contact for contact information
 */
export const getContactDetails = (): ContactDetails => {
  return siteSettings.contact
}

/**
 * Get business details and qualifications
 * CMS DATA SOURCE: Using siteSettings for business information
 */
export const getBusinessDetails = () => {
  return siteSettings.businessDetails
}

/**
 * Get pricing information
 * CMS DATA SOURCE: Using siteSettings.pricing for pricing details
 */
export const getPricingInfo = () => {
  return siteSettings.pricing
}

/**
 * Get qualifications and success rates
 * CMS DATA SOURCE: Using siteSettings.qualifications for credentials
 */
export const getQualifications = () => {
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
 */
export const validateContentStructure = () => {
  const requiredFields = [
    'header.siteName',
    'hero.title',
    'services.services',
    'contact.contactInfo'
  ]
  
  const missingFields: string[] = []
  
  requiredFields.forEach(field => {
    const keys = field.split('.')
    let current: any = landingPageContent
    
    for (const key of keys) {
      if (!current || !current[key]) {
        missingFields.push(field)
        break
      }
      current = current[key]
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
 * CMS DATA SOURCE: Using testimonialsContent for testimonials page
 */
export const getTestimonialsContent = () => {
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
 * CMS DATA SOURCE: Using testimonialsContent.hero for testimonials hero
 */
export const getTestimonialsHero = () => {
  return testimonialsContent.hero
}

/**
 * Get recent testimonials for display
 * CMS DATA SOURCE: Using testimonialsContent.recentTestimonials for testimonials
 */
export const getRecentTestimonials = () => {
  return testimonialsContent.recentTestimonials
}

/**
 * Get schools list for testimonials page
 * CMS DATA SOURCE: Using testimonialsContent.schools for school shields
 */
export const getTestimonialsSchools = () => {
  return testimonialsContent.schools
}

// Export default content object for direct access if needed
export default {
  landing: landingPageContent,
  getSiteHeader,
  getHeroContent,
  getTrustIndicators,
  getStudentJourney,
  getTestimonials,
  getServices,
  getResultsStatistics,
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
  getTestimonialsSchools
}