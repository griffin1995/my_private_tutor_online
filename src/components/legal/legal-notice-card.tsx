'use client';

import { Card } from '@/components/ui/card';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';

interface LegalNoticeCardProps {
	title: string;
	children: ReactNode;
	variant?: 'warning' | 'info' | 'success' | 'error';
	className?: string;
}

/**
 * Standardised notice card component for legal pages
 * Provides consistent styling for different types of notices
 */
export function LegalNoticeCard({
	title,
	children,
	variant = 'info',
	className = ''
}: LegalNoticeCardProps) {
	const variantStyles = {
		warning: {
			background: 'bg-gradient-to-r from-yellow-50 to-amber-50',
			border: 'border-yellow-200',
			icon: AlertTriangle,
			iconColor: 'text-yellow-600',
			titleColor: 'text-yellow-800',
			textColor: 'text-yellow-800'
		},
		info: {
			background: 'bg-gradient-to-r from-blue-50 to-indigo-50',
			border: 'border-blue-200',
			icon: Info,
			iconColor: 'text-blue-600',
			titleColor: 'text-blue-800',
			textColor: 'text-blue-800'
		},
		success: {
			background: 'bg-gradient-to-r from-green-50 to-emerald-50',
			border: 'border-green-200',
			icon: CheckCircle,
			iconColor: 'text-green-600',
			titleColor: 'text-green-800',
			textColor: 'text-green-800'
		},
		error: {
			background: 'bg-gradient-to-r from-red-50 to-pink-50',
			border: 'border-red-200',
			icon: XCircle,
			iconColor: 'text-red-600',
			titleColor: 'text-red-800',
			textColor: 'text-red-800'
		}
	};

	const styles = variantStyles[variant];
	const IconComponent = styles.icon;

	return (
		<div>
			<Card className={`p-8 my-12 ${styles.background} border-2 ${styles.border} shadow-xl ${className}`}>
				<div className='flex items-start gap-4'>
					<IconComponent className={`w-8 h-8 ${styles.iconColor} flex-shrink-0 mt-1`} />
					<div>
						<h3 className={`text-2xl font-serif font-bold ${styles.titleColor} mb-4`}>
							{title}
						</h3>
						<div className={`${styles.textColor} text-lg leading-relaxed`}>
							{children}
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}