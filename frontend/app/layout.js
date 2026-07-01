import './globals.css';

export const metadata = {
  title: "Samiksha Closet | Quiet Luxury Boutique",
  description: "Elevated essentials for the discerning woman. Designed in Paris, crafted globally."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body-md overflow-x-hidden">{children}</body>
    </html>
  );
}
