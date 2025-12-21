'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { TierDescriptions } from '@/components/sections/tier-descriptions';
import { TutorsSection } from '@/components/tutors/tutors-section';
import {
	AlternatingLayout,
	AlternatingRow,
	AlternatingRowBullets,
	AlternatingRowDescription,
	AlternatingRowHeader,
} from '@/components/ui/alternating-row';
import { TestimonialAuthorRole } from '@/components/testimonials/TestimonialAuthorRole';
import {
	Check,
	ClipboardCheck,
	Heart,
	MessageSquare,
	Target,
	Users,
} from 'lucide-react';
import Image from 'next/image';
import { getHowItWorksContent } from '@/lib/cms/cms-content';

export default function HowItWorksPage() {
	// Get CMS content using the established pattern
	const content = getHowItWorksContent();

	return (
		<PageLayout
			background='white'
			containerSize='full'
			verticalSpacing='none'
			footerProps={{
				showContactForm: true,
			}}
		>
			<section id='how-it-works-hero'>
				<SimpleHero
					backgroundImage="/images/hero/how-it-works.jpeg"
					h1="Your Journey To"
					h1AccentText="Academic Success"
					h2="Outstanding Tuition. Tailored Pairing. Ongoing Guidance."
					decorativeStyle="lines"
				/>
			</section>

			{/* New Alternating Row Components */}
			<AlternatingLayout
				spacing='normal'
				maxWidth='full'
				className='bg-white'
			>
				{/* Row 1: Initial Consultation */}
				<AlternatingRow
					variant='left'
					number={1}
					icon={MessageSquare}
					image={{
						src: '/images/how-it-works/initial-consultation-16-9.jpg',
						alt: "Initial consultation with founder Elizabeth to understand your child's academic profile",
						width: 800,
						height: 600,
						priority: true,
					}}
				>
					<AlternatingRowHeader level={2}>
						Initial Consultation
					</AlternatingRowHeader>
					<AlternatingRowDescription>
						You begin with a one-to-one conversation with our Founder Elizabeth to
						understand your child&apos;s academic profile, personality, and goals.
					</AlternatingRowDescription>
					<AlternatingRowBullets
						variant='icons'
						items={[
							'Subject strengths and areas for development',
							'Upcoming exams or milestones',
							'Preferred learning style',
							'Any school-specific requirements',
						]}
					/>
				</AlternatingRow>

				{/* Row 2: Tiered Tutoring Options */}
				<AlternatingRow
					variant='right'
					number={2}
					icon={Target}
					image={{
						src: '/images/how-it-works/tiered-tutoring-options.jpg',
						alt: 'Flexible tiered tutoring model with options for every budget and academic need',
						width: 800,
						height: 600,
					}}
				>
					<AlternatingRowHeader level={2}>
						Tiered Tutoring Options
					</AlternatingRowHeader>
					<AlternatingRowDescription>
						Whether your child needs general mentoring or specialist preparation, our
						flexible tiered tutoring model allows you to choose the level of support
						that fits your child&apos;s needs and your budget. Specialist tutoring
						begins at just £45 per hour. Unlike many other providers, we don&apos;t
						charge registration or administrative fees—you only pay for your time
						with a carefully matched, dedicated tutor.
					</AlternatingRowDescription>
					<AlternatingRowBullets
						variant='icons'
						items={[
							'Tier 1: Official examiners - Insider tips, tricks and exam technique for top grades',
							'Tier 2: Qualified teachers - Specialist support from seasoned schoolteachers',
							'Tier 3: University graduates - Mentoring from experts in their specific subject',
							'Starting from just £45 per hour',
						]}
					/>
				</AlternatingRow>

				{/* Row 3: Expert Tutor Matching */}
				<AlternatingRow
					variant='left'
					number={3}
					icon={Users}
					image={{
						src: '/images/how-it-works/expert-tutor-matching.jpg',
						alt: 'Expert tutor matching process pairing students with qualified professionals',
						width: 800,
						height: 600,
					}}
				>
					<AlternatingRowHeader level={2}>
						Expert Tutor Matching
					</AlternatingRowHeader>
					<AlternatingRowDescription>
						Elizabeth worked alongside the majority of our tutors as colleagues
						during her international career. The rest come to us via personal
						recommendations from our trusted team, selecting only those with an
						outstanding educational pedigree, impressive tutoring background and
						passion for nurturing young minds. She brings this deep personal
						knowledge to every match, pairing students with not only a perfectly
						qualified tutor, but also a personality they will resonate well with.
					</AlternatingRowDescription>
					<AlternatingRowBullets
						variant='icons'
						items={[
							'Oxbridge alumni',
							'Heads of Department at top 10 UK schools',
							'Accredited GCSE, A Level and IB examiners',
							'PhD and Postdocs',
						]}
					/>
				</AlternatingRow>

				{/* Row 4: Progress Reports & Support */}
				<AlternatingRow
					variant='right'
					number={4}
					icon={ClipboardCheck}
					image={{
						src: '/images/how-it-works/progress-reports-support.jpg',
						alt: 'Comprehensive progress reports and automated lesson reminders for ongoing support',
						width: 800,
						height: 600,
					}}
				>
					<AlternatingRowHeader level={2}>
						Progress Reports & Support
					</AlternatingRowHeader>
					<AlternatingRowDescription>
						To ensure meaningful progress, your tutor submits a detailed report after
						every lesson—including what was covered, homework assigned, and clear
						feedback on your child&apos;s strengths and areas for development. Each
						report combines quantitative ratings with qualitative insights, giving
						you a well-rounded view of your child&apos;s performance. Reports are
						automatically emailed and available at any time via your secure login.
						You&apos;ll also receive automated lesson reminders 36 hours before each
						session, keeping everything running smoothly with minimal effort on your
						part.
					</AlternatingRowDescription>
					<AlternatingRowBullets
						variant='icons'
						items={[
							'What was covered and homework assigned',
							'Clear feedback on strengths and development areas',
							'Automated lesson reminders 36 hours before sessions',
							'Secure login access to all reports',
						]}
					/>
				</AlternatingRow>

				{/* Row 5: Ongoing Support & Educational Partnership */}
				<AlternatingRow
					variant='left'
					number={5}
					icon={Heart}
					image={{
						src: '/images/how-it-works/ongoing-support-partnership.avif',
						alt: 'Long-term educational partnership providing ongoing consultative support',
						width: 800,
						height: 600,
					}}
				>
					<AlternatingRowHeader level={2}>
						Ongoing Support & Educational Partnership
					</AlternatingRowHeader>
					<AlternatingRowDescription>
						At My Private Tutor Online, our commitment doesn&apos;t end with a
						successful tutor match—it begins there. We offer ongoing consultative
						support to ensure your child continues to thrive. Our highly responsive
						team is always available to assist, whether it&apos;s rescheduling a
						session or tweaking lesson focus in light of a school report or
						parents&apos; evening feedback. We work closely with you to ensure each
						tutorial remains purposeful and aligned with your child&apos;s evolving
						needs.
					</AlternatingRowDescription>
					<AlternatingRowBullets
						variant='icons'
						items={[
							'Ongoing consultative support throughout your journey',
							'Highly responsive team always available to assist',
							'Flexible lesson adjustments based on school feedback',
							'Long-term educational partnership from early years to university',
						]}
					/>
				</AlternatingRow>
			</AlternatingLayout>

			<section
				id='journey-quote'
				className='bg-primary-50'
			>
				<div className='[&>section]:py-10 sm:[&>section]:py-12 md:[&>section]:py-16'>
					<TestimonialAuthorRole
						quote="At My Private Tutor Online, we offer more than just tutoring—we provide thoughtful, expert advice at every stage of your child's academic journey. Our service is consultative, personal, and bespoke to your family's individual needs."
						author={{
							name: 'Elizabeth Burrows',
							role: 'Founder',
							avatar: {
								src: '/images/team/elizabeth-burrows-founder-main.jpg',
								alt: 'Elizabeth Burrows - Founder',
							},
						}}
					/>
				</div>
			</section>

			<section id='how-it-works-tutors'>
				<TutorsSection
					data={content.tutorProfilesSection}
					showFeaturedOnly={false}
					showViewAllButton={true}
					className='bg-white'
				/>
			</section>

			<section id='how-it-works-tutoring-tiers'>
				<TierDescriptions
					title='Choose Your Bespoke Tutoring Experience'
					subtitle="Whether you're seeking essential academic mentoring or the insight of a specialist examiner, find the level of guidance that feels right for your child and your family."
					showExpandable={true}
				/>

				<div className='relative bg-white pb-12'>
					<div className='text-center'>
						<div className='rounded-2xl p-8 max-w-2xl mx-auto'>
							<p className='mb-6'>
								Bespoke 1-2-1 tutoring starts from just{' '}
								<span className='text-accent-700 bg-accent-50 px-2 py-1 rounded-lg'>
									{content.pricing.baseRate.display} per hour
								</span>
							</p>
							<p>{content.pricing.promotional.feeDisclaimer}</p>
						</div>
					</div>
				</div>
			</section>

			<section
				id='how-it-works-benefits'
				className='relative bg-white py-20 lg:py-32 overflow-hidden'
			>
				<div className='absolute inset-0 opacity-[0.015] pointer-events-none' />

				<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl'>
					<div className='text-center mb-16 lg:mb-20'>
						<h2 className='mb-8'>Why Families Choose Our Approach</h2>

						<p className='max-w-4xl mx-auto'>
							Discover what sets My Private Tutor Online apart as the trusted choice
							of families across the world.
						</p>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20 items-stretch'>
						<div className='relative rounded-none overflow-hidden shadow-lg flex-1'>
							<div className='relative h-full'>
								<Image
									src='/images/how-it-works/why-families-choose-our-approach.jpg'
									alt='Why families choose our premium tutoring approach - professional educational consultation'
									fill
									className='object-cover'
									sizes='(max-width: 768px) 100vw, 50vw'
								/>
							</div>
						</div>

						<div className='space-y-6'>
							{content.pageSpecificBenefits?.map((benefit: string, index: number) => (
								<div
									key={index}
									className='flex items-start gap-4 group'
								>
									<div className='flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center duration-300 mt-1'>
										<Check className='w-5 h-5 text-primary-700' />
									</div>

									<div className='flex-1'>
										<p className='transition-colors duration-300'>{benefit}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</PageLayout>
	);
}