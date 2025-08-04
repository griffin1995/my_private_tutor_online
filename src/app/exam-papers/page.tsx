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

import { FileText, Download, BookOpen, Target, Award, Search } from 'lucide-react'
import { m } from 'framer-motion'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

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
  return (
    <div>
      <PageHeader />
      
      <PageHero 
        background="gradient" 
        size="medium"
        className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
      >
        <div className="text-center space-y-6">
          <m.h1 
            className="text-4xl lg:text-5xl font-serif font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Exam Papers & Resources
          </m.h1>
          
          <m.p 
            className="text-xl text-accent-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Access our comprehensive collection of past papers, marking schemes, and examination resources to enhance your preparation
          </m.p>
        </div>
      </PageHero>

      <PageLayout background="white" showHeader={false} showFooter={true}>
        {/* Search Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input 
                    placeholder="Search for exam papers, subjects, or schools..."
                    className="pl-10 py-3 text-lg"
                  />
                </div>
                <Button className="px-8 py-3 text-lg">
                  Search
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">11+ Entrance</Badge>
                <Badge variant="secondary">GCSE</Badge>
                <Badge variant="secondary">A-Level</Badge>
                <Badge variant="secondary">Oxbridge</Badge>
                <Badge variant="secondary">Mathematics</Badge>
                <Badge variant="secondary">English</Badge>
                <Badge variant="secondary">Sciences</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Exam Categories */}
        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
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
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                          <div key={paperIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-semibold text-primary-900">{paper.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-primary-600 mt-1">
                                <span>{paper.year}</span>
                                <span>•</span>
                                <span>{paper.type}</span>
                                <span>•</span>
                                <span>{paper.size}</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="ml-4">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ))}
                        
                        <Button className="w-full mt-4" variant="outline">
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

        {/* Access Information */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-primary-900 mb-6">
                Premium Resource Access
              </h2>
              <p className="text-lg text-primary-700 leading-relaxed mb-8">
                Our exam paper collection is exclusively available to current tutoring clients and their families. These resources are carefully curated to complement our tutoring programmes and provide targeted preparation for academic success.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">Updated Regularly</h3>
                  <p className="text-primary-600">Latest papers added as soon as they become available</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">Marking Schemes</h3>
                  <p className="text-primary-600">Complete marking schemes and examiner reports included</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">Tutor Guidance</h3>
                  <p className="text-primary-600">Expert guidance on using papers effectively for preparation</p>
                </div>
              </div>
              
              <div className="mt-12">
                <Button size="lg" className="px-8 py-3">
                  Request Access to Exam Papers
                </Button>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </div>
  )
}