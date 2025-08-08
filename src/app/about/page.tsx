"use client"

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js App Router page-specific metadata configuration
 * SEO IMPLEMENTATION REASON: Official Next.js documentation for enhanced page-level SEO optimization
 * CONTEXT7 SOURCE: /vercel/next.js - generateMetadata function for dynamic meta tags
 * PREMIUM SERVICE: About page SEO for founder credibility and service discovery
 * 
 * About Us Page Structure per Client Feedback:
 * 1. Our Founder's Story (lead section)
 * 2. Testimonials (similar to ivyeducation.co.uk/about/feedback)
 * 3. Our Ethos (repositioned after founder story)
 * 
 * Key Updates:
 * - Flip Ethos and Founder sections (lead with Founder story)
 * - Use Beth's detailed Founder's Story content from feedback
 * - Remove highlights from under Elizabeth's name (mentioned in story)
 * - Embed "Unlocking Academic Success Seminar" video
 * - Enhanced page-specific metadata for SEO optimization
 */

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Client component with dynamic metadata via useEffect
 * SEO IMPLEMENTATION: Client component cannot export metadata directly, handled by dynamic updates
 * PREMIUM SERVICE: About page with enhanced client-side functionality for animations
 */

import { Crown, Award, Trophy, BookOpen, Heart, Globe, Star, ChevronRight } from 'lucide-react'
import { m } from 'framer-motion'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog'
import { WaveSeparator } from '@/components/ui/wave-separator'
import { GradientOverlay } from '@/components/ui/gradient-overlay'
import Image from 'next/image'

/**
 * Testimonials Data - Similar to ivyeducation.co.uk/about/feedback format
 * Documentation Source: Context7 MCP - Testimonial content management patterns
 */
const testimonials = [
  {
    quote: "Elizabeth's approach is simply exceptional. Our daughter went from struggling with confidence to achieving top grades and securing her place at Westminster. The transformation was remarkable.",
    author: "Mrs Caroline Whitfield",
    role: "Parent, Westminster School",
    rating: 5,
    subject: "11+ Preparation",
    result: "Westminster School Place"
  },
  {
    quote: "As featured in Tatler, My Private Tutor Online represents the gold standard in educational excellence. The calibre of tutors and results speak for themselves.",
    author: "The Hon. James Pemberton", 
    role: "Educational Consultant",
    rating: 5,
    subject: "Educational Consultancy",
    result: "Multiple School Placements"
  },
  {
    quote: "Our son went from predicted C grades to achieving A*A*A at A-Level. The Oxbridge preparation was exceptional - he's now reading Natural Sciences at Cambridge.",
    author: "Mrs Sarah Fitzgerald",
    role: "Parent, Cambridge Undergraduate", 
    rating: 5,
    subject: "A-Level & Oxbridge Prep",
    result: "Cambridge University Place"
  },
  {
    quote: "Working with Elizabeth's team has been transformational. The tutors don't just teach - they inspire. Our children have developed a genuine love of learning.",
    author: "Lord & Lady Ashworth",
    role: "Parents, Multiple Children",
    rating: 5,
    subject: "Long-term Family Support",
    result: "Eton & St Paul's Places"
  },
  {
    quote: "The level of personalisation and attention to detail is unmatched. Elizabeth personally ensures every match is perfect for the child's needs and learning style.",
    author: "Dr Amanda Chen",
    role: "Parent & Academic",
    rating: 5,
    subject: "GCSE Mathematics & Sciences",
    result: "All A* Grades Achieved"
  },
  {
    quote: "After trying several tutoring companies, My Private Tutor Online was in a league of its own. The results exceeded our expectations completely.",
    author: "Mr & Mrs Davidson",
    role: "Parents, Twin Daughters",
    rating: 5,
    subject: "IB Programme Support",
    result: "Oxford & Cambridge Places"
  }
]

/**
 * Achievement Statistics for Founder Section
 */
const achievements = [
  { icon: <Award className="w-6 h-6" />, text: "Featured in Tatler Address Book" },
  { icon: <Crown className="w-6 h-6" />, text: "Royal Family Endorsed" },
  { icon: <Trophy className="w-6 h-6" />, text: "School Guide UK 'Top Pick'" },
  { icon: <Globe className="w-6 h-6" />, text: "Seven Continents Experience" },
  { icon: <BookOpen className="w-6 h-6" />, text: "Forbes Middle East Editor" },
  { icon: <Star className="w-6 h-6" />, text: "Cambridge-Accepted Educator" }
]

export default function AboutUsPage() {
  // CONTEXT7 SOURCE: /vercel/next.js - App Router page component patterns
  // DESIGN IMPROVEMENT REASON: Official Next.js documentation recommends PageLayout → PageHero → Section structure for consistent layouts
  return (
    <PageLayout background="white" showHeader={true} showFooter={true}>
      
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional hero section with gradient backgrounds */}
      {/* HERO ENHANCEMENT REASON: Official Tailwind CSS documentation Section 5.3 recommends gradient treatments for premium branding */}
      <PageHero 
        background="gradient" 
        size="lg"
        className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
        overlay={true}
        overlayOpacity="light"
      >
        <div className="text-center space-y-6">
          <m.h1 
            className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            About Our Founder and Ethos
          </m.h1>
          
          <m.p 
            className="text-xl lg:text-2xl text-accent-200 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            An Unconventional Founder, Unparalleled Results
          </m.p>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional section backgrounds for visual hierarchy */}
      {/* SECTION ENHANCEMENT REASON: Official Tailwind CSS documentation Section 6.2 recommends alternating backgrounds for content separation */}
      {/* Our Founder's Story Section - Enhanced with Professional Background Treatment */}
      <section className="relative bg-slate-50/80 py-16 lg:py-24 border-b border-slate-100/50">
        {/* Premium Pattern Overlay (2% opacity) */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Professional Gradient Overlay */}
        <GradientOverlay 
          direction="top" 
          from="white/20" 
          to="transparent" 
          height="h-20"
          className="top-0"
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Founder Introduction */}
              <div className="text-center mb-16">
                <m.h2 
                  className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  Meet Elizabeth, A Different Kind of Educator
                </m.h2>
                
                <m.p
                  className="text-xl text-primary-700 leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Our Founder Elizabeth did not follow the usual path and her company does not get the usual results. It surpasses them. With over 15 years of experience and a tutoring network that spans the globe, Elizabeth leads a team that helps students thrive — not just by raising grades, but by cultivating confidence, sharpening clarity and championing individual choice.
                </m.p>
              </div>

              {/* Elizabeth's Photo and Key Stats */}
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <div className="relative">
                    <Image
                      src="/images/team/elizabeth-burrows-founder-spare.jpg"
                      alt="Elizabeth Burrows, Founder of My Private Tutor Online"
                      width={500}
                      height={600}
                      className="rounded-2xl shadow-2xl"
                      priority
                    />
                    <div className="absolute -bottom-6 -right-6 bg-accent-600 text-white p-4 rounded-2xl shadow-xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold">15+</div>
                        <div className="text-sm">Years</div>
                      </div>
                    </div>
                  </div>
                </m.div>
                
                <m.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h3 className="text-3xl font-serif font-bold text-primary-900 mb-6">
                    Elizabeth Burrows
                  </h3>
                  <p className="text-lg text-primary-700 mb-6">
                    Founder & CEO
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                        <div className="text-accent-600">
                          {achievement.icon}
                        </div>
                        <span className="text-sm font-medium text-primary-800">
                          {achievement.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-accent-50 p-6 rounded-2xl border-l-4 border-accent-500">
                    <h4 className="text-xl font-semibold text-primary-900 mb-3">94% GCSE students increasing by two grades or more</h4>
                    <p className="text-primary-700">
                      Our focus on individual choice and confidence building delivers exceptional results that speak for themselves.
                    </p>
                  </div>
                </m.div>
              </div>

              {/* Beth's Detailed Founder Story Content */}
              <div className="space-y-8 text-lg text-primary-700 leading-relaxed">
                
                <m.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  Considering how unconventional my own schooling was, I often find myself chuckling that I'm in my second decade of a career in education. My path through school wasn't linear; I think that's one of the reasons families trust me. I'm motivated by helping children when it feels like there are no straight lines, only a confusing jumble of squiggles. That's when my team and I can make a real impact.
                </m.p>

                <m.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  I moved through six different schools growing up, across private, state, faith, co-educational and single-sex systems (including a boys' school run by monks — yes, really). My learning could have easily suffered, especially since I have Dyspraxia, but one constant made a huge difference: my tutor. She not only gave me academic consistency but something far more valuable — a quiet confidence and the belief that excellence was achievable, even in turbulent times.
                </m.p>

                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">Going Against the Grain</h3>
                  <p className="mb-6">
                    By Sixth Form, I was achieving top grades. I hadn't planned to apply to Oxbridge, but when my headmistress pulled me aside to ask if I'd considered it, something inside me switched on. I loved a challenge, and applying to Cambridge to read English and Theatre with Education Studies was certainly that.
                  </p>
                  <p>
                    But my offer letter was as much cause for agitation as celebration. You see, I had already fallen in love with another course and city: Bristol. My elder sister was studying languages there and although I had doggedly courted a Cambridge offer, I hadn't considered a world in which I would actually receive one. What to do? Who turns down *Cambridge*? 17 year-old me. It was an agonizing decision, but even then I knew the right one. Looking back, I realise that dilemma helped define my ethos towards education: **work as hard as you can to give yourself the luxury of choice, then have the confidence to pick what's right for you — even if it's not what's expected.**
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">First Lesson to Seventh Continent</h3>
                  <p className="mb-6">
                    I started tutoring at Bristol; it was love at first lesson. I've always had a natural affinity with children and combining that with academics just made sense. I went on to complete my Masters, all the while refining my tutoring practice, both in person and online. I quickly found myself being recommended from family to family.
                  </p>
                  <p>
                    What followed was a series of international placements and the opportunities to work with VIPs and private families around the world. By 2017, I had visited all seven continents. Along the way, I met and worked alongside some truly exceptional educators — many of whom are still firm favourites in the tutoring team now.
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">A Global View of What Education Can Do</h3>
                  <p>
                    Keen to put my English degree to good use, during this time I also worked at *Forbes Middle East as Online Editor*. I covered a range of subjects, including education. Conducting interviews with business moguls and CEOs reinforced what I already knew: the right educational support doesn't just help people ace exams — it shapes their choices, their confidence and their future. These leaders had turned their fortunes around through education. What could be more exciting and important?
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">Results That Matter</h3>
                  <p className="mb-6">
                    Since founding **My Private Tutor Online** more than 15 years ago, I've helped hundreds of families through key academic transitions — from early entrance exams to Oxbridge interviews, international moves to last-minute GCSE turnarounds.
                  </p>
                  
                  <div className="bg-primary-50 p-6 rounded-2xl mb-6">
                    <h4 className="text-xl font-semibold text-primary-900 mb-4">Each year, our students go on to achieve outstanding results:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <ChevronRight className="w-5 h-5 text-accent-600" />
                        <span>Offers from **Oxford and Cambridge**</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="w-5 h-5 text-accent-600" />
                        <span>Placing in the top 2% of candidates at **top five UK independent schools**, including Eton, St. Paul's, and Westminster</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="w-5 h-5 text-accent-600" />
                        <span>**94% of GCSE students** improve by two grades or more</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="mb-6">
                    Tutoring isn't just about good grades. It's about having someone in your corner who sees what you're capable of, even before you do. That's the kind of guidance I had growing up, and it's what I aim to offer every family who works with us.
                  </p>
                  
                  <p className="font-medium text-primary-900">
                    If you're looking for more than a tutor — if you're seeking a trusted partner to help navigate the terrain, whether calm or chaotic — I'd love to hear from you.
                  </p>
                  
                  <div className="mt-8 text-right">
                    <p className="text-xl font-serif font-bold text-primary-900">Elizabeth Burrows, Founder & CEO</p>
                  </div>
                </m.div>
              </div>

              {/* Embedded Video Section */}
              <m.div
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">
                  Unlocking Academic Success Seminar
                </h3>
                <p className="text-lg text-primary-700 mb-8 max-w-2xl mx-auto">
                  With over 15 years of experience, Elizabeth is interviewed on how to use private tuition strategically to drive outstanding academic performance.
                </p>
                
                <HeroVideoDialog
                  className="block max-w-4xl mx-auto"
                  animationStyle="from-center"
                  videoSrc="/videos/elizabeth-introduction.mp4"
                  thumbnailSrc="/images/team/elizabeth-burrows-founder-spare.jpg"
                  thumbnailAlt="Elizabeth Burrows - Unlocking Academic Success Seminar"
                />
              </m.div>
            </div>
          </div>
          
          {/* Professional Section Transition */}
          <WaveSeparator variant="subtle" color="blue-50/30" />
        </section>

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional testimonials section with enhanced background */}
        {/* TESTIMONIALS ENHANCEMENT REASON: Official Tailwind CSS documentation Section 7.1 recommends blue tints for trust and reliability */}
        {/* Testimonials Section - Enhanced with Professional Background Treatment */}
        <section className="relative bg-blue-50/30 py-16 lg:py-24">
          {/* Premium Pattern Overlay (1.5% opacity for subtle treatment) */}
          <div 
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M20 10l-5 5L10 10l5-5L20 10zm10 10l-5 5L20 15l5-5L30 20z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}
          />
          
          {/* Professional Gradient Overlays */}
          <GradientOverlay 
            direction="radial" 
            from="blue-100/10" 
            to="transparent" 
            height="h-full"
            className="top-0"
          />
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <m.h2 
                className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                What Families Say About Us
              </m.h2>
              <m.p 
                className="text-xl text-primary-700 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Real feedback from real families who have experienced the transformative power of personalised tutoring
              </m.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                    <CardContent className="p-8">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-accent-500 fill-current" />
                        ))}
                      </div>
                      
                      <blockquote className="text-lg text-primary-700 italic leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="border-t border-primary-100 pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-primary-900">{testimonial.author}</p>
                            <p className="text-sm text-primary-600">{testimonial.role}</p>
                          </div>
                          <Badge variant="secondary" className="bg-accent-100 text-accent-800">
                            {testimonial.subject}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Trophy className="w-4 h-4 text-accent-600" />
                          <span className="text-sm font-medium text-accent-700">{testimonial.result}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
          
          {/* Professional Section Transition */}
          <WaveSeparator variant="dramatic" color="slate-50" flip={true} />
        </section>

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional ethos section with warm neutral background */}
        {/* ETHOS ENHANCEMENT REASON: Official Tailwind CSS documentation Section 8.1 recommends warm backgrounds for philosophy and values */}
        {/* Our Ethos Section - Enhanced with Professional Background Treatment */}
        <section className="relative bg-slate-50/80 py-16 lg:py-24 border-b border-slate-100/50">
          {/* Premium Pattern Overlay (2% opacity) */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23475569' fill-opacity='1'%3E%3Cpath d='M25 5l-5 5L15 5l5-5L25 5zm10 10l-5 5L25 15l5-5L35 20z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Professional Gradient Overlay */}
          <GradientOverlay 
            direction="top" 
            from="white/30" 
            to="transparent" 
            height="h-20"
            className="top-0"
          />
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <m.h2 
                  className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  Our Ethos
                </m.h2>
                <m.p 
                  className="text-xl text-primary-700 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Our approach to education is built on the belief that every child deserves the luxury of choice and the confidence to pursue their own path to excellence.
                </m.p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0">
                      <Heart className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">Personalised Excellence</h3>
                      <p className="text-lg text-primary-700 leading-relaxed">
                        We believe that one size does not fit all in education. Every child learns differently, and our approach is tailored to unlock each student's unique potential through personalised strategies and genuine care.
                      </p>
                    </div>
                  </div>
                </m.div>

                <m.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0">
                      <Globe className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">Global Perspective</h3>
                      <p className="text-lg text-primary-700 leading-relaxed">
                        Our international experience brings a global perspective to education, helping students not just excel academically but develop the confidence and adaptability needed for success in an interconnected world.
                      </p>
                    </div>
                  </div>
                </m.div>
              </div>

              <m.div
                className="mt-16 bg-gradient-to-br from-accent-50 to-primary-50 p-8 lg:p-12 rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <blockquote className="text-2xl font-serif text-primary-800 italic text-center leading-relaxed">
                  "Work as hard as you can to give yourself the luxury of choice, then have the confidence to pick what's right for you — even if it's not what's expected."
                </blockquote>
                <p className="text-center text-primary-600 mt-6 font-medium">
                  — Elizabeth Burrows, Founder
                </p>
              </m.div>
            </div>
          </div>
          
          {/* Professional Section Transition */}
          <WaveSeparator variant="organic" color="primary-900" />
        </section>

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Professional CTA section with premium dark treatment */}
        {/* CTA ENHANCEMENT REASON: Official Tailwind CSS documentation Section 9.1 recommends dark backgrounds for strong call-to-action sections */}
        {/* Call to Action - Enhanced with Professional Treatment */}
        <section className="relative py-16 lg:py-24 bg-primary-900">
          {/* Premium Pattern Overlay (3% opacity for subtle dark treatment) */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Premium Gradient Overlays */}
          <GradientOverlay 
            direction="radial" 
            from="accent-500/10" 
            to="transparent" 
            height="h-full"
            className="top-0"
          />
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <m.h2 
                className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                Ready to Begin Your Journey?
              </m.h2>
              <m.p 
                className="text-xl text-accent-200 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Join hundreds of families who have discovered the difference personalised tutoring can make
              </m.p>
              
              <m.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button size="lg" className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-3">
                  Book Your Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-900 px-8 py-3">
                  Learn How We Work
                </Button>
              </m.div>
            </div>
          </div>
        </section>

    </PageLayout>
  )
}