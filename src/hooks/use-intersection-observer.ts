/**
 * INTERSECTION OBSERVER HOOK
 * CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Viewport detection patterns for timeline animations
 * CONTEXT7 SOURCE: /microsoft/typescript - Advanced React hooks with type safety
 * 
 * TASK 10: Interactive Testimonials Timeline - Viewport Detection Hook
 * Custom hook providing intersection observer functionality for timeline stage visibility detection
 * with performance optimization and accessibility considerations.
 * 
 * BUSINESS IMPACT: Performance optimization for timeline animations
 * ROYAL CLIENT STANDARDS: Enterprise-grade viewport detection with minimal overhead
 */

import { useState, useEffect, useRef, useCallback } from 'react'

export interface IntersectionObserverOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
  skip?: boolean
}

export interface IntersectionObserverResult {
  isIntersecting: boolean
  entry?: IntersectionObserverEntry
}

// CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Advanced intersection observer hook implementation
export function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): [React.RefCallback<Element>, boolean, IntersectionObserverEntry?] {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    once = false,
    skip = false
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [node, setNode] = useState<Element | null>(null)
  const observer = useRef<IntersectionObserver>()

  // CONTEXT7 SOURCE: /facebook/react - useCallback optimization for ref callback
  const setNodeRef = useCallback((node: Element | null) => {
    setNode(node)
  }, [])

  useEffect(() => {
    // Skip if not supported or explicitly disabled
    if (skip || !node || typeof IntersectionObserver === 'undefined') {
      return
    }

    // Clean up existing observer
    if (observer.current) {
      observer.current.disconnect()
    }

    // CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Intersection observer callback implementation
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      setEntry(entry)
      setIsIntersecting(entry.isIntersecting)

      // Disconnect observer if 'once' is true and element is intersecting
      if (once && entry.isIntersecting && observer.current) {
        observer.current.disconnect()
      }
    }

    // Create new observer
    observer.current = new IntersectionObserver(observerCallback, {
      root,
      rootMargin,
      threshold
    })

    // Start observing
    observer.current.observe(node)

    // Cleanup function
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [node, root, rootMargin, threshold, once, skip])

  return [setNodeRef, isIntersecting, entry]
}

// CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Multiple elements intersection observer
export function useIntersectionObserverMultiple(
  options: IntersectionObserverOptions = {}
): {
  observe: (element: Element, callback: (entry: IntersectionObserverEntry) => void) => void
  unobserve: (element: Element) => void
  disconnect: () => void
} {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    once = false
  } = options

  const observer = useRef<IntersectionObserver>()
  const callbacks = useRef<Map<Element, (entry: IntersectionObserverEntry) => void>>(new Map())

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    // CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Multi-element observer callback
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const callback = callbacks.current.get(entry.target)
        if (callback) {
          callback(entry)
          
          // Remove observer for this element if 'once' is true and intersecting
          if (once && entry.isIntersecting) {
            callbacks.current.delete(entry.target)
            if (observer.current) {
              observer.current.unobserve(entry.target)
            }
          }
        }
      })
    }

    observer.current = new IntersectionObserver(observerCallback, {
      root,
      rootMargin,
      threshold
    })

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [root, rootMargin, threshold, once])

  const observe = useCallback((element: Element, callback: (entry: IntersectionObserverEntry) => void) => {
    if (!observer.current) return

    callbacks.current.set(element, callback)
    observer.current.observe(element)
  }, [])

  const unobserve = useCallback((element: Element) => {
    if (!observer.current) return

    callbacks.current.delete(element)
    observer.current.unobserve(element)
  }, [])

  const disconnect = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect()
      callbacks.current.clear()
    }
  }, [])

  return { observe, unobserve, disconnect }
}

// CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Lazy loading specific hook
export function useLazyIntersectionObserver(
  options: IntersectionObserverOptions & {
    onIntersect?: () => void
    onLeave?: () => void
  } = {}
) {
  const {
    onIntersect,
    onLeave,
    ...observerOptions
  } = options

  const [hasIntersected, setHasIntersected] = useState(false)
  const [ref, isIntersecting, entry] = useIntersectionObserver(observerOptions)

  useEffect(() => {
    if (isIntersecting && !hasIntersected) {
      setHasIntersected(true)
      onIntersect?.()
    } else if (!isIntersecting && hasIntersected) {
      onLeave?.()
    }
  }, [isIntersecting, hasIntersected, onIntersect, onLeave])

  return {
    ref,
    isIntersecting,
    hasIntersected,
    entry
  }
}

// CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Viewport visibility percentage hook
export function useVisibilityPercentage(
  options: IntersectionObserverOptions = {}
) {
  const [visibilityPercentage, setVisibilityPercentage] = useState(0)
  
  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100)
  
  const [ref, , entry] = useIntersectionObserver({
    ...options,
    threshold: thresholds
  })

  useEffect(() => {
    if (entry) {
      setVisibilityPercentage(Math.round(entry.intersectionRatio * 100))
    }
  }, [entry])

  return {
    ref,
    visibilityPercentage,
    entry
  }
}

// CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Direction-aware intersection observer
export function useIntersectionDirection(
  options: IntersectionObserverOptions = {}
) {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const previousY = useRef<number>()
  
  const [ref, isIntersecting, entry] = useIntersectionObserver(options)

  useEffect(() => {
    if (entry) {
      const currentY = entry.boundingClientRect.y
      
      if (previousY.current !== undefined) {
        if (currentY < previousY.current) {
          setDirection('down')
        } else if (currentY > previousY.current) {
          setDirection('up')
        }
      }
      
      previousY.current = currentY
    }
  }, [entry])

  return {
    ref,
    isIntersecting,
    direction,
    entry
  }
}