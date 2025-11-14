# Inicializar directorios git worktree paralelos para agentes Claude Code paralelos

## Variables
NOMBRE_CARACTERISTICA: $ARGUMENTS
NUMERO_DE_WORKTREES_PARALELOS: $ARGUMENTS

## Ejecutar estos comandos
> Ejecutar el bucle en paralelo con la herramienta Batch y Task

- crear un nuevo directorio `trees/`
- for i in NUMERO_DE_WORKTREES_PARALELOS
  - EJECUTAR `git worktree add -b NOMBRE_CARACTERISTICA-i ./trees/NOMBRE_CARACTERISTICA-i`
  - EJECUTAR `cd trees/NOMBRE_CARACTERISTICA-i`, `git ls-files` para validar
- EJECUTAR `git worktree list` para verificar que todos los trees fueron creados correctamente