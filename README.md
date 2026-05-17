# nosend.io — Compress Images Without Uploading

**[nosend.io](https://nosend.io)** is a privacy-first, client-side image compression tool. All processing runs entirely in your browser using the Canvas API. Your files never leave your device.

[![Live site](https://img.shields.io/badge/live-nosend.io-indigo?style=flat-square)](https://nosend.io)
[![Built with Astro](https://img.shields.io/badge/built%20with-Astro-orange?style=flat-square)](https://astro.build)
[![Hosted on Cloudflare Pages](https://img.shields.io/badge/hosted%20on-Cloudflare%20Pages-F6821F?style=flat-square)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

## What it does

- Compresses JPG, PNG, WEBP, and GIF images in the browser, with no size limits and no batch limits
- Converts HEIC/HEIF (iPhone photos) to compressed JPEG, on demand, client-side
- Adjustable quality slider with one-click recompress
- Batch download of all compressed files
- Drag and drop or click to browse
- Works offline after the first page load

No server. No account. No upload. No ads.

---

## Why client-side?

Most online image compressors send your files to a server to process them. That means your photos pass through someone else's infrastructure, get stored (temporarily or permanently), and are subject to their privacy policy. nosend.io does none of that. Every byte stays on your machine.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Image compression | Browser Canvas API |
| HEIC conversion | [heic2any](https://github.com/alexcorvi/heic2any) (loaded on demand) |
| PDF tools (upcoming) | [pdf-lib](https://pdf-lib.js.org) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |
| Domain | nosend.io via Cloudflare Registrar |

---

## File structure

```
src/
├── layouts/Layout.astro          HTML shell, SEO/OG meta tags
├── components/
│   ├── Header.astro              Sticky nav + Support button
│   └── Footer.astro             Footer with privacy/terms links
├── pages/
│   ├── index.astro              Homepage + compression tool
│   ├── heic.astro               HEIC converter (coming soon)
│   ├── pdf.astro                PDF tools (coming soon)
│   ├── privacy.astro            Privacy policy
│   ├── terms.astro              Terms of service
│   └── blog/                    SEO blog posts
├── content/blog/                Markdown blog content
├── scripts/
│   └── compress.ts              Compression logic (Canvas API + heic2any)
└── styles/global.css            Tailwind base styles
```

---

## Local development

```sh
# Install dependencies
npm install

# Start the dev server at http://localhost:4321
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

Node.js >= 22.12.0 required.

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage + image compression tool |
| `/blog` | SEO blog index |
| `/heic` | HEIC to JPG converter (placeholder) |
| `/pdf` | PDF tools (placeholder) |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## Roadmap

- [ ] Full HEIC dedicated page
- [ ] PDF compression and tools (pdf-lib)
- [ ] More SEO content targeting privacy-conscious image compression queries

---

## Support

nosend.io runs on donations. If it saved you time:

- [Buy me a coffee on Ko-fi](https://ko-fi.com/nosend)
- ETH: `0xcf0ea7f9cfdc0aa7d53ca1f37c02fd1dc627e4fb`
- BTC: `bc1qmtcfgvmpjgdm5wcyy4kww68v89a9eac49pr409`

---

## Contributing

Issues and pull requests are welcome. Keep contributions focused: client-side only, no backend, no tracking, no new dependencies without discussion.

---

## License

MIT. See [LICENSE](LICENSE).
