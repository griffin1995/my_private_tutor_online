/**
 * React Hooks for Accessibility Features
 * Documentation Source: React Hooks & WCAG 2.1 Guidelines
 * Reference: https://react.dev/reference/react/hooks
 * Reference: https://www.w3.org/WAI/WCAG21/quickref/
 * 
 * Pattern: Custom React hooks for accessibility
 * Purpose: Provide reusable accessibility patterns in React components
 */

import { useEffect, useState, useCallback, useRef } from 'react'
import { 
  prefersReducedMotion, 
  watchMotionPreference,
  focusManager,
  screenReader,
  injectMotionCSSVariables
} from '@/lib/accessibility'

/**
 * useReducedMotion Hook
 * Documentation Source: CSS Media Queries & React Hooks
 * Reference: https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion
 * 
 * Pattern: React hook for motion preferences
 * Purpose: Reactively respond to user motion preferences
 */
export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const unsubscribe = watchMotionPreference(setReducedMotion)
    return unsubscribe
  }, [])

  return reducedMotion
}

/**
 * useFocusTrap Hook
 * Documentation Source: WAI-ARIA Dialog Pattern
 * Reference: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 * 
 * Pattern: Focus trap for modal dialogs
 * Purpose: Keep focus within modal for keyboard navigation
 */
export const useFocusTrap = <T extends HTMLElement = HTMLElement>(
  isActive: boolean = true
) => {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const previouslyFocusedElement = document.activeElement as HTMLElement

    // Focus first focusable element
    const firstFocusable = focusManager.getFirstFocusableElement(container)
    firstFocusable?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      focusManager.trapFocus(container, event)
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      // Restore focus to previously focused element
      focusManager.restoreFocus(previouslyFocusedElement)
    }
  }, [isActive])

  return containerRef
}

/**
 * useAnnouncement Hook
 * Documentation Source: WAI-ARIA Live Regions
 * Reference: https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA19
 * 
 * Pattern: Screen reader announcements
 * Purpose: Announce dynamic content changes to screen readers
 */
export const useAnnouncement = () => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    screenReader.announce(message, priority)
  }, [])

  return announce
}

/**
 * useKeyboardNavigation Hook
 * Documentation Source: WCAG 2.1 Keyboard Navigation
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html
 * 
 * Pattern: Keyboard navigation for lists and grids
 * Purpose: Navigate through items using arrow keys
 */
export const useKeyboardNavigation = <T extends HTMLElement = HTMLElement>(
  items: T[],
  options: {
    orientation?: 'horizontal' | 'vertical' | 'grid'
    loop?: boolean
    onSelect?: (item: T, index: number) => void
  } = {}
) => {
  const { orientation = 'vertical', loop = true, onSelect } = options
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const { key } = event
    let newIndex = focusedIndex

    switch (key) {
      case 'ArrowUp':
        if (orientation !== 'horizontal') {
          event.preventDefault()
          newIndex = focusedIndex > 0 ? focusedIndex - 1 : (loop ? items.length - 1 : 0)
        }
        break
      
      case 'ArrowDown':
        if (orientation !== 'horizontal') {
          event.preventDefault()
          newIndex = focusedIndex < items.length - 1 ? focusedIndex + 1 : (loop ? 0 : items.length - 1)
        }
        break

      case 'ArrowLeft':
        if (orientation !== 'vertical') {
          event.preventDefault()
          newIndex = focusedIndex > 0 ? focusedIndex - 1 : (loop ? items.length - 1 : 0)
        }
        break

      case 'ArrowRight':
        if (orientation !== 'vertical') {
          event.preventDefault()
          newIndex = focusedIndex < items.length - 1 ? focusedIndex + 1 : (loop ? 0 : items.length - 1)
        }
        break

      case 'Home':
        event.preventDefault()
        newIndex = 0
        break

      case 'End':
        event.preventDefault()
        newIndex = items.length - 1
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < items.length) {
          const item = items[focusedIndex]
          if (item) {
            onSelect?.(item, focusedIndex)
          }
        }
        break
    }

    if (newIndex !== focusedIndex && newIndex >= 0 && newIndex < items.length) {
      setFocusedIndex(newIndex)
      items[newIndex]?.focus()
    }
  }, [focusedIndex, items, orientation, loop, onSelect])

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown
  }
}

/**
 * useMediaQuery Hook
 * Documentation Source: CSS Media Queries
 * Reference: https://www.w3.org/TR/mediaqueries-5/
 * 
 * Pattern: React hook for media queries
 * Purpose: Respond to media query changes in React
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    setMatches(mediaQuery.matches)

    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }, [query])

  return matches
}

/**
 * useHighContrast Hook
 * Documentation Source: CSS Media Queries Level 5
 * Reference: https://www.w3.org/TR/mediaqueries-5/#prefers-contrast
 * 
 * Pattern: High contrast mode detection
 * Purpose: Adapt UI for high contrast preferences
 */
export const useHighContrast = () => {
  return useMediaQuery('(prefers-contrast: high)')
}

/**
 * useColorScheme Hook
 * Documentation Source: CSS Media Queries Level 5
 * Reference: https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme
 * 
 * Pattern: Color scheme preference detection
 * Purpose: Support dark/light mode preferences
 */
export const useColorScheme = () => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  return prefersDark ? 'dark' : 'light'
}

/**
 * Initialize Accessibility Features
 * Documentation Source: WCAG 2.1 Guidelines
 * Reference: https://www.w3.org/WAI/WCAG21/quickref/
 * 
 * Pattern: Global accessibility initialization
 * Purpose: Set up accessibility features on app mount
 */
export const useAccessibilityInit = () => {
  useEffect(() => {
    // Inject CSS variables for motion preferences
    injectMotionCSSVariables()

    // Set up motion preference watcher
    const unsubscribe = watchMotionPreference(() => {
      injectMotionCSSVariables()
    })

    return unsubscribe
  }, [])
}