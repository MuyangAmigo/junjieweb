# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A personal knowledge management system with a multi-purpose personal website (resume + blog), deployed on Azure Static Web Apps.

- **Vault** (git-synced): Notes, journals, yearbook — markdown files tracked in git for cross-device editing
- **Media** (Azure only): Images, videos, documents — stored in Azure Blob Storage, not in git
- **Website** (auto-deployed): Next.js site with resume/portfolio + blog, CI/CD via GitHub Actions

## Site Architecture

### Tech Stack

- **Framework**: Next.js 16 with App Router, TypeScript, static export (`output: "export"`)
- **Styling**: Tailwind CSS v4 with monochrome technical dark theme
- **Fonts**: Inter (body) + JetBrains Mono (labels, dates, metadata)
- **Theme**: Dark by default, light mode toggle available (`.light` class on `<html>`)
- **Blog**: External posts from Microsoft developer blogs, linked via `externalPosts` in `data.ts`

### Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Hero with bio, career timeline, latest 5 posts |
| About | `/about` | Full resume — experience (with company logos), education (with school logos, dual degree, publication collapsed in), skills |
| Posts | `/posts` | External blog posts grouped by year, links to Microsoft blogs |

### GitHub & Deployment

- **Repo**: `MuyangAmigo/junjie-blog` (private) — GitHub account `MuyangAmigo`
- **Site URL**: https://victorious-desert-01d544110.2.azurestaticapps.net
- **CI/CD**: Push to `main` → GitHub Actions installs deps → `npx next build` → deploys `site-next/out/` to Azure Static Web Apps
- **Azure resource group**: `junjieweb` (East Asia, Visual Studio Enterprise Subscription)
- **Azure Static Web App**: `junjie-blog` (Free tier)
- **Media storage**: Azure Blob Storage account `junjieblob`, container `images` (public read)
  - Images: `https://junjieblob.blob.core.windows.net/images/<filename>`
  - Videos: `https://junjieblob.blob.core.windows.net/images/videos/<filename>`
  - Documents: `https://junjieblob.blob.core.windows.net/images/documents/<filename>`

### What's Tracked in Git

```
Notes/                         # Topical notes (Life, Career, Travel, Reference, Fitness, Uncategorized)
Journal/                       # Daily/personal journal entries by year (2023–2026), plus misc/
Yearbook/                      # Weekly review summaries and templates
.github/workflows/azure-static-web-apps.yml  # CI/CD pipeline (deploy on push to main)
.github/workflows/fetch-posts.yml             # Manual workflow: fetch external posts → PR
.gitignore
CLAUDE.md
scripts/obsidian-to-hugo.py    # Transforms vault notes → blog posts (outputs to both site/ and site-next/)
scripts/publish.sh             # One-command publish workflow
scripts/sync-media.py          # Detect new media, upload to Azure, fix note refs
scripts/upload-media.sh        # Upload media to Azure, get markdown embed
scripts/fetch-external-posts.mjs  # Fetch posts from Microsoft blogs → update data.ts
scripts/migrate-attachments-to-azure.sh  # One-time bulk upload (migration, reference only)
scripts/migrate-note-links.py  # One-time link rewriter (migration, reference only)
site-next/                     # Active Next.js personal site
  src/app/                     # App Router pages (home, about, posts, post detail)
  src/components/              # Header, Footer
  src/lib/                     # Data (resume info), posts (markdown reader)
  content/posts/               # Generated blog posts (markdown)
  next.config.ts               # Static export config
  postcss.config.mjs           # Tailwind CSS v4
  package.json / package-lock.json
site/                          # Legacy Hugo site (kept as reference, no longer deployed)
```

### What's NOT in Git

- `Attachments/` — media files (images, videos, docs) are in Azure Blob Storage
- `.obsidian/` — Obsidian app config (optional, local only)
- `site-next/.next/`, `site-next/out/`, `site-next/node_modules/` — Next.js build artifacts
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

**Local development**:
```bash
cd site-next && npx next dev
# → Open http://localhost:3000
```

**Publishing blog posts**:
1. Add `publish: true` to any note's YAML frontmatter
2. Run `./scripts/publish.sh` — syncs media, transforms notes, commits, pushes, CI deploys

Note: `publish.sh` (or `obsidian-to-hugo.py`) must run first to generate posts in `site-next/content/posts/`. CI/CD only builds what's in `site-next/`.

### Scripts

**`scripts/obsidian-to-hugo.py`** — Content transformation:
- Scans vault for `.md` files with `publish: true` in frontmatter
- Converts Obsidian `[[wikilinks]]` → plain text
- Strips Apple Notes HTML artifacts and bare Obsidian `#Tags`
- Builds Hugo-compatible YAML frontmatter
- Outputs to both `site/content/posts/` (legacy) and `site-next/content/posts/` (active)
- Requires: `pyyaml`

**`scripts/publish.sh`** — One-command publish:
- Syncs media to Azure (runs `sync-media.py`)
- Runs `obsidian-to-hugo.py`
- Commits and pushes generated posts from both content directories

**`scripts/sync-media.py`** — Ongoing media sync:
- Detects new files in `Attachments/` not yet on Azure (compares against remote blob list)
- Uploads new files to Azure Blob Storage
- Rewrites `![[wikilink]]` and relative-path references in notes to Azure Blob URLs
- Flags: `--dry-run`, `--upload-only`, `--rewrite-only`

**`scripts/upload-media.sh`** — Media upload helper:
- Uploads a file to Azure Blob Storage (auto-detects type → correct path prefix)
- Prints markdown embed for copy-paste into notes
- Skips if file already exists on Azure

**`scripts/fetch-external-posts.mjs`** — External post indexer:
- Fetches posts from Microsoft 365 Developer Blog and Microsoft Tech Community
- Parses HTML (DevBlog) and Apollo GraphQL cache (Tech Community) for titles, dates, URLs
- Updates `externalPosts` array in `site-next/src/lib/data.ts`
- Safe no-op if no posts are found (won't wipe existing data)
- Run manually: `node scripts/fetch-external-posts.mjs`
- Also available as GitHub Actions workflow: "Fetch External Posts" (manual trigger → creates PR)

### Vault-Only Scripts (not tracked in git)

- `scripts/generate-mapping.py` / `scripts/execute-reorganization.py` — Note reorganization with CSV mapping
- `scripts/rename-images.py` / `scripts/fix-images-and-convert-links.py` — Vision-based image renaming via Azure AI Foundry

### Next.js Site Structure

```
site-next/
  src/
    app/
      layout.tsx          # Root layout (Inter + JetBrains Mono fonts, Header, Footer)
      globals.css         # CSS variables (dark/light), prose styles, animations
      page.tsx            # Home page (hero, timeline, latest posts)
      about/page.tsx      # Resume page (experience, education, skills)
      posts/page.tsx      # Blog listing (grouped by year)
      posts/[slug]/page.tsx  # Individual post
    components/
      Header.tsx          # Nav bar with theme toggle, mobile menu
      Footer.tsx          # Footer with social links
    lib/
      data.ts             # Profile, experience, education, skills, external posts data
      posts.ts            # Markdown post reader (gray-matter + remark, legacy)
  content/posts/          # Legacy blog post markdown files (unlisted)
  next.config.ts          # Static export for Azure Static Web Apps
```

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
- Obsidian wikilinks `[[filename]]` are still used for note-to-note links (converted to plain text for blog)
- Sensitive data (`.env`, credentials) must never be committed
- Resume/profile data lives in `site-next/src/lib/data.ts` — update there for career changes
- Blog posts section shows external links to Microsoft developer blogs (not local markdown)
- External posts are managed via `externalPosts` in `data.ts`, updated by `fetch-external-posts.mjs`

## Publishing Guidelines

When reviewing notes for publishing, **do NOT publish** notes containing:
- Real names, employee IDs, student IDs, or other PII
- Bank account numbers, card numbers, or financial details
- Internal company information (org charts, internal tools, project codenames, internal transfer docs)
- Employment records (resignation certificates, separation documents)
- Private contact info (phone numbers, emails, addresses)
- Chat/messaging conversations (WeChat, etc.)
- Performance ratings or salary information

Notes in `Notes/Career/` have been reviewed. Previously published 18 local articles (now unlisted). Blog section now links to 24 external posts on Microsoft developer blogs. Sensitive files (e.g., `microsoft-onboarding-checklist.md`, `internal-transfer-materials.md`, `undergrad-summary.md`, `trip-com-resignation-certificate.md`) are kept private.

## Migration Status

**Hugo → Next.js migration** completed 2026-03-22:
- Built Next.js personal site with monochrome technical dark theme
- Home page with hero, career timeline, latest posts
- About page with full resume (experience, education, skills)
- Blog system with markdown rendering (18 posts migrated)
- CI/CD updated to build Next.js and deploy `site-next/out/`
- Legacy Hugo site kept at `site/` for reference

**Attachments → Azure Blob Storage migration** completed 2026-03-22:
- 590 media files uploaded (572 images, 9 videos, 9 documents)
- 126 note files rewritten from local paths to Azure Blob URLs
- Migration scripts kept for reference but should not need to run again
- Ongoing media sync is handled by `sync-media.py`
