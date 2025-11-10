# Component Refactor Roadmap - My Private Tutor Online
**Created:** 4 November 2025
**Based On:** REACT_COMPONENT_ANALYSIS_REPORT.md
**Purpose:** Actionable implementation guide for component architecture improvements

---

## Quick Start: Priority Matrix

| Priority | Task | Impact | Effort | Status |
|----------|------|--------|--------|--------|
| 🔴 P1.1 | Add Bundle Analyzer | High | 15 min | ⏳ Not Started |
| 🔴 P1.2 | Implement Suspense Boundaries | High | 2-3 hrs | ⏳ Not Started |
| 🔴 P1.3 | React 19 Form Actions | High | 4-6 hrs | ⏳ Not Started |
| 🟡 P2.1 | Refactor Navigation Component | High | 1-2 days | ⏳ Not Started |
| 🟡 P2.2 | Global State Management | High | 2-3 days | ⏳ Not Started |
| 🟡 P2.3 | Standardise Responsive Spacing | High | 2-3 days | ⏳ Not Started |
| 🟢 P3.1 | Container Queries | Medium | 3-5 days | ⏳ Not Started |
| 🟢 P3.2 | List Virtualization | Medium | 1-2 days | ⏳ Not Started |
| 🟢 P3.3 | Composable Components | Medium | 1-2 weeks | ⏳ Not Started |

---

## Phase 1: Quick Wins (Week 1)

### Task 1.1: Bundle Analyzer Setup
**Time Estimate:** 15 minutes
**Files Modified:** 2 files

#### Step-by-Step Implementation

**1. Install dependency:**
```bash
cd /home/jack/Documents/my_private_tutor_online
npm install --save-dev @next/bundle-analyzer
```

**2. Update next.config.ts:**
```typescript
// /home/jack/Documents/my_private_tutor_online/next.config.ts
import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // ... keep all existing config
  experimental: {
    // ... keep existing experimental features
  },
};

export default withBundleAnalyzer(nextConfig);
```

**3. Add npm scripts:**
```json
// /home/jack/Documents/my_private_tutor_online/package.json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "analyze:browser": "npm run analyze && open .next/analyze/client.html"
  }
}
```

**4. Run analysis:**
```bash
npm run analyze
# Opens interactive bundle visualisation in browser
```

**Acceptance Criteria:**
- ✅ Bundle analyzer generates reports successfully
- ✅ Can identify largest dependencies
- ✅ No impact on production builds

---

### Task 1.2: Suspense Boundaries
**Time Estimate:** 2-3 hours
**Files Modified:** 3-5 page files
**⚠️ CRITICAL:** Must maintain synchronous CMS architecture

#### Implementation Plan

**1. Create skeleton components:**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/components/skeletons/AboutSectionSkeleton.tsx
'use client';

export function AboutSectionSkeleton() {
  return (
    <section className='pt-15 lg:pt-20 bg-gradient-to-br from-token-brand-50 to-token-brand-100'>
      <div className='container mx-auto px-12 sm:px-16 lg:px-24 xl:px-32 2xl:px-40'>
        <div className='grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12'>
          <div className='space-y-4'>
            {/* Skeleton heading */}
            <div className='h-12 bg-gray-200 rounded animate-pulse' />
            {/* Skeleton paragraphs */}
            <div className='h-6 bg-gray-200 rounded animate-pulse' />
            <div className='h-6 bg-gray-200 rounded animate-pulse' />
            <div className='h-6 bg-gray-200 rounded animate-pulse w-3/4' />
          </div>
          <div className='hidden lg:block'>
            <div className='w-[400px] h-[500px] bg-gray-200 rounded animate-pulse' />
          </div>
        </div>
      </div>
    </section>
  );
}
```

**2. Update homepage with Suspense:**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/app/page.tsx
import { Suspense } from 'react';
import { AboutSectionSkeleton } from '@/components/skeletons/AboutSectionSkeleton';

export default async function HomePage() {
  // ✅ CORRECT: Synchronous CMS access (CRITICAL)
  const services = SERVICES_DATA;
  const recognitionCards = RECOGNITION_CARDS_DATA;

  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden bg-white'>
      <Navigation isHomepage={false} />

      <main className='flex-1' role='main' id='main-content' tabIndex={-1}>
        {/* Hero loads immediately (static) */}
        <section id='hero-premium-tutoring-landing-combined'>
          <video src='/videos/background-video-2025.mp4' autoPlay muted loop />
          <ScrollingLogos logos={SCHOOL_LOGOS_ARRAY} />
        </section>

        {/* About section with Suspense boundary */}
        <ErrorBoundaryWrapper sectionName='About Section'>
          <Suspense fallback={<AboutSectionSkeleton />}>
            <AboutSectionClient recognitionCards={recognitionCards} />
          </Suspense>
        </ErrorBoundaryWrapper>

        {/* Founder section with Suspense */}
        <Suspense fallback={<FounderSectionSkeleton />}>
          <FounderIntroductionSection />
        </Suspense>

        {/* Services carousel with Suspense */}
        <ErrorBoundaryWrapper sectionName='Who We Support Services'>
          <Suspense fallback={<ServicesCarouselSkeleton />}>
            <LazyServicesCarousel
              services={services}
              studentImages={studentImages}
            />
          </Suspense>
        </ErrorBoundaryWrapper>
      </main>

      <PageFooter showContactForm={true} />
    </div>
  );
}
```

**⚠️ CRITICAL RULES:**
- NO async data fetching inside Suspense boundaries
- Data must come from synchronous `SERVICES_DATA` / `RECOGNITION_CARDS_DATA`
- Suspense is ONLY for component code splitting, NOT data loading
- Any violation risks August 2025 homepage failure recurrence

**Acceptance Criteria:**
- ✅ Hero section renders immediately
- ✅ Skeleton components show while sections load
- ✅ No loading spinners that never resolve
- ✅ Synchronous CMS architecture maintained
- ✅ Improved Time to First Byte (TTFB)

---

### Task 1.3: React 19 Form Actions
**Time Estimate:** 4-6 hours
**Files Created:** 1 server action file
**Files Modified:** 1-2 form components

#### Implementation Plan

**1. Create server action:**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/app/actions/contact.ts
'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

// Reuse existing Zod schema
const consultationSchema = z.object({
  parentName: z.string().min(2).max(100).regex(/^[a-zA-Z\s'-]+$/),
  email: z.string().email().max(255).toLowerCase(),
  phone: z.string().min(10).max(20).regex(/^[\d\s\-\+\(\)]+$/),
  studentName: z.string().min(2).max(100).regex(/^[a-zA-Z\s'-]+$/),
  academicLevel: z.enum([
    'primary', '11plus', 'secondary', 'gcse', 'alevel', 'oxbridge', 'university'
  ]),
  subjects: z.string().min(1).max(500).trim(),
  urgency: z.enum(['immediate', 'within-week', 'within-month', 'planning-ahead']),
  specificNeeds: z.string().max(1000).optional().or(z.literal('')),
  preferredContact: z.enum(['phone', 'email', 'either']),
  budget: z.enum(['standard', 'premium', 'elite', 'discuss']),
});

export async function submitConsultation(formData: FormData) {
  // Parse form data
  const rawData = {
    parentName: formData.get('parentName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    studentName: formData.get('studentName'),
    academicLevel: formData.get('academicLevel'),
    subjects: formData.get('subjects'),
    urgency: formData.get('urgency'),
    specificNeeds: formData.get('specificNeeds'),
    preferredContact: formData.get('preferredContact'),
    budget: formData.get('budget'),
  };

  // Server-side validation
  const validated = consultationSchema.parse(rawData);

  // Save to database / send email
  // TODO: Implement actual saving logic
  try {
    // await saveConsultationToDatabase(validated);
    // await sendEmailNotification(validated);
    console.log('Consultation submitted:', validated);
  } catch (error) {
    console.error('Failed to save consultation:', error);
    throw new Error('Failed to submit consultation. Please try again.');
  }

  // Redirect to success page
  redirect('/consultation-success');
}
```

**2. Update form component:**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/components/forms/consultation-booking-form.tsx
'use client';

import { useFormStatus } from 'react'; // React 19 hook
import { submitConsultation } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function SubmitButton() {
  const { pending } = useFormStatus(); // Automatic loading state

  return (
    <Button type='submit' disabled={pending} loading={pending}>
      {pending ? 'Submitting...' : 'Submit Consultation Request'}
    </Button>
  );
}

export function ConsultationBookingForm({
  className,
  compact = false,
}: ConsultationBookingFormProps) {
  return (
    <Card className={cn('w-full max-w-2xl mx-auto', className)}>
      <CardHeader>
        <CardTitle>Book Your Confidential Consultation</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={submitConsultation} className='space-y-4'>
          {/* Parent Information */}
          <div className='space-y-2'>
            <Label htmlFor='parentName'>Parent Name</Label>
            <Input
              id='parentName'
              name='parentName'
              type='text'
              required
              minLength={2}
              maxLength={100}
              pattern="^[a-zA-Z\s'-]+$"
              placeholder='Full name'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              name='email'
              type='email'
              required
              maxLength={255}
              placeholder='your.email@example.com'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone Number</Label>
            <Input
              id='phone'
              name='phone'
              type='tel'
              required
              minLength={10}
              maxLength={20}
              pattern="^[\d\s\-\+\(\)]+$"
              placeholder='+44 20 1234 5678'
            />
          </div>

          {/* Student Information */}
          <div className='space-y-2'>
            <Label htmlFor='studentName'>Student Name</Label>
            <Input
              id='studentName'
              name='studentName'
              type='text'
              required
              minLength={2}
              maxLength={100}
              pattern="^[a-zA-Z\s'-]+$"
              placeholder='Student&apos;s full name'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='academicLevel'>Academic Level</Label>
            <Select name='academicLevel' required>
              <SelectTrigger>
                <SelectValue placeholder='Select level' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='primary'>Primary</SelectItem>
                <SelectItem value='11plus'>11+ Preparation</SelectItem>
                <SelectItem value='secondary'>Secondary</SelectItem>
                <SelectItem value='gcse'>GCSE</SelectItem>
                <SelectItem value='alevel'>A-Level</SelectItem>
                <SelectItem value='oxbridge'>Oxbridge</SelectItem>
                <SelectItem value='university'>University</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit button with automatic loading state */}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
```

**3. Create success page:**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/app/consultation-success/page.tsx
export default function ConsultationSuccessPage() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Card className='max-w-2xl'>
        <CardContent className='text-center py-12'>
          <CheckCircle className='h-16 w-16 text-accent-500 mx-auto mb-4' />
          <h1>Consultation Request Received</h1>
          <p>
            Thank you for your interest in our premium tutoring services.
            We will contact you within 24 hours to arrange your confidential consultation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Benefits:**
- ✅ Progressive enhancement (works without JavaScript)
- ✅ Automatic loading states via useFormStatus
- ✅ Server-side validation guaranteed
- ✅ Simplified client-side code
- ✅ Better error handling with error boundaries
- ✅ No CSRF token management needed

**Acceptance Criteria:**
- ✅ Form submits successfully
- ✅ Server-side validation works
- ✅ Redirects to success page
- ✅ Loading state shows during submission
- ✅ Form works without JavaScript (progressive enhancement)

---

## Phase 2: Component Refactoring (Week 2-3)

### Task 2.1: Navigation Component Refactor
**Time Estimate:** 1-2 days
**Files Created:** 6 new files
**Files Modified:** 1 file (Navigation.tsx → orchestrator)

#### Directory Structure

```
/home/jack/Documents/my_private_tutor_online/src/components/navigation/
├── Navigation.tsx (150 lines - main orchestrator)
├── DesktopNavigation.tsx (100 lines - desktop menu items)
├── DesktopDropdown.tsx (150 lines - dropdown overlay)
├── MobileNavigation.tsx (150 lines - mobile menu)
├── NavigationLogo.tsx (50 lines - logo component)
├── NavigationButton.tsx (50 lines - CTA button)
└── types.ts (100 lines - shared interfaces)
```

#### Implementation Checklist

**Step 1: Create types.ts**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/components/navigation/types.ts
export interface NavigationItem {
  label: string;
  href?: string;
  description?: string;
  items?: NavigationItem[];
  featured?: boolean;
  icon?: React.ReactNode;
}

export interface NavigationState {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  dropdown: {
    isOpen: boolean;
    activeMenu: string | null;
  };
  activeMenuItem: string | null;
}

export type NavigationAction =
  | { type: 'SET_SCROLLED'; payload: boolean }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'OPEN_DROPDOWN'; payload: string }
  | { type: 'CLOSE_DROPDOWN' }
  | { type: 'SET_ACTIVE_ITEM'; payload: string | null };

export interface NavigationProps {
  className?: string;
  isHomepage?: boolean;
}
```

**Step 2: Extract NavigationLogo.tsx**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/components/navigation/NavigationLogo.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavigationLogoProps {
  isScrolled: boolean;
  isHomepage: boolean;
  dropdownOpen: boolean;
}

export function NavigationLogo({
  isScrolled,
  isHomepage,
  dropdownOpen
}: NavigationLogoProps) {
  const shouldShowWhiteLogo = !isHomepage && !isScrolled && !dropdownOpen;

  return (
    <div className='min-w-48'>
      <Link href='/' className='flex items-center space-x-2 z-10'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='relative w-48 h-[4.5rem] lg:h-[5.25rem] xl:h-[6rem]'
        >
          <Image
            src={`/images/logos/${
              shouldShowWhiteLogo ? 'logo-with-name-white.png' : 'logo-with-name.png'
            }`}
            alt='My Private Tutor Online'
            fill
            className='object-contain'
            priority
          />
        </motion.div>
      </Link>
    </div>
  );
}
```

**Step 3: Extract DesktopNavigation.tsx**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/components/navigation/DesktopNavigation.tsx
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { NavigationItem } from './types';

interface DesktopNavigationProps {
  items: NavigationItem[];
  isScrolled: boolean;
  isHomepage: boolean;
  dropdownOpen: boolean;
  activeMenuItem: string | null;
  onToggleDropdown: (label: string) => void;
  isActive: (href: string) => boolean;
}

export function DesktopNavigation({
  items,
  isScrolled,
  isHomepage,
  dropdownOpen,
  activeMenuItem,
  onToggleDropdown,
  isActive,
}: DesktopNavigationProps) {
  return (
    <div className='hidden 2xl:flex items-center flex-1 justify-center space-x-8'>
      {items.map((item) => (
        <div key={item.label} className='relative'>
          {item.items ? (
            // Menu item with dropdown
            <div className='relative'>
              <div className='flex items-center'>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 px-2 py-1 font-normal font-display transition-all duration-200',
                      'text-base md:text-lg lg:text-lg xl:text-xl',
                      'text-primary-700 hover:text-accent-600',
                      isHomepage
                        ? 'text-primary-700 hover:text-accent-600'
                        : isScrolled
                        ? 'text-primary-700'
                        : 'text-white hover:text-accent-600',
                      isActive(item.href) && 'text-accent-600',
                      activeMenuItem === item.label && 'text-accent-600',
                      dropdownOpen && activeMenuItem !== item.label && 'text-primary-700'
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleDropdown(item.label);
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={cn(
                      'flex items-center gap-1 px-2 py-1 font-normal font-display transition-all duration-200',
                      'text-base md:text-lg lg:text-lg xl:text-xl',
                      'text-primary-700 hover:text-accent-600',
                      isHomepage
                        ? 'text-primary-700 hover:text-accent-600'
                        : isScrolled
                        ? 'text-primary-700'
                        : 'text-white hover:text-accent-600',
                      activeMenuItem === item.label && 'text-accent-600',
                      dropdownOpen && activeMenuItem !== item.label && 'text-primary-700'
                    )}
                    onClick={() => onToggleDropdown(item.label)}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Simple link item
            <Link
              href={item.href!}
              className={cn(
                'flex items-center px-2 py-1 font-normal font-display transition-all duration-200',
                'text-base md:text-lg lg:text-lg xl:text-xl',
                'text-primary-700 hover:text-accent-600',
                isHomepage
                  ? 'text-primary-700 hover:text-accent-600'
                  : isScrolled
                  ? 'text-primary-700'
                  : 'text-white hover:text-accent-600',
                isActive(item.href!) && 'text-accent-600',
                dropdownOpen && !isActive(item.href!) && 'text-primary-700'
              )}
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
```

**Step 4: Update main Navigation.tsx**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/components/navigation/Navigation.tsx
'use client';

import { useEffect, useReducer, useRef } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MAIN_NAVIGATION_ITEMS } from '@/content/navigation-content';
import { NavigationLogo } from './NavigationLogo';
import { DesktopNavigation } from './DesktopNavigation';
import { DesktopDropdown } from './DesktopDropdown';
import { MobileNavigation } from './MobileNavigation';
import { NavigationButton } from './NavigationButton';
import type { NavigationState, NavigationAction, NavigationProps } from './types';

// Reducer for navigation state management
function navigationReducer(
  state: NavigationState,
  action: NavigationAction
): NavigationState {
  switch (action.type) {
    case 'SET_SCROLLED':
      return { ...state, isScrolled: action.payload };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
    case 'OPEN_DROPDOWN':
      return {
        ...state,
        dropdown: { isOpen: true, activeMenu: action.payload },
        activeMenuItem: action.payload,
      };
    case 'CLOSE_DROPDOWN':
      return {
        ...state,
        dropdown: { isOpen: false, activeMenu: null },
        activeMenuItem: null,
      };
    case 'SET_ACTIVE_ITEM':
      return { ...state, activeMenuItem: action.payload };
    default:
      return state;
  }
}

const initialState: NavigationState = {
  isScrolled: false,
  isMobileMenuOpen: false,
  dropdown: { isOpen: false, activeMenu: null },
  activeMenuItem: null,
};

export function Navigation({ className, isHomepage = false }: NavigationProps) {
  const pathname = usePathname();
  const [navState, dispatch] = useReducer(navigationReducer, initialState);
  const { scrollY } = useScroll();

  // Scroll detection
  useMotionValueEvent(scrollY, 'change', (latest) => {
    dispatch({ type: 'SET_SCROLLED', payload: latest > 50 });
  });

  // Close mobile menu on navigation
  useEffect(() => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' });
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '/en-GB';
    return pathname.startsWith(href);
  };

  const isCurrentHomepage = pathname === '/' || pathname === '/en-GB';

  return (
    <>
      <motion.header
        initial='hidden'
        animate='visible'
        variants={navVariants}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[5.5rem] lg:h-[6.25rem] xl:h-[7rem]',
          navState.dropdown.isOpen
            ? 'bg-white shadow-sm'
            : navState.isScrolled
            ? 'bg-white shadow-sm'
            : 'bg-transparent',
          className
        )}
      >
        <div className='container mx-auto px-4 lg:px-6 h-[5.5rem] lg:h-[6.25rem] xl:h-[7rem]'>
          <nav className='flex items-center justify-between h-[5.5rem] lg:h-[6.25rem] xl:h-[7rem]'>
            {/* Logo */}
            <NavigationLogo
              isScrolled={navState.isScrolled}
              isHomepage={isCurrentHomepage}
              dropdownOpen={navState.dropdown.isOpen}
            />

            {/* Desktop Navigation */}
            <DesktopNavigation
              items={MAIN_NAVIGATION_ITEMS}
              isScrolled={navState.isScrolled}
              isHomepage={isCurrentHomepage}
              dropdownOpen={navState.dropdown.isOpen}
              activeMenuItem={navState.activeMenuItem}
              onToggleDropdown={(label) => dispatch({ type: 'OPEN_DROPDOWN', payload: label })}
              isActive={isActive}
            />

            {/* CTA Button */}
            <NavigationButton
              isScrolled={navState.isScrolled}
              isHomepage={isCurrentHomepage}
            />

            {/* Mobile Hamburger */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}
              className={cn(
                '2xl:hidden p-2 rounded-lg transition-colors duration-200',
                isCurrentHomepage
                  ? 'text-primary-700 hover:bg-gray-100'
                  : navState.isScrolled
                  ? 'text-primary-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label='Open menu'
            >
              <MenuIcon className='h-6 w-6' />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Desktop Dropdown */}
      <DesktopDropdown
        isOpen={navState.dropdown.isOpen}
        activeMenu={navState.dropdown.activeMenu}
        items={MAIN_NAVIGATION_ITEMS}
        onClose={() => dispatch({ type: 'CLOSE_DROPDOWN' })}
      />

      {/* Mobile Menu */}
      {navState.isMobileMenuOpen && (
        <MobileNavigation
          items={MAIN_NAVIGATION_ITEMS}
          pathname={pathname}
          onClose={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}
        />
      )}
    </>
  );
}
```

**Benefits:**
- ✅ Reduced file size: 667 lines → ~150 lines per file
- ✅ Single Responsibility Principle: Each component has one clear purpose
- ✅ Easier testing: Test each sub-component independently
- ✅ Better state management: useReducer instead of multiple useState
- ✅ Improved maintainability: Clear separation of concerns

---

### Task 2.2: Global State Management
**Time Estimate:** 2-3 days
**Files Created:** 3 new files
**Files Modified:** 2 files (layout.tsx, page.tsx)

#### Implementation Plan

**Step 1: Create AppContext:**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/contexts/AppContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// ⚠️ CRITICAL: All data types must be synchronous
interface RecognitionCardData {
  id: string;
  headerText: string;
  contentType: 'logo' | 'icon';
  logoImage?: { url: string; alt: string };
  logoMaxWidth?: string;
  iconPath?: string;
  iconAlt?: string;
  footerText?: string;
  sortOrder: number;
  status: 'published' | 'unpublished';
}

interface ServiceData {
  title: string;
  description: string;
  icon: string;
  features: string[];
  targetAudience: string;
  featureImageUrl?: string;
  featureImageAlt?: string;
}

interface StudentImages {
  [key: string]: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

interface AppContextType {
  recognitionCards: RecognitionCardData[];
  services: ServiceData[];
  studentImages: StudentImages;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: AppContextType;
}) {
  // ✅ CORRECT: useState with initial synchronous data (no async updates)
  const [appData] = useState<AppContextType>(initialData);

  return (
    <AppContext.Provider value={appData}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppProvider');
  }
  return context;
}
```

**Step 2: Update layout.tsx:**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/app/layout.tsx
import { LazyMotionProvider } from '@/components/providers/LazyMotionProvider';
import { AppProvider } from '@/contexts/AppContext';

// ✅ CRITICAL: Synchronous CMS data access
const SERVICES_DATA = [...]; // From hardcoded data
const RECOGNITION_CARDS_DATA = [...];
const STUDENT_IMAGES = {...};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ✅ CORRECT: Prepare synchronous data once at layout level
  const initialAppData = {
    recognitionCards: RECOGNITION_CARDS_DATA,
    services: SERVICES_DATA,
    studentImages: STUDENT_IMAGES,
  };

  return (
    <html lang='en-GB' dir='ltr' className='scroll-smooth'>
      <body className={fontClassNames}>
        <LazyMotionProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </LazyMotionProvider>
      </body>
    </html>
  );
}
```

**Step 3: Update page components:**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/app/page.tsx
import { AppProvider } from '@/contexts/AppContext';

export default async function HomePage() {
  // No need to fetch data here - comes from AppContext
  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden bg-white'>
      <Navigation isHomepage={false} />
      <main>
        {/* Components access data via useAppData() */}
        <AboutSectionClient />
        <LazyServicesCarousel />
      </main>
      <PageFooter showContactForm={true} />
    </div>
  );
}
```

**Step 4: Update components to use context:**
```typescript
// /home/jack/Documents/my_private_tutor_online/src/components/sections/AboutSectionClient.tsx
'use client';

import { useAppData } from '@/contexts/AppContext';

export function AboutSectionClient() {
  const { recognitionCards } = useAppData(); // Access from context

  return (
    <section id='about'>
      {/* Render recognition cards */}
      {recognitionCards.map((card) => (
        <RecognitionCard key={card.id} {...card} />
      ))}
    </section>
  );
}
```

**⚠️ CRITICAL RULES:**
- AppProvider receives synchronous data only
- No async state updates in AppProvider
- Data comes from hardcoded constants, not API calls
- Context provides read-only access to static data

**Benefits:**
- ✅ Single source of truth for app data
- ✅ Eliminates prop drilling
- ✅ Maintains synchronous CMS architecture
- ✅ Easier to add new shared state
- ✅ Cleaner component props interfaces

---

## Phase 3: Design System Standardisation (Week 3-4)

### Task 3.1: Standardise Responsive Spacing
**Time Estimate:** 2-3 days
**Files Modified:** tailwind.config.ts + all section components

#### Implementation Plan

**Step 1: Add spacing tokens to Tailwind:**
```typescript
// /home/jack/Documents/my_private_tutor_online/tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      spacing: {
        // Section padding (vertical spacing between major sections)
        'section-sm': '3rem',      // 48px mobile
        'section-md': '5rem',      // 80px tablet
        'section-lg': '8rem',      // 128px desktop
        'section-xl': '10rem',     // 160px wide desktop

        // Container padding (horizontal spacing)
        'container-sm': '1rem',    // 16px mobile
        'container-md': '2rem',    // 32px tablet
        'container-lg': '4rem',    // 64px desktop
        'container-xl': '6rem',    // 96px wide desktop

        // Content gaps (spacing within sections)
        'content-xs': '0.5rem',    // 8px
        'content-sm': '1rem',      // 16px
        'content-md': '1.5rem',    // 24px
        'content-lg': '2rem',      // 32px
        'content-xl': '3rem',      // 48px

        // Navigation spacing
        'nav-gap': '2rem',         // 32px (space-x-8)
        'nav-item-gap': '0.5rem',  // 8px
      },

      fontSize: {
        // Navigation typography
        'nav-base': ['1rem', { lineHeight: '1.5rem' }],
        'nav-md': ['1.125rem', { lineHeight: '1.75rem' }],
        'nav-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'nav-xl': ['1.25rem', { lineHeight: '1.75rem' }],

        // Section heading typography
        'section-heading-sm': ['2rem', { lineHeight: '2.5rem' }],      // text-2xl
        'section-heading-md': ['3rem', { lineHeight: '3.5rem' }],      // text-3xl
        'section-heading-lg': ['4rem', { lineHeight: '4.5rem' }],      // text-4xl
        'section-heading-xl': ['5rem', { lineHeight: '5.5rem' }],      // text-5xl
      }
    }
  }
}
```

**Step 2: Update sections with standard spacing:**
```typescript
// BEFORE:
<section className='pt-15 lg:pt-20 bg-gradient-to-br...'>
  <div className='container mx-auto px-12 sm:px-16 lg:px-24 xl:px-32 2xl:px-40'>
    <h2 className='text-2xl sm:text-3xl md:text-4xl xl:text-5xl...'>

// AFTER:
<section className='py-section-sm lg:py-section-lg bg-gradient-to-br...'>
  <div className='container mx-auto px-container-sm lg:px-container-lg 2xl:px-container-xl'>
    <h2 className='text-section-heading-sm lg:text-section-heading-lg xl:text-section-heading-xl...'>
```

**Step 3: Create spacing documentation:**
```markdown
# Spacing System Documentation

## Section Spacing (Vertical - py-*)
- `py-section-sm`: 48px (mobile/tablet)
- `py-section-lg`: 128px (desktop)
- `py-section-xl`: 160px (wide desktop)

Usage: Between major page sections (About, Services, Testimonials)

## Container Padding (Horizontal - px-*)
- `px-container-sm`: 16px (mobile)
- `px-container-lg`: 64px (desktop)
- `px-container-xl`: 96px (wide desktop)

Usage: Container horizontal padding for all sections

## Content Gaps (Internal spacing - gap-*, space-*)
- `gap-content-sm`: 16px (mobile)
- `gap-content-lg`: 32px (desktop)

Usage: Spacing between elements within sections
```

**Benefits:**
- ✅ Consistent visual rhythm across all pages
- ✅ Semantic naming explains purpose
- ✅ Easier to maintain and update spacing
- ✅ Better documentation of design decisions
- ✅ Reduced cognitive load for developers

---

## Testing Checklist

### After Each Phase

**Phase 1 Testing:**
- [ ] Bundle analyzer generates reports
- [ ] Suspense boundaries show skeleton states
- [ ] Form actions submit successfully
- [ ] No console errors in production build
- [ ] Synchronous CMS architecture maintained

**Phase 2 Testing:**
- [ ] Navigation refactor works identically to original
- [ ] All navigation states function correctly
- [ ] Global state context provides data correctly
- [ ] No prop drilling issues
- [ ] TypeScript compilation succeeds

**Phase 3 Testing:**
- [ ] Spacing tokens applied consistently
- [ ] Responsive breakpoints work correctly
- [ ] Visual regression testing passes
- [ ] Design system documentation accurate

---

## Success Metrics

### Performance Improvements
- **Bundle Size Reduction:** Target 10-15% reduction via bundle analyzer insights
- **Time to First Byte (TTFB):** Improve by 200-300ms with Suspense boundaries
- **First Contentful Paint (FCP):** Improve by 300-500ms with skeleton loading

### Code Quality Metrics
- **Component Complexity:** Reduce Navigation.tsx from 667 to ~150 lines
- **State Management:** Centralise state in AppContext, eliminate prop drilling
- **Test Coverage:** Increase coverage by 15-20% with refactored components

### Developer Experience
- **Onboarding Time:** Reduce by 30% with better documentation
- **Feature Development:** Speed up by 20% with standardised patterns
- **Maintenance:** Reduce bug introduction rate with clearer component structure

---

## Risk Mitigation

### Critical Risks

**Risk 1: Breaking Synchronous CMS Architecture**
- **Probability:** Medium (during refactoring)
- **Impact:** CRITICAL (homepage failure)
- **Mitigation:** Test CMS access after each change, runtime monitoring active

**Risk 2: Navigation Refactor Regression**
- **Probability:** Medium (complex component)
- **Impact:** High (user experience)
- **Mitigation:** Create comprehensive test suite, feature flag rollout

**Risk 3: Global State Performance**
- **Probability:** Low (small data set)
- **Impact:** Medium (re-render performance)
- **Mitigation:** Use React DevTools Profiler, memoize selectors if needed

---

## Rollback Plan

### If Issues Occur

**Phase 1 Rollback:**
```bash
# Remove bundle analyzer
npm uninstall @next/bundle-analyzer

# Revert next.config.ts and package.json
git checkout HEAD -- next.config.ts package.json

# Rebuild
npm run build
```

**Phase 2 Rollback:**
```bash
# Revert navigation refactor
git checkout HEAD -- src/components/navigation/

# Rebuild
npm run build
```

**Phase 3 Rollback:**
```bash
# Revert tailwind config
git checkout HEAD -- tailwind.config.ts

# Revert section components
git checkout HEAD -- src/components/sections/
git checkout HEAD -- src/app/page.tsx

# Rebuild
npm run build
```

---

## Next Steps After Completion

1. **Monitor Production Metrics:** Track bundle size, load times, error rates
2. **Gather User Feedback:** Collect feedback on performance improvements
3. **Document Learnings:** Update CUSTOM_DOCS.md with new patterns
4. **Plan Phase 4:** Container queries, list virtualization, composable components
5. **Schedule Review:** Monthly architecture review to assess effectiveness

---

**Document Created:** 4 November 2025
**Last Updated:** 4 November 2025
**Owner:** My Private Tutor Online Development Team
**Status:** Ready for Implementation
