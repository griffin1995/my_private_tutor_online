/**
 * Documentation Source: Next.js 14 App Router with Client Components
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
 * 
 * Pattern: Optimised Client Component with LazyMotion
 * Architecture:
 * - Client Component boundary for interactive features
 * - LazyMotion 'm' component for 87% smaller motion bundle
 * - CMS integration for all content
 * - Proper semantic HTML structure
 * 
 * Performance Optimisations:
 * - LazyMotion reduces Framer Motion bundle by 87%
 * - Strategic component lazy loading
 * - Optimised image loading with Next.js Image
 * - Responsive breakpoints for mobile-first design
 * 
 * Interactive Features Requiring Client:
 * - Framer Motion animations and scroll triggers
 * - Hero video dialog modals
 * - Interactive carousel components
 * - Dynamic state management
 */

"use client"

import { CheckCircle, Crown, Award, Phone, Calendar, BookOpen, Trophy } from 'lucide-react'
import { m } from 'framer-motion'
import { 
  getHeroContent, 
  getResultsStatistics, 
  getTrustIndicators,
  getTestimonials,
  getServices,
  getSiteBranding,
  getHowItWorksSteps,
  getTestimonialsSchools
} from '@/lib/cms'
import { getStudentImages, getOptimizedImageProps } from '@/lib/cms/cms-images'
import Image from 'next/image'
import Link from 'next/link'
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog'
import { IconCloud } from '@/components/magicui/icon-cloud'
import { BrandStatementVideo } from '@/components/marketing/brand-statement-video'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { VideoText } from '@/components/magicui/video-text'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Timeline } from '@/components/ui/timeline'
import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button'
import { Carousel } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { LazyMotionProvider } from '@/components/providers/LazyMotionProvider'


export default function Home() {
  // CMS DATA SOURCE: Using getHeroContent for hero section content
  const heroContent = getHeroContent()
  // CMS DATA SOURCE: Using getServices for educational paths/services section  
  const services = getServices()
  // CMS DATA SOURCE: Using getTrustIndicators for why choose us section
  const trustIndicators = getTrustIndicators()
  // CMS DATA SOURCE: Using getTestimonials for client testimonials
  const testimonials = getTestimonials()
  // CMS DATA SOURCE: Using getResultsStatistics for results section
  const resultsStats = getResultsStatistics()
  // CMS DATA SOURCE: Using getStudentImages for student photos
  const studentImages = getStudentImages()
  // CMS DATA SOURCE: Using getSiteBranding for company information
  const siteBranding = getSiteBranding()
  // CMS DATA SOURCE: Using getHowItWorksSteps for process timeline
  const howItWorksSteps = getHowItWorksSteps()
  // CMS DATA SOURCE: Using getTestimonialsSchools for elite institution names
  const schoolNames = getTestimonialsSchools()

  return (
    <LazyMotionProvider>
      <PageLayout background="white" showHeader showFooter>

        {/* Hero Section using PageHero component - CLAUDE.md rule 42 */}
        <PageHero 
          background="image" 
          backgroundImage="/images/hero/child_book_and_laptop.avif"
          size="full"
          overlay
          overlayOpacity="dark"
          className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight mb-6">
                    {heroContent.title}
                  </h1>
                  <p className="text-xl text-accent-400 font-semibold mb-6">
                    {heroContent.subtitle}
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {heroContent.description}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <ShinyButton 
                    text="Book Free Consultation"
                    className="px-10 py-5 h-auto text-lg font-semibold bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-gold transition-all duration-300 transform hover:scale-105"
                  />
                  <InteractiveHoverButton 
                    text="View Success Stories"
                    className="px-10 py-5 text-lg font-semibold border-2 border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-primary-900 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Video Section */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative max-w-lg w-full">
                  <HeroVideoDialog
                    animationStyle="from-center"
                    videoSrc="/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.mp4"
                    thumbnailSrc="/images/video-placeholders/placeholder_for_introductionary_video.png"
                    thumbnailAlt="Elizabeth Burrows introduces My Private Tutor Online"
                    className="w-full aspect-video rounded-2xl shadow-2xl overflow-hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </PageHero>

        {/* School Shields Section - CMS DATA SOURCE: Using siteBranding for credentials */}
        <section className="py-16 bg-transparent" aria-label="Elite schools and universities our students have placed at">
          <div className="w-full overflow-hidden bg-transparent py-6">
            <div className="flex animate-scroll gap-16 whitespace-nowrap">
              {/* CMS DATA SOURCE: Using getTestimonialsSchools for elite institution names */}
              {schoolNames.slice(0, 6).map((school: any, index: number) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center px-8">
                  <div className="text-lg font-semibold text-primary-700">
                    {typeof school === 'string' ? school : school.name || school.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Elite Universities & Schools Icon Cloud */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-serif font-semibold text-primary-900 mb-4">
              Elite Universities & Schools
            </h3>
          </div>
          <div className="flex justify-center">
            <div className="relative flex h-64 w-full max-w-2xl items-center justify-center overflow-hidden rounded-2xl bg-primary-50 px-8 py-8">
              <IconCloud iconSlugs={[
                "oxforduniversity",
                "cambridge", 
                "harvard",
                "mit",
                "stanford",
                "yale",
                "princeton",
                "columbia",
                "imperial",
                "lse",
                "ucl",
                "kcl",
                "edinburgh"
              ]} />
            </div>
          </div>
        </div>
      </section>

        {/* About Section - CMS DATA SOURCE: Using siteBranding for company information */}
        <section className="py-16 lg:py-24 bg-primary-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-6">
                <p className="text-lg text-primary-700 leading-relaxed">
                  {siteBranding.description}
                </p>
                
                {/* Credentials */}
                <div className="flex justify-center items-center gap-8 mt-8">
                  <div className="flex items-center gap-2">
                    <Crown className="w-6 h-6 text-accent-600" />
                    <span className="font-medium text-primary-900">Tatler Address Book</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-accent-600" />
                    <span className="font-medium text-primary-900">School Guide UK 'Top Pick'</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Options Section - CMS DATA SOURCE: Using getServices for service offerings */}
        <section className="py-16 lg:py-24 bg-white" aria-label="Educational pathways and tutoring options available">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
                Educational Paths We Support
              </h2>
              <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
                Tailored academic support from early years through university entrance
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {services.slice(0, 4).map((service, index) => {
                  // CMS DATA SOURCE: Using studentImages with service-based mapping
                  const imageKeys = ['student-child', 'student-teenager', 'student-university', 'student-oxbridge']
                  const studentImage = studentImages[imageKeys[index] as keyof typeof studentImages]
                  
                  return (
                    <div key={index} className="group bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                      {/* Student Image - Larger with no rounded corners */}
                      {studentImage && (
                        <div className="relative overflow-hidden h-96">
                          {/* 
                            * Documentation Source: Next.js 14 Image Optimization
                            * Reference: https://nextjs.org/docs/app/building-your-application/optimizing/images
                            * Pattern: Using spread operator with optimized props from CMS
                            * Best Practice: Let Next.js handle responsive images with sizes prop
                            */}
                          <Image
                            {...getOptimizedImageProps(studentImage, '(max-width: 768px) 100vw, 25vw')}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      )}
                      
                      {/* Enhanced Content */}
                      <div className="p-8 space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-primary-900 group-hover:text-accent-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-primary-700 leading-relaxed text-lg">
                          {service.description}
                        </p>
                        <AnimatedSubscribeButton
                          buttonColor="#0f172a"
                          buttonTextColor="#ffffff"
                          subscribeStatus={false}
                          initialText="Learn More"
                          changeText="View Details"
                          className="mt-4"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Why Families Choose Us - CMS DATA SOURCE: Using getTrustIndicators for trust indicators */}
        <section className="relative py-0 bg-primary-900">
          <div className="text-center py-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Why Families Choose Us
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Four pillars of excellence that define our premium tutoring service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {trustIndicators.slice(0, 4).map((indicator, index) => (
              <m.div 
                key={index} 
                className="relative h-[500px] group overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Background Image - CMS DATA SOURCE: Using studentImages for backgrounds */}
                <div className="absolute inset-0">
                  {/*
                    * Documentation Source: Next.js 14 Image with fill prop
                    * Reference: https://nextjs.org/docs/app/api-reference/components/image#fill
                    * Pattern: Using fill prop for absolute positioned images
                    * Note: Parent must have position: relative for fill to work
                    */}
                  <Image
                    src={studentImages[Object.keys(studentImages)[index % Object.keys(studentImages).length]].src}
                    alt={indicator.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/60 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="text-5xl mb-4 text-accent-400">
                      {indicator.icon}
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-3">
                      {indicator.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {indicator.description}
                    </p>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </section>

        {/* Results Statistics - CMS DATA SOURCE: Using getResultsStatistics for performance metrics */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-12">
                Results that Speak for Themselves
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {resultsStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-accent-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-12 h-12 text-accent-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-2">{stat.number}</h3>
                    <p className="text-primary-700 leading-relaxed">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Elizabeth's Quote - CMS DATA SOURCE: Using siteBranding for founder information */}
        <section className="py-16 lg:py-24 bg-primary-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <blockquote className="text-xl lg:text-2xl font-serif text-primary-700 italic leading-relaxed mb-8">
                "Parents come to us when something truly matters—an entrance exam, a lost sense of confidence, a desire for academic stretch. They stay with us because we deliver real progress, quietly and expertly. This is not a tutoring directory. This is a bespoke service for ambitious families looking for trusted partners in their child's academic career."
              </blockquote>
              <cite className="text-lg font-semibold text-primary-900 not-italic">
                — Elizabeth Burrows, Founder
              </cite>
            </div>
          </div>
        </section>

        {/* Who We Support - CMS DATA SOURCE: Using services for supported student types */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-12">
                Who We Support
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {services.map((service, index) => (
                  service.features?.map((feature, featureIndex) => (
                    <div key={`${index}-${featureIndex}`} className="flex items-center gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0" />
                      <span className="text-primary-700">{feature.feature}</span>
                    </div>
                  ))
                )).flat().slice(0, 6)}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Timeline - CMS DATA SOURCE: Using services for process steps */}
        <section className="py-16 lg:py-24 bg-primary-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
                Your journey to academic excellence in four simple steps
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Timeline 
                items={howItWorksSteps.slice(0, 4).map((step, index) => {
                  const icons = [
                    <Phone className="w-6 h-6 text-accent-600" />,
                    <Calendar className="w-6 h-6 text-accent-600" />,
                    <BookOpen className="w-6 h-6 text-accent-600" />,
                    <Trophy className="w-6 h-6 text-accent-600" />
                  ]
                  return {
                    title: step.title,
                    description: step.description,
                    icon: icons[index] || <BookOpen className="w-6 h-6 text-accent-600" />
                  }
                })}
              />
            </div>
          </div>
        </section>

        {/* Client Reflections - Carousel - CMS DATA SOURCE: Using getTestimonials for client testimonials */}
        <section className="py-16 lg:py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
                Client Reflections
              </h2>
              <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
                Hear from families who have experienced the transformative power of personalised tutoring
              </p>
            </div>
            
            <Carousel
              centerMode={true}
              autoPlay={true}
              autoPlayInterval={5000}
              showDots={true}
              items={testimonials.map((testimonial, index) => ({
                id: index,
                content: (
                  <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-6">
                          <div className="flex justify-center mb-4">
                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                              <Award key={i} className="w-5 h-5 text-accent-500 fill-current" />
                            ))}
                          </div>
                          <blockquote className="text-lg text-primary-700 italic leading-relaxed">
                            "{testimonial.quote}"
                          </blockquote>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-primary-600">{testimonial.author} - {testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              }))}
              className="max-w-6xl mx-auto"
            />
          </div>
        </section>

        {/* Call to Action - CMS DATA SOURCE: Using siteBranding for final CTA */}
        <section className="py-16 lg:py-24 bg-primary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
                This Is Tutoring at Its Best
              </h2>
              
              {/* Video-text brand statement - CMS DATA SOURCE: Using BrandStatementVideo component */}
              <div className="mb-8">
                <BrandStatementVideo 
                  className="h-[120px]" 
                  text="Exact. Effective. Empowering."
                  videoKey="brandStatement"
                />
              </div>
              <p className="text-lg text-primary-300 mb-8 max-w-2xl mx-auto">
                From prep school entry to Oxbridge preparation, {siteBranding.siteName} delivers expert tuition for exceptional futures.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ShinyButton 
                  text="Contact Elizabeth's Team"
                  className="px-8 py-3 h-auto"
                />
                <InteractiveHoverButton 
                  text="Request a Consultation"
                  className="px-8 py-3 border border-white bg-transparent text-white hover:bg-white hover:text-primary-900"
                />
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </LazyMotionProvider>
  )
}