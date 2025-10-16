'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { FAQQuestion, FAQCategory } from '@/lib/types';
import {
	FAQRecommendationEngine,
	RecommendationResult,
	ClientSegment,
} from '@/lib/faq-recommendation-engine';
import { cn } from '@/lib/utils';
interface FAQRecommendationsProps {
	readonly currentQuestion: FAQQuestion;
	readonly categories: readonly FAQCategory[];
	readonly sessionId: string;
	readonly clientSegment: ClientSegment;
	readonly maxRecommendations?: number;
	readonly showReasonBadges?: boolean;
	readonly enableAnalytics?: boolean;
	readonly className?: string;
	readonly onRecommendationClick?: (questionId: string) => void;
	readonly onRecommendationView?: (questionId: string) => void;
}
const RecommendationCard: React.FC<{
	readonly recommendation: RecommendationResult;
	readonly showReasonBadge: boolean;
	readonly onView: () => void;
	readonly onClick: () => void;
}> = React.memo(({ recommendation, showReasonBadge, onView, onClick }) => {
	const { question, reason, confidence } = recommendation;
	const cardRef = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					onView();
				}
			},
			{
				threshold: 0.5,
				rootMargin: '0px 0px -50px 0px',
			},
		);
		if (cardRef.current) {
			observer.observe(cardRef.current);
		}
		return () => observer.disconnect();
	}, [onView]);
	const getReasonBadgeVariant = (reason: RecommendationResult['reason']) => {
		switch (reason) {
			case 'content_similarity':
				return 'default';
			case 'user_behaviour':
				return 'secondary';
			case 'client_segment':
				return 'outline';
			case 'trending':
				return 'destructive';
			case 'helpful':
				return 'default';
			default:
				return 'outline';
		}
	};
	const getReasonLabel = (reason: RecommendationResult['reason']) => {
		switch (reason) {
			case 'content_similarity':
				return 'Related Content';
			case 'user_behaviour':
				return 'Based on Your Activity';
			case 'client_segment':
				return 'Popular with Your Audience';
			case 'trending':
				return 'Trending Now';
			case 'helpful':
				return 'Most Helpful';
			default:
				return 'Recommended';
		}
	};
	return (
		<m.div
			ref={cardRef}
			initial={{
				opacity: 0,
				y: 20,
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			transition={{
				duration: 0.4,
			}}
			whileHover={{
				scale: 1.02,
			}}
			className='group'>
			<Card
				className='h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-accent-300'
				onClick={onClick}
				role='button'
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						onClick();
					}
				}}
				aria-label={`Recommended FAQ: ${question.question}`}>
				<CardHeader className='pb-3'>
					<div className='flex items-start justify-between gap-3'>
						<CardTitle className='text-base font-semibold text-slate-800 group-hover:text-accent-700 transition-colors duration-200 line-clamp-2'>
							{question.question}
						</CardTitle>
						{showReasonBadge && (
							<Badge
								variant={getReasonBadgeVariant(reason)}
								className='shrink-0 text-xs'
								aria-label={`Recommendation reason: ${getReasonLabel(reason)}`}>
								{getReasonLabel(reason)}
							</Badge>
						)}
					</div>
				</CardHeader>

				<CardContent className='pt-0'>
					<p className='text-sm text-slate-600 line-clamp-3 mb-4'>
						{question.answer.length > 120 ?
							`${question.answer.substring(0, 120)}...`
						:	question.answer}
					</p>

					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<Badge
								variant='outline'
								className='text-xs'>
								{question.category}
							</Badge>
							<Badge
								variant='outline'
								className='text-xs'>
								{question.difficulty}
							</Badge>
						</div>

						{}
						{}
						<div
							className='flex items-center gap-1'
							aria-label={`Confidence: ${Math.round(confidence * 100)}%`}>
							<span className='text-xs text-slate-500'>Confidence:</span>
							<div className='flex gap-1'>
								{[...Array(5)].map((_, i) => (
									<div
										key={i}
										className={cn(
											'w-1 h-1 rounded-full',
											i < Math.round(confidence * 5) ? 'bg-accent-500' : 'bg-slate-300',
										)}
									/>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</m.div>
	);
});
RecommendationCard.displayName = 'RecommendationCard';
export const FAQRecommendations: React.FC<FAQRecommendationsProps> = ({
	currentQuestion,
	categories,
	sessionId,
	clientSegment,
	maxRecommendations = 5,
	showReasonBadges = true,
	enableAnalytics = true,
	className,
	onRecommendationClick,
	onRecommendationView,
}) => {
	const [recommendations, setRecommendations] = React.useState<
		RecommendationResult[]
	>([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);
	const [viewedRecommendations, setViewedRecommendations] = React.useState<
		Set<string>
	>(new Set());
	const engineRef = React.useRef<FAQRecommendationEngine | null>(null);
	React.useEffect(() => {
		const initializeEngine = async () => {
			try {
				setIsLoading(true);
				setError(null);
				if (!engineRef.current) {
					engineRef.current = new FAQRecommendationEngine();
					engineRef.current.initialize(categories, {
						maxRecommendations,
						enablePersonalization: true,
						enableABTesting: false,
						debugMode: process.env.NODE_ENV === 'development',
					});
					engineRef.current.initializeUserSession(
						sessionId,
						clientSegment,
						'internal_link',
					);
				}
				const recs = engineRef.current.generateRecommendations(
					currentQuestion,
					sessionId,
					{
						maxRecommendations,
					},
				);
				setRecommendations(recs);
				if (process.env.NODE_ENV === 'development') {
					console.log(
						`Generated ${recs.length} recommendations for question:`,
						currentQuestion.question,
					);
				}
			} catch (err) {
				console.error('Failed to initialize recommendation engine:', err);
				setError('Unable to load recommendations. Please try again later.');
			} finally {
				setIsLoading(false);
			}
		};
		initializeEngine();
	}, [
		currentQuestion.id,
		categories,
		sessionId,
		clientSegment,
		maxRecommendations,
	]);
	const handleRecommendationView = React.useCallback(
		(questionId: string) => {
			if (!viewedRecommendations.has(questionId)) {
				setViewedRecommendations((prev) => new Set(prev).add(questionId));
				if (enableAnalytics && onRecommendationView) {
					onRecommendationView(questionId);
				}
				if (enableAnalytics && engineRef.current) {
					engineRef.current.trackQuestionView(sessionId, questionId, 0);
				}
			}
		},
		[viewedRecommendations, enableAnalytics, onRecommendationView, sessionId],
	);
	const handleRecommendationClick = React.useCallback(
		(questionId: string) => {
			if (enableAnalytics && engineRef.current) {
				engineRef.current.trackRecommendationClick(sessionId, questionId);
			}
			if (onRecommendationClick) {
				onRecommendationClick(questionId);
			}
		},
		[enableAnalytics, sessionId, onRecommendationClick],
	);
	if (isLoading) {
		return (
			<div
				className={cn('space-y-4', className)}
				aria-label='Loading recommendations'>
				<div className='space-y-2'>
					<div className='h-6 bg-slate-200 rounded animate-pulse' />
					<div className='h-4 bg-slate-100 rounded animate-pulse w-3/4' />
				</div>

				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
					{[...Array(3)].map((_, i) => (
						<Card
							key={i}
							className='animate-pulse'>
							<CardHeader>
								<div className='h-5 bg-slate-200 rounded mb-2' />
								<div className='h-4 bg-slate-100 rounded w-2/3' />
							</CardHeader>
							<CardContent>
								<div className='space-y-2'>
									<div className='h-3 bg-slate-100 rounded' />
									<div className='h-3 bg-slate-100 rounded' />
									<div className='h-3 bg-slate-100 rounded w-3/4' />
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		);
	}
	if (error) {
		return (
			<div
				className={cn('text-center py-8', className)}
				role='alert'>
				<div className='text-slate-600 mb-4'>{error}</div>
				<Button
					variant='outline'
					onClick={() => window.location.reload()}
					aria-label='Retry loading recommendations'>
					Try Again
				</Button>
			</div>
		);
	}
	if (recommendations.length === 0) {
		return (
			<div className={cn('text-center py-8 text-slate-600', className)}>
				<div className='text-lg font-medium mb-2'>No related questions found</div>
				<p className='text-sm'>We couldn't find any related FAQs at the moment.</p>
			</div>
		);
	}
	return (
		<div className={cn('space-y-6', className)}>
			{}
			{}
			<div className='space-y-2'>
				<h3 className='text-xl font-serif font-semibold text-slate-900'>
					Recommended Questions
				</h3>
				<p className='text-sm text-slate-600'>
					Based on your interests and this question's content
				</p>
			</div>

			<Separator className='bg-slate-200' />

			{}
			{}
			<div
				className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
				role='feed'
				aria-label='FAQ Recommendations'>
				{recommendations.map((recommendation, index) => (
					<RecommendationCard
						key={recommendation.question.id}
						recommendation={recommendation}
						showReasonBadge={showReasonBadges}
						onView={() => handleRecommendationView(recommendation.question.id)}
						onClick={() => handleRecommendationClick(recommendation.question.id)}
					/>
				))}
			</div>

			{}
			{}
			{process.env.NODE_ENV === 'development' && (
				<div className='mt-6 p-3 bg-slate-100 rounded-lg text-xs text-slate-600'>
					<strong>Dev Info:</strong> Generated {recommendations.length}{' '}
					recommendations. Reasons:{' '}
					{[...new Set(recommendations.map((r) => r.reason))].join(', ')}
				</div>
			)}
		</div>
	);
};
interface RelatedQuestionsProps {
	readonly questionId: string;
	readonly categories: readonly FAQCategory[];
	readonly maxResults?: number;
	readonly className?: string;
	readonly onQuestionClick?: (questionId: string) => void;
}
export const RelatedQuestions: React.FC<RelatedQuestionsProps> = ({
	questionId,
	categories,
	maxResults = 4,
	className,
	onQuestionClick,
}) => {
	const [relatedQuestions, setRelatedQuestions] = React.useState<
		RecommendationResult[]
	>([]);
	const engineRef = React.useRef<FAQRecommendationEngine | null>(null);
	React.useEffect(() => {
		if (!engineRef.current) {
			engineRef.current = new FAQRecommendationEngine();
			engineRef.current.initialize(categories, {
				debugMode: process.env.NODE_ENV === 'development',
			});
		}
		const related = engineRef.current.getRelatedQuestions(questionId, maxResults);
		setRelatedQuestions(related);
	}, [questionId, categories, maxResults]);
	if (relatedQuestions.length === 0) {
		return null;
	}
	return (
		<div className={cn('space-y-4', className)}>
			<h4 className='text-lg font-serif font-medium text-slate-900'>
				People also asked
			</h4>

			<div className='space-y-2'>
				{relatedQuestions.map((result) => (
					<Button
						key={result.question.id}
						variant='ghost'
						className='w-full justify-start text-left h-auto py-3 px-4'
						onClick={() => onQuestionClick?.(result.question.id)}>
						<div className='space-y-1'>
							<div className='font-medium text-slate-800 text-sm'>
								{result.question.question}
							</div>
							<div className='text-xs text-slate-600'>
								{result.question.category} • {result.question.difficulty}
							</div>
						</div>
					</Button>
				))}
			</div>
		</div>
	);
};
interface PopularInCategoryProps {
	readonly categoryId: string;
	readonly categories: readonly FAQCategory[];
	readonly excludeIds?: string[];
	readonly maxResults?: number;
	readonly className?: string;
	readonly onQuestionClick?: (questionId: string) => void;
}
export const PopularInCategory: React.FC<PopularInCategoryProps> = ({
	categoryId,
	categories,
	excludeIds = [],
	maxResults = 5,
	className,
	onQuestionClick,
}) => {
	const [popularQuestions, setPopularQuestions] = React.useState<
		RecommendationResult[]
	>([]);
	const engineRef = React.useRef<FAQRecommendationEngine | null>(null);
	React.useEffect(() => {
		if (!engineRef.current) {
			engineRef.current = new FAQRecommendationEngine();
			engineRef.current.initialize(categories);
		}
		const popular = engineRef.current.getPopularInCategory(
			categoryId,
			excludeIds,
			maxResults,
		);
		setPopularQuestions(popular);
	}, [categoryId, categories, excludeIds, maxResults]);
	const categoryName =
		categories.find((cat) => cat.id === categoryId)?.title || 'This Category';
	if (popularQuestions.length === 0) {
		return null;
	}
	return (
		<div className={cn('space-y-4', className)}>
			<h4 className='text-lg font-serif font-medium text-slate-900'>
				Popular in {categoryName}
			</h4>

			<div className='grid gap-3'>
				{popularQuestions.map((result, index) => (
					<Card
						key={result.question.id}
						className='cursor-pointer hover:shadow-md transition-shadow duration-200'
						onClick={() => onQuestionClick?.(result.question.id)}
						role='button'
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								onQuestionClick?.(result.question.id);
							}
						}}>
						<CardContent className='p-4'>
							<div className='flex items-start justify-between gap-3'>
								<div className='flex-1'>
									<h5 className='font-medium text-slate-800 text-sm mb-1'>
										{result.question.question}
									</h5>
									<div className='text-xs text-slate-600'>
										{result.question.analytics.views} views • {result.question.difficulty}
									</div>
								</div>
								<Badge
									variant='outline'
									className='text-xs shrink-0'>
									#{index + 1}
								</Badge>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};
