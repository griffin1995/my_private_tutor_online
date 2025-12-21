// Client Component for About Section with motion animations
// ARCHITECTURE: Client-side component enabling Framer Motion interactivity
// DESIGN SYSTEM: Implements brand design tokens for consistent visual hierarchy
// PERFORMANCE: Optimised intersection observer integration for smooth animations

'use client';

import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { RecognitionCard } from './RecognitionCard';
import { HeadingText, BodyText } from '@/components/ui/typography';

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

interface AboutSectionClientProps {
	className?: string;
	backgroundColor?: string;
	title?: string;
	founderImageUrl?: string;
	founderImageAlt?: string;
	recognitionCards: RecognitionCardData[];

/**
 * About Section Client Component
 *
 * Renders the company about section with progressive content animation
 * Features responsive grid layout and recognition cards display
 *
 * @param className - Optional CSS class for section customisation
 * @param founderImageUrl - URL for founder profile image
 * @param founderImageAlt - Alternative text for founder image accessibility
 * @param recognitionCards - Array of brand recognition and achievement cards
 */
export function AboutSectionClient({
	className = '',
	founderImageUrl = '/images/team/elizabeth-burrows-founder-spare.jpg',
	founderImageAlt = 'Elizabeth Burrows, Founder of My Private Tutor Online',
	recognitionCards = [],
}: AboutSectionClientProps) {
	const gridLayoutClasses =
		'grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start lg:grid-rows-1 relative';

	// Intersection observer for main content animation trigger
	const { ref: mainContentRef, inView: mainContentInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});

	// Separate intersection observer for recognition cards stagger effect
	const { ref: cardsRef, inView: cardsInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});

	// Animation configuration for smooth content transitions
	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.6, ease: 'easeOut' }
	};

	const staggeredFadeIn = {
		initial: { opacity: 0, y: 30 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 }
	};

	return (
		<section
			id='about'
			className={`pt-15 lg:pt-20 bg-gradient-to-br from-token-brand-50 to-token-brand-100 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] ${className}`}>
			<div className='container mx-auto px-12 sm:px-16 lg:px-24 xl:px-32 2xl:px-40'>
				<div
					ref={mainContentRef}
					className={gridLayoutClasses}
					>div
						<div className='max-w-3xl md:max-w-none mx-auto md:mx-0 px-6 md:px-0 pt-8 sm:pt-12 md:pt-16 lg:pt-0 text-left'>
							<div
								<HeadingText
									variant="primary"
									level={2}
									className="text-token-primary-dark leading-[1.15] mb-6"
									responsive
								>
									World-Class Education,
									<br />
									At Your Fingertips.
								</HeadingText>
							</div>

							<div
								<BodyText
									variant="large"
									className="text-token-primary-dark leading-[1.6] mb-4"
									responsive
								>
									At the heart of My Private Tutor Online is a singular vision: academic
									support that is both exceptional and deeply personal. Founded in 2010 by
									Elizabeth Burrows—a{' '}
									<strong className='text-token-primary-dark italic'>
										Cambridge-accepted educator and former Forbes journalist
									</strong>{' '}
									—the company began not as a business, but as a trusted network of elite
									colleagues she met throughout her international tutoring career.
								</BodyText>
							</div>

							{/* Mobile/Tablet responsive image placement */}
							<div
								className='block lg:hidden mb-6 mt-2 relative w-full h-48 sm:h-56 md:h-64 overflow-hidden'
								<Image
									src='/images/about/meet-elizabeth-a-different-kind-of-educator.webp'
									alt='Elizabeth Burrows - A Different Kind of Educator'
									fill
									className='object-cover shadow-lg'
									loading='lazy'
									quality={85}
									sizes='(max-width: 1024px) 100vw, 0px'
								/>
							</div>

							<div
								<BodyText
									variant="large"
									className="text-token-primary-dark leading-[1.6] mb-4"
									responsive
								>
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
								</BodyText>
							</div>

							<div
								<BodyText
									variant="large"
									className="text-token-primary-dark leading-[1.6]"
									responsive
								>
									15 years later, the ethos remains the same: every tutor is handpicked,
									every match thoughtfully made, and every family accommodated directly by
									Elizabeth and her team.
								</BodyText>
							</div>
						</div>
					</div>

					<div
						className='hidden lg:flex items-center justify-center h-full'
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

				{/* Recognition Cards Grid - Staggered animation presentation */}
				<div
					ref={cardsRef}
					className='grid grid-cols-1 md:grid-cols-3 gap-6 w-[75%] sm:w-[60%] md:w-full max-w-5xl mx-auto py-8'>
		{...staggeredFadeIn}
					{recognitionCards
						.filter((card): card is RecognitionCardData & { contentType: 'logo'; logoImage: { url: string; alt: string } } =>
							card.contentType === 'logo' && card.logoImage !== undefined
						)
						.map((card, index) => (
							<div
								key={card.id}
								<RecognitionCard
									headerText={card.headerText}
									contentType={card.contentType}
									logoImage={card.logoImage}
									{...(card.footerText && { footerText: card.footerText })}
									animationDelay={0.6 + index * 0.1}
									index={index}
								/>
							</div>
						))}
				</div>
			</div>
		</section>
	);
