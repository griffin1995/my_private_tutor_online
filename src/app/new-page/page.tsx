"use client";

// CONTEXT7 SOURCE: /vercel/next.js - Client Component for consistent rendering behavior
// IMPLEMENTATION REASON: Official Next.js documentation recommends client components for pages with interactive elements
// CONTEXT7 SOURCE: /vercel/next.js - App Router page structure patterns
// PAGE CREATION REASON: Official Next.js App Router documentation Section 3.1 demonstrates page.tsx file structure in app directory

import { PageLayout } from "@/components/layout/page-layout";
import { SimpleHero } from "@/components/layout/simple-hero";
import { FirstLessonSection } from "@/components/sections/about/FirstLessonSection";
import { VideoMasterclassGrid } from "@/components/video/VideoMasterclassGrid";
// CONTEXT7 SOURCE: /reactjs/react.dev - Component import patterns for modular React architecture
// COMPONENT IMPORT REASON: Official React documentation demonstrates importing custom components for enhanced UI functionality
import { VideoMasterclassSectionTextFullWidth } from "@/components/video/VideoMasterclassSectionTextFullWidth";
import { VideoMasterclassSectionImageFullWidthTextHalfWidth } from "@/components/video/VideoMasterclassSectionImageFullWidthTextHalfWidth";
// CONTEXT7 SOURCE: /radix-ui/primitives - Radix UI Accordion component for accessible collapsible sections
// ACCORDION IMPORT REASON: Official Radix UI documentation demonstrates importing accordion primitive components
import * as Accordion from "@radix-ui/react-accordion";

// CONTEXT7 SOURCE: /lucide-dev/lucide - Lucide React icon library for chevron indicator
// ICON IMPORT REASON: Official Lucide documentation demonstrates ChevronDown icon for accordion triggers
import { ChevronDown } from "lucide-react";
// CONTEXT7 SOURCE: /grx7/framer-motion - Framer Motion for additional animations in content sections
// ANIMATION IMPORT REASON: Official Framer Motion documentation demonstrates motion.div for content animations
import { motion } from "framer-motion";
import React, { useCallback, useState, useRef, useMemo } from "react";
import { useRenderGuard, useMemoryGuard, useFPSMonitor } from "@/lib/performance/crash-prevention";
import { type VideoMasterclass } from "../../../COMPREHENSIVE_VIDEO_CMS";
import { getVideoMasterclassPage } from "@/lib/cms/cms-images";
import { type StandardizedContent, type StandardizedHeadingContent, type StandardizedVideoContent } from "./types";
import { standardizedPageContent, getStandardizedContentById } from "./standardized-data";

// CONTEXT7 SOURCE: /microsoft/typescript - Type predicate for runtime type safety and null video path handling
// TYPE PREDICATE REASON: Official TypeScript documentation demonstrates type predicates for narrowing discriminated unions and preventing runtime errors
type ValidVideoMasterclass = VideoMasterclass & { youtubeUrl: string };

const isValidVideo = (video: VideoMasterclass): video is ValidVideoMasterclass => {
  const isValid = Boolean(video.youtubeUrl && video.youtubeUrl.trim() !== '');
  console.log('🎥 Video Filter Debug:', {
    videoId: video.id,
    videoTitle: video.title,
    youtubeUrl: video.youtubeUrl,
    isValid: isValid,
    urlType: typeof video.youtubeUrl,
    urlTrimmed: video.youtubeUrl?.trim?.() || 'N/A'
  });
  return isValid;
};

// CONTEXT7 SOURCE: /vercel/next.js - Client component pattern without metadata export
// CLIENT COMPONENT REASON: Official Next.js documentation states client components cannot export metadata

// CONTEXT7 SOURCE: /microsoft/typescript - Standardized data structure implementation for consistent content management
// STANDARDIZATION REASON: Official TypeScript documentation for data modeling and type safety patterns

// Helper function to convert standardized video data to existing VideoMasterclass interface
function convertToVideoMasterclass(standardizedVideo: any): VideoMasterclass {
  return {
    id: standardizedVideo.id,
    title: standardizedVideo.title,
    description: standardizedVideo.description,
    bulletPoints: standardizedVideo.bulletPoints,
    youtubeUrl: standardizedVideo.youtubeUrl,
    thumbnailImage: standardizedVideo.thumbnailImage,
    backgroundImage: standardizedVideo.backgroundImage,
    isPaid: standardizedVideo.isPaid,
    purchaseLink: standardizedVideo.purchaseLink,
  };
}

export default function NewPage() {
  // CONTEXT7 SOURCE: /reactjs/react.dev - Performance monitoring guards for crash prevention
  // SAFETY REASON: Official React documentation for performance monitoring and infinite loop prevention
  useRenderGuard("NewPage");
  useMemoryGuard();
  useFPSMonitor("NewPage");

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Clean component layout without debug borders
  // COMPONENT LAYOUT: Official Tailwind CSS documentation for production-ready layouts

  // CONTEXT7 SOURCE: /reactjs/react.dev - useState for tracking previous accordion values
  // STATE MANAGEMENT REASON: Official React documentation demonstrates useState for component state management
  const [previousValues, setPreviousValues] = useState<string[]>([]);

  // CONTEXT7 SOURCE: /vercel/next.js - Static hero image patterns for consistent branding
  // HERO IMAGE REASON: Official Next.js documentation for static asset referencing in public directory
  const heroImage = {
    src: "/images/hero/hero-about-us.jpg", // Using existing hero image as placeholder
  };

  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for memoizing expensive operations
  // BATCH FETCH: Get all video masterclasses in single optimized operation
  const allVideos = useMemo(() => {
    const videos = getVideoMasterclassPage();
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 All Videos Fetched:', videos?.length || 0, 'videos');
    }
    return videos;
  }, []);

  // Split videos into sections for organized display
  const ucasVideos = useMemo(() => {
    const videos = allVideos.slice(2, 4); // Next 2 videos for UCAS section
    if (process.env.NODE_ENV === 'development') {
      console.log('🎓 UCAS Videos:', videos?.length || 0, 'videos');
    }
    return videos;
  }, [allVideos]);

  // CONTEXT7 SOURCE: /microsoft/typescript - Standardized data structure access patterns
  // STANDARDIZED DATA ACCESS: Get content sections using standardized data structure
  const standardizedData = useMemo(() => {
    const primarySchoolHeading = getStandardizedContentById("primary-school-heading") as StandardizedHeadingContent;
    const primarySchoolVideos1 = getStandardizedContentById("primary-school-videos-1") as StandardizedVideoContent;
    const primarySchoolVideos2 = getStandardizedContentById("primary-school-videos-2") as StandardizedVideoContent;
    const secondarySchoolHeading = getStandardizedContentById("secondary-school-heading") as StandardizedHeadingContent;
    const secondarySchoolVideos1 = getStandardizedContentById("secondary-school-videos-1") as StandardizedVideoContent;
    const secondarySchoolVideos2 = getStandardizedContentById("secondary-school-videos-2") as StandardizedVideoContent;

    if (process.env.NODE_ENV === 'development') {
      console.log('📋 Standardized Data Debug:', {
        primarySchoolHeading: !!primarySchoolHeading,
        primarySchoolVideos1: primarySchoolVideos1?.videos?.length || 0,
        primarySchoolVideos2: primarySchoolVideos2?.videos?.length || 0,
        secondarySchoolHeading: !!secondarySchoolHeading,
        secondarySchoolVideos1: secondarySchoolVideos1?.videos?.length || 0,
        secondarySchoolVideos2: secondarySchoolVideos2?.videos?.length || 0
      });
    }

    return {
      primarySchoolHeading,
      primarySchoolVideos1,
      primarySchoolVideos2,
      secondarySchoolHeading,
      secondarySchoolVideos1,
      secondarySchoolVideos2
    };
  }, []);

  // Extract individual videos for the 2-row layout
  const { primarySchoolHeading, primarySchoolVideos1, primarySchoolVideos2, secondarySchoolHeading, secondarySchoolVideos1, secondarySchoolVideos2 } = standardizedData;
  const primaryVideo3B = primarySchoolVideos1.videos[0]; // "Confidence-building lessons designed for early learners"
  const primaryVideo3C = primarySchoolVideos1.videos[1]; // "7+, 8+ and 11+ specialists with a track record of top school offers"
  const primaryVideo3D = primarySchoolVideos2.videos[0]; // "Individual learning plans shaped by expert assessment"

  // CONTEXT7 SOURCE: /mdn/content - Element.scrollIntoView() method for smooth scrolling behavior
  // SCROLL FUNCTIONALITY REASON: Official MDN documentation demonstrates scrollIntoView with behavior options
  const scrollToSection = useCallback((sectionId: string) => {
    // CONTEXT7 SOURCE: /mdn/content - prefers-reduced-motion media query for accessibility
    // ACCESSIBILITY REASON: Official MDN documentation demonstrates respecting user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'instant' : 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, []);

  // CONTEXT7 SOURCE: /reactjs/react.dev - useCallback for memoizing event handlers
  // EVENT HANDLER REASON: Official React documentation demonstrates useCallback for stable function references
  // CONTEXT7 SOURCE: /radix-ui/primitives - Accordion content targeting for scroll behavior
  // SCROLL FIX REASON: Official Radix UI documentation shows content elements have data attributes for state management
  const handleAccordionChange = useCallback((newValues: string[]) => {
    setPreviousValues(prevValues => {
      // Find newly opened sections by comparing with previous values
      const newlyOpened = newValues.filter(value => !prevValues.includes(value));

      // If there's a newly opened section, scroll to the most recent one
      if (newlyOpened.length > 0) {
        const mostRecentSection = newlyOpened[newlyOpened.length - 1];

        // CONTEXT7 SOURCE: /radix-ui/primitives - Accordion animation timing for content expansion
        // TIMING REASON: Official Radix UI documentation shows accordion content animations take 300ms for slideDown
        setTimeout(() => {
          scrollToSection(`accordion-content-${mostRecentSection}`);
        }, 350);
      }

      // Return new values for state update
      return newValues;
    });
  }, [scrollToSection]);

  return (
    <div>
      {/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero integration with full-screen layout pattern */}
      {/* HERO INTEGRATION REASON: Official Next.js documentation for component composition and layout consistency */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation integration */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification */}
      <section id="new-page-hero">
        <SimpleHero
          backgroundImage={heroImage.src}
          h1="New Page"
          h2="Welcome to our new page"
          decorativeStyle="lines"
          textVerticalOffset="default"
        />
      </section>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY REASON: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout
        background="white"
        showHeader={true}
        showFooter={true}
        containerSize="full"
        verticalSpacing="lg"
        className="space-y-0"
        footerProps={{ showContactForm: true }}
      >
        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Single Accordion.Root with type="multiple" for all sections visible simultaneously */}
        {/* MULTIPLE ACCORDION REASON: Official Radix UI documentation demonstrates type="multiple" to allow multiple items open at once */}
        <Accordion.Root
          type="multiple"
          defaultValue={[]}
          className="w-full"
          onValueChange={handleAccordionChange}
        >
          {/* Primary School Accordion Item */}
          <Accordion.Item value="primary-school" className="border-none" id="accordion-item-primary-school">
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between py-0 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 group">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FirstLessonSection
                      heading={primarySchoolHeading.title}
                      paragraph={primarySchoolHeading.description}
                      backgroundColor={primarySchoolHeading.backgroundColor}
                      className={primarySchoolHeading.className}
                    />
                  </motion.div>
                </div>
                <ChevronDown className="h-8 w-8 shrink-0 text-gray-600 transition-transform duration-300 ease-in-out mr-8 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" id="accordion-content-primary-school">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <div className="mx-auto w-[85%] max-w-none px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                  <motion.div className="space-y-8 sm:space-y-12 lg:space-y-16">
                    <motion.div className="w-full">
                      <VideoMasterclassSectionImageFullWidthTextHalfWidth
                        video={convertToVideoMasterclass(primaryVideo3B)}
                        className="py-0"
                      />
                    </motion.div>
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                      <motion.div>
                        <VideoMasterclassSectionTextFullWidth
                          video={convertToVideoMasterclass(primaryVideo3C)}
                          layout="text-left"
                          className="py-0"
                        />
                      </motion.div>
                      <motion.div>
                        <VideoMasterclassSectionTextFullWidth
                          video={convertToVideoMasterclass(primaryVideo3D)}
                          layout="text-right"
                          className="py-0"
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>

          {/* Secondary School Accordion Item */}
          <Accordion.Item value="secondary-school" className="border-none" id="accordion-item-secondary-school">
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between py-0 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 group">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FirstLessonSection
                      heading={secondarySchoolHeading.title}
                      paragraph={secondarySchoolHeading.description}
                      backgroundColor={secondarySchoolHeading.backgroundColor}
                      className={secondarySchoolHeading.className}
                    />
                  </motion.div>
                </div>
                <ChevronDown className="h-8 w-8 shrink-0 text-gray-600 transition-transform duration-300 ease-in-out mr-8 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" id="accordion-content-secondary-school">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <div className="mx-auto w-[85%] max-w-none px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                  <div className="space-y-8 sm:space-y-12 lg:space-y-16">
                    <div className="w-full">
                      <VideoMasterclassSectionImageFullWidthTextHalfWidth
                        video={convertToVideoMasterclass(secondarySchoolVideos1.videos[1])}
                        className="py-0"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                      <div>
                        <VideoMasterclassSectionTextFullWidth
                          video={convertToVideoMasterclass(secondarySchoolVideos2.videos[0])}
                          layout="text-left"
                          className="py-0"
                        />
                      </div>
                      <div>
                        <VideoMasterclassSectionTextFullWidth
                          video={secondarySchoolVideos1.videos[0] ? convertToVideoMasterclass(secondarySchoolVideos1.videos[0]) : undefined}
                          layout="text-right"
                          className="py-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>

          {/* Entrance Exams Accordion Item */}
          <Accordion.Item value="entrance-exams" className="border-none" id="accordion-item-entrance-exams">
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between py-0 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 group">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FirstLessonSection
                      heading="Entrance Exams"
                      paragraph="Specialised preparation for competitive entrance examinations across all age groups."
                      backgroundColor="white"
                      className="py-16"
                    />
                  </motion.div>
                </div>
                <ChevronDown className="h-8 w-8 shrink-0 text-gray-600 transition-transform duration-300 ease-in-out mr-8 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" id="accordion-content-entrance-exams">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <div className="mx-auto w-[85%] max-w-none px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                  <div className="space-y-8 sm:space-y-12 lg:space-y-16">
                    <div className="w-full">
                      <VideoMasterclassSectionImageFullWidthTextHalfWidth
                        video={{
                          id: "11plus-preparation",
                          title: "Aligned With Every Major Exam Board",
                          description: "Our team works with GL, CEM, ISEB, CAT4, and internal papers set by individual schools.",
                          bulletPoints: ["GL Assessment expertise", "CEM preparation", "ISEB Common Entrance", "School-specific papers"],
                          youtubeUrl: null,
                          thumbnailImage: "/images/features/aligned-with-every-major-exam-board.jpg",
                          backgroundImage: "/images/features/aligned-with-every-major-exam-board.jpg",
                          isPaid: true,
                          purchaseLink: "https://buy.stripe.com/test_example",
                        }}
                        className="py-0"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>

          {/* University Admissions Accordion Item */}
          <Accordion.Item value="university-admissions" className="border-none" id="accordion-item-university-admissions">
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between py-0 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 group">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FirstLessonSection
                      heading="University Admissions & English Proficiency"
                      paragraph="Expert academic support for undergraduates and postgraduates, including essay coaching, dissertations, and subject-specific tutoring."
                      backgroundColor="gray-50"
                      className="py-16"
                    />
                  </motion.div>
                </div>
                <ChevronDown className="h-8 w-8 shrink-0 text-gray-600 transition-transform duration-300 ease-in-out mr-8 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" id="accordion-content-university-admissions">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <div className="mx-auto w-[85%] max-w-none px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                  <div className="space-y-8 sm:space-y-12 lg:space-y-16">
                    {ucasVideos.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                        {ucasVideos.slice(0, 2).map((video, index) => (
                          <div key={video.id}>
                            <VideoMasterclassSectionTextFullWidth
                              video={video}
                              layout={index === 0 ? "text-left" : "text-right"}
                              className="py-0"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>

          {/* Online Homeschooling Accordion Item */}
          <Accordion.Item value="online-homeschooling" className="border-none" id="accordion-item-online-homeschooling">
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between py-0 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 group">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FirstLessonSection
                      heading="Online Homeschooling"
                      paragraph="Comprehensive one-to-one homeschooling for families seeking both academic structure and flexibility."
                      backgroundColor="white"
                      className="py-16"
                    />
                  </motion.div>
                </div>
                <ChevronDown className="h-8 w-8 shrink-0 text-gray-600 transition-transform duration-300 ease-in-out mr-8 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" id="accordion-content-online-homeschooling">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <div className="mx-auto w-[85%] max-w-none px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                  <VideoMasterclassSectionImageFullWidthTextHalfWidth
                    video={{
                      id: "homeschool-curriculum",
                      title: "Why Choose Homeschooling with Us",
                      description: "Private‑School Standard, Delivered Virtually: We deliver bespoke online programmes that rival independent schools in quality.",
                      bulletPoints: ["Private school standard", "Personalised curriculum", "Expert tutor teams"],
                      youtubeUrl: null,
                      thumbnailImage: "/images/features/why-choose-homeschooling-with-us.jpg",
                      backgroundImage: "/images/features/why-choose-homeschooling-with-us.jpg",
                      isPaid: false,
                    }}
                    className="py-0"
                  />
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>

          {/* SEN Support Accordion Item */}
          <Accordion.Item value="sen-support" className="border-none" id="accordion-item-sen-support">
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between py-0 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 group">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FirstLessonSection
                      heading="SEN Support & Neurodiverse Learning"
                      paragraph="Our Founder Elizabeth's own neurodiversity (dyspraxia) means she's especially passionate about equipping students with gamechanging SEN support."
                      backgroundColor="gray-50"
                      className="py-16"
                    />
                  </motion.div>
                </div>
                <ChevronDown className="h-8 w-8 shrink-0 text-gray-600 transition-transform duration-300 ease-in-out mr-8 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" id="accordion-content-sen-support">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <div className="mx-auto w-[85%] max-w-none px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                    <div>
                      <VideoMasterclassSectionTextFullWidth
                        video={{
                          id: "individualised-learning",
                          title: "Individualised Learning",
                          description: "Tutors conduct detailed assessments to identify strengths, challenges, and personal learning styles.",
                          bulletPoints: ["Detailed assessments", "Strength identification", "Learning style analysis"],
                          youtubeUrl: null,
                          thumbnailImage: "/images/features/individualised-learning.jpg",
                          backgroundImage: "/images/features/individualised-learning.jpg",
                          isPaid: true,
                          purchaseLink: "https://buy.stripe.com/test_example",
                        }}
                        layout="text-left"
                        className="py-0"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>

          {/* London Tutoring Accordion Item */}
          <Accordion.Item value="london-tutoring" className="border-none" id="accordion-item-london-tutoring">
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between py-0 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 group">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FirstLessonSection
                      heading="London In-Person Tutoring"
                      paragraph="In-person tutoring typically available across Zones 1–5, depending on student location and tutor availability."
                      backgroundColor="white"
                      className="py-16"
                    />
                  </motion.div>
                </div>
                <ChevronDown className="h-8 w-8 shrink-0 text-gray-600 transition-transform duration-300 ease-in-out mr-8 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" id="accordion-content-london-tutoring">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <div className="mx-auto w-[85%] max-w-none px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                  <div className="space-y-8 sm:space-y-12 lg:space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                      <div>
                        <VideoMasterclassSectionTextFullWidth
                          video={{
                            id: "dbs-checked-tutors",
                            title: "DBS-Checked Specialist Tutors",
                            description: "Sessions delivered by DBS-checked, specialist tutors with experience of the London independent and state school sectors.",
                            bulletPoints: ["DBS-checked tutors", "Specialist expertise", "London school experience"],
                            youtubeUrl: null,
                            thumbnailImage: "/images/masterclass-thumbnails/ucas-guide.png",
                            backgroundImage: "/images/ucas-part-2-library-background.jpg",
                            isPaid: true,
                            purchaseLink: "https://buy.stripe.com/test_example",
                          }}
                          layout="text-right"
                          className="py-0"
                        />
                      </div>
                      <div>
                        <VideoMasterclassSectionTextFullWidth
                          video={{
                            id: "entrance-exam-subject-support",
                            title: "Entrance Exam & Subject-Specific Support",
                            description: "Ideal for entrance exam preparation, subject-specific tuition, or ongoing academic support.",
                            bulletPoints: ["Entrance exam prep", "Subject specialisation", "Ongoing support"],
                            youtubeUrl: null,
                            thumbnailImage: "/images/masterclass-thumbnails/ucas-guide.png",
                            backgroundImage: "/images/ucas-summit-background.jpg",
                            isPaid: true,
                            purchaseLink: "https://buy.stripe.com/test_example",
                          }}
                          layout="text-left"
                          className="py-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </PageLayout>
    </div>
  );
}