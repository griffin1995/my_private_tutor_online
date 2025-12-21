import type { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'How It Works - My Private Tutor Online',
	description:
		'Discover our proven 4-step process for expert tutor matching and personalised academic support. World-class tutors, expertly vetted, personally matched.',
	keywords:
		'how it works, tutor matching, educational process, private tutoring, Oxbridge tutors',
};
export default function HowItWorksLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
