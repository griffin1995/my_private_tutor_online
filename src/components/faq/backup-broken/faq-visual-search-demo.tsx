/**
 * CONTEXT7 SOURCE: /naptha/tesseract.js - Demo component for visual search functionality testing
 * DEMO PURPOSE: Standalone visual search component for testing OCR and search functionality
 */

"use client"

import React from 'react'
import { FAQVisualSearch } from './faq-visual-search'
import { getFAQCategories } from '@/lib/cms/cms-content'

/**
 * Demo component for testing visual search functionality
 * CONTEXT7 SOURCE: /naptha/tesseract.js - Standalone demo for OCR testing
 */
export function FAQVisualSearchDemo() {
  // CMS DATA SOURCE: Using getFAQCategories for demo data
  const faqCategories = getFAQCategories()
  const questions = faqCategories.flatMap(category => category.questions)

  const handleSearchResults = (results: any[]) => {
    console.log('Visual search results:', results)
  }

  const handleOCRText = (text: string) => {
    console.log('OCR extracted text:', text)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Visual Search Demo
        </h1>
        <p className="text-lg text-slate-600">
          Test the OCR-powered FAQ visual search functionality
        </p>
      </div>
      
      <FAQVisualSearch
        questions={questions}
        categories={faqCategories}
        onSearchResults={handleSearchResults}
        onOCRText={handleOCRText}
        placeholder="Upload a screenshot to test OCR functionality..."
      />
    </div>
  )
}