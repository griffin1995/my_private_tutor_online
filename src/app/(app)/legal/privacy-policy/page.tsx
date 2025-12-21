'use client';

import { LegalPageTemplate } from '@/components/legal/legal-page-template';
import { getLegalPageMetadata } from '@/lib/legal/legal-content';

export default function PrivacyPolicyPage() {
	const metadata = getLegalPageMetadata('privacy-policy')!;

	return (
		<LegalPageTemplate
			title={metadata.title}
			subtitle={metadata.subtitle}
			lastUpdated={metadata.lastUpdated}
			backgroundImage={metadata.backgroundImage}
			showCompliance={metadata.showCompliance ?? false}
			{...(metadata.complianceText && { complianceText: metadata.complianceText })}>

			<section id='privacy-policy'>
				<h2>Privacy Policy</h2>
				<p>
					<strong>My Private Tutor Online</strong> (&quot;we&quot;,
					&quot;our&quot;, &quot;us&quot;) respects your privacy and complies
					with the UK GDPR and Data Protection Act 2018.
				</p>

				<h3>Who We Are</h3>
				<p>
					We provide online and in-person tutoring services. Contact us at{' '}
					<a href='mailto:info@myprivatetutoronline.com'>
						info@myprivatetutoronline.com
					</a>
					.
				</p>

				<h3>What Data We Collect</h3>
				<p>
					We collect names, contact details, lesson and payment records, student
					learning details, and tutor qualifications including DBS checks.
				</p>

				<h3>How We Use Data</h3>
				<p>
					We use your data to match students and tutors, manage lessons and
					payments, improve our services, and send updates (with consent). We
					never sell your data.
				</p>

				<h3>Legal Basis</h3>
				<p>
					We process data under: Contract (providing services), Legal obligation
					(records), Legitimate interests (management), and Consent (marketing).
				</p>

				<h3>Data Sharing</h3>
				<p>
					We share data only with GDPR-compliant providers such as Stripe
					(payments), Zoom (lessons), and Google Workspace (cloud storage).
				</p>

				<h3>Retention</h3>
				<p>
					Lesson and payment records are kept up to 6 years; tutor applications
					1 year; marketing data until you opt out.
				</p>

				<h3>Your Rights</h3>
				<p>
					You may request access, correction, deletion, or withdrawal of
					consent. For complaints, contact the{' '}
					<a
						href='https://www.ico.org.uk'
						target='_blank'>
						Information Commissioner&apos;s Office (ICO)
					</a>
					.
				</p>

				<h3>Children&apos;s Data</h3>
				<p>
					We only collect and process children&apos;s data with parental or
					guardian consent.
				</p>

				<h3>Cookies</h3>
				<p>
					Our website uses cookies for basic functionality and analytics. You
					can manage cookies in your browser settings.
				</p>

				<h3>Updates</h3>
				<p>
					We may update this Privacy Policy periodically. The latest version
					will always be available on our website.
				</p>
			</section>
		</LegalPageTemplate>
	);
