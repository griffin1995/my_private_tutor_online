'use client';

import { TabContentLayout } from './tab-content-layout';
import type { TabContentData } from './tab-content-layout';
import { Award, Crown, Users } from 'lucide-react';

const entranceExamsData: TabContentData = {
	tabName: 'Entrance Exams',
	mainFeatures: {
		description:
			'Selective entry exams such as the 7+, 8+, 11+, Common Entrance, UKiset and CAT4 are highly competitive and form the gateway to top grammar and independent schools. These assessments go beyond classroom learning, testing core academics alongside verbal, non-verbal, and cognitive reasoning.',
		features: [
			{
				id: 'entrance-box-1',
				heading: 'Expert-Led Preparation',
				icon: Award,
				description:
					'Tutors with Insider Expertise\nOur tutors include former exam writers, markers, and interview panellists—professionals who understand exactly what top schools are looking for.\n\nAligned with Every Major Exam Board\nWe prepare students for GL, CEM, ISEB, CAT4, UKiset and bespoke school-specific papers across grammar and independent schools.\n\nMock Exams & Interview Practice\nStudents build confidence and composure through one-to-one interview coaching and full mock exams. Immediate, detailed feedback ensures every effort directly strengthens exam readiness.',
			},
			{
				id: 'entrance-box-2-emily-video',
				heading: 'Meet Emily, Our Secret Weapon - Official 11+ Examiner',
				icon: Crown,
				description: 'Ex-teacher at Latymer, Merchant Taylor and NLCS. Emily is an official 11+ examiner who brings insider expertise to help students gain the competitive edge.',
				videos: [
					{
						id: 'emily-11plus-intro-video',
						youtubeUrl: '/videos/11-plus-expert-intro-video-mpto.mp4',
						thumbnailSrc: '/images/video-placeholders/thumbnail-11-plus-expert-intro-video-mpto.png',
						thumbnailAlt: 'Looking for the 11+ Edge? Meet Emily, Our Secret Weapon - Official 11+ Examiner',
						isFree: true,
					},
				],
			},
			{
				id: 'entrance-box-3',
				heading: 'Comprehensive Support',
				icon: Users,
				description:
					'Tailored, Flexible Programmes\nEvery programme is customised to your child\'s target schools, learning pace, and exam format—driving consistent progress without overwhelm.\n\nParent Guidance & School Selection\nWe support families throughout the journey—from shortlisting schools to preparing for interviews and final decisions.\n\nDeep Expertise from Leading Schools\nOur team includes qualified teachers from top 10 London grammar schools and leading UK independent schools, educators who can offer an insider perspective on what specific schools are really looking for.',
			},
		],
	},
	callOuts: {
		features: [],
	},
	stats: {
		stats: [
			{
				id: 'entrance-offer-rate',
				value: '95%+',
				label: 'of students receive offers from at least one of their top-choice schools',
			},
		],
	},
	testimonial: {
		quote:
			"David did extremely well and received offers from Westminster, St Paul's, Sussex House, Kings and Wetherby. Thank you for your help in getting us this far - now for the interviews (his favourite bit)!",
		author: {
			name: 'Mr and Mrs Wyatt-Ross',
			role: 'Parents, South Kensington, London',
			avatar: {
				src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
				alt: 'Mr and Mrs Wyatt-Ross',
			},
		},
	},
};

export function EntranceExamsContent() {
	return (
		<div className="[&_.group]:!border-accent-600 [&_.group]:!rounded-none [&_.group]:!shadow-none">
			<TabContentLayout data={entranceExamsData} />
		</div>
	);
}
