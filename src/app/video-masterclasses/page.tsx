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
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
  return (
    <PageLayout>
      <PageHero
        background="gradient"
        size="lg"
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

      {/* Introduction */}
      <Section background="white" className="pt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-primary-700 leading-relaxed mb-4">
            {videoMasterclassesContent.intro.bridge}
          </p>
          <p className="text-lg font-semibold text-accent-600">
            {videoMasterclassesContent.intro.access}
          </p>
        </div>
      </Section>

      {/* Featured Masterclasses */}
      <Section background="grey" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary-900 mb-4">
            Featured Masterclasses:
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Free Masterclass */}
          <Card className="border-accent-200 bg-accent-50">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-accent-600 text-white">Free Access</Badge>
                <div className="flex items-center gap-2 text-sm text-primary-600">
                  <Clock className="w-4 h-4" />
                  90 minutes
                </div>
              </div>
              <CardTitle className="text-xl font-serif text-primary-900">
                {videoMasterclassesContent.masterclasses[0].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-700 mb-4">
                {videoMasterclassesContent.masterclasses[0].content}
              </p>
              <p className="text-sm text-primary-600 mb-6">
                {videoMasterclassesContent.masterclasses[0].description}
              </p>
              <Button className="w-full bg-accent-600 hover:bg-accent-700">
                <Play className="w-4 h-4 mr-2" />
                Watch Free Masterclass
              </Button>
            </CardContent>
          </Card>

          {/* UCAS Guide Part 1 */}
          <Card className="border-primary-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="border-primary-300 text-primary-700">
                  {videoMasterclassesContent.masterclasses[1].price}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-primary-600">
                  <Clock className="w-4 h-4" />
                  {videoMasterclassesContent.masterclasses[1].duration}
                </div>
              </div>
              <CardTitle className="text-xl font-serif text-primary-900">
                {videoMasterclassesContent.masterclasses[1].title}
              </CardTitle>
              <p className="text-sm text-primary-600 italic">
                {videoMasterclassesContent.masterclasses[1].venue}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-primary-700 mb-4">
                {videoMasterclassesContent.masterclasses[1].content}
              </p>
              <Button className="w-full">
                Purchase Masterclass - {videoMasterclassesContent.masterclasses[1].price}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Personal Statements Masterclass */}
        <Card className="max-w-4xl mx-auto mb-8 border-accent-200">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-primary-900 text-white">
                {videoMasterclassesContent.masterclasses[2].price}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-primary-600">
                <Clock className="w-4 h-4" />
                {videoMasterclassesContent.masterclasses[2].duration}
              </div>
            </div>
            <CardTitle className="text-xl font-serif text-primary-900">
              {videoMasterclassesContent.masterclasses[2].title}
            </CardTitle>
            <p className="text-sm text-primary-600 italic">
              {videoMasterclassesContent.masterclasses[2].venue}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-primary-700 mb-4">
              {videoMasterclassesContent.masterclasses[2].description}
            </p>
            <p className="text-primary-700 mb-4">
              {videoMasterclassesContent.masterclasses[2].content}
            </p>
            <p className="text-sm text-primary-600 italic mb-6">
              {videoMasterclassesContent.masterclasses[2].note}
            </p>
            <Button className="w-full">
              Purchase Masterclass - {videoMasterclassesContent.masterclasses[2].price}
            </Button>
          </CardContent>
        </Card>
      </Section>

      {/* Cultural Masterclasses */}
      <Section background="white" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary-900 mb-4">
            Get Confident with British Culture
          </h2>
          <p className="text-lg text-primary-700 max-w-3xl mx-auto">
            From literary classics to social customs—everything your child needs to feel at home in a British classroom
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* British Literary Classics */}
          <Card className="border-primary-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="border-accent-300 text-accent-700">
                  {videoMasterclassesContent.masterclasses[3].price}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-primary-600">
                  <Clock className="w-4 h-4" />
                  {videoMasterclassesContent.masterclasses[3].duration}
                </div>
              </div>
              <CardTitle className="text-xl font-serif text-primary-900">
                {videoMasterclassesContent.masterclasses[3].title}
              </CardTitle>
              <p className="text-sm text-primary-600 font-medium">
                {videoMasterclassesContent.masterclasses[3].subtitle}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-primary-700 mb-4">
                {videoMasterclassesContent.masterclasses[3].description}
              </p>
              <div className="mb-4">
                <h4 className="font-semibold text-primary-900 mb-2">Topics covered:</h4>
                <ul className="space-y-1">
                  {videoMasterclassesContent.masterclasses[3].topics.map((topic, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-primary-700">
                      <CheckCircle className="w-4 h-4 text-accent-600" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-primary-600 mb-4">
                <strong>{videoMasterclassesContent.masterclasses[3].targetAge}</strong>
              </p>
              <Button className="w-full">
                Purchase - {videoMasterclassesContent.masterclasses[3].price}
              </Button>
            </CardContent>
          </Card>

          {/* British Etiquette */}
          <Card className="border-primary-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="border-accent-300 text-accent-700">
                  {videoMasterclassesContent.masterclasses[4].price}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-primary-600">
                  <Clock className="w-4 h-4" />
                  {videoMasterclassesContent.masterclasses[4].duration}
                </div>
              </div>
              <CardTitle className="text-xl font-serif text-primary-900">
                {videoMasterclassesContent.masterclasses[4].title}
              </CardTitle>
              <p className="text-sm text-primary-600 font-medium">
                {videoMasterclassesContent.masterclasses[4].subtitle}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-primary-700 mb-4">
                {videoMasterclassesContent.masterclasses[4].description}
              </p>
              <p className="text-primary-700 mb-4">
                {videoMasterclassesContent.masterclasses[4].questions}
              </p>
              <div className="mb-4">
                <h4 className="font-semibold text-primary-900 mb-2">Students will learn:</h4>
                <ul className="space-y-1">
                  {videoMasterclassesContent.masterclasses[4].learning.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-primary-700">
                      <CheckCircle className="w-4 h-4 text-accent-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full">
                Purchase - {videoMasterclassesContent.masterclasses[4].price}
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Ideal For Section */}
      <Section background="navy" className="py-16">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xl text-white leading-relaxed">
            {videoMasterclassesContent.ideal.text}
          </p>
        </div>
      </Section>
    </PageLayout>
  )
}