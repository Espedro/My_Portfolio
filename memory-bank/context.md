# Project Context — Espedro Neptune Portfolio

## Who / why
- **Owner:** Espedro Neptune — UX Engineer, Product Designer, AI Product Builder. Based in the USA.
- **Goal:** a portfolio that passes recruiter screens (6-second scan, ATS/SEO, Lighthouse, WCAG AA, case-study depth) for three target roles:
  1. **UX Designer** — research → structure → interaction → visual system, with rationale.
  2. **UX Engineer** — design judgment plus production front-end (React, accessibility, states, design tokens).
  3. **AI Product Builder** — shipping AI-powered products, human-in-the-loop, guardrails, AI in the build workflow.

## Stack
- React 19, React Router 7 (`BrowserRouter`), Vite 7, **motion** (scroll-linked animation on the homepage, used through `LazyMotion` + `m`). No CSS framework: hand-written `src/styles.css` + `src/react.css` + `src/home/home.css`.
- Static deploy of `dist/`. `vite.config.js` copies `index.html` to `dist/case-studies/<slug>.html` for every file in `src/pages/` (except Home), so direct links work without SPA rewrites.
- Git: https://github.com/Espedro/My_Portfolio (`master`). No test runner.

## File map
| Path | Role |
|---|---|
| `index.html` | Shell, theme bootstrap script, static SEO meta + JSON-LD (`Person`, `WebSite`) |
| `src/main.jsx` | Router, per-page lifecycle (title, meta, OG, JSON-LD, reveal animations, scroll) |
| `src/pages.js` | **Single source of truth** for routes, titles, descriptions, images, keywords, live URLs, case-study order |
| `src/pages/*.jsx` | Home + one data object per case study, rendered by `src/CaseStudy.jsx` |
| `src/home/` | Homepage sections (redesign): `HeroAndCaseStudies` (pinned stage, `Laptop3D`, `EMark`), `Numbers`, `MoreWork`, `WhatIDo` (id `about`), `HowIUseAI` (id `ai`), `Tools`, `HowIWork` (id `process`), `Contact` (id `contact`); copy in `homeData.js`; styles in `home.css` |
| `src/Resume.jsx` + `src/resume.css` | Web version of the resume (/resume), from the owner's `Resume.dc.html` |
| `src/CaseStudy.jsx` + `src/case-study.css` | Shared case-study template (from the owner's `CaseStudy-AIBOS.dc.html`, 2026-11-13): project-color hero with 3D laptop, chapter rail, numbered chapters built from the study data; optional fields documented at the top of the file |
| `src/components.jsx` | Shared UI: Img (sized/lazy images), BrandMark (animated logo), ThemeToggle, useReducedMotion |
| `src/Header.jsx`, `src/Footer.jsx` | Shared chrome |
| `public/assets/` | Images, resume, favicon |
| `memory-bank/` | This context + progress log |

## Case studies (current order)
1. **AI BOS CRM** — `/case-studies/ai-bos-crm.html` — https://ai-bos-crm.vercel.app/ — AI Employee CRM, human-in-the-loop. (AI flagship)
2. **Kominote Konbit** — `/case-studies/kominote-konbit.html` — https://kominotekonbit.com/ — Konbit members' community platform; AI assistant Konbitèz Odette cites sources.
3. **VotPam** — `/case-studies/votpam.html` — https://votpam.app/ — non-partisan civic info + opinion polls for Haiti's 2027 elections (Next.js/Vercel).
4. **Agrodoc** — `/case-studies/agrodoc.html` — https://agrodoc-tau.vercel.app/ — offline-first clinic medical record PWA (Vite/Vercel), login-only.
5. **BelieverHub** — `/case-studies/believerhub.html` — https://believerhub.org/ — fellowship PWA, design tokens, AI Bible assistant guardrails.
6. **FootLakay** — `/case-studies/footlakay.html` — https://footlakay.com/ — World Cup prediction platform for the Haitian diaspora.
7. **Maket Lakay** — `/case-studies/maket-lakay.html` — https://maket-lakay.vercel.app/ — multi-vendor marketplace.
8. **Media Innovation** — `/case-studies/media-innovation.html` — http://www.mediainnovationstudios.online/ — agency React SPA.

The owner is solo designer & developer on all of them. AI-powered in production: AI BOS CRM, BelieverHub, Kominote Konbit.

Removed on 2026-11-05: ICOM, TRACKOM, MIZIKANOU, TRIBALSCALE, BLOXIDE, EATHY, LearnLoop (LearnLoop only existed in the old static site). Their old URLs redirect to `/#work`.

## Links
- Calendly: https://calendly.com/espedroneptune/30min
- LinkedIn: https://www.linkedin.com/in/espedro-neptune/
- Behance: https://www.behance.net/EspedroNeptune
- GitHub: https://github.com/Espedro
- Public email: espedroneptune@gmail.com (already public on the resume)

## Visual design
- Homepage source of truth (from 2026-11-13): the owner's `prototype-reference.html` (scroll-driven, 3D laptop). Case studies follow `CaseStudy-AIBOS.dc.html`. Header (all pages): logo + "ESPEDRO / NEPTUNE" on two lines, numbered links on the right (01 Work · 02 About · 03 AI · 04 Contact · 05 Resume), "Let's talk ↗" (Calendly), round theme button.
- Case-study order = homepage order (BelieverHub, VotPam, AI BOS CRM, Agrodoc, Kominote Konbit, FootLakay, Maket Lakay, Media Innovation) and project colors (`bg`, `accent`) live in `caseStudies` in `src/pages.js`. On case pages `--proj-acc` = bg in light theme, accent in dark theme. Font **Archivo**. Light: bg #f6f6f1, ink #141413, accent #2563eb. Dark: bg #121211, ink #edede8, accent #4f8cff (site-wide since 2026-11-13; before that the accent was red/orange). Project colors for the stage and cards live in `src/home/homeData.js`.
- Tokens live at the top of `src/react.css`; they also alias the legacy variables in `styles.css` used by case-study pages.
- The header keeps the original animated logo mark (`BrandMark` in components.jsx; CSS in styles.css `.logo-piece`) and the original nav (Work · About · AI · Contact · Resume). On the homepage it floats over the stage (`.topbar--overlay`, classes `is-over-stage` / `is-glass` set from scroll in `src/home/ui.jsx`).
- Every big "E" on the homepage uses the real logo proportions (middle bar shorter): `eRects()` in `src/home/EMark.jsx`.
- No portrait on the page (owner's choice); the photo is only in JSON-LD `Person.image` for Google and in og-image.png.
- Theme defaults to the OS setting; a click on the toggle stores an explicit choice.

## Conventions & rules
- No content injected as raw HTML (`dangerouslySetInnerHTML` forbidden); JSON-LD is set via `textContent`.
- Keep `/case-studies/<slug>.html` URL shape — it is already shared publicly.
- Respect `prefers-reduced-motion` (`useReducedMotion` in `components.jsx`); every animation must have a no-motion path.
- Light/dark theme via `data-theme` on `<html>` and CSS variables (tokens at the top of `src/react.css`).
- Case-study order, the "Next case study" link and JSON-LD all read from `pages.js`. Case-study copy lives in each `src/pages/<Name>.jsx` data object; layout lives only in `CaseStudy.jsx`.
- Voice: clear, confident, specific; show decisions and trade-offs, not adjectives. Prefer real numbers when available — never invent metrics.
