'use client';

import React from 'react';
import { footerSkipLinkConfig } from '@/lib/hooks/use-footer-accessibility';
export function FooterSkipLink() {
	return (
		<>
			{}
			<a
				href='#footer'
				className={footerSkipLinkConfig.className}
				onClick={footerSkipLinkConfig.skipToFooter}>
				{footerSkipLinkConfig.text}
			</a>
		</>
	);
}
export default FooterSkipLink;
