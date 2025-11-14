'use client';

import { useUserProfile } from '@/contexts/UserProfileContext';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

/**
 * Hook personalizado que combina funcionalidad de autenticación
 *
 * @example
 * const { user, isAuthenticated, signOut } = useAuth();
 */
export function useAuth() {
  const supabaseClient = useSupabaseClient();
  const {
    userProfile,
    isLoading,
    isAuthenticated,
    currentSession,
    refetchUserProfile
  } = useUserProfile();

  /**
   * Cerrar sesión
   */
  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user: currentSession?.user ?? null,
    userProfile,
    isLoading,
    isAuthenticated,
    session: currentSession,
    signOut,
    refetchProfile: refetchUserProfile,
  };
}
