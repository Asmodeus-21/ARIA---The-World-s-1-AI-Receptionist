/**
 * Facebook Pixel Tracking Utilities
 * Client-side tracking for Meta Conversions API
 */

// Declare fbq for TypeScript
declare global {
    interface Window {
        fbq?: (
            action: string,
            eventName: string,
            params?: Record<string, any>
        ) => void;
    }
}

/**
 * Hash email using SHA-256 for privacy-compliant tracking
 * @param email - Email address to hash
 * @returns SHA-256 hashed email in lowercase
 */
async function hashEmail(email: string): Promise<string> {
    const normalized = email.toLowerCase().trim();
    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Track Facebook Pixel events with enhanced data
 * @param eventName - Facebook event name (e.g., 'Lead', 'Purchase', 'InitiateCheckout')
 * @param customData - Additional event data
 */
export async function trackFacebookEvent(
    eventName: string,
    customData?: {
        email?: string;
        value?: number;
        currency?: string;
        content_name?: string;
        [key: string]: any;
    }
) {
    // Check if fbq is available
    if (typeof window === 'undefined' || !window.fbq) {
        console.warn('Facebook Pixel not loaded');
        return;
    }

    try {
        // Prepare user data with hashed email if provided
        const userData: Record<string, any> = {};

        if (customData?.email) {
            userData.em = await hashEmail(customData.email);
        }

        // Get user agent and page URL
        const eventData = {
            ...customData,
            eventID: `${eventName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };

        // Track the event
        window.fbq('track', eventName, eventData);

        console.log(`✅ Facebook Pixel: ${eventName} tracked`, eventData);
    } catch (error) {
        console.error('Facebook Pixel tracking error:', error);
    }
}

/**
 * Track "Lead" event when user clicks CTA buttons
 */
export function trackLeadEvent(source: string) {
    trackFacebookEvent('Lead', {
        content_name: source,
        content_category: 'CTA Button',
    });
}

/**
 * Track "InitiateCheckout" event when user starts trial
 */
export function trackInitiateCheckout(planName: string, value?: number) {
    trackFacebookEvent('InitiateCheckout', {
        content_name: planName,
        value: value || 0,
        currency: 'USD',
    });
}

/**
 * Track "Contact" event when user opens contact form
 */
export function trackContactEvent(source: string) {
    trackFacebookEvent('Contact', {
        content_name: source,
    });
}

/**
 * Track "ViewContent" event for page views
 */
export function trackViewContent(contentName: string) {
    trackFacebookEvent('ViewContent', {
        content_name: contentName,
    });
}
