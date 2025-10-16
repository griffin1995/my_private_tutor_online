'use client';

import { SimpleHero } from '@/components/layout/simple-hero';
import EliteSchoolsCarousel from '@/components/testimonials/elite-schools-carousel';
import { TestimonialsFilter } from '@/components/testimonials/testimonials-filter';
import { TestimonialsGrid } from '@/components/testimonials/testimonials-grid';
import { BrandMessageSection } from '@/components/sections/brand-message-section';
import { TestimonialsIntro } from '@/components/testimonials/testimonials-intro';
import { TestimonialsSection } from '@/components/sections/about/testimonials-section';
import { useCallback, useMemo, useState } from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import {
	getTestimonialsCarouselConfig,
	getTextTestimonials,
} from '@/lib/cms/cms-content';
export default async function TestimonialsPage({}: {
	params: Promise<{
		locale: string;
	}>;
}) {
	const carouselConfig = getTestimonialsCarouselConfig();
	const testimonialsWithoutVideo = getTextTestimonials();
	try {
	} catch (error) {
		console.error('Error loading testimonials:', error);
	}
	const optimizedTextTestimonialsData = useMemo(() => {
		return testimonialsWithoutVideo.map((testimonial) => ({
			id: `text-testimonial-${testimonial.author.replace(/\s+/g, '-').toLowerCase()}`,
			quote: testimonial.quote,
			author: testimonial.author,
			role: testimonial.role,
			avatar: testimonial.avatar,
			rating: testimonial.rating,
			featured: false,
			expandable: testimonial.quote.length > 150,
			fullQuote: testimonial.quote.length > 150 ? testimonial.quote : undefined,
			verificationStatus: testimonial.verified ? 'verified' : 'unverified',
			date: testimonial.date || new Date().toISOString(),
			location: testimonial.location,
			subject: testimonial.subject,
			result: testimonial.result,
			helpfulVotes:
				(Math.abs(testimonial.author.charCodeAt(0) + testimonial.quote.length) %
					25) +
				5,
			category:
				testimonial.category ?
					testimonial.category.charAt(0).toUpperCase() +
					testimonial.category.slice(1)
				:	testimonial.category,
			categories: testimonial.subject ? [testimonial.subject] : undefined,
			hasVideo: false,
		}));
	}, [testimonialsWithoutVideo]);
	const dynamicFilterConfig = useMemo(() => {
		const uniqueCategories = [
			...new Set(
				testimonialsWithoutVideo
					.map((t) => t.category)
					.filter(Boolean)
					.map((category) => category.charAt(0).toUpperCase() + category.slice(1)),
			),
		].sort();
		const uniqueSubjects = [
			...new Set(
				testimonialsWithoutVideo
					.map((t) => t.subject)
					.filter((subject): subject is string => Boolean(subject)),
			),
		].sort();
		const uniqueLocations = [
			...new Set(
				testimonialsWithoutVideo
					.map((t) => t.location)
					.filter((location): location is string => Boolean(location)),
			),
		].sort();
		const years = testimonialsWithoutVideo
			.map((t) =>
				t.date ? new Date(t.date).getFullYear() : new Date().getFullYear(),
			)
			.filter(Boolean)
			.map(Number);
		const config = {
			categories: uniqueCategories,
			subjects: uniqueSubjects,
			gradeOptions: ['A*', 'A', 'B', 'C', 'Grade 7', 'Grade 8', 'Grade 9'],
			locationOptions: uniqueLocations,
			yearRange: {
				min: Math.min(...years, 2020),
				max: Math.max(...years, new Date().getFullYear()),
			},
		};
		return config;
	}, [testimonialsWithoutVideo]);
	const [filteredTextTestimonials, setFilteredTextTestimonials] = useState<
		unknown[]
	>(() => optimizedTextTestimonialsData);
	const handleTextFilterChange = useCallback(
		(newFilteredTestimonials: unknown[]) => {
			setFilteredTextTestimonials(newFilteredTestimonials);
		},
		[],
	);
	return (
		<>
			{}
			{}
			{}
			{}
			<section id='testimonials-hero'>
				<SimpleHero
					backgroundImage='/images/hero/child_book_and_laptop.avif'
					h1='Student & Parent Testimonials'
					h2='Read testimonials from families who have achieved exceptional results with My Private Tutor Online.'
					decorativeStyle='lines'
				/>
			</section>

			{}
			{}
			{}
			{}
			{}
			<section
				id='testimonials-mission'
				className='mt-16'>
				<BrandMessageSection
					quote='We provide exceptional tuition that helps students excel academically and thrive personally, opening doors to greater opportunities—at school and in life.'
					backgroundColor='bg-white'
					className=''
					useHighlighting={true}
					showAuthorImage={false}
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
				{}
				{}
				<TestimonialsIntro className='' />

				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				<section id='about-testimonials'>
					<TestimonialsSection />
				</section>

				{}
				{testimonialsWithoutVideo.length > 0 && (
					<>
						{}
						{}
						{}
						{}
						{}
						{}
						{}
						{}
						<section id='testimonials-filter'>
							<div className='bg-white py-6'>
								<div className='container mx-auto px-6'>
									<TestimonialsFilter
										testimonials={testimonialsWithoutVideo}
										onFilterChange={handleTextFilterChange}
										filterConfig={dynamicFilterConfig}
										showSearch={true}
										showAdvancedFilters={true}
										enableAnalytics={true}
									/>
								</div>
							</div>
						</section>

						{}
						{}
						{}
						{}
						{}
						{}
						<section
							id='testimonials-grid'
							className='relative bg-slate-50/60 py-12 lg:py-16'>
							{}
							<div
								className='absolute inset-0 opacity-[0.01] pointer-events-none'
								style={{
									backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M25 5l-5 5L15 5l5-5L25 5zm10 10l-5 5L25 15l5-5L35 20z'/%3E%3C/g%3E%3C/svg%3E")`,
									backgroundSize: '50px 50px',
								}}
							/>

							{}
							{}
							<div className='relative max-w-6xl mx-auto'>
								{}
								{}
								<TestimonialsGrid
									testimonials={filteredTextTestimonials}
									layout='grid'
									columns={3}
									animationStyle='fade'
									showLoadMore={true}
									enableVirtualScroll={false}
									showLayoutControls={true}
									enableSorting={true}
									className='px-6'
								/>
							</div>
						</section>
					</>
				)}

				{}
				{}
				{}
				{}
				{}
				<section id='testimonials-schools-carousel'>
					<EliteSchoolsCarousel
						schools={carouselConfig.schools}
						title={carouselConfig.title}
						description={carouselConfig.description}
						displayMode={carouselConfig.displayMode}
						showControls={carouselConfig.showControls}
						showModal={carouselConfig.showModal}
						autoPlay={carouselConfig.autoPlay}
						pauseOnHover={carouselConfig.pauseOnHover}
						animationSpeed={carouselConfig.animationSpeed}
						backgroundVariant={carouselConfig.backgroundVariant}
						showSearch={false}
						showCategoryFilter={false}
					/>
				</section>

				{}
			</PageLayout>
		</>
	);
}
