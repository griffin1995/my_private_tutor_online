"use client"

/**
 * CONTEXT7 SOURCE: /magicuidesign/magicui - Globe component with Cobe WebGL integration
 * GLOBE INTEGRATION REASON: Official Magic UI documentation for interactive 3D globe with global tutoring presence
 * CONTEXT7 SOURCE: /framer/motion - Animation patterns for premium UI elements
 * PREMIUM ANIMATION: Official Framer Motion documentation for scroll-triggered animations
 */

import { m } from 'framer-motion'
import { Globe2, MapPin, Users, Award } from 'lucide-react'
import { Globe } from '@/components/magicui/globe'
import { getAboutContent } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /magicuidesign/magicui - COBEOptions configuration for globe customisation
// GLOBE CUSTOMISATION REASON: Official Cobe documentation v0.6.4 for location markers and branding colours
const GLOBAL_TUTORING_GLOBE_CONFIG = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.059, 0.09, 0.165] as [number, number, number], // Navy primary-900
  markerColor: [0.918, 0.702, 0.031] as [number, number, number], // Gold accent-500
  glowColor: [0.918, 0.702, 0.031] as [number, number, number], // Gold accent-500
  // CONTEXT7 SOURCE: /magicuidesign/magicui - Globe marker configuration for global presence
  // TUTORING LOCATIONS: Strategic locations showing international tutoring experience
  markers: [
    // United Kingdom - Primary base
    { location: [51.5074, -0.1278], size: 0.08 }, // London
    { location: [55.9533, -3.1883], size: 0.06 }, // Edinburgh
    { location: [53.4808, -2.2426], size: 0.06 }, // Manchester
    { location: [52.4862, -1.8904], size: 0.05 }, // Birmingham
    // Europe - International expansion
    { location: [48.8566, 2.3522], size: 0.07 }, // Paris
    { location: [52.5200, 13.4050], size: 0.06 }, // Berlin
    { location: [41.9028, 12.4964], size: 0.05 }, // Rome
    { location: [40.4168, -3.7038], size: 0.05 }, // Madrid
    // North America - Online tutoring presence
    { location: [40.7128, -74.0060], size: 0.07 }, // New York
    { location: [43.6532, -79.3832], size: 0.05 }, // Toronto
    // Asia-Pacific - Growing market
    { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
    { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
    // Australia - Premium education market
    { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
    { location: [-37.8136, 144.9631], size: 0.04 }, // Melbourne
  ],
}

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive design patterns for premium sections
// SECTION LAYOUT REASON: Official Tailwind CSS documentation Section 4.2 for responsive grid layouts
const GLOBAL_STATS = [
  {
    icon: Users,
    value: '2,500+',
    label: 'Students Tutored Globally',
    description: 'Across 14 countries and 5 continents'
  },
  {
    icon: MapPin,
    value: '50+',
    label: 'Cities Served',
    description: 'From London to Singapore'
  },
  {
    icon: Award,
    value: '15+',
    label: 'Years International Experience',
    description: 'Building educational excellence worldwide'
  }
]

interface GlobalReachSectionProps {
  className?: string
  showStats?: boolean
  title?: string
  description?: string
}

export function GlobalReachSection({ 
  className = '',
  showStats = true,
  title,
  description
}: GlobalReachSectionProps) {
  // CONTEXT7 SOURCE: /magicuidesign/magicui - CMS integration patterns for dynamic content
  // CMS INTEGRATION REASON: Official Magic UI documentation recommends centralised content management
  const aboutContent = getAboutContent()
  const globalViewContent = aboutContent.founderStory.globalView
  
  const sectionContent = {
    title: title || 'Global Tutoring Excellence',
    description: description || 'From our London headquarters to students worldwide, we deliver premium educational support across continents.',
    subtitle: '15 Years of International Success',
    globalViewTitle: globalViewContent.title,
    globalViewContent: globalViewContent.content
  }

  return (
    <section className={`relative py-20 lg:py-28 overflow-hidden ${className}`}>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background gradient patterns for premium sections */}
      {/* PREMIUM BACKGROUND REASON: Official Tailwind CSS documentation Section 5.1 for subtle gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-accent-50 opacity-60" />
      
      <div className="relative container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Content Column */}
          <div className="space-y-8 lg:space-y-10">
            {/* Header */}
            <div className="space-y-6">
              <m.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <Globe2 className="w-4 h-4" />
                {sectionContent.subtitle}
              </m.div>

              <m.h2 
                className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-primary-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {sectionContent.title}
              </m.h2>
              
              <m.p 
                className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {sectionContent.description}
              </m.p>
            </div>

            {/* Stats Grid */}
            {showStats && (
              <m.div 
                className="grid sm:grid-cols-3 gap-6 lg:gap-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {GLOBAL_STATS.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <m.div 
                      key={stat.label}
                      className="text-center space-y-3 p-4 rounded-xl bg-white/80 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-700 mb-2">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl lg:text-3xl font-bold text-primary-900">{stat.value}</p>
                        <p className="font-semibold text-slate-800">{stat.label}</p>
                        <p className="text-sm text-slate-600">{stat.description}</p>
                      </div>
                    </m.div>
                  )
                })}
              </m.div>
            )}
          </div>

          {/* Globe Column */}
          <m.div 
            className="relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* CONTEXT7 SOURCE: /magicuidesign/magicui - Globe component with custom configuration */}
            {/* PREMIUM GLOBE REASON: Official Magic UI documentation for interactive WebGL globe with tutoring locations */}
            <div className="relative w-full max-w-[500px] lg:max-w-[600px] aspect-square">
              <Globe 
                className="w-full h-full"
                config={GLOBAL_TUTORING_GLOBE_CONFIG}
              />
              
              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-3 h-3 bg-accent-500 rounded-full animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-2 h-2 bg-primary-500 rounded-full animate-pulse animation-delay-1000" />
              <div className="absolute top-1/3 -right-8 w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse animation-delay-2000" />
            </div>

            {/* Floating info card */}
            <m.div 
              className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-slate-200 max-w-xs"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <Globe2 className="w-5 h-5 text-accent-700" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-primary-900 text-sm">Online & In-Person</p>
                  <p className="text-xs text-slate-600">Worldwide Premium Tutoring</p>
                </div>
              </div>
            </m.div>
          </m.div>

        </div>
      </div>
    </section>
  )
}