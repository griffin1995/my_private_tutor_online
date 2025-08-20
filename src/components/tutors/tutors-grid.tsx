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
  // CONTEXT7 SOURCE: /microsoft/typescript - Array filtering patterns with type safety
  // Filter and sort profiles based on featured status and display order
  const sortedProfiles = React.useMemo(() => {
    let filteredProfiles = [...profiles]

    // Sort by featured status first, then by order
    filteredProfiles.sort((a, b) => {
      if (showFeatured) {
        // Featured profiles first
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
      }
      // Then sort by order
      return a.order - b.order
    })

    // Limit profiles if specified
    if (maxProfiles) {
      filteredProfiles = filteredProfiles.slice(0, maxProfiles)
    }

    return filteredProfiles
  }, [profiles, showFeatured, maxProfiles])

  if (sortedProfiles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tutor profiles available.</p>
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

      {/* Show count if maxProfiles is set and there are more profiles */}
      {maxProfiles && profiles.length > maxProfiles && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Showing {maxProfiles} of {profiles.length} tutors
          </p>
        </div>
      )}
    </div>
  )
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React component export patterns for component library
export default TutorsGrid