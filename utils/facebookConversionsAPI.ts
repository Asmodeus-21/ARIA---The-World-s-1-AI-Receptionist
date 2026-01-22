/**
 * Facebook Conversions API Server-Side Utility
 * Sends events to Facebook from the server for better tracking accuracy
 */

import crypto from 'crypto';

interface FacebookEventData {
    event_name: string;
    event_time: number;
    action_source: string;
    event_source_url: string;
    user_data: {
        em?: string[]; // Hashed email
        ph?: string[]; // Hashed phone
        client_ip_address?: string;
        client_user_agent?: string;
        fbc?: string; // Facebook click ID
        fbp?: string; // Facebook browser ID
    };
    custom_data?: {
        currency?: string;
        value?: number;
        content_name?: string;
        [key: string]: any;
    };
}

/**
 * Hash data using SHA-256
 */
function hashData(data: string): string {
    return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

/**
 * Send event to Facebook Conversions API
 */
export async function sendFacebookConversionEvent(
    eventData: Partial<FacebookEventData>
): Promise<{ success: boolean; error?: string }> {
    const accessToken = process.env.FB_ACCESS_TOKEN;
    const pixelId = process.env.FB_PIXEL_ID;

    if (!accessToken || !pixelId) {
        console.error('Missing Facebook Conversions API credentials');
        return { success: false, error: 'Missing credentials' };
    }

    const url = `https://graph.facebook.com/v18.0/${pixelId}/events`;

    // Prepare the event payload
    const payload = {
        data: [
            {
                event_name: eventData.event_name || 'PageView',
                event_time: eventData.event_time || Math.floor(Date.now() / 1000),
                action_source: eventData.action_source || 'website',
                event_source_url: eventData.event_source_url || 'https://openaria.app',
                user_data: eventData.user_data || {},
                custom_data: eventData.custom_data || {},
            },
        ],
        access_token: accessToken,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('Facebook Conversions API error:', result);
            return { success: false, error: result.error?.message || 'Unknown error' };
        }

        console.log('✅ Facebook Conversions API event sent:', eventData.event_name);
        return { success: true };
    } catch (error) {
        console.error('Failed to send Facebook Conversions API event:', error);
        return { success: false, error: String(error) };
    }
}

/**
 * Track a Purchase event
 */
export async function trackPurchaseEvent(data: {
    email?: string;
    phone?: string;
    value: number;
    currency: string;
    contentName: string;
    userAgent?: string;
    ipAddress?: string;
    sourceUrl?: string;
}) {
    const userData: FacebookEventData['user_data'] = {};

    // Hash email if provided
    if (data.email) {
        userData.em = [hashData(data.email)];
    }

    // Hash phone if provided
    if (data.phone) {
        // Remove all non-numeric characters
        const cleanPhone = data.phone.replace(/\D/g, '');
        userData.ph = [hashData(cleanPhone)];
    }

    // Add IP and User Agent
    if (data.ipAddress) {
        userData.client_ip_address = data.ipAddress;
    }

    if (data.userAgent) {
        userData.client_user_agent = data.userAgent;
    }

    return sendFacebookConversionEvent({
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: data.sourceUrl || 'https://openaria.app',
        user_data: userData,
        custom_data: {
            currency: data.currency,
            value: data.value,
            content_name: data.contentName,
        },
    });
}

/**
 * Track a Lead event
 */
export async function trackLeadEventServer(data: {
    email?: string;
    phone?: string;
    contentName: string;
    userAgent?: string;
    ipAddress?: string;
    sourceUrl?: string;
}) {
    const userData: FacebookEventData['user_data'] = {};

    if (data.email) {
        userData.em = [hashData(data.email)];
    }

    if (data.phone) {
        const cleanPhone = data.phone.replace(/\D/g, '');
        userData.ph = [hashData(cleanPhone)];
    }

    if (data.ipAddress) {
        userData.client_ip_address = data.ipAddress;
    }

    if (data.userAgent) {
        userData.client_user_agent = data.userAgent;
    }

    return sendFacebookConversionEvent({
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: data.sourceUrl || 'https://openaria.app',
        user_data: userData,
        custom_data: {
            content_name: data.contentName,
        },
    });
}
