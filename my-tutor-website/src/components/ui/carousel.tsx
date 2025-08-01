"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { m, AnimatePresence } from "framer-motion"

interface CarouselItem {
  id: string | number
  content: React.ReactNode
}

interface CarouselProps {
  items: CarouselItem[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
  showDots?: boolean
  centerMode?: boolean
}

export function Carousel({
  items,
  className,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  centerMode = false,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!autoPlay || isHovered) return

    const interval = setInterval(() => {
      handleNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [currentIndex, autoPlay, autoPlayInterval, isHovered])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const getItemStyle = (index: number) => {
    if (!centerMode) return {}
    
    const diff = index - currentIndex
    const isActive = diff === 0
    const isPrev = diff === -1 || (currentIndex === 0 && index === items.length - 1)
    const isNext = diff === 1 || (currentIndex === items.length - 1 && index === 0)
    
    if (isActive) {
      return {
        transform: "scale(1.1) translateX(0)",
        opacity: 1,
        zIndex: 3,
      }
    } else if (isPrev) {
      return {
        transform: "scale(0.9) translateX(-60%)",
        opacity: 0.7,
        zIndex: 2,
      }
    } else if (isNext) {
      return {
        transform: "scale(0.9) translateX(60%)",
        opacity: 0.7,
        zIndex: 2,
      }
    } else {
      return {
        transform: "scale(0.8)",
        opacity: 0,
        zIndex: 1,
      }
    }
  }

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <div className={cn(
          "flex transition-all duration-500",
          centerMode ? "justify-center" : ""
        )}>
          {centerMode ? (
            <div className="relative flex items-center justify-center h-[400px] w-full">
              {items.map((item, index) => (
                <m.div
                  key={item.id}
                  className="absolute w-full max-w-lg px-4"
                  animate={getItemStyle(index)}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {item.content}
                </m.div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <m.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {items[currentIndex].content}
              </m.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-primary-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-primary-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "w-8 bg-accent-600"
                  : "bg-primary-300 hover:bg-primary-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}