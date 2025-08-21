# COMPREHENSIVE IMPLEMENTATION PROMPT: TESTIMONIALS & SERVICE TUITION PAGES OVERHAUL

## 🎯 CRITICAL IMPLEMENTATION PROTOCOL

### The Prompt

```
You are the implementation coordinator for My Private Tutor Online's critical page overhauls. You will execute a precise, methodical implementation of 9 identified issues across the Testimonials and Service Tuition pages.

## MANDATORY EXECUTION PROTOCOL

### USER CONTROL REQUIREMENTS
1. **STOP after EVERY task** - Wait for user to type "continue" before proceeding
2. **DISPLAY implementation preview** - Show exact code changes before execution
3. **CONFIRM current state** - Verify existing code matches expectations
4. **TEST after each change** - Run verification before requesting continuation
5. **PROVIDE rollback command** - Include exact undo procedure for every change

### AGENT ORCHESTRATION MATRIX

**Primary Coordinator**: context-manager
- Oversees entire implementation sequence
- Validates Context7 MCP documentation compliance
- Manages agent transitions and handoffs
- Ensures manual approval gates are respected

**Implementation Agents**:
- **frontend-developer**: UI components, React implementations, styling fixes
- **content-manager**: CMS data restructuring, JSON migrations, content updates
- **security-auditor**: GDPR compliance validation, form security checks
- **performance-engineer**: Bundle size monitoring, load time optimization
- **deployment-engineer**: Build verification, production deployment checks

## PHASE 1: TESTIMONIALS PAGE IMPLEMENTATION [5 TASKS]

### TASK 1: CROWN/ROYAL CONTENT REMOVAL
**Agent**: content-manager
**Priority**: CRITICAL - Legal Compliance

**PRE-IMPLEMENTATION VERIFICATION**:
```bash
# Check current testimonials content
grep -r "crown\|royal\|palace" src/content/testimonials.json
grep -r "crown\|royal\|palace" src/components/testimonials/
```

**IMPLEMENTATION STEPS**:
1. Read current testimonials.json structure
2. Identify all royal/crown references in:
   - src/content/testimonials.json (lines TBD after read)
   - src/components/testimonials/testimonial-card.tsx (check SVG icons)
   - src/components/testimonials/elite-schools-carousel.tsx (check crown icons)

**EXACT CHANGES**:
```typescript
// CONTEXT7 SOURCE: /react/react - Component props validation
// File: src/content/testimonials.json
// Remove these specific entries:
- Any testimonial with "Royal" in author.name
- Any testimonial with "Palace" in author.context
- Any testimonial with crown-related content

// File: src/components/testimonials/testimonial-card.tsx
// Remove crown SVG icon if present:
- const CrownIcon = () => <svg>...</svg>
- Replace with neutral icon or remove icon display
```

**POST-IMPLEMENTATION TESTING**:
```bash
npm run build
# Verify no crown/royal references remain
grep -r "crown\|royal\|palace" src/
# Check page renders without errors
npm run dev
# Navigate to /testimonials and verify display
```

**ROLLBACK PROCEDURE**:
```bash
git checkout -- src/content/testimonials.json
git checkout -- src/components/testimonials/
```

**APPROVAL GATE**: ⏸️ STOP - User must type "continue" to proceed to Task 2

---

### TASK 2: CMS DATA SOURCE UNIFICATION
**Agent**: content-manager → frontend-developer
**Priority**: HIGH - Data Consistency

**PRE-IMPLEMENTATION VERIFICATION**:
```bash
# Identify all testimonial data sources
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "testimonial"
# Check for duplicate data structures
ls -la src/content/ | grep testimonial
```

**IMPLEMENTATION STEPS**:
1. Consolidate testimonial data sources:
   - Primary: src/content/testimonials.json
   - Secondary: src/lib/cms/cms-content.ts (if testimonials exist)
   - Remove any hardcoded testimonials in components

**EXACT CHANGES**:
```typescript
// CONTEXT7 SOURCE: /typescript/handbook - Module imports and exports
// File: src/lib/cms/cms-content.ts
// Add unified testimonial export:
import testimonialData from '../../content/testimonials.json';

export const getTestimonials = (): TestimonialType[] => {
  return testimonialData.testimonials; // MANDATORY: Synchronous return
};

// File: src/components/testimonials/video-testimonials.tsx
// Update import to use centralized source:
import { getTestimonials } from '@/lib/cms/cms-content';

const testimonials = getTestimonials(); // Direct synchronous call
```

**POST-IMPLEMENTATION TESTING**:
```bash
# Verify single source of truth
grep -r "import.*testimonials\.json" src/
# Should only show cms-content.ts import
npm run type-check
npm run build
```

**ROLLBACK PROCEDURE**:
```bash
git checkout -- src/lib/cms/cms-content.ts
git checkout -- src/components/testimonials/
```

**APPROVAL GATE**: ⏸️ STOP - User must type "continue" to proceed to Task 3

---

### TASK 3: VIDEO TESTIMONIAL INTEGRATION
**Agent**: frontend-developer
**Priority**: HIGH - User Engagement

**PRE-IMPLEMENTATION VERIFICATION**:
```bash
# Check current video implementation
cat src/components/testimonials/video-testimonials.tsx
# Verify video file locations
ls -la public/videos/testimonials/
```

**IMPLEMENTATION STEPS**:
1. Update VideoTestimonial component for real videos
2. Implement proper thumbnail generation
3. Add loading states and error handling

**EXACT CHANGES**:
```typescript
// CONTEXT7 SOURCE: /react/react - Video element handling
// File: src/components/testimonials/video-testimonials.tsx

interface VideoTestimonial {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  studentName: string;
  achievement: string;
  duration: string;
}

const VideoTestimonialCard: React.FC<{ testimonial: VideoTestimonial }> = ({ testimonial }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden">
      {!isPlaying ? (
        <>
          <img 
            src={testimonial.thumbnailUrl} 
            alt={`${testimonial.studentName} testimonial`}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/30"
            aria-label="Play video testimonial"
          >
            <PlayIcon className="w-16 h-16 text-white" />
          </button>
          <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
            {testimonial.duration}
          </span>
        </>
      ) : (
        <video 
          src={testimonial.videoUrl}
          controls
          autoPlay
          className="w-full h-full"
        />
      )}
    </div>
  );
};
```

**VIDEO DATA STRUCTURE UPDATE**:
```json
// File: src/content/testimonials.json
// Add video testimonials section:
{
  "videoTestimonials": [
    {
      "id": "vt-001",
      "videoUrl": "/videos/testimonials/student-success-1.mp4",
      "thumbnailUrl": "/images/testimonials/video-thumb-1.jpg",
      "studentName": "James M",
      "achievement": "Oxford Mathematics Offer",
      "duration": "2:45"
    }
  ]
}
```

**POST-IMPLEMENTATION TESTING**:
```bash
# Verify video files exist
ls -la public/videos/testimonials/
# Test video playback
npm run dev
# Navigate to /testimonials and test video functionality
# Check console for any media errors
```

**ROLLBACK PROCEDURE**:
```bash
git checkout -- src/components/testimonials/video-testimonials.tsx
git checkout -- src/content/testimonials.json
```

**APPROVAL GATE**: ⏸️ STOP - User must type "continue" to proceed to Task 4

---

### TASK 4: ELITE SCHOOLS CAROUSEL ENHANCEMENT
**Agent**: frontend-developer
**Priority**: MEDIUM - UX Enhancement

**PRE-IMPLEMENTATION VERIFICATION**:
```bash
# Check current carousel implementation
cat src/components/testimonials/elite-schools-carousel.tsx
# Verify carousel functionality
grep -n "hover" src/components/testimonials/elite-schools-carousel.tsx
```

**IMPLEMENTATION STEPS**:
1. Add hover state for statistics display
2. Implement smooth transition animations
3. Ensure mobile touch compatibility

**EXACT CHANGES**:
```typescript
// CONTEXT7 SOURCE: /framer-motion/motion - Animation variants
// File: src/components/testimonials/elite-schools-carousel.tsx

const SchoolCard: React.FC<{ school: EliteSchool }> = ({ school }) => {
  const [showStats, setShowStats] = useState(false);
  
  return (
    <motion.div
      className="relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      onHoverStart={() => setShowStats(true)}
      onHoverEnd={() => setShowStats(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6">
        <img 
          src={school.logo} 
          alt={school.name}
          className="h-20 w-auto mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-center mb-2">
          {school.name}
        </h3>
        
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-gradient-to-t from-blue-900/95 to-blue-800/95 p-6 flex flex-col justify-center"
            >
              <div className="text-white space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">Success Rate</span>
                  <span className="font-bold">{school.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">Students Placed</span>
                  <span className="font-bold">{school.studentsPlaced}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">Years Experience</span>
                  <span className="font-bold">{school.yearsExperience}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
```

**MOBILE COMPATIBILITY UPDATE**:
```typescript
// Add touch event handling for mobile
const handleTouchStart = () => setShowStats(true);
const handleTouchEnd = () => setTimeout(() => setShowStats(false), 2000);

// Add to SchoolCard div:
onTouchStart={handleTouchStart}
onTouchEnd={handleTouchEnd}
```

**POST-IMPLEMENTATION TESTING**:
```bash
# Test build with new animations
npm run build
# Test hover functionality
npm run dev
# Test on mobile viewport (375px width)
# Verify statistics display correctly on hover/touch
```

**ROLLBACK PROCEDURE**:
```bash
git checkout -- src/components/testimonials/elite-schools-carousel.tsx
```

**APPROVAL GATE**: ⏸️ STOP - User must type "continue" to proceed to Task 5

---

### TASK 5: TESTIMONIALS PAGE QUALITY VALIDATION
**Agent**: performance-engineer → deployment-engineer
**Priority**: CRITICAL - Final Verification

**PRE-IMPLEMENTATION VERIFICATION**:
```bash
# Run full test suite
npm run test
# Check accessibility
npm run lint
# Verify build time
time npm run build
```

**VALIDATION CHECKLIST**:
1. **Performance Metrics**:
   - Page load time < 1.5s
   - Bundle size < 250kB
   - No layout shifts (CLS < 0.1)

2. **Accessibility Compliance**:
   - All videos have captions
   - Keyboard navigation functional
   - Screen reader compatible
   - WCAG 2.1 AA compliant

3. **Content Verification**:
   - Zero crown/royal references
   - All testimonials from CMS
   - Videos play correctly
   - Carousel animations smooth

**TESTING COMMANDS**:
```bash
# Lighthouse performance audit
npx lighthouse http://localhost:3000/testimonials --output json --output-path ./lighthouse-report.json

# Bundle size analysis
npm run analyze

# Accessibility audit
npx pa11y http://localhost:3000/testimonials

# Visual regression test (if configured)
npm run test:visual
```

**ROLLBACK PROCEDURE**:
```bash
# Full rollback to pre-implementation state
git checkout -- src/components/testimonials/
git checkout -- src/content/testimonials.json
git checkout -- src/lib/cms/
```

**APPROVAL GATE**: ⏸️ STOP - User must type "continue" to proceed to Phase 2

---

## PHASE 2: SERVICE TUITION PAGE IMPLEMENTATION [4 TASKS]

### TASK 6: TYPOGRAPHY FIX - GOLD QUOTATION MARKS
**Agent**: frontend-developer
**Priority**: HIGH - Visual Polish

**PRE-IMPLEMENTATION VERIFICATION**:
```bash
# Locate quotation mark implementation
grep -n "quotation\|quote" src/app/service-tuition/
grep -n "text-gold\|text-yellow" src/app/service-tuition/
```

**IMPLEMENTATION STEPS**:
1. Identify quotation mark positioning issue
2. Apply CSS fixes for proper alignment
3. Ensure responsive behavior

**EXACT CHANGES**:
```typescript
// CONTEXT7 SOURCE: /tailwindcss/docs - Typography utilities
// File: src/app/service-tuition/page.tsx or relevant component

// Current problematic implementation (example):
<span className="text-6xl text-yellow-500 absolute -top-4 -left-2">"</span>

// Fixed implementation:
<span className="text-6xl text-yellow-500 absolute top-0 left-0 transform -translate-x-2 -translate-y-2 leading-none">
  "
</span>

// Alternative CSS-in-JS solution:
const QuotationMark = styled.span`
  position: absolute;
  top: -0.25rem;
  left: -0.5rem;
  font-size: 3.75rem;
  line-height: 1;
  color: rgb(234 179 8);
  font-family: Georgia, serif;
`;
```

**RESPONSIVE ADJUSTMENTS**:
```css
/* Add to component styles */
@media (max-width: 768px) {
  .quotation-mark {
    font-size: 2.5rem;
    top: -0.125rem;
    left: -0.25rem;
  }
}
```

**POST-IMPLEMENTATION TESTING**:
```bash
# Visual verification at different viewports
npm run dev
# Test at: 375px, 768px, 1024px, 1440px widths
# Verify quotation marks don't overlap text
# Check print styles if applicable
```

**ROLLBACK PROCEDURE**:
```bash
git checkout -- src/app/service-tuition/
```

**APPROVAL GATE**: ⏸️ STOP - User must type "continue" to proceed to Task 7

---

### TASK 7: UCAS MASTERCLASS VIDEO THUMBNAIL
**Agent**: frontend-developer → content-manager
**Priority**: MEDIUM - Navigation Enhancement

**PRE-IMPLEMENTATION VERIFICATION**:
```bash
# Check current UCAS section
grep -n "UCAS\|masterclass" src/app/service-tuition/
# Verify video assets
ls -la public/images/ucas/
```

**IMPLEMENTATION STEPS**:
1. Create video thumbnail component
2. Add navigation to video content
3. Implement loading states

**EXACT CHANGES**:
```typescript
// CONTEXT7 SOURCE: /next/image - Image optimization
// File: src/app/service-tuition/ucas-section.tsx (or create if needed)

import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

const UCASMasterclassCard: React.FC = () => {
  return (
    <Link 
      href="/resources/ucas-masterclass-video"
      className="group relative block overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
    >
      <div className="relative aspect-video">
        <Image
          src="/images/ucas/masterclass-thumbnail.jpg"
          alt="UCAS Masterclass: Complete Application Guide"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="h-16 w-16 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
        </div>
        
        {/* Video duration badge */}
        <span className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
          45:30
        </span>
      </div>
      
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          UCAS Masterclass: Complete Application Guide
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Expert guidance on personal statements, references, and maximising your application success
        </p>
        <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-600">
          Watch now
          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default UCASMasterclassCard;
```

**INTEGRATION INTO SERVICE PAGE**:
```typescript
// File: src/app/service-tuition/page.tsx
// Add in appropriate section:
import UCASMasterclassCard from './ucas-section';

// Within the page component:
<section className="py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8">UCAS Application Support</h2>
    <UCASMasterclassCard />
  </div>
</section>
```

**POST-IMPLEMENTATION TESTING**:
```bash
# Verify image optimization
npm run build
# Check image loading
npm run dev
# Test navigation to video page
# Verify responsive behavior
```

**ROLLBACK PROCEDURE**:
```bash
git checkout -- src/app/service-tuition/
rm -f src/app/service-tuition/ucas-section.tsx
```

**APPROVAL GATE**: ⏸️ STOP - User must type "continue" to proceed to Task 8

---

### TASK 8: LEAD GENERATION FORM IMPLEMENTATION
**Agent**: frontend-developer → security-auditor
**Priority**: CRITICAL - Business Impact

**PRE-IMPLEMENTATION VERIFICATION**:
```bash
# Check existing form implementations
find src -name "*form*.tsx" -type f
# Verify GDPR compliance components
grep -r "gdpr\|privacy\|consent" src/
```

**IMPLEMENTATION STEPS**:
1. Create lead generation form component
2. Implement GDPR-compliant consent
3. Add form validation and security
4. Integrate with backend/email service

**EXACT CHANGES**:
```typescript
// CONTEXT7 SOURCE: /react-hook-form/react-hook-form - Form validation
// File: src/components/forms/service-tuition-lead-form.tsx (new file)

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  parentName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number'),
  studentAge: z.string().min(1, 'Please select student age'),
  subject: z.string().min(1, 'Please select a subject'),
  examBoard: z.string().optional(),
  currentGrade: z.string().optional(),
  targetGrade: z.string().optional(),
  additionalInfo: z.string().max(500, 'Maximum 500 characters').optional(),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy'
  }),
  marketingConsent: z.boolean().optional()
});

type FormData = z.infer<typeof formSchema>;

export const ServiceTuitionLeadForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // CONTEXT7 SOURCE: /next/app - API route handling
      const response = await fetch('/api/service-tuition-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'service-tuition-page'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
      reset();
      
      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION-ID',
          'value': 1.0,
          'currency': 'GBP'
        });
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again or contact us directly.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Get Expert Tuition for Your Child
      </h2>
      <p className="text-gray-600 mb-8">
        Complete this form for a free consultation and personalised tuition recommendations
      </p>

      {submitSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          <p className="font-semibold">Thank you for your enquiry!</p>
          <p className="mt-1">We'll contact you within 24 hours to discuss your requirements.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Parent/Guardian Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>
            
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                Parent/Guardian Name *
              </label>
              <input
                {...register('parentName')}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
              {errors.parentName && (
                <p className="mt-1 text-sm text-red-600">{errors.parentName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+44 20 1234 5678"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Student Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Student Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="studentAge" className="block text-sm font-medium text-gray-700 mb-1">
                  Student Age/Year Group *
                </label>
                <select
                  {...register('studentAge')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select age/year</option>
                  <option value="year-6">Year 6 (10-11)</option>
                  <option value="year-7">Year 7 (11-12)</option>
                  <option value="year-8">Year 8 (12-13)</option>
                  <option value="year-9">Year 9 (13-14)</option>
                  <option value="year-10">Year 10 (14-15)</option>
                  <option value="year-11">Year 11 (15-16)</option>
                  <option value="year-12">Year 12 (16-17)</option>
                  <option value="year-13">Year 13 (17-18)</option>
                </select>
                {errors.studentAge && (
                  <p className="mt-1 text-sm text-red-600">{errors.studentAge.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Required *
                </label>
                <select
                  {...register('subject')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select subject</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="english">English</option>
                  <option value="sciences">Sciences</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="history">History</option>
                  <option value="geography">Geography</option>
                  <option value="languages">Modern Languages</option>
                  <option value="11-plus">11+ Preparation</option>
                  <option value="oxbridge">Oxbridge Preparation</option>
                  <option value="multiple">Multiple Subjects</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="examBoard" className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Board (if known)
                </label>
                <input
                  {...register('examBoard')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., AQA, Edexcel"
                />
              </div>

              <div>
                <label htmlFor="currentGrade" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Grade
                </label>
                <input
                  {...register('currentGrade')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Grade 6"
                />
              </div>

              <div>
                <label htmlFor="targetGrade" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Grade
                </label>
                <input
                  {...register('targetGrade')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Grade 8"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information (Optional)
            </label>
            <textarea
              {...register('additionalInfo')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about any specific requirements, learning difficulties, or goals..."
            />
            {errors.additionalInfo && (
              <p className="mt-1 text-sm text-red-600">{errors.additionalInfo.message}</p>
            )}
          </div>

          {/* GDPR Compliance */}
          <div className="space-y-3 border-t pt-6">
            <div className="flex items-start">
              <input
                {...register('gdprConsent')}
                type="checkbox"
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="gdprConsent" className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <a href="/legal/privacy-policy" className="text-blue-600 underline" target="_blank">
                  Privacy Policy
                </a>{' '}
                and understand how my data will be used to provide tuition services *
              </label>
            </div>
            {errors.gdprConsent && (
              <p className="ml-6 text-sm text-red-600">{errors.gdprConsent.message}</p>
            )}

            <div className="flex items-start">
              <input
                {...register('marketingConsent')}
                type="checkbox"
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="marketingConsent" className="ml-2 text-sm text-gray-700">
                I would like to receive updates about tuition services and educational resources
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
            </button>
            
            <p className="text-sm text-gray-500">
              Or call us: <a href="tel:+442012345678" className="font-semibold text-blue-600">020 1234 5678</a>
            </p>
          </div>

          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              <p>{submitError}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
};
```

**API ROUTE IMPLEMENTATION**:
```typescript
// CONTEXT7 SOURCE: /next/app - Route handlers
// File: src/app/api/service-tuition-lead/route.ts (new file)

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const leadSchema = z.object({
  parentName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  studentAge: z.string(),
  subject: z.string(),
  examBoard: z.string().optional(),
  currentGrade: z.string().optional(),
  targetGrade: z.string().optional(),
  additionalInfo: z.string().optional(),
  gdprConsent: z.boolean(),
  marketingConsent: z.boolean().optional(),
  timestamp: z.string(),
  source: z.string()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);
    
    // Store in database (implementation depends on your setup)
    // await prisma.lead.create({ data: validatedData });
    
    // Send notification email
    await sendNotificationEmail(validatedData);
    
    // Send confirmation email to parent
    await sendConfirmationEmail(validatedData.email, validatedData.parentName);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Lead submitted successfully' 
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid submission data' },
      { status: 400 }
    );
  }
}

async function sendNotificationEmail(data: any) {
  // Email implementation using your preferred service
  // Example: SendGrid, AWS SES, Resend, etc.
}

async function sendConfirmationEmail(email: string, name: string) {
  // Send confirmation to parent
}
```

**INTEGRATION INTO SERVICE PAGE**:
```typescript
// File: src/app/service-tuition/page.tsx
// Add form to page:
import { ServiceTuitionLeadForm } from '@/components/forms/service-tuition-lead-form';

// Within page component:
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <ServiceTuitionLeadForm />
  </div>
</section>
```

**POST-IMPLEMENTATION TESTING**:
```bash
# Test form validation
npm run dev
# Submit test data with various validation scenarios
# Verify GDPR checkbox is mandatory
# Test API endpoint
curl -X POST http://localhost:3000/api/service-tuition-lead \
  -H "Content-Type: application/json" \
  -d '{"parentName":"Test","email":"test@test.com",...}'
# Verify email notifications (if configured)
```

**SECURITY VALIDATION**:
```bash
# Check for XSS vulnerabilities
npm audit
# Verify HTTPS in production
# Test rate limiting on API endpoint
# Verify GDPR compliance
```

**ROLLBACK PROCEDURE**:
```bash
git checkout -- src/app/service-tuition/
rm -f src/components/forms/service-tuition-lead-form.tsx
rm -rf src/app/api/service-tuition-lead/
```

**APPROVAL GATE**: ⏸️ STOP - User must type "continue" to proceed to Task 9

---

### TASK 9: COMPREHENSIVE INTEGRATION TESTING
**Agent**: deployment-engineer
**Priority**: CRITICAL - Final Validation

**PRE-DEPLOYMENT CHECKLIST**:
```bash
# Full system test
npm run test:e2e
# Build verification
npm run build
# Type checking
npm run type-check
# Linting
npm run lint
```

**INTEGRATION TEST SCENARIOS**:

1. **Testimonials Page Tests**:
   - Navigate to /testimonials
   - Verify no crown/royal content displays
   - Test video playback functionality
   - Verify carousel hover interactions
   - Check mobile responsiveness
   - Validate accessibility compliance

2. **Service Tuition Page Tests**:
   - Navigate to /service-tuition
   - Verify quotation marks display correctly
   - Test UCAS video thumbnail navigation
   - Complete lead form submission
   - Verify GDPR consent requirement
   - Test form validation messages
   - Check email notifications

3. **Cross-Page Integration**:
   - Test navigation between pages
   - Verify consistent styling
   - Check shared component functionality
   - Validate CMS data consistency

**PERFORMANCE VALIDATION**:
```bash
# Bundle size check
npm run analyze
# Should be < 250kB first load JS

# Build time check
time npm run build
# Should be < 25 seconds

# Lighthouse scores
npx lighthouse http://localhost:3000/testimonials --view
npx lighthouse http://localhost:3000/service-tuition --view
# Target: Performance > 90, Accessibility > 95
```

**PRODUCTION READINESS**:
```bash
# Environment variables check
cat .env.production
# Verify all required vars are set

# Preview deployment
npm run build && npm run start
# Test production build locally

# Final git status
git status
git diff --stat
```

**DEPLOYMENT COMMAND**:
```bash
# After all tests pass
git add -A
git commit -m "feat: Complete implementation of Testimonials and Service Tuition page overhauls

- Removed all crown/royal references from testimonials
- Unified CMS data sources for testimonials
- Implemented real video testimonials with thumbnails
- Enhanced EliteSchoolsCarousel with hover statistics
- Fixed gold quotation mark positioning issues
- Added UCAS masterclass video navigation
- Implemented GDPR-compliant lead generation form
- Validated performance and accessibility standards

CONTEXT7 SOURCES: All implementations backed by official documentation"

# Push to branch
git push origin feature/testimonials-service-overhaul

# Create PR for review
gh pr create --title "Testimonials & Service Tuition Pages Complete Overhaul" \
  --body "Implementation of 9 identified improvements across both pages"
```

**ROLLBACK PROCEDURE**:
```bash
# Complete rollback if any issues
git reset --hard HEAD~1
git clean -fd
```

**FINAL SIGN-OFF CHECKLIST**:
- [ ] All 9 tasks completed successfully
- [ ] Zero crown/royal references remain
- [ ] Forms are GDPR compliant
- [ ] Videos play correctly
- [ ] Build time < 25 seconds
- [ ] Bundle size < 250kB
- [ ] All tests passing
- [ ] Accessibility validated
- [ ] Production deployment successful

**COMPLETION CONFIRMATION**: ✅ Implementation Complete - Awaiting final user approval

## CRITICAL REMINDERS

1. **STOP AFTER EVERY TASK** - Do not proceed without "continue" confirmation
2. **VERIFY BEFORE CHANGING** - Always check current state first
3. **TEST AFTER IMPLEMENTATION** - Validate each change works correctly
4. **DOCUMENT EVERYTHING** - Include Context7 sources for all changes
5. **MAINTAIN ROLLBACK ABILITY** - Ensure every change can be undone

## EMERGENCY PROTOCOLS

**If Build Fails**:
```bash
npm run clean
rm -rf .next
npm install
npm run build
```

**If Homepage Breaks**:
- Check for async CMS patterns
- Verify synchronous data access
- Remove any useState/useEffect for static content

**If Deploy Fails**:
- Check environment variables
- Verify Vercel configuration
- Test with force-dynamic setting
```

### Implementation Notes

**Key Techniques Used:**
1. **Manual Approval Gates**: Explicit "continue" requirement after every single task ensures complete user control
2. **Atomic Operations**: Each task is self-contained and reversible
3. **Progressive Enhancement**: Building from critical fixes to nice-to-have features
4. **Documentation Compliance**: Every code change references Context7 MCP sources
5. **Multi-Agent Orchestration**: Specialized agents for each domain of expertise

**Why These Choices:**
- **Safety First**: Manual gates prevent runaway implementations
- **Traceability**: Every change is documented with source and reasoning
- **Rollback Capability**: Each task includes exact undo procedures
- **Testing Integration**: Validation steps ensure quality at each stage
- **British Standards**: Maintains royal client quality throughout

**Expected Outcomes:**
- **Testimonials Page**: Legally compliant, performance-optimized, enhanced UX
- **Service Tuition Page**: Professional polish, improved lead generation, better navigation
- **Overall Impact**: Increased conversion rates, better user engagement, maintained premium standards

**Performance Benchmarks:**
- Page Load: < 1.5 seconds
- Build Time: < 25 seconds  
- Bundle Size: < 250kB
- Lighthouse Scores: Performance > 90, Accessibility > 95

**Error Handling Strategies:**
- Pre-implementation verification catches mismatches
- Rollback procedures for every single change
- Emergency protocols for critical failures
- Complete git history for disaster recovery