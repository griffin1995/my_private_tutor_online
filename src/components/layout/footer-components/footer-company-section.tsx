// CONTEXT7 SOURCE: /reactjs/react.dev - Component decomposition and memoization patterns
// OPTIMIZATION REASON: Official React documentation demonstrates React.memo for performance optimization and component boundaries

import React, { useMemo } from 'react';
import { Crown, Award, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { FooterContent } from '@/lib/services/footer-service-contracts';

interface FooterCompanySectionProps {
  content: FooterContent;
  className?: string;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React.memo implementation for performance
 * MEMO REASON: Official React documentation shows React.memo prevents unnecessary re-renders
 */
export const FooterCompanySection = React.memo<FooterCompanySectionProps>(({
  content,
  className = ""
}) => {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for expensive computations
  // MEMOIZATION REASON: Official React documentation demonstrates useMemo for computed properties
  const processedContent = useMemo(() => ({
    companyName: content.companyName,
    logo: {
      ...content.logo,
      // Optimize alt text for accessibility
      alt: content.logo.alt || `${content.companyName} logo`
    },
    // Compute accolades data
    accolades: [
      {
        icon: Crown,
        title: "Royal Clientele",
        subtitle: "Pedigree",
        className: "text-accent-600"
      },
      {
        icon: Award,
        title: "Tatler 2025",
        subtitle: "Featured",
        className: "text-accent-600"
      },
      {
        icon: BarChart3,
        title: "15+ Years",
        subtitle: "Excellence",
        className: "text-accent-600"
      }
    ]
  }), [content.companyName, content.logo]);

  return (
    <div className={`lg:col-span-1 flex flex-col justify-center ${className}`}>
      <div className="animate-fade-in-left">
        {/* CONTEXT7 SOURCE: /vercel/next.js - Image component optimization patterns */}
        {/* LOGO OPTIMIZATION REASON: Official Next.js documentation shows responsive image sizing */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-block group w-full"
            aria-label={`${processedContent.companyName} homepage`}
          >
            <Image
              src={processedContent.logo.main}
              alt={processedContent.logo.alt}
              width={processedContent.logo.width}
              height={processedContent.logo.height}
              className="w-full h-auto max-h-40 object-contain group-hover:scale-110 transition-transform duration-300"
              // CONTEXT7 SOURCE: /vercel/next.js - Image loading optimization
              // LOADING REASON: Footer logo is below-the-fold, lazy loading improves performance
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
            />
          </Link>
        </div>

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Optimized list rendering with keys */}
        {/* LIST OPTIMIZATION REASON: Official React documentation shows proper key usage for performance */}
        <div className="grid grid-cols-3 gap-3">
          {processedContent.accolades.map((accolade, index) => {
            const IconComponent = accolade.icon;
            
            return (
              <div 
                key={`accolade-${index}`}
                className="bg-gray-100 rounded-lg p-3 border border-gray-300 hover:bg-gray-200 transition-all duration-300 text-center"
              >
                <IconComponent className={`w-4 h-4 ${accolade.className} mb-1 mx-auto`} />
                <p className="text-xs font-semibold text-black leading-tight">
                  {accolade.title}
                </p>
                <p className="text-xs text-gray-600">
                  {accolade.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

FooterCompanySection.displayName = 'FooterCompanySection';

export default FooterCompanySection;