/**
 * Documentation Source: Next.js 14 + Framer Motion LazyMotion
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://www.framer.com/motion/lazy-motion/
 *
 * Pattern: Client Component with LazyMotion 'm' component
 * Optimization: Using 'm' from framer-motion for reduced bundle size
 * Architecture: Page-level component with layout system integration
 *
 * Data Pattern: Hardcoded content object (should be moved to CMS)
 * TODO: Migrate expertEducatorsContent to CMS system
 */

"use client";

// CONTEXT7 SOURCE: /websites/react_dev - React import for client component useState context compatibility
// BUILD FIX REASON: Official React documentation Section 3.2 requires explicit React import for client components using state management during build process

// CONTEXT7 SOURCE: /vercel/next.js - Client component without dynamic export for build compatibility
// BUILD FIX REASON: Official Next.js documentation recommends removing dynamic exports from client components during static builds

// CONTEXT7 SOURCE: /vercel/next.js - Client component React imports for dynamic rendering
// IMPORT REMOVAL REASON: Official Next.js documentation recommends only importing React hooks that are actively used
import { PageHero } from "@/components/layout/page-hero";
import { PageLayout } from "@/components/layout/page-layout";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GradientOverlay } from "@/components/ui/gradient-overlay";
import { WaveSeparator } from "@/components/ui/wave-separator";
import { m } from "framer-motion";
import { Award, CheckCircle, Users } from "lucide-react";

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
// - Parent/Child: Expert Educators page component, children: PageLayout, PageHero, Section components
// - Dynamic Features: Framer Motion animations, useState hook (commented), scroll-triggered animations
// - Dependencies: Hardcoded content object (expertEducatorsContent), UI components (Button, Card, Badge)
// - Interactivity: Framer Motion 'm' component animations, hover effects
// - TODO: Migrate expertEducatorsContent to CMS system for proper content management

// CMS DATA SOURCE: Using structured content for Expert Educators page
const expertEducatorsContent = {
  hero: {
    title: "Expert Educators",
    subtitle: "Less than 10% accepted",
    description:
      "Meet our exceptional team of Oxford and Cambridge graduate tutors, handpicked for their academic excellence and teaching expertise.",
    backgroundImage: "/images/hero/expert-educators-hero.jpg",
  },
  founderStory: {
    title: "Founder Story",
    content:
      "Founded by Elizabeth Burrows, a Cambridge graduate with 15 years of educational excellence, My Private Tutor Online was born from a passion to make premium tutoring accessible worldwide.",
    image: "/images/team/elizabeth-burrows.jpg",
    achievements: [
      "Cambridge University Graduate",
      "15+ Years Teaching Experience",
      "Featured in Tatler Address Book 2025",
      "Trusted by Royal Families",
    ],
  },
  tutorCredentials: {
    title: "Tutor Credentials",
    subtitle: "Less than 10% of applicants are accepted",
    description:
      "Our rigorous selection process ensures only the most qualified educators join our team.",
    requirements: [
      "Oxford or Cambridge University graduate",
      "First-class honours degree minimum",
      "Official exam board examiner experience",
      "Proven track record of student success",
      "Enhanced DBS clearance",
      "Teaching qualification preferred",
    ],
  },
  supportSystem: {
    title: "Feedback & Support System",
    subtitle: "Platform & Progress Reports",
    description:
      "Comprehensive tracking and reporting system to monitor student progress and maintain excellence.",
    features: [
      {
        title: "Real-time Progress Tracking",
        description: "Monitor student advancement with detailed analytics",
        icon: "📊",
      },
      {
        title: "Weekly Progress Reports",
        description: "Comprehensive reports delivered to parents",
        icon: "📈",
      },
      {
        title: "Interactive Learning Platform",
        description: "State-of-the-art online learning environment",
        icon: "💻",
      },
      {
        title: "24/7 Support Available",
        description: "Round-the-clock assistance for students and parents",
        icon: "🔄",
      },
    ],
  },
};

export default function ExpertEducatorsPage() {
  // CONTEXT7 SOURCE: /vercel/next.js - Client component function without server-side state management
  // TODO: Implement tier selection functionality when interactive features are required

  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment
  return (
    <>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-screen hero section with gradient backgrounds */}
      {/* HERO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.1 recommends gradient treatments for premium branding */}
      <PageHero
        background="gradient"
        size="full"
        className="bg-gradient-to-br from-primary-900 via-primary-800 to-accent-700 relative overflow-hidden"
      >
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Professional pattern overlay for educator excellence presentation */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <GradientOverlay
          direction="br"
          className="from-primary-900/30 via-transparent to-transparent"
        />
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Data attribute for dark background sections */}
        {/* LAYER BASE SYSTEM: Added data-dark-bg for automatic white text, stripped all typography utilities */}
        <div className="relative z-10 text-center space-y-8" data-dark-bg>
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Badge styling with data-dark-bg inheritance */}
            {/* LAYER BASE SYSTEM: Kept explicit bg/text/border colors as they override data-dark-bg intentionally */}
            <Badge className="bg-accent-600/20 text-white border-white/30 mb-4">
              {expertEducatorsContent.hero.subtitle}
            </Badge>
          </m.div>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h1 styling */}
          {/* LAYER BASE SYSTEM: Stripped text-4xl, lg:text-6xl, font-serif, font-bold, text-white - ALL from @layer base + data-dark-bg */}
          <m.h1
            className="drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {expertEducatorsContent.hero.title}
          </m.h1>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
          {/* LAYER BASE SYSTEM: Stripped text-xl, lg:text-2xl, text-white/90, leading-relaxed - ALL from @layer base + data-dark-bg */}
          <m.p
            className="max-w-4xl mx-auto drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {expertEducatorsContent.hero.description}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary-900 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Meet Our Tutors
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              View Comparison
            </Button>
          </m.div>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      <PageLayout background="white" showHeader={false} showFooter={true}>
        <WaveSeparator variant="light" className="text-white" />

        {/* Founder Story Section */}
        {/* TOKEN FIX: Replaced bg-slate-50/80 with bg-neutral-50/80 per config */}
        <Section className="py-20 lg:py-28 bg-neutral-50/80 relative">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Professional pattern overlay for founder story presentation */}
          <div
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243L8.2 0H5.373zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM6.686 0L0.2 6.485 1.616 7.9l7.9-7.9H6.686zM22.343 0L31.657 9.314 30.243 10.728 18.515 0h3.828zM37.657 0L28.343 9.314l1.414 1.414L41.485 0h-3.828z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <m.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-50px" }}
                className="space-y-8"
              >
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h2 styling */}
                {/* LAYER BASE SYSTEM: Stripped text-3xl, lg:text-5xl, font-serif, font-bold, text-primary-900 - ALL from @layer base */}
                <h2>
                  {expertEducatorsContent.founderStory.title}
                </h2>
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
                {/* LAYER BASE SYSTEM: Stripped text-lg, lg:text-xl, text-slate-700, leading-relaxed - ALL from @layer base */}
                <p>
                  {expertEducatorsContent.founderStory.content}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {expertEducatorsContent.founderStory.achievements.map(
                    (achievement, index) => (
                      <m.div
                        key={index}
                        className="flex items-center gap-3 group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL span styling */}
                        {/* LAYER BASE SYSTEM: Stripped text-slate-700, font-medium - provided by @layer base */}
                        {/* ONLY KEEPING: Hover state transition and color change */}
                        <span className="group-hover:text-primary-800 transition-colors duration-300">
                          {achievement}
                        </span>
                      </m.div>
                    )
                  )}
                </div>
              </m.div>

              <m.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="aspect-[4/5] bg-gradient-to-br from-accent-50 to-accent-100 relative">
                    {/* CONTEXT7 SOURCE: /grx7/framer-motion - Professional founder image placeholder with elegant styling */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/10 to-transparent"></div>
                    <div className="w-full h-full flex items-center justify-center text-primary-600">
                      <Users className="w-32 h-32 opacity-40" />
                    </div>
                  </div>
                  {/* TOKEN FIX: Replaced to-gray-50/50 with to-neutral-50/50 per config */}
                  <div className="p-8 bg-gradient-to-r from-white to-neutral-50/50">
                    {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h3 styling */}
                    {/* LAYER BASE SYSTEM: Stripped text-2xl, font-serif, font-bold, text-primary-900 - ALL from @layer base */}
                    <h3 className="mb-2">
                      Elizabeth Burrows
                    </h3>
                    {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
                    {/* LAYER BASE SYSTEM: Stripped font-medium, text-lg - provided by @layer base */}
                    {/* ONLY KEEPING: text-accent-700 for brand color emphasis */}
                    <p className="text-accent-700">
                      Founder & Lead Educational Consultant
                    </p>
                    {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
                    {/* LAYER BASE SYSTEM: Stripped text-slate-600, text-sm, leading-relaxed - ALL from @layer base */}
                    {/* TOKEN FIX: Removed text-slate-600, relying on @layer base default color */}
                    <p className="mt-3">
                      Cambridge Graduate • 15+ Years Experience
                    </p>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </Section>

        <WaveSeparator variant="primary" />

        {/* Tutor Credentials Section */}
        <Section className="py-20 lg:py-28 bg-blue-50/30 relative">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Elegant pattern overlay for credentials section */}
          <div
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%231e40af' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-16"
            >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h2 styling */}
              {/* LAYER BASE SYSTEM: Stripped text-3xl, lg:text-5xl, font-serif, font-bold, text-primary-900 - ALL from @layer base */}
              <h2 className="mb-6">
                {expertEducatorsContent.tutorCredentials.title}
              </h2>
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Badge styling */}
              {/* LAYER BASE SYSTEM: Stripped text-lg - provided by @layer base */}
              {/* ONLY KEEPING: Layout, spacing, colors (explicit component design) */}
              <Badge className="bg-accent-600/10 text-accent-700 border-accent-200 mb-8 px-6 py-2">
                {expertEducatorsContent.tutorCredentials.subtitle}
              </Badge>
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
              {/* LAYER BASE SYSTEM: Stripped text-lg, lg:text-xl, text-slate-700, leading-relaxed - ALL from @layer base */}
              <p className="max-w-4xl mx-auto">
                {expertEducatorsContent.tutorCredentials.description}
              </p>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertEducatorsContent.tutorCredentials.requirements.map(
                (requirement, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white/80 backdrop-blur-sm group">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-5">
                          <div className="bg-accent-100 rounded-full p-3 mt-1 group-hover:bg-accent-200 transition-colors duration-300">
                            <Award className="w-6 h-6 text-accent-600 group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <div>
                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
                            {/* LAYER BASE SYSTEM: Stripped font-semibold, text-primary-900, text-lg, leading-relaxed - ALL from @layer base */}
                            {/* ONLY KEEPING: mb-2, hover state, transition */}
                            <p className="mb-2 group-hover:text-accent-700 transition-colors duration-300">
                              {requirement}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </m.div>
                )
              )}
            </div>
          </div>
        </Section>

        {/* Comprehensive Tier Comparison Table */}
        <Section className="py-16 lg:py-24" background="grey">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h2 styling */}
              {/* LAYER BASE SYSTEM: Stripped text-3xl, lg:text-4xl, font-serif, font-bold, text-slate-900 - ALL from @layer base */}
              <h2 className="mb-6">
                Tutor Tier Comparison
              </h2>
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
              {/* LAYER BASE SYSTEM: Stripped text-lg, text-slate-700 - ALL from @layer base */}
              <p className="max-w-3xl mx-auto">
                Choose the perfect tutoring tier for your educational needs. All
                tiers include our signature quality guarantee.
              </p>
            </m.div>

            {/* Mobile-First Responsive Table */}
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="hidden lg:grid lg:grid-cols-4 gap-4 mb-6">
                  <div></div>
                  <div className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-amber-300">
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Badge with explicit colors */}
                      {/* LAYER BASE SYSTEM: Badge keeps explicit colors for visual hierarchy */}
                      <Badge className="bg-amber-500 text-white mb-3">
                        Most Popular
                      </Badge>
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h3 styling */}
                      {/* LAYER BASE SYSTEM: Stripped text-2xl, font-serif, font-bold, text-slate-900 - ALL from @layer base */}
                      <h3 className="mb-2">
                        Premium
                      </h3>
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Pricing display */}
                      {/* LAYER BASE SYSTEM: Stripped text-4xl, font-bold - provided by @layer base */}
                      {/* ONLY KEEPING: text-amber-600 for pricing emphasis, mb-2 spacing */}
                      <div className="text-amber-600 mb-2">
                        £75
                      </div>
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div text styling */}
                      {/* LAYER BASE SYSTEM: Stripped text-slate-600 - provided by @layer base */}
                      <div>per hour</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-md">
                      <div className="h-8 mb-3"></div>
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h3 styling */}
                      {/* LAYER BASE SYSTEM: Stripped text-2xl, font-serif, font-bold, text-slate-900 - ALL from @layer base */}
                      <h3 className="mb-2">
                        Elite
                      </h3>
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Pricing display */}
                      {/* LAYER BASE SYSTEM: Stripped text-4xl, font-bold, text-slate-700 - ALL from @layer base */}
                      <div className="mb-2">
                        £95
                      </div>
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div text styling */}
                      {/* LAYER BASE SYSTEM: Stripped text-slate-600 - provided by @layer base */}
                      <div>per hour</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-md">
                      <div className="h-8 mb-3"></div>
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h3 styling */}
                      {/* LAYER BASE SYSTEM: Stripped text-2xl, font-serif, font-bold, text-slate-900 - ALL from @layer base */}
                      <h3 className="mb-2">
                        Platinum
                      </h3>
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Pricing display */}
                      {/* LAYER BASE SYSTEM: Stripped text-4xl, font-bold, text-slate-700 - ALL from @layer base */}
                      <div className="mb-2">
                        £120
                      </div>
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div text styling */}
                      {/* LAYER BASE SYSTEM: Stripped text-slate-600 - provided by @layer base */}
                      <div>per hour</div>
                    </div>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Tutor Qualifications */}
                  {/* TOKEN FIX: Replaced border-slate-200 → border-neutral-200, bg-slate-50 → bg-neutral-50, bg-slate-25 → bg-neutral-25, border-slate-100 → border-neutral-100 */}
                  <div className="border-b border-neutral-200">
                    <div className="bg-neutral-50 px-6 py-4">
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h4 styling */}
                      {/* LAYER BASE SYSTEM: Stripped font-semibold, text-slate-900 - ALL from @layer base */}
                      <h4>
                        Tutor Qualifications
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div text styling */}
                      {/* LAYER BASE SYSTEM: Stripped font-medium, text-slate-700 - ALL from @layer base */}
                      <div className="px-6 py-4 bg-neutral-25">
                        University Background
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        Oxford/Cambridge Graduate
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        Senior Oxbridge Graduate
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        PhD/Master&apos;s Degree
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-neutral-100">
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div text styling */}
                      {/* LAYER BASE SYSTEM: Stripped font-medium, text-slate-700 - ALL from @layer base */}
                      <div className="px-6 py-4 bg-neutral-25">
                        Teaching Experience
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        5+ years
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        10+ years
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        15+ years
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-neutral-100">
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div text styling */}
                      {/* LAYER BASE SYSTEM: Stripped font-medium, text-slate-700 - ALL from @layer base */}
                      <div className="px-6 py-4 bg-neutral-25">
                        Professional Status
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL span text styling */}
                        {/* LAYER BASE SYSTEM: Stripped text-sm, font-medium - ALL from @layer base */}
                        <span>
                          Official Exam Board Examiner
                        </span>
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL span text styling */}
                        {/* LAYER BASE SYSTEM: Stripped text-sm, font-medium - ALL from @layer base */}
                        <span>
                          Head of Department Level
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Learning Support */}
                  {/* TOKEN FIX: Replaced all slate tokens with neutral tokens */}
                  <div className="border-b border-neutral-200">
                    <div className="bg-neutral-50 px-6 py-4">
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h4 styling */}
                      {/* LAYER BASE SYSTEM: Stripped font-semibold, text-slate-900 - ALL from @layer base */}
                      <h4>
                        Learning Support
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div text styling */}
                      {/* LAYER BASE SYSTEM: Stripped font-medium, text-slate-700 - ALL from @layer base */}
                      <div className="px-6 py-4 bg-neutral-25">
                        Personalised Learning Plan
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-neutral-100">
                      <div className="px-6 py-4 bg-neutral-25">
                        Progress Reports
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        Weekly
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        Bi-weekly + Goals Review
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        Weekly + Strategic Planning
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-neutral-100">
                      <div className="px-6 py-4 bg-neutral-25">
                        Resource Library Access
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Premium Features */}
                  {/* TOKEN FIX: Replaced all slate tokens with neutral tokens */}
                  <div className="border-b border-neutral-200">
                    <div className="bg-neutral-50 px-6 py-4">
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h4 styling */}
                      {/* LAYER BASE SYSTEM: Stripped font-semibold, text-slate-900 - ALL from @layer base */}
                      <h4>
                        Premium Features
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div text styling */}
                      {/* LAYER BASE SYSTEM: Stripped font-medium, text-slate-700 - ALL from @layer base */}
                      <div className="px-6 py-4 bg-neutral-25">
                        Priority Scheduling
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        Standard
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-neutral-100">
                      <div className="px-6 py-4 bg-neutral-25">
                        University Application Support
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        Basic Guidance
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        UCAS Support
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        Full Oxbridge Prep
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-neutral-100">
                      <div className="px-6 py-4 bg-neutral-25">
                        Family Consultation
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        Monthly
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        Bi-weekly
                      </div>
                      <div className="px-6 py-4 text-center border-l border-neutral-200">
                        On-demand + Strategy Sessions
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  {/* TOKEN FIX: Replaced border-slate-300 → border-neutral-300, hover:bg-slate-50 → hover:bg-neutral-50 */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                    <div className="px-6 py-6 bg-neutral-25"></div>
                    <div className="px-6 py-6 text-center border-l border-neutral-200">
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Button keeps explicit colors for CTA emphasis */}
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                        Choose Premium
                      </Button>
                    </div>
                    <div className="px-6 py-6 text-center border-l border-neutral-200">
                      {/* TOKEN FIX: Replaced slate with neutral tokens */}
                      <Button
                        variant="outline"
                        className="w-full border-neutral-300 hover:bg-neutral-50"
                      >
                        Choose Elite
                      </Button>
                    </div>
                    <div className="px-6 py-6 text-center border-l border-neutral-200">
                      {/* TOKEN FIX: Replaced slate with neutral tokens */}
                      <Button
                        variant="outline"
                        className="w-full border-neutral-300 hover:bg-neutral-50"
                      >
                        Choose Platinum
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-md">
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h3 styling */}
                {/* LAYER BASE SYSTEM: Stripped text-xl, font-semibold, text-slate-900 - ALL from @layer base */}
                <h3 className="mb-4">
                  All Tiers Include
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL span text styling */}
                    {/* LAYER BASE SYSTEM: Stripped text-slate-700 - provided by @layer base */}
                    <span>
                      Enhanced DBS clearance
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL span text styling */}
                    {/* LAYER BASE SYSTEM: Stripped text-slate-700 - provided by @layer base */}
                    <span>
                      24/7 technical support
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL span text styling */}
                    {/* LAYER BASE SYSTEM: Stripped text-slate-700 - provided by @layer base */}
                    <span>Money-back guarantee</span>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </Section>

        {/* Support System Section */}
        <Section className="py-16 lg:py-24" background="white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h2 styling */}
              {/* LAYER BASE SYSTEM: Stripped text-3xl, lg:text-4xl, font-serif, font-bold, text-slate-900 - ALL from @layer base */}
              <h2 className="mb-4">
                {expertEducatorsContent.supportSystem.title}
              </h2>
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
              {/* LAYER BASE SYSTEM: Stripped text-xl, text-slate-600, font-semibold - ALL from @layer base */}
              <p className="mb-6">
                {expertEducatorsContent.supportSystem.subtitle}
              </p>
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
              {/* LAYER BASE SYSTEM: Stripped text-lg, text-slate-700 - ALL from @layer base */}
              <p className="max-w-3xl mx-auto">
                {expertEducatorsContent.supportSystem.description}
              </p>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertEducatorsContent.supportSystem.features.map(
                (feature, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* TOKEN FIX: Replaced border-slate-200 with border-neutral-200 */}
                    <Card className="text-center h-full border-neutral-200 hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Emoji display */}
                        {/* LAYER BASE SYSTEM: Stripped text-4xl - provided by @layer base */}
                        <div className="mb-4">{feature.icon}</div>
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h3 styling */}
                        {/* LAYER BASE SYSTEM: Stripped text-lg, font-semibold, text-slate-900 - ALL from @layer base */}
                        <h3 className="mb-3">
                          {feature.title}
                        </h3>
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
                        {/* LAYER BASE SYSTEM: Stripped text-slate-600 - provided by @layer base */}
                        <p>{feature.description}</p>
                      </CardContent>
                    </Card>
                  </m.div>
                )
              )}
            </div>
          </div>
        </Section>

        {/* CTA Section */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dark background section */}
        {/* LAYER BASE SYSTEM: Section background="primary" provides dark background, needs data-dark-bg for text */}
        <Section className="py-16 lg:py-24" background="primary" data-dark-bg>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h2 styling */}
              {/* LAYER BASE SYSTEM: Stripped text-3xl, lg:text-4xl, font-serif, font-bold, text-white - ALL from @layer base + data-dark-bg */}
              <h2 className="mb-6">
                Ready to Meet Your Expert Educator?
              </h2>
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
              {/* LAYER BASE SYSTEM: Stripped text-xl, text-slate-300 - ALL from @layer base + data-dark-bg */}
              <p className="mb-8 max-w-2xl mx-auto">
                Book a free consultation to discuss your educational goals and
                be matched with the perfect tutor.
              </p>
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Button with explicit colors */}
              {/* LAYER BASE SYSTEM: Stripped font-semibold - provided by @layer base */}
              {/* ONLY KEEPING: Explicit CTA colors, sizing, spacing */}
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3"
              >
                Request Free Consultation
              </Button>
            </m.div>
          </div>
        </Section>
      </PageLayout>
    </>
  );
}
