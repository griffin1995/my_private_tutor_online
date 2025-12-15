// Global type declarations for cookie consent implementation

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    CookieConsent: any;
  }
}

export {};