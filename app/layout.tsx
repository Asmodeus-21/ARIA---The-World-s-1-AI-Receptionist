import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import { inter } from './fonts';
import '../src/index.css';

export const metadata = {
  title: {
    default: 'ARIA - The World\'s #1 AI Receptionist',
    template: '%s | ARIA',
  },
  description: 'ARIA handles every customer interaction so your business runs nonstop.',
  metadataBase: new URL('https://openaria.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://openaria.app',
    siteName: 'OpenAria',
    title: 'ARIA - The World\'s #1 AI Receptionist',
    description: 'ARIA handles every customer interaction so your business runs nonstop.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Facebook Pixel Code */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
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
              fbq('init', '881547584456534');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=881547584456534&ev=PageView&noscript=1"
            alt=""
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
