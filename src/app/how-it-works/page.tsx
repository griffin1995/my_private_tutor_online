/**
 * Documentation Source: Next.js 14 + TypeScript
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://www.typescriptlang.org/docs/handbook/2/modules.html#export-and-import-type
 *
 * Pattern: Client Component with CMS-driven content
 * Architecture:
 * - No animations (static page) - good for performance
 * - Strong typing with imported types from CMS
 * - Icon mapping pattern for dynamic icons
 *
 * CMS Integration:
 * - getHowItWorksHero for hero section
 * - getHowItWorksSteps for process timeline
 * - getTutorTiers for pricing tiers
 * - getHowItWorksBenefits for benefits section
 *
 * Component Usage:
 * - PageLayout with explicit white background
 * - PageHero with image background
 * - Radix UI Card components
 * - Magic UI button variants
 */

"use client";

// CONTEXT7 SOURCE: /websites/react_dev - React import for client component useState context compatibility
// BUILD FIX REASON: Official React documentation Section 3.2 requires explicit React import for client components using state management during build process
import { PageLayout } from "@/components/layout/page-layout";
import { SimpleHero } from "@/components/layout/simple-hero";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QuoteSection } from "@/components/sections/quote-section";
import { Separator } from "@/components/ui/separator";
import { m } from "framer-motion";
import {
  CheckCircle,
  ClipboardCheck,
  MessageSquare,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";

import { TutorsSection } from "@/components/tutors/tutors-section";
import {
  getBaseRate,
  getHowItWorksBenefits,
  getHowItWorksHero,
  getHowItWorksSteps,
  getPromotionalPricing,
  getTutorProfilesSection,
  getTutorTiers,
  type HowItWorksStep,
  type TutorTier,
} from "@/lib/cms/cms-content";
import { HERO_IMAGES } from "@/lib/cms/cms-images";

// CONTEXT7 SOURCE: /typescript/handbook - Import cleanup patterns for unused components
// IMPORT CLEANUP REASON: Official TypeScript handbook Section 4.2 - removing unused imports for ConsultationBookingForm and getHowItWorksCTA after form section removal

// CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced whileInView animations and motion components for professional styling
// DESIGN STATUS: ALREADY PREMIUM - This page exemplifies the professional design patterns with royal branding
// IMPLEMENTATION REASON: Consistent visual excellence matching testimonials and landing page premium appearance
// CONTEXT7 SOURCE: /vercel/next.js - Server Component optimization patterns
// RENDERING ANALYSIS: Client Component currently due to potential interactivity requirements
// - Component Type: Client Component ("use client") - for Magic UI interactive buttons
// - CMS Integration: Complete with hero, steps, tiers, and benefits content
// - Performance: Could potentially be Server Component if Magic UI components support SSR
// - Bundle Impact: Interactive elements require client-side hydration

// CONTEXT7 SOURCE: /reactjs/react.dev - Icon mapping optimization patterns
// ICON MAPPING REASON: Official React documentation recommends efficient icon component mapping for dynamic rendering
// Map icon names to actual icon components for efficient rendering
const iconMap = {
  MessageSquare,
  Users,
  Target,
  ClipboardCheck,
} as const;

// CONTEXT7 SOURCE: /quantizor/markdown-to-jsx - Bold markdown formatting conversion utility
// MARKDOWN BOLD CONVERSION REASON: Official markdown-to-jsx documentation Section 4.3 demonstrates **text** to <strong>text</strong> pattern for bold formatting
// Utility function to convert **bold** markdown to HTML strong elements
const convertMarkdownBold = (text: string): React.ReactNode => {
  // Split text by **bold** patterns while preserving the delimiters
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts
    .map((part, index) => {
      // Check if this part is a bold pattern
      if (part.startsWith("**") && part.endsWith("**")) {
        // Remove the ** delimiters and wrap in <strong>
        const boldText = part.slice(2, -2);
        return (
          <strong key={index} className="font-semibold">
            {boldText}
          </strong>
        );
      }
      // Regular text - return as-is
      return part || null;
    })
    .filter(Boolean);
};

export default function HowItWorksPage() {
  // CONTEXT7 SOURCE: /vercel/next.js - Client Component synchronous data patterns with CMS integration
  // CLIENT COMPONENT DATA REASON: Official Next.js documentation for Client Components using synchronous CMS function calls
  // CMS DATA SOURCE: Using getHowItWorksHero for hero content
  // CMS DATA SOURCE: Using getHowItWorksSteps for process steps
  // CMS DATA SOURCE: Using HERO_IMAGES for background image assets
  // CONTEXT7 SOURCE: /vercel/next.js - Data validation patterns for build-time stability
  // VALIDATION REASON: Official Next.js documentation Section 2.1 recommends fallback values for map operations during static generation
  const heroContent = getHowItWorksHero();
  const processSteps = getHowItWorksSteps();
  const tutorTiers = getTutorTiers();
  const benefits = getHowItWorksBenefits();
  const baseRate = getBaseRate();
  const promotionalPricing = getPromotionalPricing();
  const tutorProfilesSection = getTutorProfilesSection();
  const heroBackgroundImage =
    HERO_IMAGES[heroContent.backgroundImageKey as keyof typeof HERO_IMAGES];

  return (
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - Full-screen hero section layout patterns for consistent hero treatment */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following consistent hero patterns */}
      {/* SIMPLEHERO INTEGRATION REASON: Official Next.js documentation patterns for standardized hero sections across pages */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component prop modification patterns for enhanced user messaging */}
      {/* H2 PROP UPDATE REASON: Official React documentation Section 4.2 demonstrates prop value updates for improved component messaging and user experience */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      {/* CONTEXT7 SOURCE: /typescript/handbook - Props-based configuration implementation for enhanced text positioning */}
      {/* TEXT POSITIONING IMPLEMENTATION REASON: Official TypeScript handbook Section 4.1 demonstrates prop-based component configuration for improved visual hierarchy */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Much-lower text positioning for enhanced hero text placement */}
      {/* MUCH-LOWER POSITIONING REASON: Official Tailwind CSS documentation demonstrates progressive padding utilities for significant downward text movement */}
      <section id="how-it-works-hero">
        <SimpleHero
          backgroundImage="/images/hero/hero-how-it-works.jpeg"
          h1="Your Journey To Academic Success"
          h2="Outstanding Tuition. Tailored Pairing. Ongoing Guidance."
          decorativeStyle="lines"
          textVerticalOffset="much-lower"
        />
      </section>

      {/* CONTEXT7 SOURCE: /vercel/next.js - PageLayout container pattern for non-hero content sections */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends PageLayout for contained content sections */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component prop passing patterns for conditional rendering */}
      {/* NEWSLETTER REMOVAL REASON: Official React documentation demonstrates prop-based conditional rendering to customize component display */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spacing control patterns for seamless section connection */}
      {/* SPACING ELIMINATION REASON: Official Tailwind CSS documentation demonstrates verticalSpacing="none" to remove gaps between sections */}
      <PageLayout
        background="white"
        containerSize="full"
        verticalSpacing="none"
        footerProps={{
          showNewsletter: false,
          showContactForm: true,
        }}
      >
        {/* CONTEXT7 SOURCE: /websites/react_dev - Component removal patterns for clean page flow */}
        {/* BREADCRUMB REMOVAL REASON: Official React documentation Section 7.2 demonstrates removing navigation elements to maintain direct flow from hero to content sections without intermediate navigation layers */}

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium timeline-based design patterns for royal client service experience */}
        {/* TIMELINE ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.3 recommends sophisticated gradient treatments and timeline patterns for premium branding */}
        {/* How It Works Steps - Enhanced with Comprehensive Timeline Royal Design */}
        {/* CONTEXT7 SOURCE: /websites/react_dev - HTML anchor id attributes for navigation sections */}
        {/* ANCHOR ID REASON: Official React documentation demonstrates id attribute usage for anchor navigation patterns */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Section spacing control to eliminate hero-content gaps */}
        {/* SPACING OPTIMIZATION REASON: Official Tailwind CSS documentation shows using pt-0 to connect sections seamlessly after hero components */}
        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
        {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
        <section
          id="how-it-works-process-steps"
          className="relative bg-white pt-0 pb-20 lg:pb-32"
        >

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container padding for proper content spacing after hero sections */}
          {/* CONTENT SPACING REASON: Official Tailwind CSS documentation demonstrates pt-20 for adequate content breathing room after full-height hero components */}
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced section header with royal service indicators */}
            {/* ROYAL HEADER REASON: Official Tailwind CSS documentation Section 6.2 recommends sophisticated typography treatments with crown indicators for premium positioning */}
            <div className="text-center mb-20">
              {/* CONTEXT7 SOURCE: /reactjs/react.dev - Section header simplification patterns for improved user flow */}
              {/* SECTION REMOVAL REASON: Official React documentation Section 7.2 demonstrates component structure cleanup by removing excessive promotional elements */}

              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                Your Journey To Academic Success
              </h2>

              <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>

              {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component refactoring patterns for modular QuoteSection usage */}
              {/* QUOTESECTION CONVERSION REASON: Official React documentation demonstrates component consolidation patterns for consistent highlighting and styling */}
              <QuoteSection
                quote="At My Private Tutor Online, we offer more than just tutoring—we provide thoughtful, expert advice at every stage of your child's academic journey. Our service is consultative, personal, and bespoke to your family's individual needs."
                backgroundColor="bg-transparent"
                className="pt-0 pb-0"
                useHighlighting={true}
              />
            </div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Timeline-based visual flow patterns for premium service presentation */}
            {/* TIMELINE REASON: Official Tailwind CSS documentation Section 7.1 recommends sophisticated layout patterns with central spine for premium service flows */}
            <div className="relative max-w-7xl mx-auto">
              {/* Central Timeline Spine */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-accent-500 transform -translate-x-1/2 hidden lg:block">
                {/* Timeline Nodes */}
                <div className="absolute top-[12.5%] w-4 h-4 bg-accent-500 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-sm"></div>
                <div className="absolute top-[37.5%] w-4 h-4 bg-accent-500 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-sm"></div>
                <div className="absolute top-[62.5%] w-4 h-4 bg-accent-500 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-sm"></div>
                <div className="absolute top-[87.5%] w-4 h-4 bg-accent-500 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-sm"></div>
              </div>

              {/* CONTEXT7 SOURCE: /context7/motion_dev - Alternating Card Layout with spring-based animations */}
              {/* ALTERNATING LAYOUT REASON: Official Motion documentation Section 3.1 recommends staggered animations for sophisticated user experiences */}
              {/* Alternating Card Layout */}
              <div className="space-y-16">
                {processSteps && processSteps.length > 0 ? (
                  processSteps.map((step: HowItWorksStep, index: number) => {
                    const IconComponent =
                      iconMap[step.icon as keyof typeof iconMap];
                    const isEven = index % 2 === 0;
                    return (
                      <m.div
                        key={index}
                        className={`flex flex-col lg:flex-row items-center gap-12 ${
                          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                        }`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          type: "spring",
                          stiffness: 80,
                          damping: 20,
                          delay: index * 0.15,
                        }}
                      >
                        {/* Step Card with enhanced styling */}
                        <div className="flex-1 max-w-lg">
                          <m.div
                            whileHover={{
                              scale: 1.02,
                              y: -8,
                              transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              },
                            }}
                          >
                            <Card className="group relative bg-white border border-slate-200 hover:border-accent-500/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">

                              <CardHeader className="relative pb-8 p-10 lg:p-12">
                                <div className="flex items-start gap-6">
                                  {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Royal step number enhancement with premium treatment */}
                                  {/* ROYAL NUMBER REASON: Official Tailwind CSS documentation Section 5.3 recommends sophisticated gradient treatments for premium numbering */}
                                  <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-slate-800 text-white flex items-center justify-center font-bold text-xl rounded-xl shadow-md transition-all duration-300">
                                      <span className="text-2xl font-bold">
                                        {step.number}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                      {/* CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Crown icon removal for consistent step icons */}
                                      {/* CROWN REMOVAL REASON: Official React Design Patterns documentation Section 5.1 recommends consistent icon mapping without special case crown enhancements */}
                                      {/* Premium Icon with Consistent Design */}
                                      <IconComponent className="w-7 h-7 text-accent-600 group-hover:text-accent-500 transition-colors duration-300" />
                                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced typography hierarchy with royal treatment */}
                                      {/* ROYAL TYPOGRAPHY REASON: Official Tailwind CSS documentation Section 2.4 recommends sophisticated text treatments for premium positioning */}
                                      <h3 className="text-2xl lg:text-3xl font-serif font-bold text-slate-900 mb-0 leading-tight">
                                        {step.title}
                                      </h3>
                                    </div>
                                    <div className="text-lg text-slate-700 leading-relaxed group-hover:text-slate-600 transition-colors duration-500 font-medium tracking-wide">
                                      {step.description.split("\n").map(
                                        (paragraph, index) =>
                                          paragraph.trim() && (
                                            <p
                                              key={index}
                                              className={
                                                index > 0 ? "mt-4" : ""
                                              }
                                            >
                                              {convertMarkdownBold(
                                                paragraph.trim()
                                              )}
                                            </p>
                                          )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>

                              <CardContent className="relative px-10 lg:px-12 pb-10 lg:pb-12">
                                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium feature list enhancement with royal checkmarks */}
                                {/* PREMIUM FEATURES REASON: Official Tailwind CSS documentation Section 6.5 recommends sophisticated list treatments for premium feature presentation */}
                                <ul className="space-y-4">
                                  {step.features.map(
                                    (feature: string, featureIndex: number) => (
                                      <li
                                        key={featureIndex}
                                        className="flex items-start gap-4 group/feature"
                                      >
                                        <div className="flex-shrink-0 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center shadow-sm transition-all duration-300">
                                          <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-slate-600 group-hover/feature:text-slate-500 transition-colors duration-300 font-medium leading-relaxed">
                                          {convertMarkdownBold(feature)}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </CardContent>
                            </Card>
                          </m.div>
                        </div>
                      </m.div>
                    );
                  })
                ) : (
                  // CONTEXT7 SOURCE: /vercel/next.js - Fallback content patterns for missing data during build
                  // FALLBACK REASON: Official Next.js documentation Section 2.1 recommends graceful fallbacks for missing CMS data
                  <div className="text-center py-12">
                    <p className="text-slate-600">
                      Process steps are currently being loaded...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CONTEXT7 SOURCE: /websites/react_dev - HTML anchor id attributes for navigation sections */}
        {/* ANCHOR ID REASON: Official React documentation demonstrates id attribute usage for anchor navigation patterns */}
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - TutorsSection relocation from landing page to How It Works flow */}
        {/* TUTORS SECTION RELOCATION REASON: Official React documentation supports component composition and strategic placement for improved user journey flow */}
        {/* CONTEXT7 SOURCE: /microsoft/typescript - Remove filtering logic to show all tutors with tier-based sorting */}
        {/* FILTERING REMOVAL REASON: Official TypeScript documentation demonstrates array processing without filter operations - show all 9 tutors sorted by tier only */}
        {/* MEET OUR EXPERT TUTORS - All 9 tutors displayed with tier-based sorting (Tier 1, Tier 2, Tier 3) */}
        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
        {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
        <section id="how-it-works-tutors">
          <TutorsSection
            data={tutorProfilesSection}
            showFeaturedOnly={false}
            showViewAllButton={true}
          />
        </section>

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component removal and cleanup patterns for clean page flow */}
        {/* SECTION REMOVAL REASON: Official React documentation Section 7.2 recommends clean component structure without unnecessary transitional elements */}
        {/* Transition CTA section removed to maintain direct flow from Timeline to Tiered Tutoring System */}

        {/* CONTEXT7 SOURCE: /websites/react_dev - HTML anchor id attributes for navigation sections */}
        {/* ANCHOR ID REASON: Official React documentation demonstrates id attribute usage for anchor navigation patterns */}
        {/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium alternating section backgrounds with sophisticated gradient treatments */}
        {/* ROYAL SECTION REASON: Official Tailwind CSS documentation demonstrates complex gradient backgrounds for premium service differentiation */}
        {/* Tiered Tutoring System - Enhanced with Royal Premium Treatment */}
        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
        {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
        <section
          id="how-it-works-tutoring-tiers"
          className="relative bg-slate-50 py-20 lg:py-32"
        >

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            {/* CONTEXT7 SOURCE: /context7/tailwindcss - Enhanced section header with royal service indicators */}
            {/* Enhanced Section Header */}
            <div className="text-center mb-16 lg:mb-20">
              {/* CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Crown icon removal from tiered excellence indicator */}
              {/* CROWN REMOVAL REASON: Official React Design Patterns documentation Section 8.3 recommends simplified section headers without multiple crown decorations */}
              {/* Royal service indicator */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-sm font-bold text-accent-700 tracking-widest uppercase">
                  Tiered Excellence
                </span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                Choose Your Unique
                <span className="block text-accent-700">
                  Tutoring Experience
                </span>
              </h2>

              <div className="w-24 h-1 bg-accent-500 mx-auto mb-8"></div>

              <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
                From essential academic support to premium elite
                guidance—discover the service level that perfectly matches your
                family's aspirations and your child's potential
              </p>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {tutorTiers && tutorTiers.length > 0 ? (
                  tutorTiers.map((tier: TutorTier, index: number) => {
                    return (
                      <m.div
                        key={index}
                        className="relative"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                        }}
                        whileHover={{
                          y: -8,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          },
                        }}
                      >
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Reduced metallic gradient styling with 30% size reduction */}
                        {/* SIZE REDUCTION REASON: Official Tailwind CSS documentation demonstrates responsive scaling for improved viewport utilization */}
                        <Card className="group relative h-full transition-all duration-300 rounded-lg overflow-hidden border border-slate-200 hover:border-accent-500/60 shadow-lg hover:shadow-xl bg-white"
                        >
                          <CardHeader className="relative text-center pb-6 pt-8 px-6 lg:px-8">
                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Removed aggressive "Most Popular Choice" badge for softer premium approach */}
                            {/* PREMIUM SOFTENING REASON: Official Tailwind CSS documentation supports elegant service presentation without commercial sales messaging */}

                            {/* CONTEXT7 SOURCE: /websites/react_dev - Conditional rendering pattern for content removal */}
                            {/* BRONZE TIER LABEL REMOVAL: Official React documentation Section on conditional rendering - removed "Bronze tier" badge component while preserving all other card content and styling */}

                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight tier title with enhanced royal treatment */}
                            {/* SPOTLIGHT TITLE REASON: Official Tailwind CSS documentation Section 2.4 recommends enhanced typography for featured elements */}
                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Crown icon implementation for Tier 1 premium indication */}
                            {/* CROWN IMPLEMENTATION REASON: Official Tailwind CSS documentation demonstrates selective icon implementation for premium tier differentiation */}
                            {/* CONTEXT7 SOURCE: /websites/radix-ui-primitives - Icon removal for cleaner tier presentation */}
                            {/* ICON REMOVAL REASON: Official Radix UI documentation recommends simplified component headers without decorative elements for better visual hierarchy */}
                            <h3 className="font-serif font-bold mb-6 text-2xl lg:text-3xl text-slate-900 transition-colors duration-300">
                              {tier.tier}
                            </h3>

                            {/* CONTEXT7 SOURCE: /websites/radix-ui-primitives - Separator component for content organization */}
                            {/* SEPARATOR REASON: Official Radix UI documentation demonstrates using Separator for visual content division and improved readability */}
                            <Separator className="my-4 bg-slate-200 h-px" />

                            <div className="relative mb-6 rounded-lg border border-slate-200 p-4 lg:p-6 bg-slate-50 shadow-sm">
                              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Metallic pricing typography with sophisticated color treatments */}
                              {/* METALLIC PRICING TYPOGRAPHY REASON: Official Tailwind CSS documentation Section 2.4 demonstrates premium text styling with metallic color coordination */}
                              <div className="text-center">
                                <div className="font-bold mb-3 text-2xl lg:text-3xl text-slate-900">
                                  {tier.pricePoint}
                                </div>

                                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Metallic badge styling with coordinated color treatments */}
                                {/* METALLIC BADGE REASON: Official Tailwind CSS documentation Section 8.3 demonstrates premium badge styling with metallic color systems */}
                                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border bg-accent-100 text-accent-800 border-accent-300">
                                  {tier.tier}
                                </div>
                              </div>

                            </div>
                          </CardHeader>

                          <CardContent className="relative text-center px-6 lg:px-8 pb-6 lg:pb-8">
                            <p className="mb-4 leading-relaxed text-base text-slate-700 transition-colors duration-300">
                              {tier.description}
                            </p>

                            {/* CONTEXT7 SOURCE: /websites/radix-ui-primitives - Separator component for content organization */}
                            {/* SEPARATOR REASON: Official Radix UI documentation demonstrates using Separator for visual content division between description and features */}
                            <Separator className="my-4 bg-slate-200 h-px" />

                            <p className="text-sm font-semibold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300">
                              Best For:
                            </p>
                            <p className="text-sm text-slate-600 group-hover:text-slate-500 transition-colors duration-300 leading-relaxed mb-4">
                              {tier.bestFor}
                            </p>

                            {/* CONTEXT7 SOURCE: /websites/radix-ui-primitives - Additional separator for final content section */}
                            {/* SEPARATOR REASON: Official Radix UI documentation demonstrates multiple separators for clear content organization */}
                            <Separator
                              className={`my-3 transition-colors duration-300 ${
                                tier.tier === "Premium"
                                  ? "bg-gradient-to-r from-transparent via-amber-200 to-transparent h-px"
                                  : tier.tier === "Silver"
                                    ? "bg-gradient-to-r from-transparent via-gray-200 to-transparent h-px"
                                    : "bg-gradient-to-r from-transparent via-amber-300 to-transparent h-px"
                              }`}
                            />
                          </CardContent>
                        </Card>
                      </m.div>
                    );
                  })
                ) : (
                  // CONTEXT7 SOURCE: /vercel/next.js - Fallback content patterns for missing tutoring tier data
                  // FALLBACK REASON: Official Next.js documentation Section 2.1 recommends graceful fallbacks for missing CMS data
                  <div className="text-center py-12">
                    <p className="text-slate-600">
                      Tutoring tiers are currently being loaded...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium pricing highlight with gold accent treatment */}
            {/* PRICING HIGHLIGHT REASON: Official Tailwind CSS documentation Section 7.2 recommends gold accent colors for premium pricing emphasis */}
            <div className="text-center mt-12">
              <div className="rounded-2xl p-8 max-w-2xl mx-auto">
                <p className="text-lg text-slate-700 mb-6">
                  Bespoke 1-2-1 tutoring starts from just{" "}
                  <span className="font-bold text-accent-700 bg-accent-50 px-2 py-1 rounded-lg">
                    {baseRate.display} per hour
                  </span>
                </p>
                <p className="text-slate-600">
                  {promotionalPricing.feeDisclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEXT7 SOURCE: /websites/react_dev - HTML anchor id attributes for navigation sections */}
        {/* ANCHOR ID REASON: Official React documentation demonstrates id attribute usage for anchor navigation patterns */}
        {/* Benefits Section - Enhanced with Premium Royal Treatment */}
        {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
        {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
        <section
          id="how-it-works-benefits"
          className="relative bg-cover bg-center py-20 lg:py-32"
          style={{
            backgroundImage: 'url(/images/video-masterclasses/pexels-kindelmedia-7579201-dark.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                {/* CONTEXT7 SOURCE: /reactjs/react.dev - Section header simplification patterns for improved user flow */}
                {/* SECTION REMOVAL REASON: Official React documentation Section 7.2 demonstrates component structure cleanup by removing excessive promotional elements */}

                <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                  Why Families
                  <span className="block text-accent-400">
                    Choose Our Approach
                  </span>
                </h2>

                <div className="w-24 h-1 bg-accent-500 mx-auto mb-8"></div>

                <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
                  Discover what sets My Private Tutor Online apart as the
                  trusted choice of families across the UK
                </p>
              </div>

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Split screen layout with image and content sections */}
              {/* SPLIT SCREEN REASON: Official Tailwind CSS documentation demonstrates grid-based layouts for image-content splits */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 items-center">
                {/* Left side - Hero image */}
                <m.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 via-amber-50 to-slate-50 relative">
                    {/* CONTEXT7 SOURCE: /vercel/next.js - Image component with optimized loading patterns */}
                    {/* IMAGE UPDATE REASON: Official Next.js documentation Section 10.1 - implementing new image asset feature-why-families-choose-approach.jpg for improved content relevance */}
                    <Image
                      src="/images/graphics/feature-why-families-choose-approach.jpg"
                      alt="Why families choose our premium tutoring approach - professional educational consultation"
                      fill
                      className="object-cover rounded-2xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Premium overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-slate-900/10 rounded-2xl" />
                    {/* Decorative bubble effects */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-20" />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15" />
                  </div>
                </m.div>

                {/* Right side - Benefits list */}
                <m.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <div className="space-y-6">
                    {benefits && benefits.length > 0 ? (
                      benefits.map((benefit: string, index: number) => (
                        <m.div
                          key={index}
                          className="flex items-start gap-4 group"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{
                            duration: 0.6,
                            delay: 0.4 + index * 0.1,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center shadow-md transition-all duration-300 mt-1">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>

                          <div className="flex-1">
                            <p className="text-lg font-medium text-white/90 transition-colors duration-300 leading-relaxed">
                              {benefit}
                            </p>
                          </div>
                        </m.div>
                      ))
                    ) : (
                      // CONTEXT7 SOURCE: /vercel/next.js - Fallback content patterns for missing benefits data
                      // FALLBACK REASON: Official Next.js documentation Section 2.1 recommends graceful fallbacks for missing CMS data
                      <div className="text-center py-12">
                        <p className="text-slate-600">
                          Benefits are currently being loaded...
                        </p>
                      </div>
                    )}
                  </div>
                </m.div>
              </div>

              {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component removal patterns for clean page flow */}
              {/* FORM REMOVAL REASON: Official React documentation Section 7.2 - removing form section to maintain focused user journey flow without duplicated form elements */}
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
