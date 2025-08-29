/**
 * CONTEXT7 SOURCE: /vercel/next.js - Component extraction patterns for reusable Client Components
 * MODULARIZATION REASON: Official Next.js documentation recommends extracting interactive components into separate modules
 * 
 * FAQ Search Section Component
 * Handles search functionality and category filtering for FAQ page
 * Extracted from FAQ page for reusability and better maintainability
 * 
 * Features:
 * - Real-time search filtering
 * - Category badge selection
 * - Animated interactions
 * - Responsive design
 */

"use client"

import { useState } from 'react'
import { m } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Section } from '@/components/layout/section'
import { GradientOverlay } from '@/components/ui/gradient-overlay'
import type { FAQCategory } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for component props
// COMPONENT PROPS: TypeScript interfaces for FAQ search functionality
interface FAQSearchSectionProps {
  faqCategories: readonly FAQCategory[]
  searchQuery: string
  selectedCategory: string | null
  onSearchChange: (query: string) => void
  onCategorySelect: (category: string | null) => void
}

/**
 * FAQ Search Section Component
 * CONTEXT7 SOURCE: /vercel/next.js - Client Component extraction for interactive elements
 * EXTRACTION REASON: Separates search logic from main page component per Next.js modular design patterns
 */
export function FAQSearchSection({
  faqCategories,
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategorySelect
}: FAQSearchSectionProps) {
  return (
    <Section className="py-20 relative" background="blue">
      <GradientOverlay variant="subtle" className="opacity-20" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - whileInView animations for scroll-triggered animations */}
        {/* ANIMATION REASON: Official Framer Motion patterns for viewport-based animations */}
        <m.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Search Input */}
          <div className="relative mb-10">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
            <Input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-16 pr-6 py-5 text-lg border-2 border-slate-200 rounded-2xl bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xl hover:shadow-2xl transition-all duration-300"
            />
          </div>
          
          {/* Category Filter Pills */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Responsive flex layouts and interactive states */}
          {/* INTERACTIVE DESIGN: Badge-based category filtering with hover and selection states */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => onCategorySelect(null)}
              className="cursor-pointer px-6 py-3 text-sm font-semibold hover:scale-105 transition-all duration-200 bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg hover:shadow-xl"
            >
              All Categories ({faqCategories.reduce((total, cat) => total + cat.questions.length, 0)})
            </Badge>
            {faqCategories.map((category) => (
              <Badge
                key={category.title}
                variant={selectedCategory === category.title ? "default" : "outline"}
                onClick={() => onCategorySelect(category.title)}
                className={`cursor-pointer px-6 py-3 text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl ${
                  selectedCategory === category.title 
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-amber-400' 
                    : 'bg-white/80 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-white hover:border-amber-300'
                }`}
              >
                <span className="mr-2">{category.icon}</span> {category.title} ({category.questions.length})
              </Badge>
            ))}
          </div>
        </m.div>
      </div>
    </Section>
  )
}