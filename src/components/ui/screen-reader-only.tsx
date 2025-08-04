"use client"

import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Screen reader only text component for accessibility
// WCAG 2.1 AA requirement for providing context to screen readers

interface ScreenReaderOnlyProps {
  children: ReactNode
  className?: string
  as?: React.ElementType
}

export function ScreenReaderOnly({ 
  children, 
  className,
  as: Component = 'span' 
}: ScreenReaderOnlyProps) {
  return (
    <Component
      className={cn(
        'sr-only',
        'absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0',
        // Make visible when focused (for skip links)
        'focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:w-auto focus:h-auto focus:p-2 focus:m-0 focus:overflow-visible focus:clip-auto focus:whitespace-normal focus:bg-primary-900 focus:text-white focus:rounded focus:z-50',
        className
      )}
    >
      {children}
    </Component>
  )
}

// Live region component for dynamic content announcements
interface LiveRegionProps {
  children: ReactNode
  priority?: 'polite' | 'assertive'
  atomic?: boolean
  className?: string
}

export function LiveRegion({ 
  children, 
  priority = 'polite', 
  atomic = true,
  className 
}: LiveRegionProps) {
  return (
    <div
      aria-live={priority}
      aria-atomic={atomic}
      className={cn(
        'sr-only',
        'absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0',
        className
      )}
    >
      {children}
    </div>
  )
}