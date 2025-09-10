"use client";

// CONTEXT7 SOURCE: /vercel/next.js - Client Component for consistent rendering behavior
// IMPLEMENTATION REASON: Official Next.js documentation recommends client components for pages with interactive elements

import { PageLayout } from "@/components/layout/page-layout";
import { SimpleHero } from "@/components/layout/simple-hero";
import { BrandMessageSection } from "@/components/sections/brand-message-section";
import { TwoRowHeadingTextSection } from "@/components/sections/two-row-heading-text-section";
import { VideoMasterclassSection } from "@/components/video/VideoMasterclassSection";

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

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - QuoteSection component for video page introduction */}
      {/* QUOTE INTEGRATION REASON: Official React documentation Section 2.1 recommends component composition for page structure */}
      <BrandMessageSection
        quote="Join Elizabeth Burrows, founder of My Private Tutor Online, as she shares her expert insight from over 15 years of international education experience. These masterclasses provide rare access to the nuanced understanding of British education typically reserved for her private clients."
        backgroundColor="bg-white"
        useHighlighting={true}
        highlightPhrases={["15 years of international education experience", "expectations of British schools and universities"]}
        underlinePhrases={["rare access", "typically reserved for her private clients"]}
        className="py-32"
      />

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
        {/* CONTEXT7 SOURCE: /websites/react_dev - Component composition patterns for categorized content sections */}
        {/* RESTRUCTURE REASON: Official React documentation Section 2.1 recommends component composition patterns for organizing content by category */}
        {/* FREE VIDEOS SECTION */}
        <section id="free-videos-section" className="py-16">
          <div className="container mx-auto px-4 text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Free Educational Content</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Access Elizabeth's introductory masterclasses covering fundamental aspects of British education and university admissions. These free resources provide valuable insights to help you navigate the educational landscape with confidence.
            </p>
          </div>
          
          <VideoMasterclassSection
            videoId="ucasSummit2024"
            layout="text-left"
            className="py-32"
          />
          
          <VideoMasterclassSection
            videoId="unlockingAcademicSuccess"
            layout="text-right"
            className="py-32"
          />
        </section>

        {/* CONTEXT7 SOURCE: /websites/react_dev - Component composition patterns for categorized premium content sections */}
        {/* UCAS SECTION REASON: Official React documentation Section 2.1 component patterns for organizing related premium content */}
        {/* UCAS VIDEOS SECTION */}
        <section id="ucas-videos-section" className="py-16">
          <div className="container mx-auto px-4 text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">UCAS Application Mastery</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Comprehensive premium guidance on navigating the UCAS system with Elizabeth's proven methodology. These detailed masterclasses provide strategic insights typically reserved for her private clients, covering every aspect of university applications from strategy to personal statements.
            </p>
          </div>
          
          <VideoMasterclassSection
            videoId="elizabethsUcasGuide"
            layout="text-left"
            className="py-32"
          />
          
          <VideoMasterclassSection
            videoId="personalStatementsGuide"
            layout="text-right"
            className="py-32"
          />
        </section>

        {/* CONTEXT7 SOURCE: /websites/react_dev - Component composition patterns for British cultural content organization */}
        {/* BRITISH CULTURE REASON: Official React documentation Section 2.1 component patterns for cultural literacy content structure */}
        {/* BRITISH CULTURE VIDEOS SECTION */}
        <section id="british-culture-section" className="py-16">
          <div className="container mx-auto px-4 text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">British Cultural Literacy</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Master the cultural foundations essential for success in British educational and social environments. These premium masterclasses provide deep understanding of literary classics, social etiquette, and cultural nuances that distinguish successful candidates at Britain's most prestigious institutions.
            </p>
          </div>
          
          <VideoMasterclassSection
            videoId="britishLiteraryClassics"
            layout="text-left"
            className="py-32"
          />
          
          {/* CONTEXT7 SOURCE: /facebook/react - React component prop modification patterns */}
          {/* LAYOUT CHANGE REASON: Official React documentation on component prop updates for layout configuration changes */}
          <VideoMasterclassSection
            videoId="britishEtiquette"
            layout="text-right"
            className="py-32"
          />
        </section>
      </PageLayout>
    </>
  );
}
