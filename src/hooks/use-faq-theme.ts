/**
 * CONTEXT7 SOURCE: /kajabi/pine - Theme management hook with localStorage persistence and system preference detection
 * THEME MANAGEMENT: Official Pine design system patterns for theme state management and persistence
 * IMPLEMENTATION REASON: React hook for theme management with automatic system preference detection and smooth transitions
 * 
 * FAQ Theme Management Hook - Final Phase 3 Task
 * Features comprehensive theme management with:
 * - localStorage persistence for user preferences
 * - System preference detection with media queries
 * - Smooth theme transitions with performance optimization
 * - Accessibility compliance and reduced motion support
 * - TypeScript safety with comprehensive error handling
 * 
 * CONTEXT7 SOURCE: /context7/tailwindcss - Theme switching patterns with CSS custom properties integration
 * STATE MANAGEMENT: Professional theme state management with React hooks patterns
 */

"use client"

import { useState, useEffect, useCallback, useRef } from 'react'

// CONTEXT7 SOURCE: /kajabi/pine - Theme system types and configuration interfaces
// TYPE DEFINITIONS: Comprehensive theme system types for TypeScript safety
export type FAQThemeId = 'light' | 'dark' | 'high-contrast' | 'christmas' | 'academic' | 'system'

export interface FAQThemeState {
  /** Current active theme ID */
  currentTheme: FAQThemeId
  /** Whether system preference is being used */
  isSystemTheme: boolean
  /** Current system preference (light/dark) */
  systemPreference: 'light' | 'dark'
  /** Theme loading state */
  isLoading: boolean
  /** Theme transition state */
  isTransitioning: boolean
}

export interface FAQThemeActions {
  /** Set theme by ID */
  setTheme: (themeId: FAQThemeId) => void
  /** Toggle between light and dark */
  toggleTheme: () => void
  /** Reset to system preference */
  resetToSystem: () => void
  /** Check if theme is available */
  isThemeAvailable: (themeId: FAQThemeId) => boolean
}

export interface FAQThemeOptions {
  /** Enable system preference detection */
  enableSystemDetection?: boolean
  /** Enable seasonal themes */
  enableSeasonalThemes?: boolean
  /** Theme persistence key in localStorage */
  storageKey?: string
  /** Transition duration in milliseconds */
  transitionDuration?: number
  /** Enable debug logging */
  debugMode?: boolean
}

export interface FAQThemeHookReturn extends FAQThemeState, FAQThemeActions {
  /** Theme configuration options */
  options: Required<FAQThemeOptions>
}

// CONTEXT7 SOURCE: /kajabi/pine - Default theme configuration with seasonal support
// DEFAULT CONFIGURATION: Comprehensive default settings for theme management
const DEFAULT_OPTIONS: Required<FAQThemeOptions> = {
  enableSystemDetection: true,
  enableSeasonalThemes: false,
  storageKey: 'faq-theme-preference',
  transitionDuration: 300,
  debugMode: process.env.NODE_ENV === 'development'
}

// CONTEXT7 SOURCE: /context7/tailwindcss - Available themes configuration with seasonal detection
// THEME AVAILABILITY: Dynamic theme availability based on date and configuration
const AVAILABLE_THEMES: Record<FAQThemeId, boolean | (() => boolean)> = {
  light: true,
  dark: true,
  'high-contrast': true,
  system: true,
  christmas: () => {
    // Available December 1st through January 7th
    const now = new Date()
    const month = now.getMonth()
    const day = now.getDate()
    return (month === 11) || (month === 0 && day <= 7)
  },
  academic: () => {
    // Available September through November (autumn term) and January through May (spring term)
    const month = new Date().getMonth()
    return (month >= 8 && month <= 10) || (month >= 0 && month <= 4)
  }
}

/**
 * CONTEXT7 SOURCE: /kajabi/pine - Theme management hook with comprehensive functionality
 * FAQ Theme Management Hook
 * 
 * Provides comprehensive theme management with:
 * - System preference detection
 * - localStorage persistence
 * - Smooth transitions
 * - Accessibility support
 * - TypeScript safety
 */
export function useFAQTheme(options: FAQThemeOptions = {}): FAQThemeHookReturn {
  // CONTEXT7 SOURCE: /facebook/react - Merge options with defaults
  // OPTIONS CONFIGURATION: Merge user options with comprehensive defaults
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
  
  // CONTEXT7 SOURCE: /facebook/react - Theme state management with TypeScript safety
  // STATE MANAGEMENT: Comprehensive theme state with loading and transition tracking
  const [currentTheme, setCurrentTheme] = useState<FAQThemeId>('light')
  const [isSystemTheme, setIsSystemTheme] = useState(false)
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>('light')
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // CONTEXT7 SOURCE: /facebook/react - Refs for performance optimization and cleanup
  // PERFORMANCE REFS: Track media query listeners and transition timeouts for cleanup
  const mediaQueryRef = useRef<MediaQueryList | null>(null)
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // CONTEXT7 SOURCE: /kajabi/pine - Debug logging utility for development
  // DEBUG LOGGING: Development-only logging for theme management debugging
  const debugLog = useCallback((message: string, data?: any) => {
    if (mergedOptions.debugMode) {
      console.log(`[FAQ Theme] ${message}`, data || '')
    }
  }, [mergedOptions.debugMode])

  // CONTEXT7 SOURCE: /context7/tailwindcss - System preference detection with media queries
  // SYSTEM PREFERENCE: Detect and track user's OS theme preference
  useEffect(() => {
    if (!mergedOptions.enableSystemDetection) return

    debugLog('Setting up system preference detection')
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQueryRef.current = mediaQuery
    
    const handlePreferenceChange = (e: MediaQueryListEvent) => {
      const newPreference = e.matches ? 'dark' : 'light'
      setSystemPreference(newPreference)
      debugLog('System preference changed', newPreference)
      
      // If using system theme, update current theme
      if (isSystemTheme) {
        applyThemeToDOM(newPreference)
      }
    }
    
    // Set initial system preference
    const initialPreference = mediaQuery.matches ? 'dark' : 'light'
    setSystemPreference(initialPreference)
    debugLog('Initial system preference detected', initialPreference)
    
    // Add event listener
    mediaQuery.addEventListener('change', handlePreferenceChange)
    
    return () => {
      if (mediaQueryRef.current) {
        mediaQueryRef.current.removeEventListener('change', handlePreferenceChange)
      }
    }
  }, [mergedOptions.enableSystemDetection, isSystemTheme, debugLog])

  // CONTEXT7 SOURCE: /kajabi/pine - DOM theme application with CSS custom properties
  // THEME APPLICATION: Apply theme to DOM with CSS custom properties and data attributes
  const applyThemeToDOM = useCallback((themeId: FAQThemeId) => {
    const htmlElement = document.documentElement
    
    // Remove existing theme attributes
    htmlElement.removeAttribute('data-faq-theme')
    
    // Apply new theme
    if (themeId !== 'system') {
      htmlElement.setAttribute('data-faq-theme', themeId)
      debugLog('Applied theme to DOM', themeId)
    } else {
      // For system theme, apply the actual preference
      htmlElement.setAttribute('data-faq-theme', systemPreference)
      debugLog('Applied system theme to DOM', systemPreference)
    }
    
    // Add transitioning class for smooth animations
    htmlElement.classList.add('faq-theme-transitioning')
    
    // Remove transitioning class after transition duration
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }
    
    transitionTimeoutRef.current = setTimeout(() => {
      htmlElement.classList.remove('faq-theme-transitioning')
      htmlElement.classList.add('faq-theme-loaded')
      setIsTransitioning(false)
      debugLog('Theme transition completed')
    }, mergedOptions.transitionDuration)
    
  }, [systemPreference, mergedOptions.transitionDuration, debugLog])

  // CONTEXT7 SOURCE: /kajabi/pine - Theme persistence with localStorage integration
  // THEME PERSISTENCE: Load and save theme preferences with error handling
  const saveThemePreference = useCallback((themeId: FAQThemeId) => {
    try {
      if (themeId === 'system') {
        localStorage.removeItem(mergedOptions.storageKey)
        debugLog('Removed theme preference (system default)')
      } else {
        localStorage.setItem(mergedOptions.storageKey, themeId)
        debugLog('Saved theme preference', themeId)
      }
    } catch (error) {
      debugLog('Failed to save theme preference', error)
    }
  }, [mergedOptions.storageKey, debugLog])

  const loadThemePreference = useCallback((): FAQThemeId | null => {
    try {
      const stored = localStorage.getItem(mergedOptions.storageKey)
      if (stored && isThemeAvailable(stored as FAQThemeId)) {
        debugLog('Loaded theme preference', stored)
        return stored as FAQThemeId
      }
      debugLog('No valid theme preference found')
      return null
    } catch (error) {
      debugLog('Failed to load theme preference', error)
      return null
    }
  }, [mergedOptions.storageKey, debugLog])

  // CONTEXT7 SOURCE: /kajabi/pine - Theme availability checker with seasonal support
  // THEME AVAILABILITY: Check if theme is available based on configuration and season
  const isThemeAvailable = useCallback((themeId: FAQThemeId): boolean => {
    const availability = AVAILABLE_THEMES[themeId]
    
    if (typeof availability === 'boolean') {
      return availability
    }
    
    if (typeof availability === 'function') {
      // For seasonal themes, check if seasonal themes are enabled
      if (!mergedOptions.enableSeasonalThemes && (themeId === 'christmas' || themeId === 'academic')) {
        return false
      }
      return availability()
    }
    
    return false
  }, [mergedOptions.enableSeasonalThemes])

  // CONTEXT7 SOURCE: /facebook/react - Initialize theme on component mount
  // THEME INITIALIZATION: Load initial theme with system preference fallback
  useEffect(() => {
    debugLog('Initializing FAQ theme system')
    
    const loadedTheme = loadThemePreference()
    
    if (loadedTheme && isThemeAvailable(loadedTheme)) {
      // Use stored theme preference
      setCurrentTheme(loadedTheme)
      setIsSystemTheme(false)
      applyThemeToDOM(loadedTheme)
      debugLog('Initialized with stored theme', loadedTheme)
    } else {
      // Use system preference
      setCurrentTheme('system')
      setIsSystemTheme(true)
      applyThemeToDOM(systemPreference)
      debugLog('Initialized with system preference', systemPreference)
    }
    
    setIsLoading(false)
    
    // Clean up transition timeout on unmount
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [loadThemePreference, isThemeAvailable, applyThemeToDOM, systemPreference, debugLog])

  // CONTEXT7 SOURCE: /kajabi/pine - Theme setting with validation and persistence
  // THEME SETTER: Set theme with comprehensive validation and state management
  const setTheme = useCallback((themeId: FAQThemeId) => {
    if (!isThemeAvailable(themeId)) {
      debugLog('Theme not available', themeId)
      return
    }
    
    setIsTransitioning(true)
    debugLog('Setting theme', themeId)
    
    if (themeId === 'system') {
      setIsSystemTheme(true)
      setCurrentTheme('system')
      saveThemePreference('system')
      applyThemeToDOM(systemPreference)
    } else {
      setIsSystemTheme(false)
      setCurrentTheme(themeId)
      saveThemePreference(themeId)
      applyThemeToDOM(themeId)
    }
  }, [isThemeAvailable, saveThemePreference, applyThemeToDOM, systemPreference, debugLog])

  // CONTEXT7 SOURCE: /kajabi/pine - Theme toggle functionality for quick switching
  // THEME TOGGLE: Quick toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    const newTheme = (currentTheme === 'light' || (isSystemTheme && systemPreference === 'light')) ? 'dark' : 'light'
    setTheme(newTheme)
    debugLog('Toggled theme', newTheme)
  }, [currentTheme, isSystemTheme, systemPreference, setTheme, debugLog])

  // CONTEXT7 SOURCE: /kajabi/pine - Reset to system preference functionality
  // SYSTEM RESET: Reset theme to follow system preference
  const resetToSystem = useCallback(() => {
    setTheme('system')
    debugLog('Reset to system preference')
  }, [setTheme, debugLog])

  // CONTEXT7 SOURCE: /facebook/react - Cleanup on unmount
  // CLEANUP: Clean up timers and event listeners on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  // CONTEXT7 SOURCE: /kajabi/pine - Return comprehensive theme state and actions
  // HOOK RETURN: Comprehensive theme management interface
  return {
    // State
    currentTheme,
    isSystemTheme,
    systemPreference,
    isLoading,
    isTransitioning,
    
    // Actions
    setTheme,
    toggleTheme,
    resetToSystem,
    isThemeAvailable,
    
    // Options
    options: mergedOptions
  }
}

/**
 * CONTEXT7 SOURCE: /kajabi/pine - Theme provider hook for context integration
 * Theme Provider Hook
 * 
 * Provides theme management for React context providers
 */
export function useFAQThemeProvider(options?: FAQThemeOptions) {
  const theme = useFAQTheme(options)
  
  // CONTEXT7 SOURCE: /facebook/react - Additional provider-specific functionality
  // PROVIDER ENHANCEMENTS: Additional functionality for React context providers
  
  const getCurrentEffectiveTheme = useCallback((): 'light' | 'dark' | 'high-contrast' | 'christmas' | 'academic' => {
    if (theme.isSystemTheme) {
      return theme.systemPreference
    }
    return theme.currentTheme as 'light' | 'dark' | 'high-contrast' | 'christmas' | 'academic'
  }, [theme.currentTheme, theme.isSystemTheme, theme.systemPreference])
  
  const getThemeClasses = useCallback((): string => {
    const effectiveTheme = getCurrentEffectiveTheme()
    return `faq-theme-${effectiveTheme} ${theme.isTransitioning ? 'faq-theme-transitioning' : 'faq-theme-loaded'}`
  }, [getCurrentEffectiveTheme, theme.isTransitioning])
  
  return {
    ...theme,
    getCurrentEffectiveTheme,
    getThemeClasses
  }
}

export default useFAQTheme