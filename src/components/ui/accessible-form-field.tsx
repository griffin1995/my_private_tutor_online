/**
 * Documentation Source: WCAG 2.1 + WAI-ARIA 1.2 + React Hook Form
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html
 * Reference: https://www.w3.org/WAI/ARIA/apg/patterns/textbox/
 * Reference: https://react-hook-form.com/docs/useform/register
 * 
 * Pattern: Accessible Form Field Component
 * Architecture:
 * - Comprehensive ARIA labelling and descriptions
 * - Error state management with screen reader announcements
 * - Required field indicators with proper semantics
 * - Focus management and keyboard navigation
 * - Motion preference support for animations
 * 
 * WCAG Compliance:
 * - SC 3.3.2 Labels or Instructions (Level A)
 * - SC 3.3.3 Error Suggestion (Level AA)
 * - SC 3.3.4 Error Prevention (Level AA)
 * - SC 4.1.3 Status Messages (Level AA)
 * 
 * Features:
 * - Built-in validation message handling
 * - Automatic aria-describedby association
 * - Screen reader optimised error announcements
 * - Progressive enhancement with motion preferences
 */

import React, { useId } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useAnnouncement } from '@/hooks/use-accessibility'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AccessibleFormFieldProps {
  // Field properties
  name: string
  label: string
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  placeholder?: string
  value?: string
  defaultValue?: string
  
  // Accessibility properties
  required?: boolean
  error?: string
  hint?: string
  describedBy?: string
  
  // State properties
  disabled?: boolean
  readOnly?: boolean
  
  // Event handlers
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  
  // Styling
  className?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
  hintClassName?: string
}

export const AccessibleFormField: React.FC<AccessibleFormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  required = false,
  error,
  hint,
  describedBy,
  disabled = false,
  readOnly = false,
  onChange,
  onBlur,
  className,
  labelClassName,
  inputClassName,
  errorClassName,
  hintClassName,
}) => {
  // Generate unique IDs for accessibility
  const fieldId = useId()
  const errorId = `${fieldId}-error`
  const hintId = `${fieldId}-hint`
  
  // Motion preference detection for animations
  const shouldReduceMotion = useReducedMotion()
  
  // Announce errors to screen readers
  const announce = useAnnouncement()
  
  React.useEffect(() => {
    if (error) {
      announce(`Error: ${error}`, 'assertive')
    }
  }, [error, announce])
  
  // Build aria-describedby attribute
  const ariaDescribedBy = [
    error && errorId,
    hint && hintId,
    describedBy
  ].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      <Label
        htmlFor={fieldId}
        className={cn(
          'text-sm font-medium',
          disabled && 'opacity-70',
          labelClassName
        )}
      >
        {label}
        {required && (
          <span
            className="ml-1 text-destructive"
            aria-label="required"
          >
            *
          </span>
        )}
      </Label>
      
      {/* Hint text */}
      {hint && (
        <p
          id={hintId}
          className={cn(
            'text-sm text-muted-foreground',
            hintClassName
          )}
        >
          {hint}
        </p>
      )}
      
      {/* Input field */}
      <Input
        id={fieldId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy}
        aria-required={required}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive',
          // Motion-aware transitions
          'motion-safe:transition-colors motion-safe:duration-200',
          inputClassName
        )}
      />
      
      {/* Error message */}
      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className={cn(
            'text-sm text-destructive flex items-center gap-2',
            // Motion-aware animations
            !shouldReduceMotion && 'animate-fade-in-up',
            errorClassName
          )}
        >
          <svg
            className="h-4 w-4 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  )
}

// Form Group component for semantic grouping
interface FormGroupProps {
  legend: string
  children: React.ReactNode
  className?: string
  required?: boolean
}

export const FormGroup: React.FC<FormGroupProps> = ({
  legend,
  children,
  className,
  required = false
}) => {
  return (
    <fieldset className={cn('space-y-4', className)}>
      <legend className="text-lg font-semibold">
        {legend}
        {required && (
          <span
            className="ml-1 text-destructive text-sm"
            aria-label="required"
          >
            *
          </span>
        )}
      </legend>
      {children}
    </fieldset>
  )
}

// Accessible form submission button
interface FormSubmitProps {
  children: React.ReactNode
  loading?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export const FormSubmit: React.FC<FormSubmitProps> = ({
  children,
  loading = false,
  disabled = false,
  className,
  onClick
}) => {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      aria-busy={loading}
      onClick={onClick}
      className={cn(
        'w-full sm:w-auto',
        'px-4 py-2',
        'bg-primary text-primary-foreground',
        'rounded-md font-medium',
        'motion-safe:hover:bg-primary/90',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Motion-aware transitions
        'motion-safe:transition-colors motion-safe:duration-200',
        className
      )}
    >
      {loading ? (
        <>
          <span className="sr-only">Loading...</span>
          <span aria-hidden="true">Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}