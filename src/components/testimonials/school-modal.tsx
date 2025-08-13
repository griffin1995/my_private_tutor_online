"use client"

import { useCallback, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Trophy, 
  GraduationCap,
  BookOpen,
  Target,
  Award,
  Globe
} from 'lucide-react'
import { EliteSchool, trackSchoolInteraction } from '@/lib/cms/schools-data'

// CONTEXT7 SOURCE: /reactjs/react.dev - Component Props Interface Definition  
// CONTEXT7 SOURCE: Official React documentation for modal component patterns
// IMPLEMENTATION REASON: Following React best practices for accessible modal design
interface SchoolModalProps {
  school: EliteSchool | null
  isOpen: boolean
  onClose: () => void
  className?: string
}

// CONTEXT7 SOURCE: /context7/motion_dev - Modal animation variants for professional presentation
// CONTEXT7 SOURCE: Official Motion documentation for modal and overlay animation patterns
// ANIMATION REASON: Following Motion best practices for sophisticated modal animations
const overlayVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 30
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.4
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Staggered content animations for modal sections
// CONTEXT7 SOURCE: Official Motion patterns for content reveal animations
// CONTENT ANIMATION REASON: Professional staggered reveal for modal content sections
const contentVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

export function SchoolModal({ school, isOpen, onClose, className = "" }: SchoolModalProps) {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useCallback for stable event handlers
  // CONTEXT7 SOURCE: Official React documentation for event handler optimization
  // PERFORMANCE OPTIMIZATION REASON: Preventing unnecessary re-renders in modal component
  const handleClose = useCallback(() => {
    if (school) {
      trackSchoolInteraction({
        schoolId: school.id,
        interactionType: 'modal_close',
        timestamp: new Date(),
        category: school.category,
        metadata: { closedByUser: true }
      })
    }
    onClose()
  }, [school, onClose])

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }, [handleClose])

  const handleWebsiteClick = useCallback(() => {
    if (school?.website) {
      trackSchoolInteraction({
        schoolId: school.id,
        interactionType: 'website_visit',
        timestamp: new Date(),
        category: school.category,
        metadata: { source: 'modal', url: school.website }
      })
      window.open(school.website, '_blank', 'noopener,noreferrer')
    }
  }, [school])

  const handleAdmissionsClick = useCallback(() => {
    if (school?.admissions) {
      trackSchoolInteraction({
        schoolId: school.id,
        interactionType: 'website_visit',
        timestamp: new Date(),
        category: school.category,
        metadata: { source: 'modal_admissions', url: school.admissions }
      })
      window.open(school.admissions, '_blank', 'noopener,noreferrer')
    }
  }, [school])

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for modal lifecycle management
  // CONTEXT7 SOURCE: Official React documentation for effect cleanup and body scroll management
  // ACCESSIBILITY REASON: Following accessibility best practices for modal focus and scroll management
  useEffect(() => {
    if (isOpen && school) {
      // Track modal open
      trackSchoolInteraction({
        schoolId: school.id,
        interactionType: 'modal_open',
        timestamp: new Date(),
        category: school.category
      })

      // Prevent body scroll
      document.body.style.overflow = 'hidden'
      
      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose()
        }
      }
      
      document.addEventListener('keydown', handleEscape)
      
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, school, handleClose])

  if (!school) return null

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - School category styling patterns
  // CONTEXT7 SOURCE: Official Tailwind CSS documentation for dynamic class composition
  // STYLING REASON: Following Tailwind best practices for category-based visual differentiation
  const categoryColors = {
    university: 'from-blue-600 to-purple-600',
    grammar: 'from-green-600 to-teal-600', 
    independent: 'from-amber-600 to-orange-600',
    international: 'from-rose-600 to-pink-600',
    specialist: 'from-indigo-600 to-blue-600'
  }

  const categoryIcons = {
    university: GraduationCap,
    grammar: BookOpen,
    independent: Trophy,
    international: Globe,
    specialist: Award
  }

  const CategoryIcon = categoryIcons[school.category]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 z-50 ${className}`}>
          {/* CONTEXT7 SOURCE: /context7/motion_dev - Overlay backdrop with professional blur effect */}
          {/* BACKDROP REASON: Following Motion patterns for sophisticated modal backdrop animations */}
          <m.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleOverlayClick}
          />

          {/* Modal Content */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <m.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header with School Branding */}
              <div className={`relative px-6 py-8 bg-gradient-to-r ${categoryColors[school.category]} text-white`}>
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* School Header */}
                <div className="flex items-start gap-6">
                  {/* School Logo/Crest */}
                  <div className="flex-shrink-0">
                    {school.logo ? (
                      <img
                        src={school.logo}
                        alt={`${school.name} logo`}
                        className="h-16 w-16 object-contain bg-white/10 rounded-xl p-2"
                      />
                    ) : school.crest ? (
                      <img
                        src={school.crest}
                        alt={`${school.name} crest`}
                        className="h-16 w-16 object-contain bg-white/10 rounded-xl p-2"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-xl bg-white/10 flex items-center justify-center">
                        <CategoryIcon className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>

                  {/* School Info */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-serif font-bold mb-2">{school.name}</h2>
                        <div className="flex items-center gap-4 text-white/90">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{school.location}</span>
                          </div>
                          {school.established && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span className="text-sm">Est. {school.established}</span>
                            </div>
                          )}
                        </div>
                        {school.motto && (
                          <p className="text-white/80 text-sm italic mt-2">"{school.motto}"</p>
                        )}
                      </div>

                      {/* League Badge */}
                      {school.league && (
                        <div className="bg-white/20 px-3 py-1 rounded-full">
                          <span className="text-sm font-medium capitalize">
                            {school.league.replace('_', ' ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                <m.div
                  className="p-6"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Description */}
                  {school.description && (
                    <m.section className="mb-8" variants={sectionVariants}>
                      <p className="text-primary-700 text-lg leading-relaxed">
                        {school.description}
                      </p>
                    </m.section>
                  )}

                  {/* Key Statistics */}
                  <m.section className="mb-8" variants={sectionVariants}>
                    <h3 className="text-xl font-serif font-bold text-primary-900 mb-4">Key Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {school.prestigeScore && (
                        <div className="text-center p-4 bg-primary-50 rounded-xl">
                          <Star className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-primary-900">{school.prestigeScore}</div>
                          <div className="text-sm text-primary-600">Prestige Score</div>
                        </div>
                      )}
                      {school.acceptanceRate && (
                        <div className="text-center p-4 bg-primary-50 rounded-xl">
                          <Target className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-primary-900">{school.acceptanceRate}%</div>
                          <div className="text-sm text-primary-600">Acceptance Rate</div>
                        </div>
                      )}
                      {school.studentCount && (
                        <div className="text-center p-4 bg-primary-50 rounded-xl">
                          <Users className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-primary-900">{school.studentCount}</div>
                          <div className="text-sm text-primary-600">Students Placed</div>
                        </div>
                      )}
                      {school.rankings?.national && (
                        <div className="text-center p-4 bg-primary-50 rounded-xl">
                          <Trophy className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-primary-900">#{school.rankings.national}</div>
                          <div className="text-sm text-primary-600">National Ranking</div>
                        </div>
                      )}
                    </div>
                  </m.section>

                  {/* Success Stories */}
                  {school.successStories && school.successStories.length > 0 && (
                    <m.section className="mb-8" variants={sectionVariants}>
                      <h3 className="text-xl font-serif font-bold text-primary-900 mb-4">Recent Success Stories</h3>
                      <div className="space-y-4">
                        {school.successStories.map((story, index) => (
                          <div key={index} className="bg-accent-50 rounded-xl p-4 border border-accent-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-accent-700">{story.year}</span>
                              <span className="bg-accent-500 text-white text-sm px-3 py-1 rounded-full">
                                {story.count} students
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {story.subjects.map((subject, subIndex) => (
                                <span
                                  key={subIndex}
                                  className="text-xs bg-white text-accent-600 px-2 py-1 rounded-full border border-accent-200"
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </m.section>
                  )}

                  {/* Key Subjects & Specialisms */}
                  {(school.subjects || school.specialisms) && (
                    <m.section className="mb-8" variants={sectionVariants}>
                      <h3 className="text-xl font-serif font-bold text-primary-900 mb-4">Academic Excellence</h3>
                      
                      {school.subjects && (
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-primary-700 mb-2">Key Subjects</h4>
                          <div className="flex flex-wrap gap-2">
                            {school.subjects.map((subject, index) => (
                              <span
                                key={index}
                                className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {school.specialisms && (
                        <div>
                          <h4 className="text-lg font-semibold text-primary-700 mb-2">Our Specialisms</h4>
                          <div className="flex flex-wrap gap-2">
                            {school.specialisms.map((specialism, index) => (
                              <span
                                key={index}
                                className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {specialism}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </m.section>
                  )}

                  {/* Entry Requirements */}
                  {school.entryRequirements && (
                    <m.section className="mb-8" variants={sectionVariants}>
                      <h3 className="text-xl font-serif font-bold text-primary-900 mb-4">Entry Requirements</h3>
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <p className="text-primary-700">{school.entryRequirements}</p>
                      </div>
                    </m.section>
                  )}
                </m.div>
              </div>

              {/* Footer Actions */}
              <div className="border-t border-primary-100 p-6 bg-primary-25">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  {school.admissions && (
                    <button
                      onClick={handleAdmissionsClick}
                      className="flex items-center justify-center px-6 py-3 bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors duration-200 font-semibold"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Admissions Information
                    </button>
                  )}
                  {school.website && (
                    <button
                      onClick={handleWebsiteClick}
                      className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200 font-semibold"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </button>
                  )}
                </div>
              </div>
            </m.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Default export pattern for component modules
// CONTEXT7 SOURCE: Official React documentation for component export conventions  
// EXPORT REASON: Following React ecosystem standards for component module exports
export default SchoolModal