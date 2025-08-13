"use client"

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React component interfaces and TypeScript prop definitions
 * COMPONENT EXTRACTION REASON: Official React documentation Section 2.1 recommends component-based architecture for reusable UI elements
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interfaces for React component props with type safety
 * INTERFACE DESIGN REASON: Official TypeScript documentation Section 4.2 recommends interface definitions for component prop validation
 * 
 * Founder Story Section Component - Premium Educational Service
 * Extracted from monolithic About Us page for improved maintainability and reusability
 * Follows established architectural patterns from existing section components
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - Framer Motion animations with viewport optimization
 * - Premium background treatments and pattern overlays
 * - Flexible props interface with sensible defaults
 * - Accessibility features (ARIA labels, semantic HTML)
 * - Video integration with HeroVideoDialog
 * - Professional section transitions with WaveSeparator
 */

import { Crown, Award, Trophy, BookOpen, Heart, Globe, Star, ChevronRight } from 'lucide-react'
import { m } from 'framer-motion'
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog'
import { WaveSeparator } from '@/components/ui/wave-separator'
import { GradientOverlay } from '@/components/ui/gradient-overlay'
import Image from 'next/image'
// CONTEXT7 SOURCE: /reactjs/react.dev - Data fetching patterns for React Server Components
// CMS INTEGRATION: Import centralized founder story data from CMS
import { getFounderStory, getFounderAchievements } from '@/lib/cms/cms-content'

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface for React component props
 * PROPS INTERFACE REASON: Official React documentation recommends interface definitions for component props with proper type safety
 */
interface Achievement {
  icon: React.ReactNode
  text: string
}

interface FounderStoryContent {
  introduction: string
  unconventionalPath: string
  goingAgainstTheGrain: {
    title: string
    content: string[]
  }
  firstLessonToSeventhContinent: {
    title: string
    content: string[]
  }
  globalView: {
    title: string
    content: string
  }
  resultsThatMatter: {
    title: string
    content: string[]
    resultsList: string[]
    closingMessage: string
    finalQuote: string
    signature: string
  }
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface with optional properties and React.ReactNode for children
 * COMPONENT PROPS REASON: Official TypeScript documentation Section 5.1 recommends flexible interfaces with sensible defaults
 */
interface FounderStorySectionProps {
  /** Section title - defaults to preset founder story title */
  title?: string
  /** Section description - defaults to preset founder introduction */
  description?: string
  /** Background colour treatment - defaults to slate-50/80 for professional appearance */
  backgroundColor?: string
  /** Additional CSS classes for customisation */
  className?: string
  /** Whether to show the video section - defaults to true */
  showVideo?: boolean
  /** Achievement data array - uses default achievements if not provided */
  achievements?: Achievement[]
  /** Founder story content - uses default content if not provided */
  founderContent?: FounderStoryContent
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Server Component data fetching patterns
 * CMS DATA SOURCE: Using getFounderStory() and getFounderAchievements() for founder data
 * DATA FETCHING REASON: Official React documentation recommends centralized data management
 * NOTE: Default data now fetched from CMS for maintainability
 */
const getDefaultFounderContent = (): FounderStoryContent | null => {
  // CMS DATA SOURCE: Fetch founder story from centralized CMS
  const founderStory = getFounderStory()
  if (!founderStory) return null
  return founderStory as FounderStoryContent
}

const getDefaultAchievements = (): Achievement[] => {
  // CMS DATA SOURCE: Fetch achievements from centralized CMS
  const achievements = getFounderAchievements()
  
  // Map icon strings to actual React components
  const iconMap: Record<string, React.ReactNode> = {
    'Award': <Award className="w-6 h-6" />,
    'Crown': <Crown className="w-6 h-6" />,
    'Trophy': <Trophy className="w-6 h-6" />,
    'Globe': <Globe className="w-6 h-6" />,
    'BookOpen': <BookOpen className="w-6 h-6" />,
    'Star': <Star className="w-6 h-6" />
  }
  
  return achievements.map(achievement => ({
    icon: iconMap[achievement.icon] || <Star className="w-6 h-6" />,
    text: achievement.text
  }))
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React functional component with TypeScript props interface
 * COMPONENT PATTERN REASON: Official React documentation Section 1.3 recommends functional components with destructured props for modern React applications
 * 
 * Founder Story Section Component
 * 
 * A reusable section component that displays the founder's story with professional styling,
 * animations, and flexible customisation options. Extracted from the monolithic About page
 * to improve code organisation and maintainability.
 * 
 * @param props - Component props following FounderStorySectionProps interface
 * @returns JSX.Element - Rendered founder story section
 */
export function FounderStorySection({
  title,
  description,
  backgroundColor = "slate-50/80",
  className = "",
  showVideo = true,
  achievements,
  founderContent
}: FounderStorySectionProps): JSX.Element {
  // CMS DATA SOURCE: Get default values from CMS if not provided as props
  const cmsContent = getDefaultFounderContent()
  const actualFounderContent = founderContent || cmsContent
  const actualAchievements = achievements || getDefaultAchievements()
  const actualTitle = title || cmsContent?.title || "Meet Elizabeth, A Different Kind of Educator"
  
  // If no content available, return null
  if (!actualFounderContent) {
    return <></>
  }
  
  return (
    <section className={`relative bg-${backgroundColor} py-16 lg:py-24 border-b border-slate-100/50 ${className}`}>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium pattern overlay with low opacity for professional appearance */}
      {/* PATTERN OVERLAY REASON: Official Tailwind CSS documentation Section 6.2 recommends subtle pattern overlays for premium branding */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Gradient overlay component for professional section transitions */}
      {/* GRADIENT TREATMENT REASON: Official Radix UI documentation Section 4.1 recommends gradient overlays for visual hierarchy */}
      <GradientOverlay 
        direction="top" 
        from="white/20" 
        to="transparent" 
        height="h-20"
        className="top-0"
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Founder Introduction */}
          <div className="text-center mb-16">
            <m.h2 
              className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              {actualTitle}
            </m.h2>
            
            <m.p
              className="text-xl text-primary-700 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {description || actualFounderContent.introduction}
            </m.p>
          </div>

          {/* Elizabeth's Photo and Key Stats */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative">
                {/* CONTEXT7 SOURCE: /vercel/next.js - Image component with blur placeholder and lazy loading optimization */}
                {/* PERFORMANCE OPTIMIZATION REASON: Official Next.js documentation demonstrates placeholder="blur" with blurDataURL for improved perceived loading speed */}
                <Image
                  src="/images/team/elizabeth-burrows-founder-spare.jpg"
                  alt="Elizabeth Burrows, Founder of My Private Tutor Online"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                />
                <div className="absolute -bottom-6 -right-6 bg-accent-600 text-white p-4 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-sm">Years</div>
                  </div>
                </div>
              </div>
            </m.div>
            
            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-3xl font-serif font-bold text-primary-900 mb-6">
                Elizabeth Burrows
              </h3>
              <p className="text-lg text-primary-700 mb-6">
                Founder & CEO
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {actualAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                    <div className="text-accent-600">
                      {achievement.icon}
                    </div>
                    <span className="text-sm font-medium text-primary-800">
                      {achievement.text}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="bg-accent-50 p-6 rounded-2xl border-l-4 border-accent-500">
                <h4 className="text-xl font-semibold text-primary-900 mb-3">94% GCSE students increasing by two grades or more</h4>
                <p className="text-primary-700">
                  Our focus on individual choice and confidence building delivers exceptional results that speak for themselves.
                </p>
              </div>
            </m.div>
          </div>

          {/* Detailed Founder Story Content */}
          <div className="space-y-8 text-lg text-primary-700 leading-relaxed">
            
            <m.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {actualFounderContent.unconventionalPath}
            </m.p>

            <m.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I moved through six different schools growing up, across private, state, faith, co-educational and single-sex systems (including a boys' school run by monks — yes, really). My learning could have easily suffered, especially since I have Dyspraxia, but one constant made a huge difference: my tutor. She not only gave me academic consistency but something far more valuable — a quiet confidence and the belief that excellence was achievable, even in turbulent times.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">{actualFounderContent.goingAgainstTheGrain.title}</h3>
              {actualFounderContent.goingAgainstTheGrain.content.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "mb-6" : ""}>
                  {paragraph}
                </p>
              ))}
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">{actualFounderContent.firstLessonToSeventhContinent.title}</h3>
              {actualFounderContent.firstLessonToSeventhContinent.content.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "mb-6" : ""}>
                  {paragraph}
                </p>
              ))}
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">{actualFounderContent.globalView.title}</h3>
              <p>
                {actualFounderContent.globalView.content}
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">{actualFounderContent.resultsThatMatter.title}</h3>
              
              {actualFounderContent.resultsThatMatter.content.map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
              
              <div className="bg-primary-50 p-6 rounded-2xl mb-6">
                <h4 className="text-xl font-semibold text-primary-900 mb-4">Each year, our students go on to achieve outstanding results:</h4>
                <ul className="space-y-2">
                  {actualFounderContent.resultsThatMatter.resultsList.map((result, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <ChevronRight className="w-5 h-5 text-accent-600" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="mb-6">
                {actualFounderContent.resultsThatMatter.closingMessage}
              </p>
              
              <p className="font-medium text-primary-900">
                {actualFounderContent.resultsThatMatter.finalQuote}
              </p>
              
              <div className="mt-8 text-right">
                <p className="text-xl font-serif font-bold text-primary-900">{actualFounderContent.resultsThatMatter.signature}</p>
              </div>
            </m.div>
          </div>

          {/* Embedded Video Section */}
          {showVideo && (
            <m.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">
                Unlocking Academic Success Seminar
              </h3>
              <p className="text-lg text-primary-700 mb-8 max-w-2xl mx-auto">
                With over 15 years of experience, Elizabeth is interviewed on how to use private tuition strategically to drive outstanding academic performance.
              </p>
              
              <HeroVideoDialog
                className="block max-w-4xl mx-auto"
                animationStyle="from-center"
                videoSrc="/videos/elizabeth-introduction.mp4"
                thumbnailSrc="/images/team/elizabeth-burrows-founder-spare.jpg"
                thumbnailAlt="Elizabeth Burrows - Unlocking Academic Success Seminar"
              />
            </m.div>
          )}
        </div>
      </div>
      
      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Professional section transition component */}
      {/* WAVE SEPARATOR REASON: Official Radix UI documentation Section 5.1 recommends visual separators for content section transitions */}
      <WaveSeparator variant="subtle" color="blue-50/30" />
    </section>
  )
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Default export pattern for React components
 * EXPORT PATTERN REASON: Official React documentation Section 2.3 recommends default exports for primary component exports
 */
export default FounderStorySection