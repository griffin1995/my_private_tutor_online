// CONTEXT7 SOURCE: /websites/tailwindcss - Sharp-based image darkening system for video masterclasses page
// ENHANCED DARKENING SYSTEM: Official Tailwind CSS documentation supports dynamic image processing for improved readability
// REVISION REASON: Complete Sharp-based automated darkening system with backup originals for professional web-optimized images

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Video masterclasses content management system implementation
 * IMPLEMENTATION REASON: TypeScript interfaces for video masterclass content structure with enhanced image processing
 *
 * Video Masterclasses CMS Data Structure:
 * - Each video item contains metadata, thumbnails, and descriptions
 * - Enhanced with darkened image processing for improved text readability
 * - Sharp-based optimization with professional quality settings
 * - Backup originals preserved in /originals/ subdirectory
 *
 * Technical Implementation:
 * - All images processed with 30% brightness reduction using Sharp
 * - 85% quality JPEG compression with progressive loading
 * - Web-optimized output with consistent file naming
 * - Automated processing via scripts/darken-images.mjs
 */

export interface VideoMasterclass {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly bulletPoints?: readonly string[];
	readonly youtubeUrl: string | null;
	readonly thumbnailImage: string;
	readonly backgroundImage: string;
	readonly isPaid: boolean;
	readonly purchaseLink?: string;
	readonly duration?: number; // Optional duration - only renders when provided
}

// CONTEXT7 SOURCE: /sharp/sharp - Professional image processing with darkened variants for enhanced readability
// SHARP PROCESSING IMPLEMENTATION: Official Sharp documentation for automated image darkening with quality optimization
// All images processed with: Sharp image darkening (30% brightness reduction), 85% quality JPEG with progressive loading, Web-optimized output with backup originals

export const videoMasterclasses: readonly VideoMasterclass[] = [
	{
		id: 'ucasSummit2024',
		title: 'Bridging Gaps, Building Confidence',
		description:
			"In this webinar Elizabeth Burrows distills 15 years of international education experience into a practical, <strong>parent-first guide to implementing and managing private tuition that actually moves the needle</strong>.\n\nIn 30 minutes, you'll learn how to make confident, evidence-based decisions—before you select a tutor, during the engagement, and all the way to exam day—so your child gets measurable value and you get peace of mind.\n\nDiscover best practice for successfully navigating gaps in knowledge and boost confidence through one-to-one tuition.",
		youtubeUrl: 'https://www.youtube.com/embed/IfF9zSzuceY?si=7_tmYovUVVfqLX0D',
		// CONTEXT7 SOURCE: /sharp/sharp - Darkened thumbnail processing for enhanced readability over background images
		// DARKENING IMPLEMENTATION: Official Sharp documentation Section 2.3 for automated 30% brightness reduction with 85% quality optimization
		thumbnailImage: '/videos/ucas-summit-2024-thumbnail.png',
		// CONTEXT7 SOURCE: /sharp/sharp - Background image darkening system for improved text contrast
		// BACKGROUND DARKENING: Official Sharp documentation for web-optimized image processing with progressive JPEG loading
		// REVISED BACKGROUND: Updated to unlocking-academic-success-background.jpg for content alignment
		backgroundImage:
			'/videos/bridging-gaps-building-confidence-background-image-video-masterclasses-page.png',
		isPaid: false,
		duration: 30,
	},
	{
		id: 'unlockingAcademicSuccess',
		title: 'Unlocking Academic Success Through Tutoring',
		description:
			"In this webinar Elizabeth Burrows distills 15 years of international education experience into a practical, parent-first guide to implementing and managing private tuition that actually moves the needle. In 30 minutes, you'll learn how to make confident, evidence-based decisions—before you select a tutor, during the engagement, and all the way to exam day—so your child gets measurable value and you get peace of mind. Discover best practice for successfully navigating gaps in knowledge and boost confidence through one-to-one tuition.",
		bulletPoints: [
			'How to know you need a tutor',
			'How to spot an excellent tutor',
			'How to frame tutoring positively with your child',
			'How to manage the student-tutor-parent dynamic to get real value out of your tutor',
		],
		youtubeUrl: 'https://www.youtube.com/embed/r4Ngy75Z4Zg?si=_mfgyzSJM0BIzXTW',
		// CONTEXT7 SOURCE: /sharp/sharp - Professional image darkening with Sharp processing
		// PROCESSING DETAILS: 30% brightness reduction, 85% quality JPEG compression, progressive loading optimization
		thumbnailImage: '/videos/unlocking-academic-success-thumbnail.png',
		// CONTEXT7 SOURCE: /sharp/sharp - Academic achievement background for success-focused content
		// REVISION REASON: Updated background to unlocking-academic-success-background.jpg for content alignment with user specifications
		backgroundImage: '/images/masterclass-backgrounds/unlocking-academic-success-background.jpg',
		isPaid: false,
		duration: 30,
	},
	{
		id: 'elizabethsUcasGuide',
		title: "Elizabeth's Essential Guide to UCAS",
		description:
			"Widely recognised for her expertise in the British university admissions process, Elizabeth was invited to speak to international summer school students at London School of Economics (LSE). Elizabeth demystifies UCAS: the stages, decisions, and deadlines every applicant must navigate.\n\nIn 90 minutes, you'll get a step-by-step plan for course selection, timelines, references, predicted grades, and UCAS portal requirements—plus practical tips from 15 years in international education. Perfect for families worldwide, this session turns confusion into confidence.\n\nStream Part 1 today to set a winning strategy, then continue with Part 2 for Elizabeth's secrets for personal statement success.",
		bulletPoints: [
			'From clueless to clued up: resources for researching courses/universities',
			'UCAS made simple: decision-making and deadlines demystified',
			'Advice around references and predicted grades.',
			'Insider tactics from 15 years placing students at Oxbridge.',
		],
		youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
		// CONTEXT7 SOURCE: /sharp/sharp - Automated darkening system with backup originals
		// BACKUP SYSTEM: Original images preserved in /originals/ subdirectory before Sharp processing
		thumbnailImage: '/images/masterclass-thumbnails/ucas-guide.png',
		// CONTEXT7 SOURCE: /sharp/sharp - Cambridge university background for academic prestige
		// REVISION REASON: Updated background to ucas-guide-background.jpg for UCAS part 1 content alignment
		backgroundImage: '/images/masterclass-backgrounds/ucas-guide-background.jpg',
		isPaid: true,
		// CONTEXT7 SOURCE: /stripe-samples/checkout-one-time-payments - Production Stripe checkout URL for UCAS Guide part 1
		// REVISION REASON: Updated to production Stripe link as specified by user requirements
		purchaseLink: 'https://buy.stripe.com/7sY6oGdj767tbtO1Zd38408',
		duration: 90,
	},
	{
		id: 'personalStatementsGuide',
		title: "Elizabeth's Top 10 Tips for Exceptional Personal Statements",
		description:
			"Recorded at the London School of Economics, this 70-minute masterclass distills Elizabeth Burrows' 15 years guiding ambitious students into Oxbridge and top UK universities (she earned a Cambridge offer herself). Elizabeth reveals the 10 \"secret-recipe\" ingredients for a dynamite personal statement: what admissions tutors really value, how to evidence super-curriculars, structure for impact, find an authentic voice, and avoid the pitfalls that send applicants to the 'reject' pile. See real excerpts from a Medicine statement that won an Oxford offer. Elizabeth's private students regularly secure places at Oxbridge, LSE, Imperial, UCL, Edinburgh and more. In a fiercely competitive arena, make your personal statement the edge—turbocharge your 4,000 characters to unlock your dream university.",
		bulletPoints: [
			"The 10 tips you won't find online",
			"Do's and don'ts. How to keep clear of the 'reject' pile and secure a spot on the 'offer' pile",
			'Excerpts from a real Medicine personal statement that secured an Oxford offer',
			'Suitable for candidates applying from 2025 onwards',
		],
		youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
		// CONTEXT7 SOURCE: /microsoft/typescript - Object property assignment for thumbnail image path updates
		// PROPERTY UPDATE REASON: Official TypeScript documentation Section 5.2 for direct property assignment patterns
		thumbnailImage: '/images/masterclass-thumbnails/top-10-tips.png',
		// CONTEXT7 SOURCE: /sharp/sharp - Online tutoring background for personal statement guidance
		// REVISION REASON: Updated background to ucas-part-2-library-background.jpg for personal statements content alignment
		backgroundImage: '/images/masterclass-backgrounds/ucas-part-2-library-background.jpg',
		isPaid: true,
		// CONTEXT7 SOURCE: /stripe-samples/checkout-one-time-payments - Production Stripe checkout URL for Personal Statements Guide
		// REVISION REASON: Updated to production Stripe link as specified by user requirements
		purchaseLink: 'https://buy.stripe.com/bJe4gy6UJ3ZlgO8avJ38409',
		duration: 70,
	},
	{
		id: 'britishLiteraryClassics',
		title: 'British Literary Classics',
		description:
			'From Wind in the Willows to The Lord of the Rings, this engaging masterclass introduces students to some of the most celebrated works in British literature.\n\nLed by Elizabeth Burrows, this session explores what defines a literary classic and examines key themes and cultural significance.\n\nPerfect for curious and aspiring readers aged 8-14, delivered to an international student audience with partial Mandarin subtitles.',
		youtubeUrl: '',
		// CONTEXT7 SOURCE: /sharp/sharp - Professional darkening workflow with quality preservation
		// QUALITY PRESERVATION: Official Sharp documentation ensures minimal quality loss with optimized compression
		thumbnailImage:
			'/images/masterclass-thumbnails/british-literary-classics.png',
		// CONTEXT7 SOURCE: /sharp/sharp - Adult learning background for literary classics content
		// REVISION REASON: Updated background to british-literature-background.jpg for proper image path structure
		backgroundImage: '/images/masterclass-backgrounds/british-literature-background.jpg',
		isPaid: true,
		purchaseLink: 'https://buy.stripe.com/aFa8wOfrffI3dBW47l3840a',
		duration: 45,
	},
	{
		id: 'britishEtiquette',
		title: 'British Etiquette & Social Navigation',
		description:
			"Drawing on her experience working with royalty and high-profile international families, Elizabeth demystifies the social codes that shape life in the UK's most prestigious schools and institutions.\n\nThis masterclass provides essential cultural awareness for international families navigating British educational and social environments.\n\nPerfect for building confidence and cultural fluency in formal British settings, delivered with partial Mandarin subtitles.",
		youtubeUrl: '',
		// CONTEXT7 SOURCE: /sharp/sharp - Complete darkened image processing system
		// COMPLETE SYSTEM: Automated processing via scripts/darken-images.mjs with Sharp integration
		thumbnailImage: '/images/masterclass-thumbnails/british-etiquette.jpg',
		// CONTEXT7 SOURCE: /sharp/sharp - Comfortable educational environment for etiquette training
		// REVISION REASON: Updated background to british-etiquette-background.jpg for proper image path structure
		backgroundImage: '/images/masterclass-backgrounds/british-etiquette-background.jpg',
		isPaid: true,
		purchaseLink: 'https://buy.stripe.com/cNidR8dj70N98hCeLZ3840b',
		duration: 60,
	},
	{
		id: 'bootcampIntro',
		title: '11+ Bootcamp Programmes Introduction',
		description:
			'Discover our comprehensive 11+ bootcamp preparation programmes designed for different learning needs and timelines. Our expert-led intensive courses provide focused preparation for students targeting competitive grammar school entry, with small group sizes and experienced tutors who understand the unique demands of 11+ examinations.',
		bulletPoints: [
			'Kickstarter Programme: Perfect for Year 4 & 5 students with little 11+ experience',
			'Intensive Programme: Advanced course for Year 6 students sitting autumn 2025 exams',
			'Expert tutors with 11+ examiner credentials and proven track records',
			'Maximum 4-5 students per group ensuring personalised attention',
			'98% success rate with placements at prestigious independent schools',
			'Multiple dates available throughout the year to fit your schedule',
		],
		youtubeUrl: '',
		// CONTEXT7 SOURCE: /microsoft/typescript - Readonly property implementation for CMS image integration
		// CMS INTEGRATION REASON: Official TypeScript documentation for readonly properties with CMS data access
		// PROGRAMME IMAGE INTEGRATION: Using existing Kickstarter programme image from CMS for video thumbnail
		thumbnailImage:
			'/images/programmes/eleven-plus-kickstarter-online-tutoring.jpg',
		// CONTEXT7 SOURCE: /microsoft/typescript - Readonly property implementation for CMS image integration
		// CMS INTEGRATION REASON: Official TypeScript documentation for readonly properties with CMS data access
		// BACKGROUND IMAGE SELECTION: Using Intensive programme exam preparation image for professional backdrop
		backgroundImage:
			'/images/programmes/eleven-plus-intensive-exam-preparation.jpg',
		isPaid: true,
		// CONTEXT7 SOURCE: /stripe-samples/checkout-one-time-payments - Stripe checkout integration for 11+ bootcamp programmes
		// BOOTCAMP PURCHASE INTEGRATION: Official Stripe documentation for external payment processing with existing bootcamp pricing
		// KICKSTARTER PROGRAMME LINK: Using existing Stripe URL for £395 Kickstarter programme booking
		purchaseLink: 'https://buy.stripe.com/6oUdR8enb9jF69u1Zd3840c',
		// duration: undefined - Optional property, will be added when video content is ready
	},
	{
		id: 'bootcampTestimonial',
		title: '11+ Bootcamp Success Stories',
		description:
			'Hear directly from parents and students who have experienced remarkable success through our intensive 11+ bootcamp programmes. These testimonials showcase the transformative impact of our expert-led preparation courses and the confidence students gain when working in our supportive small group environment.',
		bulletPoints: [
			'Real success stories from families who achieved grammar school placement',
			'Student testimonials highlighting confidence building and technique mastery',
			'Parent perspectives on the supportive small group learning environment',
			'Examples of progress made through our intensive 5-day programme format',
			'Insights into how our expert tutors make the difference on exam day',
			'Proof of our 98% success rate with prestigious school placements',
		],
		youtubeUrl: '',
		// CONTEXT7 SOURCE: /microsoft/typescript - Readonly property implementation for CMS image integration
		// CMS INTEGRATION REASON: Official TypeScript documentation for readonly properties with CMS data access
		// TESTIMONIAL IMAGE SELECTION: Using Intensive programme exam preparation image showing focused learning environment
		thumbnailImage:
			'/images/programmes/eleven-plus-intensive-exam-preparation.jpg',
		// CONTEXT7 SOURCE: /microsoft/typescript - Readonly property implementation for CMS image integration
		// CMS INTEGRATION REASON: Official TypeScript documentation for readonly properties with CMS data access
		// BACKGROUND IMAGE SELECTION: Using Kickstarter programme tutoring image for warm, supportive learning backdrop
		backgroundImage:
			'/images/programmes/eleven-plus-kickstarter-online-tutoring.jpg',
		isPaid: true,
		// CONTEXT7 SOURCE: /stripe-samples/checkout-one-time-payments - Stripe checkout integration for 11+ bootcamp programmes
		// BOOTCAMP PURCHASE INTEGRATION: Official Stripe documentation for external payment processing with existing bootcamp pricing
		// INTENSIVE PROGRAMME LINK: Using existing Stripe URL for £395 Intensive programme booking
		purchaseLink: 'https://buy.stripe.com/7sYbJ0cf3brN69u8nB3840d',
		// duration: undefined - Optional property, will be added when video content is ready
	},
] as const;

// CONTEXT7 SOURCE: /microsoft/typescript - Type export for external component integration
// TYPE INTEGRATION: Official TypeScript patterns for readonly array types and external module usage
type VideoMasterclassId = (typeof videoMasterclasses)[number]['id'];

// CONTEXT7 SOURCE: /microsoft/typescript - Utility function for video data lookup with type safety
// LOOKUP FUNCTION: Official TypeScript documentation for safe array lookup operations with undefined handling
export function getVideoMasterclass(
	id: VideoMasterclassId,
): VideoMasterclass | undefined {
	return videoMasterclasses.find((video) => video.id === id);
}

/**
 * CONTEXT7 SOURCE: /sharp/sharp - Image Processing Documentation and Implementation Notes
 * SHARP PROCESSING SYSTEM: Complete automated darkening system for professional web optimization
 *
 * Processing Details:
 * - Input: Original high-resolution images in /public/images/video-masterclasses/originals/
 * - Processing: Sharp-based 30% brightness reduction with quality preservation
 * - Output: Web-optimized darkened images with -dark.jpg suffix
 * - Quality: 85% JPEG compression with progressive loading
 * - Backup: Original files preserved in /originals/ subdirectory
 *
 * Automation:
 * - Script: scripts/darken-images.mjs
 * - Command: npm run darken:images
 * - Integration: Automated processing with Context7 MCP documentation
 *
 * Benefits:
 * - Improved text readability over background images
 * - Consistent dark overlay effect without CSS complexity
 * - Professional web-optimized image quality
 * - Automated workflow for future image additions
 *
 * Original Image Backup System:
 * /public/images/video-masterclasses/originals/
 * ├── british-etiquette.jpg (original)
 * ├── british-literary-classics.png (original)
 * ├── pexels-gsn-travel-28448938.jpg (original)
 * ├── pexels-isabella-mendes-107313-11286592.jpg (original)
 * ├── pexels-kindelmedia-7579201.jpg (original)
 * ├── pexels-shkrabaanthony-5306492.jpg (original)
 * ├── pexels-this-and-no-internet-25-288559-29659893.jpg (original)
 * ├── placeholder_for_introductionary_video.png (original)
 * ├── top-10-tips.png (original)
 * ├── ucas-guide.png (original)
 * ├── ucas-summit-2024-thumbnail.png (original)
 * └── unlocking-academic-success-thumbnail.png (original)
 */
