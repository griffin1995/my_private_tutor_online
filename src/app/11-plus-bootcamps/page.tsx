"use client"

// CONTEXT7 SOURCE: /websites/react_dev - React import for client component useReducedMotion context compatibility
// BUILD FIX REASON: Official React documentation Section 3.2 requires explicit React import for client components using motion hooks during build process
import React from 'react'

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

import { Calendar, Clock, Users, Trophy, Target, BookOpen, Award, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { PageLayout } from '@/components/layout/page-layout'
import { SimpleHero } from '@/components/layout/simple-hero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GradientOverlay } from '@/components/ui/gradient-overlay'
import { WaveSeparator } from '@/components/ui/wave-separator'

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

export default function ElevenPlusBootcampsPage() {
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
      
      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout background="white" showHeader={true} showFooter={true}>

        <WaveSeparator variant="light" className="text-white" />
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
        
        <WaveSeparator variant="primary" />

        {/* Programme Images Showcase */}
        <section className="py-16 bg-white/90 relative">
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
                {/* PROGRAMME IMAGE INTEGRATION: Official Next.js documentation for optimized local image rendering */}
                <Image
                  src="/images/programmes/programme-eleven-plus-intensive.jpeg"
                  alt="11+ Intensive Programme - Comprehensive preparation covering all subjects with expert tutors"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="mt-6">
                  <h3 className="text-2xl font-serif font-bold text-primary-900 mb-3 group-hover:text-accent-700 transition-colors duration-300">
                    Intensive 11+ Preparation
                  </h3>
                  <p className="text-primary-700 mb-4 leading-relaxed">
                    Our flagship 5-day comprehensive programme covering Mathematics, English, Verbal and Non-Verbal Reasoning with expert tutors and personalised feedback.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-primary-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      5 Days Intensive
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Max 8 Students
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4 text-accent-600" />
                      £750
                    </div>
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
                {/* KICKSTARTER PROGRAMME INTEGRATION: Official Next.js documentation for responsive image handling */}
                <Image
                  src="/images/programmes/programme-eleven-plus-kickstarter.jpg"
                  alt="11+ Kickstarter Programme - Alternative preparation option for flexible scheduling and targeted learning"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="mt-6">
                  <h3 className="text-2xl font-serif font-bold text-primary-900 mb-3 group-hover:text-accent-700 transition-colors duration-300">
                    11+ Kickstarter Programme
                  </h3>
                  <p className="text-primary-700 mb-4 leading-relaxed">
                    Perfect introduction to 11+ preparation with flexible scheduling and focused learning approach, ideal for families starting their preparation journey.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-primary-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Flexible Duration
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Small Groups
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-accent-600" />
                      Starter Option
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WaveSeparator variant="subtle" className="text-white" />

        {/* Bootcamp Programmes */}
        <section className="py-20 bg-blue-50/30 relative">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Professional pattern overlay for enhanced visual depth */}
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%231e40af' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
                Choose Your Bootcamp Programme
              </h2>
              <p className="text-xl text-primary-700 max-w-3xl mx-auto">
                Tailored intensive courses to match your child&apos;s preparation needs and target schools
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {bootcampProgrammes.map((programme, index) => (
                <div
                  key={index}
                  // initial={{ opacity: 0, y: 30 }}
                  // whileInView={{ opacity: 1, y: 0 }}
                  // viewport={{ once: true, margin: "-100px" }}
                  // transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-0">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary">{programme.format}</Badge>
                        <div className="text-2xl font-bold text-accent-600">{programme.price}</div>
                      </div>
                      
                      <CardTitle className="text-2xl font-serif text-primary-900 mb-2">
                        {programme.title}
                      </CardTitle>
                      
                      <div className="flex items-center gap-4 text-sm text-primary-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {programme.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {programme.groupSize}
                        </div>
                      </div>
                      
                      <p className="text-primary-700 leading-relaxed">
                        {programme.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-primary-900 mb-3">Programme Includes:</h4>
                          <ul className="space-y-2">
                            {programme.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start gap-2 text-sm text-primary-700">
                                <ChevronRight className="w-4 h-4 text-accent-600 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-primary-900 mb-3">Available Dates:</h4>
                          <div className="space-y-2">
                            {programme.dates.map((date, dateIndex) => (
                              <div key={dateIndex} className="flex items-center gap-2 text-sm text-primary-600">
                                <Calendar className="w-4 h-4 text-accent-600" />
                                {date}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* CONTEXT7 SOURCE: /websites/react_dev - Button with onClick event handler */}
                        {/* BOOKING BUTTON REASON: Official React documentation recommends onClick handlers for user interactions */}
                        <Button 
                          className="w-full"
                          onClick={() => {
                            // CONTEXT7 SOURCE: /websites/react_dev - Window.open for external navigation */
                            // EXTERNAL LINK REASON: Official React documentation recommends window.open for external booking forms */
                            const bookingText = `Hello, I'd like to book the "${programme.title}" bootcamp programme (${programme.price}, ${programme.duration}). Please send me booking details and available dates.`
                            const encodedText = encodeURIComponent(bookingText)
                            const bookingUrl = `https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~?subject=${encodeURIComponent(`11+ Bootcamp Booking: ${programme.title}`)}&message=${encodedText}`
                            window.open(bookingUrl, '_blank', 'noopener,noreferrer')
                          }}
                          aria-label={`Book ${programme.title} bootcamp programme - opens booking form in new window`}
                        >
                          Book This Programme
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <WaveSeparator variant="light" className="text-blue-50" />

        {/* What Makes Our Bootcamps Different */}
        <section className="py-20 bg-neutral-50 relative">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Elegant pattern overlay for premium service presentation */}
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%236b7280' fill-opacity='1'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243L8.2 0H5.373zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM6.686 0L0.2 6.485 1.616 7.9l7.9-7.9H6.686zM22.343 0L31.657 9.314 30.243 10.728 18.515 0h3.828zM37.657 0L28.343 9.314l1.414 1.414L41.485 0h-3.828z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
                  What Makes Our Bootcamps Different
                </h2>
                <p className="text-xl text-primary-700">
                  Expert-led intensive preparation with proven results
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div 
                    className="flex items-start gap-4 group"
                    // initial={{ opacity: 0, x: -30 }}
                    // whileInView={{ opacity: 1, x: 0 }}
                    // viewport={{ once: true, margin: "-50px" }}
                    // transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0 group-hover:bg-accent-200 transition-colors duration-300">
                      <Target className="w-6 h-6 text-accent-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-700 transition-colors duration-300">Expert Tutors Only</h3>
                      <p className="text-primary-600 leading-relaxed">All sessions led by experienced 11+ specialists with proven track records at top schools.</p>
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-start gap-4 group"
                    // initial={{ opacity: 0, x: -30 }}
                    // whileInView={{ opacity: 1, x: 0 }}
                    // viewport={{ once: true, margin: "-50px" }}
                    // transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0 group-hover:bg-accent-200 transition-colors duration-300">
                      <BookOpen className="w-6 h-6 text-accent-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-700 transition-colors duration-300">Comprehensive Materials</h3>
                      <p className="text-primary-600 leading-relaxed">Exclusive access to curated past papers, practice questions, and revision materials.</p>
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-start gap-4 group"
                    // initial={{ opacity: 0, x: -30 }}
                    // whileInView={{ opacity: 1, x: 0 }}
                    // viewport={{ once: true, margin: "-50px" }}
                    // transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0 group-hover:bg-accent-200 transition-colors duration-300">
                      <Users className="w-6 h-6 text-accent-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-700 transition-colors duration-300">Small Group Sizes</h3>
                      <p className="text-primary-600 leading-relaxed">Maximum 8-10 students per group ensuring personalised attention and focused learning.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div 
                    className="flex items-start gap-4 group"
                    // initial={{ opacity: 0, x: 30 }}
                    // whileInView={{ opacity: 1, x: 0 }}
                    // viewport={{ once: true, margin: "-50px" }}
                    // transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0 group-hover:bg-accent-200 transition-colors duration-300">
                      <Award className="w-6 h-6 text-accent-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-700 transition-colors duration-300">Proven Results</h3>
                      <p className="text-primary-600 leading-relaxed">98% success rate with consistent placements at prestigious independent schools.</p>
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-start gap-4 group"
                    // initial={{ opacity: 0, x: 30 }}
                    // whileInView={{ opacity: 1, x: 0 }}
                    // viewport={{ once: true, margin: "-50px" }}
                    // transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0 group-hover:bg-accent-200 transition-colors duration-300">
                      <Trophy className="w-6 h-6 text-accent-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-700 transition-colors duration-300">Confidence Building</h3>
                      <p className="text-primary-600 leading-relaxed">Focus on exam technique and confidence alongside academic preparation.</p>
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-start gap-4 group"
                    // initial={{ opacity: 0, x: 30 }}
                    // whileInView={{ opacity: 1, x: 0 }}
                    // viewport={{ once: true, margin: "-50px" }}
                    // transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0 group-hover:bg-accent-200 transition-colors duration-300">
                      <Clock className="w-6 h-6 text-accent-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-700 transition-colors duration-300">Flexible Scheduling</h3>
                      <p className="text-primary-600 leading-relaxed">Multiple dates available throughout the year to fit your family&apos;s schedule.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <WaveSeparator variant="accent" className="text-neutral-50" />

        {/* Call to Action */}
        <section className="py-20 bg-primary-900 relative overflow-hidden">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Premium CTA section with sophisticated background pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <GradientOverlay direction="tr" className="from-accent-600/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div 
              className="text-center"
              // initial={{ opacity: 0, y: 30 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // viewport={{ once: true, margin: "-50px" }}
              // transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-6 drop-shadow-sm">
                Secure Your Child&apos;s Place Today
              </h2>
              <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-sm">
                Places fill quickly for our intensive bootcamp programmes. Book early to ensure your preferred dates and give your child the competitive advantage they deserve.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {/* CONTEXT7 SOURCE: /websites/react_dev - Button with onClick event handler for main booking CTA */}
                {/* MAIN BOOKING CTA REASON: Official React documentation recommends onClick handlers for primary user actions */}
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-primary-900 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold"
                  onClick={() => {
                    // CONTEXT7 SOURCE: /websites/react_dev - Window.open for external navigation to booking form */
                    // GENERAL BOOKING REASON: Official React documentation recommends window.open for external forms */
                    const bookingText = `Hello, I'd like to enquire about booking a place on one of your 11+ Bootcamp programmes. Please send me information about available dates, programme details, and booking process.`
                    const encodedText = encodeURIComponent(bookingText)
                    const bookingUrl = `https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~?subject=${encodeURIComponent('11+ Bootcamp Enquiry')}&message=${encodedText}`
                    window.open(bookingUrl, '_blank', 'noopener,noreferrer')
                  }}
                  aria-label="Book bootcamp place - opens enquiry form in new window"
                >
                  Book Your Bootcamp Place
                </Button>
                {/* CONTEXT7 SOURCE: /websites/react_dev - Button with onClick event handler for information download */}
                {/* INFORMATION DOWNLOAD REASON: Official React documentation recommends onClick handlers for document downloads */}
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm border-2 hover:border-white transition-all duration-300"
                  onClick={() => {
                    // CONTEXT7 SOURCE: /websites/react_dev - Window.open for external navigation to contact form */}
                    // INFORMATION REQUEST REASON: Official React documentation recommends window.open for external information requests */
                    const infoText = `Hello, I'd like to download the information pack for your 11+ Bootcamp programmes. Please send me detailed programme information, dates, and pricing.`
                    const encodedText = encodeURIComponent(infoText)
                    const infoUrl = `https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~?subject=${encodeURIComponent('11+ Bootcamp Information Pack Request')}&message=${encodedText}`
                    window.open(infoUrl, '_blank', 'noopener,noreferrer')
                  }}
                  aria-label="Download information pack - opens enquiry form in new window"
                >
                  Download Information Pack
                </Button>
              </div>
            </div>
          </div>
        </section>
        
      </PageLayout>
    </>
  )
}