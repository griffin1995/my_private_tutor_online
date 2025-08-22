// CONTEXT7 SOURCE: /framer/motion - Optimized globe component without heavy 3D dependencies
// PERFORMANCE OPTIMIZATION REASON: Phase 6 bundle reduction - replaced heavy cobe dependency with lightweight CSS animation
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  config?: any; // Kept for backward compatibility
}

export function Globe({ className }: GlobeProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <motion.div
        className="relative size-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Simplified globe visualization with CSS gradients */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700"
          animate={{ 
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Globe grid lines */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-300/30 dark:border-blue-600/30" />
          <div className="absolute inset-2 rounded-full border border-blue-300/20 dark:border-blue-600/20" />
          <div className="absolute inset-4 rounded-full border border-blue-300/15 dark:border-blue-600/15" />
          
          {/* Continent markers */}
          <div className="absolute top-1/3 left-1/4 size-2 rounded-full bg-orange-400 shadow-lg" />
          <div className="absolute top-1/2 right-1/3 size-1.5 rounded-full bg-orange-400 shadow-lg" />
          <div className="absolute bottom-1/3 left-1/2 size-1 rounded-full bg-orange-400 shadow-lg" />
          <div className="absolute top-2/3 right-1/4 size-1.5 rounded-full bg-orange-400 shadow-lg" />
        </motion.div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-transparent via-blue-100/20 to-blue-200/30 dark:from-transparent dark:via-blue-900/20 dark:to-blue-800/30" />
      </motion.div>
    </div>
  );
}
