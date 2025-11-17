'use client';

import { motion as m, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

// CONTEXT7 SOURCE: /framer/motion - Wrap function for seamless infinite scroll
export const wrap = (min: number, max: number, v: number) => {
	const rangeSize = max - min;
	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// Enhanced testimonial interface matching page.tsx structure
interface ScrollingTestimonial {
	readonly id: string;
	readonly quote: string;
	readonly author: string;
	readonly role: string;
	readonly avatar?: string;
	readonly rating: number;
	readonly subject?: string;
	readonly result?: string;
}

// Featured testimonials with parent photos for scrolling carousel
const FEATURED_TESTIMONIALS: readonly ScrollingTestimonial[] = [
	{
		id: 'video-students-compilation-2025',
		author: 'Mr. DeCourtenay, Holland Park',
		role: 'Parent',
		subject: 'Comprehensive KS3 Support',
		quote:
			"The change we've seen in Tilly is huge. She's no longer procrastinating and trying to avoid her studies but rather leaning in and (I think!) actually enjoying learning again. The school report for this term has been the best yet too. Thank you!",
		avatar: '/images/testimonials/Mr DeCourtenay.webp',
		rating: 5,
	},
	{
		id: 'hawthorne-11plus-2024',
		author: 'Mr & Mrs Hawthorne, Kensington',
		role: 'Parents of 11+ student',
		subject: '11+ Preparation',
		quote:
			"It's a full house - offers from St Pauls, Westminster, Highgate and UCS. We can't believe it!",
		avatar: '/images/testimonials/Mr and Mrs Hawthorne.jpeg',
		rating: 5,
	},
	{
		id: 'ms-adebayo-new-scholarship-2024',
		author: 'Ms Adebayo, New York',
		role: 'Parent of scholarship student',
		subject: 'Gifted & Talented Programme',
		quote:
			"Brian and Gloria's teaching style is just right - not lecturing but engaging and really growing her enthusiasm for the subjects.",
		avatar: '/images/testimonials/Ms. Adebayo.jpg',
		rating: 5,
	},
	{
		id: 'mr-mrs-merittjones-a-level-2024',
		author: 'Mr & Mrs Meritt-Jones, Hampstead',
		role: 'Parents of A-Level student',
		subject: 'A-Level Support',
		quote:
			"Newsflash! Thanks to you Jake has jumped from a U to two marks off a B - incredible progress in just a month and he really believes he's capable again.",
		avatar: '/images/testimonials/Mr and Mrs Merritt-Jones.jpg',
		rating: 5,
	},
	{
		id: 'mr-richardson-highgate-sen-2024',
		author: 'Mr Richardson, Highgate',
		role: 'Parent of SEN students',
		subject: 'SEN Science & Mathematics',
		quote:
			'My twins have always struggled with Science and Maths. They also have ADHD and dyspraxia. I was determined that they would pass their GCSE exams and get at least a 5. Their tutors were unbelievable and the boys walked away with a 7 and an 8 grade respectively. We are thrilled!',
		avatar: '/images/testimonials/Mr Richardson.jpeg',
		rating: 5,
	},
	{
		id: 'mr-gupta-bath-gcse-2024',
		author: 'Mr Gupta, Bath',
		role: 'Parent of GCSE student',
		subject: 'GCSE Mathematics',
		quote:
			"Annika scored a 7 in her GCSE retake. We are THRILLED. It's such an improvement on the 4 she got in the summer!",
		avatar: '/images/testimonials/Mr Gupta.jpg',
		rating: 5,
	},
	{
		id: 'aryan-oxbridge-2024',
		author: 'Aryan',
		role: 'Oxford undergraduate',
		subject: 'Politics & Personal Statement',
		quote:
			'My tutor was amazing. He helped me craft a personal statement to stand out from the competition and also coached me for the interview - I got an offer from Oxford!',
		avatar: '/images/testimonials/Arayan.jpg',
		rating: 5,
	},
	{
		id: 'mr-mrs-li-gcse-2024',
		author: 'Mr & Mrs Li',
		role: 'Parents of GCSE student',
		subject: 'GCSE Support',
		quote: 'The world of tutoring is a minefield but your tutors are next level.',
		avatar: '/images/testimonials/Mr and Mrs Li.jpg',
		rating: 5,
	},
	{
		id: 'mr-telson-dubai-2024',
		author: 'Mr. Telson, Dubai, UAE',
		role: 'Parent',
		subject: '7+ preparation',
		quote:
			'Oscar wanted to pass this onto Emily, please can you share? "I had my last exam today and wanted to say thank you for helping me prepare. I know loaaadddsss more now and felt really confident doing all my tests. You are the best teacher in the whole world!"',
		avatar: '/images/testimonials/Mr Telson.jpg',
		rating: 5,
	},
	{
		id: 'mr-mrs-rosenthal-washington-2024',
		author: 'Mr and Mrs Rosenthal, Washington DC',
		role: 'Parents',
		subject: 'IB DP online homeschooling programme',
		quote:
			"So grateful we've got your examiners to help the twins navigate this super stressful time. It's really keeping them confident and grounded. Just wanted to pass on our sincere thanks.",
		avatar: '/images/testimonials/Mr and Mrs Rosenthal.jpg',
		rating: 5,
	},
] as const;

// CONTEXT7 SOURCE: /framer/motion - Seamless infinite scroll with wrap function
interface MotionMarqueeProps {
	children: React.ReactNode;
	reverse?: boolean;
	duration?: number;
}

const MotionMarquee = ({ children, reverse = false, duration = 40 }: MotionMarqueeProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const blockRef = useRef<HTMLDivElement>(null);
	const [numCopies, setNumCopies] = useState(3);

	const baseX = useMotionValue(0);
	const unitWidth = useMotionValue(0);

	// Calculate how many copies needed to fill viewport
	useEffect(() => {
		const container = containerRef.current;
		const block = blockRef.current;
		if (!container || !block) return;

		const updateSizes = () => {
			const containerWidth = container.offsetWidth || 0;
			const blockWidth = block.scrollWidth || 0;
			unitWidth.set(blockWidth);
			const nextCopies =
				blockWidth > 0 ? Math.max(3, Math.ceil(containerWidth / blockWidth) + 2) : 3;
			setNumCopies((prev) => (prev === nextCopies ? prev : nextCopies));
		};

		updateSizes();

		const ro = new ResizeObserver(updateSizes);
		ro.observe(container);
		ro.observe(block);

		return () => {
			ro.disconnect();
		};
	}, [children, unitWidth]);

	// Use wrap function with useTransform for seamless looping
	const x = useTransform([baseX, unitWidth], ([v, bw]) => {
		const width = Number(bw) || 1;
		const offset = Number(v) || 0;
		return `${-wrap(0, width, offset)}px`;
	});

	// Continuous animation using useAnimationFrame
	useAnimationFrame((_, delta) => {
		const dt = delta / 1000;
		const bw = unitWidth.get() || 0;
		if (bw <= 0) return;

		// Calculate speed: we want to traverse one block width in `duration` seconds
		const pixelsPerSecond = bw / duration;
		const direction = reverse ? 1 : -1;
		const moveBy = direction * pixelsPerSecond * dt;

		baseX.set(baseX.get() + moveBy);
	});

	return (
		<div
			ref={containerRef}
			className='w-full overflow-hidden relative'
			style={{
				WebkitMaskImage:
					'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
				maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
				WebkitMaskRepeat: 'no-repeat',
				maskRepeat: 'no-repeat',
			}}>
			<m.div
				className='inline-flex gap-4 sm:gap-6 md:gap-8 items-start will-change-transform'
				style={{ x }}>
				{Array.from({ length: numCopies }).map((_, i) => (
					<div
						key={i}
						ref={i === 0 ? blockRef : null}
						aria-hidden={i !== 0}
						className='inline-flex gap-4 sm:gap-6 md:gap-8 shrink-0'>
						{children}
					</div>
				))}
			</m.div>
		</div>
	);
};

// Individual testimonial card component
interface TestimonialCardProps {
	testimonial: ScrollingTestimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
	<div className='min-w-[280px] sm:min-w-[320px] md:min-w-[400px] lg:min-w-[450px] max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] bg-white p-4 sm:p-5 md:p-6 flex-shrink-0 border-2 border-primary-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
		<div className='flex items-center justify-between mb-4'>
			<div className='flex items-center gap-3 sm:gap-4'>
				{testimonial.avatar && (
					<div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-accent-500 flex-shrink-0'>
						<Image
							src={testimonial.avatar}
							alt={`${testimonial.author} photo`}
							width={48}
							height={48}
							className='object-cover w-full h-full'
						/>
					</div>
				)}
				<div className='min-w-0'>
					<p className='text-sm sm:text-base lg:text-lg font-semibold text-primary-900 truncate'>
						{testimonial.author}
					</p>
					<p className='text-xs sm:text-sm text-primary-600 truncate'>{testimonial.role}</p>
				</div>
			</div>
			<div className='flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 relative'>
				<Image
					src='/icons/favicon-96x96.png'
					alt='My Private Tutor Online'
					fill
					className='object-contain'
				/>
			</div>
		</div>

		{/* Star Rating */}
		<div className='flex mb-3 sm:mb-4'>
			{[...Array(testimonial.rating)].map((_, i) => (
				<Star
					key={i}
					className='w-4 h-4 sm:w-5 sm:h-5 text-accent-600 fill-current'
				/>
			))}
		</div>

		{/* Quote */}
		<blockquote className='text-sm sm:text-base md:text-[17px] text-primary-700 leading-relaxed mb-4 break-words'>
			&quot;{testimonial.quote}&quot;
		</blockquote>

		{/* Subject Badge */}
		{testimonial.subject && (
			<div className='mt-auto pt-3 sm:pt-4 border-t border-primary-100'>
				<span className='inline-block px-2 sm:px-3 py-1 bg-primary-50 text-primary-700 text-xs sm:text-sm rounded-full font-medium'>
					{testimonial.subject}
				</span>
			</div>
		)}
	</div>
);

// Main component with single or multiple rows
interface ScrollingTestimonialsProps {
	variant?: 'single' | 'multiple';
	className?: string;
}

export const ScrollingTestimonials = ({
	variant = 'single',
	className = '',
}: ScrollingTestimonialsProps) => {
	if (variant === 'single') {
		// Single row scrolling (Phase 1: Under video testimonials)
		return (
			<div className={`py-8 sm:py-10 md:py-12 bg-neutral-50 ${className}`}>
				<MotionMarquee duration={60}>
					{FEATURED_TESTIMONIALS.map((testimonial) => (
						<TestimonialCard
							key={testimonial.id}
							testimonial={testimonial}
						/>
					))}
				</MotionMarquee>
			</div>
		);
	}

	// Multiple rows with different speeds (Phase 2: Replacement for static grid)
	// Split testimonials into 3 rows for visual variety
	const row1 = FEATURED_TESTIMONIALS.slice(0, 4);
	const row2 = FEATURED_TESTIMONIALS.slice(4, 7);
	const row3 = FEATURED_TESTIMONIALS.slice(7, 10);

	return (
		<div className={`py-12 sm:py-14 md:py-16 bg-neutral-50 ${className}`}>
			<div className='space-y-6 sm:space-y-8 md:space-y-10'>
				{/* Row 1 - Normal speed, left to right */}
				<MotionMarquee
					duration={50}
					reverse={false}>
					{row1.map((testimonial) => (
						<TestimonialCard
							key={`row1-${testimonial.id}`}
							testimonial={testimonial}
						/>
					))}
				</MotionMarquee>

				{/* Row 2 - Slower speed, right to left (reverse) */}
				<MotionMarquee
					duration={60}
					reverse={true}>
					{row2.map((testimonial) => (
						<TestimonialCard
							key={`row2-${testimonial.id}`}
							testimonial={testimonial}
						/>
					))}
				</MotionMarquee>

				{/* Row 3 - Faster speed, left to right */}
				<MotionMarquee
					duration={55}
					reverse={false}>
					{row3.map((testimonial) => (
						<TestimonialCard
							key={`row3-${testimonial.id}`}
							testimonial={testimonial}
						/>
					))}
				</MotionMarquee>
			</div>
		</div>
	);
};
