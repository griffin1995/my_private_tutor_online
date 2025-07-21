# Custom Documentation - Component Patterns & Implementations

## Overview
This file contains proven component patterns, implementations, and configurations used in our projects. All patterns are based on **official documentation only** and have been tested in production.

---

## Component Library Preferences

### Primary Choice: Radix UI + Tailwind CSS (Shadcn/UI Pattern)
**Why**: Unstyled, accessible primitives with full design control
**Use for**: Design systems, custom UI components, maximum flexibility
**Documentation**: Official Radix UI docs only

### Secondary Choice: Mantine
**Why**: Modern components, excellent hooks, built-in accessibility
**Use for**: Rapid development, dashboards, when need complete component suite
**Documentation**: Official Mantine docs only

### Enterprise Choice: Material UI (MUI)
**Why**: Mature, comprehensive, extensive theming
**Use for**: Complex dashboards, enterprise applications, Material Design requirements
**Documentation**: Official MUI docs only

---

## Proven Component Patterns

### Button Component with CVA (Class Variance Authority)
```typescript
// Based on official CVA documentation
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-gold-600 to-gold-500 text-white hover:from-gold-700 hover:to-gold-600',
        secondary: 'border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
```

### Modal Component with Radix UI
```typescript
// Based on official Radix UI Dialog documentation
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  children: React.ReactNode
  trigger: React.ReactNode
  title: string
  description?: string
  className?: string
}

export function Modal({ children, trigger, title, description, className }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl",
          className
        )}>
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </Dialog.Title>
            {description && (
              <Dialog.Description className="text-sm text-gray-600">
                {description}
              </Dialog.Description>
            )}
          </div>
          {children}
          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-600">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

### Form Component with React Hook Form + Zod
```typescript
// Based on official React Hook Form and Zod documentation
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Handle form submission
      console.log(data)
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gold-600 text-white py-3 px-6 rounded-lg hover:bg-gold-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

---

## Animation Patterns

### Framer Motion with Reduced Motion
```typescript
// Based on official Framer Motion documentation
import { motion, useReducedMotion } from 'framer-motion'

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()
  
  const animationProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' }
      }

  return (
    <motion.section {...animationProps}>
      {children}
    </motion.section>
  )
}
```

### Stagger Children Animation
```typescript
// Based on official Framer Motion documentation
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}
```

---

## Utility Patterns

### CN Utility for Class Merging
```typescript
// Based on official clsx and tailwind-merge documentation
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Image Component with Next.js Optimization
```typescript
// Based on official Next.js Image documentation
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={cn(
        'object-cover transition-all duration-300',
        className
      )}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  )
}
```

---

## Layout Patterns

### Container Component
```typescript
// Standard container pattern
interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export function Container({ children, size = 'lg', className }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </div>
  )
}
```

### Section Component with Background Variants
```typescript
interface SectionProps {
  children: React.ReactNode
  background?: 'white' | 'gray' | 'navy' | 'transparent'
  spacing?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Section({ children, background = 'white', spacing = 'md', className }: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    navy: 'bg-navy-900 text-white',
    transparent: 'bg-transparent'
  }

  const spacingClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24'
  }

  return (
    <section className={cn(backgroundClasses[background], spacingClasses[spacing], className)}>
      {children}
    </section>
  )
}
```

---

## Tutoring-Specific Component Patterns

### TrustIndicators Component
```typescript
// Premium trust indicators for tutoring business
import { Crown, Award, Calendar } from 'lucide-react'
import { brandConfig } from '@/config/brand'

interface TrustIndicatorsProps {
  className?: string
  variant?: 'horizontal' | 'vertical' | 'grid'
}

export function TrustIndicators({ className, variant = 'horizontal' }: TrustIndicatorsProps) {
  const indicators = [
    {
      icon: Crown,
      title: brandConfig.credentials.royalEndorsement.title,
      description: brandConfig.credentials.royalEndorsement.description,
    },
    {
      icon: Award, 
      title: brandConfig.credentials.tatlersListing.title,
      description: brandConfig.credentials.tatlersListing.description,
    },
    {
      icon: Calendar,
      title: brandConfig.credentials.experience.description,
      description: `Established ${brandConfig.foundedYear}`,
    },
  ]

  const layoutClasses = {
    horizontal: 'flex flex-row gap-8 justify-center',
    vertical: 'flex flex-col gap-4',
    grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
  }

  return (
    <div className={cn(layoutClasses[variant], className)}>
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center gap-3 text-center md:text-left">
          <indicator.icon className="h-6 w-6 text-gold-500 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-navy-900">{indicator.title}</h3>
            <p className="text-sm text-gray-600">{indicator.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
```

### ServiceCard Component for Academic Subjects
```typescript
// Subject/service cards with academic focus
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, BookOpen, Target } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  subjects: string[]
  levels: string[]
  keyFeatures: string[]
  image?: string
  onLearnMore?: () => void
  onBookConsultation?: () => void
}

export function ServiceCard({
  title,
  description, 
  subjects,
  levels,
  keyFeatures,
  image,
  onLearnMore,
  onBookConsultation,
}: ServiceCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
      {image && (
        <div className="h-48 bg-gray-200 relative overflow-hidden">
          <Image
            src={image}
            alt={`${title} tutoring service`}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="h-5 w-5 text-gold-500" />
          <CardTitle className="text-navy-900">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          <div>
            <h4 className="font-medium text-sm text-navy-800 mb-2 flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Subjects Covered
            </h4>
            <div className="flex flex-wrap gap-1">
              {subjects.map((subject) => (
                <Badge key={subject} variant="secondary" className="text-xs">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm text-navy-800 mb-2 flex items-center gap-1">
              <Target className="h-4 w-4" />
              Key Features
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-gold-500 text-xs mt-1.5">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" size="sm" onClick={onLearnMore} className="flex-1">
            Learn More
          </Button>
          <Button size="sm" onClick={onBookConsultation} className="flex-1">
            Book Consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### ConsultationBookingForm Component
```typescript
// Booking form for tutoring consultations
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const consultationSchema = z.object({
  parentName: z.string().min(2, 'Parent name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  studentName: z.string().min(2, 'Student name must be at least 2 characters'),
  academicLevel: z.string().min(1, 'Please select an academic level'),
  subjects: z.string().min(1, 'Please specify subjects needed'),
  urgency: z.enum(['immediate', 'within-week', 'within-month', 'planning-ahead']),
  specificNeeds: z.string().optional(),
  preferredContact: z.enum(['phone', 'email', 'either']),
  budget: z.enum(['standard', 'premium', 'elite', 'discuss']),
})

type ConsultationFormData = z.infer<typeof consultationSchema>

export function ConsultationBookingForm() {
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
      // Handle form submission - send to API endpoint
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        // Success handling
        reset()
      }
    } catch (error) {
      console.error('Consultation booking error:', error)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-navy-900">Book Your Confidential Consultation</CardTitle>
        <CardDescription>
          Begin your child's academic journey with a personalised consultation
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parentName">Parent/Guardian Name *</Label>
              <Input
                {...register('parentName')}
                id="parentName"
                placeholder="Your full name"
              />
              {errors.parentName && (
                <p className="text-sm text-red-600 mt-1">{errors.parentName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="studentName">Student Name *</Label>
              <Input
                {...register('studentName')}
                id="studentName"
                placeholder="Student's name"
              />
              {errors.studentName && (
                <p className="text-sm text-red-600 mt-1">{errors.studentName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                {...register('phone')}
                id="phone"
                type="tel"
                placeholder="07XXX XXX XXX"
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="academicLevel">Academic Level *</Label>
              <Select onValueChange={(value) => setValue('academicLevel', value)}>
                <SelectTrigger>
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
              <Label htmlFor="urgency">Timescale</Label>
              <Select onValueChange={(value) => setValue('urgency', value as any)}>
                <SelectTrigger>
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

          <div>
            <Label htmlFor="subjects">Subjects Required *</Label>
            <Input
              {...register('subjects')}
              id="subjects"
              placeholder="e.g., Mathematics, English, Computer Science"
            />
            {errors.subjects && (
              <p className="text-sm text-red-600 mt-1">{errors.subjects.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="specificNeeds">Specific Requirements</Label>
            <Textarea
              {...register('specificNeeds')}
              id="specificNeeds"
              placeholder="Any specific learning needs, exam targets, or requirements..."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Book Confidential Consultation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

---

## Documentation Rules for This File

1. **Only add patterns that have been tested in production**
2. **Always reference official documentation source**
3. **Include accessibility considerations**
4. **Show error handling where applicable**
5. **Use TypeScript with proper interfaces**
6. **Follow established naming conventions**
7. **Update patterns when new versions are released**

---

*Last Updated: 2025-01-24*
*Status: Active - Add new patterns as they are proven in projects*