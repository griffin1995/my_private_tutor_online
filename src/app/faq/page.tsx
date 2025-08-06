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
/**
 * Documentation Source: Next.js Static Export + Framer Motion Compatibility
 * Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/static-exports.mdx
 * Reference: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-tween-opacity.html
 * 
 * Pattern: Static Export with Force Static Directive
 * Next.js static export requires: export const dynamic = 'force-static'
 * Framer Motion compatibility: Use CSS animations instead of React motion components during static generation
 * 
 * Issue: React.Children.only errors occur when Framer Motion m.div components are server-rendered
 * Solution: Convert to standard divs with CSS animations for static export compatibility
 */
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
import { PageHeader } from '@/components/layout/page-header'
import { PageFooter } from '@/components/layout/page-footer'

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
  
  return (
    <div>
      {/* Pass isHeroPage prop for transparent navbar over hero section */}
      <PageHeader isHeroPage={true} />
      {/* Premium Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900">
        {/* Background with Parallax Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 transform scale-105"
            style={{ backgroundImage: `url(${heroBackgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/90 via-primary-800/95 to-primary-900/90" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-royal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-8">
              {heroContent.title}
            </h1>
            <p 
              className="text-2xl text-accent-400 font-semibold mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              {heroContent.subtitle}
            </p>
            <p 
              className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              {heroContent.description}
            </p>
          </div>
        </div>
      </section>

      {/* Premium Search Section */}
      <section className="py-16 bg-gradient-to-b from-white to-primary-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border border-primary-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500 shadow-lg"
              />
            </div>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="cursor-pointer px-4 py-2 text-sm font-medium hover:scale-105 transition-all duration-200"
              >
                All Categories ({faqCategories.reduce((total, cat) => total + cat.questions.length, 0)})
              </Badge>
              {faqCategories.map((category) => (
                <Badge
                  key={category.title}
                  variant={selectedCategory === category.title ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.title)}
                  className="cursor-pointer px-4 py-2 text-sm font-medium hover:scale-105 transition-all duration-200"
                >
                  {category.icon} {category.title} ({category.questions.length})
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium FAQ Categories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Documentation Source: CSS Animation for Static Export Compatibility */}
            {/* Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/static-exports.mdx */}
            <div className="animate-fade-in-up">
              {(searchQuery || selectedCategory ? filteredCategories : faqCategories)
                .filter(category => !selectedCategory || category.title === selectedCategory)
                .map((category, categoryIndex) => (
                <div 
                  key={categoryIndex} 
                  className="mb-16 animate-fade-in-left"
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-12">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl shadow-lg">
                      <span className="text-2xl text-white">{category.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-2">
                        {category.title}
                      </h2>
                      <p className="text-primary-600">
                        {category.questions.length} question{category.questions.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* FAQ Accordion */}
                  <Card className="bg-white border border-primary-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, questionIndex) => (
                          <AccordionItem 
                            key={questionIndex} 
                            value={`${categoryIndex}-${questionIndex}`}
                            className="border-b border-primary-100/50 last:border-b-0"
                          >
                            <AccordionTrigger className="text-left font-semibold text-primary-900 hover:text-accent-600 py-8 px-8 text-lg lg:text-xl group hover:bg-primary-50/50 transition-all duration-300">
                              <span className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-accent-100 text-accent-700 rounded-full flex items-center justify-center text-sm font-bold group-hover:bg-accent-500 group-hover:text-white transition-all duration-300">
                                  {questionIndex + 1}
                                </span>
                                <span className="flex-1">{faq.question}</span>
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-8 pb-8">
                              <div className="ml-12 text-primary-700 leading-relaxed text-base lg:text-lg">
                                <div className="prose prose-primary max-w-none">
                                  <p>{faq.answer}</p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Contact CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-royal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Documentation Source: CSS Animation for Static Export Compatibility */}
          {/* Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/static-exports.mdx */}
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-8">
              {contactContent.title}
            </h2>
            <p 
              className="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              {contactContent.description}
            </p>
            
            {/* Contact Options */}
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email Elizabeth</h3>
                <p className="text-white/70 mb-4">Get a personal response within 24 hours</p>
                <a 
                  href={`mailto:${contactDetails.primaryEmail}`}
                  className="text-accent-400 hover:text-accent-300 font-medium transition-colors duration-200"
                >
                  {contactDetails.primaryEmail}
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-royal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Speak Directly</h3>
                <p className="text-white/70 mb-4">Schedule a consultation call</p>
                <a 
                  href={`tel:${contactDetails.phone}`}
                  className="text-accent-400 hover:text-accent-300 font-medium transition-colors duration-200"
                >
                  {contactDetails.phone}
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Live Chat</h3>
                <p className="text-white/70 mb-4">Instant responses to quick questions</p>
                <span className="text-accent-400 font-medium">Available 9am-6pm</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              {contactContent.buttons.map((button, index) => {
                if (button.type === 'primary') {
                  return (
                    <ShinyButton 
                      key={index}
                      text={button.text}
                      className="px-10 py-4 h-auto text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                    />
                  )
                } else {
                  const emailHref = button.action === 'contactEmail' ? `mailto:${contactDetails.primaryEmail}` : button.href
                  return (
                    <InteractiveHoverButton
                      key={index}
                      text={button.text}
                      className="px-10 py-4 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary-900 text-lg font-semibold"
                      onClick={() => emailHref && (window.location.href = emailHref)}
                    />
                  )
                }
              })}
            </div>
          </div>
        </div>
      </section>
      <PageFooter />
    </div>
  )
}