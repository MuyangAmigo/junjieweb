# Copilot Instructions

Personal website (resume + blog) with an Obsidian vault publishing pipeline, deployed on GitHub Pages.

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
2. **Publishing scripts** (`scripts/`) — Python/bash tools transform vault notes into site content and stage media into the site.
3. **Next.js site** (`site-next/`) — Static site with App Router, deployed to GitHub Pages via GitHub Actions.

Content flows one direction: Vault → scripts → `site-next/` → CI/CD → GitHub Pages.

### Site data model

All structured data lives in `site-next/src/lib/data.ts` — profile, experience, education, skills, and `externalPosts`. There is no CMS or database. The blog section links to external Microsoft developer blog posts (not local markdown). To update career info or add posts, edit `data.ts` directly.

Legacy local markdown posts exist in `site-next/content/posts/` but are unlisted — the `posts.ts` reader is kept for backward compatibility.

### Key scripts

| Script | Purpose |
|--------|---------|
| `scripts/publish.sh` | One-command publish: runs `obsidian-to-hugo.py`, commits, pushes |
| `scripts/obsidian-to-hugo.py` | Transforms vault notes with `publish: true` frontmatter → `site-next/content/posts/` |
| `scripts/fetch-external-posts.mjs` | Scrapes Microsoft blogs → updates `externalPosts` in `data.ts` |
| `scripts/add-media.sh` | Copy an image into `site-next/public/images`, optimize it, print the markdown embed |
| `site-next/scripts/optimize-images.mjs` | Downscale + recompress `public/images` (idempotent via content-hash manifest) |

### CI/CD

Push to `main` → GitHub Actions → `npm ci` + `npm run build` in `site-next/` → `npm run verify:export` link check → uploads `site-next/out/` as a Pages artifact → `actions/deploy-pages` publishes it to <https://muyangamigo.github.io/junjieweb/>. Pull requests build but do not deploy. There is also a manual "Fetch External Posts" workflow that scrapes blogs and opens a PR.

The site is served from the `/junjieweb` subpath. `BASE_PATH` in `site-next/next.config.ts` is the single source of truth; use `withBasePath` from `src/lib/base-path.ts` for any URL Next does not rewrite itself, and `SiteImage` instead of `next/image`.

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

Site images live in `site-next/public/images/` and are referenced as `/images/<filename>`. They ship with the site, so run `npm run optimize:images` in `site-next/` after adding any — the build sets `images.unoptimized: true`, meaning committed bytes are exactly what visitors download. Keep the vault's full `Attachments/` library out of git; copy in only what a post actually uses.

### Path alias

TypeScript uses `@/*` → `./src/*` (configured in `tsconfig.json`). Use `@/lib/data`, `@/components/Header`, etc.

### Publishing safety

Notes with `publish: true` in YAML frontmatter get published. Never publish notes containing PII, financial details, internal company information, employment records, or private conversations.
