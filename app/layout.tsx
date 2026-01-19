import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
      <body className="bg-slate-950 text-white font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
