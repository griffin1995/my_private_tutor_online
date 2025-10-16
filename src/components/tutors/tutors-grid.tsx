// CONTEXT7 SOURCE: /reactjs/react.dev - React component section interface patterns
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive grid layouts with viewport breakpoints
// IMPLEMENTATION REASON: Tutors grid component with responsive 3-column layout following official patterns
"use client"

import React from 'react'
import { TutorProfile } from '@/lib/cms/cms-content'
import { TutorProfileCard } from './tutor-profile'

// CONTEXT7 SOURCE: /reactjs/react.dev - Component prop interface patterns for grid components
// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for grid component props
interface TutorsGridProps {
  readonly profiles: readonly TutorProfile[]
  readonly showFeatured?: boolean
  readonly maxProfiles?: number
  readonly className?: string
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React component composition patterns with responsive grid
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive grid column layouts with Tailwind CSS
// IMPLEMENTATION REASON: Responsive grid layout for tutor profiles with mobile-first design
export const TutorsGrid: React.FC<TutorsGridProps> = ({ 
  profiles, 
  showFeatured = true,
  maxProfiles,
  className = ""
}) => {
  // CONTEXT7 SOURCE: /microsoft/typescript - Array filtering patterns with type safety and tier-based sorting
  // TIER SORTING REASON: Official TypeScript documentation demonstrates array sorting with custom comparator functions
  // Helper function to convert tier strings to numbers for sorting
  const getTierNumber = (tier?: string): number => {
    switch (tier) {
      case 'tier-one': return 1
      case 'tier-two': return 2  
      case 'tier-three': return 3
      default: return 999 // Unknown tiers go to end
    }
  }

  // Filter and sort profiles based on tier-based sorting (Tier 1, Tier 2, Tier 3)
  const sortedProfiles = React.useMemo(() => {
    let filteredProfiles = [...profiles]

    // CONTEXT7 SOURCE: /microsoft/typescript - Primary sorting by tier, secondary by featured status, tertiary by order
    // TIER SORTING IMPLEMENTATION: Official TypeScript documentation demonstrates multi-level array sorting patterns
    filteredProfiles.sort((a, b) => {
      // Primary sort: by tier (1, 2, 3)
      const tierA = getTierNumber(a.tier)
      const tierB = getTierNumber(b.tier)
      if (tierA !== tierB) {
        return tierA - tierB
      }

      // Secondary sort: by featured status (if showFeatured is enabled)
      if (showFeatured) {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
      }

      // Tertiary sort: by order
      return a.order - b.order
    })

    // Limit profiles if specified
    if (maxProfiles) {
      filteredProfiles = filteredProfiles.slice(0, maxProfiles)
    }

    return filteredProfiles
  }, [profiles, showFeatured, maxProfiles])

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling
  // LAYER BASE SYSTEM: Stripped text-gray-500 - provided by @layer base
  // ONLY KEEPING: Layout classes
  if (sortedProfiles.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No tutor profiles available.</p>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Implement responsive grid layouts with viewport breakpoints */}
      {/* Responsive Grid: 1 column mobile, 2 columns tablet, 3 columns desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {sortedProfiles.map((profile) => (
          <TutorProfileCard
            key={profile.id}
            profile={profile}
            featured={showFeatured && profile.featured}
            className="h-full"
          />
        ))}
      </div>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
      {/* LAYER BASE SYSTEM: Stripped text-sm, text-gray-600 - provided by @layer base */}
      {/* ONLY KEEPING: mb-4 for spacing */}
      {/* Show count if maxProfiles is set and there are more profiles */}
      {maxProfiles && profiles.length > maxProfiles && (
        <div className="mt-8 text-center">
          <p className="mb-4">
            Showing {maxProfiles} of {profiles.length} tutors
          </p>
        </div>
      )}
    </div>
  )
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React component export patterns for component library
export default TutorsGrid