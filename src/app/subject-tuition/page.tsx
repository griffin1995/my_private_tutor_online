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
    <Card className="border-slate-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-primary-50 transition-colours duration-200"
        aria-expanded={isOpen}
        aria-controls={`section-${subject.id}`}
      >
        <div className="flex items-center gap-4">
          <div className="bg-amber-100 rounded-full p-3 text-amber-600">
            {subject.icon}
          </div>
          <div className="text-left">
            <h3 className="text-xl font-serif font-bold text-slate-900">{subject.title}</h3>
            <p className="text-slate-600 mt-1">{subject.description}</p>
          </div>
        </div>
        <div className="text-slate-400">
          {isOpen ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </div>
      </button>
      
      {isOpen && (
        <div
          id={`section-${subject.id}`}
          className="border-t border-slate-200 animate-fade-in-up"
        >
          <div className="p-6 space-y-6">
            {subject.subjects.map((subjectItem, index) => (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-lg p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h4 className="text-lg font-semibold text-slate-900 mb-3">{subjectItem.name}</h4>
                <p className="text-slate-700 mb-4">{subjectItem.description}</p>
                <div className="flex flex-wrap gap-2">
                  {subjectItem.keyFeatures.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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

  return (
    <PageLayout
      title="Subject Tuition - My Private Tutor Online"
      description="Comprehensive tuition across all subjects and educational levels. From entrance exams to university preparation with expert Oxford and Cambridge graduate tutors."
      keywords="subject tuition, entrance exams, GCSE tutoring, A-level coaching, university preparation, specialist tutoring"
      background="white"
    >
      <PageHero
        background="gradient"
        size="lg"
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

      {/* Quick Stats Section */}
      <Section className="py-12" background="slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div
              className="text-center animate-fade-in-up"
            >
              <div className="text-3xl font-bold text-amber-600 mb-2">40+</div>
              <div className="text-slate-700 font-medium">Subjects Covered</div>
            </div>
            <div
              className="text-center animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="text-3xl font-bold text-amber-600 mb-2">95%</div>
              <div className="text-slate-700 font-medium">Schools Application Success Rate</div>
            </div>
            <div
              className="text-center animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="text-3xl font-bold text-amber-600 mb-2">KS1-University</div>
              <div className="text-slate-700 font-medium">All Levels</div>
            </div>
            <div
              className="text-center animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="text-3xl font-bold text-amber-600 mb-2">3 Tiers</div>
              <div className="text-slate-700 font-medium">Specialist Support</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Accordion Sections */}
      <Section className="py-16 lg:py-24" background="white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-12 animate-fade-in-up"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
              Comprehensive Subject Coverage
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Explore our extensive range of subjects and educational levels. Click on each section to discover detailed information about our tutoring services.
            </p>
          </div>

          <div className="space-y-4 max-w-5xl mx-auto">
            {subjectTuitionContent.subjects.map((subject, index) => (
              <div
                key={subject.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionSection
                  subject={subject}
                  isOpen={openSections.includes(subject.id)}
                  onToggle={() => toggleSection(subject.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Homeschooling Preview Section */}
      <Section className="py-16 lg:py-24" background="slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="space-y-6 animate-fade-in-left"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900">
                Interested in Homeschooling?
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Discover our comprehensive homeschooling programmes designed to provide complete educational support for families choosing to educate at home.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-700">Complete curriculum coverage</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-700">Flexible scheduling options</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-700">Expert educational guidance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-700">Parent support and training</span>
                </li>
              </ul>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Learn About Homeschooling
              </Button>
            </div>
            
            <div
              className="relative animate-fade-in-right"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
                <Globe className="w-24 h-24 text-slate-500" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 lg:py-24" background="slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center animate-fade-in-up"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
              Ready to Begin Your Educational Journey?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Book a free consultation to discuss your educational needs and find the perfect subject tuition for your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3"
              >
                Book Free Consultation
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3"
              >
                View All Subjects
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  )
}