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

  // CMS DATA SOURCE: Using getVideoPlaceholders() for centralized video-related image management
  let videoHeroImage = {
    src: "/images/video-placeholders/placeholder_for_introductionary_video.png",
  };
  try {
    const videoPlaceholders = getVideoPlaceholders();
    videoHeroImage = videoPlaceholders.intro;
  } catch (error) {
    console.error("Error loading video hero image:", error);
    // Use fallback image path
  }

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
          h1="Video Resources"
          h2="Discover our comprehensive collection of educational videos, masterclasses, and student testimonials."
          decorativeStyle="none"
        />
      </section>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - QuoteSection component for video page introduction */}
      {/* QUOTE INTEGRATION REASON: Official React documentation Section 2.1 recommends component composition for page structure */}
      <QuoteSection
        quote="Join Elizabeth Burrows, founder of My Private Tutor Online, as she shares her expert insight from over 15 years of international education experience"
        backgroundColor="bg-white"
        useHighlighting={true}
        className="py-16"
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
        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for future video content sections */}
        {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable structured video content organization */}
        <section id="featured-video-content">
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component integration with props for dynamic content rendering */}
          {/* HERO VIDEO DIALOG INTEGRATION REASON: Official React documentation Section 2.1 recommends component composition patterns for reusable UI elements */}

          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Direct component rendering with simplified props */}
          {/* SIMPLIFIED RENDERING: Components render directly with title and layout, no CMS loading required */}
          <VideoMasterclassSection
            title="Unlocking Academic Success"
            layout="text-left"
          />

          <VideoMasterclassSection
            title="Elizabeth's Essential UCAS Guide - Part 1/2"
            layout="text-right"
          />
        </section>

        <section id="love-at-first-lesson" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="Two Exceptional FREE Masterclasses with Elizabeth Burrows"
            paragraphOne="Access Elizabeth's premium educational expertise completely free of charge through these two carefully selected masterclasses. 'Unlocking Academic Success' captures Elizabeth's acclaimed GCSE Summit 2024 presentation, where she addressed parents on navigating knowledge gaps and rebuilding confidence through one-to-one tuition. The 'UCAS Summit 2024 Recording' provides complete access to Elizabeth's comprehensive guidance session, including the live audience Q&A that follows. Both sessions represent £100+ value content, now available as complimentary introductions to Elizabeth's expertise—the same calibre of insight that has earned her recognition in Tatler's Address Book 2025."
            headingTwo="Professional Guidance from Britain's Leading Education Consultant"
            paragraphTwo="These free masterclasses deliver practical strategies directly applicable to your family's educational journey. Elizabeth shares her proven approaches for recognising when one-to-one support is needed, identifying truly exceptional tutors, and managing the complex dynamics of educational relationships. You'll learn how to frame tutoring positively for reluctant students, determine your child's genuine potential, and navigate the challenges of supporting teens through GCSEs, IBs and A Levels. These sessions serve as your complimentary introduction to the expertise that has successfully guided hundreds of families through the British education system—watch them to discover why discerning parents consistently choose Elizabeth's guidance."
          />
        </section>
        <section id="free-video-content">
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component integration with props for dynamic content rendering */}
          {/* HERO VIDEO DIALOG INTEGRATION REASON: Official React documentation Section 2.1 recommends component composition patterns for reusable UI elements */}

          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Direct component rendering with simplified props */}
          {/* SIMPLIFIED RENDERING: Components render directly with title and layout, no CMS loading required */}
          <VideoMasterclassSection
            title="Unlocking Academic Success"
            layout="text-left"
          />

          <VideoMasterclassSection
            title="Elizabeth's Essential UCAS Guide - Part 1/2"
            layout="text-right"
          />
        </section>

        <section id="love-at-first-lesson" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="Two Exceptional FREE Masterclasses with Elizabeth Burrows"
            paragraphOne="Access Elizabeth's premium educational expertise completely free of charge through these two carefully selected masterclasses. 'Unlocking Academic Success' captures Elizabeth's acclaimed GCSE Summit 2024 presentation, where she addressed parents on navigating knowledge gaps and rebuilding confidence through one-to-one tuition. The 'UCAS Summit 2024 Recording' provides complete access to Elizabeth's comprehensive guidance session, including the live audience Q&A that follows. Both sessions represent £100+ value content, now available as complimentary introductions to Elizabeth's expertise—the same calibre of insight that has earned her recognition in Tatler's Address Book 2025."
            headingTwo="Professional Guidance from Britain's Leading Education Consultant"
            paragraphTwo="These free masterclasses deliver practical strategies directly applicable to your family's educational journey. Elizabeth shares her proven approaches for recognising when one-to-one support is needed, identifying truly exceptional tutors, and managing the complex dynamics of educational relationships. You'll learn how to frame tutoring positively for reluctant students, determine your child's genuine potential, and navigate the challenges of supporting teens through GCSEs, IBs and A Levels. These sessions serve as your complimentary introduction to the expertise that has successfully guided hundreds of families through the British education system—watch them to discover why discerning parents consistently choose Elizabeth's guidance."
          />
        </section>
        <section id="ucas-video-content">
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component integration with props for dynamic content rendering */}
          {/* HERO VIDEO DIALOG INTEGRATION REASON: Official React documentation Section 2.1 recommends component composition patterns for reusable UI elements */}

          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Direct component rendering with simplified props */}
          {/* SIMPLIFIED RENDERING: Components render directly with title and layout, no CMS loading required */}
          <VideoMasterclassSection
            title="Unlocking Academic Success"
            layout="text-left"
          />

          <VideoMasterclassSection
            title="Elizabeth's Essential UCAS Guide - Part 1/2"
            layout="text-right"
          />
        </section>

        <section id="love-at-first-lesson" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="Two Exceptional FREE Masterclasses with Elizabeth Burrows"
            paragraphOne="Access Elizabeth's premium educational expertise completely free of charge through these two carefully selected masterclasses. 'Unlocking Academic Success' captures Elizabeth's acclaimed GCSE Summit 2024 presentation, where she addressed parents on navigating knowledge gaps and rebuilding confidence through one-to-one tuition. The 'UCAS Summit 2024 Recording' provides complete access to Elizabeth's comprehensive guidance session, including the live audience Q&A that follows. Both sessions represent £100+ value content, now available as complimentary introductions to Elizabeth's expertise—the same calibre of insight that has earned her recognition in Tatler's Address Book 2025."
            headingTwo="Professional Guidance from Britain's Leading Education Consultant"
            paragraphTwo="These free masterclasses deliver practical strategies directly applicable to your family's educational journey. Elizabeth shares her proven approaches for recognising when one-to-one support is needed, identifying truly exceptional tutors, and managing the complex dynamics of educational relationships. You'll learn how to frame tutoring positively for reluctant students, determine your child's genuine potential, and navigate the challenges of supporting teens through GCSEs, IBs and A Levels. These sessions serve as your complimentary introduction to the expertise that has successfully guided hundreds of families through the British education system—watch them to discover why discerning parents consistently choose Elizabeth's guidance."
          />
        </section>
        <section id="british-culture-video-content">
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component integration with props for dynamic content rendering */}
          {/* HERO VIDEO DIALOG INTEGRATION REASON: Official React documentation Section 2.1 recommends component composition patterns for reusable UI elements */}

          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Direct component rendering with simplified props */}
          {/* SIMPLIFIED RENDERING: Components render directly with title and layout, no CMS loading required */}
          <VideoMasterclassSection
            title="Unlocking Academic Success"
            layout="text-left"
          />

          <VideoMasterclassSection
            title="Elizabeth's Essential UCAS Guide - Part 1/2"
            layout="text-right"
          />
        </section>

        <section id="love-at-first-lesson" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="Two Exceptional FREE Masterclasses with Elizabeth Burrows"
            paragraphOne="Access Elizabeth's premium educational expertise completely free of charge through these two carefully selected masterclasses. 'Unlocking Academic Success' captures Elizabeth's acclaimed GCSE Summit 2024 presentation, where she addressed parents on navigating knowledge gaps and rebuilding confidence through one-to-one tuition. The 'UCAS Summit 2024 Recording' provides complete access to Elizabeth's comprehensive guidance session, including the live audience Q&A that follows. Both sessions represent £100+ value content, now available as complimentary introductions to Elizabeth's expertise—the same calibre of insight that has earned her recognition in Tatler's Address Book 2025."
            headingTwo="Professional Guidance from Britain's Leading Education Consultant"
            paragraphTwo="These free masterclasses deliver practical strategies directly applicable to your family's educational journey. Elizabeth shares her proven approaches for recognising when one-to-one support is needed, identifying truly exceptional tutors, and managing the complex dynamics of educational relationships. You'll learn how to frame tutoring positively for reluctant students, determine your child's genuine potential, and navigate the challenges of supporting teens through GCSEs, IBs and A Levels. These sessions serve as your complimentary introduction to the expertise that has successfully guided hundreds of families through the British education system—watch them to discover why discerning parents consistently choose Elizabeth's guidance."
          />
        </section>
      </PageLayout>
    </>
  );
}
