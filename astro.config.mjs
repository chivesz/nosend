// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';

/**
 * Writes dist/sw.js from src/sw.js after each build, adding the list of
 * files to cache (the homepage plus everything in /_astro/) and a version
 * that changes whenever any of those files change.
 * @returns {import('astro').AstroIntegration}
 */
function serviceWorker() {
  return {
    name: 'nosend-service-worker',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const assets = (await readdir(new URL('_astro/', dir))).sort().map((name) => `/_astro/${name}`);
        const precache = ['/', ...assets];

        const hash = createHash('sha256');
        for (const path of precache) {
          const file = path === '/' ? 'index.html' : path.slice(1);
          hash.update(path).update(await readFile(new URL(file, dir)));
        }
        const version = hash.digest('hex').slice(0, 12);

        const template = await readFile(new URL('./src/sw.js', import.meta.url), 'utf8');
        const header = `const VERSION = ${JSON.stringify(version)};\nconst PRECACHE = ${JSON.stringify(precache)};\n\n`;
        await writeFile(new URL('sw.js', dir), header + template);
        logger.info(`sw.js written: version ${version}, ${precache.length} files to cache`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://nosend.io',
  integrations: [sitemap(), serviceWorker()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['@jsquash/webp']
    }
  }
});
