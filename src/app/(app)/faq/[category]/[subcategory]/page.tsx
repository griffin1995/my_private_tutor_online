import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
interface SubcategoryPageProps {
	params: Promise<{
		category: string;
		subcategory: string;
	}>;
}
export async function generateMetadata({
	params: _params,
}: SubcategoryPageProps): Promise<Metadata> {
	return {
		title: 'FAQ - My Private Tutor Online',
		description:
			'Find answers to common questions about our premium tutoring services.',
		robots: 'noindex, follow',
	};
}
export default async function FAQSubcategoryPage({
	params: _params,
}: SubcategoryPageProps) {
	redirect('/faq');
}
