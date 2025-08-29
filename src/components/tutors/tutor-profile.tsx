// CONTEXT7 SOURCE: /radix-ui/primitives - Accordion component integration for expandable tutor profiles
// CONTEXT7 SOURCE: /reactjs/react.dev - Component prop interface patterns for tutor profile data
// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for tutor profile structured data
// CONTEXT7 SOURCE: /grx7/framer-motion - Animation patterns for background fade-in effects
// IMPLEMENTATION REASON: Accordion-based expandable tutor profile cards with circular images, transparent collapsed state, and animated background reveal
// REVISION REASON: Enhanced styling with larger images in collapsed state, transparent backgrounds, and smooth fade-in animations
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { TutorProfile } from '@/lib/cms/cms-content'
import { getImageAsset } from '@/lib/cms/cms-images'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// CONTEXT7 SOURCE: /reactjs/react.dev - Component prop interface patterns for tutor profile props
// CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface definitions for component props
interface TutorProfileCardProps {
  readonly profile: TutorProfile
  readonly featured?: boolean
  readonly className?: string
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Accordion-based expandable component design pattern
// CONTEXT7 SOURCE: /reactjs/react.dev - React component composition patterns with accordion integration
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive design with circular image presentation
// CONTEXT7 SOURCE: /grx7/framer-motion - useState hook for accordion state tracking for conditional styling
// IMPLEMENTATION REASON: Expandable tutor profile cards with circular images and accordion reveal functionality
// REVISION REASON: Enhanced with transparent collapsed state, larger images, and animated background fade-in
export const TutorProfileCard: React.FC<TutorProfileCardProps> = ({ 
  profile, 
  featured = false, 
  className = "" 
}) => {
  // CONTEXT7 SOURCE: /vercel/next.js - Static asset management patterns for tutor photos integration
  // CMS INTEGRATION: Using cms-images for consistent image handling with real tutor photos
  const tutorImage = getImageAsset("tutors", profile.image.key)

  // CONTEXT7 SOURCE: /reactjs/react.dev - useState hook for accordion state tracking
  // STATE MANAGEMENT: Track accordion open/closed state for conditional background styling
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <motion.div 
      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${className}`}
      // CONTEXT7 SOURCE: /grx7/framer-motion - Animate background appearance on expansion
      // ANIMATION REASON: Smooth background fade-in when accordion expands
      animate={{
        backgroundColor: isExpanded ? 'rgba(255, 255, 255, 1)' : 'transparent',
        boxShadow: isExpanded ? '0 1px 3px 0 rgb(0 0 0 / 0.1)' : '0 0 0 0 transparent',
        borderColor: isExpanded ? 'rgba(229, 231, 235, 1)' : 'transparent'
      }}
      style={{
        borderWidth: isExpanded ? '1px' : '0px'
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Accordion implementation with single collapsible item */}
      {/* ACCORDION IMPLEMENTATION: Single item accordion for expandable tutor profile cards */}
      <Accordion type="single" collapsible className="w-full" onValueChange={(value) => setIsExpanded(!!value)}>
        <AccordionItem value="tutor-profile" className="border-none">
          {/* CONTEXT7 SOURCE: /radix-ui/primitives - AccordionTrigger with simplified centered layout */}
          {/* REVISION REASON: Simplified collapsed state to show only circular photo, name, and title - removing subject badges and specialization previews */}
          <AccordionTrigger className="hover:no-underline p-6 [&>svg]:hidden">
            <div className="flex flex-col items-center space-y-3 w-full">
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Circular image design centered with hover effects */}
              {/* CIRCULAR IMAGE: Professional circular headshot centered in collapsed state - enlarged for enhanced visibility */}
              {/* REVISION REASON: Increased image size from w-20 h-20 to w-40 h-40 (160px) for better visual impact in collapsed state */}
              <div className="relative">
                <div className="w-40 h-40 rounded-full overflow-hidden ring-2 ring-gray-200 transition-all duration-300 group-hover:ring-orange-300">
                  <img
                    src={tutorImage?.src || '/images/tutors/tutor-placeholder.jpg'}
                    alt={profile.image.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Absolute positioning for featured badge */}
                {/* FEATURED BADGE: Orange indicator for featured tutors */}
                {featured && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Centered text layout for simplified collapsed state */}
              {/* TUTOR INFO: Name and title only, centered below image */}
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  {profile.name}
                </h3>
                <p className="text-orange-600 font-medium text-sm">
                  {profile.title}
                </p>
              </div>
              
              {/* CONTEXT7 SOURCE: /lucide-react - ChevronDown icon for accordion state indication */}
              {/* EXPAND INDICATOR: Custom chevron icon for accordion expansion state */}
              <div className="text-gray-400 transition-transform duration-300 data-[state=open]:rotate-180 mt-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </AccordionTrigger>
          
          {/* CONTEXT7 SOURCE: /radix-ui/primitives - AccordionContent with smooth animation */}
          {/* ACCORDION CONTENT: Expandable full tutor details with qualifications and experience */}
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-6">
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid layout for detailed information */}
              {/* DETAILED INFO: Complete education, experience, and qualification details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Education Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="mr-2 h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Education
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">{profile.education.degree}</span></p>
                    <p>{profile.education.university}</p>
                    {profile.education.grade && (
                      <p className="text-orange-600 font-medium">{profile.education.grade}</p>
                    )}
                    {profile.education.additionalQualifications && (
                      <div className="mt-2">
                        <p className="font-medium text-gray-700">Additional Qualifications:</p>
                        <ul className="list-disc list-inside ml-2">
                          {profile.education.additionalQualifications.map((qual, index) => (
                            <li key={index}>{qual}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Experience Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="mr-2 h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Experience
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">{profile.experience.yearsTeaching} years</span> teaching experience</p>
                    {profile.experience.totalStudents && (
                      <p>{profile.experience.totalStudents}+ students taught</p>
                    )}
                    {profile.experience.onlineHours && (
                      <p>{profile.experience.onlineHours}+ online tutoring hours</p>
                    )}
                    {profile.experience.eliteSchools && (
                      <div className="mt-2">
                        <p className="font-medium text-gray-700">Elite School Experience:</p>
                        <ul className="list-disc list-inside ml-2">
                          {profile.experience.eliteSchools.map((school, index) => (
                            <li key={index}>{school}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {profile.bio && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
                </div>
              )}

              {/* All Specializations */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">All Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((specialization, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center rounded-md bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700 border border-orange-200"
                    >
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {profile.achievements && profile.achievements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Achievement</h4>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex items-start">
                      <svg className="mr-2 h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h5 className="font-medium text-orange-800 mb-1">
                          {profile.achievements[0].title}
                        </h5>
                        <p className="text-sm text-orange-700">
                          {profile.achievements[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {profile.testimonial && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Student Testimonial</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <blockquote className="text-sm text-gray-600 italic mb-2">
                      "{profile.testimonial.quote}"
                    </blockquote>
                    <cite className="text-xs text-gray-500 font-medium">
                      — {profile.testimonial.author}
                      {profile.testimonial.context && (
                        <span className="font-normal">, {profile.testimonial.context}</span>
                      )}
                    </cite>
                  </div>
                </div>
              )}

              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Button component styling with hover effects */}
              {/* SINGLE CTA BUTTON: Book consultation or enquire about tutoring */}
              <div className="pt-4 border-t border-gray-100">
                <button className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-orange-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  Book Consultation with {profile.name.split(' ')[0]}
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  )
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React component export patterns for component library
export default TutorProfileCard