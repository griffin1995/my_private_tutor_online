/**
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic route segment patterns for category-based navigation
 * CONTEXT7 SOURCE: /vercel/next.js - Server component patterns for SEO-optimized content delivery
 * 
 * FAQ Category Page - Dynamic Route Implementation
 * Route Pattern: /faq/[category] - Display questions for a specific FAQ category
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through improved FAQ organization
 * SEO STRATEGY: Category-specific pages for enhanced search visibility
 * USER EXPERIENCE: Focused content delivery based on client interests
 * 
 * ROUTING CAPABILITIES:
 * - Dynamic category slug handling
 * - SEO-optimized metadata generation
 * - Category validation and 404 handling
 * - Breadcrumb navigation integration
 * - Analytics tracking preparation
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content via centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: CMS comment requirement
 * - Rule 25: Structured data management
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { m } from 'framer-motion'
import { faqCategoryService } from '@/lib/cms/cms-faq-service'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { WaveSeparator } from '@/components/ui/wave-separator'
import { FAQCategorySection } from '@/components/faq/faq-category-section'
import { FAQContactSection } from '@/components/faq/faq-contact-section'
import { FAQBreadcrumbNavigation } from '@/components/faq/faq-breadcrumb-navigation'
import { getUnifiedContact } from '@/lib/cms/cms-content'
import type { FAQRouteParams } from '@/lib/cms/cms-faq-categories'

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic route parameter type definitions
// ROUTE PARAMETERS: Type-safe parameter handling for FAQ category routes
interface CategoryPageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// CONTEXT7 SOURCE: /vercel/next.js - generateStaticParams for build-time route generation
// STATIC GENERATION: Pre-generate category routes for optimal performance
export async function generateStaticParams() {
  const staticPaths = faqCategoryService.generateStaticPaths()
  
  // Filter to only category-level paths (no subcategory)
  return staticPaths
    .filter(path => path.params.category && !path.params.subcategory)
    .map(path => ({
      category: path.params.category!
    }))
}

// CONTEXT7 SOURCE: /vercel/next.js - Metadata generation patterns for dynamic routes
// SEO OPTIMIZATION: Generate category-specific metadata for search engines
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  
  // Validate route and get category data
  const validation = faqCategoryService.validateRouteParams({ category: categorySlug })
  
  if (!validation.isValid || !validation.category) {
    return {
      title: 'Category Not Found | My Private Tutor Online',
      description: 'The requested FAQ category could not be found.'
    }
  }

  const category = validation.category
  const seo = category.seo

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.join(', '),
    canonical: seo.canonicalUrl,
    
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: seo.canonicalUrl,
      type: 'website',
      siteName: 'My Private Tutor Online'
    },
    
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle,
      description: seo.ogDescription
    },
    
    // CONTEXT7 SOURCE: /vercel/next.js - Structured data implementation for FAQ pages
    // STRUCTURED DATA: Enhanced search result appearance with FAQ schema
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        name: category.name,
        description: category.description,
        mainEntity: category.questions.slice(0, 10).map(question => ({
          '@type': 'Question',
          name: question.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: question.answer
          }
        }))
      })
    }
  }
}

/**
 * FAQ Category Page Component - Dynamic Route Handler
 * CONTEXT7 SOURCE: /vercel/next.js - Server component patterns for dynamic content delivery
 * SERVER COMPONENT: Optimized for SEO and performance with server-side rendering
 */
export default async function FAQCategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: categorySlug } = await params
  const searchParams_ = await searchParams
  
  // CMS DATA SOURCE: Validate route parameters and get category data
  const validation = faqCategoryService.validateRouteParams({ category: categorySlug })
  
  if (!validation.isValid || !validation.category) {
    notFound()
  }

  const category = validation.category
  
  // CMS DATA SOURCE: Get unified contact content for contact section
  const unifiedContact = getUnifiedContact()
  const contactContent = unifiedContact.faq
  const contactDetails = unifiedContact.primary

  // CMS DATA SOURCE: Generate breadcrumb navigation for category hierarchy
  const breadcrumbs = faqCategoryService.generateBreadcrumbs({ category: categorySlug })

  // Extract search query from URL parameters
  const searchQuery = searchParams_.q ? String(searchParams_.q) : ''

  return (
    <>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Category-specific hero styling */}
      {/* PREMIUM HERO: Category-themed hero with dynamic colors and branding */}
      <PageHero
        background="gradient"
        size="compact"
        className={`bg-gradient-to-br from-[${category.gradientFrom}] via-[${category.primaryColor}] to-slate-900`}
        overlay={true}
        overlayOpacity="light"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Hero animation patterns for category pages */}
          {/* CATEGORY BRANDING: Dynamic icon and color integration */}
          <m.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="flex items-center justify-center w-24 h-24 rounded-3xl shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${category.primaryColor}, ${category.secondaryColor})` }}
            >
              <span className="text-4xl text-white">{category.iconComponent}</span>
            </div>
          </m.div>

          <m.h1 
            className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {category.title}
          </m.h1>
          
          <m.p 
            className="text-xl text-accent-300 font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {category.description}
          </m.p>

          <m.p
            className="text-lg text-white/80 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {category.totalQuestions} question{category.totalQuestions !== 1 ? 's' : ''} available
          </m.p>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout patterns for category content */}
      {/* CONTENT LAYOUT: Structured layout for category-specific FAQ content */}
      <PageLayout background="white" showHeader={false} showFooter={true}>
        
        <WaveSeparator 
          variant="subtle" 
          className="text-slate-100" 
        />

        {/* CONTEXT7 SOURCE: /vercel/next.js - Breadcrumb navigation patterns for hierarchical content */}
        {/* NAVIGATION HIERARCHY: Category breadcrumb navigation for user orientation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FAQBreadcrumbNavigation breadcrumbs={breadcrumbs} />
        </div>

        {/* CONTEXT7 SOURCE: /vercel/next.js - Component composition patterns for focused content */}
        {/* CATEGORY CONTENT: Display questions for specific category with search functionality */}
        <FAQCategorySection
          categories={[category]}
          searchQuery={searchQuery}
          selectedCategory={null}
        />

        <WaveSeparator 
          variant="wave" 
          className="text-slate-900" 
        />

        {/* CONTEXT7 SOURCE: /vercel/next.js - Contact section integration for conversion optimization */}
        {/* CONVERSION OPTIMIZATION: Category-specific contact encouragement */}
        <FAQContactSection
          contactContent={contactContent}
          contactDetails={contactDetails}
        />
        
      </PageLayout>
    </>
  )
}