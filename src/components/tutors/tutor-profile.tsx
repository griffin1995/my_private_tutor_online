// CONTEXT7 SOURCE: /reactjs/react.dev - Component prop interface patterns for tutor profile data
// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for tutor profile structured data
// IMPLEMENTATION REASON: Individual tutor profile card component following official React patterns
"use client"

import React from 'react'
import { TutorProfile } from '@/lib/cms/cms-content'
import { getImageAsset } from '@/lib/cms/cms-images'

// CONTEXT7 SOURCE: /reactjs/react.dev - Component prop interface patterns for tutor profile props
// CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface definitions for component props
interface TutorProfileCardProps {
  readonly profile: TutorProfile
  readonly featured?: boolean
  readonly className?: string
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React component composition patterns with props destructuring
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive grid layout components with mobile-first design
// IMPLEMENTATION REASON: Individual tutor profile card with professional presentation and responsive design
export const TutorProfileCard: React.FC<TutorProfileCardProps> = ({ 
  profile, 
  featured = false, 
  className = "" 
}) => {
  // CONTEXT7 SOURCE: /vercel/next.js - Static asset management patterns for tutor photos integration
  // CMS INTEGRATION: Using cms-images for consistent image handling with real tutor photos
  const tutorImage = getImageAsset("tutors", profile.image.key)

  return (
    <div 
      className={`
        group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 
        hover:shadow-lg hover:-translate-y-1 border border-gray-100
        ${featured ? 'ring-2 ring-orange-500/20' : ''}
        ${className}
      `}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive grid example with aspect ratio */}
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-medium text-white">
            Featured
          </span>
        </div>
      )}

      {/* Availability Badge */}
      {profile.availability && (
        <div className="absolute top-4 right-4 z-10">
          <span 
            className={`
              inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
              ${profile.availability.status === 'available' 
                ? 'bg-green-100 text-green-800' 
                : profile.availability.status === 'limited'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
              }
            `}
          >
            {profile.availability.status === 'available' && 'Available'}
            {profile.availability.status === 'limited' && 'Limited'}
            {profile.availability.status === 'unavailable' && 'Unavailable'}
          </span>
        </div>
      )}

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive marketing page component with mobile-first */}
      {/* Professional Headshot */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={tutorImage?.src || '/images/tutors/tutor-placeholder.jpg'}
          alt={profile.image.alt}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {/* Name and Title */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {profile.name}
          </h3>
          <p className="text-orange-600 font-medium">
            {profile.title}
          </p>
        </div>

        {/* Education */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>
              {profile.education.degree}, {profile.education.university}
              {profile.education.grade && ` (${profile.education.grade})`}
            </span>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{profile.experience.yearsTeaching} years teaching experience</span>
          </div>
          {profile.experience.totalStudents && (
            <p className="text-sm text-gray-600 ml-6">
              {profile.experience.totalStudents}+ students taught
            </p>
          )}
        </div>

        {/* Specializations */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Specializations:</h4>
          <div className="flex flex-wrap gap-2">
            {profile.specializations.slice(0, 4).map((specialization, index) => (
              <span 
                key={index}
                className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800"
              >
                {specialization}
              </span>
            ))}
            {profile.specializations.length > 4 && (
              <span className="inline-flex items-center text-xs text-gray-500">
                +{profile.specializations.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Bio Preview */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 line-clamp-3">
            {profile.bio}
          </p>
        </div>

        {/* Top Achievement */}
        {profile.achievements.length > 0 && (
          <div className="mb-6 p-3 bg-orange-50 rounded-lg">
            <div className="flex items-start">
              <svg className="mr-2 h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              <div>
                <h5 className="text-xs font-medium text-orange-800 mb-1">
                  {profile.achievements[0].title}
                </h5>
                <p className="text-xs text-orange-700">
                  {profile.achievements[0].description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* View Full Profile Button */}
        <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          View Full Profile
        </button>
      </div>
    </div>
  )
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React component export patterns for component library
export default TutorProfileCard