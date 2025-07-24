"use client"

import { useEffect, useRef } from "react"
import { m } from "framer-motion"
import { cn } from "@/lib/utils"

interface VideoTextProps {
  text: string
  duration?: number
  framerProps?: {
    hidden: any
    show: any
  }
  className?: string
}

export function VideoText({
  text,
  duration = 2000,
  framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  },
  className,
}: VideoTextProps) {
  const MotionH1 = motion.h1
  const letters = Array.from(text)

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05, // Delay each letter's animation by 0.05 seconds
        duration: 0.4,
      },
    }),
  }

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

