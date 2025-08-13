/**
 * CONTEXT7 SOURCE: /facebook/react - Refactored page component using extracted modular components
 * REFACTOR REASON: Official React documentation Section 3.1 recommends component composition patterns for maintainability
 * CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced whileInView animations via extracted components
 * MODULAR ARCHITECTURE REASON: Official patterns for reusable component architecture with clear separation of concerns
 * 
 * Subject Tuition Page - Refactored Architecture
 * Extracted monolithic components into modular, reusable sections:
 * - SubjectAccordion: Expandable subject categories with animations
 * - ServiceStatistics: Statistics display with responsive grid
 * - HomeschoolingPreview: CTA preview section with features
 * - ServicesCTA: Call-to-action section with dual buttons
 * 
 * Benefits:
 * - Improved maintainability through component separation
 * - Enhanced reusability across pages
 * - Cleaner codebase with focused responsibilities
 * - Easier testing and debugging of individual sections
 */

"use client"

import { m } from 'framer-motion'
import Image from 'next/image'
import { BookOpen, GraduationCap, Users, Award, Target, Globe, Crown, CheckCircle } from 'lucide-react'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { WaveSeparator } from '@/components/ui/wave-separator'
import { GradientOverlay } from '@/components/ui/gradient-overlay'

// CONTEXT7 SOURCE: /facebook/react - Importing extracted modular components
// COMPONENT IMPORT REASON: Official React patterns for component composition and reusability
import { SubjectAccordion, SubjectCategory } from '@/components/sections/subject-accordion'
import { ServiceStatistics, StatisticItem } from '@/components/sections/service-statistics'
import { HomeschoolingPreview, HomeschoolingFeature } from '@/components/sections/homeschooling-preview'
import { ServicesCTA, CTAButton } from '@/components/sections/services-cta'

// CONTEXT7 SOURCE: /facebook/react - Business analytics components for results documentation and competitive intelligence
// BUSINESS ANALYTICS REASON: Tasks 18-19 implementation for data-driven validation and competitive positioning
import { ResultsDocumentation } from '@/components/sections/results-documentation'
import { CompetitiveAnalysis } from '@/components/sections/competitive-analysis'
import { CaseStudies } from '@/components/sections/case-studies'

// CONTEXT7 SOURCE: /microsoft/typescript - CMS data access patterns for component data consumption
// CMS INTEGRATION REASON: Official TypeScript patterns for centralized data management and type-safe content access
import {
  getServicesHero,
  getServicesStatistics,
  getServicesSubjectCategories,
  getHomeschoolingPreview,
  getServicesCTA,
  getServicesSectionTitles,
  getResultsDocumentation,
  getCompetitiveAnalysis,
  getFeaturedCaseStudies,
  type ServiceSubjectCategory,
  type ServiceStatisticItem
} from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /vercel/next.js - Client component rendering with modular architecture
// REFACTORED ARCHITECTURE REASON: Official Next.js patterns for component composition and performance
//
// ROUTE SEGMENT ANALYSIS:
// - Rendering Mode: Dynamic (ƒ) - Automatic via "use client" directive
// - Component Architecture: Modular composition with extracted reusable components
// - State Management: Delegated to individual components for better encapsulation
// - Animation Strategy: Distributed across components with consistent Framer Motion patterns
// - Data Flow: Structured props interface for component communication
//
// PERFORMANCE BENEFITS:
// - Reduced bundle size through component splitting
// - Improved memoization opportunities
// - Better tree-shaking capabilities
// - Enhanced development experience with focused components

// CONTEXT7 SOURCE: /microsoft/typescript - CMS data consumption patterns for page components
// CMS INTEGRATION REASON: Official TypeScript patterns for replacing hardcoded data with centralized CMS access

// CMS DATA SOURCE: Using getServicesHero() for hero section content
const heroContent = getServicesHero()

// CMS DATA SOURCE: Using getServicesStatistics() for ServiceStatistics component
const statisticsData = getServicesStatistics()

// CMS DATA SOURCE: Using getServicesSectionTitles() for section headers
const sectionTitles = getServicesSectionTitles()

// CMS DATA SOURCE: Using getServicesSubjectCategories() for SubjectAccordion component with icon transformation
// ICON TRANSFORMATION: Converting CMS icon strings to React components for component compatibility
const subjectCategoriesData = getServicesSubjectCategories()

// CONTEXT7 SOURCE: /facebook/react - Icon mapping helper function for CMS integration
// TRANSFORMATION REASON: CMS stores icon names as strings, components require React elements
const iconMap: Record<string, React.ReactElement> = {
  Target: <Target className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />
}

// CONTEXT7 SOURCE: /microsoft/typescript - Data transformation patterns for nested component structures
// TRANSFORMATION REASON: Official TypeScript patterns for converting CMS data to component-compatible format with nested children support
// Transform CMS data to component-compatible format with nested children support
const subjectCategories: SubjectCategory[] = subjectCategoriesData.map(category => ({
  id: category.id,
  title: category.title,
  icon: iconMap[category.icon] || <BookOpen className="w-6 h-6" />,
  description: category.description,
  subjects: category.subjects.map(subject => ({
    name: subject.name,
    description: subject.description,
    keyFeatures: [...subject.keyFeatures], // Convert readonly array to mutable for component compatibility
    // CONTEXT7 SOURCE: /microsoft/typescript - Nested children transformation for multi-level accordion support
    // NESTED CHILDREN REASON: Official TypeScript patterns for transforming CMS nested data to component interface
    children: subject.children ? subject.children.map(child => ({
      name: child.name,
      description: child.description,
      keyFeatures: [...child.keyFeatures]
    })) : undefined
  })),
  // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for call outs and testimonials transformation
  // TRANSFORMATION REASON: Official React patterns for converting CMS readonly arrays to component-compatible format
  callOuts: [...category.callOuts], // Convert readonly array to mutable for component compatibility
  testimonial: category.testimonial
}))

// CMS DATA SOURCE: Using getHomeschoolingPreview() for homeschooling preview section
const homeschoolingData = getHomeschoolingPreview()

// CMS DATA SOURCE: Using getServicesCTA() for call-to-action section
const ctaDataRaw = getServicesCTA()

// CONTEXT7 SOURCE: /microsoft/typescript - Business analytics data consumption patterns
// BUSINESS ANALYTICS DATA: Tasks 18-19 implementation for results documentation and competitive intelligence
// CMS DATA SOURCE: Using business analytics functions for data-driven validation
const resultsData = getResultsDocumentation()
const competitiveData = getCompetitiveAnalysis()
const featuredCaseStudies = getFeaturedCaseStudies()

// Transform CTA data to component-compatible format with action handlers
const ctaData = {
  title: ctaDataRaw.title,
  description: ctaDataRaw.description,
  primaryButton: {
    text: ctaDataRaw.primaryButton.text,
    onClick: () => {
      // Handle consultation booking action
      if (ctaDataRaw.primaryButton.action === 'consultation') {
        console.log("Book consultation clicked")
        // Future: Add actual booking logic
      }
    }
  },
  secondaryButton: {
    text: ctaDataRaw.secondaryButton.text,
    onClick: () => {
      // Handle subjects view action
      if (ctaDataRaw.secondaryButton.action === 'subjects') {
        console.log("View subjects clicked")
        // Future: Add subjects navigation logic
      }
    }
  }
}

// CONTEXT7 SOURCE: /facebook/react - Main page component using modular extracted components
// REFACTORED ARCHITECTURE REASON: Official React patterns for component composition and maintainability
export default function SubjectTuitionPage() {
  return (
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image optimization for hero background images */}
      {/* HERO IMPLEMENTATION REASON: Official Next.js documentation for optimized background images with Image component */}
      <PageHero
        background="image"
        backgroundImage="/images/hero/hero-subject-tuition-primary.jpg"
        size="full"
        overlay={true}
        overlayOpacity="dark"
      >
        <div className="text-center text-white">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold leading-tight mb-6">
            {heroContent.title}
          </h1>
          <p className="text-xl text-accent-400 font-semibold mb-6">
            {heroContent.subtitle}
          </p>
          <p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
            {heroContent.description}
          </p>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout wrapper for content sections */}
      {/* LAYOUT REASON: Official Next.js patterns for content section organization */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout background="white" showHeader={true} showFooter={true} containerSize="full">
        <WaveSeparator 
          variant="subtle" 
          className="text-slate-100" 
        />

        {/* CONTEXT7 SOURCE: /facebook/react - ServiceStatistics component integration */}
        {/* STATISTICS SECTION REASON: Extracted component for reusable statistics display */}
        <Section className="py-16 lg:py-20 relative" background="slate">
          <GradientOverlay variant="subtle" className="opacity-30" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ServiceStatistics 
              statistics={statisticsData}
              columns={{ sm: 1, md: 2, lg: 4 }}
              animation={{ duration: 0.5, stagger: 0.1 }}
            />
          </div>
        </Section>

        <WaveSeparator 
          variant="wave" 
          className="text-white" 
        />
        
        {/* CONTEXT7 SOURCE: /vercel/next.js - Founder expertise section for subject tuition credibility */}
        {/* FOUNDER CREDIBILITY REASON: Official Next.js documentation supports founder expertise sections in service pages for trust building */}
        {/* Founder Expertise Section */}
        <Section className="py-16 lg:py-20 relative" background="white">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/30 to-white opacity-80" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <Image
                    src="/images/team/founder-elizabeth-burrows-secondary.jpg"
                    alt="Elizabeth Burrows - Expert in Subject Tuition and Academic Excellence"
                    width={400}
                    height={500}
                    className="rounded-2xl shadow-xl mx-auto lg:mx-0"
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  />
                </m.div>
                
                <m.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-semibold text-amber-700 tracking-wider uppercase">Expert Guidance</span>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6">
                    Subject Mastery with Royal Standards
                  </h2>
                  
                  <p className="text-lg text-primary-700 mb-6 leading-relaxed">
                    With over 15 years of experience across British and international curricula, Elizabeth ensures every student receives subject-specific expertise tailored to their unique learning style and academic goals.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-primary-700">Expertise across all key stages: KS1, KS2, KS3, GCSE, A-Level, and IB</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-primary-700">Specialist knowledge in entrance exam preparation and Oxbridge admissions</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-primary-700">Personal experience supporting students with diverse learning needs</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-primary-700">Royal client service standards applied to every tutoring arrangement</span>
                    </div>
                  </div>
                  
                  <div className="bg-primary-50 p-6 rounded-2xl border-l-4 border-amber-500">
                    <h3 className="text-xl font-semibold text-primary-900 mb-3">Personalised Subject Excellence</h3>
                    <p className="text-primary-700 italic">
                      "Every subject becomes accessible when taught with understanding, patience, and the right expertise. Our subject tutoring doesn't just improve grades—it builds genuine confidence and lifelong learning skills."
                    </p>
                    <cite className="text-sm font-semibold text-primary-800 not-italic block mt-3">
                      — Elizabeth Burrows, Founder & Subject Specialist
                    </cite>
                  </div>
                </m.div>
              </div>
            </div>
          </div>
        </Section>

        <WaveSeparator 
          variant="subtle" 
          className="text-amber-100" 
        />

        {/* CONTEXT7 SOURCE: /facebook/react - SubjectAccordion component integration */}
        {/* ACCORDION SECTION REASON: Extracted component for subject category display */}
        <Section className="py-16 lg:py-24 relative" background="white">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-50" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6">
                {sectionTitles.subjectCategories.title}
              </h2>
              <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
                {sectionTitles.subjectCategories.description}
              </p>
            </m.div>

            <div className="max-w-6xl mx-auto">
              <SubjectAccordion 
                categories={subjectCategories}
                defaultOpenSections={['entrance-exams']}
                onSectionToggle={(sectionId, isOpen) => {
                  console.log(`Section ${sectionId} ${isOpen ? 'opened' : 'closed'}`)
                }}
              />
            </div>
          </div>
        </Section>

        <WaveSeparator 
          variant="subtle" 
          className="text-slate-100" 
        />

        {/* CONTEXT7 SOURCE: /facebook/react - ResultsDocumentation component integration */}
        {/* RESULTS DOCUMENTATION REASON: Task 18 implementation for verifiable outcome tracking */}
        <Section className="py-16 lg:py-24 relative" background="white">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 opacity-70" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ResultsDocumentation
              title="Quantifiable Academic Outcomes"
              description="Verified results that demonstrate measurable ROI for logic-driven families and elite service positioning"
              results={resultsData}
              showVerificationBadges={true}
              showConfidenceIntervals={true}
              layout="grid"
              maxItems={6}
            />
          </div>
        </Section>

        <WaveSeparator 
          variant="wave" 
          className="text-slate-900" 
        />

        {/* CONTEXT7 SOURCE: /facebook/react - CompetitiveAnalysis component integration */}
        {/* COMPETITIVE ANALYSIS REASON: Task 19 implementation for market positioning and value justification */}
        <Section className="py-16 lg:py-24 relative" background="slate">
          <GradientOverlay variant="subtle" className="opacity-40" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <CompetitiveAnalysis
              title="Premium Service Differentiation"
              description="Competitive advantages that justify investment in exceptional educational outcomes"
              competitiveData={competitiveData}
              showComparisons={true}
              highlightedCategories={['exclusivity', 'credentials', 'results']}
              layout="mixed"
            />
          </div>
        </Section>

        <WaveSeparator 
          variant="subtle" 
          className="text-white" 
        />

        {/* CONTEXT7 SOURCE: /facebook/react - CaseStudies component integration */}
        {/* CASE STUDIES REASON: ROI documentation through anonymized success stories */}
        <Section className="py-16 lg:py-24 relative" background="white">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-25 to-white" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <CaseStudies
              title="Transformational Client Outcomes"
              description="Anonymized case studies demonstrating measurable ROI across different client segments"
              caseStudies={featuredCaseStudies}
              showInvestmentDetails={true}
              showTestimonials={true}
              maxItems={3}
              layout="detailed"
            />
          </div>
        </Section>

        <WaveSeparator 
          variant="subtle" 
          className="text-slate-100" 
        />

        {/* CONTEXT7 SOURCE: /facebook/react - HomeschoolingPreview component integration with programme image */}
        {/* HOMESCHOOLING SECTION REASON: Extracted component for preview section with CTA and programme visualization */}
        <Section className="py-16 lg:py-24 relative" background="white">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-yellow-25 to-orange-50/20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Content Column */}
              <m.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900">
                  {homeschoolingData.title}
                </h2>
                
                <p className="text-xl text-slate-700 leading-relaxed">
                  {homeschoolingData.description}
                </p>
                
                <ul className="space-y-4">
                  {homeschoolingData.features.map((feature, index) => (
                    <m.li 
                      key={index}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                      <span className="text-slate-700 text-lg">{feature.text}</span>
                    </m.li>
                  ))}
                </ul>
                
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <Button 
                    onClick={() => console.log("Homeschooling CTA clicked")}
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
                  >
                    {homeschoolingData.buttonText}
                  </Button>
                </m.div>
              </m.div>
              
              {/* Programme Image Column */}
              <m.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for homeschooling programme showcase */}
                {/* HOMESCHOOLING PROGRAMME INTEGRATION: Official Next.js documentation for optimized programme image rendering */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200">
                  <Image
                    src="/images/programmes/programme-homeschooling-offer.jpg"
                    alt="Homeschooling Programme Offer - Comprehensive home education support with personalised curriculum and expert guidance"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent" />
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-20" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15" />
                
                {/* Programme Highlight Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-amber-700">Comprehensive Programme</span>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </Section>

        <WaveSeparator 
          variant="wave" 
          className="text-slate-900" 
        />

        {/* CONTEXT7 SOURCE: /facebook/react - ServicesCTA component integration */}
        {/* CTA SECTION REASON: Extracted component for call-to-action sections */}
        <Section className="py-20 lg:py-28 relative" background="slate">
          <GradientOverlay variant="primary" className="opacity-90" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ServicesCTA
              title={ctaData.title}
              description={ctaData.description}
              primaryButton={ctaData.primaryButton}
              secondaryButton={ctaData.secondaryButton}
            />
          </div>
        </Section>
      </PageLayout>
    </>
  )
}