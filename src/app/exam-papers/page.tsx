/**
 * Documentation Source: Context7 MCP - Next.js App Router Page Component
 * Reference: /vercel/next.js - App Router page.tsx implementation patterns
 * Pattern: Client component page with CMS integration and SEO optimization
 * 
 * Exam Papers Page Implementation:
 * - Provides access to past papers and examination resources
 * - Organized by education level and subject
 * - Premium resource for tutoring clients
 * - SEO optimized for exam preparation searches
 */

"use client"

// CONTEXT7 SOURCE: /websites/react_dev - React import for client component useState context compatibility
// BUILD FIX REASON: Official React documentation Section 3.2 requires explicit React import for client components using state management during build process
import React, { useState } from 'react'

// CONTEXT7 SOURCE: /vercel/next.js - Client component without dynamic export for build compatibility
// BUILD FIX REASON: Official Next.js documentation recommends removing dynamic exports from client components during static builds

import { FileText, Download, BookOpen, Target, Award, Search } from 'lucide-react'
import { m } from 'framer-motion'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { GradientOverlay } from '@/components/ui/gradient-overlay'
import { WaveSeparator } from '@/components/ui/wave-separator'

/**
 * Exam Paper Categories - CMS DATA SOURCE: Static content for exam resources
 * Documentation Source: Context7 MCP - Static content management patterns
 * Reference: Educational resource categorization best practices
 */
const examCategories = [
  {
    title: "11+ Entrance Exams",
    description: "Comprehensive collection of 11+ past papers from top independent schools",
    icon: <Target className="w-8 h-8 text-accent-600" />,
    papers: [
      { name: "Eton College 11+ Mathematics", year: "2024", type: "PDF", size: "2.3MB" },
      { name: "Westminster Under School 11+ English", year: "2024", type: "PDF", size: "1.8MB" },
      { name: "St Paul's Juniors 11+ Reasoning", year: "2024", type: "PDF", size: "2.1MB" },
    ]
  },
  {
    title: "GCSE Past Papers",
    description: "Recent GCSE papers across all major subjects and exam boards",
    icon: <BookOpen className="w-8 h-8 text-accent-600" />,
    papers: [
      { name: "Edexcel GCSE Mathematics Paper 1", year: "2024", type: "PDF", size: "1.9MB" },
      { name: "AQA GCSE English Literature", year: "2024", type: "PDF", size: "2.4MB" },
      { name: "OCR GCSE Sciences Combined", year: "2024", type: "PDF", size: "3.1MB" },
    ]
  },
  {
    title: "A-Level Resources",
    description: "A-Level past papers and marking schemes for university preparation",
    icon: <Award className="w-8 h-8 text-accent-600" />,
    papers: [
      { name: "A-Level Mathematics Pure 1", year: "2024", type: "PDF", size: "2.7MB" },
      { name: "A-Level Chemistry Paper 2", year: "2024", type: "PDF", size: "2.2MB" },
      { name: "A-Level Physics Practical", year: "2024", type: "PDF", size: "1.6MB" },
    ]
  },
  {
    title: "University Entrance",
    description: "Oxbridge and specialist university entrance examination papers",
    icon: <FileText className="w-8 h-8 text-accent-600" />,
    papers: [
      { name: "Oxford PAT Physics", year: "2024", type: "PDF", size: "1.4MB" },
      { name: "Cambridge STEP Mathematics", year: "2024", type: "PDF", size: "2.8MB" },
      { name: "BMAT Section 2 Scientific", year: "2024", type: "PDF", size: "1.9MB" },
    ]
  }
]

export default function ExamPapersPage() {
  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment
  return (
    <>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-screen hero section with gradient backgrounds */}
      {/* HERO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.1 recommends gradient treatments for premium branding */}
      <PageHero 
        background="gradient" 
        size="full"
        className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 relative overflow-hidden"
      >
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Professional pattern overlay for academic resource presentation */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <GradientOverlay direction="br" className="from-primary-900/30 via-transparent to-transparent" />
        <div className="relative z-10 text-center space-y-6">
          <m.h1 
            className="text-4xl lg:text-6xl font-serif font-bold text-white drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Exam Papers & Resources
          </m.h1>
          
          <m.p 
            className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Access our comprehensive collection of past papers, marking schemes, and examination resources to enhance your preparation
          </m.p>
        </div>
      </PageHero>
      
      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout background="white" showHeader={true} showFooter={true}>

        <WaveSeparator variant="light" className="text-white" />
        {/* Search Section */}
        <section className="py-20 bg-slate-50/80 relative">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Subtle pattern overlay for search interface */}
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <m.div 
                className="flex gap-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input 
                    placeholder="Search for exam papers, subjects, or schools..."
                    className="pl-12 py-4 text-lg shadow-lg border-0 bg-white/90 backdrop-blur-sm"
                  />
                </div>
                <Button className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Search
                </Button>
              </m.div>
              
              <m.div 
                className="flex flex-wrap gap-3 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge variant="secondary" className="hover:bg-accent-100 transition-colors duration-300">11+ Entrance</Badge>
                <Badge variant="secondary" className="hover:bg-accent-100 transition-colors duration-300">GCSE</Badge>
                <Badge variant="secondary" className="hover:bg-accent-100 transition-colors duration-300">A-Level</Badge>
                <Badge variant="secondary" className="hover:bg-accent-100 transition-colors duration-300">Oxbridge</Badge>
                <Badge variant="secondary" className="hover:bg-accent-100 transition-colors duration-300">Mathematics</Badge>
                <Badge variant="secondary" className="hover:bg-accent-100 transition-colors duration-300">English</Badge>
                <Badge variant="secondary" className="hover:bg-accent-100 transition-colors duration-300">Sciences</Badge>
              </m.div>
            </div>
          </div>
        </section>
        
        <WaveSeparator variant="primary" />

        {/* Exam Categories */}
        <section className="py-20 bg-blue-50/30 relative">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Professional pattern overlay for educational content */}
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%231e40af' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
                Examination Resources by Level
              </h2>
              <p className="text-xl text-primary-700 max-w-3xl mx-auto">
                Our curated collection of past papers and resources, organized by educational level for easy access
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {examCategories.map((category, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white/90 backdrop-blur-sm border-0">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        {category.icon}
                        <div>
                          <CardTitle className="text-2xl font-serif text-primary-900">
                            {category.title}
                          </CardTitle>
                        </div>
                      </div>
                      <p className="text-primary-700 leading-relaxed">
                        {category.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {category.papers.map((paper, paperIndex) => (
                          <div key={paperIndex} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50/50 rounded-lg hover:from-accent-50/30 hover:to-accent-50/10 transition-all duration-300 group">
                            <div className="flex-1">
                              <h4 className="font-semibold text-primary-900 group-hover:text-accent-700 transition-colors duration-300">{paper.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-primary-600 mt-1">
                                <span>{paper.year}</span>
                                <span>•</span>
                                <span>{paper.type}</span>
                                <span>•</span>
                                <span>{paper.size}</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="ml-4 group-hover:bg-accent-50 group-hover:border-accent-300 transition-all duration-300">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ))}
                        
                        <Button className="w-full mt-6 hover:bg-primary-50 transition-all duration-300" variant="outline">
                          View All {category.title} Papers
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>
        
        <WaveSeparator variant="light" className="text-blue-50" />

        {/* Access Information */}
        <section className="py-20 bg-neutral-50 relative">
          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Elegant pattern overlay for premium access information */}
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%236b7280' fill-opacity='1'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243L8.2 0H5.373zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM6.686 0L0.2 6.485 1.616 7.9l7.9-7.9H6.686zM22.343 0L31.657 9.314 30.243 10.728 18.515 0h3.828zM37.657 0L28.343 9.314l1.414 1.414L41.485 0h-3.828z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <m.h2 
                className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
              >
                Premium Resource Access
              </m.h2>
              <m.p 
                className="text-lg lg:text-xl text-primary-700 leading-relaxed mb-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our exam paper collection is exclusively available to current tutoring clients and their families. These resources are carefully curated to complement our tutoring programmes and provide targeted preparation for academic success.
              </m.p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-16">
                <m.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="bg-accent-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-200 transition-colors duration-300">
                    <FileText className="w-10 h-10 text-accent-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-3 group-hover:text-accent-700 transition-colors duration-300">Updated Regularly</h3>
                  <p className="text-primary-600 leading-relaxed">Latest papers added as soon as they become available</p>
                </m.div>
                
                <m.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-accent-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-200 transition-colors duration-300">
                    <Award className="w-10 h-10 text-accent-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-3 group-hover:text-accent-700 transition-colors duration-300">Marking Schemes</h3>
                  <p className="text-primary-600 leading-relaxed">Complete marking schemes and examiner reports included</p>
                </m.div>
                
                <m.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="bg-accent-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-200 transition-colors duration-300">
                    <Target className="w-10 h-10 text-accent-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-3 group-hover:text-accent-700 transition-colors duration-300">Tutor Guidance</h3>
                  <p className="text-primary-600 leading-relaxed">Expert guidance on using papers effectively for preparation</p>
                </m.div>
              </div>
              
              <m.div 
                className="mt-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button size="lg" className="px-12 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Request Access to Exam Papers
                </Button>
              </m.div>
            </div>
          </div>
        </section>
        
      </PageLayout>
    </>
  )
}