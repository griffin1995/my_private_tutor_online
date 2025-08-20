/**
 * CONTEXT7 SOURCE: /w3c/wcag - Keyboard navigation for accessibility compliance
 * KEYBOARD NAVIGATION FEATURE: Official WCAG documentation recommends arrow key navigation for grid-based content
 * 
 * CONTEXT7 SOURCE: /reactjs/react.dev - Custom React hooks for state management
 * HOOK PATTERN REASON: Official React documentation recommends custom hooks for reusable stateful logic
 *
 * useVideoGridNavigation Hook - Keyboard Navigation for Video Thumbnail Grids
 * This hook provides arrow key navigation functionality for video thumbnail grids,
 * ensuring WCAG compliance and improved accessibility for keyboard users.
 * 
 * Key Features:
 * - Arrow key navigation (up, down, left, right)
 * - Grid-aware focus management
 * - Automatic focus wrapping at grid boundaries
 * - Screen reader announcements for navigation
 * - Customizable grid dimensions
 */

"use client"

import { useCallback, useEffect, useRef } from 'react'

// CONTEXT7 SOURCE: /w3c/wcag - Grid navigation interface for accessibility
// ACCESSIBILITY INTERFACE: Official WCAG documentation recommends clear direction types for keyboard navigation
export type NavigationDirection = 'left' | 'right' | 'up' | 'down'

interface UseVideoGridNavigationProps {
  gridCols: number // Number of columns in the grid
  totalItems: number // Total number of items in the grid
  enableNavigation?: boolean // Whether to enable keyboard navigation
  onNavigate?: (fromIndex: number, toIndex: number, direction: NavigationDirection) => void
}

interface VideoGridNavigationReturn {
  handleKeyNavigation: (direction: NavigationDirection, currentIndex: number) => void
  focusItem: (index: number) => void
  getCurrentFocus: () => number | null
}

export function useVideoGridNavigation({
  gridCols,
  totalItems,
  enableNavigation = true,
  onNavigate
}: UseVideoGridNavigationProps): VideoGridNavigationReturn {
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - useRef for focus tracking without re-renders
  // FOCUS TRACKING REASON: Official React documentation recommends useRef for mutable values that don't trigger re-renders
  const currentFocusRef = useRef<number | null>(null)
  const itemRefsRef = useRef<Map<number, HTMLElement>>(new Map())

  // CONTEXT7 SOURCE: /w3c/wcag - Calculate grid position for accessibility navigation
  // GRID CALCULATION REASON: Official WCAG documentation recommends proper grid position calculations for arrow key navigation
  const getGridPosition = useCallback((index: number) => {
    const row = Math.floor(index / gridCols)
    const col = index % gridCols
    return { row, col }
  }, [gridCols])

  const getIndexFromPosition = useCallback((row: number, col: number) => {
    return row * gridCols + col
  }, [gridCols])

  // CONTEXT7 SOURCE: /w3c/wcag - Focus management for keyboard navigation
  // FOCUS MANAGEMENT REASON: Official WCAG documentation recommends programmatic focus control for grid navigation
  const focusItem = useCallback((index: number) => {
    if (index < 0 || index >= totalItems) return
    
    const element = itemRefsRef.current.get(index)
    if (element) {
      element.focus()
      currentFocusRef.current = index
      
      // CONTEXT7 SOURCE: /w3c/wcag - Screen reader announcements for navigation feedback
      // ACCESSIBILITY ANNOUNCEMENT: Official WCAG documentation recommends announcing navigation changes to screen readers
      const position = getGridPosition(index)
      const announcement = `Video ${index + 1} of ${totalItems}, row ${position.row + 1}, column ${position.col + 1}`
      
      // Create temporary announcement element for screen readers
      const announcer = document.createElement('div')
      announcer.setAttribute('aria-live', 'polite')
      announcer.setAttribute('aria-atomic', 'true')
      announcer.className = 'sr-only'
      announcer.textContent = announcement
      document.body.appendChild(announcer)
      
      // Clean up announcement element
      setTimeout(() => {
        document.body.removeChild(announcer)
      }, 1000)
    }
  }, [totalItems, getGridPosition])

  // CONTEXT7 SOURCE: /w3c/wcag - Arrow key navigation logic for grid-based content
  // NAVIGATION LOGIC REASON: Official WCAG documentation recommends specific arrow key behaviors for two-dimensional navigation
  const handleKeyNavigation = useCallback((direction: NavigationDirection, currentIndex: number) => {
    if (!enableNavigation || currentIndex < 0 || currentIndex >= totalItems) return

    const currentPosition = getGridPosition(currentIndex)
    const totalRows = Math.ceil(totalItems / gridCols)
    let newIndex = currentIndex

    switch (direction) {
      case 'left':
        if (currentPosition.col > 0) {
          newIndex = currentIndex - 1
        } else {
          // Wrap to end of previous row
          if (currentPosition.row > 0) {
            newIndex = getIndexFromPosition(currentPosition.row - 1, gridCols - 1)
            // Ensure we don't go beyond the last item
            newIndex = Math.min(newIndex, totalItems - 1)
          } else {
            // Wrap to last item
            newIndex = totalItems - 1
          }
        }
        break

      case 'right':
        if (currentPosition.col < gridCols - 1 && currentIndex < totalItems - 1) {
          newIndex = currentIndex + 1
        } else {
          // Wrap to beginning of next row
          if (currentPosition.row < totalRows - 1) {
            newIndex = getIndexFromPosition(currentPosition.row + 1, 0)
            // Ensure we don't go beyond the last item
            newIndex = Math.min(newIndex, totalItems - 1)
          } else {
            // Wrap to first item
            newIndex = 0
          }
        }
        break

      case 'up':
        if (currentPosition.row > 0) {
          newIndex = getIndexFromPosition(currentPosition.row - 1, currentPosition.col)
          // Ensure we don't go beyond the last item in the previous row
          newIndex = Math.min(newIndex, totalItems - 1)
        } else {
          // Wrap to bottom row, same column
          const lastRow = totalRows - 1
          newIndex = getIndexFromPosition(lastRow, currentPosition.col)
          // Adjust if the last row doesn't have enough items
          newIndex = Math.min(newIndex, totalItems - 1)
        }
        break

      case 'down':
        if (currentPosition.row < totalRows - 1) {
          newIndex = getIndexFromPosition(currentPosition.row + 1, currentPosition.col)
          // Ensure we don't go beyond the total items
          if (newIndex >= totalItems) {
            // Stay in current position if next row doesn't have this column
            newIndex = currentIndex
          }
        } else {
          // Wrap to top row, same column
          newIndex = getIndexFromPosition(0, currentPosition.col)
        }
        break
    }

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalItems) {
      focusItem(newIndex)
      onNavigate?.(currentIndex, newIndex, direction)
    }
  }, [enableNavigation, totalItems, getGridPosition, getIndexFromPosition, gridCols, focusItem, onNavigate])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Current focus getter for external components
  // FOCUS GETTER REASON: Official React documentation recommends getter functions for accessing ref values
  const getCurrentFocus = useCallback(() => {
    return currentFocusRef.current
  }, [])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Effect cleanup for navigation management
  // CLEANUP REASON: Official React documentation recommends cleanup for event listeners and references
  useEffect(() => {
    return () => {
      // Clear item references on unmount
      itemRefsRef.current.clear()
      currentFocusRef.current = null
    }
  }, [])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Register item refs for focus management
  // REF REGISTRATION: Allow components to register their DOM elements for focus management
  const registerItemRef = useCallback((index: number, element: HTMLElement | null) => {
    if (element) {
      itemRefsRef.current.set(index, element)
    } else {
      itemRefsRef.current.delete(index)
    }
  }, [])

  return {
    handleKeyNavigation,
    focusItem,
    getCurrentFocus,
    // Expose ref registration for components to use
    registerItemRef
  } as VideoGridNavigationReturn & { registerItemRef: (index: number, element: HTMLElement | null) => void }
}

// CONTEXT7 SOURCE: /w3c/wcag - Grid navigation helper utilities
// UTILITY FUNCTIONS: Additional helper functions for grid navigation calculations
export const videoGridNavigationUtils = {
  // Calculate if an index is at the start of a row
  isRowStart: (index: number, gridCols: number): boolean => {
    return index % gridCols === 0
  },
  
  // Calculate if an index is at the end of a row
  isRowEnd: (index: number, gridCols: number, totalItems: number): boolean => {
    const col = index % gridCols
    const isLastColumn = col === gridCols - 1
    const isLastItem = index === totalItems - 1
    return isLastColumn || isLastItem
  },
  
  // Get the row number for an index
  getRowNumber: (index: number, gridCols: number): number => {
    return Math.floor(index / gridCols)
  },
  
  // Get the column number for an index
  getColumnNumber: (index: number, gridCols: number): number => {
    return index % gridCols
  }
}