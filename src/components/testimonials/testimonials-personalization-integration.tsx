/**
 * TESTIMONIALS PERSONALIZATION INTEGRATION - TASK 14 IMPLEMENTATION
 * CONTEXT7 SOURCE: /facebook/react - Integration component patterns for complex systems
 * CONTEXT7 SOURCE: /davidwells/analytics - Complete analytics and personalization integration
 * 
 * TASK 14: Complete integration component for AI-driven testimonials personalization
 * Orchestrates personalization engine, behavioral analytics, A/B testing, and consent management
 * 
 * BUSINESS CONTEXT: £70,000+ revenue opportunity through intelligent social proof
 * ARCHITECTURE: Enterprise-grade integration of all personalization components
 * PERFORMANCE: Optimized loading and caching with intelligent fallbacks
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Context7 MCP documentation patterns for all implementations
 * - Complete integration with existing testimonials infrastructure
 * - Enterprise-grade performance, privacy, and accessibility compliance
 * - British English terminology and premium service quality
 */

'use client'

import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Zap, Shield, BarChart3, RefreshCw, AlertCircle } from 'lucide-react'
import { TestimonialsPersonalizationProvider } from './testimonials-personalization-provider'
import PersonalizedTestimonialsGrid from './testimonials-personalized-grid'
import TestimonialsConsentManager from './testimonials-consent-manager'
import { TestimonialsABTestingProvider } from './testimonials-ab-testing-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import type { Testimonial } from '@/lib/cms/cms-content'

interface TestimonialsPersonalizationIntegrationProps {
  testimonials: Testimonial[]
  userId?: string
  enablePersonalization?: boolean
  enableABTesting?: boolean
  showPerformanceMetrics?: boolean
  showConsentManager?: boolean
  debugMode?: boolean
  className?: string
  fallbackComponent?: React.ComponentType<{ testimonials: Testimonial[] }>
}

type PersonalizationStatus = 'initializing' | 'active' | 'disabled' | 'error' | 'consent_required'

// CONTEXT7 SOURCE: /facebook/react - Integration component with comprehensive error handling
export default function TestimonialsPersonalizationIntegration({
  testimonials,
  userId,
  enablePersonalization = true,
  enableABTesting = true,
  showPerformanceMetrics = false,
  showConsentManager = true,
  debugMode = false,
  className = '',
  fallbackComponent: FallbackComponent
}: TestimonialsPersonalizationIntegrationProps) {
  // Component state
  const [personalizationStatus, setPersonalizationStatus] = useState<PersonalizationStatus>('initializing')
  const [showConsentDialog, setShowConsentDialog] = useState(false)
  const [userConsent, setUserConsent] = useState<'minimal' | 'standard' | 'full'>('minimal')
  const [performanceMetrics, setPerformanceMetrics] = useState({
    initialized: false,
    loadTime: 0,
    errors: 0,
    personalizationActive: false
  })
  const [initializationError, setInitializationError] = useState<string | null>(null)

  // CONTEXT7 SOURCE: /davidwells/analytics - Initialization and consent checking
  useEffect(() => {
    initializePersonalizationSystem()
  }, [enablePersonalization])

  const initializePersonalizationSystem = useCallback(async () => {
    const startTime = performance.now()
    
    try {
      setPersonalizationStatus('initializing')
      setInitializationError(null)

      // Check for existing consent
      const savedConsent = localStorage.getItem('mpto_consent_level')
      const consentTimestamp = localStorage.getItem('mpto_consent_timestamp')
      
      if (savedConsent && consentTimestamp) {
        const consentAge = Date.now() - new Date(consentTimestamp).getTime()
        const maxAge = 365 * 24 * 60 * 60 * 1000 // 1 year
        
        if (consentAge < maxAge) {
          const level = savedConsent as typeof userConsent
          setUserConsent(level)
          
          if (enablePersonalization && level !== 'minimal') {
            setPersonalizationStatus('active')
            setPerformanceMetrics(prev => ({
              ...prev,
              initialized: true,
              loadTime: performance.now() - startTime,
              personalizationActive: true
            }))
          } else {
            setPersonalizationStatus('disabled')
          }
        } else {
          // Consent expired, require new consent
          setPersonalizationStatus('consent_required')
        }
      } else {
        // No consent found, require consent
        setPersonalizationStatus('consent_required')
      }

      if (debugMode) {
        console.log('[Personalization Integration] System initialized:', {
          status: personalizationStatus,
          consent: userConsent,
          loadTime: performance.now() - startTime
        })
      }
    } catch (error) {
      console.error('[Personalization Integration] Initialization failed:', error)
      setInitializationError(error instanceof Error ? error.message : 'Unknown error')
      setPersonalizationStatus('error')
      setPerformanceMetrics(prev => ({
        ...prev,
        errors: prev.errors + 1
      }))
    }
  }, [enablePersonalization, debugMode, personalizationStatus, userConsent])

  const handleConsentUpdate = useCallback((consentLevel: 'minimal' | 'standard' | 'full') => {
    setUserConsent(consentLevel)
    
    if (enablePersonalization && consentLevel !== 'minimal') {
      setPersonalizationStatus('active')
      setPerformanceMetrics(prev => ({
        ...prev,
        personalizationActive: true
      }))
    } else {
      setPersonalizationStatus('disabled')
      setPerformanceMetrics(prev => ({
        ...prev,
        personalizationActive: false
      }))
    }

    if (debugMode) {
      console.log('[Personalization Integration] Consent updated:', consentLevel)
    }
  }, [enablePersonalization, debugMode])

  const handleShowConsentManager = useCallback(() => {
    setShowConsentDialog(true)
  }, [])

  const handleRefreshPersonalization = useCallback(async () => {
    await initializePersonalizationSystem()
  }, [initializePersonalizationSystem])

  // Render status indicators
  const renderStatusIndicator = () => {
    switch (personalizationStatus) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Zap className="w-3 h-3 mr-1" />
            Personalisation Active
          </Badge>
        )
      case 'disabled':
        return (
          <Badge variant="outline" className="text-slate-600">
            <Settings className="w-3 h-3 mr-1" />
            Standard View
          </Badge>
        )
      case 'consent_required':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Shield className="w-3 h-3 mr-1" />
            Consent Required
          </Badge>
        )
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            Initialising
          </Badge>
        )
    }
  }

  // Render performance metrics (debug mode)
  const renderPerformanceMetrics = () => {
    if (!showPerformanceMetrics && !debugMode) return null

    return (
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Personalisation Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-slate-600">Load Time</div>
              <div className="font-mono">{performanceMetrics.loadTime.toFixed(0)}ms</div>
            </div>
            <div>
              <div className="text-slate-600">Status</div>
              <div className="font-mono">{personalizationStatus}</div>
            </div>
            <div>
              <div className="text-slate-600">Errors</div>
              <div className="font-mono">{performanceMetrics.errors}</div>
            </div>
            <div>
              <div className="text-slate-600">AI Active</div>
              <div className="font-mono">{performanceMetrics.personalizationActive ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Render consent required state
  const renderConsentRequired = () => (
    <div className="text-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <Shield className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Personalise Your Experience</h3>
        <p className="text-slate-600 mb-6">
          We'd like to personalise the testimonials you see based on your interests. 
          This helps us show you the most relevant success stories.
        </p>
        <div className="space-y-3">
          <Button onClick={handleShowConsentManager} className="w-full">
            <Settings className="w-4 h-4 mr-2" />
            Manage Privacy Settings
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleConsentUpdate('minimal')}
            className="w-full"
          >
            Continue with Essential Only
          </Button>
        </div>
      </motion.div>
    </div>
  )

  // Render error state
  const renderErrorState = () => (
    <div className="space-y-4">
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Personalisation Error:</strong> {initializationError}
        </AlertDescription>
      </Alert>
      
      <div className="text-center py-8">
        <Button onClick={handleRefreshPersonalization} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry Personalisation
        </Button>
      </div>
      
      {/* Fallback to standard testimonials */}
      {FallbackComponent ? (
        <FallbackComponent testimonials={testimonials} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  <blockquote className="text-slate-700">"{testimonial.quote}"</blockquote>
                  <cite className="text-sm font-semibold not-italic">{testimonial.author}</cite>
                  {testimonial.role && (
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  // Render loading state
  const renderLoadingState = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-8 w-1/2 mt-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  // Main render logic
  const renderTestimonialsContent = () => {
    switch (personalizationStatus) {
      case 'consent_required':
        return renderConsentRequired()
      
      case 'error':
        return renderErrorState()
      
      case 'initializing':
        return renderLoadingState()
      
      case 'active':
        return (
          <TestimonialsPersonalizationProvider
            testimonials={testimonials}
            userId={userId}
            initialConsentLevel={userConsent}
            enableRealTimeUpdates={true}
            debugMode={debugMode}
          >
            <Suspense fallback={renderLoadingState()}>
              <PersonalizedTestimonialsGrid
                enableInteractions={true}
                showPersonalizationInsights={debugMode}
                debugMode={debugMode}
              />
            </Suspense>
          </TestimonialsPersonalizationProvider>
        )
      
      case 'disabled':
      default:
        return FallbackComponent ? (
          <FallbackComponent testimonials={testimonials} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                    <blockquote className="text-slate-700">"{testimonial.quote}"</blockquote>
                    <cite className="text-sm font-semibold not-italic">{testimonial.author}</cite>
                    {testimonial.role && (
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
    }
  }

  // Wrap with A/B testing provider if enabled
  const content = enableABTesting ? (
    <TestimonialsABTestingProvider
      userId={userId || 'anonymous'}
      enableAnalytics={userConsent !== 'minimal'}
    >
      {renderTestimonialsContent()}
    </TestimonialsABTestingProvider>
  ) : (
    renderTestimonialsContent()
  )

  return (
    <div className={className}>
      {/* Status and Controls Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {renderStatusIndicator()}
          {debugMode && (
            <Badge variant="outline" className="text-xs">
              Debug Mode
            </Badge>
          )}
        </div>
        
        {showConsentManager && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShowConsentManager}
            className="text-slate-600 hover:text-slate-900"
          >
            <Settings className="w-4 h-4 mr-1" />
            Privacy Settings
          </Button>
        )}
      </div>

      {/* Performance Metrics */}
      {renderPerformanceMetrics()}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={personalizationStatus}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.div>
      </AnimatePresence>

      {/* Consent Manager Dialog */}
      {showConsentManager && (
        <TestimonialsConsentManager
          isOpen={showConsentDialog}
          onClose={() => setShowConsentDialog(false)}
          onConsentUpdate={handleConsentUpdate}
          showAdvancedOptions={debugMode}
        />
      )}
    </div>
  )
}

// CONTEXT7 SOURCE: /facebook/react - Export utility components and hooks
export { TestimonialsPersonalizationProvider, PersonalizedTestimonialsGrid, TestimonialsConsentManager }