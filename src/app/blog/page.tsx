'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Masonry from 'react-masonry-css';

// Blog categories
const categories = [
	{ id: 'all', name: 'All Categories' },
	{ id: '11-plus-exams', name: '11+ Exams' },
	{ id: 'a-levels', name: 'A-Levels' },
	{ id: 'child-wellbeing', name: 'Child Wellbeing' },
	{ id: 'common-entrance', name: 'Common Entrance' },
	{ id: 'exam-preparation', name: 'Exam Preparation' },
	{ id: 'gcses', name: 'GCSEs' },
	{ id: 'home-schooling', name: 'Home Schooling' },
	{ id: 'nursery-pre-prep', name: 'Nursery and Pre-Prep' },
	{ id: 'oxbridge', name: 'Oxbridge' },
	{ id: 'primary', name: 'Primary' },
	{ id: 'school-applications', name: 'School Applications' },
	{ id: 'secondary', name: 'Secondary' },
	{ id: 'summer-learning', name: 'Summer Learning' },
	{ id: 'university-applications', name: 'University Applications' },
];

// Mock blog posts
const blogPosts = [
	{
		id: 1,
		title: "Preparing for Westminster School's New 4+ Entry: A Parent's Guide",
		category: 'nursery-pre-prep',
		image: '/images/students/adult-student-with-teacher.jpg',
		date: '2025-03-15',
	},
	{
		id: 2,
		title: 'Supporting Children with SEND in School: How We Can Help',
		category: 'child-wellbeing',
		image: '/images/students/entrance-exam-preparation-alt.jpg',
		date: '2025-03-14',
	},
	{
		id: 3,
		title: 'How to Write an Effective Personal Essay',
		category: 'university-applications',
		image: '/images/students/entrance-exam-preparation-new.jpg',
		date: '2025-03-13',
	},
	{
		id: 4,
		title:
			'Relocating to London? Discover Premier Areas for Prestigious Schools and Family Life',
		category: 'school-applications',
		image: '/images/students/entrance-exam-preparation.png',
		date: '2025-03-12',
	},
	{
		id: 5,
		title: 'Dyslexia Assessment: What Is It and How Can It Help?',
		category: 'child-wellbeing',
		image: '/images/students/online-homeschooling.jpg',
		date: '2025-03-11',
	},
	{
		id: 6,
		title: 'UCAS Personal Statement Changes in 2025: What Parents Need to Know',
		category: 'university-applications',
		image: '/images/students/online-homeschooling.webp',
		date: '2025-03-10',
	},
	{
		id: 7,
		title: 'How to Maximise Your UCAS Points',
		category: 'a-levels',
		image: '/images/students/primary-school-support.jpg',
		date: '2025-03-09',
	},
	{
		id: 8,
		title: 'How to Help Your Child Navigate Transitions',
		category: 'child-wellbeing',
		image: '/images/students/primary-school-support.webp',
		date: '2025-03-08',
	},
	{
		id: 9,
		title: 'Local Authority Funded Home Schooling for Students with EHCPs',
		category: 'home-schooling',
		image: '/images/students/secondary-school-support.jpg',
		date: '2025-03-07',
	},
	{
		id: 10,
		title: 'Preparing for the ISEB Pre-Tests',
		category: '11-plus-exams',
		image: '/images/students/secondary-school-support.webp',
		date: '2025-03-06',
	},
	{
		id: 11,
		title:
			'Calming the Nervous System: Strategies for Students with ADHD Coping with Exam Stress',
		category: 'exam-preparation',
		image: '/images/students/sen-support.jpg',
		date: '2025-03-05',
	},
	{
		id: 12,
		title: 'What to Expect from an 11+ Interview',
		category: '11-plus-exams',
		image: '/images/students/student-child.jpg',
		date: '2025-03-04',
	},
	{
		id: 13,
		title: 'GCSE Revision Strategies That Actually Work',
		category: 'gcses',
		image: '/images/students/student-inside-holding-pencil.jpg',
		date: '2025-03-03',
	},
	{
		id: 14,
		title: 'Common Entrance Exams Explained: Everything You Need to Know',
		category: 'common-entrance',
		image: '/images/students/student-learning-piano.jpg',
		date: '2025-03-02',
	},
	{
		id: 15,
		title: 'Building Resilience in Children: Essential Life Skills',
		category: 'child-wellbeing',
		image: '/images/students/student-on-laptop-teacher-on-screen.jpg',
		date: '2025-03-01',
	},
	{
		id: 16,
		title: 'Primary School Mathematics: Making Numbers Fun',
		category: 'primary',
		image: '/images/students/student-oxbridge.jpg',
		date: '2025-02-28',
	},
	{
		id: 17,
		title: 'Secondary School Success: Essential Study Skills',
		category: 'secondary',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-27',
	},
	{
		id: 18,
		title: 'Oxbridge Applications: Standing Out in a Competitive Field',
		category: 'oxbridge',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-26',
	},
	{
		id: 19,
		title: 'Summer Learning Activities: Preventing the Summer Slide',
		category: 'summer-learning',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-25',
	},
	{
		id: 20,
		title: 'Independent School Applications: Navigating the Process',
		category: 'school-applications',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-24',
	},
	{
		id: 21,
		title: 'A-Level Subject Combinations: Maximising University Success',
		category: 'a-levels',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-23',
	},
	{
		id: 22,
		title: "Early Years Development: Supporting Your Child's Foundation",
		category: 'nursery-pre-prep',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-22',
	},
	{
		id: 23,
		title: '13+ Scholarship Exams: How to Stand Out',
		category: 'common-entrance',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-21',
	},
	{
		id: 24,
		title: 'Managing Exam Anxiety: Practical Strategies',
		category: 'exam-preparation',
		image: '/images/blog/placeholder.jpg',
		date: '2025-02-20',
	},
];

// Blog Post Card Component with image overlay - dynamic height based on image
function BlogPostCard({ post }: { post: (typeof blogPosts)[0] }) {
	return (
		<m.article
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.4 }}
			className='group cursor-pointer overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow mb-6'>
			<div className='relative overflow-hidden bg-neutral-800'>
				{/* Background Image - natural aspect ratio determines height */}
				<Image
					src={post.image}
					alt={post.title}
					width={800}
					height={600}
					className='w-full h-auto object-cover'
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
				/>

				{/* Dark Overlay */}
				<div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors' />

				{/* Brand Gold Bottom Gradient - Dynamic height (50% of card) */}
				<div className='absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-accent-600/80 via-accent-600/30 to-transparent' />

				{/* Title Overlay */}
				<div className='absolute inset-0 flex items-end justify-center p-4 sm:p-6 lg:p-8'>
					<h3 className='typography-h3 text-white text-center'>{post.title}</h3>
				</div>
			</div>
		</m.article>
	);
}

// Pagination Component
function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}) {
	const getPageNumbers = () => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
		return pages;
	};

	return (
		<div className='flex items-center justify-center gap-2 mt-12 mb-8'>
			{getPageNumbers().map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`min-w-[2.5rem] h-10 px-3 transition-colors ${
						currentPage === page ?
							'bg-primary-700 text-white'
						:	'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
					}`}>
					{page}
				</button>
			))}

			{currentPage < totalPages && (
				<>
					<button
						onClick={() => onPageChange(currentPage + 1)}
						className='px-4 h-10 bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors'>
						Next
					</button>
					<button
						onClick={() => onPageChange(totalPages)}
						className='px-4 h-10 bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors'>
						Last
					</button>
				</>
			)}
		</div>
	);
}

// Masonry breakpoint configuration
const breakpointColumnsObj = {
	default: 3,
	1024: 2,
	640: 1,
};

export default function BlogPage() {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12; // 3 columns x 4 rows

	// Filter blog posts based on selected category
	const filteredPosts = blogPosts.filter((post) => {
		if (selectedCategory === 'all') return true;
		return post.category === selectedCategory;
	});

	// Pagination logic
	const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedPosts = filteredPosts.slice(
		startIndex,
		startIndex + itemsPerPage,
	);

	return (
		<>
			{/* Hero Section */}
			<SimpleHero
				backgroundImage='/images/pexels-polina-tankilevitch-6929349.jpg'
				h1={
					<span className='text-white'>
						Educational <span className='text-accent-600'>Insights</span>
					</span>
				}
				h2='Expert guidance, practical advice, and the latest insights in education from our team of experienced tutors.'
			/>

			{/* Main Content */}
			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='default'
				verticalSpacing='lg'>
				<div>
					{/* Category Filter Dropdown */}
					<div className='mb-8 flex justify-center'>
						<div className='w-full max-w-xs'>
							<label className='block text-sm font-medium mb-2 text-center'>
								Categories
							</label>
							<Select
								value={selectedCategory}
								onValueChange={(value) => {
									setSelectedCategory(value);
									setCurrentPage(1);
								}}>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select a category' />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem
											key={category.id}
											value={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Blog Masonry Grid */}
					<Masonry
						breakpointCols={breakpointColumnsObj}
						className='flex gap-6'
						columnClassName='flex flex-col'>
						{paginatedPosts.map((post) => (
							<BlogPostCard
								key={post.id}
								post={post}
							/>
						))}
					</Masonry>

					{/* No results message */}
					{filteredPosts.length === 0 && (
						<div className='text-center py-16'>
							<p className='text-xl text-neutral-600 mb-4'>
								No articles found in this category
							</p>
							<Button
								variant='outline'
								onClick={() => {
									setSelectedCategory('all');
									setCurrentPage(1);
								}}>
								View all articles
							</Button>
						</div>
					)}

					{/* Pagination */}
					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={setCurrentPage}
						/>
					)}
				</div>
			</PageLayout>
		</>
	);
}
