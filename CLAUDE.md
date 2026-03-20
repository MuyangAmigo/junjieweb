# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A personal Obsidian vault and knowledge management system for notes, journals, and attachments. The `/scripts/` directory contains Python utilities for file reorganization and image management.

## Scripts

All scripts live in `/scripts/`. The reorganization scripts (`generate-mapping.py`, `execute-reorganization.py`) use only Python 3 stdlib. The image scripts (`rename-images.py`, `fix-images-and-convert-links.py`) additionally require the `openai` package and use Azure AI Foundry for vision-based image naming.

### Note Reorganization

```bash
# Step 1: Generate a CSV mapping of old→new file paths
python3 scripts/generate-mapping.py
# Output: scripts/reorganization-mapping.csv

# Step 2: Execute the reorganization from the mapping
python3 scripts/execute-reorganization.py
```

`execute-reorganization.py` automatically backs up files to `_backup_before_reorg/` before making changes.

### Image Renaming & Link Conversion

```bash
# Rename images to descriptive kebab-case names using a vision model
python3 scripts/rename-images.py
# Output: scripts/image-rename-mapping.csv, backs up to _backup_before_image_rename/

# Fix remaining unnamed images + convert Obsidian wikilinks to standard Markdown image syntax
python3 scripts/fix-images-and-convert-links.py
```

## Script Architecture

**`generate-mapping.py`** — Analysis pass only (no file mutations):
- `FOLDER_MAP`: Old folder paths → new paths (e.g., `"Apple Notes/📋资料"` → `"Notes/Reference"`)
- `FILENAME_TRANSLATIONS`: ~200 Chinese→English filename mappings
- `RECATEGORIZE_MAP`: Rules for placing root-level files into proper folders
- `translate_filename()` / `clean_filename()`: Converts to English kebab-case
- `process_journal_file()`: Special handling for date-based journal entries
- Outputs `reorganization-mapping.csv` with columns: `old_path`, `new_path`, `category`, `notes`

**`execute-reorganization.py`** — Mutation pass (reads from CSV):
- `update_wikilinks()`: The critical function — rewrites Obsidian `[[wikilink]]` and `![[embed]]` syntax (including `[[target|alias]]` forms) across all `.md` files when file stems change
- `update_obsidian_config()`: Updates `attachmentFolderPath` in `.obsidian/app.json`
- `verify_links()`: Post-run scan for broken links

**`rename-images.py`** — Vision-based image renaming:
- Uses Azure AI Foundry (GPT model) to analyze images and generate descriptive kebab-case filenames
- Runs concurrently (50 workers) within API rate limits
- Converts HEIC → JPEG via `sips` for API compatibility
- Deduplicates names (appends -2, -3, etc. for collisions)
- Updates all wikilinks/embeds in `.md` files after renaming
- Backs up originals to `_backup_before_image_rename/`
- Outputs `image-rename-mapping.csv`

**`fix-images-and-convert-links.py`** — Two-phase cleanup:
- Phase 1: Re-names any remaining `unnamed-image-N` files via the vision API, then updates wikilinks
- Phase 2: Converts all Obsidian image wikilinks (`![[image.ext]]`) to standard Markdown syntax (`![alt](relative/path/image.ext)`) so images render in VS Code and GitHub

## Vault Structure

```
Notes/          # Topical notes (Life, Career, Travel, Reference, Fitness, Uncategorized)
Journal/        # Daily/personal journal entries by year (2023–2026), plus misc/
Yearbook/       # Weekly review summaries and templates
Attachments/    # Images/, Videos/, Documents/, Other/
scripts/        # Python reorganization and image-management utilities
_backup_before_reorg/          # Backup created before note reorganization
_backup_before_image_rename/   # Backup created before image renaming
.obsidian/      # Obsidian app configuration (do not edit manually)
```

## Key Constraints

- Obsidian wikilinks use `[[filename]]` (stem only, no path) — the `update_wikilinks()` function must handle all link variants when renaming files
- Attachment folder is configured in `.obsidian/app.json` under `attachmentFolderPath`
- Always generate and review CSV mappings before executing — check the `notes` column for `collision`, `sensitive`, and `tiny_file` flags
- Media files (images, videos, PDFs) are tracked with Git LFS (see `.gitattributes`)
