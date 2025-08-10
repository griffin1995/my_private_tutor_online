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
      <PageLayout background="white" showHeader={false} showFooter={true}>

          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component-based architecture for reusable UI elements */}
        {/* FOUNDER STORY EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability */}
        <FounderStorySection />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component-based architecture for reusable UI elements */}
        {/* TESTIMONIALS EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability */}
        <TestimonialsSection />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component extraction and composition patterns */}
        {/* ETHOS EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability and reusability */}
        <EthosSection />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component extraction and reusable UI architecture */}
        {/* CTA EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability and reusability */}
        <AboutCtaSection />

      </PageLayout>
    </>
  )
}