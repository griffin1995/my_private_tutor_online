'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Crown, Star, BookOpen, GraduationCap, Users, Trophy, CheckCircle, Phone, Mail } from 'lucide-react'

import { RoyalTrustIndicators } from '@/components/marketing/royal-trust-indicators'
import { ServiceCard } from '@/components/marketing/service-card'
import { ConsultationBookingForm } from '@/components/forms/consultation-booking-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { brandConfig } from '@/config/brand'
import businessContent from '@/content/business-content.json'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function PremiumTutoringPage() {
  const [showBookingForm, setShowBookingForm] = useState(false)
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const testimonialsRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true })
  const servicesInView = useInView(servicesRef, { once: true })
  const testimonialsInView = useInView(testimonialsRef, { once: true })

  const services = businessContent.website.services.categories

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(245,158,11,0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(245,158,11,0.2) 0%, transparent 50%)`
          }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              {/* Trust Indicators Banner */}
              <div className="mb-8">
                <RoyalTrustIndicators 
                  variant="vertical" 
                  showDescription={false}
                  className="text-white [&_h3]:text-white [&_p]:text-gray-300"
                />
              </div>

              <h1 className="text-4xl lg:text-6xl font-light mb-6 leading-tight">
                <span className="font-light">Premium</span>{' '}
                <span className="text-accent-400 font-medium">Academic</span>{' '}
                <span className="font-light">Tutoring</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                {businessContent.website.hero.subheading}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  onClick={() => setShowBookingForm(true)}
                  className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 text-lg"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Book Confidential Consultation
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-accent-400 text-accent-400 hover:bg-accent-400 hover:text-primary-900 px-8 py-4 text-lg"
                >
                  <Trophy className="h-5 w-5 mr-2" />
                  View Success Stories
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">15+</div>
                  <div className="text-gray-300">Years Established</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">100%</div>
                  <div className="text-gray-300">Oxbridge Graduates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">95%+</div>
                  <div className="text-gray-300">Success Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero/child_book_and_laptop.avif"
                  alt="Premium tutoring session"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
              </div>
              
              {/* Floating Royal Endorsement Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-2xl max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <Crown className="h-6 w-6 text-accent-500" />
                  <Badge variant="gold" className="text-xs">Royal Family Endorsed</Badge>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  "Exceptional tutoring that helped achieve Cambridge acceptance. 
                  Highly professional service."
                </p>
                <div className="text-xs text-gray-500 mt-2 font-medium">— Royal Family Member</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-primary-900 mb-4">
              {businessContent.website.services.heading}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {businessContent.website.services.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  subjects={service.subjects}
                  levels={service.levels}
                  keyFeatures={service.keyFeatures}
                  image={service.image}
                  onLearnMore={() => {}}
                  onBookConsultation={() => setShowBookingForm(true)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-primary-900 mb-4">
              {businessContent.website.testimonials.heading}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {businessContent.website.testimonials.featured.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={testimonialsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      {testimonial.verified && (
                        <>
                          <Crown className="h-5 w-5 text-accent-500" />
                          <Badge variant="gold" className="text-xs">Verified Client</Badge>
                        </>
                      )}
                    </div>
                    
                    <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-primary-900">{testimonial.attribution}</div>
                        <div className="text-sm text-gray-500">{testimonial.location}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs">
                          {testimonial.achievement}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-light text-white mb-6">
              Begin Your Child's Academic Excellence Journey
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join the families who trust us with their children's academic future. 
              Confidential consultations available.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg"
                onClick={() => setShowBookingForm(true)}
                className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 text-lg"
              >
                <Crown className="h-5 w-5 mr-2" />
                Book Confidential Consultation
              </Button>
              
              <div className="flex items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">Call: +44 (0) 20 7XXX XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">hello@myprivatetutoronline.com</span>
                </div>
              </div>
            </div>

            <RoyalTrustIndicators 
              variant="horizontal"
              showDescription={false}
              className="text-white [&_h3]:text-white [&_p]:text-gray-300"
            />
          </div>
        </div>
      </section>

      {/* Consultation Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="max-h-[90vh] overflow-y-auto">
            <ConsultationBookingForm />
            <div className="text-center mt-4">
              <Button 
                variant="outline"
                onClick={() => setShowBookingForm(false)}
                className="text-white border-white/20 hover:bg-white/10"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}