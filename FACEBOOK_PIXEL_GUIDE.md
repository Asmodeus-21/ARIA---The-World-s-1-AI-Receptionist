# Facebook Pixel Implementation Guide

## Overview
Facebook Pixel tracking has been successfully integrated into your OpenAria website. All CTA buttons now track conversion events client-side using the standard Facebook Pixel.

## What Was Implemented

### 1. Tracking Utility (`utils/facebookPixel.ts`)
Created a comprehensive tracking utility with:
- **Email hashing**: SHA-256 hashing for privacy-compliant tracking
- **Event deduplication**: Unique event IDs to prevent duplicate tracking
- **Standard event helpers**: Pre-configured functions for common events

### 2. Tracked Events

#### **InitiateCheckout Event**
Fired when users click "Start 14-Day Trial" buttons:
- Hero section (main page)
- Pricing cards
- Footer CTA
- Mobile sticky CTA
- AI Receptionist page
- AI Call Answering page

**Event Data:**
```javascript
{
  content_name: "14-Day Trial",
  value: 97,
  currency: "USD"
}
```

#### **Lead Event**
Fired when users click demo/contact buttons:
- "Watch OpenAria in Action"
- "Talk with ARIA" (Navbar)
- "Get Started" (Navbar)
- "See Demo" buttons
- "Schedule Demo" buttons

**Event Data:**
```javascript
{
  content_name: "Button Source Name",
  content_category: "CTA Button"
}
```

### 3. Modified Components
The following components now include Facebook Pixel tracking:

1. **App.tsx** - Main homepage buttons
2. **components/Navbar.tsx** - Navigation CTA buttons
3. **components/AIReceptionistPage.tsx** - AI Receptionist page CTAs
4. **components/AICallAnsweringPage.tsx** - Call Answering page CTAs

## Installation Steps

### Step 1: Get Your Facebook Pixel ID
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Select your Pixel or create a new one
3. Copy your Pixel ID (it's a 15-16 digit number)

### Step 2: Install the Pixel Base Code

Add this code to your `app/layout.tsx` file in the `<head>` section:

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Facebook Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID_HERE');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID_HERE&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="bg-slate-950 text-white font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**Replace `YOUR_PIXEL_ID_HERE` with your actual Pixel ID in both places.**

### Step 3: Verify Installation

1. **Install Facebook Pixel Helper Chrome Extension**
   - [Download here](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)

2. **Test Your Events**
   - Visit your website
   - Click on various CTA buttons
   - Check the Pixel Helper extension to see events firing
   - You should see:
     - `PageView` on page load
     - `InitiateCheckout` when clicking trial buttons
     - `Lead` when clicking demo/contact buttons

3. **Check Facebook Events Manager**
   - Go to Events Manager
   - Click on your Pixel
   - Go to "Test Events" tab
   - You should see events appearing in real-time

## Event Tracking Details

### All Tracked Buttons

| Button Text | Location | Event Type | Event Name |
|------------|----------|------------|------------|
| Start 14-Day Trial | Hero | InitiateCheckout | 14-Day Trial |
| Watch OpenAria in Action | Hero | Lead | Hero - Watch Demo |
| Start 14-Day Trial | Pricing Cards | InitiateCheckout | Plan Name |
| Start 14-Day Trial | Footer CTA | InitiateCheckout | 14-Day Trial - Footer CTA |
| Speak with ARIA | Footer CTA | Lead | Footer CTA - Speak with ARIA |
| Talk with ARIA | Navbar | Lead | Navbar - Talk with ARIA |
| Get Started | Navbar | Lead | Navbar - Get Started |
| Start 14-Day Trial | Mobile Sticky | InitiateCheckout | 14-Day Trial - Mobile Sticky |

## Advanced Features

### Email Hashing
The tracking utility includes SHA-256 email hashing for privacy compliance:

```typescript
import { trackFacebookEvent } from './utils/facebookPixel';

// Track with user email (automatically hashed)
await trackFacebookEvent('Lead', {
  email: 'user@example.com',
  content_name: 'Contact Form'
});
```

### Custom Events
You can track custom events anywhere in your code:

```typescript
import { trackFacebookEvent } from './utils/facebookPixel';

// Track custom event
trackFacebookEvent('CustomEvent', {
  content_name: 'Feature Name',
  value: 100,
  currency: 'USD'
});
```

## Troubleshooting

### Events Not Firing?
1. Check browser console for errors
2. Verify Pixel ID is correct in `app/layout.tsx`
3. Ensure ad blockers are disabled
4. Check Facebook Pixel Helper extension

### Events Firing Multiple Times?
- Each event has a unique `eventID` to prevent duplicates
- Facebook automatically deduplicates events with the same ID

### Need to Track More Events?
Add tracking to any button:

```tsx
import { trackLeadEvent } from '../utils/facebookPixel';

<button onClick={() => {
  trackLeadEvent('Button Source Name');
  // Your existing onClick logic
}}>
  Click Me
</button>
```

## Next Steps

1. **Set Up Conversions API (Server-Side)**
   - For more accurate tracking, implement server-side events
   - Reduces impact of ad blockers and iOS privacy features
   - See Facebook's Conversions API documentation

2. **Create Custom Conversions**
   - In Events Manager, create custom conversions
   - Use these for campaign optimization

3. **Set Up Event Match Quality**
   - Add more user data (phone, address) for better matching
   - Improves ad targeting accuracy

## Support

For questions or issues:
- Facebook Pixel Documentation: https://developers.facebook.com/docs/meta-pixel
- Events Manager: https://business.facebook.com/events_manager
- Meta Business Help Center: https://www.facebook.com/business/help
