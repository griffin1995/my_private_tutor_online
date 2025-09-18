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

  // CONTEXT7 SOURCE: /websites/v2_tailwindcss - Flex grow utilities for height distribution
  // HEIGHT DISTRIBUTION REVISION: Official Tailwind CSS documentation shows flex-grow pattern for proportional sizing (75%/25% split)
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="animate-fade-in-left flex-grow h-full flex flex-col justify-center" style={{ flexGrow: 3 }}>
        {/* CONTEXT7 SOURCE: /vercel/next.js - Image component optimization patterns */}
        {/* LOGO OPTIMIZATION REASON: Official Next.js documentation shows responsive image sizing */}
        <div className="h-full flex flex-col justify-center">
          <div className="mb-4">
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

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography utilities for company description */}
          {/* COMPANY DESCRIPTION REASON: Official Tailwind CSS documentation shows text utilities for descriptive content */}
          <p className="text-gray-700 text-sm leading-relaxed text-center">
            Exceptional online tutoring trusted by families worldwide. From GCSE excellence to Oxbridge success.
          </p>
        </div>
      </div>

      {/* CONTEXT7 SOURCE: /websites/v2_tailwindcss - Flex grow utilities for smaller proportional area */}
      {/* ACCOLADES HEIGHT REVISION: Official Tailwind CSS documentation shows flex-grow: 1 for 25% height allocation */}
      <div className="flex-grow" style={{ flexGrow: 1 }}>
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Optimized list rendering with keys */}
        {/* LIST OPTIMIZATION REASON: Official React documentation shows proper key usage for performance */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox justify-between for space distribution */}
        {/* LAYOUT REVISION: Official Tailwind CSS documentation shows justify-between for distributing flex items with equal space between them */}
        <div className="flex justify-between h-full items-center">
          {processedContent.accolades.map((accolade, index) => {
            const IconComponent = accolade.icon;

            return (
              // CONTEXT7 SOURCE: /websites/tailwindcss - Size utilities for 30% size increase implementation
              // 30% SIZE INCREASE REVISION: Official Tailwind CSS documentation shows size-32 (128px) as ~33% larger than size-24 (96px)
              <div
                key={`accolade-${index}`}
                className="bg-gray-100 p-5 border border-gray-300 hover:bg-gray-200 transition-all duration-300 text-center size-32 aspect-square flex flex-col justify-center"
              >
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - SVG icon sizing with h-w utilities */}
                {/* ICON SIZING REVISION: Official Tailwind CSS documentation shows h-20 w-20 (80px) for large SVG icons, following heroicon pattern */}
                <IconComponent className={`h-20 w-20 ${accolade.className} mb-2 mx-auto`} />
                {/* CONTEXT7 SOURCE: /websites/tailwindcss - Typography utilities for proportional text scaling */}
                {/* TEXT 30% SCALING REVISION: Official Tailwind CSS documentation shows text-base/text-sm as proportionally larger for 30% card scaling */}
                <p className="text-base font-semibold text-black leading-tight">
                  {accolade.title}
                </p>
                <p className="text-sm text-gray-600 leading-tight">
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