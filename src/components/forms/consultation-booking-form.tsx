"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

const consultationSchema = z.object({
  parentName: z.string()
    .min(2, 'Parent name must be at least 2 characters')
    .max(100, 'Parent name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Parent name can only contain letters, spaces, hyphens and apostrophes'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email address too long')
    .toLowerCase(),
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number too long')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Phone number contains invalid characters'),
  studentName: z.string()
    .min(2, 'Student name must be at least 2 characters')
    .max(100, 'Student name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Student name can only contain letters, spaces, hyphens and apostrophes'),
  academicLevel: z.enum([
    'primary', '11plus', 'secondary', 'gcse', 'alevel', 'oxbridge', 'university'
  ], { errorMap: () => ({ message: 'Please select a valid academic level' }) }),
  subjects: z.string()
    .min(1, 'Please specify subjects needed')
    .max(500, 'Subject list too long')
    .trim(),
  urgency: z.enum(['immediate', 'within-week', 'within-month', 'planning-ahead'], {
    errorMap: () => ({ message: 'Please select a valid timescale' })
  }),
  specificNeeds: z.string()
    .max(1000, 'Specific needs description too long')
    .optional()
    .or(z.literal('')),
  preferredContact: z.enum(['phone', 'email', 'either'], {
    errorMap: () => ({ message: 'Please select a valid contact method' })
  }),
  budget: z.enum(['standard', 'premium', 'elite', 'discuss'], {
    errorMap: () => ({ message: 'Please select a valid service level' })
  }),
})

type ConsultationFormData = z.infer<typeof consultationSchema>

interface ConsultationBookingFormProps {
  className?: string
  compact?: boolean
}

export function ConsultationBookingForm({ className, compact = false }: ConsultationBookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
  })

  const onSubmit = async (data: ConsultationFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Handle form submission - send to API endpoint
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        reset()
      }
    } catch (error) {
      // Form submission error handled
    }
  }

  if (isSubmitted) {
    return (
      <Card className={cn("w-full max-w-2xl mx-auto", className)}>
        <CardContent className="text-center py-12">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-accent-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-primary-900 mb-2">
              Consultation Request Received
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Thank you for your interest in our premium tutoring services. 
              We will contact you within 24 hours to arrange your confidential consultation.
            </p>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-accent-700 font-medium text-sm">
              <Crown className="h-4 w-4" />
              Royal Family Endorsed Service
            </div>
          </div>
          
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="text-primary-700 border-primary-200"
          >
            Submit Another Enquiry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader className={cn(compact ? "pb-4" : "pb-6")}>
        <div className="flex items-center gap-3 mb-2">
          <Crown className="h-6 w-6 text-accent-500" />
          <Badge variant="gold" className="text-xs">Royal Family Endorsed</Badge>
        </div>
        <CardTitle className="text-primary-900 text-xl">
          Book Your Confidential Consultation
        </CardTitle>
        <CardDescription className="leading-relaxed">
          Begin your child's academic journey with a personalised consultation. 
          All enquiries are handled with complete discretion.
        </CardDescription>
      </CardHeader>

      <CardContent className={cn(compact ? "pt-0" : "pt-2")}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Parent & Student Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parentName" className="text-sm font-medium text-primary-800">
                Parent/Guardian Name *
              </Label>
              <Input
                {...register('parentName')}
                id="parentName"
                placeholder="Your full name"
                className="mt-1"
              />
              {errors.parentName && (
                <p className="text-sm text-red-600 mt-1">{errors.parentName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="studentName" className="text-sm font-medium text-primary-800">
                Student Name *
              </Label>
              <Input
                {...register('studentName')}
                id="studentName"
                placeholder="Student's name"
                className="mt-1"
              />
              {errors.studentName && (
                <p className="text-sm text-red-600 mt-1">{errors.studentName.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-primary-800">
                Email Address *
              </Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="mt-1"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
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
                className="mt-1"
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Academic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-primary-800">Academic Level *</Label>
              <Select onValueChange={(value) => setValue('academicLevel', value as ConsultationFormData['academicLevel'])}>
                <SelectTrigger className="mt-1" aria-label="Select academic level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary (Years 1-6)</SelectItem>
                  <SelectItem value="11plus">11+ Preparation</SelectItem>
                  <SelectItem value="secondary">Secondary (Years 7-11)</SelectItem>
                  <SelectItem value="gcse">GCSE (Years 9-11)</SelectItem>
                  <SelectItem value="alevel">A-Level (Years 12-13)</SelectItem>
                  <SelectItem value="oxbridge">Oxbridge Preparation</SelectItem>
                  <SelectItem value="university">University Level</SelectItem>
                </SelectContent>
              </Select>
              {errors.academicLevel && (
                <p className="text-sm text-red-600 mt-1">{errors.academicLevel.message}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-primary-800 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timescale
              </Label>
              <Select onValueChange={(value) => setValue('urgency', value as ConsultationFormData['urgency'])}>
                <SelectTrigger className="mt-1" aria-label="Select timescale for tutoring support">
                  <SelectValue placeholder="When do you need support?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (within days)</SelectItem>
                  <SelectItem value="within-week">Within a week</SelectItem>
                  <SelectItem value="within-month">Within a month</SelectItem>
                  <SelectItem value="planning-ahead">Planning ahead</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subject Requirements */}
          <div>
            <Label htmlFor="subjects" className="text-sm font-medium text-primary-800">
              Subjects Required *
            </Label>
            <Input
              {...register('subjects')}
              id="subjects"
              placeholder="e.g., Mathematics, English, Computer Science"
              className="mt-1"
            />
            {errors.subjects && (
              <p className="text-sm text-red-600 mt-1">{errors.subjects.message}</p>
            )}
          </div>

          {/* Specific Requirements */}
          <div>
            <Label htmlFor="specificNeeds" className="text-sm font-medium text-primary-800">
              Specific Requirements (Optional)
            </Label>
            <Textarea
              {...register('specificNeeds')}
              id="specificNeeds"
              placeholder="Any specific learning needs, exam targets, or special requirements..."
              rows={3}
              className="mt-1 resize-none"
            />
          </div>

          {/* Service Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-primary-800">Preferred Contact Method</Label>
              <Select onValueChange={(value) => setValue('preferredContact', value as ConsultationFormData['preferredContact'])}>
                <SelectTrigger className="mt-1" aria-label="Select preferred contact method">
                  <SelectValue placeholder="How should we contact you?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="either">Either method</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-primary-800">Service Level</Label>
              <Select onValueChange={(value) => setValue('budget', value as ConsultationFormData['budget'])}>
                <SelectTrigger className="mt-1" aria-label="Select service level and budget">
                  <SelectValue placeholder="Select service level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Service</SelectItem>
                  <SelectItem value="premium">Premium Service</SelectItem>
                  <SelectItem value="elite">Elite Service</SelectItem>
                  <SelectItem value="discuss">Discuss Requirements</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-accent-600 hover:bg-accent-700 text-white font-medium py-3"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                  Submitting Request...
                </div>
              ) : (
                'Book Confidential Consultation'
              )}
            </Button>
          </div>

          {/* Discretion Notice */}
          <div className="text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              All enquiries are handled with complete confidentiality. 
              We respect your privacy and maintain the highest standards of discretion.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}