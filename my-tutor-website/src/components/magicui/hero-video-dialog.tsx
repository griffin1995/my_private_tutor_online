"use client"

import { useState, useRef, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { X, Play } from 'lucide-react'
import Image from 'next/image'

type AnimationStyle = 
  | "from-bottom"
  | "from-center" 
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out"

interface HeroVideoDialogProps {
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  className?: string
  animationStyle?: AnimationStyle
}

const animationVariants = {
  "from-bottom": {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" }
  },
  "from-center": {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  "from-top": {
    initial: { opacity: 0, y: "-100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "-100%" }
  },
  "from-left": {
    initial: { opacity: 0, x: "-100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" }
  },
  "from-right": {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" }
  },
  "fade": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  "top-in-bottom-out": {
    initial: { opacity: 0, y: "-100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" }
  },
  "left-in-right-out": {
    initial: { opacity: 0, x: "-100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" }
  }
}

export function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className = "",
  animationStyle = "from-center"
}: HeroVideoDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpen()
    }
  }

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  useEffect(() => {
    // Only manipulate DOM on client side
    if (typeof window === 'undefined') return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose()
      }
      document.addEventListener('keydown', handleKeyDown)
      
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Thumbnail/Trigger */}
      <div
        className={`relative cursor-pointer group ${className}`}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Play video: ${thumbnailAlt}`}
      >
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
            width={800}
            height={450}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colours group-hover:bg-black/30">
            <div className="flex items-center justify-center w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 group-hover:bg-white group-hover:scale-110">
              <Play className="w-6 h-6 text-primary-900 ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            onKeyDown={handleModalKeyDown}
            tabIndex={-1}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colours focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={handleClose}
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Container */}
            <m.div
              className="relative w-full max-w-6xl mx-4 aspect-video"
              variants={animationVariants[animationStyle]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* YouTube Video */}
              {videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be') ? (
                <iframe
                  src={videoSrc}
                  className="w-full h-full rounded-lg shadow-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video player"
                />
              ) : (
                /* Standard Video */
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="w-full h-full rounded-lg shadow-2xl object-cover"
                  controls
                  autoPlay
                  muted
                  playsInline
                  onLoadedData={() => {
                    if (videoRef.current) {
                      videoRef.current.play()
                    }
                  }}
                />
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}