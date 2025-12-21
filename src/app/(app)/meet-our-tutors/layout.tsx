import type { Metadata } from 'next';

export const metadata: Metadata = {
	title:
		'Meet Our Expert Tutors | Elite Teaching Team | My Private Tutor Online Royal Educators',
	description:
		'Meet our exceptional team of expert tutors with royal endorsements. Elite educators from Oxford, Cambridge, and top universities providing premium tutoring services for discerning families.',
	keywords: [
		'expert tutors',
		'elite teachers',
		'Oxford tutors',
		'Cambridge educators',
		'royal endorsed tutors',
		'premium tutoring team',
		'experienced educators',
		'qualified teachers',
		'My Private Tutor Online team',
		'Elizabeth Burrows team',
		'elite tutoring staff',
		'expert teaching team',
		'royal client tutors',
		'premium education specialists',
		'top university tutors',
	],
	openGraph: {
		title: 'Meet Our Expert Tutors | Elite Teaching Team',
		description:
			'Meet our exceptional team of expert tutors with royal endorsements. Elite educators from Oxford, Cambridge providing premium tutoring services.',
		images: [
			{
				url: '/images/hero/meet-tutors-hero.jpg',
				width: 800,
				height: 600,
				alt: 'Meet Our Expert Tutors - Elite Teaching Team with Royal Endorsements',
				type: 'image/jpeg',
			},
		],
		type: 'website',
	},
	twitter: {
		title: 'Meet Our Expert Tutors | Elite Teaching Team',
		description:
			'Exceptional team of expert tutors with royal endorsements. Elite educators from Oxford, Cambridge universities.',
		images: ['/images/hero/meet-tutors-hero.jpg'],
	},
	alternates: {
		canonical: 'https://myprivatetutoronline.com/meet-our-tutors',
	},
	category: 'Education',
	classification: 'Educational Team',
	other: {
		'team:size': '20+ expert tutors',
		'qualifications:level': 'Oxford, Cambridge, Russell Group',
		'endorsement:type': 'Royal client approved',
		'experience:years': '15+ years collective',
	},
};

export default function MeetOurTutorsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
