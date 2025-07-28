"use client"

import { useState } from 'react'
import { m } from 'framer-motion'
import { Award, Users, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// CMS DATA SOURCE: Using structured content for Expert Educators page
const expertEducatorsContent = {
  hero: {
    title: "Expert Educators",
    subtitle: "Less than 10% accepted",
    description: "Meet our exceptional team of Oxford and Cambridge graduate tutors, handpicked for their academic excellence and teaching expertise.",
    backgroundImage: "/images/hero/expert-educators-hero.jpg"
  },
  founderStory: {
    title: "Founder Story",
    content: "Founded by Elizabeth Burrows, a Cambridge graduate with 15 years of educational excellence, My Private Tutor Online was born from a passion to make premium tutoring accessible worldwide.",
    image: "/images/team/elizabeth-burrows.jpg",
    achievements: [
      "Cambridge University Graduate",
      "15+ Years Teaching Experience",
      "Featured in Tatler Address Book 2025",
      "Trusted by Royal Families"
    ]
  },
  tutorCredentials: {
    title: "Tutor Credentials",
    subtitle: "Less than 10% of applicants are accepted",
    description: "Our rigorous selection process ensures only the most qualified educators join our team.",
    requirements: [
      "Oxford or Cambridge University graduate",
      "First-class honours degree minimum",
      "Official exam board examiner experience",
      "Proven track record of student success",
      "Enhanced DBS clearance",
      "Teaching qualification preferred"
    ]
  },
  supportSystem: {
    title: "Feedback & Support System",
    subtitle: "Platform & Progress Reports",
    description: "Comprehensive tracking and reporting system to monitor student progress and maintain excellence.",
    features: [
      {
        title: "Real-time Progress Tracking",
        description: "Monitor student advancement with detailed analytics",
        icon: "📊"
      },
      {
        title: "Weekly Progress Reports",
        description: "Comprehensive reports delivered to parents",
        icon: "📈"
      },
      {
        title: "Interactive Learning Platform",
        description: "State-of-the-art online learning environment",
        icon: "💻"
      },
      {
        title: "24/7 Support Available",
        description: "Round-the-clock assistance for students and parents",
        icon: "🔄"
      }
    ]
  }
}

export default function ExpertEducatorsPage() {
  // const [selectedTier, setSelectedTier] = useState('premium') // TODO: Implement tier selection functionality

  return (
    <PageLayout
      title="Expert Educators - My Private Tutor Online"
      description="Meet our exceptional team of Oxford and Cambridge graduate tutors. Less than 10% acceptance rate ensures educational excellence."
      keywords="expert tutors, Oxford Cambridge graduates, premium tutoring, educational excellence"
      background="white"
    >
      <PageHero
        title={expertEducatorsContent.hero.title}
        subtitle={expertEducatorsContent.hero.subtitle}
        description={expertEducatorsContent.hero.description}
        backgroundImage={expertEducatorsContent.hero.backgroundImage}
        height="large"
        overlay="medium"
      />

      {/* Founder Story Section */}
      <Section className="py-16 lg:py-24" background="slate-50">
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
                {expertEducatorsContent.founderStory.title}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {expertEducatorsContent.founderStory.content}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertEducatorsContent.founderStory.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700 font-medium">{achievement}</span>
                  </div>
                ))}
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
                  {/* Placeholder for founder image */}
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <Users className="w-24 h-24" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-slate-900">Elizabeth Burrows</h3>
                  <p className="text-slate-600">Founder & Lead Educational Consultant</p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </Section>

      {/* Tutor Credentials Section */}
      <Section className="py-16 lg:py-24" background="white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-4">
              {expertEducatorsContent.tutorCredentials.title}
            </h2>
            <p className="text-xl text-amber-600 font-semibold mb-6">
              {expertEducatorsContent.tutorCredentials.subtitle}
            </p>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              {expertEducatorsContent.tutorCredentials.description}
            </p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertEducatorsContent.tutorCredentials.requirements.map((requirement, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-slate-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 rounded-full p-2 mt-1">
                        <Award className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 mb-2">{requirement}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Comprehensive Tier Comparison Table */}
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
              Tutor Tier Comparison
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Choose the perfect tutoring tier for your educational needs. All tiers include our signature quality guarantee.
            </p>
          </m.div>

          {/* Mobile-First Responsive Table */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="hidden lg:grid lg:grid-cols-4 gap-4 mb-6">
                <div></div>
                <div className="text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-amber-300">
                    <Badge className="bg-amber-500 text-white mb-3">Most Popular</Badge>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Premium</h3>
                    <div className="text-4xl font-bold text-amber-600 mb-2">£75</div>
                    <div className="text-slate-600">per hour</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <div className="h-8 mb-3"></div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Elite</h3>
                    <div className="text-4xl font-bold text-slate-700 mb-2">£95</div>
                    <div className="text-slate-600">per hour</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <div className="h-8 mb-3"></div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Platinum</h3>
                    <div className="text-4xl font-bold text-slate-700 mb-2">£120</div>
                    <div className="text-slate-600">per hour</div>
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Tutor Qualifications */}
                <div className="border-b border-slate-200">
                  <div className="bg-slate-50 px-6 py-4">
                    <h4 className="font-semibold text-slate-900">Tutor Qualifications</h4>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                    <div className="px-6 py-4 font-medium text-slate-700 bg-slate-25">University Background</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">Oxford/Cambridge Graduate</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">Senior Oxbridge Graduate</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">PhD/Master&apos;s Degree</div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-slate-100">
                    <div className="px-6 py-4 font-medium text-slate-700 bg-slate-25">Teaching Experience</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">5+ years</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">10+ years</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">15+ years</div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-slate-100">
                    <div className="px-6 py-4 font-medium text-slate-700 bg-slate-25">Professional Status</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                    </div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">
                      <span className="text-sm font-medium">Official Exam Board Examiner</span>
                    </div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">
                      <span className="text-sm font-medium">Head of Department Level</span>
                    </div>
                  </div>
                </div>

                {/* Learning Support */}
                <div className="border-b border-slate-200">
                  <div className="bg-slate-50 px-6 py-4">
                    <h4 className="font-semibold text-slate-900">Learning Support</h4>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                    <div className="px-6 py-4 font-medium text-slate-700 bg-slate-25">Personalised Learning Plan</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                    </div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                    </div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-slate-100">
                    <div className="px-6 py-4 font-medium text-slate-700 bg-slate-25">Progress Reports</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">Weekly</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">Bi-weekly + Goals Review</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">Weekly + Strategic Planning</div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-slate-100">
                    <div className="px-6 py-4 font-medium text-slate-700 bg-slate-25">Resource Library Access</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                    </div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                    </div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Premium Features */}
                <div className="border-b border-slate-200">
                  <div className="bg-slate-50 px-6 py-4">
                    <h4 className="font-semibold text-slate-900">Premium Features</h4>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                    <div className="px-6 py-4 font-medium text-slate-700 bg-slate-25">Priority Scheduling</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">Standard</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                    </div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-slate-100">
                    <div className="px-6 py-4 font-medium text-slate-700 bg-slate-25">University Application Support</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">Basic Guidance</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">UCAS Support</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">Full Oxbridge Prep</div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-t border-slate-100">
                    <div className="px-6 py-4 font-medium text-slate-700 bg-slate-25">Family Consultation</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">Monthly</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">Bi-weekly</div>
                    <div className="px-6 py-4 text-center border-l border-slate-200">On-demand + Strategy Sessions</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                  <div className="px-6 py-6 bg-slate-25"></div>
                  <div className="px-6 py-6 text-center border-l border-slate-200">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      Choose Premium
                    </Button>
                  </div>
                  <div className="px-6 py-6 text-center border-l border-slate-200">
                    <Button variant="outline" className="w-full border-slate-300 hover:bg-slate-50">
                      Choose Elite
                    </Button>
                  </div>
                  <div className="px-6 py-6 text-center border-l border-slate-200">
                    <Button variant="outline" className="w-full border-slate-300 hover:bg-slate-50">
                      Choose Platinum
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">All Tiers Include</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-slate-700">Enhanced DBS clearance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-slate-700">24/7 technical support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-slate-700">Money-back guarantee</span>
                </div>
              </div>
            </div>
          </m.div>
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
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-4">
              {expertEducatorsContent.supportSystem.title}
            </h2>
            <p className="text-xl text-slate-600 font-semibold mb-6">
              {expertEducatorsContent.supportSystem.subtitle}
            </p>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              {expertEducatorsContent.supportSystem.description}
            </p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertEducatorsContent.supportSystem.features.map((feature, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full border-slate-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
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
              Ready to Meet Your Expert Educator?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Book a free consultation to discuss your educational goals and be matched with the perfect tutor.
            </p>
            <Button 
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3"
            >
              Book Free Consultation
            </Button>
          </m.div>
        </div>
      </Section>
    </PageLayout>
  )
}