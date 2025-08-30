/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Debug control component patterns
 * IMPLEMENTATION REASON: Official React documentation for debug UI components
 * 
 * DEBUG CONTROLS - MY PRIVATE TUTOR ONLINE
 * Simple toggle controls for debug functionality
 */

"use client"

import React, { useState, useEffect } from 'react'
import { Settings, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  isDebugEnabled, 
  toggleDebug, 
  setDebugConfig, 
  getDebugConfig, 
  type DebugConfig 
} from '@/lib/debug/debug-config'

interface DebugControlsProps {
  className?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export function DebugControls({ 
  className, 
  position = 'top-right' 
}: DebugControlsProps) {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useState for component state management
  // STATE_REASON: Official React documentation for managing debug panel visibility
  const [isOpen, setIsOpen] = useState(false)
  const [debugConfig, setDebugConfigState] = useState<DebugConfig | null>(null)

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for component initialization
  // INITIALIZATION_REASON: Official React documentation for loading initial configuration
  useEffect(() => {
    setDebugConfigState(getDebugConfig())
  }, [])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Event handler patterns
  // HANDLER_REASON: Official React documentation for user interaction handling
  const handleToggleDebug = () => {
    toggleDebug()
    setDebugConfigState(getDebugConfig())
  }

  const handleConfigChange = (key: keyof DebugConfig, value: any) => {
    setDebugConfig({ [key]: value })
    setDebugConfigState(getDebugConfig())
  }

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4', 
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  }

  return (
    <div className={cn(
      "fixed z-[101] bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg shadow-xl",
      positionClasses[position],
      className
    )}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-white hover:bg-slate-800 rounded-lg transition-colors",
          "text-xs font-mono font-bold"
        )}
        title="Debug Controls"
      >
        <Settings className="w-4 h-4" />
        <span>DEBUG</span>
        {debugConfig?.enabled ? (
          <Eye className="w-3 h-3 text-green-400" />
        ) : (
          <EyeOff className="w-3 h-3 text-red-400" />
        )}
      </button>

      {/* Debug Panel */}
      {isOpen && debugConfig && (
        <div className="absolute top-full mt-2 w-80 p-4 bg-slate-900/98 border border-slate-700 rounded-lg shadow-2xl">
          <div className="space-y-3">
            {/* Main Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-white text-sm font-medium">
                Debug Mode
              </label>
              <button
                onClick={handleToggleDebug}
                className={cn(
                  "px-3 py-1 rounded text-xs font-bold transition-colors",
                  debugConfig.enabled 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-red-600 hover:bg-red-700 text-white"
                )}
              >
                {debugConfig.enabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Additional Controls (only show when debug is enabled) */}
            {debugConfig.enabled && (
              <>
                <hr className="border-slate-700" />
                
                {/* Borders Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-white text-sm">
                    Show Borders
                  </label>
                  <button
                    onClick={() => handleConfigChange('showBorders', !debugConfig.showBorders)}
                    className={cn(
                      "px-2 py-1 rounded text-xs transition-colors",
                      debugConfig.showBorders 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "bg-gray-600 hover:bg-gray-700 text-white"
                    )}
                  >
                    {debugConfig.showBorders ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Labels Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-white text-sm">
                    Show Labels
                  </label>
                  <button
                    onClick={() => handleConfigChange('showLabels', !debugConfig.showLabels)}
                    className={cn(
                      "px-2 py-1 rounded text-xs transition-colors",
                      debugConfig.showLabels 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "bg-gray-600 hover:bg-gray-700 text-white"
                    )}
                  >
                    {debugConfig.showLabels ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Console Logging Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-white text-sm">
                    Console Logging
                  </label>
                  <button
                    onClick={() => handleConfigChange('enableLogging', !debugConfig.enableLogging)}
                    className={cn(
                      "px-2 py-1 rounded text-xs transition-colors",
                      debugConfig.enableLogging 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "bg-gray-600 hover:bg-gray-700 text-white"
                    )}
                  >
                    {debugConfig.enableLogging ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Quick Actions */}
                <hr className="border-slate-700" />
                <div className="space-y-2">
                  <div className="text-white text-xs font-medium">Quick Actions:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        handleConfigChange('showBorders', true)
                        handleConfigChange('showLabels', true)
                        handleConfigChange('enableLogging', true)
                      }}
                      className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
                    >
                      All ON
                    </button>
                    <button
                      onClick={() => {
                        handleConfigChange('showBorders', false)
                        handleConfigChange('showLabels', false)
                        handleConfigChange('enableLogging', false)
                      }}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                    >
                      All OFF
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Info */}
            <hr className="border-slate-700" />
            <div className="text-slate-400 text-xs">
              💡 Debug mode can also be controlled via environment variables
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Keyboard shortcut hook pattern
 * SHORTCUT_REASON: Official React documentation for keyboard event handling
 */
export function useDebugShortcuts() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // CONTEXT7 SOURCE: /mdn/web-docs - KeyboardEvent handling patterns
      // KEYBOARD_REASON: Standard web API for keyboard shortcuts
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault()
        toggleDebug()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}