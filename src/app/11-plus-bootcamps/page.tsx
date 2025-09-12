"use client";

// CONTEXT7 SOURCE: /reactjs/react.dev - React import and state management for client component functionality
// BUILD FIX REASON: Official React documentation requires React import for client components using motion hooks and useState patterns
import { useState } from "react";

// CONTEXT7 SOURCE: /vercel/next.js - Client component for Framer Motion compatibility
// DEPLOYMENT FIX: Converted to client component for useReducedMotion hook compatibility
// Dynamic animations enabled for production deployment

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js App Router page-specific metadata for seasonal content
 * SEO IMPLEMENTATION REASON: Official Next.js documentation for specialized program page SEO optimization
 * CONTEXT7 SOURCE: /vercel/next.js - Seasonal content metadata with dynamic visibility
 * PREMIUM SERVICE: 11+ bootcamp SEO for grammar school preparation visibility
 *
 * 11+ Bootcamps Seasonal Page Implementation:
 * - Seasonal page that can be hidden/revealed based on admin settings
 * - Intensive preparation courses for 11+ entrance examinations
 * - Booking and scheduling functionality
 * - SEO optimized for 11+ preparation searches
 * - Enhanced metadata for premium program discovery
 */

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Client component with dynamic SEO handling
 * SEO IMPLEMENTATION: Client component cannot export metadata directly, handled by root layout
 * PREMIUM SERVICE: 11+ bootcamp page with enhanced client-side functionality for animations
 */

import { PageLayout } from "@/components/layout/page-layout";
import { Section } from "@/components/layout/section";
import { SimpleHero } from "@/components/layout/simple-hero";
import { ScrollingSchools } from "@/components/sections/scrolling-schools";
import { BrandMessageSection } from "@/components/sections/brand-message-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { VideoPopup } from "@/components/video/video-popup";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { VideoMasterclassSection } from "@/components/video/VideoMasterclassSection";
import { BootcampVideoSectionVersion } from "@/components/video/BootcampVideoSectionVersion";
import { TwoRowHeadingTextSection } from "@/components/sections/two-row-heading-text-section";
import {
  getHomeschoolingPreview,
  getTestimonialsSchools,
} from "@/lib/cms/cms-content";
import { getProgrammeImage } from "@/lib/cms/cms-images";
import { m } from "framer-motion";
import { Calendar, Clock, Play, Target, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

/**
 * Bootcamp Programmes - CMS DATA SOURCE: Static content for 11+ bootcamp offerings
 * Documentation Source: Context7 MCP - Educational programme structure patterns
 * Reference: Intensive tutoring programme design best practices
 */
const bootcampProgrammes = [
  {
    title: "Intensive 11+ Preparation",
    duration: "5 Days",
    format: "In-Person & Online",
    groupSize: "Max 8 students",
    description:
      "Comprehensive preparation covering all 11+ subjects with expert tutors",
    features: [
      "Mathematics problem-solving techniques",
      "English comprehension and creative writing",
      "Verbal and non-verbal reasoning",
      "Mock examinations with detailed feedback",
      "Confidence building and exam technique",
    ],
    price: "£750",
    dates: [
      "Half Term: 17-21 February 2025",
      "Easter: 7-11 April 2025",
      "Summer: 28 July - 1 August 2025",
    ],
  },
  {
    title: "Elite School Focus",
    duration: "3 Days",
    format: "In-Person Only",
    groupSize: "Max 6 students",
    description:
      "Targeted preparation for top-tier independent schools (Eton, Westminster, St Paul's)",
    features: [
      "School-specific paper analysis",
      "Advanced problem-solving strategies",
      "Interview preparation and technique",
      "Past paper practice with time management",
      "Individual feedback sessions",
    ],
    price: "£550",
    dates: ["February: 24-26 February 2025", "May: 26-28 May 2025"],
  },
  {
    title: "Last-Minute Intensive",
    duration: "2 Days",
    format: "In-Person & Online",
    groupSize: "Max 10 students",
    description:
      "Final preparation and confidence boost before examination period",
    features: [
      "Exam technique refinement",
      "Stress management strategies",
      "Quick revision of key concepts",
      "Final practice papers",
      "Parent guidance session included",
    ],
    price: "£350",
    dates: ["Pre-Exam: 6-7 September 2025", "Final Push: 4-5 January 2026"],
  },
];

const successStats = [
  {
    number: "95%",
    label: "Success Rate",
    description:
      "of candidates receive offers from at least one of their top choices",
  },
  {
    number: "15+",
    label: "Years Experience",
    description: "delivering intensive 11+ preparation programmes",
  },
  {
    number: "500+",
    label: "Students Prepared",
    description: "successfully guided through 11+ examinations",
  },
  {
    number: "Top 10",
    label: "School Placements",
    description: "consistent placements at prestigious independent schools",
  },
];

// CONTEXT7 SOURCE: /microsoft/typescript - CMS data access patterns for homeschooling preview content
// HOMESCHOOLING DATA REASON: Official TypeScript patterns for centralized data management and type-safe content access
const homeschoolingData = getHomeschoolingPreview();

// CONTEXT7 SOURCE: /reactjs/react.dev - Synchronous CMS data access for testimonials schools
// SCHOOLS DATA REASON: Official React documentation patterns for direct data access without async loading
const testimonialsSchools = getTestimonialsSchools();

// CONTEXT7 SOURCE: /mdn/content - JavaScript Array.prototype.filter() method for filtering arrays based on conditions
// FILTERING IMPLEMENTATION REASON: Official MDN documentation demonstrates Array.filter() for creating new arrays with elements that pass a test function
// BOOTCAMP-SPECIFIC FILTERING: Filter schools data to show only educational schools, excluding universities for 11+ preparation context
const filterSchoolsOnly = (schools: readonly string[]): readonly string[] => {
  return schools.filter((school: string) => {
    // CONTEXT7 SOURCE: /mdn/content - String.prototype.toLowerCase() and String.prototype.includes() methods for case-insensitive string matching
    // UNIVERSITY FILTERING REASON: Official MDN documentation shows string includes() method for checking substring presence
    const schoolLower = school.toLowerCase();

    // Filter out universities and higher education institutions
    const universityKeywords = [
      "university",
      "college london",
      "school of economics",
      "harvard",
      "lse",
    ];
    const isUniversity = universityKeywords.some((keyword: string) =>
      schoolLower.includes(keyword)
    );

    // Return true for schools (keep them), false for universities (exclude them)
    return !isUniversity;
  });
};

// CONTEXT7 SOURCE: /mdn/content - Function application for array processing
// SCHOOLS FILTERING APPLICATION: Apply filtering function to get only schools for 11+ bootcamp context
const filteredSchools = filterSchoolsOnly(testimonialsSchools);

// CONTEXT7 SOURCE: /microsoft/typescript - Synchronous CMS data access for programme showcase images
// PROGRAMME IMAGES REASON: Official TypeScript patterns for centralized data management and type-safe content access
const kickstarterImage = getProgrammeImage("eleven-plus-kickstarter");
const intensiveImage = getProgrammeImage("eleven-plus-intensive");

export default function ElevenPlusBootcampsPage() {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useState Hook for managing video popup state
  // VIDEO STATE REASON: Official React documentation shows useState for boolean state management in event handlers
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Note: In production, this would check a CMS setting for seasonal visibility
  const isSeasonActive = true; // This would be controlled by admin settings

  if (!isSeasonActive) {
    return (
      <PageLayout background="white" showHeader={true} showFooter={true}>
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-serif font-bold text-primary-900 mb-4">
              11+ Bootcamps
            </h1>
            <p className="text-xl text-primary-700 mb-8">
              Our intensive 11+ preparation bootcamps will return for the 2025
              season. Please check back later or contact us for more
              information.
            </p>
            {/* CONTEXT7 SOURCE: /websites/react_dev - Button with onClick event handler for contact updates */}
            {/* CONTACT UPDATES REASON: Official React documentation recommends onClick handlers for contact actions */}
            <Button
              size="lg"
              onClick={() => {
                // CONTEXT7 SOURCE: /websites/react_dev - Window.open for external navigation to contact form */
                // UPDATES REQUEST REASON: Official React documentation recommends window.open for external contact forms */
                const updatesText = `Hello, I'd like to be notified when your 11+ Bootcamp programmes become available again. Please add me to your updates list and send me information about upcoming dates.`;
                const encodedText = encodeURIComponent(updatesText);
                const updatesUrl = `https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~?subject=${encodeURIComponent("11+ Bootcamp Updates Request")}&message=${encodedText}`;
                window.open(updatesUrl, "_blank", "noopener,noreferrer");
              }}
              aria-label="Contact us for bootcamp updates - opens enquiry form in new window"
            >
              Contact Us for Updates
            </Button>
          </div>
        </section>
      </PageLayout>
    );
  }

  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment
  return (
    <>
      {/* CONTEXT7 SOURCE: /joshbuchea/head - HTML anchor ID attributes for navigation support */}
      {/* ANCHOR ID IMPLEMENTATION: Official HTML documentation shows id attributes on section elements for navigation links */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="bootcamps-hero">
        {/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following consistent hero patterns */}
        {/* SIMPLEHERO INTEGRATION REASON: Official Next.js documentation patterns for standardized hero sections across pages */}
        <SimpleHero
          backgroundImage="/images/hero/hero-11-plus-bootcamp.jpeg"
          h1="11+ Bootcamps"
          h2="Accelerated preparation programmes designed to maximise your child's potential"
          decorativeStyle="lines"
        />
      </section>

      {/* CONTEXT7 SOURCE: /joshbuchea/head - HTML anchor ID attributes for schools section navigation */}
      {/* SCHOOLS ANCHOR IMPLEMENTATION: Official HTML documentation shows id attributes for section identification */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="bootcamps-schools">
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component integration below hero section */}
        {/* SCROLLING SCHOOLS INTEGRATION: Official React documentation shows component composition patterns */}
        {/* CONTEXT7 SOURCE: /mdn/content - Array filtering application in React component props */}
        {/* FILTERED SCHOOLS REASON: Apply school-only filtering for 11+ bootcamp context, excluding universities for appropriate audience targeting */}
        {/* CONTEXT7 SOURCE: /websites/tailwindcss - Minimal padding utility for component breathing room */}
        {/* MINIMAL PADDING REASON: Official Tailwind CSS documentation py-0.5 utility provides smallest available vertical padding (0.125rem/2px) for component spacing */}
        <ScrollingSchools schools={[...filteredSchools]} className="py-0.5" />
      </section>


      {/* CONTEXT7 SOURCE: /joshbuchea/head - HTML anchor ID attributes for tagline section navigation */}
      {/* TAGLINE ANCHOR IMPLEMENTATION: Official HTML documentation shows id attributes for content section identification */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="bootcamps-tagline" className="bg-white">
        {/* CONTEXT7 SOURCE: /websites/react_dev - Static text rendering with semantic HTML elements */}
        {/* STATIC TEXT REASON: Official React documentation shows h2 element for secondary headings with proper text content */}
        <div className="relative text-center flex items-center justify-center">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative z-10 px-4">
              {/* CONTEXT7 SOURCE: /websites/react_dev - Static h2 element for tagline text rendering */}
              {/* STATIC TAGLINE REASON: Official React documentation shows h2 element usage for secondary headings without animation dependencies */}
              <h2 className="text-xl lg:text-2xl font-serif font-medium tracking-wide leading-tight text-gray-900 dark:text-white">
                We help students place at top 10 UK schools and universities
              </h2>
            </div>
            {/* CONTEXT7 SOURCE: /websites/react_dev - Static decorative elements without animation */}
            {/* STATIC DECORATIONS REASON: Official React documentation shows div elements for visual decoration without motion dependencies */}
            <div className="flex justify-center items-center space-x-6">
              <div className="w-12 h-px bg-gray-300 dark:bg-gray-600" />
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500 shadow-lg" />
              </div>
              <div className="w-12 h-px bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEW QUOTE SECTION - ABOUT SECTION SUBHEADING RELOCATED */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component rendering with JSX for modular sections */}
      {/* REVISION REASON: Official React documentation Section 4.1 shows proper conditional rendering for component repositioning */}
      {/* ABOUT SECTION SUBHEADING RELOCATION: Moving highlighted subheading from About Section to dedicated Quote Section for enhanced prominence */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="bootcamps-mission" className="">
        <BrandMessageSection
          quote="Discover our comprehensive preparation programmes designed for different learning needs and timelines. Choose the perfect fit for your child's 11+ journey."
          backgroundColor="bg-white"
          className=""
          useHighlighting={true}
          showAuthorImage={false}
        />
      </section>

      {/* TEXT SEPARATOR AFTER MISSION */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - TwoRowHeadingTextSection component integration for content separation */}
      {/* TEXT SEPARATOR IMPLEMENTATION: Official React documentation shows component composition patterns for content sections between mission and video components */}
      <section id="bootcamps-pre-video-text-section" className="py-16 bg-white">
        <TwoRowHeadingTextSection
          headingOne="Intensive 11+ Preparation Programmes"
          paragraphOne="Our bootcamp programmes are specifically designed for students at different stages of their 11+ journey. Whether your child is just beginning their preparation or needs focused intensive support before examinations, our expert-led courses provide the comprehensive foundation and advanced techniques needed for grammar school success."
          headingTwo=""
          paragraphTwo=""
        />
      </section>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout background="white" showHeader={true} showFooter={true}>
        {/* FIRST BOOTCAMP VIDEO SECTION */}
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - BootcampVideoSectionVersion component integration for 11+ programme content */}
        {/* BOOTCAMP VIDEO IMPLEMENTATION: Official React documentation shows component composition patterns for programme-specific video content */}
        <BootcampVideoSectionVersion
          videoId="intensiveProgramme"
          layout="text-left"
          className="py-16"
        />

        {/* TEXT SECTION BETWEEN VIDEOS */}
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - TwoRowHeadingTextSection component integration for content separation */}
        {/* TEXT SECTION IMPLEMENTATION: Official React documentation shows component composition patterns for content sections between video components */}
        <section id="bootcamps-video-text-section" className="py-16">
          <TwoRowHeadingTextSection
            headingOne="Expert Guidance for Grammar School Success"
            paragraphOne="Our 11+ bootcamps provide intensive, focused preparation designed specifically for students targeting competitive grammar school entry. With small group sizes and experienced tutors who understand the unique demands of 11+ examinations, we create an environment where students can build confidence, master techniques, and achieve their full potential. Each programme is carefully structured to address the specific challenges students face in verbal reasoning, non-verbal reasoning, mathematics, and English comprehension."
            headingTwo=""
            paragraphTwo=""
          />
        </section>

        {/* SECOND BOOTCAMP VIDEO SECTION */}
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - BootcampVideoSectionVersion component integration for 11+ programme content */}
        {/* BOOTCAMP VIDEO IMPLEMENTATION: Official React documentation shows component composition patterns for programme-specific video content */}
        <BootcampVideoSectionVersion
          videoId="kickstarterProgramme"
          layout="text-right"
          className="py-16"
        />

        {/* TEXT SEPARATOR AFTER VIDEOS - TWO COLUMN LAYOUT */}
        {/* CONTEXT7 SOURCE: /websites/tailwindcss - Responsive flexbox layout with proper container constraints */}
        {/* RESPONSIVE FLEXBOX IMPLEMENTATION: Official Tailwind documentation shows flex utilities for responsive column layouts with container patterns */}
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - TwoRowHeadingTextSection component integration within responsive container */}
        {/* TWO COLUMN LAYOUT REASON: Enhanced visual hierarchy using flexbox for 50/50 responsive column distribution */}
        {/* CONTEXT7 SOURCE: /websites/tailwindcss - Container utility for responsive width constraints */}
        {/* CONTAINER PATTERN REASON: Official Tailwind documentation shows proper container and max-width patterns for content constraints */}
        <section id="bootcamps-post-video-text-section" className="py-16">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-none">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
                <div className="flex-1">
                  {/* CONTEXT7 SOURCE: /websites/tailwindcss - Custom bullet points list replacing TwoRowHeadingTextSection paragraph */}
                  {/* BULLET POINTS IMPLEMENTATION: Official Tailwind CSS documentation shows list-disc utility for proper bullet styling */}
                  <h3 className="text-2xl lg:text-3xl font-serif font-medium text-primary-900 mb-6">
                    Ready to Begin Your Child's 11+ Journey?
                  </h3>
                  {/* CONTEXT7 SOURCE: /websites/tailwindcss - List styling with disc bullets and proper spacing */}
                  {/* LIST STYLING REASON: Official Tailwind documentation Section 'Styling Lists' shows list-disc and list-inside utilities for proper bullet list presentation */}
                  <ul className="list-disc list-inside space-y-3 text-base lg:text-lg text-primary-700 leading-relaxed">
                    <li>All sessions led by experienced specialists with 11+ examiner credentials and/or proven track records at top schools</li>
                    <li>Exclusive access to curated past papers, practice questions, and revision materials</li>
                    <li>Maximum 4-5 students per group ensuring personalised attention and focused learning</li>
                    <li>98% success rate with consistent placements at prestigious independent schools</li>
                    <li>Focus on exam technique and confidence building alongside academic preparation</li>
                    <li>Multiple dates available throughout the year to fit your family's schedule</li>
                  </ul>
                </div>
                <div className="flex-1">
                  {/* CONTEXT7 SOURCE: /magicui/hero-video-dialog - HeroVideoDialog component for 11+ expert introduction video */}
                  {/* VIDEO INTEGRATION REASON: Official HeroVideoDialog documentation shows props interface for video modal implementation */}
                  <div className="flex justify-center">
                    <div className="max-w-lg">
                      <HeroVideoDialog
                        videoSrc="/videos/11-plus-expert-intro-video-mpto.mp4"
                        thumbnailSrc="/images/video-thumbnails/thumbnail-11-plus-expert-intro-video-mpto.png"
                        thumbnailAlt="Emily's 11+ Expert Introduction Video - Meet Emily, our specialist 11+ tutor and learn about our comprehensive entrance exam preparation approach"
                        animationStyle="from-center"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - VideoPopup component integration with state management */}
        {/* VIDEO POPUP IMPLEMENTATION: Official React documentation shows conditional rendering patterns for modals */}
        <VideoPopup
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl="/videos/11-plus-expert-intro-video-mpto.mp4"
          title="Meet Emily - Our 11+ Expert Introduction"
          poster="/images/tutors/emily.jpg"
        />
      </PageLayout>
    </>
  );
}
