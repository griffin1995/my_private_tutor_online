'use client';

import { m } from 'framer-motion';
import { useEffect } from 'react';
import { useAboutSectionPerformance } from '@/lib/performance/about-monitoring';
import {
	preloadAboutResources,
	registerAboutSectionSW,
} from '@/lib/service-worker/sw-registration';
import Image from 'next/image';
import { useConversionTracking } from '@/lib/analytics/conversion-tracking';
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
	const performance = useAboutSectionPerformance();
	const conversionTracker = useConversionTracking('about-section', {
		enableABTesting: false,
		trackScrollMilestones: true,
		trackExitIntent: true,
		trackVideoEngagement: true,
	});
	useEffect(() => {
		if (performance) {
			performance.markMount();
			const animationTimeout = setTimeout(() => {
				performance.markAnimationComplete();
			}, 2000);
			return () => {
				clearTimeout(animationTimeout);
			};
		}
	}, [performance]);
	useEffect(() => {
		if (conversionTracker) {
			conversionTracker.trackEvent('about_section_view', {
				timestamp: Date.now(),
				userAgent: navigator.userAgent.substring(0, 100),
			});
			performance.mark?.('conversion-tracking-initialized');
		}
	}, [conversionTracker, performance]);
	useEffect(() => {
		const initializeServiceWorker = async () => {
			try {
				const registered = await registerAboutSectionSW();
				if (registered) {
					await preloadAboutResources();
					if (performance) {
						performance.monitor?.reportMetric?.('service-worker-initialized', 1);
					}
				}
			} catch (error) {
				console.warn('Service worker initialization failed:', error);
			}
		};
		const registrationTimeout = setTimeout(initializeServiceWorker, 100);
		return () => {
			clearTimeout(registrationTimeout);
		};
	}, [performance]);
	const gridLayoutClasses =
		'grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start lg:grid-rows-1 relative';
	return (
		<section
			id='about'
			className={`py-20 lg:py-28 bg-gradient-to-br from-token-brand-50 to-token-brand-100 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] ${className}`}>
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			<div className='container mx-auto px-12 sm:px-16 lg:px-24 xl:px-32 2xl:px-40'>
				{}
				{}
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
				{}
				<m.div
					className='grid grid-cols-3 gap-6 w-full max-w-6xl mx-auto relative z-10'
					style={{
						marginTop: '55px',
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						gap: '24px',
						alignItems: 'center',
					}}
					initial={{
						opacity: 0,
						y: 30,
					}}
					whileInView={{
						opacity: 1,
						y: 0,
					}}
					viewport={{
						once: true,
						margin: '-100px',
					}}
					transition={{
						duration: 0.6,
						ease: 'easeOut',
						delay: 0.4,
					}}>
					{}
					<m.div
						className='flex justify-center group relative'
						initial={{
							opacity: 0,
							y: 20,
						}}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						viewport={{
							once: true,
						}}
						transition={{
							duration: 0.6,
							delay: 0.5,
							ease: 'easeOut',
						}}
						style={{
							aspectRatio: '1/1',
							background: `
                linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%),
                linear-gradient(45deg, rgba(212,175,55,0.1) 0%, transparent 100%)
              `,
							backdropFilter: 'blur(10px)',
							border: '1px solid rgba(212,175,55,0.3)',
							padding: '20px',
							boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
							fontFamily: "'Helvetica Neue Condensed', sans-serif",
							textTransform: 'uppercase',
							letterSpacing: '1px',
						}}
						whileHover={{
							scale: 1.02,
							y: -2,
							boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
							transition: {
								duration: 0.3,
								ease: 'easeOut',
							},
						}}>
						<img
							src='/images/media/tatler-logo-alt.png'
							alt='Tatler Address Book - Featured Premium Tutoring Service'
							className='h-auto max-w-[156px] object-contain filter group-hover:brightness-110 transition-all duration-300'
						/>
					</m.div>

					{}
					<m.div
						className='flex justify-center group relative'
						initial={{
							opacity: 0,
							y: 20,
						}}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						viewport={{
							once: true,
						}}
						transition={{
							duration: 0.6,
							delay: 0.7,
							ease: 'easeOut',
						}}
						style={{
							aspectRatio: '1/1',
							background: `
                linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%),
                linear-gradient(45deg, rgba(212,175,55,0.1) 0%, transparent 100%)
              `,
							backdropFilter: 'blur(10px)',
							border: '1px solid rgba(212,175,55,0.3)',
							padding: '20px',
							boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
							fontFamily: "'Helvetica Neue Condensed', sans-serif",
							textTransform: 'uppercase',
							letterSpacing: '1px',
						}}
						whileHover={{
							scale: 1.02,
							y: -2,
							boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
							transition: {
								duration: 0.3,
								ease: 'easeOut',
							},
						}}>
						<img
							src='/images/media/schools-guide-uk-logo.png'
							alt='Schools Guide UK - Top Pick for Private Tuition'
							className='h-auto max-w-[156px] object-contain filter group-hover:brightness-110 transition-all duration-300'
						/>
					</m.div>

					{}
					<m.div
						className='flex justify-center items-center group relative'
						initial={{
							opacity: 0,
							y: 20,
						}}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						viewport={{
							once: true,
						}}
						transition={{
							duration: 0.6,
							delay: 0.9,
							ease: 'easeOut',
						}}
						style={{
							aspectRatio: '1/1',
							background: `
                linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%),
                linear-gradient(45deg, rgba(212,175,55,0.1) 0%, transparent 100%)
              `,
							backdropFilter: 'blur(10px)',
							border: '1px solid rgba(212,175,55,0.3)',
							padding: '20px',
							boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
							fontFamily: "'Helvetica Neue Condensed', sans-serif",
							textTransform: 'uppercase',
							letterSpacing: '1px',
						}}
						whileHover={{
							scale: 1.02,
							y: -2,
							boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
							transition: {
								duration: 0.3,
								ease: 'easeOut',
							},
						}}>
						<div className='flex flex-col items-center justify-center text-center'>
							{}
							{}
							{}
							{}
							<m.div
								initial={{
									opacity: 0,
									scale: 0.8,
									y: -10,
								}}
								whileInView={{
									opacity: 1,
									scale: 1,
									y: 0,
								}}
								transition={{
									duration: 0.4,
									delay: 1.0,
									ease: 'easeOut',
								}}
								className='mb-2 relative w-[100px] h-[100px]'>
								<Image
									src='/icons/royal-crown.svg'
									alt='Royal Crown Icon'
									fill
									className='transition-all duration-300 group-hover:scale-110'
								/>
							</m.div>

							<m.p
								className='text-center font-medium text-[#1E3A5F] tracking-tight'
								style={{
									fontSize: '16px',
									fontWeight: '600',
									color: '#1E3A5F',
									lineHeight: '1.4',
								}}
								initial={{
									opacity: 0,
									scale: 0.9,
								}}
								whileInView={{
									opacity: 1,
									scale: 1,
								}}
								transition={{
									duration: 0.4,
									delay: 1.1,
									ease: 'easeOut',
								}}>
								Trusted by Royal Clientele
							</m.p>
						</div>
					</m.div>
				</m.div>
			</div>
		</section>
	);
}
export type { AboutSectionProps };
