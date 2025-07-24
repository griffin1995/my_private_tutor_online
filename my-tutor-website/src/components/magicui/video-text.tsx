"use client"

import React from "react"
import { m } from "framer-motion"
import { cn } from "@/lib/utils"

interface VideoTextProps {
  text: string
  framerProps?: {
    hidden: Record<string, unknown>
    show: Record<string, unknown>
  }
  className?: string
}

export function VideoText({
  text,
  framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  },
  className,
}: VideoTextProps) {
  const MotionH1 = m.h1
  const letters = Array.from(text)

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex justify-center">
      <MotionH1
        variants={framerProps}
        initial="hidden"
        animate="show"
        className={cn(
          "text-center font-display font-bold tracking-[-0.02em] drop-shadow-sm",
          className,
        )}
      >
        {letters.map((letter, i) => (
          <m.span
            key={i}
            variants={letterVariants}
            className="inline-block"
            style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </m.span>
        ))}
      </MotionH1>
    </div>
  )
}

