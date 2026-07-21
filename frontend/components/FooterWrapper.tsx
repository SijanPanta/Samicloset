'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import { useAuth } from '@/context/AuthContext';

export default function FooterWrapper() {
  const { user } = useAuth();
  const pathname = usePathname();
  if (pathname === '/login'||(pathname === '/admin' && user?.role === 'admin')) return null;
  return <Footer />;
}
