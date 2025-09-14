// CONTEXT7 SOURCE: /wcag/guidelines - Accessibility hooks for WCAG 2.1 AA compliance
// IMPLEMENTATION REASON: Official WCAG documentation demonstrates keyboard navigation and screen reader support patterns

"use client"

import { useEffect, useCallback, useRef, useState } from 'react';

interface AccessibilityConfig {
  enableSkipLinks?: boolean;
  enableFocusManagement?: boolean;
  enableAnnouncements?: boolean;
  enableKeyboardShortcuts?: boolean;
  announceDelay?: number;
}

interface AccessibilityState {
  isKeyboardUser: boolean;
  screenReaderActive: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  focusVisible: boolean;
}

/**
 * CONTEXT7 SOURCE: /wcag/guidelines - Custom hook for footer accessibility features
 * ACCESSIBILITY REASON: Official WCAG 2.1 AA guidelines require comprehensive keyboard and screen reader support
 */
export function useFooterAccessibility(config: AccessibilityConfig = {}) {
  const {
    enableSkipLinks = true,
    enableFocusManagement = true,
    enableAnnouncements = true,
    enableKeyboardShortcuts = true,
    announceDelay = 100
  } = config;

  const [accessibilityState, setAccessibilityState] = useState<AccessibilityState>({
    isKeyboardUser: false,
    screenReaderActive: false,
    reducedMotion: false,
    highContrast: false,
    focusVisible: false
  });

  const announcementRef = useRef<HTMLDivElement | null>(null);
  const skipLinkRef = useRef<HTMLAnchorElement | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  /**
   * CONTEXT7 SOURCE: /wcag/guidelines - Screen reader announcement functionality
   * ANNOUNCEMENT REASON: WCAG 2.1 4.1.3 requires status messages for dynamic content
   */
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!enableAnnouncements || !announcementRef.current) return;

    // Clear previous announcement
    announcementRef.current.textContent = '';
    
    // Set new announcement after delay to ensure screen readers detect change
    setTimeout(() => {
      if (announcementRef.current) {
        announcementRef.current.setAttribute('aria-live', priority);
        announcementRef.current.textContent = message;
        
        // Clear announcement after it's been read
        setTimeout(() => {
          if (announcementRef.current) {
            announcementRef.current.textContent = '';
          }
        }, 3000);
      }
    }, announceDelay);
  }, [enableAnnouncements, announceDelay]);

  /**
   * CONTEXT7 SOURCE: /wcag/guidelines - Keyboard navigation detection
   * KEYBOARD REASON: WCAG 2.1.1 requires all functionality available via keyboard
   */
  const detectKeyboardUser = useCallback(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setAccessibilityState(prev => ({ ...prev, isKeyboardUser: true }));
        window.removeEventListener('keydown', handleFirstTab);
      }
    };

    const handleMouseDown = () => {
      setAccessibilityState(prev => ({ ...prev, isKeyboardUser: false }));
    };

    window.addEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  /**
   * CONTEXT7 SOURCE: /wcag/guidelines - Skip navigation implementation
   * SKIP REASON: WCAG 2.4.1 requires bypass blocks for repetitive content
   */
  const setupSkipLinks = useCallback(() => {
    if (!enableSkipLinks) return;

    const handleSkipToFooter = (e: KeyboardEvent) => {
      // Ctrl/Cmd + F to skip to footer
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const footer = document.querySelector('footer[role="contentinfo"]');
        if (footer instanceof HTMLElement) {
          footer.tabIndex = -1;
          footer.focus();
          announce('Navigated to footer');
        }
      }
    };

    document.addEventListener('keydown', handleSkipToFooter);
    return () => document.removeEventListener('keydown', handleSkipToFooter);
  }, [enableSkipLinks, announce]);

  /**
   * CONTEXT7 SOURCE: /wcag/guidelines - Focus management for dynamic content
   * FOCUS REASON: WCAG 2.4.3 requires logical focus order
   */
  const manageFocus = useCallback((element: HTMLElement | null) => {
    if (!enableFocusManagement || !element) return;

    // Store last focused element
    lastFocusedElement.current = document.activeElement as HTMLElement;

    // Set focus to new element
    element.tabIndex = -1;
    element.focus();

    // Announce focus change for screen readers
    const label = element.getAttribute('aria-label') || element.textContent;
    if (label) {
      announce(`Focus moved to ${label}`);
    }
  }, [enableFocusManagement, announce]);

  /**
   * CONTEXT7 SOURCE: /wcag/guidelines - Restore focus after modal/overlay closes
   * RESTORE REASON: WCAG 2.4.3 requires focus to return to triggering element
   */
  const restoreFocus = useCallback(() => {
    if (lastFocusedElement.current && enableFocusManagement) {
      lastFocusedElement.current.focus();
      announce('Focus restored');
    }
  }, [enableFocusManagement, announce]);

  /**
   * CONTEXT7 SOURCE: /wcag/guidelines - Detect user preferences
   * PREFERENCES REASON: WCAG 2.3.3 animation from interactions guideline
   */
  const detectUserPreferences = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setAccessibilityState(prev => ({ 
      ...prev, 
      reducedMotion: prefersReducedMotion.matches 
    }));

    // Detect high contrast mode
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    setAccessibilityState(prev => ({ 
      ...prev, 
      highContrast: prefersHighContrast.matches 
    }));

    // Listen for preference changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setAccessibilityState(prev => ({ ...prev, reducedMotion: e.matches }));
    };

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setAccessibilityState(prev => ({ ...prev, highContrast: e.matches }));
    };

    prefersReducedMotion.addEventListener('change', handleMotionChange);
    prefersHighContrast.addEventListener('change', handleContrastChange);

    return () => {
      prefersReducedMotion.removeEventListener('change', handleMotionChange);
      prefersHighContrast.removeEventListener('change', handleContrastChange);
    };
  }, []);

  /**
   * CONTEXT7 SOURCE: /wcag/guidelines - Keyboard shortcut implementation
   * SHORTCUTS REASON: WCAG 2.1.4 character key shortcuts guideline
   */
  const setupKeyboardShortcuts = useCallback(() => {
    if (!enableKeyboardShortcuts) return;

    const shortcuts: Record<string, () => void> = {
      'Escape': () => {
        // Escape from footer to main content
        const main = document.querySelector('main');
        if (main instanceof HTMLElement && document.activeElement?.closest('footer')) {
          main.tabIndex = -1;
          main.focus();
          announce('Navigated to main content');
        }
      },
      '?': () => {
        // Show keyboard shortcuts help
        announce('Keyboard shortcuts: Ctrl+F for footer, Escape to exit footer, ? for help');
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      const action = shortcuts[e.key];
      if (action && !e.ctrlKey && !e.metaKey && !e.altKey) {
        action();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [enableKeyboardShortcuts, announce]);

  /**
   * CONTEXT7 SOURCE: /wcag/guidelines - Focus trap for modal content
   * TRAP REASON: WCAG 2.1.2 no keyboard trap guideline
   */
  const createFocusTrap = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    container.addEventListener('keydown', trapFocus);
    
    return () => {
      container.removeEventListener('keydown', trapFocus);
    };
  }, []);

  // Setup all accessibility features on mount
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    cleanups.push(detectKeyboardUser());
    cleanups.push(setupSkipLinks());
    cleanups.push(detectUserPreferences());
    cleanups.push(setupKeyboardShortcuts());

    return () => {
      cleanups.forEach(cleanup => cleanup?.());
    };
  }, [detectKeyboardUser, setupSkipLinks, detectUserPreferences, setupKeyboardShortcuts]);

  return {
    // State
    ...accessibilityState,
    
    // Methods
    announce,
    manageFocus,
    restoreFocus,
    createFocusTrap,
    
    // Refs for integration
    announcementRef,
    skipLinkRef,
    
    // Utility methods
    isFooterFocused: () => document.activeElement?.closest('footer') !== null,
    focusFooter: () => {
      const footer = document.querySelector('footer[role="contentinfo"]');
      if (footer instanceof HTMLElement) {
        manageFocus(footer);
      }
    },
    
    // ARIA helpers
    getAriaLabel: (element: HTMLElement) => {
      return element.getAttribute('aria-label') || 
             element.getAttribute('aria-labelledby') || 
             element.textContent?.trim() || 
             'Unlabeled element';
    },
    
    setAriaExpanded: (element: HTMLElement, expanded: boolean) => {
      element.setAttribute('aria-expanded', expanded.toString());
      announce(`${element.getAttribute('aria-label')} ${expanded ? 'expanded' : 'collapsed'}`);
    }
  };
}

/**
 * CONTEXT7 SOURCE: /wcag/guidelines - Skip link configuration for footer navigation
 * SKIP LINK REASON: WCAG 2.4.1 bypass blocks requirement
 */
export const footerSkipLinkConfig = {
  skipToFooter: (e: Event) => {
    e.preventDefault();
    const footer = document.querySelector('footer[role="contentinfo"]');
    if (footer instanceof HTMLElement) {
      footer.tabIndex = -1;
      footer.focus();
    }
  },
  className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-600 focus:text-white focus:rounded-lg focus:shadow-lg",
  text: "Skip to footer"
};

export default useFooterAccessibility;