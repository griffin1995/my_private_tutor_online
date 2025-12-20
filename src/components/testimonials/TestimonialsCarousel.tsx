'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { BodyText, CaptionText } from '@/components/ui/typography';

// Enhanced testimonial interface (using existing structure from ScrollingTestimonials.tsx)
interface TestimonialData {
	readonly id: string;
	readonly quote: string;
	readonly author: string;
	readonly role: string;
	readonly avatar?: string;
	readonly rating: number;
	readonly subject?: string;
	readonly result?: string;
}

// Use the same testimonial data from the existing component
const TESTIMONIALS_DATA: readonly TestimonialData[] = [
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

// Individual testimonial card component with Motion animations
interface TestimonialCardProps {
	testimonial: TestimonialData;
	index?: number;
}

const TestimonialCard = ({ testimonial, index = 0 }: TestimonialCardProps) => {
	// Standardized intersection observer for each card
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});

	// Standardized animation variants
	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.6, ease: "easeOut" }
	};

	const scaleIn = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		transition: { duration: 0.6, ease: "easeOut" }
	};

	return (
		<div
			ref={ref}
			className="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] lg:min-w-[450px] max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] bg-white p-4 sm:p-5 md:p-6 flex-shrink-0 border-2 border-primary-100 shadow-lg mr-4 sm:mr-6 md:mr-8"
			{...fadeInUp}
				y: -5,
				boxShadow: '0 20px 30px rgba(0,0,0,0.15)',
				transition: { duration: 0.3, ease: "easeOut" }
			}}>
			<div
				className="flex items-center gap-3 sm:gap-4 mb-4"
				{...fadeInUp}
				{testimonial.avatar && (
					<div
						className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-accent-500 flex-shrink-0"
						{...scaleIn}
						<Image
							src={testimonial.avatar}
							alt={`${testimonial.author} photo`}
							width={48}
							height={48}
							className="object-cover w-full h-full"
						/>
					</div>
				)}
				<div className="min-w-0">
					<CaptionText
						variant="default"
						className="font-semibold text-primary-900 truncate text-sm sm:text-base lg:text-lg"
						responsive>
						{testimonial.author}
					</CaptionText>
					<CaptionText
						variant="small"
						className="text-primary-600 truncate"
						responsive>
						{testimonial.role}
					</CaptionText>
				</div>
			</div>

			{/* Star Rating */}
			<div
				className="flex mb-3 sm:mb-4"
				{...fadeInUp}
				{[...Array(testimonial.rating)].map((_, i) => (
					<div
						key={i}
							duration: 0.3,
							ease: "easeOut",
							delay: index * 0.1 + 0.4 + i * 0.05
						}}>
						<Star className="w-4 h-4 sm:w-5 sm:h-5 text-accent-600 fill-current" />
					</div>
				))}
			</div>

			{/* Quote */}
			<div
				{...scaleIn}
				<BodyText
					variant="default"
					className="text-primary-700 leading-relaxed mb-4 break-words text-sm sm:text-base md:text-[17px]"
					responsive>
					&quot;{testimonial.quote}&quot;
				</BodyText>
			</div>

			{/* Subject Badge and Logo - Bottom Row */}
			{testimonial.subject && (
				<div
					className="mt-auto pt-3 sm:pt-4 border-t border-primary-100 flex items-center justify-between"
					>CaptionText
						variant="small"
						className="inline-block px-2 sm:px-3 py-1 bg-primary-50 text-primary-700 font-medium"
						responsive>
						{testimonial.subject}
					</CaptionText>
					<div
						className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 relative"
						{...scaleIn}
						<Image
							src="/icons/favicon-96x96.png"
							alt="My Private Tutor Online"
							fill
							className="object-contain"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

// Main testimonials carousel component - completely isolated
interface TestimonialsCarouselProps {
	className?: string;
	autoScrollSpeed?: number;
	stopOnHover?: boolean;
}

export const TestimonialsCarousel = ({
	className = '',
	autoScrollSpeed = 1,
	stopOnHover = true,
}: TestimonialsCarouselProps) => {
	const [emblaRef] = useEmblaCarousel(
		{
			loop: true,
			align: 'start',
			dragFree: false,
			containScroll: false,
		},
		[
			AutoScroll({
				speed: autoScrollSpeed,
				startDelay: 1000,
				direction: 'forward',
				stopOnInteraction: false,
				stopOnMouseEnter: stopOnHover,
				stopOnFocusIn: true,
			}),
		]
	);

	// Standardized intersection observer for carousel container
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});

	// Standardized animation variants
	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.6, ease: "easeOut" }
	};

	return (
		<div
			ref={ref}
			className={`py-8 sm:py-10 md:py-12 bg-neutral-50 ${className}`}
			>div
				className="overflow-hidden"
				ref={emblaRef}
				>div className="flex">
					{TESTIMONIALS_DATA.map((testimonial, index) => (
						<TestimonialCard
							key={testimonial.id}
							testimonial={testimonial}
							index={index}
						/>
					))}
				</div>
			</div>
		</div>
	);
};