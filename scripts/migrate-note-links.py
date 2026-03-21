#!/usr/bin/env python3
"""
One-time migration: rewrite local attachment references in all vault notes
to Azure Blob Storage URLs.

Handles:
- Relative paths: ../../Attachments/Images/file.png → Azure URL
- Obsidian wikilink images: ![[file.png]] → ![file](Azure URL)
- Obsidian wikilink videos: ![[file.mp4]] → Azure URL
- Obsidian wikilink documents: ![[file.pdf]] → Azure URL

Usage:
    python3 scripts/migrate-note-links.py             # apply changes
    python3 scripts/migrate-note-links.py --dry-run   # preview only
"""

import os
import re
import sys
from pathlib import Path

VAULT_ROOT = Path(__file__).resolve().parent.parent
BLOB_BASE = os.environ.get(
    "BLOB_STORAGE_URL", "https://junjieblob.blob.core.windows.net/images"
)

IMAGE_EXTS = {"png", "jpg", "jpeg", "gif", "webp", "svg", "heic"}
VIDEO_EXTS = {"mp4", "mov", "avi", "mkv", "webm"}
DOC_EXTS = {"pdf", "docx", "xlsx", "pptx", "doc", "xls", "csv"}

SKIP_DIRS = {"site", ".obsidian", "_backup", "scripts", ".git", "Attachments"}


def blob_url(filename: str) -> str:
    """Return the Azure Blob URL for a given filename based on its extension."""
    ext = Path(filename).suffix.lstrip(".").lower()
    if ext in VIDEO_EXTS:
        return f"{BLOB_BASE}/videos/{filename}"
    elif ext in DOC_EXTS:
        return f"{BLOB_BASE}/documents/{filename}"
    else:
        return f"{BLOB_BASE}/{filename}"


def migrate_content(text: str) -> str:
    """Rewrite all local attachment references to Azure Blob URLs."""
    original = text

    # Pattern 1: Standard markdown images/links with relative paths containing "Attachments"
    def replace_md_ref(m):
        alt = m.group(1)
        path = m.group(2)
        if "Attachments" not in path and not path.startswith("../"):
            return m.group(0)  # leave non-local refs alone
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


def find_notes():
    """Find all markdown files in the vault (excluding infrastructure dirs)."""
    results = []
    for dirpath, dirnames, filenames in os.walk(VAULT_ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fname in filenames:
            if fname.endswith(".md"):
                results.append(Path(dirpath) / fname)
    return results


def main():
    dry_run = "--dry-run" in sys.argv

    if dry_run:
        print("==> DRY RUN — no files will be modified\n")

    notes = find_notes()
    print(f"Scanning {len(notes)} markdown files...\n")

    modified = 0
    for fpath in sorted(notes):
        text = fpath.read_text(encoding="utf-8")
        new_text = migrate_content(text)
        if new_text != text:
            rel = fpath.relative_to(VAULT_ROOT)
            modified += 1
            print(f"  [{modified}] {rel}")
            if not dry_run:
                fpath.write_text(new_text, encoding="utf-8")

    print(f"\n{'Would modify' if dry_run else 'Modified'} {modified} file(s).")


if __name__ == "__main__":
    main()
