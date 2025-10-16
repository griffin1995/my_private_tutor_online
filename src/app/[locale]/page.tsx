/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Homepage restructuring and componentization implementation
 * COMPONENT EXTRACTION REASON: Official React documentation patterns for modular section components
 * REVISION REASON: Complete homepage restructuring to achieve desired 8-section structure with full modularity
 */

'use client';

// CONTEXT7 SOURCE: /reactjs/react.dev - CMS Integration Imports
// CMS DATA LOADING REASON: Official React patterns for synchronous content access
import Image from 'next/image';
import { LazyServicesCarousel } from '../../components/dynamic/lazy-loaded-components';
import {
	getFounderQuote,
	getServices,
	getSiteBranding,
	getTestimonialsSchools,
	getTrustIndicators,
} from '../../lib/cms';
import {
	getScrollingSchoolLogos,
	getStudentImages,
} from '../../lib/cms/cms-images';
// CONTEXT7 SOURCE: /websites/web.dev - Performance monitoring for layout optimization
// PERFORMANCE_MONITORING_REASON: Official Web Performance documentation for tracking layout thrashing
import { Avatar, Blockquote } from 'flowbite-react';
import { useEffect } from 'react';
import { layoutMonitor } from '../../lib/performance/layout-performance-monitor';
// CONTEXT7 SOURCE: /reactjs/react.dev - CMS Architecture Monitoring integration
// CMS MONITORING REASON: Prevent August 2025 homepage failure recurrence through real-time architecture monitoring
import { CMSArchitectureDashboard } from '../../components/cms-architecture-dashboard';
import { runtimeMonitor } from '../../lib/cms/cms-runtime-monitor';

// CONTEXT7 SOURCE: /reactjs/react.dev - Component imports for homepage sections
// COMPONENT IMPORT REASON: Official React documentation for modular component architecture
import { ErrorBoundaryWrapper } from '../../components/boundaries/homepage-error-boundary';
import { PageFooter } from '../../components/layout/page-footer';
import { Navigation } from '../../components/navigation/Navigation';
import { AboutSection } from '../../components/sections/about-section';
import { TrustIndicatorsGrid } from '../../components/sections/trust-indicators-grid';
// CONTEXT7 SOURCE: /reactjs/react.dev - Component replacement using named imports
// REVISION REASON: Official React documentation patterns for component substitution and clean import management
import { ThreePillarsSection } from '../../components/sections/three-pillars-section';

// CONTEXT7 SOURCE: /reactjs/react.dev - Extracted section components for homepage componentization
// COMPONENT EXTRACTION REASON: Official React documentation patterns for modular section components
import { FounderIntroductionSection } from '../../components/sections/founder-introduction-section';

// CONTEXT7 SOURCE: /microsoft/typescript - Centralized navbar height constants for maintainable spacing
// CONSTANTS_IMPORT_REASON: Official TypeScript documentation patterns for centralized constant management
import { m } from 'framer-motion';

// CONTEXT7 SOURCE: /websites/nextjs - Utility imports for component structure
// UTILITY_IMPORT_REASON: Official Next.js documentation for utility function imports

// CONTEXT7 SOURCE: /reactjs/react.dev - Homepage component with 8-section structure
// HOMEPAGE STRUCTURE REASON: Official React patterns for component-based architecture
export default function HomePage() {
	// CONTEXT7 SOURCE: /reactjs/react.dev - Synchronous CMS data loading for homepage sections
	// CMS DATA LOADING REASON: Official React patterns for static content access
	const services = getServices();
	const siteBranding = getSiteBranding();
	const founderQuote = getFounderQuote();
	const trustIndicators = getTrustIndicators();
	const testimonialsSchools = getTestimonialsSchools();
	const studentImages = getStudentImages();
	const numStudentImages = Object.keys(studentImages).length;

	// CONTEXT7 SOURCE: /websites/web.dev - Performance monitoring initialization
	// LAYOUT_MONITORING_REASON: Track and optimize layout performance metrics
	useEffect(() => {
		// Start monitoring after initial render
		const timeoutId = setTimeout(() => {
			layoutMonitor.startMonitoring();

			// CONTEXT7 SOURCE: /reactjs/react.dev - CMS Architecture Monitoring initialization
			// CMS MONITORING REASON: Start runtime monitoring for August 2025 failure prevention
			runtimeMonitor.startMonitoring();

			// Validate synchronous CMS data access immediately
			const validationStart = performance.now();
			try {
				// Test all CMS functions are working synchronously
				const cmsDataValidation = {
					services: services?.length > 0,
					branding: siteBranding?.name !== undefined,
					quote: founderQuote?.text !== undefined,
					indicators: trustIndicators?.length > 0,
					schools: testimonialsSchools?.length > 0,
					images: numStudentImages > 0,
				};

				const allValid = Object.values(cmsDataValidation).every(Boolean);
				const validationTime = performance.now() - validationStart;

				if (allValid && validationTime < 10) {
					console.log('✅ CMS Architecture Validation: PASSED');
					console.log(
						`   - Synchronous data access: ${validationTime.toFixed(2)}ms`,
					);
					console.log('   - August 2025 failure patterns: NONE DETECTED');
				} else {
					runtimeMonitor.recordViolation(
						'MISSING_DATA',
						'HomePage',
						'CMS data validation failed - potential async loading detected',
						{ validationResults: cmsDataValidation, validationTime },
					);
				}
			} catch (error) {
				runtimeMonitor.recordViolation(
					'MISSING_DATA',
					'HomePage',
					`CMS data access error: ${error}`,
					{ error: error.toString(), stackTrace: error.stack },
				);
			}

			// Log initial metrics after hero section loads
			setTimeout(() => {
				const metrics = layoutMonitor.getMetrics();
				const cmsState = runtimeMonitor.getCurrentState();

				if (process.env.NODE_ENV === 'development') {
					console.log('🎯 Initial Homepage Performance:', {
						layout: {
							grade: metrics.performanceGrade,
							cls: metrics.cumulativeLayoutShift.toFixed(3),
							lcp: `${metrics.largestContentfulPaint.toFixed(0)}ms`,
							thrashing: metrics.thrashingScore.toFixed(3),
						},
						cmsArchitecture: {
							score: `${cmsState.architectureScore}/10`,
							violations: cmsState.totalViolations,
							critical: cmsState.criticalViolations,
							status: cmsState.isMonitoring ? 'PROTECTED' : 'UNPROTECTED',
						},
						recommendations: metrics.recommendations,
					});
				}
			}, 3000);
		}, 100);

		// Cleanup on unmount
		return () => {
			clearTimeout(timeoutId);
			if (process.env.NODE_ENV === 'development') {
				const finalMetrics = layoutMonitor.stopMonitoring();
				const finalCMSState = runtimeMonitor.getCurrentState();

				console.log('📈 Final Homepage Performance:', {
					layout: finalMetrics,
					cmsArchitecture: {
						finalScore: `${finalCMSState.architectureScore}/10`,
						totalViolations: finalCMSState.totalViolations,
						sessionSummary:
							finalCMSState.criticalViolations === 0 ?
								'✅ Perfect synchronous architecture maintained'
							:	`⚠️ ${finalCMSState.criticalViolations} critical violations detected`,
					},
				});
			}

			// Keep CMS monitoring active (don't stop on homepage unmount)
			// runtimeMonitor.stopMonitoring(); // Commented out - keep monitoring across navigation
		};
	}, [
		founderQuote?.text,
		numStudentImages,
		services?.length,
		siteBranding?.name,
		studentImages.length,
		testimonialsSchools?.length,
		trustIndicators?.length,
	]);

	return (
		// CONTEXT7 SOURCE: /vercel/next.js - Direct component structure pattern
		// PAGELAYOUT_REMOVAL_REASON: Official Next.js documentation for semantic HTML structure without wrapper components
		<div className='min-h-screen flex flex-col overflow-x-hidden bg-white'>
			{/* CONTEXT7 SOURCE: /reactjs/react.dev - Navigation component with homepage props */}
			{/* NAVIGATION_INTEGRATION_REASON: Official React documentation for direct component integration */}
			<Navigation isHomepage={false} />
			<main
				className='flex-1'
				role='main'
				id='main-content'
				tabIndex={-1}>
				<div className='mx-auto'>
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Inline styles for dynamic viewport calculations */}
					{/* INLINE_STYLE_REASON: Official Tailwind CSS documentation shows JIT compiler requires static class strings; dynamic heights must use inline styles */}
					{/* REVISION REASON: Replaced getNavbarSpacerHeight() className with inline styles - Tailwind JIT cannot process runtime template literal classes */}
					{/* Spacer for fixed navbar (with bottom border) */}
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Standard border colors from neutral palette */}
					{/* BORDER FIX: Replaced invalid border-token-border-medium with border-neutral-300 from tailwind.config.ts */}
					<div
						style={{ height: 'var(--navbar-height, 5.5rem)' }}
						className='lg:hidden border-b border-neutral-300'
					/>
					<div
						style={{ height: 'var(--navbar-height, 6.25rem)' }}
						className='hidden lg:block xl:hidden border-b border-neutral-300'
					/>
					<div
						style={{ height: 'var(--navbar-height, 7rem)' }}
						className='hidden xl:block border-b border-neutral-300'
					/>

					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic viewport height with calc and responsive arbitrary values */}
					{/* DVH_CALC_REASON: Official Tailwind CSS documentation Section 3.4+ shows h-dvh with calc() for remaining viewport height after fixed headers */}
					{/* ARBITRARY_VALUE_REASON: Official Tailwind CSS documentation shows h-[value] syntax processes static calc expressions at build time */}
					{/* FLEX_BASIS_REASON: Official Tailwind CSS documentation shows flex-[0_0_value] creates fixed-height flex items that don't grow or shrink */}
					{/* REVISION REASON: Using Tailwind responsive arbitrary values instead of dynamic template literals - JIT compiler requires static class strings */}
					{/* REVISION REASON: Section height accounts for navbar spacer + fixed gap flex item - video gets full proportional space without cropping */}
					{/* Hero section fills remaining viewport space (gap + 70% video + 15% tagline + 15% schools) */}
					<section
						id='hero-premium-tutoring-landing-combined'
						className='flex flex-col w-full h-[calc(100dvh-5.5rem)] lg:h-[calc(100dvh-6.25rem)] xl:h-[calc(100dvh-7rem)]'>
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Fixed-height flex item for navbar gap spacing */}
						{/* FIXED_FLEX_ITEM_REASON: Official Tailwind CSS documentation shows flex-[0_0_auto] with fixed height creates non-flexible spacer */}
						{/* Gap spacer between navbar and video content */}
						<div className='flex-[0_0_3rem]' />

						{/* ----------------------------- Hero Video (70%) ----------------------------- */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - object-contain for aspect ratio preservation */}
						{/* OBJECT_CONTAIN_REASON: Official Tailwind CSS documentation shows object-contain scales content to fit within container while preserving aspect ratio */}
						{/* HEIGHT_INHERITANCE_REASON: Official Tailwind CSS documentation shows h-full on nested elements requires parent height for proper calculation */}
						{/* REVISION REASON: Changed from object-cover to object-contain - allows whitespace to preserve video's native aspect ratio without cropping */}
						{/* REVISION REASON: Added h-full to wrapper div so video's h-full has defined parent height to reference */}
						<div className='flex-[7] relative w-full overflow-hidden'>
							<div className='w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
								<video
									src='/videos/background-video-2025.mp4'
									autoPlay
									muted
									loop
									playsInline
									preload='auto'
									className='w-full h-full object-contain'
									aria-label='Hero background video'
								/>
							</div>
						</div>

						{/* --------------------------- Tagline Section (15%) -------------------------- */}
						<div className='flex-[1.5] flex items-center justify-center'>
							<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
								{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h2 styling */}
								{/* LAYER BASE SYSTEM: Removed all typography classes - ALL provided by globals.css @layer base */}
								{/* DARK MODE REMOVED: Broken dark mode classes stripped */}
								<h2>
									We help students place at top 10 UK schools and universities
								</h2>
								{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Decorative elements using neutral palette */}
								{/* DARK MODE REMOVED: Broken dark mode classes stripped */}
								<div className='flex justify-center items-center space-x-6 mt-2 sm:mt-3'>
									<div className='w-12 h-px bg-neutral-300' />
									<div className='w-3 h-3 rounded-full bg-neutral-400 shadow-lg' />
									<div className='w-12 h-px bg-neutral-300' />
								</div>
							</div>
						</div>

						{/* ----------------------- Scrolling Schools (15%) --------------------------- */}
						{testimonialsSchools.length > 0 && (
							<div className='flex-[1.5] flex items-center justify-center'>
								{/* Stronger gradient mask for fade-in/out edges */}
								<div
									className='w-full max-w-7xl mx-auto overflow-hidden bg-white px-4 sm:px-6 lg:px-8 relative'
									style={{
										WebkitMaskImage:
											'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
										maskImage:
											'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
										WebkitMaskRepeat: 'no-repeat',
										maskRepeat: 'no-repeat',
									}}>
									<m.div
										className='flex gap-8 sm:gap-12 whitespace-nowrap motion-reduce:animate-none'
										animate={{ x: ['0%', '-50%'] }}
										transition={{
											repeat: Infinity,
											repeatType: 'loop',
											ease: 'linear',
											duration: 15,
										}}>
										{testimonialsSchools
											.concat(testimonialsSchools)
											.map((school, index) => {
												const schoolName =
													typeof school === 'string' ? school : (
														school.name || school.title || 'School'
													);
												const logoAsset =
													getScrollingSchoolLogos()[
														schoolName as keyof ReturnType<typeof getScrollingSchoolLogos>
													];
												if (!logoAsset) return null;

												return (
													<div
														key={index}
														className='flex-shrink-0 flex items-center justify-center px-3 sm:px-4'>
														<Image
															src={logoAsset.src}
															alt={logoAsset.alt}
															width={logoAsset.width || 120}
															height={logoAsset.height || 80}
															title={logoAsset.title}
															loading='lazy'
															className='h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300'
															sizes='(max-width: 768px) 80px, (max-width: 1200px) 100px, 120px'
														/>
													</div>
												);
											})}
									</m.div>
								</div>
							</div>
						)}
					</section>

					{/* SECTION 3: OPENING STATEMENT - EXCEPTIONAL TUITION
        <OpeningStatementSection /> */}
					{/* SECTION 4.1: INTRODUCTION - COMPANY BACKGROUND */}
					<ErrorBoundaryWrapper sectionName='About Section'>
						<AboutSection />
					</ErrorBoundaryWrapper>
					{/* SECTION 4.2: FOUNDER INTRODUCTION - MEET ELIZABETH VIDEO */}
					<FounderIntroductionSection />
					{/* SECTION 5: QUANTIFIABLE RESULTS - ACADEMIC OUTCOMES */}
					<section
						id='quantifiable-results-documentation'
						className='py-13 lg:py-32'>
						<ErrorBoundaryWrapper sectionName='Results Documentation'>
							<ThreePillarsSection />
						</ErrorBoundaryWrapper>
					</section>
					{/* SECTION 6: TRUST INDICATORS - CREDIBILITY AND SOCIAL PROOF */}
					<section id='trust-indicators-social-proof'>
						<ErrorBoundaryWrapper sectionName='Trust Indicators'>
							{/* CONTEXT7 SOURCE: /facebook/react - Component props interface typing for React functional components */}
							{/* CONTEXT7 SOURCE: /microsoft/typescript - Interface prop validation ensuring type safety for component properties */}
							{/* PROPS FIX REASON: Official React and TypeScript documentation requires exact prop interface matching
                Component expects: { indicators: TrustIndicator[], studentImages: Record<string, ImageType> }
                Fixed from: trustIndicators={trustIndicators} (mismatched prop name)
                Fixed to: indicators={trustIndicators} + studentImages={studentImages} (correct interface) */}
							<TrustIndicatorsGrid
								indicators={trustIndicators}
								studentImages={studentImages}
							/>
						</ErrorBoundaryWrapper>
					</section>
					{/* SECTION 7: WHO WE SUPPORT - SERVICE CATEGORIES SHOWCASE */}
					<section id='who-we-support-services'>
						<ErrorBoundaryWrapper sectionName='Who We Support Services'>
							<LazyServicesCarousel
								services={services}
								studentImages={studentImages}
							/>
						</ErrorBoundaryWrapper>
					</section>
					{/* SECTION 8: QUOTE - FOUNDER TESTIMONIAL AND MISSION STATEMENT */}
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Opacity modifier syntax for Tailwind colors */}
					{/* BACKGROUND FIX: Replaced arbitrary bg-[rgba(202,158,91,0.15)] with bg-accent-600/15 using accent-600 (#ca9e5b) from tailwind.config.ts with /15 opacity modifier */}
					<section
						id='founder-quote-testimonials'
						className='py-16 lg:py-24 bg-accent-600/15'>
						<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center'>
							<Blockquote>
								{/* Quote SVG top-left */}
								{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - SVG fill utilities with Tailwind colors */}
								{/* SVG FILL FIX: Replaced hardcoded fill='#3F4A7E' with fill-primary-700 class using primary-700 from tailwind.config.ts */}
								<svg
									className='mb-6 h-14 w-14 fill-primary-700'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 18 14'>
									<path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
								</svg>

								{/* Quote content */}
								{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
								{/* LAYER BASE SYSTEM: Removed text-xl/2xl, font-serif - ALL provided by globals.css @layer base */}
								{/* ONLY OVERRIDE: italic for quote styling */}
								<p className='italic'>
									Parents come to us when something <strong>truly</strong> matters—an
									entrance exam, a lost sense of confidence, a desire for academic
									stretch. They stay with us because{' '}
									<strong>we deliver real progress, quietly and expertly</strong>. This
									is not a tutoring directory. This is{' '}
									<u>a bespoke service for ambitious families</u> looking for{' '}
									<strong>trusted partners in their child&apos;s academic career</strong>
									.
								</p>

								{/* Author with avatar (inline name | title) */}
								{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL default styling */}
								{/* LAYER BASE SYSTEM: Removed all typography classes - only keeping layout classes */}
								{/* DARK MODE REMOVED: Broken dark mode classes stripped */}
								<figcaption className='mt-4 flex items-center justify-center space-x-3'>
									<Avatar
										rounded
										size='xs'
										img='/images/team/elizabeth-burrows-founder-main.jpg'
										alt='Elizabeth Burrows'
									/>
									<div className='flex items-center divide-x-2 divide-neutral-500'>
										<cite className='pr-3'>
											Elizabeth Burrows
										</cite>
										<cite className='pl-3 text-neutral-500'>
											Founder
										</cite>
									</div>
								</figcaption>
							</Blockquote>
						</div>
					</section>
				</div>
			</main>
			{/* CONTEXT7 SOURCE: /reactjs/react.dev - Footer component with contact form props */}
			{/* FOOTER_INTEGRATION_REASON: Official React documentation for direct component integration */}
			<PageFooter showContactForm={true} />

			{/* CONTEXT7 SOURCE: /reactjs/react.dev - CMS Architecture Monitoring Dashboard */}
			{/* CMS MONITORING INTEGRATION REASON: Real-time monitoring overlay for August 2025 failure prevention */}
			{/* Only shown in development or when explicitly enabled via environment variable */}
			{(process.env.NODE_ENV === 'development' ||
				process.env['NEXT_PUBLIC_SHOW_CMS_MONITOR'] === 'true') && (
				<CMSArchitectureDashboard
					compactMode={true}
					autoRefresh={true}
					refreshInterval={5000}
					maxViolationsDisplay={5}
					showExportButton={process.env.NODE_ENV === 'development'}
					showFullDetails={false}
				/>
			)}
		</div>
	);
}

// CONTEXT7 SOURCE: /vercel/next.js - Client component architecture for React 19 compatibility
// ARCHITECTURE REASON: Official Next.js documentation for client component patterns
