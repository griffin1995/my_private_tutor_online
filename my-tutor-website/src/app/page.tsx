"use client"

import { useState, useEffect } from 'react'
import { CheckCircle, Crown, Award } from 'lucide-react'
import { getHeroContent, getResultsStatistics } from '@/lib/cms'
import { getStudentImages, getOptimizedImageProps } from '@/lib/cms/cms-images'
import Image from 'next/image'
import Link from 'next/link'
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog'
import { IconCloud } from '@/components/magicui/icon-cloud'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { VideoText } from '@/components/magicui/video-text'

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
  educationalOptions: {
    title: "Educational Paths We Support",
    options: [
      {
        title: "Primary School Excellence",
        description: "Building strong foundations with our carefully selected tutors who specialise in early years education and 11+ preparation.",
        imageKey: "student-child"
      },
      {
        title: "GCSE Success",
        description: "Comprehensive support across all GCSE subjects with our expert tutors, many of whom are official examiners.",
        imageKey: "student-teenager"  
      },
      {
        title: "A-Level Achievement", 
        description: "Advanced level tutoring designed to secure top grades and university placements with our Oxbridge graduate tutors.",
        imageKey: "student-university"
      },
      {
        title: "University Admissions",
        description: "Oxbridge and Russell Group application support including interview preparation and personal statement guidance.",
        imageKey: "student-oxbridge"
      }
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
  const [isScrolled, setIsScrolled] = useState(false)
  
  // CMS DATA SOURCE: Using getHeroContent for hero section
  const heroContent = getHeroContent()
  // CMS DATA SOURCE: Using educational options for tutoring paths section  
  const educationalOptions = newHomepageContent.educationalOptions.options
  // CMS DATA SOURCE: Using getStudentImages for student photos
  const studentImages = getStudentImages()

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Transparent Navbar with Scroll Effect */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3 group">
                <span className={`font-serif text-lg lg:text-xl font-bold transition-colours duration-300 ${
                  isScrolled ? 'text-primary-900' : 'text-white'
                }`}>
                  My Private Tutor Online
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { name: 'How It Works', href: '/how-it-works' },
                { name: 'Subject Tuition', href: '/subject-tuition' },
                { name: 'Masterclasses', href: '/video-masterclasses' },
                { name: 'About Us', href: '/about-us' },
                { name: 'FAQ', href: '/faq' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colours duration-300 hover:text-accent-400 ${
                    isScrolled ? 'text-primary-700' : 'text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex">
              <ShinyButton 
                text="Book Consultation" 
                className="px-6 py-3 h-auto"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Full Viewport Hero Section */}
      <section className="relative h-screen w-full bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center" aria-label="Hero section with introduction to My Private Tutor Online">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/hero/child_book_and_laptop.avif')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-primary-900/60"></div>
        
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <VideoText 
                    text={heroContent.title}
                    duration={3000}
                    framerProps={{
                      hidden: { opacity: 0, y: 20 },
                      show: { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          staggerChildren: 0.05,
                          duration: 0.8
                        }
                      },
                    }}
                    className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight mb-6"
                  />
                  <p className="text-xl text-accent-400 font-semibold mb-6">
                    {heroContent.subtitle}
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed mb-6">
                    {heroContent.description}
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {newHomepageContent.hero.additionalText}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <ShinyButton 
                    text="Enquire Now"
                    className="px-8 py-4 h-auto"
                  />
                  <InteractiveHoverButton 
                    text="Request a Consultation"
                    className="px-8 py-4 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary-900"
                  />
                </div>
              </div>

              {/* Video Section */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative max-w-lg w-full">
                  <HeroVideoDialog
                    animationStyle="from-center"
                    videoSrc="/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.mp4"
                    thumbnailSrc="/images/video-placeholders/placeholder_for_introductionary_video.png"
                    thumbnailAlt="Elizabeth Burrows introduces My Private Tutor Online"
                    className="w-full aspect-video rounded-2xl shadow-2xl overflow-hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Shields Section - Full Width */}
      <section className="py-16 bg-transparent" aria-label="Elite schools and universities our students have placed at">
        <div className="w-full overflow-hidden bg-transparent py-6">
          <div className="flex animate-scroll gap-16 whitespace-nowrap">
            {[...newHomepageContent.schoolShields.schools, ...newHomepageContent.schoolShields.schools, ...newHomepageContent.schoolShields.schools].map((school, index) => (
              <div key={index} className="flex-shrink-0 flex items-center justify-center px-8">
                <div className="text-lg font-semibold text-primary-700">
                  {school}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Universities & Schools Icon Cloud */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-serif font-semibold text-primary-900 mb-4">
              Elite Universities & Schools
            </h3>
          </div>
          <div className="flex justify-center">
            <div className="relative flex h-64 w-full max-w-2xl items-center justify-center overflow-hidden rounded-2xl bg-primary-50 px-8 py-8">
              <IconCloud iconSlugs={[
                "oxforduniversity",
                "cambridge", 
                "harvard",
                "mit",
                "stanford",
                "yale",
                "princeton",
                "columbia",
                "imperial",
                "lse",
                "ucl",
                "kcl",
                "edinburgh"
              ]} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <p className="text-lg text-primary-700 leading-relaxed">
                {newHomepageContent.aboutSection.description}
              </p>
              <p className="text-lg text-primary-700 leading-relaxed">
                {newHomepageContent.aboutSection.continuedDescription}
              </p>
              <p className="text-lg text-primary-700 leading-relaxed">
                {newHomepageContent.aboutSection.finalDescription}
              </p>
              
              {/* Credentials */}
              <div className="flex justify-center items-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <Crown className="w-6 h-6 text-accent-600" />
                  <span className="font-medium text-primary-900">Tatler Address Book</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-accent-600" />
                  <span className="font-medium text-primary-900">School Guide UK 'Top Pick'</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Options Section */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Educational pathways and tutoring options available">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-12">
              {newHomepageContent.educationalOptions.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {educationalOptions.map((option, index) => {
                // CMS DATA SOURCE: Using studentImages with imageKey for educational option images
                const studentImage = option.imageKey ? studentImages[option.imageKey as keyof typeof studentImages] : null
                
                return (
                  <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    {/* Student Image - Vertical tall format, 130% larger */}
                    {studentImage && (
                      <div className="mb-6 overflow-hidden rounded-lg">
                        <Image
                          {...getOptimizedImageProps(studentImage, '(max-width: 768px) 100vw, 25vw')}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-serif font-bold text-primary-900">{option.title}</h3>
                      <p className="text-primary-700 leading-relaxed">{option.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Families Choose Us */}
      <section className="py-16 lg:py-24 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-12">
              Why Families Choose Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {newHomepageContent.whyChooseUs.map((reason, index) => (
                <div key={index} className="bg-white rounded-lg border border-primary-200 p-8 text-left h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{reason.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-3">{reason.title}</h3>
                      <p className="text-primary-700 leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
              This Is Tutoring at Its Best
            </h2>
            <p className="text-xl text-accent-300 mb-8">
              Exact. Effective. Empowering.
            </p>
            <p className="text-lg text-primary-300 mb-8 max-w-2xl mx-auto">
              From prep school entry to Oxbridge preparation, My Private Tutor Online delivers expert tuition for exceptional futures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ShinyButton 
                text="Contact Elizabeth's Team"
                className="px-8 py-3 h-auto"
              />
              <InteractiveHoverButton 
                text="Request a Consultation"
                className="px-8 py-3 border border-white bg-transparent text-white hover:bg-white hover:text-primary-900"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}