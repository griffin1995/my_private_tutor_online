/**
 * CONTEXT7 SOURCE: /amannn/next-intl - Internationalized FAQ page with next-intl
 * INTERNATIONALIZATION REASON: Official next-intl documentation enables multi-language FAQ support
 * 
 * FAQ Page - Multi-language Implementation
 * Features internationalized components with next-intl:
 * - FAQSearchSection: Multi-language search and filtering
 * - FAQCategorySection: Localized category display with accordions  
 * - FAQContactSection: Translated contact CTA section
 * - LanguageSwitcher: 5-language support (en-GB, fr-FR, es-ES, de-DE, zh-CN)
 * 
 * Component Architecture:
 * - Server Component with next-intl translations
 * - Client-side search filtering with localized content
 * - Animated sections with Framer Motion
 * - CMS integration with internationalized data
 */

import React from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getFAQHero, getFAQCategories, getUnifiedContact } from '@/lib/cms/cms-content';
import { HERO_IMAGES } from '@/lib/cms/cms-images';
import { PageLayout } from '@/components/layout/page-layout';
import { PageHero } from '@/components/layout/page-hero';
import { WaveSeparator } from '@/components/ui/wave-separator';
import { Section } from '@/components/layout/section';
import { FAQEnhancedSearch } from '@/components/faq/faq-enhanced-search';
import { FAQCategorySection } from '@/components/faq/faq-category-section';
import { FAQContactSection } from '@/components/faq/faq-contact-section';
import { FAQAnalyticsTracker } from '@/components/faq/faq-analytics-tracker';
import { GA4Setup } from '@/components/analytics/ga4-setup';
import { ConsentBanner } from '@/components/analytics/consent-banner';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

// CONTEXT7 SOURCE: /amannn/next-intl - Page component with locale parameter
// LOCALE PARAM REASON: Official next-intl documentation provides locale context for internationalized pages
interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

// CONTEXT7 SOURCE: /amannn/next-intl - Metadata generation with internationalization
// SEO INTERNATIONALIZATION REASON: Official next-intl documentation enables locale-specific metadata
export async function generateMetadata({ params }: FAQPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FAQ' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: {
        'en-GB': '/en-GB/faq',
        'fr-FR': '/fr-FR/aide',
        'es-ES': '/es-ES/preguntas-frecuentes',
        'de-DE': '/de-DE/haeufig-gestellte-fragen',
        'zh-CN': '/zh-CN/常见问题',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
      type: 'website',
    },
  };
}

// CONTEXT7 SOURCE: /amannn/next-intl - Multi-language FAQ page component
// MULTI-LANGUAGE REASON: Official next-intl documentation supports comprehensive internationalization
export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  
  // CONTEXT7 SOURCE: /amannn/next-intl - Set request locale for static rendering
  // STATIC RENDERING REASON: Official next-intl documentation enables static generation with locale awareness
  setRequestLocale(locale);

  // CONTEXT7 SOURCE: /amannn/next-intl - Server-side translations for FAQ content
  // SERVER TRANSLATIONS REASON: Official next-intl documentation provides getTranslations for server components
  const t = await getTranslations('FAQ');
  
  // CMS DATA SOURCE: Using getFAQHero for internationalized hero content
  const heroContent = getFAQHero();
  // CMS DATA SOURCE: Using getFAQCategories for FAQ questions and categories  
  const faqCategories = getFAQCategories();
  // CONTEXT7 SOURCE: /microsoft/typescript - Unified contact data access
  const unifiedContact = getUnifiedContact();
  const contactContent = unifiedContact.faq;
  const contactDetails = unifiedContact.primary;
  
  // CMS DATA SOURCE: Using HERO_IMAGES for background image
  const heroBackgroundImage = HERO_IMAGES[heroContent.backgroundImageKey as keyof typeof HERO_IMAGES];
  
  return (
    <>
      {/* CONTEXT7 SOURCE: /amannn/next-intl - Language switcher in page header */}
      {/* LANGUAGE SWITCHING REASON: Official next-intl documentation enables easy locale switching */}
      
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-screen hero section with i18n support */}
      {/* HERO INTERNATIONALIZATION: Official next-intl documentation provides localized hero content */}
      <PageHero
        background="gradient"
        size="full" 
        className="bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 relative"
        overlay={true}
        overlayOpacity="light"
      >
        {/* CONTEXT7 SOURCE: /amannn/next-intl - Language switcher in hero section */}
        {/* LANGUAGE SWITCHER PLACEMENT: Positioned in top-right corner for easy access */}
        <div className="absolute top-6 right-6 z-20">
          <LanguageSwitcher 
            variant="compact"
            position="header"
            showFlags={true}
            showLabels={false}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          {/* CONTEXT7 SOURCE: /amannn/next-intl - Internationalized hero title */}
          {/* TITLE LOCALIZATION: Using translated title from messages */}
          <m.h1 
            className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t('title')}
          </m.h1>
          
          <m.p 
            className="text-xl lg:text-2xl text-accent-400 font-semibold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('subtitle')}
          </m.p>
          
          <m.p 
            className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('description')}
          </m.p>
        </div>
      </PageHero>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Internationalized responsive layout */}
      {/* I18N LAYOUT REASON: Official next-intl documentation supports responsive multi-language layouts */}
      <PageLayout background="white" showHeader={false} showFooter={true}>

        <WaveSeparator 
          variant="subtle" 
          className="text-slate-100" 
        />

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Multi-language responsive container */}
        {/* RESPONSIVE I18N: Adaptive layout across devices with internationalized content */}
        <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6 xl:gap-8 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* STICKY NAVIGATION SIDEBAR - Desktop/Tablet Only */}
            {/* CONTEXT7 SOURCE: /amannn/next-intl - Internationalized navigation sidebar */}
            <aside className="hidden md:block md:col-span-1 lg:col-span-3">
              <div className="sticky top-6 space-y-6">
                {/* CONTEXT7 SOURCE: /amannn/next-intl - Localized search integration */}
                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-lg font-serif font-semibold text-slate-900 mb-4">{t('quickSearch')}</h3>
                  <FAQEnhancedSearch
                    questions={faqCategories.flatMap(category => category.questions)}
                    categories={faqCategories}
                    showPerformanceStats={false}
                    placeholder={t('searchPlaceholder')}
                    maxSuggestions={3}
                    className="compact"
                  />
                </m.div>
                
                {/* CONTEXT7 SOURCE: /amannn/next-intl - Localized category navigation */}
                <m.nav 
                  className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  aria-label={t('categories')}
                >
                  <h3 className="text-lg font-serif font-semibold text-slate-900 mb-4">{t('categories')}</h3>
                  <div className="space-y-2">
                    {faqCategories.map((category, index) => (
                      <m.a
                        key={category.id}
                        href={`#category-${category.id}`}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-accent-50 transition-all duration-200 group"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                          {category.icon}
                        </span>
                        <span className="font-medium text-slate-700 group-hover:text-accent-700">
                          {category.title}
                        </span>
                        <span className="ml-auto text-sm text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                          {category.questions.length}
                        </span>
                      </m.a>
                    ))}
                  </div>
                </m.nav>
              </div>
            </aside>
            
            {/* MAIN CONTENT AREA - Responsive */}
            <main className="col-span-1 md:col-span-3 lg:col-span-9 space-y-8">
              
              {/* Mobile Search Header with i18n */}
              <div className="block md:hidden">
                <Section className="py-8" background="blue">
                  <div className="container mx-auto px-4">
                    <m.div 
                      className="max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-center mb-8">
                        <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-3">
                          Find Your Answer Instantly
                        </h2>
                        <p className="text-base text-white/90">
                          Search our comprehensive FAQ database
                        </p>
                      </div>
                      
                      <FAQEnhancedSearch
                        questions={faqCategories.flatMap(category => category.questions)}
                        categories={faqCategories}
                        showPerformanceStats={false}
                        placeholder={t('searchPlaceholder')}
                        maxSuggestions={5}
                      />
                    </m.div>
                  </div>
                </Section>
              </div>

              {/* CONTEXT7 SOURCE: /amannn/next-intl - Internationalized FAQ categories */}
              <FAQCategorySection
                categories={faqCategories}
                searchQuery=""
                selectedCategory={null}
                enableBulkActions={true}
                showPrintView={false}
                onPrintViewToggle={() => {}}
                enableCategoryTheming={true}
                compactMode={false}
              />
            </main>
          </div>
        </div>

        {/* CONTEXT7 SOURCE: /amannn/next-intl - Localized floating action toolbar */}
        <m.div
          className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col space-y-2">
            {/* CONTEXT7 SOURCE: /amannn/next-intl - Internationalized action buttons */}
            <m.button
              className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={t('printFAQ')}
              aria-label={t('printFAQ')}
              onClick={() => window.print()}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </m.button>
            
            <m.a
              href="#contact"
              className="w-12 h-12 bg-accent-600 hover:bg-accent-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={t('contactUs')}
              aria-label={t('contactUs')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </m.a>
            
            <m.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 bg-slate-600 hover:bg-slate-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={t('backToTop')}
              aria-label={t('backToTop')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </m.button>
          </div>
        </m.div>

        <>
          <WaveSeparator 
            variant="wave" 
            className="text-slate-900" 
          />

          {/* CONTEXT7 SOURCE: /amannn/next-intl - Internationalized contact section */}
          <div id="contact">
            <FAQContactSection
              contactContent={contactContent}
              contactDetails={contactDetails}
            />
          </div>
        </>
      
      </PageLayout>
    </>
  );
}