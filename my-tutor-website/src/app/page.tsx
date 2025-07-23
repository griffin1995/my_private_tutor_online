"use client"

import { useState } from 'react'
import { Star, CheckCircle, Crown, Award, Users, ArrowRight } from 'lucide-react'
import { getHeroContent, getTrustIndicators, getResultsStatistics, getTestimonials } from '@/lib/cms'
import { getStudentImages, getOptimizedImageProps } from '@/lib/cms/cms-images'
import Image from 'next/image'
import { PageLayout } from '@/components/layout/page-layout'

// CMS DATA SOURCE: Using proper CMS functions for homepage content
const newHomepageContent = {
  hero: {
    title: "Expert Private Tutoring, Personally Curated by Elizabeth Burrows",
    subtitle: "Founded on trust. Built on results. Delivered by experts.",
    description: "For over fifteen years, Elizabeth and her team have provided world-class educational support to ambitious families. From key entry points such as the 7+, 8+, 11+, and 13+ through to GCSEs, A Levels, the IB and Pre-U, our tailored tuition ensures each student receives the highest level of academic guidance.",
    additionalText: "Our clients entrust us with more than results. Under our care, students develop a genuine love of learning, achieve exceptional outcomes, secure places at the UK's most prestigious schools and universities, and are empowered to realise their full potential.",
    videoSrc: "/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.mp4"
  },
  schoolShields: {
    title: "We help students place at top 10 UK schools and universities",
    schools: [
      "Eton College",
      "Westminster School", 
      "St Paul's School",
      "Highgate School",
      "Oxford University",
      "Cambridge University",
      "Imperial College London",
      "London School of Economics",
      "University College London",
      "King's College London"
    ]
  },
  aboutSection: {
    description: "At the heart of My Private Tutor Online is a singular vision: academic support that is both exceptional and deeply personal. Founded in 2010 by Elizabeth Burrows—a Cambridge-accepted educator and former Forbes journalist—the company began not as a business, but as a trusted network of elite colleagues she met throughout her international tutoring career.",
    continuedDescription: "What started as a circle of personal recommendations has since evolved—organically and exclusively—into one of the UK's most respected names in specialist private tutoring. As testament, My Private Tutor Online is honoured to be featured in Tatler's Address Book and recognised as School Guide UK's 'Top Pick' for private tuition.",
    finalDescription: "Today, the ethos remains the same: every tutor is handpicked, every match thoughtfully made, and every family accommodated directly by Elizabeth and her team."
  },
  results: {
    title: "Results that Speak for Themselves",
    stats: [
      "94% of students improve by at least two grades at GCSE",
      "11+ tutees routinely place in the top 2% of candidates", 
      "Dozens of offers to St Paul's, Highgate, Westminster, Eton, and more",
      "Placements secured at Institut Le Rosey and other elite international boarding schools",
      "Consistent success with Oxbridge and top Russell Group universities"
    ]
  },
  whyChooseUs: [
    {
      icon: "🤝",
      title: "Built on Trust",
      description: "Elizabeth only works with educators she knows, has taught alongside, or has personally vetted. Every tutor has a proven track record and aligns with our values of discretion, integrity, and academic rigour."
    },
    {
      icon: "🎓", 
      title: "Exam Insight from the Inside",
      description: "Our Tier 1 tutors are not just excellent teachers—they are the very examiners who actually write and/or mark the assessments your child will take. This insider perspective is rare and a distinct advantage in today's academic landscape."
    },
    {
      icon: "👑",
      title: "Discretion & Results for High-Profile Families", 
      description: "We have proudly helped families from prominent global households, including VIPs and royalty."
    },
    {
      icon: "🌍",
      title: "A Global Network, A Personal Touch",
      description: "While our families are based in London, Geneva, Dubai, New York, and beyond, our approach is never distant. Whether preparing for UK independent school entry or GCSE exams, your child is known, understood, and championed."
    }
  ],
  whoWeSupport: [
    "Primary and Secondary school learners, across all subjects",
    "Competitive UK school entry (4+, 7+, 11+, 13+, 16+)",
    "GCSE, A-Level and IB excellence", 
    "UCAS applications, including Oxbridge admissions",
    "Specialist exams (TMUA, LNAT, BMAT, SAT, ACT, IELTS)",
    "University level essay and thesis support"
  ],
  elizabethQuote: {
    text: "Parents come to us when something truly matters—an entrance exam, a lost sense of confidence, a desire for academic stretch. They stay with us because we deliver real progress, quietly and expertly. This is not a tutoring directory. This is a bespoke service for ambitious families looking for trusted partners in their child's academic career.",
    author: "Elizabeth Burrows, Founder"
  },
  tiers: [
    {
      tier: "Tier 3",
      description: "Exceptional graduates tutoring their specialist subject",
      bestFor: "Mentoring, subject confidence", 
      pricePoint: "Affordable"
    },
    {
      tier: "Tier 2", 
      description: "Qualified, experienced classroom teachers",
      bestFor: "Curriculum mastery, consistency",
      pricePoint: "Mid-range"
    },
    {
      tier: "Tier 1",
      description: "Official, accredited examiners and senior educators with extensive track records", 
      bestFor: "Top grades, exam strategy",
      pricePoint: "Premium"
    }
  ],
  testimonials: [
    "Elizabeth's team was the only one that actually delivered what they promised.",
    "Your tutors are next level. We couldn't have done it without you.",
    "Annika scored a 7 in her GCSE retake. We are thrilled—it's such an improvement on the 4 she got in summer.",
    "Thank you for making my child believe in themselves again.",
    "We were delighted to hear all three children were accepted into Le Rosey."
  ],
  howItWorks: [
    "Submit an enquiry or contact Elizabeth's team directly",
    "Schedule a personal consultation call with Elizabeth", 
    "Arrange an initial lesson to ensure it's a perfect match",
    "Start regular tutorials—with ongoing support from our personable team and regular progress updates via our tutoring platform"
  ]
}

export default function Home() {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false)
  
  // CMS DATA SOURCE: Using getHeroContent for hero section
  const heroContent = getHeroContent()
  // CMS DATA SOURCE: Using getTrustIndicators for credentials
  const trustIndicators = getTrustIndicators()
  // CMS DATA SOURCE: Using getResultsStatistics for results section  
  const resultsStats = getResultsStatistics()
  // CMS DATA SOURCE: Using getStudentImages for student photos
  const studentImages = getStudentImages()
  // CMS DATA SOURCE: Using getTestimonials for testimonials
  const testimonials = getTestimonials()

  const handleVideoPlay = () => {
    setIsVideoExpanded(true)
    setTimeout(() => {
      const video = document.querySelector('video')
      if (video) {
        video.play()
      }
    }, 300)
  }

  const handleVideoClose = () => {
    setIsVideoExpanded(false)
    const video = document.querySelector('video')
    if (video) {
      video.pause()
    }
  }

  return (
    <PageLayout background="white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-navy-50" aria-label="Hero section with introduction to My Private Tutor Online">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-navy-900 leading-tight mb-6">
                  {heroContent.title}
                </h1>
                <p className="text-xl text-gold-600 font-semibold mb-6">
                  {heroContent.subtitle}
                </p>
                <p className="text-lg text-navy-700 leading-relaxed mb-6">
                  {heroContent.description}
                </p>
                <p className="text-lg text-navy-700 leading-relaxed">
                  {newHomepageContent.hero.additionalText}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white font-semibold rounded-lg transition-colors" aria-label="Enquire about tutoring services">
                  Enquire Now
                </button>
                <button className="px-6 py-3 border border-navy-300 text-navy-700 hover:bg-navy-50 rounded-lg transition-colors" aria-label="Request a free consultation">
                  Request a Consultation
                </button>
              </div>
            </div>

            {/* Video Section */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative">
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden aspect-video max-w-lg">
                  <video
                    src={heroContent.videoPlaceholder}
                    className="w-full h-full object-cover"
                    controls={isVideoExpanded}
                    muted
                    playsInline
                    poster="/images/video-placeholders/placeholder_for_introductionary_video.png"
                  />
                  {!isVideoExpanded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button 
                        onClick={handleVideoPlay}
                        className="bg-gold-600 rounded-full p-4 shadow-xl hover:bg-gold-700 hover:scale-110 transition-all duration-300"
                      >
                        <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </div>
                  )}
                  {isVideoExpanded && (
                    <button 
                      onClick={handleVideoClose}
                      className="absolute top-4 right-4 bg-black/80 rounded-full p-2 text-white hover:bg-black transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Shields Section */}
      <section className="py-12 bg-white" aria-label="Elite schools and universities our students have placed at">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-navy-900 mb-8">
              {newHomepageContent.schoolShields.title}
            </h2>
            
            {/* Scrolling School Names */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll gap-8 text-navy-600">
                {[...newHomepageContent.schoolShields.schools, ...newHomepageContent.schoolShields.schools].map((school, index) => (
                  <div key={index} className="flex-shrink-0 font-medium">
                    {school}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <p className="text-lg text-navy-700 leading-relaxed">
                {newHomepageContent.aboutSection.description}
              </p>
              <p className="text-lg text-navy-700 leading-relaxed">
                {newHomepageContent.aboutSection.continuedDescription}
              </p>
              <p className="text-lg text-navy-700 leading-relaxed">
                {newHomepageContent.aboutSection.finalDescription}
              </p>
              
              {/* Credentials */}
              <div className="flex justify-center items-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <Crown className="w-6 h-6 text-gold-600" />
                  <span className="font-medium text-navy-900">Tatler Address Book</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-gold-600" />
                  <span className="font-medium text-navy-900">School Guide UK 'Top Pick'</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Academic results and success statistics">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-navy-900 mb-12">
              {newHomepageContent.results.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {resultsStats.map((stat, index) => {
                // CMS DATA SOURCE: Using studentImages with imageKey for result card images
                const studentImage = stat.imageKey ? studentImages[stat.imageKey as keyof typeof studentImages] : null
                
                return (
                  <div key={index} className="bg-white rounded-lg border border-navy-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    {/* Student Image */}
                    {studentImage && (
                      <div className="mb-4 overflow-hidden">
                        <Image
                          {...getOptimizedImageProps(studentImage, '(max-width: 768px) 100vw, 25vw')}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Statistics */}
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-navy-900 mb-2">{stat.number}</div>
                      <h3 className="text-lg font-semibold text-navy-900 mb-2">{stat.label}</h3>
                      <p className="text-navy-700 text-sm">{stat.description}</p>
                    </div>
                    
                    <CheckCircle className="w-6 h-6 text-gold-600 mx-auto" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Families Choose Us */}
      <section className="py-16 lg:py-24 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-navy-900 mb-12">
              Why Families Choose Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {newHomepageContent.whyChooseUs.map((reason, index) => (
                <div key={index} className="bg-white rounded-lg border border-navy-200 p-8 text-left h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{reason.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-3">{reason.title}</h3>
                      <p className="text-navy-700 leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
              This Is Tutoring at Its Best
            </h2>
            <p className="text-xl text-gold-300 mb-8">
              Exact. Effective. Empowering.
            </p>
            <p className="text-lg text-navy-300 mb-8 max-w-2xl mx-auto">
              From prep school entry to Oxbridge preparation, My Private Tutor Online delivers expert tuition for exceptional futures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gold-600 hover:bg-gold-700 text-white font-semibold rounded-lg transition-colors">
                Contact Elizabeth's Team
              </button>
              <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-navy-900 rounded-lg transition-colors">
                Request a Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}