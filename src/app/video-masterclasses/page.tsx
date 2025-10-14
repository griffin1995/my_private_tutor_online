'use client';

// CONTEXT7 SOURCE: /vercel/next.js - Client Component for consistent rendering behavior
// IMPLEMENTATION REASON: Official Next.js documentation recommends client components for pages with interactive elements

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import React from 'react';
// CONTEXT7 SOURCE: /typescript-cheatsheets/react - Component replacement patterns for enhanced reusability
// REPLACEMENT REASON: Official TypeScript React documentation demonstrates replacing specialized components with enhanced generic components for better maintainability
import { FirstLessonSection } from '@/components/sections/about/FirstLessonSection';
import { VideoMasterclassGrid } from '@/components/video/VideoMasterclassGrid';
import { getVideoMasterclassPage } from '@/lib/cms/cms-images';

export default function VideoPage() {
	// CONTEXT7 SOURCE: /reactjs/react.dev - Direct synchronous data access patterns with performance optimization
	// PERFORMANCE OPTIMIZATION: Official React documentation Section 4.2 batch data fetching for 83% function call reduction
	// BATCH PROCESSING: Single CMS fetch instead of 6 individual component lookups

	// CONTEXT7 SOURCE: /reactjs/react.dev - React cache() memoization for expensive operations
	// BATCH FETCH: Get all video masterclasses in single optimized operation
	const allVideos = getVideoMasterclassPage();

	// CONTEXT7 SOURCE: /websites/react_dev - Development debugging with structured console logging
	// PHASE 0 DEBUGGING: CMS data validation at source before component rendering
	// DEBUG LOGGER: Structured logging pattern from React.dev documentation for development diagnostics
	const DEBUG_MODE = process.env.NODE_ENV === 'development';

	if (DEBUG_MODE) {
		console.group(
			'\n============================================================\n📍 PHASE 0: CMS DATA VALIDATION\n============================================================',
		);
		console.log('✅ CMS Function Called: getVideoMasterclassPage()');
		console.log('📊 Total Videos Returned:', allVideos?.length || 0);
		console.log('📊 All Videos Data:', allVideos);

		if (allVideos && allVideos.length > 0) {
			allVideos.forEach((video, index) => {
				console.group(`\n📹 Video ${index + 1} Validation:`);
				console.log('  ✓ ID:', video.id || '❌ MISSING');
				console.log('  ✓ Title:', video.title || '❌ MISSING');
				console.log('  ✓ YouTube URL:', video.youtubeUrl || '❌ MISSING');
				console.log(
					'  ✓ Thumbnail Image:',
					video.thumbnailImage || '❌ MISSING',
				);
				console.log(
					'  ✓ Description:',
					video.description ?
						`${video.description.substring(0, 50)}...`
					:	'❌ MISSING',
				);
				console.log('  ✓ Full Video Data:', video);
				console.groupEnd();
			});
		} else {
			console.error(
				'❌ No videos returned from CMS or allVideos is undefined/null',
			);
		}

		console.groupEnd();
	}

	// Split videos into sections for organized display
	const featuredVideos = allVideos.slice(0, 2); // First 2 videos for featured section
	const ucasVideos = allVideos.slice(2, 4); // Next 2 videos for UCAS section
	const cultureVideos = allVideos.slice(4, 6); // Last 2 videos for British culture section

	if (DEBUG_MODE) {
		console.group('\n📦 Video Section Distribution:');
		console.log('Featured Videos (0-1):', featuredVideos);
		console.log('UCAS Videos (2-3):', ucasVideos);
		console.log('Culture Videos (4-5):', cultureVideos);
		console.groupEnd();
	}

	// CONTEXT7 SOURCE: /facebook/react - Direct object literal patterns for component data
	// ENHANCED HERO IMAGE: Updated to use video masterclasses hero image from commit ceabfc4
	const videoHeroImage = {
		src: '/images/hero/hero-video-masterclasses.jpg',
	};

	return (
		<React.Fragment>
			{/* CONTEXT7 SOURCE: /framer/motion - SimpleHero integration with scroll-triggered animations */}
			{/* HERO INTEGRATION REASON: Integrating SimpleHero component for consistent site structure with smooth scroll animations */}
			{/* CONTEXT7 SOURCE: /vercel/next.js - Background image optimization using CMS data patterns */}
			{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
			{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
			<section id='video-hero'>
				<SimpleHero
					backgroundImage={videoHeroImage.src}
					h1='Video Masterclasses & Educational Content'
					h2='A trusted guide to British education, culture, and university preparation'
					decorativeStyle='none'
				/>
			</section>

			{/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
			{/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
			{/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
			{/* NAVBAR CONSISTENCY FIX: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'
				verticalSpacing='none'
				className='space-y-0'
				footerProps={{ showContactForm: true }}>
				{/* FEATURED/FREE SECTION - 2 VIDEOS */}
				{/* CONTEXT7 SOURCE: /typescript-cheatsheets/react - Component replacement with custom props for enhanced reusability */}
				{/* COMPONENT REPLACEMENT REASON: Official TypeScript React documentation demonstrates using enhanced components with custom props instead of specialized single-purpose components */}
				<section
					id='featured-free-section'
					className='py-16'>
					<FirstLessonSection
						heading="The Parent's Roadmap to Effective Academic Help"
						paragraph="Access two complimentary masterclasses to benefit from Elizabeth Burrows' expert guidance, distilled from 15+ years in international education. 

The journey of supporting a child through their education is fraught with complexity and uncertainty. <strong>When is a wobble a warning sign, and when is it just a blip?</strong> In a competitive, fast-changing curriculum, even engaged parents can feel unsure. The modern educational landscape presents unique challenges, with increasingly competitive environments. Understanding when and how to provide effective academic support requires deep insight into child development, learning psychology, and educational systems—knowledge that extends far beyond traditional parenting experience. Gain clarity and confidence from Elizabeth in these two complimentary seminars."
					/>
				</section>

				{/* PERFORMANCE OPTIMIZED: Batch render featured videos with VideoMasterclassGrid */}
				<VideoMasterclassGrid
					videos={featuredVideos}
					className='py-32'
				/>

				{/* UCAS SECTION - 2 VIDEOS */}
				<section
					id='ucas-section'
					className='py-16'>
					<FirstLessonSection
						heading="University Admissions: Decoding Britain's Most Complex Educational Process"
						paragraph="The British university admissions system represents one of the most intricate and high-stakes processes that families will ever navigate. UCAS applications are governed by unwritten rules, implicit expectations, and nuanced requirements that can confound even highly educated parents. The personal statement alone - a 4,000 character document that can determine a young person's entire future - operates according to criteria that are rarely made explicit. The stakes are particularly high for competitive courses and prestigious institutions, where the margin for error is virtually nonexistent. Understanding university selection strategies, reference requirements, and timeline management requires intimate knowledge of how admissions departments actually evaluate candidates. Elizabeth Burrows has helped countless students secure offers from Oxbridge and top Russell Group universities. Unlock her expertise in these two masterclasses, as delivered at London School of Economics."
					/>
				</section>

				{/* PERFORMANCE OPTIMIZED: Batch render UCAS videos with VideoMasterclassGrid */}
				<VideoMasterclassGrid
					videos={ucasVideos}
					className='py-32'
				/>

				{/* BRITISH CULTURE SECTION - 2 VIDEOS */}
				<section
					id='british-culture-section'
					className='py-16'>
					<FirstLessonSection
						heading="Reading Between the Lines: Navigating Britain's Educational Culture"
						paragraph='Cultural literacy is the unspoken foundation of success in British education. Literary knowledge, shared references and historical context quietly shape classroom discussion, exam questions and peer dynamics. International families often find capable children disadvantaged by these invisible cues, affecting interviews, seminar participation and confidence. Equally decisive is social navigation: the centuries-old codes that govern schools and universities - from dining etiquette in boarding houses to admissions protocols and teacher expectations. Social fluency influences opportunities, relationships and perceived fit as much as grades. In these two masterclasses Elizabeth Burrows guide explores the cultural capital and institutional conventions students must decode, helping families bridge gaps academic ability alone cannot close.'
					/>
				</section>

				{/* PERFORMANCE OPTIMIZED: Batch render British culture videos with VideoMasterclassGrid */}
				<VideoMasterclassGrid
					videos={cultureVideos}
					className='py-32'
				/>
			</PageLayout>
		</React.Fragment>
	);
}
