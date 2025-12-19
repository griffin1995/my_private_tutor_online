import { createPageMetadata, createServiceSchema } from '@/lib/metadata/shared-metadata'
import Script from 'next/script'

export const metadata = createPageMetadata({
	title: 'Services',
	description: 'Premium tutoring services including 11+ preparation, GCSE support, and A-level coaching.',
	path: '/services',
	keywords: ['services', '11-plus', 'GCSE', 'tutoring', 'A-level', 'exam preparation'],
	image: '/images/services/services-hero.jpg'
})
export default function ServicesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const serviceSchema = createServiceSchema()

	return (
		<>
			<Script
				id="services-structured-data"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(serviceSchema)
				}}
			/>
			{children}
		</>
	)
}
