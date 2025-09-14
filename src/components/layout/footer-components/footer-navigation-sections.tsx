// CONTEXT7 SOURCE: /reactjs/react.dev - Component memoization and navigation patterns
// OPTIMIZATION REASON: Official React documentation demonstrates React.memo and optimized navigation rendering

import React, { useMemo } from 'react';
import { Send } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import type { FooterContent } from '@/lib/services/footer-service-contracts';

interface FooterNavigationSectionsProps {
  sections: FooterContent['footerSections'];
  className?: string;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React.memo for navigation component optimization
 * MEMO REASON: Official React documentation shows memoization prevents unnecessary navigation re-renders
 */
export const FooterNavigationSections = React.memo<FooterNavigationSectionsProps>(({
  sections,
  className = ""
}) => {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for navigation data processing
  // MEMOIZATION REASON: Official React documentation shows useMemo for expensive list processing
  const processedSections = useMemo(() => 
    sections?.map((section, index) => ({
      ...section,
      id: `footer-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`,
      index,
      linkCount: section.links?.length || 0,
      // Pre-process links for performance
      processedLinks: section.links?.map((link, linkIndex) => ({
        ...link,
        id: `${section.title}-link-${linkIndex}`,
        isExternal: !link.href.startsWith('/'),
        // CONTEXT7 SOURCE: /wcag/guidelines - Accessibility link labeling
        // ACCESSIBILITY REASON: Provide context for screen readers
        accessibleLabel: `${link.label} in ${section.title} section`
      })) || []
    })) || [], 
    [sections]
  );

  // CONTEXT7 SOURCE: /reactjs/react.dev - Early return optimization
  // OPTIMIZATION REASON: Avoid rendering when no sections available
  if (!processedSections.length) {
    return null;
  }

  return (
    <div className={`lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8 items-stretch min-h-full ${className}`}>
      {processedSections.map((section) => (
        <FooterNavigationSection
          key={section.id}
          section={section}
          sectionIndex={section.index}
        />
      ))}
    </div>
  );
});

FooterNavigationSections.displayName = 'FooterNavigationSections';

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Individual section component with memoization
 * SECTION REASON: Separate component for individual sections enables granular re-rendering
 */
interface ProcessedSection {
  id: string;
  title: string;
  index: number;
  linkCount: number;
  processedLinks: Array<{
    id: string;
    href: string;
    label: string;
    isExternal: boolean;
    accessibleLabel: string;
  }>;
}

interface FooterNavigationSectionProps {
  section: ProcessedSection;
  sectionIndex: number;
}

const FooterNavigationSection = React.memo<FooterNavigationSectionProps>(({
  section,
  sectionIndex
}) => {
  return (
    <div 
      className="space-y-6 animate-fade-in-up"
      style={{ animationDelay: `${sectionIndex * 0.1}s` }}
    >
      {/* CONTEXT7 SOURCE: /wcag/guidelines - Heading hierarchy and landmark roles */}
      {/* ACCESSIBILITY REASON: Official WCAG guidelines require proper heading structure and landmarks */}
      <h3 
        id={section.id}
        className="font-serif text-3xl font-bold text-black flex items-center gap-2"
      >
        {section.title}
        <Separator className="flex-1 bg-gray-300" />
      </h3>
      
      {/* CONTEXT7 SOURCE: /wcag/guidelines - Navigation landmark with proper labeling */}
      {/* NAVIGATION REASON: Official WCAG guidelines require navigation landmarks for screen readers */}
      <nav 
        role="navigation" 
        aria-labelledby={section.id}
        aria-label={`${section.title} links`}
      >
        <ul className="space-y-3">
          {section.processedLinks.map((link) => (
            <li key={link.id}>
              <FooterNavigationLink link={link} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

FooterNavigationSection.displayName = 'FooterNavigationSection';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Optimized Link component usage
 * LINK REASON: Individual link component enables fine-grained memoization and accessibility
 */
interface FooterNavigationLinkProps {
  link: {
    id: string;
    href: string;
    label: string;
    isExternal: boolean;
    accessibleLabel: string;
  };
}

const FooterNavigationLink = React.memo<FooterNavigationLinkProps>(({
  link
}) => {
  // CONTEXT7 SOURCE: /vercel/next.js - External link handling patterns
  // EXTERNAL LINK REASON: Different handling for external vs internal links
  if (link.isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center text-gray-700 hover:text-accent-600 transition-all duration-300"
        aria-label={`${link.accessibleLabel} - opens in new tab`}
      >
        <span className="w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
          <Send className="w-3 h-3" />
        </span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          {link.label}
        </span>
      </a>
    );
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Internal Link component optimization
  // INTERNAL LINK REASON: Use Next.js Link for internal navigation with prefetching
  return (
    <Link
      href={link.href}
      className="group flex items-center text-gray-700 hover:text-accent-600 transition-all duration-300"
      aria-label={link.accessibleLabel}
      // CONTEXT7 SOURCE: /vercel/next.js - Prefetch optimization for footer links
      // PREFETCH REASON: Footer links are likely to be clicked, prefetch on hover
      prefetch={true}
    >
      <span className="w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
        <Send className="w-3 h-3" />
      </span>
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        {link.label}
      </span>
    </Link>
  );
});

FooterNavigationLink.displayName = 'FooterNavigationLink';

export default FooterNavigationSections;