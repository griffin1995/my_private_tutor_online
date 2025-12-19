'use client';

import React, { useState } from 'react';
import { Send, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { cookieConsentUtils } from '@/components/privacy/cookie-consent-manager';
import { HeadingText, BodyText } from '@/components/ui/typography';

// Type-safe footer data structure
interface FooterLink {
  readonly label: string;
  readonly href: string;
}

interface FooterSection {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

// Hardcoded footer data - no CMS dependency
const FOOTER_SECTIONS: readonly FooterSection[] = [
  {
    title: "Our Services",
    links: [
      { label: "11+ Preparation", href: "/11-plus-bootcamps" },
      { label: "GCSE & A-Level Tutoring", href: "/subject-tuition" },
      { label: "Oxbridge Preparation", href: "/subject-tuition" },
      { label: "Homeschooling Support", href: "/homeschooling" },
      { label: "Video Masterclasses", href: "/video-masterclasses" }
    ]
  },
  {
    title: "About & Team",
    links: [
      { label: "About Elizabeth & Our Story", href: "/about" },
      { label: "Meet Our Tutors", href: "/meet-our-tutors" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Testimonials", href: "/testimonials" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Exam Papers", href: "/exam-papers" },
      { label: "Video Masterclasses", href: "/video-masterclasses" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" }
    ]
  },
  {
    title: "Legal & Trust",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Terms of Service", href: "/legal/terms-of-service" },
      { label: "Cookie Policy", href: "/legal/cookie-policy" },
      { label: "Cookie Settings", href: "#cookie-settings" },
      { label: "Booking Policy", href: "/legal/booking-policy" },
      { label: "Record of Processing", href: "/legal/record-of-processing" }
    ]
  }
] as const;

interface FooterNavigationHardcodedProps {
  className?: string;
}

export const FooterNavigationHardcoded: React.FC<FooterNavigationHardcodedProps> = ({
  className = ''
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  return (
    <div className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center lg:justify-items-stretch relative ${className}`}>
      {FOOTER_SECTIONS.map((section, index) => (
        <FooterSection
          key={section.title}
          section={section}
          sectionIndex={index}
          isOpen={!!openSections[section.title]}
          onToggle={() => toggleSection(section.title)}
        />
      ))}

      {/* Mobile accordion arrows positioned at grid level */}
      {FOOTER_SECTIONS.map((section, index) => {
        // Calculate cumulative height based on previous sections
        let cumulativeHeight = 16; // Initial top offset
        for (let i = 0; i < index; i++) {
          const prevSection = FOOTER_SECTIONS[i];
          const isPrevOpen = !!openSections[prevSection.title];
          cumulativeHeight += 60; // Base height for title
          if (isPrevOpen) {
            cumulativeHeight += prevSection.links.length * 40 + 32; // Height for opened content
          }
        }

        return (
          <button
            key={`arrow-${section.title}`}
            onClick={() => toggleSection(section.title)}
            className='sm:hidden absolute p-2 hover:text-accent-600 transition-all duration-300 ease-in-out'
            style={{
              top: `${cumulativeHeight}px`,
              right: '4px'
            }}
            aria-label={`${openSections[section.title] ? 'Collapse' : 'Expand'} ${section.title} section`}>
            {openSections[section.title] ? (
              <ChevronUp className='w-6 h-6' />
            ) : (
              <ChevronDown className='w-6 h-6' />
            )}
          </button>
        );
      })}
    </div>
  );
};

interface FooterSectionProps {
  section: FooterSection;
  sectionIndex: number;
  isOpen: boolean;
  onToggle: () => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({ section, sectionIndex, isOpen, onToggle }) => {
  const sectionId = `footer-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`;
  const contentId = `${sectionId}-content`;

  return (
    <div
      className='flex flex-col animate-fade-in-up text-center md:text-left relative'
      style={{
        animationDelay: `${sectionIndex * 0.1}s`,
      }}>

      {/* Mobile accordion button (default breakpoint only) */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className='sm:hidden flex items-center justify-center mb-4 flex-shrink-0 w-full hover:text-accent-600 transition-colors duration-300'>
        <div className='flex items-center gap-2'>
          <HeadingText
            level={3}
            variant="secondary"
            className="text-primary-900">
            {section.title}
          </HeadingText>
        </div>
      </button>

      {/* Desktop heading (sm+ breakpoints) */}
      <div
        id={sectionId}
        className='hidden sm:flex items-center justify-center md:justify-start gap-2 mb-4 md:mb-4 lg:mb-6 flex-shrink-0'>
        <HeadingText
          level={3}
          variant="secondary"
          responsive
          className="text-primary-900">
          {section.title}
        </HeadingText>
        <Separator className='flex-1 bg-neutral-300' />
      </div>

      {/* Mobile collapsible content (default breakpoint only) */}
      <div
        id={contentId}
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <nav
          role='navigation'
          aria-labelledby={sectionId}
          aria-label={`${section.title} links`}
          className='flex flex-col pb-4 items-center md:items-start'>
          <ul className='flex flex-col space-y-3 items-center md:items-start'>
            {section.links.map((link, linkIndex) => (
              <li
                key={`${section.title}-${link.label}-${linkIndex}`}
                className='flex-shrink-0'>
                <FooterLink
                  link={link}
                  accessibleLabel={`${link.label} in ${section.title} section`}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop always-visible content (sm+ breakpoints) */}
      <nav
        role='navigation'
        aria-labelledby={sectionId}
        aria-label={`${section.title} links`}
        className='hidden sm:flex flex-col items-center md:items-start'>
        <ul className='flex flex-col space-y-3 items-center md:items-start'>
          {section.links.map((link, linkIndex) => (
            <li
              key={`${section.title}-${link.label}-${linkIndex}`}
              className='flex-shrink-0'>
              <FooterLink
                link={link}
                accessibleLabel={`${link.label} in ${section.title} section`}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

interface FooterLinkProps {
  link: FooterLink;
  accessibleLabel: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ link, accessibleLabel }) => {
  const isExternal = !link.href.startsWith('/');
  const isCookieSettings = link.href === '#cookie-settings';

  // Handle cookie settings specially
  if (isCookieSettings) {
    return (
      <button
        onClick={() => cookieConsentUtils.showPreferences()}
        className='group flex items-center hover:text-accent-600 transition-all duration-300'
        aria-label={`${accessibleLabel} - opens cookie preferences modal`}>
        <span className='w-0 group-hover:w-4 transition-all duration-300 overflow-hidden'>
          <Send className='w-3 h-3' />
        </span>
        <BodyText
          variant="large"
          as="span"
          className='text-neutral-700 group-hover:translate-x-1 transition-transform duration-300'>
          {link.label}
        </BodyText>
      </button>
    );
  }

  if (isExternal) {
    return (
      <a
        href={link.href}
        target='_blank'
        rel='noopener noreferrer'
        className='group flex items-center hover:text-accent-600 transition-all duration-300'
        aria-label={`${accessibleLabel} - opens in new tab`}>
        <span className='w-0 group-hover:w-4 transition-all duration-300 overflow-hidden'>
          <Send className='w-3 h-3' />
        </span>
        <BodyText
          variant="large"
          as="span"
          className='text-neutral-700 group-hover:translate-x-1 transition-transform duration-300'>
          {link.label}
        </BodyText>
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className='group flex items-center hover:text-accent-600 transition-all duration-300'
      aria-label={accessibleLabel}
      prefetch={true}>
      <span className='w-0 group-hover:w-4 transition-all duration-300 overflow-hidden'>
        <Send className='w-3 h-3' />
      </span>
      <BodyText
        variant="large"
        as="span"
        className='text-neutral-700 group-hover:translate-x-1 transition-transform duration-300'>
        {link.label}
      </BodyText>
    </Link>
  );
};

