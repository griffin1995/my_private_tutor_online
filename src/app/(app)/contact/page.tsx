'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR CONTACT PAGE
// ============================================================================

// Hero image for Contact page
const CONTACT_HERO_IMAGE = {
	src: '/images/hero/contact-us-hero.jpg',
	alt: 'Contact Elizabeth Burrows premium tutoring service - expert academic support',
	width: 1920,
	height: 1080,
	title: 'Contact Us - Premium Academic Support',
};

// Contact content from landing page
const CONTACT_CONTENT = {
	sectionTitle: 'Begin Your Academic Journey',
	sectionDescription:
		"Ready to unlock your child's potential? Contact us today for a free consultation and discover how we can help achieve academic excellence.",
	formTitle: 'Book Your Free Consultation',
	formDescription:
		"Complete the form below and we'll be in touch within 24 hours to discuss your child's educational goals.",
	submitButtonText: 'Book Free Consultation',
	contactInfo: {
		email: 'info@myprivatetutoronline.com',
		phone: '+44 7513 550278',
		whatsapp: '+44 7513 550278',
		whatsapp_api_format: '447513550278',
		enquire_tagline: 'Ready to Start the Conversation?',
	},
} as const;

// Unified contact data combining settings, landing page, and FAQ data
// Note: Currently unused but kept for potential future integrations
// const UNIFIED_CONTACT = {
// 	primary: {
// 		primaryEmail: 'info@myprivatetutoronline.com',
// 		phone: '+44 7513 550278',
// 		address: {
// 			line1: '123 Education House',
// 			line2: 'Kensington',
// 			city: 'London',
// 			postcode: 'SW7 2AZ',
// 			country: 'United Kingdom',
// 		},
// 		socialMedia: {
// 			twitter: '@MyPrivateTutorUK',
// 			linkedin: 'my-private-tutor-online',
// 			facebook: 'MyPrivateTutorOnline',
// 		},
// 	},
// 	landing: CONTACT_CONTENT,
// 	landingInfo: CONTACT_CONTENT.contactInfo,
// 	faq: {
// 		title: 'Still Have Questions?',
// 		description:
// 			'Our team is always happy to help. Get in touch to discuss your specific needs or schedule a consultation with Elizabeth.',
// 		buttons: [
// 			{
// 				text: 'Schedule Consultation',
// 				type: 'primary' as const,
// 				href: '/consultation',
// 			},
// 			{
// 				text: 'Email Our Team',
// 				type: 'secondary' as const,
// 				action: 'contactEmail',
// 			},
// 		],
// 	},
// 	quoteForm: {
// 		title: 'Request Your Personalised Quote',
// 		description: "Begin Your Child's Academic Excellence Journey",
// 		phone: '+44 7513 550278',
// 		email: 'info@myprivatetutoronline.com',
// 	},
// } as const;

export default function ContactPage() {
	const contactContent = CONTACT_CONTENT;
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
		<>
			{/* Hero Section - Outside PageLayout */}
			<section id='contact-hero'>
				<SimpleHero
					backgroundImage={CONTACT_HERO_IMAGE.src}
					h1={
						<span className='text-white'>
							Contact <span className='text-accent-600'>Us</span>
						</span>
					}
					h2="Get in touch with Elizabeth's team for personalised tutoring solutions"
					decorativeStyle='none'
				/>
			</section>

			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'
				footerProps={{ showContactForm: false }}>
				{/* Contact Details Section */}
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
								{/* Contact Information */}
								<div className='bg-white rounded-lg p-8 shadow-lg'>
									<h3 className='text-2xl font-serif font-bold text-primary-900 mb-6'>
										Get in Touch
									</h3>
									<div className='space-y-4'>
										<div>
											<h4 className='font-semibold text-gray-900 mb-2'>Email</h4>
											<a
												href={`mailto:${contactContent.contactInfo.email}`}
												className='text-primary-600 hover:text-primary-700 transition-colors'>
												{contactContent.contactInfo.email}
											</a>
										</div>
										<div>
											<h4 className='font-semibold text-gray-900 mb-2'>Phone</h4>
											<a
												href={`tel:${contactContent.contactInfo.phone}`}
												className='text-primary-600 hover:text-primary-700 transition-colors'>
												{contactContent.contactInfo.phone}
											</a>
										</div>
										<div>
											<h4 className='font-semibold text-gray-900 mb-2'>WhatsApp</h4>
											<a
												href={`https://wa.me/${contactContent.contactInfo.whatsapp_api_format}`}
												className='text-primary-600 hover:text-primary-700 transition-colors'>
												{contactContent.contactInfo.whatsapp}
											</a>
										</div>
										{contactContent.contactInfo.enquire_tagline && (
											<div>
												<h4 className='font-semibold text-gray-900 mb-2'>Enquire</h4>
												<Link
													className='text-primary-600 hover:text-primary-700 transition-colors underline'
													href='https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~'>
													{contactContent.contactInfo.enquire_tagline}
												</Link>
											</div>
										)}
										<div>
											<h4 className='font-semibold text-gray-900 mb-2'>Socials</h4>
											<div className='flex items-center space-x-4 text-primary-600'>
												<a
													href='https://www.facebook.com/MyPrivateTutorOnline'
													target='_blank'
													rel='noopener noreferrer'
													className='hover:text-primary-700 transition-colors flex items-center space-x-1'>
													<FaFacebook size={32} />
												</a>

												<a
													href='https://www.instagram.com/myprivatetutoronline'
													target='_blank'
													rel='noopener noreferrer'
													className='hover:text-primary-700 transition-colors flex items-center space-x-1'>
													<FaInstagram size={32} />
												</a>

												<a
													href='https://www.linkedin.com/in/elizabeth-burrows-04a9baa7'
													target='_blank'
													rel='noopener noreferrer'
													className='hover:text-primary-700 transition-colors flex items-center space-x-1'>
													<FaLinkedin size={32} />
												</a>
											</div>
										</div>
									</div>
								</div>

								{/* Business Hours */}
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
											<span className='text-gray-700'>Saturday - Sunday</span>
											<span className='font-semibold'>Please Email/Message Only</span>
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
			</PageLayout>
		</>
	);
}
