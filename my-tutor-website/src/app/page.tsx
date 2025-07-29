"use client"

import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { getHeroContent, getSiteBranding } from '@/lib/cms'

export default function Home() {
  const heroContent = getHeroContent()
  const siteBranding = getSiteBranding()

  return (
    <PageLayout background="white" showHeader showFooter containerSize="full" verticalSpacing="none" headerProps={{ isHeroPage: true }}>
      {/* Hero Section */}
      <PageHero 
        background="video" 
        backgroundVideo="/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.mp4"
        size="full"
        overlay
        overlayOpacity="medium"
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                {heroContent.title}
              </h1>
              <p className="text-2xl lg:text-3xl text-accent-300 font-semibold drop-shadow-md">
                {heroContent.subtitle}
              </p>
              <p className="text-xl lg:text-2xl text-white/95 leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
                {heroContent.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <ShinyButton 
                text="Book Free Consultation"
                className="px-12 py-6 h-auto text-xl font-bold bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-lg"
              />
              <InteractiveHoverButton 
                text="Watch Introduction"
                className="px-12 py-6 text-xl font-bold border-3 border-white/90 bg-white/15 backdrop-blur-md text-white hover:bg-white hover:text-primary-900 transition-all duration-300 rounded-lg shadow-xl hover:shadow-2xl"
              />
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6">
              Expert Private Tutoring, Personally Curated by Elizabeth Burrows
            </h2>
            <h3 className="text-xl font-medium text-accent-600 mb-8">
              Founded on trust. Built on results. Delivered by experts.
            </h3>
            <p className="text-lg text-primary-700 leading-relaxed mb-8">
              At the heart of My Private Tutor Online is a singular vision: academic support that is both exceptional and deeply personal. Founded in 2010 by Elizabeth Burrows—a Cambridge-accepted educator and former Forbes journalist—the company began not as a business, but as a trusted network of elite colleagues she met throughout her international tutoring career.
            </p>
            <p className="text-lg text-primary-700 leading-relaxed">
              Today, the ethos remains the same: every tutor is handpicked, every match thoughtfully made, and every family accommodated directly by Elizabeth and her team.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
              This Is Tutoring at Its Best
            </h2>
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
  )
}