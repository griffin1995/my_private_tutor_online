'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { Section } from '@/components/layout/section';
import { SimpleHero } from '@/components/layout/simple-hero';
import { Button } from '@/components/ui/button';
import { WaveSeparator } from '@/components/ui/wave-separator';
import { m } from 'framer-motion';
import {
	Award,
	BookOpen,
	Globe,
	GraduationCap,
	Target,
	Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
	SubjectAccordion,
	SubjectCategory,
} from '@/components/sections/subject-accordion';
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog';
import { ResultsDocumentation } from '@/components/sections/results-documentation';
import { Avatar, Blockquote } from 'flowbite-react';
import {
	getHomeschoolingPreview,
	getResultsDocumentation,
	getServicesCTA,
	getServicesHero,
	getServicesSectionTitles,
	getServicesStatistics,
	getServicesSubjectCategories,
} from '@/lib/cms/cms-content';
const heroContent = getServicesHero();
const statisticsData = getServicesStatistics();
const sectionTitles = getServicesSectionTitles();
const subjectCategoriesData = getServicesSubjectCategories();
const iconMap: Record<string, React.ReactElement> = {
	Target: <Target className='w-6 h-6' />,
	BookOpen: <BookOpen className='w-6 h-6' />,
	GraduationCap: <GraduationCap className='w-6 h-6' />,
	Award: <Award className='w-6 h-6' />,
	Users: <Users className='w-6 h-6' />,
	Globe: <Globe className='w-6 h-6' />,
};
const subjectCategories: SubjectCategory[] = subjectCategoriesData.map(
	(category) => ({
		id: category.id,
		title: category.title,
		icon: iconMap[category.icon] || <BookOpen className='w-6 h-6' />,
		description: category.description,
		subjects: category.subjects.map((subject) => ({
			name: subject.name,
			description: subject.description,
			keyFeatures: [...subject.keyFeatures],
			children:
				subject.children ?
					subject.children.map((child) => ({
						name: child.name,
						description: child.description,
						keyFeatures: [...child.keyFeatures],
					}))
				:	undefined,
			videoSection:
				subject.videoSection ?
					{
						thumbnailUrl: subject.videoSection.thumbnailUrl,
						videoUrl: subject.videoSection.videoUrl,
						title: subject.videoSection.title,
						alt: subject.videoSection.alt,
					}
				:	undefined,
			twoColumnVideoSection:
				subject.twoColumnVideoSection ?
					{
						video1: {
							thumbnailUrl: subject.twoColumnVideoSection.video1.thumbnailUrl,
							videoUrl: subject.twoColumnVideoSection.video1.videoUrl,
							title: subject.twoColumnVideoSection.video1.title,
							alt: subject.twoColumnVideoSection.video1.alt,
						},
						video2: {
							thumbnailUrl: subject.twoColumnVideoSection.video2.thumbnailUrl,
							videoUrl: subject.twoColumnVideoSection.video2.videoUrl,
							title: subject.twoColumnVideoSection.video2.title,
							alt: subject.twoColumnVideoSection.video2.alt,
						},
					}
				:	undefined,
		})),
		callOuts: [...category.callOuts],
		testimonial: category.testimonial,
	}),
);
const homeschoolingData = getHomeschoolingPreview();
const ctaDataRaw = getServicesCTA();
const resultsData: any[] = [];
const ctaData = {
	title: ctaDataRaw.title,
	description: ctaDataRaw.description,
	primaryButton: {
		text: ctaDataRaw.primaryButton.text,
		onClick: () => {
			if (ctaDataRaw.primaryButton.action === 'consultation') {
				console.log('Book consultation clicked');
			}
		},
	},
	secondaryButton: {
		text: ctaDataRaw.secondaryButton.text,
		onClick: () => {
			if (ctaDataRaw.secondaryButton.action === 'subjects') {
				console.log('View subjects clicked');
			}
		},
	},
};
export default function SubjectTuitionPage() {
	const [asyncResultsData, setAsyncResultsData] = useState<any[]>([]);
	useEffect(() => {
		async function loadResultsData() {
			try {
				const data = await getResultsDocumentation();
				setAsyncResultsData(data);
			} catch (error) {
				console.error('Failed to load results data:', error);
			}
		}
		loadResultsData();
	}, []);
	return (
		<>
			{}
			{}
			{}
			{}
			{}
			{}
			<section id='subject-tuition-hero'>
				<SimpleHero
					backgroundImage='/images/hero/hero-subject-tuition-primary.jpg'
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
			</section>

			{}
			{}
			{}
			{}
			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'>
				<WaveSeparator
					variant='subtle'
					className='text-slate-100'
				/>

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
				<Section
					id='subject-tuition-categories'
					className='py-16 lg:py-24 relative'
					background='white'>
					<div className='absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-50' />
					<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
						<m.div
							className='text-center mb-16'
							initial={{
								opacity: 0,
								y: 20,
							}}
							whileInView={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 0.6,
							}}
							viewport={{
								once: true,
							}}>
							<h2 className='text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6'>
								{sectionTitles.subjectCategories.title}
							</h2>
						</m.div>

						{}
						{}
						<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center mb-16'>
							<Blockquote>
								{/* Quote icon */}
								<svg
									className='mb-6 h-14 w-14 fill-primary-700'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 18 14'>
									<path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
								</svg>

								{/* Quote Text */}
								<p className='italic'>
									Our tutors are <strong>examiners, school teachers, and subject specialists</strong> who are not only experienced educators but also motivating mentors. Whether your child is preparing for a school entrance exam, navigating GCSEs/A-levels, or applying to top universities in the UK, we guide each family with <strong>clarity, care, and expert insight</strong> at every stage of their educational journey.
								</p>

								{/* Author with avatar */}
								<figcaption className='mt-4 flex items-center justify-center space-x-3'>
									<Avatar
										rounded
										size='xs'
										img='/images/team/elizabeth-burrows-founder-main.jpg'
										alt='Elizabeth Burrows'
									/>
									<div className='flex items-center divide-x-2 divide-neutral-500'>
										<cite className='pr-3'>Elizabeth Burrows</cite>
										<cite className='pl-3 text-neutral-500'>Founder</cite>
									</div>
								</figcaption>
							</Blockquote>
						</div>

						{}
						{}
						<div className='max-w-6xl mx-auto'>
							{}
							<div
								id='primary'
								className='-mt-24 pt-24'></div>
							<div
								id='secondary'
								className='-mt-24 pt-24'></div>
							<div
								id='entrance-exams'
								className='-mt-24 pt-24'></div>
							<div
								id='university-beyond'
								className='-mt-24 pt-24'></div>
							<div
								id='sen-neurodiverse'
								className='-mt-24 pt-24'></div>
							<div
								id='london-in-person'
								className='-mt-24 pt-24'></div>

							{}
							{}
							<SubjectAccordion
								categories={subjectCategories}
								defaultOpenSections={[]}
								onSectionToggle={(sectionId, isOpen) => {
									console.log(`Section ${sectionId} ${isOpen ? 'opened' : 'closed'}`);
								}}
							/>
						</div>
					</div>
				</Section>

				{}
				{}
				{}
				{}
				{}
				{}
				<Section
					id='subject-tuition-results'
					className='py-16 lg:py-24 relative'
					background='white'>
					<div className='absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 opacity-70' />
					<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
						{}
						<ResultsDocumentation
							title='Quantifiable Academic Outcomes'
							description=''
							results={asyncResultsData}
							layout='grid'
							maxItems={3}
						/>
					</div>
				</Section>

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
				{}
				{}
				{}
				<Section
					id='subject-tuition-homeschooling-preview'
					className='py-16 lg:py-24 relative'
					background='white'>
					<div className='absolute inset-0 bg-gradient-to-br from-amber-50/30 via-yellow-25 to-[#CA9E5B]/20' />
					<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
							{}
							<m.div
								className='space-y-8'
								initial={{
									opacity: 0,
									x: -30,
								}}
								whileInView={{
									opacity: 1,
									x: 0,
								}}
								transition={{
									duration: 0.8,
									delay: 0.1,
								}}
								viewport={{
									once: true,
								}}>
								<h2 className='text-4xl lg:text-5xl font-serif font-bold text-slate-900'>
									{homeschoolingData.title}
								</h2>

								<p className='text-xl text-slate-700 leading-relaxed'>
									{homeschoolingData.description}
								</p>

								<ul className='space-y-4'>
									{homeschoolingData.features.map((feature, index) => (
										<m.li
											key={index}
											className='flex items-center gap-4'
											initial={{
												opacity: 0,
												x: -10,
											}}
											whileInView={{
												opacity: 1,
												x: 0,
											}}
											transition={{
												duration: 0.4,
												delay: index * 0.1 + 0.3,
											}}
											viewport={{
												once: true,
											}}>
											<div className='w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm'></div>
											<span className='text-slate-700 text-lg'>{feature.text}</span>
										</m.li>
									))}
								</ul>

								<m.div
									initial={{
										opacity: 0,
										y: 10,
									}}
									whileInView={{
										opacity: 1,
										y: 0,
									}}
									transition={{
										duration: 0.4,
										delay: 0.7,
									}}
									viewport={{
										once: true,
									}}>
									{}
									{}
									{}
									{}
									{}
									{}
									<Button
										asChild
										variant='ghost'
										className='bg-[#CA9E5B] hover:bg-[#B8935A] !text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg'>
										<Link href='/homeschooling'>{homeschoolingData.buttonText}</Link>
									</Button>
								</m.div>
							</m.div>

							{}
							<m.div
								className='relative'
								initial={{
									opacity: 0,
									x: 30,
								}}
								whileInView={{
									opacity: 1,
									x: 0,
								}}
								transition={{
									duration: 0.8,
									delay: 0.3,
								}}
								viewport={{
									once: true,
								}}>
								{}
								{}
								<div className='relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200'>
									<Image
										src='/images/programmes/programme-homeschooling-offer.jpg'
										alt='Homeschooling Programme Offer - Comprehensive home education support with personalised curriculum and expert guidance'
										width={600}
										height={450}
										className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
										loading='lazy'
										quality={90}
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent' />
								</div>

								{}
								<div className='absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-20' />
								<div className='absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15' />

								{}
								<div className='absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg'>
									<div className='flex items-center gap-2'>
										<div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse'></div>
										<span className='text-sm font-semibold text-amber-700'>
											Comprehensive Programme
										</span>
									</div>
								</div>
							</m.div>
						</div>
					</div>
				</Section>

				{}
				{}
				{}
			</PageLayout>

			{}
			{}
		</>
	);
}
