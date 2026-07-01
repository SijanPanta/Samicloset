import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Samiksha Closet | Quiet Luxury Boutique',
  description: 'Elevated essentials for the discerning woman. Designed in Paris, crafted globally.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body-md overflow-x-hidden">{children}</body>
    </html>
  );
}
