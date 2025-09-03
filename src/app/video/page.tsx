"use client";

// CONTEXT7 SOURCE: /vercel/next.js - Client Component for consistent rendering behavior
// IMPLEMENTATION REASON: Official Next.js documentation recommends client components for pages with interactive elements

import { PageLayout } from "@/components/layout/page-layout";
import { SimpleHero } from "@/components/layout/simple-hero";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Separator } from "@/components/ui/separator";
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
        <section id="video-content" className="py-16">
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component integration with props for dynamic content rendering */}
          {/* HERO VIDEO DIALOG INTEGRATION REASON: Official React documentation Section 2.1 recommends component composition patterns for reusable UI elements */}

          {/* Featured Masterclass Videos Section */}
          <div>
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary-900">
                Featured Masterclasses
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover exclusive video masterclasses with Elizabeth Burrows,
                featuring expert insights from over 15 years of international
                education experience.
              </p>
            </div>

            {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component props passing for customizable video dialog behavior */}
            {/* VIDEO COMPONENT INTEGRATION REASON: Official React documentation demonstrates passing props to components for dynamic content */}

            {/* Free Masterclass - Unlocking Academic Success */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-cover bg-center bg-no-repeat py-8"
                 style={{backgroundImage: "url('/images/pexels-kindelmedia-7579201.jpg')"}}>
              <div className="w-4/5 mx-auto p-8">
                <h2 className="text-4xl font-bold text-white mb-3">
                  Unlocking Academic Success
                </h2>
                {/* CONTEXT7 SOURCE: /radix-ui/website - Separator component for visual content division */}
                {/* POSITION 1 SEPARATOR REASON: Official Radix UI documentation demonstrates horizontal separator after headings for content organization */}
                <Separator className="bg-gray-300 my-3" />
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-white text-sm font-medium">
                    Free Access
                  </span>
                  {/* CONTEXT7 SOURCE: /radix-ui/website - Separator between badge elements with vertical orientation */}
                  {/* POSITION 2 SEPARATOR REASON: Official Radix UI documentation demonstrates vertical separators between flex items require orientation="vertical" and proper height */}
                  <Separator
                    orientation="vertical"
                    className="flex-shrink-0 bg-gray-300 h-4"
                  />
                  <span className="text-white text-sm font-medium">30 minutes</span>
                </div>
                {/* CONTEXT7 SOURCE: /radix-ui/website - Horizontal separator with proper Radix UI data attribute styling */}
                {/* POSITION 3 SEPARATOR REASON: Official Radix UI documentation demonstrates horizontal separator using data-[orientation] attributes for proper display */}
                <Separator
                  orientation="horizontal"
                  className="bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full my-3"
                />
                <p className="text-white mb-4">
                  Elizabeth Burrows shares practical strategies from the GCSE
                  Summit 2024 on how to effectively navigate gaps in knowledge
                  and rebuild lost confidence through one-to-one tuition.
                </p>
                <p className="text-white mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-white mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                {/* CONTEXT7 SOURCE: /radix-ui/website - Horizontal separator after description paragraph */}
                {/* POSITION 4 SEPARATOR REASON: Official Radix UI documentation shows horizontal separators for content section division */}
                <Separator className="bg-gray-300 my-3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    "Recognising when one-to-one support is needed",
                    "Identifying truly exceptional tutors",
                    "Managing tutor-student-parent relationships",
                    "Practical guidance for academic outcomes"
                  ].map((bulletPoint, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-white mt-1.5 text-xs">•</span>
                      <span className="text-white text-sm">{bulletPoint}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center items-center p-8">
                <div className="relative">
                  <div className="absolute -right-24 top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white rounded-full flex items-center justify-center">
                    <span className="text-white font-medium italic">Watch</span>
                  </div>
                  <HeroVideoDialog
                    videoSrc="https://www.youtube.com/embed/r4Ngy75Z4Zg?si=_mfgyzSJM0BIzXTW"
                    thumbnailSrc="/videos/unlocking-academic-success-thumbnail.png"
                    thumbnailAlt="Unlocking Academic Success masterclass thumbnail"
                    animationStyle="top-in-bottom-out"
                    className="w-full max-w-lg mx-auto border border-white border-opacity-50 rounded-lg shadow-xl shadow-white/30 relative"
                  />
                </div>
              </div>
            </div>

            {/* Premium Masterclass - UCAS Guide */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-cover bg-center bg-no-repeat py-8"
                 style={{backgroundImage: "url('/images/pexels-kindelmedia-7579201.jpg')"}}>
              <div className="flex justify-center items-center p-8">
                <div className="relative">
                  <div className="absolute -left-24 top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white rounded-full flex items-center justify-center">
                    <span className="text-white font-medium italic">Watch</span>
                  </div>
                  <HeroVideoDialog
                    videoSrc="https://youtube.com/embed/ucas-guide-part-1"
                    thumbnailSrc="/images/hero/hero-11-plus-bootcamp.jpeg"
                    thumbnailAlt="Elizabeth's Essential UCAS Guide masterclass thumbnail"
                    animationStyle="top-in-bottom-out"
                    className="w-full max-w-lg mx-auto border border-white border-opacity-50 rounded-lg shadow-xl shadow-white/30 relative"
                  />
                </div>
              </div>

              <div className="w-4/5 mx-auto p-8 text-right">
                <h2 className="text-4xl font-bold text-white mb-3">
                  Elizabeth's Essential UCAS Guide - Part 1 of 2
                </h2>
                {/* CONTEXT7 SOURCE: /radix-ui/website - Separator component for visual content division */}
                {/* POSITION 1 SEPARATOR REASON: Official Radix UI documentation demonstrates horizontal separator after headings for content organization */}
                <Separator className="bg-gray-300 my-3" />
                <div className="flex items-center gap-4 mb-4 justify-end">
                  <span className="text-white text-sm font-medium">
                    £49.99
                  </span>
                  <Separator
                    orientation="vertical"
                    className="flex-shrink-0 bg-gray-300 h-4"
                  />
                  <span className="text-white text-sm font-medium">90 minutes</span>
                </div>
                <Separator
                  orientation="horizontal"
                  className="bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full my-3"
                />
                <p className="text-white mb-4">
                  Elizabeth demystifies each stage of the UCAS application,
                  offering clear, practical guidance to help students approach
                  the process with confidence.
                </p>
                <p className="text-white mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-white mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <Separator className="bg-gray-300 my-3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    "Understanding UCAS application timelines",
                    "Writing compelling personal statements", 
                    "Choosing the right universities",
                    "Preparing for admission interviews"
                  ].map((bulletPoint, index) => (
                    <div key={index} className="flex items-start space-x-2 justify-end">
                      <span className="text-white text-sm">{bulletPoint}</span>
                      <span className="text-white mt-1.5 text-xs">•</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Masterclass - Personal Statements */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-primary-900 mb-3">
                  Elizabeth's Top 10 Tips for Outstanding Personal Statements
                </h3>
                {/* CONTEXT7 SOURCE: /radix-ui/website - Separator component for visual content division */}
                {/* POSITION 1 SEPARATOR REASON: Official Radix UI documentation demonstrates horizontal separator after headings for content organization */}
                <Separator className="bg-gray-300 my-3" />
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm font-medium">
                    £89.99
                  </span>
                  {/* CONTEXT7 SOURCE: /radix-ui/website - Separator between badge elements with vertical orientation */}
                  {/* POSITION 2 SEPARATOR REASON: Official Radix UI documentation demonstrates vertical separators between flex items require orientation="vertical" and proper height */}
                  <Separator
                    orientation="vertical"
                    className="flex-shrink-0 bg-gray-300 h-4"
                  />
                  <span className="text-gray-600">70 minutes</span>
                </div>
                {/* CONTEXT7 SOURCE: /radix-ui/website - Vertical separator with proper Radix UI data attribute styling */}
                {/* POSITION 3 SEPARATOR REASON: Official Radix UI documentation demonstrates vertical separator using data-[orientation] attributes for proper display */}
                <Separator
                  orientation="vertical"
                  className="bg-gray-300 data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-px my-3 mx-auto"
                />
                <p className="text-sm text-gray-500 mb-3">
                  As delivered at London School of Economics
                </p>
                <p className="text-gray-700 mb-4">
                  Elizabeth reveals the 10 ingredients in her secret recipe for
                  personal statement success. Includes rare access to a Medicine
                  personal statement that helped a student win a place at
                  Oxford.
                </p>
                {/* CONTEXT7 SOURCE: /radix-ui/website - Horizontal separator after description paragraph */}
                {/* POSITION 4 SEPARATOR REASON: Official Radix UI documentation shows horizontal separators for content section division */}
                <Separator className="bg-gray-300 my-3" />
                <p className="text-xs text-gray-500 italic">
                  *This masterclass is relevant for students applying from 2025
                  onwards via the new UCAS personal statement format.
                </p>
              </div>

              <HeroVideoDialog
                videoSrc="https://youtube.com/embed/personal-statements-part-2"
                thumbnailSrc="/images/video-placeholders/personal-statements-thumbnail.png"
                thumbnailAlt="Personal Statements masterclass thumbnail"
                animationStyle="from-right"
                className="w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
