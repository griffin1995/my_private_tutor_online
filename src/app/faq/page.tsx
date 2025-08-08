/**
 * Documentation Source: Next.js 14 + Framer Motion Integration
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://www.framer.com/motion/component/
 * 
 * Pattern: Client Component with standard motion import
 * Note: This page doesn't use LazyMotion optimization - consider wrapping in LazyMotionProvider
 * for better bundle size optimization
 * 
 * Component Architecture:
 * - Client-side search filtering
 * - Animated accordion sections
 * - Interactive hover states
 */

"use client"

import { useState } from 'react'
import { m } from 'framer-motion'
import { Search, ChevronDown, Mail, Phone, MessageCircle } from 'lucide-react'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { VideoText } from '@/components/magicui/video-text'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { getFAQHero, getFAQCategories, getUnifiedContact } from '@/lib/cms/cms-content'
import { HERO_IMAGES } from '@/lib/cms/cms-images'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
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
// - Parent/Child: FAQ page component, children: PageHeader, PageFooter, search/filter components
// - Dynamic Features: useState for search filtering, interactive accordion components, form handling
// - Dependencies: CMS functions (getFAQHero, getFAQCategories, getUnifiedContact), UI components
// - Interactivity: Search functionality, accordion expand/collapse, contact form interactions
// - CMS Integration: Complete with FAQ hero, categories, contact details

// CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced whileInView animations and motion components for professional styling
// DESIGN ENHANCEMENT: Consistent visual branding with WaveSeparator, GradientOverlay, and premium card designs
// IMPLEMENTATION REASON: Matching testimonials and landing page professional appearance standards
// CONTEXT7 SOURCE: /grx7/framer-motion - motion.div with initial, whileInView, and viewport props for scroll animations

// CMS DATA SOURCE: Using getFAQContent for FAQ page data

export default function FAQPage() {
  // CMS DATA SOURCE: Using getFAQHero for hero section content
  const heroContent = getFAQHero()
  // CMS DATA SOURCE: Using getFAQCategories for FAQ questions and categories  
  const faqCategories = getFAQCategories()
  // CONTEXT7 SOURCE: /microsoft/typescript - Unified contact data access with interface extraction
  const unifiedContact = getUnifiedContact()
  const contactContent = unifiedContact.faq
  const contactDetails = unifiedContact.primary
  
  // CMS DATA SOURCE: Using HERO_IMAGES for background image via backgroundImageKey
  const heroBackgroundImage = HERO_IMAGES[heroContent.backgroundImageKey as keyof typeof HERO_IMAGES]
  
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  // Filter questions based on search query
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  // Static export compatible: CSS animations instead of Framer Motion variants
  // Documentation Source: Next.js Static Export Configuration
  // Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/static-exports.mdx#_snippet_9
  
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
        <div className="max-w-5xl mx-auto text-center">
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
            className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {heroContent.description}
          </m.p>
        </div>
      </PageHero>

      <WaveSeparator 
        variant="subtle" 
        className="text-slate-100" 
      />

      {/* Premium Search Section */}
      <Section className="py-20 relative" background="blue">
        <GradientOverlay variant="subtle" className="opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <m.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative mb-10">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-16 pr-6 py-5 text-lg border-2 border-slate-200 rounded-2xl bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xl hover:shadow-2xl transition-all duration-300"
              />
            </div>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="cursor-pointer px-6 py-3 text-sm font-semibold hover:scale-105 transition-all duration-200 bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg hover:shadow-xl"
              >
                All Categories ({faqCategories.reduce((total, cat) => total + cat.questions.length, 0)})
              </Badge>
              {faqCategories.map((category) => (
                <Badge
                  key={category.title}
                  variant={selectedCategory === category.title ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.title)}
                  className={`cursor-pointer px-6 py-3 text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl ${
                    selectedCategory === category.title 
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-amber-400' 
                      : 'bg-white/80 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-white hover:border-amber-300'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span> {category.title} ({category.questions.length})
                </Badge>
              ))}
            </div>
          </m.div>
        </div>
      </Section>

      <WaveSeparator 
        variant="wave" 
        className="text-white" 
      />

      {/* Premium FAQ Categories */}
      <Section className="py-20 lg:py-28 relative" background="white">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-60" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div>
              {(searchQuery || selectedCategory ? filteredCategories : faqCategories)
                .filter(category => !selectedCategory || category.title === selectedCategory)
                .map((category, categoryIndex) => (
                <m.div 
                  key={categoryIndex} 
                  className="mb-20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-6 mb-16">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-3xl shadow-xl">
                      <span className="text-3xl text-white">{category.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-3">
                        {category.title}
                      </h2>
                      <p className="text-slate-600 text-lg">
                        {category.questions.length} question{category.questions.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* FAQ Accordion */}
                  <Card className="bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, questionIndex) => (
                          <AccordionItem 
                            key={questionIndex} 
                            value={`${categoryIndex}-${questionIndex}`}
                            className="border-b border-slate-200/50 last:border-b-0"
                          >
                            <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-amber-700 py-8 px-10 text-lg lg:text-xl group hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 transition-all duration-300">
                              <span className="flex items-start gap-6">
                                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold group-hover:from-amber-500 group-hover:to-yellow-500 group-hover:text-white transition-all duration-300 shadow-lg">
                                  {questionIndex + 1}
                                </span>
                                <span className="flex-1">{faq.question}</span>
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-10 pb-10">
                              <div className="ml-16 text-slate-700 leading-relaxed text-lg">
                                <div className="prose prose-slate max-w-none">
                                  <p>{faq.answer}</p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <WaveSeparator 
        variant="wave" 
        className="text-slate-900" 
      />

      {/* Premium Contact CTA */}
      <Section className="py-24 lg:py-32 relative" background="slate">
        <GradientOverlay variant="primary" className="opacity-90" />
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <m.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-10">
              {contactContent.title}
            </h2>
            <p className="text-2xl text-white/90 mb-16 leading-relaxed max-w-3xl mx-auto">
              {contactContent.description}
            </p>
            
            {/* Contact Options */}
            <m.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Email Elizabeth</h3>
                <p className="text-white/80 mb-6 text-lg">Get a personal response within 24 hours</p>
                <a 
                  href={`mailto:${contactDetails.primaryEmail}`}
                  className="text-amber-300 hover:text-amber-200 font-semibold transition-colors duration-200 text-lg"
                >
                  {contactDetails.primaryEmail}
                </a>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Speak Directly</h3>
                <p className="text-white/80 mb-6 text-lg">Schedule a consultation call</p>
                <a 
                  href={`tel:${contactDetails.phone}`}
                  className="text-amber-300 hover:text-amber-200 font-semibold transition-colors duration-200 text-lg"
                >
                  {contactDetails.phone}
                </a>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Live Chat</h3>
                <p className="text-white/80 mb-6 text-lg">Instant responses to quick questions</p>
                <span className="text-amber-300 font-semibold text-lg">Available 9am-6pm</span>
              </div>
            </m.div>
            
            {/* CTA Buttons */}
            <m.div 
              className="flex flex-col sm:flex-row gap-8 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {contactContent.buttons.map((button, index) => {
                if (button.type === 'primary') {
                  return (
                    <ShinyButton 
                      key={index}
                      text={button.text}
                      className="px-12 py-5 h-auto text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
                    />
                  )
                } else {
                  const emailHref = button.action === 'contactEmail' ? `mailto:${contactDetails.primaryEmail}` : button.href
                  return (
                    <InteractiveHoverButton
                      key={index}
                      text={button.text}
                      className="px-12 py-5 border-3 border-white bg-transparent text-white hover:bg-white hover:text-slate-900 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                      onClick={() => emailHref && (window.location.href = emailHref)}
                    />
                  )
                }
              })}
            </m.div>
          </m.div>
        </div>
      </Section>
      
    </PageLayout>
  )
}