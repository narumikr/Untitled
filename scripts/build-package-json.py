#!/usr/bin/env python3
"""
Build package.json for distribution directly into the dist/ directory.
This script automatically extracts and transforms necessary fields.
"""

import json
import sys
from pathlib import Path


def strip_dist_prefix(path_str):
    """Remove 'dist/' prefix from a path string for dist/package.json"""
    if isinstance(path_str, str):
        if path_str.startswith("./dist/"):
            return "./" + path_str[len("./dist/") :]
        if path_str.startswith("dist/"):
            return path_str[len("dist/") :]
    return path_str


def transform_exports(obj):
    """Recursively transform path values in exports field"""
    if isinstance(obj, str):
        return strip_dist_prefix(obj)
    if isinstance(obj, dict):
        return {k: transform_exports(v) for k, v in obj.items()}
    return obj


def transform_dist_paths(package_data):
    """Transform paths in package data to be relative to dist/ directory"""
    for field in ["main", "module", "types", "style"]:
        if field in package_data:
            package_data[field] = strip_dist_prefix(package_data[field])

    if "exports" in package_data:
        package_data["exports"] = transform_exports(package_data["exports"])

    if "sideEffects" in package_data and isinstance(package_data["sideEffects"], list):
        package_data["sideEffects"] = [
            strip_dist_prefix(item) for item in package_data["sideEffects"]
        ]

    return package_data


def build_dist_package_json(root_dir: Path):
    """Extract distribution fields and create dist/package.json directly"""
    package_json_path = root_dir / "package.json"
    dist_dir = root_dir / "dist"
    dist_package_json_path = dist_dir / "package.json"

    print("Building dist/package.json from package.json...")

    if not package_json_path.exists():
        print(f"Error: package.json not found at {package_json_path}", file=sys.stderr)
        sys.exit(1)

    if not dist_dir.exists():
        print(f"Error: dist directory not found at {dist_dir}", file=sys.stderr)
        print("  Please run the build process first to create dist/", file=sys.stderr)
        sys.exit(1)

    # Read
    try:
        with open(package_json_path, "r", encoding="utf-8") as f:
            package_data = json.load(f)
    except Exception as e:
        print(f"Error: Failed to read/parse package.json: {e}", file=sys.stderr)
        sys.exit(1)

    # Filter fields
    dist_fields = [
        "name",
        "version",
        "description",
        "main",
        "module",
        "types",
        "style",
        "exports",
        "type",
        "keywords",
        "author",
        "license",
        "peerDependencies",
        "dependencies",
        "sideEffects",
    ]
    package_dist_data = {f: package_data[f] for f in dist_fields if f in package_data}

    # Transform paths
    package_dist_data = transform_dist_paths(package_dist_data)

    # Write (newline="\n" で改行コードをLFに固定)
    try:
        with open(dist_package_json_path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(package_dist_data, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"✓ Successfully created {dist_package_json_path}")
    except Exception as e:
        print(f"Error: Failed to write dist/package.json: {e}", file=sys.stderr)
        sys.exit(1)

    # Log dependencies
    for dep_type in ["dependencies", "peerDependencies"]:
        if dep_type in package_dist_data:
            print(f"  {dep_type.capitalize()} version synchronized:")
            for dep, ver in package_dist_data[dep_type].items():
                print(f"    {dep}: {ver}")


def create_cjs_package_json(root_dir: Path):
    """Create package.json in dist/cjs to specify CommonJS module type"""
    dist_cjs_dir = root_dir / "dist" / "cjs"
    cjs_package_json_path = dist_cjs_dir / "package.json"

    print("\nCreating package.json in dist/cjs...")

    if not dist_cjs_dir.exists():
        print(f"Error: dist/cjs directory not found at {dist_cjs_dir}", file=sys.stderr)
        sys.exit(1)

    cjs_package_data = {"type": "commonjs"}

    try:
        # newline="\n" で改行コードをLFに固定
        with open(cjs_package_json_path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(cjs_package_data, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"✓ Successfully created {cjs_package_json_path}")
    except Exception as e:
        print(f"Error: Failed to create dist/cjs/package.json: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    # ベースとなるディレクトリの定義を共通化
    script_dir = Path(__file__).parent
    project_root = script_dir.parent

    build_dist_package_json(project_root)
    create_cjs_package_json(project_root)
