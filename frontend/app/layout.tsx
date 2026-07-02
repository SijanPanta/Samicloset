import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Samiksha Closet',
  description: 'Elevated essentials for the discerning woman.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body-md overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
