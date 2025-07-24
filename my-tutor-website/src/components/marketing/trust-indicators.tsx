"use client"

import { Crown, Award, Calendar } from 'lucide-react'
import { brandConfig } from '@/config/brand'
import { cn } from '@/lib/utils'

interface TrustIndicatorsProps {
  className?: string
  variant?: 'horizontal' | 'vertical' | 'grid'
  showDescription?: boolean
}

export function TrustIndicators({ 
  className, 
  variant = 'horizontal',
  showDescription = true 
}: TrustIndicatorsProps) {
  const indicators = [
    {
      icon: Crown,
      title: brandConfig.credentials.royalEndorsement.title,
      description: brandConfig.credentials.royalEndorsement.description,
      color: 'text-accent-500',
    },
    {
      icon: Award, 
      title: brandConfig.credentials.tatlersListing.title,
      description: brandConfig.credentials.tatlersListing.description,
      color: 'text-accent-500',
    },
    {
      icon: Calendar,
      title: brandConfig.credentials.experience.description,
      description: `Established ${brandConfig.foundedYear}`,
      color: 'text-accent-500',
    },
  ]

  const layoutClasses = {
    horizontal: 'flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center',
    vertical: 'flex flex-col gap-6',
    grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
  }

  const itemClasses = {
    horizontal: 'flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left max-w-xs',
    vertical: 'flex items-center gap-4 text-left',
    grid: 'flex flex-col items-center gap-3 text-center',
  }

  return (
    <div className={cn(layoutClasses[variant], className)}>
      {indicators.map((indicator, index) => (
        <div key={index} className={cn(itemClasses[variant])}>
          <div className="flex-shrink-0">
            <indicator.icon className={cn("h-6 w-6", indicator.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-primary-900 text-sm leading-tight">
              {indicator.title}
            </h3>
            {showDescription && (
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {indicator.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}