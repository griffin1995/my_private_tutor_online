/**
 * CONTEXT7 SOURCE: /vercel/next.js - Next.js @next/third-parties Google Analytics integration patterns
 * CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 configuration and custom dimensions
 * 
 * Google Analytics 4 Setup Component
 * Comprehensive GA4 integration for My Private Tutor Online with FAQ-specific tracking
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity tracking and optimization
 * GA4 CONFIGURATION: Custom dimensions, events, and conversion goals for FAQ analytics
 * 
 * KEY FEATURES:
 * - FAQ-specific custom dimensions and metrics
 * - Enhanced e-commerce tracking for consultation bookings
 * - Privacy-compliant implementation with consent management
 * - Real-time user interaction monitoring
 * - Business intelligence dashboard preparation
 * 
 * TECHNICAL IMPLEMENTATION:
 * - Next.js @next/third-parties integration
 * - Custom dimension configuration
 * - Conversion goal setup
 * - Privacy-conscious data collection
 */

"use client"

import { useEffect, useState } from 'react'
import { GoogleAnalytics, sendGAEvent } from '@next/third-parties/google'

// CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 measurement configuration
// GA4 CONFIGURATION: Custom dimensions and metrics for FAQ analytics
interface GA4Configuration {
  measurementId: string
  customDimensions: {
    user_segment: 'custom_dimension_1'
    entry_point: 'custom_dimension_2'
    faq_category: 'custom_dimension_3'
    conversion_source: 'custom_dimension_4'
    support_prevention: 'custom_dimension_5'
  }
  conversionGoals: {
    faq_to_consultation: 'FAQ_to_Consultation_Booking'
    faq_to_contact: 'FAQ_to_Contact_Form'
    faq_engagement: 'FAQ_High_Engagement'
    faq_helpful_rating: 'FAQ_Positive_Rating'
  }
  enhancedEcommerce: boolean
  debugMode: boolean
}

// CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Privacy-compliant tracking configuration
// PRIVACY CONFIGURATION: GDPR-compliant analytics setup
interface PrivacySettings {
  consentGiven: boolean
  analyticsStorage: 'granted' | 'denied'
  adStorage: 'granted' | 'denied'
  functionalityStorage: 'granted' | 'denied'
  personalizationStorage: 'granted' | 'denied'
  securityStorage: 'granted' | 'denied'
}

interface GA4SetupProps {
  measurementId?: string
  enableFAQTracking?: boolean
  enableConversions?: boolean
  debugMode?: boolean
  privacySettings?: Partial<PrivacySettings>
  customConfig?: Partial<GA4Configuration>
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - GA4 Setup Component with FAQ-specific configuration
 * GA4 SETUP: Comprehensive Google Analytics integration for FAQ analytics
 */
export function GA4Setup({
  measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  enableFAQTracking = true,
  enableConversions = true,
  debugMode = process.env.NODE_ENV === 'development',
  privacySettings = {},
  customConfig = {}
}: GA4SetupProps) {
  const [isConfigured, setIsConfigured] = useState(false)
  const [consentStatus, setConsentStatus] = useState<PrivacySettings>({
    consentGiven: false,
    analyticsStorage: 'denied',
    adStorage: 'denied',
    functionalityStorage: 'denied',
    personalizationStorage: 'denied',
    securityStorage: 'granted',
    ...privacySettings
  })

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 configuration with custom dimensions
  // GA4 CONFIGURATION: Set up FAQ-specific tracking configuration
  const ga4Config: GA4Configuration = {
    measurementId,
    customDimensions: {
      user_segment: 'custom_dimension_1',
      entry_point: 'custom_dimension_2',
      faq_category: 'custom_dimension_3',
      conversion_source: 'custom_dimension_4',
      support_prevention: 'custom_dimension_5'
    },
    conversionGoals: {
      faq_to_consultation: 'FAQ_to_Consultation_Booking',
      faq_to_contact: 'FAQ_to_Contact_Form',
      faq_engagement: 'FAQ_High_Engagement',
      faq_helpful_rating: 'FAQ_Positive_Rating'
    },
    enhancedEcommerce: enableConversions,
    debugMode,
    ...customConfig
  }

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Privacy consent configuration
  // PRIVACY SETUP: Configure GA4 with privacy-compliant settings
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Configure consent mode before GA4 loads
    if (window.gtag) {
      window.gtag('consent', 'default', {
        analytics_storage: consentStatus.analyticsStorage,
        ad_storage: consentStatus.adStorage,
        functionality_storage: consentStatus.functionalityStorage,
        personalization_storage: consentStatus.personalizationStorage,
        security_storage: consentStatus.securityStorage,
        wait_for_update: 500
      })

      if (debugMode) {
        console.log('[GA4 Setup] Consent configured:', consentStatus)
      }
    }
  }, [consentStatus, debugMode])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 initialization with custom configuration
  // GA4 INITIALIZATION: Set up tracking with FAQ-specific parameters
  useEffect(() => {
    if (typeof window === 'undefined' || !consentStatus.consentGiven) return

    const initializeGA4 = () => {
      if (window.gtag) {
        // Configure GA4 with custom parameters
        window.gtag('config', measurementId, {
          // Privacy settings
          anonymize_ip: true,
          cookie_expires: 63072000, // 2 years
          
          // FAQ-specific configuration
          custom_map: {
            [ga4Config.customDimensions.user_segment]: 'user_segment',
            [ga4Config.customDimensions.entry_point]: 'entry_point',
            [ga4Config.customDimensions.faq_category]: 'faq_category',
            [ga4Config.customDimensions.conversion_source]: 'conversion_source',
            [ga4Config.customDimensions.support_prevention]: 'support_prevention'
          },
          
          // Enhanced e-commerce
          enhanced_conversions: enableConversions,
          
          // Debug mode
          debug_mode: debugMode,
          
          // Performance settings
          transport_type: 'beacon',
          
          // Business-specific settings
          currency: 'GBP',
          country: 'GB',
          language: 'en-GB'
        })

        // Set global parameters for FAQ tracking
        window.gtag('set', {
          business_type: 'Premium_Tutoring',
          service_area: 'UK_Education',
          target_revenue: 381600,
          client_type: 'Royal_Endorsed'
        })

        setIsConfigured(true)

        if (debugMode) {
          console.log('[GA4 Setup] GA4 configured successfully:', {
            measurementId,
            faqTracking: enableFAQTracking,
            conversions: enableConversions,
            customDimensions: ga4Config.customDimensions
          })
        }
      }
    }

    // Initialize after a short delay to ensure gtag is loaded
    const timeoutId = setTimeout(initializeGA4, 100)
    return () => clearTimeout(timeoutId)
  }, [measurementId, enableFAQTracking, enableConversions, debugMode, consentStatus.consentGiven, ga4Config])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Conversion goal setup
  // CONVERSION SETUP: Configure FAQ-specific conversion goals
  useEffect(() => {
    if (!isConfigured || !enableConversions || typeof window === 'undefined') return

    // Set up conversion goals
    const conversionGoals = [
      { name: ga4Config.conversionGoals.faq_to_consultation, value: 300 },
      { name: ga4Config.conversionGoals.faq_to_contact, value: 100 },
      { name: ga4Config.conversionGoals.faq_engagement, value: 50 },
      { name: ga4Config.conversionGoals.faq_helpful_rating, value: 10 }
    ]

    conversionGoals.forEach(goal => {
      if (window.gtag) {
        window.gtag('event', 'conversion_goal_setup', {
          event_category: 'GA4_Configuration',
          event_label: goal.name,
          value: goal.value,
          currency: 'GBP',
          non_interaction: true
        })
      }
    })

    if (debugMode) {
      console.log('[GA4 Setup] Conversion goals configured:', conversionGoals)
    }
  }, [isConfigured, enableConversions, debugMode, ga4Config])

  // CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Enhanced e-commerce setup
  // ECOMMERCE SETUP: Configure enhanced e-commerce for consultation bookings
  useEffect(() => {
    if (!isConfigured || !enableConversions || typeof window === 'undefined') return

    // Initialize enhanced e-commerce
    if (window.gtag) {
      window.gtag('event', 'ecommerce_setup', {
        event_category: 'Enhanced_Ecommerce',
        event_label: 'FAQ_Consultation_Tracking',
        currency: 'GBP',
        items: [
          {
            item_id: 'consultation_premium',
            item_name: 'Premium Consultation Session',
            item_category: 'Educational_Services',
            item_brand: 'My_Private_Tutor_Online',
            price: 300,
            quantity: 1
          },
          {
            item_id: 'consultation_standard',
            item_name: 'Standard Consultation Session',
            item_category: 'Educational_Services',
            item_brand: 'My_Private_Tutor_Online',
            price: 150,
            quantity: 1
          }
        ],
        non_interaction: true
      })
    }

    if (debugMode) {
      console.log('[GA4 Setup] Enhanced e-commerce configured')
    }
  }, [isConfigured, enableConversions, debugMode])

  // Helper function to update consent
  const updateConsent = (newSettings: Partial<PrivacySettings>) => {
    const updatedSettings = { ...consentStatus, ...newSettings }
    setConsentStatus(updatedSettings)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: updatedSettings.analyticsStorage,
        ad_storage: updatedSettings.adStorage,
        functionality_storage: updatedSettings.functionalityStorage,
        personalization_storage: updatedSettings.personalizationStorage,
        security_storage: updatedSettings.securityStorage
      })

      if (debugMode) {
        console.log('[GA4 Setup] Consent updated:', updatedSettings)
      }
    }
  }

  // Expose consent management for parent components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).updateGA4Consent = updateConsent
    }
  }, [updateConsent])

  return (
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - GoogleAnalytics component from @next/third-parties */}
      {/* GA4 INTEGRATION: Next.js optimized Google Analytics component */}
      <GoogleAnalytics 
        gaId={measurementId}
        dataLayerName="dataLayer"
        nonce={process.env.NEXT_PUBLIC_CSP_NONCE}
      />
      
      {debugMode && isConfigured && (
        <div 
          id="ga4-debug-info" 
          style={{ 
            position: 'fixed', 
            bottom: '10px', 
            right: '10px', 
            background: 'rgba(0,0,0,0.8)', 
            color: 'white', 
            padding: '8px 12px', 
            fontSize: '12px', 
            borderRadius: '4px',
            zIndex: 9999,
            fontFamily: 'monospace'
          }}
        >
          GA4 Active: {measurementId.slice(-4)}
          <br />
          FAQ Tracking: {enableFAQTracking ? '✅' : '❌'}
          <br />
          Conversions: {enableConversions ? '✅' : '❌'}
          <br />
          Consent: {consentStatus.consentGiven ? '✅' : '❌'}
        </div>
      )}
    </>
  )
}

/**
 * CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - Consent management utility
 * CONSENT UTILITY: Helper function for GDPR-compliant consent management
 */
export function updateGA4Consent(settings: Partial<PrivacySettings>) {
  if (typeof window !== 'undefined' && (window as any).updateGA4Consent) {
    (window as any).updateGA4Consent(settings)
  }
}

/**
 * CONTEXT7 SOURCE: /context7/developers_google-analytics-devguides - GA4 testing utility
 * TESTING UTILITY: Send test events to verify GA4 integration
 */
export function testGA4Integration() {
  if (typeof window === 'undefined') return

  // Test basic event
  sendGAEvent('event', 'faq_analytics_test', {
    event_category: 'System_Test',
    event_label: 'GA4_Integration_Verification',
    value: 1,
    test_mode: true
  })

  // Test FAQ-specific event
  if (window.gtag) {
    window.gtag('event', 'faq_question_view', {
      event_category: 'FAQ_Test',
      faq_question_id: 'test_question_001',
      faq_category: 'test_category',
      faq_user_segment: 'test_segment',
      value: 1,
      test_mode: true
    })
  }

  console.log('[GA4 Test] Test events sent successfully')
}

export default GA4Setup