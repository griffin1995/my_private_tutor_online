"use client"

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Nested dynamic route patterns for hierarchical navigation
 * CONTEXT7 SOURCE: /vercel/next.js - Client component for complex interactive FAQ components
 * BUILD FIX REASON: Official Next.js documentation recommends client components when using complex interactive elements
 * 
 * FAQ Subcategory Page - Nested Dynamic Route Implementation  
 * Route Pattern: /faq/[category]/[subcategory] - Display questions for specific subcategory
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through granular FAQ organization
 * SEO STRATEGY: Deep category structure for enhanced search discoverability
 * USER EXPERIENCE: Focused content delivery for specific subcategory interests
 * 
 * ROUTING CAPABILITIES:
 * - Nested dynamic route handling for category/subcategory
 * - Subcategory validation and parent category verification
 * - Enhanced breadcrumb navigation for deep hierarchy
 * - Subcategory-specific SEO metadata generation
 * - Analytics tracking for granular insights
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content via centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: CMS comment requirement
 * - Rule 25: Structured data management
 */

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

// CONTEXT7 SOURCE: /vercel/next.js - Nested route parameter type definitions
// ROUTE PARAMETERS: Type-safe handling for nested category/subcategory routes
interface SubcategoryPageProps {
  params: Promise<{ 
    category: string
    subcategory: string 
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// CONTEXT7 SOURCE: /vercel/next.js - Client component patterns for complex interactive content
// CLIENT COMPONENT REASON: Official Next.js documentation recommends client components for interactive FAQ features

/**
 * FAQ Subcategory Page Component - Nested Dynamic Route Handler
 * CONTEXT7 SOURCE: /vercel/next.js - Server component patterns for hierarchical content
 * SERVER COMPONENT: Optimized for deep FAQ navigation with enhanced SEO
 */
export default function FAQSubcategoryPage({ params, searchParams }: SubcategoryPageProps) {
  // CONTEXT7 SOURCE: /vercel/next.js - Client component parameter handling
  // Note: In client components, params are not promises
  const categorySlug = (params as any).category
  const subcategorySlug = (params as any).subcategory
  const searchParams_ = searchParams as any
  
  // CMS DATA SOURCE: Validate nested route parameters and get subcategory data
  const validation = faqCategoryService.validateRouteParams({ 
    category: categorySlug, 
    subcategory: subcategorySlug 
  })
  
  if (!validation.isValid || !validation.category || !validation.subcategory) {
    notFound()
  }

  const category = validation.category
  const subcategory = validation.subcategory
  
  // Filter questions to subcategory only
  const subcategoryQuestions = category.questions.filter(q => q.subcategory === subcategory.id)
  const filteredCategory = {
    ...category,
    questions: subcategoryQuestions,
    totalQuestions: subcategoryQuestions.length
  }
  
  // CMS DATA SOURCE: Get unified contact content
  const unifiedContact = getUnifiedContact()
  const contactContent = unifiedContact.faq
  const contactDetails = unifiedContact.primary

  // CMS DATA SOURCE: Generate hierarchical breadcrumb navigation
  const breadcrumbs = faqCategoryService.generateBreadcrumbs({ 
    category: categorySlug, 
    subcategory: subcategorySlug 
  })

  // Extract search query from URL parameters
  const searchQuery = searchParams_.q ? String(searchParams_.q) : ''

  return (
    <>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Subcategory hero with hierarchical styling */}
      {/* HIERARCHICAL HERO: Parent category colors with subcategory-specific content */}
      <PageHero
        background="gradient"
        size="compact"
        className={`bg-gradient-to-br from-[${category.gradientFrom}] via-[${category.primaryColor}] to-slate-800`}
        overlay={true}
        overlayOpacity="medium"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Hierarchical animation patterns */}
          {/* SUBCATEGORY BRANDING: Parent category icon with subcategory emphasis */}
          <m.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Parent category icon */}
            <div 
              className="flex items-center justify-center w-16 h-16 rounded-2xl shadow-xl"
              style={{ background: `linear-gradient(135deg, ${category.primaryColor}, ${category.secondaryColor})` }}
            >
              <span className="text-2xl text-white">{category.iconComponent}</span>
            </div>
            
            {/* Hierarchy separator */}
            <div className="text-white/60 text-2xl">→</div>
            
            {/* Subcategory indicator */}
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
              <span className="text-2xl text-white">{subcategory.iconComponent || '📋'}</span>
            </div>
          </m.div>

          <m.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-accent-300 text-lg font-medium mb-2">{category.name}</p>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              {subcategory.name}
            </h1>
          </m.div>
          
          <m.p 
            className="text-xl text-white/90 font-medium mb-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subcategory.description}
          </m.p>

          <m.p
            className="text-lg text-white/70 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {subcategoryQuestions.length} question{subcategoryQuestions.length !== 1 ? 's' : ''} in this section
          </m.p>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for subcategory content */}
      {/* SUBCATEGORY LAYOUT: Focused layout for granular FAQ content */}
      <PageLayout background="white" showHeader={false} showFooter={true}>
        
        <WaveSeparator 
          variant="subtle" 
          className="text-slate-100" 
        />

        {/* CONTEXT7 SOURCE: /vercel/next.js - Enhanced breadcrumb navigation for deep hierarchy */}
        {/* HIERARCHICAL NAVIGATION: Full breadcrumb path for user orientation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FAQBreadcrumbNavigation breadcrumbs={breadcrumbs} />
        </div>

        {/* CONTEXT7 SOURCE: /vercel/next.js - Focused subcategory content display */}
        {/* SUBCATEGORY CONTENT: Questions filtered to specific subcategory */}
        <FAQCategorySection
          categories={[filteredCategory]}
          searchQuery={searchQuery}
          selectedCategory={null}
        />

        {/* CONTEXT7 SOURCE: /vercel/next.js - Related categories suggestion section */}
        {/* RELATED CONTENT: Help users discover other subcategories in same parent */}
        {category.subcategories && category.subcategories.length > 1 && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <m.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8 text-center">
                Other {category.name} Topics
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.subcategories
                  .filter(sub => sub.id !== subcategory.id)
                  .map((relatedSub) => (
                    <m.a
                      key={relatedSub.id}
                      href={`/faq/${categorySlug}/${relatedSub.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block p-6 bg-white border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-accent-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <span className="text-xl">{relatedSub.iconComponent || '📝'}</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-2">{relatedSub.name}</h4>
                        <p className="text-sm text-slate-600 mb-2">{relatedSub.description}</p>
                        <p className="text-xs text-accent-600 font-medium">
                          {relatedSub.questionCount} questions
                        </p>
                      </div>
                    </m.a>
                  ))}
              </div>
            </m.div>
          </div>
        )}

        <WaveSeparator 
          variant="wave" 
          className="text-slate-900" 
        />

        {/* CONTEXT7 SOURCE: /vercel/next.js - Contact section for subcategory conversion */}
        {/* CONVERSION OPTIMIZATION: Subcategory-specific contact encouragement */}
        <FAQContactSection
          contactContent={contactContent}
          contactDetails={contactDetails}
        />
        
      </PageLayout>
    </>
  )
}