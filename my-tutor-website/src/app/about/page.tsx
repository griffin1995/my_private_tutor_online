/**
 * Documentation Source: Next.js 15 App Router + Framer Motion 12
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://www.framer.com/motion/animation/
 * Reference: https://react.dev/reference/react/useState
 * 
 * Pattern: Client Component with scroll-triggered animations
 * Architecture:
 * - Client Component ("use client") for interactive animations
 * - Full motion import (not LazyMotion) for all animation features
 * - Scroll-based animation triggers with whileInView
 * - Staggered children animations using containerVariants/itemVariants
 * 
 * CMS Integration:
 * - getAboutContent() - Centralised text content management
 * - getTeamImages() - Team member images with metadata
 * - getBackgroundVideo() - Video assets for brand messaging
 * - HERO_IMAGES - Fallback hero section backgrounds
 * 
 * Design System:
 * - Premium gradient backgrounds (primary-900 → primary-800 → slate-900)
 * - Floating animation elements with pulse effects
 * - Card-based statistics with hover interactions
 * - Consistent spacing using Tailwind utilities
 * 
 * Performance Considerations:
 * - Images use Next.js Image component with fill prop
 * - Animations use viewport detection (viewport: { once: true })
 * - CSS transforms for performant animations
 */

"use client" // Required for Framer Motion animations and React hooks

// Documentation Source: React 19 imports
// Reference: https://react.dev/reference/react/hooks
import { useState } from 'react'

// Documentation Source: Framer Motion 12
// Reference: https://www.framer.com/motion/component/
// Pattern: Using 'm' alias for smaller bundle size
import { m } from 'framer-motion'

// Layout Components - Consistent page structure
import { PageLayout } from '@/components/layout/page-layout'
import { Section } from '@/components/layout/section'
import { PageHeader } from '@/components/layout/page-header'
import { PageFooter } from '@/components/layout/page-footer'

// Shadcn UI Components - WCAG 2.1 AA compliant
// Documentation Source: Radix UI + Tailwind CSS
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Lucide Icons - Consistent iconography
// Documentation Source: https://lucide.dev/
import { CheckCircle, Globe, Heart, Award, Crown, Users, BookOpen, Star, Trophy, Target, Lightbulb } from 'lucide-react'

// Next.js Image - Optimised image loading
// Documentation Source: https://nextjs.org/docs/app/api-reference/components/image
import Image from 'next/image'

// CMS Integration - Centralised content management
import { getAboutContent } from '@/lib/cms/cms-content'
import { getTeamImages, getBackgroundVideo, HERO_IMAGES } from '@/lib/cms/cms-images'

// Magic UI Components - Premium animations
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { VideoText } from '@/components/magicui/video-text'

export default function AboutPage() {
  // CMS DATA SOURCE: Using getAboutContent for all about page content
  // Pattern: Centralised content management for easy updates
  const aboutContent = getAboutContent()
  
  // CMS DATA SOURCE: Using getTeamImages for Elizabeth's photo
  // Pattern: Separate image management with metadata
  const teamImages = getTeamImages()
  const founderImage = teamImages.founder
  
  // CMS DATA SOURCE: Using getBackgroundVideo for hero background
  // Pattern: Video assets managed separately from content
  const aboutVideo = getBackgroundVideo('brandStatement')
  
  // Hero background image - using available hero image
  // Pattern: Fallback image when video not available/loading
  const heroBackgroundImage = HERO_IMAGES.childWithLaptop
  
  // Icon mapping for ethos sections
  // Pattern: Dynamic icon assignment based on content
  const ethosIcons = [Globe, Heart]

  // Documentation Source: Framer Motion Variants
  // Reference: https://www.framer.com/motion/animation/#variants
  // Pattern: Reusable animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Stagger children animations for visual hierarchy
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Start below and transparent
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" // Smooth deceleration for natural motion
      }
    }
  }

  return (
    <>
      {/* Documentation Source: Context7 Fixed Header Implementation for All Pages
       * Reference: /tailwindlabs/tailwindcss.com - Fixed positioning overlay pattern
       *
       * Fixed Header Strategy:
       * - PageHeader uses position: fixed to overlay content without affecting document flow
       * - isHeroPage prop now controls ONLY the initial transparency state (deprecated functionality)
       * - All pages benefit from fixed positioning that eliminates white space gaps above content
       * - Header automatically adjusts transparency based on scroll position (white text when transparent, dark when opaque)
       *
       * Implementation Benefits:
       * 1. No white background gaps above hero sections on any page
       * 2. Content starts at viewport top (y=0) with header overlaying
       * 3. Smooth transitions between transparent and opaque header states
       * 4. Consistent behaviour across all page types (hero, standard, about, etc.)
       * 5. Optimal user experience with proper visual hierarchy
       */}
      <PageHeader isHeroPage={true} />
      
      {/* Premium Hero Section */}
      {/* Pattern: Full-viewport hero with layered backgrounds */}
      {/* Design: Premium gradient matching brand colours */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 overflow-hidden">
        {/* Enhanced Background */}
        {/* Pattern: Layered backgrounds for depth and visual interest */}
        <div className="absolute inset-0">
          {/* Background image layer with scale transform for subtle parallax */}
          {heroBackgroundImage?.src && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-25 transform scale-105"
              style={{ backgroundImage: `url(${heroBackgroundImage.src})` }}
            />
          )}
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-slate-900/95" />
          
          {/* Floating Elements */}
          {/* Pattern: Animated orbs for premium feel */}
          {/* CSS: Using Tailwind's animate-pulse with delays */}
          <div className="absolute top-32 left-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-royal-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Documentation Source: Framer Motion initial/animate
           * Reference: https://www.framer.com/motion/animation/#initial-and-animate
           * Pattern: Entrance animation on mount
           */}
          <m.div 
            className="max-w-6xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }} // Start invisible and below
            animate={{ opacity: 1, y: 0 }}   // Animate to visible position
            transition={{ duration: 1, ease: "easeOut" }} // Smooth entrance
          >
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-8">
              {aboutContent.hero.title}
            </h1>
            <m.p 
              className="text-2xl text-accent-400 font-semibold mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {aboutContent.hero.subtitle}
            </m.p>
            <m.p 
              className="text-xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {aboutContent.hero.description}
            </m.p>
            
            {/* Hero Stats */}
            <m.div 
              className="flex flex-wrap justify-center gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">15+</div>
                <div className="text-white/80 font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">500+</div>
                <div className="text-white/80 font-medium">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">100%</div>
                <div className="text-white/80 font-medium">Oxbridge Tutors</div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Our Ethos Section */}
      {/* Pattern: Alternating content sections with gradient backgrounds */}
      {/* Design: Subtle gradient for visual flow */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-primary-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Documentation Source: Framer Motion whileInView
           * Reference: https://www.framer.com/motion/scroll-animations/#while-in-view
           * Pattern: Trigger animations when element enters viewport
           * Performance: viewport={{ once: true }} prevents re-animation
           */}
          <m.div 
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }} // Animate only on first view
          >
            <m.div 
              className="text-center mb-16"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border border-primary-100">
                  <Award className="w-6 h-6 text-accent-600" />
                  <span className="font-semibold text-primary-900">15+ Years Excellence</span>
                </div>
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border border-primary-100">
                  <Crown className="w-6 h-6 text-accent-600" />
                  <span className="font-semibold text-primary-900">Royal Endorsement</span>
                </div>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-6">
                {aboutContent.ourEthos.title}
              </h2>
              <p className="text-2xl font-semibold text-accent-600 mb-8">
                {aboutContent.ourEthos.subtitle}
              </p>
              <p className="text-xl text-primary-700 leading-relaxed max-w-4xl mx-auto">
                {aboutContent.ourEthos.description}
              </p>
            </m.div>

            <m.div 
              className="max-w-5xl mx-auto text-center space-y-8 mb-20"
              variants={itemVariants}
            >
              <p className="text-xl text-primary-700 leading-relaxed">
                {aboutContent.ourEthos.mainContent.introduction}
              </p>
              <p className="text-xl text-primary-700 leading-relaxed font-medium bg-accent-50 p-8 rounded-2xl border-l-4 border-accent-500">
                {aboutContent.ourEthos.mainContent.philosophy}
              </p>
            </m.div>

            {/* Premium Core Values */}
            <m.div 
              className="space-y-20"
              variants={containerVariants}
            >
              {aboutContent.ourEthos.sections.map((section, index) => {
                const Icon = ethosIcons[index]
                return (
                  <m.div 
                    key={index} 
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                    variants={itemVariants}
                  >
                    <div className="lg:col-span-2 flex justify-center lg:justify-start">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-xl">
                          <Icon className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-900 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-10 space-y-6">
                      <h3 className="text-3xl font-serif font-bold text-primary-900">
                        {section.title}
                      </h3>
                      <div className="space-y-4">
                        {section.content.map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-lg text-primary-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </m.div>
                )
              })}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Premium Results Section */}
      {/* Pattern: Statistics display with cards */}
      {/* Design: Inverted gradient for visual flow */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <h3 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-8">
                {aboutContent.ourEthos.results.title}
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-accent-600 mx-auto mb-8"></div>
            </div>
            
            <m.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {aboutContent.ourEthos.results.statistics.map((stat, index) => (
                <m.div key={index} variants={itemVariants}>
                  {/* Documentation Source: Tailwind CSS Group Hover
                   * Reference: https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state
                   * Pattern: Parent hover triggers child animations
                   */}
                  <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border border-primary-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent-500/10 to-transparent rounded-bl-3xl" />
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-3xl font-bold text-primary-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                        {stat.metric}
                      </h4>
                      <p className="text-lg text-primary-700 leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </Card>
                </m.div>
              ))}
            </m.div>

            <m.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-2xl text-primary-700 font-serif leading-relaxed max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-primary-100">
                {aboutContent.ourEthos.conclusion}
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Premium Founder Story Section */}
      {/* Pattern: Dark section for contrast and emphasis */}
      {/* Design: Premium gradient matching hero section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-royal-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <m.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-8">
                Meet Our Founder
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-accent-500 mx-auto"></div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-16 border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-4">
                  {founderImage?.src && (
                    <m.div 
                      className="relative"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-3xl overflow-hidden shadow-2xl">
                        {/* Documentation Source: Next.js Image Component
                         * Reference: https://nextjs.org/docs/app/api-reference/components/image
                         * Pattern: Responsive image with aspect ratio preservation
                         */}
                        <Image
                          src={founderImage.src}
                          alt={founderImage.alt || 'Elizabeth Burrows, Founder'}
                          fill // Fills parent container
                          className="object-cover" // Maintains aspect ratio
                        />
                        {/* Decorative overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary-900/20"></div>
                      </div>
                      {/* Floating badge */}
                      <div className="absolute -bottom-4 -right-4 bg-accent-500 text-white px-6 py-3 rounded-2xl shadow-xl">
                        <div className="flex items-center gap-2">
                          <Crown className="w-5 h-5" />
                          <span className="font-semibold">15+ Years</span>
                        </div>
                      </div>
                    </m.div>
                  )}
                </div>
                <div className="lg:col-span-8">
                  <m.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-3xl font-serif font-bold text-primary-900">
                          Elizabeth Burrows
                        </h3>
                        <div className="flex items-center gap-2 bg-accent-100 px-4 py-2 rounded-full">
                          <Star className="w-4 h-4 text-accent-600" />
                          <span className="text-sm font-semibold text-accent-700">Founder & Director</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">Oxford Graduate</span>
                        <span className="bg-royal-100 text-royal-800 px-3 py-1 rounded-full text-sm font-medium">Royal Family Endorsed</span>
                        <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">Tatler Featured</span>
                      </div>
                    </div>
                    
                    <blockquote className="relative">
                      <div className="absolute -top-4 -left-4 text-6xl text-accent-200 font-serif">"</div>
                      <p className="text-2xl text-primary-700 italic leading-relaxed mb-8 pl-8">
                        Education should be transformative, not transactional. That's why we focus on building lasting relationships and delivering genuinely personalised support.
                      </p>
                      <div className="absolute -bottom-4 -right-4 text-6xl text-accent-200 font-serif">"</div>
                    </blockquote>
                    
                    <div className="pt-8 border-t border-primary-200">
                      <p className="text-lg text-primary-600 leading-relaxed">
                        With over 15 years of experience tutoring students from the royal family to families across the UK, Elizabeth has built My Private Tutor Online into the premier tutoring service for discerning families seeking excellence.
                      </p>
                    </div>
                  </m.div>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Premium CTA Section */}
      {/* Pattern: Call-to-action with multiple options */}
      {/* Design: Light gradient for approachability */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <m.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold text-primary-900 mb-8">
                Ready to Begin Your Journey?
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-accent-500 to-accent-600 mx-auto mb-8"></div>
              <p className="text-2xl text-primary-700 leading-relaxed max-w-3xl mx-auto">
                Join hundreds of families who have discovered the difference personalised tutoring can make.
              </p>
            </div>
            
            <m.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* CTA Buttons */}
              {/* Pattern: Primary and secondary action buttons */}
              {/* Component: Magic UI components for premium interactions */}
              <ShinyButton 
                text="Start Your Journey"
                className="px-10 py-4 h-auto text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              />
              <InteractiveHoverButton 
                text="Learn How We Work"
                className="px-10 py-4 border-2 border-primary-700 bg-transparent text-primary-700 hover:bg-primary-700 hover:text-white text-lg font-semibold"
              />
            </m.div>
            
            {/* Trust indicators */}
            <m.div 
              className="flex flex-wrap justify-center gap-8 text-primary-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-accent-600" />
                <span className="font-medium">Royal Family Endorsed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent-600" />
                <span className="font-medium">Tatler Address Book</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent-600" />
                <span className="font-medium">15+ Years Excellence</span>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>
      <PageFooter />
    </>
  )
}