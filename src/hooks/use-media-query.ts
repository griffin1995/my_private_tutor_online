/**
 * MEDIA QUERY HOOK
 * CONTEXT7 SOURCE: /facebook/react - Advanced React hooks for responsive design
 * CONTEXT7 SOURCE: /microsoft/typescript - Type-safe media query management
 * 
 * TASK 10: Interactive Testimonials Timeline - Responsive Design Hook
 * Custom hook for media query detection with SSR safety and performance optimization.
 * 
 * BUSINESS IMPACT: Optimized responsive experience for timeline components
 * ROYAL CLIENT STANDARDS: Enterprise-grade responsive design detection
 */

import { useState, useEffect } from 'react'

/**
 * CONTEXT7 SOURCE: /facebook/react - Media query detection hook with SSR safety
 * Hook for detecting media query matches with proper hydration handling
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Return early if not in browser environment
    if (typeof window === 'undefined') {
      return
    }

    const mediaQueryList = window.matchMedia(query)
    const handleChange = () => setMatches(mediaQueryList.matches)

    // Set initial value
    setMatches(mediaQueryList.matches)

    // Listen for changes
    mediaQueryList.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQueryList.removeEventListener('change', handleChange)
    }
  }, [query])

  // Return false during SSR and initial client-side render to prevent hydration mismatch
  if (!mounted) {
    return false
  }

  return matches
}

/**
 * CONTEXT7 SOURCE: /facebook/react - Breakpoint-specific media query hooks
 * Predefined breakpoint hooks for common responsive design patterns
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}

export function useIsLargeDesktop(): boolean {
  return useMediaQuery('(min-width: 1280px)')
}

/**
 * CONTEXT7 SOURCE: /facebook/react - Accessibility-aware media query detection
 * Hook for detecting user accessibility preferences
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function usePrefersColorSchemeDark(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

export function usePrefersHighContrast(): boolean {
  return useMediaQuery('(prefers-contrast: high)')
}

/**
 * CONTEXT7 SOURCE: /facebook/react - Device-specific media query detection
 * Hooks for detecting specific device characteristics
 */
export function useIsLandscape(): boolean {
  return useMediaQuery('(orientation: landscape)')
}

export function useIsPortrait(): boolean {
  return useMediaQuery('(orientation: portrait)')
}

export function useCanHover(): boolean {
  return useMediaQuery('(hover: hover)')
}

export function useHasCoarsePointer(): boolean {
  return useMediaQuery('(pointer: coarse)')
}

/**
 * CONTEXT7 SOURCE: /facebook/react - Viewport size detection hook
 * Hook for getting current viewport dimensions with resize handling
 */
export function useViewportSize(): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial size
    handleResize()

    // Listen for resize events
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}

/**
 * CONTEXT7 SOURCE: /facebook/react - Responsive breakpoint hook with custom breakpoints
 * Hook for detecting multiple breakpoints with custom configuration
 */
export interface BreakpointConfig {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

export function useBreakpoint(config: BreakpointConfig = {}) {
  const defaultConfig: Required<BreakpointConfig> = {
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    ...config
  }

  const { width } = useViewportSize()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return {
      current: 'xs' as keyof BreakpointConfig,
      isXs: false,
      isSm: false,
      isMd: false,
      isLg: false,
      isXl: false,
      is2xl: false,
      isAbove: () => false,
      isBelow: () => false
    }
  }

  const getCurrentBreakpoint = (): keyof BreakpointConfig => {
    if (width >= defaultConfig['2xl']) return '2xl'
    if (width >= defaultConfig.xl) return 'xl'
    if (width >= defaultConfig.lg) return 'lg'
    if (width >= defaultConfig.md) return 'md'
    if (width >= defaultConfig.sm) return 'sm'
    return 'xs'
  }

  const current = getCurrentBreakpoint()

  return {
    current,
    isXs: current === 'xs',
    isSm: current === 'sm',
    isMd: current === 'md',
    isLg: current === 'lg',
    isXl: current === 'xl',
    is2xl: current === '2xl',
    isAbove: (breakpoint: keyof BreakpointConfig) => {
      return width >= defaultConfig[breakpoint]
    },
    isBelow: (breakpoint: keyof BreakpointConfig) => {
      return width < defaultConfig[breakpoint]
    }
  }
}