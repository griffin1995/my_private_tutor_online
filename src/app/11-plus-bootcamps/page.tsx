'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { FirstLessonSection } from '@/components/sections/about/FirstLessonSection';
import { ScrollingSchools } from '@/components/sections/scrolling-schools';
import { Button } from '@/components/ui/button';
import { BootcampVideoSectionVersion } from '@/components/video/BootcampVideoSectionVersion';
import { VideoPopup } from '@/components/video/video-popup';
import { useState } from 'react';

// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR 11+ BOOTCAMPS PAGE
// ============================================================================

// Bootcamp programme details
const bootcampProgrammes = [
	{
		title: 'Intensive 11+ Preparation',
		duration: '5 Days',
		format: 'In-Person & Online',
		groupSize: 'Max 8 students',
		description:
			'Comprehensive preparation covering all 11+ subjects with expert tutors',
		features: [
			'Mathematics problem-solving techniques',
			'English comprehension and creative writing',
			'Verbal and non-verbal reasoning',
			'Mock examinations with detailed feedback',
			'Confidence building and exam technique',
		],
		price: '£750',
		dates: [
			'Half Term: 17-21 February 2025',
			'Easter: 7-11 April 2025',
			'Summer: 28 July - 1 August 2025',
		],
	},
	{
		title: 'Elite School Focus',
		duration: '3 Days',
		format: 'In-Person Only',
		groupSize: 'Max 6 students',
		description:
			"Targeted preparation for top-tier independent schools (Eton, Westminster, St Paul's)",
		features: [
			'School-specific paper analysis',
			'Advanced problem-solving strategies',
			'Interview preparation and technique',
			'Past paper practice with time management',
			'Individual feedback sessions',
		],
		price: '£550',
		dates: ['February: 24-26 February 2025', 'May: 26-28 May 2025'],
	},
	{
		title: 'Last-Minute Intensive',
		duration: '2 Days',
		format: 'In-Person & Online',
		groupSize: 'Max 10 students',
		description:
			'Final preparation and confidence boost before examination period',
		features: [
			'Exam technique refinement',
			'Stress management strategies',
			'Quick revision of key concepts',
			'Final practice papers',
			'Parent guidance session included',
		],
		price: '£350',
		dates: ['Pre-Exam: 6-7 September 2025', 'Final Push: 4-5 January 2026'],
	},
];

// Success statistics
const successStats = [
	{
		number: '95%',
		label: 'Success Rate',
		description:
			'of candidates receive offers from at least one of their top choices',
	},
	{
		number: '15+',
		label: 'Years Experience',
		description: 'delivering intensive 11+ preparation programmes',
	},
	{
		number: '500+',
		label: 'Students Prepared',
		description: 'successfully guided through 11+ examinations',
	},
	{
		number: 'Top 10',
		label: 'School Placements',
		description: 'consistent placements at prestigious independent schools',
	},
];

// Schools list (all schools and universities)
const ALL_SCHOOLS: readonly string[] = [
	'Eton College',
	'Westminster School',
	"St Paul's School",
	'Harrow School',
	'Oxford University',
	'Cambridge University',
	'London School of Economics',
	"King's College London",
	'Brighton College',
	'Durham University',
	'University of Edinburgh',
	'Harvard University',
	'Highgate School',
	'Le Rosey School',
	'University of St Andrews',
	'University of Warwick',
	'Henrietta Barnett School',
	'Latymer School',
	"Queen Elizabeth's School",
	'Tiffin School',
] as const;

// Filter function to remove universities and keep only schools
const filterSchoolsOnly = (schools: readonly string[]): readonly string[] => {
	return schools.filter((school: string) => {
		const schoolLower = school.toLowerCase();
		const universityKeywords = [
			'university',
			'college london',
			'school of economics',
			'harvard',
			'lse',
		];
		const isUniversity = universityKeywords.some((keyword: string) =>
			schoolLower.includes(keyword),
		);
		return !isUniversity;
	});
};

// Filtered schools (excludes universities)
const FILTERED_SCHOOLS = filterSchoolsOnly(ALL_SCHOOLS);

export default function ElevenPlusBootcampsPage() {
	const [isVideoOpen, setIsVideoOpen] = useState(false);
	const isSeasonActive = true;

	if (!isSeasonActive) {
		return (
			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}>
				<section className='py-24'>
					<div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						{}
						{}
						<h1 className='mb-4'>11+ Bootcamps</h1>
						{}
						{}
						{}
						<p className='text-primary-700 mb-8'>
							Our intensive 11+ preparation bootcamps will return for the 2025 season.
							Please check back later or contact us for more information.
						</p>
						{}
						{}
						<Button
							size='lg'
							onClick={() => {
								const updatesText = `Hello, I'd like to be notified when your 11+ Bootcamp programmes become available again. Please add me to your updates list and send me information about upcoming dates.`;
								const encodedText = encodeURIComponent(updatesText);
								const updatesUrl = `https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~?subject=${encodeURIComponent('11+ Bootcamp Updates Request')}&message=${encodedText}`;
								window.open(updatesUrl, '_blank', 'noopener,noreferrer');
							}}
							aria-label='Contact us for bootcamp updates - opens enquiry form in new window'>
							Contact Us for Updates
						</Button>
					</div>
				</section>
			</PageLayout>
		);
	}

	return (
		<>
			{}
			{}
			{}
			{}
			<section id='bootcamps-hero'>
				{}
				{}
				<SimpleHero
					backgroundImage='/images/hero/hero-11-plus-bootcamp.jpeg'
					h1={
				<span className='text-white'>
					11+ <span className='text-accent-600'>Bootcamps</span>
				</span>
			}
					h2="Accelerated preparation programmes designed to maximise your child's potential"
					decorativeStyle='lines'
				/>
			</section>

			{}
			{}
			{}
			{}
			<section id='bootcamps-schools'>
				{}
				{}
				{}
				{}
				{}
				{}
				<ScrollingSchools
					schools={[...FILTERED_SCHOOLS]}
					className='py-0.5'
				/>
			</section>

			{}
			{}
			<section
				id='bootcamps-tagline'
				className='bg-white'
				aria-labelledby='tagline-heading'>
				{}
				{}
				<header className='relative text-center flex items-center justify-center'>
					<div className='flex flex-col items-center justify-center h-full'>
						<div className='relative z-10 px-4'>
							{}
							{}
							{}
							{}
							{}
							<h2
								id='tagline-heading'
								className='tracking-wide dark:text-white'>
								We help students place at top 10 UK schools and universities
							</h2>
						</div>
						{}
						{}
						{}
						<div
							className='flex justify-center items-center space-x-6'
							role='presentation'
							aria-hidden='true'>
							<div className='w-12 h-px bg-neutral-300 dark:bg-neutral-600' />
							<div className='relative'>
								<div className='w-3 h-3 rounded-full bg-neutral-400 dark:bg-neutral-500 shadow-lg' />
							</div>
							<div className='w-12 h-px bg-neutral-300 dark:bg-neutral-600' />
						</div>
					</div>
				</header>
			</section>

			{}
			{}
			{}
			{}
			{}
			{}
			<section
				id='bootcamps-mission'
				className='mt-16'>
				<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center'>
					{}
					{}
					{}
					<blockquote className='italic'>
						&quot;Discover our comprehensive preparation programmes designed for
						different learning needs and timelines. Choose the perfect fit for your
						child&apos;s 11+ journey.&quot;
					</blockquote>
				</div>
			</section>

			{}
			{}
			{}
			<section
				id='bootcamps-pre-video-text-section'
				className='py-16 bg-white'>
				{}
				{}
				<FirstLessonSection
					heading='Examiner-led 11+ Preparation Programmes'
					paragraph='Our bootcamp programmes are specifically designed for students at different stages of their 11+ journey. Whether your child is just beginning their preparation (Years 3 and 4) or needs focused intensive support before examinations (Years 5 and 6), our courses provide the <strong>comprehensive foundation and advanced techniques needed for independent and grammar school success</strong>. Crucially, <strong>our bootcamps are designed and led by 11+ examiners</strong> who mark the real entrance exams and help decide which students will progress to the next round.'
					backgroundColor='white'
					className=''
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
				showHeader={true}
				showFooter={true}>
				<main>
					{}
					{}
					<section aria-labelledby='intensive-programme-heading'>
						<BootcampVideoSectionVersion
							videoId='intensiveProgramme'
							layout='text-left'
							className='py-16'
						/>
					</section>

					{}
					{}
					<article
						id='bootcamps-video-text-section'
						className='py-16'
						aria-labelledby='expert-guidance-heading'>
						{}
						{}
						<FirstLessonSection
							heading='Expert Guidance for Entrance Exam Success'
							paragraph='With tiny group sizes (typically 3-4 children) and examiner tutors who understand the unique demands of 11+ assessments, we equip students with insider tips and tricks to help them impress even the most oversubscribed schools. Each programme is carefully structured to address the specific challenges students face in verbal reasoning, non-verbal reasoning, mathematics, English and interviews.'
							backgroundColor='white'
							className=''
						/>
					</article>

					{}
					{}
					<section aria-labelledby='kickstarter-programme-heading'>
						<BootcampVideoSectionVersion
							videoId='kickstarterProgramme'
							layout='text-right'
							className='py-16'
						/>
					</section>

					{}
					{}
					<aside
						id='bootcamps-post-video-text-section'
						className='py-16'
						aria-labelledby='journey-heading'>
						<div className='container mx-auto max-w-screen-2xl px-8 sm:px-12 lg:px-16'>
							{}
							{}
							{}
							{}
							{}
							{}
							{}
							{}
							{}
							<div className='flex flex-col lg:flex-row lg:gap-8'>
								{}
								{}
								{}
								{}
								{}
								<div className='flex-1 lg:w-1/2 px-12 py-10'>
									{}
									{}
									{}
									{}
									{}
									<h3
										id='journey-heading'
										className='mb-6'>
										Ready to Begin Your Child's 11+ Journey?
									</h3>
									{}
									{}
									{}
									{}
									{}
									<ul className='list-disc list-inside space-y-3 text-primary-700'>
										<li>
											All sessions led by experienced specialists with 11+ examiner
											credentials and/or proven track records at top schools
										</li>
										<li>
											Exclusive access to curated past papers, practice questions, and
											revision materials
										</li>
										<li>
											Maximum 4-5 students per group ensuring personalised attention and
											focused learning
										</li>
										<li>
											98% success rate with consistent placements at prestigious
											independent schools
										</li>
										<li>
											Focus on exam technique and confidence building alongside academic
											preparation
										</li>
										<li>
											Multiple dates available throughout the year to fit your family's
											schedule
										</li>
									</ul>
								</div>

								{}
								{}
								{}
								{}
								{}
								<div className='flex-1 lg:w-1/2 flex items-center justify-center px-12 py-10'>
									{}
									{}
									<figure className='w-full max-w-lg'>
										<HeroVideoDialog
											videoSrc='/videos/11-plus-expert-intro-video-mpto.mp4'
											thumbnailSrc='/images/video-thumbnails/thumbnail-11-plus-expert-intro-video-mpto.png'
											thumbnailAlt="Emily's 11+ Expert Introduction Video - Meet Emily, our specialist 11+ tutor and learn about our comprehensive entrance exam preparation approach"
											animationStyle='from-center'
											className='w-full'
										/>
										{}
										{}
										<figcaption className='sr-only'>
											Video introduction featuring Emily, our specialist 11+ tutor,
											explaining our comprehensive entrance exam preparation approach
										</figcaption>
									</figure>
								</div>
							</div>
						</div>
					</aside>
				</main>

				{}
				{}
				<VideoPopup
					isOpen={isVideoOpen}
					onClose={() => setIsVideoOpen(false)}
					videoUrl='/videos/11-plus-expert-intro-video-mpto.mp4'
					title='Meet Emily - Our 11+ Expert Introduction'
					poster='/images/tutors/emily.jpg'
				/>
			</PageLayout>
		</>
	);
}
