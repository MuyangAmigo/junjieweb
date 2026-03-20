# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A personal Obsidian vault and knowledge management system, plus a Hugo-based personal blog deployed on Azure Static Web Apps.

- **Vault** (local only): Notes, journals, attachments — not tracked in git
- **Blog** (pushed to GitHub): Hugo site with PaperMod theme, CI/CD via GitHub Actions

## Blog Architecture

### GitHub & Deployment

- **Repo**: `MuyangAmigo/junjie-blog` (private) — GitHub account `MuyangAmigo`
- **Site URL**: https://victorious-desert-01d544110.2.azurestaticapps.net
- **CI/CD**: Push to `main` → GitHub Actions builds Hugo → deploys to Azure Static Web Apps
- **Azure resource group**: `junjieweb` (East Asia, Visual Studio Enterprise Subscription)
- **Azure Static Web App**: `junjie-blog` (Free tier)
- **Image storage**: Azure Blob Storage account `junjieblob`, container `images` (public read)
  - URL pattern: `https://junjieblob.blob.core.windows.net/images/<filename>`

### What's Tracked in Git

Only blog infrastructure files — no vault content, images, or sensitive data:

```
.github/workflows/azure-static-web-apps.yml  # CI/CD pipeline
.gitignore
CLAUDE.md
scripts/obsidian-to-hugo.py    # Transforms vault notes → Hugo posts
scripts/publish.sh             # One-command publish workflow
site/hugo.toml                 # Hugo config (PaperMod theme, zh-cn)
site/archetypes/default.md
site/content/posts/            # Generated Hugo posts (committed locally)
site/themes/PaperMod           # Git submodule
```

### Publishing Workflow

To publish a new article:

1. Add YAML frontmatter with `publish: true` to any vault `.md` file:
   ```yaml
   ---
   title: "Article Title"
   date: 2026-03-21
   publish: true
   categories: [Career]
   tags: [some-tag]
   ---
   ```
2. Run the publish script:
   ```bash
   ./scripts/publish.sh
   ```
   This does everything: transforms notes → uploads images to blob storage → commits → pushes → CI deploys.

### Scripts

**`scripts/obsidian-to-hugo.py`** — Content transformation:
- Scans vault for `.md` files with `publish: true` in frontmatter
- Converts image paths (`../../Attachments/Images/file.png` and `![[file.png]]`) → Azure Blob Storage URLs
- Converts Obsidian `[[wikilinks]]` → plain text
- Strips Apple Notes HTML artifacts and bare Obsidian `#Tags`
- Builds Hugo-compatible YAML frontmatter
- Outputs to `site/content/posts/`
- Requires: `pyyaml`
- Configurable via `BLOB_STORAGE_URL` env var

**`scripts/publish.sh`** — One-command publish:
- Runs `obsidian-to-hugo.py`
- Detects referenced images in generated posts
- Uploads new images to Azure Blob Storage (skips existing)
- Commits and pushes changes

### Vault-Only Scripts (not tracked in git)

These live locally for vault management:

- `scripts/generate-mapping.py` / `scripts/execute-reorganization.py` — Note reorganization with CSV mapping
- `scripts/rename-images.py` / `scripts/fix-images-and-convert-links.py` — Vision-based image renaming via Azure AI Foundry

## Vault Structure (local only)

```
Notes/          # Topical notes (Life, Career, Travel, Reference, Fitness, Uncategorized)
Journal/        # Daily/personal journal entries by year (2023–2026), plus misc/
Yearbook/       # Weekly review summaries and templates
Attachments/    # Images/, Videos/, Documents/, Other/
.obsidian/      # Obsidian app configuration
```

## Key Constraints

- Obsidian wikilinks use `[[filename]]` (stem only, no path)
- Only files with `publish: true` in frontmatter are published — everything else is excluded by default
- Vault content, images, and sensitive data must never be committed to git
- Images are served from Azure Blob Storage, not from the Hugo static dir
- The git history was cleaned (orphan branch) to remove any prior vault content
