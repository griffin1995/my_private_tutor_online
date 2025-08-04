// Accessibility Utilities for WCAG 2.1 AA Compliance
// CLAUDE.md rule 30-33: Accessibility compliance requirements

// Keyboard navigation utilities
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown'
} as const

export type KeyboardKey = typeof KEYBOARD_KEYS[keyof typeof KEYBOARD_KEYS]

// Focus management utilities
export class FocusManager {
  private focusableElementsSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ')

  getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(
      container.querySelectorAll(this.focusableElementsSelector)
    ).filter(element => {
      return element instanceof HTMLElement && this.isVisible(element)
    }) as HTMLElement[]
  }

  getFirstFocusableElement(container: HTMLElement): HTMLElement | null {
    const focusableElements = this.getFocusableElements(container)
    return focusableElements[0] || null
  }

  getLastFocusableElement(container: HTMLElement): HTMLElement | null {
    const focusableElements = this.getFocusableElements(container)
    return focusableElements[focusableElements.length - 1] || null
  }

  trapFocus(container: HTMLElement, event: KeyboardEvent) {
    if (event.key !== KEYBOARD_KEYS.TAB) return

    const focusableElements = this.getFocusableElements(container)
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      // Shift + Tab (backwards)
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      }
    } else {
      // Tab (forwards)
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }
  }

  private isVisible(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element)
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0' &&
      element.offsetWidth > 0 &&
      element.offsetHeight > 0
    )
  }

  // Restore focus to previously focused element
  restoreFocus(elementToFocus: HTMLElement | null) {
    if (elementToFocus && this.isVisible(elementToFocus)) {
      elementToFocus.focus()
    }
  }
}

export const focusManager = new FocusManager()

// ARIA utilities
export const createAriaDescription = (text: string): string => {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()
}

export const generateUniqueId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

// Screen reader announcements
export class ScreenReaderAnnouncer {
  private liveRegion: HTMLElement | null = null

  constructor() {
    this.createLiveRegion()
  }

  private createLiveRegion() {
    if (typeof window === 'undefined') return

    this.liveRegion = document.createElement('div')
    this.liveRegion.setAttribute('aria-live', 'polite')
    this.liveRegion.setAttribute('aria-atomic', 'true')
    this.liveRegion.setAttribute('class', 'sr-only')
    this.liveRegion.style.position = 'absolute'
    this.liveRegion.style.width = '1px'
    this.liveRegion.style.height = '1px'
    this.liveRegion.style.padding = '0'
    this.liveRegion.style.margin = '-1px'
    this.liveRegion.style.overflow = 'hidden'
    this.liveRegion.style.clip = 'rect(0, 0, 0, 0)'
    this.liveRegion.style.whiteSpace = 'nowrap'
    this.liveRegion.style.border = '0'

    document.body.appendChild(this.liveRegion)
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.liveRegion) this.createLiveRegion()
    if (!this.liveRegion) return

    this.liveRegion.setAttribute('aria-live', priority)
    this.liveRegion.textContent = message

    // Clear after announcement
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = ''
      }
    }, 1000)
  }
}

export const screenReader = new ScreenReaderAnnouncer()

// Color contrast utilities
export const getContrastRatio = (foreground: string, background: string): number => {
  const getLuminance = (color: string): number => {
    // Simple RGB to luminance conversion
    // This is a simplified version - in production, use a proper color library
    const rgb = color.match(/\d+/g)
    if (!rgb || rgb.length < 3) return 0

    const [r = 0, g = 0, b = 0] = rgb.map(c => {
      const channel = parseInt(c) / 255
      return channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const luminance1 = getLuminance(foreground)
  const luminance2 = getLuminance(background)

  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return (lighter + 0.05) / (darker + 0.05)
}

export const meetsWCAGContrast = (
  foreground: string, 
  background: string, 
  level: 'AA' | 'AAA' = 'AA',
  fontSize: 'normal' | 'large' = 'normal'
): boolean => {
  const ratio = getContrastRatio(foreground, background)
  
  if (level === 'AAA') {
    return fontSize === 'large' ? ratio >= 4.5 : ratio >= 7
  } else {
    return fontSize === 'large' ? ratio >= 3 : ratio >= 4.5
  }
}

// Reduced motion detection
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Motion Preference Utilities
 * Documentation Source: CSS Media Queries Level 5 & Radix UI Animation Guide
 * Reference: https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion
 * Reference: https://www.radix-ui.com/primitives/docs/guides/animation
 * 
 * Pattern: Conditional animation based on user preferences
 * Purpose: Respect user motion preferences for better accessibility
 */

// Get animation duration based on motion preference
export const getAnimationDuration = (defaultDuration: number): number => {
  return prefersReducedMotion() ? 0 : defaultDuration
}

// Get animation CSS classes based on motion preference
export const getAnimationClasses = (animationClasses: string): string => {
  return prefersReducedMotion() ? '' : animationClasses
}

// CSS animation variables for motion preferences
export const injectMotionCSSVariables = (): void => {
  if (typeof window === 'undefined') return

  const root = document.documentElement
  const reducedMotion = prefersReducedMotion()

  // Set CSS custom properties
  root.style.setProperty('--animation-duration', reducedMotion ? '0s' : '300ms')
  root.style.setProperty('--animation-timing', reducedMotion ? 'step-end' : 'ease-out')
  root.style.setProperty('--transition-duration', reducedMotion ? '0s' : '200ms')
  root.style.setProperty('--transition-timing', reducedMotion ? 'step-end' : 'ease-out')
}

// Listen for motion preference changes
export const watchMotionPreference = (callback: (prefersReduced: boolean) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {}

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches)
    injectMotionCSSVariables()
  }

  mediaQuery.addEventListener('change', handler)
  
  // Initial call
  callback(mediaQuery.matches)
  injectMotionCSSVariables()

  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handler)
  }
}

// High contrast detection
export const prefersHighContrast = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-contrast: high)').matches
}

// Keyboard navigation helpers
export const handleKeyboardNavigation = (
  event: KeyboardEvent,
  callbacks: {
    onEnter?: () => void
    onSpace?: () => void
    onEscape?: () => void
    onArrowUp?: () => void
    onArrowDown?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
    onHome?: () => void
    onEnd?: () => void
  }
) => {
  switch (event.key) {
    case KEYBOARD_KEYS.ENTER:
      callbacks.onEnter?.()
      break
    case KEYBOARD_KEYS.SPACE:
      event.preventDefault() // Prevent page scroll
      callbacks.onSpace?.()
      break
    case KEYBOARD_KEYS.ESCAPE:
      callbacks.onEscape?.()
      break
    case KEYBOARD_KEYS.ARROW_UP:
      event.preventDefault()
      callbacks.onArrowUp?.()
      break
    case KEYBOARD_KEYS.ARROW_DOWN:
      event.preventDefault()
      callbacks.onArrowDown?.()
      break
    case KEYBOARD_KEYS.ARROW_LEFT:
      event.preventDefault()
      callbacks.onArrowLeft?.()
      break
    case KEYBOARD_KEYS.ARROW_RIGHT:
      event.preventDefault()
      callbacks.onArrowRight?.()
      break
    case KEYBOARD_KEYS.HOME:
      event.preventDefault()
      callbacks.onHome?.()
      break
    case KEYBOARD_KEYS.END:
      event.preventDefault()
      callbacks.onEnd?.()
      break
  }
}

// Form accessibility helpers
export const getFormErrorId = (fieldName: string): string => {
  return `${fieldName}-error`
}

export const getFormDescriptionId = (fieldName: string): string => {
  return `${fieldName}-description`
}

export const getFormLabelId = (fieldName: string): string => {
  return `${fieldName}-label`
}

// Link accessibility helpers
export const isExternalLink = (href: string): boolean => {
  try {
    const url = new URL(href, window.location.href)
    return url.hostname !== window.location.hostname
  } catch {
    return false
  }
}

export const getExternalLinkProps = (href: string) => {
  if (isExternalLink(href)) {
    return {
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': `Opens in new window`
    }
  }
  return {}
}

// Image accessibility helpers
export const validateImageAlt = (alt: string, src: string): boolean => {
  // Check for meaningful alt text
  if (!alt || alt.trim().length === 0) return false
  
  // Check if alt text is just filename
  const filename = src.split('/').pop()?.toLowerCase() || ''
  const altLower = alt.toLowerCase()
  
  if (altLower.includes(filename) || altLower === 'image' || altLower === 'picture') {
    return false
  }
  
  return true
}

// Context7 MCP Documentation Source: /microsoft/typescript
// Reference: ESLint import/no-anonymous-default-export rule
// Purpose: Export named object instead of anonymous object for better debugging
const AccessibilityUtils = {
  KEYBOARD_KEYS,
  focusManager,
  screenReader,
  createAriaDescription,
  generateUniqueId,
  getContrastRatio,
  meetsWCAGContrast,
  prefersReducedMotion,
  getAnimationDuration,
  getAnimationClasses,
  injectMotionCSSVariables,
  watchMotionPreference,
  prefersHighContrast,
  handleKeyboardNavigation,
  getFormErrorId,
  getFormDescriptionId,
  getFormLabelId,
  isExternalLink,
  getExternalLinkProps,
  validateImageAlt
}

export default AccessibilityUtils