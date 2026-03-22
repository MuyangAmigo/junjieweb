#!/usr/bin/env python3
"""
Transform Obsidian vault articles into Hugo-compatible posts.

Only processes .md files that contain `publish: true` in their YAML frontmatter.
- Converts Obsidian wikilinks to plain text
- Strips HTML artifacts from Apple Notes
- Builds Hugo-compatible YAML frontmatter
- Outputs processed .md to site/content/posts/

Note: Image/media URLs are already Azure Blob Storage URLs in the source notes
(converted by the one-time migrate-note-links.py migration).
"""

import os
import re

import yaml
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
# VAULT_PATH env var points to the Obsidian vault (e.g. iCloud). Falls back to repo root.
VAULT_ROOT = Path(os.environ.get("VAULT_PATH", str(REPO_ROOT)))
# Output to both Hugo (site/) and Next.js (site-next/) content directories
SITE_DIR = REPO_ROOT / "site"
HUGO_CONTENT_DIR = SITE_DIR / "content" / "posts"
NEXT_CONTENT_DIR = REPO_ROOT / "site-next" / "content" / "posts"


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

    body = convert_wikilinks(body)
    body = strip_html_artifacts(body)
    body = strip_obsidian_tags(body)

    hugo_fm = build_hugo_frontmatter(fm, fpath)
    output = f"{hugo_fm}\n\n{body}\n"

    # Write to both Hugo and Next.js content directories
    for content_dir in (HUGO_CONTENT_DIR, NEXT_CONTENT_DIR):
        content_dir.mkdir(parents=True, exist_ok=True)
        out_path = content_dir / fpath.name
        out_path.write_text(output, encoding="utf-8")
        print(f"  → {out_path.relative_to(REPO_ROOT)}")


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
