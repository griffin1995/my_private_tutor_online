'use client';

import { LegalPageTemplate } from '@/components/legal/legal-page-template';
import { getLegalPageMetadata } from '@/lib/legal/legal-content';
import { Card } from '@/components/ui/card';
import { FileText, Database, Users, CreditCard, Mail, UserCheck } from 'lucide-react';

export default function RecordOfProcessingPage() {
	const metadata = getLegalPageMetadata('record-of-processing')!;

	return (
		<LegalPageTemplate
			title={metadata.title}
			subtitle={metadata.subtitle}
			lastUpdated={metadata.lastUpdated}
			backgroundImage={metadata.backgroundImage}
			showCompliance={metadata.showCompliance ?? false}
			{...(metadata.complianceText && { complianceText: metadata.complianceText })}>
								<h2>Introduction</h2>
								<p>
									This document outlines the processing activities undertaken by My Private Tutor Online in accordance with Article 30 of the UK General Data Protection Regulation (UK GDPR). This record demonstrates our commitment to data protection compliance and transparency.
								</p>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose'>
									<div>
										<Card className='p-6 h-full bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'>
											<div className='flex items-center gap-3 mb-4'>
												<Users className='w-8 h-8 text-green-600' />
												<h3 className='text-xl font-serif font-bold text-green-800'>
													Student Educational Services
												</h3>
											</div>
											<p className='text-green-700 mb-4'>
												Processing student data for personalized tutoring and educational support.
											</p>
											<ul className='text-green-700 space-y-1 text-sm'>
												<li>• Academic records and progress tracking</li>
												<li>• Learning objectives and requirements</li>
												<li>• Retention: 7 years after last lesson</li>
												<li>• Legal Basis: Contract & Consent</li>
											</ul>
										</Card>
									</div>

									<div>
										<Card className='p-6 h-full bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200'>
											<div className='flex items-center gap-3 mb-4'>
												<CreditCard className='w-8 h-8 text-blue-600' />
												<h3 className='text-xl font-serif font-bold text-blue-800'>
													Financial Administration
												</h3>
											</div>
											<p className='text-blue-700 mb-4'>
												Processing payment and billing information for service delivery.
											</p>
											<ul className='text-blue-700 space-y-1 text-sm'>
												<li>• Payment processing and invoicing</li>
												<li>• Transaction records and history</li>
												<li>• Retention: 6 years (HMRC requirement)</li>
												<li>• Legal Basis: Contract & Legal Obligation</li>
											</ul>
										</Card>
									</div>

									<div>
										<Card className='p-6 h-full bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200'>
											<div className='flex items-center gap-3 mb-4'>
												<Mail className='w-8 h-8 text-purple-600' />
												<h3 className='text-xl font-serif font-bold text-purple-800'>
													Marketing & Communications
												</h3>
											</div>
											<p className='text-purple-700 mb-4'>
												Processing contact information for service communications and marketing.
											</p>
											<ul className='text-purple-700 space-y-1 text-sm'>
												<li>• Marketing communications</li>
												<li>• Service-related updates</li>
												<li>• Retention: Until consent withdrawn</li>
												<li>• Legal Basis: Consent & Legitimate Interests</li>
											</ul>
										</Card>
									</div>

									<div>
										<Card className='p-6 h-full bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200'>
											<div className='flex items-center gap-3 mb-4'>
												<UserCheck className='w-8 h-8 text-orange-600' />
												<h3 className='text-xl font-serif font-bold text-orange-800'>
													HR & Tutor Management
												</h3>
											</div>
											<p className='text-orange-700 mb-4'>
												Processing tutor information for recruitment, vetting, and management.
											</p>
											<ul className='text-orange-700 space-y-1 text-sm'>
												<li>• DBS checks and qualifications</li>
												<li>• Performance and employment records</li>
												<li>• Retention: 7 years after employment</li>
												<li>• Legal Basis: Contract & Legal Obligation</li>
											</ul>
										</Card>
									</div>
								</div>

								<hr className="my-8 border-gray-300" />

								<h2>Data Subject Rights</h2>
								<p>Under UK GDPR, data subjects have comprehensive rights regarding their personal data:</p>
								<ul>
									<li>Right to be informed about data processing</li>
									<li>Right of access to your personal data</li>
									<li>Right to rectification of inaccurate data</li>
									<li>Right to erasure in certain circumstances</li>
									<li>Right to restrict processing</li>
									<li>Right to data portability</li>
									<li>Right to object to processing</li>
									<li>Rights in relation to automated decision making</li>
								</ul>

								<div>
									<Card className='p-8 my-12 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-xl'>
										<div className='flex items-start gap-4'>
											<Database className='w-8 h-8 text-indigo-600 flex-shrink-0 mt-1' />
											<div>
												<h3 className='text-2xl font-serif font-bold text-indigo-800 mb-4'>
													Exercising Your Rights
												</h3>
												<div className='text-indigo-800 space-y-3'>
													<p className='text-lg'>To exercise any of your data protection rights, please contact us:</p>
													<div className='bg-white/50 p-4'>
														<p><strong>Email:</strong> info@myprivatetutoronline.com</p>
														<p><strong>Response Time:</strong> Within 1 month of receipt</p>
														<p><strong>Address:</strong> 17 Alexandra Gardens, London, N10 3RN</p>
													</div>
												</div>
											</div>
										</div>
									</Card>
								</div>

								<hr className="my-8 border-gray-300" />

								<h2>Security Measures</h2>
								<p>We implement comprehensive security measures across all processing activities:</p>
								<ul>
									<li><strong>Technical Measures:</strong> End-to-end encryption, secure cloud storage, access controls</li>
									<li><strong>Organisational Measures:</strong> Staff training, data protection policies, regular audits</li>
									<li><strong>Physical Measures:</strong> Secure facilities, restricted access, confidential handling</li>
									<li><strong>Procedural Measures:</strong> Data breach response, regular reviews, compliance monitoring</li>
								</ul>

								<hr className="my-8 border-gray-300" />

								<h2>Data Protection Impact Assessments</h2>
								<p>
									We conduct Data Protection Impact Assessments (DPIAs) for high-risk processing activities, particularly when processing children's personal data, special category data, or conducting large-scale processing operations.
								</p>

								<hr className="my-8 border-gray-300" />

								<h2>Regular Reviews</h2>
								<p>This Record of Processing Activities is reviewed:</p>
								<ul>
									<li><strong>Quarterly:</strong> For accuracy and completeness</li>
									<li><strong>Annually:</strong> For compliance with legal requirements</li>
									<li><strong>As needed:</strong> When processing activities change</li>
								</ul>

								<div>
									<Card className='p-8 my-12 bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200 shadow-xl'>
										<div className='flex items-start gap-4'>
											<FileText className='w-8 h-8 text-gray-600 flex-shrink-0 mt-1' />
											<div>
												<h3 className='text-2xl font-serif font-bold text-gray-800 mb-4'>
													Document Information
												</h3>
												<div className='text-gray-700 space-y-2'>
													<p><strong>Last Updated:</strong> December 2025</p>
													<p><strong>Next Review:</strong> March 2026</p>
													<p><strong>Document Controller:</strong> Data Protection Officer</p>
													<p><strong>Version:</strong> 1.0</p>
													<p><strong>Compliance:</strong> UK GDPR, Data Protection Act 2018, PECR</p>
												</div>
											</div>
										</div>
									</Card>
								</div>
		</LegalPageTemplate>
	);
}
