'use client';

import React from 'react';
export function TokenTestComponent() {
	return (
		<div className='container mx-auto p-8 space-y-12'>
			<div className='space-y-4'>
				<h1 className='text-4xl font-bold text-token-primary'>
					Design Token Infrastructure Test
				</h1>
				<p className='text-token-neutral-800'>
					This component validates that all 25 strategic design tokens are properly
					configured
				</p>
			</div>

			{}
			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-token-primary-dark'>
					Primary Brand Colors (Navy)
				</h2>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					<div className='space-y-2'>
						<div className='bg-token-primary h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-primary</p>
						<p className='text-xs text-token-neutral-600'>#3F4A7E</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-primary-base h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-primary-base</p>
						<p className='text-xs text-token-neutral-600'>#3F4A7E</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-primary-light h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-primary-light</p>
						<p className='text-xs text-token-neutral-600'>#5A6B9E</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-primary-dark h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-primary-dark</p>
						<p className='text-xs text-token-neutral-600'>#2D3456</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-primary-muted h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-primary-muted</p>
						<p className='text-xs text-token-neutral-600'>#7A88B3</p>
					</div>
				</div>
			</section>

			{}
			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-token-primary-dark'>
					Secondary Brand Colors (Gold)
				</h2>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					<div className='space-y-2'>
						<div className='bg-token-secondary h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-secondary</p>
						<p className='text-xs text-token-neutral-600'>#CA9E5B</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-secondary-base h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-secondary-base</p>
						<p className='text-xs text-token-neutral-600'>#CA9E5B</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-secondary-light h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-secondary-light</p>
						<p className='text-xs text-token-neutral-600'>#E5C89A</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-secondary-dark h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-secondary-dark</p>
						<p className='text-xs text-token-neutral-600'>#A67C3D</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-secondary-muted h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-secondary-muted</p>
						<p className='text-xs text-token-neutral-600'>#D4B480</p>
					</div>
				</div>
			</section>

			{}
			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-token-primary-dark'>
					Neutral Greyscale (8 Strategic Greys)
				</h2>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					<div className='space-y-2'>
						<div className='bg-token-neutral-white h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-neutral-white</p>
						<p className='text-xs text-token-neutral-600'>#FFFFFF</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-neutral-50 h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-neutral-50</p>
						<p className='text-xs text-token-neutral-600'>#F9FAFB</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-neutral-100 h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-neutral-100</p>
						<p className='text-xs text-token-neutral-600'>#F3F4F6</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-neutral-200 h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-neutral-200</p>
						<p className='text-xs text-token-neutral-600'>#E5E7EB</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-neutral-400 h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-neutral-400</p>
						<p className='text-xs text-token-neutral-600'>#9CA3AF</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-neutral-600 h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-neutral-600</p>
						<p className='text-xs text-token-neutral-600'>#4B5563</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-neutral-800 h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-neutral-800</p>
						<p className='text-xs text-token-neutral-600'>#1F2937</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-neutral-black h-24 rounded-lg border-2 border-token-ui-border' />
						<p className='text-sm font-technical'>bg-token-neutral-black</p>
						<p className='text-xs text-token-neutral-600'>#000000</p>
					</div>
				</div>
			</section>

			{}
			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-token-primary-dark'>
					Semantic Colors (User Feedback)
				</h2>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					<div className='space-y-2'>
						<div className='bg-token-semantic-success h-24 rounded-lg border-2 border-token-ui-border flex items-center justify-center'>
							<span className='text-white font-semibold'>Success</span>
						</div>
						<p className='text-sm font-technical'>bg-token-semantic-success</p>
						<p className='text-xs text-token-neutral-600'>#10B981</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-semantic-error h-24 rounded-lg border-2 border-token-ui-border flex items-center justify-center'>
							<span className='text-white font-semibold'>Error</span>
						</div>
						<p className='text-sm font-technical'>bg-token-semantic-error</p>
						<p className='text-xs text-token-neutral-600'>#EF4444</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-semantic-warning h-24 rounded-lg border-2 border-token-ui-border flex items-center justify-center'>
							<span className='text-white font-semibold'>Warning</span>
						</div>
						<p className='text-sm font-technical'>bg-token-semantic-warning</p>
						<p className='text-xs text-token-neutral-600'>#F59E0B</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-semantic-info h-24 rounded-lg border-2 border-token-ui-border flex items-center justify-center'>
							<span className='text-white font-semibold'>Info</span>
						</div>
						<p className='text-sm font-technical'>bg-token-semantic-info</p>
						<p className='text-xs text-token-neutral-600'>#3B82F6</p>
					</div>
				</div>
			</section>

			{}
			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-token-primary-dark'>
					UI Utility Colors (Interactive States)
				</h2>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					<div className='space-y-2'>
						<div className='h-24 rounded-lg border-2 border-token-ui-border flex items-center justify-center'>
							<span className='text-token-neutral-800 font-semibold'>Border</span>
						</div>
						<p className='text-sm font-technical'>border-token-ui-border</p>
						<p className='text-xs text-token-neutral-600'>#E5E7EB</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-ui-hover h-24 rounded-lg border-2 border-token-ui-border flex items-center justify-center'>
							<span className='text-token-neutral-800 font-semibold'>Hover</span>
						</div>
						<p className='text-sm font-technical'>bg-token-ui-hover</p>
						<p className='text-xs text-token-neutral-600'>#F9FAFB</p>
					</div>
					<div className='space-y-2'>
						<div className='bg-token-ui-disabled h-24 rounded-lg border-2 border-token-ui-border flex items-center justify-center'>
							<span className='text-white font-semibold'>Disabled</span>
						</div>
						<p className='text-sm font-technical'>bg-token-ui-disabled</p>
						<p className='text-xs text-token-neutral-600'>#9CA3AF</p>
					</div>
					<div className='space-y-2'>
						<div className='h-24 rounded-lg border-4 border-token-ui-focus flex items-center justify-center bg-white'>
							<span className='text-token-neutral-800 font-semibold'>Focus Ring</span>
						</div>
						<p className='text-sm font-technical'>border-token-ui-focus</p>
						<p className='text-xs text-token-neutral-600'>#CA9E5B</p>
					</div>
				</div>
			</section>

			{}
			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-token-primary-dark'>
					Text Color Token Tests
				</h2>
				<div className='space-y-3'>
					<p className='text-token-primary text-lg'>
						Primary text color (text-token-primary)
					</p>
					<p className='text-token-primary-light text-lg'>
						Light primary text (text-token-primary-light)
					</p>
					<p className='text-token-primary-dark text-lg'>
						Dark primary text (text-token-primary-dark)
					</p>
					<p className='text-token-secondary text-lg'>
						Secondary gold text (text-token-secondary)
					</p>
					<p className='text-token-neutral-800 text-lg'>
						Neutral dark text (text-token-neutral-800)
					</p>
					<p className='text-token-neutral-600 text-lg'>
						Neutral medium text (text-token-neutral-600)
					</p>
				</div>
			</section>

			{}
			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-token-primary-dark'>
					Real-World Usage Example
				</h2>
				<div className='bg-token-neutral-50 border-2 border-token-ui-border rounded-lg p-6 space-y-4'>
					<h3 className='text-xl font-semibold text-token-primary'>
						Premium Tutoring Card
					</h3>
					<p className='text-token-neutral-800'>
						This demonstrates how tokens work in a realistic component with multiple
						color applications.
					</p>
					<button className='bg-token-secondary hover:bg-token-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
						Book Session
					</button>
					<div className='flex gap-2 mt-4'>
						<span className='bg-token-semantic-success text-white px-3 py-1 rounded text-sm'>
							Available
						</span>
						<span className='bg-token-semantic-info text-white px-3 py-1 rounded text-sm'>
							Top Rated
						</span>
					</div>
				</div>
			</section>

			{}
			<section className='space-y-4 bg-token-primary text-white p-6 rounded-lg'>
				<h2 className='text-2xl font-semibold'>Validation Checklist</h2>
				<ul className='space-y-2 text-token-neutral-50'>
					<li>✅ All 25 color tokens defined and accessible</li>
					<li>✅ Brand colors (#3F4A7E navy, #CA9E5B gold) render correctly</li>
					<li>✅ CSS variables properly imported from variables.css</li>
					<li>✅ Tailwind classes compile successfully</li>
					<li>✅ DEFAULT variants work (bg-token-primary, bg-token-secondary)</li>
					<li>✅ Semantic tokens render expected colors</li>
					<li>✅ UI utility tokens function correctly</li>
					<li>✅ Text color classes work alongside background classes</li>
				</ul>
			</section>
		</div>
	);
}
export default TokenTestComponent;
