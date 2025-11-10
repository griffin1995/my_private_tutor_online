'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { FirstLessonSection } from '@/components/sections/about/FirstLessonSection';
import { VideoMasterclassGrid } from '@/components/video/VideoMasterclassGrid';
import React from 'react';

// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR VIDEO MASTERCLASSES PAGE
// ============================================================================

// Type definition for video masterclasses
interface VideoMasterclass {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly bulletPoints?: readonly string[];
	readonly youtubeUrl: string | null;
	readonly thumbnailImage: string;
	readonly backgroundImage: string;
	readonly isPaid: boolean;
	readonly purchaseLink?: string;
}

// All video masterclasses used on this page (6 videos in specific order)
const VIDEO_MASTERCLASSES: readonly VideoMasterclass[] = [
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
		thumbnailImage: '/videos/unlocking-academic-success-thumbnail.png',
		backgroundImage: '/images/unlocking-academic-success-background.jpg',
		isPaid: false,
	},
	{
		id: 'ucasSummit2024',
		title: 'Bridging Gaps, Building Confidence',
		description:
			"In this webinar Elizabeth Burrows distills 15 years of international education experience into a practical, <strong>parent-first guide to implementing and managing private tuition that actually moves the needle</strong>.\n\nIn 30 minutes, you'll learn how to make confident, evidence-based decisions—before you select a tutor, during the engagement, and all the way to exam day—so your child gets measurable value and you get peace of mind.\n\nDiscover best practice for successfully navigating gaps in knowledge and boost confidence through one-to-one tuition.",
		youtubeUrl: 'https://www.youtube.com/embed/IfF9zSzuceY?si=7_tmYovUVVfqLX0D',
		thumbnailImage: '/videos/ucas-summit-2024-thumbnail.png',
		backgroundImage:
			'/videos/bridging-gaps-building-confidence-background-image-video-masterclasses-page.png',
		isPaid: false,
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
		thumbnailImage: '/images/masterclass-thumbnails/ucas-guide.png',
		backgroundImage: '/images/ucas-part-1-mortar-board-background.jpg',
		isPaid: true,
		purchaseLink: 'https://buy.stripe.com/7sY6oGdj767tbtO1Zd38408',
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
		thumbnailImage: '/images/video-thumbnails/top-10-tips-thumbnail.png',
		backgroundImage: '/images/ucas-part-2-library-background.jpg',
		isPaid: true,
		purchaseLink: 'https://buy.stripe.com/bJe4gy6UJ3ZlgO8avJ38409',
	},
	{
		id: 'britishEtiquette',
		title: 'British Etiquette & Social Navigation',
		description:
			"Drawing on her experience working with royalty and high-profile international families, Elizabeth demystifies the social codes that shape life in the UK's most prestigious schools and institutions.\n\nThis masterclass provides essential cultural awareness for international families navigating British educational and social environments.\n\nPerfect for building confidence and cultural fluency in formal British settings, delivered with partial Mandarin subtitles.",
		youtubeUrl: '',
		thumbnailImage: '/images/masterclass-thumbnails/british-etiquette.jpg',
		backgroundImage: '/images/british-etiquette-background.jpg',
		isPaid: true,
		purchaseLink: 'https://buy.stripe.com/cNidR8dj70N98hCeLZ3840b',
	},
	{
		id: 'britishLiteraryClassics',
		title: 'British Literary Classics',
		description:
			'From Wind in the Willows to The Lord of the Rings, this engaging masterclass introduces students to some of the most celebrated works in British literature.\n\nLed by Elizabeth Burrows, this session explores what defines a literary classic and examines key themes and cultural significance.\n\nPerfect for curious and aspiring readers aged 8-14, delivered to an international student audience with partial Mandarin subtitles.',
		youtubeUrl: '',
		thumbnailImage:
			'/images/masterclass-thumbnails/british-literary-classics.png',
		backgroundImage: '/images/british-classics-child-background.jpg',
		isPaid: true,
		purchaseLink: 'https://buy.stripe.com/aFa8wOfrffI3dBW47l3840a',
	},
] as const;

export default function VideoPage() {
	const allVideos = VIDEO_MASTERCLASSES;

	// Split videos into sections (0-1: featured, 2-3: UCAS, 4-5: culture)
	const featuredVideos = allVideos.slice(0, 2);
	const ucasVideos = allVideos.slice(2, 4);
	const cultureVideos = allVideos.slice(4, 6);

	const videoHeroImage = {
		src: '/images/hero/video-masterclasses.jpg',
	};

	return (
		<React.Fragment>
			<section id='video-hero'>
				<SimpleHero
					backgroundImage={videoHeroImage.src}
					h1={
				<span className='text-white'>
					Video Masterclasses & <span className='text-accent-600'>Educational Content</span>
				</span>
			}
					h2='A trusted guide to British education, culture, and university preparation'
					decorativeStyle='none'
				/>
			</section>

			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'
				verticalSpacing='none'
				className='space-y-0'
				footerProps={{
					showContactForm: true,
				}}>
				<section
					id='featured-free-section'
					className='py-12 sm:py-14 md:py-16'>
					<FirstLessonSection
						heading="The Parent's Roadmap to Effective Academic Help"
						paragraph="Access two complimentary masterclasses to benefit from Elizabeth Burrows' expert guidance, distilled from 15+ years in international education.

The journey of supporting a child through their education is fraught with complexity and uncertainty. <strong>When is a wobble a warning sign, and when is it just a blip?</strong> In a competitive, fast-changing curriculum, even engaged parents can feel unsure. The modern educational landscape presents unique challenges, with increasingly competitive environments. Understanding when and how to provide effective academic support requires deep insight into child development, learning psychology, and educational systems—knowledge that extends far beyond traditional parenting experience. Gain clarity and confidence from Elizabeth in these two complimentary seminars."
					/>
				</section>

				<VideoMasterclassGrid
					videos={featuredVideos}
					className='py-20 sm:py-26 md:py-32'
				/>

				<section
					id='ucas-section'
					className='py-12 sm:py-14 md:py-16'>
					<FirstLessonSection
						heading="University Admissions: Decoding Britain's Most Complex Educational Process"
						paragraph="The British university admissions system represents one of the most intricate and high-stakes processes that families will ever navigate. UCAS applications are governed by unwritten rules, implicit expectations, and nuanced requirements that can confound even highly educated parents. The personal statement alone - a 4,000 character document that can determine a young person's entire future - operates according to criteria that are rarely made explicit. The stakes are particularly high for competitive courses and prestigious institutions, where the margin for error is virtually nonexistent. Understanding university selection strategies, reference requirements, and timeline management requires intimate knowledge of how admissions departments actually evaluate candidates. Elizabeth Burrows has helped countless students secure offers from Oxbridge and top Russell Group universities. Unlock her expertise in these two masterclasses, as delivered at London School of Economics."
					/>
				</section>

				<VideoMasterclassGrid
					videos={ucasVideos}
					className='py-20 sm:py-26 md:py-32'
				/>

				<section
					id='british-culture-section'
					className='py-12 sm:py-14 md:py-16'>
					<FirstLessonSection
						heading="Reading Between the Lines: Navigating Britain's Educational Culture"
						paragraph='Cultural literacy is the unspoken foundation of success in British education. Literary knowledge, shared references and historical context quietly shape classroom discussion, exam questions and peer dynamics. International families often find capable children disadvantaged by these invisible cues, affecting interviews, seminar participation and confidence. Equally decisive is social navigation: the centuries-old codes that govern schools and universities - from dining etiquette in boarding houses to admissions protocols and teacher expectations. Social fluency influences opportunities, relationships and perceived fit as much as grades. In these two masterclasses Elizabeth Burrows guide explores the cultural capital and institutional conventions students must decode, helping families bridge gaps academic ability alone cannot close.'
					/>
				</section>

				<VideoMasterclassGrid
					videos={cultureVideos}
					className='py-20 sm:py-26 md:py-32'
				/>
			</PageLayout>
		</React.Fragment>
	);
}
