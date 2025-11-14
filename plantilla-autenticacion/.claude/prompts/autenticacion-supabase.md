# Autenticación con Supabase + Google OAuth

**Última actualización:** 13 de noviembre de 2025
**Template reutilizable para implementación de autenticación en proyectos Next.js**

---

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Arquitectura de la Solución](#arquitectura-de-la-solución)
3. [Configuración de Supabase Dashboard](#configuración-de-supabase-dashboard)
4. [Instalación y Dependencias](#instalación-y-dependencias)
5. [Estructura de Archivos Feature-First](#estructura-de-archivos-feature-first)
6. [Implementación Paso a Paso](#implementación-paso-a-paso)
7. [Patrones y Mejores Prácticas](#patrones-y-mejores-prácticas)
8. [Checklist de Implementación](#checklist-de-implementación)

---

## 🎯 Visión General

Este documento define la implementación completa de autenticación usando:
- **Supabase Auth** - Sistema de autenticación completo
- **Google OAuth** - Provider principal de login
- **Next.js 15+** - App Router con Server Components y Client Components
- **TypeScript** - Type safety completo
- **Arquitectura Feature-First** - Organización optimizada para IA

### ¿Qué incluye esta implementación?

✅ Login con Google OAuth
✅ Manejo de sesiones persistentes
✅ Route guards automáticos (rutas protegidas)
✅ Context API para estado global de autenticación
✅ Rate limiting y prevención de loops infinitos
✅ Caché de perfil de usuario
✅ Redirección dinámica (localhost vs producción)
✅ Manejo de múltiples eventos de auth (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, etc.)

---

## 🏗️ Arquitectura de la Solución

### Flujo de Autenticación

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│   Página Login              │
│   - Botón Google OAuth      │
│   - Manejo de loading       │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   Supabase Auth             │
│   - signInWithOAuth()       │
│   - Redirect a Google       │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   Google OAuth Consent      │
│   - Usuario autoriza        │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   Callback URL              │
│   - Supabase maneja token   │
│   - Crea sesión             │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   SessionContextProvider    │
│   - onAuthStateChange       │
│   - getSession()            │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   UserProfileProvider       │
│   - Fetch perfil usuario    │
│   - Manejo de suscripción   │
│   - Rate limiting           │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   AppContent (Route Guard)  │
│   - Protege rutas privadas  │
│   - Permite rutas públicas  │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   App autenticada           │
└─────────────────────────────┘
```

### Componentes Clave

1. **Cliente Supabase** (`shared/lib/supabase.ts`)
   - Instancia singleton de Supabase
   - Validación de env vars
   - Exporta cliente para uso global

2. **SessionContextProvider** (`@supabase/auth-helpers-react`)
   - Maneja el estado de sesión
   - Provee hooks: `useSessionContext()`, `useSupabaseClient()`
   - Escucha eventos de autenticación

3. **UserProfileProvider** (`contexts/UserProfileContext.tsx`)
   - Maneja perfil de usuario
   - Verifica suscripción/tier
   - Rate limiting y cache
   - Refetch manual del perfil

4. **Route Guards** (`components/ClientLayoutWrapper.tsx`)
   - Protege rutas privadas
   - Define rutas públicas
   - Maneja redirecciones automáticas

5. **Login Page** (`app/(auth)/login/page.tsx`)
   - UI de login
   - Botón Google OAuth
   - Estados de loading

---

## ⚙️ Configuración de Supabase Dashboard

### 1. Crear Proyecto en Supabase

```bash
# 1. Visita https://supabase.com/dashboard
# 2. Click en "New Project"
# 3. Completa:
#    - Nombre del proyecto
#    - Database Password (guárdala!)
#    - Región (elige la más cercana)
# 4. Click en "Create new project"
# 5. Espera ~2 minutos a que se aprovisione
```

### 2. Configurar Google OAuth Provider

```bash
# En Supabase Dashboard:
# 1. Ve a "Authentication" → "Providers"
# 2. Encuentra "Google" y habilítalo
# 3. Necesitarás:
#    - Client ID (de Google Cloud Console)
#    - Client Secret (de Google Cloud Console)
```

#### Obtener credenciales de Google Cloud Console

```bash
# 1. Visita: https://console.cloud.google.com/
# 2. Crea un nuevo proyecto o selecciona uno existente
# 3. Ve a "APIs & Services" → "Credentials"
# 4. Click en "Create Credentials" → "OAuth client ID"
# 5. Tipo de aplicación: "Web application"
# 6. Nombres autorizados de redireccionamiento:
#    - https://[TU_PROJECT_REF].supabase.co/auth/v1/callback
#    - http://localhost:3000 (para desarrollo)
# 7. Copia Client ID y Client Secret
# 8. Pégalos en Supabase Dashboard → Google Provider
```

### 3. Configurar URLs de Redirección

```bash
# En Supabase Dashboard:
# 1. Ve a "Authentication" → "URL Configuration"
# 2. Site URL: https://tu-dominio.com (o http://localhost:3000 para dev)
# 3. Redirect URLs (agregar):
#    - http://localhost:3000
#    - http://localhost:3001
#    - http://localhost:3002
#    - http://localhost:3003
#    - http://localhost:3004
#    - http://localhost:3005
#    - http://localhost:3006
#    - https://tu-dominio.com
#    - https://tu-dominio.vercel.app
```

### 4. Copiar Credenciales

```bash
# En Supabase Dashboard:
# 1. Ve a "Settings" → "API"
# 2. Copia:
#    - Project URL → NEXT_PUBLIC_SUPABASE_URL
#    - Project API keys → anon/public → NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 📦 Instalación y Dependencias

### Paquetes NPM Requeridos

```bash
# Core Supabase
npm install @supabase/supabase-js@latest

# SSR Support para Next.js
npm install @supabase/ssr@latest

# React Helpers (hooks y context)
npm install @supabase/auth-helpers-react@latest

# OPCIONAL: UI Components pre-hechos
npm install @supabase/auth-ui-react@latest
npm install @supabase/auth-ui-shared@latest
```

### Versiones Recomendadas (Nov 2025)

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.49.4",
    "@supabase/ssr": "^0.6.1",
    "@supabase/auth-helpers-react": "^0.5.0",
    "@supabase/auth-ui-react": "^0.4.7",
    "@supabase/auth-ui-shared": "^0.1.8"
  }
}
```

---

## 📁 Estructura de Archivos Feature-First

```
src/
├── app/
│   ├── (auth)/                    # Grupo de rutas de autenticación
│   │   └── login/
│   │       └── page.tsx          # Página de login con Google OAuth
│   │
│   ├── layout.tsx                # Layout root con providers
│   └── page.tsx                  # Home (protegida)
│
├── features/
│   └── auth/                     # Feature de autenticación
│       ├── components/           # (futuro: SignupForm, etc.)
│       ├── hooks/
│       │   └── useAuth.ts       # Hook personalizado de auth
│       ├── services/
│       │   └── authService.ts   # Lógica de negocio de auth
│       └── types/
│           └── auth.types.ts    # Types específicos de auth
│
├── contexts/
│   └── UserProfileContext.tsx   # Provider de perfil de usuario
│
├── components/
│   └── ClientLayoutWrapper.tsx  # Wrapper con SessionProvider + Route Guards
│
└── shared/
    ├── lib/
    │   └── supabase.ts          # Cliente Supabase singleton
    │
    ├── utils/
    │   └── getRedirectUrl.ts    # Helper para URLs dinámicas
    │
    └── types/
        └── user.types.ts        # Types de usuario
```

---

## 🔨 Implementación Paso a Paso

### Paso 1: Variables de Entorno

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # o tu dominio en prod
```

```bash
# .env.example (commitear al repo)
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Paso 2: Cliente Supabase

```typescript
// src/shared/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Obtener variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validación crítica: fallar temprano si faltan credenciales
if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Crear y exportar cliente singleton
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Paso 3: Utility de Redirección

```typescript
// src/shared/utils/getRedirectUrl.ts

/**
 * Helper para obtener la URL de redirección correcta según el entorno
 * Evita problemas de redirección entre localhost y producción
 */
export function getRedirectUrl(): string {
  // 1. Prioridad: Variable de entorno configurada
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // 2. Fallback: Detectar automáticamente basado en window.location
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;

    // Si estamos en localhost, usar el puerto actual
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:${port}`;
    }

    // En producción, usar el origin completo
    return window.location.origin;
  }

  // 3. Fallback final para SSR (no debería llegar aquí)
  return 'http://localhost:3000';
}

/**
 * Obtiene la URL de callback para OAuth
 */
export function getAuthCallbackUrl(): string {
  const baseUrl = getRedirectUrl();
  // Supabase redirige automáticamente a la ruta de donde vino el login
  return baseUrl;
}
```

### Paso 4: Types de Usuario

```typescript
// src/shared/types/user.types.ts

/**
 * Representa el perfil de un usuario
 */
export interface UserProfile {
  user_id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;

  // Suscripción (si aplica)
  subscription_tier?: string; // 'free' | 'pro_monthly' | 'pro_annual'
  subscription_status?: string; // 'active' | 'inactive' | 'canceled'
  current_period_ends_at?: string | null;

  created_at: string;
  updated_at: string;
}
```

### Paso 5: UserProfileContext

```typescript
// src/contexts/UserProfileContext.tsx
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

// CONFIGURACIÓN: Prevención de loops infinitos
const PROFILE_FETCH_DEBOUNCE_MS = 1000; // 1 segundo de debounce
const MAX_PROFILE_FETCHES_PER_MINUTE = 10; // Máximo 10 fetches por minuto

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
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const hasProcessedSignIn = useRef<boolean>(false);
  const initialAuthEventProcessed = useRef<boolean>(false);
  const profileLoadInitiatedBySession = useRef<boolean>(false);

  // Rate limiting refs
  const lastProfileFetchTime = useRef<number>(0);
  const profileFetchCount = useRef<number>(0);
  const profileFetchResetTime = useRef<number>(Date.now());
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSuccessfulProfileData = useRef<UserProfile | null>(null);

  /**
   * Verifica si podemos hacer fetch del perfil (rate limiting)
   */
  const canFetchProfile = useCallback((): boolean => {
    const now = Date.now();

    // Reset counter cada minuto
    if (now - profileFetchResetTime.current > 60000) {
      profileFetchCount.current = 0;
      profileFetchResetTime.current = now;
    }

    // Verificar rate limit
    if (profileFetchCount.current >= MAX_PROFILE_FETCHES_PER_MINUTE) {
      console.warn('[UserProfileContext] Rate limit alcanzado. Esperando...');
      return false;
    }

    // Verificar debounce
    if (now - lastProfileFetchTime.current < PROFILE_FETCH_DEBOUNCE_MS) {
      return false;
    }

    return true;
  }, []);

  /**
   * Obtiene el perfil del usuario desde el backend
   * NOTA: Ajusta esta función según tu backend
   */
  const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    // OPCIÓN 1: Si tienes un backend propio
    // const response = await fetch('/api/users/me/profile', {
    //   headers: {
    //     'Authorization': `Bearer ${session.access_token}`
    //   }
    // });
    // return await response.json();

    // OPCIÓN 2: Si usas Supabase Database directamente
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data as UserProfile;
  };

  /**
   * Maneja la actualización del perfil cuando cambia la sesión
   */
  const handleProfileUpdate = useCallback(async (session: Session | null) => {
    // Limpiar timeout de debounce previo
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }

    if (session?.user) {
      // Verificar rate limiting
      if (!canFetchProfile()) {
        console.log('[UserProfileContext] Fetch omitido por rate limiting');
        if (lastSuccessfulProfileData.current) {
          setUserProfile(lastSuccessfulProfileData.current);
        }
        setIsLoadingProfile(false);
        return;
      }

      profileLoadInitiatedBySession.current = true;
      setIsLoadingProfile(true);
      setError(null);

      // Actualizar contadores de rate limiting
      lastProfileFetchTime.current = Date.now();
      profileFetchCount.current += 1;

      try {
        console.log(`[UserProfileContext] Fetching profile (${profileFetchCount.current}/${MAX_PROFILE_FETCHES_PER_MINUTE})`);
        const profile = await fetchUserProfile(session.user.id);

        // Guardar datos exitosos para cache
        lastSuccessfulProfileData.current = profile;
        setUserProfile(profile);
      } catch (err) {
        console.error("[UserProfileContext] Error fetching user profile:", err);
        setError(err as Error);

        // Usar datos previos en caso de error
        if (lastSuccessfulProfileData.current) {
          console.log('[UserProfileContext] Usando datos en cache');
          setUserProfile(lastSuccessfulProfileData.current);
        } else {
          setUserProfile(null);
        }
      } finally {
        setIsLoadingProfile(false);
        profileLoadInitiatedBySession.current = false;
      }
    } else {
      // No hay sesión
      lastSuccessfulProfileData.current = null;
      setUserProfile(null);
      if (!profileLoadInitiatedBySession.current) {
        setIsLoadingProfile(false);
      }
    }
  }, [canFetchProfile]);

  useEffect(() => {
    let isMounted = true;
    hasProcessedSignIn.current = false;
    initialAuthEventProcessed.current = false;

    setIsLoading(true);

    const processAuthState = async (event: string, session: Session | null) => {
      if (!isMounted) return;

      initialAuthEventProcessed.current = true;
      setCurrentSession(session);

      let newIsAuthenticated = false;

      if (event === 'SIGNED_IN') {
        newIsAuthenticated = true;
        hasProcessedSignIn.current = true;
      } else if (event === 'SIGNED_OUT') {
        newIsAuthenticated = false;
        hasProcessedSignIn.current = false;
      } else if (event === 'INITIAL_SESSION' || event === 'INITIAL_SESSION_FROM_GET') {
        newIsAuthenticated = !!session?.user;
        if (newIsAuthenticated) {
          hasProcessedSignIn.current = true;
        }
      } else if (event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        newIsAuthenticated = !!session?.user;
      } else {
        newIsAuthenticated = !!session?.user;
      }

      setIsAuthenticated(newIsAuthenticated);
      await handleProfileUpdate(newIsAuthenticated ? session : null);
    };

    // Listener de cambios de auth
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;
        processAuthState(_event, session);
      }
    );

    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!isMounted) return;
      if (!initialAuthEventProcessed.current) {
        if (error) {
          console.error("[UserProfileContext] Error en getSession:", error);
          processAuthState('INITIAL_SESSION_ERROR', null);
        } else {
          processAuthState('INITIAL_SESSION_FROM_GET', session);
        }
      }
    });

    return () => {
      isMounted = false;
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [handleProfileUpdate]);

  // Efecto para manejar isLoading general
  useEffect(() => {
    if (!isAuthenticated && !isLoadingProfile) {
      setIsLoading(false);
    } else if (isAuthenticated && !isLoadingProfile) {
      setIsLoading(false);
    } else if (isLoadingProfile) {
      setIsLoading(true);
    }
  }, [isAuthenticated, isLoadingProfile]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      lastSuccessfulProfileData.current = null;
    };
  }, []);

  const refetchUserProfile = async () => {
    if (currentSession) {
      await handleProfileUpdate(currentSession);
    } else {
      console.warn("[UserProfileContext] Refetch sin sesión activa.");
      await handleProfileUpdate(null);
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
```

### Paso 6: ClientLayoutWrapper (Route Guards)

```typescript
// src/components/ClientLayoutWrapper.tsx
'use client';

import { createBrowserClient } from '@supabase/ssr';
import {
  SessionContextProvider,
  useSessionContext,
} from '@supabase/auth-helpers-react';
import { useEffect, useState, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { UserProfileProvider } from '@/contexts/UserProfileContext';

/**
 * Componente interno que maneja route guards
 */
const AppContent = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, session } = useSessionContext();
  const pathname = usePathname();
  const router = useRouter();

  // Definir rutas públicas (no requieren auth)
  const publicPaths = useMemo(() => [
    '/login',
    '/privacidad',
    '/terminos',
  ], []);

  useEffect(() => {
    if (!isLoading) {
      // No hay sesión y la ruta NO es pública → redirigir a login
      if (!session && !publicPaths.includes(pathname)) {
        router.replace('/login');
      }
      // Hay sesión y el usuario está en login → redirigir a home
      else if (session && pathname === '/login') {
        router.replace('/');
      }
    }
  }, [isLoading, session, pathname, router, publicPaths]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>Verificando sesión...</p>
      </div>
    );
  }

  // Permitir rutas públicas sin sesión
  if (!session && publicPaths.includes(pathname)) {
    return <>{children}</>;
  }

  // Hay sesión → mostrar contenido
  if (session) {
    return <>{children}</>;
  }

  // Fallback
  return (
    <div className='flex items-center justify-center h-screen'>
      <p>Cargando...</p>
    </div>
  );
};

/**
 * Wrapper principal con todos los providers
 */
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
```

### Paso 7: Layout Root

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mi App',
  description: 'App con autenticación Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
```

### Paso 8: Página de Login

```typescript
// src/app/(auth)/login/page.tsx
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
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        Cargando...
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6'>
      <div className='z-10 flex flex-col items-center w-full max-w-md'>
        <h1 className='text-3xl font-semibold mb-10 text-center'>
          Bienvenido
        </h1>

        <button
          onClick={handleSignInWithGoogle}
          disabled={isLoading}
          className='w-full max-w-[280px] bg-white text-gray-900 font-semibold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-70'
        >
          <svg
            aria-hidden='true'
            className='w-5 h-5 mr-2'
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
```

### Paso 9: Hook Personalizado useAuth

```typescript
// src/features/auth/hooks/useAuth.ts
'use client';

import { useUserProfile } from '@/contexts/UserProfileContext';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

/**
 * Hook personalizado que combina funcionalidad de autenticación
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
```

---

## 🎯 Patrones y Mejores Prácticas

### 1. Rate Limiting y Prevención de Loops Infinitos

**Problema:** Los eventos de auth pueden dispararse múltiples veces causando fetches infinitos.

**Solución:**
```typescript
// Configurar límites
const PROFILE_FETCH_DEBOUNCE_MS = 1000; // 1 segundo entre fetches
const MAX_PROFILE_FETCHES_PER_MINUTE = 10; // Máximo 10 fetches/min

// Implementar función canFetchProfile() que verifique:
// 1. Rate limit por minuto
// 2. Debounce entre llamadas
// 3. Cache de datos previos exitosos
```

### 2. Manejo de Múltiples Eventos de Auth

```typescript
// Eventos de Supabase Auth que debes manejar:
- SIGNED_IN: Usuario se autenticó
- SIGNED_OUT: Usuario cerró sesión
- INITIAL_SESSION: Sesión inicial al cargar
- TOKEN_REFRESHED: Token se refrescó automáticamente
- USER_UPDATED: Datos de usuario se actualizaron
- PASSWORD_RECOVERY: Recuperación de contraseña
```

**Patrón:**
```typescript
const processAuthState = async (event: string, session: Session | null) => {
  let newIsAuthenticated = false;

  switch(event) {
    case 'SIGNED_IN':
      newIsAuthenticated = true;
      break;
    case 'SIGNED_OUT':
      newIsAuthenticated = false;
      break;
    default:
      newIsAuthenticated = !!session?.user;
  }

  setIsAuthenticated(newIsAuthenticated);
  await handleProfileUpdate(newIsAuthenticated ? session : null);
};
```

### 3. Route Guards Correctos

```typescript
// ✅ CORRECTO: Verificar isLoading primero
if (isLoading) {
  return <LoadingScreen />;
}

// ✅ CORRECTO: Permitir rutas públicas explícitamente
if (!session && publicPaths.includes(pathname)) {
  return <>{children}</>;
}

// ✅ CORRECTO: Mostrar contenido solo con sesión válida
if (session) {
  return <>{children}</>;
}

// ❌ INCORRECTO: No verificar isLoading primero
if (!session) {
  router.push('/login'); // Puede redirigir incorrectamente
}
```

### 4. Redirección Dinámica (Local vs Producción)

```typescript
// ✅ CORRECTO: Auto-detectar entorno
export function getRedirectUrl(): string {
  // 1. Variable de entorno (más control)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // 2. Auto-detectar desde window.location
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:${port}`;
    }

    return window.location.origin;
  }

  // 3. Fallback
  return 'http://localhost:3000';
}
```

### 5. Caché de Datos de Perfil

```typescript
// ✅ CORRECTO: Guardar últimos datos exitosos
const lastSuccessfulProfileData = useRef<UserProfile | null>(null);

try {
  const profile = await fetchUserProfile();
  lastSuccessfulProfileData.current = profile; // ✅ Guardar
  setUserProfile(profile);
} catch (err) {
  // Si falla, usar datos previos
  if (lastSuccessfulProfileData.current) {
    setUserProfile(lastSuccessfulProfileData.current); // ✅ Usar cache
  }
}
```

### 6. Cleanup de useEffect

```typescript
// ✅ CORRECTO: Limpiar recursos
useEffect(() => {
  return () => {
    // Limpiar timeouts
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Limpiar cache
    lastSuccessfulProfileData.current = null;

    // Desuscribir listeners
    authListener?.subscription.unsubscribe();
  };
}, []);
```

### 7. Validación de Variables de Entorno

```typescript
// ✅ CORRECTO: Fallar temprano con mensajes claros
if (!supabaseUrl) {
  throw new Error('Missing: NEXT_PUBLIC_SUPABASE_URL');
}

// ❌ INCORRECTO: Dejar que falle más tarde
const client = createClient(supabaseUrl!, supabaseKey!);
```

---

## ✅ Checklist de Implementación

### Configuración Inicial
- [ ] Crear proyecto en Supabase Dashboard
- [ ] Configurar Google OAuth Provider en Supabase
- [ ] Obtener credenciales de Google Cloud Console
- [ ] Configurar URLs de redirección en Supabase
- [ ] Copiar SUPABASE_URL y SUPABASE_ANON_KEY

### Instalación de Dependencias
- [ ] Instalar `@supabase/supabase-js`
- [ ] Instalar `@supabase/ssr`
- [ ] Instalar `@supabase/auth-helpers-react`
- [ ] (Opcional) Instalar UI components de Supabase

### Configuración de Proyecto
- [ ] Crear `.env.local` con credenciales
- [ ] Crear `.env.example` para el repositorio
- [ ] Agregar `.env*.local` a `.gitignore`

### Implementación de Código
- [ ] Crear `shared/lib/supabase.ts` (cliente)
- [ ] Crear `shared/utils/getRedirectUrl.ts` (helper)
- [ ] Crear `shared/types/user.types.ts` (interfaces)
- [ ] Crear `contexts/UserProfileContext.tsx` (provider)
- [ ] Crear `components/ClientLayoutWrapper.tsx` (route guards)
- [ ] Actualizar `app/layout.tsx` (agregar wrapper)
- [ ] Crear `app/(auth)/login/page.tsx` (página login)
- [ ] Crear `features/auth/hooks/useAuth.ts` (hook personalizado)

### Testing
- [ ] Probar login con Google en localhost
- [ ] Verificar redirección después de login
- [ ] Probar logout
- [ ] Verificar route guards (rutas protegidas)
- [ ] Verificar rutas públicas accesibles sin auth
- [ ] Probar refresh de página (persistencia de sesión)
- [ ] Verificar que no hay loops infinitos (console log)

### Producción
- [ ] Configurar `NEXT_PUBLIC_SITE_URL` en Vercel/Netlify
- [ ] Agregar dominio de producción a Supabase Redirect URLs
- [ ] Agregar dominio de producción a Google Cloud Console
- [ ] Probar login en producción
- [ ] Configurar dominio personalizado (si aplica)

---

## 🔍 Troubleshooting Común

### Error: "Invalid Redirect URL"

**Causa:** La URL no está configurada en Supabase Dashboard.

**Solución:**
```bash
# 1. Ve a Supabase Dashboard → Authentication → URL Configuration
# 2. Agrega tu URL exacta en "Redirect URLs"
# 3. Incluye http://localhost:3000 para desarrollo
```

### Error: "Failed to fetch user profile"

**Causa:** El backend o tabla de Supabase no existe.

**Solución:**
```sql
-- Crear tabla user_profiles en Supabase SQL Editor
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);
```

### Error: Loops infinitos de fetch

**Causa:** No hay rate limiting o debouncing.

**Solución:** Implementar `canFetchProfile()` como se muestra en [Paso 5](#paso-5-userprofilecontext).

### Error: "Missing environment variables"

**Causa:** `.env.local` no está configurado correctamente.

**Solución:**
```bash
# 1. Verificar que .env.local existe
# 2. Verificar que tiene NEXT_PUBLIC_SUPABASE_URL
# 3. Verificar que tiene NEXT_PUBLIC_SUPABASE_ANON_KEY
# 4. Reiniciar servidor de desarrollo: npm run dev
```

### Login funciona en localhost pero no en producción

**Causa:** Falta configurar variables de entorno en Vercel/Netlify.

**Solución:**
```bash
# En Vercel Dashboard:
# 1. Ve a Settings → Environment Variables
# 2. Agrega NEXT_PUBLIC_SUPABASE_URL
# 3. Agrega NEXT_PUBLIC_SUPABASE_ANON_KEY
# 4. Agrega NEXT_PUBLIC_SITE_URL (tu dominio)
# 5. Re-deploy
```

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Google OAuth Setup](https://supabase.com/docs/guides/auth/social-login/auth-google)

### Ejemplos de Código
- [Supabase Next.js Example](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
- [Auth Helpers React Example](https://github.com/supabase-community/auth-helpers/tree/main/examples/nextjs)

---

## 🎓 Notas Finales

### ¿Cuándo usar este template?

✅ **Usar cuando:**
- Necesitas autenticación rápida y segura
- Quieres OAuth con Google (fácilmente extensible a GitHub, etc.)
- Prefieres no implementar auth desde cero
- Necesitas funcionalidades como reset password, email verification (Supabase lo incluye)

❌ **NO usar cuando:**
- Necesitas control total sobre el sistema de auth
- Tienes requisitos muy específicos de seguridad
- Ya tienes un sistema de auth implementado

### Extensiones Futuras

Este template base puede extenderse para incluir:
- [ ] Más providers OAuth (GitHub, Facebook, Twitter)
- [ ] Email + Password authentication
- [ ] Magic Link login
- [ ] Two-Factor Authentication (2FA)
- [ ] Role-Based Access Control (RBAC)
- [ ] Team/Organization support
- [ ] Session management avanzado

### Mantenimiento

- **Actualizar dependencias:** `npm update` mensualmente
- **Revisar breaking changes** de Supabase en su changelog
- **Monitorear logs** de Supabase Dashboard para detectar errores
- **Backup de database** regularmente (Supabase lo hace automáticamente en planes pagos)

---

**Creado por:** Daniel Carreón
**Última revisión:** 13 de noviembre de 2025
**Versión:** 1.0.0

---

## 📝 Changelog

### v1.0.0 (2025-11-13)
- ✨ Implementación inicial completa
- ✨ Google OAuth funcional
- ✨ Route guards implementados
- ✨ Rate limiting y cache de perfil
- ✨ Documentación completa con troubleshooting
