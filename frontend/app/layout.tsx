import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import FooterWrapper from '@/components/FooterWrapper';

export const metadata: Metadata = {
  title: 'Samiksha Closet',
  description: 'Elevated essentials for the discerning woman.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="font-body-md overflow-x-hidden">
        <Providers>
          <Navbar />
          <main className="pt-24 min-h-screen">{children}</main>
          <FooterWrapper />
        </Providers>
      </body>
    </html>
  );
}
