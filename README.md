# nosend.io — Compress Images Without Uploading Them

**[nosend.io](https://nosend.io)** is a free, privacy-first image compressor that runs entirely in your browser. Compress JPG, PNG, WEBP, GIF, and HEIC files with no uploads, no account, and no file size limits. Your files never leave your device.

[![Live site](https://img.shields.io/badge/live-nosend.io-indigo?style=flat-square)](https://nosend.io)
[![Built with Astro](https://img.shields.io/badge/built%20with-Astro-orange?style=flat-square)](https://astro.build)
[![Hosted on Cloudflare Pages](https://img.shields.io/badge/hosted%20on-Cloudflare%20Pages-F6821F?style=flat-square)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

## What it does

- Compresses JPG, PNG, WEBP, GIF, and HEIC/HEIF (iPhone photos) entirely in the browser — no server, no upload
- Reduce image file size without losing quality using an adjustable quality slider
- Output format selector: convert to JPEG, PNG, or WEBP regardless of input format
- Batch processing with no file count or size limits — compress 1 or 200 images at once
- Desktop: download a single file directly or all files as a ZIP; mobile: native share sheet for both
- Works on iPhone, Android, Mac, Windows — Chrome, Safari, Firefox, Edge
- Drag and drop or click to browse
- Works offline after the first page load

No server. No account. No upload. No ads.

---

## Use cases

- Compress photos before sending by email or iMessage
- Reduce image file size before uploading to WordPress, Shopify, or social media
- Convert HEIC to JPG without uploading — straight from your iPhone camera roll
- Compress images for web to improve page load speed
- Resize and compress product photos before listing on Etsy or eBay
- Batch compress screenshots, design assets, or RAW exports

---

## Why client-side?

Most online image compressors — including TinyPNG, Compressor.io, and iLoveIMG — upload your files to a remote server to process them. That means your photos pass through someone else's infrastructure, get stored (temporarily or permanently), and are subject to their privacy policy.

nosend.io is a privacy-focused alternative. Compression happens locally using the browser's Canvas API and WebAssembly. Every byte stays on your machine. It works the same whether you're compressing personal photos, client work, or confidential documents.

---

## FAQ

**Does nosend.io upload my files?**
No. All compression runs in your browser using JavaScript and WebAssembly. Nothing is sent to any server.

**Is there a file size limit?**
No. TinyPNG caps files at 5MB. nosend.io has no size limit — compress full-resolution DSLR photos or iPhone ProRAW images without restrictions.

**Is it free?**
Yes. nosend.io is free to use and donation-supported. There are no plans, no paywalls, and no sign-up required.

**What image formats are supported?**
JPG, PNG, WEBP, GIF, and HEIC/HEIF. Output can be JPEG, PNG, or WEBP regardless of the input format.

**Does it work on iPhone and Android?**
Yes. nosend.io works on all modern browsers including mobile Safari on iPhone and Chrome on Android.

**How is this different from TinyPNG or Squoosh?**
TinyPNG uploads your files to their servers. Squoosh is also browser-based but requires more technical knowledge. nosend.io is designed to be as simple as possible — drop files, download results.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Image compression | Browser Canvas API |
| HEIC conversion | [heic2any](https://github.com/alexcorvi/heic2any) (loaded on demand) |
| WebP encoding | [@jsquash/webp](https://github.com/jamsinclair/jSquash) (WASM, loaded on demand for mobile Safari) |
| Batch ZIP download | [fflate](https://github.com/101arrowz/fflate) (loaded on demand) |
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
│   ├── privacy.astro            Privacy policy
│   ├── terms.astro              Terms of service
│   └── blog/                    SEO blog posts
├── content/blog/                Markdown blog content
├── scripts/
│   └── compress.ts              Compression logic (Canvas API + heic2any + WASM WebP fallback)
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
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

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

---

## Keywords

image compressor, compress images without uploading, browser image compression, client-side image compression, HEIC to JPG converter, compress photos online, reduce image file size, TinyPNG alternative, Squoosh alternative, privacy image compressor, no upload image compressor, compress images for web, batch image compression, WebP converter, compress photos before emailing
