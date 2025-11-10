import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { TestimonialsSection } from '@/components/sections/about/testimonials-section';
import { Separator } from '@radix-ui/react-separator';
import { MissionQuote } from '@/components/ui/blockquote';
import { FlowbiteCompatibleAvatar as Avatar } from '@/components/ui/avatar';
import { memo } from 'react';
// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR TESTIMONIALS PAGE
// ============================================================================

// Type definition for testimonials
interface Testimonial {
	readonly id: string;
	readonly quote: string;
	readonly author: string;
	readonly role: string;
	readonly avatar?: string;
	readonly rating: number;
	readonly verified?: boolean;
	readonly date?: string;
	readonly location?: string;
	readonly subject?: string;
	readonly result?: string;
	readonly school?: string;
	readonly hasVideo: boolean;
	readonly videoUrl?: string;
	readonly videoThumbnail?: string;
	readonly duration?: number;
	readonly viewCount?: number;
	readonly uploadDate?: string;
	readonly category:
		| 'academic'
		| 'entrance-exam'
		| '11+'
		| 'gcse'
		| 'a-level'
		| 'oxbridge'
		| 'sen'
		| 'video'
		| 'scholarship'
		| 'ib';
	readonly featured?: boolean;
	readonly grade?: string;
	readonly year?: number;
}

// All testimonials (includes video and text testimonials)
const ALL_TESTIMONIALS: readonly Testimonial[] = [
	{
		id: 'video-parents-compilation-2025',
		quote:
			'My Private Tutor Online transformed our whole family’s experience with education. Our daughter made marked progress with her entrance exam prep, but my husband and I also felt much less stressed about the whole thing. Elizabeth demystified the process and helped us understand how it works (we’re an expat family, so didn’t know the system here). Thank you for her progress and our peace of mind!',
		author: 'Ms. Tremblay, Notting Hill',
		role: 'Parent',
		rating: 5,
		featured: true,
		category: 'video',
		subject: '8+ preparation',
		grade: 'Multiple School Placements',
		location: 'Various',
		year: 2025,
		result: 'Multiple Success Stories',
		verified: true,
		date: '2025-08-19',
		hasVideo: true,
		videoUrl: '/videos/compressed-elizabeth-introduction-sound.mp4',
		videoThumbnail: '/images/testimonials/parent-testimonials-thumbnail.jpg',
		duration: 300,
	},
	{
		id: 'video-students-compilation-2025',
		quote:
			'The change we’ve seen in Tilly is huge. She’s no longer procrastinating and trying to avoid her studies but rather leaning in and (I think!) actually enjoying learning again. The school report for this term has been the best yet too. Thank you!',
		author: 'Mr. DeCourtenay, Holland Park',
		role: 'Parent',
		rating: 5,
		featured: true,
		category: 'video',
		subject: 'Comprehensive KS3 Support',
		grade: 'Personal best scores on school report',
		location: 'Various',
		year: 2025,
		result: 'Academic Success & Confidence',
		verified: true,
		date: '2025-08-19',
		hasVideo: true,
		videoUrl: '/videos/compressed-elizabeth-introduction-sound.mp4',
		videoThumbnail: '/images/testimonials/student-testimonials-thumbnail.jpg',
		duration: 280,
	},
	{
		id: 'hawthorne-11plus-2024',
		quote:
			"It's a full house - offers from St Pauls, Westminster, Highgate and UCS. We can't believe it!",
		author: 'Mr & Mrs Hawthorne, Kensington',
		role: 'Parents of 11+ student',
		rating: 5,
		featured: true,
		category: '11+',
		subject: '11+ Preparation',
		grade: 'A*',
		location: 'Kensington',
		year: 2024,
		result: 'Multiple School Placements',
		verified: true,
		date: '2024-11-15',
		hasVideo: false,
	},
	{
		quote:
			"Brian and Gloria's teaching style is just right - not lecturing but engaging and really growing her enthusiasm for the subjects.",
		author: 'Ms Adebayo, New York',
		role: 'Parent of scholarship student',
		rating: 5,
		category: 'scholarship',
		subject: 'Gifted & Talented Programme',
		grade: 'A*',
		location: 'New York',
		year: 2024,
		result: 'Gifted & Talented Scholarship',
		verified: true,
		date: '2024-10-20',
		id: 'ms-adebayo-new-scholarship-2024',
		hasVideo: false,
	},
	{
		quote:
			"Newsflash! Thanks to you Jake has jumped from a U to two marks off a B - incredible progress in just a month and he really believes he's capable again.",
		author: 'Mr & Mrs Meritt-Jones, Hampstead',
		role: 'Parents of A-Level student',
		rating: 5,
		category: 'a-level',
		subject: 'A-Level Support',
		grade: 'Significant Improvement',
		location: 'Hampstead',
		year: 2024,
		result: '+5 grades at A Level',
		verified: true,
		date: '2024-09-30',
		id: 'mr-mrs-merittjones-a-level-2024',
		hasVideo: false,
	},
	{
		quote:
			'My twins have always struggled with Science and Maths. They also have ADHD and dyspraxia. I was determined that they would pass their GCSE exams and get at least a 5. Their tutors were unbelievable and the boys walked away with a 7 and an 8 grade respectively. We are thrilled!',
		author: 'Mr Richardson, Highgate',
		role: 'Parent of SEN students',
		rating: 5,
		category: 'sen',
		subject: 'SEN Science & Mathematics',
		grade: 'Grades 7 & 8',
		location: 'Highgate',
		year: 2024,
		result: 'SEN specialist homeschooling',
		verified: true,
		date: '2024-08-25',
		id: 'mr-richardson-highgate-sen-2024',
		hasVideo: false,
	},
	{
		quote:
			"Annika scored a 7 in her GCSE retake. We are THRILLED. It's such an improvement on the 4 she got in the summer!",
		author: 'Mr Gupta, Bath',
		role: 'Parent of GCSE student',
		rating: 5,
		category: 'gcse',
		subject: 'GCSE Mathematics',
		grade: 'Grade 7',
		location: 'Bath',
		year: 2024,
		result: '+3 grades at GCSE',
		verified: true,
		date: '2024-12-01',
		id: 'mr-gupta-bath-gcse-2024',
		hasVideo: false,
	},
	{
		quote:
			'My tutor was amazing. He helped me craft a personal statement to stand out from the competition and also coached me for the interview - I got an offer from Oxford!',
		author: 'Aryan',
		role: 'Oxford undergraduate',
		rating: 5,
		category: 'oxbridge',
		subject: 'Politics & Personal Statement',
		grade: 'A*',
		location: 'Oxford',
		year: 2024,
		result: 'Politics Student, Balliol College, Oxford University',
		verified: true,
		date: '2024-08-15',
		id: 'aryan-oxbridge-2024',
		hasVideo: false,
	},
	{
		quote:
			"The average score for Cambridge's TMUA test is 4.5. Our daughter scored 6.8, so we are delighted with that result! Huge thanks to you and Brandon for helping her achieve such an incredible result and secure her Cambridge offer!",
		author: 'Anonymous Parent',
		role: 'Parent of Cambridge student',
		rating: 5,
		category: 'oxbridge',
		subject: 'TMUA & Mathematics',
		grade: '6.8/9.0',
		location: 'Cambridge',
		year: 2024,
		result: 'Maths Student, Churchill College, Cambridge University',
		verified: true,
		date: '2024-07-10',
		id: 'anonymous-parent-oxbridge-2024',
		hasVideo: false,
	},
	{
		quote: 'The world of tutoring is a minefield but your tutors are next level.',
		author: 'Mr & Mrs Li',
		role: 'Parents of GCSE student',
		rating: 5,
		category: 'gcse',
		subject: 'GCSE Support',
		grade: 'Grade 9s',
		location: 'Hong Kong',
		year: 2024,
		result: 'All 9s Achieved at GCSE',
		verified: true,
		date: '2024-06-15',
		id: 'mr-mrs-li-gcse-2024',
		hasVideo: false,
	},
	{
		quote:
			'Oscar wanted to pass this onto Emily, please can you share? ‘I had my last exam today and wanted to say thank you for helping me prepare. I know loaaadddsss more now and felt really confident doing all my tests. You are the best teacher in the whole world!',
		author: 'Mr. Telson, Dubai, UAE',
		role: 'Parent',
		rating: 5,
		category: 'gcse',
		subject: '7+ preparation',
		grade: 'Multiple School Placements',
		location: 'Hong Kong',
		year: 2024,
		result: 'All 9s Achieved at GCSE',
		verified: true,
		date: '2024-06-15',
		id: 'mr-mrs-li-gcse-2024',
		hasVideo: false,
	},
	{
		quote:
			'So grateful we’ve got your examiners to help the twins navigate this super stressful time. It’s really keeping them confident and grounded. Just wanted to pass on our sincere thanks.',
		author: 'Mr and Mrs Rosenthal, Washington DC',
		role: 'Parents',
		rating: 5,
		category: 'gcse',
		subject: 'IB DP online homeschooling programme',
		grade: '44 point score (45 is max)',
		location: 'Hong Kong',
		year: 2024,
		result: 'All 9s Achieved at GCSE',
		verified: true,
		date: '2024-06-15',
		id: 'mr-mrs-li-gcse-2024',
		hasVideo: false,
	},
] as const;

const OptimizedTestimonialCard = memo(function TestimonialCard({
	testimonial,
	index,
}: {
	testimonial: Testimonial;
	index: number;
}) {
	return (
		<div
			key={index}
			className='bg-white p-6 rounded-lg shadow-lg border border-neutral-100'>
			<div className='flex mb-4'>
				{[...Array(testimonial.rating)].map((_, i) => (
					<svg
						key={i}
						className='w-5 h-5 text-yellow-400 fill-current'
						viewBox='0 0 20 20'>
						<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
					</svg>
				))}
			</div>

			<blockquote className='text-neutral-700 italic mb-4'>
				&quot;{testimonial.quote}&quot;
			</blockquote>

			<Separator
				orientation='horizontal'
				decorative
				className='my-4 bg-neutral-100'
			/>

			<div>
				<div>{testimonial.author}</div>

				<div>{testimonial.role}</div>

				<div className='text-blue-600 mt-1 flex items-center gap-2'>
					<span>{testimonial.subject}</span>

					<Separator
						orientation='vertical'
						decorative
						className='h-3 bg-blue-300'
					/>
					<span>Grade: {testimonial.result}</span>
				</div>
			</div>
		</div>
	);
});

export default function TestimonialsPage() {
	const allTestimonials = ALL_TESTIMONIALS;

	return (
		<>
			{/* Hero Section - Outside PageLayout */}
			<section id='testimonials-hero'>
				<SimpleHero
					backgroundImage='/images/hero/testimonials.jpg'
					h1={
						<span className='text-white'>
							Student & Parent <span className='text-accent-600'>Testimonials</span>
						</span>
					}
					h2='Read testimonials from families who have achieved exceptional results with My Private Tutor Online.'
					decorativeStyle='lines'
				/>
			</section>

			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'>
				{/* Mission Quote Section */}
				<section
					id='mission-quote'
					className='py-8 md:py-12 bg-primary-50'>
					<div className='container mx-auto max-w-4xl px-6 sm:px-8 md:px-12 text-center'>
						<MissionQuote
							showCite={true}
							author='Elizabeth Burrows'
							role='Founder'>
							We provide <strong>exceptional tuition</strong> that helps
							students <strong>excel academically</strong> and{' '}
							<u>thrive personally</u>, opening doors to greater opportunities—at
							school and in life.
						</MissionQuote>
					</div>
				</section>

				{/* Video Testimonials Section */}
				<section id='video-testimonials-moved'>
					<TestimonialsSection />
				</section>

				{/* Featured Testimonials Carousel */}
				<section
					id='testimonials-featured-carousel'
					className='py-12 sm:py-14 md:py-16 bg-neutral-50'>
					<div className='text-center mb-8 sm:mb-10 md:mb-12 px-8 sm:px-12 md:px-16'>
						<h2 className='mb-4'>More Student Success Stories</h2>

						<p className='text-primary-600 max-w-3xl mx-auto'>
							Read additional testimonials from families who have achieved exceptional
							results with our tutoring
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 px-8 sm:px-12 md:px-16'>
						{allTestimonials.map((testimonial, index) => (
							<OptimizedTestimonialCard
								key={`featured-testimonial-${testimonial.author}-${index}`}
								testimonial={testimonial}
								index={index}
							/>
						))}
					</div>
				</section>
				{/* <Carousel_testimonial /> */}
			</PageLayout>
		</>
	);
}
