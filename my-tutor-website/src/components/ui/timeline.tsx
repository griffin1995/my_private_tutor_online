"use client"

import { cn } from "@/lib/utils"
import { m } from "framer-motion"
import { Check } from "lucide-react"

interface TimelineItem {
  title: string
  description: string
  icon?: React.ReactNode
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200" />
      
      {items.map((item, index) => (
        <m.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative flex items-start mb-8 last:mb-0"
        >
          {/* Circle indicator */}
          <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white border-4 border-accent-500 rounded-full shadow-lg">
            {item.icon || (
              <m.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                <Check className="w-6 h-6 text-accent-600" />
              </m.div>
            )}
          </div>
          
          {/* Content */}
          <div className="ml-8 flex-1">
            <h3 className="text-xl font-serif font-bold text-primary-900 mb-2">
              Step {index + 1}: {item.title}
            </h3>
            <p className="text-primary-700 leading-relaxed">
              {item.description}
            </p>
          </div>
        </m.div>
      ))}
    </div>
  )
}

export function TimelineHorizontal({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative overflow-x-auto", className)}>
      <div className="flex items-start space-x-8 pb-4">
        {items.map((item, index) => (
          <m.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-64"
          >
            {/* Connector line */}
            {index < items.length - 1 && (
              <div className="absolute top-8 left-[16rem] w-8 h-0.5 bg-primary-200" />
            )}
            
            {/* Circle indicator */}
            <div className="flex items-center justify-center w-16 h-16 bg-white border-4 border-accent-500 rounded-full shadow-lg mb-4 mx-auto">
              {item.icon || (
                <m.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="text-xl font-bold text-accent-600">{index + 1}</span>
                </m.div>
              )}
            </div>
            
            {/* Content */}
            <div className="text-center">
              <h3 className="text-lg font-serif font-bold text-primary-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-primary-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  )
}