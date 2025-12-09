'use client';
import { EntranceExamsContent } from '@/components/education/entrance-exams-content';
import { LondonInPersonContent } from '@/components/education/london-in-person-content';
import { OnlineHomeschoolingContent } from '@/components/education/online-homeschooling-content';
import { PrimarySchoolContent } from '@/components/education/primary-school-content';
import { SecondarySchoolContent } from '@/components/education/secondary-school-content';
import { SenSupportContent } from '@/components/education/sen-support-content';
import { UniversityAdmissionsContent } from '@/components/education/university-admissions-content';
import { PageFooter } from '@/components/layout/page-footer';
import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
	BookOpen,
	GraduationCap,
	Heart,
	Laptop,
	MapPin,
	School,
	Trophy,
	type LucideIcon,
} from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { memo, Suspense, useCallback, useEffect, useState } from 'react';

// ============================================================================
// HARDCODED DATA - ALL EDUCATION TABS CONTENT
// ============================================================================

// Education level content - Currently unused but retained for future feature implementation
// Testimonials and statistics are available but not currently displayed
// These data structures support comprehensive education-level specific content

// Primary School Content

// Secondary School Content

// Entrance Exams Content

// University Admissions Content

// Online Homeschooling Content

// SEN Support Content

// London In-Person Content

interface SubjectTuitionTabsProps {
	className?: string;
	params?: Promise<{
		[key: string]: string;
	}>;
	searchParams?: Promise<{
		[key: string]: string | string[] | undefined;
	}>;
}
type EducationLevelValue =
	| 'primary-school'
	| 'secondary-school'
	| 'entrance-exams'
	| 'university-admissions'
	| 'online-homeschooling'
	| 'sen-support'
	| 'london-in-person';
interface StrictEducationLevel {
	readonly value: EducationLevelValue;
	readonly label: string;
	readonly description: string;
	readonly subjects: ReadonlyArray<string>;
	readonly keyFeatures: ReadonlyArray<string>;
	readonly icon: LucideIcon;
}
const educationLevels = [
	{
		value: 'primary-school',
		label: 'Primary School',
		icon: School,
		description:
			"The primary curriculum is the scaffolding upon which secondary success plays out; we're passionate about plugging gaps and getting it right.",
		subjects: [
			'Mathematics',
			'English',
			'Science',
			'Reading & Comprehension',
			'Writing Skills',
		],
		keyFeatures: [
			'Interactive learning methods',
			'Building confidence and enthusiasm',
			'Personalised learning pace',
			'Regular progress assessments',
		],
	},
	{
		value: 'secondary-school',
		label: 'Secondary School',
		icon: GraduationCap,
		description:
			'One-to-one tutoring for KS3, GCSE, A-Level and IB, delivered by experienced subject specialists and examiners.',
		subjects: [
			'Mathematics',
			'English Literature & Language',
			'Sciences',
			'History',
			'Geography',
			'Modern Foreign Languages',
		],
		keyFeatures: [
			'Subject specialist tutors',
			'Exam technique development',
			'Study skills coaching',
			'Transition support to GCSE level',
		],
	},
	{
		value: 'entrance-exams',
		label: 'Entrance Exams',
		icon: Trophy,
		description:
			'Specialised preparation for competitive entrance examinations across all age groups.',
		subjects: [
			'Mathematics',
			'English Language & Literature',
			'Biology',
			'Chemistry',
			'Physics',
			'History',
			'Geography',
			'Modern Languages',
		],
		keyFeatures: [
			'GL Assessment expertise',
			'CEM preparation',
			'ISEB Common Entrance',
			'School-specific papers',
		],
	},
	{
		value: 'university-admissions',
		label: 'University Applications & Specialist Tests',
		icon: BookOpen,
		description:
			'Expert academic support for undergraduates and postgraduates, including essay coaching, dissertations, and subject-specific tutoring.',
		subjects: [
			'Essay Writing',
			'Research Methods',
			'Statistics',
			'Subject-Specific Support',
			'Dissertation Guidance',
		],
		keyFeatures: [
			'Academic writing excellence',
			'Research methodology training',
			'Time management strategies',
			'Peer review processes',
		],
	},
	{
		value: 'online-homeschooling',
		label: 'Online Homeschooling',
		icon: Laptop,
		description:
			'Comprehensive one-to-one homeschooling for families seeking both academic structure and flexibility.',
		subjects: [
			'Professional Qualifications',
			'Career Development',
			'Digital Literacy',
			'Language Learning',
			'Creative Writing',
		],
		keyFeatures: [
			'Private school standard',
			'Personalised curriculum',
			'Expert tutor teams',
			'Flexible scheduling',
		],
	},
	{
		value: 'sen-support',
		label: 'SEN Support & Neurodiverse Learning',
		icon: Heart,
		description:
			"Our Founder Elizabeth's own neurodiversity (dyspraxia) means she's especially passionate about equipping students with gamechanging SEN support.",
		subjects: [
			'Individualised Learning',
			'Strength Identification',
			'Learning Style Analysis',
			'Accessibility Support',
		],
		keyFeatures: [
			'Detailed assessments',
			'Strength identification',
			'Learning style analysis',
			'Personalised support plans',
		],
	},
	{
		value: 'london-in-person',
		label: 'London In-Person Tutoring',
		icon: MapPin,
		description:
			'In-person tutoring typically available across Zones 1–5, depending on student location and tutor availability.',
		subjects: [
			'All Academic Subjects',
			'Interview Preparation',
			'Entrance Exams',
			'Study Skills',
		],
		keyFeatures: [
			'DBS-checked tutors',
			'Specialist expertise',
			'London school experience',
			'Entrance exam preparation',
		],
	},
] as const satisfies ReadonlyArray<StrictEducationLevel>;
// Tab Navigation Component with URL integration
function TabNavigation() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Get current tab from URL or default to primary-school
	const currentTab =
		(searchParams.get('tab') as EducationLevelValue) || 'primary-school';
	const [selectedTab, setSelectedTab] =
		useState<EducationLevelValue>(currentTab);

	// Update local state when URL changes
	useEffect(() => {
		const urlTab =
			(searchParams.get('tab') as EducationLevelValue) || 'primary-school';
		setSelectedTab(urlTab);
	}, [searchParams]);

	// Handle tab changes with URL updates
	const handleTabChange = useCallback(
		(value: string) => {
			const newTab = value as EducationLevelValue;
			setSelectedTab(newTab);

			// Update URL with new tab parameter
			const params = new URLSearchParams(searchParams.toString());
			params.set('tab', newTab);

			// Use window.history.pushState for Next.js 15 compatibility
			window.history.pushState(null, '', `${pathname}?${params.toString()}`);
		},
		[searchParams, pathname],
	);

	const TabContent = memo(
		({
			level,
			contentData,
		}: {
			level: StrictEducationLevel;
			contentData: React.ReactNode;
		}) => {
			return (
				<TabsContent
					key={level.value}
					value={level.value}
					className='mt-0 focus-visible:outline-none'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={level.value}
							initial={{
								opacity: 0,
								y: 20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							exit={{
								opacity: 0,
								y: -20,
							}}
							transition={{
								duration: 0.4,
								ease: 'easeOut',
							}}>
							<div className='mx-auto w-full max-w-none px-4 sm:px-6 lg:px-8 '>
								{contentData}
							</div>
						</motion.div>
					</AnimatePresence>
				</TabsContent>
			);
		},
	);
	TabContent.displayName = 'TabContent';

	return (
		<main className='flex-1  px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white'>
			<div className='w-full mx-auto'>
				<Tabs
					defaultValue='primary-school'
					value={selectedTab}
					className='w-full'
					orientation='horizontal'
					dir='ltr'
					onValueChange={handleTabChange}>
					<div className='w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 pt-8'>
						<TabsList className='flex h-auto w-full flex-wrap gap-2 bg-primary-700 p-2 rounded-none'>
							{educationLevels.map((level) => {
								const IconComponent = level.icon;
								return (
									<TabsTrigger
										key={level.value}
										value={level.value}
										className={cn(
											'px-4 py-3 transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=inactive]:bg-transparent data-[state=inactive]:text-white rounded-none flex items-center gap-2',
										)}>
										<IconComponent className='h-4 w-4' />
										{level.label}
									</TabsTrigger>
								);
							})}
						</TabsList>
					</div>

					<TabContent
						level={educationLevels.find((l) => l.value === 'primary-school')!}
						contentData={<PrimarySchoolContent />}
					/>

					<TabContent
						level={educationLevels.find((l) => l.value === 'secondary-school')!}
						contentData={<SecondarySchoolContent />}
					/>

					<TabContent
						level={educationLevels.find((l) => l.value === 'entrance-exams')!}
						contentData={<EntranceExamsContent />}
					/>

					<TabContent
						level={educationLevels.find((l) => l.value === 'university-admissions')!}
						contentData={<UniversityAdmissionsContent />}
					/>

					<TabContent
						level={educationLevels.find((l) => l.value === 'online-homeschooling')!}
						contentData={<OnlineHomeschoolingContent />}
					/>

					<TabContent
						level={educationLevels.find((l) => l.value === 'sen-support')!}
						contentData={<SenSupportContent />}
					/>

					<TabContent
						level={educationLevels.find((l) => l.value === 'london-in-person')!}
						contentData={<LondonInPersonContent />}
					/>
				</Tabs>
			</div>
		</main>
	);
}

// Main Page Component with Suspense boundary
export default function SubjectTuitionTabsPage({}: SubjectTuitionTabsProps) {
	return (
		<>
			<SimpleHero
				backgroundImage='/images/hero/subject-tuition.jpg'
				h1={
					<span className='text-white'>
						Subject Tutoring
						<br />&<br />
						<span className='text-accent-600'>Exam Preparation</span>
					</span>
				}
				h2='From entrance exams to university prep, our expert tutors provide personalised instruction across all subjects and educational stages. '
				decorativeStyle='lines'
			/>

			<PageLayout
				background='white'
				showHeader={true}
				showFooter={false}
				containerSize='full'>
				{/* Suspense boundary required for useSearchParams in Next.js 15 */}
				<Suspense
					fallback={
						<div className='flex-1 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white'>
							<div className='w-full mx-auto p-8 text-center'>Loading...</div>
						</div>
					}>
					<TabNavigation />
				</Suspense>
			</PageLayout>

			<PageFooter
				variant='premium'
				showBackToTop={true}
				showNewsletter={false}
				showContactForm={false}
			/>
		</>
	);
}
export type {
	EducationLevelValue,
	StrictEducationLevel,
	SubjectTuitionTabsProps,
};
