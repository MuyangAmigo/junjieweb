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

### Hub Pages Per Topic
- **Inspired by:** Jeff Su's AI/Productivity/Career hubs
- **What:** Instead of just listing posts, create editorial landing pages (e.g., `/ai-tooling`) with your philosophy + curated articles. Each page is a standalone resource, not just an index.

### Personal Narrative on About
- **Inspired by:** Jeff Su's "struggled at Google" origin story
- **What:** Add a short origin story — your journey from engineer at Apple to PM at Microsoft. Makes the resume feel human.

### Newsletter / Subscribe
- **Inspired by:** Jeff Su's ConvertKit integration with live subscriber count
- **What:** Even a simple "get notified of new posts" email capture. Builds an audience beyond page views.

### Gear / Tools Page
- **Inspired by:** Jeff Su's gear page
- **What:** Your dev setup, favorite tools, what you use daily. Low effort, high engagement content.

### Surface Highlights / Stats
- **Inspired by:** Your own unused `highlights` data in `data.ts`
- **What:** Already defined but never rendered. Show stats like MAU growth, developer reach on the home or about page.

---

## B. Design & Interaction Upgrades

### Bolder Typography Hierarchy
- **Inspired by:** Ryo's 8vw hero text
- **What:** Current hero is clean but safe. Consider a larger, more confident name treatment — your name is the brand.

### Signature Micro-Interaction
- **Inspired by:** Ryo's page curl, age counter
- **What:** One memorable detail people remember. Ideas: hover effect on profile photo, animated role title that cycles, subtle particle effect.

### Warmer Accent or Secondary Color
- **Inspired by:** Jeff Su's orange `#ff8906`
- **What:** Fluent blue is clean but corporate. A secondary warm accent (for CTAs, highlights) could add personality without changing the core palette.

### Custom Selection Color
- **Inspired by:** Ryo's yellow `#ffc800` selection
- **What:** Custom `::selection` color that surprises people. Two lines of CSS.

### Staggered Card Entrance Animations
- **Inspired by:** Both sites
- **What:** `fade-in-up` currently only applies to home hero. Extend to experience cards, post lists, skill pills for a more polished feel.

### Distinctive Link Hover Style
- **Inspired by:** Ryo's dim-on-hover + ne-resize cursor
- **What:** Current hovers are standard. A distinctive hover style (dim instead of brighten, cursor change, underline animation) adds character.

---

## C. Technical / Structural

### Use the `highlights` Data
- **Priority:** Quick win
- **What:** Already in `data.ts` but not rendered. Add stat cards to home or about page.

### Add Open Graph Meta to Home Page
- **Priority:** Quick win
- **What:** About and Posts pages export `metadata`, but home doesn't. Needed for good link previews on social.

### Extract Shared Icon Components
- **Priority:** Cleanup
- **What:** GitHub/LinkedIn/Email SVGs are duplicated 4+ times across files. Create a shared icon component.

### Sidebar Navigation (Desktop)
- **Inspired by:** Jeff Su's persistent sidebar
- **What:** Makes the site feel more app-like with always-visible navigation. Big structural change.

### Custom 404 Page
- **Priority:** Quick win
- **What:** No `not-found.tsx` exists. Easy to add, prevents a jarring experience.

### Rename `profile.JPG` to Lowercase
- **Priority:** Hygiene
- **What:** Uppercase `.JPG` is unconventional and risky on case-sensitive file systems.

---

## D. What NOT to Copy

- **Ryo's radical minimalism** — works for him because he's a known designer. Your site needs to show more content since you're building an audience, not just a business card.
- **Jeff Su's heavy monetization** (courses, Gumroad, ConvertKit everywhere) — your site is a personal portfolio, not a content business. Keep it clean.
- **Ghost CMS** — your static Next.js setup is perfect for your needs.

---

## E. Suggested Priority Order

### Quick Wins (afternoon)
- [ ] Surface `highlights` data on home or about page
- [x] Add Open Graph metadata to home page
- [x] Custom `::selection` color
- [x] Stagger `fade-in-up` animations on more sections
- [ ] Add custom 404 page
- [x] Rename `profile.JPG` to lowercase

### Medium Effort (weekend)
- [ ] Signature micro-interaction
- [ ] Bolder hero typography
- [ ] Personal narrative on About page
- [x] Extract shared icon components
- [ ] Distinctive link hover style

### Bigger Projects (when ready)
- [ ] Projects / side projects page
- [ ] Hub pages per topic
- [ ] Sidebar navigation redesign
- [ ] Newsletter integration
- [ ] Gear / tools page
