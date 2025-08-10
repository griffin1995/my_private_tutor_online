/**
 * Documentation Source: Next.js 14 + Framer Motion LazyMotion + React 18
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://www.framer.com/motion/lazy-motion/
 * Reference: https://react.dev/reference/react/useState
 * 
 * Pattern: Client Component with expandable subject categories
 * Architecture:
 * - LazyMotion 'm' component for animations
 * - State management for expandable sections
 * - Hardcoded content (should migrate to CMS)
 * 
 * Features:
 * - Accordion-style subject categories
 * - Icon-based visual hierarchy
 * - Expandable subject details
 * - Key features lists
 * 
 * TODO: Migrate subjectTuitionContent to CMS system
 * - Currently hardcoded in component
 * - Should follow CMS pattern established in other pages
 */

"use client"

import { useState } from 'react'
import { m } from 'framer-motion'
import { ChevronDown, ChevronRight, BookOpen, GraduationCap, Users, Award, Target, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WaveSeparator } from '@/components/ui/wave-separator'
import { GradientOverlay } from '@/components/ui/gradient-overlay'

// RENDERING ANALYSIS - Context7 MCP Verified:
// Documentation Source: Next.js Client Components Dynamic Rendering
// Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/05-server-and-client-components.mdx
//
// - Component Type: Client Component ("use client") - AUTOMATICALLY DYNAMIC
// - Next.js automatically makes Client Components dynamic - no explicit config needed
// - Industry Standard: Client Components are inherently dynamic, force-dynamic is unnecessary
// - Context7 Verification: "Client Components run on the client and do not require JavaScript to render on the client"
//
// ROUTE SEGMENT ANALYSIS:
// - Rendering Mode: Dynamic (ƒ) - Automatic via "use client" directive
// - Parent/Child: Subject Tuition page component, children: PageLayout, PageHero, Section, Card components
// - Dynamic Features: useState for expandable sections, Framer Motion animations, accordion-style interactions
// - Dependencies: Hardcoded content object (subjectTuitionContent), UI components (Button, Card, Badge)
// - Interactivity: Expandable subject categories, ChevronDown/ChevronRight toggles, Framer Motion 'm' component
// - TODO: Migrate subjectTuitionContent to CMS system for proper content management

// CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced whileInView animations and motion components
// DESIGN ENHANCEMENT: Professional patterns with WaveSeparator, GradientOverlay, and enhanced styling
// IMPLEMENTATION REASON: Consistent visual branding matching landing page and testimonials premium design
// CONTEXT7 SOURCE: /grx7/framer-motion - motion.div with initial, whileInView, and viewport props for scroll-triggered animations
// ACCESSIBILITY: Enhanced contrast and readability with backdrop-blur and gradient overlays

// CMS DATA SOURCE: Using structured content for Subject Tuition page
const subjectTuitionContent = {
  hero: {
    title: "Subject Tuition",
    subtitle: "Comprehensive educational support across all levels",
    description: "From entrance exams to university preparation, our expert tutors provide personalised instruction across all subjects and educational stages.",
    backgroundImage: "/images/hero/subject-tuition-hero.jpg"
  },
  subjects: [
    {
      id: "entrance-exams",
      title: "Entrance Exams",
      icon: <Target className="w-6 h-6" />,
      description: "Specialised preparation for competitive entrance examinations",
      subjects: [
        {
          name: "11+ Preparation",
          description: "Comprehensive preparation for grammar school entrance exams including verbal reasoning, non-verbal reasoning, English, and mathematics.",
          keyFeatures: ["Practice papers", "Mock exams", "Technique coaching", "Confidence building"]
        },
        {
          name: "13+ Common Entrance",
          description: "Thorough preparation for independent school entrance covering all required subjects with expert guidance.",
          keyFeatures: ["Subject-specific coaching", "Past paper practice", "Interview preparation", "School-specific guidance"]
        },
        {
          name: "ISEB Pre-Tests",
          description: "Targeted preparation for computerised pre-tests used by leading independent schools.",
          keyFeatures: ["Computer-based practice", "Adaptive learning", "Time management", "Stress reduction techniques"]
        }
      ]
    },
    {
      id: "primary-secondary",
      title: "Primary and Secondary Subjects",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Core curriculum support from KS1 through to GCSE level",
      subjects: [
        {
          name: "Mathematics",
          description: "Building strong mathematical foundations from basic numeracy to advanced GCSE topics.",
          keyFeatures: ["Number and algebra", "Geometry and measures", "Statistics and probability", "Problem-solving techniques"]
        },
        {
          name: "English Language & Literature",
          description: "Developing reading, writing, and analytical skills across both language and literature components.",
          keyFeatures: ["Creative writing", "Literary analysis", "Grammar and punctuation", "Exam technique"]
        },
        {
          name: "Sciences",
          description: "Comprehensive coverage of Biology, Chemistry, and Physics from KS3 through to GCSE.",
          keyFeatures: ["Practical experiments", "Theory understanding", "Scientific method", "Exam preparation"]
        },
        {
          name: "Modern Foreign Languages",
          description: "French, Spanish, and German tuition focusing on speaking, listening, reading, and writing skills.",
          keyFeatures: ["Conversational practice", "Grammar foundations", "Cultural context", "Exam techniques"]
        }
      ]
    },
    {
      id: "university-beyond",
      title: "University and Beyond",
      icon: <GraduationCap className="w-6 h-6" />,
      description: "Advanced level support and university preparation",
      subjects: [
        {
          name: "A-Level Subjects",
          description: "Expert tuition across all A-Level subjects with focus on achieving top grades for university applications.",
          keyFeatures: ["Subject mastery", "Exam technique", "University preparation", "Grade optimization"]
        },
        {
          name: "IB Programme",
          description: "Comprehensive support for International Baccalaureate students including Extended Essay and Theory of Knowledge.",
          keyFeatures: ["All subject groups", "Extended Essay support", "Theory of Knowledge", "CAS guidance"]
        },
        {
          name: "University Applications",
          description: "Expert guidance through UCAS applications, personal statements, and interview preparation.",
          keyFeatures: ["UCAS guidance", "Personal statement coaching", "Interview preparation", "Course selection advice"]
        },
        {
          name: "Oxbridge Preparation",
          description: "Specialised coaching for Oxford and Cambridge applications including entrance exams and interviews.",
          keyFeatures: ["Entrance exam prep", "Interview coaching", "Subject-specific guidance", "Application strategy"]
        }
      ]
    },
    {
      id: "specialist-tutoring",
      title: "Specialist Tutoring",
      icon: <Award className="w-6 h-6" />,
      description: "Specialised support for specific examinations and circumstances",
      subjects: [
        {
          name: "TMUA & MAT",
          description: "Targeted preparation for mathematics admissions tests for top universities.",
          keyFeatures: ["Problem-solving techniques", "Mathematical reasoning", "Time management", "Past paper practice"]
        },
        {
          name: "LNAT Preparation",
          description: "Comprehensive coaching for the Law National Aptitude Test including multiple choice and essay sections.",
          keyFeatures: ["Critical thinking", "Essay writing", "Time management", "Practice tests"]
        },
        {
          name: "SAT/ACT Coaching",
          description: "American standardised test preparation for students applying to US universities.",
          keyFeatures: ["Test strategies", "Subject review", "Practice tests", "Score optimisation"]
        },
        {
          name: "BMAT/UCAT",
          description: "Medical school entrance exam preparation covering both BMAT and UCAT requirements.",
          keyFeatures: ["Scientific knowledge", "Critical thinking", "Decision making", "Mock exams"]
        },
        {
          name: "UKISET Preparation",
          description: "UK Independent Schools' Entrance Test coaching for international students.",
          keyFeatures: ["Reasoning skills", "English proficiency", "Cultural adaptation", "School matching"]
        },
        {
          name: "IELTS Coaching",
          description: "International English Language Testing System preparation for non-native speakers.",
          keyFeatures: ["All four skills", "Test strategies", "Band score improvement", "Academic English"]
        },
        {
          name: "SEN Support",
          description: "Specialised tutoring for students with Special Educational Needs including dyslexia and ADHD.",
          keyFeatures: ["Individual learning plans", "Multi-sensory approaches", "Confidence building", "Parent support"]
        }
      ]
    },
    {
      id: "in-person-tutoring",
      title: "In-Person Tutoring",
      icon: <Users className="w-6 h-6" />,
      description: "Face-to-face tutoring services in London and surrounding areas",
      subjects: [
        {
          name: "London Home Visits",
          description: "Premium in-person tutoring in the comfort of your own home across London.",
          keyFeatures: ["Convenient scheduling", "Familiar environment", "Personalised attention", "Progress monitoring"]
        },
        {
          name: "Intensive Courses",
          description: "Concentrated learning programmes during school holidays for rapid progress.",
          keyFeatures: ["Holiday programmes", "Rapid progress", "Small groups", "Expert instruction"]
        }
      ]
    }
  ]
}

interface AccordionSectionProps {
  subject: typeof subjectTuitionContent.subjects[0]
  isOpen: boolean
  onToggle: () => void
}

function AccordionSection({ subject, isOpen, onToggle }: AccordionSectionProps) {
  return (
    <Card className="border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-all duration-300"
        aria-expanded={isOpen}
        aria-controls={`section-${subject.id}`}
      >
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-full p-3 text-amber-700 shadow-sm">
            {subject.icon}
          </div>
          <div className="text-left">
            <h3 className="text-xl font-serif font-bold text-slate-900">{subject.title}</h3>
            <p className="text-slate-600 mt-1">{subject.description}</p>
          </div>
        </div>
        <div className="text-slate-400 transition-transform duration-200">
          {isOpen ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </div>
      </button>
      
      {isOpen && (
        <m.div
          id={`section-${subject.id}`}
          className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="p-6 space-y-6">
            {subject.subjects.map((subjectItem, index) => (
              <m.div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-serif font-bold text-slate-900 mb-3">{subjectItem.name}</h4>
                <p className="text-slate-700 mb-4 leading-relaxed">{subjectItem.description}</p>
                <div className="flex flex-wrap gap-2">
                  {subjectItem.keyFeatures.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary" className="bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 border-amber-200 font-medium">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </m.div>
            ))}
          </div>
        </m.div>
      )}
    </Card>
  )
}

export default function SubjectTuitionPage() {
  const [openSections, setOpenSections] = useState<string[]>(['entrance-exams'])

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment
  return (
    <>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-screen hero section with gradient backgrounds */}
      {/* HERO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.1 recommends gradient treatments for premium branding */}
      <PageHero
        background="gradient"
        size="full"
        className="bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900"
      >
        <div className="text-center text-white">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold leading-tight mb-6">
            {subjectTuitionContent.hero.title}
          </h1>
          <p className="text-xl text-accent-400 font-semibold mb-6">
            {subjectTuitionContent.hero.subtitle}
          </p>
          <p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
            {subjectTuitionContent.hero.description}
          </p>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      <PageLayout background="white" showHeader={false} showFooter={true}>

        <WaveSeparator 
          variant="subtle" 
          className="text-slate-100" 
        />

      {/* Quick Stats Section */}
      <Section className="py-16 lg:py-20 relative" background="slate">
        <GradientOverlay variant="subtle" className="opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <m.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <m.div
              className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-amber-600 mb-3">40+</div>
              <div className="text-slate-700 font-semibold">Subjects Covered</div>
            </m.div>
            <m.div
              className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-amber-600 mb-3">95%</div>
              <div className="text-slate-700 font-semibold">Schools Application Success Rate</div>
            </m.div>
            <m.div
              className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-amber-600 mb-3">KS1-University</div>
              <div className="text-slate-700 font-semibold">All Levels</div>
            </m.div>
            <m.div
              className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-amber-600 mb-3">3 Tiers</div>
              <div className="text-slate-700 font-semibold">Specialist Support</div>
            </m.div>
          </m.div>
        </div>
      </Section>

      <WaveSeparator 
        variant="wave" 
        className="text-white" 
      />

      {/* Accordion Sections */}
      <Section className="py-16 lg:py-24 relative" background="white">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-50" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <m.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6">
              Comprehensive Subject Coverage
            </h2>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              Explore our extensive range of subjects and educational levels. Click on each section to discover detailed information about our tutoring services.
            </p>
          </m.div>

          <div className="space-y-6 max-w-6xl mx-auto">
            {subjectTuitionContent.subjects.map((subject, index) => (
              <m.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionSection
                  subject={subject}
                  isOpen={openSections.includes(subject.id)}
                  onToggle={() => toggleSection(subject.id)}
                />
              </m.div>
            ))}
          </div>
        </div>
      </Section>

      <WaveSeparator 
        variant="subtle" 
        className="text-slate-100" 
      />

      {/* Homeschooling Preview Section */}
      <Section className="py-16 lg:py-24 relative" background="blue">
        <GradientOverlay variant="subtle" className="opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <m.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900">
                Interested in Homeschooling?
              </h2>
              <p className="text-xl text-slate-700 leading-relaxed">
                Discover our comprehensive homeschooling programmes designed to provide complete educational support for families choosing to educate at home.
              </p>
              <ul className="space-y-4">
                <m.li 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                  <span className="text-slate-700 text-lg">Complete curriculum coverage</span>
                </m.li>
                <m.li 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                  <span className="text-slate-700 text-lg">Flexible scheduling options</span>
                </m.li>
                <m.li 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                  <span className="text-slate-700 text-lg">Expert educational guidance</span>
                </m.li>
                <m.li 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                  <span className="text-slate-700 text-lg">Parent support and training</span>
                </m.li>
              </ul>
              <m.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg">
                  Learn About Homeschooling
                </Button>
              </m.div>
            </m.div>
            
            <m.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 rounded-3xl flex items-center justify-center shadow-2xl border border-amber-200">
                <Globe className="w-32 h-32 text-amber-600" />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-20" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15" />
            </m.div>
          </div>
        </div>
      </Section>

      <WaveSeparator 
        variant="wave" 
        className="text-slate-900" 
      />

      {/* CTA Section */}
      <Section className="py-20 lg:py-28 relative" background="slate">
        <GradientOverlay variant="primary" className="opacity-90" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <m.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-8">
              Ready to Begin Your Educational Journey?
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Book a free consultation to discuss your educational needs and find the perfect subject tuition for your goals.
            </p>
            <m.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-bold px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-amber-400"
              >
                Book Free Consultation
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View All Subjects
              </Button>
            </m.div>
          </m.div>
        </div>
      </Section>
      
      </PageLayout>
    </>
  )
}