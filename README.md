# Espedro Neptune Portfolio

Portfolio of Espedro Neptune, UX Engineer, Product Designer and AI Product Builder. Built with React 19, React Router 7 and Vite 7. The previous static version of the site lives in this repository's history on `master`.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the **contents** of `dist/` (not the project, not a `dist` folder) to a static host at https://espedroneptune.com (set in `SITE_URL`, `index.html`, `sitemap.xml`, `robots.txt`). The build generates entry HTML files for every `/case-studies/*.html` path, plus redirect pages for retired case studies, so direct links and refreshes work even without SPA rewrites. React Router handles navigation inside the app.

## Editing

- `memory-bank/`: project context and progress log (read first, update after each session)
- `src/pages.js`: single source of truth for profile links, case-study order, SEO metadata, and retired slugs
- `src/pages/Home.jsx`: homepage content
- `src/pages/`: case study content, one React component per page
- `src/components.jsx`: interactive React components
- `src/Header.jsx` and `src/Footer.jsx`: shared navigation and footer
- `src/main.jsx`: routing, page lifecycle, per-page SEO and schema.org JSON-LD
- `src/styles.css`: original design and responsive styles
- `src/react.css`: React-specific layout and accessibility styles
- `public/assets/`: images, favicon, and resume

No content is injected as raw HTML (JSON-LD is written via `textContent`). Themes, project filters, counters, logo motion, typewriter, card interactions, and image previews use React components and effects with cleanup.
