// CONTEXT7 SOURCE: /react-hook-form/documentation - Optimized form implementation with dynamic loading
// OPTIMIZATION REASON: Official React Hook Form documentation demonstrates form optimization and validation patterns

"use client"

import React, { useState, useMemo, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { newsletterSchema, type NewsletterData } from '@/lib/validation/schemas';
import { FooterGDPRConsent, type ConsentState } from './footer-gdpr-consent';

interface FooterNewsletterFormProps {
  className?: string;
  onSubmit?: (data: NewsletterData) => Promise<void>;
  autoConsent?: boolean;
}

/**
 * CONTEXT7 SOURCE: /react-hook-form/documentation - Form component with performance optimization
 * FORM REASON: Official React Hook Form documentation shows optimized form patterns
 */
export const FooterNewsletterForm = React.memo<FooterNewsletterFormProps>(({
  className = "",
  onSubmit,
  autoConsent = true
}) => {
  // CONTEXT7 SOURCE: /react-hook-form/documentation - Form state management
  // STATE REASON: Official documentation shows useState for submission state management
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // CONTEXT7 SOURCE: /gdpr/regulations - Consent state management
  // GDPR REASON: Track consent state for data processing
  const [consentState, setConsentState] = useState<ConsentState | null>(null);
  
  // CONTEXT7 SOURCE: /react-hook-form/documentation - useForm with optimization
  // FORM HOOK REASON: Official documentation demonstrates optimized form configuration
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      consentToMarketing: autoConsent,
      honeypot: '' // Anti-spam field
    },
    // CONTEXT7 SOURCE: /react-hook-form/documentation - Performance optimization mode
    // MODE REASON: onBlur mode reduces re-renders compared to onChange
    mode: 'onBlur'
  });
  
  // CONTEXT7 SOURCE: /gdpr/regulations - Handle consent changes
  // CONSENT HANDLER REASON: Update form values when consent changes
  const handleConsentChange = (consent: ConsentState) => {
    setConsentState(consent);
    setValue('consentToMarketing', consent.marketing);
  };

  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for form configuration
  // MEMOIZATION REASON: Prevent recreation of form config on every render
  const formConfig = useMemo(() => ({
    submitButtonText: {
      idle: 'Subscribe',
      loading: 'Subscribing...',
      success: 'Subscribed!',
      error: 'Try Again'
    },
    submitButtonIcon: {
      loading: Loader2,
      success: CheckCircle,
      error: AlertCircle
    }
  }), []);

  // CONTEXT7 SOURCE: /react-hook-form/documentation - Async form submission
  // SUBMISSION REASON: Official documentation shows async form handling patterns
  const handleFormSubmit = async (data: NewsletterData) => {
    try {
      setSubmissionState('loading');
      setErrorMessage('');
      
      // CONTEXT7 SOURCE: /web.dev/fetch - Optimized fetch with timeout
      // FETCH REASON: Official web platform documentation shows fetch best practices
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default API submission
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Subscription failed');
        }
      }
      
      setSubmissionState('success');
      reset(); // Clear form on success
      
      // CONTEXT7 SOURCE: /web.dev/performance - Success state timeout
      // TIMEOUT REASON: Reset to idle state after showing success message
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Newsletter submission error:', error);
      setSubmissionState('error');
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setErrorMessage('Request timed out. Please check your connection and try again.');
        } else {
          setErrorMessage(error.message || 'Network error. Please try again.');
        }
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  // CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering optimization
  // RENDERING REASON: Early return for success state reduces component complexity
  if (submissionState === 'success') {
    return (
      <div className={`max-w-md mx-auto ${className}`}>
        <div className="flex items-center justify-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">
            Thank you for subscribing! Check your inbox for confirmation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {/* CONTEXT7 SOURCE: /react-hook-form/documentation - Form element with handleSubmit */}
      {/* FORM STRUCTURE REASON: Official documentation shows proper form structure */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-1">
            {/* CONTEXT7 SOURCE: /wcag/guidelines - Form input accessibility */}
            {/* ACCESSIBILITY REASON: Official WCAG guidelines require proper form labeling */}
            <label htmlFor="newsletter-email" className="sr-only">
              Email address for newsletter subscription
            </label>
            
            <input
              {...register('email')}
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              disabled={isSubmitting}
              aria-describedby="email-description email-error"
              aria-invalid={errors.email ? 'true' : 'false'}
              className={cn(
                "w-full px-6 py-3 bg-gray-100 border rounded-lg text-black placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-colors duration-200",
                errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
              )}
            />
            
            {/* CONTEXT7 SOURCE: /wcag/guidelines - Form field descriptions */}
            {/* DESCRIPTION REASON: Screen reader accessible form descriptions */}
            <div id="email-description" className="sr-only">
              Subscribe to receive educational insights and exclusive opportunities
            </div>
            
            {/* CONTEXT7 SOURCE: /wcag/guidelines - Error announcements */}
            {/* ERROR REASON: Accessible error messages with proper ARIA attributes */}
            {errors.email && (
              <div 
                id="email-error" 
                role="alert" 
                aria-live="polite"
                className="text-red-600 text-sm flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </div>
            )}
          </div>
          
          {/* CONTEXT7 SOURCE: /react-hook-form/documentation - Submit button optimization */}
          {/* BUTTON REASON: Optimized submit button with loading states */}
          <SubmitButton
            isSubmitting={isSubmitting}
            submissionState={submissionState}
            config={formConfig}
          />
        </div>
        
        {/* CONTEXT7 SOURCE: /gdpr/regulations - GDPR consent management */}
        {/* GDPR REASON: Official GDPR compliance requires explicit consent */}
        <FooterGDPRConsent
          onConsentChange={handleConsentChange}
          required={true}
          compact={true}
          className="text-left"
        />

        {/* CONTEXT7 SOURCE: /react-hook-form/documentation - Form error display */}
        {/* ERROR DISPLAY REASON: User-friendly error message display */}
        {submissionState === 'error' && errorMessage && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-red-800 text-sm">{errorMessage}</p>
          </div>
        )}
        
        {/* CONTEXT7 SOURCE: /web.dev/security - Honeypot anti-spam field */}
        {/* SECURITY REASON: Hidden honeypot field for spam prevention */}
        <input
          {...register('honeypot')}
          type="text"
          tabIndex={-1}
          className="sr-only"
          autoComplete="off"
          aria-hidden="true"
        />
      </form>
    </div>
  );
});

FooterNewsletterForm.displayName = 'FooterNewsletterForm';

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Submit button component with memoization
 * BUTTON REASON: Separate memoized component for submit button reduces re-renders
 */
interface SubmitButtonProps {
  isSubmitting: boolean;
  submissionState: 'idle' | 'loading' | 'success' | 'error';
  config: {
    submitButtonText: Record<string, string>;
    submitButtonIcon: Record<string, React.ElementType>;
  };
}

const SubmitButton = React.memo<SubmitButtonProps>(({
  isSubmitting,
  submissionState,
  config
}) => {
  const IconComponent = config.submitButtonIcon[submissionState];
  const buttonText = config.submitButtonText[submissionState];
  
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className={cn(
        "px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold",
        "disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]",
        "animate-shimmer bg-[linear-gradient(110deg,#eab308,45%,#fbbf24,55%,#eab308)] bg-[length:200%_100%]",
        "border border-accent-600 shadow-lg transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
      )}
      aria-describedby="submit-description"
    >
      {IconComponent && submissionState === 'loading' && (
        <IconComponent className="w-4 h-4 mr-2 animate-spin" />
      )}
      {buttonText}
    </Button>
  );
});

SubmitButton.displayName = 'SubmitButton';

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Newsletter form skeleton for loading state
 * SKELETON REASON: Provide loading placeholder while form loads dynamically
 */
export const FooterNewsletterFormSkeleton: React.FC<{ className?: string }> = ({ 
  className = "" 
}) => (
  <div className={`max-w-md mx-auto space-y-4 ${className}`}>
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <div className="h-12 bg-gray-200 border border-gray-300 rounded-lg animate-pulse" />
      </div>
      <div className="min-w-[120px] h-12 bg-accent-600/20 border border-accent-600/30 rounded-lg animate-pulse" />
    </div>
  </div>
);

FooterNewsletterFormSkeleton.displayName = 'FooterNewsletterFormSkeleton';

export default FooterNewsletterForm;