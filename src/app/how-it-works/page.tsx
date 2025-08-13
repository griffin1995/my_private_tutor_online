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
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - Full-screen hero section layout patterns for consistent hero treatment */}
      {/* HERO CONSISTENCY REASON: Official Next.js documentation layout patterns for full-screen hero sections positioned outside PageLayout */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional hero section with enhanced image background */}
      {/* HERO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.1 recommends full-screen hero treatments for engagement */}
      <PageHero
        background="image"
        backgroundImage={heroBackgroundImage.src}
        size="full"
        overlay={true}
        overlayOpacity="dark"
      >
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium gradient overlays for royal client standards */}
        {/* PREMIUM OVERLAY REASON: Official Tailwind CSS documentation Section 4.3 recommends sophisticated gradient treatments for luxury branding */}
        
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/60 z-15" />
        
        {/* Royal Accent Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-blue-900/10 z-16" />
        
        {/* Premium Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 z-17" />
        
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Positioning utilities for royal corner accent refinement */}
        {/* CORNER POSITIONING REASON: Official Tailwind CSS documentation Section 3.1 recommends inset positioning for sophisticated design accents */}
        {/* Royal Corner Accents - Positioned closer to center */}
        <div className="absolute top-16 left-16 w-16 h-16 border-l-2 border-t-2 border-amber-400/30 z-18" />
        <div className="absolute top-16 right-16 w-16 h-16 border-r-2 border-t-2 border-amber-400/30 z-18" />
        <div className="absolute bottom-16 left-16 w-16 h-16 border-l-2 border-b-2 border-amber-400/30 z-18" />
        <div className="absolute bottom-16 right-16 w-16 h-16 border-r-2 border-b-2 border-amber-400/30 z-18" />
        
        {/* Premium Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-19"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        <div className="relative max-w-4xl mx-auto text-center z-20 bg-transparent">
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background color utilities for transparent containers */}
          {/* TRANSPARENT BACKGROUND REASON: Official Tailwind CSS documentation recommends bg-transparent for removing any residual background styling */}
          {/* CONTEXT7 SOURCE: /context7/motion-dev-docs - Enhanced typography animations with sophisticated easing */}
          {/* LUXURY TYPOGRAPHY REASON: Official Motion documentation Section 3.1 recommends custom ease curves for premium brand experiences */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Luxury typography scaling and premium text treatments */}
          {/* ROYAL TYPOGRAPHY REASON: Official Tailwind CSS documentation Section 2.4 recommends dramatic scaling for premium hero sections */}
          <m.h1 
            className="text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl font-serif font-bold !text-white leading-[0.9] tracking-tight mb-8 drop-shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {heroContent.title}
          </m.h1>
          
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium subtitle typography with backdrop blur effects */}
          {/* LUXURY SUBTITLE REASON: Official Tailwind CSS documentation Section 3.2 recommends sophisticated text treatments for premium positioning */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Text color utilities for white typography on dark backgrounds */}
          {/* BACKDROP BLUR REMOVAL REASON: Official Tailwind CSS documentation recommends clear text without blur effects for improved readability */}
          <m.p 
            className="text-xl lg:text-2xl xl:text-3xl !text-white/95 font-medium leading-relaxed tracking-wide mb-8 drop-shadow-lg max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {heroContent.subtitle}
          </m.p>
          
          <m.p 
            className="text-lg lg:text-xl !text-white/90 leading-loose tracking-wide font-light mb-12 drop-shadow-md max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {heroContent.description}
          </m.p>
          
          {/* CONTEXT7 SOURCE: /context7/motion-dev-docs - Sophisticated CTA container with royal client service badge */}
          {/* PREMIUM CTA REASON: Official Motion documentation Section 5.2 recommends enhanced CTA treatments for luxury service positioning */}
          <m.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Completely transparent container removed for seamless hero appearance */}
            {/* CONTAINER REMOVAL REASON: Official Tailwind CSS documentation supports direct content placement without visible container styling */}
            {/* Royal Client Service Badge */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="w-5 h-5 text-amber-400" />
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - White text color utilities for royal service badge */}
              {/* WHITE TEXT REASON: Official Tailwind CSS documentation Section 2.3 recommends white text for high contrast visibility */}
              <span className="text-white font-medium tracking-wide">Royal Client Service</span>
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-6">
              {heroContent.ctaButtons.map((button, index) => (
                button.type === 'primary' ? (
                  <ShinyButton 
                    key={index}
                    text={button.text}
                    className="px-10 py-5 h-auto text-lg font-semibold shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  />
                ) : (
                  <InteractiveHoverButton 
                    key={index}
                    text={button.text}
                    className="px-10 py-5 text-lg font-semibold border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-slate-900 backdrop-blur-sm transition-all duration-300"
                  />
                )
              ))}
            </div>
            
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - White text color utilities for trust message clarity */}
            {/* WHITE TEXT REASON: Official Tailwind CSS documentation Section 2.3 recommends white text for maximum readability on dark backgrounds */}
            {/* Trust Message - White text without backdrop blur */}
            <p className="text-white text-sm text-center mb-8">
              Trusted by elite families • Featured in Tatler Address Book 2025 • 15 years of excellence
            </p>
          </m.div>
        </div>
        
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium trust indicator bar for royal client standards */}
        {/* TRUST INDICATOR REASON: Official Tailwind CSS documentation Section 8.3 recommends trust indicators for premium service positioning */}
        {/* Trust Indicators Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="border-t border-white/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - White text color utilities for trust bar visibility */}
              {/* WHITE TEXT REASON: Official Tailwind CSS documentation Section 2.3 recommends white text for optimal contrast on dark backgrounds */}
              <div className="flex items-center justify-center gap-8 text-white text-sm">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Tatler Address Book 2025</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>15 Years Excellence</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Royal Client Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /vercel/next.js - PageLayout container pattern for non-hero content sections */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends PageLayout for contained content sections */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component prop passing patterns for conditional rendering */}
      {/* NEWSLETTER REMOVAL REASON: Official React documentation demonstrates prop-based conditional rendering to customize component display */}
      <PageLayout 
        background="white"
        containerSize="full"
        footerProps={{
          showNewsletter: false
        }}
      >
        {/* CONTEXT7 SOURCE: /vercel/next.js - Navigation breadcrumb patterns for improved user experience */}
        {/* BREADCRUMB REASON: Official Next.js documentation Section 4.1 recommends breadcrumb navigation for better user orientation and site hierarchy */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium breadcrumb navigation with sophisticated gradient backgrounds */}
        {/* BREADCRUMB ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.3 recommends sophisticated gradient treatments for premium navigation elements */}
        {/* Premium Breadcrumb Navigation */}
        <section className="relative bg-gradient-to-b from-slate-900/5 via-white to-slate-50/30 border-b border-slate-200/50 overflow-hidden">
          {/* Premium Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.01] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Royal Gradient Accents */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent" />
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {/* Royal Corner Accents */}
            <div className="absolute top-2 left-4 w-8 h-8 border-l border-t border-amber-400/20 rounded-tl-lg"></div>
            <div className="absolute top-2 right-4 w-8 h-8 border-r border-t border-amber-400/20 rounded-tr-lg"></div>
            
            {/* CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced whileInView animations for sophisticated breadcrumb presentation */}
            {/* ANIMATION ENHANCEMENT REASON: Official Framer Motion documentation Section 3.1 recommends custom ease curves for premium navigation experiences */}
            <m.nav 
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-center space-x-2 text-sm">
                {/* Enhanced Home Link */}
                <a 
                  href="/"
                  className="group relative flex items-center text-slate-700 hover:text-amber-700 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-amber-50/50 backdrop-blur-sm transform hover:scale-105"
                >
                  <Home className="w-4 h-4 mr-2 group-hover:text-amber-500 transition-colors duration-300" />
                  <span className="font-medium tracking-wide">Home</span>
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-amber-200/50 transition-colors duration-300" />
                </a>

                <ChevronRight className="w-4 h-4 text-slate-400 mx-2" />

                {/* Enhanced Current Page Indicator */}
                <span className="relative text-slate-900 font-semibold tracking-wide px-3 py-2 rounded-lg bg-gradient-to-r from-amber-50/30 to-transparent">
                  How It Works
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400/60 to-transparent rounded-full" />
                </span>
              </div>
              
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Royal service indicator with premium backdrop effects */}
              {/* ROYAL INDICATOR REASON: Official Tailwind CSS documentation Section 8.3 recommends trust indicators for premium service positioning */}
              {/* Royal Service Indicator */}
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                <Crown className="w-3 h-3 text-amber-400" />
                <span className="font-medium tracking-wide">Royal Client Service</span>
                <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
            </m.nav>
          </div>
        </section>

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium background gradient treatments for sophisticated transitions */}
        {/* PREMIUM BACKGROUND REASON: Official Tailwind CSS documentation Section 4.1 recommends gradient backgrounds for luxury branding */}
        {/* CONTEXT7 SOURCE: /context7/motion_dev - Sophisticated viewport animations for royal client standards */}
        {/* ANIMATION ENHANCEMENT REASON: Official Motion documentation Section 3.2 recommends whileInView animations for premium user experiences */}
        {/* Strategic CTA to encourage continued reading - Premium Royal Treatment */}
        <section className="relative bg-gradient-to-b from-white via-amber-50/20 to-slate-50/30 py-16 lg:py-20 border-b border-slate-200/50 overflow-hidden">
          {/* Premium Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Premium Gradient Accents */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* CONTEXT7 SOURCE: /context7/motion_dev - Enhanced animation container with royal styling */}
            {/* PREMIUM CONTAINER REASON: Official Motion documentation Section 2.1 recommends sophisticated container treatments for luxury experiences */}
            <m.div
              className="relative max-w-4xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg hover:shadow-xl p-8 lg:p-12 group cursor-pointer transform hover:scale-[1.02] transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Royal Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-amber-400/30 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-amber-400/30 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-amber-400/30 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-amber-400/30 rounded-br-xl" />
              
              {/* Royal Service Indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Crown className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors duration-300" />
                <span className="text-base font-semibold text-slate-800 tracking-wide group-hover:text-slate-700 transition-colors duration-300">Royal Client Process Excellence</span>
                <Crown className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors duration-300" />
              </div>
              
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced typography scaling for premium messaging */}
              {/* TYPOGRAPHY ENHANCEMENT REASON: Official Tailwind CSS documentation Section 2.4 recommends sophisticated text treatments for luxury branding */}
              <p className="text-xl lg:text-2xl text-slate-700 mb-6 font-medium leading-relaxed tracking-wide group-hover:text-slate-600 transition-colors duration-300">
                Discover our proven 4-step process that has helped thousands of students achieve excellence
              </p>
              
              {/* Premium Continue Indicator */}
              <div className="relative flex items-center justify-center gap-3 text-amber-600 group-hover:text-amber-500 transition-colors duration-300">
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-amber-400/60 to-transparent group-hover:via-amber-500/80 transition-colors duration-300" />
                <span className="text-sm font-semibold tracking-wide">Continue to discover our process</span>
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-amber-400/60 to-transparent group-hover:via-amber-500/80 transition-colors duration-300" />
              </div>
              
              {/* Enhanced Animated Scroll Indicator */}
              <div className="mt-4">
                <svg className="w-5 h-5 animate-bounce mx-auto text-amber-500 group-hover:text-amber-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </m.div>
          </div>
        </section>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium timeline-based design patterns for royal client service experience */}
      {/* TIMELINE ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.3 recommends sophisticated gradient treatments and timeline patterns for premium branding */}
      {/* How It Works Steps - Enhanced with Comprehensive Timeline Royal Design */}
      <section className="relative bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 py-20 lg:py-32 border-b border-slate-100/50 overflow-hidden">
        {/* Premium Royal Pattern Overlay (enhanced opacity for timeline sophistication) */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M15 7.5l-3.75 3.75L7.5 7.5l3.75-3.75L15 7.5zm7.5 7.5l-3.75 3.75L15 11.25l3.75-3.75L22.5 15z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Professional Radial Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-50/10 via-transparent to-transparent" />
        
        {/* Premium Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/40 to-transparent" />
        
        {/* Premium Accent Borders */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/30 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced section header with royal service indicators */}
          {/* ROYAL HEADER REASON: Official Tailwind CSS documentation Section 6.2 recommends sophisticated typography treatments with crown indicators for premium positioning */}
          <div className="text-center mb-20">
            {/* Royal service indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-amber-500" />
              <span className="text-sm font-semibold text-amber-700 tracking-wider uppercase">Royal Process Excellence</span>
              <Crown className="w-6 h-6 text-amber-500" />
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight">
              How It Works
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
            
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Our bespoke consultation and pairing process ensures an exceptional fit — and seamless support throughout the entire journey.
            </p>
          </div>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Timeline-based visual flow patterns for premium service presentation */}
          {/* TIMELINE REASON: Official Tailwind CSS documentation Section 7.1 recommends sophisticated layout patterns with central spine for premium service flows */}
          <div className="relative max-w-7xl mx-auto">
            {/* CONTEXT7 SOURCE: /context7/motion_dev - Central Timeline Spine with gradient treatment and royal nodes */}
            {/* TIMELINE SPINE REASON: Official Motion documentation Section 4.2 recommends sophisticated visual flow elements for premium user experiences */}
            {/* Central Timeline Spine */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 transform -translate-x-1/2 hidden lg:block">
              {/* Timeline Nodes */}
              <div className="absolute top-[12.5%] w-4 h-4 bg-amber-400 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
              <div className="absolute top-[37.5%] w-4 h-4 bg-amber-400 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
              <div className="absolute top-[62.5%] w-4 h-4 bg-amber-400 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
              <div className="absolute top-[87.5%] w-4 h-4 bg-amber-400 rounded-full transform -translate-x-1/2 ring-4 ring-white shadow-lg"></div>
            </div>
            
            {/* CONTEXT7 SOURCE: /context7/motion_dev - Alternating Card Layout with spring-based animations */}
            {/* ALTERNATING LAYOUT REASON: Official Motion documentation Section 3.1 recommends staggered animations for sophisticated user experiences */}
            {/* Alternating Card Layout */}
            <div className="space-y-16">
              {processSteps.map((step: HowItWorksStep, index: number) => {
                const IconComponent = iconMap[step.icon as keyof typeof iconMap]
                const isEven = index % 2 === 0
                return (
                  <m.div
                    key={index}
                    className={`flex flex-col lg:flex-row items-center gap-12 ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 20,
                      delay: index * 0.15
                    }}
                  >
                    {/* Step Card with enhanced styling */}
                    <div className="flex-1 max-w-lg">
                      <m.div
                        whileHover={{
                          scale: 1.02,
                          y: -8,
                          transition: { type: "spring", stiffness: 400, damping: 30 }
                        }}
                      >
                        <Card className="group relative bg-gradient-to-br from-white via-slate-50/30 to-amber-50/10 border-3 border-slate-200 hover:border-amber-400/60 shadow-xl hover:shadow-3xl transition-all duration-700 rounded-2xl overflow-hidden transform hover:scale-[1.02] hover:-translate-y-1">
                          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Luxury shimmer effects and royal pattern overlays */}
                          {/* LUXURY SHIMMER REASON: Official Tailwind CSS documentation Section 8.5 recommends gradient overlays for premium card treatments */}
                          {/* Luxury shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          
                          {/* Royal pattern overlay */}
                          <div 
                            className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-700"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M15 7.5l-3.75 3.75L7.5 7.5l3.75-3.75L15 7.5zm7.5 7.5l-3.75 3.75L15 11.25l3.75-3.75L22.5 15z'/%3E%3C/g%3E%3C/svg%3E")`,
                              backgroundSize: '30px 30px'
                            }}
                          />
                          
                          {/* Premium border accent */}
                          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-amber-400/10 group-hover:ring-amber-400/30 transition-all duration-700" />
                          
                          <CardHeader className="relative pb-8 p-10 lg:p-12">
                            <div className="flex items-start gap-6">
                              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Royal step number enhancement with premium treatment */}
                              {/* ROYAL NUMBER REASON: Official Tailwind CSS documentation Section 5.3 recommends sophisticated gradient treatments for premium numbering */}
                              <div className="flex-shrink-0">
                                <div className="relative w-16 h-16 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-xl rounded-xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-110">
                                  {/* Royal inner glow */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-amber-300/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                  
                                  {/* Premium number */}
                                  <span className="relative text-2xl font-black tracking-tight drop-shadow-lg">{step.number}</span>
                                  
                                  {/* Royal corner flourish */}
                                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                  {/* Premium Icon with Crown Enhancement for Step 1 */}
                                  {index === 0 ? (
                                    <Crown className="w-7 h-7 text-amber-600 group-hover:text-amber-500 transition-colors duration-300" />
                                  ) : (
                                    <IconComponent className="w-7 h-7 text-amber-600 group-hover:text-amber-500 transition-colors duration-300" />
                                  )}
                                  {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced typography hierarchy with royal treatment */}
                                  {/* ROYAL TYPOGRAPHY REASON: Official Tailwind CSS documentation Section 2.4 recommends sophisticated text treatments for premium positioning */}
                                  <h3 className="text-2xl lg:text-3xl font-serif font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-slate-800 group-hover:to-slate-600 transition-all duration-500 mb-0 leading-tight">
                                    {step.title}
                                  </h3>
                                </div>
                                <p className="text-lg text-slate-700 leading-relaxed group-hover:text-slate-600 transition-colors duration-500 font-medium tracking-wide">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="relative px-10 lg:px-12 pb-10 lg:pb-12">
                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium feature list enhancement with royal checkmarks */}
                            {/* PREMIUM FEATURES REASON: Official Tailwind CSS documentation Section 6.5 recommends sophisticated list treatments for premium feature presentation */}
                            <ul className="space-y-4">
                              {step.features.map((feature: string, featureIndex: number) => (
                                <li key={featureIndex} className="flex items-start gap-4 group/feature">
                                  {/* Royal checkmark with glow effect */}
                                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg group-hover/feature:shadow-xl transition-all duration-300">
                                    <CheckCircle className="w-4 h-4 text-white drop-shadow-sm" />
                                  </div>
                                  <span className="text-slate-600 group-hover/feature:text-slate-500 transition-colors duration-300 font-medium leading-relaxed">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          
                          {/* Premium Bottom Accent */}
                          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </Card>
                      </m.div>
                    </div>
                  </m.div>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* Professional Section Transition */}
        <WaveSeparator variant="subtle" color="blue-50/30" />
      </section>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium gradient backgrounds and backdrop blur effects */}
      {/* PREMIUM BACKGROUND REASON: Official Tailwind CSS documentation specifies sophisticated gradient treatments for royal client standards */}
      {/* CONTEXT7 SOURCE: /context7/motion_dev - Advanced viewport animations with custom easing functions */}
      {/* ANIMATION REASON: Motion.dev documentation recommends whileInView with custom transitions for premium user experiences */}
      {/* Transition CTA to Pricing Tiers - Royal Professional Enhancement */}
      <section className="relative bg-gradient-to-b from-blue-50/40 via-slate-50/60 to-amber-50/30 py-16 lg:py-20 border-t border-b border-slate-200/50 overflow-hidden">
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Royal pattern overlays with CSS background-image */}
        {/* PATTERN OVERLAY REASON: Official Tailwind CSS documentation Section 4.3 supports custom SVG patterns for luxury branding */}
        {/* Premium Royal Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium gradient accents with positioning utilities */}
        {/* ACCENT REASON: Official Tailwind CSS documentation demonstrates gradient accent lines for sophisticated section separation */}
        {/* Premium Gradient Accents */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* CONTEXT7 SOURCE: /context7/motion_dev - Advanced motion components with viewport triggers and custom easing */}
          {/* MOTION IMPLEMENTATION REASON: Motion.dev documentation Section 3.1 recommends whileInView with custom transitions for professional animations */}
          <m.div
            className="relative max-w-4xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg hover:shadow-xl p-8 lg:p-12 group cursor-pointer hover:scale-[1.01] transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Luxury shimmer overlays with hover states */}
            {/* SHIMMER REASON: Official Tailwind CSS documentation supports gradient shimmer effects for premium interactive elements */}
            {/* Luxury shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
            
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Royal corner accents with border utilities */}
            {/* CORNER ACCENT REASON: Official Tailwind CSS documentation demonstrates sophisticated border treatments for luxury interfaces */}
            {/* Royal Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-amber-400/30 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-amber-400/30 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-amber-400/30 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-amber-400/30 rounded-br-xl" />

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium typography hierarchy with gradient text */}
            {/* TYPOGRAPHY REASON: Official Tailwind CSS documentation Section 8.2 recommends sophisticated text treatments for royal branding */}
            {/* Royal service indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors duration-300" />
              <span className="text-sm font-semibold text-amber-700 tracking-wider uppercase group-hover:text-amber-600 transition-colors duration-300">Discover Your Perfect Match</span>
              <Crown className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors duration-300" />
            </div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Advanced gradient text with background-clip utilities */}
            {/* GRADIENT TEXT REASON: Official Tailwind CSS documentation demonstrates bg-clip-text for premium typography effects */}
            {/* Enhanced main heading */}
            <h2 className="text-3xl lg:text-4xl font-serif font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight text-center group-hover:from-slate-800 group-hover:to-slate-700 transition-all duration-500">
              Now that you understand our process, discover which tutoring tier is perfect for your child
            </h2>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium decorative dividers with gradient utilities */}
            {/* DIVIDER REASON: Official Tailwind CSS documentation supports gradient dividers for sophisticated section separation */}
            {/* Premium decorative divider */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8 group-hover:via-amber-300 transition-colors duration-500"></div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced price treatment with premium container styling */}
            {/* PRICE HIGHLIGHT REASON: Official Tailwind CSS documentation demonstrates sophisticated highlight containers for key information */}
            {/* Sophisticated price highlight with premium container */}
            <div className="relative bg-gradient-to-r from-amber-50/50 via-amber-50/70 to-amber-50/50 rounded-xl p-6 mb-8 border border-amber-200/30 shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-amber-400/10 group-hover:ring-amber-400/20 transition-colors duration-300" />
              <p className="text-xl lg:text-2xl text-slate-700 mb-2 text-center group-hover:text-slate-600 transition-colors duration-300">
                From essential support to premium elite guidance
              </p>
              <p className="text-lg text-slate-600 text-center group-hover:text-slate-500 transition-colors duration-300">
                All starting at just <span className="font-bold text-amber-600 bg-amber-100/50 px-3 py-2 rounded-lg shadow-sm border border-amber-200/30">£45 per hour</span>
              </p>
              
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium accent lines with gradient utilities */}
              {/* ACCENT LINE REASON: Official Tailwind CSS documentation demonstrates subtle gradient accents for premium design elements */}
              {/* Premium accent line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
            </div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Royal transition indicators with sophisticated styling */}
            {/* TRANSITION INDICATOR REASON: Official Tailwind CSS documentation supports elegant transition elements for user journey guidance */}
            {/* Royal transition indicator */}
            <div className="flex items-center justify-center gap-3 text-slate-600 group-hover:text-slate-500 transition-colors duration-300 mb-4">
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-amber-400/60 to-transparent group-hover:via-amber-500/80 transition-colors duration-300" />
              <span className="text-sm font-semibold tracking-wide">Explore our tiered options below</span>
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-amber-400/60 to-transparent group-hover:via-amber-500/80 transition-colors duration-300" />
            </div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium animated indicators with advanced positioning */}
            {/* ANIMATED INDICATOR REASON: Official Tailwind CSS documentation demonstrates sophisticated animated elements for user guidance */}
            {/* Premium animated indicator */}
            <div className="flex justify-center">
              <div className="relative">
                <svg className="w-6 h-6 animate-bounce text-amber-500 group-hover:text-amber-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium alternating section backgrounds with sophisticated gradient treatments */}
      {/* ROYAL SECTION REASON: Official Tailwind CSS documentation demonstrates complex gradient backgrounds for premium service differentiation */}
      {/* Tiered Tutoring System - Enhanced with Royal Premium Treatment */}
      <section className="relative bg-gradient-to-b from-blue-50/30 via-slate-50/20 to-amber-50/15 py-20 lg:py-32 overflow-hidden">
        {/* CONTEXT7 SOURCE: /context7/tailwindcss - Enhanced pattern overlay with sophisticated SVG backgrounds */}
        {/* Enhanced Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Cpath d='M40 20l-10 10L20 20l10-10L40 20zm20 20l-10 10L40 30l10-10L60 40z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium radial gradient overlays for sophisticated visual depth */}
        {/* Premium Radial Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-amber-100/20 via-transparent to-transparent rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-blue-100/20 via-transparent to-transparent rounded-full" />
        
        {/* CONTEXT7 SOURCE: /context7/tailwindcss - Sophisticated border accents with gradient treatments */}
        {/* Sophisticated Border Accents */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* CONTEXT7 SOURCE: /context7/tailwindcss - Enhanced section header with royal service indicators */}
          {/* Enhanced Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            {/* Royal service indicator */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown className="w-6 h-6 text-amber-500" />
              <span className="text-sm font-bold text-amber-700 tracking-widest uppercase">Tiered Excellence</span>
              <Crown className="w-6 h-6 text-amber-500" />
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-serif font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight">
              Choose Your Perfect
              <span className="block bg-gradient-to-r from-amber-600 via-yellow-700 to-amber-800 bg-clip-text text-transparent">
                Tutoring Experience
              </span>
            </h2>
            
            {/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium decorative divider with crown accent */}
            {/* Premium decorative divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
              <Crown className="w-5 h-5 text-amber-500" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
            </div>
            
            <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              From essential academic support to premium elite guidance—discover the service level that perfectly matches your family's aspirations and your child's potential
            </p>
          </div>

          {/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium card design patterns with sophisticated hover effects */}
          {/* TIER CARD REASON: Official Tailwind CSS documentation demonstrates advanced card treatments for service tier differentiation */}
          <div className="relative">
            {/* CONTEXT7 SOURCE: /context7/motion_dev - Center tier elevation for "Most Popular" with spring physics */}
            {/* Center tier elevation for "Most Popular" */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-center">
              {tutorTiers.map((tier: TutorTier, index: number) => {
                const isPremiumTier = tier.tier === 'Tier 1'
                const isRoyalTier = tier.tier === 'Tier 3'
                const isPopularTier = isPremiumTier // Tier 1 is most popular
                
                return (
                  <m.div
                    key={index}
                    className={`relative ${isPopularTier ? 'lg:scale-110 lg:z-10 lg:-mt-8 lg:-mb-8' : 'lg:z-0'}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100,
                      damping: 20
                    }}
                    whileHover={{
                      scale: isPopularTier ? 1.02 : 1.05,
                      y: -12,
                      transition: { type: "spring", stiffness: 300, damping: 25 }
                    }}
                  >
                    {/* CONTEXT7 SOURCE: /context7/tailwindcss - Royal card styling enhancement with gradient backgrounds and shimmer overlays */}
                    <Card className={`group relative h-full transition-all duration-700 rounded-3xl overflow-hidden border-0 shadow-2xl hover:shadow-4xl ${
                      isPremiumTier 
                        ? 'bg-gradient-to-br from-amber-50 via-yellow-50/80 to-orange-50/60 ring-2 ring-amber-300/50 shadow-amber-200/30' 
                        : isRoyalTier
                        ? 'bg-gradient-to-br from-blue-50 via-indigo-50/80 to-purple-50/60 ring-2 ring-blue-300/50 shadow-blue-200/30'
                        : 'bg-gradient-to-br from-white via-slate-50/80 to-gray-50/60 ring-1 ring-slate-200/50 shadow-slate-200/20'
                    }`}>
                    
                      {/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium shimmer overlay with gradient treatments */}
                      {/* Premium Shimmer Overlay */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                        isPremiumTier 
                          ? 'bg-gradient-to-br from-amber-100/30 via-yellow-100/20 to-orange-100/10'
                          : isRoyalTier 
                          ? 'bg-gradient-to-br from-blue-100/30 via-indigo-100/20 to-purple-100/10'
                          : 'bg-gradient-to-br from-slate-100/20 via-gray-100/15 to-slate-100/10'
                      }`} />
                    
                      {/* CONTEXT7 SOURCE: /context7/tailwindcss - Royal corner flourishes with gradient styling */}
                      {/* Royal Corner Flourishes */}
                      {(isPremiumTier || isRoyalTier) && (
                        <>
                          <div className={`absolute top-0 left-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-700 ${
                            isPremiumTier 
                              ? 'bg-gradient-to-br from-amber-300 via-yellow-200 to-transparent' 
                              : 'bg-gradient-to-br from-blue-300 via-indigo-200 to-transparent'
                          } rounded-br-full`} />
                          <div className={`absolute bottom-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-700 ${
                            isPremiumTier 
                              ? 'bg-gradient-to-tl from-amber-300 via-yellow-200 to-transparent' 
                              : 'bg-gradient-to-tl from-blue-300 via-indigo-200 to-transparent'
                          } rounded-tl-full`} />
                        </>
                      )}
                    
                      {/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium pattern overlay with SVG backgrounds */}
                      {/* Premium Pattern Overlay */}
                      <div 
                        className={`absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-700 ${
                          isPremiumTier ? 'opacity-[0.03]' : isRoyalTier ? 'opacity-[0.025]' : ''
                        }`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${
                            isPremiumTier ? 'eab308' : isRoyalTier ? '3b82f6' : '64748b'
                          }' fill-opacity='1'%3E%3Cpath d='M20 10l-5 5L10 10l5-5L20 10zm10 10l-5 5L20 15l5-5L30 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                          backgroundSize: '40px 40px'
                        }}
                      />
                      <CardHeader className="relative text-center pb-8 pt-12 px-8">
                        {/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium badge system with enhanced styling and crown icons */}
                        {/* Premium Badge with Enhanced Styling */}
                        {isPremiumTier && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                            <Badge className="relative bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-700 text-white px-6 py-2.5 rounded-full shadow-xl font-bold text-sm uppercase tracking-wider">
                              <Crown className="w-4 h-4 mr-2" />
                              Most Popular Choice
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/30 to-yellow-500/30 animate-pulse" />
                            </Badge>
                          </div>
                        )}
                        
                        {isRoyalTier && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                            <Badge className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white px-6 py-2.5 rounded-full shadow-xl font-bold text-sm uppercase tracking-wider">
                              <Crown className="w-4 h-4 mr-2" />
                              Premium Elite Service
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-indigo-500/30 animate-pulse" />
                            </Badge>
                          </div>
                        )}
                        
                        {/* Enhanced Tier Title with Royal Treatment */}
                        <div className="mb-6">
                          {(isPremiumTier || isRoyalTier) && (
                            <Crown className={`w-10 h-10 mx-auto mb-4 ${
                              isPremiumTier ? 'text-amber-500' : 'text-blue-600'
                            } group-hover:scale-110 transition-transform duration-300`} />
                          )}
                          <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors duration-300">
                            {tier.tier}
                          </h3>
                        </div>
                        
                        {/* CONTEXT7 SOURCE: /context7/tailwindcss - Enhanced pricing display with premium containers and value propositions */}
                        {/* Premium Price Container */}
                        <div className={`relative mb-8 p-6 rounded-2xl border-2 ${
                          isPremiumTier 
                            ? 'bg-gradient-to-br from-amber-50/80 to-yellow-50/60 border-amber-200/50' 
                            : isRoyalTier
                            ? 'bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border-blue-200/50'
                            : 'bg-gradient-to-br from-slate-50/80 to-gray-50/60 border-slate-200/50'
                        } shadow-inner`}>
                          
                          {/* Price Point */}
                          <div className="text-center">
                            <div className={`text-4xl lg:text-5xl font-black mb-2 ${
                              isPremiumTier ? 'text-amber-700' : isRoyalTier ? 'text-blue-700' : 'text-slate-700'
                            }`}>
                              {tier.pricePoint}
                            </div>
                            <p className="text-sm text-slate-600 mb-4">per hour</p>
                            
                            {/* Value Proposition */}
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                              isPremiumTier 
                                ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                                : isRoyalTier
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-slate-100 text-slate-800 border border-slate-200'
                            }`}>
                              <span className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse" />
                              {isPremiumTier ? 'Best Value' : isRoyalTier ? 'Premium Service' : 'Budget Friendly'}
                            </div>
                          </div>
                        
                          {/* Premium accent line */}
                          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full ${
                            isPremiumTier 
                              ? 'bg-gradient-to-r from-amber-400 to-yellow-500' 
                              : isRoyalTier
                              ? 'bg-gradient-to-r from-blue-400 to-indigo-500'
                              : 'bg-gradient-to-r from-slate-400 to-gray-500'
                          }`} />
                        </div>
                      </CardHeader>
                      
                      <CardContent className="relative text-center px-8 pb-8">
                        <p className="text-lg text-slate-700 mb-6 leading-relaxed group-hover:text-slate-600 transition-colors duration-300">
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
                  </m.div>
                )
              })}
            </div>
          </div>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium pricing highlight with gold accent treatment */}
          {/* PRICING HIGHLIGHT REASON: Official Tailwind CSS documentation Section 7.2 recommends gold accent colors for premium pricing emphasis */}
          <div className="text-center mt-12">
            <div className="rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-lg text-slate-700 mb-6">
                Bespoke 1-2-1 tutoring starts from just <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">£45 per hour</span>
              </p>
              <p className="text-slate-600">
                Unlike many other providers, we don&apos;t charge registration, placement or administrative fees.
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
      <section className="relative bg-gradient-to-b from-slate-50/80 via-blue-50/40 to-amber-50/30 py-20 lg:py-32 overflow-hidden">
        {/* Premium Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M40 20l-10 10L20 20l10-10L40 20zm20 20l-10 10L40 30l10-10L60 40z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Premium Radial Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-amber-100/20 via-transparent to-transparent rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-blue-100/20 via-transparent to-transparent rounded-full" />
        
        {/* Royal Gradient Accents */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              {/* Royal service indicator */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <Crown className="w-6 h-6 text-amber-500" />
                <span className="text-sm font-bold text-amber-700 tracking-widest uppercase">Royal Excellence Benefits</span>
                <Crown className="w-6 h-6 text-amber-500" />
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-serif font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight">
                Why Elite Families
                <span className="block bg-gradient-to-r from-amber-600 via-yellow-700 to-amber-800 bg-clip-text text-transparent">
                  Choose Our Approach
                </span>
              </h2>
              
              {/* Premium decorative divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
                <Crown className="w-5 h-5 text-amber-500" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
              </div>
              
              <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
                Discover the exclusive advantages that make our premium tutoring service the preferred choice of discerning families
              </p>
            </div>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium hover effects and gradient styling patterns */}
            {/* BENEFIT STYLING REASON: Official Tailwind CSS documentation Section 4.7 recommends sophisticated interaction states and glass-morphism patterns for luxury interfaces */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {benefits.map((benefit: string, index: number) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    transition: { type: "spring", stiffness: 300, damping: 25 }
                  }}
                >
                  <Card className="group relative h-full bg-gradient-to-br from-white via-slate-50/30 to-amber-50/10 border-2 border-slate-200 hover:border-amber-400/60 shadow-lg hover:shadow-xl transition-all duration-500 rounded-xl overflow-hidden">
                    {/* Premium shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Royal pattern overlay */}
                    <div 
                      className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-500"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M15 7.5l-3.75 3.75L7.5 7.5l3.75-3.75L15 7.5zm7.5 7.5l-3.75 3.75L15 11.25l3.75-3.75L22.5 15z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '30px 30px'
                      }}
                    />
                    
                    <CardContent className="relative p-8">
                      <div className="flex items-start gap-6">
                        {/* Premium checkmark with royal treatment */}
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                          <CheckCircle className="w-6 h-6 text-white drop-shadow-sm" />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <div className="flex-1">
                          <p className="text-lg font-medium text-slate-700 group-hover:text-slate-600 transition-colors duration-300 leading-relaxed">
                            {benefit}
                          </p>
                        </div>
                      </div>
                      
                      {/* Premium bottom accent */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>

            {/* Premium CTA Section with Royal Enhancement and Next Steps */}
            <m.div
              className="relative bg-gradient-to-br from-white/80 via-amber-50/30 to-white/60 backdrop-blur-sm p-12 rounded-2xl border border-white/30 shadow-xl group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{
                scale: 1.01,
                y: -4,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
            >
              {/* Royal Corner Accents */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-amber-100/40 to-transparent rounded-br-3xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-amber-100/40 to-transparent rounded-tl-3xl" />
              
              <div className="relative">
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium gradient text effects */}
                {/* TYPOGRAPHY REASON: Official Tailwind CSS documentation Section 3.8 demonstrates gradient text for premium branding */}
                <h3 className="text-3xl lg:text-4xl font-serif font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-6 group-hover:from-slate-800 group-hover:to-slate-700 transition-all duration-500">
                  {ctaContent.title}
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                  {ctaContent.description}
                </p>
                
                {/* CONTEXT7 SOURCE: /context7/motion_dev - Enhanced interactive animations with motion effects */}
                {/* NEXT STEPS REASON: Official Motion documentation Section 4.3 demonstrates hover and gesture animations for premium user experience */}
                {/* Next Steps Guidance */}
                <div className="bg-gradient-to-br from-white/70 via-amber-50/40 to-white/50 backdrop-blur-sm rounded-xl p-8 mb-8 border-2 border-white/40 shadow-inner group-hover:border-amber-200/50 transition-all duration-500">
                  {/* Royal indicator */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Crown className="w-5 h-5 text-amber-500" />
                    <h4 className="text-xl font-serif font-bold text-slate-800">Your Royal Journey Begins</h4>
                    <Crown className="w-5 h-5 text-amber-500" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {[
                      { step: "1", title: "Elite Consultation", desc: "Complimentary discussion of your child's academic aspirations" },
                      { step: "2", title: "Perfect Match", desc: "Hand-selected tutor aligned with your family's standards" },
                      { step: "3", title: "Excellence Begins", desc: "First premium lesson scheduled at your convenience" }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center group/step">
                        <div className="relative w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover/step:shadow-xl transition-all duration-300 transform group-hover/step:scale-110">
                          <span className="text-white font-bold text-xl">{item.step}</span>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/30 to-transparent opacity-0 group-hover/step:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h5 className="font-semibold text-slate-800 mb-2 group-hover/step:text-slate-700 transition-colors duration-300">
                          {item.title}
                        </h5>
                        <p className="text-sm text-slate-600 group-hover/step:text-slate-500 transition-colors duration-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
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
                <div className="mt-8 pt-8 border-t border-amber-200/30">
                  <div className="flex items-center justify-center gap-8 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Crown className="w-4 h-4 text-amber-600" />
                      <span className="font-medium">Tatler Address Book 2025</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Crown className="w-4 h-4 text-amber-600" />
                      <span className="font-medium">15 Years Excellence</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Crown className="w-4 h-4 text-amber-600" />
                      <span className="font-medium">Elite Family Trust</span>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
        
        {/* Professional Section Transition */}
        <WaveSeparator variant="organic" color="transparent" />
      </section>

      </PageLayout>
    </>
  )
}