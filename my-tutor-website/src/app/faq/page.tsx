"use client"

import { useState } from 'react'
import { m } from 'framer-motion'
import { ChevronDown, ChevronRight, Search, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { Card, CardContent } from '@/components/ui/card'

// CMS DATA SOURCE: Using structured content for FAQ page
const faqContent = {
  hero: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions",
    description: "Get instant answers to the most common questions about our tutoring services, pricing, and educational approach.",
    backgroundImage: "/images/hero/faq-hero.jpg"
  },
  categories: [
    {
      id: "general",
      title: "General Questions",
      icon: <HelpCircle className="w-5 h-5" />,
      questions: [
        {
          question: "What makes My Private Tutor Online different from other tutoring services?",
          answer: "We exclusively employ Oxford and Cambridge graduate tutors with proven track records. Our rigorous selection process ensures only the top 10% of applicants join our team. Additionally, we're trusted by royal families and featured in Tatler Address Book 2025, demonstrating our commitment to excellence."
        },
        {
          question: "How do you match students with tutors?",
          answer: "Our matching process considers the student's academic level, learning style, personality, and specific goals. We review the student's current performance, target grades, and any particular challenges they face. Our educational consultants then carefully select the most suitable tutor from our elite team."
        },
        {
          question: "What age groups and educational levels do you support?",
          answer: "We support students from Key Stage 1 through to university level, including 11+ preparation, GCSE, A-Level, IB, and university entrance exams. We also provide specialist support for entrance exams like UKISET, LNAT, BMAT/UCAT, and international qualifications."
        },
        {
          question: "Do you offer both online and in-person tutoring?",
          answer: "Yes, we offer both online tutoring (our primary service) and in-person tutoring in London and surrounding areas. Our online platform provides an interactive learning experience with screen sharing, digital whiteboards, and resource sharing capabilities."
        }
      ]
    },
    {
      id: "pricing",
      title: "Pricing & Packages",
      icon: <MessageCircle className="w-5 h-5" />,
      questions: [
        {
          question: "What are your tutoring rates?",
          answer: "We offer three tiers: Premium (£75/hour) for experienced Oxbridge graduates, Elite (£95/hour) for senior tutors with 10+ years experience and exam board examiner status, and Platinum (£120/hour) for master tutors with PhDs and 15+ years experience offering bespoke consultancy."
        },
        {
          question: "Are there any setup fees or hidden costs?",
          answer: "No, we have no setup fees or hidden costs. You only pay for the tutoring hours you use. We believe in transparent pricing and will clearly outline all costs during your free consultation."
        },
        {
          question: "Do you offer package discounts for multiple sessions?",
          answer: "Yes, we offer discounted rates for students booking 10+ hours in advance. We also provide family discounts for multiple siblings and special rates for intensive holiday programmes. Contact us for personalised pricing based on your requirements."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit and debit cards, bank transfers, and PayPal. Payment is typically made in advance for booked sessions, though we can arrange alternative payment schedules for regular students."
        }
      ]
    },
    {
      id: "booking",
      title: "Booking & Scheduling",
      icon: <Phone className="w-5 h-5" />,
      questions: [
        {
          question: "How do I book my first session?",
          answer: "Start with our free 15-minute consultation where we'll discuss your needs and goals. Following this, we'll match you with the perfect tutor and schedule your first lesson. You can book online through our platform or speak directly with our educational consultants."
        },
        {
          question: "How flexible is the scheduling?",
          answer: "We offer flexible scheduling to accommodate busy family schedules. Sessions can be booked from 7am to 10pm, seven days a week. We understand the demands of modern life and work around school schedules, extracurricular activities, and family commitments."
        },
        {
          question: "What is your cancellation policy?",
          answer: "We require 24 hours' notice for cancellations to avoid charges. Emergency cancellations are handled on a case-by-case basis. We understand that unexpected situations arise and aim to be as flexible as possible whilst maintaining fair scheduling for all our tutors."
        },
        {
          question: "Can I change tutors if needed?",
          answer: "Absolutely. While we carefully match students with tutors, we understand that sometimes personalities don't click. We'll work with you to find a more suitable tutor at no additional cost, ensuring the best possible learning experience."
        }
      ]
    },
    {
      id: "academic",
      title: "Academic Support",
      icon: <Mail className="w-5 h-5" />,
      questions: [
        {
          question: "What subjects do you cover?",
          answer: "We cover all major subjects including Mathematics, English, Sciences (Biology, Chemistry, Physics), Modern Foreign Languages, History, Geography, Economics, and more. We also specialise in entrance exam preparation for 11+, 13+, GCSE, A-Level, and university entrance exams."
        },
        {
          question: "Do you provide progress reports?",
          answer: "Yes, we provide detailed progress reports after every session for Premium tier students, and weekly comprehensive reports for Elite and Platinum tier students. These include assessment of strengths, areas for improvement, homework completion, and recommendations for continued progress."
        },
        {
          question: "Can you help with university applications?",
          answer: "Absolutely. Our Platinum tier tutors specialise in university applications including UCAS guidance, personal statement coaching, interview preparation, and Oxbridge applications. We have an excellent track record of helping students secure places at top universities."
        },
        {
          question: "Do you offer support for students with special educational needs?",
          answer: "Yes, we have specialist tutors trained in supporting students with dyslexia, ADHD, autism, and other learning differences. We create personalised learning plans using multi-sensory approaches and work closely with parents to ensure the best possible outcomes."
        }
      ]
    },
    {
      id: "technology",
      title: "Technology & Platform",
      icon: <HelpCircle className="w-5 h-5" />,
      questions: [
        {
          question: "What technology do I need for online sessions?",
          answer: "You'll need a computer, tablet, or smartphone with a stable internet connection, webcam, and microphone. We use a secure, easy-to-use platform that works in any web browser - no downloads required. We'll provide a quick technology check before your first session."
        },
        {
          question: "Is the online platform secure and private?",
          answer: "Yes, we use enterprise-grade security measures to protect all sessions and data. Our platform is GDPR compliant and uses end-to-end encryption. We never record sessions without explicit consent and maintain strict privacy policies to protect student information."
        },
        {
          question: "Can parents observe online sessions?",
          answer: "Yes, parents are welcome to observe sessions, especially for younger students. We find this particularly helpful for students under 12 or those who benefit from additional support. We can also provide regular updates to parents who prefer not to observe directly."
        },
        {
          question: "What happens if there are technical difficulties during a session?",
          answer: "Our technical support team is available during all session hours to resolve any issues quickly. If technical problems prevent a session from continuing, we'll reschedule at no charge and ensure no learning time is lost."
        }
      ]
    }
  ]
}

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <Card className="border-slate-200">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-navy-50 transition-colors duration-200 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-slate-900 pr-4">{question}</h3>
        <div className="text-slate-400 flex-shrink-0">
          {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </div>
      </button>
      
      {isOpen && (
        <m.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="border-t border-slate-200"
        >
          <CardContent className="p-6 pt-4">
            <p className="text-slate-700 leading-relaxed">{answer}</p>
          </CardContent>
        </m.div>
      )}
    </Card>
  )
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('general')

  const toggleItem = (categoryId: string, questionIndex: number) => {
    const itemId = `${categoryId}-${questionIndex}`
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const filteredCategories = faqContent.categories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <PageLayout
      title="FAQ - My Private Tutor Online"
      description="Find answers to frequently asked questions about our premium tutoring services, pricing, scheduling, and educational approach."
      keywords="FAQ, tutoring questions, pricing, booking, academic support, online tutoring help"
      background="white"
    >
      <PageHero
        title={faqContent.hero.title}
        subtitle={faqContent.hero.subtitle}
        description={faqContent.hero.description}
        backgroundImage={faqContent.hero.backgroundImage}
        height="medium"
        overlay="medium"
      />

      {/* Search Section */}
      <Section className="py-12" background="slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-slate-300 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </m.div>
        </div>
      </Section>

      {/* Category Navigation */}
      <Section className="py-8" background="white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {faqContent.categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 ${
                  activeCategory === category.id 
                    ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                    : 'border-navy-300 text-navy-700 hover:bg-navy-50'
                }`}
              >
                {category.icon}
                {category.title}
              </Button>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ Content */}
      <Section className="py-16 lg:py-24" background="white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {searchTerm ? (
            // Search Results
            <div className="max-w-4xl mx-auto">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">
                  Search Results for "{searchTerm}"
                </h2>
                <p className="text-slate-600">
                  Found {filteredCategories.reduce((acc, cat) => acc + cat.questions.length, 0)} results
                </p>
              </m.div>

              {filteredCategories.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No results found</h3>
                  <p className="text-slate-600 mb-6">
                    We couldn't find any questions matching your search. Try different keywords or browse our categories.
                  </p>
                  <Button 
                    onClick={() => setSearchTerm('')}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCategories.map((category) => (
                    <div key={category.id}>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        {category.icon}
                        {category.title}
                      </h3>
                      {category.questions.map((item, index) => (
                        <m.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="mb-2"
                        >
                          <FAQItem
                            question={item.question}
                            answer={item.answer}
                            isOpen={openItems.includes(`${category.id}-${index}`)}
                            onToggle={() => toggleItem(category.id, index)}
                          />
                        </m.div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Category View
            <div className="max-w-4xl mx-auto">
              {faqContent.categories
                .filter(category => category.id === activeCategory)
                .map((category) => (
                  <div key={category.id}>
                    <m.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-center mb-12"
                    >
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="bg-amber-100 rounded-full p-3 text-amber-600">
                          {category.icon}
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-slate-900">
                          {category.title}
                        </h2>
                      </div>
                    </m.div>

                    <div className="space-y-4">
                      {category.questions.map((item, index) => (
                        <m.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <FAQItem
                            question={item.question}
                            answer={item.answer}
                            isOpen={openItems.includes(`${category.id}-${index}`)}
                            onToggle={() => toggleItem(category.id, index)}
                          />
                        </m.div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Section>

      {/* Still Have Questions Section */}
      <Section className="py-16 lg:py-24" background="slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              Our educational consultants are here to help. Book a free consultation or get in touch with our support team.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Call Us</h3>
                  <p className="text-slate-600 mb-4">Speak directly with our educational consultants</p>
                  <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                    +44 (0) 20 1234 5678
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Live Chat</h3>
                  <p className="text-slate-600 mb-4">Get instant answers from our support team</p>
                  <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
            
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