"use client"

import { m } from 'framer-motion'
import { PageLayout } from "@/components/layout/page-layout"
import { PageHero } from "@/components/layout/page-hero"
import { Section } from "@/components/layout/section"
import { Card } from "@/components/ui/card"
import { WaveSeparator } from '@/components/ui/wave-separator'
import { GradientOverlay } from '@/components/ui/gradient-overlay'
import { Scale, Crown, FileText, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react'

// CONTEXT7 SOURCE: /grx7/framer-motion - Enhanced legal page design with professional animations
// LEGAL DESIGN ENHANCEMENT: Formal terms of service styling with premium branding for royal clients
// IMPLEMENTATION REASON: Consistent visual standards while maintaining legal document accessibility

export default function TermsOfServicePage() {
  return (
    <PageLayout background="white">
      <PageHero
        background="gradient"
        size="lg"
        className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
        overlay={true}
        overlayOpacity="light"
      >
        <div className="max-w-4xl mx-auto text-center">
          <m.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Scale className="w-12 h-12 text-amber-400" />
            </div>
          </m.div>
          <m.h1 
            className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Terms of Service
          </m.h1>
          <m.p 
            className="text-xl text-amber-400 font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Terms and conditions for tutoring services
          </m.p>
          <m.p 
            className="text-lg text-white/90 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            These terms govern your use of My Private Tutor Online services. Please read them carefully before booking sessions.
          </m.p>
        </div>
      </PageHero>
      
      <WaveSeparator 
        variant="subtle" 
        className="text-white" 
      />
      
      <Section className="py-20 relative" background="white">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-50" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            
            <m.div 
              className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-r-2xl shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <p className="text-lg text-blue-800 font-bold">Last Updated: 4 August 2025</p>
              </div>
              <p className="text-blue-700">
                These terms comply with UK consumer protection law, educational services regulations, and international service standards.
              </p>
            </m.div>
            
            <div className="prose prose-lg prose-slate max-w-none">

          <h2>1. About These Terms</h2>
          <p>
            These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client", "you", "your") 
            and My Private Tutor Online Limited ("MPTO", "we", "us", "our") regarding your use of our tutoring services.
          </p>
          
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 my-12 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 shadow-xl rounded-2xl">
              <div className="flex items-start gap-4">
                <Crown className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-800 mb-4">Premium Service Notice</h3>
                  <p className="text-amber-800 text-lg leading-relaxed">
                    Our services are designed for discerning families who value excellence in education. 
                    We maintain the highest standards of professionalism, discretion, and academic achievement 
                    befitting our prestigious clientele.
                  </p>
                </div>
              </div>
            </Card>
          </m.div>

          <h2>2. Company Information</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <h3 className="font-semibold mb-2">My Private Tutor Online Limited:</h3>
            <ul className="space-y-1 text-sm">
              <li><strong>Company Registration:</strong> [Companies House Number]</li>
              <li><strong>Registered Office:</strong> [Full Registered Address]</li>
              <li><strong>VAT Registration:</strong> [VAT Number if applicable]</li>
              <li><strong>Regulatory Bodies:</strong> Office for Standards in Education (Ofsted) - [Registration Number]</li>
              <li><strong>Professional Memberships:</strong> Independent Schools Association, Tutors' Association</li>
            </ul>
          </div>

          <h2>3. Our Services</h2>
          
          <h3>3.1 Tutoring Services</h3>
          <p>We provide premium private tutoring services including:</p>
          <ul>
            <li><strong>Academic Tutoring:</strong> KS1-3, GCSE, A-Level, IB, University entrance</li>
            <li><strong>Specialist Preparation:</strong> 11+, 13+, Common Entrance, Oxbridge applications</li>
            <li><strong>Professional Skills:</strong> Study skills, exam technique, interview preparation</li>
            <li><strong>Online Learning:</strong> Live video sessions via secure platforms</li>
            <li><strong>Face-to-Face Tuition:</strong> In-home or neutral venue sessions</li>
            <li><strong>Group Classes:</strong> Small group and bootcamp programmes</li>
          </ul>

          <h3>3.2 Service Standards</h3>
          <ul>
            <li>All tutors are graduates of Oxford or Cambridge universities</li>
            <li>Enhanced DBS (Disclosure and Barring Service) checks for all staff</li>
            <li>Professional indemnity and public liability insurance</li>
            <li>Comprehensive safeguarding policies and procedures</li>
            <li>Regular progress monitoring and reporting</li>
          </ul>

          <h2>4. Booking and Scheduling</h2>
          
          <h3>4.1 Initial Consultation</h3>
          <ul>
            <li>Free 30-minute consultation to assess needs and match tutors</li>
            <li>Detailed academic assessment and goal setting</li>
            <li>Tutor selection based on expertise and personality fit</li>
            <li>Flexible scheduling to accommodate busy lifestyles</li>
          </ul>

          <h3>4.2 Session Booking</h3>
          <ul>
            <li>Sessions must be booked at least 24 hours in advance</li>
            <li>Regular slots can be reserved on a weekly basis</li>
            <li>Emergency sessions may be available subject to tutor availability</li>
            <li>International clients may book across different time zones</li>
          </ul>

          <h3>4.3 Cancellation Policy</h3>
          
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 my-12 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 shadow-xl rounded-2xl">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-serif font-bold text-red-800 mb-4">Cancellation Terms</h3>
                  <div className="text-red-800 space-y-3">
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span><strong>24+ hours notice:</strong> Full refund or rescheduling</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span><strong>12-24 hours notice:</strong> 50% charge applies</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Less than 12 hours:</strong> Full session charge</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <DollarSign className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span><strong>No-show:</strong> Full session charge plus administrative fee</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Emergency cancellations:</strong> Medical or family emergencies considered case-by-case</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </m.div>

          <h2>5. Fees and Payment</h2>
          
          <h3>5.1 Pricing Structure</h3>
          <ul>
            <li><strong>Standard Rate:</strong> £[X] per hour for GCSE/A-Level</li>
            <li><strong>Premium Rate:</strong> £[X] per hour for Oxbridge/Medical/Law preparation</li>
            <li><strong>Specialist Rate:</strong> £[X] per hour for specific exam preparation</li>
            <li><strong>Group Sessions:</strong> Discounted rates for 2-4 students</li>
            <li><strong>Package Deals:</strong> Discounts available for block bookings</li>
          </ul>

          <h3>5.2 Payment Terms</h3>
          <ul>
            <li>Payment due within 7 days of invoice</li>
            <li>Accepted methods: Bank transfer, credit/debit card, PayPal</li>
            <li>International payments via Wise or similar services</li>
            <li>Late payment charges of 2% per month apply</li>
            <li>All prices include VAT where applicable</li>
          </ul>

          <h3>5.3 Refund Policy</h3>
          <ul>
            <li>Unused sessions refunded within 30 days of purchase</li>
            <li>No refunds for completed sessions unless service failure</li>
            <li>Partial refunds considered for extenuating circumstances</li>
            <li>Processing time: 5-10 business days</li>
          </ul>

          <h2>6. Student Conduct and Expectations</h2>
          
          <h3>6.1 Student Responsibilities</h3>
          <ul>
            <li>Attend sessions punctually and prepared</li>
            <li>Complete agreed homework and assignments</li>
            <li>Treat tutors and staff with respect and courtesy</li>
            <li>Maintain confidentiality regarding other students</li>
            <li>Follow online session etiquette and guidelines</li>
          </ul>

          <h3>6.2 Parent/Guardian Responsibilities</h3>
          <ul>
            <li>Provide accurate information about student needs</li>
            <li>Ensure suitable learning environment for sessions</li>
            <li>Communicate promptly regarding schedule changes</li>
            <li>Support student engagement with learning process</li>
            <li>Maintain payment obligations and schedules</li>
          </ul>

          <h2>7. Tutor Standards and Conduct</h2>
          
          <h3>7.1 Professional Standards</h3>
          <ul>
            <li>Maintain highest standards of professional conduct</li>
            <li>Arrive punctually and prepared for all sessions</li>
            <li>Provide regular progress updates and feedback</li>
            <li>Respect student confidentiality and privacy</li>
            <li>Follow all safeguarding policies and procedures</li>
          </ul>

          <h3>7.2 Safeguarding Commitment</h3>
          
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 my-12 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-xl rounded-2xl">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-serif font-bold text-green-800 mb-4">Child Protection</h3>
                  <p className="text-green-800 text-lg leading-relaxed">
                    All our tutors undergo enhanced DBS checks and safeguarding training. 
                    We follow strict child protection policies and maintain detailed safeguarding procedures. 
                    Any concerns are immediately escalated to designated safeguarding officers.
                  </p>
                </div>
              </div>
            </Card>
          </m.div>

          <h2>8. Technology and Online Sessions</h2>
          
          <h3>8.1 Technical Requirements</h3>
          <ul>
            <li>Reliable internet connection (minimum 10 Mbps)</li>
            <li>Compatible device (laptop, tablet, or desktop)</li>
            <li>Working camera and microphone</li>
            <li>Quiet, well-lit learning environment</li>
            <li>Updated browser or app installation</li>
          </ul>

          <h3>8.2 Platform Security</h3>
          <ul>
            <li>Sessions conducted via secure, encrypted platforms</li>
            <li>No recording without explicit consent</li>
            <li>Password-protected session access</li>
            <li>GDPR-compliant data handling</li>
            <li>Regular security updates and monitoring</li>
          </ul>

          <h2>9. Intellectual Property</h2>
          
          <h3>9.1 Our Materials</h3>
          <ul>
            <li>All teaching materials remain property of MPTO</li>
            <li>Students may use materials for personal study only</li>
            <li>No reproduction or distribution without permission</li>
            <li>Copyright notices must remain intact</li>
          </ul>

          <h3>9.2 Student Work</h3>
          <ul>
            <li>Students retain rights to their original work</li>
            <li>We may use anonymised work for marketing (with consent)</li>
            <li>Academic records maintained for educational purposes</li>
            <li>Progress data used for service improvement</li>
          </ul>

          <h2>10. Privacy and Confidentiality</h2>
          
          <p>
            We take privacy extremely seriously, particularly given our prestigious clientele. 
            Please refer to our comprehensive <a href="/legal/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> 
            for detailed information.
          </p>

          <h3>10.1 Confidentiality Commitment</h3>
          <ul>
            <li>Strict confidentiality regarding all client information</li>
            <li>Enhanced privacy protection for high-profile families</li>
            <li>Non-disclosure agreements signed by all staff</li>
            <li>Secure handling of sensitive personal data</li>
            <li>Discreet service delivery and communications</li>
          </ul>

          <h2>11. Limitation of Liability</h2>
          
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 my-12 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 shadow-xl rounded-2xl">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-serif font-bold text-yellow-800 mb-4">Important Legal Notice</h3>
                  <p className="text-yellow-800 text-lg leading-relaxed">
                    While we strive for excellent outcomes, academic success depends on many factors including 
                    student effort, attendance, and external circumstances. We cannot guarantee specific results 
                    but commit to providing the highest quality teaching and support.
                  </p>
                </div>
              </div>
            </Card>
          </m.div>

          <h3>11.1 Service Limitations</h3>
          <ul>
            <li>We provide tutoring services, not guaranteed academic outcomes</li>
            <li>Success depends on student engagement and effort</li>
            <li>External factors may affect academic performance</li>
            <li>Our liability limited to fees paid for defective services</li>
          </ul>

          <h3>11.2 Exclusions</h3>
          <p>We exclude liability for:</p>
          <ul>
            <li>Indirect, consequential, or punitive damages</li>
            <li>Loss of profits, reputation, or opportunity</li>
            <li>Third-party actions or decisions</li>
            <li>Force majeure events beyond our control</li>
            <li>Student non-attendance or lack of engagement</li>
          </ul>

          <h2>12. Insurance and Professional Indemnity</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <h3 className="font-semibold mb-2">Insurance Coverage:</h3>
            <ul className="space-y-1 text-sm">
              <li><strong>Professional Indemnity:</strong> £[X] million coverage</li>
              <li><strong>Public Liability:</strong> £[X] million coverage</li>
              <li><strong>Employer's Liability:</strong> £[X] million coverage</li>
              <li><strong>Cyber Security:</strong> £[X] million coverage</li>
              <li><strong>Provider:</strong> [Insurance Company Name]</li>
            </ul>
          </div>

          <h2>13. Complaints and Dispute Resolution</h2>
          
          <h3>13.1 Complaints Procedure</h3>
          <ol className="space-y-2">
            <li><strong>Initial Contact:</strong> Raise concerns with your tutor or our support team</li>
            <li><strong>Formal Complaint:</strong> Submit written complaint to complaints@myprivatetutoronline.co.uk</li>
            <li><strong>Investigation:</strong> We will investigate within 10 business days</li>
            <li><strong>Resolution:</strong> Written response with proposed resolution</li>
            <li><strong>Escalation:</strong> Independent mediation available if required</li>
          </ol>

          <h3>13.2 Alternative Dispute Resolution</h3>
          <p>
            If we cannot resolve your complaint internally, you may use:
          </p>
          <ul>
            <li>Educational mediation services</li>
            <li>Consumer dispute resolution schemes</li>
            <li>Professional body complaint procedures</li>
            <li>Small claims court for financial disputes</li>
          </ul>

          <h2>14. Termination</h2>
          
          <h3>14.1 Termination by Client</h3>
          <ul>
            <li>14 days written notice required</li>
            <li>Refund of unused pre-paid sessions</li>
            <li>Outstanding invoices remain due</li>
            <li>Return of any borrowed materials</li>
          </ul>

          <h3>14.2 Termination by MPTO</h3>
          <p>We may terminate services for:</p>
          <ul>
            <li>Non-payment of fees</li>
            <li>Breach of terms or conduct policies</li>
            <li>Safeguarding concerns</li>
            <li>Repeated cancellations or non-attendance</li>
            <li>Inappropriate behaviour toward staff</li>
          </ul>

          <h2>15. Force Majeure</h2>
          
          <p>
            We are not liable for delays or failures due to circumstances beyond our reasonable control, including:
          </p>
          <ul>
            <li>Natural disasters and extreme weather</li>
            <li>Government restrictions and lockdowns</li>
            <li>Internet or technology failures</li>
            <li>Transport strikes or disruptions</li>
            <li>Health emergencies or pandemics</li>
          </ul>

          <h2>16. Governing Law and Jurisdiction</h2>
          
          <p>
            These Terms are governed by English law and subject to the exclusive jurisdiction of the English courts. 
            International clients agree to English law and jurisdiction for all disputes.
          </p>

          <h2>17. Changes to Terms</h2>
          
          <p>
            We may update these Terms to reflect changes in our services or legal requirements. 
            We will notify you of material changes by:
          </p>
          <ul>
            <li>Email to registered users</li>
            <li>Notice on our website</li>
            <li>Updated effective date</li>
          </ul>
          <p>
            Continued use of our services after changes constitutes acceptance of new terms.
          </p>

          <h2>18. Severability</h2>
          
          <p>
            If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
          </p>

          <h2>19. Contact Information</h2>
          
          <div className="bg-slate-100 p-6 rounded-lg my-6">
            <h3 className="font-semibold mb-2">Get in Touch:</h3>
            <ul className="space-y-1 text-sm">
              <li><strong>General Enquiries:</strong> info@myprivatetutoronline.co.uk</li>
              <li><strong>Bookings:</strong> bookings@myprivatetutoronline.co.uk</li>
              <li><strong>Complaints:</strong> complaints@myprivatetutoronline.co.uk</li>
              <li><strong>Phone:</strong> [Phone Number]</li>
              <li><strong>Address:</strong> [Full Business Address]</li>
              <li><strong>Business Hours:</strong> Monday-Friday 9am-6pm GMT</li>
            </ul>
          </div>

          <div className="border-t pt-8 mt-12 text-sm text-gray-600">
            <p><em>This is a template for informational purposes. Consult with a qualified attorney for legal advice specific to your situation.</em></p>
          </div>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  )
}