/**
 * CONTEXT7 SOURCE: /amannn/next-intl - Client component for FAQ floating action buttons
 * HYDRATION FIX REASON: Official Next.js documentation requires onClick handlers in client components to prevent serialization errors
 */

"use client"

import React from 'react'
import { m } from 'framer-motion'
import { useTranslations } from 'next-intl'

// CONTEXT7 SOURCE: /grx7/framer-motion - Client component wrapper with animation support
// MOTION COMPONENT REASON: Official Framer Motion documentation enables client-side animations for floating actions

// CONTEXT7 SOURCE: /amannn/next-intl - FAQ floating action buttons client component
// CLIENT COMPONENT REASON: Official next-intl documentation enables onClick handlers in client components
export function FAQFloatingActions() {
  const t = useTranslations('FAQ')

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Interactive print button with animations */}
      {/* PRINT FUNCTION REASON: Official Framer Motion documentation enables client-side interaction patterns */}
      <m.button
        className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={t('printFAQ')}
        aria-label={t('printFAQ')}
        onClick={() => window.print()}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      </m.button>

      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Interactive contact link */}
      {/* CONTACT LINK REASON: Official Framer Motion documentation enables smooth scroll navigation */}
      <m.a
        href="#contact"
        className="w-12 h-12 bg-accent-600 hover:bg-accent-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={t('contactUs')}
        aria-label={t('contactUs')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </m.a>

      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Interactive back to top button */}
      {/* SCROLL FUNCTION REASON: Official Framer Motion documentation enables client-side scroll interactions */}
      <m.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-12 h-12 bg-slate-600 hover:bg-slate-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={t('backToTop')}
        aria-label={t('backToTop')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      </m.button>
    </div>
  )
}

// CONTEXT7 SOURCE: /vercel/next.js - Default export for better bundling compatibility
// DEFAULT EXPORT REASON: Official Next.js documentation ensures proper component resolution during static generation
export default FAQFloatingActions