#!/usr/bin/env python3
"""
Package a skill into a distributable .zip file.

Usage:
    python package_skill.py ./my-skill
    python package_skill.py ./my-skill ./dist
"""

import argparse
import shutil
import subprocess
import sys
import yaml
from pathlib import Path


def validate_before_package(skill_path: Path) -> bool:
    """Validate skill before packaging."""

    skill_md = skill_path / "SKILL.md"
    if not skill_md.exists():
        print("❌ SKILL.md not found")
        return False

    try:
        with open(skill_md) as f:
            content = f.read()

        if not content.startswith("---"):
            print("❌ Invalid SKILL.md format")
            return False

        lines = content.split("\n")
        end_idx = next((i for i in range(1, len(lines)) if lines[i] == "---"), None)

        if not end_idx:
            print("❌ Invalid YAML frontmatter")
            return False

        frontmatter = yaml.safe_load("\n".join(lines[1:end_idx]))

        if not frontmatter.get("name"):
            print("❌ Missing required field: name")
            return False

        if not frontmatter.get("description"):
            print("❌ Missing required field: description")
            return False

        return True

    except Exception as e:
        print(f"❌ Validation error: {e}")
        return False


def package_skill(skill_path: Path, output_dir: Path) -> bool:
    """Package skill into a .zip file."""

    skill_path = skill_path.resolve()

    if not skill_path.exists():
        print(f"❌ Skill path does not exist: {skill_path}")
        return False

    # Validate before packaging
    if not validate_before_package(skill_path):
        print("\n⚠️  Skill validation failed. Fix errors before packaging.")
        return False

    # Get skill name
    skill_md = skill_path / "SKILL.md"
    with open(skill_md) as f:
        content = f.read()
        lines = content.split("\n")
        end_idx = next(i for i in range(1, len(lines)) if lines[i] == "---")
        frontmatter = yaml.safe_load("\n".join(lines[1:end_idx]))
        skill_name = frontmatter["name"]

    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)

    # Create zip file
    zip_path = output_dir / skill_name
    try:
        # shutil.make_archive creates a .zip automatically
        shutil.make_archive(
            str(zip_path),
            "zip",
            skill_path,
            "."
        )

        zip_file = output_dir / f"{skill_name}.zip"
        print(f"✅ Skill packaged successfully!")
        print(f"📦 Output: {zip_file}")
        print(f"\n🚀 To install in Claude Code:")
        print(f"   /plugin install {zip_file}")
        return True

    except Exception as e:
        print(f"❌ Failed to package skill: {e}")
        return False


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Package a skill into a distributable .zip file"
    )

    parser.add_argument(
        "skill_path",
        help="Path to skill directory"
    )

    parser.add_argument(
        "output_dir",
        nargs="?",
        default=".",
        help="Output directory for .zip file (default: current directory)"
    )

    args = parser.parse_args()

    if package_skill(Path(args.skill_path), Path(args.output_dir)):
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
