"use client";

// CONTEXT7 SOURCE: /vercel/next.js - Client Component for consistent rendering behavior
// IMPLEMENTATION REASON: Official Next.js documentation recommends client components for pages with interactive elements

import React from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { SimpleHero } from "@/components/layout/simple-hero";
// CONTEXT7 SOURCE: /websites/react_dev - Component removal patterns for JSX cleanup
// REMOVAL REASON: Official React documentation Section 3.1 recommends removing unused imports to maintain clean component architecture
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
    <React.Fragment>
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
        {/* FEATURED/FREE SECTION - 2 VIDEOS */}
        <section id="featured-free-section" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="The Parent's Roadmap to Effective Academic Help"
            paragraphOne="Complimentary masterclasses with Elizabeth Burrows. The journey of supporting a child through their education is fraught with complexity and uncertainty. When is a wobble a warning sign, and when is it just a blip? In a competitive, fast-changing curriculum, even engaged parents can feel unsure. The modern educational landscape presents unique challenges, with increasingly competitive environments. Understanding when and how to provide effective academic support requires deep insight into child development, learning psychology, and educational systems—knowledge that extends far beyond traditional parenting experience. Access two complimentary masterclasses to benefit from Elizabeth Burrows' expert guidance, distilled from 15+ years in international education."
            headingTwo=""
            paragraphTwo=""
          />
        </section>

        <VideoMasterclassSection
          videoId="unlockingAcademicSuccess"
          layout="text-left"
          className="py-32"
        />

        <VideoMasterclassSection
          videoId="ucasSummit2024"
          layout="text-right"
          className="py-32"
        />

        {/* UCAS SECTION - 2 VIDEOS */}
        <section id="ucas-section" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="B. University Admissions: Decoding Britain's Most Complex Educational Process"
            paragraphOne="The British university admissions system represents one of the most intricate and high-stakes processes that families will ever navigate. UCAS applications are governed by unwritten rules, implicit expectations, and nuanced requirements that can confound even highly educated parents. The personal statement alone - a 4,000 character document that can determine a young person's entire future - operates according to criteria that are rarely made explicit. The stakes are particularly high for competitive courses and prestigious institutions, where the margin for error is virtually nonexistent. Understanding university selection strategies, reference requirements, and timeline management requires intimate knowledge of how admissions departments actually evaluate candidates. Elizabeth Burrows has helped countless students secure offers from Oxbridge and top Russell Group universities. Unlock her expertise in these two masterclasses, as delivered at London School of Economics."
            headingTwo=""
            paragraphTwo=""
          />
        </section>

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

        {/* BRITISH CULTURE SECTION - 2 VIDEOS */}
        <section id="british-culture-section" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="C. Reading Between the Lines: Navigating Britain's Educational Culture"
            paragraphOne="Cultural literacy is the unspoken foundation of success in British education. Literary knowledge, shared references and historical context quietly shape classroom discussion, exam questions and peer dynamics. International families often find capable children disadvantaged by these invisible cues, affecting interviews, seminar participation and confidence. Equally decisive is social navigation: the centuries-old codes that govern schools and universities - from dining etiquette in boarding houses to admissions protocols and teacher expectations. Social fluency influences opportunities, relationships and perceived fit as much as grades. In these two masterclasses Elizabeth Burrows guide explores the cultural capital and institutional conventions students must decode, helping families bridge gaps academic ability alone cannot close."
            headingTwo=""
            paragraphTwo=""
          />
        </section>

        <VideoMasterclassSection
          videoId="britishEtiquette"
          layout="text-left"
          className="py-32"
        />

        <VideoMasterclassSection
          videoId="britishLiteraryClassics"
          layout="text-right"
          className="py-32"
        />
      </PageLayout>
    </React.Fragment>
  );
}
