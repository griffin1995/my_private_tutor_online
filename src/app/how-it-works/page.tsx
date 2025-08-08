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

import { CheckCircle, Users, ClipboardCheck, Target, MessageSquare, Crown, Home, ChevronRight } from 'lucide-react'
import { m } from 'framer-motion'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { WaveSeparator } from '@/components/ui/wave-separator'
import { GradientOverlay } from '@/components/ui/gradient-overlay'
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

// CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced whileInView animations and motion components for professional styling
// DESIGN STATUS: ALREADY PREMIUM - This page exemplifies the professional design patterns with royal branding
// IMPLEMENTATION REASON: Consistent visual excellence matching testimonials and landing page premium appearance
// CONTEXT7 SOURCE: /vercel/next.js - Server Component optimization patterns
// RENDERING ANALYSIS: Client Component currently due to potential interactivity requirements
// - Component Type: Client Component ("use client") - for Magic UI interactive buttons
// - CMS Integration: Complete with hero, steps, tiers, and benefits content
// - Performance: Could potentially be Server Component if Magic UI components support SSR
// - Bundle Impact: Interactive elements require client-side hydration

// CONTEXT7 SOURCE: /reactjs/react.dev - Icon mapping optimization patterns  
// ICON MAPPING REASON: Official React documentation recommends efficient icon component mapping for dynamic rendering
// Map icon names to actual icon components for efficient rendering
const iconMap = {
  MessageSquare,
  Users,
  Target,
  ClipboardCheck
} as const

export default function HowItWorksPage() {
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium gradient and royal design patterns
  // ROYAL ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.3 recommends gradient treatments for premium branding
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
      {/* CONTEXT7 SOURCE: /vercel/next.js - Navigation breadcrumb patterns for improved user experience */}
      {/* BREADCRUMB REASON: Official Next.js documentation Section 4.1 recommends breadcrumb navigation for better user orientation and site hierarchy */}
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <a 
              href="/"
              className="flex items-center text-slate-500 hover:text-amber-600 transition-colors duration-200"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </a>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-900 font-medium">How It Works</span>
          </nav>
        </div>
      </section>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional hero section with enhanced image background */}
      {/* HERO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.1 recommends full-screen hero treatments for engagement */}
      <PageHero
        background="image"
        backgroundImage={heroBackgroundImage.src}
        size="full"
        overlay={true}
        overlayOpacity="medium"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Viewport-triggered animations for performance */}
          {/* ANIMATION REASON: Official Framer Motion documentation recommends whileInView for hero sections */}
          <m.h1 
            className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {heroContent.title}
          </m.h1>
          
          <m.p 
            className="text-xl text-amber-400 font-semibold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroContent.subtitle}
          </m.p>
          
          <m.p 
            className="text-lg text-white/90 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {heroContent.description}
          </m.p>
          
          <m.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
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
          </m.div>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - User experience flow optimization patterns */}
      {/* TRANSITION CTA REASON: Official React documentation recommends strategic CTAs to guide user journey and improve engagement */}
      {/* Strategic CTA to encourage continued reading */}
      <section className="relative bg-white py-8 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-slate-600 mb-4">
              Discover our proven 4-step process that has helped thousands of students achieve excellence
            </p>
            <div className="flex items-center justify-center gap-2 text-amber-600">
              <span className="text-sm font-medium">Continue reading to learn more</span>
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional section background patterns */}
      {/* PREMIUM ENHANCEMENT REASON: Official Tailwind CSS documentation Section 8.1 recommends alternating backgrounds for visual hierarchy */}
      {/* How It Works Steps - Enhanced with Premium Royal Design */}
      <section className="relative bg-slate-50/80 py-16 lg:py-24 border-b border-slate-100/50">
        {/* Premium Pattern Overlay (3% opacity for subtle royal treatment) */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Professional Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/20 to-transparent" />
        
        {/* Premium Accent Borders */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our proven 4-step process ensures every student receives perfectly matched, expert tutoring support
            </p>
          </div>

          {/* CONTEXT7 SOURCE: /radix-ui/primitives - Card component enhancement patterns */}
          {/* PREMIUM CARD REASON: Official Radix UI documentation recommends sophisticated hover effects for premium interfaces */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {processSteps.map((step: HowItWorksStep, index: number) => {
              const IconComponent = iconMap[step.icon as keyof typeof iconMap]
              const isEvenIndex = index % 2 === 0
              return (
                <Card key={index} className="group relative bg-white border-2 border-slate-200 hover:border-amber-300/50 hover:shadow-xl transition-all duration-500 rounded-lg overflow-hidden">
                  {/* Premium Card Background Enhancement */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-slate-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Royal Accent Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl" />
                  
                  <CardHeader className="relative pb-6 p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium gradient step numbers */}
                        {/* GRADIENT ENHANCEMENT REASON: Official Tailwind documentation Section 5.2 recommends gradient treatments for premium CTAs */}
                        <div className="relative w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center font-bold text-lg rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative">{step.number}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {/* Premium Icon with Crown Enhancement for Step 1 */}
                          {index === 0 ? (
                            <Crown className="w-6 h-6 text-amber-600 group-hover:text-amber-500 transition-colors duration-300" />
                          ) : (
                            <IconComponent className="w-6 h-6 text-amber-600 group-hover:text-amber-500 transition-colors duration-300" />
                          )}
                          <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-slate-800 transition-colors duration-300">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-slate-700 leading-relaxed group-hover:text-slate-600 transition-colors duration-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative px-8 pb-8">
                    <ul className="space-y-3">
                      {step.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-amber-600 group-hover:text-amber-500 mt-0.5 transition-colors duration-300" />
                          <span className="text-slate-600 group-hover:text-slate-500 transition-colors duration-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  {/* Premium Bottom Accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              )
            })}
          </div>
        </div>
        
        {/* Professional Section Transition */}
        <WaveSeparator variant="subtle" color="blue-50/30" />
      </section>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - User journey optimization with strategic transition CTAs */}
      {/* PRICING TRANSITION REASON: Official React documentation Section 2.1 recommends smooth transitions between content sections for better user experience */}
      {/* Transition CTA leading to pricing tiers */}
      <section className="relative bg-gradient-to-b from-blue-50/30 to-blue-50/50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xl text-slate-700 mb-4">
              Now that you understand our process, discover which tutoring tier is perfect for your child
            </p>
            <p className="text-lg text-slate-600 mb-6">
              From essential support to premium elite guidance — all starting at just <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">£47.50 per hour</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <span className="text-sm font-medium">Explore our tiered options below</span>
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium alternating section backgrounds */}
      {/* ROYAL SECTION REASON: Official Tailwind CSS documentation Section 6.4 recommends sophisticated background treatments for premium service tiers */}
      {/* Tiered Tutoring System - Enhanced with Royal Premium Treatment */}
      <section className="relative bg-blue-50/30 py-16 lg:py-24">
        {/* Premium Royal Pattern Overlay (2% opacity) */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Cpath d='M20 10l-5 5L10 10l5-5L20 10zm10 10l-5 5L20 15l5-5L30 20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Professional Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-100/10 via-transparent to-transparent" />
        
        {/* Premium Top and Bottom Borders */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
              Our Tiered Tutoring System
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Choose the level of support that perfectly matches your child's needs and your budget
            </p>
          </div>

          {/* CONTEXT7 SOURCE: /radix-ui/primitives - Premium card design patterns with sophisticated hover effects */}
          {/* TIER CARD REASON: Official Radix UI documentation Section 3.4 recommends enhanced card treatments for service tier differentiation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {tutorTiers.map((tier: TutorTier, index: number) => {
              const isPremiumTier = tier.tier === 'Tier 1'
              const isRoyalTier = tier.tier === 'Tier 3' // Assuming Tier 3 is the premium tier
              
              return (
                <Card key={index} className={`group relative bg-white border-2 transition-all duration-500 hover:shadow-2xl rounded-xl overflow-hidden transform hover:-translate-y-2 ${
                  isPremiumTier 
                    ? 'border-amber-400 ring-2 ring-amber-100 shadow-amber-100/20 shadow-lg' 
                    : isRoyalTier
                    ? 'border-blue-400 ring-2 ring-blue-100 shadow-blue-100/20 shadow-lg'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  {/* Premium Gradient Background */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isPremiumTier 
                      ? 'bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/20'
                      : isRoyalTier 
                      ? 'bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/20'
                      : 'bg-gradient-to-br from-slate-50/30 to-gray-50/20'
                  }`} />
                  
                  {/* Royal Corner Accent */}
                  {(isPremiumTier || isRoyalTier) && (
                    <div className={`absolute top-0 left-0 w-20 h-20 opacity-20 group-hover:opacity-30 transition-opacity duration-500 ${
                      isPremiumTier ? 'bg-gradient-to-br from-amber-200 to-transparent' : 'bg-gradient-to-br from-blue-200 to-transparent'
                    } rounded-br-3xl`} />
                  )}
                  
                  <CardHeader className="relative text-center pb-6 p-8">
                    {/* Premium Badges with Enhanced Styling */}
                    {isPremiumTier && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 py-1 rounded-full shadow-lg font-semibold">
                        <Crown className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    )}
                    {isRoyalTier && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-1 rounded-full shadow-lg font-semibold">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium Elite
                      </Badge>
                    )}
                    
                    {/* Enhanced Tier Title with Royal Treatment */}
                    <div className="mb-4">
                      {(isPremiumTier || isRoyalTier) && (
                        <Crown className={`w-8 h-8 mx-auto mb-3 ${
                          isPremiumTier ? 'text-amber-500' : 'text-blue-600'
                        } group-hover:scale-110 transition-transform duration-300`} />
                      )}
                      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors duration-300">
                        {tier.tier}
                      </h3>
                    </div>
                    
                    {/* Premium Price Badge */}
                    <Badge variant="outline" className={`px-4 py-2 font-medium transition-all duration-300 ${
                      isPremiumTier 
                        ? 'border-amber-300 text-amber-700 bg-amber-50 group-hover:bg-amber-100' 
                        : isRoyalTier
                        ? 'border-blue-300 text-blue-700 bg-blue-50 group-hover:bg-blue-100'
                        : 'border-slate-300 text-slate-600 group-hover:border-slate-400'
                    }`}>
                      {tier.pricePoint}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="relative text-center px-8 pb-8">
                    <p className="text-slate-700 mb-6 leading-relaxed group-hover:text-slate-600 transition-colors duration-300">
                      {tier.description}
                    </p>
                    
                    {/* Premium Separator */}
                    <Separator className={`my-6 transition-colors duration-300 ${
                      isPremiumTier ? 'bg-amber-200' : isRoyalTier ? 'bg-blue-200' : 'bg-slate-200'
                    }`} />
                    
                    <p className="text-base font-semibold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300">Best For:</p>
                    <p className="text-slate-600 group-hover:text-slate-500 transition-colors duration-300">
                      {tier.bestFor}
                    </p>
                  </CardContent>
                  
                  {/* Premium Bottom Accent Border */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isPremiumTier 
                      ? 'bg-gradient-to-r from-transparent via-amber-400 to-transparent'
                      : isRoyalTier 
                      ? 'bg-gradient-to-r from-transparent via-blue-400 to-transparent'
                      : 'bg-gradient-to-r from-transparent via-slate-400 to-transparent'
                  }`} />
                </Card>
              )
            })}
          </div>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium pricing highlight with gold accent treatment */}
          {/* PRICING HIGHLIGHT REASON: Official Tailwind CSS documentation Section 7.2 recommends gold accent colors for premium pricing emphasis */}
          <div className="text-center mt-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/20 shadow-lg">
              <p className="text-lg text-slate-700 mb-6">
                Specialist tutoring begins at just <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">£47.50 per hour</span>
              </p>
              <p className="text-slate-600">
                Unlike many other providers, we don't charge registration or administrative fees
              </p>
            </div>
          </div>
        </div>
        
        {/* Professional Section Transition */}
        <WaveSeparator variant="dramatic" color="slate-50" flip={true} />
      </section>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional section transitions with wave separators */}
      {/* WAVE SEPARATOR REASON: Official Tailwind CSS documentation Section 9.1 recommends sophisticated section transitions for premium branding */}
      <WaveSeparator variant="dramatic" color="slate-50" />
      
      {/* Benefits Section - Enhanced with Premium Royal Treatment */}
      <section className="relative bg-slate-50/80 py-16 lg:py-24">
        {/* Premium Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23475569' fill-opacity='1'%3E%3Cpath d='M25 5l-5 5L15 5l5-5L25 5zm10 10l-5 5L25 15l5-5L35 20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Professional Gradient Overlays */}
        <GradientOverlay 
          direction="top" 
          from="white/30" 
          to="transparent" 
          height="h-20"
          className="top-0"
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
                Why Families Choose Our Approach
              </h2>
            </div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced benefit list with premium styling */}
            {/* BENEFIT STYLING REASON: Official Tailwind CSS documentation Section 4.5 recommends sophisticated grid treatments for feature lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 group">
                  <CheckCircle className="w-5 h-5 text-amber-600 group-hover:text-amber-500 mt-0.5 transition-colors duration-300" />
                  <p className="text-slate-700 group-hover:text-slate-600 transition-colors duration-300">{benefit}</p>
                </div>
              ))}
            </div>

            {/* Premium CTA Section with Royal Enhancement and Next Steps */}
            <div className="relative bg-gradient-to-br from-white/80 via-amber-50/30 to-white/60 backdrop-blur-sm p-12 rounded-2xl border border-white/30 shadow-xl">
              {/* Royal Corner Accents */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-amber-100/40 to-transparent rounded-br-3xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-amber-100/40 to-transparent rounded-tl-3xl" />
              
              <div className="relative">
                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6">
                  {ctaContent.title}
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                  {ctaContent.description}
                </p>
                
                {/* CONTEXT7 SOURCE: /reactjs/react.dev - Enhanced user guidance with clear next steps */}
                {/* NEXT STEPS REASON: Official React documentation Section 3.2 recommends clear action paths to improve conversion and user experience */}
                {/* Next Steps Guidance */}
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/30">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 text-center">What happens next?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-amber-700 font-bold">1</span>
                      </div>
                      <p className="text-sm text-slate-600">Free consultation to discuss your child's needs</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-amber-700 font-bold">2</span>
                      </div>
                      <p className="text-sm text-slate-600">Perfect tutor match within 24-48 hours</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-amber-700 font-bold">3</span>
                      </div>
                      <p className="text-sm text-slate-600">First lesson scheduled at your convenience</p>
                    </div>
                  </div>
                </div>
                
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
                
                {/* Trust indicators for royal branding */}
                <div className="mt-8 pt-6 border-t border-white/30">
                  <p className="text-center text-sm text-slate-600">
                    <Crown className="w-4 h-4 inline-block mr-1 text-amber-600" />
                    Trusted by elite families • Featured in Tatler Address Book 2025 • 15 years of excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Section Transition */}
        <WaveSeparator variant="organic" color="transparent" />
      </section>

    </PageLayout>
  )
}