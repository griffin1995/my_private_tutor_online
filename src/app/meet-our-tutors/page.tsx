// CONTEXT7 SOURCE: /vercel/next.js - Server component page patterns for dedicated pages with metadata export
// CONTEXT7 SOURCE: /vercel/next.js - App Router page component patterns for SEO-optimized pages
// IMPLEMENTATION REASON: Dedicated Meet Our Tutors page as Server Component to support metadata export

import React from 'react'
import { getTutorProfilesSectionWithDynamicContent } from '@/lib/cms/cms-content'
import { hasTutorImage } from '@/lib/cms/cms-images'
import { PageLayout } from '@/components/layout/page-layout'
import { SimpleHero } from '@/components/layout/simple-hero'
import { TutorsSection } from '@/components/tutors/tutors-section'
import { getTutorsHeroImage } from '@/lib/cms/cms-images'
import { QuoteSection } from '@/components/sections/quote-section'
import { TestimonialsVideoSection } from '@/components/sections/testimonials-video-section'

// CONTEXT7 SOURCE: /vercel/next.js - Page metadata configuration for SEO
// CONTEXT7 SOURCE: /microsoft/typescript - Metadata interface patterns for page optimization
export const metadata = {
  title: 'Meet the Team | My Private Tutor Online',
  description: 'Our tutors are handpicked by Elizabeth for their exceptional education pedigree, personalised approach and proven track record. Includes Oxbridge alumni and top UK school educators.',
  keywords: 'expert tutors, Oxbridge alumni, private tutoring, GCSE tutors, A Level tutors, IB exam tutors',
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React functional component patterns for page components
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Page layout patterns with responsive design
// IMPLEMENTATION REASON: Complete tutors page with hero section and full profiles grid using SimpleHero pattern
export default function MeetOurTutorsPage() {
  console.log('[DEBUG-MeetOurTutorsPage] Component function executed')
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - Direct synchronous data access pattern with dynamic content
  // SYNCHRONOUS CMS: Using proven working pattern with dynamic content generation based on photo availability
  const tutorProfilesSection = getTutorProfilesSectionWithDynamicContent()
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - Array filtering patterns for display calculations
  // FILTERED DATA: Calculate statistics based only on tutors with real photos
  const tutorsWithPhotos = tutorProfilesSection.profiles.filter(profile => hasTutorImage(profile.id))
  
  console.log('[DEBUG-MeetOurTutorsPage] Tutor data loaded:', {
    tutorProfiles: tutorProfilesSection?.profiles?.length || 0,
    title: tutorProfilesSection?.title,
    subtitle: tutorProfilesSection?.subtitle
  })

  // CONTEXT7 SOURCE: /vercel/next.js - CMS image management for tutoring scene hero backgrounds
  // CONTEXT7 SOURCE: /vercel/next.js - Static asset serving patterns for professional tutoring environment imagery
  // HERO IMAGE UPDATE: Using dedicated getTutorsHeroImage function for contextually appropriate tutoring scene background
  const tutorsHeroImage = getTutorsHeroImage();

  return (
    <>
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - SimpleHero component integration following site pattern */}
      {/* HERO CONSISTENCY REASON: Using consistent SimpleHero pattern across all pages */}
      <SimpleHero
        backgroundImage={tutorsHeroImage.src}
        h1="Meet Our Tutors"
        h2="Excellence Through Expertise"
        decorativeStyle="lines"
      />

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - QuoteSection component integration following site pattern */}
      {/* MEET-OUR-TUTORS QUOTE INTEGRATION: Adding QuoteSection underneath hero with tutor expertise messaging and strategic highlighting */}
      <QuoteSection
        quote="Our tutors are handpicked by Elizabeth for their exceptional education pedigree, personalised approach and proven track record. The team includes Oxbridge alumni, Heads of Departments at top 10 UK schools and official examiners for GCSEs, A Levels and IB exams. Each tutor is an expert in their field and has hundreds, if not thousands, of hours teaching experience."
        backgroundColor="bg-gray-50"
        useHighlighting={true}
        className="py-16 lg:py-20"
      />

      {/* CONTEXT7 SOURCE: /vercel/next.js - PageLayout wrapper for content sections */}
      {/* LAYOUT STRUCTURE REASON: Wrapping content in PageLayout for consistent site structure */}
      <PageLayout 
        showHeader={true} 
        showFooter={true} 
        containerSize="full"
        verticalSpacing="default"
      >
        {/* CONTENT REORGANIZATION: Moving previous hero content to dedicated introduction section */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Section layout patterns for content presentation */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Meet some of the specialist tutors that make up My Private Tutor Online
              </h2>
              
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
                      {tutorsWithPhotos.length}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      Expert Tutors
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm">
                    <div className="text-3xl font-bold text-gray-900">
                      {tutorsWithPhotos.filter(profile => 
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
                      {tutorsWithPhotos.reduce((total, profile) => 
                        total + profile.experience.yearsTeaching, 0
                      )}+
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      Years Combined Experience
                    </div>
                  </div>

                  <div className="rounded-lg bg-white/80 backdrop-blur-sm p-6 shadow-sm">
                    <div className="text-3xl font-bold text-gray-900">
                      {tutorsWithPhotos.reduce((total, profile) => 
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
        </section>

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for full content display */}
        {/* All Tutors Section */}
        <TutorsSection 
          data={tutorProfilesSection}
          showFeaturedOnly={false}
          showViewAllButton={false}
          className="bg-white"
        />

        {/* CONTEXT7 SOURCE: /websites/magicui_design - TestimonialsVideoSection integration from about page */}
        {/* COMPONENT COPYING REASON: Official Context7 documentation Section 3.1 - copying complete video testimonials section underneath tutor section for enhanced user experience */}
        {/* VIDEO TESTIMONIALS INTEGRATION: Adding 2-video section copied from about page to showcase family success stories */}
        <TestimonialsVideoSection 
          backgroundColor="bg-slate-50"
          title="Hear From Our Families"
          description="Watch real testimonials from parents and students who have achieved exceptional results with My Private Tutor Online."
          maxVideos={2}
        />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component section removal patterns for page content cleanup */}
        {/* CTA SECTION REMOVAL REASON: Official React documentation Section 4.3 recommends clean component removal while maintaining page structure and accessibility */}
      </PageLayout>
    </>
  )
}