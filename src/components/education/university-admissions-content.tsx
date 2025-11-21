'use client';

import { TabContentLayout } from './tab-content-layout';
import type { TabContentData } from './tab-content-layout';
import { Video, Crown, Lightbulb, FileText, Globe, CheckCircle } from 'lucide-react';

const universityAdmissionsData: TabContentData = {
	tabName: 'University Admissions',
	mainFeatures: {
		description:
			'Expert academic support for undergraduates and postgraduates, including essay coaching, dissertations, and subject-specific tutoring. Navigate complex British, European and American university admissions systems with confidence through personalised guidance, personal statement/college essays coaching and admissions test preparation.',
		features: [
			{
				id: 'university-box-1-elizabeth-ucas-video',
				heading: 'UCAS Insight from Elizabeth',
				icon: Video,
				description:
					'The British university admissions system represents one of the most intricate processes families will navigate. UCAS applications are governed by unwritten rules and implicit expectations that can confound even highly educated parents.\n\nWidely recognised for her expertise in the British university admissions process, Elizabeth was invited to speak to international summer school students at London School of Economics (LSE). Elizabeth demystifies UCAS: the stages, decisions, and deadlines every applicant must navigate.\n\nIn 90 minutes, you\'ll get a step-by-step plan for course selection, timelines, references, predicted grades, and UCAS portal requirements—plus practical tips from 15 years in international education. This video masterclass turns confusion into confidence.',
				videos: [
					{
						id: 'elizabeth-ucas-guide-video',
						// youtubeUrl: 'https://www.youtube.com/embed/placeholder-ucas-1',
						thumbnailSrc: '/images/masterclass-thumbnails/ucas-guide.png',
						thumbnailAlt: 'UCAS Insight from Elizabeth',
						isFree: false,
						purchaseLink: 'https://buy.stripe.com/7sY6oGdj767tbtO1Zd38408',
					},
				],
			},
			{
				id: 'university-box-2',
				heading: 'Oxbridge Specialists',
				icon: Crown,
				description:
					'We support students applying to any UK, European or US university, but we\'re particularly known for our track record with Oxbridge offers.\n\nStudents are matched with tutors who have firsthand experience of navigating Oxbridge\'s exacting admissions process—and succeeding. These mentors offer more than just academic guidance; they bring insider knowledge of what makes an application stand out and how to present ideas with clarity and intellectual rigour.\n\nWe provide focused support with personal statements, admissions tests, and intensive interview coaching, ensuring students make the right impression at every stage. Our programmes are designed to help students demonstrate subject mastery, intellectual agility, and the independent thinking under pressure Oxbridge looks for.',
			},
			{
				id: 'university-box-3-elizabeth-personal-statement-video',
				heading: 'Elizabeth\'s Top 10 Tips for Sculpting an Outstanding Personal Statement',
				icon: Lightbulb,
				description:
					'The personal statement - a 4,000 character document that can determine a young person\'s entire future - operates according to criteria that are rarely made explicit.\n\nElizabeth knows what sets a personal statement apart. Here she distills 15 years of expertise into her Top 10 Tips, helping UCAS applicants defy the odds and secure spots at prestigious universities. These aren\'t recycled clichés — they\'re proven techniques you won\'t find anywhere else.\n\nRecorded at the London School of Economics, in this 70-minute masterclass distills Elizabeth reveals the 10 "secret-recipe" ingredients for a dynamite personal statement: what admissions tutors really value, how to evidence super-curriculars, structure for impact, find an authentic voice, and avoid the pitfalls that send applicants to the \'reject\' pile. See real excerpts from a Medicine statement that won an Oxford offer. Elizabeth\'s private students regularly secure places at Oxbridge, LSE, Imperial, UCL, Edinburgh and more.',
				videos: [
					{
						id: 'elizabeth-personal-statement-video',
						// youtubeUrl: 'https://www.youtube.com/embed/placeholder-statement',
						thumbnailSrc: '/images/video-thumbnails/top-10-tips-thumbnail.png',
						thumbnailAlt: 'Elizabeth\'s Top 10 Tips for Sculpting an Outstanding Personal Statement',
						isFree: false,
						purchaseLink: 'https://buy.stripe.com/bJe4gy6UJ3ZlgO8avJ38409',
					},
				],
			},
		],
	},
	callOuts: {
		features: [
			{
				id: 'university-callout-1',
				heading: 'Subject-Specific University Admissions Tests',
				icon: FileText,
				description:
					'Targeted preparation for high-stakes admissions assessments: TMUA, LNAT, SAT, ACT, BMAT, UCAT, TSA, ELAT, ESAT and IELTS. These tests often form a crucial part of university and course-specific admissions, particularly for competitive fields such as law, medicine, engineering and economics.',
			},
			{
				id: 'university-callout-2',
				heading: 'European and US applications',
				icon: Globe,
				description:
					'Each year, we support students applying to leading universities across Europe and the US. Our team includes Ivy League graduates with exceptional success records guiding international applicants to secure offers from top institutions.',
			},
			{
				id: 'university-callout-3',
				heading: 'Complete Application Support',
				icon: CheckCircle,
				description:
					'End-to-end guidance from course selection and personal statement through to interview preparation and offer management.',
			},
		],
	},
	stats: {
		stats: [
			{
				id: 'university-ucas-offers',
				value: '5/5',
				label: 'Students working with our personal statement specialists often receive 5/5 UCAS offers, including Oxbridge',
			},
		],
	},
	testimonial: {
		quote:
			'From a 22 to a 28 in the LNAT—Alex really helped boost my score. I can\'t wait to start at UCL - thank you!',
		author: {
			name: 'Simi',
			role: 'Law undergraduate at UCL',
			avatar: {
				src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
				alt: 'Simi',
			},
		},
	},
};

export function UniversityAdmissionsContent() {
	return <TabContentLayout data={universityAdmissionsData} />;
}
