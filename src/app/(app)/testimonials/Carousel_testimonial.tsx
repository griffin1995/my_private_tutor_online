'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	motion as m,
	useAnimationFrame,
	useMotionValue,
	useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// CONTEXT7 SOURCE: /framer/motion - Wrap function for seamless infinite scroll
export const wrap = (min: number, max: number, v: number) => {
	const rangeSize = max - min;
	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
// Type definition for testimonials
const testimonials = [
	// {
	// 	id: 'video-parents-compilation-2025',
	// 	name: 'Ms. Tremblay, Notting Hill',
	// 	designation: 'Parent',
	// 	subject: '8+ preparation',
	// 	testimonial:
	// 		'My Private Tutor Online transformed our whole family’s experience with education. Our daughter made marked progress with her entrance exam prep, but my husband and I also felt much less stressed about the whole thing. Elizabeth demystified the process and helped us understand how it works (we’re an expat family, so didn’t know the system here). Thank you for her progress and our peace of mind!',
	// 	avatar: (
	// 		<Image
	// 			src='/images/testimonials/Ms. Tremblay.jpg'
	// 			alt='Testimonial avatar'
	// 			width={80}
	// 			height={80}
	// 		/>
	// 	),
	// },
	{
		id: 'video-students-compilation-2025',
		name: 'Mr. DeCourtenay, Holland Park',
		designation: 'Parent',
		subject: 'Comprehensive KS3 Support',
		testimonial:
			'The change we’ve seen in Tilly is huge. She’s no longer procrastinating and trying to avoid her studies but rather leaning in and (I think!) actually enjoying learning again. The school report for this term has been the best yet too. Thank you!',
		avatar: (
			<Image
				src='/images/testimonials/Mr DeCourtenay.webp'
				alt='Testimonial avatar'
				width={80}
				height={80}
			/>
		),
	},
	{
		id: 'hawthorne-11plus-2024',
		name: 'Mr & Mrs Hawthorne, Kensington',
		designation: 'Parents of 11+ student',
		subject: '11+ Preparation',
		testimonial:
			"It's a full house - offers from St Pauls, Westminster, Highgate and UCS. We can't believe it!",
		avatar: (
			<Image
				src='/images/testimonials/Mr and Mrs Hawthorne.jpeg'
				alt='Testimonial avatar'
				width={80}
				height={80}
			/>
		),
	},
	{
		id: 'ms-adebayo-new-scholarship-2024',
		name: 'Ms Adebayo, New York',
		designation: 'Parent of scholarship student',
		subject: 'Gifted & Talented Programme',
		testimonial:
			"Brian and Gloria's teaching style is just right - not lecturing but engaging and really growing her enthusiasm for the subjects.",
		avatar: (
			<Image
				src='/images/testimonials/Ms. Adebayo.jpg'
				alt='Testimonial avatar'
				width={80}
				height={80}
			/>
		),
	},
	{
		id: 'mr-mrs-merittjones-a-level-2024',
		name: 'Mr & Mrs Meritt-Jones, Hampstead',
		designation: 'Parents of A-Level student',
		subject: 'A-Level Support',
		testimonial:
			"Newsflash! Thanks to you Jake has jumped from a U to two marks off a B - incredible progress in just a month and he really believes he's capable again.",
		avatar: (
			<Image
				src='/images/testimonials/Mr and Mrs Merritt-Jones.jpg'
				alt='Testimonial avatar'
				width={80}
				height={80}
			/>
		),
	},
	{
		id: 'mr-richardson-highgate-sen-2024',
		name: 'Mr Richardson, Highgate',
		designation: 'Parent of SEN students',
		subject: 'SEN Science & Mathematics',
		testimonial:
			'My twins have always struggled with Science and Maths. They also have ADHD and dyspraxia. I was determined that they would pass their GCSE exams and get at least a 5. Their tutors were unbelievable and the boys walked away with a 7 and an 8 grade respectively. We are thrilled!',
		avatar: (
			<Image
				src='/images/testimonials/Mr Richardson.jpeg'
				alt='Testimonial avatar'
				width={80}
				height={80}
			/>
		),
	},
	{
		id: 'mr-gupta-bath-gcse-2024',
		name: 'Mr Gupta, Bath',
		designation: 'Parent of GCSE student',
		subject: 'GCSE Mathematics',
		testimonial:
			"Annika scored a 7 in her GCSE retake. We are THRILLED. It's such an improvement on the 4 she got in the summer!",
		avatar: (
			<Image
				src='/images/testimonials/Mr Gupta.jpg'
				alt='Testimonial avatar'
				width={80}
				height={80}
			/>
		),
	},
	{
		id: 'aryan-oxbridge-2024',
		name: 'Aryan',
		designation: 'Oxford undergraduate',
		subject: 'Politics & Personal Statement',
		testimonial:
			'My tutor was amazing. He helped me craft a personal statement to stand out from the competition and also coached me for the interview - I got an offer from Oxford!',
		avatar: (
			<Image
				src='/images/testimonials/Arayan.jpg'
				alt='Testimonial avatar'
				width={80}
				height={80}
			/>
		),
	},
	// {
	// 	id: 'anonymous-parent-oxbridge-2024',
	// 	name: 'Anonymous Parent',
	// 	designation: 'Parent of Cambridge student',
	// 	subject: 'TMUA & Mathematics',
	// 	testimonial:
	// 		"The average score for Cambridge's TMUA test is 4.5. Our daughter scored 6.8, so we are delighted with that result! Huge thanks to you and Brandon for helping her achieve such an incredible result and secure her Cambridge offer!",
	// 	avatar: (
	// 		<Image
	// 			src=''
	// 			alt='Testimonial avatar'
	// 			width={80}
	// 			height={80}
	// 		/>
	// 	),
	// },
	{
		id: 'mr-mrs-li-gcse-2024',
		name: 'Mr & Mrs Li',
		designation: 'Parents of GCSE student',
		subject: 'GCSE Support',
		testimonial:
			'The world of tutoring is a minefield but your tutors are next level.',
		avatar: (
			<Image
				src='/images/testimonials/Mr and Mrs Li.jpg'
				alt='Testimonial avatar'
				width={80}
				height={80}
			/>
		),
	},
	{
		id: 'mr-telson-dubai-2024',
		name: 'Mr. Telson, Dubai, UAE',
		designation: 'Parent',
		subject: '7+ preparation',
		testimonial:
			'Oscar wanted to pass this onto Emily, please can you share? ‘I had my last exam today and wanted to say thank you for helping me prepare. I know loaaadddsss more now and felt really confident doing all my tests. You are the best teacher in the whole world!',
		avatar: (
			<Image
				src='/images/testimonials/Mr Telson.jpg'
				alt='Testimonial avatar'
				width={80}
				height={80}
			/>
		),
	},
	{
		id: 'mr-mrs-rosenthal-washington-2024',
		name: 'Mr and Mrs Rosenthal, Washington DC',
		designation: 'Parents',
		subject: 'IB DP online homeschooling programme',
		testimonial:
			'So grateful we’ve got your examiners to help the twins navigate this super stressful time. It’s really keeping them confident and grounded. Just wanted to pass on our sincere thanks.',
		avatar: (
			<Image
				src='/images/testimonials/Mr and Mrs Rosenthal.jpg'
				alt='Testimonial avatar'
				width={80}
				height={80}
			/>
		),
	},
];

// ✅ CONTEXT7 SOURCE: /framer/motion - Seamless infinite scroll with wrap function
const MotionMarquee = ({
	children,
	reverse = false,
	duration = 20,
}: {
	children: React.ReactNode;
	reverse?: boolean;
	duration?: number;
}) => {
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
				blockWidth > 0
					? Math.max(3, Math.ceil(containerWidth / blockWidth) + 2)
					: 3;
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
				maskImage:
					'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
				WebkitMaskRepeat: 'no-repeat',
				maskRepeat: 'no-repeat',
			}}>
			<m.div
				className='inline-flex gap-8 items-start will-change-transform'
				style={{ x }}>
				{Array.from({ length: numCopies }).map((_, i) => (
					<div
						key={i}
						ref={i === 0 ? blockRef : null}
						aria-hidden={i !== 0}
						className='inline-flex gap-8 shrink-0'>
						{children}
					</div>
				))}
			</m.div>
		</div>
	);
};

const Carousel_testimonial = () => (
	<div className='min-h-[300px] lg:min-h-screen flex justify-center items-center py-4 lg:py-12'>
		<div className='h-full w-full'>
			<h2 className='hidden md:block text-5xl font-semibold text-center tracking-[-0.03em] px-6 text-pretty'>
				Success Stories
			</h2>
			<p className='hidden md:block mt-3 text-center text-muted-foreground text-xl'>
				Real stories from families who have enjoyed exceptional results with us
			</p>
			<div className='mt-4 lg:mt-14 relative'>
				<div className='z-10 absolute left-0 inset-y-0 w-[15%] bg-linear-to-r from-background to-transparent' />
				<div className='z-10 absolute right-0 inset-y-0 w-[15%] bg-linear-to-l from-background to-transparent' />

				{/* Single line marquee */}
				<MotionMarquee duration={70}>
					<TestimonialList />
				</MotionMarquee>
			</div>
		</div>
	</div>
);

const TestimonialList = () =>
	testimonials.map((testimonial) => (
		<div
			key={testimonial.id}
			className='min-w-[16rem] max-w-[18rem] md:min-w-[24rem] md:max-w-[28rem] lg:min-w-[28rem] lg:max-w-[32rem] bg-accent p-6 flex-shrink-0 border border-neutral-300'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					{testimonial.avatar ? (
						<div className='w-12 h-12 rounded-full overflow-hidden'>
							{testimonial.avatar}
						</div>
					) : (
						<Avatar>
							<AvatarFallback className='text-xl font-medium bg-primary text-primary-foreground'>
								{testimonial.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
					)}
					<div>
						<p className='text-lg font-semibold'>{testimonial.name}</p>
						<p className='text-sm text-gray-500'>{testimonial.designation}</p>
					</div>
				</div>
				<Button
					variant='ghost'
					size='icon'
					className='relative w-16 h-16'>
					<Image
						src='/icons/favicon-96x96.png'
						alt='Brand Logo'
						fill
						className='object-contain'
					/>
				</Button>
			</div>
			<p className='mt-5 text-[17px] break-words whitespace-normal'>
				{testimonial.testimonial}
			</p>
		</div>
	));

export default Carousel_testimonial;
