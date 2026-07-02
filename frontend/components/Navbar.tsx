'use client';

import { useEffect, useState } from 'react';


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
    <nav className={`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="hidden md:flex gap-10 items-center">
          <a className="font-label-caps text-label-caps uppercase tracking-widest text-primary border-b border-primary pb-1" href="#">Collections</a>
          <a className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Lookbook</a>
          <a className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Shop</a>
          <a className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">About</a>
        </div>
        <div className="flex-shrink-0">
          <h1 className="font-headline-md text-headline-md tracking-tighter text-on-surface">Samiksha Closet</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-on-surface hover:opacity-70 transition-opacity duration-300 cursor-pointer">search</span>
          <span className="material-symbols-outlined text-on-surface hover:opacity-70 transition-opacity duration-300 cursor-pointer">shopping_bag</span>
          <a className="material-symbols-outlined text-on-surface hover:opacity-70 transition-opacity duration-300 cursor-pointer" href="/login"> Login</a>
          <span className="md:hidden material-symbols-outlined text-on-surface cursor-pointer">menu</span>
        </div>
      </div>
    </nav>
  );
}
