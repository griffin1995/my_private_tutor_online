// CONTEXT7 SOURCE: /vercel/next.js - Server component page patterns for dedicated pages with metadata export
// CONTEXT7 SOURCE: /vercel/next.js - App Router page component patterns for SEO-optimized pages
// IMPLEMENTATION REASON: Dedicated Meet Our Tutors page as Server Component to support metadata export

import React from 'react'
import { getTutorProfilesSection } from '@/lib/cms/cms-content'
import { PageLayout } from '@/components/layout/page-layout'
import { TutorsSection } from '@/components/tutors/tutors-section'

// CONTEXT7 SOURCE: /vercel/next.js - Page metadata configuration for SEO
// CONTEXT7 SOURCE: /microsoft/typescript - Metadata interface patterns for page optimization
export const metadata = {
  title: 'Meet the Team | My Private Tutor Online',
  description: 'Our tutors are handpicked by Elizabeth for their exceptional education pedigree, personalised approach and proven track record. Includes Oxbridge alumni and top UK school educators.',
  keywords: 'expert tutors, Oxbridge alumni, private tutoring, GCSE tutors, A Level tutors, IB exam tutors',
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React functional component patterns for page components
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Page layout patterns with responsive design
// IMPLEMENTATION REASON: Complete tutors page with hero section and full profiles grid
export default function MeetOurTutorsPage() {
  console.log('[DEBUG-MeetOurTutorsPage] Component function executed')
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - Direct synchronous data access pattern
  // SYNCHRONOUS CMS: Using proven working pattern with direct function calls
  const tutorProfilesSection = getTutorProfilesSection()
  
  console.log('[DEBUG-MeetOurTutorsPage] Tutor data loaded:', {
    tutorProfiles: tutorProfilesSection?.profiles?.length || 0,
    title: tutorProfilesSection?.title,
    subtitle: tutorProfilesSection?.subtitle
  })

  return (
    <PageLayout 
      showHeader={true} 
      showFooter={true} 
      containerSize="full"
      verticalSpacing="default"
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Hero section patterns for dedicated pages */}
      {/* Page Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              MEET THE TEAM
            </h1>
            
            <p className="mt-6 text-xl font-medium text-orange-600">
              Meet some of the specialist tutors that make up My Private Tutor Online
            </p>
            
            <p className="mt-8 text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto">
              Our tutors are handpicked by Elizabeth for their exceptional education pedigree, personalised approach and proven track record.

              The team includes Oxbridge alumni, Heads of Departments at top 10 UK schools and official examiners for GCSEs, A Levels and IB exams.

              Each tutor is an expert in their field and has hundreds, if not thousands, of hours teaching experience.
            </p>

            {/* Stats Preview */}
            {tutorProfilesSection?.profiles && (
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">
                    {tutorProfilesSection.profiles.length}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Expert Tutors
                  </div>
                </div>
                
                <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">
                    {tutorProfilesSection.profiles.filter(profile => 
                      profile.education.university.includes('Cambridge') || 
                      profile.education.university.includes('Oxford')
                    ).length}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Oxbridge Graduates
                  </div>
                </div>

                <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">
                    {tutorProfilesSection.profiles.reduce((total, profile) => 
                      total + profile.experience.yearsTeaching, 0
                    )}+
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Years Combined Experience
                  </div>
                </div>

                <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">
                    {tutorProfilesSection.profiles.reduce((total, profile) => 
                      total + (profile.experience.totalStudents || 0), 0
                    )}+
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Students Taught
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />
        </div>
      </section>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for full content display */}
      {/* All Tutors Section */}
      <TutorsSection 
        data={tutorProfilesSection}
        showFeaturedOnly={false}
        showViewAllButton={false}
        className="bg-white"
      />

      {/* Contact CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Perfect Tutor?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Don't see what you're looking for? This is just a snapshot of our team.
              Drop us a line to find out more about a particular subject/tutor.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg transition-colors duration-200 bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Schedule a Consultation
              </a>
              <a
                href="https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg transition-colors duration-200 bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Request Information
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}