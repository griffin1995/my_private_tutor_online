'use client';

import { TabContentLayout } from './tab-content-layout';
import type { TabContentData } from './tab-content-layout';
import { Shield, MapPin, Trophy, School, Map } from 'lucide-react';

const londonInPersonData: TabContentData = {
	tabName: 'London In-Person Tutoring',
	mainFeatures: {
		description:
			'In-person tutoring available across London. Sessions delivered by DBS-checked specialist tutors, qualified teachers and official examiners, in the comfort of your own home.',
		features: [
			{
				id: 'london-box-1',
				heading: 'DBS-Checked Specialist Tutors',
				icon: Shield,
				description:
					'Sessions delivered by DBS-checked tutors who have been thoroughly vetted and personally selected for their outstanding educational pedigree, impressive tutoring background and passion for nurturing young minds.\n\nOur tutor matching process ensures the right personality fit, learning style compatibility, and subject expertise—creating an engaging, confidence-building environment in your own home where the student can thrive.',
			},
			{
				id: 'london-box-2',
				heading: 'Local London Intel',
				icon: MapPin,
				description:
					'Our London-based tutors bring extensive knowledge of the capital\'s competitive educational landscape, from grammar school 11+ preparation to independent school entrance exams and ongoing academic support. Work with a tutor who understands the expectations of your school/system, including teachers at top London institutions.',
			},
			{
				id: 'london-box-3',
				heading: 'Entrance Exam & Subject-Specific Support',
				icon: Trophy,
				description:
					'We provide targeted preparation for entrance exams, subject-specific tuition, and ongoing academic support, tailored to each learner\'s profile and pace.\n\nWhether your child is preparing for 11+, GCSE, A-Level, or international entrance exams, our approach blends rigour with empathy—ensuring readiness, resilience, and real confidence on exam day.\n\nOur in-person tutoring provides the face-to-face interaction that many families prefer, combining personalised attention with the convenience of home-based sessions across London Zones 1-5.',
			},
		],
	},
	callOuts: {
		features: [
			{
				id: 'london-callout-1',
				heading: 'DBS-Checked Tutors',
				icon: Shield,
				description:
					'All tutors undergo comprehensive DBS checks and safeguarding training for complete peace of mind.',
			},
			{
				id: 'london-callout-2',
				heading: 'London School Expertise',
				icon: School,
				description:
					'Specialist knowledge of London independent and state schools, including entrance exam requirements and teaching standards.',
			},
			{
				id: 'london-callout-3',
				heading: 'Zones 1-5 Coverage',
				icon: Map,
				description:
					'Convenient in-person tutoring available across central and inner London, with flexible scheduling to suit families.',
			},
		],
	},
	stats: {
		stats: [
			{
				id: 'london-tutoring-investment',
				value: '50%',
				label: 'of London families now invest in tutoring support',
			},
		],
	},
	testimonial: {
		quote:
			'Having someone come to our house made all the difference. Our daughter clicked instantly with her tutor.',
		author: {
			name: 'Mr and Mrs Rowan',
			role: 'Highgate, London',
			avatar: {
				src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
				alt: 'Mr and Mrs Rowan',
			},
		},
	},
};

export function LondonInPersonContent() {
	return <TabContentLayout data={londonInPersonData} />;
