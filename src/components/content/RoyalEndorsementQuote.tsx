'use client';

// CONTEXT7 SOURCE: /reactjs/react.dev - Component composition pattern for complex content
// ARCHITECTURE REASON: React best practice - dedicated components for reusable content blocks
// REFERENCE: Official React docs - "Composition vs Inheritance" pattern

/**
 * Royal Endorsement Quote Component
 *
 * Premium testimonial content component featuring royal client endorsement.
 * Following React composition patterns for maintainable, reusable content.
 *
 * @component RoyalEndorsementQuote
 * @returns {JSX.Element} Royal endorsement content with proper semantic markup
 */
export const RoyalEndorsementQuote = (): JSX.Element => {
	return (
		<>
			Our services are trusted by prominent families, including VIPs and royalty.
			<br />
			<br />
			<em>
				&ldquo;Hi Elizabeth, I found out today that the two princes and the
				princess have all been offered places at Le Rosey for next year. The
				family is delighted and would like me to pass on their sincerest thanks
				to you and the team for all your hard work.&rdquo;
			</em>
		</>
	);
};