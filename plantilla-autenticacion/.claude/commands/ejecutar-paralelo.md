# Ejecución de Versión de Tareas Paralelas

## Variables
NOMBRE_CARACTERISTICA: $ARGUMENTS
PLAN_A_EJECUTAR: $ARGUMENTS
NUMERO_DE_WORKTREES_PARALELOS: $ARGUMENTS

## Instrucciones

Vamos a crear NUMERO_DE_WORKTREES_PARALELOS nuevos subagentes que usan la herramienta Task para crear N versiones de la misma característica en paralelo.

Asegúrate de leer PLAN_A_EJECUTAR.

Esto nos permite construir concurrentemente la misma característica en paralelo para que podamos probar y validar los cambios de cada subagente de forma aislada y luego elegir los mejores cambios.

El primer agente ejecutará en trees/<NOMBRE_CARACTERISTICA>-1/
El segundo agente ejecutará en trees/<NOMBRE_CARACTERISTICA>-2/
...
El último agente ejecutará en trees/<NOMBRE_CARACTERISTICA>-<NUMERO_DE_WORKTREES_PARALELOS>/

El código en trees/<NOMBRE_CARACTERISTICA>-<i>/ será idéntico al código en la rama actual. Estará configurado y listo para que construyas la característica de extremo a extremo.

Cada agente implementará independientemente el plan de ingeniería detallado en PLAN_A_EJECUTAR en su respectivo espacio de trabajo.

Cuando el subagente complete su trabajo, haz que el subagente reporte sus cambios finales realizados en un archivo comprensivo `RESULTADOS.md` en la raíz de su respectivo espacio de trabajo.

Asegúrate de que los agentes no ejecuten pruebas u otro código - enfócate solo en los cambios de código.