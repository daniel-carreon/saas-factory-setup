# 🚀 Plantilla de Autenticación Next.js + Supabase

Template completo y listo para usar de autenticación con Google OAuth usando Next.js 15+ y Supabase.

## ✨ Características

- ✅ Autenticación con Google OAuth
- ✅ Next.js 15+ con App Router
- ✅ Supabase Auth integrado
- ✅ TypeScript completo
- ✅ Route guards automáticos
- ✅ Arquitectura Feature-First
- ✅ Context API para manejo de sesión
- ✅ Rate limiting y caché de perfil
- ✅ Redirección dinámica (localhost vs producción)

## 🚀 Quick Start

### 1. Clonar o copiar este template

```bash
# Opción 1: Copiar directamente
cp -r plantilla-autenticacion mi-nuevo-proyecto
cd mi-nuevo-proyecto

# Opción 2: Usar como referencia
# Lee los archivos y copia lo que necesites
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Configura Google OAuth en Authentication → Providers
3. Copia tus credenciales

### 4. Variables de entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env.local

# Edita .env.local con tus credenciales
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Correr el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y haz login con Google!

## 📚 Documentación Completa

Para instrucciones detalladas de implementación, troubleshooting y mejores prácticas, consulta:

👉 **[.claude/prompts/autenticacion-supabase.md](.claude/prompts/autenticacion-supabase.md)**

Este documento incluye:
- Configuración paso a paso de Supabase Dashboard
- Arquitectura completa del sistema
- Código completo de todos los componentes
- Patrones y mejores prácticas
- Troubleshooting de errores comunes
- Checklist de implementación

## 🏗️ Estructura del Proyecto

```
plantilla-autenticacion/
├── src/
│   ├── app/
│   │   ├── (auth)/login/      # Página de login
│   │   ├── layout.tsx          # Layout root
│   │   ├── page.tsx            # Home (protegida)
│   │   └── globals.css
│   │
│   ├── features/
│   │   └── auth/
│   │       ├── hooks/
│   │       │   └── useAuth.ts  # Hook de autenticación
│   │       └── README.md
│   │
│   ├── contexts/
│   │   └── UserProfileContext.tsx  # Provider de perfil
│   │
│   ├── components/
│   │   └── ClientLayoutWrapper.tsx # Route guards
│   │
│   └── shared/
│       ├── lib/
│       │   └── supabase.ts     # Cliente Supabase
│       ├── utils/
│       │   └── getRedirectUrl.ts
│       └── types/
│           └── user.types.ts
│
├── .claude/
│   └── prompts/
│       └── autenticacion-supabase.md  # 📚 GUÍA COMPLETA
│
├── package.json
├── tsconfig.json
├── next.config.js
└── .env.example
```

## 🎯 Rutas Disponibles

- `/login` - Página de autenticación (pública)
- `/` - Home (protegida, requiere login)

## 🔧 Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

## 📝 Uso del Hook useAuth

```typescript
import { useAuth } from '@/features/auth/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <div>No autenticado</div>;

  return (
    <div>
      <p>Bienvenido, {user.email}</p>
      <button onClick={signOut}>Cerrar sesión</button>
    </div>
  );
}
```

## 🛠️ Personalización

### Cambiar estilos

Edita los archivos:
- `src/app/(auth)/login/page.tsx` - Página de login
- `src/app/page.tsx` - Página home
- `src/app/globals.css` - Estilos globales

### Agregar más providers OAuth

Consulta la documentación completa en `.claude/prompts/autenticacion-supabase.md` para instrucciones sobre cómo agregar GitHub, Facebook, etc.

### Modificar perfil de usuario

Edita `src/shared/types/user.types.ts` para agregar más campos al perfil.

## 🔒 Seguridad

Este template incluye:
- ✅ Validación de variables de entorno
- ✅ Route guards automáticos
- ✅ Rate limiting en fetches de perfil
- ✅ Manejo seguro de tokens
- ✅ HTTPS en producción (Vercel/Netlify)

## 🚀 Deploy a Producción

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

Configura las variables de entorno en el dashboard de Vercel.

### Netlify

```bash
npm run build
# Sube la carpeta .next/ a Netlify
```

## 📚 Recursos Adicionales

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Guía completa en .claude/prompts/](/.claude/prompts/autenticacion-supabase.md)

## 🤝 Contribuir

Este template es parte de SaaS Factory. Para mejoras o sugerencias, abre un issue o PR.

## 📄 Licencia

MIT

---

**Creado con ❤️ para la comunidad**

¿Tienes preguntas? Consulta la [documentación completa](.claude/prompts/autenticacion-supabase.md)
