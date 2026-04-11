# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A personal website (resume + blog) with a publishing pipeline from an Obsidian vault, deployed on Azure Static Web Apps.

- **Vault** (iCloud, not git): Obsidian notes (path configured via `VAULT_PATH` in `.env`)
- **Media** (Azure only): Images, videos, documents — stored in Azure Blob Storage, not in git
- **Website** (auto-deployed): Next.js site with resume/portfolio + blog, CI/CD via GitHub Actions

## Site Architecture

### Tech Stack

- **Framework**: Next.js 16 with App Router, TypeScript, static export (`output: "export"`)
- **Styling**: Tailwind CSS v4 with Spatial UI design tokens (cinema-dark surfaces, top-lit borders, inset shadows)
- **Fonts**: Geist (body) + Geist Mono (labels, dates, metadata)
- **Theme**: Dark by default (`#050506`), light mode toggle. Cyan accent (`#00b4d8`) used sparingly.
- **Design**: Spatial UI — Bento/Passepartout cards, spring-like CSS animations, breathing gradient orb, 40px blueprint dot-matrix background
- **i18n**: 3 locales (en, zh, ja) with locale-prefixed routes (`/en/about`, `/zh/work`). Overlay translation architecture.
- **Blog**: External posts from Microsoft developer blogs, linked via `externalPosts` in `data.ts`, with translated titles/summaries per locale

### Pages

All pages are under `[locale]/` prefix (en, zh, ja). Root `/` redirects to `/en`.

| Page | Path | Description |
|------|------|-------------|
| Home | `/[locale]` | Hero heading, "Currently building" pill, Impact Strip (1M+/130K/2), compact work cards (2-col), latest 3 posts |
| About | `/[locale]/about` | Sidebar TOC + avatar (desktop), experience timeline, education, skills tags |
| Work | `/[locale]/work` | Project listing with spatial-card hero images (Passepartout effect) |
| Work Detail | `/[locale]/work/[slug]` | 7-section case study: problem, personas, journey, stories, features, architecture |
| Posts | `/[locale]/posts` | Featured post hero, at-a-glance table, year-grouped cards (current 1-col, older 3-col) |
| Post Detail | `/[locale]/posts/[slug]` | Markdown article (English content, translated chrome) |

### GitHub & Deployment

- **CI/CD**: Push to `main` → GitHub Actions installs deps → `npx next build` → deploys `site-next/out/` to Azure Static Web Apps
- **Media storage**: Azure Blob Storage (account and container configured via `AZURE_STORAGE_ACCOUNT` and `AZURE_STORAGE_CONTAINER` env vars)
  - Images: `https://<account>.blob.core.windows.net/<container>/<filename>`
  - Videos: `https://<account>.blob.core.windows.net/<container>/videos/<filename>`
  - Documents: `https://<account>.blob.core.windows.net/<container>/documents/<filename>`

### What's Tracked in Git

```
.github/workflows/azure-static-web-apps.yml  # CI/CD pipeline (deploy on push to main)
.github/workflows/fetch-posts.yml             # Manual workflow: fetch external posts → PR
.gitignore
CLAUDE.md
scripts/obsidian-to-hugo.py    # Transforms vault notes → blog posts (outputs to site-next/)
scripts/publish.sh             # One-command publish workflow
scripts/sync-media.py          # Detect new media, upload to Azure, fix note refs
scripts/upload-media.sh        # Upload media to Azure, get markdown embed
scripts/fetch-external-posts.mjs  # Fetch posts from Microsoft blogs → update data.ts
scripts/migrate-attachments-to-azure.sh  # One-time bulk upload (migration, reference only)
scripts/migrate-note-links.py  # One-time link rewriter (migration, reference only)
docs/                          # Site improvement plans and documentation
site-next/                     # Active Next.js personal site
  public/                      # Static assets (currently empty; profile photo served from Azure)
  src/app/                     # App Router pages (home, about, posts, post detail)
  src/components/              # Header, Footer, Icons
  src/lib/                     # Data (resume info), posts (markdown reader)
  content/posts/               # Generated blog posts (markdown)
  next.config.ts               # Static export config
  postcss.config.mjs           # Tailwind CSS v4
  package.json / package-lock.json
```

### What's NOT in Git

- `Notes/`, `Journal/`, `Yearbook/` — vault content lives in iCloud (see Vault path above)
- `Attachments/` — media files (images, videos, docs) are in Azure Blob Storage
- `.obsidian/` — Obsidian app config (optional, local only)
- `site-next/.next/`, `site-next/out/`, `site-next/node_modules/` — Next.js build artifacts
- Backup dirs, CSV mappings, vault-only scripts

### Daily Workflow

**Editing notes**: Edit in Obsidian on any device — vault syncs via iCloud automatically.

**One-time setup** (after cloning repo):
```bash
cp .env.example .env
# Edit .env — set VAULT_PATH to your Obsidian vault and AZURE_STORAGE_ACCOUNT to your storage account
```

**Adding media to a note**:
```bash
./scripts/upload-media.sh path/to/image.png
# → Uploads to Azure, prints markdown to paste into your note
```

**Local development**:
```bash
cd site-next && npx next dev
# → Open http://localhost:3000
```

**Publishing blog posts**:
1. Add `publish: true` to any note's YAML frontmatter in Obsidian
2. Run `./scripts/publish.sh` from this repo — reads vault from `VAULT_PATH`, transforms notes, commits, pushes, CI deploys

Note: `publish.sh` (or `obsidian-to-hugo.py`) must run first to generate posts in `site-next/content/posts/`. CI/CD only builds what's in `site-next/`.

### Scripts

**`scripts/obsidian-to-hugo.py`** — Content transformation:
- Reads vault from `VAULT_PATH` env var (set in `.env`); falls back to repo root
- Scans vault for `.md` files with `publish: true` in frontmatter
- Converts Obsidian `[[wikilinks]]` → plain text
- Strips Apple Notes HTML artifacts and bare Obsidian `#Tags`
- Builds YAML frontmatter
- Outputs to `site-next/content/posts/`
- Requires: `pyyaml`

**`scripts/publish.sh`** — One-command publish:
- Loads `.env` (requires `VAULT_PATH` to be set)
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
      layout.tsx              # Root layout (Geist fonts, globals, html shell)
      globals.css             # Spatial UI tokens, animations, card classes, prose styles
      page.tsx                # Root redirect → /en
      [locale]/
        layout.tsx            # Locale layout (Header, Footer, SetLang, ScrollToTop)
        page.tsx              # Home page (hero, impact strip, work cards, latest posts)
        about/page.tsx        # Resume (sidebar TOC, experience, education, skills)
        work/page.tsx         # Project listing (spatial-card with hero images)
        work/[slug]/page.tsx  # Project detail (7-section case study)
        posts/page.tsx        # Blog listing (featured + at-a-glance + year grid)
        posts/[slug]/page.tsx # Individual post (markdown, English content)
    components/
      Header.tsx              # Centered pill nav, icons, language switcher, theme toggle
      Footer.tsx              # Footer with social icon buttons
      Icons.tsx               # Shared SVG icons (GitHub, LinkedIn, Email, ArrowRight)
      ScrollToTop.tsx         # Scroll-to-top button (slide-up entrance)
      SetLang.tsx             # Client component: sets <html lang> per locale
      LanguageSwitcher.tsx    # EN/中/日 pill selector
      CountUp.tsx             # IntersectionObserver number counter animation
    i18n/
      config.ts               # Locale types, validation, defaultLocale
      get-dictionary.ts       # Loads UI string dictionaries per locale
      get-localized-data.ts   # Overlay merger for data translations
      dictionaries/{en,zh,ja}.ts  # ~50 UI strings per locale
      data/{en,zh,ja}.ts      # Profile, experience, education, skills translations
      posts/{en,zh,ja}.ts     # 24 post title/subtitle/summary translations
      projects/{en,zh,ja}.ts  # 2 project case study translations (all 7 sections)
    lib/
      data.ts                 # Base data: profile, experience, education, skills, posts, projects
      posts.ts                # Markdown post reader (gray-matter + remark, legacy)
  content/posts/              # Legacy blog post markdown files (18 posts)
  next.config.ts              # Static export for Azure Static Web Apps
```

## Vault Structure

Vault lives in iCloud (path configured via `VAULT_PATH` in `.env`, not tracked in this repo).

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
- Translations use overlay pattern: base `data.ts` stays English, locale-specific text in `i18n/{data,posts,projects}/{zh,ja}.ts`
- Blog posts section shows external links to Microsoft developer blogs (not local markdown)
- External posts are managed via `externalPosts` in `data.ts`, updated by `fetch-external-posts.mjs`
- When adding new posts/projects, also add translations to `i18n/posts/` and `i18n/projects/` overlay files

## Publishing Guidelines

When reviewing notes for publishing, **do NOT publish** notes containing:
- Real names, employee IDs, student IDs, or other PII
- Bank account numbers, card numbers, or financial details
- Internal company information (org charts, internal tools, project codenames, internal transfer docs)
- Employment records (resignation certificates, separation documents)
- Private contact info (phone numbers, emails, addresses)
- Chat/messaging conversations (WeChat, etc.)
- Performance ratings or salary information

Notes in `Notes/Career/` have been reviewed. Previously published 18 local articles (now unlisted). Blog section now links to 24 external posts on Microsoft developer blogs. Certain sensitive files are kept private.

## Migration Status

**Hugo → Next.js migration** completed 2026-03-22:
- Built Next.js personal site with monochrome technical dark theme
- Home page with hero, career timeline, latest posts
- About page with full resume (experience, education, skills)
- Blog system with markdown rendering (18 posts migrated)
- CI/CD updated to build Next.js and deploy `site-next/out/`
- Legacy Hugo site removed from repo (2026-03-28)

**Fluent UI design system alignment** completed 2026-03-24:
- Adopted Fluent UI color tokens (brand blue, neutral grey scale) for both dark and light themes
- Dual-layer shadow system (ambient + key) with hover elevation on cards
- Tighter border radius scale (4px/6px/8px matching Fluent medium/large/xlarge)
- Snappier motion: 300ms fade-in with Fluent curveDecelerateMid, 200ms transitions
- Condensed experience bullet points (2 per role), vertical education layout
- Posts page: current year full-width, older years 2-column grid

**Attachments → Azure Blob Storage migration** completed 2026-03-22:
- 590 media files uploaded (572 images, 9 videos, 9 documents)
- 126 note files rewritten from local paths to Azure Blob URLs
- Migration scripts kept for reference but should not need to run again
- Ongoing media sync is handled by `sync-media.py`

**Work section + Spatial UI redesign** completed 2026-04-12:
- Added Work section with 2 project case studies (AI Toolkit, M365 Agents Toolkit) generated via PM Portfolio Generator
- Full site redesign: Magic Portfolio → Structured Minimal → Spatial UI design system
- Geist fonts, cinema-dark theme (#050506), cyan accent, 40px blueprint dot-matrix background
- Centered pill nav with icons (desktop), bottom-fixed (mobile), language switcher
- Spatial cards: Passepartout padding, inset shadow 3D volume, magnetic hover scale
- Cinematic spring-like CSS animations (spatial-enter, hover-lift, scale-pop, CountUp)
- Posts page: featured hero, color-coded tag badges, at-a-glance table, 3-col year grid

**Full i18n** completed 2026-04-12:
- 3 locales: English (en), Simplified Chinese (zh), Japanese (ja)
- Route structure: all pages under `[locale]/` prefix, root `/` redirects to `/en`
- Overlay translation architecture: base `data.ts` + locale text overlays merged at render
- ~500 translated strings per locale (UI, profile, experience, posts, projects)
- Language switcher: EN/中/日 pill selector in nav
- SetLang client component updates `<html lang>` per locale
- 75 static pages generated across 3 locales
