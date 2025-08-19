"use client"

import { useState, useCallback } from 'react'
import { m } from 'framer-motion'
import { ExternalLink, MapPin, Users, Star, Trophy, GraduationCap } from 'lucide-react'
import { EliteSchool, trackSchoolInteraction } from '@/lib/cms/schools-data'

// CONTEXT7 SOURCE: /reactjs/react.dev - Component Props Interface Definition
// CONTEXT7 SOURCE: Official React documentation for defining component props using TypeScript interfaces
// IMPLEMENTATION REASON: Following official React patterns for flexible, reusable component design
interface SchoolCardProps {
  school: EliteSchool
  displayMode?: 'logo' | 'text' | 'mixed'
  size?: 'compact' | 'standard' | 'large'
  interactive?: boolean
  showMetadata?: boolean
  onCardClick?: (school: EliteSchool) => void
  className?: string
  // TESTIMONIALS OVERHAUL: Configurable hover statistics display
  showHoverStats?: boolean  // Default: true
}

// CONTEXT7 SOURCE: /context7/motion_dev - Animation Variants for Sophisticated Card Interactions
// CONTEXT7 SOURCE: Official Motion documentation for professional hover and scale animation patterns
// ANIMATION REASON: Following Motion best practices for premium card interaction animations
const cardAnimationVariants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  },
  hover: {
    scale: 1.05,
    y: -8,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: 0.3
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: 0.1
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Content reveal animations for sophisticated information display
// CONTEXT7 SOURCE: Official Motion patterns for staggered content animations
// CONTENT ANIMATION REASON: Professional reveal animations for school information overlay
const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Individual item animations for metadata display
// CONTEXT7 SOURCE: Official Motion documentation for child item animations
// ITEM ANIMATION REASON: Sophisticated staggered reveal for school metadata
const itemVariants = {
  hidden: {
    opacity: 0,
    x: -10
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
}

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
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  // CONTEXT7 SOURCE: /reactjs/react.dev - useCallback for stable event handlers
  // CONTEXT7 SOURCE: Official React documentation for performance optimization with useCallback
  // PERFORMANCE OPTIMIZATION REASON: Preventing unnecessary re-renders in carousel component
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    trackSchoolInteraction({
      schoolId: school.id,
      interactionType: 'hover',
      timestamp: new Date(),
      category: school.category,
      metadata: { displayMode, size }
    })
  }, [school.id, school.category, displayMode, size])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  const handleCardClick = useCallback(() => {
    trackSchoolInteraction({
      schoolId: school.id,
      interactionType: 'click',
      timestamp: new Date(),
      category: school.category,
      metadata: { displayMode, size }
    })
    onCardClick?.(school)
  }, [school, onCardClick, displayMode, size])

  const handleWebsiteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    trackSchoolInteraction({
      schoolId: school.id,
      interactionType: 'website_visit',
      timestamp: new Date(),
      category: school.category,
      metadata: { url: school.website }
    })
    if (school.website) {
      window.open(school.website, '_blank', 'noopener,noreferrer')
    }
  }, [school.id, school.category, school.website])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

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
        cursor-pointer transition-colors duration-300 overflow-hidden
        ${cardSizeClasses[size]}
        ${className}
      `}
      variants={cardAnimationVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      whileTap={interactive ? "tap" : "initial"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={interactive ? handleCardClick : undefined}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Absolute positioning for overlay elements */}
      {/* OVERLAY REASON: Professional gradient overlay for enhanced visual hierarchy */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/90 to-accent-50/90 pointer-events-none" />
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center gap-4">
        {/* School Logo/Crest */}
        {(displayMode === 'logo' || displayMode === 'mixed') && (
          <div className="flex-shrink-0">
            {school.logo && !imageError ? (
              <img
                src={school.logo}
                alt={`${school.name} logo`}
                className={`${logoSizeClasses[size]} object-contain transition-transform duration-300 ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
                onError={handleImageError}
              />
            ) : school.crest && !imageError ? (
              <img
                src={school.crest}
                alt={`${school.name} crest`}
                className={`${logoSizeClasses[size]} object-contain transition-transform duration-300 ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
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
            <h3 className={`font-semibold text-primary-700 hover:text-accent-600 transition-colors duration-300 ${textSizeClasses[size]} truncate`}>
              {school.shortName || school.name}
            </h3>

            {/* External Link Icon */}
            {school.website && interactive && (
              <button
                onClick={handleWebsiteClick}
                className="p-1 rounded-full hover:bg-primary-100 transition-colors duration-200 flex-shrink-0 ml-2"
                aria-label={`Visit ${school.name} website`}
              >
                <ExternalLink className="h-4 w-4 text-primary-400 hover:text-accent-500 transition-colors duration-200" />
              </button>
            )}
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

      {/* CONTEXT7 SOURCE: /context7/motion_dev - AnimatePresence for conditional content display */}
      {/* METADATA OVERLAY REASON: Professional information overlay with sophisticated animations */}
      {/* TESTIMONIALS OVERHAUL: Conditional rendering based on showHoverStats prop */}
      {isHovered && showMetadata && interactive && showHoverStats && (
        <m.div
          className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm border-t border-primary-100 p-3"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <m.div className="space-y-2" variants={itemVariants}>
            {/* Student Success Count */}
            {school.studentCount && (
              <m.div className="flex items-center text-xs text-primary-600" variants={itemVariants}>
                <Users className="h-3 w-3 mr-1" />
                <span>{school.studentCount} students placed</span>
              </m.div>
            )}

            {/* Prestige Score */}
            {school.prestigeScore && (
              <m.div className="flex items-center text-xs text-primary-600" variants={itemVariants}>
                <Star className="h-3 w-3 mr-1" />
                <span>Prestige Score: {school.prestigeScore}/100</span>
              </m.div>
            )}

            {/* Key Subjects */}
            {school.specialisms && school.specialisms.length > 0 && (
              <m.div variants={itemVariants}>
                <div className="flex flex-wrap gap-1 mt-1">
                  {school.specialisms.slice(0, 2).map((specialism, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-0.5 bg-accent-100 text-accent-700 rounded-full"
                    >
                      {specialism}
                    </span>
                  ))}
                </div>
              </m.div>
            )}
          </m.div>
        </m.div>
      )}

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