/**
 * Stripe Webhook Handler
 * Listens for Stripe payment events and sends Purchase events to Facebook Conversions API
 * 
 * Setup Instructions:
 * 1. Install Stripe: npm install stripe
 * 2. Add STRIPE_SECRET_KEY to .env
 * 3. Add STRIPE_WEBHOOK_SECRET to .env (from Stripe Dashboard)
 * 4. Configure webhook in Stripe Dashboard to point to: https://yourdomain.com/api/stripe-webhook
 * 5. Subscribe to events: checkout.session.completed, payment_intent.succeeded
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { trackPurchaseEvent } from '@/utils/facebookConversionsAPI';

// Stripe types (install @types/stripe if needed)
interface StripeEvent {
    id: string;
    type: string;
    data: {
        object: any;
    };
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const headersList = await headers();
        const signature = headersList.get('stripe-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'Missing stripe-signature header' },
                { status: 400 }
            );
        }

        // Verify webhook signature (requires Stripe SDK)
        // Uncomment when Stripe is installed:
        /*
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        
        let event: StripeEvent;
        
        try {
          event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err: any) {
          console.error('Webhook signature verification failed:', err.message);
          return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }
        */

        // For now, parse the body directly (REMOVE THIS when Stripe SDK is added)
        const event: StripeEvent = JSON.parse(body);

        console.log('📥 Stripe webhook received:', event.type);

        // Handle successful checkout
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // Extract customer data
            const customerEmail = session.customer_details?.email || session.customer_email;
            const amountTotal = session.amount_total / 100; // Convert from cents
            const currency = session.currency?.toUpperCase() || 'USD';

            // Determine which plan was purchased
            let planName = 'Unknown Plan';
            if (session.metadata?.plan_name) {
                planName = session.metadata.plan_name;
            } else if (amountTotal === 97) {
                planName = '14-Day Trial';
            } else if (amountTotal === 497) {
                planName = 'Starter Plan';
            } else if (amountTotal === 997) {
                planName = 'Growth Plan';
            }

            console.log('💰 Purchase completed:', {
                email: customerEmail,
                plan: planName,
                amount: amountTotal,
                currency,
            });

            // Send Purchase event to Facebook Conversions API
            const result = await trackPurchaseEvent({
                email: customerEmail,
                value: amountTotal,
                currency: currency,
                contentName: planName,
                sourceUrl: 'https://openaria.app',
                userAgent: req.headers.get('user-agent') || undefined,
                ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined,
            });

            if (result.success) {
                console.log('✅ Facebook Purchase event sent successfully');
            } else {
                console.error('❌ Failed to send Facebook Purchase event:', result.error);
            }
        }

        // Handle successful payment intent (alternative event)
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;

            console.log('💳 Payment succeeded:', {
                amount: paymentIntent.amount / 100,
                currency: paymentIntent.currency,
            });

            // You can also track this if needed
            // await trackPurchaseEvent({ ... });
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}

// Disable body parsing for webhook signature verification
export const config = {
    api: {
        bodyParser: false,
    },
};
