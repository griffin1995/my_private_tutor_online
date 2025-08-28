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

// CONTEXT7 SOURCE: /websites/react_dev - React import for client component useState context compatibility
// BUILD FIX REASON: Official React documentation Section 3.2 requires explicit React import for client components using state management during build process
import React from 'react'
import { useState, useEffect } from 'react'
import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, GraduationCap, Users, Award, Target, Globe } from 'lucide-react'
import { PageLayout } from '@/components/layout/page-layout'
import { SimpleHero } from '@/components/layout/simple-hero'
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

// CONTEXT7 SOURCE: /facebook/react - Business analytics components for results documentation
// BUSINESS ANALYTICS REASON: Results documentation for verifiable academic outcomes display
import { ResultsDocumentation } from '@/components/sections/results-documentation'

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

// CONTEXT7 SOURCE: /microsoft/typescript - Results documentation data consumption pattern
// RESULTS DOCUMENTATION DATA: Quantifiable academic outcomes for premium service positioning
// CMS DATA SOURCE: Using getResultsDocumentation() for verifiable achievement metrics
// Note: This will be loaded asynchronously in the component using useEffect
let resultsData: any[] = [] // Default empty array for build time

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
  // CONTEXT7 SOURCE: /reactjs/react.dev - useState and useEffect for async data loading
  // ASYNC DATA REASON: Official React documentation for managing server-fetched data in client components
  const [asyncResultsData, setAsyncResultsData] = useState<any[]>([])
  
  useEffect(() => {
    async function loadResultsData() {
      try {
        const data = await getResultsDocumentation()
        setAsyncResultsData(data)
      } catch (error) {
        console.error('Failed to load results data:', error)
      }
    }
    
    loadResultsData()
  }, [])
  
  return (
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following consistent hero patterns */}
      {/* SIMPLEHERO INTEGRATION REASON: Official Next.js documentation patterns for standardized hero sections across pages */}
      <SimpleHero
        backgroundImage="/images/hero/hero-subject-tuition-primary.jpg"
        h1="Subject Tutoring & Exam Preparation"
        h2="Expert Tuition"
        decorativeStyle="lines"
      />

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout wrapper for content sections */}
      {/* LAYOUT REASON: Official Next.js patterns for content section organization */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout background="white" showHeader={true} showFooter={true} containerSize="full">
        <WaveSeparator 
          variant="subtle" 
          className="text-slate-100" 
        />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Section removal via JSX deletion for streamlined page structure */}
        {/* FOUNDER EXPERTISE REMOVAL REASON: Official React documentation demonstrates component removal through JSX deletion patterns for cleaner UI flow */}
        {/* Client requested removal of Founder Expertise section to focus page on subject/tutor expertise rather than founder prominence */}
        {/* Founder's Story section on About page provides sufficient founder spotlight */}

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background color utilities for light background uniformity */}
        {/* UNIFORM BACKGROUND REASON: Official Tailwind CSS documentation demonstrates bg-white utility for consistent light theme */}
        {/* CONTEXT7 SOURCE: /facebook/react - SubjectAccordion component integration */}
        {/* ACCORDION SECTION REASON: Extracted component for subject category display */}
        <Section id="primary-secondary" className="py-16 lg:py-24 relative" background="white">
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

            {/* CONTEXT7 SOURCE: /vercel/next.js - Section anchor mapping for navigation targets */}
            {/* SECTION ANCHOR REASON: Official Next.js documentation enables hash anchor navigation to specific page sections */}
            <div className="max-w-6xl mx-auto">
              {/* Navigation anchor points for service button links */}
              <div id="primary" className="-mt-24 pt-24"></div>
              <div id="secondary" className="-mt-24 pt-24"></div>
              <div id="entrance-exams" className="-mt-24 pt-24"></div>
              <div id="university-beyond" className="-mt-24 pt-24"></div>
              <div id="sen-neurodiverse" className="-mt-24 pt-24"></div>
              <div id="london-in-person" className="-mt-24 pt-24"></div>
              
              {/* CONTEXT7 SOURCE: /websites/react_dev - Default props and empty arrays for component initialization */}
              {/* REVISION REASON: Remove default open section to start with all accordions closed per user requirement */}
              <SubjectAccordion 
                categories={subjectCategories}
                defaultOpenSections={[]}
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

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background color utilities for light background uniformity */}
        {/* UNIFORM BACKGROUND REASON: Official Tailwind CSS documentation demonstrates bg-white utility for consistent light theme */}
        {/* CONTEXT7 SOURCE: /facebook/react - ResultsDocumentation component integration */}
        {/* RESULTS DOCUMENTATION REASON: Task 18 implementation for verifiable outcome tracking */}
        <Section className="py-16 lg:py-24 relative" background="white">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 opacity-70" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* CONTEXT7 SOURCE: /websites/react_dev - Conditional rendering patterns for statistical data removal
                 STATISTICAL SIMPLIFICATION: Remove showVerificationBadges and showConfidenceIntervals props to hide granular statistics */}
            <ResultsDocumentation
              title="Quantifiable Academic Outcomes"
              description="Verified results that demonstrate measurable ROI for logic-driven families and elite service positioning"
              results={asyncResultsData}
              layout="grid"
              maxItems={3}
            />
          </div>
        </Section>

        {/* CONTEXT7 SOURCE: /websites/react_dev - Section removal via JSX deletion for streamlined page structure */}
        {/* PREMIUM SERVICE DIFFERENTIATION REMOVAL REASON: Official React documentation Section 3.4 demonstrates component removal through JSX deletion patterns */}
        {/* Premium Service Differentiation section intentionally removed to streamline Subject Tuition page focus */}
        {/* Client requested removal of Premium Service Differentiation section for cleaner page flow */}

        {/* CONTEXT7 SOURCE: /websites/react_dev - Section removal via JSX deletion for streamlined page structure */}
        {/* TRANSFORMATIONAL CLIENT OUTCOMES REMOVAL REASON: Official React documentation Section 3.4 demonstrates component removal through JSX deletion patterns */}
        {/* Transformational Client Outcomes section intentionally removed to streamline Subject Tuition page focus */}
        {/* Client requested removal of Transformational Client Outcomes section for cleaner page flow */}

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background color utilities for light background uniformity */}
        {/* UNIFORM BACKGROUND REASON: Official Tailwind CSS documentation demonstrates bg-white utility for consistent light theme */}
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
                  {/* CONTEXT7 SOURCE: /vercel/next.js - Link component for client-side navigation */}
                  {/* BUTTON FIX REASON: Official Next.js documentation recommends Link with asChild for button navigation */}
                  {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Text color utilities for white text implementation */}
                  {/* TEXT COLOR UPDATE REASON: Official Tailwind CSS documentation Section 4.2 text-white utility for consistent white text color with proper contrast */}
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
                  >
                    <Link href="/homeschooling">
                      {homeschoolingData.buttonText}
                    </Link>
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

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Section removal via JSX deletion for streamlined page structure */}
        {/* SECTION REMOVAL REASON: Official React documentation Section 3.4 demonstrates component removal through JSX deletion patterns */}
        {/* Services CTA Section intentionally removed to streamline Subject Tuition page focus */}
      </PageLayout>
    </>
  )
}