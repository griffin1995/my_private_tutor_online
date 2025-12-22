import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { ContactButtonClient } from '@/components/pages/eleven-plus-bootcamps/contact-button-client';
import { VideoSectionClient } from '@/components/pages/eleven-plus-bootcamps/video-section-client';
import { FirstLessonSection } from '@/components/sections/about/FirstLessonSection';
import { ScrollingSchools } from '@/components/sections/scrolling-schools';
import { BootcampVideoSectionVersion } from '@/components/video/BootcampVideoSectionVersion';
import {
	getElevenPlusBootcampsContent,
	getElevenPlusBootcampsHero,
	getFilteredSchools,
	isElevenPlusSeasonActive,
} from '@/lib/cms/cms-content';

export default function ElevenPlusBootcampsPage() {
	// Server Component - Fetch data synchronously following project CMS patterns
	const bootcampsData = getElevenPlusBootcampsContent();
	const heroData = getElevenPlusBootcampsHero();
	const filteredSchools = getFilteredSchools();
	const isSeasonActive = isElevenPlusSeasonActive();

	if (!isSeasonActive) {
		const { offSeason } = bootcampsData.content;
		return (
			<PageLayout
				background="white"
				showHeader={true}
				showFooter={true}>
				<section className="py-24">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="mb-4">{offSeason.title}</h1>
						<p className="text-primary-700 mb-8">
							{offSeason.description}
						</p>
						<ContactButtonClient />
					</div>
				</section>
			</PageLayout>
		);
	}

	return (
		<>
			{/* Hero Section - Outside PageLayout */}
			<section id="bootcamps-hero">
				<SimpleHero
					backgroundImage={heroData.backgroundImage}
					h1={heroData.h1}
					h1AccentText={heroData.h1AccentText}
					h2={heroData.h2}
					decorativeStyle={heroData.decorativeStyle}
				/>
			</section>

			<PageLayout
				background="white"
				showHeader={true}
				showFooter={true}
				containerSize="full">

				{/* Schools Section */}
				<section id="bootcamps-schools">
					<ScrollingSchools
						schools={[...filteredSchools]}
						className="py-0.5"
					/>
				</section>

				{/* Tagline Section */}
				<section
					id="bootcamps-tagline"
					className="bg-white"
					aria-labelledby="tagline-heading">
					<header className="relative text-center flex items-center justify-center">
						<div className="flex flex-col items-center justify-center h-full">
							<div className="relative z-10 px-4">
								<h2
									id="tagline-heading"
									className="tracking-wide dark:text-white">
									{bootcampsData.content.tagline.title}
								</h2>
							</div>
							<div
								className="flex justify-center items-center space-x-6"
								role="presentation"
								aria-hidden="true">
								<div className="w-12 h-px bg-neutral-300 dark:bg-neutral-600" />
								<div className="relative">
									<div className="w-3 h-3 rounded-full bg-neutral-400 dark:bg-neutral-500 shadow-lg" />
								</div>
								<div className="w-12 h-px bg-neutral-300 dark:bg-neutral-600" />
							</div>
						</div>
					</header>
				</section>

				{/* Mission Section */}
				<section
					id="bootcamps-mission"
					className="mt-16">
					<div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center">
						<blockquote className="italic">
							&quot;{bootcampsData.content.mission.quote}&quot;
						</blockquote>
					</div>
				</section>

				{/* Pre-Video Text Section */}
				<section
					id="bootcamps-pre-video-text-section"
					className="py-16 bg-white">
					<FirstLessonSection
						heading={bootcampsData.content.preVideo.heading}
						paragraph={bootcampsData.content.preVideo.paragraph}
						backgroundColor="white"
						className=""
					/>
				</section>

				{/* Intensive Programme Section */}
				<section aria-labelledby="intensive-programme-heading">
					<BootcampVideoSectionVersion
						videoId="intensiveProgramme"
						className="py-16"
					/>
				</section>

				{/* Expert Guidance Section */}
				<article
					id="bootcamps-video-text-section"
					className="py-16"
					aria-labelledby="expert-guidance-heading">
					<FirstLessonSection
						heading={bootcampsData.content.expertGuidance.heading}
						paragraph={bootcampsData.content.expertGuidance.paragraph}
						backgroundColor="white"
						className=""
					/>
				</article>

				{/* Kickstarter Programme Section */}
				<section aria-labelledby='kickstarter-programme-heading'>
					<BootcampVideoSectionVersion
						videoId='kickstarterProgramme'
						className='py-16'
					/>
				</section>

				{/* Journey Section */}
				<aside
					id="bootcamps-post-video-text-section"
					className="py-16"
					aria-labelledby="journey-heading">
					<div className="container mx-auto max-w-screen-2xl px-8 sm:px-12 lg:px-16">
						<div className="flex flex-col lg:flex-row lg:gap-8">
							<div className="flex-1 lg:w-1/2 px-12 py-10">
								<h3
									id="journey-heading"
									className="mb-6">
									{bootcampsData.content.journey.heading}
								</h3>
								<ul className="list-disc list-inside space-y-3 text-primary-700">
									{bootcampsData.content.journey.benefits.map((benefit, index) => (
										<li key={index}>
											{benefit}
										</li>
									))}
								</ul>
							</div>

							<div className="flex-1 lg:w-1/2 flex items-center justify-center px-12 py-10">
								<VideoSectionClient />
							</div>
						</div>
					</div>
				</aside>

			</PageLayout>
		</>
	);
}
