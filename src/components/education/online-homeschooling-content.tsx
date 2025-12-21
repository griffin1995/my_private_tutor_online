'use client';

import { TabContentLayout } from './tab-content-layout';
import type { TabContentData } from './tab-content-layout';
import { Home, Globe, Settings, Home as House, Clock, User, Heart } from 'lucide-react';

const onlineHomeschoolingData: TabContentData = {
	tabName: 'Online Homeschooling',
	mainFeatures: {
		description:
			'Our programmes blend flexible schedules, engaging pedagogy, and world-class teaching to deliver transformative education—regardless of geography. Students develop strong academic habits, enjoy tailored attention, and see significant progress.',
		features: [
			{
				id: 'homeschool-box-1',
				heading: 'Why Choose Homeschooling with Us',
				icon: Home,
				description:
					'Private‑School Standard, Delivered Virtually\nWe deliver bespoke online programmes that rival independent schools in quality.\n\nFully Personalised Curriculum & Timetabling\nLessons are crafted around each child\'s strengths, interests and pace.\n\nConsistent Tutor Teams & Academic Continuity\nStudents benefit from a stable team of expert tutors—subject specialists with years of experience and often examiner credentials.\n\nProgress Tracking & Motivation-Focused Design\nRegular assessments, achievable goals, and work reviewed in real time ensure the programme adapts to each student\'s growth.\n\nExpert Support for SEN Needs\nOur SEN-aligned homeschooling incorporates specially tailored pathways for students with dyslexia, ADHD, processing differences or related needs—delivered with empathy and structure.',
			},
			{
				id: 'homeschool-box-2',
				heading: 'A Unique Pathway for Global & Gifted Learners',
				icon: Globe,
				description:
					'Many students thrive in non-traditional educational settings—whether they\'re global travellers, young professionals, or gifted learners pursuing high-level training. Our online homeschooling gives them:\n\nAcademic excellence without the need for physical classrooms. Benefit from world-class tuition, in the comfort of your own home.\n\nFlexible personal schedules built around elite sports, arts commitments or world experiences\n\nOur homeschooling programmes are designed to inspire curiosity, autonomy, and confidence. Free from the constraints of a rigid curriculum, learning becomes student-led whilst tutors ensure every core component is thoroughly covered.',
			},
			{
				id: 'homeschool-box-3',
				heading: 'Your Bespoke Classroom',
				icon: Settings,
				description:
					'Individual Onboarding: We begin with a comprehensive academic and interests profile.\n\nGoal Setting & Curriculum Design: Tutors build flexible lesson plans aligned with national standards or bespoke learning aims.\n\nStructured Delivery: Students engage in live online sessions, maintain daily routines, and receive regular tutoring feedback.\n\nOngoing Review: Progress is tracked, objectives reset, and adjustments made with parental involvement.\n\nExamination Support: Guidance through external examinations including GCSE, A-Level, and university entrance\n\nSuiting your Schedule: We timetable tutorials according to your time zone and when you want to study.',
			},
		],
	},
	callOuts: {
		features: [
			{
				id: 'homeschool-callout-1',
				heading: 'Comfortable Learning Environment',
				icon: House,
				description:
					'Learn in the safety and comfort of your own home with personalised attention',
			},
			{
				id: 'homeschool-callout-2',
				heading: 'Flexible Scheduling',
				icon: Clock,
				description:
					'Adapt learning schedules to fit your family\'s lifestyle and individual needs',
			},
			{
				id: 'homeschool-callout-3',
				heading: 'Personalised Curriculum',
				icon: User,
				description:
					'Tailored educational programmes that match your child\'s learning style and pace',
			},
			{
				id: 'homeschool-callout-4',
				heading: 'Family-Centred Approach',
				icon: Heart,
				description:
					'Strengthen family bonds whilst providing world-class educational experiences',
			},
		],
	},
	stats: {
		stats: [
			{
				id: 'homeschool-academic-achievement',
				value: '78%',
				label: 'of peer-reviewed studies on academic achievement show homeschool students perform statistically significantly better than those in institutional schools (Ray, 2017).',
			},
		],
	},
	testimonial: {
		quote:
			'We relocated mid-year and chose to homeschool. I couldn\'t believe how much better the structure, care, and quality of teaching were with My Private Tutor Online than my son\'s old school.',
		author: {
			name: 'Mme. and M. Montefiori',
			role: 'International family',
			avatar: {
				src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
				alt: 'Mme. and M. Montefiori',
			},
		},
	},
};

export function OnlineHomeschoolingContent() {
	return <TabContentLayout data={onlineHomeschoolingData} />;
