// CONTEXT7 SOURCE: /reactjs/react.dev - Contact component optimization with memoization
// OPTIMIZATION REASON: Official React documentation demonstrates React.memo for preventing unnecessary contact info re-renders

import React, { useMemo } from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import type { ContactInfo } from '@/lib/services/footer-service-contracts';

interface FooterContactSectionProps {
  contactInfo: ContactInfo;
  className?: string;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React.memo for contact section optimization
 * MEMO REASON: Official React documentation shows memoization prevents contact info re-renders
 */
export const FooterContactSection = React.memo<FooterContactSectionProps>(({
  contactInfo,
  className = ""
}) => {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for contact data processing
  // MEMOIZATION REASON: Official React documentation shows useMemo for computed contact properties
  const processedContact = useMemo(() => {
    // CONTEXT7 SOURCE: /javascript/string - Phone number formatting for display
    // FORMATTING REASON: Format phone number for better user experience
    const formatPhoneForDisplay = (phone: string): string => {
      // Convert +442038549479 to +44 (0) 203 854 9479
      if (phone.startsWith('+44')) {
        const number = phone.substring(3);
        if (number.length >= 10) {
          return `+44 (0) ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
        }
      }
      return phone;
    };

    return {
      phone: contactInfo.phone,
      email: contactInfo.email,
      formattedPhone: formatPhoneForDisplay(contactInfo.phone),
      // CONTEXT7 SOURCE: /web.dev/web-apis - WhatsApp URL encoding
      // WHATSAPP REASON: Pre-encode WhatsApp message for better performance
      whatsappUrl: `https://wa.me/447513550278?text=${encodeURIComponent(
        "Hello, I'd like to enquire about private tutoring services for my child."
      )}`,
      // Accessibility labels
      phoneLabel: `Call us: ${formatPhoneForDisplay(contactInfo.phone)}`,
      emailLabel: `Email: ${contactInfo.email}`,
      whatsappLabel: "Contact us on WhatsApp - opens in new window"
    };
  }, [contactInfo.phone, contactInfo.email]);

  return (
    <div className={`col-span-2 md:col-span-4 mt-8 pt-6 border-t border-gray-200 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
        {/* CONTEXT7 SOURCE: /wcag/guidelines - Contact information accessibility */}
        {/* ACCESSIBILITY REASON: Official WCAG guidelines require proper contact info labeling */}
        <div className="text-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          
          {/* Phone Contact */}
          <ContactLink
            href={`tel:${processedContact.phone}`}
            icon={Phone}
            label={processedContact.phoneLabel}
            ariaLabel={`Call ${processedContact.formattedPhone}`}
          />
          
          <ContactSeparator />
          
          {/* Email Contact */}
          <ContactLink
            href={`mailto:${processedContact.email}`}
            icon={Mail}
            label={processedContact.emailLabel}
            ariaLabel={`Send email to ${processedContact.email}`}
          />
          
          <ContactSeparator />
          
          {/* WhatsApp Contact */}
          <ContactLink
            href={processedContact.whatsappUrl}
            icon={MessageCircle}
            label="WhatsApp Us"
            ariaLabel={processedContact.whatsappLabel}
            isExternal={true}
          />
        </div>
      </div>
    </div>
  );
});

FooterContactSection.displayName = 'FooterContactSection';

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Individual contact link component
 * COMPONENT REASON: Separate component for contact links enables better memoization
 */
interface ContactLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  ariaLabel: string;
  isExternal?: boolean;
}

const ContactLink = React.memo<ContactLinkProps>(({
  href,
  icon: IconComponent,
  label,
  ariaLabel,
  isExternal = false
}) => {
  const linkProps = {
    href,
    className: "text-black hover:text-accent-600 transition-colors duration-300 inline-flex items-center gap-1",
    "aria-label": ariaLabel,
    ...(isExternal && {
      target: "_blank",
      rel: "noopener noreferrer"
    })
  };

  return (
    <a {...linkProps}>
      <IconComponent className="w-4 h-4" />
      {label}
    </a>
  );
});

ContactLink.displayName = 'ContactLink';

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Contact separator component
 * SEPARATOR REASON: Memoized separator component for visual contact info separation
 */
const ContactSeparator = React.memo(() => (
  <span className="hidden sm:inline text-black" aria-hidden="true">|</span>
));

ContactSeparator.displayName = 'ContactSeparator';

export default FooterContactSection;