import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
interface CategoryPageProps {
	params: Promise<{
		category: string;
	}>;
}
export async function generateMetadata({
	params,
}: CategoryPageProps): Promise<Metadata> {
	return {
		title: 'FAQ - My Private Tutor Online',
		description:
			'Find answers to common questions about our premium tutoring services.',
		robots: 'noindex, follow',
	};
}
export default async function FAQCategoryPage({ params }: CategoryPageProps) {
	redirect('/faq');
}
