'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { HeadingText, TitleText, BodyText, CaptionText } from '@/components/ui/typography';
import { useState } from 'react';
import type { JSX } from 'react';

// ============================================================================
// TIER DESCRIPTIONS COMPONENT - REUSABLE ACROSS PAGES
// ============================================================================

// Type definition for tutor tier data
interface TutorTier {
	readonly tier: string;
	readonly subtitle: string;
	readonly description: string | JSX.Element;
	readonly bestFor: string;
	readonly pricePoint: string;
	readonly level: string;
	readonly colour: string;
	readonly hasCrown?: boolean;
}

// Tutor tiers content - centralised data source
const TUTOR_TIERS: readonly TutorTier[] = [
	{
		tier: 'Tier 2',
		subtitle: 'Qualified Teachers with a Results-Focused Approach',
		description: (
			<>
				Our Tier Two tutors are qualified teachers with{' '}
				<strong>years of classroom experience</strong> and a{' '}
				<strong>proven record of raising attainment</strong>. Some also bring
				valuable leadership expertise from roles on Senior Leadership Teams and as
				internal moderators—overseeing marking standards across their departments.
				<br />
				<br />
				Their professional training means they are{' '}
				<strong>fluent in a range of pedagogical approaches</strong> and highly
				skilled at adapting to different learning styles and needs. They know how to
				<strong>pinpoint precisely where marks are being lost</strong> and provide
				expert, targeted guidance to close those gaps.
				<br />
				<br />
				With Tier Two tutors, you're investing in seasoned educators who know what
				works from countless hours in the classroom—and who deliver consistent,
				measurable progress. Whether your child is preparing for exams or entrance
				assessments, Tier Two tutors combine deep expertise with a track record of
				proven results.
			</>
		) as JSX.Element,
		bestFor: 'Curriculum mastery, consistency',
		pricePoint: 'From £65/hour',
		level: 'mid',
		colour: 'silver',
	},
	{
		tier: 'Tier 1',
		subtitle: 'The Elite Choice for Exceptional Results',
		description: (
			<>
				Our Tier One tutors are our &apos;super tutors&apos;—experienced educators
				with a <strong>decade or more</strong> in the classroom, many with 30+
				years&apos; expertise and Senior Leadership Team responsibilities.
				<br />
				<br /> What truly sets them apart? Every Tier One tutor is an{' '}
				<strong>official examiner</strong>. They mark and/or grade papers for real
				summer and winter exams. This means they know exactly how examiners think,
				what scorers are looking for, and precisely how to hit every point on the
				mark scheme.
				<br />
				<br />
				<strong>
					Your child doesn&apos;t just learn the content—they learn how to
					demonstrate mastery in exactly the way examiners reward
				</strong>
				. Tier One tutors excel at diagnosing weaknesses, refining exam technique,
				and delivering transformational results: from U grades to C+ in a single
				month, and entrance exam scores in the top 2% of candidates. When you choose
				Tier One, you&apos;re investing in tutors who understand the exam arena from
				the inside out.
			</>
		) as JSX.Element,
		bestFor: 'Top grades, exam strategy',
		pricePoint: 'From £85/hour',
		level: 'premium',
		colour: 'gold',
		hasCrown: true,
	},
	{
		tier: 'Tier 3',
		subtitle: 'Relatable Role Models with Specialist Subject Knowledge',
		description: (
			<>
				Our Tier Three tutors are subject specialists who combine strong academic
				knowledge with an approachable, engaging teaching style. Studying at or
				having graduated from top universities (including Oxbridge), these tutors
				work closely with students to strengthen understanding, build confidence,
				and improve performance.
				<br />
				While they may not hold formal teaching qualifications, Tier Three tutors
				bring valuable experience in one-to-one tuition and an infectious passion
				for their subjects. Many are in their first decade out of education
				themselves, which can help foster a natural rapport with tutees and a
				positive, motivating learning dynamic.
				<br />
				With Tier Three tutors, your child benefits from knowledgeable, relatable
				educators who inspire curiosity and encourage steady academic progress.
			</>
		) as JSX.Element,
		bestFor: 'Mentoring, subject confidence',
		pricePoint: 'From £45/hour',
		level: 'standard',
		colour: 'bronze',
	},
] as const;

// Component props interface
interface TierDescriptionsProps {
	readonly title?: string;
	readonly subtitle?: string;
	readonly showExpandable?: boolean;
	readonly className?: string;

/**
 * TierDescriptions Component
 *
 * Reusable component for displaying tutor tier information across multiple pages.
 * Features expandable cards on How It Works page and simplified view for Meet the Team.
 *
 * @param title - Optional custom title (defaults to "Our Three Tutor Tiers")
 * @param subtitle - Optional custom subtitle
 * @param showExpandable - Whether to show expandable tier cards (default: true)
 * @param className - Additional CSS classes
 */
export function TierDescriptions({
	title = "Our Three Tutor Tiers",
	subtitle = "Transparent pricing with clear tier distinctions",
	showExpandable = true,
	className = ""
}: TierDescriptionsProps) {
	// State for expandable cards (only used when showExpandable is true)
	const [expandedCards, setExpandedCards] = useState<Record<number, boolean>({});

	// Sort tiers: Tier 1 (Premium), Tier 2 (Mid), Tier 3 (Standard)
	const sortedTiers = [...TUTOR_TIERS].sort((a, b) => {
		const tierOrder = { 'Tier 1': 1, 'Tier 2': 2, 'Tier 3': 3 };
		return (
			tierOrder[a.tier as keyof typeof tierOrder] -
			tierOrder[b.tier as keyof typeof tierOrder]
		);
	});

	if (showExpandable) {
		// Expandable version for How It Works page
		return (
			<section className={`relative bg-white py-20 lg:py-32 ${className}`}>
				<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl'>
					<div className='text-center mb-16 lg:mb-20'>
						<HeadingText variant="primary" level={2} alignment="center" className="mb-8">{title}</HeadingText>
						<div className='flex items-center justify-center gap-4 mb-8'>
							<div className='w-24 h-1 bg-accent-500 mx-auto'></div>
						</div>
						<BodyText variant="large" alignment="center" className="max-w-4xl mx-auto">{subtitle}</BodyText>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{sortedTiers.map((tier: TutorTier, index: number) => {
							const isExpanded = expandedCards[index] || false;

							return (
								<div
									key={index}
									className='relative'
									viewport={{
										once: true,
										margin: '-100px',
									<div
											height: isExpanded ? 'auto' : undefined,
										className={
											isExpanded ? '' : 'aspect-square overflow-hidden'
										}>
										<Card className='bg-white border-2 border-neutral-300 hover:border-accent-500/40 shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-none flex flex-col relative'>
											{!isExpanded ? (
												<div className='flex flex-col h-full px-6 lg:px-8 py-8 text-center relative'>
													{/* Tier Name */}
													<TitleText variant="large" level={3} alignment="center" className="mb-4">{tier.tier}</TitleText>

													{/* Tier Subtitle */}
													<BodyText variant="default" alignment="center" className="mb-6">{tier.subtitle}</BodyText>

													{/* Grey Line Separator */}
													<Separator className='mb-6 bg-neutral-300 w-full' />

													{/* Hourly Rate */}
													<div className='mb-6 text-lg font-semibold'>
														{tier.pricePoint}
													</div>

													{/* Description Preview with Gradient Overlay */}
													<div className='relative flex-1 mb-20'>
														<div className='text-left text-sm leading-relaxed line-clamp-6 space-y-4'>
															{typeof tier.description === 'string'
																? tier.description
																: tier.description}
														</div>

														{/* Gradient Overlay - covers bottom third only */}
														<div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-white/95 to-white pointer-events-none' />
													</div>

													{/* Learn More Button - positioned at bottom of card */}
													<button
														onClick={() =>
															setExpandedCards((prev) => ({
																...prev,
																[index]: true,
															}))
														className='absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-6 py-2 bg-primary-700 text-white hover:bg-primary-800 transition-colors duration-300 text-sm font-medium rounded'
														aria-label={`Learn more about ${tier.tier}`}>
														Learn More
													</button>
												</div>
											) : (
												<>
													<CardHeader className='text-center pb-6 pt-8 px-6 lg:px-8 flex-shrink-0'>
														<TitleText variant="large" level={3} alignment="center" className="mb-4">{tier.tier}</TitleText>

														{/* Tier Subtitle - preserved in expanded state */}
														<BodyText variant="default" alignment="center" className="mb-4">{tier.subtitle}</BodyText>

														<Separator className='my-4 bg-neutral-300' />

														<div className='mb-2'>{tier.pricePoint}</div>
													</CardHeader>

													<CardContent className='text-center px-6 lg:px-8 pb-4 lg:pb-4 flex-1 flex flex-col relative'>
														<div className='mb-4 flex-1 text-left'>
															<div className='text-sm leading-relaxed space-y-4'>{tier.description}</div>
														</div>

														<Separator className='my-4 bg-neutral-300' />

														<div className='text-center'>
															<CaptionText variant="large" alignment="center" className="mb-3 font-semibold">Best For:</CaptionText>
															<BodyText variant="default" alignment="center">{tier.bestFor}</BodyText>
														</div>
													</CardContent>
												</>
											)}
										</Card>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		);

	// Simplified version for Meet the Team page
	return (
		<section className={`relative bg-neutral-50 py-16 lg:py-20 ${className}`}>
			<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl'>
				<div className='text-center mb-12 lg:mb-16'>
					<HeadingText variant="primary" level={2} alignment="center" className="mb-6">{title}</HeadingText>
					<div className='flex items-center justify-center gap-4 mb-6'>
						<div className='w-24 h-1 bg-accent-500 mx-auto'></div>
					</div>
					<BodyText variant="large" alignment="center" className="max-w-4xl mx-auto">{subtitle}</BodyText>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
					{sortedTiers.map((tier: TutorTier, index: number) => (
						<div
							key={index}
							className='relative'
							viewport={{
								once: true,
								margin: '-50px',
							<Card className='bg-white border border-neutral-200 shadow-md hover:shadow-lg transition-all duration-300 h-full'>
								<CardHeader className='text-center pb-4'>
									<TitleText variant="large" level={3} alignment="center" className="mb-2 text-primary-700">{tier.tier}</TitleText>
									<BodyText variant="small" alignment="center" className="text-neutral-600 mb-3">{tier.subtitle}</BodyText>
									<Separator className='bg-neutral-200' />
									<div className='mt-3 text-lg font-semibold text-accent-600'>
										{tier.pricePoint}
									</div>
								</CardHeader>

								<CardContent className='pt-0 px-6 pb-6'>
									<div className='mb-4'>
										<div className='text-sm leading-relaxed text-neutral-700'>
											{typeof tier.description === 'string' ? (
												<p>{tier.description}</p>
											) : (
												<div className='space-y-3'>{tier.description}</div>
											)}
										</div>
									</div>

									<Separator className='my-4 bg-neutral-200' />

									<div className='text-center'>
										<CaptionText variant="default" alignment="center" className="font-semibold text-primary-700 mb-2">Best For:</CaptionText>
										<CaptionText variant="default" alignment="center" className="text-neutral-600">{tier.bestFor}</CaptionText>
									</div>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</div>
		</section>
	);

// Export the tier data for use in other components if needed
;
;