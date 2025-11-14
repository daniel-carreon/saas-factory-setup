'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef
} from 'react';
import { UserProfile } from '@/shared/types/user.types';
import { supabase } from '@/shared/lib/supabase';
import { Session } from '@supabase/supabase-js';

interface UserProfileContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  isLoadingProfile: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  currentSession: Session | null;
  refetchUserProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const hasProcessedSignIn = useRef<boolean>(false);

  const handleProfileUpdate = useCallback(async (session: Session | null) => {
    if (session?.user) {
      setIsLoadingProfile(true);
      setError(null);

      try {
        // Crear perfil básico desde la sesión de Supabase
        const profile: UserProfile = {
          user_id: session.user.id,
          email: session.user.email,
          full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
          avatar_url: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || '',
          subscription_tier: 'free',
          subscription_status: 'active',
          created_at: session.user.created_at,
          updated_at: new Date().toISOString(),
        };

        setUserProfile(profile);
      } catch (err) {
        console.error("[UserProfileContext] Error:", err);
        setError(err as Error);
        setUserProfile(null);
      } finally {
        setIsLoadingProfile(false);
      }
    } else {
      setUserProfile(null);
      setIsLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const processAuthState = async (event: string, session: Session | null) => {
      if (!isMounted) return;

      setCurrentSession(session);
      let newIsAuthenticated = false;

      if (event === 'SIGNED_IN') {
        newIsAuthenticated = true;
        hasProcessedSignIn.current = true;
      } else if (event === 'SIGNED_OUT') {
        newIsAuthenticated = false;
        hasProcessedSignIn.current = false;
      } else {
        newIsAuthenticated = !!session?.user;
      }

      setIsAuthenticated(newIsAuthenticated);
      await handleProfileUpdate(newIsAuthenticated ? session : null);
      setIsLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;
        processAuthState(_event, session);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      processAuthState('INITIAL_SESSION', session);
    });

    return () => {
      isMounted = false;
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [handleProfileUpdate]);

  const refetchUserProfile = async () => {
    if (currentSession) {
      await handleProfileUpdate(currentSession);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        isLoading,
        isLoadingProfile,
        error,
        isAuthenticated,
        currentSession,
        refetchUserProfile
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile debe usarse dentro de UserProfileProvider');
  }
  return context;
};
