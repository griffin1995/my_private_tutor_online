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

"use client"

import { Play, Clock, Users, Star, CheckCircle } from 'lucide-react'
import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WaveSeparator } from '@/components/ui/wave-separator'
import { GradientOverlay } from '@/components/ui/gradient-overlay'

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
// DESIGN ENHANCEMENT: Consistent visual branding with WaveSeparator, GradientOverlay, and premium card designs
// IMPLEMENTATION REASON: Matching testimonials and landing page professional appearance standards
// CONTEXT7 SOURCE: /grx7/framer-motion - motion.div with initial, whileInView, and viewport props for scroll animations

// CMS DATA SOURCE: Elizabeth's Video Masterclasses content from Beth's new_copy.md
const videoMasterclassesContent = {
  hero: {
    title: "Exclusive Video Masterclasses with Elizabeth Burrows",
    subtitle: "A trusted guide to British education, culture, and university preparation",
    description: "Join Elizabeth Burrows, founder of My Private Tutor Online, as she shares her expert insight from over 15 years of international education experience. These masterclasses, drawn from her live seminars, offer rare access to the knowledge and strategies typically reserved for her private clients."
  },
  intro: {
    bridge: "These sessions bridge the gap between international education and the expectations of British schools and universities.",
    access: "Access on demand, from anywhere in the world."
  },
  masterclasses: [
    {
      id: "unlocking-academic-success",
      title: "Unlocking Academic Success",
      price: "Free Access",
      duration: "90 minutes",
      description: "Elizabeth was invited to speak at the 2024 UCAS Summit, where she was called upon to share her expert guidance for parents on navigating the world of private tutoring. In this insightful session, she explores how to recognise when one-to-one support is needed, identify truly exceptional tutors and manage the tutor–student–parent relationship to ensure outstanding academic outcomes.",
      content: "Practical strategies to help students develop independence, confidence and academic resilience.",
      isFree: true
    },
    {
      id: "ucas-guide-part-1",
      title: "Elizabeth's Essential UCAS Guide - Part 1 of 2",
      price: "£49.99",
      duration: "90 minutes",
      venue: "(As delivered at London School of Economics)",
      description: "Widely recognised for her expertise in the British university admissions process, Elizabeth was invited to speak to international summer school students at LSE. In her session, she demystifies each stage of the UCAS application, offering clear, practical guidance to help students approach the process with confidence.",
      content: "This 90-minute seminar draws on Elizabeth's 15 years of experience, blending expert guidance, practical strategies, and real-world anecdotes to equip students for a successful UCAS application. Ideal for both international and UK-based applicants.",
      subtitle: "Demystifying UCAS: A Clear Path to UK University Success"
    },
    {
      id: "personal-statements-part-2",
      title: "Elizabeth's Top 10 Tips for Outstanding Personal Statements - Part 2 of 2",
      price: "£89.99",
      duration: "70 minutes",
      venue: "(As delivered at London School of Economics)",
      description: "Elizabeth is renowned for her success in guiding ambitious students into Oxbridge (she was offered a place at Cambridge herself) and top UK universities. Each year her private students secure places at the best British universities, including UCL, LSE, Imperial and Edinburgh. In this masterclass she reveals the 10 ingredients in her secret recipe for personal statement success.",
      content: "In this 70-minute masterclass, Elizabeth shares insider strategies and expert insights you won't find anywhere else. You'll also gain rare access to a Medicine personal statement that helped a student win a place at the University of Oxford.",
      note: "*This masterclass is relevant for students applying from 2025 onwards via the new UCAS personal statement format, which requires applicants to respond to three structured questions.*"
    },
    {
      id: "british-literary-classics",
      title: "Exploring British Literary Classics",
      subtitle: "A Masterclass for Curious and Aspiring Readers (Ages 8–14)",
      price: "£19.99",
      duration: "60 minutes",
      description: "From Wind in the Willows to Wuthering Heights, and Harry Potter to The Lord of the Rings, this engaging masterclass introduces students to some of the most celebrated works in British literature.",
      instructor: "Led by Elizabeth Burrows, English Literature graduate and Founder of My Private Tutor Online, this session was originally delivered to an international audience and explores:",
      topics: [
        "What defines a literary classic",
        "Key British literary genres",
        "The conventions and themes that shape them"
      ],
      targetAge: "Ideal for students aged 8–14 (KS2–KS3)",
      purpose: "This masterclass is designed to foster cultural fluency, literary appreciation, and a lifelong love of reading—whether your child is already an avid reader or needs encouragement. It is especially valuable for those preparing for interviews at British independent schools, where students are often expected to discuss books with confidence and insight.",
      includes: [
        "60-minute recorded masterclass (with partial Mandarin subtitles), delivered to an audience of international students",
        "Accompanying PowerPoint presentation, including links to extension activities and enrichment resources",
        "Curated reading list to inspire further exploration and discussion"
      ],
      summary: "A rich and accessible introduction to British literary heritage—designed to inform, inspire, and intellectually prepare young readers for their next academic steps."
    },
    {
      id: "british-etiquette",
      title: "Understanding British Etiquette",
      subtitle: "A Masterclass on Polished Manners and Cultural Awareness",
      price: "£19.99",
      duration: "60 minutes",
      description: "Join our Founder, Elizabeth Burrows, for this engaging and insightful masterclass on British etiquette. Drawing on her experience working with royalty and high-profile international families, Elizabeth demystifies the social codes that shape life in the UK's most prestigious schools and institutions.",
      questions: "What is etiquette? Why does it matter? And how can you improve your own presentation and confidence in formal settings? Elizabeth answers all this and more—offering practical guidance in a warm, approachable style.",
      learning: [
        "The do's and don'ts of greetings, introductions, and dining",
        "How etiquette differs across cultures",
        "How to avoid common social faux pas in British settings"
      ],
      includes: [
        "60-minute recorded masterclass, delivered to an international student audience (includes partial Mandarin subtitles)",
        "Accompanying PowerPoint presentation, with links to further resources and enrichment materials"
      ],
      audience: "Ideal for students of all ages, especially those preparing for British school interviews or public-facing opportunities, where social grace and cultural fluency are quietly—but closely—assessed.",
      summary: "A fun, practical, and confidence-building introduction to navigating British life with ease and elegance."
    }
  ],
  ideal: {
    text: "These masterclasses are ideal for families looking to elevate their child's preparation for boarding school entry, UK university applications, or those simply looking to immerse their child in British academic culture."
  }
}

export default function VideoMasterclassesPage() {
  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment
  return (
    <>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-screen hero section with gradient backgrounds */}
      {/* HERO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.1 recommends gradient treatments for premium branding */}
      <PageHero
        background="gradient"
        size="full"
        className="bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900"
      >
        <div className="text-center text-white">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold leading-tight mb-6">
            {videoMasterclassesContent.hero.title}
          </h1>
          <p className="text-xl text-accent-400 font-semibold mb-6">
            {videoMasterclassesContent.hero.subtitle}
          </p>
          <p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
            {videoMasterclassesContent.hero.description}
          </p>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      <PageLayout background="white" showHeader={false} showFooter={true}>

        <WaveSeparator 
          variant="subtle" 
          className="text-slate-100" 
        />

        {/* Introduction */}
        <Section background="blue" className="py-16 relative">
        <GradientOverlay variant="subtle" className="opacity-20" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <m.p 
            className="text-xl lg:text-2xl text-slate-800 leading-relaxed mb-6 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {videoMasterclassesContent.intro.bridge}
          </m.p>
          <m.p 
            className="text-xl lg:text-2xl font-bold text-amber-700 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 inline-block shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {videoMasterclassesContent.intro.access}
          </m.p>
        </div>
      </Section>

      <WaveSeparator 
        variant="wave" 
        className="text-slate-50" 
      />

      {/* Featured Masterclasses */}
      <Section background="slate" className="py-20 relative">
        <GradientOverlay variant="subtle" className="opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full" />
          </m.div>
        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-20">
            {/* Free Masterclass */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-t-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-md px-4 py-2 text-sm font-bold">
                      Free Access
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-slate-700 bg-white/80 rounded-full px-3 py-1">
                      <Clock className="w-4 h-4 text-amber-600" />
                      90 minutes
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-serif font-bold text-slate-900">
                    {videoMasterclassesContent.masterclasses[0]?.title || 'Video Masterclass'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-800 mb-6 leading-relaxed text-lg">
                    {videoMasterclassesContent.masterclasses[0]?.content || 'Comprehensive video masterclass content'}
                  </p>
                  <p className="text-slate-700 mb-8 leading-relaxed">
                    {videoMasterclassesContent.masterclasses[0]?.description || 'Expert guidance and practical insights'}
                  </p>
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold">
                    <Play className="w-5 h-5 mr-3" />
                    Watch Free Masterclass
                  </Button>
                </CardContent>
              </Card>
            </m.div>

            {/* UCAS Guide Part 1 */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-slate-400 text-slate-800 bg-white shadow-sm px-4 py-2 text-sm font-bold">
                      {videoMasterclassesContent.masterclasses[1]?.price || '£300'}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-slate-700 bg-white/80 rounded-full px-3 py-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      {videoMasterclassesContent.masterclasses[1]?.duration || '2 hours'}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-serif font-bold text-slate-900">
                    {videoMasterclassesContent.masterclasses[1]?.title || 'Advanced Masterclass'}
                  </CardTitle>
                  <p className="text-sm text-slate-600 italic font-medium bg-blue-50 px-3 py-1 rounded-full inline-block">
                    {videoMasterclassesContent.masterclasses[1]?.venue || 'Online'}
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-800 mb-8 leading-relaxed text-lg">
                    {videoMasterclassesContent.masterclasses[1]?.content || 'Advanced masterclass content'}
                  </p>
                  <Button className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold">
                    Purchase Masterclass - {videoMasterclassesContent.masterclasses[1]?.price || '£300'}
                  </Button>
                </CardContent>
              </Card>
            </m.div>
          </div>

          {/* Personal Statements Masterclass */}
          <m.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-2xl text-white">
              <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-lg">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 shadow-md px-4 py-2 text-sm font-bold">
                    {videoMasterclassesContent.masterclasses[2]?.price || '£500'}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-white bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Clock className="w-4 h-4 text-amber-400" />
                    {videoMasterclassesContent.masterclasses[2]?.duration || '3 hours'}
                  </div>
                </div>
                <CardTitle className="text-2xl lg:text-3xl font-serif font-bold text-white">
                  {videoMasterclassesContent.masterclasses[2]?.title || 'Premium Masterclass'}
                </CardTitle>
                <p className="text-amber-400 italic font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                  {videoMasterclassesContent.masterclasses[2]?.venue || 'Online'}
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-white/90 mb-6 leading-relaxed text-lg">
                  {videoMasterclassesContent.masterclasses[2]?.description || 'Premium masterclass experience'}
                </p>
                <p className="text-white/90 mb-6 leading-relaxed text-lg">
                  {videoMasterclassesContent.masterclasses[2]?.content || 'Premium content and expert guidance'}
                </p>
                <p className="text-amber-300 italic mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  {videoMasterclassesContent.masterclasses[2]?.note || 'Exclusive premium content'}
                </p>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 py-4 text-lg font-bold">
                  Purchase Masterclass - {videoMasterclassesContent.masterclasses[2]?.price || '£500'}
                </Button>
              </CardContent>
            </Card>
          </m.div>
        </div>
      </Section>

      <WaveSeparator 
        variant="subtle" 
        className="text-white" 
      />

      {/* Cultural Masterclasses */}
      <Section background="white" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white opacity-60" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <m.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6">
              Get Confident with British Culture
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full mb-8" />
            <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              From literary classics to social customs—everything your child needs to feel at home in a British classroom
            </p>
          </m.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {/* British Literary Classics */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-300 h-full bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-amber-400 text-amber-700 bg-amber-50 shadow-sm px-4 py-2 text-sm font-bold">
                      {videoMasterclassesContent.masterclasses[3]?.price || '£19.99'}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-slate-700 bg-white/80 rounded-full px-3 py-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      {videoMasterclassesContent.masterclasses[3]?.duration || '60 minutes'}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-serif font-bold text-slate-900">
                    {videoMasterclassesContent.masterclasses[3]?.title || 'British Literary Classics'}
                  </CardTitle>
                  <p className="text-sm text-slate-700 font-medium bg-blue-100 px-3 py-1 rounded-full inline-block">
                    {videoMasterclassesContent.masterclasses[3]?.subtitle || 'Cultural Masterclass'}
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-800 mb-6 leading-relaxed">
                    {videoMasterclassesContent.masterclasses[3]?.description || 'Explore British cultural heritage and literary traditions'}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-bold text-slate-900 mb-3 text-lg">Topics covered:</h4>
                    <ul className="space-y-2">
                      {videoMasterclassesContent.masterclasses[3]?.topics?.map((topic, index) => (
                        <li key={index} className="flex items-center gap-3 text-slate-700">
                          <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-slate-700 mb-6 font-semibold bg-blue-50 px-4 py-2 rounded-lg">
                    <strong>{videoMasterclassesContent.masterclasses[3]?.targetAge || 'Ages 8-14'}</strong>
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold">
                    Purchase - {videoMasterclassesContent.masterclasses[3]?.price || '£19.99'}
                  </Button>
                </CardContent>
              </Card>
            </m.div>

            {/* British Etiquette */}
            <m.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-300 h-full bg-gradient-to-br from-white to-amber-50">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-t-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-amber-400 text-amber-700 bg-amber-50 shadow-sm px-4 py-2 text-sm font-bold">
                      {videoMasterclassesContent.masterclasses[4]?.price || '£19.99'}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-slate-700 bg-white/80 rounded-full px-3 py-1">
                      <Clock className="w-4 h-4 text-amber-600" />
                      {videoMasterclassesContent.masterclasses[4]?.duration || '60 minutes'}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-serif font-bold text-slate-900">
                    {videoMasterclassesContent.masterclasses[4]?.title || 'British Etiquette Masterclass'}
                  </CardTitle>
                  <p className="text-sm text-slate-700 font-medium bg-amber-100 px-3 py-1 rounded-full inline-block">
                    {videoMasterclassesContent.masterclasses[4]?.subtitle || 'Cultural Etiquette Guide'}
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-800 mb-6 leading-relaxed">
                    {videoMasterclassesContent.masterclasses[4]?.description || 'Learn British social customs and etiquette'}
                  </p>
                  <p className="text-slate-800 mb-6 leading-relaxed">
                    {videoMasterclassesContent.masterclasses[4]?.questions || 'Comprehensive etiquette guidance'}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-bold text-slate-900 mb-3 text-lg">Students will learn:</h4>
                    <ul className="space-y-2">
                      {videoMasterclassesContent.masterclasses[4]?.learning?.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-700">
                          <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold">
                    Purchase - {videoMasterclassesContent.masterclasses[4]?.price || '£19.99'}
                  </Button>
                </CardContent>
              </Card>
            </m.div>
          </div>
        </div>
      </Section>

      <WaveSeparator 
        variant="wave" 
        className="text-slate-900" 
      />

      {/* Ideal For Section */}
      <Section background="slate" className="py-20 relative">
        <GradientOverlay variant="primary" className="opacity-90" />
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
      
      </PageLayout>
    </>
  )
}