/**
 * Documentation Source: Next.js 14 + TypeScript
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://www.typescriptlang.org/docs/handbook/2/modules.html#export-and-import-type
 * 
 * Pattern: Client Component with CMS-driven content
 * Architecture:
 * - No animations (static page) - good for performance
 * - Strong typing with imported types from CMS
 * - Icon mapping pattern for dynamic icons
 * 
 * CMS Integration:
 * - getHowItWorksHero for hero section
 * - getHowItWorksSteps for process timeline
 * - getTutorTiers for pricing tiers
 * - getHowItWorksBenefits for benefits section
 * 
 * Component Usage:
 * - PageLayout with explicit white background
 * - PageHero with image background
 * - Radix UI Card components
 * - Magic UI button variants
 */

"use client"

import { CheckCircle, Users, ClipboardCheck, Target, MessageSquare } from 'lucide-react'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { VideoText } from '@/components/magicui/video-text'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { 
  getHowItWorksHero, 
  getHowItWorksSteps, 
  getTutorTiers, 
  getHowItWorksBenefits, 
  getHowItWorksCTA,
  type HowItWorksStep,
  type TutorTier
} from '@/lib/cms/cms-content'
import { HERO_IMAGES } from '@/lib/cms/cms-images'

// RENDERING ANALYSIS:
// - Component Type: Client Component ("use client") - automatically dynamic
// - Next.js automatically makes this dynamic due to "use client" directive
// - No explicit dynamic export needed - this is industry standard
// - CMS Integration: Complete with hero, steps, tiers, and benefits content

// Map icon names to actual icon components
const iconMap = {
  MessageSquare,
  Users,
  Target,
  ClipboardCheck
}

export default function HowItWorksPage() {
  // CMS DATA SOURCE: Using getHowItWorksHero for hero content
  // CMS DATA SOURCE: Using getHowItWorksSteps for process steps
  // CMS DATA SOURCE: Using HERO_IMAGES for background image assets
  const heroContent = getHowItWorksHero()
  const processSteps = getHowItWorksSteps()
  const tutorTiers = getTutorTiers()
  const benefits = getHowItWorksBenefits()
  const ctaContent = getHowItWorksCTA()
  const heroBackgroundImage = HERO_IMAGES[heroContent.backgroundImageKey as keyof typeof HERO_IMAGES]
  return (
    <PageLayout background="white">
      <PageHero
        background="image"
        backgroundImage={heroBackgroundImage.src}
        size="full"
        overlay={true}
        overlayOpacity="medium"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight mb-6">
            {heroContent.title}
          </h1>
          <p className="text-xl text-amber-400 font-semibold mb-6">
            {heroContent.subtitle}
          </p>
          <p className="text-lg text-white/90 leading-relaxed mb-8">
            {heroContent.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {heroContent.ctaButtons.map((button, index) => (
              button.type === 'primary' ? (
                <ShinyButton 
                  key={index}
                  text={button.text}
                  className="px-8 py-4 h-auto"
                />
              ) : (
                <InteractiveHoverButton 
                  key={index}
                  text={button.text}
                  className="px-8 py-4 border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-900"
                />
              )
            ))}
          </div>
        </div>
      </PageHero>

      {/* How It Works Steps */}
      <Section className="py-16 lg:py-24" background="white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our proven 4-step process ensures every student receives perfectly matched, expert tutoring support
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {processSteps.map((step: HowItWorksStep, index: number) => {
              const IconComponent = iconMap[step.icon as keyof typeof iconMap]
              return (
                <Card key={index} className="relative bg-white border border-slate-200 hover:shadow-lg transition-shadow duration-300 rounded-none">
                  <CardHeader className="pb-6 p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <IconComponent className="w-6 h-6 text-amber-600" />
                          <h3 className="text-xl font-serif font-bold text-slate-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-8 pb-8">
                    <ul className="space-y-3">
                      {step.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Tiered Tutoring System */}
      <Section className="py-16 lg:py-24" background="grey">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
              Our Tiered Tutoring System
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Choose the level of support that perfectly matches your child's needs and your budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {tutorTiers.map((tier: TutorTier, index: number) => (
              <Card key={index} className={`relative bg-white border-2 transition-all duration-300 hover:shadow-xl rounded-none ${
                tier.tier === 'Tier 1' ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-200'
              }`}>
                <CardHeader className="text-center pb-6 p-8">
                  {tier.tier === 'Tier 1' && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                    {tier.tier}
                  </h3>
                  <Badge variant="outline" className="text-slate-600 border-slate-300">
                    {tier.pricePoint}
                  </Badge>
                </CardHeader>
                
                <CardContent className="text-center px-8 pb-8">
                  <p className="text-slate-700 mb-6 leading-relaxed">
                    {tier.description}
                  </p>
                  <Separator className="my-6" />
                  <p className="text-base font-semibold text-slate-900 mb-3">Best For:</p>
                  <p className="text-slate-600">
                    {tier.bestFor}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-slate-700 mb-6">
              Specialist tutoring begins at just <span className="font-bold text-amber-600">£47.50 per hour</span>
            </p>
            <p className="text-slate-600">
              Unlike many other providers, we don't charge registration or administrative fees
            </p>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section className="py-16 lg:py-24" background="white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
                Why Families Choose Our Approach
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <p className="text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="text-center bg-gray-50 p-12">
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6">
                {ctaContent.title}
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                {ctaContent.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {ctaContent.buttons.map((button, index) => (
                  button.type === 'primary' ? (
                    <ShinyButton 
                      key={index}
                      text={button.text}
                      className="px-8 py-3 h-auto"
                    />
                  ) : (
                    <InteractiveHoverButton 
                      key={index}
                      text={button.text}
                      className="px-8 py-3"
                    />
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  )
}