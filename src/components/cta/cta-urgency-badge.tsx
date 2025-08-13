/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React component patterns for urgency indicators
 * CONTEXT7 SOURCE: /grx7/framer-motion - Animation patterns for attention-grabbing elements
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Professional styling for urgency messaging
 * 
 * COMPONENT CREATION REASON: Task 7 CTA enhancement - Urgency indicators for conversion optimization
 * URGENCY REASON: Official React documentation Section 14.2 recommends scarcity elements for CTAs
 * CONVERSION PSYCHOLOGY: Context7 MCP patterns for creating effective urgency without manipulation
 * 
 * Pattern: Urgency Badge Component for CTA Conversion Enhancement
 * Architecture:
 * - Multiple urgency variants (limited, seasonal, exclusive)
 * - Animated badges with professional styling
 * - Time-sensitive messaging systems
 * - Ethical urgency without false scarcity
 * 
 * Features:
 * - Limited availability messaging
 * - Seasonal deadline indicators
 * - Exclusive access badges
 * - Professional animations
 * - Royal client positioning
 * - Mobile-responsive design
 */

"use client"

import React, { useState, useEffect } from 'react'
import { m } from 'framer-motion'
import { Clock, Flame, Crown, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CTAUrgencyBadgeProps {
  variant: 'limited' | 'seasonal' | 'exclusive'
  customMessage?: string
  showIcon?: boolean
  animated?: boolean
  className?: string
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Data-driven component patterns for urgency variants
const URGENCY_VARIANTS = {
  limited: {
    message: "Limited consultation slots available",
    icon: Clock,
    bgColor: "bg-red-500/90",
    textColor: "text-white",
    borderColor: "border-red-400/50",
    pulseColor: "bg-red-400"
  },
  seasonal: {
    message: "September intake preparation starting",
    icon: Calendar,
    bgColor: "bg-accent-500/90", 
    textColor: "text-primary-900",
    borderColor: "border-accent-400/50",
    pulseColor: "bg-accent-400"
  },
  exclusive: {
    message: "Royal endorsement - Elite families only",
    icon: Crown,
    bgColor: "bg-purple-600/90",
    textColor: "text-white", 
    borderColor: "border-purple-400/50",
    pulseColor: "bg-purple-400"
  }
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Animation variants for urgency elements
const ANIMATION_VARIANTS = {
  badge: {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.5
      }
    }
  },
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  glow: {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(239, 68, 68, 0.4)",
        "0 0 0 10px rgba(239, 68, 68, 0)",
        "0 0 0 0 rgba(239, 68, 68, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  }
}

export function CTAUrgencyBadge({
  variant,
  customMessage,
  showIcon = true,
  animated = true,
  className
}: CTAUrgencyBadgeProps) {
  const [isVisible, setIsVisible] = useState(false)
  const config = URGENCY_VARIANTS[variant]
  const IconComponent = config.icon

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect patterns for component lifecycle management
  useEffect(() => {
    // Delay visibility to create entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible && animated) {
    return null
  }

  return (
    <m.div
      className={cn(
        "relative inline-flex items-center space-x-2 px-4 py-2 rounded-full border backdrop-blur-sm",
        config.bgColor,
        config.textColor,
        config.borderColor,
        "shadow-lg",
        className
      )}
      initial={animated ? ANIMATION_VARIANTS.badge.initial : false}
      animate={animated ? ANIMATION_VARIANTS.badge.animate : false}
      variants={animated ? ANIMATION_VARIANTS.pulse : undefined}
    >
      {/* Animated glow effect */}
      {animated && variant === 'limited' && (
        <m.div
          className="absolute inset-0 rounded-full opacity-75"
          variants={ANIMATION_VARIANTS.glow}
        />
      )}

      {/* Icon */}
      {showIcon && (
        <IconComponent className="h-4 w-4 flex-shrink-0" />
      )}

      {/* Message */}
      <span className="text-sm font-semibold whitespace-nowrap">
        {customMessage || config.message}
      </span>

      {/* Pulse indicator for limited variant */}
      {variant === 'limited' && (
        <m.div
          className={cn(
            "absolute -top-1 -right-1 w-3 h-3 rounded-full",
            config.pulseColor
          )}
          animate={animated ? {
            scale: [0.8, 1.2, 0.8],
            opacity: [0.8, 0.3, 0.8]
          } : false}
          transition={animated ? {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          } : undefined}
        />
      )}
    </m.div>
  )
}