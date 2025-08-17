"use client"

/**
 * CONTEXT7 SOURCE: /framer/motion - Custom Timeline component with alternating layout patterns
 * IMPLEMENTATION REASON: Custom timeline implementation using Framer Motion for premium animations
 * CONTEXT7 SOURCE: /lucide-react/lucide - Icon components for timeline milestones
 * COMPONENT ARCHITECTURE REASON: Custom timeline with alternating layout for company milestones
 *
 * Company Timeline Section Component
 * Displays My Private Tutor Online's key milestones using custom timeline
 * with alternating layout and premium styling for About Us page
 */

import React from 'react'
import { m } from 'framer-motion'
import { 
  Rocket, 
  Globe, 
  Crown, 
  Laptop, 
  Star,
  Award,
  Users,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getCompanyTimeline } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /lucide-react/lucide - Lucide React icon mapping patterns
// PREMIUM DESIGN REASON: Custom icon mapping for branded timeline components
const getTimelineIcon = (iconName: string) => {
  const iconMap = {
    rocket: Rocket,
    globe: Globe,
    crown: Crown,
    laptop: Laptop,
    star: Star,
    award: Award,
    users: Users,
    trending: TrendingUp
  }
  
  return iconMap[iconName as keyof typeof iconMap] || Star
}

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Tailwind color mapping patterns
// PREMIUM STYLING REASON: Custom color mapping for timeline dot styling
const getTimelineColor = (color: string): string => {
  const colorMap: Record<string, string> = {
    primary: 'bg-blue-600',
    secondary: 'bg-purple-600',
    success: 'bg-green-600',
    info: 'bg-cyan-600',
    warning: 'bg-amber-600',
    error: 'bg-red-600'
  }
  return colorMap[color] || 'bg-accent-600'
}

export function CompanyTimelineSection() {
  // CMS DATA SOURCE: Using getCompanyTimeline() for timeline milestones
  const timelineData = getCompanyTimeline()

  return (
    <section 
      id="timeline"
      className="py-16 lg:py-24 bg-slate-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for reusable UI */}
        {/* HEADER STRUCTURE REASON: React documentation Section 2.3 recommends semantic heading hierarchy */}
        <div className="text-center mb-12 lg:mb-16">
          <m.h2 
            className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {timelineData.title}
          </m.h2>
          <m.p 
            className="text-xl text-slate-600 mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {timelineData.subtitle}
          </m.p>
          {timelineData.description && (
            <m.p 
              className="text-lg text-slate-500 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {timelineData.description}
            </m.p>
          )}
        </div>

        {/* Custom Timeline */}
        {/* CONTEXT7 SOURCE: /framer/motion - Custom Alternating Timeline with motion animations */}
        {/* ALTERNATING LAYOUT REASON: Custom timeline implementation for professional timeline display */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-slate-300 h-full" />
            
            {timelineData.milestones.map((milestone, index) => {
              const IconComponent = getTimelineIcon(milestone.icon || 'star')
              const timelineColorClass = getTimelineColor(milestone.color || 'primary')
              const isEven = index % 2 === 0
              
              return (
                <m.div 
                  key={`${milestone.year}-${index}`}
                  className="relative flex items-center mb-12 last:mb-0"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline Content - Alternating Layout */}
                  <div className={cn(
                    "flex-1",
                    isEven ? "pr-8 text-right" : "pl-8 order-3"
                  )}>
                    {/* Year Display */}
                    <div className={cn(
                      "text-lg font-semibold text-slate-900 mb-2",
                      isEven ? "text-right" : "text-left"
                    )}>
                      {milestone.year}
                    </div>
                    
                    {/* Content Card */}
                    <div className={cn(
                      "bg-white rounded-xl p-6 shadow-lg border border-slate-100",
                      "hover:shadow-xl transition-all duration-300",
                      isEven ? "mr-0" : "ml-0"
                    )}>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot with Icon */}
                  <div className={cn(
                    "relative z-10 w-14 h-14 rounded-full border-4 border-white shadow-lg",
                    "flex items-center justify-center",
                    timelineColorClass,
                    isEven ? "order-2" : "order-2"
                  )}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className={cn(
                    "flex-1",
                    isEven ? "order-3" : "pr-8"
                  )} />
                </m.div>
              )
            })}
          </div>
        </m.div>
      </div>
    </section>
  )
}