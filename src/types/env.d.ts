/**
 * TypeScript declarations for environment variables
 * Provides type safety and eliminates TS4111 bracket notation errors
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Node.js environment
      readonly NODE_ENV: 'development' | 'production' | 'test';

      // Payload CMS configuration
      readonly PAYLOAD_SECRET: string;
      readonly DATABASE_URL: string;
      readonly BLOB_READ_WRITE_TOKEN: string;

      // Server configuration
      readonly SERVER_URL: string;
      readonly VERCEL_URL?: string;

      // SEO and verification
      readonly GOOGLE_VERIFICATION_CODE?: string;
      readonly BING_VERIFICATION_CODE?: string;

      // Analytics
      readonly NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;

      // Admin credentials
      readonly ADMIN_EMAIL?: string;
      readonly ADMIN_PASSWORD?: string;

      // Debug flags
      readonly NEXT_PUBLIC_ENABLE_PESTICIDE?: string;
    }
  }
}

export {};