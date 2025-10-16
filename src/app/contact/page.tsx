'use client';

import React from 'react';
import { getContactContent, getUnifiedContact } from '@/lib/cms';
import { SimpleHero } from '@/components/layout/simple-hero';
import { FAQContactSection } from '@/components/faq/faq-contact-section';
import { Separator } from '@/components/ui/separator';
export default function ContactPage() {
	const contactContent = getContactContent();
	const unifiedContact = getUnifiedContact();
	const contactDetails = unifiedContact.landingInfo;
	const faqContactContent = {
		title: contactContent.sectionTitle,
		description: contactContent.sectionDescription,
		buttons: [
			{
				text: contactContent.submitButtonText,
				type: 'primary' as const,
				href: `mailto:${contactContent.contactInfo.email}`,
			},
			{
				text: 'Email Elizabeth Directly',
				type: 'secondary' as const,
				action: 'contactEmail',
			},
		],
	};
	const faqContactDetails = {
		primaryEmail: contactContent.contactInfo.email,
		phone: contactContent.contactInfo.phone,
	};
	return (
		<div className='min-h-screen'>
			{}
			{}
			<SimpleHero
				title='Contact Us'
				subtitle="Get in touch with Elizabeth's team for personalised tutoring solutions"
				breadcrumb='Contact'
			/>

			<Separator className='bg-gray-200' />

			{}
			{}
			{}
			<FAQContactSection
				contactContent={faqContactContent}
				contactDetails={faqContactDetails}
			/>

			{}
			{}
			<section className='py-16 bg-gray-50'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='max-w-4xl mx-auto'>
						<div className='text-center mb-12'>
							<h2 className='text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-4'>
								{contactContent.formTitle}
							</h2>
							<p className='text-xl text-primary-700'>
								{contactContent.formDescription}
							</p>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
							{}
							<div className='bg-white rounded-lg p-8 shadow-lg'>
								<h3 className='text-2xl font-serif font-bold text-primary-900 mb-6'>
									Get in Touch
								</h3>
								<div className='space-y-4'>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>Email</h4>
										<a
											href={`mailto:${contactContent.contactInfo.email}`}
											className='text-accent-600 hover:text-accent-700 transition-colors'>
											{contactContent.contactInfo.email}
										</a>
									</div>
									<div>
										<h4 className='font-semibold text-gray-900 mb-2'>Phone</h4>
										<a
											href={`tel:${contactContent.contactInfo.phone}`}
											className='text-accent-600 hover:text-accent-700 transition-colors'>
											{contactContent.contactInfo.phone}
										</a>
									</div>
									{contactContent.contactInfo.address && (
										<div>
											<h4 className='font-semibold text-gray-900 mb-2'>Address</h4>
											<address className='text-gray-700 not-italic'>
												{contactContent.contactInfo.address
													.split('\n')
													.map((line, index) => (
														<div key={index}>{line}</div>
													))}
											</address>
										</div>
									)}
								</div>
							</div>

							{}
							<div className='bg-white rounded-lg p-8 shadow-lg'>
								<h3 className='text-2xl font-serif font-bold text-primary-900 mb-6'>
									Business Hours
								</h3>
								<div className='space-y-3'>
									<div className='flex justify-between'>
										<span className='text-gray-700'>Monday - Friday</span>
										<span className='font-semibold'>9:00 AM - 6:00 PM</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-700'>Saturday</span>
										<span className='font-semibold'>10:00 AM - 4:00 PM</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-700'>Sunday</span>
										<span className='font-semibold'>Closed</span>
									</div>
								</div>

								<div className='mt-8 pt-8 border-t border-gray-200'>
									<h4 className='font-semibold text-gray-900 mb-3'>Response Time</h4>
									<p className='text-gray-700 text-sm'>
										We typically respond to all enquiries within 24 hours during business
										days. For urgent matters, please call us directly.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
