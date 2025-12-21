'use client';

import { LegalPageTemplate } from '@/components/legal/legal-page-template';
import { getLegalPageMetadata } from '@/lib/legal/legal-content';
import { LegalContactCard } from '@/components/legal/legal-contact-card';
import { LegalNoticeCard } from '@/components/legal/legal-notice-card';

export default function TermsOfServicePage() {
	const metadata = getLegalPageMetadata('terms-of-service')!;

	return (
		<LegalPageTemplate
			title={metadata.title}
			subtitle={metadata.subtitle}
			lastUpdated={metadata.lastUpdated}
			backgroundImage={metadata.backgroundImage}
			showCompliance={metadata.showCompliance ?? false}
			{...(metadata.complianceText && { complianceText: metadata.complianceText })}>

			<h2>1. Introduction</h2>
			<p>
				Welcome to www.myprivatetutoronline.com (the "Website"). By accessing or using the Website, you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, please do not use the Website.
			</p>
			<p>
				In these Terms, "we", "us" or "our" refers to the operator of the Website, and "you" refers to the user or visitor of the Website.
			</p>
			<p>
				Use of this Website is subject to the following Terms of Use.
			</p>

			<hr className="my-8 border-gray-300" />

			<h2>2. Purpose of the Website</h2>
			<p>
				The Website provides information about online tutoring services, educational resources, and the ability to arrange services with tutors. All content is provided for general information only, and is subject to change without notice.
			</p>

			<hr className="my-8 border-gray-300" />

			<h2>3. Acceptable Use</h2>
			<p>You agree to use the Website only for lawful purposes. You must not:</p>
			<ul>
				<li>Breach any local, national, or international law or regulation.</li>
				<li>Transmit unlawful, harmful, defamatory, obscene or objectionable material.</li>
				<li>Attempt to gain unauthorised access to the Website, related systems or networks.</li>
				<li>Use automated tools to scrape or copy content without written permission.</li>
				<li>Reverse-engineer, decompile or attempt to derive source code.</li>
				<li>Impersonate any person or misrepresent your affiliation.</li>
			</ul>
			<p>You are responsible for maintaining the confidentiality of any account details (if applicable).</p>

			<hr className="my-8 border-gray-300" />

			<h2>4. Intellectual Property</h2>
			<p>
				All content on this Website—including text, graphics, logos, layout and design—is owned by or licensed to us. You may view or print content for personal, non-commercial use only.
			</p>
			<p>Any reproduction, distribution or commercial use requires our prior written permission.</p>
			<p>Unauthorised use may give rise to a claim for damages and/or be a criminal offence.</p>

			<hr className="my-8 border-gray-300" />

			<h2>5. Cookies</h2>
			<p>
				The Website uses cookies to monitor browsing preferences. By using the Website, you consent to our use of cookies. Please see our Cookie Policy / Privacy Policy for full details.
			</p>

			<hr className="my-8 border-gray-300" />

			<h2>6. Disclaimer & Limitation of Liability</h2>
			<p>
				Information is provided "as is," without warranty of accuracy, completeness or suitability. Your use of the Website is at your own risk.
			</p>
			<p>
				To the fullest extent permitted by law, we are not liable for any loss or damage, including indirect or consequential loss, arising from your use of the Website or reliance on any information provided.
			</p>

			<LegalNoticeCard
				title="Important Notice"
				variant="warning">
				<p>
					Your use of this Website is entirely at your own risk. We provide information and services "as is" without any warranties.
				</p>
			</LegalNoticeCard>

			<hr className="my-8 border-gray-300" />

			<h2>7. Links to Other Websites</h2>
			<p>
				The Website may contain links to external websites. These links are provided for convenience and do not signify endorsement. We are not responsible for the content or availability of linked websites.
			</p>

			<hr className="my-8 border-gray-300" />

			<h2>8. Registration & Security (if applicable)</h2>
			<p>If you create an account:</p>
			<ul>
				<li>You agree to provide accurate and complete information.</li>
				<li>You are responsible for safeguarding your password.</li>
				<li>You must notify us of any unauthorised access.</li>
				<li>We may suspend or terminate accounts suspected of misuse.</li>
			</ul>

			<hr className="my-8 border-gray-300" />

			<h2>9. Changes to Terms</h2>
			<p>
				We may update these Terms at any time by posting the revised version on this page. Continued use of the Website constitutes acceptance of the updated Terms.
			</p>
			<p>We may also modify or discontinue parts of the Website without notice.</p>

			<hr className="my-8 border-gray-300" />

			<h2>10. Governing Law</h2>
			<p>
				These Terms are governed by the laws of England and Wales, and disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
			</p>

			<hr className="my-8 border-gray-300" />

			<h2>11. Miscellaneous</h2>
			<p>
				If any provision of these Terms is found unenforceable, the remaining provisions will continue in effect. Failure to enforce any provision does not constitute a waiver.
			</p>

			<hr className="my-8 border-gray-300" />

			<h2>12. Contact Information</h2>
			<p>For any questions regarding these Terms, please contact us at:</p>

			<LegalContactCard
				title="Contact Details"
				contactInfo={{
					email: "info@myprivatetutoronline.com",
					address: "17 Alexandra Gardens, London, N10 3RN"
			/>
		</LegalPageTemplate>
	);
