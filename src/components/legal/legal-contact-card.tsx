'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle, Mail, MapPin, Phone, Globe } from 'lucide-react';

interface ContactInfo {
	email: string;
	address: string;
	phone?: string;
	website?: string;
}

interface LegalContactCardProps {
	title?: string;
	contactInfo: ContactInfo;
	className?: string;
}

/**
 * Standardised contact card component for legal pages
 * Following design system patterns with consistent animations
 */
export function LegalContactCard({
	title = 'Contact Information',
	contactInfo,
	className = ''
}: LegalContactCardProps) {
	return (
		<divdiv
			viewport={{ once: true }}>
			<Card className={`p-8 my-12 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-xl ${className}`}>
				<div className='flex items-start gap-4'>
					<CheckCircle className='w-8 h-8 text-green-600 flex-shrink-0 mt-1' />
					<div>
						<h3 className='text-2xl font-serif font-bold text-green-800 mb-4'>
							{title}
						</h3>
						<div className='text-green-800 space-y-3'>
							<p className='flex items-center gap-2'>
								<Mail className='w-5 h-5 text-green-600' />
								<span>Email: {contactInfo.email}</span>
							</p>
							<p className='flex items-center gap-2'>
								<MapPin className='w-5 h-5 text-green-600' />
								<span>Address: {contactInfo.address}</span>
							</p>
							{contactInfo.phone && (
								<p className='flex items-center gap-2'>
									<Phone className='w-5 h-5 text-green-600' />
									<span>Tel: {contactInfo.phone}</span>
								</p>
							)}
							{contactInfo.website && (
								<p className='flex items-center gap-2'>
									<Globe className='w-5 h-5 text-green-600' />
									<span>Website: {contactInfo.website}</span>
								</p>
							)}
						</div>
					</div>
				</div>
			</Card>
		</divdiv>
	);
}