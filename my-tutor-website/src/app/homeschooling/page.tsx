"use client"

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

  return (
    <PageLayout
      title="Homeschooling Support - My Private Tutor Online"
      description="Comprehensive homeschooling programmes with expert tutors. Complete curriculum coverage, flexible scheduling, and parent support for successful home education."
      keywords="homeschooling, home education, curriculum support, flexible learning, family education"
      background="white"
    >
      <PageHero
        title={homeschoolingContent.hero.title}
        subtitle={homeschoolingContent.hero.subtitle}
        description={homeschoolingContent.hero.description}
        backgroundImage={homeschoolingContent.hero.backgroundImage}
        height="large"
        overlay="medium"
      />

      {/* Benefits Section */}
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
              Why Choose Homeschooling?
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Discover the advantages of home education with professional support and guidance from our expert tutors.
            </p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeschoolingContent.benefits.map((benefit, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full border-slate-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="bg-amber-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center text-amber-600">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Programmes Section */}
      <Section className="py-16 lg:py-24" background="slate-50">
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
      <Section className="py-16 lg:py-24" background="slate-50">
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
      <Section className="py-16 lg:py-24" background="slate-900">
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
  )
}