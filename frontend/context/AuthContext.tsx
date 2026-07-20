'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getMe, logout as logoutApi } from '@/app/api/auth';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, rehydrate session if a token is stored
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    getMe()
      .then(({ user }) => setUser(user))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setIsLoading(false));
  }, []);

  const setAuth = (token: string, user: AuthUser) => {
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch {
      // ignore network errors on logout
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
