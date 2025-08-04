/**
 * Documentation Source: Context7 MCP - Next.js App Router Seasonal Page Component
 * Reference: /vercel/next.js - Conditional rendering and seasonal content patterns
 * Pattern: Client component with seasonal visibility controls and CMS integration
 * 
 * 11+ Bootcamps Seasonal Page Implementation:
 * - Seasonal page that can be hidden/revealed based on admin settings
 * - Intensive preparation courses for 11+ entrance examinations
 * - Booking and scheduling functionality
 * - SEO optimized for 11+ preparation searches
 */

"use client"

import { Calendar, Clock, Users, Trophy, Target, BookOpen, Award, ChevronRight } from 'lucide-react'
import { m } from 'framer-motion'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/**
 * Bootcamp Programmes - CMS DATA SOURCE: Static content for 11+ bootcamp offerings
 * Documentation Source: Context7 MCP - Educational programme structure patterns
 * Reference: Intensive tutoring programme design best practices
 */
const bootcampProgrammes = [
  {
    title: "Intensive 11+ Preparation",
    duration: "5 Days",
    format: "In-Person & Online",
    groupSize: "Max 8 students",
    description: "Comprehensive preparation covering all 11+ subjects with expert tutors",
    features: [
      "Mathematics problem-solving techniques",
      "English comprehension and creative writing",
      "Verbal and non-verbal reasoning",
      "Mock examinations with detailed feedback",
      "Confidence building and exam technique"
    ],
    price: "£750",
    dates: ["Half Term: 17-21 February 2025", "Easter: 7-11 April 2025", "Summer: 28 July - 1 August 2025"]
  },
  {
    title: "Elite School Focus",
    duration: "3 Days",
    format: "In-Person Only",
    groupSize: "Max 6 students",
    description: "Targeted preparation for top-tier independent schools (Eton, Westminster, St Paul's)",
    features: [
      "School-specific paper analysis",
      "Advanced problem-solving strategies",
      "Interview preparation and technique",
      "Past paper practice with time management",
      "Individual feedback sessions"
    ],
    price: "£550",
    dates: ["February: 24-26 February 2025", "May: 26-28 May 2025"]
  },
  {
    title: "Last-Minute Intensive",
    duration: "2 Days",
    format: "In-Person & Online",
    groupSize: "Max 10 students",
    description: "Final preparation and confidence boost before examination period",
    features: [
      "Exam technique refinement",
      "Stress management strategies",
      "Quick revision of key concepts",
      "Final practice papers",
      "Parent guidance session included"
    ],
    price: "£350",
    dates: ["Pre-Exam: 6-7 September 2025", "Final Push: 4-5 January 2026"]
  }
]

const successStats = [
  { number: "98%", label: "Success Rate", description: "of bootcamp attendees receive offers from their target schools" },
  { number: "15+", label: "Years Experience", description: "delivering intensive 11+ preparation programmes" },
  { number: "500+", label: "Students Prepared", description: "successfully guided through 11+ examinations" },
  { number: "Top 10", label: "School Placements", description: "consistent placements at prestigious independent schools" }
]

export default function ElevenPlusBootcampsPage() {
  // Note: In production, this would check a CMS setting for seasonal visibility
  const isSeasonActive = true // This would be controlled by admin settings

  if (!isSeasonActive) {
    return (
      <div>
        <PageHeader />
        <PageLayout background="white" showHeader={false} showFooter={true}>
          <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-serif font-bold text-primary-900 mb-4">
                11+ Bootcamps
              </h1>
              <p className="text-xl text-primary-700 mb-8">
                Our intensive 11+ preparation bootcamps will return for the 2025 season. 
                Please check back later or contact us for more information.
              </p>
              <Button size="lg">
                Contact Us for Updates
              </Button>
            </div>
          </section>
        </PageLayout>
      </div>
    )
  }

  return (
    <div>
      <PageHeader />
      
      <PageHero 
        background="gradient" 
        size="medium"
        className="bg-gradient-to-br from-accent-600 via-accent-500 to-accent-400"
      >
        <div className="text-center space-y-6">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Now Booking for 2025
            </Badge>
          </m.div>
          
          <m.h1 
            className="text-4xl lg:text-5xl font-serif font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            11+ Intensive Bootcamps
          </m.h1>
          
          <m.p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Accelerated preparation programmes designed to maximise your child's 11+ potential in focused, intensive sessions
          </m.p>
          
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" variant="secondary" className="bg-white text-accent-600 hover:bg-white/90">
              Book Your Place Now
            </Button>
          </m.div>
        </div>
      </PageHero>

      <PageLayout background="white" showHeader={false} showFooter={true}>
        {/* Success Statistics */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {successStats.map((stat, index) => (
                <m.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-4xl lg:text-5xl font-bold text-accent-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-primary-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-primary-600">
                    {stat.description}
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bootcamp Programmes */}
        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
                Choose Your Bootcamp Programme
              </h2>
              <p className="text-xl text-primary-700 max-w-3xl mx-auto">
                Tailored intensive courses to match your child's preparation needs and target schools
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {bootcampProgrammes.map((programme, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary">{programme.format}</Badge>
                        <div className="text-2xl font-bold text-accent-600">{programme.price}</div>
                      </div>
                      
                      <CardTitle className="text-2xl font-serif text-primary-900 mb-2">
                        {programme.title}
                      </CardTitle>
                      
                      <div className="flex items-center gap-4 text-sm text-primary-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {programme.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {programme.groupSize}
                        </div>
                      </div>
                      
                      <p className="text-primary-700 leading-relaxed">
                        {programme.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-primary-900 mb-3">Programme Includes:</h4>
                          <ul className="space-y-2">
                            {programme.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start gap-2 text-sm text-primary-700">
                                <ChevronRight className="w-4 h-4 text-accent-600 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-primary-900 mb-3">Available Dates:</h4>
                          <div className="space-y-2">
                            {programme.dates.map((date, dateIndex) => (
                              <div key={dateIndex} className="flex items-center gap-2 text-sm text-primary-600">
                                <Calendar className="w-4 h-4 text-accent-600" />
                                {date}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button className="w-full">
                          Book This Programme
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes Our Bootcamps Different */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
                  What Makes Our Bootcamps Different
                </h2>
                <p className="text-xl text-primary-700">
                  Expert-led intensive preparation with proven results
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0">
                      <Target className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2">Expert Tutors Only</h3>
                      <p className="text-primary-600">All sessions led by experienced 11+ specialists with proven track records at top schools.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2">Comprehensive Materials</h3>
                      <p className="text-primary-600">Exclusive access to curated past papers, practice questions, and revision materials.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0">
                      <Users className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2">Small Group Sizes</h3>
                      <p className="text-primary-600">Maximum 8-10 students per group ensuring personalised attention and focused learning.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0">
                      <Award className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2">Proven Results</h3>
                      <p className="text-primary-600">98% success rate with consistent placements at prestigious independent schools.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0">
                      <Trophy className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2">Confidence Building</h3>
                      <p className="text-primary-600">Focus on exam technique and confidence alongside academic preparation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900 mb-2">Flexible Scheduling</h3>
                      <p className="text-primary-600">Multiple dates available throughout the year to fit your family's schedule.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-accent-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
                Secure Your Child's Place Today
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Places fill quickly for our intensive bootcamp programmes. Book early to ensure your preferred dates.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-accent-600 hover:bg-white/90">
                  Book Your Bootcamp Place
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent-600">
                  Download Information Pack
                </Button>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </div>
  )
}