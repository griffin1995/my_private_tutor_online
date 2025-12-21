'use client';

import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { PageLayout } from '@/components/layout/page-layout';
import { notFound } from 'next/navigation';
import parse, { Element, type HTMLReactParserOptions, domToReact, type DOMNode } from 'html-react-parser';
import { use } from 'react';
import { blogPosts } from '../../../../data/blog-posts';

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
	// In Next.js 15, params is a Promise and needs to be unwrapped with React.use()
	const { slug } = use(params);
	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) {
		notFound();

	// Custom styling options for html-react-parser with proper domToReact usage
	const parserOptions: HTMLReactParserOptions = {
		replace: (domNode) => {
			if (domNode instanceof Element && domNode.attribs) {
				const { name, attribs, children } = domNode;

				// Custom styling for different HTML elements
				switch (name) {
					case 'h1':
						return (
							<h1 className='text-4xl md:text-5xl font-bold text-neutral-800 mt-8 mb-6 leading-tight'>
								{domToReact(children as DOMNode[], parserOptions)}
							</h1>
						);

					case 'h2':
						return (
							<h2 className='text-3xl md:text-4xl font-semibold text-neutral-800 mt-8 mb-5 leading-tight'>
								{domToReact(children as DOMNode[], parserOptions)}
							</h2>
						);

					case 'h3':
						return (
							<h3 className='text-2xl md:text-3xl font-semibold text-neutral-800 mt-7 mb-4 leading-tight'>
								{domToReact(children as DOMNode[], parserOptions)}
							</h3>
						);

					case 'h4':
						return (
							<h4 className='text-xl md:text-2xl font-semibold text-neutral-800 mt-6 mb-3'>
								{domToReact(children as DOMNode[], parserOptions)}
							</h4>
						);

					case 'p':
						return (
							<p className='text-lg text-neutral-700 leading-relaxed mb-6'>
								{domToReact(children as DOMNode[], parserOptions)}
							</p>
						);

					case 'ul':
						return (
							<ul className='list-disc ml-6 mb-6 space-y-3'>
								{domToReact(children as DOMNode[], parserOptions)}
							</ul>
						);

					case 'ol':
						return (
							<ol className='list-decimal ml-6 mb-6 space-y-3'>
								{domToReact(children as DOMNode[], parserOptions)}
							</ol>
						);

					case 'li':
						return (
							<li className='text-lg text-neutral-700 leading-relaxed'>
								{domToReact(children as DOMNode[], parserOptions)}
							</li>
						);

					case 'blockquote':
						return (
							<blockquote className='border-l-4 border-accent-600 pl-6 pr-4 py-4 my-8 bg-neutral-50 italic text-lg text-neutral-700 leading-relaxed'>
								{domToReact(children as DOMNode[], parserOptions)}
							</blockquote>
						);

					case 'strong':
						return (
							<strong className='font-semibold text-neutral-800'>
								{domToReact(children as DOMNode[], parserOptions)}
							</strong>
						);

					case 'em':
						return (
							<em className='italic text-neutral-700'>
								{domToReact(children as DOMNode[], parserOptions)}
							</em>
						);

					case 'a':
						return (
							<a
								href={attribs['href']}
								target={attribs['href']?.startsWith('http') ? '_blank' : undefined}
								rel={attribs['href']?.startsWith('http') ? 'noopener noreferrer' : undefined}
								className='text-accent-600 hover:text-accent-700 underline font-medium transition-colors'>
		{domToReact(children as DOMNode[], parserOptions)}
							</a>
						);

					default:
						// Return undefined to use default rendering for other elements
						return undefined;
			// Return undefined for non-Element nodes or unhandled elements
			return undefined;
	};

	return (
		<PageLayout headerProps={{ showBlueNavigation: true }}>
			<BlogArticleLayout post={post}>
				<article className='blog-content prose-custom max-w-none'>
					{parse(post.content, parserOptions)}
				</article>
			</BlogArticleLayout>
		</PageLayout>
	);
