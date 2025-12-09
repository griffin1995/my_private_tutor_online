'use client';

import React from 'react';
import { useSpring, useTransform } from 'framer-motion';
import type { GamificationProgress } from './faq-gamification-system';
interface GamificationEvent {
	type:
		| 'question_read'
		| 'category_completed'
		| 'search_performed'
		| 'helpful_vote'
		| 'question_shared'
		| 'session_time';
	questionId?: string;
	categoryId?: string;
	searchQuery?: string;
	platform?: string;
	readingTime?: number;
	isHelpful?: boolean;
	resultsCount?: number;
	timestamp: number;
}
interface GamificationContextValue {
	progress: GamificationProgress;
	trackEvent: (event: Omit<GamificationEvent, 'timestamp'>) => void;
	getProgressPercentage: (
		type: 'questions' | 'categories' | 'achievements',
	) => number;
	getCurrentLevel: () => number;
	getNextLevelProgress: () => number;
	isAchievementUnlocked: (achievementId: string) => boolean;
	getTotalPoints: () => number;
}
const GamificationContext =
	React.createContext<GamificationContextValue | null>(null);
interface GamificationProviderProps {
	children: React.ReactNode;
	totalQuestions: number;
	totalCategories: number;
	enableTracking?: boolean;
}
export function GamificationProvider({
	children,
	totalQuestions,
	totalCategories,
	enableTracking = true,
}: GamificationProviderProps) {
	const [progress, setProgress] = React.useState<GamificationProgress>({
		totalQuestionsRead: 0,
		categoriesCompleted: [],
		readingTimeMinutes: 0,
		searchesPerformed: 0,
		helpfulVotes: 0,
		questionsShared: 0,
		streakDays: 1,
		lastVisitDate: new Date().toISOString(),
		totalPoints: 0,
		level: 1,
	});
	const [sessionEvents, setSessionEvents] = React.useState<GamificationEvent[]>(
		[],
	);
	const [readQuestionIds, setReadQuestionIds] = React.useState<Set<string>>(
		new Set(),
	);
	const [completedCategoryIds, setCompletedCategoryIds] = React.useState<
		Set<string>
	>(new Set());
	React.useEffect(() => {
		if (!enableTracking) return;
		const savedProgress = localStorage.getItem('faq-gamification-progress');
		if (savedProgress) {
			try {
				const parsedProgress = JSON.parse(savedProgress);
				const lastVisit = new Date(parsedProgress.lastVisitDate);
				const today = new Date();
				const daysDiff = Math.floor(
					(today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24),
				);
				if (daysDiff === 1) {
					parsedProgress.streakDays += 1;
				} else if (daysDiff > 1) {
					parsedProgress.streakDays = 1;
				}
				parsedProgress.lastVisitDate = today.toISOString();
				setProgress(parsedProgress);
				setReadQuestionIds(new Set(parsedProgress.readQuestions || []));
				setCompletedCategoryIds(new Set(parsedProgress.categoriesCompleted || []));
			} catch (error) {
				console.warn('Failed to parse gamification progress:', error);
			}
		}
	}, [enableTracking]);
	React.useEffect(() => {
		if (!enableTracking) return;
		const progressWithIds = {
			...progress,
			readQuestions: Array.from(readQuestionIds),
			completedCategories: Array.from(completedCategoryIds),
		};
		localStorage.setItem(
			'faq-gamification-progress',
			JSON.stringify(progressWithIds),
		);
	}, [progress, readQuestionIds, completedCategoryIds, enableTracking]);
	const trackEvent = React.useCallback(
		(event: Omit<GamificationEvent, 'timestamp'>) => {
			if (!enableTracking) return;
			const timestampedEvent: GamificationEvent = {
				...event,
				timestamp: Date.now(),
			};
			setSessionEvents((prev) => [...prev, timestampedEvent]);
			setProgress((prev) => {
				const newProgress = {
					...prev,
				};
				switch (event.type) {
					case 'question_read':
						if (event.questionId && !readQuestionIds.has(event.questionId)) {
							setReadQuestionIds(
								(prevIds) => new Set([...prevIds, event.questionId!]),
							);
							newProgress.totalQuestionsRead = prev.totalQuestionsRead + 1;
							newProgress.totalPoints = prev.totalPoints + 10;
							newProgress.readingTimeMinutes =
								prev.readingTimeMinutes + (event.readingTime || 1);
						}
						break;
					case 'category_completed':
						if (event.categoryId && !completedCategoryIds.has(event.categoryId)) {
							setCompletedCategoryIds(
								(prevIds) => new Set([...prevIds, event.categoryId!]),
							);
							newProgress.categoriesCompleted = [
								...prev.categoriesCompleted,
								event.categoryId,
							];
							newProgress.totalPoints = prev.totalPoints + 25;
						}
						break;
					case 'search_performed':
						newProgress.searchesPerformed = prev.searchesPerformed + 1;
						newProgress.totalPoints =
							prev.totalPoints +
							(event.resultsCount && event.resultsCount > 0 ? 5 : 2);
						break;
					case 'helpful_vote':
						if (event.isHelpful) {
							newProgress.helpfulVotes = prev.helpfulVotes + 1;
							newProgress.totalPoints = prev.totalPoints + 5;
						}
						break;
					case 'question_shared':
						newProgress.questionsShared = prev.questionsShared + 1;
						newProgress.totalPoints = prev.totalPoints + 15;
						break;
					case 'session_time':
						newProgress.readingTimeMinutes = prev.readingTimeMinutes + 1;
						break;
				}
				newProgress.level = Math.floor(newProgress.totalPoints / 100) + 1;
				return newProgress;
			});
		},
		[enableTracking, readQuestionIds, completedCategoryIds],
	);
	const getProgressPercentage = React.useCallback(
		(type: 'questions' | 'categories' | 'achievements') => {
			switch (type) {
				case 'questions':
					return totalQuestions > 0 ?
							(progress.totalQuestionsRead / totalQuestions) * 100
						:	0;
				case 'categories':
					return totalCategories > 0 ?
							(progress.categoriesCompleted.length / totalCategories) * 100
						:	0;
				case 'achievements':
					return 0;
				default:
					return 0;
			}
		},
		[
			progress.totalQuestionsRead,
			progress.categoriesCompleted.length,
			totalQuestions,
			totalCategories,
		],
	);
	const getCurrentLevel = React.useCallback(
		() => progress.level,
		[progress.level],
	);
	const getNextLevelProgress = React.useCallback(() => {
		const pointsInCurrentLevel = progress.totalPoints % 100;
		return (pointsInCurrentLevel / 100) * 100;
	}, [progress.totalPoints]);
	const isAchievementUnlocked = React.useCallback((achievementId: string) => {
		const savedAchievements = localStorage.getItem(
			'faq-gamification-achievements',
		);
		if (savedAchievements) {
			try {
				const achievements = JSON.parse(savedAchievements);
				return achievements.some(
					(ach: any) => ach.id === achievementId && ach.unlocked,
				);
			} catch (error) {
				return false;
			}
		}
		return false;
	}, []);
	const getTotalPoints = React.useCallback(
		() => progress.totalPoints,
		[progress.totalPoints],
	);
	const contextValue: GamificationContextValue = {
		progress,
		trackEvent,
		getProgressPercentage,
		getCurrentLevel,
		getNextLevelProgress,
		isAchievementUnlocked,
		getTotalPoints,
	};
	return (
		<GamificationContext.Provider value={contextValue}>
			{children}
		</GamificationContext.Provider>
	);
}
export function useGamification() {
	const context = React.useContext(GamificationContext);
	if (!context) {
		return {
			progress: {
				totalQuestionsRead: 0,
				categoriesCompleted: [],
				readingTimeMinutes: 0,
				searchesPerformed: 0,
				helpfulVotes: 0,
				questionsShared: 0,
				streakDays: 0,
				lastVisitDate: new Date().toISOString(),
				totalPoints: 0,
				level: 1,
			},
			trackEvent: () => {},
			getProgressPercentage: () => 0,
			getCurrentLevel: () => 1,
			getNextLevelProgress: () => 0,
			isAchievementUnlocked: () => false,
			getTotalPoints: () => 0,
		};
	}
	return context;
}
export function useQuestionReadTracker(questionId: string) {
	const { trackEvent } = useGamification();
	const [startTime] = React.useState(Date.now());
	const [hasTracked, setHasTracked] = React.useState(false);
	React.useEffect(() => {
		if (!hasTracked) {
			const timer = setTimeout(() => {
				const readingTime = Math.max(
					1,
					Math.floor((Date.now() - startTime) / 60000),
				);
				trackEvent({
					type: 'question_read',
					questionId,
					readingTime,
				});
				setHasTracked(true);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [questionId, trackEvent, startTime, hasTracked]);
	return {
		hasTracked,
	};
}
export function useCategoryCompletionTracker(
	categoryId: string,
	totalQuestions: number,
	readQuestions: string[],
) {
	const { trackEvent } = useGamification();
	const [hasCompleted, setHasCompleted] = React.useState(false);
	React.useEffect(() => {
		const completionThreshold = Math.ceil(totalQuestions * 0.7);
		if (
			!hasCompleted &&
			readQuestions.length >= completionThreshold &&
			totalQuestions > 0
		) {
			trackEvent({
				type: 'category_completed',
				categoryId,
			});
			setHasCompleted(true);
		}
	}, [
		categoryId,
		totalQuestions,
		readQuestions.length,
		trackEvent,
		hasCompleted,
	]);
	return {
		hasCompleted,
		progress: (readQuestions.length / totalQuestions) * 100,
	};
}
export function useSearchTracker() {
	const { trackEvent } = useGamification();
	const trackSearch = React.useCallback(
		(query: string, resultsCount: number) => {
			trackEvent({
				type: 'search_performed',
				searchQuery: query,
				resultsCount,
			});
		},
		[trackEvent],
	);
	return {
		trackSearch,
	};
}
export function useHelpfulVoteTracker() {
	const { trackEvent } = useGamification();
	const trackHelpfulVote = React.useCallback(
		(questionId: string, isHelpful: boolean) => {
			trackEvent({
				type: 'helpful_vote',
				questionId,
				isHelpful,
			});
		},
		[trackEvent],
	);
	return {
		trackHelpfulVote,
	};
}
export function useShareTracker() {
	const { trackEvent } = useGamification();
	const trackShare = React.useCallback(
		(questionId: string, platform: string) => {
			trackEvent({
				type: 'question_shared',
				questionId,
				platform,
			});
		},
		[trackEvent],
	);
	return {
		trackShare,
	};
}
interface ProgressIndicatorProps {
	type: 'questions' | 'categories' | 'points' | 'level';
	showLabel?: boolean;
	className?: string;
	size?: 'sm' | 'md' | 'lg';
}
export function ProgressIndicator({
	type,
	showLabel = true,
	className = '',
	size = 'md',
}: ProgressIndicatorProps) {
	const { progress, getProgressPercentage } = useGamification();
	const animatedValue = useSpring(
		type === 'questions' || type === 'categories' ? getProgressPercentage(type)
		: type === 'points' ? progress.totalPoints
		: progress.level,
	);
	const displayValue = useTransform(animatedValue, (value) =>
		type === 'questions' || type === 'categories' ?
			`${Math.round(value)}%`
		:	Math.round(value).toString(),
	);
	const sizeClasses = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
	};
	const labels = {
		questions: 'Questions Read',
		categories: 'Categories Explored',
		points: 'Total Points',
		level: 'Current Level',
	};
	return (
		<div className={`flex items-center space-x-2 ${className}`}>
			<div className={`font-bold text-slate-900 ${sizeClasses[size]}`}>
				{displayValue.get()}
			</div>
			{showLabel && (
				<div className={`text-slate-600 ${sizeClasses[size]}`}>{labels[type]}</div>
			)}
		</div>
	);
}
interface MiniProgressBadgeProps {
	type: 'level' | 'points' | 'streak';
	className?: string;
}
export function MiniProgressBadge({
	type,
	className = '',
}: MiniProgressBadgeProps) {
	const { progress } = useGamification();
	const getValue = () => {
		switch (type) {
			case 'level':
				return `L${progress.level}`;
			case 'points':
				return `${progress.totalPoints}pts`;
			case 'streak':
				return `${progress.streakDays}🔥`;
			default:
				return '';
		}
	};
	const getColorClass = () => {
		switch (type) {
			case 'level':
				return 'bg-amber-100 text-amber-800 border-amber-200';
			case 'points':
				return 'bg-blue-100 text-blue-800 border-blue-200';
			case 'streak':
				return 'bg-orange-100 text-orange-800 border-orange-200';
			default:
				return 'bg-slate-100 text-slate-800 border-slate-200';
		}
	};
	return (
		<div
			className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getColorClass()} ${className}`}>
			{getValue()}
		</div>
	);
}
