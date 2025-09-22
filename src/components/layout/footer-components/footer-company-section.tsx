// CONTEXT7 SOURCE: /reactjs/react.dev - Component decomposition and memoization patterns
// OPTIMIZATION REASON: Official React documentation demonstrates React.memo for performance optimization and component boundaries

// CONTEXT7 SOURCE: /reactjs/react.dev - Component modification for element removal
// REMOVAL REASON: Clean removal of accolades bar as per user requirements
import React, { useMemo } from 'react';
// CONTEXT7 SOURCE: /reactjs/react.dev - Icon imports removed for unused accolades
// ICON REMOVAL REASON: Crown, Award, BarChart3 icons no longer needed after accolades removal
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
  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo simplified after accolades removal
  // MEMOIZATION REASON: Official React documentation demonstrates useMemo for computed properties
  // ACCOLADES REMOVAL: Removed accolades array computation as per user requirements (c.1.2)
  const processedContent = useMemo(() => ({
    companyName: content.companyName,
    logo: {
      ...content.logo,
      // Optimize alt text for accessibility
      alt: content.logo.alt || `${content.companyName} logo`
    }
    // CONTEXT7 SOURCE: /reactjs/react.dev - Accolades data computation removed
    // ACCOLADES REMOVAL REASON: User requested removal of c.1.2 accolades bar section
  }), [content.companyName, content.logo]);

  // CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Simplified layout optimization
  // COMPONENT CLEANUP REASON: Official React patterns show simplified JSX structure without unnecessary nesting
  // CONTEXT7 SOURCE: /websites/react_dev_reference - Component optimization removing empty containers
  // OPTIMIZATION REASON: Official React docs demonstrate removing redundant wrapper divs for cleaner structure
  return (
    <div className={`flex flex-col justify-center h-full animate-fade-in-left ${className}`}>
      {/* CONTEXT7 SOURCE: /vercel/next.js - Optimized logo container with minimal nesting */}
      {/* STRUCTURAL OPTIMIZATION REASON: Official Next.js patterns show direct logo implementation without extra containers */}
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
  );
});

FooterCompanySection.displayName = 'FooterCompanySection';

export default FooterCompanySection;