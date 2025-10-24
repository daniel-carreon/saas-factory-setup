# 🏭 SaaS Factory - Sistema de Setups Estandarizados

Sistema de templates estandarizados para construir aplicaciones en tiempo record con Claude Code.

## 📦 3 Setups Listos para Usar

| Setup | Caso de Uso | Stack |
|-------|-----------|-------|
| **setup/** | Solo configuración Claude Code | .claude/ |
| **nextjs-claude-setup/** | Frontend-only | Next.js + Supabase |
| **python-claude-setup/** | Full-stack | Next.js + FastAPI + Supabase |

## 🚀 Quick Start (30 segundos)

```bash
# 1. Clonar repo
git clone https://github.com/daniel-carreon/saas-factory-setup.git
cd saas-factory-setup

# 2. Copiar setup elegido
rsync -av nextjs-claude-setup/ ~/mi-proyecto/

# 3. Listo! Abre en Claude Code
cd ~/mi-proyecto
claude-code .
```

## 💡 Qué Incluyen los Setups

Cada setup tiene:

- **CLAUDE.md** - System prompt adaptado a cada tech stack (principios, architecture, comandos)
- **.claude/** - Configuración idéntica en los 3:
  - `commands/` - 7 slash commands listos
  - `agents/` - 2 agentes especializados
  - `hooks/` - Logging infrastructure
  - `skills/` - Sistema de skills Anthropic + skill-creator

## 🎯 Key Features

### 1. **Skill Creator**
```bash
# Crear nuevo skill
python .claude/skills/skill-creator/scripts/init_skill.py mi-skill

# Validar
python .claude/skills/skill-creator/scripts/quick_validate.py ./mi-skill

# Empaquetar
python .claude/skills/skill-creator/scripts/package_skill.py ./mi-skill
```

### 2. **Architecture Patterns**
- **Frontend**: Feature-First (todos los setups)
- **Backend**: Clean Architecture (solo python-claude-setup)
- **Hybrid**: Optimizado para desarrollo asistido por IA

### 3. **CLAUDE.md Strategy**
- ✅ Principios (KISS, DRY, SOLID) - **idénticos en los 3**
- ✅ Testing, Security, Git Workflow - **idénticos en los 3**
- ❌ Architecture & Tech Stack - **varían según setup**

## 📚 Archivos Base

```
setup/
├── CLAUDE.md              # System prompt base
├── claude-setup.md        # Referencia completa
└── .claude/               # Config reusable
```

Edita primero `setup/CLAUDE.md` para cambios globales, luego replica a los otros 2.

## 📖 Documentación

- **CLAUDE.md en cada setup** - Lee esto primero en tu proyecto
- **.claude/skills/SKILLS_README.md** - Guía Anthropic sobre skills
- **.claude/commands/** - Cada comando tiene documentación inline

## 🎯 Next Steps

### Generar Infraestructura de Carpetas

Para que funcione inmediatamente al clonar, genera estructura base:

```bash
# Para nextjs-claude-setup
mkdir -p nextjs-claude-setup/{src/{app,features,shared},public,supabase/migrations,docs}
touch nextjs-claude-setup/package.json
touch nextjs-claude-setup/tsconfig.json
touch nextjs-claude-setup/next.config.js

# Para python-claude-setup
mkdir -p python-claude-setup/{frontend/src/{app,features,shared},backend/{api,application,domain,infrastructure},supabase/migrations,docs}
touch python-claude-setup/frontend/package.json
touch python-claude-setup/backend/main.py
touch python-claude-setup/backend/requirements.txt
```

### Scripts Sugeridos

1. **Auto-setup script** - Automatizar creación de infraestructura
2. **Port detection** - Configurar auto-port en dev servers (3000-3006 / 8000-8006)
3. **DB migration helpers** - Scripts para Supabase setup

---

**SaaS Factory v1.0** | Actualizado: Octubre 2025
