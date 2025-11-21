'use client';

import { TabContentLayout } from './tab-content-layout';
import type { TabContentData } from './tab-content-layout';
import { Heart, UserCheck, ClipboardCheck, Users, User, Shield } from 'lucide-react';

const senSupportData: TabContentData = {
	tabName: 'SEN Support',
	mainFeatures: {
		description:
			'Our Founder Elizabeth\'s own neurodiversity (dyspraxia) means she\'s especially passionate about equipping students with game changing SEN support. Our work is tailored to empower students with dyslexia, dyspraxia, ADHD, autism spectrum conditions, speech or processing differences, and related profiles.',
		features: [
			{
				id: 'sen-box-1',
				heading: 'Why Choose SEN Support with Us',
				icon: Heart,
				description:
					'SEN Specialists: SEN-trained tutors and teachers, experienced in supporting dyslexia, dyspraxia, ADHD, autism, and processing differences through tailored, evidence-based teaching.\n\nAdvice on Exam and Access Provisions: Guiding families through exam access arrangements to ensure equitable outcomes.',
			},
			{
				id: 'sen-box-2',
				heading: 'Tailored Learning for SEN & Complex Needs',
				icon: UserCheck,
				description:
					'Bespoke Online Homeschooling: 100% virtual programmes designed around each learner\'s strengths, interests, and pace.\n\nStructure & Consistency: Calm routines, long-term tutor relationships, and predictable schedules to reduce stress and build engagement.\n\nHolistic Progress: Regular reviews support academic growth alongside emotional wellbeing and self-regulation.',
			},
			{
				id: 'sen-box-3',
				heading: 'Your Personalised SEN Learning Journey',
				icon: ClipboardCheck,
				description:
					'Comprehensive Onboarding: In-depth assessment of learning profile, hierarchy of preferred learning styles, strengths, and support needs.\n\nAdaptive Programme Design: Tutors set achievable goals and adjust teaching to suit processing style and attention patterns.\n\nCollaborative Progress Tracking: Ongoing communication with families ensures continuous alignment and measurable progress.',
			},
		],
	},
	callOuts: {
		features: [
			{
				id: 'sen-callout-1',
				heading: 'Expert SEN Tutors',
				icon: Users,
				description:
					'Specialist teachers trained in supporting diverse learning needs with evidence-based approaches',
			},
			{
				id: 'sen-callout-2',
				heading: 'Individualised Support',
				icon: User,
				description:
					'Tailored learning programmes designed around each student\'s unique strengths and challenges',
			},
			{
				id: 'sen-callout-3',
				heading: 'Emotional Wellbeing Focus',
				icon: Shield,
				description:
					'Supporting academic progress alongside confidence, self-regulation, and emotional development',
			},
		],
	},
	stats: {
		stats: [
			{
				id: 'sen-diagnosis-wait',
				value: '1+ year',
				label: 'According to a study by the Children\'s Commissioner, on average a child waits over a year to receive an SEN diagnosis. Early specialist intervention and support can help children while waiting for an EHC needs assessment.',
			},
		],
	},
	testimonial: {
		quote:
			'The progress our Jamie has made with his tutor has been incredible. He was really drifting at school but he\'s found confidence and surety in his studies again.',
		author: {
			name: 'Mr Fawkes',
			role: 'Edinburgh',
			avatar: {
				src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
				alt: 'Mr Fawkes',
			},
		},
	},
};

export function SenSupportContent() {
	return <TabContentLayout data={senSupportData} />;
}
