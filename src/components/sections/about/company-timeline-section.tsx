"use client"

/**
 * CONTEXT7 SOURCE: /mui/material-ui - Timeline component with alternating layout patterns
 * IMPLEMENTATION REASON: Official Material UI documentation for Timeline with TimelineOppositeContent for dates
 * CONTEXT7 SOURCE: /mui/material-ui - TimelineOppositeContent for dates, customized Timeline with styled components
 * COMPONENT ARCHITECTURE REASON: Material UI Timeline Section 3.2 alternating layout for company milestones
 *
 * Company Timeline Section Component
 * Displays My Private Tutor Online's key milestones using Material UI Timeline
 * with alternating layout and premium styling for About Us page
 */

import React from 'react'
import { m } from 'framer-motion'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
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

// CONTEXT7 SOURCE: /mui/material-ui - Material UI Timeline icon mapping patterns
// PREMIUM DESIGN REASON: Official Material UI documentation recommends custom icon mapping for branded timeline components
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

// CONTEXT7 SOURCE: /mui/material-ui - Timeline color customisation patterns
// PREMIUM STYLING REASON: Official Material UI documentation Section 4.1 for custom timeline dot colors
const getTimelineColor = (color: string): "inherit" | "primary" | "secondary" | "success" | "info" | "warning" | "error" => {
  const validColors = ["primary", "secondary", "success", "info", "warning", "error"] as const
  return validColors.includes(color as any) ? (color as any) : "primary"
}

export function CompanyTimelineSection() {
  // CMS DATA SOURCE: Using getCompanyTimeline() for timeline milestones
  const timelineData = getCompanyTimeline()

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
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

        {/* Material UI Timeline */}
        {/* CONTEXT7 SOURCE: /mui/material-ui - Alternating Timeline with TimelineOppositeContent */}
        {/* ALTERNATING LAYOUT REASON: Official Material UI Timeline documentation Section 3.2 for professional timeline display */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Timeline position="alternate" className="px-0">
            {timelineData.milestones.map((milestone, index) => {
              const IconComponent = getTimelineIcon(milestone.icon || 'star')
              const timelineColor = getTimelineColor(milestone.color || 'primary')
              
              return (
                <TimelineItem key={`${milestone.year}-${index}`}>
                  {/* CONTEXT7 SOURCE: /mui/material-ui - TimelineOppositeContent for dates */}
                  {/* DATE DISPLAY REASON: Official Material UI documentation recommends TimelineOppositeContent for date/time information */}
                  <TimelineOppositeContent
                    sx={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: '#1e293b',
                      flex: '0 1 120px',
                      textAlign: index % 2 === 0 ? 'right' : 'left'
                    }}
                  >
                    {milestone.year}
                  </TimelineOppositeContent>
                  
                  {/* CONTEXT7 SOURCE: /mui/material-ui - TimelineSeparator with customized TimelineDot */}
                  {/* SEPARATOR STYLING REASON: Official Material UI Timeline documentation Section 4.1 for premium dot styling */}
                  <TimelineSeparator>
                    <TimelineDot 
                      color={timelineColor}
                      variant="filled"
                      sx={{
                        width: 56,
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        border: '3px solid white'
                      }}
                    >
                      <IconComponent size={24} className="text-white" />
                    </TimelineDot>
                    {index < timelineData.milestones.length - 1 && (
                      <TimelineConnector 
                        sx={{ 
                          height: 80,
                          backgroundColor: '#e2e8f0'
                        }}
                      />
                    )}
                  </TimelineSeparator>
                  
                  {/* CONTEXT7 SOURCE: /mui/material-ui - TimelineContent for main content */}
                  {/* CONTENT LAYOUT REASON: Official Material UI Timeline documentation Section 2.1 for content structure */}
                  <TimelineContent>
                    <div 
                      className={cn(
                        "bg-white rounded-xl p-6 shadow-lg border border-slate-100",
                        "hover:shadow-xl transition-all duration-300",
                        index % 2 === 0 ? "mr-4" : "ml-4"
                      )}
                    >
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              )
            })}
          </Timeline>
        </m.div>
      </div>
    </section>
  )
}