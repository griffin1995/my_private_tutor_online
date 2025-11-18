'use client';

import { Button } from '@/components/ui/button-variants';
import { Download, Share2, BookOpen, ArrowRight, ExternalLink, Mail } from 'lucide-react';

/**
 * Button Showcase - Demonstrates all button variants
 * Perfect for testing and documentation purposes
 */
export function ButtonShowcase() {
	return (
		<div className="space-y-8 p-8 bg-white rounded-lg border">
			<div>
				<h2 className="text-2xl font-bold text-primary-700 mb-4">Button Variants Showcase</h2>
				<p className="text-neutral-600 mb-8">
					Modern button implementation using CVA (Class Variance Authority) with Tailwind CSS 4 best practices.
				</p>
			</div>

			{/* Primary Blue Buttons */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-primary-700">Blue Buttons (Brand Primary)</h3>
				<div className="flex flex-wrap gap-3">
					<Button variant="blue" size="sm">
						Small Blue
					</Button>
					<Button variant="blue">
						<BookOpen className="mr-2 h-4 w-4" />
						Book Consultation
					</Button>
					<Button variant="blue" size="lg">
						<ArrowRight className="ml-2 h-5 w-5" />
						Get Started Today
					</Button>
					<Button variant="blue" href="/contact">
						Contact Us (Link)
					</Button>
				</div>
			</div>

			{/* Light Blue Buttons */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-primary-700">Light Blue Buttons (Secondary)</h3>
				<div className="flex flex-wrap gap-3">
					<Button variant="light" size="sm">
						Learn More
					</Button>
					<Button variant="light">
						<Download className="mr-2 h-4 w-4" />
						Download Guide
					</Button>
					<Button variant="light" size="lg">
						View Portfolio
					</Button>
					<Button variant="light" href="/how-it-works">
						How It Works (Link)
					</Button>
				</div>
			</div>

			{/* Gold Buttons */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-accent-700">Gold Buttons (Premium Actions)</h3>
				<div className="flex flex-wrap gap-3">
					<Button variant="gold" size="sm">
						Premium
					</Button>
					<Button variant="gold">
						<ExternalLink className="mr-2 h-4 w-4" />
						Premium Service
					</Button>
					<Button variant="gold" size="lg">
						Book Premium Tutor
					</Button>
					<Button variant="gold" href="/premium">
						Explore Premium (Link)
					</Button>
				</div>
			</div>

			{/* Light Gold Buttons */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-accent-700">Light Gold Buttons (Premium Secondary)</h3>
				<div className="flex flex-wrap gap-3">
					<Button variant="light-gold" size="sm">
						Elite Package
					</Button>
					<Button variant="light-gold">
						<Share2 className="mr-2 h-4 w-4" />
						Share Success
					</Button>
					<Button variant="light-gold" size="lg">
						Royal Tutoring
					</Button>
					<Button variant="light-gold" href="/elite">
						Elite Services (Link)
					</Button>
				</div>
			</div>

			{/* Ghost Buttons */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-neutral-700">Ghost Buttons (Subtle Actions)</h3>
				<div className="flex flex-wrap gap-3">
					<Button variant="ghost-blue" size="sm">
						Subtle Action
					</Button>
					<Button variant="ghost-blue">
						<Mail className="mr-2 h-4 w-4" />
						Contact Info
					</Button>
					<Button variant="ghost-gold">
						Premium Info
					</Button>
					<Button variant="ghost-gold" href="/info">
						More Details (Link)
					</Button>
				</div>
			</div>

			{/* Different Contexts Demo */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-neutral-700">Context Examples</h3>
				<div className="grid gap-6 md:grid-cols-2">
					{/* CTA Section */}
					<div className="p-6 bg-primary-50 rounded-lg border border-primary-200">
						<h4 className="font-semibold text-primary-800 mb-2">Call-to-Action Section</h4>
						<p className="text-primary-700 text-sm mb-4">
							Primary actions should use blue, secondary actions use light blue.
						</p>
						<div className="flex gap-2">
							<Button variant="blue" size="sm">Book Now</Button>
							<Button variant="light" size="sm">Learn More</Button>
						</div>
					</div>

					{/* Premium Section */}
					<div className="p-6 bg-accent-50 rounded-lg border border-accent-200">
						<h4 className="font-semibold text-accent-800 mb-2">Premium Services</h4>
						<p className="text-accent-700 text-sm mb-4">
							Premium content should use gold variants to highlight exclusivity.
						</p>
						<div className="flex gap-2">
							<Button variant="gold" size="sm">Premium</Button>
							<Button variant="light-gold" size="sm">Explore</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Technical Notes */}
			<div className="bg-neutral-50 p-6 rounded-lg border">
				<h4 className="font-semibold text-neutral-800 mb-2">Technical Implementation</h4>
				<ul className="text-sm text-neutral-600 space-y-1">
					<li>✅ Uses CVA (Class Variance Authority) for type-safe variants</li>
					<li>✅ Full TypeScript support with autocompletion</li>
					<li>✅ Consistent with design system tokens from tailwind.config.ts</li>
					<li>✅ Accessible by default (ARIA, keyboard navigation, focus management)</li>
					<li>✅ Supports Link component for navigation</li>
					<li>✅ Follows @layer base architecture - no conflicts with global styles</li>
				</ul>
			</div>
		</div>
	);
}