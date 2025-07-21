"use client"

import { useEffect, useState, useCallback } from 'react'
import { 
  prefersReducedMotion, 
  prefersHighContrast,
  screenReader
} from '@/lib/accessibility'

// Custom hook for accessibility preferences and utilities
export function useAccessibility() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    // Set initial values
    setReducedMotion(prefersReducedMotion())
    setHighContrast(prefersHighContrast())

    // Listen for changes in user preferences
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)')

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches)
    }

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
    highContrastQuery.addEventListener('change', handleHighContrastChange)

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
      highContrastQuery.removeEventListener('change', handleHighContrastChange)
    }
  }, [])

  // Screen reader announcement function
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    screenReader.announce(message, priority)
  }, [])

  return {
    preferences: {
      reducedMotion,
      highContrast
    },
    announce
  }
}

// Custom hook for managing focus
export function useFocus() {
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null)

  const setFocus = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.focus()
      setFocusedElementId(elementId)
    }
  }, [])

  const clearFocus = useCallback(() => {
    setFocusedElementId(null)
  }, [])

  return {
    focusedElementId,
    setFocus,
    clearFocus
  }
}

// Custom hook for keyboard navigation
export function useKeyboardNavigation(
  items: string[],
  options: {
    wrap?: boolean
    orientation?: 'horizontal' | 'vertical' | 'both'
    onActivate?: (index: number) => void
  } = {}
) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { wrap = true, orientation = 'vertical', onActivate } = options

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault()
          newIndex = currentIndex > 0 ? currentIndex - 1 : wrap ? items.length - 1 : currentIndex
        }
        break

      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault()
          newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : wrap ? 0 : currentIndex
        }
        break

      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault()
          newIndex = currentIndex > 0 ? currentIndex - 1 : wrap ? items.length - 1 : currentIndex
        }
        break

      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault()
          newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : wrap ? 0 : currentIndex
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
        onActivate?.(currentIndex)
        return
    }

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
  }, [currentIndex, items.length, wrap, orientation, onActivate])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return {
    currentIndex,
    setCurrentIndex
  }
}

// Custom hook for managing ARIA attributes
export function useAriaAttributes(elementId: string) {
  const [attributes, setAttributes] = useState<Record<string, string | boolean | undefined>>({})

  const updateAttribute = useCallback((name: string, value: string | boolean | undefined) => {
    setAttributes(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const removeAttribute = useCallback((name: string) => {
    setAttributes(prev => {
      const newAttributes = { ...prev }
      delete newAttributes[name]
      return newAttributes
    })
  }, [])

  // Helper functions for common ARIA patterns
  const setExpanded = useCallback((expanded: boolean) => {
    updateAttribute('aria-expanded', expanded)
  }, [updateAttribute])

  const setPressed = useCallback((pressed: boolean) => {
    updateAttribute('aria-pressed', pressed)
  }, [updateAttribute])

  const setSelected = useCallback((selected: boolean) => {
    updateAttribute('aria-selected', selected)
  }, [updateAttribute])

  const setChecked = useCallback((checked: boolean) => {
    updateAttribute('aria-checked', checked)
  }, [updateAttribute])

  const setDescribedBy = useCallback((describedBy: string) => {
    updateAttribute('aria-describedby', describedBy)
  }, [updateAttribute])

  const setLabelledBy = useCallback((labelledBy: string) => {
    updateAttribute('aria-labelledby', labelledBy)
  }, [updateAttribute])

  const setLabel = useCallback((label: string) => {
    updateAttribute('aria-label', label)
  }, [updateAttribute])

  return {
    attributes,
    updateAttribute,
    removeAttribute,
    setExpanded,
    setPressed,
    setSelected,
    setChecked,
    setDescribedBy,
    setLabelledBy,
    setLabel
  }
}