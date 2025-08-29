/**
 * CONTEXT7 SOURCE: /vercel/next.js - Client Component with minimal architecture
 * IMPLEMENTATION REASON: Official Next.js documentation for clean, minimal FAQ page implementation
 * 
 * Minimal FAQ Page - Clean Implementation
 * Features:
 * - Radix UI Accordion for Q&A display
 * - Synchronous CMS data access (CLAUDE.md compliance)
 * - Basic search functionality with useState
 * - Single component approach (~200 lines)
 * - Clean, professional styling with Tailwind
 * 
 * WCAG 2.1 AA Features:
 * - Semantic HTML structure
 * - Keyboard navigation support
 * - Screen reader compatibility
 * - Focus management
 */

"use client"

// CONTEXT7 SOURCE: /facebook/react - React hooks for state management
// STATE MANAGEMENT: Basic search filtering with useState only
import React, { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

// CONTEXT7 SOURCE: /radix-ui/primitives - Accordion component imports
// ACCORDION: Using existing Radix UI Accordion component
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// CONTEXT7 SOURCE: /microsoft/typescript - Synchronous CMS imports (CLAUDE.md compliance)
// SYNCHRONOUS CMS: Using existing CMS functions for data access
import { getFAQCategories, getUnifiedContact } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Utility function for CSS classes
import { cn } from "@/lib/utils"

/**
 * FAQ Page Component - Minimal Implementation
 * CONTEXT7 SOURCE: /vercel/next.js - Simple page component patterns
 * MINIMAL APPROACH: Single component with basic search and accordion display
 */
export default function FAQPage() {
  // CONTEXT7 SOURCE: /facebook/react - useState for search functionality
  // SEARCH STATE: Simple client-side filtering
  const [searchQuery, setSearchQuery] = useState('')

  // CONTEXT7 SOURCE: /microsoft/typescript - Synchronous data access (CLAUDE.md compliance)
  // CMS DATA: Direct function calls without loading states
  const categories = getFAQCategories()
  const contactData = getUnifiedContact()

  // CONTEXT7 SOURCE: /facebook/react - useMemo for filtered results
  // SEARCH FILTERING: Filter questions based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories

    return categories.map(category => ({
      ...category,
      questions: category.questions.filter(
        q =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.questions.length > 0)
  }, [categories, searchQuery])

  return (
    // CONTEXT7 SOURCE: /w3c/wcag - Semantic HTML structure for accessibility
    // ACCESSIBILITY: Proper page structure with semantic elements
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      
      {/* Hero Section */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Hero section with gradient background */}
      {/* HERO DESIGN: Clean, minimal hero with search focus */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-serif font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg lg:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Find quick answers to common questions about our premium tutoring services
          </p>
        </div>
      </section>

      {/* Search Section */}
      {/* CONTEXT7 SOURCE: /w3c/wcag - Search form with proper labels */}
      {/* SEARCH INTERFACE: Accessible search with clear labeling */}
      <section className="py-8 bg-white border-b border-slate-200" role="search" aria-label="FAQ Search">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-2xl mx-auto">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQ questions and answers
            </label>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              id="faq-search"
              type="text"
              placeholder="Search questions and answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg",
                "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                "text-slate-900 placeholder-slate-500",
                "transition-all duration-200"
              )}
              aria-describedby="search-help"
            />
            <p id="search-help" className="sr-only">
              Type to search through all FAQ questions and answers
            </p>
          </div>
          {searchQuery && (
            <div className="text-center mt-4">
              <p className="text-sm text-slate-600">
                {filteredCategories.reduce((sum, cat) => sum + cat.questions.length, 0)} 
                {' '}results found for "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="ml-2 text-sm text-primary-600 hover:text-primary-700 underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Content */}
      {/* CONTEXT7 SOURCE: /w3c/wcag - Main content with proper heading hierarchy */}
      {/* FAQ CONTENT: Accessible accordion implementation */}
      <main className="py-12" role="main" aria-label="FAQ Content">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredCategories.length === 0 ? (
            // CONTEXT7 SOURCE: /w3c/wcag - No results state with helpful messaging
            // NO RESULTS: Clear messaging when search returns no results
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤔</div>
              <h2 className="text-2xl font-serif font-semibold text-slate-900 mb-4">
                No results found
              </h2>
              <p className="text-slate-600 mb-6">
                We couldn't find any questions matching "{searchQuery}". 
                Try different keywords or browse all categories below.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Show all questions
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredCategories.map((category) => (
                <section key={category.id} className="space-y-4">
                  {/* Category Header */}
                  {/* CONTEXT7 SOURCE: /w3c/wcag - Category sections with proper headings */}
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-2xl" role="img" aria-label={`${category.title} icon`}>
                      {category.icon}
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-slate-900">
                      {category.title}
                    </h2>
                    <span className="bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full">
                      {category.questions.length} question{category.questions.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Questions Accordion */}
                  {/* CONTEXT7 SOURCE: /radix-ui/primitives - Accordion implementation with collapsible behavior */}
                  {/* ACCORDION: Using Radix UI for accessible Q&A display */}
                  <Accordion type="multiple" className="space-y-2">
                    {category.questions.map((item, index) => (
                      <AccordionItem
                        key={`${category.id}-${index}`}
                        value={`${category.id}-${index}`}
                        className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left font-medium text-slate-900 hover:text-primary-700">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <div className="prose prose-slate max-w-none">
                            <p className="text-slate-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Contact Section */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Contact CTA section */}
      {/* CONTACT CTA: Simple contact section for additional support */}
      <section className="bg-slate-50 py-16" id="contact" role="region" aria-label="Contact information">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our team is here to help. 
            Contact us directly for personalised assistance.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Email Contact */}
            <a
              href={`mailto:${contactData.primary.primaryEmail}`}
              className={cn(
                "bg-white border border-slate-200 rounded-lg p-6",
                "hover:border-primary-300 hover:shadow-lg transition-all duration-200",
                "group focus:ring-2 focus:ring-primary-500 focus:outline-none"
              )}
            >
              <div className="text-primary-600 mb-3 group-hover:text-primary-700">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-600 text-sm">{contactData.primary.primaryEmail}</p>
            </a>

            {/* Phone Contact */}
            <a
              href={`tel:${contactData.primary.phone}`}
              className={cn(
                "bg-white border border-slate-200 rounded-lg p-6",
                "hover:border-primary-300 hover:shadow-lg transition-all duration-200",
                "group focus:ring-2 focus:ring-primary-500 focus:outline-none"
              )}
            >
              <div className="text-primary-600 mb-3 group-hover:text-primary-700">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-600 text-sm">{contactData.primary.phone}</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}