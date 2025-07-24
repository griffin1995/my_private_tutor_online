"use client"

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, BookOpen, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  description: string
  subjects: string[]
  levels: string[]
  keyFeatures: string[]
  image?: string
  className?: string
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
  className,
  onLearnMore,
  onBookConsultation,
}: ServiceCardProps) {
  return (
    <Card className={cn(
      "h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 group",
      className
    )}>
      {image && (
        <div className="h-48 bg-gray-100 relative overflow-hidden">
          <Image
            src={image}
            alt={`${title} tutoring service`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-primary-900/20 transition-colors duration-300" />
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-accent-50">
            <GraduationCap className="h-5 w-5 text-accent-600" />
          </div>
          <CardTitle className="text-primary-900 text-lg leading-tight">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col pt-0">
        <div className="space-y-5 flex-1">
          {/* Academic Levels */}
          <div>
            <h4 className="font-medium text-sm text-primary-800 mb-2 flex items-center gap-2">
              <div className="w-1 h-4 bg-accent-500 rounded"></div>
              Academic Levels
            </h4>
            <div className="flex flex-wrap gap-1">
              {levels.map((level) => (
                <Badge key={level} variant="secondary" className="text-xs">
                  {level}
                </Badge>
              ))}
            </div>
          </div>

          {/* Subjects Covered */}
          <div>
            <h4 className="font-medium text-sm text-primary-800 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent-600" />
              Subjects Covered
            </h4>
            <div className="flex flex-wrap gap-1">
              {subjects.slice(0, 4).map((subject) => (
                <Badge key={subject} variant="navy" className="text-xs">
                  {subject}
                </Badge>
              ))}
              {subjects.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{subjects.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="font-medium text-sm text-primary-800 mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-accent-600" />
              Key Features
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              {keyFeatures.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-accent-500 text-xs mt-1.5 font-bold">✓</span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
              {keyFeatures.length > 3 && (
                <li className="text-xs text-gray-500 font-medium">
                  +{keyFeatures.length - 3} additional features
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-100">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLearnMore} 
            className="flex-1 text-primary-700 border-primary-200 hover:bg-primary-50"
          >
            Learn More
          </Button>
          <Button 
            size="sm" 
            onClick={onBookConsultation} 
            className="flex-1 bg-accent-600 hover:bg-accent-700 text-white"
          >
            Book Consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}