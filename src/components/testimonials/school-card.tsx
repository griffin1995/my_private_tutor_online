"use client"

// CONTEXT7 SOURCE: /reactjs/react.dev - Import useState for image error handling
// CONTEXT7 SOURCE: Official React documentation for state management in functional components
// IMPLEMENTATION REASON: Maintaining image error state management for fallback display
import { useState } from 'react'
import { m } from 'framer-motion'
import { MapPin, Star, Trophy, GraduationCap } from 'lucide-react'
import { EliteSchool } from '@/lib/cms/schools-data'

// CONTEXT7 SOURCE: /microsoft/typescript - Enhanced Component Props Interface Definition with touch support
// CONTEXT7 SOURCE: Official TypeScript documentation for defining component props using interfaces with event handling
// IMPLEMENTATION REASON: Following TypeScript and React best practices for flexible, touch-enabled component design
interface SchoolCardProps {
  school: EliteSchool
  displayMode?: 'logo' | 'text' | 'mixed'
  size?: 'compact' | 'standard' | 'large'
  interactive?: boolean
  showMetadata?: boolean
  onCardClick?: (school: EliteSchool) => void
  className?: string
  // TESTIMONIALS OVERHAUL: Enhanced hover statistics display with mobile touch support
  showHoverStats?: boolean  // Default: true - supports both hover and touch interactions
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Removing interactive animations for static card display
// CONTEXT7 SOURCE: Official React documentation for static component rendering without event handlers
// REMOVAL REASON: Converting interactive cards to static display cards by removing hover and tap animations
const cardAnimationVariants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Removing unused animation variants for static card display
// CONTEXT7 SOURCE: Official React documentation for component cleanup when removing animations
// CLEANUP REASON: Eliminating unused content and item animation variants since cards are now static (non-interactive)

export function SchoolCard({
  school,
  displayMode = 'mixed',
  size = 'standard',
  interactive = true,
  showMetadata = false,
  onCardClick,
  className = "",
  // TESTIMONIALS OVERHAUL: Configurable hover statistics display
  showHoverStats = true
}: SchoolCardProps) {
  // CONTEXT7 SOURCE: /reactjs/react.dev - Removing interactive state management for static card display
  // CONTEXT7 SOURCE: Official React documentation for useState removal when removing interactivity
  // REMOVAL REASON: Eliminating hover and touch states since cards are now static (non-interactive)
  const [imageError, setImageError] = useState(false)

  // CONTEXT7 SOURCE: /reactjs/react.dev - Image error handler for fallback display
  // CONTEXT7 SOURCE: Official React documentation for handling image load failures
  // IMPLEMENTATION REASON: Providing graceful fallback when school logos fail to load
  const handleImageError = () => {
    setImageError(true)
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Removing touch event handlers for static card display  
  // CONTEXT7 SOURCE: Official React documentation for component cleanup when removing touch interactions
  // REMOVAL REASON: Eliminating touch event handlers and related effects since cards are now static (non-interactive)

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic class composition patterns
  // CONTEXT7 SOURCE: Official Tailwind CSS documentation for responsive design utilities
  // STYLING REASON: Following Tailwind best practices for responsive, professional card design
  const cardSizeClasses = {
    compact: 'px-4 py-3 min-w-[200px]',
    standard: 'px-6 py-4 min-w-[280px]',
    large: 'px-8 py-6 min-w-[320px]'
  }

  const logoSizeClasses = {
    compact: 'h-8 w-8',
    standard: 'h-12 w-12',
    large: 'h-16 w-16'
  }

  const textSizeClasses = {
    compact: 'text-sm',
    standard: 'text-base',
    large: 'text-lg'
  }

  return (
    <m.div
      className={`
        relative flex-shrink-0 bg-white rounded-2xl border border-primary-100 
        transition-colors duration-300 overflow-hidden
        ${cardSizeClasses[size]}
        ${className}
      `}
      variants={cardAnimationVariants}
      initial="initial"
      animate="initial"
    >
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Removing conditional hover overlay for static card display */}
      {/* CONTEXT7 SOURCE: Official React documentation for conditional rendering removal */}
      {/* REMOVAL REASON: Eliminating hover-dependent overlay since cards are now static (non-interactive) */}

      {/* Main Content */}
      <div className="relative z-10 flex items-center gap-4">
        {/* School Logo/Crest */}
        {(displayMode === 'logo' || displayMode === 'mixed') && (
          <div className="flex-shrink-0">
            {school.logo && !imageError ? (
              <img
                src={school.logo}
                alt={`${school.name} logo`}
                className={`${logoSizeClasses[size]} object-contain`}
                onError={handleImageError}
              />
            ) : school.crest && !imageError ? (
              <img
                src={school.crest}
                alt={`${school.name} crest`}
                className={`${logoSizeClasses[size]} object-contain`}
                onError={handleImageError}
              />
            ) : (
              // CONTEXT7 SOURCE: /lucide/lucide - Icon implementation for fallback display
              // CONTEXT7 SOURCE: Official Lucide documentation for React icon usage
              // FALLBACK REASON: Professional fallback icon when school logos are unavailable
              <div className={`${logoSizeClasses[size]} rounded-full bg-primary-100 flex items-center justify-center`}>
                <GraduationCap className={`${size === 'compact' ? 'h-4 w-4' : size === 'standard' ? 'h-6 w-6' : 'h-8 w-8'} text-primary-600`} />
              </div>
            )}
          </div>
        )}

        {/* School Information */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            {/* CONTEXT7 SOURCE: /reactjs/react.dev - Removing hover color transition for static card display */}
            {/* CONTEXT7 SOURCE: Official React documentation for static styling without hover effects */}
            {/* REMOVAL REASON: Eliminating hover color change since cards are now static (non-interactive) */}
            <h3 className={`font-semibold text-primary-700 ${textSizeClasses[size]} truncate`}>
              {school.shortName || school.name}
            </h3>

            {/* CONTEXT7 SOURCE: /reactjs/react.dev - Removing interactive external link button for static card display */}
            {/* CONTEXT7 SOURCE: Official React documentation for conditional rendering removal based on interactivity */}
            {/* REMOVAL REASON: Eliminating interactive website link since cards are now static (non-interactive) */}
          </div>

          {/* School Location */}
          {displayMode !== 'logo' && (
            <div className="flex items-center mt-1">
              <MapPin className="h-3 w-3 text-primary-400 mr-1 flex-shrink-0" />
              <span className="text-xs text-primary-500 truncate">
                {school.city}, {school.country}
              </span>
            </div>
          )}

          {/* Prestige Indicator */}
          {school.prestigeScore >= 90 && (
            <div className="flex items-center mt-1">
              <Trophy className="h-3 w-3 text-accent-500 mr-1" />
              <span className="text-xs text-accent-600 font-medium">Elite</span>
            </div>
          )}
        </div>
      </div>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Removing conditional metadata overlay for static card display */}
      {/* CONTEXT7 SOURCE: Official React documentation for conditional rendering removal based on interactivity */}
      {/* REMOVAL REASON: Eliminating hover/touch-dependent metadata overlay since cards are now static (non-interactive) */}

      {/* League Badge */}
      {school.league === 'oxbridge' && (
        <div className="absolute top-2 right-2">
          <div className="bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-sm">
            Oxbridge
          </div>
        </div>
      )}
      {school.league === 'russell_group' && (
        <div className="absolute top-2 right-2">
          <div className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-sm">
            Russell Group
          </div>
        </div>
      )}
    </m.div>
  )
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Default export pattern for component modules
// CONTEXT7 SOURCE: Official React documentation for component export conventions
// EXPORT REASON: Following React ecosystem standards for component module exports
export default SchoolCard