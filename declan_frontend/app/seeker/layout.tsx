'use client';

import { Navbar } from '@/components/global/navbar';
import { Sidebar } from '@/components/global/sidebar';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, role, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && (!isLoggedIn || role !== 'seeker')) {
      router.push('/auth/login');
    }
  }, [isHydrated, isLoggedIn, role, router]);

  // Show loading state while hydrating auth
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || role !== 'seeker') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar variant="seeker" />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
