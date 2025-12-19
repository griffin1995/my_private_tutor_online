'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { HeadingText, TitleText, BodyText, CaptionText } from '@/components/ui/typography';

// Enhanced testimonial interface (matching existing structure)
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

// Use the same testimonial data from the carousel component
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

// Individual testimonial card using shadcn/ui Card components
interface TestimonialCardProps {
	testimonial: TestimonialData;
}

const TestimonialStaticCard = ({ testimonial }: TestimonialCardProps) => (
	<Card className="h-full flex flex-col border-2 border-primary-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-none">
		<CardHeader className="flex-shrink-0">
			<div className="flex items-center gap-3 sm:gap-4 mb-3">
				{testimonial.avatar && (
					<div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-accent-500 flex-shrink-0">
						<Image
							src={testimonial.avatar}
							alt={`${testimonial.author} photo`}
							width={56}
							height={56}
							className="object-cover w-full h-full"
						/>
					</div>
				)}
				<div className="min-w-0 flex-1">
					<TitleText variant="medium" level={3} className="font-semibold text-primary-900 truncate" responsive>
						{testimonial.author}
					</TitleText>
					<CaptionText variant="default" className="text-primary-600 truncate">
						{testimonial.role}
					</CaptionText>
				</div>
			</div>

			{/* Star Rating */}
			<div className="flex mb-2">
				{[...Array(testimonial.rating)].map((_, i) => (
					<Star
						key={i}
						className="w-4 h-4 sm:w-5 sm:h-5 text-accent-600 fill-current"
					/>
				))}
			</div>
		</CardHeader>

		<CardContent className="flex-1 flex flex-col">
			{/* Quote */}
			<BodyText variant="default" className="text-primary-700 leading-relaxed mb-4 flex-1" responsive>
				&quot;{testimonial.quote}&quot;
			</BodyText>

			{/* Subject Badge and Logo - Bottom Row */}
			{testimonial.subject && (
				<div className="mt-auto pt-4 border-t border-primary-100 flex items-center justify-between">
					<CaptionText variant="default" className="inline-block px-3 py-1 bg-primary-50 text-primary-700 font-medium rounded-none" responsive>
						{testimonial.subject}
					</CaptionText>
					<div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 relative">
						<Image
							src="/icons/favicon-96x96.png"
							alt="My Private Tutor Online"
							fill
							className="object-contain"
						/>
					</div>
				</div>
			)}
		</CardContent>
	</Card>
);

// Main testimonials static grid component - enterprise approach
interface TestimonialsStaticGridProps {
	className?: string;
	title?: string;
	description?: string;
}

export const TestimonialsStaticGrid = ({
	className = '',
	title = 'All Testimonials',
	description = 'Read what families say about their experience with My Private Tutor Online.',
}: TestimonialsStaticGridProps) => {
	return (
		<section className={`py-12 sm:py-16 md:py-20 bg-white ${className}`}>
			{/* Full width container with consistent gap spacing on edges */}
			<div className="w-full px-6 sm:px-8 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12 sm:mb-16">
					<HeadingText variant="primary" level={2} className="text-primary-900 mb-4" alignment="center" responsive>
						{title}
					</HeadingText>
					<BodyText variant="large" className="text-primary-600 max-w-3xl mx-auto" alignment="center" responsive>
						{description}
					</BodyText>
				</div>

				{/* Responsive Grid with consistent edge spacing matching gap values */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
					{TESTIMONIALS_DATA.map((testimonial) => (
						<TestimonialStaticCard
							key={testimonial.id}
							testimonial={testimonial}
						/>
					))}
				</div>
			</div>
		</section>
	);
};