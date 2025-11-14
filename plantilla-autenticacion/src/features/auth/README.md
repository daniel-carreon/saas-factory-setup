# Feature: Autenticación

Esta feature implementa autenticación completa con Supabase + Google OAuth.

## 📁 Estructura

```
features/auth/
├── components/          # (futuro) LoginForm, SignupForm, etc.
├── hooks/
│   └── useAuth.ts      # Hook principal de autenticación
├── services/           # (futuro) authService.ts para lógica de negocio
└── types/             # (futuro) auth.types.ts para types específicos
```

## 🔨 Uso

### Hook useAuth

```typescript
import { useAuth } from '@/features/auth/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) return <div>Cargando...</div>;

  if (!isAuthenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <p>Bienvenido, {user.email}</p>
      <button onClick={signOut}>Cerrar sesión</button>
    </div>
  );
}
```

## 📚 Documentación Completa

Para implementación completa, ver:
- [`.claude/prompts/autenticacion-supabase.md`](../../../.claude/prompts/autenticacion-supabase.md) - Guía completa de implementación
- Archivos de referencia en esta feature
- `shared/lib/supabase.ts` - Cliente de Supabase
- `contexts/UserProfileContext.tsx` - Provider de perfil de usuario

## ⚡ Quick Start

1. Configurar variables de entorno (ver `.env.example`)
2. Instalar dependencias de Supabase (ver docs)
3. Implementar componentes faltantes según necesidades
4. Configurar Supabase Dashboard (Google OAuth)
5. Probar login en localhost

## 🎯 Próximos Pasos

- [ ] Implementar `components/LoginForm.tsx`
- [ ] Implementar `components/SignupForm.tsx` (si usas email/password)
- [ ] Crear `services/authService.ts` para lógica de negocio
- [ ] Agregar más providers OAuth (GitHub, etc.)
- [ ] Implementar 2FA
