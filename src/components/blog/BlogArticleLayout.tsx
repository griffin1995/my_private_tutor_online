'use client';

import { Button } from '@/components/ui/button-variants';
import {
	ArrowLeft,
	Book,
	Calendar,
	Clock,
	Share2,
	Tag,
	User,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useEffect, useState } from 'react';
import { FallbackImage, getCategoryFallback, validateImagePath } from '@/components/ui/fallback-image';
import { blogCategories, blogPosts } from '../../data/blog-posts';
import type { BlogPost } from '../../data/blog-posts';

interface BlogArticleLayoutProps {
	post: BlogPost;
	children: React.ReactNode;

export function BlogArticleLayout({ post, children }: BlogArticleLayoutProps) {
	const category = blogCategories.find((cat) => cat.id === post.category);
	const [currentUrl, setCurrentUrl] = useState('');

	// Get category-specific fallback and validate image
	const categoryFallback = getCategoryFallback(post.category);
	const useOriginalImage = validateImagePath(post.image);
	const imageToUse = useOriginalImage ? post.image : categoryFallback;

	// Enhanced debug logging for development
	if (process.env.NODE_ENV === 'development') {
		console.log(`[BlogArticleLayout] Post ${post.id} (${post.slug}):`, {
			originalImage: post.image,
			isValid: useOriginalImage,
			category: post.category,
			categoryFallback,
			finalImage: imageToUse
		});

	// Get current URL safely on client side
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCurrentUrl(window.location.href);
	}, []);

	// Get related posts (same category, excluding current post, max 3)
	const relatedPosts = useMemo(() => {
		return blogPosts
			.filter((p) => p.category === post.category && p.id !== post.id)
			.slice(0, 3);
	}, [post.category, post.id]);

	const shareUrls = {
		twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
		whatsapp: `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + currentUrl)}`,
	};

	return (
		<section className='py-16 lg:py-24'>
			<div className='container'>
				{/* Back to Blog Navigation */}
				<div className='mb-8'>
					<Link
						href='/blog'
						className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'>
						<ArrowLeft className='size-4' />
						Back to Education Insights
					</Link>
				</div>

				<div className='grid gap-4 md:grid-cols-12 md:gap-3'>
					{/* Sidebar */}
					<div className='order-last md:order-none md:col-span-4 lg:col-span-3'>
						<aside className='flex flex-col gap-6'>
							{/* Article Details */}
							<div className='border-border bg-card overflow-hidden rounded-lg border shadow-sm'>
								<div className='border-border bg-muted/50 border-b px-5 py-4'>
									<h3 className='flex items-center text-sm font-semibold'>
										<Book className='text-muted-foreground mr-2.5 size-3.5' />
										Article Details
									</h3>
								</div>
								<div className='p-5 space-y-4'>
									<div className='flex items-center gap-2 text-sm text-muted-foreground'>
										<Calendar className='size-4' />
										{new Date(post.date).toLocaleDateString('en-GB', {
											day: 'numeric',
											month: 'long',
											year: 'numeric',
										})}
									</div>
									<div className='flex items-center gap-2 text-sm text-muted-foreground'>
										<Clock className='size-4' />
										{post.readTime}
									</div>
									<div className='flex items-center gap-2 text-sm text-muted-foreground'>
										<Tag className='size-4' />
										{category?.name}
									</div>
									<div className='flex items-center gap-2 text-sm text-muted-foreground'>
										<User className='size-4' />
										{post.author}
									</div>
								</div>
							</div>

							{/* Expert Tutoring CTA */}
							<div className='border-border bg-card overflow-hidden rounded-lg border shadow-sm'>
								<div className='border-border bg-muted/50 border-b px-5 py-4'>
									<h3 className='text-sm font-semibold'>
										Need Expert Help with This Topic?
									</h3>
								</div>
								<div className='p-5'>
									<div className='space-y-4'>
										<p className='text-muted-foreground text-sm'>
											Our experienced tutors provide personalised guidance on this topic
											and many others. Get the support your child needs to excel.
										</p>
										<div className='flex flex-col space-y-2'>
											<Button
												variant='blue'
												href='/contact'
												className='w-full'>
												Book a Consultation
											</Button>
											<Button
												variant='light'
												href='/how-it-works'
												className='w-full'>
												Learn How We Help
											</Button>
										</div>
										<p className='text-muted-foreground mt-4 text-center text-xs'>
											Trusted by families across the UK
										</p>
									</div>
								</div>
							</div>

							{/* Share Article */}
							<div className='border-border bg-card overflow-hidden rounded-lg border shadow-sm'>
								<div className='border-border bg-muted/50 border-b px-5 py-4'>
									<h3 className='flex items-center text-sm font-semibold'>
										<Share2 className='text-muted-foreground mr-2.5 size-3.5' />
										Share this article
									</h3>
								</div>
								<div className='p-5'>
									<ul className='flex items-center gap-2'>
										<li>
											<a
												href={shareUrls.twitter}
												target='_blank'
												rel='noopener noreferrer'
												className='border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors'
												aria-label='Share on Twitter'>
												<svg
													className='size-4'
													viewBox='0 0 24 24'
													fill='currentColor'>
													<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
												</svg>
											</a>
										</li>
										<li>
											<a
												href={shareUrls.linkedin}
												target='_blank'
												rel='noopener noreferrer'
												className='border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors'
												aria-label='Share on LinkedIn'>
												<svg
													className='size-4'
													viewBox='0 0 24 24'
													fill='currentColor'>
													<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
												</svg>
											</a>
										</li>
										<li>
											<a
												href={shareUrls.facebook}
												target='_blank'
												rel='noopener noreferrer'
												className='border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors'
												aria-label='Share on Facebook'>
												<svg
													className='size-4'
													viewBox='0 0 24 24'
													fill='currentColor'>
													<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
												</svg>
											</a>
										</li>
										<li>
											<a
												href={shareUrls.whatsapp}
												target='_blank'
												rel='noopener noreferrer'
												className='border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors'
												aria-label='Share on WhatsApp'>
												<svg
													className='size-4'
													viewBox='0 0 24 24'
													fill='currentColor'>
													<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488' />
												</svg>
											</a>
										</li>
									</ul>
								</div>
							</div>

							{/* Related Posts */}
							{relatedPosts.length > 0 && (
								<div className='border-border bg-card overflow-hidden rounded-lg border shadow-sm'>
									<div className='border-border bg-muted/50 border-b px-5 py-4'>
										<h3 className='text-sm font-semibold'>Related Articles</h3>
									</div>
									<div className='p-5 space-y-4'>
										{relatedPosts.map((relatedPost) => (
											<Link
												key={relatedPost.id}
												href={`/blog/${relatedPost.slug}`}
												className='block group'>
												<h4 className='text-sm font-medium group-hover:text-accent-600 transition-colors line-clamp-2'>
													{relatedPost.title}
												</h4>
												<p className='text-xs text-muted-foreground mt-1'>
													{relatedPost.readTime}
												</p>
											</Link>
										))}
									</div>
								</div>
							)}
						</aside>
					</div>

					{/* Main Content */}
					<div className='md:col-span-8 md:col-start-5 lg:col-start-5'>
						<article>
							{/* Featured Image */}
							<div className='mb-8'>
								<FallbackImage
									src={imageToUse}
									fallbackSrc={categoryFallback}
									alt={post.title}
									width={800}
									height={500}
									className='w-full h-64 md:h-80 object-cover rounded-lg border'
									priority={true}
								/>
							</div>

							{/* Article Header */}
							<header className='mb-8'>
								<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-neutral-800 mb-4'>
									{post.title}
								</h1>
								{post.excerpt && (
									<p className='text-lg text-muted-foreground leading-relaxed'>
										{post.excerpt}
									</p>
								)}
							</header>

							{/* Article Content */}
							{children}
						</article>
					</div>
				</div>
			</div>
		</section>
	);
