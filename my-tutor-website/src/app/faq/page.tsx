"use client"

import { ShinyButton } from '@/components/magicui/shiny-button'
import { VideoText } from '@/components/magicui/video-text'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { getFAQContent, getFAQHero, getFAQCategories, getFAQContact, getContactDetails } from '@/lib/cms/cms-content'
import { HERO_IMAGES } from '@/lib/cms/cms-images'

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
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${heroBackgroundImage})` }}></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <VideoText 
              text={heroContent.title}
              duration={2500}
              framerProps={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    staggerChildren: 0.05,
                    duration: 0.8
                  }
                },
              }}
              className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6"
            />
            <p className="text-xl text-accent-400 font-semibold mb-6">
              {heroContent.subtitle}
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              {heroContent.description}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary-900">
                    {category.title}
                  </h2>
                </div>

                <Card className="bg-white border border-primary-100 rounded-none">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, questionIndex) => (
                      <AccordionItem 
                        key={questionIndex} 
                        value={`${categoryIndex}-${questionIndex}`}
                        className="border-b border-primary-100 last:border-b-0"
                      >
                        <AccordionTrigger className="text-left font-semibold text-primary-900 hover:text-accent-600 py-8 px-8 text-lg">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-primary-700 leading-relaxed px-8 pb-8 text-base">
                          <p>{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6">
              {contactContent.title}
            </h2>
            <p className="text-lg text-primary-600 mb-8 leading-relaxed">
              {contactContent.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {contactContent.buttons.map((button, index) => {
                if (button.type === 'primary') {
                  return (
                    <ShinyButton 
                      key={index}
                      text={button.text}
                      className="px-8 py-3 h-auto"
                    />
                  )
                } else {
                  const emailHref = button.action === 'contactEmail' ? `mailto:${contactDetails.primaryEmail}` : button.href
                  return (
                    <a 
                      key={index}
                      href={emailHref}
                      className="px-8 py-3 border-2 border-primary-900 bg-transparent text-primary-900 hover:bg-primary-900 hover:text-white transition-colors duration-300 rounded-md font-medium"
                    >
                      {button.text}
                    </a>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}