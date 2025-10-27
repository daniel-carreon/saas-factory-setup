# Proyecto: [NOMBRE_DEL_PROYECTO]

## 🎯 Principios de Desarrollo (Context Engineering)

### Design Philosophy
- **KISS**: Keep It Simple, Stupid - Prefiere soluciones simples
- **YAGNI**: You Aren't Gonna Need It - Implementa solo lo necesario  
- **DRY**: Don't Repeat Yourself - Evita duplicación de código
- **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion

### Descripción del Proyecto
[Breve descripción de qué hace tu proyecto y sus características principales]

## 🏗️ Tech Stack & Architecture

### Core Stack
**Frontend:**
- **Runtime**: Node.js + TypeScript
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Testing**: Jest + React Testing Library
- **Schema Validation**: Zod

**Backend:**
- **Runtime**: Python 3.10+
- **Framework**: FastAPI
- **ORM**: SQLModel (Pydantic + SQLAlchemy)
- **Database**: PostgreSQL/Supabase
- **Testing**: pytest
- **Task Queue**: Celery (optional)

### Hybrid Strategic Architecture

**Enfoque: Arquitectura Híbrida Estratégica optimizada para desarrollo asistido por IA**

Este proyecto combina **Feature-First en Frontend** con **Clean Architecture en Backend**, cada uno optimizado para su contexto específico.

#### Frontend: Feature-First
```
frontend/src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Rutas de autenticación (grupo)
│   ├── (main)/              # Rutas principales (grupo)
│   ├── layout.tsx           # Layout root
│   └── page.tsx             # Home page
│
├── features/                 # 🎯 Organizadas por funcionalidad
│   ├── auth/                # Feature: Autenticación
│   │   ├── components/      # Componentes específicos (LoginForm, etc.)
│   │   ├── hooks/           # Hooks específicos (useAuth, etc.)
│   │   ├── services/        # API calls (authService.ts)
│   │   ├── types/           # Tipos específicos (User, Session, etc.)
│   │   └── store/           # Estado local (authStore.ts)
│   │
│   ├── dashboard/           # Feature: Dashboard
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── store/
│   │
│   └── [feature]/           # Otras features...
│
└── shared/                   # Código reutilizable
    ├── components/          # UI components genéricos (Button, Card, etc.)
    ├── hooks/               # Hooks genéricos (useDebounce, useLocalStorage, etc.)
    ├── stores/              # Estado global (appStore.ts, userStore.ts)
    ├── types/               # Tipos compartidos (api.ts, domain.ts)
    ├── utils/               # Funciones utilitarias
    ├── lib/                 # Configuraciones (supabase.ts, axios.ts)
    ├── constants/           # Constantes de la app
    └── assets/              # Imágenes, iconos, etc.
```

#### Backend: Clean Architecture
```
backend/
├── main.py                   # Punto de entrada FastAPI
│
├── api/                      # 🌐 Capa de Interfaz/Presentación
│   ├── auth_deps.py         # Dependencias de autenticación
│   ├── [feature]_router.py  # Endpoints por feature
│   └── ...
│
├── application/              # 🎯 Casos de Uso/Orquestación
│   └── services/            # Servicios de aplicación
│       └── [feature]_service.py
│
├── domain/                   # 💎 Lógica de Negocio Pura
│   ├── models/              # Entidades (SQLModel)
│   ├── services/            # Servicios de dominio
│   ├── config/              # Configuración de dominio
│   └── interfaces/          # Abstracciones/Contratos
│
└── infrastructure/           # 🔧 Implementaciones Externas
    ├── persistence/         # Repositorios, DB access
    ├── external_apis/       # Clientes APIs externas
    └── config/              # Configuración de infraestructura
```

### Estructura de Proyecto Completa
```
proyecto/
├── frontend/                # Next.js - Feature-First Architecture
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   └── shared/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                 # FastAPI - Clean Architecture
│   ├── main.py
│   ├── api/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   ├── requirements.txt
│   └── pytest.ini
│
├── supabase/                # Migraciones de BD
│   └── migrations/
│
├── .claude/                 # Configuración Claude Code
│
└── docs/                    # Documentación técnica
```

> **🤖 ¿Por qué esta arquitectura híbrida?**
>
> Esta estructura fue diseñada específicamente para **desarrollo asistido por IA**. La combinación de Feature-First (frontend) y Clean Architecture (backend) permite que los AI assistants:
> - **Localicen rápidamente** el código relacionado con una funcionalidad
> - **Entiendan el contexto** sin navegar múltiples archivos dispersos
> - **Mantengan la separación de responsabilidades** al generar código nuevo
> - **Escalen el proyecto** añadiendo features sin afectar el código existente
> - **Generen código consistente** siguiendo los patrones establecidos en cada capa
>
> *La IA puede trabajar de forma más efectiva cuando la información está organizada siguiendo principios claros y predecibles.*

## 🛠️ Comandos Importantes

### Frontend Development
- `cd frontend && npm run dev` - Servidor de desarrollo Frontend (auto-detecta puerto 3000-3006)
- `cd frontend && npm run build` - Build para producción
- `cd frontend && npm run test` - Ejecutar tests Frontend

### Backend Development
- `cd backend && python dev_server.py` - Servidor de desarrollo Backend (auto-detecta puerto 8000-8006)
- `cd backend && python -m pytest` - Ejecutar tests Backend
- `cd backend && python -m pytest --cov` - Coverage report

### Skills Management
- `python .claude/skills/skill-creator/scripts/init_skill.py my-skill` - Crear nuevo skill
- `python .claude/skills/skill-creator/scripts/quick_validate.py ./my-skill` - Validar skill
- `python .claude/skills/skill-creator/scripts/package_skill.py ./my-skill` - Empaquetar skill

### Git Workflow
- `npm run commit` - Commit con Conventional Commits
- `npm run pre-commit` - Hook de pre-commit

## 📝 Convenciones de Código

### File & Function Limits
- **Archivos**: Máximo 500 líneas
- **Funciones**: Máximo 50 líneas
- **Componentes**: Una responsabilidad clara

### Naming Conventions
- **Variables/Functions**: `camelCase`
- **Components**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Files**: `kebab-case.extension`
- **Folders**: `kebab-case`

### TypeScript Guidelines
- **Siempre usar type hints** para function signatures
- **Interfaces** para object shapes
- **Types** para unions y primitives
- **Evitar `any`** - usar `unknown` si es necesario

### Component Patterns
```typescript
// ✅ GOOD: Proper component structure
interface Props {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
}

export function Button({ children, variant = 'primary', onClick }: Props) {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}
```

## 🧪 Testing Strategy

### Test-Driven Development (TDD)
1. **Red**: Escribe el test que falla
2. **Green**: Implementa código mínimo para pasar
3. **Refactor**: Mejora el código manteniendo tests verdes

### Test Structure (AAA Pattern)
```typescript
// ✅ GOOD: Clear test structure
test('should calculate total with tax', () => {
  // Arrange
  const items = [{ price: 100 }, { price: 200 }];
  const taxRate = 0.1;
  
  // Act
  const result = calculateTotal(items, taxRate);
  
  // Assert  
  expect(result).toBe(330);
});
```

### Coverage Goals
- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Critical paths
- **E2E Tests**: Main user journeys

## 🔒 Security Best Practices

### Input Validation
- Validate all user inputs
- Sanitize data before processing
- Use schema validation (Zod, Yup, etc.)

### Authentication & Authorization
- JWT tokens con expiración
- Role-based access control
- Secure session management

### Data Protection
- Never log sensitive data
- Encrypt data at rest
- Use HTTPS everywhere

## ⚡ Performance Guidelines

### Code Splitting
- Route-based splitting
- Component lazy loading
- Dynamic imports

### State Management
- Local state first
- Global state only when needed
- Memoization for expensive computations

### Database Optimization
- Index frequently queried columns
- Use pagination for large datasets
- Cache repeated queries

## 🔄 Git Workflow & Repository Rules

### Branch Strategy
- `main` - Production ready code
- `develop` - Integration branch
- `feature/TICKET-123-description` - Feature branches
- `hotfix/TICKET-456-description` - Hotfixes

### Commit Convention (Conventional Commits)
```
type(scope): description

feat(auth): add OAuth2 integration
fix(api): handle null user response  
docs(readme): update installation steps
```

### Pull Request Rules
- **No direct commits** a `main` o `develop`
- **Require PR review** antes de merge
- **All tests must pass** antes de merge
- **Squash and merge** para mantener historia limpia

## ❌ No Hacer (Critical)

### Code Quality
- ❌ No usar `any` en TypeScript
- ❌ No hacer commits sin tests
- ❌ No omitir manejo de errores
- ❌ No hardcodear configuraciones

### Security  
- ❌ No exponer secrets en código
- ❌ No loggear información sensible
- ❌ No saltarse validación de entrada
- ❌ No usar HTTP en producción

### Architecture
- ❌ No editar archivos en `src/legacy/`
- ❌ No crear dependencias circulares
- ❌ No mezclar concerns en un componente
- ❌ No usar global state innecesariamente

## 📚 Referencias & Context

### Project Files
- Ver @README.md para overview detallado
- Ver @package.json para scripts disponibles
- Ver @.claude/docs/ para workflows y documentación
- Ver @.mcp.json.examples para MCPs disponibles

### External Dependencies
- Documentación oficial de frameworks
- Best practices guides
- Security guidelines (OWASP)

## 🤖 AI Assistant Guidelines

### When Suggesting Code
- Siempre incluir types en TypeScript
- Seguir principles de CLAUDE.md
- Implementar error handling
- Incluir tests cuando sea relevante

### When Reviewing Code  
- Verificar adherencia a principios SOLID
- Validar security best practices
- Sugerir optimizaciones de performance
- Recomendar mejoras en testing

### Context Priority
1. **CLAUDE.md rules** (highest priority)
2. **.claude/docs/** workflows y guías
3. **Project-specific files** (package.json, etc.)
4. **General best practices**

## 🚀 Pre-Development Validation Protocol

### API & Dependencies Current Check
**CRÍTICO**: Siempre verificar antes de asumir
- [ ] ✅ Verificar que las versiones de APIs/modelos existen (ej: GPT-5 no existe aún)
- [ ] ✅ Confirmar que las librerías están actualizadas
- [ ] ✅ Validar endpoints externos funcionan
- [ ] ✅ Tener fallbacks para todas las dependencias externas

### Simplicity-First Development
- [ ] ✅ Crear versión simplificada primero (`simple_main.py`)
- [ ] ✅ Probar funcionalidad básica antes de agregar complejidad
- [ ] ✅ Mantener siempre una versión "modo demo" que funcione
- [ ] ✅ Implementar mock data para casos donde servicios externos fallen

### Incremental Validation Strategy
- [ ] ✅ Probar cada endpoint inmediatamente después de crearlo
- [ ] ✅ Usar TodoWrite para tracking sistemático de progreso
- [ ] ✅ Validar UI después de cada cambio importante
- [ ] ✅ Mantener logs detallados de errores para debugging

## 🔄 Error-First Development Protocol

### Manejo de Errores Predictivos
```python
# ✅ GOOD: Siempre incluir fallbacks
try:
    ai_result = await openai_call()
except Exception as e:
    print(f"AI call failed: {e}")
    ai_result = get_mock_fallback()  # Siempre tener fallback
```

### Debugging Sin Visibilidad Directa
- **Usar logs extensivos** con emojis para fácil identificación
- **Crear endpoints de testing** (`/test-connection`, `/health`)  
- **Implementar timeouts** en todas las llamadas externas
- **Hacer requests incrementales** - nunca asumir que algo complejo funcionará

## 🔌 Auto Port Detection (CRÍTICO para desarrollo)

### Problema: "EADDRINUSE - Puerto Ocupado"
**Solución implementada:** Scripts que auto-detectan puertos disponibles

### Frontend (Next.js) - Puertos 3000-3006
**Script:** `frontend/scripts/dev-server.js`

```javascript
// Auto-detecta primer puerto disponible en rango 3000-3006
// Checks both IPv4 (0.0.0.0) and IPv6 (::)
npm run dev  // Usa auto-port detection
```

**Características:**
- ✅ Chequea puertos 3000-3006 secuencialmente
- ✅ Compatible con IPv4 y IPv6 (Next.js usa `::`)
- ✅ Fallback automático si puerto ocupado
- ✅ Graceful shutdown (SIGINT/SIGTERM)

### Backend (FastAPI) - Puertos 8000-8006
**Script:** `backend/dev_server.py`

```python
# Auto-detecta primer puerto disponible en rango 8000-8006
python dev_server.py  # Usa auto-port detection
```

**Características:**
- ✅ Chequea puertos 8000-8006 secuencialmente
- ✅ Bind a `0.0.0.0` para acceso desde cualquier interface
- ✅ Fallback automático si puerto ocupado
- ✅ Keyboard interrupt handling

### CORS Backend Configuration
**Importante:** Backend CORS está configurado para soportar puertos dinámicos:

```python
# backend/main.py
ALLOWED_ORIGINS = [
    "https://tu-app.vercel.app",  # Production
    *[f"http://localhost:{port}" for port in range(3000, 3007)],
    *[f"http://127.0.0.1:{port}" for port in range(3000, 3007)],
]
```

### Best Practices
- ❌ **NO usar `uvicorn main:app` directamente** → puerto hardcodeado
- ✅ **SÍ usar `python dev_server.py`** → auto-port detection
- ❌ **NO usar `next dev` directamente** → puerto hardcodeado
- ✅ **SÍ usar `npm run dev`** → auto-port detection

### Debugging Port Issues
```bash
# Ver qué proceso está usando un puerto
lsof -i :3000
lsof -i :8000

# Matar proceso específico
kill -9 <PID>

# Matar todos los servidores de desarrollo
pkill -f "next dev"
pkill -f "uvicorn"
```

## 🎯 Advanced Real-Time Debugging (Expert Level)

### Background Log Streaming Setup
```bash
# 1. Start dev servers with log capture
npm run dev 2>&1 | tee frontend.log
uvicorn main:app --reload 2>&1 | tee backend.log

# 2. Monitor logs in real-time (Claude Code)
tail -f frontend.log | claude -p "Alert me of compilation errors"

# 3. Use Background Commands (Ctrl+B)
npm run dev  # Press Ctrl+B to run in background
# Then use BashOutput tool to monitor status
```

### Claude Code Web Interface
```bash
# Install web interface for visual log monitoring
npm install -g claude-code-web
claude-code-web --debug  # Enhanced logging mode

# Or use alternative: 
npx claude-code-web --dev  # Development mode with verbose logs
```

### Multi-Terminal Monitoring Pattern
```bash
# Terminal 1: Backend with structured logging
python -m uvicorn main:app --reload --log-level debug

# Terminal 2: Frontend with compilation monitoring
npm run dev -- --verbose

# Terminal 3: Claude Code with combined log analysis
tail -f *.log | claude -p "Debug any compilation or runtime errors immediately"
```

### Background Task Management
- **Use Ctrl+B** para run commands in background
- **BashOutput tool** para retrieving incremental output
- **Filter logs** for specific patterns (ERROR, WARN, Compil)
- **Status tracking** (running/completed/killed)

## 🎨 Bucle Agéntico con Playwright MCP

### Metodología de Desarrollo Visual
**Problema:** IA genera frontends genéricos sin poder ver el resultado  
**Solución:** Playwright MCP otorga "ojos" al AI para iteración visual

### Bucle Agéntico Frontend
```
1. Código UI → 2. Playwright Screenshot → 3. Visual Compare → 4. Iterate
```

### Playwright MCP Integration
- **browser_snapshot**: Captura estado actual de la página
- **browser_take_screenshot**: Screenshots para comparación visual
- **browser_navigate**: Navegación automática para testing
- **browser_click/type**: Interacción automatizada con UI
- **browser_resize**: Testing responsive en diferentes viewports

### Visual Development Protocol
1. **Implementar componente** siguiendo specs
2. **Capturar screenshot** con Playwright
3. **Comparar vs design requirements**
4. **Iterar automáticamente** hasta pixel-perfect
5. **Validar responsiveness** en mobile/tablet/desktop

### Integration con Design Review
- Activar review visual automático post-implementación
- Usar criterios objetivos de diseño (spacing, colors, typography)
- Generar feedback específico y accionable
- Prevenir frontends genéricos mediante validación visual

---

*Este archivo es la fuente de verdad para desarrollo en este proyecto. Todas las decisiones de código deben alinearse con estos principios.*