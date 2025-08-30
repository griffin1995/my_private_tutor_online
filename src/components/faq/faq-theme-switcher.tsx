/**
 * CONTEXT7 SOURCE: /kajabi/pine - Theme switcher component with preview thumbnails and accessibility support
 * THEME SWITCHING: Official Pine design system patterns for theme selection with visual previews
 * IMPLEMENTATION REASON: Elegant theme switcher with preview thumbnails for user experience enhancement
 * 
 * FAQ Theme Switcher Component - Final Phase 3 Task
 * Features comprehensive theme switching with:
 * - Preview thumbnails for each theme variant
 * - System preference detection and integration
 * - Smooth transitions with animation coordination
 * - Accessibility compliance with keyboard navigation
 * - localStorage persistence for user preferences
 * 
 * CONTEXT7 SOURCE: /context7/tailwindcss - Theme switcher patterns with system preference integration
 * USER EXPERIENCE: Professional theme selection interface with visual feedback
 */

"use client"

import React from 'react'
import { m, AnimatePresence } from 'framer-motion'

// CONTEXT7 SOURCE: /kajabi/pine - Theme configuration types and interfaces
// TYPE DEFINITIONS: Comprehensive theme system types for type safety
export interface FAQTheme {
  id: string
  name: string
  description: string
  preview: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
  accessibility?: {
    contrastRatio: number
    wcagLevel: 'A' | 'AA' | 'AAA'
  }
  seasonal?: boolean
  icon?: string
}

export interface FAQThemeSwitcherProps {
  /** Current active theme */
  currentTheme: string
  /** Callback when theme changes */
  onThemeChange: (themeId: string) => void
  /** Show system preference option */
  showSystemOption?: boolean
  /** Show seasonal themes */
  showSeasonalThemes?: boolean
  /** Compact mode for mobile */
  compact?: boolean
  /** Position of the switcher */
  position?: 'top' | 'bottom' | 'sidebar'
  /** Custom CSS classes */
  className?: string
  /** Accessibility label */
  ariaLabel?: string
}

// CONTEXT7 SOURCE: /kajabi/pine - Theme configuration data structure
// THEME DEFINITIONS: Comprehensive theme system configuration with visual previews
const FAQ_THEMES: FAQTheme[] = [
  {
    id: 'light',
    name: 'Royal Light',
    description: 'Professional navy and gold theme with premium appearance',
    preview: {
      primary: '#0f172a',
      secondary: '#334155',
      accent: '#eab308',
      background: '#ffffff'
    },
    accessibility: {
      contrastRatio: 4.5,
      wcagLevel: 'AA'
    },
    icon: '☀️'
  },
  {
    id: 'dark',
    name: 'Royal Dark',
    description: 'Sophisticated dark mode with reduced eye strain',
    preview: {
      primary: '#f1f5f9',
      secondary: '#e2e8f0',
      accent: '#facc15',
      background: '#020617'
    },
    accessibility: {
      contrastRatio: 4.5,
      wcagLevel: 'AA'
    },
    icon: '🌙'
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'Maximum contrast for visual accessibility',
    preview: {
      primary: '#000000',
      secondary: '#333333',
      accent: '#ffff00',
      background: '#ffffff'
    },
    accessibility: {
      contrastRatio: 7.0,
      wcagLevel: 'AAA'
    },
    icon: '🔍'
  },
  {
    id: 'christmas',
    name: 'Christmas',
    description: 'Festive holiday theme with red and green colours',
    preview: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#dc2626',
      background: '#ffffff'
    },
    seasonal: true,
    icon: '🎄'
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Professional blue theme for educational contexts',
    preview: {
      primary: '#0c4a6e',
      secondary: '#075985',
      accent: '#ea580c',
      background: '#fefce8'
    },
    seasonal: true,
    icon: '📚'
  }
]

/**
 * FAQ Theme Switcher Component
 * CONTEXT7 SOURCE: /kajabi/pine - Theme switcher implementation with preview thumbnails
 */
export function FAQThemeSwitcher({
  currentTheme,
  onThemeChange,
  showSystemOption = true,
  showSeasonalThemes = false,
  compact = false,
  position = 'top',
  className = '',
  ariaLabel = 'Switch FAQ theme'
}: FAQThemeSwitcherProps) {
  // CONTEXT7 SOURCE: /facebook/react - Component state management for theme switcher UI
  // STATE MANAGEMENT: Track switcher visibility and system preferences
  const [isOpen, setIsOpen] = React.useState(false)
  const [systemPreference, setSystemPreference] = React.useState<'light' | 'dark'>('light')
  const [isSystemTheme, setIsSystemTheme] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // CONTEXT7 SOURCE: /context7/tailwindcss - System preference detection with media query
  // SYSTEM PREFERENCE: Detect user's OS theme preference automatically
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? 'dark' : 'light')
    }
    
    setSystemPreference(mediaQuery.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handleChange)
    
    // Check if current theme is system preference
    const storedTheme = localStorage.getItem('faq-theme-preference')
    setIsSystemTheme(!storedTheme || storedTheme === 'system')
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // CONTEXT7 SOURCE: /facebook/react - Click outside handler for dropdown closure
  // DROPDOWN INTERACTION: Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // CONTEXT7 SOURCE: /facebook/react - Keyboard navigation handler for accessibility
  // KEYBOARD NAVIGATION: Support keyboard interaction for accessibility
  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen(!isOpen)
    }
  }, [isOpen])

  // CONTEXT7 SOURCE: /kajabi/pine - Theme change handler with persistence
  // THEME CHANGE: Handle theme selection with localStorage persistence
  const handleThemeSelect = React.useCallback((themeId: string) => {
    if (themeId === 'system') {
      setIsSystemTheme(true)
      localStorage.removeItem('faq-theme-preference')
      onThemeChange(systemPreference)
    } else {
      setIsSystemTheme(false)
      localStorage.setItem('faq-theme-preference', themeId)
      onThemeChange(themeId)
    }
    setIsOpen(false)
  }, [onThemeChange, systemPreference])

  // CONTEXT7 SOURCE: /kajabi/pine - Filter themes based on configuration
  // THEME FILTERING: Show/hide themes based on component props
  const availableThemes = React.useMemo(() => {
    const themes = FAQ_THEMES.filter(theme => !theme.seasonal || showSeasonalThemes)
    return themes
  }, [showSeasonalThemes])

  // CONTEXT7 SOURCE: /kajabi/pine - Get current theme display information
  // CURRENT THEME: Determine current theme for display
  const currentThemeData = React.useMemo(() => {
    if (isSystemTheme) {
      return {
        id: 'system',
        name: 'System',
        description: `Follows system preference (${systemPreference})`,
        preview: FAQ_THEMES.find(t => t.id === systemPreference)?.preview || FAQ_THEMES[0].preview,
        icon: '⚙️'
      }
    }
    return FAQ_THEMES.find(theme => theme.id === currentTheme) || FAQ_THEMES[0]
  }, [currentTheme, isSystemTheme, systemPreference])

  // CONTEXT7 SOURCE: /context7/motion_dev - Animation variants for smooth dropdown transitions
  // ANIMATION VARIANTS: Smooth dropdown animations with spring physics
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: position === 'top' ? -10 : 10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.175, 0.885, 0.32, 1.275]
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  }

  if (compact) {
    // CONTEXT7 SOURCE: /kajabi/pine - Compact theme switcher for mobile devices
    // COMPACT MODE: Simplified theme switcher for mobile viewports
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <m.button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className="flex items-center justify-center w-10 h-10 bg-white/90 hover:bg-white border border-slate-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
        >
          <span className="text-lg" role="img" aria-label={currentThemeData.name}>
            {currentThemeData.icon}
          </span>
        </m.button>

        <AnimatePresence>
          {isOpen && (
            <m.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 w-56 bg-white/95 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-xl z-50`}
            >
              <div className="p-3 space-y-1">
                {showSystemOption && (
                  <m.button
                    custom={0}
                    variants={itemVariants}
                    onClick={() => handleThemeSelect('system')}
                    className={`w-full flex items-center space-x-3 p-2 rounded-xl text-left hover:bg-slate-50 transition-colors duration-200 ${
                      isSystemTheme ? 'bg-accent-50 border border-accent-200' : ''
                    }`}
                  >
                    <span className="text-sm">⚙️</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900">System</div>
                      <div className="text-xs text-slate-500">Auto</div>
                    </div>
                  </m.button>
                )}
                
                {availableThemes.map((theme, index) => (
                  <m.button
                    key={theme.id}
                    custom={index + (showSystemOption ? 1 : 0)}
                    variants={itemVariants}
                    onClick={() => handleThemeSelect(theme.id)}
                    className={`w-full flex items-center space-x-3 p-2 rounded-xl text-left hover:bg-slate-50 transition-colors duration-200 ${
                      !isSystemTheme && currentTheme === theme.id ? 'bg-accent-50 border border-accent-200' : ''
                    }`}
                  >
                    <span className="text-sm">{theme.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900">{theme.name}</div>
                      {theme.accessibility && (
                        <div className="text-xs text-slate-500">
                          WCAG {theme.accessibility.wcagLevel}
                        </div>
                      )}
                    </div>
                  </m.button>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // CONTEXT7 SOURCE: /kajabi/pine - Full theme switcher with preview thumbnails
  // FULL MODE: Complete theme switcher with visual previews and detailed information
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <m.button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-3 px-4 py-3 bg-white/90 hover:bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
      >
        {/* Theme Preview */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm border border-slate-200"
               style={{ backgroundColor: currentThemeData.preview.background }}>
            <span role="img" aria-label={currentThemeData.name}>
              {currentThemeData.icon}
            </span>
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-slate-900">{currentThemeData.name}</div>
            <div className="text-xs text-slate-500">Theme</div>
          </div>
        </div>

        {/* Dropdown Arrow */}
        <m.svg
          className="w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </m.svg>
      </m.button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} ${position === 'sidebar' ? 'left-full ml-2' : 'right-0'} w-80 bg-white/95 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-xl z-50`}
          >
            <div className="p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Choose Theme</h3>
              
              <div className="space-y-2 mb-4">
                {showSystemOption && (
                  <m.button
                    custom={0}
                    variants={itemVariants}
                    onClick={() => handleThemeSelect('system')}
                    className={`w-full flex items-center space-x-4 p-3 rounded-xl text-left hover:bg-slate-50 transition-colors duration-200 ${
                      isSystemTheme ? 'bg-accent-50 border-2 border-accent-200 ring-1 ring-accent-200' : 'border-2 border-transparent'
                    }`}
                  >
                    {/* System Theme Preview */}
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-4 rounded-sm border border-slate-200"
                        style={{ backgroundColor: FAQ_THEMES.find(t => t.id === systemPreference)?.preview.background }}
                      />
                      <div 
                        className="w-4 h-4 rounded-sm border border-slate-200"
                        style={{ backgroundColor: FAQ_THEMES.find(t => t.id === systemPreference)?.preview.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-sm border border-slate-200"
                        style={{ backgroundColor: FAQ_THEMES.find(t => t.id === systemPreference)?.preview.accent }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">⚙️</span>
                        <span className="text-sm font-medium text-slate-900">System Preference</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Automatically follows your device settings ({systemPreference})
                      </div>
                    </div>
                    
                    {isSystemTheme && (
                      <div className="text-accent-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </m.button>
                )}

                {availableThemes.map((theme, index) => (
                  <m.button
                    key={theme.id}
                    custom={index + (showSystemOption ? 1 : 0)}
                    variants={itemVariants}
                    onClick={() => handleThemeSelect(theme.id)}
                    className={`w-full flex items-center space-x-4 p-3 rounded-xl text-left hover:bg-slate-50 transition-colors duration-200 ${
                      !isSystemTheme && currentTheme === theme.id ? 'bg-accent-50 border-2 border-accent-200 ring-1 ring-accent-200' : 'border-2 border-transparent'
                    }`}
                  >
                    {/* Theme Preview */}
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-4 rounded-sm border border-slate-200"
                        style={{ backgroundColor: theme.preview.background }}
                      />
                      <div 
                        className="w-4 h-4 rounded-sm border border-slate-200"
                        style={{ backgroundColor: theme.preview.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-sm border border-slate-200"
                        style={{ backgroundColor: theme.preview.accent }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span role="img" aria-label={theme.name}>{theme.icon}</span>
                        <span className="text-sm font-medium text-slate-900">{theme.name}</span>
                        {theme.seasonal && (
                          <span className="px-2 py-0.5 text-xs bg-accent-100 text-accent-700 rounded-full">
                            Seasonal
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{theme.description}</div>
                      {theme.accessibility && (
                        <div className="text-xs text-slate-400 mt-0.5">
                          WCAG {theme.accessibility.wcagLevel} • {theme.accessibility.contrastRatio}:1 contrast
                        </div>
                      )}
                    </div>
                    
                    {!isSystemTheme && currentTheme === theme.id && (
                      <div className="text-accent-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </m.button>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Themes automatically save your preference</span>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /kajabi/pine - Theme preview component for visual feedback
 * THEME PREVIEW: Mini preview component for theme visualization
 */
export function FAQThemePreview({ theme }: { theme: FAQTheme }) {
  return (
    <div className="w-16 h-10 border border-slate-200 rounded-md overflow-hidden shadow-sm">
      <div className="h-3" style={{ backgroundColor: theme.preview.background }}>
        <div className="h-1 w-full" style={{ backgroundColor: theme.preview.primary }} />
      </div>
      <div className="h-7 flex space-x-0.5 p-1" style={{ backgroundColor: theme.preview.background }}>
        <div className="flex-1 rounded-sm" style={{ backgroundColor: theme.preview.secondary, opacity: 0.8 }} />
        <div className="w-2 rounded-sm" style={{ backgroundColor: theme.preview.accent }} />
      </div>
    </div>
  )
}

export default FAQThemeSwitcher