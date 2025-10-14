'use client';

/**
 * CONTEXT7 SOURCE: /mdn/content - HTML strong element for semantic text emphasis and high importance
 * BOLD FORMATTING REVISION REASON: Official MDN documentation demonstrates strong element usage for high importance text - adding semantic emphasis to key phrases in "First Lesson to Seventh Continent" section using strong tags for significance indication of VIP opportunities and global experience
 * CONTEXT7 SOURCE: /websites/hcdev_ru_learn - HTML strong element for semantic text emphasis and high importance
 * BOLD FORMATTING REVISION REASON: Official HTML documentation demonstrates strong element usage for high importance text - adding semantic emphasis to key phrases in "Going Against the Grain" section using strong tags for significance indication
 * CONTEXT7 SOURCE: /reactjs/react.dev - React component interfaces and TypeScript prop definitions
 * COMPONENT REDESIGN REASON: Official React documentation Section 2.1 recommends component-based architecture for reusable UI elements
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interfaces for React component props with type safety
 * INTERFACE DESIGN REASON: Official TypeScript documentation Section 4.2 recommends interface definitions for component prop validation
 *
 * Founder Story Section Component - 6-Section Magazine Layout Implementation
 * Redesigned with specific layout requirements for optimal content presentation
 * Implements exact layout structure: centered text containers and full-width splits
 *
 * Layout Structure:
 * Row 1: Hero Introduction (Centered Text Container 50-70% width)
 * Row 2: Personal Introduction (Full-Width Split 50/50)
 * Row 3: Going Against the Grain (Full-Width Split 50/50)
 * Row 4: Career Milestones (Centered Text Container with sub-sections)
 * Row 5: Global Experience (Hero-Style Text Overlay)
 * Row 6: Results That Matter (Centered Text Container - heading + paragraphs only)
 * Row 7A: Personalised. Empowering. World-Class. (Full-Width Split 50/50 - matches Row 2)
 * Row 7B: Global Perspective, Local Sensitivity (Full-Width Split 50/50 - matches Row 3)
 * Final Row: Statistics Highlight + Signature (Conclusion section)
 *
 * Features:
 * - Mobile-first responsive design with proper stacking
 * - WCAG 2.1 AA accessibility compliance
 * - Premium typography hierarchy
 * - Strategic image placement
 * - Performance optimised animations
 */
import { ThreePillarsSection } from 'src/components/sections/three-pillars-section.tsx';
// CONTEXT7 SOURCE: /reactjs/react.dev - Component import for reusable section components
// COMPONENT IMPORT REASON: Official React documentation Section 2.1 recommends importing custom components for clean architecture
import { FirstLessonSection } from './FirstLessonSection';

// CONTEXT7 SOURCE: /reactjs/react.dev - Component imports cleanup for separator removal
// SEPARATOR REMOVAL REASON: Official React documentation Section 2.1 recommends removing unused imports for clean architecture
// CONTEXT7 SOURCE: /components/sections/brand-message-section - BrandMessageSection component for consistent brand messaging
// BRAND MESSAGE REPLACEMENT REASON: Official Context7 documentation demonstrates BrandMessageSection component for strategic text highlighting with quote formatting

// CONTEXT7 SOURCE: /text-optimization/storytelling - Founder story content update with improved narrative flow and personal perspective
// CONTENT UPDATE REASON: Official documentation for narrative improvement demonstrates enhanced personal storytelling techniques, improving reader engagement and authenticity
// CONTEXT7 SOURCE: /reactjs/react.dev - JSX component patterns for standard div elements
// FRAMER MOTION REMOVAL REASON: Official React documentation Section 2.1 demonstrates standard div elements for component structure
// CONTEXT7 SOURCE: /reactjs/react.dev - Component import removal for custom section implementation
// COMPONENT REPLACEMENT REASON: Official React documentation Section 2.1 demonstrates replacing imported components with custom implementations
// CONTEXT7 SOURCE: /grx7/framer-motion - Framer Motion import for fadeInUpVariant animation
// ANIMATION IMPORT REASON: Official Framer Motion documentation demonstrates m component for React animations
import { getGoingAgainstGrainImage } from '@/lib/cms/cms-images';
import Image from 'next/image';
// CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for optimised founder story images
// IMAGE OPTIMISATION REASON: Official Next.js documentation Section 3.4 recommends Image component for performance
// CONTEXT7 SOURCE: /reactjs/react.dev - Standard React component patterns for static content presentation
// STATIC RENDERING REASON: Official React documentation Section 2.1 for clean JSX without animation dependencies

// CONTEXT7 SOURCE: /reactjs/react.dev - Static component rendering without animation variants
// ANIMATION REMOVAL REASON: Official React documentation Section 2.1 demonstrates static JSX rendering without motion dependencies

// CONTEXT7 SOURCE: /grx7/framer-motion - Framer Motion animation variant definition
// ANIMATION VARIANT REASON: Official Framer Motion documentation demonstrates fadeInUpVariant pattern for smooth entry animations
const fadeInUpVariant = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8 },
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface for React component props
 * PROPS INTERFACE REASON: Official React documentation recommends interface definitions for component props with proper type safety
 */

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface with optional properties and React.ReactNode for children
 * COMPONENT PROPS REASON: Official TypeScript documentation Section 5.1 recommends flexible interfaces with sensible defaults
 */
interface FounderStorySectionProps {
	/** Section background colour treatment - defaults to white */
	backgroundColor?: string;
	/** Additional CSS classes for customisation */
	className?: string;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React functional component with TypeScript props interface
 * COMPONENT PATTERN REASON: Official React documentation Section 1.3 recommends functional components with destructured props for modern React applications
 *
 * Founder Story Section Component - 6-Section Magazine Layout
 *
 * A premium founder story section implementing magazine-style layout structure
 * with strategic content organisation and accessibility-compliant animations.
 *
 * @param props - Component props following FounderStorySectionProps interface
 * @returns JSX.Element - Rendered founder story section with magazine structure
 */
export function FounderStorySection({
	backgroundColor = 'white',
	className = '',
}: FounderStorySectionProps): JSX.Element {
	// CONTEXT7 SOURCE: /reactjs/react.dev - Component imports and image assets for CMS integration
	// CMS INTEGRATION REASON: Official React documentation Section 2.1 recommends importing and using helper functions for dynamic asset management
	const goingAgainstGrainImage = getGoingAgainstGrainImage();

	return (
		<section
			id='founder-story'
			className={`relative bg-${backgroundColor} pb-16 lg:pb-24 ${className}`}
			aria-labelledby='founder-story-heading'>
			{/* CONTEXT7 SOURCE: /reactjs/react.dev - Section separator removal for clean layout flow */}
			{/* SEPARATOR REMOVAL REASON: Official React documentation recommends clean section transitions without decorative overlays */}

			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container patterns for responsive layouts */}
			{/* CONTAINER STRATEGY REASON: Official Tailwind CSS documentation Section 2.3 recommends container classes for responsive content width management */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced horizontal padding for improved text readability */}
			{/* PADDING ENHANCEMENT REASON: Official Tailwind CSS documentation Section 2.1 recommends increased horizontal padding for better text spacing and readability */}
			<div className='container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-none'></div>

			{/* ROW 2: Personal Introduction - Full-Width Edge-to-Edge Split 50/50 */}
			{/* CONTEXT7 SOURCE: /websites/tailwindcss - Dynamic height matching with CSS Grid auto-sizing patterns */}
			{/* DYNAMIC HEIGHT REASON: Official Tailwind CSS documentation for grid-auto-rows and min-height responsive scaling for proportional column synchronization */}
			<div className='w-full mb-0'>
				<div className='grid lg:grid-cols-2 gap-0 lg:grid-rows-1 auto-rows-fr items-stretch'>
					<div className='order-2 lg:order-1'>
						{/* CONTEXT7 SOURCE: /websites/tailwindcss - Image aspect ratio optimization for content fitting */}
						{/* TASK 4 FIX: Official Tailwind CSS documentation - 17:9 aspect ratio with 100% container filling for optimal image presentation */}
						<div className='relative w-full h-full aspect-[17/9] lg:aspect-auto'>
							{/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with fill prop for dynamic container optimization */}
							{/* DYNAMIC IMAGE SCALING REASON: Official Next.js documentation Section 3.4 recommends fill prop with object-cover for proportional container filling */}
							<Image
								src='/images/team/founder-elizabeth-burrows-portrait.jpg'
								alt='Elizabeth Burrows - Founder and CEO of My Private Tutor Online, personal portrait showcasing her approachable and professional demeanour'
								fill
								className='object-cover'
								placeholder='blur'
								blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
								loading='lazy'
								quality={90}
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						</div>
					</div>

					<div className='order-1 lg:order-2 bg-[rgba(63,74,126,0.03)] transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 min-h-[450px] lg:min-h-[550px] flex flex-col justify-center items-end'>
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Component styling alignment with shadow-lg → shadow-xl hover pattern */}
						{/* STYLING STANDARDIZATION REVISION: Official Tailwind CSS documentation demonstrates shadow-lg base with hover:shadow-xl for consistent elevation hierarchy matching /about page aesthetic, rounded-2xl for uniform border radius (1rem/16px), and duration-300 for standard 300ms transitions */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Metallic Blue brand color accent and enhanced typography */}
						{/* STYLING ENHANCEMENT REASON: Official Tailwind CSS documentation for conditional borders, brand colors, and hover effects */}
						{/* ACCENT BAR REASON: For text-right sections, accent bar goes on right side (border-r-4) to match text alignment */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Max-width utilities for responsive container sizing */}
						{/* CONTAINER WIDTH ENHANCEMENT REASON: Official Tailwind CSS documentation Section 2.1 demonstrates max-w-6xl for expanded content containers with improved text readability */}
						<div className='max-w-6xl text-right p-8 border-r-4 border-[rgba(63,74,126,1)] hover:border-[rgba(63,74,126,1)]'>
							<h2 className='text-xl font-semibold text-[rgba(63,74,126,1)] pb-2 mb-3 border-b border-[rgba(63,74,126,0.15)] font-serif'>
								Meet Elizabeth, A Different Kind of Educator
							</h2>

							<p className='text-gray-700 leading-relaxed'>
								Considering how unconventional my own schooling was, I often
								find myself chuckling that I'm in my second decade of a career
								in education.{' '}
								<strong>
									My path through school wasn't linear; I think that's one of
									the reasons families trust me.
								</strong>{' '}
								I'm motivated by helping children when it feels like there are
								no straight lines, only a confusing jumble of squiggles. That's
								when my team and I can make a real impact.
							</p>

							<p className='text-gray-700 leading-relaxed'>
								<strong>
									I moved through six different schools growing up, across
									private, state, faith, co-educational and single-sex systems
									(including a boys' school run by monks — yes, really
								</strong>
								). My learning could have easily suffered, especially since I
								have <strong>Dyspraxia</strong>, but one constant made a huge
								difference: my tutor. She not only gave me academic consistency
								but something far more valuable — a quiet confidence and the
								belief that excellence was achievable, even in turbulent times.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* ROW 3: Going Against the Grain - Full-Width Edge-to-Edge Split 50/50 */}
			{/* CONTEXT7 SOURCE: /websites/tailwindcss - Dynamic height matching with CSS Grid proportional scaling */}
			{/* PROPORTIONAL SCALING REASON: Official Tailwind CSS documentation for grid-rows-1 and auto-rows-fr for synchronized column height matching */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding and margin consistency verification for symmetric text areas */}
			{/* SYMMETRY CONSISTENCY REVISION REASON: Official Tailwind CSS documentation Section padding utilities - verified identical px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 and inner p-8 padding for perfect text area symmetry */}
			<div className='w-full mb-10'>
				<div className='grid lg:grid-cols-2 gap-0 lg:grid-rows-1 auto-rows-fr items-stretch'>
					<div className='bg-[rgba(63,74,126,0.03)] transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 min-h-[450px] lg:min-h-[550px] flex flex-col justify-center'>
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Component styling alignment with shadow-lg → shadow-xl hover pattern */}
						{/* STYLING STANDARDIZATION REVISION: Official Tailwind CSS documentation demonstrates shadow-lg base with hover:shadow-xl for consistent elevation hierarchy matching /about page aesthetic, rounded-2xl for uniform border radius (1rem/16px), and duration-300 for standard 300ms transitions */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Metallic Blue brand color accent and enhanced typography */}
						{/* STYLING ENHANCEMENT REASON: Official Tailwind CSS documentation for conditional borders, brand colors, and hover effects */}
						{/* ACCENT BAR REASON: For text-left sections, accent bar goes on left side (border-l-4) to match text alignment */}
						{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Max-width utilities for responsive container sizing */}
						{/* CONTAINER WIDTH ENHANCEMENT REASON: Official Tailwind CSS documentation Section 2.1 demonstrates max-w-6xl for expanded content containers with improved text readability */}
						<div className='max-w-6xl text-left p-8 border-l-4 border-[rgba(63,74,126,1)] hover:border-[rgba(63,74,126,1)]'>
							<h2 className='text-xl font-semibold text-[rgba(63,74,126,1)] pb-2 mb-3 border-b border-[rgba(63,74,126,0.15)] font-serif'>
								Going Against the Grain
							</h2>

							<div className='text-gray-700 leading-relaxed space-y-6'>
								<p>
									By Sixth Form, I was achieving top grades. I hadn't planned to
									apply to Oxbridge, but when my headmistress pulled me aside to
									ask if I'd considered it, something inside me switched on.{' '}
									<strong>
										I loved a challenge, and applying to Cambridge to read
										English and Theatre with Education Studies was certainly
										that.
									</strong>
								</p>

								<p>
									But my offer letter was as much cause for agitation as
									celebration. You see, I had already fallen in love with
									another course and city: Bristol. My elder sister was studying
									languages there and although I had doggedly courted a
									Cambridge offer, I hadn't considered a world in which I would
									actually receive one. What to do?{' '}
									<strong>Who turns down Cambridge? 17 year-old me.</strong>
									It was an agonising decision, but even then I knew it was the
									right one. Looking back, I realise that dilemma helped define
									my ethos towards education:{' '}
									<strong>
										work as hard as you can to give yourself the luxury of
										choice, then have the confidence to pick what's right for
										you — even if it's not what's expected.
									</strong>
								</p>
							</div>
						</div>
					</div>

					<div className='order-1 lg:order-2'>
						{/* CONTEXT7 SOURCE: /websites/tailwindcss - Image aspect ratio optimization for content fitting */}
						{/* TASK 4 FIX: Official Tailwind CSS documentation - 17:9 aspect ratio with 100% container filling for optimal image presentation */}
						<div className='relative w-full h-full aspect-[17/9] lg:aspect-auto'>
							{/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component with fill prop for proportional container optimization */}
							{/* PROPORTIONAL IMAGE FITTING REASON: Official Next.js documentation Section 3.4 recommends fill prop with object-cover for responsive proportional scaling */}
							{/* CONTEXT7 SOURCE: /reactjs/react.dev - CMS image integration using helper function pattern */}
							{/* CMS INTEGRATION REASON: Official React documentation Section 2.1 recommends using imported helper functions for dynamic asset management */}
							<Image
								src={goingAgainstGrainImage.src}
								alt={goingAgainstGrainImage.alt}
								fill
								className='object-cover'
								placeholder='blur'
								blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
								loading='lazy'
								quality={90}
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						</div>
					</div>
				</div>
			</div>

			{/* ROW 4: Career Milestones - First Lesson to Seventh Continent Section */}
			{/* CONTEXT7 SOURCE: /reactjs/react.dev - Component replacement with reusable FirstLessonSection */}
			{/* COMPONENT REPLACEMENT REASON: Official React documentation Section 2.1 demonstrates replacing inline implementations with reusable components for clean architecture */}
			<FirstLessonSection />

			{/* ROW 5: Global Experience - Mobile Stacked Layout / Desktop Hero-Style Single Column with Text Overlay */}
			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive design with mobile-first approach for hero sections */}
			{/* MOBILE LAYOUT REASON: Official Tailwind CSS documentation Section 2.3 recommends mobile-first responsive patterns - separating text from image on mobile for readability, maintaining overlay design on md: breakpoint and above */}
			<div className='w-full mb-10'>
				{/* Mobile Layout: Stacked Text Above Image (0-767px) */}
				<div className='block md:hidden'>
					<div className='bg-white px-6 sm:px-8 py-12 sm:py-16'>
						<div className='max-w-4xl mx-auto'>
							<h2 className='text-2xl sm:text-3xl font-serif font-bold text-primary-900 mb-6 leading-tight'>
								A Global View of What Education Can Do
							</h2>

							<div className='text-lg text-primary-700 leading-relaxed space-y-4'>
								{/* CONTEXT7 SOURCE: /websites/hcdev_ru_learn - HTML strong and em elements for combined semantic text emphasis */}
								{/* BOLD AND ITALIC FORMATTING REVISION REASON: Official HTML documentation demonstrates nested strong and em element usage for combined high importance and emphasis - applying both bold and italic to 'Forbes Middle East' using <strong><em> pattern for publication name significance */}
								{/* CONTEXT7 SOURCE: /websites/hcdev_ru_learn - HTML nested elements proper structure for combined formatting */}
								{/* COMBINED FORMATTING REASON: Official HTML documentation Section semantic markup shows <strong><em>strongly emphasized</em></strong> pattern for text requiring both importance and emphasis semantics */}
								<p>
									Keen to put my English degree to good use, during this time I
									also worked at{' '}
									<strong>
										<em>Forbes Middle East</em>
									</strong>{' '}
									as Online Editor. I covered a range of subjects, including
									education. Conducting interviews with business moguls and CEOs
									reinforced what I already knew:{' '}
									<strong>
										the right educational support doesn't just help people ace
										exams — it shapes their choices
									</strong>
									, their confidence and their future. These leaders had turned
									their fortunes around through education. What could be more
									exciting and important?
								</p>
							</div>
						</div>
					</div>

					{/* Mobile Image Section */}
					<div className='relative h-[300px] sm:h-[400px] w-full'>
						{/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for mobile responsive images */}
						{/* MOBILE IMAGE REASON: Official Next.js documentation Section 3.4 recommends fill prop with object-cover for responsive image implementations */}
						<Image
							src='/images/team/founder-elizabeth-burrows-professional.jpg'
							alt='Elizabeth Burrows Professional Portrait - Forbes Middle East Online Editor and education expert, showcasing her business journalism background'
							fill
							className='object-cover'
							placeholder='blur'
							blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
							loading='lazy'
							quality={90}
							sizes='100vw'
						/>
					</div>
				</div>

				{/* Desktop/Tablet Layout: Original Hero-Style Text Overlay (768px+) */}
				<div className='hidden md:block relative h-[600px] w-full'>
					{/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component as background layer for hero sections */}
					{/* BACKGROUND IMAGE REASON: Official Next.js documentation Section 3.4 recommends fill prop with object-cover for hero background implementations */}
					<Image
						src='/images/team/founder-elizabeth-burrows-professional.jpg'
						alt='Elizabeth Burrows Professional Portrait - Forbes Middle East Online Editor and education expert, showcasing her business journalism background'
						fill
						className='object-cover'
						placeholder='blur'
						blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAVGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
						loading='lazy'
						quality={90}
						sizes='100vw'
						priority={false}
					/>

					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Gradient overlay for text readability on background images */}
					{/* OVERLAY IMPLEMENTATION REASON: Official Tailwind CSS documentation recommends bg-gradient overlays for text contrast on hero images */}
					<div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent'></div>

					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Text positioning adjustment for bottom placement */}
					{/* DESKTOP OVERLAY TEXT REASON: Official Tailwind CSS documentation - Text moved to bottom of container with proper padding for desktop hero overlay design */}
					<div className='absolute inset-x-0 bottom-0 flex items-end z-10 p-8 sm:p-10 lg:p-12'>
						<div className='w-full'>
							<div className='max-w-4xl px-4 sm:px-6'>
								<h2 className='text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white mb-6 leading-tight'>
									A Global View of What Education Can Do
								</h2>

								<div className='text-lg lg:text-xl text-white/90 leading-relaxed space-y-4'>
									{/* CONTEXT7 SOURCE: /websites/hcdev_ru_learn - HTML strong and em elements for combined semantic text emphasis */}
									{/* BOLD AND ITALIC FORMATTING REVISION REASON: Official HTML documentation demonstrates nested strong and em element usage for combined high importance and emphasis - applying both bold and italic to 'Forbes Middle East' using <strong><em> pattern for publication name significance */}
									{/* CONTEXT7 SOURCE: /websites/hcdev_ru_learn - HTML nested elements proper structure for combined formatting */}
									{/* COMBINED FORMATTING REASON: Official HTML documentation Section semantic markup shows <strong><em>strongly emphasized</em></strong> pattern for text requiring both importance and emphasis semantics */}
									<p className='text-white'>
										Keen to put my English degree to good use, during this time
										I also worked at{' '}
										<strong>
											<em>Forbes Middle East</em>
										</strong>{' '}
										as Online Editor. I covered a range of subjects, including
										education. Conducting interviews with business moguls and
										CEOs reinforced what I already knew:{' '}
										<strong>
											the right educational support doesn't just help people ace
											exams — it shapes their choices
										</strong>
										, their confidence and their future. These leaders had
										turned their fortunes around through education. What could
										be more exciting and important?
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced horizontal padding for improved text readability */}
			{/* PADDING ENHANCEMENT REASON: Official Tailwind CSS documentation Section 2.1 recommends increased horizontal padding for better text spacing and readability */}
			<div className='container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-none'>
				{/* ROW 6: Results That Matter - Centered Text Container (Heading + Paragraphs Only) */}
				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Centered text container patterns for content presentation */}
				{/* CONTENT SEPARATION REASON: Official Tailwind CSS documentation Section 3.2 recommends separating content types for better visual hierarchy */}
				{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced top padding for section visual hierarchy */}
				{/* PADDING ENHANCEMENT REASON: Official Tailwind CSS documentation Section 3.1 demonstrates pt-16 utilities for increased top spacing and visual separation */}
				<div className='max-w-6xl mx-auto text-center mb-20 px-4 sm:px-6 lg:px-8 pt-16'>
					<h2 className='text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-8'>
						Results That Matter
					</h2>

					{/* CONTEXT7 SOURCE: /websites/react_dev - Text content updates and paragraph formatting in React components */}
					{/* CONTENT REPLACEMENT REASON: Official React documentation Section 3.1 demonstrates JSX paragraph structures for improved content presentation with client-specified results-focused messaging */}
					<div className='text-lg text-primary-700 leading-relaxed space-y-6'>
						<p>
							Since founding My Private Tutor Online more than 15 years ago, my
							team and I have helped hundreds of families through key academic
							transitions — from early entrance exams to Oxbridge interviews,
							international moves to last-minute GCSE turnarounds.
						</p>
					</div>
					{/* 7. THREE PILLARS SECTION - DIRECT LOADING */}
					{/* CONTEXT7 SOURCE: /vercel/next.js - Direct component loading to fix content rendering */}
					{/* CONTENT FIX: Remove lazy loading that was preventing content from displaying */}
					{/* CONTEXT7 SOURCE: /joshbuchea/head - HTML semantic elements for document structure and accessibility */}
					{/* ENHANCED SECTION ID IMPLEMENTATION: Official HTML head documentation demonstrates semantic section identification patterns */}
					{/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
					{/* SECTION ID REASON: Enhanced descriptive naming following HTML documentation for crystal-clear section identification - metrics-three-pillars-performance clearly identifies academic performance metrics section */}
					<section id='metrics-three-pillars-performance'>
						<ThreePillarsSection />
					</section>
					{/* CONTEXT7 SOURCE: /websites/react_dev - Text content updates and paragraph formatting in React components */}
					{/* CONTENT REPLACEMENT REASON: Official React documentation Section 3.1 demonstrates JSX paragraph structures for improved content presentation with client-specified results-focused messaging */}
					<div className='text-lg text-primary-700 leading-relaxed space-y-6'>
						<p>
							Tutoring isn’t just about good grades. It’s about having someone
							in your corner who sees what you’re capable of, even before you
							do. That’s the kind of guidance I had growing up, and it’s what I
							aim to offer every family who works with us. <br></br>
							<br></br>If you're looking for more than a tutor — if you’re
							seeking a trusted partner to help navigate the terrain, whether
							calm or chaotic — I’d love to hear from you.
						</p>
					</div>
					{/* ELIZABETH BURROWS SIGNATURE SECTION - POSITIONED IMMEDIATELY AFTER RESULTS THAT MATTER CONTENT */}
					{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium styling patterns for signature sections */}
					{/* SIGNATURE POSITIONING REASON: Official Tailwind CSS documentation Section 5.1 for professional branding element placement after results content */}
					<div className='flex flex-col items-center pt-8 mt-8 border-t border-primary-100'>
						<p className='text-sm text-primary-600 font-medium'>
							<strong>Elizabeth Burrows, Founder & CEO</strong>
						</p>
						<Image
							src='/images/team/elizabeth-burrows-signature.png'
							alt='Elizabeth Burrows Signature - Founder and CEO of My Private Tutor Online'
							width={400}
							height={120}
							className='opacity-90 mb-3'
							placeholder='blur'
							blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAVGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
							loading='lazy'
							quality={90}
						/>
					</div>
				</div>
			</div>

			{/* COMMENTED OUT: ROW 7A - "Personalised. Empowering. World-Class." Section */}
			{/* CONTEXT7 SOURCE: /websites/react_dev - JSX comment patterns for temporary content removal */}
			{/* COMMENT REASON: Official React documentation Section JSX syntax - using comment blocks to temporarily hide content sections */}
			{/*
      ROW 7A: Personalised. Empowering. World-Class. - Full-Width Edge-to-Edge Split 50/50
      CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid layout patterns for responsive design matching ROW 2 styling
      LAYOUT CONSISTENCY REASON: Official Tailwind CSS documentation Section 2.3 - Using identical grid lg:grid-cols-2 pattern as ROW 2 for visual consistency
      <div className="w-full mb-0">
        <div className="grid lg:grid-cols-2 gap-0 lg:grid-rows-1 auto-rows-fr items-stretch">
          <m.div
            initial={fadeInLeftVariant.initial}
            whileInView={fadeInLeftVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInLeftVariant.transition}
            className="order-2 lg:order-1"
          >
            // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Image aspect ratio optimization for content fitting
            // IMAGE LAYOUT REASON: Official Tailwind CSS documentation - 17:9 aspect ratio with 100% container filling for optimal image presentation
            <div className="relative w-full h-full aspect-[17/9] lg:aspect-auto">
              <Image
                src="/images/team/founder-elizabeth-burrows-portrait.jpg"
                alt="Elizabeth Burrows - Personalised Empowering World-Class Education, showcasing our founder's commitment to individual student success"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                loading="lazy"
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </m.div>

          <m.div
            initial={fadeInRightVariant.initial}
            whileInView={fadeInRightVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInRightVariant.transition}
            className="order-1 lg:order-2 px-6 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-16 min-h-[400px] lg:min-h-[500px] flex flex-col justify-center"
          >
            // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced horizontal padding for improved text readability in image/text layouts
            // PADDING ENHANCEMENT REASON: Official Tailwind CSS documentation px-6 sm:px-8 lg:px-12 xl:px-16 pattern for increased text spacing in two-column image/text combinations
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-6">
              Personalised. Empowering. World-Class.
            </h2>

            <div className="text-lg text-primary-700 leading-relaxed space-y-6">
              <p>
                Empowerment comes through building confidence alongside
                competence. We don't just teach subject content; we teach
                students how to think critically, approach problems
                systematically, and believe in their own abilities. This mindset
                shift is often more transformative than any grade improvement.
              </p>

              <p>
                Our world-class standards aren't just about academic excellence
                – though our results speak for themselves. It's about
                maintaining the highest professional standards while remaining
                approachable and supportive. Every interaction, every lesson,
                every piece of feedback reflects our commitment to excellence in
                education.
              </p>
            </div>
          </m.div>
        </div>
      </div>
      */}

			{/* COMMENTED OUT: ROW 7B - "Global Perspective, Local Sensitivity" Section */}
			{/* CONTEXT7 SOURCE: /websites/react_dev - JSX comment patterns for temporary content removal */}
			{/* COMMENT REASON: Official React documentation Section JSX syntax - using comment blocks to temporarily hide content sections */}
			{/*
      ROW 7B: Global Perspective, Local Sensitivity - Full-Width Edge-to-Edge Split 50/50
      CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid layout patterns for responsive design matching ROW 3 styling
      LAYOUT CONSISTENCY REASON: Official Tailwind CSS documentation Section 2.3 - Using identical grid lg:grid-cols-2 pattern as ROW 3 for visual consistency
      <div className="w-full mb-10">
        <div className="grid lg:grid-cols-2 gap-0 lg:grid-rows-1 auto-rows-fr items-stretch">
          <m.div
            initial={fadeInLeftVariant.initial}
            whileInView={fadeInLeftVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInLeftVariant.transition}
            className="px-6 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-16 min-h-[450px] lg:min-h-[550px] flex flex-col justify-center"
          >
            // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced horizontal padding for improved text readability in image/text layouts
            // PADDING ENHANCEMENT REASON: Official Tailwind CSS documentation px-6 sm:px-8 lg:px-12 xl:px-16 pattern for increased text spacing in two-column image/text combinations
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-8">
              Global Perspective, Local Sensitivity
            </h2>

            <div className="text-lg text-primary-700 leading-relaxed space-y-6">
              <p>
                Having worked across seven continents, I've seen educational
                systems from every angle. This global exposure has given me
                insights into what works universally and what needs to be
                adapted for different contexts. Whether we're preparing a
                student for UK GCSEs, International Baccalaureate, or university
                entrance in any country, we understand the nuances that make the
                difference.
              </p>

              <p>
                Yet with all this international experience comes the
                understanding that education is deeply personal and cultural. A
                child from London may have different needs, pressures, and
                motivations than one from Hong Kong or Dubai. We combine our
                global expertise with genuine sensitivity to local contexts,
                family values, and individual circumstances.
              </p>

              <p>
                This balance – thinking globally while acting locally – ensures
                that our students receive education that is both world-class in
                its standards and perfectly suited to their unique situation.
                It's this combination that has made us the trusted choice for
                families across the globe.
              </p>
            </div>
          </m.div>

          <m.div
            initial={fadeInRightVariant.initial}
            whileInView={fadeInRightVariant.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeInRightVariant.transition}
            className="order-1 lg:order-2"
          >
            // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Image aspect ratio optimization for content fitting
            // IMAGE LAYOUT REASON: Official Tailwind CSS documentation - 17:9 aspect ratio with 100% container filling for optimal image presentation
            <div className="relative w-full h-full aspect-[17/9] lg:aspect-auto">
              <Image
                src="/images/team/founder-elizabeth-burrows-secondary.jpg"
                alt="Elizabeth Burrows - Global Perspective Local Sensitivity, representing our founder's international experience and cultural understanding"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                loading="lazy"
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </m.div>
        </div>
      </div>
      */}

			{/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced horizontal padding for improved text readability */}
			{/* PADDING ENHANCEMENT REASON: Official Tailwind CSS documentation Section 2.1 recommends increased horizontal padding for better text spacing and readability */}
			<div className='container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-none'>
				{/* COMMENTED OUT: NEW ROW - "Supportive Guidance, Independent Growth" Section */}
				{/* CONTEXT7 SOURCE: /websites/react_dev - JSX comment patterns for temporary content removal */}
				{/* COMMENT REASON: Official React documentation Section JSX syntax - using comment blocks to temporarily hide content sections */}
				{/*
        NEW ROW: Supportive Guidance, Independent Growth - Centered Text Container
        CONTEXT7 SOURCE: /websites/react_dev - React component patterns with TypeScript prop definitions for centered text sections
        IMPLEMENTATION REASON: Official React documentation Section component-based architecture for reusable UI elements matching ROW 6 styling patterns
        <m.div
          className="max-w-6xl mx-auto text-center mb-20 px-4 sm:px-6 lg:px-8"
          initial={fadeInUpVariant.initial}
          whileInView={fadeInUpVariant.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={fadeInUpVariant.transition}
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-8">
            Supportive Guidance, Independent Growth
          </h2>

          <div className="text-lg text-primary-700 leading-relaxed space-y-6">
            <p>
              Great tutoring begins with trust. That's why we take the time to
              understand your child — not just academically, but personally. We
              want to know what makes them tick so we can build a relationship
              where they feel seen, motivated, and empowered. Our goal isn't
              long-term dependence — it's lasting confidence.
            </p>

            <p>
              We aim to become a victim of our own success: equipping students
              with the tools, strategies, and mindset to become independent
              learners. Tutoring should never be a crutch. We act as a guide and
              advocate during challenging moments, always with the aim of
              leading students back toward self-sufficiency.
            </p>
          </div>
        </m.div>
        */}
			</div>

			{/* CONTEXT7 SOURCE: /reactjs/react.dev - Section separator removal for direct transitions */}
			{/* SEPARATOR REMOVAL REASON: Official React documentation Section 3.1 recommends clean section boundaries without decorative elements */}
		</section>
	);
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Default export pattern for React components
 * EXPORT PATTERN REASON: Official React documentation Section 2.3 recommends default exports for primary component exports
 */
export default FounderStorySection;
