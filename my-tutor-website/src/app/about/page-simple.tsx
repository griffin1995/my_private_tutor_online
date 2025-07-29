"use client"

import { PageLayout } from '@/components/layout/page-layout'
import { getSiteBranding } from '@/lib/cms'

export default function About() {
  const siteBranding = getSiteBranding()

  return (
    <PageLayout background="white" showHeader showFooter>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-8">
            About {siteBranding.siteName}
          </h1>
          
          <div className="space-y-6 text-lg text-primary-700 leading-relaxed">
            <p>
              At the heart of My Private Tutor Online is a singular vision: academic support that is both exceptional and deeply personal.
            </p>
            
            <p>
              Founded in 2010 by Elizabeth Burrows—a Cambridge-accepted educator and former Forbes journalist—the company began not as a business, but as a trusted network of elite colleagues she met throughout her international tutoring career.
            </p>
            
            <p>
              What started as a circle of personal recommendations has since evolved—organically and exclusively—into one of the UK's most respected names in specialist private tutoring.
            </p>
            
            <p>
              Today, the ethos remains the same: every tutor is handpicked, every match thoughtfully made, and every family accommodated directly by Elizabeth and her team.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}