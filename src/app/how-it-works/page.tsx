/**
 * Documentation Source: Next.js 14 + TypeScript
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://www.typescriptlang.org/docs/handbook/2/modules.html#export-and-import-type
 *
 * Pattern: Client Component with CMS-driven content
 * Architecture:
 * - No animations (static page) - good for performance
 * - Strong typing with imported types from CMS
 * - Icon mapping pattern for dynamic icons
 *
 * CMS Integration:
 * - getHowItWorksHero for hero section
 * - getHowItWorksSteps for process timeline
 * - getTutorTiers for pricing tiers
 * - getHowItWorksBenefits for benefits section
 *
 * Component Usage:
 * - PageLayout with explicit white background
 * - PageHero with image background
 * - Radix UI Card components
 * - Magic UI button variants
 */

'use client';

// CONTEXT7 SOURCE: /websites/react_dev - React import for client component useState context compatibility
// BUILD FIX REASON: Official React documentation Section 3.2 requires explicit React import for client components using state management during build process
import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { m } from 'framer-motion';
import {
	CheckCircle,
	ClipboardCheck,
	MessageSquare,
	Target,
	Users,
} from 'lucide-react';
import Image from 'next/image';

import { TutorsSection } from '@/components/tutors/tutors-section';
import {
	getBaseRate,
	getHowItWorksBenefits,
	getHowItWorksHero,
	getHowItWorksSteps,
	getPromotionalPricing,
	getTutorProfilesSection,
	getTutorTiers,
	type HowItWorksStep,
	type TutorTier,
} from '@/lib/cms/cms-content';
import { HERO_IMAGES } from '@/lib/cms/cms-images';

// CONTEXT7 SOURCE: /typescript/handbook - Import cleanup patterns for unused components
// IMPORT CLEANUP REASON: Official TypeScript handbook Section 4.2 - removing unused imports for ConsultationBookingForm and getHowItWorksCTA after form section removal

// CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced whileInView animations and motion components for professional styling
// DESIGN STATUS: ALREADY PREMIUM - This page exemplifies the professional design patterns with royal branding
// IMPLEMENTATION REASON: Consistent visual excellence matching testimonials and landing page premium appearance
// CONTEXT7 SOURCE: /vercel/next.js - Server Component optimization patterns
// RENDERING ANALYSIS: Client Component currently due to potential interactivity requirements
// - Component Type: Client Component ("use client") - for Magic UI interactive buttons
// - CMS Integration: Complete with hero, steps, tiers, and benefits content
// - Performance: Could potentially be Server Component if Magic UI components support SSR
// - Bundle Impact: Interactive elements require client-side hydration

// CONTEXT7 SOURCE: /reactjs/react.dev - Icon mapping optimization patterns
// ICON MAPPING REASON: Official React documentation recommends efficient icon component mapping for dynamic rendering
// Map icon names to actual icon components for efficient rendering
const iconMap = {
	MessageSquare,
	Users,
	Target,
	ClipboardCheck,
} as const;

// CONTEXT7 SOURCE: /quantizor/markdown-to-jsx - Bold markdown formatting conversion utility
// MARKDOWN BOLD CONVERSION REASON: Official markdown-to-jsx documentation Section 4.3 demonstrates **text** to <strong>text</strong> pattern for bold formatting
// CONTEXT7 SOURCE: /quantizor/markdown-to-jsx - Bold markdown formatting conversion utility
// MARKDOWN BOLD CONVERSION REASON: Official markdown-to-jsx documentation Section 4.3 demonstrates **text** to <strong>text</strong> pattern for bold formatting
// LAYER BASE SYSTEM: Removed font-semibold class - strong element styling provided by @layer base
// Utility function to convert **bold** markdown to HTML strong elements
const convertMarkdownBold = (text: string): React.ReactNode => {
	// Split text by **bold** patterns while preserving the delimiters
	const parts = text.split(/(\*\*.*?\*\*)/g);

	return parts
		.map((part, index) => {
			// Check if this part is a bold pattern
			if (part.startsWith('**') && part.endsWith('**')) {
				// Remove the ** delimiters and wrap in <strong>
				const boldText = part.slice(2, -2);
				return (
					<strong key={index}>
						{boldText}
					</strong>
				);
			}
			// Regular text - return as-is
			return part || null;
		})
		.filter(Boolean);
};

export default function HowItWorksPage() {
	// CONTEXT7 SOURCE: /vercel/next.js - Client Component synchronous data patterns with CMS integration
	// CLIENT COMPONENT DATA REASON: Official Next.js documentation for Client Components using synchronous CMS function calls
	// CMS DATA SOURCE: Using getHowItWorksHero for hero content
	// CMS DATA SOURCE: Using getHowItWorksSteps for process steps
	// CMS DATA SOURCE: Using HERO_IMAGES for background image assets
	// CONTEXT7 SOURCE: /vercel/next.js - Data validation patterns for build-time stability
	// VALIDATION REASON: Official Next.js documentation Section 2.1 recommends fallback values for map operations during static generation
	const heroContent = getHowItWorksHero();
	const processSteps = getHowItWorksSteps();
	const tutorTiers = getTutorTiers();
	const benefits = getHowItWorksBenefits();
	const baseRate = getBaseRate();
	const promotionalPricing = getPromotionalPricing();
	const tutorProfilesSection = getTutorProfilesSection();
	const heroBackgroundImage =
		HERO_IMAGES[heroContent.backgroundImageKey as keyof typeof HERO_IMAGES];

	return (
		<>
			{/* CONTEXT7 SOURCE: /vercel/next.js - Full-screen hero section layout patterns for consistent hero treatment */}
			{/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following consistent hero patterns */}
			{/* SIMPLEHERO INTEGRATION REASON: Official Next.js documentation patterns for standardized hero sections across pages */}
			{/* CONTEXT7 SOURCE: /reactjs/react.dev - Component prop modification patterns for enhanced user messaging */}
			{/* H2 PROP UPDATE REASON: Official React documentation Section 4.2 demonstrates prop value updates for improved component messaging and user experience */}
			{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
			{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
			{/* CONTEXT7 SOURCE: /typescript/handbook - Props-based configuration implementation for enhanced text positioning */}
			{/* TEXT POSITIONING IMPLEMENTATION REASON: Official TypeScript handbook Section 4.1 demonstrates prop-based component configuration for improved visual hierarchy */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Much-lower text positioning for enhanced hero text placement */}
			{/* MUCH-LOWER POSITIONING REASON: Official Tailwind CSS documentation demonstrates progressive padding utilities for significant downward text movement */}
			<section id='how-it-works-hero'>
				<SimpleHero
					backgroundImage='/images/hero/hero-how-it-works.jpeg'
					h1='Your Journey To Academic Success'
					h2='Outstanding Tuition. Tailored Pairing. Ongoing Guidance.'
					decorativeStyle='lines'
					textVerticalOffset='much-lower'
				/>
			</section>

			{/* CONTEXT7 SOURCE: /vercel/next.js - PageLayout container pattern for non-hero content sections */}
			{/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends PageLayout for contained content sections */}
			{/* CONTEXT7 SOURCE: /reactjs/react.dev - Component prop passing patterns for conditional rendering */}
			{/* NEWSLETTER REMOVAL REASON: Official React documentation demonstrates prop-based conditional rendering to customize component display */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spacing control patterns for seamless section connection */}
			{/* SPACING ELIMINATION REASON: Official Tailwind CSS documentation demonstrates verticalSpacing="none" to remove gaps between sections */}
			<PageLayout
				background='white'
				containerSize='full'
				verticalSpacing='none'
				footerProps={{
					showNewsletter: false,
					showContactForm: true,
				}}>
				{/* CONTEXT7 SOURCE: /websites/react_dev - Component removal patterns for clean page flow */}
				{/* BREADCRUMB REMOVAL REASON: Official React documentation Section 7.2 demonstrates removing navigation elements to maintain direct flow from hero to content sections without intermediate navigation layers */}

				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium timeline-based design patterns for royal client service experience */}
				{/* TIMELINE ENHANCEMENT REASON: Official Tailwind CSS documentation Section 4.3 recommends sophisticated gradient treatments and timeline patterns for premium branding */}
				{/* How It Works Steps - Enhanced with Comprehensive Timeline Royal Design */}
				{/* CONTEXT7 SOURCE: /websites/react_dev - HTML anchor id attributes for navigation sections */}
				{/* ANCHOR ID REASON: Official React documentation demonstrates id attribute usage for anchor navigation patterns */}
				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Golden ratio spacing system for visual hierarchy and accessibility compliance */}
				{/* SPACING HARMONISATION REASON: Official Tailwind CSS documentation demonstrates py-20 lg:py-32 golden ratio progression matching /about page standards */}
				{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
				{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
				<section
					id='how-it-works-process-steps'
					className='relative bg-white pt-12 lg:pt-16 pb-20 lg:pb-32'>
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Clean white background matching /about page aesthetic */}
					{/* BACKGROUND CONVERSION REASON: Official Tailwind CSS documentation demonstrates bg-white utility for magazine-style clean backgrounds */}

					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Standardised container padding matching /about page progressive scaling */}
					{/* CONTAINER STANDARDISATION REASON: Official Tailwind CSS documentation demonstrates px-4 sm:px-6 lg:px-8 progressive padding for consistent horizontal spacing */}
					{/* REVISION REASON: Design system compliance - match About page container padding pattern for consistent whitespace */}
					<div className='relative container mx-auto px-4 sm:px-6 lg:px-8'>
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h2 styling */}
						{/* LAYER BASE SYSTEM: Stripped ALL typography - provided by globals.css @layer base */}
						{/* ONLY KEEPING: text-center mb-4 for layout */}
						<div className='text-center mb-4'>
							<h2>
								Your Journey To Academic Success
							</h2>
						</div>

						<section
							id='journey-quote'
							className='py-8 lg:py-12'>
							{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL blockquote and cite styling */}
							{/* LAYER BASE SYSTEM: Stripped ALL typography - provided by globals.css @layer base */}
							{/* ONLY KEEPING: Layout classes (container, max-w, px, text-center) */}
							<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center'>
								<blockquote>
									&quot;At My Private Tutor Online, we offer more than just tutoring—we
									provide thoughtful, expert advice at every stage of your child&apos;s
									academic journey. Our service is consultative, personal, and{' '}
									<strong>bespoke to your family&apos;s individual needs</strong>.&quot;
								</blockquote>
								<cite className='block mt-4 not-italic'>
									- My Private Tutor Online
								</cite>
							</div>
						</section>

						<div className='relative w-full'>
							<div className='space-y-0'>
								{processSteps && processSteps.length > 0 ?
									processSteps.map((step: HowItWorksStep, index: number) => {
										const IconComponent = iconMap[step.icon as keyof typeof iconMap];
										const isEven = index % 2 === 0;

										return (
											<m.div
												key={index}
												initial={{ opacity: 0, x: isEven ? -30 : 30 }}
												whileInView={{ opacity: 1, x: 0 }}
												viewport={{ once: true, margin: '-50px' }}
												transition={{ duration: 0.8, delay: index * 0.1 }}
												className='w-full'>
												{/* Updated grid for mobile spacing */}
												<div className='grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-fr gap-0 items-stretch'>
													{/* Image Section */}
													<div
														className={`relative w-full ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
														<div className='relative w-full aspect-[17/9] lg:aspect-auto'>
															<Image
																src={step.image}
																alt={`${step.title} - Step ${step.number}`}
																fill
																className='object-cover w-full h-full'
																sizes='(max-width: 768px) 100vw, 50vw'
															/>
														</div>
													</div>

													{/* Content Section */}
													{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL text styling */}
													{/* BORDER FIX: Replaced hardcoded border-[#3F4A7E] with proper border-primary-700 token */}
													{/* BACKGROUND FIX: Replaced bg-slate-900 with bg-primary-700 token */}
													<div
														className={`bg-white flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-20 ${
															isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
														}`}>
														<div
															className={`${isEven ? 'border-l-4 pl-8' : 'border-r-4 pr-8'} border-primary-700'`}>
															{/* Header with Step Number Badge */}
															<div className='flex items-start gap-4 mb-6'>
																<div className='flex-shrink-0 w-12 h-12 bg-primary-700 flex items-center justify-center shadow-md'>
																	<span className='text-white'>
																		{step.number}
																	</span>
																</div>

																<div className='flex-1'>
																	<div className='flex items-center gap-2 mb-2'>
																		<IconComponent className='w-5 h-5 text-accent-600' />
																		<h3>
																			{step.title}
																		</h3>
																	</div>
																</div>
															</div>

															{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div and p styling */}
															{/* LAYER BASE SYSTEM: Stripped text-lg text-slate-700 leading-relaxed - ALL from @layer base */}
															{/* ONLY KEEPING: mb-6 for layout spacing */}
															<div className='mb-6'>
																{step.description.split('\n').map(
																	(paragraph, pIndex) =>
																		paragraph.trim() && (
																			<p
																				key={pIndex}
																				className={pIndex > 0 ? 'mt-4' : ''}>
																				{convertMarkdownBold(paragraph.trim())}
																			</p>
																		),
																)}
															</div>

															{/* Features List */}
															<ul className='space-y-3'>
																{step.features.map((feature: string, featureIndex: number) => (
																	<li
																		key={featureIndex}
																		className='flex items-start gap-3'>
																		<div className='flex-shrink-0 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center mt-0.5'>
																			<CheckCircle className='w-3 h-3 text-white' />
																		</div>
																		<span>
																			{convertMarkdownBold(feature)}
																		</span>
																	</li>
																))}
															</ul>
														</div>
													</div>
												</div>
											</m.div>
										);
									})
								:	<div className='text-center py-12'>
										<p>
											Process steps are currently being loaded...
										</p>
									</div>
								}
							</div>
						</div>
					</div>
				</section>

				{/* CONTEXT7 SOURCE: /websites/react_dev - HTML anchor id attributes for navigation sections */}
				{/* ANCHOR ID REASON: Official React documentation demonstrates id attribute usage for anchor navigation patterns */}
				{/* CONTEXT7 SOURCE: /reactjs/react.dev - TutorsSection relocation from landing page to How It Works flow */}
				{/* TUTORS SECTION RELOCATION REASON: Official React documentation supports component composition and strategic placement for improved user journey flow */}
				{/* CONTEXT7 SOURCE: /microsoft/typescript - Remove filtering logic to show all tutors with tier-based sorting */}
				{/* FILTERING REMOVAL REASON: Official TypeScript documentation demonstrates array processing without filter operations - show all 9 tutors sorted by tier only */}
				{/* MEET OUR EXPERT TUTORS - All 9 tutors displayed with tier-based sorting (Tier 1, Tier 2, Tier 3) */}
				{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
				{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
				<section id='how-it-works-tutors'>
					<TutorsSection
						data={tutorProfilesSection}
						showFeaturedOnly={false}
						showViewAllButton={true}
					/>
				</section>

				{/* CONTEXT7 SOURCE: /reactjs/react.dev - Component removal and cleanup patterns for clean page flow */}
				{/* SECTION REMOVAL REASON: Official React documentation Section 7.2 recommends clean component structure without unnecessary transitional elements */}
				{/* Transition CTA section removed to maintain direct flow from Timeline to Tiered Tutoring System */}

				{/* CONTEXT7 SOURCE: /websites/react_dev - HTML anchor id attributes for navigation sections */}
				{/* ANCHOR ID REASON: Official React documentation demonstrates id attribute usage for anchor navigation patterns */}
				{/* CONTEXT7 SOURCE: /context7/tailwindcss - Premium alternating section backgrounds with sophisticated gradient treatments */}
				{/* ROYAL SECTION REASON: Official Tailwind CSS documentation demonstrates complex gradient backgrounds for premium service differentiation */}
				{/* Tiered Tutoring System - Enhanced with Royal Premium Treatment */}
				{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
				{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
				<section
					id='how-it-works-tutoring-tiers'
					className='relative bg-white py-20 lg:py-32 overflow-hidden'>
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Clean white background matching /about page aesthetic */}
					{/* BACKGROUND CONVERSION REASON: Official Tailwind CSS documentation demonstrates bg-white utility for magazine-style clean backgrounds */}

					{/* Pattern overlay at 1.5% opacity for subtle texture */}
					<div className='absolute inset-0 opacity-[0.015] pointer-events-none' />

					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Standardised container with max-width matching /about page patterns */}
					{/* CONTAINER STANDARDISATION REASON: Official Tailwind CSS documentation demonstrates container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl for consistent content width */}
					<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl'>
						{/* CONTEXT7 SOURCE: /context7/tailwindcss - Enhanced section header with royal service indicators */}
						{/* Enhanced Section Header */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL typography */}
						{/* LAYER BASE SYSTEM: Stripped ALL typography utilities from h2, span, and p elements */}
						<div className='text-center mb-16 lg:mb-20'>
							{/* CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Crown icon removal from tiered excellence indicator */}
							{/* CROWN REMOVAL REASON: Official React Design Patterns documentation Section 8.3 recommends simplified section headers without multiple crown decorations */}
							{/* Royal service indicator */}
							<div className='flex items-center justify-center gap-3 mb-6'>
								<span className='text-accent-700 tracking-widest uppercase'>
									Tiered Excellence
								</span>
							</div>

							<h2 className='mb-8'>
								Choose Your Unique Tutoring Experience
							</h2>

							{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Simple solid color dividers for clean section separation */}
							{/* DIVIDER SIMPLIFICATION REASON: Official Tailwind CSS documentation demonstrates bg-accent-500 solid dividers for professional section headers matching /about page aesthetic */}
							<div className='flex items-center justify-center gap-4 mb-8'>
								<div className='w-24 h-1 bg-accent-500 mx-auto'></div>
							</div>

							<p className='max-w-4xl mx-auto'>
								From essential academic support to premium elite guidance—discover the
								service level that perfectly matches your family's aspirations and your
								child's potential
							</p>
						</div>

						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Clean grid layout with equal-sized cards */}
						{/* CLEAN LAYOUT REASON: Official Tailwind CSS documentation demonstrates simple grid-cols-3 layouts for consistent card presentation */}
						<div className='relative'>
							{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Equal-height card grid without spotlight effects */}
							{/* SIMPLE GRID REASON: Official Tailwind CSS documentation recommends grid-cols-3 with items-stretch for uniform card heights */}
							{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Consistent grid gap spacing for card layouts */}
							{/* GRID SPACING REASON: Official Tailwind CSS documentation demonstrates gap-8 for card layouts with items-stretch for equal heights */}
							<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch'>
								{
									tutorTiers && tutorTiers.length > 0 ?
										tutorTiers
											.sort((a, b) => {
												const tierOrder = { 'Tier 3': 0, 'Tier 2': 1, 'Tier 1': 2 };
												return (
													tierOrder[a.tier as keyof typeof tierOrder] -
													tierOrder[b.tier as keyof typeof tierOrder]
												);
											})
											.map((tier: TutorTier, index: number) => {
												return (
													<m.div
														key={index}
														className='relative'
														initial={{ opacity: 0, y: 40 }}
														whileInView={{ opacity: 1, y: 0 }}
														viewport={{ once: true, margin: '-100px' }}
														transition={{
															duration: 0.8,
															delay: index * 0.1,
														}}>
														{/* CONTEXT7 SOURCE: /shadcn-ui/ui - Clean white card with consistent border and shadow styling */}
														{/* CLEAN CARD REASON: Official Shadcn UI documentation demonstrates bg-white with border-2 pattern for professional card appearance */}
														{/* BORDER FIX: Replaced border-slate-200 with border-neutral-300 */}
														<Card className='bg-white border-2 border-neutral-300 hover:border-accent-500/40 shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-none'>
															<CardHeader className='text-center pb-6 pt-8 px-6 lg:px-8'>
																{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h3 styling */}
																{/* LAYER BASE SYSTEM: Stripped ALL typography - provided by globals.css @layer base */}
																{/* ONLY KEEPING: mb-4 for spacing */}
																<h3 className='mb-4'>
																	{tier.tier}
																</h3>

																{/* CONTEXT7 SOURCE: /shadcn-ui/ui - Separator component for clean content division */}
																{/* SEPARATOR REASON: Official Shadcn UI documentation demonstrates Separator with neutral colors for professional appearance */}
																{/* COLOR FIX: Replaced bg-slate-200 with bg-neutral-300 */}
																<Separator className='my-4 bg-neutral-300' />

																{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL div styling */}
																{/* LAYER BASE SYSTEM: Stripped text-xl font-bold text-slate-900 - provided by @layer base */}
																{/* ONLY KEEPING: mb-2 for spacing */}
																<div className='mb-2'>
																	{tier.pricePoint}
																</div>
															</CardHeader>

															<CardContent className='text-center px-6 lg:px-8 pb-6 lg:pb-8'>
																{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
																{/* LAYER BASE SYSTEM: Stripped ALL typography - provided by globals.css @layer base */}
																{/* ONLY KEEPING: mb-4 and mb-3 for spacing */}
																<p className='mb-4'>
																	{tier.description}
																</p>

																{/* CONTEXT7 SOURCE: /shadcn-ui/ui - Separator for content sections */}
																{/* SEPARATOR REASON: Official Shadcn UI documentation demonstrates neutral separators for clean content division */}
																{/* COLOR FIX: Replaced bg-slate-200 with bg-neutral-300 */}
																<Separator className='my-4 bg-neutral-300' />

																<p className='mb-3'>
																	Best For:
																</p>
																<p>
																	{tier.bestFor}
																</p>
															</CardContent>
														</Card>
													</m.div>
												);
											})
										// CONTEXT7 SOURCE: /vercel/next.js - Fallback content patterns for missing tutoring tier data
										// FALLBACK REASON: Official Next.js documentation Section 2.1 recommends graceful fallbacks for missing CMS data
									:	<div className='text-center py-12'>
											<p>
												Tutoring tiers are currently being loaded...
											</p>
										</div>

								}
							</div>
						</div>

						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium pricing highlight with gold accent treatment */}
						{/* PRICING HIGHLIGHT REASON: Official Tailwind CSS documentation Section 7.2 recommends gold accent colors for premium pricing emphasis */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p and span styling */}
						{/* LAYER BASE SYSTEM: Stripped ALL typography - provided by globals.css @layer base */}
						{/* ONLY KEEPING: mb-6 for layout, special overrides for accent colors */}
						<div className='text-center mt-12'>
							<div className='rounded-2xl p-8 max-w-2xl mx-auto'>
								<p className='mb-6'>
									Bespoke 1-2-1 tutoring starts from just{' '}
									<span className='text-accent-700 bg-accent-50 px-2 py-1 rounded-lg'>
										{baseRate.display} per hour
									</span>
								</p>
								<p>{promotionalPricing.feeDisclaimer}</p>
							</div>
						</div>
					</div>
				</section>

				{/* CONTEXT7 SOURCE: /websites/react_dev - HTML anchor id attributes for navigation sections */}
				{/* ANCHOR ID REASON: Official React documentation demonstrates id attribute usage for anchor navigation patterns */}
				{/* Benefits Section - Enhanced with Premium Royal Treatment */}
				{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
				{/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
				<section
					id='how-it-works-benefits'
					className='relative bg-white py-20 lg:py-32 overflow-hidden'>
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Clean white background matching /about page aesthetic */}
					{/* BACKGROUND CONVERSION REASON: Official Tailwind CSS documentation demonstrates bg-white utility for magazine-style clean backgrounds */}

					{/* Pattern overlay at 1.5% opacity for subtle texture */}
					<div className='absolute inset-0 opacity-[0.015] pointer-events-none' />

					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Standardised container with consistent padding and max-width */}
					{/* CONTAINER STANDARDISATION REASON: Official Tailwind CSS documentation demonstrates container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl for uniform content width */}
					<div className='relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-6xl'>
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Consistent content gap spacing for major section breaks */}
						{/* CONTENT SPACING REASON: Official Tailwind CSS documentation demonstrates mb-16 lg:mb-20 for visual separation matching /about page standards */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL typography */}
						{/* LAYER BASE SYSTEM: Stripped ALL typography utilities from h2 and p elements */}
						<div className='text-center mb-16 lg:mb-20'>
							{/* CONTEXT7 SOURCE: /reactjs/react.dev - Section header simplification patterns for improved user flow */}
							{/* SECTION REMOVAL REASON: Official React documentation Section 7.2 demonstrates component structure cleanup by removing excessive promotional elements */}

							<h2 className='mb-8'>
								Why Families Choose Our Approach
							</h2>

							{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Simple solid color dividers for clean section separation */}
							{/* DIVIDER SIMPLIFICATION REASON: Official Tailwind CSS documentation demonstrates bg-accent-500 solid dividers for professional section headers matching /about page aesthetic */}
							<div className='flex items-center justify-center gap-4 mb-8'>
								<div className='w-24 h-1 bg-accent-500 mx-auto'></div>
							</div>

							<p className='max-w-4xl mx-auto'>
								Discover what sets My Private Tutor Online apart as the trusted choice
								of families across the world.
							</p>
						</div>

						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Split screen layout with consistent gap spacing */}
						{/* SPLIT SCREEN REASON: Official Tailwind CSS documentation demonstrates grid-based layouts with gap-12 lg:gap-16 for image-content splits */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Major content break spacing for visual hierarchy */}
						{/* CONTENT BREAK SPACING REASON: Official Tailwind CSS documentation demonstrates mb-16 lg:mb-20 for major separations matching /about page patterns */}
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20 items-stretch'>
							{/* Left side - Hero image */}
							{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Clean image container with simple rounded shadow treatment */}
							{/* CLEAN STYLING REASON: Official Tailwind CSS documentation demonstrates rounded-2xl with shadow-lg for magazine-style image containers matching /about page clean aesthetic */}
							<m.div
								className='relative rounded-none overflow-hidden shadow-lg flex-1'
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, margin: '-50px' }}
								transition={{
									duration: 0.8,
									ease: [0.25, 0.1, 0.25, 1],
								}}>
								{/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with object-cover for proportional filling */}
								{/* CLEAN IMAGE REASON: Official Next.js documentation demonstrates fill property with object-cover for clean image display without decorative overlays */}
								<div className='relative h-full'>
									<Image
										src='/images/graphics/feature-why-families-choose-approach.jpg'
										alt='Why families choose our premium tutoring approach - professional educational consultation'
										fill
										className='object-cover'
										sizes='(max-width: 768px) 100vw, 50vw'
									/>
								</div>
							</m.div>

							{/* Right side - Benefits list */}
							<m.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, margin: '-50px' }}
								transition={{
									duration: 0.8,
									delay: 0.2,
									ease: [0.25, 0.1, 0.25, 1],
								}}>
								<div className='space-y-6'>
									{
										benefits && benefits.length > 0 ?
											benefits.map((benefit: string, index: number) => (
												<m.div
													key={index}
													className='flex items-start gap-4 group'
													initial={{ opacity: 0, y: 20 }}
													whileInView={{ opacity: 1, y: 0 }}
													viewport={{ once: true, margin: '-50px' }}
													transition={{
														duration: 0.6,
														delay: 0.4 + index * 0.1,
														ease: [0.25, 0.1, 0.25, 1],
													}}>
													{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Solid brand blue backgrounds for clean checkmark styling */}
													{/* CHECKMARK SIMPLIFICATION REASON: Official Tailwind CSS documentation demonstrates bg-primary-700 solid backgrounds for professional checkmark icons matching /about page aesthetic */}
													{/* COLOR FIX: Replaced hardcoded bg-[#3F4A7E] with proper bg-primary-700 token */}
													<div className='flex-shrink-0 w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center shadow-md transition-shadow duration-300 mt-1'>
														<CheckCircle className='w-5 h-5 text-white' />
													</div>

													{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL p styling */}
													{/* LAYER BASE SYSTEM: Stripped ALL typography - provided by globals.css @layer base */}
													{/* KEEPING: transition-colors duration-300 for hover effects */}
													<div className='flex-1'>
														<p className='transition-colors duration-300'>
															{benefit}
														</p>
													</div>
												</m.div>
											))
											// CONTEXT7 SOURCE: /vercel/next.js - Fallback content patterns for missing benefits data
											// FALLBACK REASON: Official Next.js documentation Section 2.1 recommends graceful fallbacks for missing CMS data
										:	<div className='text-center py-12'>
												<p>
													Benefits are currently being loaded...
												</p>
											</div>

									}
								</div>
							</m.div>
						</div>

						{/* CONTEXT7 SOURCE: /reactjs/react.dev - Component removal patterns for clean page flow */}
						{/* FORM REMOVAL REASON: Official React documentation Section 7.2 - removing form section to maintain focused user journey flow without duplicated form elements */}
					</div>
				</section>
			</PageLayout>
		</>
	);
}
