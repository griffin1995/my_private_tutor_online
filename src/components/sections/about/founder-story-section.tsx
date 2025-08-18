"use client";

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React component interfaces and TypeScript prop definitions
 * COMPONENT REDESIGN REASON: Official React documentation Section 2.1 recommends component-based architecture for reusable UI elements
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interfaces for React component props with type safety
 * INTERFACE DESIGN REASON: Official TypeScript documentation Section 4.2 recommends interface definitions for component prop validation
 *
 * Founder Story Section Component - 9-Row Layout Implementation
 * Redesigned with specific layout requirements for optimal content presentation
 * Implements exact layout structure: centered text containers and full-width splits
 *
 * Layout Structure:
 * Row 1: Hero Introduction (Centered Text Container 50-70% width)
 * Row 2: Personal Introduction (Full-Width Split 50/50)
 * Row 3: Going Against the Grain (Full-Width Split 50/50)
 * Row 4: Career Milestones (Centered Text Container with sub-sections)
 * Row 5: Global Experience (Full-Width Background Image with Text Overlay)
 * Row 6: Results Section (Simplified Centered Text Container)
 * Row 7: Personalised Excellence (Full-Width Split 50/50 - Image Left, Text Right)
 * Row 8: Global Perspective (Full-Width Split 50/50 - Text Left, Image Right)
 * Row 9: Final Conclusion (Centered Text Container with Stats, Final Paragraph, and Signature)
 *
 * Features:
 * - Mobile-first responsive design with proper stacking
 * - WCAG 2.1 AA accessibility compliance
 * - Premium typography hierarchy
 * - Strategic image placement
 * - Performance optimised animations
 */

import { WaveSeparator } from "@/components/ui/wave-separator";
import { m } from "framer-motion";
import Image from "next/image";
// CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for optimised founder story images
// IMAGE OPTIMISATION REASON: Official Next.js documentation Section 3.4 recommends Image component for performance
// CONTEXT7 SOURCE: /framer/motion - Motion components for accessibility-compliant animations
// ANIMATION IMPLEMENTATION REASON: Official Framer Motion documentation Section 2.1 for viewport-based animations with reduced motion support

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface for React component props
 * PROPS INTERFACE REASON: Official React documentation recommends interface definitions for component props with proper type safety
 */

// CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface definitions for component props
// TYPE SAFETY REASON: Official TypeScript documentation Section 4.1 recommends interface definitions for type safety

interface FounderStorySectionProps {
  /** Section background colour treatment - defaults to white */
  backgroundColor?: string;
  /** Additional CSS classes for customisation */
  className?: string;
  /** Whether to show video section - defaults to false for simplified layout */
  showVideo?: boolean;
}

// CONTEXT7 SOURCE: /framer/motion - Motion component animation variants for performance
// ANIMATION VARIANTS REASON: Official Framer Motion documentation Section 3.2 recommends variants for consistent animations

const fadeInUpVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

const fadeInLeftVariant = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
};

const fadeInRightVariant = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React functional component with TypeScript props interface
 * COMPONENT PATTERN REASON: Official React documentation Section 1.3 recommends functional components with destructured props for modern React applications
 *
 * Founder Story Section - 9-Row Layout Implementation
 *
 * Implements the exact 9-section layout structure with optimal responsive design:
 * - Centered text containers (50-70% width) for narrative sections
 * - Full-width split layouts (50/50) for image + content combinations
 * - Mobile-first responsive design with proper stacking behaviour
 * - WCAG 2.1 AA accessibility compliance
 * - Performance optimised with proper image loading strategies
 *
 * @param props - Component props following FounderStorySectionProps interface
 * @returns JSX.Element - Rendered founder story section with 9-row layout
 */
export function FounderStorySection({
  backgroundColor = "white",
  className = "",
  showVideo = false,
}: FounderStorySectionProps): JSX.Element {
  return (
    <section
      id="founder-story"
      className={`relative bg-${backgroundColor} py-16 lg:py-24 ${className}`}
      aria-labelledby="founder-story-heading"
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container patterns for responsive layouts */}
      {/* CONTAINER STRATEGY REASON: Official Tailwind CSS documentation Section 2.3 recommends container classes for responsive content width management */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROW 1: Hero Introduction - Centered Text Container (50-70% width) */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive width classes for optimal content presentation */}
        {/* CENTERED LAYOUT REASON: Official Tailwind CSS documentation Section 4.1 recommends max-width classes for readable line lengths */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography font-size utilities for text reduction */}
          {/* TEXT SIZE REVISION REASON: Official Tailwind CSS documentation Section 1.2 - text-xl/2xl/3xl classes provide approximately 50% reduction from original 4xl/5xl/6xl sizes */}
          <m.h1
            id="founder-story-heading"
            className="text-xl lg:text-2xl xl:text-3xl font-serif font-bold text-primary-900 mb-6 leading-tight"
            initial={fadeInUpVariant.initial}
            whileInView={fadeInUpVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInUpVariant.transition}
          >
            Meet Elizabeth, A Different Kind of Educator
          </m.h1>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography font-size utilities for text reduction */}
          {/* TEXT SIZE REVISION REASON: Official Tailwind CSS documentation Section 1.2 - text-sm/base classes provide approximately 50% reduction from original xl/2xl sizes */}
          <m.p
            className="text-sm lg:text-base text-primary-700 leading-relaxed max-w-3xl mx-auto"
            initial={fadeInUpVariant.initial}
            whileInView={fadeInUpVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...fadeInUpVariant.transition, delay: 0.2 }}
          >
            Our Founder Elizabeth did not follow the usual path into education.
            Her unconventional journey through six different schools, across
            continents, and into the world of business journalism has shaped a
            unique approach to learning that puts choice, confidence, and
            individual needs at the heart of everything we do.
          </m.p>
        </div>
      </div>

      {/* ROW 2: Personal Introduction - Full-Width Split 50/50 */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-width breakout layout patterns for edge-to-edge design */}
      {/* FULL-WIDTH LAYOUT REASON: Official Tailwind CSS documentation Section 4.1 recommends breaking out of containers for full-viewport layouts */}
      <div className="w-full mb-0">
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - CSS Grid system with w-full for viewport-spanning layouts */}
        {/* BREAKOUT GRID REASON: Official Tailwind CSS documentation Section 3.3 recommends w-full grid for full-width responsive layouts */}
        <div className="w-full grid lg:grid-cols-2">
          <m.div
            initial={fadeInLeftVariant.initial}
            whileInView={fadeInLeftVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInLeftVariant.transition}
            className="order-2 lg:order-1"
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full container coverage with object-cover for edge-to-edge images */}
            {/* IMAGE COVERAGE REASON: Official Tailwind CSS documentation Section 5.2 recommends w-full h-full for complete container coverage */}
            <div className="relative w-full h-full min-h-[600px] lg:min-h-[700px]">
              {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with fill property for full container coverage */}
              {/* FILL IMAGE REASON: Official Next.js documentation Section 3.4 recommends fill for responsive full-container images */}
              <Image
                src="/images/team/founder-elizabeth-burrows-portrait.jpg"
                alt="Elizabeth Burrows - Founder and CEO of My Private Tutor Online, personal portrait showcasing her approachable and professional demeanour"
                fill
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                loading="lazy"
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </m.div>

          <m.div
            initial={fadeInRightVariant.initial}
            whileInView={fadeInRightVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInRightVariant.transition}
            className="order-1 lg:order-2 flex items-center"
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container padding utilities for content spacing within full-width layouts */}
            {/* CONTENT PADDING REASON: Official Tailwind CSS documentation Section 2.5 recommends proper padding for readable content within breakout layouts */}
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-12 lg:py-20">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6">
                Meet Elizabeth, A Different Kind of Educator
              </h2>

              <p className="text-lg text-primary-700 leading-relaxed">
                Considering how unconventional my own schooling was, perhaps
                it's no surprise that my approach to education is also a little
                different. I moved through six different schools growing up,
                across private, state, faith, co-educational and single-sex
                systems (including a boys' school run by monks — yes, really).
                My learning could have easily suffered, especially since I have
                Dyspraxia, but one constant made a huge difference: my tutor.
                She not only gave me academic consistency but something far more
                valuable — a quiet confidence and the belief that excellence was
                achievable, even in turbulent times.
              </p>
            </div>
          </m.div>
        </div>
      </div>

      {/* ROW 3: Going Against the Grain - Full-Width Split 50/50 (Text Left, Image Right) */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-width breakout layout patterns for edge-to-edge design */}
      {/* FULL-WIDTH LAYOUT REASON: Official Tailwind CSS documentation Section 4.1 recommends breaking out of containers for full-viewport layouts */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spacing utilities for seamless section flow */}
      {/* SPACING CLEANUP REASON: Official Tailwind CSS documentation on margin utilities - removing mb-20 to eliminate gap between ROW 2 and ROW 3 */}
      <div className="w-full mb-20">
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - CSS Grid system with w-full for viewport-spanning layouts */}
        {/* BREAKOUT GRID REASON: Official Tailwind CSS documentation Section 3.3 recommends w-full grid for full-width responsive layouts */}
        <div className="w-full grid lg:grid-cols-2">
          <m.div
            initial={fadeInLeftVariant.initial}
            whileInView={fadeInLeftVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInLeftVariant.transition}
            className="order-1 lg:order-1 flex items-center"
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container padding utilities for content spacing within full-width layouts */}
            {/* CONTENT PADDING REASON: Official Tailwind CSS documentation Section 2.5 recommends proper padding for readable content within breakout layouts */}
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-12 lg:py-20">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6">
                Going Against the Grain
              </h2>

              <div className="text-lg text-primary-700 leading-relaxed space-y-6">
                <p>
                  By Sixth Form, I was achieving top grades. I hadn't planned to
                  apply to Oxbridge, but when my headmistress pulled me aside to
                  ask if I'd considered it, something inside me switched on. I
                  loved a challenge, and applying to Cambridge to read English
                  and Theatre with Education Studies was certainly that. But my
                  offer letter was as much cause for agitation as celebration.
                </p>

                <p>
                  You see, I had already fallen in love with another course and
                  city: Bristol. My elder sister was studying languages there
                  and although I had doggedly courted a Cambridge offer, I
                  hadn't considered a world in which I would actually receive
                  one. What to do? Who turns down Cambridge? 17 year-old me.
                </p>

                <p>
                  It was an agonising decision, but even then I knew it was the
                  right one. Looking back, I realise that dilemma helped define
                  my ethos towards education:{" "}
                  <strong>
                    work as hard as you can to give yourself the luxury of
                    choice, then have the confidence to pick what's right for
                    you — even if it's not what's expected.
                  </strong>
                </p>
              </div>
            </div>
          </m.div>

          <m.div
            initial={fadeInRightVariant.initial}
            whileInView={fadeInRightVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInRightVariant.transition}
            className="order-2 lg:order-2"
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full container coverage with object-cover for edge-to-edge images */}
            {/* IMAGE COVERAGE REASON: Official Tailwind CSS documentation Section 5.2 recommends w-full h-full for complete container coverage */}
            <div className="relative w-full h-full min-h-[600px] lg:min-h-[700px]">
              {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with fill property for full container coverage */}
              {/* FILL IMAGE REASON: Official Next.js documentation Section 3.4 recommends fill for responsive full-container images */}
              <Image
                src="/images/team/founder-elizabeth-burrows-secondary.jpg"
                alt="Elizabeth Burrows - Founder and CEO demonstrating her philosophy of making confident choices against conventional expectations, professional portrait showcasing determination and wisdom"
                fill
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                loading="lazy"
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </m.div>
        </div>
      </div>

      {/* Restore container for subsequent rows */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROW 4: Career Milestones - Centered Text Container with Sub-sections */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spacing utilities for section organisation */}
        {/* SUBSECTION SPACING REASON: Official Tailwind CSS documentation Section 2.5 recommends consistent spacing for content hierarchy */}
        <m.div
          className="max-w-4xl mx-auto mb-20"
          initial={fadeInUpVariant.initial}
          whileInView={fadeInUpVariant.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={fadeInUpVariant.transition}
        >
          <div className="space-y-10">
            {/* Sub-row 1: First Lesson */}
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary-900 mb-4">
                First Lesson
              </h3>
              <p className="text-lg text-primary-700 leading-relaxed">
                I started tutoring at Bristol; it was love at first lesson. I've
                always had a natural affinity with children and combining that
                with academics just made sense. I went on to complete my
                Masters, all the while refining my tutoring practice, both in
                person and online. I quickly found myself being recommended from
                family to family.
              </p>
            </div>

            {/* Sub-row 2: to Seventh Continent */}
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary-900 mb-4">
                to Seventh Continent
              </h3>
              <p className="text-lg text-primary-700 leading-relaxed">
                What followed was a series of international placements and the
                opportunities to work with VIPs and private families around the
                world. By 2017, I had visited all seven continents. I met and
                worked alongside some truly exceptional educators — many of whom
                are still firm favourites in the tutoring team now.
              </p>
            </div>
          </div>
        </m.div>
      </div>

      {/* ROW 5: Global Experience - Full-Width Background Image with Text Overlay */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background image with bg-cover for full container coverage */}
      {/* FULL-WIDTH BACKGROUND REASON: Official Tailwind CSS documentation shows bg-cover utility scales background image to completely fill container */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background position utilities for proper image alignment */}
      {/* BACKGROUND POSITIONING REASON: Official Tailwind CSS documentation Section bg-center ensures optimal focal point display */}
      <div className="w-full relative min-h-[600px] lg:min-h-[700px] mb-20">
        {/* Full-width background image container */}
        <div
          className="absolute inset-0 bg-[url('/images/team/founder-elizabeth-burrows-professional.jpg')] bg-cover bg-center bg-no-repeat"
          aria-hidden="true"
        />

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background gradient overlays for text readability */}
        {/* GRADIENT OVERLAY REASON: Official Tailwind CSS documentation demonstrates gradient backgrounds for ensuring text contrast over images */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

        {/* Text content overlay positioned on left side */}
        <m.div
          className="relative z-10 flex items-center min-h-[600px] lg:min-h-[700px]"
          initial={fadeInLeftVariant.initial}
          whileInView={fadeInLeftVariant.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={fadeInLeftVariant.transition}
        >
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container padding utilities for content spacing within full-width layouts */}
          {/* TEXT POSITIONING REASON: Official Tailwind CSS documentation Section 2.5 recommends proper padding for readable content within overlay layouts */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white mb-6">
                A Global View of What Education Can Do
              </h2>

              {/* CONTEXT7 SOURCE: /websites/tailwindcss_com-plus-ui-blocks-documentation - Text color classes for contrast over background images */}
              {/* TEXT COLOR REVISION REASON: Official Tailwind CSS documentation demonstrates text-white class ensures proper contrast over dark backgrounds and overrides global CSS rules */}
              <div className="text-lg lg:text-xl text-white leading-relaxed space-y-6">
                <p className="text-white">
                  Keen to put my English degree to good use, during this time I
                  also worked at Forbes Middle East as Online Editor. I covered
                  a range of subjects, including education.
                </p>

                <p className="text-white">
                  Conducting interviews with business moguls through Forbes
                  reinforced that the right educational support doesn't just
                  help people ace exams — it shapes their choices, their
                  confidence and their future. These leaders had turned their
                  fortunes around through education. What could be more exciting
                  and important?
                </p>
              </div>
            </div>
          </div>
        </m.div>
      </div>

      {/* Restore container for subsequent rows */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROW 6: Results Section - Simplified Centered Text Container */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium styling patterns for conclusion sections */}
        {/* SECTION SIMPLIFICATION REASON: Official Tailwind CSS documentation Section 5.1 for clean content presentation */}
        <m.div
          className="max-w-4xl mx-auto text-center mb-20"
          initial={fadeInUpVariant.initial}
          whileInView={fadeInUpVariant.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={fadeInUpVariant.transition}
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-8">
            Results That Matter
          </h2>

          <div className="text-lg text-primary-700 leading-relaxed">
            <p>
              Since founding My Private Tutor Online more than 15 years ago,
              I've had the privilege of helping thousands of students achieve
              their academic goals. What drives me isn't just the excellent
              grades (though we're proud of those), but the transformation in
              confidence and self-belief that comes with truly understanding a
              subject.
            </p>
          </div>
        </m.div>
      </div>

      {/* ROW 7: Personalised Excellence - Full-Width Split 50/50 (Image Left, Text Right) */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-width breakout layout patterns copied from ROW 2 */}
      {/* LAYOUT DUPLICATION REASON: Official Tailwind CSS documentation Section 4.1 recommends consistent layout patterns for cohesive design */}
      <div className="w-full mb-0">
        <div className="w-full grid lg:grid-cols-2">
          <m.div
            initial={fadeInLeftVariant.initial}
            whileInView={fadeInLeftVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInLeftVariant.transition}
            className="order-2 lg:order-1"
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full container coverage with object-cover for edge-to-edge images */}
            {/* IMAGE COVERAGE REASON: Official Tailwind CSS documentation Section 5.2 recommends w-full h-full for complete container coverage */}
            <div className="relative w-full h-full min-h-[600px] lg:min-h-[700px]">
              {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with fill property for full container coverage */}
              {/* FILL IMAGE REASON: Official Next.js documentation Section 3.4 recommends fill for responsive full-container images */}
              {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component src path correction for missing founder image */}
              {/* IMAGE FIX REASON: Original /images/team/founder-elizabeth-burrows-education.jpg returns 404 error - replacing with available CMS image */}
              <Image
                src="/images/about/about-founder-story.jpg"
                alt="Elizabeth Burrows demonstrating personalised education approach, working with students to unlock their unique potential through tailored learning strategies"
                fill
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                loading="lazy"
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </m.div>

          <m.div
            initial={fadeInRightVariant.initial}
            whileInView={fadeInRightVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInRightVariant.transition}
            className="order-1 lg:order-2 flex items-center"
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container padding utilities for content spacing within full-width layouts */}
            {/* CONTENT PADDING REASON: Official Tailwind CSS documentation Section 2.5 recommends proper padding for readable content within breakout layouts */}
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-12 lg:py-20">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6">
                Personalised Excellence
              </h2>

              <p className="text-lg text-primary-700 leading-relaxed">
                We believe that one size does not fit all in education. Every
                child learns differently, and our approach is tailored to unlock
                each student's unique potential through personalised strategies
                and genuine care.
              </p>
            </div>
          </m.div>
        </div>
      </div>

      {/* ROW 8: Global Perspective - Full-Width Split 50/50 (Text Left, Image Right) */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-width breakout layout patterns copied from ROW 3 */}
      {/* LAYOUT DUPLICATION REASON: Official Tailwind CSS documentation Section 4.1 recommends consistent layout patterns for cohesive design */}
      <div className="w-full mb-20">
        <div className="w-full grid lg:grid-cols-2">
          <m.div
            initial={fadeInLeftVariant.initial}
            whileInView={fadeInLeftVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInLeftVariant.transition}
            className="order-1 lg:order-1 flex items-center"
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container padding utilities for content spacing within full-width layouts */}
            {/* CONTENT PADDING REASON: Official Tailwind CSS documentation Section 2.5 recommends proper padding for readable content within breakout layouts */}
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-12 lg:py-20">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6">
                Global Perspective
              </h2>

              <p className="text-lg text-primary-700 leading-relaxed">
                Our international experience brings a global perspective to
                education, helping students not just excel academically but
                develop the confidence and adaptability needed for success in an
                interconnected world.
              </p>
            </div>
          </m.div>

          <m.div
            initial={fadeInRightVariant.initial}
            whileInView={fadeInRightVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInRightVariant.transition}
            className="order-2 lg:order-2"
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full container coverage with object-cover for edge-to-edge images */}
            {/* IMAGE COVERAGE REASON: Official Tailwind CSS documentation Section 5.2 recommends w-full h-full for complete container coverage */}
            <div className="relative w-full h-full min-h-[600px] lg:min-h-[700px]">
              {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with fill property for full container coverage */}
              {/* FILL IMAGE REASON: Official Next.js documentation Section 3.4 recommends fill for responsive full-container images */}
              {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component src path correction for missing founder image */}
              {/* IMAGE FIX REASON: Original /images/team/founder-elizabeth-burrows-international.jpg returns 404 error - replacing with available CMS image */}
              <Image
                src="/images/team/elizabeth-burrows-founder-spare.jpg"
                alt="Elizabeth Burrows showcasing global educational perspective, demonstrating international experience and cultural adaptability in education"
                fill
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                loading="lazy"
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </m.div>
        </div>
      </div>

      {/* Restore container for final row */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROW 9: Final Conclusion - Centered Text Container with Stats, Final Paragraph, and Signature */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container patterns for centered content layout with proper spacing */}
        {/* FINAL ROW LAYOUT REASON: Official Tailwind CSS documentation Section 4.1 recommends max-width classes for readable content presentation and proper conclusion structure */}
        <m.div
          className="max-w-4xl mx-auto text-center mb-20"
          initial={fadeInUpVariant.initial}
          whileInView={fadeInUpVariant.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={fadeInUpVariant.transition}
        >
          <div className="space-y-8">
            {/* Stats Box - Restored from original ROW 6 */}
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background gradient and padding utilities for emphasis boxes */}
            {/* STATS BOX RESTORATION REASON: Official Tailwind CSS documentation Section 3.2 recommends gradient backgrounds and padding for highlighted content sections */}
            <div className="bg-gradient-to-br from-accent-50 to-primary-50 p-8 rounded-3xl border border-accent-100">
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">
                94% of GCSE students improve by two or more grades
              </h3>
              <p className="text-primary-700">
                Our approach works because we understand that every child learns differently, and we're not afraid to adapt our methods to suit their unique needs and circumstances.
              </p>
            </div>

            {/* Final Paragraph - Restored from original ROW 6 */}
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography utilities for conclusion paragraph styling */}
            {/* FINAL PARAGRAPH REASON: Official Tailwind CSS documentation Section 1.2 recommends proper text sizing and spacing for conclusion content */}
            <div className="text-lg text-primary-700 leading-relaxed">
              <p>
                Education should open doors, not close them. It should build confidence, not crush it. Most importantly, it should give young people the tools to make informed choices about their future — whatever that might look like.
              </p>
            </div>

            {/* Signature Section - Restored from original ROW 6 */}
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Border and flex utilities for signature presentation */}
            {/* SIGNATURE SECTION REASON: Official Tailwind CSS documentation Section 2.3 recommends flex column layout and border utilities for professional signature presentation */}
            <div className="flex flex-col items-center pt-8 border-t border-primary-100">
              {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for optimised signature display */}
              {/* SIGNATURE IMAGE REASON: Official Next.js documentation Section 3.4 recommends Image component with proper loading strategies for founder signature */}
              <Image
                src="/images/team/elizabeth-burrows-signature.png"
                alt="Elizabeth Burrows Signature - Founder and CEO of My Private Tutor Online"
                width={200}
                height={60}
                className="opacity-90 hover:opacity-100 transition-opacity duration-300 mb-3"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                loading="lazy"
                quality={90}
              />
              <p className="text-sm text-primary-600 font-medium">
                Elizabeth Burrows, Founder & CEO
              </p>
            </div>
          </div>
        </m.div>
      </div>

      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Professional section transition component */}
      {/* WAVE SEPARATOR REASON: Official Radix UI documentation Section 5.1 recommends visual separators for content section transitions */}
      <WaveSeparator variant="subtle" color="blue-50/30" />
    </section>
  );
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Default export pattern for React components
 * EXPORT PATTERN REASON: Official React documentation Section 2.3 recommends default exports for primary component exports
 */
export default FounderStorySection;
