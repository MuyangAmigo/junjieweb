<div align="center">

# ✨ Junjie's Blog ✨

**Notes on career, tech, and life.**

[![Hugo](https://img.shields.io/badge/Hugo-FF4088?style=for-the-badge&logo=hugo&logoColor=white)](https://gohugo.io/)
[![Azure](https://img.shields.io/badge/Azure_Static_Web_Apps-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/en-us/products/app-service/static)
[![PaperMod](https://img.shields.io/badge/Theme-PaperMod-blue?style=for-the-badge)](https://github.com/adityatelange/hugo-PaperMod)

[🌐 **Visit the Live Site**](https://victorious-desert-01d544110.2.azurestaticapps.net/)

</div>

---

## 🧠 What Is This?

A personal **knowledge vault** + **blog** in one repo. Write notes in Markdown anywhere, flip a switch, and they become blog posts — automatically built and deployed.

> 📝 **Vault** — Notes, journals, weekly reviews, all in Markdown
> 📸 **Media** — Images, videos, docs stored on Azure Blob Storage (not in git!)
> 🚀 **Blog** — Hugo + PaperMod, auto-deployed via GitHub Actions

---

## 📂 Repository Structure

```
📁 Notes/                  → Topical notes (Life, Career, Travel, Reference, Fitness, ...)
📁 Journal/                → Daily journal entries organized by year
📁 Yearbook/               → Weekly review summaries and templates
📁 Attachments/            → Local-only media (☁️ synced to Azure, not tracked in git)
📁 site/
   ├── hugo.toml           → Hugo configuration
   ├── content/posts/      → Generated Hugo posts
   └── themes/PaperMod     → Theme (git submodule)
📁 scripts/                → Automation scripts
📁 .github/workflows/      → CI/CD pipeline
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Purpose |
|:-----|:--------|
| [Hugo](https://gohugo.io/installation/) (extended) | Static site generator |
| [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) | Media uploads to Blob Storage |
| Python 3 + `pyyaml` | Note transformation scripts |

### Setup

```bash
git clone --recurse-submodules https://github.com/MuyangAmigo/junjie-blog.git
cd junjie-blog
pip install pyyaml
```

### 👀 Local Preview

```bash
cd site
hugo server -D
# → Open http://localhost:1313
```

---

## ✍️ Workflow

### 1. 📝 Write

Edit Markdown files in `Notes/`, `Journal/`, or `Yearbook/` using any editor — VS Code, Obsidian, github.dev, your phone, whatever works.

### 2. 🖼️ Add Media

```bash
# Upload a single file → get a Markdown embed to paste
./scripts/upload-media.sh path/to/image.png

# Or batch-sync all new local attachments
./scripts/sync-media.py
```

### 3. 🎯 Publish

Add `publish: true` to a note's frontmatter, then run one command:

```bash
./scripts/publish.sh
```

That's it! The script will:

1. ☁️ Sync new media to Azure
2. 🔄 Transform notes → Hugo posts
3. 📤 Commit & push — GitHub Actions deploys automatically

---

## 🛠️ Scripts

| Script | What it does |
|:-------|:-------------|
| 🚀 `publish.sh` | **One-command publish** — sync media, transform notes, commit & push |
| 🔄 `obsidian-to-hugo.py` | Convert vault notes with `publish: true` into Hugo posts |
| ☁️ `sync-media.py` | Detect new local media, upload to Azure, rewrite note references |
| 📤 `upload-media.sh` | Upload a single file to Azure and print Markdown embed |

---

## ⚡ Deployment Pipeline

```
 ✏️ Write note        🎯 publish: true        🚀 publish.sh        ☁️ GitHub Actions
 ───────────► add frontmatter ──────────► run script ──────────► auto-deploy
                                                                      │
                                                                      ▼
                                                              🌐 Live on Azure!
```

> ⚠️ **Note**: Just pushing to GitHub won't publish new content. You must run `publish.sh` first to generate Hugo posts in `site/content/posts/`.

---

## 📜 License

This is a personal project. All content is copyright **Junjie Li**.

---

<div align="center">

Made with ❤️, Markdown, and way too many terminal commands.

</div>
