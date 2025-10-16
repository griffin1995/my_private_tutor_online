import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
interface FAQPageProps {
	params: Promise<{
		locale: string;
	}>;
}
export async function generateMetadata({ params }: FAQPageProps) {
	const { locale } = await params;
	const t = await getTranslations({
		locale,
		namespace: 'FAQ',
	});
	return {
		title: t('title') || 'FAQ',
		description: t('description') || 'Frequently Asked Questions',
	};
}
export default async function FAQPage({ params }: FAQPageProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations('FAQ');
	return (
		<div className='min-h-screen bg-white'>
			<div className='max-w-4xl mx-auto px-4 py-16'>
				<h1 className='text-3xl font-bold text-center mb-8'>
					{t('title') || 'FAQ - Debug Mode'}
				</h1>
				<p className='text-lg text-center text-gray-600'>
					Minimal FAQ page for debugging component resolution issues.
				</p>
			</div>
		</div>
	);
}
