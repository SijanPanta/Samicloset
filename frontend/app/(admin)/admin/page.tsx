"use client";
import { useLayoutEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading,user } = useAuth();

  // useLayoutEffect runs before paint, preventing a brief flash of protected UI
  useLayoutEffect(() => {
    if (!isLoading && user?.role !== 'admin') router.replace('/');
  }, [isLoggedIn, isLoading, user, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!isLoggedIn) return null;

  return (
    <div>
      admin ho hai
    </div>
  );
}