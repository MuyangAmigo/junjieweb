#!/usr/bin/env python3
"""
Transform Obsidian vault articles into Hugo-compatible posts.

Only processes .md files that contain `publish: true` in their YAML frontmatter.
- Converts image paths to Azure Blob Storage URLs
- Converts Obsidian wikilinks to standard markdown links
- Strips HTML artifacts from Apple Notes
- Outputs processed .md to site/content/posts/

Set BLOB_STORAGE_URL env var to override the default image base URL.
"""

import os
import re

import yaml
from pathlib import Path

VAULT_ROOT = Path(__file__).resolve().parent.parent
SITE_DIR = VAULT_ROOT / "site"
CONTENT_DIR = SITE_DIR / "content" / "posts"

# Azure Blob Storage base URL for images (no trailing slash)
BLOB_STORAGE_URL = os.environ.get("BLOB_STORAGE_URL", "https://junjieblob.blob.core.windows.net/images")


def parse_frontmatter(text: str):
    """Extract YAML frontmatter and body from a markdown file."""
    if not text.startswith("---"):
        return None, text
    end = text.find("---", 3)
    if end == -1:
        return None, text
    fm_str = text[3:end].strip()
    body = text[end + 3:].strip()
    try:
        fm = yaml.safe_load(fm_str)
    except yaml.YAMLError:
        return None, text
    return fm, body


def find_publishable_files():
    """Find all .md files with publish: true in frontmatter."""
    results = []
    for dirpath, _, filenames in os.walk(VAULT_ROOT):
        # Skip non-content directories
        skip_dirs = {"site", ".obsidian", "_backup", "scripts", ".git", "Attachments"}
        if any(s in dirpath for s in skip_dirs):
            continue
        for fname in filenames:
            if not fname.endswith(".md"):
                continue
            fpath = Path(dirpath) / fname
            text = fpath.read_text(encoding="utf-8")
            fm, body = parse_frontmatter(text)
            if fm and fm.get("publish") is True:
                results.append((fpath, fm, body))
    return results


def convert_image_paths(body: str, source_file: Path):
    """Convert relative image paths and wikilink embeds to Azure Blob Storage URLs."""

    # Pattern 1: Standard markdown images ![alt](path)
    def replace_md_image(m):
        alt = m.group(1)
        path = m.group(2)
        fname = Path(path).name
        return f"![{alt}]({BLOB_STORAGE_URL}/{fname})"

    body = re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", replace_md_image, body)

    # Pattern 2: Obsidian wikilink embeds ![[image.ext]]
    def replace_wiki_image(m):
        fname = m.group(1)
        alt = Path(fname).stem.replace("-", " ")
        return f"![{alt}]({BLOB_STORAGE_URL}/{fname})"

    body = re.sub(
        r"!\[\[([^\]]+\.(?:png|jpg|jpeg|gif|webp|svg|heic))\]\]",
        replace_wiki_image,
        body,
        flags=re.IGNORECASE,
    )

    return body


def convert_wikilinks(body: str):
    """Convert Obsidian [[wikilinks]] to plain text or standard links."""
    # [[target|alias]] → alias
    body = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"[\2]", body)
    # [[target]] → target
    body = re.sub(r"\[\[([^\]]+)\]\]", r"\1", body)
    return body


def strip_html_artifacts(body: str):
    """Remove Apple Notes HTML span artifacts."""
    body = re.sub(r'<span[^>]*style="font-family:[^"]*"[^>]*>', "", body)
    body = re.sub(r"</span>", "", body)
    return body


def strip_obsidian_tags(body: str):
    """Remove bare Obsidian #Tag lines (e.g., #Career at end of file)."""
    # Remove lines that are just hashtags (Obsidian tags, not markdown headings)
    body = re.sub(r"\n#([A-Za-z]\w*)(\s|$)", "\n", body)
    return body.rstrip() + "\n"


def build_hugo_frontmatter(fm: dict, source_file: Path) -> str:
    """Build Hugo-compatible YAML frontmatter."""
    hugo_fm = {}
    hugo_fm["title"] = fm.get("title", source_file.stem.replace("-", " ").title())
    if "date" in fm:
        hugo_fm["date"] = str(fm["date"])
    if "categories" in fm:
        hugo_fm["categories"] = fm["categories"]
    elif source_file.parent.name in ("Career", "Life", "Travel", "Reference", "Fitness"):
        hugo_fm["categories"] = [source_file.parent.name]
    if "tags" in fm:
        hugo_fm["tags"] = fm["tags"]
    hugo_fm["draft"] = fm.get("draft", False)

    lines = ["---"]
    lines.append(yaml.dump(hugo_fm, default_flow_style=False, allow_unicode=True).strip())
    lines.append("---")
    return "\n".join(lines)


def process_file(fpath: Path, fm: dict, body: str):
    """Process a single file and write to Hugo content dir."""
    print(f"Processing: {fpath.relative_to(VAULT_ROOT)}")

    body = convert_image_paths(body, fpath)
    body = convert_wikilinks(body)
    body = strip_html_artifacts(body)
    body = strip_obsidian_tags(body)

    hugo_fm = build_hugo_frontmatter(fm, fpath)
    output = f"{hugo_fm}\n\n{body}\n"

    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = CONTENT_DIR / fpath.name
    out_path.write_text(output, encoding="utf-8")
    print(f"  → {out_path.relative_to(VAULT_ROOT)}")


def main():
    print("Scanning vault for publishable files...")
    files = find_publishable_files()
    if not files:
        print("No files with 'publish: true' found.")
        return

    print(f"Found {len(files)} file(s) to publish.\n")
    for fpath, fm, body in files:
        process_file(fpath, fm, body)

    print(f"\nDone. {len(files)} file(s) processed.")


if __name__ == "__main__":
    main()
