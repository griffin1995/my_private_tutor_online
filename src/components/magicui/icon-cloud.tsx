// CONTEXT7 SOURCE: /framer/motion - Optimized icon cloud without heavy dependencies
// PERFORMANCE OPTIMIZATION REASON: Phase 6 bundle reduction - replaced heavy react-icon-cloud with lightweight CSS grid animation
"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ImageItem {
  src: string
  alt: string
  width?: number
  height?: number
}

export type DynamicCloudProps = {
  iconSlugs: string[]
  imageArray?: ImageItem[]
}

// Simple icon mapping for common tech icons
const iconMapping: Record<string, string> = {
  react: "⚛️",
  typescript: "🔷",
  javascript: "🟨",
  nextjs: "▲",
  nodejs: "🟢",
  python: "🐍",
  html5: "🌐",
  css3: "🎨",
  git: "📚",
  github: "🐙",
  vercel: "▲",
  tailwindcss: "💨",
  mongodb: "🍃",
  postgresql: "🐘",
  docker: "🐋",
  aws: "☁️",
  gcp: "☁️",
  firebase: "🔥",
  graphql: "◉",
  redux: "🔄"
}

export default function IconCloud({ iconSlugs, imageArray }: DynamicCloudProps) {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="relative grid grid-cols-4 gap-4 max-w-md">
        {iconSlugs.map((slug, index) => (
          <motion.div
            key={slug}
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 100 
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
          >
            <span className="text-xl" title={slug}>
              {iconMapping[slug] || "⚡"}
            </span>
          </motion.div>
        ))}
        
        {imageArray?.map((image, index) => (
          <motion.div
            key={`img-${index}`}
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: (iconSlugs.length + index) * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 100 
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: -5,
              transition: { duration: 0.2 }
            }}
          >
            <img 
              src={image.src}
              alt={image.alt}
              width={image.width || 32}
              height={image.height || 32}
              className="object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { IconCloud }