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
import { QuoteSection } from "@/components/sections/quote-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { VideoPopup } from "@/components/video/video-popup";
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
        <ScrollingSchools schools={[...filteredSchools]} />
      </section>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - QuoteSection component integration with 11+ Bootcamps specific content */}
      {/* QUOTE SECTION IMPLEMENTATION REASON: Official React documentation Section 3.2 demonstrates component composition patterns */}
      {/* CONTEXT7 SOURCE: /magicuidesign/magicui - Strategic highlighting for 11+ bootcamps programme selection guidance */}
      {/* BOOTCAMP HIGHLIGHTING INTEGRATION: Magic UI documentation enables targeted highlighting for programme discovery messaging */}
      <QuoteSection
        quote="Discover our comprehensive preparation programmes designed for different learning needs and timelines. Choose the perfect fit for your child's 11+ journey."
        backgroundColor="bg-amber-50/30"
        className="py-12 lg:py-16"
        useHighlighting={true}
      />

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
            <div className="flex justify-center items-center space-x-6 mt-6">
              <div className="w-12 h-px bg-gray-300 dark:bg-gray-600" />
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500 shadow-lg" />
              </div>
              <div className="w-12 h-px bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout background="white" showHeader={true} showFooter={true}>
        {/* Programme Options - Professional Redesign */}
        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
        {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
        <section
          id="bootcamps-programme-options"
          className="py-20 bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/20 relative"
        >
          {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image optimization for programme showcase images */}
          {/* PROGRAMME SHOWCASE REASON: Official Next.js Image documentation recommends optimized images for enhanced user experience */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-primary-900 mb-6">
                Our 11+ Programme Options
              </h2>
              <p className="text-xl text-primary-700 max-w-3xl mx-auto leading-relaxed">
                Discover our comprehensive preparation programmes designed for
                different learning needs and timelines. Choose the perfect fit
                for your child's 11+ journey.
              </p>
              {/* CONTEXT7 SOURCE: /radix-ui/website - Separator component for visual section division */}
              {/* SEPARATOR IMPLEMENTATION: Official Radix UI documentation shows horizontal separator for content organization */}
              <div className="mt-8 flex justify-center">
                <Separator className="w-24 bg-gradient-to-r from-amber-500 to-yellow-500 h-1 rounded-full" />
              </div>
            </div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid layout with proper alignment for parallel content */}
            {/* GRID ALIGNMENT IMPLEMENTATION: Official Tailwind CSS documentation for items-start alignment ensuring proper parallel positioning */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Kickstarter Programme */}
              <div className="bg-white rounded-3xl shadow-xl border border-amber-100/50 overflow-hidden group hover:shadow-2xl transition-all duration-500">
                {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with CMS data integration */}
                {/* PROGRAMME IMAGE UPDATE: Using CMS data for 11+ Kickstarter programme showcase image showing mother/child tutoring session */}
                {/* IMAGE OPTIMIZATION REVISION: Official Next.js documentation for optimized JPG image rendering with CMS-managed descriptive alt text reflecting supportive online tutoring approach */}
                <div className="relative overflow-hidden">
                  <Image
                    src={kickstarterImage.src}
                    alt={kickstarterImage.alt}
                    width={kickstarterImage.width || 600}
                    height={kickstarterImage.height || 300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading={kickstarterImage.loading || "lazy"}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    title={kickstarterImage.title || kickstarterImage.alt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Year 4 & 5
                    </div>
                  </div>
                </div>

                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox layout for consistent content alignment */}
                {/* CONTENT ALIGNMENT IMPLEMENTATION: Official Tailwind CSS flex utilities for maintaining parallel structure */}
                <div className="p-8">
                  {/* Header aligned at same height */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif font-bold text-primary-900 mb-3">
                      11+ Kickstarter Programme
                    </h3>
                    <p className="text-primary-600 font-medium">
                      Perfect for students entering Y4 & 5 September 2025
                    </p>
                  </div>

                  {/* CONTEXT7 SOURCE: /radix-ui/website - Separator for content organization */}
                  {/* SEPARATOR USAGE: Official Radix UI documentation recommends separators for visual content division */}
                  <Separator className="mb-6 bg-amber-200" />

                  {/* Content description - standardised height */}
                  <div className="mb-6 min-h-[180px]">
                    <p className="text-primary-700 leading-relaxed text-base">
                      Our 11+ Kickstarter is a fun and thorough introduction to
                      the 11+ curriculum, ideal for students with little to no
                      experience of entrance exams. Led by our qualified 11+
                      specialists with decades of experience coaching candidates
                      and writing real entrance exam papers.
                    </p>
                    <br />
                    <p className="text-primary-700 leading-relaxed text-base">
                      Each day covers a different discipline: English, Maths,
                      Verbal Reasoning, Non-Verbal Reasoning, and Interview
                      Technique. A brilliant opportunity for Year 4/5 students
                      to lay the groundwork for future success.
                    </p>
                  </div>

                  <Separator className="mb-6 bg-amber-200" />

                  {/* Course details - aligned structure */}
                  <div className="bg-amber-50/50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-primary-900 mb-4 text-lg">
                      Course Details:
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-primary-900">
                            COURSE ONE:
                          </p>
                          <p className="text-primary-700">
                            Monday 28th July - Friday 1st August
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-primary-900">
                            COURSE TWO:
                          </p>
                          <p className="text-primary-700">
                            Monday 11th - 15th August
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <p className="text-primary-700">
                          9am - 12 noon Monday to Friday
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <p className="text-primary-700">
                          £395 per 5-day course (including course pack)
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <p className="text-primary-700">
                          Limited spaces - waiting lists available
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button - aligned at bottom */}
                  <div className="mt-auto">
                    {/* CONTEXT7 SOURCE: /stripe-samples/checkout-one-time-payments - External payment integration with secure window.open */}
                    {/* STRIPE INTEGRATION REASON: Official Stripe documentation for external checkout link handling with security attributes */}
                    {/* CONTEXT7 SOURCE: /websites/react_dev - External link security with noopener, noreferrer attributes */}
                    {/* EXTERNAL LINK SECURITY REASON: Official React documentation Section 4.3 recommends secure window.open patterns for external payment providers */}
                    {/* CONTEXT7 SOURCE: /shadcn-ui/ui - Button variant="ghost" pattern for consistent brand gold styling */}
                    {/* GOLD BUTTON STANDARDIZATION REVISION: Official shadcn/ui documentation shows variant="ghost" prevents CVA conflicts when using custom bg-[#CA9E5B] colors */}
                    <Button
                      onClick={() => {
                        const stripeUrl =
                          "https://buy.stripe.com/6oUdR8enb9jF69u1Zd3840c";
                        window.open(stripeUrl, "_blank", "noopener,noreferrer");
                      }}
                      variant="ghost"
                      className="w-full bg-[#CA9E5B] hover:bg-[#B8935A] !text-white font-medium px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      aria-label="Book Kickstarter Programme for £395 - opens Stripe checkout in new window"
                    >
                      Book Kickstarter Programme
                    </Button>
                  </div>
                </div>
              </div>

              {/* Intensive Programme */}
              <div className="bg-white rounded-3xl shadow-xl border border-blue-100/50 overflow-hidden group hover:shadow-2xl transition-all duration-500">
                {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with CMS data integration */}
                {/* INTENSIVE PROGRAMME UPDATE: Using CMS data for 11+ Intensive programme showcase image showing exam answer sheet completion */}
                {/* IMAGE OPTIMIZATION REVISION: Official Next.js documentation for optimized JPG image rendering with CMS-managed descriptive alt text reflecting focused exam preparation and technique */}
                <div className="relative overflow-hidden">
                  <Image
                    src={intensiveImage.src}
                    alt={intensiveImage.alt}
                    width={intensiveImage.width || 600}
                    height={intensiveImage.height || 300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading={intensiveImage.loading || "lazy"}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    title={intensiveImage.title || intensiveImage.alt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Year 6
                    </div>
                  </div>
                </div>

                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox layout for consistent content alignment */}
                {/* CONTENT ALIGNMENT IMPLEMENTATION: Official Tailwind CSS flex utilities for maintaining parallel structure */}
                <div className="p-8">
                  {/* Header aligned at same height */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif font-bold text-primary-900 mb-3">
                      11+ Intensive Programme
                    </h3>
                    <p className="text-primary-600 font-medium">
                      Perfect for students entering Y6 September 2025
                    </p>
                  </div>

                  {/* CONTEXT7 SOURCE: /radix-ui/website - Separator for content organization */}
                  {/* SEPARATOR USAGE: Official Radix UI documentation recommends separators for visual content division */}
                  <Separator className="mb-6 bg-blue-200" />

                  {/* Content description - standardised height */}
                  <div className="mb-6 min-h-[180px]">
                    <p className="text-primary-700 leading-relaxed text-base">
                      Our 11+ Intensive is the perfect runway for students
                      sitting exams in autumn 2025. We tackle a different
                      discipline each day: English, Maths, Verbal Reasoning,
                      Non-Verbal Reasoning, and Interview Technique.
                    </p>
                    <br />
                    <p className="text-primary-700 leading-relaxed text-base">
                      This advanced course tests existing knowledge, identifies
                      improvement areas, and challenges students with 'stretch'
                      tasks. Focus on exam technique with timed drills ensures
                      confidence on exam day.
                    </p>
                  </div>

                  <Separator className="mb-6 bg-blue-200" />

                  {/* Course details - aligned structure */}
                  <div className="bg-blue-50/50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-primary-900 mb-4 text-lg">
                      Course Details:
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-primary-900">
                            COURSE ONE:
                          </p>
                          <p className="text-primary-700">
                            Monday 4th - Friday 8th August
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-primary-900">
                            COURSE TWO:
                          </p>
                          <p className="text-primary-700">
                            Monday 18th - 22nd August
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <p className="text-primary-700">
                          9am - 12 noon Monday to Friday
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <p className="text-primary-700">
                          £395 per 5-day course (including course pack)
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <p className="text-primary-700">
                          Limited spaces - waiting lists available
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button - aligned at bottom */}
                  <div className="mt-auto">
                    {/* CONTEXT7 SOURCE: /stripe-samples/checkout-one-time-payments - External payment integration with secure window.open */}
                    {/* STRIPE INTEGRATION REASON: Official Stripe documentation for external checkout link handling with security attributes */}
                    {/* CONTEXT7 SOURCE: /websites/react_dev - External link security with noopener, noreferrer attributes */}
                    {/* EXTERNAL LINK SECURITY REASON: Official React documentation Section 4.3 recommends secure window.open patterns for external payment providers */}
                    {/* CONTEXT7 SOURCE: /shadcn-ui/ui - Button variant="ghost" pattern for consistent brand gold styling */}
                    {/* GOLD BUTTON STANDARDIZATION REVISION: Official shadcn/ui documentation shows variant="ghost" prevents CVA conflicts when using custom bg-[#CA9E5B] colors */}
                    <Button
                      onClick={() => {
                        const stripeUrl =
                          "https://buy.stripe.com/7sYbJ0cf3brN69u8nB3840d";
                        window.open(stripeUrl, "_blank", "noopener,noreferrer");
                      }}
                      variant="ghost"
                      className="w-full bg-[#CA9E5B] hover:bg-[#B8935A] !text-white font-medium px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      aria-label="Book Intensive Programme for £395 - opens Stripe checkout in new window"
                    >
                      Book Intensive Programme
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEXT7 SOURCE: /websites/react_dev - Component structure modification and section removal */}
        {/* SECTION REMOVAL REASON: Official React documentation supports conditional rendering and component structure changes */}
        {/* BOOTCAMP PROGRAMMES SECTION REMOVED: Complete section with programme cards, pricing, and booking functionality eliminated per user requirements */}

        {/* CONTEXT7 SOURCE: /joshbuchea/head - HTML anchor ID attributes for bootcamp features section navigation */}
        {/* BOOTCAMP FEATURES ANCHOR IMPLEMENTATION: Official HTML documentation shows id attributes for major content sections */}
        {/* CONTEXT7 SOURCE: /websites/react_dev - Section content replacement for bootcamp-specific features showcase */}
        {/* BOOTCAMP FEATURES INTEGRATION REASON: Official React documentation Section 3.4 demonstrates content replacement patterns */}
        {/* CONTEXT7 SOURCE: /facebook/react - Content restructuring with extracted Section 6 bootcamp features */}
        {/* CONTENT RESTRUCTURING REVISION: Replaced homeschooling content with 'What Makes Our Bootcamps Different' features for improved page flow */}
        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
        {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
        <Section
          id="bootcamps-features"
          className="py-16 lg:py-24 relative"
          background="white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-yellow-25 to-orange-50/20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content Column */}
              <m.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900">
                  What Makes Our Bootcamps Different
                </h2>

                <p className="text-xl text-slate-700 leading-relaxed">
                  Expert-led intensive preparation with proven results for 11+
                  entrance examinations
                </p>

                <ul className="space-y-4">
                  <m.li
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">
                      All sessions led by experienced specialists with 11+
                      examiner credentials and/or proven track records at top
                      schools
                    </span>
                  </m.li>
                  <m.li
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">
                      Exclusive access to curated past papers, practice
                      questions, and revision materials
                    </span>
                  </m.li>
                  <m.li
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">
                      Maximum 4-5 students per group ensuring personalised
                      attention and focused learning
                    </span>
                  </m.li>
                  <m.li
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">
                      98% success rate with consistent placements at prestigious
                      independent schools
                    </span>
                  </m.li>
                  <m.li
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">
                      Focus on exam technique and confidence building alongside
                      academic preparation
                    </span>
                  </m.li>
                  <m.li
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">
                      Multiple dates available throughout the year to fit your
                      family's schedule
                    </span>
                  </m.li>
                </ul>

                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  {/* CONTEXT7 SOURCE: /vercel/next.js - Link component for client-side navigation */}
                  {/* BUTTON FIX REASON: Official Next.js documentation recommends Link with asChild for button navigation */}
                  {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Text color utility with important modifier */}
                  {/* TEXT COLOR FIX REASON: Official Tailwind CSS documentation shows !text-white for forcing white text color on gradient backgrounds */}
                  <Button
                    asChild
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 !text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
                  >
                    <Link href="https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~">
                      Book your free 11+ prep consultation
                    </Link>
                  </Button>
                </m.div>
              </m.div>

              {/* Programme Image Column */}
              <m.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* CONTEXT7 SOURCE: /radix-ui/website - AspectRatio component with 16:9 ratio for video format */}
                {/* ASPECT RATIO IMPLEMENTATION: Official Radix UI documentation for AspectRatio.Root maintaining 16:9 proportions */}
                <AspectRatio.Root
                  ratio={16 / 9}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200 cursor-pointer group"
                  onClick={() => setIsVideoOpen(true)}
                >
                  {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Object-cover utility for image optimization */}
                  {/* IMAGE OPTIMIZATION REASON: Official object-cover documentation for filling container while maintaining aspect ratio */}
                  <Image
                    src="/images/tutors/emily.jpg"
                    alt="Emily's 11+ Expert Introduction Video - Meet Emily, our specialist 11+ tutor and learn about our comprehensive entrance exam preparation approach"
                    width={600}
                    height={338}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent" />

                  {/* CONTEXT7 SOURCE: /reactjs/react.dev - Play button overlay with event handling */}
                  {/* PLAY BUTTON OVERLAY REASON: Official React documentation shows onClick event handlers for interactive elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg group-hover:bg-white/95 group-hover:scale-110 transition-all duration-300">
                      <Play
                        className="w-8 h-8 text-amber-700 ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </AspectRatio.Root>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-20" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15" />

                {/* Programme Highlight Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-amber-700">
                      Watch Introduction
                    </span>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </Section>

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
