/**
 * Documentation Source: Next.js 14 + React 18 + Framer Motion
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://react.dev/reference/react/useState
 * Reference: https://www.framer.com/motion/lazy-motion/
 * 
 * Pattern: Client Component with interactive tabs and animations
 * Architecture: Uses LazyMotion 'm' component for optimized bundle
 * State Management: Local state with useState for tab selection
 * 
 * Component Libraries:
 * - Radix UI (via shadcn/ui) for accessible Tabs component
 * - Framer Motion for scroll animations
 * 
 * TODO: Migrate homeschoolingContent to CMS system
 */

"use client"

// CONTEXT7 SOURCE: /websites/react_dev - React import for client component useState context compatibility
// BUILD FIX REASON: Official React documentation Section 3.2 requires explicit React import for client components using state management during build process
import React from 'react'

// CONTEXT7 SOURCE: /vercel/next.js - Client component without dynamic export for build compatibility
// BUILD FIX REASON: Official Next.js documentation recommends removing dynamic exports from client components during static builds

import { useState } from 'react'
import { m } from 'framer-motion'
import { Home, CheckCircle, Clock, Target, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GradientOverlay } from '@/components/ui/gradient-overlay'
import { WaveSeparator } from '@/components/ui/wave-separator'

// RENDERING ANALYSIS - Context7 MCP Verified:
// Documentation Source: Next.js Client Components Dynamic Rendering
// Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/05-server-and-client-components.mdx
//
// - Component Type: Client Component ("use client") - AUTOMATICALLY DYNAMIC
// - Next.js automatically makes Client Components dynamic - no explicit config needed
// - Industry Standard: Client Components are inherently dynamic, force-dynamic is unnecessary
// - Context7 Verification: "Client Components run on the client and do not require JavaScript to render on the client"
//
// ROUTE SEGMENT ANALYSIS:
// - Rendering Mode: Dynamic (ƒ) - Automatic via "use client" directive
// - Parent/Child: Homeschooling page component, children: PageLayout, PageHero, Section, Tabs components
// - Dynamic Features: useState for tab selection, Framer Motion animations, interactive tab navigation
// - Dependencies: Hardcoded content object (homeschoolingContent), UI components (Button, Card, Badge, Tabs)
// - Interactivity: Tab switching, scroll animations, Framer Motion 'm' component animations
// - TODO: Migrate homeschoolingContent to CMS system for proper content management

// CMS DATA SOURCE: Using structured content for Homeschooling page
const homeschoolingContent = {
  hero: {
    title: "Homeschooling Support",
    subtitle: "Complete educational solutions for home learning",
    description: "Comprehensive homeschooling programmes designed to provide expert educational support for families choosing to educate at home.",
    backgroundImage: "/images/hero/homeschooling-hero.jpg"
  },
  benefits: [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Comfortable Learning Environment",
      description: "Learn in the safety and comfort of your own home with personalised attention"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Scheduling",
      description: "Adapt learning schedules to fit your family's lifestyle and individual needs"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalised Curriculum",
      description: "Tailored educational programmes that match your child's learning style and pace"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Family-Centred Approach",
      description: "Strengthen family bonds whilst providing world-class educational experiences"
    }
  ],
  programmes: {
    primary: {
      title: "Primary Education (Ages 5-11)",
      description: "Foundation learning covering core subjects with creative and engaging approaches",
      subjects: [
        "English Language and Literature",
        "Mathematics",
        "Science (Biology, Chemistry, Physics basics)",
        "History and Geography",
        "Art and Creative Studies",
        "Physical Education",
        "Religious Studies (optional)",
        "Modern Foreign Languages"
      ],
      keyFeatures: [
        "Interactive learning materials",
        "Regular progress assessments",
        "Creative project work",
        "Parent guidance sessions"
      ]
    },
    secondary: {
      title: "Secondary Education (Ages 11-16)",
      description: "Comprehensive GCSE preparation and key stage 3 & 4 curriculum coverage",
      subjects: [
        "Core Mathematics",
        "English Language and Literature",
        "Sciences (separate or combined)",
        "History and Geography",
        "Modern Foreign Languages",
        "Computing and ICT",
        "Business Studies",
        "Art and Design Technology"
      ],
      keyFeatures: [
        "GCSE examination preparation",
        "Coursework support",
        "University guidance",
        "Career counselling"
      ]
    },
    advanced: {
      title: "Advanced Level (Ages 16-18)",
      description: "A-Level and International Baccalaureate support for university preparation",
      subjects: [
        "A-Level subject specialisation",
        "International Baccalaureate programme",
        "University application support",
        "Personal statement coaching",
        "Interview preparation",
        "Gap year planning"
      ],
      keyFeatures: [
        "University entrance support",
        "Oxbridge preparation",
        "International qualifications",
        "Career pathway guidance"
      ]
    }
  },
  support: {
    title: "Comprehensive Support System",
    description: "We provide extensive support for both students and parents throughout the homeschooling journey",
    features: [
      {
        title: "Parent Training Workshops",
        description: "Monthly workshops to help parents understand curriculum requirements and teaching methodologies",
        icon: "👩‍🏫"
      },
      {
        title: "Curriculum Planning",
        description: "Detailed curriculum plans aligned with national standards and university entrance requirements",
        icon: "📚"
      },
      {
        title: "Progress Monitoring",
        description: "Regular assessments and detailed progress reports to track educational development",
        icon: "📊"
      },
      {
        title: "Social Activities",
        description: "Organised social events and group activities to ensure healthy peer interaction",
        icon: "🤝"
      },
      {
        title: "Technology Support",
        description: "Technical assistance with online learning platforms and educational software",
        icon: "💻"
      },
      {
        title: "Examination Support",
        description: "Guidance through external examinations including GCSE, A-Level, and university entrance",
        icon: "🎯"
      }
    ]
  }
}

export default function HomeschoolingPage() {
  const [activeTab, setActiveTab] = useState('primary')

  // CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns for full-screen hero sections
  // HERO CONSISTENCY REASON: Official Next.js documentation recommends hero sections outside PageLayout for full-screen treatment
  return (
    <>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-screen hero section with gradient backgrounds */}
      {/* HERO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.1 recommends gradient treatments for premium branding */}
      <PageHero
        background="gradient"
        size="full"
        className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-accent-600 relative overflow-hidden"
      >
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Professional pattern overlay for homeschooling presentation */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <GradientOverlay direction="br" className="from-emerald-800/30 via-transparent to-transparent" />
        <div className="relative z-10 text-center space-y-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              {homeschoolingContent.hero.subtitle}
            </Badge>
          </m.div>
          
          <m.h1 
            className="text-4xl lg:text-6xl font-serif font-bold text-white drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {homeschoolingContent.hero.title}
          </m.h1>
          
          <m.p 
            className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {homeschoolingContent.hero.description}
          </m.p>
          
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm">
              Learn More
            </Button>
          </m.div>
        </div>
      </PageHero>
      
      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      <PageLayout background="white" showHeader={false} showFooter={true}>

        <WaveSeparator variant="light" className="text-white" />

      {/* Benefits Section */}
      <Section className="py-20 lg:py-28 bg-slate-50/80 relative">
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Professional pattern overlay for benefits presentation */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243L8.2 0H5.373zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM6.686 0L0.2 6.485 1.616 7.9l7.9-7.9H6.686zM22.343 0L31.657 9.314 30.243 10.728 18.515 0h3.828zM37.657 0L28.343 9.314l1.414 1.414L41.485 0h-3.828z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-primary-900 mb-6">
              Why Choose Homeschooling?
            </h2>
            <p className="text-lg lg:text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              Discover the advantages of home education with professional support and guidance from our expert tutors.
            </p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {homeschoolingContent.benefits.map((benefit, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white/90 backdrop-blur-sm group">
                  <CardContent className="p-8">
                    <div className="bg-emerald-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-200 transition-colors duration-300">
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Programmes Section */}
      <Section className="py-16 lg:py-24" background="grey">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
              Homeschooling Programmes
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Comprehensive educational programmes designed for every stage of your child&apos;s learning journey.
            </p>
          </m.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="primary" className="text-sm font-medium">Primary (5-11)</TabsTrigger>
              <TabsTrigger value="secondary" className="text-sm font-medium">Secondary (11-16)</TabsTrigger>
              <TabsTrigger value="advanced" className="text-sm font-medium">Advanced (16-18)</TabsTrigger>
            </TabsList>

            <TabsContent value="primary">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif font-bold text-slate-900">
                      {homeschoolingContent.programmes.primary.title}
                    </CardTitle>
                    <p className="text-slate-600">
                      {homeschoolingContent.programmes.primary.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Core Subjects</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {homeschoolingContent.programmes.primary.subjects.map((subject, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span className="text-slate-700">{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {homeschoolingContent.programmes.primary.keyFeatures.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            </TabsContent>

            <TabsContent value="secondary">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif font-bold text-slate-900">
                      {homeschoolingContent.programmes.secondary.title}
                    </CardTitle>
                    <p className="text-slate-600">
                      {homeschoolingContent.programmes.secondary.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Core Subjects</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {homeschoolingContent.programmes.secondary.subjects.map((subject, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span className="text-slate-700">{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {homeschoolingContent.programmes.secondary.keyFeatures.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            </TabsContent>

            <TabsContent value="advanced">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif font-bold text-slate-900">
                      {homeschoolingContent.programmes.advanced.title}
                    </CardTitle>
                    <p className="text-slate-600">
                      {homeschoolingContent.programmes.advanced.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Programme Areas</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {homeschoolingContent.programmes.advanced.subjects.map((subject, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span className="text-slate-700">{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {homeschoolingContent.programmes.advanced.keyFeatures.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            </TabsContent>
          </Tabs>
        </div>
      </Section>

      {/* Support System Section */}
      <Section className="py-16 lg:py-24" background="white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
              {homeschoolingContent.support.title}
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              {homeschoolingContent.support.description}
            </p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeschoolingContent.support.features.map((feature, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-slate-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Statistics Section */}
      <Section className="py-16 lg:py-24" background="grey">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-amber-600 mb-2">98%</div>
              <div className="text-slate-700 font-medium">Parent Satisfaction</div>
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-slate-700 font-medium">Families Supported</div>
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-amber-600 mb-2">15+</div>
              <div className="text-slate-700 font-medium">Years Experience</div>
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-amber-600 mb-2">24/7</div>
              <div className="text-slate-700 font-medium">Support Available</div>
            </m.div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 lg:py-24" background="primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
              Start Your Homeschooling Journey Today
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Book a free consultation to discuss your homeschooling needs and discover how we can support your family&apos;s educational goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3"
              >
                Book Free Consultation
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3"
              >
                Download Information Pack
              </Button>
            </div>
          </m.div>
        </div>
      </Section>
      
      </PageLayout>
    </>
  )
}