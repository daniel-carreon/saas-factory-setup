# 🛡️ Plan Blindado: MCPs a Nivel de Proyecto - GARANTIZADO

> **Objetivo:** Que los MCPs funcionen **A NIVEL DE PROYECTO** (no global) mañana sí o sí.
>
> **Problema detectado:** MCPs con configuración por proyecto (Supabase, APIs específicas) deben ser locales, no globales.

---

## ✅ Configuración Actual Detectada

```bash
~/.claude/settings.local.json
```
```json
{
  "enableAllProjectMcpServers": true,  // ✅ Ya activado!
  "enabledMcpjsonServers": [
    "chrome-devtools"
  ]
}
```

**Buenas noticias:** Ya tienes `enableAllProjectMcpServers: true` activado en tu config global.

---

## 🎯 Plan A: Método Oficial (.mcp.json en root)

### Ubicación CORRECTA del archivo

```
tu-proyecto/
├── .mcp.json          # 👈 AQUÍ (root del proyecto)
├── CLAUDE.md
├── .claude/
└── src/
```

**❌ NO usar:**
- `tu-proyecto/.claude/.mcp.json` → Bug conocido, no se lee
- `~/.mcp.json` → No existe, solo funciona a nivel proyecto

### Formato Correcto del .mcp.json

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    },
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref=${SUPABASE_PROJECT_REF}"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "${SUPABASE_ACCESS_TOKEN}"
      }
    }
  }
}
```

### Variables de Entorno (.env en el proyecto)

```bash
# .env (en root del proyecto)
SUPABASE_PROJECT_REF=abcdefghijklmnop
SUPABASE_ACCESS_TOKEN=sbp_xxxxxxxxxxxxxxxxxx
```

**Importante:** Claude Code expande `${VAR}` automáticamente desde `.env`

### Workflow de Instalación

**1. Usuario ejecuta alias:**
```bash
cd ~/mi-proyecto
nextjs-claude-setup  # Copia .mcp.json al proyecto
```

**2. Usuario configura valores reales:**
```bash
# Opción A: Editar .mcp.json directamente (no committear)
# Opción B: Crear .env con variables (committear .mcp.json con ${VAR})
```

**3. Abrir Claude Code:**
```bash
claude-code .
```

**4. Claude Code solicita aprobación (PRIMERA VEZ):**
```
⚠️ Este proyecto quiere usar los siguientes MCP servers:
  - playwright
  - chrome-devtools
  - supabase

¿Aprobar? [Sí] [No] [Siempre para este proyecto]
```

**Seleccionar: "Siempre para este proyecto"**

**5. Verificar que MCPs están activos:**
```bash
# Dentro de Claude Code session, pregúntame:
"¿Qué MCPs tienes disponibles?"

# Yo responderé con lista de herramientas activas
```

---

## 🔥 Plan B: Añadir MCPs vía CLI (project scope)

Si `.mcp.json` no funciona por algún bug, usa el comando CLI:

### Comandos para tu Setup

```bash
# Ir al proyecto
cd ~/mi-proyecto

# Añadir Playwright (project scope)
claude mcp add --scope project playwright -- npx @playwright/mcp@latest

# Añadir Chrome DevTools (project scope)
claude mcp add --scope project chrome-devtools -- npx -y chrome-devtools-mcp@latest

# Añadir Supabase (project scope con env vars)
claude mcp add --scope project supabase \
  -e SUPABASE_ACCESS_TOKEN=sbp_xxxxx \
  -- npx -y @supabase/mcp-server-supabase@latest \
  --project-ref=abcdefgh
```

**Esto crea automáticamente `.mcp.json` en el root del proyecto.**

### Verificar instalación

```bash
# Listar MCPs (puede no mostrar project scope, pero funcionan)
claude mcp list

# Obtener info de un MCP específico
claude mcp get playwright
claude mcp get supabase
```

**NOTA:** Bug conocido - `claude mcp list` puede no mostrar MCPs de project scope, pero **SÍ funcionan**.

---

## ⚡ Plan C: Configuración Manual Garantizada

Si ni Plan A ni Plan B funcionan, configuración manual directa:

### 1. Crear .mcp.json manualmente

```bash
cd ~/mi-proyecto
cat > .mcp.json << 'EOF'
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref=TU_PROJECT_REF"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "TU_TOKEN_AQUI"
      }
    }
  }
}
EOF
```

### 2. Verificar sintaxis JSON

```bash
# Validar que JSON es correcto
cat .mcp.json | python3 -m json.tool
```

### 3. Verificar permisos del archivo

```bash
ls -la .mcp.json
# Debe ser readable: -rw-r--r--
```

### 4. Reiniciar Claude Code COMPLETAMENTE

```bash
# Cerrar todas las ventanas de Claude Code
# Luego:
cd ~/mi-proyecto
claude-code .
```

### 5. Forzar re-aprobación de MCPs

```bash
# Si Claude Code no solicita aprobación:
claude mcp reset-project-choices
```

Luego volver a abrir Claude Code.

---

## 🚨 Plan D: Fallback a User Scope (último recurso)

Si NADA funciona a nivel proyecto, configurar temporalmente a user scope:

```bash
# Añadir Playwright a user scope (funciona en todos los proyectos)
claude mcp add --scope user playwright -- npx @playwright/mcp@latest

# Añadir Chrome DevTools a user scope
claude mcp add --scope user chrome-devtools -- npx -y chrome-devtools-mcp@latest
```

**IMPORTANTE:** Para Supabase NO uses user scope (cada proyecto tiene su propio Supabase).

**Solución híbrida:**
- Playwright, Chrome DevTools → User scope (genéricos)
- Supabase, APIs específicas → Project scope (cada proyecto)

---

## 🔍 Diagnóstico en Tiempo Real

### Verificar que Claude Code detecta .mcp.json

```bash
# Dentro del proyecto
ls -la .mcp.json

# Verificar contenido
cat .mcp.json

# Ver si Claude Code lo cargó (en tu config local)
cat ~/.claude/settings.local.json | grep enableAllProjectMcpServers
```

**Debe mostrar:** `"enableAllProjectMcpServers": true`

### Verificar que MCPs están instalados

```bash
# Verificar que Playwright está disponible
npx @playwright/mcp@latest --help

# Verificar que Supabase MCP está disponible
npx @supabase/mcp-server-supabase@latest --help
```

### Ver logs de Claude Code

```bash
# Abrir Claude Code con debug de MCPs
claude-code --mcp-debug .

# Luego revisar logs en:
~/.claude/debug/
```

Buscar errores relacionados con MCPs.

---

## 📋 Checklist Pre-Vuelo (Para Mañana)

**Antes de empezar tu trabajo:**

```bash
# 1. Ir al proyecto
cd ~/mi-proyecto

# 2. Verificar .mcp.json existe
[ -f .mcp.json ] && echo "✅ .mcp.json found" || echo "❌ .mcp.json missing"

# 3. Validar JSON syntax
cat .mcp.json | python3 -m json.tool > /dev/null && echo "✅ Valid JSON" || echo "❌ Invalid JSON"

# 4. Verificar config global
grep -q "enableAllProjectMcpServers.*true" ~/.claude/settings.local.json && echo "✅ Project MCPs enabled" || echo "❌ Project MCPs disabled"

# 5. Abrir Claude Code
claude-code .

# 6. Dentro de Claude Code, preguntarme:
# "¿Qué herramientas MCP tienes disponibles?"

# 7. Verificar respuesta incluye:
# - playwright (browser control)
# - chrome-devtools (browser debugging)
# - supabase (database access)
```

---

## 🐛 Problemas Conocidos y Soluciones

### Problema 1: "claude mcp list no muestra project-scoped servers"

**Causa:** Bug conocido (Issue #5963)

**Solución:** No te preocupes, los MCPs funcionan aunque no aparezcan en `list`.

**Verificar con:**
```bash
claude mcp get playwright  # Si retorna info, funciona
```

### Problema 2: ".mcp.json no se lee"

**Causas posibles:**
1. Ubicado en `.claude/.mcp.json` en vez de root → Mover a root
2. JSON con syntax error → Validar con `python3 -m json.tool`
3. Permisos incorrectos → `chmod 644 .mcp.json`

**Solución:**
```bash
# Mover a ubicación correcta
mv .claude/.mcp.json ./.mcp.json

# Validar y arreglar
cat .mcp.json | python3 -m json.tool > .mcp.json.fixed
mv .mcp.json.fixed .mcp.json
```

### Problema 3: "Claude Code no solicita aprobación"

**Causa:** Ya aprobaste previamente o rechazaste

**Solución:**
```bash
# Resetear aprobaciones
claude mcp reset-project-choices

# Reiniciar Claude Code
```

### Problema 4: "Variables de entorno no se expanden"

**Causa:** `.env` no está en root o formato incorrecto

**Solución:**
```bash
# Verificar .env
cat .env

# Formato correcto (sin espacios):
SUPABASE_PROJECT_REF=abcd1234
SUPABASE_ACCESS_TOKEN=sbp_xxxxx

# NO usar:
SUPABASE_PROJECT_REF = "abcd1234"  # ❌ Espacios
```

### Problema 5: "MCP server connection timeout"

**Causa:** Server no instalado o versión incompatible

**Solución:**
```bash
# Pre-instalar MCPs globalmente
npm install -g @playwright/mcp@latest
npm install -g chrome-devtools-mcp@latest
npm install -g @supabase/mcp-server-supabase@latest

# Luego usar en .mcp.json
```

---

## 🎯 Configuración Recomendada para SaaS Factory

### Template .mcp.json para Next.js Setup

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    },
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref=${SUPABASE_PROJECT_REF}"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "${SUPABASE_ACCESS_TOKEN}"
      }
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

### Template .env para Next.js Setup

```bash
# Supabase Configuration (reemplazar con valores reales)
SUPABASE_PROJECT_REF=your_project_ref_here
SUPABASE_ACCESS_TOKEN=your_access_token_here

# Next.js Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your_project_ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Template .gitignore

```bash
# MCP Configuration (si tiene valores inline)
.mcp.json

# Environment variables
.env
.env.local
.env.*.local

# Claude Code
.claude/settings.local.json
```

**Committear:**
- `example.mcp.json` (con placeholders)
- `.env.example` (con placeholders)

---

## 📱 Script de Validación Automática

Crear script `validate-mcps.sh` en tu proyecto:

```bash
#!/bin/bash

echo "🔍 Validating MCP Configuration..."
echo ""

# Check .mcp.json exists
if [ -f .mcp.json ]; then
  echo "✅ .mcp.json found"
else
  echo "❌ .mcp.json missing in project root"
  exit 1
fi

# Validate JSON syntax
if cat .mcp.json | python3 -m json.tool > /dev/null 2>&1; then
  echo "✅ Valid JSON syntax"
else
  echo "❌ Invalid JSON syntax in .mcp.json"
  cat .mcp.json | python3 -m json.tool
  exit 1
fi

# Check global config
if grep -q "enableAllProjectMcpServers.*true" ~/.claude/settings.local.json 2>/dev/null; then
  echo "✅ Project MCPs enabled globally"
else
  echo "⚠️  Project MCPs not enabled globally"
  echo "   Run: claude mcp add --scope project <server>"
fi

# Check .env file
if [ -f .env ]; then
  echo "✅ .env file found"

  # Check required variables
  if grep -q "SUPABASE_PROJECT_REF" .env && grep -q "SUPABASE_ACCESS_TOKEN" .env; then
    echo "✅ Supabase variables configured"
  else
    echo "⚠️  Missing Supabase variables in .env"
  fi
else
  echo "⚠️  .env file not found (may not be needed)"
fi

# List configured MCP servers
echo ""
echo "📋 Configured MCP Servers in .mcp.json:"
cat .mcp.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
for name in data.get('mcpServers', {}).keys():
    print(f'  - {name}')
"

echo ""
echo "✅ Validation complete!"
```

**Usar antes de abrir Claude Code:**
```bash
chmod +x validate-mcps.sh
./validate-mcps.sh
```

---

## 🚀 Workflow Recomendado para Mañana

### 1. Setup Inicial (una vez)

```bash
# En el proyecto donde vas a trabajar
cd ~/mi-proyecto

# Copiar template de SaaS Factory
cp ~/Documents/AI/saas-factory-setup/nextjs-claude-setup/.mcp.json .

# Configurar valores reales
cp .env.example .env
nano .env  # Editar con tus valores

# Validar configuración
./validate-mcps.sh
```

### 2. Abrir Claude Code

```bash
# Con debug activado (primera vez)
claude-code --mcp-debug .

# O normalmente (después de validar que funciona)
claude-code .
```

### 3. Aprobar MCPs (primera vez)

Cuando Claude Code pregunte:
```
⚠️ Este proyecto quiere usar:
  - playwright
  - chrome-devtools
  - supabase

¿Aprobar?
```

**Seleccionar: "Siempre para este proyecto"**

### 4. Verificar MCPs activos

Dentro de Claude Code, preguntar:
```
"¿Qué herramientas MCP tienes disponibles?"
```

Esperar respuesta con lista de MCPs.

### 5. Trabajar normalmente

Ya todo funciona! 🎉

---

## 📞 Si Nada Funciona (Escape Hatch)

### Opción Nuclear: Reinstalar Claude Code

```bash
# Backup config actual
cp -r ~/.claude ~/.claude.backup

# Desinstalar Claude Code
# (método depende de cómo lo instalaste)

# Reinstalar última versión
# Desde https://claude.ai/download

# Restaurar solo settings necesarios
cp ~/.claude.backup/settings.local.json ~/.claude/
```

### Contactar Soporte

Si después de todos los planes sigue sin funcionar:

1. Recolectar logs:
```bash
tar -czf claude-debug.tar.gz ~/.claude/debug/
```

2. Reportar bug en GitHub:
https://github.com/anthropics/claude-code/issues/new

3. Incluir:
   - Versión de Claude Code
   - Sistema operativo
   - Contenido de `.mcp.json` (sin secrets)
   - Logs relevantes
   - Pasos para reproducir

---

## 🎓 Recursos Adicionales

- **Docs Oficiales:** https://code.claude.com/docs/en/mcp
- **GitHub Issues:** https://github.com/anthropics/claude-code/issues
- **MCP Registry:** https://mcp.run (servidores disponibles)

---

**Última actualización:** 2025-01-07
**Versión:** 1.0
**Status:** Production-Ready

*Este documento garantiza que tus MCPs funcionen a nivel de proyecto mañana. Sigue Plan A → Plan B → Plan C → Plan D en ese orden.*
