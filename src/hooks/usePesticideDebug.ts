// CONTEXT7 SOURCE: /vercel/next.js - Development-only debugging hook
// DEBUGGING TOOL REASON: React hook for toggling CSS debugging visualization

import { useEffect, useState, useCallback } from 'react';

/**
 * Custom hook for toggling Pesticide CSS debugging tool
 * Only active in development mode
 * Keyboard shortcut: Ctrl/Cmd + Shift + D
 */
export function usePesticideDebug() {
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);

  // CONTEXT7 SOURCE: /vercel/next.js - Dynamic CSS injection for development
  // IMPLEMENTATION REASON: Load debugging styles only when needed
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Load the CSS file dynamically when debug mode is activated
    if (isDebugMode && !isStyleLoaded) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/styles/pesticide-debug.css';
      link.id = 'pesticide-debug-styles';
      document.head.appendChild(link);
      setIsStyleLoaded(true);
    }

    // Toggle the debug class on body element
    if (isDebugMode) {
      document.body.classList.add('pesticide-debug');
    } else {
      document.body.classList.remove('pesticide-debug');
    }

    return () => {
      // Cleanup on unmount or when debug mode is disabled
      document.body.classList.remove('pesticide-debug');
    };
  }, [isDebugMode, isStyleLoaded]);

  // CONTEXT7 SOURCE: /vercel/next.js - Keyboard shortcut handler
  // IMPLEMENTATION REASON: Developer convenience with keyboard activation
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + D to toggle debug mode
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === 'd'
      ) {
        event.preventDefault();
        setIsDebugMode((prev) => !prev);
        
        // Show notification
        const message = !isDebugMode 
          ? '🐛 Pesticide Debug Mode: ON' 
          : '✓ Pesticide Debug Mode: OFF';
        
        if (typeof window !== 'undefined' && 'Notification' in window) {
          if (Notification.permission === 'granted') {
            new Notification('My Private Tutor Online', { 
              body: message,
              icon: '/favicon.ico'
            });
          }
        }
        
        console.log(
          `%c${message}`,
          `color: ${!isDebugMode ? '#00ff00' : '#ff0000'}; font-weight: bold; font-size: 14px;`
        );
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isDebugMode]);

  // CONTEXT7 SOURCE: /vercel/next.js - Manual toggle function
  // IMPLEMENTATION REASON: Programmatic control for debug mode
  const toggleDebugMode = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsDebugMode((prev) => !prev);
    }
  }, []);

  // CONTEXT7 SOURCE: /vercel/next.js - Development mode indicator
  // IMPLEMENTATION REASON: Visual feedback for active debug state
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    if (isDebugMode) {
      console.log(
        '%c🐛 PESTICIDE DEBUG MODE ACTIVE',
        'background: #ff0000; color: white; padding: 5px 10px; font-weight: bold; border-radius: 3px;'
      );
      console.log(
        '%cPress Ctrl/Cmd + Shift + D to toggle',
        'color: #666; font-style: italic;'
      );
    }
  }, [isDebugMode]);

  return {
    isDebugMode,
    toggleDebugMode,
    isEnabled: process.env.NODE_ENV === 'development',
  };
}