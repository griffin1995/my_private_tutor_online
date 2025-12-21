'use client';

import { TabContentLayout } from './tab-content-layout';
import type { TabContentData } from './tab-content-layout';
import { GraduationCap, ClipboardCheck, BookOpen, UserCheck, TrendingUp, Star } from 'lucide-react';

const secondarySchoolData: TabContentData = {
	tabName: 'Secondary School Tutoring',
	mainFeatures: {
		description:
			'One-to-one tutoring for KS3, GCSE, A-Level and IB, delivered by experienced subject specialists and examiners. Our support goes beyond the syllabus, equipping students with effective revision strategies, time management skills and structured study plans. 94% of students improve by at least two grades at GCSE.',
		features: [
			{
				id: 'secondary-tutoring-today',
				heading: 'Tutoring Today for Success Tomorrow',
				icon: GraduationCap,
				description:
					'GCSEs, A-Levels and IB exams mark crucial academic transition points. As subjects become more complex, results in these qualifications play a defining role in shaping university pathways. A minimum requirement of 7s at GCSE is now standard at many top-tier universities. Personalised, one-to-one tuition can make a significant difference at both GCSE and A Level, helping students strengthen their academic record, ready to present a dynamite profile when it matters most.',
			},
			{
				id: 'secondary-personalised-plans',
				heading: 'Personalised Plans to Ensure Maximum Progress',
				icon: ClipboardCheck,
				description:
					'Each student is initially assessed to identify their individual strengths, learning style and areas for growth. Regular progress check-ins and measurable academic outcomes ensure students stay on track for success.',
			},
			{
				id: 'secondary-subjects-coverage',
				heading: 'Subjects We Tutor',
				icon: BookOpen,
				description:
					'Comprehensive subject coverage across all key academic areas including STEM subjects, humanities, languages, and creative disciplines. Our tutors are subject specialists with extensive examination experience.\n\nSTEM & Mathematical Subjects: Advanced mathematics and scientific disciplines taught by specialists with extensive examination board experience.\n\nHumanities & Social Sciences: Comprehensive humanities education covering literature, history, politics, and social sciences with expert guidance.\n\nLanguages: Modern and classical language tuition with native speakers and qualified language specialists.\n\nCreative & Arts-Based Subjects: Creative disciplines taught by practising professionals and experienced arts educators.\n\nAdditional Academic Support: Specialised academic skills and examination preparation beyond core curriculum subjects.',
			},
		],
	},
	callOuts: {
		features: [
			{
				id: 'secondary-callout-1',
				heading: 'Subject Specialists',
				icon: UserCheck,
				description:
					'Expert tutors with extensive examination board experience delivering targeted support for KS3, GCSE, A-Level, and IB.',
			},
			{
				id: 'secondary-callout-2',
				heading: '94% Grade Improvement',
				icon: TrendingUp,
				description:
					'94% of students improve by at least two grades at GCSE through our personalised one-to-one tutoring approach.',
			},
			{
				id: 'secondary-callout-3',
				heading: 'Beyond the Syllabus',
				icon: Star,
				description:
					'Comprehensive support including revision strategies, time management skills, and structured study plans for long-term success.',
			},
		],
	},
	stats: {
		heading: 'Secondary School Success Statistics',
		description: 'Proven results that demonstrate the impact of our personalised tutoring approach',
		stats: [
			{
				id: 'secondary-grade-improvement',
				value: '94%',
				label: 'of our students improve by two grades or more at GCSE',
				description: 'Based on analysis of over 500 student outcomes in 2024'
			},
			{
				id: 'secondary-a-level-results',
				value: '89%',
				label: 'achieve A*-B grades at A-Level with our support',
				description: 'Consistently outperforming national averages'
			},
			{
				id: 'secondary-university-offers',
				value: '97%',
				label: 'receive offers from their first-choice universities',
				description: 'Including Russell Group and competitive courses'
			},
		],
	},
	testimonial: {
		quote:
			"Annika scored a 7 in her GCSE retake. We are THRILLED. It's such an improvement on the 4 she got in the summer!",
		author: {
			name: 'Mr Gupta, Bath',
			role: 'Parent of GCSE student',
			avatar: {
				src: '/images/testimonials/Mr Gupta.jpg',
				alt: 'Mr Gupta',
			},
		},
	},
};

export function SecondarySchoolContent() {
	return <TabContentLayout data={secondarySchoolData} />;
