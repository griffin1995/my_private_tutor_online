"use client"

// CONTEXT7 SOURCE: /react-hook-form/documentation - React Hook Form with Zod resolver for form state management and validation
// CONTEXT7 SOURCE: /colinhacks/zod - TypeScript-first schema validation with static type inference
// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Form styling with validation states and accessibility patterns
// IMPLEMENTATION: Comprehensive quote request form component for premium tutoring service
// FEATURES: British English, royal styling, WCAG 2.1 AA compliance, mobile-first responsive design

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Crown, Shield, Clock, MapPin, GraduationCap, Users, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /colinhacks/zod - String validation with email, phone, required fields, and custom error messages
// BRITISH ENGLISH: All field labels, placeholders, and validation messages use British English terminology
const quoteRequestSchema = z.object({
  // Student Information Section
  studentName: z.string()
    .min(2, 'Student name must be at least 2 characters')
    .max(100, 'Student name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Student name can only contain letters, spaces, hyphens and apostrophes'),
  
  studentAge: z.string()
    .min(1, 'Please select student age/year group')
    .refine((val) => {
      const num = parseInt(val)
      return num >= 4 && num <= 25
    }, 'Student age must be between 4 and 25'),
  
  currentSchool: z.string()
    .max(200, 'School name must be less than 200 characters')
    .optional()
    .or(z.literal('')),

  // Educational Needs Section
  subjects: z.array(z.string())
    .min(1, 'Please select at least one subject')
    .max(8, 'Please select no more than 8 subjects'),
  
  academicLevel: z.enum([
    'primary', 'year-7-8', 'gcse', 'a-level', '11-plus', 'university', 'adult-learning', 'other'
  ], { errorMap: () => ({ message: 'Please select a valid academic level' }) }),
  
  specificRequirements: z.string()
    .max(1000, 'Specific requirements must be less than 1000 characters')
    .optional()
    .or(z.literal('')),

  // Tutoring Preferences Section
  tutoringFormat: z.enum(['online', 'in-person', 'hybrid'], {
    errorMap: () => ({ message: 'Please select a preferred tutoring format' })
  }),
  
  frequency: z.enum(['weekly', 'bi-weekly', 'intensive', 'exam-prep', 'flexible'], {
    errorMap: () => ({ message: 'Please select a preferred frequency' })
  }),
  
  startDate: z.enum(['immediate', 'within-week', 'within-month', 'next-term', 'flexible'], {
    errorMap: () => ({ message: 'Please select a preferred start date' })
  }),

  // Contact Information Section
  parentName: z.string()
    .min(2, 'Parent/guardian name must be at least 2 characters')
    .max(100, 'Parent/guardian name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Parent/guardian name can only contain letters, spaces, hyphens and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email address is too long')
    .toLowerCase(),
  
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Phone number contains invalid characters'),
  
  postcode: z.string()
    .min(5, 'Please enter a valid UK postcode')
    .max(10, 'Postcode is too long')
    .regex(/^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$/i, 'Please enter a valid UK postcode format')
    .transform(val => val.toUpperCase()),

  // Additional Information Section
  hearAboutUs: z.enum([
    'google-search', 'social-media', 'referral', 'tatler-address-book', 
    'school-recommendation', 'previous-client', 'other'
  ], { errorMap: () => ({ message: 'Please select how you heard about us' }) }),
  
  additionalNotes: z.string()
    .max(1000, 'Additional notes must be less than 1000 characters')
    .optional()
    .or(z.literal(''))
})

type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Available subjects for multi-select with comprehensive tutoring coverage
const AVAILABLE_SUBJECTS = [
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'english', label: 'English Language & Literature' },
  { value: 'sciences', label: 'Sciences (Biology, Chemistry, Physics)' },
  { value: 'history', label: 'History' },
  { value: 'geography', label: 'Geography' },
  { value: 'modern-languages', label: 'Modern Languages (French, German, Spanish)' },
  { value: 'classics', label: 'Classics (Latin, Greek)' },
  { value: 'economics', label: 'Economics' },
  { value: 'business-studies', label: 'Business Studies' },
  { value: 'computer-science', label: 'Computer Science' },
  { value: 'art-design', label: 'Art & Design' },
  { value: 'music', label: 'Music' },
  { value: 'drama', label: 'Drama & Theatre Studies' },
  { value: 'philosophy', label: 'Philosophy & Ethics' },
  { value: 'psychology', label: 'Psychology' },
  { value: 'other', label: 'Other Subject' }
] as const

interface QuoteRequestFormProps {
  className?: string
  compact?: boolean
}

export function QuoteRequestForm({ className, compact = false }: QuoteRequestFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [csrfToken, setCsrfToken] = useState<string | null>(null)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  
  // CONTEXT7 SOURCE: /react-hook-form/documentation - useForm hook with zodResolver for validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
    watch,
    trigger
  } = useForm<QuoteRequestFormData>({
    resolver: zodResolver(quoteRequestSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      subjects: [],
      additionalNotes: '',
      specificRequirements: '',
      currentSchool: ''
    }
  })

  // CONTEXT7 SOURCE: /react-hook-form/documentation - Fetch CSRF token for security
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('/api/csrf-token')
        const data = await response.json()
        setCsrfToken(data.token)
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error)
      }
    }
    fetchCSRFToken()
  }, [])

  // CONTEXT7 SOURCE: /react-hook-form/documentation - Handle subject selection for multi-select functionality
  const handleSubjectToggle = (subjectValue: string) => {
    const updatedSubjects = selectedSubjects.includes(subjectValue)
      ? selectedSubjects.filter(s => s !== subjectValue)
      : [...selectedSubjects, subjectValue]
    
    setSelectedSubjects(updatedSubjects)
    setValue('subjects', updatedSubjects)
    trigger('subjects') // Trigger validation after change
  }

  // CONTEXT7 SOURCE: /react-hook-form/documentation - Form submission with error handling and CSRF protection
  const onSubmit = async (data: QuoteRequestFormData) => {
    try {
      if (!csrfToken) {
        throw new Error('Security token not available. Please refresh the page.')
      }
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken
        },
        body: JSON.stringify({
          ...data,
          formType: 'quote-request',
          timestamp: new Date().toISOString()
        }),
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        reset()
        setSelectedSubjects([])
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Success state with royal branding and accessibility
  if (isSubmitted) {
    return (
      <Card className={cn("w-full max-w-4xl mx-auto", className)}>
        <CardContent className="text-center py-12">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-accent-500 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-semibold text-primary-900 mb-2">
              Quote Request Received
            </h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              Thank you for your enquiry. We will prepare a personalised quote and 
              contact you within 24 hours to discuss your tutoring requirements.
            </p>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-4 mb-6 inline-block">
            <div className="flex items-center justify-center gap-2 text-accent-700 font-medium text-sm">
              <Crown className="h-4 w-4" aria-hidden="true" />
              <span>Royal Family Endorsed Service</span>
            </div>
          </div>
          
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="text-primary-700 border-primary-200 hover:bg-primary-50"
          >
            Submit Another Quote Request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full max-w-4xl mx-auto", className)}>
      <CardHeader className={cn(compact ? "pb-4" : "pb-6")}>
        <div className="flex items-center gap-3 mb-2">
          <Crown className="h-6 w-6 text-accent-500" aria-hidden="true" />
          <Badge variant="gold" className="text-xs">Royal Family Endorsed</Badge>
        </div>
        <CardTitle className="text-primary-900 text-2xl">
          Request a Personalised Quote
        </CardTitle>
        <CardDescription className="leading-relaxed text-base">
          Get a tailored quote for premium tutoring services. All enquiries are handled 
          with complete discretion and confidentiality.
        </CardDescription>
      </CardHeader>

      <CardContent className={cn(compact ? "pt-0" : "pt-2")}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
          
          {/* Student Information Section */}
          <section aria-labelledby="student-info-heading">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <h3 id="student-info-heading" className="text-lg font-semibold text-primary-800">
                Student Information
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="studentName" className="text-sm font-medium text-primary-800">
                  Student Name *
                </Label>
                <Input
                  {...register('studentName')}
                  id="studentName"
                  placeholder="Student's full name"
                  className={cn(
                    "mt-1",
                    errors.studentName && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  aria-invalid={errors.studentName ? 'true' : 'false'}
                  aria-describedby={errors.studentName ? 'studentName-error' : undefined}
                />
                {errors.studentName && (
                  <p id="studentName-error" className="text-sm text-red-600 mt-1" role="alert">
                    {errors.studentName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="studentAge" className="text-sm font-medium text-primary-800">
                  Student Age/Year Group *
                </Label>
                <Controller
                  control={control}
                  name="studentAge"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger 
                        className={cn(
                          "mt-1",
                          errors.studentAge && "border-red-500 focus:border-red-500"
                        )}
                        aria-invalid={errors.studentAge ? 'true' : 'false'}
                        aria-describedby={errors.studentAge ? 'studentAge-error' : undefined}
                      >
                        <SelectValue placeholder="Select age/year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">Reception (Age 4-5)</SelectItem>
                        <SelectItem value="5">Year 1 (Age 5-6)</SelectItem>
                        <SelectItem value="6">Year 2 (Age 6-7)</SelectItem>
                        <SelectItem value="7">Year 3 (Age 7-8)</SelectItem>
                        <SelectItem value="8">Year 4 (Age 8-9)</SelectItem>
                        <SelectItem value="9">Year 5 (Age 9-10)</SelectItem>
                        <SelectItem value="10">Year 6 (Age 10-11)</SelectItem>
                        <SelectItem value="11">Year 7 (Age 11-12)</SelectItem>
                        <SelectItem value="12">Year 8 (Age 12-13)</SelectItem>
                        <SelectItem value="13">Year 9 (Age 13-14)</SelectItem>
                        <SelectItem value="14">Year 10 (Age 14-15)</SelectItem>
                        <SelectItem value="15">Year 11 (Age 15-16)</SelectItem>
                        <SelectItem value="16">Year 12 (Age 16-17)</SelectItem>
                        <SelectItem value="17">Year 13 (Age 17-18)</SelectItem>
                        <SelectItem value="18">University (Age 18+)</SelectItem>
                        <SelectItem value="25">Adult Learner</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.studentAge && (
                  <p id="studentAge-error" className="text-sm text-red-600 mt-1" role="alert">
                    {errors.studentAge.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="currentSchool" className="text-sm font-medium text-primary-800">
                  Current School (Optional)
                </Label>
                <Input
                  {...register('currentSchool')}
                  id="currentSchool"
                  placeholder="e.g., Eton College, Westminster School"
                  className="mt-1"
                />
              </div>
            </div>
          </section>

          {/* Educational Needs Section */}
          <section aria-labelledby="educational-needs-heading">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <h3 id="educational-needs-heading" className="text-lg font-semibold text-primary-800">
                Educational Needs
              </h3>
            </div>

            <div className="space-y-6">
              {/* Subject Selection */}
              <div>
                <Label className="text-sm font-medium text-primary-800 mb-3 block">
                  Subjects Required * <span className="text-xs text-gray-500">(Select up to 8)</span>
                </Label>
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
                  role="group"
                  aria-labelledby="subjects-label"
                  aria-describedby={errors.subjects ? 'subjects-error' : undefined}
                >
                  {AVAILABLE_SUBJECTS.map((subject) => (
                    <label
                      key={subject.value}
                      className={cn(
                        "flex items-center space-x-2 p-3 rounded-md border cursor-pointer transition-colors",
                        selectedSubjects.includes(subject.value)
                          ? "bg-accent-50 border-accent-300 text-accent-900"
                          : "bg-white border-gray-200 hover:border-gray-300",
                        errors.subjects && "border-red-200"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(subject.value)}
                        onChange={() => handleSubjectToggle(subject.value)}
                        className="rounded border-gray-300 text-accent-600 focus:ring-accent-500"
                        aria-describedby={errors.subjects ? 'subjects-error' : undefined}
                      />
                      <span className="text-sm font-medium">{subject.label}</span>
                    </label>
                  ))}
                </div>
                {errors.subjects && (
                  <p id="subjects-error" className="text-sm text-red-600 mt-2" role="alert">
                    {errors.subjects.message}
                  </p>
                )}
              </div>

              {/* Academic Level and Specific Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-primary-800">Academic Level *</Label>
                  <Controller
                    control={control}
                    name="academicLevel"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger 
                          className={cn(
                            "mt-1",
                            errors.academicLevel && "border-red-500 focus:border-red-500"
                          )}
                          aria-invalid={errors.academicLevel ? 'true' : 'false'}
                        >
                          <SelectValue placeholder="Select academic level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary School (Reception - Year 6)</SelectItem>
                          <SelectItem value="year-7-8">Lower Secondary (Years 7-8)</SelectItem>
                          <SelectItem value="gcse">GCSE Level (Years 9-11)</SelectItem>
                          <SelectItem value="a-level">A-Level (Years 12-13)</SelectItem>
                          <SelectItem value="11-plus">11+ Preparation</SelectItem>
                          <SelectItem value="university">University Level</SelectItem>
                          <SelectItem value="adult-learning">Adult Learning</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.academicLevel && (
                    <p className="text-sm text-red-600 mt-1" role="alert">
                      {errors.academicLevel.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-1">
                  <Label htmlFor="specificRequirements" className="text-sm font-medium text-primary-800">
                    Specific Goals/Requirements (Optional)
                  </Label>
                  <Textarea
                    {...register('specificRequirements')}
                    id="specificRequirements"
                    placeholder="e.g., Oxbridge preparation, exam technique, confidence building..."
                    rows={3}
                    className="mt-1 resize-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Tutoring Preferences Section */}
          <section aria-labelledby="tutoring-preferences-heading">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <h3 id="tutoring-preferences-heading" className="text-lg font-semibold text-primary-800">
                Tutoring Preferences
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-primary-800">Preferred Format *</Label>
                <Controller
                  control={control}
                  name="tutoringFormat"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online Tutoring</SelectItem>
                        <SelectItem value="in-person">In-Person Tutoring</SelectItem>
                        <SelectItem value="hybrid">Hybrid (Online + In-Person)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-primary-800">Frequency *</Label>
                <Controller
                  control={control}
                  name="frequency"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly Sessions</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly Sessions</SelectItem>
                        <SelectItem value="intensive">Intensive Programme</SelectItem>
                        <SelectItem value="exam-prep">Exam Preparation</SelectItem>
                        <SelectItem value="flexible">Flexible Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-primary-800">Preferred Start Date *</Label>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select start date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate (within days)</SelectItem>
                        <SelectItem value="within-week">Within a week</SelectItem>
                        <SelectItem value="within-month">Within a month</SelectItem>
                        <SelectItem value="next-term">Next term</SelectItem>
                        <SelectItem value="flexible">Flexible timing</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </section>

          {/* Contact Information Section */}
          <section aria-labelledby="contact-info-heading">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <h3 id="contact-info-heading" className="text-lg font-semibold text-primary-800">
                Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentName" className="text-sm font-medium text-primary-800">
                  Parent/Guardian Name *
                </Label>
                <Input
                  {...register('parentName')}
                  id="parentName"
                  placeholder="Your full name"
                  className={cn(
                    "mt-1",
                    errors.parentName && "border-red-500 focus:border-red-500"
                  )}
                  aria-invalid={errors.parentName ? 'true' : 'false'}
                />
                {errors.parentName && (
                  <p className="text-sm text-red-600 mt-1" role="alert">
                    {errors.parentName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-primary-800">
                  Email Address *
                </Label>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className={cn(
                    "mt-1",
                    errors.email && "border-red-500 focus:border-red-500"
                  )}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-primary-800">
                  Phone Number *
                </Label>
                <Input
                  {...register('phone')}
                  id="phone"
                  type="tel"
                  placeholder="07XXX XXX XXX"
                  className={cn(
                    "mt-1",
                    errors.phone && "border-red-500 focus:border-red-500"
                  )}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="postcode" className="text-sm font-medium text-primary-800">
                  <MapPin className="h-4 w-4 inline mr-1" aria-hidden="true" />
                  Postcode *
                </Label>
                <Input
                  {...register('postcode')}
                  id="postcode"
                  placeholder="SW1A 1AA"
                  className={cn(
                    "mt-1",
                    errors.postcode && "border-red-500 focus:border-red-500"
                  )}
                  aria-invalid={errors.postcode ? 'true' : 'false'}
                />
                {errors.postcode && (
                  <p className="text-sm text-red-600 mt-1" role="alert">
                    {errors.postcode.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Additional Information Section */}
          <section aria-labelledby="additional-info-heading">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <h3 id="additional-info-heading" className="text-lg font-semibold text-primary-800">
                Additional Information
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-primary-800">How did you hear about us? *</Label>
                <Controller
                  control={control}
                  name="hearAboutUs"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Please select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google-search">Google Search</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="referral">Personal Referral</SelectItem>
                        <SelectItem value="tatler-address-book">Tatler Address Book</SelectItem>
                        <SelectItem value="school-recommendation">School Recommendation</SelectItem>
                        <SelectItem value="previous-client">Previous Client</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="additionalNotes" className="text-sm font-medium text-primary-800">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  {...register('additionalNotes')}
                  id="additionalNotes"
                  placeholder="Any additional information you'd like to share about your tutoring requirements..."
                  rows={4}
                  className="mt-1 resize-none"
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-accent-600 hover:bg-accent-700 text-white font-medium py-4 text-lg"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                  <span>Submitting Quote Request...</span>
                </div>
              ) : (
                <>
                  <Crown className="h-5 w-5 mr-2" aria-hidden="true" />
                  Request Personalised Quote
                </>
              )}
            </Button>
          </div>

          {/* Privacy Notice */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-gray-600" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700">Complete Confidentiality Guaranteed</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed max-w-2xl mx-auto">
              All enquiries are handled with the utmost discretion and confidentiality. 
              We respect your privacy and maintain the highest standards of data protection. 
              Your information will never be shared with third parties.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}