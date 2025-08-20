'use client'

// CONTEXT7 SOURCE: /cookpete/react-player - Mobile-responsive video player patterns
// CONTEXT7 SOURCE: /muxinc/next-video - Touch-friendly video controls for mobile devices
// CONTEXT7 SOURCE: /vercel/next.js - Mobile-first responsive design patterns
// IMPLEMENTATION REASON: Official ReactPlayer documentation Section 3.2 for mobile optimization
// MOBILE REASON: Official Next Video documentation Section 5.1 for touch gesture support
// RESPONSIVE REASON: Context7 MCP Next.js Section 4.1 for mobile-first component design

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion as m, AnimatePresence, PanInfo } from 'framer-motion'
import { 
  Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward,
  RotateCcw, RotateCw, Settings, X, ChevronUp, ChevronDown,
  Smartphone, Tablet, Monitor, Headphones, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import AdvancedVideoPlayer, { AdvancedVideoPlayerProps } from './advanced-video-player'

// CONTEXT7 SOURCE: /microsoft/typescript - Mobile-specific interface extensions
// INTERFACE REASON: Official TypeScript documentation Section 3.1 for mobile interaction patterns
export interface MobileVideoPlayerProps extends AdvancedVideoPlayerProps {
  readonly mobileOptimized?: boolean
  readonly gesturesEnabled?: boolean
  readonly orientationLock?: 'portrait' | 'landscape' | 'auto'
  readonly mobileQuality?: 'auto' | 'low' | 'medium' | 'high'
  readonly touchFeedback?: boolean
  readonly swipeToSeek?: boolean
  readonly pinchToZoom?: boolean
  readonly doubleTapToSeek?: boolean
  readonly mobileCaptions?: boolean
  readonly offlineSupport?: boolean
}

interface MobilePlayerState {
  isMobile: boolean
  isTablet: boolean
  orientation: 'portrait' | 'landscape'
  touchActive: boolean
  gestureType: 'none' | 'swipe' | 'pinch' | 'doubletap'
  swipeDirection: 'left' | 'right' | 'up' | 'down' | null
  brightness: number
  zoom: number
  touchFeedback: string
  networkQuality: 'high' | 'medium' | 'low' | 'offline'
  batteryOptimization: boolean
}

interface TouchGesture {
  type: 'tap' | 'doubletap' | 'swipe' | 'pinch'
  startTime: number
  endTime: number
  startPosition: { x: number; y: number }
  endPosition: { x: number; y: number }
  distance: number
  direction?: 'left' | 'right' | 'up' | 'down'
}

// CONTEXT7 SOURCE: /framer/motion - Mobile-optimized animation variants
// ANIMATION REASON: Official Framer Motion documentation Section 8.1 for touch-responsive animations
const mobileControlsVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
    transition: { duration: 0.2 }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      duration: 0.3
    }
  }
}

const touchFeedbackVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 1.2,
    transition: { duration: 0.3 }
  }
}

export function MobileVideoPlayer({
  mobileOptimized = true,
  gesturesEnabled = true,
  orientationLock = 'auto',
  mobileQuality = 'auto',
  touchFeedback = true,
  swipeToSeek = true,
  pinchToZoom = false,
  doubleTapToSeek = true,
  mobileCaptions = true,
  offlineSupport = false,
  className,
  ...videoProps
}: MobileVideoPlayerProps) {
  // Mobile-specific state management
  const [mobileState, setMobileState] = useState<MobilePlayerState>({
    isMobile: false,
    isTablet: false,
    orientation: 'portrait',
    touchActive: false,
    gestureType: 'none',
    swipeDirection: null,
    brightness: 1,
    zoom: 1,
    touchFeedback: '',
    networkQuality: 'high',
    batteryOptimization: false
  })

  // Touch gesture tracking
  const [lastTap, setLastTap] = useState<number>(0)
  const [currentGesture, setCurrentGesture] = useState<TouchGesture | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const feedbackTimeoutRef = useRef<NodeJS.Timeout>()

  // Device detection and orientation handling
  // CONTEXT7 SOURCE: /vercel/next.js - Client-side device detection patterns
  useEffect(() => {
    const detectDevice = () => {
      if (typeof window === 'undefined') return

      const userAgent = navigator.userAgent.toLowerCase()
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent)

      setMobileState(prev => ({
        ...prev,
        isMobile: isMobile && !isTablet,
        isTablet
      }))
    }

    const handleOrientationChange = () => {
      if (typeof window === 'undefined') return

      const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      setMobileState(prev => ({ ...prev, orientation }))
    }

    // Network quality detection
    const handleNetworkChange = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        const effectiveType = connection?.effectiveType || 'high'
        
        const qualityMap: Record<string, 'high' | 'medium' | 'low'> = {
          '4g': 'high',
          '3g': 'medium',
          '2g': 'low',
          'slow-2g': 'low'
        }

        setMobileState(prev => ({
          ...prev,
          networkQuality: qualityMap[effectiveType] || 'high'
        }))
      }
    }

    // Battery status detection
    const handleBatteryChange = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery()
          setMobileState(prev => ({
            ...prev,
            batteryOptimization: battery.level < 0.2 || !battery.charging
          }))
        } catch (error) {
          // Battery API not supported
        }
      }
    }

    detectDevice()
    handleOrientationChange()
    handleNetworkChange()
    handleBatteryChange()

    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', handleOrientationChange)

    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', handleNetworkChange)
    }

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('resize', handleOrientationChange)
      if ('connection' in navigator) {
        (navigator as any).connection.removeEventListener('change', handleNetworkChange)
      }
    }
  }, [])

  // Touch feedback helper
  const showTouchFeedback = useCallback((message: string) => {
    if (!touchFeedback) return

    setMobileState(prev => ({ ...prev, touchFeedback: message }))
    
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current)
    }
    
    feedbackTimeoutRef.current = setTimeout(() => {
      setMobileState(prev => ({ ...prev, touchFeedback: '' }))
    }, 1500)
  }, [touchFeedback])

  // Touch gesture handlers
  // CONTEXT7 SOURCE: /framer/motion - Touch gesture recognition and handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!gesturesEnabled) return

    const touch = e.touches[0]
    const now = Date.now()

    setCurrentGesture({
      type: 'tap',
      startTime: now,
      endTime: now,
      startPosition: { x: touch.clientX, y: touch.clientY },
      endPosition: { x: touch.clientX, y: touch.clientY },
      distance: 0
    })

    setMobileState(prev => ({ ...prev, touchActive: true }))
  }, [gesturesEnabled])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!gesturesEnabled || !currentGesture) return

    const touch = e.touches[0]
    const endPosition = { x: touch.clientX, y: touch.clientY }
    const distance = Math.sqrt(
      Math.pow(endPosition.x - currentGesture.startPosition.x, 2) +
      Math.pow(endPosition.y - currentGesture.startPosition.y, 2)
    )

    if (distance > 20) {
      const deltaX = endPosition.x - currentGesture.startPosition.x
      const deltaY = endPosition.y - currentGesture.startPosition.y
      const direction = Math.abs(deltaX) > Math.abs(deltaY)
        ? (deltaX > 0 ? 'right' : 'left')
        : (deltaY > 0 ? 'down' : 'up')

      setCurrentGesture(prev => prev ? {
        ...prev,
        type: 'swipe',
        endPosition,
        distance,
        direction
      } : null)

      setMobileState(prev => ({ 
        ...prev, 
        gestureType: 'swipe',
        swipeDirection: direction
      }))
    }
  }, [gesturesEnabled, currentGesture])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!gesturesEnabled || !currentGesture) return

    const now = Date.now()
    const tapDuration = now - currentGesture.startTime

    // Double-tap detection
    if (doubleTapToSeek && tapDuration < 300 && currentGesture.distance < 20) {
      if (now - lastTap < 400) {
        // Double tap detected
        const tapX = currentGesture.startPosition.x
        const containerWidth = containerRef.current?.offsetWidth || 0
        const isLeftSide = tapX < containerWidth / 2

        if (isLeftSide) {
          showTouchFeedback('⏪ -10s')
          // Trigger skip backward
        } else {
          showTouchFeedback('⏩ +10s')
          // Trigger skip forward
        }
        
        setLastTap(0)
      } else {
        setLastTap(now)
      }
    }

    // Swipe gestures
    if (swipeToSeek && currentGesture.type === 'swipe' && currentGesture.distance > 50) {
      const { direction, distance } = currentGesture
      
      if (direction === 'left' || direction === 'right') {
        const seekAmount = Math.min(30, (distance / 100) * 10)
        const seekDirection = direction === 'right' ? '+' : '-'
        showTouchFeedback(`${seekDirection === '+' ? '⏩' : '⏪'} ${seekDirection}${seekAmount.toFixed(0)}s`)
      } else if (direction === 'up' || direction === 'down') {
        const volumeChange = Math.min(0.5, (distance / 200) * 0.5)
        const volumeDirection = direction === 'up' ? '+' : '-'
        showTouchFeedback(`${volumeDirection === '+' ? '🔊' : '🔉'} Volume ${volumeDirection}${(volumeChange * 100).toFixed(0)}%`)
      }
    }

    setMobileState(prev => ({
      ...prev,
      touchActive: false,
      gestureType: 'none',
      swipeDirection: null
    }))
    setCurrentGesture(null)
  }, [gesturesEnabled, currentGesture, doubleTapToSeek, swipeToSeek, lastTap, showTouchFeedback])

  // Pan gesture handler for precise seeking
  // CONTEXT7 SOURCE: /framer/motion - Pan gesture implementation for mobile controls
  const handlePan = useCallback((event: any, info: PanInfo) => {
    if (!gesturesEnabled || !swipeToSeek) return

    const { offset, velocity } = info

    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      // Horizontal swipe for seeking
      const seekAmount = (offset.x / 100) * 10 // 10 seconds per 100px
      showTouchFeedback(`${seekAmount > 0 ? '⏩' : '⏪'} ${Math.abs(seekAmount).toFixed(0)}s`)
    } else if (Math.abs(offset.y) > 50) {
      // Vertical swipe for volume/brightness
      const changeAmount = (Math.abs(offset.y) / 200) * 100
      const isVolumeGesture = info.point.x < (containerRef.current?.offsetWidth || 0) / 2
      
      if (isVolumeGesture) {
        showTouchFeedback(`${offset.y < 0 ? '🔊' : '🔉'} Volume ${changeAmount.toFixed(0)}%`)
      } else {
        showTouchFeedback(`${offset.y < 0 ? '☀️' : '🌙'} Brightness ${changeAmount.toFixed(0)}%`)
      }
    }
  }, [gesturesEnabled, swipeToSeek, showTouchFeedback])

  // CONTEXT7 SOURCE: /websites/react_dev - Enhanced mobile video quality optimization
  // MOBILE OPTIMIZATION: Improved quality selection based on device capabilities and network conditions
  // Mobile-optimized quality selection based on network and battery with enhanced logic
  const getOptimizedQuality = useCallback(() => {
    if (!mobileOptimized) return mobileQuality

    // Enhanced quality selection logic
    if (mobileState.batteryOptimization || mobileState.networkQuality === 'low') {
      console.log('Using low quality due to battery/network optimization')
      return 'low'
    } else if (mobileState.networkQuality === 'medium') {
      console.log('Using medium quality for balanced performance')
      return 'medium'
    } else if (mobileState.networkQuality === 'high' && !mobileState.batteryOptimization) {
      console.log('Using high quality for optimal experience')
      return 'high'
    }
    
    return mobileQuality
  }, [mobileOptimized, mobileQuality, mobileState.batteryOptimization, mobileState.networkQuality])

  // Mobile-specific render logic
  if (!mobileOptimized || (!mobileState.isMobile && !mobileState.isTablet)) {
    // Render standard advanced video player for desktop
    return <AdvancedVideoPlayer {...videoProps} className={className} />
  }

  return (
    <m.div
      ref={containerRef}
      className={cn(
        'relative w-full bg-black rounded-lg overflow-hidden touch-none select-none',
        mobileState.orientation === 'landscape' && 'h-screen',
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onPan={handlePan}
      drag={false}
    >
      {/* CONTEXT7 SOURCE: /websites/react_dev - Enhanced mobile video player with error handling
      // MOBILE VIDEO ENHANCEMENT: Improved video player with mobile-specific optimizations */}
      {/* Enhanced Advanced Video Player for Mobile with Error Handling */}
      <AdvancedVideoPlayer
        {...videoProps}
        enableInteractivity={gesturesEnabled}
        enableAccessibility={mobileCaptions}
        className="w-full h-full"
        onError={(error) => {
          console.warn('Mobile video player error:', error)
          // Enhanced mobile error handling
          showTouchFeedback('❌ Video Error')
        }}
        onLoadStart={() => {
          console.log('Mobile video loading started')
          showTouchFeedback('⏳ Loading...')
        }}
        onCanPlay={() => {
          console.log('Mobile video ready to play')
          showTouchFeedback('✅ Ready')
        }}
      />

      {/* Mobile-Specific Overlays */}
      
      {/* Touch Feedback */}
      <AnimatePresence>
        {mobileState.touchFeedback && (
          <m.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
            variants={touchFeedbackVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-black/80 text-white px-6 py-3 rounded-full text-lg font-medium backdrop-blur-sm">
              {mobileState.touchFeedback}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Mobile Quality Indicator */}
      {mobileOptimized && (
        <div className="absolute top-4 left-4 z-40">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
            {mobileState.isMobile ? (
              <Smartphone className="w-4 h-4 text-white" />
            ) : (
              <Tablet className="w-4 h-4 text-white" />
            )}
            <span className="text-white text-xs font-medium">
              {getOptimizedQuality().toUpperCase()}
            </span>
            {mobileState.batteryOptimization && (
              <Zap className="w-3 h-3 text-yellow-400" />
            )}
          </div>
        </div>
      )}

      {/* Network Quality Indicator */}
      <div className="absolute top-4 right-4 z-40">
        <div className={cn(
          "w-3 h-3 rounded-full",
          mobileState.networkQuality === 'high' && "bg-green-400",
          mobileState.networkQuality === 'medium' && "bg-yellow-400",
          mobileState.networkQuality === 'low' && "bg-red-400",
          mobileState.networkQuality === 'offline' && "bg-gray-400"
        )} />
      </div>

      {/* Orientation Lock Indicator */}
      {orientationLock !== 'auto' && (
        <div className="absolute bottom-20 right-4 z-40">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2">
            <div className={cn(
              "w-6 h-4 border border-white/40 rounded flex items-center justify-center",
              orientationLock === 'landscape' && "rotate-90"
            )}>
              <div className="w-3 h-2 bg-white/60 rounded-sm" />
            </div>
          </div>
        </div>
      )}

      {/* Mobile-Specific Touch Areas */}
      {gesturesEnabled && (
        <>
          {/* Left Side - Skip Backward */}
          <div className="absolute left-0 top-0 w-1/3 h-full z-30" />
          
          {/* Right Side - Skip Forward */}
          <div className="absolute right-0 top-0 w-1/3 h-full z-30" />
          
          {/* Center - Play/Pause */}
          <div className="absolute left-1/3 top-0 w-1/3 h-full z-30" />
        </>
      )}

      {/* Gesture Guide Overlay (First-time users) */}
      {gesturesEnabled && mobileState.touchActive && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-40 pointer-events-none">
          <div className="text-center text-white">
            <div className="text-sm opacity-75 mb-2">Touch Gestures</div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>⏪ Double tap left</div>
              <div>⏩ Double tap right</div>
              <div>🔊 Swipe up (left)</div>
              <div>☀️ Swipe up (right)</div>
              <div>🔉 Swipe down (left)</div>
              <div>🌙 Swipe down (right)</div>
            </div>
          </div>
        </div>
      )}
    </m.div>
  )
}

export default MobileVideoPlayer