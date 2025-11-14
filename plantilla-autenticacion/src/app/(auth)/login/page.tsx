'use client';

import React from 'react';
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { getAuthCallbackUrl } from '@/shared/utils/getRedirectUrl';

export default function LoginPage() {
  const supabaseClient = useSupabaseClient();
  const { isLoading } = useSessionContext();

  const handleSignInWithGoogle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const redirectUrl = getAuthCallbackUrl();

      console.log('🔐 Redirect URL:', redirectUrl);

      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error('Error signing in with Google:', error);
        alert('Error al iniciar sesión: ' + error.message);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Error inesperado al iniciar sesión');
    }
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Bienvenido a SaaS Factory</h1>
        <p style={styles.subtitle}>Inicia sesión para continuar</p>

        <button
          onClick={handleSignInWithGoogle}
          disabled={isLoading}
          style={styles.googleButton}
        >
          <svg
            aria-hidden='true'
            style={styles.googleIcon}
            viewBox='0 0 24 24'
            fill='currentColor'
          >
            <path
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.44h5.92c-.26 1.44-1.08 2.65-2.29 3.44v2.88h3.68c2.14-1.96 3.38-4.83 3.38-8.07z'
              fill='#4285F4'
            />
            <path
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.68-2.88c-.98.66-2.23 1.05-3.6 1.05-2.8 0-5.17-1.89-6.02-4.44H2.24v2.97C4.01 20.93 7.72 23 12 23z'
              fill='#34A853'
            />
            <path
              d='M5.98 14.04c-.2-.6-.31-1.24-.31-1.9s.11-1.31.31-1.9V7.27H2.24C1.48 8.79.96 10.68.96 12.63s.52 3.84 1.28 5.37l3.74-2.96z'
              fill='#FBBC05'
            />
            <path
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.27-3.27C17.45 1.96 14.97 1 12 1 7.72 1 4.01 3.07 2.24 6.14l3.74 2.97c.85-2.55 3.22-4.44 6.02-4.44z'
              fill='#EA4335'
            />
          </svg>
          Continuar con Google
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '48px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold' as const,
    marginBottom: '8px',
    textAlign: 'center' as const,
    color: '#333',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '32px',
    textAlign: 'center' as const,
    color: '#666',
  },
  googleButton: {
    width: '100%',
    backgroundColor: 'white',
    color: '#333',
    fontWeight: '600' as const,
    padding: '12px 24px',
    borderRadius: '8px',
    border: '2px solid #ddd',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  googleIcon: {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  },
};
