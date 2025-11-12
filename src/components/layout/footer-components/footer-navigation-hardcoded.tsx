'use client';

import React from 'react';
import { Send } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

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
      { label: "Cookie Policy", href: "/legal/cookie-policy" }
    ]
  }
] as const;

interface FooterNavigationHardcodedProps {
  className?: string;
}

export const FooterNavigationHardcoded: React.FC<FooterNavigationHardcodedProps> = ({
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-stretch h-full ${className}`}>
      {FOOTER_SECTIONS.map((section, index) => (
        <FooterSection
          key={section.title}
          section={section}
          sectionIndex={index}
        />
      ))}
    </div>
  );
};

interface FooterSectionProps {
  section: FooterSection;
  sectionIndex: number;
}

const FooterSection: React.FC<FooterSectionProps> = ({ section, sectionIndex }) => {
  const sectionId = `footer-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div
      className='flex flex-col h-full animate-fade-in-up'
      style={{
        animationDelay: `${sectionIndex * 0.1}s`,
      }}>

      <h3
        id={sectionId}
        className='font-serif text-3xl md:text-3xl lg:text-4xl font-bold text-primary-900 flex items-center gap-2 mb-4 md:mb-4 lg:mb-6 flex-shrink-0'>
        {section.title}
        <Separator className='flex-1 bg-neutral-300' />
      </h3>

      <nav
        role='navigation'
        aria-labelledby={sectionId}
        aria-label={`${section.title} links`}
        className='flex-1 flex flex-col'>
        <ul className='flex flex-col justify-between h-full'>
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

  if (isExternal) {
    return (
      <a
        href={link.href}
        target='_blank'
        rel='noopener noreferrer'
        className='group flex items-center text-neutral-700 hover:text-accent-600 transition-all duration-300 text-lg md:text-lg lg:text-xl'
        aria-label={`${accessibleLabel} - opens in new tab`}>
        <span className='w-0 group-hover:w-4 transition-all duration-300 overflow-hidden'>
          <Send className='w-3 h-3' />
        </span>
        <span className='group-hover:translate-x-1 transition-transform duration-300'>
          {link.label}
        </span>
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className='group flex items-center text-neutral-700 hover:text-accent-600 transition-all duration-300 text-lg md:text-lg lg:text-xl'
      aria-label={accessibleLabel}
      prefetch={true}>
      <span className='w-0 group-hover:w-4 transition-all duration-300 overflow-hidden'>
        <Send className='w-3 h-3' />
      </span>
      <span className='group-hover:translate-x-1 transition-transform duration-300'>
        {link.label}
      </span>
    </Link>
  );
};

export default FooterNavigationHardcoded;