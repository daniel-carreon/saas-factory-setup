'use client';

import { createBrowserClient } from '@supabase/ssr';
import {
  SessionContextProvider,
  useSessionContext,
} from '@supabase/auth-helpers-react';
import { useEffect, useState, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { UserProfileProvider } from '@/contexts/UserProfileContext';

const AppContent = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, session } = useSessionContext();
  const pathname = usePathname();
  const router = useRouter();

  const publicPaths = useMemo(() => ['/login'], []);

  useEffect(() => {
    if (!isLoading) {
      if (!session && !publicPaths.includes(pathname)) {
        router.replace('/login');
      } else if (session && pathname === '/login') {
        router.replace('/');
      }
    }
  }, [isLoading, session, pathname, router, publicPaths]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p>Verificando sesión...</p>
      </div>
    );
  }

  if (!session && publicPaths.includes(pathname)) {
    return <>{children}</>;
  }

  if (session) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p>Cargando...</p>
    </div>
  );
};

const ClientLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [supabaseClient] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={null}
    >
      <UserProfileProvider>
        <AppContent>{children}</AppContent>
      </UserProfileProvider>
    </SessionContextProvider>
  );
};

export default ClientLayoutWrapper;
