# ARIA Project - Visual Architecture & Flow Diagrams

## 🎨 Page Layout Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                        HEADER (Fixed)                           │
│  Logo   │ Nav (Features/Pricing/Testimonials) │ Get Started     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    SECTION 1: HERO                              │
│             [Main Headline + CTA Buttons]                       │
│                    Social Proof (100k+)                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              SECTION 2: LOGO TICKER (Animated)                  │
│  [Apple] [Google] [Microsoft] ... [Spotify] [Slack]             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│           SECTION 3: FEATURES GRID (4x4 Cards)                  │
│                                                                 │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                          │
│   │ Call │ │ Call │ │Sched │ │CRM   │                          │
│   │Inbnd │ │Outbd │ │      │ │Sync  │                          │
│   └──────┘ └──────┘ └──────┘ └──────┘                          │
│   ... (16 total features)                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│    SECTION 4: INTELLIGENCE (Dark Theme Grid)                    │
│         [10 Technical Advantages]                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│      SECTION 5: BUSINESS IMPACT (Animated Stats)                │
│                                                                 │
│   <1s Response  +300% Conversions  -80% Costs  99.9% Accuracy  │
│   (with counters animating on scroll)                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│    SECTION 6: SETUP PROCESS (3 Steps)                           │
│                                                                 │
│   ① Connect ──────── ② Integrate ──────── ③ Launch            │
│   Infrastructure     Backend             & Optimize            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│     SECTION 7: TESTIMONIALS (Carousel)                          │
│                                                                 │
│         ┌─────────────────────────────────┐                    │
│         │     Customer Quote (5 Stars)    │                    │
│         │     [Avatar] Name, Role, City   │                    │
│         └─────────────────────────────────┘                    │
│         ← [Dots Navigation] →                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│        SECTION 8: PRICING (4 Columns)                           │
│                                                                 │
│   ┌─────────┬─────────┬──────────┬──────────┐                 │
│   │ 7-Day   │ Starter │ Growth   │Enterprise│                 │
│   │ Trial   │ $497/mo │ $997/mo  │ Custom   │                 │
│   │ $97     │         │(Popular) │          │                 │
│   └─────────┴─────────┴──────────┴──────────┘                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│           SECTION 9: SECURITY & TRUST                           │
│          [GDPR] [256-bit SSL] [SOC2]                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│         SECTION 10: FINAL CTA                                   │
│     [Start Trial] [Speak with ARIA]                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      FOOTER                                     │
│        Logo   │ Privacy | Terms | Contact   │ © 2025           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│      MODAL: Lead Capture Form (GetStartedModal)                │
│      Z-Index: 50                                                │
│      ┌───────────────────────────────────┐                      │
│      │ Get Started with [Plan Name]      │ [X]                │
│      │                                   │                      │
│      │ First Name  │ Last Name           │                      │
│      │ Email       │ Phone Number        │                      │
│      │ Business Type (dropdown)          │                      │
│      │ ☑ Email Consent                   │                      │
│      │ ☑ SMS Consent                     │                      │
│      │ [Continue to Payment]             │                      │
│      └───────────────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│     MODAL: Voice Chat (LiveAgentModal)                         │
│      Z-Index: 50                                                │
│      ┌───────────────────────────────────┐                      │
│      │           [ARIA Status]           │ [X]                │
│      │         ┌──────────────┐          │                      │
│      │         │   🎤 ACTIVE  │          │                      │
│      │         └──────────────┘          │                      │
│      │                                   │                      │
│      │  ARIA is Listening                │                      │
│      │  Start speaking...                │                      │
│      │                                   │                      │
│      │  [🔇 Mute]  [End Call]            │                      │
│      │  Powered by Gemini 3.0            │                      │
│      └───────────────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 User Journey Flows

### Flow 1: Lead Capture to Payment

```
USER LANDS ON ARIA.AI
        │
        ↓
   READS HERO SECTION
   "Professional, Reliable, Limitless"
        │
        ↓
   CLICKS "START 7-DAY TRIAL"
        │
        ↓
   GETSTARTED MODAL OPENS (Form Step)
        │
        ├─→ Enter First Name
        ├─→ Enter Last Name
        ├─→ Enter Email
        ├─→ Enter Phone
        ├─→ Select Business Type
        ├─→ Accept Email Consent
        ├─→ Accept SMS Consent
        │
        ↓
   CLICK "CONTINUE TO PAYMENT"
        │
        ↓
   FORM SUBMITTED
        │
        ├─→ Payload sent to GoHighLevel Webhook
        │   (Contact info, business type, selected plan)
        │
        ├─→ Success response received
        │
        ↓
   GETSTARTED MODAL SHOWS SUCCESS SCREEN
   "You're All Set!"
        │
        ↓
   CLICK "PROCEED TO SECURE CHECKOUT"
        │
        ↓
   REDIRECTED TO STRIPE PAYMENT PAGE
   (via stripeLink environment variable)
        │
        ↓
   COMPLETE PAYMENT
        │
        ↓
   SUBSCRIPTION ACTIVE ✅
```

---

### Flow 2: Live Demo with ARIA

```
USER ON LANDING PAGE
        │
        ↓
   CLICKS "WATCH ARIA IN ACTION" or "TALK WITH ARIA"
        │
        ↓
   LIVEAGENT MODAL OPENS
   Status: "Connecting to ARIA..."
        │
        ↓
   SYSTEM REQUESTS MIC PERMISSION
        │
        ├─→ User grants permission → Proceed
        └─→ User denies permission → Error message
        │
        ↓
   AUDIO CONTEXT INITIALIZED (16kHz input, 24kHz output)
        │
        ↓
   CONNECT TO GEMINI LIVE API
   Model: gemini-2.5-flash-native-audio-preview-09-2025
        │
        ├─→ Connection successful → Status: "ARIA is Listening"
        └─→ Connection failed → Error message
        │
        ↓
   REAL-TIME VOICE CONVERSATION ACTIVE
        │
        ├─→ User speaks into microphone
        ├─→ Audio captured as PCM 16kHz
        ├─→ Sent to Gemini Live API
        ├─→ ARIA processes and responds
        ├─→ Audio response streamed (24kHz)
        ├─→ Decoded and played through speakers
        └─→ Loop continues...
        │
        ↓
   USER CAN TOGGLE MUTE
        │
        ├─→ Mic icon shows current state
        └─→ Prevents audio from being sent while muted
        │
        ↓
   USER CLICKS "END CALL"
        │
        ↓
   CLEANUP RESOURCES
        ├─→ Stop microphone stream
        ├─→ Disconnect audio processors
        ├─→ Close audio contexts
        └─→ Disconnect from Gemini API
        │
        ↓
   MODAL CLOSES ✅
```

---

## 🏗️ Component Hierarchy Tree

```
App
├── Header
│   ├── Logo
│   ├── Nav (Desktop)
│   │   ├── Features Link
│   │   ├── Pricing Link
│   │   └── Testimonials Link
│   ├── Nav (Mobile)
│   │   ├── Menu Toggle
│   │   └── Mobile Menu
│   └── CTA Buttons
│       ├── "Talk with ARIA" 
│       └── "Get Started"
│
├── Main
│   ├── Hero Section
│   │   ├── Headline (Gradient)
│   │   ├── Subheadline
│   │   ├── Dual CTAs
│   │   └── Social Proof
│   │
│   ├── Logo Ticker
│   │   └── Animated Logo Carousel
│   │
│   ├── Features Section
│   │   └── Feature Grid (16 items)
│   │       └── Feature Card (repeated 16x)
│   │
│   ├── Intelligence Section
│   │   └── Intelligence Grid (10 items)
│   │       └── Intelligence Card (repeated 10x)
│   │
│   ├── Impact Stats Section
│   │   └── CountUpStats (repeated 4x)
│   │       ├── Intersection Observer
│   │       ├── Animated Counter
│   │       └── Icon
│   │
│   ├── Setup Process Section
│   │   └── Setup Steps (3 items)
│   │       └── Step Card (repeated 3x)
│   │
│   ├── Testimonials Section
│   │   ├── TestimonialCarousel
│   │   │   ├── Testimonial Card (animated)
│   │   │   ├── 5-Star Rating
│   │   │   ├── Author Info
│   │   │   ├── Dot Navigation
│   │   │   └── Arrow Controls
│   │   └── "Read More Stories" CTA
│   │
│   ├── Pricing Section
│   │   └── Pricing Grid (4 columns)
│   │       └── Pricing Card (repeated 4x)
│   │           ├── Plan Name
│   │           ├── Price
│   │           ├── Feature List
│   │           └── CTA Button
│   │
│   ├── Security Section
│   │   ├── Shield Icon
│   │   ├── Trust Message
│   │   └── Compliance Badges
│   │
│   ├── Final CTA Section
│   │   └── Dual CTAs
│   │
│   ├── Footer
│   │   ├── Logo
│   │   ├── Links
│   │   └── Copyright
│   │
│   └── Mobile Sticky CTA (Mobile only)
│
├── GetStartedModal (Z-index: 50)
│   ├── Form Step
│   │   ├── Input: First Name
│   │   ├── Input: Last Name
│   │   ├── Input: Email
│   │   ├── Input: Phone
│   │   ├── Select: Business Type
│   │   ├── Checkbox: Email Consent
│   │   ├── Checkbox: SMS Consent
│   │   └── Button: Submit
│   │
│   └── Success Step
│       ├── Success Icon
│       ├── Message
│       ├── Button: Proceed to Checkout
│       └── Button: Close
│
└── LiveAgentModal (Z-index: 50)
    ├── Connection Status
    │   ├── ARIA Avatar
    │   ├── Status Text
    │   └── Spinner (if connecting)
    │
    ├── Audio Controls
    │   ├── Mute/Unmute Button
    │   └── End Call Button
    │
    └── Power Attribution
        └── "Powered by Gemini 3.0"
```

---

## 📊 Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                   ARIA LANDING PAGE                             │
└──────────────────────────────────────────────────────────────────┘
                           │
                ┌──────────┼──────────┐
                │          │          │
                ↓          ↓          ↓
         ┌────────────┐ ┌──────────┐ ┌────────────┐
         │   Hero     │ │ Features │ │ Pricing    │
         │ Section    │ │ Grid     │ │ Plans      │
         │ (CTAs)     │ │          │ │ (Stripe)   │
         └────────────┘ └──────────┘ └────────────┘
              │                            │
              ↓                            ↓
         [Get Started]                [Select Plan]
              │                            │
              └──────────────┬─────────────┘
                             │
                     ┌───────↓────────┐
                     │ GetStartedModal│
                     │   (Form Step)  │
                     └───────┬────────┘
                             │
                      [Submit Form]
                             │
                    ┌────────↓────────────┐
                    │  Form Data Object   │
                    │ {firstName, email...│
                    │  selectedPlan}      │
                    └────────┬────────────┘
                             │
                 ┌───────────┼───────────┐
                 │           │           │
                 ↓           ↓           ↓
         ┌──────────┐ ┌────────────┐ ┌──────────┐
         │pushLead  │ │Google GHL  │ │Simulation│
         │ToGHL()   │ │Webhook URL │ │Mode      │
         │          │ │            │ │          │
         └──────────┘ └────────────┘ └──────────┘
                 │
            [Success]
                 │
         ┌───────↓─────────┐
         │GetStartedModal  │
         │(Success Step)   │
         └───────┬─────────┘
                 │
    [Proceed to Checkout]
                 │
          ┌──────↓───────┐
          │Stripe Payment│
          │Link Redirect │
          └──────────────┘
```

---

## 🎤 Gemini API Integration Flow

```
┌────────────────────────────────────────────────┐
│         LiveAgentModal Opens                   │
└────────────────────────────────────────────────┘
              │
              ↓
  [Request Microphone Permission]
              │
              ↓
  ┌──────────────────────────────────┐
  │ Initialize Audio Contexts:       │
  │ • Input: 16kHz (capture)        │
  │ • Output: 24kHz (playback)      │
  └──────────────────────────────────┘
              │
              ↓
  ┌──────────────────────────────────┐
  │ Connect to Gemini Live API       │
  │ • Model: gemini-2.5-flash-...   │
  │ • Voice: Fenrir                  │
  │ • System: AI Receptionist prompt │
  └──────────────────────────────────┘
              │
              ↓
  ┌──────────────────────────────────┐
  │ Callback: onopen                 │
  │ Status: "ARIA is Listening" ✓   │
  └──────────────────────────────────┘
              │
              ↓ (Continuous Loop)
  ┌──────────────────────────────────┐
  │ User Speaks                      │
  │ • Captured at 16kHz              │
  │ • PCM encoded                    │
  │ • Sent to Gemini API             │
  └──────────────────────────────────┘
              │
              ↓
  ┌──────────────────────────────────┐
  │ Callback: onmessage              │
  │ Receive audio response (base64)  │
  │ • Decoded from 24kHz             │
  │ • Created as AudioBuffer         │
  │ • Connected to outputNode        │
  │ • Played through speakers        │
  └──────────────────────────────────┘
              │
              ↓ (Loop to user speaks...)
              
  [User Clicks End Call]
              │
              ↓
  ┌──────────────────────────────────┐
  │ Callback: onclose                │
  │ Cleanup:                         │
  │ • Stop microphone stream         │
  │ • Disconnect processors          │
  │ • Close audio contexts           │
  │ • Disconnect from API            │
  └──────────────────────────────────┘
              │
              ↓
      Modal Closes ✓
```

---

## 🎯 State Management

```
App Component State:
├── isFormOpen: boolean (GetStartedModal visibility)
├── isLiveOpen: boolean (LiveAgentModal visibility)
└── selectedPlan: PricingPlan | null (which plan user selected)

GetStartedModal State:
├── step: 'form' | 'success' (current modal step)
├── isSubmitting: boolean (form submission loading)
└── formData: {
    ├── firstName: string
    ├── lastName: string
    ├── email: string
    ├── phone: string
    ├── businessType: string
    ├── consentEmail: boolean
    └── consentSMS: boolean
    }

LiveAgentModal State:
├── isConnecting: boolean (connecting to API)
├── isConnected: boolean (connection established)
├── isMuted: boolean (microphone muted)
└── error: string | null (error message)

Header Component State:
├── scrolled: boolean (header scrolled past threshold)
└── mobileMenuOpen: boolean (mobile menu visible)

TestimonialCarousel State:
├── currentIndex: number (which testimonial showing)
└── fadeState: 'in' | 'out' (animation state)

CountUpStats State:
├── count: number (animated counter value)
└── hasAnimated: boolean (animation triggered)
```

---

## 📦 Data Structures

```typescript
// User Information
interface GHLPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessType: string;
  sourcePage: string;           // Current URL
  timestamp: string;             // ISO date
  consentEmail: boolean;
  consentSMS: boolean;
  tags: string[];                // For CRM categorization
  selectedPlan?: string;         // Plan name
}

// Pricing Information
interface PricingPlan {
  name: string;                  // "7-Day Trial", "Starter", etc.
  price: string;                 // "$97", "$497", etc.
  period: string;                // "one-time", "/ month"
  features: string[];            // Feature list
  isPopular?: boolean;           // Highlight Growth plan
  cta: string;                   // Button text
  stripeLink?: string;           // Payment link URL
}

// Customer Testimonial
interface Testimonial {
  id: number;
  name: string;                  // "Sarah Jenkins"
  role: string;                  // "Clinic Director"
  location: string;              // "New York, USA"
  quote: string;                 // Customer testimonial
}

// Feature Definition
interface Feature {
  title: string;
  icon: React.ElementType;       // Lucide icon
  color: string;                 // Text color class
  bg: string;                    // Background class
  hover: string;                 // Hover effect class
  border: string;                // Border effect class
}
```

---

## 🔐 Security Flow

```
FORM SUBMISSION
      │
      ├─→ [Client-side validation]
      │   • Required fields check
      │   • Email format validation
      │   • Phone format validation
      │
      ↓
 [HTTPS POST to GoHighLevel]
      │
      ├─→ [Webhook verification]
      │   • Webhook URL validation
      │   • CORS policy check
      │
      ↓
 [GHL Receives Data]
      │
      ├─→ [GHL Security]
      │   • SSL/TLS encryption
      │   • API authentication
      │   • Rate limiting
      │
      ↓
 [Lead Stored in CRM]
      │
      └─→ GDPR compliant ✓
      └─→ Consent recorded ✓
      └─→ No sensitive data in URLs ✓
```

---

## ✨ Animation Timeline

```
Page Load:
  ├─ Hero gradient: animate-shimmer (3s loop)
  ├─ Logo ticker: animate-scroll (40s loop)
  └─ Feature cards: hover:scale + transition

On Scroll to Stats:
  ├─ CountUpStats: Intersection observer triggers
  ├─ Counters: Count from 0 to value (2s duration)
  └─ Icons: animate-pulse (breathing effect)

Testimonial Carousel:
  ├─ Auto-advance: every 6 seconds
  ├─ Fade out: 300ms (opacity 0)
  ├─ Change slide: 300ms delay
  └─ Fade in: 300ms (opacity 100)

LiveAgent Modal:
  ├─ Avatar glow: animate-float (6s infinite)
  ├─ Connection: animate-ping (breathing pulse)
  ├─ Spinner: animate-spin (if connecting)
  └─ Status pulse: animate-pulse (connection indicator)

Button Interactions:
  ├─ Hover: scale + shadow
  ├─ Active: scale-95 (press effect)
  ├─ Focus: ring-2 outline
  └─ Disabled: opacity-50 no-cursor
```

---

This visual guide helps developers understand the complete architecture, data flows, and interactions within the ARIA AI Receptionist landing page.
