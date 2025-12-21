'use client';

import type { JSX } from 'react';
import aboutContent from '@/content/about.json';
import { ModernRecognitionCard } from './modern-recognition-card';

interface RecognitionCardData {
  id: string;
  headerText: string;
  contentType: 'logo';
  logoImage: {
    url: string;
    alt: string;
  };
  sortOrder: number;
  status: 'published' | 'unpublished';
}

/**
 * Recognition Cards Section Component - 2025 Modernisation
 *
 * Modernisation improvements:
 * ✅ CMS integration replacing hardcoded content
 * ✅ Feature-based architecture (src/features/about/)
 * ✅ Eliminated oversized component anti-pattern
 * ✅ CSS-based animations replacing broken Framer Motion
 * ✅ Synchronous data pattern compliance
 * ✅ TypeScript strict mode compatibility
 *
 * Performance benefits:
 * - Reduced JavaScript bundle size
 * - Improved Core Web Vitals
 * - Better SEO with static content
 * - Eliminated render blocking
 */
export function RecognitionCardsSection(): JSX.Element {
  // Get recognition cards from CMS (synchronous pattern - direct JSON import)
  const recognitionData = aboutContent.recognitionCards;

  // Handle missing CMS data gracefully
  if (!recognitionData?.cards) {
    console.warn('[RecognitionCardsSection] CMS recognition cards data not available');
    return <div className="text-center py-8">Recognition content temporarily unavailable.</div>;
  }

  // Filter and sort published cards
  const publishedCards: RecognitionCardData[] = recognitionData.cards
    .filter((card): card is RecognitionCardData =>
      card.status === 'published' &&
      card.contentType === 'logo' &&
      card.logoImage !== undefined
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section
      id="recognition-cards"
      className="py-8 lg:py-12"
      aria-labelledby="recognition-cards-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional section heading - can be enabled if needed */}
        <div className="sr-only">
          <h2 id="recognition-cards-heading">{recognitionData.title}</h2>
          <p>{recognitionData.description}</p>
        </div>

        {/* Cards Grid with CSS-based stagger animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[75%] sm:w-[60%] md:w-full max-w-5xl mx-auto">
          {publishedCards.map((card, index) => (
            <div
              key={card.id}
              className="animate-[fadeInUp_0.6s_ease-out_forwards]"
              style={{
                animationDelay: `${0.5 + index * 0.2}s`,
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              <ModernRecognitionCard
                headerText={card.headerText}
                contentType={card.contentType}
                logoImage={card.logoImage}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}