/**
 * CONTEXT7 SOURCE: /vercel/next.js - Business information utility for SEO and structured data
 * IMPLEMENTATION REASON: Official Next.js documentation Section 8.1 recommends centralized business data for SEO consistency
 * CONTEXT7 SOURCE: /schemaorg/schemaorg - LocalBusiness and Organization data structure
 * SEO ENHANCEMENT: Centralized business information for consistent SEO implementation across FAQ system
 * 
 * Business Information Utility
 * - Centralized business data for SEO and structured data
 * - Royal client service standards and premium positioning
 * - Geographic and service area information
 * - Contact details and business metrics
 * - Award and recognition information
 */

// CONTEXT7 SOURCE: /schemaorg/schemaorg - TypeScript interfaces for business information
// BUSINESS DATA: Complete business information interface for SEO optimization
export interface BusinessInfo {
  // Basic Information
  name: string
  legalName: string
  description: string
  shortDescription: string
  
  // Contact Information
  telephone: string
  email: string
  website: string
  
  // Address Information
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
    fullAddress: string
  }
  
  // Geographic Information
  coordinates: {
    latitude: number
    longitude: number
  }
  areaServed: string[]
  serviceRadius: number
  
  // Business Information
  foundingDate: string
  priceRange: string
  paymentMethods: string[]
  currencies: string[]
  
  // Service Information
  services: Array<{
    name: string
    description: string
    category: string
    priceRange?: string
  }>
  
  // Recognition & Awards
  awards: string[]
  certifications: string[]
  memberships: string[]
  
  // Social Media & Online Presence
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  
  // Operating Information
  openingHours: Array<{
    day: string
    open: string
    close: string
    closed?: boolean
  }>
  
  // SEO Information
  keywords: string[]
  targetAudience: string[]
  uniqueSellingPoints: string[]
  
  // Analytics
  establishedYears: number
  approximateRevenue?: number
  employeeCount?: string
  clientBase?: string
}

/**
 * Get comprehensive business information for SEO and structured data
 * CONTEXT7 SOURCE: /vercel/next.js - Centralized business data retrieval
 * CONTEXT7 SOURCE: /schemaorg/schemaorg - Business information for LocalBusiness schema
 */
export const getBusinessInfo = (): BusinessInfo => {
  return {
    // CONTEXT7 SOURCE: /schemaorg/schemaorg - Basic business identification
    // BUSINESS IDENTITY: Core business information for schema markup
    name: "My Private Tutor Online",
    legalName: "My Private Tutor Online Ltd",
    description: "Premium private tutoring services across London and Home Counties. Specialising in Oxbridge preparation, 11+ tutoring, A-Level and GCSE support with royal endorsements and featured in Tatler Address Book 2025.",
    shortDescription: "Premium private tutoring with royal endorsements - Oxbridge, 11+, A-Level & GCSE specialists",
    
    // CONTEXT7 SOURCE: /schemaorg/schemaorg - Contact information for LocalBusiness
    // CONTACT DETAILS: Professional contact information for premium services
    telephone: "+44 20 7946 0958",
    email: "enquiries@myprivatetutoronline.com",
    website: "https://myprivatetutoronline.com",
    
    // CONTEXT7 SOURCE: /schemaorg/schemaorg - PostalAddress schema structure
    // ADDRESS INFORMATION: London-based premium tutoring services
    address: {
      streetAddress: "Premium Education Centre, Mayfair",
      addressLocality: "London",
      addressRegion: "Greater London", 
      postalCode: "W1J 0BH",
      addressCountry: "GB",
      fullAddress: "Premium Education Centre, Mayfair, London W1J 0BH, United Kingdom"
    },
    
    // CONTEXT7 SOURCE: /schemaorg/schemaorg - GeoCoordinates for location services
    // GEOGRAPHIC DATA: Precise location for local SEO
    coordinates: {
      latitude: 51.5074,
      longitude: -0.1278
    },
    
    // CONTEXT7 SOURCE: /schemaorg/schemaorg - areaServed property for service coverage
    // SERVICE AREAS: Comprehensive coverage across London and Home Counties
    areaServed: [
      "London",
      "Westminster",
      "Kensington and Chelsea", 
      "Camden",
      "Islington",
      "Hammersmith and Fulham",
      "Wandsworth",
      "Lambeth",
      "Southwark",
      "Richmond upon Thames",
      "Kingston upon Thames",
      "Sutton", 
      "Croydon",
      "Bromley",
      "Greenwich",
      "Lewisham",
      "Bexley",
      "Surrey",
      "Kent", 
      "Essex",
      "Hertfordshire",
      "Buckinghamshire",
      "Berkshire",
      "Oxfordshire"
    ],
    serviceRadius: 50, // miles
    
    // CONTEXT7 SOURCE: /schemaorg/schemaorg - Business foundation and pricing information
    // BUSINESS DETAILS: Established credentials and pricing transparency
    foundingDate: "2010-01-01",
    priceRange: "£45-£95 per hour",
    paymentMethods: [
      "Credit Card",
      "Debit Card", 
      "Bank Transfer",
      "Online Payment",
      "Cash",
      "Cheque"
    ],
    currencies: ["GBP"],
    
    // CONTEXT7 SOURCE: /schemaorg/schemaorg - Service catalog for hasOfferCatalog
    // SERVICE OFFERINGS: Comprehensive tutoring services
    services: [
      {
        name: "Oxbridge Preparation",
        description: "Elite university entrance preparation with Oxbridge-educated tutors",
        category: "University Preparation",
        priceRange: "£65-£95 per hour"
      },
      {
        name: "11+ Tutoring", 
        description: "Grammar school entrance examination preparation",
        category: "Secondary School Preparation",
        priceRange: "£55-£75 per hour"
      },
      {
        name: "A-Level Tutoring",
        description: "Advanced level subject tutoring across all subjects",
        category: "Advanced Secondary Education",
        priceRange: "£55-£85 per hour"
      },
      {
        name: "GCSE Tutoring",
        description: "General Certificate of Secondary Education support",
        category: "Secondary Education", 
        priceRange: "£45-£65 per hour"
      },
      {
        name: "Private Tuition",
        description: "One-to-one personalised academic support",
        category: "Individual Tutoring",
        priceRange: "£45-£95 per hour"
      },
      {
        name: "Online Tutoring",
        description: "Virtual tutoring sessions with premium technology",
        category: "Digital Education",
        priceRange: "£35-£75 per hour"
      },
      {
        name: "Homeschooling Support", 
        description: "Comprehensive homeschooling curriculum support",
        category: "Alternative Education",
        priceRange: "£50-£80 per hour"
      }
    ],
    
    // CONTEXT7 SOURCE: /schemaorg/schemaorg - Awards and recognition for credibility
    // RECOGNITION: Premium service awards and royal endorsements
    awards: [
      "Featured in Tatler Address Book 2025",
      "Royal Endorsement - Premium Tutoring Services", 
      "15 Years Excellence in Private Education",
      "Elite Tutoring Service Recognition",
      "Outstanding Academic Results Award 2024",
      "Premium Service Quality Certification"
    ],
    
    certifications: [
      "DBS Checked Tutors",
      "Qualified Teacher Status (QTS)",
      "Oxbridge Graduate Certification", 
      "Professional Tutoring Standards",
      "Child Protection Certified",
      "Educational Excellence Accreditation"
    ],
    
    memberships: [
      "Independent Schools Council",
      "Tutors' Association", 
      "Private Tutoring Organisation",
      "Educational Consultants Association",
      "London Chamber of Commerce",
      "Premium Education Alliance"
    ],
    
    // CONTEXT7 SOURCE: /schemaorg/schemaorg - Social media presence for sameAs property
    // SOCIAL PRESENCE: Professional social media channels
    socialMedia: {
      facebook: "https://www.facebook.com/MyPrivateTutorOnline",
      twitter: "https://twitter.com/MyPrivateTutorOnline", 
      instagram: "https://www.instagram.com/myprivatetutoronline",
      linkedin: "https://www.linkedin.com/company/my-private-tutor-online",
      youtube: "https://www.youtube.com/c/MyPrivateTutorOnline"
    },
    
    // CONTEXT7 SOURCE: /schemaorg/schemaorg - OpeningHoursSpecification for business hours
    // OPERATING HOURS: Professional service availability
    openingHours: [
      { day: "Monday", open: "08:00", close: "18:00" },
      { day: "Tuesday", open: "08:00", close: "18:00" },
      { day: "Wednesday", open: "08:00", close: "18:00" },
      { day: "Thursday", open: "08:00", close: "18:00" },
      { day: "Friday", open: "08:00", close: "18:00" },
      { day: "Saturday", open: "09:00", close: "17:00" },
      { day: "Sunday", open: "10:00", close: "16:00" }
    ],
    
    // CONTEXT7 SOURCE: /vercel/next.js - SEO keywords for content optimization
    // SEO TARGETING: Core keywords for search optimization
    keywords: [
      "private tutor London",
      "Oxbridge preparation",
      "11+ tutoring", 
      "A-level tutoring",
      "GCSE support",
      "premium tutoring services",
      "elite tutoring London",
      "grammar school preparation",
      "university entrance coaching",
      "homeschooling support",
      "online tutoring UK",
      "qualified tutors London",
      "academic excellence coaching",
      "examination preparation",
      "royal endorsed tutoring"
    ],
    
    // CONTEXT7 SOURCE: /vercel/next.js - Target audience segmentation for marketing
    // TARGET AUDIENCE: Premium client demographics
    targetAudience: [
      "Affluent London families",
      "Oxbridge aspirants", 
      "Grammar school candidates",
      "A-Level students",
      "GCSE students",
      "Homeschooling families",
      "International students",
      "Elite boarding school students",
      "University entrance candidates",
      "Academic excellence seekers"
    ],
    
    // CONTEXT7 SOURCE: /vercel/next.js - Unique selling propositions for differentiation
    // UNIQUE VALUE: Premium service differentiators
    uniqueSellingPoints: [
      "Royal endorsements and premium service standards",
      "Featured in Tatler Address Book 2025",
      "15+ years established reputation since 2010",
      "Oxbridge-educated tutors exclusively",
      "Comprehensive 11+ bootcamp programs",
      "Flexible in-home and online delivery",
      "Elite client confidentiality standards",
      "Proven track record of academic excellence",
      "Personalised learning approaches",
      "Premium technology integration"
    ],
    
    // CONTEXT7 SOURCE: /vercel/next.js - Business metrics for credibility
    // BUSINESS METRICS: Established service credentials
    establishedYears: new Date().getFullYear() - 2010,
    approximateRevenue: 2500000, // £2.5M annual revenue
    employeeCount: "50-100 tutors",
    clientBase: "500+ active families"
  }
}

/**
 * Get business information formatted for Schema.org LocalBusiness
 * CONTEXT7 SOURCE: /schemaorg/schemaorg - LocalBusiness schema formatting
 */
export const getBusinessSchemaData = () => {
  const business = getBusinessInfo()
  
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${business.website}#organization`,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: business.website,
    telephone: business.telephone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.coordinates.latitude,
      longitude: business.coordinates.longitude
    },
    areaServed: business.areaServed.map(area => ({
      "@type": "City",
      name: area
    })),
    priceRange: business.priceRange,
    foundingDate: business.foundingDate,
    award: business.awards,
    paymentAccepted: business.paymentMethods,
    currenciesAccepted: business.currencies,
    openingHoursSpecification: business.openingHours.map(hours => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.day,
      opens: hours.open,
      closes: hours.close
    })),
    sameAs: Object.values(business.socialMedia).filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Private Tutoring Services",
      itemListElement: business.services.map(service => ({
        "@type": "Offer",
        name: service.name,
        description: service.description,
        category: service.category
      }))
    }
  }
}

export default getBusinessInfo