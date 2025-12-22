import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { TierDescriptions } from '@/components/sections/tier-descriptions';
import { TestimonialsVideoSection } from '@/components/sections/testimonials-video-section';
import { TutorsSection } from '@/components/tutors/tutors-section';
import { getTutorsHeroImage } from '@/lib/cms/cms-images';
import { getTutorProfilesSection } from '@/lib/cms/cms-content';

export default function MeetOurTutorsPage() {
	const tutorProfilesSection = getTutorProfilesSection();
	const tutorsHeroImage = getTutorsHeroImage();

	return (
		<PageLayout
			showHeader={true}
			showFooter={true}
			containerSize='full'
			verticalSpacing='md'>
			<SimpleHero
				backgroundImage={tutorsHeroImage.src}
				h1="Meet Our"
				h1AccentText="Tutors"
				h2="Excellence Through Expertise"
				decorativeStyle="lines"
			/>
			<TutorsSection
				data={tutorProfilesSection}
				showFeaturedOnly={false}
				showViewAllButton={false}
			/>

			<TierDescriptions
				title='Understanding Our Tutor Tiers'
				subtitle="Clear transparency about tutor qualifications and pricing to help you choose the right level of expertise for your child's needs."
				showExpandable={false}
			/>

			<TestimonialsVideoSection
				backgroundColor='bg-neutral-50'
				title='Hear From Our Families'
				description='Watch real testimonials from parents and students who have achieved exceptional results with My Private Tutor Online.'
				maxVideos={2}
			/>
		</PageLayout>
	);
}