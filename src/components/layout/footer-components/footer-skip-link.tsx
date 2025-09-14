// CONTEXT7 SOURCE: /wcag/guidelines - Skip link component for footer navigation
// IMPLEMENTATION REASON: Official WCAG 2.4.1 bypass blocks requirement

"use client"

import React from 'react';
import { footerSkipLinkConfig } from '@/lib/hooks/use-footer-accessibility';

/**
 * CONTEXT7 SOURCE: /wcag/guidelines - Skip link component for footer navigation
 * SKIP LINK REASON: WCAG 2.4.1 bypass blocks requirement
 */
export function FooterSkipLink() {
  return (
    <>
      {/* Skip to footer link - visible on focus */}
      <a
        href="#footer"
        className={footerSkipLinkConfig.className}
        onClick={footerSkipLinkConfig.skipToFooter}
      >
        {footerSkipLinkConfig.text}
      </a>
    </>
  );
}

export default FooterSkipLink;