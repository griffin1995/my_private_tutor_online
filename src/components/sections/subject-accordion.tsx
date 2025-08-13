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
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// CONTEXT7 SOURCE: /facebook/react - TypeScript interface patterns for component props
// INTERFACE REASON: Official React TypeScript documentation recommends explicit prop typing for reusable components
export interface SubjectItem {
  name: string
  description: string
  keyFeatures: string[]
}

export interface SubjectCategory {
  id: string
  title: string
  icon: React.ReactElement<LucideIcon>
  description: string
  subjects: SubjectItem[]
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

// CONTEXT7 SOURCE: /grx7/framer-motion - AccordionSection component with motion.div animations
// ANIMATION IMPLEMENTATION REASON: Official Framer Motion patterns for expandable content with height:'auto'
function AccordionSection({ category, isOpen, onToggle }: AccordionSectionProps) {
  return (
    <Card className="border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-all duration-300"
        aria-expanded={isOpen}
        aria-controls={`section-${category.id}`}
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
            ))}
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