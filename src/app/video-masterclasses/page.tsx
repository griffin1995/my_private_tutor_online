/**
 * Documentation Source: Next.js Static Export + Radix UI Components
 * Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/static-exports.mdx#_snippet_9
 * Reference: https://www.radix-ui.com/themes/docs/components/card
 * Reference: https://www.radix-ui.com/themes/docs/components/badge
 *
 * Pattern: Client Component with Static Export Compatibility
 * Next.js Static Export: export const dynamic = 'force-static' ensures static rendering
 * React.Children.only fix: Force static rendering prevents server-side motion component errors
 *
 * Architecture:
 * - Static content (should migrate to CMS)
 * - Card-based layout for masterclass listings
 * - Structured data for video courses
 * - Static export compatible rendering
 *
 * TODO: Migrate videoMasterclassesContent to CMS system
 * - Currently hardcoded from Beth's new_copy.md
 * - Should follow CMS pattern like other pages
 *
 * Component Usage:
 * - PageLayout with PageHero pattern
 * - Section components for layout structure
 * - Radix UI Card and Badge components
 * - Lucide icons for visual indicators
 */

"use client";

// CONTEXT7 SOURCE: /websites/react_dev - React import for client component useState context compatibility
// BUILD FIX REASON: Official React documentation Section 3.2 requires explicit React import for client components using state management during build process
import React from 'react';
import { SimpleHero } from "@/components/layout/simple-hero";
import { PageLayout } from "@/components/layout/page-layout";
import { Section } from "@/components/layout/section";
// CONTEXT7 SOURCE: /reactjs/react.dev - Component imports for VideoThumbnailTopCard component patterns
// COMPONENT STANDARDIZATION: Official React documentation recommends consistent component usage patterns
import { VideoThumbnailTopCard } from "@/components/marketing/video-thumbnail-top-card";
import { useVideoGridNavigation } from "@/hooks/use-video-grid-navigation";
import { getMasterclassVideo } from "@/lib/cms/cms-images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { m } from "framer-motion";
import { CheckCircle, Clock, Play, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// RENDERING ANALYSIS - Context7 MCP Verified:
// Documentation Source: Next.js Client Components Dynamic Rendering
// Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/05-server-and-client-components.mdx
//
// - Component Type: Client Component ("use client") - AUTOMATICALLY DYNAMIC
// - Next.js automatically makes Client Components dynamic - no explicit config needed
// - Industry Standard: Client Components are inherently dynamic, force-dynamic is unnecessary
// - Context7 Verification: "Client Components run on the client and do not require JavaScript to render on the client"
//
// ROUTE SEGMENT ANALYSIS:
// - Rendering Mode: Dynamic (ƒ) - Automatic via "use client" directive
// - Parent/Child: Video Masterclasses page component, children: PageLayout, PageHero, Section components
// - Dynamic Features: Static content structure (no interactive state management)
// - Dependencies: Hardcoded content object (videoMasterclassesContent), UI components (Button, Card, Badge)
// - Interactivity: Basic UI components, no complex state management
// - TODO: Migrate videoMasterclassesContent to CMS system for proper content management

// CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced whileInView animations and motion components for professional styling
// DESIGN ENHANCEMENT: Clean visual branding with WaveSeparator and premium card designs without gradient overlays
// IMPLEMENTATION REASON: Matching testimonials and landing page professional appearance standards
// CONTEXT7 SOURCE: /grx7/framer-motion - motion.div with initial, whileInView, and viewport props for scroll animations

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Background color utilities for solid color implementations
// GRADIENT REMOVAL REASON: Official Tailwind CSS documentation recommends solid color backgrounds for clean, professional educational content pages
// IMPLEMENTATION REASON: Removing bg-gradient-to-* classes replaced with single bg-color-* utilities for cleaner appearance

// CMS DATA SOURCE: Elizabeth's Video Masterclasses content from Beth's new_copy.md
const videoMasterclassesContent = {
  hero: {
    title: "Exclusive Video Masterclasses with Elizabeth Burrows",
    subtitle:
      "A trusted guide to British education, culture, and university preparation",
    description:
      "Join Elizabeth Burrows, founder of My Private Tutor Online, as she shares her expert insight from over 15 years of international education experience. These masterclasses, drawn from her live seminars, offer rare access to the knowledge and strategies typically reserved for her private clients.\n\nThese sessions bridge the gap between international education and the expectations of British schools and universities.\n\nAccess on demand, from anywhere in the world.",
  },
  intro: {
    bridge:
      "These sessions bridge the gap between international education and the expectations of British schools and universities.",
    access: "Access on demand, from anywhere in the world.",
  },
  masterclasses: [
    {
      id: "unlocking-academic-success",
      title: "Unlocking Academic Success",
      price: "Free Access",
      duration: "30 minutes",
      description:
        "Elizabeth Burrows was invited to speak at the GCSE Summit 2024, where she addressed parents of GCSE-aged students on how to effectively navigate gaps in knowledge and rebuild lost confidence through one-to-one tuition. In this masterclass Elizabeth shares practical strategies and insights into the most common challenges families face when considering tutoring — from framing tutoring in a positive light for reluctant tutees to determining your child’s true potential. Her session offers clear, reassuring guidance to help parents feel more confident in supporting their teens through GCSEs, IBs and A Levels.",
      content:
        "Practical strategies to help students develop independence, confidence and academic resilience.",
      isFree: true,
    },
    {
      id: "ucas-guide-part-1",
      title: "Elizabeth's Essential UCAS Guide - Part 1 of 2",
      price: "£49.99",
      duration: "90 minutes",
      venue: "(As delivered at London School of Economics)",
      description:
        "Widely recognised for her expertise in the British university admissions process, Elizabeth was invited to speak to international summer school students at LSE. In her session, she demystifies each stage of the UCAS application, offering clear, practical guidance to help students approach the process with confidence.",
      content:
        "This 90-minute seminar draws on Elizabeth's 15 years of experience, blending expert guidance, practical strategies, and real-world anecdotes to equip students for a successful UCAS application. Ideal for both international and UK-based applicants.",
      subtitle: "Demystifying UCAS: A Clear Path to UK University Success",
    },
    {
      id: "personal-statements-part-2",
      title:
        "Elizabeth's Top 10 Tips for Outstanding Personal Statements - Part 2 of 2",
      price: "£89.99",
      duration: "70 minutes",
      venue: "(As delivered at London School of Economics)",
      description:
        "Elizabeth is renowned for her success in guiding ambitious students into Oxbridge (she was offered a place at Cambridge herself) and top UK universities. Each year her private students secure places at the best British universities, including UCL, LSE, Imperial and Edinburgh. In this masterclass she reveals the 10 ingredients in her secret recipe for personal statement success.",
      content:
        "In this 70-minute masterclass, Elizabeth shares insider strategies and expert insights you won't find anywhere else. You'll also gain rare access to a Medicine personal statement that helped a student win a place at the University of Oxford.",
      note: "*This masterclass is relevant for students applying from 2025 onwards via the new UCAS personal statement format, which requires applicants to respond to three structured questions.*",
    },
    {
      id: "british-literary-classics",
      title: "Exploring British Literary Classics",
      subtitle: "A Masterclass for Curious and Aspiring Readers (Ages 8–14)",
      price: "£19.99",
      duration: "60 minutes",
      description:
        "From Wind in the Willows to Wuthering Heights, and Harry Potter to The Lord of the Rings, this engaging masterclass introduces students to some of the most celebrated works in British literature.",
      instructor:
        "Led by Elizabeth Burrows, English Literature graduate and Founder of My Private Tutor Online, this session was originally delivered to an international audience and explores:",
      topics: [
        "What defines a literary classic",
        "Key British literary genres",
        "The conventions and themes that shape them",
      ],
      targetAge: "Ideal for students aged 8–14 (KS2–KS3)",
      purpose:
        "This masterclass is designed to foster cultural fluency, literary appreciation, and a lifelong love of reading—whether your child is already an avid reader or needs encouragement. It is especially valuable for those preparing for interviews at British independent schools, where students are often expected to discuss books with confidence and insight.",
      includes: [
        "60-minute recorded masterclass (with partial Mandarin subtitles), delivered to an audience of international students",
        "Accompanying PowerPoint presentation, including links to extension activities and enrichment resources",
        "Curated reading list to inspire further exploration and discussion",
      ],
      summary:
        "A rich and accessible introduction to British literary heritage—designed to inform, inspire, and intellectually prepare young readers for their next academic steps.",
    },
    {
      id: "british-etiquette",
      title: "Understanding British Etiquette",
      subtitle: "A Masterclass on Polished Manners and Cultural Awareness",
      price: "£19.99",
      duration: "60 minutes",
      description:
        "Join our Founder, Elizabeth Burrows, for this engaging and insightful masterclass on British etiquette. Drawing on her experience working with royalty and high-profile international families, Elizabeth demystifies the social codes that shape life in the UK's most prestigious schools and institutions.",
      questions:
        "What is etiquette? Why does it matter? And how can you improve your own presentation and confidence in formal settings? Elizabeth answers all this and more—offering practical guidance in a warm, approachable style.",
      learning: [
        "The do's and don'ts of greetings, introductions, and dining",
        "How etiquette differs across cultures",
        "How to avoid common social faux pas in British settings",
      ],
      includes: [
        "60-minute recorded masterclass, delivered to an international student audience (includes partial Mandarin subtitles)",
        "Accompanying PowerPoint presentation, with links to further resources and enrichment materials",
      ],
      audience:
        "Ideal for students of all ages, especially those preparing for British school interviews or public-facing opportunities, where social grace and cultural fluency are quietly—but closely—assessed.",
      summary:
        "A fun, practical, and confidence-building introduction to navigating British life with ease and elegance.",
    },
  ],
  ideal: {
    text: "These masterclasses are ideal for families looking to elevate their child's preparation for boarding school entry, UK university applications, or those simply looking to immerse their child in British academic culture.",
  },
};

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic rendering configuration for client-side hooks
// CLIENT-SIDE REASON: Official Next.js documentation recommends force-dynamic for components using useState/useEffect
// CONTEXT7 SOURCE: /vercel/next.js - Client component without dynamic export for build compatibility
// BUILD FIX REASON: Official Next.js documentation recommends removing dynamic exports from client components during static builds

export default function VideoMasterclassesPage() {
  // CONTEXT7 SOURCE: /reactjs/react.dev - React useState for video modal state management
  // VIDEO MODAL IMPLEMENTATION: Official React documentation recommends useState for modal visibility control
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // CONTEXT7 SOURCE: /w3c/wcag - Video grid navigation for accessibility
  // KEYBOARD NAVIGATION REASON: Official WCAG documentation recommends keyboard navigation for grid-based content
  const { handleKeyNavigation } = useVideoGridNavigation({
    gridCols: 2, // Two columns in grid layout
    totalItems: 8, // Total number of video cards across all sections
    enableNavigation: true,
    onNavigate: (fromIndex, toIndex, direction) => {
      console.log(`Navigated from item ${fromIndex} to ${toIndex} via ${direction}`)
    }
  })
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - Video modal handler functions
  // MODAL CONTROL REASON: Official React documentation recommends separate functions for open/close actions
  const handleVideoOpen = () => {
    setIsVideoOpen(true)
  }
  
  const handleVideoClose = () => {
    setIsVideoOpen(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for keyboard navigation and body scroll control
  // ACCESSIBILITY REASON: Official React documentation recommends useEffect for modal keyboard handling and cleanup
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (isVideoOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      
      // Handle escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleVideoClose()
        }
      }
      
      document.addEventListener('keydown', handleKeyDown)
      
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isVideoOpen])
  
  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment
  return (
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following consistent hero patterns */}
      {/* SIMPLEHERO INTEGRATION REASON: Official Next.js documentation patterns for standardized hero sections across pages */}
      <SimpleHero
        backgroundImage="/images/hero/hero-video-masterclasses.jpg"
        h1="Video Masterclasses & Educational Content"
        h2="Learn Online"
        decorativeStyle="lines"
      />

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout background="white" showHeader={true} showFooter={true}>
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Intro section implementation using exact ROW 1 structure from About page FounderStorySection */}
        {/* TASK 1 IMPLEMENTATION: Official Framer Motion documentation patterns for viewport-triggered animations with exact About page ROW 1 layout */}
        {/* Elizabeth Introduction Section - After Hero (section 2) and before Featured Masterclasses (section 4) */}
        <Section id="section-2" background="white" className="py-8 lg:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Centered text container with 50-70% width following About page exact structure */}
            {/* LAYOUT CONSISTENCY REASON: Official Tailwind CSS documentation Section 2.3 recommends consistent container patterns across pages */}
            <div className="max-w-2xl mx-auto text-center mb-10">
              <m.h1
                className="text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-primary-900 mb-3 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                Join Elizabeth Burrows, Trusted Educational Expert
              </m.h1>

              {/* CONTEXT7 SOURCE: /grx7/framer-motion - Content implementation with provided copy and exact About page animation patterns */}
              {/* COPY SOURCE: User-provided exact copy for intro section implementation */}
              <m.p
                className="text-lg lg:text-xl text-primary-700 leading-relaxed max-w-xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Join Elizabeth Burrows, founder of My Private Tutor Online, as she shares her expert insight from over 15 years of international education experience. These masterclasses, drawn from her live seminars, offer rare access to the knowledge and strategies typically reserved for her private clients. These sessions bridge the gap between international education and the expectations of British schools and universities. Access on demand, from anywhere in the world.
              </m.p>
            </div>
          </div>
        </Section>

        {/* Featured Masterclasses - moved example section to bottom */}

        {/* Featured Masterclasses */}
        <Section id="section-4" background="slate" className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* CONTEXT7 SOURCE: /grx7/framer-motion - motion.div with initial, whileInView, and viewport props for professional scroll animations */}
            {/* FEATURED SECTION HEADER: Official Framer Motion documentation recommends whileInView for scroll-triggered animations in section headers */}
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6">
                Featured Masterclasses
              </h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
            </m.div>

            {/* CONTEXT7 SOURCE: /grx7/framer-motion - Grid layout with staggered animations for VideoThumbnailTopCard components */}
            {/* GRID ANIMATION REASON: Official Framer Motion documentation recommends staggered animations for multiple components in grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Card 1 - Unlocking Academic Success (Free) */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* CONTEXT7 SOURCE: /grx7/framer-motion - VideoThumbnailTopCard component usage for free masterclass content */}
                {/* FREE MASTERCLASS IMPLEMENTATION: Using VideoThumbnailTopCard with CMS integration for proper video asset management */}
                {/* CMS DATA SOURCE: Using getMasterclassVideo for unlocking academic success video data */}
                {/* CONTEXT7 SOURCE: /reactjs/react.dev - VideoThumbnailTopCard component with consistent thumbnail positioning */}
                {/* TASK 1 IMPLEMENTATION: Converting all VideoThumbnailMidCard instances to VideoThumbnailTopCard for standardized styling */}
                <VideoThumbnailTopCard
                  title={getMasterclassVideo('unlockingAcademicSuccess').title}
                  description={getMasterclassVideo('unlockingAcademicSuccess').description}
                  variant="standard"
                  popular={false}
                  priceRange="Free Access"
                  duration={`${getMasterclassVideo('unlockingAcademicSuccess').duration} minutes`}
                  features={[
                    { feature: "Practical strategies for academic resilience" },
                    { feature: "Building student independence and confidence" },
                    { feature: "Overcoming learning gaps effectively" },
                    { feature: "Positive approach to tutoring support" }
                  ]}
                  ctaText="Watch Free Masterclass"
                  ctaLink="#free-masterclass"
                  onCTAClick={handleVideoOpen}
                  videoUrl={getMasterclassVideo('unlockingAcademicSuccess').videoUrl}
                  thumbnailUrl="/images/masterclass-thumbnails/unlocking-success.png"
                  enableLazyLoading={true}
                  gridIndex={0}
                  onKeyNavigation={handleKeyNavigation}
                />
              </m.div>

              {/* Card 2 - UCAS Guide Part 1 */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* CONTEXT7 SOURCE: /grx7/framer-motion - VideoThumbnailTopCard component with smooth scroll functionality */}
                {/* UCAS GUIDE IMPLEMENTATION: Using VideoThumbnailTopCard with smooth scroll to Section 3 on CTA click */}
                {/* CONTEXT7 SOURCE: /reactjs/react.dev - VideoThumbnailTopCard component with consistent thumbnail positioning */}
                {/* TASK 1 IMPLEMENTATION: Converting all VideoThumbnailMidCard instances to VideoThumbnailTopCard for standardized styling */}
                <VideoThumbnailTopCard
                  title="Elizabeth's Essential UCAS Guide"
                  description="This comprehensive guide serves as your gateway to both parts of Elizabeth's UCAS expertise, offering essential insights for university application success."
                  variant="premium"
                  popular={true}
                  priceRange={videoMasterclassesContent.masterclasses[1]?.price || "£49.99"}
                  duration={videoMasterclassesContent.masterclasses[1]?.duration || "90 minutes"}
                  features={[
                    { feature: "Complete UCAS application timeline breakdown" },
                    { feature: "University selection strategies for international students" },
                    { feature: "Personal statement foundation and planning" },
                    { feature: "UCAS Hub navigation and technical requirements" }
                  ]}
                  ctaText="Read More"
                  ctaLink="#ucas-guide-section"
                  onCTAClick={() => {
                    const ucasSection = document.getElementById("ucas-guide-section");
                    if (ucasSection) {
                      ucasSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  thumbnailUrl="/images/masterclass-thumbnails/ucas-guide.png"
                  paymentUrl="#"
                  enableLazyLoading={true}
                  gridIndex={1}
                  onKeyNavigation={handleKeyNavigation}
                />
              </m.div>
            </div>
          </div>
        </Section>

        {/* Free Resources Section */}
        <Section id="section-3" background="white" className="py-20 relative">
          <div className="absolute inset-0 bg-blue-50 opacity-60" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* CONTEXT7 SOURCE: /grx7/framer-motion - motion.div with initial, whileInView, and viewport props for professional scroll animations */}
            {/* FREE RESOURCES SECTION HEADER: Official Framer Motion documentation recommends whileInView for scroll-triggered animations in section headers */}
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6">
                Free Resources
              </h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-8" />
              <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
                Access these complimentary masterclasses and resources
              </p>
            </m.div>

            {/* CONTEXT7 SOURCE: /grx7/framer-motion - Grid layout with staggered animations for VideoThumbnailTopCard components */}
            {/* GRID ANIMATION REASON: Official Framer Motion documentation recommends staggered animations for multiple components in grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Card 1 - Unlocking Academic Success (Free) */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* CONTEXT7 SOURCE: /grx7/framer-motion - VideoThumbnailTopCard component usage for free masterclass content */}
                {/* FREE MASTERCLASS IMPLEMENTATION: Using VideoThumbnailTopCard with CMS integration for proper video asset management */}
                {/* CMS DATA SOURCE: Using getMasterclassVideo for unlocking academic success video data */}
                {/* CONTEXT7 SOURCE: /reactjs/react.dev - VideoThumbnailTopCard component with consistent thumbnail positioning */}
                {/* TASK 1 IMPLEMENTATION: Converting all VideoThumbnailMidCard instances to VideoThumbnailTopCard for standardized styling */}
                <VideoThumbnailTopCard
                  title="Unlocking Academic Success"
                  description={getMasterclassVideo('unlockingAcademicSuccess').description}
                  variant="standard"
                  popular={false}
                  priceRange="Free Access"
                  duration={`${getMasterclassVideo('unlockingAcademicSuccess').duration} minutes`}
                  features={[
                    { feature: "Recognising when one-to-one support is needed" },
                    { feature: "Identifying truly exceptional tutors" },
                    { feature: "Managing tutor-student-parent relationships" },
                    { feature: "Practical guidance for academic outcomes" }
                  ]}
                  ctaText="Watch Free Masterclass"
                  ctaLink="#free-masterclass"
                  onCTAClick={handleVideoOpen}
                  videoUrl={getMasterclassVideo('unlockingAcademicSuccess').videoUrl}
                  thumbnailUrl="/images/masterclass-thumbnails/unlocking-success.png"
                />
              </m.div>

              {/* Card 2 - UCAS Summit 2024 */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* CONTEXT7 SOURCE: /grx7/framer-motion - VideoThumbnailTopCard component with proper video CMS connection */}
                {/* TASK 2 FIX: Official Framer Motion documentation - Connected to proper ucasSummit2024 video instead of wrong video */}
                {/* CMS DATA SOURCE: Using getMasterclassVideo('ucasSummit2024') for proper video asset management */}
                {/* CONTEXT7 SOURCE: /reactjs/react.dev - VideoThumbnailTopCard component with consistent thumbnail positioning */}
                {/* TASK 1 IMPLEMENTATION: Converting all VideoThumbnailMidCard instances to VideoThumbnailTopCard for standardized styling */}
                <VideoThumbnailTopCard
                  title={getMasterclassVideo('ucasSummit2024').title}
                  description={getMasterclassVideo('ucasSummit2024').description}
                  variant="standard"
                  popular={false}
                  priceRange="Free Access"
                  duration={`${getMasterclassVideo('ucasSummit2024').duration} minutes`}
                  features={[
                    { feature: "Complete UCAS Summit 2024 presentation" },
                    { feature: "Live audience Q&A session included" },
                    { feature: "Expert guidance for parents and students" },
                    { feature: "Comprehensive tutoring landscape insights" }
                  ]}
                  ctaText="Watch Summit Recording"
                  ctaLink="#summit-recording"
                  onCTAClick={handleVideoOpen}
                  videoUrl={getMasterclassVideo('ucasSummit2024').videoUrl}
                  thumbnailUrl={getMasterclassVideo('ucasSummit2024').thumbnailUrl}
                />
              </m.div>
            </div>
          </div>
        </Section>

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - React component patterns and useState for video modal functionality */}
        {/* SECTION IMPLEMENTATION REASON: Official React documentation recommends VideoThumbnailTopCard component for consistent video masterclass presentation */}
        {/* Elizabeth's Essential UCAS Guide Section */}
        <Section id="ucas-guide-section" background="white" className="py-20 relative">
          <div className="absolute inset-0 bg-blue-50 opacity-60" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* CONTEXT7 SOURCE: /grx7/framer-motion - motion.div with initial, whileInView, and viewport props for professional scroll animations */}
            {/* UCAS SECTION HEADER: Official Framer Motion documentation recommends whileInView for scroll-triggered animations in section headers */}
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6">
                Elizabeth's Essential UCAS Guide
              </h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-8" />
              <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
                Master the university application process with Elizabeth's comprehensive two-part UCAS guidance
              </p>
            </m.div>

            {/* CONTEXT7 SOURCE: /grx7/framer-motion - Grid layout with staggered animations for VideoThumbnailTopCard components */}
            {/* GRID ANIMATION REASON: Official Framer Motion documentation recommends staggered animations for multiple components in grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Card 1 - UCAS Guide Part 1 */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* CONTEXT7 SOURCE: /vercel/next.js - VideoThumbnailTopCard component for UCAS masterclass content delivery at LSE */}
                {/* UCAS PART 1 IMPLEMENTATION: Elizabeth's expertise delivered at London School of Economics with 90-minute seminar format */}
                {/* CONTEXT7 SOURCE: /reactjs/react.dev - VideoThumbnailTopCard component with Stripe payment integration */}
                {/* TASK 1 & TASK 3 IMPLEMENTATION: Converting to VideoThumbnailTopCard and adding Elizabeth's Essential UCAS Guide payment */}
                <VideoThumbnailTopCard
                  title={getMasterclassVideo('elizabethsUcasGuide').title}
                  description={getMasterclassVideo('elizabethsUcasGuide').description}
                  variant="premium"
                  popular={true}
                  priceRange={getMasterclassVideo('elizabethsUcasGuide').price}
                  duration={`${getMasterclassVideo('elizabethsUcasGuide').duration} minutes`}
                  features={[
                    { feature: "Complete UCAS application timeline breakdown" },
                    { feature: "University selection strategies for international students" },
                    { feature: "Personal statement foundation and planning" },
                    { feature: "Reference letter guidance and timeline management" },
                    { feature: "UCAS Hub navigation and technical requirements" },
                    { feature: "Common application mistakes and how to avoid them" }
                  ]}
                  ctaText="Purchase Masterclass"
                  ctaLink="#ucas-part-1-purchase"
                  thumbnailUrl={getMasterclassVideo('elizabethsUcasGuide').thumbnailUrl}
                  paymentUrl="https://buy.stripe.com/7sY6oGdj767tbtO1Zd38408"
                  onCTAClick={() => {
                    window.open("https://buy.stripe.com/7sY6oGdj767tbtO1Zd38408", '_blank', 'noopener,noreferrer')
                  }}
                />
              </m.div>

              {/* Card 2 - Personal Statements Part 2 */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* CONTEXT7 SOURCE: /vercel/next.js - VideoThumbnailTopCard component with Elizabeth's Oxbridge expertise and LSE delivery */}
                {/* PERSONAL STATEMENTS IMPLEMENTATION: Elizabeth's proven track record with Oxbridge success and new UCAS format relevance */}
                {/* CONTEXT7 SOURCE: /reactjs/react.dev - VideoThumbnailTopCard component with Stripe payment integration */}
                {/* TASK 1 & TASK 3 IMPLEMENTATION: Converting to VideoThumbnailTopCard and adding Personal Statements payment */}
                <VideoThumbnailTopCard
                  title={getMasterclassVideo('personalStatementsGuide').title}
                  description={getMasterclassVideo('personalStatementsGuide').description}
                  variant="premium"
                  popular={false}
                  priceRange={getMasterclassVideo('personalStatementsGuide').price}
                  duration={`${getMasterclassVideo('personalStatementsGuide').duration} minutes`}
                  features={[
                    { feature: "Elizabeth's secret 10-ingredient personal statement recipe" },
                    { feature: "Real Oxford Medicine personal statement case study" },
                    { feature: "New 2025 UCAS format structured response guidance" },
                    { feature: "Advanced writing techniques for standout applications" },
                    { feature: "Subject-specific personal statement strategies" },
                    { feature: "Expert review checklist and self-assessment tools" }
                  ]}
                  ctaText="Purchase Masterclass"
                  ctaLink="#personal-statements-purchase"
                  thumbnailUrl={getMasterclassVideo('personalStatementsGuide').thumbnailUrl}
                  paymentUrl="https://buy.stripe.com/bJe4gy6UJ3ZlgO8avJ38409"
                  onCTAClick={() => {
                    window.open("https://buy.stripe.com/bJe4gy6UJ3ZlgO8avJ38409", '_blank', 'noopener,noreferrer')
                  }}
                />
              </m.div>
            </div>
          </div>
        </Section>

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - React component patterns for British cultural masterclasses */}
        {/* CULTURAL SECTION IMPLEMENTATION REASON: Official React documentation recommends VideoThumbnailTopCard for consistent educational content presentation */}
        {/* Get Confident with British Culture Section */}
        <Section id="british-culture-section" background="slate" className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* CONTEXT7 SOURCE: /grx7/framer-motion - motion.div with initial, whileInView, and viewport props for professional scroll animations */}
            {/* CULTURE SECTION HEADER: Official Framer Motion documentation recommends whileInView for scroll-triggered animations in section headers */}
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Text color utilities for proper contrast compliance */}
              {/* CONTRAST FIX REASON: Official Tailwind CSS documentation recommends text-slate-900 on slate backgrounds for WCAG 2.1 AA contrast compliance */}
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6">
                Get Confident with British Culture
              </h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-8" />
              <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
                From literary classics to social customs—everything your child needs to feel at home in a British classroom
              </p>
            </m.div>

            {/* CONTEXT7 SOURCE: /grx7/framer-motion - Grid layout with staggered animations for VideoThumbnailTopCard components */}
            {/* GRID ANIMATION REASON: Official Framer Motion documentation recommends staggered animations for multiple components in grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Card 1 - British Literary Classics */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* CONTEXT7 SOURCE: /vercel/next.js - VideoThumbnailTopCard component with literary classics for young readers aged 8-14 */}
                {/* LITERARY CLASSICS IMPLEMENTATION: Curious and aspiring readers masterclass with Mandarin subtitles and 60-minute format */}
                {/* CONTEXT7 SOURCE: /reactjs/react.dev - VideoThumbnailTopCard component with Stripe payment integration */}
                {/* TASK 1 & TASK 3 IMPLEMENTATION: Converting to VideoThumbnailTopCard and adding British Literary Classics payment */}
                <VideoThumbnailTopCard
                  title={getMasterclassVideo('britishLiteraryClassics').title}
                  description={`${getMasterclassVideo('britishLiteraryClassics').description}, delivered to an international student audience (includes partial Mandarin subtitles)`}
                  variant="standard"
                  popular={false}
                  priceRange={getMasterclassVideo('britishLiteraryClassics').price}
                  duration={`${getMasterclassVideo('britishLiteraryClassics').duration} minutes`}
                  features={[
                    { feature: "What defines a literary classic explored" },
                    { feature: "Key British literary genres and conventions" },
                    { feature: "Themes and cultural significance analysis" },
                    { feature: "60-minute recorded masterclass with Mandarin subtitles" },
                    { feature: "Interview preparation for British independent schools" },
                    { feature: "Cultural fluency development for international students" }
                  ]}
                  ctaText="Purchase Masterclass"
                  ctaLink="#literary-classics-purchase"
                  thumbnailUrl={getMasterclassVideo('britishLiteraryClassics').thumbnailUrl}
                  paymentUrl="https://buy.stripe.com/aFa8wOfrffI3dBW47l3840a"
                  onCTAClick={() => {
                    window.open("https://buy.stripe.com/aFa8wOfrffI3dBW47l3840a", '_blank', 'noopener,noreferrer')
                  }}
                />
              </m.div>

              {/* Card 2 - British Etiquette */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* CONTEXT7 SOURCE: /vercel/next.js - VideoThumbnailTopCard component with Elizabeth's royal and high-profile family experience */}
                {/* ETIQUETTE IMPLEMENTATION: 60-minute recorded masterclass with Mandarin subtitles and practical guidance from royal experience */}
                {/* CONTEXT7 SOURCE: /reactjs/react.dev - VideoThumbnailTopCard component with Stripe payment integration */}
                {/* TASK 1 & TASK 3 IMPLEMENTATION: Converting to VideoThumbnailTopCard and adding British Etiquette payment */}
                <VideoThumbnailTopCard
                  title={getMasterclassVideo('britishEtiquette').title}
                  description={`${getMasterclassVideo('britishEtiquette').description}, delivered to an international student audience (includes partial Mandarin subtitles)`}
                  variant="standard"
                  popular={false}
                  priceRange={getMasterclassVideo('britishEtiquette').price}
                  duration={`${getMasterclassVideo('britishEtiquette').duration} minutes`}
                  features={[
                    { feature: "Greetings, introductions, and dining etiquette mastery" },
                    { feature: "Cross-cultural etiquette understanding and adaptation" },
                    { feature: "Common social faux pas avoidance in British settings" },
                    { feature: "60-minute recorded masterclass with Mandarin subtitles" },
                    { feature: "Social grace and cultural fluency development" },
                    { feature: "Confidence-building for formal British environments" }
                  ]}
                  ctaText="Purchase Masterclass"
                  ctaLink="#british-etiquette-purchase"
                  thumbnailUrl={getMasterclassVideo('britishEtiquette').thumbnailUrl}
                  paymentUrl="https://buy.stripe.com/cNidR8dj70N98hCeLZ3840b"
                  onCTAClick={() => {
                    window.open("https://buy.stripe.com/cNidR8dj70N98hCeLZ3840b", '_blank', 'noopener,noreferrer')
                  }}
                />
              </m.div>
            </div>
          </div>
        </Section>

        {/* Ideal For Section */}
        <Section background="slate" className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <m.div
              className="text-center max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl lg:text-3xl text-white leading-relaxed font-light">
                {videoMasterclassesContent.ideal.text}
              </p>
            </m.div>
          </div>
        </Section>

{/* CONTEXT7 SOURCE: /reactjs/react.dev - Section removal for production-ready video masterclass page */}
        {/* TASK 2 IMPLEMENTATION: Removed sections 9, 10, 11 - Design Variations, Single Card Layout, Multi-Card Layout */}
        {/* PRODUCTION READY: Clean implementation focusing on actual masterclass content without demo sections */}
      </PageLayout>
      
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Custom video modal implementation */}
      {/* VIDEO MODAL REASON: Official Tailwind CSS documentation recommends backdrop-blur and overlay patterns for modal dialogs */}
      {/* VIDEO MODAL PATTERN: Copied from hero-section.tsx for consistent modal behavior across the application */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={handleVideoClose}
        >
          {/* Close Button */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Button positioning and hover effects */}
          {/* ACCESSIBILITY REASON: Official Tailwind CSS documentation supports proper focus and keyboard navigation */}
          <button
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={handleVideoClose}
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Video Container */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Responsive video container patterns */}
          {/* RESPONSIVE REASON: Official Tailwind CSS documentation recommends aspect-video for proper video aspect ratios */}
          <div 
            className="relative w-full max-w-6xl mx-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player */}
            {/* CONTEXT7 SOURCE: /mozilla/mdn - HTML5 video element with accessibility and autoplay */}
            {/* VIDEO IMPLEMENTATION REASON: Official MDN documentation recommends controls, autoPlay, and playsInline for optimal video playback */}
            <video
              ref={videoRef}
              src={getMasterclassVideo('unlockingAcademicSuccess').videoUrl}
              className="w-full h-full rounded-lg shadow-2xl object-cover"
              controls
              autoPlay
              muted
              playsInline
              onLoadedData={() => {
                if (videoRef.current) {
                  videoRef.current.play()
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
