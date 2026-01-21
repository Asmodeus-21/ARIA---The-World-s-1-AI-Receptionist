# Facebook Conversions API Setup Guide

## ✅ Current Status

### Completed
- ✅ **Access Token Saved**: Securely stored in `.env` file
- ✅ **Pixel ID Configured**: 881547584456534
- ✅ **Server-Side Utility Created**: `utils/facebookConversionsAPI.ts`
- ✅ **Stripe Webhook Handler Created**: `app/api/stripe-webhook/route.ts`

### Environment Variables
```bash
FB_ACCESS_TOKEN=EAARPSp4Gka0BQhgWWZCBQD9PjRpS8ZAZCAzPsmGf10ubGpTdY8IeYrEqFOMIlspUp1SH0jlJhLYDF9WoOaXt00rk0rAroWLp8ZChv9g3nW1CL260j0x2mp64KBQFGRc8fKGOLZAt0Uc2XzaCj40ZA2iMLIU81YrsYr3gy96oHgawwHz42AXZBAj8TaTiOKB2ZB1CcQZDZD
FB_PIXEL_ID=881547584456534
```

## 🚀 Next Steps to Complete Setup

### Step 1: Install Stripe SDK (Required)

```bash
npm install stripe
npm install --save-dev @types/stripe
```

### Step 2: Add Stripe Credentials to .env

Add these to your `.env` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_... # Get from Stripe Dashboard
STRIPE_WEBHOOK_SECRET=whsec_... # Get from Stripe Webhook settings
```

**Where to find these:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. **Secret Key**: Developers → API keys → Secret key
3. **Webhook Secret**: Developers → Webhooks → Add endpoint → Copy signing secret

### Step 3: Configure Stripe Webhook

1. **Go to Stripe Dashboard** → Developers → Webhooks
2. **Click "Add endpoint"**
3. **Endpoint URL**: `https://openaria.app/api/stripe-webhook`
4. **Select events to listen to**:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
5. **Copy the Signing Secret** and add to `.env` as `STRIPE_WEBHOOK_SECRET`

### Step 4: Uncomment Stripe Verification Code

In `app/api/stripe-webhook/route.ts`, uncomment lines 38-49 to enable webhook signature verification:

```typescript
// UNCOMMENT THIS SECTION:
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

let event: StripeEvent;

try {
  event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
} catch (err: any) {
  console.error('Webhook signature verification failed:', err.message);
  return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
}

// REMOVE THIS LINE:
// const event: StripeEvent = JSON.parse(body);
```

### Step 5: Add Plan Metadata to Stripe Products (Optional but Recommended)

When creating Stripe payment links, add metadata to identify the plan:

1. Go to Stripe Dashboard → Products
2. Edit each product
3. Add metadata:
   - Key: `plan_name`
   - Value: `14-Day Trial` or `Starter Plan` or `Growth Plan`

This helps the webhook identify which plan was purchased.

## 📊 How It Works

### Purchase Flow

```
User clicks "Start 14-Day Trial"
    ↓
Redirects to Stripe Checkout
    ↓
User completes payment
    ↓
Stripe sends webhook to /api/stripe-webhook
    ↓
Webhook extracts customer data (email, amount, plan)
    ↓
Sends Purchase event to Facebook Conversions API
    ↓
Facebook receives server-side Purchase event
    ↓
Event appears in Events Manager
```

### Data Sent to Facebook

```javascript
{
  "event_name": "Purchase",
  "event_time": 1737456789,
  "action_source": "website",
  "event_source_url": "https://openaria.app",
  "user_data": {
    "em": ["hashed_email_sha256"],
    "client_ip_address": "192.168.1.1",
    "client_user_agent": "Mozilla/5.0..."
  },
  "custom_data": {
    "currency": "USD",
    "value": 97,
    "content_name": "14-Day Trial"
  }
}
```

## 🧪 Testing the Webhook

### Test with Stripe CLI

1. **Install Stripe CLI**: https://stripe.com/docs/stripe-cli
2. **Login**: `stripe login`
3. **Forward webhooks to local**:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```
4. **Trigger test event**:
   ```bash
   stripe trigger checkout.session.completed
   ```

### Test with Stripe Dashboard

1. Go to Developers → Webhooks
2. Click on your webhook endpoint
3. Click "Send test webhook"
4. Select `checkout.session.completed`
5. Check your server logs for the event

## 📈 Verify Events in Facebook

### Check Events Manager

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Select Pixel ID: 881547584456534
3. Go to "Test Events" tab
4. Make a test purchase
5. You should see:
   - **Event Name**: Purchase
   - **Value**: Transaction amount
   - **Currency**: USD
   - **Content Name**: Plan name

### Event Match Quality

Facebook shows "Event Match Quality" score based on how much user data you send:

- ✅ Email (hashed) - **High priority**
- ✅ IP Address - Medium priority
- ✅ User Agent - Medium priority
- ⚠️ Phone (optional) - High priority
- ⚠️ First Name (optional) - Low priority
- ⚠️ Last Name (optional) - Low priority

**Current implementation sends**: Email, IP, User Agent

## 🔒 Security Best Practices

### ✅ Already Implemented
- Access token stored in `.env` (not in code)
- Email hashing with SHA-256
- Server-side only (no client exposure)

### 🔐 Additional Recommendations
1. **Rotate Access Token** every 90 days
2. **Use Stripe webhook signature verification** (Step 4 above)
3. **Monitor webhook logs** for suspicious activity
4. **Set up IP allowlisting** in Stripe if possible

## 🐛 Troubleshooting

### Webhook Not Receiving Events

**Check:**
- ✅ Webhook URL is correct: `https://openaria.app/api/stripe-webhook`
- ✅ Webhook is enabled in Stripe Dashboard
- ✅ Events are selected: `checkout.session.completed`
- ✅ Server is running and accessible

**Debug:**
```bash
# Check webhook logs in Stripe Dashboard
# Look for 200 OK responses
# If 4xx/5xx errors, check server logs
```

### Facebook Events Not Appearing

**Check:**
- ✅ `FB_ACCESS_TOKEN` is correct in `.env`
- ✅ `FB_PIXEL_ID` is correct (881547584456534)
- ✅ Access token has not expired
- ✅ Server logs show "✅ Facebook Purchase event sent successfully"

**Debug:**
```bash
# Check server logs for errors
# Verify access token in Facebook Events Manager
# Test with curl:
curl -X POST "https://graph.facebook.com/v18.0/881547584456534/events" \
  -H "Content-Type: application/json" \
  -d '{
    "data": [{
      "event_name": "Purchase",
      "event_time": '$(date +%s)',
      "action_source": "website",
      "user_data": {"em": ["test@example.com"]},
      "custom_data": {"value": 97, "currency": "USD"}
    }],
    "access_token": "YOUR_ACCESS_TOKEN"
  }'
```

### Email Not Being Hashed

**Check:**
- Email is being passed to `trackPurchaseEvent()`
- Email is normalized (lowercase, trimmed)
- Hash function is working correctly

**Debug:**
```typescript
// Add logging in utils/facebookConversionsAPI.ts
console.log('Original email:', data.email);
console.log('Hashed email:', hashData(data.email));
```

## 📚 Additional Resources

- **Facebook Conversions API Docs**: https://developers.facebook.com/docs/marketing-api/conversions-api
- **Stripe Webhooks Guide**: https://stripe.com/docs/webhooks
- **Event Match Quality**: https://www.facebook.com/business/help/765081237991954

## 🎯 Success Metrics

Once fully set up, you should see:

### In Stripe Dashboard
- ✅ Webhook endpoint showing 200 OK responses
- ✅ Events being delivered successfully

### In Facebook Events Manager
- ✅ Purchase events appearing in real-time
- ✅ Event Match Quality score > 5.0
- ✅ Conversion value being tracked
- ✅ Attribution data available

### In Your Server Logs
```
📥 Stripe webhook received: checkout.session.completed
💰 Purchase completed: { email: 'user@example.com', plan: '14-Day Trial', amount: 97, currency: 'USD' }
✅ Facebook Purchase event sent successfully
```

---

**Status**: ⚠️ **Partially Complete** - Requires Stripe SDK installation and webhook configuration

**Next Action**: Install Stripe SDK and configure webhook endpoint
