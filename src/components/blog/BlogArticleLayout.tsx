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
import { useMemo } from 'react';
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	WhatsappShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	WhatsappIcon
} from 'react-share';
import { FallbackImage, getCategoryFallback, validateImagePath } from '@/components/ui/fallback-image';
import { blogCategories, blogPosts } from '../../data/blog-posts';
import type { BlogPost } from '../../data/blog-posts';

interface BlogArticleLayoutProps {
	post: BlogPost;
	children: React.ReactNode;
	currentUrl?: string; // Server-provided URL for sharing
}

export function BlogArticleLayout({ post, children, currentUrl }: BlogArticleLayoutProps) {
	const category = blogCategories.find((cat) => cat.id === post.category);

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
	}

	// Get related posts (same category, excluding current post, max 3)
	const relatedPosts = useMemo(() => {
		return blogPosts
			.filter((p) => p.category === post.category && p.id !== post.id)
			.slice(0, 3);
	}, [post.category, post.id]);

	// Use provided URL or fallback for sharing
	const shareUrl = currentUrl || (typeof window !== 'undefined' ? window.location.href : '');
	const shareTitle = post.title;

	return (
		<section className="py-16 lg:py-24">
			<div className="container">
				{/* Back to Blog Navigation */}
				<div className="mb-8">
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
						<ArrowLeft className="size-4" />
						Back to Education Insights
					</Link>
				</div>

				<div className="grid gap-4 md:grid-cols-12 md:gap-3">
					{/* Sidebar */}
					<div className="order-last md:order-none md:col-span-4 lg:col-span-3">
						<aside className="flex flex-col gap-6">
							{/* Article Details */}
							<div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
								<div className="border-border bg-muted/50 border-b px-5 py-4">
									<h3 className="flex items-center text-sm font-semibold">
										<Book className="text-muted-foreground mr-2.5 size-3.5" />
										Article Details
									</h3>
								</div>
								<div className="p-5 space-y-4">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Calendar className="size-4" />
										{new Date(post.date).toLocaleDateString('en-GB', {
											day: 'numeric',
											month: 'long',
											year: 'numeric',
										})}
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Clock className="size-4" />
										{post.readTime}
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Tag className="size-4" />
										{category?.name}
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<User className="size-4" />
										{post.author}
									</div>
								</div>
							</div>

							{/* Expert Tutoring CTA */}
							<div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
								<div className="border-border bg-muted/50 border-b px-5 py-4">
									<h3 className="text-sm font-semibold">
										Need Expert Help with This Topic?
									</h3>
								</div>
								<div className="p-5">
									<div className="space-y-4">
										<p className="text-muted-foreground text-sm">
											Our experienced tutors provide personalised guidance on this topic
											and many others. Get the support your child needs to excel.
										</p>
										<div className="flex flex-col space-y-2">
											<Button
												variant="blue"
												href="/contact"
												className="w-full">
												Book a Consultation
											</Button>
											<Button
												variant="light"
												href="/how-it-works"
												className="w-full">
												Learn How We Help
											</Button>
										</div>
										<p className="text-muted-foreground mt-4 text-center text-xs">
											Trusted by families across the UK
										</p>
									</div>
								</div>
							</div>

							{/* Share Article - Using react-share */}
							<div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
								<div className="border-border bg-muted/50 border-b px-5 py-4">
									<h3 className="flex items-center text-sm font-semibold">
										<Share2 className="text-muted-foreground mr-2.5 size-3.5" />
										Share this article
									</h3>
								</div>
								<div className="p-5">
									<ul className="flex items-center gap-2">
										<li>
											<TwitterShareButton
												url={shareUrl}
												title={shareTitle}
												className="border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors">
												<TwitterIcon size={16} round />
											</TwitterShareButton>
										</li>
										<li>
											<LinkedinShareButton
												url={shareUrl}
												title={shareTitle}
												className="border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors">
												<LinkedinIcon size={16} round />
											</LinkedinShareButton>
										</li>
										<li>
											<FacebookShareButton
												url={shareUrl}
												quote={shareTitle}
												className="border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors">
												<FacebookIcon size={16} round />
											</FacebookShareButton>
										</li>
										<li>
											<WhatsappShareButton
												url={shareUrl}
												title={shareTitle}
												className="border-border bg-muted/50 hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors">
												<WhatsappIcon size={16} round />
											</WhatsappShareButton>
										</li>
									</ul>
								</div>
							</div>

							{/* Related Posts */}
							{relatedPosts.length > 0 && (
								<div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
									<div className="border-border bg-muted/50 border-b px-5 py-4">
										<h3 className="text-sm font-semibold">Related Articles</h3>
									</div>
									<div className="p-5 space-y-4">
										{relatedPosts.map((relatedPost) => (
											<Link
												key={relatedPost.id}
												href={`/blog/${relatedPost.slug}`}
												className="block group">
												<h4 className="text-sm font-medium group-hover:text-accent-600 transition-colors line-clamp-2">
													{relatedPost.title}
												</h4>
												<p className="text-xs text-muted-foreground mt-1">
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
					<div className="md:col-span-8 md:col-start-5 lg:col-start-5">
						<article>
							{/* Featured Image */}
							<div className="mb-8">
								<FallbackImage
									src={imageToUse}
									fallbackSrc={categoryFallback}
									alt={post.title}
									width={800}
									height={500}
									className="w-full h-64 md:h-80 object-cover rounded-lg border"
									priority={true}
								/>
							</div>

							{/* Article Header */}
							<header className="mb-8">
								<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-neutral-800 mb-4">
									{post.title}
								</h1>
								{post.excerpt && (
									<p className="text-lg text-muted-foreground leading-relaxed">
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
}