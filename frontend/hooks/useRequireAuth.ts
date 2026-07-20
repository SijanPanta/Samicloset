'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useRequireAuth() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Wraps any protected action. If the user is not logged in,
   * redirects to /login instead of running the action.
   *
   * Usage:
   *   const { guard } = useRequireAuth();
   *   <button onClick={() => guard(() => addToCart(item))}>Add to cart</button>
   */
  const guard = useCallback(
    (action: () => void, redirectTo?: string) => {
      if (!isLoggedIn) {
        const destination = redirectTo ?? pathname;
        router.push(`/login?redirect=${encodeURIComponent(destination)}`);
        return;
      }
      action();
    },
    [isLoggedIn, router, pathname],
  );

  return { isLoggedIn, user, guard };
}
