/**
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic metadata generation for FAQ pages
 * IMPLEMENTATION REASON: App Router metadata API patterns for SEO optimization
 * CONTEXT7 SOURCE: /vercel/next.js - Client component for dynamic title updates
 * SEO ENHANCEMENT: Comprehensive meta tag optimization for FAQ search visibility
 *
 * FAQ Meta Optimization Component
 * - Dynamic document title updates in client components
 * - Metadata configuration helper for server components
 * - Open Graph optimization for social media sharing
 * - Twitter Card configuration for premium branding
 * - Local SEO integration for geographic targeting
 */

"use client"

// CONTEXT7 SOURCE: /facebook/react - React component for client-side optimization
import React from 'react'

// CONTEXT7 SOURCE: /vercel/next.js - TypeScript interface for metadata configuration
// META OPTIMIZATION: Comprehensive meta tag configuration interface
interface FAQMetaOptimizationProps {
  // Basic Meta Properties
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  
  // Category-Specific Optimization
  categoryTitle?: string
  categoryDescription?: string
  questionCount?: number
  
  // Local SEO Properties
  location?: string
  serviceArea?: string[]
  
  // Open Graph Properties
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageAlt?: string
  ogType?: 'website' | 'article'
  
  // Twitter Card Properties
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterImageAlt?: string
  twitterCard?: 'summary' | 'summary_large_image'
  
  // Business Properties
  businessName?: string
  businessPhone?: string
  businessEmail?: string
  
  // Custom Properties
  customMeta?: Array<{
    name?: string
    property?: string
    content: string
  }>
  
  // Schema Integration
  enableSchemaIntegration?: boolean
  
  // Performance Properties
  preloadImages?: string[]
}

/**
 * FAQ Meta Optimization Component
 * CONTEXT7 SOURCE: /vercel/next.js - Client-side head management with Next.js Head component
 * CONTEXT7 SOURCE: /vercel/next.js - Meta tag optimization patterns for SEO
 */
export const FAQMetaOptimization: React.FC<FAQMetaOptimizationProps> = ({
  title = "Frequently Asked Questions - My Private Tutor Online",
  description = "Find answers to all your questions about our premium private tutoring services. Expert guidance for Oxbridge preparation, 11+ tutoring, A-Levels, and GCSE support.",
  keywords = [
    "private tutor FAQ",
    "tutoring questions",
    "Oxbridge preparation FAQ",
    "11+ tutoring help",
    "A-level tutor questions",
    "GCSE tutoring support",
    "premium tutoring FAQ",
    "elite tutoring questions",
    "London private tutor",
    "grammar school preparation"
  ],
  canonicalUrl = "https://myprivatetutoronline.com/faq",
  categoryTitle,
  categoryDescription,
  questionCount,
  location = "London",
  serviceArea = ["London", "Greater London", "Surrey", "Kent", "Essex", "Hertfordshire"],
  ogTitle,
  ogDescription,
  ogImage = "https://myprivatetutoronline.com/images/faq-og-image.jpg",
  ogImageAlt = "My Private Tutor Online - FAQ Support",
  ogType = "website",
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterImageAlt,
  twitterCard = "summary_large_image",
  businessName = "My Private Tutor Online",
  businessPhone = "+44 7513 550278",
  businessEmail = "enquiries@myprivatetutoronline.com",
  customMeta = [],
  enableSchemaIntegration = true,
  preloadImages = []
}) => {
  // CONTEXT7 SOURCE: /context7/react_dev - useMemo for optimized meta tag generation
  // PERFORMANCE: Memoize meta tag calculations for better rendering performance
  const optimizedMeta = React.useMemo(() => {
    // CONTEXT7 SOURCE: /vercel/next.js - Dynamic title generation with category integration
    // TITLE OPTIMIZATION: Category-specific title generation for better search targeting
    let optimizedTitle = title
    if (categoryTitle) {
      optimizedTitle = `${categoryTitle} FAQ - ${businessName}`
      if (questionCount) {
        optimizedTitle += ` | ${questionCount} Questions Answered`
      }
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Location-based title optimization for local SEO
    // LOCAL SEO: Geographic targeting for tutoring service visibility
    if (location && location !== "London") {
      optimizedTitle += ` | ${location} Tutoring Services`
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Dynamic description with category and location context
    // DESCRIPTION OPTIMIZATION: Context-aware description generation
    let optimizedDescription = description
    if (categoryDescription && questionCount) {
      optimizedDescription = `${categoryDescription} Find answers to ${questionCount} frequently asked questions about ${categoryTitle?.toLowerCase()} with ${businessName}.`
    }
    
    // Add local SEO context to description
    if (location) {
      optimizedDescription += ` Premium tutoring services available in ${location} and surrounding areas.`
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Keywords optimization with category and location targeting
    // KEYWORD OPTIMIZATION: Dynamic keyword generation for improved search visibility
    const optimizedKeywords = [...keywords]
    if (categoryTitle) {
      optimizedKeywords.push(
        `${categoryTitle.toLowerCase()} FAQ`,
        `${categoryTitle.toLowerCase()} questions`,
        `${categoryTitle.toLowerCase()} tutoring help`
      )
    }
    if (location) {
      optimizedKeywords.push(
        `private tutor ${location}`,
        `tutoring services ${location}`,
        `${location} tutoring FAQ`
      )
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Open Graph optimization with dynamic content
    // OPEN GRAPH: Social media optimization with dynamic content
    const finalOgTitle = ogTitle || optimizedTitle
    const finalOgDescription = ogDescription || optimizedDescription
    const finalOgImage = ogImage || "https://myprivatetutoronline.com/images/faq-og-image.jpg"
    
    // CONTEXT7 SOURCE: /vercel/next.js - Twitter Card optimization
    // TWITTER CARDS: Enhanced Twitter sharing with premium branding
    const finalTwitterTitle = twitterTitle || optimizedTitle
    const finalTwitterDescription = twitterDescription || optimizedDescription
    const finalTwitterImage = twitterImage || finalOgImage
    const finalTwitterImageAlt = twitterImageAlt || ogImageAlt
    
    return {
      title: optimizedTitle,
      description: optimizedDescription,
      keywords: optimizedKeywords.join(', '),
      openGraph: {
        title: finalOgTitle,
        description: finalOgDescription,
        image: finalOgImage,
        imageAlt: ogImageAlt,
        type: ogType,
        url: canonicalUrl
      },
      twitter: {
        title: finalTwitterTitle,
        description: finalTwitterDescription,
        image: finalTwitterImage,
        imageAlt: finalTwitterImageAlt,
        card: twitterCard
      }
    }
  }, [
    title, description, keywords, categoryTitle, categoryDescription, questionCount,
    location, serviceArea, ogTitle, ogDescription, ogImage, ogImageAlt, ogType,
    twitterTitle, twitterDescription, twitterImage, twitterImageAlt, twitterCard,
    businessName, canonicalUrl
  ])

  // CONTEXT7 SOURCE: /vercel/next.js - Client component title updates via document.title
  // CLIENT COMPONENT PATTERN: Update document title dynamically in client components
  React.useEffect(() => {
    // Update document title for client-side navigation
    if (typeof document !== 'undefined') {
      document.title = optimizedMeta.title
    }
  }, [optimizedMeta.title])

  // Since this is a client component, we can only update the title
  // Meta tags should be set via generateMetadata in the parent server component
  return null
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Metadata helper for server components
 * HELPER FUNCTION: Generate metadata object for use in server components
 */
export const generateFAQMetadata = (props: FAQMetaOptimizationProps) => {
  const {
    title = "Frequently Asked Questions - My Private Tutor Online",
    description = "Find answers to all your questions about our premium private tutoring services. Expert guidance for Oxbridge preparation, 11+ tutoring, A-Levels, and GCSE support.",
    keywords = [
      "private tutor FAQ",
      "tutoring questions",
      "Oxbridge preparation FAQ"
    ],
    canonicalUrl = "https://myprivatetutoronline.com/faq",
    categoryTitle,
    categoryDescription,
    questionCount,
    location = "London",
    businessName = "My Private Tutor Online",
    ogImage = "https://myprivatetutoronline.com/images/faq-og-image.jpg",
    ogImageAlt = "My Private Tutor Online - FAQ Support",
    ogType = "website",
    twitterCard = "summary_large_image"
  } = props

  // Generate optimized title
  let optimizedTitle = title
  if (categoryTitle) {
    optimizedTitle = `${categoryTitle} FAQ - ${businessName}`
    if (questionCount) {
      optimizedTitle += ` | ${questionCount} Questions Answered`
    }
  }
  if (location && location !== "London") {
    optimizedTitle += ` | ${location} Tutoring Services`
  }

  // Generate optimized description
  let optimizedDescription = description
  if (categoryDescription && questionCount) {
    optimizedDescription = `${categoryDescription} Find answers to ${questionCount} frequently asked questions about ${categoryTitle?.toLowerCase()} with ${businessName}.`
  }
  if (location) {
    optimizedDescription += ` Premium tutoring services available in ${location} and surrounding areas.`
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Metadata object structure for App Router
  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: keywords.join(', '),
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-GB': canonicalUrl,
        'en': canonicalUrl
      }
    },
    openGraph: {
      title: optimizedTitle,
      description: optimizedDescription,
      url: canonicalUrl,
      siteName: businessName,
      images: [
        {
          url: ogImage,
          alt: ogImageAlt
        }
      ],
      locale: 'en_GB',
      type: ogType
    },
    twitter: {
      card: twitterCard,
      title: optimizedTitle,
      description: optimizedDescription,
      images: [ogImage],
      site: '@MyPrivateTutorOnline',
      creator: '@MyPrivateTutorOnline'
    },
    other: {
      'theme-color': '#0f172a',
      'msapplication-TileColor': '#0f172a',
      'application-name': businessName
    }
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Component export with default props
export default FAQMetaOptimization