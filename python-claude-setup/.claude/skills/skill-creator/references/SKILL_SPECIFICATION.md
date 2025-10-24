# Agent Skills Specification v1.0

**Based on Anthropic Agent Skills Specification**

## Skill Folder Layout

A minimal skill folder looks like:

```
my-skill/
  └── SKILL.md
```

More complex skills can add:

```
my-skill/
├── SKILL.md              (required)
├── scripts/              (optional - executable code)
│   ├── processor.py
│   └── helper.sh
├── references/           (optional - documentation)
│   ├── api_docs.md
│   └── schemas.md
└── assets/              (optional - output resources)
    ├── templates/
    └── icons/
```

## The SKILL.md File

The skill's entrypoint is `SKILL.md`. It must start with YAML frontmatter followed by Markdown.

### YAML Frontmatter

Required properties:

- `name`
  - Unique identifier in hyphen-case
  - Lowercase alphanumeric + hyphens only
  - Must match the skill directory name

- `description`
  - Description of what the skill does
  - When Claude should use it
  - 3-5 sentences recommended

Optional properties:

- `license`
  - License for the skill
  - Recommended: MIT, Apache-2.0, etc.

- `allowed-tools`
  - List of tools pre-approved to run
  - Only supported in Claude Code
  - Example: ["bash", "read", "edit"]

- `metadata`
  - Map from string keys to string values
  - Custom properties not defined by spec
  - Use unique key names

### Markdown Body

No restrictions on content. Best practices:

- **Imperative form**: "To create X, do Y"
- **Clear structure**: Sections, examples, guidelines
- **Actionable**: Step-by-step instructions
- **Concise**: Keep SKILL.md <5k words
- **Reference external docs**: Use references/ for large documentation

## File Organization Best Practices

### scripts/ - Executable Code

**When to include**: Code that's reused or needs deterministic reliability

- Token efficient (executed without loading into context)
- Deterministic reliability
- May be patched by Claude

**Examples**:
- `rotate_pdf.py` - PDF manipulation
- `validate_input.py` - Data validation
- `sync_database.sh` - Database operations

**Requirements**:
- Include `--help` support
- Add docstrings/comments
- Handle errors gracefully
- Clear input/output specifications

### references/ - Documentation

**When to include**: Documentation >5k words or detailed specs

- Loaded into context as needed
- Keeps SKILL.md lean
- Always discoverable

**Examples**:
- `api_docs.md` - API specifications
- `schemas.md` - Data models
- `policies.md` - Company policies
- `examples.md` - Usage examples

**Best practices**:
- Include search patterns in SKILL.md
- Document thoroughly
- Provide examples
- Link to external resources

### assets/ - Output Resources

**When to include**: Files used in output, not loaded into context

- Templates, images, fonts
- Examples, boilerplate
- Not loaded into context window

**Examples**:
- `template.html` - HTML template
- `logo.png` - Brand logo
- `default-font.ttf` - Typography
- `style.css` - Stylesheet

## Progressive Disclosure System

Skills load information in 3 levels:

```
Level 1: METADATA (Always in context)
  ├── name (~5 words)
  └── description (~100 words)

  ↓ Claude decides: "Is this relevant?"

Level 2: SKILL.MD BODY (When triggered)
  ├── Instructions (<5k words)
  ├── Examples
  └── References to resources

  ↓ Claude reads and then:

Level 3: BUNDLED RESOURCES (On demand)
  ├── scripts/ → Execute without loading
  ├── references/ → Load into context as needed
  └── assets/ → Use in output
```

## Naming Conventions

**Skills**: `kebab-case`
```
✓ pdf-rotator
✓ brand-guidelines
✓ theme-factory
✗ PDFRotator
✗ pdf_rotator
```

**Scripts**: `action_noun.py`
```
✓ rotate_pdf.py
✓ validate_schema.py
✓ extract_text.py
✗ rotator.py
✗ util.py
```

**References**: `descriptive_name.md`
```
✓ api_docs.md
✓ database_schema.md
✓ best_practices.md
✗ doc.md
✗ readme.md
```

**Files**: `kebab-case.extension`
```
✓ config-template.json
✓ brand-colors.yaml
✗ ConfigTemplate.json
```

## Writing Guidelines

### Use Imperative Form

✓ GOOD: "To create a PDF, execute the script..."
✓ GOOD: "Load references/api_docs.md to understand..."
✗ BAD: "You should create a PDF"
✗ BAD: "You need to read the documentation"

### Be Specific and Actionable

✓ "Execute: python scripts/rotate_pdf.py --input file.pdf --degrees 90"
✗ "Use the rotation script"

### Include Examples

✓ Provide concrete usage examples
✓ Show expected input/output
✗ Generic descriptions without examples

### Document Errors

- What can go wrong?
- How to handle it?
- What should user do next?

## Validation Checklist

```
□ SKILL.md present and valid
  □ Starts with --- (YAML frontmatter)
  □ Has closing ---
  □ Valid YAML syntax

□ Required fields present
  □ name (lowercase, hyphens)
  □ description (descriptive, clear)

□ Structure
  □ One SKILL.md per skill
  □ Optional: scripts/, references/, assets/
  □ Proper file organization

□ Quality
  □ SKILL.md <5k words
  □ Clear, actionable instructions
  □ Examples provided
  □ Scripts have docstrings
  □ Files follow naming conventions

□ References
  □ All resources documented
  □ External links included
  □ Examples of similar implementations

□ Ready to distribute
  □ Validated: ✓ All OK!
  □ Packaged: skill-name.zip
```

## Distribution

### Creating a Distribution Package

Skills are typically distributed as `.zip` files:

1. Organize all files in skill directory
2. Validate structure
3. Create zip: `zip -r skill-name.zip skill-name/`
4. Distribute to users

### Installing in Claude Code

```bash
/plugin install path/to/skill-name.zip
```

### Auto-Discovery

Claude automatically:
- Detects installed skills
- Reads metadata (name, description)
- Activates when relevant
- Loads SKILL.md and resources as needed

## References

- Official Anthropic Skills Documentation
- Best Practices Guides
- Example Skills from Anthropic

---

*SaaS Factory Skills Implementation v1.0*
*Based on Anthropic Agent Skills Spec v1.0 (2025-10-16)*
