#!/usr/bin/env python3
"""
Sync local media to Azure Blob Storage and update note references.

Detects new files in Attachments/, uploads them, and rewrites any
![[wikilink]] or relative-path references in vault notes to Azure URLs.

Usage:
    python3 scripts/sync-media.py              # full sync
    python3 scripts/sync-media.py --dry-run    # preview only
    python3 scripts/sync-media.py --upload-only    # skip note rewriting
    python3 scripts/sync-media.py --rewrite-only   # skip uploads
"""

import json
import os
import re
import subprocess
import sys
from pathlib import Path

VAULT_ROOT = Path(__file__).resolve().parent.parent
ATTACHMENTS_DIR = VAULT_ROOT / "Attachments"
STORAGE_ACCOUNT = os.environ["AZURE_STORAGE_ACCOUNT"]
CONTAINER = os.environ.get("AZURE_STORAGE_CONTAINER", "images")
BLOB_BASE = f"https://{STORAGE_ACCOUNT}.blob.core.windows.net/{CONTAINER}"

IMAGE_EXTS = {"png", "jpg", "jpeg", "gif", "webp", "svg", "heic"}
VIDEO_EXTS = {"mp4", "mov", "avi", "mkv", "webm"}
DOC_EXTS = {"pdf", "docx", "xlsx", "pptx", "doc", "xls", "csv"}

SKIP_DIRS = {"site", ".obsidian", "_backup", "scripts", ".git", "Attachments"}

# Maps Attachments subdirectory to blob name prefix
DIR_PREFIX = {"Images": "", "Videos": "videos/", "Documents": "documents/"}


def blob_url(filename: str) -> str:
    """Return the Azure Blob URL for a given filename based on its extension."""
    ext = Path(filename).suffix.lstrip(".").lower()
    if ext in VIDEO_EXTS:
        return f"{BLOB_BASE}/videos/{filename}"
    elif ext in DOC_EXTS:
        return f"{BLOB_BASE}/documents/{filename}"
    else:
        return f"{BLOB_BASE}/{filename}"


def get_remote_blobs() -> set[str]:
    """Fetch the set of blob names already on Azure."""
    result = subprocess.run(
        [
            "az", "storage", "blob", "list",
            "--account-name", STORAGE_ACCOUNT,
            "--container-name", CONTAINER,
            "--query", "[].name",
            "-o", "json",
        ],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        print(f"Error listing blobs: {result.stderr.strip()}", file=sys.stderr)
        sys.exit(1)
    return set(json.loads(result.stdout))


def find_new_files(remote_blobs: set[str]) -> list[tuple[Path, str]]:
    """Find local files in Attachments/ not yet on Azure."""
    new_files = []
    for subdir, prefix in DIR_PREFIX.items():
        local_dir = ATTACHMENTS_DIR / subdir
        if not local_dir.is_dir():
            continue
        for fpath in sorted(local_dir.iterdir()):
            if not fpath.is_file():
                continue
            blob_name = f"{prefix}{fpath.name}"
            if blob_name not in remote_blobs:
                new_files.append((fpath, blob_name))
    return new_files


def upload_files(new_files: list[tuple[Path, str]], dry_run: bool) -> int:
    """Upload new files to Azure Blob Storage."""
    if not new_files:
        print("  No new files to upload.")
        return 0

    total = len(new_files)
    for i, (fpath, blob_name) in enumerate(new_files, 1):
        if dry_run:
            print(f"  [{i}/{total}] {blob_name} (would upload)")
        else:
            print(f"  [{i}/{total}] Uploading {blob_name}...")
            result = subprocess.run(
                [
                    "az", "storage", "blob", "upload",
                    "--account-name", STORAGE_ACCOUNT,
                    "--container-name", CONTAINER,
                    "--file", str(fpath),
                    "--name", blob_name,
                    "--only-show-errors",
                ],
                capture_output=True, text=True,
            )
            if result.returncode != 0:
                print(f"    FAILED: {result.stderr.strip()}", file=sys.stderr)
    return total


def migrate_content(text: str) -> str:
    """Rewrite local attachment references to Azure Blob URLs."""
    # Pattern 1: Markdown images with relative paths containing "Attachments"
    def replace_md_ref(m):
        alt = m.group(1)
        path = m.group(2)
        if "Attachments" not in path and not path.startswith("../"):
            return m.group(0)
        fname = Path(path).name
        return f"![{alt}]({blob_url(fname)})"

    text = re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", replace_md_ref, text)

    # Pattern 2: Obsidian wikilink embeds ![[filename.ext]]
    all_exts = IMAGE_EXTS | VIDEO_EXTS | DOC_EXTS
    ext_pattern = "|".join(sorted(all_exts))

    def replace_wiki_embed(m):
        fname = m.group(1)
        alt = Path(fname).stem.replace("-", " ")
        return f"![{alt}]({blob_url(fname)})"

    text = re.sub(
        rf"!\[\[([^\]]+\.(?:{ext_pattern}))\]\]",
        replace_wiki_embed,
        text,
        flags=re.IGNORECASE,
    )

    return text


def find_notes() -> list[Path]:
    """Find all markdown files in the vault (excluding infrastructure dirs)."""
    results = []
    for dirpath, dirnames, filenames in os.walk(VAULT_ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fname in filenames:
            if fname.endswith(".md"):
                results.append(Path(dirpath) / fname)
    return results


def rewrite_notes(dry_run: bool) -> int:
    """Rewrite local references in notes to Azure Blob URLs."""
    notes = find_notes()
    print(f"  Scanning {len(notes)} markdown files...")

    modified = 0
    for fpath in sorted(notes):
        text = fpath.read_text(encoding="utf-8")
        new_text = migrate_content(text)
        if new_text != text:
            rel = fpath.relative_to(VAULT_ROOT)
            modified += 1
            print(f"    [{modified}] {rel}")
            if not dry_run:
                fpath.write_text(new_text, encoding="utf-8")
    return modified


def main():
    dry_run = "--dry-run" in sys.argv
    upload_only = "--upload-only" in sys.argv
    rewrite_only = "--rewrite-only" in sys.argv

    if dry_run:
        print("==> DRY RUN — no changes will be made\n")

    # Check Azure CLI auth
    auth = subprocess.run(
        ["az", "account", "show", "--query", "name", "-o", "tsv"],
        capture_output=True, text=True,
    )
    if auth.returncode != 0:
        print("Error: not logged into Azure CLI. Run 'az login' first.", file=sys.stderr)
        sys.exit(1)
    print(f"Azure account: {auth.stdout.strip()}\n")

    if not rewrite_only:
        print("==> Phase 1: Checking for new files...")
        remote_blobs = get_remote_blobs()
        new_files = find_new_files(remote_blobs)
        print(f"  Found {len(new_files)} new file(s)\n")

        print("==> Phase 2: Uploading...")
        uploaded = upload_files(new_files, dry_run)
        print()

    if not upload_only:
        print("==> Phase 3: Rewriting note references...")
        modified = rewrite_notes(dry_run)
        action = "Would rewrite" if dry_run else "Rewrote"
        print(f"\n  {action} {modified} file(s).\n")

    print("==> Done.")


if __name__ == "__main__":
    main()
