'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import { ArrowLeft, Search, Sparkles, Zap, Clock } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { PageHero } from '@/components/layout/page-hero';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/layout/section';
import { getFAQCategories, getFAQHero } from '@/lib/cms/cms-content';
import { FAQEnhancedSearch } from '@/components/faq/faq-enhanced-search';
import type { SearchFilters } from '@/lib/search/use-faq-search';
interface FAQSearchPageProps {
	searchParams: Promise<{
		q?: string;
		category?: string;
		difficulty?: string;
		segment?: string;
		sort?: string;
	}>;
}
function FAQSearchPageContent({ searchParams }: FAQSearchPageProps) {
	const faqCategories = getFAQCategories();
	const heroContent = getFAQHero();
	const allQuestions = faqCategories.flatMap((category) => category.questions);
	const [initialFilters, setInitialFilters] = useState<SearchFilters>({});
	const [initialQuery, setInitialQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const urlSearchParams = useSearchParams();
	useEffect(() => {
		const params = {
			category: urlSearchParams.get('category') || undefined,
			difficulty:
				(urlSearchParams.get('difficulty') as
					| 'basic'
					| 'intermediate'
					| 'advanced') || undefined,
			clientSegment:
				(urlSearchParams.get('segment') as
					| 'oxbridge_prep'
					| '11_plus'
					| 'elite_corporate'
					| 'comparison_shopper') || undefined,
			limit:
				urlSearchParams.get('limit') ?
					parseInt(urlSearchParams.get('limit')!)
				:	undefined,
		};
		const query = urlSearchParams.get('q') || '';
		setInitialFilters(params);
		setInitialQuery(query);
		setIsLoading(false);
	}, [urlSearchParams]);
	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full' />
			</div>
		);
	}
	return (
		<>
			{}
			{}
			<PageHero
				background='gradient'
				size='compact'
				className='bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900'
				overlay={true}
				overlayOpacity='light'>
				<div className='max-w-5xl mx-auto'>
					{}
					<div className='mb-6'>
						<Link
							href='/faq'
							className='inline-flex items-center text-white/80 hover:text-white transition-colors'>
							<ArrowLeft className='w-4 h-4 mr-2' />
							Back to FAQ
						</Link>
					</div>

					<div className='text-center'>
						<m.h1
							className='text-3xl lg:text-4xl font-serif font-bold text-white leading-tight mb-4'
							initial={{
								opacity: 0,
								y: 20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 0.6,
							}}>
							Advanced FAQ Search
						</m.h1>

						<m.p
							className='text-lg text-white/90 max-w-3xl mx-auto mb-6'
							initial={{
								opacity: 0,
								y: 20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 0.6,
								delay: 0.1,
							}}>
							Find answers instantly with intelligent fuzzy matching, keyword
							highlighting, and sub-100ms response time
						</m.p>

						{}
						<m.div
							className='flex flex-wrap justify-center gap-4'
							initial={{
								opacity: 0,
								y: 20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 0.6,
								delay: 0.2,
							}}>
							<Badge className='bg-accent-600 text-white border-accent-500 px-3 py-1'>
								<Zap className='w-4 h-4 mr-1' />
								&lt;100ms Response
							</Badge>
							<Badge className='bg-accent-600 text-white border-accent-500 px-3 py-1'>
								<Sparkles className='w-4 h-4 mr-1' />
								Fuzzy Matching
							</Badge>
							<Badge className='bg-accent-600 text-white border-accent-500 px-3 py-1'>
								<Search className='w-4 h-4 mr-1' />
								Smart Suggestions
							</Badge>
							<Badge className='bg-accent-600 text-white border-accent-500 px-3 py-1'>
								<Clock className='w-4 h-4 mr-1' />
								Real-time Results
							</Badge>
						</m.div>
					</div>
				</div>
			</PageHero>

			{}
			{}
			<PageLayout
				background='white'
				showHeader={false}
				showFooter={true}>
				<Section
					className='py-16 lg:py-20'
					background='white'>
					<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
						<m.div
							className='max-w-6xl mx-auto'
							initial={{
								opacity: 0,
								y: 20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 0.6,
							}}>
							{}
							<div className='text-center mb-8'>
								<div className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto'>
									<div className='bg-slate-50 rounded-lg p-4'>
										<div className='text-2xl font-bold text-accent-600 mb-1'>
											{allQuestions.length}
										</div>
										<div className='text-sm text-slate-600'>FAQ Questions</div>
									</div>
									<div className='bg-slate-50 rounded-lg p-4'>
										<div className='text-2xl font-bold text-accent-600 mb-1'>
											{faqCategories.length}
										</div>
										<div className='text-sm text-slate-600'>Categories</div>
									</div>
									<div className='bg-slate-50 rounded-lg p-4'>
										<div className='text-2xl font-bold text-accent-600 mb-1'>
											<Clock className='w-6 h-6 mx-auto mb-1' />
										</div>
										<div className='text-sm text-slate-600'>Instant Search</div>
									</div>
								</div>
							</div>

							{}
							<FAQEnhancedSearch
								questions={allQuestions}
								categories={faqCategories}
								initialQuery={initialQuery}
								initialFilters={initialFilters}
								showPerformanceStats={true}
								placeholder='Search with fuzzy matching - try typos, partial words, or concepts...'
								maxSuggestions={6}
								className='mb-12'
							/>

							{}
							<m.div
								className='bg-gradient-to-r from-accent-50 to-accent-100 rounded-xl p-6 mt-12'
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
								}}
								transition={{
									duration: 0.6,
									delay: 0.3,
								}}>
								<h3 className='text-lg font-semibold text-accent-900 mb-4'>
									🔍 Search Tips for Best Results
								</h3>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-accent-800'>
									<div>
										<h4 className='font-medium mb-2'>Fuzzy Matching</h4>
										<ul className='space-y-1 text-accent-700'>
											<li>• Try partial words: "tut" finds "tutoring"</li>
											<li>• Typos work: "tutring" finds "tutoring"</li>
											<li>• Multiple words: "oxbridge prep"</li>
										</ul>
									</div>
									<div>
										<h4 className='font-medium mb-2'>Smart Filtering</h4>
										<ul className='space-y-1 text-accent-700'>
											<li>• Use categories to narrow results</li>
											<li>• Filter by difficulty level</li>
											<li>• Target specific client types</li>
										</ul>
									</div>
								</div>
							</m.div>

							{}
							<m.div
								className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
								}}
								transition={{
									duration: 0.6,
									delay: 0.4,
								}}>
								<div className='text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200'>
									<div className='w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4'>
										<Sparkles className='w-6 h-6 text-accent-600' />
									</div>
									<h3 className='font-semibold text-slate-900 mb-2'>
										Intelligent Matching
									</h3>
									<p className='text-sm text-slate-600'>
										Advanced fuzzy search understands typos, partial words, and concepts
									</p>
								</div>

								<div className='text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200'>
									<div className='w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4'>
										<Zap className='w-6 h-6 text-accent-600' />
									</div>
									<h3 className='font-semibold text-slate-900 mb-2'>Lightning Fast</h3>
									<p className='text-sm text-slate-600'>
										Sub-100ms response times with real-time search and highlighting
									</p>
								</div>

								<div className='text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200'>
									<div className='w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4'>
										<Search className='w-6 h-6 text-accent-600' />
									</div>
									<h3 className='font-semibold text-slate-900 mb-2'>
										Smart Suggestions
									</h3>
									<p className='text-sm text-slate-600'>
										Intelligent autocomplete and search suggestions based on content
									</p>
								</div>
							</m.div>
						</m.div>
					</div>
				</Section>
			</PageLayout>
		</>
	);
}
export default function FAQSearchPage(props: FAQSearchPageProps) {
	return (
		<Suspense
			fallback={
				<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900'>
					<div className='text-center'>
						<div className='animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4' />
						<p className='text-white text-lg'>Loading advanced search...</p>
					</div>
				</div>
			}>
			<FAQSearchPageContent {...props} />
		</Suspense>
	);
}
