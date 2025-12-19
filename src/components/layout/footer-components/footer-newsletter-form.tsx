'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BodyText } from '@/components/ui/typography';
import {
	newsletterSchema,
	type NewsletterData,
} from '@/lib/validation/schemas';
import { FooterGDPRConsent, type ConsentState } from './footer-gdpr-consent';
interface FooterNewsletterFormProps {
	className?: string;
	onSubmit?: (data: NewsletterData) => Promise<void>;
	autoConsent?: boolean;
}
export const FooterNewsletterForm = React.memo<FooterNewsletterFormProps>(
	({ className = '', onSubmit, autoConsent = true }) => {
		const [submissionState, setSubmissionState] = useState<
			'idle' | 'loading' | 'success' | 'error'
		>('idle');
		const [errorMessage, setErrorMessage] = useState<string>('');
		const [consentState, setConsentState] = useState<ConsentState | null>(null);
		const {
			register,
			handleSubmit,
			formState: { errors, isSubmitting },
			reset,
			setValue,
		} = useForm<NewsletterData>({
			resolver: zodResolver(newsletterSchema),
			defaultValues: {
				email: '',
				consentToMarketing: autoConsent,
				honeypot: '',
			},
			mode: 'onBlur',
		});
		const handleConsentChange = (consent: ConsentState) => {
			setConsentState(consent);
			setValue('consentToMarketing', consent.marketing);
		};
		const formConfig = useMemo(
			() => ({
				submitButtonText: {
					idle: 'Subscribe',
					loading: 'Subscribing...',
					success: 'Subscribed!',
					error: 'Try Again',
				},
				submitButtonIcon: {
					loading: Loader2,
					success: CheckCircle,
					error: AlertCircle,
				},
			}),
			[],
		);
		const handleFormSubmit = async (data: NewsletterData) => {
			try {
				setSubmissionState('loading');
				setErrorMessage('');
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 10000);
				if (onSubmit) {
					await onSubmit(data);
				} else {
					const response = await fetch('/api/newsletter', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
						signal: controller.signal,
					});
					clearTimeout(timeoutId);
					const result = await response.json();
					if (!result.success) {
						throw new Error(result.error || 'Subscription failed');
					}
				}
				setSubmissionState('success');
				reset();
				setTimeout(() => {
					setSubmissionState('idle');
				}, 5000);
			} catch (error) {
				console.error('Newsletter submission error:', error);
				setSubmissionState('error');
				if (error instanceof Error) {
					if (error.name === 'AbortError') {
						setErrorMessage(
							'Request timed out. Please check your connection and try again.',
						);
					} else {
						setErrorMessage(error.message || 'Network error. Please try again.');
					}
				} else {
					setErrorMessage('An unexpected error occurred. Please try again.');
				}
			}
		};
		if (submissionState === 'success') {
			return (
				<div className={`max-w-md mx-auto ${className}`}>
					<div className='flex items-center justify-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg'>
						<CheckCircle className='w-5 h-5 text-green-600' />
						<BodyText className='text-green-800 font-medium'>
							Thank you for subscribing! Check your inbox for confirmation.
						</BodyText>
					</div>
				</div>
			);
		}
		return (
			<div className={`max-w-md mx-auto ${className}`}>
				<form
					onSubmit={handleSubmit(handleFormSubmit)}
					className='space-y-4'
					noValidate>
					<div className='flex flex-col sm:flex-row gap-4'>
						<div className='flex-1 space-y-1'>
							<label
								htmlFor='newsletter-email'
								className='sr-only'>
								Email address for newsletter subscription
							</label>

							<input
								{...register('email')}
								id='newsletter-email'
								type='email'
								placeholder='Enter your email'
								disabled={isSubmitting}
								aria-describedby='email-description email-error'
								aria-invalid={errors.email ? 'true' : 'false'}
								className={cn(
									'w-full px-6 py-3 bg-gray-100 border rounded-lg text-black placeholder-gray-500',
									'focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent',
									'disabled:opacity-50 disabled:cursor-not-allowed',
									'transition-colors duration-200',
									errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300',
								)}
							/>

							<div
								id='email-description'
								className='sr-only'>
								Subscribe to receive educational insights and exclusive opportunities
							</div>

							{errors.email && (
								<div
									id='email-error'
									role='alert'
									aria-live='polite'
									className='flex items-center gap-1'>
									<AlertCircle className='w-4 h-4 text-red-600' />
									<BodyText variant="small" className='text-red-600'>
										{errors.email.message}
									</BodyText>
								</div>
							)}
						</div>

						<SubmitButton
							isSubmitting={isSubmitting}
							submissionState={submissionState}
							config={formConfig}
						/>
					</div>

					<FooterGDPRConsent
						onConsentChange={handleConsentChange}
						required={true}
						compact={true}
						className='text-left'
					/>

					{submissionState === 'error' && errorMessage && (
						<div className='flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg'>
							<AlertCircle className='w-4 h-4 text-red-600' />
							<BodyText variant="small" className='text-red-800'>{errorMessage}</BodyText>
						</div>
					)}

					<input
						{...register('honeypot')}
						type='text'
						tabIndex={-1}
						className='sr-only'
						autoComplete='off'
						aria-hidden='true'
					/>
				</form>
			</div>
		);
	},
);
FooterNewsletterForm.displayName = 'FooterNewsletterForm';
interface SubmitButtonProps {
	isSubmitting: boolean;
	submissionState: 'idle' | 'loading' | 'success' | 'error';
	config: {
		submitButtonText: Record<string, string>;
		submitButtonIcon: Record<string, React.ElementType>;
	};
}
const SubmitButton = React.memo<SubmitButtonProps>(
	({ isSubmitting, submissionState, config }) => {
		const IconComponent = config.submitButtonIcon[submissionState];
		const buttonText = config.submitButtonText[submissionState];
		return (
			<Button
				type='submit'
				disabled={isSubmitting}
				className={cn(
					'px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold',
					'disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]',
					'animate-shimmer bg-[linear-gradient(110deg,#eab308,45%,#fbbf24,55%,#eab308)] bg-[length:200%_100%]',
					'border border-accent-600 shadow-lg transition-all duration-200',
					'focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2',
				)}
				aria-describedby='submit-description'>
				{IconComponent && submissionState === 'loading' && (
					<IconComponent className='w-4 h-4 mr-2 animate-spin' />
				)}
				{buttonText}
			</Button>
		);
	},
);
SubmitButton.displayName = 'SubmitButton';
export const FooterNewsletterFormSkeleton: React.FC<{
	className?: string;
}> = ({ className = '' }) => (
	<div className={`max-w-md mx-auto space-y-4 ${className}`}>
		<div className='flex flex-col sm:flex-row gap-4'>
			<div className='flex-1'>
				<div className='h-12 bg-gray-200 border border-gray-300 rounded-lg animate-pulse' />
			</div>
			<div className='min-w-[120px] h-12 bg-accent-600/20 border border-accent-600/30 rounded-lg animate-pulse' />
		</div>
	</div>
);
FooterNewsletterFormSkeleton.displayName = 'FooterNewsletterFormSkeleton';
export default FooterNewsletterForm;
