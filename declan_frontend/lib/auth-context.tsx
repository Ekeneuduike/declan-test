'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from './types';
import { mockSeekers, mockEmployers } from './mock-data';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isLoggedIn: boolean;
  walletConnected: boolean;
  walletAddress: string | null;
  login: (userId: string, role: UserRole) => void;
  logout: () => void;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  isHydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load auth state from localStorage on mount
  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('auth_role') as UserRole | null;
      const storedUserId = localStorage.getItem('auth_userId');
      const storedWalletAddress = localStorage.getItem('auth_walletAddress');

      if (storedRole && storedUserId) {
        if (storedRole === 'seeker') {
          const seeker = mockSeekers[storedUserId];
          if (seeker) {
            setUser(seeker);
            setRole('seeker');
          }
        } else if (storedRole === 'employer') {
          const employer = mockEmployers[storedUserId];
          if (employer) {
            setUser(employer);
            setRole('employer');
          }
        }
      }

      if (storedWalletAddress) {
        setWalletAddress(storedWalletAddress);
        setWalletConnected(true);
      }
    } catch (error) {
      console.error('Failed to load auth state:', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const login = (userId: string, userRole: UserRole) => {
    if (userRole === 'seeker') {
      const seeker = mockSeekers[userId];
      if (seeker) {
        setUser(seeker);
        setRole('seeker');
        localStorage.setItem('auth_role', 'seeker');
        localStorage.setItem('auth_userId', userId);
      }
    } else if (userRole === 'employer') {
      const employer = mockEmployers[userId];
      if (employer) {
        setUser(employer);
        setRole('employer');
        localStorage.setItem('auth_role', 'employer');
        localStorage.setItem('auth_userId', userId);
      }
    }
  };

  const logout = () => {
    setUser(null);
    setRole('guest');
    setWalletConnected(false);
    setWalletAddress(null);
    localStorage.removeItem('auth_role');
    localStorage.removeItem('auth_userId');
    localStorage.removeItem('auth_walletAddress');
  };

  const connectWallet = (address: string) => {
    setWalletAddress(address);
    setWalletConnected(true);
    localStorage.setItem('auth_walletAddress', address);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletConnected(false);
    localStorage.removeItem('auth_walletAddress');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoggedIn: !!user,
        walletConnected,
        walletAddress,
        login,
        logout,
        connectWallet,
        disconnectWallet,
        isHydrated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
