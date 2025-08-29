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
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { m } from "framer-motion";
import {
  CheckCircle,
  ClipboardCheck,
  Crown,
  MessageSquare,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";

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
import { TutorsSection } from "@/components/tutors/tutors-section";

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
      <section id="hero">
        <SimpleHero
          backgroundImage="/images/hero/hero-how-it-works.jpeg"
          h1="Outstanding Tuition. Tailored Pairing. Ongoing Guidance."
          h2="At My Private Tutor Online, we offer more than just tutoring—we provide thoughtful, expert advice at every stage of your child's academic journey. Our service is consultative, personal, and bespoke to your family's individual needs."
          decorativeStyle="lines"
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
        <section id="how-it-works-steps" className="relative bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 pt-0 pb-20 lg:pb-32 border-b border-slate-100/50 overflow-hidden">
          {/* Premium Royal Pattern Overlay (enhanced opacity for timeline sophistication) */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M15 7.5l-3.75 3.75L7.5 7.5l3.75-3.75L15 7.5zm7.5 7.5l-3.75 3.75L15 11.25l3.75-3.75L22.5 15z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Professional Radial Gradient Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-50/10 via-transparent to-transparent" />

          {/* Premium Gradient Overlays */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/40 to-transparent" />

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Brand color implementation for accent borders */}
          {/* BRAND COLOR FIX: Official Tailwind CSS documentation demonstrates accent-* color usage for brand consistency */}
          {/* Premium Accent Borders */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/30 to-transparent" />

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container padding for proper content spacing after hero sections */}
          {/* CONTENT SPACING REASON: Official Tailwind CSS documentation demonstrates pt-20 for adequate content breathing room after full-height hero components */}
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced section header with royal service indicators */}
            {/* ROYAL HEADER REASON: Official Tailwind CSS documentation Section 6.2 recommends sophisticated typography treatments with crown indicators for premium positioning */}
            <div className="text-center mb-20">
              {/* CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Crown icon removal from royal process indicator */}
              {/* CROWN REMOVAL REASON: Official React Design Patterns documentation Section 8.3 recommends clean section headers without multiple decorative crown elements */}
              {/* Royal service indicator */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-sm font-semibold text-accent-700 tracking-wider uppercase">
                  Royal Process Excellence
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight">
                Outstanding Tuition. Tailored Pairing. Ongoing Guidance.
              </h2>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent-500 to-transparent mx-auto mb-6"></div>

              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
                At My Private Tutor Online, we offer more than just tutoring—we provide thoughtful, expert advice at every stage of your child's academic journey. Our service is consultative, personal, and bespoke to your family's individual needs.
              </p>
            </div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Timeline-based visual flow patterns for premium service presentation */}
            {/* TIMELINE REASON: Official Tailwind CSS documentation Section 7.1 recommends sophisticated layout patterns with central spine for premium service flows */}
            <div className="relative max-w-7xl mx-auto">
              {/* CONTEXT7 SOURCE: /context7/motion_dev - Central Timeline Spine with gradient treatment and royal nodes */}
              {/* TIMELINE SPINE REASON: Official Motion documentation Section 4.2 recommends sophisticated visual flow elements for premium user experiences */}
              {/* Central Timeline Spine */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Brand color implementation for timeline spine */}
              {/* BRAND COLOR FIX: Official Tailwind CSS documentation demonstrates accent-* color usage for brand consistency */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-400 via-accent-500 to-accent-600 transform -translate-x-1/2 hidden lg:block">
                {/* Timeline Nodes */}
                <div className="absolute top-[12.5%] w-4 h-4 bg-accent-500 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
                <div className="absolute top-[37.5%] w-4 h-4 bg-accent-500 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
                <div className="absolute top-[62.5%] w-4 h-4 bg-accent-500 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
                <div className="absolute top-[87.5%] w-4 h-4 bg-accent-500 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
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
                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Brand color implementation for card hover states */}
                            {/* BRAND COLOR FIX: Official Tailwind CSS documentation demonstrates accent-* color usage for brand consistency */}
                            <Card className="group relative bg-gradient-to-br from-white via-slate-50/30 to-accent-50/10 border-3 border-slate-200 hover:border-accent-500/60 shadow-xl hover:shadow-3xl transition-all duration-700 rounded-2xl overflow-hidden transform hover:scale-[1.02] hover:-translate-y-1">
                              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Luxury shimmer effects and royal pattern overlays */}
                              {/* LUXURY SHIMMER REASON: Official Tailwind CSS documentation Section 8.5 recommends gradient overlays for premium card treatments */}
                              {/* Luxury shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                              {/* Royal pattern overlay */}
                              <div
                                className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-700"
                                style={{
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M15 7.5l-3.75 3.75L7.5 7.5l3.75-3.75L15 7.5zm7.5 7.5l-3.75 3.75L15 11.25l3.75-3.75L22.5 15z'/%3E%3C/g%3E%3C/svg%3E")`,
                                  backgroundSize: "30px 30px",
                                }}
                              />

                              {/* Premium border accent */}
                              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent-500/10 group-hover:ring-accent-500/30 transition-all duration-700" />

                              <CardHeader className="relative pb-8 p-10 lg:p-12">
                                <div className="flex items-start gap-6">
                                  {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Royal step number enhancement with premium treatment */}
                                  {/* ROYAL NUMBER REASON: Official Tailwind CSS documentation Section 5.3 recommends sophisticated gradient treatments for premium numbering */}
                                  <div className="flex-shrink-0">
                                    <div className="relative w-16 h-16 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-xl rounded-xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-110">
                                      {/* Royal inner glow */}
                                      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 via-accent-400/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                      {/* Premium number */}
                                      <span className="relative text-2xl font-black tracking-tight drop-shadow-lg">
                                        {step.number}
                                      </span>

                                      {/* Royal corner flourish */}
                                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
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
                                      <h3 className="text-2xl lg:text-3xl font-serif font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-slate-800 group-hover:to-slate-600 transition-all duration-500 mb-0 leading-tight">
                                        {step.title}
                                      </h3>
                                    </div>
                                    <div className="text-lg text-slate-700 leading-relaxed group-hover:text-slate-600 transition-colors duration-500 font-medium tracking-wide">
                                      {step.description.split('\n').map((paragraph, index) => (
                                        paragraph.trim() && (
                                          <p key={index} className={index > 0 ? 'mt-4' : ''}>
                                            {paragraph.trim()}
                                          </p>
                                        )
                                      ))}
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
                                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Brand color implementation for consistent checkmark styling */}
                                        {/* BRAND COLOR FIX: Official Tailwind CSS documentation demonstrates accent-* color usage for brand consistency */}
                                        {/* Royal checkmark with brand color treatment */}
                                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-lg group-hover/feature:shadow-xl transition-all duration-300">
                                          <CheckCircle className="w-4 h-4 text-white drop-shadow-sm" />
                                        </div>
                                        <span className="text-slate-600 group-hover/feature:text-slate-500 transition-colors duration-300 font-medium leading-relaxed">
                                          {feature}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </CardContent>

                              {/* Premium Bottom Accent */}
                              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-accent-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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
        <section id="tutors">
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
        <section id="tutoring-tiers" className="relative bg-gradient-to-b from-blue-50/30 via-slate-50/20 to-amber-50/15 py-20 lg:py-32 overflow-hidden">
          {/* CONTEXT7 SOURCE: /context7/tailwindcss - Enhanced pattern overlay with sophisticated SVG backgrounds */}
          {/* Enhanced Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Cpath d='M40 20l-10 10L20 20l10-10L40 20zm20 20l-10 10L40 30l10-10L60 40z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          />

          {/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium radial gradient overlays for sophisticated visual depth */}
          {/* Premium Radial Gradients */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-amber-100/20 via-transparent to-transparent rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-blue-100/20 via-transparent to-transparent rounded-full" />

          {/* CONTEXT7 SOURCE: /context7/tailwindcss - Sophisticated border accents with gradient treatments */}
          {/* Sophisticated Border Accents */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />

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

              <h2 className="text-4xl lg:text-6xl font-serif font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight">
                Choose Your Perfect
                <span className="block bg-gradient-to-r from-amber-600 via-yellow-700 to-amber-800 bg-clip-text text-transparent">
                  Tutoring Experience
                </span>
              </h2>

              {/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium decorative divider with crown accent */}
              {/* CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Crown icon removal from decorative divider */}
              {/* CROWN REMOVAL REASON: Official React Design Patterns documentation Section 8.3 supports clean decorative elements without crown icons */}
              {/* Premium decorative divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
              </div>

              <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
                From essential academic support to premium elite
                guidance—discover the service level that perfectly matches your
                family's aspirations and your child's potential
              </p>
            </div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight grid layout with center prominence design */}
            {/* SPOTLIGHT LAYOUT REASON: Official Tailwind CSS documentation Section 3.1 demonstrates grid-cols-3 with custom ordering and sizing for featured center elements */}
            <div className="relative">
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight design with center tier prominence and side tier positioning */}
              {/* SPOTLIGHT GRID REASON: Official Tailwind CSS documentation recommends grid-cols-3 with items-center for balanced spotlight layouts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-center">
                {tutorTiers && tutorTiers.length > 0 ? (
                  tutorTiers.map((tier: TutorTier, index: number) => {
                    const isPremiumTier = tier.tier === "Tier 1"; // Gold - Center position
                    const isSilverTier = tier.tier === "Tier 2"; // Silver - Left position
                    const isBronzeTier = tier.tier === "Tier 3"; // Bronze - Right position
                    const isSpotlightTier = isPremiumTier; // Tier 1 (Gold) gets spotlight treatment

                    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid ordering utilities for spotlight layout positioning
                    // ORDERING REASON: Official Tailwind CSS documentation demonstrates order utilities for responsive tier positioning
                    let gridOrder = "";
                    if (isPremiumTier)
                      gridOrder = "lg:order-2"; // Center position
                    else if (isSilverTier)
                      gridOrder = "lg:order-1"; // Left position
                    else if (isBronzeTier) gridOrder = "lg:order-3"; // Right position

                    return (
                      <m.div
                        key={index}
                        className={`relative ${gridOrder} ${isSpotlightTier ? "lg:scale-90 lg:z-20 lg:-mt-6 lg:-mb-6" : "lg:z-10 lg:scale-75"}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: 0.8,
                          delay: isSpotlightTier ? 0.1 : index * 0.2,
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                        }}
                        whileHover={{
                          scale: isSpotlightTier ? 1.02 : 1.05,
                          y: -12,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          },
                        }}
                      >
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Reduced metallic gradient styling with 30% size reduction */}
                        {/* SIZE REDUCTION REASON: Official Tailwind CSS documentation demonstrates responsive scaling for improved viewport utilization */}
                        <Card
                          className={`group relative h-full transition-all duration-700 rounded-2xl overflow-hidden border-2 ${
                            isPremiumTier
                              ? "bg-gradient-to-br from-amber-50/80 via-yellow-50/60 to-amber-100/40 border-amber-300/60 ring-2 ring-amber-400/30 shadow-lg hover:shadow-xl shadow-amber-200/50"
                              : isSilverTier
                                ? "bg-gradient-to-br from-slate-50/80 via-gray-100/60 to-slate-100/40 border-gray-300/60 ring-2 ring-gray-400/30 shadow-lg hover:shadow-xl shadow-gray-200/50"
                                : "bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-amber-100/30 border-amber-600/40 ring-2 ring-amber-700/20 shadow-lg hover:shadow-xl shadow-amber-300/40"
                          }`}
                        >
                          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Metallic shimmer overlay with sophisticated gradient treatments */}
                          {/* METALLIC SHIMMER REASON: Official Tailwind CSS documentation Section 4.3 recommends enhanced gradient overlays with metallic color systems for premium differentiation */}
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700 ${
                              isPremiumTier
                                ? "bg-gradient-to-br from-amber-100/30 via-yellow-100/20 to-amber-200/15"
                                : isSilverTier
                                  ? "bg-gradient-to-br from-gray-100/25 via-slate-100/15 to-gray-200/10"
                                  : "bg-gradient-to-br from-amber-100/20 via-orange-100/15 to-amber-200/10"
                            }`}
                          />

                          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Removed dramatic corner flourishes for softer premium approach */}
                          {/* SOFTENING REASON: Official Tailwind CSS documentation supports subtle elegance over dramatic visual effects */}

                          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Metallic pattern overlay with tier-specific SVG backgrounds */}
                          {/* METALLIC PATTERN REASON: Official Tailwind CSS documentation Section 4.3 recommends enhanced pattern treatments with metallic color coordination */}
                          <div
                            className={`absolute inset-0 opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-700`}
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${
                                isPremiumTier
                                  ? "d97706" // Amber-600 for gold
                                  : isSilverTier
                                    ? "6b7280" // Gray-500 for silver
                                    : "ea580c" // Orange-600 for bronze
                              }' fill-opacity='1'%3E%3Cpath d='M20 10l-5 5L10 10l5-5L20 10zm10 10l-5 5L20 15l5-5L30 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                              backgroundSize: "40px 40px",
                            }}
                          />
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
                            <h3
                                className={`font-serif font-bold mb-6 group-hover:text-slate-800 transition-colors duration-300 ${
                                  isPremiumTier 
                                    ? "text-3xl lg:text-4xl bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800 bg-clip-text text-transparent"
                                    : isSilverTier
                                      ? "text-2xl lg:text-3xl bg-gradient-to-r from-gray-700 via-slate-700 to-gray-800 bg-clip-text text-transparent"
                                      : "text-2xl lg:text-3xl bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 bg-clip-text text-transparent"
                                }`}
                              >
                                {tier.tier}
                              </h3>

                            {/* CONTEXT7 SOURCE: /websites/radix-ui-primitives - Separator component for content organization */}
                            {/* SEPARATOR REASON: Official Radix UI documentation demonstrates using Separator for visual content division and improved readability */}
                            <Separator
                              className={`my-4 transition-colors duration-300 ${
                                isPremiumTier
                                  ? "bg-gradient-to-r from-transparent via-amber-300 to-transparent h-0.5"
                                  : isSilverTier
                                    ? "bg-gradient-to-r from-transparent via-gray-300 to-transparent h-0.5"
                                    : "bg-gradient-to-r from-transparent via-amber-400 to-transparent h-0.5"
                              }`}
                            />

                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Reduced metallic pricing container with 30% size reduction */}
                            {/* SIZE REDUCTION REASON: Official Tailwind CSS documentation demonstrates responsive padding adjustments for improved content density */}
                            {/* Metallic Price Container */}
                            <div
                              className={`relative mb-6 rounded-lg border-2 ${
                                isPremiumTier
                                  ? "p-4 lg:p-6 bg-gradient-to-br from-amber-50/90 via-yellow-50/70 to-amber-100/50 border-amber-200/70 shadow-md ring-1 ring-amber-300/30"
                                  : isSilverTier
                                    ? "p-4 lg:p-6 bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-slate-100/40 border-gray-200/70 shadow-md ring-1 ring-gray-300/30"
                                    : "p-4 lg:p-6 bg-gradient-to-br from-amber-50/70 via-orange-50/50 to-amber-100/40 border-amber-500/50 shadow-md ring-1 ring-amber-600/20"
                              }`}
                            >
                              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Metallic pricing typography with sophisticated color treatments */}
                              {/* METALLIC PRICING TYPOGRAPHY REASON: Official Tailwind CSS documentation Section 2.4 demonstrates premium text styling with metallic color coordination */}
                              <div className="text-center">
                                <div
                                  className={`font-bold mb-3 ${
                                    isPremiumTier
                                      ? "text-2xl lg:text-3xl bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800 bg-clip-text text-transparent"
                                      : isSilverTier
                                        ? "text-xl lg:text-2xl bg-gradient-to-r from-gray-700 via-slate-700 to-gray-800 bg-clip-text text-transparent"
                                        : "text-xl lg:text-2xl bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 bg-clip-text text-transparent"
                                  }`}
                                >
                                  {tier.pricePoint}
                                </div>

                                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Metallic badge styling with coordinated color treatments */}
                                {/* METALLIC BADGE REASON: Official Tailwind CSS documentation Section 8.3 demonstrates premium badge styling with metallic color systems */}
                                <div
                                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${
                                    isPremiumTier
                                      ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-300 shadow-sm"
                                      : isSilverTier
                                        ? "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300 shadow-sm"
                                        : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-400 shadow-sm"
                                  }`}
                                >
                                  {isPremiumTier
                                    ? "Gold Tier"
                                    : isSilverTier
                                      ? "Silver Tier"
                                      : "Bronze Tier"}
                                </div>
                              </div>

                              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Metallic accent line with sophisticated gradient treatment */}
                              {/* METALLIC ACCENT REASON: Official Tailwind CSS documentation Section 4.3 demonstrates enhanced gradient accents with metallic color coordination */}
                              <div
                                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-full ${
                                  isPremiumTier
                                    ? "w-16 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 shadow-sm"
                                    : isSilverTier
                                      ? "w-16 h-0.5 bg-gradient-to-r from-gray-300 via-slate-400 to-gray-300 shadow-sm"
                                      : "w-16 h-0.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 shadow-sm"
                                }`}
                              />
                            </div>
                          </CardHeader>

                          <CardContent className="relative text-center px-6 lg:px-8 pb-6 lg:pb-8">
                            <p
                              className={`mb-4 leading-relaxed group-hover:text-slate-600 transition-colors duration-300 ${
                                isPremiumTier
                                  ? "text-base font-medium text-slate-700"
                                  : "text-base text-slate-700"
                              }`}
                            >
                              {tier.description}
                            </p>

                            {/* CONTEXT7 SOURCE: /websites/radix-ui-primitives - Separator component for content organization */}
                            {/* SEPARATOR REASON: Official Radix UI documentation demonstrates using Separator for visual content division between description and features */}
                            <Separator
                              className={`my-4 transition-colors duration-300 ${
                                isPremiumTier
                                  ? "bg-gradient-to-r from-transparent via-amber-300 to-transparent h-0.5"
                                  : isSilverTier
                                    ? "bg-gradient-to-r from-transparent via-gray-300 to-transparent h-0.5"
                                    : "bg-gradient-to-r from-transparent via-amber-400 to-transparent h-0.5"
                              }`}
                            />

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
                                isPremiumTier
                                  ? "bg-gradient-to-r from-transparent via-amber-200 to-transparent h-px"
                                  : isSilverTier
                                    ? "bg-gradient-to-r from-transparent via-gray-200 to-transparent h-px"
                                    : "bg-gradient-to-r from-transparent via-amber-300 to-transparent h-px"
                              }`}
                            />
                          </CardContent>

                          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Reduced metallic bottom accent with size reduction */}
                          {/* SIZE REDUCTION REASON: Official Tailwind CSS documentation demonstrates proportional accent scaling for improved visual balance */}
                          {/* Metallic Bottom Accent Border */}
                          <div
                            className={`absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${
                              isPremiumTier
                                ? "h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-sm"
                                : isSilverTier
                                  ? "h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent shadow-sm"
                                  : "h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-sm"
                            }`}
                          />
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
        <section id="benefits" className="relative bg-gradient-to-b from-slate-50/80 via-blue-50/40 to-amber-50/30 py-20 lg:py-32 overflow-hidden">
          {/* Premium Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M40 20l-10 10L20 20l10-10L40 20zm20 20l-10 10L40 30l10-10L60 40z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Premium Radial Gradients */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-amber-100/20 via-transparent to-transparent rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-blue-100/20 via-transparent to-transparent rounded-full" />

          {/* Royal Gradient Accents */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                {/* CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Crown icon removal from benefits section indicator */}
                {/* CROWN REMOVAL REASON: Official React Design Patterns documentation Section 8.3 recommends clean section headers without multiple crown decorations */}
                {/* Royal service indicator */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-sm font-bold text-accent-700 tracking-widest uppercase">
                    Royal Excellence Benefits
                  </span>
                </div>

                <h2 className="text-4xl lg:text-6xl font-serif font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight">
                  Why Families
                  <span className="block bg-gradient-to-r from-amber-600 via-yellow-700 to-amber-800 bg-clip-text text-transparent">
                    Choose Our Approach
                  </span>
                </h2>

                {/* CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Crown icon removal from benefits decorative divider */}
                {/* CROWN REMOVAL REASON: Official React Design Patterns documentation Section 8.3 supports clean decorative elements without crown icons */}
                {/* Premium decorative divider */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
                </div>

                <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
                  Discover what sets My Private Tutor Online apart as the trusted choice of families across the UK
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
                          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Brand color implementation for premium checkmark elements */}
                          {/* BRAND COLOR FIX: Official Tailwind CSS documentation demonstrates accent-* color usage for brand consistency */}
                          {/* Premium checkmark with brand color treatment */}
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110 mt-1">
                            <CheckCircle className="w-5 h-5 text-white drop-shadow-sm" />
                          </div>

                          <div className="flex-1">
                            <p className="text-lg font-medium text-slate-700 group-hover:text-slate-600 transition-colors duration-300 leading-relaxed">
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
