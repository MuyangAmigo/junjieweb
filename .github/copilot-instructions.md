# Copilot Instructions

Personal website (resume + blog) with an Obsidian vault publishing pipeline, deployed on Azure Static Web Apps.

## Build & Dev Commands

All commands run from `site-next/`:

```bash
npx next dev          # Local dev server at http://localhost:3000
npx next build        # Static export → site-next/out/
npm ci                # Install dependencies (CI uses this)
```

No test suite or linter is configured. The build itself is the primary validation — CI runs `npx next build` on push to `main`.

## Architecture

### Three-layer system

1. **Obsidian vault** (iCloud, not in git) — Notes authored in Obsidian. Path set via `VAULT_PATH` in `.env`.
2. **Publishing scripts** (`scripts/`) — Python/bash tools transform vault notes into site content and sync media to Azure Blob Storage.
3. **Next.js site** (`site-next/`) — Static site with App Router, deployed to Azure Static Web Apps via GitHub Actions.

Content flows one direction: Vault → scripts → `site-next/` → CI/CD → Azure.

### Site data model

All structured data lives in `site-next/src/lib/data.ts` — profile, experience, education, skills, and `externalPosts`. There is no CMS or database. The blog section links to external Microsoft developer blog posts (not local markdown). To update career info or add posts, edit `data.ts` directly.

Legacy local markdown posts exist in `site-next/content/posts/` but are unlisted — the `posts.ts` reader is kept for backward compatibility.

### Key scripts

| Script | Purpose |
|--------|---------|
| `scripts/publish.sh` | One-command publish: runs `obsidian-to-hugo.py`, commits, pushes |
| `scripts/obsidian-to-hugo.py` | Transforms vault notes with `publish: true` frontmatter → `site-next/content/posts/` |
| `scripts/fetch-external-posts.mjs` | Scrapes Microsoft blogs → updates `externalPosts` in `data.ts` |
| `scripts/sync-media.py` | Uploads new media to Azure Blob Storage, rewrites note references |
| `scripts/upload-media.sh` | Upload a single file to Azure Blob, prints markdown embed |

### CI/CD

Push to `main` → GitHub Actions → `npm ci` + `npx next build` in `site-next/` → deploys `site-next/out/` to Azure Static Web Apps. There is also a manual "Fetch External Posts" workflow that scrapes blogs and opens a PR.

## Conventions

### Design system

Styling uses **Tailwind CSS v4** with **Fluent UI-inspired CSS custom properties** defined in `globals.css`. Do not use hardcoded colors — always reference the tokens:

- Colors: `var(--accent)`, `var(--bg)`, `var(--bg-card)`, `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`, `var(--border)`
- Shadows: `var(--shadow-4)` through `var(--shadow-28)` (Fluent dual-layer: ambient + key)
- Radii: `var(--radius-md)` (4px), `var(--radius-lg)` (6px), `var(--radius-xl)` (8px)
- Fonts: `font-sans` (Inter) for body, `font-mono` (JetBrains Mono) for labels/dates/metadata

Theme toggle adds `.light` class to `<html>`. Both dark and light token sets are defined in `globals.css`.

### Component patterns

- Cards use the `fluent-card` CSS class for Fluent elevation (shadow-4 → shadow-8 on hover)
- Section headings use `font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]`
- Content width is constrained to `max-w-[820px] mx-auto px-6`
- Staggered fade-in animations: `animate-fade-in-up opacity-0` with `animation-delay-{100..500}` classes
- Only `Header.tsx` is a client component (`"use client"`); all pages are server components

### Media handling

Media files (images, videos, documents) are stored in **Azure Blob Storage**, never committed to git. References use full Azure Blob URLs: `https://<account>.blob.core.windows.net/<container>/<filename>`.

### Path alias

TypeScript uses `@/*` → `./src/*` (configured in `tsconfig.json`). Use `@/lib/data`, `@/components/Header`, etc.

### Publishing safety

Notes with `publish: true` in YAML frontmatter get published. Never publish notes containing PII, financial details, internal company information, employment records, or private conversations.
