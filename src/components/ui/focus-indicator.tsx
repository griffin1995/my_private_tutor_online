/**
 * Documentation Source: WCAG 2.1 Guidelines + WAI-ARIA 1.2
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html
 * Reference: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
 * 
 * Pattern: Enhanced Focus Management System
 * Architecture:
 * - Visual focus indicators for keyboard navigation
 * - Skip-to-content functionality for screen readers
 * - Focus trap management for modals and overlays
 * - High contrast focus rings for better visibility
 * 
 * WCAG Compliance:
 * - SC 2.4.7 Focus Visible (Level AA)
 * - SC 2.4.3 Focus Order (Level A)
 * - SC 1.4.11 Non-text Contrast (Level AA)
 * 
 * Implementation:
 * - Uses :focus-visible for modern focus management
 * - Provides fallback for older browsers
 * - Customizable focus ring styles
 * - Keyboard navigation helpers
 */

"use client"

import React, { useEffect, useRef, RefObject } from 'react'
import { cn } from '@/lib/utils'

export interface FocusIndicatorProps {
  /** Element to apply focus management to */
  children: React.ReactElement<any, any>
  /** Custom focus ring styling */
  focusRingClass?: string
  /** Whether to show focus ring only on keyboard navigation */
  keyboardOnly?: boolean
  /** Custom focus ring offset */
  offset?: number
  /** Focus ring color variant */
  variant?: 'default' | 'primary' | 'accent' | 'royal' | 'error'
}

/**
 * Focus ring variants following brand design system
 */
const focusVariants = {
  default: 'ring-blue-500',
  primary: 'ring-primary-500',
  accent: 'ring-accent-500', 
  royal: 'ring-royal-500',
  error: 'ring-red-500'
}

/**
 * Enhanced focus indicator component with WCAG compliance
 */
export function FocusIndicator({
  children,
  focusRingClass,
  keyboardOnly = true,
  offset = 2,
  variant = 'default'
}: FocusIndicatorProps) {
  const focusRing = focusVariants[variant]
  
  const focusClasses = cn(
    // Base focus styles
    'focus:outline-none',
    keyboardOnly ? 'focus-visible:ring-2' : 'focus:ring-2',
    `focus-visible:ring-offset-${offset}`,
    focusRingClass || focusRing,
    // High contrast support
    'focus-visible:ring-offset-white',
    'dark:focus-visible:ring-offset-gray-800'
  )

  return React.cloneElement(children, {
    className: cn((children.props as any).className, focusClasses)
  })
}

/**
 * Skip to main content link for keyboard users
 */
export function SkipToMainContent() {
  return (
    <a
      href="#main-content"
      className={cn(
        // Hidden by default, visible on focus
        'sr-only focus:not-sr-only',
        'absolute top-4 left-4 z-50',
        'bg-primary-900 text-white px-4 py-2 rounded-md',
        'font-medium text-sm',
        // Focus styling
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'focus:ring-accent-500 focus:ring-offset-white',
        // Animation
        'transition-all duration-200 ease-out',
        'transform -translate-y-2 opacity-0',
        'focus:translate-y-0 focus:opacity-100'
      )}
    >
      Skip to main content
    </a>
  )
}

/**
 * Focus trap hook for modal dialogs and overlays
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstFocusable = focusableElements[0] as HTMLElement
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus()
          e.preventDefault()
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus()
          e.preventDefault()
        }
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close modal or return focus
        container.dispatchEvent(new CustomEvent('focustrap:escape'))
      }
    }

    // Set initial focus
    firstFocusable?.focus()

    // Add event listeners
    container.addEventListener('keydown', handleTabKey)
    container.addEventListener('keydown', handleEscapeKey)

    return () => {
      container.removeEventListener('keydown', handleTabKey)
      container.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isActive])

  return containerRef
}

/**
 * Focus management utilities
 */
export const focusUtils = {
  /**
   * Move focus to element with announcement for screen readers
   */
  moveFocusTo: (element: HTMLElement | null, announcement?: string) => {
    if (!element) return
    
    element.focus()
    
    if (announcement) {
      // Create temporary live region for announcement
      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.className = 'sr-only'
      liveRegion.textContent = announcement
      
      document.body.appendChild(liveRegion)
      
      // Clean up after announcement
      setTimeout(() => {
        if (document.body.contains(liveRegion)) {
          document.body.removeChild(liveRegion)
        }
      }, 1000)
    }
  },

  /**
   * Get all focusable elements within a container
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const selector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ')

    return Array.from(container.querySelectorAll(selector))
  },

  /**
   * Check if element is currently focusable
   */
  isFocusable: (element: HTMLElement): boolean => {
    if (element.hasAttribute('disabled')) return false
    if (element.getAttribute('tabindex') === '-1') return false
    if (element.hidden) return false
    
    const style = window.getComputedStyle(element)
    if (style.display === 'none' || style.visibility === 'hidden') return false
    
    return true
  }
}