# 🏭 Full-Stack Python + Next.js + Claude Code

Setup completo full-stack con Next.js 16 + FastAPI + Supabase + Claude Code. Arquitectura híbrida optimizada para desarrollo asistido por IA: Feature-First (Frontend) + Clean Architecture (Backend).

## 🎯 ¿Qué es esto?

Un template **production-ready** para aplicaciones full-stack modernas con:

- ✅ **Frontend**: Next.js 16 + TypeScript + Tailwind
- ✅ **Backend**: FastAPI + SQLModel + Python 3.10+
- ✅ **Database**: PostgreSQL/Supabase
- ✅ **AI Tooling**: Claude Code con comandos, agentes y skills
- ✅ **Architecture**: Hybrid (Feature-First + Clean)
- ✅ **Auto port detection**: Frontend (3000-3006) + Backend (8000-8006)
- ✅ **Testing**: Jest + pytest configurados
- ✅ **Production ready**: Docker, CI/CD, monitoring

## 📦 Tech Stack

```yaml
Frontend:
  Runtime: Node.js + TypeScript
  Framework: Next.js 16 (App Router)
  Styling: Tailwind CSS
  State: Zustand
  Testing: Jest + React Testing Library

Backend:
  Runtime: Python 3.10+
  Framework: FastAPI
  ORM: SQLModel (Pydantic + SQLAlchemy)
  Testing: pytest
  Validation: Pydantic v2

Database: PostgreSQL/Supabase
AI Tooling: Claude Code + MCPs
```

## 🏗️ Arquitectura Híbrida

### Frontend: Feature-First

```
frontend/src/
├── app/                      # Next.js App Router
│   ├── (auth)/
│   ├── (main)/
│   └── layout.tsx
│
├── features/                 # 🎯 Por funcionalidad
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/        # API calls al backend
│   │   ├── types/
│   │   └── store/
│   │
│   └── [feature]/
│
└── shared/                   # Reutilizable
    ├── components/
    ├── hooks/
    ├── lib/                 # axios, supabase
    └── utils/
```

### Backend: Clean Architecture

```
backend/
├── main.py                   # Entry point FastAPI
│
├── api/                      # 🌐 Interfaz/Endpoints
│   ├── auth_deps.py
│   └── [feature]_router.py
│
├── application/              # 🎯 Casos de Uso
│   └── services/
│       └── [feature]_service.py
│
├── domain/                   # 💎 Lógica de Negocio
│   ├── models/              # SQLModel entities
│   ├── services/
│   └── interfaces/
│
└── infrastructure/           # 🔧 Externos
    ├── persistence/
    ├── external_apis/
    └── config/
```

> **¿Por qué híbrida?** Frontend organizado por features para desarrollo rápido con IA. Backend en capas para escalabilidad y mantenibilidad empresarial.

## 🚀 Quick Start

### 1. Instalar Dependencias

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configurar Variables de Entorno

```bash
# Frontend: .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

# Backend: .env
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
SUPABASE_URL=tu_supabase_url
SUPABASE_KEY=tu_service_role_key
SECRET_KEY=tu_secret_key_aqui
```

### 3. Configurar MCPs

Edita `.mcp.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "args": ["--project-ref=TU_PROJECT_REF"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "TU_TOKEN"
      }
    }
  }
}
```

### 4. Iniciar Servidores

```bash
# Terminal 1: Backend (auto-detecta puerto 8000-8006)
cd backend
python dev_server.py

# Terminal 2: Frontend (auto-detecta puerto 3000-3006)
cd frontend
npm run dev
```

## 🛠️ Comandos Disponibles

### Frontend

```bash
cd frontend

npm run dev          # Servidor desarrollo (auto-port)
npm run build        # Build producción
npm run test         # Jest tests
npm run lint         # ESLint
npm run typecheck    # TypeScript check
```

### Backend

```bash
cd backend

python dev_server.py              # Servidor desarrollo (auto-port)
python -m pytest                  # Run tests
python -m pytest --cov            # Coverage report
python -m pytest -v               # Verbose mode
uvicorn main:app --reload         # Manual (sin auto-port)
```

### Skills Management

```bash
# Crear nuevo skill
python .claude/skills/skill-creator/scripts/init_skill.py my-skill

# Validar
python .claude/skills/skill-creator/scripts/quick_validate.py ./my-skill

# Empaquetar
python .claude/skills/skill-creator/scripts/package_skill.py ./my-skill
```

## 🤖 Claude Code Integration

### Comandos Slash

| Comando | Descripción |
|---------|-------------|
| `/explorador` | Explora arquitectura full-stack |
| `/ejecutar-prp` | Ejecuta PRPs para features end-to-end |
| `/generar-prp` | Genera PRP con frontend + backend |
| `/preparar-paralelo` | Prepara tareas paralelas |
| `/ejecutar-paralelo` | Ejecuta tareas en paralelo |

### Agentes Especializados

1. **Codebase Analyst** - Analiza frontend + backend
2. **Gestor Documentación** - Mantiene docs sincronizados

### MCPs Configurados

- **Chrome DevTools** - Bucle agéntico visual
- **Supabase** - Integración directa con DB

## 🎨 Bucle Agéntico Full-Stack

Este setup soporta desarrollo visual end-to-end:

```
1. Implementar backend endpoint
2. Implementar frontend UI
3. Playwright screenshot automático
4. Validar integración
5. Iterar hasta perfecto
```

Lee `.claude/prompts/bucle-agentico.md` para metodología completa.

## 📝 Crear tu Primera Feature End-to-End

### Con PRP (Recomendado)

```bash
# En Claude Code:
/generar-prp

# Describe: "Feature de gestión de usuarios con CRUD completo"
# El agente generará:
#
# Backend:
# - domain/models/user.py (SQLModel)
# - api/users_router.py (endpoints)
# - application/services/user_service.py
# - tests/test_users.py
#
# Frontend:
# - features/users/components/
# - features/users/hooks/useUsers.ts
# - features/users/services/userService.ts
# - features/users/types/user.ts
```

## 🔗 API Integration Pattern

### Backend Endpoint

```python
# backend/api/users_router.py
from fastapi import APIRouter, Depends
from application.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/")
async def get_users(service: UserService = Depends()):
    return await service.get_all_users()
```

### Frontend Service

```typescript
// frontend/src/features/users/services/userService.ts
import axios from '@/shared/lib/axios'

export const userService = {
  async getUsers() {
    const { data } = await axios.get('/users')
    return data
  }
}
```

### Frontend Hook

```typescript
// frontend/src/features/users/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/userService'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers
  })
}
```

## 🔒 Supabase Setup

### 1. Crear Proyecto

```bash
# Visita: https://supabase.com/dashboard
# Crea proyecto y copia credenciales
```

### 2. Migraciones

```bash
# Crear migración
supabase/migrations/001_create_users.sql

# Aplicar con Supabase CLI o directamente en dashboard
```

### 3. Backend Config

```python
# backend/infrastructure/config/supabase.py
from supabase import create_client
import os

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)
```

## 🧪 Testing Strategy

### Backend Tests

```python
# backend/tests/test_users.py
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_users():
    response = client.get("/users")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
```

### Frontend Tests

```typescript
// frontend/src/features/users/hooks/useUsers.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { useUsers } from './useUsers'

test('should fetch users', async () => {
  const { result } = renderHook(() => useUsers())

  await waitFor(() => {
    expect(result.current.data).toBeDefined()
  })
})
```

### Run Tests

```bash
# Backend
cd backend && python -m pytest -v

# Frontend
cd frontend && npm run test
```

## 🎯 CORS Configuration

El backend ya está configurado para puertos dinámicos:

```python
# backend/main.py
ALLOWED_ORIGINS = [
    "https://tu-app.vercel.app",
    *[f"http://localhost:{port}" for port in range(3000, 3007)],
    *[f"http://127.0.0.1:{port}" for port in range(3000, 3007)],
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📚 Documentación

- **CLAUDE.md** - System prompt completo (fuente de verdad)
- **.claude/prompts/** - Metodologías (bucle agéntico, etc.)
- **.claude/PRPs/templates/** - Templates para features
- **Backend API Docs**: `http://localhost:8000/docs` (Swagger)
- **Backend ReDoc**: `http://localhost:8000/redoc`

## 🚨 Troubleshooting

### Puerto Ocupado

```bash
# Frontend
lsof -i :3000 && kill -9 <PID>

# Backend
lsof -i :8000 && kill -9 <PID>

# O deja que auto-port detection lo resuelva
```

### CORS Errors

```bash
# Verifica que backend esté corriendo
curl http://localhost:8000/health

# Verifica ALLOWED_ORIGINS en backend/main.py
```

### Database Connection

```bash
# Verifica DATABASE_URL en .env
# Prueba conexión:
python -c "from backend.infrastructure.config.db import engine; print(engine)"
```

## 🐳 Docker Setup (Opcional)

```bash
# Build
docker-compose build

# Run
docker-compose up

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

## 📦 Deploy

### Frontend (Vercel)

```bash
cd frontend
vercel

# Configura variables:
# - NEXT_PUBLIC_API_URL (tu backend URL)
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Backend (Railway/Render)

```bash
# 1. Conecta repositorio
# 2. Configura variables de entorno
# 3. Build command: pip install -r requirements.txt
# 4. Start command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

## 🎯 Próximos Pasos

1. **Lee CLAUDE.md** - Principios completos
2. **Configura Supabase** - Auth + Database
3. **Crea feature end-to-end** - Usa `/generar-prp`
4. **Implementa autenticación** - JWT + Supabase Auth
5. **Deploy** - Vercel (frontend) + Railway (backend)

## 🤝 Estructura de Equipo Recomendada

```
Con este setup, puedes trabajar eficientemente:

Solo Developer: Frontend + Backend con IA
Pequeño Equipo: 1 Frontend + 1 Backend (IA acelera ambos)
Equipo Grande: Features paralelas sin conflictos
```

## ⚡ Performance Tips

- Frontend: Usa React Query para caching
- Backend: Implementa Redis para cache
- Database: Índices en columnas frecuentes
- Deploy: CDN para assets estáticos

---

**Full-Stack Python + Next.js + Claude Code v1.0** | Enterprise-ready architecture with AI-first development 🏭🤖
