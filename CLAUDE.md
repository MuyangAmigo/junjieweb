# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A personal knowledge management system with a Hugo-based blog, deployed on Azure Static Web Apps.

- **Vault** (git-synced): Notes, journals, yearbook — markdown files tracked in git for cross-device editing
- **Media** (Azure only): Images, videos, documents — stored in Azure Blob Storage, not in git
- **Blog** (auto-deployed): Hugo site with PaperMod theme, CI/CD via GitHub Actions

## Blog Architecture

### GitHub & Deployment

- **Repo**: `MuyangAmigo/junjie-blog` (private) — GitHub account `MuyangAmigo`
- **Site URL**: https://victorious-desert-01d544110.2.azurestaticapps.net
- **CI/CD**: Push to `main` → GitHub Actions builds Hugo → deploys to Azure Static Web Apps
- **Azure resource group**: `junjieweb` (East Asia, Visual Studio Enterprise Subscription)
- **Azure Static Web App**: `junjie-blog` (Free tier)
- **Media storage**: Azure Blob Storage account `junjieblob`, container `images` (public read)
  - Images: `https://junjieblob.blob.core.windows.net/images/<filename>`
  - Videos: `https://junjieblob.blob.core.windows.net/images/videos/<filename>`
  - Documents: `https://junjieblob.blob.core.windows.net/images/documents/<filename>`

### What's Tracked in Git

Vault markdown content and blog infrastructure:

```
Notes/                         # Topical notes (Life, Career, Travel, Reference, Fitness, Uncategorized)
Journal/                       # Daily/personal journal entries by year (2023–2026), plus misc/
Yearbook/                      # Weekly review summaries and templates
.github/workflows/azure-static-web-apps.yml  # CI/CD pipeline
.gitignore
CLAUDE.md
scripts/obsidian-to-hugo.py    # Transforms vault notes → Hugo posts
scripts/publish.sh             # One-command publish workflow
scripts/sync-media.py          # Detect new media, upload to Azure, fix note refs
scripts/upload-media.sh        # Upload media to Azure, get markdown embed
scripts/migrate-attachments-to-azure.sh  # One-time bulk upload (migration)
scripts/migrate-note-links.py  # One-time link rewriter (migration)
site/hugo.toml                 # Hugo config (PaperMod theme, zh-cn)
site/archetypes/default.md
site/content/posts/            # Generated Hugo posts
site/themes/PaperMod           # Git submodule
```

### What's NOT in Git

- `Attachments/` — media files (images, videos, docs) are in Azure Blob Storage
- `.obsidian/` — Obsidian app config (optional, local only)
- Backup dirs, CSV mappings, vault-only scripts

### Daily Workflow

**Editing notes**: Edit markdown files anywhere (VS Code, Obsidian, github.dev, any device). Commit and push via git.

**Adding media to a note**:
```bash
./scripts/upload-media.sh path/to/image.png
# → Uploads to Azure, prints markdown to paste into your note
```

**Syncing new media** (after pasting images in Obsidian):
```bash
./scripts/sync-media.py
# → Detects new files in Attachments/, uploads to Azure, fixes note refs
```

**Publishing blog posts**:
1. Add `publish: true` to any note's YAML frontmatter
2. Run `./scripts/publish.sh` — syncs media, transforms notes, commits, pushes, CI deploys

Note: just pushing to GitHub is not enough — `publish.sh` (or `obsidian-to-hugo.py`) must run first to generate Hugo posts in `site/content/posts/`. CI/CD only builds what's in `site/`.

### Scripts

**`scripts/obsidian-to-hugo.py`** — Content transformation:
- Scans vault for `.md` files with `publish: true` in frontmatter
- Converts Obsidian `[[wikilinks]]` → plain text
- Strips Apple Notes HTML artifacts and bare Obsidian `#Tags`
- Builds Hugo-compatible YAML frontmatter
- Outputs to `site/content/posts/`
- Requires: `pyyaml`

**`scripts/publish.sh`** — One-command publish:
- Syncs media to Azure (runs `sync-media.py`)
- Runs `obsidian-to-hugo.py`
- Commits and pushes generated posts

**`scripts/sync-media.py`** — Ongoing media sync:
- Detects new files in `Attachments/` not yet on Azure (compares against remote blob list)
- Uploads new files to Azure Blob Storage
- Rewrites `![[wikilink]]` and relative-path references in notes to Azure Blob URLs
- Flags: `--dry-run`, `--upload-only`, `--rewrite-only`

**`scripts/upload-media.sh`** — Media upload helper:
- Uploads a file to Azure Blob Storage (auto-detects type → correct path prefix)
- Prints markdown embed for copy-paste into notes
- Skips if file already exists on Azure

**`scripts/migrate-attachments-to-azure.sh`** — One-time migration:
- Bulk-uploads all files from `Attachments/` to Azure Blob Storage
- Supports `--dry-run` flag

**`scripts/migrate-note-links.py`** — One-time migration:
- Rewrites local attachment paths in all notes to Azure Blob Storage URLs
- Supports `--dry-run` flag

### Vault-Only Scripts (not tracked in git)

- `scripts/generate-mapping.py` / `scripts/execute-reorganization.py` — Note reorganization with CSV mapping
- `scripts/rename-images.py` / `scripts/fix-images-and-convert-links.py` — Vision-based image renaming via Azure AI Foundry

## Vault Structure

```
Notes/          # Topical notes (Life, Career, Travel, Reference, Fitness, Uncategorized)
Journal/        # Daily/personal journal entries by year (2023–2026), plus misc/
Yearbook/       # Weekly review summaries and templates
Attachments/    # Local only — Images/, Videos/, Documents/, Other/ (not in git)
.obsidian/      # Local only — Obsidian app configuration
```

## Key Constraints

- Only files with `publish: true` in frontmatter are published to the blog
- Media (images, videos, docs) must never be committed to git — use Azure Blob Storage
- All media references in notes use Azure Blob Storage URLs (not local paths)
- Obsidian wikilinks `[[filename]]` are still used for note-to-note links (converted to plain text for Hugo)
- Sensitive data (`.env`, credentials) must never be committed

## Publishing Guidelines

When reviewing notes for publishing, **do NOT publish** notes containing:
- Real names, employee IDs, student IDs, or other PII
- Bank account numbers, card numbers, or financial details
- Internal company information (org charts, internal tools, project codenames, internal transfer docs)
- Employment records (resignation certificates, separation documents)
- Private contact info (phone numbers, emails, addresses)
- Chat/messaging conversations (WeChat, etc.)
- Performance ratings or salary information

Notes in `Notes/Career/` have been reviewed. Currently published: 18 articles (career development, PM frameworks, communication techniques, design, professional growth). Sensitive files (e.g., `microsoft-onboarding-checklist.md`, `internal-transfer-materials.md`, `undergrad-summary.md`, `trip-com-resignation-certificate.md`) are kept private.

## Migration Status

The one-time migration from local attachments to Azure Blob Storage is **complete** (2026-03-22):
- 590 media files uploaded (572 images, 9 videos, 9 documents)
- 126 note files rewritten from local paths to Azure Blob URLs
- Migration scripts (`migrate-attachments-to-azure.sh`, `migrate-note-links.py`) are kept for reference but should not need to run again
- Ongoing media sync is handled by `sync-media.py`
