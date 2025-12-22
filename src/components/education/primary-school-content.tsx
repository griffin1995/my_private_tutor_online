'use client';

import {
	BookOpen,
	ClipboardList,
	Smile,
	Target,
	Trophy,
	Users,
} from 'lucide-react';
import type { TabContentData } from './tab-content-layout';
import { TabContentLayout } from './tab-content-layout';

const primarySchoolData: TabContentData = {
	tabName: 'Primary School Tutoring',
	mainFeatures: {
		description:
			"The primary curriculum is the scaffolding upon which secondary success plays out; we're passionate about plugging gaps and getting it right. We understand that early education experiences are formative, so we prioritise curiosity, resilience, and a love of learning.",
		features: [
			{
				id: 'primary-confidence-building',
				heading: 'Confidence-building lessons designed for early learners',
				icon: Smile,
				description:
					'Our primary tutoring focuses on nurturing natural curiosity whilst building essential academic foundations. We understand that young learners need encouragement and support to develop confidence in their abilities, creating positive associations with learning that will serve them throughout their educational journey.',
			},
			{
				id: 'primary-entrance-specialists',
				heading:
					'7+, 8+ and 11+ specialists with a track record of top school offers',
				icon: Trophy,
				description:
					'Our experienced tutors specialise in preparing young students for competitive entrance examinations. With proven success rates at leading preparatory and grammar schools, we provide targeted preparation that builds both academic competence and examination confidence.',
			},
			{
				id: 'primary-individual-learning',
				heading: 'Individual learning plans shaped by expert assessment',
				icon: ClipboardList,
				description:
					"Every primary student receives a comprehensive initial assessment to identify their unique learning style, strengths, and areas for development. Our expert tutors then create personalised learning plans that adapt to each child's pace and preferred learning methods.",
			},
		],
	},
	callOuts: {
		features: [
			{
				id: 'primary-callout-1',
				heading: 'Age-Appropriate Methods',
				icon: Users,
				description:
					'Teaching techniques specifically designed for young learners, incorporating play-based learning and positive reinforcement.',
			},
			{
				id: 'primary-callout-2',
				heading: 'Entrance Exam Success',
				icon: Target,
				description:
					'Proven track record of securing places at top preparatory and grammar schools through targeted 7+, 8+, and 11+ preparation.',
			},
			{
				id: 'primary-callout-3',
				heading: 'Personalised Learning',
				icon: BookOpen,
				description:
					"Comprehensive assessments and individualised learning plans that adapt to each child's unique pace and learning style.",
			},
		],
	},
	stats: {
		stats: [
			{
				id: 'primary-confidence-improvement',
				value: '93%',
				label:
					'of our parents reported noticing greater confidence in their child within just three months of starting tutoring',
			},
		],
	},
	testimonial: {
		quote:
			"Our daughter was so shy and unsure at the start. Now she's thriving, and her 7+ offers speak for themselves. We couldn't be more grateful.",
		author: {
			name: 'Mr & Mrs Gibbon',
			role: 'Parents of Primary School student',
			avatar: {
				src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
				alt: 'Mr & Mrs Gibbon',
			},
		},
	},
};

export function PrimarySchoolContent() {
	return <TabContentLayout data={primarySchoolData} />;
}
