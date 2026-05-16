# nosend.io — Project Context

## What this is
A privacy-first, client-side file processing tool. All compression and conversion runs entirely in the browser — no files are ever uploaded to a server. Free forever, donation-supported.

**Live domain:** nosend.io (purchased on Cloudflare)
**Stack:** Astro + Tailwind CSS, hosted on Cloudflare Pages
**Dev server:** `npm run dev` → http://localhost:4321

## Current features
- Image compression (JPG, PNG, WEBP, GIF) via browser Canvas API
- HEIC → JPG conversion via heic2any (loads on demand)
- Quality slider with recompress
- Batch download ("Download All")
- Drag and drop + click to browse

## Pages
- `/` — homepage + image compression tool
- `/heic` — placeholder (HEIC converter, coming soon)
- `/pdf` — placeholder (PDF tools, coming soon)

## Monetization
- **Ko-fi:** https://ko-fi.com/nosend (account not yet created — update URL when username is known)
- **ETH wallet:** 0xcf0ea7f9cfdc0aa7d53ca1f37c02fd1dc627e4fb
- **BTC wallet:** bc1qmtcfgvmpjgdm5wcyy4kww68v89a9eac49pr409
- No subscriptions, no ads, no paywalls — donation only

## Key decisions made
- No user accounts, no backend, no server-side compute
- Cloudflare Pages for hosting (free tier, unlimited bandwidth)
- Donations over subscriptions until traffic justifies monetization
- Ko-fi + crypto (ETH + BTC) for donations

## File structure
```
src/
├── layouts/Layout.astro        — HTML shell, SEO/OG meta tags
├── components/
│   ├── Header.astro            — Sticky nav + Support us button
│   └── Footer.astro            — Footer with privacy/terms links
├── pages/
│   ├── index.astro             — Homepage + compression tool + donation section
│   ├── heic.astro              — Placeholder
│   └── pdf.astro               — Placeholder
├── scripts/
│   └── compress.ts             — Image compression logic (Canvas API + heic2any)
└── styles/global.css           — Tailwind base styles
```

## Next steps (not yet built)
- Push to GitHub and connect to Cloudflare Pages for deployment
- Configure nosend.io DNS in Cloudflare to point at Pages
- Create Ko-fi account and update the URL in Header.astro and index.astro
- Build out HEIC dedicated page
- Build out PDF tools page (pdf-lib is already installed)
- SEO: add blog posts targeting "compress image without uploading", "HEIC to JPG no upload" etc.
- Submit to Product Hunt, r/privacy, r/selfhosted for launch

## Important notes for Claude
- Do NOT suggest starting a dev server yourself — tell the user to run `npm run dev` and report what they see
- Bitdefender on this machine blocks PowerShell `-EncodedCommand` patterns — avoid background PowerShell processes
- The user handles: domain/DNS, account setup (Ko-fi, Cloudflare, GitHub, Stripe), running the dev server
- All code changes should be front-end only unless a backend is explicitly discussed and agreed upon
