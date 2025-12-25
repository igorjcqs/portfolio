import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { LoadingScreen } from '@/components/LoadingScreen';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.example.com'),
  title: 'Portfolio',
  description: 'Personal Portfolio & Research',
  openGraph: {
    title: 'Portfolio',
    description: 'Personal Portfolio & Research',
    type: 'website',
    images: ['/opengraph.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio',
    description: 'Personal Portfolio & Research',
    images: ['/opengraph.jpg'],
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <TooltipProvider>
          <LoadingScreen>
            <Toaster />
            {children}
          </LoadingScreen>
        </TooltipProvider>
      </body>
    </html>
  );
}
