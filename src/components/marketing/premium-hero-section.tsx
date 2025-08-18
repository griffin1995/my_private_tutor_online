"use client"

import { PlayCircle, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getHeroContent, getHeroImage, getIntroVideo } from '@/lib/cms'
import { cn } from '@/lib/utils'
import { SynchronizedScrollIndicator } from '@/components/ui/synchronized-scroll-indicator'

// CMS DATA SOURCE: Using getHeroContent for hero section content
// CMS DATA SOURCE: Using getHeroImage and getIntroVideo for hero media

interface PremiumHeroSectionProps {
  className?: string
  variant?: 'default' | 'video' | 'split'
  showScrollIndicator?: boolean
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
}

export function PremiumHeroSection({
  className,
  variant = 'split',
  showScrollIndicator = true,
  onPrimaryAction,
  onSecondaryAction
}: PremiumHeroSectionProps) {
  // CMS DATA SOURCE: Using getHeroContent for hero text and actions
  const heroContent = getHeroContent()
  const heroImage = getHeroImage()
  const introVideo = getIntroVideo()

  const containerClasses = {
    default: 'relative min-h-screen flex items-center justify-center text-center px-4',
    video: 'relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden',
    split: 'relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16 px-4 sm:px-6 lg:px-8'
  }

  const contentClasses = {
    default: 'max-w-4xl mx-auto z-10',
    video: 'max-w-4xl mx-auto z-10 text-white',
    split: 'space-y-8 lg:pr-8'
  }

  const titleClasses = {
    default: 'font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight mb-6',
    video: 'font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg',
    split: 'font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 leading-tight'
  }

  const descriptionClasses = {
    default: 'text-lg md:text-xl text-primary-600 leading-relaxed mb-8 max-w-2xl mx-auto',
    video: 'text-lg md:text-xl text-white leading-relaxed mb-8 max-w-2xl mx-auto drop-shadow-md',
    split: 'text-lg md:text-xl text-primary-600 leading-relaxed'
  }

  return (
    <div className={cn('bg-gradient-to-br from-white via-primary-50 to-accent-50', className)}>
      <div className={cn('container mx-auto', containerClasses[variant])}>
        
        {/* Background Video for video variant */}
        {variant === 'video' && (
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster={heroImage.src}
            >
              <source src={introVideo.src} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-primary-900/60" />
          </div>
        )}

        {/* Content Section */}
        <div className={cn(contentClasses[variant])}>
          <div className="space-y-6">
            
            {/* Premium Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full text-white text-sm font-medium shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Featured in Tatler Address Book 2025
              </div>
            </div>

            {/* Main Heading */}
            <h1 
              className={cn(titleClasses[variant])}
              role="heading"
              aria-level={1}
            >
              {heroContent.title}
            </h1>

            {/* Description */}
            <p 
              className={cn(descriptionClasses[variant])}
              role="text"
            >
              {heroContent.description}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-gold group transform hover:scale-105 transition-all duration-300"
                onClick={onPrimaryAction}
                aria-label={heroContent.primaryButtonText}
              >
                {heroContent.primaryButtonText}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-primary-300 text-primary-700 hover:bg-primary-50 hover:border-primary-400 group"
                onClick={onSecondaryAction}
                aria-label={heroContent.secondaryButtonText}
              >
                <PlayCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                {heroContent.secondaryButtonText}
              </Button>
            </div>

            {/* Trust Indicators - Quick Stats */}
            <div className="pt-6 border-t border-primary-200/50">
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-primary-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-500 rounded-full" />
                  <span className="font-medium">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-500 rounded-full" />
                  <span className="font-medium">500+ Students Tutored</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-500 rounded-full" />
                  <span className="font-medium">94% Grade Improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image/Media Section for split variant */}
        {variant === 'split' && (
          <div className="relative lg:pl-8">
            <div className="relative group">
              {/* Main Hero Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-premium group-hover:shadow-royal transition-all duration-500">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  width={heroImage.width}
                  height={heroImage.height}
                  priority={heroImage.priority}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Video Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-primary-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={onSecondaryAction}
                    className="flex items-center justify-center w-16 h-16 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                    aria-label="Play introduction video"
                  >
                    <PlayCircle className="w-8 h-8 text-primary-700 ml-1" />
                  </button>
                </div>
              </div>

              {/* Floating Achievement Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-primary-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">73%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900 text-sm">Oxbridge Success</p>
                    <p className="text-primary-600 text-xs">Acceptance Rate</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-primary-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-royal-400 to-royal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A*</span>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900 text-sm">Grade Excellence</p>
                    <p className="text-primary-600 text-xs">Average Achievement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Synchronized Scroll Indicator with unified SCROLL text and vertical line animation */}
        {/* SYNCHRONIZATION ENHANCEMENT: Official Framer Motion documentation ensures perfect timing alignment between text and line elements */}
        <SynchronizedScrollIndicator 
          show={showScrollIndicator}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          text="SCROLL"
          speed={1}
          distance={40}
        />
      </div>
    </div>
  )
}

// Export variant props for documentation
export type PremiumHeroSectionVariant = 'default' | 'video' | 'split'