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
import { PageHeader } from '@/components/layout/page-header'
import { PageFooter } from '@/components/layout/page-footer'

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
  const testimonialsVideo = getBackgroundVideo('testimonialsVideo')
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      <PageHeader />
      {/* Premium Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 transform scale-105"
            style={{ backgroundImage: `url(${heroBackgroundImage.src})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-slate-900/95" />
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-royal-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/5 rounded-full blur-2xl animate-pulse delay-500" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div 
            className="max-w-6xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-8">
              {heroContent.title}
            </h1>
            <m.p 
              className="text-2xl text-accent-400 font-semibold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {heroContent.subtitle}
            </m.p>
            <m.p 
              className="text-xl text-white/90 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {heroContent.description}
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Premium Introduction Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-primary-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>

      {/* Premium Video Section */}
      <section className="py-20 lg:py-28 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-8">
              {testimonialsContent.video.title}
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
                thumbnailSrc={testimonialsVideo?.thumbnail || "/images/video-placeholders/testimonials-video-placeholder.png"}
                thumbnailAlt={testimonialsContent.video.description}
                className="w-full aspect-video rounded-3xl shadow-2xl overflow-hidden border-4 border-white"
              />
              
              {/* Video Overlay Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center shadow-xl">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Testimonials Filter Section */}
      <section className="py-16 bg-white">
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

      {/* Premium Testimonials Grid */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-primary-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>

      {/* Elite Schools Carousel */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-4 uppercase tracking-wide">
              {testimonialsContent.schoolsTitle}
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
      </section>

      {/* Premium Call to Action */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-royal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
      <PageFooter />
    </>
  )
}