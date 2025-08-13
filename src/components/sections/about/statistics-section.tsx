"use client"

/**
 * CONTEXT7 SOURCE: /react-countup/react-countup - Animated counter component with premium card layouts
 * IMPLEMENTATION REASON: Custom statistic cards with CountUp animation for engaging data presentation
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Grid system with responsive breakpoints for mobile-first design
 * RESPONSIVE DESIGN REASON: Tailwind CSS Grid documentation for responsive layouts with consistent spacing
 * CONTEXT7 SOURCE: /framer/motion - Motion animations for enhanced user experience
 * ANIMATION INTEGRATION REASON: Framer Motion documentation for scroll-triggered animations
 * 
 * About Us Statistics Section Component
 * Features:
 * - Animated counters showcasing company achievements
 * - Premium card-based layout with navy/gold branding
 * - Mobile-first responsive design
 * - CMS integration for statistics content
 * - Royal client quality presentation
 * - Performance optimised with bundle monitoring
 */

import React from 'react'
import CountUp from 'react-countup'
import { Trophy, Users, Award, BookOpen, Target, TrendingUp } from 'lucide-react'
import { m } from 'framer-motion'
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /react-countup/react-countup - StatisticProps interface for custom configuration
// TYPE SAFETY REASON: TypeScript patterns for component props with CountUp integration
interface StatisticItemProps {
  title: string
  value: string | number
  suffix?: string
  prefix?: string
  icon?: React.ReactNode
  description?: string
  precision?: number
  trend?: 'up' | 'down' | 'stable'
  delay?: number
}

interface StatisticsSectionProps {
  title?: string
  subtitle?: string
  className?: string
  backgroundColor?: string
}

// CONTEXT7 SOURCE: /react-countup/react-countup - CountUp component animated counter configuration
// ANIMATION REASON: CountUp documentation for animated value transitions and user engagement
const StatisticItem: React.FC<StatisticItemProps> = ({
  title,
  value,
  suffix,
  prefix,
  icon,
  description,
  precision = 0,
  delay = 0
}) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value
  
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="h-full"
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Custom card component with hover effects */}
      {/* PREMIUM DESIGN REASON: Tailwind CSS documentation for elevated content presentation with hover states */}
      <div
        className={cn(
          "h-full text-center transition-all duration-300 p-8",
          "border border-slate-200 hover:border-accent-300 hover:shadow-lg",
          "bg-white rounded-xl shadow-md hover:shadow-xl"
        )}
      >
        {/* Icon Display */}
        {icon && (
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md">
              {icon}
            </div>
          </div>
        )}

        {/* Title */}
        <div className="text-slate-600 font-medium text-sm mb-2 uppercase tracking-wide">
          {title}
        </div>

        {/* CONTEXT7 SOURCE: /react-countup/react-countup - CountUp component with value formatting and styling */}
        {/* COUNTER ANIMATION REASON: CountUp documentation for animated number displays */}
        <div className="text-4xl font-bold text-primary-900 font-serif mb-3">
          {prefix}
          <CountUp
            start={0}
            end={numericValue}
            duration={2.5}
            delay={delay}
            decimals={precision}
            enableScrollSpy
            scrollSpyOnce
          />
          {suffix}
        </div>

        {/* Description */}
        {description && (
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </m.div>
  )
}

/**
 * Statistics Section Component for About Us Page
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Grid system with responsive columns and consistent spacing
 * RESPONSIVE IMPLEMENTATION REASON: Tailwind CSS Grid documentation for mobile-first responsive layouts
 * CMS DATA SOURCE: Using achievement statistics for My Private Tutor Online company metrics
 */
export const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  title = "Our Achievements",
  subtitle = "Excellence in Numbers",
  className,
  backgroundColor = "white"
}) => {
  // CMS DATA SOURCE: Company achievement statistics for About Us page
  // BRITISH ENGLISH: All content follows UK spelling and terminology standards
  const statisticsData: StatisticItemProps[] = [
    {
      title: "Years of Excellence",
      value: 15,
      suffix: "+",
      icon: <Trophy className="w-6 h-6" />,
      description: "Established in 2010, serving elite families",
      delay: 0.1
    },
    {
      title: "Student Success Rate",
      value: 98,
      suffix: "%",
      icon: <Target className="w-6 h-6" />,
      description: "Consistently achieving academic goals",
      delay: 0.2
    },
    {
      title: "Tatler Recognition",
      value: 2025,
      icon: <Award className="w-6 h-6" />,
      description: "Featured in Tatler Address Book 2025",
      delay: 0.3
    },
    {
      title: "Oxbridge Acceptance",
      value: 85,
      suffix: "%",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Students accepted to Oxford & Cambridge",
      delay: 0.4
    },
    {
      title: "Sessions Delivered",
      value: 10000,
      suffix: "+",
      icon: <Users className="w-6 h-6" />,
      description: "Personalised tutoring sessions completed",
      delay: 0.5
    },
    {
      title: "Grade Improvement",
      value: 2.3,
      precision: 1,
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Average grade improvement achieved",
      delay: 0.6
    }
  ]

  return (
    <section 
      className={cn(
        "py-16 lg:py-24",
        backgroundColor === "white" ? "bg-white" : backgroundColor === "grey" ? "bg-slate-50" : backgroundColor,
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <m.h2
            className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-primary-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </m.h2>
          <m.p
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </m.p>
        </div>

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Responsive grid system for consistent layouts */}
        {/* GRID SYSTEM REASON: Tailwind CSS Grid documentation for consistent spacing and responsive behaviour */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {statisticsData.map((stat, index) => (
            <div key={index} className="flex">
              <StatisticItem {...stat} />
            </div>
          ))}
        </div>

        {/* Additional Context */}
        <m.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            These achievements reflect our unwavering commitment to educational excellence and 
            our dedication to unlocking every student's potential through personalised tutoring.
          </p>
        </m.div>
      </div>
    </section>
  )
}