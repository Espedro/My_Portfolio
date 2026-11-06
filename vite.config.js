import { defineConfig } from 'vite';
import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Retired case studies: keep their old public URLs working by redirecting to the work section.
// Keep in sync with `retiredSlugs` in src/pages.js.
const retiredSlugs = ['icom', 'trackom', 'mizikanou', 'tribalscale', 'bloxide', 'eathy', 'learnloop'];

const redirectPage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=/#work" />
    <link rel="canonical" href="https://espedroneptune.com/" />
    <title>Moved | Espedro Neptune</title>
  </head>
  <body>
    <p>This case study has moved. <a href="/#work">See current case studies</a>.</p>
  </body>
</html>
`;

// Keep existing case-study URLs usable even on hosts without SPA rewrites.
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  plugins: [{
    name: 'case-study-entry-pages',
    async closeBundle() {
      const root = fileURLToPath(new URL('.', import.meta.url));
      const routes = await readdir(`${root}src/pages`);
      await mkdir(`${root}dist/case-studies`, { recursive: true });
      for (const file of routes.filter(file => file !== 'Home.jsx')) {
        const slug = file.replace('.jsx', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        await copyFile(`${root}dist/index.html`, `${root}dist/case-studies/${slug}.html`);
      }
      for (const slug of retiredSlugs) {
        await writeFile(`${root}dist/case-studies/${slug}.html`, redirectPage);
      }
    },
  }],
});
