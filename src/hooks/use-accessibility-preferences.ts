/**
 * CONTEXT7 SOURCE: /w3c/wcag - Accessibility preferences hook for WCAG 2.1 AA compliance
 * ACCESSIBILITY HOOK: Comprehensive accessibility preferences management for motion, contrast, and interaction
 * 
 * Accessibility Preferences Hook - WCAG 2.1 AA Implementation
 * Provides comprehensive accessibility preference management including:
 * - Motion preference detection and management
 * - High contrast mode support
 * - Font size scaling preferences
 * - Keyboard navigation preferences
 * - Screen reader detection
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - WCAG 2.1 AA compliance
 * - Context7 MCP documentation only
 * - Royal client accessibility standards
 */

"use client"

import React, { useState, useEffect, useCallback } from 'react'

// CONTEXT7 SOURCE: /w3c/wcag - Accessibility preference types for comprehensive support
export interface AccessibilityPreferences {
  // Motion preferences
  prefersReducedMotion: boolean
  respectMotionPreferences: boolean
  
  // Visual preferences
  prefersHighContrast: boolean
  prefersDarkMode: boolean
  fontSizeMultiplier: number
  
  // Interaction preferences
  prefersKeyboardNavigation: boolean
  enableFocusVisible: boolean
  announceChanges: boolean
  
  // Technical preferences
  screenReaderDetected: boolean
  touchDevice: boolean
  
  // Custom preferences
  enableAnimations: boolean
  enableSounds: boolean
  enableHaptics: boolean
}

// CONTEXT7 SOURCE: /w3c/wcag - Hook return interface for accessibility management
export interface UseAccessibilityPreferencesReturn {
  preferences: AccessibilityPreferences
  updatePreference: <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => void
  resetPreferences: () => void
  getMotionSafeVariants: (normalVariants: any) => any
  announceToScreenReader: (message: string) => void
  checkColorContrast: (foreground: string, background: string) => {
    ratio: number
    wcagAA: boolean
    wcagAAA: boolean
  }
}

// CONTEXT7 SOURCE: /w3c/wcag - Default accessibility preferences based on WCAG guidelines
const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  prefersReducedMotion: false,
  respectMotionPreferences: true,
  prefersHighContrast: false,
  prefersDarkMode: false,
  fontSizeMultiplier: 1,
  prefersKeyboardNavigation: false,
  enableFocusVisible: true,
  announceChanges: true,
  screenReaderDetected: false,
  touchDevice: false,
  enableAnimations: true,
  enableSounds: true,
  enableHaptics: true
}

// CONTEXT7 SOURCE: /w3c/wcag - Color contrast calculation utility for WCAG compliance
function calculateColorContrast(foreground: string, background: string): number {
  // Convert hex colors to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  // Calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const fg = hexToRgb(foreground)
  const bg = hexToRgb(background)

  if (!fg || !bg) return 1

  const fgLuminance = getLuminance(fg.r, fg.g, fg.b)
  const bgLuminance = getLuminance(bg.r, bg.g, bg.b)

  const lighter = Math.max(fgLuminance, bgLuminance)
  const darker = Math.min(fgLuminance, bgLuminance)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * CONTEXT7 SOURCE: /w3c/wcag - Comprehensive accessibility preferences hook
 * ACCESSIBILITY MANAGEMENT: Complete accessibility preferences with WCAG 2.1 AA compliance
 */
export function useAccessibilityPreferences(options?: {
  persistPreferences?: boolean
  storageKey?: string
  announceChanges?: boolean
}): UseAccessibilityPreferencesReturn {
  const {
    persistPreferences = true,
    storageKey = 'accessibility-preferences',
    announceChanges = true
  } = options || {}

  const [preferences, setPreferences] = useState<AccessibilityPreferences>(DEFAULT_PREFERENCES)

  // CONTEXT7 SOURCE: /w3c/wcag - Media query detection for system preferences
  useEffect(() => {
    // Detect system preferences
    const mediaQueries = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
      darkMode: window.matchMedia('(prefers-color-scheme: dark)')
    }

    // Detect touch device
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Simple screen reader detection
    const screenReaderDetected = !!navigator.userAgent.match(/(JAWS|NVDA|VoiceOver|ChromeVox|Dragon|TalkBack)/i)

    // Load saved preferences
    let savedPreferences = DEFAULT_PREFERENCES
    if (persistPreferences && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          savedPreferences = { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) }
        }
      } catch (error) {
        console.warn('Failed to load accessibility preferences:', error)
      }
    }

    // Update preferences with detected values
    setPreferences(prev => ({
      ...savedPreferences,
      prefersReducedMotion: mediaQueries.reducedMotion.matches,
      prefersHighContrast: mediaQueries.highContrast.matches,
      prefersDarkMode: mediaQueries.darkMode.matches,
      touchDevice,
      screenReaderDetected
    }))

    // Listen for preference changes
    const handleMediaChange = () => {
      setPreferences(prev => ({
        ...prev,
        prefersReducedMotion: mediaQueries.reducedMotion.matches,
        prefersHighContrast: mediaQueries.highContrast.matches,
        prefersDarkMode: mediaQueries.darkMode.matches
      }))
    }

    mediaQueries.reducedMotion.addEventListener('change', handleMediaChange)
    mediaQueries.highContrast.addEventListener('change', handleMediaChange)
    mediaQueries.darkMode.addEventListener('change', handleMediaChange)

    return () => {
      mediaQueries.reducedMotion.removeEventListener('change', handleMediaChange)
      mediaQueries.highContrast.removeEventListener('change', handleMediaChange)
      mediaQueries.darkMode.removeEventListener('change', handleMediaChange)
    }
  }, [persistPreferences, storageKey])

  // CONTEXT7 SOURCE: /w3c/wcag - Preference update handler with persistence
  const updatePreference = useCallback(<K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value }
      
      // Persist to localStorage
      if (persistPreferences && typeof window !== 'undefined') {
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated))
        } catch (error) {
          console.warn('Failed to save accessibility preferences:', error)
        }
      }

      // Announce changes if enabled
      if (announceChanges && updated.announceChanges) {
        const announcement = `Accessibility preference updated: ${key} is now ${value}`
        announceToScreenReader(announcement)
      }

      return updated
    })
  }, [persistPreferences, storageKey, announceChanges])

  // CONTEXT7 SOURCE: /w3c/wcag - Reset preferences to defaults
  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES)
    if (persistPreferences && typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey)
      } catch (error) {
        console.warn('Failed to reset accessibility preferences:', error)
      }
    }
  }, [persistPreferences, storageKey])

  // CONTEXT7 SOURCE: /w3c/wcag - Motion-safe animation variants generator
  const getMotionSafeVariants = useCallback((normalVariants: any) => {
    if (!preferences.respectMotionPreferences || !preferences.prefersReducedMotion) {
      return normalVariants
    }

    // Create reduced motion variants
    const reduceMotion = (variants: any): any => {
      if (Array.isArray(variants)) {
        return variants.map(reduceMotion)
      }
      
      if (typeof variants === 'object' && variants !== null) {
        const reduced = { ...variants }
        
        // Remove or reduce animations
        if ('transition' in reduced) {
          reduced.transition = { duration: 0.01 }
        }
        if ('animate' in reduced) {
          delete reduced.animate
        }
        if ('scale' in reduced && Array.isArray(reduced.scale)) {
          reduced.scale = [1, 1, 1]
        }
        if ('rotate' in reduced && Array.isArray(reduced.rotate)) {
          reduced.rotate = [0, 0, 0]
        }
        if ('x' in reduced || 'y' in reduced) {
          reduced.x = 0
          reduced.y = 0
        }

        // Recursively process nested objects
        Object.keys(reduced).forEach(key => {
          if (typeof reduced[key] === 'object' && reduced[key] !== null) {
            reduced[key] = reduceMotion(reduced[key])
          }
        })

        return reduced
      }
      
      return variants
    }

    return reduceMotion(normalVariants)
  }, [preferences.respectMotionPreferences, preferences.prefersReducedMotion])

  // CONTEXT7 SOURCE: /w3c/wcag - Screen reader announcement utility
  const announceToScreenReader = useCallback((message: string) => {
    if (typeof window === 'undefined' || !preferences.announceChanges) return

    // Create temporary live region for announcements
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.textContent = message

    document.body.appendChild(liveRegion)

    // Remove after announcement
    setTimeout(() => {
      if (liveRegion.parentNode) {
        liveRegion.parentNode.removeChild(liveRegion)
      }
    }, 1000)
  }, [preferences.announceChanges])

  // CONTEXT7 SOURCE: /w3c/wcag - Color contrast checker for WCAG compliance
  const checkColorContrast = useCallback((foreground: string, background: string) => {
    const ratio = calculateColorContrast(foreground, background)
    
    return {
      ratio: Math.round(ratio * 100) / 100,
      wcagAA: ratio >= 4.5,
      wcagAAA: ratio >= 7.0
    }
  }, [])

  return {
    preferences,
    updatePreference,
    resetPreferences,
    getMotionSafeVariants,
    announceToScreenReader,
    checkColorContrast
  }
}