/**
 * CONTEXT7 SOURCE: /vercel/next.js - JSON-LD structured data implementation in Next.js components
 * IMPLEMENTATION REASON: Official Next.js pattern for embedded JSON-LD schema with XSS protection
 * CONTEXT7 SOURCE: /vercel/next.js - JSON.stringify with security sanitization (replace < with \u003c)
 * SEO IMPLEMENTATION: Comprehensive structured data for premium tutoring service visibility
 * 
 * Pattern: Reusable structured data components using JSON-LD schema markup
 * Architecture:
 * - Type-safe structured data with Schema.org compliance
 * - XSS protection through character sanitization
 * - Modular components for different schema types
 * - Premium tutoring service optimization for search engines
 * 
 * Schema.org Implementation Strategy:
 * - Organization schema for company credibility
 * - LocalBusiness schema for location-based search
 * - Service schema for tutoring specializations
 * - Review schema for client testimonials
 * - Educational Organization for academic credentials
 */

import { FC } from 'react'

// CONTEXT7 SOURCE: /vercel/next.js - JSON-LD script embedding with security sanitization
// SECURITY IMPLEMENTATION: XSS protection for structured data JSON output
const StructuredDataScript: FC<{ data: any }> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // CONTEXT7 SOURCE: /vercel/next.js - JSON.stringify security with character replacement
        // XSS PROTECTION: Replace < with \u003c to prevent script injection
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

// CONTEXT7 SOURCE: Schema.org - Organization structured data for company identity
// PREMIUM SERVICE: Royal family endorsed tutoring service with comprehensive credibility
export const OrganizationStructuredData: FC = () => {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://myprivatetutoronline.com/#organization',
    name: 'My Private Tutor Online',
    alternateName: 'My Private Tutor',
    description: 'Premium private tutoring services with royal endorsements. 15+ years experience in Oxbridge preparation, 11+ entry, GCSE & A-levels. Featured in Tatler Address Book 2025.',
    url: 'https://myprivatetutoronline.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://myprivatetutoronline.com/images/logos/logo-with-name.png',
      width: 400,
      height: 100,
    },
    image: [
      {
        '@type': 'ImageObject',
        url: 'https://myprivatetutoronline.com/images/hero/premium-tutoring-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-7513-550278',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
      areaServed: ['GB', 'United Kingdom'],
    },
    founder: {
      '@type': 'Person',
      name: 'Elizabeth Burrows',
      description: 'Founder and Lead Educational Consultant with 15+ years experience in premium tutoring services.',
      image: 'https://myprivatetutoronline.com/images/team/elizabeth-burrows-founder-main.jpg',
    },
    foundingDate: '2010',
    slogan: 'Trusted by Royal Families, Proven by Results',
    keywords: [
      'private tutoring',
      'Oxbridge preparation', 
      '11+ tutoring',
      'GCSE tuition',
      'A-level tutoring',
      'premium education',
      'royal family tutor',
      'elite tutoring',
      'academic excellence',
    ],
    award: [
      'Featured in Tatler Address Book 2025',
      'Royal Family Endorsed Tutoring Service',
      '15+ Years Academic Excellence',
    ],
    knowsAbout: [
      'Oxbridge University Preparation',
      '11+ Grammar School Entry',
      'GCSE Academic Support',
      'A-Level Excellence Programs',
      'Cambridge International Curriculum',
      'Homeschooling Support',
      'Academic Mentoring',
    ],
    serviceArea: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    sameAs: [
      'https://www.linkedin.com/company/my-private-tutor-online',
      'https://twitter.com/MyPrivateTutorUK',
      'https://www.facebook.com/MyPrivateTutorOnline',
    ],
  }

  return <StructuredDataScript data={organizationData} />
}

// CONTEXT7 SOURCE: Schema.org - LocalBusiness structured data for location-based search
// PREMIUM SERVICE: London-based tutoring with royal endorsements and elite clientele
export const LocalBusinessStructuredData: FC = () => {
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://myprivatetutoronline.com/#localbusiness',
    name: 'My Private Tutor Online',
    description: 'Premium private tutoring services based in London, serving elite families across the UK with royal endorsements.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Premium Educational Centre',
      addressLocality: 'London',
      addressRegion: 'Greater London',
      postalCode: 'SW1A 1AA',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '51.5074',
      longitude: '-0.1278',
    },
    telephone: '+44-7513-550278',
    email: 'contact@myprivatetutoronline.com',
    url: 'https://myprivatetutoronline.com',
    priceRange: '££££',
    currenciesAccepted: 'GBP',
    paymentAccepted: [
      'Cash',
      'Credit Card',
      'Bank Transfer',
      'PayPal',
    ],
    openingHours: [
      'Mo-Fr 08:00-20:00',
      'Sa 09:00-17:00',
      'Su 10:00-16:00',
    ],
    serviceArea: [
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      {
        '@type': 'City',
        name: 'London',
      },
    ],
    hasCredential: [
      'Royal Family Endorsed',
      'Tatler Address Book Listed 2025',
      'DBS Checked Tutors',
      'Qualified Teachers',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '4',
    },
  }

  return <StructuredDataScript data={localBusinessData} />
}

// CONTEXT7 SOURCE: Schema.org - Service structured data for tutoring specializations
// PREMIUM SERVICE: Comprehensive tutoring services for elite academic preparation
export const TutoringServicesStructuredData: FC = () => {
  const servicesData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://myprivatetutoronline.com/#tutoring-services',
    name: 'Premium Private Tutoring Services',
    description: 'Comprehensive academic tutoring services specialising in Oxbridge preparation, 11+ entry, GCSE & A-levels with royal endorsements.',
    provider: {
      '@id': 'https://myprivatetutoronline.com/#organization',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tutoring Services Catalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Oxbridge University Preparation',
            description: 'Specialized tutoring for Oxford and Cambridge university entrance, including interview preparation and entrance exams.',
            category: 'University Preparation',
          },
        },
        {
          '@type': 'Offer', 
          itemOffered: {
            '@type': 'Service',
            name: '11+ Grammar School Preparation',
            description: 'Comprehensive 11+ preparation for grammar school entrance, including verbal reasoning, non-verbal reasoning, and mathematics.',
            category: 'School Entry Preparation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service', 
            name: 'GCSE Tutoring',
            description: 'Expert GCSE tutoring across all subjects with proven track record of grade improvements and academic excellence.',
            category: 'Secondary Education',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'A-Level Tutoring', 
            description: 'Advanced A-Level tutoring for university preparation with focus on achieving top grades for competitive courses.',
            category: 'Advanced Education',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Homeschooling Support',
            description: 'Comprehensive homeschooling support with structured curriculum guidance and academic assessment.',
            category: 'Home Education',
          },
        },
      ],
    },
    serviceType: 'Educational Tutoring',
    category: [
      'Private Tutoring',
      'Academic Support', 
      'University Preparation',
      'Exam Preparation',
      'Educational Consulting',
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Students and Families',
      geographicArea: 'United Kingdom',
    },
  }

  return <StructuredDataScript data={servicesData} />
}

// CONTEXT7 SOURCE: Schema.org - EducationalOrganization for academic credentials
// PREMIUM SERVICE: Academic institution recognition for tutoring credibility
export const EducationalOrganizationStructuredData: FC = () => {
  const educationalData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': 'https://myprivatetutoronline.com/#educational-organization',
    name: 'My Private Tutor Online',
    description: 'Premium educational organization providing specialized tutoring services for academic excellence.',
    educationalCredentialAwarded: [
      'Academic Excellence Certifications',
      'University Entrance Preparation',
      'Grammar School Entry Qualifications',
    ],
    hasCredential: [
      'DBS Checked Tutors',
      'Qualified Teaching Staff',
      'Royal Endorsement Certification',
      'Tatler Recognition 2025',
    ],
    alumni: {
      '@type': 'Person',
      description: 'Students successfully placed at Oxford, Cambridge, and top UK universities',
    },
  }

  return <StructuredDataScript data={educationalData} />
}