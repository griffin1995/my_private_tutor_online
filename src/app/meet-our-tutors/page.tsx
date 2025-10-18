import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { BrandMessageSection } from '@/components/sections/brand-message-section';
import { TestimonialsVideoSection } from '@/components/sections/testimonials-video-section';
import { TutorsSection } from '@/components/tutors/tutors-section';
import { getTutorProfilesSectionWithDynamicContent } from '@/lib/cms/cms-content';
import { getTutorsHeroImage, hasTutorImage } from '@/lib/cms/cms-images';
export const metadata = {
	title: 'Meet the Team | My Private Tutor Online',
	description:
		'Our tutors are handpicked by Elizabeth for their exceptional education pedigree, personalised approach and proven track record. Includes Oxbridge alumni and top UK school educators.',
	keywords:
		'expert tutors, Oxbridge alumni, private tutoring, GCSE tutors, A Level tutors, IB exam tutors',
};
export default function MeetOurTutorsPage() {
	console.log('[DEBUG-MeetOurTutorsPage] Component function executed');
	const tutorProfilesSection = getTutorProfilesSectionWithDynamicContent();
	const tutorsWithPhotos = tutorProfilesSection.profiles.filter((profile) =>
		hasTutorImage(profile.id),
	);
	console.log('[DEBUG-MeetOurTutorsPage] Tutor data loaded:', {
		tutorProfiles: tutorProfilesSection?.profiles?.length || 0,
		title: tutorProfilesSection?.title,
		subtitle: tutorProfilesSection?.subtitle,
	});
	const tutorsHeroImage = getTutorsHeroImage();
	return (
		<>
			<SimpleHero
				backgroundImage={tutorsHeroImage.src}
				h1={
			<span className='text-white'>
				Meet Our <span className='text-accent-600'>Tutors</span>
			</span>
		}
				h2='Excellence Through Expertise'
				decorativeStyle='lines'
			/>

			<BrandMessageSection
				quote='Our tutors are handpicked by Elizabeth for their exceptional education pedigree, personalised approach and proven track record. The team includes Oxbridge alumni, Heads of Departments at top 10 UK schools and official examiners for GCSEs, A Levels and IB exams. Each tutor is an expert in their field and has hundreds, if not thousands, of hours teaching experience.'
				backgroundColor='bg-neutral-50'
				useHighlighting={true}
				className='py-16 lg:py-20'
			/>

			<PageLayout
				showHeader={true}
				showFooter={true}
				containerSize='full'
				verticalSpacing='default'>
				<section className='py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-orange-100'>
					<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
						<div className='mx-auto max-w-4xl text-center'>
							<h2>
								Meet some of the specialist tutors that make up My Private Tutor Online
							</h2>

							<p className='mt-8 max-w-3xl mx-auto'>
								Our tutors are handpicked by Elizabeth for their exceptional education
								pedigree, personalised approach and proven track record. The team
								includes Oxbridge alumni, Heads of Departments at top 10 UK schools and
								official examiners for GCSEs, A Levels and IB exams. Each tutor is an
								expert in their field and has hundreds, if not thousands, of hours
								teaching experience.
							</p>
						</div>
					</div>
				</section>

				<TutorsSection
					data={tutorProfilesSection}
					showFeaturedOnly={false}
					showViewAllButton={false}
					className='bg-white'
				/>

				<TestimonialsVideoSection
					backgroundColor='bg-neutral-50'
					title='Hear From Our Families'
					description='Watch real testimonials from parents and students who have achieved exceptional results with My Private Tutor Online.'
					maxVideos={2}
				/>
			</PageLayout>
		</>
	);
}
