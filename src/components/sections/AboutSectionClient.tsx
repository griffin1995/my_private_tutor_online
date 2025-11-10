// CONTEXT7 SOURCE: /payloadcms/payload - Client Component for About Section with Payload CMS data
// ARCHITECTURE REASON: Client Component for interactivity (Framer Motion animations)
// DESIGN SYSTEM COMPLIANCE: Uses design tokens (primary-900) instead of hardcoded colors

'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { RecognitionCard } from './RecognitionCard';

interface RecognitionCardData {
	id: string;
	headerText: string;
	contentType: 'logo' | 'icon';
	logoImage?: {
		url: string;
		alt: string;
	};
	logoMaxWidth?: string;
	iconPath?: string;
	iconAlt?: string;
	footerText?: string;
	sortOrder: number;
	status: 'published' | 'unpublished';
}

interface AboutSectionClientProps {
	className?: string;
	backgroundColor?: string;
	title?: string;
	founderImageUrl?: string;
	founderImageAlt?: string;
	recognitionCards: RecognitionCardData[];
}

/**
 * AboutSectionClient - Client Component
 *
 * Renders the About Section with Framer Motion animations
 * Receives recognition cards data from server component (hardcoded data)
 *
 * @param recognitionCards - Array of recognition cards from hardcoded data
 */
export function AboutSectionClient({
	className = '',
	founderImageUrl = '/images/team/elizabeth-burrows-founder-spare.jpg',
	founderImageAlt = 'Elizabeth Burrows, Founder of My Private Tutor Online',
	recognitionCards = [],
}: AboutSectionClientProps) {
	const gridLayoutClasses =
		'grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start lg:grid-rows-1 relative';

	return (
		<section
			id='about'
			className={`pt-15 lg:pt-20 bg-gradient-to-br from-token-brand-50 to-token-brand-100 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] ${className}`}>
			<div className='container mx-auto px-12 sm:px-16 lg:px-24 xl:px-32 2xl:px-40'>
				<div className={gridLayoutClasses}>
					<div>
						<div className='max-w-3xl md:max-w-none mx-auto md:mx-0 px-6 md:px-0 pt-8 sm:pt-12 md:pt-16 lg:pt-0 text-left'>
							<h2 className='text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-token-primary-dark leading-tight mb-6'>
								World-Class Education,
								<br />
								At Your Fingertips.
							</h2>
							<p className='text-base sm:text-lg xl:text-xl font-serif text-token-primary-dark mb-4'>
								At the heart of My Private Tutor Online is a singular vision: academic
								support that is both exceptional and deeply personal. Founded in 2010 by
								Elizabeth Burrows—a{' '}
								<strong className='text-token-primary-dark italic'>
									Cambridge-accepted educator and former Forbes journalist
								</strong>{' '}
								—the company began not as a business, but as a trusted network of elite
								colleagues she met throughout her international tutoring career.
							</p>
							<p className='text-base sm:text-lg xl:text-xl font-serif text-token-primary-dark mb-4'>
								What started as a circle of personal recommendations has since
								evolved—organically and exclusively—into one of the UK&apos;s most
								respected names in specialist private tutoring. As testament, My Private
								Tutor Online is honoured to be featured in{' '}
								<strong className='text-token-primary-dark italic'>
									Tatler&apos;s Address Book
								</strong>
								, recognised as{' '}
								<strong className='text-token-primary-dark italic'>
									School Guide&apos;s &apos;Top Pick&apos;
								</strong>{' '}
								for private tuition, and proud to count{' '}
								<strong className='text-token-primary-dark italic'>
									royal families
								</strong>{' '}
								among our clientele.
							</p>
							<p className='text-base sm:text-lg xl:text-xl font-serif text-token-primary-dark'>
								15 years later, the ethos remains the same: every tutor is handpicked,
								every match thoughtfully made, and every family accommodated directly by
								Elizabeth and her team.
							</p>
						</div>
					</div>

					<div className='hidden lg:flex items-center justify-center h-full'>
						<Image
							src={founderImageUrl}
							alt={founderImageAlt || 'Elizabeth Burrows, Founder'}
							width={400}
							height={500}
							className='shadow-xl'
							loading='lazy'
							quality={85}
							sizes='(max-width: 1024px) 0px, 400px'
						/>
					</div>
				</div>

				{/* Recognition Cards - Dynamically rendered from Payload CMS */}
				<m.div
					className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto py-8'
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}>
					{recognitionCards
						.filter((card): card is RecognitionCardData & { contentType: 'logo'; logoImage: { url: string; alt: string } } =>
							card.contentType === 'logo' && card.logoImage !== undefined
						)
						.map((card, index) => (
							<RecognitionCard
								key={card.id}
								headerText={card.headerText}
								contentType={card.contentType}
								logoImage={card.logoImage}
								{...(card.footerText && { footerText: card.footerText })}
								animationDelay={0.5 + index * 0.2}
								index={index}
							/>
						))}
				</m.div>
			</div>
		</section>
	);
}

export type { AboutSectionClientProps };
