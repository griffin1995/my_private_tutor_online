// CMS DATA SOURCE: Centralised content management for My Private Tutor Online
// MANDATORY: All content must use this CMS system - CLAUDE.md rule 22-25

import landingPageContent from '@/content/landing-page.json'
import businessContent from '@/content/business-content.json'
import aboutContent from '@/content/about.json'

// TypeScript interfaces for content structure
export interface NavigationItem {
  label: string
  href: string
}

export interface TrustIndicator {
  icon: string
  title: string
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
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
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
    console.warn('Business content not found, using fallback')
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
    console.warn('About content not found, using fallback')
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
 */
export const getCopyrightText = (): string => {
  const currentYear = new Date().getFullYear()
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
    console.error('Missing required content fields:', missingFields)
    return false
  }
  
  return true
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
  formatBritishEnglish,
  getCopyrightText,
  validateContentStructure
}