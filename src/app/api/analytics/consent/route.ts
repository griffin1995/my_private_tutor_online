import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface ConsentLogEntry {
  id: string;
  timestamp: string;
  consent: {
    necessary: boolean;
    analytics: boolean;
    functional: boolean;
    marketing: boolean;
    version: string;
  };
  userAgent: string;
  ipAddress: string;
  url: string;
  sessionId: string;
  lawfulBasis: 'consent' | 'legitimate_interest';
  action: 'granted' | 'updated' | 'withdrawn';
}

/**
 * GDPR-compliant consent logging endpoint
 * Records user consent choices for audit and compliance purposes
 * Follows Article 7(1) GDPR requirement to demonstrate consent
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const headersList = await headers();

    // Get real IP address (considering proxies/CDN)
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // Validate consent data structure
    if (!body.consent || typeof body.consent !== 'object') {
      return NextResponse.json(
        { error: 'Invalid consent data structure' },
        { status: 400 }
      );
    }

    const { consent, userAgent, url, sessionId } = body;

    // Create consent log entry
    const consentLog: ConsentLogEntry = {
      id: `consent_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      timestamp: new Date().toISOString(),
      consent: {
        necessary: true, // Always true for essential cookies
        analytics: Boolean(consent.analytics),
        functional: Boolean(consent.functional),
        marketing: Boolean(consent.marketing),
        version: consent.version || '1.0.0',
      },
      userAgent: userAgent || 'unknown',
      ipAddress,
      url: url || 'unknown',
      sessionId: sessionId || 'unknown',
      lawfulBasis: 'consent',
      action: determineAction(consent),
    };

    // Log for audit trail (in production, store in database)
    if (process.env.NODE_ENV === 'development') {
      console.log('[GDPR Consent Log]', {
        timestamp: consentLog.timestamp,
        action: consentLog.action,
        categories: {
          analytics: consentLog.consent.analytics,
          functional: consentLog.consent.functional,
          marketing: consentLog.consent.marketing,
        },
        session: sessionId,
      });
    }

    // In production, you would store this in your database
    // await storeConsentInDatabase(consentLog);

    // Store consent in user's session for immediate use
    const response = NextResponse.json(
      {
        success: true,
        consentId: consentLog.id,
        message: 'Consent recorded successfully',
      },
      { status: 200 }
    );

    // Set consent cookie for server-side rendering
    const consentCookieValue = encodeConsentForCookie(consentLog.consent);
    response.cookies.set('cookie_consent', consentCookieValue, {
      httpOnly: false, // Needs to be readable by client-side
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });

    // Set consent timestamp for audit purposes
    response.cookies.set('consent_timestamp', consentLog.timestamp, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('[Consent Logging Error]', error);
    return NextResponse.json(
      { error: 'Failed to process consent', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * Retrieve current consent status for a session
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    // In production, retrieve from database
    // const consentRecord = await getConsentFromDatabase(sessionId);

    // For now, return from cookie if available
    const consentCookie = request.cookies.get('cookie_consent');
    const timestampCookie = request.cookies.get('consent_timestamp');

    if (!consentCookie) {
      return NextResponse.json(
        {
          hasConsent: false,
          message: 'No consent record found'
        },
        { status: 404 }
      );
    }

    const consent = decodeConsentFromCookie(consentCookie.value);

    return NextResponse.json({
      hasConsent: true,
      consent,
      timestamp: timestampCookie?.value,
      sessionId,
    });

  } catch (error) {
    console.error('[Consent Retrieval Error]', error);
    return NextResponse.json(
      { error: 'Failed to retrieve consent' },
      { status: 500 }
    );
  }
}

/**
 * Handle consent withdrawal (GDPR Article 7(3))
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, reason } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    // Log consent withdrawal
    const withdrawalLog = {
      id: `withdrawal_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      timestamp: new Date().toISOString(),
      sessionId,
      action: 'withdrawn',
      reason: reason || 'user_request',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    };

    console.log('[GDPR Consent Withdrawal]', withdrawalLog);

    // In production, update database record
    // await recordConsentWithdrawal(withdrawalLog);

    // Clear consent cookies
    const response = NextResponse.json({
      success: true,
      message: 'Consent withdrawn successfully',
      withdrawalId: withdrawalLog.id,
    });

    response.cookies.delete('cookie_consent');
    response.cookies.delete('consent_timestamp');

    return response;

  } catch (error) {
    console.error('[Consent Withdrawal Error]', error);
    return NextResponse.json(
      { error: 'Failed to process withdrawal' },
      { status: 500 }
    );
  }
}

/**
 * Utility functions
 */

function determineAction(consent: any): 'granted' | 'updated' | 'withdrawn' {
  const hasAnyNonEssential = consent.analytics || consent.functional || consent.marketing;

  if (!hasAnyNonEssential) {
    return 'withdrawn';
  }

  // In a real implementation, you'd compare with previous state
  return 'granted';
}

function encodeConsentForCookie(consent: ConsentLogEntry['consent']): string {
  // Simple base64 encoding for cookie storage
  const consentString = JSON.stringify({
    n: consent.necessary ? 1 : 0,
    a: consent.analytics ? 1 : 0,
    f: consent.functional ? 1 : 0,
    m: consent.marketing ? 1 : 0,
    v: consent.version,
  });

  return Buffer.from(consentString).toString('base64');
}

function decodeConsentFromCookie(cookieValue: string): ConsentLogEntry['consent'] | null {
  try {
    const decoded = Buffer.from(cookieValue, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded);

    return {
      necessary: Boolean(parsed.n),
      analytics: Boolean(parsed.a),
      functional: Boolean(parsed.f),
      marketing: Boolean(parsed.m),
      version: parsed.v || '1.0.0',
    };
  } catch {
    return null;
  }
}

// Example database schema for production use:
/*
CREATE TABLE consent_logs (
  id VARCHAR(255) PRIMARY KEY,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  session_id VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  url VARCHAR(2048),
  consent_necessary BOOLEAN NOT NULL DEFAULT TRUE,
  consent_analytics BOOLEAN NOT NULL DEFAULT FALSE,
  consent_functional BOOLEAN NOT NULL DEFAULT FALSE,
  consent_marketing BOOLEAN NOT NULL DEFAULT FALSE,
  consent_version VARCHAR(10) NOT NULL DEFAULT '1.0.0',
  lawful_basis VARCHAR(50) NOT NULL DEFAULT 'consent',
  action VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session_id (session_id),
  INDEX idx_timestamp (timestamp),
  INDEX idx_action (action)
);
*/