# Site Improvement Plan

Brainstormed on 2026-03-28 by analyzing two reference sites against the current junjie.li site.

**Reference sites:**
- [Ryo Lu](https://ryo.lu/) — Head of Design at Cursor. Radical minimalism, typography-driven, signature page-curl interaction.
- [Jeff Su](https://www.jeffsu.org/) — Google PM turned educator. Ghost CMS, sidebar nav, editorial hub pages, warm orange accent.

---

## A. Content Ideas

### Projects / Side Projects Page
- **Inspired by:** Ryo's ryOS and work portfolio
- **What:** Showcase things you've built — AI Toolkit, Teams Toolkit, this site itself, automation scripts. Establishes a "maker" identity beyond PM.
- **Status:** :white_check_mark: **DONE (2026-04-11)** — Full Work section with 2 project case studies (AI Toolkit, M365 Agents Toolkit). Each has 7 sections: problem statement, personas, user journey, user stories, features, technical architecture. Hero images uploaded to Azure. PM Portfolio Generator used for initial content.

### Hub Pages Per Topic
- **Inspired by:** Jeff Su's AI/Productivity/Career hubs
- **What:** Instead of just listing posts, create editorial landing pages (e.g., `/ai-tooling`) with your philosophy + curated articles. Each page is a standalone resource, not just an index.

### Personal Narrative on About
- **Inspired by:** Jeff Su's "struggled at Google" origin story
- **What:** Add a short origin story — your journey from engineer at Apple to PM at Microsoft. Makes the resume feel human.
- **Status:** :yellow_circle: **PARTIAL** — About page redesigned with sidebar TOC layout (Magic Portfolio style) and translated bio in zh/ja. Full narrative not yet written.

### Newsletter / Subscribe
- **Inspired by:** Jeff Su's ConvertKit integration with live subscriber count
- **What:** Even a simple "get notified of new posts" email capture. Builds an audience beyond page views.

### Gear / Tools Page
- **Inspired by:** Jeff Su's gear page
- **What:** Your dev setup, favorite tools, what you use daily. Low effort, high engagement content.

### Surface Highlights / Stats
- **Inspired by:** Your own unused `highlights` data in `data.ts`
- **What:** Already defined but never rendered. Show stats like MAU growth, developer reach on the home or about page.
- **Status:** :white_check_mark: **DONE (2026-04-11)** — Impact Strip on home page: 1M+ installs, 130K peak MAU, 2 toolkits launched. Plus stat pills on work cards.

---

## B. Design & Interaction Upgrades

### Bolder Typography Hierarchy
- **Inspired by:** Ryo's 8vw hero text
- **What:** Current hero is clean but safe. Consider a larger, more confident name treatment — your name is the brand.
- **Status:** :white_check_mark: **DONE (2026-04-11)** — Spatial UI typography: display headings at tracking-[-0.04em] leading-[1.05], section headings at tracking-[-0.03em]. Geist font family. Body text at rgba white (never pure white).

### Signature Micro-Interaction
- **Inspired by:** Ryo's page curl, age counter
- **What:** One memorable detail people remember. Ideas: hover effect on profile photo, animated role title that cycles, subtle particle effect.
- **Status:** :white_check_mark: **DONE (2026-04-11)** — Breathing gradient orb behind hero (8s ease-in-out). Spatial-card magnetic scale(1.01) hover. Arrow translate on CTAs. Blueprint dot-matrix background. Pulsing dot on "Currently building" pill.

### Warmer Accent or Secondary Color
- **Inspired by:** Jeff Su's orange `#ff8906`
- **What:** Fluent blue is clean but corporate. A secondary warm accent (for CTAs, highlights) could add personality without changing the core palette.
- **Status:** :yellow_circle: **CHANGED** — Moved from Fluent blue to cyan (#00b4d8) as single accent. Warm accent not adopted; instead went with "structured minimal" approach using mono accent sparingly.

### Custom Selection Color
- **Inspired by:** Ryo's yellow `#ffc800` selection
- **What:** Custom `::selection` color that surprises people. Two lines of CSS.
- **Status:** :white_check_mark: **DONE** — Selection uses accent cyan.

### Staggered Card Entrance Animations
- **Inspired by:** Both sites
- **What:** `fade-in-up` currently only applies to home hero. Extend to experience cards, post lists, skill pills for a more polished feel.
- **Status:** :white_check_mark: **DONE (2026-04-11)** — Cinematic spatial-enter animation (translateY + scale) with spring-like cubic-bezier(0.22, 1.0, 0.36, 1.0). 100ms stagger. Applied across all pages.

### Distinctive Link Hover Style
- **Inspired by:** Ryo's dim-on-hover + ne-resize cursor
- **What:** Current hovers are standard. A distinctive hover style (dim instead of brighten, cursor change, underline animation) adds character.
- **Status:** :white_check_mark: **DONE (2026-04-11)** — Arrow icons translate 2px right on group-hover. "View Case Study" / "Read" labels appear on hover (opacity transition). Cards get inset shadow glow on hover.

---

## C. Technical / Structural

### Use the `highlights` Data
- **Priority:** Quick win
- **Status:** :white_check_mark: **DONE (2026-04-11)** — Impact Strip on home page uses these metrics.

### Add Open Graph Meta to Home Page
- **Priority:** Quick win
- **Status:** :white_check_mark: **DONE (2026-04-11)** — Full OG metadata with AI Toolkit hero as OG image (1200x630), summary_large_image Twitter card, keywords.

### Extract Shared Icon Components
- **Priority:** Cleanup
- **Status:** :white_check_mark: **DONE (previously)** — GitHubIcon, LinkedInIcon, EmailIcon, ArrowRightIcon in `Icons.tsx`.

### Sidebar Navigation (Desktop)
- **Inspired by:** Jeff Su's persistent sidebar
- **What:** Makes the site feel more app-like with always-visible navigation. Big structural change.
- **Status:** :white_check_mark: **DONE (2026-04-11)** — Implemented as centered pill nav (Magic Portfolio style) with icons + labels on desktop, bottom-fixed icon-only on mobile. Includes language switcher (EN/中/日) and theme toggle.

### Custom 404 Page
- **Priority:** Quick win
- **What:** No `not-found.tsx` exists. Easy to add, prevents a jarring experience.

### Rename `profile.JPG` to Lowercase
- **Priority:** Hygiene
- **Status:** :white_check_mark: **DONE (previously)** — Profile photo moved to Azure Blob Storage.

---

## D. What NOT to Copy

- **Ryo's radical minimalism** — works for him because he's a known designer. Your site needs to show more content since you're building an audience, not just a business card.
- **Jeff Su's heavy monetization** (courses, Gumroad, ConvertKit everywhere) — your site is a personal portfolio, not a content business. Keep it clean.
- **Ghost CMS** — your static Next.js setup is perfect for your needs.

---

## E. Suggested Priority Order

### Quick Wins (afternoon)
- [x] Surface `highlights` data on home or about page — **Done: Impact Strip**
- [x] Add Open Graph metadata to home page — **Done: Full OG + Twitter cards**
- [x] Custom `::selection` color — **Done: Accent cyan**
- [x] Stagger `fade-in-up` animations on more sections — **Done: Spatial-enter + spring easing**
- [ ] Add custom 404 page
- [x] Rename `profile.JPG` to lowercase — **Done: Azure Blob Storage**

### Medium Effort (weekend)
- [x] Signature micro-interaction — **Done: Breathing orb, magnetic hover, arrow translate, pulsing pill**
- [x] Bolder hero typography — **Done: Spatial UI typography system**
- [ ] Personal narrative on About page
- [x] Extract shared icon components — **Done: Icons.tsx**
- [x] Distinctive link hover style — **Done: Arrow translate + opacity reveal CTAs**

### Bigger Projects (when ready)
- [x] Projects / side projects page — **Done: Full Work section with 2 case studies**
- [ ] Hub pages per topic
- [x] Sidebar navigation redesign — **Done: Centered pill nav with i18n**
- [ ] Newsletter integration
- [ ] Gear / tools page

---

## F. Work Done on 2026-04-11/12 (Session Log)

### Major Features Shipped

| Commit | What |
|--------|------|
| `7bae080` | Work section: 2 project portfolios (AI Toolkit, M365 Agents Toolkit) with 7 case study sections each |
| `83e4592` | Hero images uploaded to Azure and added to project detail pages |
| `7d4fd6a` | Full site redesign: Magic Portfolio style — Geist fonts, centered pill nav, dot-pattern background, cinema-dark theme, sidebar About page |
| `432b0f3` | Gemini review polish: 2/3+1/3 featured blog layout, PSI work summaries, ScrollToTop, enhanced OG metadata |
| `12c9003` | Structured minimal refinement: 40px blueprint grid, top-lit micro-borders, typography air, mono-accent discipline |
| `f164aac` | Global audit: reduced spacing, brand-tinted stat pills, arrow hover micro-interactions, minimal-card consistency |
| `f87f7e8` | Home page IA restructure: Hero → Impact Strip → Compact Work Cards → Latest Writing (dashboard gateway) |
| `0285398` | Full i18n: 3 locales (en/zh/ja), 500+ translated strings, language switcher, overlay translation architecture |
| `00041d1` | Spatial UI design system: editorial typography, Bento/Passepartout cards, cinematic spring motion, breathing gradient orb |
| `48d080e` | Posts page enabled for all locales with translated chrome |

### Design Systems Applied
- **Magic Portfolio** (Once UI) — centered pill nav, dot background, avatar CTA, image-forward project cards
- **Structured Minimal** — top-lit micro-borders, grayscale + mono accent, blueprint grid
- **Spatial UI** — Passepartout cards, inset shadow 3D volume, spring-like CSS animations, breathing orb
- **UI/UX Pro Max audit** — WCAG contrast, cursor:pointer, no emoji icons, reduced-motion support

### Architecture Changes
- Route restructure: all pages under `[locale]/` (en, zh, ja)
- Translation overlay system: base `data.ts` + locale-specific text overlays merged at render time
- 37 → 70+ static pages generated across 3 locales
- Header becomes prop-driven (receives locale + dictionary from server component)

### Remaining TODO
- [ ] Custom 404 page
- [ ] Personal narrative on About page (origin story)
- [ ] Hub pages per topic (e.g., `/ai-tooling`)
- [ ] Newsletter integration
- [ ] Gear / tools page
- [ ] Next.js Server Mode migration (see `docs/server-migration-plan.md`)
