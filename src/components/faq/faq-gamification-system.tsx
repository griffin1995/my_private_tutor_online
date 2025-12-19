'use client';

import React from 'react';
import { m, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeadingText, TitleText, BodyText } from '@/components/ui/typography';
import {
	Trophy,
	Star,
	Target,
	Clock,
	BookOpen,
	Award,
	Flame,
	TrendingUp,
	Crown,
	Shield,
	Zap,
	CheckCircle,
	Eye,
	ThumbsUp,
	Share2,
	X,
} from 'lucide-react';
interface GamificationProgress {
	totalQuestionsRead: number;
	categoriesCompleted: string[];
	readingTimeMinutes: number;
	searchesPerformed: number;
	helpfulVotes: number;
	questionsShared: number;
	streakDays: number;
	lastVisitDate: string;
	totalPoints: number;
	level: number;
}
interface Achievement {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{
		size?: number;
		className?: string;
	}>;
	points: number;
	criteria: (progress: GamificationProgress) => boolean;
	unlocked: boolean;
	unlockedDate?: string;
	tier: 'bronze' | 'silver' | 'gold' | 'royal';
}
interface GamificationSystemProps {
	totalQuestions: number;
	totalCategories: number;
	onQuestionRead?: (questionId: string, readingTime: number) => void;
	onCategoryCompleted?: (categoryId: string) => void;
	onHelpfulVote?: (questionId: string, isHelpful: boolean) => void;
	onQuestionShared?: (questionId: string, platform: string) => void;
	onSearchPerformed?: (query: string, resultsCount: number) => void;
	className?: string;
	compact?: boolean;
	showLeaderboard?: boolean;
	enableNotifications?: boolean;
}
const ACHIEVEMENTS: Achievement[] = [
	{
		id: 'first_faq',
		title: 'First Steps',
		description: 'Read your first FAQ answer',
		icon: BookOpen,
		points: 10,
		tier: 'bronze',
		criteria: (progress) => progress.totalQuestionsRead >= 1,
		unlocked: false,
	},
	{
		id: 'category_explorer',
		title: 'Category Explorer',
		description: 'Read FAQs from 3 different categories',
		icon: Target,
		points: 25,
		tier: 'bronze',
		criteria: (progress) => progress.categoriesCompleted.length >= 3,
		unlocked: false,
	},
	{
		id: 'power_reader',
		title: 'Power Reader',
		description: 'Read 10 FAQ answers in one session',
		icon: Zap,
		points: 50,
		tier: 'silver',
		criteria: (progress) => progress.totalQuestionsRead >= 10,
		unlocked: false,
	},
	{
		id: 'knowledge_seeker',
		title: 'Knowledge Seeker',
		description: 'Complete all FAQ categories',
		icon: Crown,
		points: 100,
		tier: 'gold',
		criteria: (progress) => progress.categoriesCompleted.length >= 6,
		unlocked: false,
	},
	{
		id: 'helpful_voter',
		title: 'Helpful Contributor',
		description: 'Vote on 5 FAQ answers as helpful',
		icon: ThumbsUp,
		points: 30,
		tier: 'silver',
		criteria: (progress) => progress.helpfulVotes >= 5,
		unlocked: false,
	},
	{
		id: 'search_expert',
		title: 'Search Expert',
		description: 'Perform 10 successful searches',
		icon: Eye,
		points: 40,
		tier: 'silver',
		criteria: (progress) => progress.searchesPerformed >= 10,
		unlocked: false,
	},
	{
		id: 'social_sharer',
		title: 'Knowledge Sharer',
		description: 'Share 3 helpful FAQ answers',
		icon: Share2,
		points: 35,
		tier: 'silver',
		criteria: (progress) => progress.questionsShared >= 3,
		unlocked: false,
	},
	{
		id: 'dedicated_reader',
		title: 'Dedicated Reader',
		description: 'Spend 30 minutes reading FAQs',
		icon: Clock,
		points: 60,
		tier: 'gold',
		criteria: (progress) => progress.readingTimeMinutes >= 30,
		unlocked: false,
	},
	{
		id: 'streak_champion',
		title: 'Consistency Champion',
		description: 'Visit FAQ section 7 days in a row',
		icon: Flame,
		points: 75,
		tier: 'gold',
		criteria: (progress) => progress.streakDays >= 7,
		unlocked: false,
	},
	{
		id: 'royal_scholar',
		title: 'Royal Scholar',
		description: 'Reach 500 total points',
		icon: Crown,
		points: 0,
		tier: 'royal',
		criteria: (progress) => progress.totalPoints >= 500,
		unlocked: false,
	},
	{
		id: 'faq_master',
		title: 'FAQ Master',
		description: 'Complete all achievements',
		icon: Shield,
		points: 200,
		tier: 'royal',
		criteria: (progress) => true,
		unlocked: false,
	},
];
export function FAQGamificationSystem({
	totalQuestions,
	totalCategories,
	onQuestionRead,
	onCategoryCompleted,
	onHelpfulVote,
	onQuestionShared,
	onSearchPerformed,
	className = '',
	compact = false,
	showLeaderboard = false,
	enableNotifications = true,
}: GamificationSystemProps) {
	const [progress, setProgress] = React.useState<GamificationProgress>({
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
	});
	const [achievements, setAchievements] =
		React.useState<Achievement[]>(ACHIEVEMENTS);
	const [showAchievementModal, setShowAchievementModal] = React.useState(false);
	const [newAchievement, setNewAchievement] = React.useState<Achievement | null>(
		null,
	);
	const [showProgressPanel, setShowProgressPanel] = React.useState(false);
	const [sessionStartTime] = React.useState(Date.now());
	const questionsProgress = useSpring(
		(progress.totalQuestionsRead / totalQuestions) * 100,
	);
	const categoriesProgress = useSpring(
		(progress.categoriesCompleted.length / totalCategories) * 100,
	);
	const pointsDisplay = useSpring(progress.totalPoints);
	const levelProgress = useSpring(((progress.totalPoints % 100) / 100) * 100);
	const animatedQuestionsRead = useTransform(questionsProgress, (value) =>
		Math.round(value),
	);
	const animatedCategoriesCompleted = useTransform(categoriesProgress, (value) =>
		Math.round(value),
	);
	const animatedPoints = useTransform(pointsDisplay, (value) =>
		Math.round(value),
	);
	React.useEffect(() => {
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
			} catch (error) {
				console.warn('Failed to parse saved gamification progress:', error);
			}
		}
		const savedAchievements = localStorage.getItem(
			'faq-gamification-achievements',
		);
		if (savedAchievements) {
			try {
				const parsedAchievements = JSON.parse(savedAchievements);
				setAchievements(parsedAchievements);
			} catch (error) {
				console.warn('Failed to parse saved achievements:', error);
			}
		}
	}, []);
	React.useEffect(() => {
		localStorage.setItem('faq-gamification-progress', JSON.stringify(progress));
	}, [progress]);
	React.useEffect(() => {
		localStorage.setItem(
			'faq-gamification-achievements',
			JSON.stringify(achievements),
		);
	}, [achievements]);
	React.useEffect(() => {
		const interval = setInterval(() => {
			const sessionMinutes = Math.floor((Date.now() - sessionStartTime) / 60000);
			if (sessionMinutes > 0) {
				setProgress((prev) => ({
					...prev,
					readingTimeMinutes: prev.readingTimeMinutes + 1,
				}));
			}
		}, 60000);
		return () => clearInterval(interval);
	}, [sessionStartTime]);
	React.useEffect(() => {
		const updatedAchievements = achievements.map((achievement) => {
			if (!achievement.unlocked && achievement.criteria(progress)) {
				if (enableNotifications) {
					setNewAchievement(achievement);
					setShowAchievementModal(true);
				}
				return {
					...achievement,
					unlocked: true,
					unlockedDate: new Date().toISOString(),
				};
			}
			return achievement;
		});
		const newlyUnlocked = updatedAchievements.filter(
			(ach, i) => ach.unlocked && !achievements[i].unlocked,
		);
		if (newlyUnlocked.length > 0) {
			setAchievements(updatedAchievements);
			const bonusPoints = newlyUnlocked.reduce((sum, ach) => sum + ach.points, 0);
			if (bonusPoints > 0) {
				setProgress((prev) => ({
					...prev,
					totalPoints: prev.totalPoints + bonusPoints,
					level: Math.floor((prev.totalPoints + bonusPoints) / 100) + 1,
				}));
			}
		}
	}, [progress, achievements, enableNotifications]);
	const handleQuestionRead = React.useCallback(
		(questionId: string, readingTime: number = 1) => {
			setProgress((prev) => ({
				...prev,
				totalQuestionsRead: prev.totalQuestionsRead + 1,
				readingTimeMinutes: prev.readingTimeMinutes + readingTime,
				totalPoints: prev.totalPoints + 10,
			}));
			onQuestionRead?.(questionId, readingTime);
		},
		[onQuestionRead],
	);
	const handleCategoryCompleted = React.useCallback(
		(categoryId: string) => {
			setProgress((prev) => ({
				...prev,
				categoriesCompleted: [
					...new Set([...prev.categoriesCompleted, categoryId]),
				],
				totalPoints: prev.totalPoints + 25,
			}));
			onCategoryCompleted?.(categoryId);
		},
		[onCategoryCompleted],
	);
	const handleHelpfulVote = React.useCallback(
		(questionId: string, isHelpful: boolean) => {
			if (isHelpful) {
				setProgress((prev) => ({
					...prev,
					helpfulVotes: prev.helpfulVotes + 1,
					totalPoints: prev.totalPoints + 5,
				}));
			}
			onHelpfulVote?.(questionId, isHelpful);
		},
		[onHelpfulVote],
	);
	const handleQuestionShared = React.useCallback(
		(questionId: string, platform: string) => {
			setProgress((prev) => ({
				...prev,
				questionsShared: prev.questionsShared + 1,
				totalPoints: prev.totalPoints + 15,
			}));
			onQuestionShared?.(questionId, platform);
		},
		[onQuestionShared],
	);
	const handleSearchPerformed = React.useCallback(
		(query: string, resultsCount: number) => {
			setProgress((prev) => ({
				...prev,
				searchesPerformed: prev.searchesPerformed + 1,
				totalPoints: prev.totalPoints + (resultsCount > 0 ? 5 : 2),
			}));
			onSearchPerformed?.(query, resultsCount);
		},
		[onSearchPerformed],
	);
	const unlockedAchievements = achievements.filter((ach) => ach.unlocked);
	const availableAchievements = achievements.filter((ach) => !ach.unlocked);
	const completionPercentage =
		(unlockedAchievements.length / achievements.length) * 100;
	if (compact) {
		return (
			<m.div
				className={`fixed bottom-4 right-4 z-50 ${className}`}
				initial={{
					opacity: 0,
					scale: 0.8,
					y: 20,
				}}
				animate={{
					opacity: 1,
					scale: 1,
					y: 0,
				}}
				transition={{
					duration: 0.5,
					type: 'spring',
					stiffness: 200,
				}}>
				<Button
					onClick={() => setShowProgressPanel(!showProgressPanel)}
					className='bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14 p-0'
					aria-label='View Progress'>
					<div className='flex flex-col items-center'>
						<Trophy size={20} />
						<span className='text-xs font-bold'>{progress.level}</span>
					</div>
				</Button>

				<AnimatePresence>
					{showProgressPanel && (
						<m.div
							initial={{
								opacity: 0,
								scale: 0.9,
								x: 20,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								x: 0,
							}}
							exit={{
								opacity: 0,
								scale: 0.9,
								x: 20,
							}}
							transition={{
								duration: 0.3,
							}}
							className='absolute bottom-16 right-0 w-80'>
							<Card className='bg-white/95 backdrop-blur-sm border-2 border-amber-200 shadow-xl'>
								<CardHeader className='pb-3'>
									<div className='flex items-center justify-between'>
										<CardTitle className='text-lg font-serif text-slate-900'>
											Your Progress
										</CardTitle>
										<Button
											variant='ghost'
											size='sm'
											onClick={() => setShowProgressPanel(false)}
											className='h-8 w-8 p-0'>
											<X size={16} />
										</Button>
									</div>
								</CardHeader>
								<CardContent className='space-y-4'>
									<div className='text-center'>
										<div className='flex items-center justify-center space-x-2 mb-2'>
											<Crown
												className='text-amber-500'
												size={20}
											/>
											<span className='text-2xl font-bold text-slate-900'>
												Level {progress.level}
											</span>
										</div>
										<m.div className='text-lg font-semibold text-amber-600'>
											{animatedPoints.get()} points
										</m.div>
										<Progress
											value={levelProgress.get()}
											className='h-2 mt-2'
										/>
									</div>

									<div className='grid grid-cols-2 gap-3 text-sm'>
										<div className='text-center'>
											<div className='font-semibold text-slate-900'>
												{progress.totalQuestionsRead}
											</div>
											<div className='text-slate-600'>Questions Read</div>
										</div>
										<div className='text-center'>
											<div className='font-semibold text-slate-900'>
												{progress.categoriesCompleted.length}
											</div>
											<div className='text-slate-600'>Categories</div>
										</div>
									</div>

									{unlockedAchievements.length > 0 && (
										<div className='pt-2 border-t border-slate-200'>
											<div className='text-xs text-slate-600 mb-1'>
												Latest Achievement:
											</div>
											<div className='flex items-center space-x-2'>
												<Trophy
													size={16}
													className='text-amber-500'
												/>
												<span className='text-sm font-medium text-slate-900'>
													{unlockedAchievements[unlockedAchievements.length - 1]?.title}
												</span>
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						</m.div>
					)}
				</AnimatePresence>
			</m.div>
		);
	}
	return (
		<>
			<m.div
				className={`bg-gradient-to-br from-white via-slate-50 to-white border-2 border-slate-200 rounded-3xl shadow-xl p-6 lg:p-8 ${className}`}
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
					type: 'spring',
					stiffness: 100,
				}}>
				<div className='flex items-center justify-between mb-8'>
					<div>
						<HeadingText variant="primary" level={2} className="text-slate-900 mb-2" responsive>
							Your Learning Journey
						</HeadingText>
						<BodyText variant="default" className="text-slate-600">
							Track your progress and unlock achievements as you explore our FAQ
							section
						</BodyText>
					</div>
					<div className='text-right'>
						<div className='flex items-center space-x-2 mb-2'>
							<Crown
								className='text-amber-500'
								size={24}
							/>
							<TitleText variant="large" level={3} className="font-bold text-slate-900">
								Level {progress.level}
							</TitleText>
						</div>
						<m.div>
							<BodyText variant="large" className="font-semibold text-amber-600">
								{animatedPoints.get()} points
							</BodyText>
						</m.div>
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
					<Card className='bg-white/80 backdrop-blur-sm border border-slate-200'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<div className='flex items-center space-x-2'>
									<BookOpen
										className='text-blue-500'
										size={20}
									/>
									<span className='font-semibold text-slate-900'>Questions</span>
								</div>
								<Badge
									variant='outline'
									className='text-xs'>
									{progress.totalQuestionsRead}/{totalQuestions}
								</Badge>
							</div>
							<Progress
								value={questionsProgress.get()}
								className='h-3 mb-2'
							/>
							<p className='text-sm text-slate-600'>
								{Math.round(questionsProgress.get())}% complete
							</p>
						</CardContent>
					</Card>

					<Card className='bg-white/80 backdrop-blur-sm border border-slate-200'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<div className='flex items-center space-x-2'>
									<Target
										className='text-green-500'
										size={20}
									/>
									<span className='font-semibold text-slate-900'>Categories</span>
								</div>
								<Badge
									variant='outline'
									className='text-xs'>
									{progress.categoriesCompleted.length}/{totalCategories}
								</Badge>
							</div>
							<Progress
								value={categoriesProgress.get()}
								className='h-3 mb-2'
							/>
							<p className='text-sm text-slate-600'>
								{Math.round(categoriesProgress.get())}% explored
							</p>
						</CardContent>
					</Card>

					<Card className='bg-white/80 backdrop-blur-sm border border-slate-200'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<div className='flex items-center space-x-2'>
									<Flame
										className='text-orange-500'
										size={20}
									/>
									<span className='font-semibold text-slate-900'>Streak</span>
								</div>
								<Badge
									variant='outline'
									className='text-xs'>
									{progress.streakDays} days
								</Badge>
							</div>
							<div className='text-2xl font-bold text-orange-600 mb-2'>
								{progress.streakDays}
							</div>
							<p className='text-sm text-slate-600'>consecutive days</p>
						</CardContent>
					</Card>
				</div>

				<div className='mb-8'>
					<div className='flex items-center justify-between mb-6'>
						<TitleText
							variant="large"
							level={3}
							className='font-serif font-bold text-slate-900'>
							Achievements ({unlockedAchievements.length}/{achievements.length})
						</TitleText>
						<Badge
							variant='secondary'
							className='text-sm'>
							{Math.round(completionPercentage)}% complete
						</Badge>
					</div>

					<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
						{achievements.slice(0, 8).map((achievement, index) => (
							<m.div
								key={achievement.id}
								initial={{
									opacity: 0,
									scale: 0.9,
								}}
								animate={{
									opacity: 1,
									scale: 1,
								}}
								transition={{
									duration: 0.3,
									delay: index * 0.1,
								}}
								className={`p-4 rounded-xl border-2 transition-all duration-300 ${achievement.unlocked ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 shadow-md' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
								<div className='text-center'>
									<div
										className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
											achievement.unlocked ?
												achievement.tier === 'royal' ? 'bg-purple-100 text-purple-600'
												: achievement.tier === 'gold' ? 'bg-amber-100 text-amber-600'
												: achievement.tier === 'silver' ? 'bg-slate-100 text-slate-600'
												: 'bg-orange-100 text-orange-600'
											:	'bg-slate-100 text-slate-400'
										}`}>
										<achievement.icon size={20} />
									</div>
									<h4
										className={`font-semibold text-sm mb-1 ${achievement.unlocked ? 'text-slate-900' : 'text-slate-500'}`}>
										{achievement.title}
									</h4>
									<p
										className={`text-xs ${achievement.unlocked ? 'text-slate-600' : 'text-slate-400'}`}>
										{achievement.description}
									</p>
									{achievement.unlocked && (
										<div className='mt-2'>
											<Badge
												variant='outline'
												size='sm'
												className='text-xs'>
												+{achievement.points} pts
											</Badge>
										</div>
									)}
								</div>
							</m.div>
						))}
					</div>
				</div>

				<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
					<div className='text-center p-4 bg-white/50 rounded-xl border border-slate-200'>
						<div className='text-2xl font-bold text-slate-900 mb-1'>
							{progress.readingTimeMinutes}
						</div>
						<div className='text-sm text-slate-600'>Minutes Reading</div>
					</div>
					<div className='text-center p-4 bg-white/50 rounded-xl border border-slate-200'>
						<div className='text-2xl font-bold text-slate-900 mb-1'>
							{progress.searchesPerformed}
						</div>
						<div className='text-sm text-slate-600'>Searches</div>
					</div>
					<div className='text-center p-4 bg-white/50 rounded-xl border border-slate-200'>
						<div className='text-2xl font-bold text-slate-900 mb-1'>
							{progress.helpfulVotes}
						</div>
						<div className='text-sm text-slate-600'>Helpful Votes</div>
					</div>
					<div className='text-center p-4 bg-white/50 rounded-xl border border-slate-200'>
						<div className='text-2xl font-bold text-slate-900 mb-1'>
							{progress.questionsShared}
						</div>
						<div className='text-sm text-slate-600'>Shares</div>
					</div>
				</div>
			</m.div>

			<AnimatePresence>
				{showAchievementModal && newAchievement && (
					<m.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						exit={{
							opacity: 0,
						}}
						className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
						onClick={() => setShowAchievementModal(false)}>
						<m.div
							initial={{
								opacity: 0,
								scale: 0.8,
								y: 20,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								y: 0,
							}}
							exit={{
								opacity: 0,
								scale: 0.8,
								y: 20,
							}}
							transition={{
								duration: 0.3,
								type: 'spring',
							}}
							className='bg-white rounded-3xl p-8 max-w-md mx-auto text-center shadow-2xl'
							onClick={(e) => e.stopPropagation()}>
							<div className='mb-6'>
								<div className='w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center mb-4'>
									<newAchievement.icon
										size={32}
										className='text-amber-600'
									/>
								</div>
								<h3 className='text-2xl font-serif font-bold text-slate-900 mb-2'>
									Achievement Unlocked!
								</h3>
								<h4 className='text-xl font-semibold text-amber-600 mb-2'>
									{newAchievement.title}
								</h4>
								<p className='text-slate-600 mb-4'>{newAchievement.description}</p>
								<Badge
									variant='outline'
									className='text-lg px-4 py-2'>
									+{newAchievement.points} points
								</Badge>
							</div>
							<Button
								onClick={() => setShowAchievementModal(false)}
								className='w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold py-3'>
								Continue Exploring
							</Button>
						</m.div>
					</m.div>
				)}
			</AnimatePresence>

			<div
				style={{
					display: 'none',
				}}>
				{React.createElement('div', {
					'data-handlers': JSON.stringify({
						onQuestionRead: handleQuestionRead,
						onCategoryCompleted: handleCategoryCompleted,
						onHelpfulVote: handleHelpfulVote,
						onQuestionShared: handleQuestionShared,
						onSearchPerformed: handleSearchPerformed,
					}),
				})}
			</div>
		</>
	);
}
