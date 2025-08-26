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
  ChevronRight,
  ClipboardCheck,
  Crown,
  Home,
  MessageSquare,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";

import {
  getBaseRate,
  getHowItWorksBenefits,
  getHowItWorksCTA,
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
import { ConsultationBookingForm } from "@/components/forms/consultation-booking-form";

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
  const ctaContent = getHowItWorksCTA();
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
      <SimpleHero
        backgroundImage="/images/hero/hero-how-it-works.jpeg"
        h1="Your Journey to Academic Success"
        h2="Our Process"
        decorativeStyle="lines"
      />

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
        }}
      >
        {/* CONTEXT7 SOURCE: /vercel/next.js - Navigation breadcrumb patterns for improved user experience */}
        {/* BREADCRUMB REASON: Official Next.js documentation Section 4.1 recommends breadcrumb navigation for better user orientation and site hierarchy */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium breadcrumb navigation with sophisticated gradient backgrounds */}
        {/* BREADCRUMB ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.3 recommends sophisticated gradient treatments for premium navigation elements */}
        {/* Premium Breadcrumb Navigation */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Section spacing control for seamless hero-content connection */}
        {/* SPACING REMOVAL REASON: Official Tailwind CSS documentation demonstrates removing bottom padding to eliminate gaps between hero and content sections */}
        <section className="relative bg-gradient-to-b from-slate-900/5 via-white to-slate-50/30 border-b border-slate-200/50 overflow-hidden">
          {/* Premium Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.01] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Royal Gradient Accents */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent" />

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container padding removal for seamless section connection */}
          {/* PADDING ELIMINATION REASON: Official Tailwind CSS documentation shows removing pb-* classes to eliminate gaps between adjacent sections */}
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Royal Corner Accents */}
            <div className="absolute top-2 left-4 w-8 h-8 border-l border-t border-amber-400/20 rounded-tl-lg"></div>
            <div className="absolute top-2 right-4 w-8 h-8 border-r border-t border-amber-400/20 rounded-tr-lg"></div>

            {/* CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced whileInView animations for sophisticated breadcrumb presentation */}
            {/* ANIMATION ENHANCEMENT REASON: Official Framer Motion documentation Section 3.1 recommends custom ease curves for premium navigation experiences */}
            <m.nav
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="flex items-center space-x-2 text-sm">
                {/* Enhanced Home Link */}
                <a
                  href="/"
                  className="group relative flex items-center text-slate-700 hover:text-amber-700 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-amber-50/50 backdrop-blur-sm transform hover:scale-105"
                >
                  <Home className="w-4 h-4 mr-2 group-hover:text-amber-500 transition-colors duration-300" />
                  <span className="font-medium tracking-wide">Home</span>
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-amber-200/50 transition-colors duration-300" />
                </a>

                <ChevronRight className="w-4 h-4 text-slate-400 mx-2" />

                {/* Enhanced Current Page Indicator */}
                <span className="relative text-slate-900 font-semibold tracking-wide px-3 py-2 rounded-lg bg-gradient-to-r from-amber-50/30 to-transparent">
                  How It Works
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400/60 to-transparent rounded-full" />
                </span>
              </div>

              {/* CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Crown icon removal from royal service indicator */}
              {/* CROWN REMOVAL REASON: Official React Design Patterns documentation Section 8.3 recommends simplified indicator designs without decorative icons */}
              {/* Royal service indicator */}
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                <span className="font-medium tracking-wide">
                  Royal Client Service
                </span>
                <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
            </m.nav>
          </div>
        </section>


        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium timeline-based design patterns for royal client service experience */}
        {/* TIMELINE ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.3 recommends sophisticated gradient treatments and timeline patterns for premium branding */}
        {/* How It Works Steps - Enhanced with Comprehensive Timeline Royal Design */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Section spacing control to eliminate hero-content gaps */}
        {/* SPACING OPTIMIZATION REASON: Official Tailwind CSS documentation shows using pt-0 to connect sections seamlessly after hero components */}
        <section className="relative bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 pt-0 pb-20 lg:pb-32 border-b border-slate-100/50 overflow-hidden">
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

          {/* Premium Accent Borders */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
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
                <span className="text-sm font-semibold text-amber-700 tracking-wider uppercase">
                  Royal Process Excellence
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight">
                How It Works
              </h2>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>

              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
                Our bespoke consultation and pairing process ensures an
                exceptional fit — and seamless support throughout the entire
                journey.
              </p>
            </div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Timeline-based visual flow patterns for premium service presentation */}
            {/* TIMELINE REASON: Official Tailwind CSS documentation Section 7.1 recommends sophisticated layout patterns with central spine for premium service flows */}
            <div className="relative max-w-7xl mx-auto">
              {/* CONTEXT7 SOURCE: /context7/motion_dev - Central Timeline Spine with gradient treatment and royal nodes */}
              {/* TIMELINE SPINE REASON: Official Motion documentation Section 4.2 recommends sophisticated visual flow elements for premium user experiences */}
              {/* Central Timeline Spine */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 transform -translate-x-1/2 hidden lg:block">
                {/* Timeline Nodes */}
                <div className="absolute top-[12.5%] w-4 h-4 bg-amber-400 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
                <div className="absolute top-[37.5%] w-4 h-4 bg-amber-400 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
                <div className="absolute top-[62.5%] w-4 h-4 bg-amber-400 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
                <div className="absolute top-[87.5%] w-4 h-4 bg-amber-400 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
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
                            <Card className="group relative bg-gradient-to-br from-white via-slate-50/30 to-amber-50/10 border-3 border-slate-200 hover:border-amber-400/60 shadow-xl hover:shadow-3xl transition-all duration-700 rounded-2xl overflow-hidden transform hover:scale-[1.02] hover:-translate-y-1">
                              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Luxury shimmer effects and royal pattern overlays */}
                              {/* LUXURY SHIMMER REASON: Official Tailwind CSS documentation Section 8.5 recommends gradient overlays for premium card treatments */}
                              {/* Luxury shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                              {/* Royal pattern overlay */}
                              <div
                                className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-700"
                                style={{
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M15 7.5l-3.75 3.75L7.5 7.5l3.75-3.75L15 7.5zm7.5 7.5l-3.75 3.75L15 11.25l3.75-3.75L22.5 15z'/%3E%3C/g%3E%3C/svg%3E")`,
                                  backgroundSize: "30px 30px",
                                }}
                              />

                              {/* Premium border accent */}
                              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-amber-400/10 group-hover:ring-amber-400/30 transition-all duration-700" />

                              <CardHeader className="relative pb-8 p-10 lg:p-12">
                                <div className="flex items-start gap-6">
                                  {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Royal step number enhancement with premium treatment */}
                                  {/* ROYAL NUMBER REASON: Official Tailwind CSS documentation Section 5.3 recommends sophisticated gradient treatments for premium numbering */}
                                  <div className="flex-shrink-0">
                                    <div className="relative w-16 h-16 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-xl rounded-xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-110">
                                      {/* Royal inner glow */}
                                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-amber-300/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                      {/* Premium number */}
                                      <span className="relative text-2xl font-black tracking-tight drop-shadow-lg">
                                        {step.number}
                                      </span>

                                      {/* Royal corner flourish */}
                                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                      {/* CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Crown icon removal for consistent step icons */}
                                      {/* CROWN REMOVAL REASON: Official React Design Patterns documentation Section 5.1 recommends consistent icon mapping without special case crown enhancements */}
                                      {/* Premium Icon with Consistent Design */}
                                      <IconComponent className="w-7 h-7 text-amber-600 group-hover:text-amber-500 transition-colors duration-300" />
                                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced typography hierarchy with royal treatment */}
                                      {/* ROYAL TYPOGRAPHY REASON: Official Tailwind CSS documentation Section 2.4 recommends sophisticated text treatments for premium positioning */}
                                      <h3 className="text-2xl lg:text-3xl font-serif font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-slate-800 group-hover:to-slate-600 transition-all duration-500 mb-0 leading-tight">
                                        {step.title}
                                      </h3>
                                    </div>
                                    <p className="text-lg text-slate-700 leading-relaxed group-hover:text-slate-600 transition-colors duration-500 font-medium tracking-wide">
                                      {step.description}
                                    </p>
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
                                        {/* Royal checkmark with glow effect */}
                                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg group-hover/feature:shadow-xl transition-all duration-300">
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
                              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - TutorsSection relocation from landing page to How It Works flow */}
        {/* TUTORS SECTION RELOCATION REASON: Official React documentation supports component composition and strategic placement for improved user journey flow */}
        {/* MEET OUR EXPERT TUTORS - Positioned between process overview and tier selection */}
        <TutorsSection 
          data={tutorProfilesSection}
          showFeaturedOnly={true}
          maxProfiles={6}
          showViewAllButton={true}
        />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component removal and cleanup patterns for clean page flow */}
        {/* SECTION REMOVAL REASON: Official React documentation Section 7.2 recommends clean component structure without unnecessary transitional elements */}
        {/* Transition CTA section removed to maintain direct flow from Timeline to Tiered Tutoring System */}

        {/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium alternating section backgrounds with sophisticated gradient treatments */}
        {/* ROYAL SECTION REASON: Official Tailwind CSS documentation demonstrates complex gradient backgrounds for premium service differentiation */}
        {/* Tiered Tutoring System - Enhanced with Royal Premium Treatment */}
        <section className="relative bg-gradient-to-b from-blue-50/30 via-slate-50/20 to-amber-50/15 py-20 lg:py-32 overflow-hidden">
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
                <span className="text-sm font-bold text-amber-700 tracking-widest uppercase">
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
                        className={`relative ${gridOrder} ${isSpotlightTier ? "lg:scale-125 lg:z-20 lg:-mt-12 lg:-mb-12" : "lg:z-10 lg:scale-90"}`}
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
                        {/* CONTEXT7 SOURCE: /tailwindcss/docs - Enhanced tier-specific border colors for bronze/silver/gold differentiation */}
                        {/* TIER COLOR SYSTEM REASON: Official Tailwind CSS documentation demonstrates color-based tier differentiation using bronze/silver/gold for tiered service systems */}
                        <Card
                          className={`group relative h-full transition-all duration-700 rounded-3xl overflow-hidden border-4 ${
                            isPremiumTier
                              ? "bg-gradient-to-br from-amber-50 via-yellow-50/80 to-orange-50/60 border-amber-500 ring-2 ring-amber-400/40 shadow-3xl hover:shadow-4xl shadow-amber-200/40"
                              : isSilverTier
                                ? "bg-gradient-to-br from-slate-50 via-gray-50/80 to-slate-50/60 border-slate-400 ring-1 ring-slate-300/30 shadow-xl hover:shadow-2xl shadow-slate-200/20"
                                : "bg-gradient-to-br from-orange-100/20 via-amber-50/40 to-orange-50/30 border-orange-700 ring-1 ring-orange-600/20 shadow-xl hover:shadow-2xl shadow-orange-200/15"
                          }`}
                        >
                          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight shimmer overlay with enhanced gradient treatments */}
                          {/* SPOTLIGHT SHIMMER REASON: Official Tailwind CSS documentation Section 4.3 recommends enhanced gradient overlays for featured elements */}
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                              isPremiumTier
                                ? "bg-gradient-to-br from-yellow-100/40 via-amber-100/30 to-yellow-100/20"
                                : isSilverTier
                                  ? "bg-gradient-to-br from-gray-100/20 via-slate-100/15 to-gray-100/10"
                                  : "bg-gradient-to-br from-orange-100/20 via-amber-100/15 to-orange-100/10"
                            }`}
                          />

                          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight corner flourishes with tier-specific styling */}
                          {/* SPOTLIGHT FLOURISHES REASON: Official Tailwind CSS documentation Section 8.3 recommends corner accents for premium spotlight elements */}
                          {(isPremiumTier || isBronzeTier) && (
                            <>
                              <div
                                className={`absolute top-0 left-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-700 ${
                                  isPremiumTier
                                    ? "bg-gradient-to-br from-yellow-300 via-amber-200 to-transparent"
                                    : "bg-gradient-to-br from-orange-300/60 via-amber-200/40 to-transparent"
                                } rounded-br-full`}
                              />
                              <div
                                className={`absolute bottom-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-700 ${
                                  isPremiumTier
                                    ? "bg-gradient-to-tl from-yellow-300 via-amber-200 to-transparent"
                                    : "bg-gradient-to-tl from-orange-300/60 via-amber-200/40 to-transparent"
                                } rounded-tl-full`}
                              />
                            </>
                          )}

                          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight pattern overlay with tier-specific SVG backgrounds */}
                          {/* SPOTLIGHT PATTERN REASON: Official Tailwind CSS documentation Section 4.3 recommends enhanced pattern opacity for spotlight elements */}
                          <div
                            className={`absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-700 ${
                              isPremiumTier
                                ? "opacity-[0.04]"
                                : isSilverTier
                                  ? "opacity-[0.02]"
                                  : "opacity-[0.025]"
                            }`}
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${
                                isPremiumTier
                                  ? "facc15"
                                  : isSilverTier
                                    ? "9ca3af"
                                    : "f97316"
                              }' fill-opacity='1'%3E%3Cpath d='M20 10l-5 5L10 10l5-5L20 10zm10 10l-5 5L20 15l5-5L30 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                              backgroundSize: "40px 40px",
                            }}
                          />
                          <CardHeader className="relative text-center pb-8 pt-12 px-8">
                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight badge system with enhanced premium styling */}
                            {/* SPOTLIGHT BADGE REASON: Official Tailwind CSS documentation Section 8.3 recommends prominent badge treatments for featured elements */}
                            {isPremiumTier && (
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30">
                                <Badge className="relative bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-700 text-white px-8 py-3 rounded-full shadow-2xl font-bold text-sm uppercase tracking-wider ring-2 ring-yellow-400/50">
                                  Most Popular Choice
                                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/40 to-amber-500/40 animate-pulse" />
                                </Badge>
                              </div>
                            )}

                            {isBronzeTier && (
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                                <Badge className="relative bg-gradient-to-r from-orange-600/80 via-amber-700/90 to-orange-800 text-white px-6 py-2.5 rounded-full shadow-xl font-bold text-sm uppercase tracking-wider">
                                  Bronze Tier
                                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-amber-500/20 animate-pulse" />
                                </Badge>
                              </div>
                            )}

                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight tier title with enhanced royal treatment */}
                            {/* SPOTLIGHT TITLE REASON: Official Tailwind CSS documentation Section 2.4 recommends enhanced typography for featured elements */}
                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Crown icon implementation for Tier 1 premium indication */}
                            {/* CROWN IMPLEMENTATION REASON: Official Tailwind CSS documentation demonstrates selective icon implementation for premium tier differentiation */}
                            <div className="mb-6">
                              {isPremiumTier && (
                                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Crown className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                              )}
                              {isSilverTier && (
                                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                      2
                                    </span>
                                  </div>
                                </div>
                              )}
                              <h3
                                className={`font-serif font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors duration-300 ${
                                  isPremiumTier ? "text-4xl" : "text-3xl"
                                }`}
                              >
                                {tier.tier}
                              </h3>
                            </div>

                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight pricing display with enhanced premium containers */}
                            {/* SPOTLIGHT PRICING REASON: Official Tailwind CSS documentation Section 3.1 demonstrates enhanced container styling for featured elements */}
                            {/* Spotlight Price Container */}
                            <div
                              className={`relative mb-8 rounded-2xl border-2 shadow-inner ${
                                isPremiumTier
                                  ? "p-8 bg-gradient-to-br from-yellow-50/90 to-amber-50/70 border-yellow-300/60 shadow-yellow-100/50"
                                  : isSilverTier
                                    ? "p-6 bg-gradient-to-br from-gray-50/80 to-slate-50/60 border-gray-200/50 shadow-gray-100/30"
                                    : "p-6 bg-gradient-to-br from-orange-50/50 to-amber-50/40 border-orange-300/50 shadow-orange-100/20"
                              }`}
                            >
                              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight pricing with enhanced typography for featured elements */}
                              {/* SPOTLIGHT PRICING REASON: Official Tailwind CSS documentation Section 2.4 recommends enhanced text sizing for featured elements */}
                              <div className="text-center">
                                <div
                                  className={`font-black mb-2 ${
                                    isPremiumTier
                                      ? "text-4xl lg:text-5xl text-yellow-700"
                                      : isSilverTier
                                        ? "text-3xl lg:text-4xl text-gray-700"
                                        : "text-3xl lg:text-4xl text-orange-700"
                                  }`}
                                >
                                  {tier.pricePoint}
                                </div>

                                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight value proposition with enhanced styling */}
                                {/* SPOTLIGHT VALUE REASON: Official Tailwind CSS documentation Section 8.3 recommends enhanced badge styling for featured elements */}
                                <div
                                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                                    isPremiumTier
                                      ? "bg-yellow-200/60 text-yellow-900 border-2 border-yellow-300 shadow-md"
                                      : isSilverTier
                                        ? "bg-gray-100 text-gray-800 border border-gray-200"
                                        : "bg-orange-100/60 text-orange-800 border border-orange-200/60"
                                  }`}
                                >
                                  <span className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse" />
                                  {isPremiumTier
                                    ? "Most Popular"
                                    : isSilverTier
                                      ? "Silver Tier"
                                      : "Bronze Tier"}
                                </div>
                              </div>

                              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight accent line with enhanced gradient treatment */}
                              {/* SPOTLIGHT ACCENT REASON: Official Tailwind CSS documentation Section 4.3 recommends enhanced gradient accents for featured elements */}
                              <div
                                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-full ${
                                  isPremiumTier
                                    ? "w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg"
                                    : isSilverTier
                                      ? "w-20 h-1 bg-gradient-to-r from-gray-400 to-slate-500"
                                      : "w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500"
                                }`}
                              />
                            </div>
                          </CardHeader>

                          <CardContent className="relative text-center px-8 pb-8">
                            <p
                              className={`mb-6 leading-relaxed group-hover:text-slate-600 transition-colors duration-300 ${
                                isPremiumTier
                                  ? "text-lg font-medium text-slate-700"
                                  : "text-lg text-slate-700"
                              }`}
                            >
                              {tier.description}
                            </p>

                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight separator with tier-specific styling */}
                            {/* SPOTLIGHT SEPARATOR REASON: Official Tailwind CSS documentation Section 3.1 recommends tier-coordinated separator colors */}
                            <Separator
                              className={`my-6 transition-colors duration-300 ${
                                isPremiumTier
                                  ? "bg-yellow-300"
                                  : isSilverTier
                                    ? "bg-gray-200"
                                    : "bg-orange-200"
                              }`}
                            />

                            <p className="text-base font-semibold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300">
                              Best For:
                            </p>
                            <p className="text-slate-600 group-hover:text-slate-500 transition-colors duration-300">
                              {tier.bestFor}
                            </p>
                          </CardContent>

                          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight bottom accent with enhanced tier-coordinated colors */}
                          {/* SPOTLIGHT ACCENT REASON: Official Tailwind CSS documentation Section 4.3 supports enhanced gradient accent borders for spotlight differentiation */}
                          {/* Spotlight Bottom Accent Border */}
                          <div
                            className={`absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                              isPremiumTier
                                ? "h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-lg"
                                : isSilverTier
                                  ? "h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent"
                                  : "h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"
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
                  <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
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


        {/* Benefits Section - Enhanced with Premium Royal Treatment */}
        <section className="relative bg-gradient-to-b from-slate-50/80 via-blue-50/40 to-amber-50/30 py-20 lg:py-32 overflow-hidden">
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
                  <span className="text-sm font-bold text-amber-700 tracking-widest uppercase">
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
                    <Image
                      src="/images/graphics/feature-built-on-trust.jpeg"
                      alt="Why families choose our premium tutoring approach - professional educational consultation"
                      fill
                      className="object-cover rounded-2xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Premium overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-slate-900/10 rounded-2xl" />
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
                          {/* Premium checkmark with royal treatment */}
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110 mt-1">
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

              {/* Enquiry Form Section - Replacing CTA with consultation booking form */}
              <m.div
                className="relative bg-gradient-to-br from-white/80 via-blue-50/30 to-white/60 backdrop-blur-sm p-8 rounded-2xl border border-white/30 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-4">
                    {ctaContent.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
                    {ctaContent.description}
                  </p>
                </div>

                {/* Consultation Booking Form */}
                <div className="max-w-4xl mx-auto">
                  <ConsultationBookingForm className="bg-white/80 backdrop-blur-sm" compact={true} />
                </div>

                {/* Trust indicators */}
                {ctaContent.trustText && (
                  <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500 italic">
                      {ctaContent.trustText}
                    </p>
                  </div>
                )}

                {/* Trust indicators for professional branding */}
                <div className="mt-8 pt-8 border-t border-blue-200/30">
                  <div className="flex items-center justify-center gap-8 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="font-medium">
                        Tatler Address Book 2025
                      </span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="font-medium">15 Years Excellence</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="font-medium">Trusted by Families</span>
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </div>

        </section>
      </PageLayout>
    </>
  );
}
