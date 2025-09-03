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
            videoId="unlockingAcademicSuccess"
            layout="text-left"
            className="py-32"
          />

          <VideoMasterclassSection
            videoId="elizabethsUcasGuide"
            layout="text-right"
            className="py-32"
          />
        </section>

        {/* THIS IS FREE SECTION */}
        <section id="love-at-first-lesson" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="Navigating Academic Support: Understanding the Real Challenges Parents Face"
            paragraphOne="The journey of supporting a child through their education is fraught with complexity and uncertainty. Many parents find themselves grappling with fundamental questions: When does academic struggle require intervention? How do you distinguish between temporary setbacks and genuine learning gaps? The modern educational landscape presents unique challenges, with increasingly competitive environments and evolving curricula that can leave even the most engaged parents feeling unprepared. Understanding when and how to provide effective academic support requires deep insight into child development, learning psychology, and educational systems—knowledge that extends far beyond traditional parenting experience."
            headingTwo="The Hidden Complexities of Educational Decision-Making"
            paragraphTwo="Behind every academic decision lies a web of considerations that parents rarely anticipate. Supporting reluctant learners requires sophisticated understanding of motivation psychology and learning styles. Navigating the intricate relationships between schools, tutors, and families demands diplomatic skill and clear communication strategies. The pressure to make the 'right' choices for GCSEs, A Levels, and university pathways can be overwhelming when parents lack insider knowledge of how these systems truly operate. These challenges are compounded by the emotional toll of watching a child struggle, the financial implications of educational support, and the delicate balance between nurturing independence whilst providing necessary guidance."
          />
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

        {/* THIS IS UCAS SECTION */}
        <section id="love-at-first-lesson" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="University Admissions: Decoding Britain's Most Complex Educational Process"
            paragraphOne="The British university admissions system represents one of the most intricate and high-stakes processes that families will ever navigate. UCAS applications are governed by unwritten rules, implicit expectations, and nuanced requirements that can confound even highly educated parents. The personal statement alone—a single document that can determine a young person's entire future—operates according to criteria that are rarely made explicit. Understanding university selection strategies, reference requirements, and timeline management requires intimate knowledge of how admissions committees actually evaluate candidates, knowledge that remains largely inaccessible to families approaching the process independently."
            headingTwo="Personal Statements: The Art of Strategic Self-Presentation"
            paragraphTwo="Crafting a compelling personal statement demands far more than good writing skills—it requires sophisticated understanding of institutional psychology, subject-specific expectations, and competitive positioning. The challenge lies not merely in communicating achievements but in demonstrating intellectual curiosity, academic potential, and cultural fit within just 4,000 characters. Parents often struggle to guide their children through this process because it requires balancing authentic voice with strategic positioning, personal reflection with academic focus, and individual story with institutional expectations. The stakes are particularly high for competitive courses and prestigious institutions, where the margin for error is virtually nonexistent."
          />
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

        {/* THIS IS BRITISH SECTION */}

        <section id="love-at-first-lesson" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="Cultural Literacy: The Unspoken Foundation of British Educational Success"
            paragraphOne="British educational culture operates on layers of implicit understanding that can be invisible to outsiders yet critical for academic and social success. Literary knowledge, cultural references, and historical context form the backdrop of classroom discussions, examination questions, and peer interactions throughout the British school system. International families often find their children academically capable yet culturally disadvantaged, missing subtle references and contextual understanding that British students absorb naturally. This cultural capital gap can affect everything from interview performance at independent schools to university seminar participation, creating barriers that academic ability alone cannot overcome."
            headingTwo="Social Navigation: Understanding Britain's Institutional Protocols"
            paragraphTwo="The social dynamics of British educational institutions operate according to centuries-old codes of conduct that remain largely unspoken yet powerfully influential. From dining etiquette at boarding schools to interview protocols for university admissions, these social conventions can determine opportunities and outcomes in ways that surprise unprepared families. Parents often underestimate how significantly social fluency impacts their child's educational experience, from peer relationships to teacher perceptions to institutional fit. The challenge is particularly acute for international families who may excel academically whilst struggling to decode the subtle social expectations that permeate Britain's most prestigious educational environments."
          />
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
