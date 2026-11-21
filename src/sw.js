// Service worker that lets nosend.io work offline after the first visit.
//
// This file is a template. At build time, astro.config.mjs writes it to
// dist/sw.js with two constants added at the top:
//   VERSION   changes whenever any cached file changes
//   PRECACHE  the homepage plus every file in /_astro/
//
// Strategy, kept deliberately plain:
//   /_astro/*  cache first. Filenames contain a content hash, so a cached
//              copy is never stale.
//   pages      network first, falling back to the cache when offline, so
//              visitors always get the latest version when they're online.
//   anything else (other sites, Cloudflare analytics, non-GET) is left alone.
//
// Only the site's own code and pages are cached. User files are never
// fetched, so they can never end up in the cache.

/* global VERSION, PRECACHE */
const CACHE = `nosend-${VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith('nosend-') && key !== CACHE).map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/cdn-cgi/')) return;

  if (url.pathname.startsWith('/_astro/')) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request, url));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE);
    await cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, url) {
  // Store pages without their query string, so /?utm_source=reddit and /
  // share one cache entry instead of piling up copies.
  const key = url.origin + url.pathname;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      await cache.put(key, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(key);
    if (cached) return cached;
    throw err;
  }
}
