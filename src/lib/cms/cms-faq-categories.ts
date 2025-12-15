import type { FAQCategory, FAQQuestion } from './cms-content';
import type { LucideIcon } from 'lucide-react';
export interface EnhancedFAQCategory extends Omit<FAQCategory, 'icon'> {
	slug: string;
	parentCategory?: string;
	breadcrumbPath: string[];
	iconComponent: LucideIcon | string;
	primaryColor: string;
	secondaryColor: string;
	gradientFrom: string;
	gradientTo: string;
	priority: number;
	isExpanded: boolean;
	childrenCount: number;
	totalQuestions: number;
	analytics: FAQCategoryAnalytics;
	seo: FAQCategorySEO;
}
interface EnhancedFAQSubcategory {
	id: string;
	name: string;
	slug: string;
	description: string;
	parentCategorySlug: string;
	order: number;
	questionCount: number;
	iconComponent?: LucideIcon | string;
	color?: string;
	breadcrumbPath: string[];
	seo: {
		title: string;
		description: string;
		keywords: string[];
	};
	analytics: {
		views: number;
		popularityRank: number;
		conversionRate: number;
	};
}
export interface FAQCategoryAnalytics {
	totalViews: number;
	uniqueViews: number;
	averageTimeSpent: number;
	bounceRate: number;
	conversionRate: number;
	topQuestions: string[];
	searchKeywords: string[];
	clientSegmentDistribution: {
		oxbridge_prep: number;
		eleven_plus: number;
		elite_corporate: number;
		comparison_shopper: number;
	};
	helpfulnessRating: number;
	lastUpdated: string;
}
interface FAQCategorySEO {
	title: string;
	description: string;
	keywords: string[];
	canonicalUrl: string;
	ogTitle: string;
	ogDescription: string;
	structuredData: {
		'@type': 'FAQPage' | 'CollectionPage';
		mainEntity?: any[];
	};
}
interface FAQRouteParams {
	category?: string;
	subcategory?: string;
}
interface FAQSearchParams {
	q?: string;
	segment?: string;
	difficulty?: string;
	sort?: string;
}
interface FAQBreadcrumb {
	label: string;
	href: string;
	isActive: boolean;
}
interface FAQCategoryMenuItem {
	id: string;
	label: string;
	href: string;
	icon: LucideIcon | string;
	badge?: string;
	isActive: boolean;
	children?: FAQCategoryMenuItem[];
}
function enhanceFAQCategories(
	categories: readonly FAQCategory[],
): EnhancedFAQCategory[] {
	return categories.map((category, index): EnhancedFAQCategory => {
		const slug = generateCategorySlug(category.name);
		return {
			...category,
			slug,
			breadcrumbPath: ['FAQ', category.name],
			iconComponent: mapCategoryIcon(category.icon),
			primaryColor: category.color,
			secondaryColor: lightenColor(category.color, 0.2),
			gradientFrom: category.color,
			gradientTo: darkenColor(category.color, 0.1),
			priority: category.order,
			isExpanded: false,
			childrenCount: category.subcategories?.length || 0,
			totalQuestions: category.questions.length,
			analytics: generateCategoryAnalytics(category),
			seo: generateCategorySEO(category, slug),
		};
	});
}
function generateCategorySlug(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}
function mapCategoryIcon(iconString: string): string {
	const iconMap: Record<string, string> = {
		Globe: 'Globe',
		GraduationCap: 'GraduationCap',
		BookOpen: 'BookOpen',
		TrendingUp: 'TrendingUp',
		Calendar: 'Calendar',
		Banknote: 'Banknote',
		HelpCircle: 'HelpCircle',
	};
	return iconMap[iconString] || 'HelpCircle';
}
function lightenColor(hex: string, amount: number): string {
	const num = parseInt(hex.replace('#', ''), 16);
	const amt = Math.round(2.55 * amount * 100);
	const R = (num >> 16) + amt;
	const G = ((num >> 8) & 0x00ff) + amt;
	const B = (num & 0x0000ff) + amt;
	return (
		'#' +
		(
			0x1000000 +
			(R < 255 ? R : 255) * 0x10000 +
			(G < 255 ? G : 255) * 0x100 +
			(B < 255 ? B : 255)
		)
			.toString(16)
			.slice(1)
	);
}
function darkenColor(hex: string, amount: number): string {
	return lightenColor(hex, -amount);
}
function generateCategoryAnalytics(
	category: FAQCategory,
): FAQCategoryAnalytics {
	return {
		totalViews: 0,
		uniqueViews: 0,
		averageTimeSpent: 0,
		bounceRate: 0,
		conversionRate: 0,
		topQuestions: category.questions
			.filter((q) => q.featured)
			.slice(0, 5)
			.map((q) => q.id),
		searchKeywords: extractCategoryKeywords(category),
		clientSegmentDistribution: {
			oxbridge_prep: 0,
			eleven_plus: 0,
			elite_corporate: 0,
			comparison_shopper: 0,
		},
		helpfulnessRating: 0,
		lastUpdated: new Date().toISOString(),
	};
}
function generateCategorySEO(
	category: FAQCategory,
	slug: string,
): FAQCategorySEO {
	return {
		title: `${category.name} - Frequently Asked Questions | My Private Tutor Online`,
		description: category.description,
		keywords: extractCategoryKeywords(category),
		canonicalUrl: `/faq/${slug}`,
		ogTitle: `${category.name} FAQ | My Private Tutor Online`,
		ogDescription: `Get answers to common questions about ${category.name.toLowerCase()} with My Private Tutor Online.`,
		structuredData: {
			'@type': 'FAQPage',
			mainEntity: category.questions.map((question) => ({
				'@type': 'Question',
				name: question.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: question.answer,
				},
			})),
		},
	};
}
function extractCategoryKeywords(category: FAQCategory): string[] {
	const keywords = new Set<string>();
	keywords.add(category.name.toLowerCase());
	keywords.add(category.title.toLowerCase());
	category.questions.forEach((question) => {
		question.tags.forEach((tag) => keywords.add(tag));
		question.searchKeywords.forEach((keyword) => keywords.add(keyword));
	});
	keywords.add('frequently asked questions');
	keywords.add('help');
	keywords.add('support');
	keywords.add('tutoring');
	keywords.add('premium education');
	return Array.from(keywords).slice(0, 20);
}
function generateFAQBreadcrumbs(
	category?: string,
	subcategory?: string,
): FAQBreadcrumb[] {
	const breadcrumbs: FAQBreadcrumb[] = [
		{
			label: 'Home',
			href: '/',
			isActive: false,
		},
		{
			label: 'FAQ',
			href: '/faq',
			isActive: !category,
		},
	];
	if (category) {
		breadcrumbs.push({
			label: formatCategoryName(category),
			href: `/faq/${category}`,
			isActive: !subcategory,
		});
	}
	if (subcategory) {
		breadcrumbs.push({
			label: formatCategoryName(subcategory),
			href: `/faq/${category}/${subcategory}`,
			isActive: true,
		});
	}
	return breadcrumbs;
}
function formatCategoryName(slug: string): string {
	return slug
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
function filterFAQContentBySearch(
	categories: EnhancedFAQCategory[],
	searchQuery: string,
	filters: {
		segment?: string;
		difficulty?: string;
		category?: string;
	} = {},
): {
	categories: EnhancedFAQCategory[];
	totalResults: number;
	resultsByCategory: Record<string, number>;
} {
	const query = searchQuery.toLowerCase().trim();
	const filteredCategories: EnhancedFAQCategory[] = [];
	const resultsByCategory: Record<string, number> = {};
	let totalResults = 0;
	categories.forEach((category) => {
		if (filters.category && category.slug !== filters.category) {
			return;
		}
		const matchingQuestions = category.questions.filter((question) => {
			const queryMatch =
				!query ||
				question.question.toLowerCase().includes(query) ||
				question.answer.toLowerCase().includes(query) ||
				question.tags.some((tag) => tag.toLowerCase().includes(query)) ||
				question.searchKeywords.some((keyword) =>
					keyword.toLowerCase().includes(query),
				);
			const segmentMatch =
				!filters.segment ||
				question.clientSegment === filters.segment ||
				question.clientSegment === 'all';
			const difficultyMatch =
				!filters.difficulty || question.difficulty === filters.difficulty;
			return queryMatch && segmentMatch && difficultyMatch;
		});
		if (matchingQuestions.length > 0) {
			filteredCategories.push({
				...category,
				questions: matchingQuestions,
				totalQuestions: matchingQuestions.length,
			});
			resultsByCategory[category.slug] = matchingQuestions.length;
			totalResults += matchingQuestions.length;
		}
	});
	return {
		categories: filteredCategories,
		totalResults,
		resultsByCategory,
	};
}
function validateFAQRouteParams(
	categories: EnhancedFAQCategory[],
	params: FAQRouteParams,
): {
	isValid: boolean;
	category?: EnhancedFAQCategory;
	subcategory?: EnhancedFAQSubcategory;
	error?: string;
} {
	const { category: categorySlug, subcategory: subcategorySlug } = params;
	if (!categorySlug) {
		return {
			isValid: true,
		};
	}
	const category = categories.find((cat) => cat.slug === categorySlug);
	if (!category) {
		return {
			isValid: false,
			error: `Category '${categorySlug}' not found`,
		};
	}
	if (!subcategorySlug) {
		return {
			isValid: true,
			category,
		};
	}
	const subcategory = category.subcategories?.find(
		(sub) => generateCategorySlug(sub.name) === subcategorySlug,
	);
	if (!subcategory) {
		return {
			isValid: false,
			error: `Subcategory '${subcategorySlug}' not found in category '${categorySlug}'`,
		};
	}
	return {
		isValid: true,
		category,
		subcategory: {
			...subcategory,
			slug: subcategorySlug,
			parentCategorySlug: categorySlug,
			breadcrumbPath: ['FAQ', category.name, subcategory.name],
			seo: {
				title: `${subcategory.name} - ${category.name} FAQ | My Private Tutor Online`,
				description: subcategory.description,
				keywords: [
					subcategory.name.toLowerCase(),
					category.name.toLowerCase(),
					'faq',
					'help',
				],
			},
			analytics: {
				views: 0,
				popularityRank: 0,
				conversionRate: 0,
			},
		},
	};
}
