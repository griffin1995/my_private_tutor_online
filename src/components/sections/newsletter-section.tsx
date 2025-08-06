"use client"

// CONTEXT7 SOURCE: /react-hook-form/documentation - Component composition patterns
// Reference: Reusable form components with proper TypeScript typing
import { NewsletterForm } from '@/components/forms/newsletter-form'
import { cn } from '@/lib/utils'
import { 
  Crown, 
  Star, 
  Award,
  TrendingUp,
  Sparkles,
  CheckCircle
} from 'lucide-react'

interface NewsletterSectionProps {
  className?: string
  variant?: 'default' | 'premium' | 'minimal'
  showInterests?: boolean
  showName?: boolean
}

// Premium features list for the newsletter section
const premiumFeatures = [
  {
    icon: Crown,
    title: "Royal-Endorsed Content",
    description: "Exclusive insights from tutors trusted by royal families"
  },
  {
    icon: Award,
    title: "Tatler 2025 Featured",
    description: "Premium educational strategies from award-winning educators"
  },
  {
    icon: TrendingUp,
    title: "Academic Excellence",
    description: "Proven techniques for Oxbridge and elite university preparation"
  },
  {
    icon: Sparkles,
    title: "Personalised Insights",
    description: "Tailored content based on your child's educational journey"
  }
]

export function NewsletterSection({
  className,
  variant = 'default',
  showInterests = true,
  showName = true
}: NewsletterSectionProps) {
  // Variant-specific background styles
  const backgroundStyles = {
    default: 'bg-gray-50',
    premium: 'bg-gradient-to-br from-white via-accent-50/30 to-white relative overflow-hidden',
    minimal: 'bg-white'
  }

  return (
    <section 
      className={cn(
        "py-16 lg:py-24",
        backgroundStyles[variant],
        className
      )}
      aria-labelledby="newsletter-heading"
    >
      {/* Premium animated background elements */}
      {variant === 'premium' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-accent-100/20 via-transparent to-accent-100/20 pointer-events-none" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-200/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-300/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {variant === 'premium' ? (
          // Premium layout with features and form
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Features and Benefits */}
            <div className="animate-fade-in-left">
              <div className="mb-8">
                <h2 
                  id="newsletter-heading"
                  className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4"
                >
                  Join Elite Educational Circle
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Receive exclusive academic insights, premium tutoring strategies, 
                  and early access to our royal-endorsed educational programmes.
                </p>
              </div>

              {/* Premium Features Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {premiumFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div 
                      key={index}
                      className="flex gap-4 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center shadow-lg">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-black mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>15+ years of excellence</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>10,000+ successful students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>No spam, unsubscribe anytime</span>
                </div>
              </div>
            </div>

            {/* Right: Newsletter Form */}
            <div className="animate-fade-in-right">
              <NewsletterForm
                variant="card"
                showInterests={showInterests}
                showName={showName}
                title=""
                description=""
                className="shadow-2xl"
              />
            </div>
          </div>
        ) : (
          // Default/Minimal centered layout
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 animate-fade-in-up">
              <h2 
                id="newsletter-heading"
                className="text-3xl lg:text-4xl font-serif font-bold text-black mb-4"
              >
                Stay Informed About Your Child's Education
              </h2>
              <p className="text-lg text-gray-700">
                Join thousands of parents receiving expert educational insights 
                and exclusive tutoring opportunities.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-200">
              <NewsletterForm
                variant={variant === 'minimal' ? 'default' : 'hero'}
                showInterests={showInterests}
                showName={showName}
                title=""
                description=""
              />
            </div>

            {/* Simple Trust Indicators */}
            {variant === 'default' && (
              <div className="flex justify-center gap-8 mt-8 animate-fade-in-up animation-delay-400">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent-600" />
                  <span className="text-sm text-gray-600 font-medium">
                    Trusted by 10,000+ families
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent-600" />
                  <span className="text-sm text-gray-600 font-medium">
                    Tatler Address Book 2025
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

// Export variant types for documentation
export type NewsletterSectionVariant = 'default' | 'premium' | 'minimal'