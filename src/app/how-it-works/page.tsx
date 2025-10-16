'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { m } from 'framer-motion';
import {
	CheckCircle,
	ClipboardCheck,
	MessageSquare,
	Target,
	Users,
} from 'lucide-react';
import Image from 'next/image';
import { TutorsSection } from '@/components/tutors/tutors-section';
import {
	getBaseRate,
	getHowItWorksBenefits,
	getHowItWorksHero,
	getHowItWorksSteps,
	getPromotionalPricing,
	getTutorProfilesSection,
	getTutorTiers,
	type HowItWorksStep,
	type TutorTier,
} from '@/lib/cms/cms-content';
import { HERO_IMAGES } from '@/lib/cms/cms-images';
const iconMap = {
	MessageSquare,
	Users,
	Target,
	ClipboardCheck,
} as const;
const convertMarkdownBold = (text: string): React.ReactNode => {
	const parts = text.split(/(\*\*.*?\*\*)/g);
	return parts
		.map((part, index) => {
			if (part.startsWith('**') && part.endsWith('**')) {
				const boldText = part.slice(2, -2);
				return <strong key={index}>{boldText}</strong>;
			}
			return part || null;
		})
		.filter(Boolean);
};
export default function HowItWorksPage() {
	const heroContent = getHowItWorksHero();
	const processSteps = getHowItWorksSteps();
	const tutorTiers = getTutorTiers();
	const benefits = getHowItWorksBenefits();
	const baseRate = getBaseRate();
	const promotionalPricing = getPromotionalPricing();
	const tutorProfilesSection = getTutorProfilesSection();
	const heroBackgroundImage =
		HERO_IMAGES[heroContent.backgroundImageKey as keyof typeof HERO_IMAGES];
	return (
		<>
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			{}
			<section id='how-it-works-hero'>
				<SimpleHero
					backgroundImage='/images/hero/hero-how-it-works.jpeg'
					h1='Your Journey To Academic Success'
					h2='Outstanding Tuition. Tailored Pairing. Ongoing Guidance.'
					decorativeStyle='lines'
					textVerticalOffset='much-lower'
				/>
			</section>

			{}
			{}
			{}
			{}
			{}
			{}
			<PageLayout
				background='white'
				containerSize='full'
				verticalSpacing='none'
				footerProps={{
					showNewsletter: false,
					showContactForm: true,
				}}>
				{}
				{}

				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				<section
					id='how-it-works-process-steps'
					className='relative bg-white pt-12 lg:pt-16 pb-20 lg:pb-32'>
					{}
					{}

					{}
					{}
					{}
					<div className='relative container mx-auto px-4 sm:px-6 lg:px-8'>
						{}
						{}
						{}
						<div className='text-center mb-4'>
							<h2>Your Journey To Academic Success</h2>
						</div>

						<section
							id='journey-quote'
							className='py-8 lg:py-12'>
							{}
							{}
							{}
							<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center'>
								<blockquote>
									&quot;At My Private Tutor Online, we offer more than just tutoring—we
									provide thoughtful, expert advice at every stage of your child&apos;s
									academic journey. Our service is consultative, personal, and{' '}
									<strong>bespoke to your family&apos;s individual needs</strong>.&quot;
								</blockquote>
								<cite className='block mt-4 not-italic'>- My Private Tutor Online</cite>
							</div>
						</section>

						<div className='relative w-full'>
							<div className='space-y-0'>
								{processSteps && processSteps.length > 0 ?
									processSteps.map((step: HowItWorksStep, index: number) => {
										const IconComponent = iconMap[step.icon as keyof typeof iconMap];
										const isEven = index % 2 === 0;
										return (
											<m.div
												key={index}
												initial={{
													opacity: 0,
													x: isEven ? -30 : 30,
												}}
												whileInView={{
													opacity: 1,
													x: 0,
												}}
												viewport={{
													once: true,
													margin: '-50px',
												}}
												transition={{
													duration: 0.8,
													delay: index * 0.1,
												}}
												className='w-full'>
												{}
												<div className='grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-fr gap-0 items-stretch'>
													{}
													<div
														className={`relative w-full ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
														<div className='relative w-full aspect-[17/9] lg:aspect-auto'>
															<Image
																src={step.image}
																alt={`${step.title} - Step ${step.number}`}
																fill
																className='object-cover w-full h-full'
																sizes='(max-width: 768px) 100vw, 50vw'
															/>
														</div>
													</div>

													{}
													{}
													{}
													{}
													<div
														className={`bg-white flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-20 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
														<div
															className={`${isEven ? 'border-l-4 pl-8' : 'border-r-4 pr-8'} border-primary-700'`}>
															{}
															<div className='flex items-start gap-4 mb-6'>
																<div className='flex-shrink-0 w-12 h-12 bg-primary-700 flex items-center justify-center shadow-md'>
																	<span className='text-white'>{step.number}</span>
																</div>

																<div className='flex-1'>
																	<div className='flex items-center gap-2 mb-2'>
																		<IconComponent className='w-5 h-5 text-accent-600' />
																		<h3>{step.title}</h3>
																	</div>
																</div>
															</div>

															{}
															{}
															{}
															<div className='mb-6'>
																{step.description.split('\n').map(
																	(paragraph, pIndex) =>
																		paragraph.trim() && (
																			<p
																				key={pIndex}
																				className={pIndex > 0 ? 'mt-4' : ''}>
																				{convertMarkdownBold(paragraph.trim())}
																			</p>
																		),
																)}
															</div>

															{}
															<ul className='space-y-3'>
																{step.features.map((feature: string, featureIndex: number) => (
																	<li
																		key={featureIndex}
																		className='flex items-start gap-3'>
																		<div className='flex-shrink-0 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center mt-0.5'>
																			<CheckCircle className='w-3 h-3 text-white' />
																		</div>
																		<span>{convertMarkdownBold(feature)}</span>
																	</li>
																))}
															</ul>
														</div>
													</div>
												</div>
											</m.div>
										);
									})
								:	<div className='text-center py-12'>
										<p>Process steps are currently being loaded...</p>
									</div>
								}
							</div>
						</div>
					</div>
				</section>

				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				<section id='how-it-works-tutors'>
					<TutorsSection
						data={tutorProfilesSection}
						showFeaturedOnly={false}
						showViewAllButton={true}
					/>
				</section>

				{}
				{}
				{}

				{}
				{}
				{}
				{}
				{}
				{}
				{}
				<section
					id='how-it-works-tutoring-tiers'
					className='relative bg-white py-20 lg:py-32 overflow-hidden'>
					{}
					{}

					{}
					<div className='absolute inset-0 opacity-[0.015] pointer-events-none' />

					{}
					{}
					<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl'>
						{}
						{}
						{}
						{}
						<div className='text-center mb-16 lg:mb-20'>
							{}
							{}
							{}
							<div className='flex items-center justify-center gap-3 mb-6'>
								<span className='text-accent-700 tracking-widest uppercase'>
									Tiered Excellence
								</span>
							</div>

							<h2 className='mb-8'>Choose Your Unique Tutoring Experience</h2>

							{}
							{}
							<div className='flex items-center justify-center gap-4 mb-8'>
								<div className='w-24 h-1 bg-accent-500 mx-auto'></div>
							</div>

							<p className='max-w-4xl mx-auto'>
								From essential academic support to premium elite guidance—discover the
								service level that perfectly matches your family's aspirations and your
								child's potential
							</p>
						</div>

						{}
						{}
						<div className='relative'>
							{}
							{}
							{}
							{}
							<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch'>
								{tutorTiers && tutorTiers.length > 0 ?
									tutorTiers
										.sort((a, b) => {
											const tierOrder = {
												'Tier 3': 0,
												'Tier 2': 1,
												'Tier 1': 2,
											};
											return (
												tierOrder[a.tier as keyof typeof tierOrder] -
												tierOrder[b.tier as keyof typeof tierOrder]
											);
										})
										.map((tier: TutorTier, index: number) => {
											return (
												<m.div
													key={index}
													className='relative'
													initial={{
														opacity: 0,
														y: 40,
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
														duration: 0.8,
														delay: index * 0.1,
													}}>
													{}
													{}
													{}
													<Card className='bg-white border-2 border-neutral-300 hover:border-accent-500/40 shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-none'>
														<CardHeader className='text-center pb-6 pt-8 px-6 lg:px-8'>
															{}
															{}
															{}
															<h3 className='mb-4'>{tier.tier}</h3>

															{}
															{}
															{}
															<Separator className='my-4 bg-neutral-300' />

															{}
															{}
															{}
															<div className='mb-2'>{tier.pricePoint}</div>
														</CardHeader>

														<CardContent className='text-center px-6 lg:px-8 pb-6 lg:pb-8'>
															{}
															{}
															{}
															<p className='mb-4'>{tier.description}</p>

															{}
															{}
															{}
															<Separator className='my-4 bg-neutral-300' />

															<p className='mb-3'>Best For:</p>
															<p>{tier.bestFor}</p>
														</CardContent>
													</Card>
												</m.div>
											);
										})
								:	<div className='text-center py-12'>
										<p>Tutoring tiers are currently being loaded...</p>
									</div>
								}
							</div>
						</div>

						{}
						{}
						{}
						{}
						{}
						<div className='text-center mt-12'>
							<div className='rounded-2xl p-8 max-w-2xl mx-auto'>
								<p className='mb-6'>
									Bespoke 1-2-1 tutoring starts from just{' '}
									<span className='text-accent-700 bg-accent-50 px-2 py-1 rounded-lg'>
										{baseRate.display} per hour
									</span>
								</p>
								<p>{promotionalPricing.feeDisclaimer}</p>
							</div>
						</div>
					</div>
				</section>

				{}
				{}
				{}
				{}
				{}
				<section
					id='how-it-works-benefits'
					className='relative bg-white py-20 lg:py-32 overflow-hidden'>
					{}
					{}

					{}
					<div className='absolute inset-0 opacity-[0.015] pointer-events-none' />

					{}
					{}
					<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl'>
						{}
						{}
						{}
						{}
						<div className='text-center mb-16 lg:mb-20'>
							{}
							{}

							<h2 className='mb-8'>Why Families Choose Our Approach</h2>

							{}
							{}
							<div className='flex items-center justify-center gap-4 mb-8'>
								<div className='w-24 h-1 bg-accent-500 mx-auto'></div>
							</div>

							<p className='max-w-4xl mx-auto'>
								Discover what sets My Private Tutor Online apart as the trusted choice
								of families across the world.
							</p>
						</div>

						{}
						{}
						{}
						{}
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20 items-stretch'>
							{}
							{}
							{}
							<m.div
								className='relative rounded-none overflow-hidden shadow-lg flex-1'
								initial={{
									opacity: 0,
									x: -30,
								}}
								whileInView={{
									opacity: 1,
									x: 0,
								}}
								viewport={{
									once: true,
									margin: '-50px',
								}}
								transition={{
									duration: 0.8,
									ease: [0.25, 0.1, 0.25, 1],
								}}>
								{}
								{}
								<div className='relative h-full'>
									<Image
										src='/images/graphics/feature-why-families-choose-approach.jpg'
										alt='Why families choose our premium tutoring approach - professional educational consultation'
										fill
										className='object-cover'
										sizes='(max-width: 768px) 100vw, 50vw'
									/>
								</div>
							</m.div>

							{}
							<m.div
								initial={{
									opacity: 0,
									x: 30,
								}}
								whileInView={{
									opacity: 1,
									x: 0,
								}}
								viewport={{
									once: true,
									margin: '-50px',
								}}
								transition={{
									duration: 0.8,
									delay: 0.2,
									ease: [0.25, 0.1, 0.25, 1],
								}}>
								<div className='space-y-6'>
									{benefits && benefits.length > 0 ?
										benefits.map((benefit: string, index: number) => (
											<m.div
												key={index}
												className='flex items-start gap-4 group'
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
													margin: '-50px',
												}}
												transition={{
													duration: 0.6,
													delay: 0.4 + index * 0.1,
													ease: [0.25, 0.1, 0.25, 1],
												}}>
												{}
												{}
												{}
												<div className='flex-shrink-0 w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center shadow-md transition-shadow duration-300 mt-1'>
													<CheckCircle className='w-5 h-5 text-white' />
												</div>

												{}
												{}
												{}
												<div className='flex-1'>
													<p className='transition-colors duration-300'>{benefit}</p>
												</div>
											</m.div>
										))
									:	<div className='text-center py-12'>
											<p>Benefits are currently being loaded...</p>
										</div>
									}
								</div>
							</m.div>
						</div>

						{}
						{}
					</div>
				</section>
			</PageLayout>
		</>
	);
}
