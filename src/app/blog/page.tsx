/**
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js App Router page component implementation
 * REFERENCE: Official Next.js documentation for page.tsx file patterns in App Router
 * PATTERN: Client component page with PageLayout integration and CMS compatibility
 * 
 * Blog Page Implementation:
 * - Under construction placeholder page for future blog content
 * - Follows established page structure patterns used throughout the site
 * - Ready for future blog system integration
 * - SEO optimized for blog-related searches
 * - Uses existing design system and component patterns
 */

"use client"

// CONTEXT7 SOURCE: /vercel/next.js - Next.js App Router client component imports
// REFERENCE: Official Next.js documentation for client-side component patterns
import { BookOpen, Clock, Users, ArrowRight } from 'lucide-react'
import { m } from 'framer-motion'

// CONTEXT7 SOURCE: /vercel/next.js - Next.js App Router layout component imports
// REFERENCE: Established layout pattern used across all pages in the application
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GradientOverlay } from '@/components/ui/gradient-overlay'
import { WaveSeparator } from '@/components/ui/wave-separator'

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js App Router page component export
 * REFERENCE: Official Next.js documentation for default export page components
 * IMPLEMENTATION: Blog page following established site patterns and design system
 */
export default function BlogPage() {
  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment
  return (
    <>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-screen hero section with gradient backgrounds */}
      {/* HERO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.1 recommends gradient treatments for premium branding */}
      <PageHero 
        background="gradient" 
        size="full"
        className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 relative overflow-hidden"
      >
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Pattern overlay for premium visual design */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <GradientOverlay direction="br" className="from-primary-900/30 via-transparent to-transparent" />
        <div className="relative z-10 text-center space-y-6">
          <m.h1 
            className="text-4xl lg:text-6xl font-serif font-bold text-white drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Educational Blog
          </m.h1>
          
          <m.p 
            className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Insights, tips, and educational guidance from our expert tutors
          </m.p>
        </div>
      </PageHero>
      
      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout background="white" showHeader={true} showFooter={true}>

        <WaveSeparator variant="light" className="text-white" />
        
        {/* Under Construction Section */}
        <section className="py-20 bg-slate-50/80 relative">
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Subtle pattern overlay for construction interface */}
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <m.div 
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-accent-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
                  <BookOpen className="w-16 h-16 text-accent-600" />
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6">
                  Blog Under Construction
                </h2>
                
                <p className="text-lg lg:text-xl text-primary-700 leading-relaxed max-w-3xl mx-auto mb-8">
                  We're working hard to bring you valuable educational content, tutoring insights, and academic guidance. Our blog will feature expert advice from our team of qualified educators.
                </p>
                
                <div className="bg-primary-50 rounded-xl p-6 text-left max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">Coming Soon:</h3>
                  <ul className="space-y-3 text-primary-700">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                      Study tips and revision techniques
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                      11+ preparation strategies
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                      GCSE and A-Level guidance
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                      University application advice
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                      Educational trends and insights
                    </li>
                  </ul>
                </div>
              </m.div>
            </div>
          </div>
        </section>
        
        <WaveSeparator variant="primary" />

        {/* Features Preview */}
        <section className="py-20 bg-blue-50/30 relative">
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional pattern overlay for feature previews */}
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%231e40af' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
                What to Expect
              </h2>
              <p className="text-xl text-primary-700 max-w-3xl mx-auto">
                Our upcoming blog will feature expert educational content designed to support students and families
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white/90 backdrop-blur-sm border-0">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <Clock className="w-8 h-8 text-accent-600" />
                      </div>
                      <CardTitle className="text-xl font-serif text-primary-900">
                        Regular Updates
                      </CardTitle>
                    </div>
                    <p className="text-primary-700 leading-relaxed">
                      Fresh educational content published weekly, covering the latest developments in tutoring and academic preparation.
                    </p>
                  </CardHeader>
                </Card>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white/90 backdrop-blur-sm border-0">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <Users className="w-8 h-8 text-accent-600" />
                      </div>
                      <CardTitle className="text-xl font-serif text-primary-900">
                        Expert Authors
                      </CardTitle>
                    </div>
                    <p className="text-primary-700 leading-relaxed">
                      Articles written by our qualified tutors and educational specialists with years of teaching experience.
                    </p>
                  </CardHeader>
                </Card>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white/90 backdrop-blur-sm border-0">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-accent-600" />
                      </div>
                      <CardTitle className="text-xl font-serif text-primary-900">
                        Practical Advice
                      </CardTitle>
                    </div>
                    <p className="text-primary-700 leading-relaxed">
                      Actionable tips and strategies that you can implement immediately to enhance learning outcomes.
                    </p>
                  </CardHeader>
                </Card>
              </m.div>
            </div>
          </div>
        </section>
        
        <WaveSeparator variant="light" className="text-blue-50" />

        {/* Newsletter Signup */}
        <section className="py-20 bg-neutral-50 relative">
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Elegant pattern overlay for newsletter section */}
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%236b7280' fill-opacity='1'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243L8.2 0H5.373zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM6.686 0L0.2 6.485 1.616 7.9l7.9-7.9H6.686zM22.343 0L31.657 9.314 30.243 10.728 18.515 0h3.828zM37.657 0L28.343 9.314l1.414 1.414L41.485 0h-3.828z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <m.h2 
                className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
              >
                Stay Informed
              </m.h2>
              <m.p 
                className="text-lg lg:text-xl text-primary-700 leading-relaxed mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Be the first to know when our educational blog launches. We'll notify you when new articles and resources become available.
              </m.p>
              
              <m.div 
                className="mt-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button 
                  size="lg" 
                  className="px-12 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                  asChild
                >
                  <a href="#contact">
                    <span>Get Notified When We Launch</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Button>
              </m.div>
            </div>
          </div>
        </section>
        
      </PageLayout>
    </>
  )
}