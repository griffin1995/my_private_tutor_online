// CONTEXT7 SOURCE: /amannn/next-intl - Locale layout for App Router internationalization
// LOCALE LAYOUT REASON: Official next-intl documentation Section 4.1 requires [locale] dynamic segment layout

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
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

  // CONTEXT7 SOURCE: /amannn/next-intl - Enable static rendering for server components
  // HYDRATION FIX REASON: Official next-intl documentation requires setRequestLocale in server components for static rendering
  setRequestLocale(locale);

  // CONTEXT7 SOURCE: /amannn/next-intl - Message loading for locale-specific translations
  // INTERNATIONALIZATION REASON: Official next-intl documentation loads messages dynamically per locale
  const messages = await getMessages();

  // CONTEXT7 SOURCE: /amannn/next-intl - RTL language support detection
  // RTL SUPPORT REASON: Text direction support for Arabic and Hebrew language expansion
  const isRTL = isRTLLocale(locale);
  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <>
      {/* CONTEXT7 SOURCE: /amannn/next-intl - Client provider for internationalization context */}
      {/* I18N CONTEXT REASON: Official next-intl documentation provides translations to client components */}
      {/* HYDRATION FIX: Removed duplicate html tag to prevent nested html elements causing hydration errors */}
      <NextIntlClientProvider messages={messages}>
        {/* CONTEXT7 SOURCE: /amannn/next-intl - Client-side locale attribute setting */}
        {/* LOCALE ATTRIBUTES: Set lang and dir on html element via useEffect to avoid SSR mismatch */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.lang = '${locale}';
              document.documentElement.dir = '${direction}';
            `,
          }}
        />
        {children}
      </NextIntlClientProvider>
    </>
  );
}