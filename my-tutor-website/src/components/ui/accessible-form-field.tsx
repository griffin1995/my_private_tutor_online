/**
 * Accessible Form Field Component
 * Documentation Source: WCAG 2.1 Form Guidelines & Radix UI Form
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html
 * Reference: https://www.radix-ui.com/primitives/docs/components/form
 * 
 * Pattern: Accessible form field with comprehensive ARIA support
 * Purpose: Provide consistent, accessible form field patterns
 * 
 * Accessibility Features:
 * - Associated labels with proper for/id relationships
 * - Error messages with aria-describedby
 * - Required field indicators
 * - Field hints and descriptions
 * - Live error announcements
 * - Keyboard navigation support
 */

import React, { useId } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useAnnouncement } from '@/hooks/use-accessibility'

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
          inputClassName
        )}
      />
      
      {/* Error message */}
      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className={cn(
            'text-sm text-destructive',
            errorClassName
          )}
        >
          {error}
        </p>
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
        'hover:bg-primary/90',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors',
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