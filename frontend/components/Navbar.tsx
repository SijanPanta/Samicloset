'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Collections', href: '#' },
  { label: 'Lookbook', href: '#' },
  { label: 'Shop', href: '/product' },
  { label: 'About', href: '#' },
  { label: 'Admin', href: '/admin' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, user, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    router.push('/');
  };

  const firstName = user?.name?.split(' ')[0] ?? '';

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-surface/90 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'}`}>
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-10 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`font-label-caps text-label-caps uppercase tracking-widest transition-all duration-300 relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-primary after:w-full'
                      : 'text-on-surface-variant hover:text-primary after:w-0 hover:after:w-full'
                  }`}
                >{
                    link.label === 'Admin' && user?.role !== 'admin' ? null : link.label
                  }
                </a>
              );
            })}
          </div>

          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <h1 className="font-headline-md text-headline-md tracking-tighter text-on-surface">Samiksha Closet</h1>
          </a>

          {/* Right icons */}
          <div className="flex items-center gap-6">
            <button className="material-symbols-outlined text-on-surface hover:opacity-70 transition-opacity duration-300 cursor-pointer" aria-label="Search">search</button>
            <button className="material-symbols-outlined text-on-surface hover:opacity-70 transition-opacity duration-300 cursor-pointer relative" aria-label="Shopping bag">
              shopping_bag
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-on-primary text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-label-caps">0</span>
            </button>

            {/* Desktop auth */}
            {!isLoading && (
              isLoggedIn ? (
                <div className="hidden md:flex items-center gap-4">
                  <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
                    Hi, {firstName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <a
                  className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300 hidden md:block"
                  href="/login"
                >
                  Sign In
                </a>
              )
            )}

            {/* Mobile auth icon */}
            {!isLoading && (
              isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="material-symbols-outlined text-on-surface hover:opacity-70 transition-opacity duration-300 cursor-pointer md:hidden"
                  aria-label="Sign out"
                >
                  logout
                </button>
              ) : (
                <a
                  className="material-symbols-outlined text-on-surface hover:opacity-70 transition-opacity duration-300 cursor-pointer md:hidden"
                  href="/login"
                  aria-label="Sign in"
                >
                  login
                </a>
              )
            )}

            <button
              className="md:hidden material-symbols-outlined text-on-surface cursor-pointer transition-transform duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-80 bg-surface shadow-2xl transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="pt-28 px-margin-mobile flex flex-col gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-headline-sm text-headline-sm transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-on-surface hover:text-primary'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <hr className="border-outline-variant/30 my-4" />
            {!isLoading && (
              isLoggedIn ? (
                <div className="flex flex-col gap-4">
                  <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
                    Hi, {firstName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-left font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <a
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300"
                >
                  Sign In
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
