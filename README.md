# 🏭 SaaS Factory - Crea Apps en Minutos con IA

Sistema de templates para construir aplicaciones **production-ready** en tiempo record usando Claude Code.

## 🎯 ¿Qué es esto?

**SaaS Factory** te permite crear aplicaciones completas (frontend, backend, base de datos) en minutos en lugar de días. No necesitas ser programador - Claude Code (IA) hace el trabajo pesado por ti.

## 📦 3 Setups Disponibles

| Setup | ¿Para qué sirve? | Stack Tecnológico |
|-------|------------------|-------------------|
| **setup/** | Solo configuración de Claude Code | Configuración base |
| **nextjs-claude-setup/** | Aplicaciones web frontend | Next.js + Supabase |
| **python-claude-setup/** | Aplicaciones full-stack completas | Next.js + FastAPI + Supabase |

---

## 🚀 Quick Start - Configuración en 3 Pasos (2 minutos)

### Paso 1: Descarga este repositorio

```bash
# Copia y pega esto en tu terminal:
git clone https://github.com/daniel-carreon/saas-factory-setup.git
cd saas-factory-setup
```

### Paso 2: Abre en Claude Code

```bash
# Abre este proyecto en Claude Code:
claude-code .
```

### Paso 3: Pídele ayuda a Claude Code

Una vez que Claude Code esté abierto, **simplemente escribe esto en el chat**:

```
Hola, ayúdame a configurar SaaS Factory en mi computadora siguiendo las instrucciones de este README.
```

**Claude Code automáticamente:**
1. ✅ Detectará tu sistema (Mac/Linux/Windows)
2. ✅ Detectará tu terminal (zsh/bash)
3. ✅ Te preguntará qué setup quieres (Next.js o Python)
4. ✅ Configurará todo automáticamente
5. ✅ Te dirá cómo usarlo

**Listo! No necesitas hacer nada más.** Claude Code leerá las instrucciones de abajo y configurará todo por ti.

---

## 🤖 Instrucciones para Claude Code (AI Assistant)

> **Nota para usuarios**: Esta sección es para que Claude Code sepa qué hacer. No necesitas leerla si solo quieres usar el sistema.

### Cuando el usuario pida ayuda para configurar SaaS Factory:

#### 1. **Detectar el Sistema del Usuario**

```bash
# Detectar shell automáticamente
echo $SHELL
# Si retorna /bin/zsh → usar ~/.zshrc
# Si retorna /bin/bash → usar ~/.bashrc

# Detectar ubicación actual del repo
pwd
# Guardar esta ruta como REPO_PATH
```

#### 2. **Preguntar al Usuario qué Setup Quiere**

Usa `AskUserQuestion` con estas opciones:

```
Pregunta: "¿Qué tipo de aplicación vas a crear?"

Opciones:
1. "Aplicación web frontend" → nextjs-claude-setup
2. "Aplicación completa (frontend + backend)" → python-claude-setup
3. "Ambos (quiero tener las dos opciones)" → Ambos
```

#### 3. **Generar Aliases con las Rutas Correctas**

Basado en la respuesta, genera los aliases dinámicamente:

**Para Next.js:**
```bash
alias nextjs-claude-setup="cp [REPO_PATH]/nextjs-claude-setup/CLAUDE.md . && cp -r [REPO_PATH]/nextjs-claude-setup/.claude . && cp [REPO_PATH]/nextjs-claude-setup/.mcp.json . && cp [REPO_PATH]/nextjs-claude-setup/.gitignore . && cp [REPO_PATH]/nextjs-claude-setup/README.md ."
```

**Para Python:**
```bash
alias python-claude-setup="cp [REPO_PATH]/python-claude-setup/CLAUDE.md . && cp -r [REPO_PATH]/python-claude-setup/.claude . && cp [REPO_PATH]/python-claude-setup/.mcp.json . && cp [REPO_PATH]/python-claude-setup/.gitignore . && cp [REPO_PATH]/python-claude-setup/README.md ."
```

**Importante:** Reemplaza `[REPO_PATH]` con la ruta absoluta detectada en el paso 1.

#### 4. **Añadir Aliases al Archivo de Configuración**

```bash
# Añadir al archivo correcto (.zshrc o .bashrc)
echo "[ALIAS_GENERADO]" >> [RC_FILE]

# Aplicar cambios inmediatamente
source [RC_FILE]
```

#### 5. **Validar que Funcionó**

```bash
# Verificar que el alias existe
type nextjs-claude-setup  # o python-claude-setup

# Debe retornar: "nextjs-claude-setup is an alias for..."
```

#### 6. **Explicar al Usuario Cómo Usarlo**

Muéstrale este mensaje:

```
🎉 ¡Configuración completa!

Ahora puedes crear una nueva aplicación en segundos:

1. Ve a cualquier carpeta:
   cd ~/mis-proyectos/mi-nueva-app

2. Ejecuta el comando:
   nextjs-claude-setup    (o python-claude-setup)

3. Abre en Claude Code:
   claude-code .

4. Empieza a desarrollar con IA

¡Eso es todo! Tienes toda la configuración lista:
✅ System prompt optimizado (CLAUDE.md)
✅ Comandos, agentes y skills
✅ Configuración de MCPs
✅ README con guía completa
```

#### 7. **Troubleshooting Común**

Si el usuario reporta problemas:

**"No funciona el alias":**
```bash
# Verificar que se aplicaron los cambios
source ~/.zshrc  # o ~/.bashrc

# Si sigue sin funcionar, verificar que la ruta es correcta
cat ~/.zshrc | grep claude-setup
```

**"No encuentro mi archivo .zshrc":**
```bash
# Crear archivo si no existe
touch ~/.zshrc

# Volver a añadir alias
```

---

## 💡 ¿Qué Incluyen los Setups?

Cada setup viene con **TODO lo necesario** para empezar a desarrollar:

### 📄 Archivos Incluidos

```
tu-proyecto/
├── CLAUDE.md                 # System prompt - La IA lee esto automáticamente
├── README.md                 # Guía específica del setup
├── .mcp.json                 # Configuración de herramientas IA
├── .gitignore                # Archivos a ignorar en git
│
└── .claude/                  # Configuración de Claude Code
    ├── commands/             # 7 comandos listos (/explorador, /ejecutar-prp, etc.)
    ├── agents/               # 2 agentes especializados
    ├── PRPs/templates/       # Templates para features complejas
    ├── prompts/              # Metodologías (bucle agéntico, etc.)
    ├── hooks/                # Sistema de logging
    └── skills/               # Skills reutilizables + skill-creator
```

### 🎯 Características Principales

#### 1. **System Prompt Optimizado (CLAUDE.md)**
El agente de Claude Code lee este archivo automáticamente y sabe:
- Principios de desarrollo (KISS, DRY, SOLID)
- Arquitectura del proyecto
- Comandos disponibles
- Testing y security best practices
- Convenciones de código

#### 2. **Comandos Slash Listos**
Ejecuta comandos directamente en Claude Code:
- `/explorador` - Analiza tu código
- `/ejecutar-prp` - Implementa features complejas
- `/generar-prp` - Genera plan para nuevas features
- `/preparar-paralelo` - Tareas en paralelo
- Y más...

#### 3. **Agentes Especializados**
- **Codebase Analyst**: Analiza arquitectura y patrones
- **Gestor Documentación**: Mantiene docs actualizados

#### 4. **Skill Creator**
Crea y reutiliza "skills" (paquetes de conocimiento):
```bash
python .claude/skills/skill-creator/scripts/init_skill.py mi-skill
```

#### 5. **Arquitecturas Optimizadas para IA**
- **Frontend**: Feature-First (cada feature en su carpeta)
- **Backend**: Clean Architecture (capas bien definidas)
- Diseñadas para que la IA entienda el contexto rápidamente

---

## 🛠️ Método Alternativo (Manual)

Si prefieres no usar aliases, puedes copiar manualmente:

```bash
# 1. Clonar repo
git clone https://github.com/daniel-carreon/saas-factory-setup.git
cd saas-factory-setup

# 2. Ir a tu proyecto
cd ~/mi-nuevo-proyecto

# 3. Copiar el setup que quieras
cp -r ../saas-factory-setup/nextjs-claude-setup/{CLAUDE.md,.claude,.mcp.json,.gitignore,README.md} .

# 4. Abrir en Claude Code
claude-code .
```

---

## 📚 Siguiente Paso: Crear tu Primera App

Una vez configurado, sigue la guía del README específico de tu setup:

### Para Next.js (Frontend):
Lee `nextjs-claude-setup/README.md` - Incluye:
- Setup de Supabase
- Creación de features
- Testing
- Deploy a Vercel

### Para Python (Full-Stack):
Lee `python-claude-setup/README.md` - Incluye:
- Setup de frontend + backend
- Integración end-to-end
- Testing ambos lados
- Deploy frontend (Vercel) + backend (Railway)

---

## 🎨 Casos de Uso Reales

**¿Qué puedes construir con esto?**

✅ Dashboards financieros
✅ Sistemas de gestión (CRM, ERP)
✅ Apps con autenticación
✅ APIs RESTful
✅ Aplicaciones con base de datos
✅ SaaS completos
✅ Landing pages con backend
✅ Automatizaciones con UI

**Todo con IA haciendo el 90% del trabajo.**

---

## ❓ Preguntas Frecuentes

**P: ¿Necesito saber programar?**
R: No. Claude Code genera el código por ti. Solo necesitas describir lo que quieres.

**P: ¿Qué es Claude Code?**
R: Es el editor de código oficial de Anthropic (creadores de Claude). La IA está integrada directamente.

**P: ¿Esto funciona en Windows/Mac/Linux?**
R: Sí, funciona en los 3 sistemas operativos.

**P: ¿Cuánto cuesta?**
R: Claude Code tiene planes gratis y de pago. Los templates de SaaS Factory son 100% gratis.

**P: ¿Puedo modificar los templates?**
R: ¡Sí! Están diseñados para ser personalizados. El `CLAUDE.md` te guía cómo.

**P: ¿Qué pasa si no tengo Supabase?**
R: Puedes usar PostgreSQL local o cualquier otra base de datos. Los templates son flexibles.

---

## 🤝 Soporte y Comunidad

**¿Necesitas ayuda?**
1. Abre el proyecto en Claude Code
2. Pregúntale directamente: "Tengo este problema: [describe tu problema]"
3. Claude Code leerá el `CLAUDE.md` y te ayudará

**Para issues o sugerencias:**
- GitHub Issues: [github.com/daniel-carreon/saas-factory-setup/issues](https://github.com/daniel-carreon/saas-factory-setup/issues)

---

## 📖 Documentación Adicional

- **CLAUDE.md** (en cada setup) - System prompt completo
- **.claude/prompts/bucle-agentico.md** - Metodología de resolución de problemas
- **.claude/PRPs/templates/prp_base.md** - Template para features complejas
- **.claude/skills/SKILLS_README.md** - Guía de skills de Anthropic

---

## 🎯 Filosofía del Proyecto

**SaaS Factory** está diseñado con un principio simple:

> "La IA debe hacer el trabajo técnico. Tú solo debes describir lo que quieres."

Por eso:
- ✅ System prompts optimizados para Claude Code
- ✅ Arquitecturas que la IA entiende fácilmente
- ✅ Comandos que automatizan tareas complejas
- ✅ Templates que funcionan de inmediato

**No necesitas ser experto. Solo necesitas tener claridad de lo que quieres construir.**

---

**SaaS Factory v1.0** | Built for AI-first development 🤖

*"De la idea a producción en minutos, no en meses."*
