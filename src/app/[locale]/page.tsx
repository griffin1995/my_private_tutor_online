'use client';

import { Avatar, Blockquote } from 'flowbite-react';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { ErrorBoundaryWrapper } from '../../components/boundaries/homepage-error-boundary';
import { CMSArchitectureDashboard } from '../../components/cms-architecture-dashboard';
import { LazyServicesCarousel } from '../../components/dynamic/lazy-loaded-components';
import { PageFooter } from '../../components/layout/page-footer';
import { Navigation } from '../../components/navigation/Navigation';
import { AboutSection } from '../../components/sections/about-section';
import { FounderIntroductionSection } from '../../components/sections/founder-introduction-section';
import { ThreePillarsSection } from '../../components/sections/three-pillars-section';
import { TrustIndicatorsGrid } from '../../components/sections/trust-indicators-grid';
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
import { runtimeMonitor } from '../../lib/cms/cms-runtime-monitor';
import { layoutMonitor } from '../../lib/performance/layout-performance-monitor';
export default function HomePage() {
	const services = getServices();
	const siteBranding = getSiteBranding();
	const founderQuote = getFounderQuote();
	const trustIndicators = getTrustIndicators();
	const testimonialsSchools = getTestimonialsSchools();
	const studentImages = getStudentImages();
	const numStudentImages = Object.keys(studentImages).length;
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			layoutMonitor.startMonitoring();
			runtimeMonitor.startMonitoring();
			const validationStart = performance.now();
			try {
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
						{
							validationResults: cmsDataValidation,
							validationTime,
						},
					);
				}
			} catch (error) {
				runtimeMonitor.recordViolation(
					'MISSING_DATA',
					'HomePage',
					`CMS data access error: ${error}`,
					{
						error: error.toString(),
						stackTrace: error.stack,
					},
				);
			}
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
		<div className='min-h-screen flex flex-col overflow-x-hidden bg-white'>
			{}
			{}
			<Navigation isHomepage={false} />
			<main
				className='flex-1'
				role='main'
				id='main-content'
				tabIndex={-1}>
				<div className='mx-auto'>
					{}
					{}
					{}
					{}
					{}
					{}
					<div
						style={{
							height: 'var(--navbar-height, 5.5rem)',
						}}
						className='lg:hidden border-b border-neutral-300'
					/>
					<div
						style={{
							height: 'var(--navbar-height, 6.25rem)',
						}}
						className='hidden lg:block xl:hidden border-b border-neutral-300'
					/>
					<div
						style={{
							height: 'var(--navbar-height, 7rem)',
						}}
						className='hidden xl:block border-b border-neutral-300'
					/>

					{}
					{}
					{}
					{}
					{}
					{}
					{}
					<section
						id='hero-premium-tutoring-landing-combined'
						className='flex flex-col w-full h-[calc(100dvh-5.5rem)] lg:h-[calc(100dvh-6.25rem)] xl:h-[calc(100dvh-7rem)]'>
						{}
						{}
						{}
						<div className='flex-[0_0_3rem]' />

						{}
						{}
						{}
						{}
						{}
						{}
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

						{}
						<div className='flex-[1.5] flex items-center justify-center'>
							<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
								{}
								{}
								{}
								<h2>We help students place at top 10 UK schools and universities</h2>
								{}
								{}
								<div className='flex justify-center items-center space-x-6 mt-2 sm:mt-3'>
									<div className='w-12 h-px bg-neutral-300' />
									<div className='w-3 h-3 rounded-full bg-neutral-400 shadow-lg' />
									<div className='w-12 h-px bg-neutral-300' />
								</div>
							</div>
						</div>

						{}
						{testimonialsSchools.length > 0 && (
							<div className='flex-[1.5] flex items-center justify-center'>
								{}
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
										animate={{
											x: ['0%', '-50%'],
										}}
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

					{}
					{}
					<ErrorBoundaryWrapper sectionName='About Section'>
						<AboutSection />
					</ErrorBoundaryWrapper>
					{}
					<FounderIntroductionSection />
					{}
					<section
						id='quantifiable-results-documentation'
						className='py-13 lg:py-32'>
						<ErrorBoundaryWrapper sectionName='Results Documentation'>
							<ThreePillarsSection />
						</ErrorBoundaryWrapper>
					</section>
					{}
					<section id='trust-indicators-social-proof'>
						<ErrorBoundaryWrapper sectionName='Trust Indicators'>
							{}
							{}
							{}
							<TrustIndicatorsGrid
								indicators={trustIndicators}
								studentImages={studentImages}
							/>
						</ErrorBoundaryWrapper>
					</section>
					{}
					<section id='who-we-support-services'>
						<ErrorBoundaryWrapper sectionName='Who We Support Services'>
							<LazyServicesCarousel
								services={services}
								studentImages={studentImages}
							/>
						</ErrorBoundaryWrapper>
					</section>
					{}
					{}
					{}
					<section
						id='founder-quote-testimonials'
						className='py-16 lg:py-24 bg-accent-600/15'>
						<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center'>
							<Blockquote>
								{}
								{}
								{}
								<svg
									className='mb-6 h-14 w-14 fill-primary-700'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 18 14'>
									<path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
								</svg>

								{}
								{}
								{}
								{}
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

								{}
								{}
								{}
								{}
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
					</section>
				</div>
			</main>
			{}
			{}
			<PageFooter showContactForm={true} />

			{}
			{}
			{}
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
