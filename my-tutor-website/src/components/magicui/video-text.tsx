"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// CMS DATA SOURCE: Following official Magic UI video-text documentation patterns
// CLAUDE.md Rule 31: Using official library documentation only

interface VideoTextProps {
  src: string
  children: React.ReactNode
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  preload?: string
  fontSize?: string | number
  fontWeight?: string | number
  textAnchor?: string
  dominantBaseline?: string
  fontFamily?: string
  as?: React.ElementType
}

export function VideoText({
  src,
  children,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
}: VideoTextProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [maskId, setMaskId] = useState("")

  useEffect(() => {
    // Generate unique mask ID to prevent conflicts
    setMaskId(`video-text-mask-${Math.random().toString(36).substr(2, 9)}`)
  }, [])

  // If no video source provided, render fallback
  if (!src) {
    return (
      <Component className={cn("relative flex items-center justify-center bg-primary-900 text-white", className)}>
        <div 
          className="text-center font-serif font-bold"
          style={{ fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize }}
        >
          {children}
        </div>
      </Component>
    )
  }

  return (
    <Component className={cn("relative overflow-hidden", className)}>
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        preload={preload}
        style={{
          mask: `url(#${maskId})`,
          WebkitMask: `url(#${maskId})`,
        }}
      >
        <source src={src} type="video/mp4" />
        <source src={src?.replace('.mp4', '.webm') || src} type="video/webm" />
        {/* Fallback text for accessibility */}
        Your browser does not support the video tag.
      </video>

      {/* SVG Mask */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              textAnchor={textAnchor}
              dominantBaseline={dominantBaseline}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontFamily={fontFamily}
              fill="white"
            >
              {children}
            </text>
          </mask>
        </defs>
      </svg>

      {/* Accessible text for screen readers */}
      <span className="sr-only">{children}</span>
    </Component>
  )
}

