'use client';

import { LegalPageTemplate } from '@/components/legal/legal-page-template';
import { getLegalPageMetadata } from '@/lib/legal/legal-content';
import { Card } from '@/components/ui/card';
import {
	Calendar,
	CreditCard,
	Clock,
	AlertTriangle,
	CheckCircle,
	Users,
	XCircle,
	RefreshCw,
	Phone,
	Mail,
	MapPin,
	Globe
} from 'lucide-react';

export default function BookingPolicyPage() {
	const metadata = getLegalPageMetadata('booking-policy')!;

	return (
		<LegalPageTemplate
			title={metadata.title}
			subtitle={metadata.subtitle}
			lastUpdated={metadata.lastUpdated}
			backgroundImage={metadata.backgroundImage}
			showCompliance={metadata.showCompliance ?? false}>

			{/* Contact Information Header */}
			<divdiv
				className='mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 shadow-lg'
				viewport={{ once: true }}>
				<h3 className='text-xl font-bold text-blue-800 mb-4'>My Private Tutor Online (MPTO)</h3>
				<div className='grid md:grid-cols-2 gap-4 text-blue-700'>
					<div className='space-y-2'>
						<p className='flex items-center gap-2'>
							<MapPin className='w-4 h-4' />
							17 Alexandra Gardens, London, United Kingdom, N10 3RN
						</p>
						<p className='flex items-center gap-2'>
							<Mail className='w-4 h-4' />
							info@myprivatetutoronline.com
						</p>
					</div>
					<div className='space-y-2'>
						<p className='flex items-center gap-2'>
							<Globe className='w-4 h-4' />
							www.myprivatetutoronline.com
						</p>
						<p className='flex items-center gap-2'>
							<Phone className='w-4 h-4' />
							(+44) 7513 550 278
						</p>
					</div>
				</div>
			</divdiv>

								{/* 1. Bookings */}
								<h2 className='flex items-center gap-3'>
									<Calendar className='w-8 h-8 text-blue-600' />
									1. Bookings
								</h2>
								<div className='bg-blue-50 p-6 border-l-4 border-blue-500 mb-8'>
									<p><strong>1.1</strong> Lessons must be booked in advance and are subject to tutor availability.</p>
									<p><strong>1.2</strong> MPTO reserves the right to allocate tutors based on subject needs, level, and scheduling.</p>
									<p><strong>1.3</strong> A lesson is considered confirmed once MPTO provides written confirmation (email or message).</p>
								</div>

								{/* 2. Payments */}
								<h2 className='flex items-center gap-3'>
									<CreditCard className='w-8 h-8 text-green-600' />
									2. Payments
								</h2>

								<h3>2.1 First Lesson Payment</h3>
								<p>Payment for the first lesson must be received no less than 3 days in advance.</p>

								<h3>2.2 Ongoing Balance Requirement</h3>
								<divdiv
									viewport={{ once: true }}>
									<Card className='p-8 my-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 shadow-xl'>
										<div className='flex items-start gap-4'>
											<CreditCard className='w-8 h-8 text-amber-600 flex-shrink-0 mt-1' />
											<div>
												<h4 className='text-xl font-bold text-amber-800 mb-3'>£300 Minimum Balance</h4>
												<p className='text-amber-800 mb-3'>
													Following the first lesson, Clients must maintain a minimum positive account balance of £300 as standard. This balance serves as credit on the account and will be deducted from the final invoice when tuition ends.
												</p>
												<p className='text-amber-800'>
													MPTO may adjust this required balance depending on the volume, intensity, or frequency of lessons booked. Where a different credit amount is required, MPTO will notify the Client in writing.
												</p>
											</div>
										</div>
									</Card>
								</divdiv>

								<h3>2.3 Monthly Billing</h3>
								<p>Following the first prepaid session, tuition is billed monthly in arrears, with payment due immediately upon receipt of the invoice.</p>

								<h3>2.4 Late Payments</h3>
								<div className='bg-red-50 p-6 border-l-4 border-red-500 mb-6'>
									<p className='font-semibold text-red-800 mb-2'>Late Payment Charges:</p>
									<ul className='text-red-700'>
										<li>Invoices not paid within 3 business days of issue will incur daily interest at 1.5% per day.</li>
										<li>MPTO reserves the right to suspend tuition until full payment (including interest) is received.</li>
									</ul>
								</div>

								<h3>2.5 Payment Method</h3>
								<p>All payments must be made by bank transfer to MPTO. The Client is responsible for all bank transfer charges or international payment fees.</p>

								<h3>2.7 Invoice Disputes</h3>
								<p>Any disputes regarding invoices must be submitted in writing within 3 days of the invoice date. If not raised within this period, the invoice will be deemed accepted.</p>

								<h3>2.8 Debt Recovery</h3>
								<p>In the event of non-payment, MPTO will pass the matter to Creditreform for recovery. Creditreform may add additional charges to recover outstanding fees.</p>

								{/* 3. Lessons & Attendance */}
								<h2 className='flex items-center gap-3'>
									<Users className='w-8 h-8 text-purple-600' />
									3. Lessons & Attendance
								</h2>

								<h3>3.1 Punctuality</h3>
								<p>Tutees must arrive on time and prepared. Tutors are not required to extend the lesson if the tutee is late.</p>

								<h3>3.2 Tutor Waiting Time</h3>
								<divdiv
									viewport={{ once: true }}>
									<Card className='p-8 my-6 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 shadow-xl'>
										<div className='flex items-start gap-4'>
											<Clock className='w-8 h-8 text-orange-600 flex-shrink-0 mt-1' />
											<div>
												<h4 className='text-xl font-bold text-orange-800 mb-3'>15-Minute Wait Policy</h4>
												<p className='text-orange-800'>
													Tutors will wait a maximum of 15 minutes. After this time, the session is deemed missed and is charged in full.
												</p>
											</div>
										</div>
									</Card>
								</divdiv>

								<h3>3.3 Technical Requirements</h3>
								<p>Clients are responsible for ensuring suitable IT equipment, software, and a stable internet connection. MPTO is not liable for lessons affected by technical issues on the Client's side.</p>

								{/* 4. Cancellations & Rescheduling */}
								<h2 className='flex items-center gap-3'>
									<XCircle className='w-8 h-8 text-red-600' />
									4. Cancellations & Rescheduling
								</h2>

								<h3>4.1 Standard Cancellation Rule</h3>
								<div className='bg-red-50 p-6 border-l-4 border-red-500 mb-6'>
									<p className='font-semibold text-red-800'>Lessons cancelled/missed with less than 24 hours' notice are charged in full.</p>
								</div>

								<h3>4.2 Rescheduling</h3>
								<p>Lessons rescheduled with less than 24 hours' notice are treated as cancellations and charged in full.</p>

								<h3>4.3 Shortening a Session</h3>
								<p>If the Client reduces the duration of a booked session with less than 24 hours' notice, the full originally booked duration will be charged.</p>

								<h3>4.4 Cancellations by MPTO</h3>
								<div className='bg-green-50 p-6 border-l-4 border-green-500 mb-6'>
									<p className='text-green-800'>If MPTO or the tutor cancels a lesson, no fee will be charged, and reasonable efforts will be made to reschedule.</p>
								</div>

								<h3>4.5 Block Bookings (8+ hours)</h3>
								<p>For block bookings of 8 or more hours during a half-term or school holiday:</p>
								<ul>
									<li>The Client must give at least 7 days' notice to cancel 50% or more of the hours.</li>
									<li>If insufficient notice is given, the full booking will be charged.</li>
								</ul>

								<h3>4.6 Goodwill Illness Clause</h3>
								<divdiv
									viewport={{ once: true }}>
									<Card className='p-8 my-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-xl'>
										<div className='flex items-start gap-4'>
											<CheckCircle className='w-8 h-8 text-blue-600 flex-shrink-0 mt-1' />
											<div>
												<h4 className='text-xl font-bold text-blue-800 mb-3'>Illness Exception</h4>
												<p className='text-blue-800'>
													At MPTO's discretion—and depending on tutor availability—lessons cancelled at short notice due to verified illness may be rescheduled without charge.
												</p>
											</div>
										</div>
									</Card>
								</divdiv>

								{/* 5. Termination of Tuition */}
								<h2 className='flex items-center gap-3'>
									<AlertTriangle className='w-8 h-8 text-yellow-600' />
									5. Termination of Tuition
								</h2>

								<p><strong>5.1</strong> Clients wishing to discontinue regular tuition must provide three (3) weeks' written notice.</p>
								<p><strong>5.2</strong> At least two further lessons will be chargeable after notice is given, unless otherwise agreed in writing.</p>
								<p><strong>5.3</strong> This termination policy applies after the first lesson, once the Client confirms they are happy to proceed with ongoing tuition.</p>

								<h3>5.4 Immediate Termination by MPTO</h3>
								<p>MPTO may terminate tuition immediately if the Client or Tutee:</p>
								<ul>
									<li>Breaches these terms</li>
									<li>Acts abusively, aggressively or inappropriately</li>
									<li>Engages in discriminatory behaviour</li>
									<li>Fails to pay fees</li>
									<li>Behaves in a way that damages MPTO's reputation</li>
								</ul>

								{/* 6. Refunds */}
								<h2 className='flex items-center gap-3'>
									<RefreshCw className='w-8 h-8 text-indigo-600' />
									6. Refunds
								</h2>

								<div className='bg-gray-50 p-6 border-l-4 border-gray-400 mb-6'>
									<p><strong>6.1</strong> Refunds are not offered for lessons cancelled with less than 24 hours' notice.</p>
									<p><strong>6.2</strong> Refunds are also not issued for block bookings where insufficient notice is provided (see Clause 4.5).</p>
									<p><strong>6.3</strong> Where MPTO cancels a prepaid lesson and rescheduling is not possible, the Client may request a refund or credit.</p>
									<p><strong>6.4</strong> Refunds, where applicable, will be returned to the original payment method within 10 business days.</p>
									<p><strong>6.5</strong> The £300 balance requirement (Clause 2.2) will be applied to the final invoice before any refund is calculated.</p>
								</div>

								{/* Contact Section */}
								<h2>7. Contact</h2>
								<p>For all matters relating to billing, cancellations, or bookings:</p>

								<divdiv
									viewport={{ once: true }}>
									<Card className='p-8 my-12 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-xl'>
										<div className='flex items-start gap-4'>
											<CheckCircle className='w-8 h-8 text-green-600 flex-shrink-0 mt-1' />
											<div>
												<h3 className='text-2xl font-serif font-bold text-green-800 mb-4'>
													Contact MPTO
												</h3>
												<div className='text-green-800 space-y-3'>
													<p className='flex items-center gap-2'>
														<Mail className='w-5 h-5 text-green-600' />
														<span>Email: info@myprivatetutoronline.com</span>
													</p>
													<p className='flex items-center gap-2'>
														<MapPin className='w-5 h-5 text-green-600' />
														<span>Address: 17 Alexandra Gardens, London, United Kingdom, N10 3RN</span>
													</p>
													<p className='flex items-center gap-2'>
														<Phone className='w-5 h-5 text-green-600' />
														<span>Tel: (+44) 7513 550 278</span>
													</p>
													<p className='flex items-center gap-2'>
														<Globe className='w-5 h-5 text-green-600' />
														<span>Website: www.myprivatetutoronline.com</span>
													</p>
												</div>
											</div>
										</div>
									</Card>
								</divdiv>

		</LegalPageTemplate>
	);
}