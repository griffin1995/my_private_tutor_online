/**
 * CONTEXT7 SOURCE: /vercel/next.js - Privacy-compliant consent management for analytics
 * CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GDPR-compliant GA4 integration
 * 
 * Privacy Consent Banner Component
 * GDPR-compliant consent management for FAQ analytics tracking
 * 
 * PRIVACY COMPLIANCE: 
 * - GDPR Article 7 compliant consent collection
 * - Granular consent controls for different data types
 * - Clear privacy policy communication
 * - User-friendly consent management
 * 
 * BUSINESS CONTEXT:
 * - Maintains premium service standards
 * - Ensures legal compliance for UK/EU visitors
 * - Preserves analytics data quality through informed consent
 * - British English and royal client-worthy presentation
 */

"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { updateGA4Consent } from './ga4-setup'

// CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Consent categories configuration
// CONSENT CATEGORIES: Granular consent management for different data types
interface ConsentCategories {
  necessary: boolean // Always true - required for basic functionality
  analytics: boolean // GA4 analytics and FAQ tracking
  marketing: boolean // Marketing and personalisation
  preferences: boolean // User experience preferences
}

interface ConsentBannerProps {
  showBanner?: boolean
  onConsentChange?: (consent: ConsentCategories) => void
  privacyPolicyUrl?: string
  compactMode?: boolean
  position?: 'bottom' | 'top'
  theme?: 'light' | 'dark' | 'royal'
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Privacy consent banner with FAQ analytics integration
 * CONSENT BANNER: Premium privacy consent management for royal client standards
 */
export function ConsentBanner({
  showBanner = true,
  onConsentChange,
  privacyPolicyUrl = '/privacy-policy',
  compactMode = false,
  position = 'bottom',
  theme = 'royal'
}: ConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<ConsentCategories>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false
  })

  // CONTEXT7 SOURCE: /vercel/next.js - Local storage consent persistence
  // CONSENT PERSISTENCE: Manage consent state across browser sessions
  useEffect(() => {
    const storedConsent = localStorage.getItem('privacy-consent')
    const consentTimestamp = localStorage.getItem('consent-timestamp')
    
    if (storedConsent && consentTimestamp) {
      const timestamp = parseInt(consentTimestamp, 10)
      const thirtyDays = 30 * 24 * 60 * 60 * 1000
      
      // Check if consent is still valid (within 30 days)
      if (Date.now() - timestamp < thirtyDays) {
        const parsedConsent = JSON.parse(storedConsent)
        setConsent(parsedConsent)
        
        // Apply consent to GA4
        updateGA4Consent({
          consentGiven: parsedConsent.analytics,
          analyticsStorage: parsedConsent.analytics ? 'granted' : 'denied',
          adStorage: parsedConsent.marketing ? 'granted' : 'denied',
          functionalityStorage: parsedConsent.preferences ? 'granted' : 'denied',
          personalizationStorage: parsedConsent.marketing ? 'granted' : 'denied'
        })
        
        setIsVisible(false)
        return
      }
    }
    
    // Show banner if no valid consent found
    if (showBanner) {
      setIsVisible(true)
    }
  }, [showBanner])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Consent application utility
  // CONSENT APPLICATION: Apply consent settings to analytics services
  const applyConsent = useCallback((newConsent: ConsentCategories) => {
    setConsent(newConsent)
    
    // Store consent with timestamp
    localStorage.setItem('privacy-consent', JSON.stringify(newConsent))
    localStorage.setItem('consent-timestamp', Date.now().toString())
    
    // Update GA4 consent
    updateGA4Consent({
      consentGiven: newConsent.analytics,
      analyticsStorage: newConsent.analytics ? 'granted' : 'denied',
      adStorage: newConsent.marketing ? 'granted' : 'denied',
      functionalityStorage: newConsent.preferences ? 'granted' : 'denied',
      personalizationStorage: newConsent.marketing ? 'granted' : 'denied',
      securityStorage: 'granted' // Always granted for security
    })
    
    // Notify parent component
    onConsentChange?.(newConsent)
    
    // Track consent decision (only if analytics consent given)
    if (newConsent.analytics && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'privacy_consent_given', {
        event_category: 'Privacy_Management',
        event_label: 'FAQ_Analytics_Consent',
        consent_analytics: newConsent.analytics,
        consent_marketing: newConsent.marketing,
        consent_preferences: newConsent.preferences,
        non_interaction: true
      })
    }
    
    setIsVisible(false)
  }, [onConsentChange])

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Premium styling for royal client standards
  // THEME CONFIGURATION: Royal theme styling for premium presentation
  const themeStyles = {
    royal: {
      background: 'bg-gradient-to-r from-primary-900 via-primary-800 to-slate-900',
      text: 'text-white',
      accent: 'text-accent-400',
      button: 'bg-accent-500 hover:bg-accent-600 text-white',
      buttonSecondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
      card: 'bg-white/10 backdrop-blur-sm border border-white/20'
    },
    light: {
      background: 'bg-white',
      text: 'text-slate-900',
      accent: 'text-primary-600',
      button: 'bg-primary-600 hover:bg-primary-700 text-white',
      buttonSecondary: 'bg-slate-200 hover:bg-slate-300 text-slate-900',
      card: 'bg-slate-50 border border-slate-200'
    },
    dark: {
      background: 'bg-slate-900',
      text: 'text-white',
      accent: 'text-primary-400',
      button: 'bg-primary-600 hover:bg-primary-700 text-white',
      buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-white',
      card: 'bg-slate-800 border border-slate-700'
    }
  }

  const currentTheme = themeStyles[theme]

  // Quick accept all consent
  const handleAcceptAll = () => {
    applyConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    })
  }

  // Accept only necessary cookies
  const handleNecessaryOnly = () => {
    applyConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    })
  }

  // Handle custom consent selection
  const handleCustomConsent = () => {
    applyConsent(consent)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0, y: position === 'bottom' ? 100 : -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: position === 'bottom' ? 100 : -100 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed ${position === 'bottom' ? 'bottom-0' : 'top-0'} left-0 right-0 z-50 ${currentTheme.background} ${currentTheme.text} shadow-2xl`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {!compactMode ? (
            // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Full consent banner layout
            // FULL BANNER: Comprehensive consent management interface
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🍪</span>
                    </div>
                    <h3 className="text-lg font-semibold">Privacy & Analytics Consent</h3>
                  </div>
                  
                  <p className={`text-sm ${currentTheme.text}/90 leading-relaxed`}>
                    We use analytics to understand how you interact with our FAQ system, helping us improve your experience and provide better support. 
                    Your data helps us maintain our royal standard of service whilst respecting your privacy.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      ✓ Royal Client Privacy Standards
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      ✓ GDPR Compliant
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                      ✓ Enhanced FAQ Experience
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${currentTheme.buttonSecondary}`}
                  >
                    {showDetails ? 'Hide Details' : 'Customise'}
                  </button>
                  <button
                    onClick={handleNecessaryOnly}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${currentTheme.buttonSecondary}`}
                  >
                    Necessary Only
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${currentTheme.button}`}
                  >
                    Accept All
                  </button>
                </div>
              </div>
              
              {showDetails && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${currentTheme.card} rounded-lg p-4 space-y-4`}
                >
                  <h4 className="font-semibold mb-3">Customise Your Privacy Settings</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Necessary cookies - always enabled */}
                    <div className="flex items-start justify-between p-3 bg-slate-100/10 rounded-lg">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">Necessary</h5>
                        <p className="text-xs mt-1 opacity-75">Essential for website functionality</p>
                      </div>
                      <div className="ml-3">
                        <input
                          type="checkbox"
                          checked={true}
                          disabled={true}
                          className="w-4 h-4 text-accent-500 rounded"
                        />
                      </div>
                    </div>
                    
                    {/* Analytics consent */}
                    <div className="flex items-start justify-between p-3 bg-slate-100/10 rounded-lg">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">FAQ Analytics</h5>
                        <p className="text-xs mt-1 opacity-75">Track FAQ usage to improve content</p>
                      </div>
                      <div className="ml-3">
                        <input
                          type="checkbox"
                          checked={consent.analytics}
                          onChange={(e) => setConsent({...consent, analytics: e.target.checked})}
                          className="w-4 h-4 text-accent-500 rounded"
                        />
                      </div>
                    </div>
                    
                    {/* Marketing consent */}
                    <div className="flex items-start justify-between p-3 bg-slate-100/10 rounded-lg">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">Marketing</h5>
                        <p className="text-xs mt-1 opacity-75">Personalised content and recommendations</p>
                      </div>
                      <div className="ml-3">
                        <input
                          type="checkbox"
                          checked={consent.marketing}
                          onChange={(e) => setConsent({...consent, marketing: e.target.checked})}
                          className="w-4 h-4 text-accent-500 rounded"
                        />
                      </div>
                    </div>
                    
                    {/* Preferences consent */}
                    <div className="flex items-start justify-between p-3 bg-slate-100/10 rounded-lg">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">Preferences</h5>
                        <p className="text-xs mt-1 opacity-75">Remember your settings and choices</p>
                      </div>
                      <div className="ml-3">
                        <input
                          type="checkbox"
                          checked={consent.preferences}
                          onChange={(e) => setConsent({...consent, preferences: e.target.checked})}
                          className="w-4 h-4 text-accent-500 rounded"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-white/20">
                    <a
                      href={privacyPolicyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm ${currentTheme.accent} hover:underline`}
                    >
                      View Privacy Policy
                    </a>
                    <button
                      onClick={handleCustomConsent}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${currentTheme.button}`}
                    >
                      Save Preferences
                    </button>
                  </div>
                </m.div>
              )}
            </div>
          ) : (
            // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Compact consent banner layout
            // COMPACT BANNER: Simplified consent interface for mobile/space-constrained layouts
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm">
                  We use analytics to improve your FAQ experience. 
                  <a href={privacyPolicyUrl} className={`${currentTheme.accent} hover:underline ml-1`}>
                    Privacy Policy
                  </a>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleNecessaryOnly}
                  className={`px-3 py-1.5 rounded text-sm ${currentTheme.buttonSecondary}`}
                >
                  Decline
                </button>
                <button
                  onClick={handleAcceptAll}
                  className={`px-3 py-1.5 rounded text-sm ${currentTheme.button}`}
                >
                  Accept
                </button>
              </div>
            </div>
          )}
        </div>
      </m.div>
    </AnimatePresence>
  )
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Consent status utility hook
 * CONSENT HOOK: React hook for accessing current consent status
 */
export function useConsentStatus() {
  const [consent, setConsent] = useState<ConsentCategories>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  })

  useEffect(() => {
    const storedConsent = localStorage.getItem('privacy-consent')
    if (storedConsent) {
      setConsent(JSON.parse(storedConsent))
    }

    // Listen for consent changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'privacy-consent' && e.newValue) {
        setConsent(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return consent
}

export default ConsentBanner