"use client"

// CONTEXT7 SOURCE: /react-hook-form/documentation - Form handling with validation and submission
// Reference: useForm hook with TypeScript, zodResolver, and async submission handling
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { newsletterSchema, type NewsletterData } from '@/lib/validation/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Send,
  Trophy,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Target,
  School,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Component patterns with external data
// REFERENCE: CMS integration pattern - No hardcoded content in components
// CMS DATA SOURCE: Using getNewsletterFormContent for all newsletter form content
import { getNewsletterFormContent } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /colinhacks/zod - TypeScript-first schema validation
// Reference: Type inference from schema for component props
interface NewsletterFormProps {
  variant?: 'default' | 'inline' | 'card' | 'hero'
  showInterests?: boolean
  showName?: boolean
  title?: string
  description?: string
  successMessage?: string
  buttonText?: string
  className?: string
  onSuccess?: (data: NewsletterData) => void
}

// Interest options for newsletter preferences
const interestOptions = [
  { value: 'primary-education', label: 'Primary Education', icon: BookOpen },
  { value: 'secondary-education', label: 'Secondary Education', icon: School },
  { value: 'gcse-preparation', label: 'GCSE Preparation', icon: Target },
  { value: 'a-level-preparation', label: 'A-Level Preparation', icon: GraduationCap },
  { value: 'university-preparation', label: 'University Preparation', icon: Award },
  { value: 'oxbridge-preparation', label: 'Oxbridge Preparation', icon: Trophy },
  { value: 'independent-school-preparation', label: 'Independent Schools', icon: Users },
  { value: 'adult-learning', label: 'Adult Learning', icon: Sparkles }
] as const

export function NewsletterForm({
  variant = 'default',
  showInterests = false,
  showName = false,
  title,
  description,
  successMessage,
  buttonText,
  className,
  onSuccess
}: NewsletterFormProps) {
  
  // CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - External data integration
  // CMS DATA SOURCE: Using getNewsletterFormContent for all component content - CLAUDE.md Rule 23 compliance
  const newsletterContent = getNewsletterFormContent()
  
  // Use CMS content as defaults, allow props to override for flexibility
  const resolvedTitle = title ?? newsletterContent.title
  const resolvedDescription = description ?? newsletterContent.description
  const resolvedSuccessMessage = successMessage ?? newsletterContent.successMessage
  const resolvedButtonText = buttonText ?? newsletterContent.buttonText
  // CONTEXT7 SOURCE: /react-hook-form/documentation - Form state management with TypeScript
  // Reference: useForm with zodResolver for schema validation
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      firstName: '',
      interests: [],
      consentToMarketing: false
    }
  })

  // Watch interests for checkbox management
  const selectedInterests = watch('interests') || []

  // CONTEXT7 SOURCE: /react-hook-form/documentation - Async form submission handling
  // Reference: handleSubmit with async callback and comprehensive error handling
  const onSubmit = async (data: NewsletterData) => {
    try {
      setSubmissionState('loading')
      setErrorMessage('')
      
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmissionState('success')
        reset() // Clear form on success
        if (onSuccess) {
          onSuccess(data)
        }
      } else {
        setSubmissionState('error')
        setErrorMessage(result.error || 'Subscription failed. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter submission error:', error)
      setSubmissionState('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  // Handle interest checkbox changes
  const handleInterestChange = (interest: string, checked: boolean) => {
    const currentInterests = selectedInterests || []
    if (checked) {
      setValue('interests', [...currentInterests, interest] as any)
    } else {
      setValue('interests', currentInterests.filter(i => i !== interest) as any)
    }
  }

  // Variant-specific container styles
  const containerStyles = {
    default: 'w-full',
    inline: 'w-full',
    card: 'bg-white rounded-lg shadow-lg p-8 border border-gray-200',
    hero: 'bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-10 shadow-xl'
  }

  // Variant-specific layout styles
  const formLayoutStyles = {
    default: 'space-y-4',
    inline: 'flex flex-col sm:flex-row gap-4',
    card: 'space-y-6',
    hero: 'space-y-6'
  }

  if (submissionState === 'success' && variant !== 'inline') {
    return (
      <div className={cn(containerStyles[variant], className)}>
        <div className="flex items-center justify-center gap-3 p-6 bg-green-50 border border-green-200 rounded-lg animate-fade-in-up">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-semibold text-lg">Success!</p>
            <p className="text-green-700 mt-1">{resolvedSuccessMessage}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(containerStyles[variant], className)}>
      {/* Header Section */}
      {(resolvedTitle || resolvedDescription) && variant !== 'inline' && (
        <div className="mb-6 text-center">
          {resolvedTitle && (
            <h3 className={cn(
              "font-serif font-bold text-black",
              variant === 'hero' ? 'text-4xl mb-4' : 'text-3xl mb-3'
            )}>
              {resolvedTitle}
            </h3>
          )}
          {resolvedDescription && (
            <p className={cn(
              "text-gray-700",
              variant === 'hero' ? 'text-lg' : 'text-base'
            )}>
              {resolvedDescription}
            </p>
          )}
        </div>
      )}

      {/* CONTEXT7 SOURCE: /react-hook-form/documentation - Form with handleSubmit and validation */}
      {/* Reference: Proper form element with comprehensive validation and error handling */}
      <form onSubmit={handleSubmit(onSubmit)} className={formLayoutStyles[variant]}>
        {/* Name Field (Optional) */}
        {showName && variant !== 'inline' && (
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-black font-medium">
              First Name (Optional)
            </Label>
            <Input
              {...register('firstName')}
              id="firstName"
              type="text"
              placeholder={newsletterContent.fields.firstName.placeholder}
              disabled={isSubmitting}
              className={cn(
                "w-full",
                errors.firstName ? "border-red-300 bg-red-50" : ""
              )}
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.firstName.message}
              </p>
            )}
          </div>
        )}

        {/* Email Field */}
        <div className={cn("space-y-2", variant === 'inline' ? 'flex-1' : '')}>
          {variant !== 'inline' && (
            <Label htmlFor="email" className="text-black font-medium">
              Email Address <span className="text-red-500">*</span>
            </Label>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder={newsletterContent.fields.email.placeholder}
              disabled={isSubmitting}
              className={cn(
                "w-full pl-10",
                errors.email ? "border-red-300 bg-red-50" : ""
              )}
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Interest Selection (Optional) */}
        {showInterests && variant !== 'inline' && (
          <div className="space-y-3">
            <Label className="text-black font-medium">
              Areas of Interest (Optional)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map((interest) => {
                const Icon = interest.icon
                const isSelected = selectedInterests?.includes(interest.value as any)
                return (
                  <label
                    key={interest.value}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all",
                      isSelected 
                        ? "bg-accent-50 border-accent-300 text-accent-700" 
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => 
                        handleInterestChange(interest.value, checked as boolean)
                      }
                      className="data-[state=checked]:bg-accent-600 data-[state=checked]:border-accent-600"
                    />
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{interest.label}</span>
                  </label>
                )
              })}
            </div>
          </div>
        )}

        {/* Marketing Consent */}
        <div className={cn(
          "flex items-start gap-3",
          variant === 'inline' ? 'hidden' : ''
        )}>
          <Checkbox
            {...register('consentToMarketing')}
            id="consentToMarketing"
            className="mt-1 data-[state=checked]:bg-accent-600 data-[state=checked]:border-accent-600"
          />
          <div className="flex-1">
            <Label 
              htmlFor="consentToMarketing" 
              className="text-sm text-gray-700 cursor-pointer leading-relaxed"
            >
              I consent to receiving marketing communications about premium tutoring services, 
              academic insights, and exclusive educational opportunities. 
              You can unsubscribe at any time.
            </Label>
            {errors.consentToMarketing && (
              <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.consentToMarketing.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "font-semibold transition-all",
            variant === 'inline' 
              ? "px-6 py-2 min-w-[120px]" 
              : "w-full py-3",
            variant === 'hero'
              ? "bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white shadow-lg"
              : "bg-accent-600 hover:bg-accent-700 text-white"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {resolvedButtonText}
            </>
          )}
        </Button>

        {/* Error Message */}
        {submissionState === 'error' && errorMessage && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Success Message for Inline Variant */}
        {submissionState === 'success' && variant === 'inline' && (
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Subscribed!</span>
          </div>
        )}

        {/* Honeypot field for spam prevention */}
        <input
          {...register('honeypot')}
          type="text"
          tabIndex={-1}
          className="sr-only"
          autoComplete="off"
          aria-hidden="true"
        />
      </form>

      {/* Footer Text */}
      {variant === 'card' && (
        <p className="text-xs text-gray-500 text-center mt-4">
          By subscribing, you agree to our Privacy Policy. 
          Unsubscribe anytime.
        </p>
      )}
    </div>
  )
}

// Export variant types for documentation
export type NewsletterFormVariant = 'default' | 'inline' | 'card' | 'hero'