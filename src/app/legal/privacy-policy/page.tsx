"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { PageHero } from "@/components/layout/page-hero"
import { Section } from "@/components/layout/section"
import { Card } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <PageLayout background="white">
      <PageHero
        title="Privacy Policy"
        subtitle="How we protect and handle your personal information"
        description="My Private Tutor Online is committed to protecting your privacy and handling your data responsibly. This policy explains how we collect, use, and safeguard your information."
        className="bg-slate-50"
      />
      
      <Section className="py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
            <p className="text-sm text-blue-800 mb-2 font-semibold">Last Updated: 4 August 2025</p>
            <p className="text-blue-700 text-sm">
              This privacy policy complies with UK GDPR, Data Protection Act 2018, and international privacy regulations.
            </p>
          </div>

          <h2>1. About This Policy</h2>
          <p>
            My Private Tutor Online Limited ("we", "us", "our") respects your privacy and is committed to protecting your personal data. 
            This privacy policy explains how we look after your personal data when you visit our website and tells you about your privacy rights.
          </p>
          
          <Card className="p-6 my-8 bg-amber-50 border-amber-200">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Notice</h3>
            <p className="text-amber-700 text-sm">
              Given our prestigious clientele, including members of royal families and high-profile individuals, 
              we maintain the highest standards of confidentiality and data protection. All staff sign comprehensive 
              non-disclosure agreements and undergo enhanced security vetting.
            </p>
          </Card>

          <h2>2. Who We Are</h2>
          <p>
            My Private Tutor Online Limited is the data controller and is responsible for your personal data. 
            We have been providing premium tutoring services since 2010 and are based in the United Kingdom.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <h3 className="font-semibold mb-2">Contact Details:</h3>
            <ul className="space-y-1 text-sm">
              <li><strong>Company:</strong> My Private Tutor Online Limited</li>
              <li><strong>Registration:</strong> Companies House [Registration Number]</li>
              <li><strong>ICO Registration:</strong> [ICO Registration Number]</li>
              <li><strong>Data Protection Officer:</strong> privacy@myprivatetutoronline.co.uk</li>
              <li><strong>Address:</strong> [Registered Office Address]</li>
            </ul>
          </div>

          <h2>3. What Personal Data We Collect</h2>
          
          <h3>3.1 Student and Parent Information</h3>
          <ul>
            <li><strong>Identity Data:</strong> Full name, date of birth, gender, nationality</li>
            <li><strong>Contact Data:</strong> Address, email, telephone numbers</li>
            <li><strong>Educational Data:</strong> Current school, academic level, subjects studied, exam boards</li>
            <li><strong>Assessment Data:</strong> Academic assessments, progress reports, learning needs</li>
            <li><strong>Special Category Data:</strong> Learning difficulties, disabilities (with explicit consent)</li>
            <li><strong>Financial Data:</strong> Payment method details, billing addresses</li>
          </ul>

          <h3>3.2 Technical Data</h3>
          <ul>
            <li>IP address, browser type and version</li>
            <li>Device information and screen resolution</li>
            <li>Website usage data and analytics</li>
            <li>Cookie data and preferences</li>
          </ul>

          <h3>3.3 Sensitive Personal Data</h3>
          <p>
            We may process special category personal data including:
          </p>
          <ul>
            <li>Information about learning difficulties or disabilities</li>
            <li>Medical information relevant to learning</li>
            <li>Dietary requirements for face-to-face sessions</li>
          </ul>
          <p>
            We will only process this data with your explicit consent or where legally required.
          </p>

          <h2>4. How We Collect Your Data</h2>
          
          <h3>4.1 Direct Interactions</h3>
          <ul>
            <li>Completing enquiry forms on our website</li>
            <li>Booking consultations or tutoring sessions</li>
            <li>Telephoning or emailing us</li>
            <li>Subscribing to our newsletter</li>
            <li>Providing feedback or testimonials</li>
          </ul>

          <h3>4.2 Automated Technologies</h3>
          <ul>
            <li>Website analytics and cookies</li>
            <li>Video calling platform data during online sessions</li>
            <li>Email marketing platform interactions</li>
          </ul>

          <h3>4.3 Third Parties</h3>
          <ul>
            <li>Schools and educational institutions (with permission)</li>
            <li>Previous tutoring providers (with consent)</li>
            <li>Payment processors and fraud prevention services</li>
          </ul>

          <h2>5. How We Use Your Personal Data</h2>
          
          <Card className="p-6 my-8 bg-green-50 border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Lawful Basis for Processing</h3>
            <p className="text-green-700 text-sm">
              We will only use your personal data when the law allows us to. Most commonly under:
            </p>
            <ul className="text-green-700 text-sm mt-2 space-y-1">
              <li>• <strong>Contract:</strong> To perform our tutoring services</li>
              <li>• <strong>Legitimate interests:</strong> For business administration and marketing</li>
              <li>• <strong>Consent:</strong> For special category data and marketing communications</li>
              <li>• <strong>Legal obligation:</strong> For safeguarding and compliance requirements</li>
            </ul>
          </Card>

          <h3>5.1 Service Delivery</h3>
          <ul>
            <li>Matching students with appropriate tutors</li>
            <li>Scheduling and conducting tutoring sessions</li>
            <li>Tracking academic progress and outcomes</li>
            <li>Processing payments and managing accounts</li>
            <li>Providing customer support</li>
          </ul>

          <h3>5.2 Business Operations</h3>
          <ul>
            <li>Quality assurance and service improvement</li>
            <li>Staff training and development</li>
            <li>Business reporting and analytics</li>
            <li>Legal compliance and risk management</li>
          </ul>

          <h3>5.3 Marketing and Communications</h3>
          <ul>
            <li>Sending service updates and educational content</li>
            <li>Newsletter and promotional communications (with consent)</li>
            <li>Market research and customer feedback</li>
            <li>Website personalisation and improvement</li>
          </ul>

          <h2>6. Sharing Your Personal Data</h2>
          
          <h3>6.1 Our Tutors</h3>
          <p>
            We share relevant student information with matched tutors to enable effective teaching. 
            All tutors sign comprehensive confidentiality agreements and undergo enhanced background checks.
          </p>

          <h3>6.2 Service Providers</h3>
          <ul>
            <li><strong>Video Conferencing:</strong> Zoom, Microsoft Teams (for online sessions)</li>
            <li><strong>Payment Processing:</strong> Stripe, PayPal (for secure payments)</li>
            <li><strong>Email Services:</strong> Mailchimp, SendGrid (for communications)</li>
            <li><strong>Analytics:</strong> Google Analytics, Hotjar (for website improvement)</li>
            <li><strong>Customer Support:</strong> Zendesk, Intercom (for support services)</li>
          </ul>

          <h3>6.3 Legal Requirements</h3>
          <p>
            We may share your data where required by law, including:
          </p>
          <ul>
            <li>Safeguarding concerns (child protection authorities)</li>
            <li>Legal proceedings and court orders</li>
            <li>Regulatory investigations</li>
            <li>Prevention of fraud or criminal activity</li>
          </ul>

          <h2>7. International Transfers</h2>
          
          <Card className="p-6 my-8 bg-purple-50 border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Cross-Border Data Protection</h3>
            <p className="text-purple-700 text-sm">
              We serve clients internationally and may transfer data outside the UK/EEA. 
              All transfers are protected by appropriate safeguards including adequacy decisions or standard contractual clauses.
            </p>
          </Card>

          <p>
            When we transfer your data outside the UK/EEA, we ensure appropriate safeguards including:
          </p>
          <ul>
            <li>European Commission adequacy decisions</li>
            <li>Standard Contractual Clauses (SCCs)</li>
            <li>Binding Corporate Rules for multinational organisations</li>
            <li>Certification schemes and codes of conduct</li>
          </ul>

          <h2>8. Data Security</h2>
          
          <h3>8.1 Technical Measures</h3>
          <ul>
            <li>End-to-end encryption for video sessions</li>
            <li>SSL/TLS encryption for all data transmission</li>
            <li>Regular security penetration testing</li>
            <li>Multi-factor authentication for staff access</li>
            <li>Regular software updates and patches</li>
          </ul>

          <h3>8.2 Organisational Measures</h3>
          <ul>
            <li>Comprehensive staff training on data protection</li>
            <li>Enhanced background checks for all tutors</li>
            <li>Strict access controls and need-to-know basis</li>
            <li>Regular data protection impact assessments</li>
            <li>Incident response and breach notification procedures</li>
          </ul>

          <h2>9. Data Retention</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <h3 className="font-semibold mb-2">Retention Periods:</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Student Records:</strong> 7 years after last session (educational and legal requirements)</li>
              <li><strong>Safeguarding Records:</strong> Until 25th birthday or 7 years, whichever is longer</li>
              <li><strong>Financial Records:</strong> 6 years (HMRC requirements)</li>
              <li><strong>Marketing Data:</strong> Until consent withdrawn or 3 years of inactivity</li>
              <li><strong>Website Analytics:</strong> 26 months (Google Analytics default)</li>
              <li><strong>CCTV Footage:</strong> 30 days (office premises only)</li>
            </ul>
          </div>

          <h2>10. Your Legal Rights</h2>
          
          <p>Under UK GDPR, you have the following rights:</p>
          
          <h3>10.1 Access Rights</h3>
          <ul>
            <li><strong>Right of Access:</strong> Request copies of your personal data</li>
            <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
            <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
            <li><strong>Right to Data Portability:</strong> Transfer your data to another provider</li>
            <li><strong>Right to Object:</strong> Stop processing for marketing or legitimate interests</li>
          </ul>

          <h3>10.2 Exercising Your Rights</h3>
          <p>
            To exercise any of these rights, please contact us at: 
            <strong>privacy@myprivatetutoronline.co.uk</strong>
          </p>
          <p>
            We will respond within one month and may request identification to verify your identity.
          </p>

          <h2>11. Cookies and Website Analytics</h2>
          
          <p>
            Our website uses cookies to improve your experience. Please see our separate 
            <a href="/legal/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a> 
            for detailed information.
          </p>

          <h3>11.1 Essential Cookies</h3>
          <ul>
            <li>Session management and security</li>
            <li>Load balancing and performance</li>
            <li>Cookie consent preferences</li>
          </ul>

          <h3>11.2 Analytics Cookies</h3>
          <ul>
            <li>Google Analytics (anonymised)</li>
            <li>Website performance monitoring</li>
            <li>User experience improvements</li>
          </ul>

          <h2>12. Children's Privacy</h2>
          
          <Card className="p-6 my-8 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Special Protection for Children</h3>
            <p className="text-blue-700 text-sm">
              As an educational service provider, we take special care with children's data. 
              We require parental consent for students under 13 and maintain enhanced safeguarding procedures.
            </p>
          </Card>

          <p>
            We take children's privacy seriously and comply with additional regulations:
          </p>
          <ul>
            <li>Parental consent required for children under 13</li>
            <li>Enhanced safeguarding procedures and training</li>
            <li>Careful monitoring of online interactions</li>
            <li>Strict data minimisation for young learners</li>
            <li>Regular safeguarding reviews and updates</li>
          </ul>

          <h2>13. Changes to This Policy</h2>
          
          <p>
            We may update this privacy policy to reflect changes in our practices or legal requirements. 
            We will notify you of any material changes by:
          </p>
          <ul>
            <li>Email notification to registered users</li>
            <li>Prominent notice on our website</li>
            <li>Updated last modified date</li>
          </ul>

          <h2>14. Complaints and Regulatory Contact</h2>
          
          <p>
            If you have concerns about our data handling practices, please contact us first. 
            If you remain unsatisfied, you can lodge a complaint with:
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <h3 className="font-semibold mb-2">Information Commissioner's Office (ICO):</h3>
            <ul className="space-y-1 text-sm">
              <li><strong>Website:</strong> www.ico.org.uk</li>
              <li><strong>Phone:</strong> 0303 123 1113</li>
              <li><strong>Address:</strong> Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF</li>
            </ul>
          </div>

          <h2>15. Contact Us</h2>
          
          <p>
            For any privacy-related questions or to exercise your rights, please contact:
          </p>
          
          <div className="bg-slate-100 p-6 rounded-lg my-6">
            <h3 className="font-semibold mb-2">Data Protection Team:</h3>
            <ul className="space-y-1 text-sm">
              <li><strong>Email:</strong> privacy@myprivatetutoronline.co.uk</li>
              <li><strong>Phone:</strong> [Phone Number]</li>
              <li><strong>Post:</strong> Data Protection Officer, My Private Tutor Online Limited, [Address]</li>
              <li><strong>Response Time:</strong> We aim to respond within 48 hours</li>
            </ul>
          </div>

          <div className="border-t pt-8 mt-12 text-sm text-gray-600">
            <p><em>This is a template for informational purposes. Consult with a qualified attorney for legal advice specific to your situation.</em></p>
          </div>
        </div>
      </Section>
    </PageLayout>
  )
}