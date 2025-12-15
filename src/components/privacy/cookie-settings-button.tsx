'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Shield, Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cookieConsentUtils } from './cookie-consent-manager';

interface CookieSettingsButtonProps {
  variant?: 'default' | 'ghost' | 'link' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

/**
 * GDPR-compliant cookie settings button
 * Allows users to modify their cookie preferences at any time
 * Required by GDPR Article 7(3) - right to withdraw consent
 */
export function CookieSettingsButton({
  variant = 'ghost',
  size = 'sm',
  className,
  showIcon = true,
  children
}: CookieSettingsButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenSettings = async () => {
    setIsLoading(true);

    try {
      // Use the vanilla-cookieconsent API to show preferences
      cookieConsentUtils.showPreferences();
    } catch (error) {
      console.error('Failed to open cookie settings:', error);

      // Fallback: redirect to cookie policy page
      window.location.href = '/legal/cookie-policy';
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleOpenSettings}
      disabled={isLoading}
      className={cn(
        'inline-flex items-center gap-2 text-sm hover:underline',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        className
      )}
      aria-label="Manage cookie preferences and privacy settings"
    >
      {showIcon && (
        <Settings
          className={cn(
            'flex-shrink-0',
            size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
          )}
          aria-hidden="true"
        />
      )}
      {children || 'Cookie Settings'}
    </Button>
  );
}

/**
 * Cookie status indicator - shows current consent state
 */
interface CookieStatusIndicatorProps {
  className?: string;
}

export function CookieStatusIndicator({ className }: CookieStatusIndicatorProps) {
  const [consentState, setConsentState] = useState<ReturnType<typeof cookieConsentUtils.getConsentState>>(null);

  // Update consent state when component mounts
  useState(() => {
    if (typeof window !== 'undefined') {
      const state = cookieConsentUtils.getConsentState();
      setConsentState(state);
    }
  });

  if (!consentState) {
    return (
      <div className={cn('flex items-center gap-2 text-xs text-gray-500', className)}>
        <Cookie className="w-3 h-3" />
        <span>Consent not set</span>
      </div>
    );
  }

  const activeCategories = [
    consentState.analytics && 'Analytics',
    consentState.functional && 'Functional',
    consentState.marketing && 'Marketing'
  ].filter(Boolean);

  return (
    <div className={cn('flex items-center gap-2 text-xs text-gray-600', className)}>
      <Shield className="w-3 h-3 text-green-600" />
      <span>
        {activeCategories.length > 0
          ? `Active: ${activeCategories.join(', ')}`
          : 'Essential only'
        }
      </span>
    </div>
  );
}

/**
 * Privacy control panel for footer or settings page
 */
interface PrivacyControlPanelProps {
  className?: string;
  showStatus?: boolean;
}

export function PrivacyControlPanel({
  className,
  showStatus = true
}: PrivacyControlPanelProps) {
  return (
    <div className={cn('space-y-3 p-4 bg-gray-50 rounded-lg border', className)}>
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 mb-1">
            Privacy & Cookie Settings
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Manage your privacy preferences and cookie consent.
            You can change these settings at any time.
          </p>

          {showStatus && (
            <div className="mb-3">
              <CookieStatusIndicator />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <CookieSettingsButton
              variant="outline"
              size="sm"
              showIcon={true}
            >
              Manage Cookies
            </CookieSettingsButton>

            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-sm hover:underline"
            >
              <a href="/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-sm hover:underline"
            >
              <a href="/legal/cookie-policy" target="_blank" rel="noopener noreferrer">
                Cookie Policy
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Quick consent reset button for development/testing
 */
export function ResetConsentButton({ className }: { className?: string }) {
  const handleReset = () => {
    if (window.confirm('Reset all cookie preferences and show consent banner again?')) {
      cookieConsentUtils.reset();
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleReset}
      className={cn('text-xs border-dashed', className)}
    >
      Reset Consent (Dev)
    </Button>
  );
}