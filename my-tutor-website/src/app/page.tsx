"use client"

import { CheckCircle, Crown, Award, Phone, Calendar, BookOpen, Trophy } from 'lucide-react'
import { m } from 'framer-motion'
import { getHeroContent, getResultsStatistics } from '@/lib/cms'
import { getStudentImages, getOptimizedImageProps } from '@/lib/cms/cms-images'
import Image from 'next/image'
import Link from 'next/link'
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog'
import { IconCloud } from '@/components/magicui/icon-cloud'
import { BrandStatementVideo } from '@/components/marketing/brand-statement-video'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { VideoText } from '@/components/magicui/video-text'
import { PageHeader } from '@/components/layout/page-header'
import { PageFooter } from '@/components/layout/page-footer'
import { Timeline } from '@/components/ui/timeline'
import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button'
import { Carousel } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { LazyMotionProvider } from '@/components/providers/LazyMotionProvider'

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
  resultsStatistics: {
    title: "Results that Speak for Themselves",
    statistics: [
      {
        metric: "94%",
        description: "of students improve by at least two grades at GCSE"
      },
      {
        metric: "Top 2%",
        description: "11+ tutees routinely place in the top 2% of candidates. 95% of candidates secure an offer from at least one of their desired schools"
      },
      {
        metric: "Consistent",
        description: "success with Oxbridge and top Russell Group universities"
      }
    ]
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
  clientTestimonials: [
    "Elizabeth's team was the only one that actually delivered what they promised.",
    "Your tutors are next level. We couldn't have done it without you.",
    "Annika scored a 7 in her GCSE retake. We are thrilled—it's such an improvement on the 4 she got in summer.",
    "Thank you for making my child believe in themselves again.",
    "We were delighted to hear all three children were accepted into Le Rosey."
  ],
  howItWorksSteps: [
    "Submit an enquiry or contact Elizabeth's team directly",
    "Schedule a personal consultation call with Elizabeth", 
    "Arrange an initial lesson to ensure it's a perfect match",
    "Start regular tutorials—with ongoing support from our personable team and regular progress updates via our tutoring platform"
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
  // CMS DATA SOURCE: Using getHeroContent for hero section
  const heroContent = getHeroContent()
  // CMS DATA SOURCE: Using educational options for tutoring paths section  
  const educationalOptions = newHomepageContent.educationalOptions.options
  // CMS DATA SOURCE: Using getStudentImages for student photos
  const studentImages = getStudentImages()

  return (
    <LazyMotionProvider>
      {/* Use consistent PageHeader component with transparent variant for homepage */}
      <PageHeader variant="transparent" />

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
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight mb-6">
                    {heroContent.title}
                  </h1>
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
                    text="Book Free Consultation"
                    className="px-10 py-5 h-auto text-lg font-semibold bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-gold transition-all duration-300 transform hover:scale-105"
                  />
                  <InteractiveHoverButton 
                    text="View Success Stories"
                    className="px-10 py-5 text-lg font-semibold border-2 border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-primary-900 transition-all duration-300"
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
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
              {newHomepageContent.educationalOptions.title}
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
              Tailored academic support from early years through university entrance
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {educationalOptions.map((option, index) => {
                // CMS DATA SOURCE: Using studentImages with imageKey for educational option images
                const studentImage = option.imageKey ? studentImages[option.imageKey as keyof typeof studentImages] : null
                
                return (
                  <div key={index} className="group bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Student Image - Larger with no rounded corners */}
                    {studentImage && (
                      <div className="relative overflow-hidden h-96">
                        <Image
                          {...getOptimizedImageProps(studentImage, '(max-width: 768px) 100vw, 25vw')}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    )}
                    
                    {/* Enhanced Content */}
                    <div className="p-8 space-y-4">
                      <h3 className="text-2xl font-serif font-bold text-primary-900 group-hover:text-accent-600 transition-colors duration-300">
                        {option.title}
                      </h3>
                      <p className="text-primary-700 leading-relaxed text-lg">
                        {option.description}
                      </p>
                      <AnimatedSubscribeButton
                        buttonColor="#0f172a"
                        buttonTextColor="#ffffff"
                        subscribeStatus={false}
                        initialText="Learn More"
                        changeText="View Details"
                        className="mt-4"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Families Choose Us - Full Width Photo Grid */}
      <section className="relative py-0 bg-primary-900">
        <div className="text-center py-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Why Families Choose Us
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Four pillars of excellence that define our premium tutoring service
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {newHomepageContent.whyChooseUs.map((reason, index) => (
            <m.div 
              key={index} 
              className="relative h-[500px] group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={studentImages[Object.keys(studentImages)[index % Object.keys(studentImages).length]].src}
                  alt={reason.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/60 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="text-5xl mb-4 text-accent-400">
                    {reason.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {reason.description}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Results Statistics */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-12">
              {newHomepageContent.resultsStatistics.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {newHomepageContent.resultsStatistics.statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-accent-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-accent-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">{stat.metric}</h3>
                  <p className="text-primary-700 leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Elizabeth's Quote */}
      <section className="py-16 lg:py-24 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-xl lg:text-2xl font-serif text-primary-700 italic leading-relaxed mb-8">
              "{newHomepageContent.elizabethQuote.text}"
            </blockquote>
            <cite className="text-lg font-semibold text-primary-900 not-italic">
              — {newHomepageContent.elizabethQuote.author}
            </cite>
          </div>
        </div>
      </section>

      {/* Who We Support */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-12">
              Who We Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {newHomepageContent.whoWeSupport.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0" />
                  <span className="text-primary-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline */}
      <section className="py-16 lg:py-24 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
              Your journey to academic excellence in four simple steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Timeline 
              items={[
                {
                  title: "Book a Free Consultation",
                  description: newHomepageContent.howItWorksSteps[0],
                  icon: <Phone className="w-6 h-6 text-accent-600" />
                },
                {
                  title: "Get Matched with Your Tutor",
                  description: newHomepageContent.howItWorksSteps[1],
                  icon: <Calendar className="w-6 h-6 text-accent-600" />
                },
                {
                  title: "Start Learning",
                  description: newHomepageContent.howItWorksSteps[2],
                  icon: <BookOpen className="w-6 h-6 text-accent-600" />
                },
                {
                  title: "Track Progress & Succeed",
                  description: newHomepageContent.howItWorksSteps[3],
                  icon: <Trophy className="w-6 h-6 text-accent-600" />
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Client Reflections - Carousel */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
              Client Reflections
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
              Hear from families who have experienced the transformative power of personalised tutoring
            </p>
          </div>
          
          <Carousel
            centerMode={true}
            autoPlay={true}
            autoPlayInterval={5000}
            showDots={true}
            items={newHomepageContent.clientTestimonials.map((testimonial, index) => ({
              id: index,
              content: (
                <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6">
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Award key={i} className="w-5 h-5 text-accent-500 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-lg text-primary-700 italic leading-relaxed">
                          "{testimonial}"
                        </blockquote>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-primary-600">Parent of successful student</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            }))}
            className="max-w-6xl mx-auto"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
              This Is Tutoring at Its Best
            </h2>
            
            {/* Video-text brand statement */}
            <div className="mb-8">
              <BrandStatementVideo 
                className="h-[120px]" 
                text="Exact. Effective. Empowering."
                videoKey="brandStatement"
              />
            </div>
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
      <PageFooter />
    </LazyMotionProvider>
  )
}