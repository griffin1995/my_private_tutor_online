// CONTEXT7 SOURCE: /context7/react_dev - React functional component patterns with composition
// COMPOSITION PATTERN: React documentation shows proper component composition patterns
// CONTEXT7 SOURCE: /context7/motion_dev - Layout animations for dynamic content changes
// LAYOUT ANIMATION: Motion dev docs show layoutId patterns for smooth transitions

'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TestimonialRatingInterface from './testimonial-rating-interface'

interface TestimonialWithRatingProps {
  testimonialId: string
  children: React.ReactNode
  showRating?: boolean
  ratingPosition?: 'bottom' | 'side' | 'overlay'
  ratingVariant?: 'compact' | 'full'
  className?: string
  onRatingInteraction?: (testimonialId: string, interactionType: 'rating' | 'star' | 'feedback') => void
}

// CONTEXT7 SOURCE: /context7/motion_dev - Layout transition animations
// TRANSITION PATTERNS: Motion documentation shows smooth content layout changes
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Overlay animation patterns
// OVERLAY PATTERN: Motion docs show proper overlay positioning and animations
const overlayVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    y: 10
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 10,
    transition: { duration: 0.2 }
  }
}

export const TestimonialWithRating: React.FC<TestimonialWithRatingProps> = ({
  testimonialId,
  children,
  showRating = true,
  ratingPosition = 'bottom',
  ratingVariant = 'full',
  className = '',
  onRatingInteraction
}) => {
  const [showRatingInterface, setShowRatingInterface] = React.useState(false)
  const [hasInteracted, setHasInteracted] = React.useState(false)

  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for event handler optimization
  // CALLBACK PATTERN: React documentation shows useCallback prevents unnecessary re-renders
  const handleToggleRating = React.useCallback(() => {
    setShowRatingInterface(prev => !prev)
  }, [])

  const handleRatingInteraction = React.useCallback((interactionType: 'rating' | 'star' | 'feedback') => {
    setHasInteracted(true)
    onRatingInteraction?.(testimonialId, interactionType)
  }, [testimonialId, onRatingInteraction])

  // CONTEXT7 SOURCE: /context7/react_dev - Intersection Observer for viewport tracking
  // VIEWPORT TRACKING: React patterns for measuring component visibility
  const [isInView, setIsInView] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getRatingContent = () => (
    <TestimonialRatingInterface
      testimonialId={testimonialId}
      variant={ratingVariant}
      showStats={ratingVariant === 'full'}
      className={`testimonial-rating ${ratingPosition === 'overlay' ? 'overlay-rating' : ''}`}
    />
  )

  const sideLayoutClasses = ratingPosition === 'side' 
    ? 'lg:grid lg:grid-cols-3 lg:gap-6' 
    : ''

  const testimonialClasses = ratingPosition === 'side' 
    ? 'lg:col-span-2' 
    : ''

  const ratingClasses = ratingPosition === 'side' 
    ? 'lg:col-span-1' 
    : ''

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`testimonial-with-rating relative ${sideLayoutClasses} ${className}`}
    >
      {/* Main Testimonial Content */}
      <motion.div 
        variants={itemVariants}
        className={`testimonial-content ${testimonialClasses}`}
        layoutId={`testimonial-${testimonialId}`}
      >
        {children}
        
        {/* Bottom Rating Position */}
        {showRating && ratingPosition === 'bottom' && (
          <motion.div
            variants={itemVariants}
            className="mt-6 pt-6 border-t border-slate-100"
          >
            {getRatingContent()}
          </motion.div>
        )}

        {/* Overlay Rating Trigger */}
        {showRating && ratingPosition === 'overlay' && !showRatingInterface && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleToggleRating}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-slate-200 
                     rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500
                     shadow-lg transition-colors"
            aria-label="Rate this testimonial"
          >
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Rate
          </motion.button>
        )}
      </motion.div>

      {/* Side Rating Position */}
      {showRating && ratingPosition === 'side' && (
        <motion.div
          variants={itemVariants}
          className={`testimonial-rating-side ${ratingClasses} mt-6 lg:mt-0`}
        >
          <div className="sticky top-6">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Rate This Testimonial
              </h3>
              {getRatingContent()}
            </div>
          </div>
        </motion.div>
      )}

      {/* Overlay Rating Interface */}
      <AnimatePresence>
        {showRating && ratingPosition === 'overlay' && showRatingInterface && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowRatingInterface(false)
              }
            }}
          >
            <motion.div
              layoutId={`rating-overlay-${testimonialId}`}
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4
                       border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  Rate This Testimonial
                </h3>
                <button
                  onClick={handleToggleRating}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-slate-500 rounded-full p-1"
                  aria-label="Close rating interface"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {getRatingContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interaction Success Indicator */}
      <AnimatePresence>
        {hasInteracted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 bg-green-100 border border-green-200 
                     rounded-full px-3 py-1 text-sm text-green-700 font-medium"
          >
            ✓ Thank you for your feedback!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "@id": `testimonial-${testimonialId}`,
            "reviewBody": "Customer testimonial with interactive rating system",
            "interactionStatistic": {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/LikeAction",
              "userInteractionCount": 0 // Would be populated from actual data
            }
          })
        }}
      />
    </motion.div>
  )
}

export default TestimonialWithRating

// CONTEXT7 SOURCE: /context7/react_dev - Higher-Order Component pattern for testimonials
// HOC PATTERN: React documentation shows HOC patterns for feature enhancement
export const withRating = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  ratingConfig?: Partial<TestimonialWithRatingProps>
) => {
  const WithRatingComponent = (props: P & { testimonialId: string }) => {
    const { testimonialId, ...wrappedProps } = props
    
    return (
      <TestimonialWithRating
        testimonialId={testimonialId}
        {...ratingConfig}
      >
        <WrappedComponent {...(wrappedProps as P)} />
      </TestimonialWithRating>
    )
  }

  WithRatingComponent.displayName = `withRating(${WrappedComponent.displayName || WrappedComponent.name})`
  
  return WithRatingComponent
}

// CONTEXT7 SOURCE: /context7/react_dev - React.memo for performance optimization
// MEMO PATTERN: React documentation shows memo patterns for preventing unnecessary re-renders
export const MemoizedTestimonialWithRating = React.memo(TestimonialWithRating)
export { TestimonialWithRating as default }