<div align="center">

# Junjie Li — Personal Site

**Senior Product Manager at Microsoft | Career, Tech & Life**

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Azure](https://img.shields.io/badge/Azure_Static_Web_Apps-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/en-us/products/app-service/static)

[**Visit the Live Site**](#) <!-- Update with your deployed URL -->

</div>

---

## What Is This?

A multi-purpose personal website and knowledge vault in one repo:

- **Website** — Next.js personal site with resume/portfolio and blog, auto-deployed via GitHub Actions
- **Vault** — Notes, journals, weekly reviews, all in Markdown, synced across devices via git
- **Media** — Images, videos, docs stored on Azure Blob Storage (not in git)

## Tech Stack

| Layer | Technology |
|:------|:-----------|
| Framework | Next.js 16, TypeScript, App Router, static export |
| Styling | Tailwind CSS v4, monochrome dark theme |
| Fonts | Inter + JetBrains Mono |
| Blog | External posts from Microsoft developer blogs |
| Deployment | Azure Static Web Apps, GitHub Actions CI/CD |
| Media | Azure Blob Storage |

## Repository Structure

```
Notes/                  # Topical notes (Life, Career, Travel, Reference, Fitness)
Journal/                # Daily journal entries by year
Yearbook/               # Weekly review summaries
site-next/              # Active Next.js personal site
  src/app/              #   Pages: home, about, posts, post detail
  src/components/       #   Header, Footer
  src/lib/              #   Resume data, external posts data
  content/posts/        #   Legacy blog post markdown files (unlisted)
site/                   # Legacy Hugo site (reference only)
scripts/                # Automation scripts
.github/workflows/      # CI/CD pipeline
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) (for media uploads)
- Python 3 + `pyyaml` (for note transformation)

### Setup

```bash
git clone https://github.com/MuyangAmigo/junjie-blog.git
cd junjie-blog
cd site-next && npm install
```

### Local Preview

```bash
cd site-next
npx next dev
# Open http://localhost:3000
```

## Workflow

### Write

Edit Markdown files in `Notes/`, `Journal/`, or `Yearbook/` using any editor.

### Add Media

```bash
./scripts/upload-media.sh path/to/image.png
# Uploads to Azure, prints markdown embed to paste into your note
```

### Publish

Add `publish: true` to a note's frontmatter, then:

```bash
./scripts/publish.sh
```

This syncs media, transforms notes into blog posts, commits, and pushes. GitHub Actions deploys automatically.

### Update External Posts

Fetch latest posts from Microsoft developer blogs:

```bash
node scripts/fetch-external-posts.mjs
```

Or trigger the "Fetch External Posts" workflow from the GitHub Actions tab — it creates a PR with any new posts found.

## Scripts

| Script | What it does |
|:-------|:-------------|
| `publish.sh` | One-command publish — sync media, transform notes, commit & push |
| `obsidian-to-hugo.py` | Convert vault notes with `publish: true` into blog posts |
| `sync-media.py` | Detect new local media, upload to Azure, rewrite note references |
| `upload-media.sh` | Upload a single file to Azure and print markdown embed |
| `fetch-external-posts.mjs` | Fetch posts from Microsoft blogs and update `data.ts` |

## Deployment

```
Write note → add publish: true → run publish.sh → GitHub Actions → Live on Azure
```

Push to `main` triggers: `npm ci` → `npx next build` → deploy `site-next/out/` to Azure Static Web Apps.

---

<div align="center">

Built by Junjie Li.

</div>
