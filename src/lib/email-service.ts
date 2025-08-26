// CONTEXT7 SOURCE: /resend/resend-js - Official Resend SDK integration patterns
// REVISION REASON: Implementation - Email service integration for £85,000 revenue recovery

import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Type definitions for contact form data
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  preferredContact?: 'email' | 'phone';
  budget?: 'standard' | 'premium' | 'elite';
  service?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// CONTEXT7 SOURCE: /resend/resend-js - Email sending patterns with error handling
export async function sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
  try {
    // Validate required environment variables
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      throw new Error('RESEND_FROM_EMAIL environment variable is required');
    }

    // Send email to business
    const businessEmail = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: ['contact@myprivatetutoronline.com'],
      subject: `New Contact Enquiry: ${data.subject}`,
      html: generateContactEmailTemplate(data),
      text: generateContactEmailText(data), // Fallback for non-HTML clients
    });

    // Send confirmation email to user
    const confirmationEmail = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [data.email],
      subject: 'Thank you for your enquiry - My Private Tutor Online',
      html: generateConfirmationEmailTemplate(data),
      text: generateConfirmationEmailText(data),
    });

    return {
      success: true,
      messageId: businessEmail.data?.id || 'unknown',
    };

  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// CONTEXT7 SOURCE: /html-templates/email - Professional email template patterns
function generateContactEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Enquiry</title>
      <style>
        body { font-family: Georgia, serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3F4A7E, #CA9E5B); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e5e5; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #3F4A7E; display: block; margin-bottom: 5px; }
        .value { padding: 8px; background: #f8f9fa; border-left: 3px solid #CA9E5B; margin-bottom: 10px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Contact Enquiry</h1>
        <p>My Private Tutor Online - Premium Tutoring Service</p>
      </div>
      
      <div class="content">
        <div class="field">
          <span class="label">Name:</span>
          <div class="value">${escapeHtml(data.name)}</div>
        </div>
        
        <div class="field">
          <span class="label">Email:</span>
          <div class="value">${escapeHtml(data.email)}</div>
        </div>
        
        ${data.phone ? `
        <div class="field">
          <span class="label">Phone:</span>
          <div class="value">${escapeHtml(data.phone)}</div>
        </div>
        ` : ''}
        
        <div class="field">
          <span class="label">Subject:</span>
          <div class="value">${escapeHtml(data.subject)}</div>
        </div>
        
        ${data.service ? `
        <div class="field">
          <span class="label">Service Interest:</span>
          <div class="value">${escapeHtml(data.service)}</div>
        </div>
        ` : ''}
        
        ${data.budget ? `
        <div class="field">
          <span class="label">Budget Level:</span>
          <div class="value">${escapeHtml(data.budget)}</div>
        </div>
        ` : ''}
        
        ${data.preferredContact ? `
        <div class="field">
          <span class="label">Preferred Contact Method:</span>
          <div class="value">${escapeHtml(data.preferredContact)}</div>
        </div>
        ` : ''}
        
        <div class="field">
          <span class="label">Message:</span>
          <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
        </div>
      </div>
      
      <div class="footer">
        <p><strong>My Private Tutor Online</strong></p>
        <p>Premium tutoring service established 2010 | Featured in Tatler Address Book 2025</p>
        <p>This enquiry was received on ${new Date().toLocaleDateString('en-GB', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })} at ${new Date().toLocaleTimeString('en-GB')}</p>
      </div>
    </body>
    </html>
  `;
}

// CONTEXT7 SOURCE: /html-templates/email - User confirmation template patterns
function generateConfirmationEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for your enquiry</title>
      <style>
        body { font-family: Georgia, serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3F4A7E, #CA9E5B); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e5e5; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #666; }
        .highlight { color: #CA9E5B; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Thank You for Your Enquiry</h1>
        <p>My Private Tutor Online</p>
      </div>
      
      <div class="content">
        <p>Dear ${escapeHtml(data.name)},</p>
        
        <p>Thank you for your enquiry regarding <span class="highlight">"${escapeHtml(data.subject)}"</span>. We have received your message and will respond within 24 hours during business hours.</p>
        
        <p>As a premium tutoring service established in 2010 and featured in the Tatler Address Book 2025, we pride ourselves on delivering exceptional educational support to our clients.</p>
        
        <h3>What happens next?</h3>
        <ul>
          <li><strong>Within 24 hours:</strong> One of our education specialists will personally review your enquiry</li>
          <li><strong>Initial consultation:</strong> We'll arrange a complimentary consultation to discuss your specific requirements</li>
          <li><strong>Tutor matching:</strong> We'll recommend the most suitable tutor from our carefully selected team</li>
          <li><strong>Bespoke programme:</strong> We'll design a tailored educational programme to achieve your goals</li>
        </ul>
        
        <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
        
        <p>Best regards,<br>
        <strong>The My Private Tutor Online Team</strong></p>
      </div>
      
      <div class="footer">
        <p><strong>My Private Tutor Online</strong></p>
        <p>Email: contact@myprivatetutoronline.com</p>
        <p>Established 2010 | Featured in Tatler Address Book 2025</p>
      </div>
    </body>
    </html>
  `;
}

// Plain text versions for email clients that don't support HTML
function generateContactEmailText(data: ContactFormData): string {
  return `
NEW CONTACT ENQUIRY - My Private Tutor Online

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}\n` : ''}
Subject: ${data.subject}
${data.service ? `Service: ${data.service}\n` : ''}
${data.budget ? `Budget: ${data.budget}\n` : ''}
${data.preferredContact ? `Preferred Contact: ${data.preferredContact}\n` : ''}

Message:
${data.message}

---
Received: ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-GB')}
My Private Tutor Online - Premium Tutoring Service
  `;
}

function generateConfirmationEmailText(data: ContactFormData): string {
  return `
Thank you for your enquiry - My Private Tutor Online

Dear ${data.name},

Thank you for your enquiry regarding "${data.subject}". We have received your message and will respond within 24 hours during business hours.

As a premium tutoring service established in 2010 and featured in the Tatler Address Book 2025, we pride ourselves on delivering exceptional educational support to our clients.

What happens next?
- Within 24 hours: One of our education specialists will personally review your enquiry
- Initial consultation: We'll arrange a complimentary consultation to discuss your requirements
- Tutor matching: We'll recommend the most suitable tutor from our selected team
- Bespoke programme: We'll design a tailored educational programme to achieve your goals

If you have any urgent questions, please contact us directly.

Best regards,
The My Private Tutor Online Team

---
My Private Tutor Online
Email: contact@myprivatetutoronline.com
Established 2010 | Featured in Tatler Address Book 2025
  `;
}

// CONTEXT7 SOURCE: /html-security/sanitization - HTML escaping for email security
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}