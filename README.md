# 🏭 SaaS Factory - Sistema de Setups Estandarizados

Sistema de templates estandardizados para construir aplicaciones en tiempo record con Claude Code como agente principal.

## 📦 Estructura de Setups

Tres setups diferentes adaptados a diferentes necesidades:

### 1. **setup/** - Cloud Setup (Base)
Configuración minimal con solo la base necesaria para `.claude`.

```
setup/
├── CLAUDE.md              # System prompt genérico
├── README-base.md         # Guía de uso
├── example.mcp.json       # Template MCPs
└── .claude/
    ├── commands/          # Slash commands
    ├── agents/            # Agentes especializados
    ├── hooks/             # Event hooks
    └── skills/            # Sistema de skills
        ├── SKILLS_README.md
        └── skill-creator/
            ├── SKILL.md
            ├── scripts/
            └── references/
```

**Uso**: Para proyectos donde solo necesitas configuración de Claude Code y skills.

```bash
# Copiar setup a nuevo proyecto
rsync -av setup/ ./proyecto/
# O usar alias: claude-setup
```

### 2. **nextjs-claude-setup/** - Next.js Only
Configuración para proyectos Frontend-only con Next.js.

```
nextjs-claude-setup/
├── CLAUDE.md              # System prompt + Feature-First
├── .claude/               # Configuración Claude Code
│   ├── commands/
│   ├── agents/
│   ├── hooks/
│   └── skills/
└── (carpetas generadas dinámicamente por setup)
    ├── frontend/          # Estructura Frontend-First
    ├── supabase/
    └── docs/
```

**CLAUDE.md Adaptado:**
- ✅ **Tech Stack**: Solo Frontend (Next.js, Tailwind, Zustand)
- ✅ **Architecture**: Feature-First únicamente
- ✅ **Comandos**: npm run dev, npm run test, etc.
- ✅ **Database**: Supabase para persistencia

**Uso**: Para aplicaciones Frontend-only con Next.js.

```bash
# Copiar setup a nuevo proyecto
rsync -av nextjs-claude-setup/ ./proyecto/
```

### 3. **python-claude-setup/** - Next.js + FastAPI (Full Stack)
Configuración completa con Frontend y Backend.

```
python-claude-setup/
├── CLAUDE.md              # System prompt + Hybrid Architecture
├── .claude/               # Configuración Claude Code
│   ├── commands/
│   ├── agents/
│   ├── hooks/
│   └── skills/
└── (carpetas generadas dinámicamente por setup)
    ├── frontend/          # Feature-First Architecture
    ├── backend/           # Clean Architecture (FastAPI)
    ├── supabase/          # Migraciones de BD
    └── docs/
```

**CLAUDE.md Adaptado:**
- ✅ **Tech Stack**: Frontend (Next.js) + Backend (FastAPI)
- ✅ **Architecture**: Feature-First (Frontend) + Clean Architecture (Backend)
- ✅ **Comandos**: `npm run dev` + `python dev_server.py`
- ✅ **Database**: Supabase compartida entre frontend y backend
- ✅ **Port Sync**: 3000 ↔ 8000, 3001 ↔ 8001, etc.

**Uso**: Para aplicaciones full-stack con frontend y backend separados.

```bash
# Copiar setup a nuevo proyecto
rsync -av python-claude-setup/ ./proyecto/
```

## 🎯 Diferencias Clave en CLAUDE.md

### ✅ Se Repite (TODO IGUAL)
```
✅ Principios de Desarrollo (KISS, DRY, SOLID)
✅ Convenciones de Código (TypeScript, Naming, Limits)
✅ Testing Strategy (TDD, AAA Pattern)
✅ Security Best Practices (Input Validation, Auth, Data Protection)
✅ Performance Guidelines (Code Splitting, State Management)
✅ Git Workflow & Repository Rules
✅ Pre-Development Validation Protocol
✅ Error-First Development Protocol
✅ AI Assistant Guidelines
✅ Advanced Real-Time Debugging
✅ Bucle Agéntico con Playwright MCP
✅ Commands section (adaptada al setup)
```

### ❌ Varía (Según Setup)
```
❌ Tech Stack (línea 16-23)
   - setup: N/A
   - nextjs: Frontend only
   - python: Frontend + Backend

❌ Architecture (línea 25-139)
   - setup: N/A
   - nextjs: Feature-First solo
   - python: Feature-First + Clean Architecture

❌ Comandos Importantes (línea 141-160)
   - setup: Skills Management + Git
   - nextjs: npm + Skills + Git
   - python: npm + python + Skills + Git
```

## 🔧 Sistema de Skills (.claude/skills/)

Cada setup incluye un sistema de skills completo:

### Carpeta: `.claude/skills/`
```
.claude/skills/
├── SKILLS_README.md        # Documentación sobre skills (Anthropic)
└── skill-creator/          # Herramienta para crear skills
    ├── SKILL.md            # Definición del skill-creator
    ├── scripts/
    │   ├── init_skill.py       # Crear nueva skill
    │   ├── quick_validate.py   # Validar estructura
    │   └── package_skill.py    # Empaquetar para distribuir
    └── references/
        └── SKILL_SPECIFICATION.md  # Especificación Anthropic

```

### Cómo Crear un Skill
```bash
# 1. Inicializar
python .claude/skills/skill-creator/scripts/init_skill.py mi-skill

# 2. Editar SKILL.md + agregar contenido
# 3. Validar
python .claude/skills/skill-creator/scripts/quick_validate.py ./mi-skill

# 4. Empaquetar
python .claude/skills/skill-creator/scripts/package_skill.py ./mi-skill

# 5. Instalar en Claude Code
/plugin install ./mi-skill.zip
```

### Estructura de un Skill
```
mi-skill/
├── SKILL.md              # Requerido: Metadatos + Instrucciones
├── scripts/              # Opcional: Código ejecutable
├── references/           # Opcional: Documentación
└── assets/              # Opcional: Recursos de salida
```

## 📋 .claude/ - Configuración Claude Code

Replicado en los 3 setups:

```
.claude/
├── settings.local.json     # Configuración del IDE
├── commands/               # Slash commands personalizados
│   ├── explorador.md
│   ├── ejecutar-prp.md
│   ├── generar-prp.md
│   ├── preparar-paralelo.md
│   ├── ejecutar-paralelo.md
│   ├── bucle-agentico.md
│   └── arreglar-issue-github.md
├── agents/                 # Agentes especializados
│   ├── validacion-calidad.md
│   └── gestor-documentacion.md
├── hooks/                  # Event hooks
│   └── log-tool-usage.sh
└── skills/                 # Sistema de skills
    ├── SKILLS_README.md
    └── skill-creator/
```

## 🚀 Quick Start

### Crear un nuevo proyecto con Next.js:
```bash
# 1. Crear directorio
mkdir my-nextjs-app
cd my-nextjs-app

# 2. Copiar setup
rsync -av ~/saas-factory/nextjs-claude-setup/ ./

# 3. Editar CLAUDE.md
# Cambiar: # Proyecto: [NOMBRE_DEL_PROYECTO]
# A: # Proyecto: Mi Aplicación Next.js

# 4. Editar example.mcp.json
cp example.mcp.json .mcp.json
# Agregar tus API keys

# 5. Initialize git
git init
git add .
git commit -m "feat: initial project setup with Claude template"

# 6. Abrir en Claude Code y empezar!
claude-code .
```

### Crear un nuevo proyecto Full-Stack:
```bash
# Igual proceso anterior pero con:
rsync -av ~/saas-factory/python-claude-setup/ ./

# Esto incluirá CLAUDE.md adaptado para frontend/ + backend/
```

## 📚 Archivos Importantes

### CLAUDE-base.md
Archivo original completo (480+ líneas) - **NO editar directamente**.
Usar como referencia para actualizaciones futuras.

### CLAUDE.md (en cada setup)
- **setup/**: Adaptado para Cloud-only
- **nextjs-claude-setup/**: Adaptado para Next.js
- **python-claude-setup/**: Adaptado para Full-Stack

### README-base.md
Documentación original sobre el sistema.

### example.mcp.json
Template para configurar MCPs (Model Context Protocol).

## 🔄 Actualizar Todos los Setups

Si necesitas actualizar algo en los 3 CLAUDE.md:

1. Editar **setup/CLAUDE.md** (la versión Cloud)
2. Cambiar solo la sección relevante
3. Replicar cambios a los otros dos:

```bash
# Actualizar nextjs-claude-setup
# (solo las secciones iguales)
rsync -av --ignore-existing setup/CLAUDE.md nextjs-claude-setup/

# Luego editar solo las diferencias
```

## 🎓 Filosofía del Sistema

**Principio**: Reutilizar el máximo posible, variar solo lo necesario.

```
CLAUDE-base.md (archivo de referencia)
    ↓
setup/CLAUDE.md (base estandarizada)
    ├─ nextjs-claude-setup/CLAUDE.md (+ Feature-First)
    ├─ python-claude-setup/CLAUDE.md (+ Feature-First + Clean Architecture)
    └─ (+ Skills en todas)
```

**Ventajas:**
- ✅ Mantener consistencia en principios y mejores prácticas
- ✅ Solo cambiar lo específico de cada tecnología
- ✅ Fácil actualización global
- ✅ Onboarding rápido con nuevos proyectos
- ✅ Sistema de skills integrado en todos

## 🆚 Comparativa Rápida

| Aspecto | setup/ | nextjs-claude-setup/ | python-claude-setup/ |
|---------|--------|---------------------|----------------------|
| **Frontend** | ❌ | ✅ Next.js | ✅ Next.js |
| **Backend** | ❌ | ❌ | ✅ FastAPI |
| **Database** | ❌ | ✅ Supabase | ✅ Supabase |
| **Architecture** | N/A | Feature-First | Feature-First + Clean |
| **Dev Commands** | Skills | npm | npm + python |
| **Use Case** | .claude only | Frontend-only | Full-Stack |

## 📞 Soporte

Para dudas sobre:
- **CLAUDE.md**: Ver inline comments (# ¿Por qué esta arquitectura?)
- **Skills**: Ver `.claude/skills/SKILLS_README.md`
- **Comandos**: Ver `.claude/commands/` (slash commands)
- **Agentes**: Ver `.claude/agents/` (specialized agents)

---

**SaaS Factory v1.0**
Sistema estandardizado para desarrollo rápido con Claude Code
Actualizado: Octubre 2025

