import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isRTLLocale } from '@/i18n/navigation';
export function generateStaticParams() {
	return routing.locales.map((locale) => ({
		locale,
	}));
}
export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{
		locale: string;
	}>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}
	setRequestLocale(locale);
	const messages = await getMessages();
	const isRTL = isRTLLocale(locale);
	const direction = isRTL ? 'rtl' : 'ltr';
	return (
		<>
			{}
			{}
			{}
			<NextIntlClientProvider messages={messages}>
				{}
				{}
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
