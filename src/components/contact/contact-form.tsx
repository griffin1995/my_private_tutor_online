'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	contactFormSchema,
	transformContactFormData,
	contactFormDefaults,
	educationLevels,
	subjectOptions,
	urgencyOptions,
	referralSources,
	type ContactFormData,
} from '@/lib/validation/contact-form-schema';

interface ContactFormProps {
	className?: string;
	onSubmitSuccess?: (data: ContactFormData) => void;
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm({ className, onSubmitSuccess }: ContactFormProps) {
	const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: contactFormDefaults,
		mode: 'onBlur',
	});

	const onSubmit = async (data: ContactFormData) => {
		try {
			setSubmissionState('loading');
			setErrorMessage('');
			setSuccessMessage('');

			// Transform data for API submission
			const apiData = transformContactFormData(data);

			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 15000);

			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(apiData),
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to submit form');
			}

			setSubmissionState('success');
			setSuccessMessage(
				result.message ||
					`Thank you for your enquiry, ${data.name}! We'll respond within 24 hours. Reference: ${result.reference || 'N/A'}`
			);

			// Call success callback
			onSubmitSuccess?.(data);

			// Reset form after successful submission
			form.reset(contactFormDefaults);

			// Auto-clear success state after 10 seconds
			setTimeout(() => {
				setSubmissionState('idle');
				setSuccessMessage('');
			}, 10000);
		} catch (error) {
			console.error('Contact form submission error:', error);
			setSubmissionState('error');

			if (error instanceof Error) {
				if (error.name === 'AbortError') {
					setErrorMessage(
						'Request timed out. Please check your connection and try again.'
					);
				} else {
					setErrorMessage(error.message || 'Failed to submit form. Please try again.');
				}
			} else {
				setErrorMessage('An unexpected error occurred. Please try again.');
			}
		}
	};

	// Watch for preferred contact method to show relevant fields
	const preferredContact = form.watch('preferredContact');

	if (submissionState === 'success') {
		return (
			<div className={cn('max-w-2xl mx-auto', className)}>
				<Alert className='bg-green-50 border-green-200'>
					<CheckCircle className='h-4 w-4 text-green-600' />
					<AlertDescription className='text-green-800'>
						{successMessage}
					</AlertDescription>
				</Alert>
				<div className='mt-6 text-center'>
					<Button
						onClick={() => {
							setSubmissionState('idle');
							setSuccessMessage('');
						}}
						variant='outline'
					>
						Submit Another Enquiry
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className={cn('max-w-2xl mx-auto', className)}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					{/* Basic Contact Information */}
					<div className='space-y-4'>
						<div className='border-b border-gray-200 pb-2'>
							<h3 className='text-lg font-semibold text-primary-900'>
								Your Contact Information
							</h3>
							<p className='text-sm text-gray-600'>
								Please provide your details so we can get in touch.
							</p>
						</div>

						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name *</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your full name'
											disabled={submissionState === 'loading'}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Address *</FormLabel>
										<FormControl>
											<Input
												type='email'
												placeholder='your.email@example.com'
												disabled={submissionState === 'loading'}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input
												type='tel'
												placeholder='+44 7XXX XXX XXX'
												disabled={submissionState === 'loading'}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Optional - include if you'd like a phone consultation
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name='preferredContact'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Preferred Contact Method</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										disabled={submissionState === 'loading'}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='How would you like us to contact you?' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='email'>
												<div className='flex items-center gap-2'>
													<Mail className='h-4 w-4' />
													Email
												</div>
											</SelectItem>
											<SelectItem value='phone'>
												<div className='flex items-center gap-2'>
													<Phone className='h-4 w-4' />
													Phone
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Message Details */}
					<div className='space-y-4'>
						<div className='border-b border-gray-200 pb-2'>
							<h3 className='text-lg font-semibold text-primary-900'>
								Your Enquiry
							</h3>
							<p className='text-sm text-gray-600'>
								Tell us about your tutoring requirements.
							</p>
						</div>

						<FormField
							control={form.control}
							name='subject'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subject *</FormLabel>
									<FormControl>
										<Input
											placeholder='e.g., GCSE Mathematics Tutoring, 11+ Preparation'
											disabled={submissionState === 'loading'}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Brief description of what you're looking for
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='message'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message *</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Please provide details about your tutoring needs, student age, current level, specific subjects of interest, any particular challenges or goals, and your availability...'
											className='min-h-[120px]'
											disabled={submissionState === 'loading'}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										The more details you provide, the better we can tailor our response
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Additional Information (Optional) */}
					<div className='space-y-4'>
						<div className='border-b border-gray-200 pb-2'>
							<h3 className='text-lg font-semibold text-primary-900'>
								Additional Information
								<span className='text-sm text-gray-500 font-normal ml-2'>(Optional)</span>
							</h3>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='urgency'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Timeframe</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={submissionState === 'loading'}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='When would you like to start?' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{urgencyOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='referralSource'
								render={({ field }) => (
									<FormItem>
										<FormLabel>How did you find us?</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={submissionState === 'loading'}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select an option' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{referralSources.map((source) => (
													<SelectItem key={source} value={source}>
														{source}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					{/* Privacy Consent */}
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='consentToContact'
							render={({ field }) => (
								<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											disabled={submissionState === 'loading'}
										/>
									</FormControl>
									<div className='space-y-1 leading-none'>
										<FormLabel>
											I agree to the privacy policy and consent to being contacted *
										</FormLabel>
										<FormDescription>
											By checking this box, you consent to us processing your personal data
											to respond to your enquiry. See our{' '}
											<a
												href='/legal/privacy-policy'
												target='_blank'
												className='text-primary-600 underline hover:text-primary-700'
											>
												privacy policy
											</a>{' '}
											for details.
										</FormDescription>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Hidden honeypot field */}
					<FormField
						control={form.control}
						name='honeypot'
						render={({ field }) => (
							<div className='sr-only' aria-hidden='true'>
								<Input
									{...field}
									tabIndex={-1}
									autoComplete='off'
									placeholder='Leave this field empty'
								/>
							</div>
						)}
					/>

					{/* Error Display */}
					{submissionState === 'error' && errorMessage && (
						<Alert className='bg-red-50 border-red-200'>
							<AlertCircle className='h-4 w-4 text-red-600' />
							<AlertDescription className='text-red-800'>
								{errorMessage}
							</AlertDescription>
						</Alert>
					)}

					{/* Submit Button */}
					<div className='flex justify-end pt-4'>
						<Button
							type='submit'
							disabled={submissionState === 'loading' || !form.formState.isValid}
							className='min-w-[160px] bg-primary-700 hover:bg-primary-800 text-white'
						>
							{submissionState === 'loading' ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Submitting...
								</>
							) : (
								'Send Enquiry'
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}

export default ContactForm;