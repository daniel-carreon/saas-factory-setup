---
Este comando guía la creación de una Propuesta de Requerimientos de Producto (PRP) para implementación de características de software.

# Generador de PRP (Propuesta de Requerimientos de Producto)

## Objetivo
Crear un documento PRP comprensivo que permita "éxito de implementación en un solo pase através de contexto comprensivo" para desarrollar una nueva característica de software.

## Proceso de Investigación

### 1. Análisis del Codebase
Investiga y documenta exhaustivamente el codebase existente:
- **Arquitectura**: Entender la estructura general y patrones de diseño
- **Convenciones**: Identificar estándares de codificación y nomenclatura
- **Dependencias**: Mapear bibliotecas y frameworks utilizados
- **Patrones existentes**: Encontrar implementaciones similares como referencia
- **Puntos de integración**: Identificar dónde la nueva característica encajará

### 2. Investigación Externa
Buscar recursos externos relevantes:
- **Documentación oficial** de frameworks/bibliotecas utilizadas
- **Mejores prácticas** para el tipo de característica a implementar
- **Patrones de diseño** aplicables
- **Consideraciones de seguridad** relevantes
- **Ejemplos de implementación** en proyectos similares

### 3. Clarificación del Usuario (si es necesario)
Si faltan detalles críticos:
- **Recopilar requerimientos específicos**
- **Aclarar casos de uso esperados**
- **Definir criterios de aceptación**
- **Establecer restricciones o limitaciones**

## Contexto Crítico a Incluir

### URLs y Referencias
- **Documentar todas las URLs** consultadas durante la investigación
- **Enlaces a documentación** relevante
- **Referencias a issues o PRs** relacionados

### Ejemplos de Código
- **Patrones existentes** que pueden ser reutilizados
- **Implementaciones similares** en el codebase
- **Ejemplos de mejores prácticas** encontrados

### Issues Potenciales
- **Puntos de falla conocidos** a evitar
- **Limitaciones técnicas** a considerar  
- **Riesgos de seguridad** a mitigar
- **Problemas de performance** potenciales

### Patrones de Referencia
- **Convenciones de codificación** a seguir
- **Estructuras de archivos** establecidas
- **Patrones de testing** utilizados
- **Configuraciones** estándar del proyecto

## Blueprint de Implementación

### Pseudocódigo
```
// Proporcionar pseudocódigo de alto nivel
// que describa la lógica principal
// de la característica a implementar
```

### Referencias de Archivos
- **Archivos a modificar**: Lista específica con razones
- **Archivos a crear**: Nuevos archivos necesarios
- **Archivos a considerar**: Posibles impactos indirectos

### Estrategias de Manejo de Errores
- **Tipos de errores** a manejar
- **Estrategias de recuperación** apropiadas
- **Logging y monitoreo** necesarios

### Secuencia de Tareas
1. **Paso 1**: Descripción detallada del primer paso
2. **Paso 2**: Siguiente acción con dependencias claras
3. **Paso N**: Continuar hasta completar la secuencia

## Puertas de Validación

### Verificaciones Ejecutables
- **Verificaciones de sintaxis/estilo**: Comandos específicos a ejecutar
- **Pruebas unitarias**: Tests que deben pasar
- **Pruebas de integración**: Validaciones de sistema
- **Verificaciones de seguridad**: Auditorías necesarias

### Criterios de Éxito
- **Funcionalidad**: ¿La característica funciona como se esperaba?
- **Performance**: ¿Cumple con los requerimientos de performance?
- **Compatibilidad**: ¿No rompe funcionalidad existente?
- **Calidad de código**: ¿Cumple con estándares establecidos?

## Directrices de Output

### Archivo de Salida
- **Guardar como archivo markdown** en directorio PRPs
- **Nombrar descriptivamente**: `prp-[nombre-caracteristica]-[fecha].md`
- **Incluir metadata**: Fecha, autor, versión

### Lista de Verificación de Calidad
- [ ] Contexto comprensivo incluido
- [ ] Blueprint de implementación claro
- [ ] Puertas de validación definidas
- [ ] Referencias externas documentadas
- [ ] Riesgos identificados y mitigados
- [ ] Criterios de éxito claros

### Puntuación de Confianza
**Puntuación de confianza de implementación**: _/10

**Justificación**: 
- Factores que aumentan confianza
- Áreas de incertidumbre restantes
- Recomendaciones para mitigar riesgos

## Plantilla de PRP

```markdown
# PRP: [Nombre de la Característica]

## Resumen Ejecutivo
[Descripción concisa de la característica y su valor]

## Contexto e Investigación
[Todo el contexto recopilado durante la fase de investigación]

## Blueprint de Implementación
[Plan detallado paso a paso]

## Puertas de Validación
[Verificaciones y criterios de éxito]

## Riesgos y Mitigaciones
[Problemas potenciales y cómo manejarlos]

## Cronograma Estimado
[Estimaciones de tiempo para cada fase]

## Puntuación de Confianza: _/10
[Justificación de la puntuación]
```

**Objetivo final**: Crear un documento que permita a cualquier desarrollador (o IA) implementar la característica exitosamente sin investigación adicional significativa.
---