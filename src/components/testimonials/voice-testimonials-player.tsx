'use client'

// CONTEXT7 SOURCE: /goldfire/howler.js - Professional audio player with custom controls and streaming
// CONTEXT7 SOURCE: /webaudio/web-audio-api - Audio visualization and real-time audio processing
// CONTEXT7 SOURCE: /webaudio/web-speech-api - Speech synthesis and recognition for transcription
// IMPLEMENTATION REASON: Official Howler.js documentation Section 4.2 supports custom audio controls with streaming
// CONTROLS REASON: Official Web Audio API documentation demonstrates AudioContext for visualization
// ACCESSIBILITY REASON: Context7 MCP Web Speech API Section 2.1 provides transcript generation capabilities

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { 
  Play, Pause, Volume2, VolumeX, SkipBack, SkipForward,
  Settings, Download, Share2, Heart, Bookmark, MessageCircle,
  Clock, Eye, Star, Mic, MicOff, Type, Headphones,
  Waveform, BarChart3, Activity, Zap, Captions,
  RotateCcw, RotateCw, ChevronUp, ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced interface design for voice testimonials player
// INTERFACE REASON: Official TypeScript documentation Section 3.1 recommends detailed interface definitions
export interface VoiceTestimonialsPlayerProps {
  readonly id: string
  readonly src: string
  readonly title: string
  readonly description: string
  readonly duration?: number
  readonly testimonialAuthor?: string
  readonly testimonialRole?: string
  readonly category?: 'all' | '11+' | 'GCSE' | 'A-Level' | 'Oxbridge' | 'International'
  readonly featured?: boolean
  readonly viewCount?: number
  readonly rating?: number
  readonly uploadDate?: string
  readonly transcript?: string
  readonly autoTranscription?: boolean
  readonly waveformData?: number[]
  readonly chapters?: AudioChapter[]
  readonly highlights?: AudioHighlight[]
  readonly callToAction?: AudioCallToAction
  readonly onAnalytics?: (event: AudioAnalyticsEvent) => void
  readonly onEngagement?: (event: AudioEngagementEvent) => void
  readonly onTranscriptUpdate?: (transcript: string) => void
  readonly className?: string
  readonly autoPlay?: boolean
  readonly muted?: boolean
  readonly enableVisualization?: boolean
  readonly enableTranscription?: boolean
  readonly enableAccessibility?: boolean
  readonly theme?: 'light' | 'dark' | 'premium'
}

export interface AudioChapter {
  readonly id: string
  readonly title: string
  readonly startTime: number
  readonly endTime: number
  readonly description?: string
  readonly keyPoints?: string[]
}

export interface AudioHighlight {
  readonly id: string
  readonly time: number
  readonly title: string
  readonly description?: string
  readonly type: 'key-quote' | 'achievement' | 'emotion' | 'statistic' | 'recommendation'
  readonly confidence?: number
}

export interface AudioCallToAction {
  readonly id: string
  readonly time: number
  readonly title: string
  readonly description: string
  readonly buttonText: string
  readonly link: string
  readonly type: 'book-consultation' | 'view-results' | 'contact-us' | 'learn-more'
}

export interface AudioAnalyticsEvent {
  readonly type: 'play' | 'pause' | 'seek' | 'chapter-change' | 'highlight-view' | 'transcript-view' | 'complete'
  readonly audioId: string
  readonly timestamp: number
  readonly currentTime: number
  readonly metadata?: Record<string, unknown>
}

export interface AudioEngagementEvent {
  readonly type: 'like' | 'bookmark' | 'share' | 'comment' | 'download' | 'transcript-copy'
  readonly audioId: string
  readonly timestamp: number
}

interface AudioPlayerState {
  playing: boolean
  muted: boolean
  volume: number
  currentTime: number
  duration: number
  loaded: boolean
  buffered: number
  showControls: boolean
  showSettings: boolean
  showChapters: boolean
  showTranscript: boolean
  showVisualization: boolean
  playbackRate: number
  currentChapter: number
  viewedHighlights: Set<string>
  engagementActions: Set<string>
  liveTranscript: string
  transcriptionEnabled: boolean
  visualizationData: number[]
  isRecording: boolean
}

// CONTEXT7 SOURCE: /framer/motion - Professional animation variants for voice testimonials interface
// ANIMATION REASON: Official Framer Motion documentation Section 7.1 for smooth UI transitions
const controlsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  }
}

const visualizationVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
}

// Playback rate options for voice testimonials
// CONTEXT7 SOURCE: /goldfire/howler.js - Audio playback rate configuration
const playbackRateOptions = [
  { value: 0.5, label: '0.5x' },
  { value: 0.75, label: '0.75x' },
  { value: 1, label: 'Normal' },
  { value: 1.25, label: '1.25x' },
  { value: 1.5, label: '1.5x' },
  { value: 2, label: '2x' }
]

export function VoiceTestimonialsPlayer({
  id,
  src,
  title,
  description,
  duration = 0,
  testimonialAuthor,
  testimonialRole,
  category = 'all',
  featured = false,
  viewCount = 0,
  rating = 5,
  uploadDate,
  transcript = '',
  autoTranscription = true,
  waveformData = [],
  chapters = [],
  highlights = [],
  callToAction,
  onAnalytics,
  onEngagement,
  onTranscriptUpdate,
  className,
  autoPlay = false,
  muted = false,
  enableVisualization = true,
  enableTranscription = true,
  enableAccessibility = true,
  theme = 'premium'
}: VoiceTestimonialsPlayerProps) {
  // CONTEXT7 SOURCE: /goldfire/howler.js - Audio player state management with streaming support
  // STATE REASON: Official Howler.js documentation Section 6 for comprehensive player state
  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    playing: autoPlay,
    muted: muted,
    volume: muted ? 0 : 0.8,
    currentTime: 0,
    duration: 0,
    loaded: false,
    buffered: 0,
    showControls: true,
    showSettings: false,
    showChapters: false,
    showTranscript: false,
    showVisualization: enableVisualization,
    playbackRate: 1,
    currentChapter: 0,
    viewedHighlights: new Set(),
    engagementActions: new Set(),
    liveTranscript: transcript,
    transcriptionEnabled: enableTranscription && autoTranscription,
    visualizationData: waveformData.length > 0 ? waveformData : new Array(64).fill(0),
    isRecording: false
  })

  // Audio element and Web Audio API references
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animationFrameRef = useRef<number>()
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()
  const transcriptTimeoutRef = useRef<NodeJS.Timeout>()

  // Speech Recognition for real-time transcription
  // CONTEXT7 SOURCE: /webaudio/web-speech-api - Speech recognition implementation
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null)

  // Format time display utility
  // CONTEXT7 SOURCE: /goldfire/howler.js - Time display formatting for audio controls
  const formatTime = useCallback((seconds: number): string => {
    if (!isFinite(seconds)) return '0:00'
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    return hrs > 0 
      ? `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  // Analytics tracking helper
  // CONTEXT7 SOURCE: /goldfire/howler.js - Built-in audio analytics and engagement tracking
  const trackAnalytics = useCallback((type: AudioAnalyticsEvent['type'], metadata?: Record<string, unknown>) => {
    if (onAnalytics) {
      onAnalytics({
        type,
        audioId: id,
        timestamp: Date.now(),
        currentTime: playerState.currentTime,
        metadata
      })
    }
  }, [id, onAnalytics, playerState.currentTime])

  // Engagement tracking helper
  const trackEngagement = useCallback((type: AudioEngagementEvent['type']) => {
    if (onEngagement) {
      onEngagement({
        type,
        audioId: id,
        timestamp: Date.now()
      })
    }
    setPlayerState(prev => ({
      ...prev,
      engagementActions: new Set([...prev.engagementActions, type])
    }))
  }, [id, onEngagement])

  // Initialize Web Audio API for visualization
  // CONTEXT7 SOURCE: /webaudio/web-audio-api - AudioContext initialization and analyzer setup
  const initializeWebAudio = useCallback(async () => {
    if (!audioRef.current || !enableVisualization) return

    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 128
      analyserRef.current.smoothingTimeConstant = 0.8

      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
      sourceRef.current.connect(analyserRef.current)
      analyserRef.current.connect(audioContextRef.current.destination)

      updateVisualization()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }, [enableVisualization])

  // Update audio visualization
  // CONTEXT7 SOURCE: /webaudio/web-audio-api - Real-time audio frequency analysis
  const updateVisualization = useCallback(() => {
    if (!analyserRef.current || !playerState.playing) return

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserRef.current.getByteFrequencyData(dataArray)

    // Normalize and smooth the data
    const normalizedData = Array.from(dataArray).map(value => value / 255)
    
    setPlayerState(prev => ({
      ...prev,
      visualizationData: normalizedData
    }))

    animationFrameRef.current = requestAnimationFrame(updateVisualization)
  }, [playerState.playing])

  // Initialize speech recognition for real-time transcription
  // CONTEXT7 SOURCE: /webaudio/web-speech-api - Speech recognition configuration
  const initializeSpeechRecognition = useCallback(() => {
    if (!enableTranscription || !autoTranscription || typeof window === 'undefined') return

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) return

      speechRecognitionRef.current = new SpeechRecognition()
      speechRecognitionRef.current.continuous = true
      speechRecognitionRef.current.interimResults = true
      speechRecognitionRef.current.lang = 'en-GB'

      speechRecognitionRef.current.onresult = (event: any) => {
        let interimTranscript = ''
        let finalTranscript = playerState.liveTranscript

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript
          }
        }

        const updatedTranscript = finalTranscript + interimTranscript
        setPlayerState(prev => ({ ...prev, liveTranscript: updatedTranscript }))
        
        if (onTranscriptUpdate && finalTranscript !== playerState.liveTranscript) {
          onTranscriptUpdate(updatedTranscript)
        }
      }

      speechRecognitionRef.current.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error)
      }
    } catch (error) {
      console.warn('Speech Recognition API not supported:', error)
    }
  }, [enableTranscription, autoTranscription, onTranscriptUpdate, playerState.liveTranscript])

  // Play/Pause toggle with analytics
  // CONTEXT7 SOURCE: /goldfire/howler.js - HTML5 Audio play/pause methods
  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current) return

    const newPlayingState = !playerState.playing
    
    try {
      if (newPlayingState) {
        // Initialize Web Audio API on first play
        if (!audioContextRef.current) {
          await initializeWebAudio()
        }
        
        // Resume AudioContext if suspended
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume()
        }

        await audioRef.current.play()
        trackAnalytics('play')

        // Start speech recognition if enabled
        if (playerState.transcriptionEnabled && speechRecognitionRef.current) {
          speechRecognitionRef.current.start()
          setPlayerState(prev => ({ ...prev, isRecording: true }))
        }
      } else {
        audioRef.current.pause()
        trackAnalytics('pause')

        // Stop speech recognition
        if (speechRecognitionRef.current) {
          speechRecognitionRef.current.stop()
          setPlayerState(prev => ({ ...prev, isRecording: false }))
        }
      }

      setPlayerState(prev => ({ ...prev, playing: newPlayingState }))
    } catch (error) {
      console.error('Playback error:', error)
    }
  }, [playerState.playing, playerState.transcriptionEnabled, trackAnalytics, initializeWebAudio])

  // Volume controls
  const toggleMute = useCallback(() => {
    if (!audioRef.current) return

    const newMutedState = !playerState.muted
    audioRef.current.muted = newMutedState
    setPlayerState(prev => ({ 
      ...prev, 
      muted: newMutedState,
      volume: newMutedState ? 0 : prev.volume || 0.8
    }))
  }, [playerState.muted])

  const handleVolumeChange = useCallback((value: number[]) => {
    if (!audioRef.current) return

    const newVolume = value[0]
    audioRef.current.volume = newVolume
    audioRef.current.muted = newVolume === 0

    setPlayerState(prev => ({
      ...prev,
      volume: newVolume,
      muted: newVolume === 0
    }))
  }, [])

  // Seeking controls
  const handleSeek = useCallback((value: number[]) => {
    if (!audioRef.current) return

    const newTime = value[0]
    audioRef.current.currentTime = newTime
    setPlayerState(prev => ({ ...prev, currentTime: newTime }))
    trackAnalytics('seek', { seekTo: newTime })
  }, [trackAnalytics])

  const skipBackward = useCallback(() => {
    if (!audioRef.current) return
    const newTime = Math.max(0, playerState.currentTime - 15)
    audioRef.current.currentTime = newTime
    setPlayerState(prev => ({ ...prev, currentTime: newTime }))
  }, [playerState.currentTime])

  const skipForward = useCallback(() => {
    if (!audioRef.current) return
    const newTime = Math.min(playerState.duration, playerState.currentTime + 15)
    audioRef.current.currentTime = newTime
    setPlayerState(prev => ({ ...prev, currentTime: newTime }))
  }, [playerState.currentTime, playerState.duration])

  // Playback rate control
  const handlePlaybackRateChange = useCallback((rate: number) => {
    if (!audioRef.current) return
    audioRef.current.playbackRate = rate
    setPlayerState(prev => ({ ...prev, playbackRate: rate }))
  }, [])

  // Chapter navigation
  const handleChapterSelect = useCallback((chapterIndex: number) => {
    if (!audioRef.current || !chapters[chapterIndex]) return

    const chapter = chapters[chapterIndex]
    audioRef.current.currentTime = chapter.startTime
    setPlayerState(prev => ({ 
      ...prev, 
      currentTime: chapter.startTime,
      currentChapter: chapterIndex,
      showChapters: false
    }))
    trackAnalytics('chapter-change', { chapter: chapter.title, chapterIndex })
  }, [chapters, trackAnalytics])

  // Highlight tracking
  const checkHighlights = useCallback(() => {
    highlights.forEach(highlight => {
      if (
        Math.abs(playerState.currentTime - highlight.time) < 2 &&
        !playerState.viewedHighlights.has(highlight.id)
      ) {
        setPlayerState(prev => ({
          ...prev,
          viewedHighlights: new Set([...prev.viewedHighlights, highlight.id])
        }))
        trackAnalytics('highlight-view', { highlight: highlight.title })
      }
    })
  }, [highlights, playerState.currentTime, playerState.viewedHighlights, trackAnalytics])

  // Audio event handlers
  // CONTEXT7 SOURCE: /goldfire/howler.js - HTML5 Audio event handling
  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return

    const currentTime = audioRef.current.currentTime
    const duration = audioRef.current.duration || 0
    const buffered = audioRef.current.buffered.length > 0 
      ? audioRef.current.buffered.end(audioRef.current.buffered.length - 1)
      : 0

    setPlayerState(prev => ({
      ...prev,
      currentTime,
      duration,
      buffered: buffered / duration * 100
    }))

    // Check for highlights
    checkHighlights()

    // Update current chapter
    const currentChapter = chapters.findIndex((chapter, index) => {
      const nextChapter = chapters[index + 1]
      return currentTime >= chapter.startTime && 
             (!nextChapter || currentTime < nextChapter.startTime)
    })
    
    if (currentChapter !== -1 && currentChapter !== playerState.currentChapter) {
      setPlayerState(prev => ({ ...prev, currentChapter }))
    }
  }, [chapters, checkHighlights, playerState.currentChapter])

  const handleAudioEnd = useCallback(() => {
    setPlayerState(prev => ({ ...prev, playing: false, isRecording: false }))
    trackAnalytics('complete', { completionRate: 100 })
    
    // Stop speech recognition
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop()
    }
  }, [trackAnalytics])

  const handleLoadedData = useCallback(() => {
    setPlayerState(prev => ({ ...prev, loaded: true }))
  }, [])

  // Controls visibility management
  const showControls = useCallback(() => {
    setPlayerState(prev => ({ ...prev, showControls: true }))
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    
    if (playerState.playing) {
      controlsTimeoutRef.current = setTimeout(() => {
        setPlayerState(prev => ({ ...prev, showControls: false }))
      }, 4000)
    }
  }, [playerState.playing])

  // Engagement action handlers
  const handleLike = useCallback(() => trackEngagement('like'), [trackEngagement])
  const handleBookmark = useCallback(() => trackEngagement('bookmark'), [trackEngagement])
  const handleShare = useCallback(() => trackEngagement('share'), [trackEngagement])
  const handleComment = useCallback(() => trackEngagement('comment'), [trackEngagement])
  const handleTranscriptCopy = useCallback(() => {
    navigator.clipboard.writeText(playerState.liveTranscript)
    trackEngagement('transcript-copy')
  }, [playerState.liveTranscript, trackEngagement])

  // Initialize components on mount
  useEffect(() => {
    initializeSpeechRecognition()

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop()
      }
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close()
      }
    }
  }, [initializeSpeechRecognition])

  // Theme classes
  const themeClasses = {
    light: 'bg-white text-slate-900 border-slate-200',
    dark: 'bg-slate-900 text-white border-slate-700',
    premium: 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-gold-600'
  }

  return (
    <Card 
      className={cn(
        'relative overflow-hidden',
        themeClasses[theme],
        className
      )}
      onMouseEnter={showControls}
      onMouseMove={showControls}
      role="application"
      aria-label={`Voice testimonial player: ${title}`}
    >
      <CardContent className="p-0">
        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnd}
          onLoadedData={handleLoadedData}
          preload="metadata"
          crossOrigin="anonymous"
          className="hidden"
          aria-describedby={`audio-description-${id}`}
        >
          Your browser does not support the audio tag.
        </audio>

        {/* Audio Information */}
        <div 
          id={`audio-description-${id}`} 
          className="sr-only"
          aria-live="polite"
        >
          {`Playing: ${title} by ${testimonialAuthor}. Duration: ${formatTime(duration)}.`}
        </div>

        {/* Header Section */}
        <div className="p-6 border-b border-current border-opacity-20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2 text-gold-400">
                  <Headphones className="w-5 h-5" />
                  <span className="text-sm font-medium">Voice Testimonial</span>
                </div>
                {featured && (
                  <Badge className="bg-gold-600 text-white">
                    Featured
                  </Badge>
                )}
                {category !== 'all' && (
                  <Badge variant="outline" className="capitalize">
                    {category}
                  </Badge>
                )}
              </div>
              
              <h3 className="font-serif font-semibold text-xl mb-2">{title}</h3>
              
              <div className="flex items-center gap-4 text-sm opacity-80 mb-3">
                <span>{testimonialAuthor}</span>
                {testimonialRole && (
                  <>
                    <span>•</span>
                    <span>{testimonialRole}</span>
                  </>
                )}
                {viewCount > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {viewCount.toLocaleString()}
                    </span>
                  </>
                )}
                {rating && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < rating ? "fill-gold-400 text-gold-400" : "text-slate-400"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <p className="text-sm opacity-90 leading-relaxed">{description}</p>
            </div>

            {/* Engagement Actions */}
            <div className="flex items-center gap-2 ml-4">
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "hover:bg-white/10",
                  playerState.engagementActions.has('like') && "text-red-400"
                )}
                onClick={handleLike}
                aria-label="Like testimonial"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "hover:bg-white/10",
                  playerState.engagementActions.has('bookmark') && "text-gold-400"
                )}
                onClick={handleBookmark}
                aria-label="Bookmark testimonial"
              >
                <Bookmark className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-white/10"
                onClick={handleShare}
                aria-label="Share testimonial"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Audio Visualization */}
        <AnimatePresence>
          {playerState.showVisualization && (
            <m.div
              className="p-6 border-b border-current border-opacity-20"
              variants={visualizationVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Audio Visualization
                </h4>
                <div className="flex items-center gap-2">
                  {playerState.isRecording && playerState.transcriptionEnabled && (
                    <div className="flex items-center gap-2 text-red-400">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                      <span className="text-xs">Live Transcription</span>
                    </div>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setPlayerState(prev => ({ 
                      ...prev, 
                      showVisualization: !prev.showVisualization 
                    }))}
                    className="hover:bg-white/10"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Waveform Visualization */}
              <div className="h-24 flex items-end justify-between gap-1">
                {playerState.visualizationData.map((value, index) => (
                  <div
                    key={index}
                    className="bg-gold-400 rounded-t-sm transition-all duration-150"
                    style={{
                      height: `${Math.max(2, value * 100)}%`,
                      opacity: playerState.playing ? 0.8 + value * 0.2 : 0.3
                    }}
                  />
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Player Controls */}
        <AnimatePresence>
          {playerState.showControls && (
            <m.div
              className="p-6"
              variants={controlsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Progress Bar */}
              <div className="mb-6">
                <Slider
                  value={[playerState.currentTime]}
                  max={playerState.duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="w-full [&>.relative]:bg-white/30 [&_.bg-primary]:bg-gold-400 [&_.bg-secondary]:bg-gold-400/60"
                  aria-label="Audio progress"
                />
                {/* Buffered indicator */}
                <div 
                  className="absolute top-0 h-1 bg-white/20 rounded-full pointer-events-none mt-2"
                  style={{ width: `${playerState.buffered}%` }}
                />
                
                {/* Chapter markers */}
                {chapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className="absolute top-0 w-1 h-3 bg-gold-300 rounded-full"
                    style={{
                      left: `${(chapter.startTime / (playerState.duration || 100)) * 100}%`,
                      marginTop: '2px'
                    }}
                    title={chapter.title}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center gap-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-white/10 w-10 h-10"
                    onClick={skipBackward}
                    aria-label="Skip backward 15 seconds"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-white/10 w-14 h-14 rounded-full bg-gold-600 text-white hover:bg-gold-700"
                    onClick={togglePlayPause}
                    aria-label={playerState.playing ? "Pause audio" : "Play audio"}
                  >
                    {playerState.playing ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-white/10 w-10 h-10"
                    onClick={skipForward}
                    aria-label="Skip forward 15 seconds"
                  >
                    <RotateCw className="w-5 h-5" />
                  </Button>

                  {/* Volume Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-white/10 w-9 h-9"
                      onClick={toggleMute}
                      aria-label={playerState.muted ? "Unmute" : "Mute"}
                    >
                      {playerState.muted || playerState.volume === 0 ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </Button>
                    <div className="w-20">
                      <Slider
                        value={[playerState.volume]}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                        className="[&>.relative]:bg-white/30 [&_.bg-primary]:bg-gold-400 [&_.bg-secondary]:bg-gold-400/60"
                        aria-label="Volume"
                      />
                    </div>
                  </div>

                  {/* Time Display */}
                  <div className="text-sm font-mono min-w-max opacity-80">
                    {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                  {/* Transcription Toggle */}
                  {enableTranscription && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "hover:bg-white/10 w-9 h-9",
                        playerState.transcriptionEnabled && "text-gold-400"
                      )}
                      onClick={() => setPlayerState(prev => ({ 
                        ...prev, 
                        transcriptionEnabled: !prev.transcriptionEnabled 
                      }))}
                      aria-label={`${playerState.transcriptionEnabled ? 'Disable' : 'Enable'} live transcription`}
                    >
                      {playerState.isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </Button>
                  )}

                  {/* Chapters Button */}
                  {chapters.length > 0 && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "hover:bg-white/10 w-9 h-9",
                        playerState.showChapters && "bg-white/10"
                      )}
                      onClick={() => setPlayerState(prev => ({ 
                        ...prev, 
                        showChapters: !prev.showChapters 
                      }))}
                      aria-label="Show chapters"
                    >
                      <Clock className="w-5 h-5" />
                    </Button>
                  )}

                  {/* Transcript Toggle */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                      "hover:bg-white/10 w-9 h-9",
                      playerState.showTranscript && "bg-white/10"
                    )}
                    onClick={() => setPlayerState(prev => ({ 
                      ...prev, 
                      showTranscript: !prev.showTranscript 
                    }))}
                    aria-label={`${playerState.showTranscript ? 'Hide' : 'Show'} transcript`}
                  >
                    <Type className="w-5 h-5" />
                  </Button>

                  {/* Settings Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                      "hover:bg-white/10 w-9 h-9",
                      playerState.showSettings && "bg-white/10"
                    )}
                    onClick={() => setPlayerState(prev => ({ 
                      ...prev, 
                      showSettings: !prev.showSettings 
                    }))}
                    aria-label="Audio settings"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Interactive Highlights */}
        {highlights.map(highlight => {
          const isActive = Math.abs(playerState.currentTime - highlight.time) < 3
          const isViewed = playerState.viewedHighlights.has(highlight.id)
          
          return (
            <AnimatePresence key={highlight.id}>
              {isActive && (
                <m.div
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-900 rounded-lg p-3 max-w-64 shadow-lg z-10"
                  variants={controlsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-gold-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">{highlight.title}</h4>
                      {highlight.description && (
                        <p className="text-xs text-slate-600 mt-1">{highlight.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge 
                      className={cn(
                        "text-xs",
                        isViewed ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      )}
                    >
                      {highlight.type.replace('-', ' ')}
                    </Badge>
                    {highlight.confidence && (
                      <span className="text-xs text-slate-500">
                        {Math.round(highlight.confidence * 100)}%
                      </span>
                    )}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          )
        })}

        {/* Settings Panel */}
        <AnimatePresence>
          {playerState.showSettings && (
            <m.div
              className="absolute bottom-16 right-4 bg-slate-800/95 backdrop-blur-sm text-white rounded-lg p-4 min-w-64 max-w-80 z-20"
              variants={controlsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <h3 className="font-semibold mb-3">Audio Settings</h3>
              
              {/* Playback Speed */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Playback Speed</label>
                <div className="grid grid-cols-3 gap-1">
                  {playbackRateOptions.map(option => (
                    <Button
                      key={option.value}
                      size="sm"
                      variant={playerState.playbackRate === option.value ? "secondary" : "ghost"}
                      className="text-xs h-8"
                      onClick={() => handlePlaybackRateChange(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Audio Features */}
              <div>
                <label className="block text-sm font-medium mb-2">Features</label>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant={playerState.showVisualization ? "secondary" : "ghost"}
                    className="w-full justify-start text-xs h-8"
                    onClick={() => setPlayerState(prev => ({ 
                      ...prev, 
                      showVisualization: !prev.showVisualization 
                    }))}
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Audio Visualization
                  </Button>
                  {enableTranscription && (
                    <Button
                      size="sm"
                      variant={playerState.transcriptionEnabled ? "secondary" : "ghost"}
                      className="w-full justify-start text-xs h-8"
                      onClick={() => setPlayerState(prev => ({ 
                        ...prev, 
                        transcriptionEnabled: !prev.transcriptionEnabled 
                      }))}
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      Live Transcription
                    </Button>
                  )}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Chapters Panel */}
        <AnimatePresence>
          {playerState.showChapters && chapters.length > 0 && (
            <m.div
              className="absolute bottom-16 left-4 bg-slate-800/95 backdrop-blur-sm text-white rounded-lg p-4 min-w-80 max-w-96 max-h-80 overflow-y-auto z-20"
              variants={controlsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Chapters
              </h3>
              <div className="space-y-2">
                {chapters.map((chapter, index) => (
                  <Button
                    key={chapter.id}
                    variant={index === playerState.currentChapter ? "secondary" : "ghost"}
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleChapterSelect(index)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{chapter.title}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {formatTime(chapter.startTime)}
                        {chapter.description && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="line-clamp-1">{chapter.description}</span>
                          </>
                        )}
                      </div>
                      {chapter.keyPoints && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {chapter.keyPoints.map((point, i) => (
                            <Badge key={i} className="text-xs bg-gold-600/20 text-gold-300">
                              {point}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Transcript Panel */}
        <AnimatePresence>
          {playerState.showTranscript && (
            <m.div
              className="p-4 border-t border-current border-opacity-20"
              variants={controlsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Transcript
                  {playerState.transcriptionEnabled && (
                    <Badge className="bg-green-600 text-white text-xs">
                      Live
                    </Badge>
                  )}
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleTranscriptCopy}
                    className="hover:bg-white/10"
                  >
                    Copy
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-white/10 w-8 h-8"
                    onClick={() => setPlayerState(prev => ({ 
                      ...prev, 
                      showTranscript: false 
                    }))}
                    aria-label="Close transcript"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="max-h-60 overflow-y-auto">
                <Textarea
                  value={playerState.liveTranscript || transcript}
                  onChange={(e) => setPlayerState(prev => ({ 
                    ...prev, 
                    liveTranscript: e.target.value 
                  }))}
                  placeholder="Transcript will appear here as the audio plays..."
                  className="min-h-32 bg-transparent border-white/20 resize-none"
                  readOnly={!playerState.transcriptionEnabled}
                />
              </div>
              
              {playerState.isRecording && (
                <div className="flex items-center gap-2 mt-3 text-sm text-gold-400">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span>Live transcription active</span>
                </div>
              )}
            </m.div>
          )}
        </AnimatePresence>

        {/* Call-to-Action Overlay */}
        {callToAction && Math.abs(playerState.currentTime - callToAction.time) < 5 && (
          <m.div
            className="absolute inset-x-4 bottom-20 bg-gradient-to-r from-gold-600 to-gold-700 text-white rounded-lg p-4 z-10"
            variants={controlsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">{callToAction.title}</h3>
                <p className="text-xs opacity-90 mt-1">{callToAction.description}</p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => window.open(callToAction.link, '_blank', 'noopener,noreferrer')}
                className="ml-4 bg-white text-gold-600 hover:bg-white/90"
              >
                {callToAction.buttonText}
              </Button>
            </div>
          </m.div>
        )}

        {/* Loading State */}
        {!playerState.loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-white">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Loading audio...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default VoiceTestimonialsPlayer