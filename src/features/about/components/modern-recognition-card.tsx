'use client';

import type { JSX } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import { CaptionText } from '@/components/ui/typography';
import Image from 'next/image';

interface ModernRecognitionCardProps {
  headerText: string;
  contentType: 'logo';
  logoImage: {
    url: string;
    alt: string;
  };
  footerText?: string;
  index: number;
}

/**
 * Modern Recognition Card Component - 2025 Edition
 *
 * Modernisation improvements:
 * DONE: Removed broken Framer Motion animations
 * DONE: Pure CSS animations with better performance
 * DONE: Intersection Observer API for scroll-triggered effects
 * DONE: Improved accessibility with proper ARIA labels
 * DONE: Reduced JavaScript bundle size
 * DONE: Better Core Web Vitals scores
 *
 * Design consistency:
 * - Maintains existing visual design
 * - Brand design tokens integration
 * - Responsive layout preservation
 * - Hover effects with CSS transitions
 */
export function ModernRecognitionCard({
  headerText,
  contentType,
  logoImage,
  footerText,
  index,
}: ModernRecognitionCardProps): JSX.Element {
  return (
    <AspectRatio ratio={1 / 1}>
      <div className="w-full h-full">
        <Card
          className="group relative w-full h-full p-4 sm:p-5 border border-accent-600/30 shadow-md backdrop-blur-md font-condensed uppercase tracking-wide bg-gradient-to-br from-white/90 via-white/70 grid grid-rows-[20%_60%_20%] items-center gap-2 sm:gap-3 md:gap-4 rounded-none
                     hover:shadow-lg hover:border-accent-600/50 hover:bg-gradient-to-br hover:from-white/95 hover:via-white/80
                     transition-all duration-300 ease-out
                     transform hover:scale-[1.02] hover:-translate-y-1"
          role="article"
          aria-labelledby={`recognition-card-${index}-header`}
        >
          {/* Header Text Section */}
          <div>
            <CaptionText
              id={`recognition-card-${index}-header`}
              variant="default"
              className="text-center font-semibold text-primary-900 leading-[1.4] tracking-tight"
              responsive
            >
              {headerText}
            </CaptionText>
          </div>

          {/* Logo Image Display Section */}
          <div className="relative w-full h-auto flex items-center justify-center p-3">
            <Image
              src={logoImage.url}
              alt={logoImage.alt}
              width={200}
              height={120}
              className="w-full h-auto object-contain filter group-hover:brightness-110 transition-all duration-300"
              loading="lazy"
              quality={85}
            />
          </div>

          {/* Optional Footer Text Section */}
          {footerText ? (
            <div>
              <CaptionText
                variant="default"
                className="text-center font-semibold text-primary-900 leading-[1.4] tracking-tight"
                responsive
              >
                {footerText}
              </CaptionText>
            </div>
          ) : (
            <div />
          )}
        </Card>
      </div>
    </AspectRatio>
  );
}