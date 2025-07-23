"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckIcon, PlusIcon } from "lucide-react"

interface AnimatedSubscribeButtonProps {
  buttonColor: string
  buttonTextColor: string
  subscribeStatus: boolean
  initialText: string
  changeText: string
  onToggle?: () => void
}

export const AnimatedSubscribeButton: React.FC<
  AnimatedSubscribeButtonProps
> = ({
  buttonColor,
  buttonTextColor,
  subscribeStatus,
  initialText,
  changeText,
  onToggle,
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus)

  const handleClick = () => {
    setIsSubscribed(!isSubscribed)
    if (onToggle) {
      onToggle()
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isSubscribed ? (
        <motion.button
          className="relative flex w-[200px] items-center justify-center overflow-hidden rounded-md bg-white p-[10px] outline outline-1 outline-black"
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="action"
            className="relative block h-full w-full font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            style={{ color: buttonColor }}
          >
            <span className="flex items-center justify-center gap-2">
              <CheckIcon className="h-4 w-4" />
              {changeText}
            </span>
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          className="relative flex w-[200px] cursor-pointer items-center justify-center rounded-md border-none p-[10px]"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="reaction"
            className="relative block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            <span className="flex items-center justify-center gap-2">
              <PlusIcon className="h-4 w-4" />
              {initialText}
            </span>
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}