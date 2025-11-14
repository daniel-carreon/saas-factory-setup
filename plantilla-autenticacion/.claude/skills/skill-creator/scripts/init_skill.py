#!/usr/bin/env python3
"""
Initialize a new skill with SaaS Factory standards.

Usage:
    python init_skill.py my-skill --path ./output
"""

import argparse
import os
from pathlib import Path


def create_skill(name: str, path: str = ".") -> None:
    """Create a new skill directory structure."""

    skill_path = Path(path) / name

    # Check if skill already exists
    if skill_path.exists():
        print(f"❌ Skill '{name}' already exists at {skill_path}")
        exit(1)

    # Create directories
    skill_path.mkdir(parents=True, exist_ok=True)
    (skill_path / "scripts").mkdir(exist_ok=True)
    (skill_path / "references").mkdir(exist_ok=True)
    (skill_path / "assets").mkdir(exist_ok=True)

    # Create SKILL.md template
    skill_md = f"""---
name: {name}
description: Describe what this skill does and when Claude should use it.
license: MIT
---

# {name.replace('-', ' ').title()}

## Purpose

Describe the purpose of this skill in 1-2 paragraphs.

## When to Use

Explain when Claude should activate this skill.

## How to Use

### Step 1: First Action
Instructions for the first step.

### Step 2: Second Action
Instructions for the second step.

## Examples

- Example usage 1
- Example usage 2

## Reference Files

- See `references/` for detailed documentation
- See `scripts/` for executable code
- See `assets/` for output resources
"""

    (skill_path / "SKILL.md").write_text(skill_md)

    # Create example files
    (skill_path / "scripts/example.py").write_text(
        '''#!/usr/bin/env python3
"""Example script for your skill."""

def example_function():
    """Do something useful."""
    return "Hello from skill!"

if __name__ == "__main__":
    print(example_function())
'''
    )

    (skill_path / "references/guide.md").write_text(
        """# Reference Guide

Add detailed documentation here.

## API Documentation
- Document any APIs or external services

## Schemas
- Document data structures

## Best Practices
- Add guidelines and standards
"""
    )

    (skill_path / "assets/.gitkeep").write_text("")

    # Create .gitignore
    (skill_path / ".gitignore").write_text(
        """*.pyc
__pycache__/
*.log
.DS_Store
node_modules/
dist/
"""
    )

    print(f"✅ Skill '{name}' created at {skill_path}")
    print(f"\n📝 Next steps:")
    print(f"  1. Edit SKILL.md with your skill description")
    print(f"  2. Add scripts in scripts/")
    print(f"  3. Add documentation in references/")
    print(f"  4. Run: python quick_validate.py {skill_path}")
    print(f"  5. Run: python package_skill.py {skill_path}")


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Initialize a new skill for SaaS Factory",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python init_skill.py my-skill
  python init_skill.py my-skill --path ./skills
        """
    )

    parser.add_argument(
        "name",
        help="Skill name (lowercase, hyphens only)"
    )

    parser.add_argument(
        "--path",
        default=".",
        help="Output directory (default: current directory)"
    )

    args = parser.parse_args()

    # Validate name
    if not all(c.islower() or c == '-' or c.isdigit() for c in args.name):
        print(f"❌ Skill name must be lowercase with hyphens only")
        exit(1)

    create_skill(args.name, args.path)


if __name__ == "__main__":
    main()
