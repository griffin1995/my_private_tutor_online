'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import {
	ChevronDown,
	ChevronRight,
	LucideIcon,
	Play,
	Download,
	ExternalLink,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog';
import Link from 'next/link';
export interface SubjectItem {
	name: string;
	description: string;
	keyFeatures: string[];
	children?: SubjectItem[];
	videoThumbnail?: {
		thumbnailUrl: string;
		videoUrl: string;
		title: string;
		isPlaceholder?: boolean;
	};
	pdfDownload?: {
		title: string;
		downloadUrl: string;
		isPlaceholder?: boolean;
	};
	videoSection?: {
		thumbnailUrl: string;
		videoUrl: string;
		title: string;
		alt: string;
	};
	twoColumnVideoSection?: {
		video1: {
			thumbnailUrl: string;
			videoUrl: string;
			title: string;
			alt: string;
		};
		video2: {
			thumbnailUrl: string;
			videoUrl: string;
			title: string;
			alt: string;
		};
	};
}
export interface SubjectCategory {
	id: string;
	title: string;
	icon: React.ReactElement<LucideIcon>;
	description: string;
	subjects: SubjectItem[];
	callOuts: string[];
	testimonial: string;
}
export interface SubjectAccordionProps {
	categories: SubjectCategory[];
	defaultOpenSections?: string[];
	className?: string;
	onSectionToggle?: (sectionId: string, isOpen: boolean) => void;
}
interface AccordionSectionProps {
	category: SubjectCategory;
	isOpen: boolean;
	onToggle: () => void;
}
interface NestedSubjectItemProps {
	subjectItem: SubjectItem;
	index: number;
	parentId: string;
}
function NestedSubjectItem({
	subjectItem,
	index,
	parentId,
}: NestedSubjectItemProps) {
	const [isNestedOpen, setIsNestedOpen] = useState(false);
	const hasChildren = subjectItem.children && subjectItem.children.length > 0;
	const reduceMotion =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!hasChildren) {
		return (
			<m.div
				className='bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300'
				initial={
					reduceMotion ?
						{
							opacity: 1,
						}
					:	{
							opacity: 0,
							y: 20,
						}
				}
				whileInView={{
					opacity: 1,
					y: 0,
				}}
				transition={
					reduceMotion ?
						{
							duration: 0,
						}
					:	{
							duration: 0.5,
							delay: index * 0.1,
						}
				}
				viewport={{
					once: true,
				}}>
				<h4 className='text-lg font-serif font-bold text-slate-900 mb-3'>
					{subjectItem.name}
				</h4>
				<div
					className='text-slate-700 mb-4 leading-relaxed'
					dangerouslySetInnerHTML={{
						__html: subjectItem.description,
					}}
				/>

				{(subjectItem.videoThumbnail || subjectItem.pdfDownload) && (
					<div className='mb-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg'>
						{subjectItem.videoThumbnail && (
							<div className='mb-3'>
								<Link
									href={
										subjectItem.videoThumbnail.isPlaceholder ?
											'#'
										:	subjectItem.videoThumbnail.videoUrl
									}
									className='inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium text-sm transition-colors'>
									<Play className='w-4 h-4' />
									{subjectItem.videoThumbnail.title}
									{subjectItem.videoThumbnail.isPlaceholder && (
										<span className='text-xs opacity-75'>(Coming Soon)</span>
									)}
									{!subjectItem.videoThumbnail.isPlaceholder && (
										<ExternalLink className='w-3 h-3' />
									)}
								</Link>
							</div>
						)}
						{subjectItem.pdfDownload && (
							<div>
								<Button
									variant='outline'
									size='sm'
									className='border-amber-300 text-amber-800 hover:bg-amber-100'
									disabled={subjectItem.pdfDownload.isPlaceholder}
									asChild={!subjectItem.pdfDownload.isPlaceholder}>
									{subjectItem.pdfDownload.isPlaceholder ?
										<>
											<Download className='w-4 h-4 mr-2' />
											{subjectItem.pdfDownload.title} (Coming Soon)
										</>
									:	<Link href={subjectItem.pdfDownload.downloadUrl}>
											<Download className='w-4 h-4 mr-2' />
											{subjectItem.pdfDownload.title}
										</Link>
									}
								</Button>
							</div>
						)}
					</div>
				)}

				{subjectItem.videoSection && (
					<div className='mb-6 relative'>
						<p className='text-slate-700 leading-relaxed mb-4 text-lg'>
							Meet Emily, one of our Entrance Exam specialists. She holds degrees from
							both Oxford & Cambridge University and worked at a top 10 London grammar
							school where she helped assess and select the best 11+ candidates
						</p>

						<div className='mb-4 md:hidden'>
							<div className='bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg inline-flex'>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse'></div>
									<span className='text-sm font-semibold text-amber-700'>
										Watch Introduction
									</span>
								</div>
							</div>
						</div>

						<HeroVideoDialog
							videoSrc={subjectItem.videoSection.videoUrl}
							thumbnailSrc={subjectItem.videoSection.thumbnailUrl}
							thumbnailAlt={subjectItem.videoSection.alt}
							animationStyle='from-center'
							isFree={true}
							className='relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200'
						/>

						<div className='absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-20' />
						<div className='absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15' />

						<div className='hidden md:block absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg'>
							<div className='flex items-center gap-2'>
								<div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse'></div>
								<span className='text-sm font-semibold text-amber-700'>
									Watch Introduction
								</span>
							</div>
						</div>
					</div>
				)}

				{subjectItem.twoColumnVideoSection && (
					<div className='mb-6 grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div className='relative'>
							<div className='mb-4 md:hidden'>
								<div className='bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg inline-flex'>
									<div className='flex items-center gap-2'>
										<div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse'></div>
										<span className='text-sm font-semibold text-amber-700'>
											Watch Introduction
										</span>
									</div>
								</div>
							</div>

							<HeroVideoDialog
								videoSrc={subjectItem.twoColumnVideoSection.video1.videoUrl}
								thumbnailSrc={subjectItem.twoColumnVideoSection.video1.thumbnailUrl}
								thumbnailAlt={subjectItem.twoColumnVideoSection.video1.alt}
								animationStyle='from-center'
								isFree={true}
								className='relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200'
							/>

							<div className='absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-20' />
							<div className='absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15' />

							<div className='hidden md:block absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg'>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse'></div>
									<span className='text-sm font-semibold text-amber-700'>
										Watch Introduction
									</span>
								</div>
							</div>
						</div>

						<div className='relative'>
							<div className='mb-4 md:hidden'>
								<div className='bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg inline-flex'>
									<div className='flex items-center gap-2'>
										<div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse'></div>
										<span className='text-sm font-semibold text-amber-700'>
											Watch Introduction
										</span>
									</div>
								</div>
							</div>

							<HeroVideoDialog
								videoSrc={subjectItem.twoColumnVideoSection.video2.videoUrl}
								thumbnailSrc={subjectItem.twoColumnVideoSection.video2.thumbnailUrl}
								thumbnailAlt={subjectItem.twoColumnVideoSection.video2.alt}
								animationStyle='from-center'
								isFree={true}
								className='relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200'
							/>

							<div className='absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-20' />
							<div className='absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15' />

							<div className='hidden md:block absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg'>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse'></div>
									<span className='text-sm font-semibold text-amber-700'>
										Watch Introduction
									</span>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className='flex flex-wrap gap-2'>
					{subjectItem.keyFeatures.map((feature, featureIndex) => (
						<Badge
							key={featureIndex}
							variant='secondary'
							className='bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 border-amber-200 font-medium'>
							{feature}
						</Badge>
					))}
				</div>
			</m.div>
		);
	}
	return (
		<Card className='border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mb-4'>
			<button
				onClick={() => setIsNestedOpen(!isNestedOpen)}
				className='w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-t-xl min-h-[44px] focus-visible:ring-2 focus-visible:ring-accent-500'
				aria-expanded={isNestedOpen}
				aria-controls={`nested-${parentId}-${index}`}
				aria-label={`${isNestedOpen ? 'Collapse' : 'Expand'} ${subjectItem.name} section`}
				role='button'
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						setIsNestedOpen(!isNestedOpen);
					}
				}}>
				<div className='text-left'>
					<h4
						id={`nested-header-${parentId}-${index}`}
						className='text-lg font-serif font-bold text-slate-900'>
						{subjectItem.name}
					</h4>
					<div
						className='text-slate-600 mt-1'
						dangerouslySetInnerHTML={{
							__html: subjectItem.description,
						}}
					/>
				</div>
				<div
					className='text-slate-400 transition-transform duration-200'
					aria-hidden='true'>
					{isNestedOpen ?
						<ChevronDown className='w-5 h-5' />
					:	<ChevronRight className='w-5 h-5' />}
				</div>
			</button>

			{isNestedOpen && (
				<m.div
					id={`nested-${parentId}-${index}`}
					className='border-t border-slate-200 bg-gradient-to-b from-slate-25 to-white'
					initial={
						reduceMotion ?
							{
								opacity: 1,
								height: 'auto',
							}
						:	{
								opacity: 0,
								height: 0,
							}
					}
					animate={{
						opacity: 1,
						height: 'auto',
					}}
					exit={
						reduceMotion ?
							{
								opacity: 1,
								height: 'auto',
							}
						:	{
								opacity: 0,
								height: 0,
							}
					}
					transition={
						reduceMotion ?
							{
								duration: 0,
							}
						:	{
								duration: 0.3,
								ease: 'easeInOut',
							}
					}
					role='region'
					aria-labelledby={`nested-header-${parentId}-${index}`}>
					<div className='p-6 space-y-4'>
						{subjectItem.children!.map((childItem, childIndex) => (
							<m.div
								key={childIndex}
								className='bg-gradient-to-r from-white to-slate-50 border border-slate-150 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300'
								initial={
									reduceMotion ?
										{
											opacity: 1,
										}
									:	{
											opacity: 0,
											x: 20,
										}
								}
								whileInView={{
									opacity: 1,
									x: 0,
								}}
								transition={
									reduceMotion ?
										{
											duration: 0,
										}
									:	{
											duration: 0.4,
											delay: childIndex * 0.08,
										}
								}
								viewport={{
									once: true,
								}}>
								<h5 className='text-md font-serif font-semibold text-slate-900 mb-2'>
									{childItem.name}
								</h5>
								<p className='text-slate-700 mb-3 text-sm leading-relaxed'>
									{childItem.description}
								</p>
								<div className='flex flex-wrap gap-1.5'>
									{childItem.keyFeatures.map((feature, featureIndex) => (
										<Badge
											key={featureIndex}
											variant='outline'
											className='bg-white text-slate-700 border-slate-300 text-xs font-medium'>
											{feature}
										</Badge>
									))}
								</div>
							</m.div>
						))}
					</div>
				</m.div>
			)}
		</Card>
	);
}
function AccordionSection({
	category,
	isOpen,
	onToggle,
}: AccordionSectionProps) {
	return (
		<Card className='border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'>
			<button
				onClick={onToggle}
				className='w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 min-h-[44px] focus-visible:ring-2 focus-visible:ring-accent-500'
				aria-expanded={isOpen}
				aria-controls={`section-${category.id}`}
				aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${category.title} section`}>
				<div className='flex items-center gap-4'>
					<div className='bg-gradient-to-br from-amber-100 to-amber-200 rounded-full p-3 text-amber-700 shadow-sm'>
						{category.icon}
					</div>
					<div className='text-left'>
						<h3 className='text-xl font-serif font-bold text-slate-900'>
							{category.title}
						</h3>
						<p className='text-slate-600 mt-1'>{category.description}</p>
					</div>
				</div>
				<div className='text-slate-400 transition-transform duration-200'>
					{isOpen ?
						<ChevronDown className='w-6 h-6' />
					:	<ChevronRight className='w-6 h-6' />}
				</div>
			</button>

			{isOpen && (
				<m.div
					id={`section-${category.id}`}
					className='border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white'
					initial={{
						opacity: 0,
						height: 0,
					}}
					animate={{
						opacity: 1,
						height: 'auto',
					}}
					exit={{
						opacity: 0,
						height: 0,
					}}
					transition={{
						duration: 0.3,
						ease: 'easeInOut',
					}}>
					<div className='p-6 space-y-6'>
						{category.subjects.map((subjectItem, index) => (
							<NestedSubjectItem
								key={index}
								subjectItem={subjectItem}
								index={index}
								parentId={category.id}
							/>
						))}

						<div className='mt-8 pt-6 border-t border-slate-200 space-y-6'>
							<div className='space-y-4'>
								<h4 className='text-lg font-serif font-bold text-slate-900'>
									Key Benefits
								</h4>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
									{category.callOuts.map((callOut, index) => (
										<div
											key={index}
											className='flex items-start gap-2 text-slate-700'>
											<div className='w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0' />
											<span className='text-sm leading-relaxed'>{callOut}</span>
										</div>
									))}
								</div>
							</div>

							<div className='bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-5'>
								<div className='relative'>
									<div className='absolute -top-2 -left-1 text-yellow-500 text-4xl font-serif leading-none'>
										"
									</div>
									<div className='pl-6 pr-4'>
										<p className='text-slate-700 italic leading-relaxed text-sm'>
											{category.testimonial}
										</p>
									</div>
									<div className='absolute -bottom-2 right-0 text-yellow-500 text-4xl font-serif leading-none rotate-180'>
										"
									</div>
								</div>
							</div>
						</div>
					</div>
				</m.div>
			)}
		</Card>
	);
}
export function SubjectAccordion({
	categories,
	defaultOpenSections = [],
	className = '',
	onSectionToggle,
}: SubjectAccordionProps) {
	const [openSections, setOpenSections] =
		useState<string[]>(defaultOpenSections);
	const toggleSection = (sectionId: string) => {
		const isCurrentlyOpen = openSections.includes(sectionId);
		const newOpenSections =
			isCurrentlyOpen ?
				openSections.filter((id) => id !== sectionId)
			:	[...openSections, sectionId];
		setOpenSections(newOpenSections);
		onSectionToggle?.(sectionId, !isCurrentlyOpen);
	};
	return (
		<div className={`space-y-6 ${className}`}>
			{categories.map((category) => (
				<AccordionSection
					key={category.id}
					category={category}
					isOpen={openSections.includes(category.id)}
					onToggle={() => toggleSection(category.id)}
				/>
			))}
		</div>
	);
}
export default SubjectAccordion;
