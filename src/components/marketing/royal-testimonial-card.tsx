"use client"

import { Quote, Star } from 'lucide-react'
import { getAvatarPlaceholder } from '@/lib/cms'
import { cn } from '@/lib/utils'

// CMS DATA SOURCE: Testimonial data will be provided via props from getTestimonials

interface RoyalTestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar?: string
  rating: number
  className?: string
  variant?: 'standard' | 'premium' | 'royal'
  featured?: boolean
}

export function RoyalTestimonialCard({
  quote,
  author,
  role,
  avatar,
  rating,
  className,
  variant = 'premium',
  featured = false
}: RoyalTestimonialCardProps) {
  // CMS DATA SOURCE: Using getAvatarPlaceholder for missing avatar images
  const placeholderAvatar = getAvatarPlaceholder()

  const containerClasses = {
    standard: 'bg-white rounded-xl p-6 shadow-md hover:shadow-lg border border-primary-100 transition-all duration-300',
    premium: 'bg-gradient-to-br from-white to-accent-50 rounded-2xl p-8 shadow-premium hover:shadow-gold border border-accent-100 transition-all duration-500 transform hover:-translate-y-1',
    royal: 'bg-gradient-to-br from-white via-royal-50 to-royal-100 rounded-2xl p-8 shadow-royal hover:shadow-2xl border-2 border-royal-200 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden'
  }

  const quoteIconClasses = {
    standard: 'w-8 h-8 text-primary-300 mb-4',
    premium: 'w-10 h-10 text-accent-300 mb-6',
    royal: 'w-12 h-12 text-royal-300 mb-6'
  }

  const quoteTextClasses = {
    standard: 'text-primary-700 leading-relaxed mb-6 italic',
    premium: 'text-primary-700 leading-relaxed mb-8 italic text-lg',
    royal: 'text-primary-700 leading-relaxed mb-8 italic text-lg font-medium'
  }

  const authorSectionClasses = {
    standard: 'flex items-center gap-4',
    premium: 'flex items-center gap-4 pt-6 border-t border-accent-200',
    royal: 'flex items-center gap-4 pt-6 border-t border-royal-200'
  }

  const authorNameClasses = {
    standard: 'font-semibold text-primary-900',
    premium: 'font-semibold text-primary-900 text-lg',
    royal: 'font-serif font-bold text-primary-900 text-lg'
  }

  const authorRoleClasses = {
    standard: 'text-primary-600 text-sm',
    premium: 'text-primary-600',
    royal: 'text-royal-600 font-medium'
  }

  const avatarSizeClasses = {
    standard: 'w-12 h-12',
    premium: 'w-16 h-16',
    royal: 'w-20 h-20 ring-4 ring-royal-200'
  }

  // Generate star rating
  const renderStars = () => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              i < rating 
                ? variant === 'royal' 
                  ? 'text-royal-500 fill-royal-500' 
                  : variant === 'premium'
                  ? 'text-accent-500 fill-accent-500'
                  : 'text-primary-500 fill-primary-500'
                : 'text-primary-300'
            )}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">{rating} out of 5 stars</span>
      </div>
    )
  }

  // Get author initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <div 
      className={cn(containerClasses[variant], className)} 
      role="article"
      aria-label={`Testimonial from ${author}`}
    >
      
      {/* Featured Badge */}
      {featured && variant === 'royal' && (
        <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16">
          <div className="absolute top-8 right-8 bg-gradient-to-br from-accent-400 to-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-45 shadow-lg">
            Featured
          </div>
        </div>
      )}

      {/* Royal background decoration */}
      {variant === 'royal' && (
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-royal-200/30 to-royal-300/30 rounded-full blur-xl" />
      )}

      {/* Quote Icon */}
      <Quote className={cn(quoteIconClasses[variant])} aria-hidden="true" />

      {/* Star Rating */}
      {renderStars()}

      {/* Testimonial Quote */}
      <blockquote 
        className={cn(quoteTextClasses[variant])}
        cite={author}
      >
        "{quote}"
      </blockquote>

      {/* Author Section */}
      <div className={cn(authorSectionClasses[variant])}>
        
        {/* Avatar */}
        <div className={cn(
          'rounded-full flex items-center justify-center overflow-hidden bg-primary-100',
          avatarSizeClasses[variant]
        )}>
          {avatar ? (
            <img 
              src={avatar || placeholderAvatar.src} 
              alt={`${author} avatar`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className={cn(
              'font-semibold text-xs',
              variant === 'royal' ? 'bg-royal-100 text-royal-700' :
              variant === 'premium' ? 'bg-accent-100 text-accent-700' :
              'bg-primary-100 text-primary-700'
            )}>
              {getInitials(author)}
            </span>
          )}
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <cite className={cn(authorNameClasses[variant])}>
            {author}
          </cite>
          <p className={cn(authorRoleClasses[variant])}>
            {role}
          </p>
        </div>

        {/* Premium verification badge for royal variant */}
        {variant === 'royal' && (
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-royal-500 to-royal-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Export variant types for documentation
export type RoyalTestimonialCardVariant = 'standard' | 'premium' | 'royal'