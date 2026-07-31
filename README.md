<div align="center">

# Junjie Li — Personal Site

**Senior Product Manager at Microsoft | Career, Tech & Life**

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://pages.github.com/)

</div>

---

A personal website with resume/portfolio and blog, built with Next.js and deployed on GitHub Pages.

**Live at <https://muyangamigo.github.io/junjieweb/>**

## Tech Stack

| Layer | Technology |
|:------|:-----------|
| Framework | Next.js 16, TypeScript, App Router, static export |
| Styling | Tailwind CSS v4 with Fluent UI design tokens |
| Fonts | Inter + JetBrains Mono |
| Blog | External posts from Microsoft developer blogs |
| Deployment | GitHub Pages, GitHub Actions CI/CD |
| Media | `site-next/public/images`, served with the site |

## Repository Structure

```
site-next/              # Next.js personal site
  src/app/              #   Pages: home, about, posts
  src/components/       #   Header, Footer
  src/lib/              #   Resume data, external posts data
  content/posts/        #   Blog post markdown files
  public/images/        #   Site media (referenced as /images/<file>)
  scripts/              #   Image optimizer
scripts/                # Publishing and media helper scripts
.github/workflows/      # CI/CD pipeline
```

## Local Development

```bash
cd site-next
npm install
npm run dev              # http://localhost:3000
npm run build            # static export to site-next/out
npm run optimize:images  # run after adding images to public/images
```

---

<div align="center">

Built by Junjie Li.

</div>
