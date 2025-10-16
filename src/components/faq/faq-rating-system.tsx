'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ThumbsUp,
	ThumbsDown,
	MessageSquare,
	Send,
	Check,
	AlertTriangle,
	Sparkles,
	Plus,
} from 'lucide-react';
import { useHelpfulVoteTracker } from './faq-gamification-tracker';
const feedbackSchema = z.object({
	rating: z.enum(['helpful', 'not_helpful'], {
		required_error: 'Please select whether this answer was helpful',
		invalid_type_error: 'Rating must be either helpful or not helpful',
	}),
	feedback: z
		.string()
		.min(10, {
			message: 'Please provide at least 10 characters of feedback',
		})
		.max(1000, {
			message: 'Feedback must be less than 1000 characters',
		})
		.optional(),
	email: z
		.string()
		.email({
			message: 'Please enter a valid email address',
		})
		.optional()
		.or(z.literal('')),
	improvementSuggestions: z
		.string()
		.max(500, {
			message: 'Suggestions must be less than 500 characters',
		})
		.optional(),
	category: z
		.enum(['accuracy', 'clarity', 'completeness', 'relevance', 'other'], {
			required_error: 'Please select a feedback category',
		})
		.optional(),
	honeypot: z
		.string()
		.max(0, {
			message: 'Spam detection triggered',
		})
		.optional(),
});
type FeedbackFormData = z.infer<typeof feedbackSchema>;
interface FAQRatingSystemProps {
	questionId: string;
	questionText: string;
	onRatingSubmit?: (
		data: FeedbackFormData & {
			questionId: string;
		},
	) => void;
	className?: string;
}
interface RatingState {
	hasVoted: boolean;
	userRating: 'helpful' | 'not_helpful' | null;
	showFeedbackForm: boolean;
	isSubmitting: boolean;
	submitSuccess: boolean;
	analytics: {
		helpfulCount: number;
		notHelpfulCount: number;
		feedbackCount: number;
	};
}
export function FAQRatingSystem({
	questionId,
	questionText,
	onRatingSubmit,
	className = '',
}: FAQRatingSystemProps) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isValid },
		reset,
	} = useForm<FeedbackFormData>({
		resolver: zodResolver(feedbackSchema),
		mode: 'onChange',
	});
	const { trackHelpfulVote } = useHelpfulVoteTracker();
	const [ratingState, setRatingState] = useState<RatingState>({
		hasVoted: false,
		userRating: null,
		showFeedbackForm: false,
		isSubmitting: false,
		submitSuccess: false,
		analytics: {
			helpfulCount: 0,
			notHelpfulCount: 0,
			feedbackCount: 0,
		},
	});
	const [pointsEarned, setPointsEarned] = useState<number | null>(null);
	const [showReward, setShowReward] = useState(false);
	const watchedRating = watch('rating');
	const watchedFeedback = watch('feedback', '');
	useEffect(() => {
		const existingRating = localStorage.getItem(`faq_rating_${questionId}`);
		const analytics = localStorage.getItem(`faq_analytics_${questionId}`);
		if (existingRating) {
			const rating = JSON.parse(existingRating);
			setRatingState((prev) => ({
				...prev,
				hasVoted: true,
				userRating: rating.rating,
				analytics: analytics ? JSON.parse(analytics) : prev.analytics,
			}));
			setValue('rating', rating.rating);
		}
	}, [questionId, setValue]);
	const handleRatingClick = (rating: 'helpful' | 'not_helpful') => {
		if (ratingState.hasVoted) return;
		setValue('rating', rating);
		trackHelpfulVote(questionId, rating === 'helpful');
		const points = rating === 'helpful' ? 5 : 2;
		setPointsEarned(points);
		setShowReward(true);
		setTimeout(() => {
			setShowReward(false);
			setPointsEarned(null);
		}, 3000);
		const newAnalytics = {
			...ratingState.analytics,
			[rating === 'helpful' ? 'helpfulCount' : 'notHelpfulCount']:
				ratingState.analytics[
					rating === 'helpful' ? 'helpfulCount' : 'notHelpfulCount'
				] + 1,
		};
		setRatingState((prev) => ({
			...prev,
			userRating: rating,
			analytics: newAnalytics,
			showFeedbackForm: rating === 'not_helpful',
		}));
		localStorage.setItem(
			`faq_rating_${questionId}`,
			JSON.stringify({
				rating,
				timestamp: new Date().toISOString(),
				questionId,
			}),
		);
		localStorage.setItem(
			`faq_analytics_${questionId}`,
			JSON.stringify(newAnalytics),
		);
	};
	const onSubmit = async (data: FeedbackFormData) => {
		if (data.honeypot && data.honeypot.length > 0) {
			return;
		}
		setRatingState((prev) => ({
			...prev,
			isSubmitting: true,
		}));
		try {
			const submissionData = {
				...data,
				questionId,
				questionText,
				timestamp: new Date().toISOString(),
				userAgent: navigator.userAgent,
				gdprConsent: true,
			};
			if (onRatingSubmit) {
				await onRatingSubmit(submissionData);
			}
			const newAnalytics = {
				...ratingState.analytics,
				feedbackCount: ratingState.analytics.feedbackCount + 1,
			};
			const existingFeedback =
				localStorage.getItem(`faq_feedback_${questionId}`) || '[]';
			const feedbackArray = JSON.parse(existingFeedback);
			feedbackArray.push(submissionData);
			localStorage.setItem(
				`faq_feedback_${questionId}`,
				JSON.stringify(feedbackArray),
			);
			localStorage.setItem(
				`faq_analytics_${questionId}`,
				JSON.stringify(newAnalytics),
			);
			setRatingState((prev) => ({
				...prev,
				hasVoted: true,
				submitSuccess: true,
				showFeedbackForm: false,
				analytics: newAnalytics,
			}));
			reset();
			setTimeout(() => {
				setRatingState((prev) => ({
					...prev,
					submitSuccess: false,
				}));
			}, 3000);
		} catch (error) {
			console.error('Failed to submit feedback:', error);
			alert('Failed to submit feedback. Please try again.');
		} finally {
			setRatingState((prev) => ({
				...prev,
				isSubmitting: false,
			}));
		}
	};
	const toggleFeedbackForm = () => {
		setRatingState((prev) => ({
			...prev,
			showFeedbackForm: !prev.showFeedbackForm,
		}));
	};
	const getRatingPercentage = () => {
		const total =
			ratingState.analytics.helpfulCount + ratingState.analytics.notHelpfulCount;
		if (total === 0) return 50;
		return Math.round((ratingState.analytics.helpfulCount / total) * 100);
	};
	return (
		<div
			className={`bg-slate-50 border border-slate-200 rounded-lg p-6 mt-6 ${className}`}>
			{}
			<AnimatePresence>
				{ratingState.submitSuccess && (
					<motion.div
						initial={{
							opacity: 0,
							y: -10,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						exit={{
							opacity: 0,
							y: -10,
						}}
						className='mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-800'>
						<Check className='w-4 h-4' />
						<span className='text-sm'>
							Thank you for your feedback! Your input helps us improve our content.
						</span>
					</motion.div>
				)}
			</AnimatePresence>

			{}
			<div className='mb-4'>
				<h4 className='text-lg font-semibold text-slate-900 mb-2'>
					Was this answer helpful?
				</h4>

				{}
				{(ratingState.analytics.helpfulCount > 0 ||
					ratingState.analytics.notHelpfulCount > 0) && (
					<div className='mb-3'>
						<div className='flex items-center gap-2 text-sm text-slate-600 mb-1'>
							<span>{getRatingPercentage()}% found this helpful</span>
							<span className='text-slate-400'>
								(
								{ratingState.analytics.helpfulCount +
									ratingState.analytics.notHelpfulCount}{' '}
								votes)
							</span>
						</div>
						<div className='w-full bg-slate-200 rounded-full h-2'>
							<div
								className='bg-green-500 h-2 rounded-full transition-all duration-500'
								style={{
									width: `${getRatingPercentage()}%`,
								}}
							/>
						</div>
					</div>
				)}

				{}
				<div className='flex gap-3'>
					<motion.button
						whileHover={{
							scale: 1.05,
						}}
						whileTap={{
							scale: 0.95,
						}}
						onClick={() => handleRatingClick('helpful')}
						disabled={ratingState.hasVoted}
						className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-200 ${
							ratingState.userRating === 'helpful' ?
								'bg-green-50 border-green-300 text-green-700'
							: ratingState.hasVoted ?
								'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
							:	'bg-white border-slate-300 text-slate-700 hover:bg-green-50 hover:border-green-300'
						}`}>
						<ThumbsUp className='w-4 h-4' />
						<span>Yes, helpful</span>
						{ratingState.analytics.helpfulCount > 0 && (
							<span className='ml-1 text-xs text-slate-500'>
								({ratingState.analytics.helpfulCount})
							</span>
						)}
					</motion.button>

					<motion.button
						whileHover={{
							scale: 1.05,
						}}
						whileTap={{
							scale: 0.95,
						}}
						onClick={() => handleRatingClick('not_helpful')}
						disabled={ratingState.hasVoted}
						className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-200 ${
							ratingState.userRating === 'not_helpful' ?
								'bg-red-50 border-red-300 text-red-700'
							: ratingState.hasVoted ?
								'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
							:	'bg-white border-slate-300 text-slate-700 hover:bg-red-50 hover:border-red-300'
						}`}>
						<ThumbsDown className='w-4 h-4' />
						<span>No, not helpful</span>
						{ratingState.analytics.notHelpfulCount > 0 && (
							<span className='ml-1 text-xs text-slate-500'>
								({ratingState.analytics.notHelpfulCount})
							</span>
						)}
					</motion.button>
				</div>

				{}
				{}
				<AnimatePresence>
					{showReward && pointsEarned && (
						<motion.div
							initial={{
								opacity: 0,
								scale: 0.8,
								y: 10,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								y: 0,
							}}
							exit={{
								opacity: 0,
								scale: 0.9,
								y: -5,
							}}
							transition={{
								duration: 0.4,
								type: 'spring',
								stiffness: 200,
							}}
							className='mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl'>
							<div className='flex items-center justify-center space-x-2'>
								<Sparkles
									className='text-amber-500'
									size={20}
								/>
								<span className='text-green-700 font-semibold text-sm'>
									+{pointsEarned} points earned!
								</span>
								<Plus
									className='text-green-600'
									size={16}
								/>
							</div>
							<p className='text-xs text-green-600 text-center mt-1'>
								Thank you for your feedback! You're helping others learn.
							</p>
						</motion.div>
					)}
				</AnimatePresence>

				{}
				{!ratingState.showFeedbackForm && !ratingState.submitSuccess && (
					<button
						onClick={toggleFeedbackForm}
						className='mt-3 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors'>
						<MessageSquare className='w-4 h-4' />
						<span>Provide additional feedback</span>
					</button>
				)}
			</div>

			{}
			<AnimatePresence>
				{ratingState.showFeedbackForm && (
					<motion.form
						initial={{
							opacity: 0,
							height: 0,
						}}
						animate={{
							opacity: 1,
							height: 'auto',
						}}
						exit={{
							opacity: 0,
							height: 0,
						}}
						onSubmit={handleSubmit(onSubmit)}
						className='mt-4 space-y-4 overflow-hidden'>
						{}
						<input
							type='text'
							{...register('honeypot')}
							className='hidden'
							tabIndex={-1}
							autoComplete='off'
						/>

						{}
						{watchedRating === 'not_helpful' && (
							<div>
								<label className='block text-sm font-medium text-slate-700 mb-1'>
									What could be improved? <span className='text-red-500'>*</span>
								</label>
								<select
									{...register('category')}
									className='w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
									<option value=''>Select a category</option>
									<option value='accuracy'>Information accuracy</option>
									<option value='clarity'>Answer clarity</option>
									<option value='completeness'>Missing information</option>
									<option value='relevance'>Not relevant to question</option>
									<option value='other'>Other issue</option>
								</select>
								{errors.category && (
									<p className='mt-1 text-sm text-red-600 flex items-center gap-1'>
										<AlertTriangle className='w-3 h-3' />
										{errors.category.message}
									</p>
								)}
							</div>
						)}

						{}
						<div>
							<label className='block text-sm font-medium text-slate-700 mb-1'>
								{watchedRating === 'helpful' ?
									'What was most helpful?'
								:	'How can we improve this answer?'}
								<span className='text-red-500 ml-1'>*</span>
							</label>
							<textarea
								{...register('feedback')}
								rows={4}
								placeholder={
									watchedRating === 'helpful' ?
										'Tell us what made this answer particularly helpful...'
									:	'Please provide specific suggestions for improvement...'
								}
								className='w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical'
							/>
							<div className='flex justify-between items-center mt-1'>
								{errors.feedback ?
									<p className='text-sm text-red-600 flex items-center gap-1'>
										<AlertTriangle className='w-3 h-3' />
										{errors.feedback.message}
									</p>
								:	<p className='text-xs text-slate-500'>
										Minimum 10 characters required
									</p>
								}
								<span className='text-xs text-slate-400'>
									{watchedFeedback.length}/1000
								</span>
							</div>
						</div>

						{}
						<div>
							<label className='block text-sm font-medium text-slate-700 mb-1'>
								Additional suggestions (optional)
							</label>
							<textarea
								{...register('improvementSuggestions')}
								rows={2}
								placeholder='Any other suggestions for improving our FAQ section...'
								className='w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical'
							/>
							{errors.improvementSuggestions && (
								<p className='mt-1 text-sm text-red-600 flex items-center gap-1'>
									<AlertTriangle className='w-3 h-3' />
									{errors.improvementSuggestions.message}
								</p>
							)}
						</div>

						{}
						<div>
							<label className='block text-sm font-medium text-slate-700 mb-1'>
								Email (optional - for follow-up)
							</label>
							<input
								type='email'
								{...register('email')}
								placeholder='your.email@example.com'
								className='w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
							{errors.email && (
								<p className='mt-1 text-sm text-red-600 flex items-center gap-1'>
									<AlertTriangle className='w-3 h-3' />
									{errors.email.message}
								</p>
							)}
							<p className='mt-1 text-xs text-slate-500'>
								We'll only use this to follow up on your feedback if needed
							</p>
						</div>

						{}
						<div className='bg-blue-50 border border-blue-200 rounded-md p-3'>
							<p className='text-xs text-blue-800'>
								<strong>Privacy Notice:</strong> Your feedback will be stored securely
								and used only to improve our FAQ content. We respect your privacy and
								comply with GDPR regulations. You can request deletion of your data at
								any time by contacting info@myprivatetutoronline.com.
							</p>
						</div>

						{}
						<div className='flex gap-3 pt-2'>
							<motion.button
								whileHover={{
									scale: 1.02,
								}}
								whileTap={{
									scale: 0.98,
								}}
								type='submit'
								disabled={!isValid || ratingState.isSubmitting}
								className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isValid && !ratingState.isSubmitting ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}>
								{ratingState.isSubmitting ?
									<>
										<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
										<span>Submitting...</span>
									</>
								:	<>
										<Send className='w-4 h-4' />
										<span>Submit Feedback</span>
									</>
								}
							</motion.button>

							<button
								type='button'
								onClick={toggleFeedbackForm}
								className='px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors'>
								Cancel
							</button>
						</div>
					</motion.form>
				)}
			</AnimatePresence>

			{}
			{ratingState.analytics.feedbackCount > 0 && (
				<div className='mt-4 pt-4 border-t border-slate-200'>
					<p className='text-xs text-slate-500'>
						{ratingState.analytics.feedbackCount} user
						{ratingState.analytics.feedbackCount !== 1 ? 's' : ''} provided additional
						feedback
					</p>
				</div>
			)}
		</div>
	);
}
