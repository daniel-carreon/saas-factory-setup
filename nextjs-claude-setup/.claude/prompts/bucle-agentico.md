# Bucle Agéntico

Metodología sistemática para resolver problemas complejos mediante deconstrucción, planificación jerárquica y ejecución iterativa.

## Concepto

El **bucle agéntico** es un proceso donde el agente:
1. Delimita el problema o problemas
2. Realiza ingeniería inversa (deconstrucción)
3. Genera plan estructurado con tareas y subtareas
4. Ejecuta iterativamente de 0% a 100%

## Proceso de Ejecución

### 1. **DELIMITAR PROBLEMA(S)**
   - Identificar el problema principal
   - Detectar subproblemas relacionados
   - Definir criterios de éxito (¿qué es "100% completo"?)
   - Establecer scope y limitaciones

### 2. **INGENIERÍA INVERSA**
   - ¿Qué componentes/partes tiene el problema?
   - ¿Qué dependencias existen? (orden de ejecución)
   - ¿Qué patrones del codebase son aplicables?
   - ¿Qué casos edge deben considerarse?

**Ejemplo:**
```
Problema: "Implementar autenticación OAuth"
↓ Ingeniería Inversa:
- ¿Provider? (Google/GitHub/Custom)
- ¿Flujo? (Authorization Code/Implicit)
- ¿Storage? (Cookie/LocalStorage/Session)
- ¿Backend framework? (FastAPI/Express)
- ¿Frontend framework? (React/Vue)
- ¿Manejo de refresh tokens?
- ¿Logout seguro?
```

### 3. **PLANIFICACIÓN JERÁRQUICA (TodoTask)**
   - Usar TodoWrite para crear estructura de tareas
   - Organizar en niveles (tareas → subtareas)
   - Asignar dependencias cronológicas
   - Estimar complejidad relativa

**Estructura de Plan:**
```
├─ Tarea Principal 1
│  ├─ Subtarea 1.1
│  ├─ Subtarea 1.2
│  └─ Subtarea 1.3 (depende de 1.1)
├─ Tarea Principal 2 (depende de Tarea 1)
│  ├─ Subtarea 2.1
│  └─ Subtarea 2.2
└─ Tarea de Validación (depende de todas)
```

### 4. **EJECUCIÓN ITERATIVA (0→100)**

**Bucle por cada tarea:**
```
WHILE tareas pendientes:
  1. Marcar tarea como in_progress
  2. Ejecutar tarea
  3. Validar resultado
  4. IF error:
       - Analizar causa
       - Ajustar plan si necesario
       - Reintentar
     ELSE:
       - Marcar como completed
       - Actualizar % progreso
  5. Pasar a siguiente tarea
```

**Principios de Ejecución:**
- ✅ Una tarea a la vez (evitar paralelismo hasta dominarlo)
- ✅ Validar antes de marcar como completada
- ✅ Documentar decisiones importantes
- ✅ Refactorizar plan si aparecen nuevos requisitos

### 5. **VALIDACIÓN CONTINUA**
   - Después de cada tarea: validación local
   - Después de cada grupo de tareas: validación de integración
   - Al final: validación end-to-end

### 6. **REPORTE FINAL**
   - Estado de todas las tareas (completed/pending/failed)
   - Problemas encontrados y soluciones aplicadas
   - Deuda técnica pendiente (si aplica)
   - Siguientes pasos recomendados

## Ejemplo Completo

**Problema:** "Sistema de notificaciones en tiempo real"

**Ingeniería Inversa:**
```
- WebSocket server (Socket.io/Pusher/custom)
- Backend: endpoints para enviar notificaciones
- Frontend: componente NotificationBell
- Base de datos: tabla notifications
- Sistema de permisos (¿quién puede notificar a quién?)
- Persistencia (¿guardar notificaciones?)
- Estado leído/no leído
```

**TodoTask Generado:**
```
✅ Setup infraestructura WebSocket
   ✅ Instalar dependencias (socket.io)
   ✅ Configurar servidor WebSocket
   ✅ Configurar CORS y autenticación
🔄 Backend: API de notificaciones
   ✅ Modelo Notification (SQLModel)
   ✅ Endpoint POST /notifications/send
   🔄 Endpoint GET /notifications (listar)
   ⏳ Endpoint PATCH /notifications/:id/read
⏳ Frontend: UI de notificaciones
   ⏳ Componente NotificationBell
   ⏳ Hook useNotifications
   ⏳ Integración con WebSocket client
⏳ Testing & Validación
   ⏳ Tests unitarios backend
   ⏳ Tests E2E (enviar → recibir)
   ⏳ Validar casos edge (offline, reconexión)
```

**Progreso:** 40% (4/10 subtareas completadas)

## Cuándo Usar Este Command

- ✅ Problemas complejos con múltiples partes
- ✅ Features nuevas end-to-end
- ✅ Refactorings grandes
- ✅ Debugging sistemático de bugs complejos
- ❌ Tareas simples de 1-2 pasos (usar approach directo)

## Ventajas del Bucle Agéntico

1. **Visibilidad**: User ve progreso en tiempo real
2. **Recuperabilidad**: Si falla, sabes exactamente dónde
3. **Calidad**: Validación en cada paso previene cascadas de errores
4. **Aprendizaje**: El plan es documentación viva del proceso

---

**Nota:** Este command es ideal para problemas que no tienen solución obvia inmediata. Invierte tiempo en planear para ejecutar más rápido después.
