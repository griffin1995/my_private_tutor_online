"use client"

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// CLAUDE.md rule 42: PageLayout → PageHero → Section structure

interface PageHeroProps {
  children: ReactNode
  className?: string
  background?: 'white' | 'gradient' | 'image' | 'video'
  backgroundImage?: string
  backgroundVideo?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  alignment?: 'left' | 'center' | 'right'
  verticalAlignment?: 'top' | 'center' | 'bottom'
  overlay?: boolean
  overlayOpacity?: 'light' | 'medium' | 'dark'
}

export function PageHero({
  children,
  className,
  background = 'gradient',
  backgroundImage,
  backgroundVideo,
  size = 'lg',
  alignment = 'center',
  verticalAlignment = 'center',
  overlay = false,
  overlayOpacity = 'medium'
}: PageHeroProps) {

  const sizeClasses = {
    sm: 'min-h-[400px] py-16',
    md: 'min-h-[500px] py-20',
    lg: 'min-h-[600px] py-24',
    xl: 'min-h-[700px] py-32',
    full: 'min-h-screen py-32'
  }

  const backgroundClasses = {
    white: 'bg-white',
    gradient: 'bg-gradient-to-br from-white via-primary-50 to-accent-50',
    image: 'bg-cover bg-center bg-no-repeat',
    video: 'relative overflow-hidden'
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  const verticalAlignmentClasses = {
    top: 'justify-start items-start',
    center: 'justify-center items-center',
    bottom: 'justify-end items-end'
  }

  const overlayClasses = {
    light: 'bg-black/20',
    medium: 'bg-black/40',
    dark: 'bg-black/60'
  }

  return (
    <section 
      className={cn(
        'relative flex',
        sizeClasses[size],
        backgroundClasses[background],
        verticalAlignmentClasses[verticalAlignment],
        className
      )}
      style={{
        backgroundImage: background === 'image' && backgroundImage ? `url(${backgroundImage})` : undefined
      }}
      role="banner"
      aria-label="Page hero section"
    >
      
      {/* Background Video */}
      {background === 'video' && backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Overlay */}
      {overlay && (
        <div className={cn('absolute inset-0 z-10', overlayClasses[overlayOpacity])} />
      )}

      {/* Content Container */}
      <div className="relative z-20 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('max-w-4xl mx-auto', alignmentClasses[alignment])}>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

// Export types for documentation
export type PageHeroBackground = 'white' | 'gradient' | 'image' | 'video'
export type PageHeroSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type PageHeroAlignment = 'left' | 'center' | 'right'
export type PageHeroVerticalAlignment = 'top' | 'center' | 'bottom'
export type PageHeroOverlayOpacity = 'light' | 'medium' | 'dark'