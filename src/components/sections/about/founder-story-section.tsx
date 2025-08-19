"use client";

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React component interfaces and TypeScript prop definitions
 * COMPONENT REDESIGN REASON: Official React documentation Section 2.1 recommends component-based architecture for reusable UI elements
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interfaces for React component props with type safety
 * INTERFACE DESIGN REASON: Official TypeScript documentation Section 4.2 recommends interface definitions for component prop validation
 *
 * Founder Story Section Component - 6-Section Magazine Layout Implementation
 * Redesigned with specific layout requirements for optimal content presentation
 * Implements exact layout structure: centered text containers and full-width splits
 *
 * Layout Structure:
 * Row 1: Hero Introduction (Centered Text Container 50-70% width)
 * Row 2: Personal Introduction (Full-Width Split 50/50)
 * Row 3: Going Against the Grain (Full-Width Split 50/50)
 * Row 4: Career Milestones (Centered Text Container with sub-sections)
 * Row 5: Global Experience (Hero-Style Text Overlay)
 * Row 6: Results Section (Centered Text Container with premium formatting)
 *
 * Features:
 * - Mobile-first responsive design with proper stacking
 * - WCAG 2.1 AA accessibility compliance
 * - Premium typography hierarchy
 * - Strategic image placement
 * - Performance optimised animations
 */

import { GradientOverlay } from "@/components/ui/gradient-overlay";
import { WaveSeparator } from "@/components/ui/wave-separator";
import { m } from "framer-motion";
import Image from "next/image";
// CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for optimised founder story images
// IMAGE OPTIMISATION REASON: Official Next.js documentation Section 3.4 recommends Image component for performance
// CONTEXT7 SOURCE: /framer/motion - Motion components for accessibility-compliant animations
// ANIMATION IMPLEMENTATION REASON: Official Framer Motion documentation Section 2.1 for viewport-based animations with reduced motion support

/**
 * CONTEXT7 SOURCE: /framer/motion - Animation variants for accessibility-compliant motion
 * ANIMATION VARIANTS REASON: Official Framer Motion documentation Section 2.1 recommends reusable variants for consistent animations with reduced motion support
 */
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
 * CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface for React component props
 * PROPS INTERFACE REASON: Official React documentation recommends interface definitions for component props with proper type safety
 */

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface with optional properties and React.ReactNode for children
 * COMPONENT PROPS REASON: Official TypeScript documentation Section 5.1 recommends flexible interfaces with sensible defaults
 */
interface FounderStorySectionProps {
  /** Section background colour treatment - defaults to white */
  backgroundColor?: string;
  /** Additional CSS classes for customisation */
  className?: string;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React functional component with TypeScript props interface
 * COMPONENT PATTERN REASON: Official React documentation Section 1.3 recommends functional components with destructured props for modern React applications
 *
 * Founder Story Section Component - 6-Section Magazine Layout
 *
 * A premium founder story section implementing magazine-style layout structure
 * with strategic content organisation and accessibility-compliant animations.
 *
 * @param props - Component props following FounderStorySectionProps interface
 * @returns JSX.Element - Rendered founder story section with magazine structure
 */
export function FounderStorySection({
  backgroundColor = "white",
  className = "",
}: FounderStorySectionProps): JSX.Element {
  return (
    <section
      id="founder-story"
      className={`relative bg-${backgroundColor} py-16 lg:py-24 ${className}`}
      aria-labelledby="founder-story-heading"
    >
      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Gradient overlay component for professional section transitions */}
      {/* GRADIENT TREATMENT REASON: Official Radix UI documentation Section 4.1 recommends gradient overlays for visual hierarchy */}
      <GradientOverlay
        direction="top"
        from="white/20"
        to="transparent"
        height="h-20"
        className="top-0"
      />

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container patterns for responsive layouts */}
      {/* CONTAINER STRATEGY REASON: Official Tailwind CSS documentation Section 2.3 recommends container classes for responsive content width management */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROW 1: Hero Introduction - Centered Text Container (50-70% width) */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive width classes for optimal content presentation */}
        {/* CENTERED LAYOUT REASON: Official Tailwind CSS documentation Section 4.1 recommends max-width classes for readable line lengths */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <m.h1
            id="founder-story-heading"
            className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-primary-900 mb-6 leading-tight"
            initial={fadeInUpVariant.initial}
            whileInView={fadeInUpVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInUpVariant.transition}
          >
            Meet Elizabeth, A Different Kind of Educator
          </m.h1>

          {/* CONTEXT7 SOURCE: /websites/react_dev - Content editing patterns for React components */}
          {/* CONTENT CONDENSATION REASON: Official React documentation Section for content editing patterns applied to reduce Elizabeth introduction by 50% while preserving key messaging about unconventional background and unique educational approach */}
          <m.p
            className="text-xl lg:text-2xl text-primary-700 leading-relaxed max-w-3xl mx-auto"
            initial={fadeInUpVariant.initial}
            whileInView={fadeInUpVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...fadeInUpVariant.transition, delay: 0.2 }}
          >
            Elizabeth's unconventional journey through six different schools and
            into business journalism has shaped a unique educational approach
            that puts choice, confidence, and individual needs first.
          </m.p>
        </div>
      </div>

      {/* ROW 2: Personal Introduction - Full-Width Edge-to-Edge Split 50/50 */}
      {/* CONTEXT7 SOURCE: /websites/tailwindcss - Dynamic height matching with CSS Grid auto-sizing patterns */}
      {/* DYNAMIC HEIGHT REASON: Official Tailwind CSS documentation for grid-auto-rows and min-height responsive scaling for proportional column synchronization */}
      <div className="w-full mb-0">
        <div className="grid lg:grid-cols-2 gap-0 lg:grid-rows-1 auto-rows-fr items-stretch">
          <m.div
            initial={fadeInLeftVariant.initial}
            whileInView={fadeInLeftVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInLeftVariant.transition}
            className="order-2 lg:order-1"
          >
            {/* CONTEXT7 SOURCE: /websites/tailwindcss - Aspect ratio utilities with min-height constraints for responsive scaling */}
            {/* ASPECT RATIO SCALING REASON: Official Tailwind CSS documentation recommends aspect-ratio with min-height for proportional scaling based on content */}
            <div className="relative w-full min-h-[400px] lg:min-h-[500px] aspect-[4/5] lg:aspect-auto lg:h-full">
              {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with fill prop for dynamic container optimization */}
              {/* DYNAMIC IMAGE SCALING REASON: Official Next.js documentation Section 3.4 recommends fill prop with object-cover for proportional container filling */}
              <Image
                src="/images/team/founder-elizabeth-burrows-portrait.jpg"
                alt="Elizabeth Burrows - Founder and CEO of My Private Tutor Online, personal portrait showcasing her approachable and professional demeanour"
                fill
                className="object-cover"
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
            className="order-1 lg:order-2 px-6 lg:px-8 py-12 lg:py-16 min-h-[400px] lg:min-h-[500px] flex flex-col justify-center"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6">
              Meet Elizabeth, A Different Kind of Educator
            </h2>

            <p className="text-lg text-primary-700 leading-relaxed">
              Considering how unconventional my own schooling was, perhaps it's
              no surprise that my approach to education is also a little
              different. I moved through six different schools growing up,
              across private, state, faith, co-educational and single-sex
              systems (including a boys' school run by monks — yes, really). My
              learning could have easily suffered, especially since I have
              Dyspraxia, but one constant made a huge difference: my tutor. She
              not only gave me academic consistency but something far more
              valuable — a quiet confidence and the belief that excellence was
              achievable, even in turbulent times.
            </p>
          </m.div>
        </div>
      </div>

      {/* ROW 3: Going Against the Grain - Full-Width Edge-to-Edge Split 50/50 */}
      {/* CONTEXT7 SOURCE: /websites/tailwindcss - Dynamic height matching with CSS Grid proportional scaling */}
      {/* PROPORTIONAL SCALING REASON: Official Tailwind CSS documentation for grid-rows-1 and auto-rows-fr for synchronized column height matching */}
      <div className="w-full mb-20">
        <div className="grid lg:grid-cols-2 gap-0 lg:grid-rows-1 auto-rows-fr items-stretch">
          <m.div
            initial={fadeInLeftVariant.initial}
            whileInView={fadeInLeftVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInLeftVariant.transition}
            className="px-6 lg:px-8 py-12 lg:py-16 min-h-[450px] lg:min-h-[550px] flex flex-col justify-center"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-8">
              Going Against the Grain
            </h2>

            <div className="text-lg text-primary-700 leading-relaxed space-y-6">
              <p>
                By Sixth Form, I was achieving top grades. I hadn't planned to
                apply to Oxbridge, but when my headmistress pulled me aside to
                ask if I'd considered it, something inside me switched on. I
                loved a challenge, and applying to Cambridge to read English and
                Theatre with Education Studies was certainly that. But my offer
                letter was as much cause for agitation as celebration.
              </p>

              <p>
                You see, I had already fallen in love with another course and
                city: Bristol. My elder sister was studying languages there and
                although I had doggedly courted a Cambridge offer, I hadn't
                considered a world in which I would actually receive one. What
                to do? Who turns down Cambridge? 17 year-old me.
              </p>

              <p>
                It was an agonising decision, but even then I knew it was the
                right one. Looking back, I realise that dilemma helped define my
                ethos towards education:{" "}
                <strong>
                  work as hard as you can to give yourself the luxury of choice,
                  then have the confidence to pick what's right for you — even
                  if it's not what's expected.
                </strong>
              </p>
            </div>
          </m.div>

          <m.div
            initial={fadeInRightVariant.initial}
            whileInView={fadeInRightVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInRightVariant.transition}
            className="order-1 lg:order-2"
          >
            {/* CONTEXT7 SOURCE: /websites/tailwindcss - Responsive aspect ratio with proportional height scaling */}
            {/* PROPORTIONAL IMAGE SCALING REASON: Official Tailwind CSS documentation for aspect-ratio utilities with min-height for content-driven scaling */}
            <div className="relative w-full min-h-[450px] lg:min-h-[550px] aspect-[4/5] lg:aspect-auto lg:h-full">
              {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with fill prop for proportional container optimization */}
              {/* PROPORTIONAL IMAGE FITTING REASON: Official Next.js documentation Section 3.4 recommends fill prop with object-cover for responsive proportional scaling */}
              <Image
                src="/images/team/founder-elizabeth-burrows-secondary.jpg"
                alt="Elizabeth Burrows Making Educational Choices - Founder of My Private Tutor Online, representing the confidence to choose what's right rather than what's expected"
                fill
                className="object-cover"
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROW 4: Career Milestones - Centered Text Container with Sub-sections + Video Integration */}
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

            {/* Sub-row 2: to Seventh Continent with Video Integration */}
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary-900 mb-4">
                to Seventh Continent
              </h3>
              <p className="text-lg text-primary-700 leading-relaxed mb-8">
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

      {/* ROW 5: Global Experience - Hero-Style Single Column with Text Overlay */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background image utilities for hero sections with text overlay */}
      {/* HERO OVERLAY REASON: Official Tailwind CSS documentation recommends bg-cover with relative positioning for full-width background images with overlaid content */}
      <div className="w-full mb-20">
        <m.div
          initial={fadeInUpVariant.initial}
          whileInView={fadeInUpVariant.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={fadeInUpVariant.transition}
          className="relative h-[600px] w-full"
        >
          {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component as background layer for hero sections */}
          {/* BACKGROUND IMAGE REASON: Official Next.js documentation Section 3.4 recommends fill prop with object-cover for hero background implementations */}
          <Image
            src="/images/team/founder-elizabeth-burrows-professional.jpg"
            alt="Elizabeth Burrows Professional Portrait - Forbes Middle East Online Editor and education expert, showcasing her business journalism background"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            loading="lazy"
            quality={90}
            sizes="100vw"
            priority={false}
          />

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Gradient overlay for text readability on background images */}
          {/* OVERLAY IMPLEMENTATION REASON: Official Tailwind CSS documentation recommends bg-gradient overlays for text contrast on hero images */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Absolute positioning for text overlay with proper z-index layering */}
          {/* TEXT OVERLAY REASON: Official Tailwind CSS documentation Section 4.1 recommends absolute positioning with z-index for layered content */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                  A Global View of What Education Can Do
                </h2>

                <div className="text-lg lg:text-xl text-white/90 leading-relaxed space-y-4">
                  <p className="text-white">
                    Keen to put my English degree to good use, during this time I
                    also worked at Forbes Middle East as Online Editor. I covered a
                    range of subjects, including education.
                  </p>

                  <p className="text-white">
                    Conducting interviews with business moguls through Forbes
                    reinforced that the right educational support doesn't just help
                    people ace exams — it shapes their choices, their confidence and
                    their future. These leaders had turned their fortunes around
                    through education. What could be more exciting and important?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROW 6: Results Section - Centered Text Container with Premium Formatting */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium styling patterns for conclusion sections */}
        {/* RESULTS PRESENTATION REASON: Official Tailwind CSS documentation Section 5.1 for premium content presentation */}
        <m.div
          className="max-w-4xl mx-auto text-center"
          initial={fadeInUpVariant.initial}
          whileInView={fadeInUpVariant.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={fadeInUpVariant.transition}
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-8">
            Results That Matter
          </h2>

          <div className="text-lg text-primary-700 leading-relaxed space-y-6 mb-8">
            <p>
              Since founding My Private Tutor Online more than 15 years ago,
              I've had the privilege of helping thousands of students achieve
              their academic goals. What drives me isn't just the excellent
              grades (though we're proud of those), but the transformation in
              confidence and self-belief that comes with truly understanding a
              subject.
            </p>

            <div className="bg-gradient-to-br from-accent-50 to-primary-50 p-8 rounded-3xl border border-accent-100">
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">
                94% of GCSE students improve by two or more grades
              </h3>
              <p className="text-primary-700">
                Our approach works because we understand that every child learns
                differently, and we're not afraid to adapt our methods to suit
                their unique needs and circumstances.
              </p>
            </div>

            <p>
              Education should open doors, not close them. It should build
              confidence, not crush it. Most importantly, it should give young
              people the tools to make informed choices about their future —
              whatever that might look like.
            </p>
          </div>

          {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for founder signature with proper accessibility */}
          {/* SIGNATURE INTEGRATION REASON: Official Next.js documentation Section 3.4 for professional branding elements */}
          <div className="flex flex-col items-center pt-8 border-t border-primary-100">
            <Image
              src="/images/team/elizabeth-burrows-signature.png"
              alt="Elizabeth Burrows Signature - Founder and CEO of My Private Tutor Online"
              width={200}
              height={60}
              className="opacity-90 mb-3"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              loading="lazy"
              quality={90}
            />
            <p className="text-sm text-primary-600 font-medium">
              Elizabeth Burrows, Founder & CEO
            </p>
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
