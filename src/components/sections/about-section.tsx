'use client';

import { useConversionTracking } from '@/lib/analytics/conversion-tracking';
import { Card } from '@/components/ui/card';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
interface AboutSectionProps {
	className?: string;
	backgroundColor?: string;
	title?: string;
	founderImageUrl?: string;
	founderImageAlt?: string;
}
export function AboutSection({
	className = '',
	founderImageUrl = '/images/team/elizabeth-burrows-founder-spare.jpg',
	founderImageAlt = 'Elizabeth Burrows, Founder of My Private Tutor Online',
}: AboutSectionProps) {
	const conversionTracker = useConversionTracking('about-section', {
		enableABTesting: false,
		trackScrollMilestones: true,
		trackExitIntent: true,
		trackVideoEngagement: true,
	});
	useEffect(() => {
		if (conversionTracker) {
			conversionTracker.trackEvent('about_section_view', {
				timestamp: Date.now(),
				userAgent: navigator.userAgent.substring(0, 100),
			});
		}
	}, [conversionTracker]);
	const gridLayoutClasses =
		'grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start lg:grid-rows-1 relative';
	return (
		<section
			id='about'
			className={`pt-15 lg:pt-20 bg-gradient-to-br from-token-brand-50 to-token-brand-100 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] ${className}`}>
			<div className='container mx-auto px-12 sm:px-16 lg:px-24 xl:px-32 2xl:px-40'>
				<div className={gridLayoutClasses}>
					<div>
						<div className='max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-left'>
							<h2 className='text-4xl lg:text-5xl font-serif font-bold text-token-primary-dark leading-tight mb-6'>
								World-Class Education,
								<br />
								At Your Fingertips.
							</h2>
							<p className='text-lg lg:text-xl font-serif italic text-token-primary-dark mb-4'>
								At the heart of My Private Tutor Online is a singular vision: academic
								support that is both exceptional and deeply personal. Founded in 2010 by
								Elizabeth Burrows—a{' '}
								<strong className='text-token-primary-dark'>
									Cambridge-accepted educator and former Forbes journalist
								</strong>{' '}
								—the company began not as a business, but as a trusted network of elite
								colleagues she met throughout her international tutoring career.
							</p>
							<p className='text-lg lg:text-xl font-serif italic text-token-primary-dark mb-4'>
								What started as a circle of personal recommendations has since
								evolved—organically and exclusively—into one of the UK&apos;s most
								respected names in specialist private tutoring. As testament, My Private
								Tutor Online is honoured to be featured in{' '}
								<strong className='text-token-primary-dark'>
									Tatler&apos;s Address Book
								</strong>
								, recognised as{' '}
								<strong className='text-token-primary-dark'>
									School Guide&apos;s ‘Top Pick’
								</strong>{' '}
								for private tuition, and proud to count{' '}
								<strong className='text-token-primary-dark'>royal families</strong>{' '}
								among our clientele.
							</p>
							<p className='text-lg lg:text-xl font-serif italic text-token-primary-dark'>
								15 years later, the ethos remains the same: every tutor is handpicked,
								every match thoughtfully made, and every family accommodated directly by
								Elizabeth and her team.
							</p>
						</div>
					</div>

					<div className='flex items-center justify-center h-full'>
						<Image
							src={founderImageUrl}
							alt={founderImageAlt || 'Elizabeth Burrows, Founder'}
							width={400}
							height={500}
							className='shadow-xl'
							loading='lazy'
							quality={85}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px'
						/>
					</div>
				</div>

				<m.div
					className='grid grid-cols-3 gap-6 w-full max-w-6xl mx-auto items-stretch py-5'
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}>
					{/* Card 1 - Tatler */}
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
						whileHover={{
							scale: 1.02,
							y: -2,
							boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
							transition: { duration: 0.3, ease: 'easeOut' },
						}}>
						<Card className='group relative aspect-square p-5 border border-yellow-300/30 shadow-md backdrop-blur-md font-condensed uppercase tracking-wide bg-gradient-to-br from-white/90 via-white/70 grid grid-rows-[20%_60%_20%] items-center py-5 gap-0 rounded-none'>
							{/* Row 1 */}
							<m.p
								className='text-center font-semibold text-[#1E3A5F] text-sm leading-[1.4] tracking-tight'
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}>
								As featured in
							</m.p>

							{/* Row 2 */}
							<img
								src='/images/media/tatler-logo-alt.png'
								alt='Tatler Address Book - Featured Premium Tutoring Service'
								className='h-auto max-w-[156px] object-contain filter group-hover:brightness-110 transition-all duration-300 justify-self-center'
							/>

							{/* Row 3 */}
							<div />
						</Card>
					</m.div>

					{/* Card 2 - Schools Guide UK */}
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
						whileHover={{
							scale: 1.02,
							y: -2,
							boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
							transition: { duration: 0.3, ease: 'easeOut' },
						}}>
						<Card className='group relative aspect-square p-5 border border-yellow-300/30 shadow-md backdrop-blur-md font-condensed uppercase tracking-wide bg-gradient-to-br from-white/90 via-white/70 grid grid-rows-[20%_60%_20%] items-center py-5 gap-0 rounded-none'>
							<m.p
								className='text-center font-semibold text-[#1E3A5F] text-sm leading-[1.4] tracking-tight'
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}>
								As recommended by
							</m.p>

							<img
								src='/images/media/schools-guide-uk-logo.png'
								alt='Schools Guide UK - Top Pick for Private Tuition'
								className='h-auto max-w-[156px] object-contain filter group-hover:brightness-110 transition-all duration-300 justify-self-center'
							/>

							<div />
						</Card>
					</m.div>

					{/* Card 3 - Royal Clientele */}
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
						whileHover={{
							scale: 1.02,
							y: -2,
							boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
							transition: { duration: 0.3, ease: 'easeOut' },
						}}>
						<Card className='group relative aspect-square p-5 border border-yellow-300/30 shadow-md backdrop-blur-md font-condensed uppercase tracking-wide bg-gradient-to-br from-white/90 via-white/70 grid grid-rows-[20%_60%_20%] items-center text-center py-5 gap-0 rounded-none'>
							{/* Row 1 */}
							<m.p
								className='text-center font-semibold text-[#1E3A5F] text-sm leading-[1.4] tracking-tight'
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}>
								As trusted by
							</m.p>

							{/* Row 2 */}
							<m.div
								initial={{ opacity: 0, scale: 0.8, y: -10 }}
								whileInView={{ opacity: 1, scale: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 1.0, ease: 'easeOut' }}
								className='mb-2 relative w-[100px] h-[100px] justify-self-center'>
								<Image
									src='/icons/royal-crown.svg'
									alt='Royal Crown Icon'
									fill
									className='transition-all duration-300 group-hover:scale-110'
								/>
							</m.div>

							{/* Row 3 */}
							<m.p
								className='text-center font-semibold text-[#1E3A5F] text-sm leading-[1.4] tracking-tight'
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}>
								Royal Clientele
							</m.p>
						</Card>
					</m.div>
				</m.div>
			</div>
		</section>
	);
}
export type { AboutSectionProps };
