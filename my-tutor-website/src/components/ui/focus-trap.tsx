"use client"

import { useEffect, useRef, ReactNode } from 'react'
import { focusManager } from '@/lib/accessibility'

// Focus trap component for modals, dialogs, and other overlay components
// WCAG 2.1 AA requirement for keyboard navigation

interface FocusTrapProps {
  children: ReactNode
  enabled?: boolean
  restoreFocus?: boolean
  initialFocus?: HTMLElement | null
  className?: string
}

export function FocusTrap({
  children,
  enabled = true,
  restoreFocus = true,
  initialFocus,
  className
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    // Store the currently focused element
    previousFocusRef.current = document.activeElement as HTMLElement

    // Set initial focus
    if (initialFocus) {
      initialFocus.focus()
    } else {
      const firstFocusable = focusManager.getFirstFocusableElement(containerRef.current)
      if (firstFocusable) {
        firstFocusable.focus()
      }
    }

    // Add keyboard event listener
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current) return
      focusManager.trapFocus(containerRef.current, event)
    }

    document.addEventListener('keydown', handleKeyDown)

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      
      // Restore focus to previously focused element
      if (restoreFocus && previousFocusRef.current) {
        focusManager.restoreFocus(previousFocusRef.current)
      }
    }
  }, [enabled, initialFocus, restoreFocus])

  if (!enabled) {
    return <>{children}</>
  }

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}