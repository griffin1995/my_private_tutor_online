'use client';

import React from 'react';
import { Highlighter } from '@/components/magicui/highlighter';
interface HighlightedQuoteProps {
	quote: string;
	author?: string;
	role?: string;
	useHighlighting?: boolean;
	className?: string;
}
function renderHighlightedMessage(quote: string, useHighlighting: boolean) {
	if (!useHighlighting) {
		return quote;
	}
	if (
		quote.includes(
			'We provide exceptional tuition that helps students excel academically and thrive personally',
		)
	) {
		return (
			<>
				We provide{' '}
				<Highlighter
					color='#CA9E5B'
					action='highlight'
					strokeWidth={2}
					iterations={1}
					padding={2}
					animationDuration={800}>
					exceptional tuition
				</Highlighter>{' '}
				that helps students{' '}
				<Highlighter
					color='#CA9E5B'
					action='highlight'
					strokeWidth={2}
					iterations={1}
					padding={2}
					animationDuration={1000}>
					excel academically
				</Highlighter>{' '}
				and{' '}
				<Highlighter
					color='#1e40af'
					action='underline'
					strokeWidth={3}
					iterations={2}
					padding={2}
					animationDuration={1400}>
					thrive personally
				</Highlighter>
				, opening doors to greater opportunities—at school and in life.
			</>
		);
	}
	if (quote.includes('tailored to who they are')) {
		const beforePhrase = quote.substring(
			0,
			quote.indexOf('tailored to who they are'),
		);
		const afterPhrase = quote.substring(
			quote.indexOf('tailored to who they are') +
				'tailored to who they are'.length,
		);
		return (
			<>
				{beforePhrase}
				<Highlighter
					color='#CA9E5B'
					action='highlight'
					strokeWidth={2}
					iterations={1}
					padding={2}
					animationDuration={600}>
					tailored to who they are
				</Highlighter>
				{afterPhrase}
			</>
		);
	}
	if (quote.includes('academic rigour with personal mentorship')) {
		const beforePhrase = quote.substring(
			0,
			quote.indexOf('academic rigour with personal mentorship'),
		);
		const afterPhrase = quote.substring(
			quote.indexOf('academic rigour with personal mentorship') +
				'academic rigour with personal mentorship'.length,
		);
		return (
			<>
				{beforePhrase}
				<Highlighter
					color='#CA9E5B'
					action='highlight'
					strokeWidth={2}
					iterations={1}
					padding={2}
					animationDuration={600}>
					academic rigour with personal mentorship
				</Highlighter>
				{afterPhrase}
			</>
		);
	}
	if (quote.includes('structure, insight and flexibility')) {
		const beforePhrase = quote.substring(
			0,
			quote.indexOf('structure, insight and flexibility'),
		);
		const afterPhrase = quote.substring(
			quote.indexOf('structure, insight and flexibility') +
				'structure, insight and flexibility'.length,
		);
		return (
			<>
				{beforePhrase}
				<Highlighter
					color='#CA9E5B'
					action='highlight'
					strokeWidth={2}
					iterations={1}
					padding={2}
					animationDuration={600}>
					structure, insight and flexibility
				</Highlighter>
				{afterPhrase}
			</>
		);
	}
	if (quote.includes('confidence, curiosity and clarity')) {
		const beforePhrase = quote.substring(
			0,
			quote.indexOf('confidence, curiosity and clarity'),
		);
		const afterPhrase = quote.substring(
			quote.indexOf('confidence, curiosity and clarity') +
				'confidence, curiosity and clarity'.length,
		);
		return (
			<>
				{beforePhrase}
				<Highlighter
					color='#1e40af'
					action='underline'
					strokeWidth={3}
					iterations={2}
					padding={2}
					animationDuration={1200}>
					confidence, curiosity and clarity
				</Highlighter>
				{afterPhrase}
			</>
		);
	}
	if (quote.includes('resilience and self-belief')) {
		const beforePhrase = quote.substring(
			0,
			quote.indexOf('resilience and self-belief'),
		);
		const afterPhrase = quote.substring(
			quote.indexOf('resilience and self-belief') +
				'resilience and self-belief'.length,
		);
		return (
			<>
				{beforePhrase}
				<Highlighter
					color='#1e40af'
					action='underline'
					strokeWidth={3}
					iterations={2}
					padding={2}
					animationDuration={1300}>
					resilience and self-belief
				</Highlighter>
				{afterPhrase}
			</>
		);
	}
	if (quote.includes('cultivate independence')) {
		const beforePhrase = quote.substring(
			0,
			quote.indexOf('cultivate independence'),
		);
		const afterPhrase = quote.substring(
			quote.indexOf('cultivate independence') + 'cultivate independence'.length,
		);
		return (
			<>
				{beforePhrase}
				<Highlighter
					color='#1e40af'
					action='underline'
					strokeWidth={3}
					iterations={2}
					padding={2}
					animationDuration={1400}>
					cultivate independence
				</Highlighter>
				{afterPhrase}
			</>
		);
	}
	if (quote.includes('Parents come to us when something truly matters')) {
		const extractSegment = (
			text: string,
			startPhrase: string,
			endPhrase?: string,
		): string => {
			const startIndex = text.indexOf(startPhrase);
			if (startIndex === -1) return '';
			const start = startIndex + startPhrase.length;
			if (!endPhrase) return text.substring(start);
			const endIndex = text.indexOf(endPhrase, start);
			return endIndex === -1 ?
					text.substring(start)
				:	text.substring(start, endIndex);
		};
		return (
			<>
				Parents come to us when something{' '}
				<Highlighter
					color='#CA9E5B'
					action='highlight'
					strokeWidth={2}
					iterations={1}
					padding={2}
					animationDuration={600}>
					truly
				</Highlighter>{' '}
				matters—an entrance exam, a lost sense of confidence, a desire for academic
				stretch. They stay with us because{' '}
				<Highlighter
					color='#CA9E5B'
					action='highlight'
					strokeWidth={2}
					iterations={1}
					padding={2}
					animationDuration={800}>
					we deliver real progress, quietly and expertly
				</Highlighter>
				. This is not a tutoring directory. This is{' '}
				<Highlighter
					color='#1e40af'
					action='underline'
					strokeWidth={3}
					iterations={2}
					padding={2}
					animationDuration={1200}>
					a bespoke service for ambitious families
				</Highlighter>{' '}
				looking for{' '}
				<Highlighter
					color='#CA9E5B'
					action='highlight'
					strokeWidth={2}
					iterations={1}
					padding={2}
					animationDuration={1000}>
					trusted partners in their child's academic career
				</Highlighter>
				.
			</>
		);
	}
	return (
		<>
			{quote.split(' ').map((word, index, words) => {
				const lowerWord = word.toLowerCase();
				const isLastWord = index === words.length - 1;
				const spacing = isLastWord ? '' : ' ';
				if (
					[
						'exceptional',
						'expert',
						'bespoke',
						'premium',
						'trusted',
						'excellence',
						'ambitious',
						'progress',
						'quietly',
						'expertly',
						'boutique',
						'truly',
						'tailored',
						'academic',
						'rigour',
						'mentorship',
						'structure',
						'insight',
						'flexibility',
					].includes(lowerWord.replace(/[.,!?]/g, ''))
				) {
					return (
						<React.Fragment key={index}>
							<Highlighter
								color='#CA9E5B'
								action='highlight'
								strokeWidth={2}
								iterations={1}
								padding={2}
								animationDuration={600}>
								{word}
							</Highlighter>
							{spacing}
						</React.Fragment>
					);
				}
				if (
					[
						'experience',
						'expertise',
						'professional',
						'qualified',
						'proven',
						'matters',
						'deliver',
						'partners',
						'academic',
						'personally',
						'carefully',
						'selected',
					].includes(lowerWord.replace(/[.,!?]/g, ''))
				) {
					return (
						<React.Fragment key={index}>
							<Highlighter
								color='#1e40af'
								action='underline'
								strokeWidth={3}
								iterations={2}
								padding={2}
								animationDuration={1200}>
								{word}
							</Highlighter>
							{spacing}
						</React.Fragment>
					);
				}
				return word + spacing;
			})}
		</>
	);
}
export function HighlightedQuote({
	quote,
	author,
	role,
	useHighlighting = true,
	className = '',
}: HighlightedQuoteProps) {
	return (
		<div
			className={className}
			style={{
				position: 'relative',
				transformStyle: 'preserve-3d',
				willChange: 'auto',
				isolation: 'isolate',
			}}>
			{}
			{}
			{}
			{}
			<blockquote className='text-xl lg:text-2xl font-serif text-token-neutral-700 italic leading-[2.5]'>
				{renderHighlightedMessage(quote, useHighlighting)}
			</blockquote>

			{}
			{}
			{}
			{author && (
				<cite className='text-lg font-semibold text-token-primary-dark not-italic'>
					&mdash; {author}
					{role && `, ${role}`}
				</cite>
			)}
		</div>
	);
}
export default HighlightedQuote;
