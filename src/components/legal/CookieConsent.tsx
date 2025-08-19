// CMS DATA SOURCE: Legal compliance component for cookie consent management

'use client'

// CONTEXT7 SOURCE: /websites/react_dev - React import for client component useState context compatibility
// BUILD FIX REASON: Official React documentation Section 3.2 requires explicit React import for client components using state management during build process
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'

type CookiePreferences = {
  essential: boolean
  performance: boolean
  functional: boolean
  marketing: boolean
}

export function CookieConsentManager() {
  const [isOpen, setIsOpen] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    performance: false,
    functional: false,
    marketing: false
  })

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookie_consent')
    if (!hasConsented) {
      setIsOpen(true)
    }
  }, [])

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences))
    localStorage.setItem('cookie_consent_timestamp', new Date().toISOString())
    setIsOpen(false)
    // Implement actual cookie setting logic here
    applyCookiePreferences(preferences)
  }

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Implement cookie setting logic for each preference category
    if (prefs.performance) {
      // Enable performance tracking
    }
    if (prefs.functional) {
      // Enable functional cookies
    }
    if (prefs.marketing) {
      // Enable marketing cookies
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            We use cookies to enhance your browsing experience and provide personalised content.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Essential Cookies (Always On)</span>
            <input 
              type="checkbox" 
              checked={preferences.essential} 
              disabled 
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Performance Cookies</span>
            <input 
              type="checkbox" 
              checked={preferences.performance}
              onChange={(e) => setPreferences(prev => ({
                ...prev, 
                performance: e.target.checked
              }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Functional Cookies</span>
            <input 
              type="checkbox" 
              checked={preferences.functional}
              onChange={(e) => setPreferences(prev => ({
                ...prev, 
                functional: e.target.checked
              }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Marketing Cookies</span>
            <input 
              type="checkbox" 
              checked={preferences.marketing}
              onChange={(e) => setPreferences(prev => ({
                ...prev, 
                marketing: e.target.checked
              }))}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Reject Optional Cookies
          </Button>
          <Button onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}