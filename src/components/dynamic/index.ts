/**
 * Dynamic Component Loading - Performance Optimization
 * 
 * Implements code splitting for heavy, non-critical components
 * to reduce initial bundle size and improve LCP (Largest Contentful Paint)
 * 
 * Performance Goals:
 * - Reduce main bundle from 230kB to <150kB
 * - Load non-critical components on-demand
 * - Maintain all functionality and user experience
 * 
 * Components split:
 * - Below-the-fold content (consultation forms, testimonials)
 * - Admin interfaces (not needed on homepage)
 * - Complex UI components (video dialogs, carousels)
 */

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Loading fallback components for better UX
export const LoadingCard = () => (
  <div className="animate-pulse bg-slate-200 rounded-lg h-48 w-full" />
)

export const LoadingForm = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-slate-200 rounded w-3/4" />
    <div className="h-10 bg-slate-200 rounded" />
    <div className="h-10 bg-slate-200 rounded" />
    <div className="h-12 bg-slate-200 rounded w-1/3" />
  </div>
)

export const LoadingSection = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-slate-200 rounded w-1/2 mx-auto" />
    <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-slate-200 rounded" />
      ))}
    </div>
  </div>
)

// Heavy form components - load on demand
export const ConsultationBookingForm = dynamic(
  () => import('@/components/forms/consultation-booking-form'),
  {
    loading: LoadingForm,
    ssr: false, // Client-only for interactive features
  }
)

// Video components - defer until user interaction
export const HeroVideoDialog = dynamic(
  () => import('@/components/magicui/hero-video-dialog').then(mod => ({ default: mod.HeroVideoDialog })),
  {
    loading: () => <div className="animate-pulse bg-slate-200 rounded-lg aspect-video" />,
    ssr: false,
  }
)

// Complex testimonial components
export const RoyalTestimonialCard = dynamic(
  () => import('@/components/marketing/royal-testimonial-card'),
  {
    loading: LoadingCard,
    ssr: true, // SEO important for testimonials
  }
)

// Trust indicators - below the fold
export const TrustIndicatorsGrid = dynamic(
  () => import('@/components/sections/trust-indicators-grid').then(mod => ({ default: mod.TrustIndicatorsGrid })),
  {
    loading: LoadingSection,
    ssr: true, // SEO important for trust signals
  }
)

// Results section - below the fold
export const ResultsSection = dynamic(
  () => import('@/components/sections/results-section'),
  {
    loading: LoadingSection,
    ssr: true, // SEO important for results
  }
)

// Quote section - testimonial content
export const QuoteSection = dynamic(
  () => import('@/components/sections/quote-section'),
  {
    loading: () => (
      <div className="animate-pulse py-16">
        <div className="h-6 bg-slate-200 rounded w-3/4 mx-auto mb-4" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
      </div>
    ),
    ssr: true, // SEO important for quotes
  }
)

// Admin components - never needed on public pages
export const AdminHeader = dynamic(
  () => import('@/components/admin/AdminHeader'),
  {
    loading: () => <div className="h-16 bg-slate-200 animate-pulse" />,
    ssr: false, // Admin interface client-only
  }
)

// Premium components - special pages only
export const PremiumHeroSection = dynamic(
  () => import('@/components/marketing/premium-hero-section'),
  {
    loading: LoadingSection,
    ssr: true,
  }
)

export const PremiumServiceCard = dynamic(
  () => import('@/components/marketing/premium-service-card'),
  {
    loading: LoadingCard,
    ssr: true,
  }
)

// Performance monitoring - development only
export const PerformanceMonitor = dynamic(
  () => import('@/components/ui/performance-monitor'),
  {
    loading: () => null,
    ssr: false,
  }
)

// Utility function for wrapping components with Suspense
export function withSuspense<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  fallback: React.ReactNode = <LoadingCard />
) {
  return function SuspenseWrapper(props: T) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    )
  }
}

export default {
  ConsultationBookingForm,
  HeroVideoDialog,
  RoyalTestimonialCard,
  TrustIndicatorsGrid,
  ResultsSection,
  QuoteSection,
  AdminHeader,
  PremiumHeroSection,
  PremiumServiceCard,
  PerformanceMonitor,
  withSuspense,
}