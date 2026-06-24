// app/layout.tsx
import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Noba — Developer & Founder',
  description: 'Solo founder and full-stack developer building AI products from Nagaland, India. Open to frontend and full-stack internships.',
  keywords: ['Next.js developer', 'full-stack developer', 'AI', 'Nagaland', 'edtech', 'Supabase', 'Gemini'],
  openGraph: {
    title: 'Noba — Developer & Founder',
    description: 'Building AI products from Northeast India, solo.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      // No 'dark' class — the editorial theme is light
    >
      <body
        className="font-sans antialiased"
        style={{
          background: '#F7F4EF',
          color: '#1A1A18',
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  );
}