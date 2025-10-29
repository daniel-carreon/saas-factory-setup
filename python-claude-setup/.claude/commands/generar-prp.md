---
description: "Genera una Propuesta de Requerimientos de Producto (PRP) comprehensiva con investigación profunda del codebase y recursos externos."
argument-hint: "[archivo-requerimientos o descripción-feature]"
---

# Generador de PRP (Propuesta de Requerimientos de Producto)

Crea un documento PRP comprensivo que permita **"éxito de implementación en un solo pase através de contexto comprensivo"**.

## Archivo de Input: $ARGUMENTS

Si se proporciona un archivo (ej: `INITIAL.md`), léelo primero. Si es solo texto, úsalo como descripción de la feature.

## 🔍 Fase 1: Research Exhaustivo

### 1.1 **Análisis Profundo del Codebase**

**IMPORTANTE: Lanza el agente `codebase-analyst` para análisis sistemático**

```bash
# El agente codebase-analyst analizará:
- Patrones arquitectónicos existentes
- Convenciones de nomenclatura (archivos, funciones, clases)
- Patrones de testing y comandos de validación
- Implementaciones similares a la feature solicitada
- Puntos de integración existentes
```

**Adicionalmente, realiza búsquedas directas:**
- **Similar features**: Usa Grep para encontrar implementaciones parecidas
- **Patterns to follow**: Identifica patrones que se repiten
- **Integration points**: Dónde conectará la nueva feature
- **Test patterns**: Cómo están estructurados los tests actuales

**Output esperado del codebase analysis:**
```yaml
similar_implementations:
  - file: "src/features/auth/services/authService.ts"
    pattern: "Service pattern with error handling"
    relevance: "Similar API integration approach"

patterns:
  naming:
    files: "kebab-case para archivos"
    functions: "camelCase, verbos descriptivos"

  architecture:
    feature_structure: |
      feature/
      ├── components/
      ├── hooks/
      ├── services/
      ├── types/
      └── store/

  testing:
    framework: "Jest + React Testing Library"
    pattern: "AAA pattern (Arrange, Act, Assert)"
    commands: "npm test"

validation_commands:
  syntax: "npm run lint && npm run type-check"
  test: "npm test"
  build: "npm run build"
```

### 1.2 **Research Externo**

**Web Search** (usa WebSearch tool si está disponible):
- Best practices para el tipo de feature
- Documentación oficial de libraries/frameworks relevantes
- Implementaciones de referencia (GitHub, blogs técnicos)
- Common pitfalls y gotchas conocidos
- Consideraciones de seguridad

**URLs Críticas a Documentar:**
```yaml
- url: "https://nextjs.org/docs/app/building-your-application/..."
  section: "[Sección específica relevante]"
  why: "[Por qué es crítico para esta implementación]"

- url: "https://docs.library.com/api-reference/..."
  critical: "[Gotcha o patrón clave]"
  example: "[Link a ejemplo específico]"
```

### 1.3 **Clarificación con el Usuario** (si es necesario)

Si encuentras ambigüedades críticas, pregunta:
- **Patrones específicos**: "¿Debo seguir el patrón de X o Y?"
- **Tecnologías**: "¿Usar library A o B?"
- **Scope**: "¿Incluir feature Z o dejarlo para después?"
- **Integración**: "¿Cómo debe conectar con el módulo X existente?"

---

## 📝 Fase 2: Generación del PRP

### 2.1 **Usar Template Base**

Usa el template en `PRPs/templates/prp_base.md` como estructura base.

### 2.2 **Contexto Crítico a Incluir**

#### **Documentation & References**
```yaml
MUST_READ:
  - url: "[Official API docs]"
    why: "[Specific sections you'll need]"

  - file: "src/features/similar-feature/service.ts"
    why: "[Pattern to follow - error handling approach]"

  - doc: "[Library documentation URL]"
    section: "[Specific gotchas section]"
    critical: "[Key insight that prevents common errors]"
```

#### **Known Gotchas**
```python
# CRITICAL: Next.js 16 requires "use cache" directive for cached components
# Example: FastAPI requires async functions for async operations
# Example: Supabase RLS must be configured before queries work
# Example: Zustand persist middleware needs storage configuration
```

#### **Current Codebase Tree**
```bash
# Ejecuta tree o ls para mostrar estructura actual
src/
├── app/
├── features/
│   ├── auth/
│   └── existing-feature/
└── shared/
```

#### **Desired Codebase Tree** (con archivos nuevos)
```bash
src/
├── app/
├── features/
│   ├── auth/
│   ├── existing-feature/
│   └── new-feature/          # ← NUEVO
│       ├── components/
│       │   └── NewFeature.tsx
│       ├── hooks/
│       │   └── useNewFeature.ts
│       ├── services/
│       │   └── newFeatureService.ts
│       ├── types/
│       │   └── index.ts
│       └── store/
│           └── newFeatureStore.ts
└── shared/
```

### 2.3 **Implementation Blueprint**

#### **Pseudocode con CRITICAL comments**
```typescript
// PATTERN: Always validate input first (see src/shared/validators)
async function newFeature(input: Input): Promise<Result> {
  // GOTCHA: This API requires rate limiting (10 req/sec max)
  await rateLimiter.acquire();

  // CRITICAL: Use existing retry decorator (see src/shared/utils)
  @retry(attempts: 3, backoff: exponential)
  async function callAPI() {
    // PATTERN: Standard error handling (see similar-feature/service)
    try {
      const result = await externalAPI.call(input);
      return formatResponse(result);
    } catch (error) {
      // CRITICAL: Log to monitoring service
      logger.error({ error, context: 'newFeature' });
      throw new ServiceError('Feature failed', error);
    }
  }

  return await callAPI();
}
```

#### **Task List (orden de implementación)**
```yaml
Task 1: Setup data models
  CREATE: src/features/new-feature/types/index.ts
  MIRROR: src/features/auth/types/index.ts (pattern)
  VALIDATE: TypeScript compiles without errors

Task 2: Implement service layer
  CREATE: src/features/new-feature/services/service.ts
  MIRROR: src/features/similar-feature/services/ (error handling)
  INJECT: Rate limiting decorator
  VALIDATE: Unit tests pass

Task 3: Create React components
  CREATE: src/features/new-feature/components/
  FOLLOW: Existing component patterns
  VALIDATE: Renders without errors

Task N: Integration & testing
  MODIFY: src/app/page.tsx (add new feature)
  CREATE: tests/e2e/new-feature.spec.ts
  VALIDATE: All tests green
```

### 2.4 **Validation Gates** (Must be Executable)

#### **Level 1: Syntax & Style**
```bash
# Frontend (Next.js)
npm run lint
npm run type-check

# Backend (Python) - si aplica
ruff check --fix
mypy backend/
```

#### **Level 2: Unit Tests**
```bash
# Frontend
npm test -- --coverage

# Backend - si aplica
pytest tests/unit/ -v --cov
```

#### **Level 3: Integration Test**
```bash
# Start dev server
npm run dev

# Test endpoint/feature manually
curl http://localhost:3000/api/new-feature \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Expected: 200 OK with valid response
```

#### **Level 4: E2E Tests** (si aplica)
```bash
npm run test:e2e
# Or: npx playwright test
```

---

## 🎯 Fase 3: Quality Check & Output

### 3.1 **Checklist de Calidad**
- [ ] Todo el contexto necesario está incluido
- [ ] Validation gates son ejecutables por AI
- [ ] Referencias a archivos existentes son precisas
- [ ] Implementation path es claro paso a paso
- [ ] Error handling está documentado
- [ ] Gotchas y anti-patterns están marcados
- [ ] Tests requirements están definidos

### 3.2 **Confidence Score**

Puntúa el PRP de 1-10 (confianza de implementación one-shot):

```markdown
## Confidence Score: _/10

### Justificación:
✅ Factores que aumentan confianza:
- [Ej: "Patrón similar existe en el codebase"]
- [Ej: "Documentación oficial clara"]

⚠️ Áreas de incertidumbre:
- [Ej: "Library poco documentada"]
- [Ej: "Integración con sistema legacy"]

📋 Recomendaciones:
- [Ej: "Hacer spike técnico primero"]
- [Ej: "Consultar con equipo X"]
```

### 3.3 **Guardar Archivo**

```bash
# Guardar como:
PRPs/[feature-name]-[YYYY-MM-DD].md

# Ejemplo:
PRPs/auth-oauth-google-2025-10-29.md
```

---

## 📦 Output Format

El PRP generado debe seguir la estructura de `prp_base.md`:

```markdown
# PRP: [Nombre Feature]

## Goal
[Qué se construirá - estado final]

## Why
- Valor de negocio
- Problemas que resuelve

## What
[Requerimientos técnicos y comportamiento esperado]

### Success Criteria
- [ ] [Criterio medible 1]
- [ ] [Criterio medible 2]

## All Needed Context

### Documentation & References
[URLs y files con justificación]

### Current Codebase Tree
[Estructura actual]

### Desired Codebase Tree
[Con nuevos archivos marcados]

### Known Gotchas
[Crítico - evitar common mistakes]

## Implementation Blueprint

### Data Models
[Pydantic/Zod schemas]

### Task List
[Orden de implementación task by task]

### Pseudocode per Task
[Con CRITICAL/PATTERN/GOTCHA comments]

### Integration Points
[Database, config, routes]

## Validation Loop

### Level 1: Syntax & Style
[Comandos ejecutables]

### Level 2: Unit Tests
[Test cases específicos]

### Level 3: Integration Test
[Comandos curl o scripts]

### Level 4: E2E Tests
[Si aplica]

## Final Validation Checklist
- [ ] Tests pass
- [ ] No linting errors
- [ ] No type errors
- [ ] Manual test successful
- [ ] Docs updated

## Anti-Patterns to Avoid
- ❌ [Pattern incorrecto 1]
- ❌ [Pattern incorrecto 2]

## Confidence Score: _/10
[Justificación detallada]
```

---

## 🎓 Principio Fundamental

> **"El objetivo es que cualquier desarrollador (o IA) pueda implementar la feature exitosamente sin investigación adicional significativa."**

La calidad del PRP determina directamente el éxito de la implementación. Invierte tiempo en research para ejecutar rápido después.

---

## Uso

```bash
# Con archivo de requerimientos
/generar-prp INITIAL.md

# Con descripción directa
/generar-prp "Agregar autenticación OAuth con Google"
```

**Siguiente paso después de generar el PRP:**
```bash
/ejecutar-prp PRPs/[nombre-del-prp].md
```
