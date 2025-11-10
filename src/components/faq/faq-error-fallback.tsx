'use client';

import React, { useState, useEffect } from 'react';
import {
	Search,
	MessageCircle,
	BookOpen,
	RefreshCw,
	AlertTriangle,
	Lightbulb,
	Mic,
	Camera,
	Layers,
	Home,
	Phone,
	Clock,
	CheckCircle2,
	XCircle,
	Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useErrorRecovery } from '@/hooks/use-error-recovery';
import { cn } from '@/lib/utils';
interface FAQErrorFallbackProps {
	error?: Error;
	errorInfo?: {
		componentStack?: string;
	};
	errorCategory?:
		| 'search'
		| 'voice'
		| 'visual'
		| 'content'
		| 'theme'
		| 'analytics'
		| 'network'
		| 'unknown';
	affectedFeatures?: string[];
	enabledFallbacks?: string[];
	onRetry?: () => void;
	onFallbackActivated?: (fallbackType: string) => void;
	className?: string;
	showTechnicalDetails?: boolean;
	contactSupport?: boolean;
	enableBasicSearch?: boolean;
	enableCategoryBrowsing?: boolean;
	cachedContent?: any[];
}
interface FallbackFeature {
	id: string;
	name: string;
	description: string;
	icon: React.ReactNode;
	available: boolean;
	action: () => void;
}
export function FAQErrorFallback({
	error,
	errorInfo,
	errorCategory = 'unknown',
	affectedFeatures = [],
	enabledFallbacks = [],
	onRetry,
	onFallbackActivated,
	className,
	showTechnicalDetails = false,
	contactSupport = true,
	enableBasicSearch = true,
	enableCategoryBrowsing = true,
	cachedContent = [],
}: FAQErrorFallbackProps) {
	const {
		isRecovering,
		retry,
		activateFallback,
		clearError,
		formatError,
		getErrorInfo,
	} = useErrorRecovery({
		component: 'FAQErrorFallback',
		feature: 'FAQ System',
		maxRetries: 3,
		enableFallback: true,
		enableReporting: true,
		onRetrySuccess: () => {
			clearError();
			onRetry?.();
		},
	});
	const [activeTab, setActiveTab] = useState('fallback');
	const [basicSearchQuery, setBasicSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const errorAnalysis =
		error ?
			getErrorInfo(error)
		:	{
				category: errorCategory,
				severity: 'medium',
			};
	const formattedError =
		error ? formatError(error) : 'An unexpected error occurred in the FAQ system';
	const fallbackFeatures: FallbackFeature[] = [
		{
			id: 'basic-search',
			name: 'Basic Text Search',
			description: 'Simple text-based FAQ search without advanced features',
			icon: <Search className='w-5 h-5' />,
			available:
				enableBasicSearch &&
				(!affectedFeatures.includes('search') ||
					enabledFallbacks.includes('basic-search')),
			action: () => {
				onFallbackActivated?.('basic-search');
				setActiveTab('search');
			},
		},
		{
			id: 'category-browse',
			name: 'Browse by Category',
			description: 'Browse FAQ items organised by topic categories',
			icon: <Layers className='w-5 h-5' />,
			available:
				enableCategoryBrowsing && enabledFallbacks.includes('category-browse'),
			action: () => {
				onFallbackActivated?.('category-browse');
				setActiveTab('categories');
			},
		},
		{
			id: 'cached-content',
			name: 'Recent FAQ Items',
			description: 'Access recently viewed FAQ items from cache',
			icon: <Clock className='w-5 h-5' />,
			available: cachedContent.length > 0,
			action: () => {
				onFallbackActivated?.('cached-content');
				setActiveTab('cached');
			},
		},
		{
			id: 'voice-alternative',
			name: 'Voice Search Tips',
			description: 'Alternative methods for voice-based FAQ search',
			icon: <Mic className='w-5 h-5' />,
			available: errorCategory === 'voice',
			action: () => {
				onFallbackActivated?.('voice-alternative');
				setActiveTab('voice-help');
			},
		},
		{
			id: 'visual-alternative',
			name: 'Image Search Help',
			description: 'Alternative methods for visual FAQ search',
			icon: <Camera className='w-5 h-5' />,
			available: errorCategory === 'visual',
			action: () => {
				onFallbackActivated?.('visual-alternative');
				setActiveTab('visual-help');
			},
		},
	];
	const availableFeatures = fallbackFeatures.filter(
		(feature) => feature.available,
	);
	const faqCategories = [
		{
			id: 'getting-started',
			name: 'Getting Started',
			icon: '🚀',
			count: 12,
		},
		{
			id: 'tutoring',
			name: 'Tutoring Services',
			icon: '👨‍🏫',
			count: 18,
		},
		{
			id: 'booking',
			name: 'Booking & Scheduling',
			icon: '📅',
			count: 15,
		},
		{
			id: 'pricing',
			name: 'Pricing & Payments',
			icon: '💳',
			count: 10,
		},
		{
			id: 'support',
			name: 'Technical Support',
			icon: '🔧',
			count: 8,
		},
		{
			id: 'policies',
			name: 'Policies & Terms',
			icon: '📋',
			count: 6,
		},
	];
	return (
		<div className={cn('max-w-4xl mx-auto p-6', className)}>
			<Alert
				className={cn(
					'mb-6',
					errorAnalysis.severity === 'critical' ? 'border-red-500 bg-red-50'
					: errorAnalysis.severity === 'high' ? 'border-orange-500 bg-orange-50'
					: 'border-yellow-500 bg-yellow-50',
				)}>
				<AlertTriangle
					className={cn(
						'h-4 w-4',
						errorAnalysis.severity === 'critical' ? 'text-red-600'
						: errorAnalysis.severity === 'high' ? 'text-orange-600'
						: 'text-yellow-600',
					)}
				/>
				<AlertDescription className='text-slate-800'>
					<div className='flex items-center justify-between'>
						<div>
							<strong className='block mb-1'>FAQ Service Temporarily Limited</strong>
							<span className='text-sm'>{formattedError}</span>
						</div>
						<div className='flex items-center space-x-2 ml-4'>
							{onRetry && (
								<Button
									size='sm'
									onClick={() => {
										onRetry();
										retry();
									}}
									disabled={isRecovering}
									className='flex items-center'>
									{isRecovering ?
										<RefreshCw className='w-4 h-4 mr-2 animate-spin' />
									:	<RefreshCw className='w-4 h-4 mr-2' />}
									Try Again
								</Button>
							)}
						</div>
					</div>
				</AlertDescription>
			</Alert>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className='space-y-6'>
				<TabsList className='grid w-full grid-cols-4'>
					<TabsTrigger value='fallback'>Available Options</TabsTrigger>
					<TabsTrigger
						value='search'
						disabled={!enableBasicSearch}>
						Basic Search
					</TabsTrigger>
					<TabsTrigger
						value='categories'
						disabled={!enableCategoryBrowsing}>
						Browse Topics
					</TabsTrigger>
					<TabsTrigger value='help'>Get Help</TabsTrigger>
				</TabsList>

				<TabsContent
					value='fallback'
					className='space-y-6'>
					<div className='text-center mb-6'>
						<h2 className='text-2xl font-bold text-slate-900 mb-2'>
							Alternative FAQ Access
						</h2>
						<p className='text-slate-600'>
							While we resolve the issue, you can still access FAQ information using
							these methods:
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{availableFeatures.map((feature) => (
							<Card
								key={feature.id}
								className='hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200'
								onClick={feature.action}>
								<CardContent className='p-6 text-center'>
									<div className='flex justify-center mb-4'>
										<div className='p-3 bg-blue-50 rounded-full text-blue-600'>
											{feature.icon}
										</div>
									</div>
									<h3 className='font-semibold text-slate-900 mb-2'>{feature.name}</h3>
									<p className='text-sm text-slate-600'>{feature.description}</p>
									<Button
										size='sm'
										className='mt-4'
										variant='outline'>
										Try This Option
									</Button>
								</CardContent>
							</Card>
						))}
					</div>

					{availableFeatures.length === 0 && (
						<Card className='border-orange-200 bg-orange-50'>
							<CardContent className='p-6 text-center'>
								<AlertTriangle className='w-8 h-8 text-orange-600 mx-auto mb-4' />
								<h3 className='font-semibold text-orange-900 mb-2'>
									Limited Fallback Options
								</h3>
								<p className='text-orange-800 mb-4'>
									Most FAQ features are temporarily unavailable. Please contact support
									for immediate assistance.
								</p>
								{contactSupport && (
									<Button onClick={() => (window.location.href = '/contact')}>
										Contact Support
									</Button>
								)}
							</CardContent>
						</Card>
					)}
				</TabsContent>

				<TabsContent
					value='search'
					className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center'>
								<Search className='w-5 h-5 mr-2' />
								Basic FAQ Search
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<div className='flex space-x-2'>
									<Input
										placeholder='Search FAQ questions...'
										value={basicSearchQuery}
										onChange={(e) => setBasicSearchQuery(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === 'Enter' && basicSearchQuery.trim()) {
												console.log('Basic search:', basicSearchQuery);
											}
										}}
									/>
									<Button
										onClick={() => {
											if (basicSearchQuery.trim()) {
												console.log('Basic search:', basicSearchQuery);
											}
										}}
										disabled={!basicSearchQuery.trim()}>
										Search
									</Button>
								</div>

								<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
									<div className='flex items-start'>
										<Info className='w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0' />
										<div className='text-sm text-blue-800'>
											<strong>Basic Search Mode:</strong> Advanced features like voice
											search, visual search, and AI recommendations are currently
											unavailable. This simplified search will help you find FAQ items
											using text-based matching.
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value='categories'
					className='space-y-4'>
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center'>
								<Layers className='w-5 h-5 mr-2' />
								Browse FAQ by Topic
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{faqCategories.map((category) => (
									<div
										key={category.id}
										className={cn(
											'p-4 rounded-lg border-2 cursor-pointer transition-colors',
											selectedCategory === category.id ?
												'border-blue-500 bg-blue-50'
											:	'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
										)}
										onClick={() => {
											setSelectedCategory(category.id);
											console.log('Selected category:', category.id);
										}}>
										<div className='flex items-center justify-between'>
											<div className='flex items-center'>
												<span className='text-2xl mr-3'>{category.icon}</span>
												<div>
													<h3 className='font-semibold text-slate-900'>{category.name}</h3>
													<p className='text-sm text-slate-600'>{category.count} items</p>
												</div>
											</div>
											{selectedCategory === category.id && (
												<CheckCircle2 className='w-5 h-5 text-blue-600' />
											)}
										</div>
									</div>
								))}
							</div>

							{selectedCategory && (
								<div className='mt-6 pt-6 border-t'>
									<Button
										onClick={() => {
											window.location.href = `/faq/${selectedCategory}`;
										}}
										className='w-full'>
										View {faqCategories.find((c) => c.id === selectedCategory)?.name} FAQs
									</Button>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value='help'
					className='space-y-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<Card>
							<CardContent className='p-6'>
								<div className='text-center'>
									<div className='p-3 bg-green-50 rounded-full inline-block mb-4'>
										<MessageCircle className='w-6 h-6 text-green-600' />
									</div>
									<h3 className='font-semibold text-slate-900 mb-2'>Contact Support</h3>
									<p className='text-sm text-slate-600 mb-4'>
										Get immediate help from our premium support team
									</p>
									<Button
										onClick={() => (window.location.href = '/contact')}
										className='w-full'>
										Contact Us
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className='p-6'>
								<div className='text-center'>
									<div className='p-3 bg-blue-50 rounded-full inline-block mb-4'>
										<Phone className='w-6 h-6 text-blue-600' />
									</div>
									<h3 className='font-semibold text-slate-900 mb-2'>Call Direct</h3>
									<p className='text-sm text-slate-600 mb-4'>
										Speak directly with our education consultants
									</p>
									<Button
										onClick={() => (window.location.href = 'tel:+447513550278')}
										variant='outline'
										className='w-full'>
										Call Now
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle className='flex items-center'>
								<BookOpen className='w-5 h-5 mr-2' />
								Alternative Resources
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<Button
									variant='outline'
									onClick={() => (window.location.href = '/services')}
									className='flex items-center justify-center p-4 h-auto'>
									<div className='text-center'>
										<BookOpen className='w-6 h-6 mx-auto mb-2' />
										<span className='text-sm'>Service Information</span>
									</div>
								</Button>

								<Button
									variant='outline'
									onClick={() => (window.location.href = '/testimonials')}
									className='flex items-center justify-center p-4 h-auto'>
									<div className='text-center'>
										<Lightbulb className='w-6 h-6 mx-auto mb-2' />
										<span className='text-sm'>Success Stories</span>
									</div>
								</Button>

								<Button
									variant='outline'
									onClick={() => (window.location.href = '/')}
									className='flex items-center justify-center p-4 h-auto'>
									<div className='text-center'>
										<Home className='w-6 h-6 mx-auto mb-2' />
										<span className='text-sm'>Return Home</span>
									</div>
								</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{showTechnicalDetails && error && (
				<Card className='mt-6 border-slate-200'>
					<CardHeader>
						<CardTitle className='text-sm font-mono text-slate-600'>
							Technical Error Details
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3 text-xs font-mono'>
							<div>
								<strong>Error:</strong> {error.name}
							</div>
							<div>
								<strong>Message:</strong> {error.message}
							</div>
							<div>
								<strong>Category:</strong> {errorAnalysis.category}
							</div>
							<div>
								<strong>Severity:</strong> {errorAnalysis.severity}
							</div>
							{affectedFeatures.length > 0 && (
								<div>
									<strong>Affected Features:</strong> {affectedFeatures.join(', ')}
								</div>
							)}
							{error.stack && (
								<details className='mt-2'>
									<summary className='cursor-pointer text-slate-500'>
										Stack Trace
									</summary>
									<pre className='mt-2 p-2 bg-slate-100 rounded text-xs overflow-auto'>
										{error.stack}
									</pre>
								</details>
							)}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
