'use client';

import { PageFooter } from '@/components/layout/page-footer';
import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { Card } from '@/components/ui/card';
import { m } from 'framer-motion';
import { AlertTriangle, Eye, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
export default function CookiePolicyPage() {
	return (
		<>
			<SimpleHero
				backgroundImage='/images/hero/cookie-policy.jpg'
				h1={<span className='text-white'>Cookie Policy</span>}
				h2='How we use cookies and similar technologies to improve your website experience'
			/>

			<PageLayout
				background='white'
				showHeader={true}
				showFooter={false}
				containerSize='full'>
				<section className='py-20 relative'>
					<div className='absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-50' />
					<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
						<div className='max-w-5xl mx-auto'>
							<m.div
								className='mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 shadow-lg'
								initial={{
									opacity: 0,
									x: -20,
								}}
								whileInView={{
									opacity: 1,
									x: 0,
								}}
								transition={{
									duration: 0.6,
								}}
								viewport={{
									once: true,
								}}>
								<div className='flex items-center gap-4 mb-4'>
									<FileText className='w-6 h-6 text-blue-600' />
									<p className='text-lg text-blue-800 font-bold'>
										Last Updated: 4 August 2025
									</p>
								</div>
								<p className='text-blue-700'>
									This cookie policy complies with UK Privacy and Electronic
									Communications Regulations (PECR), EU ePrivacy Directive, and GDPR
									requirements.
								</p>
							</m.div>

							<div className='prose prose-lg prose-slate max-w-none'>
								<h2>1. What Are Cookies?</h2>
								<p>
									Cookies are small text files that are stored on your device when you
									visit our website. They help us provide you with a better browsing
									experience by remembering your preferences and enabling certain website
									functionalities.
								</p>

								<m.div
									initial={{
										opacity: 0,
										y: 20,
									}}
									whileInView={{
										opacity: 1,
										y: 0,
									}}
									transition={{
										duration: 0.6,
									}}
									viewport={{
										once: true,
									}}>
									<Card className='p-8 my-12 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-xl '>
										<div className='flex items-start gap-4'>
											<Settings className='w-8 h-8 text-green-600 flex-shrink-0 mt-1' />
											<div>
												<h3 className='text-2xl font-serif font-bold text-green-800 mb-4'>
													Your Control
												</h3>
												<p className='text-green-800 text-lg leading-relaxed'>
													You have full control over non-essential cookies. You can manage
													your preferences using our cookie consent banner or through your
													browser settings. Essential cookies cannot be disabled as they are
													necessary for basic website functionality.
												</p>
											</div>
										</div>
									</Card>
								</m.div>

								<h2>2. Types of Cookies We Use</h2>

								<h3>2.1 Essential Cookies (Always Active)</h3>
								<p>
									These cookies are strictly necessary for the website to function and
									cannot be switched off.
								</p>

								<div className='bg-gray-50 p-6  my-6'>
									<h4 className='font-semibold mb-3'>Essential Cookie Details:</h4>
									<div className='space-y-4 text-sm'>
										<div>
											<strong>Session Management:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: PHPSESSID, __session</li>
												<li>• Purpose: Maintain user session and security</li>
												<li>• Duration: Session only</li>
												<li>• Provider: My Private Tutor Online</li>
											</ul>
										</div>
										<div>
											<strong>Security Cookies:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: __csrf_token, __security</li>
												<li>• Purpose: Prevent cross-site request forgery</li>
												<li>• Duration: Session only</li>
												<li>• Provider: My Private Tutor Online</li>
											</ul>
										</div>
										<div>
											<strong>Cookie Consent:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: cookie_consent</li>
												<li>• Purpose: Remember your cookie preferences</li>
												<li>• Duration: 12 months</li>
												<li>• Provider: My Private Tutor Online</li>
											</ul>
										</div>
									</div>
								</div>

								<h3>2.2 Functional Cookies (Optional)</h3>
								<p>
									These cookies enable enhanced functionality and personalisation
									features.
								</p>

								<div className='bg-blue-50 p-6  my-6'>
									<h4 className='font-semibold mb-3'>Functional Cookie Details:</h4>
									<div className='space-y-4 text-sm'>
										<div>
											<strong>Preference Storage:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: user_preferences</li>
												<li>
													• Purpose: Remember language, theme, and display preferences
												</li>
												<li>• Duration: 12 months</li>
												<li>• Provider: My Private Tutor Online</li>
											</ul>
										</div>
										<div>
											<strong>Form Data:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: form_data</li>
												<li>• Purpose: Save partially completed forms</li>
												<li>• Duration: 24 hours</li>
												<li>• Provider: My Private Tutor Online</li>
											</ul>
										</div>
										<div>
											<strong>Chat Support:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: intercom-*</li>
												<li>• Purpose: Enable live chat functionality</li>
												<li>• Duration: 9 months</li>
												<li>• Provider: Intercom</li>
											</ul>
										</div>
									</div>
								</div>

								<h3>2.3 Analytics Cookies (Optional)</h3>
								<p>
									These cookies help us understand how visitors use our website so we can
									improve it.
								</p>

								<div className='bg-purple-50 p-6  my-6'>
									<h4 className='font-semibold mb-3'>Analytics Cookie Details:</h4>
									<div className='space-y-4 text-sm'>
										<div>
											<strong>Google Analytics:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: _ga, _ga_*, _gid</li>
												<li>• Purpose: Understand website usage and performance</li>
												<li>• Duration: 2 years (_ga), 24 hours (_gid)</li>
												<li>• Provider: Google LLC</li>
												<li>• Privacy: IP addresses anonymised</li>
											</ul>
										</div>
										<div>
											<strong>Hotjar Analytics:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: _hjid, _hjFirstSeen</li>
												<li>• Purpose: User experience and heatmap analysis</li>
												<li>• Duration: 12 months</li>
												<li>• Provider: Hotjar Ltd</li>
											</ul>
										</div>
										<div>
											<strong>Website Performance:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: performance_metrics</li>
												<li>• Purpose: Monitor page load times and performance</li>
												<li>• Duration: 7 days</li>
												<li>• Provider: My Private Tutor Online</li>
											</ul>
										</div>
									</div>
								</div>

								<h3>2.4 Marketing Cookies (Optional)</h3>
								<p>
									These cookies track your visits across websites to show relevant
									advertisements.
								</p>

								<div className='bg-[#CA9E5B]/10 p-6  my-6'>
									<h4 className='font-semibold mb-3'>Marketing Cookie Details:</h4>
									<div className='space-y-4 text-sm'>
										<div>
											<strong>Google Ads:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: _gcl_au, _gcl_dc</li>
												<li>• Purpose: Measure ad effectiveness and show relevant ads</li>
												<li>• Duration: 3 months</li>
												<li>• Provider: Google LLC</li>
											</ul>
										</div>
										<div>
											<strong>Facebook Pixel:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: _fbp, _fbc</li>
												<li>• Purpose: Track conversions and show relevant ads</li>
												<li>• Duration: 3 months</li>
												<li>• Provider: Meta Platforms Inc</li>
											</ul>
										</div>
										<div>
											<strong>LinkedIn Insight:</strong>
											<ul className='mt-1 ml-4 space-y-1'>
												<li>• Cookie Name: li_sugr, UserMatchHistory</li>
												<li>• Purpose: B2B advertising and professional targeting</li>
												<li>• Duration: 30 days</li>
												<li>• Provider: LinkedIn Corporation</li>
											</ul>
										</div>
									</div>
								</div>

								<h2>3. Third-Party Cookies</h2>

								<p>
									Some cookies are set by third-party services that appear on our pages.
									We do not control these cookies, and you should check the relevant
									third party&apos;s website for more information.
								</p>

								<h3>3.1 Video Platforms</h3>
								<ul>
									<li>
										<strong>YouTube:</strong> Video embedding and analytics
									</li>
									<li>
										<strong>Vimeo:</strong> Video hosting and playback
									</li>
									<li>
										<strong>Zoom:</strong> Online tutoring session integration
									</li>
								</ul>

								<h3>3.2 Social Media</h3>
								<ul>
									<li>
										<strong>Facebook:</strong> Social sharing and advertising
									</li>
									<li>
										<strong>Twitter:</strong> Social sharing and engagement
									</li>
									<li>
										<strong>LinkedIn:</strong> Professional networking and B2B marketing
									</li>
									<li>
										<strong>Instagram:</strong> Visual content and engagement
									</li>
								</ul>

								<h3>3.3 Payment and Security</h3>
								<ul>
									<li>
										<strong>Stripe:</strong> Secure payment processing
									</li>
									<li>
										<strong>PayPal:</strong> Alternative payment method
									</li>
									<li>
										<strong>reCAPTCHA:</strong> Bot protection and security
									</li>
								</ul>

								<h2>4. Cookie Consent Management</h2>

								<m.div
									initial={{
										opacity: 0,
										y: 20,
									}}
									whileInView={{
										opacity: 1,
										y: 0,
									}}
									transition={{
										duration: 0.6,
									}}
									viewport={{
										once: true,
									}}>
									<Card className='p-8 my-12 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xl '>
										<div className='flex items-start gap-4'>
											<Eye className='w-8 h-8 text-blue-600 flex-shrink-0 mt-1' />
											<div>
												<h3 className='text-2xl font-serif font-bold text-blue-800 mb-4'>
													Managing Your Preferences
												</h3>
												<p className='text-blue-800 text-lg mb-6 leading-relaxed'>
													You can update your cookie preferences at any time using the
													options below:
												</p>
												<div className='space-y-4'>
													<button className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3  font-semibold shadow-lg hover:shadow-xl transition-all duration-300'>
														Update Cookie Preferences
													</button>
													<p className='text-blue-700 text-lg'>
														Click here to modify your cookie settings
													</p>
												</div>
											</div>
										</div>
									</Card>
								</m.div>

								<h3>4.1 Consent Options</h3>
								<ul>
									<li>
										<strong>Accept All:</strong> Allow all cookies for full website
										functionality
									</li>
									<li>
										<strong>Essential Only:</strong> Only necessary cookies for basic
										functionality
									</li>
									<li>
										<strong>Custom Settings:</strong> Choose specific cookie categories
									</li>
									<li>
										<strong>Reject All:</strong> Decline non-essential cookies
									</li>
								</ul>

								<h3>4.2 Browser Controls</h3>
								<p>You can also control cookies through your browser settings:</p>
								<ul>
									<li>
										<strong>Chrome:</strong> Settings → Privacy and Security → Cookies
									</li>
									<li>
										<strong>Firefox:</strong> Options → Privacy & Security → Cookies
									</li>
									<li>
										<strong>Safari:</strong> Preferences → Privacy → Cookies
									</li>
									<li>
										<strong>Edge:</strong> Settings → Privacy → Cookies
									</li>
								</ul>

								<h2>5. Cookie Duration and Storage</h2>

								<h3>5.1 Session Cookies</h3>
								<ul>
									<li>Deleted when you close your browser</li>
									<li>Used for essential website functionality</li>
									<li>Cannot be disabled for core features</li>
								</ul>

								<h3>5.2 Persistent Cookies</h3>
								<ul>
									<li>Remain on your device for a set period</li>
									<li>Used for preferences and analytics</li>
									<li>Can be managed through consent settings</li>
								</ul>

								<div className='bg-gray-50 p-6  my-6'>
									<h3 className='font-semibold mb-2'>Cookie Lifetime Summary:</h3>
									<ul className='space-y-1 text-sm'>
										<li>
											<strong>Essential cookies:</strong> Session to 12 months
										</li>
										<li>
											<strong>Functional cookies:</strong> 24 hours to 12 months
										</li>
										<li>
											<strong>Analytics cookies:</strong> 24 hours to 2 years
										</li>
										<li>
											<strong>Marketing cookies:</strong> 30 days to 3 months
										</li>
									</ul>
								</div>

								<h2>6. Data Processing and Privacy</h2>

								<h3>6.1 Personal Data in Cookies</h3>
								<p>
									Some cookies may contain personal data. This is processed in accordance
									with our{' '}
									<Link
										href='/legal/privacy-policy'
										className='text-blue-600 hover:underline'>
										Privacy Policy
									</Link>{' '}
									and applicable data protection laws.
								</p>

								<h3>6.2 International Transfers</h3>
								<p>
									Some third-party cookies may transfer data outside the UK/EEA. We
									ensure adequate protection through:
								</p>
								<ul>
									<li>Adequacy decisions by the European Commission</li>
									<li>Standard Contractual Clauses (SCCs)</li>
									<li>Privacy frameworks and certifications</li>
									<li>Binding corporate rules</li>
								</ul>

								<h2>7. Cookie Security</h2>

								<h3>7.1 Security Measures</h3>
								<ul>
									<li>All cookies transmitted over HTTPS</li>
									<li>Secure and HttpOnly flags where appropriate</li>
									<li>Regular security audits and updates</li>
									<li>SameSite attributes for CSRF protection</li>
								</ul>

								<h3>7.2 Data Minimisation</h3>
								<ul>
									<li>Only collect necessary cookie data</li>
									<li>Regular review and deletion of unused cookies</li>
									<li>Anonymisation of analytics data where possible</li>
									<li>Clear retention policies for all cookie types</li>
								</ul>

								<h2>8. Impact of Disabling Cookies</h2>

								<m.div
									initial={{
										opacity: 0,
										y: 20,
									}}
									whileInView={{
										opacity: 1,
										y: 0,
									}}
									transition={{
										duration: 0.6,
									}}
									viewport={{
										once: true,
									}}>
									<Card className='p-8 my-12 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 shadow-xl '>
										<div className='flex items-start gap-4'>
											<AlertTriangle className='w-8 h-8 text-yellow-600 flex-shrink-0 mt-1' />
											<div>
												<h3 className='text-2xl font-serif font-bold text-yellow-800 mb-4'>
													Functionality Impact
												</h3>
												<p className='text-yellow-800 text-lg leading-relaxed'>
													Disabling certain cookies may affect your website experience:
												</p>
											</div>
										</div>
									</Card>
								</m.div>

								<h3>8.1 Essential Cookies Disabled</h3>
								<ul>
									<li>Website may not function properly</li>
									<li>Login and session management issues</li>
									<li>Security vulnerabilities may arise</li>
									<li>Form submissions may fail</li>
								</ul>

								<h3>8.2 Functional Cookies Disabled</h3>
								<ul>
									<li>Preferences not remembered</li>
									<li>Limited personalisation features</li>
									<li>Chat support may not work</li>
									<li>Forms reset between pages</li>
								</ul>

								<h3>8.3 Analytics Cookies Disabled</h3>
								<ul>
									<li>No impact on functionality</li>
									<li>Less personalised experience</li>
									<li>Cannot track user journey improvements</li>
									<li>Limited website optimisation data</li>
								</ul>

								<h2>9. Children&apos;s Privacy</h2>

								<p>
									As an educational service provider, we take special care with
									children&apos;s data:
								</p>
								<ul>
									<li>Age-appropriate consent mechanisms</li>
									<li>Parental controls for children under 13</li>
									<li>Enhanced privacy protection for young users</li>
									<li>Limited data collection from minors</li>
									<li>Regular review of children&apos;s data practices</li>
								</ul>

								<h2>10. Updates to This Policy</h2>

								<p>
									We may update this Cookie Policy to reflect changes in technology,
									legislation, or our practices. We will notify you of significant
									changes through:
								</p>
								<ul>
									<li>Updated consent banner on website</li>
									<li>Email notification to registered users</li>
									<li>Prominent notice on our website</li>
									<li>Social media announcements</li>
								</ul>

								<h2>11. Legal Basis for Cookie Processing</h2>

								<h3>11.1 GDPR Compliance</h3>
								<ul>
									<li>
										<strong>Essential cookies:</strong> Legitimate interest (website
										functionality)
									</li>
									<li>
										<strong>Functional cookies:</strong> Consent
									</li>
									<li>
										<strong>Analytics cookies:</strong> Consent
									</li>
									<li>
										<strong>Marketing cookies:</strong> Consent
									</li>
								</ul>

								<h3>11.2 PECR Compliance</h3>
								<ul>
									<li>Clear information about cookie purposes</li>
									<li>Genuine choice and control for users</li>
									<li>Granular consent for different cookie types</li>
									<li>Easy withdrawal of consent</li>
								</ul>

								<h2>12. Contact Information</h2>

								<p>
									If you have questions about our use of cookies or this policy, please
									contact:
								</p>

								<div className='bg-slate-100 p-6  my-6'>
									<h3 className='font-semibold mb-2'>Data Protection Team:</h3>
									<ul className='space-y-1 text-sm'>
										<li>
											<strong>Email:</strong> privacy@myprivatetutoronline.co.uk
										</li>
										<li>
											<strong>Subject:</strong> Cookie Policy Enquiry
										</li>
										<li>
											<strong>Phone:</strong> [Phone Number]
										</li>
										<li>
											<strong>Address:</strong> Data Protection Officer, My Private Tutor
											Online Limited, [Address]
										</li>
										<li>
											<strong>Response Time:</strong> Within 72 hours
										</li>
									</ul>
								</div>

								<h2>13. Useful Resources</h2>

								<ul>
									<li>
										<strong>ICO Cookie Guidance:</strong>{' '}
										<a
											href='https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/'
											className='text-blue-600 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											ico.org.uk
										</a>
									</li>
									<li>
										<strong>All About Cookies:</strong>{' '}
										<a
											href='https://www.allaboutcookies.org/'
											className='text-blue-600 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											allaboutcookies.org
										</a>
									</li>
									<li>
										<strong>Your Online Choices:</strong>{' '}
										<a
											href='https://www.youronlinechoices.com/'
											className='text-blue-600 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											youronlinechoices.com
										</a>
									</li>
									<li>
										<strong>Google Privacy Controls:</strong>{' '}
										<a
											href='https://myaccount.google.com/data-and-privacy'
											className='text-blue-600 hover:underline'
											target='_blank'
											rel='noopener noreferrer'>
											myaccount.google.com
										</a>
									</li>
								</ul>

								<div className='border-t pt-8 mt-12 text-sm text-gray-600'>
									<p>
										<em>
											This is a template for informational purposes. Consult with a
											qualified attorney for legal advice specific to your situation.
										</em>
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</PageLayout>

			<PageFooter
				variant='premium'
				showBackToTop={true}
				showNewsletter={false}
				showContactForm={false}
			/>
		</>
	);
}
