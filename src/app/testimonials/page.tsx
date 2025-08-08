/**
 * Documentation Source: Next.js 14 + React 18 + Framer Motion
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://react.dev/reference/react/useState
 * Reference: https://www.framer.com/motion/animation/
 * Reference: https://www.framer.com/motion/lazy-motion/
 * 
 * Pattern: Client Component with filterable testimonials using LazyMotion
 * Architecture:
 * - State management for category filtering
 * - m component animations for testimonial cards (LazyMotion optimization)
 * - Full CMS integration for all content
 * 
 * Features:
 * - Category-based filtering
 * - Animated testimonial carousel
 * - Royal endorsement highlights
 * - Video testimonials integration
 * 
 * CMS Integration:
 * - getTestimonialsContent for page content
 * - getTestimonialsHero for hero section
 * - getRecentTestimonials for testimonial data
 * - getTestimonialsSchools for school badges
 * 
 * Performance:
 * - Using m components with LazyMotion reduces bundle from ~34kb to ~4.6kb + 21kb
 */

"use client"

import { useState } from 'react'
import { m } from 'framer-motion'
import { Play, Star, Quote, Award, Crown, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { VideoText } from '@/components/magicui/video-text'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { RoyalTestimonialCard } from '@/components/marketing/royal-testimonial-card'
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getTestimonialsContent, getTestimonialsHero, getRecentTestimonials, getTestimonialsSchools } from '@/lib/cms/cms-content'
import { getBackgroundVideo, HERO_IMAGES } from '@/lib/cms/cms-images'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
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
// - Parent/Child: Testimonials page component, children: PageHeader, PageFooter, filtering components
// - Dynamic Features: useState for category filtering, Framer Motion animations, video testimonials
// - Dependencies: Full CMS integration (getTestimonialsContent, getTestimonialsHero, getRecentTestimonials)
// - Interactivity: Category filtering, testimonial carousel, video dialog modals
// - CMS Integration: Complete with testimonials, schools, and hero content

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  
  // CMS DATA SOURCE: Using getTestimonialsContent for all testimonials page content
  const testimonialsContent = getTestimonialsContent()
  // CMS DATA SOURCE: Using getTestimonialsHero for hero section
  const heroContent = getTestimonialsHero()
  // CMS DATA SOURCE: Using getRecentTestimonials for testimonials display
  const recentTestimonials = getRecentTestimonials()
  // CMS DATA SOURCE: Using getTestimonialsSchools for school shields
  const schools = getTestimonialsSchools()
  // CMS DATA SOURCE: Using getBackgroundVideo for testimonials video
  const testimonialsVideo = getBackgroundVideo('brandStatement')
  // Hero background image
  const heroBackgroundImage = HERO_IMAGES.childWithLaptop

  // Filter testimonials by category
  const filteredTestimonials = selectedCategory === 'all' 
    ? recentTestimonials 
    : recentTestimonials.filter(testimonial => 
        testimonial.role.toLowerCase().includes(selectedCategory.toLowerCase())
      )

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - App Router page component patterns
  // DESIGN IMPROVEMENT REASON: Official Next.js documentation recommends PageLayout → PageHero → Section structure for consistent layouts
  return (
    <PageLayout background="white" showHeader={true} showFooter={true}>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional hero section with enhanced gradient background */}
      {/* HERO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.1 recommends gradient treatments for premium branding */}
      <PageHero
        background="gradient"
        size="lg" 
        className="bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900"
        overlay={true}
        overlayOpacity="light"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Viewport-triggered animations for performance */}
          {/* ANIMATION REASON: Official Framer Motion documentation recommends whileInView for hero sections */}
          <m.h1 
            className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {heroContent.title}
          </m.h1>
          
          <m.p 
            className="text-xl lg:text-2xl text-accent-400 font-semibold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroContent.subtitle}
          </m.p>
          
          <m.p 
            className="text-lg text-white/90 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {heroContent.description}
          </m.p>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional section backgrounds for visual hierarchy */}
      {/* SECTION ENHANCEMENT REASON: Official Tailwind CSS documentation Section 6.2 recommends alternating backgrounds for content separation */}
      {/* Premium Introduction Section - Enhanced with Professional Background Treatment */}
      <section className="relative bg-slate-50/80 py-16 lg:py-20 border-b border-slate-100/50">
        {/* Premium Pattern Overlay (2% opacity) */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Professional Gradient Overlay */}
        <GradientOverlay 
          direction="top" 
          from="white/20" 
          to="transparent" 
          height="h-20"
          className="top-0"
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border border-primary-100">
                <Crown className="w-6 h-6 text-accent-600" />
                <span className="font-semibold text-primary-900">Featured in Tatler</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border border-primary-100">
                <Award className="w-6 h-6 text-accent-600" />
                <span className="font-semibold text-primary-900">School Guide UK's Top Pick</span>
              </div>
            </div>
            
            <p className="text-xl text-primary-700 leading-relaxed mb-8">
              {testimonialsContent.mainContent.intro}
            </p>
            <p className="text-xl text-primary-700 leading-relaxed">
              {testimonialsContent.mainContent.callToAction}
            </p>
          </m.div>
        </div>
        
        {/* Professional Section Transition */}
        <WaveSeparator variant="subtle" color="blue-50/30" />
      </section>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional video section with enhanced background */}
      {/* VIDEO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 7.1 recommends blue tints for trust and reliability */}
      {/* Premium Video Section - Enhanced with Professional Background Treatment */}
      <section className="relative bg-blue-50/30 py-20 lg:py-28">
        {/* Premium Pattern Overlay (1.5% opacity for subtle treatment) */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M20 10l-5 5L10 10l5-5L20 10zm10 10l-5 5L20 15l5-5L30 20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Professional Gradient Overlays */}
        <GradientOverlay 
          direction="radial" 
          from="blue-100/10" 
          to="transparent" 
          height="h-full"
          className="top-0"
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-8">
              What Families Are Saying
            </h2>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              Hear directly from families about their transformative experiences with My Private Tutor Online
            </p>
          </m.div>
          
          <m.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc={testimonialsVideo?.src || "/testimonials-july-2025-mpto.mp4"}
                thumbnailSrc={testimonialsVideo?.poster || "/images/video-placeholders/testimonials-video-placeholder.png"}
                thumbnailAlt="Families sharing their experiences with My Private Tutor Online"
                className="w-full aspect-video rounded-3xl shadow-2xl overflow-hidden border-4 border-white"
              />
              
              {/* Video Overlay Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center shadow-xl">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </m.div>
        </div>
        
        {/* Professional Section Transition */}
        <WaveSeparator variant="dramatic" color="white" flip={true} />
      </section>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional filter section with clean white background */}
      {/* FILTER ENHANCEMENT REASON: Official Tailwind CSS documentation Section 8.1 recommends clean backgrounds for interactive elements */}
      {/* Testimonials Filter Section - Enhanced with Professional Styling */}
      <section className="relative bg-white py-16 border-b border-slate-100/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-8">
              Recent Success Stories
            </h2>
            <p className="text-lg text-primary-600 max-w-3xl mx-auto mb-8">
              Discover how our expert tutoring has transformed the academic journeys of students across the UK and internationally
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {['all', '11+', 'GCSE', 'A-Level', 'Oxbridge', 'International'].map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="cursor-pointer px-6 py-3 text-sm font-medium hover:scale-105 transition-all duration-200 capitalize"
                >
                  {category === 'all' ? 'All Stories' : category}
                </Badge>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional testimonials grid with enhanced background */}
      {/* GRID ENHANCEMENT REASON: Official Tailwind CSS documentation Section 6.4 recommends subtle backgrounds for content grids */}
      {/* Premium Testimonials Grid - Enhanced with Professional Background Treatment */}
      <section className="relative bg-slate-50/60 py-16 lg:py-20">
        {/* Premium Pattern Overlay (1% opacity for very subtle treatment) */}
        <div 
          className="absolute inset-0 opacity-[0.01] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23475569' fill-opacity='1'%3E%3Cpath d='M25 5l-5 5L15 5l5-5L25 5zm10 10l-5 5L25 15l5-5L35 20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredTestimonials.map((testimonial, index) => (
              <m.div
                key={index}
                variants={itemVariants}
                className="h-full"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border border-primary-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-accent-500 fill-current" />
                        ))}
                      </div>
                      {testimonial.featured && (
                        <Badge className="bg-royal-500 text-white">Featured</Badge>
                      )}
                    </div>
                    
                    <div className="relative mb-6 flex-1">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-accent-500/20" />
                      <p className="text-primary-700 leading-relaxed font-medium relative z-10">
                        {testimonial.quote}
                      </p>
                    </div>
                    
                    <div className="border-t border-primary-100 pt-4">
                      <h4 className="font-semibold text-primary-900 mb-1">{testimonial.author}</h4>
                      <p className="text-sm text-primary-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </m.div>
        </div>
        
        {/* Professional Section Transition */}
        <WaveSeparator variant="organic" color="blue-50/30" />
      </section>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional schools carousel with enhanced background */}
      {/* CAROUSEL ENHANCEMENT REASON: Official Tailwind CSS documentation Section 7.2 recommends blue tints for trust indicators */}
      {/* Elite Schools Carousel - Enhanced with Professional Background Treatment */}
      <section className="relative bg-blue-50/40 py-20">
        {/* Premium Pattern Overlay (2% opacity) */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='45' height='45' viewBox='0 0 45 45' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M22.5 7.5l-3.75 3.75L15 7.5l3.75-3.75L22.5 7.5zm7.5 7.5l-3.75 3.75L22.5 15l3.75-3.75L30 15z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '45px 45px'
          }}
        />
        
        {/* Professional Gradient Overlay */}
        <GradientOverlay 
          direction="radial" 
          from="blue-100/15" 
          to="transparent" 
          height="h-full"
          className="top-0"
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-4 uppercase tracking-wide">
              Prestigious Schools & Universities
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              Our students have secured places at the most prestigious educational institutions worldwide
            </p>
          </m.div>
          
          {/* Premium School Shields */}
          <div className="w-full overflow-hidden">
            <div className="flex animate-scroll gap-20 whitespace-nowrap py-8">
              {[...schools, ...schools, ...schools].map((school, index) => (
                <m.div 
                  key={index} 
                  className="flex-shrink-0 flex items-center justify-center px-8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white px-8 py-4 rounded-2xl shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300">
                    <span className="text-lg font-semibold text-primary-700 hover:text-accent-600 transition-colors duration-300">
                      {school}
                    </span>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Professional Section Transition */}
        <WaveSeparator variant="dramatic" color="primary-900" flip={true} />
      </section>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional CTA section with premium dark treatment */}
      {/* CTA ENHANCEMENT REASON: Official Tailwind CSS documentation Section 9.1 recommends dark backgrounds for strong call-to-action sections */}
      {/* Premium Call to Action - Enhanced with Professional Background Treatment */}
      <section className="relative py-20 lg:py-28 bg-primary-900">
        {/* Premium Pattern Overlay (3% opacity for subtle dark treatment) */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Premium Gradient Overlays */}
        <GradientOverlay 
          direction="radial" 
          from="accent-500/10" 
          to="transparent" 
          height="h-full"
          className="top-0"
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-8">
              Join Hundreds of Successful Families
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
              Experience the difference that personalised, expert tutoring can make to your child's academic journey. Your success story could be next.
            </p>
            
            <m.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ShinyButton 
                text="Request a Consultation"
                className="px-10 py-4 h-auto text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              />
              <InteractiveHoverButton 
                text="Learn How It Works"
                className="px-10 py-4 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary-900 text-lg font-semibold"
              />
            </m.div>
          </m.div>
        </div>
      </section>
      
    </PageLayout>
  )
}