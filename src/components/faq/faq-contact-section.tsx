'use client';

import { m } from 'framer-motion';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { GradientOverlay } from '@/components/ui/gradient-overlay';
import { ShinyButton } from '@/components/magicui/shiny-button';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import type { UnifiedContactData } from '@/lib/cms/cms-content';
interface FAQContactSectionProps {
	contactContent: {
		readonly title: string;
		readonly description: string;
		readonly buttons: readonly {
			readonly text: string;
			readonly type: 'primary' | 'secondary';
			readonly href?: string;
			readonly action?: string;
		}[];
	};
	contactDetails: {
		readonly primaryEmail: string;
		readonly phone: string;
	};
}
export function FAQContactSection({
	contactContent,
	contactDetails,
}: FAQContactSectionProps) {
	return (
		<Section
			className='py-24 lg:py-32 relative'
			background='slate'>
			<GradientOverlay
				variant='primary'
				className='opacity-90'
			/>

			{}
			{}
			<div className='absolute top-0 left-0 w-full h-full'>
				<div className='absolute top-20 left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-20 right-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000' />
			</div>

			<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<m.div
					className='max-w-5xl mx-auto text-center'
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
					{}
					{}
					{}
					<h2 className='text-5xl lg:text-6xl font-serif font-bold text-white mb-10'>
						{contactContent.title}
					</h2>
					<p className='text-2xl text-white/90 mb-16 leading-relaxed max-w-3xl mx-auto'>
						{contactContent.description}
					</p>

					{}
					{}
					{}
					<m.div
						className='grid grid-cols-1 md:grid-cols-3 gap-10 mb-16'
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
							delay: 0.2,
						}}
						viewport={{
							once: true,
						}}>
						{}
						<div className='text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300'>
							<div className='w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl'>
								<Mail className='w-10 h-10 text-white' />
							</div>
							<h3 className='text-2xl font-bold text-white mb-3'>Email Elizabeth</h3>
							<p className='text-white/80 mb-6 text-lg'>
								Get a personal response within 24 hours
							</p>
							<a
								href={`mailto:${contactDetails.primaryEmail}`}
								className='text-amber-300 hover:text-amber-200 font-semibold transition-colors duration-200 text-lg'>
								{contactDetails.primaryEmail}
							</a>
						</div>

						{}
						<div className='text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300'>
							<div className='w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl'>
								<Phone className='w-10 h-10 text-white' />
							</div>
							<h3 className='text-2xl font-bold text-white mb-3'>Speak Directly</h3>
							<p className='text-white/80 mb-6 text-lg'>
								Schedule a consultation call
							</p>
							<a
								href={`tel:${contactDetails.phone}`}
								className='text-amber-300 hover:text-amber-200 font-semibold transition-colors duration-200 text-lg'>
								{contactDetails.phone}
							</a>
						</div>

						{}
						<div className='text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300'>
							<div className='w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl'>
								<MessageCircle className='w-10 h-10 text-white' />
							</div>
							<h3 className='text-2xl font-bold text-white mb-3'>Live Chat</h3>
							<p className='text-white/80 mb-6 text-lg'>
								Instant responses to quick questions
							</p>
							<span className='text-amber-300 font-semibold text-lg'>
								Available 9am-6pm
							</span>
						</div>
					</m.div>

					{}
					{}
					{}
					<m.div
						className='flex flex-col sm:flex-row gap-8 justify-center'
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
							delay: 0.4,
						}}
						viewport={{
							once: true,
						}}>
						{contactContent.buttons.map((button, index) => {
							if (button.type === 'primary') {
								return (
									<ShinyButton
										key={index}
										text={button.text}
										className='px-12 py-5 h-auto text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300'
									/>
								);
							} else {
								const emailHref =
									button.action === 'contactEmail' ?
										`mailto:${contactDetails.primaryEmail}`
									:	button.href;
								return (
									<InteractiveHoverButton
										key={index}
										text={button.text}
										className='px-12 py-5 border-3 border-white bg-transparent text-white hover:bg-white hover:text-slate-900 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300'
										onClick={() => emailHref && (window.location.href = emailHref)}
									/>
								);
							}
						})}
					</m.div>
				</m.div>
			</div>
		</Section>
	);
}
