# 🎯 Skills System - SaaS Factory

**Skills** son carpetas con instrucciones que enseñan a Claude cómo hacer tareas especializadas. Son el corazón de la extensibilidad en Claude Code.

## 📚 Estructura Recomendada por Anthropic

```
skill-name/
├── SKILL.md              # Requerido: Metadatos + Instrucciones
├── scripts/              # Opcional: Código ejecutable
│   ├── helper.py
│   └── processor.sh
├── references/           # Opcional: Documentación de referencia
│   ├── api_docs.md
│   └── schemas.md
└── assets/              # Opcional: Recursos de salida
    ├── templates/
    └── icons/
```

## SKILL.md - Estructura Mínima

```yaml
---
name: skill-name              # Identificador único (lowercase, hyphens)
description: What this skill  # Cuándo y por qué usarlo
                does and when
license: MIT                  # (Opcional)
---

# Skill Title

## Purpose
Qué hace el skill.

## When to Use
Cuándo Claude debería activarlo.

## How to Use
Instrucciones paso a paso.
```

## ✅ Principios de Anthropic

### Progressive Disclosure (Carga Eficiente)
1. **Metadata** (~100 palabras) - Siempre en contexto
2. **SKILL.md** (<5k palabras) - Cuando se activa
3. **Resources** (unlimited) - Bajo demanda

### Organización

| Carpeta | Cuándo Usar | Formato |
|---------|------------|---------|
| **scripts/** | Código reutilizable | .py, .sh, .js |
| **references/** | Documentación >5k | .md, .txt |
| **assets/** | Recursos de salida | .html, .png, .ttf |

### Naming Conventions

- **Skills**: `kebab-case` (skill-creator)
- **Scripts**: `action_noun.py` (create_skill.py)
- **References**: `descriptive_name.md` (api_docs.md)

## 🛠️ Tools Incluidos

### skill-creator
Herramienta para crear nuevos skills en SaaS Factory.

**Ubicación**: `.claude/skills/skill-creator/`

**Scripts**:
- `init_skill.py` - Crear nueva skill
- `quick_validate.py` - Validar skill
- `package_skill.py` - Empaquetar para distribución

**Uso**:
```bash
python init_skill.py my-skill
python quick_validate.py ./my-skill
python package_skill.py ./my-skill
```

## 📖 Referencias Recomendadas

- [Agent Skills Spec](https://docs.anthropic.com/) - Especificación formal
- [Skill Creator Guide](https://docs.anthropic.com/) - Guía completa
- [Best Practices](https://docs.anthropic.com/) - Patrones probados

## 🎯 Flujo de Creación

1. **Inicializar**: `python init_skill.py my-skill`
2. **Desarrollar**: Editar SKILL.md + agregar scripts/references/assets
3. **Validar**: `python quick_validate.py ./my-skill`
4. **Empaquetar**: `python package_skill.py ./my-skill`
5. **Instalar**: `/plugin install my-skill.zip`
6. **Usar**: Mencionar el skill en conversación

## 📝 Checklist para Crear un Skill

```
□ SKILL.md con YAML frontmatter válido
  □ name (lowercase, hyphens)
  □ description (3-5 oraciones)

□ Contenido bien organizado
  □ SKILL.md <5k palabras
  □ scripts/ para código reutilizable
  □ references/ para documentación
  □ assets/ para recursos

□ Scripts listos
  □ Tienen --help
  □ Incluyen docstrings
  □ Manejan errores

□ Validación
  □ python quick_validate.py ./skill-name
  □ Resultado: ✓ All OK!

□ Empaquetado
  □ python package_skill.py ./skill-name
  □ Resultado: skill-name.zip
```

## 💡 Ejemplo: Skill Simple

```
my-skill/
├── SKILL.md
│   ---
│   name: my-skill
│   description: Do X when Y happens
│   ---
│
│   # My Skill
│
│   ## Purpose
│   This skill...
│
│   ## How to Use
│   1. Step one
│   2. Step two
│
├── scripts/
│   └── processor.py
│
└── references/
    └── api_docs.md
```

## 🚀 Próximos Pasos

1. Usa `skill-creator` para crear nuevos skills
2. Sigue estos principios para mantener consistencia
3. Valida siempre antes de distribuir
4. Documenta claramente para otros desarrolladores

---

*Sistema de Skills estandardizado para SaaS Factory*
*Basado en Anthropic Agent Skills Spec v1.0*
