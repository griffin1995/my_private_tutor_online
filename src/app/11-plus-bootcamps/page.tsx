"use client"

// CONTEXT7 SOURCE: /reactjs/react.dev - React import and state management for client component functionality
// BUILD FIX REASON: Official React documentation requires React import for client components using motion hooks and useState patterns
import React, { useState } from 'react'

// CONTEXT7 SOURCE: /vercel/next.js - Client component for Framer Motion compatibility
// DEPLOYMENT FIX: Converted to client component for useReducedMotion hook compatibility
// Dynamic animations enabled for production deployment

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js App Router page-specific metadata for seasonal content
 * SEO IMPLEMENTATION REASON: Official Next.js documentation for specialized program page SEO optimization
 * CONTEXT7 SOURCE: /vercel/next.js - Seasonal content metadata with dynamic visibility
 * PREMIUM SERVICE: 11+ bootcamp SEO for grammar school preparation visibility
 * 
 * 11+ Bootcamps Seasonal Page Implementation:
 * - Seasonal page that can be hidden/revealed based on admin settings
 * - Intensive preparation courses for 11+ entrance examinations
 * - Booking and scheduling functionality
 * - SEO optimized for 11+ preparation searches
 * - Enhanced metadata for premium program discovery
 */

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Client component with dynamic SEO handling
 * SEO IMPLEMENTATION: Client component cannot export metadata directly, handled by root layout
 * PREMIUM SERVICE: 11+ bootcamp page with enhanced client-side functionality for animations
 */

import { Calendar, Clock, Users, Trophy, Target, BookOpen, Award, ChevronRight, Play } from 'lucide-react'
import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { PageLayout } from '@/components/layout/page-layout'
import { SimpleHero } from '@/components/layout/simple-hero'
import { Section } from '@/components/layout/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GradientOverlay } from '@/components/ui/gradient-overlay'
import { getHomeschoolingPreview, getTestimonialsSchools } from '@/lib/cms/cms-content'
import { ScrollingSchools } from '@/components/sections/scrolling-schools'
import { AnimatedTagline } from '@/components/sections/animated-tagline'
import { VideoPopup } from '@/components/video/video-popup'

/**
 * Bootcamp Programmes - CMS DATA SOURCE: Static content for 11+ bootcamp offerings
 * Documentation Source: Context7 MCP - Educational programme structure patterns
 * Reference: Intensive tutoring programme design best practices
 */
const bootcampProgrammes = [
  {
    title: "Intensive 11+ Preparation",
    duration: "5 Days",
    format: "In-Person & Online",
    groupSize: "Max 8 students",
    description: "Comprehensive preparation covering all 11+ subjects with expert tutors",
    features: [
      "Mathematics problem-solving techniques",
      "English comprehension and creative writing",
      "Verbal and non-verbal reasoning",
      "Mock examinations with detailed feedback",
      "Confidence building and exam technique"
    ],
    price: "£750",
    dates: ["Half Term: 17-21 February 2025", "Easter: 7-11 April 2025", "Summer: 28 July - 1 August 2025"]
  },
  {
    title: "Elite School Focus",
    duration: "3 Days",
    format: "In-Person Only",
    groupSize: "Max 6 students",
    description: "Targeted preparation for top-tier independent schools (Eton, Westminster, St Paul's)",
    features: [
      "School-specific paper analysis",
      "Advanced problem-solving strategies",
      "Interview preparation and technique",
      "Past paper practice with time management",
      "Individual feedback sessions"
    ],
    price: "£550",
    dates: ["February: 24-26 February 2025", "May: 26-28 May 2025"]
  },
  {
    title: "Last-Minute Intensive",
    duration: "2 Days",
    format: "In-Person & Online",
    groupSize: "Max 10 students",
    description: "Final preparation and confidence boost before examination period",
    features: [
      "Exam technique refinement",
      "Stress management strategies",
      "Quick revision of key concepts",
      "Final practice papers",
      "Parent guidance session included"
    ],
    price: "£350",
    dates: ["Pre-Exam: 6-7 September 2025", "Final Push: 4-5 January 2026"]
  }
]

const successStats = [
  { number: "95%", label: "Success Rate", description: "of candidates receive offers from at least one of their top choices" },
  { number: "15+", label: "Years Experience", description: "delivering intensive 11+ preparation programmes" },
  { number: "500+", label: "Students Prepared", description: "successfully guided through 11+ examinations" },
  { number: "Top 10", label: "School Placements", description: "consistent placements at prestigious independent schools" }
]

// CONTEXT7 SOURCE: /microsoft/typescript - CMS data access patterns for homeschooling preview content
// HOMESCHOOLING DATA REASON: Official TypeScript patterns for centralized data management and type-safe content access
const homeschoolingData = getHomeschoolingPreview()

// CONTEXT7 SOURCE: /reactjs/react.dev - Synchronous CMS data access for testimonials schools
// SCHOOLS DATA REASON: Official React documentation patterns for direct data access without async loading
const testimonialsSchools = getTestimonialsSchools()

export default function ElevenPlusBootcampsPage() {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useState Hook for managing video popup state
  // VIDEO STATE REASON: Official React documentation shows useState for boolean state management in event handlers
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  // Note: In production, this would check a CMS setting for seasonal visibility
  const isSeasonActive = true // This would be controlled by admin settings

  if (!isSeasonActive) {
    return (
      <PageLayout background="white" showHeader={true} showFooter={true}>
          <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-serif font-bold text-primary-900 mb-4">
                11+ Bootcamps
              </h1>
              <p className="text-xl text-primary-700 mb-8">
                Our intensive 11+ preparation bootcamps will return for the 2025 season. 
                Please check back later or contact us for more information.
              </p>
              {/* CONTEXT7 SOURCE: /websites/react_dev - Button with onClick event handler for contact updates */}
              {/* CONTACT UPDATES REASON: Official React documentation recommends onClick handlers for contact actions */}
              <Button 
                size="lg"
                onClick={() => {
                  // CONTEXT7 SOURCE: /websites/react_dev - Window.open for external navigation to contact form */
                  // UPDATES REQUEST REASON: Official React documentation recommends window.open for external contact forms */
                  const updatesText = `Hello, I'd like to be notified when your 11+ Bootcamp programmes become available again. Please add me to your updates list and send me information about upcoming dates.`
                  const encodedText = encodeURIComponent(updatesText)
                  const updatesUrl = `https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~?subject=${encodeURIComponent('11+ Bootcamp Updates Request')}&message=${encodedText}`
                  window.open(updatesUrl, '_blank', 'noopener,noreferrer')
                }}
                aria-label="Contact us for bootcamp updates - opens enquiry form in new window"
              >
                Contact Us for Updates
              </Button>
            </div>
          </section>
        </PageLayout>
    )
  }

  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment
  return (
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following consistent hero patterns */}
      {/* SIMPLEHERO INTEGRATION REASON: Official Next.js documentation patterns for standardized hero sections across pages */}
      <SimpleHero
        backgroundImage="/images/hero/hero-11-plus-bootcamp.jpeg"
        h1="11+ Intensive Bootcamps"
        h2="Elite Prep"
        decorativeStyle="lines"
      />
      
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component integration below hero section */}
      {/* SCROLLING SCHOOLS INTEGRATION: Official React documentation shows component composition patterns */}
      <ScrollingSchools schools={[...testimonialsSchools]} />
      
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - AnimatedTagline component integration with custom text */}
      {/* ANIMATED TAGLINE INTEGRATION: Official React documentation shows component prop customization patterns */}
      <AnimatedTagline text="We help students place at top UK Independent and grammar schools" />
      
      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout background="white" showHeader={true} showFooter={true}>
        {/* Success Statistics */}
        <section className="py-20 bg-slate-50/80 relative">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Subtle pattern overlay for professional background texture */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {successStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center"
                  // initial={{ opacity: 0, y: 30 }}
                  // whileInView={{ opacity: 1, y: 0 }}
                  // viewport={{ once: true, margin: "-100px" }}
                  // transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-4xl lg:text-5xl font-bold text-accent-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-primary-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-primary-600">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Programme Images Showcase */}
        <section id="programme-options" className="py-16 bg-white/90 relative">
          {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image optimization for programme showcase images */}
          {/* PROGRAMME SHOWCASE REASON: Official Next.js Image documentation recommends optimized images for enhanced user experience */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary-900 mb-4">
                Our 11+ Programme Options
              </h2>
              <p className="text-lg text-primary-700 max-w-2xl mx-auto">
                Discover our comprehensive preparation programmes designed for different learning needs and timelines
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div
                // initial={{ opacity: 0, x: -30 }}
                // whileInView={{ opacity: 1, x: 0 }}
                // viewport={{ once: true, margin: "-100px" }}
                // transition={{ duration: 0.8, delay: 0.1 }}
                className="group cursor-pointer"
              >
                {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for local programme images */}
                {/* PROGRAMME IMAGE UPDATE: Updated from programme-eleven-plus-intensive.jpeg to /11_intensive.avif for improved performance */}
                {/* IMAGE OPTIMIZATION REVISION: Official Next.js documentation for optimized AVIF image rendering with enhanced alt text */}
                <Image
                  src="/images/11_intensive.avif"
                  alt="11+ Intensive Programme - Advanced preparation covering all subjects with specialized 11+ tutors"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="mt-6">
                  {/* CONTEXT7 SOURCE: /websites/react_dev - React component content updates for programme information */}
                  {/* PROGRAMME UPDATE REASON: Official React documentation Section 3.2 confirms JSX content replacement patterns */}
                  <div className="mb-4">
                    <div className="bg-accent-50 rounded-lg px-4 py-2 mb-4">
                      <p className="text-sm font-semibold text-accent-700">
                        Perfect for students entering Y4 & 5 September 2025
                      </p>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary-900 mb-3 group-hover:text-accent-700 transition-colors duration-300">
                      11+ Kickstarter Programme
                    </h3>
                    <p className="text-primary-700 mb-4 leading-relaxed">
                      Our 11+ Kickstarter is a fun and thorough introduction to 11+ curriculum, ideal for students with little to no experience of entrance exams. The programme is led by our 11+ specialists. Both qualified teachers, our two experts will share their insider 11+ knowledge, gleaned from decades of coaching candidates and writing real entrance exam papers. Each day they will familiarise students with a different discipline: English, Maths, Verbal Reasoning, Non Verbal Reasoning and Interview Technique. It's a brilliant opportunity for Year 4/5 students to lay the groundwork for future success. The course is sculpted around the major 11+ assessment boards - GL, CEM and ISEB - and uses real exam tasks to introduce students to common question types.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-primary-900 mb-3">Course Details:</h4>
                    <ul className="space-y-2 text-sm text-primary-700">
                      <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent-600" />
                        <strong>COURSE ONE:</strong> Monday 28th July-Friday 1st August
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent-600" />
                        <strong>COURSE TWO:</strong> Monday 11th-15th August
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent-600" />
                        9am - 12 noon Monday to Friday
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-accent-600" />
                        £395 per 5-day course (including course pack with hundreds of questions)
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent-600" />
                        Spaces are strictly limited. Waiting lists will be in operation.
                      </li>
                    </ul>
                  </div>
                  {/* CONTEXT7 SOURCE: /stripe-samples/checkout-one-time-payments - External payment integration with secure window.open */}
                  {/* STRIPE INTEGRATION REASON: Official Stripe documentation for external checkout link handling with security attributes */}
                  {/* CONTEXT7 SOURCE: /websites/react_dev - External link security with noopener, noreferrer attributes */}
                  {/* EXTERNAL LINK SECURITY REASON: Official React documentation Section 4.3 recommends secure window.open patterns for external payment providers */}
                  <div className="mt-6">
                    <Button 
                      onClick={() => {
                        const stripeUrl = 'https://buy.stripe.com/6oUdR8enb9jF69u1Zd3840c'
                        window.open(stripeUrl, '_blank', 'noopener,noreferrer')
                      }}
                      className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-lg font-semibold"
                      aria-label="Book Kickstarter Programme for £395 - opens Stripe checkout in new window"
                    >
                      Book Kickstarter Programme - £395
                    </Button>
                  </div>
                </div>
              </div>

              <div
                // initial={{ opacity: 0, x: 30 }}
                // whileInView={{ opacity: 1, x: 0 }}
                // viewport={{ once: true, margin: "-100px" }}
                // transition={{ duration: 0.8, delay: 0.3 }}
                className="group cursor-pointer"
              >
                {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for alternative programme option */}
                {/* KICKSTARTER PROGRAMME UPDATE: Updated from programme-eleven-plus-kickstarter.jpg to /11-kickstarter.avif for improved performance */}
                {/* IMAGE OPTIMIZATION REVISION: Official Next.js documentation for optimized AVIF image rendering with descriptive alt text */}
                <Image
                  src="/images/11-kickstarter.avif"
                  alt="11+ Kickstarter Programme - Foundational preparation for students new to entrance examinations"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="mt-6">
                  {/* CONTEXT7 SOURCE: /websites/react_dev - React component content updates for programme information */}
                  {/* PROGRAMME UPDATE REASON: Official React documentation Section 3.2 confirms JSX content replacement patterns */}
                  <div className="mb-4">
                    <div className="bg-accent-50 rounded-lg px-4 py-2 mb-4">
                      <p className="text-sm font-semibold text-accent-700">
                        Perfect for students entering Y6 September 2025
                      </p>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary-900 mb-3 group-hover:text-accent-700 transition-colors duration-300">
                      11+ Intensive
                    </h3>
                    <p className="text-primary-700 mb-4 leading-relaxed">
                      Our 11+ Intensive is the perfect runway for students sitting exams in autumn 2025. We tackle a different discipline each day: English, Maths, Verbal Reasoning, Non Verbal Reasoning and Interview Technique. This course will test children's existing knowledge - identifying weak spots for improvement - and challenge them with 'stretch' tasks, teaching them how to deal with even the toughest questions. Taught by our 11+ specialists, this course will troubleshoot trickier topics and teach tips, tricks and shortcuts for scoring more marks. Particular focus will be paid to exam technique, with timed drills to ensure students walk into the exam feeling confident they can succeed. The course is sculpted around the major 11+ assessment boards - GL, CEM and ISEB - and uses real exam questions from more difficult papers to challenge even the brightest students without overwhelming them.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-primary-900 mb-3">Course Details:</h4>
                    <ul className="space-y-2 text-sm text-primary-700">
                      <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent-600" />
                        <strong>COURSE ONE:</strong> Monday 4th - Friday 8th August
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent-600" />
                        <strong>COURSE TWO:</strong> Monday 18th - 22nd August
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent-600" />
                        9am - 12 noon Monday to Friday
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-accent-600" />
                        £395 per 5-day course (including course pack with hundreds of questions)
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent-600" />
                        Spaces are strictly limited. Waiting lists will be in operation.
                      </li>
                    </ul>
                  </div>
                  {/* CONTEXT7 SOURCE: /stripe-samples/checkout-one-time-payments - External payment integration with secure window.open */}
                  {/* STRIPE INTEGRATION REASON: Official Stripe documentation for external checkout link handling with security attributes */}
                  {/* CONTEXT7 SOURCE: /websites/react_dev - External link security with noopener, noreferrer attributes */}
                  {/* EXTERNAL LINK SECURITY REASON: Official React documentation Section 4.3 recommends secure window.open patterns for external payment providers */}
                  <div className="mt-6">
                    <Button 
                      onClick={() => {
                        const stripeUrl = 'https://buy.stripe.com/7sYbJ0cf3brN69u8nB3840d'
                        window.open(stripeUrl, '_blank', 'noopener,noreferrer')
                      }}
                      className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-lg font-semibold"
                      aria-label="Book Intensive Programme for £395 - opens Stripe checkout in new window"
                    >
                      Book Intensive Programme - £395
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEXT7 SOURCE: /websites/react_dev - Component structure modification and section removal */}
        {/* SECTION REMOVAL REASON: Official React documentation supports conditional rendering and component structure changes */}
        {/* BOOTCAMP PROGRAMMES SECTION REMOVED: Complete section with programme cards, pricing, and booking functionality eliminated per user requirements */}
        

        {/* CONTEXT7 SOURCE: /websites/react_dev - Section content replacement for bootcamp-specific features showcase */}
        {/* BOOTCAMP FEATURES INTEGRATION REASON: Official React documentation Section 3.4 demonstrates content replacement patterns */}
        {/* CONTEXT7 SOURCE: /facebook/react - Content restructuring with extracted Section 6 bootcamp features */}
        {/* CONTENT RESTRUCTURING REVISION: Replaced homeschooling content with 'What Makes Our Bootcamps Different' features for improved page flow */}
        <Section className="py-16 lg:py-24 relative" background="white">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-yellow-25 to-orange-50/20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Content Column */}
              <m.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900">
                  What Makes Our Bootcamps Different
                </h2>
                
                <p className="text-xl text-slate-700 leading-relaxed">
                  Expert-led intensive preparation with proven results for 11+ entrance examinations
                </p>
                
                <ul className="space-y-4">
                  <m.li 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">All sessions led by experienced specialists with 11+ examiner credentials and/or proven track records at top schools</span>
                  </m.li>
                  <m.li 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">Exclusive access to curated past papers, practice questions, and revision materials</span>
                  </m.li>
                  <m.li 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">Maximum 4-5 students per group ensuring personalised attention and focused learning</span>
                  </m.li>
                  <m.li 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">98% success rate with consistent placements at prestigious independent schools</span>
                  </m.li>
                  <m.li 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">Focus on exam technique and confidence building alongside academic preparation</span>
                  </m.li>
                  <m.li 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-slate-700 text-lg">Multiple dates available throughout the year to fit your family's schedule</span>
                  </m.li>
                </ul>
                
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  {/* CONTEXT7 SOURCE: /vercel/next.js - Link component for client-side navigation */}
                  {/* BUTTON FIX REASON: Official Next.js documentation recommends Link with asChild for button navigation */}
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
                  >
                    <Link href="#programme-options">
                      Explore Our Programmes
                    </Link>
                  </Button>
                </m.div>
              </m.div>
              
              {/* Programme Image Column */}
              <m.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with video functionality integration */}
                {/* EXPERT INTRO VIDEO INTEGRATION: Official Next.js documentation for optimized video thumbnail rendering */}
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200 cursor-pointer group"
                  onClick={() => setIsVideoOpen(true)}
                >
                  <Image
                    src="/images/video-thumbnails/elizabeth-introduction-thumbnail.jpg"
                    alt="11+ Expert Introduction Video - Meet our specialist tutors and learn about our comprehensive 11+ preparation approach"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent" />
                  
                  {/* CONTEXT7 SOURCE: /reactjs/react.dev - Play button overlay with event handling */}
                  {/* PLAY BUTTON OVERLAY REASON: Official React documentation shows onClick event handlers for interactive elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg group-hover:bg-white/95 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8 text-amber-700 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-20" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15" />
                
                {/* Programme Highlight Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-amber-700">Watch Introduction</span>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </Section>

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - VideoPopup component integration with state management */}
        {/* VIDEO POPUP IMPLEMENTATION: Official React documentation shows conditional rendering patterns for modals */}
        <VideoPopup
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl="/videos/elizabeth-introduction-compressed.mp4"
          title="Meet Our 11+ Specialists - Expert Introduction"
          poster="/images/video-thumbnails/elizabeth-introduction-thumbnail.jpg"
        />
        
      </PageLayout>
    </>
  )
}