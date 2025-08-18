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

import { ChevronRight } from 'lucide-react'
import { m } from 'framer-motion'
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog'
import { WaveSeparator } from '@/components/ui/wave-separator'
import { GradientOverlay } from '@/components/ui/gradient-overlay'
import { PullQuote } from '@/components/ui/pull-quote'
import Image from 'next/image'
// CONTEXT7 SOURCE: /reactjs/react.dev - Data fetching patterns for React Server Components
// CMS INTEGRATION: Import centralized founder story data from CMS
import { getFounderStory } from '@/lib/cms/cms-content'

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface for React component props
 * PROPS INTERFACE REASON: Official React documentation recommends interface definitions for component props with proper type safety
 */

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
  founderContent
}: FounderStorySectionProps): JSX.Element {
  // CMS DATA SOURCE: Get default values from CMS if not provided as props
  const cmsContent = getDefaultFounderContent()
  const actualFounderContent = founderContent || cmsContent
  const actualTitle = title || cmsContent?.title || "Meet Elizabeth, A Different Kind of Educator"
  
  // If no content available, return null
  if (!actualFounderContent) {
    return <></>
  }
  
  return (
    <section 
      id="founder-story"
      className={`relative bg-${backgroundColor} py-16 lg:py-24 border-b border-slate-100/50 ${className}`}
    >
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
                {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for founder story about image */}
                {/* FOUNDER STORY IMAGE INTEGRATION: Official Next.js documentation for optimized about founder story image rendering */}
                <Image
                  src="/images/about/about-founder-story.jpg"
                  alt="Elizabeth Burrows Founder Story - Personal journey and educational philosophy behind My Private Tutor Online"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  loading="lazy"
                  quality={90}
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
              {/* CONTEXT7 SOURCE: /reactjs/react.dev - Clean component presentation without redundant highlights */}
              {/* FOUNDER HIGHLIGHTS REMOVAL: Client feedback requested removal of achievement highlights to avoid spoiling detailed founder story that follows */}
              <h3 className="text-3xl font-serif font-bold text-primary-900 mb-6">
                Elizabeth Burrows
              </h3>
              <p className="text-lg text-primary-700 mb-8">
                Founder & CEO
              </p>
              
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

            {/* CONTEXT7 SOURCE: /websites/react_dev - Component composition with pull quote highlighting key message */}
            {/* PULL QUOTE INTEGRATION: Client requirement to highlight motivational quote about helping children */}
            <PullQuote 
              quote="I'm motivated by helping children when it feels like there are no straight lines, only a confusing jumble of squiggles."
              alignment="right"
              variant="accent"
              size="md"
              className="my-8"
            />

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
              
              <p className="mb-6">
                By Sixth Form, I was achieving top grades. I hadn't planned to apply to Oxbridge, but when my headmistress pulled me aside to ask if I'd considered it, something inside me switched on.
              </p>
              
              {/* CONTEXT7 SOURCE: /websites/react_dev - Component composition with pull quote for Cambridge challenge quote */}
              {/* PULL QUOTE INTEGRATION: Client requirement to highlight Cambridge application challenge */}
              <PullQuote 
                quote="I loved a challenge, and applying to Cambridge to read English and Theatre with Education Studies was certainly that. But my offer letter was as much cause for agitation as celebration."
                alignment="center"
                variant="primary"
                size="lg"
                className="my-8"
              />
              
              <p className="mb-6">
                You see, I had already fallen in love with another course and city: Bristol. My elder sister was studying languages there and although I had doggedly courted a Cambridge offer, I hadn't considered a world in which I would actually receive one. What to do? Who turns down *Cambridge*? 17 year-old me. It was an agonizing decision, but even then I knew the right one. Looking back, I realise that dilemma helped define my ethos towards education: **work as hard as you can to give yourself the luxury of choice, then have the confidence to pick what's right for you — even if it's not what's expected.**
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">{actualFounderContent.firstLessonToSeventhContinent.title}</h3>
              
              <p className="mb-6">
                I started tutoring at Bristol; it was love at first lesson. I've always had a natural affinity with children and combining that with academics just made sense. I went on to complete my Masters, all the while refining my tutoring practice, both in person and online. I quickly found myself being recommended from family to family.
              </p>
              
              <p className="mb-6">
                What followed was a series of international placements and the opportunities to work with VIPs and private families around the world. By 2017, I had visited all seven continents.
              </p>
              
              {/* CONTEXT7 SOURCE: /websites/react_dev - Component composition with pull quote for exceptional educators */}
              {/* PULL QUOTE INTEGRATION: Client requirement to highlight exceptional educators quote */}
              <PullQuote 
                quote="I met and worked alongside some truly exceptional educators — many of whom are still firm favourites in the tutoring team now."
                alignment="left"
                variant="accent"
                size="md"
                className="my-8"
              />
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">{actualFounderContent.globalView.title}</h3>
              
              <p className="mb-6">
                Keen to put my English degree to good use, during this time I also worked at *Forbes Middle East as Online Editor*. I covered a range of subjects, including education.
              </p>
              
              {/* CONTEXT7 SOURCE: /websites/react_dev - Component composition with pull quote for Forbes insight */}
              {/* PULL QUOTE INTEGRATION: Client requirement to highlight Forbes business moguls insight */}
              <PullQuote 
                quote="Conducting interviews with business moguls through Forbes reinforced that the right educational support doesn't just help people ace exams — it shapes their choices, their confidence and their future."
                alignment="center"
                variant="primary"
                size="lg"
                className="my-8"
              />
              
              <p>
                These leaders had turned their fortunes around through education. What could be more exciting and important?
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
              
              {/* CONTEXT7 SOURCE: /websites/react_dev - Component composition with pull quote for statistics */}
              {/* PULL QUOTE INTEGRATION: Client requirement to highlight 94% GCSE improvement statistic */}
              <PullQuote 
                quote="94% of GCSE students improve by two or more grades"
                alignment="right"
                variant="accent"
                size="md"
                className="my-8"
              />
              
              <p className="mb-6">
                {actualFounderContent.resultsThatMatter.closingMessage}
              </p>
              
              <p className="font-medium text-primary-900">
                {actualFounderContent.resultsThatMatter.finalQuote}
              </p>
              
              <div className="mt-8 text-right">
                {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for handwritten signature */}
                {/* SIGNATURE ENHANCEMENT: Client requirement to replace text signature with handwritten signature image */}
                <div className="flex flex-col items-end">
                  <Image
                    src="/images/team/elizabeth-burrows-signature.png"
                    alt="Elizabeth Burrows Signature - Founder & CEO of My Private Tutor Online"
                    width={200}
                    height={60}
                    className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    loading="lazy"
                    quality={90}
                  />
                  <p className="text-sm text-primary-700 mt-2 font-medium">
                    Elizabeth Burrows, Founder & CEO
                  </p>
                </div>
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
              
              {/* CONTEXT7 SOURCE: /vercel/next.js - Video poster thumbnails with proper aspect ratio for video content */}
              {/* VIDEO POSTER FIX REASON: Official Next.js documentation recommends using video poster images for accurate content representation and 16:9 aspect ratio */}
              <HeroVideoDialog
                className="block max-w-4xl mx-auto"
                animationStyle="from-center"
                videoSrc="/videos/elizabeth-introduction-compressed.mp4"
                thumbnailSrc="/videos/posters/elizabeth-introduction-poster.jpg"
                thumbnailAlt="Elizabeth Burrows Introduction Video - Unlocking Academic Success Seminar"
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