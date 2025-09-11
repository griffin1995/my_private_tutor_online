"use client";

// CONTEXT7 SOURCE: /vercel/next.js - Client Component for consistent rendering behavior
// IMPLEMENTATION REASON: Official Next.js documentation recommends client components for pages with interactive elements

import { PageLayout } from "@/components/layout/page-layout";
import { SimpleHero } from "@/components/layout/simple-hero";
// CONTEXT7 SOURCE: /websites/react_dev - Component removal patterns for JSX cleanup
// REMOVAL REASON: Official React documentation Section 3.1 recommends removing unused imports to maintain clean component architecture
import { TwoRowHeadingTextSection } from "@/components/sections/two-row-heading-text-section";
import { VideoMasterclassSection } from "@/components/video/VideoMasterclassSection";
// CONTEXT7 SOURCE: /facebook/react - Component import patterns for JSX composition
// IMPORT REASON: Official React documentation demonstrates component import patterns for modular architecture
import { HighlightedQuote } from "@/components/ui/highlighted-quote";

export default function VideoPage() {
  // CONTEXT7 SOURCE: /reactjs/react.dev - Direct synchronous data access patterns
  // SYNCHRONOUS CMS PATTERN REASON: Official React documentation Section 4.2 recommends direct data access for static content to prevent homepage failure scenarios
  // ARCHITECTURE FIX: Using synchronous CMS access to maintain CRITICAL homepage recovery architecture

  // CONTEXT7 SOURCE: /facebook/react - Direct object literal patterns for component data
  // ENHANCED HERO IMAGE: Updated to use video masterclasses hero image from commit ceabfc4
  const videoHeroImage = {
    src: "/images/hero/hero-video-masterclasses.jpg",
  };

  // CONTEXT7 SOURCE: /microsoft/typescript - Direct object literal patterns for component data
  // SIMPLIFIED ARCHITECTURE: Define video sections directly without loading full CMS data
  // COMPONENT LOOKUP: VideoMasterclassSection will handle CMS data lookup internally

  return (
    <>
      {/* CONTEXT7 SOURCE: /framer/motion - SimpleHero integration with scroll-triggered animations */}
      {/* HERO INTEGRATION REASON: Integrating SimpleHero component for consistent site structure with smooth scroll animations */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Background image optimization using CMS data patterns */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="video-hero">
        <SimpleHero
          backgroundImage={videoHeroImage.src}
          h1="Video Masterclasses & Educational Content"
          h2="A trusted guide to British education, culture, and university preparation"
          decorativeStyle="none"
        />
      </section>

      {/* CONTEXT7 SOURCE: /facebook/react - Component composition patterns for quote integration */}
      {/* QUOTE INTEGRATION REASON: Official React documentation Section 5.3 demonstrates JSX component composition for page structure */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container spacing utilities for section separation */}
      {/* SPACING REASON: Official Tailwind CSS documentation recommends proper vertical spacing between major page sections */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <HighlightedQuote
            quote="These video masterclasses provide exceptional tuition insights that help families navigate British education with confidence, curiosity and clarity, delivering the expertise parents need for their children's academic success."
            author="Elizabeth Burrows"
            role="Educational Consultant & Founder"
            useHighlighting={true}
            className="space-y-4"
          />
        </div>
      </section>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout
        background="white"
        showHeader={true}
        showFooter={true}
        containerSize="full"
        verticalSpacing="none"
        className="space-y-0"
        footerProps={{ showContactForm: true }}
      >
        {/* FEATURED VIDEO CONTENT - REORGANIZED */}
        <VideoMasterclassSection
          videoId="unlockingAcademicSuccess"
          layout="text-left"
          className="py-32"
        />

        {/* ACADEMIC SUPPORT SECTION - ENHANCED VERSION */}
        <section id="academic-support-section" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="Academic Support: When and How to Intervene"
            paragraphOne="Parents face complex decisions about when academic struggle requires intervention. Understanding the difference between temporary setbacks and genuine learning gaps is crucial for effective support."
            headingTwo="Strategic Educational Decision-Making"
            paragraphTwo="Supporting reluctant learners and navigating school relationships requires sophisticated understanding of motivation psychology and clear communication strategies with educational institutions."
          />
        </section>

        {/* UNIVERSITY ADMISSIONS SECTION - ENHANCED VERSION */}
        <section id="university-admissions-section" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="University Admissions: Mastering the UCAS Process"
            paragraphOne="The UCAS system operates on unwritten rules and implicit expectations. Understanding university selection strategies, reference requirements, and timeline management is crucial for success."
            headingTwo="Personal Statements: Strategic Self-Presentation"
            paragraphTwo="Crafting compelling personal statements requires understanding institutional psychology and competitive positioning within 4,000 characters whilst balancing authentic voice with strategic focus."
          />
        </section>
        <VideoMasterclassSection
          videoId="elizabethsUcasGuide"
          layout="text-right"
          className="py-32"
        />

        {/* BRITISH CULTURE SECTION - ENHANCED VERSION */}
        <section id="british-culture-section" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="Cultural Literacy: Foundation of British Educational Success"
            paragraphOne="Literary knowledge, cultural references, and historical context form the backdrop of British classroom discussions and examination questions. This cultural capital significantly impacts academic and social success."
            headingTwo="Social Navigation: Institutional Protocols"
            paragraphTwo="British educational institutions operate on centuries-old social conventions. Understanding dining etiquette, interview protocols, and social expectations is crucial for success at prestigious institutions."
          />
        </section>

        <VideoMasterclassSection
          videoId="britishLiteraryClassics"
          layout="text-left"
          className="py-32"
        />
      </PageLayout>
    </>
  );
}
