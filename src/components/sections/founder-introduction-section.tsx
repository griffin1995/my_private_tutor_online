// CONTEXT7 SOURCE: /reactjs/react.dev - React component for founder introduction section with video integration
// COMPONENT EXTRACTION REASON: Official React documentation patterns for extracting reusable section components
// REVISION REASON: Homepage componentization to achieve modular 8-section structure with video and badge elements

"use client";

import React from 'react';
import { m } from 'framer-motion';
import HeroVideoDialog from '../magicui/hero-video-dialog';
import { Highlighter } from '../magicui/highlighter';

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface for component props with explicit children
// INTERFACE REASON: Official React 18+ documentation requires explicit children prop declaration for type safety
interface FounderIntroductionSectionProps {
  children?: React.ReactNode;
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Functional component pattern for section extraction
// SECTION COMPONENT REASON: Official React documentation shows section components for better maintainability
export function FounderIntroductionSection({}: FounderIntroductionSectionProps = {}) {
  return (
    <section
      id="founder-introduction-elizabeth-video"
      className="py-20 lg:py-28 bg-gradient-to-br from-[#0A1128] to-[#1B2A41] relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(135deg, #F5F1EB 0%, rgba(139,69,19,0.1) 100%),
          radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 1px),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      <div className="container mx-auto relative" style={{ padding: 'calc(21px * 1.618px) calc(34px * 1.618px) calc(55px * 1.618px)' }}>
        {/* Decorative golden ratio positioned elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#D4AF37] opacity-30 hidden lg:block animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#D4AF37] opacity-40 hidden lg:block animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-[#D4AF37] opacity-25 hidden lg:block animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Additional geometric accent elements */}
        <div className="absolute top-1/6 right-1/3 w-3 h-0.5 bg-[#D4AF37] opacity-20 hidden lg:block transform rotate-45"></div>
        <div className="absolute bottom-1/6 left-1/3 w-0.5 h-3 bg-[#D4AF37] opacity-20 hidden lg:block"></div>

        {/* Enhanced centered video section with comprehensive 2025 design */}
        <div className="max-w-4xl mx-auto text-center relative z-10" style={{
          marginTop: '64px',
          marginBottom: '64px',
          gap: '21px'
        }}>
          {/* Enhanced video component with comprehensive premium styling */}
          <m.div
            className="relative w-full max-w-2xl mx-auto cursor-pointer group"
            role="region"
            aria-label="Elizabeth Burrows introduction video section"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            style={{
              background: 'transparent',
              border: 'none',
              boxShadow: `
                4px 8px 16px rgba(30,58,95,0.2),
                0 0 20px rgba(212,175,55,0.1)
              `,
              padding: 'calc(16px * 1.618)',
              borderLeft: '4px solid #D4AF37'
            }}
            whileHover={{
              y: -2,
              scale: 1.02,
              boxShadow: `
                6px 12px 24px rgba(30,58,95,0.3),
                0 0 30px rgba(212,175,55,0.3)
              `,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <HeroVideoDialog
              videoSrc="/videos/compressed-elizabeth-introduction-sound.mp4"
              thumbnailSrc="/images/video-thumbnails/introduction-video-thumbnail-2025.png"
              thumbnailAlt="Elizabeth Burrows Introduction Video - Founder of My Private Tutor Online"
              animationStyle="from-center"
              className="w-full"
            />
          </m.div>
        </div>

        {/* Enhanced credential badges with comprehensive styling */}
        <m.div
          className="grid grid-cols-3 gap-6 w-full max-w-6xl mx-auto relative z-10"
          style={{
            marginTop: '55px', // Fibonacci spacing
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            alignItems: 'center'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          {/* Badge 1 - Tatler Logo with enhanced styling */}
          <m.div
            className="flex justify-center group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            style={{
              aspectRatio: '1/1',
              background: `
                linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%),
                linear-gradient(45deg, rgba(212,175,55,0.1) 0%, transparent 100%)
              `,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(212,175,55,0.3)',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontFamily: "'Helvetica Neue Condensed', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <img
              src="/images/media/tatler-logo-alt.png"
              alt="Tatler Address Book - Featured Premium Tutoring Service"
              className="h-auto max-w-[156px] object-contain filter group-hover:brightness-110 transition-all duration-300"
            />
          </m.div>

          {/* Badge 2 - Schools Guide UK Logo with enhanced styling */}
          <m.div
            className="flex justify-center group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            style={{
              aspectRatio: '1/1',
              background: `
                linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%),
                linear-gradient(45deg, rgba(212,175,55,0.1) 0%, transparent 100%)
              `,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(212,175,55,0.3)',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontFamily: "'Helvetica Neue Condensed', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <img
              src="/images/media/schools-guide-uk-logo.png"
              alt="Schools Guide UK - Top Pick for Private Tuition"
              className="h-auto max-w-[156px] object-contain filter group-hover:brightness-110 transition-all duration-300"
            />
          </m.div>

          {/* Badge 3 - Royal Clientele Text with enhanced styling */}
          <m.div
            className="flex justify-center items-center group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            style={{
              aspectRatio: '1/1',
              background: `
                linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%),
                linear-gradient(45deg, rgba(212,175,55,0.1) 0%, transparent 100%)
              `,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(212,175,55,0.3)',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontFamily: "'Helvetica Neue Condensed', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <m.p
              className="text-center font-medium text-[#1E3A5F] tracking-tight"
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1E3A5F',
                lineHeight: '1.4'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.1, ease: "easeOut" }}
            >
              Trusted by Royal Clientele
            </m.p>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}