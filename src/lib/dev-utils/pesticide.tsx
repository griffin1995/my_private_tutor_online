/**
 * CONTEXT7 SOURCE: /vercel/next.js - Environment variable conditional loading for development tools
 * DEVELOPMENT TOOL: Pesticide CSS layout debugging for development environment only
 * SAFETY: Production-safe conditional CSS loading with environment variable checks
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Pesticide Development Tool Component
 * 
 * This component conditionally loads Pesticide CSS for layout debugging
 * only in development environment or when explicitly enabled.
 * 
 * Features:
 * - Environment-based conditional loading
 * - Manual toggle capability
 * - Production safety (never loads in production)
 * - Visual indicator when active
 * - Easy enable/disable keyboard shortcut
 * 
 * Usage:
 * 1. Add <PesticideDebugger /> to your root layout or any page
 * 2. Set NEXT_PUBLIC_ENABLE_PESTICIDE=true in your .env.local for auto-enable
 * 3. Press Ctrl+Alt+P (or Cmd+Alt+P on Mac) to toggle during development
 */
export function PesticideDebugger() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if we're in development and should enable Pesticide
  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isExplicitlyEnabled = process.env.NEXT_PUBLIC_ENABLE_PESTICIDE === 'true';
    
    // Only enable in development environment
    if (isDevelopment) {
      setIsEnabled(isExplicitlyEnabled);
    }
  }, []);

  // Keyboard shortcut to toggle Pesticide (Ctrl+Alt+P or Cmd+Alt+P)
  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (!isDevelopment) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Alt+P (Windows/Linux) or Cmd+Alt+P (Mac)
      if ((event.ctrlKey || event.metaKey) && event.altKey && event.key === 'p') {
        event.preventDefault();
        setIsEnabled(prev => !prev);
        console.log('[Pesticide] Toggle:', !isEnabled ? 'ON' : 'OFF');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnabled]);

  // Load/unload Pesticide CSS
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    if (isEnabled && !isLoaded) {
      // Load Pesticide CSS
      const link = document.createElement('link');
      link.id = 'pesticide-css';
      link.rel = 'stylesheet';
      link.href = '/styles/pesticide.dev.css';
      document.head.appendChild(link);
      setIsLoaded(true);
      
      console.log('[Pesticide] CSS Layout Debugger ACTIVATED');
      console.log('[Pesticide] All elements now have colored outlines');
      console.log('[Pesticide] Press Ctrl+Alt+P (or Cmd+Alt+P) to toggle');
    } else if (!isEnabled && isLoaded) {
      // Remove Pesticide CSS
      const link = document.getElementById('pesticide-css');
      if (link) {
        link.remove();
        setIsLoaded(false);
        console.log('[Pesticide] CSS Layout Debugger DEACTIVATED');
      }
    }
  }, [isEnabled, isLoaded]);

  // Don't render anything in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Development Control Panel */}
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9998,
          background: isEnabled ? '#ff4444' : '#666666',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontFamily: 'monospace',
          border: '2px solid white',
          cursor: 'pointer',
          userSelect: 'none',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
          transition: 'all 0.2s ease'
        }}
        onClick={() => setIsEnabled(!isEnabled)}
        title="Click to toggle Pesticide CSS debugger"
      >
        🐛 Pesticide: {isEnabled ? 'ON' : 'OFF'}
        <div style={{ fontSize: '10px', marginTop: '2px', opacity: 0.8 }}>
          Ctrl+Alt+P
        </div>
      </div>

      {/* Development Instructions */}
      {isEnabled && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9997,
            background: 'rgba(0,0,0,0.9)',
            color: '#00ff00',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '11px',
            fontFamily: 'monospace',
            maxWidth: '300px',
            lineHeight: '1.4'
          }}
        >
          <div style={{ color: '#ff6666', fontWeight: 'bold', marginBottom: '8px' }}>
            🚨 PESTICIDE CSS ACTIVE
          </div>
          <div>• All elements have colored outlines</div>
          <div>• Different colors = different HTML tags</div>
          <div>• Press Ctrl+Alt+P to toggle</div>
          <div>• Click the control panel to toggle</div>
          <div style={{ marginTop: '8px', color: '#ffff66' }}>
            DEV ONLY - Not loaded in production
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Hook for programmatic Pesticide control
 * 
 * @example
 * const { isEnabled, toggle, enable, disable } = usePesticide();
 */
export function usePesticide() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isExplicitlyEnabled = process.env.NEXT_PUBLIC_ENABLE_PESTICIDE === 'true';
    
    if (isDevelopment && isExplicitlyEnabled) {
      setIsEnabled(true);
    }
  }, []);

  const toggle = () => {
    if (process.env.NODE_ENV === 'development') {
      setIsEnabled(prev => !prev);
    }
  };

  const enable = () => {
    if (process.env.NODE_ENV === 'development') {
      setIsEnabled(true);
    }
  };

  const disable = () => {
    if (process.env.NODE_ENV === 'development') {
      setIsEnabled(false);
    }
  };

  return {
    isEnabled: process.env.NODE_ENV === 'development' ? isEnabled : false,
    toggle,
    enable,
    disable,
    isDevMode: process.env.NODE_ENV === 'development'
  };
}