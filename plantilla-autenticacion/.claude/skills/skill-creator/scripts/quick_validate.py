#!/usr/bin/env python3
"""
Quick validation of a skill structure.

Usage:
    python quick_validate.py ./my-skill
"""

import argparse
import sys
import yaml
from pathlib import Path


def validate_skill(skill_path: Path) -> bool:
    """Validate skill structure and SKILL.md."""

    errors = []
    warnings = []

    # Check if path exists
    if not skill_path.exists():
        print(f"❌ Path does not exist: {skill_path}")
        return False

    # Check if SKILL.md exists
    skill_md = skill_path / "SKILL.md"
    if not skill_md.exists():
        errors.append("SKILL.md not found (required)")
        print(f"❌ {errors[-1]}")
        return False

    # Parse and validate SKILL.md
    try:
        with open(skill_md, "r") as f:
            content = f.read()

        # Extract frontmatter
        if not content.startswith("---"):
            errors.append("SKILL.md must start with YAML frontmatter (---)")
        else:
            # Find end of frontmatter
            lines = content.split("\n")
            end_idx = None
            for i in range(1, len(lines)):
                if lines[i] == "---":
                    end_idx = i
                    break

            if end_idx is None:
                errors.append("Invalid YAML frontmatter (missing closing ---)")
            else:
                frontmatter_str = "\n".join(lines[1:end_idx])
                try:
                    frontmatter = yaml.safe_load(frontmatter_str)

                    # Check required fields
                    if not frontmatter.get("name"):
                        errors.append("Missing required field: name")
                    else:
                        name = frontmatter["name"]
                        # Validate name format
                        if not all(c.islower() or c == '-' or c.isdigit() for c in name):
                            errors.append(
                                f"Invalid skill name '{name}' - must be lowercase with hyphens"
                            )

                    if not frontmatter.get("description"):
                        errors.append("Missing required field: description")

                except yaml.YAMLError as e:
                    errors.append(f"Invalid YAML: {e}")

    except Exception as e:
        errors.append(f"Error reading SKILL.md: {e}")

    # Check directory structure
    if (skill_path / "scripts").exists() and not list((skill_path / "scripts").glob("*")):
        warnings.append("scripts/ directory is empty")

    if (skill_path / "references").exists() and not list((skill_path / "references").glob("*")):
        warnings.append("references/ directory is empty")

    # Print results
    if errors:
        print("❌ Validation failed:\n")
        for err in errors:
            print(f"  • {err}")
        return False

    if warnings:
        print("⚠️  Warnings:\n")
        for warn in warnings:
            print(f"  • {warn}")

    print("✅ Skill validation passed!")
    print(f"\nSkill structure is valid and ready for packaging.")
    return True


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Validate a skill structure"
    )

    parser.add_argument(
        "path",
        help="Path to skill directory"
    )

    args = parser.parse_args()
    skill_path = Path(args.path)

    if validate_skill(skill_path):
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
