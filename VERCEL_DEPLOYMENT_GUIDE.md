# Vercel Deployment Guide - OpenAria Web

## Pre-Deployment Checklist

### ✅ Completed Optimizations

1. **File Cleanup**
   - ✅ Moved 45 diagnostic .md files to `/docs` directory
   - ✅ Removed 6 legacy Vite configuration files
   - ✅ Cleaned up root directory for production

2. **Configuration Updates**
   - ✅ Optimized `next.config.js` with SWC minification
   - ✅ Added package import optimization for lucide-react and @vercel/analytics
   - ✅ Configured image optimization for external sources
   - ✅ Added security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)

3. **Package Optimizations**
   - ✅ Removed `react-helmet-async` (replaced by Next.js metadata)
   - ✅ Removed `@vitejs/plugin-react` and `vite` (no longer needed)
   - ✅ Added `@vercel/speed-insights` for performance monitoring
   - ✅ Added `@next/bundle-analyzer` for bundle analysis

4. **Code Optimizations**
   - ✅ Implemented dynamic imports for GetStartedModal, AriaVoiceOverlay, and TestimonialCarousel
   - ✅ Replaced `<img>` tags with `next/image` for optimized loading
   - ✅ Moved Analytics to root layout (applies globally)
   - ✅ Added SpeedInsights to root layout
   - ✅ Implemented font optimization with `next/font`
   - ✅ Simplified environment variable handling (Next.js convention only)

---

## Environment Variables Setup

Before deploying to Vercel, configure the following environment variables:

### Required Variables

| Variable Name | Description | Example |
|--------------|-------------|---------|
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` | ElevenLabs voice agent ID | `agent_4501kckg7737f2dtvd8589hzj5b7` |
| `NEXT_PUBLIC_STRIPE_TRIAL_LINK` | Stripe payment link for trial plan | `https://buy.stripe.com/...` |
| `NEXT_PUBLIC_STRIPE_STARTER_LINK` | Stripe payment link for starter plan | `https://buy.stripe.com/...` |
| `NEXT_PUBLIC_STRIPE_GROWTH_LINK` | Stripe payment link for growth plan | `https://buy.stripe.com/...` |

### Setting Environment Variables in Vercel

#### Via Vercel Dashboard:
1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with the appropriate value
4. Select environments: **Production**, **Preview**, **Development**

#### Via Vercel CLI:
```bash
vercel env add NEXT_PUBLIC_ELEVENLABS_AGENT_ID production
vercel env add NEXT_PUBLIC_STRIPE_TRIAL_LINK production
vercel env add NEXT_PUBLIC_STRIPE_STARTER_LINK production
vercel env add NEXT_PUBLIC_STRIPE_GROWTH_LINK production
```

---

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Vercel will auto-detect Next.js configuration

2. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

3. **Add Environment Variables**
   - Add all required environment variables (see above)
   - Make sure to add them for all environments

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link project (first time only)
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_ELEVENLABS_AGENT_ID production
vercel env add NEXT_PUBLIC_STRIPE_TRIAL_LINK production
vercel env add NEXT_PUBLIC_STRIPE_STARTER_LINK production
vercel env add NEXT_PUBLIC_STRIPE_GROWTH_LINK production

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Post-Deployment Verification

### 1. Check Build Status
- ✅ Build completed successfully
- ✅ No TypeScript errors
- ✅ No build warnings

### 2. Test Core Functionality
- [ ] Homepage loads correctly
- [ ] Navigation works (Features, Pricing, Testimonials)
- [ ] "Get Started" modal opens and closes
- [ ] Voice overlay connects to ElevenLabs
- [ ] Pricing plan CTAs work
- [ ] Footer links work
- [ ] Mobile responsive design works

### 3. Verify Performance
- [ ] Check Vercel Analytics dashboard
- [ ] Verify Speed Insights is collecting data
- [ ] Run Lighthouse audit (target: 90+ performance score)
- [ ] Check Core Web Vitals:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

### 4. Test SEO
- [ ] Visit `https://openaria.app/sitemap.xml`
- [ ] Visit `https://openaria.app/robots.txt`
- [ ] Check meta tags in page source
- [ ] Verify OpenGraph tags
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)

### 5. Test Images
- [ ] Hero section avatars load (optimized with next/image)
- [ ] Images are served in WebP/AVIF format
- [ ] No layout shift on image load

---

## Performance Monitoring

### Vercel Analytics
Access at: `https://vercel.com/[your-team]/openaria-web/analytics`

Metrics to monitor:
- Page views
- Unique visitors
- Top pages
- Geographic distribution

### Speed Insights
Access at: `https://vercel.com/[your-team]/openaria-web/speed-insights`

Core Web Vitals:
- **LCP** (Largest Contentful Paint): Target < 2.5s
- **FID** (First Input Delay): Target < 100ms
- **CLS** (Cumulative Layout Shift): Target < 0.1
- **TTFB** (Time to First Byte): Target < 600ms

---

## Troubleshooting

### Build Fails with TypeScript Errors
**Solution**: Run `npm install` locally and fix any TypeScript errors before deploying.

### Environment Variables Not Working
**Solution**: 
1. Verify variables are prefixed with `NEXT_PUBLIC_`
2. Check they're set for the correct environment (Production/Preview/Development)
3. Redeploy after adding variables

### Images Not Loading
**Solution**: 
1. Check `next.config.js` has correct `remotePatterns` configuration
2. Verify image URLs are accessible
3. Check Vercel logs for image optimization errors

### Analytics Not Showing Data
**Solution**:
1. Wait 24 hours for initial data collection
2. Verify `@vercel/analytics` is installed
3. Check that `<Analytics />` component is in root layout

### Slow Build Times
**Solution**:
1. Check bundle size with `npm run analyze`
2. Verify dynamic imports are working
3. Consider adding more routes to ISR if applicable

---

## Rollback Procedure

If issues arise after deployment:

### Via Vercel Dashboard:
1. Go to **Deployments** tab
2. Find the last working deployment
3. Click "..." menu → "Promote to Production"

### Via Vercel CLI:
```bash
# List recent deployments
vercel ls

# Promote a specific deployment
vercel promote <deployment-url>
```

---

## Next Steps (Optional Enhancements)

1. **Edge Functions**: Move API routes to Edge Runtime for faster response times
2. **ISR**: Implement Incremental Static Regeneration for `/solutions/*` pages
3. **Middleware**: Add edge middleware for A/B testing
4. **Image CDN**: Migrate static assets to Vercel's Image Optimization
5. **Caching Strategy**: Implement advanced caching with `stale-while-revalidate`

---

## Support

For deployment issues:
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Vercel Support: https://vercel.com/support

---

## Summary of Changes

### Files Modified:
- `next.config.js` - Production optimizations
- `package.json` - Dependency updates
- `tsconfig.json` - TypeScript cleanup
- `app/layout.tsx` - Font optimization, Analytics, Speed Insights
- `App.tsx` - Dynamic imports, image optimization, code cleanup

### Files Created:
- `app/fonts.ts` - Font configuration
- `docs/` - Directory for documentation (45 files moved)

### Files Deleted:
- `vite.config.ts`
- `vite-env.d.ts`
- `vite-plugin-canonical.ts`
- `index.html`
- `index.tsx`
- `jsconfig.json`

### Dependencies Added:
- `@vercel/speed-insights`
- `@next/bundle-analyzer`

### Dependencies Removed:
- `react-helmet-async`
- `@vitejs/plugin-react`
- `vite`

---

**Ready for Production Deployment** ✅
