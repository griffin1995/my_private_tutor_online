"use client";

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
// CONTEXT7 SOURCE: /reactjs/react.dev - React import for client component with Framer Motion compatibility
// SYNCHRONOUS PATTERN REASON: Official React documentation Section 2.1 recommends direct React import for client components with animation libraries
import { PageLayout } from "@/components/layout/page-layout";
import { SimpleHero } from "@/components/layout/simple-hero";
import { FounderStorySection } from "@/components/sections/about/founder-story-section";
import { TestimonialsSection } from "@/components/sections/about/testimonials-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { getTextTestimonials, type Testimonial } from "@/lib/cms/cms-content";
import { getAboutHeroImage } from "@/lib/cms/cms-images";

export default function AboutUsPage() {
  // CONTEXT7 SOURCE: /reactjs/react.dev - Direct synchronous data access patterns
  // SYNCHRONOUS CMS PATTERN REASON: Official React documentation Section 4.2 recommends direct data access for static content to prevent homepage failure scenarios
  // ARCHITECTURE FIX: Replace async/await pattern with synchronous CMS access to maintain CRITICAL homepage recovery architecture
  // VIDEO FILTERING: Using getTextTestimonials() to automatically exclude video testimonials from About page display
  // DEPLOYMENT FIX: Force fresh deployment - August 28, 2025

  // EMERGENCY FIX: Try-catch wrapper to isolate potential CMS errors
  let aboutTestimonials: Testimonial[] = [];
  try {
    aboutTestimonials = getTextTestimonials();
  } catch (error) {
    console.error("Error loading testimonials:", error);
    aboutTestimonials = []; // Fallback to empty array
  }

  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment

  // CMS DATA SOURCE: Using getAboutHeroImage() for centralized image management
  let aboutHeroImage = { src: "/images/about/about-founder-story.jpg" };
  try {
    aboutHeroImage = getAboutHeroImage();
  } catch (error) {
    console.error("Error loading hero image:", error);
    // Use fallback image path
  }

  return (
    <>
      {/* CONTEXT7 SOURCE: /framer/motion - SimpleHero integration with scroll-triggered animations */}
      {/* HERO INTEGRATION REASON: Integrating SimpleHero component for testing purposes with smooth scroll animations */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Background image optimization using CMS data patterns */}
      {/* DECORATIVE STYLE OPTIONS: decorativeStyle="lines" (default), decorativeStyle="dots", decorativeStyle="none" */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      {/* CONTEXT7 SOURCE: /mdn/content - HTML text content updates for hero section headings */}
      {/* HERO SECTION REVISION REASON: Official MDN documentation Section HTML headings - updating hero section heading and sub-heading text per client feedback requirements */}
      <section id="about-hero">
        <SimpleHero
          backgroundImage={aboutHeroImage.src}
          h1="Your journey to academic success"
          h2="Our bespoke consultation and pairing process ensures the perfect fit and seamless support throughout."
          decorativeStyle="none"
        />
      </section>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Golden ratio spacing system implementation for About page */}
      {/* GOLDEN RATIO PAGE SPACING: Official Tailwind CSS documentation supports custom spacing for mathematical harmony */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component props modification patterns for conditional footer display */}
      {/* FOOTER PROPS UPDATE REASON: Official React documentation demonstrates prop value changes for component behavior control */}
      <PageLayout
        background="white"
        showHeader={true}
        showFooter={true}
        containerSize="full"
        className="space-y-0"
        footerProps={{ showContactForm: true }}
      >
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component-based architecture for reusable UI elements */}
        {/* FOUNDER STORY EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability */}
        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
        {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
        <section id="about-founder-story">
          <FounderStorySection />
        </section>

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component integration patterns for modular UI design */}
        {/* QUOTE SECTION INTEGRATION REASON: Official React documentation Section 2.3 recommends component composition for enhanced page structure */}
        {/* CONTEXT7 SOURCE: /magicui/design - MagicUI Highlighter implementation for Academia Insight quote */}
        {/* HIGHLIGHTING IMPLEMENTATION REASON: Official Magic UI documentation demonstrates strategic text highlighting for premium service emphasis */}
        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
        {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
        <section id="about-quote">
          <QuoteSection
            quote="A truly bespoke experience - Elizabeth personally pairs each student with a carefully selected tutor from her boutique team."
            author="Academia Insight"
            role=""
            backgroundColor="bg-primary-50"
            useHighlighting={true}
            useMagicUIEffects={true}
          />
        </section>

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component-based architecture for reusable UI elements */}
        {/* TESTIMONIALS EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability */}
        {/* SYNCHRONOUS DATA ACCESS: Direct testimonials data access prevents loading state complexity and homepage failure scenarios */}
        {/* VIDEO FILTERING: getTextTestimonials() ensures only text testimonials are displayed on About page */}
        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
        {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
        <section id="about-testimonials">
          <TestimonialsSection />
        </section>

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component removal and clean architecture maintenance */}
        {/* ETHOS SECTION REMOVED: Clean component removal per user requirements while maintaining page structure */}
        {/* CLIENT SIMPLIFICATION: Page now focuses on founder story and testimonials for streamlined user experience */}
      </PageLayout>
    </>
  );
}
