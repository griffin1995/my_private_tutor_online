// CONTEXT7 SOURCE: /amannn/next-intl - Root page redirect for internationalization
// ROOT REDIRECT REASON: Official next-intl documentation redirects root to default locale

import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// CONTEXT7 SOURCE: /amannn/next-intl - Redirect root path to default locale
// LOCALE REDIRECT REASON: Official next-intl documentation ensures root path redirects to proper localized route
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}