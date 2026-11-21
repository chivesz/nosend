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

/**
 * Writes dist/_headers (read by Cloudflare Pages) with a Content Security
 * Policy. The policy is what lets the browser itself enforce "your files
 * never leave your device": background requests may only go to nosend.io
 * and Cloudflare's anonymous visit counter, and nothing else.
 *
 * Inline scripts are allowed by exact hash, computed here from the built
 * HTML, rather than allowing all inline scripts.
 *
 * 'unsafe-eval' is required by heic2any: its worker builds functions with
 * new Function() at startup, and blob: workers inherit this page's policy.
 * Without it, HEIC conversion fails. It only affects which code may run;
 * the rules on where data may go (connect-src, img-src, form-action) are
 * unchanged, so files still can't leave the device.
 *
 * REPORT_ONLY: while true, browsers only log what the policy would block
 * (visible in the DevTools Console) without blocking anything. Flip to
 * false once testing shows no violations.
 * @returns {import('astro').AstroIntegration}
 */
function securityHeaders() {
  const REPORT_ONLY = false;
  return {
    name: 'nosend-security-headers',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const htmlFiles = (await readdir(dir, { recursive: true })).filter((f) => f.endsWith('.html'));
        const hashes = new Set();
        for (const file of htmlFiles) {
          const html = await readFile(new URL(file.replaceAll('\\', '/'), dir), 'utf8');
          for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
            if (/\bsrc=/.test(attrs) || /application\/ld\+json/.test(attrs)) continue;
            hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
          }
        }

        const policy = [
          "default-src 'self'",
          `script-src 'self' ${[...hashes].join(' ')} https://static.cloudflareinsights.com 'wasm-unsafe-eval' 'unsafe-eval'`,
          "connect-src 'self' https://cloudflareinsights.com",
          "img-src 'self' blob: data:",
          "worker-src 'self' blob:",
          "style-src 'self'",
          "font-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'none'",
          "frame-ancestors 'none'",
        ].join('; ');

        const header = REPORT_ONLY ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy';
        await writeFile(new URL('_headers', dir), `/*\n  ${header}: ${policy}\n`);
        logger.info(`_headers written: ${header}, ${hashes.size} inline script hash(es)`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://nosend.io',
  integrations: [sitemap(), serviceWorker(), securityHeaders()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['@jsquash/webp']
    }
  }
});
