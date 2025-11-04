'use client';

import React, { useMemo, lazy, Suspense, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import FooterErrorBoundary from './footer-error-boundary';
import { FooterCompanySectionHardcoded } from './footer-components/footer-company-section-hardcoded';
import { FooterNavigationHardcoded } from './footer-components/footer-navigation-hardcoded';
const FooterNewsletterForm = lazy(
	() => import('./footer-components/footer-newsletter-form'),
);
const FooterNewsletterFormSkeleton = lazy(() =>
	import('./footer-components/footer-newsletter-form').then((module) => ({
		default: module.FooterNewsletterFormSkeleton,
	})),
);
import { useFooterAccessibility } from '@/lib/hooks/use-footer-accessibility';
import FooterSkipLink from './footer-components/footer-skip-link';
import { useFooterPerformanceMarks } from './footer-components/footer-performance-monitor';
interface FooterContent {
	companyName: string;
	description: string;
	logo: {
		main: string;
		alt: string;
		width: number;
		height: number;
	};
	footerSections: Array<{
		title: string;
		links: Array<{
			href: string;
			label: string;
		}>;
	}>;
}
interface PageFooterClientProps {
	footerContent: FooterContent;
	copyrightText: string;
	className?: string;
	variant?: 'default' | 'minimal' | 'premium';
	showBackToTop?: boolean;
	showNewsletter?: boolean;
	showContactForm?: boolean;
}
export function PageFooterClient({
	footerContent,
	copyrightText,
	className,
	variant = 'default',
	showBackToTop = true,
	showNewsletter = false,
	showContactForm = false,
}: PageFooterClientProps) {
	const footerConfig = useMemo(
		() => ({
			variant,
			showBackToTop,
			showNewsletter,
			showContactForm,
			containerClasses: {
				default: 'bg-white text-primary-900',
				minimal: 'bg-neutral-50 text-primary-900',
				premium: 'bg-white text-primary-900 relative overflow-hidden',
			},
		}),
		[variant, showBackToTop, showNewsletter, showContactForm],
	);
	const scrollToTop = useMemo(
		() => () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		},
		[],
	);
	const handleNewsletterSubmit = useMemo(
		() => async (data: any) => {
			try {
				const response = await fetch('/api/newsletter', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				const result = await response.json();
				if (!result.success) {
					throw new Error(result.error || 'Subscription failed');
				}
			} catch (error) {
				console.error('Newsletter submission error:', error);
				throw error;
			}
		},
		[],
	);
	const {
		announce,
		manageFocus,
		announcementRef,
		isKeyboardUser,
		reducedMotion,
	} = useFooterAccessibility({
		enableSkipLinks: true,
		enableFocusManagement: true,
		enableAnnouncements: true,
		enableKeyboardShortcuts: true,
	});
	const {
		markFooterRenderStart,
		markFooterRenderEnd,
		markFooterInteractionReady,
	} = useFooterPerformanceMarks();
	useEffect(() => {
		markFooterRenderStart();
		return () => {
			markFooterRenderEnd();
		};
	}, [markFooterRenderStart, markFooterRenderEnd]);
	useEffect(() => {
		const timer = setTimeout(() => {
			markFooterInteractionReady();
			announce('Footer is ready for interaction');
		}, 100);
		return () => clearTimeout(timer);
	}, [markFooterInteractionReady, announce]);
	return (
		<FooterErrorBoundary
			enableRecovery={true}
			showDetails={process.env.NODE_ENV === 'development'}
			onError={(error, errorInfo) => {
				console.error('Footer component error:', error, errorInfo);
			}}>
			{}
			{}
			<FooterSkipLink />

			{}
			{}
			<div
				ref={announcementRef}
				className='sr-only'
				role='status'
				aria-live='polite'
				aria-atomic='true'
			/>

			<footer
				id='footer'
				className={cn(footerConfig.containerClasses[variant], className)}
				role='contentinfo'
				aria-label='Site footer'>
				{}
				{}
				{variant === 'premium' && (
					<>
						<div className='absolute inset-0 bg-gradient-to-r from-neutral-100/50 via-transparent to-neutral-100/50 pointer-events-none' />
						<div className='absolute inset-0 bg-gradient-to-br from-neutral-50/30 via-transparent to-neutral-50/30 animate-pulse opacity-50' />
					</>
				)}

				<div className='relative'>
					{}
					{}
					{footerConfig.showContactForm && (
						<div className='w-full px-4 sm:px-6 md:px-4 lg:px-8 py-12 md:py-12 lg:py-16'>
							<div className='max-w-4xl mx-auto text-center'>
								<h2 className='text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-4'>
									Ready to Start the Conversation?
								</h2>
								<p className='text-xl text-primary-700 mb-8'>
									Access our secure enquiry portal to discuss your child's educational
									needs
								</p>
								<a
									href='https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~'
									target='_blank'
									rel='noopener noreferrer'
									className='inline-block group'
									aria-label='Open Bizstim enquiry form in new window - secure external portal for My Private Tutor Online'>
									<div className='relative overflow-hidden rounded-lg border-2 border-neutral-300 hover:border-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl'>
										<img
											src='/images/graphics/bizstim-form-preview.png'
											alt='Screenshot of My Private Tutor Online enquiry form on Bizstim platform showing student details form with fields for first name, last name, email and phone number'
											className='w-full h-auto group-hover:scale-105 transition-transform duration-300'
											loading='lazy'
										/>
										<div className='absolute inset-0 bg-primary-950 opacity-0 group-hover:opacity-10 transition-opacity duration-300' />
										<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-950/80 to-transparent p-4'>
											<p className='text-white font-medium text-sm'>
												Click to access secure enquiry form →
											</p>
										</div>
									</div>
								</a>
								<p className='text-xs text-neutral-500 mt-3'>
									Opens in new window • Secure encrypted connection • Same trusted
									service
								</p>
							</div>
						</div>
					)}

					{footerConfig.showContactForm && <Separator className='bg-neutral-300' />}

					{}
					{}
					{footerConfig.showNewsletter && (
						<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12'>
							<div className='max-w-4xl mx-auto text-center'>
								<div className='animate-fade-in-up'>
									<h3 className='text-3xl font-serif font-bold text-primary-900 mb-4'>
										Join Our Exclusive Community
									</h3>
									<p className='text-neutral-700 mb-8 text-lg'>
										Receive personalised academic insights and exclusive opportunities for
										your child's success
									</p>

									{}
									{}
									<Suspense
										fallback={
											<FooterNewsletterFormSkeleton className='max-w-md mx-auto' />
										}>
										<FooterNewsletterForm
											onSubmit={handleNewsletterSubmit}
											autoConsent={true}
										/>
									</Suspense>
								</div>
							</div>
						</div>
					)}

					{footerConfig.showNewsletter && <Separator className='bg-neutral-300' />}

					{}
					{}
					<div className='w-full px-4 sm:px-6 md:px-4 lg:px-8 py-12 md:py-12 lg:py-16'>
						<div className='lg:container lg:mx-auto'>
							{}
							{}
							{}
							<div className='flex flex-col lg:flex-row lg:gap-12 items-stretch'>
								{}
								{}
								{}
								<div className='hidden lg:flex lg:w-[18%]'>
									<FooterCompanySectionHardcoded
										className='animate-fade-in-left'
									/>
								</div>

								{}
								{}
								{}
								<div className='w-full lg:w-[82%] flex'>
									<FooterNavigationHardcoded />
								</div>

								{}
								{}
							</div>
						</div>
					</div>

					<Separator className='bg-neutral-300' />

					{}
					{}
					<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
						<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
							<p className='text-sm text-neutral-600 text-center sm:text-left'>
								{copyrightText}
							</p>

							{}
							{footerConfig.showBackToTop && (
								<Button
									onClick={scrollToTop}
									variant='ghost'
									size='sm'
									className='text-neutral-600 hover:text-accent-600 transition-colors duration-300 mx-auto sm:mx-0'
									aria-label='Scroll to top of page'>
									<ArrowUp className='w-4 h-4 mr-2' />
									Back to Top
								</Button>
							)}
						</div>
					</div>

					{}
					{}
				</div>
			</footer>
		</FooterErrorBoundary>
	);
}
