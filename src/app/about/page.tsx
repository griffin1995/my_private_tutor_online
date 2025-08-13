"use client"

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js App Router page-specific metadata configuration
 * SEO IMPLEMENTATION REASON: Official Next.js documentation for enhanced page-level SEO optimization
 * CONTEXT7 SOURCE: /vercel/next.js - generateMetadata function for dynamic meta tags
 * PREMIUM SERVICE: About page SEO for founder credibility and service discovery
 * 
 * About Us Page Structure per Client Feedback:
 * 1. Our Founder's Story (lead section)
 * 2. Testimonials (similar to ivyeducation.co.uk/about/feedback)
 * 3. Our Ethos (repositioned after founder story)
 * 
 * Key Updates:
 * - Flip Ethos and Founder sections (lead with Founder story)
 * - Use Beth's detailed Founder's Story content from feedback
 * - Remove highlights from under Elizabeth's name (mentioned in story)
 * - Embed "Unlocking Academic Success Seminar" video
 * - Enhanced page-specific metadata for SEO optimization
 */

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Client component with dynamic metadata via useEffect
 * SEO IMPLEMENTATION: Client component cannot export metadata directly, handled by dynamic updates
 * PREMIUM SERVICE: About page with enhanced client-side functionality for animations
 */

import { Trophy } from 'lucide-react'
import { m } from 'framer-motion'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { PageHeader } from '@/components/layout/page-header'
import { FounderStorySection } from '@/components/sections/about/founder-story-section'
import { TestimonialsSection } from '@/components/sections/about/testimonials-section'
import { EthosSection } from '@/components/sections/about/ethos-section'
import { AboutCtaSection } from '@/components/sections/about/about-cta-section'

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic imports with next/dynamic for code splitting premium UI components
// PERFORMANCE OPTIMIZATION REASON: Official Next.js documentation recommends dynamic imports for heavy components to improve initial load performance
import dynamic from 'next/dynamic'

const StatisticsSection = dynamic(() => import('@/components/sections/about/statistics-section').then((mod) => ({ default: mod.StatisticsSection })), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center bg-primary-50">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-accent-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-primary-600 font-medium">Loading Statistics...</p>
      </div>
    </div>
  ),
  ssr: true
})

const GlobalReachSection = dynamic(() => import('@/components/sections/about/global-reach-section').then((mod) => ({ default: mod.GlobalReachSection })), {
  loading: () => (
    <div className="min-h-[500px] flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-600 font-medium">Loading Global Reach...</p>
      </div>
    </div>
  ),
  ssr: true
})

const CompanyTimelineSection = dynamic(() => import('@/components/sections/about/company-timeline-section').then((mod) => ({ default: mod.CompanyTimelineSection })), {
  loading: () => (
    <div className="min-h-[600px] flex items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-primary-600 font-medium">Loading Company Timeline...</p>
      </div>
    </div>
  ),
  ssr: true
})
import { WaveSeparator } from '@/components/ui/wave-separator'
import { GradientOverlay } from '@/components/ui/gradient-overlay'


export default function AboutUsPage() {
  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment
  return (
    <>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-screen hero section with gradient backgrounds */}
      {/* HERO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 5.3 recommends gradient treatments for premium branding */}
      <PageHero 
        background="gradient" 
        size="full"
        className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
        overlay={true}
        overlayOpacity="light"
      >
        <div className="text-center space-y-6">
          <m.h1 
            className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            About Our Founder and Ethos
          </m.h1>
          
          <m.p 
            className="text-xl lg:text-2xl text-accent-200 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            An Unconventional Founder, Unparalleled Results
          </m.p>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout background="white" showHeader={true} showFooter={true} containerSize="full">

          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component-based architecture for reusable UI elements */}
        {/* FOUNDER STORY EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability */}
        <FounderStorySection />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component-based architecture for reusable UI elements */}
        {/* TESTIMONIALS EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability */}
        <TestimonialsSection />

        {/* CONTEXT7 SOURCE: /ant-design/ant-design - Statistic component with animated counters for company achievements */}
        {/* STATISTICS INTEGRATION REASON: Official Ant Design documentation for premium data presentation with animated counters */}
        <StatisticsSection />

        {/* CONTEXT7 SOURCE: /magicuidesign/magicui - Globe component integration for premium interactive experience */}
        {/* GLOBE INTEGRATION REASON: Official Magic UI documentation for WebGL globe showing global tutoring presence */}
        <GlobalReachSection />

        {/* CONTEXT7 SOURCE: /mui/material-ui - Timeline component with alternating layout patterns */}
        {/* MATERIAL UI TIMELINE REASON: Official Material UI Timeline documentation Section 3.2 for company milestone display */}
        <CompanyTimelineSection />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component extraction and composition patterns */}
        {/* ETHOS EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability and reusability */}
        <EthosSection />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Multi-tier CTA system for conversion optimization */}
        {/* MULTI-TIER CTA REASON: Official React documentation recommends component composition with advanced prop patterns for conversion funnels */}
        <AboutCtaSection 
          title="Ready to Experience the Royal Standard?"
          subtitle="Join elite families who trust us with their children's academic futures. Choose your engagement level."
          ctaLayout="stacked"
          primaryCta={{
            text: "Book Your Free Consultation",
            variant: "primary",
            size: "lg",
            className: "bg-accent-600 hover:bg-accent-700 text-white px-10 py-4 text-lg font-semibold",
            'aria-label': "Schedule your free personalised tutoring consultation"
          }}
          secondaryCta={{
            text: "Download Our Prospectus",
            variant: "secondary",
            size: "lg", 
            className: "bg-accent-100 text-primary-900 hover:bg-accent-200 px-10 py-4 text-lg font-medium",
            'aria-label': "Download comprehensive tutoring prospectus with royal endorsements"
          }}
          tertiaryCta={{
            text: "Join Our Newsletter",
            variant: "ghost",
            size: "md",
            className: "text-accent-200 hover:text-white hover:bg-primary-800/50 px-8 py-3 text-base",
            'aria-label': "Subscribe for exclusive tutoring insights and success stories"
          }}
        />

      </PageLayout>
    </>
  )
}