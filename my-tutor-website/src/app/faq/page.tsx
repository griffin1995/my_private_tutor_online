"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown, Mail, Phone, MessageCircle } from 'lucide-react'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { VideoText } from '@/components/magicui/video-text'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { getFAQHero, getFAQCategories, getFAQContact, getContactDetails } from '@/lib/cms/cms-content'
import { HERO_IMAGES } from '@/lib/cms/cms-images'
import { PageHeader } from '@/components/layout/page-header'
import { PageFooter } from '@/components/layout/page-footer'

// CMS DATA SOURCE: Using getFAQContent for FAQ page data

export default function FAQPage() {
  // CMS DATA SOURCE: Using getFAQHero for hero section content
  const heroContent = getFAQHero()
  // CMS DATA SOURCE: Using getFAQCategories for FAQ questions and categories  
  const faqCategories = getFAQCategories()
  // CMS DATA SOURCE: Using getFAQContact for contact CTA section
  const contactContent = getFAQContact()
  // CMS DATA SOURCE: Using getContactDetails for contact information
  const contactDetails = getContactDetails()
  
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const categoryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }
  
  return (
    <>
      <PageHeader />
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
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-8">
              {heroContent.title}
            </h1>
            <motion.p 
              className="text-2xl text-accent-400 font-semibold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {heroContent.subtitle}
            </motion.p>
            <motion.p 
              className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {heroContent.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Premium Search Section */}
      <section className="py-16 bg-gradient-to-b from-white to-primary-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* Premium FAQ Categories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {(searchQuery || selectedCategory ? filteredCategories : faqCategories)
                .filter(category => !selectedCategory || category.title === selectedCategory)
                .map((category, categoryIndex) => (
                <motion.div 
                  key={categoryIndex} 
                  className="mb-16"
                  variants={categoryVariants}
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
                </motion.div>
              ))}
            </motion.div>
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
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-8">
              {contactContent.title}
            </h2>
            <motion.p 
              className="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {contactContent.description}
            </motion.p>
            
            {/* Contact Options */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
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
            </motion.div>
          </motion.div>
        </div>
      </section>
      <PageFooter />
    </>
  )
}