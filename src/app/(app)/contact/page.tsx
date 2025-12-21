'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { ContactForm } from '@/components/contact/contact-form';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

// ============================================================================
// CONTACT PAGE CONTENT
// ============================================================================

// Hero image for Contact page
const CONTACT_HERO_IMAGE = {
	src: '/images/hero/contact-us-hero.jpg',
	alt: 'Contact Elizabeth Burrows premium tutoring service - expert academic support',
	width: 1920,
	height: 1080,
	title: 'Contact Us - Premium Academic Support',
};

// Contact information
const CONTACT_INFO = {
	email: 'info@myprivatetutoronline.com',
	phone: '+44 7513 550278',
	whatsapp: '+44 7513 550278',
	whatsapp_api_format: '447513550278',
} as const;

export default function ContactPage() {
	return (
		<>
			{/* Hero Section - Outside PageLayout */}
			<section id='contact-hero'>
				<SimpleHero
					backgroundImage={CONTACT_HERO_IMAGE.src}
					h1="Contact"
					h1AccentText="Us"
					h2="Get in touch with Elizabeth's team for personalised tutoring solutions"
					decorativeStyle="none"
				/>
			</section>

			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'
				footerProps={{ showContactForm: false }}>

				{/* Introduction Section */}
				<section className='py-12 bg-white'>
					<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='max-w-4xl mx-auto text-center'>
							<h2 className='text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-4'>
								Book Your Free Consultation
							</h2>
							<p className='text-xl text-primary-700 mb-8'>
								Complete the form below and we'll be in touch within 24 hours to discuss
								your child's educational goals. Our expert team is here to help unlock
								their full academic potential.
							</p>
						</div>
					</div>
				</section>

				{/* Contact Form Section */}
				<section className='py-8 bg-gray-50'>
					<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
						<ContactForm
							onSubmitSuccess={(data) => {
								// Optional: Analytics tracking or additional success handling
								console.log('Form submitted successfully:', { name: data.name });
							}}
						/>
					</div>
				</section>

				{/* Contact Information & Business Hours */}
				<section className='py-16 bg-white'>
					<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='max-w-4xl mx-auto'>
							<div className='text-center mb-12'>
								<h2 className='text-2xl lg:text-3xl font-serif font-bold text-primary-900 mb-4'>
									Other Ways to Reach Us
								</h2>
								<p className='text-lg text-primary-700'>
									Prefer to get in touch directly? Here are alternative contact methods.
								</p>
							</div>

							<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
								{/* Contact Information */}
								<div className='bg-gray-50 rounded-lg p-8'>
									<h3 className='text-xl font-serif font-bold text-primary-900 mb-6'>
										Direct Contact
									</h3>
									<div className='space-y-4'>
										<div>
											<h4 className='font-semibold text-gray-900 mb-2'>Email</h4>
											<a
												href={`mailto:${CONTACT_INFO.email}`}
												className='text-primary-600 hover:text-primary-700 transition-colors'>
												{CONTACT_INFO.email}
											</a>
										</div>
										<div>
											<h4 className='font-semibold text-gray-900 mb-2'>Phone</h4>
											<a
												href={`tel:${CONTACT_INFO.phone}`}
												className='text-primary-600 hover:text-primary-700 transition-colors'>
												{CONTACT_INFO.phone}
											</a>
										</div>
										<div>
											<h4 className='font-semibold text-gray-900 mb-2'>WhatsApp</h4>
											<a
												href={`https://wa.me/${CONTACT_INFO.whatsapp_api_format}`}
												className='text-primary-600 hover:text-primary-700 transition-colors'>
												{CONTACT_INFO.whatsapp}
											</a>
										</div>
										<div>
											<h4 className='font-semibold text-gray-900 mb-2'>Follow Us</h4>
											<div className='flex items-center space-x-4 text-primary-600'>
												<a
													href='https://www.facebook.com/MyPrivateTutorOnline'
													target='_blank'
													rel='noopener noreferrer'
													className='hover:text-primary-700 transition-colors'
													aria-label='Follow us on Facebook'>
													<FaFacebook size={28} />
												</a>
												<a
													href='https://www.instagram.com/myprivatetutoronline'
													target='_blank'
													rel='noopener noreferrer'
													className='hover:text-primary-700 transition-colors'
													aria-label='Follow us on Instagram'>
													<FaInstagram size={28} />
												</a>
												<a
													href='https://www.linkedin.com/in/elizabeth-burrows-04a9baa7'
													target='_blank'
													rel='noopener noreferrer'
													className='hover:text-primary-700 transition-colors'
													aria-label='Connect on LinkedIn'>
													<FaLinkedin size={28} />
												</a>
											</div>
										</div>
									</div>
								</div>

								{/* Business Hours */}
								<div className='bg-gray-50 rounded-lg p-8'>
									<h3 className='text-xl font-serif font-bold text-primary-900 mb-6'>
										Business Hours
									</h3>
									<div className='space-y-3 mb-6'>
										<div className='flex justify-between'>
											<span className='text-gray-700'>Monday - Friday</span>
											<span className='font-semibold'>9:00 AM - 6:00 PM</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-gray-700'>Saturday - Sunday</span>
											<span className='font-semibold'>Email/Message Only</span>
										</div>
									</div>

									<div className='pt-6 border-t border-gray-200'>
										<h4 className='font-semibold text-gray-900 mb-3'>Response Time</h4>
										<p className='text-gray-700 text-sm leading-relaxed'>
											We typically respond to all enquiries within 24 hours during business
											days. For urgent matters, please call us directly during business hours.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</PageLayout>
		</>
	);
}