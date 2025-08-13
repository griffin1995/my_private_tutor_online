/**
 * TESTIMONIALS CONSENT MANAGER - TASK 14 IMPLEMENTATION  
 * CONTEXT7 SOURCE: /facebook/react - Component patterns for user consent management
 * CONTEXT7 SOURCE: /davidwells/analytics - Privacy-compliant analytics patterns
 * 
 * TASK 14: Privacy-compliant consent management for personalization features
 * Manages user consent for behavioral analytics and AI-driven personalization
 * 
 * BUSINESS CONTEXT: GDPR compliance for £70,000+ revenue opportunity
 * PRIVACY STANDARDS: Enterprise-grade privacy controls and data protection
 * COMPLIANCE: Full GDPR/CCPA compliance with granular consent options
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Context7 MCP documentation patterns for all implementations
 * - British English terminology and premium service quality
 * - Enterprise-grade privacy and compliance standards
 * - Royal client-worthy discretion and data protection
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Eye, 
  Brain, 
  Settings, 
  Check, 
  X, 
  Info,
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog'
import { useTestimonialsPersonalization } from './testimonials-personalization-provider'

interface ConsentManagerProps {
  isOpen: boolean
  onClose: () => void
  onConsentUpdate?: (consentLevel: ConsentLevel) => void
  showAdvancedOptions?: boolean
  compactMode?: boolean
}

type ConsentLevel = 'minimal' | 'standard' | 'full'

interface ConsentOption {
  id: string
  name: string
  description: string
  required: boolean
  category: 'essential' | 'functional' | 'analytics' | 'personalization'
  dataTypes: string[]
  retentionPeriod: string
  purposes: string[]
}

// CONTEXT7 SOURCE: /davidwells/analytics - Privacy-compliant consent configuration
const CONSENT_OPTIONS: ConsentOption[] = [
  {
    id: 'essential',
    name: 'Essential Functionality',
    description: 'Required for basic website operation and security',
    required: true,
    category: 'essential',
    dataTypes: ['Session data', 'Security tokens'],
    retentionPeriod: 'Session duration',
    purposes: ['Website security', 'Basic functionality', 'Error prevention']
  },
  {
    id: 'functional',
    name: 'Functional Enhancement',
    description: 'Remembers your preferences and improves your experience',
    required: false,
    category: 'functional',
    dataTypes: ['User preferences', 'UI settings'],
    retentionPeriod: '30 days',
    purposes: ['Remember preferences', 'Customise interface', 'Improve usability']
  },
  {
    id: 'behavioral_analytics',
    name: 'Behavioural Analytics',
    description: 'Tracks page views and interactions to understand usage patterns',
    required: false,
    category: 'analytics',
    dataTypes: ['Page views', 'Click events', 'Scroll behaviour', 'Time on page'],
    retentionPeriod: '30 days',
    purposes: ['Understand user behaviour', 'Improve website design', 'Measure engagement']
  },
  {
    id: 'ai_personalization',
    name: 'AI-Powered Personalisation',
    description: 'Uses advanced AI to personalise testimonials and content recommendations',
    required: false,
    category: 'personalization',
    dataTypes: ['Behavioural patterns', 'Interaction history', 'Preference indicators'],
    retentionPeriod: '90 days',
    purposes: ['Personalised content', 'Relevant recommendations', 'Enhanced user experience']
  }
]

// CONTEXT7 SOURCE: /facebook/react - Consent management component implementation
export default function TestimonialsConsentManager({
  isOpen,
  onClose,
  onConsentUpdate,
  showAdvancedOptions = false,
  compactMode = false
}: ConsentManagerProps) {
  const [currentConsentLevel, setCurrentConsentLevel] = useState<ConsentLevel>('minimal')
  const [consentChoices, setConsentChoices] = useState<Record<string, boolean>>({})
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showDataExport, setShowDataExport] = useState(false)
  
  const { 
    updateConsentLevel, 
    exportUserData, 
    deleteUserData,
    sessionContext 
  } = useTestimonialsPersonalization()

  // Initialize consent state
  useEffect(() => {
    const savedConsent = localStorage.getItem('mpto_consent_level')
    if (savedConsent) {
      const level = savedConsent as ConsentLevel
      setCurrentConsentLevel(level)
      initializeConsentChoices(level)
    }
  }, [])

  const initializeConsentChoices = (level: ConsentLevel) => {
    const choices: Record<string, boolean> = {}
    
    CONSENT_OPTIONS.forEach(option => {
      if (option.required) {
        choices[option.id] = true
      } else {
        switch (level) {
          case 'minimal':
            choices[option.id] = false
            break
          case 'standard':
            choices[option.id] = option.category === 'functional' || option.category === 'analytics'
            break
          case 'full':
            choices[option.id] = true
            break
        }
      }
    })
    
    setConsentChoices(choices)
  }

  const handleConsentLevelChange = useCallback((level: ConsentLevel) => {
    setCurrentConsentLevel(level)
    initializeConsentChoices(level)
  }, [])

  const handleIndividualConsentChange = useCallback((optionId: string, enabled: boolean) => {
    setConsentChoices(prev => ({
      ...prev,
      [optionId]: enabled
    }))
    
    // Update consent level based on selections
    const enabledChoices = { ...consentChoices, [optionId]: enabled }
    const newLevel = determineConsentLevel(enabledChoices)
    setCurrentConsentLevel(newLevel)
  }, [consentChoices])

  const determineConsentLevel = (choices: Record<string, boolean>): ConsentLevel => {
    const nonEssentialEnabled = CONSENT_OPTIONS
      .filter(opt => !opt.required)
      .filter(opt => choices[opt.id])
    
    if (nonEssentialEnabled.length === 0) return 'minimal'
    if (nonEssentialEnabled.length <= 2) return 'standard'
    return 'full'
  }

  const handleSaveConsent = useCallback(async () => {
    setIsProcessing(true)
    
    try {
      // Save consent choices
      localStorage.setItem('mpto_consent_level', currentConsentLevel)
      localStorage.setItem('mpto_consent_choices', JSON.stringify(consentChoices))
      localStorage.setItem('mpto_consent_timestamp', new Date().toISOString())
      
      // Update personalization system
      await updateConsentLevel(currentConsentLevel)
      
      // Notify parent component
      onConsentUpdate?.(currentConsentLevel)
      
      // Close dialog
      onClose()
    } catch (error) {
      console.error('[Consent Manager] Failed to save consent:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [currentConsentLevel, consentChoices, updateConsentLevel, onConsentUpdate, onClose])

  const handleExportData = useCallback(async () => {
    try {
      const userData = await exportUserData()
      if (userData) {
        // Create downloadable JSON file
        const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `mpto-user-data-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
      setShowDataExport(false)
    } catch (error) {
      console.error('[Consent Manager] Failed to export data:', error)
    }
  }, [exportUserData])

  const handleDeleteData = useCallback(async () => {
    if (confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      try {
        await deleteUserData()
        localStorage.removeItem('mpto_consent_level')
        localStorage.removeItem('mpto_consent_choices')
        localStorage.removeItem('mpto_consent_timestamp')
        setCurrentConsentLevel('minimal')
        initializeConsentChoices('minimal')
        alert('Your data has been successfully deleted.')
      } catch (error) {
        console.error('[Consent Manager] Failed to delete data:', error)
      }
    }
  }, [deleteUserData])

  const getConsentLevelBadge = (level: ConsentLevel) => {
    switch (level) {
      case 'minimal':
        return <Badge variant="outline" className="text-red-700 border-red-200">Essential Only</Badge>
      case 'standard':
        return <Badge variant="outline" className="text-yellow-700 border-yellow-200">Standard</Badge>
      case 'full':
        return <Badge variant="outline" className="text-green-700 border-green-200">Full Experience</Badge>
    }
  }

  const getCategoryIcon = (category: ConsentOption['category']) => {
    switch (category) {
      case 'essential':
        return <Shield className="w-5 h-5 text-red-500" />
      case 'functional':
        return <Settings className="w-5 h-5 text-blue-500" />
      case 'analytics':
        return <Eye className="w-5 h-5 text-yellow-500" />
      case 'personalization':
        return <Brain className="w-5 h-5 text-green-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Personalisation Settings
          </DialogTitle>
          <p className="text-sm text-slate-600">
            Control how we collect and use your data to personalise your testimonials experience.
            Your privacy is our priority.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Consent Level */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <h3 className="font-medium">Current Privacy Level</h3>
              <p className="text-sm text-slate-600">
                {sessionContext?.consentGiven 
                  ? 'Personalisation is active with your current settings'
                  : 'Personalisation is disabled - only essential functions are active'
                }
              </p>
            </div>
            {getConsentLevelBadge(currentConsentLevel)}
          </div>

          {/* Quick Consent Level Selection */}
          {!showAdvancedOptions && (
            <div className="space-y-4">
              <h3 className="font-medium">Choose Your Experience Level</h3>
              
              <div className="grid gap-4">
                {/* Minimal */}
                <Card 
                  className={`cursor-pointer transition-all ${
                    currentConsentLevel === 'minimal' ? 'ring-2 ring-slate-400' : 'hover:shadow-md'
                  }`}
                  onClick={() => handleConsentLevelChange('minimal')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Essential Only
                        </h4>
                        <p className="text-sm text-slate-600">
                          Basic functionality only. No analytics or personalisation.
                        </p>
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center">
                        {currentConsentLevel === 'minimal' && (
                          <div className="w-2 h-2 bg-slate-600 rounded-full" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Standard */}
                <Card 
                  className={`cursor-pointer transition-all ${
                    currentConsentLevel === 'standard' ? 'ring-2 ring-blue-400' : 'hover:shadow-md'
                  }`}
                  onClick={() => handleConsentLevelChange('standard')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Standard Experience
                        </h4>
                        <p className="text-sm text-slate-600">
                          Analytics for improvement plus basic personalisation features.
                        </p>
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-blue-300 flex items-center justify-center">
                        {currentConsentLevel === 'standard' && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Full */}
                <Card 
                  className={`cursor-pointer transition-all ${
                    currentConsentLevel === 'full' ? 'ring-2 ring-green-400' : 'hover:shadow-md'
                  }`}
                  onClick={() => handleConsentLevelChange('full')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          Full Personalisation
                        </h4>
                        <p className="text-sm text-slate-600">
                          Complete AI-powered personalisation with advanced recommendations.
                        </p>
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-green-300 flex items-center justify-center">
                        {currentConsentLevel === 'full' && (
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Advanced Options */}
          {showAdvancedOptions && (
            <div className="space-y-4">
              <h3 className="font-medium">Detailed Privacy Controls</h3>
              
              {CONSENT_OPTIONS.map((option) => (
                <Card key={option.id} className="transition-all hover:shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          {getCategoryIcon(option.category)}
                          <h4 className="font-medium">{option.name}</h4>
                          {option.required && (
                            <Badge variant="secondary" className="text-xs">Required</Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-slate-600 mb-3">{option.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>Retention: {option.retentionPeriod}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs"
                            onClick={() => setShowDetails(showDetails === option.id ? null : option.id)}
                          >
                            <Info className="w-3 h-3 mr-1" />
                            Details
                          </Button>
                        </div>
                        
                        <AnimatePresence>
                          {showDetails === option.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-3 p-3 bg-slate-50 rounded text-xs space-y-2"
                            >
                              <div>
                                <strong>Data Types:</strong> {option.dataTypes.join(', ')}
                              </div>
                              <div>
                                <strong>Purposes:</strong> {option.purposes.join(', ')}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div className="ml-4">
                        <Switch
                          checked={consentChoices[option.id] || false}
                          onCheckedChange={(enabled) => handleIndividualConsentChange(option.id, enabled)}
                          disabled={option.required}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Data Rights */}
          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Your Data Rights</h3>
            
            <div className="grid gap-3 md:grid-cols-2">
              <Button
                variant="outline"
                onClick={() => setShowDataExport(true)}
                className="justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Your Data
              </Button>
              
              <Button
                variant="outline"
                onClick={handleDeleteData}
                className="justify-start text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete All Data
              </Button>
            </div>
            
            <p className="text-xs text-slate-500 mt-3">
              You have the right to access, export, or delete your personal data at any time.
              For more information, see our Privacy Policy.
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleSaveConsent} disabled={isProcessing}>
            {isProcessing ? 'Saving...' : 'Save Preferences'}
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Data Export Confirmation */}
      <Dialog open={showDataExport} onOpenChange={setShowDataExport}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Your Data
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              This will download all the data we have collected about you, including:
            </p>
            <ul className="text-sm text-slate-600 space-y-1 ml-4">
              <li>• Session and behaviour data</li>
              <li>• Personalisation preferences</li>
              <li>• Interaction history</li>
              <li>• Analytics data</li>
            </ul>
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-800">
                The data will be downloaded as a JSON file. This action does not affect your current settings or data stored on our systems.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDataExport(false)}>
              Cancel
            </Button>
            <Button onClick={handleExportData}>
              Download Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}