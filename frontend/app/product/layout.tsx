'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace(
        `/login?redirect=${encodeURIComponent(pathname)}`,
      );
    }
  }, [isLoading, isLoggedIn, pathname, router]);

  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  if (!isLoggedIn) {
    return null;
  }

  return children;
}
