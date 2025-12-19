'use client';

import React, { useState, useEffect } from 'react';
import { Info, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeadingText, BodyText, CaptionText } from '@/components/ui/typography';
interface GDPRConsentProps {
	onConsentChange: (consent: ConsentState) => void;
	required?: boolean;
	className?: string;
	compact?: boolean;
}
export interface ConsentState {
	marketing: boolean;
	analytics: boolean;
	necessary: boolean;
	timestamp: string;
	ipAddress?: string;
	version: string;
}
interface ConsentRecord {
	id: string;
	timestamp: string;
	consent: ConsentState;
	action: 'granted' | 'withdrawn' | 'updated';
	lawfulBasis: string;
}
export const FooterGDPRConsent = React.memo<GDPRConsentProps>(
	({ onConsentChange, required = true, className = '', compact = false }) => {
		const [consentState, setConsentState] = useState<ConsentState>({
			marketing: false,
			analytics: false,
			necessary: true,
			timestamp: new Date().toISOString(),
			version: '1.0.0',
		});
		const [showDetails, setShowDetails] = useState(false);
		const [consentHistory, setConsentHistory] = useState<ConsentRecord[]>([]);
		const dataCategories = {
			necessary: {
				title: 'Necessary',
				description: 'Essential for website functionality and security',
				purposes: ['Authentication', 'Security', 'Preferences'],
				retention: '12 months',
				locked: true,
			},
			analytics: {
				title: 'Analytics',
				description: 'Help us understand how you use our services',
				purposes: [
					'Usage statistics',
					'Performance monitoring',
					'Service improvement',
				],
				retention: '24 months',
				locked: false,
			},
			marketing: {
				title: 'Marketing',
				description: 'Personalised educational content and offers',
				purposes: ['Newsletter', 'Educational updates', 'Service announcements'],
				retention: '36 months',
				locked: false,
			},
		};
		const handleConsentToggle = (
			category: 'marketing' | 'analytics',
			value: boolean,
		) => {
			const newState: ConsentState = {
				...consentState,
				[category]: value,
				timestamp: new Date().toISOString(),
			};
			setConsentState(newState);
			const record: ConsentRecord = {
				id: `consent-${Date.now()}`,
				timestamp: newState.timestamp,
				consent: newState,
				action: value ? 'granted' : 'withdrawn',
				lawfulBasis: 'consent',
			};
			setConsentHistory((prev) => [...prev, record]);
			onConsentChange(newState);
			if (typeof window !== 'undefined') {
				localStorage.setItem('gdpr-consent', JSON.stringify(newState));
				localStorage.setItem(
					'gdpr-consent-history',
					JSON.stringify([...consentHistory, record]),
				);
			}
		};
		const PrivacyInformation = () => (
			<div className='space-y-4 text-sm'>
				<div className='flex items-start gap-2'>
					<Shield className='w-4 h-4 text-accent-600 mt-0.5' />
					<div>
						<BodyText className='font-medium text-black'>Your Privacy Rights</BodyText>
						<BodyText variant="muted" className='mt-1'>
							Under GDPR, you have the right to access, rectify, erase, and port your
							data. You can withdraw consent at any time.
						</BodyText>
					</div>
				</div>

				<div className='space-y-3'>
					<div>
						<BodyText className='font-medium text-black mb-1'>Data Controller</BodyText>
						<BodyText variant="muted">My Private Tutor Online Ltd</BodyText>
					</div>

					<div>
						<BodyText className='font-medium text-black mb-1'>Contact for Privacy Queries</BodyText>
						<BodyText variant="muted">privacy@myprivatetutoronline.co.uk</BodyText>
					</div>

					<div>
						<BodyText className='font-medium text-black mb-1'>Legal Basis</BodyText>
						<BodyText variant="muted">
							Consent (Article 6.1.a GDPR) for marketing and analytics. Legitimate
							interest (Article 6.1.f) for necessary operations.
						</BodyText>
					</div>
				</div>
			</div>
		);
		const ConsentAuditTrail = () => (
			<div className='mt-4 p-3 bg-gray-50 rounded-lg'>
				<CaptionText className='font-medium text-gray-700 mb-2'>Consent History</CaptionText>
				<div className='space-y-1'>
					{consentHistory.slice(-3).map((record) => (
						<CaptionText
							key={record.id}
							variant="muted">
							{new Date(record.timestamp).toLocaleString('en-GB')}: {record.action}
						</CaptionText>
					))}
				</div>
			</div>
		);
		useEffect(() => {
			if (typeof window !== 'undefined') {
				const savedConsent = localStorage.getItem('gdpr-consent');
				const savedHistory = localStorage.getItem('gdpr-consent-history');
				if (savedConsent) {
					try {
						const parsed = JSON.parse(savedConsent);
						setConsentState(parsed);
						onConsentChange(parsed);
					} catch (error) {
						console.error('Failed to parse saved consent:', error);
					}
				}
				if (savedHistory) {
					try {
						setConsentHistory(JSON.parse(savedHistory));
					} catch (error) {
						console.error('Failed to parse consent history:', error);
					}
				}
			}
		}, [onConsentChange]);
		if (compact) {
			return (
				<div className={cn('space-y-3', className)}>
					<label className='flex items-start gap-3 cursor-pointer group'>
						<input
							type='checkbox'
							checked={consentState.marketing}
							onChange={(e) => handleConsentToggle('marketing', e.target.checked)}
							className='mt-1 w-4 h-4 text-accent-600 border-gray-300 rounded focus:ring-accent-500'
							required={required}
							aria-describedby='consent-description'
						/>
						<div className='flex-1'>
							<BodyText variant="small" className='text-gray-700 group-hover:text-black transition-colors'>
								I consent to receive educational insights and exclusive opportunities
							</BodyText>
							<button
								type='button'
								onClick={() => setShowDetails(!showDetails)}
								className='text-xs text-accent-600 hover:text-accent-700 mt-1'
								aria-expanded={showDetails}>
								{showDetails ? 'Hide' : 'Show'} privacy details
							</button>
						</div>
					</label>

					{showDetails && (
						<div className='pl-7 space-y-3'>
							<CaptionText variant="muted">
								We'll use your email to send newsletters with educational content and
								service updates. You can unsubscribe at any time. We never share your
								data with third parties.
							</CaptionText>
							<a
								href='/legal/privacy-policy'
								target='_blank'
								rel='noopener noreferrer'
								className='text-xs text-accent-600 hover:text-accent-700 underline'>
								Read our full Privacy Policy
							</a>
						</div>
					)}
				</div>
			);
		}
		return (
			<div
				className={cn(
					'space-y-4 p-4 bg-white rounded-lg border border-gray-200',
					className,
				)}>
				<div className='flex items-center justify-between'>
					<HeadingText level={3} variant="large" className='text-black flex items-center gap-2'>
						<Shield className='w-5 h-5 text-accent-600' />
						Privacy & Consent Settings
					</HeadingText>
					<button
						onClick={() => setShowDetails(!showDetails)}
						className='text-sm text-accent-600 hover:text-accent-700'
						aria-expanded={showDetails}>
						{showDetails ? 'Hide' : 'Show'} Details
					</button>
				</div>

				<div className='space-y-3'>
					{Object.entries(dataCategories).map(([key, category]) => (
						<div
							key={key}
							className='flex items-start gap-3'>
							<input
								type='checkbox'
								id={`consent-${key}`}
								checked={consentState[key as keyof ConsentState] as boolean}
								onChange={(e) => {
									if (!category.locked) {
										handleConsentToggle(
											key as 'marketing' | 'analytics',
											e.target.checked,
										);
									}
								}}
								disabled={category.locked}
								className='mt-1 w-4 h-4 text-accent-600 border-gray-300 rounded focus:ring-accent-500 disabled:opacity-50'
								aria-describedby={`consent-${key}-description`}
							/>
							<div className='flex-1'>
								<BodyText
									as="label"
									htmlFor={`consent-${key}`}
									className='font-medium text-black cursor-pointer'>
									{category.title}
									{category.locked && (
										<CaptionText as="span" variant="muted" className='ml-2'>(Required)</CaptionText>
									)}
								</BodyText>
								<BodyText
									variant="small"
									id={`consent-${key}-description`}
									className='text-gray-600 mt-1'>
									{category.description}
								</BodyText>
								{showDetails && (
									<div className='mt-2'>
										<CaptionText variant="muted">Purposes: {category.purposes.join(', ')}</CaptionText>
										<CaptionText variant="muted">Retention: {category.retention}</CaptionText>
									</div>
								)}
							</div>
						</div>
					))}
				</div>

				{showDetails && (
					<>
						<PrivacyInformation />
						{consentHistory.length > 0 && <ConsentAuditTrail />}
					</>
				)}

				<div className='flex items-center gap-2 pt-3 border-t border-gray-200'>
					{consentState.marketing || consentState.analytics ?
						<CheckCircle className='w-4 h-4 text-green-600' />
					:	<Info className='w-4 h-4 text-gray-500' />}
					<CaptionText variant="muted">
						{consentState.marketing || consentState.analytics ?
							'Consent recorded and can be withdrawn at any time'
						:	'Only necessary cookies are active'}
					</CaptionText>
				</div>
			</div>
		);
	},
);
FooterGDPRConsent.displayName = 'FooterGDPRConsent';
function FooterDataErasure() {
	const [showConfirm, setShowConfirm] = useState(false);
	const [erased, setErased] = useState(false);
	const handleErasure = () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('gdpr-consent');
			localStorage.removeItem('gdpr-consent-history');
			localStorage.removeItem('newsletter-subscription');
			setErased(true);
			setTimeout(() => {
				setErased(false);
				setShowConfirm(false);
			}, 3000);
		}
	};
	return (
		<div className='space-y-3'>
			{!showConfirm ?
				<button
					onClick={() => setShowConfirm(true)}
					className='text-sm text-red-600 hover:text-red-700 underline'>
					Request data deletion
				</button>
			:	<div className='p-3 bg-red-50 border border-red-200 rounded-lg space-y-3'>
					{!erased ?
						<>
							<div className='flex items-start gap-2'>
								<AlertCircle className='w-4 h-4 text-red-600 mt-0.5' />
								<div className='flex-1'>
									<BodyText variant="small" className='font-medium text-red-900'>
										Confirm Data Deletion
									</BodyText>
									<BodyText variant="small" className='text-red-700 mt-1'>
										This will permanently delete all your data including preferences and
										subscription status.
									</BodyText>
								</div>
							</div>
							<div className='flex gap-2'>
								<button
									onClick={handleErasure}
									className='px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700'>
									Delete My Data
								</button>
								<button
									onClick={() => setShowConfirm(false)}
									className='px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300'>
									Cancel
								</button>
							</div>
						</>
					:	<div className='flex items-center gap-2'>
							<CheckCircle className='w-4 h-4 text-green-600' />
							<BodyText variant="small" className='text-green-800'>
								Your data has been successfully deleted
							</BodyText>
						</div>
					}
				</div>
			}
		</div>
	);
}
