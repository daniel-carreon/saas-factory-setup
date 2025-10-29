---
description: "Inicializar contexto del proyecto para el asistente AI. Usa esto al comenzar una nueva conversación para que Claude entienda rápidamente tu proyecto."
---

# Primer: Contexto Inicial del Proyecto

Proporciona un resumen ejecutivo del proyecto actual al asistente AI para que entienda rápidamente el contexto y pueda ser productivo desde el primer mensaje.

## Proceso de Contextualización

### 1. **Leer Documentación Principal**

Lee en este orden de prioridad:

1. **CLAUDE.md** - Reglas globales y principios del proyecto
2. **README.md** - Visión general, setup, y guía de inicio
3. **PLANNING.md** o **ARQUITECTURA.md** (si existen) - Diseño del sistema
4. **package.json** / **pyproject.toml** / **requirements.txt** - Dependencias y scripts

### 2. **Analizar Estructura del Proyecto**

Para proyectos **Next.js** (frontend):
- `src/app/` - Rutas y páginas (App Router)
- `src/features/` - Módulos organizados por característica
- `src/shared/` - Código reutilizable (componentes, hooks, utils)
- `public/` - Archivos estáticos

Para proyectos **Python + Next.js** (full-stack):
- `frontend/src/` - Código del frontend (Next.js)
- `backend/` - API y lógica de negocio (FastAPI)
  - `api/` - Routers y endpoints
  - `domain/` - Modelos y lógica de negocio
  - `infrastructure/` - Database, external APIs
- `tests/` - Tests unitarios e integración

### 3. **Identificar Componentes Clave**

Busca y lee rápidamente:
- **Puntos de entrada**: `src/app/page.tsx`, `backend/main.py`
- **Configuración**: `next.config.js`, `backend/settings.py`
- **Base de datos**: Esquemas en `backend/domain/models/`
- **Autenticación**: Features/auth o middleware de auth

### 4. **Entender el Stack Tecnológico**

Identifica:
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind, Zustand
- **Backend** (si aplica): FastAPI, SQLModel, PostgreSQL/Supabase
- **Testing**: Jest, pytest, Playwright
- **Styling**: Tailwind CSS, shadcn/ui (si se usa)
- **State Management**: Zustand con persistencia

### 5. **Reportar Resumen al Usuario**

Proporciona un resumen estructurado:

```markdown
# 📊 Resumen del Proyecto

## 🎯 Propósito
[Descripción breve del proyecto y su objetivo principal]

## 🏗️ Arquitectura
- **Tipo**: [Frontend-only / Full-stack]
- **Pattern**: [Feature-First / Clean Architecture]
- **Database**: [PostgreSQL/Supabase / None]

## 🛠️ Stack Tecnológico
### Frontend
- [Lista de tecnologías frontend]

### Backend (si aplica)
- [Lista de tecnologías backend]

## 📂 Estructura de Archivos
```
[Árbol de directorios principales]
```

## 🔑 Componentes Clave
- **Entry Point**: [ruta al archivo principal]
- **Auth**: [dónde está implementado]
- **Database**: [esquemas y conexión]
- **API Routes**: [dónde están definidas]

## 🧪 Testing
- **Framework**: [Jest/pytest]
- **Comando**: [comando para ejecutar tests]
- **Cobertura**: [si hay target de cobertura]

## 📝 Principios de Desarrollo (de CLAUDE.md)
- [2-3 principios clave que sigue el proyecto]

## ✅ Configuración Actual
- **Node Version**: [versión si aplica]
- **Python Version**: [versión si aplica]
- **Dev Server**: [puerto y comando]
- **Build Command**: [comando de build]

## 🚀 Siguiente Paso
Estoy listo para ayudarte. ¿En qué quieres trabajar?
```

## Uso

```bash
# Al inicio de una conversación nueva
/primer

# El asistente leerá todo y te dará el resumen
# Luego puedes proceder con tu tarea
```

## Objetivo

Reducir de **5-10 minutos** de explicación manual a **30 segundos** de contexto automático, permitiendo que Claude sea productivo inmediatamente.

---

**Nota**: Este comando es especialmente útil después de pausas largas o al cambiar de proyecto.
