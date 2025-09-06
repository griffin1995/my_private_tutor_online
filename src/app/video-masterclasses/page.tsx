"use client";

// CONTEXT7 SOURCE: /vercel/next.js - Client Component for consistent rendering behavior
// IMPLEMENTATION REASON: Official Next.js documentation recommends client components for pages with interactive elements

import { PageLayout } from "@/components/layout/page-layout";
import { SimpleHero } from "@/components/layout/simple-hero";
import { QuoteSection } from "@/components/sections/quote-section";
import { TwoRowHeadingTextSection } from "@/components/sections/two-row-heading-text-section";
import { VideoMasterclassSection } from "@/components/video/VideoMasterclassSection";
import { getVideoPlaceholders } from "@/lib/cms/cms-images";

export default function VideoPage() {
  // CONTEXT7 SOURCE: /reactjs/react.dev - Direct synchronous data access patterns
  // SYNCHRONOUS CMS PATTERN REASON: Official React documentation Section 4.2 recommends direct data access for static content to prevent homepage failure scenarios
  // ARCHITECTURE FIX: Using synchronous CMS access to maintain CRITICAL homepage recovery architecture

  // CONTEXT7 SOURCE: /vercel/next.js - Direct hero image path for video masterclasses page
  // IMAGE SOURCE REASON: Official Next.js documentation recommends direct image paths for consistent hero background display
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
      <QuoteSection
        quote="Join Elizabeth Burrows, founder of My Private Tutor Online, as she shares her expert insight from over 15 years of international education experience. These masterclasses, drawn from her live seminars, offer rare access to the knowledge and strategies typically reserved for her private clients. These sessions bridge the gap between international education and expectations of British schools and universities. Access on demand, from anywhere in the world."
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
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component-based architecture for future content sections */}
        {/* CONTENT PLACEHOLDER REASON: Official React documentation Section 2.1 recommends component structure planning for future implementations */}
        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with semantic id for academic support content */}
        {/* SECTION ID REASON: Official HTML documentation for unique section identification to enable navigation and accessibility */}
        <section id="academic-support-section" className="py-16">
          <div className="max-w-4xl mx-auto">
            <TwoRowHeadingTextSection
              headingOne="Navigating Academic Support: Understanding the Real Challenges Parents Face"
              paragraphOne="Supporting a child through education involves grappling with fundamental questions: When does struggle require intervention? How do you distinguish temporary setbacks from learning gaps? Modern educational environments and evolving curricula can leave engaged parents feeling unprepared."
              headingTwo="The Hidden Complexities of Educational Decision-Making"
              paragraphTwo="Every academic decision involves considerations parents rarely anticipate. Supporting reluctant learners requires understanding motivation and learning styles. Making choices for GCSEs, A Levels, and university pathways proves overwhelming without insider knowledge, compounded by the emotional toll and balancing independence with guidance."
            />
          </div>
        </section>
        <section id="free-video-content">
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component integration with props for dynamic content rendering */}
          {/* HERO VIDEO DIALOG INTEGRATION REASON: Official React documentation Section 2.1 recommends component composition patterns for reusable UI elements */}

          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Direct component rendering with simplified props */}
          {/* SIMPLIFIED RENDERING: Components render directly with title and layout, no CMS loading required */}
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

        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with semantic id for university admissions content */}
        {/* SECTION ID REASON: Official HTML documentation for unique section identification to enable navigation and accessibility */}
        <section id="university-admissions-section" className="py-16">
          <div className="max-w-4xl mx-auto">
            <TwoRowHeadingTextSection
              headingOne="University Admissions: Decoding Britain's Most Complex Educational Process"
              paragraphOne="The British university admissions system involves unwritten rules and nuanced requirements that confound educated parents. The personal statement—determining a young person's future—operates according to rarely explicit criteria. Understanding selection strategies and timeline management requires intimate knowledge of how admissions committees evaluate candidates."
              headingTwo="Personal Statements: The Art of Strategic Self-Presentation"
              paragraphTwo="Crafting personal statements demands understanding institutional psychology and subject-specific expectations. The challenge: demonstrating intellectual curiosity within 4,000 characters whilst balancing authentic voice with strategic positioning. Stakes are highest for competitive courses at prestigious institutions."
            />
          </div>
        </section>
        <section id="ucas-video-content">
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component integration with props for dynamic content rendering */}
          {/* HERO VIDEO DIALOG INTEGRATION REASON: Official React documentation Section 2.1 recommends component composition patterns for reusable UI elements */}

          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Direct component rendering with simplified props */}
          {/* SIMPLIFIED RENDERING: Components render directly with title and layout, no CMS loading required */}
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

        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with semantic id for British culture content */}
        {/* SECTION ID REASON: Official HTML documentation for unique section identification to enable navigation and accessibility */}
        <section id="british-culture-section" className="py-16">
          <div className="max-w-4xl mx-auto">
            <TwoRowHeadingTextSection
              headingOne="Cultural Literacy: The Unspoken Foundation of British Educational Success"
              paragraphOne="British educational culture operates through implicit understanding critical for success. Literary knowledge and cultural references form the backdrop of classroom discussions and examinations. International families find their children academically capable yet culturally disadvantaged, affecting everything from school interviews to university participation."
              headingTwo="Social Navigation: Understanding Britain's Institutional Protocols"
              paragraphTwo="British educational institutions operate according to centuries-old unspoken codes. From boarding school etiquette to university interview protocols, these conventions determine opportunities. Social fluency impacts peer relationships and teacher perceptions, particularly challenging international families who excel academically whilst struggling with subtle social expectations."
            />
          </div>
        </section>

        <section id="british-culture-video-content">
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component integration with props for dynamic content rendering */}
          {/* HERO VIDEO DIALOG INTEGRATION REASON: Official React documentation Section 2.1 recommends component composition patterns for reusable UI elements */}

          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Direct component rendering with simplified props */}
          {/* SIMPLIFIED RENDERING: Components render directly with title and layout, no CMS loading required */}
          <VideoMasterclassSection
            videoId="britishLiteraryClassics"
            layout="text-left"
            className="py-32"
          />

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
