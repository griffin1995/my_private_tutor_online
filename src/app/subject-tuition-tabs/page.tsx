'use client';

import { PageFooter } from '@/components/layout/page-footer';
import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { cn } from '@/lib/utils';
import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence } from 'framer-motion';
import { memo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { EducationLevelTabContent } from '@/components/education/EducationLevelTabContent';
import {
	getEntranceExamsContent,
	getLondonInPersonContent,
	getOnlineHomeschoolingContent,
	getPrimarySchoolContent,
	getSecondarySchoolContent,
	getSenSupportContent,
	getUniversityAdmissionsContent,
} from '@/lib/cms/education-tabs-cms';
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
}
const educationLevels = [
	{
		value: 'primary-school',
		label: 'Primary School',
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
		label: 'University Admissions & English Proficiency',
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
export default function SubjectTuitionTabsPage({}: SubjectTuitionTabsProps) {
	const [selectedTab, setSelectedTab] =
		useState<EducationLevelValue>('primary-school');
	const handleTabChange = useCallback((value: string) => {
		setSelectedTab(value as EducationLevelValue);
		console.log('Tab changed to:', value);
	}, []);
	const TabContent = memo(
		({
			level,
			contentData,
		}: {
			level: StrictEducationLevel;
			contentData: any;
		}) => {
			return (
				<Tabs.Content
					key={level.value}
					value={level.value}
					id={`panel-${level.value}`}
					role='tabpanel'
					aria-labelledby={`trigger-${level.value}`}
					className='mt-8 focus-visible:outline-none'
					tabIndex={0}>
					{}
					{}
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
							{}
							{}
							<div className='mx-auto w-[85%] max-w-none px-4 sm:px-6 lg:px-8 '>
								{contentData}
							</div>
						</motion.div>
					</AnimatePresence>
				</Tabs.Content>
			);
		},
	);
	TabContent.displayName = 'TabContent';
	return (
		<>
			{}
			{}
			<SimpleHero
				backgroundImage='/images/hero/hero-subject-tuition-primary.jpg'
				h1={
					<>
						Subject Tutoring
						<br />&<br />
						Exam Preparation
					</>
				}
				h2='From entrance exams to university prep, our expert tutors provide personalised instruction across all subjects and educational stages. '
				decorativeStyle='lines'
			/>

			{}
			{}
			{}
			{}
			<PageLayout
				background='white'
				showHeader={true}
				showFooter={false}
				containerSize='full'>
				{}
				{}
				{}
				{}
				<main className='flex-1  px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white'>
					<div className='w-full mx-auto'>
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
						<Tabs.Root
							defaultValue='primary-school'
							value={selectedTab}
							className='w-full'
							orientation='horizontal'
							activationMode='automatic'
							dir='ltr'
							onValueChange={handleTabChange}
							aria-label='Educational programme selection'>
							{}
							{}
							{}
							{}
							{}
							{}
							{}
							<div className='w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8'>
								{}
								{}
								<Tabs.List
									className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 p-2 bg-primary-700'
									aria-label='Educational level tabs'
									aria-orientation='horizontal'
									role='tablist'
									loop={true}>
									{educationLevels.map((level) => {
										return (
											<Tabs.Trigger
												key={level.value}
												value={level.value}
												role='tab'
												aria-controls={`panel-${level.value}`}
												aria-selected={selectedTab === level.value}
												tabIndex={selectedTab === level.value ? 0 : -1}
												className={cn(
													'px-4 py-3 transition-all duration-200 ease-in-out',
													'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2',
													'data-[state=active]:bg-white data-[state=active]:text-primary-700',
													'data-[state=inactive]:text-white data-[state=inactive]:bg-transparent',
													'disabled:opacity-50 disabled:cursor-not-allowed',
												)}>
												{level.label}
											</Tabs.Trigger>
										);
									})}
								</Tabs.List>
							</div>

							{}
							{}
							{}

							{}
							{}
							{}
							<TabContent
								level={educationLevels.find((l) => l.value === 'primary-school')!}
								contentData={
									<EducationLevelTabContent content={getPrimarySchoolContent()} />
								}
							/>

							{}
							{}
							{}
							<TabContent
								level={educationLevels.find((l) => l.value === 'secondary-school')!}
								contentData={
									<EducationLevelTabContent content={getSecondarySchoolContent()} />
								}
							/>

							{}
							{}
							{}
							<TabContent
								level={educationLevels.find((l) => l.value === 'entrance-exams')!}
								contentData={
									<EducationLevelTabContent content={getEntranceExamsContent()} />
								}
							/>

							{}

							{}
							{}
							{}
							<TabContent
								level={
									educationLevels.find((l) => l.value === 'university-admissions')!
								}
								contentData={
									<EducationLevelTabContent content={getUniversityAdmissionsContent()} />
								}
							/>

							{}
							{}
							{}
							<TabContent
								level={educationLevels.find((l) => l.value === 'online-homeschooling')!}
								contentData={
									<EducationLevelTabContent content={getOnlineHomeschoolingContent()} />
								}
							/>

							{}
							{}
							{}
							<TabContent
								level={educationLevels.find((l) => l.value === 'sen-support')!}
								contentData={
									<EducationLevelTabContent content={getSenSupportContent()} />
								}
							/>

							{}
							{}
							{}
							<TabContent
								level={educationLevels.find((l) => l.value === 'london-in-person')!}
								contentData={
									<EducationLevelTabContent content={getLondonInPersonContent()} />
								}
							/>
						</Tabs.Root>
					</div>
				</main>
			</PageLayout>

			{}
			{}
			{}
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
