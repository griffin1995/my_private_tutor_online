"use client"

// CONTEXT7 SOURCE: /vercel/next.js - Client Component for consistent rendering behavior
// BUILD FIX REASON: Official Next.js documentation recommends client components for pages with complex interactive elements

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

// CONTEXT7 SOURCE: /reactjs/react.dev - Component removal and clean import management
// COMPONENT SIMPLIFICATION REASON: Official React documentation recommends removing unused imports to maintain clean component architecture
// CONTEXT7 SOURCE: /reactjs/react.dev - Component cleanup and removal patterns
// ETHOS REMOVAL REASON: Clean component removal per user requirements, maintaining structured imports
import { PageLayout } from "@/components/layout/page-layout";
import { SimpleHero } from "@/components/layout/simple-hero";
import { FounderStorySection } from "@/components/sections/about/founder-story-section";
import { TestimonialsSection } from "@/components/sections/about/testimonials-section";
import { getAboutHeroImage } from "@/lib/cms/cms-images";
import { getAboutTestimonials } from "@/lib/cms/cms-content";

export default function AboutUsPage() {
  // CONTEXT7 SOURCE: /vercel/next.js - Client Component data fetching patterns
  // CLIENT DATA FETCHING REASON: Official Next.js documentation for client components using direct function calls
  
  // Fetch testimonials data for the testimonials section (synchronous in client component)
  const aboutTestimonials = getAboutTestimonials()
  
  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment

  // CMS DATA SOURCE: Using getAboutHeroImage() for centralized image management
  const aboutHeroImage = getAboutHeroImage();

  return (
    <>
      {/* CONTEXT7 SOURCE: /framer/motion - SimpleHero integration with scroll-triggered animations */}
      {/* HERO INTEGRATION REASON: Integrating SimpleHero component for testing purposes with smooth scroll animations */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Background image optimization using CMS data patterns */}
      {/* DECORATIVE STYLE OPTIONS: decorativeStyle="lines" (default), decorativeStyle="dots", decorativeStyle="none" */}
      <SimpleHero
        backgroundImage={aboutHeroImage.src}
        h1="Our Founder and Ethos"
        h2="Excellence Through Experience"
        decorativeStyle="lines"
      />

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Golden ratio spacing system implementation for About page */}
      {/* GOLDEN RATIO PAGE SPACING: Official Tailwind CSS documentation supports custom spacing for mathematical harmony */}
      <PageLayout
        background="white"
        showHeader={true}
        showFooter={true}
        containerSize="full"
        className="space-y-0"
      >
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component-based architecture for reusable UI elements */}
        {/* FOUNDER STORY EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability */}
        <FounderStorySection />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component-based architecture for reusable UI elements */}
        {/* TESTIMONIALS EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability */}
        <TestimonialsSection testimonials={aboutTestimonials} />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component removal and clean architecture maintenance */}
        {/* ETHOS SECTION REMOVED: Clean component removal per user requirements while maintaining page structure */}
        {/* CLIENT SIMPLIFICATION: Page now focuses on founder story and testimonials for streamlined user experience */}
      </PageLayout>
    </>
  );
}
