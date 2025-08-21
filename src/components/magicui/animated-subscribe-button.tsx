"use client"

// CONTEXT7 SOURCE: /vercel/next.js - Next.js useRouter hook for programmatic navigation
// BUTTON FUNCTIONALITY FIX: Official Next.js documentation enables client-side navigation in button onClick handlers
import React, { useState } from "react"
import { AnimatePresence, m } from "framer-motion"
import { CheckIcon, PlusIcon } from "lucide-react"
import { useRouter } from 'next/navigation'

interface AnimatedSubscribeButtonProps {
  buttonColor: string
  buttonTextColor: string
  subscribeStatus: boolean
  initialText: string
  changeText: string
  onToggle?: () => void
  // CONTEXT7 SOURCE: /vercel/next.js - Next.js Link component navigation patterns
  // NAVIGATION ENHANCEMENT: Official Next.js documentation enables href prop for button navigation
  navigationUrl?: string
  // CONTEXT7 SOURCE: /reactjs/react.dev - React onClick handler patterns for external actions
  // EXTERNAL ACTION ENHANCEMENT: Official React documentation enables custom action handling in button components
  externalAction?: () => void
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
  navigationUrl,
  externalAction,
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus)
  // CONTEXT7 SOURCE: /vercel/next.js - useRouter hook for programmatic client-side navigation
  // ROUTER IMPLEMENTATION: Official Next.js documentation shows useRouter pattern for button navigation
  const router = useRouter()

  // CONTEXT7 SOURCE: /reactjs/react.dev - React event handler patterns with multiple action support
  // ENHANCED CLICK HANDLER: Official React documentation enables combining state updates with navigation actions
  const handleClick = () => {
    setIsSubscribed(!isSubscribed)
    if (onToggle) {
      onToggle()
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Programmatic client-side navigation with useRouter hook
    // NAVIGATION LOGIC: Official Next.js documentation shows router.push() for button-triggered navigation
    if (navigationUrl) {
      router.push(navigationUrl)
    }
    
    // CONTEXT7 SOURCE: /reactjs/react.dev - Custom action execution in React event handlers
    // EXTERNAL ACTION EXECUTION: Official React documentation enables custom function calls in onClick handlers
    if (externalAction) {
      externalAction()
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isSubscribed ? (
        <m.button
          className="relative flex w-[200px] items-center justify-center overflow-hidden rounded-md bg-white p-[10px] outline outline-1 outline-black"
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <m.span
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
          </m.span>
        </m.button>
      ) : (
        <m.button
          className="relative flex w-[200px] cursor-pointer items-center justify-center rounded-md border-none p-[10px]"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <m.span
            key="reaction"
            className="relative block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            <span className="flex items-center justify-center gap-2">
              <PlusIcon className="h-4 w-4" />
              {initialText}
            </span>
          </m.span>
        </m.button>
      )}
    </AnimatePresence>
  )
}