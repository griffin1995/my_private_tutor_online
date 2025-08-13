// CONTEXT7 SOURCE: /amannn/next-intl - Locale layout for App Router internationalization
// LOCALE LAYOUT REASON: Official next-intl documentation Section 4.1 requires [locale] dynamic segment layout

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isRTLLocale } from '@/i18n/navigation';

// CONTEXT7 SOURCE: /amannn/next-intl - Generate static params for supported locales
// STATIC GENERATION REASON: Official next-intl documentation enables pre-rendering for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// CONTEXT7 SOURCE: /amannn/next-intl - Locale validation and message provision
// VALIDATION REASON: Official next-intl documentation Section 4.3 validates incoming locales for security
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // CONTEXT7 SOURCE: /amannn/next-intl - Locale validation with hasLocale utility
  // SECURITY REASON: Official next-intl documentation validates locale parameter to prevent malicious requests
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // CONTEXT7 SOURCE: /amannn/next-intl - Message loading for locale-specific translations
  // INTERNATIONALIZATION REASON: Official next-intl documentation loads messages dynamically per locale
  const messages = await getMessages();

  // CONTEXT7 SOURCE: /amannn/next-intl - RTL language support detection
  // RTL SUPPORT REASON: Text direction support for Arabic and Hebrew language expansion
  const isRTL = isRTLLocale(locale);
  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <body>
        {/* CONTEXT7 SOURCE: /amannn/next-intl - Client provider for internationalization context */}
        {/* I18N CONTEXT REASON: Official next-intl documentation provides translations to client components */}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}