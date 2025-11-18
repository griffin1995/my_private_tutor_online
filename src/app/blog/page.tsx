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
import Link from 'next/link';
import { useState } from 'react';
import Masonry from 'react-masonry-css';
import { blogCategories, blogPosts } from '../../data/blog-posts';

// Blog Post Card Component with image overlay - RESTORED PERFECT STYLING
function BlogPostCard({ post }: { post: (typeof blogPosts)[0] }) {
	// Fallback image for posts without images
	const fallbackImage = '/images/blog/education-insights-header.jpg';
	const imageToUse = post.image && post.image.trim() !== '' ? post.image : fallbackImage;

	return (
		<Link href={`/blog/${post.slug}`}>
			<m.article
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-50px' }}
				transition={{ duration: 0.4 }}
				className='group cursor-pointer overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow mb-6'>
				<div className='relative overflow-hidden bg-neutral-800'>
					{/* Background Image - natural aspect ratio determines height */}
					<Image
						src={imageToUse}
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
		</Link>
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
	768: 2,
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
				backgroundImage='/images/blog/education-insights-header.jpg'
				h1={
					<span className='text-white'>
						Education <span className='text-accent-600'>Insights</span>
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
							<label htmlFor='category-select' className='block text-sm font-medium mb-2 text-center'>
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
									{blogCategories.map((category) => (
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