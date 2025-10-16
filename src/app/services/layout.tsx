import type { Metadata } from 'next';
import Script from 'next/script';
import {
	servicesMetadata,
	generateStructuredData,
	generateFAQStructuredData,
	generateBreadcrumbStructuredData,
} from './metadata';
export const metadata: Metadata = servicesMetadata;
export default function ServicesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const structuredData = generateStructuredData();
	const faqStructuredData = generateFAQStructuredData();
	const breadcrumbStructuredData = generateBreadcrumbStructuredData();
	return (
		<>
			{}
			{}
			<Script
				id='services-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<Script
				id='services-faq-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqStructuredData),
				}}
			/>
			<Script
				id='services-breadcrumb-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbStructuredData),
				}}
			/>
			{children}
		</>
	);
}
