'use client';

import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { TutorProfile } from '@/lib/cms/cms-content';
import { getImageAsset } from '@/lib/cms/cms-images';
import { X, BookOpen, Clock, ArrowUpCircle } from 'lucide-react';
import React from 'react';

/** Booking consultation URL - centralised for easy maintenance */
const BOOKING_URL =
	'https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~';

/** Tier system - simplified with 2024 TypeScript best practices */
type TierLevel = 'tier-one' | 'tier-two' | 'tier-three';

interface TierConfig {
	label: string;
	color: string;
	description: string;
	priority: number;
}

/** Type-safe tier configuration with royal client quality standards */
const TIER_CONFIG: Record<TierLevel, TierConfig> = {
	'tier-one': {
		label: 'Elite',
		color: '#ca9e5b', // Gold
		description: 'Elite tutor with exceptional qualifications and proven track record',
		priority: 1,
	},
	'tier-two': {
		label: 'Premium',
		color: '#9ca3af', // Silver
		description: 'Premium tutor with excellent qualifications and experience',
		priority: 2,
	},
	'tier-three': {
		label: 'Qualified',
		color: '#cd7c32', // Bronze
		description: 'Qualified tutor with solid educational background',
		priority: 3,
	},
};

/** Generate initials for avatar fallback with proper string manipulation */
const getInitials = (name: string): string => {
	return name
		.split(' ')
		.map(part => part.charAt(0).toUpperCase())
		.join('')
		.substring(0, 2);
};

/** Component props interface - simplified */
interface TutorProfileCardProps {
	profile: TutorProfile;
	className?: string;
	variant?: 'default' | 'compact';
	showFullProfile?: boolean;
}

/** Tier indicator component with type-safe configuration */
const TierIndicator: React.FC<{
	tier: TierLevel;
	size: 'sm' | 'lg';
	className?: string;
}> = ({ tier, size, className = '' }) => {
	const config = TIER_CONFIG[tier];
	const sizeClasses = size === 'sm'
		? 'w-5 h-5 -top-1 -right-1'
		: 'w-8 h-8 -top-2 -right-2';

	return (
		<TooltipProvider>
			<TooltipRoot>
				<TooltipTrigger asChild>
					<div
						className={`absolute ${sizeClasses} rounded-full border-2 border-white shadow-sm ${className}`}
						style={{ backgroundColor: config.color }}
						role="img"
						aria-label={`${config.label} tier tutor`}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p className="font-medium">{config.label} Tutor</p>
					<p className="text-sm text-neutral-600">{config.description}</p>
				</TooltipContent>
			</TooltipRoot>
		</TooltipProvider>
	);
};

/** Specialisation badge with consistent styling */
const SpecialisationBadge: React.FC<{
	specialisation: string;
	variant?: 'default' | 'preview' | 'detail';
}> = ({ specialisation, variant = 'default' }) => {
	const variantStyles = {
		default: 'bg-accent-600/10 text-accent-600 border-accent-600/30 hover:bg-accent-600/20 px-4 py-2',
		preview: 'text-xs bg-accent-600/5 text-accent-600 border-accent-600/20 hover:bg-accent-600/10',
		detail: 'bg-accent-600/10 text-accent-600 border-accent-600/30 hover:bg-accent-600/20 px-4 py-2 text-sm',
	};

	return (
		<Badge
			variant="secondary"
			className={variantStyles[variant]}
		>
			{specialisation}
		</Badge>
	);
};

/** Experience metrics display component */
const ExperienceMetrics: React.FC<{
	experience: TutorProfile['experience'];
	variant: 'inline' | 'grid';
}> = ({ experience, variant }) => {
	if (variant === 'inline') {
		return (
			<div className="text-sm text-neutral-600">
				{experience.yearsTeaching} years experience
				{experience.totalStudents && (
					<> • {experience.totalStudents}+ students</>
				)}
			</div>
		);
	}

	const metrics = [
		{
			value: experience.yearsTeaching,
			label: 'Years Teaching',
			show: true,
		},
		{
			value: `${experience.totalStudents}+`,
			label: 'Students Taught',
			show: !!experience.totalStudents,
		},
		{
			value: `${experience.onlineHours}+`,
			label: 'Online Hours',
			show: !!experience.onlineHours,
		},
	].filter(metric => metric.show);

	return (
		<div className={`grid grid-cols-1 sm:grid-cols-${metrics.length} gap-4`}>
			{metrics.map((metric, index) => (
				<div key={index} className="text-center p-3 bg-accent-600/5 border border-accent-600/20">
					<div className="text-2xl font-bold text-accent-600">
						{metric.value}
					</div>
					<div className="text-sm text-neutral-600">{metric.label}</div>
				</div>
			))}
		</div>
	);
};

/** Main tutor profile card component - simplified with 2024 best practices */
export const TutorProfileCard: React.FC<TutorProfileCardProps> = ({
	profile,
	className = '',
	variant = 'default',
	showFullProfile = true,
}) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const tutorImage = getImageAsset('tutors', profile.image.key);
	const firstName = profile.name.split(' ')[0];

	// Card component with proper shadcn/ui structure
	const tutorCard = (
		<Card className={`group hover:shadow-xl transition-all duration-300 bg-white border-slate-200 ${className}`}>
			<CardHeader className="space-y-2 pb-4">
				<div className="flex items-start justify-center relative">
					<Avatar className="size-16 ring-2 ring-accent-600/20 group-hover:ring-accent-600/40 transition-all duration-300">
						<AvatarImage
							src={tutorImage?.src}
							alt={profile.image.alt}
						/>
						<AvatarFallback className="bg-primary-50 text-primary-700 font-semibold">
							{getInitials(profile.name)}
						</AvatarFallback>
					</Avatar>

					{/* Type-safe tier indicator */}
					{profile.tier && (
						<TierIndicator tier={profile.tier} size="sm" />
					)}
				</div>

				<div className="text-center space-y-1">
					<CardTitle className="text-lg text-primary-700">{profile.name}</CardTitle>
					<CardDescription className="text-accent-600 font-medium">
						{profile.title}
					</CardDescription>
				</div>

				{profile.badge && (
					<div className="flex justify-center">
						<Badge variant="secondary" className="bg-accent-600/10 text-accent-600 border-accent-600/30">
							{profile.badge}
						</Badge>
					</div>
				)}
			</CardHeader>

			{variant === 'default' && (
				<CardContent className="pt-0">
					{/* Specialisations preview */}
					<div className="space-y-3">
						<h4 className="text-sm font-medium text-primary-700">Specialisations</h4>
						<div className="flex flex-wrap gap-1.5">
							{profile.specializations.slice(0, 3).map((spec, index) => (
								<SpecialisationBadge
									key={index}
									specialisation={spec}
									variant="preview"
								/>
							))}
							{profile.specializations.length > 3 && (
								<Badge variant="outline" className="text-xs text-neutral-500 border-neutral-200">
									+{profile.specializations.length - 3} more
								</Badge>
							)}
						</div>
					</div>

					{/* Experience preview */}
					<div className="mt-3">
						<ExperienceMetrics experience={profile.experience} variant="inline" />
					</div>
				</CardContent>
			)}

			<CardFooter className="pt-4">
				{showFullProfile ? (
					<div className="w-full text-center">
						<span className="text-sm text-neutral-600 group-hover:text-accent-600 transition-colors duration-300">
							Click to view profile →
						</span>
					</div>
				) : (
					<Button asChild variant="default" className="w-full bg-accent-600 hover:bg-accent-700">
						<a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
							Book Consultation
						</a>
					</Button>
				)}
			</CardFooter>
		</Card>
	);

	// Simple conditional return - no type gymnastics needed
	if (!showFullProfile) {
		return tutorCard;
	}

	// Full profile implementation with Dialog
	return (
		<TooltipProvider>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<div className="cursor-pointer">
						{tutorCard}
					</div>
				</DialogTrigger>

				<DialogContent className="w-screen h-screen max-w-none p-0 overflow-hidden">
					{/* Close Button - Fixed Position */}
					<DialogClose className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-white/90 backdrop-blur-sm p-2 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2">
						<X className="h-6 w-6 text-neutral-600 hover:text-primary-900" />
						<span className="sr-only">Close</span>
					</DialogClose>

					{/* Scrollable Content */}
					<ScrollArea className="h-full w-full">
						<div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
							{/* Header Section */}
							<Card className="mb-8 bg-white border-slate-200">
								<CardHeader>
									<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
										<div className="relative flex-shrink-0">
											<Avatar className="size-40 sm:size-48 ring-4 ring-accent-600/30">
												<AvatarImage
													src={tutorImage?.src}
													alt={profile.image.alt}
												/>
												<AvatarFallback className="bg-primary-50 text-primary-700 text-4xl font-bold">
													{getInitials(profile.name)}
												</AvatarFallback>
											</Avatar>

											{/* Tier indicator for header */}
											{profile.tier && (
												<TierIndicator tier={profile.tier} size="lg" />
											)}
										</div>

										<div className="text-center md:text-left flex-1">
											<CardTitle className="text-3xl sm:text-4xl text-primary-900 mb-2">
												{profile.name}
											</CardTitle>
											<CardDescription className="text-xl sm:text-2xl text-accent-600 font-semibold mb-4">
												{profile.title}
											</CardDescription>

											{profile.badge && (
												<Badge variant="secondary" className="text-lg px-4 py-2 bg-accent-600/10 text-accent-600 border-accent-600/30">
													{profile.badge}
												</Badge>
											)}
										</div>
									</div>
								</CardHeader>
							</Card>

							{/* Content Grid */}
							<div className="space-y-6">
								{/* Education Section */}
								<Card className="bg-white border-slate-200">
									<CardHeader className="pb-4">
										<CardTitle className="flex items-center text-primary-900">
											<BookOpen className="mr-2 h-5 w-5 text-accent-600" />
											Education
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<div>
												<h4 className="font-semibold text-primary-900 text-lg">
													{profile.education.degree}
												</h4>
												<p className="text-neutral-700 text-base">{profile.education.university}</p>
												{profile.education.grade && (
													<Badge variant="secondary" className="mt-2 bg-accent-600/10 text-accent-600">
														{profile.education.grade}
													</Badge>
												)}
											</div>

											{profile.education.additionalQualifications && (
												<div>
													<h5 className="font-medium text-neutral-900 mb-2">
														Additional Qualifications:
													</h5>
													<div className="space-y-1">
														{profile.education.additionalQualifications.map((qual, index) => (
															<Badge key={index} variant="outline" className="mr-2 mb-2 bg-neutral-50">
																{qual}
															</Badge>
														))}
													</div>
												</div>
											)}
										</div>
									</CardContent>
								</Card>

								{/* Experience Section */}
								<Card className="bg-white border-slate-200">
									<CardHeader className="pb-4">
										<CardTitle className="flex items-center text-primary-900">
											<Clock className="mr-2 h-5 w-5 text-accent-600" />
											Experience
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<ExperienceMetrics experience={profile.experience} variant="grid" />

											{profile.experience.eliteSchools && (
												<div>
													<h5 className="font-medium text-neutral-900 mb-2">Elite Schools:</h5>
													<div className="space-y-1">
														{profile.experience.eliteSchools.map((school, index) => (
															<Badge key={index} variant="outline" className="mr-2 mb-2 bg-primary-50 text-primary-700 border-primary-200">
																{school}
															</Badge>
														))}
													</div>
												</div>
											)}
										</div>
									</CardContent>
								</Card>

								{/* About Section */}
								{profile.bio && (
									<Card className="bg-white border-slate-200">
										<CardHeader className="pb-4">
											<CardTitle className="text-primary-900">About {firstName}</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-neutral-700 leading-relaxed text-base">{profile.bio}</p>
										</CardContent>
									</Card>
								)}

								{/* Specialisations Section */}
								<Card className="bg-white border-slate-200">
									<CardHeader className="pb-4">
										<CardTitle className="text-primary-900">Specialisations</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="flex flex-wrap gap-2">
											{profile.specializations.map((specialisation, index) => (
												<SpecialisationBadge
													key={index}
													specialisation={specialisation}
													variant="detail"
												/>
											))}
										</div>
									</CardContent>
								</Card>

								{/* Key Achievement Section */}
								{profile.achievements && profile.achievements.length > 0 && (
									<Card className="bg-accent-600/5 border-accent-600/20">
										<CardHeader className="pb-4">
											<CardTitle className="text-primary-900">Key Achievement</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="flex items-start gap-3">
												<ArrowUpCircle className="h-6 w-6 text-accent-600 mt-1 flex-shrink-0" />
												<div>
													<h4 className="text-accent-600 font-semibold mb-2 text-lg">
														{profile.achievements[0].title}
													</h4>
													<p className="text-neutral-700 text-base">
														{profile.achievements[0].description}
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								)}

								{/* Testimonial Section */}
								{profile.testimonial && (
									<Card className="bg-white border-l-4 border-l-accent-600 border-slate-200">
										<CardHeader className="pb-4">
											<CardTitle className="text-primary-900">Student Testimonial</CardTitle>
										</CardHeader>
										<CardContent>
											<blockquote className="italic text-neutral-700 mb-3 text-lg leading-relaxed">
												&quot;{profile.testimonial.quote}&quot;
											</blockquote>
											<cite className="text-neutral-600 not-italic font-medium">
												— {profile.testimonial.author}
												{profile.testimonial.context && (
													<span className="text-neutral-500">, {profile.testimonial.context}</span>
												)}
											</cite>
										</CardContent>
									</Card>
								)}

								{/* CTA Button */}
								<Card className="bg-white border-slate-200">
									<CardContent className="pt-6">
										<Button
											variant="default"
											asChild
											className="w-full sm:w-auto px-8 py-6 text-base sm:text-lg bg-accent-600 hover:bg-accent-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
										>
											<a
												href={BOOKING_URL}
												target="_blank"
												rel="noopener noreferrer"
											>
												Book Consultation with {firstName}
											</a>
										</Button>
									</CardContent>
								</Card>
							</div>
						</div>
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</TooltipProvider>
	);
};

export default TutorProfileCard;