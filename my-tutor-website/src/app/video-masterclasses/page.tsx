"use client"

import { useState } from 'react'
import { m } from 'framer-motion'
import { Play, Clock, Users, Star, Calendar, Download, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// CMS DATA SOURCE: Elizabeth's Video Masterclasses content from client brief
const videoMasterclassesContent = {
  hero: {
    title: "Exclusive Video Masterclasses with Elizabeth Burrows",
    subtitle: "A trusted guide to British education, culture, and university preparation",
    description: "Join Elizabeth Burrows, founder of My Private Tutor Online, as she shares her expert insight from over 15 years of international education experience. These masterclasses offer rare access to the knowledge and strategies typically reserved for her private clients.",
    backgroundImage: "/images/hero/masterclasses-hero.jpg"
  },
  instructor: {
    name: "Elizabeth Burrows",
    title: "Founder & Lead Educational Consultant",
    credentials: [
      "Cambridge University Graduate",
      "15+ Years Educational Experience",
      "Featured in Tatler Address Book 2025",
      "Trusted by Royal Families"
    ],
    bio: "Elizabeth brings unparalleled expertise in British education, having guided hundreds of students to success in top universities and prestigious institutions."
  },
  masterclasses: [
    {
      id: "british-culture-unlocked",
      title: "British Culture Unlocked",
      subtitle: "Essential insights for international families",
      duration: "90 minutes",
      students: "250+ enrolled",
      rating: 4.9,
      price: "£49",
      originalPrice: "£79",
      description: "Comprehensive guide to British educational culture, etiquette, and social expectations for international families navigating the UK education system.",
      whatYoullLearn: [
        "Understanding British educational hierarchy and terminology",
        "School culture and unwritten rules",
        "Parent-teacher communication protocols",
        "British social etiquette in educational settings",
        "Integration strategies for international families",
        "Navigating school events and parent communities"
      ],
      includes: [
        "90-minute masterclass video",
        "Downloadable cultural guide (PDF)",
        "Checklist for school integration",
        "Email templates for school communication",
        "Lifetime access to updates"
      ],
      preview: "/videos/british-culture-preview.mp4",
      testimonials: [
        {
          name: "Sarah Chen",
          role: "Parent from Singapore",
          quote: "This masterclass was invaluable for our family's move to London. Elizabeth's insights helped us integrate seamlessly into our children's school community.",
          rating: 5
        }
      ]
    },
    {
      id: "ucas-masterclass",
      title: "UCAS Masterclass",
      subtitle: "Complete university application guide",
      duration: "120 minutes", 
      students: "180+ enrolled",
      rating: 4.8,
      price: "£89",
      originalPrice: "£129",
      description: "Step-by-step guide through the entire UCAS application process, including personal statements, university selection, and interview preparation.",
      whatYoullLearn: [
        "UCAS timeline and key deadlines",
        "University selection strategies",
        "Writing compelling personal statements",
        "Understanding UCAS points and requirements",
        "Interview preparation techniques",
        "Student finance and funding options"
      ],
      includes: [
        "120-minute comprehensive masterclass",
        "Personal statement template and examples",
        "University comparison worksheet",
        "Interview preparation guide",
        "UCAS timeline planner",
        "One-to-one follow-up session (30 minutes)"
      ],
      preview: "/videos/ucas-masterclass-preview.mp4",
      testimonials: [
        {
          name: "James Morrison",
          role: "A-Level Student",
          quote: "Elizabeth's UCAS masterclass gave me the confidence and knowledge to secure offers from all five universities I applied to, including Oxford.",
          rating: 5
        }
      ]
    }
  ],
  benefits: [
    {
      icon: <Play className="w-6 h-6" />,
      title: "Expert-Led Content",
      description: "Learn directly from Elizabeth's 15+ years of educational expertise"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Self-Paced Learning",
      description: "Study at your own pace with lifetime access to all materials"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Downloadable Resources",
      description: "Comprehensive guides, templates, and checklists included"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Access",
      description: "Connect with other families and students in our exclusive community"
    }
  ]
}

interface MasterclassCardProps {
  masterclass: typeof videoMasterclassesContent.masterclasses[0]
}

function MasterclassCard({ masterclass }: MasterclassCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="border-slate-200 overflow-hidden rounded-none">
      <div 
        className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 relative cursor-pointer group"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-amber-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-8 h-8 text-white fill-current" />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <Badge className="bg-amber-100 text-amber-800">{masterclass.duration}</Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-slate-700">
            Preview Available
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(masterclass.rating) ? 'text-amber-400 fill-current' : 'text-slate-300'}`} 
                />
              ))}
              <span className="text-sm text-slate-600 ml-2">({masterclass.rating})</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">{masterclass.price}</div>
            <div className="text-sm text-slate-500 line-through">{masterclass.originalPrice}</div>
          </div>
        </div>
        
        <CardTitle className="text-2xl font-serif font-bold text-slate-900 mb-2">
          {masterclass.title}
        </CardTitle>
        <p className="text-amber-600 font-medium mb-4 text-lg">{masterclass.subtitle}</p>
        <p className="text-slate-600 text-base leading-relaxed">{masterclass.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {masterclass.students}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {masterclass.duration}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-8 pb-8">
        <Button 
          className="w-full bg-amber-600 hover:bg-amber-700 text-white mb-6 py-3 text-base"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'View Details & Enroll'}
        </Button>
        
        {showDetails && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-200 pt-4 space-y-6"
          >
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">What You'll Learn</h4>
              <ul className="space-y-2">
                {masterclass.whatYoullLearn.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Includes</h4>
              <ul className="space-y-2">
                {masterclass.includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Student Testimonial</h4>
              <blockquote className="text-slate-700 text-sm italic mb-2">
                "{masterclass.testimonials[0].quote}"
              </blockquote>
              <cite className="text-slate-600 text-sm not-italic">
                — {masterclass.testimonials[0].name}, {masterclass.testimonials[0].role}
              </cite>
            </div>
            
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Enroll Now - {masterclass.price}
            </Button>
          </m.div>
        )}
      </CardContent>
    </Card>
  )
}

export default function VideoMasterclassesPage() {
  return (
    <PageLayout
      title="Video Masterclasses with Elizabeth - My Private Tutor Online"
      description="Expert video masterclasses covering British culture and UCAS applications. Learn from Elizabeth Burrows, Cambridge graduate with 15+ years experience."
      keywords="video masterclasses, British culture, UCAS guide, university applications, educational consultant"
      background="white"
    >
      <PageHero
        title={videoMasterclassesContent.hero.title}
        subtitle={videoMasterclassesContent.hero.subtitle}
        description={videoMasterclassesContent.hero.description}
        backgroundImage={videoMasterclassesContent.hero.backgroundImage}
        height="large"
        overlay="medium"
      />

      {/* Instructor Section */}
      <Section className="py-16 lg:py-24" background="white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900">
                Meet Your Instructor
              </h2>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                  {videoMasterclassesContent.instructor.name}
                </h3>
                <p className="text-amber-600 font-medium mb-4">
                  {videoMasterclassesContent.instructor.title}
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  {videoMasterclassesContent.instructor.bio}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {videoMasterclassesContent.instructor.credentials.map((credential, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-slate-700 font-medium">{credential}</span>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>
            
            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-[4/5] bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <Users className="w-24 h-24" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-slate-900">Elizabeth Burrows</h3>
                  <p className="text-slate-600">Cambridge Graduate & Education Expert</p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
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
              Why Choose Our Masterclasses?
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Gain exclusive insights and practical knowledge from an industry expert with proven results.
            </p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {videoMasterclassesContent.benefits.map((benefit, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full border-slate-200 hover:shadow-lg transition-shadow duration-300 rounded-none">
                  <CardContent className="p-8">
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

      {/* Masterclasses Section */}
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
              Available Masterclasses
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Choose from our expertly crafted masterclasses designed to give you the knowledge and confidence to succeed.
            </p>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {videoMasterclassesContent.masterclasses.map((masterclass, index) => (
              <m.div
                key={masterclass.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <MasterclassCard masterclass={masterclass} />
              </m.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Bundle Offer Section */}
      <Section className="py-16 lg:py-24" background="amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
              Complete Masterclass Bundle
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              Get both masterclasses at a special discounted rate and save over £70 on individual purchases.
            </p>
            
            <div className="bg-white shadow-lg p-12 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                    British Culture Unlocked + UCAS Masterclass
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Complete educational guidance from cultural integration to university applications
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Both complete masterclasses (210 minutes total)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      All downloadable resources and templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      30-minute one-to-one consultation with Elizabeth
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Lifetime access to all materials and updates
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-500 line-through mb-1">Individual Price: £208</div>
                  <div className="text-4xl font-bold text-amber-600 mb-2">£129</div>
                  <div className="text-emerald-600 font-medium mb-4">Save £79</div>
                  <Button 
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                  >
                    Get Bundle Now
                  </Button>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-slate-600">
              30-day money-back guarantee • Instant access after purchase
            </p>
          </m.div>
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
              Ready to Unlock Your Educational Success?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of families who have transformed their educational journey with Elizabeth's expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3"
              >
                Browse Masterclasses
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3"
              >
                Book Free Consultation
              </Button>
            </div>
          </m.div>
        </div>
      </Section>
    </PageLayout>
  )
}