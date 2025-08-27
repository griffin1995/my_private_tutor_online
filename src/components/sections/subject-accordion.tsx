/**
 * CONTEXT7 SOURCE: /facebook/react - Component extraction patterns for reusable UI elements
 * COMPONENT EXTRACTION REASON: Official React documentation Section 2.3 recommends extracting components with clear props interface
 * CONTEXT7 SOURCE: /grx7/framer-motion - motion component with initial, animate, and transition for accordion animations
 * ANIMATION REASON: Official Framer Motion documentation shows motion.div with height:'auto' for expandable content
 * 
 * Subject Accordion Component
 * Extracted from services page for reusable subject category display
 * 
 * Features:
 * - Expandable accordion with smooth animations
 * - Icon-based visual hierarchy
 * - Badge display for key features
 * - Responsive design with hover states
 * - Accessibility support with ARIA attributes
 */

"use client"

import { useState } from 'react'
import { m } from 'framer-motion'
import { ChevronDown, ChevronRight, LucideIcon, Play, Download, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// CONTEXT7 SOURCE: /facebook/react - TypeScript interface patterns for component props
// INTERFACE REASON: Official React TypeScript documentation recommends explicit prop typing for reusable components
export interface SubjectItem {
  name: string
  description: string
  keyFeatures: string[]
  children?: SubjectItem[]  // CONTEXT7 SOURCE: /radix-ui/primitives - Nested accordion pattern support for multi-level dropdowns
  // CONTEXT7 SOURCE: /facebook/react - Enhanced interface for multimedia content support
  // MULTIMEDIA REASON: Official React patterns for optional props supporting video thumbnails and PDF downloads
  videoThumbnail?: {
    thumbnailUrl: string
    videoUrl: string
    title: string
    isPlaceholder?: boolean
  }
  pdfDownload?: {
    title: string
    downloadUrl: string
    isPlaceholder?: boolean
  }
}

export interface SubjectCategory {
  id: string
  title: string
  icon: React.ReactElement<LucideIcon>
  description: string
  subjects: SubjectItem[]
  // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for call outs and testimonials display
  // CALLOUTS REASON: Official React patterns for array of strings representing bullet points for premium service highlights
  callOuts: string[]
  // CONTEXT7 SOURCE: /facebook/react - Component interface patterns for testimonial content structure
  // TESTIMONIAL REASON: Official React patterns for string field containing client testimonial quote for social proof
  testimonial: string
}

export interface SubjectAccordionProps {
  /** Array of subject categories to display */
  categories: SubjectCategory[]
  /** Initially open section IDs */
  defaultOpenSections?: string[]
  /** Custom className for styling */
  className?: string
  /** Callback when section is toggled */
  onSectionToggle?: (sectionId: string, isOpen: boolean) => void
}

interface AccordionSectionProps {
  category: SubjectCategory
  isOpen: boolean
  onToggle: () => void
}

interface NestedSubjectItemProps {
  subjectItem: SubjectItem
  index: number
  parentId: string
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Nested accordion component for child dropdowns
// NESTED ACCORDION REASON: Official Radix UI patterns for nested accordions supporting multi-level dropdown functionality
function NestedSubjectItem({ subjectItem, index, parentId }: NestedSubjectItemProps) {
  const [isNestedOpen, setIsNestedOpen] = useState(false)
  const hasChildren = subjectItem.children && subjectItem.children.length > 0

  // CONTEXT7 SOURCE: /grx7/framer-motion - Reduced motion support for accessibility compliance
  // ACCESSIBILITY REASON: Official Framer Motion patterns for respecting user's motion preferences
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!hasChildren) {
    // Regular subject item without children
    return (
      <m.div
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <h4 className="text-lg font-serif font-bold text-slate-900 mb-3">{subjectItem.name}</h4>
        <p className="text-slate-700 mb-4 leading-relaxed">{subjectItem.description}</p>
        
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Video thumbnail and PDF download section */}
        {/* MULTIMEDIA CONTENT REASON: Official Tailwind CSS grid patterns for multimedia content display */}
        {(subjectItem.videoThumbnail || subjectItem.pdfDownload) && (
          <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg">
            {subjectItem.videoThumbnail && (
              <div className="mb-3">
                <Link 
                  href={subjectItem.videoThumbnail.isPlaceholder ? '#' : subjectItem.videoThumbnail.videoUrl}
                  className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium text-sm transition-colors"
                >
                  <Play className="w-4 h-4" />
                  {subjectItem.videoThumbnail.title}
                  {subjectItem.videoThumbnail.isPlaceholder && <span className="text-xs opacity-75">(Coming Soon)</span>}
                  {!subjectItem.videoThumbnail.isPlaceholder && <ExternalLink className="w-3 h-3" />}
                </Link>
              </div>
            )}
            {subjectItem.pdfDownload && (
              <div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-amber-300 text-amber-800 hover:bg-amber-100"
                  disabled={subjectItem.pdfDownload.isPlaceholder}
                  asChild={!subjectItem.pdfDownload.isPlaceholder}
                >
                  {subjectItem.pdfDownload.isPlaceholder ? (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      {subjectItem.pdfDownload.title} (Coming Soon)
                    </>
                  ) : (
                    <Link href={subjectItem.pdfDownload.downloadUrl}>
                      <Download className="w-4 h-4 mr-2" />
                      {subjectItem.pdfDownload.title}
                    </Link>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {subjectItem.keyFeatures.map((feature, featureIndex) => (
            <Badge 
              key={featureIndex} 
              variant="secondary" 
              className="bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 border-amber-200 font-medium"
            >
              {feature}
            </Badge>
          ))}
        </div>
      </m.div>
    )
  }

  // CONTEXT7 SOURCE: /radix-ui/website - Subject item with nested children creates multi-level accordion
  // NESTED_ACCORDION_REASON: Official Radix UI documentation for nested accordion patterns with enhanced accessibility
  return (
    <Card className="border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mb-4">
      <button
        onClick={() => setIsNestedOpen(!isNestedOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-t-xl min-h-[44px] focus-visible:ring-2 focus-visible:ring-accent-500"
        aria-expanded={isNestedOpen}
        aria-controls={`nested-${parentId}-${index}`}
        aria-label={`${isNestedOpen ? 'Collapse' : 'Expand'} ${subjectItem.name} section`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsNestedOpen(!isNestedOpen)
          }
        }}
      >
        <div className="text-left">
          <h4 id={`nested-header-${parentId}-${index}`} className="text-lg font-serif font-bold text-slate-900">{subjectItem.name}</h4>
          <p className="text-slate-600 mt-1">{subjectItem.description}</p>
        </div>
        <div className="text-slate-400 transition-transform duration-200" aria-hidden="true">
          {isNestedOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </div>
      </button>
      
      {isNestedOpen && (
        <m.div
          id={`nested-${parentId}-${index}`}
          className="border-t border-slate-200 bg-gradient-to-b from-slate-25 to-white"
          initial={reduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={reduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
          role="region"
          aria-labelledby={`nested-header-${parentId}-${index}`}
        >
          <div className="p-6 space-y-4">
            {subjectItem.children!.map((childItem, childIndex) => (
              <m.div
                key={childIndex}
                className="bg-gradient-to-r from-white to-slate-50 border border-slate-150 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.4, delay: childIndex * 0.08 }}
                viewport={{ once: true }}
              >
                <h5 className="text-md font-serif font-semibold text-slate-900 mb-2">{childItem.name}</h5>
                <p className="text-slate-700 mb-3 text-sm leading-relaxed">{childItem.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {childItem.keyFeatures.map((feature, featureIndex) => (
                    <Badge 
                      key={featureIndex} 
                      variant="outline" 
                      className="bg-white text-slate-700 border-slate-300 text-xs font-medium"
                    >
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

// CONTEXT7 SOURCE: /grx7/framer-motion - AccordionSection component with motion.div animations
// ANIMATION IMPLEMENTATION REASON: Official Framer Motion patterns for expandable content with height:'auto'
// CONTEXT7 SOURCE: /radix-ui/website - Enhanced accordion button patterns with accessibility compliance
// ACCESSIBILITY_ENHANCEMENT_REASON: Official Radix UI documentation for accessible button states with WCAG 2.1 AA touch targets
function AccordionSection({ category, isOpen, onToggle }: AccordionSectionProps) {
  return (
    <Card className="border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 min-h-[44px] focus-visible:ring-2 focus-visible:ring-accent-500"
        aria-expanded={isOpen}
        aria-controls={`section-${category.id}`}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${category.title} section`}
      >
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-full p-3 text-amber-700 shadow-sm">
            {category.icon}
          </div>
          <div className="text-left">
            <h3 className="text-xl font-serif font-bold text-slate-900">{category.title}</h3>
            <p className="text-slate-600 mt-1">{category.description}</p>
          </div>
        </div>
        <div className="text-slate-400 transition-transform duration-200">
          {isOpen ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </div>
      </button>
      
      {isOpen && (
        <m.div
          id={`section-${category.id}`}
          className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="p-6 space-y-6">
            {category.subjects.map((subjectItem, index) => (
              <NestedSubjectItem
                key={index}
                subjectItem={subjectItem}
                index={index}
                parentId={category.id}
              />
            ))}
            
            {/* CONTEXT7 SOURCE: /context7/tailwindcss - Responsive grid layout patterns for call outs and testimonials */}
            {/* LAYOUT REASON: Official Tailwind CSS patterns for responsive column layouts with proper spacing */}
            <div className="mt-8 pt-6 border-t border-slate-200 space-y-6">
              
              {/* Call Outs Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-serif font-bold text-slate-900">Key Benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.callOuts.map((callOut, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-2 text-slate-700"
                    >
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{callOut}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Section */}
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-5">
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Quote positioning fix with proper grid layout */}
                {/* QUOTE FORMATTING REASON: Official Tailwind CSS relative positioning for proper quote mark alignment */}
                <div className="relative">
                  <div className="absolute -top-2 -left-1 text-yellow-500 text-4xl font-serif leading-none">"</div>
                  <div className="pl-6 pr-4">
                    <p className="text-slate-700 italic leading-relaxed text-sm">
                      {category.testimonial}
                    </p>
                  </div>
                  <div className="absolute -bottom-2 right-0 text-yellow-500 text-4xl font-serif leading-none rotate-180">"</div>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </Card>
  )
}

// CONTEXT7 SOURCE: /facebook/react - Main component with state management patterns
// STATE MANAGEMENT REASON: Official React documentation recommends useState for component-level state with array manipulation
export function SubjectAccordion({ 
  categories, 
  defaultOpenSections = [], 
  className = "",
  onSectionToggle 
}: SubjectAccordionProps) {
  const [openSections, setOpenSections] = useState<string[]>(defaultOpenSections)

  const toggleSection = (sectionId: string) => {
    const isCurrentlyOpen = openSections.includes(sectionId)
    const newOpenSections = isCurrentlyOpen 
      ? openSections.filter(id => id !== sectionId)
      : [...openSections, sectionId]
    
    setOpenSections(newOpenSections)
    onSectionToggle?.(sectionId, !isCurrentlyOpen)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {categories.map((category) => (
        <AccordionSection
          key={category.id}
          category={category}
          isOpen={openSections.includes(category.id)}
          onToggle={() => toggleSection(category.id)}
        />
      ))}
    </div>
  )
}

export default SubjectAccordion