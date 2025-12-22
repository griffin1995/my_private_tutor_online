import { getSubjectTuitionContent } from '@/lib/cms/cms-content';
import { PageFooter } from '@/components/layout/page-footer';
import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { SubjectTuitionTabs } from './components/subject-tuition-tabs';

export default function SubjectTuitionPage() {
	const content = getSubjectTuitionContent();

	return (
		<>
			<SimpleHero
				backgroundImage={content.metadata.heroImage}
				h1="Subject Tutoring & Exam"
				h1AccentText="Preparation"
				h2={content.metadata.description}
				decorativeStyle="lines"
			/>

			<PageLayout
				background="white"
				showHeader={true}
				showFooter={false}
				containerSize="full"
			>
				<SubjectTuitionTabs content={content} />
			</PageLayout>

			<PageFooter
				variant="premium"
				showBackToTop={true}
				showNewsletter={false}
				showContactForm={false}
			/>
		</>
	);
}

export type { SubjectTuitionContent } from '@/lib/cms/cms-content';